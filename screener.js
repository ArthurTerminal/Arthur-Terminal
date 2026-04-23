(function() {
'use strict';
var VAL_BENCH = {
  tech:      { pe:[20,35], pb:[3,8],   peg:[0.8,2],  marge:[15,30], roe:[15,35], label:'Technologie' },
  finance:   { pe:[8,15],  pb:[0.8,1.8],peg:[0.6,1.5],marge:[15,25], roe:[10,18], label:'Finance' },
  energie:   { pe:[8,18],  pb:[0.8,2], peg:[0.5,1.5],marge:[5,15],  roe:[8,15],  label:'Énergie' },
  sante:     { pe:[15,30], pb:[2,5],   peg:[0.8,2],  marge:[10,25], roe:[12,22], label:'Santé' },
  conso:     { pe:[15,25], pb:[2,6],   peg:[1,2.5],  marge:[5,15],  roe:[12,25], label:'Consommation' },
  industrie: { pe:[12,22], pb:[1.5,4], peg:[0.8,2],  marge:[5,12],  roe:[10,18], label:'Industrie' },
  immo:      { pe:[15,30], pb:[1,2.5], peg:[1,3],    marge:[20,40], roe:[5,12],  label:'Immobilier' },
};
var VAL_COMP = {
  tech: [
    {n:'Apple',     t:'AAPL', pe:28.4,peg:1.9, pb:45.2,rg:8,  mn:25.3,roe:147,score:82},
    {n:'Microsoft', t:'MSFT', pe:32.1,peg:1.8, pb:12.4,rg:15, mn:36.4,roe:38, score:88},
    {n:'Alphabet',  t:'GOOG', pe:21.8,peg:1.2, pb:6.8, rg:14, mn:28.6,roe:27, score:85},
    {n:'Meta',      t:'META', pe:23.6,peg:0.9, pb:7.9, rg:22, mn:34.1,roe:35, score:84},
    {n:'AMD',       t:'AMD',  pe:28.4,peg:0.9, pb:3.8, rg:24, mn:11.8,roe:18, score:68},
    {n:'Intel',     t:'INTC', pe:null,peg:null,pb:0.9, rg:-8, mn:-7.2,roe:null,score:24},
  ],
  finance: [
    {n:'JPMorgan',   t:'JPM',   pe:12.4,peg:1.1,pb:1.9,rg:12,mn:26.4,roe:17,score:78},
    {n:'Goldman',    t:'GS',    pe:14.2,peg:1.3,pb:1.5,rg:8, mn:22.1,roe:11,score:72},
    {n:'BNP Paribas',t:'BNP.PA',pe:7.8, peg:0.8,pb:0.7,rg:5, mn:18.4,roe:10,score:65},
    {n:'Soc. Gen.',  t:'GLE.PA',pe:6.2, peg:0.7,pb:0.5,rg:3, mn:14.2,roe:8, score:55},
  ],
  energie: [
    {n:'TotalEnergies',t:'TTE.PA',pe:10.2,peg:0.9,pb:1.4,rg:5, mn:8.2, roe:13,score:68},
    {n:'ExxonMobil',  t:'XOM',   pe:13.8,peg:1.2,pb:1.9,rg:2, mn:10.4,roe:15,score:70},
    {n:'Chevron',     t:'CVX',   pe:14.1,peg:1.3,pb:1.8,rg:-3,mn:9.8, roe:14,score:67},
    {n:'Shell',       t:'SHEL',  pe:9.8, peg:0.9,pb:1.2,rg:1, mn:7.2, roe:12,score:64},
  ],
  sante: [
    {n:'Johnson&J',t:'JNJ',   pe:15.8,peg:1.4,pb:5.2,rg:6,  mn:18.4,roe:26,score:78},
    {n:'Novartis', t:'NVS',   pe:14.2,peg:1.3,pb:3.8,rg:10, mn:21.6,roe:22,score:75},
    {n:'Sanofi',   t:'SAN.PA',pe:13.4,peg:1.2,pb:2.1,rg:8,  mn:17.2,roe:16,score:70},
    {n:'Pfizer',   t:'PFE',   pe:11.8,peg:1.5,pb:1.8,rg:-42,mn:12.4,roe:10,score:52},
  ],
  conso: [
    {n:'LVMH',   t:'MC.PA', pe:22.4,peg:1.8,pb:4.2, rg:9, mn:18.6,roe:20,score:80},
    {n:'Nestle',  t:'NESN',  pe:20.1,peg:2.1,pb:5.8, rg:2, mn:14.8,roe:28,score:74},
    {n:"L'Oreal", t:'OR.PA', pe:30.2,peg:2.4,pb:8.4, rg:8, mn:17.2,roe:27,score:76},
    {n:'Hermes',  t:'RMS.PA',pe:50.4,peg:3.2,pb:22.4,rg:15,mn:36.2,roe:44,score:88},
  ],
  industrie: [
    {n:'Airbus',     t:'AIR.PA',pe:18.4,peg:1.6,pb:7.2,rg:14,mn:5.8, roe:42,score:72},
    {n:'Siemens',    t:'SIE.DE',pe:15.2,peg:1.4,pb:2.8,rg:5, mn:9.4, roe:18,score:68},
    {n:'Schneider',  t:'SU.PA', pe:22.1,peg:1.8,pb:3.4,rg:12,mn:14.2,roe:16,score:74},
    {n:'Caterpillar',t:'CAT',   pe:14.8,peg:1.3,pb:7.1,rg:5, mn:14.6,roe:52,score:72},
  ],
  immo: [
    {n:'Unibail', t:'URW.PA',pe:18.2,peg:2.1,pb:0.6,rg:4,mn:28.4,roe:5,score:52},
    {n:'Vonovia', t:'VNA.DE',pe:22.4,peg:2.4,pb:0.8,rg:3,mn:22.1,roe:4,score:48},
    {n:'Prologis',t:'PLD',   pe:28.4,peg:2.8,pb:2.2,rg:8,mn:38.4,roe:9,score:65},
  ],
};
var VS = {ticker:'NVDA',secteur:'tech',price:875,fcf:44200,g1:0.35,g2:0.18,gterm:0.035,wacc:0.102,shares:24400,cash:18100,eps:24.7,bv:7.3,roe:123,revg:122,marge:55.6,de:0.42,dcf_base:0,dcf_bear:0,dcf_bull:0,graham_val:0,pond_val:0,pe:0,pb:0,peg:0,score:0};
function vFmt(n,d){if(n===null||n===undefined||isNaN(n))return 'N/A';d=d||0;if(Math.abs(n)>=1e6)return (n/1e6).toFixed(1)+'M';if(Math.abs(n)>=1000)return n.toLocaleString('fr-FR',{maximumFractionDigits:d});return n.toFixed(d);}
function vPct(n){return(n>=0?'+':'')+n.toFixed(1)+'%';}
function vCol(v){return v>10?'var(--green)':v>0?'var(--yellow)':'var(--red)';}
function vStars(v,good,ok){return v>=good?'★★★★★':v>=ok?'★★★★☆':v>=ok/2?'★★★☆☆':v>0?'★★☆☆☆':'★☆☆☆☆';}
function vEl(id){return document.getElementById(id);}
function vSet(id,txt,col){var e=vEl(id);if(e){e.textContent=txt;if(col)e.style.color=col;}}
/* ═══════════════════════════════════════════════════════════
   FMP LIVE DATA ENGINE v2 — Financial Modeling Prep
   ═══════════════════════════════════════════════════════════ */
(function(){
  var FMP_KEY = 'LJYWsG05pCvdTuFkpkYvEIcAlyjf5IJM';
  var BASE    = 'https://financialmodelingprep.com/api/v3';

  /* ── Statut visuel ── */
  function fmpStatus(msg, type){
    var el = vEl('val-fmp-status');
    if(!el) return;
    var map = {
      loading:{ bg:'var(--blue-bg)',   border:'var(--blue-bdr)',   color:'var(--blue)'  },
      ok:     { bg:'var(--green-bg)',  border:'var(--green-bdr)',  color:'var(--green)' },
      error:  { bg:'var(--red-bg)',    border:'var(--red-bdr)',    color:'var(--red)'   },
      warn:   { bg:'var(--yellow-bg)', border:'var(--yellow-bdr)', color:'var(--yellow)'}
    };
    var c = map[type] || map.loading;
    el.style.cssText = 'display:inline-flex;align-items:center;padding:5px 10px;border-radius:5px;'
      +'font-family:var(--mono);font-size:10px;font-weight:700;border:1px solid;white-space:nowrap;'
      +'background:'+c.bg+';border-color:'+c.border+';color:'+c.color;
    el.textContent = msg;
  }

  /* ── Injection dans les champs number ── */
  function setSlider(id, labelId, value, unit, thousands){
    if(value === null || value === undefined || isNaN(value)) return;
    var inp = vEl(id);
    if(!inp) return;
    // Arrondi propre selon l'unité
    var v = (unit === '$' && value > 10) ? parseFloat(value.toFixed(2))
          : (unit === 'x' || unit === '%') ? parseFloat(value.toFixed(2))
          : Math.round(value);
    inp.value = v;
    // labelId ignoré (plus de sliders avec labels séparés)
  }

  /* ── Appel FMP via proxy CORS (fonctionne depuis file://) ── */
  async function fmpGet(path){
    var url = BASE + path + (path.includes('?') ? '&' : '?') + 'apikey=' + FMP_KEY;
    // On essaie d'abord direct (si hébergé en ligne), sinon proxy allorigins
    var data = null;
    try {
      var r = await fetch(url);
      if(r.ok){
        data = await r.json();
        if(data && !data['Error Message']) return data;
      }
    } catch(e){ /* CORS bloqué depuis file://, on passe au proxy */ }
    // Proxy allorigins — contourne le CORS depuis file://
    var proxy = 'https://api.allorigins.win/get?url=' + encodeURIComponent(url);
    var r2 = await fetch(proxy);
    if(!r2.ok) throw new Error('Proxy HTTP ' + r2.status);
    var wrap = await r2.json();
    data = JSON.parse(wrap.contents || 'null');
    if(!data) throw new Error('Réponse vide pour ' + path);
    if(data['Error Message']) throw new Error(data['Error Message']);
    return data;
  }

  /* ── Fonction principale ── */
  window.VAL_loadFMP = async function(){
    var ticker = ((vEl('val-ticker')||{}).value||'').trim().toUpperCase();
    if(!ticker){ fmpStatus('⚠️ Entrez un ticker', 'warn'); return; }

    var btn = vEl('val-fmp-btn');
    if(btn){ btn.disabled = true; btn.textContent = '⏳ Chargement…'; }
    fmpStatus('📡 Connexion…', 'loading');

    try {
      // ── Appels parallèles pour aller plus vite ──
      fmpStatus('📡 Récupération données ' + ticker + '…', 'loading');
      var results = await Promise.all([
        fmpGet('/quote/'                    + ticker),
        fmpGet('/key-metrics/'              + ticker + '?limit=1&period=annual'),
        fmpGet('/income-statement/'         + ticker + '?limit=2&period=annual'),
        fmpGet('/cash-flow-statement/'      + ticker + '?limit=1&period=annual'),
        fmpGet('/balance-sheet-statement/'  + ticker + '?limit=1&period=annual'),
        fmpGet('/profile/'                  + ticker)
      ]);

      var quoteArr  = Array.isArray(results[0]) ? results[0] : [results[0]];
      var metrArr   = Array.isArray(results[1]) ? results[1] : [results[1]];
      var incArr    = Array.isArray(results[2]) ? results[2] : [results[2]];
      var cfArr     = Array.isArray(results[3]) ? results[3] : [results[3]];
      var bsArr     = Array.isArray(results[4]) ? results[4] : [results[4]];
      var profArr   = Array.isArray(results[5]) ? results[5] : [results[5]];

      var q   = quoteArr[0]  || {};
      var m   = metrArr[0]   || {};
      var inc = incArr[0]    || {};
      var incP= incArr[1]    || null;
      var cf  = cfArr[0]     || {};
      var bs  = bsArr[0]     || {};
      var pro = profArr[0]   || {};

      console.log('[FMP] quote:', q);
      console.log('[FMP] metrics:', m);
      console.log('[FMP] income:', inc);
      console.log('[FMP] cashflow:', cf);
      console.log('[FMP] balance:', bs);
      console.log('[FMP] profile:', pro);

      if(!q.price) throw new Error('Ticker "' + ticker + '" non trouvé sur FMP');

      // ══ Extraction des valeurs ══

      var price    = parseFloat(q.price)           || 0;
      var shares   = parseFloat(q.sharesOutstanding|| pro.sharesOutstanding || 0) / 1e6;  // millions

      // FCF (M$) — depuis cash flow statement
      var fcfM = 0;
      if(cf.freeCashFlow)              fcfM = cf.freeCashFlow / 1e6;
      else if(m.freeCashFlowPerShare)  fcfM = m.freeCashFlowPerShare * shares;

      // EPS
      var eps = parseFloat(inc.eps || q.eps || m.netIncomePerShare || 0);

      // Book Value / share
      var bv = parseFloat(m.bookValuePerShare || 0);
      if(!bv && bs.totalStockholdersEquity && shares > 0)
        bv = (bs.totalStockholdersEquity / 1e6) / shares;

      // ROE (%)
      var roe = (parseFloat(m.roe || pro.returnOnEquityTTM || 0)) * 100;

      // Marge nette (%)
      var marge = 0;
      if(inc.netIncome && inc.revenue) marge = inc.netIncome / inc.revenue * 100;
      else if(m.netProfitMargin)       marge = m.netProfitMargin * 100;
      else if(pro.profitMargin)        marge = pro.profitMargin * 100;

      // D/E
      var de = parseFloat(m.debtToEquity || 0);
      if(!de && bs.totalDebt && bs.totalStockholdersEquity)
        de = bs.totalDebt / bs.totalStockholdersEquity;
      de = Math.max(0, de);

      // Trésorerie nette (M$)
      var cashNet = 0;
      if(bs.cashAndCashEquivalents !== undefined && bs.totalDebt !== undefined)
        cashNet = (bs.cashAndCashEquivalents - bs.totalDebt) / 1e6;

      // Croissance revenus YoY (%)
      var revg = 0;
      if(incP && incP.revenue && inc.revenue && incP.revenue !== 0)
        revg = (inc.revenue - incP.revenue) / Math.abs(incP.revenue) * 100;
      else if(m.revenueGrowth) revg = m.revenueGrowth * 100;

      console.log('[FMP] Valeurs extraites →', {price,shares,fcfM,eps,bv,roe,marge,de,cashNet,revg});

      // ══ Secteur auto-detect depuis /profile ══
      var secteurMap = {
        'Technology':'tech','Software - Application':'tech','Software - Infrastructure':'tech',
        'Semiconductors':'tech','Consumer Electronics':'tech',
        'Financial Services':'finance','Banks - Diversified':'finance','Insurance':'finance',
        'Asset Management':'finance','Capital Markets':'finance',
        'Oil & Gas E&P':'energie','Oil & Gas Integrated':'energie','Utilities - Regulated Electric':'energie',
        'Solar':'energie','Renewable Utilities':'energie',
        'Drug Manufacturers':'sante','Biotechnology':'sante','Medical Devices':'sante',
        'Health Care Plans':'sante','Medical Distribution':'sante',
        'Internet Retail':'conso','Specialty Retail':'conso','Grocery Stores':'conso',
        'Restaurants':'conso','Beverages - Non-Alcoholic':'conso',
        'Aerospace & Defense':'industrie','Farm & Heavy Construction Machinery':'industrie',
        'Railroads':'industrie','Airlines':'industrie',
        'Real Estate Investment Trusts':'immo','Real Estate Services':'immo'
      };
      var sect = secteurMap[pro.industry] || secteurMap[pro.sector];
      if(sect){
        var sel = vEl('val-secteur');
        if(sel) sel.value = sect;
      }

      // ══ Injection dans les sliders ══
      if(price > 0)    setSlider('vp-price', 'vl-price', price,              '$',  false);
      if(fcfM > 0)     setSlider('vp-fcf',   'vl-fcf',   Math.round(fcfM),   'M$', true);
      if(shares > 0)   setSlider('vp-shares','vl-shares',Math.round(shares), 'M',  true);
                       setSlider('vp-cash',  'vl-cash',  Math.round(cashNet),'M$', true);
      if(eps > 0)      setSlider('vp-eps',   'vl-eps',   eps,                '$',  false);
      if(bv > 0)       setSlider('vp-bv',    'vl-bv',    bv,                 '$',  false);
      if(roe > 0)      setSlider('vp-roe',   'vl-roe',   roe,                '%',  false);
                       setSlider('vp-revg',  'vl-revg',  revg,               '%',  false);
      if(marge !== 0)  setSlider('vp-marge', 'vl-marge', marge,              '%',  false);
                       setSlider('vp-de',    'vl-de',    de,                 'x',  false);

      // ══ Bandeau ══
      var banner = vEl('val-data-banner');
      if(banner){
        banner.style.display = 'flex';
        vSet('val-banner-ticker', (pro.companyName || q.name || ticker) + ' (' + ticker + ')');
        var chg = q.changesPercentage;
        vSet('val-banner-price',
          '$' + price.toFixed(2) +
          (chg != null ? ' (' + (chg >= 0 ? '+' : '') + parseFloat(chg).toFixed(2) + '%)' : ''));
        var mc = q.marketCap || pro.mktCap;
        vSet('val-banner-mktcap', mc
          ? 'MktCap: ' + (mc >= 1e12 ? (mc/1e12).toFixed(2)+'T$' : (mc/1e9).toFixed(1)+'B$')
          : '');
        vSet('val-banner-updated', '🕐 ' + new Date().toLocaleTimeString('fr-FR'));
      }

      fmpStatus('✅ ' + ticker + ' chargé', 'ok');

      // Badge "FMP Live" dans la section données fondamentales
      var srcBadge = vEl('val-src-badge');
      if(srcBadge) srcBadge.style.display = 'inline-flex';

      // Lance l'analyse automatiquement
      if(window.VAL_run) VAL_run();

    } catch(err){
      console.error('[FMP] Erreur:', err);
      fmpStatus('❌ ' + (err.message || 'Erreur'), 'error');
    } finally {
      if(btn){ btn.disabled = false; btn.textContent = '📡 Données Live'; }
    }
  };

  // Enter dans le champ ticker → charge
  document.addEventListener('DOMContentLoaded', function(){
    var inp = vEl('val-ticker');
    if(inp) inp.addEventListener('keydown', function(e){
      if(e.key === 'Enter') window.VAL_loadFMP();
    });
  });

  console.log('[FMP Engine v2] Prêt ✓');
})();

window.VAL_tab=function(el,id){var mod=vEl('val-module');if(!mod)return;mod.querySelectorAll('.tab').forEach(function(t){t.classList.remove('on');});mod.querySelectorAll('.tabpanel').forEach(function(p){p.classList.remove('on');});el.classList.add('on');var panel=vEl(id);if(panel)panel.classList.add('on');};
window.VAL_upd=function(rid,lid,unit,thousands){var v=parseFloat(vEl(rid).value);var disp=thousands?vFmt(v,0):v.toFixed(v%1===0?0:1);vSet(lid,disp+unit);};
function calcDCF(fcf,g1,g2,gt,wacc,shares,cash){var pv=0,ft=fcf;for(var y=1;y<=5;y++){ft*=(1+g1);pv+=ft/Math.pow(1+wacc,y);}var pv1=pv;for(var y2=6;y2<=10;y2++){ft*=(1+g2);pv+=ft/Math.pow(1+wacc,y2);}var pv2=pv-pv1;var tv=ft*(1+gt)/(wacc-gt);var pvtv=tv/Math.pow(1+wacc,10);var total=pv+pvtv+cash;return{pv1:pv1,pv2:pv2,pvtv:pvtv,total:total,per_share:total/shares};}
window.VAL_run=function(){
  VS.ticker=(vEl('val-ticker')||{value:'NVDA'}).value.trim().toUpperCase()||'NVDA';
  VS.secteur=(vEl('val-secteur')||{value:'tech'}).value;
  VS.fcf=parseFloat(vEl('vp-fcf').value);VS.g1=parseFloat(vEl('vp-g1').value)/100;VS.g2=parseFloat(vEl('vp-g2').value)/100;VS.gterm=parseFloat(vEl('vp-gterm').value)/100;VS.wacc=parseFloat(vEl('vp-wacc').value)/100;VS.shares=parseFloat(vEl('vp-shares').value);VS.cash=parseFloat(vEl('vp-cash').value);VS.eps=parseFloat(vEl('vp-eps').value);VS.bv=parseFloat(vEl('vp-bv').value);VS.price=parseFloat(vEl('vp-price').value);VS.roe=parseFloat(vEl('vp-roe').value);VS.revg=parseFloat(vEl('vp-revg').value);VS.marge=parseFloat(vEl('vp-marge').value);VS.de=parseFloat(vEl('vp-de').value);
  var b=VAL_BENCH[VS.secteur]||VAL_BENCH.tech;
  var dBase=calcDCF(VS.fcf,VS.g1,VS.g2,VS.gterm,VS.wacc,VS.shares,VS.cash);
  var dBear=calcDCF(VS.fcf,VS.g1*.55,VS.g2*.6,VS.gterm*.7,VS.wacc+.02,VS.shares,VS.cash);
  var dBull=calcDCF(VS.fcf,VS.g1*1.4,VS.g2*1.35,VS.gterm*1.2,Math.max(VS.wacc-.01,.06),VS.shares,VS.cash);
  VS.dcf_base=dBase.per_share;VS.dcf_bear=dBear.per_share;VS.dcf_bull=dBull.per_share;
  VS.graham_val=(VS.eps>0&&VS.bv>0)?Math.sqrt(22.5*VS.eps*VS.bv):0;
  VS.pe=VS.eps>0?VS.price/VS.eps:null;VS.pb=VS.bv>0?VS.price/VS.bv:null;VS.peg=(VS.pe&&VS.revg>0)?VS.pe/VS.revg:null;
  var peM=(b.pe[0]+b.pe[1])/2,vPeM=VS.eps>0?peM*VS.eps:VS.dcf_base;
  VS.pond_val=VS.dcf_base*.40+vPeM*.35+(VS.graham_val||VS.dcf_base*.6)*.25;
  var sr=Math.min(VS.roe/40*20,20),sm=Math.min(VS.marge/30*20,20),sg=Math.min(Math.max((VS.revg+10)/80*20,0),20),sd=Math.min(Math.max((3-VS.de)/3*20,0),20),pot=((VS.dcf_base-VS.price)/VS.price)*100,sv=Math.min(Math.max((pot+30)/60*20,0),20);
  VS.score=Math.round(sr+sm+sg+sd+sv);
  var gauge=Math.max(0,Math.min(100,50+pot*1.5));
  var reco,rc,rb,rbdr;
  if(pot>20&&VS.score>=65){reco='ACHAT FORT 🚀';rc='var(--green)';rb='var(--green-bg)';rbdr='var(--green-bdr)';}
  else if(pot>5||(pot>-5&&VS.score>=70)){reco='ACHAT 📈';rc='var(--green)';rb='var(--green-bg)';rbdr='var(--green-bdr)';}
  else if(pot>-15){reco='NEUTRE ⚖️';rc='var(--yellow)';rb='var(--yellow-bg)';rbdr='var(--yellow-bdr)';}
  else if(pot>-30){reco='VENTE 📉';rc='var(--red)';rb='var(--red-bg)';rbdr='var(--red-bdr)';}
  else{reco='VENTE FORTE 🔻';rc='var(--red)';rb='var(--red-bg)';rbdr='var(--red-bdr)';}
  vSet('val-kpi-prix','$'+vFmt(VS.price,2));vSet('val-kpi-ticker-lbl',VS.ticker);
  vSet('val-kpi-dcf','$'+vFmt(VS.dcf_base,0),vCol(pot));vSet('val-kpi-dcf-pot','Potentiel '+(pot>=0?'+':'')+pot.toFixed(1)+'%');
  if(VS.graham_val>0){var gpot=(VS.graham_val-VS.price)/VS.price*100;vSet('val-kpi-graham','$'+vFmt(VS.graham_val,0),vCol(gpot));vSet('val-kpi-graham-pot','Graham: '+(gpot>=0?'+':'')+gpot.toFixed(1)+'%');}
  else{vSet('val-kpi-graham','N/A','var(--tx-faint)');vSet('val-kpi-graham-pot','EPS ou BV manquant');}
  var ppot=(VS.pond_val-VS.price)/VS.price*100;vSet('val-kpi-pond','$'+vFmt(VS.pond_val,0),vCol(ppot));vSet('val-kpi-pond-pot','Pondéré: '+(ppot>=0?'+':'')+ppot.toFixed(1)+'%');
  var badge=vEl('val-reco-badge');if(badge){badge.style.borderColor=rbdr;badge.style.background=rb;}
  vSet('val-reco-val',reco,rc);
  VAL_renderScenarios(dBear,dBase,dBull);VAL_renderWaterfall(dBase);
  var gbar=vEl('val-gauge-bar');if(gbar){gbar.style.width=gauge+'%';gbar.style.background=gauge>60?'var(--green)':gauge>40?'var(--yellow)':'var(--red)';}
  vSet('val-gauge-num',Math.round(gauge),gauge>60?'var(--green)':gauge>40?'var(--yellow)':'var(--red)');
  var glbls=['Fortement surévalué','Surévalué','Légèrement surévalué','Juste Prix','Légèrement sous-évalué','Sous-évalué','Fortement sous-évalué'];
  vSet('val-gauge-lbl',glbls[Math.min(6,Math.floor(gauge/15))]);
  VAL_renderMultiples(b);VAL_renderScore(sr,sm,sg,sd,sv,b);VAL_renderComps(b);
  if(typeof AM!=='undefined'&&AM&&AM.toast)AM.toast('Valorisation '+VS.ticker+' calculée ✓','success');
};
function VAL_renderScenarios(bear,base,bull){
  var mx=bull.per_share;
  function row(cls,col,lbl,d,note){var pot=((d.per_share-VS.price)/VS.price*100).toFixed(1);var w=Math.max(0,Math.min(100,d.per_share/mx*100));return '<div class="scen-row '+cls+'"><span class="scen-name" style="color:'+col+'">'+lbl+'</span><div class="scen-bar-bg"><div class="scen-bar" style="width:'+w+'%;background:'+col+'"></div></div><span class="scen-val" style="color:'+col+'">$'+Math.round(d.per_share)+'</span><span class="scen-pot" style="color:'+vCol(parseFloat(pot))+'">'+vPct(parseFloat(pot))+'</span><span style="font-size:9px;color:var(--tx-faint);font-family:var(--mono);">'+note+'</span></div>';}
  var el=vEl('val-scenarios');if(el)el.innerHTML=row('bear','var(--red)','🔴 Bear',bear,'g1×0.55, WACC+2%')+row('base','var(--orange)','🟠 Base',base,'Paramètres saisis')+row('bull','var(--green)','🟢 Bull',bull,'g1×1.40, WACC-1%');
}
function VAL_renderWaterfall(d){
  var total=Math.max(d.pv1+d.pv2+d.pvtv+VS.cash,1);
  function bar(v,c){var w=Math.max(0,Math.min(100,Math.abs(v)/total*100));return '<div class="wf-bar-bg"><div class="wf-bar" style="width:'+w+'%;background:'+c+'"></div></div>';}
  var cc=VS.cash>=0?'var(--green)':'var(--red)';
  var el=vEl('val-waterfall');if(!el)return;
  el.innerHTML='<div class="wf-row"><span class="wf-lbl">PV FCF Ph.1 (ans 1-5)</span>'+bar(d.pv1,'var(--blue)')+'<span class="wf-val" style="color:var(--blue)">'+vFmt(d.pv1/1000,0)+'B$</span></div>'+'<div class="wf-row"><span class="wf-lbl">PV FCF Ph.2 (ans 6-10)</span>'+bar(d.pv2,'var(--blue)')+'<span class="wf-val" style="color:var(--blue)">'+vFmt(d.pv2/1000,0)+'B$</span></div>'+'<div class="wf-row"><span class="wf-lbl">Valeur Terminale (VT)</span>'+bar(d.pvtv,'var(--orange)')+'<span class="wf-val" style="color:var(--orange)">'+vFmt(d.pvtv/1000,0)+'B$</span></div>'+'<div class="wf-row"><span class="wf-lbl">Trésorerie Nette</span>'+bar(VS.cash,cc)+'<span class="wf-val" style="color:'+cc+'">'+vFmt(VS.cash/1000,1)+'B$</span></div>'+'<div class="wf-row" style="border-top:1px solid var(--br-mid);padding-top:5px;margin-top:2px;"><span class="wf-lbl" style="color:var(--tx-hi);font-weight:700;">= Equity Totale</span><div class="wf-bar-bg"><div class="wf-bar" style="width:100%;background:var(--orange)"></div></div><span class="wf-val" style="color:var(--orange);font-weight:700;">'+vFmt(d.total/1000,0)+'B$</span></div>';
}
function VAL_renderMultiples(b){
  var peM=(b.pe[0]+b.pe[1])/2,pbM=(b.pb[0]+b.pb[1])/2;
  function cR(v,lo,hi){if(v===null)return 'var(--tx-faint)';return v<lo?'var(--green)':v<=hi?'var(--yellow)':'var(--red)';}
  function fR(v,lo,hi){if(v===null||isNaN(v))return '<span style="color:var(--tx-faint)">N/A</span>';return '<span style="color:'+cR(v,lo,hi)+'">'+v.toFixed(1)+'x</span>';}
  var pe=vEl('vm-pe');if(pe){pe.textContent=VS.pe?VS.pe.toFixed(1)+'x':'N/A';pe.style.color=VS.pe?cR(VS.pe,b.pe[0],b.pe[1]):'var(--tx-faint)';}
  var peg=vEl('vm-peg');if(peg){peg.textContent=VS.peg?VS.peg.toFixed(2):'N/A';peg.style.color=VS.peg?(VS.peg<1?'var(--green)':VS.peg<2?'var(--yellow)':'var(--red)'):'var(--tx-faint)';}
  var pb=vEl('vm-pb');if(pb){pb.textContent=VS.pb?VS.pb.toFixed(2)+'x':'N/A';pb.style.color=VS.pb?cR(VS.pb,b.pb[0],b.pb[1]):'var(--tx-faint)';}
  var ey=vEl('vm-ey');if(ey){ey.textContent=VS.pe?(100/VS.pe).toFixed(2)+'%':'N/A';ey.style.color=VS.pe?(VS.pe<20?'var(--green)':'var(--yellow)'):'var(--tx-faint)';}
  vSet('vm-pe-sub','Secteur: '+b.pe[0]+'-'+b.pe[1]+'x');
  function sig(pot){return pot>10?'<span class="vbadge vbadge-g">SOUS-ÉVALUÉ</span>':pot>-5?'<span class="vbadge vbadge-y">JUSTE PRIX</span>':'<span class="vbadge vbadge-r">SURÉVALUÉ</span>';}
  var methods=[{m:'DCF 10 ans',logic:'FCF actualisé',val:VS.dcf_base,poids:'40%'},{m:'P/E Sectoriel',logic:peM.toFixed(1)+'x × EPS $'+VS.eps,val:VS.eps>0?peM*VS.eps:null,poids:'25%'},{m:'P/B Sectoriel',logic:pbM.toFixed(1)+'x × BV $'+VS.bv,val:VS.bv>0?pbM*VS.bv:null,poids:'10%'},{m:'Graham Number',logic:'√(22.5 × EPS × BV)',val:VS.graham_val>0?VS.graham_val:null,poids:'15%'},{m:'PEG Normalisé',logic:'EPS × Croiss.',val:VS.eps>0&&VS.revg>0?VS.eps*VS.revg:null,poids:'10%'}];
  var html='';methods.forEach(function(r){if(r.val===null||isNaN(r.val)){html+='<tr><td>'+r.m+'</td><td style="color:var(--tx-faint)">'+r.logic+'</td><td colspan="3" style="color:var(--tx-faint)">Données insuffisantes</td><td>'+r.poids+'</td></tr>';return;}var pot=(r.val-VS.price)/VS.price*100;html+='<tr><td>'+r.m+'</td><td style="color:var(--tx-faint)">'+r.logic+'</td><td class="'+(pot>0?'up':'dn')+'">$'+vFmt(r.val,0)+'</td><td style="color:'+vCol(pot)+'">'+vPct(pot)+'</td><td>'+sig(pot)+'</td><td>'+r.poids+'</td></tr>';});
  var tb=vEl('val-mult-tbody');if(tb)tb.innerHTML=html;
  var bh='';Object.keys(VAL_BENCH).forEach(function(k){var bk=VAL_BENCH[k],act=k===VS.secteur;bh+='<tr'+(act?' style="background:var(--orange-bg)"':'')+'>'+
    '<td style="font-weight:'+(act?'700':'400')+';color:'+(act?'var(--orange)':'var(--tx-mid)')+'">'+bk.label+(act?' ◀':'')+'</td>'+
    '<td>'+bk.pe[0]+'-'+bk.pe[1]+'x</td><td>'+bk.pb[0]+'-'+bk.pb[1]+'x</td><td>'+bk.peg[0]+'-'+bk.peg[1]+'</td><td>'+bk.marge[0]+'-'+bk.marge[1]+'%</td><td>'+bk.roe[0]+'-'+bk.roe[1]+'%</td></tr>';});
  var btb=vEl('val-bench-tbody');if(btb)btb.innerHTML=bh;
}
function VAL_renderScore(sr,sm,sg,sd,sv,b){
  var rows=[{l:'ROE (Return on Equity)',v:VS.roe.toFixed(1)+'%',s:sr,max:20,st:vStars(VS.roe,30,15)},{l:'Marge Nette',v:VS.marge.toFixed(1)+'%',s:sm,max:20,st:vStars(VS.marge,20,10)},{l:'Croissance Revenus',v:vPct(VS.revg),s:sg,max:20,st:vStars(VS.revg,30,10)},{l:'Solidité Bilan (D/E)',v:VS.de.toFixed(2)+'x',s:sd,max:20,st:vStars(3-VS.de,2,1)},{l:'Valorisation (DCF)',v:vPct((VS.dcf_base-VS.price)/VS.price*100),s:sv,max:20,st:vStars(sv,15,8)}];
  var html='';rows.forEach(function(r){html+='<div class="quality-row"><span class="quality-lbl">'+r.l+'</span><span class="quality-stars">'+r.st+'</span><span style="color:var(--tx-faint);font-size:9px;width:30px;text-align:right;">'+r.s.toFixed(0)+'/'+r.max+'</span><span class="quality-val">'+r.v+'</span></div>';});
  var qr=vEl('val-quality-rows');if(qr)qr.innerHTML=html;
  var sn=vEl('val-score-num');if(sn){sn.textContent=VS.score;sn.style.color=VS.score>=80?'var(--green)':VS.score>=60?'var(--yellow)':'var(--red)';}
  var mention=VS.score>=90?'Exceptionnel 🌟':VS.score>=80?'Très Bon 💪':VS.score>=65?'Bon 👍':VS.score>=50?'Moyen ⚖️':'Faible ⚠️';
  vSet('val-score-mention','/ 100 — '+mention);
  var pct=VS.score>=90?'Top 5%':VS.score>=80?'Top 15%':VS.score>=65?'Top 35%':'Sous la médiane';
  vSet('val-score-pct',pct+' des entreprises');
  var sb=vEl('val-score-bar');if(sb){sb.style.width=VS.score+'%';sb.style.background=VS.score>=80?'var(--green)':VS.score>=60?'var(--yellow)':'var(--red)';}
  var pe=VS.pe,pb=VS.pb;
  var criteria=[{l:'P/E < 15',ok:pe&&pe<15,v:pe?pe.toFixed(1)+'x':'N/A'},{l:'P/E × P/B < 22.5',ok:pe&&pb&&pe*pb<22.5,v:pe&&pb?(pe*pb).toFixed(1):'N/A'},{l:'P/B < 1.5',ok:pb&&pb<1.5,v:pb?pb.toFixed(2)+'x':'N/A'},{l:'D/E < 1',ok:VS.de<1,v:VS.de.toFixed(2)},{l:'EPS positif',ok:VS.eps>0,v:'$'+VS.eps.toFixed(2)},{l:'Marge sécurité > 30%',ok:VS.graham_val>0&&(VS.graham_val-VS.price)/VS.price>0.3,v:VS.graham_val>0?vPct((VS.graham_val-VS.price)/VS.price*100):'N/A'}];
  var pass=criteria.filter(function(c){return c.ok;}).length;
  var gh='<div style="margin-bottom:8px;font-size:10px;color:var(--tx-faint);font-family:var(--mono);">Critères: <span style="color:'+(pass>=4?'var(--green)':pass>=2?'var(--yellow)':'var(--red)')+'">'+pass+'/6</span></div>';
  criteria.forEach(function(c){gh+='<div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-bottom:1px solid var(--br-faint);"><span style="color:var(--tx-mid);">'+(c.ok?'✅':'❌')+' '+c.l+'</span><span style="color:'+(c.ok?'var(--green)':'var(--red)')+'">'+c.v+'</span></div>';});
  var gg=vEl('val-graham-grid');if(gg)gg.innerHTML=gh;
}
function VAL_renderComps(b){
  var comps=VAL_COMP[VS.secteur]||VAL_COMP.tech;
  var strip=vEl('val-comp-strip');if(strip)strip.textContent='📊 Comparables — '+b.label+' · '+comps.length+' sociétés';
  function fr(v,lo,hi){if(v===null||v===undefined)return '<span style="color:var(--tx-faint)">N/A</span>';var c=v<lo?'var(--green)':v<=hi?'var(--yellow)':'var(--red)';return '<span style="color:'+c+'">'+v.toFixed(1)+'x</span>';}
  var sr='<tr style="background:var(--orange-bg);"><td style="font-weight:700;color:var(--orange)">▶ '+VS.ticker+'</td><td style="color:var(--orange)">'+VS.ticker+'</td><td>'+fr(VS.pe,b.pe[0],b.pe[1])+'</td><td>'+fr(VS.peg,b.peg[0],b.peg[1])+'</td><td>'+fr(VS.pb,b.pb[0],b.pb[1])+'</td><td style="color:'+(VS.revg>15?'var(--green)':VS.revg>0?'var(--yellow)':'var(--red)')+'">'+vPct(VS.revg)+'</td><td style="color:'+(VS.marge>b.marge[1]?'var(--green)':VS.marge>b.marge[0]?'var(--yellow)':'var(--red)')+'">'+VS.marge.toFixed(1)+'%</td><td style="color:'+(VS.roe>b.roe[1]?'var(--green)':VS.roe>b.roe[0]?'var(--yellow)':'var(--red)')+'">'+VS.roe.toFixed(0)+'%</td><td><span class="vbadge vbadge-o">'+VS.score+'/100</span></td><td><span class="vbadge vbadge-o">ANALYSE</span></td></tr>';
  var rows=comps.map(function(c){var sig=c.score>=80?'<span class="vbadge vbadge-g">FORT</span>':c.score>=65?'<span class="vbadge vbadge-y">MOYEN</span>':'<span class="vbadge vbadge-r">FAIBLE</span>';return '<tr><td>'+c.n+'</td><td class="hl">'+c.t+'</td><td>'+fr(c.pe,b.pe[0],b.pe[1])+'</td><td>'+fr(c.peg,b.peg[0],b.peg[1])+'</td><td>'+fr(c.pb,b.pb[0],b.pb[1])+'</td><td style="color:'+(c.rg>15?'var(--green)':c.rg>0?'var(--yellow)':'var(--red)')+'">'+vPct(c.rg)+'</td><td style="color:'+(c.mn>b.marge[1]?'var(--green)':c.mn>b.marge[0]?'var(--yellow)':'var(--red)')+'">'+c.mn.toFixed(1)+'%</td><td style="color:'+(c.roe!==null?(c.roe>b.roe[1]?'var(--green)':c.roe>b.roe[0]?'var(--yellow)':'var(--red)'):'var(--tx-faint)')+'">'+( c.roe!==null?c.roe+'%':'N/A')+'</td><td><span class="vbadge '+(c.score>=80?'vbadge-g':c.score>=65?'vbadge-y':'vbadge-r')+'">'+c.score+'/100</span></td><td>'+sig+'</td></tr>';}).join('');
  var tb=vEl('val-comp-tbody');if(tb)tb.innerHTML=sr+rows;
}
window.VAL_ai=async function(mode){
  if(!VS.dcf_base)VAL_run();
  var btn=vEl('val-ai-btn');if(btn){btn.disabled=true;btn.textContent='⏳ Analyse...';}
  var out=vEl('val-ai-output');if(!out)return;
  out.className='loading';out.textContent='⏳ Analyse IA de '+VS.ticker+' en cours…';
  var pot=((VS.dcf_base-VS.price)/VS.price*100).toFixed(1);
  var missions={full:'Fais une analyse fondamentale complète avec verdict ACHAT/NEUTRE/VENTE justifié. Inclus 3 catalyseurs haussiers et 3 risques majeurs.',bull:'Développe le scénario BULL. Catalyseurs et timeline pour atteindre la cible haute.',bear:'Développe le scénario BEAR. Risques et protection contre la baisse.',risks:'Liste exhaustive des risques (opérationnels, macro, compétitifs, réglementaires) ET catalyseurs.'};
  var prompt='Tu es un analyste actions senior.\n\n== Données ==\nTicker: '+VS.ticker+' | Secteur: '+(VAL_BENCH[VS.secteur]||{label:VS.secteur}).label+'\nPrix: $'+VS.price+' | DCF Base: $'+Math.round(VS.dcf_base)+' ('+vPct(parseFloat(pot))+')\nDCF Bear: $'+Math.round(VS.dcf_bear)+' | DCF Bull: $'+Math.round(VS.dcf_bull)+'\nGraham: '+(VS.graham_val>0?'$'+Math.round(VS.graham_val):'N/A')+' | Pondéré: $'+Math.round(VS.pond_val)+'\nFCF: '+(VS.fcf/1000).toFixed(1)+'B$ | G1: +'+(VS.g1*100).toFixed(1)+'%/an | G2: +'+(VS.g2*100).toFixed(1)+'%/an | WACC: '+(VS.wacc*100).toFixed(1)+'%\nP/E: '+(VS.pe?VS.pe.toFixed(1)+'x':'N/A')+' | PEG: '+(VS.peg?VS.peg.toFixed(2):'N/A')+' | P/B: '+(VS.pb?VS.pb.toFixed(2)+'x':'N/A')+'\nROE: '+VS.roe+'% | Marge: '+VS.marge+'% | Croiss Rev: +'+VS.revg+'% | D/E: '+VS.de+'\nScore: '+VS.score+'/100\n\n== Mission ==\n'+(missions[mode]||missions.full)+'\n\nRéponse en français, structurée, directe. Max 400 mots.';
  try{var r=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+AM.API_KEYS.GROQ},body:JSON.stringify({model:'llama-3.3-70b-versatile',max_tokens:1000,messages:[{role:'user',content:prompt}]})}); var data=await r.json();var text=data.choices&&data.choices[0]?data.choices[0].message.content:'';out.className='';out.textContent=text||'⚠️ Réponse vide.';}catch(e){out.className='';out.textContent='⚠️ Erreur API: '+e.message;}
  if(btn){btn.disabled=false;btn.textContent='🤖 Analyse Complète';}
};
window.VAL_ai_custom=async function(){
  var prompt=(vEl('val-ai-custom')||{value:''}).value.trim();if(!prompt)return;
  if(!VS.dcf_base)VAL_run();
  var out=vEl('val-ai-output');if(!out)return;
  out.className='loading';out.textContent='⏳ Réflexion…';
  var ctx='Contexte: '+VS.ticker+', $'+VS.price+', DCF $'+Math.round(VS.dcf_base)+', Score '+VS.score+'/100, WACC '+(VS.wacc*100).toFixed(1)+'%\n\n';
  try{var r=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+AM.API_KEYS.GROQ},body:JSON.stringify({model:'llama-3.3-70b-versatile',max_tokens:1000,messages:[{role:'user',content:ctx+prompt}]})}); var data=await r.json();var text=data.choices&&data.choices[0]?data.choices[0].message.content:'';out.className='';out.textContent=text;}catch(e){out.className='';out.textContent='⚠️ '+e.message;}
};
/* Auto-init via MutationObserver */
var _vObs=new MutationObserver(function(){if(vEl('val-module')&&vEl('vp-fcf')){_vObs.disconnect();VAL_run();}});
_vObs.observe(document.body,{childList:true,subtree:true});
console.log('[VAL Engine] Moteur valorisation chargé ✓');
})();
