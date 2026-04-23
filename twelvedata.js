(function () {
  'use strict';

  const TD_KEY  = AM.API_KEYS.TWELVEDATA;
  const TD_BASE = 'https://api.twelvedata.com';
  const REFRESH = 210000; // 3min30 → ~400 refreshs/jour (limite 800 req, 2 req/refresh)

  // ── Actions à suivre ───────────────────────────────────────────
  // ticker tape + accueil
  const TICKER_STOCKS = ['AAPL','MSFT','NVDA','TSLA','AMZN','GOOGL','META','GOOGL','ORCL','AMD'];
  // ETFs indices
  const TICKER_ETF    = ['SPY','QQQ','DIA'];
  const TICKER_IDX    = ['CAC40'];

  const ALL_SYMBOLS = [...TICKER_STOCKS, ...TICKER_ETF, ...TICKER_IDX];

  // Labels d'affichage
  const LABELS = {
    AAPL:'AAPL', MSFT:'MSFT', NVDA:'NVDA', TSLA:'TSLA',
    AMZN:'AMZN', GOOGL:'GOOGL', META:'META', ORCL:'ORCL', AMD:'AMD',
    SPY:'S&P500', QQQ:'NASDAQ', DIA:'DOW'
  };

  // Cache { SYM: { price, change, pct, label } }
  let _cache = {};
  let _lastFetch = 0;

  // ── Cache localStorage (TTL 4h) — économise les appels API ──────
  const _STOCKS_LS_KEY = 'am_stocks_cache_v1';
  const _STOCKS_LS_TTL = 4 * 60 * 60 * 1000; // 4 heures

  function stocksSaveLS(data) {
    try {
      localStorage.setItem(_STOCKS_LS_KEY, JSON.stringify({ ts: Date.now(), data: data }));
    } catch(e) {}
  }

  function stocksLoadLS() {
    try {
      const raw = localStorage.getItem(_STOCKS_LS_KEY);
      if (!raw) return null;
      const obj = JSON.parse(raw);
      if (!obj || !obj.data || !obj.ts) return null;
      if (Date.now() - obj.ts > _STOCKS_LS_TTL) return null; // expiré
      return obj;
    } catch(e) { return null; }
  }

  // ── Format prix ────────────────────────────────────────────────
  function fmtP(v) {
    const n = parseFloat(v);
    if (isNaN(n)) return '--';
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function fmtPct(v) {
    const n = parseFloat(v);
    if (isNaN(n)) return '';
    return (n >= 0 ? '+' : '') + n.toFixed(2) + '%';
  }

  // ── Fetch /quote batch ─────────────────────────────────────────
  // Twelve Data /quote : champs clés = close (prix), percent_change, change
  // En batch (symboles séparés par virgule) :
  //   - Si 1 seul => objet direct  { close, percent_change, ... }
  //   - Si multiple => { AAPL: { close, percent_change, ... }, MSFT: {...} }
  //   - Si erreur sur 1 symbole => { SYM: { code: 400, message: "..." } }
  async function fetchQuoteBatch(syms) {
    if (!syms.length) return;
    const url = `${TD_BASE}/quote?symbol=${syms.join(',')}&apikey=${TD_KEY}`;
    try {
      const res  = await fetch(url);
      const data = await res.json();

      function parseOne(sym, d) {
        // Ignorer les erreurs API par symbole
        if (!d || d.status === 'error' || d.code) return;
        // Le prix est dans "close" (dernier close ou prix live)
        const price  = parseFloat(d.close);
        const pct    = parseFloat(d.percent_change);
        const change = parseFloat(d.change);
        if (isNaN(price)) return;
        _cache[sym] = { price, pct, change };
      }

      if (syms.length === 1) {
        parseOne(syms[0], data);
      } else {
        for (const sym of syms) {
          parseOne(sym, data[sym]);
        }
      }
    } catch (e) {
      console.warn('[TD] fetch error', e.message);
    }
  }

  // ── Fetch tout ────────────────────────────────────────────────
  // Plan gratuit: 8 appels/min → on fait 2 batch de ~6 symboles
  async function fetchAll() {
    const half = Math.ceil(ALL_SYMBOLS.length / 2);
    await fetchQuoteBatch(ALL_SYMBOLS.slice(0, half));
    // Petite pause entre les 2 requêtes pour éviter rate limit
    await new Promise(r => setTimeout(r, 500));
    await fetchQuoteBatch(ALL_SYMBOLS.slice(half));
    // Sauvegarde dans le cache localStorage (TTL 4h) si on a eu des données
    if (Object.keys(_cache).length > 0) {
      _lastFetch = Date.now();
      stocksSaveLS(_cache);
    }
  }

  // ── Mise à jour TICKER TAPE (actions seulement) ───────────────
  function updateTicker() {
    const tape = document.getElementById('ticker-tape');
    if (!tape) return;

    const syms = ALL_SYMBOLS.filter(s => _cache[s]);
    if (!syms.length) return;

    /* ── Mise à jour IN-PLACE — sans toucher à l'animation ── */
    syms.forEach(sym => {
      const d   = _cache[sym];
      const up  = d.pct >= 0;
      const lbl = LABELS[sym] || sym;
      const priceTxt  = fmtP(d.price);
      const changeTxt = (up ? '▲' : '▼') + ' ' + fmtPct(d.pct);

      tape.querySelectorAll('.tk').forEach(tk => {
        /* Matcher sur data-tk-sym (actions sans label) OU sur le texte du .tk-s */
        const tkSym = tk.dataset.tkSym;
        const sEl   = tk.querySelector('.tk-s');
        const match = (tkSym && (tkSym === sym || tkSym === lbl))
                   || (sEl && (sEl.textContent.trim() === sym || sEl.textContent.trim() === lbl));
        if (!match) return;
        const vEl = tk.querySelector('.tk-v');
        const cEl = tk.querySelector('.tk-u, .tk-d');
        if (vEl) vEl.textContent = priceTxt;
        if (cEl) { cEl.textContent = changeTxt; cEl.className = up ? 'tk-u' : 'tk-d'; }
      });
    });
  }

  // ── Mise à jour KPI Accueil ────────────────────────────────────
  // IDs HTML existants dans ton fichier :
  //   #db-spy-price / #db-spy-chg
  //   #db-qqq-price / #db-qqq-chg
  //   #db-nvda-price / #db-nvda-chg
  //   #db-cac-price / #db-cac-chg  (pas dispo Twelve Data gratuit)
  function setKPI(priceId, chgId, sym) {
    const d = _cache[sym];
    if (!d) return;
    const elP = document.getElementById(priceId);
    const elC = document.getElementById(chgId);
    const noDollar = ['CAC40','SPY','QQQ','DIA'];
    if (elP) {
      elP.textContent = noDollar.includes(sym) ? d.price.toLocaleString('en-US',{maximumFractionDigits:2}) : fmtP(d.price);
      elP.style.color = d.pct >= 0 ? 'var(--green)' : 'var(--red)';
    }
    if (elC) {
      const arrow = d.pct >= 0 ? '▲' : '▼';
      elC.textContent = `${arrow} ${fmtPct(d.pct)}`;
      elC.className   = 'kpi-delta ' + (d.pct >= 0 ? 'up' : 'dn');
    }
  }

  function updateHomeKPIs() {
    setKPI('db-spy-price',  'db-spy-chg',  'SPY');
    setKPI('db-qqq-price',  'db-qqq-chg',  'QQQ');
    setKPI('db-nvda-price', 'db-nvda-chg', 'NVDA');
    setKPI('db-cac-price',  'db-cac-chg',  'CAC40');
    // db-btc / db-eth : crypto non incluse ici, laissée telle quelle
  }

  // ── Badge LIVE ────────────────────────────────────────────────
  function updateLiveDot() {
    const ok   = Object.keys(_cache).length > 0;
    const dot  = document.querySelector('.live-dot');
    const pill = document.querySelector('.live-pill');
    const col  = ok ? 'var(--green)' : 'var(--red)';
    if (dot)  dot.style.background  = col;
    if (pill) pill.style.color      = col;
  }

  // ── Toast ─────────────────────────────────────────────────────
  function toast() {
    const t    = new Date().toLocaleTimeString('fr-FR');
    const n    = Object.keys(_cache).length;
    console.log(`[TD v2] ✓ ${n} actions rafraîchies à ${t}`);
    if (window.AM && AM.toast) AM.toast(`📈 Cours actions mis à jour — ${t}`, 'success');
  }

  // ── Cycle principal ───────────────────────────────────────────
  async function refresh() {
    await fetchAll();
    updateTicker();
    updateHomeKPIs();
    updateLiveDot();
    toast();
  }

  // ── Init ──────────────────────────────────────────────────────
  function init() {
    console.log('[TwelveData v2] 🚀 Module Actions initialisé');

    // 1. Lire le cache localStorage d'abord (0 appel API)
    const cached = stocksLoadLS();
    if (cached) {
      _cache = cached.data;
      _lastFetch = cached.ts;
      updateTicker();
      updateHomeKPIs();
      updateLiveDot();
      const ageMin = Math.round((Date.now() - cached.ts) / 60000);
      console.log('[Stocks] Cache localStorage (' + ageMin + ' min) — aucun appel API');
    } else {
      // 2. Pas de cache valide → appel API
      console.log('[Stocks] Pas de cache — appel Twelve Data');
      refresh();
    }

    // 3. Refresh auto SEULEMENT si le cache est expiré (>4h)
    setInterval(function() {
      if (!AM._visible) return;
      if (Date.now() - _lastFetch < _STOCKS_LS_TTL) return; // cache encore valide
      refresh();
    }, REFRESH);

    // 4. Refresh au retour sur l'onglet si cache expiré
    document.addEventListener('visibilitychange', function() {
      if (!document.hidden && Date.now() - _lastFetch > _STOCKS_LS_TTL) {
        refresh();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    setTimeout(init, 1500);
  }

  // Debug global
  window.TD_LIVE = {
    refresh,
    cache: () => _cache,
    // Forcer un test sur 1 symbole
    test: async (sym = 'AAPL') => {
      const url = `${TD_BASE}/quote?symbol=${sym}&apikey=${TD_KEY}`;
      const r = await fetch(url);
      const d = await r.json();
      console.log('[TD test]', sym, d);
      return d;
    }
  };

})();
