(function() {
'use strict';

/* ── Système de niveaux ── */
var XP_LEVELS = [
  { level: 1,  label: 'Novice',         min: 0,    max: 199,   color: '#888888',  icon: '🌱' },
  { level: 2,  label: 'Apprenti',       min: 200,  max: 499,   color: '#4d9fff',  icon: '📚' },
  { level: 3,  label: 'Analyste',       min: 500,  max: 999,   color: '#00e896',  icon: '📊' },
  { level: 4,  label: 'Trader',         min: 1000, max: 1999,  color: '#ffd166',  icon: '📈' },
  { level: 5,  label: 'Expert',         min: 2000, max: 3499,  color: '#ff6600',  icon: '🔬' },
  { level: 6,  label: 'Maître',         min: 3500, max: 5999,  color: '#a855f7',  icon: '🏆' },
  { level: 7,  label: 'Légende',        min: 6000, max: Infinity, color: '#ff6600', icon: '👑' },
];

function getLevelInfo(xp) {
  for (var i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i].min) return XP_LEVELS[i];
  }
  return XP_LEVELS[0];
}

function getLevelProgress(xp) {
  var lvl = getLevelInfo(xp);
  if (lvl.max === Infinity) return { pct: 100, current: xp - lvl.min, needed: 0 };
  var range = lvl.max - lvl.min + 1;
  var done  = xp - lvl.min;
  return { pct: Math.min(100, Math.round(done / range * 100)), current: done, needed: lvl.max - xp + 1 };
}

/* ── Calcule l'XP total depuis tous les guides locaux ──
   FIX BUG XP : lecture robuste + clé de réconciliation Firestore */
function computeTotalXP() {
  var total = 0;

  function readXP(key) {
    try {
      var raw = localStorage.getItem(key);
      if (!raw) return 0;
      var d = JSON.parse(raw);
      return (typeof d.xp === 'number' && !isNaN(d.xp) && d.xp >= 0) ? d.xp : 0;
    } catch(e) {
      console.warn('[XP] localStorage corrompu pour', key, '— ignoré (PAS écrasé)');
      return 0; // on retourne 0 mais on N'ÉCRASE PAS la clé
    }
  }

  // Guides statiques
  total += readXP('arthur_crypto_academy_v2');
  total += readXP('arthur_bourse_academy_v2');
  total += readXP('mp_academy_v1');
  total += readXP('eco_academy_v1');
  total += readXP('immo_academy_v1');
  total += readXP('arthur_challenges_xp');

  // Guide Forex : UN SEUL mode de calcul à la fois (évite double comptage)
  try {
    var fs = localStorage.getItem('frx_academy_v1');
    if (fs) {
      var fd = JSON.parse(fs);
      if (typeof fd.xp === 'number' && !isNaN(fd.xp)) {
        // Si xp est stocké directement, on l'utilise (source de vérité)
        total += fd.xp;
      } else if (window.FRX_LEVELS) {
        // Sinon on calcule depuis les leçons complétées
        window.FRX_LEVELS.forEach(function(lvl) {
          lvl.lessons.forEach(function(les) {
            if (fd['lesson_' + les.id]) total += lvl.xpPerLesson;
          });
        });
      } else {
        // Fallback : compter les clés lesson_ * xpPerLesson moyen (40)
        var keys = Object.keys(fd).filter(function(k){ return k.indexOf('lesson_') === 0 && fd[k]; });
        total += keys.length * 40;
      }
    }
  } catch(e) {}

  // XP quiz standalone Forex (stocké séparément)
  total += readXP('frx_academy_v1_xp');

  // ⚠️ CRITIQUE : clé de réconciliation Firestore
  // Stocke les XP récupérés de Firestore quand le localStorage est vide
  // (ex: nouveau navigateur, cache vidé, mode privé)
  total += readXP('xp_reconcile_delta');

  return total;
}

/* ── Met à jour l'affichage sidebar ── */
function updateSidebarXP(xp) {
  var lvl  = getLevelInfo(xp);
  var prog = getLevelProgress(xp);

  var badge = document.getElementById('sb-xp-level-badge');
  var bar   = document.getElementById('sb-xp-bar');
  var val   = document.getElementById('sb-xp-val');

  if (badge) {
    badge.textContent = lvl.icon + ' ' + lvl.label;
    badge.style.color  = lvl.color;
    badge.style.background = lvl.color + '18';
    badge.style.borderColor = lvl.color + '44';
  }
  if (bar)   { bar.style.width = prog.pct + '%'; bar.style.background = lvl.color; }
  if (val)   val.textContent = xp + ' XP';
}

/* ── Sauvegarde l'XP dans Firestore ──
   FIX BUG XP : anti-écrasement par valeur plus faible + attente du pull */
function pushXPToFirestore(xp) {
  try {
    var auth = window._auth || (window.firebase && firebase.auth ? firebase.auth() : null);
    var db   = window._db   || (window.firebase && firebase.firestore ? firebase.firestore() : null);
    if (!auth || !db) return;
    var user = auth.currentUser;
    if (!user) return;

    // ⚠️ GUARD CRITIQUE 1 : on ne push QUE si on a pullé au moins une fois
    // sinon on risque d'écraser un XP plus élevé stocké sur Firestore
    if (!window._xpPullDone) {
      console.log('[XP] Push bloqué — pull Firestore pas encore fait');
      return;
    }

    // ⚠️ GUARD CRITIQUE 2 : lire d'abord ce qu'il y a sur Firestore
    // Ne jamais écraser avec une valeur PLUS FAIBLE
    db.collection('user_xp').doc(user.uid).get().then(function(snap) {
      var remoteXP = (snap.exists && typeof snap.data().xp === 'number') ? snap.data().xp : 0;

      if (xp < remoteXP) {
        console.warn('[XP] Régression détectée : local=' + xp + ' < remote=' + remoteXP + '. Push annulé, réconciliation en cours.');
        // On récupère l'XP Firestore à la place
        _reconcileLocalFromRemote(remoteXP);
        return;
      }

      var lvlInfo = getLevelInfo(xp);
      var displayName = user.displayName || (user.email ? user.email.split('@')[0] : 'Anonyme');

      db.collection('user_xp').doc(user.uid).set({
        uid:         user.uid,
        displayName: displayName,
        xp:          xp,
        level:       lvlInfo.level,
        levelLabel:  lvlInfo.label,
        updatedAt:   new Date().toISOString()
      }, { merge: true }).catch(function(e) {
        console.warn('[XPS] Firestore write error:', e.message);
      });
    }).catch(function(e) {
      console.warn('[XPS] Firestore read-before-write error:', e.message);
    });
  } catch(e) {
    console.warn('[XPS] pushXPToFirestore error:', e);
  }
}

/* ── Réconciliation local depuis Firestore ──
   Appelée quand on détecte que le remote > local (ex: nouveau navigateur).
   On stocke le delta manquant dans une clé dédiée pour que
   computeTotalXP retourne au moins remoteXP. */
function _reconcileLocalFromRemote(remoteXP) {
  try {
    // On lit le total SANS la clé de réconciliation pour éviter double comptage
    var localXP = computeTotalXP();
    if (remoteXP <= localXP) return;
    var delta = remoteXP - localXP;
    // On stocke le delta manquant (additif à ce qui pourrait déjà exister)
    var key = 'xp_reconcile_delta';
    var existing = 0;
    try {
      var raw = localStorage.getItem(key);
      if (raw) { var d = JSON.parse(raw); existing = (typeof d.xp === 'number') ? d.xp : 0; }
    } catch(e) {}
    localStorage.setItem(key, JSON.stringify({ xp: existing + delta }));
    console.log('[XP] Réconciliation : +' + delta + ' XP récupérés depuis Firestore');
    updateSidebarXP(computeTotalXP());
  } catch(e) {
    console.warn('[XP] reconcile error:', e);
  }
}

/* ── Charge l'XP depuis Firestore au login ──
   FIX BUG XP : marque _xpPullDone=true pour débloquer les pushs */
function pullXPFromFirestore(callback) {
  try {
    var auth = window._auth || (window.firebase && firebase.auth ? firebase.auth() : null);
    var db   = window._db   || (window.firebase && firebase.firestore ? firebase.firestore() : null);
    if (!auth || !db) {
      window._xpPullDone = true;
      if (callback) callback(computeTotalXP());
      return;
    }
    var user = auth.currentUser;
    if (!user) {
      window._xpPullDone = true;
      if (callback) callback(computeTotalXP());
      return;
    }

    db.collection('user_xp').doc(user.uid).get().then(function(snap) {
      var remoteXP = (snap.exists && typeof snap.data().xp === 'number') ? snap.data().xp : 0;
      var localXP  = computeTotalXP();
      // Garde le MAX des deux (reconciliation automatique)
      var finalXP = Math.max(remoteXP, localXP);
      window._xpPullDone = true;
      console.log('[XP] Pull OK — remote=' + remoteXP + ', local=' + localXP + ', final=' + finalXP);
      if (callback) callback(finalXP);
    }).catch(function(err) {
      console.warn('[XP] Pull error:', err.message);
      window._xpPullDone = true; // on débloque quand même pour ne pas freezer
      if (callback) callback(computeTotalXP());
    });
  } catch(e) {
    window._xpPullDone = true;
    if (callback) callback(computeTotalXP());
  }
}

/* ── Refresh XP (recalcul + push + UI) ── */
function refreshXP() {
  var xp = computeTotalXP();
  updateSidebarXP(xp);
  pushXPToFirestore(xp);
  return xp;
}

/* ── Toast notification XP gagné ── */
function showXPToast(amount, source) {
  var existing = document.getElementById('xps-toast');
  if (existing) existing.remove();

  var toast = document.createElement('div');
  toast.id = 'xps-toast';
  toast.innerHTML = '<span style="font-size:16px;">⚡</span> <span style="color:var(--orange);font-weight:700;font-family:var(--mono);">+' + amount + ' XP</span> <span style="color:var(--tx-faint);font-size:10px;">' + source + '</span>';
  toast.style.cssText = 'position:fixed;bottom:60px;right:20px;z-index:9999;background:var(--bg-raised);border:1px solid var(--orange-bdr);border-radius:8px;padding:10px 16px;display:flex;align-items:center;gap:8px;font-size:12px;font-family:var(--mono);box-shadow:0 4px 20px rgba(255,102,0,0.15);animation:xpsSlideIn .3s ease;';

  if (!document.getElementById('xps-style')) {
    var s = document.createElement('style');
    s.id = 'xps-style';
    s.textContent = '@keyframes xpsSlideIn{from{transform:translateX(120%);opacity:0}to{transform:translateX(0);opacity:1}}';
    document.head.appendChild(s);
  }

  document.body.appendChild(toast);
  setTimeout(function() {
    toast.style.transition = 'opacity .5s, transform .5s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(120%)';
    setTimeout(function() { toast.remove(); }, 500);
  }, 3000);
}

/* ── Rend la page Classement ── */
/* ── Tab switcher classement / défis ── */
window._xpsTab = function(tab, btn) {
  var lb = document.getElementById('xps-panel-leaderboard');
  var df = document.getElementById('xps-panel-defis');
  var btnLb = document.getElementById('xps-tab-lb');
  var btnDf = document.getElementById('xps-tab-df');
  if (!lb || !df) return;

  var activeStyle = 'border:1px solid var(--orange);background:var(--orange);color:#000;font-weight:700;';
  var inactiveStyle = 'border:1px solid var(--br-mid);background:var(--bg-card);color:var(--tx-mid);font-weight:normal;';

  if (tab === 'leaderboard') {
    lb.style.display = ''; df.style.display = 'none';
    if (btnLb) btnLb.style.cssText += activeStyle;
    if (btnDf) btnDf.style.cssText += inactiveStyle;
    if (!lb.innerHTML.trim()) window.XPS.renderLeaderboard();
  } else {
    lb.style.display = 'none'; df.style.display = '';
    if (btnDf) btnDf.style.cssText += activeStyle;
    if (btnLb) btnLb.style.cssText += inactiveStyle;
    if (window.DC) window.DC.render();
  }
};

function renderLeaderboard() {
  // Cibler le conteneur dédié injecté par le TPL
  var content = document.getElementById('xps-classement-root');
  if (!content) {
    // Fallback : attendre que le TPL soit rendu
    setTimeout(function() {
      var el = document.getElementById('xps-classement-root');
      if (el) { content = el; _doRender(content); }
    }, 100);
    return;
  }
  _doRender(content);
}

function _doRender(content) {
  // Si le nouveau layout est en place, cibler le panel leaderboard
  var panel = document.getElementById('xps-panel-leaderboard');
  if (panel) content = panel;

  var myXP   = computeTotalXP();
  var myLvl  = getLevelInfo(myXP);
  var myProg = getLevelProgress(myXP);
  var auth   = window._auth || (window.firebase && firebase.auth ? firebase.auth() : null);
  var db     = window._db   || (window.firebase && firebase.firestore ? firebase.firestore() : null);
  var currentUser = auth ? auth.currentUser : null;

  var html = '<div style="max-width:800px;margin:0 auto;padding-bottom:40px;">';

  // --- Mon profil XP ---
  html += '<div style="background:var(--bg-card);border:1px solid var(--orange-bdr);border-radius:14px;padding:24px;margin-bottom:24px;">'
    + '<div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">'
    + '<div style="width:56px;height:56px;border-radius:50%;background:var(--orange-bg);border:2px solid var(--orange-bdr);display:flex;align-items:center;justify-content:center;font-size:26px;">' + myLvl.icon + '</div>'
    + '<div style="flex:1;min-width:0;">'
    + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:4px;flex-wrap:wrap;">'
    + '<span style="font-size:16px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);">' + AM.util.escapeHtml(currentUser ? (currentUser.displayName || currentUser.email.split('@')[0]) : 'Toi') + '</span>'
    + '<span style="font-size:9px;font-family:var(--mono);font-weight:700;padding:2px 8px;border-radius:4px;background:' + myLvl.color + '22;color:' + myLvl.color + ';border:1px solid ' + myLvl.color + '44;">' + myLvl.icon + ' ' + myLvl.label.toUpperCase() + ' · Niv.' + myLvl.level + '</span>'
    + '</div>'
    + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">'
    + '<span style="font-size:22px;font-weight:700;color:' + myLvl.color + ';font-family:var(--mono);">' + myXP + '</span>'
    + '<span style="font-size:11px;color:var(--tx-faint);">XP total</span>'
    + (myLvl.max !== Infinity ? '<span style="font-size:10px;color:var(--tx-faint);">· encore ' + myProg.needed + ' XP pour le niveau suivant</span>' : '<span style="font-size:10px;color:' + myLvl.color + ';">· Niveau maximum atteint 👑</span>')
    + '</div>'
    + '<div style="height:6px;background:var(--bg-input);border-radius:3px;overflow:hidden;"><div style="height:100%;width:' + myProg.pct + '%;background:' + myLvl.color + ';border-radius:3px;transition:width .6s;"></div></div>'
    + '<div style="display:flex;justify-content:space-between;margin-top:4px;">'
    + '<span style="font-size:9px;color:var(--tx-faint);font-family:var(--mono);">Niv.' + myLvl.level + ' — ' + myLvl.label + '</span>'
    + (myLvl.max !== Infinity ? '<span style="font-size:9px;color:var(--tx-faint);font-family:var(--mono);">' + myProg.pct + '%</span>' : '')
    + '</div>'
    + '</div>'
    + '</div>'
    // Détail par guide
    + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;margin-top:16px;padding-top:16px;border-top:1px solid var(--br-soft);">'
    + _guideXPBreakdown()
    + '</div>'
    + '</div>';




  // --- Comment gagner de l'XP ---
  html += '<div style="background:var(--bg-card);border:1px solid var(--br-soft);border-radius:14px;overflow:hidden;margin-bottom:24px;">'
    + '<div style="padding:16px 20px;border-bottom:1px solid var(--br-soft);">'
    + '<div style="font-size:13px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);">&#x26A1; Comment gagner de l\'XP ?</div>'
    + '<div style="font-size:11px;color:var(--tx-muted);margin-top:3px;">Compl\u00e8te des le\u00e7ons et des quiz dans chaque guide pour accumuler de l\'exp\u00e9rience</div>'
    + '</div>'
    + '<div style="padding:16px;display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:10px;">'
    + '<div style="background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:10px;padding:14px 16px;display:flex;gap:12px;align-items:flex-start;">'
    + '<div style="width:36px;height:36px;border-radius:8px;background:var(--orange-bg);border:1px solid var(--orange-bdr);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">&#x1F4DA;</div>'
    + '<div><div style="font-size:12px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);margin-bottom:3px;">Le\u00e7on compl\u00e9t\u00e9e</div>'
    + '<div style="font-size:11px;color:var(--tx-muted);line-height:1.5;">Lis une le\u00e7on jusqu\'au bout et valide le quiz pour d\u00e9bloquer l\'XP.</div>'
    + '<div style="margin-top:8px;display:flex;gap:6px;flex-wrap:wrap;">'
    + '<span style="font-size:9px;font-family:var(--mono);font-weight:700;background:var(--green-bg);color:var(--green);border:1px solid var(--green-bdr);padding:2px 7px;border-radius:4px;">D\u00e9butant +20 XP</span>'
    + '<span style="font-size:9px;font-family:var(--mono);font-weight:700;background:var(--yellow-bg);color:var(--yellow);border:1px solid var(--yellow-bdr);padding:2px 7px;border-radius:4px;">Interm\u00e9diaire +40 XP</span>'
    + '<span style="font-size:9px;font-family:var(--mono);font-weight:700;background:var(--orange-bg);color:var(--orange);border:1px solid var(--orange-bdr);padding:2px 7px;border-radius:4px;">Avanc\u00e9 +60 XP</span>'
    + '</div></div></div>'
    + '<div style="background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:10px;padding:14px 16px;display:flex;gap:12px;align-items:flex-start;">'
    + '<div style="width:36px;height:36px;border-radius:8px;background:var(--blue-bg);border:1px solid var(--blue-bdr);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">&#x1F9E0;</div>'
    + '<div><div style="font-size:12px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);margin-bottom:3px;">Quiz r\u00e9ussi</div>'
    + '<div style="font-size:11px;color:var(--tx-muted);line-height:1.5;">R\u00e9ponds aux questions \u00e0 la fin d\'une le\u00e7on pour valider et empocher l\'XP.</div>'
    + '<div style="margin-top:8px;"><span style="font-size:9px;font-family:var(--mono);color:var(--tx-faint);">L\'XP est accord\u00e9 une seule fois par le\u00e7on.</span></div>'
    + '</div></div>'
    + '<div style="background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:10px;padding:14px 16px;display:flex;gap:12px;align-items:flex-start;">'
    + '<div style="width:36px;height:36px;border-radius:8px;background:var(--purple-bg);border:1px solid var(--purple-bdr);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">&#x1F5C2;&#xFE0F;</div>'
    + '<div><div style="font-size:12px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);margin-bottom:3px;">6 guides disponibles</div>'
    + '<div style="font-size:11px;color:var(--tx-muted);line-height:1.7;">Crypto &middot; Bourse &middot; Forex &middot; Mati\u00e8res &middot; \u00c9conomie &middot; Immobilier</div>'
    + '</div></div>'
    + '</div></div>';

  // --- Les 7 niveaux ---
  html += '<div style="background:var(--bg-card);border:1px solid var(--br-soft);border-radius:14px;overflow:hidden;margin-bottom:24px;">'
    + '<div style="padding:16px 20px;border-bottom:1px solid var(--br-soft);">'
    + '<div style="font-size:13px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);">&#x1F396;&#xFE0F; Les 7 Niveaux</div>'
    + '<div style="font-size:11px;color:var(--tx-muted);margin-top:3px;">Progresse pour d\u00e9bloquer un nouveau titre et grimper dans le classement</div>'
    + '</div>'
    + '<div style="padding:12px;" id="xps-levels-list"></div>'
    + '</div>';

  // Render levels dynamically (avoids quote hell)
  setTimeout(function() {
    var el = document.getElementById('xps-levels-list');
    if (!el) return;
    var lvlHtml = '';
    XP_LEVELS.forEach(function(lvl) {
      var isCurrentLvl = myLvl.level === lvl.level;
      var isUnlocked   = myXP >= lvl.min;
      var rowBg = isCurrentLvl
        ? 'background:' + lvl.color + '10;border:1px solid ' + lvl.color + '40;'
        : 'background:var(--bg-raised);border:1px solid var(--br-faint);' + (isUnlocked ? '' : 'opacity:0.4;');
      var iconCircle = 'width:40px;height:40px;border-radius:50%;background:' + lvl.color + '18;border:2px solid ' + lvl.color + (isCurrentLvl ? '' : '44') + ';display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;';
      var nameColor = isUnlocked ? 'var(--tx-hi)' : 'var(--tx-faint)';
      var xpRange = lvl.min + (lvl.max === Infinity ? ' XP et plus' : ' \u2013 ' + lvl.max + ' XP');
      var barHtml = isCurrentLvl
        ? '<div style="height:3px;background:var(--bg-input);border-radius:2px;margin-top:6px;overflow:hidden;"><div style="height:100%;width:' + myProg.pct + '%;background:' + lvl.color + ';border-radius:2px;"></div></div>'
        : '';
      lvlHtml += '<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:10px;margin-bottom:6px;' + rowBg + '">'
        + '<div style="' + iconCircle + '">' + (isUnlocked ? lvl.icon : '&#x1F512;') + '</div>'
        + '<div style="flex:1;min-width:0;">'
        + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;flex-wrap:wrap;">'
        + '<span style="font-size:12px;font-weight:700;color:' + nameColor + ';font-family:var(--mono);">Niv.' + lvl.level + ' \u2014 ' + lvl.label + '</span>'
        + (isCurrentLvl ? '<span style="font-size:9px;font-family:var(--mono);font-weight:700;background:' + lvl.color + ';color:#000;padding:1px 7px;border-radius:3px;letter-spacing:1px;">ACTUEL</span>' : '')
        + (isUnlocked && !isCurrentLvl ? '<span style="font-size:9px;font-family:var(--mono);color:var(--green);">\u2713 D\u00e9bloqu\u00e9</span>' : '')
        + '</div>'
        + '<div style="font-size:10px;color:var(--tx-faint);font-family:var(--mono);">' + xpRange + '</div>'
        + barHtml
        + '</div>'
        + '<div style="text-align:right;flex-shrink:0;">'
        + '<div style="font-size:12px;font-weight:700;color:' + lvl.color + ';font-family:var(--mono);">' + (lvl.max === Infinity ? '&#x221E;' : lvl.max) + '</div>'
        + '<div style="font-size:9px;color:var(--tx-faint);">XP max</div>'
        + '</div></div>';
    });
    el.innerHTML = lvlHtml;
  }, 0);

  // --- Leaderboard ---
  html += '<div style="background:var(--bg-card);border:1px solid var(--br-soft);border-radius:14px;overflow:hidden;">'
    + '<div style="padding:16px 20px;border-bottom:1px solid var(--br-soft);display:flex;align-items:center;justify-content:space-between;">'
    + '<div style="font-size:13px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);">&#x1F3C6; Classement Global</div>'
    + '<button onclick="window.XPS.renderLeaderboard()" style="font-family:var(--mono);font-size:10px;padding:4px 10px;border-radius:4px;border:1px solid var(--br-mid);background:var(--bg-input);color:var(--tx-muted);cursor:pointer;">\u21BB Actualiser</button>'
    + '</div>'
    + '<div id="xps-leaderboard-body" style="padding:12px;">'
    + '<div style="text-align:center;padding:30px;color:var(--tx-faint);font-size:11px;font-family:var(--mono);">&#x23F3; Chargement du classement\u2026</div>'
    + '</div>'
    + '</div>';
  html += '</div>';
  content.innerHTML = html;

  // Charger le classement depuis Firestore
  _loadLeaderboard(myXP, currentUser ? currentUser.uid : null);
}

/* ── Breakdown XP par guide ── */
function _guideXPBreakdown() {

  /* ── Lecture XP depuis localStorage ── */
  function _readXP(key) {
    try { var d = JSON.parse(localStorage.getItem(key) || '{}'); return +d.xp || 0; } catch(e) { return 0; }
  }

  /* ── Forex : clé spéciale (completed map + xpPerLesson) ── */
  var frxXP = 0;
  try {
    var fs = localStorage.getItem('frx_academy_v1');
    if (fs) {
      var fd = JSON.parse(fs);
      // Format standard {xp: N}
      if (fd.xp) {
        frxXP = +fd.xp || 0;
      } else if (window.FRX_LEVELS) {
        // Format legacy : completed map keyed by lesson_id
        window.FRX_LEVELS.forEach(function(lvl) {
          lvl.lessons.forEach(function(les) {
            if (fd['lesson_' + les.id] || fd.completed && fd.completed[les.id]) frxXP += lvl.xpPerLesson;
          });
        });
      }
    }
  } catch(e) {}
  // Fallback sur clé xp dédiée
  if (!frxXP) {
    try { var fq = localStorage.getItem('frx_academy_v1_xp'); if (fq) frxXP = JSON.parse(fq).xp || 0; } catch(e) {}
  }

  var guides = [
    { label: '🎓 Crypto',      xp: _readXP('arthur_crypto_academy_v2'), color: 'var(--orange)' },
    { label: '📈 Bourse',      xp: _readXP('arthur_bourse_academy_v2'), color: 'var(--green)'  },
    { label: '💱 Forex',       xp: frxXP,                                color: 'var(--blue)'   },
    { label: '🛢️ Matières',   xp: _readXP('mp_academy_v1'),            color: 'var(--yellow)' },
    { label: '🏦 Économie',    xp: _readXP('eco_academy_v1'),           color: 'var(--purple)' },
    { label: '🏠 Immobilier',  xp: _readXP('immo_academy_v1'),          color: 'var(--green)'  },
  ];

  return guides.map(function(g) {
    return '<div style="background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:8px;padding:10px 12px;">'
      + '<div style="font-size:10px;color:var(--tx-muted);margin-bottom:4px;">' + g.label + '</div>'
      + '<div style="font-size:16px;font-weight:700;color:' + g.color + ';font-family:var(--mono);">' + g.xp + '</div>'
      + '<div style="font-size:9px;color:var(--tx-faint);">XP</div>'
      + '</div>';
  }).join('');
}

/* ── Charge le classement Firestore ── */
function _loadLeaderboard(myXP, myUID) {
  var db = window._db || (window.firebase && firebase.firestore ? firebase.firestore() : null);
  var body = document.getElementById('xps-leaderboard-body');
  if (!body) return;

  if (!db) {
    body.innerHTML = '<div style="text-align:center;padding:20px;color:var(--tx-faint);font-size:11px;">🔌 Firebase non connecté — connecte-toi pour voir le classement</div>';
    return;
  }

  db.collection('user_xp')
    .orderBy('xp', 'desc')
    .limit(20)
    .get()
    .then(function(snap) {
      if (!body) return;
      var users = [];
      snap.forEach(function(doc) { users.push(doc.data()); });

      // Injecter soi-même si non connecté mais a de l'XP
      var mePresent = myUID && users.some(function(u){ return u.uid === myUID; });
      if (!mePresent && myXP > 0 && myUID) {
        var auth = window._auth || (window.firebase && firebase.auth ? firebase.auth() : null);
        var cu = auth ? auth.currentUser : null;
        users.push({
          uid:         myUID,
          displayName: cu ? (cu.displayName || cu.email.split('@')[0]) : 'Toi',
          xp:          myXP,
          level:       getLevelInfo(myXP).level,
          levelLabel:  getLevelInfo(myXP).label
        });
        users.sort(function(a,b){ return b.xp - a.xp; });
      }

      if (users.length === 0) {
        body.innerHTML = '<div style="text-align:center;padding:30px;color:var(--tx-faint);font-size:11px;font-family:var(--mono);">Aucun utilisateur encore classé.<br><br>Complète des leçons pour apparaître ici !</div>';
        return;
      }

      var rankIcons = ['🥇','🥈','🥉'];
      var html = '';
      users.forEach(function(u, i) {
        var lvl   = getLevelInfo(u.xp || 0);
        var isMe  = myUID && u.uid === myUID;
        var rank  = i + 1;
        var rankDisp = rank <= 3 ? rankIcons[rank-1] : '#' + rank;
        html += '<div style="display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:8px;margin-bottom:4px;'
          + (isMe ? 'background:var(--orange-bg);border:1px solid var(--orange-bdr);' : 'background:var(--bg-raised);border:1px solid var(--br-faint);')
          + '">'
          + '<div style="width:28px;text-align:center;font-family:var(--mono);font-weight:700;font-size:' + (rank<=3?'16':'11') + 'px;color:' + (rank<=3?'var(--tx-hi)':'var(--tx-faint)') + ';flex-shrink:0;">' + rankDisp + '</div>'
          + '<div style="width:36px;height:36px;border-radius:50%;background:' + lvl.color + '18;border:1px solid ' + lvl.color + '44;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">' + lvl.icon + '</div>'
          + '<div style="flex:1;min-width:0;">'
          + '<div style="font-size:12px;font-weight:700;color:' + (isMe?'var(--orange)':'var(--tx-hi)') + ';font-family:var(--mono);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + AM.util.escapeHtml(u.displayName || 'Anonyme') + (isMe ? ' <span style="font-size:9px;opacity:.7;">(toi)</span>' : '') + '</div>'
          + '<div style="font-size:9px;color:' + lvl.color + ';font-family:var(--mono);margin-top:1px;">' + lvl.icon + ' ' + lvl.label + ' · Niv.' + lvl.level + '</div>'
          + '</div>'
          + '<div style="text-align:right;flex-shrink:0;">'
          + '<div style="font-size:14px;font-weight:700;color:' + lvl.color + ';font-family:var(--mono);">' + (u.xp || 0) + '</div>'
          + '<div style="font-size:9px;color:var(--tx-faint);">XP</div>'
          + '</div>'
          + '</div>';
      });

      body.innerHTML = html;
    })
    .catch(function(err) {
      if (body) body.innerHTML = '<div style="text-align:center;padding:20px;color:var(--red);font-size:11px;">⚠️ Erreur: ' + AM.util.escapeHtml(err.message || 'inconnue') + '<br><span style="color:var(--tx-faint);font-size:10px;">Vérifie les règles de sécurité Firestore (collection user_xp).</span></div>';
    });
}

/* ─── HOOKS sur les saveState de chaque guide ─── */

// Hook Crypto
var _origSaveState = window.saveState;
// On patche via un MutationObserver post-init pour ne pas rater le timing
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(hookAllSaveStates, 500);
});
// Aussi au cas où DOMContentLoaded est déjà passé
setTimeout(hookAllSaveStates, 1000);

function hookAllSaveStates() {
  // Crypto
  if (typeof window.saveState === 'function' && !window.saveState._xpsHooked) {
    var _orig = window.saveState;
    window.saveState = function() {
      _orig.apply(this, arguments);
      setTimeout(function(){ var xp=refreshXP(); showXPToast && _maybeToast('Guide Crypto'); }, 50);
    };
    window.saveState._xpsHooked = true;
  }

  // Bourse
  if (typeof window.brsSaveState === 'function' && !window.brsSaveState._xpsHooked) {
    var _origB = window.brsSaveState;
    window.brsSaveState = function() {
      _origB.apply(this, arguments);
      setTimeout(function(){ refreshXP(); _maybeToast('Guide Bourse'); }, 50);
    };
    window.brsSaveState._xpsHooked = true;
  }

  // Forex
  if (typeof window.frxSaveState === 'function' && !window.frxSaveState._xpsHooked) {
    var _origF = window.frxSaveState;
    window.frxSaveState = function() {
      _origF.apply(this, arguments);
      setTimeout(function(){ refreshXP(); _maybeToast('Guide Forex'); }, 50);
    };
    window.frxSaveState._xpsHooked = true;
  }

  // Matières premières
  if (typeof window.mpSaveState === 'function' && !window.mpSaveState._xpsHooked) {
    var _origM = window.mpSaveState;
    window.mpSaveState = function() {
      _origM.apply(this, arguments);
      setTimeout(function(){ refreshXP(); _maybeToast('Guide Matières'); }, 50);
    };
    window.mpSaveState._xpsHooked = true;
  }

  // Économie
  if (typeof window.ecoSaveState === 'function' && !window.ecoSaveState._xpsHooked) {
    var _origE = window.ecoSaveState;
    window.ecoSaveState = function() {
      _origE.apply(this, arguments);
      setTimeout(function(){ refreshXP(); _maybeToast('Guide Économie'); }, 50);
    };
    window.ecoSaveState._xpsHooked = true;
  }
}

// Suivi XP précédent pour ne toast que quand ça augmente
var _lastXP = -1;
function _maybeToast(source) {
  var xp = computeTotalXP();
  if (xp > _lastXP && _lastXP >= 0) {
    showXPToast(xp - _lastXP, source);
  }
  _lastXP = xp;
}

/* ── Init au chargement ──
   FIX BUG XP : pull Firestore AVANT tout push, et via onAuthStateChanged
   pour attendre que Firebase soit réellement prêt (plus de race condition) */
function init() {
  // Flag critique : tant qu'à false, aucun push vers Firestore n'est autorisé
  window._xpPullDone = false;

  // Affichage immédiat depuis le localStorage (pour ne pas bloquer l'UI)
  _lastXP = computeTotalXP();
  updateSidebarXP(_lastXP);

  // Hook les saveState (au cas où les scripts sont déjà chargés)
  hookAllSaveStates();
  // Hook les quiz standalone
  hookQuizDoneStatesDelayed();

  // Écoute propre de l'état d'auth Firebase
  var auth = window._auth || (window.firebase && firebase.auth ? firebase.auth() : null);
  if (auth) {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        // 1) PULL d'abord pour savoir ce qui est sur Firestore
        pullXPFromFirestore(function(finalXP) {
          // 2) Si Firestore > local, on réconcilie (récupère les XP manquants)
          var localXP = computeTotalXP();
          if (finalXP > localXP) {
            _reconcileLocalFromRemote(finalXP);
          }
          // 3) Maintenant on peut push (le flag _xpPullDone est à true)
          _lastXP = computeTotalXP();
          updateSidebarXP(_lastXP);
          pushXPToFirestore(_lastXP);
        });
      } else {
        // Pas connecté = pas de sync possible, on débloque les pushs futurs
        window._xpPullDone = true;
      }
    });
  } else {
    // Firebase pas dispo — on débloque pour ne pas freezer
    window._xpPullDone = true;
  }
}

/* ── Exposition publique ── */
/* ─── HOOKS quiz standalone (onglet Quiz de chaque guide) ─── */
/* XP accordé : 5 XP par bonne réponse, à chaque session */

var QUIZ_XP_PER_CORRECT = 5;

function _addQuizXPToGuide(guideLabel, storeKey, xpToAdd) {
  if (xpToAdd <= 0) return;
  try {
    var raw = localStorage.getItem(storeKey);
    var state = raw ? JSON.parse(raw) : { xp: 0, completed: {}, quizScores: {} };
    if (!state.xp) state.xp = 0;
    state.xp += xpToAdd;
    localStorage.setItem(storeKey, JSON.stringify(state));
  } catch(e) {}
  setTimeout(function() { refreshXP(); _maybeToast(guideLabel); }, 50);
}

function hookQuizDoneStates() {

  // ── Crypto : dbtQuizNext ──
  if (typeof window.dbtQuizNext === 'function' && !window.dbtQuizNext._xpsQ) {
    var _o1 = window.dbtQuizNext;
    window.dbtQuizNext = function() {
      try {
        var wasDone = lvlQuizState.done;
        var s = lvlQuizState.score || 0;
        _o1.apply(this, arguments);
        if (!wasDone && lvlQuizState.done && s > 0 && !window._dbtQXP) {
          window._dbtQXP = true;
          _addQuizXPToGuide('Quiz Crypto', 'arthur_crypto_academy_v2', s * QUIZ_XP_PER_CORRECT);
        }
        if (!lvlQuizState.done) window._dbtQXP = false;
      } catch(e) { _o1.apply(this, arguments); }
    };
    window.dbtQuizNext._xpsQ = true;
  }

  // ── Bourse : brsQuizNext ──
  if (typeof window.brsQuizNext === 'function' && !window.brsQuizNext._xpsQ) {
    var _o2 = window.brsQuizNext;
    window.brsQuizNext = function() {
      try {
        var wasDone = brsLvlQuizState.done;
        var s = brsLvlQuizState.score || 0;
        _o2.apply(this, arguments);
        if (!wasDone && brsLvlQuizState.done && s > 0 && !window._brsQXP) {
          window._brsQXP = true;
          _addQuizXPToGuide('Quiz Bourse', 'arthur_bourse_academy_v2', s * QUIZ_XP_PER_CORRECT);
        }
        if (!brsLvlQuizState.done) window._brsQXP = false;
      } catch(e) { _o2.apply(this, arguments); }
    };
    window.brsQuizNext._xpsQ = true;
  }

  // ── Forex : frxLvlQuizNext ──
  if (typeof window.frxLvlQuizNext === 'function' && !window.frxLvlQuizNext._xpsQ) {
    var _o3 = window.frxLvlQuizNext;
    window.frxLvlQuizNext = function() {
      try {
        var wasDone = frxLvlQuizState.done;
        var s = frxLvlQuizState.score || 0;
        _o3.apply(this, arguments);
        if (!wasDone && frxLvlQuizState.done && s > 0 && !window._frxQXP) {
          window._frxQXP = true;
          _addQuizXPToGuide('Quiz Forex', 'frx_academy_v1_xp', s * QUIZ_XP_PER_CORRECT);
        }
        if (!frxLvlQuizState.done) window._frxQXP = false;
      } catch(e) { _o3.apply(this, arguments); }
    };
    window.frxLvlQuizNext._xpsQ = true;
  }

  // ── Matières Premières : mpRenderLevelQuiz (state privé IIFE) ──
  if (typeof window.mpRenderLevelQuiz === 'function' && !window.mpRenderLevelQuiz._xpsQ) {
    var _o4 = window.mpRenderLevelQuiz;
    window.mpRenderLevelQuiz = function() {
      try {
        var cPrev = document.getElementById('mp-quiz-container');
        var wasDone = cPrev && cPrev.querySelector('[onclick*="mpQuizReset"]');
        _o4.apply(this, arguments);
        if (!wasDone && !window._mpQXP) {
          var c = document.getElementById('mp-quiz-container');
          if (c && c.querySelector('[onclick*="mpQuizReset"]')) {
            var el = c.querySelector('[style*="48px"],[style*="44px"]');
            if (el) { var m = el.textContent.match(/(\d+)\/(\d+)/); if (m && +m[1] > 0) { window._mpQXP = true; _addQuizXPToGuide('Quiz Matières', 'mp_academy_v1', +m[1] * QUIZ_XP_PER_CORRECT); } }
          }
        }
        var ca = document.getElementById('mp-quiz-container');
        if (ca && !ca.querySelector('[onclick*="mpQuizReset"]')) window._mpQXP = false;
      } catch(e) { _o4.apply(this, arguments); }
    };
    window.mpRenderLevelQuiz._xpsQ = true;
  }

  // ── Économie : ecoRenderLevelQuiz (state privé IIFE) ──
  if (typeof window.ecoRenderLevelQuiz === 'function' && !window.ecoRenderLevelQuiz._xpsQ) {
    var _o5 = window.ecoRenderLevelQuiz;
    window.ecoRenderLevelQuiz = function() {
      try {
        var cPrev = document.getElementById('eco-quiz-container');
        var wasDone = cPrev && cPrev.querySelector('[onclick*="ecoQuizReset"]');
        _o5.apply(this, arguments);
        if (!wasDone && !window._ecoQXP) {
          var c = document.getElementById('eco-quiz-container');
          if (c && c.querySelector('[onclick*="ecoQuizReset"]')) {
            var el = c.querySelector('[style*="48px"],[style*="44px"]');
            if (el) { var m = el.textContent.match(/(\d+)\/(\d+)/); if (m && +m[1] > 0) { window._ecoQXP = true; _addQuizXPToGuide('Quiz Économie', 'eco_academy_v1', +m[1] * QUIZ_XP_PER_CORRECT); } }
          }
        }
        var ca = document.getElementById('eco-quiz-container');
        if (ca && !ca.querySelector('[onclick*="ecoQuizReset"]')) window._ecoQXP = false;
      } catch(e) { _o5.apply(this, arguments); }
    };
    window.ecoRenderLevelQuiz._xpsQ = true;
  }
}


function hookQuizDoneStatesDelayed() {
  hookQuizDoneStates();
  // Reset des flags quand on recommence un quiz
  setTimeout(function() {
    var _origMpReset = window.mpQuizReset;
    if (_origMpReset && !_origMpReset._xpsR) {
      window.mpQuizReset = function() { window._mpQuizXpGiven = false; _origMpReset.apply(this, arguments); };
      window.mpQuizReset._xpsR = true;
    }
    var _origEcoReset = window.ecoQuizReset;
    if (_origEcoReset && !_origEcoReset._xpsR) {
      window.ecoQuizReset = function() { window._ecoQuizXpGiven = false; _origEcoReset.apply(this, arguments); };
      window.ecoQuizReset._xpsR = true;
    }
  }, 1500);
  // Réessaie après init des guides (lazy load)
  setTimeout(hookQuizDoneStates, 2000);
  setTimeout(hookQuizDoneStates, 5000);
}

window.XPS = {
  refresh:           refreshXP,
  renderLeaderboard: renderLeaderboard,
  getXP:             computeTotalXP,
  getLevel:          function() { return getLevelInfo(computeTotalXP()); },
  push:              function() { pushXPToFirestore(computeTotalXP()); },
};

// Démarrer
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

console.log('[XP System] Module chargé ✓');
})();
