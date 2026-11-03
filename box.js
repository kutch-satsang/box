/* સત્સંગ બોક્સ — સહિયારી સેટિંગ ફાઇલ (box.js)
   હબ Settings પેજ આ વાંચે-લખે. ગેમ માં એક લીટી જોડવાથી ગેમ આ જ સેટિંગ લે:
   <script src="../box.js"></script>
   પછી: SatsangBox.sound() , SatsangBox.time() , SatsangBox.theme() , SatsangBox.lang()
   ફોનમાં સચવાતી ચાવીઓ: satsangLang (g/e/r), satsangSound (1/0), satsangTime (સેકન્ડ), satsangTheme (mati = આધ્યાત્મિક/માટી, kaach = ક્લાસિક/કાચ) */
(function(){
var VERSION="v1 · 2026-11-02";
var KEYS={lang:"satsangLang",sound:"satsangSound",time:"satsangTime",theme:"satsangTheme"};
var DEF={lang:"g",sound:"1",time:"30",theme:"mati"};
var OK={lang:["g","e","r"],sound:["1","0"],time:["15","30","45","60","90"],theme:["mati","kaach"]};
var subs=[];
function get(k){var v=null;try{v=localStorage.getItem(KEYS[k])}catch(e){}return OK[k].indexOf(v)>=0?v:DEF[k]}
function set(k,v){v=String(v);if(OK[k].indexOf(v)<0)return false;try{localStorage.setItem(KEYS[k],v)}catch(e){}fire(k,v);return true}
function fire(k,v){subs.forEach(function(f){try{f(k,v)}catch(e){}})}
function reset(){["sound","time","theme"].forEach(function(k){try{localStorage.removeItem(KEYS[k])}catch(e){}fire(k,DEF[k])})}
window.addEventListener("storage",function(e){for(var k in KEYS)if(KEYS[k]===e.key)fire(k,get(k))});
window.SatsangBox={
  version:VERSION,keys:KEYS,defaults:DEF,options:OK,
  get:get,set:set,reset:reset,
  lang:function(){return get("lang")},
  sound:function(){return get("sound")==="1"},
  time:function(){return parseInt(get("time"),10)},
  theme:function(){return get("theme")},
  onChange:function(f){subs.push(f)}
};
})();
