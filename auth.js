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
 g:{sub:"રમો અને શીખો",btn:"Google થી લૉગિન કરો",note:"એક વાર લૉગિન કર્યા પછી નેટ વગર પણ રમી શકાશે.",busy:"લૉગિન થાય છે…",off:"પહેલી વાર લૉગિન માટે ઇન્ટરનેટ જોઈએ.",err:"લૉગિન ન થયું. ફરી પ્રયત્ન કરો.",wv:"આ પાનું Chrome કે Safari માં ખોલો, નહીંતર Google લૉગિન નહીં થાય."},
 e:{sub:"Play and learn",btn:"Continue with Google",note:"After one login you can play without internet.",busy:"Signing in…",off:"The first login needs internet.",err:"Login failed. Please try again.",wv:"Open this page in Chrome or Safari. Google login will not work here."},
 r:{sub:"Ramo ane shikho",btn:"Google thi login karo",note:"Ek vaar login karya pachhi net vagar pan rami shakashe.",busy:"Login thay chhe…",off:"Paheli vaar login mate internet joie.",err:"Login na thayu. Fari prayatna karo.",wv:"Aa panu Chrome ke Safari ma kholo, nahintar Google login nahi thay."}
};
var NAME={g:"સત્સંગ બોક્સ",e:"Satsang Box",r:"Satsang Box"};
var LB={g:"G",e:"E",r:"G.a"};
var q=location.search;
var returning=/[?&]code=/.test(q);
var failed=/[?&]error/.test(q)||/error_description=/.test(location.hash);
var client=null,gate=null,loading=null,busy=false,msgKey="";

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
".sbo{display:block;width:104px;height:104px;object-fit:contain;margin:0 auto 8px}"+
".sbt{margin:0;font:700 31px/1.2 'Baloo Bhai 2','Noto Serif Gujarati',serif;letter-spacing:0}"+
".sbs{margin:2px 0 20px;font-size:15px;color:#7b5a3a}#sbGate.cl .sbs,#sbGate.cl .sbn{color:#5f6b7f}"+
".sbg{display:flex;align-items:center;justify-content:center;gap:10px;width:100%;min-height:52px;padding:8px 14px;border:1px solid #dadce0;border-radius:26px;background:#fff;color:#2b2b2b;font:600 16px/1.2 'Hind Vadodara','Noto Sans Gujarati',sans-serif;cursor:pointer;box-shadow:0 3px 8px rgba(90,60,30,.2);-webkit-tap-highlight-color:transparent}"+
".sbg:active{transform:translateY(1px)}.sbg:disabled{opacity:.6;cursor:default}.sbg svg{flex:none;width:20px;height:20px}"+
".sbn{min-height:40px;margin:12px 0 10px;font-size:13px;line-height:1.45;color:#7b5a3a}.sbn.bad{color:#a4371c;font-weight:600}"+
".sbl-row{display:inline-flex;gap:2px;padding:3px;border-radius:18px;background:rgba(120,80,40,.1)}"+
".sbl-row button{min-width:46px;min-height:36px;padding:0 10px;border:0;border-radius:15px;background:none;color:inherit;font:600 13px 'Hind Vadodara',sans-serif;cursor:pointer}"+
".sbl-row button.on{background:#e8845f;color:#fff}";
(document.head||root).appendChild(css);

function draw(){
  if(!gate||!document.body)return;
  var l=lang(),t=T[l],note=gate.querySelector(".sbn"),btn=gate.querySelector(".sbg");
  gate.querySelector(".sbt").textContent=NAME[l];
  gate.querySelector(".sbs").textContent=t.sub;
  gate.querySelector(".sbgt").textContent=busy?t.busy:t.btn;
  btn.disabled=busy;
  var k=msgKey||(webview()?"wv":(navigator.onLine===false?"off":"note"));
  note.textContent=t[k];note.classList.toggle("bad",k!=="note");
  [].forEach.call(gate.querySelectorAll(".sbl-row button"),function(b){b.classList.toggle("on",b.getAttribute("data-l")===l)});
}
function buildGate(){
  if(gate)return;
  gate=document.createElement("div");gate.id="sbGate";if(classic())gate.className="cl";
  gate.setAttribute("role","dialog");gate.setAttribute("aria-modal","true");
  gate.innerHTML='<div class="sbc"><img class="sbo" src="themes/adhyatmik/mati/om.webp" alt=""><h1 class="sbt"></h1><p class="sbs"></p>'+
   '<button class="sbg" type="button"><svg viewBox="0 0 48 48" aria-hidden="true"><path fill="#EA4335" d="M24 9.5c3.5 0 6.7 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.2C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.9 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.9c-.6 3-2.3 5.5-4.8 7.2l7.7 6c4.5-4.2 7.1-10.3 7.1-17.7z"/><path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.2C1 16.5 0 20.1 0 24s1 7.5 2.6 10.8l7.9-6.2z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.8-5.8l-7.7-6c-2.1 1.4-4.9 2.3-8.1 2.3-6.3 0-11.6-4.2-13.5-9.9l-7.9 6.2C6.5 42.6 14.6 48 24 48z"/></svg><span class="sbgt"></span></button>'+
   '<p class="sbn"></p><div class="sbl-row">'+["g","e","r"].map(function(k){return '<button type="button" data-l="'+k+'">'+LB[k]+"</button>"}).join("")+"</div></div>";
  gate.querySelector(".sbg").addEventListener("click",login);
  gate.querySelector(".sbl-row").addEventListener("click",function(e){
    var k=e.target.getAttribute("data-l");if(!k)return;
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
      if(s)setTimeout(function(){busy=false;msgKey="";unlock()},0);
      else if(ev==="SIGNED_OUT")setTimeout(function(){busy=false;showGate();draw()},0);
    });
    return client;
  });
  return loading;
}
function login(){
  if(busy)return;
  if(navigator.onLine===false){msgKey="off";draw();return}
  busy=true;msgKey="";draw();
  loadLib().then(function(c){
    return c.auth.signInWithOAuth({provider:"google",options:{redirectTo:new URL("./",location.href).href}});
  }).then(function(r){if(r&&r.error)throw r.error}).catch(function(){busy=false;msgKey="err";draw()});
}

window.addEventListener("online",function(){if(msgKey==="off")msgKey="";draw()});
window.addEventListener("offline",draw);

window.SatsangAuth={
  ready:function(){return loadLib()},
  user:function(){return loadLib().then(function(c){return c.auth.getSession()}).then(function(r){return r.data.session?r.data.session.user:null})},
  signOut:function(){return loadLib().then(function(c){return c.auth.signOut({scope:"local"})})}
};

if(hasSession()&&!returning){
  /* બાકીનું સત્ર ચકાસે. નેટ ન હોય તો સત્ર રહે છે; Supabase એ કાઢી નાખ્યું હોય તો જ લૉગિન પાનું */
  loadLib().then(function(c){return c.auth.getSession()}).then(function(){if(!hasSession())showGate()}).catch(function(){});
  return;
}
showGate();
if(returning){
  busy=true;
  loadLib().then(function(c){return c.auth.getSession()}).then(function(r){
    if(!r.data.session){busy=false;msgKey="err";draw()}
  }).catch(function(){busy=false;msgKey="err";draw()});
}else{
  if(failed)msgKey="err";
  loadLib().catch(function(){});
}
})();
