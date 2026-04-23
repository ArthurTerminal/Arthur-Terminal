/* \u2550\u2550\u2550 ACCUEIL \u2014 Fear & Greed live \u2550\u2550\u2550 */
(function() {
  function dbLoadFearGreed() {
    var FNG = 'https://api.alternative.me/fng/?limit=5&format=json';
    function applyData(data) {
      var d = data.data[0];
      var val = parseInt(d.value);
      var lbl = d.value_classification;
      var col = val<=25?'var(--red)':val<=45?'var(--orange)':val<=55?'var(--yellow)':val<=75?'#44cc88':'var(--green)';
      var emojis = ['\uD83D\uDE31','\uD83D\uDE28','\uD83D\uDE10','\uD83D\uDE0A','\uD83E\uDD11'];
      var emoji = val<=25?emojis[0]:val<=45?emojis[1]:val<=55?emojis[2]:val<=75?emojis[3]:emojis[4];
      var arc = document.getElementById('db-fg-arc');
      if (arc) arc.style.strokeDashoffset = (251 - 251 * val / 100).toFixed(1);
      var gv = document.getElementById('db-fg-gauge-val');
      if (gv) { gv.textContent = val; gv.setAttribute('fill', col); }
      var gl = document.getElementById('db-fg-gauge-lbl');
      if (gl) gl.textContent = lbl.toUpperCase();
      var fv = document.getElementById('db-fg-val');
      if (fv) { fv.textContent = val + ' ' + emoji; fv.style.color = col; }
      var fl = document.getElementById('db-fg-label');
      if (fl) fl.textContent = lbl;
      var hist = data.data.slice(1, 5);
      var html = '';
      hist.forEach(function(h, i) {
        var v = parseInt(h.value);
        var c = v<=25?'var(--red)':v<=45?'var(--orange)':v<=55?'var(--yellow)':v<=75?'#44cc88':'var(--green)';
        html += '<div style="display:flex;justify-content:space-between;padding:2px 0;border-bottom:1px solid var(--br-faint);"><span style="color:var(--tx-faint);">J-'+(i+1)+'</span><span style="color:'+c+'">'+v+' \u2014 '+h.value_classification+'</span></div>';
      });
      var fh = document.getElementById('db-fg-hist');
      if (fh) fh.innerHTML = html;
    }
    function tryProxy(n) {
      var proxies = [
        FNG,
        'https://api.allorigins.win/get?url=' + encodeURIComponent(FNG),
        'https://corsproxy.io/?' + FNG
      ];
      if (n >= proxies.length) {
        var fl = document.getElementById('db-fg-label');
        if (fl) fl.textContent = 'Donn\u00e9es indisponibles';
        return;
      }
      fetch(proxies[n])
        .then(function(r) { return r.json(); })
        .then(function(j) {
          var data = j.contents ? JSON.parse(j.contents) : j;
          if (!data || !data.data) throw new Error('bad data');
          applyData(data);
        })
        .catch(function() { tryProxy(n + 1); });
    }
    tryProxy(0);
  }

  function dbLoadAccueil() {
    dbLoadFearGreed();
    if (typeof window.loadDashboardAINews === 'function') window.loadDashboardAINews();
    // Vider immédiatement les listes hardcodées puis les remplir avec le cache live
    var moverLists = document.querySelectorAll('.mover-list');
    moverLists.forEach(function(el) { el.innerHTML = ''; });
    if (AM && AM.data && AM.data._updateTopMovers) AM.data._updateTopMovers();
  }
  AM.nav.registerInit('accueil', dbLoadAccueil);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(dbLoadAccueil, 600); });
  } else {
    setTimeout(dbLoadAccueil, 600);
  }
})();
