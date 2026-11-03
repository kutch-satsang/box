/* સત્સંગ બોક્સ — આંકડા: Google Analytics 4 (નં. 48) + Supabase (દરેક ભક્તના)
   - Google Analytics માં નામ, ફોટો, satsangPlayer ક્યારેય મોકલાતાં નથી.
   - Supabase માં રમત શરૂ/પૂરી અને ⭐ લૉગિન થયેલા ભક્તના ખાતામાં નોંધાય.
   - નેટ ન હોય તો ફોનમાં કતારમાં રહે (sbOutbox), નેટ આવે ત્યારે જાય.
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
  var m = location.pathname.match(/\/(prashn-leela|dhyan-murti|antahshatru-vijay|fal-ful-memory|ekadashi)(\/|$)/);
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

  /* ---- Supabase કતાર ---- */
  var API = 'https://fexjcqyaopfilwixwfpn.supabase.co/rest/v1/';
  var KEY = 'sb_publishable_RCGMIsbR27_gu6aUZ_3pUg_OajpxBhL';
  var TOKEN = 'sb-fexjcqyaopfilwixwfpn-auth-token';
  var BOX = 'sbOutbox', MAX = 500, flushing = false;
  function uuid(){
    if(window.crypto && crypto.randomUUID) return crypto.randomUUID();
    var b = crypto.getRandomValues(new Uint8Array(16)), h = [], i;
    b[6] = b[6] & 15 | 64; b[8] = b[8] & 63 | 128;
    for(i = 0; i < 16; i++) h.push((b[i] + 256).toString(16).slice(1));
    return h.slice(0,4).join('') + '-' + h.slice(4,6).join('') + '-' + h.slice(6,8).join('') + '-' + h.slice(8,10).join('') + '-' + h.slice(10).join('');
  }
  function zone(){ try{ return Intl.DateTimeFormat().resolvedOptions().timeZone || null; }catch(e){ return null; } }
  function theme(){ try{ return localStorage.getItem('satsangTheme') || 'mati'; }catch(e){ return 'mati'; } }
  function load(){ try{ var a = JSON.parse(localStorage.getItem(BOX) || '[]'); return Array.isArray(a) ? a : []; }catch(e){ return []; } }
  function save(a){ try{ localStorage.setItem(BOX, JSON.stringify(a.slice(-MAX))); }catch(e){} }
  function token(){
    try{
      var o = JSON.parse(localStorage.getItem(TOKEN) || 'null');
      if(!o || !o.access_token) return null;
      if(o.expires_at && o.expires_at * 1000 < Date.now() + 30000) return null;
      return o.access_token;
    }catch(e){ return null; }
  }
  function queue(table, row){ row.client_event_id = uuid(); var a = load(); a.push({t:table, r:row}); save(a); flush(); }
  function post(table, rows, tk, keep){
    /* feedback ને SELECT હક નથી: સાદું insert, ડુપ્લિકેટ હોય તો 409 */
    var q = table === 'game_events' ? '?on_conflict=user_id,client_event_id' : '';
    return fetch(API + table + q, {
      method:'POST', keepalive:!!keep,
      headers:{apikey:KEY, Authorization:'Bearer ' + tk, 'Content-Type':'application/json', Prefer:(q ? 'resolution=ignore-duplicates,' : '') + 'return=minimal'},
      body:JSON.stringify(rows)
    });
  }
  /* એક પછી એક મોકલે. 400 = ખોટી નોંધ કે રોજની મર્યાદા: કાઢી નાખે. 401/નેટ ભૂલ: કતારમાં રહે. */
  function flush(keep){
    if(flushing || navigator.onLine === false) return Promise.resolve();
    var a = load(), tk = token();
    if(!a.length || !tk) return Promise.resolve();
    flushing = true;
    var it = a[0];
    return post(it.t, [it.r], tk, keep).then(function(r){
      flushing = false;
      if(r.ok || r.status === 400 || r.status === 409){
        var b = load();
        if(b[0] && b[0].r.client_event_id === it.r.client_event_id){ b.shift(); save(b); }
        return flush(keep);
      }
    }).catch(function(){ flushing = false; });
  }
  window.sbFlush = flush;
  window.sbClearOutbox = function(){ try{ localStorage.removeItem(BOX); }catch(e){} };
  function record(ev, sec){
    if(GAME === 'hub') return;
    var r = {game:GAME, event:ev, language:lang(), theme:theme(), played_at:new Date().toISOString(), time_zone:zone()};
    if(ev === 'finish' && sec != null) r.duration_seconds = Math.min(86400, Math.max(0, Math.round(sec)));
    queue('game_events', r);
  }
  window.addEventListener('online', function(){ flush(); });
  window.addEventListener('pagehide', function(){ flush(true); });
  setTimeout(flush, 800);

  /* ---- ⭐ પ્રશ્ન: એક ગેમમાં દિવસમાં એક વાર ---- */
  var NM = {
    'prashn-leela':{g:'સત્સંગ પ્રશ્ન',e:'Satsang Prashn',r:'Satsang Prashn'},
    'dhyan-murti':{g:'ધ્યાન દર્શન',e:'Dhyan Darshan',r:'Dhyan Darshan'},
    'antahshatru-vijay':{g:'અંતઃશત્રુ વિજય',e:'Antahshatru Vijay',r:'Antahshatru Vijay'},
    'fal-ful-memory':{g:'ફળ ફૂલ મેમરી',e:'Fruit & Flower Memory',r:'Fal Ful Memory'},
    'ekadashi':{g:'એકાદશી',e:'Ekadashi',r:'Ekadashi'}
  };
  var ST = {
    g:{h:'🙏 ગેમ પૂરી થઈ!',q:'{g} કેવી લાગી?',l:'પછી',s:'મોકલો',t:'🙏 આભાર!'},
    e:{h:'🙏 Game finished!',q:'How did you like {g}?',l:'Later',s:'Send',t:'🙏 Thank you!'},
    r:{h:'🙏 Game puri thai!',q:'{g} kevi lagi?',l:'Pachhi',s:'Moklo',t:'🙏 Aabhar!'}
  };
  function askStars(){
    if(GAME === 'hub' || !NM[GAME] || document.getElementById('sbStars')) return;
    var day = new Date().toDateString(), key = 'sbStarAsked:' + GAME;
    try{ if(localStorage.getItem(key) === day) return; localStorage.setItem(key, day); }catch(e){ return; }
    var L = ST[lang()] ? lang() : 'g', t = ST[L], pick = 0, btn = [];
    var w = document.createElement('div'); w.id = 'sbStars'; w.setAttribute('role', 'dialog'); w.setAttribute('aria-modal', 'true');
    w.style.cssText = "position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;padding:16px;box-sizing:border-box;background:rgba(60,35,20,.45);font-family:'Noto Sans Gujarati','Hind Vadodara',sans-serif;color:#4a2c1c";
    var bs = "min-height:46px;border:0;border-radius:23px;font:600 15px 'Noto Sans Gujarati',sans-serif;cursor:pointer;";
    w.innerHTML = '<div style="box-sizing:border-box;width:100%;max-width:340px;padding:24px 20px;border-radius:26px;text-align:center;background:linear-gradient(160deg,#fdf5e8,#f3e3cb);box-shadow:0 .7rem 1.6rem rgba(60,35,20,.4)"><div style="font:700 24px \'Baloo Bhai 2\',\'Noto Sans Gujarati\',sans-serif">' + t.h + '</div><p style="margin:6px 0 12px;font-size:15px">' + t.q.replace('{g}', NM[GAME][L]) + '</p><div class="sbs" style="display:flex;justify-content:center;margin-bottom:14px"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px"><button type="button" class="sbl" style="' + bs + 'background:#eadcc7;color:#4a2c1c">' + t.l + '</button><button type="button" class="sbo" disabled style="' + bs + 'background:#e8845f;color:#fff;opacity:.5">' + t.s + '</button></div></div>';
    var row = w.querySelector('.sbs'), ok = w.querySelector('.sbo');
    [1,2,3,4,5].forEach(function(n){
      var b = document.createElement('button'); b.type = 'button'; b.textContent = '☆'; b.setAttribute('aria-label', n + ' star');
      b.style.cssText = 'width:52px;height:52px;padding:0;border:0;background:none;font-size:38px;line-height:1;color:#d99a1c;cursor:pointer';
      b.addEventListener('click', function(){ pick = n; ok.disabled = false; ok.style.opacity = 1; btn.forEach(function(x, i){ x.textContent = i < n ? '★' : '☆'; }); });
      btn.push(b); row.appendChild(b);
    });
    w.querySelector('.sbl').addEventListener('click', function(){ w.remove(); });
    ok.addEventListener('click', function(){
      if(!pick) return;
      queue('feedback', {kind:'stars', stars:pick, game:GAME, time_zone:zone()});
      w.firstChild.innerHTML = '<div style="font:700 24px \'Baloo Bhai 2\',\'Noto Sans Gujarati\',sans-serif">' + t.t + '</div>';
      setTimeout(function(){ w.remove(); }, 900);
    });
    document.body.appendChild(w);
  }

  var T = function(name, p){ send(name, p); };
  T.start = function(p, once){
    if(once && st.on && !st.done) return;
    st.on = 1; st.done = 0; st.quit = 0; st.t0 = Date.now();
    send('game_start', p);
    record('start');
  };
  T.finish = function(p){
    p = p || {};
    if(p.sec == null && st.t0) p.sec = Math.round((Date.now() - st.t0) / 1000);
    var first = !st.done;
    st.done = 1;
    send('game_finish', p);
    if(first){
      record('finish', p.sec);
      if(p.mode !== 'practice') setTimeout(askStars, 1800);
    }
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
