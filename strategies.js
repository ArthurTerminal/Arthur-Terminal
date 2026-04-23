(function(){
'use strict';

var STRATS=[
{id:'c1',market:'crypto',mL:'\u20bf CRYPTO',ac:'#ff9800',name:'BTC Halving Cycle Strategy',desc:'Accumulation progressive de BTC dans les 12 mois suivant le halving. Bas\u00e9e sur les cycles historiques de 4 ans et la r\u00e9duction de l\u2019offre. Sortie en zone d\u2019euphorie (RSI hebdo > 85).',tf:'Weekly / Monthly',style:'Position',diff:'Interm\u00e9diaire',wr:72,rr:'1:4',risk:'2%/trade',entry:['RSI Weekly < 40 post-halving','DCA mensuel sur 6-12 mois','MVRV-Z score < 1'],sl:['Sous le pr\u00e9c\u00e9dent cycle bas (-30%)'],tp:['TP1 : ATH pr\u00e9c\u00e9dent x1.5','TP2 : Ratio Mayer 2.4'],ind:['RSI 14 Weekly','MVRV-Z Score','Puell Multiple','Pi Cycle Top'],flt:['Volume on-chain croissant','Fear & Greed < 30 \u00e0 l\u2019entr\u00e9e','Hash rate en hausse'],notes:'Strat\u00e9gie long terme. Horizon 12-24 mois. Ne convient pas au scalping.',tags:['halving','DCA','position','on-chain','long-terme']},
{id:'c2',market:'crypto',mL:'\u20bf CRYPTO',ac:'#ff9800',name:'Altcoin Season Rotation',desc:'Rotation vers les altcoins mid-cap une fois BTC.D < 45%. Capture les hausses explosives des alts en fin de cycle bull.',tf:'H4 / Daily',style:'Swing',diff:'Avanc\u00e9',wr:58,rr:'1:5',risk:'1%/trade',entry:['BTC.D < 45% et en baisse','ETH.D > 20%','Breakout sur volume x3'],sl:['Sous le support de breakout','Max -8%'],tp:['Fibonacci 1.618','Sortir si BTC.D remonte > 2% en 24h'],ind:['BTC Dominance','ETH/BTC ratio','RSI H4'],flt:['Market cap > $500M','Listing Binance/Coinbase'],notes:'Strat\u00e9gie \u00e0 haut risque. Toujours garder 50%+ en BTC/ETH.',tags:['altcoin','rotation','swing','momentum']},
{id:'c3',market:'crypto',mL:'\u20bf CRYPTO',ac:'#ff9800',name:'Crypto Grid Trading',desc:'Grid trading automatis\u00e9 sur BTC/USDT et ETH/USDT en march\u00e9 lat\u00e9ral. G\u00e9n\u00e8re des revenus passifs sur les oscillations dans une range d\u00e9finie.',tf:'M15 / H1',style:'Bot',diff:'Interm\u00e9diaire',wr:80,rr:'1:1.2',risk:'Capital d\u00e9di\u00e9',entry:['ADX < 20 (range)','D\u00e9finir borne haute/basse sur 30j','Grilles espac\u00e9es de 0.5-2%'],sl:['Sortie auto si prix sort de +-5%'],tp:['Profit cumulatif sur chaque grille'],ind:['ADX','Bollinger Bands','Volume Profile'],flt:['\u00c9viter les news majeures','March\u00e9 sans tendance forte'],notes:'N\u00e9cessite un bot (Binance, Bybit). Capital minimum : $1000.',tags:['grid','bot','range','passif']},
{id:'c4',market:'crypto',mL:'\u20bf CRYPTO',ac:'#ff9800',name:'Breakout R\u00e9sistance BTC',desc:'Trade sur le breakout confirm\u00e9 de r\u00e9sistances historiques de BTC avec volume. Entr\u00e9e sur le retest du niveau cass\u00e9.',tf:'H4 / Daily',style:'Swing',diff:'D\u00e9butant',wr:65,rr:'1:3',risk:'1.5%/trade',entry:['Cl\u00f4ture H4 au-dessus de la r\u00e9sistance','Volume > 150% moyenne 20 bougies','Retest du niveau cass\u00e9'],sl:['Sous le bas de la bougie de breakout'],tp:['R\u00e9sistance weekly suivante','Fibonacci 1.618'],ind:['Volume','RSI 14','MACD','Fibonacci'],flt:['BTC.D stable ou en baisse','Pas de news macro < 24h'],notes:'Attendre le retest plut\u00f4t que d\u2019entrer sur le breakout direct.',tags:['breakout','resistance','volume','fibonacci']},
{id:'a1',market:'actions',mL:'\ud83d\udcc8 ACTIONS',ac:'#4d9fff',name:'Momentum Earnings Play',desc:'Trade directionnel apr\u00e8s les publications de r\u00e9sultats trimestriels. Bas\u00e9 sur la surprise de b\u00e9n\u00e9fices et la r\u00e9action du cours.',tf:'Daily / H1',style:'Intraday',diff:'Avanc\u00e9',wr:55,rr:'1:2.5',risk:'1%/trade',entry:['EPS surprise > +10%','Cours > +3% dans les 30min post-earnings','Volume 10x la moyenne'],sl:['Sous le gap d\u2019ouverture'],tp:['R\u00e9sistance du mois pr\u00e9c\u00e9dent','Objectif analyst post-earnings'],ind:['EPS / Revenue surprise','Volume pr\u00e9-market','RSI','Beta'],flt:['Large cap tech > $10Mrd','PEG < 2'],notes:'Tr\u00e8s volatile. Garder le stop strict. Ne pas trader sans plan d\u00e9fini.',tags:['earnings','momentum','tech','gap']},
{id:'a2',market:'actions',mL:'\ud83d\udcc8 ACTIONS',ac:'#4d9fff',name:'52 Week High Breakout',desc:'Achat d\u2019actions cassant leur plus haut de 52 semaines avec volume exceptionnel. Strat\u00e9gie CAN SLIM de William O\u2019Neil.',tf:'Daily / Weekly',style:'Swing',diff:'Interm\u00e9diaire',wr:62,rr:'1:3',risk:'1.5%/trade',entry:['Breakout du 52-week high','Volume > 3x moyenne 50j','EPS croissance > 20% YoY'],sl:['Sous le pivot point (-5%)'],tp:['Tenir 8-12 semaines','TP si +25% \u00e0 +50%'],ind:['52W High','Relative Strength','EPS Growth','Volume MA50'],flt:['RS Rating > 80','Secteur leader'],notes:'Strat\u00e9gie CANSLIM. Tenir un journal de trade.',tags:['52w-high','breakout','canslim','growth']},
{id:'a3',market:'actions',mL:'\ud83d\udcc8 ACTIONS',ac:'#4d9fff',name:'Mean Reversion Blue Chips',desc:'Achat de grandes caps fortement survendues sur news n\u00e9gatives temporaires. Le prix revient vers sa moyenne historique.',tf:'Daily',style:'Swing',diff:'D\u00e9butant',wr:70,rr:'1:2',risk:'2%/trade',entry:['Baisse >= 8% sur 1-3 jours','RSI Daily < 30','Cours < MA200 - 15%'],sl:['Sous le plus bas r\u00e9cent (-3%)'],tp:['Retour sur MA200','TP1 : +8% / TP2 : +15%'],ind:['RSI 14 Daily','Distance MA200','Volume ratio'],flt:['Large cap > $50Mrd uniquement','P/E < 30'],notes:'Ne pas appliquer sur des valeurs en crise structurelle.',tags:['mean-reversion','blue-chip','oversold','value']},
{id:'a4',market:'actions',mL:'\ud83d\udcc8 ACTIONS',ac:'#4d9fff',name:'Sector Rotation ETF',desc:'Rotation sectorielle mensuelle bas\u00e9e sur le cycle \u00e9conomique via ETF sectoriels (XLK, XLF, XLE...). Approche macro syst\u00e9matique.',tf:'Weekly / Monthly',style:'Position',diff:'Interm\u00e9diaire',wr:68,rr:'1:3',risk:'3% par ETF',entry:['Identifier la phase du cycle \u00e9conomique','RS ETF > SPY sur 3 mois','Entr\u00e9e en d\u00e9but de mois'],sl:['ETF perd le leadership (RS < SPY > 30j)'],tp:['+20% \u00e0 +40% sur 6-12 mois'],ind:['Relative Strength vs SPY','Yield Curve','PMI'],flt:['AUM ETF > $5Mrd','TER < 0.1%'],notes:'Cycle \u00e9conomique via Conference Board. R\u00e9\u00e9valuer chaque trimestre.',tags:['sector-rotation','ETF','macro','cycle']},
{id:'a5',market:'actions',mL:'\ud83d\udcc8 ACTIONS',ac:'#4d9fff',name:'Dividend Growth Investing',desc:'Portfolio de valeurs \u00e0 dividendes croissants sur 10+ ans (Dividend Aristocrats). R\u00e9investissement via DRIP pour effet compos\u00e9.',tf:'Monthly / Yearly',style:'Long terme',diff:'D\u00e9butant',wr:85,rr:'Revenu passif',risk:'1-3%/pos.',entry:['Dividend Streak >= 10 ans','Payout ratio < 65%','Croissance dividende > inflation'],sl:['Coupe dividende ou gel > 2 ans'],tp:['Yield on Cost > 6% sur 10 ans'],ind:['Dividend Yield','Payout Ratio','FCF Yield'],flt:['S&P500 Dividend Aristocrats','Rating BBB+ minimum'],notes:'PEA pour les r\u00e9sidents FR. Exemples : JNJ, KO, PEP, MSFT.',tags:['dividende','DGI','long-terme','aristocrats']},
{id:'f1',market:'forex',mL:'\ud83d\udcb1 FOREX',ac:'#00e896',name:'London Breakout Session',desc:'Trade sur le breakout de la range asiatique \u00e0 l\u2019ouverture de Londres (8h CET). Exploitation de l\u2019explosion de volatilit\u00e9 europ\u00e9enne.',tf:'M15 / H1',style:'Intraday',diff:'D\u00e9butant',wr:58,rr:'1:2',risk:'1%/trade',entry:['Range asiatique (2h-5h CET)','Breakout \u00e0 8h05-8h15','Entr\u00e9e sur retest'],sl:['Autre c\u00f4t\u00e9 de la range + 5 pips'],tp:['Hauteur de la range (sym\u00e9trique)','Niveau HTF Daily'],ind:['Sessions FX','ATR 14','Volume'],flt:['\u00c9viter lundi et vendredi','Pas de news dans les 2h'],notes:'Fonctionne mieux sur EUR/USD, GBP/USD. Attendre 8h05 pour le spread.',tags:['london-breakout','intraday','range','session']},
{id:'f2',market:'forex',mL:'\ud83d\udcb1 FOREX',ac:'#00e896',name:'Carry Trade Taux Diff\u00e9rentiels',desc:'Vente de devises \u00e0 faible taux (JPY, CHF) contre achat de devises \u00e0 taux \u00e9lev\u00e9 (AUD, NZD). Profit sur le diff\u00e9rentiel de swap quotidien.',tf:'Daily / Weekly',style:'Position',diff:'Avanc\u00e9',wr:65,rr:'1:3',risk:'2%',entry:['Diff\u00e9rentiel de taux >= 2.5%','Tendance Daily MA50 > MA200','VIX < 20 (risk-on)'],sl:['Sous support Daily (-1.5%)','Si VIX > 25 : cl\u00f4turer'],tp:['3-6 mois de swap cumul\u00e9'],ind:['Taux directeurs','Courbe des taux','VIX','COT Report'],flt:['\u00c9viter pendant les crises','Levier max x10'],notes:'Paires classiques : AUD/JPY, NZD/JPY. Se retourne violemment en risk-off.',tags:['carry-trade','swap','taux','position']},
{id:'f3',market:'forex',mL:'\ud83d\udcb1 FOREX',ac:'#00e896',name:'Trend Following Triple EMA',desc:'Suivi de tendance sur paires majeures avec EMA 20/50/200. Entr\u00e9e uniquement dans le sens de la tendance dominante.',tf:'H1 / H4',style:'Swing',diff:'D\u00e9butant',wr:55,rr:'1:2.5',risk:'1%/trade',entry:['EMA20 > EMA50 > EMA200','Pullback sur EMA20 ou EMA50','RSI entre 40-60'],sl:['Sous EMA50 (-5 pips)'],tp:['R:R 1:2 depuis l\u2019entr\u00e9e','R\u00e9sistance HTF suivante'],ind:['EMA 20/50/200','RSI 14','ATR 14'],flt:['Paires majeures uniquement','\u00c9viter les jours de news'],notes:'Inutile en range. Attendre une tendance claire avant d\u2019entrer.',tags:['trend','EMA','triple-ema','swing']},
{id:'f4',market:'forex',mL:'\ud83d\udcb1 FOREX',ac:'#00e896',name:'ICT Smart Money Concepts',desc:'Strat\u00e9gie bas\u00e9e sur Order Blocks, Fair Value Gaps et Liquidity Hunts. Suit les mouvements des institutionnels.',tf:'M15 / H1 / H4',style:'Swing',diff:'Avanc\u00e9',wr:60,rr:'1:3',risk:'1%/trade',entry:['Order Block Daily identifi\u00e9','Retour en zone OB sur H1','FVG combl\u00e9 + displacement','Session London ou NY'],sl:['Sous le bas de l\u2019Order Block (-2 pips)'],tp:['Prochain liquidity pool','BSL/SSL targets'],ind:['Order Blocks','Fair Value Gaps','Sessions'],flt:['Kill zones : 8h-11h / 13h-16h CET','Mardi \u00e0 Jeudi'],notes:'Courbe d\u2019apprentissage 3-6 mois. Backtest minimum 100 setups.',tags:['ICT','smart-money','orderblock','FVG']},
{id:'f5',market:'forex',mL:'\ud83d\udcb1 FOREX',ac:'#00e896',name:'News Trading NFP & FOMC',desc:'Trade directionnel sur les annonces macro majeures (NFP, FOMC, BCE). Utilise la r\u00e9action initiale et le retest post-news.',tf:'M1 / M5',style:'Scalping',diff:'Avanc\u00e9',wr:45,rr:'1:4',risk:'0.5%/trade',entry:['\u00c9cart > 2sigma vs consensus','Entr\u00e9e sur retest 1-3min apr\u00e8s la spike','Direction confirm\u00e9e sur M5'],sl:['Haut/bas de la spike (-10 pips max)'],tp:['Objectif daily suivant','+15 \u00e0 +30 pips sur retest'],ind:['Economic Calendar','Volatilit\u00e9 implicite'],flt:['EUR/USD, GBP/USD, USD/JPY uniquement','Compte ECN'],notes:'Spread explose \u00e0 la news. Utiliser un ECN ou raw spread broker.',tags:['news-trading','NFP','FOMC','scalping']},
{id:'m1',market:'mp',mL:'\ud83e\udd47 MATI\u00c8RES',ac:'#ffd166',name:'Or - Safe Haven & Inflation Hedge',desc:'Strat\u00e9gie long terme sur l\u2019or comme couverture contre l\u2019inflation. Renforcement lors des tensions g\u00e9opolitiques et assouplissements mon\u00e9taires.',tf:'Weekly / Monthly',style:'Position',diff:'D\u00e9butant',wr:70,rr:'1:4',risk:'5% du portfolio',entry:['Taux r\u00e9els US < 0%','Cycle de baisse des taux FED','Or/SP500 ratio < 0.5'],sl:['Sous support long terme (-15%)'],tp:['+30% \u00e0 +60% sur le cycle','Sortie si taux r\u00e9els > 2%'],ind:['TIPS 10 ans','DXY','COT Report'],flt:['ETC avec backing physique','Allocation max 10%'],notes:'Ne jamais vendre en panique. L\u2019or est une assurance, pas une sp\u00e9culation.',tags:['or','safe-haven','inflation','taux-reels']},
{id:'m2',market:'mp',mL:'\ud83e\udd47 MATI\u00c8RES',ac:'#ffd166',name:'WTI - Rapport EIA',desc:'Strat\u00e9gie sur le p\u00e9trole WTI bas\u00e9e sur les rapports hebdomadaires EIA (mercredi 16h30 CET). Les surprises cr\u00e9ent des moves de 1-3%.',tf:'M5 / M15',style:'Intraday',diff:'Interm\u00e9diaire',wr:52,rr:'1:2',risk:'1%/trade',entry:['Inventaires < consensus','Entr\u00e9e sur retest post-spike','Tendance Daily favorable'],sl:['Niveau pr\u00e9-news (-0.5%)'],tp:['+1.5% vers niveau technique'],ind:['Inventaires EIA','ATR 14','Tendance Daily'],flt:['\u00c9viter si OPEC+ meeting','Spread WTI CFD < $0.05'],notes:'Rapport EIA sur eia.gov chaque mercredi.',tags:['petrole','WTI','EIA','inventaires']},
{id:'m3',market:'mp',mL:'\ud83e\udd47 MATI\u00c8RES',ac:'#ffd166',name:'Saisonnalit\u00e9 Agricoles',desc:'Exploitation des patterns saisonniers sur bl\u00e9, ma\u00efs et soja. Ces mati\u00e8res suivent des cycles agricoles pr\u00e9visibles li\u00e9s aux semis et r\u00e9coltes.',tf:'Weekly / Monthly',style:'Position',diff:'Interm\u00e9diaire',wr:65,rr:'1:3',risk:'2%',entry:['Bl\u00e9 : achat Nov-Jan','Ma\u00efs : achat mars avant USDA','Soja : vente juillet-ao\u00fbt'],sl:['Sous support saisonnier (-5%)'],tp:['Pic saisonnier historique'],ind:['Saisonnalit\u00e9 Moore Research','USDA WASDE'],flt:['\u00c9viter les ann\u00e9es climatiques extr\u00eames'],notes:'mrci.com pour les patterns. Confirmer par l\u2019analyse technique.',tags:['saisonnalite','ble','mais','USDA']},
{id:'i1',market:'indices',mL:'\ud83d\udcca INDICES',ac:'#a855f7',name:'SP500 DCA Mensuel',desc:'Investissement passif sur le S&P500 via ETF. DCA mensuel syst\u00e9matique avec renforcement lors des corrections. La strat\u00e9gie la plus performante sur 20 ans.',tf:'Monthly',style:'Long terme',diff:'D\u00e9butant',wr:92,rr:'Long terme',risk:'DCA fixe',entry:['Investissement mensuel fixe','Renforcement x2 si correction > -5%','Renforcement x3 si krach > -20%'],sl:['Aucun (buy & hold)'],tp:['Horizon 10-30 ans'],ind:['P/E Shiller (CAPE)','VIX','MA200 Weekly'],flt:['TER < 0.1% (Vanguard, iShares)','R\u00e9investissement dividendes','PEA France'],notes:'Automatiser les versements. Warren Buffett recommande cette approche.',tags:['SP500','DCA','passif','long-terme']},
{id:'i2',market:'indices',mL:'\ud83d\udcca INDICES',ac:'#a855f7',name:'VIX Mean Reversion SPX',desc:'Achat du S&P500 quand le VIX atteint des extr\u00eames de peur (spike > 35). Le VIX revient vers sa moyenne en 30-60 jours.',tf:'Daily',style:'Swing',diff:'Interm\u00e9diaire',wr:74,rr:'1:3',risk:'2%',entry:['VIX spike > 35','SPX RSI Daily < 30','PMI > 47 (pas de r\u00e9cession)'],sl:['Sous le bas du jour du spike (-2%)'],tp:['VIX retour \u00e0 20 (+5-8% SPX)','ATH pr\u00e9c\u00e9dent'],ind:['VIX Spot','Put/Call Ratio','RSI SPX'],flt:['Pas en r\u00e9cession confirm\u00e9e'],notes:'Backtest solide 2010-2024. Utiliser des puts de protection si levier.',tags:['VIX','mean-reversion','SPX','contrarian']},
{id:'i3',market:'indices',mL:'\ud83d\udcca INDICES',ac:'#a855f7',name:'DAX/CAC40 Morning Gap',desc:'Trade des gaps d\u2019ouverture europ\u00e9ens en exploitant le momentum US de la veille. Les indices EU suivent la tendance US apr\u00e8s une nuit de hausse.',tf:'M5 / M15',style:'Scalping',diff:'Interm\u00e9diaire',wr:60,rr:'1:1.8',risk:'0.5%/trade',entry:['US futures > +0.5% la nuit','Gap ouverture > +0.3%','Premier pullback 15min apr\u00e8s ouverture'],sl:['Sous le gap fill (-0.4%)'],tp:['Extension du gap x1.5','Cl\u00f4turer avant 11h'],ind:['Futures US (ES, NQ)','Volume H1','EMA9 M5'],flt:['Pas de news macro europ\u00e9enne','\u00c9viter les lundis'],notes:'Lundi au jeudi uniquement. Fermer avant le d\u00e9jeuner.',tags:['DAX','CAC40','gap','morning']}
];

/* ─── helpers ─── */
function esc(s){ return AM.util.escapeHtml(String(s||'')); }
function diffBadge(d){
  var m={'D\u00e9butant':'d1','Interm\u00e9diaire':'d2','Avanc\u00e9':'d3'};
  return '<span class="strat-badge '+(m[d]||'d2')+'">'+esc(d)+'</span>';
}
function wrCol(w){ return parseFloat(w)>=65?'var(--green)':parseFloat(w)>=50?'var(--yellow)':'var(--red)'; }

/* ─── cards ─── */
function card(s){
  return '<div class="strat-card" onclick="stratOpen(\''+s.id+'\')">'
    +'<div class="strat-accent" style="background:'+s.ac+';"></div>'
    +'<div class="strat-market" style="color:'+s.ac+';">'+s.mL+'</div>'
    +'<div class="strat-name">'+esc(s.name)+'</div>'
    +'<div class="strat-desc">'+esc(s.desc.length>116?s.desc.slice(0,113)+'\u2026':s.desc)+'</div>'
    +'<div class="strat-tags">'+s.tags.slice(0,4).map(function(t){return '<span class="strat-tag">#'+t+'</span>';}).join('')+'</div>'
    +'<div class="strat-footer">'+diffBadge(s.diff)
      +'<span class="strat-rr">R:R '+esc(s.rr)+'</span>'
      +'<span class="strat-wr" style="color:'+wrCol(s.wr)+';">WR '+s.wr+'%</span>'
    +'</div>'
  +'</div>';
}

function grid(cid,list){
  var el=document.getElementById(cid);if(!el)return;
  el.innerHTML=list.length?list.map(card).join(''):'<div class="strat-empty">Aucune strat\u00e9gie.</div>';
}

function filtered(market){
  var q=(document.getElementById('strat-search')||{value:''}).value.toLowerCase();
  var d=(document.getElementById('strat-diff-filter')||{value:''}).value;
  return STRATS.filter(function(s){
    return (!market||s.market===market)
      &&(!q||s.name.toLowerCase().includes(q)||s.desc.toLowerCase().includes(q)||s.tags.some(function(t){return t.includes(q);}))
      &&(!d||s.diff===d);
  });
}

function renderAll(){
  grid('strat-grid-all',    filtered(''));
  grid('strat-grid-crypto', filtered('crypto'));
  grid('strat-grid-actions',filtered('actions'));
  grid('strat-grid-forex',  filtered('forex'));
  grid('strat-grid-mp',     filtered('mp'));
  grid('strat-grid-indices',filtered('indices'));
}
window.stratFilter=function(){ renderAll(); };

/* ─── modal ─── */
window.stratOpen=function(id){
  var s=STRATS.find(function(x){return x.id===id;});
  var modal=document.getElementById('strat-modal');
  var cont=document.getElementById('strat-modal-content');
  if(!s||!modal||!cont) return;
  function sec(title,items,col){
    if(!items||!items.length) return '';
    return '<div style="margin-bottom:13px;">'
      +'<div style="font-family:var(--mono);font-size:9px;letter-spacing:2px;font-weight:700;color:'+(col||'var(--tx-faint)')+';margin-bottom:7px;">'+title+'</div>'
      +'<ul style="margin:0;padding:0;list-style:none;">'
      +items.map(function(it){return '<li style="display:flex;gap:8px;font-size:11px;color:var(--tx-muted);margin-bottom:4px;line-height:1.6;"><span style="color:'+(col||s.ac)+';flex-shrink:0;">\u25b8</span><span>'+esc(it)+'</span></li>';}).join('')
      +'</ul></div>';
  }
  cont.innerHTML='<div style="padding:22px 24px;">'
    +'<div style="border-bottom:1px solid var(--br-soft);padding-bottom:13px;margin-bottom:17px;">'
      +'<div style="font-family:var(--mono);font-size:10px;color:'+s.ac+';letter-spacing:1.5px;font-weight:700;margin-bottom:5px;">'+esc(s.mL)+' \u00b7 '+esc(s.style)+' \u00b7 '+esc(s.tf)+'</div>'
      +'<div style="font-size:18px;font-weight:700;color:var(--tx-hi);margin-bottom:7px;">'+esc(s.name)+'</div>'
      +'<div style="font-size:11px;color:var(--tx-muted);line-height:1.7;">'+esc(s.desc)+'</div>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:17px;">'
    +[['Win Rate',s.wr+'%',wrCol(s.wr)],['R:R Cible',s.rr,'var(--orange)'],['Risque/trade',s.risk,'var(--blue)'],['Difficult\u00e9',s.diff,'var(--tx-mid)']].map(function(p){
      return '<div style="background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:7px;padding:10px;text-align:center;">'
        +'<div style="font-family:var(--mono);font-size:8px;color:var(--tx-faint);margin-bottom:3px;">'+p[0].toUpperCase()+'</div>'
        +'<div style="font-family:var(--mono);font-size:12px;font-weight:700;color:'+p[2]+';">'+esc(p[1])+'</div>'
      +'</div>';
    }).join('')
    +'</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:13px;">'
      +'<div>'+sec('\u2705 SIGNAUX D\u2019ENTR\u00c9E',s.entry,'var(--green)')+sec('\ud83c\udfaf TAKE PROFIT',s.tp,'var(--green)')+'</div>'
      +'<div>'+sec('\ud83d\uded1 STOP LOSS',s.sl,'var(--red)')+sec('\ud83d\udcca INDICATEURS',s.ind,'var(--blue)')+'</div>'
    +'</div>'
    +sec('\ud83d\udd0d FILTRES',s.flt,'var(--yellow)')
    +'<div style="padding:11px 14px;background:var(--bg-raised);border-left:3px solid '+s.ac+';border-radius:0 6px 6px 0;font-size:11px;color:var(--tx-muted);line-height:1.7;margin-bottom:13px;">'
      +'<div style="font-family:var(--mono);font-size:9px;color:'+s.ac+';font-weight:700;margin-bottom:4px;">\ud83d\udcdd NOTES</div>'+esc(s.notes)
    +'</div>'
    +'<div style="display:flex;flex-wrap:wrap;gap:5px;">'+s.tags.map(function(t){return '<span class="strat-tag">#'+t+'</span>';}).join('')+'</div>'
  +'</div>';
  modal.style.display='flex';
};
(function(){var m=document.getElementById('strat-modal');if(m)m.addEventListener('click',function(e){if(e.target===this)this.style.display='none';});})();

/* ─── builder ─── */
var TIPS={
  crypto:{scalping:['Meilleur order book sur Binance/Bybit','Surveiller le funding rate sur les perp','Faible liquidit\u00e9 asiatique \u00e0 \u00e9viter'],intraday:['Volume optimal 14h-16h CET (overlap US)','CVD pour confirmer la direction','Attention aux liquidations en cascade'],swing:['Analyser Bitcoin en premier','M\u00e9triques on-chain : NVT, SOPR','20% de cash pour renforcer'],position:['DCA sur 4-8 semaines','Cold wallet pour positions > 3 mois','Fiscalit\u00e9 : noter chaque trade']},
  actions:{scalping:['Heures optimales : 15h30-17h00 CET','Level 2 pour les entr\u00e9es pr\u00e9cises','\u00c9viter le vendredi apr\u00e8s-midi'],intraday:['VWAP comme support/r\u00e9sistance','Fermer avant la cl\u00f4ture (overnight)','Gap > 3% avec volume en pr\u00e9-market'],swing:['Screener : RS rating, EPS growth','Ne pas tenir pendant les earnings','Secteur leader = plus grande position'],position:['Revue mensuelle','Trailing stop 8-10% depuis le sommet','Dividendes : r\u00e9investir automatiquement']},
  forex:{scalping:['ECN broker : IC Markets, Pepperstone','Kill zones : 8h-11h et 13h-16h CET','\u00c9viter les annonces \u00e9conomiques'],intraday:['Fermer avant 18h (rollover swaps)','Corr\u00e9ler EUR/USD avec DXY','Journaliser chaque trade'],swing:['Contexte macro hebdo le dimanche','COT report CFTC pour les institutionnels','Max 3-4 positions simultan\u00e9es'],position:['Diff\u00e9rentiel de taux = composante cl\u00e9','Surveiller les banques centrales','Levier max x10']},
  mp:{scalping:['Sessions haute liquidit\u00e9 uniquement','EIA p\u00e9trole : mercredi 16h30 CET','CFD pour les petits comptes'],intraday:['Saisonnalit\u00e9 : v\u00e9rifier les patterns','USDA agricoles : 1er vendredi du mois','Spread CFD peut \u00eatre \u00e9lev\u00e9'],swing:['Or : invers\u00e9ment corr\u00e9l\u00e9 au DXY','P\u00e9trole : suivre OPEC+','Cuivre = barom\u00e8tre croissance mondiale'],position:['Allocation max 10-15% du portfolio','ETC physiques pour l\u2019or','Saisonnalit\u00e9 agricole : mrci.com']},
  indices:{scalping:['DAX : ouverture 9h avec gaps fr\u00e9quents','SP500 E-mini (ES) : meilleure liquidit\u00e9','Attention rollover des futures'],intraday:['VWAP + bands pour le S&P500','Corriger avec futures US overnight','\u00c9viter 12h-13h30 CET (faible liquidit\u00e9)'],swing:['Rotation sectorielle GICS','Breadth : NYSE A/D line','VIX > 25 = opportunit\u00e9 contrarian'],position:['ETF TER < 0.1%','R\u00e9investir les dividendes','R\u00e9\u00e9quilibrer 1 fois/an']}
};

window.sbUpdateContext=function(){
  var mk=(document.getElementById('sb-market')||{value:'crypto'}).value;
  var raw=(document.getElementById('sb-style')||{value:'swing'}).value;
  var sk=raw.replace(/[^a-z]/gi,'').toLowerCase();
  var styleKey='swing';
  if(sk.indexOf('scalp')>=0) styleKey='scalping';
  else if(sk.indexOf('intra')>=0) styleKey='intraday';
  else if(sk.indexOf('swing')>=0) styleKey='swing';
  else if(sk.indexOf('pos')>=0||sk.indexOf('long')>=0) styleKey='position';
  var arr=(TIPS[mk]&&(TIPS[mk][styleKey]||TIPS[mk].swing))||[];
  var el=document.getElementById('sb-context-tips');if(!el)return;
  if(!arr.length){el.style.display='none';return;}
  el.style.display='block';
  el.innerHTML='<div class="card" style="padding:14px 16px;border-left:2px solid var(--purple);">'
    +'<div style="font-family:var(--mono);font-size:9px;color:var(--purple);letter-spacing:2px;font-weight:700;margin-bottom:10px;">\ud83d\udca1 CONSEILS CONTEXTUELS</div>'
    +arr.map(function(t){return '<div style="display:flex;gap:8px;margin-bottom:6px;font-size:11px;color:var(--tx-muted);"><span style="color:var(--purple);">\u25b8</span><span>'+esc(t)+'</span></div>';}).join('')
  +'</div>';
};

window.sbGenerate=function(){
  var mk=document.getElementById('sb-market').value;
  var st=document.getElementById('sb-style').value;
  var en=document.getElementById('sb-entry').value;
  var sl=document.getElementById('sb-sl').value;
  var tp=document.getElementById('sb-tp').value;
  var rk=document.getElementById('sb-risk').value;
  var COL={crypto:'#ff9800',actions:'#4d9fff',forex:'#00e896',mp:'#ffd166',indices:'#a855f7'};
  var col=COL[mk]||'var(--orange)';
  var ML={crypto:'\u20bf Crypto',actions:'\ud83d\udcc8 Actions',forex:'\ud83d\udcb1 Forex',mp:'\ud83e\udd47 Mati\u00e8res',indices:'\ud83d\udcca Indices'};
  var EL={breakout:'Breakout r\u00e9sistance/support',pullback:'Pullback sur moyenne mobile',reversal:'Reversal sur niveau cl\u00e9',momentum:'Momentum / RSI divergence',pattern:'Pattern chartiste'};
  var SL={atr:'ATR dynamique (1.5xATR14)',structure:'Structure de march\u00e9',pct:'% fixe du capital',psar:'Parabolic SAR'};
  var TL={rr:'R:R fixe (1:2 / 1:3)',fib:'Extension Fibonacci',supply:'Zone offre/demande',trailing:'Trailing stop'};
  var RR={rr:'1:2',fib:'1:2.5',supply:'1:2',trailing:'1:3'};
  var WR={breakout:'55-65%',pullback:'58-68%',reversal:'50-60%',momentum:'52-62%',pattern:'54-64%'};
  var stk=st.replace(/[^a-z]/gi,'').toLowerCase();
  var styleKey='swing';
  if(stk.indexOf('scalp')>=0) styleKey='scalping';
  else if(stk.indexOf('intra')>=0) styleKey='intraday';
  else if(stk.indexOf('pos')>=0||stk.indexOf('long')>=0) styleKey='position';
  var tips=(TIPS[mk]&&(TIPS[mk][styleKey]||TIPS[mk].swing))||[];
  var tipsHtml=tips.length
    ? '<div class="card" style="padding:14px 16px;border-left:2px solid '+col+';">'
        +'<div style="font-family:var(--mono);font-size:9px;color:'+col+';letter-spacing:2px;font-weight:700;margin-bottom:10px;">\ud83d\udca1 CONSEILS</div>'
        +tips.map(function(t){return '<div style="display:flex;gap:8px;margin-bottom:6px;font-size:11px;color:var(--tx-muted);"><span style="color:'+col+';">\u25b8</span><span>'+esc(t)+'</span></div>';}).join('')
      +'</div>'
    : '';
  var warnHtml='<div style="padding:10px 14px;background:rgba(255,209,102,.05);border:1px solid rgba(255,209,102,.15);border-radius:6px;font-size:10px;color:var(--yellow);font-family:var(--mono);">'
    +'\u26a0 Backtester sur 50+ trades avant le r\u00e9el. Les performances pass\u00e9es ne garantissent pas les r\u00e9sultats futurs.'
  +'</div>';
  document.getElementById('sb-output').innerHTML=
    '<div style="display:flex;flex-direction:column;gap:12px;">'
    +'<div class="card" style="padding:18px;border-top:2px solid '+col+';">'
      +'<div style="font-family:var(--mono);font-size:9px;color:'+col+';letter-spacing:2px;font-weight:700;margin-bottom:6px;">'+esc(ML[mk]||mk)+'</div>'
      +'<div style="font-size:15px;font-weight:700;color:var(--tx-hi);margin-bottom:14px;">Ma strat\u00e9gie personnalis\u00e9e</div>'
      +'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:14px;">'
        +[['R:R',RR[tp]||'1:2','var(--orange)'],['Win Rate',WR[en]||'55%','var(--green)'],['Risque/trade',rk+'%','var(--blue)']].map(function(p){
          return '<div style="background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:6px;padding:8px;text-align:center;">'
            +'<div style="font-family:var(--mono);font-size:8px;color:var(--tx-faint);margin-bottom:3px;">'+p[0]+'</div>'
            +'<div style="font-family:var(--mono);font-size:13px;font-weight:700;color:'+p[2]+';">'+esc(p[1])+'</div>'
          +'</div>';
        }).join('')
      +'</div>'
      +'<div style="display:flex;flex-direction:column;gap:8px;">'
        +[
          ['\u2705 ENTR\u00c9E',EL[en]||en,'rgba(0,232,150,.1)','rgba(0,232,150,.22)','var(--green)'],
          ['\ud83d\uded1 STOP LOSS',SL[sl]||sl,'rgba(255,71,87,.08)','rgba(255,71,87,.2)','var(--red)'],
          ['\ud83c\udfaf TAKE PROFIT',TL[tp]||tp,'rgba(255,102,0,.08)','rgba(255,102,0,.2)','var(--orange)']
        ].map(function(p){
          return '<div style="padding:10px 12px;background:'+p[2]+';border:1px solid '+p[3]+';border-radius:6px;">'
            +'<div style="font-family:var(--mono);font-size:9px;color:'+p[4]+';letter-spacing:1px;font-weight:700;margin-bottom:4px;">'+p[0]+'</div>'
            +'<div style="font-size:11px;color:var(--tx-muted);">'+esc(p[1])+'</div>'
          +'</div>';
        }).join('')
      +'</div>'
    +'</div>'
    +tipsHtml
    +warnHtml
    +'</div>';
  sbUpdateContext();
};

/* ─── init ─── */
function stratInit(){
  renderAll();
  sbUpdateContext();
}
AM.nav.registerInit('strategies', stratInit);
['sb-market','sb-style'].forEach(function(id){
  var el=document.getElementById(id);
  if(el) el.addEventListener('change', sbUpdateContext);
});
console.log('[Strategies] '+STRATS.length+' strat\u00e9gies \u2713');
})();
