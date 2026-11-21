/* ચિહ્ન ચેમ્પ — ભાષા (હબની ભાષા: g ગુજરાતી, e English, r ABC = અંગ્રેજી અક્ષરમાં ગુજરાતી)
   બધાં પાનાં વાપરે: CHL.L(), CHL.cn(id, ગુજરાતી નામ), CHL.t(g, e, r) */
(function(){
function L(){try{return window.SatsangBox?SatsangBox.lang():(localStorage.getItem('satsangLang')||'g')}catch(e){return 'g'}}
/* ચિહ્નનાં નામ: English અને ABC બંનેમાં એ જ નામ (નામનો અનુવાદ નહીં) */
var CN={swastik:'Swastik',ashtakon:'Ashtakon',ankush:'Ankush',kamal:'Kamal',ketu:'Dhwaj','urdhva-rekha':'Urdhvarekha',vajra:'Vajra',jambu:'Jambu',java:'Jav',matsya:'Matsya',trikon:'Trikon',gaupad:'Gopad',dhanush:'Dhanush',vyom:'Vyom','ardha-chandra':'Ardhachandra',kalash:'Kalash'};
function cn(id,g){return L()==='g'?g:(CN[id]||g)}
/* ABC માં પણ ગેમના શબ્દો English (બાળકો Play Store ની ગેમોથી ઓળખે છે); ફક્ત પ્રશ્ન/વાર્તા માટે ABC જોઈએ તો CHL.abc(g,e,r) */
function t(g,e,r){return L()==='g'?g:e}
function abc(g,e,r){var l=L();return l==='e'?e:l==='r'?(r==null?e:r):g}
document.documentElement.lang=L()==='g'?'gu':'en';
window.CHL={L:L,cn:cn,t:t,abc:abc,CN:CN};
})();
