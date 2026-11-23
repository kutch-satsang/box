// ================= સંગીત અને અવાજ (WebAudio, કોઈ ફાઇલ નહીં) =================
const AU={ctx:null,master:null,mus:null,sfx:null,mode:null,timer:0,step:0,next:0,drone:[],noiseBuf:null,shotN:0};
const NOTE=m=>440*Math.pow(2,(m-69)/12);
// આર્કેડ ગેમ-સાઉન્ડ: બાસ + ડ્રમ + 8-બિટ આર્પેજિયો (ધૂન નહીં)
const PROG={map:[[57,60,64],[53,57,60],[55,59,62],[52,55,59]],game:[[57,60,64],[53,57,60],[48,52,55],[55,59,62]],boss:[[50,53,57],[50,53,57],[46,50,53],[49,52,56]]};
const TEMPO={map:96,game:140,boss:156};
function auInit(){if(AU.ctx)return;try{const C=window.AudioContext||window.webkitAudioContext;AU.ctx=new C()}catch(e){return}
  const c=AU.ctx;AU.master=c.createGain();AU.master.gain.value=.9;AU.master.connect(c.destination);
  AU.mus=c.createGain();AU.mus.gain.value=P.music===false?0:[.3,.55,.8][P.vol==null?1:P.vol];AU.mus.connect(AU.master);
  AU.sfx=c.createGain();AU.sfx.gain.value=P.sfx===false?0:[.35,.8,1][P.vol==null?1:P.vol];AU.sfx.connect(AU.master);
  const n=c.sampleRate*.5,b=c.createBuffer(1,n,c.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;AU.noiseBuf=b;
  AU.timer=setInterval(auTick,40);
  document.addEventListener('visibilitychange',()=>{if(!AU.ctx)return;document.hidden?AU.ctx.suspend():AU.ctx.resume()})}
function auResume(){auInit();if(AU.ctx&&AU.ctx.state!=='running')AU.ctx.resume()}
function env(g,t,a,peak,d){g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(peak,t+a);g.gain.exponentialRampToValueAtTime(0.0001,t+a+d)}
function osc(type,f,t,dur,peak,dest,a){const c=AU.ctx,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.setValueAtTime(f,t);env(g,t,a||.01,peak,dur);o.connect(g);g.connect(dest);o.start(t);o.stop(t+(a||.01)+dur+.05);return o}
function noise(t,dur,peak,freq,q,dest){const c=AU.ctx,s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=AU.noiseBuf;f.type='bandpass';f.frequency.value=freq;f.Q.value=q||1;env(g,t,.005,peak,dur);s.connect(f);f.connect(g);g.connect(dest);s.start(t);s.stop(t+dur+.05)}
// --- બેકગ્રાઉન્ડ બીટ ---
function chip(f,t,dur,peak,type){const c=AU.ctx,o=c.createOscillator(),g=c.createGain();o.type=type||'square';o.frequency.value=f;env(g,t,.004,peak,dur);o.connect(g);g.connect(AU.mus);o.start(t);o.stop(t+dur+.05)}
function kick(t,v){const o=osc('sine',150,t,.22,v,AU.mus,.002);o.frequency.exponentialRampToValueAtTime(42,t+.18)}
function snare(t,v){noise(t,.14,v,1800,.8,AU.mus);osc('triangle',190,t,.08,v*.5,AU.mus,.002)}
function hat(t,v){noise(t,.025,v,8000,1.5,AU.mus)}
function startDrone(){}function stopDrone(){}
function setMusic(mode){auInit();if(!AU.ctx||AU.mode===mode)return;AU.mode=mode;AU.step=0;AU.next=AU.ctx.currentTime+.1}
function auTick(){if(!AU.ctx||!AU.mode||AU.ctx.state!=='running')return;const c=AU.ctx,spb=60/TEMPO[AU.mode]/4,M=AU.mode;
  while(AU.next<c.currentTime+.15){const st=AU.step%16,bar=Math.floor(AU.step/16),ch=PROG[M][bar%4],t=AU.next;
    if(M==='map'){ // નકશો: હળવો, શાંત બીટ
      if(st%8===0)kick(t,.22); if(st%4===2)hat(t,.03);
      if(st%4===0)chip(NOTE(ch[0]-12),t,spb*3.5,.05,'triangle');
      if(st%2===0)chip(NOTE(ch[(st/2)%3]+12),t,spb*.9,.022,'square');
    }else{ // રમત / બોસ: ઝડપી ઊર્જાવાળો બીટ
      if(st%4===0)kick(t,.38); if(st===4||st===12)snare(t,.16); if(st%2===1)hat(t,M==='boss'?.05:.035);
      if(M==='boss'&&(st===10||st===14))kick(t,.28);
      chip(NOTE(ch[0]-24+(st%2?12:0)),t,spb*.9,.07,'sawtooth');
      chip(NOTE(ch[st%3]+12+(st>=8?12:0)),t,spb*.7,.028,'square');
    }
    AU.step++;AU.next+=spb}}
// --- અવાજ (SFX) ---
const SFX={
 shoot(){if(!AU.ctx)return;const t=AU.ctx.currentTime;if(AU.lastShot&&t-AU.lastShot<.11)return;AU.lastShot=t; // ક્લાસિક "પ્યૂ" લેસર
   const o=osc('square',1900,t,.09,.03,AU.sfx,.002);o.frequency.exponentialRampToValueAtTime(260,t+.09)},
 hit(){if(!AU.ctx)return;const t=AU.ctx.currentTime;if(AU.lastHit&&t-AU.lastHit<.05)return;AU.lastHit=t;osc('square',420,t,.03,.035,AU.sfx,.001).frequency.exponentialRampToValueAtTime(200,t+.03)},
 burst(big){if(!AU.ctx)return;const c=AU.ctx,t=c.currentTime,d=big?.9:.45; // ક્લાસિક ધડાકો "ભૂમ"
   const s=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();s.buffer=AU.noiseBuf;s.loop=true;f.type='lowpass';f.frequency.setValueAtTime(big?2400:3200,t);f.frequency.exponentialRampToValueAtTime(120,t+d);
   g.gain.setValueAtTime(big?.75:.45,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(f);f.connect(g);g.connect(AU.sfx);s.start(t);s.stop(t+d+.05);
   const o=osc('sine',big?110:170,t,d*.8,big?.6:.35,AU.sfx,.002);o.frequency.exponentialRampToValueAtTime(35,t+d*.8);
   if(big)[.12,.28].forEach(x=>noise(t+x,.4,.35,600,.7,AU.sfx))},
 catch_(){if(!AU.ctx)return;const t=AU.ctx.currentTime;osc('square',NOTE(88),t,.06,.07,AU.sfx);osc('square',NOTE(93),t+.06,.18,.07,AU.sfx)},
 wrong(){if(!AU.ctx)return;const t=AU.ctx.currentTime;osc('triangle',320,t,.4,.2,AU.sfx).frequency.exponentialRampToValueAtTime(140,t+.4)},
 hurt(){if(!AU.ctx)return;const t=AU.ctx.currentTime;noise(t,.2,.3,300,1,AU.sfx);osc('sawtooth',120,t,.2,.12,AU.sfx).frequency.exponentialRampToValueAtTime(60,t+.2)},
 power(){if(!AU.ctx)return;const t=AU.ctx.currentTime;const o=osc('square',300,t,.35,.08,AU.sfx);o.frequency.exponentialRampToValueAtTime(1600,t+.35);[84,88,91,96].forEach((m,i)=>osc('square',NOTE(m),t+.3+i*.05,.07,.05,AU.sfx))},
 shankh(){if(!AU.ctx)return;const c=AU.ctx,t=c.currentTime,o=c.createOscillator(),o2=c.createOscillator(),f=c.createBiquadFilter(),g=c.createGain();
   o.type='sawtooth';o2.type='sawtooth';o.frequency.setValueAtTime(220,t);o.frequency.linearRampToValueAtTime(233,t+.6);o2.frequency.value=221.5;f.type='lowpass';f.frequency.setValueAtTime(300,t);f.frequency.linearRampToValueAtTime(1500,t+.5);f.Q.value=4;
   g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.3,t+.3);g.gain.setValueAtTime(.3,t+1);g.gain.exponentialRampToValueAtTime(.0001,t+1.6);
   o.connect(f);o2.connect(f);f.connect(g);g.connect(AU.sfx);[o,o2].forEach(x=>{x.start(t);x.stop(t+1.7)})},
 phase(){if(!AU.ctx)return;const t=AU.ctx.currentTime;[0,.18,.36].forEach(d=>{osc('sine',70,t+d,.35,.5,AU.sfx,.004);noise(t+d,.15,.2,200,1,AU.sfx)})},
 win(){if(!AU.ctx)return;const t=AU.ctx.currentTime;[72,76,79,84,79,84,88].forEach((m,i)=>osc('square',NOTE(m),t+i*.1,i===6?.6:.09,.08,AU.sfx));[48,55,60].forEach((m,i)=>osc('triangle',NOTE(m),t+i*.2,.25,.15,AU.sfx))},
 lose(){if(!AU.ctx)return;const t=AU.ctx.currentTime;[64,63,62,61].forEach((m,i)=>osc('square',NOTE(m),t+i*.22,i===3?.7:.18,.09,AU.sfx))},
 tap(){if(!AU.ctx)return;const t=AU.ctx.currentTime;osc('sine',880,t,.08,.08,AU.sfx)},
 combo(lv){if(!AU.ctx)return;const t=AU.ctx.currentTime;const base=[76,79,84][lv]||76; // ચડતો "ટિંગ-ટિંગ-ટિંગ"
   [0,4,7,12].concat(lv===2?[16,19]:[]).forEach((m,i)=>osc('square',NOTE(base+m),t+i*.055,.09,.06,AU.sfx));
   if(lv===2){noise(t,.5,.12,6000,.6,AU.sfx);osc('triangle',NOTE(base-12),t,.5,.12,AU.sfx)}},
 siren(){if(!AU.ctx)return;const c=AU.ctx,t=c.currentTime,D=2.4; // બોસ-ચેતવણી: ઊંચો-નીચો સાયરન
   const o=c.createOscillator(),o2=c.createOscillator(),f=c.createBiquadFilter(),g=c.createGain();o.type='sawtooth';o2.type='square';
   for(let i=0;i<4;i++){const a=t+i*.6;o.frequency.setValueAtTime(520,a);o.frequency.linearRampToValueAtTime(880,a+.3);o.frequency.linearRampToValueAtTime(520,a+.6)}
   o2.frequency.value=55;f.type='lowpass';f.frequency.value=2200;
   g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.16,t+.08);g.gain.setValueAtTime(.16,t+D-.2);g.gain.exponentialRampToValueAtTime(.0001,t+D);
   const g2=c.createGain();g2.gain.value=.25;o2.connect(g2);g2.connect(g);o.connect(f);f.connect(g);g.connect(AU.sfx);[o,o2].forEach(x=>{x.start(t);x.stop(t+D+.05)});
   [0,.6,1.2,1.8].forEach(d=>osc('sine',60,t+d,.25,.35,AU.sfx,.004))}};
function setVol(){if(!AU.ctx)return;AU.mus.gain.value=P.music===false?0:[.3,.55,.8][P.vol==null?1:P.vol];AU.sfx.gain.value=P.sfx===false?0:[.35,.8,1][P.vol==null?1:P.vol]}
