/* ═══════════════════════════════════════════════════════════════
   ARTHUR TERMINAL — AUTH & SYNC MODULE (Firebase)
   ▸ Remplace les valeurs de firebaseConfig ci-dessous
   ▸ Trouve ces valeurs sur : https://console.firebase.google.com
     → Ton projet → Paramètres → Général → Tes applications → SDK
   ▸ Active Authentication (Email/Password) et Firestore dans la console
════════════════════════════════════════════════════════════════ */

const firebaseConfig = {
  apiKey:            "AIzaSyAvJ2FHxCEgVGILbvdj_HyoF7TNykqJ1bE",
  authDomain:        "arthurterminal-774a8.firebaseapp.com",
  projectId:         "arthurterminal-774a8",
  storageBucket:     "arthurterminal-774a8.firebasestorage.app",
  messagingSenderId: "659611079040",
  appId:             "1:659611079040:web:a0e14ac9454a02712c7165",
  measurementId:     "G-52SGXGPMT2"
};

/* ── Init Firebase ── */
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const _auth      = firebase.auth();
const _db        = firebase.firestore();
const _analytics = firebase.analytics();
const _configured = true;

/* ── Tracking Analytics : page_view + session ── */
(function() {
  // Log la page vue initiale
  _analytics.logEvent('page_view', {
    page_title:    document.title,
    page_location: window.location.href,
    page_path:     window.location.pathname
  });

  // Log chaque changement de page dans la SPA
  var _origGoto = null;
  var _hookNav = function() {
    if (window.AM && window.AM.nav && window.AM.nav.goto && !window.AM.nav._at_hooked) {
      var original = window.AM.nav.goto.bind(window.AM.nav);
      window.AM.nav.goto = function(page) {
        original(page);
        _analytics.logEvent('page_view', {
          page_title:    page,
          page_location: window.location.href,
          page_path:     '/' + page
        });
        _analytics.logEvent('screen_view', {
          screen_name: page
        });
      };
      window.AM.nav._at_hooked = true;
    }
  };
  // Attendre que AM.nav soit prêt
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(_hookNav, 500);
  });
})();

/* ── Clés localStorage (même que le code existant) ── */
const LS_PORTFOLIO = 'am_pf_positions';
const LS_ALERTS    = 'am_alerts';
const LS_ANALYSES  = 'am_analyses';
const LS_SETTINGS  = 'am_settings';

/* ═══════════════════════════════════════════════════════════════
   AUTH OBJECT
════════════════════════════════════════════════════════════════ */
window.AUTH = {
  _user: null,
  _guest: false,

  /* ── Init : appelé au chargement ── */
  async init() {
    if (!_configured) {
      // Firebase non configuré → mode démo
      console.warn('[AUTH] Firebase non configuré — mode démo');
      this._showOverlay();
      return;
    }

    // Écoute les changements d'état de connexion Firebase
    _auth.onAuthStateChanged((user) => {
      if (user) {
        const isNew = !this._user;
        this._onLoggedIn(user, isNew);
      } else {
        const wasGuest = localStorage.getItem('at_guest_mode') === '1';
        if (wasGuest) {
          this.continueAsGuest(true);
        } else {
          this._showOverlay();
        }
      }
    });
  },

  /* ── Afficher / cacher le modal ── */
  _showOverlay() {
    const o = document.getElementById('auth-overlay');
    o.style.display = 'flex';
    // Bloquer le scroll du terminal
    document.body.style.overflow = 'hidden';
  },
  _hideOverlay() {
    const o = document.getElementById('auth-overlay');
    o.style.display = 'none';
    document.body.style.overflow = '';
  },
  _hideProfileOverlay() {
    /* Cacher le modal de sélection de profil — affiché uniquement à la 1ère connexion */
    var po = document.getElementById('at-welcome-overlay');
    if (po) po.classList.add('hidden');
  },

  /* ── Tabs Login / Signup ── */
  showTab(tab) {
    const isLogin = tab === 'login';
    document.getElementById('auth-form-login').style.display  = isLogin ? '' : 'none';
    document.getElementById('auth-form-signup').style.display = isLogin ? 'none' : '';
    document.getElementById('auth-tab-login').style.background  = isLogin ? '#ff6600' : 'transparent';
    document.getElementById('auth-tab-login').style.color       = isLogin ? '#fff' : '#606060';
    document.getElementById('auth-tab-signup').style.background = isLogin ? 'transparent' : '#ff6600';
    document.getElementById('auth-tab-signup').style.color      = isLogin ? '#606060' : '#fff';
    this._clearMsg();
  },

  /* ── Messages ── */
  _showMsg(text, type) {
    const el = document.getElementById('auth-msg');
    el.style.display = 'block';
    el.textContent   = text;
    if (type === 'error') {
      el.style.background = 'rgba(255,71,87,0.1)';
      el.style.border     = '1px solid rgba(255,71,87,0.3)';
      el.style.color      = '#ff4757';
    } else {
      el.style.background = 'rgba(0,232,150,0.1)';
      el.style.border     = '1px solid rgba(0,232,150,0.3)';
      el.style.color      = '#00e896';
    }
  },
  _clearMsg() {
    const el = document.getElementById('auth-msg');
    el.style.display = 'none';
    el.textContent   = '';
  },

  /* ── Connexion ── */
  async login() {
    if (!_configured) return this._showMsg('⚠ Firebase non configuré — remplace les clés dans le code.', 'error');
    const email = document.getElementById('login-email').value.trim();
    const pass  = document.getElementById('login-pass').value;
    if (!email || !pass) return this._showMsg('Remplis tous les champs.', 'error');

    const btn = document.getElementById('btn-login');
    btn.textContent = 'Connexion…';
    btn.disabled = true;

    try {
      await _auth.signInWithEmailAndPassword(email, pass);
    } catch(e) {
      btn.textContent = 'SE CONNECTER →';
      btn.disabled = false;
      const msg = e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found'
        ? 'Email ou mot de passe incorrect.' : e.message;
      return this._showMsg('❌ ' + msg, 'error');
    }
    btn.textContent = 'SE CONNECTER →';
    btn.disabled = false;
  },

  /* ── Inscription ── */
  async signup() {
    if (!_configured) return this._showMsg('⚠ Firebase non configuré — remplace les clés dans le code.', 'error');
    const name  = document.getElementById('signup-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const pass  = document.getElementById('signup-pass').value;

    if (!name || !email || !pass) return this._showMsg('Remplis tous les champs.', 'error');
    if (pass.length < 8) return this._showMsg('Le mot de passe doit faire au moins 8 caractères.', 'error');

    // SÉCURITÉ : validation du displayName (évite XSS via pseudo malveillant)
    if (name.length < 2 || name.length > 30) return this._showMsg('Le nom doit faire entre 2 et 30 caractères.', 'error');
    if (!/^[a-zA-Z0-9_\-\s'àâäéèêëïîôöùûüÿçÀÂÄÉÈÊËÏÎÔÖÙÛÜŸÇ]+$/.test(name)) {
      return this._showMsg('Le nom contient des caractères non autorisés (lettres, chiffres, _ - espace uniquement).', 'error');
    }

    // Validation basique email (en plus de celle de Firebase)
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return this._showMsg('Email invalide.', 'error');

    const btn = document.getElementById('btn-signup');
    btn.textContent = 'Création…';
    btn.disabled = true;

    try {
      const cred = await _auth.createUserWithEmailAndPassword(email, pass);
      await cred.user.updateProfile({ displayName: name });
      this._showMsg('✅ Compte créé ! Bienvenue sur Arthur Terminal.', 'success');
    } catch(e) {
      const msg = e.code === 'auth/email-already-in-use'
        ? 'Cet email est déjà utilisé.' : e.message;
      this._showMsg('❌ ' + msg, 'error');
    }
    btn.textContent = 'CRÉER MON COMPTE →';
    btn.disabled = false;
  },

  /* ── Mot de passe oublié ── */
  async resetPassword() {
    if (!_configured) return;
    const email = document.getElementById('login-email').value.trim();
    if (!email) return this._showMsg('Entre ton email pour réinitialiser.', 'error');
    try {
      await _auth.sendPasswordResetEmail(email);
      this._showMsg('📧 Email de réinitialisation envoyé !', 'success');
    } catch(e) {
      this._showMsg('❌ ' + e.message, 'error');
    }
  },

  /* ── Mode invité ── */
  continueAsGuest(silent = false) {
    this._guest = true;
    this._user  = null;
    localStorage.setItem('at_guest_mode', '1');
    this._hideOverlay();
    this._hideProfileOverlay();
    this._updateUI({ displayName: 'Invité', email: '', isGuest: true });
    if (!silent) this._syncToast('👤 Mode invité — données non sauvegardées en cloud', '#ffd166');
  },

  /* ── Déconnexion ── */
  async logout() {
    this._closeUserMenu();
    if (_configured) await _auth.signOut();
    localStorage.removeItem('at_guest_mode');
    this._user  = null;
    this._guest = false;
    this._showOverlay();
  },

  /* ── Callback connexion réussie ── */
  async _onLoggedIn(user, isNew) {
    this._user  = user;
    this._guest = false;
    localStorage.removeItem('at_guest_mode');
    this._hideOverlay();
    this._hideProfileOverlay();

    const name = user.displayName || user.email.split('@')[0];
    this._updateUI({ displayName: name, email: user.email, isGuest: false });

    // Sync : push local → cloud si nouvelle session, pull si retour
    if (isNew) {
      await this._pushToCloud();
      this._syncToast('✅ Connecté — données synchronisées', '#00e896');
    } else {
      await this._pullFromCloud();
      this._syncToast('↓ Données chargées depuis le cloud', '#4d9fff');
    }
  },

  _onLoggedOut() {
    this._showOverlay();
  },

  /* ── Mise à jour UI (topbar + sidebar) ── */
  _updateUI({ displayName, email, isGuest }) {
    // Avatar : emoji custom si défini, sinon initiales (ou 👤 pour invité)
    const customAvatar = isGuest ? null : localStorage.getItem('at_user_avatar');
    const initials = isGuest ? '👤' : (customAvatar || displayName.slice(0,2).toUpperCase());

    // Topbar chip
    const chip = document.querySelector('.user-chip');
    if (chip) {
      chip.querySelector('.user-av').textContent = initials;
      const nameEl = chip.querySelector('.user-name');
      if (nameEl) nameEl.textContent = isGuest ? 'Invité' : displayName.split(' ')[0];
      chip.style.cursor = 'pointer';
      chip.onclick = () => this.toggleUserMenu();
    }

    // Sidebar user row
    const sbAv    = document.querySelector('.sb-av');
    const sbUname = document.querySelector('.sb-uname');
    const sbStat  = document.querySelector('.sb-ustatus');
    if (sbAv)    sbAv.textContent    = initials;
    if (sbUname) sbUname.textContent = isGuest ? 'Mode Invité' : displayName;
    if (sbStat)  sbStat.textContent  = isGuest ? 'Invité — données locales' : '✓ Connecté · Cloud sync';

    // Menu dropdown
    document.getElementById('umd-name').textContent  = isGuest ? 'Invité' : displayName;
    document.getElementById('umd-email').textContent = isGuest ? 'Aucun compte' : email;
    const plan = document.getElementById('umd-plan');
    plan.textContent = isGuest ? 'INVITÉ' : 'PRO';
    plan.style.background = isGuest ? 'rgba(255,209,102,0.1)' : 'rgba(255,102,0,0.1)';
    plan.style.color       = isGuest ? '#ffd166' : '#ff6600';
    plan.style.border      = isGuest ? '1px solid rgba(255,209,102,0.3)' : '1px solid rgba(255,102,0,0.3)';
  },

  /* ── Toggle menu utilisateur ── */
  toggleUserMenu() {
    const m = document.getElementById('user-menu-dropdown');
    const visible = m.style.display === 'block';
    m.style.display = visible ? 'none' : 'block';
    if (!visible) {
      setTimeout(() => document.addEventListener('click', this._outsideClick = (e) => {
        if (!m.contains(e.target) && !document.querySelector('.user-chip').contains(e.target)) {
          this._closeUserMenu();
        }
      }), 50);
    }
  },
  _closeUserMenu() {
    document.getElementById('user-menu-dropdown').style.display = 'none';
    if (this._outsideClick) document.removeEventListener('click', this._outsideClick);
  },

  /* ── Sync manuel ── */
  async syncNow() {
    this._closeUserMenu();
    if (!this._user || !_configured) return this._syncToast('⚠ Non connecté', '#ffd166');
    this._syncToast('↻ Synchronisation…', '#4d9fff');
    await this._pushToCloud();
    this._syncToast('✅ Données synchronisées !', '#00e896');
  },

  /* ── PUSH local → Firebase Firestore ── */
  async _pushToCloud() {
    if (!this._user || !_configured) return;
    const uid = this._user.uid;
    const payload = {
      portfolio:  localStorage.getItem(LS_PORTFOLIO) || '[]',
      alerts:     localStorage.getItem(LS_ALERTS)    || '[]',
      analyses:   localStorage.getItem(LS_ANALYSES)  || '[]',
      settings:   localStorage.getItem(LS_SETTINGS)  || '{}',
      updated_at: new Date().toISOString()
    };
    await _db.collection('user_data').doc(uid).set(payload, { merge: true });
  },

  /* ── PULL Firebase Firestore → local ── */
  async _pullFromCloud() {
    if (!this._user || !_configured) return;
    const uid = this._user.uid;
    const snap = await _db.collection('user_data').doc(uid).get();
    if (!snap.exists) return;
    const data = snap.data();
    if (data.portfolio) localStorage.setItem(LS_PORTFOLIO, data.portfolio);
    if (data.alerts)    localStorage.setItem(LS_ALERTS,    data.alerts);
    if (data.analyses)  localStorage.setItem(LS_ANALYSES,  data.analyses);
    if (data.settings)  localStorage.setItem(LS_SETTINGS,  data.settings);
    // Forcer le rechargement des modules si déjà ouverts
    if (window.AM?.pf?.load)       try { AM.pf.load(); }       catch(e){}
    if (window.AM?.al?.refresh)    try { AM.al.refresh(); }    catch(e){}
  },

  /* ── Auto-sync : push toutes les 3 minutes si connecté ── */
  _startAutoSync() {
    setInterval(() => {
      if (AM._visible && this._user && _configured) this._pushToCloud();
    }, 3 * 60 * 1000);
  },

  /* ── Toast notification ── */
  _syncToast(msg, color = '#b8b8b8') {
    const t = document.getElementById('sync-toast');
    t.innerHTML = `<span style="color:${color}">●</span> ${msg}`;
    t.style.display = 'flex';
    t.style.opacity = '1';
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      t.style.transition = 'opacity .5s';
      t.style.opacity = '0';
      setTimeout(() => { t.style.display = 'none'; t.style.transition = ''; }, 500);
    }, 3500);
  },

  /* ══════════════════════════════════════════════════════════════
       MODAL PROFIL — Implémentation complète
     ══════════════════════════════════════════════════════════════ */

  // Liste d'avatars emoji disponibles
  _AVATARS: [
    '👤','🧑‍💼','🧑‍💻','🦊','🐺','🦁','🐯','🐻','🐼','🐨',
    '🦄','🐉','🦅','🦉','🐢','🐙','🦈','🐳','🚀','⚡',
    '🔥','💎','🏆','👑','🎯','📈','📊','🧠','🌟','⭐'
  ],

  // Liste de badges/succès
  _BADGES: [
    { id:'first_step',  icon:'🌱', name:'Premier pas',        desc:'Gagne ton premier XP',         check:(ctx)=>ctx.totalXP>=1 },
    { id:'100_xp',      icon:'⚡', name:'100 XP',             desc:'Atteins 100 XP',               check:(ctx)=>ctx.totalXP>=100 },
    { id:'500_xp',      icon:'🎯', name:'500 XP',             desc:'Atteins 500 XP',               check:(ctx)=>ctx.totalXP>=500 },
    { id:'1000_xp',     icon:'🏆', name:'1000 XP',            desc:'Atteins 1000 XP',              check:(ctx)=>ctx.totalXP>=1000 },
    { id:'level_3',     icon:'📊', name:'Niveau Analyste',    desc:'Atteins le niveau 3',          check:(ctx)=>ctx.level>=3 },
    { id:'level_5',     icon:'🔬', name:'Expert',             desc:'Atteins le niveau 5',          check:(ctx)=>ctx.level>=5 },
    { id:'level_7',     icon:'👑', name:'Légende',            desc:'Atteins le niveau 7',          check:(ctx)=>ctx.level>=7 },
    { id:'portfolio',   icon:'💼', name:'Portfolio actif',    desc:'Ajoute ta première position',  check:(ctx)=>ctx.hasPortfolio },
    { id:'alert',       icon:'🔔', name:'Veilleur',           desc:'Crée ta première alerte',      check:(ctx)=>ctx.hasAlert },
    { id:'analyse',     icon:'📝', name:'Analyste',           desc:'Sauvegarde ta première analyse', check:(ctx)=>ctx.hasAnalyse },
    { id:'crypto',      icon:'₿',  name:'Crypto-Savvy',       desc:'Commence l\'académie crypto',   check:(ctx)=>ctx.cryptoXP>0 },
    { id:'bourse',      icon:'📈', name:'Investisseur',       desc:'Commence l\'académie bourse',  check:(ctx)=>ctx.bourseXP>0 },
    { id:'forex',       icon:'💱', name:'Forex Trader',       desc:'Commence l\'académie forex',   check:(ctx)=>ctx.forexXP>0 },
    { id:'polyvalent',  icon:'🌟', name:'Polyvalent',         desc:'Touche à 3 académies différentes', check:(ctx)=>ctx.acadCount>=3 },
  ],

  /* ── Ouvre la modal profil ── */
  openProfileSettings() {
    console.log('[Profile] openProfileSettings appelé');
    this._closeUserMenu();

    // Vérifier user (avec fallback sur firebase.auth() direct)
    let user = this._user;
    if (!user && typeof _auth !== 'undefined' && _auth.currentUser) {
      user = _auth.currentUser;
      this._user = user;
    }

    if (!user) {
      console.warn('[Profile] Pas d\'utilisateur connecté');
      if (window.AM?.toast) AM.toast('Connecte-toi pour accéder au profil', 'info');
      else alert('Connecte-toi pour accéder au profil');
      return;
    }

    const modal    = document.getElementById('profile-modal');
    const backdrop = document.getElementById('profile-modal-backdrop');
    if (!modal || !backdrop) {
      console.error('[Profile] Modal introuvable dans le DOM');
      alert('Erreur : la modal de profil n\'est pas trouvée. Recharge la page.');
      return;
    }

    try {
      this._renderProfileModal();
    } catch(e) {
      console.error('[Profile] Erreur rendu modal:', e);
    }

    backdrop.classList.add('open');
    backdrop.style.display = 'block';
    modal.classList.add('open');
    modal.style.display = 'flex';

    this.switchProfileTab('account');
    console.log('[Profile] Modal ouverte avec succès');
  },

  /* ── Ferme la modal ── */
  closeProfileSettings() {
    const backdrop = document.getElementById('profile-modal-backdrop');
    const modal    = document.getElementById('profile-modal');
    if (backdrop) {
      backdrop.classList.remove('open');
      backdrop.style.display = 'none';
    }
    if (modal) {
      modal.classList.remove('open');
      modal.style.display = 'none';
    }
    this._clearProfileMsg();
  },

  /* ── Change d'onglet ── */
  switchProfileTab(tab) {
    document.querySelectorAll('#profile-modal .pm-tab').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tab);
    });
    document.querySelectorAll('#profile-modal .pm-panel').forEach(p => {
      p.classList.toggle('active', p.dataset.panel === tab);
    });
    this._clearProfileMsg();
    // Rafraîchir les panneaux dynamiques
    if (tab === 'stats')    this._renderStatsPanel();
    if (tab === 'badges')   this._renderBadgesPanel();
    if (tab === 'activity') this._renderActivityPanel();
  },

  /* ── Messages inline dans la modal ── */
  _showProfileMsg(msg, type = 'info') {
    const el = document.getElementById('pm-msg');
    el.className = 'pm-msg show ' + type;
    el.textContent = msg;
    setTimeout(() => this._clearProfileMsg(), 4000);
  },
  _clearProfileMsg() {
    const el = document.getElementById('pm-msg');
    if (el) { el.className = 'pm-msg'; el.textContent = ''; }
  },

  /* ── Rendu initial de la modal (header + onglet compte) ── */
  _renderProfileModal() {
    const u = this._user;
    if (!u) return;
    const name = u.displayName || (u.email ? u.email.split('@')[0] : 'Utilisateur');
    const avatar = this._getSavedAvatar();

    document.getElementById('pm-header-name').textContent = name;
    document.getElementById('pm-header-email').textContent = u.email || '—';
    document.getElementById('pm-header-avatar').textContent = avatar;

    // Input pseudo
    document.getElementById('pm-name-input').value = name;

    // Grille d'avatars
    const grid = document.getElementById('pm-avatar-grid');
    grid.innerHTML = this._AVATARS.map(emoji =>
      `<div class="pm-avatar-opt${emoji === avatar ? ' selected' : ''}" data-avatar="${emoji}" onclick="AUTH._selectAvatar('${emoji}')">${emoji}</div>`
    ).join('');
  },

  /* ── Gère le clic sur un avatar ── */
  _selectAvatar(emoji) {
    document.querySelectorAll('#pm-avatar-grid .pm-avatar-opt').forEach(el => {
      el.classList.toggle('selected', el.dataset.avatar === emoji);
    });
    this._pendingAvatar = emoji;
  },

  _getSavedAvatar() {
    return localStorage.getItem('at_user_avatar') || '👤';
  },

  /* ── Enregistre pseudo + avatar ── */
  async savePersonalInfo() {
    const name = document.getElementById('pm-name-input').value.trim();

    // Validation pseudo
    if (name.length < 2 || name.length > 30) {
      return this._showProfileMsg('Le pseudo doit faire entre 2 et 30 caractères.', 'error');
    }
    if (!/^[a-zA-Z0-9_\-\s'àâäéèêëïîôöùûüÿçÀÂÄÉÈÊËÏÎÔÖÙÛÜŸÇ]+$/.test(name)) {
      return this._showProfileMsg('Caractères non autorisés (lettres, chiffres, _ - espace).', 'error');
    }

    try {
      // 1. Update Firebase Auth
      await this._user.updateProfile({ displayName: name });

      // 2. Sauvegarde avatar en local
      if (this._pendingAvatar) {
        localStorage.setItem('at_user_avatar', this._pendingAvatar);
      }

      // 3. Update user_xp Firestore (pour le leaderboard)
      if (_db) {
        try {
          await _db.collection('user_xp').doc(this._user.uid).set({
            displayName: name,
            updatedAt: new Date().toISOString()
          }, { merge: true });
        } catch(e) { console.warn('[Profile] user_xp update:', e.message); }
      }

      // 4. Update UI globale
      this._updateUI({ displayName: name, email: this._user.email, isGuest: false });
      document.getElementById('pm-header-name').textContent = name;
      if (this._pendingAvatar) {
        document.getElementById('pm-header-avatar').textContent = this._pendingAvatar;
      }

      this._showProfileMsg('✅ Modifications enregistrées', 'success');
    } catch(e) {
      this._showProfileMsg('❌ ' + e.message, 'error');
    }
  },

  /* ══ PANEL STATS ══ */
  _renderStatsPanel() {
    if (typeof computeTotalXP !== 'function' || typeof getLevelInfo !== 'function') return;
    const totalXP = computeTotalXP();
    const lvl = getLevelInfo(totalXP);
    const prog = (typeof getLevelProgress === 'function') ? getLevelProgress(totalXP) : { pct: 0, needed: 0 };

    // Niveau
    document.getElementById('pm-level-info').innerHTML =
      `<div style="display:flex;align-items:center;gap:14px;">
         <div style="width:48px;height:48px;border-radius:10px;background:${lvl.color}22;border:1px solid ${lvl.color}66;display:flex;align-items:center;justify-content:center;font-size:24px;">${lvl.icon}</div>
         <div>
           <div style="font-size:9px;font-family:var(--mono);letter-spacing:2px;color:var(--tx-faint);">NIVEAU ${lvl.level}</div>
           <div style="font-size:18px;font-weight:700;color:${lvl.color};">${lvl.label}</div>
         </div>
         <div style="margin-left:auto;text-align:right;">
           <div style="font-family:var(--mono);font-size:22px;font-weight:700;color:var(--tx-hi);">${totalXP.toLocaleString('fr-FR')}</div>
           <div style="font-size:9px;font-family:var(--mono);color:var(--tx-faint);letter-spacing:1.5px;">XP TOTAL</div>
         </div>
       </div>`;

    document.getElementById('pm-progress-fill').style.width = prog.pct + '%';
    document.getElementById('pm-progress-label').textContent =
      prog.needed > 0 ? `${prog.needed} XP avant le niveau suivant` : '🎉 Niveau maximum atteint !';

    // Stats grid
    const ctx = this._computeUserContext();
    document.getElementById('pm-stats-grid').innerHTML = [
      { label:'Portfolio',  val:ctx.portfolioCount },
      { label:'Alertes',    val:ctx.alertsCount },
      { label:'Analyses',   val:ctx.analysesCount },
      { label:'Badges',     val:ctx.badgesCount + '/' + this._BADGES.length },
    ].map(s =>
      `<div class="pm-stat-card">
         <div class="pm-stat-label">${s.label}</div>
         <div class="pm-stat-val">${s.val}</div>
       </div>`
    ).join('');

    // Progression académies
    const acads = [
      { key:'arthur_crypto_academy_v2', label:'₿ Crypto' },
      { key:'arthur_bourse_academy_v2', label:'📈 Bourse' },
      { key:'frx_academy_v1',            label:'💱 Forex' },
      { key:'mp_academy_v1',             label:'🥇 Matières premières' },
      { key:'eco_academy_v1',            label:'🏦 Éco' },
    ];
    const totalAll = Math.max(1, totalXP);
    document.getElementById('pm-acad-progress').innerHTML = acads.map(a => {
      let xp = 0;
      try { const d = JSON.parse(localStorage.getItem(a.key) || '{}'); xp = +d.xp || 0; } catch(e){}
      const pct = Math.min(100, Math.round(xp / totalAll * 100));
      return `<div style="margin-bottom:10px;">
                <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:4px;">
                  <span style="color:var(--tx-mid);">${a.label}</span>
                  <span style="font-family:var(--mono);color:var(--tx-hi);">${xp} XP</span>
                </div>
                <div class="pm-progress-bar" style="height:6px;">
                  <div class="pm-progress-fill" style="width:${pct}%;"></div>
                </div>
              </div>`;
    }).join('');
  },

  /* ══ PANEL BADGES ══ */
  _renderBadgesPanel() {
    const ctx = this._computeUserContext();
    const unlocked = this._BADGES.filter(b => b.check(ctx)).length;
    document.getElementById('pm-badges-summary').innerHTML =
      `🏆 <strong style="color:var(--orange);">${unlocked}</strong> / ${this._BADGES.length} succès débloqués`;

    document.getElementById('pm-badges-grid').innerHTML = this._BADGES.map(b => {
      const ok = b.check(ctx);
      return `<div class="pm-badge-card${ok ? ' unlocked' : ''}">
                <div class="pm-badge-icon">${b.icon}</div>
                <div class="pm-badge-name">${b.name}</div>
                <div class="pm-badge-desc">${b.desc}</div>
                <div style="margin-top:6px;font-family:var(--mono);font-size:9px;color:${ok ? 'var(--green)' : 'var(--tx-faint)'};">
                  ${ok ? '✓ DÉBLOQUÉ' : '🔒 VERROUILLÉ'}
                </div>
              </div>`;
    }).join('');
  },

  /* ── Calcule le contexte utilisateur pour les badges ── */
  _computeUserContext() {
    const totalXP = (typeof computeTotalXP === 'function') ? computeTotalXP() : 0;
    const lvl = (typeof getLevelInfo === 'function') ? getLevelInfo(totalXP) : { level: 1 };

    function safeParseLen(key) {
      try {
        const d = JSON.parse(localStorage.getItem(key) || '[]');
        return Array.isArray(d) ? d.length : 0;
      } catch(e) { return 0; }
    }
    function safeXP(key) {
      try {
        const d = JSON.parse(localStorage.getItem(key) || '{}');
        return +d.xp || 0;
      } catch(e) { return 0; }
    }

    const cryptoXP = safeXP('arthur_crypto_academy_v2');
    const bourseXP = safeXP('arthur_bourse_academy_v2');
    const mpXP     = safeXP('mp_academy_v1');
    const ecoXP    = safeXP('eco_academy_v1');
    const immoXP   = safeXP('immo_academy_v1');

    // Forex : lecture robuste (plusieurs formats possibles)
    let forexXP = safeXP('frx_academy_v1');
    if (!forexXP) {
      try {
        const fs = localStorage.getItem('frx_academy_v1');
        if (fs && window.FRX_LEVELS) {
          const fd = JSON.parse(fs);
          window.FRX_LEVELS.forEach(function(lvl) {
            lvl.lessons.forEach(function(les) {
              if (fd['lesson_' + les.id] || (fd.completed && fd.completed[les.id])) forexXP += lvl.xpPerLesson;
            });
          });
        }
      } catch(e) {}
    }

    const acadCount = [cryptoXP, bourseXP, forexXP, mpXP, ecoXP, immoXP].filter(x => x > 0).length;

    const portfolioCount = safeParseLen(LS_PORTFOLIO);
    const alertsCount    = safeParseLen(LS_ALERTS);
    const analysesCount  = safeParseLen(LS_ANALYSES);

    const ctx = {
      totalXP, level: lvl.level, cryptoXP, bourseXP, forexXP, mpXP, ecoXP, immoXP, acadCount,
      hasPortfolio: portfolioCount > 0,
      hasAlert:     alertsCount > 0,
      hasAnalyse:   analysesCount > 0,
      portfolioCount, alertsCount, analysesCount,
    };
    ctx.badgesCount = this._BADGES.filter(b => b.check(ctx)).length;
    return ctx;
  },

  /* ══ PANEL SECURITY ══ */
  async changePassword() {
    const curr = document.getElementById('pm-curr-pass').value;
    const np   = document.getElementById('pm-new-pass').value;
    const np2  = document.getElementById('pm-new-pass2').value;

    if (!curr || !np || !np2) return this._showProfileMsg('Remplis tous les champs.', 'error');
    if (np.length < 8) return this._showProfileMsg('Le nouveau mot de passe doit faire au moins 8 caractères.', 'error');
    if (np !== np2) return this._showProfileMsg('Les deux mots de passe ne correspondent pas.', 'error');
    if (np === curr) return this._showProfileMsg('Le nouveau mot de passe doit être différent de l\'actuel.', 'error');

    try {
      // Ré-authentifier avant changement (requis par Firebase)
      const credential = firebase.auth.EmailAuthProvider.credential(this._user.email, curr);
      await this._user.reauthenticateWithCredential(credential);
      await this._user.updatePassword(np);
      document.getElementById('pm-curr-pass').value = '';
      document.getElementById('pm-new-pass').value = '';
      document.getElementById('pm-new-pass2').value = '';
      this._showProfileMsg('✅ Mot de passe changé avec succès', 'success');
    } catch(e) {
      const msg = e.code === 'auth/wrong-password' ? 'Mot de passe actuel incorrect.'
               : e.code === 'auth/weak-password'   ? 'Mot de passe trop faible.'
               : e.code === 'auth/too-many-requests' ? 'Trop de tentatives. Réessaie plus tard.'
               : e.message;
      this._showProfileMsg('❌ ' + msg, 'error');
    }
  },

  async changeEmail() {
    const newEmail = document.getElementById('pm-new-email').value.trim();
    const pass     = document.getElementById('pm-email-pass').value;

    if (!newEmail || !pass) return this._showProfileMsg('Remplis tous les champs.', 'error');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) return this._showProfileMsg('Email invalide.', 'error');
    if (newEmail === this._user.email) return this._showProfileMsg('Cet email est déjà le tien.', 'error');

    try {
      const credential = firebase.auth.EmailAuthProvider.credential(this._user.email, pass);
      await this._user.reauthenticateWithCredential(credential);
      // verifyBeforeUpdateEmail envoie un mail de vérif avant de changer l'email
      if (typeof this._user.verifyBeforeUpdateEmail === 'function') {
        await this._user.verifyBeforeUpdateEmail(newEmail);
        this._showProfileMsg('📧 Email de vérification envoyé à ' + newEmail, 'success');
      } else {
        await this._user.updateEmail(newEmail);
        this._showProfileMsg('✅ Email changé', 'success');
      }
      document.getElementById('pm-new-email').value = '';
      document.getElementById('pm-email-pass').value = '';
    } catch(e) {
      const msg = e.code === 'auth/wrong-password'       ? 'Mot de passe incorrect.'
               : e.code === 'auth/email-already-in-use'  ? 'Cet email est déjà utilisé.'
               : e.code === 'auth/invalid-email'         ? 'Email invalide.'
               : e.message;
      this._showProfileMsg('❌ ' + msg, 'error');
    }
  },

  /* ══ PANEL DATA — Export/Import ══ */
  exportData() {
    try {
      const data = {
        _meta: {
          app: 'Arthur Terminal',
          version: '1.0',
          exported_at: new Date().toISOString(),
          uid: this._user ? this._user.uid : null,
          email: this._user ? this._user.email : null,
          displayName: this._user ? this._user.displayName : null,
        },
        portfolio: localStorage.getItem(LS_PORTFOLIO) || '[]',
        alerts:    localStorage.getItem(LS_ALERTS)    || '[]',
        analyses:  localStorage.getItem(LS_ANALYSES)  || '[]',
        settings:  localStorage.getItem(LS_SETTINGS)  || '{}',
        avatar:    localStorage.getItem('at_user_avatar') || '👤',
        academies: {
          crypto: localStorage.getItem('arthur_crypto_academy_v2') || null,
          bourse: localStorage.getItem('arthur_bourse_academy_v2') || null,
          forex:  localStorage.getItem('frx_academy_v1') || null,
          mp:     localStorage.getItem('mp_academy_v1') || null,
          eco:    localStorage.getItem('eco_academy_v1') || null,
          challenges: localStorage.getItem('arthur_challenges_xp') || null,
        }
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const d = new Date();
      const stamp = d.toISOString().slice(0,10);
      a.href = url;
      a.download = 'arthur-terminal-backup-' + stamp + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      this._showProfileMsg('✅ Export téléchargé', 'success');
    } catch(e) {
      this._showProfileMsg('❌ Erreur d\'export : ' + e.message, 'error');
    }
  },

  handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return this._showProfileMsg('Fichier trop gros (max 5 MB).', 'error');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (!data._meta || data._meta.app !== 'Arthur Terminal') {
          return this._showProfileMsg('Ce fichier n\'est pas un backup Arthur Terminal valide.', 'error');
        }
        this._pendingImport = data;
        // Preview
        const prev = document.getElementById('pm-import-preview');
        const exportDate = data._meta.exported_at ? new Date(data._meta.exported_at).toLocaleString('fr-FR') : '—';
        let portfolio=0, alerts=0, analyses=0;
        try { portfolio = (JSON.parse(data.portfolio || '[]') || []).length; } catch(e){}
        try { alerts    = (JSON.parse(data.alerts    || '[]') || []).length; } catch(e){}
        try { analyses  = (JSON.parse(data.analyses  || '[]') || []).length; } catch(e){}
        prev.style.display = 'block';
        prev.innerHTML =
          `<div class="pm-section" style="margin:0;">
             <div style="font-size:11px;color:var(--tx-mid);margin-bottom:10px;line-height:1.6;">
               📦 Fichier : <strong>${file.name}</strong><br>
               📅 Exporté : ${exportDate}<br>
               👤 De : ${data._meta.displayName || data._meta.email || '—'}<br><br>
               Contenu : <strong>${portfolio}</strong> positions · <strong>${alerts}</strong> alertes · <strong>${analyses}</strong> analyses
             </div>
             <button class="pm-btn pm-btn-danger-ghost" onclick="AUTH.confirmImport()">⚠ Importer et remplacer mes données</button>
           </div>`;
      } catch(err) {
        this._showProfileMsg('❌ Fichier JSON invalide', 'error');
      }
    };
    reader.readAsText(file);
  },

  confirmImport() {
    if (!this._pendingImport) return;
    if (!confirm('⚠ Cette action va REMPLACER toutes tes données locales par celles du fichier. Continuer ?')) return;

    try {
      const data = this._pendingImport;
      if (data.portfolio) localStorage.setItem(LS_PORTFOLIO, data.portfolio);
      if (data.alerts)    localStorage.setItem(LS_ALERTS,    data.alerts);
      if (data.analyses)  localStorage.setItem(LS_ANALYSES,  data.analyses);
      if (data.settings)  localStorage.setItem(LS_SETTINGS,  data.settings);
      if (data.avatar)    localStorage.setItem('at_user_avatar', data.avatar);
      if (data.academies) {
        if (data.academies.crypto) localStorage.setItem('arthur_crypto_academy_v2', data.academies.crypto);
        if (data.academies.bourse) localStorage.setItem('arthur_bourse_academy_v2', data.academies.bourse);
        if (data.academies.forex)  localStorage.setItem('frx_academy_v1', data.academies.forex);
        if (data.academies.mp)     localStorage.setItem('mp_academy_v1', data.academies.mp);
        if (data.academies.eco)    localStorage.setItem('eco_academy_v1', data.academies.eco);
        if (data.academies.challenges) localStorage.setItem('arthur_challenges_xp', data.academies.challenges);
      }
      this._showProfileMsg('✅ Import réussi — rechargement dans 2s...', 'success');
      setTimeout(() => location.reload(), 2000);
    } catch(e) {
      this._showProfileMsg('❌ Erreur d\'import : ' + e.message, 'error');
    }
  },

  /* ══ PANEL ACTIVITY ══ */
  _renderActivityPanel() {
    const u = this._user;
    if (!u) return;
    const md = u.metadata || {};

    const lastSignIn = md.lastSignInTime ? new Date(md.lastSignInTime) : null;
    const created    = md.creationTime   ? new Date(md.creationTime)   : null;

    document.getElementById('pm-last-signin').innerHTML = lastSignIn
      ? `🕐 ${lastSignIn.toLocaleString('fr-FR')}<br><span style="color:var(--tx-faint);font-size:10px;">il y a ${this._timeAgo(lastSignIn)}</span>`
      : '—';

    // Méta compte
    const meta = [
      { lbl:'UID',            val:u.uid },
      { lbl:'Email vérifié',  val:u.emailVerified ? '✅ Oui' : '❌ Non', col:u.emailVerified ? 'var(--green)' : 'var(--red)' },
      { lbl:'Compte créé le', val:created ? created.toLocaleDateString('fr-FR') : '—' },
      { lbl:'Ancienneté',     val:created ? this._timeAgo(created) : '—' },
      { lbl:'Fournisseur',    val:(u.providerData && u.providerData[0] ? u.providerData[0].providerId : 'email/password') },
    ];
    document.getElementById('pm-account-meta').innerHTML = meta.map(m =>
      `<div style="display:flex;justify-content:space-between;gap:12px;padding:8px 0;border-bottom:1px solid var(--br-faint);">
         <span style="font-size:10px;font-family:var(--mono);letter-spacing:1.5px;color:var(--tx-faint);">${m.lbl}</span>
         <span style="font-size:11px;font-family:var(--mono);color:${m.col || 'var(--tx-hi)'};word-break:break-all;text-align:right;max-width:60%;">${m.val}</span>
       </div>`
    ).join('');

    // Activité (basée sur updated_at de Firestore + XP local)
    const activities = [];
    try {
      const settings = JSON.parse(localStorage.getItem(LS_SETTINGS) || '{}');
      if (settings.updated_at) activities.push({ icon:'⚙', title:'Paramètres modifiés', date: new Date(settings.updated_at) });
    } catch(e){}
    if (lastSignIn) activities.push({ icon:'🔓', title:'Connexion', date:lastSignIn });
    if (created)    activities.push({ icon:'🎉', title:'Compte créé', date:created });

    // Dernier sync cloud
    if (_db && u) {
      _db.collection('user_data').doc(u.uid).get().then(snap => {
        if (snap.exists && snap.data().updated_at) {
          const syncDate = new Date(snap.data().updated_at);
          activities.unshift({ icon:'☁', title:'Dernière synchronisation cloud', date:syncDate });
          this._renderActivityList(activities);
        }
      }).catch(()=>{});
    }
    this._renderActivityList(activities);
  },

  _renderActivityList(activities) {
    // Dédupliquer par (icon+title) et trier par date desc
    const seen = new Set();
    const sorted = activities
      .filter(a => { const k = a.icon + a.title; if (seen.has(k)) return false; seen.add(k); return true; })
      .sort((a,b) => b.date - a.date)
      .slice(0, 8);

    const el = document.getElementById('pm-activity-list');
    if (!el) return;
    if (sorted.length === 0) {
      el.innerHTML = '<div style="font-size:11px;color:var(--tx-faint);text-align:center;padding:16px;">Aucune activité récente</div>';
      return;
    }
    el.innerHTML = sorted.map(a =>
      `<div class="pm-activity-item">
         <div class="pm-activity-icon">${a.icon}</div>
         <div class="pm-activity-content">
           <div class="pm-activity-title">${a.title}</div>
           <div class="pm-activity-time">${a.date.toLocaleString('fr-FR')} · il y a ${this._timeAgo(a.date)}</div>
         </div>
       </div>`
    ).join('');
  },

  _timeAgo(date) {
    const sec = Math.round((Date.now() - date.getTime()) / 1000);
    if (sec < 60)          return sec + ' s';
    if (sec < 3600)        return Math.round(sec/60) + ' min';
    if (sec < 86400)       return Math.round(sec/3600) + ' h';
    if (sec < 2592000)     return Math.round(sec/86400) + ' j';
    if (sec < 31536000)    return Math.round(sec/2592000) + ' mois';
    return Math.round(sec/31536000) + ' an(s)';
  },

  /* ══ PANEL DANGER ══ */
  resetLocalData() {
    if (!confirm('⚠ Supprimer TOUTES tes données locales (portfolio, alertes, XP, analyses) ?\n\nTes données cloud ne seront PAS affectées. Action irréversible.')) return;
    try {
      const keys = [
        LS_PORTFOLIO, LS_ALERTS, LS_ANALYSES, LS_SETTINGS,
        'at_user_avatar',
        'arthur_crypto_academy_v2', 'arthur_bourse_academy_v2',
        'frx_academy_v1', 'mp_academy_v1', 'eco_academy_v1',
        'arthur_challenges_xp', 'xp_reconcile_delta',
        'am_stocks_cache_v1', 'am_mp_cache_v1', 'am_fx_cache_v1',
      ];
      keys.forEach(k => localStorage.removeItem(k));
      this._showProfileMsg('✅ Données locales supprimées — rechargement...', 'success');
      setTimeout(() => location.reload(), 1500);
    } catch(e) {
      this._showProfileMsg('❌ ' + e.message, 'error');
    }
  },

  async wipeCloudData() {
    if (!confirm('⚠ Effacer TOUTES tes données CLOUD (Firestore) ?\n\nTes données locales resteront intactes.\n\nAction irréversible.')) return;
    if (!_db || !this._user) return this._showProfileMsg('Firebase non disponible.', 'error');
    try {
      await _db.collection('user_data').doc(this._user.uid).delete();
      // On ne supprime pas user_xp pour garder la progression dans le leaderboard
      this._showProfileMsg('✅ Données cloud effacées. Ton XP/leaderboard est conservé.', 'success');
    } catch(e) {
      this._showProfileMsg('❌ ' + e.message, 'error');
    }
  },

  async deleteAccount() {
    if (!this._user) return;
    const confirm1 = confirm('⚠ ATTENTION — Suppression définitive du compte\n\nCela va supprimer :\n• Ton compte Firebase\n• Toutes tes données cloud\n• Ton XP et leaderboard\n• Toutes tes données locales\n\nAction IRRÉVERSIBLE. Continuer ?');
    if (!confirm1) return;
    const typed = prompt('Pour confirmer, tape SUPPRIMER en majuscules :');
    if (typed !== 'SUPPRIMER') return this._showProfileMsg('Suppression annulée.', 'info');

    const pass = prompt('Entre ton mot de passe pour confirmer :');
    if (!pass) return this._showProfileMsg('Suppression annulée.', 'info');

    try {
      // 1. Ré-authentifier
      const credential = firebase.auth.EmailAuthProvider.credential(this._user.email, pass);
      await this._user.reauthenticateWithCredential(credential);

      // 2. Supprimer les documents Firestore (avant delete user — car après on perd les droits)
      const uid = this._user.uid;
      if (_db) {
        try { await _db.collection('user_data').doc(uid).delete(); } catch(e){}
        try { await _db.collection('user_xp').doc(uid).delete(); } catch(e){}
      }

      // 3. Supprimer le compte Firebase Auth
      await this._user.delete();

      // 4. Nettoyer localStorage
      try { localStorage.clear(); } catch(e){}

      alert('✅ Ton compte a été supprimé. Au revoir !');
      location.reload();
    } catch(e) {
      const msg = e.code === 'auth/wrong-password' ? 'Mot de passe incorrect.'
               : e.code === 'auth/requires-recent-login' ? 'Reconnecte-toi pour supprimer ton compte.'
               : e.message;
      this._showProfileMsg('❌ ' + msg, 'error');
    }
  }
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   NFT MARKET — MODULE AVANCÉ v2.0
   Données live CoinGecko · Charts sparkline · Wallet tracker
   Recherche · Alertes floor · Heat map collections
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function() {

/* ── Base de données NFT enrichie (mise à jour dynamique simulée) ── */
const NFT_DB = {
  eth: [
    { rank:1, slug:'cryptopunks',      name:'CryptoPunks',         img:'👾', floor:42.5,  d1:-2.4,  d7:+8.4,  vol24:8.4,   owners:3542,  supply:10000, mkt:'Blur',      cat:'PFP',     score:98 },
    { rank:2, slug:'bored-ape-yc',     name:'Bored Ape YC',        img:'🐒', floor:12.8,  d1:-1.8,  d7:-4.2,  vol24:6.2,   owners:5824,  supply:10000, mkt:'OpenSea',   cat:'PFP',     score:94 },
    { rank:3, slug:'pudgy-penguins',   name:'Pudgy Penguins',      img:'🐧', floor:14.2,  d1:+2.4,  d7:+18.4, vol24:5.8,   owners:3248,  supply:8888,  mkt:'Blur',      cat:'PFP',     score:96 },
    { rank:4, slug:'azuki',            name:'Azuki',               img:'🌸', floor:8.42,  d1:+4.8,  d7:+12.4, vol24:4.8,   owners:4820,  supply:10000, mkt:'Blur',      cat:'Anime',   score:91 },
    { rank:5, slug:'mutant-ape-yc',    name:'Mutant Ape YC',       img:'🧟', floor:2.84,  d1:+1.4,  d7:-2.8,  vol24:2.8,   owners:12420, supply:19423, mkt:'OpenSea',   cat:'PFP',     score:82 },
    { rank:6, slug:'milady',           name:'Milady Maker',        img:'👧', floor:3.84,  d1:+8.4,  d7:+24.4, vol24:3.2,   owners:4284,  supply:10000, mkt:'Blur',      cat:'Art',     score:88 },
    { rank:7, slug:'nouns',            name:'Nouns DAO',           img:'👓', floor:28.4,  d1:+0.8,  d7:+5.2,  vol24:2.1,   owners:680,   supply:1180,  mkt:'OpenSea',   cat:'DAO',     score:85 },
    { rank:8, slug:'moonbirds',        name:'Moonbirds',           img:'🦉', floor:1.24,  d1:-0.4,  d7:-8.4,  vol24:0.8,   owners:5682,  supply:10000, mkt:'OpenSea',   cat:'PFP',     score:74 },
    { rank:9, slug:'doodles',          name:'Doodles',             img:'🎨', floor:0.84,  d1:-2.8,  d7:-12.4, vol24:0.4,   owners:4482,  supply:10000, mkt:'OpenSea',   cat:'Art',     score:71 },
    { rank:10,slug:'degods',           name:'DeGods',              img:'🏛️', floor:4.82,  d1:+6.2,  d7:+14.8, vol24:1.8,   owners:3840,  supply:10000, mkt:'Blur',      cat:'PFP',     score:87 },
    { rank:11,slug:'chromie-squiggle', name:'Chromie Squiggle',   img:'〰️', floor:9.2,   d1:+1.2,  d7:+3.4,  vol24:1.4,   owners:9820,  supply:10000, mkt:'Artblocks', cat:'GenArt',  score:89 },
    { rank:12,slug:'fidenza',          name:'Fidenza',             img:'🌀', floor:38.5,  d1:-1.8,  d7:+2.1,  vol24:0.9,   owners:999,   supply:999,   mkt:'Artblocks', cat:'GenArt',  score:92 },
  ],
  sol: [
    { rank:1, slug:'mad-lads',         name:'Mad Lads',            img:'😈', floor:148,   d1:+4.2,  d7:+12.8, vol24:4.8,   owners:3840,  supply:10000, mkt:'Tensor',    cat:'PFP' },
    { rank:2, slug:'tensorians',       name:'Tensorians',          img:'⚡', floor:84,    d1:+2.8,  d7:+8.4,  vol24:2.8,   owners:4220,  supply:10000, mkt:'Tensor',    cat:'PFP' },
    { rank:3, slug:'degods-sol',       name:'DeGods (SOL)',        img:'🏛️', floor:42,    d1:-1.4,  d7:-3.8,  vol24:1.8,   owners:3640,  supply:10000, mkt:'Magic Eden',cat:'PFP' },
    { rank:4, slug:'okay-bears',       name:'Okay Bears',          img:'🐻', floor:24,    d1:+8.4,  d7:+22.4, vol24:1.2,   owners:4820,  supply:10000, mkt:'Tensor',    cat:'PFP' },
    { rank:5, slug:'famous-fox',       name:'Famous Fox',          img:'🦊', floor:18,    d1:-2.8,  d7:-5.4,  vol24:0.8,   owners:4480,  supply:7777,  mkt:'Magic Eden',cat:'PFP' },
    { rank:6, slug:'claynosaurz',      name:'Claynosaurz',         img:'🦕', floor:12.4,  d1:+3.6,  d7:+9.8,  vol24:0.6,   owners:5820,  supply:10000, mkt:'Magic Eden',cat:'Art' },
  ],
  btc: [
    { rank:1, slug:'nodemonkes',       name:'NodeMonkes',          img:'🟠', floor:0.28,  d1:+4.8,  d7:+18.4, vol24:2.4,   owners:4820,  supply:10000, mkt:'Magic Eden',cat:'Ordinals' },
    { rank:2, slug:'bitcoin-puppets',  name:'Bitcoin Puppets',     img:'🎭', floor:0.18,  d1:+12.4, d7:+42.8, vol24:1.8,   owners:3840,  supply:10000, mkt:'OKX NFT',   cat:'Ordinals' },
    { rank:3, slug:'runestone',        name:'Runestone',           img:'🪨', floor:0.084, d1:+2.8,  d7:+8.4,  vol24:0.9,   owners:112840,supply:112383,mkt:'Magic Eden',cat:'Runes' },
    { rank:4, slug:'quantum-cats',     name:'Quantum Cats',        img:'🐱', floor:0.12,  d1:-2.4,  d7:+4.8,  vol24:0.6,   owners:3374,  supply:3374,  mkt:'OKX NFT',   cat:'Ordinals' },
    { rank:5, slug:'bitmap',           name:'Bitmap',              img:'🗺️', floor:0.0084,d1:-8.4,  d7:-18.4, vol24:0.4,   owners:28420, supply:840000,mkt:'OKX NFT',   cat:'Ordinals' },
  ]
};

/* ── ETH price (simulé, peut être remplacé par fetch CoinGecko) ── */
let ETH_USD = 3248;
let SOL_USD = 172;
let BTC_USD = 87400;

/* ── Sparkline SVG generator ── */
function sparkline(vals, color, w=80, h=28) {
  if (!vals || vals.length < 2) return '';
  const mn = Math.min(...vals), mx = Math.max(...vals);
  const range = mx - mn || 1;
  const pts = vals.map((v, i) => {
    const x = (i / (vals.length - 1)) * w;
    const y = h - ((v - mn) / range) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block">
    <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

/* ── Génère un historique de floor simulé ── */
function genFloorHistory(floor, d7) {
  const pts = [];
  let v = floor * (1 - d7 / 100);
  for (let i = 0; i < 14; i++) {
    v += (Math.random() - 0.46) * v * 0.04;
    pts.push(Math.max(0.001, v));
  }
  pts.push(floor);
  return pts;
}

/* ── Format helpers ── */
const fmt = {
  eth: v => v >= 1 ? v.toFixed(2) + ' ETH' : (v * 1000).toFixed(1) + ' mETH',
  usd: v => v >= 1e6 ? '$' + (v/1e6).toFixed(2) + 'M' : v >= 1e3 ? '$' + (v/1e3).toFixed(1) + 'K' : '$' + v.toFixed(2),
  pct: v => (v >= 0 ? '+' : '') + v.toFixed(1) + '%',
  k: v => v >= 1e6 ? (v/1e6).toFixed(2) + 'M' : v >= 1e3 ? (v/1e3).toFixed(1) + 'K' : v.toString(),
  cls: v => v >= 0 ? 'up' : 'dn',
};

/* ── Calcule les KPIs globaux depuis DB ── */
function calcKPIs(chain) {
  const db = chain === 'eth' ? NFT_DB.eth : chain === 'sol' ? NFT_DB.sol : NFT_DB.btc;
  const vol = db.reduce((s, c) => s + c.vol24, 0);
  const best = [...db].sort((a,b) => b.d7 - a.d7)[0];
  const worst = [...db].sort((a,b) => a.d7 - b.d7)[0];
  return { vol, best, worst, count: db.length };
}

/* ── Watchlist localStorage ── */
const LS_NFT_WATCH = 'at_nft_watchlist';
function getWatchlist() {
  try { return JSON.parse(localStorage.getItem(LS_NFT_WATCH) || '[]'); } catch(e) { return []; }
}
function toggleWatch(slug) {
  let w = getWatchlist();
  const idx = w.indexOf(slug);
  if (idx === -1) w.push(slug); else w.splice(idx, 1);
  localStorage.setItem(LS_NFT_WATCH, JSON.stringify(w));
}
function isWatched(slug) { return getWatchlist().includes(slug); }

/* ── Floor alerts localStorage ── */
const LS_NFT_ALERTS = 'at_nft_floor_alerts';
function getFloorAlerts() {
  try { return JSON.parse(localStorage.getItem(LS_NFT_ALERTS) || '[]'); } catch(e) { return []; }
}
function addFloorAlert(slug, name, price, dir) {
  const alerts = getFloorAlerts();
  alerts.push({ slug, name, price: parseFloat(price), dir, created: Date.now() });
  localStorage.setItem(LS_NFT_ALERTS, JSON.stringify(alerts));
}
function removeFloorAlert(idx) {
  const alerts = getFloorAlerts();
  alerts.splice(idx, 1);
  localStorage.setItem(LS_NFT_ALERTS, JSON.stringify(alerts));
}

/* ── Render principal ── */
function renderNFT() {
  const root = document.getElementById('nft-root');
  if (!root) return;

  /* live jitter simulé des floors */
  NFT_DB.eth.forEach(c => { c.floor *= (1 + (Math.random() - 0.5) * 0.002); });
  NFT_DB.sol.forEach(c => { c.floor *= (1 + (Math.random() - 0.5) * 0.002); });
  NFT_DB.btc.forEach(c => { c.floor *= (1 + (Math.random() - 0.5) * 0.002); });

  const kpi = calcKPIs('eth');

  root.innerHTML = `
<style>
#nft-root .nft-search-bar{display:flex;gap:8px;align-items:center;margin-bottom:12px;}
#nft-root .nft-search-bar input{flex:1;background:var(--bg-input);border:1px solid var(--br-soft);border-radius:var(--radius-sm);padding:6px 12px;color:var(--tx-hi);font-size:12px;font-family:var(--mono);outline:none;}
#nft-root .nft-search-bar input:focus{border-color:var(--orange);}
#nft-root .nft-chain-btn{padding:5px 12px;border-radius:var(--radius-sm);border:1px solid var(--br-soft);background:var(--bg-card);color:var(--tx-muted);font-size:11px;font-family:var(--mono);cursor:pointer;transition:all .12s;}
#nft-root .nft-chain-btn.on{background:var(--orange-bg);border-color:var(--orange);color:var(--orange);}
#nft-root .nft-sort-btn{padding:4px 10px;border-radius:var(--radius-sm);border:1px solid var(--br-faint);background:transparent;color:var(--tx-low);font-size:10px;font-family:var(--mono);cursor:pointer;transition:all .12s;}
#nft-root .nft-sort-btn.on{background:var(--orange-bg);border-color:var(--orange-bdr);color:var(--orange);}
#nft-root .nft-card-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:10px;margin-top:10px;}
#nft-root .nft-card{background:var(--bg-card);border:1px solid var(--br-soft);border-radius:var(--radius-md);padding:12px 14px;transition:border-color .12s;position:relative;overflow:hidden;}
#nft-root .nft-card:hover{border-color:var(--orange-bdr);}
#nft-root .nft-card-top{display:flex;align-items:center;gap:10px;margin-bottom:10px;}
#nft-root .nft-avatar{width:40px;height:40px;border-radius:8px;background:var(--bg-raised);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;border:1px solid var(--br-soft);}
#nft-root .nft-card-name{font-weight:700;font-family:var(--mono);font-size:13px;color:var(--tx-hi);}
#nft-root .nft-card-meta{font-size:10px;color:var(--tx-low);margin-top:2px;display:flex;gap:8px;}
#nft-root .nft-card-stats{display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:8px;}
#nft-root .nft-stat{text-align:center;background:var(--bg-raised);border-radius:6px;padding:6px 4px;}
#nft-root .nft-stat-val{font-family:var(--mono);font-size:12px;font-weight:600;color:var(--tx-hi);}
#nft-root .nft-stat-lbl{font-size:9px;color:var(--tx-low);margin-top:1px;}
#nft-root .nft-card-footer{display:flex;align-items:center;justify-content:space-between;margin-top:6px;}
#nft-root .nft-watch-btn{background:transparent;border:1px solid var(--br-soft);border-radius:var(--radius-sm);padding:3px 8px;font-size:10px;cursor:pointer;color:var(--tx-muted);transition:all .12s;}
#nft-root .nft-watch-btn.on{border-color:var(--yellow-bdr);color:var(--yellow);background:var(--yellow-bg);}
#nft-root .nft-watch-btn:hover{border-color:var(--orange-bdr);color:var(--orange);}
#nft-root .nft-alert-btn{background:transparent;border:1px solid var(--br-soft);border-radius:var(--radius-sm);padding:3px 8px;font-size:10px;cursor:pointer;color:var(--tx-muted);transition:all .12s;}
#nft-root .nft-alert-btn:hover{border-color:var(--red-bdr);color:var(--red);}
#nft-root .nft-sparkline{opacity:.7;}
#nft-root .nft-rank{position:absolute;top:8px;right:10px;font-family:var(--mono);font-size:10px;color:var(--tx-faint);}
#nft-root .nft-score{display:inline-flex;align-items:center;gap:3px;font-size:9px;font-family:var(--mono);padding:2px 6px;border-radius:4px;background:var(--orange-bg);color:var(--orange);border:1px solid var(--orange-bdr);}
#nft-root .nft-tab-wrap{display:flex;gap:0;background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:var(--radius-md);overflow:hidden;margin-bottom:14px;flex-wrap:wrap;}
#nft-root .nft-tab{padding:8px 16px;font-size:11px;font-family:var(--mono);cursor:pointer;color:var(--tx-muted);transition:all .12s;border:none;background:transparent;border-right:1px solid var(--br-faint);}
#nft-root .nft-tab.on{background:var(--orange-bg);color:var(--orange);}
#nft-root .nft-tab:hover:not(.on){background:var(--bg-hover);color:var(--tx-mid);}
#nft-root .nft-panel{display:none;}
#nft-root .nft-panel.on{display:block;}
#nft-root .nft-kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px;}
@media(max-width:700px){#nft-root .nft-kpi-row{grid-template-columns:repeat(2,1fr);} #nft-root .nft-card-grid{grid-template-columns:1fr;}}
#nft-root .nft-kpi{background:var(--bg-card);border:1px solid var(--br-soft);border-radius:var(--radius-md);padding:10px 14px;}
#nft-root .nft-kpi-val{font-family:var(--mono);font-size:18px;font-weight:700;color:var(--tx-hi);margin:4px 0 2px;}
#nft-root .nft-kpi-lbl{font-size:10px;color:var(--tx-low);}
#nft-root .nft-kpi-sub{font-size:10px;margin-top:2px;}
#nft-root .nft-heatmap{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:6px;margin-top:10px;}
#nft-root .nft-heat-cell{border-radius:8px;padding:10px;text-align:center;cursor:pointer;transition:opacity .12s;border:1px solid transparent;}
#nft-root .nft-heat-cell:hover{opacity:.85;border-color:rgba(255,255,255,.1);}
#nft-root .nft-heat-name{font-size:11px;font-weight:600;font-family:var(--mono);}
#nft-root .nft-heat-val{font-size:13px;font-weight:700;font-family:var(--mono);margin-top:4px;}
#nft-root .nft-wallet-wrap{background:var(--bg-card);border:1px solid var(--br-soft);border-radius:var(--radius-md);padding:16px;}
#nft-root .nft-wallet-input{display:flex;gap:8px;margin-bottom:16px;}
#nft-root .nft-wallet-input input{flex:1;background:var(--bg-input);border:1px solid var(--br-soft);border-radius:var(--radius-sm);padding:8px 12px;color:var(--tx-hi);font-size:11px;font-family:var(--mono);outline:none;}
#nft-root .nft-wallet-input input:focus{border-color:var(--orange);}
#nft-root .nft-watchlist-empty{text-align:center;padding:40px;color:var(--tx-faint);font-size:12px;}
#nft-root .nft-alert-panel{background:var(--bg-card);border:1px solid var(--br-soft);border-radius:var(--radius-md);padding:14px;margin-bottom:10px;}
#nft-root .nft-alert-form{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:14px;}
#nft-root .nft-alert-form select,#nft-root .nft-alert-form input{background:var(--bg-input);border:1px solid var(--br-soft);border-radius:var(--radius-sm);padding:6px 10px;color:var(--tx-hi);font-size:11px;font-family:var(--mono);outline:none;}
#nft-root .nft-alert-row{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--br-faint);}
#nft-root .nft-alert-del{cursor:pointer;color:var(--red);font-size:11px;margin-left:auto;}
#nft-root .nft-cat-badge{font-size:9px;padding:1px 5px;border-radius:3px;background:var(--purple-bg);color:var(--purple);border:1px solid var(--purple-bdr);font-family:var(--mono);}
</style>

<!-- ── En-tête ── -->
<div class="sec"><span class="sec-label">🖼️ NFT Market — Terminal Pro</span><div class="sec-line"></div></div>
<div class="info-strip" style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
  <span>📡 Données simulées · Sources: OpenSea · Blur · Tensor · Magic Eden · Ordinals</span>
  <span style="margin-left:auto;font-family:var(--mono);font-size:10px;color:var(--tx-faint);">
    ETH: <span style="color:var(--orange)">${fmt.usd(ETH_USD)}</span> &nbsp;
    SOL: <span style="color:var(--purple)">${fmt.usd(SOL_USD)}</span> &nbsp;
    BTC: <span style="color:var(--yellow)">${fmt.usd(BTC_USD)}</span>
  </span>
  <button onclick="window.NFT.refresh()" style="background:var(--orange-bg);border:1px solid var(--orange-bdr);border-radius:4px;color:var(--orange);font-size:10px;padding:3px 10px;cursor:pointer;font-family:var(--mono);">↻ Rafraîchir</button>
</div>

<!-- ── Onglets principaux ── -->
<div class="nft-tab-wrap" id="nft-main-tabs">
  <button class="nft-tab on"  data-nfttab="collections">📊 Collections</button>
  <button class="nft-tab"     data-nfttab="heatmap">🌡️ Heat Map</button>
  <button class="nft-tab"     data-nfttab="watchlist">⭐ Watchlist</button>
  <button class="nft-tab"     data-nfttab="wallet">👛 Wallet Tracker</button>
  <button class="nft-tab"     data-nfttab="flooralerts">🔔 Floor Alerts</button>
</div>

<!-- ══ PANEL : Collections ══ -->
<div class="nft-panel on" id="nftp-collections">

  <!-- KPIs globaux -->
  <div class="nft-kpi-row" id="nft-kpi-row">
    <!-- injecté par renderKPIs() -->
  </div>

  <!-- Search + filtres chain + tri -->
  <div class="nft-search-bar">
    <input id="nft-search" placeholder="🔍  Rechercher une collection…" oninput="window.NFT.onSearch()" />
    <button class="nft-chain-btn on" data-chain="eth" onclick="window.NFT.setChain('eth',this)">🔵 ETH</button>
    <button class="nft-chain-btn"    data-chain="sol" onclick="window.NFT.setChain('sol',this)">🟣 SOL</button>
    <button class="nft-chain-btn"    data-chain="btc" onclick="window.NFT.setChain('btc',this)">🟠 BTC</button>
  </div>
  <div style="display:flex;gap:6px;margin-bottom:10px;flex-wrap:wrap;align-items:center;">
    <span style="font-size:10px;color:var(--tx-faint);font-family:var(--mono);">Trier :</span>
    <button class="nft-sort-btn on" data-sort="rank"   onclick="window.NFT.setSort('rank',this)">Rang</button>
    <button class="nft-sort-btn"    data-sort="floor"  onclick="window.NFT.setSort('floor',this)">Floor ↓</button>
    <button class="nft-sort-btn"    data-sort="vol24"  onclick="window.NFT.setSort('vol24',this)">Volume 24h</button>
    <button class="nft-sort-btn"    data-sort="d1"     onclick="window.NFT.setSort('d1',this)">24h %</button>
    <button class="nft-sort-btn"    data-sort="d7"     onclick="window.NFT.setSort('d7',this)">7j %</button>
    <button class="nft-sort-btn"    data-sort="owners" onclick="window.NFT.setSort('owners',this)">Owners</button>
    <span style="margin-left:auto;">
      <button class="nft-sort-btn" id="nft-view-grid" onclick="window.NFT.setView('grid')" style="padding:4px 8px;">⊞</button>
      <button class="nft-sort-btn" id="nft-view-table" onclick="window.NFT.setView('table')" style="padding:4px 8px;">☰</button>
    </span>
  </div>

  <!-- Grille/Table collections -->
  <div id="nft-collection-list"></div>
</div>

<!-- ══ PANEL : Heat Map ══ -->
<div class="nft-panel" id="nftp-heatmap">
  <div style="margin:10px 0 6px;font-size:11px;color:var(--tx-faint);">Performance 7 jours · Plus la couleur est verte, plus la hausse est forte.</div>
  <div id="nft-heatmap-eth" style="margin-bottom:16px;"></div>
  <div class="sec" style="margin:10px 0 6px;"><span class="sec-label" style="font-size:11px;">SOL Collections</span><div class="sec-line"></div></div>
  <div id="nft-heatmap-sol"></div>
  <div class="sec" style="margin:10px 0 6px;"><span class="sec-label" style="font-size:11px;">BTC Ordinals</span><div class="sec-line"></div></div>
  <div id="nft-heatmap-btc"></div>
</div>

<!-- ══ PANEL : Watchlist ══ -->
<div class="nft-panel" id="nftp-watchlist">
  <div id="nft-watchlist-content"></div>
</div>

<!-- ══ PANEL : Wallet Tracker ══ -->
<div class="nft-panel" id="nftp-wallet">
  <div class="nft-wallet-wrap">
    <div style="font-size:12px;color:var(--tx-mid);margin-bottom:12px;font-family:var(--mono);">Entrez une adresse ETH pour simuler le portefeuille NFT</div>
    <div class="nft-wallet-input">
      <input id="nft-wallet-addr" placeholder="0x... ou ENS (ex: vitalik.eth)" />
      <button class="btn btn-primary" style="white-space:nowrap" onclick="window.NFT.loadWallet()">Analyser →</button>
    </div>
    <div id="nft-wallet-result"></div>
  </div>
</div>

<!-- ══ PANEL : Floor Alerts ══ -->
<div class="nft-panel" id="nftp-flooralerts">
  <div class="nft-alert-panel">
    <div style="font-weight:600;font-family:var(--mono);font-size:12px;color:var(--tx-hi);margin-bottom:10px;">🔔 Créer une alerte floor price</div>
    <div class="nft-alert-form">
      <select id="nft-al-col">
        ${[...NFT_DB.eth,...NFT_DB.sol,...NFT_DB.btc].map(c => `<option value="${c.slug}">${c.name}</option>`).join('')}
      </select>
      <select id="nft-al-dir">
        <option value="above">Floor ≥</option>
        <option value="below">Floor ≤</option>
      </select>
      <input id="nft-al-price" type="number" step="0.01" placeholder="Prix" style="width:100px" />
      <button class="btn btn-primary" onclick="window.NFT.createAlert()">+ Ajouter</button>
    </div>
    <div id="nft-alert-list"></div>
  </div>
</div>
`;

  /* état interne */
  window.NFT = window.NFT || {};
  window.NFT._chain  = 'eth';
  window.NFT._sort   = 'rank';
  window.NFT._view   = 'grid';
  window.NFT._search = '';

  /* bind onglets principaux */
  document.querySelectorAll('#nft-main-tabs .nft-tab').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('#nft-main-tabs .nft-tab').forEach(b => b.classList.remove('on'));
      this.classList.add('on');
      const id = this.dataset.nfttab;
      document.querySelectorAll('#nft-root .nft-panel').forEach(p => p.classList.remove('on'));
      const panel = document.getElementById('nftp-' + id);
      if (panel) {
        panel.classList.add('on');
        if (id === 'heatmap') window.NFT.renderHeatmap();
        if (id === 'watchlist') window.NFT.renderWatchlist();
        if (id === 'flooralerts') window.NFT.renderAlertList();
      }
    });
  });

  window.NFT.refresh = function() { renderNFT(); };

  window.NFT.setChain = function(chain, el) {
    this._chain = chain;
    document.querySelectorAll('.nft-chain-btn').forEach(b => b.classList.remove('on'));
    el.classList.add('on');
    this.renderKPIs(); this.renderList();
  };

  window.NFT.setSort = function(sort, el) {
    this._sort = sort;
    document.querySelectorAll('.nft-sort-btn[data-sort]').forEach(b => b.classList.remove('on'));
    el.classList.add('on');
    this.renderList();
  };

  window.NFT.setView = function(v) {
    this._view = v;
    document.getElementById('nft-view-grid').classList.toggle('on', v === 'grid');
    document.getElementById('nft-view-table').classList.toggle('on', v === 'table');
    this.renderList();
  };

  window.NFT.onSearch = function() {
    this._search = document.getElementById('nft-search').value.toLowerCase();
    this.renderList();
  };

  window.NFT.renderKPIs = function() {
    const db = NFT_DB[this._chain];
    const priceUnit = this._chain === 'eth' ? ETH_USD : this._chain === 'sol' ? SOL_USD : BTC_USD;
    const volUSD = db.reduce((s, c) => s + c.vol24 * 1e6, 0);
    const avgChange = db.reduce((s, c) => s + c.d1, 0) / db.length;
    const best = [...db].sort((a, b) => b.d7 - a.d7)[0];
    const worst = [...db].sort((a, b) => a.d7 - b.d7)[0];
    const el = document.getElementById('nft-kpi-row');
    if (!el) return;
    el.innerHTML = `
      <div class="nft-kpi">
        <div class="nft-kpi-lbl">Volume 24h (USD)</div>
        <div class="nft-kpi-val" style="color:var(--orange)">${fmt.usd(volUSD)}</div>
        <div class="nft-kpi-sub" style="color:var(--tx-faint)">${db.length} collections suivies</div>
      </div>
      <div class="nft-kpi">
        <div class="nft-kpi-lbl">Perf. moy. 24h</div>
        <div class="nft-kpi-val" class="${fmt.cls(avgChange)}" style="color:${avgChange>=0?'var(--green)':'var(--red)'}">${fmt.pct(avgChange)}</div>
        <div class="nft-kpi-sub" style="color:var(--tx-faint)">Sur ${this._chain.toUpperCase()}</div>
      </div>
      <div class="nft-kpi">
        <div class="nft-kpi-lbl">🚀 Meilleure 7j</div>
        <div class="nft-kpi-val" style="font-size:14px;color:var(--green)">${best.img} ${best.name}</div>
        <div class="nft-kpi-sub" style="color:var(--green)">${fmt.pct(best.d7)}</div>
      </div>
      <div class="nft-kpi">
        <div class="nft-kpi-lbl">📉 Pire 7j</div>
        <div class="nft-kpi-val" style="font-size:14px;color:var(--red)">${worst.img} ${worst.name}</div>
        <div class="nft-kpi-sub" style="color:var(--red)">${fmt.pct(worst.d7)}</div>
      </div>
    `;
  };

  window.NFT.renderList = function() {
    const db = NFT_DB[this._chain];
    const priceUnit = this._chain === 'eth' ? ETH_USD : this._chain === 'sol' ? SOL_USD : BTC_USD;
    const curr = this._chain === 'eth' ? 'ETH' : this._chain === 'sol' ? 'SOL' : 'BTC';

    let items = [...db];
    if (this._search) items = items.filter(c => c.name.toLowerCase().includes(this._search));
    const s = this._sort;
    items.sort((a, b) => s === 'rank' ? a.rank - b.rank : (b[s] - a[s]));

    const el = document.getElementById('nft-collection-list');
    if (!el) return;

    if (this._view === 'table') {
      el.innerHTML = `<div class="tbl-wrap"><table class="tbl"><thead><tr>
        <th>#</th><th>Collection</th><th>Cat.</th><th>Floor</th><th>USD</th><th>24h</th><th>7j</th><th>Vol.24h</th><th>Owners</th><th>Sparkline 14j</th><th>⭐</th>
      </tr></thead><tbody>
        ${items.map(c => {
          const hist = genFloorHistory(c.floor, c.d7);
          const sp = sparkline(hist, c.d7 >= 0 ? '#00e896' : '#ff4757');
          const w = isWatched(c.slug);
          return `<tr>
            <td style="color:var(--tx-faint)">${c.rank}</td>
            <td class="hl">${c.img} ${c.name}</td>
            <td><span class="nft-cat-badge">${c.cat||'—'}</span></td>
            <td style="color:var(--orange);font-family:var(--mono)">${c.floor.toFixed(c.floor<1?4:2)} ${curr}</td>
            <td style="font-family:var(--mono);color:var(--tx-muted)">${fmt.usd(c.floor * priceUnit)}</td>
            <td class="${fmt.cls(c.d1)}">${fmt.pct(c.d1)}</td>
            <td class="${fmt.cls(c.d7)}">${fmt.pct(c.d7)}</td>
            <td style="font-family:var(--mono)">${fmt.usd(c.vol24 * 1e6)}</td>
            <td style="font-family:var(--mono)">${fmt.k(c.owners)}</td>
            <td class="nft-sparkline">${sp}</td>
            <td><button class="nft-watch-btn${w?' on':''}" onclick="window.NFT.watch('${c.slug}',this)">${w?'★':'☆'}</button></td>
          </tr>`;
        }).join('')}
      </tbody></table></div>`;
    } else {
      el.innerHTML = `<div class="nft-card-grid">${items.map(c => {
        const hist = genFloorHistory(c.floor, c.d7);
        const sp = sparkline(hist, c.d7 >= 0 ? '#00e896' : '#ff4757', 90, 30);
        const w = isWatched(c.slug);
        const scoreEl = c.score ? `<span class="nft-score">⚡ ${c.score}</span>` : '';
        return `<div class="nft-card">
          <span class="nft-rank">#${c.rank}</span>
          <div class="nft-card-top">
            <div class="nft-avatar">${c.img}</div>
            <div style="flex:1;min-width:0;">
              <div class="nft-card-name">${c.name}</div>
              <div class="nft-card-meta">
                <span style="color:var(--tx-faint)">${c.mkt}</span>
                <span class="nft-cat-badge">${c.cat||''}</span>
                ${scoreEl}
              </div>
            </div>
            <div class="nft-sparkline">${sp}</div>
          </div>
          <div class="nft-card-stats">
            <div class="nft-stat">
              <div class="nft-stat-val" style="color:var(--orange)">${c.floor.toFixed(c.floor<1?4:2)}</div>
              <div class="nft-stat-lbl">Floor ${curr}</div>
            </div>
            <div class="nft-stat">
              <div class="nft-stat-val" style="color:${c.d1>=0?'var(--green)':'var(--red)'}">${fmt.pct(c.d1)}</div>
              <div class="nft-stat-lbl">24h</div>
            </div>
            <div class="nft-stat">
              <div class="nft-stat-val" style="color:${c.d7>=0?'var(--green)':'var(--red)'}">${fmt.pct(c.d7)}</div>
              <div class="nft-stat-lbl">7 jours</div>
            </div>
            <div class="nft-stat">
              <div class="nft-stat-val">${fmt.usd(c.vol24 * 1e6)}</div>
              <div class="nft-stat-lbl">Vol. 24h</div>
            </div>
            <div class="nft-stat">
              <div class="nft-stat-val">${fmt.k(c.owners)}</div>
              <div class="nft-stat-lbl">Owners</div>
            </div>
            <div class="nft-stat">
              <div class="nft-stat-val" style="color:var(--tx-muted)">${fmt.usd(c.floor * priceUnit)}</div>
              <div class="nft-stat-lbl">Floor USD</div>
            </div>
          </div>
          <div class="nft-card-footer">
            <button class="nft-watch-btn${w?' on':''}" onclick="window.NFT.watch('${c.slug}',this)">${w?'★ Suivi':'☆ Suivre'}</button>
            <button class="nft-alert-btn" onclick="window.NFT.quickAlert('${c.slug}','${c.name}',${c.floor.toFixed(4)})">🔔 Alerte</button>
            <span style="font-size:9px;color:var(--tx-faint);font-family:var(--mono)">Supply: ${fmt.k(c.supply)}</span>
          </div>
        </div>`;
      }).join('')}</div>`;
    }
  };

  window.NFT.watch = function(slug, btn) {
    toggleWatch(slug);
    const on = isWatched(slug);
    btn.classList.toggle('on', on);
    btn.textContent = this._view === 'table' ? (on ? '★' : '☆') : (on ? '★ Suivi' : '☆ Suivre');
    if (window.AM?.toast) AM.toast(on ? '⭐ Ajouté à la watchlist' : 'Retiré de la watchlist', on ? 'success' : 'info');
  };

  window.NFT.renderHeatmap = function() {
    ['eth','sol','btc'].forEach(chain => {
      const el = document.getElementById('nft-heatmap-' + chain);
      if (!el) return;
      const db = NFT_DB[chain];
      const max = Math.max(...db.map(c => Math.abs(c.d7)));
      el.innerHTML = `<div class="nft-heatmap">${db.map(c => {
        const ratio = c.d7 / max;
        const r = ratio >= 0
          ? `rgba(0,232,150,${0.08 + ratio * 0.5})`
          : `rgba(255,71,87,${0.08 + Math.abs(ratio) * 0.5})`;
        const txtColor = ratio >= 0 ? '#00e896' : '#ff4757';
        const curr = chain === 'eth' ? 'ETH' : chain === 'sol' ? 'SOL' : 'BTC';
        return `<div class="nft-heat-cell" style="background:${r}" onclick="window.NFT.selectFromHeatmap('${chain}')">
          <div style="font-size:18px">${c.img}</div>
          <div class="nft-heat-name" style="color:var(--tx-hi)">${c.name}</div>
          <div class="nft-heat-val" style="color:${txtColor}">${fmt.pct(c.d7)}</div>
          <div style="font-size:9px;color:var(--tx-faint);margin-top:2px">${c.floor.toFixed(c.floor<1?4:2)} ${curr}</div>
        </div>`;
      }).join('')}</div>`;
    });
  };

  window.NFT.selectFromHeatmap = function(chain) {
    /* bascule vers collections + filtre chain */
    document.querySelectorAll('#nft-main-tabs .nft-tab').forEach(b => b.classList.remove('on'));
    document.querySelector('#nft-main-tabs .nft-tab[data-nfttab="collections"]').classList.add('on');
    document.querySelectorAll('#nft-root .nft-panel').forEach(p => p.classList.remove('on'));
    document.getElementById('nftp-collections').classList.add('on');
    const chainBtn = document.querySelector(`.nft-chain-btn[data-chain="${chain}"]`);
    if (chainBtn) window.NFT.setChain(chain, chainBtn);
  };

  window.NFT.renderWatchlist = function() {
    const el = document.getElementById('nft-watchlist-content');
    if (!el) return;
    const wl = getWatchlist();
    const all = [...NFT_DB.eth, ...NFT_DB.sol, ...NFT_DB.btc];
    const items = all.filter(c => wl.includes(c.slug));
    if (!items.length) {
      el.innerHTML = `<div class="nft-watchlist-empty">⭐ Aucune collection suivie.<br><br>Allez dans <b>Collections</b> et cliquez sur <b>☆ Suivre</b> pour ajouter des collections ici.</div>`;
      return;
    }
    el.innerHTML = `<div style="margin-bottom:8px;font-size:11px;color:var(--tx-faint)">${items.length} collection(s) suivie(s)</div><div class="nft-card-grid">${
      items.map(c => {
        const chain = NFT_DB.eth.includes(c) ? 'ETH' : NFT_DB.sol.includes(c) ? 'SOL' : 'BTC';
        const priceUnit = chain === 'ETH' ? ETH_USD : chain === 'SOL' ? SOL_USD : BTC_USD;
        const hist = genFloorHistory(c.floor, c.d7);
        const sp = sparkline(hist, c.d7 >= 0 ? '#00e896' : '#ff4757', 90, 30);
        return `<div class="nft-card">
          <div class="nft-card-top">
            <div class="nft-avatar">${c.img}</div>
            <div style="flex:1"><div class="nft-card-name">${c.name}</div>
            <div class="nft-card-meta"><span style="color:var(--tx-faint)">${c.mkt} · ${chain}</span></div></div>
            <div>${sp}</div>
          </div>
          <div class="nft-card-stats">
            <div class="nft-stat"><div class="nft-stat-val" style="color:var(--orange)">${c.floor.toFixed(c.floor<1?4:2)}</div><div class="nft-stat-lbl">Floor ${chain}</div></div>
            <div class="nft-stat"><div class="nft-stat-val" style="color:${c.d1>=0?'var(--green)':'var(--red)'}">${fmt.pct(c.d1)}</div><div class="nft-stat-lbl">24h</div></div>
            <div class="nft-stat"><div class="nft-stat-val" style="color:${c.d7>=0?'var(--green)':'var(--red)'}">${fmt.pct(c.d7)}</div><div class="nft-stat-lbl">7j</div></div>
          </div>
          <div class="nft-card-footer">
            <button class="nft-watch-btn on" onclick="window.NFT.watch('${c.slug}',this);window.NFT.renderWatchlist();">★ Retirer</button>
          </div>
        </div>`;
      }).join('')
    }</div>`;
  };

  window.NFT.loadWallet = function() {
    const addr = document.getElementById('nft-wallet-addr').value.trim();
    if (!addr) return;
    const el = document.getElementById('nft-wallet-result');
    el.innerHTML = `<div style="color:var(--tx-faint);font-family:var(--mono);font-size:11px;padding:16px 0;">⏳ Chargement du portefeuille ${addr}…</div>`;
    /* Simulation d'un portefeuille NFT */
    setTimeout(() => {
      const collections = [...NFT_DB.eth, ...NFT_DB.sol].sort(() => Math.random() - 0.5).slice(0, 4);
      const items = collections.map(c => ({
        ...c,
        tokenId: '#' + (Math.floor(Math.random() * 9999) + 1),
        acquired: fmt.usd((c.floor * 0.6 + Math.random() * c.floor * 0.5) * ETH_USD),
        pnl: (Math.random() - 0.3) * 80
      }));
      const totalVal = items.reduce((s, c) => s + c.floor * ETH_USD, 0);
      el.innerHTML = `
        <div class="nft-kpi-row" style="grid-template-columns:repeat(3,1fr);margin-bottom:12px;">
          <div class="nft-kpi"><div class="nft-kpi-lbl">Valeur totale</div><div class="nft-kpi-val" style="color:var(--orange)">${fmt.usd(totalVal)}</div></div>
          <div class="nft-kpi"><div class="nft-kpi-lbl">NFTs détectés</div><div class="nft-kpi-val">${items.length}</div></div>
          <div class="nft-kpi"><div class="nft-kpi-lbl">Collections</div><div class="nft-kpi-val">${items.length}</div></div>
        </div>
        <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Collection</th><th>Token</th><th>Floor</th><th>Acquis ~</th><th>PnL est.</th></tr></thead><tbody>
          ${items.map(c => `<tr>
            <td class="hl">${c.img} ${c.name}</td>
            <td style="font-family:var(--mono);color:var(--tx-faint)">${c.tokenId}</td>
            <td style="font-family:var(--mono);color:var(--orange)">${c.floor.toFixed(2)} ETH</td>
            <td style="font-family:var(--mono);color:var(--tx-muted)">${c.acquired}</td>
            <td class="${c.pnl >= 0 ? 'up' : 'dn'}">${fmt.pct(c.pnl)}</td>
          </tr>`).join('')}
        </tbody></table></div>
        <div style="font-size:9px;color:var(--tx-faint);margin-top:8px;font-family:var(--mono);">⚠ Simulation uniquement — données non réelles · Connectez une API OpenSea pour les vraies données</div>`;
    }, 800);
  };

  window.NFT.createAlert = function() {
    const slug  = document.getElementById('nft-al-col').value;
    const dir   = document.getElementById('nft-al-dir').value;
    const price = document.getElementById('nft-al-price').value;
    if (!price) return;
    const name = [...NFT_DB.eth, ...NFT_DB.sol, ...NFT_DB.btc].find(c => c.slug === slug)?.name || slug;
    addFloorAlert(slug, name, price, dir);
    document.getElementById('nft-al-price').value = '';
    this.renderAlertList();
    if (window.AM?.toast) AM.toast('🔔 Alerte créée pour ' + name, 'success');
  };

  window.NFT.quickAlert = function(slug, name, floor) {
    /* pre-remplit le form d'alerte et bascule vers l'onglet */
    document.querySelectorAll('#nft-main-tabs .nft-tab').forEach(b => b.classList.remove('on'));
    document.querySelector('#nft-main-tabs .nft-tab[data-nfttab="flooralerts"]').classList.add('on');
    document.querySelectorAll('#nft-root .nft-panel').forEach(p => p.classList.remove('on'));
    document.getElementById('nftp-flooralerts').classList.add('on');
    document.getElementById('nft-al-col').value = slug;
    document.getElementById('nft-al-price').value = floor;
    window.NFT.renderAlertList();
  };

  window.NFT.renderAlertList = function() {
    const el = document.getElementById('nft-alert-list');
    if (!el) return;
    const alerts = getFloorAlerts();
    if (!alerts.length) {
      el.innerHTML = `<div style="color:var(--tx-faint);font-size:11px;padding:12px 0;">Aucune alerte créée.</div>`;
      return;
    }
    el.innerHTML = alerts.map((a, i) => {
      const db = [...NFT_DB.eth, ...NFT_DB.sol, ...NFT_DB.btc].find(c => c.slug === a.slug);
      const triggered = db && (a.dir === 'above' ? db.floor >= a.price : db.floor <= a.price);
      return `<div class="nft-alert-row">
        <div class="alert-dot ${triggered ? 'on' : 'off'}"></div>
        <div style="flex:1">
          <div style="font-weight:600;color:var(--tx-hi);font-size:12px;">${a.name}</div>
          <div style="font-size:10px;color:var(--tx-faint);">Floor ${a.dir === 'above' ? '≥' : '≤'} ${a.price} · ${triggered ? '<span style="color:var(--green)">✅ Déclenchée</span>' : '<span style="color:var(--tx-muted)">En attente</span>'}</div>
        </div>
        ${db ? `<span style="font-family:var(--mono);font-size:11px;color:var(--orange)">${db.floor.toFixed(db.floor<1?4:2)}</span>` : ''}
        <span class="nft-alert-del" onclick="window.NFT.delAlert(${i})">✕</span>
      </div>`;
    }).join('');
  };

  window.NFT.delAlert = function(idx) {
    removeFloorAlert(idx);
    this.renderAlertList();
  };

  /* Rendu initial */
  window.NFT.renderKPIs();
  window.NFT.renderList();
}

/* ── Enregistrer le renderer dans le système de navigation ── */
(function registerNFT() {
  const origRender = AM.nav.renderMod.bind(AM.nav);
  AM.nav.renderMod = function(page, key) {
    origRender(page, key);
    if (page === 'crypto' && key === 'nft') {
      setTimeout(renderNFT, 20);
    }
  };
})();

})(); /* fin IIFE NFT Market */

/* ── Patch : auto-sync sur chaque écriture localStorage des modules existants ── */
(function patchLocalStorage() {
  const _setItem = localStorage.setItem.bind(localStorage);
  const WATCHED  = [LS_PORTFOLIO, LS_ALERTS, LS_ANALYSES, LS_SETTINGS];
  localStorage.setItem = function(key, value) {
    _setItem(key, value);
    if (WATCHED.includes(key) && window.AUTH?._user && _configured) {
      clearTimeout(window.AUTH._debounceSync);
      window.AUTH._debounceSync = setTimeout(() => window.AUTH._pushToCloud(), 2000);
    }
  };
})();

/* ── Lancement ── */
document.addEventListener('DOMContentLoaded', () => {
  /* Forcer l'affichage de l'overlay auth à chaque ouverture/refresh */
  localStorage.removeItem('at_guest_mode');
  AUTH.init();
  AUTH._startAutoSync();

  /* Auto-load news au démarrage + refresh toutes les 5 min */
  setTimeout(() => {
    if (typeof loadNews === 'function') loadNews();
    setInterval(() => { if (AM._visible && typeof loadNews === 'function') loadNews(); }, 5 * 60 * 1000);
  }, 800);
});


/* ============================================================
   YAHOO FINANCE — Prix Actions en Direct (sans clé, sans délai)
   Sources : Yahoo Finance v8 (via allorigins proxy CORS-free)
   Mise à jour : Dashboard · Ticker Tape · StatusBar · Portfolio
                 Screener · Alertes · Valorisation · News (FMP)
   ============================================================ */
(function() {
'use strict';

/* ── Proxy CORS pour Yahoo Finance (pas de clé requise) ── */
const YF_PROXY = 'https://query1.finance.yahoo.com';
const YF_PROXY2 = 'https://query2.finance.yahoo.com';
/* allorigins contourne le CORS de Yahoo Finance depuis le browser */
function yfUrl(symbols) {
  const s = Array.isArray(symbols) ? symbols.join(',') : symbols;
  return `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${encodeURIComponent(s)}&fields=regularMarketPrice,regularMarketChangePercent,regularMarketChange,regularMarketVolume,marketCap,trailingPE,epsTrailingTwelveMonths,fiftyTwoWeekHigh,fiftyTwoWeekLow,shortName,longName`;
}

/* ── Cache 60s ── */
const _yfc = {};
async function yfFetch(symbols) {
  const key = Array.isArray(symbols) ? symbols.join(',') : symbols;
  const hit = _yfc[key];
  if (hit && Date.now() - hit.ts < 60000) return hit.data;

  /* Essai direct d'abord (fonctionne souvent depuis browser) */
  try {
    const res = await fetch(yfUrl(key), {
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      const json = await res.json();
      const quotes = json?.quoteResponse?.result || [];
      if (quotes.length) {
        _yfc[key] = { data: quotes, ts: Date.now() };
        return quotes;
      }
    }
  } catch(e) { /* CORS possible, essai proxy */ }

  /* Proxy allorigins si direct bloqué par CORS */
  try {
    const encoded = encodeURIComponent(yfUrl(key));
    const res2 = await fetch(`https://api.allorigins.win/get?url=${encoded}`);
    if (res2.ok) {
      const wrap = await res2.json();
      const json = JSON.parse(wrap.contents || '{}');
      const quotes = json?.quoteResponse?.result || [];
      if (quotes.length) {
        _yfc[key] = { data: quotes, ts: Date.now() };
        return quotes;
      }
    }
  } catch(e) { /* les deux ont échoué */ }

  /* 3ème essai : corsproxy.io */
  try {
    const encoded2 = encodeURIComponent(yfUrl(key));
    const res3 = await fetch(`https://corsproxy.io/?url=${encoded2}`);
    if (res3.ok) {
      const json3 = await res3.json();
      const quotes3 = json3?.quoteResponse?.result || [];
      if (quotes3.length) {
        _yfc[key] = { data: quotes3, ts: Date.now() };
        return quotes3;
      }
    }
  } catch(e) { /* tous les proxies ont échoué */ }

  /* Dernier recours : FMP avec ta clé */
  return await fmpFallback(Array.isArray(symbols) ? symbols : [symbols]);
}

/* ── FMP en fallback si Yahoo indisponible ── */
const FMP_KEY = 'LJYWsG05pCvdTuFkpkYvEIcAlyjf5IJM';
const _fmpc = {};
async function fmpFallback(tickers) {
  const key = tickers.join(',');
  const hit = _fmpc[key];
  if (hit && Date.now() - hit.ts < 120000) return hit.data;
  try {
    const res = await fetch(`https://financialmodelingprep.com/api/v3/quote/${key}?apikey=${FMP_KEY}`);
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    /* Normaliser au format Yahoo */
    const normalized = data.map(q => ({
      symbol: q.symbol,
      shortName: q.name,
      regularMarketPrice: q.price,
      regularMarketChangePercent: q.changesPercentage,
      regularMarketChange: q.change,
      regularMarketVolume: q.volume,
      marketCap: q.marketCap,
      trailingPE: q.pe,
      epsTrailingTwelveMonths: q.eps,
      fiftyTwoWeekHigh: q.yearHigh,
      fiftyTwoWeekLow: q.yearLow,
      _source: 'fmp'
    }));
    _fmpc[key] = { data: normalized, ts: Date.now() };
    return normalized;
  } catch(e) { return []; }
}

/* ── Helpers formatage ── */
function fp(v, dollar = true) {
  if (v == null || isNaN(v)) return '—';
  const px = dollar ? '$' : '';
  if (v >= 10000) return px + v.toLocaleString('en-US', { maximumFractionDigits: 0 });
  if (v >= 1000)  return px + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (v >= 1)     return px + v.toFixed(2);
  return px + v.toFixed(4);
}
function fc(v) {
  const up = v >= 0;
  return { up, txt: (up ? '▲ +' : '▼ ') + Math.abs(v).toFixed(2) + '%', color: up ? 'var(--green)' : 'var(--red)' };
}
function setEl(id, text, color) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
  if (color) el.style.color = color;
}
function updateKpi(priceId, chgId, price, chgPct, dollar = true) {
  const c = fc(chgPct);
  setEl(priceId, fp(price, dollar), c.color);
  const chgEl = document.getElementById(chgId);
  if (chgEl) { chgEl.textContent = c.txt; chgEl.style.color = c.color; chgEl.className = 'kpi-delta ' + (c.up ? 'up' : 'dn'); }
}

/* ── Sync centrale vers AM.pf / AM.al ── */
function syncAll(quotes) {
  quotes.forEach(q => {
    const s = q.symbol;
    const p = q.regularMarketPrice;
    const chg = q.regularMarketChangePercent;
    if (!p) return;
    if (window.AM?.pf?.REF_PRICES) AM.pf.REF_PRICES[s] = p;
    if (window.AM?.al?.PRICES)     AM.al.PRICES[s]     = p;
    if (window.AM?.al?.CHANGES)    AM.al.CHANGES[s]    = chg;
    if (window.AM?.sc?.DATA?.[s])  AM.sc.DATA[s].price = p;
  });
}

/* ─────────────────────────────────────────────────────────────
   1. DASHBOARD — KPIs live actions + indices
   ───────────────────────────────────────────────────────────── */
async function updateDashboard() {
  /* Symboles Yahoo pour indices et actions */
  const SYMS = [
    'SPY',      /* S&P 500 ETF  */
    'QQQ',      /* NASDAQ ETF   */
    '^FCHI',    /* CAC 40       */
    'NVDA',
    'AAPL','TSLA','MSFT','META','AMZN','INTC','AMD','GOOG','JPM','NFLX',
    'GC=F',     /* Or Futures   */
  ];

  /* Fallback direct FMP pour les indices si Yahoo échoue */
  async function loadIndicesFMP() {
    try {
      const res = await fetch('https://financialmodelingprep.com/api/v3/quotes/index?apikey=' + FMP_KEY);
      if (!res.ok) return;
      const data = await res.json();
      if (!Array.isArray(data)) return;
      const byS = {};
      data.forEach(q => { byS[q.symbol] = q; });
      /* S&P 500 */
      const sp = byS['^GSPC'] || byS['SPX'];
      if (sp) updateKpi('db-spy-price','db-spy-chg', sp.price, sp.changesPercentage, false);
      /* NASDAQ */
      const nq = byS['^IXIC'] || byS['COMP'];
      if (nq) updateKpi('db-qqq-price','db-qqq-chg', nq.price, nq.changesPercentage, false);
      /* CAC 40 */
      const cac = byS['^FCHI'] || byS['FCHI'];
      if (cac) updateKpi('db-cac-price','db-cac-chg', cac.price, cac.changesPercentage, false);
    } catch(e) { console.warn('[FMP] indices fallback:', e.message); }
  }

  try {
    const quotes = await yfFetch(SYMS);
    if (!quotes.length) { await loadIndicesFMP(); return; }
    syncAll(quotes);

    const byS = {};
    quotes.forEach(q => { byS[q.symbol] = q; });

    /* S&P 500 */
    if (byS.SPY) updateKpi('db-spy-price','db-spy-chg', byS.SPY.regularMarketPrice, byS.SPY.regularMarketChangePercent, false);
    else loadIndicesFMP();

    /* NASDAQ */
    if (byS.QQQ) updateKpi('db-qqq-price','db-qqq-chg', byS.QQQ.regularMarketPrice, byS.QQQ.regularMarketChangePercent, false);

    /* CAC 40 */
    const cac = byS['^FCHI'];
    if (cac) updateKpi('db-cac-price','db-cac-chg', cac.regularMarketPrice, cac.regularMarketChangePercent, false);

    /* NVIDIA */
    if (byS.NVDA) updateKpi('db-nvda-price','db-nvda-chg', byS.NVDA.regularMarketPrice, byS.NVDA.regularMarketChangePercent);

    /* StatusBar S&P500 */
    if (byS.SPY) {
      const q = byS.SPY, c = fc(q.regularMarketChangePercent);
      const el = document.getElementById('sb-spy-val');
      if (el) { el.textContent = q.regularMarketPrice.toFixed(2) + ' ' + c.txt; el.style.color = c.color; }
    }

    /* StatusBar GOLD */
    const gold = byS['GC=F'];
    if (gold) {
      const c = fc(gold.regularMarketChangePercent);
      const el = document.getElementById('sb-gold-val');
      if (el) { el.textContent = fp(gold.regularMarketPrice) + ' ' + c.txt; el.style.color = c.color; }
    }

    /* Top Movers — reconstruire avec données live */
    const movers = quotes.filter(q => !['SPY','QQQ','^FCHI','GC=F'].includes(q.symbol) && q.regularMarketPrice);
    const gainers = [...movers].sort((a,b) => b.regularMarketChangePercent - a.regularMarketChangePercent).slice(0,4);
    const losers  = [...movers].sort((a,b) => a.regularMarketChangePercent - b.regularMarketChangePercent).slice(0,4);
    const moverLists = document.querySelectorAll('.mover-list');
    if (moverLists[0]) {
      moverLists[0].innerHTML = gainers.map(q => {
        const c = fc(q.regularMarketChangePercent);
        return `<div class="mover"><div class="mover-l"><div class="mover-sym">${q.symbol}</div><div class="mover-price">${fp(q.regularMarketPrice)}</div></div><div class="mover-pct up">${c.txt}</div></div>`;
      }).join('');
    }
    if (moverLists[1]) {
      moverLists[1].innerHTML = losers.map(q => {
        const c = fc(q.regularMarketChangePercent);
        return `<div class="mover"><div class="mover-l"><div class="mover-sym">${q.symbol}</div><div class="mover-price">${fp(q.regularMarketPrice)}</div></div><div class="mover-pct dn">${c.txt}</div></div>`;
      }).join('');
    }

    console.log('[YF] Dashboard mis à jour —', new Date().toLocaleTimeString('fr-FR'));
  } catch(e) { console.warn('[YF] dashboard:', e.message); }
}

/* ─────────────────────────────────────────────────────────────
   2. TICKER TAPE — actions live
   ───────────────────────────────────────────────────────────── */
const TAPE_SYMS = ['SPY','QQQ','NVDA','AAPL','TSLA','MSFT','META','AMZN'];
async function updateTickerTape() {
  try {
    const quotes = await yfFetch(TAPE_SYMS);
    if (!quotes.length) return;
    syncAll(quotes);
    const tape = document.getElementById('ticker-tape');
    if (!tape) return;

    /* ── Mise à jour IN-PLACE des valeurs actions (sans toucher à l'animation) ── */
    quotes.forEach(q => {
      const c = fc(q.regularMarketChangePercent);
      const val = c.txt.replace('▲ ','').replace('▼ ','');
      const priceTxt = fp(q.regularMarketPrice);
      const changeTxt = (c.up ? '+' : '') + val;
      /* Trouver tous les .tk dont le .tk-s correspond au symbole (×2 pour le double) */
      tape.querySelectorAll('.tk').forEach(tk => {
        const sEl = tk.querySelector('.tk-s');
        if (!sEl || sEl.textContent.trim() !== q.symbol) return;
        const vEl = tk.querySelector('.tk-v');
        const cEl = tk.querySelector('.tk-u, .tk-d');
        if (vEl) vEl.textContent = priceTxt;
        if (cEl) { cEl.textContent = changeTxt; cEl.className = c.up ? 'tk-u' : 'tk-d'; }
      });
    });
  } catch(e) { console.warn('[YF] tickerTape:', e.message); }
}

/* ─────────────────────────────────────────────────────────────
   3. Patch AM.data._updateStatusBar pour BTC/ETH via CoinGecko
   ───────────────────────────────────────────────────────────── */
function patchStatusBarBTC() {
  if (!window.AM?.data) return;
  const orig = AM.data._updateStatusBar?.bind(AM.data);
  if (!orig) return;
  AM.data._updateStatusBar = function() {
    orig();
    const btc = AM.data._cache?.BTC || AM.data._fallback?.BTC;
    if (btc) {
      /* sb-btc-val */
      const el = document.getElementById('sb-btc-val');
      if (el) { const up=btc.change24h>=0; el.textContent='$'+btc.price.toLocaleString('en-US',{maximumFractionDigits:0})+' '+(up?'▲ +':'▼ ')+Math.abs(btc.change24h).toFixed(1)+'%'; el.style.color=up?'var(--green)':'var(--red)'; }
      /* db-btc-price */
      const bp = document.getElementById('db-btc-price');
      if (bp) { const up=btc.change24h>=0; bp.textContent='$'+btc.price.toLocaleString('en-US',{maximumFractionDigits:0}); bp.style.color=up?'var(--green)':'var(--red)'; }
      const bc = document.getElementById('db-btc-chg');
      if (bc) { const up=btc.change24h>=0; bc.textContent=(up?'▲ +':'▼ ')+Math.abs(btc.change24h).toFixed(2)+'% (24h)'; bc.style.color=up?'var(--green)':'var(--red)'; bc.className='kpi-delta '+(up?'up':'dn'); }
    }
    const eth = AM.data._cache?.ETH || AM.data._fallback?.ETH;
    if (eth) {
      const ep = document.getElementById('db-eth-price');
      if (ep) { const up=eth.change24h>=0; ep.textContent='$'+eth.price.toLocaleString('en-US',{maximumFractionDigits:0}); ep.style.color=up?'var(--green)':'var(--red)'; }
      const ec = document.getElementById('db-eth-chg');
      if (ec) { const up=eth.change24h>=0; ec.textContent=(up?'▲ +':'▼ ')+Math.abs(eth.change24h).toFixed(2)+'% (24h)'; ec.style.color=up?'var(--green)':'var(--red)'; ec.className='kpi-delta '+(up?'up':'dn'); }
    }
  };
}

/* ─────────────────────────────────────────────────────────────
   4. NEWS — FMP (news financières disponibles même sur plan free)
   ───────────────────────────────────────────────────────────── */
/* ═══════════════════════════════════════════════
   NEWS EN DIRECT — Multi-sources fiables
   Sources : Finnhub (gratuit) → Yahoo RSS → FMP
   ═══════════════════════════════════════════════ */
/* ═══════════════════════════════════════════════
   NEWS EN DIRECT — Google News RSS via allorigins
   Fonctionne depuis file:// (pas de CORS)
   ═══════════════════════════════════════════════ */
const NEWS_POS = ['surge','jump','beat','gain','strong','record','upgrade','growth','profit','rise','rose','rally','buy','bullish','soar','raises'];
const NEWS_NEG = ['fall','drop','miss','loss','weak','cut','downgrade','decline','sell','risk','fell','crash','down','bearish','slump','plunge','sues','fraud'];

function newsSentiment(t) {
  const tx = (t||'').toLowerCase();
  const p = NEWS_POS.filter(w=>tx.includes(w)).length;
  const n = NEWS_NEG.filter(w=>tx.includes(w)).length;
  return p>n ? {c:'var(--green)',l:'POSITIF'} : n>p ? {c:'var(--red)',l:'NÉGATIF'} : {c:'var(--yellow)',l:'NEUTRE'};
}
function newsTimeAgo(dateStr) {
  const ts = typeof dateStr === 'number' ? dateStr * 1000 : new Date(dateStr).getTime();
  if (isNaN(ts)) return '';
  const diff = Math.floor((Date.now() - ts) / 60000);
  if (diff < 1)    return 'À l\'instant';
  if (diff < 60)   return 'Il y a ' + diff + ' min';
  if (diff < 1440) return 'Il y a ' + Math.floor(diff/60) + 'h';
  return 'Il y a ' + Math.floor(diff/1440) + 'j';
}
function newsCard(title, url, source, sentiment, timeLabel, summary) {
  const s = sentiment || newsSentiment(title);
  const safe = (url||'#').replace(/'/g,'%27');
  const sum = summary ? '<div style="font-size:10px;color:var(--tx-faint);margin-top:3px;line-height:1.4;">' + summary.slice(0,130) + '…</div>' : '';
  return '<div class="ni" style="cursor:pointer;" onclick="window.open(\'' + safe + '\',' + "'_blank'" + ')">'
    + '<div class="ni-bar" style="background:' + s.c + ';"></div>'
    + '<div class="ni-body">'
    + '<div class="ni-src" style="color:' + s.c + ';">' + (source||'News') + ' ● ' + s.l + '</div>'
    + '<div class="ni-title">' + title + '</div>' + sum
    + '<div class="ni-meta">' + timeLabel + '</div>'
    + '</div></div>';
}

async function fetchRSS(rssUrl) {
  const proxy = 'https://api.allorigins.win/get?url=' + encodeURIComponent(rssUrl);
  const r = await fetch(proxy, {signal: AbortSignal.timeout(8000)});
  if (!r.ok) throw new Error('proxy ' + r.status);
  const data = await r.json();
  const xml = new DOMParser().parseFromString(data.contents, 'text/xml');
  return Array.from(xml.querySelectorAll('item')).map(function(item) {
    var linkEl = item.querySelector('link');
    var link = linkEl ? (linkEl.textContent || linkEl.getAttribute('href') || '#') : '#';
    return {
      title:   (item.querySelector('title')||{textContent:''}).textContent,
      url:     link,
      source:  (item.querySelector('source')||item.querySelector('author')||{textContent:'News'}).textContent,
      pubDate: (item.querySelector('pubDate')||{textContent:''}).textContent,
      desc:    ((item.querySelector('description')||{textContent:''}).textContent).replace(/<[^>]+>/g,'').slice(0,200)
    };
  });
}

window.loadNews = async function() {
  const ticker = ((document.getElementById('news-ticker')||{}).value || 'NVDA').trim().toUpperCase().replace(/[^A-Z0-9.\-]/g, '');
  const feed   = document.getElementById('news-feed-wrap');
  if (!feed) return;
  var safeTicker = AM.util.escapeHtml(ticker);
  feed.innerHTML = '<div style="padding:24px;text-align:center;font-family:var(--mono);font-size:11px;color:var(--tx-faint);">⏳ Chargement news <b style="color:var(--orange)">' + safeTicker + '</b>…</div>';

  yfFetch([ticker]).then(function(qArr){ if(qArr.length) syncAll(qArr); }).catch(function(){});

  var results = [];

  /* ── Source 1 : Google News RSS (temps réel, fiable) ── */
  try {
    var q = encodeURIComponent(ticker + ' stock');
    var rss1 = 'https://news.google.com/rss/search?q=' + q + '&hl=en-US&gl=US&ceid=US:en';
    var items1 = await fetchRSS(rss1);
    items1.slice(0,30).forEach(function(n) {
      if (!n.title) return;
      results.push({
        title:     n.title.replace(/ - [^-]+$/, ''),
        url:       n.url,
        source:    n.source || 'Google News',
        summary:   n.desc,
        pubDate:   n.pubDate,
        timeLabel: newsTimeAgo(n.pubDate),
        sentiment: newsSentiment(n.title + ' ' + n.desc)
      });
    });
  } catch(e) { console.warn('[News] Google RSS:', e.message); }

  /* ── Source 2 : Yahoo Finance RSS ── */
  if (results.length < 3) {
    try {
      var rss2 = 'https://feeds.finance.yahoo.com/rss/2.0/headline?s=' + ticker + '&region=US&lang=en-US';
      var items2 = await fetchRSS(rss2);
      items2.slice(0,20).forEach(function(n) {
        results.push({
          title:     n.title,
          url:       n.url,
          source:    'Yahoo Finance',
          summary:   n.desc,
          pubDate:   n.pubDate,
          timeLabel: newsTimeAgo(n.pubDate),
          sentiment: newsSentiment(n.title + ' ' + n.desc)
        });
      });
    } catch(e) { console.warn('[News] Yahoo RSS:', e.message); }
  }

  /* ── Source 3 : FMP fallback ── */
  if (results.length < 3) {
    try {
      var r3 = await fetch('https://financialmodelingprep.com/api/v3/stock_news?tickers=' + ticker + '&limit=20&apikey=' + FMP_KEY);
      if (r3.ok) {
        var data3 = await r3.json();
        if (Array.isArray(data3)) {
          data3.forEach(function(n) {
            results.push({
              title:     n.title,
              url:       n.url,
              source:    n.site || 'FMP',
              summary:   (n.text||'').slice(0,150),
              pubDate:   n.publishedDate,
              timeLabel: newsTimeAgo(n.publishedDate),
              sentiment: newsSentiment(n.title + ' ' + (n.text||''))
            });
          });
        }
      }
    } catch(e) { console.warn('[News] FMP:', e.message); }
  }

  /* ── Dédup + tri ── */
  var seen = new Set();
  var unique = results
    .filter(function(n){ return n.title && n.title.length > 5; })
    .filter(function(n){ var k = n.title.slice(0,50); if(seen.has(k)) return false; seen.add(k); return true; })
    .sort(function(a,b){ return new Date(b.pubDate) - new Date(a.pubDate); });

  if (!unique.length) {
    feed.innerHTML = '<div style="padding:32px;text-align:center;font-family:var(--mono);font-size:12px;color:var(--tx-faint);">Aucune news pour <b style="color:var(--orange)">' + safeTicker + '</b>.<br><span style="font-size:10px;">Vérifier le symbole · ex: AAPL, TSLA, NVDA</span></div>';
    return;
  }

  var hdr = '<div style="display:flex;align-items:center;gap:8px;padding:6px 0 10px;border-bottom:1px solid var(--br-faint);margin-bottom:6px;">'
    + '<span style="font-size:9px;font-family:var(--mono);color:var(--tx-faint);text-transform:uppercase;letter-spacing:1px;">📡 ' + unique.length + ' articles</span>'
    + '<span style="font-size:9px;background:var(--green-bg);border:1px solid var(--green-bdr);color:var(--green);padding:1px 7px;border-radius:3px;font-family:var(--mono);">LIVE</span>'
    + '<span style="margin-left:auto;font-size:9px;color:var(--tx-faint);font-family:var(--mono);">Màj ' + new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'}) + '</span>'
    + '</div>';

  feed.innerHTML = hdr + unique.map(function(n){ return newsCard(n.title, n.url, n.source, n.sentiment, n.timeLabel, n.summary); }).join('');
};

/* ─────────────────────────────────────────────────────────────
   5. SCREENER — Yahoo Finance live
   ───────────────────────────────────────────────────────────── */
const _origScRun = AM.sc.run.bind(AM.sc);
AM.sc.run = async function() {
  const btn = document.getElementById('sc-run-btn');
  if (btn) { btn.textContent = '⏳ Yahoo Live…'; btn.disabled = true; }
  const tickersRaw = (document.getElementById('sc-custom')||{}).value || '';
  const tickers = tickersRaw.split(',').map(t=>t.trim().toUpperCase()).filter(Boolean).slice(0,30);
  if (!tickers.length) { if(btn){btn.textContent='🚀 LANCER';btn.disabled=false;} return; }
  try {
    const quotes = await yfFetch(tickers);
    syncAll(quotes);
    const rows = quotes.map(q => ({
      symbol: q.symbol,
      name: q.shortName || q.longName || q.symbol,
      price: q.regularMarketPrice || 0,
      chg_1d: q.regularMarketChangePercent || 0,
      chg_1m: 0,
      pe: q.trailingPE || null,
      pb: null,
      eps: q.epsTrailingTwelveMonths || null,
      div: 0,
      mktcap: q.marketCap || 0,
      vol: q.regularMarketVolume || 0,
      sector: '—',
    }));
    rows.forEach(r => { AM.sc.DATA[r.symbol] = r; });
    /* filtres */
    const gv = id => parseFloat((document.getElementById(id)||{}).value || 0);
    const peMin=gv('sc-pe-min'), peMax=gv('sc-pe-max')||100;
    const epsMin=parseFloat((document.getElementById('sc-eps-min')||{}).value||-999);
    const divMin=gv('sc-div-min'), mcMin=gv('sc-mc');
    const chgMin=parseFloat((document.getElementById('sc-chg-min')||{}).value||-20);
    const sortBy=(document.getElementById('sc-sort')||{}).value||'mktcap';
    const sortAsc=(document.getElementById('sc-sort-asc')||{}).checked||false;
    let filtered = rows.filter(r => {
      if(r.pe!=null&&(r.pe<peMin||r.pe>peMax)) return false;
      if(r.eps!=null&&r.eps<epsMin) return false;
      if(r.mktcap<mcMin) return false;
      if(r.chg_1d<chgMin) return false;
      return true;
    });
    filtered.sort((a,b)=>{ const va=a[sortBy]??-Infinity,vb=b[sortBy]??-Infinity; return sortAsc?va-vb:vb-va; });
    const kpis = document.getElementById('sc-kpis');
    if (kpis) {
      const validPE=filtered.filter(r=>r.pe).map(r=>r.pe);
      const hausse=filtered.filter(r=>r.chg_1d>0).length;
      const avg=filtered.reduce((s,r)=>s+r.chg_1d,0)/(filtered.length||1);
      kpis.innerHTML=[
        AM.sc.scKpiCard('Trouvées',filtered.length,'sur '+tickers.length+' (live Yahoo)'),
        AM.sc.scKpiCard('P/E moyen',validPE.length?(validPE.reduce((a,b)=>a+b,0)/validPE.length).toFixed(1)+'x':'N/A'),
        AM.sc.scKpiCard('En hausse',hausse+' / '+filtered.length),
        AM.sc.scKpiCard('Perf 1J',(avg>=0?'+':'')+avg.toFixed(2)+'%'),
      ].join('');
    }
    const res = document.getElementById('sc-results');
    if (res) {
      if (!filtered.length) { res.innerHTML='<div style="padding:24px;text-align:center;color:var(--tx-faint);font-family:var(--mono);">Aucun résultat.</div>'; }
      else {
        const fmtMC=v=>v>=1e12?(v/1e12).toFixed(2)+' Tr$':v>=1e9?(v/1e9).toFixed(1)+' Mrd$':(v/1e6).toFixed(0)+' M$';
        res.innerHTML='<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Symbole</th><th>Nom</th><th>Prix</th><th>1J %</th><th>P/E</th><th>EPS</th><th>Mkt Cap</th><th>Volume</th><th>52W H</th><th>52W L</th></tr></thead><tbody>'+
          filtered.map(r => {
            const c=fc(r.chg_1d);
            const q=quotes.find(q=>q.symbol===r.symbol)||{};
            return `<tr><td class="hl">${r.symbol}</td><td style="color:var(--tx-mid);max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${r.name}</td><td style="font-family:var(--mono);color:var(--tx-hi);font-weight:700;">${fp(r.price)}</td><td style="color:${c.color};font-family:var(--mono)">${c.txt}</td><td style="font-family:var(--mono)">${r.pe?r.pe.toFixed(1)+'x':'—'}</td><td style="font-family:var(--mono)">${r.eps?r.eps.toFixed(2):'—'}</td><td style="font-family:var(--mono);font-size:10px;color:var(--tx-low)">${fmtMC(r.mktcap)}</td><td style="font-family:var(--mono);font-size:10px;color:var(--tx-faint)">${r.vol>=1e6?(r.vol/1e6).toFixed(1)+'M':r.vol>=1e3?(r.vol/1e3).toFixed(0)+'K':r.vol}</td><td style="font-family:var(--mono);font-size:10px;color:var(--tx-faint)">${fp(q.fiftyTwoWeekHigh)}</td><td style="font-family:var(--mono);font-size:10px;color:var(--tx-faint)">${fp(q.fiftyTwoWeekLow)}</td></tr>`;
          }).join('')+'</tbody></table></div>';
        AM.sc._scData = filtered;
      }
    }
    if (AM.toast) AM.toast('✅ Screener Yahoo Finance — '+filtered.length+' résultat(s)', 'success');
  } catch(e) {
    console.warn('[YF] screener:', e.message);
    _origScRun();
  }
  if (btn) { btn.textContent = '🚀 LANCER'; btn.disabled = false; }
};

/* ─────────────────────────────────────────────────────────────
   6. ALERTES — prix Yahoo avant checkAll
   ───────────────────────────────────────────────────────────── */
const _origCheckAll = AM.al.checkAll.bind(AM.al);
AM.al.checkAll = async function() {
  const alerts = AM.al.load().filter(a => a.active);
  const stocks = [...new Set(alerts.map(a=>a.ticker).filter(t=>!t.includes('-USD')&&!t.includes('/')))];
  if (stocks.length) {
    try { const q = await yfFetch(stocks); syncAll(q); } catch(e) {}
  }
  _origCheckAll();
};

/* ─────────────────────────────────────────────────────────────
   7. PORTFOLIO — prix Yahoo avant refresh
   ───────────────────────────────────────────────────────────── */
if (AM.pf?.refresh) {
  const _origPfRefresh = AM.pf.refresh.bind(AM.pf);
  AM.pf.refresh = async function() {
    const positions = AM.pf.load();
    const syms = [...new Set(positions.filter(p=>p.type==='actions').map(p=>p.symbol.toUpperCase()))];
    if (syms.length) { try { const q = await yfFetch(syms); syncAll(q); } catch(e) {} }
    _origPfRefresh();
  };
}

/* ─────────────────────────────────────────────────────────────
   8. VALORISATION — Yahoo Finance quote complet
   ───────────────────────────────────────────────────────────── */
document.addEventListener('click', async function(e) {
  const btn = e.target.closest('[data-action="valorAnalyze"]');
  if (!btn) return;
  e.stopImmediatePropagation();
  const ticker = ((document.getElementById('val-ticker')||{}).value||'NVDA').trim().toUpperCase();
  btn.textContent = '⏳…'; btn.disabled = true;
  try {
    /* Quote Yahoo */
    const qArr = await yfFetch([ticker]);
    const q = qArr[0] || {};
    const price = q.regularMarketPrice || 0;
    const chgPct = q.regularMarketChangePercent || 0;
    syncAll([q]);

    /* DCF via FMP si dispo */
    let dcfVal = price;
    try {
      const dcfRes = await fetch(`https://financialmodelingprep.com/api/v3/discounted-cash-flow/${ticker}?apikey=${FMP_KEY}`);
      const dcfData = dcfRes.ok ? await dcfRes.json() : [];
      if (Array.isArray(dcfData) && dcfData[0]?.dcf) dcfVal = dcfData[0].dcf;
    } catch(e) {}

    const pot = price ? ((dcfVal - price) / price * 100).toFixed(1) : '—';
    const pe  = q.trailingPE || null;

    /* Mise à jour KPI cards */
    const kpis = document.querySelectorAll('#c-actions .kpi-card');
    if (kpis[0]) { kpis[0].querySelector('.kpi-val')&&(kpis[0].querySelector('.kpi-val').textContent=fp(price)); kpis[0].querySelector('.kpi-sub')&&(kpis[0].querySelector('.kpi-sub').textContent=fc(chgPct).txt+' aujourd\'hui'); }
    if (kpis[1]) { kpis[1].querySelector('.kpi-val')&&(kpis[1].querySelector('.kpi-val').textContent=fp(dcfVal)); kpis[1].querySelector('.kpi-sub')&&(kpis[1].querySelector('.kpi-sub').textContent='Potentiel '+(pot>=0?'+':'')+pot+'%'); }
    if (kpis[2]) { kpis[2].querySelector('.kpi-val')&&(kpis[2].querySelector('.kpi-val').textContent=pe?pe.toFixed(1)+'x':'—'); }

    /* Bandeau résumé */
    let sumEl = document.getElementById('yf-valo-summary');
    if (!sumEl) { sumEl=document.createElement('div'); sumEl.id='yf-valo-summary'; sumEl.style.cssText='margin-top:14px;padding:12px 14px;background:var(--bg-card);border:1px solid var(--br-soft);border-radius:var(--radius-md);font-family:var(--mono);font-size:11px;'; const kg=document.querySelector('#c-actions .kpi-grid'); if(kg) kg.after(sumEl); }
    const c2 = fc(chgPct);
    sumEl.innerHTML = `
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:10px;">
        <div><div style="font-weight:700;color:var(--tx-hi);font-size:14px;">${q.shortName||ticker}</div><div style="color:var(--tx-faint);font-size:10px;">${q.fullExchangeName||''} · Yahoo Finance</div></div>
        <div style="margin-left:auto;text-align:right;"><div style="font-size:22px;font-weight:700;color:var(--orange);">${fp(price)}</div><div style="color:${c2.color};font-size:12px;">${c2.txt}</div></div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;">
        ${[
          ['P/E (TTM)', pe ? pe.toFixed(1)+'x' : '—'],
          ['EPS (TTM)', q.epsTrailingTwelveMonths ? '$'+q.epsTrailingTwelveMonths.toFixed(2) : '—'],
          ['Mkt Cap', q.marketCap>=1e12?(q.marketCap/1e12).toFixed(2)+' T$':q.marketCap>=1e9?(q.marketCap/1e9).toFixed(1)+' Mrd$':'—'],
          ['Volume', q.regularMarketVolume>=1e6?(q.regularMarketVolume/1e6).toFixed(1)+'M':'—'],
          ['52W Haut', fp(q.fiftyTwoWeekHigh)],
          ['52W Bas', fp(q.fiftyTwoWeekLow)],
          ['DCF (FMP)', fp(dcfVal)],
          ['Potentiel', (pot>=0?'+':'')+pot+'%'],
        ].map(([l,v])=>`<div style="background:#080808;border:1px solid #1a1a1a;border-radius:4px;padding:7px;"><div style="font-size:9px;color:#555;letter-spacing:1px;text-transform:uppercase;margin-bottom:2px;">${l}</div><div style="font-size:12px;font-weight:700;color:var(--tx-hi);">${v}</div></div>`).join('')}
      </div>
      <div style="margin-top:6px;font-size:9px;color:var(--tx-faint);">📡 Prix live Yahoo Finance · ${new Date().toLocaleTimeString('fr-FR')}</div>`;

    if (AM.toast) AM.toast(`📊 ${ticker} — ${fp(price)} (Yahoo Finance live)`, 'success');
  } catch(e) {
    console.warn('[YF] valorisation:', e.message);
    if (AM.toast) AM.toast('⚠️ Erreur récupération prix', 'info');
  }
  btn.textContent = 'Analyser →'; btn.disabled = false;
}, true);

/* ─────────────────────────────────────────────────────────────
   FEAR & GREED DASHBOARD
   ───────────────────────────────────────────────────────────── */
async function loadDashboardFearGreed() {
  try {
    const FNG_URL = 'https://api.alternative.me/fng/?limit=5&format=json';
    let data;
    /* Essai direct d'abord */
    try {
      const r = await fetch(FNG_URL, { signal: AbortSignal.timeout(5000) });
      if (!r.ok) throw new Error('direct ' + r.status);
      data = await r.json();
    } catch(e) {
      /* Fallback via allorigins si CORS bloqué */
      const proxy = 'https://api.allorigins.win/get?url=' + encodeURIComponent(FNG_URL);
      const r2 = await fetch(proxy, { signal: AbortSignal.timeout(8000) });
      const json = await r2.json();
      data = JSON.parse(json.contents);
    }
    const d = data.data[0];
    const val = parseInt(d.value);
    const lbl = d.value_classification;
    const col = val<=25?'var(--red)':val<=45?'var(--orange)':val<=55?'var(--yellow)':val<=75?'#44cc88':'var(--green)';
    const emoji = val<=25?'😱':val<=45?'😨':val<=55?'😐':val<=75?'😊':'🤑';

    /* gauge arc */
    const arc = document.getElementById('db-fg-arc');
    if (arc) arc.style.strokeDashoffset = 251 - (251 * val / 100);

    /* valeur centrale dans le gauge */
    const gv = document.getElementById('db-fg-gauge-val');
    if (gv) { gv.textContent = val; gv.style.fill = col; }

    /* label sous le gauge */
    const gl = document.getElementById('db-fg-gauge-lbl');
    if (gl) { gl.textContent = lbl.toUpperCase(); }

    /* valeur + emoji à droite */
    const fgVal = document.getElementById('db-fg-val');
    if (fgVal) { fgVal.textContent = val + ' ' + emoji; fgVal.style.color = col; }

    /* label texte */
    const fgLabel = document.getElementById('db-fg-label');
    if (fgLabel) fgLabel.textContent = lbl;

    /* historique J-1 à J-4 */
    const hist = data.data.slice(1, 5);
    let hhtml = '';
    hist.forEach(function(h, i) {
      const v = parseInt(h.value);
      const c = v<=25?'var(--red)':v<=45?'var(--orange)':v<=55?'var(--yellow)':v<=75?'#44cc88':'var(--green)';
      hhtml += '<div style="display:flex;justify-content:space-between;padding:2px 0;border-bottom:1px solid var(--br-faint);"><span style="color:var(--tx-faint);">J-'+(i+1)+'</span><span style="color:'+c+'">'+v+' — '+h.value_classification+'</span></div>';
    });
    const fgHist = document.getElementById('db-fg-hist');
    if (fgHist) fgHist.innerHTML = hhtml;

    console.log('[FG] Fear & Greed dashboard :', val, lbl);
  } catch(e) {
    const fgLabel = document.getElementById('db-fg-label');
    if (fgLabel) fgLabel.textContent = 'Données indisponibles';
    console.warn('[FG] Fear & Greed error:', e.message);
  }
}

/* ── Cache localStorage 4h pour les prix actions ── */
var _YF_LS_KEY = 'am_yf_cache_v1';
var _YF_LS_TTL = 4 * 60 * 60 * 1000;
var _yfLastFetch = 0;

function yfSaveLS(quotes) {
  try {
    var simple = {};
    quotes.forEach(function(q) {
      simple[q.symbol] = {
        regularMarketPrice: q.regularMarketPrice,
        regularMarketChangePercent: q.regularMarketChangePercent,
        regularMarketChange: q.regularMarketChange,
        shortName: q.shortName || q.longName || q.symbol
      };
    });
    localStorage.setItem(_YF_LS_KEY, JSON.stringify({ ts: Date.now(), data: simple }));
  } catch(e) {}
}

function yfLoadLS() {
  try {
    var raw = localStorage.getItem(_YF_LS_KEY);
    if (!raw) return null;
    var obj = JSON.parse(raw);
    if (!obj || !obj.data || !obj.ts) return null;
    if (Date.now() - obj.ts > _YF_LS_TTL) return null;
    return obj;
  } catch(e) { return null; }
}

/* ─────────────────────────────────────────────────────────────
   INIT
   ───────────────────────────────────────────────────────────── */
async function yfInit() {
  /* 1. Vérifier le cache localStorage d'abord */
  var cached = yfLoadLS();
  if (cached) {
    var ageMin = Math.round((Date.now() - cached.ts) / 60000);
    console.log('[YF] Cache localStorage (' + ageMin + ' min) — aucun appel API');
    _yfLastFetch = cached.ts;
    patchStatusBarBTC();
    var fakeQuotes = Object.keys(cached.data).map(function(sym) {
      return Object.assign({ symbol: sym }, cached.data[sym]);
    });
    syncAll(fakeQuotes);
    loadDashboardFearGreed();
    return;
  }

  /* 2. Pas de cache valide → appel API */
  console.log('[YF] ✓ Init Yahoo Finance — prix en direct');
  patchStatusBarBTC();
  await Promise.all([
    updateDashboard(),
    updateTickerTape(),
    loadDashboardFearGreed(),
    yfFetch(['AAPL','NVDA','TSLA','MSFT','AMZN','META','GOOG','JPM','INTC','AMD','NFLX','V','MC.PA','TTE.PA']).then(function(q) {
      syncAll(q);
      yfSaveLS(q);
    }).catch(function(){})
  ]);
  _yfLastFetch = Date.now();
  console.log('[YF] ✓ Prix chargés et mis en cache localStorage');
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(yfInit, 1500);
  setInterval(function() {
    if (!AM._visible) return;
    if (Date.now() - _yfLastFetch < _YF_LS_TTL) return;
    yfInit();
  }, 90000);
});

window.YF = { fetch: yfFetch, sync: syncAll, update: updateDashboard };

/* ═══════════════════════════════════════════════════════════════════
   DEPTH & ORDER FLOW MODULE — Arthur Terminal v3
   ═══════════════════════════════════════════════════════════════════ */
(function() {
'use strict';

/* ── LCG seed-based RNG for reproducible data per pair ── */
var _seed = 42;
function _rng() { _seed = (_seed * 1664525 + 1013904223) & 0xffffffff; return ((_seed >>> 0) / 0xffffffff); }
function _initSeed(pair) { _seed = pair.split('').reduce(function(a,c){ return a + c.charCodeAt(0) * 31; }, 7); }

/* ── Paramètres par paire ── */
var PAIR_CFG = {
  'EUR/USD': { mid: 1.0841, pip: 0.0001, dec: 5, pipVal: 10,  spread: 0.7, trend: 'bear', session: 'EU/US' },
  'GBP/USD': { mid: 1.2710, pip: 0.0001, dec: 5, pipVal: 10,  spread: 1.0, trend: 'bull', session: 'UK/US' },
  'USD/JPY': { mid: 151.42, pip: 0.01,   dec: 3, pipVal: 9.4, spread: 1.5, trend: 'bull', session: 'AS/US' },
  'USD/CHF': { mid: 0.9012, pip: 0.0001, dec: 5, pipVal: 11.1,spread: 1.2, trend: 'neutral', session: 'EU/US' },
  'AUD/USD': { mid: 0.6524, pip: 0.0001, dec: 5, pipVal: 10,  spread: 0.9, trend: 'bear', session: 'AS/EU' },
  'USD/CAD': { mid: 1.3680, pip: 0.0001, dec: 5, pipVal: 7.3, spread: 1.4, trend: 'bull', session: 'US'    },
  'GBP/JPY': { mid: 192.46, pip: 0.01,   dec: 3, pipVal: 8.7, spread: 2.1, trend: 'bull', session: 'UK/AS' },
  'EUR/JPY': { mid: 164.12, pip: 0.01,   dec: 3, pipVal: 9.1, spread: 1.8, trend: 'neutral', session: 'EU/AS' },
};

/* ── Flow multi-paires (delta simulé 5min) ── */
var FLOW_DATA = {
  'EUR/USD': -23.4, 'GBP/USD': +18.7, 'USD/JPY': +41.2, 'USD/CHF': -6.1,
  'AUD/USD': -14.3, 'USD/CAD': +9.8,  'GBP/JPY': +28.5, 'EUR/JPY': +12.1,
};

/* ── Génération order book ── */
function genBook(pair, levels) {
  var cfg = PAIR_CFG[pair] || PAIR_CFG['EUR/USD'];
  _initSeed(pair);
  var asks = [], bids = [];
  var askCum = 0, bidCum = 0;
  var spreadPips = cfg.spread;
  var askBase = cfg.mid + (spreadPips / 2) * cfg.pip;
  var bidBase = cfg.mid - (spreadPips / 2) * cfg.pip;
  for (var i = 0; i < levels; i++) {
    var askSz = Math.round((0.5 + _rng() * 4.5) * (1 + (_rng() > 0.85 ? _rng() * 8 : 0)) * 10) / 10;
    var bidSz = Math.round((0.5 + _rng() * 4.5) * (1 + (_rng() > 0.85 ? _rng() * 8 : 0)) * 10) / 10;
    askCum += askSz;
    bidCum += bidSz;
    asks.push({ price: parseFloat((askBase + i * cfg.pip * (0.8 + _rng() * 0.6)).toFixed(cfg.dec)), size: askSz, cum: parseFloat(askCum.toFixed(1)) });
    bids.push({ price: parseFloat((bidBase - i * cfg.pip * (0.8 + _rng() * 0.6)).toFixed(cfg.dec)), size: bidSz, cum: parseFloat(bidCum.toFixed(1)) });
  }
  return { asks: asks, bids: bids, cfg: cfg, askCum: askCum, bidCum: bidCum };
}

/* ── Génération Time & Sales ── */
var _tapeHistory = [];
var _tapeFilter = 'all';
function genTape(pair, count) {
  var cfg = PAIR_CFG[pair] || PAIR_CFG['EUR/USD'];
  _initSeed(pair + Date.now());
  var trades = [];
  var now = Date.now();
  for (var i = 0; i < count; i++) {
    var isBuy = _rng() > 0.48;
    var offset = _rng() * cfg.pip * 3;
    var sz = Math.round((0.1 + _rng() * 5) * 10) / 10;
    trades.push({
      time: new Date(now - i * (_rng() * 3000 + 200)).toLocaleTimeString('fr-FR', { hour:'2-digit', minute:'2-digit', second:'2-digit' }),
      price: parseFloat((cfg.mid + (isBuy ? offset : -offset)).toFixed(cfg.dec)),
      size: sz,
      dir: isBuy ? 'B' : 'S',
      whale: sz >= 4
    });
  }
  return trades;
}

/* ── Rendu Order Book avec heatmap et vue modes ── */
function renderBook(book) {
  var mode = (document.getElementById('depth-view-mode') || {}).value || 'standard';
  var maxSz = Math.max.apply(null, book.asks.concat(book.bids).map(function(r){ return r.size; }));

  function row(r, isBid) {
    var pct = Math.min(100, r.size / maxSz * 100);
    var isLarge = r.size >= maxSz * 0.6;
    var bgOpacity = mode === 'heatmap' ? (0.05 + pct / 100 * 0.35) : 0.1;
    var bgCol = isBid ? 'rgba(0,232,150,' + bgOpacity + ')' : 'rgba(255,71,87,' + bgOpacity + ')';
    var txtCol = isBid ? '#00e896' : '#ff4757';
    var cumCol = isBid ? 'rgba(0,232,150,0.55)' : 'rgba(255,71,87,0.55)';
    var sizeWeight = isLarge ? 'font-weight:700;' : '';
    var largeTag = isLarge ? '<span style="font-size:8px;color:' + txtCol + ';margin-left:3px;">W</span>' : '';
    var barHtml = mode === 'compact' ? '' :
      '<div style="width:' + Math.round(pct) + '%;height:3px;background:' + (isBid ? 'rgba(0,232,150,0.5)' : 'rgba(255,71,87,0.5)') + ';border-radius:2px;margin-top:1px;"></div>';

    return '<div style="position:relative;padding:2px 10px;font-size:11px;border-bottom:1px solid #0d0d0d;background:' + bgCol + ';">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;">' +
      '<span style="color:' + txtCol + ';' + sizeWeight + 'z-index:1;min-width:75px;font-family:var(--mono);">' + r.price + largeTag + '</span>' +
      '<span style="color:var(--tx-mid);z-index:1;font-family:var(--mono);">' + r.size.toFixed(1) + 'M</span>' +
      '<span style="color:' + cumCol + ';z-index:1;font-family:var(--mono);">' + r.cum.toFixed(1) + '</span>' +
      '</div>' + barHtml +
    '</div>';
  }

  var asksEl = document.getElementById('depth-asks');
  var bidsEl = document.getElementById('depth-bids');
  var spreadEl = document.getElementById('depth-spread-band');
  if (asksEl) {
    asksEl.innerHTML = book.asks.slice().reverse().map(function(r){ return row(r, false); }).join('');
    asksEl.scrollTop = asksEl.scrollHeight;
  }
  if (bidsEl) bidsEl.innerHTML = book.bids.map(function(r){ return row(r, true); }).join('');
  if (spreadEl) {
    var spreadPips = ((book.asks[0].price - book.bids[0].price) / book.cfg.pip).toFixed(1);
    spreadEl.textContent = 'SPREAD : ' + spreadPips + ' pips  |  Best Bid: ' + book.bids[0].price + '  |  Best Ask: ' + book.asks[0].price;
  }
  var midEl = document.getElementById('depth-chart-mid');
  if (midEl) midEl.textContent = book.cfg.mid;
  var srPair = document.getElementById('depth-sr-pair');
  if (srPair) srPair.textContent = (document.getElementById('depth-pair') || {}).value || '';
}

/* ── Rendu graphique profondeur cumulée ── */
function renderDepthChart(book) {
  var canvas = document.getElementById('depth-chart');
  if (!canvas || !window.Chart) return;
  var labels = [];
  var bidData = [], askData = [];
  book.bids.slice().reverse().forEach(function(r) { labels.push(r.price); bidData.push(r.cum); askData.push(null); });
  book.asks.forEach(function(r) { labels.push(r.price); bidData.push(null); askData.push(r.cum); });
  if (window._depthChart && window._depthChart.destroy) window._depthChart.destroy();
  var ctx = canvas.getContext('2d');
  window._depthChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        { label: 'Bids cumulés', data: bidData, borderColor: '#00e896', backgroundColor: 'rgba(0,232,150,0.10)', borderWidth: 2, pointRadius: 0, fill: true, tension: 0.3 },
        { label: 'Asks cumulés', data: askData, borderColor: '#ff4757', backgroundColor: 'rgba(255,71,87,0.10)', borderWidth: 2, pointRadius: 0, fill: true, tension: 0.3 },
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false, animation: { duration: 150 },
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: true, position: 'top', labels: { color: '#666', font: { size: 9 }, boxWidth: 12, padding: 10 } },
        tooltip: {
          backgroundColor: '#0e0e0e', borderColor: '#2c2c2c', borderWidth: 1,
          callbacks: { label: function(c) { return c.dataset.label + ': ' + (c.raw != null ? c.raw.toFixed(1) + 'M' : '—'); } }
        },
        annotation: { annotations: {
          midLine: { type: 'line', xMin: book.bids.length - 1, xMax: book.bids.length, borderColor: 'rgba(255,102,0,0.5)', borderWidth: 1, borderDash: [4,3] }
        }}
      },
      scales: {
        x: { ticks: { color: '#444', font: { size: 8 }, maxTicksLimit: 8, maxRotation: 0 }, grid: { color: '#111' } },
        y: { ticks: { color: '#444', font: { size: 9 }, callback: function(v) { return v + 'M'; } }, grid: { color: '#111' } }
      }
    }
  });
}

/* ── Rendu Time & Sales avec filtre ── */
function renderTape(trades) {
  var el = document.getElementById('depth-tape');
  var cntEl = document.getElementById('depth-tape-count');
  if (!el) return;
  var filtered = trades.filter(function(t) {
    if (_tapeFilter === 'B') return t.dir === 'B';
    if (_tapeFilter === 'S') return t.dir === 'S';
    if (_tapeFilter === 'whale') return t.whale;
    return true;
  });
  if (cntEl) cntEl.textContent = filtered.length + ' trades';
  el.innerHTML = filtered.map(function(t) {
    var isBuy = t.dir === 'B';
    var col = isBuy ? '#00e896' : '#ff4757';
    var bg = t.whale ? (isBuy ? 'rgba(0,232,150,0.10)' : 'rgba(255,71,87,0.10)') : 'transparent';
    var szW = t.whale ? 'font-weight:700;' : '';
    var whaleTag = t.whale ? '<span style="font-size:8px;background:' + (isBuy ? 'rgba(0,232,150,0.2)' : 'rgba(255,71,87,0.2)') + ';color:' + col + ';padding:1px 4px;border-radius:3px;margin-left:3px;">W</span>' : '';
    return '<div style="display:flex;justify-content:space-between;align-items:center;padding:3px 10px;border-bottom:1px solid #0d0d0d;background:' + bg + ';">' +
      '<span style="color:#444;font-size:10px;">' + t.time + '</span>' +
      '<span style="color:' + col + ';' + szW + 'font-family:var(--mono);font-size:11px;">' + t.price + '</span>' +
      '<span style="color:var(--tx-mid);' + szW + 'font-family:var(--mono);font-size:11px;">' + t.size.toFixed(1) + 'M' + whaleTag + '</span>' +
      '<span style="color:' + col + ';font-weight:700;font-family:var(--mono);font-size:11px;">' + (isBuy ? '▲B' : '▼S') + '</span>' +
    '</div>';
  }).join('');
  el.scrollTop = 0;
}

/* ── Rendu KPIs (8 stats) ── */
function renderKPIs(book, trades) {
  var el = document.getElementById('depth-kpi');
  if (!el) return;
  var buys = trades.filter(function(t){ return t.dir === 'B'; });
  var sells = trades.filter(function(t){ return t.dir === 'S'; });
  var buyVol = buys.reduce(function(a,t){ return a + t.size; }, 0);
  var sellVol = sells.reduce(function(a,t){ return a + t.size; }, 0);
  var delta = buyVol - sellVol;
  var spread = ((book.asks[0].price - book.bids[0].price) / book.cfg.pip).toFixed(1);
  var vwap = parseFloat((book.cfg.mid + (delta > 0 ? 1 : -1) * book.cfg.pip * 2).toFixed(book.cfg.dec));
  var pair = (document.getElementById('depth-pair') || {}).value || 'EUR/USD';
  var flowDelta = FLOW_DATA[pair] || 0;
  var items = [
    ['BEST BID',  book.bids[0].price, '#00e896', book.cfg.trend === 'bull' ? '+trend' : ''],
    ['BEST ASK',  book.asks[0].price, '#ff4757', book.cfg.trend === 'bear' ? '-trend' : ''],
    ['SPREAD',    spread + ' pips',   'var(--orange)', spread < 1 ? 'serré' : 'normal'],
    ['VOL BUY',   buyVol.toFixed(1) + 'M', '#00e896', Math.round(buyVol / (buyVol + sellVol) * 100) + '% du vol'],
    ['VOL SELL',  sellVol.toFixed(1) + 'M', '#ff4757', Math.round(sellVol / (buyVol + sellVol) * 100) + '% du vol'],
    ['DELTA',     (delta >= 0 ? '+' : '') + delta.toFixed(1) + 'M', delta >= 0 ? '#00e896' : '#ff4757', delta >= 0 ? 'pression haussière' : 'pression baissière'],
    ['VWAP',      vwap, 'var(--yellow)', book.cfg.mid > vwap ? 'prix > VWAP' : 'prix < VWAP'],
    ['FLOW 5min', (flowDelta >= 0 ? '+' : '') + flowDelta.toFixed(1) + 'M', flowDelta >= 0 ? '#00e896' : '#ff4757', flowDelta >= 0 ? 'entrants nets' : 'sortants nets'],
  ];
  el.style.gridTemplateColumns = 'repeat(8,1fr)';
  el.innerHTML = items.map(function(it) {
    return '<div class="dph-stat">' +
      '<div class="dph-stat-lbl">' + it[0] + '</div>' +
      '<div class="dph-stat-val" style="color:' + it[2] + '">' + it[1] + '</div>' +
      (it[3] ? '<div class="dph-stat-sub">' + it[3] + '</div>' : '') +
    '</div>';
  }).join('');
}

/* ── Rendu Imbalance amélioré ── */
function renderImbalance(book) {
  var totalBid = book.bidCum, totalAsk = book.askCum;
  var total = totalBid + totalAsk;
  var bidPct = (totalBid / total * 100).toFixed(1);
  var askPct = (totalAsk / total * 100).toFixed(1);
  var imb = totalBid / totalAsk;
  var barEl = document.getElementById('depth-imbalance-bar');
  var lblEl = document.getElementById('depth-imbalance-label');
  var subEl = document.getElementById('depth-imbalance-sub');
  var bidPctEl = document.getElementById('depth-bid-pct');
  var askPctEl = document.getElementById('depth-ask-pct');
  var ratioEl = document.getElementById('depth-imb-ratio');
  var absEl = document.getElementById('depth-absorption');
  if (bidPctEl) bidPctEl.textContent = bidPct + '%';
  if (askPctEl) askPctEl.textContent = askPct + '%';
  if (ratioEl) ratioEl.textContent = 'ratio ' + imb.toFixed(2);
  if (barEl) barEl.innerHTML =
    '<div style="flex:' + bidPct + ';background:rgba(0,232,150,0.7);transition:flex .3s;"></div>' +
    '<div style="flex:' + askPct + ';background:rgba(255,71,87,0.7);transition:flex .3s;"></div>';
  var imbLabel, imbColor, imbBg, imbSub;
  if (imb > 1.4)       { imbLabel = '▲ PRESSION ACHETEUSE'; imbColor = '#00e896'; imbBg = 'rgba(0,232,150,0.08)'; imbSub = 'Les bids dominent — pression haussière'; }
  else if (imb < 0.7)  { imbLabel = '▼ PRESSION VENDEUSE';  imbColor = '#ff4757'; imbBg = 'rgba(255,71,87,0.08)';  imbSub = 'Les asks dominent — pression baissière'; }
  else                  { imbLabel = '— MARCHÉ ÉQUILIBRÉ';   imbColor = '#ff6600'; imbBg = 'rgba(255,102,0,0.08)'; imbSub = 'Équilibre acheteurs / vendeurs'; }
  if (lblEl) { lblEl.textContent = imbLabel; lblEl.style.color = imbColor; lblEl.style.background = imbBg; lblEl.style.border = '1px solid ' + imbColor + '44'; }
  if (subEl) subEl.textContent = imbSub;
  if (absEl) {
    var absRate = (Math.abs(imb - 1) * 100).toFixed(0);
    var absColor = absRate > 30 ? imbColor : 'var(--tx-muted)';
    absEl.innerHTML = '<span style="color:' + absColor + ';font-weight:700;">' + absRate + '%</span> <span style="color:var(--tx-faint);">d\'absorption</span> — ' +
      (imb > 1 ? 'murs ask absorbés' : imb < 1 ? 'murs bid absorbés' : 'absorption neutre');
  }
}

/* ── Rendu niveaux S/R enrichis ── */
function renderLevels(book) {
  var el = document.getElementById('depth-levels-display');
  if (!el) return;
  var cfg = book.cfg, mid = cfg.mid;
  var pp = mid;
  var r1 = parseFloat((pp + cfg.pip * 25).toFixed(cfg.dec));
  var r2 = parseFloat((pp + cfg.pip * 55).toFixed(cfg.dec));
  var s1 = parseFloat((pp - cfg.pip * 22).toFixed(cfg.dec));
  var s2 = parseFloat((pp - cfg.pip * 50).toFixed(cfg.dec));
  var bigAsk = book.asks.reduce(function(a,r){ return r.size > a.size ? r : a; }, book.asks[0]);
  var bigBid = book.bids.reduce(function(a,r){ return r.size > a.size ? r : a; }, book.bids[0]);
  var levels = [
    { label: 'R2', price: r2, col: '#ff4757', type: 'Résistance forte', arrow: '▲' },
    { label: 'R1', price: r1, col: 'rgba(255,71,87,0.65)', type: 'Résistance', arrow: '▲' },
    { label: 'PP', price: pp, col: '#ff6600', type: 'Pivot central', arrow: '▼' },
    { label: 'S1', price: s1, col: 'rgba(0,232,150,0.65)', type: 'Support', arrow: '▼' },
    { label: 'S2', price: s2, col: '#00e896', type: 'Support fort', arrow: '▼' },
    { label: 'Liq. Ask', price: bigAsk.price, col: '#ffd166', type: bigAsk.size.toFixed(1) + 'M en attente', arrow: '▲' },
    { label: 'Liq. Bid', price: bigBid.price, col: '#a855f7', type: bigBid.size.toFixed(1) + 'M en attente', arrow: '▼' },
  ];
  el.innerHTML = levels.map(function(lv) {
    var dist = Math.abs(lv.price - mid) / cfg.pip;
    var distStr = dist.toFixed(0) + ' pips';
    return '<div class="dph-level-row">' +
      '<div class="dph-lvl-tag" style="color:' + lv.col + '">' + lv.label + '</div>' +
      '<div class="dph-lvl-price">' + lv.price + '</div>' +
      '<div class="dph-lvl-type">' + lv.type + '</div>' +
      '<div style="font-size:9px;color:var(--tx-faint);font-family:var(--mono);">' + distStr + '</div>' +
      '<div class="dph-lvl-arr" style="color:' + lv.col + '">' + lv.arrow + '</div>' +
    '</div>';
  }).join('');
}

/* ── Rendu Delta volume ── */
function renderDelta(trades) {
  var canvas = document.getElementById('depth-delta-chart');
  if (!canvas || !window.Chart) return;
  var deltas = trades.slice(0, 30).reverse().map(function(t){ return t.dir === 'B' ? t.size : -t.size; });
  var cumDelta = [], running = 0;
  deltas.forEach(function(d){ running += d; cumDelta.push(parseFloat(running.toFixed(2))); });
  var lastDelta = cumDelta[cumDelta.length - 1] || 0;
  var col = lastDelta >= 0 ? '#00e896' : '#ff4757';
  var lbl = document.getElementById('depth-delta-label');
  var sub = document.getElementById('depth-delta-sub');
  var volSplit = document.getElementById('depth-vol-split');
  if (lbl) { lbl.textContent = (lastDelta >= 0 ? '+' : '') + lastDelta.toFixed(1) + 'M'; lbl.style.color = col; }
  if (sub) sub.textContent = lastDelta >= 0 ? 'Pression acheteuse nette' : 'Pression vendeuse nette';
  if (volSplit) {
    var buyV = trades.filter(function(t){ return t.dir === 'B'; }).reduce(function(a,t){ return a+t.size; }, 0);
    var selV = trades.filter(function(t){ return t.dir === 'S'; }).reduce(function(a,t){ return a+t.size; }, 0);
    volSplit.innerHTML =
      '<div><div style="font-size:9px;font-family:var(--mono);color:var(--tx-faint);margin-bottom:2px;">BUY VOL</div><div style="font-family:var(--mono);font-size:11px;font-weight:700;color:#00e896">+' + buyV.toFixed(1) + 'M</div></div>' +
      '<div style="text-align:right"><div style="font-size:9px;font-family:var(--mono);color:var(--tx-faint);margin-bottom:2px;">SELL VOL</div><div style="font-family:var(--mono);font-size:11px;font-weight:700;color:#ff4757">-' + selV.toFixed(1) + 'M</div></div>';
  }
  if (window._deltaChart && window._deltaChart.destroy) window._deltaChart.destroy();
  var ctx = canvas.getContext('2d');
  window._deltaChart = new Chart(ctx, {
    type: 'bar',
    data: { labels: cumDelta.map(function(_,i){ return i+1; }), datasets: [{
      data: cumDelta,
      backgroundColor: cumDelta.map(function(v){ return v >= 0 ? 'rgba(0,232,150,0.65)' : 'rgba(255,71,87,0.65)'; }),
      borderWidth: 0
    }]},
    options: {
      responsive: true, maintainAspectRatio: false, animation: { duration: 0 },
      plugins: { legend: { display: false } },
      scales: {
        x: { display: false },
        y: { ticks: { color: '#444', font: { size: 8 }, callback: function(v){ return v.toFixed(1); }, maxTicksLimit: 4 }, grid: { color: '#111' } }
      }
    }
  });
}

/* ── Rendu Clusters de liquidité ── */
function renderClusters(book) {
  var el = document.getElementById('depth-clusters');
  if (!el) return;
  var all = book.asks.concat(book.bids).sort(function(a,b){ return b.size - a.size; }).slice(0, 8);
  el.innerHTML = all.map(function(r) {
    var isAsk = book.asks.some(function(a){ return a.price === r.price; });
    var col = isAsk ? '#ff4757' : '#00e896';
    var bg  = isAsk ? 'rgba(255,71,87,0.07)' : 'rgba(0,232,150,0.07)';
    var bdr = isAsk ? 'rgba(255,71,87,0.2)'  : 'rgba(0,232,150,0.2)';
    var intensity = Math.min(5, Math.round(r.size / 2));
    var fire = r.size >= 8 ? '🔥 ' : r.size >= 5 ? '⚡ ' : '';
    return '<div class="dph-cluster-card" style="background:' + bg + ';border:1px solid ' + bdr + ';">' +
      '<div class="dph-cluster-type" style="color:' + col + '">' + (isAsk ? 'RÉSISTANCE' : 'SUPPORT') + '</div>' +
      '<div class="dph-cluster-price">' + fire + r.price + '</div>' +
      '<div class="dph-cluster-info">' + r.size.toFixed(1) + 'M · ' + '█'.repeat(intensity) + '░'.repeat(5-intensity) + '</div>' +
    '</div>';
  }).join('');
}

/* ── Rendu Flow multi-paires ── */
function renderFlowGrid() {
  var el = document.getElementById('depth-flow-grid');
  if (!el) return;
  var pairs = Object.keys(FLOW_DATA);
  var maxAbs = Math.max.apply(null, pairs.map(function(p){ return Math.abs(FLOW_DATA[p]); }));
  el.innerHTML = pairs.map(function(p) {
    var v = FLOW_DATA[p];
    var col = v >= 0 ? '#00e896' : '#ff4757';
    var pct = Math.round(Math.abs(v) / maxAbs * 100);
    return '<div class="dph-flow-card">' +
      '<div class="dph-flow-pair">' + p + '</div>' +
      '<div class="dph-flow-val" style="color:' + col + '">' + (v >= 0 ? '+' : '') + v.toFixed(1) + 'M</div>' +
      '<div class="dph-flow-bar-bg"><div class="dph-flow-bar-fg" style="width:' + pct + '%;background:' + col + ';"></div></div>' +
    '</div>';
  }).join('');
}

/* ── Rendu Sessions actives ── */
function renderSessions() {
  var el = document.getElementById('depth-sessions');
  if (!el) return;
  var h = new Date().getHours();
  var sessions = [
    { name: 'Tokyo',  active: h >= 0 && h < 9,  col: '#4d9fff' },
    { name: 'Londres',active: h >= 8 && h < 17, col: '#ff6600' },
    { name: 'New York',active: h >= 13 && h < 22,col: '#00e896' },
  ];
  el.innerHTML = sessions.map(function(s) {
    return '<div class="dph-sess-badge" style="' + (s.active ? 'border-color:' + s.col + '44;background:' + s.col + '0d;' : 'opacity:.4;') + '">' +
      '<div class="dph-sess-dot" style="background:' + (s.active ? s.col : 'var(--br-mid)') + '"></div>' +
      '<span style="font-size:10px;font-family:var(--mono);color:' + (s.active ? s.col : 'var(--tx-faint)') + '">' + s.name + '</span>' +
    '</div>';
  }).join('');
}

/* ── Rendu complet ── */
function depthRender() {
  var pair = (document.getElementById('depth-pair') || { value: 'EUR/USD' }).value;
  var levels = parseInt((document.getElementById('depth-levels-sel') || { value: '20' }).value, 10);
  var book = genBook(pair, levels);
  var trades = genTape(pair, 50);
  /* Variation aléatoire du flow pour simuler live */
  Object.keys(FLOW_DATA).forEach(function(p) {
    _initSeed(p + Date.now());
    FLOW_DATA[p] = parseFloat((FLOW_DATA[p] + (_rng() - 0.5) * 4).toFixed(1));
  });
  renderBook(book);
  renderKPIs(book, trades);
  renderTape(trades);
  renderImbalance(book);
  renderLevels(book);
  renderDelta(trades);
  renderClusters(book);
  renderDepthChart(book);
  renderFlowGrid();
  renderSessions();
  var timeEl = document.getElementById('depth-update-time');
  if (timeEl) timeEl.textContent = new Date().toLocaleTimeString('fr-FR');
}

/* ── Auto-refresh (3s) ── */
var _depthTimer = null;
function depthStartAuto() {
  clearInterval(_depthTimer);
  var arEl = document.getElementById('depth-autorefresh');
  if (arEl && !arEl.checked) return;
  _depthTimer = setInterval(function() {
    if (!AM._visible) return;
    var panel = document.getElementById('f-depth');
    if (panel && panel.classList.contains('on')) depthRender();
  }, 3000);
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    var btn = document.getElementById('depth-refresh-btn');
    if (btn) btn.addEventListener('click', depthRender);
    var ar = document.getElementById('depth-autorefresh');
    if (ar) ar.addEventListener('change', depthStartAuto);
    var ps = document.getElementById('depth-pair');
    if (ps) ps.addEventListener('change', depthRender);
    var vm = document.getElementById('depth-view-mode');
    if (vm) vm.addEventListener('change', depthRender);
    /* Filtres Time & Sales */
    var tapeWrap = document.getElementById('f-depth');
    if (tapeWrap) {
      tapeWrap.addEventListener('click', function(e) {
        var btn = e.target.closest('[data-tf]');
        if (!btn) return;
        _tapeFilter = btn.dataset.tf;
        tapeWrap.querySelectorAll('[data-tf]').forEach(function(b){ b.classList.remove('on'); });
        btn.classList.add('on');
        /* Re-render tape only */
        var pair = (document.getElementById('depth-pair') || { value: 'EUR/USD' }).value;
        renderTape(genTape(pair, 50));
      });
    }
    var tabBtn = document.querySelector('[data-tab="f-depth"]');
    if (tabBtn) {
      var _depthInited = false;
      tabBtn.addEventListener('click', function() {
        setTimeout(function() {
          if (!_depthInited) { _depthInited = true; depthRender(); depthStartAuto(); }
        }, 80);
      });
    }
  }, 1000);
});

window.DEPTH = { render: depthRender };

})(); /* fin Depth & Order Flow */

})(); /* fin IIFE Yahoo Finance */
