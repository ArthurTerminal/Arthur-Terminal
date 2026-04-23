/* ═══════════════════════════════════════════════════════════════
   Arthur Terminal — Mon Espace Analyse v2.0
   Logique complète: formulaire enrichi, historique, dashboard
   ═══════════════════════════════════════════════════════════════ */
(function() {

/* ── Constantes ── */
var LS_KEY = 'am_analyses';
var _eaSortDir = -1; // -1 = desc (plus récent en premier)

/* ── Helpers ── */
var EA = {};

EA.load = function() {
  return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
};

EA.save = function(list) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
};

EA.biasLabel = function(b) {
  return { long: '▲ Long', short: '▼ Short', neutral: '— Neutre', watch: '👁 Watch' }[b] || b;
};

EA.biasBadge = function(b) {
  var cls = { long:'badge-up', short:'badge-dn', neutral:'', watch:'' }[b] || '';
  var style = {
    long: '',
    short: '',
    neutral: 'border-color:var(--br-mid);color:var(--tx-faint);',
    watch: 'background:var(--yellow-bg);border-color:rgba(255,209,102,.2);color:var(--yellow);'
  }[b] || '';
  return '<span class="badge ' + cls + '" style="' + style + '">' + EA.biasLabel(b) + '</span>';
};

EA.resultColor = function(r) {
  if (!r || r === 'En cours') return 'var(--tx-faint)';
  if (r.startsWith('+')) return 'var(--green)';
  if (r.startsWith('-')) return 'var(--red)';
  return 'var(--tx-faint)';
};

EA.escape = function(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
};

/* ── Calcul R:R ── */
window.eaCalcRR = function() {
  var entry = parseFloat((document.getElementById('ea-entry')||{}).value);
  var sl    = parseFloat((document.getElementById('ea-sl')||{}).value);
  var tp1   = parseFloat((document.getElementById('ea-tp1')||{}).value);
  var disp  = document.getElementById('ea-rr-display');
  var rrVal = document.getElementById('ea-rr-val');
  var riskV = document.getElementById('ea-risk-val');
  var rewV  = document.getElementById('ea-reward-val');
  if (!disp) return;
  if (isNaN(entry) || isNaN(sl) || isNaN(tp1)) { disp.style.display = 'none'; return; }
  var risk   = Math.abs(entry - sl);
  var reward = Math.abs(tp1 - entry);
  if (risk === 0) { disp.style.display = 'none'; return; }
  var rr = (reward / risk).toFixed(2);
  disp.style.display = 'block';
  rrVal.textContent = '1 : ' + rr;
  rrVal.style.color = parseFloat(rr) >= 2 ? 'var(--green)' : parseFloat(rr) >= 1 ? 'var(--yellow)' : 'var(--red)';
  riskV.textContent = risk.toFixed(4);
  rewV.textContent  = reward.toFixed(4);
};

/* ── Toggle tag ── */
window.eaToggleTag = function(btn) {
  btn.classList.toggle('tag-active');
  if (btn.classList.contains('tag-active')) {
    btn.style.background = 'var(--orange-bg)';
    btn.style.borderColor = 'var(--orange-bdr)';
    btn.style.color = 'var(--orange)';
  } else {
    btn.style.background = 'var(--bg-input)';
    btn.style.borderColor = 'var(--br-soft)';
    btn.style.color = 'var(--tx-faint)';
  }
};

/* ── Update chart on ticker change ── */
var _chartTimer = null;
window.eaUpdateChart = function(ticker) {
  clearTimeout(_chartTimer);
  _chartTimer = setTimeout(function() {
    if (!ticker || ticker.length < 2) return;
    var iframe = document.getElementById('ea-chart-iframe');
    if (!iframe) return;
    var sym = ticker.toUpperCase();
    // Heuristique marché
    if (sym.includes('.PA') || sym.includes('.L') || sym.includes('.DE')) {
      sym = 'EURONEXT:' + sym.replace('.PA','');
    } else if (['BTC','ETH','SOL','BNB','XRP','ADA'].indexOf(sym) !== -1) {
      sym = 'BINANCE:' + sym + 'USDT';
    } else if (sym.includes('/')) {
      sym = 'FX:' + sym.replace('/', '');
    } else {
      sym = 'NASDAQ:' + sym;
    }
    var tf_map = { M5:'5', M15:'15', H1:'60', H4:'240', D:'D', W:'W', M:'M' };
    var tf = tf_map[(document.getElementById('ea-tf')||{}).value] || 'D';
    iframe.src = 'https://www.tradingview.com/widgetembed/?symbol=' + encodeURIComponent(sym) + '&interval=' + tf + '&theme=dark&style=1&locale=fr&timezone=Europe%2FParis&allow_symbol_change=1&withdateranges=1';
  }, 800);
};

/* ── Reset formulaire ── */
window.eaResetForm = function() {
  ['ea-ticker','ea-titre','ea-entry','ea-sl','ea-tp1','ea-tp2'].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.value = '';
  });
  var notes = document.getElementById('ea-notes');
  if (notes) notes.value = '';
  var tf = document.getElementById('ea-tf');
  if (tf) tf.value = 'H4';
  document.querySelectorAll('#p-analyse [data-bias]').forEach(function(b){
    b.classList.remove('bias-active','on');
  });
  document.querySelectorAll('#ea-tags-container .ea-tag').forEach(function(t){
    t.classList.remove('tag-active');
    t.style.background = 'var(--bg-input)';
    t.style.borderColor = 'var(--br-soft)';
    t.style.color = 'var(--tx-faint)';
  });
  var rrd = document.getElementById('ea-rr-display');
  if (rrd) rrd.style.display = 'none';
};

/* ── Rendu historique ── */
window.eaRenderHistory = function() {
  var tbody = document.getElementById('ea-h-tbody');
  var empty = document.getElementById('ea-h-empty');
  if (!tbody) return;
  var analyses = EA.load();
  var search  = ((document.getElementById('ea-search')||{}).value || '').toLowerCase();
  var fBias   = (document.getElementById('ea-filter-bias')||{}).value || '';
  var fResult = (document.getElementById('ea-filter-result')||{}).value || '';

  var filtered = analyses.filter(function(a) {
    if (fBias && a.bias !== fBias) return false;
    if (fResult) {
      if (fResult === 'win' && !a.result.startsWith('+')) return false;
      if (fResult === 'loss' && !a.result.startsWith('-')) return false;
      if (fResult === 'En cours' && a.result !== 'En cours') return false;
    }
    if (search) {
      var haystack = (a.ticker + ' ' + a.titre + ' ' + (a.tags||[]).join(' ')).toLowerCase();
      if (haystack.indexOf(search) === -1) return false;
    }
    return true;
  });

  // Mise à jour compteur onglet
  var cnt = document.getElementById('ea-h-count');
  if (cnt) cnt.textContent = analyses.length;

  if (!filtered.length) {
    tbody.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  tbody.innerHTML = filtered.map(function(a) {
    var tags = (a.tags||[]).map(function(t){
      return '<span style="font-size:9px;font-family:var(--mono);padding:2px 7px;border-radius:10px;background:var(--orange-bg);color:var(--orange);border:1px solid var(--orange-bdr);">' + EA.escape(t) + '</span>';
    }).join(' ');
    var rrDisplay = a.rr && a.rr !== '—' ? '<span style="font-family:var(--mono);font-size:11px;color:var(--blue);">' + EA.escape(a.rr) + '</span>' : '<span style="color:var(--tx-faint);">—</span>';
    return '<tr>' +
      '<td style="font-family:var(--mono);font-size:11px;white-space:nowrap;">' + EA.escape(a.date) + '</td>' +
      '<td><span class="hl" style="font-weight:700;cursor:pointer;" onclick="eaViewAnalyse(' + a.id + ')">' + EA.escape(a.ticker) + '</span></td>' +
      '<td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + EA.escape(a.titre) + '</td>' +
      '<td style="font-family:var(--mono);font-size:10px;color:var(--tx-faint);">' + EA.escape(a.tf||'—') + '</td>' +
      '<td>' + EA.biasBadge(a.bias) + '</td>' +
      '<td>' + rrDisplay + '</td>' +
      '<td style="max-width:140px;">' + (tags||'<span style="color:var(--tx-faint);font-size:10px;">—</span>') + '</td>' +
      '<td style="color:' + EA.resultColor(a.result) + ';font-family:var(--mono);font-size:11px;">' + EA.escape(a.result) + '</td>' +
      '<td style="white-space:nowrap;">' +
        '<button class="btn-link" onclick="eaViewAnalyse(' + a.id + ')" style="margin-right:6px;">Voir →</button>' +
        '<button class="btn-link" onclick="eaSetResult(' + a.id + ')" style="margin-right:6px;color:var(--yellow);">P&L</button>' +
        '<button class="btn-link" onclick="eaDelete(' + a.id + ')" style="color:var(--red);">✕</button>' +
      '</td>' +
    '</tr>';
  }).join('');
};

/* ── Voir une analyse (modal) ── */
window.eaViewAnalyse = function(id) {
  var analyses = EA.load();
  var a = analyses.find(function(x){ return x.id === id; });
  if (!a) return;
  var modal = document.getElementById('ea-modal');
  var content = document.getElementById('ea-modal-content');
  if (!modal || !content) return;
  var tags = (a.tags||[]).map(function(t){
    return '<span style="font-size:10px;font-family:var(--mono);padding:3px 10px;border-radius:12px;background:var(--orange-bg);color:var(--orange);border:1px solid var(--orange-bdr);">' + EA.escape(t) + '</span>';
  }).join(' ');
  content.innerHTML =
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:18px;">' +
      '<div style="font-size:22px;font-weight:800;font-family:var(--mono);color:var(--orange);">' + EA.escape(a.ticker) + '</div>' +
      EA.biasBadge(a.bias) +
      '<div style="font-family:var(--mono);font-size:10px;color:var(--tx-faint);margin-left:auto;">' + EA.escape(a.date) + ' · ' + EA.escape(a.tf||'') + '</div>' +
    '</div>' +
    '<div style="font-size:15px;font-weight:600;color:var(--tx-hi);margin-bottom:14px;">' + EA.escape(a.titre) + '</div>' +
    (a.entry || a.sl ? '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px;">' +
      (a.entry ? '<div style="background:var(--bg-input);border-radius:6px;padding:8px;text-align:center;"><div style="font-family:var(--mono);font-size:9px;color:var(--tx-faint);">ENTRÉE</div><div style="font-family:var(--mono);font-size:13px;font-weight:700;color:var(--tx-hi);">' + EA.escape(a.entry) + '</div></div>' : '') +
      (a.sl ? '<div style="background:rgba(255,71,87,.08);border:1px solid rgba(255,71,87,.18);border-radius:6px;padding:8px;text-align:center;"><div style="font-family:var(--mono);font-size:9px;color:var(--red);">STOP LOSS</div><div style="font-family:var(--mono);font-size:13px;font-weight:700;color:var(--red);">' + EA.escape(a.sl) + '</div></div>' : '') +
      (a.tp1 ? '<div style="background:rgba(0,232,150,.08);border:1px solid rgba(0,232,150,.18);border-radius:6px;padding:8px;text-align:center;"><div style="font-family:var(--mono);font-size:9px;color:var(--green);">TP1</div><div style="font-family:var(--mono);font-size:13px;font-weight:700;color:var(--green);">' + EA.escape(a.tp1) + '</div></div>' : '') +
      (a.rr ? '<div style="background:var(--blue-bg);border:1px solid var(--blue-bdr);border-radius:6px;padding:8px;text-align:center;"><div style="font-family:var(--mono);font-size:9px;color:var(--blue);">R:R</div><div style="font-family:var(--mono);font-size:13px;font-weight:700;color:var(--blue);">' + EA.escape(a.rr) + '</div></div>' : '') +
    '</div>' : '') +
    (a.notes ? '<div style="background:var(--bg-input);border-radius:8px;padding:12px;margin-bottom:14px;border-left:3px solid var(--orange);"><div style="font-family:var(--mono);font-size:9px;color:var(--tx-faint);margin-bottom:6px;">NOTES</div><div style="font-size:12px;line-height:1.7;color:var(--tx-mid);white-space:pre-wrap;">' + EA.escape(a.notes) + '</div></div>' : '') +
    (tags ? '<div style="margin-bottom:14px;display:flex;gap:6px;flex-wrap:wrap;">' + tags + '</div>' : '') +
    '<div style="display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px solid var(--br-soft);">' +
      '<div style="font-size:12px;color:var(--tx-faint);">Résultat: <span style="color:' + EA.resultColor(a.result) + ';font-family:var(--mono);font-weight:700;">' + EA.escape(a.result) + '</span></div>' +
      '<div style="display:flex;gap:8px;">' +
        '<button class="btn btn-ghost" onclick="eaSetResult(' + a.id + ');document.getElementById(\'ea-modal\').style.display=\'none\';" style="font-size:11px;padding:5px 12px;color:var(--yellow);">Saisir P&L</button>' +
        '<button class="btn btn-ghost" onclick="eaDelete(' + a.id + ');document.getElementById(\'ea-modal\').style.display=\'none\';" style="font-size:11px;padding:5px 12px;color:var(--red);">Supprimer</button>' +
      '</div>' +
    '</div>';
  modal.style.display = 'flex';
};

/* ── Saisir résultat ── */
window.eaSetResult = function(id) {
  var val = prompt('Entrez le résultat (ex: +12.5%, -3.2%, Annulée, TP1 atteint):');
  if (val === null) return;
  var analyses = EA.load();
  analyses = analyses.map(function(a) {
    return a.id === id ? Object.assign({}, a, { result: val }) : a;
  });
  EA.save(analyses);
  eaRefreshAll();
  AM.toast && AM.toast('Résultat mis à jour ✓', 'success');
};

/* ── Supprimer une analyse ── */
window.eaDelete = function(id) {
  if (!confirm('Supprimer cette analyse ?')) return;
  var analyses = EA.load().filter(function(a){ return a.id !== id; });
  EA.save(analyses);
  eaRefreshAll();
  AM.toast && AM.toast('Analyse supprimée', 'info');
};

/* ── Tout effacer ── */
window.eaClearAll = function() {
  if (!confirm('Supprimer TOUTES les analyses ? Cette action est irréversible.')) return;
  EA.save([]);
  eaRefreshAll();
  AM.toast && AM.toast('Toutes les analyses supprimées', 'info');
};

/* ── Tri historique ── */
window.eaSortBy = function(field) {
  _eaSortDir *= -1;
  var analyses = EA.load();
  if (field === 'date') {
    analyses.sort(function(a, b) {
      var da = a.id || 0, db = b.id || 0;
      return (da - db) * _eaSortDir;
    });
    EA.save(analyses);
  }
  eaRenderHistory();
};

/* ── Dashboard ── */
function eaRenderDashboard() {
  var analyses = EA.load();
  var total = analyses.length;
  var open  = analyses.filter(function(a){ return a.result === 'En cours'; }).length;
  var closed = analyses.filter(function(a){ return a.result !== 'En cours'; });
  var wins   = closed.filter(function(a){ return a.result.startsWith('+'); }).length;
  var wr     = closed.length ? Math.round(wins / closed.length * 100) : null;
  var tickers = [...new Set(analyses.map(function(a){ return a.ticker; }))].length;

  // RR moyen
  var rrList = analyses.map(function(a){
    if (!a.rr || a.rr === '—') return null;
    var m = a.rr.match(/1\s*:\s*([\d.]+)/);
    return m ? parseFloat(m[1]) : null;
  }).filter(Boolean);
  var rrMoy = rrList.length ? (rrList.reduce(function(s,v){ return s+v; },0) / rrList.length).toFixed(2) : null;

  var setTxt = function(id, txt) { var el = document.getElementById(id); if (el) el.textContent = txt; };
  setTxt('ea-ds-total', total);
  setTxt('ea-ds-wr', wr !== null ? wr + '%' : '—%');
  setTxt('ea-ds-rr', rrMoy ? '1:' + rrMoy : '—');
  setTxt('ea-ds-open', open);
  setTxt('ea-ds-tickers', tickers);
  setTxt('ea-kpi-total', total);
  setTxt('ea-kpi-open', open);
  setTxt('ea-kpi-wr', wr !== null ? wr + '%' : '—%');
  setTxt('ea-kpi-rr', rrMoy ? '1:'+rrMoy : '—');

  // Barres biais
  var biasEl = document.getElementById('ea-ds-bias-bars');
  if (biasEl && total > 0) {
    var biasCount = { long:0, short:0, neutral:0, watch:0 };
    analyses.forEach(function(a){ if (biasCount[a.bias] !== undefined) biasCount[a.bias]++; });
    var biasColor = { long:'var(--green)', short:'var(--red)', neutral:'var(--tx-faint)', watch:'var(--yellow)' };
    biasEl.innerHTML = Object.keys(biasCount).map(function(b) {
      var pct = Math.round(biasCount[b] / total * 100);
      return '<div>' +
        '<div style="display:flex;justify-content:space-between;margin-bottom:3px;">' +
          '<span style="font-size:11px;">' + EA.biasLabel(b) + '</span>' +
          '<span style="font-family:var(--mono);font-size:11px;color:' + biasColor[b] + ';">' + biasCount[b] + ' (' + pct + '%)</span>' +
        '</div>' +
        '<div style="height:5px;background:var(--bg-input);border-radius:3px;overflow:hidden;">' +
          '<div style="height:100%;width:' + pct + '%;background:' + biasColor[b] + ';border-radius:3px;transition:width .4s;"></div>' +
        '</div>' +
      '</div>';
    }).join('');
  } else if (biasEl) {
    biasEl.innerHTML = '<div style="color:var(--tx-faint);font-size:12px;text-align:center;padding:20px;">Aucune donnée</div>';
  }

  // Top tickers
  var tickEl = document.getElementById('ea-ds-top-tickers');
  if (tickEl) {
    var tkCount = {};
    analyses.forEach(function(a){ tkCount[a.ticker] = (tkCount[a.ticker]||0)+1; });
    var top = Object.keys(tkCount).sort(function(a,b){ return tkCount[b]-tkCount[a]; }).slice(0,6);
    if (top.length) {
      var mx = tkCount[top[0]];
      tickEl.innerHTML = top.map(function(t,i) {
        var pct = Math.round(tkCount[t]/mx*100);
        return '<div style="display:flex;align-items:center;gap:8px;">' +
          '<div style="font-family:var(--mono);font-size:10px;color:var(--tx-faint);width:14px;">' + (i+1) + '</div>' +
          '<div style="font-family:var(--mono);font-size:12px;font-weight:700;color:var(--orange);width:60px;">' + EA.escape(t) + '</div>' +
          '<div style="flex:1;height:4px;background:var(--bg-input);border-radius:2px;overflow:hidden;">' +
            '<div style="height:100%;width:' + pct + '%;background:var(--orange);opacity:' + (0.4+0.6*pct/100) + ';border-radius:2px;"></div>' +
          '</div>' +
          '<div style="font-family:var(--mono);font-size:10px;color:var(--tx-faint);">' + tkCount[t] + '</div>' +
        '</div>';
      }).join('');
    } else {
      tickEl.innerHTML = '<div style="color:var(--tx-faint);font-size:12px;text-align:center;padding:20px;">Aucune donnée</div>';
    }
  }

  // Tags populaires
  var tagsEl = document.getElementById('ea-ds-tags');
  if (tagsEl) {
    var tagCount = {};
    analyses.forEach(function(a){ (a.tags||[]).forEach(function(t){ tagCount[t] = (tagCount[t]||0)+1; }); });
    var sortedTags = Object.keys(tagCount).sort(function(a,b){ return tagCount[b]-tagCount[a]; }).slice(0,12);
    if (sortedTags.length) {
      tagsEl.innerHTML = sortedTags.map(function(t) {
        return '<span style="padding:4px 12px;border-radius:12px;background:var(--orange-bg);color:var(--orange);border:1px solid var(--orange-bdr);font-family:var(--mono);font-size:10px;">' + EA.escape(t) + ' <span style="opacity:.6;">×' + tagCount[t] + '</span></span>';
      }).join('');
    } else {
      tagsEl.innerHTML = '<div style="color:var(--tx-faint);font-size:12px;">Aucun tag utilisé</div>';
    }
  }

  // Dernières analyses
  var recEl = document.getElementById('ea-ds-recent');
  if (recEl) {
    var recent = analyses.slice(0, 5);
    if (recent.length) {
      recEl.innerHTML = recent.map(function(a) {
        return '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--br-faint);">' +
          '<span style="font-family:var(--mono);font-size:12px;font-weight:700;color:var(--orange);min-width:50px;">' + EA.escape(a.ticker) + '</span>' +
          EA.biasBadge(a.bias) +
          '<span style="flex:1;font-size:11px;color:var(--tx-mid);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + EA.escape(a.titre) + '</span>' +
          '<span style="font-family:var(--mono);font-size:10px;color:' + EA.resultColor(a.result) + ';">' + EA.escape(a.result) + '</span>' +
        '</div>';
      }).join('');
    } else {
      recEl.innerHTML = '<div style="color:var(--tx-faint);font-size:12px;text-align:center;padding:20px;">Aucune analyse récente</div>';
    }
  }
}

/* ── Tout rafraîchir ── */
window.eaRefreshAll = function() {
  eaRenderHistory();
  eaRenderDashboard();
};

/* ── Init bias buttons (délégation) ── */
document.addEventListener('DOMContentLoaded', function() {
  // Délégation clic biais dans p-analyse
  var panel = document.getElementById('p-analyse');
  if (panel) {
    panel.addEventListener('click', function(e) {
      var btn = e.target.closest('[data-bias]');
      if (!btn) return;
      panel.querySelectorAll('[data-bias]').forEach(function(b){ b.classList.remove('bias-active'); });
      btn.classList.add('bias-active');
    });
  }

  // Fermer modal clic extérieur
  var modal = document.getElementById('ea-modal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) modal.style.display = 'none';
    });
  }

  // Init au démarrage si on est déjà sur la page analyse
  setTimeout(function() {
    if (AM && AM.nav && AM.nav.current === 'analyse') eaRefreshAll();
    // Sinon on attend la navigation
  }, 500);
});

console.log('[Mon Espace v2.0] Module chargé ✓');

})();
