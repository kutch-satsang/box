// ===== ક્રિસ્ટલ UI કિટ લગાવવી =====
(function(){
const u=k=>`url(${UI[k]})`;
const css=`
.btn,.cta{background:none!important;box-shadow:none!important;border-style:solid;border-color:transparent;border-width:0 26px;border-image:${u('btnGold')} 0 44 fill / 0 26px stretch;color:#5a2e00;text-shadow:0 1px 0 rgba(255,255,255,.5)}
.btn.sec{border-image:${u('btnPurple')} 0 44 fill / 0 26px stretch;color:#fff;text-shadow:0 1px 2px rgba(40,10,90,.8)}
.cta{height:58px!important}
.hud .b,.side button,#pause{background:${u('icGear')} center/contain no-repeat!important;box-shadow:none!important;color:transparent!important;font-size:0!important;border:0!important;filter:drop-shadow(0 3px 4px rgba(0,0,0,.35))}
.side button{width:50px!important;height:50px!important}
#back{background-image:${u('icBack')}!important}#gear{background-image:${u('icGear')}!important}#cardsB{background-image:${u('icCards')}!important}
#pause{background-image:${u('icPause')}!important;width:44px!important;height:44px!important}
#muteB.on{background-image:${u('icSound')}!important}#muteB.off{background-image:${u('icMute')}!important}
.hud .t{background:none!important;border-style:solid;border-color:transparent;border-width:0 22px;border-image:${u('bubLong')} 0 40 fill / 0 22px stretch;padding:8px 0!important;border-radius:0!important}
.hud .s,.ghud .pill,.hud2 span,#hW{background:none!important;border-style:solid;border-color:transparent;border-width:0 16px;border-image:${u('bubShort')} 0 34 fill / 0 16px stretch;padding:6px 2px!important;border-radius:0!important;display:inline-flex;align-items:center;gap:4px}
.ic{width:18px;height:18px;object-fit:contain;vertical-align:middle}
.ebar .bar{height:16px!important;background:none!important;border:0!important;border-radius:0!important;border-style:solid!important;border-color:transparent!important;border-width:0 12px!important;border-image:${u('barEmpty')} 0 22 fill / 0 12px stretch!important;overflow:visible!important;position:relative}
.ebar .bar i{position:absolute;left:-8px;top:-1px;bottom:-1px;max-width:calc(100% + 16px);background:${u('barFill')} left center/auto 100% no-repeat!important;border-radius:9px;transition:width .2s}
.ebar .bar i.low{filter:hue-rotate(160deg) saturate(1.4)}.ebar .bar i.mid{filter:hue-rotate(200deg)}
.stars img{width:12px;height:12px}.stars img:nth-child(2){margin-top:-4px}
.bigstars img{width:52px;height:52px}.bigstars img:nth-child(2){margin-top:-12px;width:60px;height:60px}
.lockbub .b{background:${u('lockBub')} center/contain no-repeat!important;box-shadow:0 0 22px 8px rgba(160,130,255,.6)!important}.lockbub .b svg{display:none}
input[type=checkbox]{appearance:none;-webkit-appearance:none;width:26px;height:26px;vertical-align:middle;margin-right:6px;background:${u('chkOff')} center/contain no-repeat}
input[type=checkbox]:checked{background-image:${u('chkOn')}}
.face{border:0!important;background:${u('ring')} center/100% 100% no-repeat,#fff3c4!important;padding:4px}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
})();
