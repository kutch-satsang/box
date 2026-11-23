/* સત્સંગ બોક્સ 🏆 ટોપ ૧૦
   boxTop10.button(cls) → 🏆 બટન,  boxTop10.open() → યાદી ખોલે
   પોઇન્ટ: દરેક પૂરી રમત = 10 (એક ગેમમાં દિવસના વધુમાં વધુ 20 વાર). ⭐: ગેમમાંથી મળેલા સ્ટાર.
   ડેટા: Supabase RPC box_top10(kind, period) */
(function(){
  var TX = {
    g:{h:'🏆 ટોપ ૧૦', p:'પોઇન્ટ', s:'⭐ સ્ટાર', w:'આ અઠવાડિયું', a:'બધો સમય', you:'તમે', load:'લાવી રહ્યા છીએ…', net:'નેટ ચાલુ કરીને ફરી ખોલો', none:'હજી કોઈ નથી. પહેલા તમે બનો!', np:'દરેક પૂરી રમત = 10 પોઇન્ટ', ns:'ગેમમાં મળેલા ⭐ ગણાય છે', cl:'બંધ'},
    e:{h:'🏆 Top 10', p:'Points', s:'⭐ Stars', w:'This week', a:'All time', you:'You', load:'Loading…', net:'Turn on the internet and open again', none:'No one yet. Be the first!', np:'Every finished game = 10 points', ns:'Stars earned in games are counted', cl:'Close'},
    r:{h:'🏆 Top 10', p:'Point', s:'⭐ Star', w:'Aa athvadiyu', a:'Badho samay', you:'Tame', load:'Lavi rahya chhiye…', net:'Net chalu kari ne fari kholo', none:'Haji koi nathi. Pahela tame bano!', np:'Darek puri ramat = 10 point', ns:'Game ma malela ⭐ ganay chhe', cl:'Bandh'}
  };
  function L(){ try{ var l = localStorage.getItem('satsangLang'); return TX[l] ? l : 'g'; }catch(e){ return 'g'; } }
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  var css = document.createElement('style');
  css.textContent =
  '.t10w{position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;background:rgba(60,35,20,.45);font-family:"Baloo Bhai 2","Noto Sans Gujarati",sans-serif;animation:t10f .2s ease-out}'+
  '@keyframes t10f{from{opacity:0}to{opacity:1}}'+
  '.t10c{position:relative;width:min(94vw,440px);max-height:94vh;max-height:94svh;overflow:auto;box-sizing:border-box;padding:10px 10px 8px;border-radius:22px;background:linear-gradient(#fbf1e2,#f2dcc0);box-shadow:0 10px 30px rgba(60,30,10,.4),inset 0 2px 0 #fff8ec;color:#5a3524}'+
  '.t10x{position:absolute;top:6px;right:6px;width:32px;height:32px;border:0;border-radius:50%;background:#e9cfae;color:#5a3524;font:800 18px/1 system-ui,sans-serif;cursor:pointer;box-shadow:0 2px 0 #c9a47c}'+
  '.t10h{margin:0 0 6px;text-align:center;font-size:20px;line-height:1.3;font-weight:800;color:#8a3c14}'+
  '.t10g{display:flex;gap:6px;margin:0 0 6px}.t10g button{flex:1;min-height:34px;border:0;border-radius:12px;background:#ead3b5;color:#6b4430;font-family:inherit;font-weight:700;font-size:15px;line-height:1.1;cursor:pointer;box-shadow:0 2px 0 #cfae88}'+
  '.t10g button.on{background:linear-gradient(#e7864a,#c9622c);color:#fff;box-shadow:0 2px 0 #9a4519}'+
  '.t10g.sm button{min-height:28px;font-size:13px;border-radius:10px}.t10g.sm button.on{background:#7a8a3a;box-shadow:0 2px 0 #56631f}'+
  '.t10l{list-style:none;margin:6px 0 4px;padding:0}'+
  '.t10l li{display:flex;align-items:center;gap:8px;min-height:31px;margin:3px 0;padding:1px 10px;border-radius:12px;background:#fff7ec;box-shadow:0 1px 0 #e3c9a6}'+
  '.t10l li.me{background:#fde3b0;outline:2px solid #e7a13c}'+
  '.t10l li.gap{min-height:14px;background:none;box-shadow:none;justify-content:center;color:#a07a5c;padding:0}'+
  '.t10r{flex:none;width:30px;text-align:center;font-weight:800;font-size:16px}.t10r.md{font-size:18px;line-height:1}'+
  '.t10n{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:15px;font-weight:600}'+
  '.t10s{flex:none;font-weight:800;font-size:16px;color:#8a3c14}'+
  '.t10m{text-align:center;padding:26px 6px;font-size:15px;color:#7a5640}'+
  '.t10f{text-align:center;font-size:12px;color:#8f6a50;margin-top:4px}'+
  'html.cl .t10c{background:linear-gradient(150deg,rgba(255,255,255,.9),rgba(240,246,255,.85));color:#2c3a52}'+
  'html.cl .t10h,html.cl .t10s{color:#4a4ab0}html.cl .t10l li{background:rgba(255,255,255,.8);box-shadow:0 1px 0 #d8e0ee}'+
  '.t10b{font-size:5.6cqw!important}.clbtn.t10b{font-size:20px!important}';
  document.head.appendChild(css);

  var st = {kind:'points', period:'week'}, w = null, cache = {};
  function rows(box, data){
    var t = TX[L()], ul = document.createElement('ul'); ul.className = 't10l';
    if(!data.length){ box.innerHTML = '<div class="t10m">'+esc(t.none)+'</div>'; return; }
    var last = 0;
    data.forEach(function(r){
      if(r.rank > 10 && last <= 10){ var g = document.createElement('li'); g.className = 'gap'; g.textContent = '⋯'; ul.appendChild(g); }
      last = r.rank;
      var li = document.createElement('li'); if(r.me) li.className = 'me';
      var md = r.rank <= 3 ? ['🥇','🥈','🥉'][r.rank-1] : r.rank;
      li.innerHTML = '<span class="t10r'+(r.rank <= 3 ? ' md' : '')+'">'+md+'</span><span class="t10n">'+esc(r.name)+(r.me ? ' · '+esc(t.you) : '')+'</span><span class="t10s">'+Number(r.score).toLocaleString('en-IN')+(st.kind === 'stars' ? ' ⭐' : '')+'</span>';
      ul.appendChild(li);
    });
    box.innerHTML = ''; box.appendChild(ul);
  }
  function load(){
    if(!w) return;
    var t = TX[L()], box = w.querySelector('.t10body'), key = st.kind+'|'+st.period;
    w.querySelector('.t10f').textContent = st.kind === 'stars' ? t.ns : t.np;
    if(cache[key]) rows(box, cache[key]); else box.innerHTML = '<div class="t10m">'+esc(t.load)+'</div>';
    if(!window.SatsangAuth){ if(!cache[key]) box.innerHTML = '<div class="t10m">'+esc(t.net)+'</div>'; return; }
    SatsangAuth.ready().then(function(c){ return c.rpc('box_top10', {kind:st.kind, period:st.period}); }).then(function(r){
      if(r.error) throw r.error;
      cache[key] = r.data || [];
      if(w && st.kind+'|'+st.period === key) rows(box, cache[key]);
    }).catch(function(){ if(w && !cache[key]) box.innerHTML = '<div class="t10m">'+esc(t.net)+'</div>'; });
  }
  function close(fromPop){
    if(!w) return; w.remove(); w = null;
    window.removeEventListener('popstate', onPop);
    if(!fromPop){ try{ if(history.state && history.state.t10) history.back(); }catch(e){} }
  }
  function onPop(){ close(true); }
  function open(){
    if(w) return;
    var t = TX[L()];
    w = document.createElement('div'); w.className = 't10w';
    w.innerHTML = '<div class="t10c" role="dialog" aria-label="'+esc(t.h)+'"><button class="t10x" type="button" aria-label="'+esc(t.cl)+'">✕</button>'+
      '<div class="t10h">'+esc(t.h)+'</div>'+
      '<div class="t10g k"><button type="button" data-k="points">🏆 '+esc(t.p)+'</button><button type="button" data-k="stars">'+esc(t.s)+'</button></div>'+
      '<div class="t10g sm p"><button type="button" data-p="week">'+esc(t.w)+'</button><button type="button" data-p="all">'+esc(t.a)+'</button></div>'+
      '<div class="t10body"></div><div class="t10f"></div></div>';
    function mark(){
      [].forEach.call(w.querySelectorAll('[data-k]'), function(b){ b.classList.toggle('on', b.getAttribute('data-k') === st.kind); });
      [].forEach.call(w.querySelectorAll('[data-p]'), function(b){ b.classList.toggle('on', b.getAttribute('data-p') === st.period); });
    }
    w.addEventListener('click', function(e){
      var b = e.target.closest ? e.target.closest('button') : null;
      if(e.target === w || (b && b.className === 't10x')){ close(); return; }
      if(b && b.getAttribute('data-k')){ st.kind = b.getAttribute('data-k'); mark(); load(); }
      if(b && b.getAttribute('data-p')){ st.period = b.getAttribute('data-p'); mark(); load(); }
    });
    document.body.appendChild(w); mark(); load();
    try{ history.pushState({t10:1, p:1}, '', location.href); }catch(e){}
    window.addEventListener('popstate', onPop);
  }
  function button(cls){
    var b = document.createElement('button'); b.type = 'button'; b.className = (cls || 'lng3d') + ' t10b';
    b.setAttribute('aria-label', TX[L()].h); b.textContent = '🏆';
    b.addEventListener('click', open); return b;
  }
  window.boxTop10 = {open:open, button:button};
})();
