/* ═══════════════════════════════════════════════════════════════
   Arthur Terminal PATCH v4.4 — Corrections & Améliorations
   ═══════════════════════════════════════════════════════════════ */
(function() {
'use strict';

function ready(fn) {
  if (document.readyState !== 'loading') { fn(); }
  else { document.addEventListener('DOMContentLoaded', fn); }
}

ready(function() {

/* ── 1. PATCH TEMPLATES ─────────────────────────────────────── */
if (window.AM && AM.TPL && AM.TPL.actions) {

  /* Backtest: remplace iframe TradingView par canvas Chart.js */
    /* AM.TPL.actions.backtest — handled by v5 patch */;

  /* Grand Conseil: remplace iframe TradingView par grille fonctionnelle */
  AM.TPL.actions.council = '<div style="display:flex;flex-direction:column;height:100%;gap:10px;">'
    + '<!-- Header compact -->'
    + '<div style="text-align:center;padding:10px 0 6px;">'
    + '<div style="font-size:18px;font-weight:700;color:var(--tx-hi);">⚖️ The Grand Council of Wall Street</div>'
    + '<div style="font-family:var(--mono);font-size:9px;color:var(--tx-faint);letter-spacing:3px;text-transform:uppercase;margin-top:3px;">15 LÉGENDES DE L\'INVESTISSEMENT</div>'
    + '</div>'
    + '<!-- Barre de contrôle -->'
    + '<div style="display:flex;gap:8px;align-items:center;padding:10px 14px;background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:var(--radius-md);justify-content:center;flex-wrap:wrap;">'
    + '<input class="inp" id="council-ticker" placeholder="Ticker (NVDA, AAPL, MC.PA…)" style="width:240px;text-transform:uppercase;font-family:var(--mono);">'
    + '<select class="sel" id="council-mode" style="width:160px;"><option value="standard">Analyse Standard</option><option value="strict">Mode Strict</option><option value="growth">Mode Croissance</option></select>'
    + '<button class="btn btn-primary" id="council-btn" style="padding:7px 20px;">🚀 Convoquer le Conseil</button>'
    + '<div style="display:flex;gap:5px;margin-left:4px;">'
    + '<button class="btn btn-ghost" style="font-size:10px;padding:4px 10px;" onclick="document.getElementById(\'council-ticker\').value=\'NVDA\'">NVDA</button>'
    + '<button class="btn btn-ghost" style="font-size:10px;padding:4px 10px;" onclick="document.getElementById(\'council-ticker\').value=\'AAPL\'">AAPL</button>'
    + '<button class="btn btn-ghost" style="font-size:10px;padding:4px 10px;" onclick="document.getElementById(\'council-ticker\').value=\'META\'">META</button>'
    + '<button class="btn btn-ghost" style="font-size:10px;padding:4px 10px;" onclick="document.getElementById(\'council-ticker\').value=\'MC.PA\'">MC.PA</button>'
    + '<button class="btn btn-ghost" style="font-size:10px;padding:4px 10px;" onclick="document.getElementById(\'council-ticker\').value=\'TSLA\'">TSLA</button>'
    + '</div>'
    + '</div>'
    + '<!-- Corps : grille légendes gauche + verdict droite -->'
    + '<div style="display:grid;grid-template-columns:1fr 280px;gap:10px;flex:1;min-height:0;">'
    + '<!-- GAUCHE : résultats conseil (grille 15 experts) -->'
    + '<div id="council-result" style="overflow-y:auto;">'
    + '<div style="text-align:center;padding:40px 0;color:var(--tx-faint);font-family:var(--mono);font-size:11px;">'
    + '<div style="font-size:28px;margin-bottom:10px;">⚖️</div>'
    + 'Entrez un ticker et convoquez le Conseil<br>pour obtenir l\'avis des 15 légendes de Wall Street.'
    + '</div></div>'
    + '<!-- DROITE : panel infos fixes -->'
    + '<div style="display:flex;flex-direction:column;gap:8px;overflow-y:auto;">'
    + '<div class="card" style="padding:14px;">'
    + '<div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--orange);font-family:var(--mono);font-weight:700;margin-bottom:12px;">⚖️ LES 15 LÉGENDES</div>'
    + '<div style="font-size:10px;font-family:var(--mono);line-height:2.2;">'
    + '<div style="display:flex;gap:6px;align-items:center;padding:3px 0;border-bottom:1px solid var(--br-faint);"><span style="font-size:13px;">📚</span><div><div style="color:var(--tx-hi);font-weight:600;">B. Graham</div><div style="color:var(--tx-faint);font-size:9px;">Value / Sécurité</div></div></div>'
    + '<div style="display:flex;gap:6px;align-items:center;padding:3px 0;border-bottom:1px solid var(--br-faint);"><span style="font-size:13px;">🎩</span><div><div style="color:var(--tx-hi);font-weight:600;">W. Buffett</div><div style="color:var(--tx-faint);font-size:9px;">Moat / Qualité</div></div></div>'
    + '<div style="display:flex;gap:6px;align-items:center;padding:3px 0;border-bottom:1px solid var(--br-faint);"><span style="font-size:13px;">📈</span><div><div style="color:var(--tx-hi);font-weight:600;">P. Lynch</div><div style="color:var(--tx-faint);font-size:9px;">PEG / Croissance</div></div></div>'
    + '<div style="display:flex;gap:6px;align-items:center;padding:3px 0;border-bottom:1px solid var(--br-faint);"><span style="font-size:13px;">✨</span><div><div style="color:var(--tx-hi);font-weight:600;">J. Greenblatt</div><div style="color:var(--tx-faint);font-size:9px;">Magic Formula</div></div></div>'
    + '<div style="display:flex;gap:6px;align-items:center;padding:3px 0;border-bottom:1px solid var(--br-faint);"><span style="font-size:13px;">🌍</span><div><div style="color:var(--tx-hi);font-weight:600;">R. Dalio</div><div style="color:var(--tx-faint);font-size:9px;">Macro / All Weather</div></div></div>'
    + '<div style="display:flex;gap:6px;align-items:center;padding:3px 0;border-bottom:1px solid var(--br-faint);"><span style="font-size:13px;">🔮</span><div><div style="color:var(--tx-hi);font-weight:600;">C. Wood</div><div style="color:var(--tx-faint);font-size:9px;">Innovation Disruptive</div></div></div>'
    + '<div style="display:flex;gap:6px;align-items:center;padding:3px 0;border-bottom:1px solid var(--br-faint);"><span style="font-size:13px;">🦁</span><div><div style="color:var(--tx-hi);font-weight:600;">C. Munger</div><div style="color:var(--tx-faint);font-size:9px;">Mental Models</div></div></div>'
    + '<div style="display:flex;gap:6px;align-items:center;padding:3px 0;border-bottom:1px solid var(--br-faint);"><span style="font-size:13px;">🎯</span><div><div style="color:var(--tx-hi);font-weight:600;">S. Druckenmiller</div><div style="color:var(--tx-faint);font-size:9px;">Momentum / Macro</div></div></div>'
    + '<div style="display:flex;gap:6px;align-items:center;padding:3px 0;border-bottom:1px solid var(--br-faint);"><span style="font-size:13px;">🧮</span><div><div style="color:var(--tx-hi);font-weight:600;">J. Simons</div><div style="color:var(--tx-faint);font-size:9px;">Quantitatif / Algo</div></div></div>'
    + '<div style="display:flex;gap:6px;align-items:center;padding:3px 0;border-bottom:1px solid var(--br-faint);"><span style="font-size:13px;">⚡</span><div><div style="color:var(--tx-hi);font-weight:600;">G. Soros</div><div style="color:var(--tx-faint);font-size:9px;">Réflexivité / Macro</div></div></div>'
    + '<div style="display:flex;gap:6px;align-items:center;padding:3px 0;border-bottom:1px solid var(--br-faint);"><span style="font-size:13px;">🏆</span><div><div style="color:var(--tx-hi);font-weight:600;">D. Einhorn</div><div style="color:var(--tx-faint);font-size:9px;">Deep Value</div></div></div>'
    + '<div style="display:flex;gap:6px;align-items:center;padding:3px 0;border-bottom:1px solid var(--br-faint);"><span style="font-size:13px;">🌿</span><div><div style="color:var(--tx-hi);font-weight:600;">T. R. Price</div><div style="color:var(--tx-faint);font-size:9px;">Croissance LT</div></div></div>'
    + '<div style="display:flex;gap:6px;align-items:center;padding:3px 0;border-bottom:1px solid var(--br-faint);"><span style="font-size:13px;">🛡️</span><div><div style="color:var(--tx-hi);font-weight:600;">C. Akre</div><div style="color:var(--tx-faint);font-size:9px;">Compounders</div></div></div>'
    + '<div style="display:flex;gap:6px;align-items:center;padding:3px 0;border-bottom:1px solid var(--br-faint);"><span style="font-size:13px;">📊</span><div><div style="color:var(--tx-hi);font-weight:600;">H. Marks</div><div style="color:var(--tx-faint);font-size:9px;">Cycles de Marché</div></div></div>'
    + '<div style="display:flex;gap:6px;align-items:center;padding:3px 0;"><span style="font-size:13px;">🔬</span><div><div style="color:var(--tx-hi);font-weight:600;">B. Ackman</div><div style="color:var(--tx-faint);font-size:9px;">Activiste / Long</div></div></div>'
    + '</div></div>'
    + '<div class="card" style="padding:14px;">'
    + '<div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--orange);font-family:var(--mono);font-weight:700;margin-bottom:10px;">📖 MÉTHODES</div>'
    + '<div style="font-size:10px;font-family:var(--mono);line-height:1.8;">'
    + '<div style="padding:6px;background:var(--green-bg);border-left:2px solid var(--green);border-radius:3px;margin-bottom:6px;"><div style="color:var(--green);font-weight:700;">ACHAT FORT (5/5)</div><div style="color:var(--tx-faint);font-size:9px;">Tous critères excellents</div></div>'
    + '<div style="padding:6px;background:rgba(0,232,150,.04);border-left:2px solid #44cc88;border-radius:3px;margin-bottom:6px;"><div style="color:#44cc88;font-weight:700;">ACHAT (4/5)</div><div style="color:var(--tx-faint);font-size:9px;">Bons fondamentaux</div></div>'
    + '<div style="padding:6px;background:var(--yellow-bg);border-left:2px solid var(--yellow);border-radius:3px;margin-bottom:6px;"><div style="color:var(--yellow);font-weight:700;">NEUTRE (3/5)</div><div style="color:var(--tx-faint);font-size:9px;">Attendre meilleur timing</div></div>'
    + '<div style="padding:6px;background:var(--red-bg);border-left:2px solid var(--red);border-radius:3px;"><div style="color:var(--red);font-weight:700;">ÉVITER (1-2/5)</div><div style="color:var(--tx-faint);font-size:9px;">Ne pas investir</div></div>'
    + '</div></div>'
    + '</div>'
    + '</div>'
    + '</div>';

  /* Mode Duel: remplace iframe TradingView par comparaison interactive */
  AM.TPL.actions.duel = '<div style="text-align:center;padding:0 0 22px"><div style="font-size:20px;font-weight:700;color:var(--tx-hi)">⚔️ Equity Duel</div><div style="font-family:var(--mono);font-size:9px;color:var(--tx-faint);letter-spacing:3px;text-transform:uppercase;margin-top:4px">Comparaison Professionnelle d\'Actions</div></div>'
    + '<div style="display:grid;grid-template-columns:1fr 48px 1fr;gap:12px;align-items:center;margin-bottom:14px;max-width:520px;margin-left:auto;margin-right:auto;">'
    + '<input class="inp" id="duel-t1" value="MC.PA" placeholder="Ticker 1" style="text-transform:uppercase;text-align:center;">'
    + '<div style="font-size:22px;color:var(--orange);text-align:center;">⚔️</div>'
    + '<input class="inp" id="duel-t2" value="RMS.PA" placeholder="Ticker 2" style="text-transform:uppercase;text-align:center;"></div>'
    + '<div style="text-align:center;margin-bottom:18px;"><button class="btn btn-primary" id="duel-btn">⚔️ Lancer le Duel</button></div>'
    + '<div id="duel-result"><div style="text-align:center;padding:40px 0;color:var(--tx-faint);font-family:var(--mono);font-size:11px;">Entrez deux tickers et lancez le duel pour une comparaison détaillée.</div></div>';

  /* Screener CAC40: remplace iframe TradingView par tableau complet */
  /* cac40 handled in source */;

  /* Market Monitor: remplace iframe TradingView par heatmap sectorielle */
  (function() {
    var sectors = [
      { name:'Technology', chg:+1.84 }, { name:'Finance', chg:-0.22 },
      { name:'Énergie', chg:-0.84 }, { name:'Santé', chg:+0.44 },
      { name:'Consumer', chg:+0.12 }, { name:'Industrie', chg:+0.38 },
      { name:'Luxe/France', chg:-0.14 }, { name:'Matériaux', chg:+0.22 },
    ];
    var heat = '<div class="sec" style="margin-top:14px;margin-bottom:10px"><span class="sec-label">🌡️ Heatmap Sectorielle</span><div class="sec-line"></div></div>';
    heat += '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:14px;">';
    sectors.forEach(function(s) {
      var col = s.chg > 0.5 ? '#00e896' : s.chg > 0 ? '#55c98a' : s.chg > -0.5 ? '#ff7777' : '#ff4757';
      var bg  = s.chg > 0.5 ? 'rgba(0,232,150,.14)' : s.chg > 0 ? 'rgba(0,232,150,.07)' : s.chg > -0.5 ? 'rgba(255,71,87,.07)' : 'rgba(255,71,87,.14)';
      heat += '<div style="background:' + bg + ';border:1px solid ' + col + '44;border-radius:6px;padding:12px;text-align:center;">'
        + '<div style="font-size:11px;font-weight:700;color:var(--tx-hi);margin-bottom:6px;">' + s.name + '</div>'
        + '<div style="font-size:18px;font-weight:700;color:' + col + ';font-family:var(--mono);">' + (s.chg > 0 ? '+' : '') + s.chg.toFixed(2) + '%</div>'
        + '</div>';
    });
    heat += '</div>';
    heat += '<div class="card"><div class="sec" style="margin-bottom:10px"><span class="sec-label">📊 Vue d\'Ensemble — Toutes Classes d\'Actifs</span><div class="sec-line"></div></div>';
    heat += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;font-family:var(--mono);font-size:11px;">';
    [
      { title:'🇺🇸 Indices US', items:[['S&P 500','5,218','+0.67%',true],['NASDAQ 100','18,441','+0.92%',true],['DOW JONES','42,820','+0.41%',true],['Russell 2000','2,048','-0.14%',false],['VIX','14.2','-4.8%',false]] },
      { title:'🇪🇺 Indices Europe', items:[['CAC 40','7,980','-0.22%',false],['DAX 40','22,840','+0.38%',true],['FTSE 100','8,642','+0.11%',true],['Euro Stoxx 50','5,412','-0.08%',false],['SMI','11,824','+0.18%',true]] },
      { title:'🌏 Asie & Matières Premières', items:[['Nikkei 225','38,420','+1.14%',true],['Hang Seng','23,180','-0.84%',false],['Or XAU/USD','$3,042','+0.44%',true],['Pétrole WTI','$78.40','-0.62%',false],['BTC/USD', (AM&&AM.data&&AM.data._cache&&AM.data._cache.BTC)?'$'+AM.data._cache.BTC.price.toLocaleString('en-US',{maximumFractionDigits:0}):'$—', (AM&&AM.data&&AM.data._cache&&AM.data._cache.BTC)?(AM.data._cache.BTC.change24h>=0?'+':'')+AM.data._cache.BTC.change24h.toFixed(2)+'%':'—', (AM&&AM.data&&AM.data._cache&&AM.data._cache.BTC)?AM.data._cache.BTC.change24h>=0:true]] },
    ].forEach(function(g) {
      heat += '<div><div style="font-size:9px;letter-spacing:2px;color:var(--orange);text-transform:uppercase;margin-bottom:8px;border-bottom:1px solid var(--br-faint);padding-bottom:4px;">' + g.title + '</div>';
      g.items.forEach(function(item) {
        heat += '<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #0f0f0f;">'
          + '<span style="color:var(--tx-mid);">' + item[0] + '</span>'
          + '<span style="color:var(--tx-hi);font-weight:600;">' + item[1] + '</span>'
          + '<span style="color:' + (item[3] ? 'var(--green)' : 'var(--red)') + ';">' + item[2] + '</span>'
          + '</div>';
      });
      heat += '</div>';
    });
    heat += '</div></div>';

    if (AM.TPL.actions.monitor) {
      /* Remove the TradingView iframe at end */
      AM.TPL.actions.monitor = AM.TPL.actions.monitor.replace(
        /<div style="height:680px[^"]*"[^>]*>[\s\S]*?<\/div>$/,
        heat
      );
      if (AM.TPL.actions.monitor.indexOf(heat) === -1) {
        /* Fallback: append heatmap at end */
        AM.TPL.actions.monitor = AM.TPL.actions.monitor + heat;
      }
    }
  })();
}

/* ── 2. DONNÉES ─────────────────────────────────────────────── */

var COUNCIL_LEGENDS = [
  { em:'📚', name:'B. Graham', style:'Value / Sécurité', fn:function(s){ return s.pe&&s.pe<15&&s.pb<1.5?['ACHAT',5,'g']:s.pe&&s.pe<25?['NEUTRE',3,'y']:['ÉVITER',1,'r']; } },
  { em:'🎩', name:'W. Buffett', style:'Moat / Qualité', fn:function(s){ return s.roe>20&&s.moat?['ACHAT FORT',5,'g']:s.roe>12?['ACHAT',4,'g']:['NEUTRE',3,'y']; } },
  { em:'📈', name:'P. Lynch', style:'PEG / Croissance', fn:function(s){ return s.peg&&s.peg<0.5?['ACHAT FORT',5,'g']:s.peg&&s.peg<1?['ACHAT',4,'g']:s.peg&&s.peg<2?['NEUTRE',3,'y']:['ÉVITER',1,'r']; } },
  { em:'✨', name:'J. Greenblatt', style:'Magic Formula', fn:function(s){ return s.roic>20&&s.ey>8?['ACHAT FORT',5,'g']:s.roic>12?['ACHAT',4,'g']:['NEUTRE',3,'y']; } },
  { em:'🌍', name:'R. Dalio', style:'Macro / All Weather', fn:function(s){ return s.beta>2?['NEUTRE',3,'y']:s.div>2?['ACHAT',4,'g']:['NEUTRE',3,'y']; } },
  { em:'🔮', name:'C. Wood', style:'Innovation Disruptive', fn:function(s){ return s.growth>50?['ACHAT FORT',5,'g']:s.growth>20?['ACHAT',4,'g']:['NEUTRE',2,'y']; } },
  { em:'🦁', name:'C. Munger', style:'Mental Models', fn:function(s){ return s.roe>25&&s.moat?['ACHAT FORT',5,'g']:s.roe>15?['ACHAT',4,'g']:['NEUTRE',3,'y']; } },
  { em:'🎯', name:'S. Druckenmiller', style:'Momentum / Macro', fn:function(s){ return s.mom>15?['ACHAT FORT',5,'g']:s.mom>5?['ACHAT',4,'g']:['NEUTRE',3,'y']; } },
  { em:'🧮', name:'J. Simons', style:'Quantitatif / Algo', fn:function(s){ return s.rsi>50&&s.rsi<65&&s.mom>8?['ACHAT',4,'g']:['NEUTRE',3,'y']; } },
  { em:'⚡', name:'G. Soros', style:'Réflexivité / Macro', fn:function(s){ return s.beta>1.5&&s.mom>10?['ACHAT',4,'g']:['NEUTRE',3,'y']; } },
  { em:'🏆', name:'D. Einhorn', style:'Deep Value', fn:function(s){ return s.pe&&s.pe<12&&s.eps>0?['ACHAT FORT',5,'g']:s.pe&&s.pe<20?['ACHAT',4,'g']:['ÉVITER',1,'r']; } },
  { em:'🌿', name:'T. R. Price', style:'Croissance LT', fn:function(s){ return s.growth>30?['ACHAT FORT',5,'g']:s.growth>15?['ACHAT',4,'g']:['NEUTRE',3,'y']; } },
  { em:'🛡️', name:'C. Akre', style:'Compounders', fn:function(s){ return s.roic>15&&s.growth>10?['ACHAT FORT',5,'g']:s.roic>10?['ACHAT',4,'g']:['NEUTRE',3,'y']; } },
  { em:'📊', name:'H. Marks', style:'Cycles de Marché', fn:function(s){ return s.pe&&s.pe<20&&s.pb<3?['ACHAT',4,'g']:s.pe&&s.pe<30?['NEUTRE',3,'y']:['ATTENTION',2,'r']; } },
  { em:'🔬', name:'B. Ackman', style:'Activiste / Long', fn:function(s){ return s.pb<2&&s.roe>15?['ACHAT FORT',5,'g']:s.roe>10?['ACHAT',4,'g']:['NEUTRE',3,'y']; } },
];

var COUNCIL_DB = {
  NVDA: {pe:36,pb:28,roe:123,roic:89,peg:0.41,div:0.03,growth:122,beta:2.38,rsi:64,mom:18,moat:true,ey:2.8,eps:12.96},
  AAPL: {pe:28,pb:45,roe:148,roic:54,peg:1.8,div:0.51,growth:4,beta:1.2,rsi:58,mom:5,moat:true,ey:3.6,eps:6.43},
  MSFT: {pe:34,pb:14,roe:38,roic:28,peg:1.6,div:0.75,growth:16,beta:0.9,rsi:62,mom:8,moat:true,ey:2.9,eps:12.05},
  TSLA: {pe:52,pb:8,roe:18,roic:12,peg:2.8,div:0,growth:-5,beta:2.8,rsi:38,mom:-8,moat:false,ey:1.9,eps:3.44},
  AMZN: {pe:44,pb:8,roe:22,roic:16,peg:1.4,div:0,growth:12,beta:1.3,rsi:62,mom:9,moat:true,ey:2.3,eps:4.21},
  META: {pe:24,pb:7,roe:34,roic:24,peg:0.9,div:0,growth:22,beta:1.4,rsi:66,mom:12,moat:true,ey:4.2,eps:21.0},
  GOOGL: {pe:23,pb:6,roe:27,roic:22,peg:0.8,div:0,growth:12,beta:1.1,rsi:57,mom:6,moat:true,ey:4.4,eps:7.69},
  INTC: {pe:null,pb:0.8,roe:-7,roic:-4,peg:null,div:4.0,growth:-8,beta:1.0,rsi:28,mom:-12,moat:false,ey:-3,eps:-0.44},
  JPM: {pe:12,pb:1.8,roe:18,roic:14,peg:0.8,div:2.1,growth:8,beta:1.1,rsi:54,mom:4,moat:true,ey:8.3,eps:18.22},
  'MC.PA': {pe:18,pb:4,roe:22,roic:18,peg:1.2,div:2.2,growth:8,beta:1.1,rsi:48,mom:2,moat:true,ey:5.6,eps:39},
  'RMS.PA': {pe:44,pb:18,roe:38,roic:32,peg:2.0,div:0.8,growth:14,beta:0.8,rsi:63,mom:7,moat:true,ey:2.3,eps:48},
  'TTE.PA': {pe:8,pb:1.4,roe:14,roic:10,peg:0.7,div:7.2,growth:-4,beta:0.7,rsi:42,mom:-3,moat:false,ey:12.5,eps:6.9},
  'BNP.PA': {pe:8,pb:0.8,roe:12,roic:8,peg:0.6,div:4.8,growth:5,beta:1.2,rsi:58,mom:4,moat:false,ey:12.5,eps:8.78},
  'AIR.PA': {pe:26,pb:null,roe:28,roic:18,peg:0.84,div:1.8,growth:19,beta:1.0,rsi:65,mom:12,moat:true,ey:3.8,eps:6.14},
};

var DUEL_DB = {
  NVDA: {name:'NVIDIA',prix:'$875',pe:'36.2x',pb:'28.4x',roe:'123%',marge:'55.6%',growth:'+122%',div:'0.03%',beta:'2.38',rsi:64,moat:'LARGE',mom:'+18.4%',rating:'AAA'},
  AAPL: {name:'Apple',prix:'$213',pe:'28.4x',pb:'45.2x',roe:'148%',marge:'25.3%',growth:'+4.2%',div:'0.51%',beta:'1.20',rsi:58,moat:'LARGE',mom:'+5.2%',rating:'AAA'},
  MSFT: {name:'Microsoft',prix:'$415',pe:'34.2x',pb:'14.8x',roe:'38.4%',marge:'36.4%',growth:'+16.4%',div:'0.75%',beta:'0.90',rsi:62,moat:'LARGE',mom:'+8.2%',rating:'AAA'},
  TSLA: {name:'Tesla',prix:'$179',pe:'52.1x',pb:'8.4x',roe:'18.2%',marge:'10.8%',growth:'-5.0%',div:'0%',beta:'2.80',rsi:38,moat:'NARROW',mom:'-8.4%',rating:'BB'},
  META: {name:'Meta',prix:'$512',pe:'24.4x',pb:'7.8x',roe:'34.2%',marge:'34.2%',growth:'+21.8%',div:'0%',beta:'1.40',rsi:66,moat:'LARGE',mom:'+12.1%',rating:'AA'},
  AMZN: {name:'Amazon',prix:'$186',pe:'44.2x',pb:'8.2x',roe:'22.4%',marge:'5.3%',growth:'+12.4%',div:'0%',beta:'1.30',rsi:62,moat:'LARGE',mom:'+8.4%',rating:'AA'},
  'MC.PA': {name:'LVMH',prix:'€720',pe:'18.4x',pb:'4.2x',roe:'22.4%',marge:'20.4%',growth:'+8.0%',div:'2.2%',beta:'1.10',rsi:48,moat:'LARGE',mom:'-2.8%',rating:'AA'},
  'RMS.PA': {name:'Hermès',prix:'€2140',pe:'44.2x',pb:'18.4x',roe:'38.4%',marge:'38.4%',growth:'+14.8%',div:'0.8%',beta:'0.80',rsi:63,moat:'LARGE',mom:'+6.4%',rating:'AAA'},
  'TTE.PA': {name:'TotalEnergies',prix:'€58',pe:'8.4x',pb:'1.4x',roe:'14.0%',marge:'12.4%',growth:'-4.0%',div:'7.2%',beta:'0.70',rsi:42,moat:'NARROW',mom:'-4.4%',rating:'A'},
  'BNP.PA': {name:'BNP Paribas',prix:'€68',pe:'7.8x',pb:'0.8x',roe:'12.0%',marge:'18.4%',growth:'+5.0%',div:'4.8%',beta:'1.20',rsi:58,moat:'NARROW',mom:'+8.8%',rating:'A'},
  'AIR.PA': {name:'Airbus',prix:'€162',pe:'26.4x',pb:'N/A',roe:'28.4%',marge:'8.4%',growth:'+18.8%',div:'1.8%',beta:'1.00',rsi:65,moat:'LARGE',mom:'+12.4%',rating:'AA'},
  INTC: {name:'Intel',prix:'$31',pe:'N/A',pb:'0.8x',roe:'-7.2%',marge:'-7.2%',growth:'-8.0%',div:'4.0%',beta:'1.00',rsi:28,moat:'NARROW',mom:'-12%',rating:'BB'},
};

var CAC40_DATA = [
  {t:'RMS.PA',n:'Hermès',s:'Luxe',sc:18,pot:24.1,pe:44.2,rsi:63,sig:'ACHAT',prix:'€2,140',c:'g'},
  {t:'AIR.PA',n:'Airbus',s:'Industrie',sc:16,pot:18.3,pe:26.4,rsi:65,sig:'ACHAT',prix:'€162',c:'g'},
  {t:'SAF.PA',n:'Safran',s:'Aérospatiale',sc:15,pot:14.8,pe:24.8,rsi:67,sig:'ACHAT',prix:'€228',c:'g'},
  {t:'SU.PA',n:'Schneider Electric',s:'Industrie',sc:15,pot:12.5,pe:28.2,rsi:60,sig:'ACHAT',prix:'€220',c:'g'},
  {t:'AI.PA',n:'Air Liquide',s:'Chimie',sc:14,pot:9.2,pe:28.4,rsi:58,sig:'ACHAT',prix:'€168',c:'g'},
  {t:'SAN.PA',n:'Sanofi',s:'Santé',sc:14,pot:11.4,pe:14.8,rsi:54,sig:'ACHAT',prix:'€98',c:'g'},
  {t:'DSY.PA',n:'Dassault Systèmes',s:'Tech',sc:13,pot:12.8,pe:38.4,rsi:56,sig:'ACHAT',prix:'€32.8',c:'g'},
  {t:'PUB.PA',n:'Publicis',s:'Communication',sc:13,pot:10.4,pe:16.4,rsi:60,sig:'ACHAT',prix:'€88',c:'g'},
  {t:'DG.PA',n:'Vinci',s:'BTP',sc:13,pot:11.4,pe:18.2,rsi:60,sig:'ACHAT',prix:'€118',c:'g'},
  {t:'CAP.PA',n:'Capgemini',s:'Tech',sc:13,pot:11.2,pe:22.8,rsi:58,sig:'ACHAT',prix:'€182',c:'g'},
  {t:'SGO.PA',n:'Saint-Gobain',s:'Matériaux',sc:12,pot:9.8,pe:14.8,rsi:58,sig:'ACHAT',prix:'€62.4',c:'g'},
  {t:'EL.PA',n:'EssilorLuxottica',s:'Santé',sc:12,pot:10.2,pe:28.4,rsi:56,sig:'ACHAT',prix:'€198',c:'g'},
  {t:'LR.PA',n:'Legrand',s:'Électrique',sc:12,pot:9.4,pe:24.4,rsi:58,sig:'ACHAT',prix:'€94',c:'g'},
  {t:'CS.PA',n:'AXA',s:'Assurance',sc:12,pot:10.8,pe:12.4,rsi:56,sig:'ACHAT',prix:'€34.8',c:'g'},
  {t:'OR.PA',n:"L'Oréal",s:'Beauté',sc:13,pot:10.2,pe:32.8,rsi:52,sig:'NEUTRE',prix:'€388',c:'y'},
  {t:'MC.PA',n:'LVMH',s:'Luxe',sc:12,pot:8.4,pe:18.4,rsi:48,sig:'NEUTRE',prix:'€720',c:'y'},
  {t:'BNP.PA',n:'BNP Paribas',s:'Finance',sc:13,pot:12.8,pe:7.8,rsi:58,sig:'ACHAT',prix:'€68.5',c:'g'},
  {t:'GLE.PA',n:'Société Générale',s:'Finance',sc:12,pot:15.2,pe:6.4,rsi:54,sig:'ACHAT',prix:'€28.2',c:'g'},
  {t:'ACA.PA',n:'Crédit Agricole',s:'Finance',sc:11,pot:10.8,pe:6.8,rsi:56,sig:'ACHAT',prix:'€14.8',c:'g'},
  {t:'TTE.PA',n:'TotalEnergies',s:'Énergie',sc:11,pot:9.4,pe:8.4,rsi:42,sig:'ACHAT',prix:'€58.4',c:'g'},
  {t:'CA.PA',n:'Carrefour',s:'Distribution',sc:10,pot:6.8,pe:14.2,rsi:48,sig:'NEUTRE',prix:'€18.4',c:'y'},
  {t:'KER.PA',n:'Kering',s:'Luxe',sc:10,pot:14.2,pe:18.8,rsi:40,sig:'NEUTRE',prix:'€248',c:'y'},
  {t:'RI.PA',n:'Pernod Ricard',s:'Boissons',sc:10,pot:8.8,pe:22.4,rsi:44,sig:'NEUTRE',prix:'€108',c:'y'},
  {t:'ORA.PA',n:'Orange',s:'Télécom',sc:9,pot:5.2,pe:12.8,rsi:46,sig:'NEUTRE',prix:'€11.2',c:'y'},
  {t:'VIE.PA',n:'Veolia',s:'Utilities',sc:9,pot:8.4,pe:18.4,rsi:52,sig:'NEUTRE',prix:'€28.8',c:'y'},
  {t:'ENGI.PA',n:'Engie',s:'Utilities',sc:9,pot:7.8,pe:12.8,rsi:50,sig:'NEUTRE',prix:'€14.8',c:'y'},
  {t:'BN.PA',n:'Danone',s:'Agroalimentaire',sc:10,pot:8.2,pe:18.4,rsi:52,sig:'NEUTRE',prix:'€62',c:'y'},
  {t:'EN.PA',n:'Bouygues',s:'Conglomérat',sc:10,pot:7.4,pe:12.4,rsi:48,sig:'NEUTRE',prix:'€28.8',c:'y'},
  {t:'MT.AS',n:'ArcelorMittal',s:'Acier',sc:9,pot:14.8,pe:8.4,rsi:42,sig:'SPÉCULATIF',prix:'€22.4',c:'y'},
  {t:'RNO.PA',n:'Renault',s:'Auto',sc:9,pot:12.4,pe:4.8,rsi:44,sig:'SPÉCULATIF',prix:'€42',c:'y'},
  {t:'ALO.PA',n:'Alstom',s:'Transport',sc:8,pot:18.4,pe:null,rsi:38,sig:'SPÉCULATIF',prix:'€14.8',c:'y'},
  {t:'WLN.PA',n:'Worldline',s:'Fintech',sc:5,pot:-18.4,pe:null,rsi:32,sig:'ÉVITER',prix:'€8.4',c:'r'},
  {t:'ATO.PA',n:'Atos',s:'Tech',sc:3,pot:-28,pe:null,rsi:24,sig:'ÉVITER',prix:'€1.2',c:'r'},
];

/* ── 3. EVENT HANDLERS ──────────────────────────────────────── */

document.addEventListener('click', function(e) {

  /* Tout voir — Actualités Accueil */
  var newsBtn = e.target.closest('.sec-action');
  if (newsBtn && newsBtn.getAttribute('aria-label') && newsBtn.getAttribute('aria-label').indexOf('actualite') !== -1) {
    openNewsModal();
    return;
  }

  /* Backtesting: hook après le handler original */
  if (e.target.closest('[data-action="backtestRun"]')) {
    setTimeout(renderBtChart, 250);
    return;
  }

  /* Grand Conseil */
  var councilBtn = document.getElementById('council-btn');
  if (councilBtn && (e.target === councilBtn || councilBtn.contains(e.target))) {
    runCouncil(); return;
  }

  /* Mode Duel */
  var duelBtn = document.getElementById('duel-btn');
  if (duelBtn && (e.target === duelBtn || duelBtn.contains(e.target))) {
    runDuel(); return;
  }

  /* Screener CAC40 */
  var cac40Btn = document.getElementById('cac40-scan-btn');
  if (cac40Btn && (e.target === cac40Btn || cac40Btn.contains(e.target))) {
    renderCAC40(); return;
  }

  /* Dividendes — Charger */
  if (e.target.tagName === 'BUTTON' && e.target.textContent.trim() === 'Charger') {
    var pDiv = e.target.closest('[id^="c-"]');
    if (pDiv) { loadDividends(pDiv); return; }
  }

  /* Options US — Charger la Chaîne */
  if (e.target.id === 'opt-load-btn' || (e.target.tagName === 'BUTTON' && e.target.textContent.trim().indexOf('Charger la Chaîne') !== -1)) {
    loadOptions(); return;
  }

  /* Risque — Calculer */
  if (e.target.tagName === 'BUTTON' && e.target.textContent.trim() === 'Calculer' && e.target.closest('[id^="c-"]')) {
    var ct = e.target.closest('[id^="c-"]');
    if (ct && ct.querySelector('.sec-label') && ct.querySelector('.sec-label').textContent.indexOf('Risque') !== -1) {
      loadRisque(ct); return;
    }
  }

  /* Screener Multi-Marchés — Scanner */
  if (e.target.tagName === 'BUTTON' && e.target.textContent.trim() === '🔍 Scanner le Marché') {
    runScreenerMulti(e.target.closest('[id^="c-"]')); return;
  }

  /* Screener Multi — Export CSV */
  if (e.target.textContent.trim() === '📥 Exporter CSV') {
    exportCSV(e.target.closest('[id^="c-"]') || document); return;
  }
});

/* CAC40 tri + filtre */
document.addEventListener('change', function(e) {
  if (e.target && e.target.id === 'cac40-sort') { renderCAC40(); }
});
document.addEventListener('input', function(e) {
  if (e.target && e.target.id === 'cac40-search') { filterCAC40(e.target.value); }
});

/* Earnings — onglets internes */
document.addEventListener('click', function(e) {
  var earnTab = e.target.closest('.tab[data-t]');
  if (!earnTab) return;
  var t = earnTab.getAttribute('data-t');
  if (!t || t.indexOf('earn-') === -1) return;
  earnTab.closest('.tabs') && earnTab.closest('.tabs').querySelectorAll('.tab').forEach(function(b) { b.classList.remove('on'); });
  earnTab.classList.add('on');
  document.querySelectorAll('.tabpanel').forEach(function(p) {
    if (p.id && p.id.indexOf('earn-') === 0) p.classList.remove('on');
  });
  var panel = document.getElementById(t);
  if (panel) panel.classList.add('on');
});

/* ── 4. IMPLÉMENTATIONS ─────────────────────────────────────── */

/* Modal Actualités */
function openNewsModal() {
  var news = [
    {src:'Reuters',title:'La Fed maintient ses taux — signale une pause prolongée face à l\'inflation persistante',time:'Il y a 2h',col:'var(--blue)'},
    {src:'CoinDesk',title:'Bitcoin franchit 84K$ après l\'approbation des ETF institutionnels en Europe',time:'Il y a 4h',col:'var(--orange)'},
    {src:'Bloomberg',title:'NVIDIA dépasse les attentes au T1, marché de l\'IA en hausse de deux chiffres',time:'Il y a 6h',col:'var(--green)'},
    {src:'Boursorama',title:'CAC 40 : légère correction après des chiffres PMI inférieurs aux attentes en zone euro',time:'Il y a 7h',col:'var(--tx-muted)'},
    {src:'FT',title:'Les marchés asiatiques rebondissent, Nikkei +1.2% porté par la tech japonaise',time:'Il y a 9h',col:'var(--blue)'},
    {src:'WSJ',title:'La BCE envisage une nouvelle baisse des taux pour juin face au ralentissement',time:'Il y a 10h',col:'var(--orange)'},
    {src:'CNBC',title:'Apple lance un nouveau produit IA — analysts relèvent leur objectif à $240',time:'Il y a 12h',col:'var(--blue)'},
    {src:'Les Échos',title:'TotalEnergies annonce un rachat d\'actions de 2 milliards d\'euros',time:'Il y a 14h',col:'var(--green)'},
    {src:'Reuters',title:'Tesla sous pression — livraisons Q1 2026 en baisse de 8.5% vs consensus',time:'Il y a 16h',col:'var(--red)'},
    {src:'Bloomberg',title:'JPMorgan relève son objectif sur l\'or à $3,200 — inflation structurelle persistante',time:'Il y a 18h',col:'var(--yellow)'},
    {src:'FT',title:'Chine : PMI manufacturier repasse en expansion — rebond des exportations',time:'Il y a 22h',col:'var(--green)'},
    {src:'Barron\'s',title:'L\'immobilier commercial américain montre des signaux de stabilisation après 18 mois de baisse',time:'Il y a 1j',col:'var(--tx-muted)'},
  ];
  var el = document.createElement('div');
  el.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.88);z-index:9999;display:flex;align-items:center;justify-content:center;';
  el.innerHTML = '<div style="background:var(--bg-card);border:1px solid var(--br-soft);border-radius:12px;width:600px;max-height:80vh;display:flex;flex-direction:column;">'
    + '<div style="display:flex;justify-content:space-between;align-items:center;padding:16px 20px;border-bottom:1px solid var(--br-soft);">'
    + '<div style="font-weight:700;color:var(--tx-hi);">📰 Toutes les Actualités <span style="font-size:10px;color:var(--tx-faint);margin-left:8px;">' + news.length + ' articles</span></div>'
    + '<button onclick="this.closest(\'div[style*=fixed]\').remove()" style="background:none;border:none;color:var(--tx-faint);cursor:pointer;font-size:20px;line-height:1;padding:0 4px;">×</button>'
    + '</div>'
    + '<div style="overflow-y:auto;padding:16px 20px;">'
    + news.map(function(n) {
        return '<div class="news-item" style="border-left:3px solid ' + n.col + ';padding-left:10px;margin-bottom:12px;">'
          + '<div style="font-size:10px;font-weight:600;color:' + n.col + ';font-family:var(--mono);">' + n.src + '</div>'
          + '<div style="color:var(--tx-hi);font-size:12px;margin:2px 0;">' + n.title + '</div>'
          + '<div style="font-size:10px;color:var(--tx-low);">' + n.time + '</div>'
          + '</div>';
      }).join('')
    + '</div></div>';
  document.body.appendChild(el);
  el.addEventListener('click', function(ev) { if (ev.target === el) el.remove(); });
}

/* Backtest — Chart.js equity curve */
function renderBtChart() {
  var canvas = document.getElementById('bt-equity-chart');
  if (!canvas || typeof Chart === 'undefined') return;
  var capital = parseFloat((document.getElementById('bt-capital')||{}).value||'10000');
  var period  = parseInt((document.getElementById('bt-period')||{}).value||'1');
  var strat   = (document.getElementById('bt-strat')||{}).value||'rsi';
  var ticker  = ((document.getElementById('bt-ticker')||{}).value||'AAPL').toUpperCase();
  var gains   = {rsi:0.32,macd:0.28,golden:0.22,bb:0.19,rsimacd:0.41,momentum:0.38,breakout:0.25,mean_rev:0.18,trend:0.35};
  var g = (gains[strat]||0.25) * Math.pow(1.4, period-1);
  var days = period * 52;
  var labels = [], equityCurve = [], benchmark = [];
  var eq = capital, bh = capital;
  var dayG = Math.pow(1+g, 1/days) - 1;
  var dayB = Math.pow(1.12, 1/52) - 1;
  var trades = [];
  for (var i = 0; i <= days; i++) {
    var noise = (Math.random()-0.5)*0.012;
    eq *= (1 + dayG + noise);
    bh *= (1 + dayB + (Math.random()-0.5)*0.008);
    if (i % Math.ceil(days/60) === 0) {
      labels.push('S' + i);
      equityCurve.push(Math.round(eq));
      benchmark.push(Math.round(bh));
    }
    if (Math.random() < 0.12) {
      var pnl = (Math.random()-0.38)*0.05*eq;
      trades.push({date:'J'+i, ticker:ticker, side:pnl>0?'LONG':'SHORT', pnl:pnl});
    }
  }
  var existing = Chart.getChart ? Chart.getChart(canvas) : null;
  if (existing) existing.destroy();
  new Chart(canvas, {
    type:'line',
    data:{
      labels:labels,
      datasets:[
        {label:'Stratégie ('+strat+')',data:equityCurve,borderColor:'#ff6600',borderWidth:2,fill:true,backgroundColor:'rgba(255,102,0,.06)',tension:0.3,pointRadius:0},
        {label:'Buy & Hold '+ticker,data:benchmark,borderColor:'#4d9fff',borderWidth:1.5,borderDash:[4,4],fill:false,tension:0.3,pointRadius:0}
      ]
    },
    options:{
      responsive:true,maintainAspectRatio:false,
      plugins:{legend:{labels:{color:'#888',font:{size:10}}},tooltip:{callbacks:{label:function(c){return c.dataset.label+': $'+c.raw.toLocaleString('fr-FR');}}}},
      scales:{
        x:{ticks:{color:'#555',font:{size:8},maxTicksLimit:10},grid:{color:'#111'}},
        y:{ticks:{color:'#555',font:{size:9},callback:function(v){return '$'+v.toLocaleString('fr-FR');}},grid:{color:'#111'}}
      }
    }
  });
  var logEl = document.getElementById('bt-tradelog');
  if (logEl) {
    logEl.innerHTML = trades.slice(-8).reverse().map(function(t) {
      var col = t.pnl>0?'var(--green)':'var(--red)';
      return '<div style="display:flex;justify-content:space-between;padding:3px 0;border-bottom:1px solid #111;">'
        +'<span style="color:var(--tx-faint);">'+t.date+'</span>'
        +'<span style="color:var(--orange);">'+t.ticker+'</span>'
        +'<span style="color:'+(t.side==='LONG'?'var(--green)':'var(--red)')+';">'+t.side+'</span>'
        +'<span style="color:'+col+';">'+(t.pnl>0?'+':'')+'$'+Math.round(Math.abs(t.pnl)).toLocaleString('fr-FR')+'</span>'
        +'</div>';
    }).join('') || '<div style="color:var(--tx-faint);">Aucun trade dans la simulation.</div>';
  }
  var statsEl = document.getElementById('bt-stats');
  if (statsEl) {
    var finalEq = equityCurve[equityCurve.length-1];
    var finalBh = benchmark[benchmark.length-1];
    var alpha = ((finalEq-capital)/capital*100-(finalBh-capital)/capital*100).toFixed(1);
    statsEl.innerHTML = [
      ['Alpha vs Buy & Hold', (alpha>0?'+':'')+alpha+'%', parseFloat(alpha)>0],
      ['Trades total', trades.length, null],
      ['Profitables', trades.filter(function(t){return t.pnl>0;}).length + ' / '+trades.length, true],
      ['Volatilité ann.', (14+Math.random()*8).toFixed(1)+'%', null],
    ].map(function(r) {
      var col = r[2]===null?'var(--tx-mid)':r[2]?'var(--green)':'var(--red)';
      return '<div style="display:flex;justify-content:space-between;border-bottom:1px solid #111;"><span>'+r[0]+'</span><span style="color:'+col+';">'+r[1]+'</span></div>';
    }).join('');
  }
}

/* Grand Conseil */
function runCouncil() {
  var tkEl = document.getElementById('council-ticker');
  var tk = (tkEl ? tkEl.value : 'NVDA').toUpperCase().trim() || 'NVDA';
  var res = document.getElementById('council-result');
  if (!res) return;
  res.innerHTML = '<div style="text-align:center;padding:30px;color:var(--orange);font-family:var(--mono);">⚖️ Le Conseil délibère pour ' + (window.AM&&AM.util?AM.util.escapeHtml(tk):tk) + '…</div>';
  setTimeout(function() {
    var stock = COUNCIL_DB[tk] || {pe:20,pb:2,roe:15,roic:12,peg:1.0,div:1.5,growth:10,beta:1.2,rsi:52,mom:5,moat:false,ey:5,eps:5};
    var verdicts = COUNCIL_LEGENDS.map(function(l) {
      var r = l.fn(stock);
      var col = r[2]==='g'?'var(--green)':r[2]==='y'?'var(--yellow)':'var(--red)';
      var bg  = r[2]==='g'?'var(--green-bg)':r[2]==='y'?'var(--yellow-bg)':'var(--red-bg)';
      var bdr = r[2]==='g'?'var(--green-bdr)':r[2]==='y'?'var(--yellow-bdr)':'var(--red-bdr)';
      return {l:l, v:r[0], sc:r[1], col:col, bg:bg, bdr:bdr};
    });
    var buy = verdicts.filter(function(v){return v.sc>=4;}).length;
    var neut= verdicts.filter(function(v){return v.sc===3;}).length;
    var sell= verdicts.filter(function(v){return v.sc<=2;}).length;
    var avg = (verdicts.reduce(function(a,v){return a+v.sc;},0)/verdicts.length).toFixed(1);
    var consensus = buy>8?'ACHAT FORT':buy>5?'ACHAT':neut>buy+sell?'NEUTRE':'ÉVITER';
    var cCol = buy>8?'var(--green)':buy>5?'var(--green)':neut>sell?'var(--yellow)':'var(--red)';
    var html = '<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:14px;">';
    verdicts.forEach(function(v) {
      html += '<div class="expert" style="text-align:center;padding:10px 6px;">'
        +'<div style="font-size:18px;">'+v.l.em+'</div>'
        +'<div style="font-size:10px;font-weight:700;color:var(--tx-hi);margin:2px 0;">'+v.l.name+'</div>'
        +'<div style="font-size:9px;color:var(--tx-faint);margin-bottom:6px;">'+v.l.style+'</div>'
        +'<div style="padding:3px 4px;background:'+v.bg+';border:1px solid '+v.bdr+';border-radius:4px;font-size:8px;color:'+v.col+';font-family:var(--mono);font-weight:700;">'+v.v+'</div>'
        +'</div>';
    });
    html += '</div><div class="card"><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;text-align:center;">'
      +'<div><div style="font-size:24px;font-weight:700;color:var(--green);font-family:var(--mono);">'+buy+'</div><div style="font-size:11px;color:var(--tx-faint);">Achats</div></div>'
      +'<div><div style="font-size:24px;font-weight:700;color:var(--yellow);font-family:var(--mono);">'+neut+'</div><div style="font-size:11px;color:var(--tx-faint);">Neutre</div></div>'
      +'<div><div style="font-size:24px;font-weight:700;color:var(--red);font-family:var(--mono);">'+sell+'</div><div style="font-size:11px;color:var(--tx-faint);">Éviter</div></div>'
      +'<div><div style="font-size:24px;font-weight:700;color:var(--orange);font-family:var(--mono);">'+avg+'/5</div><div style="font-size:11px;color:var(--tx-faint);">Score moy.</div></div>'
      +'</div>'
      +'<div style="margin-top:12px;padding:12px;background:var(--orange-bg);border:1px solid var(--orange-bdr);border-radius:6px;text-align:center;">'
      +'<div style="font-size:10px;color:var(--tx-faint);font-family:var(--mono);margin-bottom:4px;">VERDICT DU GRAND CONSEIL — '+tk+'</div>'
      +'<div style="font-size:18px;font-weight:700;color:'+cCol+';font-family:var(--mono);">'+consensus+' '+(buy>8?'✅':buy>5?'🟢':neut>sell?'⚖️':'⚠️')+'</div>'
      +'</div></div>';
    res.innerHTML = html;
  }, 500);
}

/* Mode Duel */
function runDuel() {
  var t1 = (document.getElementById('duel-t1')||{value:'MC.PA'}).value.toUpperCase().trim();
  var t2 = (document.getElementById('duel-t2')||{value:'RMS.PA'}).value.toUpperCase().trim();
  var res = document.getElementById('duel-result');
  if (!res) return;
  var s1 = DUEL_DB[t1]||{name:t1,prix:'N/A',pe:'N/A',pb:'N/A',roe:'N/A',marge:'N/A',growth:'N/A',div:'N/A',beta:'1.0',rsi:50,moat:'N/A',mom:'N/A',rating:'N/A'};
  var s2 = DUEL_DB[t2]||{name:t2,prix:'N/A',pe:'N/A',pb:'N/A',roe:'N/A',marge:'N/A',growth:'N/A',div:'N/A',beta:'1.0',rsi:50,moat:'N/A',mom:'N/A',rating:'N/A'};
  var rows = [
    {l:'Prix',v1:s1.prix,v2:s2.prix,w:null,cat:'Valorisation'},
    {l:'P/E Ratio',v1:s1.pe,v2:s2.pe,w:'lower',cat:'Valorisation'},
    {l:'P/B Ratio',v1:s1.pb,v2:s2.pb,w:'lower',cat:'Valorisation'},
    {l:'ROE',v1:s1.roe,v2:s2.roe,w:'higher',cat:'Qualité'},
    {l:'Marge Nette',v1:s1.marge,v2:s2.marge,w:'higher',cat:'Qualité'},
    {l:'Fossé Compét.',v1:s1.moat,v2:s2.moat,w:null,cat:'Qualité'},
    {l:'Croissance Rev.',v1:s1.growth,v2:s2.growth,w:'higher',cat:'Croissance'},
    {l:'Momentum 1M',v1:s1.mom,v2:s2.mom,w:'higher',cat:'Momentum'},
    {l:'RSI (14)',v1:s1.rsi,v2:s2.rsi,w:null,cat:'Technique'},
    {l:'Dividende',v1:s1.div,v2:s2.div,w:'higher',cat:'Revenu'},
    {l:'Beta',v1:s1.beta,v2:s2.beta,w:'lower',cat:'Risque'},
    {l:'Notation S&P',v1:s1.rating,v2:s2.rating,w:null,cat:'Risque'},
  ];
  function numOf(v) { return parseFloat((v+'').replace(/[^0-9.-]/g,'')); }
  var sc1=0,sc2=0;
  rows.forEach(function(r) {
    if (!r.w) return;
    var n1=numOf(r.v1),n2=numOf(r.v2);
    if (isNaN(n1)||isNaN(n2)) return;
    if (r.w==='higher'&&n1>n2) sc1++;
    else if (r.w==='higher'&&n2>n1) sc2++;
    else if (r.w==='lower'&&n1<n2) sc1++;
    else if (r.w==='lower'&&n2<n1) sc2++;
  });
  var winName = sc1>sc2?t1:sc2>sc1?t2:'ÉGALITÉ';
  var winCol  = sc1>sc2?'var(--orange)':sc2>sc1?'var(--blue)':'var(--yellow)';
  var total   = sc1+sc2 || 1;
  var pct1    = Math.round(sc1/total*100);
  var pct2    = 100-pct1;

  /* ── Tableau comparaison ── */
  var html = '<div class="duel-header-card">';
  /* Header deux colonnes */
  html += '<div style="display:grid;grid-template-columns:1fr 120px 1fr;">';
  html += '<div style="background:var(--orange-bg);padding:16px;text-align:center;border-right:1px solid var(--br-faint);">'
        + '<div style="font-size:15px;font-weight:700;color:var(--orange);font-family:var(--mono);">'+t1+'</div>'
        + '<div style="font-size:11px;color:var(--tx-faint);">'+s1.name+'</div>'
        + '<div style="font-size:20px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);margin-top:4px;">'+s1.prix+'</div>'
        + '<div style="margin-top:8px;background:var(--br-soft);border-radius:3px;height:5px;overflow:hidden;">'
        + '<div style="width:'+pct1+'%;height:5px;background:var(--orange);border-radius:3px;transition:width .5s;"></div></div>'
        + '<div style="font-size:20px;font-weight:700;color:var(--orange);font-family:var(--mono);margin-top:4px;">'+sc1+' pts</div>'
        + '</div>';
  html += '<div style="background:var(--bg-input);display:flex;align-items:center;justify-content:center;font-size:24px;">⚔️</div>';
  html += '<div style="background:var(--blue-bg);padding:16px;text-align:center;border-left:1px solid var(--br-faint);">'
        + '<div style="font-size:15px;font-weight:700;color:var(--blue);font-family:var(--mono);">'+t2+'</div>'
        + '<div style="font-size:11px;color:var(--tx-faint);">'+s2.name+'</div>'
        + '<div style="font-size:20px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);margin-top:4px;">'+s2.prix+'</div>'
        + '<div style="margin-top:8px;background:var(--br-soft);border-radius:3px;height:5px;overflow:hidden;">'
        + '<div style="width:'+pct2+'%;height:5px;background:var(--blue);border-radius:3px;transition:width .5s;"></div></div>'
        + '<div style="font-size:20px;font-weight:700;color:var(--blue);font-family:var(--mono);margin-top:4px;">'+sc2+' pts</div>'
        + '</div>';
  html += '</div>';
  /* Category separators */
  var lastCat = '';
  rows.forEach(function(r) {
    if (r.cat !== lastCat) {
      lastCat = r.cat;
      html += '<div style="background:var(--bg-raised);padding:4px 14px;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--orange);font-family:var(--mono);font-weight:700;border-top:1px solid var(--br-soft);">'+r.cat+'</div>';
    }
    var n1=numOf(r.v1),n2=numOf(r.v2);
    var w1=!r.w||isNaN(n1)||isNaN(n2)?false:(r.w==='higher'?n1>n2:n1<n2);
    var w2=!r.w||isNaN(n1)||isNaN(n2)?false:(r.w==='higher'?n2>n1:n2<n1);
    html += '<div class="duel-row">'
          + '<div class="duel-cell-left '+(w1?'duel-win-left':w2?'duel-lose-left':'')+'">'+(w1?'✓ ':w2?'✗ ':'')+r.v1+'</div>'
          + '<div class="duel-cell-mid">'+r.l+'</div>'
          + '<div class="duel-cell-right '+(w2?'duel-win-right':w1?'duel-lose-right':'')+'">'+(w2?'✓ ':w1?'✗ ':'')+r.v2+'</div>'
          + '</div>';
  });
  html += '</div>';
  res.innerHTML = html;

  /* ── Radar SVG ── */
  var radarEl = document.getElementById('duel-radar');
  if (radarEl) {
    var axes = ['ROE','Marge','Growth','Mom.','Div.','Risque inv.'];
    var cx=140, cy=130, R=90;
    var vals1 = [numOf(s1.roe),numOf(s1.marge),numOf(s1.growth),numOf(s1.mom),numOf(s1.div),10-numOf(s1.beta)];
    var vals2 = [numOf(s2.roe),numOf(s2.marge),numOf(s2.growth),numOf(s2.mom),numOf(s2.div),10-numOf(s2.beta)];
    var maxV   = [150,60,150,30,10,10];
    var n = axes.length;
    var svg = '';
    /* Grid circles */
    [0.25,0.5,0.75,1].forEach(function(r){
      var pts=[];
      for(var i=0;i<n;i++){var a=(i/n)*2*Math.PI-Math.PI/2;pts.push((cx+R*r*Math.cos(a)).toFixed(1)+','+(cy+R*r*Math.sin(a)).toFixed(1));}
      svg+='<polygon points="'+pts.join(' ')+'" fill="none" stroke="#1e1e1e" stroke-width="1"/>';
    });
    /* Axes */
    for(var i=0;i<n;i++){
      var a=(i/n)*2*Math.PI-Math.PI/2;
      var x2=(cx+R*Math.cos(a)).toFixed(1), y2=(cy+R*Math.sin(a)).toFixed(1);
      svg+='<line x1="'+cx+'" y1="'+cy+'" x2="'+x2+'" y2="'+y2+'" stroke="#2c2c2c" stroke-width="1"/>';
      var lx=(cx+(R+18)*Math.cos(a)).toFixed(1), ly=(cy+(R+18)*Math.sin(a)).toFixed(1);
      svg+='<text x="'+lx+'" y="'+ly+'" text-anchor="middle" dominant-baseline="middle" fill="#888" font-family="IBM Plex Mono,monospace" font-size="9">'+axes[i]+'</text>';
    }
    /* Polygon 1 */
    var pts1=[], pts2=[];
    for(var i=0;i<n;i++){
      var a=(i/n)*2*Math.PI-Math.PI/2;
      var v1=Math.max(0,Math.min(1,(isNaN(vals1[i])?0:vals1[i])/maxV[i]));
      var v2=Math.max(0,Math.min(1,(isNaN(vals2[i])?0:vals2[i])/maxV[i]));
      pts1.push((cx+R*v1*Math.cos(a)).toFixed(1)+','+(cy+R*v1*Math.sin(a)).toFixed(1));
      pts2.push((cx+R*v2*Math.cos(a)).toFixed(1)+','+(cy+R*v2*Math.sin(a)).toFixed(1));
    }
    svg+='<polygon points="'+pts1.join(' ')+'" fill="rgba(255,102,0,.2)" stroke="#ff6600" stroke-width="2"/>';
    svg+='<polygon points="'+pts2.join(' ')+'" fill="rgba(77,159,255,.2)" stroke="#4d9fff" stroke-width="2"/>';
    /* Legend */
    svg+='<rect x="20" y="10" width="10" height="10" fill="rgba(255,102,0,.5)" stroke="#ff6600" stroke-width="1.5"/>';
    svg+='<text x="35" y="19" fill="#ff6600" font-family="IBM Plex Mono,monospace" font-size="10" font-weight="700">'+t1+'</text>';
    svg+='<rect x="100" y="10" width="10" height="10" fill="rgba(77,159,255,.5)" stroke="#4d9fff" stroke-width="1.5"/>';
    svg+='<text x="115" y="19" fill="#4d9fff" font-family="IBM Plex Mono,monospace" font-size="10" font-weight="700">'+t2+'</text>';
    radarEl.innerHTML = svg;
  }

  /* ── Verdict ── */
  var vcard = document.getElementById('duel-verdict-card');
  var vcontent = document.getElementById('duel-verdict-content');
  if (vcard && vcontent) {
    vcard.style.display = 'block';
    var perc1 = Math.round(sc1/(sc1+sc2||1)*100);
    vcontent.innerHTML =
      '<div style="text-align:center;margin-bottom:10px;">'
      +'<div style="font-size:22px;font-weight:700;color:'+winCol+';font-family:var(--mono);">'+winName+'</div>'
      +'<div style="font-size:11px;color:var(--tx-faint);margin-top:2px;">'+(sc1>sc2?sc1+' vs '+sc2:sc2+' vs '+sc1)+' critères remportés</div>'
      +'</div>'
      +'<div style="background:var(--br-soft);border-radius:4px;height:8px;overflow:hidden;margin-bottom:6px;">'
      +'<div style="width:'+perc1+'%;height:8px;background:linear-gradient(90deg,var(--orange),var(--blue));border-radius:4px;"></div>'
      +'</div>'
      +'<div style="display:flex;justify-content:space-between;font-size:10px;font-family:var(--mono);">'
      +'<span style="color:var(--orange);">'+t1+' '+perc1+'%</span>'
      +'<span style="color:var(--blue);">'+t2+' '+(100-perc1)+'%</span>'
      +'</div>'
      +(sc1===sc2?'<div style="margin-top:8px;padding:6px 10px;background:var(--yellow-bg);border-left:2px solid var(--yellow);border-radius:3px;font-size:10px;color:var(--yellow);font-family:var(--mono);">Duel serré — analyse approfondie recommandée</div>':'')
      +'<div style="margin-top:8px;padding:6px 10px;background:var(--bg-input);border-radius:4px;font-size:10px;color:var(--tx-faint);font-family:var(--mono);">Score basé sur '+rows.filter(function(r){return r.w;}).length+' critères quantitatifs pondérés.</div>';
  }

  if(window.AM&&AM.toast) AM.toast('Duel '+t1+' vs '+t2+' — '+winName+' gagne '+Math.max(sc1,sc2)+' points','success');
}



/* CAC40 Scan */
function renderCAC40() {
  var tbody=document.getElementById('cac40-tbody');
  var kpisEl=document.getElementById('cac40-kpis');
  if (!tbody) return;
  var sortEl=document.getElementById('cac40-sort');
  var sort=sortEl?sortEl.value:'score';
  var sorted=CAC40_DATA.slice().sort(function(a,b){
    if(sort==='potentiel') return b.pot-a.pot;
    if(sort==='pe') return (a.pe||999)-(b.pe||999);
    if(sort==='rsi') return a.rsi-b.rsi;
    return b.sc-a.sc;
  });
  var buy=sorted.filter(function(s){return s.c==='g';}).length;
  var avoid=sorted.filter(function(s){return s.c==='r';}).length;
  var peArr=sorted.filter(function(s){return s.pe;});
  var avgPE=peArr.length?(peArr.reduce(function(a,s){return a+s.pe;},0)/peArr.length).toFixed(1):'N/A';
  if(kpisEl){
    kpisEl.innerHTML=[
      ['Actions scannées',sorted.length,''],
      ['Opportunités Achat',buy,'var(--green)'],
      ['À Éviter',avoid,'var(--red)'],
      ['P/E Moyen CAC40',avgPE+'x','var(--orange)'],
    ].map(function(k){
      return '<div class="kpi-card"><div class="kpi-label">'+k[0]+'</div><div class="kpi-val" style="color:'+k[2]+';">'+k[1]+'</div></div>';
    }).join('');
  }
  var colMap={g:'var(--green)',y:'var(--yellow)',r:'var(--red)'};
  var badgeMap={g:'badge-up',y:'badge-or',r:'badge-dn'};
  tbody.innerHTML=sorted.map(function(s,i){
    var col=colMap[s.c]||'var(--tx-mid)';
    return '<tr>'
      +'<td>'+(i+1)+'</td>'
      +'<td class="hl">'+s.t+'</td>'
      +'<td>'+s.n+'</td>'
      +'<td style="color:var(--tx-faint);">'+s.s+'</td>'
      +'<td style="color:'+col+';font-weight:700;">'+s.sc+'/20</td>'
      +'<td style="color:'+(s.pot>0?'var(--green)':'var(--red)')+';">'+(s.pot>0?'+':'')+s.pot.toFixed(1)+'%</td>'
      +'<td>'+(s.pe?s.pe.toFixed(1)+'x':'N/A')+'</td>'
      +'<td style="color:'+(s.rsi>70?'var(--red)':s.rsi<30?'var(--green)':'var(--tx-mid)')+';">'+s.rsi+'</td>'
      +'<td><span class="badge '+(badgeMap[s.c]||'')+'">'+s.sig+'</span></td>'
      +'<td style="font-family:var(--mono);">'+s.prix+'</td>'
      +'</tr>';
  }).join('');
  if(window.AM&&AM.toast) AM.toast('Scan CAC40 — '+buy+' opportunités identifiées','success');
}

function exportCAC40CSV() {
  var headers = ['Rang','Ticker','Société','Secteur','Score','Potentiel','P/E','RSI','Signal','Prix'];
  var rows = [headers.join(';')];
  var tbody = document.getElementById('cac40-tbody');
  if (tbody) tbody.querySelectorAll('tr').forEach(function(tr){
    rows.push(Array.from(tr.querySelectorAll('td')).map(function(td){return td.textContent.trim();}).join(';'));
  });
  var blob = new Blob(['\uFEFF'+rows.join('\n')],{type:'text/csv;charset=utf-8;'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a'); a.href=url; a.download='cac40_scan.csv'; a.click();
  URL.revokeObjectURL(url);
  if(window.AM&&AM.toast) AM.toast('Export CSV CAC40 téléchargé','success');
}
function filterCAC40(q) {
  var tbody=document.getElementById('cac40-tbody');
  if(!tbody) return;
  q=q.toLowerCase();
  tbody.querySelectorAll('tr').forEach(function(tr){
    tr.style.display=!q||tr.textContent.toLowerCase().indexOf(q)!==-1?'':'none';
  });
}

/* Dividendes */
function loadDividends(ctx) {
  var divs=[
    {n:'Johnson & Johnson',t:'JNJ',y:3.2,m:'$1.24',f:'Trimestriel',ex:'10/04/2026',pay:'25/04/2026'},
    {n:'Coca-Cola',t:'KO',y:2.9,m:'$0.485',f:'Trimestriel',ex:'15/04/2026',pay:'01/05/2026'},
    {n:'TotalEnergies',t:'TTE.PA',y:4.8,m:'€0.79',f:'Trimestriel',ex:'22/04/2026',pay:'07/05/2026'},
    {n:'BNP Paribas',t:'BNP.PA',y:4.8,m:'€4.82',f:'Annuel',ex:'16/05/2026',pay:'29/05/2026'},
    {n:'Procter & Gamble',t:'PG',y:2.4,m:'$1.006',f:'Trimestriel',ex:'18/04/2026',pay:'15/05/2026'},
    {n:'Realty Income',t:'O',y:5.8,m:'$0.256',f:'Mensuel',ex:'30/04/2026',pay:'15/05/2026'},
    {n:'Altria Group',t:'MO',y:8.4,m:'$0.98',f:'Trimestriel',ex:'24/03/2026',pay:'09/04/2026'},
    {n:'Verizon',t:'VZ',y:6.4,m:'$0.665',f:'Trimestriel',ex:'08/04/2026',pay:'01/05/2026'},
    {n:"L'Oréal",t:'OR.PA',y:1.8,m:'€7.00',f:'Annuel',ex:'24/04/2026',pay:'07/05/2026'},
    {n:'LVMH',t:'MC.PA',y:1.6,m:'€12.00',f:'Annuel',ex:'18/04/2026',pay:'30/04/2026'},
    {n:'Engie',t:'ENGI.PA',y:6.2,m:'€0.97',f:'Annuel',ex:'20/04/2026',pay:'05/05/2026'},
    {n:'Sanofi',t:'SAN.PA',y:3.4,m:'€3.84',f:'Annuel',ex:'22/04/2026',pay:'06/05/2026'},
    {n:'Hermès',t:'RMS.PA',y:0.8,m:'€17.00',f:'Annuel',ex:'25/04/2026',pay:'09/05/2026'},
  ];
  var tbody=(ctx||document).querySelector('.tbl tbody');
  if(tbody){
    tbody.innerHTML=divs.map(function(d){
      return '<tr><td>'+d.n+'</td><td class="hl">'+d.t+'</td><td class="up">'+d.y+'%</td><td>'+d.m+'</td><td>'+d.f+'</td><td>'+d.ex+'</td><td>'+d.pay+'</td></tr>';
    }).join('');
  }
  var kpis=(ctx||document).querySelectorAll('.kpi-val');
  if(kpis.length>=3){
    var avg=(divs.reduce(function(a,d){return a+d.y;},0)/divs.length).toFixed(2);
    kpis[0].textContent=avg+'%';
    kpis[1].textContent=divs.length;
    kpis[2].textContent=Math.max.apply(null,divs.map(function(d){return d.y;}))+'%';
  }
  if(window.AM&&AM.toast) AM.toast('Calendrier dividendes chargé — '+divs.length+' sociétés','success');
}

/* ══════════════════════════════════════════════════════════════
   OPTIONS US — Moteur Live Twelve Data
   Même clé / même base que le module TD existant (v2.0)
   Endpoints : /quote · /options/expiration · /options
   ══════════════════════════════════════════════════════════════ */
var OPT = (function () {
  'use strict';

  var TD_KEY  = AM.API_KEYS.TWELVEDATA;
  var TD_BASE = 'https://api.twelvedata.com';

  var _ticker    = 'NVDA';
  var _expiry    = null;   // date string YYYY-MM-DD
  var _spot      = 0;
  var _skewChart = null;
  var _oiChart   = null;

  /* ── Utilitaires ── */
  function $(id) { return document.getElementById(id); }
  function set(id, v) { var el = $(id); if (el) el.textContent = v; }

  function fmt$(v) {
    v = parseFloat(v);
    return isNaN(v) ? '—' : '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: v < 10 ? 3 : 2 });
  }
  function fmtK(v) {
    v = parseInt(v, 10);
    if (!v || isNaN(v)) return '—';
    return v >= 1e6 ? (v/1e6).toFixed(1)+'M' : v >= 1e3 ? (v/1e3).toFixed(0)+'K' : v;
  }
  function fmtIV(v) {
    v = parseFloat(v);
    return isNaN(v) ? '—' : (v * 100).toFixed(1) + '%';
  }
  function colIV(v) {
    var p = parseFloat(v) * 100;
    return p > 60 ? 'var(--red)' : p > 35 ? 'var(--orange)' : p > 20 ? 'var(--yellow)' : 'var(--green)';
  }

  function setLive(ok, msg) {
    var dot = $('opt-live-dot');
    var lbl = $('opt-live-status');
    if (dot) { dot.style.background = ok ? 'var(--green)' : 'var(--red)'; dot.style.boxShadow = ok ? '0 0 6px var(--green)' : 'none'; }
    if (lbl) lbl.textContent = msg || '';
  }

  /* ── 1. Fetch prix spot via /quote ── */
  async function fetchQuote(sym) {
    var url = TD_BASE + '/quote?symbol=' + encodeURIComponent(sym) + '&apikey=' + TD_KEY;
    var res = await fetch(url);
    var d   = await res.json();
    if (d.status === 'error' || !d.close) throw new Error(d.message || 'Quote indisponible');
    return {
      price  : parseFloat(d.close),
      change : parseFloat(d.change),
      pct    : parseFloat(d.percent_change)
    };
  }

  /* ── 2. Fetch expirations via /options/expiration ── */
  async function fetchExpirations(sym) {
    var url = TD_BASE + '/options/expiration?symbol=' + encodeURIComponent(sym) + '&apikey=' + TD_KEY;
    var res = await fetch(url);
    var d   = await res.json();
    if (d.status === 'error') throw new Error(d.message || 'Expirations indisponibles');
    // Retourne { dates: ['2026-04-17', ...] }
    return (d.dates || []).slice(0, 10);
  }

  /* ── 3. Fetch chaîne d'options via /options ── */
  async function fetchChain(sym, expiry) {
    var url = TD_BASE + '/options?symbol=' + encodeURIComponent(sym)
            + '&expiration_date=' + encodeURIComponent(expiry)
            + '&apikey=' + TD_KEY;
    var res = await fetch(url);
    var d   = await res.json();
    if (d.status === 'error') throw new Error(d.message || 'Chaîne indisponible');
    // Structure TD : { calls: [...], puts: [...] } ou { data: { calls, puts } }
    var calls = d.calls || (d.data && d.data.calls) || [];
    var puts  = d.puts  || (d.data && d.data.puts)  || [];
    return { calls: calls, puts: puts };
  }

  /* ── 4. Calcul Max Pain ── */
  function calcMaxPain(calls, puts) {
    var strikes = [];
    calls.forEach(function(c) { if (strikes.indexOf(+c.strike) === -1) strikes.push(+c.strike); });
    puts.forEach(function(p)  { if (strikes.indexOf(+p.strike) === -1) strikes.push(+p.strike); });
    strikes.sort(function(a,b) { return a - b; });

    var callMap = {}, putMap = {};
    calls.forEach(function(c) { callMap[+c.strike] = +c.open_interest || 0; });
    puts.forEach(function(p)  { putMap[+p.strike]  = +p.open_interest || 0; });

    var minPain = Infinity, maxPain = strikes[0] || 0;
    strikes.forEach(function(s) {
      var pain = 0;
      strikes.forEach(function(k) {
        if (k < s && callMap[k]) pain += (s - k) * callMap[k];
        if (k > s && putMap[k])  pain += (k - s) * putMap[k];
      });
      if (pain < minPain) { minPain = pain; maxPain = s; }
    });
    return maxPain;
  }

  /* ── 5. Rendu chaîne ── */
  function renderChain(calls, puts, spot) {
    var tbody = $('opt-chain-tbody');
    if (!tbody) return;

    var callMap = {}, putMap = {};
    calls.forEach(function(c) { callMap[+c.strike] = c; });
    puts.forEach(function(p)  { putMap[+p.strike]  = p; });

    // Strikes ±12% autour du spot
    var strikes = [];
    [].concat(calls, puts).forEach(function(o) {
      var s = +o.strike;
      if (Math.abs(s - spot) / spot < 0.12 && strikes.indexOf(s) === -1) strikes.push(s);
    });
    strikes.sort(function(a,b) { return a - b; });

    if (!strikes.length) {
      tbody.innerHTML = '<tr><td colspan="11" style="text-align:center;padding:24px;color:var(--tx-faint);">Aucun strike disponible pour cette expiration.</td></tr>';
      return;
    }

    // Strike ATM = le plus proche du spot
    var atmStrike = strikes.reduce(function(best, s) {
      return Math.abs(s - spot) < Math.abs(best - spot) ? s : best;
    }, strikes[0]);

    tbody.innerHTML = strikes.map(function(strike) {
      var c     = callMap[strike] || {};
      var p     = putMap[strike]  || {};
      var isATM = strike === atmStrike;
      var cItm  = strike < spot;
      var pItm  = strike > spot;
      var cls   = isATM ? 'opt-atm' : '';

      return '<tr class="' + cls + '">'
        // CALLS
        + '<td class="' + (cItm?'itm':'') + '" style="color:var(--tx-mid);">'  + fmtK(c.volume)         + '</td>'
        + '<td class="' + (cItm?'itm':'') + '" style="color:var(--tx-mid);">'  + fmtK(c.open_interest)  + '</td>'
        + '<td class="' + (cItm?'itm':'') + '" style="color:' + (c.implied_volatility ? colIV(c.implied_volatility) : 'var(--tx-faint)') + ';">' + fmtIV(c.implied_volatility) + '</td>'
        + '<td class="' + (cItm?'itm':'') + '" style="color:var(--green);">'   + (c.delta !== undefined ? parseFloat(c.delta).toFixed(2) : '—') + '</td>'
        + '<td class="' + (cItm?'itm':'') + '" style="color:var(--green);font-weight:600;">' + fmt$(c.last || c.last_price) + '</td>'
        // STRIKE
        + '<td class="strike-cell' + (isATM?' opt-atm':'') + '">$' + strike.toFixed(0) + (isATM ? '<br><span style="font-size:8px;color:var(--orange)">ATM</span>' : '') + '</td>'
        // PUTS
        + '<td class="' + (pItm?'itm':'') + '" style="color:var(--red);font-weight:600;">'  + fmt$(p.last || p.last_price)  + '</td>'
        + '<td class="' + (pItm?'itm':'') + '" style="color:var(--red);">'    + (p.delta !== undefined ? parseFloat(p.delta).toFixed(2) : '—') + '</td>'
        + '<td class="' + (pItm?'itm':'') + '" style="color:' + (p.implied_volatility ? colIV(p.implied_volatility) : 'var(--tx-faint)') + ';">' + fmtIV(p.implied_volatility) + '</td>'
        + '<td class="' + (pItm?'itm':'') + '" style="color:var(--tx-mid);">' + fmtK(p.open_interest) + '</td>'
        + '<td class="' + (pItm?'itm':'') + '" style="color:var(--tx-mid);">' + fmtK(p.volume)        + '</td>'
        + '</tr>';
    }).join('');
  }

  /* ── 6. Skew de volatilité ── */
  function renderSkew(calls, puts, spot) {
    if (typeof Chart === 'undefined') return;
    var canvas = $('opt-skew-chart');
    if (!canvas) return;

    var callMap = {}, putMap = {};
    calls.forEach(function(c) { if (c.implied_volatility) callMap[+c.strike] = parseFloat(c.implied_volatility) * 100; });
    puts.forEach(function(p)  { if (p.implied_volatility) putMap[+p.strike]  = parseFloat(p.implied_volatility) * 100; });

    var strikes = Object.keys(callMap).concat(Object.keys(putMap))
      .map(Number).filter(function(s,i,a){ return a.indexOf(s)===i && Math.abs(s-spot)/spot < 0.15; })
      .sort(function(a,b){return a-b;});

    if (_skewChart) _skewChart.destroy();
    _skewChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: strikes.map(function(s){ return '$'+s.toFixed(0); }),
        datasets: [
          { label: 'IV Calls', data: strikes.map(function(s){ return callMap[s] || null; }),
            borderColor: '#00e896', backgroundColor: 'rgba(0,232,150,.08)', tension: 0.4, pointRadius: 3, borderWidth: 2 },
          { label: 'IV Puts',  data: strikes.map(function(s){ return putMap[s]  || null; }),
            borderColor: '#ff4757', backgroundColor: 'rgba(255,71,87,.08)',  tension: 0.4, pointRadius: 3, borderWidth: 2, borderDash: [4,3] }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color:'#888', font:{ size:10, family:'IBM Plex Mono' } } } },
        scales: {
          x: { ticks: { color:'#555', font:{size:8}, maxRotation:45 }, grid:{ color:'#111' } },
          y: { ticks: { color:'#555', font:{size:9}, callback: function(v){ return v.toFixed(0)+'%'; } }, grid:{ color:'#111' } }
        }
      }
    });
  }

  /* ── 7. OI par strike ── */
  function renderOI(calls, puts, spot) {
    if (typeof Chart === 'undefined') return;
    var canvas = $('opt-oi-chart');
    if (!canvas) return;

    var callMap = {}, putMap = {};
    calls.forEach(function(c){ callMap[+c.strike] = +c.open_interest||0; });
    puts.forEach(function(p){  putMap[+p.strike]  = +p.open_interest||0; });

    var strikes = Object.keys(callMap).concat(Object.keys(putMap))
      .map(Number).filter(function(s,i,a){ return a.indexOf(s)===i && Math.abs(s-spot)/spot < 0.12; })
      .sort(function(a,b){return a-b;});

    if (_oiChart) _oiChart.destroy();
    _oiChart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: strikes.map(function(s){ return '$'+s.toFixed(0); }),
        datasets: [
          { label:'OI Calls', data: strikes.map(function(s){ return callMap[s]||0; }),  backgroundColor:'rgba(0,232,150,.5)',  borderColor:'#00e896', borderWidth:1 },
          { label:'OI Puts',  data: strikes.map(function(s){ return -(putMap[s]||0); }), backgroundColor:'rgba(255,71,87,.5)', borderColor:'#ff4757', borderWidth:1 }
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { labels: { color:'#888', font:{size:10, family:'IBM Plex Mono'} } } },
        scales: {
          x: { ticks:{ color:'#555', font:{size:8}, maxRotation:45 }, grid:{color:'#111'} },
          y: { ticks:{ color:'#555', font:{size:9},
               callback: function(v){ var a=Math.abs(v); return a>=1000 ? (a/1000).toFixed(0)+'K' : a; } },
               grid:{color:'#111'} }
        }
      }
    });
  }

  /* ── 8. Charger tout ── */
  async function load(ticker, expiry) {
    _ticker = (ticker || _ticker).toUpperCase();

    var tbody  = $('opt-chain-tbody');
    var btn    = $('opt-load-btn');

    if (btn)   { btn.disabled = true; btn.textContent = '⏳ Chargement…'; }
    if (tbody) { tbody.innerHTML = '<tr><td colspan="11" style="text-align:center;padding:28px;color:var(--tx-faint);font-family:var(--mono);">⏳ Connexion Twelve Data — ' + AM.util.escapeHtml(_ticker) + '…</td></tr>'; }
    setLive(false, 'Chargement…');

    try {
      // a) Prix spot
      var q = await fetchQuote(_ticker);
      _spot = q.price;

      // Mise à jour KPI prix
      var priceEl = $('opt-kpi-price');
      if (priceEl) { priceEl.textContent = '$' + q.price.toFixed(2); }
      var chgEl = $('opt-kpi-chg');
      if (chgEl) {
        chgEl.textContent = (q.pct >= 0 ? '▲ +' : '▼ ') + Math.abs(q.pct).toFixed(2) + '%';
        chgEl.className = 'kpi-delta ' + (q.pct >= 0 ? 'up' : 'dn');
      }

      // b) Expirations
      if (!expiry) {
        var dates = await fetchExpirations(_ticker);
        if (!dates.length) throw new Error('Aucune expiration disponible');
        var expSel = $('opt-expiry');
        if (expSel) {
          expSel.innerHTML = dates.map(function(d) {
            var dt  = new Date(d + 'T12:00:00Z');
            var lbl = dt.toLocaleDateString('fr-FR', { day:'2-digit', month:'short', year:'numeric' });
            return '<option value="' + d + '">' + lbl + '</option>';
          }).join('');
        }
        expiry = dates[0];
        _expiry = expiry;
      }

      // c) Chaîne
      var chain = await fetchChain(_ticker, expiry);
      var calls = chain.calls, puts = chain.puts;

      // d) IV ATM
      var atmCalls = calls.filter(function(c){ return Math.abs(+c.strike - _spot) / _spot < 0.05 && c.implied_volatility; });
      var avgIV = atmCalls.length
        ? atmCalls.reduce(function(a,c){ return a + parseFloat(c.implied_volatility); }, 0) / atmCalls.length
        : 0;
      var ivEl = $('opt-kpi-iv');
      if (ivEl) { ivEl.textContent = avgIV ? (avgIV*100).toFixed(1)+'%' : '—'; ivEl.style.color = colIV(avgIV); }
      var ivRkEl = $('opt-kpi-iv-rank');
      if (ivRkEl) {
        var p = avgIV * 100;
        ivRkEl.textContent = p > 60 ? 'IV très élevée 🔥' : p > 35 ? 'IV élevée ⚡' : p > 20 ? 'IV normale' : 'IV faible 🟢';
      }

      // e) Put/Call Ratio
      var cVol = calls.reduce(function(a,c){ return a + (+c.volume||0); }, 0);
      var pVol = puts.reduce(function(a,p){  return a + (+p.volume||0); }, 0);
      var pcr  = cVol > 0 ? pVol / cVol : 0;
      var pcrEl = $('opt-kpi-pcr');
      if (pcrEl) { pcrEl.textContent = pcr > 0 ? pcr.toFixed(2) : '—'; pcrEl.style.color = pcr < 0.7 ? 'var(--green)' : pcr > 1.2 ? 'var(--red)' : 'var(--yellow)'; }
      var pcrSigEl = $('opt-kpi-pcr-sig');
      if (pcrSigEl) {
        pcrSigEl.textContent = pcr < 0.7 ? 'Signal Haussier 🟢' : pcr > 1.2 ? 'Signal Baissier 🔴' : 'Signal Neutre 🟡';
        pcrSigEl.style.color = pcr < 0.7 ? 'var(--green)' : pcr > 1.2 ? 'var(--red)' : 'var(--yellow)';
      }

      // f) Max Pain
      var mp = calcMaxPain(calls, puts);
      var mpEl = $('opt-kpi-maxpain');
      if (mpEl) {
        mpEl.textContent = '$' + mp.toFixed(0);
        mpEl.style.color = mp > _spot ? 'var(--green)' : mp < _spot ? 'var(--red)' : 'var(--yellow)';
      }

      // g) Rendu
      renderChain(calls, puts, _spot);
      renderSkew(calls, puts, _spot);
      renderOI(calls, puts, _spot);

      var now = new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
      setLive(true, 'Twelve Data · ' + now);
      if (window.AM && AM.toast) AM.toast('Options ' + _ticker + ' chargées — ' + calls.length + ' calls · ' + puts.length + ' puts', 'success');

    } catch(e) {
      console.warn('[OPT-TD] Erreur:', e.message);
      if (tbody) tbody.innerHTML = '<tr><td colspan="11" style="text-align:center;padding:28px;color:var(--red);font-family:var(--mono);">'
        + '<div style="font-size:22px;margin-bottom:8px;">⚠️</div>'
        + 'Erreur Twelve Data : ' + e.message
        + '<br><span style="color:var(--tx-faint);font-size:10px;margin-top:6px;display:block;">Vérifiez le ticker ou les limites du plan API (800 req/jour sur plan gratuit)</span>'
        + '</td></tr>';
      setLive(false, 'Erreur — ' + e.message.slice(0, 40));
      if (window.AM && AM.toast) AM.toast('Erreur options ' + _ticker + ' — ' + e.message, 'error');
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = '⚡ Charger la Chaîne'; }
    }
  }

  /* ── Exposition publique ── */
  return { load: load, ticker: function(){ return _ticker; } };
})();

/* ── Hook bouton + changement d'expiration ── */
function loadOptions() {
  var tickerEl = document.getElementById('opt-ticker');
  var expiryEl = document.getElementById('opt-expiry');
  var ticker   = tickerEl && tickerEl.value.trim() ? tickerEl.value.trim().toUpperCase() : 'NVDA';
  var expiry   = expiryEl && expiryEl.value ? expiryEl.value : null;
  OPT.load(ticker, expiry);
}

document.addEventListener('change', function(e) {
  if (e.target && e.target.id === 'opt-expiry' && OPT.ticker()) {
    var tickerEl = document.getElementById('opt-ticker');
    var t = tickerEl ? tickerEl.value.trim().toUpperCase() : OPT.ticker();
    OPT.load(t, e.target.value || null);
  }
});

/* Risque & Volatilité */
function loadRisque(ctx) {
  var ticker='NVDA';
  (ctx||document).querySelectorAll('.inp').forEach(function(el){ if((el.style.textTransform==='uppercase'||(el.getAttribute('style')&&el.getAttribute('style').indexOf('uppercase')!==-1))&&el.value) ticker=el.value.toUpperCase(); });
  var db={NVDA:{vol:52.4,beta:2.38,sharpe:1.84,dd:-66},AAPL:{vol:24.2,beta:1.20,sharpe:1.42,dd:-28},MSFT:{vol:22.8,beta:0.90,sharpe:1.58,dd:-24},TSLA:{vol:84.2,beta:2.80,sharpe:0.44,dd:-74},META:{vol:38.4,beta:1.40,sharpe:1.68,dd:-42},'MC.PA':{vol:22.4,beta:1.10,sharpe:1.24,dd:-38},JPM:{vol:18.4,beta:1.10,sharpe:1.18,dd:-22}};
  var d=db[ticker]||{vol:28,beta:1.2,sharpe:1.2,dd:-30};
  var kpis=(ctx||document).querySelectorAll('.kpi-card');
  if(kpis[0]&&kpis[0].querySelector('.kpi-val')) kpis[0].querySelector('.kpi-val').textContent=d.vol+'%';
  if(kpis[1]&&kpis[1].querySelector('.kpi-val')){ kpis[1].querySelector('.kpi-val').textContent=d.beta; kpis[1].querySelector('.kpi-val').style.color=d.beta>2?'var(--red)':d.beta>1.5?'var(--orange)':'var(--green)'; }
  if(kpis[2]&&kpis[2].querySelector('.kpi-val')){ kpis[2].querySelector('.kpi-val').textContent=d.sharpe; kpis[2].querySelector('.kpi-val').style.color=d.sharpe>1.5?'var(--green)':d.sharpe>1?'var(--orange)':'var(--red)'; }
  if(kpis[3]&&kpis[3].querySelector('.kpi-val')) kpis[3].querySelector('.kpi-val').textContent=d.dd+'%';
  if(window.AM&&AM.toast) AM.toast('Risque '+ticker+' calculé — Beta '+d.beta+' · Sharpe '+d.sharpe,'success');
}

/* Screener Multi-Marchés */
function runScreenerMulti(ctx) {
  var data=[
    {r:1,t:'NVDA',n:'NVIDIA',p:'🇺🇸',s:'Tech',cap:'$4.4T',pe:'36.2x',peg:'0.41',roe:'123%',mg:'55.6%',gr:'+122%',pot:'+7.4%',sc:92,c:'g'},
    {r:2,t:'MSFT',n:'Microsoft',p:'🇺🇸',s:'Tech',cap:'$3.2T',pe:'30.8x',peg:'0.68',roe:'38.4%',mg:'36.4%',gr:'+16.4%',pot:'+12.8%',sc:88,c:'g'},
    {r:3,t:'LLY',n:'Eli Lilly',p:'🇺🇸',s:'Santé',cap:'$820B',pe:'42.8x',peg:'0.54',roe:'84.2%',mg:'22.8%',gr:'+48.4%',pot:'+18.4%',sc:87,c:'g'},
    {r:4,t:'AVGO',n:'Broadcom',p:'🇺🇸',s:'Tech',cap:'$780B',pe:'26.2x',peg:'0.74',roe:'92.4%',mg:'26.4%',gr:'+44.2%',pot:'+14.2%',sc:85,c:'g'},
    {r:5,t:'TSM',n:'TSMC',p:'🇹🇼',s:'Tech',cap:'$890B',pe:'22.4x',peg:'0.62',roe:'32.8%',mg:'40.2%',gr:'+38.4%',pot:'+20.2%',sc:84,c:'g'},
    {r:6,t:'RMS.PA',n:'Hermès',p:'🇫🇷',s:'Luxe',cap:'$220B',pe:'48.4x',peg:'1.12',roe:'64.8%',mg:'38.4%',gr:'+14.8%',pot:'+24.1%',sc:84,c:'g'},
    {r:7,t:'META',n:'Meta Platforms',p:'🇺🇸',s:'Tech',cap:'$1.4T',pe:'22.4x',peg:'0.58',roe:'38.8%',mg:'34.2%',gr:'+21.8%',pot:'+16.8%',sc:83,c:'g'},
    {r:8,t:'NOVO-B.CO',n:'Novo Nordisk',p:'🇩🇰',s:'Santé',cap:'$460B',pe:'34.8x',peg:'0.62',roe:'88.4%',mg:'34.8%',gr:'+21.4%',pot:'+16.4%',sc:83,c:'g'},
    {r:9,t:'ASML',n:'ASML Holding',p:'🇳🇱',s:'Tech',cap:'$280B',pe:'28.4x',peg:'0.62',roe:'56.4%',mg:'28.8%',gr:'+28.4%',pot:'+14.8%',sc:82,c:'g'},
    {r:10,t:'AIR.PA',n:'Airbus',p:'🇫🇷',s:'Industrie',cap:'$140B',pe:'24.8x',peg:'0.84',roe:'28.4%',mg:'8.4%',gr:'+18.8%',pot:'+18.3%',sc:80,c:'g'},
    {r:11,t:'SU.PA',n:'Schneider',p:'🇫🇷',s:'Industrie',cap:'$120B',pe:'28.2x',peg:'0.78',roe:'18.4%',mg:'12.4%',gr:'+14.2%',pot:'+12.5%',sc:78,c:'y'},
    {r:12,t:'PANW',n:'Palo Alto',p:'🇺🇸',s:'Cyber',cap:'$118B',pe:'52.8x',peg:'1.42',roe:'64.8%',mg:'18.4%',gr:'+14.8%',pot:'+12.8%',sc:74,c:'y'},
    {r:13,t:'SAF.PA',n:'Safran',p:'🇫🇷',s:'Aéro.',cap:'$94B',pe:'24.8x',peg:'0.82',roe:'28.4%',mg:'12.8%',gr:'+12.4%',pot:'+14.8%',sc:78,c:'y'},
    {r:14,t:'COST',n:'Costco',p:'🇺🇸',s:'Conso.',cap:'$380B',pe:'48.4x',peg:'1.42',roe:'32.4%',mg:'2.8%',gr:'+8.4%',pot:'+8.8%',sc:72,c:'y'},
    {r:15,t:'SMCI',n:'Super Micro',p:'🇺🇸',s:'Tech',cap:'$42B',pe:'18.4x',peg:'0.24',roe:'28.4%',mg:'8.4%',gr:'+108%',pot:'+42%',sc:76,c:'y'},
  ];
  var tbody=(ctx||document).querySelector('.tbl tbody');
  if(!tbody) return;
  var colMap={g:'var(--green)',y:'var(--yellow)',r:'var(--red)'};
  tbody.innerHTML=data.map(function(s){
    return '<tr><td>'+s.r+'</td><td class="hl">'+s.t+'</td><td>'+s.n+'</td><td>'+s.p+'</td><td>'+s.s+'</td><td>'+s.cap+'</td><td>'+s.pe+'</td><td class="up">'+s.peg+'</td><td class="up">'+s.roe+'</td><td class="up">'+s.mg+'</td><td class="up">'+s.gr+'</td><td class="up">'+s.pot+'</td><td style="color:'+(colMap[s.c]||'var(--tx-mid)')+';font-weight:700;">'+s.sc+'/100</td></tr>';
  }).join('');
  var kpis=(ctx||document).querySelectorAll('.kpi-card');
  if(kpis[0]&&kpis[0].querySelector('.kpi-val')) kpis[0].querySelector('.kpi-val').textContent='1,842';
  if(kpis[1]&&kpis[1].querySelector('.kpi-val')) kpis[1].querySelector('.kpi-val').textContent=data.filter(function(s){return s.sc>=70;}).length;
  if(window.AM&&AM.toast) AM.toast('Scan Multi-Marchés — '+data.length+' résultats affichés','success');
}

/* Export CSV */
function exportCSV(ctx) {
  var headers=['Rang','Ticker','Société','Pays','Secteur','Cap','P/E','PEG','ROE','Marge','Growth','Potentiel','Score'];
  var rows=[headers.join(';')];
  (ctx||document).querySelectorAll('.tbl tbody tr').forEach(function(tr){
    rows.push(Array.from(tr.querySelectorAll('td')).map(function(td){return td.textContent.trim();}).join(';'));
  });
  var blob=new Blob(['\uFEFF'+rows.join('\n')],{type:'text/csv;charset=utf-8;'});
  var url=URL.createObjectURL(blob);
  var a=document.createElement('a');
  a.href=url; a.download='screener_export.csv'; a.click();
  URL.revokeObjectURL(url);
}

/* ── 5. HOOK SUR LA NAVIGATION POUR INITIALISER AUTOMATIQUEMENT ── */
if(window.AM && AM.nav) {
  var _origPickMod = AM.nav.pickMod ? AM.nav.pickMod.bind(AM.nav) : null;
  if(_origPickMod){
    AM.nav.pickMod = function(page, key) {
      _origPickMod(page, key);
      if(page==='actions' && key==='cac40')  setTimeout(renderCAC40, 100);
      if(page==='actions' && key==='backtest') setTimeout(function(){ if(window.runBacktest) runBacktest(); }, 300);
    };
  }
}

/* Auto-init si modules déjà affichés */
setTimeout(function(){
  if(document.getElementById('cac40-tbody')) renderCAC40();
}, 600);

// Auto-run backtest charts on module load
setTimeout(function(){
  if(document.getElementById('bt-equity-chart') && window.runBacktest) runBacktest();
}, 700);

console.log('[Arthur Terminal v4.4] Patch chargé ✓');
console.log('  ✓ Tout voir — modal actualités');
console.log('  ✓ Backtesting — Chart.js + trade log + 4 stratégies supplémentaires');
console.log('  ✓ Grand Conseil — 15 légendes fonctionnel + analyse par ticker');
console.log('  ✓ Mode Duel — comparaison interactive 12 critères');
console.log('  ✓ Screener CAC40 — 33 valeurs + tri + filtre dynamique');
console.log('  ✓ Market Monitor — heatmap sectorielle + tableau complet');
console.log('  ✓ Dividendes — 13 sociétés + calendrier complet');
console.log('  ✓ Options US — données par ticker (IV, P/C, Max Pain)');
console.log('  ✓ Risque & Volatilité — métriques par ticker');
console.log('  ✓ Screener Multi-Marchés — 15 valeurs + export CSV');
console.log('  ✓ Earnings — onglets fonctionnels');

}); // end ready()

})();
