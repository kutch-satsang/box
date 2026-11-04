/* સત્સંગ બોક્સ — ફરજિયાત Google લૉગિન (auth.js)
   હબમાં: <script src="auth.js"></script> (લૉગિન પાનું અહીં જ બને)
   ગેમમાં: <script src="../auth.js"></script> (લૉગિન ન હોય તો હબ પર પાછા)
   એક વાર લૉગિન થયા પછી સત્ર ફોનમાં સચવાય, એટલે નેટ વગર પણ ગેમ ચાલે.
   અહીંની ચાવી publishable છે, ખાનગી નથી. સુરક્ષા Supabase ના નિયમોમાં છે. */
(function(){
var URL_="https://fexjcqyaopfilwixwfpn.supabase.co";
var KEY="sb_publishable_RCGMIsbR27_gu6aUZ_3pUg_OajpxBhL";
var TOKEN="sb-fexjcqyaopfilwixwfpn-auth-token";
var root=document.documentElement;
var src=(document.currentScript&&document.currentScript.getAttribute("src"))||"";
var inGame=src.indexOf("../")===0;

function hasSession(){try{return !!localStorage.getItem(TOKEN)}catch(e){return false}}

if(inGame){
  if(!hasSession()&&window.top===window.self)location.replace("../");
  return;
}

var T={
 g:{or:"અથવા",nm:"First & Last name",guest:"Login વગર આગળ વધો",need:"પૂરું નામ લખો (નામ અને અટક).",taken:"આ નામ લેવાઈ ગયું છે. પાછળ નંબર ઉમેરો, દા.ત. રમેશ પટેલ 2",btn:"Google થી Login કરો",note:"એક વાર લૉગિન કર્યા પછી નેટ વગર પણ રમી શકાશે.",busy:"લૉગિન થાય છે…",off:"પહેલી વાર લૉગિન માટે ઇન્ટરનેટ જોઈએ.",err:"લૉગિન ન થયું. ફરી પ્રયત્ન કરો.",wv:"આ પાનું Chrome કે Safari માં ખોલો, નહીંતર Google લૉગિન નહીં થાય."},
 e:{or:"or",nm:"First & Last name",guest:"Continue without login",need:"Please write your full name (first and last).",taken:"This name is already taken. Add a number at the end, e.g. Ramesh Patel 2",btn:"Continue with Google",note:"After one login you can play without internet.",busy:"Signing in…",off:"The first login needs internet.",err:"Login failed. Please try again.",wv:"Open this page in Chrome or Safari. Google login will not work here."},
 r:{or:"athva",nm:"First & Last name",guest:"Login vagar aagal vadho",need:"Puru naam lakho (naam ane atak).",taken:"Aa naam levai gayu chhe. Pachhal number umero, d.t. Ramesh Patel 2",btn:"Google thi Login karo",note:"Ek vaar login karya pachhi net vagar pan rami shakashe.",busy:"Login thay chhe…",off:"Paheli vaar login mate internet joie.",err:"Login na thayu. Fari prayatna karo.",wv:"Aa panu Chrome ke Safari ma kholo, nahintar Google login nahi thay."}
};
var NAME={g:"સત્સંગ બોક્સ",e:"Satsang Box",r:"Satsang Box"};
var LB={g:"G",e:"E",r:"G.a"};
var q=location.search;
var returning=/[?&]code=/.test(q);
var failed=/[?&]error/.test(q)||/error_description=/.test(location.hash);
var client=null,gate=null,loading=null,busy=false,msgKey="";
var dup=/identity_already_exists/.test(q+location.hash);

/* મહેમાન → Google: Google બીજે ઓળખાય નહીં તે પહેલાં સર્વર પાસેથી એક-વારની ચિઠ્ઠી લે.
   Google ખાતું નવું હોય તો એ જ ખાતું જોડાય; પહેલેથી હોય તો ચિઠ્ઠીથી હિસ્ટ્રી ત્યાં ખસે. */
var MK="sbMerge",merging=false;
function mergeGet(){try{var o=JSON.parse(localStorage.getItem(MK)||"null");return o&&o.exp>Date.now()?o:null}catch(e){return null}}
function mergeDrop(){try{localStorage.removeItem(MK)}catch(e){}}
function mergeFinish(s){
  if(merging||s.user.is_anonymous)return;
  var m=mergeGet();if(!m){mergeDrop();return}
  merging=true;
  client.rpc("guest_merge_finish",{token:m.t}).then(function(r){merging=false;if(!r.error)mergeDrop()},function(){merging=false});
}

function lang(){var v="g";try{v=localStorage.getItem("satsangLang")||"g"}catch(e){}return T[v]?v:"g"}
function classic(){try{return localStorage.getItem("satsangTheme")==="kaach"}catch(e){return false}}
function webview(){var u=navigator.userAgent;return /; wv\)|FBAN|FBAV|Instagram|WhatsApp|Line\/|MicroMessenger/.test(u)}
function lock(){root.classList.add("sbl")}
function unlock(){root.classList.remove("sbl");if(gate&&gate.parentNode)gate.parentNode.removeChild(gate);gate=null}

var css=document.createElement("style");
css.textContent=
"html.sbl,html.sbl body{overflow:hidden}html.sbl body>*:not(#sbGate){visibility:hidden}"+
"#sbGate{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;box-sizing:border-box;padding:max(16px,env(safe-area-inset-top)) 16px max(16px,env(safe-area-inset-bottom));overflow:auto;font-family:'Hind Vadodara','Noto Sans Gujarati',sans-serif;color:#4a2c1c;background:linear-gradient(rgba(248,235,214,.62),rgba(240,218,186,.72)),#f4e3cc url(themes/adhyatmik/mati/bg.webp) center top/cover}"+
"#sbGate.cl{color:#2b3445;background:linear-gradient(150deg,#d8ece8,#e9e3f4 55%,#f7e4d8)}"+
"#sbGate *{box-sizing:border-box}"+
".sbc{position:relative;width:100%;max-width:340px;padding:26px 22px 20px;text-align:center;border-radius:28px;background:linear-gradient(160deg,#fdf5e8,#f3e3cb);box-shadow:0 .7rem 1.6rem rgba(120,80,40,.25),inset 0 2px 3px #fff,inset 0 -6px 10px rgba(180,130,80,.1)}"+
"#sbGate.cl .sbc{background:linear-gradient(150deg,rgba(255,255,255,.72),rgba(255,255,255,.38));border:1px solid rgba(255,255,255,.9);box-shadow:0 .7rem 1.8rem rgba(70,90,120,.18);-webkit-backdrop-filter:blur(18px);backdrop-filter:blur(18px)}"+
".sbo{display:block;width:96px;height:96px;object-fit:contain;margin:0 auto 4px}"+
".sbt{margin:0;font:700 31px/1.2 'Baloo Bhai 2','Noto Serif Gujarati',serif;letter-spacing:0}"+
".sbt{margin-bottom:16px}#sbGate.cl .sbn,#sbGate.cl .sbor,#sbGate.cl .sbf{color:#5f6b7f}"+
".sbor{display:flex;align-items:center;gap:10px;margin:12px 0 10px;font-size:13px;color:#7b5a3a}.sbor:before,.sbor:after{content:'';flex:1;height:1px;background:rgba(120,80,40,.25)}"+
".sbf{display:block;text-align:left;margin:0 0 8px;font-size:13px;font-weight:600;color:#7b5a3a}.sbf i{color:#a4371c;font-style:normal}"+
".sbf input{display:block;width:100%;min-height:46px;margin-top:3px;padding:8px 16px;border:1px solid #e3c9a4;border-radius:23px;background:#fffaf0;color:#4a2c1c;font:500 16px 'Hind Vadodara','Noto Sans Gujarati',sans-serif;outline:none}.sbf input:focus{border-color:#e8845f}.sbf.bad input{border:2px solid #c0392b;background:#fff1ec}.sbf.bad{animation:sbsh .4s}@keyframes sbsh{20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}"+
".sbk{display:flex;align-items:center;justify-content:center;width:100%;min-height:50px;padding:8px 14px;border:0;border-radius:25px;background:#e8845f;color:#fff;font:600 16px/1.2 'Hind Vadodara','Noto Sans Gujarati',sans-serif;cursor:pointer;box-shadow:0 3px 8px rgba(90,60,30,.2);-webkit-tap-highlight-color:transparent}.sbk:disabled{opacity:.6}"+
".sbg{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;min-height:52px;padding:8px 14px;border:1px solid #dadce0;border-radius:26px;background:#fff;color:#2b2b2b;font:600 16px/1.2 'Hind Vadodara','Noto Sans Gujarati',sans-serif;cursor:pointer;box-shadow:0 3px 8px rgba(90,60,30,.2);-webkit-tap-highlight-color:transparent}"+
".sbg:active{transform:translateY(1px)}.sbg:disabled{opacity:.6;cursor:default}.sbg svg{flex:none;width:20px;height:20px}"+
".sbn{margin:10px 0 0;font-size:13px;line-height:1.45;color:#7b5a3a}.sbn:empty{display:none}.sbn.bad{color:#a4371c;font-weight:600}"+
".sbl-one{position:fixed;top:max(14px,env(safe-area-inset-top));right:14px;min-width:72px;min-height:40px;padding:0 14px;border:0;border-radius:20px;background:#e8845f;color:#fff;font:700 15px 'Hind Vadodara',sans-serif;cursor:pointer;box-shadow:0 3px 8px rgba(120,80,40,.25);-webkit-tap-highlight-color:transparent}.sbl-one:active{transform:translateY(1px)}";
(document.head||root).appendChild(css);

function draw(){
  if(!gate||!document.body)return;
  var l=lang(),t=T[l],note=gate.querySelector(".sbn"),btn=gate.querySelector(".sbg");
  gate.querySelector(".sbt").textContent=NAME[l];
  gate.querySelector(".sbgt").textContent=busy==="g"?t.busy:t.btn;
  gate.querySelector(".sbor").textContent=t.or;
  gate.querySelector(".sbfl").textContent=t.nm+" ";
  var kb=gate.querySelector(".sbk");kb.textContent=busy==="n"?t.busy:t.guest;
  btn.disabled=kb.disabled=!!busy;
  var k=msgKey||(webview()?"wv":(navigator.onLine===false?"off":""));
  note.textContent=k?t[k]:"";note.classList.toggle("bad",!!k);
  gate.querySelector(".sbl-one").textContent="🌐 "+LB[l];
}
function buildGate(){
  if(gate)return;
  gate=document.createElement("div");gate.id="sbGate";if(classic())gate.className="cl";
  gate.setAttribute("role","dialog");gate.setAttribute("aria-modal","true");
  gate.innerHTML='<div class="sbc"><img class="sbo" src="themes/adhyatmik/mati/om.webp" alt=""><h1 class="sbt"></h1>'+
   '<button class="sbg" type="button"><svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.7 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.2C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.9 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.9c-.6 3-2.3 5.5-4.8 7.2l7.7 6c4.5-4.2 7.1-10.3 7.1-17.7z"/><path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.2C1 16.5 0 20.1 0 24s1 7.5 2.6 10.8l7.9-6.2z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.8-5.8l-7.7-6c-2.1 1.4-4.9 2.3-8.1 2.3-6.3 0-11.6-4.2-13.5-9.9l-7.9 6.2C6.5 42.6 14.6 48 24 48z"/></svg><span class="sbgt"></span></button>'+
   '<div class="sbor"></div><form class="sbfm" novalidate><label class="sbf"><span class="sbfl"></span><i>*</i><input class="sbin" type="text" autocomplete="name" maxlength="60" enterkeyhint="go"></label>'+
   '<button class="sbk" type="submit"></button></form><p class="sbn"></p></div><button class="sbl-one" type="button" aria-label="Language"></button>';
  gate.querySelector(".sbg").addEventListener("click",login);
  gate.querySelector(".sbin").addEventListener("input",function(){gate.querySelector(".sbf").classList.remove("bad");if(msgKey==="taken"){msgKey="";draw()}});
  gate.querySelector(".sbfm").addEventListener("submit",function(e){e.preventDefault();guest()});
  gate.querySelector(".sbl-one").addEventListener("click",function(){
    var o=["g","e","r"],k=o[(o.indexOf(lang())+1)%3];
    if(window.SatsangBox)SatsangBox.set("lang",k);else try{localStorage.setItem("satsangLang",k)}catch(x){}
    draw();
  });
  document.body.appendChild(gate);draw();
}
function showGate(){lock();if(document.body)buildGate();else document.addEventListener("DOMContentLoaded",buildGate)}

function loadLib(){
  if(loading)return loading;
  loading=new Promise(function(ok,no){
    var s=document.createElement("script");s.src="lib/supabase.js";s.onload=ok;s.onerror=no;
    (document.head||root).appendChild(s);
  }).then(function(){
    client=supabase.createClient(URL_,KEY,{auth:{flowType:"pkce",persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
    client.auth.onAuthStateChange(function(ev,s){
      if(s)setTimeout(function(){busy=false;msgKey="";unlock();seen(s);mergeFinish(s);if(window.sbFlush)sbFlush()},0);
      else if(ev==="SIGNED_OUT")setTimeout(function(){busy=false;showGate();draw()},0);
    });
    return client;
  });
  return loading;
}
var seenDone=false;
function seen(s){
  if(seenDone||!client)return;seenDone=true;
  var th="mati";try{th=localStorage.getItem("satsangTheme")||"mati"}catch(e){}
  client.from("profiles").update({language:lang(),theme:th,last_seen_at:new Date().toISOString()}).eq("id",s.user.id).then(function(){},function(){});
}
function login(){
  if(busy)return;
  if(navigator.onLine===false){msgKey="off";draw();return}
  busy="g";msgKey="";draw();mergeDrop();
  loadLib().then(function(c){
    return c.auth.signInWithOAuth({provider:"google",options:{redirectTo:new URL("./",location.href).href}});
  }).then(function(r){if(r&&r.error)throw r.error}).catch(function(){busy=false;msgKey="err";draw()});
}

function okName(v){
  /* ફક્ત અક્ષરો (ગુજરાતી/English), ઓછામાં ઓછા બે શબ્દ, દરેકમાં ૨+ અક્ષર, એક જ શબ્દ બધે નહીં */
  var w=v.split(" ");
  /* અંતે એક નંબર ૧–૯૯ ચાલે (એક જ નામના બીજા ભક્ત માટે) */
  if(w.length>2&&/^[1-9][0-9]?$|^[૧-૯][૦-૯]?$/.test(w[w.length-1]))w=w.slice(0,-1);
  if(w.length<2)return false;
  var re=/^(?:[a-zA-Z]|[\u0A81-\u0AE3])+$/;
  for(var i=0;i<w.length;i++){if(!re.test(w[i])||!/[a-zA-Z\u0A85-\u0AB9]/.test(w[i]))return false;if(w[i].replace(/[\u0A81-\u0A83\u0ABC-\u0AD0]/g,"").length<2)return false}
  var low=w.map(function(x){return x.toLowerCase()});
  if(low.every(function(x){return x===low[0]}))return false;
  if(/(.)\1\1/.test(w.join(" ").toLowerCase()))return false;
  return true;
}
function guest(){
  if(busy)return;
  var v=gate.querySelector(".sbin").value.replace(/\s+/g," ").trim();
  if(!okName(v)){var f=gate.querySelector(".sbf");f.classList.remove("bad");void f.offsetWidth;f.classList.add("bad");gate.querySelector(".sbin").focus();return}
  if(navigator.onLine===false){msgKey="off";draw();return}
  busy="n";msgKey="";draw();
  var cl;
  loadLib().then(function(c){cl=c;return c.rpc("name_taken",{n:v})}).then(function(r){
    if(r.error)throw r.error;
    if(r.data===true)throw {taken:true};
    return cl.auth.signInAnonymously({options:{data:{full_name:v}}});
  }).then(function(r){if(r&&r.error)throw r.error}).catch(function(e){
    var t=e&&(e.taken||/name_taken|saving new user/i.test(e.message||""));
    busy=false;msgKey=t?"taken":"err";draw();
    if(t){var f=gate.querySelector(".sbf");f.classList.remove("bad");void f.offsetWidth;f.classList.add("bad")}
  });
}

window.addEventListener("online",function(){if(msgKey==="off")msgKey="";draw()});
window.addEventListener("offline",draw);

window.SatsangAuth={
  ready:function(){return loadLib()},
  user:function(){return loadLib().then(function(c){return c.auth.getSession()}).then(function(r){return r.data.session?r.data.session.user:null})},
  signOut:function(){
    /* બાકી આંકડા મોકલી, કતાર ખાલી કરે જેથી બીજા ભક્તના ખાતામાં ન જાય */
    return Promise.resolve(window.sbFlush?sbFlush():0).catch(function(){}).then(function(){
      if(window.sbClearOutbox)sbClearOutbox();
      mergeDrop();
      return loadLib();
    }).then(function(c){return c.auth.signOut({scope:"local"})});
  },
  isGuest:function(){try{var o=JSON.parse(localStorage.getItem(TOKEN)||"null");return !!(o&&o.user&&o.user.is_anonymous)}catch(e){return false}},
  linkGoogle:function(){
    if(navigator.onLine===false)return Promise.reject(new Error("offline"));
    return Promise.resolve(window.sbFlush?sbFlush():0).catch(function(){}).then(loadLib).then(function(c){
      return c.rpc("guest_merge_start").then(function(r){
        if(r.error)throw r.error;
        localStorage.setItem(MK,JSON.stringify({t:r.data,exp:Date.now()+36e5}));
        return c.auth.linkIdentity({provider:"google",options:{redirectTo:new URL("./",location.href).href}});
      });
    }).then(function(r){if(r&&r.error)throw r.error});
  },
  deleteAccount:function(){
    return loadLib().then(function(c){
      return c.rpc("delete_my_account").then(function(r){
        if(r.error)throw r.error;
        if(window.sbClearOutbox)sbClearOutbox();
        return c.auth.signOut({scope:"local"});
      });
    });
  },
  sendFeedback:function(row){
    row.client_event_id=crypto.randomUUID?crypto.randomUUID():String(Date.now());
    try{row.time_zone=Intl.DateTimeFormat().resolvedOptions().timeZone||null}catch(e){}
    return loadLib().then(function(c){return c.from("feedback").insert(row)}).then(function(r){if(r.error)throw r.error});
  }
};

if(dup&&mergeGet()){
  /* આ Google ખાતું પહેલેથી છે: તેમાં Login કરો, પછી મહેમાનની હિસ્ટ્રી ત્યાં ખસશે */
  history.replaceState(null,"",location.pathname);
  lock();
  loadLib().then(function(c){return c.auth.signInWithOAuth({provider:"google",options:{redirectTo:new URL("./",location.href).href}})}).catch(function(){unlock()});
  return;
}
if(hasSession()&&failed)history.replaceState(null,"",location.pathname);
if(hasSession()&&!returning){
  /* બાકીનું સત્ર ચકાસે. નેટ ન હોય તો સત્ર રહે છે; Supabase એ કાઢી નાખ્યું હોય તો જ લૉગિન પાનું */
  loadLib().then(function(c){return c.auth.getSession()}).then(function(){if(!hasSession())showGate()}).catch(function(){});
  return;
}
showGate();
if(returning){
  busy="g";
  loadLib().then(function(c){return c.auth.getSession()}).then(function(r){
    if(!r.data.session){busy=false;msgKey="err";draw()}
  }).catch(function(){busy=false;msgKey="err";draw()});
}else{
  if(failed)msgKey="err";
  loadLib().catch(function(){});
}
})();
