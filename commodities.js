(function() {

  window.mpTab = function(btn, tab) {
    var bar = document.getElementById('mp-tab-bar');
    if (bar) bar.querySelectorAll('.mp-tb').forEach(function(b) {
      b.style.background = 'var(--bg-card)';
      b.style.color = 'var(--tx-mid)';
      b.style.border = '1px solid var(--br-mid)';
      b.style.fontWeight = '';
    });
    if (btn) {
      btn.style.background = 'var(--yellow)';
      btn.style.color = '#000';
      btn.style.border = '1px solid var(--yellow)';
      btn.style.fontWeight = '700';
    }
    ['concepts','categories','investir','facteurs','erreurs','lessons','quiz'].forEach(function(p) {
      var el = document.getElementById('mp-panel-' + p);
      if (el) el.style.display = (p === tab) ? '' : 'none';
    });
    if (tab === 'quiz') mpRenderQuizHome();
    if (tab === 'lessons') { mpLoadState(); mpRenderLevelsHome(); }
  };

  var MP_QUIZ = [
    {
      q: "Qu'est-ce qu'une matière première (commodity) ?",
      opts: [
        "Une action d'entreprise liée aux ressources naturelles",
        "Une ressource brute standardisée et fongible échangée sur des marchés mondiaux",
        "Un fonds d'investissement spécialisé en ressources",
        "Un produit dérivé basé sur l'immobilier"
      ],
      ans: 1,
      exp: "Une matière première est une ressource brute produite en masse, standardisée et fongible — une tonne de blé de même grade est identique partout. Pétrole, or, cuivre, blé, café en sont des exemples. Elles sont échangées sur des marchés organisés (CME, ICE, LME) ou de gré à gré."
    },
    {
      q: "Que signifie 'Contango' sur les marchés de futures ?",
      opts: [
        "Le futures est inférieur au prix spot (pénurie anticipée)",
        "Le futures est supérieur au prix spot (situation normale de stockage)",
        "Le prix spot et futures sont identiques",
        "Une stratégie de trading sur le pétrole"
      ],
      ans: 1,
      exp: "Le Contango désigne une situation où le prix futures est supérieur au prix spot — le cas le plus courant, qui reflète les coûts de stockage et de financement. Pour les investisseurs en ETF matières premières, le contango est un ennemi : chaque renouvellement de contrat se fait à un prix plus élevé, créant une perte structurelle."
    },
    {
      q: "Quelle organisation contrôle environ 40% de la production mondiale de pétrole ?",
      opts: [
        "L'AIE (Agence Internationale de l'Énergie)",
        "L'OPEP+ (OPEP et ses alliés dont la Russie)",
        "La Banque Mondiale",
        "Le CME Group"
      ],
      ans: 1,
      exp: "L'OPEP+ regroupe les pays membres de l'OPEP (Arabie Saoudite, Émirats, Iraq…) et leurs alliés, dont la Russie. Ensemble, ils contrôlent ~40% de la production pétrolière mondiale. Leurs décisions de coupes ou d'augmentations de production sont parmi les événements les plus suivis des marchés financiers."
    },
    {
      q: "Sur quel marché est principalement échangé le pétrole Brent ?",
      opts: [
        "NYMEX (New York)",
        "LME (Londres — métaux)",
        "ICE (Intercontinental Exchange, Atlanta/Londres)",
        "CBOT (Chicago)"
      ],
      ans: 2,
      exp: "Le pétrole Brent est la référence mondiale pour environ 70% du commerce pétrolier mondial. Il est échangé sur l'ICE (Intercontinental Exchange). Le WTI, référence américaine, est lui coté sur le NYMEX à New York."
    },
    {
      q: "Pourquoi le cuivre est-il surnommé 'Dr Copper' ?",
      opts: [
        "Il est utilisé en médecine pour ses propriétés antibactériennes",
        "Son prix prédit l'état de santé de l'économie mondiale",
        "Il a été découvert par un docteur au XIXe siècle",
        "La Chine l'appelle ainsi dans ses rapports officiels"
      ],
      ans: 1,
      exp: "Le cuivre est surnommé 'Dr Copper' parce que son prix est considéré comme un indicateur avancé de la santé économique mondiale. Omniprésent dans la construction, l'électricité et l'industrie, sa demande monte quand l'économie accélère et chute lors des récessions."
    },
    {
      q: "Quelle est l'unité de mesure des métaux précieux comme l'or ?",
      opts: [
        "Le gramme standard (g)",
        "La livre troy (lb)",
        "L'once troy (oz) — équivalent à 31,1 grammes",
        "Le kilogramme (kg)"
      ],
      ans: 2,
      exp: "Les métaux précieux (or, argent, platine) sont cotés en onces troy. Une once troy vaut 31,1035 grammes — à ne pas confondre avec l'once avoirdupois (28,35g) utilisée pour d'autres marchandises. L'or est ainsi coté en $/oz."
    },
    {
      q: "Pour un investisseur débutant, quelle est la méthode recommandée pour s'exposer aux matières premières ?",
      opts: [
        "Acheter des contrats futures directement sur le CME",
        "Stocker physiquement du pétrole et du cuivre",
        "Utiliser des ETF matières premières ou des actions de producteurs",
        "Acheter des CFD avec un levier maximum"
      ],
      ans: 2,
      exp: "Les ETF matières premières (GLD pour l'or, SLV pour l'argent, GSG pour un panier diversifié) ou les actions de sociétés productrices (minières, pétrolières) sont les meilleures options pour un débutant. Les futures directs impliquent un risque de livraison physique et des marges importantes."
    },
    {
      q: "Quelle est la relation historique entre le dollar américain (USD) et les matières premières ?",
      opts: [
        "Dollar fort → Matières premières plus chères (corrélation positive)",
        "Aucune relation significative entre les deux",
        "Dollar fort → Matières premières moins chères (corrélation inverse)",
        "La relation dépend uniquement du type de commodity"
      ],
      ans: 2,
      exp: "Presque toutes les matières premières étant libellées en dollars, un dollar fort les rend mécaniquement plus chères pour les acheteurs étrangers, ce qui réduit la demande et pèse sur les prix. L'inverse est vrai quand le dollar baisse. L'indice DXY est donc un indicateur clé à surveiller."
    },
    {
      q: "Quel pays est le plus grand consommateur de cuivre, d'aluminium et de soja dans le monde ?",
      opts: [
        "Les États-Unis",
        "L'Inde",
        "La Chine",
        "L'Union Européenne"
      ],
      ans: 2,
      exp: "La Chine est de loin le plus grand consommateur mondial de métaux industriels (cuivre ~55%, aluminium ~60%) et de soja. Sa croissance économique, son secteur immobilier et sa politique industrielle ont un impact direct et immédiat sur l'ensemble des marchés de matières premières."
    },
    {
      q: "Qu'est-ce que la 'Backwardation' sur les marchés de futures ?",
      opts: [
        "Le prix futures est supérieur au prix spot",
        "Le prix futures est inférieur au prix spot — signal de pénurie à court terme",
        "Le marché est fermé pour maintenance technique",
        "Un type de contrat futures à livraison différée"
      ],
      ans: 1,
      exp: "La Backwardation se produit quand le prix futures est inférieur au prix spot — situation atypique qui signale souvent une pénurie à court terme ou une forte demande immédiate. Pour les ETF qui roulent leurs futures, c'est une situation favorable : ils revendent cher (spot) et rachètent moins cher (futures)."
    }
  ];

  function mpShuffleArr(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  window.mpRenderQuizHome = function() {
    var c = document.getElementById('mp-quiz-level-cards');
    if (!c) return;
    var html = '';
    MP_LEVELS.forEach(function(lvl) {
      html += '<div onclick="mpStartLevelQuiz(\''+lvl.id+'\')" style="padding:16px;background:var(--bg-card);border:1px solid '+lvl.colorBdr+';border-radius:10px;cursor:pointer;transition:background .15s;" onmouseover="this.style.background=\'var(--bg-hover)\'" onmouseout="this.style.background=\'var(--bg-card)\'">';
      html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;"><span style="font-size:20px;">'+lvl.icon+'</span><div style="font-size:12px;font-weight:700;color:'+lvl.color+';font-family:var(--mono);">'+lvl.label+'</div></div>';
      var allQ = [];
      lvl.lessons.forEach(function(l) { allQ = allQ.concat(l.quiz); });
      html += '<div style="font-size:11px;color:var(--tx-muted);">'+allQ.length+' questions · '+lvl.desc+'</div>';
      html += '</div>';
    });
    c.innerHTML = html;
  };

  window.mpStartLevelQuiz = function(levelId) {
    var lvl = MP_LEVELS.find(function(l){return l.id===levelId;});
    if(!lvl) return;
    var allQ = [];
    lvl.lessons.forEach(function(l){allQ=allQ.concat(l.quiz);});
    mpLvlQuizState = {levelId:levelId,current:0,score:0,answered:false,done:false,order:mpShuffleArr(allQ.map(function(_,i){return i;})),questions:allQ};
    var lbl=document.getElementById('mp-quiz-level-label');if(lbl)lbl.textContent=lvl.label;
    var home=document.getElementById('mp-quiz-home');var play=document.getElementById('mp-quiz-playing');
    if(home)home.style.display='none';if(play)play.style.display='';
    mpRenderLevelQuiz();
  };

  window.mpQuizBackToHome = function() {
    var home=document.getElementById('mp-quiz-home');var play=document.getElementById('mp-quiz-playing');
    if(home)home.style.display='';if(play)play.style.display='none';
    mpRenderQuizHome();
  };

  var mpLvlQuizState = {levelId:null,current:0,score:0,answered:false,done:false,order:[],questions:[]};

  window.mpRenderLevelQuiz = function() {
    var c = document.getElementById('mp-quiz-container');
    if (!c) return;
    var S = mpLvlQuizState;
    var lvl = MP_LEVELS.find(function(l){return l.id===S.levelId;})||MP_LEVELS[0];
    if (S.done) {
      var pct = Math.round((S.score / S.questions.length) * 100);
      var col = pct >= 80 ? 'var(--green)' : pct >= 50 ? 'var(--yellow)' : 'var(--red)';
      var msg = pct >= 80 ? '🎉 Expert '+lvl.label+' !' : pct >= 50 ? '👍 Bon niveau ! Relisez les sections où vous avez hésité.' : '📚 Continuez à vous former avant d\'investir.';
      c.innerHTML = '<div style="text-align:center;padding:32px 20px;background:var(--bg-card);border:1px solid var(--br-soft);border-radius:12px;">'
        + '<div style="font-size:48px;font-family:var(--mono);font-weight:700;color:'+col+';margin-bottom:8px;">'+S.score+'/'+S.questions.length+'</div>'
        + '<div style="font-size:14px;font-weight:700;color:var(--tx-hi);margin-bottom:6px;">'+msg+'</div>'
        + '<div style="font-size:11px;color:var(--tx-muted);margin-bottom:24px;">Score : '+pct+'%</div>'
        + '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">'
        + '<button onclick="mpQuizReset()" style="font-family:var(--mono);font-size:11px;padding:8px 20px;border-radius:6px;border:1px solid '+lvl.color+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">🔄 Recommencer</button>'
        + '<button onclick="mpQuizBackToHome()" style="font-family:var(--mono);font-size:11px;padding:8px 20px;border-radius:6px;border:1px solid var(--br-mid);background:transparent;color:var(--tx-mid);cursor:pointer;">← Choisir un niveau</button>'
        + '</div></div>';
      return;
    }
    var qi = S.order[S.current];
    var q = S.questions[qi];
    var progressPct = Math.round((S.current / S.questions.length) * 100);
    var html = '<div style="background:var(--bg-card);border:1px solid var(--br-soft);border-radius:12px;padding:20px;">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">'
      + '<span style="font-size:10px;font-family:var(--mono);color:var(--tx-faint);">Question '+(S.current+1)+' / '+S.questions.length+'</span>'
      + '<span style="font-size:10px;font-family:var(--mono);color:'+lvl.color+';">Score : '+S.score+'</span>'
      + '</div>'
      + '<div style="height:3px;background:var(--bg-input);border-radius:2px;margin-bottom:16px;"><div style="height:3px;width:'+progressPct+'%;background:'+lvl.color+';border-radius:2px;transition:width .3s;"></div></div>'
      + '<div style="font-size:13px;font-weight:700;color:var(--tx-hi);line-height:1.5;margin-bottom:16px;">'+q.q+'</div>'
      + '<div style="display:flex;flex-direction:column;gap:8px;" id="mp-quiz-opts">';
    q = window.quizShuffleOpts(q);
    window._sqCurrent = q; // shuffled q for answer function
    q.opts.forEach(function(opt, i) {
      html += '<button onclick="mpQuizAnswer('+i+')" id="mp-opt-'+i+'" style="text-align:left;padding:10px 14px;border-radius:8px;border:1px solid var(--br-mid);background:var(--bg-raised);color:var(--tx-mid);cursor:pointer;font-size:11px;font-family:var(--sans);transition:border-color .1s,background .1s;" onmouseover="if(!this.dataset.locked)this.style.borderColor=\'var(--yellow)\'" onmouseout="if(!this.dataset.locked)this.style.borderColor=\'var(--br-mid)\'"><span style="font-family:var(--mono);font-weight:700;color:var(--tx-faint);margin-right:8px;">'+String.fromCharCode(65+i)+'.</span>'+opt+'</button>';
    });
    html += '</div><div id="mp-quiz-feedback" style="margin-top:12px;"></div></div>';
    c.innerHTML = html;
  };

  window.mpQuizAnswer = function(idx) {
    var S = mpLvlQuizState;
    if (S.answered) return;
    S.answered = true;
    var qi = S.order[S.current];
    var q = S.questions[qi];
    var correct = (idx === q.ans);
    if (correct) S.score++;
    var lvl = MP_LEVELS.find(function(l){return l.id===S.levelId;})||MP_LEVELS[0];
    q.opts.forEach(function(_, i) {
      var btn = document.getElementById('mp-opt-'+i);
      if (!btn) return;
      btn.dataset.locked = '1';
      btn.style.cursor = 'default';
      if (i === q.ans) {
        btn.style.borderColor = 'var(--green)';
        btn.style.background = 'var(--green-bg)';
        btn.style.color = 'var(--green)';
      } else if (i === idx && !correct) {
        btn.style.borderColor = 'var(--red)';
        btn.style.background = 'var(--red-bg)';
        btn.style.color = 'var(--red)';
      }
    });
    var fb = document.getElementById('mp-quiz-feedback');
    if (fb) {
      fb.innerHTML = '<div style="padding:10px 14px;background:'+(correct?'var(--green-bg)':'var(--red-bg)')+';border:1px solid '+(correct?'var(--green-bdr)':'var(--red-bdr)')+';border-radius:8px;margin-bottom:10px;">'
        + '<div style="font-size:12px;font-weight:700;color:'+(correct?'var(--green)':'var(--red)')+';margin-bottom:4px;">'+(correct?'✅ Correct !':'❌ Pas tout à fait…')+'</div>'
        + '<div style="font-size:11px;color:var(--tx-mid);line-height:1.6;">'+q.exp+'</div>'
        + '</div>'
        + '<button onclick="mpQuizNext()" style="width:100%;font-family:var(--mono);font-size:11px;padding:9px;border-radius:6px;border:1px solid '+lvl.color+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">'
        + (S.current + 1 < S.questions.length ? 'Question suivante →' : 'Voir mon score 🏁')
        + '</button>';
    }
  };

  window.mpQuizNext = function() {
    var S = mpLvlQuizState;
    S.current++;
    S.answered = false;
    if (S.current >= S.questions.length) S.done = true;
    mpRenderLevelQuiz();
  };

  window.mpQuizReset = function() {
    var S = mpLvlQuizState;
    S.current = 0; S.score = 0; S.answered = false; S.done = false;
    S.order = mpShuffleArr(S.questions.map(function(_,i){return i;}));
    mpRenderLevelQuiz();
  };

  window.mpGuideInit = function() {
    mpQuizState = { current: 0, score: 0, answered: false, done: false, order: [] };
    var bar = document.getElementById('mp-tab-bar');
    if (bar) {
      var btns = bar.querySelectorAll('.mp-tb');
      btns.forEach(function(b) {
        b.style.background = 'var(--bg-card)';
        b.style.color = 'var(--tx-mid)';
        b.style.border = '1px solid var(--br-mid)';
        b.style.fontWeight = '';
      });
      if (btns[0]) {
        btns[0].style.background = 'var(--yellow)';
        btns[0].style.color = '#000';
        btns[0].style.border = '1px solid var(--yellow)';
        btns[0].style.fontWeight = '700';
      }
    }
    ['concepts','categories','investir','facteurs','erreurs','lessons','quiz'].forEach(function(p) {
      var el = document.getElementById('mp-panel-' + p);
      if (el) el.style.display = (p === 'concepts') ? '' : 'none';
    });
  };


/* ─────────────────────────────────────────────────────────
   ACADÉMIE MATIÈRES PREMIÈRES — Données & Moteur JS
   ───────────────────────────────────────────────────────── */

var MP_LEVELS = [
  {
    id: 'mp-debutant',
    label: 'Débutant',
    icon: '🟢',
    color: 'var(--green)',
    colorBg: 'var(--green-bg)',
    colorBdr: 'var(--green-bdr)',
    desc: 'Comprendre les marchés de matières premières de zéro',
    xpPerLesson: 20,
    lessons: [
      {
        id: 'mp-deb-1',
        title: "Qu'est-ce qu'une matière première ?",
        emoji: '🌍',
        duration: '5 min',
        content: [
          { type: 'intro', text: "Une matière première (commodity) est une ressource brute produite en masse, standardisée et fongible. Pétrole, or, blé, cuivre — ces marchés existent depuis des siècles et constituent la base de toute économie réelle. Aujourd'hui, ce sont aussi des actifs financiers négociés mondialement 24h/24." },
          { type: 'point', icon: '📦', title: 'Fongibilité : le principe clé', text: "Une tonne de blé de grade #2 livrée à Chicago est identique à une autre. C'est ce qui permet leur échange standardisé. L'or à 99,99% de pureté vaut pareil partout dans le monde — c'est ce qui en fait un actif financier universel." },
          { type: 'point', icon: '🗂️', title: 'Les 4 grandes familles', text: "Énergie (pétrole WTI/Brent, gaz naturel), Métaux précieux (or, argent, platine), Métaux industriels (cuivre, aluminium, nickel), Agricoles (blé, maïs, soja, café, cacao). Chaque famille a ses propres moteurs de prix." },
          { type: 'point', icon: '🏛️', title: 'Où sont-elles échangées ?', text: "CME Group (Chicago) : pétrole WTI, métaux, agricoles. ICE (Atlanta/Londres) : pétrole Brent, café, cacao. LME (London Metal Exchange) : cuivre, aluminium, zinc. Ces bourses fixent les prix de référence mondiaux." },
          { type: 'example', label: 'Exemple concret', text: "Un boulanger français achète du blé. Le prix de son approvisionnement dépend du cours du blé sur le CBOT à Chicago — influencé par la météo aux États-Unis, les exportations russes, la politique agricole européenne. C'est l'interconnexion mondiale des commodities." },
          { type: 'key', text: "💡 Contrairement aux actions, les matières premières n'ont pas de valeur intrinsèque liée à des bénéfices futurs. Leur prix est entièrement dicté par l'offre et la demande mondiale — une sécheresse ou une grève minière peut déplacer les cours de 10 à 30% en quelques jours." }
        ],
        quiz: [
          { q: "Qu'est-ce que signifie 'fongible' pour une matière première ?", opts: ["Elle peut être transformée industriellement", "Une unité est interchangeable avec une autre de même qualité — identiques partout", "Elle est cotée en bourse", "Elle est produite en grande quantité"], ans: 1, exp: "La fongibilité est le principe qui permet le commerce mondial des commodities : une once d'or pur à 99,99% vaut exactement la même chose à Tokyo, Paris ou New York. C'est ce qui différencie une matière première d'un bien manufacturé unique." },
          { q: "Sur quel marché est principalement échangé le pétrole Brent ?", opts: ["NYMEX à New York", "LME à Londres (métaux)", "ICE (Intercontinental Exchange)", "CBOT à Chicago"], ans: 2, exp: "Le pétrole Brent — référence mondiale pour ~70% du commerce pétrolier — est coté sur l'ICE (Intercontinental Exchange). Le WTI américain est lui coté sur le NYMEX. Brent et WTI évoluent en parallèle avec un écart (spread) variable." },
          { q: "Quel facteur détermine PRINCIPALEMENT le prix d'une matière première ?", opts: ["Les bénéfices des entreprises productrices", "L'offre et la demande mondiale", "Les décisions des banques centrales", "Le cours de la bourse"], ans: 1, exp: "Les commodities n'ont pas de valeur intrinsèque basée sur des bénéfices — leur prix est entièrement dicté par l'équilibre offre/demande mondial. Une sécheresse en Argentine, une grève dans une mine chilienne ou une décision de l'OPEP peuvent faire bouger les cours massivement en quelques heures." }
        ]
      },
      {
        id: 'mp-deb-2',
        title: 'Spot vs Futures — Comprendre la structure de terme',
        emoji: '📅',
        duration: '6 min',
        content: [
          { type: 'intro', text: "Il existe deux façons de citer le prix d'une matière première : le prix SPOT (livraison immédiate) et le prix FUTURES (livraison future à une date précise). La relation entre ces deux prix crée des structures de marché fondamentales que tout investisseur doit comprendre." },
          { type: 'point', icon: '⚡', title: 'Le prix Spot', text: "Le prix spot est le prix pour une livraison immédiate (J+2 pour la plupart des commodities). C'est le prix 'cash' que vous verriez si vous achetiez physiquement de l'or aujourd'hui chez un revendeur. XAU/USD spot = prix de l'or livré immédiatement." },
          { type: 'point', icon: '📜', title: 'Le Contrat Futures', text: "Un futures est un accord standardisé d'achat/vente d'une quantité précise à un prix fixé aujourd'hui, pour livraison à une date future. Un contrat pétrole WTI sur le CME = 1 000 barils livrés à Cushing, Oklahoma. L'investisseur clôture sa position AVANT l'expiration pour éviter la livraison physique." },
          { type: 'point', icon: '📈', title: 'Contango — La situation normale', text: "Quand le futures > spot, on est en Contango (situation normale). Le surcoût reflète les frais de stockage et de financement. Pétrole spot 80$/bbl, futures 3 mois = 82$ → Contango de 2$. Pour les ETF qui roulent leurs contrats, le contango crée une perte structurelle continue." },
          { type: 'point', icon: '📉', title: 'Backwardation — Signal de rareté', text: "Quand le futures < spot, on est en Backwardation. Signal d'une demande immédiate très forte ou d'une pénurie à court terme. Or spot 2 000$/oz, futures 3 mois = 1 990$ → le marché paye une prime pour l'or MAINTENANT. Situation favorable pour les ETF qui roulent." },
          { type: 'example', label: 'Impact sur un ETF Pétrole', text: "Un ETF pétrole détient des futures WTI. En Contango (90% du temps pour le pétrole) : il vend ses contrats arrivant à expiration à 80$ et en rachète à 82$ pour le mois suivant → perd 2$ à chaque renouvellement. Sur 1 an, cela peut représenter -5 à -15% de performance 'invisible' appelée roll yield négatif." },
          { type: 'key', text: "💡 Le contango est l'ennemi silencieux des ETF énergétiques. Sur 10 ans, un ETF pétrole peut sous-performer massivement le prix du pétrole lui-même à cause de cet effet. Préférez les ETF or/argent (moins soumis au contango) pour une détention longue terme." }
        ],
        quiz: [
          { q: "Un investisseur achète un ETF pétrole en Contango. Que se passe-t-il à chaque renouvellement de contrat futures ?", opts: ["Il gagne la différence entre le futures et le spot", "Il perd de l'argent car il revend moins cher et rachète plus cher (roll yield négatif)", "Il ne se passe rien — l'ETF suit parfaitement le spot", "Il reçoit une livraison physique de pétrole"], ans: 1, exp: "En Contango, les futures à livraison proche sont moins chers que les suivants. L'ETF doit vendre le contrat expirant (bas) et acheter le suivant (plus cher) → perte à chaque roulement. C'est le 'roll yield négatif' — invisible mais dévastateur sur le long terme pour les ETF de matières premières comme l'USO (pétrole)." },
          { q: "Quelle structure de terme signale une pénurie à court terme sur une matière première ?", opts: ["Contango (futures > spot)", "Backwardation (futures < spot)", "Courbe plate (futures = spot)", "Toutes ces structures signalent une pénurie"], ans: 1, exp: "La Backwardation (futures < spot) est un signal que le marché paye une prime pour obtenir la matière première MAINTENANT — signe de tension d'approvisionnement immédiat. C'est une situation plus rare mais significative, souvent observée sur les marchés pétroliers ou agricoles lors de crises d'approvisionnement." },
          { q: "Un contrat futures pétrole WTI standard sur le CME représente combien de barils ?", opts: ["100 barils", "500 barils", "1 000 barils", "10 000 barils"], ans: 2, exp: "Un contrat futures pétrole WTI standard sur le NYMEX (CME Group) représente exactement 1 000 barils de pétrole brut. Avec le pétrole à 80$/bbl, la valeur d'un contrat = 80 000$. L'exécution nécessite une marge initiale (environ 5 000-8 000$) — un levier important, d'où le risque élevé pour les débutants." }
        ]
      },
      {
        id: 'mp-deb-3',
        title: "L'Or — Valeur Refuge & Actif Anti-Inflation",
        emoji: '🥇',
        duration: '7 min',
        content: [
          { type: 'intro', text: "L'or est l'actif le plus ancien du monde et reste une pièce maîtresse des portefeuilles institutionnels. Il n'est pas un simple métal — c'est une monnaie de réserve mondiale, une assurance contre les crises et un baromètre de la confiance dans les systèmes monétaires." },
          { type: 'point', icon: '🛡️', title: 'Valeur refuge en période de crise', text: "Lors des crises financières (2008, 2020 COVID), l'or monte pendant que les actions chutent. En 2020 : S&P 500 -33%, or +25% au moment de la crise. Cette décorrélation est précieuse en portefeuille. Les investisseurs institutionnels allouent 5-10% en or comme assurance." },
          { type: 'point', icon: '📊', title: 'Corrélation inverse avec le Dollar (DXY)', text: "L'or est libellé en dollars. Dollar fort → or plus cher pour les étrangers → demande baisse → prix baisse. Dollar faible → or moins cher mondialement → demande monte → prix monte. Surveiller l'indice DXY est essentiel pour anticiper les mouvements de l'or." },
          { type: 'point', icon: '🏦', title: 'Taux réels : le moteur principal', text: "L'or ne verse pas d'intérêts ni de dividendes. Son coût d'opportunité = les taux réels (taux nominal - inflation). Taux réels négatifs → détenir de l'or ne coûte rien comparé aux obligations → or monte. Taux réels positifs élevés → les obligations deviennent attractives → or corrige." },
          { type: 'point', icon: '🏛️', title: 'Achats des banques centrales', text: "Les banques centrales (Chine, Russie, Inde, Turquie) achètent massivement de l'or pour diversifier leurs réserves hors dollar. En 2022-2023, elles ont acheté les plus grandes quantités depuis 1950. Ce flux structurel soutient le prix à long terme." },
          { type: 'example', label: 'Comment investir en or concrètement', text: "1) ETF physique (GLD, IAU) — le plus simple, le plus liquide. 2) Or physique (pièces, lingots) — pas de contrepartie, stockage requis. 3) Actions minières (Newmont NEM, Barrick GOLD) — levier sur le prix de l'or. 4) CFD/ETC — spéculatif, levier. Pour un débutant : GLD ou IAU (ETF or physique)." },
          { type: 'key', text: "💡 L'or ne 's'apprécie' pas vraiment — c'est la valeur des monnaies papier qui se déprécie. Une once d'or achetait il y a 2 000 ans une belle toge romaine. Aujourd'hui, elle achète un beau costume. L'or préserve le pouvoir d'achat sur très long terme." }
        ],
        quiz: [
          { q: "Quel est le principal moteur du prix de l'or selon les économistes ?", opts: ["Le niveau de production mondiale des mines", "Les taux d'intérêt réels (taux nominaux - inflation)", "La demande de bijouterie en Inde et Chine", "La valeur de l'immobilier américain"], ans: 1, exp: "Les taux réels sont le moteur le plus puissant du prix de l'or. Quand les taux réels sont négatifs (inflation > taux nominaux), l'or ne coûte rien à détenir par rapport aux obligations qui rapportent moins que l'inflation. C'est pourquoi l'or a explosé en 2020-2022 quand la Fed a maintenu des taux bas face à une forte inflation." },
          { q: "Comment un dollar américain fort affecte-t-il le prix de l'or ?", opts: ["Il fait monter l'or car les investisseurs fuient vers les actifs réels", "Il fait baisser l'or car il devient plus cher pour les acheteurs étrangers", "Il n'a aucun impact — l'or est indépendant des devises", "Il fait monter l'or car les banques centrales achètent davantage"], ans: 1, exp: "L'or étant libellé en dollars, un dollar fort le rend mécaniquement plus cher pour les acheteurs non-américains (Europeans, Asiatiques), ce qui réduit la demande mondiale et pèse sur les prix. La corrélation inverse or/dollar est l'une des plus constantes des marchés financiers. Surveiller l'indice DXY est fondamental pour trader l'or." },
          { q: "Quel pourcentage d'allocation en or est souvent recommandé dans un portefeuille institutionnel comme assurance ?", opts: ["0% — l'or ne génère pas de revenus", "1-2% — une infime partie", "5-10% — comme couverture de portefeuille", "50% — c'est l'actif le plus sûr"], ans: 2, exp: "La majorité des gestionnaires institutionnels allouent 5-10% de leur portefeuille en or comme assurance contre les crises systémiques. Cette allocation est suffisante pour amortir les chocs sans trop peser sur la performance globale (l'or ne génère pas de revenus)." }
        ]
      }
    ]
  },
  {
    id: 'mp-intermediaire',
    label: 'Intermédiaire',
    icon: '🟡',
    color: 'var(--yellow)',
    colorBg: 'var(--yellow-bg)',
    colorBdr: 'var(--yellow-bdr)',
    desc: 'Énergie, métaux industriels, agricoles — facteurs de prix',
    xpPerLesson: 35,
    lessons: [
      {
        id: 'mp-int-1',
        title: 'Pétrole — OPEP, WTI, Brent & Géopolitique',
        emoji: '🛢️',
        duration: '8 min',
        content: [
          { type: 'intro', text: "Le pétrole est la matière première la plus politisée et la plus stratégique au monde. Son prix influence l'inflation mondiale, les devises des pays producteurs, les coûts de transport et l'ensemble des chaînes d'approvisionnement. Comprendre ses drivers est incontournable pour tout investisseur." },
          { type: 'point', icon: '🏛️', title: "L'OPEP+ — Le cartel qui fixe les prix", text: "L'OPEP+ (OPEP + Russie + alliés) contrôle ~40% de la production mondiale. Ses décisions de coupes ou d'augmentations font bouger le cours de 5-15% en une journée. Chaque réunion OPEP (environ tous les 2 mois) est un événement majeur. L'Arabie Saoudite est le producteur pivot (swing producer)." },
          { type: 'point', icon: '🇺🇸', title: 'Shale américain — Le contre-pouvoir', text: "Depuis 2015, les États-Unis sont devenus le 1er producteur mondial grâce au pétrole de schiste (shale). Le break-even du shale américain est ~50-60$/bbl. En dessous, les forages s'arrêtent. Au-dessus, ils repartent. C'est un plafond naturel sur le prix — difficile de dépasser durablement 80-90$ sans provoquer un boom du shale." },
          { type: 'point', icon: '📦', title: 'Inventaires EIA — Le signal hebdomadaire', text: "Chaque mercredi à 16h30 Paris, l'EIA (Energy Information Administration) publie les stocks de brut américains. Stocks en hausse → offre abondante → baisse des prix. Stocks en baisse → tension → hausse. C'est la publication hebdomadaire la plus suivie du marché pétrolier." },
          { type: 'point', icon: '🌍', title: 'WTI vs Brent — Quelle différence ?', text: "WTI (West Texas Intermediate) = référence américaine, coté NYMEX, livré à Cushing Oklahoma. Brent = référence mondiale (70% du commerce), coté ICE. Spread WTI/Brent habituellement 2-5$ en faveur du Brent. Quand les stocks à Cushing explosent, le WTI peut se décrocher massivement (comme en avril 2020 où le WTI est passé temporairement négatif)." },
          { type: 'example', label: 'Analyser le pétrole au quotidien', text: "Checklist trader pétrole : 1) Niveau de l'USD (DXY) — dollar fort = pétrole sous pression. 2) Inventaires EIA hebdomadaires. 3) Actualité OPEP+ et tensions géopolitiques Moyen-Orient. 4) Données de croissance chinoise (PMI manufacturier). 5) Nombre de rigs actifs aux USA (Baker Hughes rig count, vendredi)." },
          { type: 'key', text: "💡 Le prix du pétrole est l'un des meilleurs indicateurs avancés de l'inflation mondiale. Une hausse de 10% du pétrole ajoute environ 0.3-0.5% à l'IPC américain dans les 3-6 mois suivants. C'est pourquoi la Fed surveille très attentivement les cours pétroliers dans ses projections macro." }
        ],
        quiz: [
          { q: "Quel événement hebdomadaire est le plus suivi par les traders de pétrole ?", opts: ["La réunion de la Fed", "La publication des stocks de brut EIA le mercredi", "Le rapport BLS sur l'emploi", "La publication du PIB trimestriel"], ans: 1, exp: "Les inventaires de brut de l'EIA (Energy Information Administration) sont publiés chaque mercredi à 16h30 heure de Paris. Stocks en hausse = excès d'offre = baisse des prix. Stocks en baisse = tension = hausse. Les traders positionnent souvent leurs trades en amont et réagissent immédiatement à la publication." },
          { q: "À quel niveau de prix le pétrole de schiste américain (shale) devient-il rentable à produire ?", opts: ["10-20 $/bbl", "30-40 $/bbl", "50-60 $/bbl", "100-120 $/bbl"], ans: 2, exp: "Le break-even moyen du pétrole de schiste américain est d'environ 50-60 $/bbl selon le bassin. En dessous, les forages deviennent non-rentables et s'arrêtent progressivement. Au-dessus, la production repart rapidement (délai de 3-6 mois). Cela crée un plafond naturel : au-delà de 80-90$, la production shale accélère et modère le prix." },
          { q: "Qu'est-ce qui a provoqué le pétrole WTI négatif en avril 2020 ?", opts: ["L'OPEP a interdit la vente de pétrole", "Les réservoirs de stockage à Cushing étaient pleins — impossible de prendre livraison", "Le pétrole était contaminé et invendable", "Une manipulation de marché illégale des banques"], ans: 1, exp: "En avril 2020 (confinements COVID), la demande s'est effondrée mais la production a continué. Les réservoirs de stockage à Cushing, Oklahoma (point de livraison des futures WTI) étaient à capacité maximale. Les détenteurs de contrats à expiration, ne pouvant pas prendre livraison physique, ont PAYÉ pour se débarrasser de leurs contrats → prix négatifs historiques à -37,63$/bbl." }
        ]
      },
      {
        id: 'mp-int-2',
        title: 'Cuivre & Métaux Industriels — Le Pouls de l\'Économie',
        emoji: '🔩',
        duration: '7 min',
        content: [
          { type: 'intro', text: "Le cuivre est surnommé 'Dr Copper' — son prix est considéré comme un indicateur avancé de la santé économique mondiale. Présent dans toute construction, toute installation électrique, toute voiture et tout appareil électronique, il prédit les cycles économiques avant même les statistiques officielles." },
          { type: 'point', icon: '🇨🇳', title: 'La Chine — 55% de la consommation mondiale', text: "La Chine consomme à elle seule ~55% du cuivre mondial. Chaque donnée chinoise — PMI manufacturier Caixin, production industrielle, investissement immobilier — déplace le cuivre. Le secteur immobilier chinois en crise 2022-2024 (Evergrande) a pesé structurellement sur le cuivre." },
          { type: 'point', icon: '⚡', title: 'La transition énergétique — Catalyseur structurel', text: "Un véhicule électrique contient 4x plus de cuivre qu'une voiture thermique (83 kg vs 20 kg). Les éoliennes, panneaux solaires et réseaux de recharge nécessitent des quantités massives de cuivre. La demande liée à la transition énergétique devrait augmenter de 50% d'ici 2035 selon le Cobalt Institute." },
          { type: 'point', icon: '⛏️', title: 'Offre concentrée et risquée', text: "50% de la production mondiale vient de 3 pays : Chili (~27%), Pérou (~12%), Congo (~12%). Les grèves minières, problèmes géopolitiques ou catastrophes naturelles dans ces zones peuvent faire monter le cuivre de 5-10% en quelques jours. Les mines ont un délai de développement de 10-15 ans — l'offre ne peut pas s'ajuster rapidement." },
          { type: 'point', icon: '🔧', title: 'Aluminium, Zinc, Nickel — Les autres industriels', text: "Aluminium (LME) : aéronautique, emballages, construction. Très énergivore à produire — le prix de l'électricité est son principal coût. Zinc : galvanisation de l'acier (anti-rouille). Nickel : batteries Li-ion (essor des VE), inox. Tous cotés sur le LME à Londres." },
          { type: 'example', label: 'Dr Copper en action — Récession 2022', text: "En 2021-2022 : cuivre à 10 500$/t (record). Puis dès mars 2022 : chute progressive vers 7 000$ en juillet 2022. La récession manufacturière mondiale était en cours mois AVANT que les statistiques officielles ne la confirment. Les traders de cuivre avaient vu le ralentissement venir avant les économistes." },
          { type: 'key', text: "💡 Pour trader les métaux industriels, suivez : le PMI manufacturier Caixin Chine (1er du mois), l'inventaire LME (daily), les nouvelles des grandes mines (Freeport-McMoRan FCX, BHP, Glencore) et les données immobilières chinoises. Un PMI Chine < 50 = territoire baissier pour le cuivre." }
        ],
        quiz: [
          { q: "Pourquoi le cuivre est-il surnommé 'Dr Copper' ?", opts: ["Il est utilisé en médecine pour ses propriétés antibactériennes", "Son prix prédit l'état de la santé économique mondiale", "Il a été découvert par un docteur au 19ème siècle", "La Chine l'appelle ainsi dans ses rapports officiels"], ans: 1, exp: "Dr Copper est un surnom donné par les traders à cause de ses propriétés d'indicateur économique avancé. Étant présent dans pratiquement toute activité industrielle (construction, électricité, transport), sa demande prédit les cycles économiques. Une chute du cuivre anticipe souvent une récession 3-6 mois à l'avance." },
          { q: "Quel pays consomme environ 55% du cuivre mondial ?", opts: ["Les États-Unis", "L'Union Européenne", "La Chine", "L'Inde"], ans: 2, exp: "La Chine est de loin le plus grand consommateur de cuivre au monde avec ~55% de la consommation globale. Son secteur immobilier et son industrie manufacturière sont les principaux moteurs. C'est pourquoi chaque donnée économique chinoise (PMI, immobilier, production industrielle) a un impact direct et immédiat sur le prix du cuivre." },
          { q: "Combien de fois plus de cuivre contient un véhicule électrique par rapport à un thermique ?", opts: ["2 fois plus (40 vs 20 kg)", "4 fois plus (83 vs 20 kg)", "10 fois plus (200 vs 20 kg)", "Identique — le cuivre est remplacé par l'aluminium"], ans: 1, exp: "Un véhicule électrique contient environ 83 kg de cuivre contre 20 kg pour un thermique — soit 4 fois plus. Les moteurs électriques, batteries, câblage et infrastructures de recharge nécessitent d'énormes quantités de cuivre. La transition vers les VE est un catalyseur structurel majeur pour la demande de cuivre à long terme." }
        ]
      },
      {
        id: 'mp-int-3',
        title: 'Matières Premières Agricoles — Climat & Géopolitique',
        emoji: '🌾',
        duration: '7 min',
        content: [
          { type: 'intro', text: "Les marchés agricoles sont les plus imprévisibles des commodities — la météo peut détruire une récolte en quelques jours. Blé, maïs, soja, café, cacao : ces marchés touchent directement à la sécurité alimentaire mondiale et peuvent connaître des mouvements explosifs liés à des événements géopolitiques ou climatiques." },
          { type: 'point', icon: '🌾', title: 'Blé & Maïs — Céréales de base', text: "Le blé a explosé de +60% en 2022 suite à l'invasion ukrainienne (Ukraine + Russie = 30% des exportations mondiales). Le maïs est aussi utilisé pour l'éthanol (carburant) — la politique énergétique américaine impacte son prix. Très sensibles aux rapports USDA (crop reports) publiés mensuellement." },
          { type: 'point', icon: '🫘', title: 'Soja — La commodity de la mondialisation', text: "Le soja est la matière première agricole la plus échangée après maïs et blé. La Chine est le 1er importateur (alimentation animale). Le Brésil et les États-Unis produisent ~85% de l'offre mondiale. La guerre commerciale US-Chine 2018-2019 a massivement perturbé les flux de soja." },
          { type: 'point', icon: '☕', title: 'Café & Cacao — Les softs exotiques', text: "Le cacao a atteint des records historiques en 2024 (+250% en 12 mois !) suite aux mauvaises récoltes en Côte d'Ivoire et Ghana (~65% de l'offre mondiale). Le café Arabica est très sensible aux gelées au Brésil (1er producteur). Ces 'softs' peuvent être extrêmement volatils et spéculatifs." },
          { type: 'point', icon: '🌡️', title: 'El Niño/La Niña — Les cycles climatiques', text: "El Niño (réchauffement Pacifique Est) crée des sécheresses en Australie et Indonésie mais des pluies en Amérique du Sud. La Niña inverse les patterns. Ces cycles de 2-7 ans ont un impact massif sur les récoltes mondiales. Les traders agricoles suivent les bulletins NOAA et les modèles GFS/ECMWF." },
          { type: 'example', label: 'Le cacao 2024 — Une leçon sur les softs', text: "Jan 2023 : cacao à 2 500$/t. Jan 2024 : 4 500$/t. Avril 2024 : 11 000$/t (+340% en 18 mois). Cause : 2 années consécutives de mauvaises récoltes en Côte d'Ivoire (maladie du cacaoyer + sécheresse El Niño). L'offre mondiale ne peut pas être reconstituée rapidement — un cacaoyer met 5 ans à produire." },
          { type: 'key', text: "💡 Les rapports USDA (WASDE — World Agricultural Supply and Demand Estimates) publiés le 2ème mercredi de chaque mois sont les données les plus importantes pour les agricoles. Ils contiennent les estimations de production, consommation et stocks mondiaux pour toutes les grandes céréales." }
        ],
        quiz: [
          { q: "Quel événement a fait exploser le prix du blé de +60% en 2022 ?", opts: ["Une sécheresse aux États-Unis", "L'invasion russe de l'Ukraine — 30% des exportations mondiales perturbées", "Une décision de l'USDA de limiter les exportations", "Un effondrement de la demande chinoise"], ans: 1, exp: "L'Ukraine et la Russie représentent ensemble environ 30% des exportations mondiales de blé. L'invasion russe de février 2022 a immédiatement bloqué les exportations ukrainiennes via la mer Noire, créant une crise d'approvisionnement mondiale. Le blé a atteint 13 $/boisseau en mars 2022 — un record historique." },
          { q: "Quels pays produisent environ 85% du soja mondial ?", opts: ["États-Unis et Argentine", "Brésil et États-Unis", "Chine et Brésil", "Inde et États-Unis"], ans: 1, exp: "Le Brésil (~40%) et les États-Unis (~35%) sont les deux géants mondiaux du soja, représentant à eux deux ~85% de l'offre exportable. La Chine est le 1er importateur, ce qui rend ce marché très sensible aux relations diplomatiques sino-américaines. La guerre commerciale 2018-2019 avait fortement perturbé les flux." },
          { q: "Quelle publication est la plus importante pour les marchés agricoles mondiaux ?", opts: ["Le rapport hebdomadaire EIA", "Le WASDE (USDA) publié le 2ème mercredi de chaque mois", "Le rapport mensuel de la BCE", "Le bilan annuel de la FAO"], ans: 1, exp: "Le WASDE (World Agricultural Supply and Demand Estimates) de l'USDA est la bible des marchés agricoles. Publié le 2ème mercredi du mois, il fournit des estimations précises de production, consommation, exportations et stocks mondiaux pour toutes les grandes cultures. Sa publication génère souvent une forte volatilité sur les futures du CBOT." }
        ]
      }
    ]
  },
  {
    id: 'mp-avance',
    label: 'Avancé',
    icon: '🔴',
    color: 'var(--orange)',
    colorBg: 'var(--orange-bg)',
    colorBdr: 'var(--orange-bdr)',
    desc: 'Stratégies d\'investissement, corrélations & trading avancé',
    xpPerLesson: 50,
    lessons: [
      {
        id: 'mp-adv-1',
        title: 'Corrélations Inter-marchés — Commodities & Devises',
        emoji: '🔗',
        duration: '8 min',
        content: [
          { type: 'intro', text: "Les matières premières ne vivent pas en isolation — elles sont intimement liées aux devises, aux taux d'intérêt et aux cycles économiques. Maîtriser ces corrélations donne un avantage décisif : anticiper le mouvement d'une commodity en analysant un marché connexe." },
          { type: 'point', icon: '🇦🇺', title: 'AUD et Matières Premières', text: "L'Australie est un des plus grands exportateurs mondiaux de minerai de fer, charbon, cuivre et or. L'AUD (dollar australien) est surnommé 'commodity currency'. Quand le cuivre et le minerai de fer montent → l'AUD s'apprécie → AUD/USD monte. Une des corrélations les plus fiables du Forex." },
          { type: 'point', icon: '🇨🇦', title: 'CAD et Pétrole', text: "Le Canada est le 4ème producteur de pétrole mondial et 1er exportateur vers les USA. L'USD/CAD a une corrélation inverse robuste avec le WTI : pétrole monte → CAD s'apprécie → USD/CAD baisse. Vérifiable sur 90% des semaines de trading. Indispensable pour tout trader pétrole ou Forex." },
          { type: 'point', icon: '🥇', title: 'Or, DXY et Taux Réels US', text: "Triple corrélation : DXY monte → or baisse. Taux réels US montent → or baisse (coût d'opportunité). DXY baisse ET taux réels négatifs → conditions idéales pour une hausse de l'or. En 2020-2022 : Fed à 0%, inflation à 8% → taux réels à -6% → or à 2 070$ record." },
          { type: 'point', icon: '⚡', title: 'Énergie et Inflation', text: "Le pétrole est l'input de presque toute production économique. Pétrole +10% → IPC +0.3-0.5% dans les 3-6 mois. Quand le pétrole monte fortement, les banques centrales doivent remonter les taux → baisse des actions de croissance. La corrélation pétrole/inflation/taux est le cycle macro le plus important à comprendre." },
          { type: 'example', label: 'Trade inter-marchés : Or + DXY + Taux', text: "Contexte 2025 : inflation US à 3%, taux Fed à 4.5% → taux réels ~+1.5% (négatifs pour l'or). Si la Fed signale des baisses de taux → taux réels vont baisser → conditions favorables à l'or. Confirmation technique : l'or casse une résistance majeure. Confluence macro + technique = setup haute probabilité." },
          { type: 'key', text: "💡 Les corrélations ne sont pas permanentes — elles se renforcent en période de tendance claire et s'estompent en marché latéral. Calculez toujours la corrélation récente (30-90 jours glissants) plutôt que de vous fier aveuglément à des corrélations historiques figées." }
        ],
        quiz: [
          { q: "Quelle paire Forex est considérée comme une 'commodity currency' fortement corrélée au cuivre ?", opts: ["EUR/USD", "GBP/JPY", "AUD/USD", "USD/CHF"], ans: 2, exp: "L'AUD (dollar australien) est une 'commodity currency' par excellence. L'Australie est l'un des plus grands exportateurs de minerai de fer, cuivre et charbon. Quand les prix des métaux industriels montent (demande chinoise forte), les exportations australiennes augmentent → afflux de dollars → AUD s'apprécie. La corrélation AUD/USD avec le cuivre est parmi les plus fiables du marché." },
          { q: "Quel est l'impact d'une hausse de 10% du pétrole sur l'inflation américaine (IPC) ?", opts: ["Aucun impact direct", "+0.1% immédiatement", "+0.3-0.5% dans les 3-6 mois suivants", "+2-3% dans l'année"], ans: 2, exp: "Le pétrole entre dans les coûts de presque toute production et distribution économique. Une hausse de 10% du pétrole se répercute sur l'essence, les transports, la chimie, l'agroalimentaire — contribuant à une hausse de l'IPC d'environ 0.3-0.5% dans un délai de 3-6 mois. C'est pourquoi la Fed surveille attentivement les cours pétroliers dans ses projections d'inflation." },
          { q: "Quelles conditions sont idéales pour une hausse de l'or ?", opts: ["Dollar fort + taux réels élevés positifs", "Dollar faible + taux réels négatifs (inflation > taux nominaux)", "Dollar fort + inflation basse", "Taux directeur élevé + croissance forte"], ans: 1, exp: "L'or performe le mieux quand : 1) Le dollar est faible (or moins cher pour les acheteurs étrangers). 2) Les taux réels sont négatifs (inflation > taux nominaux), annulant le coût d'opportunité de détenir de l'or. Ce fut exactement le cas 2020-2022 : taux Fed à 0% + inflation à 7-8% = taux réels à -6% → or au record de 2 070$." }
        ]
      },
      {
        id: 'mp-adv-2',
        title: 'Stratégies d\'Investissement en Commodities',
        emoji: '📈',
        duration: '9 min',
        content: [
          { type: 'intro', text: "Il existe plusieurs façons d'investir en matières premières — chacune avec ses avantages, risques et coûts spécifiques. Le choix de l'instrument est aussi important que le choix de la commodity elle-même. Un mauvais véhicule peut transformer un bon trade macro en perte structurelle." },
          { type: 'point', icon: '📦', title: 'ETF Physiques vs ETF Futures', text: "ETF physiques (GLD, IAU pour l'or) : détiennent réellement le métal en coffres-forts. Réplique parfaite du spot. Pour l'or, argent, platine. ETF futures (USO pétrole, UNG gaz) : détiennent des contrats futures. Soumis au contango → sous-performance structurelle vs le spot. À éviter pour détention longue." },
          { type: 'point', icon: '🏭', title: 'Actions de Producteurs — L\'effet de levier naturel', text: "Une mine d'or à coût de production 1 200$/oz et prix spot 2 000$/oz a une marge de 800$. Si l'or monte à 2 200$ (+10%) → marge passe à 1 000$ (+25%). Les actions minières (NEM, GOLD, AEM) offrent un levier naturel sur le métal. Mais ajoutent le risque opérationnel et le risque management." },
          { type: 'point', icon: '📊', title: 'Indices de Commodities — La Diversification', text: "GSCI (Goldman Sachs Commodity Index) : surpondère l'énergie (~60%). Bloomberg Commodity Index : plus diversifié. S&P GSCI Reduced Energy : exposé aux commodities sans surpoids pétrole. Ces indices permettent une exposition diversifiée à toutes les familles de commodities via un seul ETF (GSG, DJP)." },
          { type: 'point', icon: '🔄', title: 'Stratégie Saisonnière — Timing des Commodities', text: "Or : souvent fort en Q1 (demande joaillerie Inde/Chine pour fêtes) et Q4. Pétrole : demande estivale (essence) → hausse tendancielle en Q2, baisse en Q4. Gaz naturel : fort en automne (reconstitution stocks avant hiver). Ces patterns saisonniers ne sont pas des certitudes mais des probabilités historiques." },
          { type: 'example', label: 'Portefeuille commodities diversifié', text: "Allocation type pour 10% de commodities dans un portefeuille : 4% or physique (GLD/IAU) — valeur refuge. 2% actions minières (GDX ETF) — levier sur or. 2% énergie diversifiée (XLE — actions pétrolières) — exposé au secteur sans contango. 2% ETF diversifié (PDBC — Bloomberg Commodity). Évite les ETF futures purs en énergie." },
          { type: 'key', text: "💡 La règle d'or : n'allouez jamais plus de 5-15% de votre portefeuille total aux matières premières. Elles sont cycliques, volatiles et ne génèrent pas de revenus. Leur rôle est de diversifier et couvrir l'inflation — pas de constituer le coeur d'un portefeuille long terme." }
        ],
        quiz: [
          { q: "Pourquoi les ETF pétrole comme USO sous-performent-ils structurellement le prix du pétrole sur le long terme ?", opts: ["Leurs frais de gestion sont trop élevés", "Le contango crée une perte à chaque renouvellement de contrat futures", "Ils investissent dans des actions pétrolières, pas dans le pétrole direct", "La SEC impose des restrictions sur leur performance"], ans: 1, exp: "Le pétrole est presque toujours en Contango (futures > spot). Un ETF comme USO doit chaque mois vendre ses contrats expirants (moins chers) et racheter le mois suivant (plus chers) → perte systématique au roulement. Sur 10 ans, USO peut sous-performer le prix spot du pétrole de 50-70% rien que grâce à cet effet roll yield négatif." },
          { q: "Une mine d'or produit à 1200$/oz et l'or est à 2000$/oz. Si l'or monte de 10% à 2200$, de combien augmentent les bénéfices de la mine ?", opts: ["10% — en ligne avec la hausse de l'or", "15%", "25% — l'effet de levier opérationnel", "50%"], ans: 2, exp: "Coûts fixes à 1200$, or à 2000$ → marge = 800$. Avec or à 2200$ (+10%), marge = 1000$ (+25%). C'est l'effet de levier opérationnel des producteurs : leurs coûts sont fixes, donc la totalité de la hausse du prix se répercute sur leur marge. C'est pourquoi les actions minières surperforment le métal en phase de hausse — et sous-performent en phase de baisse." },
          { q: "Quelle est la règle d'allocation maximale recommandée aux matières premières dans un portefeuille équilibré ?", opts: ["0% — les commodities ne génèrent pas de revenus", "5-15% du portefeuille total", "30-40% pour une bonne diversification", "50% pour se protéger de l'inflation"], ans: 1, exp: "Les matières premières sont cycliques, volatiles et ne génèrent pas de revenus (pas de dividendes, pas d'intérêts). Leur rôle est de diversifier le portefeuille et le protéger de l'inflation. Une allocation de 5-15% est suffisante pour cet objectif sans compromettre le rendement global. Au-delà, le risque volatilité devient trop important par rapport à la contribution au rendement." }
        ]
      }
    ]
  }
];

/* ─── État & Persistance ─── */
var MP_STORE_KEY = 'mp_academy_v1';
var mpAcadState = { xp: 0, completed: {}, quizScores: {} };

function mpLoadState() {
  try { var s = localStorage.getItem(MP_STORE_KEY); if (s) mpAcadState = JSON.parse(s); } catch(e) {}
}
function mpSaveState() {
  try { localStorage.setItem(MP_STORE_KEY, JSON.stringify(mpAcadState)); } catch(e) {}
}
window.mpSaveState = mpSaveState;
mpLoadState();

/* ─── Render liste des niveaux ─── */
function mpRenderLevelsHome() {
  var c = document.getElementById('mp-levels-list');
  if (!c) return;
  var xpEl = document.getElementById('mp-xp-val');
  if (xpEl) xpEl.textContent = mpAcadState.xp;
  var html = '';
  MP_LEVELS.forEach(function(lvl) {
    var done = lvl.lessons.filter(function(l) { return mpAcadState.completed[l.id]; }).length;
    var pct = Math.round((done / lvl.lessons.length) * 100);
    html += '<div style="background:var(--bg-card);border:1px solid '+lvl.colorBdr+';border-radius:12px;padding:20px;margin-bottom:2px;">'
      + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">'
      + '<span style="font-size:22px;">'+lvl.icon+'</span>'
      + '<div><div style="font-size:14px;font-weight:700;color:'+lvl.color+';font-family:var(--mono);">'+lvl.label+'</div>'
      + '<div style="font-size:11px;color:var(--tx-muted);">'+lvl.desc+'</div></div>'
      + '<div style="margin-left:auto;text-align:right;">'
      + '<div style="font-size:11px;font-family:var(--mono);color:'+lvl.color+';">'+done+'/'+lvl.lessons.length+' leçons</div>'
      + '<div style="font-size:10px;color:var(--tx-faint);">'+(done*lvl.xpPerLesson)+' XP</div></div>'
      + '</div>'
      + '<div style="height:4px;background:var(--bg-input);border-radius:2px;margin-bottom:14px;"><div style="height:4px;width:'+pct+'%;background:'+lvl.color+';border-radius:2px;transition:width .4s;"></div></div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px;">';
    lvl.lessons.forEach(function(les) {
      var isDone = !!mpAcadState.completed[les.id];
      html += '<div onclick="mpOpenLesson(\''+lvl.id+'\',\''+les.id+'\')" style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg-raised);border:1px solid '+(isDone?lvl.colorBdr:'var(--br-soft)')+';border-radius:8px;cursor:pointer;transition:border-color .15s;" onmouseover="this.style.borderColor=\''+lvl.color+'\'" onmouseout="this.style.borderColor=\''+(isDone?lvl.colorBdr:'var(--br-soft)')+'\'">'
        + '<span style="font-size:18px;">'+les.emoji+'</span>'
        + '<div style="flex:1;min-width:0;">'
        + '<div style="font-size:11px;font-weight:700;color:var(--tx-hi);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+les.title+'</div>'
        + '<div style="font-size:10px;color:var(--tx-faint);">'+les.duration+' · '+les.quiz.length+' questions · '+lvl.xpPerLesson+' XP</div>'
        + '</div>'
        + (isDone ? '<span style="font-size:16px;">✅</span>' : '<span style="font-size:11px;font-family:var(--mono);color:'+lvl.color+';padding:2px 6px;border:1px solid '+lvl.colorBdr+';border-radius:4px;">START</span>')
        + '</div>';
    });
    html += '</div></div>';
  });
  c.innerHTML = html;
}

/* ─── Ouvrir une leçon ─── */
window.mpOpenLesson = function(levelId, lessonId) {
  var lvl = MP_LEVELS.find(function(l) { return l.id === levelId; });
  var les = lvl ? lvl.lessons.find(function(l) { return l.id === lessonId; }) : null;
  if (!lvl || !les) return;
  var home = document.getElementById('mp-lessons-home');
  var view = document.getElementById('mp-lesson-view');
  var bc   = document.getElementById('mp-lesson-breadcrumb');
  if (home) home.style.display = 'none';
  if (view) view.style.display = '';
  if (bc) bc.textContent = lvl.label + ' › ' + les.title;
  var c = document.getElementById('mp-lesson-content');
  if (!c) return;
  var html = '<div style="background:var(--bg-card);border:1px solid '+lvl.colorBdr+';border-radius:12px;overflow:hidden;">'
    + '<div style="padding:20px 24px;background:linear-gradient(135deg,'+lvl.colorBg+' 0%,transparent 100%);border-bottom:1px solid '+lvl.colorBdr+'">'
    + '<div style="display:flex;align-items:center;gap:12px;margin-bottom:4px;">'
    + '<span style="font-size:28px;">'+les.emoji+'</span>'
    + '<div><div style="font-size:16px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);">'+les.title+'</div>'
    + '<div style="font-size:10px;color:var(--tx-faint);">'+les.duration+' de lecture · '+les.quiz.length+' questions · '+lvl.xpPerLesson+' XP</div></div>'
    + '</div></div>'
    + '<div style="padding:20px 24px;">';
  les.content.forEach(function(block) {
    if (block.type === 'intro') {
      html += '<div style="font-size:12px;color:var(--tx-mid);line-height:1.8;margin-bottom:16px;padding:14px 16px;background:'+lvl.colorBg+';border-left:3px solid '+lvl.color+';border-radius:0 8px 8px 0;">'+block.text+'</div>';
    } else if (block.type === 'point') {
      html += '<div style="display:flex;gap:12px;margin-bottom:14px;padding:12px 14px;background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:8px;">'
        + '<span style="font-size:20px;flex-shrink:0;">'+block.icon+'</span>'
        + '<div><div style="font-size:12px;font-weight:700;color:var(--tx-hi);margin-bottom:4px;">'+block.title+'</div>'
        + '<div style="font-size:11px;color:var(--tx-muted);line-height:1.65;">'+block.text+'</div></div></div>';
    } else if (block.type === 'example') {
      html += '<div style="padding:12px 14px;background:var(--blue-bg);border:1px solid var(--blue-bdr);border-radius:8px;margin-bottom:14px;">'
        + '<div style="font-size:10px;font-family:var(--mono);font-weight:700;color:var(--blue);margin-bottom:6px;letter-spacing:1px;">📋 '+block.label.toUpperCase()+'</div>'
        + '<div style="font-size:11px;color:var(--tx-mid);line-height:1.65;">'+block.text+'</div></div>';
    } else if (block.type === 'key') {
      html += '<div style="padding:12px 14px;background:var(--orange-bg);border:1px solid var(--orange-bdr);border-radius:8px;margin-bottom:14px;">'
        + '<div style="font-size:11px;color:var(--tx-mid);line-height:1.65;">'+block.text+'</div></div>';
    }
  });
  html += '<div style="margin-top:20px;border-top:1px solid var(--br-soft);padding-top:20px;">'
    + '<div style="font-size:11px;font-family:var(--mono);font-weight:700;color:'+lvl.color+';letter-spacing:1px;margin-bottom:14px;">🧠 QUIZ DE LA LEÇON ('+les.quiz.length+' QUESTIONS)</div>'
    + '<div id="mp-inline-quiz-'+les.id+'"></div></div>';
  html += '</div></div>';
  html += '<div style="margin-top:16px;text-align:center;">'
    + '<button onclick="mpMarkDone(\''+levelId+'\',\''+lessonId+'\')" style="font-family:var(--mono);font-size:11px;padding:10px 28px;border-radius:6px;border:1px solid '+lvl.colorBdr+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">✅ Marquer comme terminé +'+lvl.xpPerLesson+' XP</button>'
    + '</div>';
  c.innerHTML = html;
  mpRenderInlineQuiz(les, lvl);
};

/* ─── Quiz inline ─── */
var mpInlineQuizStates = {};
function mpRenderInlineQuiz(les, lvl) {
  var containerId = 'mp-inline-quiz-' + les.id;
  var container = document.getElementById(containerId);
  if (!container) return;
  if (!mpInlineQuizStates[les.id]) mpInlineQuizStates[les.id] = { current: 0, answered: false, score: 0, done: false };
  var state = mpInlineQuizStates[les.id];
  if (state.done) {
    var pct = Math.round((state.score / les.quiz.length) * 100);
    container.innerHTML = '<div style="text-align:center;padding:20px;background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:10px;">'
      + '<div style="font-size:28px;font-family:var(--mono);font-weight:700;color:'+(pct>=80?'var(--green)':pct>=50?'var(--yellow)':'var(--red)')+';margin-bottom:6px;">'+state.score+'/'+les.quiz.length+'</div>'
      + '<div style="font-size:12px;color:var(--tx-mid);margin-bottom:12px;">'+(pct>=80?'Parfait ! 🎉':pct>=50?'Bien joué 👍':'Relisez la leçon 📚')+'</div>'
      + '<button onclick="mpResetInlineQuiz(\''+les.id+'\')" style="font-family:var(--mono);font-size:10px;padding:6px 16px;border-radius:6px;border:1px solid var(--br-mid);background:transparent;color:var(--tx-mid);cursor:pointer;">🔄 Recommencer</button>'
      + '</div>';
    return;
  }
  var q = les.quiz[state.current];
  q = window.quizShuffleOpts(q);
  window._sqCurrent = q; // shuffled q for answer function
  var html = '<div style="background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:10px;padding:16px;">'
    + '<div style="display:flex;justify-content:space-between;margin-bottom:10px;">'
    + '<span style="font-size:10px;font-family:var(--mono);color:var(--tx-faint);">Q '+(state.current+1)+'/'+les.quiz.length+'</span>'
    + '<span style="font-size:10px;font-family:var(--mono);color:'+lvl.color+';">'+state.score+' pts</span>'
    + '</div>'
    + '<div style="height:2px;background:var(--bg-input);border-radius:1px;margin-bottom:12px;"><div style="height:2px;width:'+(state.current/les.quiz.length*100)+'%;background:'+lvl.color+';border-radius:1px;"></div></div>'
    + '<div style="font-size:12px;font-weight:700;color:var(--tx-hi);line-height:1.5;margin-bottom:12px;">'+q.q+'</div>'
    + '<div style="display:flex;flex-direction:column;gap:7px;">';
  q.opts.forEach(function(opt, i) {
    html += '<button onclick="mpInlineAnswer(\''+les.id+'\','+i+')" id="mp-iq-'+les.id+'-'+i+'" style="text-align:left;padding:9px 12px;border-radius:7px;border:1px solid var(--br-mid);background:var(--bg-card);color:var(--tx-mid);cursor:pointer;font-size:11px;font-family:var(--sans);" onmouseover="if(!this.dataset.locked)this.style.borderColor=\''+lvl.color+'\'" onmouseout="if(!this.dataset.locked)this.style.borderColor=\'var(--br-mid)\'"><span style="font-family:var(--mono);font-weight:700;color:var(--tx-faint);margin-right:7px;">'+String.fromCharCode(65+i)+'.</span>'+opt+'</button>';
  });
  html += '</div><div id="mp-iq-fb-'+les.id+'" style="margin-top:10px;"></div></div>';
  container.innerHTML = html;
}

window.mpInlineAnswer = function(lesId, idx) {
  var state = mpInlineQuizStates[lesId];
  if (!state || state.answered) return;
  state.answered = true;
  var lvl = MP_LEVELS.find(function(l) { return l.lessons.some(function(le) { return le.id === lesId; }); });
  var les = lvl ? lvl.lessons.find(function(l) { return l.id === lesId; }) : null;
  if (!les) return;
  var q = window._sqCurrent || {};
  var correct = idx === q.ans;
  if (correct) state.score++;
  q.opts.forEach(function(_, i) {
    var btn = document.getElementById('mp-iq-' + lesId + '-' + i);
    if (!btn) return;
    btn.dataset.locked = '1'; btn.style.cursor = 'default';
    if (i === q.ans) { btn.style.borderColor = 'var(--green)'; btn.style.background = 'var(--green-bg)'; btn.style.color = 'var(--green)'; }
    else if (i === idx && !correct) { btn.style.borderColor = 'var(--red)'; btn.style.background = 'var(--red-bg)'; btn.style.color = 'var(--red)'; }
  });
  var fb = document.getElementById('mp-iq-fb-' + lesId);
  if (fb) fb.innerHTML = '<div style="padding:9px 12px;background:'+(correct?'var(--green-bg)':'var(--red-bg)')+';border:1px solid '+(correct?'var(--green-bdr)':'var(--red-bdr)')+';border-radius:7px;margin-bottom:8px;">'
    + '<div style="font-size:11px;font-weight:700;color:'+(correct?'var(--green)':'var(--red)')+';margin-bottom:3px;">'+(correct?'✅ Correct !':'❌ Pas tout à fait…')+'</div>'
    + '<div style="font-size:10px;color:var(--tx-mid);line-height:1.6;">'+q.exp+'</div></div>'
    + '<button onclick="mpInlineNext(\''+lesId+'\')" style="width:100%;font-family:var(--mono);font-size:10px;padding:8px;border-radius:6px;border:1px solid '+lvl.colorBdr+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">'+(state.current+1<les.quiz.length?'Question suivante →':'Voir mon résultat 🏁')+'</button>';
};

window.mpInlineNext = function(lesId) {
  var state = mpInlineQuizStates[lesId];
  if (!state) return;
  state.current++; state.answered = false;
  var lvl = MP_LEVELS.find(function(l) { return l.lessons.some(function(le) { return le.id === lesId; }); });
  var les = lvl ? lvl.lessons.find(function(l) { return l.id === lesId; }) : null;
  if (!les) return;
  if (state.current >= les.quiz.length) state.done = true;
  mpRenderInlineQuiz(les, lvl);
};

window.mpResetInlineQuiz = function(lesId) {
  mpInlineQuizStates[lesId] = { current: 0, answered: false, score: 0, done: false };
  var lvl = MP_LEVELS.find(function(l) { return l.lessons.some(function(le) { return le.id === lesId; }); });
  var les = lvl ? lvl.lessons.find(function(l) { return l.id === lesId; }) : null;
  if (les && lvl) mpRenderInlineQuiz(les, lvl);
};

window.mpMarkDone = function(levelId, lessonId) {
  mpLoadState();
  var lvl = MP_LEVELS.find(function(l) { return l.id === levelId; });
  if (!lvl) return;
  var already = !!mpAcadState.completed[lessonId];
  if (!already) { mpAcadState.completed[lessonId] = true; mpAcadState.xp += lvl.xpPerLesson; }
  mpSaveState();
  var xpEl = document.getElementById('mp-xp-val');
  if (xpEl) xpEl.textContent = mpAcadState.xp;
  mpLessonBackToHome();
};

window.mpLessonBackToHome = function() {
  var home = document.getElementById('mp-lessons-home');
  var view = document.getElementById('mp-lesson-view');
  if (home) { home.style.display = ''; mpRenderLevelsHome(); }
  if (view) view.style.display = 'none';
};


    console.log('[Guide Matières Premières] Module chargé');
})();
/* ═══════════════════════════════════════════════════════════
   GUIDE ÉCONOMIE — Tab switcher + Quiz JS
   ═══════════════════════════════════════════════════════════ */
(function() {

  /* ── Tab switcher ── */
  window.ecoTab = function(btn, panel) {
    var bar = document.getElementById('eco-tab-bar');
    if (bar) {
      bar.querySelectorAll('.eco-tb').forEach(function(b) {
        b.style.background  = 'var(--bg-card)';
        b.style.color       = 'var(--tx-mid)';
        b.style.border      = '1px solid var(--br-mid)';
        b.style.fontWeight  = '';
      });
    }
    if (btn) {
      btn.style.background = 'var(--blue)';
      btn.style.color      = '#fff';
      btn.style.border     = '1px solid var(--blue)';
      btn.style.fontWeight = '700';
    }
    ['concepts','indicateurs','banques','cycles','erreurs','lessons','quiz'].forEach(function(p) {
      var el = document.getElementById('eco-panel-' + p);
      if (el) el.style.display = (p === panel) ? '' : 'none';
    });
    if (panel === 'quiz') ecoRenderQuizHome();
    if (panel === 'lessons') { ecoLoadState(); ecoRenderLevelsHome(); }
  };

  /* ── Quiz data ── */
  var ECO_QUIZ = [
    {
      q: "Que signifie l'acronyme PIB ?",
      opts: ["Produit Interne Brut","Produit Intérieur Brut","Plan d'Investissement Bancaire","Prêt Immobilier Brut"],
      ans: 1,
      exp: "Le PIB (Produit Intérieur Brut) mesure la valeur totale des biens et services produits dans un pays sur une période donnée (généralement un trimestre ou une année). C'est l'indicateur de référence de la santé économique d'un pays."
    },
    {
      q: "Quelle institution fixe le taux directeur en zone euro ?",
      opts: ["Le FMI","La Banque de France","La Banque Centrale Européenne (BCE)","Le Parlement Européen"],
      ans: 2,
      exp: "La BCE (Banque Centrale Européenne) fixe les taux directeurs pour les 20 pays membres de la zone euro. Son mandat principal est la stabilité des prix avec une cible d'inflation à 2%. Elle se réunit toutes les 6 semaines pour décider de sa politique monétaire."
    },
    {
      q: "Qu'est-ce qu'une récession économique selon la définition officielle ?",
      opts: [
        "Un trimestre de PIB négatif",
        "Deux trimestres consécutifs de PIB négatif",
        "Un taux de chômage supérieur à 10%",
        "Une baisse de la bourse de plus de 20%"
      ],
      ans: 1,
      exp: "La définition technique d'une récession est deux trimestres consécutifs de croissance négative du PIB. Aux États-Unis, c'est le NBER (National Bureau of Economic Research) qui déclare officiellement les récessions en se basant sur plusieurs indicateurs, pas seulement le PIB."
    },
    {
      q: "Quelle est la cible d'inflation officielle de la Fed et de la BCE ?",
      opts: ["0%","1%","2%","3%"],
      ans: 2,
      exp: "Les deux grandes banques centrales ciblent une inflation de 2% — ni trop haute (risque de perte de pouvoir d'achat), ni trop basse (risque de déflation). Une inflation légèrement positive encourage la consommation et l'investissement, et offre une marge de manœuvre pour baisser les taux en cas de récession."
    },
    {
      q: "Qu'est-ce que le Quantitative Easing (QE) ?",
      opts: [
        "Une hausse du taux directeur pour contrôler l'inflation",
        "Un achat massif d'obligations par la banque centrale pour injecter des liquidités",
        "Un plan d'austérité budgétaire gouvernemental",
        "Un mécanisme de contrôle des changes"
      ],
      ans: 1,
      exp: "Le QE (assouplissement quantitatif) consiste pour la banque centrale à acheter massivement des obligations d'État et d'entreprises sur les marchés. Cela injecte des liquidités dans l'économie, fait baisser les taux longs et pousse les investisseurs vers des actifs plus risqués (actions, immobilier). La Fed a massivement utilisé le QE après 2008 et en 2020."
    },
    {
      q: "Qu'indique une inversion de la courbe des taux (2Y > 10Y) ?",
      opts: [
        "Une période de forte croissance à venir",
        "Un signal historiquement fiable de récession dans les 12-24 mois",
        "Que les banques gagnent plus d'argent qu'habituellement",
        "Que l'inflation va fortement baisser"
      ],
      ans: 1,
      exp: "L'inversion de la courbe des taux, quand les rendements à 2 ans dépassent ceux à 10 ans, a précédé les 8 dernières récessions américaines. Elle signale que les marchés anticipent une baisse des taux à terme (donc une récession probable). Ce n'est pas infaillible mais c'est l'un des indicateurs avancés les plus fiables."
    },
    {
      q: "Le NFP (Non-Farm Payrolls) est publié avec quelle fréquence ?",
      opts: ["Tous les jours","Toutes les semaines","Une fois par mois (1er vendredi)","Tous les trimestres"],
      ans: 2,
      exp: "Le rapport sur l'emploi américain (NFP) est publié le premier vendredi de chaque mois à 14h30 (heure de Paris). Il recense les créations d'emplois hors secteur agricole. C'est l'une des publications les plus attendues au monde — elle peut faire bouger le dollar et le S&P 500 de 1 à 2% en quelques minutes."
    },
    {
      q: "Qu'est-ce qu'une politique monétaire 'hawkish' ?",
      opts: [
        "Une politique accommodante avec des taux bas pour stimuler l'économie",
        "Une politique restrictive avec des hausses de taux pour lutter contre l'inflation",
        "Une politique de rachat d'actions par les entreprises",
        "Un plan de relance budgétaire gouvernemental"
      ],
      ans: 1,
      exp: "Une banque centrale est dite 'hawkish' (faucon) quand elle privilégie la lutte contre l'inflation en montant les taux, quitte à ralentir l'économie. À l'inverse, 'dovish' (colombe) signifie qu'elle favorise la stimulation de l'économie avec des taux bas. Ces termes sont essentiels pour interpréter les discours des banquiers centraux."
    },
    {
      q: "En phase d'expansion économique avec inflation croissante, quels actifs surperforment historiquement ?",
      opts: [
        "Obligations d'État longues et liquidités",
        "Actions défensives (santé, utilities)",
        "Matières premières, énergie et actions value",
        "Obligations indexées et fonds monétaires"
      ],
      ans: 2,
      exp: "En phase d'expansion avec inflation montante (pic du cycle), les matières premières (pétrole, métaux) et les secteurs exposés à l'inflation (énergie, mines) surperforment. C'est le principe de l'Investment Clock de Merrill Lynch. Les obligations longues souffrent car la hausse des taux fait baisser leur valeur."
    },
    {
      q: "Qu'est-ce que le PMI et que signifie un PMI supérieur à 50 ?",
      opts: [
        "Un indice boursier ; supérieur à 50 = marché haussier",
        "Un sondage auprès des directeurs d'achat ; supérieur à 50 = expansion du secteur",
        "Le ratio prix/bénéfice moyen du marché ; supérieur à 50 = surévaluation",
        "L'indice de confiance des consommateurs ; supérieur à 50 = optimisme"
      ],
      ans: 1,
      exp: "Le PMI (Purchasing Managers' Index) est un sondage mensuel auprès des directeurs d'achat d'entreprises. Au-dessus de 50 = expansion (les entreprises commandent plus, signalant une croissance à venir). En dessous de 50 = contraction. C'est un indicateur avancé précieux car il prédit la croissance économique 1 à 2 mois avant les chiffres officiels."
    }
  ];

  var ecoQuizState = { current:0, score:0, answered:false, done:false, order:[] };

  function ecoShuffle(arr) {
    var a = arr.slice();
    for (var i = a.length-1; i > 0; i--) { var j = Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; }
    return a;
  }

  /* ─── QUIZ PAR NIVEAU ─── */
  window.ecoRenderQuizHome = function() {
    var c = document.getElementById('eco-quiz-level-cards');
    if (!c) return;
    var html = '';
    ECO_LEVELS.forEach(function(lvl) {
      var allQ = []; lvl.lessons.forEach(function(l){ allQ = allQ.concat(l.quiz); });
      html += '<div onclick="ecoStartLevelQuiz(\''+lvl.id+'\')" style="padding:16px;background:var(--bg-card);border:1px solid '+lvl.colorBdr+';border-radius:10px;cursor:pointer;" onmouseover="this.style.background=\'var(--bg-hover)\'" onmouseout="this.style.background=\'var(--bg-card)\'">'
        + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;"><span style="font-size:20px;">'+lvl.icon+'</span><div style="font-size:12px;font-weight:700;color:'+lvl.color+';font-family:var(--mono);">'+lvl.label+'</div></div>'
        + '<div style="font-size:11px;color:var(--tx-muted);">'+allQ.length+' questions · '+lvl.desc+'</div></div>';
    });
    c.innerHTML = html;
  };

  window.ecoStartLevelQuiz = function(levelId) {
    var lvl = ECO_LEVELS.find(function(l){return l.id===levelId;}); if(!lvl) return;
    var allQ = []; lvl.lessons.forEach(function(l){allQ=allQ.concat(l.quiz);});
    ecoLvlQuizState = {levelId:levelId,current:0,score:0,answered:false,done:false,order:ecoShuffle(allQ.map(function(_,i){return i;})),questions:allQ};
    var lbl=document.getElementById('eco-quiz-level-label'); if(lbl) lbl.textContent=lvl.label;
    var home=document.getElementById('eco-quiz-home'); var play=document.getElementById('eco-quiz-playing');
    if(home)home.style.display='none'; if(play)play.style.display='';
    ecoRenderLevelQuiz();
  };

  window.ecoQuizBackToHome = function() {
    var home=document.getElementById('eco-quiz-home'); var play=document.getElementById('eco-quiz-playing');
    if(home)home.style.display=''; if(play)play.style.display='none';
    ecoRenderQuizHome();
  };

  var ecoLvlQuizState = {levelId:null,current:0,score:0,answered:false,done:false,order:[],questions:[]};

  window.ecoRenderLevelQuiz = function() {
    var c = document.getElementById('eco-quiz-container'); if (!c) return;
    var S = ecoLvlQuizState;
    var lvl = ECO_LEVELS.find(function(l){return l.id===S.levelId;})||ECO_LEVELS[0];
    if (S.done) {
      var pct = Math.round((S.score/S.questions.length)*100);
      var col = pct>=80?'var(--green)':pct>=50?'var(--yellow)':'var(--red)';
      var msg = pct>=80?'🎉 Expert '+lvl.label+' !':pct>=50?'👍 Bon niveau ! Relisez les leçons.':'📚 Continuez à vous former.';
      c.innerHTML = '<div style="text-align:center;padding:32px 20px;background:var(--bg-card);border:1px solid var(--br-soft);border-radius:12px;">'
        +'<div style="font-size:48px;font-family:var(--mono);font-weight:700;color:'+col+';margin-bottom:8px;">'+S.score+'/'+S.questions.length+'</div>'
        +'<div style="font-size:14px;font-weight:700;color:var(--tx-hi);margin-bottom:6px;">'+msg+'</div>'
        +'<div style="font-size:11px;color:var(--tx-muted);margin-bottom:24px;">Score : '+pct+'%</div>'
        +'<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">'
        +'<button onclick="ecoQuizReset()" style="font-family:var(--mono);font-size:11px;padding:8px 20px;border-radius:6px;border:1px solid '+lvl.color+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">🔄 Recommencer</button>'
        +'<button onclick="ecoQuizBackToHome()" style="font-family:var(--mono);font-size:11px;padding:8px 20px;border-radius:6px;border:1px solid var(--br-mid);background:transparent;color:var(--tx-mid);cursor:pointer;">← Choisir un niveau</button>'
        +'</div></div>';
      return;
    }
    var qi = S.order[S.current]; var q = S.questions[qi];
    var progressPct = Math.round((S.current/S.questions.length)*100);
    var html = '<div style="background:var(--bg-card);border:1px solid var(--br-soft);border-radius:12px;padding:20px;">'
      +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">'
      +'<span style="font-size:10px;font-family:var(--mono);color:var(--tx-faint);">Question '+(S.current+1)+' / '+S.questions.length+'</span>'
      +'<span style="font-size:10px;font-family:var(--mono);color:'+lvl.color+';">Score : '+S.score+'</span>'
      +'</div>'
      +'<div style="height:3px;background:var(--bg-input);border-radius:2px;margin-bottom:16px;"><div style="height:3px;width:'+progressPct+'%;background:'+lvl.color+';border-radius:2px;transition:width .3s;"></div></div>'
      +'<div style="font-size:13px;font-weight:700;color:var(--tx-hi);line-height:1.5;margin-bottom:16px;">'+q.q+'</div>'
      +'<div style="display:flex;flex-direction:column;gap:8px;" id="eco-quiz-opts">';
    q = window.quizShuffleOpts(q);
    window._sqCurrent = q; // shuffled q for answer function
    q.opts.forEach(function(opt, i) {
      html += '<button onclick="ecoQuizAnswer('+i+')" id="eco-opt-'+i+'" style="text-align:left;padding:10px 14px;border-radius:8px;border:1px solid var(--br-mid);background:var(--bg-raised);color:var(--tx-mid);cursor:pointer;font-size:11px;font-family:var(--sans);" onmouseover="if(!this.dataset.locked)this.style.borderColor=\''+lvl.color+'\'" onmouseout="if(!this.dataset.locked)this.style.borderColor=\'var(--br-mid)\'"><span style="font-family:var(--mono);font-weight:700;color:var(--tx-faint);margin-right:8px;">'+String.fromCharCode(65+i)+'.</span>'+opt+'</button>';
    });
    html += '</div><div id="eco-quiz-feedback" style="margin-top:12px;"></div></div>';
    c.innerHTML = html;
  };

  window.ecoQuizAnswer = function(idx) {
    var S = ecoLvlQuizState; if (S.answered) return; S.answered = true;
    var lvl = ECO_LEVELS.find(function(l){return l.id===S.levelId;})||ECO_LEVELS[0];
    var qi = S.order[S.current]; var q = S.questions[qi];
    var correct = (idx === q.ans); if (correct) S.score++;
    q.opts.forEach(function(_, i) {
      var btn = document.getElementById('eco-opt-'+i); if (!btn) return;
      btn.dataset.locked='1'; btn.style.cursor='default';
      if (i===q.ans){btn.style.borderColor='var(--green)';btn.style.background='var(--green-bg)';btn.style.color='var(--green)';}
      else if (i===idx&&!correct){btn.style.borderColor='var(--red)';btn.style.background='var(--red-bg)';btn.style.color='var(--red)';}
    });
    var fb = document.getElementById('eco-quiz-feedback');
    if (fb) fb.innerHTML = '<div style="padding:10px 14px;background:'+(correct?'var(--green-bg)':'var(--red-bg)')+';border:1px solid '+(correct?'var(--green-bdr)':'var(--red-bdr)')+';border-radius:8px;margin-bottom:10px;">'
      +'<div style="font-size:12px;font-weight:700;color:'+(correct?'var(--green)':'var(--red)')+';margin-bottom:4px;">'+(correct?'✅ Correct !':'❌ Pas tout à fait…')+'</div>'
      +'<div style="font-size:11px;color:var(--tx-mid);line-height:1.6;">'+q.exp+'</div></div>'
      +'<button onclick="ecoQuizNext()" style="width:100%;font-family:var(--mono);font-size:11px;padding:9px;border-radius:6px;border:1px solid '+lvl.color+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">'
      +(S.current+1<S.questions.length?'Question suivante →':'Voir mon score 🏁')+'</button>';
  };

  window.ecoQuizNext = function() {
    var S = ecoLvlQuizState; S.current++; S.answered=false;
    if (S.current>=S.questions.length) S.done=true;
    ecoRenderLevelQuiz();
  };

  window.ecoQuizReset = function() {
    var S = ecoLvlQuizState; S.current=0; S.score=0; S.answered=false; S.done=false;
    S.order = ecoShuffle(S.questions.map(function(_,i){return i;}));
    ecoRenderLevelQuiz();
  };

  window.ecoGuideInit = function() {
    ecoQuizState = { current:0, score:0, answered:false, done:false, order:[] };
    var bar = document.getElementById('eco-tab-bar');
    if (bar) {
      bar.querySelectorAll('.eco-tb').forEach(function(b) {
        b.style.background = 'var(--bg-card)';
        b.style.color      = 'var(--tx-mid)';
        b.style.border     = '1px solid var(--br-mid)';
        b.style.fontWeight = '';
      });
      var first = bar.querySelector('.eco-tb');
      if (first) { first.style.background='var(--blue)'; first.style.color='#fff'; first.style.border='1px solid var(--blue)'; first.style.fontWeight='700'; }
    }
    ['concepts','indicateurs','banques','cycles','erreurs','lessons','quiz'].forEach(function(p) {
      var el = document.getElementById('eco-panel-'+p);
      if (el) el.style.display = (p==='concepts') ? '' : 'none';
    });
  };


/* ─────────────────────────────────────────────────────────
   ACADÉMIE ÉCONOMIE — Données des leçons & Moteur JS
   ───────────────────────────────────────────────────────── */

var ECO_LEVELS = [
  {
    id: 'eco-debutant',
    label: 'Débutant',
    icon: '🟢',
    color: 'var(--green)',
    colorBg: 'var(--green-bg)',
    colorBdr: 'var(--green-bdr)',
    desc: 'PIB, inflation, taux — les fondamentaux économiques',
    xpPerLesson: 20,
    lessons: [
      {
        id: 'eco-deb-1',
        title: 'PIB & Croissance Économique',
        emoji: '📊',
        duration: '5 min',
        content: [
          { type: 'intro', text: "Le PIB (Produit Intérieur Brut) est la mesure la plus utilisée de la santé économique d'un pays. Pour un investisseur, savoir interpréter le PIB et ses composantes permet d'anticiper les mouvements de marché bien avant les communiqués officiels." },
          { type: 'point', icon: '📐', title: 'Définition & calcul', text: "Le PIB mesure la valeur totale des biens et services produits dans un pays sur une période. Formule : PIB = Consommation + Investissement + Dépenses gouvernementales + (Exportations − Importations). La consommation des ménages représente ~70% du PIB aux États-Unis — un indicateur central." },
          { type: 'point', icon: '🚦', title: 'Lecture pratique pour un investisseur', text: "PIB > 2% → expansion économique, favorable aux actions et actifs risqués. PIB 0-2% → croissance molle, incertitude, rotation sectorielle. PIB < 0% deux trimestres consécutifs → récession officielle → valeurs défensives, or, obligations d'État." },
          { type: 'point', icon: '⚡', title: 'Indicateurs avancés du PIB', text: "Le PIB est un indicateur RETARDÉ — il confirme ce qui s'est passé. Les marchés l'anticipent via des indicateurs avancés : PMI manufacturier (sondage directeurs achat), emploi ADP, ventes au détail, confiance consommateurs. Ces données bougent les marchés AVANT le PIB officiel." },
          { type: 'example', label: 'Exemple concret', text: "En 2022 : deux trimestres négatifs (T1 : -1.6%, T2 : -0.6%) → récession technique aux US. Pourtant l'emploi restait fort. Le NBER n'a pas déclaré de récession officielle. Les marchés avaient baissé 6 mois AVANT ces chiffres — ils avaient déjà anticipé le ralentissement via les PMI et la courbe des taux." },
          { type: 'key', text: "💡 Ne tradez pas sur la publication du PIB — les marchés l'ont déjà intégré. Tradez sur les indicateurs avancés (PMI, emploi, confiance) qui arrivent bien avant. Le PIB, c'est le rétroviseur. Les PMI, c'est le pare-brise." }
        ],
        quiz: [
          { q: "Quelle est la définition officielle d'une récession ?", opts: ["Un trimestre de PIB négatif", "Deux trimestres consécutifs de PIB négatif", "Un taux de chômage > 10%", "Une baisse du marché actions > 20%"], ans: 1, exp: "La définition technique universelle d'une récession est deux trimestres consécutifs de croissance négative du PIB. Aux États-Unis cependant, c'est le NBER qui déclare officiellement les récessions, en se basant sur plusieurs indicateurs (emploi, revenus, production industrielle) et non seulement sur le PIB." },
          { q: "Quelle composante représente environ 70% du PIB américain ?", opts: ["Les dépenses gouvernementales", "Les exportations nettes", "La consommation des ménages", "L'investissement des entreprises"], ans: 2, exp: "La consommation privée des ménages représente environ 70% du PIB américain — c'est pourquoi les données de ventes au détail, de confiance consommateurs et d'emploi sont si cruciales. Un consommateur américain qui dépense moins peut provoquer une récession à lui seul. C'est ce qui rend le marché de l'emploi si suivi par la Fed." },
          { q: "Pourquoi le PIB est-il qualifié d'indicateur 'retardé' ?", opts: ["Parce qu'il est publié avec 1 mois de retard", "Parce qu'il confirme ce qui s'est passé — les marchés l'ont déjà anticipé", "Parce que sa méthode de calcul date des années 1950", "Parce que les banques centrales ne le regardent pas"], ans: 1, exp: "Le PIB est publié avec 30 à 90 jours de retard sur la période mesurée. Les marchés financiers anticipent l'évolution économique 6 à 18 mois à l'avance. Quand le PIB annonce une récession, les marchés ont souvent déjà baissé et commencent parfois à remonter. C'est pourquoi il faut suivre les indicateurs avancés (PMI, emploi, courbe des taux)." }
        ]
      },
      {
        id: 'eco-deb-2',
        title: "L'Inflation — Mesure, Causes & Impact Marchés",
        emoji: '📉',
        duration: '6 min',
        content: [
          { type: 'intro', text: "L'inflation est l'une des variables les plus importantes pour un investisseur — elle détermine la politique des banques centrales, le coût du crédit, la valeur des obligations et la performance relative des classes d'actifs. Comprendre ses mécanismes est indispensable." },
          { type: 'point', icon: '📏', title: 'CPI vs PCE — Les deux mesures clés', text: "CPI (Indice des Prix à la Consommation) : publié par le BLS, le plus médiatisé. PCE (Personal Consumption Expenditures) : la mesure officielle que la Fed utilise pour sa cible de 2%. Le PCE Core (hors alimentation et énergie) est l'indicateur de référence pour les décisions de taux. CPI tend à être légèrement supérieur au PCE." },
          { type: 'point', icon: '🔄', title: 'Types d\'inflation', text: "Inflation par la demande (demand-pull) : trop de monnaie chase trop peu de biens — économie surchauffe. Inflation par les coûts (cost-push) : hausse des prix des intrants (pétrole, matières premières, salaires) → entreprises répercutent. Inflation importée : dévaluation monétaire renchérit les importations. Chaque type a des implications différentes pour la politique monétaire." },
          { type: 'point', icon: '📈', title: 'Impact sur les classes d\'actifs', text: "Inflation élevée → bonne pour : or, matières premières, immobilier, actions value, TIPS. Inflation élevée → mauvaise pour : obligations longues (taux réels négatifs), actions croissance tech (actualisation des flux futurs), liquidités. C'est la rotation sectorielle la plus classique lors d'un régime inflationniste." },
          { type: 'point', icon: '⚠️', title: 'La surprise vs le chiffre absolu', text: "Ce qui compte sur les marchés, c'est la SURPRISE par rapport au consensus. Un CPI de 3.5% est haussier si le consensus était 4%, et baissier si le consensus était 3%. Consultez toujours le consensus Bloomberg/Reuters AVANT la publication pour évaluer la réaction probable du marché." },
          { type: 'example', label: 'Le cycle inflationniste 2021-2023', text: "2021 : inflation commence à monter, Fed dit que c'est 'transitoire'. 2022 : inflation atteint 9.1% (40 ans de record), Fed monte les taux de 0% à 5.5% en 18 mois — la plus rapide hausse depuis les années 80. Conséquence : S&P 500 -19%, obligations longues -30%, immobilier commence à corriger. 2023-2024 : désinflation progressive, Fed commence à baisser les taux." },
          { type: 'key', text: "💡 Règle pratique : 'Inflation > objectif banque centrale → taux montent → croissance ralentit → marché corrige'. Ce cycle prend 12 à 24 mois à se jouer pleinement. En 2022, ceux qui ont compris ce mécanisme en janvier ont évité une correction de -20% sur le S&P 500." }
        ],
        quiz: [
          { q: "Quelle mesure d'inflation la Fed utilise-t-elle comme référence officielle pour sa cible de 2% ?", opts: ["CPI total (tous articles)", "CPI Core (hors énergie/alimentaire)", "PCE Core (Personal Consumption Expenditures hors alimentaire/énergie)", "PPI (indice des prix à la production)"], ans: 2, exp: "La Fed utilise le PCE Core comme référence officielle pour sa cible de 2%. Le PCE Core exclut alimentation et énergie (très volatiles) et reflète mieux les tendances de fond. Il tend à être légèrement inférieur au CPI car sa méthode de calcul permet des substitutions entre produits. Les marchés suivent le CPI car il est publié en premier, mais la Fed se base sur le PCE." },
          { q: "Un CPI publié à 3.8% alors que le consensus attendait 4.2% — quelle sera probablement la réaction du marché actions ?", opts: ["Forte baisse — l'inflation est encore trop élevée", "Hausse — la surprise est positive (inflation < attendue)", "Aucune réaction — ce n'est pas le chiffre qui compte", "Baisse — toute inflation > 2% est mauvaise"], ans: 1, exp: "Sur les marchés financiers, ce qui compte est la SURPRISE par rapport au consensus, pas le chiffre absolu. Un CPI à 3.8% vs consensus 4.2% = surprise négative sur l'inflation (meilleure que prévu) → moins de pression sur la Fed pour monter les taux → favorable aux actions et obligations. C'est ce mécanisme qui explique les fortes réactions de marché aux publications macro." },
          { q: "En période de forte inflation, quels actifs surperforment historiquement ?", opts: ["Obligations longues et actions tech à forte croissance", "Or, matières premières, immobilier et actions value", "Liquidités et fonds monétaires", "Actions défensives (santé, utilities)"], ans: 1, exp: "En régime inflationniste, les actifs 'réels' (ancrés dans l'économie physique) surperforment : l'or (valeur refuge), les matières premières (leur prix cause l'inflation), l'immobilier (actif réel avec loyers indexables), les actions value (entreprises avec pricing power). Les obligations longues souffrent car la hausse des taux fait baisser leur valeur de marché." }
        ]
      },
      {
        id: 'eco-deb-3',
        title: "Les Taux d'Intérêt — Levier des Banques Centrales",
        emoji: '🏛️',
        duration: '6 min',
        content: [
          { type: 'intro', text: "Le taux directeur est l'outil le plus puissant d'une banque centrale. Il influence littéralement TOUT : crédit immobilier, emprunt des entreprises, cours des obligations, attractivité des actions, valeur des devises. Comprendre comment les taux fonctionnent est la base de tout investisseur." },
          { type: 'point', icon: '⬆️', title: 'Hausse des taux — Mécanisme complet', text: "Banque centrale monte les taux → crédit plus cher pour les ménages et entreprises → consommation et investissement ralentissent → inflation refroidit. Mais aussi : obligations existantes perdent de la valeur (taux inversement liés aux prix oblig.), actions de croissance corrigent (actualisation des bénéfices futurs à taux plus élevé), immobilier ralentit (prêts plus chers)." },
          { type: 'point', icon: '⬇️', title: 'Baisse des taux — Mécanisme complet', text: "Banque centrale baisse les taux → crédit moins cher → consommation et investissement repartent → croissance relancée. Également : obligations montent (corrélation inverse), actions de croissance rebondissent, dollar peut se déprécier (attirer moins de capitaux), or et commodities rebondissent. C'est le cycle 'risk-on'." },
          { type: 'point', icon: '📐', title: 'La Courbe des Taux — Signal de récession', text: "La courbe des taux trace les rendements obligataires selon leur maturité. Normale : taux long > taux court (prime d'incertitude). Inversée (2Y > 10Y) : signal de récession dans 12-24 mois — a précédé les 8 dernières récessions américaines. Le spread 2Y-10Y est suivi quotidiennement par les traders macro." },
          { type: 'point', icon: '💱', title: 'Taux & Devises : le carry trade', text: "Des taux élevés dans un pays attirent les capitaux étrangers (meilleur rendement) → la devise s'apprécie. Le carry trade consiste à emprunter dans une devise à taux bas (JPY, CHF) et investir dans une devise à taux haut (USD, AUD). Ce mécanisme peut déplacer les devises massivement lors des cycles de taux." },
          { type: 'example', label: 'Cycle de taux Fed 2022-2024', text: "Mars 2022 : taux Fed = 0%. Juin 2023 : taux Fed = 5.5% (+550 bps en 15 mois). Impact : S&P 500 -19%, NASDAQ -33%, obligations longues TLT -40%, immobilier américain -10%. Juillet 2023 → : marché anticipe le pivot → actions rebondissent +30% avant même la première baisse de taux (septembre 2024). La leçon : les marchés anticipent les taux, pas l'inverse." },
          { type: 'key', text: "💡 'Don't fight the Fed' est l'adage le plus important en bourse. Quand la Fed monte les taux agressivement, réduire le risque. Quand elle signale des baisses, augmenter l'exposition aux actions. Les marchés anticipent de 6 à 12 mois les décisions de taux — lisez les dot plots et discours des banquiers centraux." }
        ],
        quiz: [
          { q: "Quelle est la relation entre les prix des obligations existantes et la hausse des taux directeurs ?", opts: ["Les prix montent — les obligations deviennent plus attractives", "Les prix baissent — corrélation inverse entre taux et prix obligataires", "Aucun impact — les prix sont fixés à l'émission", "Les prix augmentent uniquement pour les obligations d'État"], ans: 1, exp: "Les prix des obligations et les taux d'intérêt évoluent dans des directions opposées (corrélation inverse). Si les taux montent, les nouvelles obligations émises offrent un rendement plus élevé → les obligations existantes avec un coupon plus bas deviennent moins attractives → leur prix de marché baisse. C'est pourquoi les ETF obligataires comme TLT ont perdu 40% lors de la hausse des taux en 2022." },
          { q: "Qu'est-ce qu'une courbe des taux inversée (2Y > 10Y) signale historiquement ?", opts: ["Une période de forte croissance imminente", "Une récession probable dans les 12-24 mois — a précédé les 8 dernières récessions US", "Que les banques sont en excellente santé", "Que l'inflation va fortement baisser"], ans: 1, exp: "L'inversion de la courbe des taux (rendement 2 ans > rendement 10 ans) est l'indicateur avancé de récession le plus fiable de l'histoire. Elle a précédé les 8 dernières récessions américaines avec un délai de 12 à 24 mois. Elle signale que les marchés anticipent une baisse des taux à terme (donc une dégradation économique) et un risque à court terme plus élevé que le risque à long terme." },
          { q: "En quoi consiste le 'carry trade' sur les marchés des changes ?", opts: ["Acheter des actions d'entreprises à fort rendement dividende", "Emprunter dans une devise à taux bas et investir dans une devise à taux élevé", "Diversifier son portefeuille dans plusieurs devises", "Spéculer sur la baisse d'une devise via des options"], ans: 1, exp: "Le carry trade exploite les différentiels de taux entre pays. Exemple classique : emprunter en JPY (taux proches de 0%) et investir en USD (taux à 5%) → profit de ~5% par an hors variation de change. Ce mécanisme attire massivement des capitaux vers les devises à haut taux, les appréciant. Le dénouement brutal d'un carry trade massif (comme en août 2024 sur le JPY) peut provoquer des krachs éclair." }
        ]
      }
    ]
  },
  {
    id: 'eco-intermediaire',
    label: 'Intermédiaire',
    icon: '🟡',
    color: 'var(--yellow)',
    colorBg: 'var(--yellow-bg)',
    colorBdr: 'var(--yellow-bdr)',
    desc: 'Banques centrales, cycles économiques, indicateurs avancés',
    xpPerLesson: 35,
    lessons: [
      {
        id: 'eco-int-1',
        title: 'Fed & BCE — Comprendre les Banques Centrales',
        emoji: '🏦',
        duration: '8 min',
        content: [
          { type: 'intro', text: "La Fed et la BCE sont les deux institutions les plus puissantes des marchés financiers. Chaque discours, chaque communiqué, chaque 'dot plot' peut déplacer les marchés mondiaux de 2 à 3% en quelques minutes. Comprendre leurs mandats, outils et modes de communication est essentiel." },
          { type: 'point', icon: '🇺🇸', title: 'La Fed — Double mandat', text: "La Réserve Fédérale américaine a un double mandat : stabilité des prix (inflation cible 2% PCE Core) ET plein emploi (objectif 'maximum employment'). Ce double mandat crée parfois des tensions : une inflation élevée avec un emploi fort oblige la Fed à choisir entre refroidir l'économie ou laisser l'inflation grimper." },
          { type: 'point', icon: '🇪🇺', title: 'La BCE — Mandat unique', text: "La BCE a un mandat unique : stabilité des prix à 2%. Pas d'objectif d'emploi explicite. Cela la rend théoriquement plus orthodoxe et moins réactive aux chocs économiques. Elle gère 20 économies très différentes (Allemagne vs Grèce), ce qui complique ses décisions. Réunion tous les 6 semaines, publie un communiqué et une conférence de presse." },
          { type: 'point', icon: '🗂️', title: 'Les outils de politique monétaire', text: "1) Taux directeur : l'outil principal. 2) QE (Quantitative Easing) : achat massif d'obligations — injecte des liquidités, fait baisser les taux longs. 3) QT (Quantitative Tightening) : vente d'obligations — retire des liquidités. 4) Forward Guidance : communication sur les intentions futures — un outil puissant pour influencer les anticipations." },
          { type: 'point', icon: '🎯', title: 'Le Dot Plot — Carte au trésor des traders', text: "4 fois par an, la Fed publie le 'dot plot' : chaque membre du FOMC place un point sur un graphique indiquant où il pense que les taux seront dans 1, 2 et 3 ans. La médiane des dots donne la 'trajectoire officielle'. Les traders comparent le dot plot du marché (contrats futures Fed) avec le dot plot officiel pour trouver les discordances et trader le biais." },
          { type: 'example', label: 'Lire un discours de banquier central', text: "Termes hawkish (haussiers pour les taux) : 'persistent inflation', 'labor market remains tight', 'higher for longer', 'not yet confident'. Termes dovish (baissiers pour les taux) : 'inflation making progress', 'two-sided risks', 'data dependent', 'appropriate to reduce restraint'. Un seul mot peut changer de l'un à l'autre et bouger les marchés de 1%." },
          { type: 'key', text: "💡 Ressources indispensables : fed.gov/monetarypolicy → FOMC calendar (dates réunions). Outil FedWatch de CME Group (probabilités de taux en temps réel). FRED (Federal Reserve Economic Data) pour tous les graphiques macro. Ce sont les mêmes outils qu'utilisent les traders institutionnels." }
        ],
        quiz: [
          { q: "Quel est le double mandat de la Réserve Fédérale américaine ?", opts: ["Croissance économique et balance commerciale", "Stabilité des prix (2% inflation) ET plein emploi", "Stabilité financière et contrôle de la dette publique", "Stabilité des prix uniquement, comme la BCE"], ans: 1, exp: "Le double mandat de la Fed, défini par le Humphrey-Hawkins Act de 1978, est : 1) stabilité des prix (cible d'inflation de 2% mesurée par le PCE Core) et 2) plein emploi maximum. Ce double mandat crée parfois des conflits : en 2022, l'inflation forte obligeait à monter les taux alors que certains craignaient l'impact sur l'emploi." },
          { q: "Qu'est-ce que le 'dot plot' de la Fed ?", opts: ["Un graphique des prix des obligations d'État", "La projection de taux de chaque membre du FOMC pour les prochaines années", "L'indice de volatilité des marchés financiers", "Le plan d'achats d'obligations dans le cadre du QE"], ans: 1, exp: "Le dot plot (ou 'Summary of Economic Projections') est publié 4 fois par an. Chaque membre du FOMC y indique anonymement où il pense que les taux directeurs devraient être à 1, 2 et 3 ans. La médiane des projections est suivie de près comme signal de la trajectoire future des taux. Les traders comparent les futures fed funds avec les dots pour déceler les décalages à trader." },
          { q: "Qu'est-ce que le QE (Quantitative Easing) et quel est son effet principal ?", opts: ["Une hausse des taux directeurs pour lutter contre l'inflation", "Un achat massif d'obligations par la banque centrale qui injecte des liquidités et fait baisser les taux longs", "Une vente d'obligations pour retirer les liquidités en excès", "Un programme de garantie des dépôts bancaires"], ans: 1, exp: "Le QE (assouplissement quantitatif) consiste pour la banque centrale à acheter massivement des titres (obligations d'État, MBS) sur les marchés secondaires. Cela injecte de la monnaie centrale dans le système financier, fait baisser les taux à long terme, réduit les spreads de crédit et pousse les investisseurs vers des actifs plus risqués (effet de portefeuille). La Fed a utilisé le QE après 2008 (bilans >8 000Mds$)." }
        ]
      },
      {
        id: 'eco-int-2',
        title: 'Cycles Économiques & Allocation d\'Actifs',
        emoji: '🔄',
        duration: '8 min',
        content: [
          { type: 'intro', text: "L'économie suit des cycles réguliers de croissance et de contraction. Identifier la phase du cycle dans laquelle nous nous trouvons est l'une des compétences les plus précieuses pour un investisseur : chaque phase favorise certains actifs et en pénalise d'autres." },
          { type: 'point', icon: '🌱', title: 'Phase 1 — Reprise / Recovery', text: "Caractéristiques : PIB négatif ou proche de 0%, chômage élevé, inflation basse, banque centrale baisse les taux. Actifs gagnants : obligations (taux baissent = prix montent), actions cycliques et petites capitalisations commencent à rebondir, immobilier. C'est souvent le meilleur moment pour entrer en bourse." },
          { type: 'point', icon: '🚀', title: 'Phase 2 — Expansion', text: "Caractéristiques : PIB fort (+2% à +4%), chômage baisse, confiance des consommateurs haute, inflation modérée. Actifs gagnants : actions toutes catégories, matières premières commencent à monter (demande forte). La bourse performe le mieux durant cette phase. C'est la phase la plus longue du cycle (peut durer des années)." },
          { type: 'point', icon: '🌡️', title: 'Phase 3 — Pic / Inflation', text: "Caractéristiques : croissance au maximum, inflation élevée, banque centrale monte les taux agressivement. Actifs gagnants : matières premières et énergie (inflation = bonne pour les réels), actions value et secteur financier. Actifs à éviter : actions tech/croissance (taux élevés pèsent sur l'actualisation), obligations longues." },
          { type: 'point', icon: '❄️', title: 'Phase 4 — Récession', text: "Caractéristiques : PIB négatif, chômage monte, inflation commence à baisser, banque centrale va baisser les taux. Actifs gagnants : obligations d'État (taux vont baisser = prix vont monter), or, secteurs défensifs (santé, utilities, biens de conso courante). Actifs à éviter : cycliques (auto, luxe, banques), matières premières industrielles." },
          { type: 'example', label: 'Investment Clock de Merrill Lynch', text: "Ce modèle historique classe 4 phases du cycle avec leurs actifs gagnants : 1) Reflation (sortie récession) → obligations & actions. 2) Recovery (expansion) → actions dominent. 3) Overheat (surchauffe) → matières premières. 4) Stagflation (récession + inflation) → cash et défensifs. Les transitions prennent 12-24 mois et les marchés les anticipent de 6-12 mois." },
          { type: 'key', text: "💡 En pratique : positionnez-vous 6 à 12 mois AVANT la phase attendue. Si les indicateurs avancés (PMI, courbe des taux, credit spreads) signalent une récession → commencer à réduire les cycliques et augmenter les défensifs. Ne pas attendre la confirmation officielle — elle arrivera quand les marchés auront déjà bougé." }
        ],
        quiz: [
          { q: "En phase de récession économique, quels actifs surperforment historiquement ?", opts: ["Actions cycliques (auto, luxe, banques) et matières premières", "Obligations d'État, or et secteurs défensifs (santé, utilities)", "Crypto-monnaies et petites capitalisations", "Actions technologiques à forte croissance"], ans: 1, exp: "En récession, les banques centrales baissent les taux → les obligations d'État montent. L'or est une valeur refuge. Les secteurs défensifs (santé, utilities, biens de conso courante) résistent car leur demande est inélastique — les gens continuent de payer leurs factures et d'acheter des médicaments même en crise. Les cycliques (qui dépendent de la confiance consommateur) souffrent le plus." },
          { q: "À quel moment du cycle économique les matières premières (pétrole, cuivre) surperforment-elles le mieux ?", opts: ["En phase de reprise — quand les banques centrales baissent les taux", "En phase d'expansion avec inflation montante (pic du cycle)", "En phase de récession — les investisseurs cherchent des actifs réels", "Les matières premières performent également dans toutes les phases"], ans: 1, exp: "Les matières premières surperforment en phase de pic du cycle (phase 3 selon Merrill Lynch) : l'économie tourne à pleine capacité, la demande est maximale, les stocks sont bas, et l'inflation monte. C'est la phase de 'surchauffe' où énergie, métaux et agricoles brillent. En récession, la demande industrielle chute et les commodities corrigent souvent fortement." },
          { q: "Pourquoi faut-il investir en anticipation du cycle plutôt qu'en réaction ?", opts: ["Pour éviter la fiscalité sur les plus-values à court terme", "Parce que les marchés anticipent les phases de 6 à 12 mois avant les données officielles", "Parce que les données officielles sont souvent falsifiées", "Pour bénéficier des effets de levier en début de cycle"], ans: 1, exp: "Les marchés financiers sont des mécanismes d'anticipation. Les investisseurs institutionnels ajustent leurs portefeuilles sur la base des indicateurs avancés (PMI, courbe des taux, credit spreads), des prévisions des banques centrales et des données de haute fréquence — bien avant que les statistiques officielles du PIB ou de l'emploi ne confirment le retournement. Agir sur les données officielles revient à acheter quand tout le monde a déjà acheté." }
        ]
      },
      {
        id: 'eco-int-3',
        title: 'Indicateurs Avancés — Le Calendrier Économique',
        emoji: '📅',
        duration: '7 min',
        content: [
          { type: 'intro', text: "Les indicateurs économiques sont les 'données' qui font bouger les marchés. Chaque publication peut provoquer une volatilité de 0.5 à 2% sur les indices en quelques secondes. Savoir quoi regarder, quand, et comment interpréter les surprises est une compétence technique fondamentale." },
          { type: 'point', icon: '💼', title: 'NFP — Non-Farm Payrolls (1er vendredi, 14h30)', text: "La publication la plus attendue au monde. Recense les créations d'emplois non-agricoles aux États-Unis. Au-dessus du consensus = économie forte = dollar monte, taux montent, actions mixtes. En dessous = économie faible = Fed peut baisser les taux = dollar baisse, actions montent. Volatilité immédiate sur EUR/USD, S&P 500, taux 10 ans." },
          { type: 'point', icon: '🛒', title: 'CPI — Inflation (2ème ou 3ème mercredi, 14h30)', text: "L'indicateur d'inflation le plus suivi. CPI au-dessus du consensus = surprise inflationniste = Fed va maintenir des taux élevés = dollar monte, obligations baissent, tech corrige. Surtout regarder : CPI Core (hors alim/énergie), CPI Services (le plus tenace dans le cycle inflationniste actuel)." },
          { type: 'point', icon: '🏭', title: 'PMI — Indicateur avancé mensuel', text: "Publié le 1er jour ouvré du mois pour le manufacturier, mi-mois pour la composition. PMI > 50 = expansion. PMI < 50 = contraction. Indicateur AVANCÉ (sondage directeurs achat) — prédit le PIB 1-2 mois avant. PMI Chine (Caixin) : impact immédiat sur commodités. PMI US (ISM) : impact sur S&P 500 et dollar." },
          { type: 'point', icon: '🏠', title: 'Données immobilières US — Signal conjoncturel', text: "Ventes de logements existants, mises en chantier, permis de construire. L'immobilier est très sensible aux taux (prêts 30 ans). Ralentissement immobilier = signal précoce de ralentissement économique. En 2022, l'immobilier a été le premier secteur à plonger après les hausses de taux de la Fed." },
          { type: 'example', label: 'Utiliser le calendrier économique', text: "Outil pratique : Investing.com/economic-calendar ou Forex Factory. Filtrer sur 'Impact élevé' (3 flammes 🔥). Avant chaque publication : notez le consensus. Pendant : regardez la différence chiffre réel vs consensus. Après : analysez les réactions du DXY (dollar), du 10Y US (taux) et du S&P 500 futures. Ces 3 réactions simultanées racontent une histoire cohérente." },
          { type: 'key', text: "💡 Les 5 publications qui bougent le plus les marchés (par ordre d'impact) : 1) FOMC + conférence de presse Fed. 2) NFP (emploi américain). 3) CPI américain. 4) PMI ISM US manufacturier. 5) PIB américain (révision). Connaître leur date à l'avance permet de gérer son risque (réduire la taille des positions avant, élargir les stops)." }
        ],
        quiz: [
          { q: "Quand est publié le rapport NFP (Non-Farm Payrolls) américain ?", opts: ["Tous les jours à 14h30", "Le premier vendredi de chaque mois à 14h30 heure de Paris", "Le premier lundi de chaque mois", "Chaque trimestre, en même temps que le PIB"], ans: 1, exp: "Le rapport sur l'emploi américain (NFP) est publié le premier vendredi de chaque mois à 14h30 heure de Paris (8h30 ET). Il mesure les créations d'emplois hors secteur agricole et contient aussi le taux de chômage et la croissance des salaires horaires. C'est la publication mensuelle qui génère le plus de volatilité sur les marchés — dollar, taux, S&P 500 réagissent en quelques secondes." },
          { q: "Un PMI manufacturier US publié à 52.3 alors que le consensus attendait 48.5 — quelle est l'interprétation ?", opts: ["Signal négatif — le PMI est inférieur à 55, donc l'économie ralentit", "Signal très positif — forte surprise haussière, le secteur est en expansion (>50) ET au-dessus des attentes", "Signal neutre — les PMI n'ont pas d'impact sur les marchés", "Signal négatif — toute lecture inférieure à 60 indique une contraction"], ans: 1, exp: "Double signal positif : 1) PMI > 50 = secteur manufacturier en expansion (les directeurs d'achat commandent plus). 2) Forte surprise vs consensus 48.5 → les marchés attendaient une contraction, l'économie est plus robuste. Réaction probable : dollar monte, taux longs montent légèrement, S&P 500 monte. Ce type de surprise positive dans une phase de reprise est généralement bullish pour les actions." },
          { q: "Pourquoi les données immobilières américaines sont-elles un signal avancé utile pour les investisseurs ?", opts: ["Parce que l'immobilier représente 50% du PIB américain", "Parce que l'immobilier est très sensible aux taux — son ralentissement prédit souvent celui de l'économie globale", "Parce que la Fed prend ses décisions basées uniquement sur le marché immobilier", "Parce que les données immobilières ne sont jamais révisées"], ans: 1, exp: "L'immobilier est l'un des secteurs les plus sensibles aux taux d'intérêt (les prêts 30 ans sont directement indexés sur les rendements obligataires longs). Un ralentissement immobilier pré-annonce généralement un ralentissement de la consommation (effet richesse négatif) et de la construction. En 2006-2007, l'immobilier s'est retourné 12-18 mois avant la récession de 2008 — un signal que peu avaient écouté." }
        ]
      }
    ]
  },
  {
    id: 'eco-avance',
    label: 'Avancé',
    icon: '🔴',
    color: 'var(--blue)',
    colorBg: 'var(--blue-bg)',
    colorBdr: 'var(--blue-bdr)',
    desc: 'Macro avancée : carry trade, politique budgétaire, corrélations',
    xpPerLesson: 50,
    lessons: [
      {
        id: 'eco-adv-1',
        title: "Dollar, DXY & Marchés Mondiaux — La Devise de Réserve",
        emoji: '💵',
        duration: '8 min',
        content: [
          { type: 'intro', text: "Le dollar américain est la devise de réserve mondiale — 60% des réserves de change mondiales, 80% du commerce international. Sa force ou faiblesse se répercute sur TOUS les marchés : matières premières, dettes émergentes, actions mondiales, or. Maîtriser le DXY est incontournable." },
          { type: 'point', icon: '📊', title: 'Le DXY — Panier de 6 devises', text: "L'indice DXY mesure la valeur du dollar contre un panier de 6 devises : EUR (57.6%), JPY (13.6%), GBP (11.9%), CAD (9.1%), SEK (4.2%), CHF (3.6%). Dominé par l'euro, il reflète surtout la force relative USD/EUR. DXY > 100 = dollar fort. DXY < 95 = dollar faible historiquement." },
          { type: 'point', icon: '⬇️', title: 'Dollar fort — Impact global', text: "Dollar fort → matières premières baissent (libellées en USD, plus chères pour les non-américains). Dettes émergentes en USD deviennent plus lourdes → crise de la dette émergente possible. Or baisse (corrélation inverse robuste). Actions émergentes souffrent (capitaux rapatriés aux US). Les profits des multinationales US en devises étrangères valent moins en dollars." },
          { type: 'point', icon: '⬆️', title: 'Dollar faible — Impact global', text: "Dollar faible → matières premières montent. Or monte (corrélation inverse). Marchés émergents rebondissent (dettes USD moins lourdes, capitaux cherchent rendement). Les profits des multinationales US se gonflent en dollars (translation effect). Les exportations américaines deviennent plus compétitives. Globalement bullish pour les actifs risqués mondiaux." },
          { type: 'point', icon: '🌍', title: 'Le Système de Bretton Woods à aujourd\'hui', text: "Depuis 1971 (fin de l'étalon-or Nixon), le dollar flotte librement. Son statut de 'monnaie de réserve' lui confère un 'exorbitant privilege' : les États-Unis peuvent s'endetter à bas coût car le monde entier achète des T-Bonds. Quand la Fed monte ses taux, elle aspire les capitaux mondiaux vers les US — créant des crises dans les pays émergents (ex : 2018 Turquie, Argentine)." },
          { type: 'example', label: 'DXY en 2022 — Le dollar tue les marchés mondiaux', text: "En 2022, la Fed a monté les taux de 0% à 4.5% en 9 mois. DXY est passé de 95 à 114 (+20%). Impact : EUR/USD est tombé à parité (1.00) pour la première fois en 20 ans. Pétrole a corrigé malgré la guerre Ukraine. Or en dollars -15% malgré la guerre (DXY neutralise l'effet refuge). Marchés émergents -30%. Le dollar est le vrai maître des marchés mondiaux." },
          { type: 'key', text: "💡 Règle simple pour les allocataires globaux : DXY monte → réduire les allocations aux matières premières, marchés émergents et or. DXY baisse → les surpondérer. Cette règle a fonctionné sur 90% des cycles des 30 dernières années. Intégrez le DXY dans TOUT votre processus d'allocation d'actifs." }
        ],
        quiz: [
          { q: "Quelle est la composition principale de l'indice DXY et quelle devise pèse le plus ?", opts: ["10 devises équipondérées à 10% chacune", "6 devises avec l'euro à 57.6% — le DXY reflète surtout EUR/USD", "4 devises (EUR, JPY, GBP, CNY) équipondérées", "Un panier de toutes les devises mondiales"], ans: 1, exp: "L'indice DXY (US Dollar Index) mesure le dollar contre 6 devises majeures avec l'euro dominant à 57.6%, suivi du yen (13.6%), livre sterling (11.9%), dollar canadien (9.1%), couronne suédoise (4.2%) et franc suisse (3.6%). Sa forte pondération en euros signifie que l'EUR/USD est de loin la paire la plus influente du DXY." },
          { q: "Un dollar fort (DXY en hausse) est généralement négatif pour quels actifs ?", opts: ["Actions américaines et obligations US", "Or, matières premières et marchés émergents", "Actions défensives et fonds monétaires US", "Obligations souveraines des pays développés"], ans: 1, exp: "Un dollar fort pèse sur : 1) L'or (libellé en dollars, devient plus cher pour les acheteurs non-US). 2) Les matières premières (libellées en USD — même mécanisme). 3) Les marchés émergents (leurs dettes en USD deviennent plus lourdes, les capitaux se rapatrient vers les US). C'est pourquoi le DXY est l'un des indicateurs les plus suivis par les gestionnaires d'allocation globale." },
          { q: "Quel mécanisme explique que la hausse des taux Fed en 2022 a affecté les marchés émergents comme la Turquie ?", opts: ["La Fed a directement relevé les taux dans ces pays", "Les capitaux quittent les émergents pour aller vers les US (rendements plus élevés et en dollars) — créant des crises de financement", "Les banques américaines ont cessé de prêter aux pays émergents", "Les taux US n'ont aucun impact sur les marchés émergents"], ans: 1, exp: "Quand la Fed monte ses taux, les actifs en dollars deviennent plus attractifs (meilleur rendement, monnaie sûre). Les capitaux globaux quittent les marchés émergents pour se rapatrier aux États-Unis → les devises émergentes s'effondrent → les dettes en USD deviennent insoutenables → crise de balance des paiements. Ce mécanisme a provoqué de multiples crises émergentes (Mexique 1994, Asie 1997, Turquie 2018, Argentine 2018)." }
        ]
      },
      {
        id: 'eco-adv-2',
        title: "Politique Budgétaire & Interactions avec la Politique Monétaire",
        emoji: '📋',
        duration: '8 min',
        content: [
          { type: 'intro', text: "La politique budgétaire (dépenses et impôts du gouvernement) est aussi puissante que la politique monétaire, et leurs interactions créent les cycles économiques les plus importants. En 2020-2021, la combinaison QE massif + stimulus fiscal de 5 000 Mds$ a créé l'inflation la plus forte en 40 ans." },
          { type: 'point', icon: '💸', title: 'Politique expansionniste — Stimulus', text: "Le gouvernement augmente ses dépenses (infrastructures, aides sociales, chèques directs) et/ou réduit les impôts → injecte de la demande dans l'économie. Multiplicateur keynésien : 1$ de dépense publique génère 1.3-1.8$ de PIB. Efficace en récession quand le secteur privé n'investit plus. Risque : déficit et dette publique." },
          { type: 'point', icon: '✂️', title: 'Politique restrictive — Austérité', text: "Réduction des dépenses et/ou hausses d'impôts pour réduire le déficit. Peut refroidir une économie surchauffée ou rassurer les marchés obligataires sur la soutenabilité de la dette. Risque : si mal dosée, peut précipiter une récession (austerity trap). Exemple : zone euro 2010-2013, austérité imposée à la Grèce, Espagne, Portugal → récession prolongée." },
          { type: 'point', icon: '⚔️', title: 'Conflit politique monétaire / budgétaire', text: "Situation classique de tension : gouvernement fait du stimulus fiscal massif (vote dépenses) → demande monte → inflation monte. Banque centrale doit monter les taux pour contrer → coût de la dette publique monte → cercle vicieux. USA 2020-2023 : stimulus COVID de 5 000 Mds$ + taux à 0% → inflation 9% → Fed monte à 5.5% → coût annuel dette US > 1 000 Mds$." },
          { type: 'point', icon: '📈', title: 'Impact sur les marchés obligataires', text: "Un déficit budgétaire élevé nécessite plus d'émissions d'obligations → offre augmente → pression sur les taux longs (price discovery). Les investisseurs obligataires ('bond vigilantes') peuvent punir un pays aux finances dégradées en vendant ses obligations → taux longs montent → prêts plus chers → croissance freinée. UK 2022 : le mini-budget de Truss a provoqué une crise obligataire en 48h." },
          { type: 'example', label: 'Le cas japonais — MMT en action ?', text: "Le Japon a une dette publique de ~260% du PIB (la plus élevée des pays développés). Pourtant les taux longs japonais ont longtemps été proches de 0% car la Banque du Japon achetait TOUT ce que le gouvernement émettait (YCC — Yield Curve Control). L'inflation finalement revenue en 2022-2023 a forcé la BoJ à abandonner progressivement le YCC — causant une forte volatilité mondiale en 2024." },
          { type: 'key', text: "💡 Pour les traders : surveiller le 'fiscal impulse' (changement annuel du déficit en % PIB). Un fiscal impulse positif (déficit qui se creuse) est stimulant pour la croissance → positif pour les actions. Un fiscal impulse négatif (consolidation) → frein à la croissance. C'est un indicateur macro souvent sous-estimé par les investisseurs particuliers." }
        ],
        quiz: [
          { q: "Pourquoi la combinaison 'stimulus fiscal massif + politique monétaire ultra-accommodante' en 2020-2021 a-t-elle créé une forte inflation ?", opts: ["Parce que la Fed a imprimé trop de pièces de monnaie", "Double injection : gouvernements injectent de la demande via les chèques et dépenses + Fed injecte des liquidités via QE → trop de demande pour une offre contrainte", "Parce que les entreprises ont profité pour monter leurs prix", "Parce que la pandémie a détruit toutes les usines de production"], ans: 1, exp: "Le choc inflationniste de 2021-2022 résulte d'une double injection sans précédent : 1) Côté fiscal : 5 000 Mds$ de stimulus US (chèques, PPP, ARP) qui ont injecté directement de la demande chez les ménages et entreprises. 2) Côté monétaire : QE massif de la Fed et taux à 0% pendant 2 ans. Couplé à des perturbations d'offre (COVID supply chains), cela a créé un choc inflationniste de 9% — le pire depuis 40 ans." },
          { q: "Qu'est-ce qu'un 'bond vigilante' et comment peut-il discipliner un gouvernement ?", opts: ["Un analyste qui publie des rapports critiques sur les gouvernements", "Un investisseur obligataire qui vend massivement les obligations d'un pays aux finances dégradées — forçant une hausse des taux et disciplinant le gouvernement", "Un fonds spéculatif spécialisé dans l'arbitrage obligataire", "Un fonctionnaire de l'agence de notation Moody's"], ans: 1, exp: "Les 'bond vigilantes' sont des investisseurs institutionnels qui 'punissent' les gouvernements qui creusent trop leur déficit en vendant massivement leurs obligations. Cela fait monter les rendements obligataires, augmentant le coût du service de la dette du gouvernement — forçant une correction budgétaire. Le cas le plus spectaculaire : le mini-budget de Liz Truss (UK, 2022) a déclenché une crise obligataire en 48h, la forçant à démissionner." },
          { q: "Quel est l'impact d'un 'fiscal impulse' négatif (réduction du déficit public) sur l'économie ?", opts: ["Très positif — réduit la dette et stimule la confiance des investisseurs immédiatement", "Généralement frein à la croissance à court terme — la consolidation réduit la demande agrégée", "Sans impact — la politique budgétaire ne compte pas avec des banques centrales indépendantes", "Très positif pour les actions car les marchés aiment la rigueur budgétaire"], ans: 1, exp: "Un fiscal impulse négatif (budget qui se contracte : hausse d'impôts et/ou baisse des dépenses) réduit mécaniquement la demande agrégée et agit comme un frein à la croissance à court terme. C'est ce qu'on appelle le 'multiplicateur budgétaire inversé' — l'effet récessif de l'austérité. Le FMI a reconnu avoir sous-estimé cet effet lors de l'austérité imposée à la Grèce en 2010-2013, qui a provoqué une dépression." }
        ]
      }
    ]
  }
];

/* ─── État & Persistance ─── */
var ECO_STORE_KEY = 'eco_academy_v1';
var ecoAcadState = { xp: 0, completed: {}, quizScores: {} };

function ecoLoadState() {
  try { var s = localStorage.getItem(ECO_STORE_KEY); if (s) ecoAcadState = JSON.parse(s); } catch(e) {}
}
function ecoSaveState() {
  try { localStorage.setItem(ECO_STORE_KEY, JSON.stringify(ecoAcadState)); } catch(e) {}
}
window.ecoSaveState = ecoSaveState;
ecoLoadState();

/* ─── Render liste des niveaux ─── */
function ecoRenderLevelsHome() {
  var c = document.getElementById('eco-levels-list'); if (!c) return;
  var xpEl = document.getElementById('eco-xp-val'); if (xpEl) xpEl.textContent = ecoAcadState.xp;
  var html = '';
  ECO_LEVELS.forEach(function(lvl) {
    var done = lvl.lessons.filter(function(l) { return ecoAcadState.completed[l.id]; }).length;
    var pct  = Math.round((done / lvl.lessons.length) * 100);
    html += '<div style="background:var(--bg-card);border:1px solid '+lvl.colorBdr+';border-radius:12px;padding:20px;margin-bottom:2px;">'
      + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">'
      + '<span style="font-size:22px;">'+lvl.icon+'</span>'
      + '<div><div style="font-size:14px;font-weight:700;color:'+lvl.color+';font-family:var(--mono);">'+lvl.label+'</div>'
      + '<div style="font-size:11px;color:var(--tx-muted);">'+lvl.desc+'</div></div>'
      + '<div style="margin-left:auto;text-align:right;">'
      + '<div style="font-size:11px;font-family:var(--mono);color:'+lvl.color+';">'+done+'/'+lvl.lessons.length+' leçons</div>'
      + '<div style="font-size:10px;color:var(--tx-faint);">'+(done*lvl.xpPerLesson)+' XP</div></div>'
      + '</div>'
      + '<div style="height:4px;background:var(--bg-input);border-radius:2px;margin-bottom:14px;"><div style="height:4px;width:'+pct+'%;background:'+lvl.color+';border-radius:2px;transition:width .4s;"></div></div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px;">';
    lvl.lessons.forEach(function(les) {
      var isDone = !!ecoAcadState.completed[les.id];
      html += '<div onclick="ecoOpenLesson(\''+lvl.id+'\',\''+les.id+'\')" style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg-raised);border:1px solid '+(isDone?lvl.colorBdr:'var(--br-soft)')+';border-radius:8px;cursor:pointer;transition:border-color .15s;" onmouseover="this.style.borderColor=\''+lvl.color+'\'" onmouseout="this.style.borderColor=\''+(isDone?lvl.colorBdr:'var(--br-soft)')+'\'">'
        + '<span style="font-size:18px;">'+les.emoji+'</span>'
        + '<div style="flex:1;min-width:0;">'
        + '<div style="font-size:11px;font-weight:700;color:var(--tx-hi);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+les.title+'</div>'
        + '<div style="font-size:10px;color:var(--tx-faint);">'+les.duration+' · '+les.quiz.length+' questions · '+lvl.xpPerLesson+' XP</div>'
        + '</div>'
        + (isDone ? '<span style="font-size:16px;">✅</span>' : '<span style="font-size:11px;font-family:var(--mono);color:'+lvl.color+';padding:2px 6px;border:1px solid '+lvl.colorBdr+';border-radius:4px;">START</span>')
        + '</div>';
    });
    html += '</div></div>';
  });
  c.innerHTML = html;
}

/* ─── Ouvrir une leçon ─── */
window.ecoOpenLesson = function(levelId, lessonId) {
  var lvl = ECO_LEVELS.find(function(l) { return l.id === levelId; });
  var les = lvl ? lvl.lessons.find(function(l) { return l.id === lessonId; }) : null;
  if (!lvl || !les) return;
  var home = document.getElementById('eco-lessons-home');
  var view = document.getElementById('eco-lesson-view');
  var bc   = document.getElementById('eco-lesson-breadcrumb');
  if (home) home.style.display = 'none';
  if (view) view.style.display = '';
  if (bc) bc.textContent = lvl.label + ' › ' + les.title;
  var c = document.getElementById('eco-lesson-content'); if (!c) return;
  var html = '<div style="background:var(--bg-card);border:1px solid '+lvl.colorBdr+';border-radius:12px;overflow:hidden;">'
    + '<div style="padding:20px 24px;background:linear-gradient(135deg,'+lvl.colorBg+' 0%,transparent 100%);border-bottom:1px solid '+lvl.colorBdr+'">'
    + '<div style="display:flex;align-items:center;gap:12px;margin-bottom:4px;">'
    + '<span style="font-size:28px;">'+les.emoji+'</span>'
    + '<div><div style="font-size:16px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);">'+les.title+'</div>'
    + '<div style="font-size:10px;color:var(--tx-faint);">'+les.duration+' de lecture · '+les.quiz.length+' questions · '+lvl.xpPerLesson+' XP</div></div>'
    + '</div></div>'
    + '<div style="padding:20px 24px;">';
  les.content.forEach(function(block) {
    if (block.type === 'intro') {
      html += '<div style="font-size:12px;color:var(--tx-mid);line-height:1.8;margin-bottom:16px;padding:14px 16px;background:'+lvl.colorBg+';border-left:3px solid '+lvl.color+';border-radius:0 8px 8px 0;">'+block.text+'</div>';
    } else if (block.type === 'point') {
      html += '<div style="display:flex;gap:12px;margin-bottom:14px;padding:12px 14px;background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:8px;">'
        + '<span style="font-size:20px;flex-shrink:0;">'+block.icon+'</span>'
        + '<div><div style="font-size:12px;font-weight:700;color:var(--tx-hi);margin-bottom:4px;">'+block.title+'</div>'
        + '<div style="font-size:11px;color:var(--tx-muted);line-height:1.65;">'+block.text+'</div></div></div>';
    } else if (block.type === 'example') {
      html += '<div style="padding:12px 14px;background:var(--blue-bg);border:1px solid var(--blue-bdr);border-radius:8px;margin-bottom:14px;">'
        + '<div style="font-size:10px;font-family:var(--mono);font-weight:700;color:var(--blue);margin-bottom:6px;letter-spacing:1px;">📋 '+block.label.toUpperCase()+'</div>'
        + '<div style="font-size:11px;color:var(--tx-mid);line-height:1.65;">'+block.text+'</div></div>';
    } else if (block.type === 'key') {
      html += '<div style="padding:12px 14px;background:var(--orange-bg);border:1px solid var(--orange-bdr);border-radius:8px;margin-bottom:14px;">'
        + '<div style="font-size:11px;color:var(--tx-mid);line-height:1.65;">'+block.text+'</div></div>';
    }
  });
  html += '<div style="margin-top:20px;border-top:1px solid var(--br-soft);padding-top:20px;">'
    + '<div style="font-size:11px;font-family:var(--mono);font-weight:700;color:'+lvl.color+';letter-spacing:1px;margin-bottom:14px;">🧠 QUIZ DE LA LEÇON ('+les.quiz.length+' QUESTIONS)</div>'
    + '<div id="eco-inline-quiz-'+les.id+'"></div></div>';
  html += '</div></div>'
    + '<div style="margin-top:16px;text-align:center;">'
    + '<button onclick="ecoMarkDone(\''+levelId+'\',\''+lessonId+'\')" style="font-family:var(--mono);font-size:11px;padding:10px 28px;border-radius:6px;border:1px solid '+lvl.colorBdr+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">✅ Marquer comme terminé +'+lvl.xpPerLesson+' XP</button>'
    + '</div>';
  c.innerHTML = html;
  ecoRenderInlineQuiz(les, lvl);
};

/* ─── Quiz inline ─── */
var ecoInlineQuizStates = {};
function ecoRenderInlineQuiz(les, lvl) {
  var containerId = 'eco-inline-quiz-' + les.id;
  var container = document.getElementById(containerId); if (!container) return;
  if (!ecoInlineQuizStates[les.id]) ecoInlineQuizStates[les.id] = { current: 0, answered: false, score: 0, done: false };
  var state = ecoInlineQuizStates[les.id];
  if (state.done) {
    var pct = Math.round((state.score / les.quiz.length) * 100);
    container.innerHTML = '<div style="text-align:center;padding:20px;background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:10px;">'
      + '<div style="font-size:28px;font-family:var(--mono);font-weight:700;color:'+(pct>=80?'var(--green)':pct>=50?'var(--yellow)':'var(--red)')+';margin-bottom:6px;">'+state.score+'/'+les.quiz.length+'</div>'
      + '<div style="font-size:12px;color:var(--tx-mid);margin-bottom:12px;">'+(pct>=80?'Parfait ! 🎉':pct>=50?'Bien joué 👍':'Relisez la leçon 📚')+'</div>'
      + '<button onclick="ecoResetInlineQuiz(\''+les.id+'\')" style="font-family:var(--mono);font-size:10px;padding:6px 16px;border-radius:6px;border:1px solid var(--br-mid);background:transparent;color:var(--tx-mid);cursor:pointer;">🔄 Recommencer</button></div>';
    return;
  }
  var q = les.quiz[state.current];
  q = window.quizShuffleOpts(q);
  window._sqCurrent = q; // shuffled q for answer function
  var html = '<div style="background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:10px;padding:16px;">'
    + '<div style="display:flex;justify-content:space-between;margin-bottom:10px;">'
    + '<span style="font-size:10px;font-family:var(--mono);color:var(--tx-faint);">Q '+(state.current+1)+'/'+les.quiz.length+'</span>'
    + '<span style="font-size:10px;font-family:var(--mono);color:'+lvl.color+';">'+state.score+' pts</span>'
    + '</div>'
    + '<div style="height:2px;background:var(--bg-input);border-radius:1px;margin-bottom:12px;"><div style="height:2px;width:'+(state.current/les.quiz.length*100)+'%;background:'+lvl.color+';border-radius:1px;"></div></div>'
    + '<div style="font-size:12px;font-weight:700;color:var(--tx-hi);line-height:1.5;margin-bottom:12px;">'+q.q+'</div>'
    + '<div style="display:flex;flex-direction:column;gap:7px;">';
  q.opts.forEach(function(opt, i) {
    html += '<button onclick="ecoInlineAnswer(\''+les.id+'\','+i+')" id="eco-iq-'+les.id+'-'+i+'" style="text-align:left;padding:9px 12px;border-radius:7px;border:1px solid var(--br-mid);background:var(--bg-card);color:var(--tx-mid);cursor:pointer;font-size:11px;font-family:var(--sans);" onmouseover="if(!this.dataset.locked)this.style.borderColor=\''+lvl.color+'\'" onmouseout="if(!this.dataset.locked)this.style.borderColor=\'var(--br-mid)\'"><span style="font-family:var(--mono);font-weight:700;color:var(--tx-faint);margin-right:7px;">'+String.fromCharCode(65+i)+'.</span>'+opt+'</button>';
  });
  html += '</div><div id="eco-iq-fb-'+les.id+'" style="margin-top:10px;"></div></div>';
  container.innerHTML = html;
}

window.ecoInlineAnswer = function(lesId, idx) {
  var state = ecoInlineQuizStates[lesId]; if (!state || state.answered) return;
  state.answered = true;
  var lvl = ECO_LEVELS.find(function(l) { return l.lessons.some(function(le) { return le.id === lesId; }); });
  var les = lvl ? lvl.lessons.find(function(l) { return l.id === lesId; }) : null; if (!les) return;
  var q = window._sqCurrent || {}; var correct = idx === q.ans; if (correct) state.score++;
  q.opts.forEach(function(_, i) {
    var btn = document.getElementById('eco-iq-'+lesId+'-'+i); if (!btn) return;
    btn.dataset.locked='1'; btn.style.cursor='default';
    if (i===q.ans){btn.style.borderColor='var(--green)';btn.style.background='var(--green-bg)';btn.style.color='var(--green)';}
    else if (i===idx&&!correct){btn.style.borderColor='var(--red)';btn.style.background='var(--red-bg)';btn.style.color='var(--red)';}
  });
  var fb = document.getElementById('eco-iq-fb-'+lesId);
  if (fb) fb.innerHTML = '<div style="padding:9px 12px;background:'+(correct?'var(--green-bg)':'var(--red-bg)')+';border:1px solid '+(correct?'var(--green-bdr)':'var(--red-bdr)')+';border-radius:7px;margin-bottom:8px;">'
    +'<div style="font-size:11px;font-weight:700;color:'+(correct?'var(--green)':'var(--red)')+';margin-bottom:3px;">'+(correct?'✅ Correct !':'❌ Pas tout à fait…')+'</div>'
    +'<div style="font-size:10px;color:var(--tx-mid);line-height:1.6;">'+q.exp+'</div></div>'
    +'<button onclick="ecoInlineNext(\''+lesId+'\')" style="width:100%;font-family:var(--mono);font-size:10px;padding:8px;border-radius:6px;border:1px solid '+lvl.colorBdr+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">'+(state.current+1<les.quiz.length?'Question suivante →':'Voir mon résultat 🏁')+'</button>';
};

window.ecoInlineNext = function(lesId) {
  var state = ecoInlineQuizStates[lesId]; if (!state) return;
  state.current++; state.answered = false;
  var lvl = ECO_LEVELS.find(function(l) { return l.lessons.some(function(le) { return le.id === lesId; }); });
  var les = lvl ? lvl.lessons.find(function(l) { return l.id === lesId; }) : null; if (!les) return;
  if (state.current >= les.quiz.length) state.done = true;
  ecoRenderInlineQuiz(les, lvl);
};

window.ecoResetInlineQuiz = function(lesId) {
  ecoInlineQuizStates[lesId] = { current: 0, answered: false, score: 0, done: false };
  var lvl = ECO_LEVELS.find(function(l) { return l.lessons.some(function(le) { return le.id === lesId; }); });
  var les = lvl ? lvl.lessons.find(function(l) { return l.id === lesId; }) : null;
  if (les && lvl) ecoRenderInlineQuiz(les, lvl);
};

window.ecoMarkDone = function(levelId, lessonId) {
  ecoLoadState();
  var lvl = ECO_LEVELS.find(function(l) { return l.id === levelId; }); if (!lvl) return;
  var already = !!ecoAcadState.completed[lessonId];
  if (!already) { ecoAcadState.completed[lessonId] = true; ecoAcadState.xp += lvl.xpPerLesson; }
  ecoSaveState();
  var xpEl = document.getElementById('eco-xp-val'); if (xpEl) xpEl.textContent = ecoAcadState.xp;
  ecoLessonBackToHome();
};

window.ecoLessonBackToHome = function() {
  var home = document.getElementById('eco-lessons-home');
  var view = document.getElementById('eco-lesson-view');
  if (home) { home.style.display = ''; ecoRenderLevelsHome(); }
  if (view) view.style.display = 'none';
};


    console.log('[Guide Économie] Module chargé');
})();

/* ═══════════════════════════════════════════════════════════
   GUIDE IMMOBILIER — Module JS complet
   ═══════════════════════════════════════════════════════════ */
(function() {

  /* ── Tab navigation ── */
  window.immoTab = function(btn, panel) {
    var bar = document.getElementById('immo-tab-bar');
    if (bar) {
      bar.querySelectorAll('.immo-tb').forEach(function(b) {
        b.style.background = 'var(--bg-card)';
        b.style.color      = 'var(--tx-mid)';
        b.style.border     = '1px solid var(--br-mid)';
        b.style.fontWeight = '';
      });
    }
    if (btn) {
      btn.style.background = 'var(--green)';
      btn.style.color      = '#000';
      btn.style.border     = '1px solid var(--green)';
      btn.style.fontWeight = '700';
    }
    ['concepts','types','financement','fiscalite','erreurs','lessons','quiz'].forEach(function(p) {
      var el = document.getElementById('immo-panel-' + p);
      if (el) el.style.display = (p === panel) ? '' : 'none';
    });
    if (panel === 'quiz') immoRenderQuizHome();
    if (panel === 'lessons') { immoLoadState(); immoRenderLevelsHome(); }
  };

  window.immoGuideInit = function() {
    var bar = document.getElementById('immo-tab-bar');
    if (bar) {
      bar.querySelectorAll('.immo-tb').forEach(function(b) {
        b.style.background = 'var(--bg-card)';
        b.style.color      = 'var(--tx-mid)';
        b.style.border     = '1px solid var(--br-mid)';
        b.style.fontWeight = '';
      });
      var first = bar.querySelector('.immo-tb');
      if (first) { first.style.background='var(--green)'; first.style.color='#000'; first.style.border='1px solid var(--green)'; first.style.fontWeight='700'; }
    }
    ['concepts','types','financement','fiscalite','erreurs','lessons','quiz'].forEach(function(p) {
      var el = document.getElementById('immo-panel-' + p);
      if (el) el.style.display = (p === 'concepts') ? '' : 'none';
    });
  };

  /* ═══ DONNÉES ACADÉMIE ═══ */
  var IMMO_LEVELS = [
    {
      id: 'immo-debutant',
      label: 'Débutant',
      icon: '🟢',
      color: 'var(--green)',
      colorBg: 'var(--green-bg)',
      colorBdr: 'var(--green-bdr)',
      desc: 'Rendement, cashflow, effet de levier — les bases de l\'investissement immobilier',
      xpPerLesson: 20,
      lessons: [
        {
          id: 'immo-deb-1',
          title: 'Rendement Locatif — Les Calculs Essentiels',
          emoji: '📊',
          duration: '5 min',
          content: [
            { type: 'intro', text: "Le rendement locatif est la première métrique à maîtriser avant tout investissement immobilier. Comprendre la différence entre rendement brut, net et net-net vous évitera de mauvaises surprises et vous permettra de comparer les opportunités objectivement." },
            { type: 'point', icon: '📐', title: 'Rendement Brut — La formule de base', text: "Rendement brut (%) = (Loyer mensuel × 12 / Prix d'achat total) × 100. Exemple : appartement à 150 000€ (frais inclus), loué 750€/mois → (750×12/150000)×100 = 6% brut. Simple à calculer mais ne reflète pas la réalité économique." },
            { type: 'point', icon: '🔍', title: 'Rendement Net — La réalité du terrain', text: "Rendement net = rendement brut moins les charges réelles : taxe foncière, charges copropriété non récupérables, assurance PNO (propriétaire non occupant), frais de gestion (8-10% si agence), provision travaux (5-10% des loyers), vacance locative (5-8%). En pratique, le rendement net est 25-35% inférieur au brut." },
            { type: 'point', icon: '💡', title: 'Rendement Net-Net — Après impôts', text: "Le rendement net-net intègre la fiscalité sur les loyers. En régime micro-foncier (abattement 30%), si vous êtes dans la tranche à 30%, l'imposition réelle est ~24%. En LMNP réel avec amortissements, le rendement net-net peut être quasi identique au rendement net pendant 20 ans." },
            { type: 'example', label: 'Calcul complet concret', text: "Appartement : 120 000€ (frais notaire inclus). Loyer : 650€/mois → 7 800€/an. Rendement brut : 6.5%. Charges déduites : taxe foncière 900€ + charges copro 400€ + assurance 150€ + vacance (6%) 468€ + travaux (5%) 390€ = 2 308€. Revenus nets : 7 800 – 2 308 = 5 492€. Rendement net : 4.6%. C'est ce chiffre qui compte pour évaluer le cashflow réel." },
            { type: 'key', text: "💡 Règle des seuils : En dessous de 4% net, l'investissement ne s'autofinance pas (cashflow négatif). Entre 4 et 6% net : cashflow légèrement positif ou neutre selon le crédit. Au-dessus de 6% net : cashflow positif, le bien génère des revenus complémentaires immédiats. Pour le LMNP avec amortissements, même 4% brut peut être excellent fiscalement." }
          ],
          quiz: [
            { q: "Un appartement est acheté 180 000€ (frais inclus) et loué 800€/mois. Quel est son rendement brut ?", opts: ["4%","4.5%","5.3%","6%"], ans: 2, exp: "Rendement brut = (800 × 12 / 180 000) × 100 = (9 600 / 180 000) × 100 = 5.33%. C'est le rendement brut avant toute déduction de charges. En pratique, on peut attendre un rendement net de 3.7 à 4%, ce qui reste correct pour une grande métropole." },
            { q: "Quelle est la différence principale entre rendement brut et rendement net ?", opts: ["Le rendement net inclut la plus-value à la revente", "Le rendement net déduit toutes les charges réelles (taxe foncière, charges copro, assurance, vacance, travaux)", "Le rendement net prend en compte l'effet de levier du crédit", "Il n'y a pas de différence — ce sont deux façons de dire la même chose"], ans: 1, exp: "Le rendement net déduit du loyer annuel brut l'ensemble des charges : taxe foncière, charges de copropriété non récupérables, assurance PNO, frais de gestion agence, provision pour travaux et vacance locative. En pratique, ces charges représentent 25 à 35% du loyer brut. Il ne faut jamais se baser sur le rendement brut pour une décision d'investissement." },
            { q: "Vous provisionnez 6% de vacance locative sur un bien qui rapporte 800€/mois. Quel montant provisionner par an ?", opts: ["480€","576€","800€","960€"], ans: 1, exp: "Provision vacance = 800€ × 12 mois × 6% = 9 600 × 0.06 = 576€/an. Cela correspond à environ 22 jours de vacance par an — soit un peu moins d'un mois, ce qui est réaliste pour la plupart des marchés. Sur un marché tendu (Paris, Lyon), vous pouvez descendre à 3-4%. Sur une ville moyenne, prévoyez plutôt 8-10%." }
          ]
        },
        {
          id: 'immo-deb-2',
          title: 'Cashflow & Effet de Levier Immobilier',
          emoji: '⚡',
          duration: '6 min',
          content: [
            { type: 'intro', text: "L'effet de levier bancaire est la force principale qui distingue l'immobilier des autres classes d'actifs. Comprendre comment maximiser le cashflow tout en utilisant intelligemment le crédit est la compétence centrale de tout investisseur immobilier." },
            { type: 'point', icon: '💰', title: 'Le Cashflow — Calcul mensuel', text: "Cashflow mensuel = Loyer – Mensualité crédit – Charges mensuelles moyennes. Un cashflow positif signifie que le locataire paie votre crédit ET vous donne un revenu supplémentaire. Un cashflow négatif ('effort d'épargne') signifie que vous complétez chaque mois. L'objectif idéal : cashflow neutre à positif dès le départ." },
            { type: 'point', icon: '🏦', title: 'L\'Effet de Levier — Mécanisme fondamental', text: "Sans crédit : 100 000€ investis, bien à 100 000€, hausse de 10% = +10 000€ = 10% de rendement. Avec crédit : 20 000€ apportés, emprunt de 80 000€, bien à 100 000€, hausse de 10% = +10 000€ = 50% de rendement sur votre mise. Le levier amplifie le gain. Mais il amplifie aussi les pertes et crée une obligation mensuelle fixe." },
            { type: 'point', icon: '⚠️', title: 'Risques du levier élevé', text: "Taux d'endettement > 35% des revenus : les banques refusent. Cashflow très négatif : un imprévu (chauffe-eau, vacance 3 mois) peut déstabiliser votre budget. Hausse des taux variables : mensualité qui explose. Règle de prudence : gardez toujours 6 mois de mensualités en épargne de précaution pour chaque bien." },
            { type: 'example', label: 'Simulation complète', text: "Bien 200 000€ (frais inclus). Apport : 40 000€. Crédit : 160 000€ sur 20 ans à 3.5% → mensualité 928€. Loyer : 900€. Charges mensuelles : 150€ (copro 60€ + taxe foncière 75€ + assurance 15€). Cashflow mensuel : 900 – 928 – 150 = -178€/mois. Effort d'épargne mensuel de 178€, mais le locataire amortit 750€/mois de capital. En 20 ans, patrimoine constitué : 200 000€ pour un apport de 40 000 + 42 720€ versés = 82 720€ investis → performance annualisée intéressante si le bien prend 2%/an." },
            { type: 'key', text: "💡 La vraie richesse de l'immobilier se construit sur le long terme via 3 moteurs : 1) L'amortissement du capital (votre locataire paie votre crédit). 2) La valorisation du bien (+2%/an en moyenne sur 30 ans). 3) L'effet de levier (contrôler 200 000€ avec 40 000€). Ces 3 moteurs combinés sur 20 ans créent un patrimoine que l'épargne seule ne peut pas répliquer." }
          ],
          quiz: [
            { q: "Loyer 900€, mensualité crédit 850€, charges mensuelles 120€. Quel est le cashflow mensuel ?", opts: ["+50€","-70€","-120€","+30€"], ans: 1, exp: "Cashflow = Loyer – Mensualité – Charges = 900 – 850 – 120 = -70€/mois. C'est un cashflow légèrement négatif (effort d'épargne de 70€/mois). Ce n'est pas catastrophique si la zone est en croissance et le bien bien situé — le locataire amortit néanmoins le capital du crédit chaque mois." },
            { q: "Quel est le principal avantage de l'effet de levier en immobilier ?", opts: ["Éliminer tout risque de perte en capital", "Contrôler un actif beaucoup plus grand que son apport initial, démultipliant le rendement sur capital investi", "Garantir un cashflow positif automatiquement", "Permettre de ne payer aucune taxe foncière"], ans: 1, exp: "L'effet de levier permet de contrôler un actif de 200 000€ avec seulement 40 000€ d'apport. Si le bien prend 10% de valeur (+20 000€), votre rendement sur votre mise initiale est de 50% (20 000/40 000). C'est la force unique de l'immobilier — aucune banque ne vous prêtera 80% pour acheter des actions ou de l'or." },
            { q: "Quelle épargne de précaution est recommandée pour sécuriser un investissement locatif ?", opts: ["1 mois de loyer","1 mois de mensualité crédit","6 mois de mensualités crédit par bien","10% du prix du bien"], ans: 2, exp: "La règle prudentielle est de conserver 6 mois de mensualités crédit en réserve pour chaque bien détenu. Cette épargne couvre les imprévus majeurs : vacance locative prolongée, gros travaux (chauffe-eau, toiture, électricité), impayés de loyer pendant la procédure d'expulsion (qui peut durer 12 à 18 mois en France). Sans cette réserve, un imprévu peut déstabiliser l'ensemble de votre situation financière." }
          ]
        },
        {
          id: 'immo-deb-3',
          title: 'Choisir le Bon Emplacement',
          emoji: '📍',
          duration: '5 min',
          content: [
            { type: 'intro', text: "L'emplacement est le facteur numéro 1 de tout investissement immobilier. Un bien moyen dans un excellent emplacement surperformera toujours un bel appartement dans une zone en déclin. Voici comment analyser un marché local avec rigueur." },
            { type: 'point', icon: '👥', title: 'Démographie — La clé de la demande locative', text: "Population croissante = demande locative croissante. Vérifiez : la courbe démographique sur insee.fr (évolution sur 10-20 ans), le taux de natalité vs décès, les flux migratoires internes (les gens arrivent-ils ou partent-ils ?), la part de population jeune (15-30 ans = locataires potentiels). Évitez les villes qui perdent des habitants chaque année." },
            { type: 'point', icon: '💼', title: 'Emploi — Le moteur de la demande', text: "Les gens suivent les emplois. Une ville avec un grand employeur qui ferme voit son marché immobilier s'effondrer. Indicateurs : taux de chômage local vs moyenne nationale, diversification du tissu économique (une ville mono-industrie est risquée), présence d'universités (étudiants = location meublée), projets économiques à venir (ZAC, data centers, pôles de compétitivité)." },
            { type: 'point', icon: '🚇', title: 'Infrastructures — Le multiplicateur de valeur', text: "Les transports créent de la valeur. Une nouvelle ligne de métro ou RER peut faire monter les prix de 15 à 30% dans un quartier en quelques années. Suivez les projets d'infrastructure publique (Grand Paris Express, tramways, autoroutes), les plans locaux d'urbanisme (PLU) pour anticiper les zones qui vont se densifier, les projets de rénovation urbaine." },
            { type: 'point', icon: '📊', title: 'Tension Locative — Offre vs Demande', text: "La tension locative mesure le rapport entre la demande de logements et l'offre disponible. Indicateurs : délai moyen de mise en location (moins de 10 jours = marché tendu, excellent), taux de vacance locative (national ~7%, Paris ~2%), évolution des loyers sur 5-10 ans. Les outils : Se Loger, PAP, Bien'ici pour observer les délais de publication des annonces." },
            { type: 'key', text: "💡 Méthode pratique : avant d'acheter, postez une annonce fictive de location sur Se Loger ou Le Bon Coin pendant 48h. Comptez les appels reçus. Plus de 10 appels en 48h = marché tendu, votre bien se louera facilement. Moins de 3 appels = marché détendu, risque de vacance élevé. Cette validation terrain vaut toutes les études statistiques." }
          ],
          quiz: [
            { q: "Quel indicateur démographique est le plus important pour évaluer la demande locative future d'une ville ?", opts: ["Le PIB par habitant de la ville", "L'évolution de la population sur 10-20 ans (croissance vs déclin)", "Le nombre de monuments historiques", "Le taux de propriétaires occupants"], ans: 1, exp: "L'évolution démographique sur 10-20 ans est l'indicateur le plus fiable de la demande locative future. Une ville qui gagne des habitants chaque année voit mécaniquement sa demande de logements croître. À l'inverse, une ville en déclin démographique (ex: certaines villes mono-industrielles de l'ancienne Lorraine ou du Pas-de-Calais) peut voir ses prix baisser et sa vacance locative exploser." },
            { q: "Comment évaluer simplement et rapidement la tension locative d'un marché avant d'acheter ?", opts: ["Regarder le prix moyen au m² dans les agences immobilières", "Poster une annonce fictive de location et compter les appels reçus en 48h", "Interroger un notaire local", "Comparer avec la moyenne nationale INSEE"], ans: 1, exp: "Poster une annonce fictive sur Le Bon Coin ou Se Loger (que vous retirez après 48h) est la méthode la plus directe et efficace. Plus de 10 appels en 48h = marché tendu, excellente liquidité locative. Moins de 3 appels = marché détendu, prévoir une vacance longue. Cette validation terrain complète les données statistiques et reflète la réalité du marché au moment précis où vous envisagez d'investir." },
            { q: "Pourquoi la présence d'une université est-elle un atout pour un investissement locatif ?", opts: ["Elle augmente la valeur patrimoniale des biens de 50%", "Elle génère une demande locative régulière et prévisible de la part des étudiants (location meublée courte durée)", "Elle réduit la taxe foncière des propriétaires", "Elle garantit des loyers indexés sur l'inflation"], ans: 1, exp: "Les universités créent un flux régulier et prévisible de locataires (étudiants) chaque septembre. Ces locataires cherchent des petites surfaces meublées (studios, T1, T2) à prix accessibles. La demande est saisonnière mais très intense en août-septembre. Le statut LMNP est idéal pour ce type de bien. Villes universitaires comme Rennes, Montpellier, Bordeaux, Lille offrent d'excellents rendements locatifs étudiants." }
          ]
        }
      ]
    },
    {
      id: 'immo-intermediaire',
      label: 'Intermédiaire',
      icon: '🟡',
      color: 'var(--yellow)',
      colorBg: 'var(--yellow-bg)',
      colorBdr: 'var(--yellow-bdr)',
      desc: 'LMNP, fiscalité avancée, analyse d\'un investissement complet',
      xpPerLesson: 35,
      lessons: [
        {
          id: 'immo-int-1',
          title: 'LMNP — Le Statut Fiscal Optimal',
          emoji: '🛋️',
          duration: '7 min',
          content: [
            { type: 'intro', text: "Le statut LMNP (Loueur Meublé Non Professionnel) est l'un des dispositifs fiscaux les plus puissants accessibles aux particuliers en France. Bien utilisé, il permet de percevoir des revenus locatifs sans payer d'impôt dessus pendant 20 à 30 ans grâce aux amortissements." },
            { type: 'point', icon: '📋', title: 'Conditions du statut LMNP', text: "Pour être LMNP, votre logement doit être meublé (équipé de meubles suffisants pour y vivre : lit, table, chaises, cuisine équipée, etc.). Vos recettes locatives doivent être inférieures à 23 000€/an OU représenter moins de 50% de votre revenu global. Au-delà : statut LMP (Loueur Meublé Professionnel), plus intéressant mais plus contraignant." },
            { type: 'point', icon: '🔢', title: 'Le Régime Réel — L\'arme de l\'amortissement', text: "Au régime réel LMNP, vous pouvez amortir le bien (hors terrain, ~85% du prix) sur 25-30 ans, les meubles sur 5-7 ans, et les travaux sur 5-10 ans. Exemple : bien à 200 000€ → amortissement annuel ~6 500€. Si vos loyers annuels nets sont de 8 000€ et votre amortissement est de 6 500€, votre base imposable est seulement 1 500€ au lieu de 8 000€. Avec les autres charges déductibles, elle peut tomber à 0." },
            { type: 'point', icon: '⚖️', title: 'Micro-BIC vs Réel — Lequel choisir ?', text: "Micro-BIC : abattement forfaitaire de 50% sur les recettes. Simple, pas besoin de comptable. Optimal si vos charges réelles sont inférieures à 50% des loyers (rare). Réel : vous déduisez toutes les charges réelles + amortissements. Optimal (presque toujours) si vous avez un crédit en cours. La différence d'impôt peut être de plusieurs milliers d'euros par an. Un expert-comptable LMNP coûte 400-800€/an mais en économise souvent 5 à 10 fois plus." },
            { type: 'example', label: 'Simulation LMNP réel vs micro-BIC', text: "Loyers annuels : 9 600€. Charges réelles : 3 000€. Amortissement : 6 500€. Micro-BIC : base imposable = 9 600 × 50% = 4 800€. Impôt (TMI 30%) : 1 440€. Réel : base imposable = 9 600 – 3 000 – 6 500 = 100€. Impôt : 30€. Économie annuelle : 1 410€. Sur 20 ans de détention : 28 200€ d'impôts économisés. Le choix du régime réel s'impose presque systématiquement avec crédit et amortissements." },
            { type: 'key', text: "💡 Attention : en LMNP réel, les déficits reportables sont illimités dans le temps mais uniquement déductibles des revenus BIC de même catégorie (pas sur votre salaire). Lors de la revente, la plus-value est calculée sans tenir compte des amortissements déduits — vous êtes imposé sur la différence prix de vente / prix d'achat initial. Anticipez la fiscalité de sortie avant d'investir." }
          ],
          quiz: [
            { q: "Quel est le principal avantage fiscal du régime réel LMNP par rapport au micro-BIC ?", opts: ["Un abattement forfaitaire de 71% sur les recettes", "La possibilité d'amortir le bien et les meubles, réduisant fortement la base imposable", "L'exonération totale de cotisations sociales", "La possibilité de déduire les charges sur le revenu global"], ans: 1, exp: "Le régime réel LMNP permet d'amortir le bien immobilier (hors terrain, ~85%) sur 25-30 ans, les meubles sur 5-7 ans, et les travaux sur 5-10 ans. Ces amortissements viennent en déduction des loyers perçus, réduisant parfois à zéro la base imposable. C'est un avantage considérable impossible en location nue. Le micro-BIC n'offre qu'un abattement forfaitaire de 50%, sans amortissements." },
            { q: "Pour quel profil le régime micro-BIC est-il plus avantageux que le réel en LMNP ?", opts: ["Pour les investisseurs avec un crédit immobilier en cours", "Pour les biens avec de nombreux travaux déductibles", "Pour les biens sans crédit dont les charges réelles sont inférieures à 50% des loyers", "Pour les investisseurs en tranche marginale à 41%"], ans: 2, exp: "Le micro-BIC (abattement 50%) est plus avantageux que le réel uniquement si vos charges réelles déductibles (incluant les amortissements) sont inférieures à 50% de vos loyers bruts. C'est très rare en pratique dès lors qu'il y a un crédit en cours (intérêts déductibles) et des amortissements. Sans crédit, sur un bien très rentable avec peu de charges, le micro-BIC peut être légèrement plus simple et aussi intéressant." },
            { q: "Un bien LMNP est acheté 200 000€ (dont 30 000€ de terrain non amortissable). Sur 25 ans, quel est l'amortissement annuel théorique du bâti ?", opts: ["6 000€/an","6 800€/an","8 000€/an","5 600€/an"], ans: 1, exp: "Le terrain (30 000€) n'est pas amortissable. La valeur amortissable du bâti = 200 000 – 30 000 = 170 000€. Amortissement annuel sur 25 ans = 170 000 / 25 = 6 800€/an. En pratique, le comptable ventile aussi les composantes (gros œuvre 30-40 ans, façade 20 ans, toiture 15 ans, agencements 10 ans), ce qui donne souvent un amortissement légèrement plus élevé les premières années. C'est l'une des raisons de faire appel à un comptable spécialisé LMNP." }
          ]
        },
        {
          id: 'immo-int-2',
          title: 'Analyser un Investissement Locatif Complet',
          emoji: '🔎',
          duration: '8 min',
          content: [
            { type: 'intro', text: "Analyser un investissement locatif de A à Z avant d'acheter est indispensable. Cette méthode structurée vous permettra d'éviter les mauvaises surprises, de comparer objectivement plusieurs biens et de prendre une décision éclairée basée sur des chiffres réels." },
            { type: 'point', icon: '1️⃣', title: 'Étape 1 — Vérifier le marché local', text: "Avant les chiffres du bien lui-même : croissance démographique (insee.fr), taux de chômage local, tension locative (délai de location moyen), prix au m² et évolution sur 5 ans (DVF, Meilleurs Agents), loyers de marché pour des surfaces similaires (consultez 10 annonces comparables). Un bien excellent dans un mauvais marché restera problématique." },
            { type: 'point', icon: '2️⃣', title: 'Étape 2 — Évaluer le bien physiquement', text: "État général du bien (DPE obligatoire depuis la loi Climat — D et en dessous seront progressivement interdits à la location), surface réelle (Loi Carrez), charges de copropriété (procès-verbaux des 3 dernières AG), état de la toiture et parties communes, travaux votés ou à venir. Faites toujours inspecter par un professionnel indépendant." },
            { type: 'point', icon: '3️⃣', title: 'Étape 3 — Simuler le financement', text: "Calculez : prix total d'acquisition (prix + frais notaire 7-8% + travaux estimés), apport nécessaire, montant emprunté, mensualité sur 20 ans à taux actuel, taux d'endettement résultant (doit rester < 35%). Simulez plusieurs scénarios : taux + 0.5%, vacance 2 mois, loyer -5%. Si le projet reste viable dans ces scénarios dégradés, c'est un bon signe." },
            { type: 'point', icon: '4️⃣', title: 'Étape 4 — Calculer le cashflow prévisionnel', text: "Tableau de bord mensuel : (+) Loyer mensuel. (-) Mensualité crédit. (-) Charges copropriété part propriétaire. (-) Taxe foncière / 12. (-) Assurance PNO. (-) Provision vacance (7% du loyer). (-) Provision travaux (5% du loyer). (-) Frais de gestion si agence (8-10%). = Cashflow mensuel net avant impôts." },
            { type: 'key', text: "💡 L'indicateur de décision final : le 'indice de rentabilité patrimoniale' sur 20 ans. Calculez : valeur du bien dans 20 ans (prix actuel × 1.02^20 = ×1.49) + capital remboursé par le locataire – total de vos apports et efforts d'épargne. Si ce patrimoine net > 2× vos apports totaux, l'investissement mérite d'être réalisé. Comparez avec le placement alternatif de vos apports en ETF (7%/an)." }
          ],
          quiz: [
            { q: "Pourquoi le DPE (Diagnostic de Performance Énergétique) est-il devenu crucial dans l'analyse d'un investissement locatif ?", opts: ["Il détermine le montant de la taxe foncière", "Les logements classés G sont déjà interdits à la location, D et E le seront progressivement — risque locatif majeur", "Il fixe le loyer maximum autorisé", "Il est obligatoire uniquement pour les ventes, pas pour les locations"], ans: 1, exp: "La loi Climat et Résilience (2021) a fixé un calendrier d'interdiction progressive à la location : DPE G = interdiction dès 2025, DPE F = 2028, DPE E = 2034. Acheter un passoire thermique (F ou G) sans budget travaux est un risque locatif majeur. À l'inverse, un bien bien noté (A/B/C) est de plus en plus attractif pour les locataires et tend à se valoriser davantage que la moyenne." },
            { q: "Quelle est la règle du taux d'endettement maximum appliquée par les banques françaises ?", opts: ["25% des revenus nets","33% des revenus nets","35% des revenus nets","40% des revenus nets"], ans: 2, exp: "Depuis janvier 2022, le Haut Conseil de Stabilité Financière (HCSF) impose aux banques de ne pas dépasser un taux d'endettement de 35% des revenus nets (assurance incluse) pour l'ensemble des crédits immobiliers d'un emprunteur. Cette règle s'applique en agrégeant toutes les mensualités de crédit (résidence principale + investissements locatifs). C'est un plafond dur qui limite la capacité d'investissement en série." },
            { q: "Quels procès-verbaux devez-vous obligatoirement demander pour analyser les charges d'une copropriété ?", opts: ["Uniquement le dernier PV d'AG", "Les PV des 3 dernières assemblées générales et l'état des charges", "Le règlement de copropriété et le carnet d'entretien uniquement", "Aucun document spécifique — les charges sont indiquées dans l'annonce"], ans: 1, exp: "Les procès-verbaux (PV) des 3 dernières assemblées générales de copropriété sont des documents clés. Ils révèlent : les travaux votés ou à venir (ravalement, ascenseur, toiture) qui seront à la charge de l'acheteur, les éventuels conflits entre copropriétaires, l'état des impayés de charges, la santé financière du syndicat. Le carnet d'entretien complète cette analyse. Ces documents sont obligatoirement remis par le vendeur lors d'une promesse de vente." }
          ]
        }
      ]
    },
    {
      id: 'immo-avance',
      label: 'Avancé',
      icon: '🔴',
      color: 'var(--red)',
      colorBg: 'var(--red-bg)',
      colorBdr: 'var(--red-bdr)',
      desc: 'SCPI, SCI, stratégies de constitution de patrimoine',
      xpPerLesson: 50,
      lessons: [
        {
          id: 'immo-adv-1',
          title: 'SCPI & REITs — L\'Immobilier Sans Gestion',
          emoji: '🏢',
          duration: '7 min',
          content: [
            { type: 'intro', text: "Les SCPI (France) et les REITs (USA) permettent d'investir dans l'immobilier sans les contraintes de la gestion directe. Accessibles à partir de quelques milliers d'euros, ils offrent diversification, revenus passifs trimestriels et mutualisation des risques." },
            { type: 'point', icon: '🏛️', title: 'SCPI — Fonctionnement et Types', text: "Une SCPI collecte l'épargne de milliers d'investisseurs pour acheter un parc immobilier diversifié. Vous recevez des revenus proportionnels à vos parts, généralement chaque trimestre. Types : SCPI de bureaux (ex: Immorente), SCPI diversifiées, SCPI résidentielles, SCPI européennes (fiscalité avantageuse via Convention fiscale), SCPI thématiques (santé, logistique, commerce)." },
            { type: 'point', icon: '📈', title: 'REITs — L\'Équivalent Américain Côté', text: "Les REITs (Real Estate Investment Trusts) sont cotés en bourse — vous les achetez comme des actions. Avantage : liquidité immédiate (vente en 1 clic). Inconvénient : volatilité des marchés (un REIT peut baisser de 30% lors d'une crise boursière comme en 2020). Exemples : Realty Income (O), Prologis (PLD), American Tower (AMT). ETF REIT : XLRE ou VNQ pour diversification maximale." },
            { type: 'point', icon: '⚖️', title: 'SCPI vs REITs — Comparaison', text: "SCPI : moins liquides (revente en semaines/mois), plus stables, rendement moyen 4-5%/an, ticket minimum 1 000-5 000€, frais de souscription élevés (8-12%). REITs / ETF : très liquides, plus volatils, rendement dividende 3-5% + potentiel de croissance, ticket minimum < 100€, frais très faibles (ETF à 0.08%/an). Idéal long terme : combiner les deux pour bénéficier des avantages de chaque approche." },
            { type: 'point', icon: '💡', title: 'SCPI Européennes — L\'Avantage Fiscal', text: "Les SCPI qui investissent en Allemagne, Pays-Bas, etc. bénéficient d'une fiscalité avantageuse grâce aux conventions fiscales bilatérales. Les revenus étrangers sont imposés à l'étranger (souvent à taux plus bas) et ne sont intégrés en France que pour déterminer le taux d'imposition (mais non doublement imposés). Exemple : revenus allemands imposés à 26% en Allemagne, non ré-imposés en France pour un contribuable en TMI 41%." },
            { type: 'key', text: "💡 Stratégie optimale pour un investisseur débutant avec peu de capital : commencer par des SCPI ou un ETF REIT (XLRE) pour apprendre les rouages de l'immobilier et percevoir des revenus, puis évoluer vers l'immobilier direct quand le capital et les connaissances sont suffisants. Les SCPI en assurance-vie offrent une fiscalité encore plus avantageuse (prélèvements sociaux différés, abattements à 8 ans)." }
          ],
          quiz: [
            { q: "Quelle est la principale différence de liquidité entre une SCPI et un REIT (ETF) ?", opts: ["Aucune différence — les deux se revendent facilement", "Une SCPI est moins liquide (revente en semaines/mois) vs un REIT/ETF qui se vend en quelques secondes en bourse", "Un REIT est moins liquide car il faut trouver un acheteur direct", "Les SCPI offrent une liquidité garantie par l'État"], ans: 1, exp: "La liquidité est la différence majeure. Une SCPI (non cotée) se revend via la société de gestion qui doit trouver un acheteur pour vos parts — cela peut prendre de quelques semaines à plusieurs mois, voire plus en période de crise (comme certaines SCPI bureau en 2023). Un REIT ou ETF REIT se vend instantanément sur les marchés boursiers, mais avec la volatilité associée (un REIT peut perdre 20-30% lors d'un krach alors que la valeur des immeubles sous-jacents n'a pas bougé)." },
            { q: "Quel est l'avantage fiscal spécifique des SCPI qui investissent dans des pays européens comme l'Allemagne ?", opts: ["Exonération totale d'impôts sur les revenus en France", "Les revenus étrangers sont imposés dans le pays source (souvent à taux plus bas) sans double imposition en France", "Les dividendes européens bénéficient d'un abattement de 40%", "Ces revenus ne sont pas soumis aux prélèvements sociaux français"], ans: 1, exp: "Grâce aux conventions fiscales bilatérales, les revenus générés par des immeubles situés à l'étranger (Allemagne, Pays-Bas, etc.) sont imposés dans le pays source. En Allemagne par exemple, le taux d'imposition est souvent plus faible que le TMI français. Ces revenus sont ensuite pris en compte en France pour le calcul du taux effectif (méthode du taux effectif) mais ne sont pas ré-imposés — évitant la double imposition. Pour un investisseur en TMI 41%+, l'avantage peut être significatif." },
            { q: "Dans quel support souscrire des SCPI pour optimiser davantage la fiscalité des revenus ?", opts: ["Compte-titres ordinaire (CTO) pour bénéficier du PFU 30%", "Assurance-vie, pour différer les prélèvements sociaux et bénéficier des abattements fiscaux après 8 ans", "PEA, car les SCPI sont éligibles au Plan Épargne Actions", "Aucun — les SCPI doivent obligatoirement être détenues en direct"], ans: 1, exp: "Loger des SCPI dans une assurance-vie est une stratégie fiscale puissante. Les avantages : les revenus sont réinvestis sans prélèvements sociaux immédiats (effet de capitalisation), pas d'imposition tant que vous ne rachetez pas, abattement de 4 600€ (célibataire) ou 9 200€ (couple) sur les gains après 8 ans, et transmission optimisée (152 500€ d'exonération par bénéficiaire). Attention : les SCPI en AV ont souvent des frais supplémentaires et une liquidité encore plus réduite." }
          ]
        }
      ]
    }
  ];

  /* ─── État & Persistance ─── */
  var IMMO_STORE_KEY = 'immo_academy_v1';
  var immoAcadState = { xp: 0, completed: {}, quizScores: {} };

  function immoLoadState() {
    try { var s = localStorage.getItem(IMMO_STORE_KEY); if (s) immoAcadState = JSON.parse(s); } catch(e) {}
  }
  function immoSaveState() {
    try { localStorage.setItem(IMMO_STORE_KEY, JSON.stringify(immoAcadState)); } catch(e) {}
  }
  window.immoSaveState = immoSaveState;
  immoLoadState();

  /* ─── Render liste des niveaux ─── */
  function immoRenderLevelsHome() {
    var c = document.getElementById('immo-levels-list'); if (!c) return;
    var xpEl = document.getElementById('immo-xp-val'); if (xpEl) xpEl.textContent = immoAcadState.xp;
    var html = '';
    IMMO_LEVELS.forEach(function(lvl) {
      var done = lvl.lessons.filter(function(l) { return immoAcadState.completed[l.id]; }).length;
      var pct  = Math.round((done / lvl.lessons.length) * 100);
      html += '<div style="background:var(--bg-card);border:1px solid '+lvl.colorBdr+';border-radius:12px;padding:20px;margin-bottom:2px;">'
        + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">'
        + '<span style="font-size:22px;">'+lvl.icon+'</span>'
        + '<div><div style="font-size:14px;font-weight:700;color:'+lvl.color+';font-family:var(--mono);">'+lvl.label+'</div>'
        + '<div style="font-size:11px;color:var(--tx-muted);">'+lvl.desc+'</div></div>'
        + '<div style="margin-left:auto;text-align:right;">'
        + '<div style="font-size:11px;font-family:var(--mono);color:'+lvl.color+';">'+done+'/'+lvl.lessons.length+' leçons</div>'
        + '<div style="font-size:10px;color:var(--tx-faint);">'+(done*lvl.xpPerLesson)+' XP</div></div>'
        + '</div>'
        + '<div style="height:4px;background:var(--bg-input);border-radius:2px;margin-bottom:14px;"><div style="height:4px;width:'+pct+'%;background:'+lvl.color+';border-radius:2px;transition:width .4s;"></div></div>'
        + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px;">';
      lvl.lessons.forEach(function(les) {
        var isDone = !!immoAcadState.completed[les.id];
        html += '<div onclick="immoOpenLesson(\''+lvl.id+'\',\''+les.id+'\')" style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg-raised);border:1px solid '+(isDone?lvl.colorBdr:'var(--br-soft)')+';border-radius:8px;cursor:pointer;transition:border-color .15s;" onmouseover="this.style.borderColor=\''+lvl.color+'\'" onmouseout="this.style.borderColor=\''+(isDone?lvl.colorBdr:'var(--br-soft)')+'\'">'
          + '<span style="font-size:18px;">'+les.emoji+'</span>'
          + '<div style="flex:1;min-width:0;">'
          + '<div style="font-size:11px;font-weight:700;color:var(--tx-hi);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+les.title+'</div>'
          + '<div style="font-size:10px;color:var(--tx-faint);">'+les.duration+' · '+les.quiz.length+' questions · '+lvl.xpPerLesson+' XP</div>'
          + '</div>'
          + (isDone ? '<span style="font-size:16px;">✅</span>' : '<span style="font-size:11px;font-family:var(--mono);color:'+lvl.color+';padding:2px 6px;border:1px solid '+lvl.colorBdr+';border-radius:4px;">START</span>')
          + '</div>';
      });
      html += '</div></div>';
    });
    c.innerHTML = html;
  }

  /* ─── Ouvrir une leçon ─── */
  window.immoOpenLesson = function(levelId, lessonId) {
    var lvl = IMMO_LEVELS.find(function(l) { return l.id === levelId; });
    var les = lvl ? lvl.lessons.find(function(l) { return l.id === lessonId; }) : null;
    if (!lvl || !les) return;
    var home = document.getElementById('immo-lessons-home');
    var view = document.getElementById('immo-lesson-view');
    var bc   = document.getElementById('immo-lesson-breadcrumb');
    if (home) home.style.display = 'none';
    if (view) view.style.display = '';
    if (bc) bc.textContent = lvl.label + ' › ' + les.title;
    var c = document.getElementById('immo-lesson-content'); if (!c) return;
    var html = '<div style="background:var(--bg-card);border:1px solid '+lvl.colorBdr+';border-radius:12px;overflow:hidden;">'
      + '<div style="padding:20px 24px;background:linear-gradient(135deg,'+lvl.colorBg+' 0%,transparent 100%);border-bottom:1px solid '+lvl.colorBdr+'">'
      + '<div style="display:flex;align-items:center;gap:12px;margin-bottom:4px;">'
      + '<span style="font-size:28px;">'+les.emoji+'</span>'
      + '<div><div style="font-size:16px;font-weight:700;color:var(--tx-hi);font-family:var(--mono);">'+les.title+'</div>'
      + '<div style="font-size:10px;color:var(--tx-faint);">'+les.duration+' de lecture · '+les.quiz.length+' questions · '+lvl.xpPerLesson+' XP</div></div>'
      + '</div></div>'
      + '<div style="padding:20px 24px;">';
    les.content.forEach(function(block) {
      if (block.type === 'intro') {
        html += '<div style="font-size:12px;color:var(--tx-mid);line-height:1.8;margin-bottom:16px;padding:14px 16px;background:'+lvl.colorBg+';border-left:3px solid '+lvl.color+';border-radius:0 8px 8px 0;">'+block.text+'</div>';
      } else if (block.type === 'point') {
        html += '<div style="display:flex;gap:12px;margin-bottom:14px;padding:12px 14px;background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:8px;">'
          + '<span style="font-size:20px;flex-shrink:0;">'+block.icon+'</span>'
          + '<div><div style="font-size:12px;font-weight:700;color:var(--tx-hi);margin-bottom:4px;">'+block.title+'</div>'
          + '<div style="font-size:11px;color:var(--tx-muted);line-height:1.65;">'+block.text+'</div></div></div>';
      } else if (block.type === 'example') {
        html += '<div style="padding:12px 14px;background:var(--blue-bg);border:1px solid var(--blue-bdr);border-radius:8px;margin-bottom:14px;">'
          + '<div style="font-size:10px;font-family:var(--mono);font-weight:700;color:var(--blue);margin-bottom:6px;letter-spacing:1px;">📋 '+block.label.toUpperCase()+'</div>'
          + '<div style="font-size:11px;color:var(--tx-mid);line-height:1.65;">'+block.text+'</div></div>';
      } else if (block.type === 'key') {
        html += '<div style="padding:12px 14px;background:var(--orange-bg);border:1px solid var(--orange-bdr);border-radius:8px;margin-bottom:14px;">'
          + '<div style="font-size:11px;color:var(--tx-mid);line-height:1.65;">'+block.text+'</div></div>';
      }
    });
    html += '<div style="margin-top:20px;border-top:1px solid var(--br-soft);padding-top:20px;">'
      + '<div style="font-size:11px;font-family:var(--mono);font-weight:700;color:'+lvl.color+';letter-spacing:1px;margin-bottom:14px;">🧠 QUIZ DE LA LEÇON ('+les.quiz.length+' QUESTIONS)</div>'
      + '<div id="immo-inline-quiz-'+les.id+'"></div></div>';
    html += '</div></div>'
      + '<div style="margin-top:16px;text-align:center;">'
      + '<button onclick="immoMarkDone(\''+levelId+'\',\''+lessonId+'\')" style="font-family:var(--mono);font-size:11px;padding:10px 28px;border-radius:6px;border:1px solid '+lvl.colorBdr+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">✅ Marquer comme terminé +'+lvl.xpPerLesson+' XP</button>'
      + '</div>';
    c.innerHTML = html;
    immoRenderInlineQuiz(les, lvl);
  };

  /* ─── Quiz inline ─── */
  var immoInlineQuizStates = {};
  function immoRenderInlineQuiz(les, lvl) {
    var containerId = 'immo-inline-quiz-' + les.id;
    var container = document.getElementById(containerId); if (!container) return;
    if (!immoInlineQuizStates[les.id]) immoInlineQuizStates[les.id] = { current: 0, answered: false, score: 0, done: false };
    var state = immoInlineQuizStates[les.id];
    if (state.done) {
      var pct = Math.round((state.score / les.quiz.length) * 100);
      container.innerHTML = '<div style="text-align:center;padding:20px;background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:10px;">'
        + '<div style="font-size:28px;font-family:var(--mono);font-weight:700;color:'+(pct>=80?'var(--green)':pct>=50?'var(--yellow)':'var(--red)')+';margin-bottom:6px;">'+state.score+'/'+les.quiz.length+'</div>'
        + '<div style="font-size:12px;color:var(--tx-mid);margin-bottom:12px;">'+(pct>=80?'Parfait ! 🎉':pct>=50?'Bien joué 👍':'Relisez la leçon 📚')+'</div>'
        + '<button onclick="immoResetInlineQuiz(\''+les.id+'\')" style="font-family:var(--mono);font-size:10px;padding:6px 16px;border-radius:6px;border:1px solid var(--br-mid);background:transparent;color:var(--tx-mid);cursor:pointer;">🔄 Recommencer</button></div>';
      return;
    }
    var q = les.quiz[state.current];
    q = window.quizShuffleOpts ? window.quizShuffleOpts(q) : q;
    window._sqCurrent = q;
    var html = '<div style="background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:10px;padding:16px;">'
      + '<div style="display:flex;justify-content:space-between;margin-bottom:10px;">'
      + '<span style="font-size:10px;font-family:var(--mono);color:var(--tx-faint);">Q '+(state.current+1)+'/'+les.quiz.length+'</span>'
      + '<span style="font-size:10px;font-family:var(--mono);color:'+lvl.color+';">'+state.score+' pts</span>'
      + '</div>'
      + '<div style="height:2px;background:var(--bg-input);border-radius:1px;margin-bottom:12px;"><div style="height:2px;width:'+(state.current/les.quiz.length*100)+'%;background:'+lvl.color+';border-radius:1px;"></div></div>'
      + '<div style="font-size:12px;font-weight:700;color:var(--tx-hi);line-height:1.5;margin-bottom:12px;">'+q.q+'</div>'
      + '<div style="display:flex;flex-direction:column;gap:7px;">';
    q.opts.forEach(function(opt, i) {
      html += '<button onclick="immoInlineAnswer(\''+les.id+'\','+i+')" id="immo-iq-'+les.id+'-'+i+'" style="text-align:left;padding:9px 12px;border-radius:7px;border:1px solid var(--br-mid);background:var(--bg-card);color:var(--tx-mid);cursor:pointer;font-size:11px;font-family:var(--sans);" onmouseover="if(!this.dataset.locked)this.style.borderColor=\''+lvl.color+'\'" onmouseout="if(!this.dataset.locked)this.style.borderColor=\'var(--br-mid)\'"><span style="font-family:var(--mono);font-weight:700;color:var(--tx-faint);margin-right:7px;">'+String.fromCharCode(65+i)+'.</span>'+opt+'</button>';
    });
    html += '</div><div id="immo-iq-fb-'+les.id+'" style="margin-top:10px;"></div></div>';
    container.innerHTML = html;
  }

  window.immoInlineAnswer = function(lesId, idx) {
    var state = immoInlineQuizStates[lesId]; if (!state || state.answered) return;
    state.answered = true;
    var lvl = IMMO_LEVELS.find(function(l) { return l.lessons.some(function(le) { return le.id === lesId; }); });
    var les = lvl ? lvl.lessons.find(function(l) { return l.id === lesId; }) : null; if (!les) return;
    var q = window._sqCurrent || {}; var correct = idx === q.ans; if (correct) state.score++;
    q.opts.forEach(function(_, i) {
      var btn = document.getElementById('immo-iq-'+lesId+'-'+i); if (!btn) return;
      btn.dataset.locked='1'; btn.style.cursor='default';
      if (i===q.ans){btn.style.borderColor='var(--green)';btn.style.background='var(--green-bg)';btn.style.color='var(--green)';}
      else if (i===idx&&!correct){btn.style.borderColor='var(--red)';btn.style.background='var(--red-bg)';btn.style.color='var(--red)';}
    });
    var fb = document.getElementById('immo-iq-fb-'+lesId);
    if (fb) fb.innerHTML = '<div style="padding:9px 12px;background:'+(correct?'var(--green-bg)':'var(--red-bg)')+';border:1px solid '+(correct?'var(--green-bdr)':'var(--red-bdr)')+';border-radius:7px;margin-bottom:8px;">'
      +'<div style="font-size:11px;font-weight:700;color:'+(correct?'var(--green)':'var(--red)')+';margin-bottom:3px;">'+(correct?'✅ Correct !':'❌ Pas tout à fait…')+'</div>'
      +'<div style="font-size:10px;color:var(--tx-mid);line-height:1.6;">'+q.exp+'</div></div>'
      +'<button onclick="immoInlineNext(\''+lesId+'\')" style="width:100%;font-family:var(--mono);font-size:10px;padding:8px;border-radius:6px;border:1px solid '+lvl.colorBdr+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">'+(state.current+1<les.quiz.length?'Question suivante →':'Voir mon résultat 🏁')+'</button>';
  };

  window.immoInlineNext = function(lesId) {
    var state = immoInlineQuizStates[lesId]; if (!state) return;
    state.current++; state.answered = false;
    var lvl = IMMO_LEVELS.find(function(l) { return l.lessons.some(function(le) { return le.id === lesId; }); });
    var les = lvl ? lvl.lessons.find(function(l) { return l.id === lesId; }) : null; if (!les) return;
    if (state.current >= les.quiz.length) state.done = true;
    immoRenderInlineQuiz(les, lvl);
  };

  window.immoResetInlineQuiz = function(lesId) {
    immoInlineQuizStates[lesId] = { current: 0, answered: false, score: 0, done: false };
    var lvl = IMMO_LEVELS.find(function(l) { return l.lessons.some(function(le) { return le.id === lesId; }); });
    var les = lvl ? lvl.lessons.find(function(l) { return l.id === lesId; }) : null;
    if (les && lvl) immoRenderInlineQuiz(les, lvl);
  };

  window.immoMarkDone = function(levelId, lessonId) {
    immoLoadState();
    var lvl = IMMO_LEVELS.find(function(l) { return l.id === levelId; }); if (!lvl) return;
    var already = !!immoAcadState.completed[lessonId];
    if (!already) { immoAcadState.completed[lessonId] = true; immoAcadState.xp += lvl.xpPerLesson; }
    immoSaveState();
    var xpEl = document.getElementById('immo-xp-val'); if (xpEl) xpEl.textContent = immoAcadState.xp;
    immoLessonBackToHome();
  };

  window.immoLessonBackToHome = function() {
    var home = document.getElementById('immo-lessons-home');
    var view = document.getElementById('immo-lesson-view');
    if (home) { home.style.display = ''; immoRenderLevelsHome(); }
    if (view) view.style.display = 'none';
  };

  /* ─── Quiz par niveau ─── */
  var immoLvlQuizState = {levelId:null,current:0,score:0,answered:false,done:false,order:[],questions:[]};

  function immoShuffle(arr) {
    var a = arr.slice();
    for (var i = a.length-1; i > 0; i--) { var j = Math.floor(Math.random()*(i+1)); var t=a[i];a[i]=a[j];a[j]=t; }
    return a;
  }

  window.immoRenderQuizHome = function() {
    var c = document.getElementById('immo-quiz-level-cards'); if (!c) return;
    var html = '';
    IMMO_LEVELS.forEach(function(lvl) {
      var allQ = []; lvl.lessons.forEach(function(l){ allQ = allQ.concat(l.quiz); });
      html += '<div onclick="immoStartLevelQuiz(\''+lvl.id+'\')" style="padding:16px;background:var(--bg-card);border:1px solid '+lvl.colorBdr+';border-radius:10px;cursor:pointer;" onmouseover="this.style.background=\'var(--bg-hover)\'" onmouseout="this.style.background=\'var(--bg-card)\'">'
        + '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;"><span style="font-size:20px;">'+lvl.icon+'</span><div style="font-size:12px;font-weight:700;color:'+lvl.color+';font-family:var(--mono);">'+lvl.label+'</div></div>'
        + '<div style="font-size:11px;color:var(--tx-muted);">'+allQ.length+' questions · '+lvl.desc+'</div></div>';
    });
    c.innerHTML = html;
  };

  window.immoStartLevelQuiz = function(levelId) {
    var lvl = IMMO_LEVELS.find(function(l){return l.id===levelId;}); if(!lvl) return;
    var allQ = []; lvl.lessons.forEach(function(l){allQ=allQ.concat(l.quiz);});
    immoLvlQuizState = {levelId:levelId,current:0,score:0,answered:false,done:false,order:immoShuffle(allQ.map(function(_,i){return i;})),questions:allQ};
    var lbl=document.getElementById('immo-quiz-level-label'); if(lbl) lbl.textContent=lvl.label;
    var home=document.getElementById('immo-quiz-home'); var play=document.getElementById('immo-quiz-playing');
    if(home)home.style.display='none'; if(play)play.style.display='';
    immoRenderLevelQuiz();
  };

  window.immoQuizBackToHome = function() {
    var home=document.getElementById('immo-quiz-home'); var play=document.getElementById('immo-quiz-playing');
    if(home)home.style.display=''; if(play)play.style.display='none';
    immoRenderQuizHome();
  };

  window.immoRenderLevelQuiz = function() {
    var c = document.getElementById('immo-quiz-container'); if (!c) return;
    var S = immoLvlQuizState;
    var lvl = IMMO_LEVELS.find(function(l){return l.id===S.levelId;})||IMMO_LEVELS[0];
    if (S.done) {
      var pct = Math.round((S.score/S.questions.length)*100);
      var col = pct>=80?'var(--green)':pct>=50?'var(--yellow)':'var(--red)';
      var msg = pct>=80?'🎉 Expert '+lvl.label+' !':pct>=50?'👍 Bon niveau ! Relisez les leçons.':'📚 Continuez à vous former.';
      c.innerHTML = '<div style="text-align:center;padding:32px 20px;background:var(--bg-card);border:1px solid var(--br-soft);border-radius:12px;">'
        +'<div style="font-size:48px;font-family:var(--mono);font-weight:700;color:'+col+';margin-bottom:8px;">'+S.score+'/'+S.questions.length+'</div>'
        +'<div style="font-size:14px;font-weight:700;color:var(--tx-hi);margin-bottom:6px;">'+msg+'</div>'
        +'<div style="font-size:11px;color:var(--tx-muted);margin-bottom:24px;">Score : '+pct+'%</div>'
        +'<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">'
        +'<button onclick="immoQuizReset()" style="font-family:var(--mono);font-size:11px;padding:8px 20px;border-radius:6px;border:1px solid '+lvl.color+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">🔄 Recommencer</button>'
        +'<button onclick="immoQuizBackToHome()" style="font-family:var(--mono);font-size:11px;padding:8px 20px;border-radius:6px;border:1px solid var(--br-mid);background:transparent;color:var(--tx-mid);cursor:pointer;">← Choisir un niveau</button>'
        +'</div></div>';
      return;
    }
    var qi = S.order[S.current]; var q = S.questions[qi];
    var progressPct = Math.round((S.current/S.questions.length)*100);
    q = window.quizShuffleOpts ? window.quizShuffleOpts(q) : q;
    window._sqCurrent = q;
    var html = '<div style="background:var(--bg-card);border:1px solid var(--br-soft);border-radius:12px;padding:20px;">'
      +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">'
      +'<span style="font-size:10px;font-family:var(--mono);color:var(--tx-faint);">Question '+(S.current+1)+' / '+S.questions.length+'</span>'
      +'<span style="font-size:10px;font-family:var(--mono);color:'+lvl.color+';">Score : '+S.score+'</span>'
      +'</div>'
      +'<div style="height:3px;background:var(--bg-input);border-radius:2px;margin-bottom:16px;"><div style="height:3px;width:'+progressPct+'%;background:'+lvl.color+';border-radius:2px;transition:width .3s;"></div></div>'
      +'<div style="font-size:13px;font-weight:700;color:var(--tx-hi);line-height:1.5;margin-bottom:16px;">'+q.q+'</div>'
      +'<div style="display:flex;flex-direction:column;gap:8px;" id="immo-quiz-opts">';
    q.opts.forEach(function(opt, i) {
      html += '<button onclick="immoQuizAnswer('+i+')" id="immo-opt-'+i+'" style="text-align:left;padding:10px 14px;border-radius:8px;border:1px solid var(--br-mid);background:var(--bg-raised);color:var(--tx-mid);cursor:pointer;font-size:11px;font-family:var(--sans);" onmouseover="if(!this.dataset.locked)this.style.borderColor=\''+lvl.color+'\'" onmouseout="if(!this.dataset.locked)this.style.borderColor=\'var(--br-mid)\'"><span style="font-family:var(--mono);font-weight:700;color:var(--tx-faint);margin-right:8px;">'+String.fromCharCode(65+i)+'.</span>'+opt+'</button>';
    });
    html += '</div><div id="immo-quiz-feedback" style="margin-top:12px;"></div></div>';
    c.innerHTML = html;
  };

  window.immoQuizAnswer = function(idx) {
    var S = immoLvlQuizState; if (S.answered) return; S.answered = true;
    var lvl = IMMO_LEVELS.find(function(l){return l.id===S.levelId;})||IMMO_LEVELS[0];
    var qi = S.order[S.current]; var q = S.questions[qi];
    var correct = (idx === q.ans); if (correct) S.score++;
    q.opts.forEach(function(_, i) {
      var btn = document.getElementById('immo-opt-'+i); if (!btn) return;
      btn.dataset.locked='1'; btn.style.cursor='default';
      if (i===q.ans){btn.style.borderColor='var(--green)';btn.style.background='var(--green-bg)';btn.style.color='var(--green)';}
      else if (i===idx&&!correct){btn.style.borderColor='var(--red)';btn.style.background='var(--red-bg)';btn.style.color='var(--red)';}
    });
    var fb = document.getElementById('immo-quiz-feedback');
    if (fb) fb.innerHTML = '<div style="padding:10px 14px;background:'+(correct?'var(--green-bg)':'var(--red-bg)')+';border:1px solid '+(correct?'var(--green-bdr)':'var(--red-bdr)')+';border-radius:8px;margin-bottom:10px;">'
      +'<div style="font-size:12px;font-weight:700;color:'+(correct?'var(--green)':'var(--red)')+';margin-bottom:4px;">'+(correct?'✅ Correct !':'❌ Pas tout à fait…')+'</div>'
      +'<div style="font-size:11px;color:var(--tx-mid);line-height:1.6;">'+q.exp+'</div></div>'
      +'<button onclick="immoQuizNext()" style="width:100%;font-family:var(--mono);font-size:11px;padding:9px;border-radius:6px;border:1px solid '+lvl.color+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">'
      +(S.current+1<S.questions.length?'Question suivante →':'Voir mon score 🏁')+'</button>';
  };

  window.immoQuizNext = function() {
    var S = immoLvlQuizState; S.current++; S.answered=false;
    if (S.current>=S.questions.length) S.done=true;
    immoRenderLevelQuiz();
  };

  window.immoQuizReset = function() {
    var S = immoLvlQuizState; S.current=0; S.score=0; S.answered=false; S.done=false;
    S.order = immoShuffle(S.questions.map(function(_,i){return i;}));
    immoRenderLevelQuiz();
  };

  console.log('[Guide Immobilier] Module chargé ✓');
})();

/* ── Fullscreen ── */
function _fsUpdateBtn(isFullscreen) {
  var btn    = document.getElementById('fs-btn');
  var expand = document.getElementById('fs-icon-expand');
  var compress = document.getElementById('fs-icon-compress');
  var label  = document.getElementById('fs-label');
  if (!btn) return;
  if (isFullscreen) {
    if (expand)   expand.style.display   = 'none';
    if (compress) compress.style.display = 'block';
    if (label)    label.textContent      = 'QUITTER';
    btn.title = 'Quitter le plein écran (Échap)';
    btn.style.color       = 'var(--orange)';
    btn.style.borderColor = 'var(--orange-bdr)';
    btn.style.background  = 'var(--orange-bg)';
    btn.onmouseout = null;
  } else {
    if (expand)   expand.style.display   = 'block';
    if (compress) compress.style.display = 'none';
    if (label)    label.textContent      = 'PLEIN ÉCRAN';
    btn.title = 'Plein écran (F11)';
    btn.style.color       = 'var(--tx-muted)';
    btn.style.borderColor = 'var(--br-mid)';
    btn.style.background  = 'none';
    btn.onmouseout = function() {
      this.style.borderColor = 'var(--br-mid)';
      this.style.color       = 'var(--tx-muted)';
      this.style.background  = 'none';
    };
  }
}

AM.toggleFullscreen = function() {
  if (!document.fullscreenElement) {
    var el = document.documentElement;
    var req = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen;
    if (req) req.call(el).catch(function() {});
  } else {
    var ex = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
    if (ex) ex.call(document).catch(function() {});
  }
};

document.addEventListener('fullscreenchange',       function() { _fsUpdateBtn(!!document.fullscreenElement); });
document.addEventListener('webkitfullscreenchange', function() { _fsUpdateBtn(!!document.webkitFullscreenElement); });
document.addEventListener('mozfullscreenchange',    function() { _fsUpdateBtn(!!document.mozFullScreenElement); });

/* F11 key also triggers update */
document.addEventListener('keydown', function(e) {
  if (e.key === 'F11') { e.preventDefault(); AM.toggleFullscreen(); }
});

/* ═══════════════════════════════════════════════════
   SYSTÈME DE PROFILS — Lexique & Synchro
═══════════════════════════════════════════════════ */
window.atToggleLexique = function(){
  var body = document.getElementById('at-lexique-body');
  var btn  = document.getElementById('at-lexique-toggle');
  if(!body) return;
  body.classList.toggle('collapsed');
  btn.textContent = body.classList.contains('collapsed') ? '+' : '−';
};

/* Sync des data-page dans la sidebar pour le mode débutant */
(function(){
  var BEGINNER_NAV  = ['accueil','crypto','actions','alertes','debutant'];
  var INTER_HIDDEN  = [];

  function syncNav(profile){
    document.querySelectorAll('.sb-item[data-page]').forEach(function(btn){
      var page = btn.dataset.page;
      if(profile === 'beginner'){
        var allowed = BEGINNER_NAV.indexOf(page) !== -1;
        btn.style.opacity = allowed ? '' : '0.28';
        btn.style.pointerEvents = allowed ? '' : 'none';
      } else {
        btn.style.opacity = '';
        btn.style.pointerEvents = '';
      }
    });
  }

  /* Observer les changements de classe sur body */
  var obs = new MutationObserver(function(){
    var prof = window.AT_CURRENT_PROFILE || 'expert';
    syncNav(prof);
  });
  obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });

  /* Appliquer immédiatement si profil déjà chargé */
  if(window.AT_CURRENT_PROFILE) syncNav(window.AT_CURRENT_PROFILE);
})();

