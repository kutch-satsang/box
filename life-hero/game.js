// ================= Life Hero — લોક 1 (રમી શકાય તેવું વર્ઝન 1) =================
const FN=[['કામ','પવિત્રતા','મન સાફ રાખો, પવિત્ર વિચાર કરો.'],['ક્રોધ','શાંતિ','ગુસ્સો નહીં, શાંતિથી બોલો.'],['લોભ','સંતોષ','જે મળ્યું તેમાં સંતોષ રાખો.'],['મોહ','વિવેક','સાચું-ખોટું વિચારીને પસંદ કરો.'],
['અહંકાર','નમ્રતા','હું નહીં, આપણે — નમ્ર બનો.'],['ઈર્ષ્યા','પ્રેમ','બીજાની ખુશીમાં ખુશ થાઓ.'],['નિંદા','મીઠી વાણી','કોઈની ખોટી વાત ન કરો.'],['જૂઠ','સત્ય','હંમેશા સાચું બોલો.'],
['કપટ','સરળતા','ચાલાકી નહીં, સીધા-સરળ રહો.'],['દંભ','સાચી ભક્તિ','દેખાડો નહીં, દિલથી ભક્તિ.'],['વેર','ક્ષમા','માફ કરો, મન હળવું થાય.'],['હિંસા','દયા','સૌ જીવ પર દયા રાખો.'],
['ચોરી','પ્રામાણિકતા','પૂછ્યા વગર કંઈ ન લો.'],['વ્યસન','સંયમ','ખરાબ ટેવ છોડો, સંયમ રાખો.'],['આળસ','પુરુષાર્થ','ઊઠો, મહેનત કરો!'],['સ્વાર્થ','સેવા','બીજાની મદદ કરો.'],
['શંકા','શ્રદ્ધા','ભગવાન પર ભરોસો રાખો.'],['કુસંગ','સત્સંગ','સારા મિત્રો સાથે રહો.'],['મમતા','ત્યાગ','વહેંચવામાં આનંદ છે.'],['માન','નિર્માની','વખાણની ભૂખ ન રાખો.'],
['ભય','હિંમત','ડરો નહીં, હિંમત રાખો.'],['ચિંતા','ભરોસો','ચિંતા છોડો, ભરોસો રાખો.'],['નિરાશા','આશા','ફરી પ્રયત્ન કરો, આશા રાખો.'],['કૃતઘ્નતા','કૃતજ્ઞતા','ઉપકાર માનો, આભાર કહો.']];
const FC=A.fc.slice(); FC[11]='#a0714f';FC[13]='#a0714f';FC[12]='#9aa0b8';FC[16]='#9aa0b8';FC[20]='#9aa0b8';FC[22]='#8f9bb8';
const MIN_N=['ઊંઘ','સ્વાદ','અધીરાઈ','ઉદાસી','ચિડિયાપણું'];
const LOKS=['વાદળ','ચંદ્ર','મંગળ','શનિ','ધૂમકેતુ','નક્ષત્ર','ગેલેક્સી','સૂર્ય','નિહારિકા','દિવ્ય પ્રકાશ'];
const W_INFO={gada:['ગદા',0],baan:['બાણ',1],barchhi:['બરછી',2],dhal:['ઢાલ',3],shankh:['શંખ',4],parshu:['પરશુ',5],trishul:['ત્રિશૂળ',-1],chumbak:['ચુંબક',-1],samay:['ધીમો સમય',-1],hriday:['હૃદય',-1]};
// ખેલાડીનું નામ હબ (લૉગિન) માંથી — ગેમમાં નામ પૂછાતું નથી
const hubName=()=>{try{return(((JSON.parse(localStorage.getItem('sbProf'))||{}).name||'').trim().split(/\s+/)[0])||''}catch(e){return ''}};
// ---------- ખાસ સ્ટેજ (દર 9મું, ફરતા ક્રમે) ----------
const SPECIAL=[
 {id:'survive',n:'ટકી રહો',ic:'⏱',goal:'45 સેકન્ડ ટકી રહો!',T:45},
 {id:'lamps',n:'દીવા બચાવો',ic:'🪔',goal:'દોષને નીચે પહોંચવા ન દો — 3 દીવા બચાવો!'},
 {id:'rush',n:'ઝડપી દોડ',ic:'⚡',goal:'40 સેકન્ડમાં દોષ હરાવો!',T:40},
 {id:'weapons',n:'હથિયાર-ટ્રાયલ',ic:'🗡',goal:'દર 6 સેકન્ડે નવું હથિયાર — બધાં અજમાવો!'},
 {id:'gems',n:'રત્ન-વરસાદ',ic:'💎',goal:'40 સેકન્ડ — પડતાં રત્ન પકડો!',T:40},
 {id:'onehit',n:'એક-ઘા',ic:'❤',goal:'એક પણ ઘા નહીં — સાવધાન!'}];
const specialOf=n=>{const s=((n-1)%100)+1;return s%10===9?SPECIAL[Math.floor((n-1)/10)%6]:null};
const COMBO=[[4,2,'શાબાશ!','#9ff0ff'],[8,3,'અદ્ભુત!','#ffb3f0'],[15,3,'દિવ્ય!','#ffe36a']];

// ---------- સ્ટેજ એન્જિન (deterministic) ----------
const hsh=(n,j)=>{let x=(Math.imul(n,374761393)+Math.imul(j+7,668265263))>>>0;x=Math.imul(x^(x>>>13),1274126177)>>>0;return (x^(x>>>16))>>>0};
const introAt=k=>k<2?1:1+4*(k-1);            // સ્ટેજ 1: 2 દોષ, પછી દર 4 સ્ટેજે 1 (છેલ્લો 89 પર)
function stageData(n){
  const lok=Math.floor((n-1)/100), s=((n-1)%100)+1, lm=1+lok*0.35;
  const act=[];for(let k=0;k<24;k++)if(introAt(k)<=s)act.push(k);
  const fresh=act.filter(k=>introAt(k)===s);
  const boss=s%10===0?(s===100?'big':s===50?'mid':'mini'):null;
  let dur; if(boss)dur=boss==='big'?300:boss==='mid'?180:90+(s/90)*30;
  else if(s<=10)dur=60; else if(s<=50)dur=90+(s-11)/39*90; else dur=180+(s-51)/48*120;
  const dmg=1+Math.floor(s/25)+lok, dps=6*dmg*0.7;
  const waveLen=12, waves=boss?0:Math.max(4,Math.round(dur/waveLen));
  const per=Math.min(8,3+Math.floor(s/16));
  const thick=s>15?1:0, thickHP=12*dmg, thickWaves=Math.floor(waves/2);      // જાડો દોષ: દર બીજા મોજે 1 (12 ગોળી)
  const minions0=s<=50?2+Math.floor(s/25):0;
  const target=Math.min(0.73,(0.56+0.16*(s/100))*(1+lok*0.01));      // ધીમે ધીમે અઘરું, 0.75 થી નીચે
  const avg=waves?Math.max(4+s/12,(target*dur*dps-thickWaves*thickHP)/waves/per-minions0/per):1;
  const spread=Math.min(1+Math.floor(s/25),Math.max(0,Math.round(avg)-1));
  const lo=Math.max(1,Math.round(avg-spread/2)), hi=lo+spread;
  const minions=minions0;
  const speed=(1+0.006*s)*(1+lok*0.08);
  const forms=Math.min(FORM_POOL.length,3+Math.floor(s/6));
  const phases=boss==='big'?3:boss==='mid'?2:boss?1:0;
  const bossHP=boss?Math.round(0.42*dur*dps):0;
  const sp=specialOf(n);let W=waves,PER=per,LO=lo,HI=hi,SPD=speed,goal=0;
  if(sp){if(sp.id==='rush'){LO=HI=dmg;PER=Math.min(10,per+2);goal=Math.round(18+s*0.3)}      // એક ગોળીએ દોષ
    if(sp.id==='onehit'){W=Math.max(3,Math.round(waves*.6));PER=Math.max(3,per-1)}
    if(sp.id==='survive')SPD=speed*1.15;
    if(sp.id==='gems')PER=Math.max(3,per-2)}
  const total=W*(PER*(LO+HI)/2+minions)+thickWaves*thickHP+bossHP;
  return {n,s,lok,act,fresh,boss,dur,dmg,waves:W,waveLen,per:PER,lo:LO,hi:HI,thick,thickHP,minions,speed:SPD,forms,phases,bossHP,total,ratio:total/(dur*dps),sp,goal};
}
function checkAll(){let ok=0,mx=0,worst=0;for(let n=1;n<=1000;n++){const d=stageData(n);if(d.ratio<=0.75)ok++;if(d.ratio>mx){mx=d.ratio;worst=n}}
  const seen=new Set();for(let s=1;s<=100;s++)stageData(s).act.forEach(k=>seen.add(k));return {ok,mx,worst,all24:seen.size===24,last:introAt(23)}}

// ---------- સંગ્રહ ----------
// ver 2 (ક્રમ 1b): સ્ટાર = 2 બિટ/સ્ટેજ સ્ટ્રિંગ (3 સ્ટેજ = 1 અક્ષર), conf = સર્વરે માન્ય ખુલ્લું છેલ્લું સ્ટેજ, pend = મોકલવાનાં પરિણામ
// ver 3 (ક્રમ 2): up = અપગ્રેડ સ્તર, wing = સાથી યાન, cos = દેખાવ, achGot/achC = સિદ્ધિ મળી/લીધી, daily = રોજનું ઇનામ, chal = રોજનો પડકાર, stats = ગણતરી
const SKEY='lifehero_v2',OLDKEY='lifehero_v1',SAVE_VER=3;
const B64='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';
function starGet(s,n){const i=Math.floor((n-1)/3),k=(n-1)%3;if(!s||i>=s.length)return 0;return (B64.indexOf(s[i])>>(k*2))&3}
function starSet(s,n,v){s=s||'';const i=Math.floor((n-1)/3),k=(n-1)%3;while(s.length<=i)s+='A';let c=B64.indexOf(s[i]);c=(c&~(3<<(k*2)))|((v&3)<<(k*2));return s.slice(0,i)+B64[c]+s.slice(i+1)}
const PDEF={ver:SAVE_VER,music:false,conf:1,st:'',lok:1,beads:0,cards:{},gems:0,avatar:-1,name:'',streak:0,last:'',bonus:{},pend:[],srvOff:0,rel:null,lastSync:0,testOff:false,
  up:{rate:0,dmg:0,hp:0,help:0,mag:0,shield:0},wing:{own:{},lv:{},sel:''},trial:{},cos:{own:{},color:'',frame:'',title:'new',ship:'',bg:''},
  achGot:{},achC:{},daily:{last:'',day:0},chal:{date:'',prog:0,claimed:0},stats:{k:0,boss:0,combo:0,lamps3:0,onehit:0}};
function migrate(o){if(!o)return null;if(o.ver>=SAVE_VER)return o;
  let r=o;
  if(!(o.ver>=2)){let st='';if(o.stars)for(const k in o.stars)st=starSet(st,+k,o.stars[k]);       // v1 → v2 (કોઈની પ્રગતિ ન ખોવાય)
    r=Object.assign({},o,{st,conf:o.cur||1});delete r.stars;delete r.cur}
  r=Object.assign({},r,{ver:SAVE_VER});return r}                                   // v2 → v3: નવાં ફીલ્ડ PDEF માંથી આપોઆપ
let P;function loadP(){let o=null;try{o=JSON.parse(localStorage.getItem(SKEY))}catch(e){}
  if(!o){try{o=JSON.parse(localStorage.getItem(OLDKEY))}catch(e){}}
  const D=JSON.parse(JSON.stringify(PDEF));P=Object.assign(D,migrate(o)||{});
  for(const k of ['up','wing','cos','daily','chal','stats'])P[k]=Object.assign(JSON.parse(JSON.stringify(PDEF[k])),P[k]||{})}
function saveP(){try{localStorage.setItem(SKEY,JSON.stringify(P))}catch(e){}}
const getStar=n=>starGet(P.st,n),setStar=(n,v)=>{P.st=starSet(P.st,n,v)};
loadP();

// ---------- લોક ----------
const LOKN=[['☁️','વાદળલોક'],['🌙','ચંદ્રલોક'],['🔴','મંગળલોક'],['🪐','શનિલોક'],['☄️','ધૂમકેતુલોક'],['✨','નક્ષત્રલોક'],['🌌','ગેલેક્સીલોક'],['☀️','સૂર્યલોક'],['🌫️','નિહારિકાલોક'],['🌟','દિવ્ય પ્રકાશલોક']];
const CONTENT_LOKS=1;                       // રમતમાં બનેલા લોક (નવો લોક બને ત્યારે વધારવું)
const MAXST=()=>CONTENT_LOKS*100;
const GD=n=>LANG==='g'?String(n).replace(/\d/g,d=>'૦૧૨૩૪૫૬૭૮૯'[d]):String(n);
const GMON=['જાન્યુઆરી','ફેબ્રુઆરી','માર્ચ','એપ્રિલ','મે','જૂન','જુલાઈ','ઑગસ્ટ','સપ્ટેમ્બર','ઑક્ટોબર','નવેમ્બર','ડિસેમ્બર'];
const srvNow=()=>Date.now()+(P.srvOff||0);
const TEST_OPEN=false;                      // ચકાસણી માટે બધું ખુલ્લું — હબમાં મૂકતાં પહેલાં false કરવું
const unlocked=n=>(TEST_OPEN||n<=P.conf)&&n<=MAXST();
function lokStatus(L){const off=(L-1)*100;
  if(L===1||(L<=CONTENT_LOKS&&P.conf>off))return {open:true,t:'ખુલ્લો'};
  const rel=P.rel&&P.rel.find(r=>r.lok===L);
  if(!rel)return {open:false,t:P.rel?'જલ્દી આવશે':'નેટ આવે ત્યારે તારીખ દેખાશે'};
  const left=rel.opens_at-srvNow();
  if(left>0){const d=new Date(rel.opens_at),h=Math.ceil(left/36e5);
    return {open:false,date:true,t:`${GD(d.getDate())} ${GMON[d.getMonth()]}ના રોજ ખૂલશે`,cd:'⏳ '+(h>24?GD(Math.ceil(left/864e5))+' દિવસ':h>1?GD(h)+' કલાક':GD(Math.max(1,Math.ceil(left/6e4)))+' મિનિટ')}}
  if(!getStar(off))return {open:false,t:`લોક ${GD(L-1)} પૂરો કરો, પછી ખૂલશે`};
  return {open:false,t:'તૈયાર થઈ રહ્યો છે — જલ્દી!'}}

// ---------- નકલી સર્વર (ફક્ત preview માટે; હબમાં Supabase RPC lifehero_submit આ જ કામ કરશે) ----------
const FKEY='lifehero_fakeserver';
function srvLoad(){let s=null;try{s=JSON.parse(localStorage.getItem(FKEY))}catch(e){}
  if(!s){const d=new Date();s={top:P.conf-1,st:P.st,gems:P.gems,beads:P.beads,bonus:Object.assign({},P.bonus),ids:[],
    release:[{lok:1,opens_at:0},{lok:2,opens_at:new Date(d.getFullYear(),d.getMonth()+1,1).getTime()}]};srvSave(s)}
  // ક્રમ 2: ખરીદી/સિદ્ધિ/રોજનું ઇનામ (જૂના સર્વરમાં ન હોય તો ઉમેરો; હબમાં lifehero_progress.inv jsonb)
  if(!s.inv)s.inv={up:Object.assign({},PDEF.up,P.up),wing:{own:Object.assign({},P.wing.own),lv:Object.assign({},P.wing.lv)},cos:{own:Object.assign({},P.cos.own)},
    achC:Object.assign({},P.achC),daily:Object.assign({},P.daily),chalC:{}};
  return s}
function srvSave(s){try{localStorage.setItem(FKEY,JSON.stringify(s))}catch(e){}}
function testOpen(){if(!TEST_OPEN)return;const s=srvLoad();if(s.top<99){s.top=99;srvSave(s)}if(P.conf<100){P.conf=100;saveP()}}testOpen(); // ચકાસણી: લોક ૧ના બધા ૧૦૦ સ્ટેજ ખુલ્લા
function srvConf(s,now){const open=s.release.filter(r=>r.opens_at<=now).length;return Math.max(1,Math.min(s.top+1,open*100))}
function serverSubmit(events){return new Promise(res=>setTimeout(()=>{
  const s=srvLoad(),now=Date.now(),acc=[],rej=[];
  for(const e of events){
    if(s.ids.includes(e.id)){acc.push(e.id);continue}           // ફરી મોકલાયું — ડુપ્લિકેટ નહીં
    let bad='';
    if(e.kind==='buy'||e.kind==='ach'||e.kind==='daily'||e.kind==='chal'){bad=srvShop(s,e,now)}
    else if(e.kind==='bonus'){if(srvConf(s,now)<=e.floor*10+5)bad='બંધ ખજાનો';else if(s.bonus[e.floor])bad='લીધેલો ખજાનો';
      if(!bad){s.bonus[e.floor]=1;s.gems+=3}}
    else{const d=stageData(e.stage),first=!starGet(s.st,e.stage),minT=0.3*Math.min(d.dur,(d.sp&&d.sp.T)||d.dur);
      if(e.stage>srvConf(s,now))bad='બંધ સ્ટેજ';else if(e.dur<minT)bad='બહુ ઝડપી';else if(!(e.stars>=1&&e.stars<=3))bad='⭐ ખોટા';
      else if(e.gems>(first?50:0))bad='💎 વધારે';
      if(!bad){s.st=starSet(s.st,e.stage,Math.max(starGet(s.st,e.stage),e.stars));s.gems+=e.gems;if(first&&s.beads<108)s.beads++;if(e.stage===s.top+1)s.top=e.stage}}
    s.ids.push(e.id);bad?rej.push({id:e.id,why:bad}):acc.push(e.id)}
  if(s.ids.length>500)s.ids=s.ids.slice(-500);srvSave(s);
  res({conf:srvConf(s,now),st:s.st,gems:s.gems,beads:s.beads,bonus:s.bonus,now,release:s.release,inv:JSON.parse(JSON.stringify(s.inv)),accepted:acc,rejected:rej})},450))}
// સર્વર-નિયમ: ખરીદી (કિંમત સર્વર પોતે ગણે), સિદ્ધિ (એક જ વાર, ⭐/સ્ટેજ/માળા સર્વર-ડેટાથી), રોજનું ઇનામ (દિવસ દીઠ એક), પડકાર (દિવસ દીઠ એક)
function srvShop(s,e,now){const I=s.inv,conf=srvConf(s,now),today=dkey(now),yday=dkey(now-864e5);
  if(e.kind==='buy'){const pr=priceOf(e,I,conf);if(pr.bad)return pr.bad;if(pr.cost!==e.cost)return 'કિંમત ખોટી';if(s.gems<pr.cost)return '💎 ઓછા';
    s.gems-=pr.cost;applyInv(I,e);return ''}
  if(e.kind==='ach'){const a=ACH.find(x=>x.id===e.ach);if(!a)return 'સિદ્ધિ નથી';if(I.achC[a.id])return 'લીધેલી';
    if(a.srv&&!a.srv(s,I))return 'શરત પૂરી નથી';if(e.gems!==a.r)return '💎 ખોટા';I.achC[a.id]=1;s.gems+=a.r;return ''}
  if(e.kind==='daily'){if(e.date!==today&&e.date!==yday)return 'તારીખ ખોટી';if(I.daily.last&&e.date<=I.daily.last)return 'આજે લીધું છે';
    const day=nextDailyDay(I.daily,e.date);if(day!==e.day||e.gems!==DAILY[day-1])return '💎 ખોટા';I.daily={last:e.date,day};s.gems+=e.gems;return ''}
  if(e.kind==='chal'){if(e.date!==today&&e.date!==yday)return 'તારીખ ખોટી';if(I.chalC[e.date])return 'લીધેલો';if(e.gems!==CHAL_R)return '💎 ખોટા';
    I.chalC[e.date]=1;const ks=Object.keys(I.chalC).sort();while(ks.length>7)delete I.chalC[ks.shift()];s.gems+=CHAL_R;return ''}
  return 'અજાણ્યું'}

// ---------- સમન્વય (ઑફલાઇન બાકી-યાદી → સર્વર) ----------
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);
const isOnline=()=>navigator.onLine!==false&&!P.testOff;
let syncing=false,syncAgain=false;
function pushEvent(e){e.id=uid();e.at=srvNow();P.pend.push(e);saveP()}
async function sync(){if(syncing){syncAgain=true;return}if(!isOnline()){updCloud();return}
  syncing=true;updCloud();const before=P.conf;
  try{const sent=P.pend.slice(),r=await serverSubmit(sent);
    const done=new Set([...r.accepted,...r.rejected.map(x=>x.id)]);P.pend=P.pend.filter(e=>!done.has(e.id));
    P.conf=r.conf;P.st=r.st;P.gems=r.gems;P.beads=r.beads;P.bonus=Object.assign({},r.bonus);P.rel=r.release;P.srvOff=r.now-Date.now();P.lastSync=Date.now();
    if(r.inv)invToP(r.inv);
    for(const e of P.pend){if(e.kind==='bonus'){P.gems+=e.gems||0;P.bonus[e.floor]=1}else if(e.kind==='stage'){P.gems+=e.gems||0;setStar(e.stage,Math.max(getStar(e.stage),e.stars))}else applyLocal(e)}   // હજી બાકી હોય તે ફરી ઉમેરો
    if(r.inv)fixEquip();
    saveP();
    if(r.rejected.length)toast('⚠ '+r.rejected.length+' પરિણામ માન્ય ન થયું');
    else if(P.conf>before&&P.conf<=MAXST())toast('✔ સચવાયું · સ્ટેજ '+GD(((P.conf-1)%100)+1)+' ખૂલ્યું');
    else if(done.size)toast('✔ સચવાયું');
    afterSync(P.conf!==before||done.size>0);if(typeof updDots==='function')updDots()}
  catch(e){}finally{syncing=false;updCloud();if(syncAgain){syncAgain=false;setTimeout(sync,150)}}}
function updCloud(){const c=$('mcloud');if(!c)return;const n=P.pend.length;
  c.className=!isOnline()?'off':syncing?'busy':n?'pend':'ok';
  c.textContent=!isOnline()?'☁️ ઑફલાઇન'+(n?' · ⏳'+GD(n):''):syncing?'☁️ …':n?'☁️ ⏳ '+GD(n)+' બાકી':'☁️ ✔';
  const sl=$('syncL');if(sl)sl.innerHTML=syncLine()}
function syncLine(){return P.pend.length?(isOnline()?'⏳ સચવાય છે…':'⏳ નેટ આવે ત્યારે સચવાશે'):'✔ સચવાયું'}
function afterSync(changed){if($('mapV').classList.contains('on')&&changed&&!$('ov').classList.contains('on')){const sc=$('scroll').scrollTop;renderMap();$('scroll').scrollTop=sc}else if($('mapV').classList.contains('on'))tickLok()}
function goStage(m){
  if(m>MAXST()){const s=lokStatus(CONTENT_LOKS+1);closeOv();showMap();toast(LOKN[CONTENT_LOKS][0]+' લોક '+GD(CONTENT_LOKS+1)+': '+s.t+(s.cd?' '+s.cd:''));return}
  if(m>P.conf){if(isOnline()){toast('⏳ સચવાય છે… પછી ખુલશે');sync().then(()=>{if(m<=P.conf&&$('ov').classList.contains('on'))startStage(m)})}
    else toast('☁️🔒 નેટ આવે ત્યારે સ્ટેજ '+GD(((m-1)%100)+1)+' ખુલશે');return}
  startStage(m)}
(function streak(){const d=new Date().toISOString().slice(0,10);if(P.last===d)return;const y=new Date(Date.now()-864e5).toISOString().slice(0,10);P.streak=P.last===y?P.streak+1:Math.max(1,Math.floor(P.streak/2));P.last=d;saveP()})();

// ---------- ચિત્રો ----------
const IMG={};function im(src){const i=new Image();i.src=src;return i}
IMG.f=A.f.map(im);IMG.v=A.v.map(im);IMG.h=A.h.map(im);IMG.m=A.m.map(im);IMG.b=A.b.map(im);IMG.w={};for(const k in A.w)IMG.w[k]=im(A.w[k]);
IMG.gem=im(UI.gem);IMG.ship=im(A.ship);IMG.hand=im(UI2.hand);IMG.boss=im(A.boss);IMG.bg=im(A.bg);
const $=id=>document.getElementById(id);
let tt;function toast(m){const t=$('toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),1700)}
const vib=p=>{try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}};

// ================= નકશો =================
const SYMN=['દીવો','કમળ','તુલસી','ઘંટ','પુસ્તક','ઝરણું','ફળવૃક્ષ','ધજા','મંદિર શિખર','સોનેરી પર્વત'];
const MW=390,IW=1426,IH=1086,S=MW/IW,TH=IH*S,FLOORS=10;
const pads=[[607,752],[878,714],[1099,643],[896,576],[749,492],[977,426],[1124,336],[909,261],[676,218],[785,124],[1011,56]];
const step=TH-40,TOP=440,BOTTOM=190,MH=TOP+(FLOORS-1)*step+TH+BOTTOM,base=MH-BOTTOM-TH;
const tiers=[...Array(FLOORS)].map((_,i)=>({y:base-i*step,flip:i%2===1}));
const mpos=(i,k)=>{let[x,y]=pads[k];if(tiers[i].flip)x=IW-x;return[x*S,tiers[i].y+y*S]};
const starSvg=c=>`<img src="${c?UI.star:UI.starOff}" alt="">`;
const lockSvg='<svg width="16" height="16" viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="11" rx="3" fill="#fff"/><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="#fff" stroke-width="3"/></svg>';
const gemSvg='<svg width="20" height="20" viewBox="0 0 24 24"><path d="M12 2l8 7-8 13L4 9z" fill="#fff" opacity=".95"/><path d="M4 9h16M12 2l-3 7 3 13 3-13z" fill="none" stroke="#8a3bd1" stroke-width="1.4"/></svg>';
function renderMap(){
  const world=$('world');world.innerHTML='';world.style.height=MH+'px';
  const el=(cls,st,html,tag)=>{const d=document.createElement(tag||'div');d.className=cls;Object.assign(d.style,st||{});if(html!=null)d.innerHTML=html;world.appendChild(d);return d};
  const img=(cls,src,st)=>{const m=document.createElement('img');m.className=cls;m.src=src;m.alt='';Object.assign(m.style,st);world.appendChild(m);return m};
  if(P.lok>CONTENT_LOKS)P.lok=1;
  const off=(P.lok-1)*100,CUR=lokCur(P.lok),pendLock=P.pend.some(e=>e.kind!=='bonus'&&e.stage===P.conf);
  el('sky');
  for(let j=0;j<70;j++){const y=(j*97)%MH,x=(j*53)%380;if(((j*31)%100)/100<(1-y/MH)*1.1){const s=2+((j*13)%3);el('star',{left:x+'px',top:y+'px',width:s+'px',height:s+'px',animationDelay:(j%7)*.4+'s'})}}
  for(let j=0;j<22;j++){const y=TOP+((j*311)%(MH-TOP-60));el('cloud',{left:((j%2?-40:270)+(j*17)%30)+'px',top:y+'px',width:(120+(j*29)%60)+'px',height:(40+(j*7)%20)+'px',opacity:.35+.4*(y/MH)})}
  el('sun',{top:(MH-60)+'px'});
  for(let i=FLOORS-1;i>=0;i--){const t=tiers[i];el('tier'+(t.flip?' flip':''),{top:t.y+'px',zIndex:10+(FLOORS-i)},`<img src="${A.tier}" alt="">`)}
  for(let i=0;i<FLOORS-1;i++){const a=mpos(i,10),b=mpos(i+1,0),on=CUR>(i+1)*10;for(let j=1;j<6;j++){const t=j/6;el('dot'+(on?'':' off'),{left:(a[0]+(b[0]-a[0])*t)+'px',top:(a[1]+(b[1]-a[1])*t)+'px',zIndex:80})}}
  const cf=Math.floor((CUR-1)/10);
  for(let i=0;i<FLOORS;i++){const t=tiers[i],cx=(t.flip?IW-300:300)*S,lit=i<=cf;
    img('sym '+(lit?'lit':'dim'),A.sym[i],{left:cx+'px',top:(t.y+650*S)+'px',width:(i===7||i===8?96:112)+'px',zIndex:70});
    el('ftag',{left:cx+'px',top:(t.y+650*S+4)+'px',zIndex:71,color:lit?'#ffe36a':'#cfc8ee'},`માળ ${i+1} · ${SYMN[i]}`)}
  let stars=0;
  for(let i=0;i<FLOORS;i++)for(let k=0;k<11;k++){
    const[x,y]=mpos(i,k);
    if(k===5){const open=CUR>i*10+5,fl=(P.lok-1)*10+i;const b=el('node bonus'+(open?'':' lock'),{left:x+'px',top:y+'px',zIndex:90},gemSvg,'button');
      b.onclick=()=>{if(!open)return toast('🔒 પહેલાં આગળનાં સ્ટેજ જીતો');if(P.bonus[fl])return toast('💎 આ રત્ન લઈ લીધું છે');P.bonus[fl]=1;P.gems+=3;pushEvent({kind:'bonus',floor:fl,gems:3});openChest(3,()=>{updMapHud();sync()})};continue}
    const n=i*10+(k<5?k:k-1)+1,g=off+n,boss=n%10===0,lock=n>CUR,cur=n===CUR,sp=specialOf(g),cloud=pendLock&&n===CUR+1;
    const b=el('node'+(boss?' boss':'')+(sp?' special':'')+(n===100?' big':'')+(lock?' lock':'')+(cloud?' cloud':'')+(cur?' cur':''),{left:x+'px',top:y+'px',zIndex:cur?95:90},cloud?'☁️':lock&&!boss?lockSvg:n,'button');
    if(sp)el('spb',{left:(x+19)+'px',top:(y-14)+'px',zIndex:96},sp.ic);
    b.onclick=()=>{if(cloud){goStage(g);return}if(lock){b.classList.remove('shake');void b.offsetWidth;b.classList.add('shake');toast('🔒 સ્ટેજ '+n+' હજી બંધ છે'+(sp?' · '+sp.ic+' ખાસ: '+sp.n:''))}else startStage(g)};
    const st=getStar(g);stars+=st;
    if(n<CUR||st)el('stars',{left:x+'px',top:(y-(boss?24:18))+'px',zIndex:91},[0,1,2].map(j=>starSvg(j<st)).join(''));
    if(boss){const w=n===100?92:(n===50?72:58);img('bossimg',n===50||n===100?A.boss:A.f[stageData(g).act[hsh(g,3)%stageData(g).act.length]],{left:x+'px',top:(y-(n===100?26:22))+'px',width:w+'px',zIndex:89,filter:(lock?'grayscale(.35) brightness(.88) ':'')+'drop-shadow(0 4px 6px rgba(0,0,0,.5))'})}
    if(cur){img('pin',shipURL(),{left:(x-22)+'px',top:(y-22)+'px',zIndex:96});if(P.avatar>=0)img('av',A.h[P.avatar],{left:(x+28)+'px',top:(y+16)+'px',zIndex:97,width:'28px',height:'28px',borderWidth:'2px'})}
  }
  el('banner',{top:(base+TH+8)+'px',zIndex:99},LOKN[P.lok-1][0]+' લોક '+GD(P.lok)+' · '+LOKN[P.lok-1][1]);
  const c=el('curtain',{height:(TOP-150)+'px',zIndex:98});
  for(let j=0;j<9;j++){const s=document.createElement('div');s.className='cl';Object.assign(s.style,{left:(j*48-30)+'px',top:(TOP-230+(j%3)*14)+'px',width:'110px',height:'70px'});c.appendChild(s)}
  const lb=el('lockbub',{top:'92px',zIndex:99},'');lb.id='lokbub';lb.onclick=showLoks;tickLok();
  $('sc').innerHTML=`<img class=ic src="${UI.star}">`+stars+'/300';
  $('cta').textContent=CUR>100?'લોક '+GD(P.lok)+' પૂરો ✔':cloudCta(CUR,pendLock);
  $('mtitle').textContent=LOKN[P.lok-1][0]+' લોક '+GD(P.lok)+' · '+LOKN[P.lok-1][1]+' ▾';updMapHud();updCloud();
}
function lokCur(L){const off=(L-1)*100;let c=Math.max(1,Math.min(101,P.conf-off));if(c===100&&getStar(off+100))c=101;return c}
function cloudCta(CUR,pl){return (pl?'☁️ ':'')+'રમો ▶ સ્ટેજ '+CUR}
function tickLok(){const lb=$('lokbub');if(!lb)return;const L=P.lok+1;
  if(L>10){lb.innerHTML='<div class="b">🌟</div>બધા લોક પૂરા!';return}
  const s=lokStatus(L);
  lb.innerHTML=`<div class="b">${s.open?LOKN[L-1][0]:'<svg width="40" height="40" viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="11" rx="3" fill="#7a55e0"/><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="#7a55e0" stroke-width="3"/></svg>'}</div>લોક ${GD(L)} · ${LOKN[L-1][1]}<br><span style="font-weight:500;font-size:14px">${s.t}</span>${s.cd?'<br><span class="cd">'+s.cd+'</span>':''}`}
function showLoks(){let h='<div class="ctitle">લોક પસંદ કરો</div><div class="loklist">';
  for(let L=1;L<=10;L++){const s=lokStatus(L),cur=L===P.lok;h+=`<button class="lokrow${s.open?'':' lk'}${cur?' sel':''}" data-l="${L}"><span class="li">${LOKN[L-1][0]}</span><span class="ln">લોક ${GD(L)} · ${LOKN[L-1][1]}<small>${s.t}${s.cd?' · '+s.cd:''}</small></span></button>`}
  h+='</div><button class="btn" onclick="closeOv()">બંધ કરો</button>';openOv(h);
  document.querySelectorAll('.lokrow').forEach(b=>b.onclick=()=>{const L=+b.dataset.l,s=lokStatus(L);if(!s.open){toast('🔒 '+s.t+(s.cd?' '+s.cd:''));return}P.lok=L;saveP();closeOv();renderMap();mapScroll()})
}
function updMapHud(){$('mbeads').innerHTML=`<img class=ic src="${UI.mala}">`+P.beads+'/108';$('mgems').innerHTML=`<img class=ic src="${UI.gem}">`+P.gems;$('mstreak').innerHTML=`<img class=ic src="${UI.fire}">`+P.streak;if(P.avatar>=0)$('mface').src=A.h[P.avatar];applyFrame();updDots()}
function mapScroll(){const b=document.querySelector('#world .node.cur');const sc=$('scroll');if(!b)return;sc.style.scrollBehavior='auto';sc.scrollTop=parseFloat(b.style.top)-sc.clientHeight*.58}
function showMap(){closeOv();setMusic('map');$('gameV').classList.remove('on');$('mapV').classList.add('on');if(G&&G.n){const L=Math.floor((G.n-1)/100)+1;if(L<=CONTENT_LOKS)P.lok=L}stopGame();renderMap();requestAnimationFrame(mapScroll);sync();setTimeout(checkAch,600)}

// ---------- કાર્ડ (સદ્ગુણ મિનાર) ----------
function showCards(){let h='<div class="ctitle">સદ્ગુણ મિનાર · કાર્ડ</div><div class="cgrid">';
  for(let k=0;k<24;k++){const o=P.cards[k];h+=`<div class="card ${o?'':'lockc'}"><img src="${A.f[k]}"><img src="${A.v[k]}" class="vv"><b>${o?FN[k][0]+' → '+FN[k][1]:'?'}</b>${o?'<small>'+FN[k][2]+'</small>':'<small>હરાવો એટલે ખુલશે</small>'}</div>`}
  h+='</div><button class="btn" onclick="closeOv()">બંધ કરો</button>';openOv(h)}
const CLOSE_RE=/<button class="(?:btn(?: sec)?|spl on)" onclick="closeOv\(\)(?:;renderMap\(\))?">બંધ કરો<\/button>/g;
let ovRO=null;
function openOv(h,opt){const x=(opt&&opt.x)||CLOSE_RE.test(h);CLOSE_RE.lastIndex=0;if(x)h=h.replace(CLOSE_RE,'');
  $('ov').innerHTML='<div class="panel">'+h+'</div>'+(x?'<button id="ovx" aria-label="બંધ કરો"><img src="'+A2.ui_close+'"></button>':'');$('ov').classList.add('on');
  if(ovRO){ovRO.disconnect();ovRO=null}
  if(x){const b=$('ovx'),p=document.querySelector('#ov .panel');
    const pos=()=>{const o=$('ov').getBoundingClientRect(),r=p.getBoundingClientRect();b.style.left=Math.min(o.width-46,r.right-o.left-36)+'px';b.style.top=Math.max(4,r.top-o.top-12)+'px'};
    pos();if(window.ResizeObserver){ovRO=new ResizeObserver(pos);ovRO.observe(p)}
    b.onclick=()=>{SFX.tap();closeOv();if($('mapV').classList.contains('on')){const sc=$('scroll').scrollTop;renderMap();$('scroll').scrollTop=sc}}}}
function closeOv(){$('ov').classList.remove('on');if(ovRO){ovRO.disconnect();ovRO=null}}
let pvWp='',pvCo=null,setPg=0;
const card=(on,att,img,n,tag)=>`<div class="sw"><button class="scard${on?' on':''}" ${att}><img class="cbg" src="${on?A2.ui_cardOn:A2.ui_card}"><img class="sim" src="${img}">${tag?'<em>'+tag+'</em>':''}</button><span>${n}</span></div>`;
function bgCards(){const sel=+P.cos.bg||0;let h=card(!sel,'data-bg=""',A2.ic_reset,'આપોઆપ');
  for(let L=1;L<=10;L++){const ok=bgOpen(L),nm=LOKS[L-1];
    h+=ok?card(sel===L,'data-bg="'+L+'"',BGART[L],nm):`<div class="sw"><button class="scard lk" data-bgl="${L}"><img class="cbg" src="${A2.ui_cardLock}"><span class="lkl">🔒</span></button><span>${nm}</span></div>`}
  return h}
const BGART={1:A.bg};for(let L=2;L<=10;L++)BGART[L]=A2['bg_'+L];
function showSettings(pg){if(typeof pg==='number')setPg=pg;
  const vol=P.sfx===false?-1:(P.vol==null?1:P.vol),sp=(on,k,t)=>`<button class="spl${on?' on':''}" data-k="${k}">${t}</button>`;
  const sd=shipDef(),cos=pvCo===null?(P.wing.sel||''):pvCo,wd=WINGS.find(w=>w.id===cos);
  const WP=[['gada','ગદા'],['baan','બાણ'],['barchhi','બરછી'],['parshu','પરશુ'],['trishul','ત્રિશૂળ'],['dhal','ઢાલ'],['shankh','શંખ']];
  const pgs=[
  `<div class="sh"><img src="${A2.ic_sound}"><span>અવાજ</span></div><div class="sr3">${sp(vol===0,'v0','ઓછો')+sp(vol===1,'v1','મધ્યમ')+sp(vol===2,'v2','મોટો')}</div>
   <div class="sh"><img src="${A2.ic_music}"><span>બેકગ્રાઉન્ડ બીટ</span></div><div class="sr2">${sp(P.music!==false,'m1','ચાલુ')+sp(P.music===false,'m0','બંધ')}</div>`,
  `<div class="sh2">✦ યાન <small>(ફક્ત દેખાવ)</small></div><div class="g4">${SHIPS.map(s=>card((P.cos.ship||'')===s.id,'data-sh="'+s.id+'"',s.art||A.ship,s.n)).join('')}</div>
   <div class="sh2">🕊 સાથી યાન <small>(દુકાનમાંથી મળે)</small></div><div class="g4">${WINGS.map(w=>card(cos===w.id,'data-co="'+w.id+'"',w.art,w.n,P.wing.own[w.id]?'✔':'')).join('')}${card(cos==='','data-co=""',A2.ic_reset,'કોઈ નહીં')}</div>
   <div class="snote">${cos&&!P.wing.own[cos]?'🔒 આ સાથી હજી તમારી પાસે નથી — ઉપર ફક્ત નમૂનો. <b class="lnk" id="goShop">🛒 દુકાન ▶</b>':'દબાવો એટલે ઉપર જોવા મળશે.'}</div>`,
  `<div class="sh2">🗡 હથિયાર <small>(દબાવીને ઉપર જુઓ)</small></div><div class="g4">${WP.map(w=>card(pvWp===w[0],'data-wp="'+w[0]+'"',A.w[w[0]],w[1])).join('')}${card(pvWp==='','data-wp=""',A.ship,'કોઈ નહીં')}</div>
   <div class="snote">રમતમાં હથિયાર ખજાનામાંથી થોડા સમય માટે મળે છે. અહીં ફક્ત જોવા માટે.</div>`,
  `<div class="sh2">🌌 પાછળનું દૃશ્ય <small>(નવો લોક ખૂલે એટલે નવું ઉમેરાય)</small></div><div class="g4">${bgCards()}</div>
   <div class="snote">દબાવો એટલે ઉપર દેખાશે અને રમતમાં પહેલા સ્ટેજથી એ જ આવશે. "આપોઆપ" = દરેક લોકનું પોતાનું.</div>`];
  openOv(`<div class="sribbon"><img src="${A2.ui_ribbon}"><b>સેટિંગ્સ</b></div>
  <div class="pv"><canvas id="pvc"></canvas><div class="ptag">${sd.n} યાન${wd?' + '+wd.n:''}${pvWp?' · '+WP.find(x=>x[0]===pvWp)[1]:''}</div></div>
  <div class="ptabs">${['🔊 અવાજ','🚀 યાન','🗡 હથિયાર','🌌 દૃશ્ય'].map((t,k)=>`<button data-pg="${k}" class="${k===setPg?'on':''}">${t}</button>`).join('')}</div>
  <div class="pages" id="pages">${pgs.map(h=>`<div class="pgx">${h}</div>`).join('')}</div>
  <div class="foot"><button class="spl" id="tstB">🧪 ટેસ્ટ</button></div>`,{x:1});
  const p=document.querySelector('#ov .panel');p.dataset.p='set';p.classList.add('sp2');
  const pgsE=$('pages'),tb=[...p.querySelectorAll('[data-pg]')];
  pgsE.scrollLeft=setPg*pgsE.clientWidth;
  tb.forEach(b=>b.onclick=()=>{setPg=+b.dataset.pg;pgsE.scrollTo({left:setPg*pgsE.clientWidth,behavior:'smooth'});tb.forEach(x=>x.classList.toggle('on',x===b))});
  pgsE.addEventListener('scroll',()=>{const k=Math.round(pgsE.scrollLeft/pgsE.clientWidth);if(k!==setPg){setPg=k;tb.forEach((x,j)=>x.classList.toggle('on',j===k))}});
  p.querySelectorAll('[data-k]').forEach(b=>b.onclick=()=>{const k=b.dataset.k;
    if(k[0]==='v'){P.sfx=true;P.vol=+k[1]}else if(k==='m1')P.music=true;else if(k==='m0')P.music=false;
    saveP();setVol();$('muteB')&&($('muteB').className=P.sfx!==false?'on':'off');SFX.tap();showSettings()});
  p.querySelectorAll('[data-sh]').forEach(b=>b.onclick=()=>{P.cos.ship=b.dataset.sh;saveP();SFX.tap();showSettings()});
  p.querySelectorAll('[data-co]').forEach(b=>b.onclick=()=>{const id=b.dataset.co;pvCo=id;if(id===''||P.wing.own[id]){P.wing.sel=id;saveP()}SFX.tap();showSettings()});
  p.querySelectorAll('[data-bg]').forEach(b=>b.onclick=()=>{P.cos.bg=b.dataset.bg;saveP();SFX.tap();showSettings()});
  p.querySelectorAll('[data-bgl]').forEach(b=>b.onclick=()=>toast('🔒 લોક '+GD(+b.dataset.bgl)+' ખૂલે એટલે આ દૃશ્ય ખૂલશે'));
  p.querySelectorAll('[data-wp]').forEach(b=>b.onclick=()=>{pvWp=b.dataset.wp;SFX.tap();showSettings()});
  const gs=$('goShop');if(gs)gs.onclick=()=>{closeOv();openShop('wing')};
  $('tstB').onclick=()=>{SFX.tap();showTest()};
  pvStart()}
// ---------- સેટિંગ્સનું લાઇવ ડિસ્પ્લે ----------
let pvRaf=0;
function pvStart(){cancelAnimationFrame(pvRaf);const c=$('pvc');if(!c)return;const x=c.getContext('2d');let W=0,H=0,D=1,t=0,bul=[],en=[],fxs=[],fire=0,hit=0,ring=0,ang=0,nE=0,lt=0;
  const rs=()=>{const r=c.getBoundingClientRect();W=r.width;H=r.height;D=Math.min(2,devicePixelRatio||1);c.width=Math.max(1,W*D);c.height=Math.max(1,H*D)};rs();
  const wimg={};const WI=k=>wimg[k]||(wimg[k]=im(A.w[k]));
  const img=(I,px,py,w)=>{if(!I||!I.complete||!I.width)return;x.drawImage(I,px-w/2,py-w*I.height/I.width/2,w,w*I.height/I.width)};
  const loop=now=>{if(!c.isConnected)return;if(!W||!H)rs();const dt=Math.min(.05,(now-(lt||now))/1000);lt=now;t+=dt;
    const ws=pvWp,cosId=pvCo===null?(P.wing.sel||''):pvCo,W_=WINGS.find(w=>w.id===cosId);
    x.setTransform(D,0,0,D,0,0);{const n=(P.lok-1)*100+1;liveBg(x,bgFor(n),bgLok(n),W,H,t)}
    x.fillStyle='rgba(20,14,70,.35)';x.fillRect(0,0,W,H);x.fillStyle='rgba(255,255,255,.7)';for(let i=0;i<18;i++)x.fillRect((i*73)%W,((i*137)+t*(30+i%5*20))%H,2,2);
    const sx=W/2+Math.sin(t*.8)*W*.26,sy=H-Math.min(52,H*.2),sc=Math.min(1,H/260);
    nE-=dt;if(nE<=0){nE=1.2;en.push({x:30+Math.random()*(W-60),y:-20,hp:3,k:Math.floor(Math.random()*24)})}
    for(const e of en){e.y+=45*dt;img(IMG.f[e.k],e.x,e.y,46*sc+8)}
    fire-=dt;if(fire<=0){if(ws==='trishul'){fire=.28;[-.22,0,.22].forEach(a=>bul.push({x:sx,y:sy-26,vx:Math.sin(a)*600,vy:-Math.cos(a)*600,k:'s'}))}else{fire=.2;bul.push({x:sx,y:sy-26,vx:0,vy:-620,k:'s'})}}
    const hx=sx-48,hy=sy+4;
    if(ws==='gada'||ws==='baan'||ws==='barchhi'){hit-=dt;if(hit<=0){
      if(ws==='gada'){hit=.7;bul.push({x:hx,y:hy-20,vx:0,vy:-340,k:'gada',r:0})}
      if(ws==='baan'){hit=.5;[-.2,0,.2].forEach(a=>bul.push({x:hx,y:hy-20,vx:Math.sin(a)*480,vy:-Math.cos(a)*480,k:'baan',r:a}))}
      if(ws==='barchhi'){hit=.8;bul.push({x:hx,y:hy-20,vx:0,vy:-520,k:'barchhi',r:0})}}}
    if(ws==='shankh'){hit-=dt;if(hit<=0){hit=2.6;ring=.001}}if(ring>0){ring+=dt;if(ring>1){ring=0;en.length=0}}
    for(let i=bul.length-1;i>=0;i--){const b=bul[i];b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.k==='gada')b.r+=dt*10;if(b.y<-30){bul.splice(i,1);continue}
      for(let j=en.length-1;j>=0;j--){const e=en[j];if(Math.hypot(b.x-e.x,b.y-e.y)<26){e.hp--;if(b.k!=='barchhi')bul.splice(i,1);if(e.hp<=0||b.k==='gada'){en.splice(j,1);fxs.push({x:e.x,y:e.y,t:0})}break}}}
    for(const b of bul){if(b.k==='s'){x.save();x.shadowColor='#fff3a0';x.shadowBlur=10;x.fillStyle='#fffbe0';x.fillRect(b.x-3,b.y-9,6,18);x.restore()}else{x.save();x.translate(b.x,b.y);x.rotate(b.r);const I=WI(b.k);if(I.width)x.drawImage(I,-17,-17,34,34);x.restore()}}
    for(let i=fxs.length-1;i>=0;i--){const f=fxs[i];f.t+=dt;x.save();x.globalAlpha=Math.max(0,1-f.t*2);x.fillStyle='#ffe36a';x.beginPath();x.arc(f.x,f.y,10+f.t*50,0,7);x.fill();x.restore();if(f.t>.5)fxs.splice(i,1)}
    if(ring>0){x.save();x.strokeStyle='rgba(255,240,200,'+(1-ring)+')';x.lineWidth=10*(1-ring)+2;x.beginPath();x.arc(sx,sy,30+ring*H,0,7);x.stroke();x.restore()}
    if(ws==='parshu'){ang+=dt*5;const ax=sx+Math.cos(ang)*58,ay=sy-16+Math.sin(ang)*58;x.save();x.translate(ax,ay);x.rotate(ang*2.5);x.drawImage(WI('parshu'),-18,-18,36,36);x.restore();
      for(let j=en.length-1;j>=0;j--){const e=en[j];if(Math.hypot(e.x-ax,e.y-ay)<30){en.splice(j,1);fxs.push({x:e.x,y:e.y,t:0})}}}
    for(let j=en.length-1;j>=0;j--)if(en[j].y>H+30)en.splice(j,1);
    if(W_){const wy=sy-14+Math.sin(t*3)*5;x.save();x.shadowColor=W_.col;x.shadowBlur=18;img(wingArtC(W_),sx+52,wy,54);x.restore();if(t%.5<dt)bul.push({x:sx+52,y:wy-20,vx:0,vy:-560,k:'s'})}
    if(ws&&ws!=='trishul'){x.save();x.shadowColor='#fff3b0';x.shadowBlur=16;img(IMG.h[Math.max(0,P.avatar)],hx,hy,48);x.restore()}
    x.fillStyle='rgba(255,220,120,.5)';x.beginPath();x.ellipse(sx,sy+32,9,15+Math.sin(t*30)*4,0,0,7);x.fill();
    img(shipImg(),sx,sy,64);
    if(ws==='dhal'){x.save();x.strokeStyle='rgba(255,215,90,.7)';x.lineWidth=3;x.shadowColor='#ffd23a';x.shadowBlur=12;x.beginPath();x.arc(sx,sy,44,0,7);x.stroke();img(WI('dhal'),sx,sy-48,38);x.restore()}
    pvRaf=requestAnimationFrame(loop)};
  pvRaf=requestAnimationFrame(loop)}
const wacC={};function wingArtC(w){return wacC[w.id]||(wacC[w.id]=im(w.art))}
function showTest(){const c=checkAll(),sp=(id,t)=>`<button class="spl sm" id="${id}">${t}</button>`;
  openOv(`<div class="sribbon"><img src="${A2.ui_ribbon}"><b>🧪 ટેસ્ટ</b></div>
  <div class="sinfo">સ્ટેજ-એન્જિન ચકાસણી: જીતી શકાય <b>${c.ok}/1000</b> · સૌથી અઘરું ${c.mx.toFixed(2)} (સ્ટેજ ${c.worst}) · 24 દોષ ${c.all24?'✔':'✘'} (છેલ્લો સ્ટેજ ${c.last})</div>
  <div class="sinfo">☁️ સર્વરે માન્ય: સ્ટેજ ${GD(Math.min(P.conf,MAXST()))} સુધી ખુલ્લું · બાકી પરિણામ ${GD(P.pend.length)} · સેવ v${P.ver}</div>
  <button class="stg" id="tOff"><img src="${P.testOff?A2.ui_tgOn:A2.ui_tgOff}"><span>નેટ બંધ (ઑફલાઇન રમો)</span></button>
  <div class="sr2 s2">${sp('unl','🔓 બધા 100 સ્ટેજ')}${sp('l2now','🗓 લોક ૨ હમણાં')}</div>
  <div class="sr2 s2">${sp('g500','+500 💎')}${sp('dAgain','🎁 રોજનું ફરી')}</div>
  <div class="sr2 s2">${sp('rst','↺ પ્રગતિ શરૂઆતથી')}</div>
  <button class="btn" id="tBack">◀ સેટિંગ્સ</button>`,{x:1});
  const p=document.querySelector('#ov .panel');p.dataset.p='set';
  $('tBack').onclick=()=>{SFX.tap();showSettings()};
  $('tOff').onclick=()=>{P.testOff=!P.testOff;saveP();updCloud();toast(P.testOff?'☁️ ઑફલાઇન (ટેસ્ટ)':'☁️ નેટ ચાલુ');if(!P.testOff)sync();showTest()};
  $('unl').onclick=()=>{const s=srvLoad();s.top=Math.max(s.top,99);srvSave(s);P.conf=Math.max(P.conf,100);saveP();closeOv();renderMap();mapScroll();toast('બધા સ્ટેજ ખુલ્યા (ટેસ્ટ)');sync()};
  $('l2now').onclick=()=>{const s=srvLoad();s.release.forEach(r=>{if(r.lok===2)r.opens_at=Date.now()});srvSave(s);closeOv();sync().then(tickLok);toast('લોક ૨ ની તારીખ આવી ગઈ (ટેસ્ટ)')};
  $('g500').onclick=()=>{const s=srvLoad();s.gems+=500;srvSave(s);closeOv();sync().then(updMapHud);toast('+500 💎 (ટેસ્ટ)')};
  $('dAgain').onclick=()=>{const back=d=>d?dkey(Date.parse(d+'T12:00:00')-864e5):d;const s=srvLoad();s.inv.daily.last=back(s.inv.daily.last);s.inv.chalC={};srvSave(s);P.daily.last=back(P.daily.last);P.chal={date:'',prog:0,claimed:0};saveP();closeOv();sync().then(updDots);toast('રોજનું ઇનામ ફરી ખુલ્યું (ટેસ્ટ)')};
  $('rst').onclick=()=>{const a=P.avatar,nm=P.name;localStorage.removeItem(SKEY);localStorage.removeItem(OLDKEY);localStorage.removeItem(FKEY);loadP();P.avatar=a;P.name=nm;saveP();testOpen();closeOv();renderMap();mapScroll();sync()};
}
function chooseAvatar(){let h='<div class="ctitle">તમારો હીરો પસંદ કરો</div><div class="avgrid">';
  A.h.forEach((s,i)=>h+=`<button class="avb ${i===Math.max(0,P.avatar)?'sel':''}" data-i="${i}"><img src="${s}"></button>`);
  h+=`</div><button class="btn" id="avok">શરૂ કરો ▶</button>`;openOv(h);
  let sel=Math.max(0,P.avatar);document.querySelectorAll('.avb').forEach(b=>b.onclick=()=>{sel=+b.dataset.i;document.querySelectorAll('.avb').forEach(x=>x.classList.toggle('sel',x===b))});
  $('avok').onclick=()=>{P.avatar=sel;saveP();closeOv();renderMap();mapScroll()}}

// ================= રમત =================
const cv=$('cv'),cx=cv.getContext('2d');let CW=390,CH=760,DPR=2;
function resize(){const r=$('gameV').getBoundingClientRect();CW=r.width;CH=r.height;DPR=Math.min(2.5,window.devicePixelRatio||1);cv.width=CW*DPR;cv.height=CH*DPR;cv.style.width=CW+'px';cv.style.height=CH+'px'}
addEventListener('resize',()=>{if(G)resize()});
let G=null,raf=0;
const tintCache={};
function tinted(bi,col){const key=bi+col;if(tintCache[key])return tintCache[key];const b=IMG.b[bi];if(!b.complete||!b.width)return null;
  const c=document.createElement('canvas');c.width=b.width;c.height=b.height;const x=c.getContext('2d');x.drawImage(b,0,0);x.globalCompositeOperation='source-atop';
  const g=x.createRadialGradient(c.width/2,c.height/2,0,c.width/2,c.height/2,c.width/2);g.addColorStop(0,'#fff');g.addColorStop(.18,'#fff6d0');g.addColorStop(.42,col);g.addColorStop(1,col);x.fillStyle=g;x.fillRect(0,0,c.width,c.height);return tintCache[key]=c}

function startStage(n,opt){opt=opt||{};
  if(P.avatar<0){chooseAvatar();return}
  if(!opt.trial&&!unlocked(n)){goStage(n);return}
  auResume();setMusic(d0Mode(n));closeOv();$('hF').src=A.h[Math.max(0,P.avatar)];$('mapV').classList.remove('on');$('gameV').classList.add('on');resize();
  const d=stageData(n);
  G={d,n,t:0,ts:1,slowT:0,ship:{x:CW/2,y:CH-62,r:24,inv:0},bul:[],en:[],drops:[],fx:[],words:[],orbs:[],eb:[],
     energy:100,score:0,mala:0,wrong:0,wave:-1,waveT:0,spawnQ:[],boss:null,state:'intro',introT:2.4,kills:{},newCards:[],
     fireT:0,pw:{},helper:null,shake:0,flash:0,ck:{wave:0,score:0,mala:0},paused:false,bgY:0,sad:0,cleared:false,
     combo:0,comboT:0,mult:1,comboPop:0,comboBest:0,sp:d.sp,spT:d.sp&&d.sp.T||0,lamps:3,rushK:0,gemsGot:0,gemT:1,wpT:1.5,wpI:0,warnT:0,hurtN:0,trial:opt.trial||''};
  applyBoosts(G);
  if(!G.trial)try{window.sbTrack&&sbTrack.start({mode:'stage',count:n})}catch(e){}    // હબ: રમત શરૂ
  if(d.boss)G.wave=0;
  G.tut=(n===1&&!P.tut)?7:0;
  const names=(d.boss==='mid'||d.boss==='big')?['લોકનો મોટો રાક્ષસ']:(d.boss?[FN[pickBossFault(d)][0]+' (બોસ)']:pickSet(d,0).map(k=>FN[k][0]).filter((v,i,a)=>a.indexOf(v)===i));
  const spH=d.sp?`<div class="sp">✨ ખાસ સ્ટેજ · ${d.sp.ic} ${d.sp.n}</div><div class="spg">${d.sp.id==='rush'?d.sp.T+' સેકન્ડમાં '+d.goal+' દોષ હરાવો!':d.sp.goal}</div>`:'';
  if(d.sp)G.introT=3.2;
  $('introL').innerHTML=`<div class="st">સ્ટેજ ${d.s}${d.boss?' · 👹 બોસ':''}</div>${spH}${d.fresh.length?'<div class="nw">નવો દોષ! '+d.fresh.map(k=>FN[k][0]).join(', ')+'</div>':''}<div class="in">આ સ્ટેજમાં: ${names.slice(0,5).join(', ')}${names.length>5?'…':''}</div>`;
  $('introL').classList.add('on');updHud();
  cancelAnimationFrame(raf);last=performance.now();raf=requestAnimationFrame(loop);
}
function stopGame(){cancelAnimationFrame(raf);G=null}
const d0Mode=n=>stageData(n).boss?'boss':'game';
const pickBossFault=d=>d.act[hsh(d.n,3)%d.act.length];
function pickSet(d,w){const set=[];if(d.fresh.length)set.push(...d.fresh);const want=Math.min(d.act.length,2+Math.floor(d.s/20));let j=0;
  while(set.length<want&&j<60){const k=d.act[hsh(d.n*31+w,j)%d.act.length];if(!set.includes(k))set.push(k);j++}return set}

// શત્રુઓની ગોઠવણી/ચાલ: ક્રમ પ્રમાણે ખુલે (સ્ટેજ 1 થી જ 3 પ્રકાર, પછી વધતા)
const FORM_POOL=[2,1,8,6,3,7,5,9,10,4,0];
function spawnWave(w){const d=G.d,set=pickSet(d,w),form=w===0&&d.fresh.length?1:FORM_POOL[hsh(d.n,w+50)%d.forms],sd=hsh(d.n,w+9)%2?1:-1;
  const cnt=d.per,vy=(72+d.s*.45)*d.speed;
  for(let i=0;i<cnt;i++){const k=set[i%set.length];const hp=d.lo+(hsh(d.n*7+w,i)%(d.hi-d.lo+1));
    G.spawnQ.push({at:G.t+i*0.28,o:{k,hp,max:hp,r:27,form,i,cnt,vy,born:0,ax:0,ay:-40,sd}})}
  if(w%2===1)for(let i=0;i<d.thick;i++){const k=set[(i+1)%set.length];G.spawnQ.push({at:G.t+cnt*0.28+0.6+i*0.8,o:{k,hp:d.thickHP,max:d.thickHP,r:36,form:2,i:i,cnt:2,vy:vy*.8,thick:1,ay:-50}})}
  for(let i=0;i<d.minions;i++)G.spawnQ.push({at:G.t+0.4+i*1.1,o:{min:hsh(d.n+w,i)%5,hp:1,max:1,r:19,form:2,i:i+3,cnt:6,vy:vy*1.25,ay:-30}});
}
function enemyPos(e,dt){const t=e.born,F=e.form,cx0=CW/2,sp=Math.min(CW-60,300);
  const band=CH*(.22+.18*((e.i%3)/2));const slow=e.ay>band&&e.min==null?.3:1;e.ay+=e.vy*dt*slow*(G.pw.samay>0?.45:1);if(e.kb>0){e.ay-=e.kb*dt*60;e.kb*=.8}
  let x,y=e.ay;const u=e.cnt>1?e.i/(e.cnt-1):.5;
  switch(F){case 0:x=cx0+(u-.5)*sp;y+=0;break;
    case 1:x=cx0+(u-.5)*sp;y-=Math.abs(u-.5)*110;break;
    case 2:x=cx0+Math.sin(t*1.6+e.i*1.3)*sp*.45;break;
    case 3:x=cx0+(u-.5)*sp;y+=Math.sin(t*2.2+u*6)*26;break;
    case 4:{const a=t*1.2+e.i/e.cnt*Math.PI*2;x=cx0+Math.cos(a)*95;y+=Math.sin(a)*60;break}
    case 6:x=cx0+(e.sd||1)*((u-.5)*sp)+Math.sin(t*1.4)*30*(e.sd||1);y-=u*140;break;            // ત્રાંસી લાઇન
    case 7:{const side=(e.i%2?1:-1)*(e.sd||1),k=Math.min(1,t/2.2);x=cx0+side*(sp*.55*(1-k*.6)+Math.sin(t*2+e.i)*18*k);break}   // બંને બાજુથી ભીંસ
    case 8:x=cx0+Math.sin(t*2.6+e.i*.9)*sp*.5;y+=Math.abs(Math.sin(t*1.3+e.i))*18;break;       // ઝડપી ઝિગઝેગ
    case 9:{const bx=cx0+(u-.5)*sp+Math.sin(t*3+e.i)*20;                                         // હવામાં અટકી, પછી યાન પર ઝપટ
      if(!e.dv&&e.ay>band*.9&&e.min==null){e.dv=1;e.dt=t;e.xs=bx;e.dx=G.ship.x}
      if(e.dv){e.ay+=e.vy*dt*2.2;y=e.ay;x=e.xs+(e.dx-e.xs)*Math.min(1,(t-e.dt)/.9)}else x=bx;break}
    case 10:{const a=t*1.8+e.i*1.2,R=Math.max(30,95-t*8);x=cx0+Math.cos(a)*R*(e.sd||1);y+=Math.sin(a)*R*.45;break}  // ગોળ ફરતા ઊતરે
    default:x=cx0+(e.i%2?1:-1)*(70+Math.floor(e.i/2)%2*40)+Math.sin(t*3+e.i)*16;y-=Math.floor(e.i/2)*24;}
  if(F!==9||!e.dv)x+=Math.sin(t*1.1+e.i*2.1)*10;                                               // હળવો ડોલન — કડક સીધી લાઇન નહીં
  x=Math.max(e.r+6,Math.min(CW-e.r-6,x));
  e.x=x;e.y=y}
function spawnBoss(){const d=G.d,big=d.boss!=='mini';const k=pickBossFault(d);
  G.boss={k,big,x:CW/2,y:-120,ty:150,hp:d.bossHP,max:d.bossHP,phase:1,phases:d.phases,r:big?92:68,shotT:2,sumT:5,t:0,img:big?IMG.boss:IMG.f[k],col:big?'#d0379a':FC[k]}}

let last=0;
function loop(now){if(!G)return;let dt=Math.min(.05,(now-last)/1000);last=now;if(!G.paused){if(G.slowT>0){G.slowT-=dt;dt*=.3}update(dt)}draw();raf=requestAnimationFrame(loop)}
function update(dt){const g=G,d=g.d;g.t+=dt;g.bgY+=dt*18;
  if(g.state==='intro'){g.introT-=dt;if(g.introT<=0){$('introL').classList.remove('on');
      if(d.boss){g.state='warn';g.warnT=2.6;SFX.siren();vib([120,80,120,80,120])}else{g.state='play';nextWave()}}moveShip(dt);return}
  if(g.state==='warn'){g.warnT-=dt;moveShip(dt);updFx(dt);if(g.warnT<=0){g.state='play';spawnBoss();g.shake=.4;bigText(d.boss==='mini'?'બોસ આવ્યો!':'મોટો રાક્ષસ!')}return}
  if(g.state!=='play'){updFx(dt);return}
  if(g.clearNow){g.clearNow=false;g.en.forEach(e=>killFx(e,false,true));g.en.length=0;g.eb.length=0;g.spawnQ.length=0}
  for(const k in g.pw){if(g.pw[k]>0)g.pw[k]-=dt}
  if(g.helper){g.helper.t-=dt;if(g.helper.t<=0)g.helper=null}
  // કૉમ્બો સમય
  if(g.combo>0){g.comboT-=dt;if(g.comboT<=0){g.combo=0;g.mult=1}}if(g.comboPop>0)g.comboPop-=dt;
  // ખાસ સ્ટેજ
  const sp=g.sp;
  if(sp&&!g.cleared){
    if(sp.T){g.spT-=dt;if(g.spT<=0){g.spT=0;if(sp.id==='rush')return lose('સમય પૂરો!');return winNow()}}
    if(sp.id==='gems'){g.gemT-=dt;if(g.gemT<=0){g.gemT=1.7;g.drops.push({type:'g',x:40+hsh(g.n,g.drops.length+(g.t*10|0))%(CW-80),y:-20,r:20,vy:150,t:0,ph:Math.random()*6})}}
    if(sp.id==='weapons'){g.wpT-=dt;if(g.wpT<=0){g.wpT=6;const L=['gada','baan','barchhi','parshu','trishul','dhal','shankh'];catchWeapon({k:L[g.wpI++%L.length],x:g.ship.x,y:g.ship.y-40})}}
  }
  moveShip(dt);
  // ship fire
  g.fireT-=dt;if(g.fireT<=0){g.fireT=1/g.fr;const dm=d.dmg*g.dmM;
    if(g.pw.trishul>0){SFX.shoot();}if(g.pw.trishul>0)[-.22,0,.22].forEach(a=>g.bul.push({x:g.ship.x,y:g.ship.y-30,vx:Math.sin(a)*1150,vy:-Math.cos(a)*1150,dm,r:5}));
    else g.bul.push({x:g.ship.x,y:g.ship.y-30,vx:0,vy:-1150,dm,r:5});SFX.shoot()}
  // helper weapons
  if(g.helper)helperFire(dt);
  if(g.wing)wingUpdate(dt);
  // spawn queue
  for(let i=g.spawnQ.length-1;i>=0;i--){if(g.spawnQ[i].at<=g.t){const o=g.spawnQ[i].o;o.born=0;g.en.push(o);g.spawnQ.splice(i,1)}}
  // enemies
  for(const e of g.en){e.born+=dt;enemyPos(e,dt)}
  for(let i=g.en.length-1;i>=0;i--){const e=g.en[i];
    if(e.y>CH+40){g.en.splice(i,1);if(sp&&sp.id==='lamps'){if(e.min==null)lampOut();}else hurt(4,false);if(!G||G.state!=='play')return;continue}
    if(dist(e,g.ship)<e.r+g.ship.r-6){g.en.splice(i,1);if(g.pw.dhal>0){killFx(e,true)}else{hurt(15,true);killFx(e,false)}}}
  // boss
  if(g.boss)updBoss(dt);
  // bullets
  for(let i=g.bul.length-1;i>=0;i--){const b=g.bul[i];b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.spin!=null)b.spin+=dt*12;
    if(b.y<-40||b.x<-40||b.x>CW+40){g.bul.splice(i,1);continue}
    let hit=false;
    for(let j=g.en.length-1;j>=0;j--){const e=g.en[j];if(e.y<56||(b.hitSet&&b.hitSet.has(e)))continue;if(dist(b,e)<e.r+b.r){e.hp-=b.dm;e.flash=.08;SFX.hit();e.kb=(e.kb||0)+(e.thick?.6:1.4);g.fx.push({type:'spark',x:b.x,y:b.y,vx:(Math.random()-.5)*120,vy:-60-Math.random()*80,t:0,life:.25,col:'#fff6c0'});if(b.hitSet)b.hitSet.add(e);else hit=true;if(e.hp<=0){g.en.splice(j,1);defeat(e)}if(hit)break}}
    if(!hit&&g.boss&&g.boss.y>0&&dist(b,g.boss)<g.boss.r+b.r){hitBoss(b.dm);hit=!b.hitSet}
    if(hit)g.bul.splice(i,1)}
  // enemy bullets
  for(let i=g.eb.length-1;i>=0;i--){const b=g.eb[i];b.x+=b.vx*dt;b.y+=b.vy*dt;if(b.y>CH+20){g.eb.splice(i,1);continue}
    if(dist(b,g.ship)<g.ship.r+b.r){g.eb.splice(i,1);if(!(g.pw.dhal>0))hurt(8,true)}}
  // drops
  for(let i=g.drops.length-1;i>=0;i--){const v=g.drops[i];v.t+=dt;
    const mg=(v.type!=='w'&&g.pw.chumbak>0)||(g.magR&&v.y>0&&dist(v,g.ship)<g.magR);
    if(mg){const dx=g.ship.x-v.x,dy=g.ship.y-v.y,l=Math.hypot(dx,dy)||1;v.x+=dx/l*380*dt;v.y+=dy/l*380*dt}
    else{v.y+=v.vy*dt;v.x+=Math.sin(v.t*2+v.ph)*20*dt}
    if(v.y>CH+40){g.drops.splice(i,1);continue}
    if(dist(v,g.ship)<v.r+g.ship.r){g.drops.splice(i,1);v.type==='g'?catchGem(v):catchWeapon(v)}}
  updFx(dt);
  // waves
  if(!d.boss&&sp&&sp.T){if(g.cleared){}else{const live=g.en.length+g.spawnQ.length;g.waveT+=dt;   // સમયવાળા ખાસ સ્ટેજ: મોજાં સતત
    if((live<=2&&g.waveT>1)||g.waveT>d.waveLen)nextWave()}}
  else if(!d.boss){const live=g.en.length+g.spawnQ.length;g.waveT+=dt;
    if((live===0&&g.waveT>1.5)||(g.waveT>d.waveLen+6&&live<=2)||g.waveT>d.waveLen+25){if(g.wave>=d.waves-1){if(live===0&&!g.cleared){g.cleared=true;setTimeout(()=>win(),900)}}else nextWave()}}
  if(g.tut>0){g.tut-=dt;if(g.tut<=0){P.tut=1;saveP()}}
  if(g.shake>0)g.shake-=dt;if(g.flash>0)g.flash-=dt;if(g.sad>0)g.sad-=dt;
  updHud();
}
function nextWave(){const g=G,sp=g.sp;
  if(g.wave>=0&&!(sp&&(sp.id==='weapons'||sp.id==='gems'))&&!(sp&&sp.T&&g.wave%3!==2)){ // wave drop (સમયવાળા ખાસ સ્ટેજમાં દર 3 મોજે)
    const w=g.wave;dropWeapon(CW/2+(hsh(g.n,w)%120-60),-20)}
  g.wave++;g.waveT=0;g.ck={wave:g.wave,score:g.score,mala:g.mala};spawnWave(g.wave);
  if(g.wave>0&&!(sp&&sp.T))bigText('મોજું '+(g.wave+1)+'/'+g.d.waves,'#bfe3ff',.9)}
function lampOut(){const g=G;g.lamps--;SFX.wrong();g.shake=.3;vib(80);
  g.fx.push({type:'txt',s:'🪔 દીવો ઓલવાયો!',x:CW/2,y:CH-90,col:'#ffb36a',t:0,life:1.2});if(g.lamps<=0)lose('દીવા ઓલવાઈ ગયા!')}
function catchGem(v){const g=G;g.gemsGot++;g.score+=5*g.mult;SFX.catch_();g.fx.push({type:'txt',s:'💎 +1',x:v.x,y:v.y-20,col:'#9ff0ff',t:0,life:.8})}
function addCombo(){const g=G;g.combo++;g.comboT=2.5;g.comboPop=.25;g.comboBest=Math.max(g.comboBest,g.combo);if(!g.trial){if(g.combo>P.stats.combo)P.stats.combo=g.combo;chalMax('combo8',g.combo)}
  const lv=COMBO.findIndex(c=>c[0]===g.combo);
  if(lv>=0){const c=COMBO[lv];g.mult=c[1];SFX.combo(lv);bigText(c[2]+(lv<2?' ×'+c[1]:''),c[3],1.1,CH*.5);
    if(lv===2){g.energy=Math.min(100,g.energy+10);g.fx.push({type:'txt',s:'⚡ +10',x:g.ship.x,y:g.ship.y-50,col:'#ffe36a',t:0,life:1})}}
  if(g.sp&&g.sp.id==='rush'){g.rushK++;if(g.rushK>=g.d.goal)winNow()}}
function winNow(){const g=G;if(g.cleared)return;g.cleared=true;g.clearNow=true;bigText('🏁 પૂરું!','#ffe36a',1);setTimeout(()=>win(),700)}
function moveShip(dt){const s=G.ship;if(keys.l)s.x-=360*dt;if(keys.r)s.x+=360*dt;s.x=Math.max(28,Math.min(CW-28,s.x));s.y=CH-62;if(s.inv>0)s.inv-=dt}
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function hurt(n,flash){const g=G;n*=g.eM||1;if(flash){if(g.ship.inv>0)return;if(wingBlock())return;g.hurtN++;SFX.hurt();g.ship.inv=.8;g.shake=.25;vib(40);g.combo=0;g.mult=1;if(g.sp&&g.sp.id==='onehit'){g.energy=0;return lose('એક ઘા લાગ્યો!')}}g.energy=Math.max(0,g.energy-n);if(g.energy<=0)lose()}
function defeat(e){const g=G;
  if(e.min!=null){g.score+=5*g.mult;killFx(e,true,true);addCombo();return}
  g.score+=10*e.max*g.mult;g.kills[e.k]=1;if(!g.trial){P.stats.k++;chalAdd('k40',1)}if(!P.cards[e.k]&&!g.newCards.includes(e.k))g.newCards.push(e.k);
  killFx(e,true);
  g.mala++;addCombo()}
function killFx(e,word,small){SFX.burst(!!e.thick);const g=G,col=e.min!=null?'#b9a6e8':FC[e.k];
  g.fx.push({type:'burst',x:e.x,y:e.y,t:0,life:.55,size:(e.thick?190:small?90:140),bi:hsh(e.x|0,e.y|0)%3,col});
  for(let i=0;i<10;i++){const a=Math.random()*6.28,v=80+Math.random()*160;g.fx.push({type:'spark',x:e.x,y:e.y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,t:0,life:.6,col})}
  if(word&&e.min==null)g.words.push({x:e.x,y:e.y,t:0,a:FN[e.k][0],b:FN[e.k][1],col})}
function bigText(s,col,life,y){G.fx.push({type:'big',s,col:col||'#ffe36a',t:0,life:life||1.3,y})}
function dropWeapon(x,y){const keysW=Object.keys(W_INFO);const k=keysW[hsh(G.n*13,G.wave+G.drops.length)%keysW.length];G.drops.push({type:'w',k,x,y,r:23,vy:100,t:0,ph:Math.random()*6})}
function catchWeapon(v){const g=G,[nm,hi]=W_INFO[v.k];v.k==='shankh'?SFX.shankh():SFX.power();
  if(v.k==='hriday'){g.energy=Math.min(100,g.energy+30*(g.eM||1));g.fx.push({type:'txt',s:'❤ ઊર્જા +30',x:v.x,y:v.y-20,col:'#ff8fb1',t:0,life:1});return}
  if(hi<0){g.pw[v.k]=v.k==='samay'?6:g.helpT;bigText(nm+'!','#c9f1ff',1);return}
  const me=Math.max(0,P.avatar),sameG=(hi<3)===(me<3),hiI=sameG?hi:me; // રમનાર છોકરી → છોકરી, છોકરો → છોકરો
  g.helper={i:hiI,k:v.k,t:g.helpT,T:g.helpT,cd:0,ang:0,x:g.ship.x-56,y:g.ship.y+6};if(v.k==='dhal')g.pw.dhal=g.helpT;
  bigText('સાથી '+(hiI<3?'આવ્યો':'આવી')+' · '+nm,'#ffe9a8',1.1);
  if(v.k==='shankh'){g.fx.push({type:'ring',x:g.ship.x,y:g.ship.y,t:0,life:1});g.shake=.4;vib(60);
    for(let j=g.en.length-1;j>=0;j--){const e=g.en[j];e.hp-=20*g.d.dmg;if(e.hp<=0){g.en.splice(j,1);defeat(e)}}if(g.boss)hitBoss(25*g.d.dmg)}}
function helperFire(dt){const g=G,h=g.helper,s=g.ship;h.x+=((s.x-56)-h.x)*Math.min(1,dt*8);h.y=s.y+4;h.cd-=dt;const dm=g.d.dmg;
  if(h.k==='parshu'){h.ang+=dt*5;const ax=s.x+Math.cos(h.ang)*70,ay=s.y-20+Math.sin(h.ang)*70;h.ax=ax;h.ay=ay;
    for(let j=g.en.length-1;j>=0;j--){const e=g.en[j];if(Math.hypot(e.x-ax,e.y-ay)<e.r+20&&!(e.pc>g.t)){e.hp-=2*dm;e.pc=g.t+.25;if(e.hp<=0){g.en.splice(j,1);defeat(e)}}}
    if(g.boss&&Math.hypot(g.boss.x-ax,g.boss.y-ay)<g.boss.r+20&&!(g.boss.pc>g.t)){g.boss.pc=g.t+.25;hitBoss(2*dm)}return}
  if(h.k==='dhal'||h.k==='shankh')return;
  if(h.cd>0)return;
  if(h.k==='gada'){h.cd=.45;g.bul.push({x:h.x,y:h.y-30,vx:0,vy:-560,dm:3*dm,r:15,img:'gada',spin:0,helper:1})}
  if(h.k==='baan'){h.cd=.4;[-.16,0,.16].forEach(a=>g.bul.push({x:h.x,y:h.y-30,vx:Math.sin(a)*820,vy:-Math.cos(a)*820,dm:2*dm,r:10,img:'baan',rot:a,helper:1}))}
  if(h.k==='barchhi'){h.cd=.6;g.bul.push({x:h.x,y:h.y-30,vx:0,vy:-760,dm:3*dm,r:12,img:'barchhi',hitSet:new Set(),helper:1})}}
function updBoss(dt){const g=G,b=g.boss;b.t+=dt;b.y+=(b.ty-b.y)*Math.min(1,dt*1.5);b.x=CW/2+Math.sin(b.t*.7*(1+b.phase*.25))*(CW/2-b.r-10);
  b.shotT-=dt*(G.pw.samay>0?.45:1);if(b.shotT<=0){b.shotT=Math.max(.7,1.9-b.phase*.35);const n=2+b.phase;
    for(let i=0;i<n;i++){const a=Math.PI/2+(i-(n-1)/2)*.28;g.eb.push({x:b.x,y:b.y+b.r*.6,vx:Math.cos(a)*150,vy:Math.sin(a)*170,r:9})}}
  b.sumT-=dt;if(b.sumT<=0){b.sumT=7-b.phase;const d=g.d;for(let i=0;i<2+b.phase;i++){const k=d.act[hsh(g.n*5+Math.floor(b.t),i)%d.act.length];const sh=Math.round(3+d.s/10)*d.dmg;g.en.push({k,hp:sh,max:sh,r:26,form:2,i,cnt:4,vy:(60+d.s*.3),born:0,ay:b.y,x:b.x,y:b.y})}}
  if(b.flash>0)b.flash-=dt}
function hitBoss(n){const g=G,b=g.boss;if(!b||b.dead)return;b.hp-=n;b.flash=.06;
  const th=b.max*(1-b.phase/b.phases);
  if(b.phase<b.phases&&b.hp<=th){b.phase++;g.slowT=1.2;g.flash=.5;g.shake=.5;vib([60,40,60]);bigText('ફેઝ '+b.phase+'!','#ffb3d1');SFX.phase();dropWeapon(b.x,b.y)}
  if(b.hp<=0){b.dead=true;SFX.burst(true);SFX.phase();const big=b.big;for(let i=0;i<(big?7:4);i++)setTimeout(()=>{if(!G)return;G.fx.push({type:'burst',x:b.x+(Math.random()-.5)*b.r*1.6,y:b.y+(Math.random()-.5)*b.r*1.4,t:0,life:.8,size:big?260:200,bi:i%3,col:b.col})},i*140);
    g.kills[b.k]=1;if(!b.big&&!P.cards[b.k]&&!g.newCards.includes(b.k))g.newCards.push(b.k);
    g.words.push({x:b.x,y:b.y,t:0,a:b.big?'રાક્ષસ':FN[b.k][0],b:b.big?'સદ્ગુણ':FN[b.k][1],col:b.col,big:1});
    g.score+=500*(b.big?3:1);g.shake=.8;vib([100,50,150]);if(g.d.boss==='big'){g.flash=1.4;g.slowT=2}
    setTimeout(()=>{if(G){G.boss=null;G.en.length=0;win()}},1800)}}
function updFx(dt){const g=G;
  for(let i=g.fx.length-1;i>=0;i--){const f=g.fx[i];f.t+=dt;if(f.type==='spark'){f.x+=f.vx*dt;f.y+=f.vy*dt;f.vx*=.92;f.vy*=.92}if(f.type==='txt')f.y-=30*dt;if(f.t>f.life)g.fx.splice(i,1)}
  for(let i=g.words.length-1;i>=0;i--){const w=g.words[i];w.t+=dt;if(w.t>1.2){g.words.splice(i,1);g.orbs.push({x:w.x,y:w.y-40,t:0})}}
  for(let i=g.orbs.length-1;i>=0;i--){const o=g.orbs[i];o.t+=dt*1.6;if(o.t>=1)g.orbs.splice(i,1)}}
function updHud(){const g=G;if(!g)return;const hE=$('hE'),bw=hE.parentNode.clientWidth+16;hE.style.width=(bw*g.energy/100)+'px';hE.style.backgroundSize=bw+'px 100%';hE.className=g.energy>50?'':g.energy>25?'mid':'low';
  $('hS').textContent=g.score;$('hM').innerHTML=`<img class=ic src="${UI.mala}">`+g.mala;
  const sp=g.sp,sec=Math.ceil(g.spT);
  $('hW').textContent=g.d.boss?(g.boss?'બોસ '+Math.max(0,Math.ceil(g.boss.hp/g.boss.max*100))+'%':'બોસ'):
    sp?(sp.id==='survive'?'⏱ '+sec+' સે.':sp.id==='rush'?'⚡ '+g.rushK+'/'+g.d.goal+' · '+sec+' સે.':sp.id==='gems'?'💎 '+g.gemsGot+' · '+sec+' સે.':
       sp.id==='lamps'?'🪔 '+g.lamps+'/3 · મોજું '+Math.max(1,g.wave+1)+'/'+g.d.waves:(sp.id==='onehit'?'❤ એક-ઘા · ':'🗡 ')+'મોજું '+Math.max(1,g.wave+1)+'/'+g.d.waves)
    :'મોજું '+Math.max(1,g.wave+1)+'/'+g.d.waves;
  $('hF').classList.toggle('sad',g.sad>0)}

// ---------- દોરવું ----------
function draw(){const g=G;if(!g)return;cx.setTransform(DPR,0,0,DPR,0,0);
  let sx=0,sy=0;if(g.shake>0){sx=(Math.random()-.5)*10;sy=(Math.random()-.5)*10}cx.translate(sx,sy);
  // bg
  liveBg(cx,bgFor(g.n),BGIMG[bgLok(g.n)]?bgLok(g.n):1,CW,CH,g.t);
  cx.fillStyle='rgba(255,255,255,.35)';for(let i=0;i<5;i++){const y=((i*211)+g.t*(40+i*12))%(CH+120)-60,x=(i%2?CW-70:-30)+Math.sin(i)*20;cx.beginPath();cx.ellipse(x+50,y,60,18,0,0,7);cx.fill()}
  cx.fillStyle='rgba(20,14,70,.28)';cx.fillRect(-10,-10,CW+20,CH+20);
  // moving light specks
  cx.fillStyle='rgba(255,255,255,.7)';for(let i=0;i<26;i++){const x=(i*73)%CW,y=((i*137)+g.t*(30+i%5*20))%CH;cx.fillRect(x,y,2,2)}
  // drops
  for(const v of g.drops){if(v.type==='g'){cx.save();cx.shadowColor='#9ff0ff';cx.shadowBlur=16;cx.translate(v.x,v.y);cx.rotate(Math.sin(v.t*4)*.25);dimg(IMG.gem,0,0,v.r*2);cx.restore()}
    else{cx.save();cx.shadowColor='#9ff0ff';cx.shadowBlur=20;cx.strokeStyle='rgba(180,240,255,.9)';cx.lineWidth=3;cx.beginPath();cx.arc(v.x,v.y,v.r+4,0,7);cx.stroke();cx.restore();dimg(IMG.w[v.k],v.x,v.y,v.r*2)}}
  // enemies
  for(const e of g.en){const I=e.min!=null?IMG.m[e.min]:IMG.f[e.k];cx.save();if(e.flash>0){e.flash-=1/60;cx.filter='brightness(1.8)'}
    if(e.min==null){const pu=.5+.5*Math.sin(g.t*4+e.i*1.7);aura(e.x,e.y,e.r*(1.9+.25*pu),.38+.22*pu);       // ડરામણો: લાલ ઓરા + ઘેરો રંગ + ધ્રુજારી
      dimg(scaryImg(I),e.x+Math.sin(g.t*26+e.i*5)*1.2,e.y+Math.sin(g.t*19+e.i*3)*.8,e.r*2.3*(1+.03*pu))}else dimg(I,e.x,e.y,e.r*2.3);cx.restore();
    if(e.min==null){cx.save();cx.fillStyle='rgba(255,255,255,.92)';cx.beginPath();cx.arc(e.x,e.y+e.r*.32,e.thick?13:10,0,7);cx.fill();cx.fillStyle='#3a1a5a';cx.font=`700 ${e.thick?15:13}px B,sans-serif`;cx.textAlign='center';cx.textBaseline='middle';cx.fillText(Math.max(1,Math.ceil(e.hp)),e.x,e.y+e.r*.32+1);cx.restore()}}
  // boss
  if(g.boss){const b=g.boss;cx.save();aura(b.x,b.y,b.r*2.1,.45+.2*Math.sin(g.t*3));if(b.flash>0)cx.filter='brightness(1.7)';if(b.dead)cx.globalAlpha=Math.max(0,.6);dimg(b.img,b.x,b.y,b.r*2.3);cx.restore();
    const bw=CW-60;cx.fillStyle='rgba(20,14,70,.75)';rr(30,74,bw,14,7);cx.fill();cx.fillStyle=b.col;rr(30,74,bw*Math.max(0,b.hp/b.max),14,7);cx.fill();
    cx.fillStyle='#fff';cx.font='700 12px B';cx.textAlign='center';cx.fillText((b.big?'મોટો રાક્ષસ':FN[b.k][0]+' બોસ')+' · ફેઝ '+b.phase+'/'+b.phases,CW/2,70)}
  // enemy bullets
  for(const b of g.eb){cx.save();cx.shadowColor='#ff5fb0';cx.shadowBlur=12;cx.fillStyle='#ff8fca';cx.beginPath();cx.arc(b.x,b.y,b.r,0,7);cx.fill();cx.restore()}
  // bullets
  for(const b of g.bul){if(b.img){cx.save();cx.translate(b.x,b.y);cx.rotate(b.spin!=null?b.spin:(b.rot||0));const I=IMG.w[b.img];const sz=b.img==='gada'?40:34;cx.drawImage(I,-sz/2,-sz/2,sz,sz);cx.restore()}
    else if(b.wc){cx.save();cx.shadowColor=b.wc;cx.shadowBlur=10;cx.fillStyle=b.wc;rr(b.x-2,b.y-7,4,14,2);cx.fill();cx.restore()}
    else{cx.save();cx.shadowColor='#fff3a0';cx.shadowBlur=10;cx.fillStyle='#fffbe0';rr(b.x-3,b.y-9,6,18,3);cx.fill();cx.restore()}}
  // helper
  if(g.helper){const h=g.helper,a=Math.min(1,((h.T||10)-h.t)*3,h.t*2);cx.save();cx.globalAlpha=a;cx.shadowColor='#fff3b0';cx.shadowBlur=24;
    const wv=h.t<.6?Math.sin(g.t*20)*.3:0;cx.translate(h.x,h.y);cx.rotate(wv);dimg(IMG.h[h.i],0,0,74);cx.restore();
    if(h.k==='parshu'&&h.ax){cx.save();cx.translate(h.ax,h.ay);cx.rotate(g.t*14);cx.drawImage(IMG.w.parshu,-20,-20,40,40);cx.restore()}}
  // ship
  const s=g.ship;cx.save();if(s.inv>0&&Math.floor(s.inv*20)%2)cx.globalAlpha=.4;
  cx.fillStyle='rgba(255,220,120,.5)';cx.beginPath();cx.ellipse(s.x,s.y+38,10,18+Math.sin(g.t*30)*5,0,0,7);cx.fill();dimg(shipImg(),s.x,s.y,70);cx.restore();
  if(g.wing)wingDraw();
  if(g.pw.dhal>0){cx.save();cx.globalAlpha=.85;dimg(IMG.w.dhal,s.x,s.y-46,46);cx.strokeStyle='rgba(255,215,90,.6)';cx.lineWidth=3;cx.beginPath();cx.arc(s.x,s.y,48,0,7);cx.stroke();cx.restore()}
  // fx
  for(const f of g.fx){const p=f.t/f.life;
    if(f.type==='burst'){const T=tinted(f.bi,f.col);if(T){const sz=f.size*(.4+p*.9);cx.save();cx.globalAlpha=1-p*p;cx.globalCompositeOperation='lighter';cx.drawImage(T,f.x-sz/2,f.y-sz/2,sz,sz);cx.restore()}}
    else if(f.type==='spark'){cx.globalAlpha=1-p;cx.fillStyle=f.col;cx.fillRect(f.x-2,f.y-2,4,4);cx.globalAlpha=1}
    else if(f.type==='ring'){cx.save();cx.strokeStyle='rgba(255,240,200,'+(1-p)+')';cx.lineWidth=10*(1-p)+2;cx.beginPath();cx.arc(f.x,f.y,40+p*CH,0,7);cx.stroke();cx.restore()}
    else if(f.type==='txt'){cx.save();cx.globalAlpha=1-p;cx.font='700 17px B';cx.textAlign='center';cx.lineWidth=4;cx.strokeStyle='rgba(30,10,60,.8)';cx.strokeText(f.s,f.x,f.y);cx.fillStyle=f.col;cx.fillText(f.s,f.x,f.y);cx.restore()}
    else if(f.type==='big'){const sc=p<.2?.6+p*2:1;cx.save();cx.globalAlpha=p>.75?(1-p)*4:1;cx.translate(CW/2,f.y||CH*.36);cx.scale(sc,sc);cx.font='700 34px B';cx.textAlign='center';cx.lineWidth=6;cx.strokeStyle='rgba(40,15,90,.85)';cx.strokeText(f.s,0,0);cx.fillStyle=f.col;cx.fillText(f.s,0,0);cx.restore()}}
  // words (fault -> virtue)
  for(const w of g.words){const t=w.t,up=Math.min(1,t/.25),y=w.y-30-up*28-Math.sin(Math.min(t,.5)*6.28)*8;const sz=(w.big?30:20)*(t<.15?.5+t/.15*.6:1);
    cx.save();cx.textAlign='center';cx.lineWidth=5;cx.strokeStyle='rgba(30,10,60,.85)';
    if(t<.55){cx.font=`700 ${sz}px B`;cx.strokeText(w.a,w.x,y);cx.fillStyle=w.col;cx.fillText(w.a,w.x,y)}
    else{const q=Math.min(1,(t-.55)/.15);cx.globalAlpha=t>1?(1.2-t)*5:1;cx.font=`700 ${sz*(1+.2*(1-q))}px B`;cx.strokeText(w.b,w.x,y);cx.shadowColor='#ffe36a';cx.shadowBlur=14;cx.fillStyle='#ffe36a';cx.fillText(w.b,w.x,y)}
    cx.restore()}
  // orbs to mala
  const tx=CW-58,ty=30;for(const o of g.orbs){const q=o.t,e=q*q;const x=o.x+(tx-o.x)*e,y=o.y+(ty-o.y)*e-Math.sin(q*3.14)*60;cx.save();cx.shadowColor='#ffd23a';cx.shadowBlur=16;cx.fillStyle='#ffe36a';cx.beginPath();cx.arc(x,y,7,0,7);cx.fill();cx.restore()}
  if(g.tut>0&&g.state==='play'||(g.tut>0&&g.state==='intro')){const hx=CW/2+Math.sin(g.t*2.4)*90,hy=CH-150;cx.save();cx.globalAlpha=Math.min(1,g.tut);
    cx.fillStyle='rgba(20,14,70,.75)';rr(CW/2-120,hy-120,240,40,20);cx.fill();cx.fillStyle='#ffe36a';cx.font='700 18px B';cx.textAlign='center';cx.fillText('👆 આંગળી ડાબે-જમણે ખેંચો',CW/2,hy-93);
    cx.strokeStyle='rgba(255,230,120,.6)';cx.lineWidth=4;cx.setLineDash([8,8]);cx.beginPath();cx.moveTo(CW/2-90,hy+40);cx.lineTo(CW/2+90,hy+40);cx.stroke();cx.setLineDash([]);
    dimg(IMG.hand,hx+18,hy+10,96);cx.restore()}
  // ખાસ: દીવા
  if(g.sp&&g.sp.id==='lamps'){for(let i=0;i<3;i++){const x=CW/2+(i-1)*130,y=CH-16,on=i<g.lamps;cx.save();cx.globalAlpha=on?1:.35;if(on){cx.shadowColor='#ffb84a';cx.shadowBlur=14+Math.sin(g.t*8+i)*4}
    cx.font='28px sans-serif';cx.textAlign='center';cx.textBaseline='middle';cx.filter=on?'none':'grayscale(1)';cx.fillText('🪔',x,y);cx.restore()}
    cx.save();cx.strokeStyle='rgba(255,180,80,.35)';cx.setLineDash([6,8]);cx.lineWidth=2;cx.beginPath();cx.moveTo(0,CH-32);cx.lineTo(CW,CH-32);cx.stroke();cx.restore()}
  // કૉમ્બો
  if(g.combo>=3&&g.state==='play'){const lv=g.mult>=3?(g.combo>=15?2:1):g.mult>=2?0:-1,col=lv>=0?COMBO[lv][3]:'#fff';const sc=1+Math.max(0,g.comboPop)*1.4;
    cx.save();cx.translate(CW-14,118);cx.scale(sc,sc);cx.textAlign='right';cx.lineWidth=5;cx.strokeStyle='rgba(30,10,60,.85)';
    cx.font='700 26px B';const t1=g.combo+'';cx.strokeText(t1,0,0);cx.fillStyle=col;cx.fillText(t1,0,0);
    const t2='કૉમ્બો'+(g.mult>1?' · ×'+g.mult:'');cx.font='700 13px B';cx.strokeText(t2,0,16);cx.fillStyle='#fff';cx.fillText(t2,0,16);
    cx.fillStyle='rgba(20,14,70,.7)';rr(-70,24,70,6,3);cx.fill();cx.fillStyle=col;rr(-70,24,70*Math.max(0,g.comboT/2.5),6,3);cx.fill();cx.restore()}
  // બોસ-ચેતવણી
  if(g.state==='warn'){const p=Math.abs(Math.sin(g.t*7)),T=g.warnT;cx.save();
    const gr=cx.createRadialGradient(CW/2,CH/2,CH*.25,CW/2,CH/2,CH*.75);gr.addColorStop(0,'rgba(255,0,40,0)');gr.addColorStop(1,'rgba(255,20,50,'+(.25+.45*p)+')');cx.fillStyle=gr;cx.fillRect(0,0,CW,CH);
    for(const yy of [CH*.3-58,CH*.3+46]){cx.fillStyle='rgba(120,0,20,.85)';cx.fillRect(0,yy,CW,26);cx.save();cx.beginPath();cx.rect(0,yy,CW,26);cx.clip();cx.fillStyle='#ffd23a';
      for(let x=-60+((g.t*90)%40);x<CW+40;x+=40){cx.beginPath();cx.moveTo(x,yy+26);cx.lineTo(x+14,yy+26);cx.lineTo(x+34,yy);cx.lineTo(x+20,yy);cx.fill()}cx.restore()}
    const sc=1+p*.06;cx.translate(CW/2,CH*.3);cx.scale(sc,sc);cx.textAlign='center';cx.textBaseline='middle';cx.lineWidth=7;cx.strokeStyle='rgba(60,0,10,.9)';
    cx.font='700 34px B';cx.strokeText('⚠ ચેતવણી ⚠',0,-10);cx.fillStyle='#ff4a5a';cx.fillText('⚠ ચેતવણી ⚠',0,-10);
    const bn=g.d.boss==='mini'?FN[pickBossFault(g.d)][0]+' બોસ આવે છે!':'મોટો રાક્ષસ આવે છે!';cx.font='700 20px B';cx.lineWidth=5;cx.strokeText(bn,0,26);cx.fillStyle='#fff';cx.fillText(bn,0,26);cx.restore()}
  cx.setTransform(DPR,0,0,DPR,0,0);
  if(g.flash>0){cx.fillStyle='rgba(255,255,255,'+Math.min(.8,g.flash)+')';cx.fillRect(0,0,CW,CH)}
}
// ડરામણો દેખાવ (કોડથી): ઘેરી છાયા વાળી નકલ (કેશ) + લાલ-જાંબલી ચમક
const _sc=new Map();
function scaryImg(I){if(!I||!I.complete||!I.width)return I;let c=_sc.get(I);if(c)return c;
  c=document.createElement('canvas');c.width=I.width;c.height=I.height;const q=c.getContext('2d');q.drawImage(I,0,0);q.globalCompositeOperation='source-atop';
  const gr=q.createLinearGradient(0,0,0,c.height);gr.addColorStop(0,'rgba(60,0,70,.20)');gr.addColorStop(1,'rgba(10,0,25,.50)');q.fillStyle=gr;q.fillRect(0,0,c.width,c.height);
  q.globalCompositeOperation='source-over';_sc.set(I,c);return c}
function aura(x,y,r,a){const gr=cx.createRadialGradient(x,y,r*.25,x,y,r);gr.addColorStop(0,'rgba(255,40,70,'+a+')');gr.addColorStop(.55,'rgba(150,0,90,'+(a*.45)+')');gr.addColorStop(1,'rgba(80,0,120,0)');cx.save();cx.fillStyle=gr;cx.beginPath();cx.arc(x,y,r,0,7);cx.fill();cx.restore()}
function dimg(I,x,y,w){if(!I||I.complete===false||!I.width)return;const h=w*I.height/I.width;cx.drawImage(I,x-w/2,y-h/2,w,h)}
function rr(x,y,w,h,r){cx.beginPath();cx.moveTo(x+r,y);cx.arcTo(x+w,y,x+w,y+h,r);cx.arcTo(x+w,y+h,x,y+h,r);cx.arcTo(x,y+h,x,y,r);cx.arcTo(x,y,x+w,y,r);cx.closePath()}

// ---------- જીત / હાર ----------
function win(){const g=G;if(!g||g.state!=='play')return;g.state='end';SFX.win();setMusic('map');const n=g.n;
  if(g.trial)return trialEnd(g,true);
  const sp=g.sp;let st=1+(g.energy>50?1:0)+(g.energy>=85?1:0),spLine='',hint='';
  if(sp){if(sp.id==='lamps'){st=Math.max(1,g.lamps);spLine=`🪔 ${g.lamps}/3 દીવા બચ્યા`;hint=st<3?'⭐⭐⭐ માટે: ત્રણેય દીવા બચાવો.':''}
    else if(sp.id==='gems'){st=1+(g.gemsGot>=10?1:0)+(g.gemsGot>=18?1:0);spLine=`💎 ${g.gemsGot} રત્ન પકડ્યાં`;hint=st<3?'⭐⭐⭐ માટે: 18 રત્ન પકડો.':''}
    else if(sp.id==='rush'){st=1+(g.spT>8?1:0)+(g.spT>16?1:0);spLine=`⚡ ${g.rushK} દોષ · ${Math.ceil(g.spT)} સે. બાકી`;hint=st<3?'⭐⭐⭐ માટે: 16 સેકન્ડ બાકી રાખીને પૂરું કરો.':''}
    else if(sp.id==='onehit'){st=3;spLine='❤ એક પણ ઘા વગર!'}
    else if(sp.id==='survive')spLine='⏱ 45 સેકન્ડ ટક્યા!';
    else spLine='🗡 બધાં હથિયાર અજમાવ્યાં!'}
  const firstWin=!getStar(n);let gAdd=0;
  let gemLine='';if(sp&&sp.id==='gems'){if(firstWin){gAdd+=g.gemsGot;gemLine=`<div class="tre"><img class=ic src="${UI.gem}"> +${g.gemsGot} રત્ન સચવાયાં!</div>`}else gemLine='<div class="row small">રત્ન પહેલી જીતે જ મળે.</div>'}setStar(n,Math.max(getStar(n),st));
  if(firstWin&&P.beads<108)P.beads++;g.newCards.forEach(k=>P.cards[k]=1);let treasure='';
  if(firstWin&&n%10===0){gAdd+=10;treasure=`<div class="tre"><img class="chestS" src="${A2.gift_open}"><span><img class=ic src="${UI.gem}"> +10 ખજાનો!</span></div>`}
  P.gems+=gAdd;pushEvent({kind:'stage',stage:n,stars:st,gems:gAdd,dur:Math.round(g.t)});
  winStats(g,st);
  try{window.sbTrack&&sbTrack.finish({mode:'stage',count:n,punya:g.score,mistakes:g.hurtN})}catch(e){}   // હબ: પુણ્ય = સ્ટેજનો સ્કોર, ભૂલ = લાગેલા ઘા
  const cards=g.newCards.length?'<div class="nc">નવાં કાર્ડ: '+g.newCards.map(k=>`<span><img src="${A.f[k]}">→<img src="${A.v[k]}">${FN[k][1]}</span>`).join('')+'</div>':'';
  setTimeout(()=>openOv(`<div class="wint">શાબાશ, ${hubName()||'હીરો'}!</div>${titleLine()}<img class="wav" src="${A.h[Math.max(0,P.avatar)]}">
   <div class="bigstars">${[0,1,2].map(j=>starSvg(j<st)).join('')}</div>
   ${spLine?'<div class="spw">✨ '+spLine+'</div>':''}<div class="row small">પુણ્ય ${g.score} · 📿 ${g.mala} દોષ જીત્યા · ⚡ ${Math.round(g.energy)}%${g.comboBest>=5?' · 🔥 કૉમ્બો '+g.comboBest:''}</div>
   <div class="row small">${sp&&sp.id!=='survive'&&sp.id!=='weapons'?hint:(st<2?'⭐⭐ માટે: ઊર્જા 50% થી વધુ રાખો. ':'')+(st<3?'⭐⭐⭐ માટે: ઊર્જા 85% થી વધુ રાખો.':'')}</div>${gemLine}${treasure}${cards}
   <div class="row small sync" id="syncL">${syncLine()}</div>
   <div class="brow"><button class="btn sec" onclick="showMap()">નકશો</button><button class="btn" onclick="goStage(${n+1})">આગળ ▶</button></div>`),600);sync();setTimeout(checkAch,1500)}
function lose(msg){const g=G;if(!g||g.state!=='play')return;g.state='end';SFX.lose();vib(200);saveP();
  // હારમાં finish નથી બોલાવતા (પોઇન્ટ ફક્ત સાચી પૂરી રમત પર); છોડી દે તો analytics quit નોંધે છે
 
  openOv(`<div class="wint" style="color:#ffb3b3">${msg||'ઊર્જા પૂરી!'}</div><div class="row">હાર્યા નથી — ફરી પ્રયત્ન કરો 💪</div>
  <div class="brow"><button class="btn sec" onclick="showMap()">નકશો</button><button class="btn" onclick="retry()">${g.d.boss?'ફરી બોસ':g.sp?'ફરી ખાસ સ્ટેજ':'મોજું '+(g.ck.wave+1)+' થી ફરી'}</button></div>`)}
function retry(){const g=G;closeOv();if(g.d.boss||g.sp){startStage(g.n,{trial:g.trial});return}
  g.en.length=0;g.eb.length=0;g.spawnQ.length=0;g.drops.length=0;g.energy=100;g.pw.dhal=Math.max(g.pw.dhal||0,g.shieldT||0);g.score=g.ck.score;g.mala=g.ck.mala;g.wave=g.ck.wave-1;g.state='play';g.ship.inv=1.5;g.cleared=false;g.combo=0;g.mult=1;nextWave()}

// ---------- ઇનપુટ ----------
const keys={};addEventListener('keydown',e=>{if(e.key==='ArrowLeft')keys.l=1;if(e.key==='ArrowRight')keys.r=1});addEventListener('keyup',e=>{if(e.key==='ArrowLeft')keys.l=0;if(e.key==='ArrowRight')keys.r=0});
let drag=null;cv.addEventListener('pointerdown',e=>{if(!G)return;drag={x:e.clientX,sx:G.ship.x};cv.setPointerCapture(e.pointerId)});
cv.addEventListener('pointermove',e=>{if(drag&&G&&G.tut&&Math.abs(e.clientX-drag.x)>40){G.tut=0;P.tut=1;saveP()}if(drag&&G)G.ship.x=Math.max(28,Math.min(CW-28,drag.sx+(e.clientX-drag.x)*1.25))});
cv.addEventListener('pointerup',()=>drag=null);cv.addEventListener('pointercancel',()=>drag=null);
$('pause').onclick=()=>{if(!G)return;G.paused=!G.paused;if(G.paused)openOv(`<div class="wint">વિરામ</div><div class="brow"><button class="btn sec" onclick="showMap()">નકશો</button><button class="btn" onclick="G.paused=false;closeOv()">ચાલુ ▶</button></div>`);else closeOv()};
$('cta').onclick=()=>{const off=(P.lok-1)*100,c=lokCur(P.lok);goStage(off+c)};
addEventListener('online',()=>sync());addEventListener('offline',updCloud);document.addEventListener('visibilitychange',()=>{if(!document.hidden)sync()});
setInterval(()=>{sync();tickLok()},30000);
$('gear').onclick=showSettings;$('muteB').onclick=()=>{auResume();P.sfx=P.sfx===false;saveP();setVol();$('muteB').className=P.sfx!==false?'on':'off';SFX.tap()};$('muteB').className=P.sfx!==false?'on':'off';
document.addEventListener('pointerdown',()=>{auResume();if(!AU.mode)setMusic($('gameV').classList.contains('on')?'game':'map')},{once:true});$('cardsB').onclick=showCards;$('back').onclick=()=>{location.href='../#z4'};$('mface').onclick=chooseAvatar;
$('hF').src=A.h[Math.max(0,P.avatar)];
document.fonts&&document.fonts.ready.then(()=>{});
// ================= ક્રમ 2: દુકાન · સાથી યાન · યાન-ટ્રાયલ · સિદ્ધિઓ · રોજનું ઇનામ + પડકાર · દેખાવ =================
// દરેક વસ્તુમાં ic (હમણાં ઇમોજી/કોડ-ચિત્ર) અને art (ChatGPT ચિત્ર આવે ત્યારે data-URL) — art મળે તો એ જ દેખાય.
const UPG=[
 {id:'rate',n:'ગોળી-દર',ic:'💨',art:null,max:5,base:3,cost:[20,40,70,110,160],fx:l=>(6+0.5*l).toFixed(1).replace('.0','')+' ગોળી/સે.'},
 {id:'dmg',n:'ઘા-શક્તિ',ic:'💥',art:null,max:5,base:3,cost:[25,50,85,130,190],fx:l=>l?'+'+8*l+'% ઘા':'સામાન્ય ઘા'},
 {id:'hp',n:'ઊર્જા મહત્તમ',ic:'❤️',art:null,max:5,base:3,cost:[20,40,70,110,160],fx:l=>(100+10*l)+' ઊર્જા'},
 {id:'help',n:'સહાયક-સમય',ic:'🧒',art:null,max:5,base:3,cost:[15,30,55,85,120],fx:l=>(10+l)+' સેકન્ડ'},
 {id:'mag',n:'ચુંબક-અંતર',ic:'🧲',art:null,max:3,base:2,cost:[30,70,120],fx:l=>['ચુંબક નથી','નાનું ચુંબક','મધ્યમ ચુંબક','મોટું ચુંબક'][l]},
 {id:'shield',n:'શરૂઆતી ઢાલ',ic:'🛡️',art:null,max:3,base:2,cost:[40,90,150],fx:l=>l?[0,3,5,8][l]+' સે. ઢાલ':'ઢાલ નથી'}];
const MAG_R=[0,110,170,240],SHIELD_T=[0,3,5,8];
const WINGS=[
 {id:'tej',n:'તેજ',ic:'✨',art:null,col:'#ffd23a',cost:60,desc:'સીધી નાની ગોળી',cd:[.5,.42,.35,.28],dm:[.6,.7,.85,1]},
 {id:'kiran',n:'કિરણ',ic:'🔆',art:null,col:'#6ff0ff',cost:120,desc:'ત્રાંસી 2 ગોળી',cd:[.6,.52,.45,.38],dm:[.5,.6,.72,.85]},
 {id:'dhal',n:'ઢાલ-સાથી',ic:'🛡️',art:null,col:'#c79bff',cost:180,desc:'દર 8 સે. એક ઘા રોકે',cd:[.8,.75,.7,.65],dm:[.4,.45,.5,.55],rech:[8,7,6,5]}];
const WING_LV=[40,80,130];
const COLORS=[{id:'gold',n:'સોનેરી',h:45},{id:'green',n:'લીલો',h:120},{id:'pink',n:'ગુલાબી',h:310},{id:'red',n:'લાલ',h:355},{id:'blue',n:'વાદળી',h:205},{id:'violet',n:'જાંબલી',h:265}],COLOR_COST=30;
const FRAMES=[{id:'gold',n:'સોનેરી',sh:'0 0 0 3px #ffd23a,0 0 12px 3px rgba(255,210,58,.85)'},{id:'silver',n:'ચાંદી',sh:'0 0 0 3px #eef3fb,0 0 12px 3px rgba(220,230,255,.85)'},
 {id:'kamal',n:'કમળ',sh:'0 0 0 3px #ff8fc8,0 0 0 6px #ffe0f0,0 0 14px 4px rgba(255,120,190,.8)'},{id:'tara',n:'તારા',sh:'0 0 0 3px #7ff0ff,0 0 0 6px #fff6a0,0 0 16px 5px rgba(120,230,255,.85)'}],FRAME_COST=40;
const TITLES=[{id:'new',n:'નવો હીરો'},{id:'dv',n:'દોષ-વિજેતા',ach:'k100'},{id:'tej',n:'તેજ-યોદ્ધા',ach:'w50'},{id:'rak',n:'લોક-રક્ષક',ach:'w100'}];
const DAILY=[5,8,10,12,15,20,40],CHAL_R=15;
const CHALS=[{id:'win3',n:'આજે 3 સ્ટેજ જીતો',goal:3,ic:'🏁'},{id:'combo8',n:'કૉમ્બો 8 કરો',goal:8,ic:'🔥'},{id:'star3x2',n:'⭐⭐⭐ 2 વાર મેળવો',goal:2,ic:'⭐'},
 {id:'boss',n:'એક બોસ હરાવો',goal:1,ic:'👹'},{id:'k40',n:'40 દોષ હરાવો',goal:40,ic:'💥'}];

// ---------- ગણતરી ----------
const cntSt=st=>{let t=0,w=0;for(let n=1;n<=MAXST();n++){const v=starGet(st,n);t+=v;if(v)w++}return {t,w}};
const anyBossSt=st=>{for(let n=10;n<=MAXST();n+=10)if(starGet(st,n))return true;return false};
const anyUp=u=>Object.values(u||{}).some(v=>v>0),anyWing=w=>Object.keys((w&&w.own)||{}).length>0;
// સિદ્ધિ: ok = ફોનમાં શરત, srv = સર્વર પોતાના ડેટાથી ચકાસી શકે તે (બાકીમાં ફક્ત એક જ વાર), pr = પ્રગતિ
const ACH=[
 {id:'first',n:'પહેલી જીત',ic:'🏁',r:5,ok:()=>cntSt(P.st).w>=1,srv:s=>cntSt(s.st).w>=1},
 {id:'w10',n:'10 સ્ટેજ',ic:'🔟',r:10,ok:()=>cntSt(P.st).w>=10,srv:s=>cntSt(s.st).w>=10,pr:()=>[cntSt(P.st).w,10]},
 {id:'w50',n:'50 સ્ટેજ',ic:'🏅',r:20,ok:()=>cntSt(P.st).w>=50,srv:s=>cntSt(s.st).w>=50,pr:()=>[cntSt(P.st).w,50]},
 {id:'w100',n:'100 સ્ટેજ',ic:'🏆',r:30,ok:()=>cntSt(P.st).w>=100,srv:s=>cntSt(s.st).w>=100,pr:()=>[cntSt(P.st).w,100]},
 {id:'boss1',n:'પહેલો બોસ',ic:'👹',r:10,ok:()=>P.stats.boss>=1||anyBossSt(P.st),srv:s=>anyBossSt(s.st)},
 {id:'mid',n:'મોટો રાક્ષસ',ic:'👺',r:20,ok:()=>getStar(50)>0,srv:s=>starGet(s.st,50)>0},
 {id:'big',n:'મહા-રાક્ષસ',ic:'🐉',r:30,ok:()=>getStar(100)>0,srv:s=>starGet(s.st,100)>0},
 {id:'k100',n:'100 દોષ',ic:'💥',r:10,ok:()=>P.stats.k>=100,pr:()=>[P.stats.k,100]},
 {id:'k1000',n:'1000 દોષ',ic:'☄️',r:25,ok:()=>P.stats.k>=1000,pr:()=>[P.stats.k,1000]},
 {id:'c15',n:'કૉમ્બો 15',ic:'🔥',r:10,ok:()=>P.stats.combo>=15,pr:()=>[P.stats.combo,15]},
 {id:'lamps',n:'3 દીવા બચાવ્યા',ic:'🪔',r:15,ok:()=>P.stats.lamps3>0},
 {id:'onehit',n:'એક-ઘા જીત',ic:'❤️',r:15,ok:()=>P.stats.onehit>0},
 {id:'s30',n:'30 ⭐',ic:'⭐',r:10,ok:()=>cntSt(P.st).t>=30,srv:s=>cntSt(s.st).t>=30,pr:()=>[cntSt(P.st).t,30]},
 {id:'s150',n:'150 ⭐',ic:'🌟',r:20,ok:()=>cntSt(P.st).t>=150,srv:s=>cntSt(s.st).t>=150,pr:()=>[cntSt(P.st).t,150]},
 {id:'s300',n:'300 ⭐',ic:'💫',r:30,ok:()=>cntSt(P.st).t>=300,srv:s=>cntSt(s.st).t>=300,pr:()=>[cntSt(P.st).t,300]},
 {id:'mala',n:'માળા 108',ic:'📿',r:30,ok:()=>P.beads>=108,srv:s=>s.beads>=108,pr:()=>[P.beads,108]},
 {id:'cards',n:'બધાં 24 કાર્ડ',ic:'📜',r:25,ok:()=>Object.keys(P.cards).length>=24,pr:()=>[Object.keys(P.cards).length,24]},
 {id:'streak7',n:'7 દિવસ 🔥',ic:'📅',r:15,ok:()=>P.streak>=7,pr:()=>[P.streak,7]},
 {id:'up1',n:'પહેલું અપગ્રેડ',ic:'⬆️',r:5,ok:()=>anyUp(P.up),srv:(s,I)=>anyUp(I.up)},
 {id:'wing1',n:'પહેલો સાથી',ic:'🚀',r:5,ok:()=>anyWing(P.wing),srv:(s,I)=>anyWing(I.wing)}];

// ---------- કિંમત / ઇન્વેન્ટરી (ફોન અને સર્વર બંને આ જ નિયમ વાપરે) ----------
const loksOpen=conf=>Math.max(1,Math.min(CONTENT_LOKS,Math.ceil(conf/100)));
const capOf=(u,conf)=>Math.min(u.max,u.base+loksOpen(conf)-1);
function priceOf(e,I,conf){
  if(e.cat==='up'){const u=UPG.find(x=>x.id===e.item);if(!u)return {bad:'અજાણ્યું'};const cur=I.up[u.id]||0;
    if(e.lv!==cur+1)return {bad:'સ્તર ખોટું'};if(e.lv>u.max)return {bad:'મહત્તમ'};if(e.lv>capOf(u,conf))return {bad:'લોક-મર્યાદા'};return {cost:u.cost[e.lv-1]}}
  if(e.cat==='wing'){const w=WINGS.find(x=>x.id===e.item);if(!w)return {bad:'અજાણ્યું'};if(I.wing.own[w.id])return {bad:'પાસે છે'};return {cost:w.cost}}
  if(e.cat==='wlv'){const w=WINGS.find(x=>x.id===e.item);if(!w||!I.wing.own[w.id])return {bad:'સાથી નથી'};const cur=I.wing.lv[w.id]||0;
    if(e.lv!==cur+1||e.lv>3)return {bad:'સ્તર ખોટું'};return {cost:WING_LV[e.lv-1]}}
  if(e.cat==='cos'){const[t,id]=String(e.item).split(':');if(I.cos.own[e.item])return {bad:'પાસે છે'};
    if(t==='color'&&COLORS.some(c=>c.id===id))return {cost:COLOR_COST};if(t==='frame'&&FRAMES.some(c=>c.id===id))return {cost:FRAME_COST};return {bad:'અજાણ્યું'}}
  return {bad:'અજાણ્યું'}}
function applyInv(I,e){if(e.cat==='up')I.up[e.item]=e.lv;else if(e.cat==='wing'){I.wing.own[e.item]=1;I.wing.lv[e.item]=I.wing.lv[e.item]||0}
  else if(e.cat==='wlv')I.wing.lv[e.item]=e.lv;else if(e.cat==='cos')I.cos.own[e.item]=1}
function applyLocal(e){
  if(e.kind==='buy'){P.gems-=e.cost;applyInv(P,e)}
  else if(e.kind==='ach'){P.achC[e.ach]=1;P.gems+=e.gems}
  else if(e.kind==='daily'){P.daily={last:e.date,day:e.day};P.gems+=e.gems}
  else if(e.kind==='chal'){if(e.date===P.chal.date)P.chal.claimed=1;P.gems+=e.gems}}
function invToP(I){P.up=Object.assign({},PDEF.up,I.up);P.wing.own=Object.assign({},I.wing.own);P.wing.lv=Object.assign({},I.wing.lv);
  P.cos.own=Object.assign({},I.cos.own);P.achC=Object.assign({},I.achC);P.daily=Object.assign({},I.daily);
  chalToday();P.chal.claimed=I.chalC&&I.chalC[P.chal.date]?1:0}
function fixEquip(){if(P.wing.sel&&!P.wing.own[P.wing.sel])P.wing.sel='';       // બાકી-યાદી ફરી ઉમેર્યા પછી જ (નકારાયેલી ખરીદી ઉતારો)
  if(P.cos.color&&!P.cos.own['color:'+P.cos.color])P.cos.color='';if(P.cos.frame&&!P.cos.own['frame:'+P.cos.frame])P.cos.frame=''}

// ---------- તારીખ (સર્વર-સમય) ----------
function dkey(t){const d=new Date(t);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')}
const today=()=>dkey(srvNow());
function nextDailyDay(D,date){if(!D||!D.last)return 1;const y=dkey(Date.parse(date+'T12:00:00')-864e5);
  return D.last===y?(D.day%7)+1:Math.max(1,Math.floor(D.day/2))}      // સળંગ → આગલો દિવસ; તૂટે → અડધે (સજા નહીં)
const dailyAvail=()=>P.daily.last!==today()&&!(P.daily.last>today());
function todayChal(){const k=today();return CHALS[hsh(parseInt(k.replace(/-/g,''),10),11)%CHALS.length]}
function chalToday(){const k=today();if(P.chal.date!==k)P.chal={date:k,prog:0,claimed:0}}
const chalDone=()=>{chalToday();return P.chal.prog>=todayChal().goal};
function chalAdd(id,n){chalToday();const c=todayChal();if(c.id!==id||P.chal.prog>=c.goal)return;P.chal.prog=Math.min(c.goal,P.chal.prog+n);if(P.chal.prog>=c.goal)chalDoneMsg()}
function chalMax(id,v){chalToday();const c=todayChal();if(c.id!==id||P.chal.prog>=c.goal)return;P.chal.prog=Math.max(P.chal.prog,Math.min(c.goal,v));if(P.chal.prog>=c.goal)chalDoneMsg()}
function chalDoneMsg(){achQ.push({ic:'🎯',t:'પડકાર પૂરો! 🎁 માં ઇનામ લો'});achNext()}

// ---------- રમતમાં અસર ----------
function applyBoosts(g){const u=P.up;g.fr=6+0.5*u.rate;g.dmM=1+0.08*u.dmg;g.eM=100/(100+10*u.hp);g.helpT=10+u.help;g.magR=MAG_R[u.mag]||0;g.shieldT=SHIELD_T[u.shield]||0;
  if(g.shieldT)g.pw.dhal=g.shieldT;
  const wid=g.trial||(P.wing.sel&&P.wing.own[P.wing.sel]?P.wing.sel:'');
  g.wing=wid?{id:wid,W:WINGS.find(w=>w.id===wid),lv:g.trial?0:(P.wing.lv[wid]||0),x:g.ship.x+52,y:g.ship.y,cd:.6,ch:0,ready:false,t:0}:null;
  const l=document.querySelector('.ebar .l');if(l)l.textContent='⚡ ઊર્જા'+(u.hp?' '+(100+10*u.hp):'')+(g.trial?' · 🚀 ટ્રાયલ':'');applyFrame()}
function winStats(g,st){const d=g.d;chalAdd('win3',1);if(st===3)chalAdd('star3x2',1);
  if(d.boss){P.stats.boss++;chalAdd('boss',1)}if(g.sp&&g.sp.id==='lamps'&&g.lamps===3)P.stats.lamps3=1;if(g.sp&&g.sp.id==='onehit')P.stats.onehit=1;saveP()}
function wingUpdate(dt){const g=G,w=g.wing,s=g.ship,W=w.W;w.t+=dt;
  w.x+=((s.x+52)-w.x)*Math.min(1,dt*7);w.y=s.y+6+Math.sin(w.t*3)*6;
  if(W.rech&&!w.ready){w.ch+=dt;if(w.ch>=W.rech[w.lv]){w.ready=true;w.ch=0}}
  w.cd-=dt;if(w.cd>0)return;w.cd=W.cd[w.lv];const dm=g.d.dmg*W.dm[w.lv]*g.dmM;
  if(W.id==='kiran')[-.28,.28].forEach(a=>g.bul.push({x:w.x,y:w.y-14,vx:Math.sin(a)*900,vy:-Math.cos(a)*900,dm,r:4,wc:W.col,helper:1}));
  else g.bul.push({x:w.x,y:w.y-14,vx:0,vy:-950,dm,r:4,wc:W.col,helper:1})}
function wingBlock(){const g=G;if(!g||!g.wing||!g.wing.ready)return false;g.wing.ready=false;g.wing.ch=0;g.ship.inv=.6;SFX.hit();
  g.fx.push({type:'ring',x:g.ship.x,y:g.ship.y,t:0,life:.5});g.fx.push({type:'txt',s:'🛡 રોક્યું!',x:g.ship.x,y:g.ship.y-56,col:'#d9c2ff',t:0,life:1});return true}
function drawWing(c,col,sz,t){c.save();c.shadowColor=col;c.shadowBlur=14;
  c.fillStyle='rgba(255,220,120,.75)';c.beginPath();c.ellipse(0,sz*.5,sz*.13,sz*.26+Math.sin(t*30)*sz*.05,0,0,7);c.fill();
  const g=c.createLinearGradient(0,-sz*.6,0,sz*.4);g.addColorStop(0,'#fff');g.addColorStop(.45,col);g.addColorStop(1,col);c.fillStyle=g;
  c.beginPath();c.moveTo(0,-sz*.6);c.lineTo(sz*.2,-sz*.1);c.lineTo(sz*.5,sz*.32);c.lineTo(sz*.17,sz*.28);c.lineTo(0,sz*.42);c.lineTo(-sz*.17,sz*.28);c.lineTo(-sz*.5,sz*.32);c.lineTo(-sz*.2,-sz*.1);c.closePath();c.fill();
  c.shadowBlur=0;c.strokeStyle='rgba(255,255,255,.85)';c.lineWidth=Math.max(1,sz*.04);c.stroke();
  c.fillStyle='rgba(40,20,90,.85)';c.beginPath();c.ellipse(0,-sz*.14,sz*.08,sz*.13,0,0,7);c.fill();c.restore()}
const wingArtImg={};
function wingDraw(){const g=G,w=g.wing,I=w.W.art&&(wingArtImg[w.id]=wingArtImg[w.id]||im(w.W.art));
  cx.save();cx.translate(w.x,w.y);cx.rotate(Math.sin(w.t*2)*.08);if(I&&I.complete&&I.width)dimg(I,0,0,54);else drawWing(cx,w.W.col,34,g.t);cx.restore();
  if(w.W.rech){cx.save();const s=g.ship;if(w.ready){cx.strokeStyle='rgba(200,160,255,'+(.55+.25*Math.sin(g.t*6))+')';cx.lineWidth=3;cx.beginPath();cx.arc(s.x,s.y,44,0,7);cx.stroke()}
    else{cx.strokeStyle='rgba(200,160,255,.5)';cx.lineWidth=3;cx.beginPath();cx.arc(w.x,w.y,22,-Math.PI/2,-Math.PI/2+Math.PI*2*w.ch/w.W.rech[w.lv]);cx.stroke()}cx.restore()}}
const wingIconC={};
function wingIcon(id){const W=WINGS.find(w=>w.id===id);if(W.art)return W.art;if(wingIconC[id])return wingIconC[id];
  const c=document.createElement('canvas');c.width=c.height=120;const x=c.getContext('2d');x.translate(60,62);drawWing(x,W.col,92,0.3);return wingIconC[id]=c.toDataURL()}

// ---------- યાન-રંગ (પિક્સેલથી રંગ — iPhone પર પણ ચાલે) ----------
const BGIMG={1:IMG.bg};for(let L=2;L<=10;L++)BGIMG[L]=im(A2['bg_'+L]);
// જીવંત દૃશ્ય: પ્રકાશનું સ્થાન (ચિત્રમાં x,y અંશ) અને રંગ — દરેક લોક માટે
const BGLIT={1:[.5,.08,'255,250,220'],2:[.7,.12,'220,230,255'],3:[.8,.1,'255,190,120'],4:[.74,.13,'255,230,150'],5:[.65,.12,'180,210,255'],6:[.3,.22,'255,220,150'],7:[.6,.14,'255,170,230'],8:[.88,.2,'255,200,90'],9:[.5,.3,'150,255,210'],10:[.5,.03,'255,245,190']};
const bgStrip={};
function bgStrips(I){if(bgStrip[I.src])return bgStrip[I.src];const w=Math.round(I.width*.3),h=I.height,mk=lf=>{const c=document.createElement('canvas');c.width=w;c.height=h;const q=c.getContext('2d');q.drawImage(I,lf?0:I.width-w,0,w,h,0,0,w,h);q.globalCompositeOperation='destination-in';const gr=q.createLinearGradient(0,0,w,0);if(lf){gr.addColorStop(0,'#000');gr.addColorStop(.7,'#000');gr.addColorStop(1,'rgba(0,0,0,0)')}else{gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.3,'#000');gr.addColorStop(1,'#000')}q.fillStyle=gr;q.fillRect(0,0,w,h);return c};
  return bgStrip[I.src]={l:mk(1),r:mk(0),w}}
function liveBg(q,I,L,W,H,t){if(!I.complete||!I.width)return;
  const br=1.03+.012*Math.sin(t*.35),s=Math.max(W/I.width,H/I.height)*br,w=I.width*s,h=I.height*s,ox=(W-w)/2+Math.sin(t*.22)*3,oy=(H-h)/2+Math.cos(t*.27)*2;
  q.drawImage(I,ox,oy,w,h);
  // કિનારીના પથ્થરો હળવા તરે
  const S=bgStrips(I),sw=S.w*s;q.drawImage(S.l,ox+Math.sin(t*.6)*2,oy+Math.sin(t*.9)*5,sw,h);q.drawImage(S.r,ox+w-sw+Math.sin(t*.6+2)*2,oy+Math.sin(t*.8+1.7)*5,sw,h);
  // પ્રકાશ ધબકે
  const lt=BGLIT[L]||BGLIT[1],lx=ox+lt[0]*w,ly=oy+lt[1]*h,R=Math.max(W,H)*.45,a=.16+.1*Math.sin(t*1.1);
  q.save();q.globalCompositeOperation='lighter';const g=q.createRadialGradient(lx,ly,0,lx,ly,R);g.addColorStop(0,'rgba('+lt[2]+','+a+')');g.addColorStop(1,'rgba('+lt[2]+',0)');q.fillStyle=g;q.fillRect(0,0,W,H);
  // તારા ટમટમે
  for(let i=0;i<34;i++){const x=(i*137.5%100)/100*W,y=(i*61.7%100)/100*H*.7,p=.5+.5*Math.sin(t*(1.3+i%5*.4)+i*2.1);if(p<.35)continue;const r=(i%4?1.2:2.2)*p;q.fillStyle='rgba(255,255,240,'+(p*.85)+')';q.beginPath();q.arc(x,y,r,0,7);q.fill();
    if(i%6===0&&p>.8){q.fillStyle='rgba(255,255,230,'+(p-.8)*3+')';q.fillRect(x-7*p,y-.6,14*p,1.2);q.fillRect(x-.6,y-7*p,1.2,14*p)}}
  q.restore()}
function bgLok(n){const s=+P.cos.bg;return s&&bgOpen(s)?s:Math.floor((n-1)/100)+1}
const bgOpen=L=>(TEST_OPEN||lokStatus(L).open)&&!!BGIMG[L];
function bgFor(n){return BGIMG[bgLok(n)]||IMG.bg}
const SHIPS=[{id:'',n:'મૂળ'},{id:'tej',n:'તેજ',art:A2.sh_tej},{id:'kiran',n:'કિરણ',art:A2.sh_kiran},{id:'dhal',n:'ઢાલ',art:A2.sh_dhal}];
SHIPS.forEach(s=>{if(s.art)s.img=im(s.art)});
const shipTint={},shipTintURL={};
const shipDef=()=>SHIPS.find(s=>s.id===(P.cos.ship||''))||SHIPS[0];
const baseShip=()=>shipDef().img||IMG.ship,baseShipURL=()=>shipDef().art||A.ship;
function hueShip(h){const b=baseShip(),k=(P.cos.ship||'')+'|'+h;if(shipTint[k])return shipTint[k];if(!b.complete||!b.width)return null;
  const c=document.createElement('canvas');c.width=b.width;c.height=b.height;const x=c.getContext('2d');x.drawImage(b,0,0);const d=x.getImageData(0,0,c.width,c.height),a=d.data,H=h/360;
  for(let i=0;i<a.length;i+=4){if(a[i+3]<8)continue;const r=a[i]/255,g=a[i+1]/255,bb=a[i+2]/255,mx=Math.max(r,g,bb),mn=Math.min(r,g,bb),l=(mx+mn)/2,dd=mx-mn;
    if(dd<.12)continue;const s=Math.max(.55,l>.5?dd/(2-mx-mn):dd/(mx+mn));
    const q=l<.5?l*(1+s):l+s-l*s,p=2*l-q,f=t=>{t<0&&(t+=1);t>1&&(t-=1);return t<1/6?p+(q-p)*6*t:t<1/2?q:t<2/3?p+(q-p)*(2/3-t)*6:p};
    a[i]=f(H+1/3)*255;a[i+1]=f(H)*255;a[i+2]=f(H-1/3)*255}
  x.putImageData(d,0,0);c.complete=true;return shipTint[k]=c}
function shipImg(){const c=P.cos.color&&COLORS.find(x=>x.id===P.cos.color);return (c&&hueShip(c.h))||baseShip()}
function shipURL(id){const cid=id===undefined?P.cos.color:id,c=cid&&COLORS.find(x=>x.id===cid);if(!c)return baseShipURL();const k=(P.cos.ship||'')+'|'+c.h;if(shipTintURL[k])return shipTintURL[k];
  const t=hueShip(c.h);if(!t)return baseShipURL();return shipTintURL[k]=t.toDataURL()}
const frmC={};
function applyFrame(){const f=FRAMES.find(x=>x.id===P.cos.frame),base=A.h[Math.max(0,P.avatar)];
  ['mface','hF'].forEach(i=>{const e=$(i);if(!e)return;e.style.boxShadow='';
    if(f&&f.art){const u=frameURL(base,f);if(u){e.src=u;e.classList.add('fr');return}}
    e.classList.remove('fr');if(base&&e.src!==base)e.src=base;if(f&&!f.art)e.style.boxShadow=f.sh})}
function frameURL(base,f){const k=f.id+'|'+P.avatar;if(frmC[k])return frmC[k];if(frmC['_'+k])return null;frmC['_'+k]=1;
  const a=new Image(),r=new Image();let n=0;
  const go=()=>{if(++n<2)return;const S=160,c=document.createElement('canvas');c.width=c.height=S;const x=c.getContext('2d'),s=Math.min(a.width,a.height),sy=(a.height-s)*.12,R=S*.385;
    x.save();x.beginPath();x.arc(S/2,S/2,R,0,7);x.clip();x.fillStyle='#fff3c4';x.fillRect(0,0,S,S);x.drawImage(a,0,sy,s,s,S/2-R,S/2-R,2*R,2*R);x.restore();x.drawImage(r,0,0,S,S);frmC[k]=c.toDataURL();applyFrame()};
  a.onload=r.onload=go;a.src=base;r.src=f.art;return null}
function titleLine(){const t=TITLES.find(x=>x.id===P.cos.title)||TITLES[0];return `<div class="ttl">🎖 ${t.n}</div>`}

// ---------- સિદ્ધિ-પટ્ટી ----------
SFX.ach=function(){if(!AU.ctx)return;const t=AU.ctx.currentTime;[79,84,88,91,96].forEach((m,i)=>osc('triangle',NOTE(m),t+i*.08,i===4?.4:.14,.1,AU.sfx))};
SFX.coin=function(){if(!AU.ctx)return;const t=AU.ctx.currentTime;osc('square',NOTE(91),t,.06,.06,AU.sfx);osc('square',NOTE(96),t+.07,.2,.06,AU.sfx)};
const achQ=[];let achBusy=false;
function achNext(){if(achBusy||!achQ.length)return;achBusy=true;const a=achQ.shift(),b=$('achbar');b.innerHTML=`<span class="ai">${a.art?'<img src="'+a.art+'">':a.ic}</span>${a.t}`;b.classList.add('on');SFX.ach();vib(40);
  setTimeout(()=>{b.classList.remove('on');setTimeout(()=>{achBusy=false;achNext()},350)},2300)}
function checkAch(){let n=0;for(const a of ACH){if(!P.achGot[a.id]&&a.ok()){P.achGot[a.id]=1;n++;achQ.push({ic:a.ic,t:'સિદ્ધિ: '+a.n+' · 🏅 માં '+a.r+' 💎 લો'})}}
  if(n){saveP();achNext()}updDots()}
function updDots(){const s=(id,on)=>{const b=$(id);if(b)b.classList.toggle('rdot',!!on)};
  s('achB',ACH.some(a=>P.achGot[a.id]&&!P.achC[a.id]));s('dayB',dailyAvail()||(chalDone()&&!P.chal.claimed))}

// ---------- 🛒 દુકાન ----------
let shopTab='up';
const icH=(it,cls)=>it.art?`<img class="${cls||'sic'}" src="${it.art}">`:`<div class="${cls||'sic'}">${it.ic}</div>`;
const gemB=n=>`<img class=ic src="${UI.gem}">${n}`;
function openShop(tab){if(tab)shopTab=tab;const pn=document.querySelector('#ov .panel'),sc=pn&&$('ov').classList.contains('on')&&pn.dataset.p==='shop'?pn.scrollTop:0;
  let h=`<div class="ctitle">🛒 દુકાન</div><div class="sgem">${gemB(P.gems)} ${P.pend.some(e=>e.kind==='buy')?'<small>⏳ ખરીદી નેટ આવે ત્યારે સચવાશે</small>':''}</div>
  <div class="tabs"><button data-t="up" class="${shopTab==='up'?'on':''}">⬆ અપગ્રેડ</button><button data-t="wing" class="${shopTab==='wing'?'on':''}">🚀 સાથી</button><button data-t="cos" class="${shopTab==='cos'?'on':''}">🎨 દેખાવ</button></div><div class="slist">`;
  if(shopTab==='up'){h+='<div class="row small">કાયમી શક્તિ — દરેક સ્ટેજમાં કામ આવે.</div>';
    for(const u of UPG){const l=P.up[u.id]||0,cap=capOf(u,P.conf);let pips='';for(let i=1;i<=u.max;i++)pips+=`<i class="${i<=l?'f':i>cap?'k':''}"></i>`;
      const btn=l>=u.max?'<button class="sbuy dis">મહત્તમ ✔</button>':l>=cap?`<button class="sbuy dis lk" data-lk="1">🔒 લોક ${GD(loksOpen(P.conf)+1)} માં</button>`:
        `<button class="sbuy${P.gems<u.cost[l]?' poor':''}" data-b="up:${u.id}">${gemB(u.cost[l])}</button>`;
      h+=`<div class="srow">${icH(u)}<div class="sinfo"><b>${u.n}</b><div class="pips">${pips}</div><small>${u.fx(l)}${l<u.max?' → <span>'+u.fx(l+1)+'</span>':''}</small></div>${btn}</div>`}}
  else if(shopTab==='wing'){h+='<div class="row small">એક વખતે એક સાથી તમારી સાથે ઊડે.</div>';
    for(const w of WINGS){const own=P.wing.own[w.id],lv=P.wing.lv[w.id]||0,sel=P.wing.sel===w.id;let pips='';for(let i=1;i<=3;i++)pips+=`<i class="${i<=lv?'f':''}"></i>`;
      h+=`<div class="wcard${sel?' sel':''}"><img class="wic" src="${wingIcon(w.id)}"><div class="sinfo"><b>${w.n}</b><small>${w.desc}</small>${own?'<div class="pips">'+pips+'</div>':''}</div><div class="wbtns">`;
      if(own){h+=`<button class="sbuy sel2" data-s="${w.id}">${sel?'✔ સાથે છે':'પસંદ કરો'}</button>`;
        h+=lv>=3?'<button class="sbuy dis">મહત્તમ ✔</button>':`<button class="sbuy${P.gems<WING_LV[lv]?' poor':''}" data-b="wlv:${w.id}">⬆ ${gemB(WING_LV[lv])}</button>`}
      else{h+=`<button class="sbuy${P.gems<w.cost?' poor':''}" data-b="wing:${w.id}">${gemB(w.cost)}</button>`;
        h+=P.trial[w.id]?'<button class="sbuy dis">ટ્રાયલ થઈ ગઈ</button>':`<button class="sbuy try" data-tr="${w.id}">▶ મફત અજમાવો</button>`}
      h+='</div></div>'}}
  else{h+='<div class="row small">ફક્ત દેખાવ — રમતની શક્તિ પર કોઈ અસર નહીં.</div><div class="sub">🚀 યાનનો રંગ</div><div class="cgrid2">';
    h+=`<button class="cbox${!P.cos.color?' sel':''}" data-c="color:"><img src="${baseShipURL()}"><span>મૂળ</span></button>`;
    for(const c of COLORS){const k='color:'+c.id,own=P.cos.own[k];h+=`<button class="cbox${P.cos.color===c.id?' sel':''}" data-c="${k}"><img src="${shipURL(c.id)}"><span>${c.n}</span>${own?'':'<em>'+gemB(COLOR_COST)+'</em>'}</button>`}
    h+='</div><div class="sub">🖼 અવતાર-ફ્રેમ</div><div class="cgrid2">';
    const face=A.h[Math.max(0,P.avatar)];
    h+=`<button class="cbox${!P.cos.frame?' sel':''}" data-c="frame:"><img class="fprev" src="${face}"><span>સાદી</span></button>`;
    for(const f of FRAMES){const k='frame:'+f.id,own=P.cos.own[k];h+=`<button class="cbox${P.cos.frame===f.id?' sel':''}" data-c="${k}"><span class="fpw"><img class="fprev" src="${face}"><img class="fring" src="${f.art}"></span><span>${f.n}</span>${own?'':'<em>'+gemB(FRAME_COST)+'</em>'}</button>`}
    h+='</div><div class="sub">🎖 ખિતાબ (સિદ્ધિથી ખૂલે)</div><div class="tlist">';
    for(const t of TITLES){const open=!t.ach||P.achGot[t.ach],a=t.ach&&ACH.find(x=>x.id===t.ach);
      h+=`<button class="tbtn${P.cos.title===t.id?' sel':''}${open?'':' lk'}" data-ti="${t.id}">${open?'🎖':'🔒'} ${t.n}${open?'':'<small>🏅 '+a.n+'</small>'}</button>`}
    h+='</div>'}
  h+='</div><button class="btn" onclick="closeOv();renderMap()">બંધ કરો</button>';openOv(h);
  const p=document.querySelector('#ov .panel');p.dataset.p='shop';p.scrollTop=sc;
  p.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{SFX.tap();openShop(b.dataset.t);document.querySelector('#ov .panel').scrollTop=0});
  p.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>{const[cat,item]=b.dataset.b.split(':');buy(cat,item)});
  p.querySelectorAll('[data-lk]').forEach(b=>b.onclick=()=>toast('🔒 આગલો લોક ખૂલે એટલે વધુ સ્તર ખૂલશે'));
  p.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{const id=b.dataset.s;P.wing.sel=P.wing.sel===id?'':id;saveP();SFX.tap();openShop()});
  p.querySelectorAll('[data-tr]').forEach(b=>b.onclick=()=>tryWing(b.dataset.tr));
  p.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{const k=b.dataset.c,[t,id]=k.split(':');
    if(id&&!P.cos.own[k]){buy('cos',k);return}if(t==='color')P.cos.color=id;else P.cos.frame=id;saveP();SFX.tap();applyFrame();openShop()});
  p.querySelectorAll('[data-ti]').forEach(b=>b.onclick=()=>{const t=TITLES.find(x=>x.id===b.dataset.ti);if(t.ach&&!P.achGot[t.ach])return toast('🔒 "'+ACH.find(x=>x.id===t.ach).n+'" સિદ્ધિથી ખૂલશે');P.cos.title=t.id;saveP();SFX.tap();openShop()})}
function buy(cat,item){const e={kind:'buy',cat,item};
  if(cat==='up')e.lv=(P.up[item]||0)+1;if(cat==='wlv')e.lv=(P.wing.lv[item]||0)+1;
  const pr=priceOf(e,P,P.conf);if(pr.bad){toast('⚠ '+pr.bad);return}
  if(P.gems<pr.cost){SFX.wrong();toast('💎 ઓછા છે — હજી '+(pr.cost-P.gems)+' 💎 જોઈએ');return}
  e.cost=pr.cost;applyLocal(e);
  if(cat==='wing'&&!P.wing.sel)P.wing.sel=item;
  if(cat==='cos'){const[t,id]=item.split(':');if(t==='color')P.cos.color=id;else P.cos.frame=id;applyFrame()}
  pushEvent(e);SFX.coin();SFX.power();vib(30);
  const nm=cat==='up'?UPG.find(u=>u.id===item).n+' સ્તર '+e.lv:cat==='wing'?WINGS.find(w=>w.id===item).n+' સાથી':cat==='wlv'?WINGS.find(w=>w.id===item).n+' સ્તર '+e.lv:'નવો દેખાવ';
  toast('✔ '+nm+(isOnline()?'':' · ⏳ નેટ આવે ત્યારે સચવાશે'));openShop();updMapHud();checkAch();sync()}
function lastWon(){for(let n=Math.min(P.conf,MAXST());n>=1;n--)if(getStar(n))return n;return 1}
function tryWing(id){if(P.trial[id])return toast('આ સાથીની ટ્રાયલ થઈ ગઈ');P.trial[id]=1;saveP();SFX.tap();const n=lastWon();closeOv();
  toast('🚀 '+WINGS.find(w=>w.id===id).n+' સાથી · ટ્રાયલ (ઇનામ વગર)');startStage(n,{trial:id})}
function trialEnd(g,won){const W=WINGS.find(w=>w.id===g.trial);
  setTimeout(()=>openOv(`<div class="wint">🚀 ટ્રાયલ પૂરી!</div><img class="wic big" src="${wingIcon(W.id)}"><div class="row">${W.n} સાથી કેવો લાગ્યો?</div>
   <div class="row small">ટ્રાયલમાં ⭐/💎/માળા મળતાં નથી. ખરીદવા ${gemB(W.cost)} (તમારી પાસે ${P.gems})</div>
   <div class="brow"><button class="btn sec" onclick="showMap()">નકશો</button><button class="btn" onclick="showMap();openShop('wing')">🛒 દુકાન</button></div>`),600)}

// ---------- 🏅 સિદ્ધિઓ ----------
function openAch(){const got=ACH.filter(a=>P.achGot[a.id]).length;
  let h=`<div class="ctitle">🏅 સિદ્ધિઓ ${GD(got)}/${GD(ACH.length)}</div><div class="row small">${hubName()||'હીરો'} ${titleLine()}</div><div class="agrid">`;
  for(const a of ACH){const g=P.achGot[a.id],c=P.achC[a.id],pr=!g&&a.pr?a.pr():null;
    h+=`<div class="abadge${g?' got':''}${c?' done':''}"><div class="aic">${a.art?'<img src="'+a.art+'">':a.ic}</div><b>${a.n}</b>
      ${c?'<small>✔ લીધું</small>':g?`<button class="sbuy aget" data-a="${a.id}">લો ${gemB(a.r)}</button>`:`<small>${pr?GD(Math.min(pr[0],pr[1]))+'/'+GD(pr[1])+' · ':''}${gemB(a.r)}</small>`}</div>`}
  h+='</div><button class="btn" onclick="closeOv()">બંધ કરો</button>';openOv(h);
  document.querySelectorAll('[data-a]').forEach(b=>b.onclick=()=>{const a=ACH.find(x=>x.id===b.dataset.a);if(P.achC[a.id])return;
    const e={kind:'ach',ach:a.id,gems:a.r};applyLocal(e);pushEvent(e);SFX.coin();vib(30);toast('🏅 +'+a.r+' 💎');updMapHud();updDots();openAch();sync()})}

// ---------- 🎁 રોજનું ઇનામ + પડકાર ----------
function openDaily(){chalToday();const av=dailyAvail(),nd=av?nextDailyDay(P.daily,today()):0,c=todayChal(),done=P.chal.prog>=c.goal;
  let h=`<div class="ctitle">🎁 રોજનું ઇનામ</div><div class="row small"><img class=ic src="${UI.fire}"> ${GD(P.streak)} દિવસ સળંગ · રોજ આવો, 7મા દિવસે ખજાનો!</div><div class="dgrid">`;
  for(let i=1;i<=7;i++){const got=av?(nd>1&&i<nd):(i<=P.daily.day),now=av&&i===nd;
    h+=`<div class="dbox${got?' got':''}${now?' now':''}${i===7?' d7':''}"><small>દિવસ ${GD(i)}</small>${i===7?`<img src="${A2.gift_closed}">`:`<img class=ic src="${UI.gem}">`}<b>${DAILY[i-1]}</b>${got?'<i>✔</i>':''}</div>`}
  h+='</div>'+(av?`<button class="btn" id="dGet">આજનું ઇનામ લો ▶ ${gemB(DAILY[nd-1])}</button>`:`<div class="row small">✔ આજનું ઇનામ લીધું — કાલે ફરી આવો!</div>`);
  h+=`<div class="chal${done?' ok':''}"><div class="ct">🎯 આજનો પડકાર</div><div class="cn">${c.ic} ${c.n}</div><div class="cbar"><i style="width:${Math.min(100,P.chal.prog/c.goal*100)}%"></i></div>
    <small>${GD(Math.min(P.chal.prog,c.goal))}/${GD(c.goal)} · ઇનામ ${gemB(CHAL_R)}</small>
    ${P.chal.claimed?'<div class="row small">✔ ઇનામ લીધું</div>':done?`<button class="btn" id="cGet">પડકારનું ઇનામ લો ${gemB(CHAL_R)}</button>`:''}</div>
    <button class="btn sec" onclick="closeOv()">બંધ કરો</button>`;openOv(h);
  if($('dGet'))$('dGet').onclick=()=>{const date=today(),day=nextDailyDay(P.daily,date),e={kind:'daily',date,day,gems:DAILY[day-1]};
    applyLocal(e);pushEvent(e);updDots();openChest(e.gems,()=>{updMapHud();openDaily()});sync()};
  if($('cGet'))$('cGet').onclick=()=>{const e={kind:'chal',date:P.chal.date,gems:CHAL_R};applyLocal(e);pushEvent(e);SFX.coin();updDots();openChest(CHAL_R,()=>{updMapHud();openDaily()});sync()}}

// ---------- નકશા પર બટન + CSS ----------
(function(){const d=document.createElement('div');d.className='side2';
  d.innerHTML=`<button id="shopB" aria-label="દુકાન"><img src="${A2.mb_shop}"></button><button id="achB" aria-label="સિદ્ધિઓ"><img src="${A2.mb_ach}"></button><button id="dayB" aria-label="રોજનું ઇનામ"><img src="${A2.mb_day}"></button>`;$('mapV').appendChild(d);
  const ab=document.createElement('div');ab.id='achbar';$('app').appendChild(ab);
  $('shopB').onclick=()=>{SFX.tap();openShop()};$('achB').onclick=()=>{SFX.tap();openAch()};$('dayB').onclick=()=>{SFX.tap();openDaily()};
  const st=document.createElement('style');st.textContent=`
.side2{position:absolute;left:10px;bottom:84px;z-index:50;display:flex;flex-direction:column;gap:8px}
.side2 button{position:relative;width:54px;height:54px;border:0;padding:0;background:none;filter:drop-shadow(0 3px 4px rgba(0,0,0,.45))}.side2 button img{width:100%;height:100%;object-fit:contain;display:block}.side2 button:active img{transform:scale(.92)}
.side2 button.rdot::after{content:'';position:absolute;right:2px;top:2px;width:13px;height:13px;border-radius:50%;background:#ff3b4e;border:2px solid #fff;animation:dotp 1.2s infinite}
@keyframes dotp{50%{transform:scale(1.25)}}
#achbar{position:absolute;left:50%;top:-70px;transform:translateX(-50%);z-index:150;max-width:94%;padding:9px 16px;border-radius:18px;background:linear-gradient(#ffe98a,#ffb52e);color:#5a2e00;font-weight:700;font-size:15px;box-shadow:0 4px 0 #b8720c,0 8px 18px rgba(0,0,0,.45);transition:top .35s;white-space:nowrap;display:flex;align-items:center;gap:8px}
#achbar.on{top:12px}#achbar .ai{font-size:24px}
.ttl{display:inline-block;margin:2px 0;padding:1px 10px;border-radius:10px;background:rgba(255,227,106,.18);color:#ffe36a;font-weight:700;font-size:13px}
.sgem{display:flex;justify-content:center;align-items:center;gap:6px;font-weight:700;font-size:20px;color:#9ff0ff;margin-bottom:6px}.sgem .ic{width:24px;height:24px}.sgem small{font-size:11px;color:#ffe1a6}
.tabs{display:flex;gap:4px;margin-bottom:6px}.tabs button{flex:1;height:38px;border-radius:14px;border:2px solid #9d7bff;background:rgba(40,25,110,.75);color:#fff;font-family:B;font-weight:700;font-size:14px}
.tabs button.on{background:linear-gradient(#fff2a0,#ffc42e);color:#5a2e00;border-color:#fff3b0}
.slist{text-align:left}.sub{margin:10px 0 4px;font-weight:700;color:#ffe36a}
.srow,.wcard{display:flex;align-items:center;gap:8px;padding:7px 8px;margin:6px 0;border-radius:14px;background:rgba(40,25,110,.7);border:2px solid rgba(157,123,255,.6)}
.wcard.sel{border-color:#ffe36a;box-shadow:0 0 10px rgba(255,227,106,.5)}
.sic{width:42px;height:42px;flex:0 0 42px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;background:radial-gradient(circle at 40% 35%,#6b4fd8,#2a1a7a);box-shadow:inset 0 0 0 2px #c9b3ff;object-fit:contain}
.wic{width:56px;height:56px;flex:0 0 56px;object-fit:contain}.wic.big{width:110px;height:110px;display:block;margin:4px auto}
.sinfo{flex:1;min-width:0;display:flex;flex-direction:column}.sinfo b{font-size:15px}.sinfo small{font-size:12px;color:#d9ccff}.sinfo small span{color:#9ff0a0}
.pips{display:flex;gap:3px;margin:2px 0}.pips i{width:13px;height:9px;border-radius:5px;background:rgba(255,255,255,.2)}.pips i.f{background:#ffd23a;box-shadow:0 0 5px #ffd23a}.pips i.k{background:rgba(255,255,255,.07);outline:1px dashed rgba(255,255,255,.3)}
.sbuy{min-width:70px;height:36px;padding:0 8px;border-radius:18px;border:0;font-family:B;font-weight:700;font-size:15px;color:#5a2e00;background:linear-gradient(#fff2a0,#ffc42e 60%,#f0a010);box-shadow:0 3px 0 #b8720c;display:inline-flex;align-items:center;justify-content:center;gap:3px;white-space:nowrap}
.sbuy.poor{filter:grayscale(.6) brightness(.85)}.sbuy.dis{background:rgba(255,255,255,.12);color:#d9ccff;box-shadow:none;font-size:12px}
.sbuy.sel2{background:linear-gradient(#9d7bff,#5c3bd1);color:#fff;box-shadow:0 3px 0 #3a2297;font-size:13px}.sbuy.try{background:linear-gradient(#9ff0ff,#33b6e0);color:#08305a;box-shadow:0 3px 0 #1a6f9a;font-size:12px}
.wbtns{display:flex;flex-direction:column;gap:6px}
.cgrid2{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}.cbox{position:relative;border:2px solid rgba(157,123,255,.6);border-radius:12px;background:rgba(40,25,110,.7);padding:4px 2px;color:#fff;font-family:B;font-size:11px;font-weight:700;display:flex;flex-direction:column;align-items:center}
.cbox img{width:44px;height:44px;object-fit:contain}.cbox img.fprev{width:38px;height:38px;border-radius:50%;object-fit:cover;object-position:50% 12%;background:#fff3c4;margin:3px}.cbox.sel{border-color:#ffe36a;box-shadow:0 0 8px rgba(255,227,106,.6)}
.cbox em{font-style:normal;display:flex;align-items:center;font-size:11px;color:#9ff0ff}.cbox em .ic{width:13px;height:13px}
.tlist{display:flex;flex-wrap:wrap;gap:6px}.tbtn{flex:1 1 45%;padding:6px;border-radius:12px;border:2px solid rgba(157,123,255,.6);background:rgba(40,25,110,.7);color:#fff;font-family:B;font-weight:700;font-size:13px;display:flex;flex-direction:column;align-items:center}
.tbtn.sel{border-color:#ffe36a;color:#ffe36a}.tbtn.lk{opacity:.7}.tbtn small{font-size:10px;color:#d9ccff}
.agrid{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}.abadge{display:flex;flex-direction:column;align-items:center;gap:2px;padding:6px 3px;border-radius:12px;background:rgba(40,25,110,.6);border:2px solid rgba(157,123,255,.35);filter:grayscale(.8) brightness(.8)}
.abadge.got{filter:none;border-color:#ffe36a;box-shadow:0 0 10px rgba(255,227,106,.55)}.abadge.done{filter:none;border-color:#7be0a0}
.abadge .aic{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;background:radial-gradient(circle at 40% 35%,#ffe98a,#c77d10);box-shadow:0 0 0 2px #fff3b0}.abadge .aic img{width:100%;height:100%;object-fit:contain}
.abadge b{font-size:12px;line-height:1.2}.abadge small{font-size:11px;color:#d9ccff;display:flex;align-items:center;gap:2px}.abadge small .ic{width:13px;height:13px}.aget{min-width:0;height:28px;font-size:13px}.aget .ic{width:14px;height:14px}
.dgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin:6px 0}.dbox{position:relative;display:flex;flex-direction:column;align-items:center;padding:5px 2px;border-radius:12px;background:rgba(40,25,110,.7);border:2px solid rgba(157,123,255,.5);font-weight:700}
.dbox small{font-size:11px;color:#d9ccff}.dbox .ic{width:26px;height:26px}.dbox img:not(.ic){width:46px}.dbox b{color:#9ff0ff}.dbox.d7{grid-column:span 2;background:rgba(120,60,10,.6);border-color:#ffc42e}
.dbox.got{opacity:.6}.dbox.got i{position:absolute;right:4px;top:2px;color:#7be0a0;font-style:normal}.dbox.now{border-color:#ffe36a;box-shadow:0 0 12px rgba(255,227,106,.75);animation:pulseB 1.4s infinite}
.chal{margin:10px 0 4px;padding:8px;border-radius:14px;background:rgba(20,70,100,.6);border:2px solid #6fdcff}.chal.ok{border-color:#7be0a0}.chal .ct{font-weight:700;color:#9ff0ff}.chal .cn{font-weight:700;font-size:16px;margin:2px 0}
.cbar{height:10px;border-radius:5px;background:rgba(255,255,255,.18);overflow:hidden;margin:4px 0}.cbar i{display:block;height:100%;background:linear-gradient(90deg,#6fdcff,#7be0a0)}.chal small{display:inline-flex;align-items:center;gap:3px}.chal small .ic{width:14px;height:14px}
.btn .ic,.sbuy .ic{width:18px;height:18px}
`;document.head.appendChild(st)})();


// ---------- 🎨 ચિત્રો (ChatGPT) — assets2.js ----------
UPG.forEach(u=>u.art=A2['up_'+u.id]);
(function(){const m={tej:['bd_garud','ગરુડ'],kiran:['bd_mor','મોર'],dhal:['bd_hans','હંસ']};WINGS.forEach(w=>{w.art=A2[m[w.id][0]];w.n=m[w.id][1]});
  ACH.forEach((a,i)=>a.art=A2['ach_'+String(i+1).padStart(2,'0')]);FRAMES.forEach((f,i)=>f.art=A2['fr_'+(i+1)]);
  const s=document.createElement('style');s.textContent=`
img.sic{background:none!important;box-shadow:none!important;border-radius:0!important;width:50px;height:50px;flex:0 0 50px}
#achbar .ai img{width:30px;height:30px;object-fit:contain;display:block}
.abadge .aic{background:none!important;box-shadow:none!important;border-radius:0!important;width:48px;height:48px}
img.face.fr{border:0!important;background:transparent!important;border-radius:0!important;object-fit:contain!important;transform:scale(1.32)}
.cbox .fpw{position:relative;width:52px;height:52px;display:block}.cbox .fpw .fprev{position:absolute;left:50%;top:50%;width:62%;height:62%;margin:0;transform:translate(-50%,-50%)}.cbox .fpw .fring{position:absolute;left:0;top:0;width:100%;height:100%}
.panel[data-p=set]{border-style:solid;border-width:46px 30px 52px 30px;border-image:url(${A2.ui_panel}) 90 40 100 40 fill/46px 30px 52px 30px stretch}
.sribbon{position:relative;margin:2px -16px 8px;height:60px;display:flex;align-items:center;justify-content:center}.sribbon img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}
.sribbon b{position:relative;font-size:21px;color:#5a2d00;text-shadow:0 1px 0 #fff3b0;margin-top:-4px}
.ssec{margin:10px 0;text-align:left}.ssec .sh{display:flex;align-items:center;gap:8px;font-weight:700;font-size:15px;color:#ffe9a8;margin-bottom:6px}.ssec .sh img{width:34px;height:34px;flex:0 0 34px}.ssec .sh small{font-weight:400;font-size:11px;opacity:.8;display:block}
.sr3,.sr2{display:flex;gap:7px}.spl{flex:1;height:46px;border:0;padding:0 4px;font-family:B;font-weight:700;font-size:15px;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.5);background:url(${A2.ui_pill}) center/100% 100% no-repeat;filter:drop-shadow(0 2px 3px rgba(0,0,0,.4))}
.spl.on{color:#5a2d00;text-shadow:0 1px 0 #fff3b0;background-image:url(${A2.ui_pillOn})}.spl:active{transform:scale(.96)}
.sr2.s2{margin-top:7px}.sr2.s2 .spl{font-size:13px;height:42px}
.sinfo{font-size:12px;opacity:.85;margin:6px 2px;text-align:left}
.ssec.test{border:1px dashed rgba(255,227,106,.45);border-radius:14px;padding:8px}
.stg{display:flex;align-items:center;gap:10px;width:100%;border:0;background:none;color:#fff;font-family:B;font-size:14px;font-weight:700;padding:4px 0;text-align:left}.stg img{width:62px;flex:0 0 62px}

.s2col{display:flex;gap:10px}.s2col .ssec{flex:1}
.sh2{margin:6px 0 2px;font-weight:700;color:#ffe9a8;text-align:left;font-size:15px}
.sprev{display:flex;align-items:center;gap:10px;margin-bottom:8px}
.pwin{position:relative;width:108px;height:108px;flex:0 0 108px}.pwin .pf{position:absolute;inset:0;width:100%;height:100%}
.pwin .pship{position:absolute;left:50%;top:50%;width:68px;height:68px;object-fit:contain;transform:translate(-50%,-50%);animation:pfloat 2.2s ease-in-out infinite;filter:drop-shadow(0 0 10px rgba(255,220,120,.6))}
@keyframes pfloat{50%{transform:translate(-50%,-56%)}}
.pinfo{flex:1;text-align:left;display:flex;flex-direction:column;gap:4px}.pinfo b{font-size:20px;color:#ffe36a}.pinfo small{font-size:12px;color:#d9ccff;line-height:1.3}
.sgrid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px}
.scard{position:relative;border:0;padding:0;background:none;height:74px;color:#fff;font-family:B;font-size:12px;font-weight:700}
.scard .cbg{position:absolute;inset:0;width:100%;height:100%;object-fit:fill}.scard .sim{position:absolute;left:50%;top:6px;width:42px;height:42px;object-fit:contain;transform:translateX(-50%)}
.scard span{position:absolute;left:0;right:0;bottom:6px;text-shadow:0 1px 2px rgba(0,0,0,.7)}.scard.lk span{bottom:auto;top:50%;transform:translateY(-50%);opacity:.9}
.scard em{position:absolute;right:4px;top:2px;font-style:normal;font-size:9px;padding:1px 5px;border-radius:8px;background:#3a2297;color:#ffe9a8;border:1px solid #ffd23a}
.scard:active{transform:scale(.95)}
.spl.sm{font-size:14px;height:38px}.brow .spl{flex:1}

.panel.sp2{display:flex;flex-direction:column;overflow:visible!important;padding:0!important;width:100%;height:min(100%,780px);max-height:none}
.panel.sp2 .sribbon{flex:0 0 auto;position:relative;height:46px;margin:14px -16px 8px;z-index:3}.panel.sp2 .sribbon b,.sribbon b{font-size:20px;line-height:1;margin-top:7px}
.pv{position:relative;flex:0 0 auto;height:clamp(130px,25vh,280px);margin:4px 2px 6px}
.pv canvas{position:absolute;inset:0;width:100%;height:100%;border-radius:16px;box-shadow:0 0 0 3px #ffd23a,0 0 0 5px #8a5a00,0 0 12px 3px rgba(255,210,58,.5)}
.pv .ptag{position:absolute;left:8px;top:8px;padding:2px 10px;border-radius:12px;background:rgba(20,10,70,.78);font-size:13px;font-weight:700;line-height:1.3;color:#ffe36a;max-width:92%}
.ptabs{flex:0 0 auto;display:flex;gap:6px;margin:2px 2px 6px}.ptabs button{flex:1;height:36px;padding:0 2px;border:0;border-radius:12px;font-family:B;font-weight:700;font-size:14px;line-height:1;color:#fff;background:rgba(40,25,110,.8);box-shadow:inset 0 0 0 2px rgba(157,123,255,.7)}
.ptabs button.on{color:#5a2d00;background:linear-gradient(#fff2a0,#ffc42e);box-shadow:inset 0 0 0 2px #fff3b0}
.pages{flex:1 1 0;min-height:0;display:flex;overflow-x:auto;overflow-y:hidden;scroll-snap-type:x mandatory;scrollbar-width:none}.pages::-webkit-scrollbar{display:none}
.pgx{flex:0 0 100%;scroll-snap-align:start;overflow-y:auto;padding:0 4px 4px;text-align:left;scrollbar-width:none}.pgx::-webkit-scrollbar{display:none}
.panel.sp2 .sh{display:flex;align-items:center;gap:8px;font-size:15px;line-height:1.2;margin:4px 0 4px}.panel.sp2 .sh img{width:30px;height:30px}.panel.sp2 .sh span{padding-top:2px}.panel.sp2 .sh small{display:block;font-size:11px;font-weight:500;opacity:.85;line-height:1.2}
.sh2{font-weight:700;font-size:15px;line-height:1.2;color:#ffe9a8;margin:6px 0 4px}.sh2 small{font-weight:500;font-size:11px;opacity:.8}
.g4{display:grid;grid-template-columns:repeat(4,1fr);gap:6px 6px}
.sw{display:flex;flex-direction:column;align-items:center;gap:1px}.sw span{font-size:12px;font-weight:700;line-height:1.2;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.8);white-space:nowrap}
.sw .scard{position:relative;width:100%;height:auto;aspect-ratio:1/1.08;max-height:72px;border:0;padding:0;background:none}
.sw .scard .cbg{position:absolute;inset:0;width:100%;height:100%;object-fit:fill}.sw .scard .sim{position:absolute;left:50%;top:50%;width:62%;height:62%;object-fit:contain;transform:translate(-50%,-50%)}
.sw .scard em{position:absolute;right:0;top:-2px;font-style:normal;font-size:10px;line-height:1.1;padding:1px 5px;border-radius:8px;background:#3a2297;color:#ffe9a8;border:1px solid #ffd23a}
.snote{font-size:12px;line-height:1.35;color:#d9ccff;margin:6px 2px}.lnk{color:#ffe36a;text-decoration:underline}
.panel.sp2 .foot,.foot{flex:0 0 auto;display:flex;gap:8px;margin:6px 2px 0}.foot .spl{height:42px;font-size:14px;line-height:1;padding-top:2px}
.panel.sp2 .spl{height:42px;line-height:1;padding:2px 10px 0}

#ovx{position:absolute;z-index:5;width:44px;height:44px;padding:0;border:0;background:none;filter:drop-shadow(0 3px 5px rgba(0,0,0,.55))}#ovx img{width:100%;height:100%;object-fit:contain;display:block}#ovx:active{transform:scale(.92)}
.foot{justify-content:center}.foot .spl{flex:0 1 52%}

.sw .scard.lk .lkl{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);font-size:22px}
.scard[data-bg] .sim{object-fit:cover;border-radius:8px}
`;document.head.appendChild(s)})();

showMap();
window.__LH={stageData,checkAll,startStage,sync,srvLoad,starGet,starSet,migrate,get P(){return P},get G(){return G}};
$('hSi').src=UI.star;

function openChest(n,cb){openOv(`<div class="ctitle">ખજાનો!</div><img id="chestImg" class="chestB shakeC" src="${A2.gift_closed}"><div id="chestT" class="row" style="min-height:30px"></div><button class="btn" id="chestOk" style="visibility:hidden">વાહ! ▶</button>`);
  SFX.tap();setTimeout(()=>{const i=$('chestImg');if(!i)return;i.src=A2.gift_open;i.classList.remove('shakeC');i.classList.add('popC');SFX.power();
   $('chestT').innerHTML=`<b style="font-size:24px;color:#9ff0ff"><img class=ic style="width:26px;height:26px" src="${UI.gem}"> +${n}</b>`;$('chestOk').style.visibility='visible';$('chestOk').onclick=()=>{closeOv();cb&&cb()}},1100)}
(function(){const l=document.createElement('link');l.rel='icon';l.href=UI2.icon;document.head.appendChild(l);const a=document.createElement('link');a.rel='apple-touch-icon';a.href=UI2.icon;document.head.appendChild(a);
  const t=$('titleV');t.style.backgroundImage=`url(${A.bg})`;$('tLogo').src=UI2.logo;
  $('tPlay').onclick=()=>{auResume();SFX.tap();t.classList.add('gone');setTimeout(()=>{t.style.display='none';if(P.avatar<0)chooseAvatar()},400)}})();

// ---------- ક્રમ 1 CSS (ખાસ સ્ટેજ, બેનર) ----------
(function(){const st=document.createElement('style');st.textContent=`
.node.special:not(.cur){background:radial-gradient(circle at 35% 28%,#e6fcff,#3cc9ea 55%,#2a62d0);color:#fff;text-shadow:0 1px 2px rgba(10,30,90,.7);box-shadow:0 0 0 3px #c4f6ff,0 0 14px 6px rgba(80,220,255,.65),0 3px 0 #1b4a9a}
.node.special.lock{filter:grayscale(.5) brightness(.92)}
.spb{position:absolute;transform:translate(-50%,-50%);width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;line-height:1;pointer-events:none;background:#1b3f9a;border:2px solid #bff4ff;box-shadow:0 2px 4px rgba(0,0,0,.5)}
.introL .sp{font-size:20px;font-weight:700;color:#7ff0ff;margin:4px 0}.introL .spg{font-size:16px;font-weight:700;color:#fff3b0;margin-bottom:4px}
.spw{margin:6px 0;font-weight:700;color:#9ff0ff}
.banner{background:none!important;box-shadow:none!important;border-radius:0!important;border-style:solid!important;border-color:transparent!important;border-width:0 26px!important;border-image:url(${UI.bubLong}) 0 40 fill / 0 26px stretch!important;text-shadow:0 1px 3px rgba(30,10,80,.8)}
/* ક્રમ 1b */
.hud .t{cursor:pointer}
.hud2 #mcloud{pointer-events:auto;cursor:pointer}
#mcloud.ok{background:rgba(20,110,60,.85)}#mcloud.pend{background:rgba(190,100,10,.9)}#mcloud.off{background:rgba(90,90,110,.9)}#mcloud.busy{background:rgba(40,90,170,.9)}
.lockbub{cursor:pointer}.lockbub .cd{display:inline-block;margin-top:3px;padding:2px 10px;border-radius:10px;background:#7a55e0;color:#fff;font-size:14px}
.node.cloud{background:radial-gradient(circle at 35% 28%,#fff,#bcd3ff 60%,#7d95d8)!important;font-size:18px;box-shadow:0 0 0 3px #ffb64a,0 0 12px 4px rgba(255,170,60,.7)!important;animation:cpulse 1.4s infinite}
@keyframes cpulse{50%{transform:translate(-50%,-50%) scale(1.08)}}
.loklist{display:flex;flex-direction:column;gap:6px;margin:6px 0 10px;max-height:58vh;overflow:auto}
.lokrow{display:flex;align-items:center;gap:10px;padding:7px 10px;border-radius:14px;border:2px solid #9d7bff;background:rgba(40,25,110,.75);color:#fff;font-family:B;text-align:left}
.lokrow.sel{border-color:#ffe36a;box-shadow:0 0 10px rgba(255,227,106,.6)}.lokrow.lk{opacity:.78}
.lokrow .li{font-size:24px;width:32px;text-align:center}.lokrow .ln{font-weight:700;font-size:15px;display:flex;flex-direction:column}.lokrow small{font-weight:500;font-size:12px;color:#d9ccff}
.sync{color:#ffe1a6;font-weight:700}
`;document.head.appendChild(st)})();
$('mcloud').onclick=()=>{toast(!isOnline()?'☁️ નેટ નથી — પરિણામ ફોનમાં સચવાયાં છે':P.pend.length?'⏳ મોકલું છું…':'☁️ બધું સચવાયેલું છે');sync()};
$('mtitle').onclick=showLoks;
sync();

/* ભાષા: હબમાં ભાષા બદલાય તો ગેમ ફરી લોડ (ગેમ ચાલુ હોય ત્યારે નહીં, નકશા પર) */
try{window.SatsangBox&&SatsangBox.onChange&&SatsangBox.onChange((k)=>{if(k==='lang')location.reload()})}catch(e){}
