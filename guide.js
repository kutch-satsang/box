/* સત્સંગ બોક્સ — પહેલી વાર ગાઈડ (બધી ગેમ માટે સહિયારી)
   ગેમમાં વાપરવું (હંમેશાં window.sbGuide && થી):
     if(window.sbGuide && sbGuide.needed('game-name')) sbGuide.run('game-name', steps, {onEnd:fn, alive:fn});
   steps = [{t:{g,e,r}, target:fn→element, mode:'hole'|'block'|'ring', wait:'button'|'<event>',
             btn:{g,e,r}, retry:{g,e,r}, quiet:fn, skipIf:fn, at:'bottom'}]
     hole  = બાકી સ્ક્રીન ઝાંખી, ફક્ત ચમકતી વસ્તુ દબાવી શકાય
     block = બાકી ઝાંખી, કંઈ દબાતું નથી, "સમજ્યો" દબાવવું પડે
     ring  = ઝાંખું નહીં, ફક્ત રિંગ + લખાણ (ખેંચવા માટે)
   ગેમ તરફથી: sbGuide.event('નામ') · sbGuide.active() · sbGuide.reset('game-name')
   એક વાર બતાવાય, ચાવી "sbGuide:<game>" (satsang* ને અડતું નથી). ગાઈડ દરમ્યાન ગેમ ઘડિયાળ/stats અટકાવે. */
(function(){
  if(window.sbGuide) return;
  var P = 'sbGuide:', cur = null;
  var UI = {
    skip:{g:'છોડી દો', e:'Skip', r:'Chhodi do'},
    next:{g:'સમજ્યો ▶', e:'Got it ▶', r:'Samjyo ▶'}
  };
  function lang(){ try{ var l = localStorage.getItem('satsangLang'); return l === 'e' || l === 'r' ? l : 'g'; }catch(e){ return 'g'; } }
  function pick(o){ if(!o) return ''; var l = lang(); return o[l] || o.g || ''; }
  function seen(game){ try{ return localStorage.getItem(P + game) === '1'; }catch(e){ return true; } }
  function mark(game){ try{ localStorage.setItem(P + game, '1'); }catch(e){} }

  var CSS = '#sbGuide{position:fixed;left:0;top:0;right:0;bottom:0;z-index:20000;pointer-events:none;font-family:"Noto Sans Gujarati","Hind Vadodara",sans-serif}' +
    '#sbGuide .gp{position:absolute;pointer-events:auto;touch-action:none;background:transparent}' +
    '#sbGuide .gr{position:absolute;box-sizing:border-box;border:3px solid #ffd86a;border-radius:14px;pointer-events:none;animation:sbgp 1s ease-in-out infinite}' +
    '@keyframes sbgp{0%,100%{border-color:#ffd86a}50%{border-color:#fff3c4}}' +
    '@media (prefers-reduced-motion:reduce){#sbGuide .gr{animation:none}}' +
    '#sbGuide .gb{position:absolute;box-sizing:border-box;width:min(300px,calc(100vw - 20px));padding:12px 14px;border-radius:18px;background:#fdf5e8;color:#4a2c1c;box-shadow:0 .5rem 1.2rem rgba(0,0,0,.4);pointer-events:auto}' +
    '#sbGuide .gt{font-weight:600;font-size:16px;line-height:1.45;margin:0 0 10px}' +
    '#sbGuide .gw{display:flex;align-items:center;justify-content:space-between;gap:8px}' +
    '#sbGuide button{font-family:inherit;cursor:pointer}' +
    '#sbGuide .gs{min-height:44px;padding:0 6px;border:0;background:none;color:#7b5a3a;font-size:14px;font-weight:600;text-decoration:underline}' +
    '#sbGuide .gn{min-height:44px;padding:0 18px;border:0;border-radius:22px;background:#e8845f;color:#fff;font-size:15px;font-weight:600}' +
    '#sbGuide .gc{font-size:13px;color:#7b5a3a}';

  function el(tag, cls, parent){ var e = document.createElement(tag); if(cls) e.className = cls; if(parent) parent.appendChild(e); return e; }

  function build(){
    if(!document.getElementById('sbGuideCss')){ var st = el('style'); st.id = 'sbGuideCss'; st.textContent = CSS; document.head.appendChild(st); }
    var root = el('div'); root.id = 'sbGuide'; root.setAttribute('role', 'dialog');
    var pn = [0, 1, 2, 3].map(function(){ return el('div', 'gp', root); });
    var ring = el('div', 'gr', root);
    var bub = el('div', 'gb', root);
    var txt = el('p', 'gt', bub);
    var row = el('div', 'gw', bub);
    var skip = el('button', 'gs', row); skip.type = 'button';
    var cnt = el('span', 'gc', row);
    var nx = el('button', 'gn', row); nx.type = 'button';
    document.body.appendChild(root);
    return {root:root, pn:pn, ring:ring, bub:bub, txt:txt, skip:skip, cnt:cnt, nx:nx};
  }
  function box(e, x, y, w, h){ e.style.left = x + 'px'; e.style.top = y + 'px'; e.style.width = w + 'px'; e.style.height = h + 'px'; }

  function tick(){
    if(!cur) return;
    cur.raf = requestAnimationFrame(tick);
    if(cur.opt.alive && !cur.opt.alive()){ end(false, true); return; }
    var s = cur.steps[cur.i], u = cur.ui, vw = window.innerWidth, vh = window.innerHeight, t = null, r = null, pad = 6;
    try{ t = s.target && s.target(); }catch(e){}
    if(t && t.getBoundingClientRect){ r = t.getBoundingClientRect(); if(!r.width || !r.height) r = null; }
    var mode = s.mode || 'block', x = 0, y = 0, w = 0, h = 0;
    if(r){ x = r.left - pad; y = r.top - pad; w = r.width + pad * 2; h = r.height + pad * 2; }
    if(r){
      u.ring.style.display = 'block'; box(u.ring, x, y, w, h);
      u.ring.style.boxShadow = mode === 'ring' ? '0 0 0 2px rgba(74,44,28,.65), 0 0 14px 4px rgba(255,216,106,.85)' : '0 0 0 200vmax rgba(36,20,10,.62)';
    } else u.ring.style.display = 'none';
    var dim = 'rgba(36,20,10,.62)';
    if(mode === 'ring'){ u.pn.forEach(function(p){ p.style.display = 'none'; }); }
    else if(mode === 'hole' && r){
      u.pn.forEach(function(p){ p.style.display = 'block'; p.style.background = 'transparent'; });
      box(u.pn[0], 0, 0, vw, Math.max(0, y));
      box(u.pn[1], 0, y + h, vw, Math.max(0, vh - y - h));
      box(u.pn[2], 0, y, Math.max(0, x), h);
      box(u.pn[3], x + w, y, Math.max(0, vw - x - w), h);
    } else {
      u.pn.forEach(function(p, i){ p.style.display = i ? 'none' : 'block'; });
      u.pn[0].style.background = r ? 'transparent' : dim;
      box(u.pn[0], 0, 0, vw, vh);
    }
    /* લખાણ */
    var wantBtn = s.wait === 'button', tx = cur.retry && s.retry ? pick(s.retry) : pick(s.t);
    if(u.txt.textContent !== tx) u.txt.textContent = tx;
    u.nx.style.display = wantBtn ? '' : 'none';
    var nl = pick(s.btn) || pick(UI.next);
    if(u.nx.textContent !== nl) u.nx.textContent = nl;
    u.skip.textContent = pick(UI.skip);
    u.cnt.textContent = (cur.i + 1) + '/' + cur.steps.length;
    u.bub.style.pointerEvents = mode === 'ring' ? 'none' : 'auto';
    u.skip.style.pointerEvents = 'auto'; u.nx.style.pointerEvents = 'auto';
    u.bub.style.opacity = s.quiet && s.quiet() ? '0' : '1';
    var bw = u.bub.offsetWidth, bh = u.bub.offsetHeight, bx, by;
    if(r){
      var below = vh - (y + h), above = y;
      if(below >= bh + 14 && (below >= above || above < bh + 14)) by = y + h + 12;
      else if(above >= bh + 14) by = y - bh - 12;
      else by = Math.max(10, (vh - bh) / 2);
      bx = Math.max(10, Math.min(vw - bw - 10, x + w / 2 - bw / 2));
    } else { bx = (vw - bw) / 2; by = (vh - bh) / 2; }
    if(s.at === 'bottom') by = Math.max(10, vh - bh - 14);   /* લખાણ સ્ક્રીનના તળિયે: ઉપરની વસ્તુઓ ઢંકાય નહીં */
    u.bub.style.left = bx + 'px'; u.bub.style.top = by + 'px';
  }

  function enter(n){
    if(!cur) return;
    while(n < cur.steps.length){
      var s = cur.steps[n], skipIt = false;
      try{ skipIt = !!(s.skipIf && s.skipIf()); }catch(e){}
      if(!skipIt) break;
      n++;
    }
    if(n >= cur.steps.length){ end(false); return; }
    cur.i = n; cur.busy = false; cur.retry = false;
  }
  function end(skipped, silent){
    if(!cur) return;
    var c = cur; cur = null;
    cancelAnimationFrame(c.raf);
    if(c.ui.root.parentNode) c.ui.root.parentNode.removeChild(c.ui.root);
    if(silent) return;           /* ખેલાડી ગેમ છોડી ગયો: નોંધ નહીં, આગળ ફરી બતાવાશે */
    mark(c.game);
    try{ c.opt.onEnd && c.opt.onEnd(!!skipped); }catch(e){}
  }

  window.sbGuide = {
    needed: function(game){ return !seen(game); },
    active: function(){ return !!cur; },
    reset: function(game){ try{ localStorage.removeItem(P + game); }catch(e){} },
    run: function(game, steps, opt){
      if(cur) end(true, true);
      if(!steps || !steps.length){ if(opt && opt.onEnd) opt.onEnd(false); return; }
      cur = {game:game, steps:steps, opt:opt || {}, i:0, busy:false, retry:false, ui:build(), raf:0};
      cur.ui.skip.addEventListener('click', function(){ end(true); });
      cur.ui.nx.addEventListener('click', function(){
        if(!cur || cur.busy) return;
        var s = cur.steps[cur.i]; if(s.wait !== 'button') return;
        enter(cur.i + 1);
      });
      enter(0);
      if(cur) cur.raf = requestAnimationFrame(tick);
    },
    event: function(name){
      if(!cur) return;
      var s = cur.steps[cur.i];
      if(name === 'retry'){ cur.retry = true; return; }
      cur.retry = false;
      if(s.wait !== name || cur.busy) return;
      cur.busy = true;
      var at = cur.i, c = cur;
      setTimeout(function(){ if(cur === c && c.i === at) enter(at + 1); }, 500);
    }
  };
})();
