# Life Hero (life-hero/) — સત્સંગ બોક્સ, ઝોન z4 મજાની રમત

જોડ્યું: 2026-11-23 ~11:55 Adelaide (જૂની `antahshatru-vijay` ની જગ્યાએ). જૂની ગેમનો બેકઅપ: `_backup/antahshatru-vijay-v3.12/`.

## શું છે
દોષો સામે લડો, સદ્ગુણ જીતો — 24 દોષ ↔ 24 સદ્ગુણ, માળ-ટાપુ નકશો, બોસ, કૉમ્બો, દુકાન, સાથી યાન, સિદ્ધિ, રોજનું ઇનામ, સેટિંગ્સ. હાલ લોક-1 (100 સ્ટેજ) રમી શકાય; લોક 2–10 બનાવવાના બાકી.

## ફાઇલો (કોઈ build નથી)
`index.html` (HTML+CSS+ફોન્ટ) · `game.js` (એન્જિન) · `ui.js`, `ui2.js`, `ui_apply.js` (UI) · `audio.js` · `assets.js`, `assets2.js` (ચિત્રો base64, ~3.2 MB).
મૂળ સોર્સ અને નિર્ણયો Claude Project "3. Life Hiro" માં: `claude/START-HERE.md`, `DECISIONS-*.md`, `SOURCE.md`.

## હબ સાથે જોડાણ
- head માં `../oldcss.js`, `../auth.js`, `../box.js`, `../analytics.js`.
- ◀ બટન → `../#z4`. ⚙ ગેમના પોતાના સેટિંગ્સ ખોલે.
- પુણ્ય = ગેમનો સ્કોર જેમનો તેમ: `sbTrack.start({mode:'stage',count})` (ટ્રાયલમાં નહીં), `sbTrack.finish({mode:'stage',count,punya:g.score,mistakes:g.hurtN})`, હારમાં `punya:0`. બધું `window.sbTrack&&` + try/catch.
- `TEST_OPEN=false`: તાજી શરૂઆતે ફક્ત સ્ટેજ 1 ખુલ્લું.
- localStorage કી `lifehero_v2`. ખરીદી/જાહેરાત/Lucky Draw નહીં.
- ભાષા: હાલ ફક્ત ગુજરાતી. 🌐 ગુજરાતી/English/G.a (`SatsangBox.lang()`) બાકી.

## બાકી
1. 🌐 ત્રણ ભાષા. 2. લોક 2 (ચંદ્રલોક) થી આગળ. 3. ફોન-ટેસ્ટ સુધારા. 4. Supabase `game_status`: હરોળ નથી ⇒ ગેમ ચાલુ; બંધ કરવી હોય તો `life-hero` enabled=false.
