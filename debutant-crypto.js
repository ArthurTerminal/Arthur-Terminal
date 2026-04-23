/* ── MODULE GUIDE DÉBUTANT CRYPTO ── */
(function() {
  var DBT = [
    { tier:'tier1', sym:'BTC', name:'Bitcoin', icon:'₿', risk:'low', rc:'var(--green)', cap:'~1.3T$', created:'2009', founder:'Satoshi Nakamoto',
      desc:'La première et la plus connue des cryptomonnaies. Bitcoin est une monnaie numérique décentralisée, sans banque centrale ni intermédiaire.',
      pourquoi:'Valeur refuge du monde crypto. Adoption institutionnelle massive. Offre limitée à 21 millions de BTC.',
      usage:'Réserve de valeur · Paiements peer-to-peer · Couverture inflation',
      tech:'Blockchain Proof-of-Work · Transactions ~10 min · ~7 tx/sec',
      tags:['Store of Value','Pionnier','Institutionnel'],
      pros:['Le plus liquide et reconnu','Offre fixe et prévisible','Infrastructure mature','Accepté partout dans le monde'],
      cons:['Transactions lentes et coûteuses','Très volatile à court terme','Consommation énergétique élevée'],
      score:95, pair:'BINANCE:BTCUSDT' },
    { tier:'tier1', sym:'ETH', name:'Ethereum', icon:'Ξ', risk:'low', rc:'var(--green)', cap:'~300B$', created:'2015', founder:'Vitalik Buterin',
      desc:'La plateforme de smart contracts la plus utilisée au monde. Permet de créer des applications décentralisées, des tokens et des NFT.',
      pourquoi:'Le carburant de tout l\'écosystème DeFi, NFT et Web3. Des milliers de projets sont construits dessus.',
      usage:'Smart contracts · DeFi · NFT · Staking · dApps',
      tech:'Blockchain Proof-of-Stake · ~12 sec/bloc · ~30 tx/sec (L1)',
      tags:['Smart Contracts','DeFi','Web3'],
      pros:['Écosystème le plus riche','Proof-of-Stake (écologique)','Staking possible (~4% APY)','Support institutionnel fort'],
      cons:['Frais élevés en congestion','Concurrence de SOL, ADA...','Complexité technique'],
      score:90, pair:'BINANCE:ETHUSDT' },
    { tier:'tier1', sym:'BNB', name:'BNB', icon:'B', risk:'moderate', rc:'var(--yellow)', cap:'~80B$', created:'2017', founder:'Changpeng Zhao (CZ)',
      desc:'Token natif de Binance, le plus grand exchange crypto au monde. Utilisé pour payer des frais réduits sur la plateforme et dans l\'écosystème BNB Chain.',
      pourquoi:'Très lié à l\'écosystème Binance. Réductions de frais, staking, accès aux launchpads IEO.',
      usage:'Réduction frais Binance · BNB Chain · DeFi · Launchpads',
      tech:'BNB Chain · Proof-of-Staked-Authority · ~3 sec/bloc',
      tags:['Exchange Token','DeFi','Écosystème'],
      pros:['Très liquide','Réduction frais Binance (-25%)','Forte demande grâce à Binance'],
      cons:['Risque centralisé lié à Binance','Régulation incertaine','Performance liée à Binance'],
      score:70, pair:'BINANCE:BNBUSDT' },
    { tier:'stablecoins', sym:'USDT', name:'Tether', icon:'$', risk:'low', rc:'var(--green)', cap:'~110B$', created:'2014', founder:'Tether Ltd.',
      desc:'Le stablecoin le plus utilisé au monde. 1 USDT = 1 USD. Permet de rester en crypto sans subir la volatilité du marché.',
      pourquoi:'Indispensable pour trader, transférer des fonds rapidement entre exchanges et sécuriser ses gains sans passer par une banque.',
      usage:'Trading · Transferts · Épargne temporaire · DeFi',
      tech:'Multi-chaîne (Ethereum, Tron, Solana...) · Collatéralisé en USD',
      tags:['Stablecoin','Dollar','Liquidité'],
      pros:['Très liquide — accepté partout','Pas de volatilité','Transferts rapides et pas chers'],
      cons:['Risque de contrepartie (Tether Ltd.)','Peu de transparence sur les réserves','Pas de rendement natif'],
      score:80, pair:'BINANCE:USDCUSDT' },
    { tier:'stablecoins', sym:'USDC', name:'USD Coin', icon:'$', risk:'low', rc:'var(--green)', cap:'~40B$', created:'2018', founder:'Circle & Coinbase',
      desc:'Stablecoin réglementé émis par Circle, adossé 1:1 au dollar américain avec des audits réguliers. Plus transparent que l\'USDT.',
      pourquoi:'Alternative plus réglementée et transparente à l\'USDT. Privilégié par les institutions et les protocoles DeFi sérieux.',
      usage:'DeFi · Institutions · Épargne · Paiements Web3',
      tech:'Ethereum, Solana, Polygon... · Audits mensuels · Réserves en cash',
      tags:['Stablecoin','Réglementé','Transparent'],
      pros:['Audité régulièrement','Soutenu par Coinbase','Très bon pour DeFi'],
      cons:['Peut être gelé par Circle','Moins liquide que USDT','Risque bancaire'],
      score:80, pair:'BINANCE:USDCUSDT' },
    { tier:'stablecoins', sym:'DAI', name:'DAI', icon:'D', risk:'moderate', rc:'var(--yellow)', cap:'~5B$', created:'2017', founder:'MakerDAO',
      desc:'Stablecoin décentralisé géré par le protocole MakerDAO. Sa valeur est maintenue à ~1$ via des mécanismes de collatéralisation en crypto.',
      pourquoi:'Le stablecoin décentralisé de référence. Pas de contrôle central — idéal pour la philosophie DeFi pure.',
      usage:'DeFi · Épargne décentralisée · Prêts/emprunts',
      tech:'Ethereum · Smart contracts MakerDAO · Sur-collatéralisé',
      tags:['Stablecoin','Décentralisé','DeFi'],
      pros:['Vraiment décentralisé','Pas de risque Tether/Circle','Rendement possible via DSR (~5%)'],
      cons:['Mécanisme complexe','Peut perdre son peg en crise','Moins liquide'],
      score:50, pair:'BINANCE:DAIUSDT' },
    { tier:'tier2', sym:'SOL', name:'Solana', icon:'S', risk:'high', rc:'var(--orange)', cap:'~60B$', created:'2020', founder:'Anatoly Yakovenko',
      desc:'Blockchain ultra-rapide et peu coûteuse, conçue pour rivaliser avec Ethereum. Très populaire dans le monde des NFT et du DeFi.',
      pourquoi:'Vitesse et frais bas inégalés. Écosystème en plein essor, notamment pour les NFT et les meme coins.',
      usage:'DeFi · NFT · Meme coins · Paiements rapides · Gaming Web3',
      tech:'Proof-of-History + PoS · ~65 000 tx/sec · Frais < 0.001$ · ~400ms/bloc',
      tags:['Smart Contracts','NFT','Haute Performance'],
      pros:['Transactions quasi-gratuites','Vitesse exceptionnelle','Forte adoption NFT'],
      cons:['Historique de pannes réseau','Plus centralisé qu\'Ethereum','Risque concurrence'],
      score:72, pair:'BINANCE:SOLUSDT' },
    { tier:'tier2', sym:'XRP', name:'Ripple XRP', icon:'X', risk:'high', rc:'var(--orange)', cap:'~100B$', created:'2012', founder:'Ripple Labs',
      desc:'Cryptomonnaie axée sur les transferts internationaux rapides et peu coûteux. Utilisée par des banques et institutions financières mondiales.',
      pourquoi:'Pont entre finance traditionnelle et crypto. Partenariats avec +300 institutions.',
      usage:'Paiements internationaux · Banques · Corridors de change',
      tech:'XRP Ledger · Consensus Protocol · ~4 sec · Frais ~0.0001$',
      tags:['Paiements','Institutionnel','Banques'],
      pros:['Quasi-instantané','Frais microscopiques','Adoption institutionnelle réelle'],
      cons:['Procès SEC (en cours)','Fortement centralisé','Dépendant de Ripple Labs'],
      score:65, pair:'BINANCE:XRPUSDT' },
    { tier:'tier2', sym:'ADA', name:'Cardano', icon:'A', risk:'high', rc:'var(--orange)', cap:'~15B$', created:'2017', founder:'Charles Hoskinson',
      desc:'Blockchain académique et scientifique, développée de manière très méthodique. Connue pour sa rigueur et son approche peer-reviewed.',
      pourquoi:'Approche scientifique sérieuse. Staking natif accessible (~4-6% APY). Focus sur l\'inclusion financière.',
      usage:'Smart contracts · Staking · Identité numérique · Afrique',
      tech:'Ouroboros PoS · Haskell · ~250 tx/sec · Multi-asset natif',
      tags:['Smart Contracts','Académique','Staking'],
      pros:['Développement très rigoureux','Staking simple et accessible','Communauté solide'],
      cons:['Développement lent','Écosystème moins riche','Adoption dApps limitée'],
      score:60, pair:'BINANCE:ADAUSDT' },
    { tier:'tier2', sym:'AVAX', name:'Avalanche', icon:'A', risk:'high', rc:'var(--orange)', cap:'~8B$', created:'2020', founder:'Emin Gun Sirer',
      desc:'Plateforme de smart contracts haute performance avec une architecture unique en 3 chaines. Très populaire pour la création de sous-réseaux (Subnets).',
      pourquoi:'Finalité des transactions en moins d\'une seconde. Très apprécié des institutions pour ses Subnets dédiés.',
      usage:'DeFi · Subnets · Jeux Web3 · Finance institutionnelle',
      tech:'Avalanche Consensus · 3 chaines (X/P/C-Chain) · ~4 500 tx/sec · Finalité < 1s',
      tags:['Smart Contracts','Subnets','Institutionnel'],
      pros:['Finalité ultra-rapide','Architecture modulaire','Bon écosystème DeFi'],
      cons:['Concurrence intense','Token inflation','Écosystème plus petit'],
      score:58, pair:'BINANCE:AVAXUSDT' },
    { tier:'tier2', sym:'DOT', name:'Polkadot', icon:'O', risk:'high', rc:'var(--orange)', cap:'~8B$', created:'2020', founder:'Gavin Wood',
      desc:'Réseau permettant à différentes blockchains de communiquer entre elles (interopérabilité). Créé par un co-fondateur d\'Ethereum.',
      pourquoi:'Vision d\'un internet des blockchains. Les Parachains permettent de créer des blockchains spécialisées connectées.',
      usage:'Interopérabilité · Parachains · DeFi cross-chain',
      tech:'Relay Chain + Parachains · Nominated PoS · Substrate framework',
      tags:['Interopérabilité','Cross-Chain','Web3'],
      pros:['Architecture unique et visionnaire','Staking (~13% APY)','Communauté développeurs active'],
      cons:['Complexité technique élevée','Adoption lente','Concurrence de Cosmos'],
      score:52, pair:'BINANCE:DOTUSDT' },
    { tier:'tier2', sym:'LINK', name:'Chainlink', icon:'L', risk:'high', rc:'var(--orange)', cap:'~7B$', created:'2017', founder:'Sergey Nazarov',
      desc:'Oracle décentralisé qui connecte les smart contracts aux données du monde réel (prix, météo, résultats sportifs...). Infrastructure critique du DeFi.',
      pourquoi:'Indispensable à l\'écosystème DeFi. Sans oracles fiables, les smart contracts ne peuvent pas fonctionner avec des données externes.',
      usage:'Oracles · DeFi data feeds · Automatisation · Cross-chain',
      tech:'Réseau d\'oracles décentralisés · CCIP (cross-chain) · Preuve de réserve',
      tags:['Oracle','Infrastructure','DeFi'],
      pros:['Infrastructure critique — forte demande','Partenariats avec grandes entreprises','Token utilitaire clair'],
      cons:['Dépendant de l\'adoption DeFi','Concurrence GRT, API3','Complexité'],
      score:55, pair:'BINANCE:LINKUSDT' },
    { tier:'tier3', sym:'DOGE', name:'Dogecoin', icon:'D', risk:'very-high', rc:'var(--red)', cap:'~25B$', created:'2013', founder:'Jackson Palmer & Billy Markus',
      desc:'Créé comme une blague internet, Dogecoin est devenu l\'un des meme coins les plus connus. Propulsé par Elon Musk et la communauté Reddit.',
      pourquoi:'Liquidité élevée, forte communauté. Très sensible aux tweets d\'Elon Musk et aux tendances des réseaux sociaux.',
      usage:'Pourboires · Meme · Spéculation · Paiements informels',
      tech:'Fork de Litecoin · Proof-of-Work · Offre illimitée',
      tags:['Meme Coin','Communauté','Spéculatif'],
      pros:['Très liquide','Communauté énorme','Faible prix unitaire'],
      cons:['Aucun cas d\'usage réel','Offre illimitée — inflation','Extrêmement volatil'],
      score:30, pair:'BINANCE:DOGEUSDT' },
    { tier:'tier3', sym:'MATIC', name:'Polygon', icon:'P', risk:'high', rc:'var(--orange)', cap:'~4B$', created:'2017', founder:'Sandeep Nailwal',
      desc:'Solution de scaling pour Ethereum (Layer 2). Permet des transactions rapides et bon marché tout en bénéficiant de la sécurité d\'Ethereum.',
      pourquoi:'Rend Ethereum accessible. Utilisé par de nombreuses dApps, jeux et protocoles DeFi.',
      usage:'Layer 2 ETH · DeFi · Gaming · NFT · Entreprises',
      tech:'Sidechain + ZK Rollups · ~65 000 tx/sec · Frais < 0.01$ · EVM compatible',
      tags:['Layer 2','Ethereum','Scaling'],
      pros:['Compatibilité EVM totale','Gros écosystème (Aave, OpenSea...)','Migration vers ZK-tech'],
      cons:['Concurrence intense (Arbitrum, OP)','Centralisation relative','Transition zkEVM risquée'],
      score:55, pair:'BINANCE:MATICUSDT' },
    { tier:'tier3', sym:'UNI', name:'Uniswap', icon:'U', risk:'very-high', rc:'var(--red)', cap:'~3B$', created:'2020', founder:'Hayden Adams',
      desc:'Token de gouvernance du plus grand exchange décentralisé (DEX) au monde. Permet d\'échanger des tokens directement sans intermédiaire.',
      pourquoi:'Uniswap est l\'un des protocoles DeFi les plus importants. UNI donne un droit de vote sur les décisions du protocole.',
      usage:'Gouvernance DEX · DeFi · Liquidity mining',
      tech:'AMM (Automated Market Maker) · Ethereum · Smart contracts · V4 (hooks)',
      tags:['DeFi','DEX','Gouvernance'],
      pros:['Protocole le plus utilisé en DeFi','Innovation continue (V3, V4)','Token de gouvernance réel'],
      cons:['Valeur du token purement spéculative','Forte concurrence (Curve, 1inch)','Pas de dividendes directs'],
      score:35, pair:'BINANCE:UNIUSDT' },
    { tier:'tier3', sym:'ARB', name:'Arbitrum', icon:'A', risk:'very-high', rc:'var(--red)', cap:'~2B$', created:'2023', founder:'Offchain Labs',
      desc:'Token de gouvernance du Layer 2 Ethereum le plus utilisé. Arbitrum réduit les frais d\'Ethereum via des Optimistic Rollups.',
      pourquoi:'Leader du marché L2 avec le plus grand TVL (Total Value Locked). Écosystème DeFi très actif.',
      usage:'Gouvernance L2 · DeFi · Gaming · Staking',
      tech:'Optimistic Rollups · EVM compatible · ~40 000 tx/sec · Nitro upgrade',
      tags:['Layer 2','Ethereum','DeFi'],
      pros:['Leader L2 en TVL','Compatibilité EVM parfaite','Airdrop généreux passé'],
      cons:['Token très dilué','Forte concurrence (OP, Base)','Gouvernance complexe'],
      score:40, pair:'BINANCE:ARBUSDT' }
  ];

  var RL = { low:'Faible', moderate:'Modéré', high:'Élevé', 'very-high':'Très élevé' };

  function bar(s) {
    var col = s>=80?'var(--green)':s>=60?'var(--yellow)':s>=40?'var(--orange)':'var(--red)';
    return '<div style="background:var(--bg-input);border-radius:3px;height:5px;overflow:hidden;margin-top:4px;"><div style="height:5px;width:'+s+'%;background:'+col+';border-radius:3px;"></div></div>';
  }

  function card(c) {
    return '<div onclick="dbtOpenModal(\''+c.sym+'\')" style="background:var(--bg-card);border:1px solid var(--br-soft);border-radius:10px;padding:14px 16px;cursor:pointer;transition:border-color .15s,transform .15s;" onmouseover="this.style.borderColor=\''+c.rc+'\';this.style.transform=\'translateY(-2px)\'" onmouseout="this.style.borderColor=\'var(--br-soft)\';this.style.transform=\'none\'">'
      +'<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:10px;">'
        +'<div style="display:flex;align-items:center;gap:10px;">'
          +'<div style="width:38px;height:38px;border-radius:10px;background:rgba(255,102,0,.1);border:1px solid var(--orange-bdr);display:flex;align-items:center;justify-content:center;font-family:var(--mono);font-size:16px;font-weight:700;color:var(--orange);">'+c.icon+'</div>'
          +'<div><div style="font-family:var(--mono);font-size:14px;font-weight:700;color:var(--tx-hi);">'+c.sym+'</div><div style="font-size:11px;color:var(--tx-muted);">'+c.name+'</div></div>'
        +'</div>'
        +'<div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">'
          +'<span style="width:10px;height:10px;background:'+c.rc+';border-radius:50%;display:inline-block;"></span>'
          +'<span style="font-size:9px;font-family:var(--mono);color:var(--tx-faint);">'+c.cap+'</span>'
        +'</div>'
      +'</div>'
      +'<div style="font-size:11px;color:var(--tx-muted);margin-bottom:10px;line-height:1.6;">'+c.desc.substring(0,100)+'...</div>'
      +'<div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px;">'+c.tags.map(function(t){return'<span style="font-size:9px;padding:2px 8px;border-radius:10px;background:var(--orange-bg);color:var(--orange);border:1px solid var(--orange-bdr);font-family:var(--mono);">'+t+'</span>';}).join('')+'</div>'
      +'<div><div style="display:flex;justify-content:space-between;margin-bottom:2px;"><span style="font-size:10px;color:var(--tx-faint);">Score débutant</span><span style="font-size:10px;font-family:var(--mono);color:var(--tx-mid);">'+c.score+'/100</span></div>'+bar(c.score)+'</div>'
    +'</div>';
  }

  function dbtRender(filter) {
    ['tier1','stablecoins','tier2','tier3'].forEach(function(tier) {
      var el = document.getElementById('dbt-grid-'+tier);
      if (!el) return;
      var block = el.closest ? el.closest('.dbt-tier-block') : null;
      var list = DBT.filter(function(c){ return c.tier===tier && (filter==='all'||filter===tier); });
      if (block) block.style.display = (list.length===0 && filter!=='all') ? 'none' : '';
      el.innerHTML = list.map(card).join('');
    });
  }

  window.dbtFilter = function(btn, filter) {
    var bar2 = document.getElementById('dbt-filter-bar');
    if (bar2) bar2.querySelectorAll('.dbt-fb').forEach(function(b){
      b.style.background='var(--bg-card)'; b.style.color='var(--tx-mid)';
      b.style.border='1px solid var(--br-mid)'; b.style.fontWeight='';
    });
    if (btn) { btn.style.background='var(--orange)'; btn.style.color='#000'; btn.style.border='1px solid var(--orange)'; btn.style.fontWeight='700'; }

    var quizPanel = document.getElementById('dbt-panel-quiz');
    var conseilsPanel = document.getElementById('dbt-conseils');

    if (filter === 'quiz') {
      // Show quiz, hide grids and conseils
      ['tier1','stablecoins','tier2','tier3'].forEach(function(tier) {
        var block = document.querySelector('.dbt-tier-block[data-tier="'+tier+'"]');
        if (block) block.style.display = 'none';
      });
      var legend = document.querySelector('#debutant-root > div:nth-child(2)');
      if (legend) legend.style.display = 'none';
      if (conseilsPanel) conseilsPanel.style.display = 'none';
      if (quizPanel) { quizPanel.style.display = ''; dbtRenderQuiz(); }
    } else {
      // Hide quiz, show grids
      if (quizPanel) quizPanel.style.display = 'none';
      if (conseilsPanel) conseilsPanel.style.display = '';
      var legend2 = document.querySelector('#debutant-root > div:nth-child(2)');
      if (legend2) legend2.style.display = '';
      dbtRender(filter);
    }
  };

  window.dbtOpenModal = function(sym) {
    var c = null;
    for (var i=0; i<DBT.length; i++) { if (DBT[i].sym===sym) { c=DBT[i]; break; } }
    if (!c) return;
    var modal = document.getElementById('dbt-modal');
    var body  = document.getElementById('dbt-modal-body');
    if (!modal || !body) return;
    body.innerHTML = ''
      +'<button onclick="document.getElementById(\'dbt-modal\').style.display=\'none\'" style="position:absolute;top:12px;right:16px;background:none;border:none;color:var(--tx-muted);font-size:22px;cursor:pointer;line-height:1;">&#x00D7;</button>'
      +'<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">'
        +'<div style="width:48px;height:48px;border-radius:12px;background:var(--orange-bg);border:1px solid var(--orange-bdr);display:flex;align-items:center;justify-content:center;font-size:20px;font-family:var(--mono);font-weight:700;color:var(--orange);">'+c.icon+'</div>'
        +'<div><div style="font-size:16px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);">'+c.sym+' &#8212; '+c.name+'</div><div style="font-size:11px;color:var(--tx-muted);">'+c.created+' &#183; '+c.founder+'</div></div>'
        +'<div style="margin-left:auto;text-align:right;"><div style="font-size:9px;color:var(--tx-faint);margin-bottom:4px;">Score débutant</div><div style="font-size:22px;font-weight:700;color:'+c.rc+';font-family:var(--mono);">'+c.score+'</div></div>'
      +'</div>'
      +'<div style="font-size:12px;color:var(--tx-mid);line-height:1.7;margin-bottom:14px;padding:12px;background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:8px;">'+c.desc+'</div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">'
        +'<div style="padding:10px;background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:8px;"><div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--orange);font-family:var(--mono);font-weight:700;margin-bottom:6px;">Market Cap</div><div style="font-size:12px;font-family:var(--mono);color:var(--tx-hi);">'+c.cap+'</div></div>'
        +'<div style="padding:10px;background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:8px;"><div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--orange);font-family:var(--mono);font-weight:700;margin-bottom:6px;">Risque</div><div style="font-size:12px;font-family:var(--mono);color:'+c.rc+';">'+(RL[c.risk]||c.risk)+'</div></div>'
      +'</div>'
      +'<div style="margin-bottom:12px;"><div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--orange);font-family:var(--mono);font-weight:700;margin-bottom:6px;">Pourquoi ce projet ?</div><div style="font-size:11px;color:var(--tx-mid);line-height:1.7;">'+c.pourquoi+'</div></div>'
      +'<div style="margin-bottom:12px;"><div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--orange);font-family:var(--mono);font-weight:700;margin-bottom:6px;">Cas d\'usage</div><div style="font-size:11px;color:var(--tx-mid);">'+c.usage+'</div></div>'
      +'<div style="margin-bottom:14px;"><div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--orange);font-family:var(--mono);font-weight:700;margin-bottom:6px;">Technologie</div><div style="font-size:11px;color:var(--tx-muted);font-family:var(--mono);">'+c.tech+'</div></div>'
      +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">'
        +'<div style="padding:10px;background:rgba(0,232,150,.04);border:1px solid var(--green-bdr);border-radius:8px;"><div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--green);font-family:var(--mono);font-weight:700;margin-bottom:6px;">Points forts</div>'+c.pros.map(function(p){return'<div style="font-size:11px;color:var(--tx-mid);padding:2px 0;">&#10003; '+p+'</div>';}).join('')+'</div>'
        +'<div style="padding:10px;background:rgba(255,71,87,.04);border:1px solid var(--red-bdr);border-radius:8px;"><div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--red);font-family:var(--mono);font-weight:700;margin-bottom:6px;">Points faibles</div>'+c.cons.map(function(p){return'<div style="font-size:11px;color:var(--tx-mid);padding:2px 0;">&#10007; '+p+'</div>';}).join('')+'</div>'
      +'</div>'
      +'<div style="display:flex;gap:8px;padding-top:14px;border-top:1px solid var(--br-soft);">'
        +(c.pair?'<button onclick="if(AM&&AM.cryptoChart&&AM.nav){AM.nav.goto(\'crypto\');setTimeout(function(){AM.cryptoChart.setPair(\''+c.pair+'\',null);if(AM.nav.pickMod)AM.nav.pickMod(\'crypto\',\'chart\');},300);}document.getElementById(\'dbt-modal\').style.display=\'none\';" style="flex:1;font-family:var(--mono);font-size:11px;padding:8px;border-radius:6px;border:1px solid var(--orange);background:var(--orange);color:#000;cursor:pointer;font-weight:700;">Voir le graphique</button>':'')
        +'<button onclick="document.getElementById(\'dbt-modal\').style.display=\'none\'" style="padding:8px 16px;border-radius:6px;border:1px solid var(--br-mid);background:transparent;color:var(--tx-mid);cursor:pointer;font-size:11px;">Fermer</button>'
      +'</div>';
    modal.style.display = 'flex';
    modal.onclick = function(e){ if(e.target===modal) modal.style.display='none'; };
  };

  // Patch renderMod pour déclencher dbtRender après injection du HTML
  var _orig = AM.nav.renderMod;
  AM.nav.renderMod = function(page, key) {
    _orig.call(AM.nav, page, key);
    if (page==='debutant' && key==='guide') {
      setTimeout(function(){ dbtRender('all'); }, 30);
    }
    if (page==='debutant' && key==='bourse') {
      setTimeout(function(){ brsInit(); setTimeout(hookQuizDoneStates, 200); }, 30);
    }
    if (page==='debutant' && key==='forex') {
      setTimeout(function(){ frxInit(); setTimeout(hookQuizDoneStates, 200); }, 30);
    }
    if (page==='debutant' && key==='matieres') {
      setTimeout(function(){ mpGuideInit(); setTimeout(hookQuizDoneStates, 200); }, 30);
    }
    if (page==='debutant' && key==='economie') {
      setTimeout(function(){ ecoGuideInit(); setTimeout(hookQuizDoneStates, 200); }, 30);
    }
    if (page==='debutant' && key==='immo') {
      setTimeout(function(){ if(window.immoGuideInit) immoGuideInit(); setTimeout(hookQuizDoneStates, 200); }, 30);
    }
    if (page==='debutant' && key==='classement') {
      setTimeout(function(){
        if(window.XPS) {
          var el = document.getElementById('xps-panel-leaderboard');
          if (el) {
            XPS.renderLeaderboard();
            // Pré-render les défis en background
            if (window.DC) setTimeout(function(){ window.DC.render(); }, 100);
          } else setTimeout(function(){ if(window.XPS) XPS.renderLeaderboard(); }, 200);
        }
      }, 50);
    }
  };

  console.log('[Guide Débutant] Module chargé');
})();

/* ═══════════════════════════════════════════════════════════
   GUIDE CRYPTO — Leçons + Quiz par niveau v2.0
   ═══════════════════════════════════════════════════════════ */
(function() {

/* ─── DONNÉES : LEÇONS & QUIZ ─── */
var CRYPTO_LEVELS = [
  {
    id: 'debutant',
    label: 'Débutant',
    icon: '🟢',
    color: 'var(--green)',
    colorBg: 'var(--green-bg)',
    colorBdr: 'var(--green-bdr)',
    desc: 'Les fondamentaux crypto — idéal pour partir de zéro',
    xpPerLesson: 20,
    lessons: [
      {
        id: 'deb-1',
        title: "C'est quoi une cryptomonnaie ?",
        emoji: '₿',
        duration: '5 min',
        content: [
          { type: 'intro', text: "Une cryptomonnaie est une monnaie numérique décentralisée, sécurisée par la cryptographie. Contrairement à l'euro ou au dollar, aucune banque centrale ne la contrôle." },
          { type: 'point', icon: '🔑', title: 'Décentralisation', text: "Les transactions sont validées par des milliers d'ordinateurs dans le monde entier (les nœuds), pas par une seule institution." },
          { type: 'point', icon: '🔒', title: 'Sécurité cryptographique', text: "Chaque transaction est signée mathématiquement. Il est impossible de falsifier ou d'annuler une transaction validée." },
          { type: 'point', icon: '🌍', title: 'Accessibilité mondiale', text: "Avec juste un smartphone et une connexion internet, n'importe qui dans le monde peut envoyer ou recevoir des cryptos en quelques secondes." },
          { type: 'example', label: 'Exemple concret', text: "Envoyer 100€ en Bitcoin à Tokyo prend 10 minutes et coûte moins de 1€ de frais. Virement bancaire international : 3 jours, 30€ de frais minimum." },
          { type: 'key', text: "💡 Les cryptos ne sont pas anonymes mais pseudonymes : les transactions sont publiques, mais les identités ne sont pas directement visibles." }
        ],
        quiz: [
          { q: "Qu'est-ce qui différencie principalement une cryptomonnaie d'une monnaie traditionnelle ?", opts: ["Elle est plus difficile à utiliser", "Elle est décentralisée et non contrôlée par une banque centrale", "Elle ne peut pas être échangée", "Elle est uniquement numérique"], ans: 1, exp: "La décentralisation est la caractéristique fondamentale des cryptos. Aucune banque centrale, aucun gouvernement, aucune entreprise ne contrôle le réseau Bitcoin ou Ethereum." },
          { q: "Une transaction Bitcoin est-elle totalement anonyme ?", opts: ["Oui, totalement anonyme", "Non, elle est pseudonyme : publique mais sans nom directement associé", "Oui, personne ne peut la voir", "Non, votre nom est affiché publiquement"], ans: 1, exp: "Bitcoin est pseudonyme : toutes les transactions sont visibles sur la blockchain, mais associées à des adresses (suites de chiffres/lettres), pas à des noms. Des outils d'analyse on-chain peuvent cependant parfois identifier des acteurs." },
          { q: "Combien de temps prend environ un virement Bitcoin international ?", opts: ["3 à 5 jours ouvrés", "Quelques secondes à quelques minutes", "Un mois", "C'est impossible à faire"], ans: 1, exp: "Une transaction Bitcoin est généralement confirmée en 10 à 60 minutes selon les frais payés, contre 1 à 5 jours pour un virement bancaire international SWIFT." }
        ]
      },
      {
        id: 'deb-2',
        title: 'La Blockchain expliquée simplement',
        emoji: '⛓️',
        duration: '6 min',
        content: [
          { type: 'intro', text: "La blockchain est le registre public et immuable qui enregistre toutes les transactions crypto. Imaginez un cahier comptable que tout le monde peut lire mais que personne ne peut effacer." },
          { type: 'point', icon: '📦', title: 'Les blocs', text: "Chaque 'bloc' contient un lot de transactions (environ toutes les 10 minutes pour Bitcoin). Il contient aussi un 'hash' cryptographique du bloc précédent, créant une chaîne." },
          { type: 'point', icon: '🔗', title: 'La chaîne', text: "Les blocs sont liés entre eux chronologiquement. Modifier un ancien bloc invaliderait tous les blocs suivants — il faudrait recalculer toute la chaîne, ce qui est techniquement impossible." },
          { type: 'point', icon: '🖥️', title: 'Les nœuds', text: "Des milliers d'ordinateurs (nœuds) conservent une copie complète de la blockchain et vérifient chaque nouvelle transaction. Pas de serveur central = pas de point de défaillance unique." },
          { type: 'example', label: 'Analogie', text: "La blockchain, c'est comme un Google Docs partagé entre des milliers de personnes simultanément, où tout le monde voit toutes les modifications en temps réel, et où rien ne peut être supprimé." },
          { type: 'key', text: "💡 Il existe des centaines de blockchains différentes : Bitcoin, Ethereum, Solana, Avalanche… Chacune a ses propres règles, vitesses et usages." }
        ],
        quiz: [
          { q: "Qu'est-ce qu'un 'bloc' dans une blockchain ?", opts: ["Un portefeuille de cryptomonnaies", "Un lot de transactions groupées et validées cryptographiquement", "Un mineur de Bitcoin", "Une unité de monnaie crypto"], ans: 1, exp: "Un bloc est un paquet de transactions validées. Pour Bitcoin, un nouveau bloc est créé environ toutes les 10 minutes et contient en moyenne 2 000 transactions." },
          { q: "Pourquoi est-il impossible de modifier une transaction déjà enregistrée dans la blockchain ?", opts: ["Parce que les transactions sont supprimées après validation", "Parce que modifier un bloc invaliderait tous les blocs suivants, ce qui nécessiterait de recalculer toute la chaîne", "Parce que seuls les mineurs peuvent modifier les données", "Parce que les transactions sont cryptées de façon irréversible"], ans: 1, exp: "Chaque bloc contient le hash du précédent. Modifier un bloc signifie changer son hash, ce qui invalide le bloc suivant, puis le suivant, etc. Il faudrait plus de puissance de calcul que 51% du réseau pour réussir — économiquement impossible." },
          { q: "Combien de copies de la blockchain Bitcoin existent-elles ?", opts: ["Une seule, chez Satoshi Nakamoto", "Une par pays", "Des milliers, chez chaque nœud du réseau", "Exactement 21 millions"], ans: 2, exp: "Plus de 15 000 nœuds complets Bitcoin maintiennent une copie intégrale de la blockchain dans le monde. Cette redondance rend le réseau extrêmement résistant à toute censure ou panne." }
        ]
      },
      {
        id: 'deb-3',
        title: 'Bitcoin & Ethereum — Les 2 piliers',
        emoji: '⚡',
        duration: '7 min',
        content: [
          { type: 'intro', text: "Bitcoin et Ethereum représentent ensemble plus de 60% du marché crypto. Comprendre leur différence est essentiel avant d'investir." },
          { type: 'point', icon: '₿', title: 'Bitcoin (BTC) — La réserve de valeur', text: "Créé en 2009 par Satoshi Nakamoto. Supply limité à 21 millions. Conçu comme alternative à l'or numérique et au système bancaire. Simple mais robuste. Consensus : Proof of Work." },
          { type: 'point', icon: 'Ξ', title: 'Ethereum (ETH) — La plateforme programmable', text: "Créé en 2015 par Vitalik Buterin. Permet l'exécution de smart contracts et d'applications décentralisées (dApps). C'est la base de la DeFi, des NFT et du Web3. Consensus : Proof of Stake." },
          { type: 'point', icon: '⚖️', title: 'Différences clés', text: "Bitcoin = monnaie digitale et réserve de valeur. Ethereum = plateforme de développement. Les deux sont complémentaires et souvent détenus ensemble par les investisseurs." },
          { type: 'example', label: 'Analogie', text: "Bitcoin c'est comme l'or : on en garde pour préserver sa valeur. Ethereum c'est comme un système d'exploitation (Windows, iOS) : les développeurs y construisent des applications." },
          { type: 'key', text: "💡 La capitalisation boursière totale du marché crypto suit souvent la tendance BTC. Un marché haussier commence généralement avec une montée de Bitcoin." }
        ],
        quiz: [
          { q: "Quel est le supply maximum de Bitcoin ?", opts: ["10 millions de BTC", "21 millions de BTC", "100 millions de BTC", "Illimité"], ans: 1, exp: "Le Bitcoin a un supply maximum de 21 millions programmé dans son code. Environ 19,7 millions sont en circulation. Cette rareté programmée est l'une des raisons pour lesquelles beaucoup le comparent à l'or." },
          { q: "Qui a créé Ethereum ?", opts: ["Satoshi Nakamoto", "Charlie Lee", "Vitalik Buterin", "Jack Dorsey"], ans: 2, exp: "Ethereum a été proposé par Vitalik Buterin en 2013 (il avait 19 ans) et lancé en 2015. Buterin voulait créer une blockchain programmable, là où Bitcoin se limite aux transactions de valeur." },
          { q: "Quelle est la principale utilité d'Ethereum par rapport à Bitcoin ?", opts: ["Ethereum est plus rapide pour les paiements", "Ethereum permet l'exécution de smart contracts et le développement d'applications décentralisées", "Ethereum a un supply plus limité", "Ethereum est plus sécurisé que Bitcoin"], ans: 1, exp: "Ethereum est une plateforme de développement : les développeurs y déploient des smart contracts pour créer DeFi, NFT, DAOs, jeux blockchain… Bitcoin reste focalisé sur son rôle de monnaie et réserve de valeur." }
        ]
      }
    ]
  },
  {
    id: 'intermediaire',
    label: 'Intermédiaire',
    icon: '🟡',
    color: 'var(--yellow)',
    colorBg: 'var(--yellow-bg)',
    colorBdr: 'var(--yellow-bdr)',
    desc: 'DeFi, staking, cycles de marché — passez au niveau supérieur',
    xpPerLesson: 40,
    lessons: [
      {
        id: 'int-1',
        title: 'DeFi — La finance décentralisée',
        emoji: '🏦',
        duration: '8 min',
        content: [
          { type: 'intro', text: "La DeFi (Decentralized Finance) regroupe des services financiers accessibles à tous, sans banque, via des smart contracts. Prêts, emprunts, échanges, rendements — tout sans intermédiaire." },
          { type: 'point', icon: '🔄', title: 'DEX — Échanges décentralisés', text: "Uniswap, Curve, dYdX permettent d'échanger des tokens directement entre portefeuilles, sans exchange centralisé. Les liquidités sont fournies par des utilisateurs (Liquidity Providers) qui gagnent des frais." },
          { type: 'point', icon: '💰', title: 'Lending & Borrowing', text: "Protocoles comme Aave ou Compound permettent de prêter ses cryptos et gagner des intérêts, ou d'emprunter en déposant du collatéral. Les taux sont déterminés algorithmiquement par l'offre et la demande." },
          { type: 'point', icon: '🌾', title: 'Yield Farming & Liquidity Mining', text: "Fournir de la liquidité à un protocole DeFi génère des tokens de récompense en plus des frais. Peut générer des rendements élevés mais comporte des risques spécifiques (impermanent loss)." },
          { type: 'example', label: 'Exemple', text: "Sur Aave, vous déposez 1 ETH comme collatéral (valeur ~3000$), vous empruntez 1500 USDC, vous les investissez ailleurs. Si vos gains dépassent le taux d'emprunt, vous êtes bénéficiaire net." },
          { type: 'key', text: "⚠️ Risque DeFi : smart contract bugs (hacks), liquidations si le collatéral baisse, risque de rug pull sur nouveaux protocoles. Audits de sécurité = essentiel." }
        ],
        quiz: [
          { q: "Qu'est-ce qu'un DEX (Decentralized Exchange) ?", opts: ["Une version mobile d'un exchange centralisé", "Une plateforme d'échange de cryptos fonctionnant via smart contracts sans intermédiaire", "Un portefeuille hardware", "Un protocole de staking"], ans: 1, exp: "Un DEX comme Uniswap permet d'échanger des tokens directement depuis son wallet, sans créer de compte, sans KYC, sans déposer ses fonds sur une plateforme tierce. Les échanges se font via des pools de liquidité." },
          { q: "Qu'est-ce que l'impermanent loss en DeFi ?", opts: ["La perte liée aux frais de transaction", "Une perte potentielle subie par les fournisseurs de liquidité quand le prix des tokens diverge", "Un bug de smart contract", "La dépréciation naturelle d'un token"], ans: 1, exp: "L'impermanent loss (perte non-permanente) survient quand le ratio de prix des deux tokens d'un pool change. Le fournisseur de liquidité aurait été plus rentable à juste détenir les tokens. Elle devient 'permanente' si vous retirez votre liquidité." },
          { q: "Qu'est-ce qui détermine les taux d'intérêt sur les protocoles DeFi comme Aave ?", opts: ["La banque centrale du pays concerné", "Algorithmiquement, selon l'offre et la demande de liquidités", "Les fondateurs du protocole", "Le cours du Bitcoin"], ans: 1, exp: "Sur Aave ou Compound, les taux sont ajustés en temps réel par un algorithme : plus un actif est emprunté (utilisation élevée), plus le taux d'emprunt monte pour inciter de nouveaux prêteurs à déposer." }
        ]
      },
      {
        id: 'int-2',
        title: 'Cycles de marché crypto',
        emoji: '📊',
        duration: '7 min',
        content: [
          { type: 'intro', text: "Le marché crypto suit des cycles prévisibles, fortement corrélés au halving Bitcoin. Comprendre ces cycles permet d'optimiser vos points d'entrée et de sortie." },
          { type: 'point', icon: '🔴', title: 'Bear Market (marché baissier)', text: "Période de baisse prolongée (-60% à -90% depuis les ATH). Dure généralement 1 à 2 ans. Phase d'accumulation pour les investisseurs à long terme. La peur et le désespoir dominent." },
          { type: 'point', icon: '🟢', title: 'Bull Market (marché haussier)', text: "Période de hausse soutenue. Dure généralement 12 à 18 mois après un halving. L'euphorie et le FOMO (Fear Of Missing Out) s'installent. C'est le moment de prendre des profits progressivement." },
          { type: 'point', icon: '✂️', title: 'Le Halving Bitcoin', text: "Tous les ~4 ans, la récompense des mineurs est divisée par 2. L'offre de nouveaux BTC ralentit. Historiquement, chaque halving a précédé un bull market majeur (2012, 2016, 2020, 2024)." },
          { type: 'point', icon: '📉', title: 'Indicateurs de cycle', text: "Fear & Greed Index, MVRV ratio, Puell Multiple, NVT ratio sont des indicateurs on-chain pour évaluer où en est le cycle. Disponibles sur Glassnode, LookIntoBitcoin." },
          { type: 'key', text: "💡 Stratégie DCA : investir une somme fixe chaque mois quelles que soient les conditions de marché. Cette approche bat statistiquement le market timing pour la majorité des investisseurs." }
        ],
        quiz: [
          { q: "Qu'est-ce qu'un halving Bitcoin et à quelle fréquence se produit-il ?", opts: ["La division du prix du Bitcoin par deux, chaque année", "La réduction de moitié de la récompense des mineurs, tous les ~4 ans (~210 000 blocs)", "Un fork du réseau Bitcoin tous les 2 ans", "La fermeture annuelle de certains exchanges"], ans: 1, exp: "Le halving réduit la récompense par bloc de 50%. Après le halving de 2024, les mineurs reçoivent 3,125 BTC par bloc au lieu de 6,25. Cela ralentit l'inflation de l'offre et a historiquement précédé des bull markets." },
          { q: "Qu'est-ce que le Fear & Greed Index ?", opts: ["Un indicateur du cours du Bitcoin", "Un indicateur mesurant le sentiment du marché crypto entre peur extrême et cupidité extrême", "Un index des frais de transaction", "Un classement des cryptomonnaies par capitalisation"], ans: 1, exp: "Le Crypto Fear & Greed Index va de 0 (peur extrême) à 100 (cupidité extrême). Historiquement, investir en période de 'peur extrême' donne de meilleurs rendements. Warren Buffett : 'Soyez avide quand les autres ont peur.'" },
          { q: "Combien de temps dure généralement un bear market crypto ?", opts: ["1 à 2 semaines", "1 à 3 mois", "1 à 2 ans", "5 à 10 ans"], ans: 2, exp: "Les bear markets crypto durent généralement entre 12 et 24 mois. Le bear market 2018-2019 a duré ~15 mois, celui de 2022-2023 environ 12 mois. Ces périodes sont idéales pour accumuler progressivement." }
        ]
      },
      {
        id: 'int-3',
        title: 'Staking & Revenus passifs crypto',
        emoji: '🌾',
        duration: '6 min',
        content: [
          { type: 'intro', text: "Le staking consiste à bloquer des cryptomonnaies pour participer à la validation du réseau et recevoir des récompenses. C'est le moyen le plus simple de générer des revenus passifs en crypto." },
          { type: 'point', icon: '🔒', title: 'Staking natif (PoS)', text: "Sur les blockchains Proof of Stake (Ethereum, Solana, Cardano…), les validateurs doivent staker des tokens comme garantie. Les stakers gagnent une partie des frais de transaction en récompense." },
          { type: 'point', icon: '💧', title: 'Liquid Staking', text: "Protocoles comme Lido (stETH) ou Rocket Pool (rETH) permettent de staker ETH tout en recevant un token liquide (stETH) utilisable en DeFi. Vous gagnez des récompenses sans immobiliser vos fonds." },
          { type: 'point', icon: '🏪', title: 'Staking sur exchange', text: "Binance, Coinbase, Kraken proposent du staking simplifié directement sur leur plateforme. Plus simple mais vous perdez le contrôle de vos clés ('Not your keys, not your coins')." },
          { type: 'point', icon: '📊', title: 'APY typiques (2024)', text: "ETH staking : ~4%/an. SOL : ~6-7%/an. ADA : ~3-4%/an. Les rendements en DeFi peuvent aller jusqu'à 10-20% mais avec des risques supplémentaires." },
          { type: 'key', text: "⚠️ Attention aux promesses de rendements très élevés (>20%/an en stablecoins) : c'est souvent un signal d'alarme. Terra Luna (2022) offrait 20% sur l'USDT… avant de s'effondrer." }
        ],
        quiz: [
          { q: "Qu'est-ce que le 'liquid staking' ?", opts: ["Staker des cryptos en gardant les fonds liquides grâce à un token représentatif échangeable", "Acheter des cryptos avec un effet de levier", "Vendre ses cryptos progressivement", "Miner des cryptos avec un ASIC"], ans: 0, exp: "Le liquid staking (Lido, Rocket Pool) donne un token représentatif (stETH pour ETH staké sur Lido). Ce token peut être utilisé en DeFi, vendu, ou transféré, tout en continuant à générer des récompenses de staking." },
          { q: "Quel est le principal risque du staking sur un exchange centralisé ?", opts: ["Les rendements sont trop faibles", "Vous n'avez pas le contrôle de vos clés privées", "Il faut du matériel spécialisé", "Il est impossible de retirer ses fonds"], ans: 1, exp: "'Not your keys, not your coins' : staker sur un exchange signifie confier ses fonds à une tierce partie. Si l'exchange fait faillite (ex: FTX en 2022), vous pouvez perdre vos fonds. Le staking self-custody est plus sécurisé." },
          { q: "Un protocole DeFi offrant 50% d'APY en stablecoins est-il fiable ?", opts: ["Oui, c'est normal en DeFi", "Non, des rendements aussi élevés sur stablecoins sont généralement un signal d'alarme", "Oui, si c'est audité", "Cela dépend du cours du Bitcoin"], ans: 1, exp: "Des rendements très élevés sur stablecoins (>15-20%/an) indiquent souvent un risque élevé caché : token de récompense inflationniste, risque de rug pull, ou modèle Ponzi. Terra/Luna offrait 20% sur UST avant son effondrement total." }
        ]
      }
    ]
  },
  {
    id: 'avance',
    label: 'Avancé',
    icon: '🔴',
    color: 'var(--red)',
    colorBg: 'var(--red-bg)',
    colorBdr: 'var(--red-bdr)',
    desc: 'Analyse on-chain, trading avancé, tokenomics — pour les experts',
    xpPerLesson: 60,
    lessons: [
      {
        id: 'adv-1',
        title: 'Analyse On-Chain — Lire la blockchain',
        emoji: '🔍',
        duration: '10 min',
        content: [
          { type: 'intro', text: "L'analyse on-chain consiste à exploiter les données publiques de la blockchain pour comprendre le comportement des acteurs (baleines, mineurs, exchanges) et anticiper les mouvements de marché." },
          { type: 'point', icon: '🐳', title: "Mouvement des baleines", text: "Surveiller les grandes adresses (baleines détenant >1000 BTC). Des transferts massifs vers des exchanges signalent souvent une vente imminente. Des sorties d'exchanges vers des cold wallets = accumulation." },
          { type: 'point', icon: '📊', title: 'MVRV Ratio', text: "Market Value to Realized Value : compare la capitalisation actuelle à la valeur à laquelle les holders ont acquis leurs BTC. MVRV > 3.5 = zone de danger (distribution). MVRV < 1 = zone d'accumulation." },
          { type: 'point', icon: '⛏️', title: 'Puell Multiple', text: "Mesure les revenus des mineurs en USD par rapport à leur moyenne historique. Un Puell Multiple très bas (<0.5) indique que les mineurs vendent à perte = zone de capitulation = bon point d'entrée." },
          { type: 'point', icon: '🔗', title: 'Exchange Flows', text: "L'afflux net de BTC/ETH vers les exchanges indique une pression vendeuse. Un retrait massif des exchanges (stockage en cold wallet) = signal haussier — les investisseurs ne veulent pas vendre." },
          { type: 'example', label: 'Outils', text: "Glassnode (premium), CryptoQuant, Nansen (analyse adresses), Dune Analytics (requêtes SQL sur blockchain), IntoTheBlock." },
          { type: 'key', text: "💡 L'analyse on-chain ne prédit pas le prix à court terme mais donne une vue des tendances structurelles : qui accumule, qui distribue, à quel prix les grands acteurs sont entrés." }
        ],
        quiz: [
          { q: "Que signifie un afflux massif de BTC vers les exchanges (exchange inflow) ?", opts: ["Les miners accumulent du BTC", "Une pression vendeuse potentielle — les détenteurs envoient leurs BTC sur des exchanges pour vendre", "Le réseau est saturé", "Le prix va nécessairement monter"], ans: 1, exp: "Envoyer des BTC sur un exchange est la première étape pour les vendre. Un exchange inflow élevé signale une intention de vente. À l'inverse, retirer ses BTC des exchanges (vers cold wallets) = accumulation = signal haussier." },
          { q: "Qu'indique un MVRV ratio inférieur à 1 ?", opts: ["Le marché est en forte hausse", "Les holders sont en perte latente en moyenne — zone historique d'accumulation", "Les mineurs distribuent leurs BTC", "Les smart contracts Ethereum sont défaillants"], ans: 1, exp: "MVRV < 1 signifie que la valeur de marché actuelle est inférieure à la valeur réalisée (prix moyen d'achat des holders). La majorité des détenteurs sont en perte. C'est historiquement une zone de capitulation et de bon point d'entrée long terme." },
          { q: "Qu'est-ce que Glassnode ?", opts: ["Un exchange décentralisé", "Une plateforme d'analyse on-chain fournissant des métriques blockchain avancées", "Un portefeuille hardware", "Un protocole DeFi de prêt"], ans: 1, exp: "Glassnode est la référence de l'analyse on-chain. Il agrège les données publiques de la blockchain et calcule des centaines de métriques (MVRV, SOPR, exchange flows, whale behavior…) pour aider les traders et investisseurs." }
        ]
      },
      {
        id: 'adv-2',
        title: 'Tokenomics — Analyser un projet crypto',
        emoji: '📐',
        duration: '9 min',
        content: [
          { type: 'intro', text: "Les tokenomics (token economics) décrivent la structure économique d'un token : distribution, inflation, utilité, mécanismes de brûlage. C'est l'une des analyses les plus importantes avant d'investir." },
          { type: 'point', icon: '📊', title: 'Supply — Total vs Circulant', text: "Circulating Supply : tokens en circulation aujourd'hui. Total Supply : tous les tokens qui existeront. Max Supply : plafond absolu. Un ratio circulant/total faible peut indiquer une forte inflation future (dilution)." },
          { type: 'point', icon: '📅', title: 'Vesting & Unlock Schedule', text: "Les équipes et investisseurs reçoivent leurs tokens graduellement (vesting). Surveiller les dates d'unlock massif : une libération de tokens d'équipe peut créer une forte pression vendeuse." },
          { type: 'point', icon: '🔥', title: 'Mécanismes déflationnaires', text: "Certains projets brûlent des tokens pour réduire l'offre. Ethereum brûle des frais de transaction (EIP-1559) depuis 2021. BNB brûle 20% des profits de Binance. Une offre qui diminue = potentiel haussier." },
          { type: 'point', icon: '⚙️', title: "Utilité du token", text: "Un token doit avoir une utilité réelle : gouvernance (voter sur le protocole), paiement de frais, staking, accès à des fonctionnalités. Un token sans utilité claire = risque élevé." },
          { type: 'example', label: 'Analyse rapide', text: "Vérifiez : 1) Quelle % de supply est déjà distribuée ? 2) Quand les tokens d'équipe/VC sont-ils débloqués ? 3) Y a-t-il un mécanisme de brûlage ? 4) À quoi sert vraiment le token ?" },
          { type: 'key', text: "⚠️ Red flags tokenomics : >50% aux équipes/VC avec vesting court, supply illimitée sans brûlage, token sans utilité claire, FDV (Fully Diluted Valuation) 10x supérieure à la market cap actuelle." }
        ],
        quiz: [
          { q: "Qu'est-ce que le 'Fully Diluted Valuation' (FDV) d'un token ?", opts: ["La capitalisation actuelle basée sur le supply en circulation", "La valorisation totale si tous les tokens (max supply) étaient en circulation", "Les frais totaux générés par le protocole", "La valeur totale verrouillée en DeFi"], ans: 1, exp: "Le FDV = Prix actuel × Max Supply. Si le FDV est 10x la market cap actuelle, cela signifie que 90% des tokens ne sont pas encore en circulation. Quand ils seront libérés, ils dilueront les holders actuels — risque baissier important." },
          { q: "Qu'est-ce qu'un 'token unlock' et pourquoi est-ce important à surveiller ?", opts: ["Un mécanisme pour déverrouiller un wallet perdu", "La libération programmée de tokens (équipe/VC) qui peut créer une pression vendeuse massive", "Une mise à jour du protocole", "Un airdrop de tokens gratuits"], ans: 1, exp: "Les équipes et investisseurs reçoivent leurs tokens avec un calendrier de vesting (ex: 1 an de cliff puis libération sur 3 ans). Les grandes dates d'unlock peuvent entraîner des ventes massives si le prix est élevé. Des sites comme Token Unlocks ou Vesting.app trackent ces dates." },
          { q: "Quel mécanisme Ethereum a introduit avec l'EIP-1559 (août 2021) ?", opts: ["Le Proof of Stake", "La brûlure (burn) d'une partie des frais de transaction, rendant ETH potentiellement déflationnaire", "Les smart contracts", "Les Layer 2"], ans: 1, exp: "EIP-1559 a introduit un mécanisme où une partie des frais de gas est brûlée (détruite), réduisant l'offre totale d'ETH. En périodes de forte activité réseau, ETH brûlé > ETH émis : ETH devient déflationnaire, ce qui est positif pour sa valeur." }
        ]
      },
      {
        id: 'adv-3',
        title: 'Layer 2 & Scalabilité blockchain',
        emoji: '⚡',
        duration: '8 min',
        content: [
          { type: 'intro', text: "Les blockchains principales comme Ethereum sont limitées en débit (15-30 tps). Les solutions Layer 2 résolvent ce problème en traitant les transactions hors de la chaîne principale tout en héritant de sa sécurité." },
          { type: 'point', icon: '🔄', title: 'Rollups — La solution dominante', text: "Les Optimistic Rollups (Arbitrum, Optimism, Base) et ZK-Rollups (zkSync, StarkNet, Scroll) regroupent des centaines de transactions en une seule sur Ethereum, réduisant les coûts de 10x à 100x." },
          { type: 'point', icon: '⚡', title: 'Optimistic vs ZK Rollups', text: "Optimistic : assume que les transactions sont valides, période de contestation de 7 jours pour les retraits. ZK : preuve cryptographique mathématique de validité, retraits quasi-instantanés mais plus complexes." },
          { type: 'point', icon: '🌉', title: 'Bridges inter-chaînes', text: "Les bridges permettent de transférer des actifs entre blockchains (ETH → Arbitrum, Bitcoin → Ethereum). Risque majeur : les bridges ont été le principal vecteur de hacks DeFi (~$2,5B volés en 2022)." },
          { type: 'point', icon: '📡', title: 'Écosystème L2 actuel', text: "Arbitrum : L2 Ethereum le plus utilisé en TVL. Base (Coinbase) : croissance rapide. Starknet : ZK-rollup avec langage Cairo. zkSync Era : ZK EVM-compatible. Polygon zkEVM." },
          { type: 'key', text: "💡 L'activité sur les L2 est un excellent indicateur de l'adoption d'Ethereum. Suivre les métriques L2BEAT (tvl.l2beat.com) pour mesurer la santé de l'écosystème." }
        ],
        quiz: [
          { q: "Quelle est la différence principale entre Optimistic Rollups et ZK-Rollups ?", opts: ["Les Optimistic sont plus chers", "Les Optimistic supposent les transactions valides (avec période de contestation), les ZK prouvent mathématiquement leur validité", "Les ZK ne sont pas compatibles avec Ethereum", "Il n'y a aucune différence pratique"], ans: 1, exp: "Optimistic Rollups (Arbitrum, Optimism) publient les données et attendent 7 jours pour les contestations. Les ZK-Rollups (zkSync, StarkNet) génèrent une preuve cryptographique irréfutable à chaque batch, permettant des retraits quasi-instantanés vers L1." },
          { q: "Pourquoi les bridges inter-chaînes sont-ils considérés comme particulièrement risqués ?", opts: ["Ils sont trop lents", "Ils concentrent de grandes quantités de fonds et représentent une surface d'attaque critique", "Ils ne fonctionnent que pour Ethereum", "Ils sont trop coûteux en frais"], ans: 1, exp: "Les bridges doivent bloquer des actifs sur une chaîne et les réémettre sur une autre, créant des contrats avec des milliards de dollars de TVL. Ce sont des cibles privilégiées des hackers. Ronin (Axie Infinity) : $625M volés. Wormhole : $320M." },
          { q: "Que mesure L2BEAT (l2beat.com) ?", opts: ["Les cours des tokens Layer 2", "La TVL (Total Value Locked) et les métriques de sécurité des solutions Layer 2 Ethereum", "Le hashrate des mineurs Ethereum", "Les frais de gas sur Ethereum mainnet"], ans: 1, exp: "L2BEAT est LA référence pour suivre l'écosystème Layer 2 d'Ethereum. Il mesure la TVL de chaque L2, leur niveau de décentralisation réel (stage 0, 1, 2), les risques techniques et les comparaisons de performance." }
        ]
      }
    ]
  }
];

/* ─── ÉTAT & PERSISTANCE ─── */
var STORE_KEY = 'arthur_crypto_academy_v2';
var acadState = { xp: 0, completed: {}, quizScores: {} };

function loadState() {
  try {
    var s = localStorage.getItem(STORE_KEY);
    if (s) acadState = JSON.parse(s);
  } catch(e) {}
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(acadState)); } catch(e) {}
}
window.saveState = saveState;
loadState();

/* ─── UTILITAIRES ─── */
function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length-1; i > 0; i--) { var j = Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; }
  return a;
}
function getLevelProgress(lvl) {
  var done = lvl.lessons.filter(function(l){ return acadState.completed[l.id]; }).length;
  return { done: done, total: lvl.lessons.length, pct: Math.round(done/lvl.lessons.length*100) };
}
function renderContent(blocks) {
  return blocks.map(function(b) {
    if (b.type === 'intro') return '<div style="font-size:12px;color:var(--tx-mid);line-height:1.8;padding:14px;background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:8px;margin-bottom:12px;">'+b.text+'</div>';
    if (b.type === 'point') return '<div style="display:flex;gap:10px;padding:12px;background:var(--bg-card);border:1px solid var(--br-soft);border-radius:8px;margin-bottom:8px;">'
      +'<div style="font-size:18px;flex-shrink:0;margin-top:1px;">'+b.icon+'</div>'
      +'<div><div style="font-size:12px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);margin-bottom:4px;">'+b.title+'</div><div style="font-size:11px;color:var(--tx-muted);line-height:1.7;">'+b.text+'</div></div></div>';
    if (b.type === 'example') return '<div style="padding:12px 14px;background:var(--blue-bg);border:1px solid var(--blue-bdr);border-radius:8px;margin-bottom:8px;">'
      +'<div style="font-size:9px;font-family:var(--mono);font-weight:700;color:var(--blue);letter-spacing:1px;margin-bottom:5px;">'+b.label.toUpperCase()+'</div>'
      +'<div style="font-size:11px;color:var(--tx-mid);line-height:1.7;">'+b.text+'</div></div>';
    if (b.type === 'key') return '<div style="padding:11px 14px;background:var(--orange-bg);border:1px solid var(--orange-bdr);border-radius:8px;margin-bottom:8px;font-size:11px;color:var(--tx-mid);line-height:1.7;">'+b.text+'</div>';
    return '';
  }).join('');
}

/* ─── RENDER ACCUEIL NIVEAUX ─── */
function renderLevelsHome() {
  var list = document.getElementById('dbt-levels-list');
  var xpEl = document.getElementById('dbt-xp-val');
  if (xpEl) xpEl.textContent = acadState.xp;
  if (!list) return;
  list.innerHTML = CRYPTO_LEVELS.map(function(lvl) {
    var prog = getLevelProgress(lvl);
    var lessonCards = lvl.lessons.map(function(lesson) {
      var done = !!acadState.completed[lesson.id];
      var score = acadState.quizScores[lesson.id];
      return '<div onclick="dbtOpenLesson(\''+lvl.id+'\',\''+lesson.id+'\')" style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:var(--bg-raised);border:1px solid '+(done?lvl.colorBdr:'var(--br-soft)')+';border-radius:8px;cursor:pointer;transition:border-color .15s,background .15s;" onmouseover="this.style.background=\'var(--bg-hover)\'" onmouseout="this.style.background=\'var(--bg-raised)\'">'
        +'<div style="width:36px;height:36px;border-radius:8px;background:'+(done?lvl.colorBg:'var(--bg-card)')+';border:1px solid '+(done?lvl.colorBdr:'var(--br-mid)')+';display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">'+lesson.emoji+'</div>'
        +'<div style="flex:1;min-width:0;">'
          +'<div style="font-size:12px;font-weight:600;color:var(--tx-hi);font-family:var(--mono);margin-bottom:2px;">'+lesson.title+'</div>'
          +'<div style="font-size:10px;color:var(--tx-faint);">⏱ '+lesson.duration+' · '+lvl.xpPerLesson+' XP</div>'
        +'</div>'
        +'<div style="flex-shrink:0;text-align:right;">'
          +(done ? '<div style="font-size:10px;font-family:var(--mono);color:'+lvl.color+';">✓ '+(score!==undefined?score+'/'+lesson.quiz.length:'Fait')+'</div>' : '<div style="font-size:10px;color:var(--tx-faint);">→</div>')
        +'</div>'
        +'</div>';
    }).join('');
    return '<div style="border:1px solid var(--br-soft);border-radius:12px;overflow:hidden;">'
      +'<div style="padding:14px 18px;background:var(--bg-raised);border-bottom:1px solid var(--br-soft);display:flex;align-items:center;gap:12px;flex-wrap:wrap;">'
        +'<span style="font-size:20px;">'+lvl.icon+'</span>'
        +'<div style="flex:1;">'
          +'<div style="font-size:13px;font-weight:700;color:'+lvl.color+';font-family:var(--mono);">'+lvl.label.toUpperCase()+'</div>'
          +'<div style="font-size:11px;color:var(--tx-muted);">'+lvl.desc+'</div>'
        +'</div>'
        +'<div style="text-align:right;min-width:80px;">'
          +'<div style="font-size:11px;font-family:var(--mono);color:'+lvl.color+';">'+prog.done+'/'+prog.total+' leçons</div>'
          +'<div style="height:4px;background:var(--bg-input);border-radius:2px;margin-top:5px;"><div style="height:4px;width:'+prog.pct+'%;background:'+lvl.color+';border-radius:2px;transition:width .4s;"></div></div>'
        +'</div>'
      +'</div>'
      +'<div style="padding:12px;display:flex;flex-direction:column;gap:6px;">'+lessonCards+'</div>'
      +'</div>';
  }).join('');
}

/* ─── OUVRIR UNE LEÇON ─── */
window.dbtOpenLesson = function(levelId, lessonId) {
  var lvl = CRYPTO_LEVELS.find(function(l){return l.id===levelId;});
  var lesson = lvl && lvl.lessons.find(function(l){return l.id===lessonId;});
  if (!lvl || !lesson) return;

  var home = document.getElementById('dbt-lessons-home');
  var view = document.getElementById('dbt-lesson-view');
  if (!home || !view) return;
  home.style.display = 'none';
  view.style.display = '';

  var quizHtml = '<div id="dbt-lesson-quiz" style="margin-top:24px;border-top:1px solid var(--br-soft);padding-top:20px;">'
    +'<div style="font-size:13px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);margin-bottom:4px;">🧠 Quiz de la leçon</div>'
    +'<div style="font-size:11px;color:var(--tx-muted);margin-bottom:16px;">'+lesson.quiz.length+' questions · Répondez pour valider et gagner '+lvl.xpPerLesson+' XP</div>'
    +'<div id="dbt-lq-container"></div>'
    +'</div>';

  view.innerHTML = '<div style="margin-bottom:16px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">'
    +'<button onclick="dbtBackToLessons()" style="background:none;border:1px solid var(--br-mid);border-radius:6px;padding:5px 12px;color:var(--tx-muted);cursor:pointer;font-size:11px;font-family:var(--mono);">← Retour</button>'
    +'<span style="font-size:10px;font-family:var(--mono);color:'+lvl.color+';">'+lvl.icon+' '+lvl.label.toUpperCase()+'</span>'
    +'</div>'
    +'<div style="background:var(--bg-card);border:1px solid var(--br-soft);border-radius:12px;padding:20px;margin-bottom:4px;">'
      +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
        +'<div style="width:44px;height:44px;border-radius:10px;background:'+lvl.colorBg+';border:1px solid '+lvl.colorBdr+';display:flex;align-items:center;justify-content:center;font-size:22px;">'+lesson.emoji+'</div>'
        +'<div>'
          +'<div style="font-size:15px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);">'+lesson.title+'</div>'
          +'<div style="font-size:10px;color:var(--tx-faint);">⏱ '+lesson.duration+' de lecture · '+lvl.xpPerLesson+' XP</div>'
        +'</div>'
      +'</div>'
      +renderContent(lesson.content)
    +'</div>'
    +quizHtml;

  dbtStartLessonQuiz(lvl, lesson);
};

/* ─── QUIZ DE LEÇON ─── */
function dbtStartLessonQuiz(lvl, lesson) {
  var state = { current: 0, score: 0, answered: false, done: false, order: shuffle(lesson.quiz.map(function(_,i){return i;})) };
  function render() {
    var c = document.getElementById('dbt-lq-container');
    if (!c) return;
    if (state.done) {
      var pct = Math.round(state.score/lesson.quiz.length*100);
      var col = pct>=80?'var(--green)':pct>=50?'var(--yellow)':'var(--red)';
      var already = !!acadState.completed[lesson.id];
      if (!already) {
        acadState.completed[lesson.id] = true;
        acadState.xp += lvl.xpPerLesson;
      }
      acadState.quizScores[lesson.id] = state.score;
      saveState();
      var xpEl = document.getElementById('dbt-xp-val');
      if (xpEl) xpEl.textContent = acadState.xp;
      c.innerHTML = '<div style="text-align:center;padding:24px 16px;background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:10px;">'
        +'<div style="font-size:36px;font-weight:700;color:'+col+';font-family:var(--mono);margin-bottom:6px;">'+state.score+'/'+lesson.quiz.length+'</div>'
        +'<div style="font-size:12px;font-weight:700;color:var(--tx-hi);margin-bottom:4px;">'+(pct>=80?'🎉 Excellent !':pct>=50?'👍 Bien joué !':'📚 Relisez la leçon')+'</div>'
        +'<div style="font-size:11px;color:var(--tx-muted);margin-bottom:16px;">Score : '+pct+'% · '+(already?'':'+')+lvl.xpPerLesson+' XP '+(already?'(déjà compté)':'gagnés !')+'</div>'
        +'<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">'
        +'<button onclick="dbtBackToLessons()" style="font-family:var(--mono);font-size:11px;padding:8px 18px;border-radius:6px;border:1px solid '+lvl.colorBdr+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">← Toutes les leçons</button>'
        +'</div></div>';
      return;
    }
    var qi = state.order[state.current];
    var q = lesson.quiz[qi];
    q = window.quizShuffleOpts(q);
    window._sqCurrent = q; // shuffled q for answer function
    var prog = Math.round(state.current/lesson.quiz.length*100);
    var html = '<div style="background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:10px;padding:16px;">'
      +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">'
      +'<span style="font-size:10px;font-family:var(--mono);color:var(--tx-faint);">Q '+(state.current+1)+'/'+lesson.quiz.length+'</span>'
      +'<span style="font-size:10px;font-family:var(--mono);color:'+lvl.color+');">'+state.score+' pts</span>'
      +'</div>'
      +'<div style="height:2px;background:var(--bg-input);border-radius:2px;margin-bottom:12px;"><div style="height:2px;width:'+prog+'%;background:'+lvl.color+';border-radius:2px;"></div></div>'
      +'<div style="font-size:12px;font-weight:700;color:var(--tx-hi);line-height:1.5;margin-bottom:12px;">'+q.q+'</div>'
      +'<div style="display:flex;flex-direction:column;gap:7px;" id="dbt-lq-opts">';
    q.opts.forEach(function(opt,i){
      html += '<button onclick="dbtLqAnswer('+i+')" id="dbt-lq-'+i+'" style="text-align:left;padding:9px 13px;border-radius:7px;border:1px solid var(--br-mid);background:var(--bg-card);color:var(--tx-mid);cursor:pointer;font-size:11px;transition:border-color .1s;" onmouseover="if(!this.dataset.locked)this.style.borderColor=\''+lvl.color+'\'" onmouseout="if(!this.dataset.locked)this.style.borderColor=\'var(--br-mid)\'"><span style="font-family:var(--mono);font-weight:700;color:var(--tx-faint);margin-right:7px;">'+String.fromCharCode(65+i)+'.</span>'+opt+'</button>';
    });
    html += '</div><div id="dbt-lq-fb" style="margin-top:10px;"></div></div>';
    c.innerHTML = html;

    window.dbtLqAnswer = function(idx) {
      if (state.answered) return;
      state.answered = true;
      var correct = idx === q.ans;
      if (correct) state.score++;
      q.opts.forEach(function(_,i){
        var btn = document.getElementById('dbt-lq-'+i);
        if (!btn) return;
        btn.dataset.locked='1'; btn.style.cursor='default';
        if (i===q.ans){ btn.style.borderColor='var(--green)'; btn.style.background='var(--green-bg)'; btn.style.color='var(--green)'; }
        else if (i===idx && !correct){ btn.style.borderColor='var(--red)'; btn.style.background='var(--red-bg)'; btn.style.color='var(--red)'; }
      });
      var fb = document.getElementById('dbt-lq-fb');
      if (fb) fb.innerHTML = '<div style="padding:9px 13px;background:'+(correct?'var(--green-bg)':'var(--red-bg)')+';border:1px solid '+(correct?'var(--green-bdr)':'var(--red-bdr)')+';border-radius:7px;margin-bottom:9px;">'
        +'<div style="font-size:11px;font-weight:700;color:'+(correct?'var(--green)':'var(--red)')+';margin-bottom:3px;">'+(correct?'✅ Correct !':'❌ Pas tout à fait…')+'</div>'
        +'<div style="font-size:11px;color:var(--tx-mid);line-height:1.6;">'+q.exp+'</div>'
        +'</div>'
        +'<button onclick="dbtLqNext()" style="width:100%;font-family:var(--mono);font-size:11px;padding:8px;border-radius:6px;border:1px solid '+lvl.colorBdr+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">'+(state.current+1<lesson.quiz.length?'Question suivante →':'Voir mon résultat 🏁')+'</button>';
    };
    window.dbtLqNext = function() {
      state.current++; state.answered = false;
      if (state.current >= lesson.quiz.length) state.done = true;
      render();
    };
  }
  render();
}

window.dbtBackToLessons = function() {
  var home = document.getElementById('dbt-lessons-home');
  var view = document.getElementById('dbt-lesson-view');
  if (home) { home.style.display = ''; renderLevelsHome(); }
  if (view) view.style.display = 'none';
};

/* ─── QUIZ PAR NIVEAU (accès depuis onglet Quiz) ─── */
var ALL_QUIZ_BY_LEVEL = {};
CRYPTO_LEVELS.forEach(function(lvl) {
  ALL_QUIZ_BY_LEVEL[lvl.id] = [];
  lvl.lessons.forEach(function(lesson) {
    lesson.quiz.forEach(function(q) {
      ALL_QUIZ_BY_LEVEL[lvl.id].push(q);
    });
  });
});

function renderQuizHome() {
  var cards = document.getElementById('dbt-quiz-level-cards');
  if (!cards) return;
  cards.innerHTML = CRYPTO_LEVELS.map(function(lvl) {
    var count = ALL_QUIZ_BY_LEVEL[lvl.id].length;
    return '<div onclick="dbtStartLevelQuiz(\''+lvl.id+'\')" style="padding:18px;background:var(--bg-card);border:2px solid '+lvl.colorBdr+';border-radius:12px;cursor:pointer;transition:background .15s;" onmouseover="this.style.background=\'var(--bg-hover)\'" onmouseout="this.style.background=\'var(--bg-card)\'">'
      +'<div style="font-size:28px;margin-bottom:8px;">'+lvl.icon+'</div>'
      +'<div style="font-size:13px;font-weight:700;color:'+lvl.color+';font-family:var(--mono);margin-bottom:4px;">'+lvl.label.toUpperCase()+'</div>'
      +'<div style="font-size:11px;color:var(--tx-muted);margin-bottom:12px;">'+lvl.desc+'</div>'
      +'<div style="font-size:10px;font-family:var(--mono);color:var(--tx-faint);">'+count+' questions</div>'
      +'</div>';
  }).join('');
}

var lvlQuizState = { levelId: null, current: 0, score: 0, answered: false, done: false, order: [] };

window.dbtStartLevelQuiz = function(levelId) {
  var home = document.getElementById('dbt-quiz-home');
  var playing = document.getElementById('dbt-quiz-playing');
  var label = document.getElementById('dbt-quiz-level-label');
  var lvl = CRYPTO_LEVELS.find(function(l){return l.id===levelId;});
  if (!lvl) return;
  if (home) home.style.display = 'none';
  if (playing) playing.style.display = '';
  if (label) label.textContent = lvl.icon + ' ' + lvl.label + ' — ' + ALL_QUIZ_BY_LEVEL[levelId].length + ' questions';
  lvlQuizState = { levelId: levelId, current: 0, score: 0, answered: false, done: false, order: shuffle(ALL_QUIZ_BY_LEVEL[levelId].map(function(_,i){return i;})) };
  window.dbtRenderQuiz();
};

window.dbtQuizBackToHome = function() {
  var home = document.getElementById('dbt-quiz-home');
  var playing = document.getElementById('dbt-quiz-playing');
  if (home) { home.style.display = ''; renderQuizHome(); }
  if (playing) playing.style.display = 'none';
};

window.dbtRenderQuiz = function() {
  var c = document.getElementById('dbt-quiz-container');
  if (!c) return;
  var questions = ALL_QUIZ_BY_LEVEL[lvlQuizState.levelId] || [];
  var lvl = CRYPTO_LEVELS.find(function(l){return l.id===lvlQuizState.levelId;}) || CRYPTO_LEVELS[0];
  if (lvlQuizState.done) {
    var pct = Math.round(lvlQuizState.score/questions.length*100);
    var col = pct>=80?'var(--green)':pct>=50?'var(--yellow)':'var(--red)';
    c.innerHTML = '<div style="text-align:center;padding:32px 20px;background:var(--bg-card);border:1px solid var(--br-soft);border-radius:12px;">'
      +'<div style="font-size:44px;font-weight:700;font-family:var(--mono);color:'+col+';margin-bottom:8px;">'+lvlQuizState.score+'/'+questions.length+'</div>'
      +'<div style="font-size:13px;font-weight:700;color:var(--tx-hi);margin-bottom:4px;">'+(pct>=80?'🎉 Maîtrise confirmée !':pct>=50?'👍 Bon niveau, continuez !':'📚 Relisez les leçons du niveau.')+'</div>'
      +'<div style="font-size:11px;color:var(--tx-muted);margin-bottom:24px;">Score : '+pct+'% — Niveau '+lvl.label+'</div>'
      +'<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">'
      +'<button onclick="dbtStartLevelQuiz(\''+lvl.id+'\')" style="font-family:var(--mono);font-size:11px;padding:8px 18px;border-radius:6px;border:1px solid var(--orange);background:var(--orange);color:#000;cursor:pointer;font-weight:700;">🔄 Recommencer</button>'
      +'<button onclick="dbtQuizBackToHome()" style="font-family:var(--mono);font-size:11px;padding:8px 18px;border-radius:6px;border:1px solid var(--br-mid);background:transparent;color:var(--tx-mid);cursor:pointer;">Choisir un niveau</button>'
      +'</div></div>';
    return;
  }
  var qi = lvlQuizState.order[lvlQuizState.current];
  var q = questions[qi];
  q = window.quizShuffleOpts(q);
  window._sqCurrent = q; // shuffled q for answer function
  var prog = Math.round(lvlQuizState.current/questions.length*100);
  var html = '<div style="background:var(--bg-card);border:1px solid var(--br-soft);border-radius:12px;padding:20px;">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">'
    +'<span style="font-size:10px;font-family:var(--mono);color:var(--tx-faint);">Question '+(lvlQuizState.current+1)+' / '+questions.length+'</span>'
    +'<span style="font-size:10px;font-family:var(--mono);color:'+lvl.color+';">'+lvlQuizState.score+' pts</span>'
    +'</div>'
    +'<div style="height:3px;background:var(--bg-input);border-radius:2px;margin-bottom:16px;"><div style="height:3px;width:'+prog+'%;background:'+lvl.color+';border-radius:2px;transition:width .3s;"></div></div>'
    +'<div style="font-size:13px;font-weight:700;color:var(--tx-hi);line-height:1.5;margin-bottom:16px;">'+q.q+'</div>'
    +'<div style="display:flex;flex-direction:column;gap:8px;" id="dbt-quiz-opts">';
    q = window.quizShuffleOpts(q);
    window._sqCurrent = q; // shuffled q for answer function
  q.opts.forEach(function(opt,i){
    html += '<button onclick="dbtQuizAnswer('+i+')" id="dbt-opt-'+i+'" style="text-align:left;padding:10px 14px;border-radius:8px;border:1px solid var(--br-mid);background:var(--bg-raised);color:var(--tx-mid);cursor:pointer;font-size:11px;font-family:var(--sans);transition:border-color .1s,background .1s;" onmouseover="if(!this.dataset.locked)this.style.borderColor=\''+lvl.color+'\'" onmouseout="if(!this.dataset.locked)this.style.borderColor=\'var(--br-mid)\'"><span style="font-family:var(--mono);font-weight:700;color:var(--tx-faint);margin-right:8px;">'+String.fromCharCode(65+i)+'.</span>'+opt+'</button>';
  });
  html += '</div><div id="dbt-quiz-feedback" style="margin-top:12px;"></div></div>';
  c.innerHTML = html;
};

window.dbtQuizAnswer = function(idx) {
  if (lvlQuizState.answered) return;
  lvlQuizState.answered = true;
  var questions = ALL_QUIZ_BY_LEVEL[lvlQuizState.levelId] || [];
  var qi = lvlQuizState.order[lvlQuizState.current];
  var q = window._sqCurrent || {};
  var lvl = CRYPTO_LEVELS.find(function(l){return l.id===lvlQuizState.levelId;}) || CRYPTO_LEVELS[0];
  var correct = idx === q.ans;
  if (correct) lvlQuizState.score++;
  q.opts.forEach(function(_,i){
    var btn = document.getElementById('dbt-opt-'+i);
    if (!btn) return;
    btn.dataset.locked='1'; btn.style.cursor='default';
    if (i===q.ans){ btn.style.borderColor='var(--green)'; btn.style.background='var(--green-bg)'; btn.style.color='var(--green)'; }
    else if (i===idx && !correct){ btn.style.borderColor='var(--red)'; btn.style.background='var(--red-bg)'; btn.style.color='var(--red)'; }
  });
  var fb = document.getElementById('dbt-quiz-feedback');
  if (fb) fb.innerHTML = '<div style="padding:10px 14px;background:'+(correct?'var(--green-bg)':'var(--red-bg)')+';border:1px solid '+(correct?'var(--green-bdr)':'var(--red-bdr)')+';border-radius:8px;margin-bottom:10px;">'
    +'<div style="font-size:12px;font-weight:700;color:'+(correct?'var(--green)':'var(--red)')+';margin-bottom:4px;">'+(correct?'✅ Correct !':'❌ Pas tout à fait…')+'</div>'
    +'<div style="font-size:11px;color:var(--tx-mid);line-height:1.6;">'+q.exp+'</div>'
    +'</div>'
    +'<button onclick="dbtQuizNext()" style="width:100%;font-family:var(--mono);font-size:11px;padding:9px;border-radius:6px;border:1px solid '+lvl.colorBdr+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">'+(lvlQuizState.current+1<questions.length?'Question suivante →':'Voir mon score 🏁')+'</button>';
};

window.dbtQuizNext = function() {
  lvlQuizState.current++; lvlQuizState.answered = false;
  if (lvlQuizState.current >= (ALL_QUIZ_BY_LEVEL[lvlQuizState.levelId]||[]).length) lvlQuizState.done = true;
  dbtRenderQuiz();
};

window.dbtQuizReset = function() {
  dbtQuizBackToHome();
};

/* ─── PATCH dbtFilter pour gérer les 2 nouveaux onglets ─── */
var _origFilter = window.dbtFilter;
window.dbtFilter = function(btn, filter) {
  var bar2 = document.getElementById('dbt-filter-bar');
  if (bar2) bar2.querySelectorAll('.dbt-fb').forEach(function(b){
    b.style.background='var(--bg-card)'; b.style.color='var(--tx-mid)';
    b.style.border='1px solid var(--br-mid)'; b.style.fontWeight='';
  });
  if (btn) { btn.style.background='var(--orange)'; btn.style.color='#000'; btn.style.border='1px solid var(--orange)'; btn.style.fontWeight='700'; }

  var quizPanel = document.getElementById('dbt-panel-quiz');
  var lessonsPanel = document.getElementById('dbt-panel-lessons');
  var conseilsPanel = document.getElementById('dbt-conseils');
  var tierBlocks = ['tier1','stablecoins','tier2','tier3'];

  function hideAll() {
    tierBlocks.forEach(function(tier){ var b=document.querySelector('.dbt-tier-block[data-tier="'+tier+'"]'); if(b) b.style.display='none'; });
    var legend = document.querySelector('#debutant-root > div:nth-child(2)');
    if (legend) legend.style.display='none';
    if (conseilsPanel) conseilsPanel.style.display='none';
    if (quizPanel) quizPanel.style.display='none';
    if (lessonsPanel) lessonsPanel.style.display='none';
  }

  if (filter === 'lessons') {
    hideAll();
    if (lessonsPanel) {
      lessonsPanel.style.display='';
      var home2 = document.getElementById('dbt-lessons-home');
      var view2 = document.getElementById('dbt-lesson-view');
      if (home2) home2.style.display='';
      if (view2) view2.style.display='none';
      renderLevelsHome();
    }
  } else if (filter === 'quiz') {
    hideAll();
    if (quizPanel) {
      quizPanel.style.display='';
      var qh = document.getElementById('dbt-quiz-home');
      var qp = document.getElementById('dbt-quiz-playing');
      if (qh) { qh.style.display=''; renderQuizHome(); }
      if (qp) qp.style.display='none';
    }
  } else {
    if (quizPanel) quizPanel.style.display='none';
    if (lessonsPanel) lessonsPanel.style.display='none';
    if (conseilsPanel) conseilsPanel.style.display='';
    var legend3 = document.querySelector('#debutant-root > div:nth-child(2)');
    if (legend3) legend3.style.display='';
    tierBlocks.forEach(function(tier){
      var block = document.querySelector('.dbt-tier-block[data-tier="'+tier+'"]');
      if (!block) return;
      block.style.display = (filter==='all'||filter===tier) ? '' : 'none';
    });
    if (typeof dbtRender === 'function') dbtRender(filter);
  }
};

console.log('[Académie Crypto] Module leçons + quiz v2.0 chargé ✓');
})();

/* ═══════════════════════════════════════════════════════════
   GUIDE BOURSE — Leçons + Quiz par niveau v2.0
   ═══════════════════════════════════════════════════════════ */
(function() {

/* ─── DONNÉES : LEÇONS & QUIZ ─── */
var BRS_LEVELS = [
  {
    id: 'brs-debutant',
    label: 'Débutant',
    icon: '🟢',
    color: 'var(--green)',
    colorBg: 'var(--green-bg)',
    colorBdr: 'var(--green-bdr)',
    desc: 'Les bases de la bourse — comprendre avant d\'investir',
    xpPerLesson: 20,
    lessons: [
      {
        id: 'brs-deb-1',
        title: 'Comment fonctionne la bourse ?',
        emoji: '📈',
        duration: '5 min',
        content: [
          { type: 'intro', text: "La bourse est un marché organisé où des acheteurs et des vendeurs échangent des parts d'entreprises (actions) et d'autres actifs financiers. Comprendre son fonctionnement est la première étape pour investir intelligemment." },
          { type: 'point', icon: '🏢', title: "Pourquoi les entreprises s'introduisent en bourse ?", text: "Pour lever des capitaux afin de financer leur développement. En échange, elles cèdent une partie de leur capital à des actionnaires qui deviennent copropriétaires de l'entreprise." },
          { type: 'point', icon: '📊', title: 'Le marché primaire vs secondaire', text: "Marché primaire : l'entreprise émet de nouvelles actions (IPO). Marché secondaire : les investisseurs s'échangent ces actions entre eux. La bourse que l'on connaît (Euronext, NYSE) est un marché secondaire." },
          { type: 'point', icon: '💹', title: 'Qu\'est-ce qui fait bouger les cours ?', text: "L'offre et la demande. Si plus de personnes veulent acheter une action que la vendre, son prix monte. Les résultats d'entreprise, l'économie, les taux d'intérêt, et le sentiment du marché sont les principaux moteurs." },
          { type: 'example', label: 'Exemple concret', text: "Apple publie de meilleurs résultats que prévu : les investisseurs veulent davantage d'actions Apple → la demande dépasse l'offre → le prix monte. C'est aussi simple que ça." },
          { type: 'key', text: "💡 La bourse n'est pas un casino : sur le long terme (10+ ans), investir régulièrement dans un indice diversifié comme le S&P 500 a toujours été rentable historiquement." }
        ],
        quiz: [
          { q: "Pourquoi une entreprise s'introduit-elle en bourse (IPO) ?", opts: ["Pour payer moins d'impôts", "Pour lever des capitaux afin de financer sa croissance", "Pour éviter les dettes bancaires", "Pour distribuer des actions à ses employés"], ans: 1, exp: "Une IPO (Initial Public Offering) permet à une entreprise de lever des fonds en vendant des parts de son capital au public. En échange, elle est tenue à plus de transparence et ses fondateurs diluent leur contrôle." },
          { q: "Qu'est-ce qui détermine principalement le prix d'une action ?", opts: ["La décision de la banque centrale", "L'offre et la demande : plus d'acheteurs que de vendeurs = prix monte", "Le chiffre d'affaires de l'entreprise uniquement", "Les frais du courtier"], ans: 1, exp: "Le prix d'une action est déterminé par la loi de l'offre et la demande. Si l'entreprise publie de bons résultats, plus d'investisseurs veulent l'action → demande > offre → le prix monte. Et vice versa." },
          { q: "Le marché secondaire, c'est quoi ?", opts: ["Le marché des entreprises de taille moyenne", "Le marché où les investisseurs s'échangent des actions déjà émises entre eux", "Un marché réservé aux institutionnels", "Le marché obligataire"], ans: 1, exp: "Le marché secondaire est la bourse telle qu'on la connaît (NYSE, Euronext Paris). Les actions y sont échangées entre investisseurs, sans que l'entreprise reçoive directement de l'argent — contrairement au marché primaire (IPO)." }
        ]
      },
      {
        id: 'brs-deb-2',
        title: 'Actions, ETF & Obligations — Les actifs clés',
        emoji: '⚖️',
        duration: '7 min',
        content: [
          { type: 'intro', text: "Avant d'investir, il faut connaître les principaux actifs disponibles. Chacun a ses caractéristiques de risque, rendement et horizon de placement." },
          { type: 'point', icon: '🏢', title: 'Actions', text: "Une action représente une part de propriété dans une entreprise. Le détenteur reçoit des dividendes (si versés) et peut voter en assemblée générale. Risque : élevé. Rendement potentiel : élevé. Horizon recommandé : 5+ ans." },
          { type: 'point', icon: '📦', title: 'ETF (Exchange Traded Fund)', text: "Un ETF est un panier d'actions qui réplique un indice (S&P 500, CAC 40…). Il offre une diversification instantanée à faibles frais. C'est l'outil recommandé pour la majorité des investisseurs particuliers." },
          { type: 'point', icon: '📜', title: 'Obligations', text: "Un prêt fait à une entreprise ou un État. En échange, vous recevez des intérêts réguliers (coupon) et le remboursement du capital à échéance. Moins risquées que les actions, mais moins rentables sur le long terme." },
          { type: 'point', icon: '🏠', title: 'SCPI / REITs', text: "Sociétés Civiles de Placement Immobilier (France) ou Real Estate Investment Trusts (US) : permettent d'investir dans l'immobilier collectivement. Distribution régulière de loyers. Rendement moyen ~4-5%/an." },
          { type: 'key', text: "💡 Règle d'or : diversifiez. Ne mettez jamais tous vos œufs dans le même panier. Un portefeuille équilibré contient généralement 60-80% d'actions (ETF) et 20-40% d'actifs moins risqués selon votre profil." }
        ],
        quiz: [
          { q: "Qu'est-ce qu'un ETF ?", opts: ["Une action d'une seule entreprise", "Un fonds coté qui réplique un indice boursier, offrant une diversification instantanée", "Un type d'obligation d'État", "Un compte d'épargne avec intérêts"], ans: 1, exp: "Un ETF (Exchange Traded Fund) réplique un indice comme le S&P 500 ou le CAC 40. En achetant 1 part d'ETF S&P 500, vous investissez dans les 500 plus grandes entreprises américaines. Faibles frais, simplicité, diversification maximale." },
          { q: "Quel est l'avantage principal d'une obligation par rapport à une action ?", opts: ["Rendement plus élevé que les actions", "Revenus réguliers prévisibles (coupon) et risque généralement plus faible", "Droit de vote en assemblée générale", "Exonération fiscale totale"], ans: 1, exp: "Les obligations offrent un coupon (intérêt fixe) régulier et le remboursement du capital à l'échéance. Elles sont moins risquées que les actions mais aussi moins rentables sur le long terme (~3-5% vs ~8-10%/an historiquement pour les actions)." },
          { q: "Pour un débutant, quel actif est généralement le plus recommandé ?", opts: ["Des actions individuelles de petites entreprises", "Des options et produits dérivés", "Des ETF sur indices larges (S&P 500, MSCI World)", "Du trading de matières premières"], ans: 2, exp: "Les ETF sur indices larges sont le meilleur point de départ : diversification automatique, frais très faibles (0,05-0,20%/an), liquidité élevée, pas besoin d'analyser des entreprises individuellement. Warren Buffett lui-même les recommande pour les particuliers." }
        ]
      },
      {
        id: 'brs-deb-3',
        title: 'PEA, CTO & Fiscalité — Choisir la bonne enveloppe',
        emoji: '🇫🇷',
        duration: '6 min',
        content: [
          { type: 'intro', text: "En France, l'enveloppe fiscale dans laquelle vous investissez est aussi importante que les actifs choisis. Le PEA et le CTO ont des règles très différentes qu'il faut maîtriser avant de commencer." },
          { type: 'point', icon: '🟢', title: 'PEA — Plan d\'Épargne en Actions', text: "Plafond : 150 000€. Avantage fiscal : exonéré d'impôt sur les plus-values après 5 ans (seuls 17,2% de prélèvements sociaux). Contrainte : uniquement actions européennes et ETF éligibles. Idéal pour le long terme." },
          { type: 'point', icon: '🔵', title: 'CTO — Compte Titre Ordinaire', text: "Pas de plafond. Accès à toutes les actions mondiales (US, Asie, crypto via CFD…). Fiscalité : flat tax de 30% sur les gains (12,8% IR + 17,2% PS) ou barème progressif sur option. Plus flexible mais moins avantageux fiscalement." },
          { type: 'point', icon: '🏦', title: 'Assurance Vie', text: "Enveloppe polyvalente : fonds euro (capital garanti, ~2-3%/an) + unités de compte (actions/ETF). Avantage fiscal après 8 ans. Idéale pour la transmission patrimoniale. Frais souvent plus élevés." },
          { type: 'point', icon: '💼', title: 'PER — Plan d\'Épargne Retraite', text: "Versements déductibles du revenu imposable. Épargne bloquée jusqu'à la retraite (sauf cas exceptionnels). Idéal si vous êtes dans une tranche marginale d'imposition élevée (30%+)." },
          { type: 'example', label: 'Stratégie optimale', text: "Débutant : ouvrez d'abord un PEA (long terme, ETF MSCI World éligibles). Puis un CTO pour les ETF non éligibles PEA (S&P 500 Vanguard). Assurance vie pour la diversification et la transmission." },
          { type: 'key', text: "⚠️ Ouvrir un PEA le plus tôt possible, même avec 10€, pour faire courir le délai de 5 ans. Le compte doit exister depuis 5 ans pour bénéficier de l'exonération — pas le montant investi." }
        ],
        quiz: [
          { q: "Quelle est la fiscalité du PEA après 5 ans de détention ?", opts: ["30% de flat tax sur les plus-values", "0% d'impôt sur les plus-values + 17,2% de prélèvements sociaux uniquement", "Totalement exonéré de tout impôt", "Impôt au barème progressif"], ans: 1, exp: "Après 5 ans, le PEA est exonéré d'impôt sur le revenu sur les plus-values. Seuls les prélèvements sociaux de 17,2% restent dus. Pour un gain de 10 000€, vous payez 1720€ vs 3000€ avec la flat tax du CTO — une économie de 1280€." },
          { q: "Quel est le plafond de versement du PEA ?", opts: ["50 000€", "100 000€", "150 000€", "Il n'y a pas de plafond"], ans: 2, exp: "Le PEA est plafonné à 150 000€ de versements (300 000€ pour un couple avec PEA chacun). Attention : c'est un plafond de versements, pas de valorisation. Votre PEA peut dépasser 150 000€ si les gains sont importants." },
          { q: "Pourquoi est-il conseillé d'ouvrir un PEA le plus tôt possible, même avec peu d'argent ?", opts: ["Pour bénéficier immédiatement des exonérations fiscales", "Pour faire courir le délai de 5 ans dès maintenant, afin de pouvoir retirer sans impôt plus tôt", "Parce que les frais sont moins élevés à l'ouverture", "Pour obtenir un meilleur taux de rendement"], ans: 1, exp: "Le délai de 5 ans du PEA commence à l'ouverture du compte, pas à chaque versement. Ouvrir un PEA aujourd'hui avec 10€ vous permet de retirer vos gains sans impôt (hors PS) dans 5 ans, même si vous n'investissez sérieusement que dans 3 ans." }
        ]
      }
    ]
  },
  {
    id: 'brs-intermediaire',
    label: 'Intermédiaire',
    icon: '🟡',
    color: 'var(--yellow)',
    colorBg: 'var(--yellow-bg)',
    colorBdr: 'var(--yellow-bdr)',
    desc: 'Analyse fondamentale, stratégies et gestion de portefeuille',
    xpPerLesson: 40,
    lessons: [
      {
        id: 'brs-int-1',
        title: 'Analyse fondamentale — Évaluer une entreprise',
        emoji: '🔬',
        duration: '9 min',
        content: [
          { type: 'intro', text: "L'analyse fondamentale consiste à évaluer la valeur intrinsèque d'une entreprise en étudiant ses finances, son business model et son marché. C'est l'approche de Warren Buffett et Peter Lynch." },
          { type: 'point', icon: '💰', title: 'PER — Price-to-Earnings Ratio', text: "Cours / BPA (Bénéfice Par Action). Le PER moyen historique du S&P 500 est ~17x. Un PER élevé = croissance attendue ou surévaluation. Un PER faible = décote ou problèmes. À comparer au secteur et aux concurrents." },
          { type: 'point', icon: '📚', title: 'PBR — Price-to-Book Ratio', text: "Cours / Valeur comptable par action. PBR < 1 = l'action côte en dessous de sa valeur comptable (potentielle opportunité ou value trap). PBR élevé = actifs immatériels importants (marques, brevets)." },
          { type: 'point', icon: '🌊', title: 'Free Cash Flow (FCF)', text: "Flux de trésorerie disponible après investissements = argent réellement généré par l'activité. Indicateur plus fiable que le bénéfice comptable (moins manipulable). FCF croissant = bonne santé financière." },
          { type: 'point', icon: '📊', title: 'ROE — Return on Equity', text: "Bénéfice net / Capitaux propres. Mesure la rentabilité des fonds investis par les actionnaires. ROE > 15% = très bon. Warren Buffett cherche des entreprises avec ROE > 20% durablement." },
          { type: 'example', label: 'Check-list rapide', text: "1) PER < 20x (ou justifié par la croissance). 2) FCF positif et croissant. 3) ROE > 15%. 4) Dette nette < 3x l'EBITDA. 5) Avantage concurrentiel durable (moat). Si 4/5, l'entreprise mérite une analyse approfondie." },
          { type: 'key', text: "💡 'Le prix est ce que vous payez, la valeur est ce que vous obtenez.' — Warren Buffett. Une bonne entreprise à un mauvais prix est un mauvais investissement, et vice versa." }
        ],
        quiz: [
          { q: "Qu'est-ce que le PER (Price-to-Earnings Ratio) ?", opts: ["Le pourcentage de dividende annuel", "Le rapport entre le cours d'une action et son bénéfice par action", "Le niveau de dette de l'entreprise", "La croissance du chiffre d'affaires"], ans: 1, exp: "PER = Prix / BPA. Un PER de 20 signifie que vous payez 20 fois les bénéfices annuels. Le PER moyen du S&P 500 est historiquement ~17x. Un PER de 30+ est élevé et suppose une forte croissance future — s'il ne se réalise pas, l'action peut fortement baisser." },
          { q: "Pourquoi le Free Cash Flow est-il souvent préféré au bénéfice net pour analyser une entreprise ?", opts: ["Il est toujours plus élevé que le bénéfice net", "Il mesure l'argent réellement disponible, moins manipulable que le bénéfice comptable", "Il inclut les dividendes", "Il est exonéré d'impôt"], ans: 1, exp: "Le bénéfice comptable peut être manipulé via les choix d'amortissement, de provisions, de reconnaissance du chiffre d'affaires… Le Free Cash Flow (encaissements - décaissements d'exploitation et d'investissement) est plus difficile à 'arranger' et reflète mieux la réalité économique." },
          { q: "Un ROE (Return on Equity) de 25% signifie que :", opts: ["L'entreprise a une dette de 25% de ses capitaux", "Pour 100€ investis par les actionnaires, l'entreprise génère 25€ de bénéfice annuel", "Le cours a progressé de 25% sur l'année", "25% des bénéfices sont distribués en dividendes"], ans: 1, exp: "ROE = Bénéfice net / Capitaux propres. Un ROE de 25% est excellent et indique une entreprise très efficace qui crée beaucoup de valeur avec peu de capital. Warren Buffett et Charlie Munger regardent systématiquement le ROE sur 5-10 ans." }
        ]
      },
      {
        id: 'brs-int-2',
        title: 'Stratégies d\'investissement éprouvées',
        emoji: '♟️',
        duration: '8 min',
        content: [
          { type: 'intro', text: "Il existe plusieurs stratégies d'investissement efficaces selon votre profil, votre horizon et votre temps disponible. La clé est d'en choisir une et de s'y tenir avec discipline." },
          { type: 'point', icon: '📅', title: 'DCA — Dollar Cost Averaging', text: "Investir une somme fixe à intervalles réguliers (ex : 200€/mois), quelles que soient les conditions de marché. Lisse le prix d'achat, élimine le stress du timing. Idéal pour 90% des investisseurs particuliers." },
          { type: 'point', icon: '💎', title: 'Buy & Hold (Acheter et Conserver)', text: "Acheter des entreprises de qualité et les conserver des années ou décennies. Réduit les frais, les impôts (différés) et l'impact émotionnel. Charlie Munger : 'La richesse vient de l'inaction, pas de l'activité.'" },
          { type: 'point', icon: '💸', title: 'Investissement dividendes', text: "Sélectionner des entreprises versant des dividendes croissants depuis 10+ ans (Dividend Aristocrats). Crée un flux de revenus passifs. Exemples : Coca-Cola, Johnson & Johnson, Procter & Gamble (50+ ans de dividendes croissants)." },
          { type: 'point', icon: '🚀', title: 'Croissance (Growth Investing)', text: "Investir dans des entreprises à fort potentiel de croissance (chiffre d'affaires +20%/an). PER souvent élevé mais justifié si la croissance se réalise. Risque plus élevé, potentiel de gain plus fort. Exemples passés : Amazon, Tesla, Nvidia." },
          { type: 'example', label: 'Stratégie recommandée pour débuter', text: "Core + Satellite : 70-80% en ETF MSCI World (cœur stable) + 20-30% en actions individuelles sélectionnées. Rebalancement 1x/an. Investissement mensuel fixe via DCA." },
          { type: 'key', text: "⚠️ Le timing du marché est impossible. Même les meilleurs gérants professionnels ne battent pas le marché sur 10 ans. Warren Buffett lui-même recommande les ETF pour les particuliers." }
        ],
        quiz: [
          { q: "Qu'est-ce que la stratégie DCA (Dollar Cost Averaging) ?", opts: ["Investir une grosse somme en une seule fois au plus bas du marché", "Investir une somme fixe à intervalles réguliers, quelles que soient les conditions de marché", "Analyser les graphiques quotidiennement pour choisir son moment", "Investir uniquement dans des valeurs de croissance"], ans: 1, exp: "Le DCA consiste à investir 200€ chaque mois par exemple, que le marché soit haut ou bas. En période de baisse, vous achetez plus de parts pour le même prix. Cette stratégie bat statistiquement le market timing pour la majorité des investisseurs particuliers." },
          { q: "Qu'est-ce qu'un 'Dividend Aristocrat' ?", opts: ["Une entreprise qui verse le dividende le plus élevé du marché", "Une entreprise ayant augmenté son dividende chaque année depuis au moins 25 ans", "Un ETF spécialisé dans les dividendes", "Une entreprise dont le cours dépasse 1000$ par action"], ans: 1, exp: "Les Dividend Aristocrats sont des entreprises du S&P 500 ayant augmenté leur dividende chaque année pendant au moins 25 ans consécutifs. Ces entreprises (Coca-Cola, Johnson & Johnson, Procter & Gamble…) ont prouvé leur capacité à traverser des crises tout en récompensant leurs actionnaires." },
          { q: "La stratégie 'Core + Satellite' consiste à :", opts: ["Investir 50% en actions et 50% en obligations", "Avoir un cœur de portefeuille en ETF diversifiés + une poche satellite en titres sélectionnés", "Trader activement 50% du portefeuille", "Investir uniquement dans des secteurs défensifs"], ans: 1, exp: "Core + Satellite : le 'Core' (70-80%) est investi en ETF larges (MSCI World, S&P 500) pour la stabilité et la diversification. Le 'Satellite' (20-30%) contient des convictions plus ciblées (secteurs, pays, actions individuelles) pour chercher de la surperformance." }
        ]
      },
      {
        id: 'brs-int-3',
        title: 'Psychologie et erreurs à éviter',
        emoji: '🧠',
        duration: '7 min',
        content: [
          { type: 'intro', text: "En bourse, votre pire ennemi n'est pas le marché : c'est vous-même. La finance comportementale a démontré que les biais cognitifs coûtent des milliards aux investisseurs chaque année." },
          { type: 'point', icon: '😱', title: 'Le biais de panique (vendre dans la baisse)', text: "Vendre lors d'une chute de 30% cristallise les pertes et on rate la reprise. Une étude Fidelity a montré que les meilleurs comptes clients étaient ceux... de personnes décédées ou ayant oublié avoir un compte." },
          { type: 'point', icon: '📰', title: 'FOMO et sur-investissement', text: "Fear Of Missing Out : acheter au sommet par peur de rater une hausse. C'est souvent ce que font les débutants (acheter Bitcoin à 69 000$ en 2021 ou les techs en 2000). Investissez selon un plan, pas selon les gros titres." },
          { type: 'point', icon: '🏠', title: 'Biais domestique (Home Bias)', text: "Surpondérer son pays d'origine. Un investisseur français investissant 70% en actions françaises manque 97% de l'économie mondiale. La diversification géographique est essentielle." },
          { type: 'point', icon: '📊', title: 'Sur-trading et coûts cachés', text: "Chaque transaction génère des frais et potentiellement des taxes. Un investisseur qui trade 10x/mois peut perdre 2-3% de performance annuelle en frais seuls. Less is more." },
          { type: 'point', icon: '🎰', title: 'Concentration excessive', text: "Investir 50% en une seule action, même excellente, est risqué. Enron, Wirecard, Lehman Brothers étaient des entreprises 'sûres' avant leur faillite. La diversification protège contre l'inconnu." },
          { type: 'key', text: "💡 Règle des 5 minutes : si vous ressentez l'urgence d'acheter ou vendre une action dans les 5 prochaines minutes, attendez 24h. L'investissement discipliné bat toujours l'investissement émotionnel." }
        ],
        quiz: [
          { q: "Qu'est-ce que le biais 'FOMO' en investissement ?", opts: ["Une technique d'analyse technique", "Fear Of Missing Out : acheter par crainte de rater une hausse, souvent au mauvais moment", "Un indicateur de volatilité", "Une stratégie de diversification"], ans: 1, exp: "Le FOMO pousse les investisseurs à acheter des actifs en forte hausse par peur de rater le train. C'est souvent ce qui entraîne les achats au sommet. Bitcoin à 69 000$ en novembre 2021 ou les actions dot-com en 2000 sont des exemples classiques de FOMO collectif." },
          { q: "Selon une étude Fidelity, quels étaient les meilleurs comptes d'investissement sur le long terme ?", opts: ["Ceux des traders les plus actifs", "Ceux des clients ayant accès aux meilleures analyses", "Ceux de personnes décédées ou ayant oublié avoir un compte — preuve que l'inaction bat l'action", "Ceux qui diversifiaient le plus"], ans: 2, exp: "Cette étude (souvent citée bien que non officielle) illustre un fait réel : les investisseurs qui n'interviennent pas dans leurs portefeuilles obtiennent statistiquement de meilleurs résultats que ceux qui tradent activement. L'inaction disciplinée est une stratégie." },
          { q: "Qu'est-ce que le 'biais domestique' (home bias) ?", opts: ["Préférer investir dans l'immobilier plutôt qu'en bourse", "Surpondérer les actions de son pays d'origine au détriment d'une diversification mondiale", "Investir uniquement dans des entreprises proches de chez soi", "Préférer des ETF européens"], ans: 1, exp: "Le biais domestique est la tendance à surinvestir dans son marché local par familiarité. Un Français investissant 70% en actions françaises s'expose aux aléas d'une seule économie et manque les opportunités mondiales (USA, Asie, marchés émergents)." }
        ]
      }
    ]
  },
  {
    id: 'brs-avance',
    label: 'Avancé',
    icon: '🔴',
    color: 'var(--red)',
    colorBg: 'var(--red-bg)',
    colorBdr: 'var(--red-bdr)',
    desc: 'Analyse technique, valorisation DCF, options et macro',
    xpPerLesson: 60,
    lessons: [
      {
        id: 'brs-adv-1',
        title: 'Analyse technique — Lire les graphiques',
        emoji: '📉',
        duration: '10 min',
        content: [
          { type: 'intro', text: "L'analyse technique (AT) étudie les graphiques de prix et de volumes pour identifier des tendances et des points d'entrée/sortie. Elle repose sur l'idée que l'histoire se répète et que le prix intègre toute l'information disponible." },
          { type: 'point', icon: '📊', title: 'Supports et Résistances', text: "Support : niveau de prix où les acheteurs dominent traditionnellement (plancher). Résistance : niveau où les vendeurs dominent (plafond). Une résistance cassée devient support. C'est la base de tout trade." },
          { type: 'point', icon: '📈', title: 'Moyennes Mobiles (MM)', text: "MM20/50/200 : moyennes des cours des 20, 50 ou 200 dernières séances. La MM200 est la plus importante : cours > MM200 = tendance haussière. Golden Cross (MM50 croise MM200 à la hausse) = signal d'achat fort." },
          { type: 'point', icon: '⚡', title: 'RSI — Relative Strength Index', text: "Oscillateur de 0 à 100 mesurant la force d'une tendance. RSI > 70 = zone de surachat (potentielle correction). RSI < 30 = zone de survente (potentiel rebond). Les divergences RSI/prix sont les signaux les plus puissants." },
          { type: 'point', icon: '🕯️', title: 'Chandeliers japonais', text: "Chaque bougie représente une période (jour, heure…) avec ouverture, clôture, haut et bas. Le Doji (corps minimal), l'Engulfing (engloutissant), le Hammer (marteau) sont des patterns de retournement classiques." },
          { type: 'point', icon: '📉', title: 'MACD', text: "Moving Average Convergence Divergence : différence entre MM12 et MM26, lissée par une MM9 (signal). Croisement MACD/Signal vers le haut = signal achat. Histogramme négatif puis positif = momentum haussier." },
          { type: 'key', text: "⚠️ L'analyse technique n'est pas infaillible. Les faux signaux sont fréquents. L'AT s'utilise en complément de l'analyse fondamentale, jamais seule pour un investisseur long terme." }
        ],
        quiz: [
          { q: "Qu'est-ce qu'un 'Golden Cross' en analyse technique ?", opts: ["Le prix qui atteint un nouveau sommet historique", "Le croisement de la MM50 au-dessus de la MM200, considéré comme un signal haussier fort", "Un chandelier japonais en forme de croix", "Le RSI qui repasse au-dessus de 50"], ans: 1, exp: "Le Golden Cross se produit quand la moyenne mobile à 50 jours croise à la hausse la moyenne mobile à 200 jours. C'est un signal de renforcement de tendance haussière à long terme, très surveillé par les traders institutionnels. L'inverse (Death Cross) est baissier." },
          { q: "Un RSI de 75 sur une action signifie :", opts: ["L'action va monter de 75%", "L'action est en zone de surachat — prudence, risque de correction", "L'action est bon marché et à acheter", "Le volume de transactions est élevé"], ans: 1, exp: "Le RSI au-dessus de 70 indique une zone de surachat : l'action a monté vite et fort, les acheteurs sont épuisés. Ce n'est pas un signal de vente automatique (une action peut rester suracheté longtemps en tendance forte), mais un signal de prudence." },
          { q: "Qu'est-ce qu'un support en analyse technique ?", opts: ["Le niveau de prix où les vendeurs dominent habituellement", "Le niveau de prix où les acheteurs dominent habituellement, créant un plancher", "Le niveau de dividende d'une action", "Le prix d'introduction en bourse"], ans: 1, exp: "Un support est un niveau de prix où l'action a rebondi à plusieurs reprises. Les acheteurs considèrent ce prix comme attractif et interviennent massivement. Un support cassé devient résistance. Plus un support a été testé de fois, plus sa rupture est significative." }
        ]
      },
      {
        id: 'brs-adv-2',
        title: 'Valorisation DCF — Calculer la valeur intrinsèque',
        emoji: '🧮',
        duration: '10 min',
        content: [
          { type: 'intro', text: "Le DCF (Discounted Cash Flow) est la méthode de valorisation de référence en finance d'entreprise. Elle consiste à estimer la valeur actuelle de tous les flux de trésorerie futurs d'une entreprise." },
          { type: 'point', icon: '📐', title: 'Le principe d\'actualisation', text: "1€ aujourd'hui vaut plus que 1€ dans 10 ans (inflation, coût d'opportunité). Le taux d'actualisation (WACC) reflète ce coût : si WACC = 10%, 1€ dans 1 an vaut 0,909€ aujourd'hui. Plus le WACC est élevé, moins les cash flows futurs valent." },
          { type: 'point', icon: '🌱', title: 'Les 3 étapes du DCF', text: "1) Projeter les Free Cash Flows sur 10 ans (taux de croissance Phase 1 et 2). 2) Calculer la Valeur Terminale (VT = FCF10 × (1+g) / (WACC-g)). 3) Actualiser tous les flux + VT pour obtenir la valeur d'entreprise." },
          { type: 'point', icon: '⚖️', title: 'WACC — Le taux d\'actualisation', text: "Weighted Average Cost of Capital : coût moyen pondéré du capital. Combine le coût de la dette (after-tax) et le coût des fonds propres (CAPM). Pour une entreprise tech solide : WACC ~8-12%. Plus risquée : 12-15%+." },
          { type: 'point', icon: '📊', title: 'Scénarios Bear / Base / Bull', text: "Le DCF est très sensible aux hypothèses de croissance et de WACC. Toujours calculer 3 scénarios : Bear (croissance faible, WACC élevé), Base (consensus), Bull (croissance forte, WACC faible). La vérité est souvent au milieu." },
          { type: 'example', label: 'Exemple simplifié', text: "FCF actuel : 5B$. Croissance : 15%/an sur 5 ans, 8%/an sur 5 ans. WACC : 10%. Résultat : valeur intrinsèque ~120$/action. Si le cours actuel est 90$ → potentiel de +33% → ACHETER avec marge de sécurité." },
          { type: 'key', text: "💡 'Le DCF vous dit que si vous faites des hypothèses précises, vous obtenez un résultat précis. Mais les hypothèses ne sont jamais précises.' — Seth Klarman. Utilisez le DCF comme cadre, pas comme oracle." }
        ],
        quiz: [
          { q: "Qu'est-ce que le WACC dans un modèle DCF ?", opts: ["Le taux de croissance des bénéfices", "Le Weighted Average Cost of Capital — taux d'actualisation qui reflète le coût du capital de l'entreprise", "Le rapport cours/bénéfice", "Le taux de dividende"], ans: 1, exp: "Le WACC combine le coût de la dette (taux d'intérêt × (1-taux d'imposition)) et le coût des fonds propres (estimé par le CAPM). C'est le taux avec lequel on actualise les cash flows futurs. Un WACC de 10% signifie que chaque 1€ dans 10 ans ne vaut que 0,386€ aujourd'hui." },
          { q: "Dans un DCF, pourquoi la Valeur Terminale est-elle si importante ?", opts: ["Elle représente la valeur du bilan de l'entreprise", "Elle représente souvent 60-80% de la valeur totale — les cash flows au-delà de la période de projection", "Elle correspond aux dividendes futurs", "Elle mesure la dette nette"], ans: 1, exp: "La Valeur Terminale (VT) capture la valeur de l'entreprise au-delà de la période de projection explicite (généralement 10 ans). Elle représente souvent 60-80% de la valeur DCF totale, ce qui la rend très sensible aux hypothèses de croissance terminale et de WACC." },
          { q: "Si le DCF base donne une valeur de 120$ et le cours actuel est 90$, que fait l'analyste ?", opts: ["Il vend l'action car elle est trop chère", "Il calcule une 'marge de sécurité' positive de +33% — signal potentiel d'achat", "Il ignore le DCF car le cours de marché est toujours juste", "Il attend que le cours tombe à 60$"], ans: 1, exp: "Une valeur DCF supérieure au cours actuel suggère une sous-évaluation. La 'marge de sécurité' (popularisée par Benjamin Graham) est cet écart. Elle protège contre les erreurs d'estimation : même si la croissance est un peu moins forte que prévu, l'investissement reste rentable." }
        ]
      },
      {
        id: 'brs-adv-3',
        title: 'Macro-économie & taux d\'intérêt',
        emoji: '🌍',
        duration: '8 min',
        content: [
          { type: 'intro', text: "Les marchés financiers sont intimement liés à la macro-économie. Comprendre les cycles économiques, les politiques monétaires et leur impact sur les actions est essentiel pour tout investisseur avancé." },
          { type: 'point', icon: '🏦', title: 'Les banques centrales et les taux', text: "Fed (États-Unis) et BCE (Europe) fixent les taux directeurs. Taux bas = argent bon marché, stimulus pour les actions et l'immobilier. Taux élevés = coût d'emprunt plus cher, compétition avec les obligations risk-free, pression sur les valorisations." },
          { type: 'point', icon: '📊', title: 'Impact des taux sur les valorisations', text: "Quand les taux montent, le WACC monte → la valeur DCF des entreprises baisse → les actions chutent, surtout les techs à croissance (dont les cash flows sont lointains et donc très actualisés). 'Les taux sont la gravité des marchés financiers' — Warren Buffett." },
          { type: 'point', icon: '🔄', title: 'Le cycle économique et les secteurs', text: "Expansion : favorise cycliques (auto, luxe, banques). Pic : défensifs (santé, utilities, consommation courante). Récession : obligations, or, secteurs défensifs. Reprise : cycliques et small caps. Anticiper le cycle = avantage compétitif." },
          { type: 'point', icon: '📉', title: 'Courbe des taux et récession', text: "Quand les taux courts dépassent les taux longs (inversion de courbe), une récession suit généralement dans 12-18 mois. Cet indicateur a prédit chacune des récessions US depuis 1960. Outil de veille macro essentiel." },
          { type: 'example', label: 'Exemple 2022', text: "La Fed est passée de 0% à 5,25% en 18 mois pour lutter contre l'inflation de 9%. Résultat : le Nasdaq a chuté de 35%, les obligations d'État à 10 ans ont perdu 20%, les techs à valorisation élevée ont chuté de 60-80%." },
          { type: 'key', text: "💡 'Don't fight the Fed' : ne pas investir contre les politiques monétaires de la banque centrale. Quand la Fed monte les taux agressivement, réduire l'exposition aux actifs risqués est une approche défensive validée." }
        ],
        quiz: [
          { q: "Pourquoi une hausse des taux d'intérêt est-elle particulièrement négative pour les actions de croissance (tech) ?", opts: ["Parce que les entreprises tech empruntent plus que les autres", "Parce qu'un WACC plus élevé diminue la valeur actualisée des cash flows futurs lointains, qui représentent l'essentiel de leur valorisation", "Parce que les investisseurs fuient systématiquement la technologie en période de hausse de taux", "Parce que les entreprises tech ne paient pas de dividendes"], ans: 1, exp: "Les entreprises de croissance ont la majorité de leurs cash flows dans le futur lointain. Quand les taux montent, le WACC augmente et ces cash flows futurs sont davantage actualisés (dépréciés). Une entreprise valorisée à 50x ses bénéfices futurs sur 10 ans est bien plus sensible aux taux qu'une entreprise valorisée 12x ses bénéfices actuels." },
          { q: "L'inversion de la courbe des taux (taux courts > taux longs) est un indicateur de :", opts: ["Forte croissance économique imminente", "Récession probable dans les 12 à 18 mois à venir — indicateur historiquement fiable", "Bull market actions imminent", "Inflation forte et durable"], ans: 1, exp: "L'inversion de la courbe des taux (10 ans < 2 ans) a précédé chacune des récessions américaines depuis 1960. En 2022-2023, cette inversion a été la plus importante depuis 1981. Les investisseurs anticipent une baisse des taux à long terme car ils s'attendent à une récession et un assouplissement monétaire futur." },
          { q: "Quelle stratégie sectorielle est recommandée en phase de récession ?", opts: ["Surpondérer les cycliques (auto, luxe, banques)", "Surpondérer les défensifs (santé, utilities, biens de consommation courante) et les obligations", "Acheter massivement des small caps", "Investir dans les matières premières industrielles"], ans: 1, exp: "En récession, les secteurs défensifs résistent mieux : les gens continuent à manger, se soigner, payer leurs factures d'électricité même en crise. Johnson & Johnson, Nestlé, EDF ont des revenus stables. Les obligations d'État tendent aussi à monter car les banques centrales baissent les taux pour relancer l'économie." }
        ]
      }
    ]
  }
];

/* ─── ÉTAT & PERSISTANCE ─── */
var BRS_STORE_KEY = 'arthur_bourse_academy_v2';
var brsAcadState = { xp: 0, completed: {}, quizScores: {} };

function brsLoadState() {
  try { var s = localStorage.getItem(BRS_STORE_KEY); if (s) brsAcadState = JSON.parse(s); } catch(e) {}
}
function brsSaveState() {
  try { localStorage.setItem(BRS_STORE_KEY, JSON.stringify(brsAcadState)); } catch(e) {}
}
window.brsSaveState = brsSaveState;
brsLoadState();

/* ─── UTILITAIRES ─── */
function brsShuffle(arr) {
  var a = arr.slice();
  for (var i = a.length-1; i>0; i--) { var j = Math.floor(Math.random()*(i+1)); var t=a[i]; a[i]=a[j]; a[j]=t; }
  return a;
}
function brsGetProgress(lvl) {
  var done = lvl.lessons.filter(function(l){ return brsAcadState.completed[l.id]; }).length;
  return { done: done, total: lvl.lessons.length, pct: Math.round(done/lvl.lessons.length*100) };
}
function brsRenderContent(blocks) {
  return blocks.map(function(b) {
    if (b.type==='intro') return '<div style="font-size:12px;color:var(--tx-mid);line-height:1.8;padding:14px;background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:8px;margin-bottom:12px;">'+b.text+'</div>';
    if (b.type==='point') return '<div style="display:flex;gap:10px;padding:12px;background:var(--bg-card);border:1px solid var(--br-soft);border-radius:8px;margin-bottom:8px;">'
      +'<div style="font-size:18px;flex-shrink:0;margin-top:1px;">'+b.icon+'</div>'
      +'<div><div style="font-size:12px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);margin-bottom:4px;">'+b.title+'</div><div style="font-size:11px;color:var(--tx-muted);line-height:1.7;">'+b.text+'</div></div></div>';
    if (b.type==='example') return '<div style="padding:12px 14px;background:var(--blue-bg);border:1px solid var(--blue-bdr);border-radius:8px;margin-bottom:8px;">'
      +'<div style="font-size:9px;font-family:var(--mono);font-weight:700;color:var(--blue);letter-spacing:1px;margin-bottom:5px;">'+b.label.toUpperCase()+'</div>'
      +'<div style="font-size:11px;color:var(--tx-mid);line-height:1.7;">'+b.text+'</div></div>';
    if (b.type==='key') return '<div style="padding:11px 14px;background:var(--green-bg);border:1px solid var(--green-bdr);border-radius:8px;margin-bottom:8px;font-size:11px;color:var(--tx-mid);line-height:1.7;">'+b.text+'</div>';
    return '';
  }).join('');
}

/* ─── RENDER ACCUEIL NIVEAUX ─── */
function brsRenderLevelsHome() {
  var list = document.getElementById('brs-levels-list');
  var xpEl = document.getElementById('brs-xp-val');
  if (xpEl) xpEl.textContent = brsAcadState.xp;
  if (!list) return;
  list.innerHTML = BRS_LEVELS.map(function(lvl) {
    var prog = brsGetProgress(lvl);
    var lessonCards = lvl.lessons.map(function(lesson) {
      var done = !!brsAcadState.completed[lesson.id];
      var score = brsAcadState.quizScores[lesson.id];
      return '<div onclick="brsOpenLesson(\''+lvl.id+'\',\''+lesson.id+'\')" style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:var(--bg-raised);border:1px solid '+(done?lvl.colorBdr:'var(--br-soft)')+';border-radius:8px;cursor:pointer;transition:border-color .15s,background .15s;" onmouseover="this.style.background=\'var(--bg-hover)\'" onmouseout="this.style.background=\'var(--bg-raised)\'">'
        +'<div style="width:36px;height:36px;border-radius:8px;background:'+(done?lvl.colorBg:'var(--bg-card)')+';border:1px solid '+(done?lvl.colorBdr:'var(--br-mid)')+';display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">'+lesson.emoji+'</div>'
        +'<div style="flex:1;min-width:0;">'
          +'<div style="font-size:12px;font-weight:600;color:var(--tx-hi);font-family:var(--mono);margin-bottom:2px;">'+lesson.title+'</div>'
          +'<div style="font-size:10px;color:var(--tx-faint);">⏱ '+lesson.duration+' · '+lvl.xpPerLesson+' XP</div>'
        +'</div>'
        +'<div style="flex-shrink:0;text-align:right;">'+(done?'<div style="font-size:10px;font-family:var(--mono);color:'+lvl.color+';">✓ '+(score!==undefined?score+'/'+lesson.quiz.length:'Fait')+'</div>':'<div style="font-size:10px;color:var(--tx-faint);">→</div>')+'</div>'
        +'</div>';
    }).join('');
    return '<div style="border:1px solid var(--br-soft);border-radius:12px;overflow:hidden;">'
      +'<div style="padding:14px 18px;background:var(--bg-raised);border-bottom:1px solid var(--br-soft);display:flex;align-items:center;gap:12px;flex-wrap:wrap;">'
        +'<span style="font-size:20px;">'+lvl.icon+'</span>'
        +'<div style="flex:1;"><div style="font-size:13px;font-weight:700;color:'+lvl.color+';font-family:var(--mono);">'+lvl.label.toUpperCase()+'</div><div style="font-size:11px;color:var(--tx-muted);">'+lvl.desc+'</div></div>'
        +'<div style="text-align:right;min-width:80px;"><div style="font-size:11px;font-family:var(--mono);color:'+lvl.color+';">'+prog.done+'/'+prog.total+' leçons</div><div style="height:4px;background:var(--bg-input);border-radius:2px;margin-top:5px;"><div style="height:4px;width:'+prog.pct+'%;background:'+lvl.color+';border-radius:2px;transition:width .4s;"></div></div></div>'
      +'</div>'
      +'<div style="padding:12px;display:flex;flex-direction:column;gap:6px;">'+lessonCards+'</div>'
      +'</div>';
  }).join('');
}

/* ─── OUVRIR UNE LEÇON ─── */
window.brsOpenLesson = function(levelId, lessonId) {
  var lvl = BRS_LEVELS.find(function(l){return l.id===levelId;});
  var lesson = lvl && lvl.lessons.find(function(l){return l.id===lessonId;});
  if (!lvl || !lesson) return;
  var home = document.getElementById('brs-lessons-home');
  var view = document.getElementById('brs-lesson-view');
  if (!home || !view) return;
  home.style.display='none'; view.style.display='';
  view.innerHTML = '<div style="margin-bottom:16px;display:flex;align-items:center;gap:10px;flex-wrap:wrap;">'
    +'<button onclick="brsBackToLessons()" style="background:none;border:1px solid var(--br-mid);border-radius:6px;padding:5px 12px;color:var(--tx-muted);cursor:pointer;font-size:11px;font-family:var(--mono);">← Retour</button>'
    +'<span style="font-size:10px;font-family:var(--mono);color:'+lvl.color+';">'+lvl.icon+' '+lvl.label.toUpperCase()+'</span>'
    +'</div>'
    +'<div style="background:var(--bg-card);border:1px solid var(--br-soft);border-radius:12px;padding:20px;margin-bottom:4px;">'
      +'<div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">'
        +'<div style="width:44px;height:44px;border-radius:10px;background:'+lvl.colorBg+';border:1px solid '+lvl.colorBdr+';display:flex;align-items:center;justify-content:center;font-size:22px;">'+lesson.emoji+'</div>'
        +'<div><div style="font-size:15px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);">'+lesson.title+'</div><div style="font-size:10px;color:var(--tx-faint);">⏱ '+lesson.duration+' · '+lvl.xpPerLesson+' XP</div></div>'
      +'</div>'
      +brsRenderContent(lesson.content)
    +'</div>'
    +'<div id="brs-lesson-quiz" style="margin-top:24px;border-top:1px solid var(--br-soft);padding-top:20px;">'
      +'<div style="font-size:13px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);margin-bottom:4px;">🧠 Quiz de la leçon</div>'
      +'<div style="font-size:11px;color:var(--tx-muted);margin-bottom:16px;">'+lesson.quiz.length+' questions · Répondez pour valider et gagner '+lvl.xpPerLesson+' XP</div>'
      +'<div id="brs-lq-container"></div>'
    +'</div>';
  brsStartLessonQuiz(lvl, lesson);
};

/* ─── QUIZ DE LEÇON ─── */
function brsStartLessonQuiz(lvl, lesson) {
  var state = { current:0, score:0, answered:false, done:false, order: brsShuffle(lesson.quiz.map(function(_,i){return i;})) };
  function render() {
    var c = document.getElementById('brs-lq-container');
    if (!c) return;
    if (state.done) {
      var pct = Math.round(state.score/lesson.quiz.length*100);
      var col = pct>=80?'var(--green)':pct>=50?'var(--yellow)':'var(--red)';
      var already = !!brsAcadState.completed[lesson.id];
      if (!already) { brsAcadState.completed[lesson.id]=true; brsAcadState.xp+=lvl.xpPerLesson; }
      brsAcadState.quizScores[lesson.id]=state.score; brsSaveState();
      var xpEl = document.getElementById('brs-xp-val'); if (xpEl) xpEl.textContent=brsAcadState.xp;
      c.innerHTML='<div style="text-align:center;padding:24px 16px;background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:10px;">'
        +'<div style="font-size:36px;font-weight:700;color:'+col+';font-family:var(--mono);margin-bottom:6px;">'+state.score+'/'+lesson.quiz.length+'</div>'
        +'<div style="font-size:12px;font-weight:700;color:var(--tx-hi);margin-bottom:4px;">'+(pct>=80?'🎉 Excellent !':pct>=50?'👍 Bien joué !':'📚 Relisez la leçon')+'</div>'
        +'<div style="font-size:11px;color:var(--tx-muted);margin-bottom:16px;">Score : '+pct+'% · '+(already?'':'+')+lvl.xpPerLesson+' XP '+(already?'(déjà compté)':'gagnés !')+'</div>'
        +'<button onclick="brsBackToLessons()" style="font-family:var(--mono);font-size:11px;padding:8px 18px;border-radius:6px;border:1px solid '+lvl.colorBdr+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">← Toutes les leçons</button>'
        +'</div>';
      return;
    }
    var qi = state.order[state.current];
    var q = lesson.quiz[qi];
    q = window.quizShuffleOpts(q);
    window._sqCurrent = q; // shuffled q for answer function
    var prog = Math.round(state.current/lesson.quiz.length*100);
    var html = '<div style="background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:10px;padding:16px;">'
      +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">'
      +'<span style="font-size:10px;font-family:var(--mono);color:var(--tx-faint);">Q '+(state.current+1)+'/'+lesson.quiz.length+'</span>'
      +'<span style="font-size:10px;font-family:var(--mono);color:'+lvl.color+';">'+state.score+' pts</span>'
      +'</div>'
      +'<div style="height:2px;background:var(--bg-input);border-radius:2px;margin-bottom:12px;"><div style="height:2px;width:'+prog+'%;background:'+lvl.color+';border-radius:2px;"></div></div>'
      +'<div style="font-size:12px;font-weight:700;color:var(--tx-hi);line-height:1.5;margin-bottom:12px;">'+q.q+'</div>'
      +'<div style="display:flex;flex-direction:column;gap:7px;" id="brs-lq-opts">';
    q.opts.forEach(function(opt,i){
      html+='<button onclick="brsLqAnswer('+i+')" id="brs-lq-'+i+'" style="text-align:left;padding:9px 13px;border-radius:7px;border:1px solid var(--br-mid);background:var(--bg-card);color:var(--tx-mid);cursor:pointer;font-size:11px;transition:border-color .1s;" onmouseover="if(!this.dataset.locked)this.style.borderColor=\''+lvl.color+'\'" onmouseout="if(!this.dataset.locked)this.style.borderColor=\'var(--br-mid)\'"><span style="font-family:var(--mono);font-weight:700;color:var(--tx-faint);margin-right:7px;">'+String.fromCharCode(65+i)+'.</span>'+opt+'</button>';
    });
    html+='</div><div id="brs-lq-fb" style="margin-top:10px;"></div></div>';
    c.innerHTML=html;
    window.brsLqAnswer=function(idx){
      if (state.answered) return; state.answered=true;
      var correct=idx===q.ans; if (correct) state.score++;
      q.opts.forEach(function(_,i){ var btn=document.getElementById('brs-lq-'+i); if(!btn)return; btn.dataset.locked='1'; btn.style.cursor='default';
        if(i===q.ans){btn.style.borderColor='var(--green)';btn.style.background='var(--green-bg)';btn.style.color='var(--green)';}
        else if(i===idx&&!correct){btn.style.borderColor='var(--red)';btn.style.background='var(--red-bg)';btn.style.color='var(--red)';}
      });
      var fb=document.getElementById('brs-lq-fb'); if (!fb) return;
      fb.innerHTML='<div style="padding:9px 13px;background:'+(correct?'var(--green-bg)':'var(--red-bg)')+';border:1px solid '+(correct?'var(--green-bdr)':'var(--red-bdr)')+';border-radius:7px;margin-bottom:9px;">'
        +'<div style="font-size:11px;font-weight:700;color:'+(correct?'var(--green)':'var(--red)')+';margin-bottom:3px;">'+(correct?'✅ Correct !':'❌ Pas tout à fait…')+'</div>'
        +'<div style="font-size:11px;color:var(--tx-mid);line-height:1.6;">'+q.exp+'</div></div>'
        +'<button onclick="brsLqNext()" style="width:100%;font-family:var(--mono);font-size:11px;padding:8px;border-radius:6px;border:1px solid '+lvl.colorBdr+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">'+(state.current+1<lesson.quiz.length?'Question suivante →':'Voir mon résultat 🏁')+'</button>';
    };
    window.brsLqNext=function(){ state.current++; state.answered=false; if(state.current>=lesson.quiz.length) state.done=true; render(); };
  }
  render();
}

window.brsBackToLessons=function(){
  var home=document.getElementById('brs-lessons-home'); var view=document.getElementById('brs-lesson-view');
  if(home){home.style.display=''; brsRenderLevelsHome();}
  if(view) view.style.display='none';
};

/* ─── QUIZ PAR NIVEAU ─── */
var BRS_QUIZ_BY_LEVEL = {};
BRS_LEVELS.forEach(function(lvl){ BRS_QUIZ_BY_LEVEL[lvl.id]=[]; lvl.lessons.forEach(function(l){ l.quiz.forEach(function(q){ BRS_QUIZ_BY_LEVEL[lvl.id].push(q); }); }); });

function brsRenderQuizHome(){
  var cards=document.getElementById('brs-quiz-level-cards'); if(!cards) return;
  cards.innerHTML=BRS_LEVELS.map(function(lvl){
    return '<div onclick="brsStartLevelQuiz(\''+lvl.id+'\')" style="padding:18px;background:var(--bg-card);border:2px solid '+lvl.colorBdr+';border-radius:12px;cursor:pointer;transition:background .15s;" onmouseover="this.style.background=\'var(--bg-hover)\'" onmouseout="this.style.background=\'var(--bg-card)\'">'
      +'<div style="font-size:28px;margin-bottom:8px;">'+lvl.icon+'</div>'
      +'<div style="font-size:13px;font-weight:700;color:'+lvl.color+';font-family:var(--mono);margin-bottom:4px;">'+lvl.label.toUpperCase()+'</div>'
      +'<div style="font-size:11px;color:var(--tx-muted);margin-bottom:12px;">'+lvl.desc+'</div>'
      +'<div style="font-size:10px;font-family:var(--mono);color:var(--tx-faint);">'+BRS_QUIZ_BY_LEVEL[lvl.id].length+' questions</div>'
      +'</div>';
  }).join('');
}

var brsLvlQuizState = { levelId:null, current:0, score:0, answered:false, done:false, order:[] };

window.brsStartLevelQuiz=function(levelId){
  var lvl=BRS_LEVELS.find(function(l){return l.id===levelId;}); if(!lvl) return;
  var home=document.getElementById('brs-quiz-home'); var playing=document.getElementById('brs-quiz-playing');
  var label=document.getElementById('brs-quiz-level-label');
  if(home) home.style.display='none'; if(playing) playing.style.display='';
  if(label) label.textContent=lvl.icon+' '+lvl.label+' — '+BRS_QUIZ_BY_LEVEL[levelId].length+' questions';
  brsLvlQuizState={levelId:levelId,current:0,score:0,answered:false,done:false,order:brsShuffle(BRS_QUIZ_BY_LEVEL[levelId].map(function(_,i){return i;}))};
  brsRenderQuiz();
};

window.brsQuizBackToHome=function(){
  var home=document.getElementById('brs-quiz-home'); var playing=document.getElementById('brs-quiz-playing');
  if(home){home.style.display=''; brsRenderQuizHome();}
  if(playing) playing.style.display='none';
};

window.brsRenderQuiz=function(){
  var c=document.getElementById('brs-quiz-container'); if(!c) return;
  var questions=BRS_QUIZ_BY_LEVEL[brsLvlQuizState.levelId]||[];
  var lvl=BRS_LEVELS.find(function(l){return l.id===brsLvlQuizState.levelId;})||BRS_LEVELS[0];
  if(brsLvlQuizState.done){
    var pct=Math.round(brsLvlQuizState.score/questions.length*100);
    var col=pct>=80?'var(--green)':pct>=50?'var(--yellow)':'var(--red)';
    c.innerHTML='<div style="text-align:center;padding:32px 20px;background:var(--bg-card);border:1px solid var(--br-soft);border-radius:12px;">'
      +'<div style="font-size:44px;font-weight:700;font-family:var(--mono);color:'+col+';margin-bottom:8px;">'+brsLvlQuizState.score+'/'+questions.length+'</div>'
      +'<div style="font-size:13px;font-weight:700;color:var(--tx-hi);margin-bottom:4px;">'+(pct>=80?'🎉 Maîtrise confirmée !':pct>=50?'👍 Bon niveau !':'📚 Relisez les leçons du niveau.')+'</div>'
      +'<div style="font-size:11px;color:var(--tx-muted);margin-bottom:24px;">Score : '+pct+'% — Niveau '+lvl.label+'</div>'
      +'<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">'
      +'<button onclick="brsStartLevelQuiz(\''+lvl.id+'\')" style="font-family:var(--mono);font-size:11px;padding:8px 18px;border-radius:6px;border:1px solid var(--green);background:var(--green);color:#000;cursor:pointer;font-weight:700;">🔄 Recommencer</button>'
      +'<button onclick="brsQuizBackToHome()" style="font-family:var(--mono);font-size:11px;padding:8px 18px;border-radius:6px;border:1px solid var(--br-mid);background:transparent;color:var(--tx-mid);cursor:pointer;">Choisir un niveau</button>'
      +'</div></div>';
    return;
  }
  var qi=brsLvlQuizState.order[brsLvlQuizState.current]; var q=questions[qi];
  q = window.quizShuffleOpts(q);
  window._sqCurrent = q; // shuffled q for answer function
  var prog=Math.round(brsLvlQuizState.current/questions.length*100);
  var html='<div style="background:var(--bg-card);border:1px solid var(--br-soft);border-radius:12px;padding:20px;">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">'
    +'<span style="font-size:10px;font-family:var(--mono);color:var(--tx-faint);">Question '+(brsLvlQuizState.current+1)+' / '+questions.length+'</span>'
    +'<span style="font-size:10px;font-family:var(--mono);color:'+lvl.color+';">'+brsLvlQuizState.score+' pts</span>'
    +'</div>'
    +'<div style="height:3px;background:var(--bg-input);border-radius:2px;margin-bottom:16px;"><div style="height:3px;width:'+prog+'%;background:'+lvl.color+';border-radius:2px;transition:width .3s;"></div></div>'
    +'<div style="font-size:13px;font-weight:700;color:var(--tx-hi);line-height:1.5;margin-bottom:16px;">'+q.q+'</div>'
    +'<div style="display:flex;flex-direction:column;gap:8px;" id="brs-quiz-opts">';
    q = window.quizShuffleOpts(q);
    window._sqCurrent = q; // shuffled q for answer function
  q.opts.forEach(function(opt,i){
    html+='<button onclick="brsQuizAnswer('+i+')" id="brs-opt-'+i+'" style="text-align:left;padding:10px 14px;border-radius:8px;border:1px solid var(--br-mid);background:var(--bg-raised);color:var(--tx-mid);cursor:pointer;font-size:11px;transition:border-color .1s,background .1s;" onmouseover="if(!this.dataset.locked)this.style.borderColor=\''+lvl.color+'\'" onmouseout="if(!this.dataset.locked)this.style.borderColor=\'var(--br-mid)\'"><span style="font-family:var(--mono);font-weight:700;color:var(--tx-faint);margin-right:8px;">'+String.fromCharCode(65+i)+'.</span>'+opt+'</button>';
  });
  html+='</div><div id="brs-quiz-feedback" style="margin-top:12px;"></div></div>';
  c.innerHTML=html;
};

window.brsQuizAnswer=function(idx){
  if(brsLvlQuizState.answered) return; brsLvlQuizState.answered=true;
  var questions=BRS_QUIZ_BY_LEVEL[brsLvlQuizState.levelId]||[];
  var qi=brsLvlQuizState.order[brsLvlQuizState.current]; var q = window._sqCurrent || {};
  var lvl=BRS_LEVELS.find(function(l){return l.id===brsLvlQuizState.levelId;})||BRS_LEVELS[0];
  var correct=idx===q.ans; if(correct) brsLvlQuizState.score++;
  q.opts.forEach(function(_,i){ var btn=document.getElementById('brs-opt-'+i); if(!btn)return; btn.dataset.locked='1'; btn.style.cursor='default';
    if(i===q.ans){btn.style.borderColor='var(--green)';btn.style.background='var(--green-bg)';btn.style.color='var(--green)';}
    else if(i===idx&&!correct){btn.style.borderColor='var(--red)';btn.style.background='var(--red-bg)';btn.style.color='var(--red)';}
  });
  var fb=document.getElementById('brs-quiz-feedback'); if(!fb) return;
  fb.innerHTML='<div style="padding:10px 14px;background:'+(correct?'var(--green-bg)':'var(--red-bg)')+';border:1px solid '+(correct?'var(--green-bdr)':'var(--red-bdr)')+';border-radius:8px;margin-bottom:10px;">'
    +'<div style="font-size:12px;font-weight:700;color:'+(correct?'var(--green)':'var(--red)')+';margin-bottom:4px;">'+(correct?'✅ Correct !':'❌ Pas tout à fait…')+'</div>'
    +'<div style="font-size:11px;color:var(--tx-mid);line-height:1.6;">'+q.exp+'</div></div>'
    +'<button onclick="brsQuizNext()" style="width:100%;font-family:var(--mono);font-size:11px;padding:9px;border-radius:6px;border:1px solid '+lvl.colorBdr+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">'+(brsLvlQuizState.current+1<questions.length?'Question suivante →':'Voir mon score 🏁')+'</button>';
};

window.brsQuizNext=function(){ brsLvlQuizState.current++; brsLvlQuizState.answered=false; if(brsLvlQuizState.current>=(BRS_QUIZ_BY_LEVEL[brsLvlQuizState.levelId]||[]).length) brsLvlQuizState.done=true; brsRenderQuiz(); };
window.brsQuizReset=function(){ brsQuizBackToHome(); };

/* ── Onglets ── */
window.brsTab = function(btn, tab) {
  var bar = document.getElementById('brs-tab-bar');
  if (bar) bar.querySelectorAll('.brs-tb').forEach(function(b) {
    b.style.background='var(--bg-card)'; b.style.color='var(--tx-mid)'; b.style.border='1px solid var(--br-mid)'; b.style.fontWeight='';
  });
  if (btn) { btn.style.background='var(--green)'; btn.style.color='#000'; btn.style.border='1px solid var(--green)'; btn.style.fontWeight='700'; }
  ['concepts','actifs','indices','strategies','erreurs','lessons','quiz'].forEach(function(p) {
    var el = document.getElementById('brs-panel-' + p);
    if (el) el.style.display = (p === tab) ? '' : 'none';
  });
  if (tab === 'lessons') {
    var lh=document.getElementById('brs-lessons-home'); var lv=document.getElementById('brs-lesson-view');
    if(lh){lh.style.display=''; brsRenderLevelsHome();} if(lv) lv.style.display='none';
  }
  if (tab === 'quiz') {
    var qh=document.getElementById('brs-quiz-home'); var qp=document.getElementById('brs-quiz-playing');
    if(qh){qh.style.display=''; brsRenderQuizHome();} if(qp) qp.style.display='none';
  }
};

window.brsInit = function() {
  brsLoadState();
  var bar = document.getElementById('brs-tab-bar');
  if (bar) {
    var btns = bar.querySelectorAll('.brs-tb');
    btns.forEach(function(b){ b.style.background='var(--bg-card)'; b.style.color='var(--tx-mid)'; b.style.border='1px solid var(--br-mid)'; b.style.fontWeight=''; });
    if (btns[0]) { btns[0].style.background='var(--green)'; btns[0].style.color='#000'; btns[0].style.border='1px solid var(--green)'; btns[0].style.fontWeight='700'; }
  }
  ['concepts','actifs','indices','strategies','erreurs','lessons','quiz'].forEach(function(p) {
    var el = document.getElementById('brs-panel-' + p);
    if (el) el.style.display = (p === 'concepts') ? '' : 'none';
  });
};

console.log('[Académie Bourse] Module leçons + quiz v2.0 chargé ✓');
})();
