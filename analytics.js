/* સત્સંગ બોક્સ — અનામી આંકડા (Google Analytics 4, નં. 48)
   - નામ, ફોટો, satsangPlayer ક્યારેય મોકલાતાં નથી.
   - ફક્ત લાઈવ સાઈટ (github.io) પરથી જ મોકલે; પ્રિવ્યુ/ફાઈલમાં ફક્ત console માં દેખાય.
   - ઇન્ટરનેટ ન હોય કે Google રોકાય તો ગેમ પર કોઈ અસર નહીં.
   ગેમમાં વાપરવું (હંમેશાં window.sbTrack&& થી):
     sbTrack('hint_used')                     કોઈ પણ ઇવેન્ટ
     sbTrack.start({mode:'play'}, once)       રમત શરૂ (once=true: ચાલુ હોય તો ફરી ન ગણે)
     sbTrack.finish({punya:40, mistakes:3})   રમત પૂરી (સમય આપમેળે)
     sbTrack.where('step 3')                  અધૂરી છોડે તો ક્યાં, તે નોંધવા
     sbTrack.reset()                          નવું બોર્ડ, હજી શરૂ નથી
*/
(function(){
  if(window.sbTrack) return;
  var ID = 'G-4G2T8EMR6V';
  var m = location.pathname.match(/\/(prashn-leela|dhyan-murti|antahshatru-vijay|fal-ful-memory)(\/|$)/);
  var GAME = m ? m[1] : 'hub';
  var LIVE = /(^|\.)github\.io$/.test(location.hostname);
  var st = {on:0, done:0, t0:0, where:'', quit:0}, errs = 0;

  function lang(){ try{ return localStorage.getItem('satsangLang') || 'g'; }catch(e){ return 'g'; } }
  function clean(p){
    var o = {game:GAME, lang:lang()}, k;
    if(p) for(k in p){ if(p[k] != null && k !== 'name' && k !== 'player') o[k] = typeof p[k] === 'string' ? p[k].slice(0, 90) : p[k]; }
    return o;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  if(LIVE){
    try{
      gtag('js', new Date());
      gtag('config', ID, {game:GAME, lang:lang()});
      var s = document.createElement('script');
      s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + ID;
      s.onerror = function(){};
      (document.head || document.documentElement).appendChild(s);
    }catch(e){}
  }

  function send(name, p){
    try{
      var o = clean(p);
      if(LIVE) gtag('event', name, o);
      else if(window.console) console.log('[sbTrack]', name, o);
    }catch(e){}
  }

  var T = function(name, p){ send(name, p); };
  T.start = function(p, once){
    if(once && st.on && !st.done) return;
    st.on = 1; st.done = 0; st.quit = 0; st.t0 = Date.now();
    send('game_start', p);
  };
  T.finish = function(p){
    p = p || {};
    if(p.sec == null && st.t0) p.sec = Math.round((Date.now() - st.t0) / 1000);
    st.done = 1;
    send('game_finish', p);
  };
  T.where = function(w){ st.where = String(w || ''); };
  T.reset = function(){ st.on = 0; st.done = 0; st.where = ''; };
  window.sbTrack = T;

  /* અધૂરી છોડે */
  function leave(){
    if(st.on && !st.done && !st.quit){
      st.quit = 1;
      send('game_quit', {where:st.where, sec: st.t0 ? Math.round((Date.now() - st.t0) / 1000) : 0});
    }
  }
  window.addEventListener('pagehide', leave);

  /* ભૂલો (ફાઈલ ન મળી, ગેમ અટકી) — એક પાને વધુમાં વધુ 5 */
  window.addEventListener('error', function(e){
    if(errs >= 5) return;
    if(/ResizeObserver loop|^Script error\.?$/.test(String(e.message || ''))) return;
    errs++;
    var t = e.target, src = t && t !== window && (t.src || t.href);
    send('game_error', src
      ? {kind:'file', what:String(src).split('/').pop()}
      : {kind:'js', what:String(e.message || ''), line:e.lineno || 0});
  }, true);
  window.addEventListener('unhandledrejection', function(e){
    if(errs >= 5) return; errs++;
    send('game_error', {kind:'promise', what:String(e.reason && (e.reason.message || e.reason) || '')});
  });

  /* ખુલી */
  send(GAME === 'hub' ? 'hub_open' : 'game_open');
})();
