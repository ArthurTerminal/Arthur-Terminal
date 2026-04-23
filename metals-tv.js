/* ── Precious Metals — TradingView iframe handlers ── */
window._pmCurrentTv = 'TVC:GOLD';
window._pmCurrentTf = 'D';

window.pmSwitchMetal = function(btn) {
  var sym = btn.getAttribute('data-pm-sym') || 'TVC:GOLD';
  var col = btn.getAttribute('data-pm-col') || '#ffd166';
  window._pmCurrentTv = sym;

  document.querySelectorAll('.pm-chart-btn').forEach(function(b) {
    b.style.background  = 'transparent';
    b.style.color       = '#555';
    b.style.borderColor = '#2a2a2a';
    b.style.fontWeight  = '400';
  });
  btn.style.background  = col + '22';
  btn.style.color       = col;
  btn.style.borderColor = col;
  btn.style.fontWeight  = '700';

  var f = document.getElementById('pm-tv-frame');
  if (f && window._buildTvUrl) f.src = window._buildTvUrl(sym, window._pmCurrentTf);
};

window.pmSwitchTf = function(tf, btn) {
  window._pmCurrentTf = tf;

  document.querySelectorAll('.pm-tf-btn').forEach(function(b) {
    b.style.background = 'transparent';
    b.style.color      = '#555';
    b.style.fontWeight = '400';
  });
  if (btn) {
    btn.style.background = '#ff660033';
    btn.style.color      = '#ff6600';
    btn.style.fontWeight = '700';
  }

  var f = document.getElementById('pm-tv-frame');
  if (f && window._buildTvUrl) f.src = window._buildTvUrl(window._pmCurrentTv, tf);
};
