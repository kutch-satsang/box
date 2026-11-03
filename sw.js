// સત્સંગ બોક્સ ઑફલાઇન કેશ. પહેલી વાર નેટ સાથે ખૂલે ત્યારે હોમ + બધી ગેમ સચવાય, પછી નેટ વગર ચાલે.
const C='satsang-box-v39';
const PRE=["./", "antahshatru-vijay/", "dhyan-murti/", "ekadashi/", "fal-ful-memory/", "prashn-leela/", "analytics.js", "box.js", "antahshatru-vijay/index.html", "apple-touch-icon.png", "clay.css", "dhyan-murti/assets/back.webp", "dhyan-murti/assets/front.webp", "dhyan-murti/assets/m_bh.mp3", "dhyan-murti/assets/m_d1.mp3", "dhyan-murti/assets/m_d2.mp3", "dhyan-murti/assets/m_d3.mp3", "dhyan-murti/assets/m_kr.mp3", "dhyan-murti/assets/m_om.mp3", "dhyan-murti/assets/sky/sky01.webp", "dhyan-murti/assets/sky/sky02.webp", "dhyan-murti/assets/sky/sky03.webp", "dhyan-murti/assets/sky/sky04.webp", "dhyan-murti/assets/sky/sky05.webp", "dhyan-murti/assets/sky/sky06.webp", "dhyan-murti/assets/sky/sky07.webp", "dhyan-murti/assets/sky/sky08.webp", "dhyan-murti/assets/sky/sky09.webp", "dhyan-murti/assets/sky/sky10.webp", "dhyan-murti/assets/sky/sky11.webp", "dhyan-murti/assets/sky/sky12.webp", "dhyan-murti/assets/sole.webp", "dhyan-murti/index.html", "dhyan-murti/session2.html", "ekadashi/index.html", "ekadashi/intro-full.webp", "fal-ful-memory/index.html", "fonts/baloo-bhai-2-gujarati-wght-normal.woff2", "fonts/baloo-bhai-2-latin-ext-wght-normal.woff2", "fonts/baloo-bhai-2-latin-wght-normal.woff2", "fonts/fonts.css", "fonts/hind-vadodara-gujarati-500-normal.woff2", "fonts/hind-vadodara-gujarati-600-normal.woff2", "fonts/hind-vadodara-latin-500-normal.woff2", "fonts/hind-vadodara-latin-600-normal.woff2", "fonts/hind-vadodara-latin-ext-500-normal.woff2", "fonts/hind-vadodara-latin-ext-600-normal.woff2", "fonts/noto-sans-gujarati-gujarati-wght-normal.woff2", "fonts/noto-sans-gujarati-latin-ext-wght-normal.woff2", "fonts/noto-sans-gujarati-latin-wght-normal.woff2", "fonts/noto-serif-gujarati-gujarati-wght-normal.woff2", "fonts/noto-serif-gujarati-latin-ext-wght-normal.woff2", "fonts/noto-serif-gujarati-latin-wght-normal.woff2", "fonts/playfair-display-latin-ext-wght-normal.woff2", "fonts/playfair-display-latin-wght-normal.woff2", "icon-192.png", "icon-512.png", "icon-maskable.png", "index.html", "lib/xlsx.full.min.js", "manifest.webmanifest", "prashn-leela/index.html", "themes/adhyatmik/mati/banner.webp", "themes/classic/kaach/scene.svg", "themes/adhyatmik/mati/bg.webp", "themes/adhyatmik/mati/mandir-full.webp", "themes/adhyatmik/mati/om.webp", "themes/adhyatmik/mati/t1.webp", "themes/adhyatmik/mati/t2.webp", "themes/adhyatmik/mati/t3.webp", "themes/adhyatmik/mati/t4.webp"];
async function grab(c,u){for(let i=0;i<3;i++){try{const r=await fetch(new Request(u,{cache:'reload'}));if(r.ok){await c.put(u,r);return}}catch(e){}}}
async function fill(){const c=await caches.open(C);const q=PRE.slice();await Promise.all(Array.from({length:6},async()=>{while(q.length)await grab(c,q.shift())}))}
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(fill())});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
function put(req,res){if(res&&res.status===200&&res.type==='basic'){const cp=res.clone();caches.open(C).then(c=>c.put(req,cp))}return res}
function fromCache(req){return caches.match(req,{ignoreSearch:true})}
async function ranged(req,res){const r=req.headers.get('range');if(!r||!res)return res;const m=/bytes=(\d*)-(\d*)/.exec(r);if(!m)return res;const b=await res.blob();const s=m[1]?+m[1]:0,en=m[2]?+m[2]:b.size-1;return new Response(b.slice(s,en+1),{status:206,headers:{'Content-Type':res.headers.get('Content-Type')||'audio/mpeg','Content-Range':'bytes '+s+'-'+en+'/'+b.size,'Content-Length':String(en-s+1),'Accept-Ranges':'bytes'}})}
self.addEventListener('fetch',e=>{
  const req=e.request,u=new URL(req.url);
  if(req.method!=='GET'||u.origin!==location.origin)return;
  const page=req.mode==='navigate'||/\.html?$|\/$/.test(u.pathname);
  if(page){
    // પાનું: પહેલાં નેટ (૪ સેકન્ડ), ન મળે તો સાચવેલું
    e.respondWith(new Promise(ok=>{let done=false;const fb=()=>fromCache(req).then(r=>r||fromCache('index.html')).then(r=>{if(!done){done=true;ok(r)}});const t=setTimeout(fb,4000);fetch(req).then(r=>{clearTimeout(t);put(req,r);if(!done){done=true;ok(r)}}).catch(()=>{clearTimeout(t);fb()})}));
    return;
  }
  // ફોટા, ફોન્ટ, અવાજ: પહેલાં સાચવેલું, પાછળથી નવું લાવી રાખે
  e.respondWith(fromCache(req).then(hit=>{
    if(req.headers.get('range')){return hit?ranged(req,hit):fetch(req)}
    const net=fetch(req).then(r=>put(req,r)).catch(()=>hit);
    return hit||net;
  }));
});
