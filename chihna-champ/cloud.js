/* ચિહ્ન ચેમ્પ — ક્લાઉડ સેવ (Supabase)
   - પ્રગતિ (ઘર, તારા, પોઇન્ટ, ચેલેન્જ, મહાચેમ્પ, બેજ) લૉગિન થયેલા ભક્તના ખાતામાં: ટેબલ chihna_save.
   - ફોનમાં ફક્ત ચાલુ નકલ રહે; ફોન બદલો તો લૉગિન કરતાં પાછી આવે.
   - દરેક પ્રયત્ન (જીત / સમય પૂરો / અધૂરું) chihna_attempts માં; મોકલાયા પછી ફોનમાંથી ભૂંસાય (game.html નો CHIHNA_SAVE કરાર).
   - ફક્ત લાઈવ સાઈટ (github.io) પરથી. ગેસ્ટ કે નેટ વગર: કંઈ નહીં, ગેમ પહેલાંની જેમ ચાલે. */
(function(){
var LIVE=/(^|\.)github\.io$/.test(location.hostname);
var KEYS=['chihnaProg','chihnaStars','chihnaPts','chihnaRes','chihnaChal','chihnaMega','chihnaWin','chihnaBadges','chihnaZoneSeen'];
function g(k){try{return localStorage.getItem(k)}catch(e){return null}}
function s(k,v){try{v==null?localStorage.removeItem(k):localStorage.setItem(k,v)}catch(e){}}
function snap(){var o={};KEYS.forEach(function(k){var v=g(k);if(v!=null&&v!=='')o[k]=v});return o}
var cl=null,uid=null,ready=null,guest=false;
function conn(){
  if(ready)return ready;
  if(!LIVE||!window.SatsangAuth){ready=Promise.resolve(false);return ready}
  ready=SatsangAuth.ready().then(function(c){return c.auth.getSession().then(function(r){
    var u=r.data&&r.data.session&&r.data.session.user;if(!u){guest=true;return false}cl=c;uid=u.id;return true})}).catch(function(){return false});
  return ready}
/* ખોલતી વખતે: ક્લાઉડ નકલ લાવી ફોનમાં મૂકે (બીજા ભક્તની જૂની નકલ હોય તો પહેલાં સાફ) */
function pull(){return conn().then(function(ok){if(!ok)return false;
  var owner=g('chihnaOwner');if(owner&&owner!==uid){KEYS.concat(['chihnaLog','chihnaAt','chihnaFly']).forEach(function(k){s(k,null)});s('chihnaSaved',null)}
  s('chihnaOwner',uid);
  return cl.from('chihna_save').select('data,updated_at').eq('user_id',uid).maybeSingle().then(function(r){
    if(r.error)return false;var d=r.data;
    if(!d){push();return false}
    var mine=+g('chihnaSavedAt')||0,theirs=Date.parse(d.updated_at)||0,before=JSON.stringify(snap());
    if(theirs>mine||!g('chihnaSaved')){KEYS.forEach(function(k){s(k,d.data&&d.data[k]!=null?String(d.data[k]):null)});s('chihnaSaved',JSON.stringify(snap()));s('chihnaSavedAt',String(theirs))}
    else push();
    return JSON.stringify(snap())!==before})})}
/* બદલાયું હોય તો જ ક્લાઉડમાં મોકલે */
function push(){return conn().then(function(ok){if(!ok)return false;
  var o=snap(),j=JSON.stringify(o);if(j===g('chihnaSaved'))return true;
  return cl.from('chihna_save').upsert({user_id:uid,data:o,updated_at:new Date().toISOString()},{onConflict:'user_id'}).select('updated_at').single().then(function(r){
    if(r.error)return false;s('chihnaSaved',j);s('chihnaSavedAt',String(Date.parse(r.data.updated_at)||Date.now()));return true})}).catch(function(){return false})}
/* game.html નો કરાર: true મળે ત્યારે જ રેકોર્ડ ફોનમાંથી ભૂંસાય */
window.CHIHNA_SAVE=function(rec){return conn().then(function(ok){if(!ok)return guest; /* ગેસ્ટ: સંઘરવાનું ક્યાંય નથી, એટલે ફોનમાંથી ભૂંસો */
  if(!rec||!rec.id)return true;
  return cl.from('chihna_attempts').upsert({id:String(rec.id).slice(0,80),user_id:uid,rec:rec},{onConflict:'id',ignoreDuplicates:true}).then(function(r){return !r.error})}).catch(function(){return false})};
window.ChihnaCloud={pull:pull,push:push};
pull().then(function(changed){
  /* નકશો/મેનુ ખુલ્યા પછી ક્લાઉડમાંથી નવું આવ્યું હોય તો એક વાર ફરી દોરે */
  try{if(changed&&!/game\.html|charan\.html/.test(location.pathname)&&!sessionStorage.getItem('chihnaPulled')){sessionStorage.setItem('chihnaPulled','1');location.reload()}}catch(e){}
});
document.addEventListener('visibilitychange',function(){if(document.visibilityState==='hidden')push()});
window.addEventListener('pagehide',function(){push()});
window.addEventListener('online',function(){push()});
setInterval(function(){push()},20000);
})();
