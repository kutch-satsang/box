/* Life Hero — ભાષા (g ગુજરાતી · e English · r ગુજરાતી અક્ષરમાં અંગ્રેજી = G.a)
   ભાષા હબની `satsangLang` (SatsangBox.lang()) માંથી આવે; હબ વગર localStorage `satsangLang`, નહીં તો ગુજરાતી.
   રીત: ગેમનું લખાણ ગુજરાતીમાં જ લખેલું રહે; screen પર જતાં પહેલાં (innerHTML / textContent / canvas fillText) trs() બદલે.
   - e : નીચેના EN શબ્દકોશ (લાંબા શબ્દ પહેલાં), ન મળે તો લૅટિન અક્ષરમાં
   - r : બધું ગુજરાતી → લૅટિન અક્ષર (કમ્પ્યુટરથી, કેટલાક શબ્દ સુધારવા પડે)
   નવું લખાણ ઉમેરો તો EN માં તેનો અંગ્રેજી ઉમેરો. */
(function(){
var LANG='g';
try{LANG=(window.SatsangBox&&SatsangBox.lang&&SatsangBox.lang())||localStorage.getItem('satsangLang')||'g'}catch(e){}
if(LANG==='r')LANG='e'; /* ગેમમાં ફક્ત બે ભાષા: ગુજરાતી + English (હબમાં G.a હોય તો અહીં English) */
if(LANG!=='e')LANG='g';
window.LANG=LANG;
window.setLangGame=function(l){try{if(window.SatsangBox&&SatsangBox.set)SatsangBox.set('lang',l);else localStorage.setItem('satsangLang',l)}catch(e){}};

var EN={
/* 24 દોષ → સદ્ગુણ → ટૂંકી શીખ */
'કામ':'Desire','પવિત્રતા':'Purity','મન સાફ રાખો':'Keep your mind clean','પવિત્ર વિચાર કરો':'Think pure thoughts',
'ક્રોધ':'Anger','શાંતિ':'Peace','ગુસ્સો નહીં':'No anger','શાંતિથી બોલો':'Speak calmly',
'લોભ':'Greed','સંતોષ':'Contentment','જે મળ્યું તેમાં સંતોષ રાખો':'Be happy with what you have',
'મોહ':'Attachment','વિવેક':'Wisdom','સાચું':'Right','ખોટું વિચારીને પસંદ કરો':'Think, then choose',
'અહંકાર':'Ego','નમ્રતા':'Humility','હું નહીં':'Not me','આપણે':'We','નમ્ર બનો':'Be humble',
'ઈર્ષ્યા':'Envy','પ્રેમ':'Love','બીજાની ખુશીમાં ખુશ થાઓ':'Be happy for others',
'નિંદા':'Gossip','મીઠી વાણી':'Kind words','કોઈની ખોટી વાત ન કરો':"Don't speak ill of anyone",
'જૂઠ':'Lying','સત્ય':'Truth','હંમેશા સાચું બોલો':'Always speak the truth',
'કપટ':'Trickery','સરળતા':'Simplicity','ચાલાકી નહીં':'No tricks','સીધા':'Straight','સરળ રહો':'Stay simple',
'દંભ':'Pretense','સાચી ભક્તિ':'True devotion','દેખાડો નહીં':'No show-off','દિલથી ભક્તિ':'Devotion from the heart',
'વેર':'Revenge','ક્ષમા':'Forgiveness','માફ કરો':'Forgive','મન હળવું થાય':'Lighten your heart',
'હિંસા':'Violence','દયા':'Kindness','સૌ જીવ પર દયા રાખો':'Be kind to all beings',
'ચોરી':'Stealing','પ્રામાણિકતા':'Honesty','પૂછ્યા વગર કંઈ ન લો':'Take nothing without asking',
'વ્યસન':'Addiction','સંયમ':'Self-control','ખરાબ ટેવ છોડો':'Quit bad habits','સંયમ રાખો':'Stay in control',
'આળસ':'Laziness','પુરુષાર્થ':'Effort','ઊઠો':'Get up','મહેનત કરો':'Work hard',
'સ્વાર્થ':'Selfishness','સેવા':'Service','બીજાની મદદ કરો':'Help others',
'શંકા':'Doubt','શ્રદ્ધા':'Faith','ભગવાન પર ભરોસો રાખો':'Trust in God',
'કુસંગ':'Bad company','સત્સંગ':'Satsang','સારા મિત્રો સાથે રહો':'Stay with good friends',
'મમતા':'Possessiveness','ત્યાગ':'Sacrifice','વહેંચવામાં આનંદ છે':'Sharing brings joy',
'માન':'Pride','નિર્માની':'Humble','વખાણની ભૂખ ન રાખો':"Don't crave praise",
'ભય':'Fear','હિંમત':'Courage','ડરો નહીં':"Don't fear",'હિંમત રાખો':'Be brave',
'ચિંતા':'Worry','ભરોસો':'Trust','ચિંતા છોડો':'Let go of worry','ભરોસો રાખો':'Keep trust',
'નિરાશા':'Despair','આશા':'Hope','ફરી પ્રયત્ન કરો':'Try again','આશા રાખો':'Keep hope',
'કૃતઘ્નતા':'Ingratitude','કૃતજ્ઞતા':'Gratitude','ઉપકાર માનો':'Be thankful','આભાર કહો':'Say thanks',
/* નાના દોષ */
'ઊંઘ':'Sleep','સ્વાદ':'Taste','અધીરાઈ':'Impatience','ઉદાસી':'Sadness','ચિડિયાપણું':'Irritation',
/* લોક */
'લોક':'World','વાદળ':'Cloud','ચંદ્ર':'Moon','મંગળ':'Mars','શનિ':'Saturn','ધૂમકેતુ':'Comet','નક્ષત્ર':'Stars','ગેલેક્સી':'Galaxy','સૂર્ય':'Sun','નિહારિકા':'Nebula','દિવ્ય પ્રકાશ':'Divine Light',
'વાદળલોક':'Cloud','ચંદ્રલોક':'Moon','મંગળલોક':'Mars','શનિલોક':'Saturn','ધૂમકેતુલોક':'Comet','નક્ષત્રલોક':'Star','ગેલેક્સીલોક':'Galaxy','સૂર્યલોક':'Sun','નિહારિકાલોક':'Nebula','દિવ્ય પ્રકાશલોક':'Divine Light World',
/* હથિયાર */
'ગદા':'Mace','બાણ':'Arrow','બરછી':'Spear','ઢાલ':'Shield','શંખ':'Conch','પરશુ':'Axe','ત્રિશૂળ':'Trident','ચુંબક':'Magnet','ધીમો સમય':'Slow time','હૃદય':'Heart',
/* ખાસ સ્ટેજ */
'ખાસ સ્ટેજ':'Special stage','ખાસ':'Special','ટકી રહો':'Survive','સેકન્ડ ટકી રહો':'seconds: survive','દીવા બચાવો':'Save the lamps','દોષને નીચે પહોંચવા ન દો':"Don't let faults reach the bottom",
'ઝડપી દોડ':'Rush','સેકન્ડમાં દોષ હરાવો':'seconds: defeat the faults','હથિયાર':'Weapon','ટ્રાયલ':'Trial','સેકન્ડે નવું હથિયાર':'seconds: new weapon','બધાં અજમાવો':'try them all',
'રત્ન':'Gems','વરસાદ':'Rain','સેકન્ડ':'sec','પડતાં રત્ન પકડો':'catch the falling gems','એક':'One','ઘા':'hit','એક પણ ઘા નહીં':'No hits at all','સાવધાન':'Careful',
'હથિયાર-ટ્રાયલ':'Weapon trial','રત્ન-વરસાદ':'Gem rain','એક-ઘા':'One-hit','દર':'every',
'શાબાશ':'Well done','અદ્ભુત':'Amazing','દિવ્ય':'Divine',
'દોષ':'fault','સ્ટેજ':'Stage','ક્રમ':'Order',
/* નકશો / લોક સ્થિતિ */
'મૂળ યાન':'Original ship','દેખાવ':'Look','સિદ્ધિ':'Achievement','લીધી':'claimed','રોજનું ઇનામ':'Daily reward','ખિતાબ':'Title',
'જાન્યુઆરી':'January','ફેબ્રુઆરી':'February','માર્ચ':'March','એપ્રિલ':'April','મે':'May','જૂન':'June','જુલાઈ':'July','ઑગસ્ટ':'August','સપ્ટેમ્બર':'September','ઑક્ટોબર':'October','નવેમ્બર':'November','ડિસેમ્બર':'December',
'જલ્દી આવશે':'Coming soon','નેટ આવે ત્યારે તારીખ દેખાશે':'Date shows when online','ના રોજ ખૂલશે':'· unlocks','દિવસ':'days','કલાક':'hours','મિનિટ':'min',
'પૂરો કરો':'finish','પછી ખૂલશે':'then it unlocks','તૈયાર થઈ રહ્યો છે':'Getting ready','જલ્દી':'soon',
'પરિણામ માન્ય ન થયું':'result not accepted','સચવાયું':'saved','ખૂલ્યું':'unlocked','ઑફલાઇન':'Offline','બાકી':'pending','સચવાય છે':'saving','નેટ આવે ત્યારે સચવાશે':'will save when online',
'પછી ખુલશે':'then it unlocks','નેટ આવે ત્યારે સ્ટેજ':'When online, stage','ખુલશે':'will unlock',
'નકશો':'Map','દીવો':'Lamp','કમળ':'Lotus','તુલસી':'Tulsi','ઘંટ':'Bell','પુસ્તક':'Book','ઝરણું':'Stream','ફળવૃક્ષ':'Fruit tree','ધજા':'Flag','મંદિર શિખર':'Temple spire','સોનેરી પર્વત':'Golden peak',
'માળ':'Floor','પહેલાં આગળનાં સ્ટેજ જીતો':'Win the earlier stages first','આ રત્ન લઈ લીધું છે':'You already took this gem','હજી બંધ છે':'is still locked',
'પૂરો':'complete','રમો':'Play','બધા લોક પૂરા':'All worlds complete','લોક પસંદ કરો':'Choose a world','બંધ કરો':'Close',
'કાર્ડ':'Cards','સદ્ગુણ મિનાર':'Virtue Tower','હરાવો એટલે ખુલશે':'Defeat it to unlock','આપોઆપ':'Auto',
/* સેટિંગ્સ */
'અવાજ':'Sound','ઓછો':'Low','મધ્યમ':'Medium','મોટો':'Loud','બેકગ્રાઉન્ડ બીટ':'Background beat','ચાલુ':'On','બંધ':'Off',
'યાન':'Ship','ફક્ત દેખાવ':'look only','દુકાનમાંથી મળે':'from the shop','કોઈ નહીં':'None','સાથી યાન':'Companion ships',
'આ સાથી હજી તમારી પાસે નથી':"You don't have this companion yet",'ઉપર ફક્ત નમૂનો':'the preview above is only a sample','દુકાન':'Shop','દબાવો એટલે ઉપર જોવા મળશે':'Tap to see it above',
'દબાવીને ઉપર જુઓ':'tap to preview','રમતમાં હથિયાર ખજાનામાંથી થોડા સમય માટે મળે છે':'In the game, weapons come from treasure for a short time','અહીં ફક્ત જોવા માટે':'Here only for viewing',
'પાછળનું દૃશ્ય':'Background','નવો લોક ખૂલે એટલે નવું ઉમેરાય':'a new one is added when a world opens','દબાવો એટલે ઉપર દેખાશે અને રમતમાં પહેલા સ્ટેજથી એ જ આવશે':'Tap to see it above; it will be used from stage 1',
'દરેક લોકનું પોતાનું':"each world's own",'સેટિંગ્સ':'Settings','દૃશ્ય':'Scene','ટેસ્ટ':'Test','ખૂલે એટલે આ દૃશ્ય ખૂલશે':'unlocks this scene when it opens',
'ભાષા':'Language',
/* શરૂ / સ્ટેજ પહેલાં */
'તમારો હીરો પસંદ કરો':'Choose your hero','શરૂ કરો':'Start','લોકનો મોટો રાક્ષસ':"World's big monster",'બોસ':'Boss','સેકન્ડમાં':'seconds, goal:','દોષ હરાવો':'faults to defeat','નવો દોષ':'New fault','આ સ્ટેજમાં':'This stage',
'બોસ આવ્યો':'Boss is here','મોટો રાક્ષસ':'Big monster','સમય પૂરો':"Time's up",'મોજું':'Wave','દીવો ઓલવાયો':'A lamp went out','દીવા ઓલવાઈ ગયા':'The lamps went out','પૂરું':'Done','એક ઘા લાગ્યો':'You took a hit',
'ઊર્જા':'Energy','સાથી':'Buddy','આવ્યો':'arrived','આવી':'arrived','ફેઝ':'Phase','રાક્ષસ':'Monster','સદ્ગુણ':'Virtue','સે':'s',
'આંગળી ડાબે':'Drag left','જમણે ખેંચો':'right','ચેતવણી':'WARNING','બોસ આવે છે':'Boss is coming','મોટો રાક્ષસ આવે છે':'Big monster is coming',
/* જીત / હાર */
'દીવા બચ્યા':'lamps saved','ત્રણેય દીવા બચાવો':'save all three lamps','રત્ન પકડ્યાં':'gems caught','રત્ન પકડો':'catch gems','સેકન્ડ બાકી રાખીને પૂરું કરો':'seconds left',
'એક પણ ઘા વગર':'without a single hit','સેકન્ડ ટક્યા':'seconds survived','બધાં હથિયાર અજમાવ્યાં':'tried every weapon','રત્ન સચવાયાં':'gems saved','રત્ન પહેલી જીતે જ મળે':'Gems come only on the first win',
'ખજાનો':'Treasure','પુણ્ય':'Punya','નવાં કાર્ડ':'New cards','હીરો':'Hero','દોષ જીત્યા':'faults beaten','થી વધુ રાખો':'or more',
'આગળ':'Next','ઊર્જા પૂરી':'Out of energy','હાર્યા નથી':"You haven't lost",'ફરી બોસ':'Boss again','ફરી ખાસ સ્ટેજ':'Special stage again','થી ફરી':'again',
'વિરામ':'Paused','સિદ્ધિઓ':'Achievements','શક્તિ':'Power','સામાન્ય ઘા':'normal damage',
/* દુકાન */
'ઊર્જા મહત્તમ':'Max energy','સહાયક':'Helper','સમય':'time','અંતર':'range','ચુંબક નથી':'No magnet','નાનું ચુંબક':'Small magnet','મધ્યમ ચુંબક':'Medium magnet','મોટું ચુંબક':'Big magnet',
'શરૂઆતી ઢાલ':'Start shield','ઢાલ નથી':'No shield','તેજ':'Tej','સીધી નાની ગોળી':'small straight shots','કિરણ':'Kiran','ત્રાંસી':'angled','એક ઘા રોકે':'blocks one hit',
'ગોળી':'shot','ગોળી-દર':'Fire rate','ઘા-શક્તિ':'Damage','સહાયક-સમય':'Helper time','ચુંબક-અંતર':'Magnet range','ઢાલ-સાથી':'Shield buddy',
'સોનેરી':'Gold','લીલો':'Green','ગુલાબી':'Pink','વાદળી':'Blue','જાંબલી':'Violet','ચાંદી':'Silver','તારા':'Stars',
'નવો હીરો':'New hero','વિજેતા':'Winner','યોદ્ધા':'Warrior','રક્ષક':'Guardian','દોષ-વિજેતા':'Fault Winner','તેજ-યોદ્ધા':'Tej Warrior','લોક-રક્ષક':'World Guardian',
'આજે':'Today','સ્ટેજ જીતો':'win stages','કરો':'do','વાર મેળવો':'times','એક બોસ હરાવો':'Defeat one boss',
'પહેલી જીત':'First win','પહેલો બોસ':'First boss','મહા':'Great','દીવા બચાવ્યા':'lamps saved','ઘા જીત':'hit win','માળા':'beads','બધાં':'All','પહેલું અપગ્રેડ':'First upgrade','પહેલો સાથી':'First buddy',
'સિદ્ધિ મળી':'Achievement unlocked','પડકાર પૂરો':'Challenge complete','માં ઇનામ લો':'claim your reward',
'અજાણ્યું':'Unknown','સ્તર ખોટું':'Wrong level','મહત્તમ':'Max','મર્યાદા':'limit','પાસે છે':'Owned','સાથી નથી':'No buddy',
'ખરીદી નેટ આવે ત્યારે સચવાશે':'Purchase will save when online','અપગ્રેડ':'Upgrade','કાયમી શક્તિ':'Permanent power','દરેક સ્ટેજમાં કામ આવે':'works in every stage',
'એક વખતે એક સાથી તમારી સાથે ઊડે':'One buddy flies with you at a time','સાથે છે':'With you','પસંદ કરો':'Choose',
'ટ્રાયલ થઈ ગઈ':'Trial used','મફત અજમાવો':'Try free','રમતની શક્તિ પર કોઈ અસર નહીં':'No effect on game power','યાનનો રંગ':'Ship colour',
'અવતાર':'Avatar','ફ્રેમ':'Frame','સાદી':'Plain','મૂળ':'Original','સિદ્ધિથી ખૂલે':'unlocks with achievements','સિદ્ધિથી ખૂલશે':'unlocks with an achievement',
'આગલો લોક ખૂલે એટલે વધુ સ્તર ખૂલશે':'More levels unlock when the next world opens','ઓછા છે':'Not enough','હજી':'still','જોઈએ':'needed',
'સ્તર':'level','નવો દેખાવ':'New look','આ સાથીની ટ્રાયલ થઈ ગઈ':'This buddy trial is used','ઇનામ વગર':'no reward','ટ્રાયલ પૂરી':'Trial over','સાથી કેવો લાગ્યો':'How was the buddy',
'ટ્રાયલમાં':'In trial','માળા મળતાં નથી':'no beads','ખરીદવા':'to buy','તમારી પાસે':'you have','લીધું':'claimed',
'દિવસ સળંગ':'days in a row','રોજ આવો':'come daily','મા દિવસે ખજાનો':'th day: treasure','આજનું ઇનામ લો':"Claim today's reward",'આજનું ઇનામ લીધું':"Today's reward claimed",'કાલે ફરી આવો':'come back tomorrow',
'આજનો પડકાર':"Today's challenge",'ઇનામ':'Reward','ઇનામ લીધું':'Reward claimed','પડકારનું ઇનામ લો':'Claim challenge reward','લો':'Claim',
'ગરુડ':'Garud','મોર':'Mor','હંસ':'Hans','વાહ':'Wow',
'નેટ નથી':'No net','પરિણામ ફોનમાં સચવાયાં છે':'results are saved on the phone','મોકલું છું':'Sending','બધું સચવાયેલું છે':'Everything is saved',
'ઘા':'hit'
};


/* ટૂંકાં અંગ્રેજી નામ (ઓવરરાઇડ) */
Object.assign(EN,{'કામ':'Desire','ક્રોધ':'Anger','લોભ':'Greed','મોહ':'Illusion','અહંકાર':'Ego','ઈર્ષ્યા':'Envy','નિંદા':'Gossip','જૂઠ':'Lies','કપટ':'Deceit','દંભ':'Show-off','વેર':'Revenge','હિંસા':'Harm','ચોરી':'Theft','વ્યસન':'Habit','આળસ':'Lazy','સ્વાર્થ':'Selfish','શંકા':'Doubt','કુસંગ':'Bad friends','મમતા':'Clinging','માન':'Pride','ભય':'Fear','ચિંતા':'Worry','નિરાશા':'Despair','કૃતઘ્નતા':'Ungrateful',
'પવિત્રતા':'Purity','શાંતિ':'Peace','સંતોષ':'Content','વિવેક':'Wisdom','નમ્રતા':'Humble','પ્રેમ':'Love','મીઠી વાણી':'Sweet words','સત્ય':'Truth','સરળતા':'Simple','સાચી ભક્તિ':'Devotion','ક્ષમા':'Forgive','દયા':'Kind','પ્રામાણિકતા':'Honest','સંયમ':'Control','પુરુષાર્થ':'Effort','સેવા':'Service','શ્રદ્ધા':'Faith','સત્સંગ':'Satsang','ત્યાગ':'Giving','નિર્માની':'Modest','હિંમત':'Courage','ભરોસો':'Trust','આશા':'Hope','કૃતજ્ઞતા':'Thanks','ધીરજ':'Patience','ઉત્સાહ':'Energy','આનંદ':'Joy','પ્રસન્નતા':'Cheer','દાન':'Giving',
'આંગળી ડાબે-જમણે ખેંચો':'Drag left-right'});
/* લૅટિન અક્ષરમાં (r) અને ન મળતા શબ્દ માટે */
var CONS={'ક':'k','ખ':'kh','ગ':'g','ઘ':'gh','ઙ':'ng','ચ':'ch','છ':'chh','જ':'j','ઝ':'jh','ઞ':'ny','ટ':'t','ઠ':'th','ડ':'d','ઢ':'dh','ણ':'n','ત':'t','થ':'th','દ':'d','ધ':'dh','ન':'n','પ':'p','ફ':'f','બ':'b','ભ':'bh','મ':'m','ય':'y','ર':'r','લ':'l','વ':'v','શ':'sh','ષ':'sh','સ':'s','હ':'h','ળ':'l','ક્ષ':'ksh','જ્ઞ':'gn'};
var VOW={'અ':'a','આ':'aa','ઇ':'i','ઈ':'i','ઉ':'u','ઊ':'u','ઋ':'ru','એ':'e','ઐ':'ai','ઓ':'o','ઔ':'au','ઍ':'e','ઑ':'o'};
var MAT={'ા':'a','િ':'i','ી':'i','ુ':'u','ૂ':'u','ૃ':'ru','ે':'e','ૈ':'ai','ો':'o','ૌ':'au','ૅ':'e','ૉ':'o'};
var DIG='૦૧૨૩૪૫૬૭૮૯';
function translit(w){
  var out='',i=0,n=w.length;
  while(i<n){
    var c=w[i],nx=w[i+1];
    if(CONS[c]!==undefined){
      var r=CONS[c];
      if(nx==='્'&&w[i+2]==='ષ'&&c==='ક'){r='ksh';i+=2}
      else if(nx==='્'&&w[i+2]==='ઞ'&&c==='જ'){r='gn';i+=2}
      var m=w[i+1];
      if(m==='્'){out+=r;i+=2;continue}                    // સંયુક્ત — સ્વર વગર
      if(MAT[m]!==undefined){out+=r+MAT[m];i+=2;continue}
      out+=r+'a';i++;                                     // અંતર્ગત 'a'
      continue}
    if(VOW[c]!==undefined){out+=VOW[c];i++;continue}
    if(c==='ં'||c==='ઁ'){out+='n';i++;continue}
    if(c==='ઃ'){out+='h';i++;continue}
    if(DIG.indexOf(c)>=0){out+=DIG.indexOf(c);i++;continue}
    if(c==='‍'||c==='‌'||c==='઼'||c==='ઽ'){i++;continue}
    out+=c;i++}
  // શબ્દના અંતે 'a' કાઢો (ટૂંકા શબ્દ સિવાય)
  if(out.length>3&&/[^aeiou]a$/.test(out))out=out.slice(0,-1);
  return out}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}

var keys=Object.keys(EN).sort(function(a,b){return b.length-a.length});
function esc(s){return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}
var GU='\\u0A80-\\u0AFF\\u200d\\u200c';
var RE_E=new RegExp('(?<![%s])(?:'.replace('%s',GU)+keys.map(esc).join('|')+')(?![%s])'.replace('%s',GU)+'|['+GU+']+','g');
var RE_R=new RegExp('['+GU+']+','g');
var HAS=/[઀-૿]/;
var cacheE={},cacheR={};
function trs(s){
  if(LANG==='g'||typeof s!=='string'||!HAS.test(s))return s;
  if(LANG==='e')return s.replace(RE_E,function(m){var v=EN[m];return v!==undefined?v:cap(translit(m))});
  return s.replace(RE_R,function(m){return cap(translit(m))})}
window.trs=trs;
window.T=function(gu,en){return LANG==='e'&&en!==undefined?en:gu};

if(LANG!=='g'){
  // DOM લખાણ
  var iH=Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML');
  Object.defineProperty(Element.prototype,'innerHTML',{configurable:true,get:iH.get,set:function(v){iH.set.call(this,typeof v==='string'?trs(v):v)}});
  var tC=Object.getOwnPropertyDescriptor(Node.prototype,'textContent');
  Object.defineProperty(Node.prototype,'textContent',{configurable:true,get:tC.get,set:function(v){tC.set.call(this,typeof v==='string'?trs(v):v)}});
  var iA=Element.prototype.insertAdjacentHTML;
  Element.prototype.insertAdjacentHTML=function(p,h){return iA.call(this,p,typeof h==='string'?trs(h):h)};
  // canvas લખાણ
  var CP=window.CanvasRenderingContext2D&&CanvasRenderingContext2D.prototype;
  if(CP){['fillText','strokeText'].forEach(function(f){var o=CP[f];CP[f]=function(t,x,y,w){return w===undefined?o.call(this,trs(String(t)),x,y):o.call(this,trs(String(t)),x,y,w)}});
    var mt=CP.measureText;CP.measureText=function(t){return mt.call(this,trs(String(t)))}}
  // HTML માં સીધું લખેલું લખાણ
  var walk=function(){var w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),n;while(n=w.nextNode()){if(HAS.test(n.nodeValue))n.nodeValue=trs(n.nodeValue)}
    document.querySelectorAll('[title],[aria-label],[placeholder]').forEach(function(e){['title','aria-label','placeholder'].forEach(function(a){var v=e.getAttribute(a);if(v&&HAS.test(v))e.setAttribute(a,trs(v))})})};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',walk);else walk();
  try{document.documentElement.lang=LANG==='e'?'en':'gu-Latn'}catch(e){}
}
})();
