(function(){
  var AT_PROFILES = {
    beginner: {
      title: 'Mode Débutant activé',
      sub: 'Interface guidée · explications à chaque étape',
      cls: 'at-prof-beginner',
      features: [
        {l:'Interface simplifiée & épurée', on:true},
        {l:'Tooltips d\'aide sur chaque indicateur', on:true},
        {l:'Guide de démarrage interactif', on:true},
        {l:'Glossaire intégré (P/E, DCF, ROE…)', on:true},
        {l:'Outils avancés (DCF complet, comparables)', on:false},
        {l:'Mode terminal brut', on:false}
      ]
    },
    intermediate: {
      title: 'Mode Intermédiaire activé',
      sub: 'Outils d\'analyse · accès aux modules clés',
      cls: 'at-prof-intermediate',
      features: [
        {l:'Analyse fondamentale complète', on:true},
        {l:'Comparables sectoriels', on:true},
        {l:'Alertes & watchlist', on:true},
        {l:'DCF simplifié', on:true},
        {l:'Interface simplifiée & tooltips', on:false},
        {l:'Mode terminal brut', on:false}
      ]
    },
    expert: {
      title: 'Mode Expert activé',
      sub: 'Accès complet · tous les modules déverrouillés',
      cls: 'at-prof-expert',
      features: [
        {l:'Tous les modules déverrouillés', on:true},
        {l:'DCF avancé multi-scénarios', on:true},
        {l:'Données brutes & API', on:true},
        {l:'Mode terminal complet', on:true},
        {l:'Analyse IA avancée', on:true},
        {l:'Comparables & benchmarks sectoriels', on:true}
      ]
    }
  };
  var atSelected = null;

  window.atSelectProfile = function(el){
    document.querySelectorAll('.at-profile-card').forEach(function(c){ c.classList.remove('at-selected'); });
    el.classList.add('at-selected');
    atSelected = el.dataset.profile;
    document.getElementById('atBtnEnter').classList.add('at-active');
  };

  window.atShowResult = function(){
    if(!atSelected) return;
    var p = AT_PROFILES[atSelected];
    document.getElementById('atResultTitle').textContent = p.title;
    document.getElementById('atResultSub').textContent = p.sub;
    var html = p.features.map(function(f){
      return '<div class="at-access-item '+(f.on?'at-access-on':'at-access-off')+'">'
        +'<div class="at-dot '+(f.on?'at-dot-on':'at-dot-off')+'"></div>'
        +f.l+'</div>';
    }).join('');
    document.getElementById('atAccessList').innerHTML = html;
    document.getElementById('atMain').classList.add('at-hidden');
    document.getElementById('atResult').classList.add('at-visible');
  };

  window.atGoBack = function(){
    document.getElementById('atMain').classList.remove('at-hidden');
    document.getElementById('atResult').classList.remove('at-visible');
  };

  window.atLaunch = function(){
    if(!atSelected) return;
    if(document.getElementById('atRemember').checked){
      localStorage.setItem('at_profile', atSelected);
    }
    atApplyProfile(atSelected);
    document.getElementById('at-welcome-overlay').classList.add('hidden');
  };

  function atApplyProfile(profile){
    document.body.classList.remove('at-prof-beginner','at-prof-intermediate','at-prof-expert');
    var p = AT_PROFILES[profile];
    if(p) document.body.classList.add(p.cls);
    /* Stocker pour usage global */
    window.AT_CURRENT_PROFILE = profile;
    /* Mettre à jour le switcher de profil */
    atUpdateSwitcher(profile);
  }

  /* ── Switcher visible dans la topbar ── */
  function atUpdateSwitcher(profile) {
    var cards = document.querySelectorAll('#at-switch-modal .at-sw-card');
    cards.forEach(function(c){ c.classList.toggle('active', c.dataset.profile === profile); });
  }

  window.atOpenSwitchModal = function(){
    var modal = document.getElementById('at-switch-modal');
    if(modal) modal.classList.add('open');
    var cards = document.querySelectorAll('#at-switch-modal .at-sw-card');
    cards.forEach(function(c){ c.classList.toggle('active', c.dataset.profile === window.AT_CURRENT_PROFILE); });
  };

  window.atCloseSwitchModal = function(){
    var modal = document.getElementById('at-switch-modal');
    if(modal) modal.classList.remove('open');
  };

  window.atSwitchProfile = function(profile){
    atApplyProfile(profile);
    localStorage.setItem('at_profile', profile);
    atCloseSwitchModal();
  };

  /* Fermer modal en cliquant l'overlay */
  document.addEventListener('click', function(e){
    var modal = document.getElementById('at-switch-modal');
    if(modal && e.target === modal) modal.classList.remove('open');
  });

  /* Appliquer le profil mémorisé sans cacher l'overlay de profil
     (l'overlay auth s'affiche en priorité, l'overlay profil vient après) */
  var saved = localStorage.getItem('at_profile');
  if(saved && AT_PROFILES[saved]) atApplyProfile(saved);

})();
