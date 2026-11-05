/* સત્સંગ બોક્સ — જૂના ફોન માટે: Chrome 108 થી જૂના બ્રાઉઝરમાં dvh / cqw ચાલતું નથી,
   એટલે હબ ખાલી દેખાય. અહીં એ માપ ફોનનાં સાચાં માપથી બદલાય. નવા ફોનમાં આ ફાઇલ કંઈ કરતી નથી. */
(function(){
var C=window.CSS;
if(C&&C.supports&&C.supports("width","1cqw")&&C.supports("height","1dvh"))return;
var R=document.documentElement,sel=[];
function fix(t){
  return t.replace(/url\(["']?data:[^)]*\)|(-?\d*\.?\d+)(cq[wi]|[dsl]vh|[dsl]vw)\b/g,function(m,n,u){
    if(!u)return m;
    if(u.charAt(0)==="c")return "calc("+n+"*var(--cq,1vw))";
    return u.slice(-1)==="h"?"calc("+n+"*var(--dv,1vh))":n+"vw";
  });
}
window.sbOld=fix;
function sheet(s){
  if(s.dataset.oc)return;s.dataset.oc="1";
  var t=s.textContent,m,re=/([^{}]+)\{[^{}]*container-type:\s*inline-size/g;
  while((m=re.exec(t)))if(sel.indexOf(m[1].trim())<0)sel.push(m[1].trim());
  var n=fix(t);if(n!==t)s.textContent=n;
}
function attr(e){var v=e.getAttribute("style");if(v&&/cq[wi]|[dsl]v[hw]/.test(v)){var n=fix(v);if(n!==v)e.setAttribute("style",n)}}
function size(){
  R.style.setProperty("--dv",innerHeight/100+"px");
  sel.forEach(function(q){try{[].forEach.call(document.querySelectorAll(q),function(e){if(e.clientWidth)e.style.setProperty("--cq",e.clientWidth/100+"px")})}catch(x){}});
}
function scan(n){
  if(n.nodeType!==1)return;
  if(n.tagName==="STYLE")sheet(n);
  attr(n);
  [].forEach.call(n.querySelectorAll("style"),sheet);
  [].forEach.call(n.querySelectorAll("[style]"),attr);
}
scan(R);size();
new MutationObserver(function(l){l.forEach(function(m){[].forEach.call(m.addedNodes,scan)});size()}).observe(R,{childList:true,subtree:true});
addEventListener("resize",size);addEventListener("load",size);document.addEventListener("DOMContentLoaded",function(){scan(R);size()});
})();
