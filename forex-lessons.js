(function() {

/* ─── DONNÉES : LEÇONS & QUIZ FOREX ─── */
var FRX_LEVELS = [
  {
    id: 'frx-debutant',
    label: 'Débutant',
    icon: '🟢',
    color: 'var(--green)',
    colorBg: 'var(--green-bg)',
    colorBdr: 'var(--green-bdr)',
    desc: 'Les bases du Forex — paires, pips, levier, ordres',
    xpPerLesson: 20,
    lessons: [
      {
        id: 'frx-deb-1',
        title: "Qu'est-ce que le Forex ?",
        emoji: '🌐',
        duration: '5 min',
        content: [
          { type: 'intro', text: "Le Forex (Foreign Exchange) est le plus grand marché financier au monde avec plus de 7 500 milliards de dollars échangés chaque jour. Contrairement à la bourse, il n'a pas de lieu central : les transactions se font de gré à gré (OTC) entre banques, institutions et traders particuliers, 24h/24, 5j/7." },
          { type: 'point', icon: '🏦', title: 'Qui trade le Forex ?', text: "Les banques centrales (Fed, BCE) interviennent pour stabiliser leur devise. Les banques commerciales assurent 70% du volume. Les hedge funds, entreprises multinationales et traders particuliers complètent le tableau." },
          { type: 'point', icon: '🌍', title: 'Pourquoi le Forex existe-t-il ?', text: "Initialement créé pour permettre aux entreprises d'échanger des devises lors du commerce international. Aujourd'hui, la majorité du volume est spéculatif — des traders cherchent à profiter des fluctuations de taux de change." },
          { type: 'point', icon: '⏰', title: 'Les 4 sessions mondiales', text: "Sydney (00h-08h), Tokyo (02h-10h), Londres (08h-17h), New York (13h-22h). La chevauchée Londres/New York (13h-17h heure Paris) est la période la plus liquide et volatile de la journée." },
          { type: 'example', label: 'Exemple concret', text: "Un importateur français achète 1M$ de marchandises américaines. Il doit vendre des euros et acheter des dollars — c'est une transaction Forex. Des millions de transactions similaires, plus la spéculation, forment le marché." },
          { type: 'key', text: "💡 Le Forex est décentralisé : il n'y a pas de 'bourse Forex'. Les prix sont déterminés par accord bilatéral entre participants. Votre broker vous donne accès à ce réseau interbancaire." }
        ],
        quiz: [
          { q: "Quel est le volume journalier approximatif du marché Forex ?", opts: ["750 millions de dollars", "75 milliards de dollars", "7 500 milliards de dollars", "75 000 milliards de dollars"], ans: 2, exp: "Le marché Forex traite environ 7 500 milliards de dollars par jour selon la Banque des Règlements Internationaux (BRI) — c'est 50 fois le volume des bourses mondiales combinées, ce qui en fait le marché le plus liquide au monde." },
          { q: "Quand est ouverte la session Forex la plus liquide et volatile ?", opts: ["La session de Tokyo seule (02h-10h)", "La session de Sydney (00h-08h)", "La chevauchée Londres/New York (13h-17h heure Paris)", "Le week-end, quand les banques sont fermées"], ans: 2, exp: "La chevauchée des sessions de Londres (la plus active en Europe) et New York (la plus active aux États-Unis) crée un pic de liquidité et de volatilité entre 13h et 17h heure de Paris. C'est le créneau privilégié des day traders." },
          { q: "Comment le marché Forex est-il organisé ?", opts: ["Via une bourse centrale comme le NYSE", "De gré à gré (OTC) entre participants sans lieu central", "Uniquement via des applications mobiles", "Par la Banque Mondiale"], ans: 1, exp: "Le Forex est un marché OTC (Over-The-Counter) : il n'y a pas de lieu central d'échange. Les transactions se font directement entre banques, institutions et brokers via des réseaux électroniques. C'est ce qui permet son fonctionnement 24h/24." }
        ]
      },
      {
        id: 'frx-deb-2',
        title: 'Paires de devises & Cotation',
        emoji: '💱',
        duration: '6 min',
        content: [
          { type: 'intro', text: "Sur le Forex, on n'achète jamais une devise seule — on échange toujours une devise contre une autre. C'est le concept de paire de devises. EUR/USD signifie : vous achetez des euros en vendant des dollars (ou l'inverse)." },
          { type: 'point', icon: '📌', title: 'Devise de base et devise de cotation', text: "Dans EUR/USD, EUR est la devise de base et USD la devise de cotation. Le cours indique combien d'USD il faut pour acheter 1 EUR. EUR/USD = 1.0850 → il faut 1.0850 dollars pour acheter 1 euro." },
          { type: 'point', icon: '⭐', title: 'Les paires majeures', text: "EUR/USD (23%), USD/JPY (17%), GBP/USD (13%), USD/CHF, AUD/USD, USD/CAD, NZD/USD — toutes impliquent le dollar US. Ce sont les paires les plus liquides, avec les spreads les plus faibles." },
          { type: 'point', icon: '🔀', title: 'Paires croisées (Cross)', text: "Paires sans dollar : EUR/GBP, EUR/JPY, GBP/JPY… Les crosses sont moins liquides et ont des spreads plus larges. GBP/JPY est surnommée 'The Dragon' — très volatile, déconseillée aux débutants." },
          { type: 'example', label: 'Lecture d\'un cours', text: "EUR/USD = Bid 1.0848 / Ask 1.0850. Bid = prix auquel vous VENDEZ (le broker achète). Ask = prix auquel vous ACHETEZ (le broker vend). La différence (0.0002 = 2 pips) est le spread — la rémunération du broker." },
          { type: 'key', text: "💡 Le dollar américain est impliqué dans 88% de toutes les transactions Forex. Surveiller la force ou faiblesse du dollar (indice DXY) est fondamental pour tout trader Forex." }
        ],
        quiz: [
          { q: "Dans la paire GBP/USD = 1.2650, que signifie ce cours ?", opts: ["Il faut 1.2650 livres pour acheter 1 dollar", "Il faut 1.2650 dollars pour acheter 1 livre sterling", "Le GBP a baissé de 1.2650% face au USD", "Le spread est de 1.2650 pip"], ans: 1, exp: "Dans GBP/USD, GBP est la devise de base. Le cours 1.2650 signifie qu'il faut 1.2650 dollars américains pour acheter 1 livre sterling. Si ce cours monte à 1.2700, la livre s'est appréciée face au dollar." },
          { q: "Quelle est la paire Forex la plus échangée au monde ?", opts: ["GBP/USD", "USD/JPY", "EUR/USD", "EUR/GBP"], ans: 2, exp: "EUR/USD représente environ 23% de l'ensemble des transactions Forex quotidiennes. Sa liquidité exceptionnelle garantit des spreads très faibles (souvent 0.1 à 0.5 pip) et une grande stabilité d'exécution." },
          { q: "Qu'est-ce qu'une paire 'croisée' (cross) ?", opts: ["Une paire avec deux devises identiques", "Une paire de devises n'impliquant pas le dollar américain", "Une paire échangée uniquement la nuit", "Une paire avec un spread très faible"], ans: 1, exp: "Une paire croisée (ou cross) est une paire de devises qui n'implique pas le dollar américain. Exemples : EUR/GBP, EUR/JPY, GBP/JPY. Ces paires sont généralement moins liquides que les paires majeures et ont des spreads plus larges." }
        ]
      },
      {
        id: 'frx-deb-3',
        title: 'Pip, Lot & Taille de position',
        emoji: '📐',
        duration: '7 min',
        content: [
          { type: 'intro', text: "Le pip et le lot sont les unités fondamentales du Forex. Comprendre leur relation est indispensable pour calculer vos gains, pertes et le risque de chaque trade avant de l'ouvrir." },
          { type: 'point', icon: '🔬', title: 'Le Pip (Price Interest Point)', text: "Un pip est la plus petite variation standardisée d'une paire. Pour la plupart des paires (EUR/USD, GBP/USD…), 1 pip = 0.0001 (4ème décimale). Exception : USD/JPY et paires avec JPY, 1 pip = 0.01 (2ème décimale)." },
          { type: 'point', icon: '📦', title: 'Les tailles de lot', text: "Lot standard = 100 000 unités de la devise de base. Mini-lot = 10 000 unités. Micro-lot = 1 000 unités. Nano-lot = 100 unités. Plus le lot est grand, plus la valeur d'un pip en $ est élevée." },
          { type: 'point', icon: '💵', title: 'Valeur d\'un pip', text: "Sur EUR/USD avec un lot standard : 1 pip = 10$. Avec un mini-lot : 1 pip = 1$. Avec un micro-lot : 1 pip = 0.10$. Les débutants commencent avec des micro-lots pour maîtriser les risques pendant l'apprentissage." },
          { type: 'example', label: 'Calcul de P&L', text: "Vous achetez 1 mini-lot EUR/USD à 1.0800, vous vendez à 1.0850 → gain de 50 pips. Valeur pip sur mini-lot = 1$. Gain total = 50 × 1$ = 50$. Si vous aviez utilisé un lot standard = 50 × 10$ = 500$." },
          { type: 'key', text: "⚠️ Règle d'or : ne jamais risquer plus de 1-2% de votre capital sur un seul trade. Avec 1 000€ de capital, risque max = 10 à 20€. Calculez toujours votre taille de position AVANT d'entrer." }
        ],
        quiz: [
          { q: "Combien vaut 1 pip sur EUR/USD avec un lot standard (100 000 €) ?", opts: ["1 centime ($0.01)", "1 dollar ($1.00)", "10 dollars ($10.00)", "100 dollars ($100.00)"], ans: 2, exp: "Sur EUR/USD avec 1 lot standard (100 000 €), 1 pip (0.0001) vaut environ 10$. Avec un mini-lot (10 000 €), 1 pip = 1$. Avec un micro-lot (1 000 €), 1 pip = 0.10$. C'est pour ça que les débutants commencent par les micro-lots." },
          { q: "Sur USD/JPY, où se trouve un pip ?", opts: ["À la 4ème décimale (0.0001)", "À la 2ème décimale (0.01)", "À la 1ère décimale (0.1)", "Au nombre entier (1)"], ans: 1, exp: "Les paires impliquant le yen japonais (JPY) cotent avec seulement 2 décimales. Sur USD/JPY = 149.50, un pip correspond à 0.01 (2ème décimale). Si USD/JPY passe de 149.50 à 149.51, il a bougé d'un pip." },
          { q: "Avec un capital de 500€, quel lot est recommandé pour un débutant ?", opts: ["1 lot standard (100 000 unités)", "1 mini-lot (10 000 unités)", "1 micro-lot (1 000 unités)", "Peu importe, le levier compense"], ans: 2, exp: "Avec 500€ de capital, utiliser des micro-lots (1 000 unités) où 1 pip vaut 0.10$ est idéal. Cela permet d'apprendre la gestion du risque sans mettre son capital en danger. Un lot standard ou mini-lot serait catastrophique avec si peu de capital." }
        ]
      }
    ]
  },
  {
    id: 'frx-intermediaire',
    label: 'Intermédiaire',
    icon: '🟡',
    color: 'var(--blue)',
    colorBg: 'var(--blue-bg)',
    colorBdr: 'var(--blue-bdr)',
    desc: 'Analyse technique, fondamentale, gestion du risque — passez au niveau supérieur',
    xpPerLesson: 40,
    lessons: [
      {
        id: 'frx-int-1',
        title: 'Analyse Technique Forex',
        emoji: '📊',
        duration: '9 min',
        content: [
          { type: 'intro', text: "L'analyse technique (AT) consiste à anticiper les mouvements futurs des cours en étudiant les graphiques passés. Sur le Forex, l'AT est particulièrement populaire car le marché est très technique — les niveaux clés sont respectés par des millions de traders simultanément." },
          { type: 'point', icon: '📏', title: 'Supports & Résistances', text: "Un support est un niveau de prix où la demande est suffisamment forte pour stopper une baisse. Une résistance est le niveau où l'offre stoppe une hausse. Ces niveaux sont les fondements de tout trade : on achète sur support, on vend sur résistance, avec stop en dessous/au-dessus." },
          { type: 'point', icon: '📈', title: 'Moyennes Mobiles (MA)', text: "La MA50 (50 périodes) et MA200 (200 périodes) sont les plus utilisées. Un croisement MA50 au-dessus de MA200 ('Golden Cross') est un signal haussier. La MA200 sur le Daily est souvent un support ou résistance majeur." },
          { type: 'point', icon: '🔄', title: 'RSI & MACD', text: "RSI (Relative Strength Index) : mesure la force des mouvements. >70 = suracheté (vente potentielle), <30 = survendu (achat potentiel). MACD : détecte les croisements de tendance et les divergences par rapport au prix." },
          { type: 'point', icon: '🕯️', title: 'Figures chartistes clés', text: "Tête-épaules (signal de retournement), double top/bottom, triangles, drapeaux, fanions… Ces patterns se répètent sur tous les timeframes et permettent d'anticiper les ruptures (breakouts) et retournements." },
          { type: 'example', label: 'Setup type de swing trader', text: "EUR/USD est sur un support majeur en Daily. RSI à 35 (survendu). Bougie de confirmation en H4 (ex: engulfing haussier). Entrée au-dessus de la bougie de confirmation, stop en dessous du support, target sur la résistance suivante. R/R = 1:3." },
          { type: 'key', text: "💡 Les indicateurs suivent les prix, ils ne les prédisent pas. Utilisez 2-3 indicateurs maximum pour confirmer un setup — pas 10. La confluence (plusieurs signaux dans le même sens) augmente la probabilité de succès." }
        ],
        quiz: [
          { q: "Qu'est-ce qu'un 'Golden Cross' en analyse technique ?", opts: ["Un pattern de chandeliers japonais rare", "Un croisement de la MA50 au-dessus de la MA200 — signal haussier", "Un croisement de la MA200 au-dessus de la MA50 — signal baissier", "Le prix qui atteint un plus haut historique"], ans: 1, exp: "Le Golden Cross se produit quand la moyenne mobile à 50 périodes croise au-dessus de la moyenne mobile à 200 périodes. C'est un signal haussier fort, souvent suivi par une tendance haussière significative. L'inverse — MA50 qui passe sous MA200 — s'appelle le Death Cross (signal baissier)." },
          { q: "Le RSI est à 28 sur EUR/USD Daily. Qu'indique-t-il ?", opts: ["Le marché est suracheté — signal de vente", "Le marché est survendu — signal d'achat potentiel", "Le RSI est invalide sous 30", "C'est un signal neutre"], ans: 1, exp: "Un RSI inférieur à 30 signale que la paire est en territoire survendu — les vendeurs ont peut-être exagéré la baisse et un rebond est possible. Cependant, le RSI seul n'est pas suffisant : attendez une confirmation chartiste (bougie de retournement, support) avant d'entrer." },
          { q: "Qu'est-ce qu'une 'divergence' en analyse technique ?", opts: ["Deux indicateurs qui donnent des signaux opposés", "Le prix fait un nouveau plus haut mais l'indicateur (RSI/MACD) fait un plus haut moins élevé — signal de faiblesse", "La différence entre le Bid et l'Ask", "Un breakout de résistance avec un fort volume"], ans: 1, exp: "Une divergence baissière se produit quand le prix atteint un nouveau sommet mais que l'indicateur (RSI, MACD) atteint un sommet plus bas. Cela signale un affaiblissement de la tendance haussière — les traders professionnels l'utilisent pour anticiper les retournements." }
        ]
      },
      {
        id: 'frx-int-2',
        title: 'Analyse Fondamentale & Banques Centrales',
        emoji: '🏛️',
        duration: '8 min',
        content: [
          { type: 'intro', text: "L'analyse fondamentale consiste à évaluer la valeur 'réelle' d'une devise en analysant les facteurs économiques et politiques qui l'influencent. Sur le Forex, les banques centrales sont les acteurs les plus influents." },
          { type: 'point', icon: '🏦', title: 'Les Banques Centrales', text: "Fed (dollar US), BCE (euro), BoE (livre sterling), BoJ (yen), SNB (franc suisse), RBA (dollar australien)… Leurs décisions de taux d'intérêt sont les événements les plus impactants du calendrier Forex. Une hausse de taux → devise plus forte (en général)." },
          { type: 'point', icon: '📊', title: 'Indicateurs économiques clés', text: "NFP (Non-Farm Payrolls) — emploi US, 1er vendredi du mois : très volatil. CPI (inflation) — gouverne les décisions de taux. PIB (croissance) — mesure la santé économique. PMI (activité manufacturière) — indicateur avancé." },
          { type: 'point', icon: '💹', title: 'Les différentiels de taux', text: "La théorie de la Parité des Taux d'Intérêt stipule que les capitaux coulent vers les devises aux taux d'intérêt les plus élevés. C'est la base du carry trade : on vend une devise à taux bas (JPY, CHF) pour acheter une devise à taux élevé (AUD, NZD)." },
          { type: 'point', icon: '🌐', title: 'Sentiment de risque (Risk-on / Risk-off)', text: "Risk-on (marché optimiste) : capitaux vers actifs risqués (AUD, NZD, devises émergentes) → JPY et CHF s'affaiblissent. Risk-off (peur, crise) : capitaux vers valeurs refuges (JPY, CHF, USD, or) → devises risquées s'effondrent." },
          { type: 'example', label: 'Exemple : Fed et USD', text: "La Fed augmente ses taux de 0.25%. Impact immédiat : USD s'apprécie car les obligations US deviennent plus attractives pour les investisseurs étrangers. EUR/USD baisse, USD/JPY monte. C'est la réaction 'buy the dollar' qui suit systématiquement les hawkish Fed." },
          { type: 'key', text: "⚠️ Les événements fondamentaux (NFP, CPI, décisions de taux) provoquent des pics de volatilité avec des spreads très élargis et des slippages. Évitez d'avoir des positions ouvertes lors de ces publications, surtout en débutant." }
        ],
        quiz: [
          { q: "Que signifie une politique monétaire 'hawkish' pour une devise ?", opts: ["La banque centrale va baisser ses taux — devise affaiblie", "La banque centrale va monter ses taux — devise renforcée", "La banque centrale intervient directement sur le marché", "La banque centrale suspend ses opérations"], ans: 1, exp: "Une position 'hawkish' (faucon) indique qu'une banque centrale est prête à augmenter ses taux pour lutter contre l'inflation. Des taux plus élevés attirent les capitaux étrangers (meilleure rémunération) → la devise s'apprécie. L'opposé, 'dovish' (colombe), signale une baisse de taux → devise affaiblie." },
          { q: "Pourquoi le yen japonais (JPY) est-il considéré comme une valeur refuge ?", opts: ["Le Japon est une grande puissance militaire", "Le Japon est un créancier net mondial — en période de crise, les capitaux japonais rapatrient au pays, appréciant le yen", "La BoJ maintient les taux très élevés", "Le yen est garanti par des réserves d'or importantes"], ans: 1, exp: "Le Japon est le plus grand créancier net mondial. Lors des crises, les investisseurs japonais rapatrient leurs capitaux → forte demande de yens. De plus, les taux japonais très bas font du JPY la devise de financement favorite du carry trade. En Risk-off, ce carry se dénoue massivement → JPY s'apprécie fortement." },
          { q: "Le rapport NFP (Non-Farm Payrolls) est publié. Que faut-il faire ?", opts: ["Ouvrir de grosses positions pour profiter de la volatilité", "Rester à l'écart ou réduire les positions — spreads très larges, mouvements imprévisibles", "Acheter du dollar dans tous les cas", "Fermer uniquement les positions perdantes"], ans: 1, exp: "Le NFP est l'un des événements les plus volatils du calendrier Forex. La paire EUR/USD peut bouger de 100-200 pips en quelques secondes. Les spreads s'élargissent massivement (10-30 pips). Les débutants doivent absolument éviter d'avoir des positions ouvertes lors des publications majeures." }
        ]
      },
      {
        id: 'frx-int-3',
        title: 'Gestion du Risque & Money Management',
        emoji: '🛡️',
        duration: '10 min',
        content: [
          { type: 'intro', text: "La gestion du risque est LA compétence numéro 1 du trader rentable. On peut gagner seulement 40% de ses trades et être très profitable si le money management est maîtrisé. À l'inverse, un trader qui gagne 60% de ses trades peut perdre tout son capital avec un mauvais money management." },
          { type: 'point', icon: '📏', title: 'La règle des 1-2%', text: "Ne jamais risquer plus de 1-2% de son capital total sur un seul trade. Avec 5 000€ : risque max par trade = 50 à 100€. Cette règle permet de survivre à 50 trades perdants consécutifs sans être ruiné — ce qui est psychologiquement impossible pour quitter." },
          { type: 'point', icon: '⚖️', title: 'Le ratio Risque/Récompense (R/R)', text: "Ne prendre que des trades avec un R/R d'au moins 1:2 (risquez 50 pips pour en gagner 100). Avec un R/R de 1:2 et un win rate de 40%, vous êtes encore profitable. C'est la magie du money management asymétrique." },
          { type: 'point', icon: '📍', title: 'Placement du Stop Loss', text: "Le stop doit être logique — au-delà d'un support, résistance ou plus haut/bas récent. Jamais basé sur un montant arbitraire. La taille de position se calcule APRÈS avoir défini le stop pour ne jamais dépasser votre risque max en euros." },
          { type: 'point', icon: '🎯', title: 'Take Profit & Trailing Stop', text: "Le Take Profit doit être placé avant la résistance suivante (pas dessus). Un trailing stop (stop qui suit le prix) permet de laisser courir les gains tout en protégeant une partie du profit déjà réalisé." },
          { type: 'example', label: 'Calcul de taille de position', text: "Capital : 2 000€. Risque max : 2% = 40€. Stop Loss : 30 pips. Sur micro-lot EUR/USD, 1 pip = 0.10$. Taille de position = 40$ ÷ (30 pips × 0.10$/pip) = 40 ÷ 3 ≈ 13 micro-lots. À n'ouvrir que 13 micro-lots maximum sur ce trade." },
          { type: 'key', text: "💡 Formule universelle : Taille position = (Capital × % de risque) ÷ (Stop en pips × Valeur pip). Calculez TOUJOURS avant d'ouvrir. Les positions ouvertes sans calcul préalable sont la cause principale des blow-ups de compte." }
        ],
        quiz: [
          { q: "Vous avez 3 000€ de capital et voulez risquer 1% par trade. Votre stop est à 50 pips. Sur un micro-lot (1 pip = 0.10$), combien de micro-lots pouvez-vous ouvrir ?", opts: ["1 micro-lot", "3 micro-lots", "6 micro-lots", "30 micro-lots"], ans: 2, exp: "Risque max = 3 000€ × 1% = 30€ ≈ 30$. Risque par micro-lot = 50 pips × 0.10$/pip = 5$. Nombre de micro-lots = 30$ ÷ 5$ = 6 micro-lots. Cette formule garantit que même si le trade est perdant, vous ne perdez que 30$ — soit 1% de votre capital." },
          { q: "Avec un ratio R/R de 1:3 et un win rate de 35%, votre trading est-il profitable ?", opts: ["Non, il faut au moins 50% de win rate", "Oui, car l'espérance mathématique est positive : (0.35 × 3) - (0.65 × 1) = +0.40", "Impossible à calculer sans plus de données", "Non, un R/R de 1:3 est trop difficile à atteindre"], ans: 1, exp: "Espérance = (35% × 3 unités gagnées) - (65% × 1 unité perdue) = 1.05 - 0.65 = +0.40. Pour chaque euro risqué, vous gagnez en moyenne 0.40€ sur le long terme. Avec 1:3, même un win rate de 26% est rentable ! C'est la puissance d'un bon ratio R/R." },
          { q: "Où placer logiquement un stop loss sur un achat EUR/USD ?", opts: ["Juste au-dessus de la résistance suivante", "Sous le support ou plus bas récent qui a justifié l'entrée", "Exactement 20 pips sous le prix d'entrée dans tous les cas", "À la fin de la journée, quel que soit le cours"], ans: 1, exp: "Un stop loss logique se place sous le niveau technique qui invalide l'analyse : sous le support qui a déclenché l'achat, sous le plus bas de la bougie d'entrée, ou sous un plus bas récent significatif. Un stop basé sur un montant arbitraire (toujours 20 pips) est une erreur — ignorez la logique du marché." }
        ]
      }
    ]
  },
  {
    id: 'frx-avance',
    label: 'Avancé',
    icon: '🔴',
    color: 'var(--orange)',
    colorBg: 'var(--orange-bg)',
    colorBdr: 'var(--orange-bdr)',
    desc: 'Price Action, Carry Trade, SMC, inter-marchés — niveau professionnel',
    xpPerLesson: 60,
    lessons: [
      {
        id: 'frx-adv-1',
        title: 'Price Action & Structure de Marché',
        emoji: '🕯️',
        duration: '10 min',
        content: [
          { type: 'intro', text: "La Price Action (PA) est l'art de trader en lisant directement les chandeliers et la structure du marché, sans indicateurs. C'est la méthode utilisée par la majorité des traders institutionnels. Comprendre pourquoi le prix bouge, pas seulement où il va." },
          { type: 'point', icon: '🏗️', title: 'Structure de marché : HH, HL, LH, LL', text: "Higher High (HH) + Higher Low (HL) = tendance haussière. Lower High (LH) + Lower Low (LL) = tendance baissière. La rupture d'un HL (un HL qui ne tient pas) signale un retournement potentiel de la tendance haussière. La structure est plus fiable sur les grands timeframes (H4, Daily)." },
          { type: 'point', icon: '🎯', title: 'Zones de liquidité (SMC)', text: "Le concept Smart Money (SMC) : les institutions placent leurs ordres dans des zones de liquidité (regroupement de stops des traders retail). Les 'equal highs/lows' sont des zones où des stops sont concentrés. Le prix y est souvent aspiré avant de se retourner." },
          { type: 'point', icon: '🕳️', title: 'Fair Value Gap (FVG)', text: "Un FVG (gap de valeur équitable) se forme lors d'un mouvement violent avec une bougie laissant un vide non recouvert. Les institutions 'remplissent' souvent ces gaps avant de continuer dans la direction initiale. Utilisé pour placer des ordres limit en retrace." },
          { type: 'point', icon: '🔑', title: 'Order Blocks', text: "Un Order Block est la dernière bougie contrainte avant un fort mouvement impulsif. C'est l'endroit où les institutionnels ont placé leurs ordres. Le prix revient souvent tester cet order block — c'est un point d'entrée haute probabilité pour le trader avisé." },
          { type: 'example', label: 'Setup Price Action complet', text: "EUR/USD en tendance haussière (HH + HL en Daily). Retrace vers un order block bullish en H4, qui coïncide avec un FVG non rempli. Bougie de confirmation (engulfing haussier) sur H1. Entrée au breakout de la bougie de confirmation, stop sous l'order block, target au dernier HH. R/R = 1:4." },
          { type: 'key', text: "💡 La Price Action se lis du grand timeframe vers le petit. Daily donne la direction, H4 identifie la zone d'entrée, H1 ou M15 donne le signal d'entrée précis. Cette approche 'top-down' est utilisée par les traders institutionnels." }
        ],
        quiz: [
          { q: "Que signifie une structure de marché avec une série de Higher High (HH) et Higher Low (HL) ?", opts: ["Tendance baissière — le marché fait des sommets et creux de plus en plus bas", "Tendance haussière — le marché fait des sommets et creux de plus en plus hauts", "Marché en range horizontal sans tendance", "Signal de retournement imminent"], ans: 1, exp: "Une série de HH (sommets de plus en plus hauts) et HL (creux de plus en plus hauts) définit une tendance haussière structurée. C'est la base de la lecture Price Action. La tendance reste intacte tant que les HL ne sont pas cassés à la baisse. Une rupture d'un HL invalide la structure haussière." },
          { q: "Qu'est-ce qu'un 'Order Block' en Smart Money Concept (SMC) ?", opts: ["Un bloc de résistance horizontal très fort", "La dernière bougie contrainte (opposée) avant un fort mouvement impulsif — zone d'ordres institutionnels", "Un groupe de 10 trades simultanés", "Le carnet d'ordres visible sur la plateforme"], ans: 1, exp: "Un Order Block est identifié comme la dernière bougie baissière avant un fort mouvement haussier (bullish OB) ou la dernière bougie haussière avant un fort mouvement baissier (bearish OB). Ces zones représentent où les institutions ont concentré leurs ordres — le prix y revient souvent pour 'chercher' la liquidité." },
          { q: "Comment analyser correctement le marché Forex en Price Action ?", opts: ["Uniquement sur le M1 pour plus de signaux", "Top-down : Daily → H4 → H1/M15, du plus grand au plus petit timeframe", "Aléatoirement sur n'importe quel timeframe", "Uniquement sur le timeframe qui donne les signaux les plus fréquents"], ans: 1, exp: "L'analyse top-down est fondamentale : le Daily donne le contexte et la direction de la tendance, le H4 identifie les zones clés et la structure intermédiaire, et le H1 ou M15 fournit le signal d'entrée précis. Trader contre la tendance du Daily est une erreur très commune chez les débutants." }
        ]
      },
      {
        id: 'frx-adv-2',
        title: 'Corrélations & Trading Inter-marchés',
        emoji: '🔗',
        duration: '9 min',
        content: [
          { type: 'intro', text: "Les marchés financiers ne fonctionnent pas en silos. Le Forex, les actions, les obligations, l'or et le pétrole sont interconnectés. Comprendre ces corrélations permet d'avoir une vue macroéconomique qui donne un avantage décisif." },
          { type: 'point', icon: '🔗', title: 'Corrélations entre paires Forex', text: "EUR/USD et GBP/USD ont une corrélation positive élevée (~90%) — elles bougent souvent dans le même sens. EUR/USD et USD/CHF ont une corrélation inverse forte (~-95%). Ouvrir EUR/USD long et GBP/USD long en même temps = doubler son exposition au dollar." },
          { type: 'point', icon: '🥇', title: 'Or (XAU/USD) et USD', text: "L'or est libellé en dollars. Dollar fort → or moins cher pour les étrangers → pression baissière sur l'or. Cette corrélation inverse USD/or est l'une des plus fiables du marché. L'or est aussi une valeur refuge : en Risk-off, l'or et le JPY montent ensemble." },
          { type: 'point', icon: '🛢️', title: 'Pétrole et devises pétrolières', text: "CAD (dollar canadien) et NOK (couronne norvégienne) sont fortement corrélés au prix du pétrole — leurs pays en sont de grands exportateurs. Pétrole monte → USD/CAD baisse (CAD s'apprécie). C'est une corrélation souvent plus fiable que l'analyse pure d'USD/CAD." },
          { type: 'point', icon: '📊', title: 'Obligations et Forex', text: "Les rendements obligataires US (Treasury 10Y) et le dollar sont souvent corrélés positivement. Quand les taux longs US montent → dollar monte. La courbe des taux (2Y vs 10Y) anticipe les décisions de la Fed — un incontournable de l'analyse macro." },
          { type: 'example', label: 'Trading inter-marchés en pratique', text: "Le pétrole WTI monte de 3% sur une journée. Conclusion : le CAD devrait s'apprécier → USD/CAD devrait baisser. Vérification : l'analyse technique sur USD/CAD montre un double top en résistance majeure. Confluence parfaite → short USD/CAD avec conviction élevée." },
          { type: 'key', text: "💡 Les corrélations ne sont pas permanentes — elles se renforcent et s'affaiblissent selon le contexte de marché. Calculez les corrélations récentes (30 à 90 jours) plutôt que de vous fier à des corrélations historiques figées." }
        ],
        quiz: [
          { q: "EUR/USD et USD/CHF ont historiquement une corrélation de -95%. Que cela signifie-t-il pour votre trading ?", opts: ["Les deux paires bougent exactement dans le même sens", "Quand EUR/USD monte, USD/CHF baisse généralement — acheter les deux en même temps est redondant", "Les deux paires ne sont pas liées", "Il faut toujours trader ces deux paires ensemble"], ans: 1, exp: "Une corrélation de -95% signifie que les paires bougent dans des directions opposées presque tout le temps. Si vous achetez EUR/USD ET achetez EUR/CHF, vous avez une exposition similaire. Trader EUR/USD long + USD/CHF long revient à se couvrir inutilement (les gains de l'un annulent les pertes de l'autre)." },
          { q: "Le prix du pétrole monte fortement. Quel impact attendez-vous sur USD/CAD ?", opts: ["USD/CAD devrait monter car le pétrole est libellé en dollars", "USD/CAD devrait baisser car le CAD s'apprécie avec la hausse du pétrole (Canada = grand exportateur)", "Aucun impact — le Forex et le pétrole ne sont pas liés", "USD/CAD devrait monter car la demande de dollars augmente"], ans: 1, exp: "Le Canada est l'un des plus grands exportateurs de pétrole au monde. Quand le pétrole monte, les revenus d'exportation du Canada en dollars augmentent → plus de CAD achetés → CAD s'apprécie → USD/CAD baisse. Cette corrélation pétrole/CAD est l'une des plus robustes du marché Forex." },
          { q: "Que signifie un environnement 'Risk-off' pour le yen japonais (JPY) et l'or ?", opts: ["Les deux baissent car les investisseurs cherchent du rendement", "Les deux montent car ce sont des valeurs refuges recherchées en période d'incertitude", "Le JPY monte mais l'or baisse", "Aucun impact car ce sont des actifs différents"], ans: 1, exp: "En période Risk-off (crise, panique, incertitude), les investisseurs fuient les actifs risqués vers les valeurs refuges. JPY (rapatriement du carry trade) et or (valeur refuge universelle) montent ensemble. C'est une corrélation inter-marchés puissante. USD/JPY et XAU/USD ont tendance à bouger de concert dans ces conditions." }
        ]
      }
    ]
  }
];

/* ─── Compiler tous les quiz par niveau ─── */
var FRX_QUIZ_BY_LEVEL = {};
FRX_LEVELS.forEach(function(lvl) {
  FRX_QUIZ_BY_LEVEL[lvl.id] = [];
  lvl.lessons.forEach(function(les) {
    les.quiz.forEach(function(q) { FRX_QUIZ_BY_LEVEL[lvl.id].push(q); });
  });
});

/* ─── État XP & Progression ─── */
var frxState = {};
function frxLoadState() {
  try { frxState = JSON.parse(localStorage.getItem('frx_academy_v1') || '{}'); } catch(e) { frxState = {}; }
}
function frxSaveState() {
  try { localStorage.setItem('frx_academy_v1', JSON.stringify(frxState)); } catch(e) {}
}
window.frxSaveState = frxSaveState;
frxLoadState();

/* ─── RENDER LEÇONS HOME ─── */
function frxRenderLevelsHome() {
  var c = document.getElementById('frx-levels-home');
  if (!c) return;
  var html = '';
  FRX_LEVELS.forEach(function(lvl) {
    var completedLessons = lvl.lessons.filter(function(l) { return frxState['lesson_' + l.id]; }).length;
    var pct = Math.round((completedLessons / lvl.lessons.length) * 100);
    var totalXP = completedLessons * lvl.xpPerLesson;
    html += '<div style="background:var(--bg-card);border:1px solid '+lvl.colorBdr+';border-radius:12px;padding:20px;margin-bottom:16px;">'
      + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">'
      + '<span style="font-size:22px;">'+lvl.icon+'</span>'
      + '<div><div style="font-size:14px;font-weight:700;color:'+lvl.color+';font-family:var(--mono);">'+lvl.label+'</div>'
      + '<div style="font-size:11px;color:var(--tx-muted);">'+lvl.desc+'</div></div>'
      + '<div style="margin-left:auto;text-align:right;">'
      + '<div style="font-size:11px;font-family:var(--mono);color:'+lvl.color+';">'+completedLessons+'/'+lvl.lessons.length+' leçons</div>'
      + '<div style="font-size:10px;color:var(--tx-faint);">'+totalXP+' XP</div></div>'
      + '</div>'
      + '<div style="height:4px;background:var(--bg-input);border-radius:2px;margin-bottom:14px;"><div style="height:4px;width:'+pct+'%;background:'+lvl.color+';border-radius:2px;transition:width .4s;"></div></div>'
      + '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:8px;">';
    lvl.lessons.forEach(function(les) {
      var done = !!frxState['lesson_' + les.id];
      html += '<div onclick="frxOpenLesson(\''+lvl.id+'\',\''+les.id+'\')" style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--bg-raised);border:1px solid '+(done?lvl.colorBdr:'var(--br-soft)')+';border-radius:8px;cursor:pointer;transition:border-color .15s;" onmouseover="this.style.borderColor=\''+lvl.color+'\'" onmouseout="this.style.borderColor=\''+(done?lvl.colorBdr:'var(--br-soft)')+'\'">'
        + '<span style="font-size:18px;">'+les.emoji+'</span>'
        + '<div style="flex:1;min-width:0;">'
        + '<div style="font-size:11px;font-weight:700;color:var(--tx-hi);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+les.title+'</div>'
        + '<div style="font-size:10px;color:var(--tx-faint);">'+les.duration+' · '+les.quiz.length+' questions · '+lvl.xpPerLesson+' XP</div>'
        + '</div>'
        + (done ? '<span style="font-size:16px;">✅</span>' : '<span style="font-size:11px;font-family:var(--mono);color:'+lvl.color+';padding:2px 6px;border:1px solid '+lvl.colorBdr+';border-radius:4px;">START</span>')
        + '</div>';
    });
    html += '</div></div>';
  });
  c.innerHTML = html;
}

/* ─── OUVRIR UNE LEÇON ─── */
window.frxOpenLesson = function(levelId, lessonId) {
  var lvl = FRX_LEVELS.find(function(l) { return l.id === levelId; });
  var les = lvl ? lvl.lessons.find(function(l) { return l.id === lessonId; }) : null;
  if (!lvl || !les) return;
  var home = document.getElementById('frx-lessons-home');
  var view = document.getElementById('frx-lesson-view');
  var bc   = document.getElementById('frx-lesson-breadcrumb');
  if (home) home.style.display = 'none';
  if (view) view.style.display = '';
  if (bc) bc.textContent = lvl.label + ' › ' + les.title;
  var c = document.getElementById('frx-lesson-content');
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
  // Quiz intégré
  html += '<div style="margin-top:20px;border-top:1px solid var(--br-soft);padding-top:20px;">'
    + '<div style="font-size:11px;font-family:var(--mono);font-weight:700;color:'+lvl.color+';letter-spacing:1px;margin-bottom:14px;">🧠 QUIZ DE LA LEÇON ('+les.quiz.length+' QUESTIONS)</div>'
    + '<div id="frx-inline-quiz-'+les.id+'"></div></div>';
  html += '</div></div>';
  // Bouton marquer comme terminé
  html += '<div style="margin-top:16px;text-align:center;">'
    + '<button onclick="frxMarkDone(\''+levelId+'\',\''+lessonId+'\')" style="font-family:var(--mono);font-size:11px;padding:10px 28px;border-radius:6px;border:1px solid '+lvl.colorBdr+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">✅ Marquer comme terminé +'+lvl.xpPerLesson+' XP</button>'
    + '</div>';
  c.innerHTML = html;
  frxRenderInlineQuiz(les, lvl);
};

/* ─── QUIZ INLINE dans une leçon ─── */
var frxInlineQuizStates = {};
function frxRenderInlineQuiz(les, lvl) {
  var containerId = 'frx-inline-quiz-' + les.id;
  var container = document.getElementById(containerId);
  if (!container) return;
  if (!frxInlineQuizStates[les.id]) frxInlineQuizStates[les.id] = { current: 0, answered: false, score: 0, done: false };
  var state = frxInlineQuizStates[les.id];
  if (state.done) {
    var pct = Math.round((state.score / les.quiz.length) * 100);
    container.innerHTML = '<div style="text-align:center;padding:20px;background:var(--bg-raised);border:1px solid var(--br-soft);border-radius:10px;">'
      + '<div style="font-size:28px;font-family:var(--mono);font-weight:700;color:'+(pct>=80?'var(--green)':pct>=50?'var(--yellow)':'var(--red)')+';margin-bottom:6px;">'+state.score+'/'+les.quiz.length+'</div>'
      + '<div style="font-size:12px;color:var(--tx-mid);margin-bottom:12px;">'+(pct>=80?'Parfait ! 🎉':pct>=50?'Bien joué 👍':'Relisez la leçon 📚')+'</div>'
      + '<button onclick="frxResetInlineQuiz(\''+les.id+'\')" style="font-family:var(--mono);font-size:10px;padding:6px 16px;border-radius:6px;border:1px solid var(--br-mid);background:transparent;color:var(--tx-mid);cursor:pointer;">🔄 Recommencer</button>'
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
    html += '<button onclick="frxInlineAnswer(\''+les.id+'\','+i+')" id="frx-iq-'+les.id+'-'+i+'" style="text-align:left;padding:9px 12px;border-radius:7px;border:1px solid var(--br-mid);background:var(--bg-card);color:var(--tx-mid);cursor:pointer;font-size:11px;font-family:var(--sans);" onmouseover="if(!this.dataset.locked)this.style.borderColor=\''+lvl.color+'\'" onmouseout="if(!this.dataset.locked)this.style.borderColor=\'var(--br-mid)\'"><span style="font-family:var(--mono);font-weight:700;color:var(--tx-faint);margin-right:7px;">'+String.fromCharCode(65+i)+'.</span>'+opt+'</button>';
  });
  html += '</div><div id="frx-iq-fb-'+les.id+'" style="margin-top:10px;"></div></div>';
  container.innerHTML = html;
}

window.frxInlineAnswer = function(lesId, idx) {
  var state = frxInlineQuizStates[lesId];
  if (!state || state.answered) return;
  state.answered = true;
  var lvl = FRX_LEVELS.find(function(l) { return l.lessons.some(function(le) { return le.id === lesId; }); });
  var les = lvl ? lvl.lessons.find(function(l) { return l.id === lesId; }) : null;
  if (!les) return;
  var q = window._sqCurrent || {};
  var correct = idx === q.ans;
  if (correct) state.score++;
  q.opts.forEach(function(_, i) {
    var btn = document.getElementById('frx-iq-' + lesId + '-' + i);
    if (!btn) return;
    btn.dataset.locked = '1'; btn.style.cursor = 'default';
    if (i === q.ans) { btn.style.borderColor = 'var(--green)'; btn.style.background = 'var(--green-bg)'; btn.style.color = 'var(--green)'; }
    else if (i === idx && !correct) { btn.style.borderColor = 'var(--red)'; btn.style.background = 'var(--red-bg)'; btn.style.color = 'var(--red)'; }
  });
  var fb = document.getElementById('frx-iq-fb-' + lesId);
  if (fb) fb.innerHTML = '<div style="padding:9px 12px;background:'+(correct?'var(--green-bg)':'var(--red-bg)')+';border:1px solid '+(correct?'var(--green-bdr)':'var(--red-bdr)')+';border-radius:7px;margin-bottom:8px;">'
    + '<div style="font-size:11px;font-weight:700;color:'+(correct?'var(--green)':'var(--red)')+';margin-bottom:3px;">'+(correct?'✅ Correct !':'❌ Pas tout à fait…')+'</div>'
    + '<div style="font-size:10px;color:var(--tx-mid);line-height:1.6;">'+q.exp+'</div></div>'
    + '<button onclick="frxInlineNext(\''+lesId+'\')" style="width:100%;font-family:var(--mono);font-size:10px;padding:8px;border-radius:6px;border:1px solid '+lvl.colorBdr+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">'+(state.current+1<les.quiz.length?'Question suivante →':'Voir mon résultat 🏁')+'</button>';
};

window.frxInlineNext = function(lesId) {
  var state = frxInlineQuizStates[lesId];
  if (!state) return;
  state.current++; state.answered = false;
  var lvl = FRX_LEVELS.find(function(l) { return l.lessons.some(function(le) { return le.id === lesId; }); });
  var les = lvl ? lvl.lessons.find(function(l) { return l.id === lesId; }) : null;
  if (!les) return;
  if (state.current >= les.quiz.length) state.done = true;
  frxRenderInlineQuiz(les, lvl);
};

window.frxResetInlineQuiz = function(lesId) {
  frxInlineQuizStates[lesId] = { current: 0, answered: false, score: 0, done: false };
  var lvl = FRX_LEVELS.find(function(l) { return l.lessons.some(function(le) { return le.id === lesId; }); });
  var les = lvl ? lvl.lessons.find(function(l) { return l.id === lesId; }) : null;
  if (les && lvl) frxRenderInlineQuiz(les, lvl);
};

window.frxMarkDone = function(levelId, lessonId) {
  frxState['lesson_' + lessonId] = true;
  frxSaveState();
  frxLessonBackToHome();
};

window.frxLessonBackToHome = function() {
  var home = document.getElementById('frx-lessons-home');
  var view = document.getElementById('frx-lesson-view');
  if (home) { home.style.display = ''; frxRenderLevelsHome(); }
  if (view) view.style.display = 'none';
};

/* ─── QUIZ PAR NIVEAU ─── */
var frxLvlQuizState = { levelId: null, current: 0, score: 0, answered: false, done: false, order: [] };

function frxShuffleArr(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
    return a;
}

/* ─── RENDER QUIZ HOME (choix niveau) ─── */
function frxRenderQuizHome() {
  var c = document.getElementById('frx-quiz-level-cards');
  if (!c) return;
  var html = '';
  FRX_LEVELS.forEach(function(lvl) {
    var questions = FRX_QUIZ_BY_LEVEL[lvl.id] || [];
    html += '<div onclick="frxStartQuiz(\''+lvl.id+'\')" style="background:var(--bg-card);border:1px solid '+lvl.colorBdr+';border-radius:12px;padding:20px;cursor:pointer;transition:transform .15s,border-color .15s;" onmouseover="this.style.transform=\'translateY(-2px)\';this.style.borderColor=\''+lvl.color+'\'" onmouseout="this.style.transform=\'\';this.style.borderColor=\''+lvl.colorBdr+'\'">'
      + '<div style="font-size:28px;margin-bottom:8px;">'+lvl.icon+'</div>'
      + '<div style="font-size:13px;font-weight:700;color:'+lvl.color+';font-family:var(--mono);margin-bottom:4px;">'+lvl.label+'</div>'
      + '<div style="font-size:10px;color:var(--tx-muted);margin-bottom:10px;">'+lvl.desc+'</div>'
      + '<div style="font-size:10px;font-family:var(--mono);color:var(--tx-faint);">'+questions.length+' questions</div>'
      + '</div>';
  });
  c.innerHTML = html;
}

window.frxStartQuiz = function(levelId) {
  frxLvlQuizState = { levelId: levelId, current: 0, score: 0, answered: false, done: false, order: [] };
  var qh = document.getElementById('frx-quiz-home');
  var qp = document.getElementById('frx-quiz-playing');
  var lbl = document.getElementById('frx-quiz-level-label');
  var lvl = FRX_LEVELS.find(function(l) { return l.id === levelId; });
  if (qh) qh.style.display = 'none';
  if (qp) qp.style.display = '';
  if (lbl && lvl) lbl.textContent = lvl.icon + ' ' + lvl.label;
  frxRenderLvlQuiz();
};

window.frxQuizBackToHome = function() {
  var qh = document.getElementById('frx-quiz-home');
  var qp = document.getElementById('frx-quiz-playing');
  if (qh) { qh.style.display = ''; frxRenderQuizHome(); }
  if (qp) qp.style.display = 'none';
};

function frxRenderLvlQuiz() {
  var c = document.getElementById('frx-quiz-container');
  if (!c) return;
  var questions = FRX_QUIZ_BY_LEVEL[frxLvlQuizState.levelId] || [];
  var lvl = FRX_LEVELS.find(function(l) { return l.id === frxLvlQuizState.levelId; }) || FRX_LEVELS[0];
  if (frxLvlQuizState.order.length === 0) {
    frxLvlQuizState.order = frxShuffleArr(questions.map(function(_,i){return i;}));
  }
  if (frxLvlQuizState.done) {
    var pct = Math.round((frxLvlQuizState.score / questions.length) * 100);
    var col = pct >= 80 ? 'var(--green)' : pct >= 50 ? 'var(--yellow)' : 'var(--red)';
    var msg = pct >= 80 ? '🎉 Excellent ! Vous maîtrisez ce niveau.' : pct >= 50 ? '👍 Bon niveau ! Relisez les leçons où vous avez hésité.' : '📚 Continuez à vous former — relisez les leçons.';
    c.innerHTML = '<div style="text-align:center;padding:32px 20px;background:var(--bg-card);border:1px solid var(--br-soft);border-radius:12px;">'
      + '<div style="font-size:48px;font-family:var(--mono);font-weight:700;color:'+col+';margin-bottom:8px;">'+frxLvlQuizState.score+'/'+questions.length+'</div>'
      + '<div style="font-size:14px;font-weight:700;color:var(--tx-hi);margin-bottom:6px;">'+msg+'</div>'
      + '<div style="font-size:11px;color:var(--tx-muted);margin-bottom:24px;">Score : '+pct+'%</div>'
      + '<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">'
      + '<button onclick="frxStartQuiz(\''+frxLvlQuizState.levelId+'\')" style="font-family:var(--mono);font-size:11px;padding:8px 20px;border-radius:6px;border:1px solid '+lvl.colorBdr+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">🔄 Recommencer</button>'
      + '<button onclick="frxQuizBackToHome()" style="font-family:var(--mono);font-size:11px;padding:8px 20px;border-radius:6px;border:1px solid var(--br-mid);background:transparent;color:var(--tx-mid);cursor:pointer;">← Choisir un niveau</button>'
      + '</div></div>';
    return;
  }
  var qi = frxLvlQuizState.order[frxLvlQuizState.current];
  var q = questions[qi];
  q = window.quizShuffleOpts(q);
  window._sqCurrent = q; // shuffled q for answer function
  var prog = Math.round((frxLvlQuizState.current / questions.length) * 100);
  var html = '<div style="background:var(--bg-card);border:1px solid var(--br-soft);border-radius:12px;padding:20px;">'
    + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">'
    + '<span style="font-size:10px;font-family:var(--mono);color:var(--tx-faint);">Question '+(frxLvlQuizState.current+1)+' / '+questions.length+'</span>'
    + '<span style="font-size:10px;font-family:var(--mono);color:'+lvl.color+';">'+frxLvlQuizState.score+' pts</span>'
    + '</div>'
    + '<div style="height:3px;background:var(--bg-input);border-radius:2px;margin-bottom:16px;"><div style="height:3px;width:'+prog+'%;background:'+lvl.color+';border-radius:2px;transition:width .3s;"></div></div>'
    + '<div style="font-size:13px;font-weight:700;color:var(--tx-hi);line-height:1.5;margin-bottom:16px;">'+q.q+'</div>'
    + '<div style="display:flex;flex-direction:column;gap:8px;">';
    q = window.quizShuffleOpts(q);
    window._sqCurrent = q; // shuffled q for answer function
  q.opts.forEach(function(opt, i) {
    html += '<button onclick="frxLvlQuizAnswer('+i+')" id="frx-opt-'+i+'" style="text-align:left;padding:10px 14px;border-radius:8px;border:1px solid var(--br-mid);background:var(--bg-raised);color:var(--tx-mid);cursor:pointer;font-size:11px;font-family:var(--sans);transition:border-color .1s,background .1s;" onmouseover="if(!this.dataset.locked)this.style.borderColor=\''+lvl.color+'\'" onmouseout="if(!this.dataset.locked)this.style.borderColor=\'var(--br-mid)\'"><span style="font-family:var(--mono);font-weight:700;color:var(--tx-faint);margin-right:8px;">'+String.fromCharCode(65+i)+'.</span>'+opt+'</button>';
  });
  html += '</div><div id="frx-quiz-feedback" style="margin-top:12px;"></div></div>';
  c.innerHTML = html;
}

window.frxLvlQuizAnswer = function(idx) {
  if (frxLvlQuizState.answered) return;
  frxLvlQuizState.answered = true;
  var questions = FRX_QUIZ_BY_LEVEL[frxLvlQuizState.levelId] || [];
  var qi = frxLvlQuizState.order[frxLvlQuizState.current];
  var q = window._sqCurrent || {};
  var lvl = FRX_LEVELS.find(function(l) { return l.id === frxLvlQuizState.levelId; }) || FRX_LEVELS[0];
  var correct = idx === q.ans;
  if (correct) frxLvlQuizState.score++;
  q.opts.forEach(function(_, i) {
    var btn = document.getElementById('frx-opt-' + i);
    if (!btn) return;
    btn.dataset.locked = '1'; btn.style.cursor = 'default';
    if (i === q.ans) { btn.style.borderColor = 'var(--green)'; btn.style.background = 'var(--green-bg)'; btn.style.color = 'var(--green)'; }
    else if (i === idx && !correct) { btn.style.borderColor = 'var(--red)'; btn.style.background = 'var(--red-bg)'; btn.style.color = 'var(--red)'; }
  });
  var fb = document.getElementById('frx-quiz-feedback');
  if (fb) fb.innerHTML = '<div style="padding:10px 14px;background:'+(correct?'var(--green-bg)':'var(--red-bg)')+';border:1px solid '+(correct?'var(--green-bdr)':'var(--red-bdr)')+';border-radius:8px;margin-bottom:10px;">'
    + '<div style="font-size:12px;font-weight:700;color:'+(correct?'var(--green)':'var(--red)')+';margin-bottom:4px;">'+(correct?'✅ Correct !':'❌ Pas tout à fait…')+'</div>'
    + '<div style="font-size:11px;color:var(--tx-mid);line-height:1.6;">'+q.exp+'</div></div>'
    + '<button onclick="frxLvlQuizNext()" style="width:100%;font-family:var(--mono);font-size:11px;padding:9px;border-radius:6px;border:1px solid '+lvl.colorBdr+';background:'+lvl.colorBg+';color:'+lvl.color+';cursor:pointer;font-weight:700;">'+(frxLvlQuizState.current+1<questions.length?'Question suivante →':'Voir mon score 🏁')+'</button>';
};

window.frxLvlQuizNext = function() {
  frxLvlQuizState.current++; frxLvlQuizState.answered = false;
  if (frxLvlQuizState.current >= (FRX_QUIZ_BY_LEVEL[frxLvlQuizState.levelId]||[]).length) frxLvlQuizState.done = true;
  frxRenderLvlQuiz();
};

/* ── Onglets ── */
window.frxTab = function(btn, tab) {
  var bar = document.getElementById('frx-tab-bar');
  if (bar) bar.querySelectorAll('.frx-tb').forEach(function(b) {
    b.style.background = 'var(--bg-card)'; b.style.color = 'var(--tx-mid)';
    b.style.border = '1px solid var(--br-mid)'; b.style.fontWeight = '';
  });
  if (btn) { btn.style.background = 'var(--blue)'; btn.style.color = '#000'; btn.style.border = '1px solid var(--blue)'; btn.style.fontWeight = '700'; }
  ['concepts','paires','mecanismes','strategies','erreurs','lessons','quiz'].forEach(function(p) {
    var el = document.getElementById('frx-panel-' + p);
    if (el) el.style.display = (p === tab) ? '' : 'none';
  });
  if (tab === 'lessons') {
    var lh = document.getElementById('frx-lessons-home'); var lv = document.getElementById('frx-lesson-view');
    if (lh) { lh.style.display = ''; frxRenderLevelsHome(); } if (lv) lv.style.display = 'none';
  }
  if (tab === 'quiz') {
    var qh = document.getElementById('frx-quiz-home'); var qp = document.getElementById('frx-quiz-playing');
    if (qh) { qh.style.display = ''; frxRenderQuizHome(); } if (qp) qp.style.display = 'none';
  }
};

window.frxInit = function() {
  frxLoadState();
  var bar = document.getElementById('frx-tab-bar');
  if (bar) {
    var btns = bar.querySelectorAll('.frx-tb');
    btns.forEach(function(b) { b.style.background='var(--bg-card)'; b.style.color='var(--tx-mid)'; b.style.border='1px solid var(--br-mid)'; b.style.fontWeight=''; });
    if (btns[0]) { btns[0].style.background='var(--blue)'; btns[0].style.color='#000'; btns[0].style.border='1px solid var(--blue)'; btns[0].style.fontWeight='700'; }
  }
  ['concepts','paires','mecanismes','strategies','erreurs','lessons','quiz'].forEach(function(p) {
    var el = document.getElementById('frx-panel-' + p);
    if (el) el.style.display = (p === 'concepts') ? '' : 'none';
  });
};

console.log('[Académie Forex] Module leçons + quiz v2.0 chargé ✓');
})();
