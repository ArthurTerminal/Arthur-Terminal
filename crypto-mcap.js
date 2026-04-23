(function() {
  'use strict';

  /* ── Catégories manuelles (top coins) ── */
  var CATS = {
    bitcoin:'layer1', ethereum:'layer1', tether:'stablecoin', 'binancecoin':'exchange',
    solana:'layer1', ripple:'layer1', 'usd-coin':'stablecoin', dogecoin:'meme',
    cardano:'layer1', avalanche:'layer1', chainlink:'layer1', polkadot:'layer1',
    'matic-network':'layer2', 'wrapped-bitcoin':'layer1', shiba:'meme',
    'arbitrum':'layer2', optimism:'layer2', uniswap:'defi', aave:'defi',
    maker:'defi', compound:'defi', curve:'defi', 'pancakeswap-token':'defi',
    'fetch-ai':'ai', 'render-token':'ai', 'singularitynet':'ai', 'ocean-protocol':'ai',
    'near':'layer1', cosmos:'layer1', algorand:'layer1', stellar:'layer1',
    'internet-computer':'layer1', filecoin:'layer1', aptos:'layer1', sui:'layer1',
    'okb':'exchange', 'crypto-com-chain':'exchange', 'kucoin-shares':'exchange',
    'dai':'stablecoin', 'frax':'stablecoin', 'true-usd':'stablecoin',
    'pepe':'meme', 'floki':'meme', 'bonk':'meme'
  };

  var _allCoins = [];
  var _filtered = [];
  var _sortKey = 'rank';

  /* ── Mapping CoinGecko id → symbole Binance USDT ── */
  var BINANCE_SYM = {
    bitcoin:'BTC', ethereum:'ETH', tether:'USDT', binancecoin:'BNB',
    solana:'SOL', ripple:'XRP', 'usd-coin':'USDC', dogecoin:'DOGE',
    cardano:'ADA', avalanche:'AVAX', chainlink:'LINK', polkadot:'DOT',
    'matic-network':'MATIC', shiba:'SHIB', arbitrum:'ARB', optimism:'OP',
    uniswap:'UNI', aave:'AAVE', maker:'MKR', 'pancakeswap-token':'CAKE',
    near:'NEAR', cosmos:'ATOM', algorand:'ALGO', stellar:'XLM',
    'internet-computer':'ICP', filecoin:'FIL', aptos:'APT', sui:'SUI',
    'fetch-ai':'FET', 'render-token':'RENDER', 'singularitynet':'AGIX',
    'ocean-protocol':'OCEAN', 'okb':'OKB', 'crypto-com-chain':'CRO',
    pepe:'PEPE', floki:'FLOKI', bonk:'BONK', toncoin:'TON',
    'wrapped-bitcoin':'WBTC', litecoin:'LTC', 'bitcoin-cash':'BCH',
    monero:'XMR', 'ethereum-classic':'ETC', vechain:'VET',
    hedera:'HBAR', 'the-sandbox':'SAND', decentraland:'MANA',
    'the-graph':'GRT', 'axie-infinity':'AXS', 'immutable-x':'IMX',
    'lido-dao':'LDO', 'rocket-pool':'RPL', curve:'CRV',
    synthetix:'SNX', '1inch':'1INCH', compound:'COMP',
    injective:'INJ', sei:'SEI', celestia:'TIA', starknet:'STRK',
    'jupiter-exchange-solana':'JUP', pyth:'PYTH', wormhole:'W',
    'mantle':'MNT', 'kaspa':'KAS', 'worldcoin-wld':'WLD'
  };

  /* ── Ouvre le graphique Crypto pour une paire donnée ── */
  window.mcapOpenChart = function(coinId, symbol) {
    var sym = BINANCE_SYM[coinId] || symbol.toUpperCase();
    // Les stablecoins n'ont pas de paire utile, on skip
    var stables = ['USDT','USDC','DAI','FDUSD','TUSD','FRAX','BUSD'];
    if (stables.indexOf(sym) !== -1) return;
    var pair = 'BINANCE:' + sym + 'USDT';
    // 1. Switcher vers le module graphique
    if (AM && AM.nav) AM.nav.pickMod('crypto', 'chart');
    // 2. Une fois le DOM injecté, charger la paire
    setTimeout(function() {
      if (AM && AM.cryptoChart && AM.cryptoChart.setPair) {
        AM.cryptoChart.setPair(pair, null);
      }
    }, 120);
  };

  /* ── Escape HTML (XSS protection) ── */
  function _esc(s) { return AM && AM.util ? AM.util.escapeHtml(s) : String(s||'').replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c]; }); }

  /* ── Formatters ── */
  function fmtPrice(v) {
    if (!v && v !== 0) return '—';
    if (v >= 1000) return '$' + v.toLocaleString('fr-FR', {maximumFractionDigits: 0});
    if (v >= 1)    return '$' + v.toFixed(2);
    if (v >= 0.01) return '$' + v.toFixed(4);
    return '$' + v.toFixed(6);
  }
  function fmtBig(v) {
    if (!v && v !== 0) return '—';
    if (v >= 1e12) return (v/1e12).toFixed(2) + ' T$';
    if (v >= 1e9)  return (v/1e9).toFixed(2) + ' Md$';
    if (v >= 1e6)  return (v/1e6).toFixed(1) + ' M$';
    return v.toLocaleString('fr-FR');
  }
  function fmtSupply(v, sym) {
    if (!v) return '—';
    if (v >= 1e9) return (v/1e9).toFixed(2) + ' Md ' + sym;
    if (v >= 1e6) return (v/1e6).toFixed(2) + ' M ' + sym;
    return v.toLocaleString('fr-FR') + ' ' + sym;
  }
  function pctColor(v) {
    if (v === null || v === undefined) return 'var(--tx-faint)';
    return v >= 0 ? 'var(--green)' : 'var(--red)';
  }
  function pctStr(v) {
    if (v === null || v === undefined) return '—';
    return (v >= 0 ? '+' : '') + v.toFixed(2) + '%';
  }
  function catLabel(id) {
    var c = CATS[id] || 'other';
    var map = { layer1:'L1', layer2:'L2', defi:'DeFi', stablecoin:'Stable',
                meme:'Meme', ai:'AI', exchange:'CEX', other:'Autre' };
    var colors = { layer1:'var(--blue)', layer2:'var(--orange)', defi:'var(--green)',
                   stablecoin:'var(--tx-faint)', meme:'var(--yellow)', ai:'#b388ff',
                   exchange:'var(--orange-lt)', other:'var(--tx-faint)' };
    return '<span style="font-size:9px;padding:1px 5px;border-radius:3px;border:1px solid ' +
      (colors[c]||'var(--br-mid)') + ';color:' + (colors[c]||'var(--tx-faint)') + '">' +
      (map[c]||'—') + '</span>';
  }

  /* ── Mini sparkline SVG (7j data) ── */
  function sparkline(prices) {
    if (!prices || prices.length < 2) return '<span style="color:var(--tx-faint)">—</span>';
    var min = Math.min.apply(null, prices);
    var max = Math.max.apply(null, prices);
    var range = max - min || 1;
    var w = 60, h = 20;
    var pts = prices.map(function(p, i) {
      var x = (i / (prices.length - 1)) * w;
      var y = h - ((p - min) / range) * h;
      return x.toFixed(1) + ',' + y.toFixed(1);
    }).join(' ');
    var color = prices[prices.length-1] >= prices[0] ? '#00e896' : '#ff4d4d';
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">' +
      '<polyline points="' + pts + '" fill="none" stroke="' + color + '" stroke-width="1.5" stroke-linejoin="round"/>' +
      '</svg>';
  }

  /* ── Render tableau ── */
  function renderTable(coins) {
    var tbody = document.getElementById('mcap-tbody');
    if (!tbody) return;
    if (!coins || coins.length === 0) {
      tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;padding:40px;color:var(--tx-faint);">Aucun résultat.</td></tr>';
      return;
    }
    var html = '';
    coins.forEach(function(c, idx) {
      var chg24 = c.price_change_percentage_24h;
      var chg7  = c.price_change_percentage_7d_in_currency;
      var stripe = idx % 2 === 1 ? 'background:var(--bg-stripe);' : '';
      var isStable = ['tether','usd-coin','dai','true-usd','frax','binance-usd'].indexOf(c.id) !== -1;
      var safeName = _esc(c.name);
      var safeSym  = _esc((c.symbol||'').toUpperCase());
      var safeId   = _esc(c.id);
      var safeImg  = _esc(c.image);
      var rowTitle = isStable ? '' : ' title="📈 Ouvrir le graphique ' + safeSym + '/USDT"';
      var rowClick = isStable ? '' : ' onclick="window.mcapOpenChart(\'' + safeId + '\',\'' + _esc(c.symbol) + '\')"';
      html += '<tr' + rowTitle + rowClick + ' style="border-bottom:1px solid var(--br-faint);cursor:' + (isStable?'default':'pointer') + ';' + stripe + '" ' +
        'onmouseenter="this.style.background=\'var(--bg-hover)\'" ' +
        'onmouseleave="this.style.background=\'' + (idx%2===1?'var(--bg-stripe)':'transparent') + '\'">' +
        '<td style="padding:7px 6px;color:var(--tx-faint);font-weight:700;">' + c.market_cap_rank + '</td>' +
        '<td style="padding:7px 6px;">' +
          '<div style="display:flex;align-items:center;gap:7px;">' +
            '<img src="' + safeImg + '" width="20" height="20" style="border-radius:50%;flex-shrink:0;" loading="lazy" onerror="this.style.display=\'none\'">' +
            '<div>' +
              '<div style="font-weight:700;color:var(--tx-hi);font-size:11px;">' + safeName + (isStable ? '' : ' <span style="font-size:9px;color:var(--tx-faint);opacity:0.6;">📈</span>') + '</div>' +
              '<div style="color:var(--tx-faint);font-size:9px;letter-spacing:1px;">' + safeSym + '</div>' +
            '</div>' +
          '</div>' +
        '</td>' +
        '<td style="padding:7px 8px;text-align:right;font-weight:600;color:var(--tx-hi);">' + fmtPrice(c.current_price) + '</td>' +
        '<td style="padding:7px 8px;text-align:right;font-weight:600;color:' + pctColor(chg24) + ';">' + pctStr(chg24) + '</td>' +
        '<td style="padding:7px 8px;text-align:right;font-weight:600;color:' + pctColor(chg7) + ';">' + pctStr(chg7) + '</td>' +
        '<td style="padding:7px 8px;text-align:right;color:var(--tx-mid);">' + fmtBig(c.market_cap) + '</td>' +
        '<td style="padding:7px 8px;text-align:right;color:var(--tx-faint);">' + fmtBig(c.total_volume) + '</td>' +
        '<td style="padding:7px 8px;text-align:right;color:var(--tx-faint);">' + fmtSupply(c.circulating_supply, (c.symbol||'').toUpperCase()) + '</td>' +
        '<td style="padding:7px 8px;text-align:center;">' + catLabel(c.id) + '</td>' +
        '<td style="padding:7px 8px;text-align:center;">' + sparkline(c.sparkline_in_7d && c.sparkline_in_7d.price) + '</td>' +
      '</tr>';
    });
    tbody.innerHTML = html;
    var el = document.getElementById('mcap-count');
    if (el) el.textContent = coins.length;
  }

  /* ── Mise à jour KPI strip ── */
  function renderKPIs(coins) {
    var totalMcap = 0, totalVol = 0, ups = 0, downs = 0, btcMcap = 0, totalAll = 0;
    coins.forEach(function(c) {
      totalMcap += c.market_cap || 0;
      totalVol  += c.total_volume || 0;
      if (c.id === 'bitcoin') btcMcap = c.market_cap || 0;
      if ((c.price_change_percentage_24h||0) >= 0) ups++; else downs++;
    });
    // rough total (top 100 ≈ 90% of market)
    totalAll = totalMcap;

    var el;
    el = document.getElementById('mcap-kpi-total');
    if (el) el.textContent = fmtBig(totalMcap);
    el = document.getElementById('mcap-kpi-vol');
    if (el) el.textContent = fmtBig(totalVol);
    el = document.getElementById('mcap-kpi-btcdom');
    if (el) el.textContent = btcMcap && totalAll ? (btcMcap/totalAll*100).toFixed(1)+'%' : '—';
    el = document.getElementById('mcap-kpi-btcdom-sub');
    if (el) el.textContent = 'Part BTC dans Top 100';
    el = document.getElementById('mcap-kpi-updown');
    if (el) {
      el.innerHTML = '<span style="color:var(--green)">▲' + ups + '</span> / <span style="color:var(--red)">▼' + downs + '</span>';
    }
    el = document.getElementById('mcap-total-label');
    if (el) el.textContent = 'Market Cap Top 100: ' + fmtBig(totalMcap);
  }

  /* ── Filtre ── */
  window.mcapFilter = function() {
    var q = (document.getElementById('mcap-search')||{value:''}).value.trim().toLowerCase();
    var cat = (document.getElementById('mcap-cat-filter')||{value:'all'}).value;
    _filtered = _allCoins.filter(function(c) {
      var matchQ = !q || c.name.toLowerCase().includes(q) || (c.symbol||'').toLowerCase().includes(q);
      var matchCat = cat === 'all' || (CATS[c.id] || 'other') === cat;
      return matchQ && matchCat;
    });
    _applySort();
    renderTable(_filtered);
  };

  /* ── Tri ── */
  function _applySort() {
    var k = _sortKey;
    _filtered.sort(function(a, b) {
      if (k === 'rank')        return (a.market_cap_rank||999) - (b.market_cap_rank||999);
      if (k === 'price_desc')  return (b.current_price||0) - (a.current_price||0);
      if (k === 'change_desc') return (b.price_change_percentage_24h||0) - (a.price_change_percentage_24h||0);
      if (k === 'change_asc')  return (a.price_change_percentage_24h||0) - (b.price_change_percentage_24h||0);
      if (k === 'volume_desc') return (b.total_volume||0) - (a.total_volume||0);
      return 0;
    });
  }
  window.mcapSort = function() {
    _sortKey = (document.getElementById('mcap-sort')||{value:'rank'}).value;
    _filtered = _allCoins.slice();
    window.mcapFilter();
  };

  /* ── Export CSV ── */
  window.mcapExportCSV = function() {
    var rows = [['Rang','Nom','Symbole','Prix (USD)','Var 24h %','Var 7j %','Market Cap','Volume 24h','Circ. Supply','Categorie']];
    _filtered.forEach(function(c) {
      rows.push([
        c.market_cap_rank,
        c.name,
        (c.symbol||'').toUpperCase(),
        c.current_price,
        (c.price_change_percentage_24h||0).toFixed(2),
        (c.price_change_percentage_7d_in_currency||0).toFixed(2),
        c.market_cap,
        c.total_volume,
        c.circulating_supply,
        CATS[c.id] || 'other'
      ]);
    });
    var csv = rows.map(function(r){ return r.join(','); }).join('\n');
    var blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'crypto_top100_' + new Date().toISOString().slice(0,10) + '.csv';
    a.click();
  };

  /* ── Chargement principal ── */
  window.mcapLoad = function() {
    var tbody = document.getElementById('mcap-tbody');
    if (!tbody) return;
    tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;padding:40px;color:var(--tx-faint);">⏳ Chargement des données CoinGecko…</td></tr>';

    // CoinGecko public API – top 100 avec sparkline 7j
    var url = 'https://api.coingecko.com/api/v3/coins/markets' +
      '?vs_currency=usd&order=market_cap_desc&per_page=100&page=1' +
      '&sparkline=true&price_change_percentage=24h,7d';

    fetch(url)
      .then(function(r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function(data) {
        _allCoins = data;
        _filtered = data.slice();
        _sortKey  = 'rank';
        renderKPIs(data);
        _applySort();
        renderTable(_filtered);
        // reset filtres
        var s = document.getElementById('mcap-search');      if (s) s.value = '';
        var c = document.getElementById('mcap-cat-filter');  if (c) c.value = 'all';
        var o = document.getElementById('mcap-sort');        if (o) o.value = 'rank';
        // timestamp
        var ts = document.getElementById('mcap-updated');
        if (ts) {
          var now = new Date();
          ts.textContent = 'Màj ' + now.toLocaleTimeString('fr-FR', {hour:'2-digit',minute:'2-digit'});
        }
      })
      .catch(function(err) {
        if (tbody) tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;padding:40px;color:var(--red);">⚠️ Erreur: ' + err.message + '<br><span style="font-size:10px;color:var(--tx-faint);">CoinGecko peut être temporairement limité. Réessayez dans quelques secondes.</span></td></tr>';
      });
  };

  console.log('[MCAP Module] Classement capitalisation chargé ✓');
})();
