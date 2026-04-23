(function(){
'use strict';

/* ─── Tools catalogue ─── */
var TTOOLS = {
  GRAPHIQUES:[
    /* Indices US — Vantage CFD (s'ouvrent parfaitement) */
    {id:'g-spx',    icon:'📊', lbl:'S&P 500',        sym:'VANTAGE:SP500',        tf:'D'},
    {id:'g-ndx',    icon:'📊', lbl:'NASDAQ 100',     sym:'IG:NASDAQ',        tf:'D'},
    {id:'g-dji',    icon:'📊', lbl:'Dow Jones',      sym:'VANTAGE:DJ30',         tf:'D'},
    {id:'g-dax',    icon:'📊', lbl:'DAX 40',         sym:'VANTAGE:GER40',        tf:'D'},
    {id:'g-uk100',  icon:'📊', lbl:'FTSE 100',       sym:'VANTAGE:UK100',        tf:'D'},
    {id:'g-jap225', icon:'📊', lbl:'Nikkei 225',     sym:'TOCOM:225E',       tf:'D'},
    /* Matières premières Vantage */
    {id:'g-gold',   icon:'🥇', lbl:'Or (XAU/USD)',   sym:'VANTAGE:XAUUSD',       tf:'D'},
    {id:'g-silver', icon:'🥈', lbl:'Argent',         sym:'VANTAGE:XAGUSD',       tf:'D'},
    {id:'g-oil',    icon:'🛢️',lbl:'Pétrole WTI',    sym:'TVC:USOIL',        tf:'D'},
    /* Macro/Taux */
    {id:'g-dxy',    icon:'💵', lbl:'Dollar Index',   sym:'TVC:DXY',              tf:'D'},
    {id:'g-10y',    icon:'📋', lbl:'US 10Y Yield',   sym:'TVC:US10Y',            tf:'W'},
    {id:'g-vix',    icon:'⚡', lbl:'VIX',            sym:'VANTAGE:VIX',             tf:'D'},
    {id:'g-custom', icon:'🔍', lbl:'Ticker libre',   sym:'',                     tf:'D', search:true},
  ],
  CRYPTO:[
    {id:'c-btc',    icon:'₿',  lbl:'BTC/USDT',      sym:'BINANCE:BTCUSDT',      tf:'D'},
    {id:'c-eth',    icon:'Ξ',  lbl:'ETH/USDT',      sym:'BINANCE:ETHUSDT',      tf:'D'},
    {id:'c-sol',    icon:'◎',  lbl:'SOL/USDT',      sym:'BINANCE:SOLUSDT',      tf:'D'},
    {id:'c-bnb',    icon:'🔶', lbl:'BNB/USDT',      sym:'BINANCE:BNBUSDT',      tf:'D'},
    {id:'c-xrp',    icon:'🔷', lbl:'XRP/USDT',      sym:'BINANCE:XRPUSDT',      tf:'D'},
    {id:'c-avax',   icon:'🔺', lbl:'AVAX/USDT',     sym:'BINANCE:AVAXUSDT',     tf:'D'},
    {id:'c-tot2',   icon:'💹', lbl:'Crypto Total2', sym:'CRYPTOCAP:TOTAL2',     tf:'W'},
    {id:'c-dom',    icon:'₿',  lbl:'BTC Dominance', sym:'CRYPTOCAP:BTC.D',      tf:'W'},
    {id:'c-heat',   icon:'🌡️',lbl:'Heatmap Crypto', type:'heatmap', mkt:'crypto'},
    {id:'c-fg',     icon:'😱', lbl:'Fear & Greed',  type:'fear'},
  ],
  ACTIONS:[
    /* Actions US — Vantage CFD */
    {id:'ac-nvda',  icon:'🔲', lbl:'NVIDIA',         sym:'VANTAGE:NVDA',         tf:'D'},
    {id:'ac-aapl',  icon:'🍎', lbl:'Apple',          sym:'VANTAGE:AAPL',         tf:'D'},
    {id:'ac-msft',  icon:'🪟', lbl:'Microsoft',      sym:'VANTAGE:MSFT',         tf:'D'},
    {id:'ac-meta',  icon:'👥', lbl:'Meta',           sym:'VANTAGE:META',         tf:'D'},
    {id:'ac-amzn',  icon:'📦', lbl:'Amazon',         sym:'VANTAGE:AMZN',         tf:'D'},
    {id:'ac-tsla',  icon:'⚡', lbl:'Tesla',          sym:'VANTAGE:TSLA',         tf:'D'},
    {id:'ac-googl', icon:'🔍', lbl:'Google',         sym:'VANTAGE:GOOGL',        tf:'D'},
    {id:'ac-spy',   icon:'📦', lbl:'SPY ETF',        sym:'VANTAGE:SPY',          tf:'D'},
    {id:'ac-qqq',   icon:'📦', lbl:'QQQ ETF',        sym:'VANTAGE:QQQ',          tf:'D'},
    {id:'ac-jpm',   icon:'🏦', lbl:'JPMorgan',       sym:'VANTAGE:JPM',          tf:'D'},
  ],
  FOREX:[
    {id:'f-eurusd', icon:'💱', lbl:'EUR/USD',        sym:'FX:EURUSD',            tf:'H4'},
    {id:'f-gbpusd', icon:'💱', lbl:'GBP/USD',        sym:'FX:GBPUSD',            tf:'H4'},
    {id:'f-usdjpy', icon:'💱', lbl:'USD/JPY',        sym:'FX:USDJPY',            tf:'H4'},
    {id:'f-audusd', icon:'💱', lbl:'AUD/USD',        sym:'FX:AUDUSD',            tf:'H4'},
    {id:'f-usdchf', icon:'💱', lbl:'USD/CHF',        sym:'FX:USDCHF',            tf:'H4'},
    {id:'f-usdcad', icon:'💱', lbl:'USD/CAD',        sym:'FX:USDCAD',            tf:'H4'},
    {id:'f-nzdusd', icon:'💱', lbl:'NZD/USD',        sym:'FX:NZDUSD',            tf:'H4'},
    {id:'f-cross',  icon:'🔗', lbl:'Forex Cross',    type:'fx-cross'},
  ],
  ANALYSE:[
    {id:'a-heat',   icon:'🌡️',lbl:'Heatmap S&P',   type:'heatmap', mkt:'stock'},
    {id:'a-hcrypt', icon:'🌡️',lbl:'Heatmap Crypto', type:'heatmap', mkt:'crypto'},
    {id:'a-scr',    icon:'🔍', lbl:'Screener US',   type:'screener'},
    {id:'a-eco',    icon:'📅', lbl:'Calendrier Éco',type:'ecal'},
    {id:'a-rsi',    icon:'📐', lbl:'RSI S&P 500',   sym:'VANTAGE:SP500', tf:'D', studies:'RSI@tv-basicstudies'},
    {id:'a-macd',   icon:'📐', lbl:'MACD BTC',      sym:'BINANCE:BTCUSDT', tf:'D', studies:'MACD@tv-basicstudies'},
    {id:'a-news',   icon:'📰', lbl:'News',          type:'news'},
    {id:'a-mkov',   icon:'🌍', lbl:'Vue Marchés',   type:'mkt-overview'},
  ],
  MACRO:[
    {id:'mc-dxy',   icon:'💵', lbl:'DXY Weekly',    sym:'TVC:DXY',              tf:'W'},
    {id:'mc-10y2y', icon:'📋', lbl:'Spread 10Y-2Y', sym:'FRED:T10Y2Y',          tf:'W'},
    {id:'mc-cpi',   icon:'💰', lbl:'CPI US',        sym:'FRED:CPIAUCSL',        tf:'M'},
    {id:'mc-ffr',   icon:'🏦', lbl:'Fed Funds',     sym:'FRED:FEDFUNDS',        tf:'M'},
    {id:'mc-gdp',   icon:'📊', lbl:'GDP US',        sym:'FRED:GDP',             tf:'Q'},
    {id:'mc-gcmp',  icon:'🔗', lbl:'Or vs CPI',     type:'compare', syms:'VANTAGE:XAUUSD,FRED:CPIAUCSL'},
    {id:'mc-spxdxy',icon:'🔗', lbl:'SPX vs DXY',    type:'compare', syms:'VANTAGE:US500,TVC:DXY'},
    {id:'mc-eco',   icon:'📅', lbl:'Calendrier',    type:'ecal'},
  ],
};

var TV = 'https://www.tradingview.com/widgetembed/?';
var TVP = '&theme=dark&style=1&locale=fr&timezone=Europe%2FParis&allow_symbol_change=1&withdateranges=1&hide_side_toolbar=0';

function tvSrc(sym, tf, studies) {
  var u = TV + 'symbol=' + encodeURIComponent(sym) + '&interval=' + (tf||'D') + TVP;
  if (studies) u += '&studies=' + encodeURIComponent(studies);
  return u;
}

function findTool(id) {
  var cats = Object.keys(TTOOLS);
  for (var i=0; i<cats.length; i++) {
    var arr = TTOOLS[cats[i]];
    for (var j=0; j<arr.length; j++) if (arr[j].id===id) return arr[j];
  }
  return null;
}

/* ─── State ─── */
var tabs = [], activeTid = null, nextId = 1, curCat = 'GRAPHIQUES';
var MAX = 8;

/* ─── Clock ─── */
var MKTS = [{city:'NY',off:-4,o:[9,30],c:[16,0]},{city:'PARIS',off:2,o:[9,0],c:[17,30]},{city:'TOKYO',off:9,o:[9,0],c:[15,30]}];
function pad(n){return n<10?'0'+n:''+n;}
function mktTime(off){
  var now=new Date(), utc=now.getTime()+now.getTimezoneOffset()*60000;
  var t=new Date(utc+3600000*off);
  return {h:t.getHours(),m:t.getMinutes(),str:pad(t.getHours())+':'+pad(t.getMinutes()),dow:t.getDay()};
}
function mktOpen(mk){
  var t=mktTime(mk.off), mins=t.h*60+t.m;
  return t.dow>=1&&t.dow<=5&&mins>=mk.o[0]*60+mk.o[1]&&mins<mk.c[0]*60+mk.c[1];
}
function tickClocks(){
  MKTS.forEach(function(mk,i){
    var el=document.getElementById('ttb-t-'+i); if(!el)return;
    var t=mktTime(mk.off);
    el.textContent=t.str;
    el.className='ttb-time '+(mktOpen(mk)?'mkt-open':'mkt-close');
  });
  var tc=document.getElementById('ttb-tc'); if(tc) tc.textContent=tabs.length+'/'+MAX+' ONGLETS';
}

/* ─── Build topbar (once) ─── */
function buildTopbar(){
  var sec=document.getElementById('p-terminal'); if(!sec)return;
  if(document.getElementById('term-topbar-pro')) return;
  // Remove old legacy topbar divs
  sec.querySelectorAll('div').forEach(function(d){
    if(d.style&&d.style.background==='#000'&&d.querySelector&&d.querySelector('#term-tab-count')){d.remove();}
  });
  var div=document.createElement('div');
  div.id='term-topbar-pro';
  div.innerHTML='<div class="ttb-brand">ARTHUR<em>.</em>TERMINAL</div>'
    +'<div class="ttb-clocks">'
    +MKTS.map(function(mk,i){
      return '<div class="ttb-clock"><span class="ttb-city">'+mk.city+'</span><span class="ttb-time mkt-close" id="ttb-t-'+i+'">--:--</span></div>';
    }).join('')+'</div>'
    +'<div class="ttb-right"><span class="ttb-live-dot"></span><span class="ttb-live-txt">LIVE</span><span class="ttb-tab-count" id="ttb-tc">0/'+MAX+' ONGLETS</span></div>';

  var firstChild = sec.firstElementChild;
  sec.insertBefore(div, firstChild);
}

/* ─── Build cats bar ─── */
function buildCatsBar(){
  var sec=document.getElementById('p-terminal'); if(!sec)return;
  if(document.getElementById('term-cats-bar')) return;
  // Remove old controls row
  var oldRow = sec.querySelector('[id="term-cat-sel"]');
  if(oldRow){ var p=oldRow.closest('div[style]'); if(p)p.remove(); }

  var bar=document.createElement('div'); bar.id='term-cats-bar';
  var cats=Object.keys(TTOOLS);
  bar.innerHTML=cats.map(function(c){
    return '<button class="tcat-btn'+(c===curCat?' on':'')+'" onclick="AM.term._cat(\''+c+'\')">'+c+'</button>';
  }).join('');

  // Insert before term-tabbar
  var tb=document.getElementById('term-tabbar');
  sec.insertBefore(bar, tb);

  // Build tools bar
  var toolsBar=document.createElement('div'); toolsBar.id='term-tools-bar';
  sec.insertBefore(toolsBar, tb);
  renderToolsBar();
}

function renderToolsBar(){
  var bar=document.getElementById('term-tools-bar'); if(!bar)return;
  var tools=TTOOLS[curCat]||[];
  bar.innerHTML=tools.map(function(t){
    return '<button class="ttool-btn" onclick="AM.term._open(\''+t.id+'\')" title="'+t.lbl+'">'+t.icon+' '+t.lbl+'</button>';
  }).join('');
}

/* ─── Tab bar ─── */
function renderTabbar(){
  // Use NEW tabbar v2
  var bar=document.getElementById('term-tabbar-v2');
  if(!bar){
    // Create it, insert before term-content
    bar=document.createElement('div'); bar.id='term-tabbar-v2';
    var cnt=document.getElementById('term-content');
    if(cnt&&cnt.parentNode) cnt.parentNode.insertBefore(bar,cnt);
  }
  if(!tabs.length){
    bar.innerHTML='<span class="ttab-hint">▶  Choisissez un outil dans la barre ci-dessus</span>';
    return;
  }
  bar.innerHTML=tabs.map(function(t){
    return '<button class="ttab'+(t.id===activeTid?' on':'')+'" onclick="AM.term._sw(\''+t.id+'\')">'
      +'<span class="ttab-ico">'+t.icon+'</span>'
      +'<span class="ttab-lbl">'+t.lbl+'</span>'
      +'<span class="ttab-x" onclick="event.stopPropagation();AM.term._close(\''+t.id+'\')" title="Fermer">×</span>'
      +'</button>';
  }).join('');
}

/* ─── Content ─── */
function renderContent(){
  // Use the existing term-content div as wrapper, but inject a v2 content div inside
  var wrap=document.getElementById('term-content'); if(!wrap)return;

  // Clear wrap, then inject fresh content-v2 div
  wrap.innerHTML='';

  if(!tabs.length){
    wrap.innerHTML='<div class="term-empty-v2">'
      +'<div class="tem-ico">▶</div>'
      +'<div class="tem-ttl">TERMINAL VIDE</div>'
      +'<div class="tem-sub">SÉLECTIONNEZ UN OUTIL DANS LA BARRE CI-DESSUS</div>'
      +'<div class="tem-btns">'
      +[['📊 S&P 500','g-spx'],['₿ Bitcoin','c-btc'],['💱 EUR/USD','g-eurusd'],['🥇 Or','g-gold'],['⚡ VIX','g-vix']].map(function(x){
          return '<button class="tem-btn" onclick="AM.term._open(\''+x[1]+'\')">'+x[0]+'</button>';
        }).join('')
      +'</div></div>';
    return;
  }

  tabs.forEach(function(tab){
    var pane=document.createElement('div');
    pane.className='tpane'+(tab.id===activeTid?' on':'');
    pane.id='tpane-'+tab.id;
    pane.innerHTML=buildPaneHTML(tab);
    wrap.appendChild(pane);
  });
}

function buildPaneHTML(tab){
  var tool=findTool(tab.toolId)||{};
  var ttype=tool.type||'chart';
  var sym=tab.sym||(tool.sym||'');
  var tf=tab.tf||(tool.tf||'D');
  var studies=tool.studies||'';

  /* Header */
  var tfs=['1','5','15','30','60','240','D','W','M'];
  var hdr='<div class="tpane-hdr">'
    +'<span style="font-size:15px;">'+tab.icon+'</span>'
    +'<div><div class="tpane-title">'+tab.lbl+'</div><div class="tpane-sub">'+(sym||ttype.toUpperCase())+'</div></div>';
  if(ttype==='chart'){
    hdr+='<div class="tpane-tfs">'
      +tfs.map(function(t){return '<button class="ttf'+(t===tf?' on':'')+'" onclick="AM.term._tf(\''+tab.id+'\',\''+t+'\')">'+t+'</button>';}).join('')
      +'</div>';
  }
  hdr+='</div>';

  /* Symbol search row */
  var symRow='';
  if(ttype==='chart'&&(tool.search||!sym)){
    symRow='<div class="tpane-sym-row">'
      +'<input class="tpane-sym-inp" id="tsym-'+tab.id+'" placeholder="TICKER..." value="'+sym+'" onkeydown="if(event.key===\'Enter\')AM.term._sym(\''+tab.id+'\')">'
      +'<button class="tpane-sym-go" onclick="AM.term._sym(\''+tab.id+'\')">GO</button>'
      +'<span style="font-family:var(--mono);font-size:9px;color:#333;">ex: BINANCE:BTCUSDT · NASDAQ:AAPL</span>'
      +'</div>';
  }

  /* Body */
  var body='';
  switch(ttype){
    case 'chart':
      if(!sym){ body='<div style="display:flex;align-items:center;justify-content:center;flex:1;min-height:560px;color:#2a2a2a;font-family:var(--mono);font-size:11px;letter-spacing:2px;">ENTREZ UN TICKER CI-DESSUS</div>'; break; }
      body='<iframe src="'+tvSrc(sym,tf,studies)+'" width="100%" height="600" frameborder="0" allowtransparency="1" scrolling="no" loading="lazy" id="tif-'+tab.id+'"></iframe>';
      break;
    case 'heatmap':
      var hmSrc=tool.mkt==='crypto'
        ?'https://www.tradingview.com/widget/crypto-coins-heatmap/?locale=fr&dataSource=Crypto&grouping=no_group&blockSize=market_cap_calc&blockColor=change&theme=dark&width=100%25&height=600'
        :'https://www.tradingview.com/widget/stock-heatmap/?locale=fr&screenerId=america&grouping=sector&theme=dark&width=100%25&height=600';
      body='<iframe src="'+hmSrc+'" width="100%" height="600" frameborder="0" allowtransparency="1" loading="lazy"></iframe>';
      break;
    case 'mkt-overview':
      body='<iframe src="https://www.tradingview.com/widget/market-overview/?locale=fr&theme=dark&width=100%25&height=600" width="100%" height="600" frameborder="0" allowtransparency="1" loading="lazy"></iframe>';
      break;
    case 'ecal':
      body='<iframe src="https://www.tradingview.com/widget/events/?locale=fr&importanceFilter=0,1&theme=dark&width=100%25&height=600" width="100%" height="600" frameborder="0" allowtransparency="1" loading="lazy"></iframe>';
      break;
    case 'screener':
      body='<iframe src="https://www.tradingview.com/widget/screener/?locale=fr&screenerId=america&theme=dark&width=100%25&height=600" width="100%" height="600" frameborder="0" allowtransparency="1" loading="lazy"></iframe>';
      break;
    case 'fx-cross':
      body='<iframe src="https://www.tradingview.com/widget/forex-cross-rates/?locale=fr&theme=dark&width=100%25&height=600" width="100%" height="600" frameborder="0" allowtransparency="1" loading="lazy"></iframe>';
      break;
    case 'ticker':
      body='<iframe src="https://www.tradingview.com/widget/ticker-tape/?locale=fr&colorTheme=dark&isTransparent=true&displayMode=adaptive&width=100%25&height=76" width="100%" height="76" frameborder="0" allowtransparency="1"></iframe>'
          +'<iframe src="https://www.tradingview.com/widget/market-overview/?locale=fr&theme=dark&width=100%25&height=520" width="100%" height="520" frameborder="0" allowtransparency="1" loading="lazy"></iframe>';
      break;
    case 'news':
      body='<iframe src="https://www.tradingview.com/widget/timeline/?locale=fr&feedMode=all_symbols&isTransparent=true&displayMode=regular&colorTheme=dark&width=100%25&height=600" width="100%" height="600" frameborder="0" allowtransparency="1" loading="lazy"></iframe>';
      break;
    case 'compare':
      var ss=(tool.syms||'SP:SPX,TVC:GOLD').split(',');
      var cu=TV+'symbol='+encodeURIComponent(ss[0])+'&compare='+encodeURIComponent(ss.slice(1).join(','))+'&interval=W'+TVP;
      body='<iframe src="'+cu+'" width="100%" height="600" frameborder="0" allowtransparency="1" loading="lazy"></iframe>';
      break;
    case 'fear':
      body=buildFG();
      break;
    default:
      body='<div style="display:flex;align-items:center;justify-content:center;flex:1;min-height:560px;color:#222;font-family:var(--mono);">'+ttype+'</div>';
  }

  return hdr+symRow+body;
}

function buildFG(){
  var v=38+Math.floor(Math.random()*30);
  var lbl=v<25?'EXTRÊME PEUR':v<45?'PEUR':v<55?'NEUTRE':v<75?'AVIDITÉ':'EXTRÊME AVIDITÉ';
  var col=v<25?'#ff4757':v<45?'#ff7043':v<55?'#888':v<75?'#00e896':'#00c853';
  var ang=(v/100)*180-90, r=110, cx=150, cy=140;
  var rad=(ang-90)*Math.PI/180;
  var nx=cx+r*Math.cos(rad), ny=cy+r*Math.sin(rad);
  return '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;flex:1;min-height:560px;gap:20px;background:#000;">'
    +'<div style="font-family:var(--mono);font-size:9px;color:#333;letter-spacing:3px;">FEAR & GREED INDEX</div>'
    +'<svg width="300" height="165" viewBox="0 0 300 165">'
    +'<defs><linearGradient id="fgG" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#ff4757"/><stop offset="50%" stop-color="#888"/><stop offset="100%" stop-color="#00e896"/></linearGradient></defs>'
    +'<path d="M 30 145 A 120 120 0 0 1 270 145" fill="none" stroke="#111" stroke-width="18" stroke-linecap="round"/>'
    +'<path d="M 30 145 A 120 120 0 0 1 270 145" fill="none" stroke="url(#fgG)" stroke-width="7" stroke-linecap="round"/>'
    +'<line x1="'+cx+'" y1="'+cy+'" x2="'+nx.toFixed(1)+'" y2="'+ny.toFixed(1)+'" stroke="'+col+'" stroke-width="3" stroke-linecap="round"/>'
    +'<circle cx="'+cx+'" cy="'+cy+'" r="5" fill="'+col+'"/>'
    +'<text x="150" y="100" text-anchor="middle" font-family="monospace" font-size="38" font-weight="700" fill="'+col+'">'+v+'</text>'
    +'<text x="150" y="122" text-anchor="middle" font-family="monospace" font-size="10" fill="'+col+'">'+lbl+'</text>'
    +'<text x="30" y="162" text-anchor="middle" font-family="monospace" font-size="8" fill="#2a2a2a">PEUR</text>'
    +'<text x="270" y="162" text-anchor="middle" font-family="monospace" font-size="8" fill="#2a2a2a">AVIDITÉ</text>'
    +'</svg>'
    +'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:420px;">'
    +[['Hier','42'],['Semaine','51'],['Mois','65']].map(function(d){
        var n=parseInt(d[1]), c2=n<45?'#ff7043':n<55?'#888':'#00e896';
        var l2=n<45?'Peur':n<55?'Neutre':'Avidité';
        return '<div style="background:#080808;border:1px solid #1a1a1a;border-radius:6px;padding:12px;text-align:center;">'
          +'<div style="font-family:monospace;font-size:8px;color:#333;letter-spacing:1px;margin-bottom:5px;">'+d[0].toUpperCase()+'</div>'
          +'<div style="font-family:monospace;font-size:24px;font-weight:700;color:'+c2+';">'+d[1]+'</div>'
          +'<div style="font-family:monospace;font-size:9px;color:'+c2+';">'+l2+'</div>'
          +'</div>';
      }).join('')
    +'</div></div>';
}

/* ─── Re-render helpers ─── */
function redraw(){
  renderTabbar();
  renderContent();
  tickClocks();
  var tc=document.getElementById('ttb-tc'); if(tc) tc.textContent=tabs.length+'/'+MAX+' ONGLETS';
}

/* ─── Public API ─── */
AM.term = {
  init: function(){
    var sec=document.getElementById('p-terminal'); if(!sec)return;

    // Hide old tabbar
    var oldTb=document.getElementById('term-tabbar');
    if(oldTb) oldTb.style.display='none';
    // Hide old add-tab row
    sec.querySelectorAll('div').forEach(function(d){
      if(d.innerHTML&&d.innerHTML.indexOf('term-cat-sel')!==-1) d.style.display='none';
    });

    buildTopbar();
    buildCatsBar();
    redraw();

    // Clock tick
    tickClocks();
    setInterval(tickClocks, 10000);

    // Default tabs
    if(tabs.length===0){
      AM.term._open('g-spx');
      AM.term._open('g-gold');
      AM.term._open('c-btc');
    }
  },

  /* legacy compat */
  addTab:        function(){ AM.term._open(TTOOLS[curCat][0].id); },
  replaceTab:    function(){},
  closeTab:      function(id){ AM.term._close(id); },
  switchTab:     function(id){ AM.term._sw(id); },
  catChange:     function(){},
  loadChart:     function(id){ AM.term._open(id); },
  loadStockChart:function(sym){ AM.term._openSym(sym); },
  calcIC:        function(){},

  _cat: function(cat){
    curCat=cat;
    // Update cat buttons
    document.querySelectorAll('.tcat-btn').forEach(function(b){
      b.classList.toggle('on', b.textContent===cat);
    });
    renderToolsBar();
  },

  _open: function(toolId){
    var tool=findTool(toolId); if(!tool)return;
    if(tabs.length>=MAX){ AM.term._close(tabs[0].id); }
    var id='t'+(nextId++);
    tabs.push({id:id, toolId:toolId, icon:tool.icon, lbl:tool.lbl, sym:tool.sym||'', tf:tool.tf||'D'});
    activeTid=id;
    redraw();
  },

  _openSym: function(sym){
    if(tabs.length>=MAX){ AM.term._close(tabs[0].id); }
    var id='t'+(nextId++);
    tabs.push({id:id, toolId:'g-custom', icon:'📊', lbl:sym, sym:sym.toUpperCase(), tf:'D'});
    activeTid=id;
    redraw();
  },

  _close: function(id){
    var idx=tabs.findIndex(function(t){return t.id===id;});
    if(idx===-1)return;
    tabs.splice(idx,1);
    if(activeTid===id) activeTid=tabs.length?tabs[Math.max(0,idx-1)].id:null;
    redraw();
  },

  _sw: function(id){
    activeTid=id;
    document.querySelectorAll('.tpane').forEach(function(p){
      p.classList.toggle('on', p.id==='tpane-'+id);
    });
    document.querySelectorAll('.ttab').forEach(function(b){
      b.classList.toggle('on', b.onclick&&b.getAttribute('onclick').indexOf("'"+id+"'")!==-1);
    });
    tickClocks();
  },

  _tf: function(tabId, tf){
    var tab=tabs.find(function(t){return t.id===tabId;}); if(!tab)return;
    tab.tf=tf;
    var ifrm=document.getElementById('tif-'+tabId);
    if(ifrm){
      var tool=findTool(tab.toolId)||{};
      ifrm.src=tvSrc(tab.sym||tool.sym||'SP:SPX', tf, tool.studies);
    }
    var pane=document.getElementById('tpane-'+tabId);
    if(pane) pane.querySelectorAll('.ttf').forEach(function(b){b.classList.toggle('on',b.textContent===tf);});
  },

  _sym: function(tabId){
    var inp=document.getElementById('tsym-'+tabId); if(!inp)return;
    var sym=inp.value.trim().toUpperCase(); if(!sym)return;
    var tab=tabs.find(function(t){return t.id===tabId;}); if(!tab)return;
    tab.sym=sym; tab.lbl=sym;
    var ifrm=document.getElementById('tif-'+tabId);
    if(ifrm){
      var tool=findTool(tab.toolId)||{};
      ifrm.src=tvSrc(sym, tab.tf||'D', tool.studies);
    }
    // Update tab label
    var lbl=document.querySelector('#term-tabbar-v2 .ttab.on .ttab-lbl');
    if(lbl) lbl.textContent=sym;
    // Update pane subtitle
    var sub=document.querySelector('#tpane-'+tabId+' .tpane-sub');
    if(sub) sub.textContent=sym;
  },
};

console.log('[AM.term v2] Terminal chargé ✓');
})();
