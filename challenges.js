(function() {
'use strict';

/* ── Définition des défis ── */
var CHALLENGES = [
  {
    id: 'time_5min',
    icon: '⏱️',
    label: 'Explorateur',
    desc: 'Rester 5 minutes sur le site',
    xp: 20,
    type: 'time',
    target: 5 * 60,        // secondes
  },
  {
    id: 'time_15min',
    icon: '🕐',
    label: 'Analyste du jour',
    desc: 'Rester 15 minutes sur le site',
    xp: 40,
    type: 'time',
    target: 15 * 60,
  },
  {
    id: 'search_3',
    icon: '🔍',
    label: 'Curieux',
    desc: 'Rechercher 3 actifs différents',
    xp: 25,
    type: 'search',
    target: 3,
  },
  {
    id: 'search_5',
    icon: '📡',
    label: 'Trader actif',
    desc: 'Rechercher 5 actifs différents',
    xp: 40,
    type: 'search',
    target: 5,
  },
  {
    id: 'nav_4pages',
    icon: '🗺️',
    label: 'Grand tour',
    desc: 'Visiter 4 sections différentes',
    xp: 30,
    type: 'nav',
    target: 4,
  },
  {
    id: 'nav_7pages',
    icon: '🌐',
    label: 'Explorateur Pro',
    desc: 'Visiter 7 sections différentes',
    xp: 50,
    type: 'nav',
    target: 7,
  },
  {
    id: 'portfolio_add',
    icon: '💼',
    label: 'Investisseur',
    desc: 'Ajouter une position au portfolio',
    xp: 35,
    type: 'event',
    event: 'challenge:portfolio_add',
  },
  {
    id: 'alert_create',
    icon: '🔔',
    label: 'Sentinelle',
    desc: 'Créer une alerte de prix',
    xp: 30,
    type: 'event',
    event: 'challenge:alert_create',
  },
  {
    id: 'guide_open',
    icon: '📚',
    label: 'Apprenant',
    desc: 'Ouvrir un guide de formation',
    xp: 15,
    type: 'event',
    event: 'challenge:guide_open',
  },
  {
    id: 'login_daily',
    icon: '🌅',
    label: 'Fidèle',
    desc: 'Se connecter aujourd\'hui',
    xp: 10,
    type: 'auto',   // accordé automatiquement à l\'init
  },
];

/* ── Clé localStorage & utilitaires ── */
var DC_KEY = 'arthur_daily_challenges_v1';

function todayStr() {
  return new Date().toISOString().split('T')[0]; // YYYY-MM-DD
}

function loadDC() {
  try {
    var s = localStorage.getItem(DC_KEY);
    var d = s ? JSON.parse(s) : {};
    // Reset si nouveau jour
    if (d.date !== todayStr()) {
      d = { date: todayStr(), completed: {}, progress: {} };
      saveDC(d);
    }
    return d;
  } catch(e) {
    return { date: todayStr(), completed: {}, progress: {} };
  }
}

function saveDC(d) {
  try { localStorage.setItem(DC_KEY, JSON.stringify(d)); } catch(e) {}
}

function completeChallenge(id) {
  var d = loadDC();
  if (d.completed[id]) return; // déjà fait aujourd'hui
  d.completed[id] = true;
  saveDC(d);

  var ch = CHALLENGES.find(function(c){ return c.id === id; });
  if (!ch) return;

  // Ajouter l'XP dans un store dédié challenges
  try {
    var raw = localStorage.getItem('arthur_challenges_xp') || '{"xp":0}';
    var st = JSON.parse(raw);
    st.xp = (st.xp || 0) + ch.xp;
    localStorage.setItem('arthur_challenges_xp', JSON.stringify(st));
  } catch(e) {}

  // Rafraîchir le système XP global
  if (window.XPS) {
    window.XPS.refresh();
    // Toast personnalisé défi
    _challengeToast(ch);
  }

  // Rafraîchir l'UI des défis si visible
  if (document.getElementById('xps-challenges-root')) {
    renderChallengesUI();
  }
}

function getProgress(id) {
  var d = loadDC();
  return d.progress[id] || 0;
}

function setProgress(id, val) {
  var d = loadDC();
  d.progress[id] = val;
  saveDC(d);
}

function isCompleted(id) {
  return !!loadDC().completed[id];
}

/* ── Toast défi ── */
function _challengeToast(ch) {
  var existing = document.getElementById('dc-toast');
  if (existing) existing.remove();
  var t = document.createElement('div');
  t.id = 'dc-toast';
  t.innerHTML = '<div style="font-size:20px;">' + ch.icon + '</div>'
    + '<div><div style="font-size:12px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);">Défi accompli !</div>'
    + '<div style="font-size:11px;color:var(--tx-muted);">' + ch.label + '</div></div>'
    + '<div style="font-family:var(--mono);font-weight:700;color:var(--orange);font-size:13px;">+' + ch.xp + ' XP</div>';
  t.style.cssText = 'position:fixed;bottom:100px;right:20px;z-index:9999;background:var(--bg-raised);border:1px solid var(--orange-bdr);border-radius:10px;padding:12px 16px;display:flex;align-items:center;gap:12px;box-shadow:0 4px 24px rgba(255,102,0,0.2);animation:xpsSlideIn .3s ease;';
  document.body.appendChild(t);
  setTimeout(function() {
    t.style.transition = 'opacity .5s,transform .5s';
    t.style.opacity = '0'; t.style.transform = 'translateX(120%)';
    setTimeout(function(){ t.remove(); }, 500);
  }, 4000);
}

/* ── Tracker temps passé ── */
var _timeStart = Date.now();
var _timeInterval = setInterval(function() {
  var elapsed = Math.floor((Date.now() - _timeStart) / 1000);
  setProgress('time_5min', Math.min(elapsed, 5*60));
  setProgress('time_15min', Math.min(elapsed, 15*60));
  if (!isCompleted('time_5min') && elapsed >= 5*60)   completeChallenge('time_5min');
  if (!isCompleted('time_15min') && elapsed >= 15*60) completeChallenge('time_15min');
  // Mise à jour live de l'UI
  if (document.getElementById('dc-prog-time_5min'))  _updateProgBar('time_5min',  Math.min(elapsed, 5*60),  5*60);
  if (document.getElementById('dc-prog-time_15min')) _updateProgBar('time_15min', Math.min(elapsed, 15*60), 15*60);
}, 5000);

/* ── Tracker recherches ── */
var _searchedAssets = {};
function trackSearch(query) {
  if (!query || query.length < 2) return;
  var key = query.trim().toUpperCase();
  if (_searchedAssets[key]) return;
  _searchedAssets[key] = true;
  var count = Object.keys(_searchedAssets).length;
  setProgress('search_3', Math.min(count, 3));
  setProgress('search_5', Math.min(count, 5));
  if (!isCompleted('search_3') && count >= 3) completeChallenge('search_3');
  if (!isCompleted('search_5') && count >= 5) completeChallenge('search_5');
  _updateProgBar('search_3', Math.min(count,3), 3);
  _updateProgBar('search_5', Math.min(count,5), 5);
}

/* ── Tracker navigation ── */
var _visitedPages = {};
function trackNav(page) {
  if (!page) return;
  _visitedPages[page] = true;
  var count = Object.keys(_visitedPages).length;
  setProgress('nav_4pages', Math.min(count, 4));
  setProgress('nav_7pages', Math.min(count, 7));
  if (!isCompleted('nav_4pages') && count >= 4) completeChallenge('nav_4pages');
  if (!isCompleted('nav_7pages') && count >= 7) completeChallenge('nav_7pages');
  _updateProgBar('nav_4pages', Math.min(count,4), 4);
  _updateProgBar('nav_7pages', Math.min(count,7), 7);
}

/* ── Update barre de progression live ── */
function _updateProgBar(id, val, max) {
  var bar = document.getElementById('dc-prog-' + id);
  var txt = document.getElementById('dc-txt-' + id);
  if (bar) bar.style.width = Math.min(100, Math.round(val/max*100)) + '%';
  if (txt) {
    if (id.indexOf('time') === 0) {
      var mins = Math.floor(val/60), secs = val%60;
      txt.textContent = mins + ':' + (secs<10?'0':'') + secs + ' / ' + Math.floor(max/60) + ':00';
    } else {
      txt.textContent = val + ' / ' + max;
    }
  }
}

/* ── Hook AM.nav.goto ── */
setTimeout(function() {
  if (window.AM && window.AM.nav && window.AM.nav.goto && !window.AM.nav.goto._dcHooked) {
    var _origGoto = window.AM.nav.goto.bind(window.AM.nav);
    window.AM.nav.goto = function(page) {
      _origGoto(page);
      trackNav(page);
      // Défi guide ouvert
      if (page === 'debutant' && !isCompleted('guide_open')) {
        completeChallenge('guide_open');
      }
    };
    window.AM.nav.goto._dcHooked = true;
  }
}, 500);

/* ── Hook recherche ── */
setTimeout(function() {
  var inp = document.getElementById('search-modal-input');
  if (inp && !inp._dcHooked) {
    inp.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && inp.value.trim().length >= 2) {
        trackSearch(inp.value.trim());
      }
    });
    // Track aussi les clics sur résultats
    var modal = document.getElementById('search-modal');
    if (modal) {
      modal.addEventListener('click', function(e) {
        var r = e.target.closest('.search-result');
        if (r && inp.value.trim().length >= 2) trackSearch(inp.value.trim());
      });
    }
    inp._dcHooked = true;
  }
}, 800);

/* ── Hook portfolio addPosition ── */
setTimeout(function() {
  if (window.AM && window.AM.pf && window.AM.pf.addPosition && !window.AM.pf.addPosition._dcHooked) {
    var _origAdd = window.AM.pf.addPosition.bind(window.AM.pf);
    window.AM.pf.addPosition = function() {
      _origAdd.apply(this, arguments);
      setTimeout(function() {
        if (!isCompleted('portfolio_add')) completeChallenge('portfolio_add');
      }, 200);
    };
    window.AM.pf.addPosition._dcHooked = true;
  }
}, 1000);

/* ── Hook alert create ── */
setTimeout(function() {
  if (window.AM && window.AM.al && window.AM.al.create && !window.AM.al.create._dcHooked) {
    var _origCreate = window.AM.al.create.bind(window.AM.al);
    window.AM.al.create = function() {
      _origCreate.apply(this, arguments);
      setTimeout(function() {
        if (!isCompleted('alert_create')) completeChallenge('alert_create');
      }, 200);
    };
    window.AM.al.create._dcHooked = true;
  }
}, 1000);

/* ── Défi connexion automatique ── */
setTimeout(function() {
  if (!isCompleted('login_daily')) completeChallenge('login_daily');
}, 2000);

/* ── Intégration dans computeTotalXP ── */
var _origComputeXP = window.XPS && window.XPS.getXP;
// On patch computeTotalXP dans le module XPS via un event
document.addEventListener('xps:computeXP', function(e) {
  try {
    var raw = localStorage.getItem('arthur_challenges_xp');
    if (raw) e.detail.total += (JSON.parse(raw).xp || 0);
  } catch(ex) {}
});

/* ── Render UI défis ── */
function renderChallengesUI() {
  var root = document.getElementById('xps-challenges-root');
  if (!root) return;

  var d = loadDC();
  var elapsed = Math.floor((Date.now() - _timeStart) / 1000);
  var searches = Object.keys(_searchedAssets).length;
  var navCount = Object.keys(_visitedPages).length;

  // Reset dans combien de temps ?
  var now = new Date();
  var tomorrow = new Date(now); tomorrow.setDate(tomorrow.getDate()+1); tomorrow.setHours(0,0,0,0);
  var diffMs = tomorrow - now;
  var diffH = Math.floor(diffMs/3600000);
  var diffM = Math.floor((diffMs%3600000)/60000);
  var resetIn = diffH + 'h ' + diffM + 'min';

  var totalXP = CHALLENGES.reduce(function(s,c){ return s + (d.completed[c.id] ? c.xp : 0); }, 0);
  var doneCount = Object.keys(d.completed).length;

  var html = '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:8px;">'
    + '<div>'
    + '<div style="font-size:15px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);">⚡ Défis du jour</div>'
    + '<div style="font-size:11px;color:var(--tx-muted);margin-top:2px;">Reset dans ' + resetIn + ' · ' + doneCount + '/' + CHALLENGES.length + ' accomplis</div>'
    + '</div>'
    + '<div style="text-align:right;">'
    + '<div style="font-size:18px;font-weight:700;color:var(--orange);font-family:var(--mono);">+' + totalXP + ' XP</div>'
    + '<div style="font-size:9px;color:var(--tx-faint);">gagnés aujourd\'hui</div>'
    + '</div>'
    + '</div>';

  // Barre de progression globale
  var globalPct = Math.round(doneCount / CHALLENGES.length * 100);
  html += '<div style="margin-bottom:20px;">'
    + '<div style="height:6px;background:var(--bg-input);border-radius:3px;overflow:hidden;">'
    + '<div style="height:100%;width:' + globalPct + '%;background:var(--orange);border-radius:3px;transition:width .5s;"></div>'
    + '</div>'
    + '<div style="font-size:9px;color:var(--tx-faint);margin-top:4px;text-align:right;">' + globalPct + '% complété</div>'
    + '</div>';

  // Grille des défis
  html += '<div style="display:flex;flex-direction:column;gap:8px;">';

  CHALLENGES.forEach(function(ch) {
    var done = !!d.completed[ch.id];
    var prog = 0, max = 1, progTxt = '';

    if (ch.type === 'time') {
      max = ch.target;
      prog = done ? max : Math.min(elapsed, max);
      var mins = Math.floor(prog/60), secs = prog%60;
      progTxt = mins + ':' + (secs<10?'0':'') + secs + ' / ' + Math.floor(max/60) + ':00';
    } else if (ch.type === 'search') {
      max = ch.target;
      prog = done ? max : Math.min(searches, max);
      progTxt = prog + ' / ' + max;
    } else if (ch.type === 'nav') {
      max = ch.target;
      prog = done ? max : Math.min(navCount, max);
      progTxt = prog + ' / ' + max;
    } else {
      prog = done ? 1 : 0; max = 1;
      progTxt = done ? 'Accompli' : 'En attente';
    }

    var pct = Math.min(100, Math.round(prog/max*100));
    var color = done ? 'var(--green)' : (pct > 0 ? 'var(--orange)' : 'var(--tx-faint)');

    html += '<div style="display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:10px;background:var(--bg-raised);border:1px solid ' + (done ? 'var(--green-bdr)' : 'var(--br-soft)') + ';transition:border-color .2s;">'
      + '<div style="width:40px;height:40px;border-radius:10px;background:' + (done ? 'var(--green-bg)' : 'var(--bg-card)') + ';border:1px solid ' + (done ? 'var(--green-bdr)' : 'var(--br-mid)') + ';display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">' + (done ? '✅' : ch.icon) + '</div>'
      + '<div style="flex:1;min-width:0;">'
      + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;">'
      + '<span style="font-size:12px;font-weight:700;color:' + (done ? 'var(--green)' : 'var(--tx-hi)') + ';font-family:var(--mono);">' + ch.label + '</span>'
      + '</div>'
      + '<div style="font-size:10px;color:var(--tx-muted);margin-bottom:5px;">' + ch.desc + '</div>'
      + (ch.type !== 'event' && ch.type !== 'auto' ?
        '<div style="height:3px;background:var(--bg-input);border-radius:2px;overflow:hidden;margin-bottom:3px;">'
        + '<div id="dc-prog-' + ch.id + '" style="height:100%;width:' + pct + '%;background:' + color + ';border-radius:2px;transition:width .4s;"></div>'
        + '</div>'
        + '<div id="dc-txt-' + ch.id + '" style="font-size:9px;color:var(--tx-faint);font-family:var(--mono);">' + progTxt + '</div>'
        : '<div style="font-size:9px;color:' + color + ';font-family:var(--mono);">' + progTxt + '</div>'
      )
      + '</div>'
      + '<div style="flex-shrink:0;text-align:right;">'
      + '<div style="font-size:13px;font-weight:700;color:' + (done ? 'var(--green)' : 'var(--orange)') + ';font-family:var(--mono);">+' + ch.xp + '</div>'
      + '<div style="font-size:9px;color:var(--tx-faint);">XP</div>'
      + '</div>'
      + '</div>';
  });

  html += '</div>';
  root.innerHTML = html;
}

/* ── Exposer le renderer ── */
window.DC = {
  render: renderChallengesUI,
  complete: completeChallenge,
  trackSearch: trackSearch,
  trackNav: trackNav,
};

console.log('[Daily Challenges] Module chargé ✓');
})();
