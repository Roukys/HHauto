// ==UserScript==
// @name         HaremHeroes Automatic++
// @namespace    https://github.com/Roukys/HHauto
// @version      6.6.1
// @description  Open the menu in HaremHeroes(topright) to toggle AutoControlls. Supports AutoSalary, AutoContest, AutoMission, AutoQuest, AutoTrollBattle, AutoArenaBattle and AutoPachinko(Free), AutoLeagues, AutoChampions and AutoStatUpgrades. Messages are printed in local console.
// @author       JD and Dorten(a bit), Roukys, cossname, YotoTheOne, CLSchwab, deuxge, react31, PrimusVox, OldRon1977, tsokh, UncleBob800
// @match        http*://*.haremheroes.com/*
// @match        http*://*.hentaiheroes.com/*
// @match        http*://*.gayharem.com/*
// @match        http*://*.comixharem.com/*
// @match        http*://*.hornyheroes.com/*
// @match        http*://*.pornstarharem.com/*
// @match        http*://*.transpornstarharem.com/*
// @match        http*://*.mangarpg.com/*
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM.openInTab
// @license      MIT
// @updateURL    https://github.com/Roukys/HHauto/raw/main/HHAuto.user.js
// @downloadURL  https://github.com/Roukys/HHauto/raw/main/HHAuto.user.js
// ==/UserScript==

// WARNING: This file has been generated, DO NOT EDIT.

//CSS Region
GM_addStyle('.HHAutoScriptMenu .switch { position: relative; display: inline-block; width: 34px; height: 20px; top:0 }/* The switch - the box around the slider */ '
            +'.HHAutoScriptMenu .switch input { display:none } /* Hide default HTML checkbox */ '
            +'.HHAutoScriptMenu .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; -webkit-transition: .4s; transition: .4s; margin-right: 4px; } /* The slider */'
            +'.HHAutoScriptMenu .slider.round:before { position: absolute; content: ""; height: 14px; width: 14px; left: 3px; bottom: 3px; background-color: white; -webkit-transition: .4s; transition: .4s; } '
            +'.HHAutoScriptMenu input:checked + .slider { background-color: #2196F3; } '
            +'.HHAutoScriptMenu input:focus + .slider { box-shadow: 0 0 1px #2196F3; } '
            +'.HHAutoScriptMenu input:checked + .slider:before { -webkit-transform: translateX(10px); -ms-transform: translateX(10px); transform: translateX(10px); } '
            +'.HHAutoScriptMenu .slider.round { border-radius: 14px; }/* Rounded sliders */ '
            +'.HHAutoScriptMenu .slider.round:before { border-radius: 50%; }');
GM_addStyle('.HHAutoScriptMenu input:checked + .slider.kobans { background-color: red; }'
            +'.HHAutoScriptMenu input:not(:checked) + .slider.round.kobans:before { background-color: red }'
            +'.HHAutoScriptMenu input:checked + .slider.round.kobans:before { background-color: white }')
GM_addStyle('#pInfo {padding-left:3px; z-index:1;white-space: pre;position: absolute;right: 5%; left:57%; height:auto; top:11%; overflow: hidden; border: 1px solid #ffa23e; background-color: rgba(0,0,0,.5); border-radius: 5px; font-size:9pt; user-select: none; -webkit-user-select: none; -moz-user-select: none;}'
            + '#pInfo ul {margin:0; padding:0; columns:2; list-style-type: none;}'
            + '#pInfo ul li {margin:0}');
GM_addStyle('#pInfo.left {right: 480px; left:220px; top:12%;');
//GM_addStyle('span.HHMenuItemName {font-size: xx-small; line-height: 150%}');
//GM_addStyle('span.HHMenuItemName {font-size: smaller; line-height: 120%}');
GM_addStyle('span.HHMenuItemName {padding-bottom:2px; line-height:120%}');
GM_addStyle('div.optionsRow {display:flex; flex-direction:row; justify-content: space-between}'); //; padding:3px;
GM_addStyle('span.optionsBoxTitle {padding-left:5px}'); //; padding-bottom:2px
GM_addStyle('div.optionsColumn {display:flex; flex-direction:column}');
GM_addStyle('div.optionsBoxWithTitle {display:flex; flex-direction:column}');
GM_addStyle('div.optionsBoxWithTitleInline {display:flex; flex-direction:row; border:1px solid #ffa23e; border-radius:5px; margin:3px}');
GM_addStyle('div.optionsBoxWithTitleInline .optionsBox {border: none}');
GM_addStyle('img.iconImg {max-width:15px; height:15px}');
GM_addStyle('#sMenu {top: 5px;right: 52px;padding: 4px;opacity: 1;border-radius: 4px;border: 1px solid #ffa23e;background-color: #1e261e;font-size:x-small; position:absolute; text-align:left; flex-direction:column; justify-content:space-between; z-index:10000; overflow:auto; max-height:calc(100% - 5px); scrollbar-width: thin;max-width: calc(100% - 52px);}');
GM_addStyle('#sMenu::-webkit-scrollbar {width: 6px;height: 6px;background: #000;}');
GM_addStyle('#sMenu::-webkit-scrollbar-thumb { background: #ffa23e; -webkit-border-radius: 1ex; -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);}');
GM_addStyle('#sMenu::-webkit-scrollbar-corner {background: #000;}');
GM_addStyle('div.optionsBoxTitle {padding:5px 15px 0px 5px; height:15px; display:flex; flex-direction:row; justify-content:center; align-items:center;}'); //; padding:2px; padding-bottom:0px;
GM_addStyle('div.rowOptionsBox {margin:3px; padding:3px; font-size:smaller; display:flex; flex-direction:row; align-items:flex-start; border: 1px solid #ffa23e; border-radius: 5px}');
GM_addStyle('div.optionsBox {margin:3px; padding:3px; font-size:smaller; display:flex; flex-direction:column; border:1px solid #ffa23e; border-radius:5px}');
GM_addStyle('div.internalOptionsRow {display:flex; flex-direction:row; justify-content: space-between; align-items: flex-end}'); //; padding:3px;
GM_addStyle('div.internalOptionsRow.separator {border-top:1px solid #ffa23e}'); //; padding:3px;
GM_addStyle('div.imgAndObjectRow {display:flex; flex-direction:row; justify-content:flex-start; align-items:center}'); //; padding:3px;//class="internalOptionsRow" style="justify-content:flex-start; align-items:center"
GM_addStyle('div.labelAndButton {padding:3px; display:flex;flex-direction:column}');
GM_addStyle('div.HHMenuItemBox {padding:0.2em}');
GM_addStyle('div.HHMenuRow {display:flex; flex-direction:row; align-items:center; align-content:center; justify-content:flex-start}');
GM_addStyle('input.maxMoneyInputField  {text-align:right; width:70px}');
GM_addStyle('.myButton {box-shadow: 0px 0px 0px 2px #9fb4f2; background:linear-gradient(to bottom, #7892c2 5%, #476e9e 100%); background-color:#7892c2; border-radius:10px; border:1px solid #4e6096; display:inline-block; cursor:pointer; color:#ffffff; font-family:Arial; font-size:8px; padding:3px 7px; text-decoration:none; text-shadow:0px 1px 0px #283966;}'
            +'.myButton:hover { background:linear-gradient(to bottom, #476e9e 5%, #7892c2 100%); background-color:#476e9e; }'
            +'.myButton:active { position:relative; top:1px;}'
            +'.myButton:disabled, .myButton[disabled] { background: grey;}');
GM_addStyle('.HHEventPriority {position: absolute;z-index: 500;background-color: black}');
GM_addStyle('.HHPopIDs {background-color: black;z-index: 500;position: absolute;}');
GM_addStyle('.tooltipHH:hover { cursor: help; position: relative; }'
            +'.tooltipHH span.tooltipHHtext { display: none }');
GM_addStyle('.HHpopup_message { border: #666 2px dotted; padding: 5px 20px 5px 5px; display: block; z-index: 1000; background: #e3e3e3; left: 0px; margin: 15px; width: 500px; position: absolute; top: 15px; color: black}');
GM_addStyle(".HHpopup_message .close {   position: absolute;   top: 20px;   right: 30px;   transition: all 200ms;   font-size: 30px;   font-weight: bold;   text-decoration: none;   color: #333; } #popup_message_league_close:hover {   color: #06D85F; }");
GM_addStyle('#HHPovPogRewards { position: absolute; bottom: 6.9rem; left: -0.75rem; padding: 0.5rem; background: rgba(0,0,0,.5); border-radius: 10px; z-index: 1;}');
GM_addStyle('.HHRewardNotCollected { max-width: 17.9rem; transform: scale(0.8); }');
GM_addStyle('.HHRewardNotCollected .slot { margin: 1px 1px 0}'); 
GM_addStyle('.HHGirlMilestone { position: absolute; bottom: 0;  z-index: 1; font-size:smaller; width: 200px; text-align: center;}'); 
GM_addStyle('.HHGirlMilestone > div { background: rgba(0,0,0,.5); border-radius: 10px; margin:auto;  width: 140px; }'); 
GM_addStyle('.HHGirlMilestone.green { border: solid 1px green }'); 
GM_addStyle('.HHGirlMilestone .nc-claimed-reward-check { width:20px; position:absolute; }'); 
GM_addStyle('#HHSeasonRewards { position: absolute; right: 1.25rem; bottom: 14rem; padding: 0.5rem; background: rgba(0,0,0,.5); border-radius: 10px; z-index: 1;}'); 
GM_addStyle('#HHSeasonalRewards { position: absolute; left: 1.25rem; bottom: 1rem; padding: 0.5rem; background: rgba(0,0,0,.5); border-radius: 10px; z-index: 1;}'); 
GM_addStyle('#HHPoaRewards { position: absolute; left: 15rem; bottom: 0; padding: 0.5rem; background: rgba(0,0,0,.5); border-radius: 10px; z-index: 1;}'); 
//END CSS Region


/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 620:
/***/ ((module) => {

class WindowHelper {
    static getWindow() {
        return (typeof unsafeWindow == 'undefined') ?  window : unsafeWindow;
    }
}

module.exports = {
    WindowHelper
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./src/i18n/empty.js
const HHAuto_ToolTips = {en:{}, fr:{}, es:{}, de:{}, it:{}};

const w = (typeof unsafeWindow == 'undefined') ?  window : unsafeWindow;

var hhTimerLocale = w.Phoenix ? w.Phoenix.language : null;
var timerDefinitions;
if (w.Phoenix && (hhTimerLocale !== undefined || hhTimerLocale !== null || hhTimerLocale.length > 0)) {
    timerDefinitions = {
    [hhTimerLocale]: {
        days: w.Phoenix.__.DateTime.time_short_days,
        hours: w.Phoenix.__.DateTime.time_short_hours,
        minutes: w.Phoenix.__.DateTime.time_short_min,
        seconds: w.Phoenix.__.DateTime.time_short_sec
        }
    }
} else {
    hhTimerLocale = 'en';
    timerDefinitions = {'en':{days: "d", hours: "h", minutes: "m", seconds: "s"}};
}

;// CONCATENATED MODULE: ./src/i18n/en.js


HHAuto_ToolTips.en.saveDebug = { version: "5.6.24", elementText: "Save Debug", tooltip: "Allow to produce a debug log file."};
HHAuto_ToolTips.en.gitHub = { version: "5.6.24", elementText: "GitHub", tooltip: "Link to GitHub project."};
HHAuto_ToolTips.en.ReportBugs = { version: "5.7.1", elementText: "Report Bugs", tooltip: "Link to GitHub issue list to open and follow bugs."};
HHAuto_ToolTips.en.noOtherScripts = { version: "5.7.1", elementText: "Please do not use other scripts, it can create incompatibility (HH++ OCD supported)", tooltip: ""};
HHAuto_ToolTips.en.saveConfig = { version: "5.6.24", elementText: "Save Config", tooltip: "Allow to save configuration."};
HHAuto_ToolTips.en.loadConfig = { version: "5.6.24", elementText: "Load Config", tooltip: "Allow to load configuration."};
HHAuto_ToolTips.en.globalTitle = { version: "5.6.24", elementText: "Global options"};
HHAuto_ToolTips.en.master = { version: "5.6.24", elementText: "Master switch", tooltip: "On/off switch for full script"};
HHAuto_ToolTips.en.waitforContest = { version: "5.33.0", elementText: "Wait for contest", tooltip: "If enabled, most of activities using ressources are pending when not contest is active"};
HHAuto_ToolTips.en.settPerTab = { version: "5.6.24", elementText: "Settings per tab", tooltip: "Allow the settings to be set for this tab only"};
HHAuto_ToolTips.en.paranoia = { version: "5.6.24", elementText: "Paranoia mode", tooltip: "Allow to simulate sleep, and human user (To be documented further)"};
HHAuto_ToolTips.en.paranoiaSpendsBefore = { version: "5.6.24", elementText: "Spend points before", tooltip: "On will spend points for options (quest, Troll, Leagues and Season)<br>only if they are enabled<br>and spend points that would be above max limits<br>Ex : you have power for troll at 17, but going 4h45 in paranoia<br>it would mean having 17+10 points (rounded to higher int), thus being above the 20 max<br> it will then spend 8 points to fall back to 19 end of Paranoia, preventing to loose points."};
HHAuto_ToolTips.en.spendKobans0 = { version: "5.6.24", elementText: "Spend Kobans", tooltip: "<p style='color:red'>/!\\ Allow Kobans spending /!\\</p>Security switches for usage of kobans, needs to be active for Kobans spending functions"};
//HHAuto_ToolTips.en.spendKobans1 = { version: "5.6.24", elementText: "Are you sure?", tooltip: "Second security switches for usage of kobans <br>Have to be activated after the first one.<br> All 3 needs to be active for Kobans spending functions"};
//HHAuto_ToolTips.en.spendKobans2 = { version: "5.6.24", elementText: "You\'ve been warned", tooltip: "Third security switches for usage of kobans <br>Have to be activated after the second one.<br> All 3 needs to be active for Kobans spending functions"};
HHAuto_ToolTips.en.kobanBank = { version: "5.6.24", elementText: "Kobans Bank", tooltip: "(Integer)<br>Minimum Kobans kept when using Kobans spending functions"};
HHAuto_ToolTips.en.displayTitle = { version: "5.6.24", elementText: "Display options"};
HHAuto_ToolTips.en.autoActivitiesTitle = { version: "5.6.24", elementText: "Activities"};
HHAuto_ToolTips.en.buyCombat = { version: "5.6.24", elementText: "Buy comb. for events", tooltip: "<p style='color:red'>/!\\ Kobans spending function /!\\<br>("+HHAuto_ToolTips.en.spendKobans0.elementText+" must be ON)</p>If enabled : <br>Buying combat point during last X hours of event (if not going under Koban bank value), this will bypass threshold if event girl shards available."};
HHAuto_ToolTips.en.buyCombTimer = { version: "5.6.24", elementText: "Hours to buy Combats", tooltip: "(Integer)<br>X last hours of event"};
HHAuto_ToolTips.en.autoBuyBoosters = { version: "5.6.25", elementText: "Myth. & Leg. Boosters", tooltip: "<p style='color:red'>/!\\ Kobans spending function /!\\<br>("+HHAuto_ToolTips.en.spendKobans0.elementText+" must be ON)</p>Allow to buy booster in the market (if not going under Koban bank value)"};
HHAuto_ToolTips.en.autoBuyBoostersFilter = { version: "5.37.0", elementText: "Filter", tooltip: "(values separated by ;)<br>Set list of codes of booster to buy, order is respected.<br>Code:Name<br>B1:Ginseng<br>B2:Jujubes<br>B3:Chlorella<br>B4:Cordyceps<br>MB1:Sandalwood perfume<br>MB2:All Mastery's Emblem<br>MB3:Headband of determination<br>MB4:Luxurious Watch<br>MB5:Combative Cinnamon<br>MB6:Alban's travel memories<br>MB7:Angels' semen scent<br>MB8:Leagues mastery emblem<br>MB9:Seasons mastery emblem<br>MB10:Gem Detector<br>MB11:Banger<br>MB12:Shiny Aura"};
HHAuto_ToolTips.en.autoSeasonPassReds = { version: "5.6.24", elementText: "Pass 3 reds", tooltip: "<p style='color:red'>/!\\ Kobans spending function /!\\<br>("+HHAuto_ToolTips.en.spendKobans0.elementText+" must be ON)</p>Use kobans to renew Season opponents if 3 reds"};
HHAuto_ToolTips.en.showCalculatePower = { version: "5.6.24", elementText: "Show PowerCalc", tooltip: "Display battle simulation indicator for Leagues, battle, Seasons "};
HHAuto_ToolTips.en.showAdsBack = { version: "5.34.15", elementText: "Move ads to the back", tooltip: "Move the ads section to the background."};
//HHAuto_ToolTips.en.calculatePowerLimits = { version: "5.6.24", elementText: "Own limits", tooltip: "(red;orange)<br>Define your own red and orange limits for Opponents<br> -6000;0 do mean<br> <-6000 is red, between -6000 and 0 is orange and >=0 is green"};
HHAuto_ToolTips.en.showInfo = { version: "5.6.24", elementText: "Show info", tooltip: "if enabled : show info on script values and next runs"};
HHAuto_ToolTips.en.showInfoLeft = { version: "5.23.0", elementText: "Show info Left", tooltip: "Show info on left side vs on right side"};
HHAuto_ToolTips.en.autoSalary = { version: "5.6.24", elementText: "Salary", tooltip: "(Integer)<br>if enabled :<br>Collect salaries every X secs"};
//HHAuto_ToolTips.en.autoSalaryMinTimer = { version: "5.6.24", elementText: "Minimum wait", tooltip: "(Integer)<br>X secs to next Salary collection"};
HHAuto_ToolTips.en.autoSalaryMinSalary = { version: "5.6.24", elementText: "Min. salary", tooltip: "(Integer)<br>Minium salary to start collection"};
HHAuto_ToolTips.en.autoSalaryMaxTimer = { version: "5.6.24", elementText: "Max. collect time", tooltip: "(Integer)<br>X secs to collect Salary, before stopping."};
HHAuto_ToolTips.en.autoMission = { version: "5.6.24", elementText: "Mission", tooltip: "if enabled : Automatically do missions"};
HHAuto_ToolTips.en.autoMissionCollect = { version: "5.6.24", elementText: "Collect", tooltip: "if enabled : Automatically collect missions after start of new competition."};
HHAuto_ToolTips.en.compactMissions ={ version: "5.24.0", elementText: "Compact", tooltip: "Add styles to compact missions display"};
HHAuto_ToolTips.en.autoTrollTitle = { version: "5.6.24", elementText: "Battle Troll"};
HHAuto_ToolTips.en.autoTrollBattle = { version: "5.6.24", elementText: "Enable", tooltip: "if enabled : Automatically battle troll selected"};
HHAuto_ToolTips.en.autoTrollSelector = { version: "5.6.24", elementText: "Troll selector", tooltip: "Select troll to be fought."};
HHAuto_ToolTips.en.autoTrollThreshold = { version: "5.6.24", elementText: "Threshold", tooltip: "(Integer 0 to 19)<br>Minimum troll fight to keep"};
HHAuto_ToolTips.en.eventTrollOrder = { version: "5.6.38", elementText: "Event Troll Order", tooltip: "(values separated by ;)<br>Allow to select in which order event troll are automatically battled<br>1 : Dark Lord<br>2 : Ninja Spy<br>3 : Gruntt<br>4 : Edwarda<br>5 : Donatien<br>6 : Sylvanus<br>7 : Bremen<br>8 : Finalmecia<br>9 : Fredy Sih Roko<br>10 : Karole<br>11 : Jackson's Crew<br>12 : Pandora Witch<br>13 : Nike<br>14 : Sake<br>15 : WereBunny Police"};
HHAuto_ToolTips.en.autoBuyTrollNumber = { version: "6.1.0", elementText: "Troll auto buy", tooltip: "Number of combat points to be bought during an event"};
HHAuto_ToolTips.en.autoBuyMythicTrollNumber = { version: "6.1.0", elementText: "Mythic auto buy", tooltip: "Number of combat points to be bought during a mythics event"};
HHAuto_ToolTips.en.firstTrollWithGirls = { version: "5.32.0", elementText: "First troll with girl"};
HHAuto_ToolTips.en.lastTrollWithGirls = { version: "5.32.0", elementText: "Last troll with girl"};
HHAuto_ToolTips.en.autoChampsForceStartEventGirl = { version: "5.6.98", elementText: "Event force", tooltip: "if enabled, will fight for event girl champion even if not started. Champions will need to be activated and champions to be in the filter."};
HHAuto_ToolTips.en.plusEvent = { version: "5.6.24", elementText: "+Event", tooltip: "If enabled : ignore selected troll during event to battle event"};
HHAuto_ToolTips.en.plusEventMythic = { version: "5.6.24", elementText: "+Mythic Event", tooltip: "Enable grabbing girls for mythic event, should only play them when shards are available, Mythic girl troll will be priorized over Event Troll."};
HHAuto_ToolTips.en.plusEventMythicSandalWood = { version: "6.5.0", elementText: "Equip Sandalwood", tooltip: "Will try to equip sandalwood before mythic fight."};
//HHAuto_ToolTips.en.eventMythicPrio = { version: "5.6.24", elementText: "Priorize over Event Troll Order", tooltip: "Mythic event girl priorized over event troll order if shards available"};
//HHAuto_ToolTips.en.autoTrollMythicByPassThreshold = { version: "5.6.24", elementText: "Mythic bypass Threshold", tooltip: "Allow mythic to bypass Troll threshold"};
HHAuto_ToolTips.en.autoSeasonTitle = { version: "5.6.24", elementText: "Season"};
HHAuto_ToolTips.en.autoSeason = { version: "5.6.24", elementText: "Enable", tooltip: "if enabled : Automatically fight in Seasons (Opponent chosen following PowerCalculation)"};
HHAuto_ToolTips.en.autoSeasonCollect = { version: "5.6.24", elementText: "Collect", tooltip: "if enabled : Automatically collect Seasons ( if multiple to collect, will collect one per kiss usage)"};
HHAuto_ToolTips.en.autoSeasonCollectAll = { version: "5.7.0", elementText: "Collect all", tooltip: "if enabled : Automatically collect all items before end of season (configured with Collect all timer)"};
HHAuto_ToolTips.en.autoSeasonThreshold = { version: "5.6.24", elementText: "Threshold", tooltip: "Minimum kiss to keep"};
HHAuto_ToolTips.en.autoSeasonBoostedOnly = { version: "6.5.0", elementText: "Boosted only", tooltip: "If enabled : Need booster to fight in season"};
HHAuto_ToolTips.en.autoQuest = { version: "5.6.74", elementText: "Main Quest", tooltip: "if enabled : Automatically do main quest"};
HHAuto_ToolTips.en.autoSideQuest = { version: "5.6.83", elementText: "Side Quests", tooltip: "if enabled : Automatically do next available side quest (Enabled main quest has higher priority than side quests)"};
HHAuto_ToolTips.en.autoQuestThreshold = { version: "5.6.24", elementText: "Threshold", tooltip: "(Integer between 0 and 99)<br>Minimum quest energy to keep"};
HHAuto_ToolTips.en.autoContest = { version: "5.6.24", elementText: "Claim Contest", tooltip: "if enabled : Collect finished contest rewards"};
HHAuto_ToolTips.en.compactEndedContests = { version: "5.24.0", elementText: "Compact", tooltip: "Add styles to compact ended contests display"};
HHAuto_ToolTips.en.autoFreePachinko = { version: "5.6.24", elementText: "Pachinko", tooltip: "if enabled : Automatically collect free Pachinkos"};
HHAuto_ToolTips.en.autoMythicPachinko = { version: "5.6.24", elementText: "Mythic Pachinko"};
HHAuto_ToolTips.en.autoEquipmentPachinko = { version: "5.34.9", elementText: "Equipment Pachinko"};
HHAuto_ToolTips.en.autoLeaguesTitle = { version: "5.6.24", elementText: "Leagues"};
HHAuto_ToolTips.en.autoLeagues = { version: "5.6.24", elementText: "Enable", tooltip: "if enabled : Automatically battle Leagues"};
HHAuto_ToolTips.en.autoLeaguesPowerCalc = { version: "5.6.24", elementText: "Use PowerCalc", tooltip: "if enabled : will choose opponent using PowerCalc (Opponent list expires every 10 mins and take few mins to be built)"};
HHAuto_ToolTips.en.leagueListDisplayPowerCalc = { version: "5.34.18", elementText: "Display PowerCalc", tooltip: "Display powerCalc in league list (stil in developpment)"};
HHAuto_ToolTips.en.autoLeaguesCollect = { version: "5.6.24", elementText: "Collect", tooltip: "If enabled : Automatically collect Leagues"};
HHAuto_ToolTips.en.autoLeaguesThreeFights = { version: "6.2.0", elementText: "3 fights", tooltip: "If enabled : Wait to have 3 energy (above threshold) before fighting"};
HHAuto_ToolTips.en.autoLeaguesBoostedOnly = { version: "6.5.0", elementText: "Boosted only", tooltip: "If enabled : Need booster to fight in league"};
HHAuto_ToolTips.en.boostMissing = { version: "6.5.0", elementText: "No booster Equipped"};
HHAuto_ToolTips.en.autoLeaguesSelector = { version: "5.6.24", elementText: "Target League", tooltip: "League to target, to try to demote, stay or go in higher league depending"};
HHAuto_ToolTips.en.autoLeaguesAllowWinCurrent = {version: "5.6.24", elementText:"Allow win", tooltip: "If check will allow to win targeted league and then demote next league to fall back to targeted league."};
HHAuto_ToolTips.en.autoLeaguesThreshold = { version: "5.6.24", elementText: "Threshold", tooltip: "(Integer between 0 and 14)<br>Minimum league fights to keep"};
HHAuto_ToolTips.en.autoLeaguesSecurityThreshold = { version: "5.18.0", elementText: "Security Threshold", tooltip: "(Integer)<br>Points limit to prevent the script performing any league fight to keep user in targetted league and avoid promotion. Change only if you accept the risk"};
HHAuto_ToolTips.en.autoPowerPlaces = { version: "5.6.24", elementText: "Places of Power", tooltip: "if enabled : Automatically Do powerPlaces"};
HHAuto_ToolTips.en.autoPowerPlacesIndexFilter = { version: "5.6.24", elementText: "Index Filter", tooltip: "(values separated by ;)<br>Allow to set filter and order on the PowerPlaces to do (order respected only when multiple powerPlace expires at the same time)"};//<table style='font-size: 8px;line-height: 1;'><tr><td>Reward</td>  <td>HC</td>    <td>CH</td>   <td>KH</td></tr><tr><td>Champ tickets & M¥</td>    <td>4</td>   <td>5</td>   <td>6</td></tr><tr><td>Kobans & K¥</td>  <td>7</td>   <td>8</td>   <td>9</td></tr><tr><td>Epic Book & K¥</td> <td>10</td>  <td>11</td> <td>12</td></tr><tr><td>Epic Orbs & K¥</td>  <td>13</td>  <td>14</td>  <td>15</td></tr><tr><td>Leg. Booster & K¥</td>   <td>16</td>  <td>17</td>  <td>18</td></tr><tr><td>Champions tickets & K¥</td>  <td>19</td>  <td>20</td>  <td>21</td></tr><tr><td>Epic Gift & K¥</td>  <td>22</td>  <td>23</td>  <td>24</td></tr></table>"};
HHAuto_ToolTips.en.autoPowerPlacesAll = { version: "5.6.24", elementText: "Do All", tooltip: "If enabled : ignore filter and do all powerplaces (will update Filter with current ids)"};
HHAuto_ToolTips.en.autoPowerPlacesPrecision = { version: "5.6.103", elementText: "PoP precision", tooltip: "If enabled : use more advanced algorithm to try and find best team instead of using auto. This is more useful when you have a smaller roster and may be very slow with large rosters."};
HHAuto_ToolTips.en.autoPowerPlacesInverted = { version: "5.10.0", elementText: "PoP inverted", tooltip: "If enabled : fill the POP starting from the last one."};
HHAuto_ToolTips.en.autoPowerPlacesWaitMax = { version: "5.20.0", elementText: "PoP wait max", tooltip: "If enabled : POP will wait all POP are ended before starting new one."};
HHAuto_ToolTips.en.compactPowerPlace = { version: "5.24.0", elementText: "Compact", tooltip: "Add styles to compact power places display"};
HHAuto_ToolTips.en.autoChampsTitle = { version: "5.6.24", elementText: "Champions"};
HHAuto_ToolTips.en.autoChamps = { version: "5.6.24", elementText: "Normal", tooltip: "if enabled : Automatically do champions (if they are started and in filter only)"};
HHAuto_ToolTips.en.autoChampsForceStart = { version: "5.6.76", elementText: "Force start", tooltip: "if enabled : will fight filtered champions even if not started."};
HHAuto_ToolTips.en.autoChampsUseEne = { version: "5.39.0", elementText: "Buy tickets", tooltip: "If enabled : use Energy to buy tickets respecting the energy quest threshold"};
HHAuto_ToolTips.en.autoChampsFilter = { version: "5.6.24", elementText: "Filter", tooltip: "(values separated by ; 1 to 6)<br>Allow to set filter on champions to be fought"};
HHAuto_ToolTips.en.autoChampsTeamLoop = { version: "5.21.0", elementText: "Auto team Loops", tooltip: "Number of loop to search for champion team for every button click"};
HHAuto_ToolTips.en.autoChampsGirlThreshold = { version: "6.4.0", elementText: "Girl min power", tooltip: "Minimum power for the girl to be considered (power without pose boost, in white)"};
HHAuto_ToolTips.en.autoChampsTeamKeepSecondLine = { version: "5.27.0", elementText: "Keep second line girls", tooltip: "If enabled: keep second line matching girls when first line is not full"};
HHAuto_ToolTips.en.ChampTeamButton = { version: "5.8.0", elementText: "Indicate team order", tooltip: "Add number for the prefered girl order to fight champion"};
HHAuto_ToolTips.en.updateChampTeamButton = { version: "5.21.0", elementText: "Find best team", tooltip: ""};
HHAuto_ToolTips.en.ChampGirlOrder = { version: "5.8.0", elementText: "", tooltip: "Girl to be used at position"};
HHAuto_ToolTips.en.ChampGirlLowOrder = { version: "5.11.0", elementText: "", tooltip: "For Worst team, girl to be used at position"};
HHAuto_ToolTips.en.goToClubChampions = { version: "5.25.0", elementText: "Go To Club Champion"};
HHAuto_ToolTips.en.autoStats = { version: "5.6.24", elementText: "Money to keep", tooltip: "(Integer)<br>Automatically buy stats in market with money above the setted amount"};
HHAuto_ToolTips.en.autoStatsSwitch = { version: "5.6.24", elementText: "Stats", tooltip: "Allow to on/off autoStats"};
HHAuto_ToolTips.en.autoExpW = { version: "5.6.24", elementText: "Books", tooltip: "if enabled : allow to buy Exp in market<br>Only buy if money bank is above the value<br>Only buy if total Exp owned is below value"};
HHAuto_ToolTips.en.autoExp = { version: "5.6.24", elementText: "Money to keep", tooltip: "(Integer)<br>Minimum money to keep."};
HHAuto_ToolTips.en.maxExp = { version: "5.6.24", elementText: "Max Exp.", tooltip: "(Integer)<br>Maximum Exp to buy"};
HHAuto_ToolTips.en.autoAffW = { version: "5.6.24", elementText: "Gifts", tooltip: "if enabled : allow to buy Aff in market<br>Only buy if money bank is above the value<br>Only buy if total Aff owned is below value"};
HHAuto_ToolTips.en.autoAff = { version: "5.6.24", elementText: "Money to keep", tooltip: "(Integer)<br>Minimum money to keep."};
HHAuto_ToolTips.en.maxAff = { version: "5.6.24", elementText: "Max Aff.", tooltip: "(Integer)<br>Maximum Aff to buy"};
HHAuto_ToolTips.en.maxBooster = { version: "5.38.0", elementText: "Max Booster.", tooltip: "(Integer)<br>Maximum booster to buy (limit for each booster type)"};
HHAuto_ToolTips.en.OpponentListBuilding = { version: "5.6.24", elementText: "Opponent list is building", tooltip: ""};
HHAuto_ToolTips.en.OpponentParsed = { version: "5.6.24", elementText: "opponents parsed", tooltip: ""};
HHAuto_ToolTips.en.DebugMenu = { version: "5.6.24", elementText: "Debug Menu", tooltip: "Options for debug"};
HHAuto_ToolTips.en.DebugOptionsText = { version: "5.6.24", elementText: "Buttons below allow to modify script storage, be careful using it.", tooltip: ""};
HHAuto_ToolTips.en.DeleteTempVars = { version: "5.6.24", elementText: "Delete temp storage", tooltip: "Delete all temporary storage for the script."};
HHAuto_ToolTips.en.ResetAllVars = { version: "5.6.24", elementText: "Reset defaults", tooltip: "Reset all setting to defaults."};
HHAuto_ToolTips.en.DebugFileText = { version: "5.6.24", elementText: "Click on button bellow to produce a debug log file", tooltip: ""};
HHAuto_ToolTips.en.OptionCancel = { version: "5.6.24", elementText: "Cancel", tooltip: ""};
HHAuto_ToolTips.en.OptionStop = { version: "5.6.24", elementText: "Stop", tooltip: ""};
HHAuto_ToolTips.en.SeasonMaskRewards = { version: "5.6.24", elementText: "Mask claimed", tooltip: "Allow to mask all claimed rewards on Season screen"};
HHAuto_ToolTips.en.showClubButtonInPoa = { version: "5.25.0", elementText: "Go to in POA", tooltip: "if enabled, add a 'go to' button in POA related objectives."};
HHAuto_ToolTips.en.autoClubChamp = { version: "5.6.24", elementText: "Club", tooltip: "if enabled, automatically fight club champion if champion has already been fought once."};
HHAuto_ToolTips.en.autoClubForceStart = { version: "5.6.24", elementText: "Force start", tooltip: "if enabled, will fight club champion even if not started."};
HHAuto_ToolTips.en.autoTrollMythicByPassParanoia = { version: "5.6.24", elementText: "Mythic bypass Paranoia", tooltip: "Allow mythic to bypass paranoia.<br>if next wave is during rest, it will force it to wake up for wave.<br>If still fight or can buy fights it will continue."};
HHAuto_ToolTips.en.buyMythicCombat = { version: "5.6.24", elementText: "Buy comb. for mythic event", tooltip: "<p style='color:red'>/!\\ Kobans spending function /!\\<br>("+HHAuto_ToolTips.en.spendKobans0.elementText+" must be ON)</p>If enabled : <br>Buying combat point during last X hours of mythic event (if not going under Koban bank value), this will bypass threshold if mythic girl shards available."};
HHAuto_ToolTips.en.buyMythicCombTimer = { version: "5.6.24", elementText: "Hours to buy Mythic Combats", tooltip: "(Integer)<br>X last hours of mythic event"};
HHAuto_ToolTips.en.DebugResetTimerText = { version: "5.6.24", elementText: "Selector below allow you to reset ongoing timers", tooltip: ""};
HHAuto_ToolTips.en.timerResetSelector = { version: "5.6.24", elementText: "Select Timer", tooltip: "Select the timer you want to reset"};
HHAuto_ToolTips.en.timerResetButton = { version: "5.6.24", elementText: "Reset", tooltip: "Set the timer to 0."};
HHAuto_ToolTips.en.timerLeftTime = { version: "5.6.24", elementText: "", tooltip: "Time remaining"};
HHAuto_ToolTips.en.timerResetNoTimer = { version: "5.6.24", elementText: "No selected timer", tooltip: ""};
HHAuto_ToolTips.en.menuSell = { version: "5.6.24", elementText: "Sell", tooltip: "Allow to sell items."};
HHAuto_ToolTips.en.menuSellText = { version: "5.6.126", elementText: "This will sell the number of items asked starting in display order (first all non legendary then legendary)<br> It will sell all Common, Rare, Epic stuff and keep : <br> - 1 set of rainbow legendary (choosen on highest player class stat)<br> - 1 set of legendary mono player class (choosen on highest stats)<br> - 1 set of legendary harmony (choosen on highest stats)<br> - 1 set of legendary endurance (choosen on highest stats)<br> - All mythics<br>You can lock/Unlock batch by clicking on the corresponding cell/row/column (notlocked/total), red means all locked, orange some locked.", tooltip: ""};
HHAuto_ToolTips.en.menuSellNumber = { version: "5.6.24", elementText: "", tooltip: "Enter the number of items you want to sell : "};
HHAuto_ToolTips.en.menuSellButton = { version: "5.6.24", elementText: "Sell", tooltip: "Launch selling funtion."};
HHAuto_ToolTips.en.menuSellCurrentCount = { version: "5.6.24", elementText: "Number of sellable items you currently have : ", tooltip: ""};
HHAuto_ToolTips.en.menuSellMaskLocked = { version: "5.6.24", elementText: "Mask locked", tooltip: "Allow to mask locked items."};
HHAuto_ToolTips.en.menuSoldText = { version: "5.6.24", elementText: "Number of items sold : ", tooltip: ""};
HHAuto_ToolTips.en.menuSoldMessageReachNB = { version: "5.6.24", elementText: "Wanted sold items reached.", tooltip: ""};
HHAuto_ToolTips.en.menuSoldMessageNoMore = { version: "5.6.24", elementText: " No more sellable items.", tooltip: ""};
HHAuto_ToolTips.en.menuDistribution = { version: "5.6.24", elementText: "Items to be used : ", tooltip: ""};
HHAuto_ToolTips.en.Total = { version: "5.6.24", elementText: "Total : ", tooltip: ""};
HHAuto_ToolTips.en.menuAllowedExceed = { version: "5.6.42", elementText: "Allow to exceed by : ", tooltip: ""};
HHAuto_ToolTips.en.menuDistributed = { version: "5.6.24", elementText: "Items used : ", tooltip: ""};
HHAuto_ToolTips.en.autoClubChampMax = { version: "5.6.24", elementText: "Max tickets per run", tooltip: "Maximum number of tickets to use on the club champion at each run."};
HHAuto_ToolTips.en.menuSellLock = { version: "5.6.24", elementText: "Lock/ Unlock", tooltip: "Switch the lock to prevent selected item to be sold."};
HHAuto_ToolTips.en.Rarity = { version: "5.6.24", elementText: "Rarity", tooltip: ""};
HHAuto_ToolTips.en.RarityCommon = { version: "5.6.24", elementText: "Common", tooltip: ""};
HHAuto_ToolTips.en.RarityRare = { version: "5.6.24", elementText: "Rare", tooltip: ""};
HHAuto_ToolTips.en.RarityEpic = { version: "5.6.24", elementText: "Epic", tooltip: ""};
HHAuto_ToolTips.en.RarityLegendary = { version: "5.6.24", elementText: "Legendary", tooltip: ""};
HHAuto_ToolTips.en.RarityMythic = { version: "5.6.126", elementText: "Mythic", tooltip: ""};
HHAuto_ToolTips.en.equipementHead = { version: "5.6.24", elementText: "Head", tooltip: ""};
HHAuto_ToolTips.en.equipementBody = { version: "5.6.24", elementText: "Body", tooltip: ""};
HHAuto_ToolTips.en.equipementLegs = { version: "5.6.24", elementText: "Legs", tooltip: ""};
HHAuto_ToolTips.en.equipementFlag = { version: "5.6.24", elementText: "Flag", tooltip: ""};
HHAuto_ToolTips.en.equipementPet = { version: "5.6.24", elementText: "Pet", tooltip: ""};
HHAuto_ToolTips.en.equipementWeapon = { version: "5.6.24", elementText: "Weapon", tooltip: ""};
HHAuto_ToolTips.en.equipementCaracs = { version: "5.6.24", elementText: "Caracs", tooltip: ""};
HHAuto_ToolTips.en.equipementType = { version: "5.6.24", elementText: "Type", tooltip: ""};
HHAuto_ToolTips.en.autoMissionKFirst = { version: "5.6.24", elementText: "Kobans first", tooltip: "Start by missions rewarded with Kobans."};
HHAuto_ToolTips.en.giveexperience = { version: "6.2.0", elementText: "Give experience", tooltip: "Automatically give max current range Exp to selected girl."};
HHAuto_ToolTips.en.giveaffection = { version: "6.2.0", elementText: "Give Affection", tooltip: "Automatically give max current range affection to selected girl."};
HHAuto_ToolTips.en.giveAllaffection = { version: "6.2.0", elementText: "Give All Affection", tooltip: "Automatically give all affection to selected girl."};
HHAuto_ToolTips.en.menuExp = { version: "6.2.0", elementText: "Give Exp", tooltip: ""};
HHAuto_ToolTips.en.menuExpInfo = { version: "5.30.0", elementText: "Max out button will be used until requested level is reached"};
HHAuto_ToolTips.en.menuExpButton = { version: "5.30.0", elementText: "Go !", tooltip: "Launch giving exp."};
HHAuto_ToolTips.en.menuExpLevel =  { version: "5.30.00", elementText: "Enter target Exp level :", tooltip: "Target Exp level for girl"};
HHAuto_ToolTips.en.giveLastGirl = { version: "5.30.0", elementText: "Last girl, going back to harem list..."};
HHAuto_ToolTips.en.giveMaxingOut = { version: "5.30.0", elementText: "Maxing out"};
HHAuto_ToolTips.en.giveMaxedOut = { version: "5.30.0", elementText: "already maxed out, skipping"};
HHAuto_ToolTips.en.goToGirlPage = { version: "6.2.0", elementText: "Go to girl page", tooltip: "Open the girl management page"};
HHAuto_ToolTips.en.girlListMenu = { version: "6.2.0", elementText: "Girl list menu", tooltip: "Open girl list menu"};
HHAuto_ToolTips.en.girlMenu = { version: "6.2.0", elementText: "Girl menu", tooltip: "Open girl menu"};
HHAuto_ToolTips.en.povpogTitle = { version: "5.6.133", elementText: "Path of Valor/Glory"};
HHAuto_ToolTips.en.povTitle = { version: "5.20.3", elementText: "Path of Valor"};
HHAuto_ToolTips.en.pogTitle = { version: "5.20.3", elementText: "Path of Glory"};
HHAuto_ToolTips.en.seasonalEventTitle = { version: "5.6.133", elementText: "Seasonal Event"};
HHAuto_ToolTips.en.PoAMaskRewards = { version: "5.6.24", elementText: "PoA mask claimed", tooltip: "Masked claimed rewards for Path of Attraction."};
HHAuto_ToolTips.en.PoVMaskRewards = { version: "5.6.26", elementText: "PoV mask claimed", tooltip: "Masked claimed rewards for Path of Valor."};
HHAuto_ToolTips.en.PoGMaskRewards = { version: "5.6.89", elementText: "PoG mask claimed", tooltip: "Masked claimed rewards for Path of Glory."};
HHAuto_ToolTips.en.rewardsToCollectTitle = { version: "5.37.0", elementText: "Energies, XP, currencies available to collect"};
HHAuto_ToolTips.en.showRewardsRecap = { version: "5.37.0", elementText: "Show rewards recap", tooltip: "Show cululated information for energies, XP and currencies"};
HHAuto_ToolTips.en.SeasonalEventMaskRewards = { version: "5.6.132", elementText: "Seasonal Event mask claimed", tooltip: "Masked claimed rewards for Seasonal Event."};
HHAuto_ToolTips.en.bossBangEvent = { version: "5.20.3", elementText: "Enable", tooltip: "Perform boss bang fight script will start with the team configured after."};
HHAuto_ToolTips.en.bossBangEventTitle = { version: "5.20.3", elementText: "Boss Bang Event"};
HHAuto_ToolTips.en.bossBangMinTeam = { version: "5.6.137", elementText: "First Team", tooltip: "First team to start with<br>If 5 will start with last team and reach the first one."};
HHAuto_ToolTips.en.sultryMysteriesEventTitle = { version: "5.21.6", elementText: "Sultry Mysteries Event"};
HHAuto_ToolTips.en.sultryMysteriesEventRefreshShop = { version: "5.21.6", elementText: "Refresh Shop", tooltip: "Open Sultry Mysteries shop tab to trigger shop update."};
HHAuto_ToolTips.en.sultryMysteriesEventRefreshShopNext = { version: "5.22.5", elementText: "Sultry Shop"};
HHAuto_ToolTips.en.collectEventChest = { version: "5.28.0", elementText: "Collect event chest", tooltip: "If enabled: collect event chest when active after getting all girls"};
HHAuto_ToolTips.en.dailyMissionGirlTitle = { version: "6.5.2", elementText: "Complete the Daily Missions of to get me!"};
HHAuto_ToolTips.en.showTooltips = { version: "5.6.24", elementText: "Show tooltips", tooltip: "Show tooltip on menu."};
HHAuto_ToolTips.en.showMarketTools = { version: "5.6.24", elementText: "Show market tools", tooltip: "Show Market tools."};
HHAuto_ToolTips.en.updateMarket = { version: "5.22.0", elementText: "Update market", tooltip: "Update player data from market screens (Equipement, books and gift owned as well as next refresh time)."};
HHAuto_ToolTips.en.useX10Fights = { version: "5.6.24", elementText: "Use x10", tooltip: "<p style='color:red'>/!\\ Kobans spending function /!\\<br>("+HHAuto_ToolTips.en.spendKobans0.elementText+" must be ON)</p>If enabled : <br>Use x10 button if 10 fights or more to do (if not going under Koban bank value).<br>x50 takes precedence on x10 if all conditions are filled."};
HHAuto_ToolTips.en.useX50Fights = { version: "5.6.24", elementText: "Use x50", tooltip: "<p style='color:red'>/!\\ Kobans spending function /!\\<br>("+HHAuto_ToolTips.en.spendKobans0.elementText+" must be ON)</p>If enabled : <br>Use x50 button if 50 fights or more to do (if not going under Koban bank value).<br>Takes precedence on x10 if all conditions are filled."};
HHAuto_ToolTips.en.useX10FightsAllowNormalEvent = { version: "5.6.24", elementText: "x10 for Event", tooltip: "If off:<br> X10 will only be used for mythic event<br>If enabled : <br>Allow x10 button for normal event if 10 fights or more to do (if not going under Koban bank value).<br>x50 takes precedence on x10 if all conditions are filled."};
HHAuto_ToolTips.en.useX50FightsAllowNormalEvent = { version: "5.6.24", elementText: "x50 for Event", tooltip: "If off:<br> X50 will only be used for mythic event<br>If enabled : <br>Use x50 button for normal event if 50 fights or more to do (if not going under Koban bank value).<br>Takes precedence on x10 if all conditions are filled."};
HHAuto_ToolTips.en.autoBuy = { version: "5.6.24", elementText: "Market"};
HHAuto_ToolTips.en.minShardsX50 = { version: "5.6.24", elementText: "Min. shards x50", tooltip: "Only use x50 button if remaining shards of current girl is equal or above this limit."};
HHAuto_ToolTips.en.minShardsX10 = { version: "5.6.24", elementText: "Min. shards x10", tooltip: "Only use x10 button if remaining shards of current girl is equal or above this limit."};
HHAuto_ToolTips.en.mythicGirlNext = { version: "5.6.24", elementText: "Mythic girl wave"};
HHAuto_ToolTips.en.RefreshOppoList = { version: "5.6.24", elementText: "Refresh Opponent list", tooltip: "Allow to force a refresh of opponent list."};
HHAuto_ToolTips.en.HideBeatenOppo = { version: "5.7.1", elementText: "Hide", tooltip: "Allow to hide beaten opponent from the list."};
HHAuto_ToolTips.en.display = { version: "5.7.1", elementText: "Display", tooltip: ""};
HHAuto_ToolTips.en.PachinkoSelectorNoButtons = {version: "5.6.24", elementText: "No Orbs available.", tooltip: ""};
HHAuto_ToolTips.en.PachinkoSelector = {version: "5.6.24", elementText: "", tooltip: "Pachinko Selector."};
HHAuto_ToolTips.en.PachinkoLeft = {version: "5.6.24", elementText: "", tooltip: "Currently available orbs."};
HHAuto_ToolTips.en.PachinkoXTimes = {version: "5.6.24", elementText: "Number to use : ", tooltip: "Set the number of orbs tu use o selected pachinko."};
HHAuto_ToolTips.en.Launch = {version: "5.6.56", elementText: "Launch", tooltip: ""};
HHAuto_ToolTips.en.PachinkoButton = {version: "5.6.24", elementText: "Use Pachinko", tooltip: "Allow to automatically use the selected Pachinko. (Only for Orbs games)"};
HHAuto_ToolTips.en.PachinkoOrbsLeft = {version: "5.6.24", elementText: " orbs remaining.", tooltip: ""};
HHAuto_ToolTips.en.PachinkoInvalidOrbsNb = {version: "5.6.24", elementText: 'Invalid orbs number'};
HHAuto_ToolTips.en.PachinkoNoGirls = {version: "5.6.24", elementText: 'No more any girls available.'};
HHAuto_ToolTips.en.PachinkoByPassNoGirls = {version: "5.6.24", elementText: 'Bypass no girls', tooltip: "Bypass the no girls in Pachinko warning."};
HHAuto_ToolTips.en.PachinkoStopFirstGirl = {version: "5.35.00", elementText: 'Stop first girl', tooltip: "Stop when a girl is won."};
HHAuto_ToolTips.en.PachinkoFillOrbs = {version: "5.6.134", elementText: 'Fill all orbs', tooltip: "Fill input with all available orbs."};
HHAuto_ToolTips.en.ChangeTeamButton = {version: "5.6.24", elementText: "Current Best", tooltip: "Get list of top 16 girls for your team."};
HHAuto_ToolTips.en.ChangeTeamButton2 = {version: "5.6.24", elementText: "Possible Best", tooltip: "Get list of top 16 girls for your team if they are Max Lv & Aff"};
HHAuto_ToolTips.en.AssignTopTeam = {version: "5.6.24", elementText: "Assign first 7", tooltip: "Put the first 7 ones in the team."};
HHAuto_ToolTips.en.ExportGirlsData = {version: "5.6.24", elementText: "⤓", tooltip: "Export Girls data."};
HHAuto_ToolTips.en.autoFreeBundlesCollect = {version: "5.16.0", elementText: "Collect free bundles", tooltip: "Collect free bundles."};
HHAuto_ToolTips.en.mousePause = {version: "5.6.135", elementText: "Mouse Pause", tooltip: "Pause script activity for 5 seconds when mouse movement is detected. Helps stop script from interrupting manual actions. (in ms, 5000ms=5s)"};
HHAuto_ToolTips.en.saveDefaults = {version: "5.6.24", elementText: "Save defaults", tooltip: "Save your own defaults values for new tabs."};
HHAuto_ToolTips.en.autoGiveAff = {version: "5.6.24", elementText: "Auto Give", tooltip: "If enabled, will automatically give Aff to girls in order ( you can use OCD script to filter )."};
HHAuto_ToolTips.en.autoGiveExp = {version: "5.6.24", elementText: "Auto Give", tooltip: "If enabled, will automatically give Exp to girls in order ( you can use OCD script to filter )."};
HHAuto_ToolTips.en.autoPantheonTitle = {version: "5.6.24", elementText: "Pantheon", tooltip: ""};
HHAuto_ToolTips.en.autoPantheon = { version: "5.6.24", elementText: "Enable", tooltip: "if enabled : Automatically do Pantheon"};
HHAuto_ToolTips.en.autoPantheonThreshold = { version: "5.6.24", elementText: "Threshold", tooltip: "Minimum worship to keep<br>Max 10"};
HHAuto_ToolTips.en.buttonSaveOpponent = { version: "5.6.24", elementText: "Save opponent data", tooltip: "Save opponent data for fight simulation in market."};
HHAuto_ToolTips.en.SimResultMarketButton = { version: "5.6.24", elementText: "Sim. results", tooltip: "Simulate result with League saved opponent."};
HHAuto_ToolTips.en.simResultMarketPreviousScore = { version: "5.6.24", elementText: "Previous score :", tooltip: ""};
HHAuto_ToolTips.en.simResultMarketScore = { version: "5.6.24", elementText: "Score : ", tooltip: ""};
HHAuto_ToolTips.en.none = { version: "5.6.24", elementText: "None", tooltip: ""};
HHAuto_ToolTips.en.Name = { version: "5.6.24", elementText: "Name", tooltip: ""};
HHAuto_ToolTips.en.sortPowerCalc = { version: "5.6.24", elementText: "Sort by score", tooltip: "Sorting opponents by score."};
HHAuto_ToolTips.en.haremNextUpgradableGirl = { version: "5.6.24", elementText: "Go to next upgradable Girl.", tooltip: ""};
HHAuto_ToolTips.en.haremOpenFirstXUpgradable = { version: "5.6.24", elementText: "Open X upgradable girl quest.", tooltip: ""};
HHAuto_ToolTips.en.translate = { version: "5.6.25", elementText: "Translate", tooltip: ""};
HHAuto_ToolTips.en.saveTranslation = { version: "5.6.25", elementText: "Save translation"};
HHAuto_ToolTips.en.saveTranslationText = { version: "5.6.25", elementText: "Below you'll find all text that can be translated.<br>To contribute, modify directly in the cell the translation (if empty click on the blue part ;))<br><p style='margin-block-start:0px;margin-block-end:0px;color:gray'>Gray cells are translations needing update.</p><p style='margin-block-start:0px;margin-block-end:0px;color:blue'>Blue cell are missing translations</p><p style='margin-block-start:0px;margin-block-end:0px;color:red'>Please try to keep the text length to prevent UI issues.</p>At the bottom you'll find a button to generate a txt file with your modification.<br>Please upload it to : <a target='_blank' href='https://github.com/Roukys/HHauto/issues/426'>Github</a>", tooltip: ""};
HHAuto_ToolTips.en.menuCollectable = { version: "5.6.47", elementText: "Collectable preferences.", tooltip: ""};
HHAuto_ToolTips.en.menuCollectableText = { version: "5.6.47", elementText: "Please select the collectables you want to be automatically collected.", tooltip: ""};
HHAuto_ToolTips.en.menuDailyCollectableText = { version: "5.6.49", elementText: "Please select the collectables you want to be immediately collected.", tooltip: ""};
HHAuto_ToolTips.en.autoPoVCollect = { version: "5.6.49", elementText: "Collect PoV", tooltip: "if enabled : Automatically collect Path of Valor."};
HHAuto_ToolTips.en.autoPoVCollectAll = { version: "5.7.0", elementText: "Collect All PoV", tooltip: "if enabled : Automatically collect all items before end of Path of Valor (configured with Collect all timer)"};
HHAuto_ToolTips.en.autoSeasonalEventCollect = { version: "5.7.0", elementText: "Collect", tooltip: "if enabled : Automatically collect Seasonal Event."};
HHAuto_ToolTips.en.autoSeasonalEventCollectAll = { version: "5.7.0", elementText: "Collect all", tooltip: "if enabled : Automatically collect all items before end of seasonal event (configured with Collect all timer)"};
HHAuto_ToolTips.en.autoPoGCollect = { version: "5.6.89", elementText: "Collect PoG", tooltip: "if enabled : Automatically collect Path of Glory."};
HHAuto_ToolTips.en.autoPoGCollectAll = { version: "5.7.0", elementText: "Collect All PoG", tooltip: "if enabled : Automatically collect all items before end of Path of Glory (configured with Collect all timer)"};
HHAuto_ToolTips.en.dailyGoalsTitle = {version: "5.24.0", elementText: "Daily Goals"};
HHAuto_ToolTips.en.autoDailyGoalsCollect = {version: "5.6.54", elementText: "Collect", tooltip: "Collect daily Goals if not collected 2 hours before end of HH day."};
HHAuto_ToolTips.en.compactDailyGoals = { version: "5.24.0", elementText: "Compact", tooltip: "Add styles to compact daily goals display"};
HHAuto_ToolTips.en.HaremSortMenuSortText = {version: "5.6.56", elementText: "Select the wanted harem sorting : ", tooltip: ""};
HHAuto_ToolTips.en.DateAcquired = {version: "5.6.56", elementText: "Date recruited", tooltip: ""};
HHAuto_ToolTips.en.Grade = {version: "5.6.56", elementText: "Grade", tooltip: ""};
HHAuto_ToolTips.en.Level = {version: "5.6.56", elementText: "Level", tooltip: ""};
HHAuto_ToolTips.en.Power = {version: "5.6.56", elementText: "Power", tooltip: ""};
HHAuto_ToolTips.en.upgrade_cost = {version: "5.6.56", elementText: "Upgrade cost", tooltip: ""};
HHAuto_ToolTips.en.HaremSortMenuSortBy = {version: "5.6.56", elementText: "Sort by ", tooltip: ""};
HHAuto_ToolTips.en.HaremSortMenuSortReverse = {version: "5.6.56", elementText: "Reverse", tooltip: ""};
HHAuto_ToolTips.en.haremGiveXP = {version: "6.2.0", elementText: "Fill current XP of filtered girls", tooltip: "Use max out button XP on current level for filtered girls"};
HHAuto_ToolTips.en.haremGiveGifts = {version: "6.2.0", elementText: "Fill current affection of filtered girls", tooltip: "Use max out button affection on current level for filtered girls"};
HHAuto_ToolTips.en.haremGiveMaxGifts = {version: "6.2.0", elementText: "Fill all affection of filtered girls", tooltip: "Give all affection for filtered girls, pay for necessary grades"};
HHAuto_ToolTips.en.haremGirlGiveXP = {version: "5.30.0", elementText: "Give XP to girl", tooltip: "Open submenu to give xp to girl"};
HHAuto_ToolTips.en.haremGirlGiveGifts = {version: "5.30.0", elementText: "Give Gifts to girl", tooltip: ""};
HHAuto_ToolTips.en.haremGirlGiveMaxGifts = {version: "6.2.0", elementText: "Give max Gifts to girl", tooltip: "Use max out button to reach max grade, pay for necessary grades<br> Don't pay the last one"};
HHAuto_ToolTips.en.collectAllTimer = {version: "5.7.0", elementText: "Collect all timer (in hour)", tooltip: "Hour(s) before end of events to collect all rewards (Low time create risk of not collecting), Need activation on each events (POV, POG, season)"};

;// CONCATENATED MODULE: ./src/i18n/fr.js


HHAuto_ToolTips.fr.saveDebug = { version: "5.6.24", elementText: "Sauver log", tooltip: "Sauvegarder un fichier journal de débogage."};
HHAuto_ToolTips.fr.gitHub = { version: "5.6.24", elementText: "GitHub", tooltip: "Lien vers le projet GitHub."};
HHAuto_ToolTips.fr.saveConfig = { version: "5.6.24", elementText: "Sauver config", tooltip: "Permet de sauvegarder la configuration."};
HHAuto_ToolTips.fr.loadConfig = { version: "5.6.24", elementText: "Charger config", tooltip: "Permet de charger la configuration."};
HHAuto_ToolTips.fr.master = { version: "5.6.24", elementText: "Script on/off", tooltip: "Bouton marche/arrêt pour le script complet"};
HHAuto_ToolTips.fr.settPerTab = { version: "5.6.24", elementText: "Options par onglet", tooltip: "Active le paramétrage par onglet.<br>Si activé : permet d'ouvrir le jeu dans un autre onglet tout en laissant le script fonctionner sur le premier.<br>Les options du script ne seront pas sauvegardées à la fermeture du navigateur."};
HHAuto_ToolTips.fr.paranoia = { version: "5.6.24", elementText: "Mode Parano", tooltip: "Permet de simuler le sommeil et l'utilisateur humain (à documenter davantage)"};
HHAuto_ToolTips.fr.paranoiaSpendsBefore = { version: "5.6.24", elementText: "Utiliser points avant", tooltip: "Dépensera des points pour les options (quête, troll, ligues et saison)<br> uniquement si elles sont activées<br>et dépense des points qui seraient perdus pendant la nuit<br> Ex : vous avez la puissance d'un troll à 17, mais en allant 4h45 en paranoïa,<br> cela voudrait dire avoir 17+10 points (arrondis à l'int supérieur), donc être au dessus du 20 max<br> il dépensera alors 8 points pour retomber à 19 fin de la paranoïa, empêchant de perdre des points."};
HHAuto_ToolTips.fr.spendKobans0 = { version: "5.6.24", elementText: "Dépense Kobans", tooltip: "<p style='color:red'>/!\\ Autorise la dépense des Kobans /!\\</p>Si activé : permet d'activer les fonctions utilisant des kobans"};
HHAuto_ToolTips.fr.kobanBank = { version: "5.6.24", elementText: "Kobans à conserver", tooltip: "Minimum de Kobans conservé en banque par les fonctions utilisant des kobans.<br>Ces fonctions ne s'exécuteront pas si elles risquent de faire passer la réserve de kobans sous cette limite."};
HHAuto_ToolTips.fr.buyCombat = { version: "5.6.24", elementText: "Achat comb. événmt", tooltip: "<p style='color:red'>/!\\ Dépense des Kobans /!\\<br>("+HHAuto_ToolTips.fr.spendKobans0.elementText+" doit être activé)</p>Si activé : <br>recharge automatiquement les points de combat durant les X dernières heures de l'événement (sans faire passer sous la valeur de la réserve de Kobans)"};
HHAuto_ToolTips.fr.buyCombTimer = { version: "5.6.24", elementText: "Heures d'achat comb.", tooltip: "(Nombre entier)<br>X dernières heures de l'événement"};
HHAuto_ToolTips.fr.autoBuyBoosters = { version: "5.6.24", elementText: "Boosters lég.", tooltip: "<p style='color:red'>/!\\ Dépense des Kobans /!\\<br>("+HHAuto_ToolTips.fr.spendKobans0.elementText+" doit être activé)</p>Permet d'acheter des boosters sur le marché (sans faire passer sous la valeur de la réserve de Kobans)."};
HHAuto_ToolTips.fr.autoBuyBoostersFilter = { version: "5.6.24", elementText: "Filtre", tooltip: "(valeurs séparées par ;)<br>Définit quel(s) booster(s) acheter, respecter l'ordre (B1:Ginseng B2:Jujubes B3:Chlorella B4:Cordyceps)."};
HHAuto_ToolTips.fr.autoSeasonPassReds = { version: "5.6.24", elementText: "Passer 3 rouges", tooltip: "<p style='color:red'>/!\\ Dépense des Kobans /!\\<br>("+HHAuto_ToolTips.fr.spendKobans0.elementText+" doit être activé)</p>Utilise des kobans pour renouveler les adversaires de la saison si PowerCalc détermine 3 combats rouges (perdus)."};
HHAuto_ToolTips.fr.showCalculatePower = { version: "5.6.24", elementText: "PowerCalc", tooltip: "Si activé : affiche le résultat des calculs du module PowerCalc (Simulateur de combats pour Ligues, Trolls, Saisons)."};
HHAuto_ToolTips.fr.showAdsBack = { version: "5.34.15", elementText: "Move ads to the back", tooltip: "Si activé : deplace les pubs à l'arrière plan."};
//HHAuto_ToolTips.fr.calculatePowerLimits = { version: "5.6.24", elementText: "Limites perso", tooltip: "(rouge;orange)<br>Définissez vos propres limites de rouge et d'orange pour les opposants<br> -6000;0 veux dire<br> <-6000 est rouge, entre -6000 et 0 est orange et >=0 est vert"};
HHAuto_ToolTips.fr.showInfo = { version: "5.6.24", elementText: "Infos", tooltip: "Si activé : affiche une fenêtre d'informations sur le script."};
HHAuto_ToolTips.fr.showInfoLeft = { version: "5.23.0", elementText: "Infos à gauche", tooltip: "Affiche la fenêtre d'information à gauche plutot qu'à droite"};
HHAuto_ToolTips.fr.autoSalary = { version: "5.6.24", elementText: "Salaire", tooltip: "Si activé :<br>Collecte les salaires toutes les X secondes."};
//HHAuto_ToolTips.fr.autoSalaryMinTimer = { version: "5.6.24", elementText: "Attente min.", tooltip: "(Nombre entier)<br>Secondes d'attente minimum entre deux collectes."};
HHAuto_ToolTips.fr.autoSalaryMinSalary = { version: "5.20.3", elementText: "Salaire mini", tooltip: "(Integer)<br>Salare minium pour démarrer la collecte"};
HHAuto_ToolTips.fr.autoSalaryMaxTimer = { version: "5.20.3", elementText: "Temps de collecte max", tooltip: "(Integer)<br>X secs pour collecter le salaire avant d'arrêter."};
HHAuto_ToolTips.fr.autoMission = { version: "5.6.24", elementText: "Missions", tooltip: "Si activé : lance automatiquement les missions."};
HHAuto_ToolTips.fr.autoMissionCollect = { version: "5.6.24", elementText: "Collecter", tooltip: "Si activé : collecte automatiquement les récompenses des missions."};
HHAuto_ToolTips.fr.compactMissions ={ version: "5.24.0", elementText: "Compacter", tooltip: "Compacter l'affichage des missions"};
HHAuto_ToolTips.fr.autoTrollBattle = { version: "5.6.24", elementText: "Activer", tooltip: "Si activé : combat automatiquement le troll."};
HHAuto_ToolTips.fr.autoTrollSelector = { version: "5.6.24", elementText: "Sélection troll", tooltip: "Sélection du troll à combattre"};
HHAuto_ToolTips.fr.autoTrollThreshold = { version: "5.6.24", elementText: "Réserve", tooltip: "Points de combat de trolls (poings) minimum à conserver"};
HHAuto_ToolTips.fr.eventTrollOrder = { version: "5.6.24", elementText: "Ordre Trolls d'événement", tooltip: "Permet de sélectionner l'ordre dans lequel les trolls d'événements sont automatiquement combattus."};
HHAuto_ToolTips.fr.firstTrollWithGirls = { version: "5.32.0", elementText: "Premier troll avec une fille"};
HHAuto_ToolTips.fr.lastTrollWithGirls = { version: "5.32.0", elementText: "Dernier troll avec une fille"};
HHAuto_ToolTips.fr.plusEvent = { version: "5.6.24", elementText: "+Evénmt.", tooltip: "Si activé : ignore le troll sélectionné et combat les trolls d'événement s'il y a une fille à gagner."};
HHAuto_ToolTips.fr.plusEventMythic = { version: "5.6.24", elementText: "+Evénmt. mythique", tooltip: "Si activé : ignorer le troll sélectionné et combat le troll d'événement mythique s'il y a une fille à gagner et des fragments disponibles."};
HHAuto_ToolTips.fr.autoSeason = { version: "5.6.24", elementText: "Activer", tooltip: "Si activé : combat automatique de saison (Adversaire sélectionné avec PowerCalc)."};
HHAuto_ToolTips.fr.autoSeasonCollect = { version: "5.6.24", elementText: "Collecter", tooltip: "Si activé : collecte automatiquement les récompenses de saison (si plusieurs à collecter, en collectera une par combat)."};
HHAuto_ToolTips.fr.autoSeasonThreshold = { version: "5.6.24", elementText: "Réserve", tooltip: "Points de combat de saison (Baiser) minimum à conserver."};
HHAuto_ToolTips.fr.autoQuest = { version: "5.6.24", elementText: "Quête", tooltip: "Si activé : Fait automatiquement les quêtes"};
HHAuto_ToolTips.fr.autoQuestThreshold = { version: "5.6.24", elementText: "Réserve", tooltip: "Energie de quête minimum à conserver"};
HHAuto_ToolTips.fr.autoContest = { version: "5.6.24", elementText: "Compét'", tooltip: "Si activé : récolter les récompenses de la compét' terminée"};
HHAuto_ToolTips.fr.compactEndedContests = { version: "5.24.0", elementText: "Compacter", tooltip: "Compacter l'affichage des compet'"};
HHAuto_ToolTips.fr.autoFreePachinko = { version: "5.6.24", elementText: "Pachinko", tooltip: "Si activé : collecte automatiquement les Pachinkos gratuits"};
HHAuto_ToolTips.fr.autoMythicPachinko = { version: "5.6.24", elementText: "Pachinko mythique"};
HHAuto_ToolTips.fr.autoEquipmentPachinko = { version: "5.34.9", elementText: "Pachinko d'équipment"};
HHAuto_ToolTips.fr.autoLeagues = { version: "5.6.24", elementText: "Activer", tooltip: "Si activé : Combattre automatiquement en Ligues"};
HHAuto_ToolTips.fr.autoLeaguesPowerCalc = { version: "5.6.24", elementText: "Utiliser PowerCalc", tooltip: "Si activé : choisira l'adversaire en utilisant PowerCalc (la liste des adversaires expire toutes les 10 minutes et prend quelques minutes pour être construite)."};
HHAuto_ToolTips.fr.autoLeaguesCollect = { version: "5.6.24", elementText: "Collecter", tooltip: "Si activé : Collecte automatiquement les récompenses de la Ligue terminée"};
HHAuto_ToolTips.fr.autoLeaguesSelector = { version: "5.6.24", elementText: "Ligue ciblée", tooltip: "Objectif de niveau de ligue (à atteindre, à conserver ou à dépasser selon le choix)."};
HHAuto_ToolTips.fr.autoLeaguesAllowWinCurrent = {version: "5.6.24", elementText:"Autoriser dépassement", tooltip: "Si activé, le script tentera de gagner la ligue ciblée puis rétrogradera la semaine suivante pour retourner dans la ligue ciblée."};
HHAuto_ToolTips.fr.autoLeaguesThreshold = { version: "5.6.24", elementText: "Réserve", tooltip: "Points de combat de ligue minimum à conserver."};
HHAuto_ToolTips.fr.autoPowerPlaces = { version: "5.6.24", elementText: "Lieux de pouvoir", tooltip: "Si activé : Fait automatiquement les lieux de pouvoir."};
HHAuto_ToolTips.fr.autoPowerPlacesIndexFilter = { version: "5.6.24", elementText: "Filtre", tooltip: "Permet de définir un filtre et un ordre sur les lieux de pouvoir à faire (uniquement lorsque plusieurs lieux de pouvoir expirent en même temps)."};
HHAuto_ToolTips.fr.autoPowerPlacesAll = { version: "5.6.24", elementText: "Tous", tooltip: "Si activé : ignore le filtre et fait tous les lieux de pouvoir (mettra à jour le filtre avec les identifiants actuels)"};
HHAuto_ToolTips.fr.compactPowerPlace = { version: "5.24.0", elementText: "Compacter", tooltip: "Compacter l'affichage des leux de pouvoir"};
HHAuto_ToolTips.fr.autoChampsTitle = { version: "5.6.24", elementText: "Champions"};
HHAuto_ToolTips.fr.autoChamps = { version: "5.6.24", elementText: "Normal", tooltip: "Si activé : combat automatiquement les champions (s'ils sont démarrés manuellement et en filtre uniquement)."};
HHAuto_ToolTips.fr.autoChampsUseEne = { version: "5.6.24", elementText: "Achat tickets", tooltip: "Si activé : utiliser l'énergie pour acheter des tickets de champion (60 énergie nécessaire ; ne marchera pas si Quête auto activée)."};
HHAuto_ToolTips.fr.autoChampsFilter = { version: "5.6.24", elementText: "Filtre", tooltip: "Permet de filtrer les champions à combattre."};
HHAuto_ToolTips.fr.goToClubChampions = { version: "5.25.0", elementText: "Aller au Champion de Club"};
HHAuto_ToolTips.fr.autoStatsSwitch = { version: "5.6.24", elementText: "Stats", tooltip: "Achète automatiquement des statistiques sur le marché."};
HHAuto_ToolTips.fr.autoStats = { version: "5.6.24", elementText: "Argent à garder", tooltip: "Argent minimum à conserver lors de l'achat automatique de statistiques."};
HHAuto_ToolTips.fr.autoExpW = { version: "5.6.24", elementText: "Livres", tooltip: "Si activé : permet d'acheter des livres d'expérience sur le marché tout en respectant les limites d'expérience et d'argent ci-après."};
HHAuto_ToolTips.fr.autoExp = { version: "5.6.24", elementText: "Argent à garder", tooltip: "Argent minimum à conserver lors de l'achat automatique de livres d'expérience."};
HHAuto_ToolTips.fr.maxExp = { version: "5.6.24", elementText: "Exp. max", tooltip: "Expérience maximum en stock pour l'achat de livres d'expérience."};
HHAuto_ToolTips.fr.autoAffW = { version: "5.6.24", elementText: "Cadeaux", tooltip: "Si activé : permet d'acheter des cadeaux d'affection sur le marché tout en respectant les limites d'affection et d'argent ci-après."};
HHAuto_ToolTips.fr.autoAff = { version: "5.6.24", elementText: "Argent à garder", tooltip: "Argent minimum à conserver lors de l'achat automatique de cadeaux d'affection."};
HHAuto_ToolTips.fr.maxAff = { version: "5.6.24", elementText: "Aff. max", tooltip: "Affection maximum en stock pour l'achat de cadeaux d'affection."};
HHAuto_ToolTips.fr.OpponentListBuilding = { version: "5.6.24", elementText: "La liste des adversaires est en construction", tooltip: ""};
HHAuto_ToolTips.fr.OpponentParsed = { version: "5.6.24", elementText: "adversaires parcourus", tooltip: ""};
HHAuto_ToolTips.fr.DebugMenu = { version: "5.6.24", elementText: "Debug Menu", tooltip: "Options pour le debug"};
HHAuto_ToolTips.fr.DebugOptionsText = { version: "5.6.24", elementText: "Les boutons ci-dessous permette de modifier les variables du script, a utiliser avec prudence.", tooltip: ""};
HHAuto_ToolTips.fr.DeleteTempVars = { version: "5.6.24", elementText: "Supprimer les variables temporaires", tooltip: "Supprime toutes les variables temporaire du script."};
HHAuto_ToolTips.fr.ResetAllVars = { version: "5.6.24", elementText: "Réinitialiser", tooltip: "Remettre toutes les options par default"};
HHAuto_ToolTips.fr.DebugFileText = { version: "5.6.24", elementText: "Cliquer sur le boutton ci-dessous pour produire une journal de debug.", tooltip: ""};
HHAuto_ToolTips.fr.OptionCancel = { version: "5.6.24", elementText: "Annuler", tooltip: ""};
HHAuto_ToolTips.fr.SeasonMaskRewards = { version: "5.6.24", elementText: "Masquer gains", tooltip: "Permet de masquer les gains réclamés de la saison."};
HHAuto_ToolTips.fr.globalTitle = { version: "5.6.24", elementText: "Général"};
HHAuto_ToolTips.fr.displayTitle = { version: "5.6.24", elementText: "Affichage"};
HHAuto_ToolTips.fr.autoActivitiesTitle = { version: "5.6.24", elementText: "Activités"};
HHAuto_ToolTips.fr.autoTrollTitle = { version: "5.6.24", elementText: "Combat troll"};
HHAuto_ToolTips.fr.autoSeasonTitle = { version: "5.6.24", elementText: "Saison"};
HHAuto_ToolTips.fr.autoLeaguesTitle = { version: "5.6.24", elementText: "Ligues"};
HHAuto_ToolTips.fr.PoAMaskRewards = { version: "5.6.24", elementText: "Cacher gains chemin", tooltip: "Si activé : masque les récompenses déjà réclamées du chemin d'affection."};
HHAuto_ToolTips.fr.showTooltips = { version: "5.6.24", elementText: "Infobulles", tooltip: "Si activé : affiche des bulles d'aide lors du survol des éléments avec la souris."};
HHAuto_ToolTips.fr.autoClubChamp = { version: "5.6.24", elementText: "Club", tooltip: "Si activé : combat automatiquement le champion de club si au moins un combat a déjà été effectué."};
HHAuto_ToolTips.fr.autoClubChampMax = { version: "5.6.24", elementText: "Max. tickets par session", tooltip: "Nombre maximum de ticket à utiliser sur une même session du champion de club."};
HHAuto_ToolTips.fr.showMarketTools = { version: "5.6.24", elementText: "Outils du marché", tooltip: "Si activé : affiche des icones supplémentaires dans le marché pour trier et vendre automatiquement l'équipement."};
HHAuto_ToolTips.fr.useX10Fights = { version: "5.6.24", elementText: "Combats x10", tooltip: "<p style='color:red'>/!\\ Dépense des Kobans /!\\<br>("+HHAuto_ToolTips.fr.spendKobans0.elementText+" doit être activé)</p>Si activé : <br>utilise le bouton x10 si 10 combats sont disponibles (Si Dépense Kobans activée et suffisamment de kobans en banque)."};
HHAuto_ToolTips.fr.useX50Fights = { version: "5.6.24", elementText: "Combats x50", tooltip: '<p style="color:red">/!\\ Dépense des Kobans /!\\<br>('+HHAuto_ToolTips.fr.spendKobans0.elementText+' doit être activé)</p>Si activé : <br>utilise le bouton x50 si 50 combats sont disponibles (Si Dépense Kobans activée et suffisamment de kobans en banque).'};
HHAuto_ToolTips.fr.autoBuy = { version: "5.6.24", elementText: "Marché"};
HHAuto_ToolTips.fr.minShardsX50 = { version: "5.6.24", elementText: "Frags min. x50", tooltip: "Utiliser le bouton x50 si le nombre de fragments restant est supérieur ou égal à..."};
HHAuto_ToolTips.fr.minShardsX10 = { version: "5.6.24", elementText: "Frags min. x10", tooltip: "Utiliser le bouton x10 si le nombre de fragments restant est supérieur ou égal à..."};
HHAuto_ToolTips.fr.autoMissionKFirst = { version: "5.6.24", elementText: "Prioriser Kobans", tooltip: "Si activé : commence par les missions qui rapportent des kobans."};
HHAuto_ToolTips.fr.povpogTitle = { version: "5.6.133", elementText: "Voie de la Valeur/Gloire"};
HHAuto_ToolTips.fr.povTitle = { version: "5.20.3", elementText: "Voie de la Valeur"};
HHAuto_ToolTips.fr.pogTitle = { version: "5.20.3", elementText: "Voie de la Gloire"};
HHAuto_ToolTips.fr.seasonalEventTitle = { version: "5.6.133", elementText: "Evènements saisoniers"};
HHAuto_ToolTips.fr.mousePause = {version: "5.6.135", elementText: "Pause souris", tooltip: "Pause le script pour 5 secondes quand des mouvements de la souris sont detecté. Evite le sript d'interrompre les actions manuelles. (en ms, 5000ms=5s)"};
HHAuto_ToolTips.fr.PoVMaskRewards = { version: "5.6.133", elementText: "Masquer gains VDLV", tooltip: "Permet de masquer les gains réclamés de la Voie de la Valeur."};
HHAuto_ToolTips.fr.PoGMaskRewards = { version: "5.6.133", elementText: "Masquer gains VDLG", tooltip: "Permet de masquer les gains réclamés de la Voie de la Gloire."};
HHAuto_ToolTips.fr.SeasonalEventMaskRewards = { version: "5.6.133", elementText: "Masquer gains saisonier", tooltip: "Permet de masquer les gains réclamés des évènements saisoniers."};
HHAuto_ToolTips.fr.bossBangEvent = { version: "5.20.3", elementText: "Activer", tooltip: "Si activé : Effectue les combats boss bang en commençant par l'équipe configuré si après."};
HHAuto_ToolTips.fr.bossBangEventTitle = { version: "5.20.3", elementText: "Evènements Boss Bang"};
HHAuto_ToolTips.fr.bossBangMinTeam = { version: "5.6.137", elementText: "Première équipe", tooltip: "Première équipe à utiliser<br>Si 5, le script commencera par la dernière pour finir par la premiere."};
HHAuto_ToolTips.fr.autoFreeBundlesCollect = {version: "5.16.0", elementText: "Collecter offres gratuites", tooltip: "Permet de collecter les offres gratuites."};
HHAuto_ToolTips.fr.dailyGoalsTitle = {version: "5.24.0", elementText: "Objectifs journalier"};
HHAuto_ToolTips.fr.autoDailyGoalsCollect = {version: "5.24.0", elementText: "Collecter", tooltip: "Permet de collecter les objectifs journaliers si non collectés 2 heures avant la fin du jour HH."};
HHAuto_ToolTips.fr.compactDailyGoals = { version: "5.24.0", elementText: "Compacter", tooltip: "Compacter l'affichage des objectifs journalier"};
HHAuto_ToolTips.fr.autoPoVCollect = { version: "5.6.133", elementText: "Collecter VDLV", tooltip: "Permet de collecter les gains de la Voie de la Valeur."};
HHAuto_ToolTips.fr.autoSeasonalEventCollect = { version: "5.7.0", elementText: "Collecter", tooltip: "Permet de collecter les gains des évènements saisoniers."};
HHAuto_ToolTips.fr.autoPoGCollect = { version: "5.6.133", elementText: "Collecter VDLG", tooltip: "Permet de collecter les gains de la Voie de la Gloire."};
HHAuto_ToolTips.fr.autoPantheonTitle = {version: "5.6.24", elementText: "Pantheon", tooltip: ""};
HHAuto_ToolTips.fr.autoPantheon = { version: "5.6.24", elementText: "Activer", tooltip: "Si activé : combat automatiquement le Pantheon"};
HHAuto_ToolTips.fr.autoPantheonThreshold = { version: "5.6.24", elementText: "Réserve", tooltip: "Vénération minimum à garder<br>Max 10"};
HHAuto_ToolTips.fr.autoTrollMythicByPassParanoia = { version: "5.6.24", elementText: "Mythique annule paranoïa", tooltip: "Si activé : autorise le script à ne pas respecter le mode Parano lors d'un événement mythique.<br>Si la prochaine vague est pendant une phase de sommeil le script combattra quand même<br>tant que des combats et des fragments sont disponibles."};
HHAuto_ToolTips.fr.buyMythicCombat = { version: "5.6.24", elementText: "Achat comb. pour mythique", tooltip: "<p style='color:red'>/!\\ Dépense des Kobans /!\\<br>("+HHAuto_ToolTips.fr.spendKobans0.elementText+" doit être activé)</p>Si activé : achète des points de combat (poings) pendant les X dernières heures de l'événement mythique (sans dépasser la limite de la banque de kobans), passera outre la réserve de combats si nécessaire."};
HHAuto_ToolTips.fr.buyMythicCombTimer = { version: "5.6.24", elementText: "Heures d'achat comb.", tooltip: "(Nombre entier)<br>X dernières heures de l'événement mythique"};
HHAuto_ToolTips.fr.mythicGirlNext = { version: "5.6.24", elementText: "Vague mythique"};
HHAuto_ToolTips.fr.PachinkoFillOrbs = {version: "5.6.134", elementText: 'Remplir orbes', tooltip: "Remplir le champs avec toutes les orbes disponibles."};

;// CONCATENATED MODULE: ./src/i18n/de.js


HHAuto_ToolTips.de.saveDebug = { version: "5.6.24", elementText: "Save Debug", tooltip: "Erlaube das Erstellen einer Debug Log Datei."};
HHAuto_ToolTips.de.gitHub = { version: "5.6.24", elementText: "GitHub", tooltip: "Link zum GitHub Projekt."};
HHAuto_ToolTips.de.saveConfig = { version: "5.6.24", elementText: "Save Config", tooltip: "Erlaube die Einstellung zu speichern."};
HHAuto_ToolTips.de.loadConfig = { version: "5.6.24", elementText: "Load Config", tooltip: "Erlaube die Einstellung zu laden."};
HHAuto_ToolTips.de.master = { version: "5.6.24", elementText: "Master Schalter", tooltip: "An/Aus Schalter für das Skript"};
HHAuto_ToolTips.de.settPerTab = { version: "5.6.24", elementText: "Einstellung per Tab", tooltip: "Erlaube die Einstellungen nur für diesen Tab zu setzen."};
HHAuto_ToolTips.de.paranoia = { version: "5.6.24", elementText: "Paranoia Modus", tooltip: "Erlaube es Schlaf zu simulieren und einen menschlichen Nutzer (wird weiter dokumentiert)"};
HHAuto_ToolTips.de.paranoiaSpendsBefore = { version: "5.6.24", elementText: "Gib Punkte aus vor...", tooltip: "Wenn gewollt, werden Punkte für Optionen ausgegeben (Quest, Troll, Liga und Season)<br> nur wenn sie aktiviert sind<br>und gibt Punkt aus die über dem maximal Limit sind<br> z.B.: Du hast die Power für Troll von 17, gehst aber für 4h45 in den Paranoia Modus,<br> dass heißt 17+10 Punkte (aufgerundet), welches über dem Max von 20 wäre.<br> Es würden dann 9 Punkte ausgegeben, sodass du nur bei 19 Punkten bleibst bis zum Ende des Paranoia Modus um einen Verlust zu verhindern."};
HHAuto_ToolTips.de.spendKobans0 = { version: "5.6.24", elementText: "Fragwürdige Scheiße", tooltip: "Erster Sicherheitsschalter für die Nutzung von Kobans.<br>Alle 3 müssen aktiviert sein und Kobans auszugeben."};
//HHAuto_ToolTips.de.spendKobans1 = { version: "5.6.24", elementText: "Biste sicher?", tooltip: "Zweiter Sicherheitsschalter für die Nutzung von Kobans.<br>Muss nach dem Ersten aktiviert werden.<br>Alle 3 müssen aktiviert sein und Kobans auszugeben."};
//HHAuto_ToolTips.de.spendKobans2 = { version: "5.6.24", elementText: "Du wurdest gewarnt!", tooltip: "Dritter Sicherheitsschalter für die Nutzung von Kobans <br>Muss nach dem Zweiten aktiviert werden.<br> Alle 3 müssen aktiviert sein und Kobans auszugeben."};
HHAuto_ToolTips.de.kobanBank = { version: "5.6.24", elementText: "Koban Bank", tooltip: "(Integer)<br>Minimale Anzahl an Kobans die behalten werden sollen."};
HHAuto_ToolTips.de.buyCombat = { version: "5.6.24", elementText: "Kaufe Kobans bei Events", tooltip: "'Kobans ausgeben Funktion'<br> Wenn aktiviert: <br> Kauft Kampfpunkte in den letzten X Stunden eines Events (Wenn es das Minimum nicht unterschreitet)"};
HHAuto_ToolTips.de.buyCombTimer = { version: "5.6.24", elementText: "Stunden bis Kauf", tooltip: "(Ganze pos. Zahl)<br>X verbleibende Stunden des Events"};
HHAuto_ToolTips.de.autoBuyBoosters = { version: "5.6.24", elementText: "Kaufe Booster", tooltip: "'Koban ausgeben Funktion'<br>Erlaubt es Booster im Markt zu kaufen(Wenn es das Minimum nicht unterschreitet)"};
HHAuto_ToolTips.de.autoBuyBoostersFilter = { version: "5.6.24", elementText: "Filter", tooltip: "(Werte getrennt durch ;)<br>Gib an welches Booster gekauft werden sollen, Reihenfolge wird beachtet (B1:Ginseng B2:Jujubes B3:Chlorella B4:Cordyceps)"};
HHAuto_ToolTips.de.autoSeasonPassReds = { version: "5.6.24", elementText: "Überspringe drei Rote", tooltip: "'Koban ausgeben Funktion'<br>Benutze Kobans um Season Gegner zu tauschen wenn alle drei Rote sind"};
HHAuto_ToolTips.de.showCalculatePower = { version: "5.6.24", elementText: "Zeige Kraftrechner", tooltip: "Zeige Kampfsimulationsindikator an für Liga, Kampf und Season"};
//HHAuto_ToolTips.de.calculatePowerLimits = { version: "5.6.24", elementText: "Eigene Grenzen (rot;gelb)", tooltip: "(rot;gelb)<br>Definiere deine eigenen Grenzen für rote und orange Gegner<br> -6000;0 meint<br> <-6000 ist rot, zwischen -6000 und 0 ist orange und >=0 ist grün"};
HHAuto_ToolTips.de.showInfo = { version: "5.6.24", elementText: "Zeige Info", tooltip: "Wenn aktiv : zeige Information auf Skriptwerten und nächsten Durchläufen"};
HHAuto_ToolTips.de.autoSalary = { version: "5.6.24", elementText: "Auto Einkommen", tooltip: "Wenn aktiv :<br>Sammelt das gesamte Einkommen alle X Sek."};
//HHAuto_ToolTips.de.autoSalaryMinTimer = { version: "5.6.24", elementText: "min Warten", tooltip: "(Ganze pos. Zahl)<br>X Sek bis zum Sammeln des Einkommens"};
HHAuto_ToolTips.de.autoMission = { version: "5.6.24", elementText: "AutoMission", tooltip: "Wenn aktiv : Macht automatisch Missionen"};
HHAuto_ToolTips.de.autoMissionCollect = { version: "5.6.24", elementText: "Einsammeln", tooltip: "Wenn aktiv : Sammelt automatisch Missionsgewinne"};
HHAuto_ToolTips.de.autoTrollBattle = { version: "5.6.24", elementText: "AutoTrollKampf", tooltip: "Wenn aktiv : Macht automatisch aktivierte Trollkämpfe"};
HHAuto_ToolTips.de.autoTrollSelector = { version: "5.6.24", elementText: "Troll Wähler", tooltip: "Wähle Trolle die bekämpfte werden sollen."};
HHAuto_ToolTips.de.autoTrollThreshold = { version: "5.6.24", elementText: "Schwellwert", tooltip: "Minimum an Trollpunkten die aufgehoben werden"};
HHAuto_ToolTips.de.eventTrollOrder = { version: "5.6.24", elementText: "Event Troll Reihenfolge", tooltip: "Erlaubt eine Auswahl in welcher Reihenfolge die Trolle automatisch bekämpft werden"};
HHAuto_ToolTips.de.plusEvent = { version: "5.6.24", elementText: "+Event", tooltip: "Wenn aktiv : Ignoriere ausgewählte Trolle währende eines Events, zugunsten des Events"};
HHAuto_ToolTips.de.plusEventMythic = { version: "5.6.24", elementText: "+Mythisches Event", tooltip: "Erlaubt es Mädels beim mystischen Event abzugreifen, sollte sie nur versuchen wenn auch Teile vorhanden sind"};
//HHAuto_ToolTips.de.eventMythicPrio = { version: "5.6.24", elementText: "Priorisiere über Event Troll Reihenfolge", tooltip: "Mystische Event Mädels werden über die Event Troll Reihenfolge gestellt, sofern Teile erhältlich sind"};
//HHAuto_ToolTips.de.autoTrollMythicByPassThreshold = { version: "5.6.24", elementText: "Mystische über Schwellenwert", tooltip: "Erlaubt es Punkt über den Schwellwert für das mystische Events zu nutzen"};
HHAuto_ToolTips.de.autoTrollMythicByPassParanoia = { version: "5.6.24", elementText: "Mythisch über Paranoia", tooltip: "Wenn aktiv: Erlaubt es den Paranoia Modus zu übergehen. Wenn du noch kämpfen kannst oder dir Energie kaufen kannst, wird gekämpft. Sollte die nächste Welle an Splittern während der Ruhephase sein, wird der Modus unterbrochen und es wird gekämpft"};
HHAuto_ToolTips.de.autoArenaCheckbox = { version: "5.6.24", elementText: "AutoArenaKampf", tooltip: "if enabled : Automatically do Arena (deprecated)"};
HHAuto_ToolTips.de.autoSeason = { version: "5.6.24", elementText: "AutoSeason", tooltip: "Wenn aktiv : Kämpft automatisch in der Season (Gegner werden wie im Kraftrechner einstellt gewählt)"};
HHAuto_ToolTips.de.autoSeasonCollect = { version: "5.6.24", elementText: "Einsammeln", tooltip: "Wenn aktiv : Sammelt automatisch Seasongewinne ein (bei mehr als einem, wird eines pro Küssnutzung eingesammelt)"};
HHAuto_ToolTips.de.autoSeasonThreshold = { version: "5.6.24", elementText: "Schwellwert", tooltip: "Minimum Küsse die behalten bleiben"};
HHAuto_ToolTips.de.autoQuest = { version: "5.6.24", elementText: "AutoQuest", tooltip: "Wenn aktiv : Macht automatisch Quests"};
HHAuto_ToolTips.de.autoQuestThreshold = { version: "5.6.24", elementText: "Schwellwert", tooltip: "Minimum an Energie die behalten bleibt"};
HHAuto_ToolTips.de.autoContest = { version: "5.6.24", elementText: "AutoAufgabe", tooltip: "Wenn aktiv : Sammelt abgeschlossene Aufgabenbelohnungen ein"};
HHAuto_ToolTips.de.autoFreePachinko = { version: "5.6.24", elementText: "AutoPachinko(Gratis)", tooltip: "Wenn aktiv : Sammelt freien Glücksspielgewinn ein"};
HHAuto_ToolTips.de.autoLeagues = { version: "5.6.24", elementText: "AutoLiga", tooltip: "Wenn aktiv : Kämpft automatisch in der Liga"};
HHAuto_ToolTips.de.autoLeaguesPowerCalc = { version: "5.6.24", elementText: "Nutze Kraftrechner", tooltip: "Wenn aktiv : wählt Gegner durch Kraftrechner (Gegnerliste verfällt alle 10 Min und braucht ein Minuten zur Erneuerung)"};
HHAuto_ToolTips.de.autoLeaguesCollect = { version: "5.6.24", elementText: "Einsammeln", tooltip: "Wenn aktiv : Sammelt automatisch Ligagewinn ein"};
HHAuto_ToolTips.de.autoLeaguesSelector = { version: "5.6.24", elementText: "Ligaziel", tooltip: "Ligaziel, versuche abzusteigen, Platz zu halten oder aufzusteigen"};
HHAuto_ToolTips.de.autoLeaguesThreshold = { version: "5.6.24", elementText: "Schwellwert", tooltip: "Minimum an Ligakämpfe behalten"};
HHAuto_ToolTips.de.autoPowerPlaces = { version: "5.6.24", elementText: "Auto Orte der Macht", tooltip: "Wenn aktiv : macht automatisch Orte der Macht"};
HHAuto_ToolTips.de.autoPowerPlacesIndexFilter = { version: "5.6.24", elementText: "Index Filter", tooltip: "Erlaubt es Filter zusetzen für Orte der Macht und eine Reihenfolge festzulegen (Reihenfolge wird beachtet, sollten mehrere zur gleichen Zeit fertig werden)"};
HHAuto_ToolTips.de.autoPowerPlacesAll = { version: "5.6.24", elementText: "Mach alle", tooltip: "Wenn aktiv : ignoriere Filter und mache alle (aktualisiert den Filter mit korrekten IDs)"};
HHAuto_ToolTips.de.autoChamps = { version: "5.6.24", elementText: "AutoChampions", tooltip: "Wenn aktiv : Macht automatisch Championkämpfe (nur wenn sie gestartet wurden und im Filter stehen)"};
HHAuto_ToolTips.de.autoChampsUseEne = { version: "5.6.24", elementText: "Nutze Energie", tooltip: "Wenn aktiv : Nutze Energie und kaufe Champ. Tickets"};
HHAuto_ToolTips.de.autoChampsFilter = { version: "5.6.24", elementText: "Filter", tooltip: "Erlaubt es Filter für zu bekämpfende Champions zu setzen"};
HHAuto_ToolTips.de.autoClubChamp = { version: "5.6.24", elementText: "AutoChampions", tooltip: "Wenn aktiv : Macht automatisch ClubChampionkämpfe (nur wenn sie gestartet wurden und im Filter stehen)"};
HHAuto_ToolTips.de.autoStats = { version: "5.6.24", elementText: "Min Geld verbleib", tooltip: "Kauft automatisch bessere Statuswerte im Markt mit überschüssigem Geld oberhalb des gesetzten Wertes"};
HHAuto_ToolTips.de.autoExpW = { version: "5.6.24", elementText: "Kaufe Erfahrung", tooltip: "Wenn aktiv : Erlaube Erfahrung im Markt zu kaufen<br>Kauft nur wenn dein Geld über dem Wert liegt<br>Kauft nur wenn sich im Besitz befinden potentielle Erfahrung unter dem Wert liegt"};
HHAuto_ToolTips.de.autoExp = { version: "5.6.24", elementText: "Min Geld verbleib", tooltip: "Minimum an Geld das behalten wird."};
HHAuto_ToolTips.de.maxExp = { version: "5.6.24", elementText: "Max ErfahrKauf", tooltip: "Maximum Erfahrung die gekauft wird"};
HHAuto_ToolTips.de.autoAffW = { version: "5.6.24", elementText: "KaufAnziehung", tooltip: "Wenn aktiv : Erlaube Anziehung im Markt zu kaufen<br>Kauft nur wenn dein Geld über dem Wert liegt<br>Kauft nur wenn sich im Besitz befinden potentielle Anziehung unter dem Wert liegt"};
HHAuto_ToolTips.de.autoAff = { version: "5.6.24", elementText: "Min Geld verbleib", tooltip: "Minimum an Geld das behalten wird."};
HHAuto_ToolTips.de.maxAff = { version: "5.6.24", elementText: "Max AnziehungKauf", tooltip: "Maximum an Anziehung die gekauft wird"};
HHAuto_ToolTips.de.OpponentListBuilding = { version: "5.6.24", elementText: "Gegnerliste wird erstellt", tooltip: ""};
HHAuto_ToolTips.de.OpponentParsed = { version: "5.6.24", elementText: "Gegner analysiert", tooltip: ""};
HHAuto_ToolTips.de.povTitle = { version: "5.20.3", elementText: "Pfad der Tapferkeit (PoV)"};
HHAuto_ToolTips.de.pogTitle = { version: "5.20.3", elementText: "Pfad des Ruhmes (PoG)"};

;// CONCATENATED MODULE: ./src/i18n/es.js


HHAuto_ToolTips.es.saveDebug = { version: "5.6.24", elementText: "Salvar Debug", tooltip: "Permite generar un fichero log de depuración."};
HHAuto_ToolTips.es.gitHub = { version: "5.6.24", elementText: "GitHub", tooltip: "Link al proyecto GitHub."};
HHAuto_ToolTips.es.saveConfig = { version: "5.6.24", elementText: "Salvar config.", tooltip: "Permite salvar la configuración."};
HHAuto_ToolTips.es.loadConfig = { version: "5.6.24", elementText: "Cargar config", tooltip: "Permite cargar la configuración."};
HHAuto_ToolTips.es.master = { version: "5.6.24", elementText: "Switch maestro", tooltip: "Interruptor de Encendido/Apagado para el script completo"};
HHAuto_ToolTips.es.settPerTab = { version: "5.6.24", elementText: "Configuración por ventana", tooltip: "Aplica las opciones sólo a esta ventana"};
HHAuto_ToolTips.es.paranoia = { version: "5.6.24", elementText: "Modo Paranoia", tooltip: "Permite simular sueño, y un usuario humano (Pendiente de documentación)"};
HHAuto_ToolTips.es.paranoiaSpendsBefore = { version: "5.6.24", elementText: "Gasta puntos antes", tooltip: "\'On\' gastará puntos para opciones (aventura, villanos, ligas y temporada) sólo si éstos están habilitados y gasta puntos que estarían por encima de los límites máximos.<br>Ej : Tienes energia para 17 combates de villanos, pero estarás 4h45m en paranoia.<br> Esto es tener 17+10 combates (redondeado al entero superior), estando así por encima del máximo de 20<br> gastará 8 combates para quedar con 19 al final de la Paranoia, evitando perder puntos."};
HHAuto_ToolTips.es.spendKobans0 = { version: "5.6.24", elementText: "Kobans securidad", tooltip: "Interruptor de seguridad para el uso de kobans,tienen que estar activados para las funciones de gasto de Kobans"};
//HHAuto_ToolTips.es.spendKobans1 = { version: "5.6.24", elementText: "¿Estás seguro?", tooltip: "Segundo interruptor de seguridad para el uso de kobans <br>Tiene que ser activado después del primero.<br> Los 3 tienen que estar activados para las funciones de gasto de Kobans"};
//HHAuto_ToolTips.es.spendKobans2 = { version: "5.6.24", elementText: "Has sido advertido", tooltip: "Tercer interruptor de seguridad para el uso de kobans <br>Tiene que ser activado después del segundo.<br> Los 3 tienen que estar activados para las funciones de gasto de Kobans"};
HHAuto_ToolTips.es.kobanBank = { version: "5.6.24", elementText: "Banco de Kobans", tooltip: "(Entero)<br>Minimo de Kobans a conservar cuando se usan funciones de gasto de Kobans"};
HHAuto_ToolTips.es.buyCombat = { version: "5.6.24", elementText: "Compra comb. en eventos", tooltip: "Funciones de gasto de Kobans<br>Si habilitado: <br>Compra puntos de combate durante las últimas X horas del evento (si no se baja del valor de Banco de Kobans)"};
HHAuto_ToolTips.es.buyCombTimer = { version: "5.6.24", elementText: "Horas para comprar Comb", tooltip: "(Entero)<br>X últimas horas del evento"};
HHAuto_ToolTips.es.autoBuyBoosters = { version: "5.6.24", elementText: "Compra Potenciad. Leg.", tooltip: "Funciones de gasto de Kobans<br>Permite comprar potenciadores en el mercado (si no se baja del valor de Banco de Kobans)"};
HHAuto_ToolTips.es.autoBuyBoostersFilter = { version: "5.6.24", elementText: "Filtro", tooltip: "(valores separados por ;)<br>Selecciona que potenciador comprar, se respeta el orden (B1:Ginseng B2:Azufaifo B3:Clorela B4:Cordyceps)"};
HHAuto_ToolTips.es.autoSeasonPassReds = { version: "5.6.24", elementText: "Pasa 3 rojos", tooltip: "Funciones de gasto de Kobans<br>Usa kobans para renovar oponentes si los 3 rojos"};
HHAuto_ToolTips.es.showCalculatePower = { version: "5.6.24", elementText: "Mostar PowerCalc", tooltip: "Muestra simulador de batalla para Liga, batallas, Temporadas "};
//HHAuto_ToolTips.es.calculatePowerLimits = { version: "5.6.24", elementText: "Límites propios (rojo;naranja)", tooltip: "(rojo;naranja)<br>Define tus propios límites rojos y naranjas para los oponentes<br> -6000;0 significa<br> <-6000 is rojo, entre -6000 and 0 is naranja and >=0 is verde"};
HHAuto_ToolTips.es.showInfo = { version: "5.6.24", elementText: "Muestra info", tooltip: "Si habilitado: muestra información de los valores del script y siguientes ejecuciones"};
HHAuto_ToolTips.es.autoSalary = { version: "5.6.24", elementText: "AutoSal.", tooltip: "(Entero)<br>Si habilitado:<br>Recauda salario cada X segundos"};
//HHAuto_ToolTips.es.autoSalaryMinTimer = { version: "5.6.24", elementText: "min espera", tooltip: "(Entero)<br>X segundos para recaudar salario"};
HHAuto_ToolTips.es.autoMission = { version: "5.6.24", elementText: "AutoMision", tooltip: "Si habilitado: Juega misiones de manera automática"};
HHAuto_ToolTips.es.autoMissionCollect = { version: "5.6.24", elementText: "Recaudar", tooltip: "Si habilitado: Recauda misiones de manera automática"};
HHAuto_ToolTips.es.autoTrollBattle = { version: "5.6.24", elementText: "AutoVillano", tooltip: "Si habilitado: Combate villano seleccionado de manera automática"};
HHAuto_ToolTips.es.autoTrollSelector = { version: "5.6.24", elementText: "Selector villano", tooltip: "Selecciona villano para luchar."};
HHAuto_ToolTips.es.autoTrollThreshold = { version: "5.6.24", elementText: "Límite", tooltip: "(Entero 0 a 19)<br>Mínimo combates a guardar"};
HHAuto_ToolTips.es.eventTrollOrder = { version: "5.6.24", elementText: "Orden combate villano", tooltip: "(Valores separados por ;)<br>Permite seleccionar el orden de combate automático de los villanos"};
HHAuto_ToolTips.es.plusEvent = { version: "5.6.24", elementText: "+Evento", tooltip: "Si habilitado: ignora al villano seleccionado durante un evento para luchar el evento"};
HHAuto_ToolTips.es.plusEventMythic = { version: "5.6.24", elementText: "+Evento Mythic", tooltip: "Habilita obtener chicas del evento mítico, solo debería jugar cuando haya fragmentos disponibles"};
//HHAuto_ToolTips.es.eventMythicPrio = { version: "5.6.24", elementText: "Prioriza sobre el orden de evento de villano", tooltip: "La chica del evento mítico es prioritaria sobre el orden del evento de villanos si hay fragmentos disponibles"};
//HHAuto_ToolTips.es.autoTrollMythicByPassThreshold = { version: "5.6.24", elementText: "Mítico supera límite", tooltip: "Permite que el evento mítico supere el límite de villano"};
HHAuto_ToolTips.es.autoArenaCheckbox = { version: "5.6.24", elementText: "AutoBatallaArena", tooltip: "Si habilitado: Combate en Arena de manera automática (obsoleta)"};
HHAuto_ToolTips.es.autoSeason = { version: "5.6.24", elementText: "AutoTemporada", tooltip: "Si habilitado: Combate en emporadas de manera automática (Oponente elegido según Calculadora de energía)"};
HHAuto_ToolTips.es.autoSeasonCollect = { version: "5.6.24", elementText: "Recaudar", tooltip: "Se habilitado: Recauda temporadas de manera automática (Si multiples para recaudar, recaudará uno por cada uso de beso)"};
HHAuto_ToolTips.es.autoSeasonThreshold = { version: "5.6.24", elementText: "Límite", tooltip: "Mínimos besos a conservar"};
HHAuto_ToolTips.es.autoQuest = { version: "5.6.24", elementText: "AutoAventura", tooltip: "Si habilitado : Juega aventura de manera automática"};
HHAuto_ToolTips.es.autoQuestThreshold = { version: "5.6.24", elementText: "Límite", tooltip: "(Entero entre 0 y 99)<br>Minima energía a conservar"};
HHAuto_ToolTips.es.autoContest = { version: "5.6.24", elementText: "AutoCompetición", tooltip: "Si habilitado: Recauda recompensas de competición finalizada"};
HHAuto_ToolTips.es.autoFreePachinko = { version: "5.6.138", elementText: "AutoPachinko (Gratis)", tooltip: "Si habilitado: Recauda pachinkos gratuitos de manera automática"};
HHAuto_ToolTips.es.autoLeagues = { version: "5.6.24", elementText: "AutoLigas", tooltip: "Si habilitado: Combate en ligas de manera automática"};
HHAuto_ToolTips.es.autoLeaguesPowerCalc = { version: "5.6.24", elementText: "UsarCalcPotencia", tooltip: "Si habilitado: Elige oponentes usando calculadora de potencia (La lista expira cada 10 mins. y tarda pocos minutos en reconstruirse)"};
HHAuto_ToolTips.es.autoLeaguesCollect = { version: "5.6.24", elementText: "Recaudar", tooltip: "Si habilitado: Recauda premios de ligas de manera automática"};
HHAuto_ToolTips.es.autoLeaguesSelector = { version: "5.6.24", elementText: "Liga objetivo", tooltip: "Liga objetivo, para intentar descender, permanecer o ascender a otra liga en función de ello"};
HHAuto_ToolTips.es.autoLeaguesThreshold = { version: "5.6.24", elementText: "Límite", tooltip: "Mínimos combates de liga a conservar"};
HHAuto_ToolTips.es.autoPowerPlaces = { version: "5.6.24", elementText: "AutoLugaresPoder", tooltip: "Si habilitado: Juega Lugares de Poder de manera automática"};
HHAuto_ToolTips.es.autoPowerPlacesIndexFilter = { version: "5.6.24", elementText: "Filtro de índice", tooltip: "Permite establecer un filto y un orden para jugar Lugares de Poder (el orden solo se respeta cuando multiples Lugares de Poder finalizan al mismo tiempo)"};
HHAuto_ToolTips.es.autoPowerPlacesAll = { version: "5.6.24", elementText: "Juega todos", tooltip: "Si habilitado: ignora el filtro y juega todos los Lugares de Poder (actualizará del Filtro con las actuales ids)"};
HHAuto_ToolTips.es.autoChamps = { version: "5.6.138", elementText: "Auto Campeones", tooltip: "Si habilitado: Combate a campeones de manera automática (Sólo si han empezado un combate y están en el filtro)"};
HHAuto_ToolTips.es.autoChampsUseEne = { version: "5.6.24", elementText: "UsaEne", tooltip: "Si habilitado: Usa energía para comprar tickets"};
HHAuto_ToolTips.es.autoChampsFilter = { version: "5.6.24", elementText: "Filtro", tooltip: "Permite establecer un filtro para luchar con campeones"};
HHAuto_ToolTips.es.autoStats = { version: "5.6.24", elementText: "Min dinero", tooltip: "(Entero)<br>Compra equipamiento de manera automática en el mercado con dinero por encima de la cantidad establecida"};
HHAuto_ToolTips.es.autoExpW = { version: "5.6.24", elementText: "Compra exp", tooltip: "Si habilitado: Compra experiencia en el mercado<br>Solo si el dinero en el banco es superior a este valor<br>Solo compra si el total de experiencia poseída está por debajo de este valor"};
HHAuto_ToolTips.es.autoExp = { version: "5.6.24", elementText: "Min dinero", tooltip: "(Entero)<br>Mínimo dinero a guardar."};
HHAuto_ToolTips.es.maxExp = { version: "5.6.24", elementText: "Max experiencia", tooltip: "(Entero)<br>Máxima experiencia a comprar"};
HHAuto_ToolTips.es.autoAffW = { version: "5.6.24", elementText: "Compra afec", tooltip: "Si habilitado: Compra afecto en el mercado<br>Solo si el dinero en el banco es superior a este valor<br>Solo compra si el total de afecto poseído está por debajo de este valor"};
HHAuto_ToolTips.es.autoAff = { version: "5.6.24", elementText: "Min dinero", tooltip: "(Entero)<br>Mínimo dinero a guardar"};
HHAuto_ToolTips.es.maxAff = { version: "5.6.24", elementText: "Max afecto", tooltip: "(Entero)<br>Máximo afecto a comprar"};
HHAuto_ToolTips.es.OpponentListBuilding = { version: "5.6.24", elementText: "Lista de oponentes en construcción", tooltip: ""};
HHAuto_ToolTips.es.OpponentParsed = { version: "5.6.24", elementText: "opositores analizados", tooltip: ""};
HHAuto_ToolTips.es.DebugMenu = { version: "5.6.24", elementText: "Menú depur.", tooltip: "Opciones de depuración"};
HHAuto_ToolTips.es.DebugOptionsText = { version: "5.6.24", elementText: "Los botones a continuación permiten modificar el almacenamiento del script, tenga cuidado al usarlos.", tooltip: ""};
HHAuto_ToolTips.es.DeleteTempVars = { version: "5.6.24", elementText: "Borra almacenamiento temp.", tooltip: "Borra todo el almacenamiento temporal del script."};
HHAuto_ToolTips.es.ResetAllVars = { version: "5.6.24", elementText: "Restaura por defecto", tooltip: "Restaura la configuración por defecto."};
HHAuto_ToolTips.es.DebugFileText = { version: "5.6.24", elementText: "Click en el siguiente botón para generar un fichero log de depuración", tooltip: ""};
HHAuto_ToolTips.es.OptionCancel = { version: "5.6.24", elementText: "Cancelar", tooltip: ""};
HHAuto_ToolTips.es.SeasonMaskRewards = { version: "5.6.24", elementText: "Enmascara recompensas", tooltip: "Permite enmascarar todas las recompensas reclamadas en la pantalla de Temporada"};
HHAuto_ToolTips.es.autoClubChamp = { version: "5.6.24", elementText: "AutoClubCamp", tooltip: "Si habilitado: Combate al campeón del club de manera automática"};
HHAuto_ToolTips.es.autoTrollMythicByPassParanoia = { version: "5.6.24", elementText: "Mítico ignora paranoia", tooltip: "Permite al mítico ignorar paranoia. Si la siguiente liberación es durante el descanso forzará despertarse para jugar. Si todavía pelea o puede comprar peleas, continuará."};
HHAuto_ToolTips.es.buyMythicCombat = { version: "5.6.24", elementText: "Compra comb. para mítico", tooltip: "Función de gasto de Kobans<br>Si habilitado: <br>Comprar puntos de combate durante las últimas X horas del evento mítico (si no se baja del valor de Banco de Kobans)"};
HHAuto_ToolTips.es.buyMythicCombTimer = { version: "5.6.24", elementText: "Horas para comprar comb.Mítico", tooltip: "(Entero)<br>X últimas horas del evento mítico"};
HHAuto_ToolTips.es.DebugResetTimerText = { version: "5.6.24", elementText: "El selector a continuación permite restablecer los temporizadores", tooltip: ""};
HHAuto_ToolTips.es.timerResetSelector = { version: "5.6.24", elementText: "Seleccionar temporizador", tooltip: "Selecciona el temporizador a restablecer"};
HHAuto_ToolTips.es.timerResetButton = { version: "5.6.24", elementText: "Restablecer", tooltip: "Establece el temporizador a 0."};
HHAuto_ToolTips.es.timerLeftTime = { version: "5.6.24", elementText: "", tooltip: "Tiempo restante"};
HHAuto_ToolTips.es.timerResetNoTimer = { version: "5.6.24", elementText: "No hay temporizador seleccionado", tooltip: ""};
HHAuto_ToolTips.es.povTitle = { version: "5.20.3", elementText: "Camino del Valor"};
HHAuto_ToolTips.es.pogTitle = { version: "5.20.3", elementText: "Camino de la Gloria"};

;// CONCATENATED MODULE: ./src/i18n/index.js






;// CONCATENATED MODULE: ./src/Helper/LanguageHelper.js



function getLanguageCode()
{
    let HHAuto_Lang = 'en';
    try
    {
        if ($('html')[0].lang === 'en') {
            HHAuto_Lang = 'en';
        }
        else if ($('html')[0].lang === 'fr') {
            HHAuto_Lang = 'fr';
        }
        else if ($('html')[0].lang === 'es_ES') {
            HHAuto_Lang = 'es';
        }
        else if ($('html')[0].lang === 'de_DE') {
            HHAuto_Lang = 'de';
        }
        else if ($('html')[0].lang === 'it_IT') {
            HHAuto_Lang = 'it';
        }
        else if ($('html')[0].lang === 'ja_JP') {
            HHAuto_Lang = 'ja';
        }
        else if ($('html')[0].lang === 'ru_RU') {
            HHAuto_Lang = 'ru';
        }
    }
    catch
    {
    }
    return HHAuto_Lang;
}

/*
 0: version strings are equal
 1: version a is greater than b
-1: version b is greater than a
*/
function cmpVersions(a, b)
{
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }) ;
}

function getTextForUI(id,type)
{
    let HHAuto_Lang = getLanguageCode();
    let defaultLanguageText = null;
    let defaultLanguageVersion = "0";

    //console.log(id);
    if (HHAuto_ToolTips['en'] !== undefined && HHAuto_ToolTips['en'][id] !== undefined && HHAuto_ToolTips['en'][id][type] !== undefined)
    {
        defaultLanguageText = HHAuto_ToolTips['en'][id][type];
        defaultLanguageVersion = HHAuto_ToolTips['en'][id].version;
    }

    if (HHAuto_ToolTips[HHAuto_Lang] !== undefined && HHAuto_ToolTips[HHAuto_Lang][id] !== undefined && HHAuto_ToolTips[HHAuto_Lang][id][type] !== undefined && cmpVersions(HHAuto_ToolTips[HHAuto_Lang][id].version , defaultLanguageVersion) >= 0)
    {
        return HHAuto_ToolTips[HHAuto_Lang][id][type];
    }
    else
    {
        if (defaultLanguageText !== null)
        {
            return defaultLanguageText;
        }
        else
        {
            LogUtils_logHHAuto("not found text for "+HHAuto_Lang+"/"+id+"/"+type);
            return HHAuto_Lang+"/"+id+"/"+type+" not found.";
        }
    }
}

function manageTranslationPopUp()
{
    const HtmlIdPrefix = "HH_TranslateTo_";
    GM_addStyle('.tItems {border-collapse: collapse;text-align:center;vertical-align:middle;} '
                +'.tItems td,th {border: 1px solid #1B4F72;} '
                +'.tItemsColGroup {border: 3px solid #1B4F72;} '
                +'.tItemsTh1 {background-color: #2874A6;color: #fff;} '
                +'.tItemsTh2 {width: 25%;background-color: #3498DB;color: #fff;} '
                +'.tItemsTBody tr:nth-child(odd) {background-color: #85C1E9;} '
                +'.tItemsTBody tr:nth-child(even) {background-color: #D6EAF8;} '
                +'.tReworkedCell {background-color: gray} '
                +'.tEditableDiv:Empty {background-color:blue}');
    let translatePopUpContent = '<div">'+getTextForUI("saveTranslationText","elementText")+'</div>'
    +'<table class="tItems">'
    +' <colgroup class="tItemsColGroup">'
    +'  <col class="tItemsColRarity" span="2">'
    +' </colgroup>'
    +' <colgroup class="tItemsColGroup">'
    +'  <col class="tItemsColRarity" span="2">'
    +' </colgroup>'
    +' <thead class="tItemsTHead">'
    +'  <tr>'
    +'   <th class="tItemsTh1" colspan="2">'+"Text"+'</th>'
    +'   <th class="tItemsTh1" colspan="2">'+"Tooltip"+'</th>'
    +'  </tr>'
    +'  <tr>'
    +'   <th class="tItemsTh2">'+"English"+'</th>'
    +'   <th class="tItemsTh2">'+$('html')[0].lang+'</th>'
    +'   <th class="tItemsTh2">'+"English"+'</th>'
    +'   <th class="tItemsTh2">'+$('html')[0].lang+'</th>'
    +'  </tr>'
    +' </thead>'
    +' <tbody class="tItemsTBody">';

    const currentLanguage = getLanguageCode();
    for ( let item of Object.keys(HHAuto_ToolTips.en))
    {
        let reworkedClass = "";
        translatePopUpContent +='  <tr id="'+HtmlIdPrefix+item+'">';
        let currentEnElementText = HHAuto_ToolTips.en[item].elementText;
        if (currentEnElementText === undefined || currentEnElementText === "")
        {
            currentEnElementText = "";
            translatePopUpContent +='   <td></td><td><div type="elementText"></div></td>';
        }
        else
        {
            translatePopUpContent +='   <td>'+currentEnElementText+'</td>';
            let currentElementText = HHAuto_ToolTips[currentLanguage][item]?HHAuto_ToolTips[currentLanguage][item].elementText:"";
            if (currentElementText === undefined)
            {
                currentElementText = "";
            }
            if (currentElementText !== getTextForUI(item,"elementText"))
            {
                reworkedClass = " tReworkedCell";
            }
            translatePopUpContent +='   <td><div type="elementText" class="tEditableDiv'+reworkedClass+'" contenteditable>'+currentElementText+'</div></td>';
        }
        reworkedClass = "";
        let currentEnTooltip = HHAuto_ToolTips.en[item].tooltip;
        if (currentEnTooltip === undefined || currentEnTooltip === "")
        {
            currentEnTooltip = "";
            translatePopUpContent +='   <td></td><td><div type="tooltip"></div></td>';
        }
        else
        {
            translatePopUpContent +='   <td>'+currentEnTooltip+'</td>';
            let currentTooltip = HHAuto_ToolTips[currentLanguage][item]?HHAuto_ToolTips[currentLanguage][item].tooltip:"";
            if (currentTooltip === undefined)
            {
                currentTooltip = "";
            }
            if (currentTooltip !== getTextForUI(item,"tooltip"))
            {
                reworkedClass = " tReworkedCell";
            }
            translatePopUpContent +='   <td><div type="tooltip" class="tEditableDiv'+reworkedClass+'" contenteditable>'+currentTooltip+'</div></td>';
        }
        translatePopUpContent +='  </tr>';
    }
    translatePopUpContent +=' </tbody>';
    translatePopUpContent +='</table>';
    translatePopUpContent +='<div style="margin:10px"><label style="width:80px" class="myButton" id="saveTranslationAsTxt">'+getTextForUI("saveTranslation","elementText")+'</label></div>';
    fillHHPopUp("translationPopUp",getTextForUI("translate","elementText"),translatePopUpContent);
    document.getElementById("saveTranslationAsTxt").addEventListener("click",saveTranslationAsTxt);

    function saveTranslationAsTxt()
    {
        //console.log("test");
        let translation = `Translated to : ${currentLanguage}\n`;
        translation += `From version : ${GM_info.version}\n`;
        let hasTranslation = false;
        for ( let item of Object.keys(HHAuto_ToolTips.en))
        {
            const currentTranslatedElementText = $(`#${HtmlIdPrefix+item} [type="elementText"]`)[0].innerHTML;
            const currentTranslatedTooltip = $(`#${HtmlIdPrefix+item} [type="tooltip"]`)[0].innerHTML;
            let currentElementText = HHAuto_ToolTips[currentLanguage][item]?HHAuto_ToolTips[currentLanguage][item].elementText:"";
            let currentTooltip = HHAuto_ToolTips[currentLanguage][item]?HHAuto_ToolTips[currentLanguage][item].tooltip:"";
            if (currentTooltip === undefined)
            {
                currentTooltip = "";
            }
            if (currentElementText === undefined)
            {
                currentElementText = "";
            }

            if (currentTranslatedElementText !== currentElementText || currentTranslatedTooltip !== currentTooltip)
            {
                //console.log(currentTranslatedElementText !== currentElementText, currentElementText, currentTranslatedElementText)
                //console.log(currentTranslatedTooltip !== currentTooltip, currentTooltip, currentTranslatedTooltip)
                const enVersion = HHAuto_ToolTips.en[item].version;
                translation += `HHAuto_ToolTips.${item} = { version: "${enVersion}"`;
                if (currentTranslatedElementText !== "" )
                {
                    translation += `, elementText: "${currentTranslatedElementText}"`;
                }
                if (currentTranslatedTooltip !== "" )
                {
                    translation += `, tooltip: "${currentTranslatedTooltip}"};\n`;
                }
                hasTranslation = true;
            }
        }
        if (hasTranslation)
        {
            const name=HtmlIdPrefix+currentLanguage+'_'+Date.now()+'.txt';
            const a = document.createElement('a');
            a.download = name;
            a.href = URL.createObjectURL(new Blob([translation], {type: 'text/plain'}));
            a.click();
        }
    }
}

;// CONCATENATED MODULE: ./src/Module/Booster.js





const DEFAULT_BOOSTERS = {normal: [], mythic:[]};

class Booster {
    static GINSENG_ROOT = {"id_item":"316","identifier":"B1","name":"Ginseng root"};
    static SANDALWOOD_PERFUME = {"id_item":"632","identifier":"MB1","name":"Sandalwood perfume"};
    
    //all following lines credit:Tom208 OCD script  
    static collectBoostersFromAjaxResponses () {
        $(document).ajaxComplete(function(evt, xhr, opt) {
            if(opt && opt.data && opt.data.search && ~opt.data.search(/(action|class)/)) {
                setTimeout(function() {
                    if(!xhr || !xhr.responseText || !xhr.responseText.length) {
                        return
                    }

                    const boosterStatus = Booster.getBoosterFromStorage();

                    const response = JSON.parse(xhr.responseText);

                    if(!response || !response.success) return;

                    const searchParams = new URLSearchParams(opt.data)
                    const mappedParams = ['action', 'class', 'type', 'id_item', 'number_of_battles', 'battles_amount'].map(key => ({[key]: searchParams.get(key)})).reduce((a,b)=>Object.assign(a,b),{})
                    const {action, class: className, type, id_item, number_of_battles, battles_amount} = mappedParams
                    const {success, equipped_booster} = response

                    if (!success) {
                        return
                    }

                    if (action === 'market_equip_booster' && type === 'booster') {
                        const idItemParsed = parseInt(id_item)
                        //const isMythic = idItemParsed >= 632 && idItemParsed <= 638
                        const isMythic = idItemParsed >= 632

                        const boosterData = equipped_booster

                        if (boosterData) {
                            const clonedData = {...boosterData}

                            if (isMythic) {
                                boosterStatus.mythic.push(clonedData)
                            } else {
                                boosterStatus.normal.push({...clonedData, endAt: clonedData.lifetime})
                            }

                            StorageHelper_setStoredValue('HHAuto_Temp_boosterStatus', JSON.stringify(boosterStatus));
                            //$(document).trigger('boosters:equipped', {id_item, isMythic, new_id: clonedData.id_member_booster_equipped})
                        }
                        return
                    }

                    let mythicUpdated = false
                    let sandalwoodEnded = false;

                    let sandalwood, allMastery, leagueMastery, seasonMastery, headband, watch, cinnamon, perfume;
                    boosterStatus.mythic.forEach(booster => {
                        switch (booster.item.identifier){
                            case 'MB1':
                                sandalwood = booster;
                                break;
                                /*
                            case 'MB2':
                                allMastery = booster;
                                break;
                            case 'MB3':
                                headband = booster;
                                break;
                            case 'MB4':
                                watch = booster;
                                break;
                            case 'MB5':
                                cinnamon = booster;
                                break;
                            case 'MB7':
                                perfume = booster;
                                break;
                            case 'MB8':
                                leagueMastery = booster;
                                break;
                            case 'MB9':
                                seasonMastery = booster;
                                break;*/
                        }
                    })

                    if (sandalwood && action === 'do_battles_trolls') {
                        const isMultibattle = parseInt(number_of_battles) > 1
                        const {rewards} = response
                        if (rewards && rewards.data && rewards.data.shards) {
                            let drops = 0
                            rewards.data.shards.forEach(({previous_value, value}) => {
                                if (isMultibattle) {
                                    // Can't reliably determine how many drops, assume MD where each drop would be 1 shard.
                                    const shardsDropped = value - previous_value
                                    drops += Math.floor(shardsDropped/2)
                                } else {
                                    drops++
                                }
                            })
                            sandalwood.usages_remaining -= drops
                            mythicUpdated = true
                            sandalwoodEnded = sandalwood.usages_remaining <= 0;
                        }
                    }
/*
                    if (allMastery && (action === 'do_battles_leagues' || action === 'do_battles_seasons')) {
                        allMastery.usages_remaining -= parseInt(number_of_battles)
                        mythicUpdated = true
                    }

                    if (leagueMastery && (action === 'do_battles_leagues')) {
                        leagueMastery.usages_remaining -= parseInt(number_of_battles)
                        mythicUpdated = true
                    }

                    if (seasonMastery && (action === 'do_battles_seasons')) {
                        seasonMastery.usages_remaining -= parseInt(number_of_battles)
                        mythicUpdated = true
                    }

                    if (headband && (action === 'do_battles_pantheon' || action === 'do_battles_trolls')) {
                        headband.usages_remaining -= parseInt(number_of_battles)
                        mythicUpdated = true
                    }

                    if (watch && className === 'TeamBattle') {
                        watch.usages_remaining -= parseInt(battles_amount)
                        mythicUpdated = true
                    }

                    if (cinnamon && action === 'do_battles_seasons') {
                        cinnamon.usages_remaining -= parseInt(number_of_battles)
                        mythicUpdated = true
                    }

                    if (perfume && action === 'start' && className === 'TempPlaceOfPower') {
                        perfume.usages_remaining--
                        mythicUpdated = true
                    }
*/
                    boosterStatus.mythic = boosterStatus.mythic.filter(({usages_remaining}) => usages_remaining > 0)

                    StorageHelper_setStoredValue('HHAuto_Temp_boosterStatus', JSON.stringify(boosterStatus));

                    /*if (mythicUpdated) {
                        $(document).trigger('boosters:updated-mythic')
                    }*/

                    try{
                        if (sandalwood && mythicUpdated && sandalwoodEnded) {
                            const isMultibattle = parseInt(number_of_battles) > 1
                            LogUtils_logHHAuto("sandalwood may be ended need a new one");
                            if(StorageHelper_getStoredValue("HHAuto_Setting_plusEventMythic") === "true" && StorageHelper_getStoredValue("HHAuto_Setting_plusEventMythicSandalWood") === "true" && JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).is_mythic==="true") {
                                if (isMultibattle) {
                                    // TODO go to market if sandalwood not ended, continue. If ended, buy a new one
                                    gotoPage(getHHScriptVars("pagesIDShop"));
                                } else {
                                    // Buy a new one
                                    // HeroHelper.equipBooster(Booster.SANDALWOOD_PERFUME);
                                }
                            }
                        }
                    } catch(err) {
                        // logHHAuto('Catch error during equip sandalwood for mythic' + err);
                    }
                }, 200);
            }
        })
    }

    static needBoosterStatusFromStore() {
        const isMythicAutoSandalWood = StorageHelper_getStoredValue("HHAuto_Setting_plusEventMythicSandalWood") === "true";
        const isLeagueWithBooster = StorageHelper_getStoredValue("HHAuto_Setting_autoLeaguesBoostedOnly") === "true";
        const isSeasonWithBooster = StorageHelper_getStoredValue("HHAuto_Setting_autoSeasonBoostedOnly") === "true";
        return isLeagueWithBooster || isSeasonWithBooster || isMythicAutoSandalWood;
    }

    static getBoosterFromStorage(){
        return Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_boosterStatus"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_boosterStatus")):DEFAULT_BOOSTERS;
    }

    static haveBoosterEquiped(boosterCode=undefined) {
        const boosterStatus = Booster.getBoosterFromStorage();
        const serverNow = getHHVars('server_now_ts');
        if(!boosterCode) {
            // have at least one
            return boosterStatus.mythic.length > 0 || boosterStatus.normal.filter((booster) => booster.endAt > serverNow).length > 0
        }else {
            return boosterStatus.mythic.find((booster) => booster.item.identifier === boosterCode).length > 0 
            || boosterStatus.normal.find((booster) => booster.item.identifier === boosterCode && booster.endAt > serverNow).length > 0 
        }
    }

    static collectBoostersFromMarket() {
        setTimeout(function() {
            const activeSlots = $('#equiped .booster .slot:not(.empty):not(.mythic)').map((i, el)=> $(el).data('d')).toArray()
            const activeMythicSlots = $('#equiped .booster .slot:not(.empty).mythic').map((i, el)=> $(el).data('d')).toArray()

            const boosterStatus = {
                normal: activeSlots.map((data) => ({...data, endAt: getHHVars('server_now_ts') + data.expiration})),
                mythic: activeMythicSlots,
            }

            StorageHelper_setStoredValue('HHAuto_Temp_boosterStatus', JSON.stringify(boosterStatus));
        }, 200)
    }
}
;// CONCATENATED MODULE: ./src/Module/Bundles.js




class Bundles {
    static goAndCollectFreeBundles()
    {
        if (getPage() == getHHScriptVars("pagesIDHome"))
        {
            if(StorageHelper_getStoredValue("HHAuto_Setting_autoFreeBundlesCollect") !== "true") {
                LogUtils_logHHAuto("Error autoFreeBundlesCollect not activated.");
                return;
            }
            const plusButton = $("header .currency .reversed_tooltip");
            if(plusButton.length > 0) {
                LogUtils_logHHAuto("click button for popup.");
                plusButton[0].click();
            }
            else
            {
                LogUtils_logHHAuto("No button for popup.");
                return false;
            }
            LogUtils_logHHAuto("setting autoloop to false");
            StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
            const bundleTabsContainerQuery = "#popups .payments-wrapper .payment-tabs";
            const bundleTabsListQuery = '.event_bundles, .special_offers, .period_deal';
            const subTabsQuery= "#popups .payments-wrapper .content-container .subtabs-container .card-container";
            const freeButtonBundleQuery= "#popups .payments-wrapper .bundle .bundle-offer-price .blue_button_L:enabled[price='0.00']";

            function collectFreeBundlesFinished(message, nextFreeBundlesCollectTime) {
                LogUtils_logHHAuto(message);
                setTimer('nextFreeBundlesCollectTime', nextFreeBundlesCollectTime);
                gotoPage(getHHScriptVars("pagesIDHome"));
                StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "true");
                LogUtils_logHHAuto("setting autoloop to true");
            }

            function parseAndCollectFreeBundles(){

                const freeBundlesNumber=$(freeButtonBundleQuery).length;
                if(freeBundlesNumber > 0)
                {
                    LogUtils_logHHAuto("Free Bundles found: " + freeBundlesNumber);
                    let buttonsToCollect = [];
                    for (let currentBundle = 0; currentBundle < freeBundlesNumber ; currentBundle++)
                    {
                        buttonsToCollect.push($(freeButtonBundleQuery)[currentBundle]);
                    }

                    function collectFreeBundle()
                    {
                        if (buttonsToCollect.length > 0)
                        {
                            LogUtils_logHHAuto("Collecting bundle n°"+ buttonsToCollect[0].getAttribute('product'));
                            buttonsToCollect[0].click();
                            buttonsToCollect.shift();
                            gotoPage(getHHScriptVars("pagesIDHome"));
                            setTimer('nextFreeBundlesCollectTime', 15);
                        }
                    }
                    collectFreeBundle();
                    return true;
                } else {
                    return false;
                }
            }

            function switchToBundleTabs() {
                const bundleTabs = $(bundleTabsListQuery, $(bundleTabsContainerQuery));
                if(bundleTabs.length > 0) {
                    let freeBundleFound = false;
                    for(let bundleIndex = 0;bundleIndex < bundleTabs.length && !freeBundleFound;bundleIndex++)
                    {
                        bundleTabs[bundleIndex].click();
                        LogUtils_logHHAuto("Looking in tabs '" + $(bundleTabs[bundleIndex]).attr('type') + "'.");
                        freeBundleFound = parseAndCollectFreeBundles();
                        if (!freeBundleFound && $(subTabsQuery).length > 0) {
                            const subTabs = $(subTabsQuery);
                            LogUtils_logHHAuto("Sub tabs found, switching to next one");
                            for(let subTabIndex = 1;subTabIndex < subTabs.length && !freeBundleFound;subTabIndex++)
                            {
                                subTabs[subTabIndex].click();
                                LogUtils_logHHAuto("Looking in sub tabs '" + $(subTabs[subTabIndex]).attr('period_deal') + "'.");
                                freeBundleFound = parseAndCollectFreeBundles();
                            }
                        }
                    }
                    if(!freeBundleFound) collectFreeBundlesFinished("Free bundle collection finished.", getSecondsLeftBeforeEndOfHHDay() + 3600);
                }
                else
                {
                    collectFreeBundlesFinished("No bundle tabs in popup, wait one hour.", 60 * 60);
                    return false;
                }
            }

            // Wait popup is opened
            setTimeout(switchToBundleTabs,randomInterval(1400, 1800));

            return true;
        }
        else
        {
            LogUtils_logHHAuto("Navigating to home page.");
            gotoPage(getHHScriptVars("pagesIDHome"));
            // return busy
            return true;
        }
    }
}
;// CONCATENATED MODULE: ./src/Module/Events/BossBang.js




class BossBang {
    static skipFightPage()
    {
        const rewardsButton = $('#rewards_popup .blue_button_L:not([disabled]):visible');
        const skipFightButton = $('#new_battle #new-battle-skip-btn:not([disabled]):visible');
        if(rewardsButton.length > 0)
        {
            LogUtils_logHHAuto("Click get rewards bang fight");
            rewardsButton.click();
        }
        else if(skipFightButton.length > 0)
        {
            LogUtils_logHHAuto("Click skip boss bang fight");
            skipFightButton.click();
            setTimeout(BossBang.skipFightPage,randomInterval(1300,1900));
        }
        StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
    }
    static goToFightPage(){
        const teamIndexFound = parseInt(StorageHelper_getStoredValue("HHAuto_Temp_bossBangTeam"));
        let bangButton = $('#contains_all #events #boss_bang .boss-bang-event-info #start-bang-button:not([disabled])');
        if(teamIndexFound >= 0 && bangButton.length > 0) {
            gotoPage(bangButton.attr('href'));
        }
    }
}
;// CONCATENATED MODULE: ./src/Module/Events/EventModule.js




class EventModule {
    static clearEventData(inEventID)
    {
        //sessionStorage.removeItem('HHAuto_Temp_eventsGirlz');
        //sessionStorage.removeItem('HHAuto_Temp_eventGirl');
        //clearTimer('eventMythicNextWave');
        //clearTimer('eventRefreshExpiration');
        //sessionStorage.removeItem('HHAuto_Temp_EventFightsBeforeRefresh');
        let eventList = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_eventsList"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventsList")):{};
        let eventsGirlz = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_eventsGirlz"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventsGirlz")):[];
        let eventGirl =Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")):{};
        let eventChamps = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_autoChampsEventGirls"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_autoChampsEventGirls")):[];
        let hasMythic = false;
        let hasEvent = false;
        for (let prop of Object.keys(eventList))
        {
            if (
                eventList[prop]["seconds_before_end"]<new Date()
                ||
                (eventList[prop]["type"] === 'mythic' && StorageHelper_getStoredValue("HHAuto_Setting_plusEventMythic") !=="true")
                ||
                (eventList[prop]["type"] === 'event' && StorageHelper_getStoredValue("HHAuto_Setting_plusEvent") !=="true")
                ||
                (eventList[prop]["type"] === 'bossBang' && StorageHelper_getStoredValue("HHAuto_Setting_bossBangEvent") !=="true")
                ||
                (eventList[prop]["type"] === 'sultryMysteries' && StorageHelper_getStoredValue("HHAuto_Setting_sultryMysteriesEventRefreshShop") !=="true")
            )
            {
                delete eventList[prop];
            }
            else
            {
                if (! eventList[prop]["isCompleted"])
                {
                    if (eventList[prop]["isMythic"])
                    {
                        hasMythic = true;
                    }
                    else
                    {
                        hasEvent = true;
                    }
                }

            }
        }
        if (hasMythic === false)
        {
            TimerHelper_clearTimer('eventMythicNextWave');
            TimerHelper_clearTimer('eventMythicGoing');
        }
        if (hasEvent === false)
        {
            TimerHelper_clearTimer('eventGoing');
        }
        if (Object.keys(eventList).length === 0)
        {
            sessionStorage.removeItem('HHAuto_Temp_eventsGirlz');
            sessionStorage.removeItem('HHAuto_Temp_eventGirl');
            sessionStorage.removeItem('HHAuto_Temp_eventsList');
            sessionStorage.removeItem('HHAuto_Temp_autoChampsEventGirls');
        }
        else
        {
            //console.log(JSON.stringify(eventChamps));
            eventChamps = eventChamps.filter(function (a) {
                if ( !eventList.hasOwnProperty(a.event_id) || a.event_id === inEventID)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            });

            if(Object.keys(eventChamps).length === 0)
            {
                sessionStorage.removeItem('HHAuto_Temp_autoChampsEventGirls');
            }
            else
            {
                StorageHelper_setStoredValue("HHAuto_Temp_autoChampsEventGirls", JSON.stringify(eventChamps));
            }


            eventsGirlz = eventsGirlz.filter(function (a) {
                if ( !eventList.hasOwnProperty(a.event_id) || a.event_id === inEventID)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            });
            if(Object.keys(eventsGirlz).length === 0)
            {
                sessionStorage.removeItem('HHAuto_Temp_eventsGirlz');
            }
            else
            {
                StorageHelper_setStoredValue("HHAuto_Temp_eventsGirlz", JSON.stringify(eventsGirlz));
            }

            if (!eventList.hasOwnProperty(eventGirl.event_id) || eventGirl.event_id ===inEventID)
            {
                sessionStorage.removeItem('HHAuto_Temp_eventGirl');
            }

            StorageHelper_setStoredValue("HHAuto_Temp_eventsList", JSON.stringify(eventList));
        }
    }


    static parseEventPage(inTab="global")
    {
        if(getPage() === getHHScriptVars("pagesIDEvent") )
        {
            let queryEventTabCheck=$("#contains_all #events");
            let eventHref = $("#contains_all #events .events-list .event-title.active").attr("href");
            let parsedURL = new URL(eventHref,window.location.origin);
            let eventID = queryStringGetParam(parsedURL.search,'tab');
            const hhEvent = EventModule.getEvent(eventID);
            if (!hhEvent.eventTypeKnown)
            {
                if (queryEventTabCheck.attr('parsed') === undefined)
                {
                    LogUtils_logHHAuto("Not parsable event");
                    queryEventTabCheck[0].setAttribute('parsed', 'true');
                }
                return false;
            }
            if (queryEventTabCheck.attr('parsed') !== undefined)
            {
                if (!EventModule.checkEvent(eventID))
                {
                    //logHHAuto("Events already parsed.");
                    return false;
                }
            }
            queryEventTabCheck[0].setAttribute('parsed', 'true');
            LogUtils_logHHAuto("On event page : " + eventID);
            EventModule.clearEventData(eventID);
            //let eventsGirlz=[];
            let eventList = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_eventsList"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventsList")):{};
            let eventsGirlz = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_eventsGirlz"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventsGirlz")):[];
            let eventChamps = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_autoChampsEventGirls"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_autoChampsEventGirls")):[];
            let Priority=(StorageHelper_getStoredValue("HHAuto_Setting_eventTrollOrder")).split(";");
            const hhEventData = unsafeWindow.event_data;
            if ((hhEvent.isPlusEvent || hhEvent.isPlusEventMythic) && !hhEventData) {
                LogUtils_logHHAuto("Error getting current event Data from HH.");
            }

            let refreshTimer = 3600;
            if (hhEvent.isPlusEvent)
            {
                LogUtils_logHHAuto("On going event.");
                let timeLeft=$('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
                if (timeLeft !== undefined && timeLeft.length)
                {
                    setTimer('eventGoing',Number(convertTimeToInt(timeLeft)));
                } else setTimer('eventGoing', refreshTimer);
                eventList[eventID]={};
                eventList[eventID]["id"]=eventID;
                eventList[eventID]["type"]=hhEvent.eventType;
                eventList[eventID]["seconds_before_end"]=new Date().getTime() + Number(convertTimeToInt(timeLeft)) * 1000;
                eventList[eventID]["next_refresh"]=new Date().getTime() + refreshTimer * 1000;
                eventList[eventID]["isCompleted"] = true;
                let allEventGirlz = hhEventData ? hhEventData.girls : [];
                for (let currIndex = 0;currIndex<allEventGirlz.length;currIndex++)
                {
                    let girlData = allEventGirlz[currIndex];
                    if (girlData.shards < 100) {
                        eventList[eventID]["isCompleted"] = false;
                        let girlId = girlData.id_girl;
                        let girlName = girlData.name;
                        let girlShards = girlData.shards;
                        let TrollID;
                        let ChampID;

                        if (girlData.source) {
                            if (girlData.source.name === 'event_troll') {
                                try {
                                    let parsedURL = new URL(girlData.source.anchor_source.url,window.location.origin);
                                    TrollID = queryStringGetParam(parsedURL.search,'id_opponent');
                                    if (girlData.source.anchor_source.disabled) {
                                        LogUtils_logHHAuto("Troll " + TrollID + " is not available for girl " +  girlName + " (" + girlId + ") ignoring");
                                        TrollID = undefined;
                                    }
                                } catch (error) {
                                    try {
                                        let parsedURL = new URL(girlData.source.anchor_win_from[0].url ,window.location.origin);
                                        TrollID = queryStringGetParam(parsedURL.search,'id_opponent');
                                        if (girlData.source.anchor_win_from.disabled) {
                                            LogUtils_logHHAuto("Troll " + TrollID + " is not available for girl " +  girlName + " (" + girlId + ") ignoring");
                                            TrollID = undefined;
                                        }
                                    } catch (error) {
                                        LogUtils_logHHAuto("Can't get troll from girls " +  girlName + " (" + girlId + ")");
                                    }
                                }
                            } else if (girlData.source.name === 'event_champion_girl') {
                                try {
                                    ChampID = girlData.source.anchor_source.url.split('/champions/')[1];
                                    if (girlData.source.anchor_source.disabled) {
                                        LogUtils_logHHAuto("Champion " + ChampID + " is not available for girl " +  girlName + " (" + girlId + ") ignoring");
                                        ChampID = undefined;
                                    }
                                } catch (error) {
                                    try {
                                        ChampID = girlData.source.anchor_win_from[0].url.split('/champions/')[1];
                                        if (girlData.source.anchor_win_from.disabled) {
                                            LogUtils_logHHAuto("Champion " + ChampID + " is not available for girl " +  girlName + " (" + girlId + ") ignoring");
                                            ChampID = undefined;
                                        }
                                    } catch (error) {
                                        LogUtils_logHHAuto("Can't get champion from girls " +  girlName + " (" + girlId + ")");
                                    }
                                }
                            }
                        }
                        if (TrollID) {
                            LogUtils_logHHAuto("Event girl : "+girlName+" ("+girlShards+"/100) at troll "+TrollID+" priority : "+Priority.indexOf(TrollID)+" on event : ",eventID);
                            eventsGirlz.push({girl_id:girlId,troll_id:TrollID,girl_shards:girlShards,is_mythic:"false",girl_name:girlName,event_id:eventID});
                        }
                        if (ChampID) {
                            LogUtils_logHHAuto("Event girl : "+girlName+" ("+girlShards+"/100) at champ "+ChampID+" on event : ",eventID);
                            eventChamps.push({girl_id:girlId,champ_id:ChampID,girl_shards:girlShards,girl_name:girlName,event_id:eventID});
                        }
                    }
                }
                if(eventList[eventID]["isCompleted"]){
                    EventModule.collectEventChestIfPossible();
                }
            }
            if (hhEvent.isPlusEventMythic)
            {
                LogUtils_logHHAuto("On going mythic event.");
                let timeLeft=$('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
                if (timeLeft !== undefined && timeLeft.length)
                {
                    setTimer('eventGoing',Number(convertTimeToInt(timeLeft)));
                } else setTimer('eventGoing', refreshTimer);
                eventList[eventID]={};
                eventList[eventID]["id"]=eventID;
                eventList[eventID]["type"]=hhEvent.eventType;
                eventList[eventID]["isMythic"]=true;
                eventList[eventID]["seconds_before_end"]=new Date().getTime() + Number(convertTimeToInt(timeLeft)) * 1000;
                eventList[eventID]["next_refresh"]=new Date().getTime() + refreshTimer * 1000;
                eventList[eventID]["isCompleted"] = true;
                setTimer('eventMythicGoing',Number(convertTimeToInt(timeLeft)));
                let allEventGirlz = hhEventData ? hhEventData.girls : [];
                for (let currIndex = 0;currIndex<allEventGirlz.length;currIndex++)
                {
                    let girlData = allEventGirlz[currIndex];
                    let ShardsQuery = '#events .nc-panel .nc-panel-body .nc-event-reward-container .nc-events-prize-locations-container .shards-info span.number';
                    let timerQuery= '#events .nc-panel .nc-panel-body .nc-event-reward-container .nc-events-prize-locations-container .shards-info span.timer'
                    if ($(ShardsQuery).length > 0 )
                    {
                        let remShards=Number($(ShardsQuery)[0].innerText);
                        let nextWave=($(timerQuery).length > 0)?convertTimeToInt($(timerQuery)[0].innerText):-1;
                        if (girlData.shards < 100)
                        {
                            eventList[eventID]["isCompleted"] = false;
                            if (nextWave === -1)
                            {
                                TimerHelper_clearTimer('eventMythicNextWave');
                            }
                            else
                            {
                                setTimer('eventMythicNextWave',nextWave);
                            }
                            if (remShards !== 0 )
                            {
                                let girlId = girlData.id_girl;
                                let girlName = girlData.name;
                                let girlShards = girlData.shards;
                                let parsedURL = new URL(girlData.source.anchor_source.url,window.location.origin);
                                let TrollID = queryStringGetParam(parsedURL.search,'id_opponent');
                                if (girlData.source.anchor_source.disabled) {
                                    LogUtils_logHHAuto("Troll " + TrollID + " is not available for mythic girl " +  girlName + " (" + girlId + ") ignoring");
                                } else {
                                    LogUtils_logHHAuto("Event girl : "+girlName+" ("+girlShards+"/100) at troll "+TrollID+" priority : "+Priority.indexOf(TrollID)+" on event : ",eventID);
                                    eventsGirlz.push({girl_id:girlId,troll_id:TrollID,girl_shards:girlShards,is_mythic:"true",girl_name:girlName,event_id:eventID});
                                }
                            }
                            else
                            {
                                if (nextWave === -1)
                                {
                                    eventList[eventID]["isCompleted"] = true;
                                    TimerHelper_clearTimer('eventMythicNextWave');
                                }
                            }
                        }
                    }
                }
            }
            if (hhEvent.isBossBangEvent)
            {
                LogUtils_logHHAuto("On going bossBang event.");
                let timeLeft=$('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
                if (timeLeft !== undefined && timeLeft.length)
                {
                    setTimer('eventGoing',Number(convertTimeToInt(timeLeft)));
                } else setTimer('eventGoing', refreshTimer);
                eventList[eventID]={};
                eventList[eventID]["id"]=eventID;
                eventList[eventID]["type"]=hhEvent.eventType;
                eventList[eventID]["seconds_before_end"]=new Date().getTime() + Number(convertTimeToInt(timeLeft)) * 1000;
                eventList[eventID]["next_refresh"]=new Date().getTime() + refreshTimer * 1000;
                eventList[eventID]["isCompleted"] = $('#contains_all #events #boss_bang .completed-event').length > 0;
                setTimer('eventBossBangGoing',Number(convertTimeToInt(timeLeft)));
                let teamEventz = $('#contains_all #events #boss_bang .boss-bang-teams-container .boss-bang-team-slot');
                let teamFound = false;
                const firstTeamToStartWith = StorageHelper_getStoredValue("HHAuto_Setting_bossBangMinTeam");
                if($('.boss-bang-team-ego', teamEventz[firstTeamToStartWith -1]).length > 0)
                {
                    // Do not trigger event if not all teams are set
                    for (let currIndex = teamEventz.length-1;currIndex>=0 && !teamFound;currIndex--)
                    {
                        // start with last team first
                        let teamz = $(teamEventz[currIndex]);
                        const teamIndex = teamz.data('slot-index');
                        const teamEgo = $('.boss-bang-team-ego', teamz);
                        if(teamEgo.length > 0 && parseInt(teamEgo.text()) > 0) {
                            if(!teamFound) {
                                if(!teamz.hasClass('.selected-hero-team')) teamz.click();
                                teamFound = true;
                                LogUtils_logHHAuto("Select team " + teamIndex + ", Ego: "+parseInt(teamEgo.text()));
                                StorageHelper_setStoredValue("HHAuto_Temp_bossBangTeam", teamIndex);
                                return true;
                            }
                        } else {
                            LogUtils_logHHAuto("Team " + teamIndex + " not eligible");
                        }
                    }
                }
                else if(eventList[eventID]["isCompleted"])
                {
                    LogUtils_logHHAuto("Boss bang completed, disabled boss bang event setting");
                    StorageHelper_setStoredValue("HHAuto_Setting_bossBangEvent", false);
                }
                if(!teamFound) {
                    StorageHelper_setStoredValue("HHAuto_Temp_bossBangTeam", -1);
                }
            }
            if (hhEvent.isSultryMysteriesEvent)
            {
                LogUtils_logHHAuto("On going sultry mysteries event.");

                let timeLeft=$('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
                if (timeLeft !== undefined && timeLeft.length) {
                    setTimer('eventGoing',Number(convertTimeToInt(timeLeft)));
                } else setTimer('eventGoing', 3600);

                eventList[eventID]={};
                eventList[eventID]["id"]=eventID;
                eventList[eventID]["type"]=hhEvent.eventType;
                eventList[eventID]["seconds_before_end"]=new Date().getTime() + Number(convertTimeToInt(timeLeft)) * 1000;
                eventList[eventID]["next_refresh"]=new Date().getTime() + refreshTimer * 1000;
                eventList[eventID]["isCompleted"] = false;
                setTimer('eventSultryMysteryGoing', Number(convertTimeToInt(timeLeft)));

                if (checkTimer("eventSultryMysteryShopRefresh")) {
                    LogUtils_logHHAuto("Refresh sultry mysteries shop content.");

                    const shopButton = $('#shop_tab');
                    const gridButton = $('#grid_tab');
                    shopButton.click();

                    setTimeout(function(){ // Wait tab switch and timer init
                        let shopTimeLeft=$('#contains_all #events #shop_tab_container .shop-section .shop-timer span[rel="expires"]').text();
                        setTimer('eventSultryMysteryShopRefresh', Number(convertTimeToInt(shopTimeLeft)));
                        eventList[eventID]["next_shop_refresh"]=new Date().getTime() + Number(shopTimeLeft) * 1000;

                        setTimeout(function(){gridButton.click();},randomInterval(800,1200));
                    },randomInterval(300,500));
                }
            }
            if(Object.keys(eventList).length >0)
            {
                StorageHelper_setStoredValue("HHAuto_Temp_eventsList", JSON.stringify(eventList));
            }
            else
            {
                sessionStorage.removeItem("HHAuto_Temp_eventsList");
            }
            eventsGirlz = eventsGirlz.filter(function (a) {
                var a_weighted = Number(Priority.indexOf(a.troll_id));
                if ( a.is_mythic === "true" )
                {
                    return true;
                }
                else
                {
                    return a_weighted !== -1;
                }
            });

            if (eventsGirlz.length>0 || eventChamps.length>0)
            {
                if (eventsGirlz.length>0)
                {
                    if (Priority[0]!=='')
                    {
                        eventsGirlz.sort(function (a, b) {

                            var a_weighted = Number(Priority.indexOf(a.troll_id));
                            if ( a.is_mythic === "true" )
                            {
                                a_weighted=a_weighted-Priority.length;
                            }
                            var b_weighted = Number(Priority.indexOf(b.troll_id));
                            if ( b.is_mythic === "true" )
                            {
                                b_weighted=b_weighted-Priority.length;
                            }
                            return a_weighted-b_weighted;

                        });
                        //logHHAuto({log:"Sorted EventGirls",eventGirlz:eventsGirlz});
                    }

                    StorageHelper_setStoredValue("HHAuto_Temp_eventsGirlz", JSON.stringify(eventsGirlz));
                    var chosenTroll = Number(eventsGirlz[0].troll_id)
                    LogUtils_logHHAuto("ET: "+chosenTroll);
                    StorageHelper_setStoredValue("HHAuto_Temp_eventGirl", JSON.stringify(eventsGirlz[0]));
                }
                if (eventChamps.length>0)
                {
                    StorageHelper_setStoredValue("HHAuto_Temp_autoChampsEventGirls", JSON.stringify(eventChamps));
                }
                queryEventTabCheck[0].setAttribute('parsed', 'true');
                //setStoredValue("HHAuto_Temp_EventFightsBeforeRefresh", "20000");
                //setTimer('eventRefreshExpiration', 3600);
            }
            else
            {
                queryEventTabCheck[0].setAttribute('parsed', 'true');
                EventModule.clearEventData(eventID);
            }
            return false;
        }
        else
        {
            if (inTab !== "global")
            {
                gotoPage(getHHScriptVars("pagesIDEvent"),{tab:inTab});
            }
            else
            {
                gotoPage(getHHScriptVars("pagesIDEvent"));
            }
            return true;
        }
    }

    static getEventType(inEventID){
        if(inEventID.startsWith(getHHScriptVars('mythicEventIDReg'))) return "mythic";
        if(inEventID.startsWith(getHHScriptVars('eventIDReg'))) return "event";
        if(inEventID.startsWith(getHHScriptVars('bossBangEventIDReg'))) return "bossBang";
        if(inEventID.startsWith(getHHScriptVars('sultryMysteriesEventIDReg'))) return "sultryMysteries";
    //    if(inEventID.startsWith(getHHScriptVars('poaEventIDReg'))) return "poa";
    //    if(inEventID.startsWith('cumback_contest_')) return "";
    //    if(inEventID.startsWith('legendary_contest_')) return "";
        return "";
    }

    static getEvent(inEventID){
        const eventType = EventModule.getEventType(inEventID);
        const isPlusEvent = inEventID.startsWith(getHHScriptVars('eventIDReg')) && StorageHelper_getStoredValue("HHAuto_Setting_plusEvent") ==="true";
        const isPlusEventMythic = inEventID.startsWith(getHHScriptVars('mythicEventIDReg')) && StorageHelper_getStoredValue("HHAuto_Setting_plusEventMythic") ==="true";
        const isBossBangEvent = inEventID.startsWith(getHHScriptVars('bossBangEventIDReg')) && StorageHelper_getStoredValue("HHAuto_Setting_bossBangEvent") ==="true";
        const isSultryMysteriesEvent = inEventID.startsWith(getHHScriptVars('sultryMysteriesEventIDReg')) && StorageHelper_getStoredValue("HHAuto_Setting_sultryMysteriesEventRefreshShop") === "true";
        return {
            eventTypeKnown: eventType !== '',
            eventId: inEventID,
            eventType: eventType,
            isPlusEvent: isPlusEvent, // and activated
            isPlusEventMythic: isPlusEventMythic, // and activated
            isBossBangEvent: isBossBangEvent, // and activated
            isSultryMysteriesEvent: isSultryMysteriesEvent, // and activated
            isEnabled: isPlusEvent || isPlusEventMythic || isBossBangEvent || isSultryMysteriesEvent
        }
    }

    static checkEvent(inEventID)
    {
        let eventList = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_eventsList"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventsList")):{};
        const hhEvent = EventModule.getEvent(inEventID);
        if(hhEvent.eventTypeKnown && !hhEvent.isEnabled)
        {
            return false;
        }
        if (eventList === {} || !eventList.hasOwnProperty(inEventID))
        {
            return true;
        }
        else
        {
            if (eventList[inEventID]["isCompleted"])
            {
                return false;
            }
            else
            {
            return (
                    eventList[inEventID]["next_refresh"]<new Date()
                    ||
                    (hhEvent.isPlusEventMythic && checkTimerMustExist('eventMythicNextWave'))
                    ||
                    (hhEvent.isSultryMysteriesEvent && checkTimerMustExist('eventSultryMysteryShopRefresh'))
                    );
            }
        }
    }

    static displayPrioInDailyMissionGirl(baseQuery){
        let allEventGirlz = unsafeWindow.event_data ? unsafeWindow.event_data.girls : [];
        if(!allEventGirlz) return;
        for (let currIndex = 0;currIndex<allEventGirlz.length;currIndex++)
        {
            let girlData = allEventGirlz[currIndex];
            if (girlData.shards < 100 && girlData.source && girlData.source.name === 'event_dm') {

                let query=baseQuery+"[data-select-girl-id="+girlData.id_girl+"]";
                if ($(query).length >0 )
                {
                    let currentGirl=$(query).parent()[0];
                    $(query).prepend('<div class="HHEventPriority" title="'+getTextForUI('dailyMissionGirlTitle','elementText')+'">DM</div>');
                    $(query).css('position','relative');
                    $($(query)).parent().parent()[0].prepend(currentGirl);
                }
            }
        }
    }

    static moduleDisplayEventPriority()
    {
        if ($('.HHEventPriority').length  > 0) {return}
        const baseQuery="#events .scroll-area .nc-event-list-reward-container .nc-event-list-reward";
        EventModule.displayPrioInDailyMissionGirl(baseQuery);

        let eventGirlz=Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_eventsGirlz"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventsGirlz")):{};
        let eventChamps = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_autoChampsEventGirls"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_autoChampsEventGirls")):[];
        //$("div.event-widget div.widget[style='display: block;'] div.container div.scroll-area div.rewards-block-tape div.girl_reward div.HHEventPriority").each(function(){this.remove();});
        if ( eventGirlz.length >0 || eventChamps.length >0)
        {
            var girl;
            var prio;
            var idArray;
            var currentGirl;
            for ( var ec=eventChamps.length;ec>0;ec--)
            {
                idArray = Number(ec)-1;
                girl = Number(eventChamps[idArray].girl_id);
                let query=baseQuery+"[data-select-girl-id="+girl+"]";
                if ($(query).length >0 )
                {
                    currentGirl=$(query).parent()[0];
                    $(query).prepend('<div class="HHEventPriority">C'+eventChamps[idArray].champ_id+'</div>');
                    $(query).css('position','relative');
                    $($(query)).parent().parent()[0].prepend(currentGirl);
                }
            }
            for ( var e=eventGirlz.length;e>0;e--)
            {
                idArray = Number(e)-1;
                girl = Number(eventGirlz[idArray].girl_id);
                let query=baseQuery+"[data-select-girl-id="+girl+"]";
                if ($(query).length >0 )
                {
                    currentGirl=$(query).parent()[0];
                    $(query).prepend('<div class="HHEventPriority">'+e+'</div>');
                    $($(query)).parent().parent()[0].prepend(currentGirl);
                    $(query).css('position','relative');
                    $(query).click();
                }
            }
        }
    }

    
    static displayGenericRemainingTime(scriptId, aRel, hhtimerId, timerName, timerEndDateName)
    {
        const displayTimer = $(scriptId).length === 0;
        if(getTimer(timerName) !== -1)
        {
            const domSelector = '#homepage a[rel="'+aRel+'"] .notif-position > span';
            if ($("#"+hhtimerId).length === 0)
            {
                if (displayTimer)
                {
                    $(domSelector).prepend('<span id="'+hhtimerId+'"></span>')
                    GM_addStyle('#'+hhtimerId+'{position: absolute;top: 26px;left: 30px;width: 100px;font-size: .6rem ;z-index: 1;}');
                }
            }
            else
            {
                if (!displayTimer)
                {
                    $("#"+hhtimerId)[0].remove();
                }
            }
            if (displayTimer)
            {
                $("#"+hhtimerId)[0].innerText = getTimeLeft(timerName);
            }
        }
        else
        {
            if (StorageHelper_getStoredValue(timerEndDateName) !== undefined)
            {
                setTimer(timerName,StorageHelper_getStoredValue(timerEndDateName)-(Math.ceil(new Date().getTime())/1000));
            }
        }
    }
    static moduleSimPoVPogMaskReward(containerId)
    {
        var arrayz;
        var nbReward;
        let modified = false;
        arrayz = $('.potions-paths-tier:not([style*="display:none"]):not([style*="display: none"])');
        //doesn sure about  " .purchase-pov-pass"-button visibility
        if ($('#'+containerId+' .potions-paths-second-row .purchase-pass:not([style*="display:none"]):not([style*="display: none"])').length)
        {
            nbReward = 1;
        }
        else
        {
            nbReward = 2;
        }
        var obj;
        if (arrayz.length > 0)
        {
            for (var i2 = arrayz.length - 1; i2 >= 0; i2--)
            {
                obj = $(arrayz[i2]).find('.claimed-slot:not([style*="display:none"]):not([style*="display: none"])');
                if (obj.length >= nbReward)
                {
                    //console.log("width : "+arrayz[i2].offsetWidth);
                    //document.getElementById('rewards_cont_scroll').scrollLeft-=arrayz[i2].offsetWidth;
                    arrayz[i2].style.display = "none";
                    modified = true;
                }
            }
        }

        if (modified)
        {
            let divToModify = $('.potions-paths-progress-bar-section');
            if (divToModify.length > 0)
            {
                $('.potions-paths-progress-bar-section')[0].scrollTop = '0';
            }
        }
    }
    static collectEventChestIfPossible()
    {
        if (StorageHelper_getStoredValue("HHAuto_Setting_collectEventChest") === "true") {
            const eventChestId = "#extra-rewards-claim-btn:not([disabled])";
            if ($(eventChestId).length > 0) {
                LogUtils_logHHAuto("Collect event chest");
                $(eventChestId).click();
            }
        }
    }

    static parsePageForEventId()
    {
        let eventQuery = '#contains_all #homepage .event-widget a[rel="event"]:not([href="#"])';
        let mythicEventQuery = '#contains_all #homepage .event-widget a[rel="mythic_event"]:not([href="#"])';
        let bossBangEventQuery = '#contains_all #homepage .event-widget a[rel="boss_bang_event"]:not([href="#"])';
        let sultryMysteriesEventQuery = '#contains_all #homepage .event-widget a[rel="sm_event"]:not([href="#"])';
        let seasonalEventQuery = '#contains_all #homepage .seasonal-event a'; // Mega event have same query
        let povEventQuery = '#contains_all #homepage .season-pov-container a[rel="path-of-valor"]';
        let pogEventQuery = '#contains_all #homepage .season-pov-container a[rel="path-of-glory"]';
        let eventIDs=[];
        let bossBangEventIDs=[];

        if (getPage()===getHHScriptVars("pagesIDEvent"))
        {
            if (queryStringGetParam(window.location.search,'tab') !== null)
            {
                eventIDs.push(queryStringGetParam(window.location.search,'tab'));
            }
        }
        else if (getPage() === getHHScriptVars("pagesIDHome"))
        {
            let parsedURL;
            let queryResults=$(eventQuery);
            for(let index = 0;index < queryResults.length;index++)
            {
                parsedURL = new URL(queryResults[index].getAttribute("href"),window.location.origin);
                if (queryStringGetParam(parsedURL.search,'tab') !== null && EventModule.checkEvent(queryStringGetParam(parsedURL.search,'tab')))
                {
                    eventIDs.push(queryStringGetParam(parsedURL.search,'tab'));
                }
            }
            queryResults=$(mythicEventQuery);
            for(let index = 0;index < queryResults.length;index++)
            {
                parsedURL = new URL(queryResults[index].getAttribute("href"),window.location.origin);
                if (queryStringGetParam(parsedURL.search,'tab') !== null && EventModule.checkEvent(queryStringGetParam(parsedURL.search,'tab')))
                {
                    eventIDs.push(queryStringGetParam(parsedURL.search,'tab'));
                }
            }
            queryResults=$(bossBangEventQuery);
            for(let index = 0;index < queryResults.length;index++)
            {
                parsedURL = new URL(queryResults[index].getAttribute("href"),window.location.origin);
                if (queryStringGetParam(parsedURL.search,'tab') !== null && EventModule.checkEvent(queryStringGetParam(parsedURL.search,'tab')))
                {
                    bossBangEventIDs.push(queryStringGetParam(parsedURL.search,'tab'));
                }
            }
            queryResults=$(sultryMysteriesEventQuery);
            for(let index = 0;index < queryResults.length;index++)
            {
                parsedURL = new URL(queryResults[index].getAttribute("href"),window.location.origin);
                if (queryStringGetParam(parsedURL.search,'tab') !== null && EventModule.checkEvent(queryStringGetParam(parsedURL.search,'tab')))
                {
                    eventIDs.push(queryStringGetParam(parsedURL.search,'tab'));
                }
            }
            if (queryResults.length <= 0 && getTimer("eventSultryMysteryShopRefresh") !== -1)
            {
                // event is over
                TimerHelper_clearTimer("eventSultryMysteryShopRefresh");
            }
            queryResults=$(seasonalEventQuery);
            if((StorageHelper_getStoredValue("HHAuto_Setting_autoSeasonalEventCollect") === "true" || StorageHelper_getStoredValue("HHAuto_Setting_autoSeasonalEventCollectAll") === "true") && queryResults.length == 0)
            {
                LogUtils_logHHAuto("No seasonal event found, deactivate collect.");
                StorageHelper_setStoredValue("HHAuto_Setting_autoSeasonalEventCollect", "false");
                StorageHelper_setStoredValue("HHAuto_Setting_autoSeasonalEventCollectAll", "false");
            }
            queryResults=$(povEventQuery);
            if((StorageHelper_getStoredValue("HHAuto_Setting_autoPoVCollect") === "true" || StorageHelper_getStoredValue("HHAuto_Setting_autoPoVCollectAll") === "true") && queryResults.length == 0)
            {
                LogUtils_logHHAuto("No pov event found, deactivate collect.");
                StorageHelper_setStoredValue("HHAuto_Setting_autoPoVCollect", "false");
                StorageHelper_setStoredValue("HHAuto_Setting_autoPoVCollectAll", "false");
            }
            queryResults=$(pogEventQuery);
            if((StorageHelper_getStoredValue("HHAuto_Setting_autoPoGCollect") === "true" || StorageHelper_getStoredValue("HHAuto_Setting_autoPoGCollectAll") === "true") && queryResults.length == 0)
            {
                LogUtils_logHHAuto("No pog event found, deactivate collect.");
                StorageHelper_setStoredValue("HHAuto_Setting_autoPoGCollect", "false");
                StorageHelper_setStoredValue("HHAuto_Setting_autoPoGCollectAll", "false");
            }
        }
        
        return {eventIDs:eventIDs,bossBangEventIDs:bossBangEventIDs};
    }
}
;// CONCATENATED MODULE: ./src/Module/Events/PathOfAttraction.js



class PathOfAttraction {
    static runOld(){
        //https://nutaku.haremheroes.com/path-of-attraction.html"
        let array = $('#path_of_attraction div.poa.container div.all-objectives .objective.completed');
        if (array.length == 0) {
            return
        }
        let lengthNeeded = $('.golden-block.locked').length > 0 ? 1 : 2;
        for (let i = array.length - 1; i >= 0; i--) {
            if ($(array[i]).find('.picked-reward').length == lengthNeeded) {
                array[i].style.display = "none";
            }
        }
    }
    static run(){
        if (getPage() === getHHScriptVars("pagesIDEvent") && getHHScriptVars("isEnabledClubChamp",false) && window.location.search.includes("tab="+getHHScriptVars('poaEventIDReg')))
        {
            LogUtils_logHHAuto("On path of attraction event.");
            if($(".hh-club-poa").length <= 0) {
                const championsGoal = $('#poa-content .buttons:has(button[data-href="/champions-map.html"])');
                championsGoal.append(getGoToClubChampionButton());
            }
        }
    }
    static styles(){
        if (StorageHelper_getStoredValue("HHAuto_Setting_PoAMaskRewards") === "true")
        {
            setTimeout(PathOfAttraction.Hide(),500);
        }
    }
    static Hide(){
        if (getPage() === getHHScriptVars("pagesIDEvent") && window.location.search.includes("tab="+getHHScriptVars('poaEventIDReg')) && StorageHelper_getStoredValue("HHAuto_Setting_PoAMaskRewards") === "true")
        {
            let arrayz;
            let nbReward;
            let modified=false;
            arrayz = $('.nc-poa-reward-pair:not([style*="display:none"]):not([style*="display: none"])');
            if ($("#nc-poa-tape-blocker").length)
            {
                nbReward=1;
            }
            else
            {
                nbReward=2;
            }
    
            var obj;
            if (arrayz.length > 0) {
                for (var i2 = arrayz.length - 1; i2 >= 0; i2--) {
                    obj = $(arrayz[i2]).find('.nc-poa-reward-container.claimed');
                    if (obj.length >= nbReward) {
                        //console.log("scroll before : "+document.getElementById('rewards_cont_scroll').scrollLeft);
                        //console.log("width : "+arrayz[i2].offsetWidth);
                        $("#events .nc-panel-body .scroll-area")[0].scrollLeft-=arrayz[i2].offsetWidth;
                        //console.log("scroll after : "+document.getElementById('rewards_cont_scroll').scrollLeft);arrayz[i2].style.display = "none";
                        arrayz[i2].style.display = "none";
                        modified = true;
                    }
                }
            }
        }
    }

}
;// CONCATENATED MODULE: ./src/Module/Events/PathOfGlory.js

    
    


class PathOfGlory {
    static getRemainingTime(){
        const poGTimerRequest = '#pog_tab_container > div.potions-paths-first-row .potions-paths-timer span[rel=expires]';
    
        if ( $(poGTimerRequest).length > 0 && (getSecondsLeft("PoGRemainingTime") === 0 || StorageHelper_getStoredValue("HHAuto_Temp_PoGEndDate") === undefined) )
        {
            const poGTimer = Number(convertTimeToInt($(poGTimerRequest).text()));
            setTimer("PoGRemainingTime",poGTimer);
            StorageHelper_setStoredValue("HHAuto_Temp_PoGEndDate",Math.ceil(new Date().getTime()/1000)+poGTimer);
        }
    }
    static displayRemainingTime()
    {
        EventModule.displayGenericRemainingTime("#scriptPogTime", "path-of-glory", "HHAutoPoGTimer", "PoGRemainingTime", "HHAuto_Temp_PoGEndDate");
    }
    static goAndCollect()
    {
        const rewardsToCollect = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Setting_autoPoGCollectablesList"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Setting_autoPoGCollectablesList")):[];

        if (getPage() === getHHScriptVars("pagesIDPoG"))
        {
            PathOfGlory.getRemainingTime();
            const pogEnd = getSecondsLeft("PoGRemainingTime");
            LogUtils_logHHAuto("PoG end in " + debugDate(pogEnd));

            if (checkTimer('nextPoGCollectAllTime') && pogEnd < getLimitTimeBeforeEnd() && StorageHelper_getStoredValue("HHAuto_Setting_autoPoGCollectAll") === "true")
            {
                if ($(getHHScriptVars("selectorClaimAllRewards")).length > 0)
                {
                    LogUtils_logHHAuto("Going to collect all POG item at once.");
                    setTimeout(function (){
                        $(getHHScriptVars("selectorClaimAllRewards"))[0].click();
                        setTimer('nextPoGCollectAllTime',getHHScriptVars("maxCollectionDelay")); // Add timer to check again later if there is new items to collect
                        setTimeout(function (){gotoPage(getHHScriptVars("pagesIDHome"));},500);
                    },500);
                    return true;
                }
                else
                {
                    setTimer('nextPoGCollectAllTime',getHHScriptVars("maxCollectionDelay"));
                }
            }
            if (checkTimer('nextPoGCollectTime') && (StorageHelper_getStoredValue("HHAuto_Setting_autoPoGCollect") === "true" || StorageHelper_getStoredValue("HHAuto_Setting_autoPoGCollectAll") === "true"))
            {
                LogUtils_logHHAuto("Checking Path of Glory for collectable rewards.");
                LogUtils_logHHAuto("setting autoloop to false");
                StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
                let buttonsToCollect = [];
                const listPoGTiersToClaim = $("#pog_tab_container div.potions-paths-second-row div.potions-paths-central-section div.potions-paths-tier.unclaimed");
                for (let currentTier = 0 ; currentTier < listPoGTiersToClaim.length ; currentTier++)
                {
                    const currentButton = $("button[rel='claim']", listPoGTiersToClaim[currentTier])[0];
                    const currentTierNb = currentButton.getAttribute("tier");
                    //console.log("checking tier : "+currentTierNb);
                    const freeSlotType = RewardHelper.getRewardTypeBySlot($(".free-slot .slot,.free-slot .shards_girl_ico",listPoGTiersToClaim[currentTier])[0]);
                    if (rewardsToCollect.includes(freeSlotType))
                    {
                        const paidSlots = $(".paid-slots:not(.paid-locked) .slot,.paid-slots:not(.paid-locked) .shards_girl_ico",listPoGTiersToClaim[currentTier]);
                        if (paidSlots.length >0)
                        {
                            if (rewardsToCollect.includes(RewardHelper.getRewardTypeBySlot(paidSlots[0])) && rewardsToCollect.includes(RewardHelper.getRewardTypeBySlot(paidSlots[1])))
                            {
                                buttonsToCollect.push(currentButton);
                                LogUtils_logHHAuto("Adding for collection tier (with paid) : "+currentTierNb);
                            }
                        }
                        else
                        {
                            buttonsToCollect.push(currentButton);
                            LogUtils_logHHAuto("Adding for collection tier (only free) : "+currentTierNb);
                        }
                    }
                }


                if (buttonsToCollect.length >0)
                {
                    function collectPoGRewards()
                    {
                        if (buttonsToCollect.length >0)
                        {
                            LogUtils_logHHAuto("Collecting tier : "+buttonsToCollect[0].getAttribute('tier'));
                            buttonsToCollect[0].click();
                            buttonsToCollect.shift();
                            setTimeout(collectPoGRewards, randomInterval(300, 500));
                        }
                        else
                        {
                            LogUtils_logHHAuto("Path of Glory collection finished.");
                            setTimer('nextPoGCollectTime',getHHScriptVars("maxCollectionDelay"));
                            gotoPage(getHHScriptVars("pagesIDHome"));
                        }
                    }
                    collectPoGRewards();
                    return true;
                }
                else
                {
                    LogUtils_logHHAuto("No Path of Glory reward to collect.");
                    setTimer('nextPoGCollectTime',getHHScriptVars("maxCollectionDelay"));
                    setTimer('nextPoGCollectAllTime',getHHScriptVars("maxCollectionDelay"));
                    gotoPage(getHHScriptVars("pagesIDHome"));
                    return false;
                }
            }
            return false;
        }
        else
        {
            LogUtils_logHHAuto("Switching to Path of Glory screen.");
            gotoPage(getHHScriptVars("pagesIDPoG"));
            return true;
        }
    }
    static maskReward(){
        EventModule.moduleSimPoVPogMaskReward('pog_tab_container');
    }
    static styles(){

    }


}
;// CONCATENATED MODULE: ./src/Module/Events/PathOfValue.js

    
    


class PathOfValue {
    static getRemainingTime(){
        const poVTimerRequest = '#pov_tab_container > div.potions-paths-first-row .potions-paths-timer span[rel=expires]';

        if ( $(poVTimerRequest).length > 0 && (getSecondsLeft("PoVRemainingTime") === 0 || StorageHelper_getStoredValue("HHAuto_Temp_PoVEndDate") === undefined) )
        {
            const poVTimer = Number(convertTimeToInt($(poVTimerRequest).text()));
            setTimer("PoVRemainingTime",poVTimer);
            StorageHelper_setStoredValue("HHAuto_Temp_PoVEndDate",Math.ceil(new Date().getTime()/1000)+poVTimer);
        }
    }
    static displayRemainingTime()
    {
        EventModule.displayGenericRemainingTime("#scriptPovTime", "path-of-valor", "HHAutoPoVTimer", "PoVRemainingTime", "HHAuto_Temp_PoVEndDate");
    }
    static goAndCollect()
    {
        const rewardsToCollect = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Setting_autoPoVCollectablesList"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Setting_autoPoVCollectablesList")):[];

        if (getPage() === getHHScriptVars("pagesIDPoV"))
        {
            PathOfValue.getRemainingTime();
            const povEnd = getSecondsLeft("PoVRemainingTime");
            LogUtils_logHHAuto("PoV end in " + debugDate(povEnd));

            if (checkTimer('nextPoVCollectAllTime') && povEnd < getLimitTimeBeforeEnd() && StorageHelper_getStoredValue("HHAuto_Setting_autoPoVCollectAll") === "true")
            {
                if ($(getHHScriptVars("selectorClaimAllRewards")).length > 0)
                {
                    LogUtils_logHHAuto("Going to collect all POV item at once.");
                    setTimeout(function (){
                        $(getHHScriptVars("selectorClaimAllRewards"))[0].click();
                        setTimer('nextPoVCollectAllTime',getHHScriptVars("maxCollectionDelay")); // Add timer to check again later if there is new items to collect
                        setTimeout(function (){gotoPage(getHHScriptVars("pagesIDHome"));},500);
                    },500);
                    return true;
                }
                else
                {
                    setTimer('nextPoVCollectAllTime',getHHScriptVars("maxCollectionDelay"));
                }
            }
            if (checkTimer('nextPoVCollectTime') && StorageHelper_getStoredValue("HHAuto_Setting_autoPoVCollect") === "true")
            {
                LogUtils_logHHAuto("Checking Path of Valor for collectable rewards.");
                LogUtils_logHHAuto("setting autoloop to false");
                StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
                let buttonsToCollect = [];
                const listPoVTiersToClaim = $("#pov_tab_container div.potions-paths-second-row div.potions-paths-central-section div.potions-paths-tier.unclaimed");
                for (let currentTier = 0 ; currentTier < listPoVTiersToClaim.length ; currentTier++)
                {
                    const currentButton = $("button[rel='claim']", listPoVTiersToClaim[currentTier])[0];
                    const currentTierNb = currentButton.getAttribute("tier");
                    //console.log("checking tier : "+currentTierNb);
                    const freeSlotType = RewardHelper.getRewardTypeBySlot($(".free-slot .slot,.free-slot .shards_girl_ico",listPoVTiersToClaim[currentTier])[0]);
                    if (rewardsToCollect.includes(freeSlotType))
                    {
                        const paidSlots = $(".paid-slots:not(.paid-locked) .slot,.paid-slots:not(.paid-locked) .shards_girl_ico",listPoVTiersToClaim[currentTier]);
                        if (paidSlots.length >0)
                        {
                            if (rewardsToCollect.includes(RewardHelper.getRewardTypeBySlot(paidSlots[0])) && rewardsToCollect.includes(RewardHelper.getRewardTypeBySlot(paidSlots[1])))
                            {
                                buttonsToCollect.push(currentButton);
                                LogUtils_logHHAuto("Adding for collection tier (with paid) : "+currentTierNb);
                            }
                        }
                        else
                        {
                            buttonsToCollect.push(currentButton);
                            LogUtils_logHHAuto("Adding for collection tier (only free) : "+currentTierNb);
                        }
                    }
                }


                if (buttonsToCollect.length >0)
                {
                    function collectPoVRewards()
                    {
                        if (buttonsToCollect.length >0)
                        {
                            LogUtils_logHHAuto("Collecting tier : "+buttonsToCollect[0].getAttribute('tier'));
                            buttonsToCollect[0].click();
                            buttonsToCollect.shift();
                            setTimeout(collectPoVRewards, randomInterval(300, 500));
                        }
                        else
                        {
                            LogUtils_logHHAuto("Path of Valor collection finished.");
                            setTimer('nextPoVCollectTime',getHHScriptVars("maxCollectionDelay"));
                            gotoPage(getHHScriptVars("pagesIDHome"));
                        }
                    }
                    collectPoVRewards();
                    return true;
                }
                else
                {
                    LogUtils_logHHAuto("No Path of Valor reward to collect.");
                    setTimer('nextPoVCollectTime',getHHScriptVars("maxCollectionDelay"));
                    setTimer('nextPoVCollectAllTime',getHHScriptVars("maxCollectionDelay"));
                    gotoPage(getHHScriptVars("pagesIDHome"));
                    return false;
                }
            }
            return false;
        }
        else
        {
            LogUtils_logHHAuto("Switching to Path of Valor screen.");
            gotoPage(getHHScriptVars("pagesIDPoV"));
            return true;
        }
    }
    static styles(){

    }
    static maskReward(){
        EventModule.moduleSimPoVPogMaskReward('pov_tab_container');
    }

}
;// CONCATENATED MODULE: ./src/Module/Events/Season.js

    
    



class Season {
    static getRemainingTime(){
        const seasonTimer = unsafeWindow.season_sec_untill_event_end;

        if ( seasonTimer != undefined && (getSecondsLeft("SeasonRemainingTime") === 0 || StorageHelper_getStoredValue("HHAuto_Temp_SeasonEndDate") === undefined) )
        {
            setTimer("SeasonRemainingTime",seasonTimer);
            StorageHelper_setStoredValue("HHAuto_Temp_SeasonEndDate",Math.ceil(new Date().getTime()/1000)+seasonTimer);
        }
    }
    static displayRemainingTime()
    {
        EventModule.displayGenericRemainingTime("#scriptSeasonTime", "season", "HHAutoSeasonTimer", "SeasonRemainingTime", "HHAuto_Temp_SeasonEndDate");
    }

    static getEnergy() {
        return Number(getHHVars('Hero.energies.kiss.amount'));
    }

    static getEnergyMax() {
        return Number(getHHVars('Hero.energies.kiss.max_regen_amount'));
    }

    static isTimeToFight() {
        const energyAboveThreshold = Season.getEnergy() > Number(StorageHelper_getStoredValue("HHAuto_Setting_autoSeasonThreshold"));
        const paranoiaSpending = Season.getEnergy() > 0 && Number(checkParanoiaSpendings('kiss')) > 0;
        const needBoosterToFight = StorageHelper_getStoredValue("HHAuto_Setting_autoSeasonBoostedOnly") === "true";
        const haveBoosterEquiped = Booster.haveBoosterEquiped();

        if(checkTimer('nextSeasonTime') && energyAboveThreshold && needBoosterToFight && !haveBoosterEquiped) {
            LogUtils_logHHAuto('Time for season but no booster equipped');
        }

        return (checkTimer('nextSeasonTime') && energyAboveThreshold && (needBoosterToFight && haveBoosterEquiped || !needBoosterToFight)) || paranoiaSpending;
    }

    static moduleSimSeasonBattle()
    {
        let doDisplay=false;
        let mojoOppo=[];
        let scoreOppo=[];
        let nameOppo=[];
        let expOppo=[];
        let affOppo=[];
        try
        {
            // TODO update
            if ($("div.matchRatingNew img#powerLevelScouter").length != 3)
            {
                doDisplay=true;
            }
            const playerStats = {};
            $('#season-arena .battle_hero .player_stats .player_stats_row div').each(function ()
                                                                                {
                playerStats[$('span[carac]',this).attr('carac')]=$('span:not([carac])',this)[0].innerText.replace(/[^0-9]/gi, '');
            });
            // player stats
            const playerEgo = Math.round(playerStats.ego);
            const playerDef = Math.round(playerStats.def0);
            const playerAtk = Math.round(playerStats.damage);
            const playerCrit = Math.round(playerStats.chance);
            const playerTeamElement = Array();
            for (var i=0; i<$('#season-arena .battle_hero .team-theme.icon').length; i++)
            {
                const teamElement = $('#season-arena .battle_hero .team-theme.icon')[i].attributes.src.value.match(/girls_elements\/(.*?).png/)[1];
                playerTeamElement.push(teamElement);
            }
            const playerTeam = $('#season-arena .battle_hero .player-team .team-member img').map((i, el) => $(el).data('new-girl-tooltip')).toArray();
            const playerSynergies = JSON.parse($('#season-arena .battle_hero .player-team .icon-area').attr('synergy-data'));
            const playerTeamMemberElements = playerTeam.map(({element_data: {type: element}})=>element);
            const playerElements = calculateThemeFromElements(playerTeamMemberElements)
            const playerBonuses = {
                critDamage: playerSynergies.find(({element: {type}})=>type==='fire').bonus_multiplier,
                critChance: playerSynergies.find(({element: {type}})=>type==='stone').bonus_multiplier,
                defReduce: playerSynergies.find(({element: {type}})=>type==='sun').bonus_multiplier,
                healOnHit: playerSynergies.find(({element: {type}})=>type==='water').bonus_multiplier
            };

            let opponents = $('div.opponents_arena .season_arena_opponent_container');
            for (let index=0;index<3;index++)
            {

                const opponentName = $("div.player-name",opponents[index])[0].innerText;
                const opponentEgo = manageUnits($('.player_stats .player_stats_row span.carac_value',opponents[index])[2].innerText);
                const opponentDef = manageUnits($('.player_stats .player_stats_row span.carac_value',opponents[index])[1].innerText);
                const opponentAtk = manageUnits($('.player_stats .player_stats_row span.carac_value',opponents[index])[0].innerText);
                const opponentCrit = manageUnits($('.player_stats .player_stats_row span.carac_value',opponents[index])[3].innerText);
                const opponentTeam = $('.team-member img',opponents[index]).map((i, el) => $(el).data('new-girl-tooltip')).toArray();
                const opponentTeamMemberElements = opponentTeam.map(({element})=>element);
                const opponentElements = calculateThemeFromElements(opponentTeamMemberElements);
                const opponentBonuses = calculateSynergiesFromTeamMemberElements(opponentTeamMemberElements);
                const dominanceBonuses = calculateDominationBonuses(playerElements, opponentElements);
                const player = {
                    hp: playerEgo * (1 + dominanceBonuses.player.ego),
                    dmg: (playerAtk * (1 + dominanceBonuses.player.attack)) - (opponentDef * (1 - playerBonuses.defReduce)),
                    critchance: calculateCritChanceShare(playerCrit, opponentCrit) + dominanceBonuses.player.chance + playerBonuses.critChance,
                    bonuses: playerBonuses
                };
                const opponent = {
                    hp: opponentEgo * (1 + dominanceBonuses.opponent.ego),
                    dmg: (opponentAtk * (1 + dominanceBonuses.opponent.attack)) - (playerDef * (1 - opponentBonuses.defReduce)),
                    critchance: calculateCritChanceShare(opponentCrit, playerCrit) + dominanceBonuses.opponent.chance + opponentBonuses.critChance,
                    name: opponentName,
                    bonuses: opponentBonuses
                };


                if (doDisplay)
                {
                    //console.log("HH simuFight",JSON.stringify(player),JSON.stringify(opponent), opponentBonuses);
                }
                const simu = calculateBattleProbabilities(player, opponent)

                //console.log(player,opponent);
                //console.log(simu);
                //matchRating=customMatchRating(simu);
                scoreOppo[index]=simu;
                mojoOppo[index]=Number($(".slot_victory_points .amount",opponents[index])[0].innerText);
                //logHHAuto(mojoOppo[index]);
                nameOppo[index]=opponentName;
                expOppo[index]=Number($(".slot_season_xp_girl",opponents[index])[0].lastElementChild.innerText.replace(/\D/g, ''));
                affOppo[index]=Number($(".slot_season_affection_girl",opponents[index])[0].lastElementChild.innerText.replace(/\D/g, ''));
                //Publish the ego difference as a match rating
                //matchRatingFlag = matchRating.substring(0,1);
                //matchRating = matchRating.substring(1);

                GM_addStyle('#season-arena .opponents_arena .opponent_perform_button_container {'
                        + 'width: 200px;}'
                    );

                GM_addStyle('.green_button_L.btn_season_perform, .leagues_team_block .challenge button.blue_button_L {'
                        + 'background-image: linear-gradient(to top,#008ed5 0,#05719c 100%);'
                        + '-webkit-box-shadow: 0 3px 0 rgb(13 22 25 / 35%), inset 0 3px 0 #6df0ff;'
                        + '-moz-box-shadow: 0 3px 0 rgba(13,22,25,.35),inset 0 3px 0 #6df0ff;'
                        + 'box-shadow: 0 3px 0 rgb(13 22 25 / 35%), inset 0 3px 0 #6df0ff;}'
                    );

                GM_addStyle('#season-arena .matchRatingNew {'
                        + 'display: flex;'
                        + 'align-items: center;'
                        + 'justify-content: space-between;}'
                    );

                $('.player-panel-buttons .btn_season_perform',opponents[index]).contents().filter(function() {return this.nodeType===3;}).remove();
                $('.player-panel-buttons .btn_season_perform',opponents[index]).find('span').remove();
                $('.player-panel-buttons .opponent_perform_button_container .green_button_L.btn_season_perform .energy_kiss_icn.kiss_icon_s').remove();

                if (doDisplay)
                {
                    $('.player-panel-buttons .opponent_perform_button_container .green_button_L.btn_season_perform',opponents[index]).prepend(`<div class="matchRatingNew ${simu.scoreClass}"><img id="powerLevelScouter" src=${getHHScriptVars("powerCalcImages")[simu.scoreClass]}>${nRounding(100*simu.win, 2, -1)}%</div>`);
                }
            }

            var chosenID = -1;
            var chosenRating = -1;
            var chosenFlag = -1;
            var chosenMojo = -1;
            let currentExp;
            let currentAff;
            var currentFlag;
            var currentScore;
            var currentMojo;
            var numberOfReds=0;
            let currentGains;
            let oppoName;

            for (let index=0;index<3;index++)
            {
                let isBetter = false;
                currentScore = Number(scoreOppo[index].win);
                currentFlag = scoreOppo[index].scoreClass;
                currentMojo = Number(mojoOppo[index]);
                currentExp=Number(expOppo[index]);
                currentAff=Number(affOppo[index]);
                switch (currentFlag)
                {
                    case 'plus':
                        currentFlag = 1;
                        break;
                    case 'close':
                        currentFlag = 0;
                        break;
                    case 'minus':
                        currentFlag = -1;
                        numberOfReds++;
                        break;
                }
                //logHHAuto({OppoName:nameOppo[index],OppoFlag:currentFlag,OppoScore:currentScore,OppoMojo:currentMojo});
                //not chosen or better flag
                if (chosenRating == -1 || chosenFlag < currentFlag)
                {
                    //logHHAuto('first');
                    isBetter = true;
                    currentGains = currentAff + currentExp;
                }
                //same orange flag but better score
                else if (chosenFlag == currentFlag && currentFlag == 0 && chosenRating < currentScore)
                {
                    //logHHAuto('second');
                    isBetter = true;
                }
                //same red flag but better mojo
                else if (chosenFlag == currentFlag && currentFlag == -1 && chosenMojo < currentMojo)
                {
                    //logHHAuto('second');
                    isBetter = true;
                }
                //same green flag but better mojo
                else if (chosenFlag == currentFlag && currentFlag == 1 && chosenMojo < currentMojo)
                {
                    //logHHAuto('third');
                    isBetter = true;
                }
                //same green flag same mojo but better gains
                else if (chosenFlag == currentFlag && currentFlag == 1 && chosenMojo == currentMojo && currentGains < currentAff + currentExp)
                {
                    //logHHAuto('third');
                    isBetter = true;
                }
                //same green flag same mojo same gains but better score
                else if (chosenFlag == currentFlag && currentFlag == 1 && chosenMojo == currentMojo && currentGains === currentAff + currentExp && currentScore > chosenRating)
                {
                    //logHHAuto('third');
                    isBetter = true;
                }
                if (isBetter) {
                    chosenRating = currentScore;
                    chosenFlag = currentFlag;
                    chosenID = index;
                    chosenMojo = currentMojo;
                    oppoName = nameOppo[index];
                }
            }

            var price=Number($("div.opponents_arena button#refresh_villains").attr('price'));
            if (isNaN(price))
            {
                price = 12;
            }
            if (numberOfReds === 3 && StorageHelper_getStoredValue("HHAuto_Setting_autoSeasonPassReds") === "true" && getHHVars('Hero.currencies.hard_currency')>=price+Number(StorageHelper_getStoredValue("HHAuto_Setting_kobanBank")))
            {
                chosenID = -2;
            }

            $($('div.season_arena_opponent_container div.matchRatingNew')).append(`<img id="powerLevelScouterNonChosen">`);

            GM_addStyle('#powerLevelScouterChosen, #powerLevelScouterNonChosen {'
                        + 'width: 25px;}'
                    );

            //logHHAuto("Best opportunity opponent : "+oppoName+'('+chosenRating+')');
            if (doDisplay)
            {
                $($('.season_arena_opponent_container .matchRatingNew #powerLevelScouterNonChosen')[chosenID]).remove();
                $($('div.season_arena_opponent_container div.matchRatingNew')[chosenID]).append(`<img id="powerLevelScouterChosen" src=${getHHScriptVars("powerCalcImages").chosen}>`);

                //CSS

                GM_addStyle('.matchRatingNew {'
                            + 'text-align: center; '
                            + 'text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000; '
                            + 'line-height: 17px; '
                            + 'font-size: 14px;}'
                        );

                GM_addStyle('.plus {'
                            + 'color: #66CD00;}'
                        );

                GM_addStyle('.minus {'
                            + 'color: #FF2F2F;}'
                        );

                GM_addStyle('.close {'
                            + 'color: #FFA500;}'
                        );

                GM_addStyle('#powerLevelScouter {'
                        + 'width: 25px;}'
                    );
                GM_addStyle('#powerLevelScouterChosen {'
                            + 'width: 25px;}'
                        );
            }
            return chosenID;
        }
        catch(err)
        {
            LogUtils_logHHAuto("Catched error : Could not display season score : "+err);
            return -1;
        }
    }
    static run(){
        LogUtils_logHHAuto("Performing auto Season.");
        // Confirm if on correct screen.
        const Hero = getHero();
        var page = getPage();
        var current_kisses = Season.getEnergy();
        if (page === getHHScriptVars("pagesIDSeasonArena"))
        {
            LogUtils_logHHAuto("On season arena page.");
    
            var chosenID=Season.moduleSimSeasonBattle();
            if (chosenID === -2 )
            {
                //change opponents and reload
    
                function refreshOpponents()
                {
                    var params = {
                        namespace: 'h\\Season',
                        class: 'Arena',
                        action: 'arena_reload'
                    };
                    LogUtils_logHHAuto("Three red opponents, paying for refresh.");
                    hh_ajax(params, function(data){
                        Hero.update("hard_currency", data.hard_currency, false);
                        location.reload();
                    })
                }
                StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
                LogUtils_logHHAuto("setting autoloop to false");
                setTimer('nextSeasonTime',5);
                setTimeout(refreshOpponents,randomInterval(800,1600));
    
                return true;
            }
            else if (chosenID === -1 )
            {
                LogUtils_logHHAuto("Season : was not able to choose opponent.");
                setTimer('nextSeasonTime',30*60);
            }
            else
            {
                location.href = document.getElementsByClassName("opponent_perform_button_container")[chosenID].children[0].getAttribute('href');
                StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
                LogUtils_logHHAuto("setting autoloop to false");
                LogUtils_logHHAuto("Going to crush : "+$("div.season_arena_opponent_container .personal_info div.player-name")[chosenID].innerText);
                setTimer('nextSeasonTime',5);
                return true;
            }
        }
        else
        {
            // Switch to the correct screen
            LogUtils_logHHAuto("Remaining kisses : "+ current_kisses);
            if ( current_kisses > 0 )
            {
                LogUtils_logHHAuto("Switching to Season Arena screen.");
                gotoPage(getHHScriptVars("pagesIDSeasonArena"));
            }
            else
            {
                if (getHHVars('Hero.energies.kiss.next_refresh_ts') === 0)
                {
                    setTimer('nextSeasonTime',15*60);
                }
                else
                {
                    setTimer('nextSeasonTime',getHHVars('Hero.energies.kiss.next_refresh_ts') + 10);
                }
                gotoPage(getHHScriptVars("pagesIDHome"));
            }
            return;
        }
    }
    static goAndCollect()
    {
        const rewardsToCollect = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Setting_autoSeasonCollectablesList"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Setting_autoSeasonCollectablesList")):[];

        if (getPage() === getHHScriptVars("pagesIDSeason"))
        {
            Season.getRemainingTime();
            const seasonEnd = getSecondsLeft("SeasonRemainingTime");
            LogUtils_logHHAuto("Season end in " + debugDate(seasonEnd));

            if (checkTimer('nextSeasonCollectAllTime') && seasonEnd < getLimitTimeBeforeEnd() && StorageHelper_getStoredValue("HHAuto_Setting_autoSeasonCollectAll") === "true")
            {
                if($(getHHScriptVars("selectorClaimAllRewards")).length > 0)
                {
                    LogUtils_logHHAuto("Going to collect all Season item at once.");
                    setTimeout(function (){
                        $(getHHScriptVars("selectorClaimAllRewards"))[0].click();
                        setTimer('nextSeasonCollectAllTime', getHHScriptVars("maxCollectionDelay")); // Add timer to check again later if there is new items to collect
                        setTimeout(function (){gotoPage(getHHScriptVars("pagesIDHome"));},500);
                    },500);
                    return true;
                }
                else
                {
                    setTimer('nextSeasonCollectAllTime', getHHScriptVars("maxCollectionDelay"));
                }
            }
            if (checkTimer('nextSeasonCollectTime') && StorageHelper_getStoredValue("HHAuto_Setting_autoSeasonCollect") === "true")
            {
                LogUtils_logHHAuto("Going to collect Season.");
                LogUtils_logHHAuto("setting autoloop to false");
                StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");

                let limitClassPass = "";
                if ($("div#gsp_btn_holder:visible").length)
                {
                    limitClassPass = ".free_reward"; // without season pass
                }

                let buttonsToCollect = [];
                const listSeasonTiersToClaim = $("#seasons_tab_container .rewards_pair .reward_wrapper.reward_is_claimable"+limitClassPass);
                LogUtils_logHHAuto('Found ' + listSeasonTiersToClaim.length + ' rewards available for collection before filtering');
                for (let currentReward = 0 ; currentReward < listSeasonTiersToClaim.length ; currentReward++)
                {
                    const currentRewardSlot = RewardHelper.getRewardTypeBySlot($(".slot, .shards_girl_ico",listSeasonTiersToClaim[currentReward])[0]);
                    const currentTier = $(".tier_number",$(listSeasonTiersToClaim[currentReward]).parent())[0].innerText;
                    //console.log(currentRewardSlot);
                    if (rewardsToCollect.includes(currentRewardSlot))
                    {
                        if (listSeasonTiersToClaim[currentReward].className.indexOf('pass-reward') > 0)
                        {
                            LogUtils_logHHAuto("Adding for collection tier n°"+currentTier+" reward (paid) : "+currentRewardSlot);
                            buttonsToCollect.push({reward : currentRewardSlot, button : listSeasonTiersToClaim[currentReward], tier : currentTier, paid:true});
                        }
                        else
                        {
                            LogUtils_logHHAuto("Adding for collection n°"+currentTier+" reward (free) : "+currentRewardSlot);
                            buttonsToCollect.push({reward : currentRewardSlot, button : listSeasonTiersToClaim[currentReward], tier : currentTier, paid:false});
                        }
                    }
                }

                //console.log(JSON.stringify(buttonsToCollect));
                if (buttonsToCollect.length >0)
                {
                    function collectSeasonRewards(inHasSelected = false)
                    {
                        if (buttonsToCollect.length >0)
                        {
                            const currentToCollect = buttonsToCollect[0];
                            if (inHasSelected)
                            {
                                const rewardPlaceHolder = $("#preview_placeholder .reward_wrapper.reward_is_claimable, #preview_placeholder .reward_wrapper.reward_is_next");
                                const currentSelectedRewardType = RewardHelper.getRewardTypeBySlot($(".slot, .shards_girl_ico",rewardPlaceHolder)[0]);
                                const currentTier = $("#preview_tier")[0].innerText.split(" ")[1];
                                if (
                                    rewardPlaceHolder.length >0
                                    && rewardsToCollect.includes(currentSelectedRewardType)
                                    && currentSelectedRewardType === currentToCollect.reward
                                    && currentTier === currentToCollect.tier
                                )
                                {
                                    LogUtils_logHHAuto("Collecting tier n°"+currentToCollect.tier+" : "+currentSelectedRewardType);
                                    setTimeout(function (){$("#claim_btn_s")[0].click();},500);
                                }
                                else
                                {
                                    LogUtils_logHHAuto(`Issue collecting n°${currentToCollect.tier} : ${currentToCollect.reward} : \n`
                                            +`rewardPlaceHolder.length : ${rewardPlaceHolder.length}\n`
                                            +`rewardsToCollect.includes(currentSelectedRewardType) : ${rewardsToCollect.includes(currentSelectedRewardType)}\n`
                                            +`currentSelectedRewardType : ${currentSelectedRewardType} / currentToCollect.reward : ${currentToCollect.reward} => ${currentSelectedRewardType === currentToCollect.reward}\n`
                                            +`currentTier : ${currentTier} / currentToCollect.tier : ${currentToCollect.tier} => ${currentTier === currentToCollect.tier}`);

                                    LogUtils_logHHAuto("Proceeding with next one.");
                                }

                                buttonsToCollect.shift();
                                setTimeout(collectSeasonRewards,1000);
                                return;
                            }
                            else
                            {
                                LogUtils_logHHAuto("Selecting reward n°"+currentToCollect.tier+" : "+currentToCollect.reward);
                                currentToCollect.button.click();
                                setTimeout(function () {collectSeasonRewards(true);}, randomInterval(300, 500));
                            }
                        }
                        else
                        {
                            LogUtils_logHHAuto("Season collection finished.");
                            setTimer('nextSeasonCollectTime',getHHScriptVars("maxCollectionDelay"));
                            gotoPage(getHHScriptVars("pagesIDHome"));
                        }
                    }
                    collectSeasonRewards();
                    return true;
                }
                else
                {
                    LogUtils_logHHAuto("No season collection to do.");
                    setTimer('nextSeasonCollectTime',getHHScriptVars("maxCollectionDelay"));
                    setTimer('nextSeasonCollectAllTime',getHHScriptVars("maxCollectionDelay"));
                    gotoPage(getHHScriptVars("pagesIDHome"));
                    return false;
                }
            }
            return false;
        }
        else
        {
            LogUtils_logHHAuto("Switching to Season Rewards screen.");
            gotoPage(getHHScriptVars("pagesIDSeason"));
            return true;
        }
    }
    static styles(){
        if (StorageHelper_getStoredValue("HHAuto_Setting_SeasonMaskRewards") === "true")
        {
            Season.maskReward();
        }
    }
    static maskReward()
    {
        if($('.HHaHidden').length > 0 || $('.script-hide-claimed').length > 0  /*OCD*/) {
            return;
        }
        var arrayz;
        var nbReward;
        let modified=false;
        arrayz = $('.rewards_pair:not([style*="display:none"]):not([style*="display: none"])');
        if ($("div#gsp_btn_holder[style='display: none;']").length)
        {
            nbReward=2;
        }
        else
        {
            nbReward=1;
        }

        var obj;
        if (arrayz.length > 0) {
            for (var i2 = arrayz.length - 1; i2 >= 0; i2--) {
                obj = $(arrayz[i2]).find('.tick_s:not([style*="display:none"]):not([style*="display: none"])');
                if (obj.length >= nbReward) {
                    //console.log("width : "+arrayz[i2].offsetWidth);
                    //document.getElementById('rewards_cont_scroll').scrollLeft-=arrayz[i2].offsetWidth;
                    arrayz[i2].style.display = "none";
                    $(arrayz[i2]).addClass('HHaHidden');
                    modified = true;
                }
            }
        }
        if (modified)
        {
            $('.rewards_seasons_row').css('width', 'max-content');
            const $rowScroll = $('.rewards_container_seasons');
            if ($rowScroll.length && $rowScroll.getNiceScroll(0).doScrollLeft) {
                $rowScroll.getNiceScroll().resize();
                $rowScroll.getNiceScroll(0).doScrollLeft(0,200);
            }
        }
    }
}
;// CONCATENATED MODULE: ./src/Module/Events/Seasonal.js




class SeasonalEvent {
    static isMegaSeasonalEvent() {
        return $('.mega-event-container').length > 0
    }
    static isMegaPassPaid() {
        return $('#get_mega_pass_kobans_btn:visible').length <= 0
    }
    static getRemainingTime(){
        const isMegaSeasonalEvent = SeasonalEvent.isMegaSeasonalEvent();
        const seasonalEventTimerRequest = isMegaSeasonalEvent 
                                        ? `.mega-event-panel .mega-event-container .mega-timer span[rel=expires]`
                                        : `.seasonal-event-panel .seasonal-event-container .seasonal-timer span[rel=expires]`;

        if ( $(seasonalEventTimerRequest).length > 0 && (getSecondsLeft("SeasonalEventRemainingTime") === 0 || StorageHelper_getStoredValue("HHAuto_Temp_SeasonalEventEndDate") === undefined) )
        {
            const seasonalEventTimer = Number(convertTimeToInt($(seasonalEventTimerRequest).text()));
            setTimer("SeasonalEventRemainingTime",seasonalEventTimer);
            StorageHelper_setStoredValue("HHAuto_Temp_SeasonalEventEndDate",Math.ceil(new Date().getTime()/1000)+seasonalEventTimer);
        }
    }
    static displayRemainingTime()
    {
        LogUtils_logHHAuto('Not implemented');
    }
    static getSeasonalNotClaimedRewards(){
        const arrayz = $('.seasonal-tier.unclaimed');
        const freeSlotSelectors = ".slot";
        const paidSlotSelectors = ""; // Not available

        return RewardHelper.computeRewardsCount(arrayz, freeSlotSelectors, paidSlotSelectors);
    }
    static getMegaSeasonalNotClaimedRewards(){
        const arrayz = $('.mega-tier-container:has(.free-slot button.mega-claim-reward)');
        const freeSlotSelectors = ".free-slot .slot";
        const paidSlotSelectors = SeasonalEvent.isMegaPassPaid() ? ".paid-unclaimed .slot" : "";

        return RewardHelper.computeRewardsCount(arrayz, freeSlotSelectors, paidSlotSelectors);
    }
    static goAndCollect()
    {
        const rewardsToCollect = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Setting_autoSeasonalEventCollectablesList"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Setting_autoSeasonalEventCollectablesList")):[];

        if (getPage() === getHHScriptVars("pagesIDSeasonalEvent"))
        {
            SeasonalEvent.getRemainingTime();
            const isMegaSeasonalEvent = SeasonalEvent.isMegaSeasonalEvent();
            const seasonalEventEnd = getSecondsLeft("SeasonalEventRemainingTime");
            // logHHAuto("Seasonal end in " + seasonalEventEnd);
            const needToCollect = (checkTimer('nextSeasonalEventCollectTime') && StorageHelper_getStoredValue("HHAuto_Setting_autoSeasonalEventCollect") === "true")
            const needToCollectAllBeforeEnd = (checkTimer('nextSeasonalEventCollectAllTime') && seasonalEventEnd < getLimitTimeBeforeEnd() && StorageHelper_getStoredValue("HHAuto_Setting_autoSeasonalEventCollectAll") === "true");

            const seasonalTierQuery = "#home_tab_container div.bottom-container div.right-part-container div.seasonal-progress-bar-tiers div.seasonal-tier.unclaimed";
            const megaSeasonalTierQuery = "#home_tab_container div.bottom-container div.right-part-container div.mega-progress-bar-section div.mega-tier-container:has(.free-slot button.mega-claim-reward)";
            const seasonalFreeSlotQuery = ".seasonal-slot .slot,.seasonal-slot .slot_girl_shards";
            const seasonalPaidSlotQuery = ""; // N/A
            const megaSeasonalFreeSlotQuery = ".free-slot .slot";
            const megaSeasonalPaidSlotQuery = ".pass-slot.paid-unclaimed .slot";

            if (needToCollect || needToCollectAllBeforeEnd)
            {
                if (needToCollect) LogUtils_logHHAuto("Checking SeasonalEvent for collectable rewards.");
                if (needToCollectAllBeforeEnd) LogUtils_logHHAuto("Going to collect all SeasonalEvent rewards.");
                LogUtils_logHHAuto("setting autoloop to false");
                StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
                let buttonsToCollect = [];

                const listSeasonalEventTiersToClaim = isMegaSeasonalEvent ? $(megaSeasonalTierQuery) : $(seasonalTierQuery);
                const freeSlotQuery =  isMegaSeasonalEvent ? megaSeasonalFreeSlotQuery : seasonalFreeSlotQuery;
                const paidSlotQuery =  isMegaSeasonalEvent ? megaSeasonalPaidSlotQuery : seasonalPaidSlotQuery;
                const isPassPaid =  SeasonalEvent.isMegaPassPaid();

                for (let currentTier = 0 ; currentTier < listSeasonalEventTiersToClaim.length ; currentTier++)
                {
                    const currentButton = $("button[rel='claim']", listSeasonalEventTiersToClaim[currentTier])[0];
                    const currentTierNb = currentButton.getAttribute("tier");
                    //console.log("checking tier : "+currentTierNb);
                    const freeSlotType = RewardHelper.getRewardTypeBySlot($(freeSlotQuery,listSeasonalEventTiersToClaim[currentTier])[0]);
                    if (rewardsToCollect.includes(freeSlotType) || needToCollectAllBeforeEnd)
                    {
                        
                        if (isPassPaid) {
                            // One button for both
                            const paidSlotType = RewardHelper.getRewardTypeBySlot($(paidSlotQuery, listSeasonalEventTiersToClaim[currentTier])[0]);
                            if (rewardsToCollect.includes(paidSlotType) || needToCollectAllBeforeEnd)
                            {
                                buttonsToCollect.push(currentButton);
                                LogUtils_logHHAuto("Adding for collection tier (free + paid) : "+currentTierNb);
                            } else {
                                LogUtils_logHHAuto("Can't add tier " + currentTierNb + " as paid reward isn't to be colled");
                            }
                        } else {
                            buttonsToCollect.push(currentButton);
                            LogUtils_logHHAuto("Adding for collection tier (only free) : "+currentTierNb);
                        }
                    }
                }

                if (buttonsToCollect.length >0)
                {
                    function collectSeasonalEventRewards()
                    {
                        if (buttonsToCollect.length >0)
                        {
                            LogUtils_logHHAuto("Collecting tier : "+buttonsToCollect[0].getAttribute('tier'));
                            buttonsToCollect[0].click();
                            buttonsToCollect.shift();
                            setTimeout(collectSeasonalEventRewards, randomInterval(300, 500));
                        }
                        else
                        {
                            LogUtils_logHHAuto("SeasonalEvent collection finished.");
                            setTimer('nextSeasonalEventCollectTime',getHHScriptVars("maxCollectionDelay"));
                            gotoPage(getHHScriptVars("pagesIDHome"));
                        }
                    }
                    collectSeasonalEventRewards();
                    return true;
                }
                else
                {
                    LogUtils_logHHAuto("No SeasonalEvent reward to collect.");
                    setTimer('nextSeasonalEventCollectTime',getHHScriptVars("maxCollectionDelay"));
                    setTimer('nextSeasonalEventCollectAllTime',getHHScriptVars("maxCollectionDelay"));
                    gotoPage(getHHScriptVars("pagesIDHome"));
                    return false;
                }
            }
            return false;
        }
        else if(unsafeWindow.seasonal_event_active || unsafeWindow.seasonal_time_remaining > 0)
        {
            LogUtils_logHHAuto("Switching to SeasonalEvent screen.");
            gotoPage(getHHScriptVars("pagesIDSeasonalEvent"));
            return true;
        }
        else
        {
            LogUtils_logHHAuto("No SeasonalEvent active.");
            setTimer('nextSeasonalEventCollectTime', 604800); // 1 week delay
            setTimer('nextSeasonalEventCollectAllTime', 604800); // 1 week delay
            return false;
        }
    }
    static styles(){
        if (StorageHelper_getStoredValue("HHAuto_Setting_SeasonalEventMaskRewards") === "true")
        {
            SeasonalEvent.maskReward();
        }
    }
    static maskReward(){

        var arrayz;
        let modified = false;
        
        const isMegaSeasonalEvent = SeasonalEvent.isMegaSeasonalEvent();
        const seasonalTierQuery = ".seasonal-progress-bar-tiers .seasonal-tier-container";
        const megaSeasonalTierQuery = ".mega-progress-bar-tiers .mega-tier-container";

        arrayz = $((isMegaSeasonalEvent ? megaSeasonalTierQuery : seasonalTierQuery) + ':not([style*="display:none"]):not([style*="display: none"])');
        var obj;
        if (arrayz.length > 0)
        {
            for (var i2 = arrayz.length - 1; i2 >= 0; i2--)
            {
                obj = $(arrayz[i2]).find('.claimed:not([style*="display:none"]):not([style*="display: none"])'); // TODO ".paid-claimed .slot"
                if (obj.length >= 1)
                {
                    arrayz[i2].style.display = "none";
                    modified = true;
                }
            }
        }
    
        if (modified)
        {
            let divToModify = $('.seasonal-progress-bar-section, .mega-progress-bar-section');
            if (divToModify.length > 0)
            {
                divToModify.getNiceScroll().resize();
    
                const width_px = 152.1;
                const start_px = 101;
                const rewards_unclaimed = $('.seasonal-tier.unclaimed, .free-slot:not(.claimed)').length;
                const scroll_width_hidden = parseInt(start_px + (rewards_unclaimed - 1) * width_px, 10);
                $('.seasonal-progress-bar-current, .mega-progress-bar').css('width', scroll_width_hidden + 'px');
    
                try {
                    divToModify.getNiceScroll(0).doScrollLeft(0, 200);
                } catch(err) {}
            }
        }
    }
    static displayGirlsMileStones() {
        if($('.HHGirlMilestone').length > 0) return;
        const playerPoints = Number($('.player-shards .circle-container').text());

        const girlContainer = $('.girls-reward-container');

        const girlSlotRewards = $('#home_tab_container .bottom-container .slot.slot_girl_shards');
        if(SeasonalEvent.isMegaSeasonalEvent()) {
            girlSlotRewards.each(function(index, girlSlot) {
                const milestone = Number($('.tier-level p',$(girlSlot).parents('.mega-tier-container')).text());
                if(milestone > 0) {
                    girlContainer.append(SeasonalEvent.getGirlMileStonesDiv(playerPoints, milestone, index+1))
                }
            });
        } else {
            LogUtils_logHHAuto('Seasonal event not mega is not Yet implemented');
            girlContainer.append($('<div class="HHGirlMilestone" style="display:none;"></div>'));
        }
    }
    static getGirlMileStonesDiv(playerPoints, girlPointsTarget, girlIndex) {
        const greeNitckHtml = '<img class="nc-claimed-reward-check" src="'+getHHScriptVars("baseImgPath")+'/clubs/ic_Tick.png">';
        const girlDiv = $('<div class="HHGirlMilestone girl-img-'+girlIndex+'"><div>Girl '+girlIndex+':'+playerPoints+'/'+girlPointsTarget+'</div></div>');
        if(playerPoints >= girlPointsTarget) {
            girlDiv.addClass('green');
            girlDiv.append($(greeNitckHtml));
        }
        return girlDiv;
    }
    static displayRewardsSeasonalDiv() {
        const target = $('.girls-reward-container'); // $('.event-resource-location');
        const hhRewardId = 'HHSeasonalRewards';
        const isMegaSeasonalEvent = SeasonalEvent.isMegaSeasonalEvent();
        try{
            if($('#' + hhRewardId).length <= 0) {
                const rewardCountByType = isMegaSeasonalEvent ? SeasonalEvent.getMegaSeasonalNotClaimedRewards() : SeasonalEvent.getSeasonalNotClaimedRewards();
                LogUtils_logHHAuto("Rewards seasonal event:", JSON.stringify(rewardCountByType));
                if (rewardCountByType['all'] > 0) {
                    // GM_addStyle('.seasonal-event-panel .seasonal-event-container .tabs-section #home_tab_container .middle-container .event-resource-location .buttons-container { height: 5rem; margin-top: 0;}'); 
                    // GM_addStyle('.seasonal-event-panel .seasonal-event-container .tabs-section #home_tab_container .middle-container .event-resource-location .buttons-container a { height: 2rem;}'); 

                    const rewardsHtml = RewardHelper.getRewardsAsHtml(rewardCountByType);
                    target.append($('<div id='+hhRewardId+' class="HHRewardNotCollected"><h1 style="font-size: small;">'+getTextForUI('rewardsToCollectTitle',"elementText")+'</h1>' + rewardsHtml + '</div>'));
                } else {
                    target.append($('<div id='+hhRewardId+' style="display:none;"></div>'));
                }
            }
        } catch(err) {
            LogUtils_logHHAuto("ERROR:", err.message);
            target.append($('<div id='+hhRewardId+' style="display:none;"></div>'));
        }
    }
    static goAndCollectMegaEventRankRewards() {
        if (getPage() === getHHScriptVars("pagesIDSeasonalEvent"))
        {
            const isMegaSeasonalEvent = SeasonalEvent.isMegaSeasonalEvent();
            if(!isMegaSeasonalEvent) {
                LogUtils_logHHAuto('Not Mega Event');
                setTimer('nextMegaEventRankCollectTime', 604800); // 1 week delay
                return;
            }
            LogUtils_logHHAuto('Collect Mega Event Rank Rewards');
            // switch tabs
            $('#mega-event-tabs #top_ranking_tab').click();

            setTimer('nextMegaEventRankCollectTime', getSecondsLeftBeforeEndOfHHDay() + 3600);
        }
        else if(unsafeWindow.seasonal_event_active || unsafeWindow.seasonal_time_remaining > 0)
        {
            LogUtils_logHHAuto("Switching to SeasonalEvent screen.");
            gotoPage(getHHScriptVars("pagesIDSeasonalEvent"));
            return true;
        }
        else
        {
            LogUtils_logHHAuto("No SeasonalEvent active.");
            setTimer('nextMegaEventRankCollectTime', 604800); // 1 week delay
            return false;
        }
    }
}
;// CONCATENATED MODULE: ./src/Module/Events/index.js








;// CONCATENATED MODULE: ./src/Module/Quest.js




class QuestHelper {
    static SITE_QUEST_PAGE = '/side-quests.html';

    static getEnergy() {
        return Number(getHHVars('Hero.energies.quest.amount'));
    }

    static getEnergyMax() {
        return Number(getHHVars('Hero.energies.quest.max_regen_amount'));
    }

    static getNextQuestLink() {
        const mainQuest = StorageHelper_getStoredValue("HHAuto_Setting_autoQuest") === "true";
        const sideQuest = getHHScriptVars("isEnabledSideQuest",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoSideQuest") === "true";
        let nextQuestUrl = QuestHelper.getMainQuestUrl();

        if ((mainQuest && sideQuest && (nextQuestUrl.includes("world"))) || (!mainQuest && sideQuest))
        {
            nextQuestUrl = QuestHelper.SITE_QUEST_PAGE;
        }
        else if (nextQuestUrl.includes("world"))
        {
            return false;
        }
        return nextQuestUrl;
    }
    static getMainQuestUrl() {
        let mainQuestUrl = getHHVars('Hero.infos.questing.current_url');
        const id_world = getHHVars('Hero.infos.questing.id_world');
        const id_quest = getHHVars('Hero.infos.questing.id_quest');
        const lastQuestId = getHHScriptVars("lastQuestId",false);

        if (id_world < (Trollz.length) || lastQuestId > 0 && id_quest != lastQuestId) {
            // Fix when KK quest url is world url
            mainQuestUrl = "/quest/" + id_quest;
        }
        return mainQuestUrl;
    }
    static run(){
        //logHHAuto("Starting auto quest.");
        // Check if at correct page.
        let page = getPage();
        let mainQuestUrl = QuestHelper.getMainQuestUrl();
        let doMainQuest = StorageHelper_getStoredValue("HHAuto_Setting_autoQuest") === "true" && !mainQuestUrl.includes("world");
        if (!doMainQuest && page === 'side-quests' && getHHScriptVars("isEnabledSideQuest",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoSideQuest") === "true") {
            var quests = $('.side-quest:has(.slot) .side-quest-button');
            if (quests.length > 0) {
                LogUtils_logHHAuto("Navigating to side quest.");
                gotoPage(quests.attr('href'));
            }
            else {
                LogUtils_logHHAuto("All quests finished, setting timer to check back later!");
                if (checkTimer('nextMainQuestAttempt')) {setTimer('nextMainQuestAttempt', 604800);} // 1 week delay
                setTimer('nextSideQuestAttempt', 604800); // 1 week delay
                location.reload();
            }
            return;
        }
        if (page !== getHHScriptVars("pagesIDQuest") || (doMainQuest && mainQuestUrl != window.location.pathname)) {
            // Click on current quest to naviagte to it.
            LogUtils_logHHAuto("Navigating to current quest.");
            gotoPage(getHHScriptVars("pagesIDQuest"));
            return;
        }
        $("#popup_message close").click();
        // Get the proceed button type
        var proceedButtonMatch = $("#controls button:not([style*='display:none']):not([style*='display: none'])");
        if (proceedButtonMatch.length === 0)
        {
            proceedButtonMatch = $("#controls button#free");
        }
        var proceedType = proceedButtonMatch.attr("id");
        //console.log("DebugQuest proceedType : "+proceedType);
        if (proceedButtonMatch.length === 0)
        {
            LogUtils_logHHAuto("Could not find resume button.");
            return;
        }
        else if (proceedType === "free") {
            LogUtils_logHHAuto("Proceeding for free.");
            //setStoredValue"HHAuto_Temp_autoLoop", "false");
            //logHHAuto("setting autoloop to false");
            //proceedButtonMatch.click();
        }
        else if (proceedType === "pay") {
            var proceedButtonCost = $("#controls button:not([style*='display:none']):not([style*='display: none']) .action-cost .price");
            var proceedCost = parsePrice(proceedButtonCost[0].innerText);
            var payTypeNRJ = $("#controls button:not([style*='display:none']):not([style*='display: none']) .action-cost .energy_quest_icn").length>0;
            var energyCurrent = QuestHelper.getEnergy();
            var moneyCurrent = getHHVars('Hero.currencies.soft_currency');
            let payType = $("#controls .cost span[cur]:not([style*='display:none']):not([style*='display: none'])").attr('cur');
            //console.log("DebugQuest payType : "+payType);
            if (payTypeNRJ)
            {
                // console.log("DebugQuest ENERGY for : "+proceedCost + " / " + energyCurrent);
                if(proceedCost <= energyCurrent)
                {
                    // We have energy.
                    LogUtils_logHHAuto("Spending "+proceedCost+" Energy to proceed.");
                }
                else
                {
                    LogUtils_logHHAuto("Quest requires "+proceedCost+" Energy to proceed.");
                    StorageHelper_setStoredValue("HHAuto_Temp_questRequirement", "*"+proceedCost);
                    return;
                }
            }
            else
            {
                console.log("DebugQuest MONEY for : "+proceedCost);
                if(proceedCost <= moneyCurrent)
                {
                    // We have money.
                    LogUtils_logHHAuto("Spending "+proceedCost+" Money to proceed.");
                }
                else
                {
                    LogUtils_logHHAuto("Need "+proceedCost+" Money to proceed.");
                    StorageHelper_setStoredValue("HHAuto_Temp_questRequirement", "$"+proceedCost);
                    return;
                }
            }
            //proceedButtonMatch.click();
            //setStoredValue("HHAuto_Temp_autoLoop", "false");
            //logHHAuto("setting autoloop to false");
        }
        else if (proceedType === "use_item") {
            LogUtils_logHHAuto("Proceeding by using X" + Number($("#controls .item span").text()) + " of the required item.");
            //proceedButtonMatch.click();
            //setStoredValue("HHAuto_Temp_autoLoop", "false");
            //logHHAuto("setting autoloop to false");
        }
        else if (proceedType === "battle") {
            LogUtils_logHHAuto("Quest need battle...");
            StorageHelper_setStoredValue("HHAuto_Temp_questRequirement", "battle");
            // Proceed to battle troll.
            //proceedButtonMatch.click();
            //setStoredValue("HHAuto_Temp_autoLoop", "false");
            //logHHAuto("setting autoloop to false");
        }
        else if (proceedType === "end_archive") {
            LogUtils_logHHAuto("Reached end of current archive. Proceeding to next archive.");
            //setStoredValue("HHAuto_Temp_autoLoop", "false");
            //logHHAuto("setting autoloop to false");
            //proceedButtonMatch.click();
        }
        else if (proceedType === "end_play") {
            let rewards = $('#popups[style="display: block;"]>#rewards_popup[style="display: block;"] button.blue_button_L[confirm_blue_button]');
            if (proceedButtonMatch.attr('disabled') && rewards.length>0){
                LogUtils_logHHAuto("Reached end of current archive. Claim reward.");
                rewards.click();
                return;
            }
            LogUtils_logHHAuto("Reached end of current play. Proceeding to next play.");
            //setStoredValue("HHAuto_Temp_autoLoop", "false");
            //logHHAuto("setting autoloop to false");
            //proceedButtonMatch.click();
        }
        else {
            LogUtils_logHHAuto("Could not identify given resume button.");
            StorageHelper_setStoredValue("HHAuto_Temp_questRequirement", "unknownQuestButton");
            return;
        }
        StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
        LogUtils_logHHAuto("setting autoloop to false");
        setTimeout(function ()
                    {
            proceedButtonMatch.click();
            StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "true");
            LogUtils_logHHAuto("setting autoloop to true");
            setTimeout(autoLoop,randomInterval(800,1200));
        },randomInterval(500,800));
        //setTimeout(function () {location.reload();},randomInterval(800,1500));
        
    }
}
;// CONCATENATED MODULE: ./src/Module/Champion.js






class Champion {
    run(){
    }

    static ChampDisplayAutoTeamPopup(numberDone,numberEnd,remainingTime)
    {
        $(".champions-top__inner-wrapper").prepend('<div id="popup_message_champ" class="HHpopup_message" name="popup_message_champ" style="margin:0px;width:400px" ><a id="popup_message_champ_close" class="close">&times;</a>'
                        +getTextForUI("autoChampsTeamLoop","elementText")+' : <br>'+numberDone+'/'+numberEnd+' ('+remainingTime+'sec)</div>');
        document.getElementById("popup_message_champ_close").addEventListener("click", function() {location.reload();});
    }
    static ChampClearAutoTeamPopup()
    {
        $("#popup_message_champ").each(function(){this.remove();});
    }

    static ChamppUpdateAutoTeamPopup(numberDone,numberEnd,remainingTime)
    {
        Champion.ChampClearAutoTeamPopup();
        Champion.ChampDisplayAutoTeamPopup(numberDone,numberEnd,remainingTime);
    }

    static moduleSimChampions()
    {
        if($('#updateChampTeamButton').length > 0) {
            return;
        }

        var getPoses = function($images){
            var poses=[];
            $images.each(function(idx,pose){
                var imgSrc = $(pose).attr('src');
                var poseNumber = imgSrc.substring(imgSrc.lastIndexOf('/')+1).replace(/\D/g, '');
                poses.push(poseNumber);
            });
            return poses;
        }
        var getChampMaxLoop = function(){return StorageHelper_getStoredValue("HHAuto_Setting_autoChampsTeamLoop") !== undefined ? StorageHelper_getStoredValue("HHAuto_Setting_autoChampsTeamLoop") : 10;}
        var getMinGirlPower = function(){return StorageHelper_getStoredValue("HHAuto_Setting_autoChampsGirlThreshold") !== undefined ? StorageHelper_getStoredValue("HHAuto_Setting_autoChampsGirlThreshold") : 50000;}
        var getChampSecondLine = function(){return StorageHelper_getStoredValue("HHAuto_Setting_autoChampsTeamKeepSecondLine") === 'true';}

        //let champTeamButton = '<div style="position: absolute;left: 330px;top: 10px;width:90px;z-index:10" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("ChampTeamButton","tooltip")+'</span><label class="myButton" id="ChampTeamButton">'+getTextForUI("ChampTeamButton","elementText")+'</label></div>';

        var champTeam = unsafeWindow.championData.team;
        const champTeamId = Number(getHHVars('championData.champion.id'));
        var freeDrafts = unsafeWindow.championData.freeDrafts;
        var counterLoop = 0;
        let maxLoops = getChampMaxLoop();
        const girlMinPower = getMinGirlPower();
        let keepSecondLineGirls = getChampSecondLine();
        const championRequiredPoses = getPoses($(".champions-over__champion-info.champions-animation .champion-pose"));
        const girlBoxesQuery = ".champions-middle__girl-selection.champions-animation .girl-selection__girl-box";
        const changeDraftButtonQuery =  ".champions-bottom__footer button.champions-bottom__draft-team";
        const newDraftButtonQuery =  ".champions-bottom__footer button.champions-bottom__make-draft";
        const confirmDraftButtonQuery =  ".champions-bottom__footer button.champions-bottom__confirm-team";
        //$(".champions-top__inner-wrapper").append(champTeamButton);
        if(freeDrafts > 0) {
            let updateChampTeamButton = '<div style="position: absolute;left: 330px;top: 10px;width:90px;z-index:10" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("updateChampTeamButton","tooltip")+'</span><label class="myButton" id="updateChampTeamButton">'+getTextForUI("updateChampTeamButton","elementText")+' x'+maxLoops+'</label></div>';
            $(".champions-top__inner-wrapper").append(updateChampTeamButton);
        }

        var indicateBestTeam = function() {
            const girlBoxes = $(girlBoxesQuery);
            var girlsPerPose={};
            var girls=[];
            $(".hhgirlOrder").remove();

            girlBoxes.each(function(girlIndex,girlBox){
                const $girl = $('.girl-box__draggable ', $(girlBox));
                const girlData = champTeam[girlIndex];

                if (girlData.id_girl != $girl.attr('id_girl')) {
                    LogUtils_logHHAuto('Invalid girls ' + girlData.id_girl + 'vs' + $girl.attr('id_girl'));
                    return;
                }

                const poseNumber = girlData.figure;
                if(!girlsPerPose[poseNumber]) {girlsPerPose[poseNumber] = [];}
                girlsPerPose[poseNumber].push({data:girlData,htmlDom:$girl});
                girlsPerPose[poseNumber].sort((a,b) => b.data.damage - a.data.damage);
                girls.push({data:girlData,htmlDom:$girl});
                girls.sort((a,b) => a.data.damage - b.data.damage);
            });

            for(var i=0;i<10;i++) {
                var expectedPose = championRequiredPoses[i%5];
                if(girlsPerPose[expectedPose] && girlsPerPose[expectedPose].length > 0){
                    let color = 'gold'; // i >= 5 ? 'white' : 'gold';
                    girlsPerPose[expectedPose][0].htmlDom.append('<span class="hhgirlOrder" title="'+getTextForUI("ChampGirlOrder","tooltip")+' '+(i+1)+'" style="position: absolute;top: 41px;left: 3px;z-index: 10;color:'+color+';">'+(i+1)+'</span>');
                    girlsPerPose[expectedPose].shift();
                }
                if(girls && girls[i])
                    girls[i].htmlDom.append('<span class="hhgirlOrder" title="'+getTextForUI("ChampGirlLowOrder","tooltip")+' '+(i+1)+'" style="position: absolute;top: 41px;left: 47px;z-index: 10;color:red;">'+(i+1)+'</span>');
            }
        };

        //document.getElementById("ChampTeamButton").addEventListener("click", indicateBestTeam);
        GM_registerMenuCommand(getTextForUI("ChampTeamButton","elementText"), indicateBestTeam);
        $(document).on('click', changeDraftButtonQuery, indicateBestTeam);
        $(document).on('click', newDraftButtonQuery, indicateBestTeam);
        $(document).on('click', confirmDraftButtonQuery, indicateBestTeam);

        var checkAjaxCompleteOnChampionPage = function(event,request,settings) {
            let match = settings.data.match(/action=champion_team_draft/);
            if (match === null) return;
            champTeam = request.responseJSON.teamArray;
            freeDrafts = request.responseJSON.freeDrafts

            setTimeout(indicateBestTeam, 1000);
        };

        var selectGirls = function() {
            Champion.ChamppUpdateAutoTeamPopup(counterLoop+1,maxLoops, (maxLoops-counterLoop) * 5);
            $('#updateChampTeamButton').text( 'Loop ' + (counterLoop+1) + '/' + maxLoops);
            const girlBoxes = $(".champions-middle__girl-selection.champions-animation .girl-selection__girl-box");
            var girlsPerPose={};
            var girls=[];
            var teamGirls=[];
            var girlsClicked = false;

            girlBoxes.each(function(girlIndex,girlBox){
                const $girl = $('.girl-box__draggable ', $(girlBox));
                const girlData = champTeam[girlIndex];

                if (girlData.id_girl != $girl.attr('id_girl')) {
                    LogUtils_logHHAuto('Invalid girls ' + girlData.id_girl + 'vs' + $girl.attr('id_girl'));
                    return;
                }

                const poseNumber = girlData.figure;
                if(!girlsPerPose[poseNumber]) {girlsPerPose[poseNumber] = [];}
                girlsPerPose[poseNumber].push({data:girlData,htmlDom:$girl});
                girlsPerPose[poseNumber].sort((a,b) => b.data.damage - a.data.damage);
                girls.push({data:girlData,htmlDom:$girl});
                girls.sort((a,b) => a.data.damage - b.data.damage);
            });

            const hero_damage = unsafeWindow.championData.hero_damage;
            // Build team
            if (keepSecondLineGirls) {
                var teamGirlIndex = 0;
                for(var i=0;i<10;i++) {
                    var expectedPose = championRequiredPoses[i%5];
                    if(girlsPerPose[expectedPose] && girlsPerPose[expectedPose].length > 0 && teamGirlIndex < 5){
                        if((girlsPerPose[expectedPose][0].data.damage + hero_damage) >= girlMinPower) {
                            teamGirls[teamGirlIndex++] = girlsPerPose[expectedPose][0].data.id_girl;
                        }
                        girlsPerPose[expectedPose].shift();
                    }
                }
            } else {
                for(var i=0;i<5;i++) {
                    var expectedPose = championRequiredPoses[i%5];
                    teamGirls[i] = -1;
                    if(girlsPerPose[expectedPose] && girlsPerPose[expectedPose].length > 0){
                        if((girlsPerPose[expectedPose][0].data.damage + hero_damage) >= girlMinPower) {
                            teamGirls[i] = girlsPerPose[expectedPose][0].data.id_girl;
                        }
                        girlsPerPose[expectedPose].shift();
                    }
                }
            }
            LogUtils_logHHAuto('Team of girls ' + teamGirls);

            var toggleSelectGirl = function(girlId, girlDraggable, timer = 1000){
                setTimeout(function() {
                    console.log("click " + girlId, girlDraggable);
                    girlDraggable.click();
                }, timer);
            };
            // Unselect girls
            const selectedGirls = $(".champions-middle__girl-selection.champions-animation .girl-selection__girl-box .girl-box__draggable.selected");
            selectedGirls.each(function(girlIndex,girlBox){
                const selectedGirlId = $(girlBox).attr('id_girl');
                if(teamGirls.indexOf(selectedGirlId) < 0) {
                    girlsClicked = true;
                    LogUtils_logHHAuto("Unselected as out of the team :" + selectedGirlId);
                    toggleSelectGirl(selectedGirlId, $(girlBox), randomInterval(300,600));
                }
            });

            // Select girls
            for(var i=0;i<5;i++) {
                if(teamGirls[i] >=0) {
                    var girlDraggable = $('.girl-box__draggable[id_girl="'+teamGirls[i]+'"]');
                    if(!girlDraggable.hasClass('selected')) {
                        girlsClicked = true;
                        LogUtils_logHHAuto("Girl not selected :" + teamGirls[i]);
                        toggleSelectGirl(teamGirls[i], girlDraggable, randomInterval(800,1200));
                    } else {
                        LogUtils_logHHAuto("Girl already selected :" + teamGirls[i]);
                    }
                }
            }

            var newDraftInterval = girlsClicked ? randomInterval(1800,2500) : randomInterval(800,1500);
            setTimeout(function() {
                if( $(newDraftButtonQuery).length > 0) $(newDraftButtonQuery).click();
            }, newDraftInterval);

            LogUtils_logHHAuto("Free drafts remanings :" + freeDrafts);
            counterLoop++;
            if(freeDrafts > 0 && counterLoop <= maxLoops) {
                setTimeout(selectGirls, randomInterval(3500,5500)); // Wait animation
            } else {
                Champion.ChampClearAutoTeamPopup();
                $('#updateChampTeamButton').removeAttr('disabled').text( getTextForUI("updateChampTeamButton","elementText") +' x'+maxLoops);
                if($(confirmDraftButtonQuery).length > 0) $(confirmDraftButtonQuery).click();

                LogUtils_logHHAuto("Auto team ended, refresh page, restarting autoloop");
                location.reload();
            }
        };

        var findBestTeam = function() {
            StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
            LogUtils_logHHAuto("setting autoloop to false");

            maxLoops = getChampMaxLoop();
            keepSecondLineGirls = getChampSecondLine();
            $('#updateChampTeamButton').attr('disabled', 'disabled').text( 'Starting soon...');
            Champion.ChamppUpdateAutoTeamPopup('Starting soon...',maxLoops, (maxLoops) * 2);
            LogUtils_logHHAuto("keep second line : " + keepSecondLineGirls);

            counterLoop = 0;
            if( $(changeDraftButtonQuery).length > 0) $(changeDraftButtonQuery).click();
            setTimeout(selectGirls, randomInterval(800,1300));
        };

        $(document).on('ajaxComplete',checkAjaxCompleteOnChampionPage);
        setTimeout(indicateBestTeam, randomInterval(800,1200));

        if(freeDrafts > 0) {
            if($('#updateChampTeamButton').length > 0)
                document.getElementById("updateChampTeamButton").addEventListener("click", findBestTeam);
            GM_registerMenuCommand(getTextForUI("updateChampTeamButton","elementText"), findBestTeam);
        } else {
            LogUtils_logHHAuto("No more free draft available");
        }
    }



    static doChampionStuff()
    {
        var page=getPage();
        if (page==getHHScriptVars("pagesIDChampionsPage"))
        {
            LogUtils_logHHAuto('on champion page');
            if ($('button[rel=perform].blue_button_L').length==0)
            {
                LogUtils_logHHAuto('Something is wrong!');
                gotoPage(getHHScriptVars("pagesIDHome"));
                return true;
            }
            else
            {
                var TCount=Number($('div.input-field > span')[1].innerText.split(' / ')[1]);
                var ECount= QuestHelper.getEnergy();
                LogUtils_logHHAuto("T:"+TCount+" E:"+ECount+" "+(StorageHelper_getStoredValue("HHAuto_Setting_autoChampsUseEne") ==="true"))
                if ( TCount==0)
                {
                    LogUtils_logHHAuto("No tickets!");
                    setTimer('nextChampionTime',15*60);
                    return false;
                }
                else
                {
                    if (TCount!=0)
                    {
                        LogUtils_logHHAuto("Using ticket");
                        $('button[rel=perform].blue_button_L').click();
                    }
                    gotoPage(getHHScriptVars("pagesIDChampionsMap"));
                    return true;
                }
            }
        }
        else if (page==getHHScriptVars("pagesIDChampionsMap"))
        {
            LogUtils_logHHAuto('on champion map');
            var Filter=StorageHelper_getStoredValue("HHAuto_Setting_autoChampsFilter").split(';').map(s=>Number(s));
            var minTime = -1;
            var currTime;
            var e;

            for (let i=0;i<$('span.stage-bar-tier').length;i++)
            {
                let Impression=$('span.stage-bar-tier')[i].getAttribute("hh_title");
                const autoChampsForceStartEventGirl = StorageHelper_getStoredValue("HHAuto_Setting_autoChampsForceStartEventGirl") === "true";
                const autoChampsEventGirls = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_autoChampsEventGirls"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_autoChampsEventGirls")):[];
                const autoChampsForceStart = StorageHelper_getStoredValue("HHAuto_Setting_autoChampsForceStart") === "true";
                let Started=Impression.split('/')[0].replace(/[^0-9]/gi, '')!="0";
                let OnTimerOld=$($('a.champion-lair div.champion-lair-name')[i+1]).find('div[rel=timer]').length>0;
                let timerNew = $($('a.champion-lair div.champion-lair-name')[i+1]).find('span[rel=expires]').text();
                let OnTimerNew=false;
                if ( isNaN(timerNew) && (timerNew.length > 0))
                {
                    OnTimerNew = true;
                }

                let OnTimer= OnTimerOld || OnTimerNew;
                let Filtered=Filter.includes(i+1);
                let autoChampGirlInEvent = false;
                let autoChampGirlOnChamp = false;
                let autoChampGirlsIds = [];
                let autoChampGirlsEventsID;
                if (autoChampsForceStartEventGirl)
                {
                    for (let ec=autoChampsEventGirls.length;ec>0;ec--)
                    {
                        let idArray = Number(ec)-1;
                        if ( Number(autoChampsEventGirls[idArray].champ_id) === i+1)
                        {
                            autoChampGirlInEvent = true;
                            autoChampGirlsIds.push(Number(autoChampsEventGirls[idArray].girl_id));
                            autoChampGirlsEventsID=autoChampsEventGirls[idArray].event_id;
                        }
                    }
                    let firstLockedLevelOfChampRequest ='a.champion-lair[href*=' + Number(i+1) +'] .stage-icon.locked';
                    if ( autoChampGirlInEvent && $(firstLockedLevelOfChampRequest).length > 0 )
                    {
                        let firstLockedLevelOfChamp = $(firstLockedLevelOfChampRequest)[0].getAttribute("champion-rewards-tooltip");
                        if
                            (
                                firstLockedLevelOfChamp !== undefined
                                && Utils_isJSON(firstLockedLevelOfChamp)
                                && JSON.parse(firstLockedLevelOfChamp).stage.girl_shards
                                && JSON.parse(firstLockedLevelOfChamp).stage.girl_shards.length > 0
                            )
                        {
                            let parsedFirstLockedLevelOfChamp = JSON.parse(firstLockedLevelOfChamp);
                            for (let girlIt = 0;girlIt < parsedFirstLockedLevelOfChamp.stage.girl_shards.length; girlIt++)
                            {
                                if (autoChampGirlsIds.includes(parsedFirstLockedLevelOfChamp.stage.girl_shards[girlIt].id_girl) )
                                {
                                    autoChampGirlOnChamp = true;
                                }
                            }
                            if (! autoChampGirlOnChamp)
                            {
                                LogUtils_logHHAuto("Seems Girl is no more available at Champion "+Number(i+1)+". Going to event page.");
                                EventModule.parseEventPage(autoChampGirlsEventsID);
                                return true;
                            }
                        }
                    }

                }
                const eventGirlForced=autoChampGirlOnChamp;
                LogUtils_logHHAuto("Champion "+(i+1)+" ["+Impression+"]"+(Started?" Started;":" Not started;")+(autoChampsForceStart?" Force start;":" Not force start;")+(OnTimer?" on timer;":" not on timer;")+(Filtered?" Included in filter;":" Excluded from filter;")+(eventGirlForced?" Forced for event":" Not event forced"));

                if ((Started || eventGirlForced || autoChampsForceStart) && !OnTimer && Filtered)
                {
                    LogUtils_logHHAuto("Let's do him!");
                    gotoPage('/champions/'+Number(i+1));
                    //window.location = window.location.origin + '/champions/'+(i+1);
                    return true;
                }
            }

            LogUtils_logHHAuto("No good candidate");

            $('a.champion-lair div.champion-lair-name span[rel=expires]').each(function(){
                let timerElm = $(this);
                if (timerElm !== undefined && timerElm !== null && timerElm.length > 0) {
                    if (currTime == -1 || minTime == -1) {
                        currTime = Number(convertTimeToInt(timerElm.text()));
                        minTime = Number(convertTimeToInt(timerElm.text()));
                    } else {
                        currTime = Number(convertTimeToInt(timerElm.text()));
                        if (currTime > minTime) {minTime = currTime;}
                    }
                }
                else
                {
                    LogUtils_logHHAuto("Catched error : Could not parse champion timer : "+timerElm);
                }
            })
            //fetching min


            if (minTime === -1 || minTime > 30*60)
            {
                setTimer('nextChampionTime',15*60);
            }
            else
            {
                setTimer('nextChampionTime',minTime);
            }
            gotoPage(getHHScriptVars("pagesIDHome"));
            return false;
        }
        else
        {
            gotoPage(getHHScriptVars("pagesIDChampionsMap"));
            return true;
        }
    }
}
;// CONCATENATED MODULE: ./src/Module/Club.js




class Club {
    static run(){
        const onChampTab = $("div.club-champion-members-challenges:visible").length === 1;
        if(onChampTab) {
            $('button.orange_button_L.btn_skip_team_cooldown').css('display', 'none');
            if (!$('button.orange_button_L.btn_skip_champion_cooldown').length) {
                $('.challenge_container').css('display', 'block');
            }
        }
    }
    static checkClubStatus()
    {
        let chatVars = null;
        try {
            chatVars = getHHVars("Chat_vars.CLUB_INFO.id_club", false);
        } catch(e) {
            LogUtils_logHHAuto("Catched error : Couldn't parse CLUB_INFO : "+e);
        }
        if (chatVars === null || chatVars === false)
        {
            HHEnvVariables[getHHScriptVars("HHGameName")].isEnabledClubChamp = false;
        }
    }
}
;// CONCATENATED MODULE: ./src/Module/ClubChampion.js





class ClubChampion {

    static getNextClubChampionTimer()
    {
        var page=getPage();
        if (page==getHHScriptVars("pagesIDClub"))
        {
            let SecsToNextTimer = -1;
            let restTeamFilter = "div.club_champions_details_container div.team_rest_timer[data-rest-timer]";
            let restChampionFilter = "div.club_champions_details_container div.champion_rest_timer[data-rest-timer]";
    
            if ($(restTeamFilter).length > 0)
            {
                SecsToNextTimer = Number($(restTeamFilter).attr("data-rest-timer"));
                LogUtils_logHHAuto("Team is resting for : "+TimeHelper_toHHMMSS(SecsToNextTimer));
            }
            else if ($(restChampionFilter).length > 0)
            {
                SecsToNextTimer = Number($(restChampionFilter).attr("data-rest-timer"));
                LogUtils_logHHAuto("Champion is resting for : "+TimeHelper_toHHMMSS(SecsToNextTimer));
            }
            else {
                LogUtils_logHHAuto('No timer found');
            }
            LogUtils_logHHAuto('on clubs, next timer:'+ SecsToNextTimer);
            return SecsToNextTimer;
        }
        return 0; // -1 is only when no timer on club page
    }
    
    static updateClubChampionTimer()
    {
        var page=getPage();
        if (page==getHHScriptVars("pagesIDClub"))
        {
            LogUtils_logHHAuto('on clubs');
            let secsToNextTimer = ClubChampion.getNextClubChampionTimer();
            let noTimer = secsToNextTimer === -1;
    
            if (secsToNextTimer === -1)
            {
                setTimer('nextClubChampionTime', 15*60);
            }
            else if (secsToNextTimer > 30*60 && StorageHelper_getStoredValue("HHAuto_Setting_autoClubForceStart") === "true")
            {
                setTimer('nextClubChampionTime', 30*60);
            }
            else
            {
                setTimer('nextClubChampionTime', secsToNextTimer);
            }
            return noTimer;
        }
        return true;
    }
    
    static doClubChampionStuff()
    {
        var page=getPage();
        if (page==getHHScriptVars("pagesIDClubChampion"))
        {
            LogUtils_logHHAuto('on club_champion page');
            if ($('button[rel=perform].blue_button_L').length==0)
            {
                LogUtils_logHHAuto('Something is wrong!');
                setTimer('nextClubChampionTime',15*60);
                gotoPage(getHHScriptVars("pagesIDHome"));
                return true;
            }
            else
            {
                var TCount=Number($('div.input-field > span')[1].innerText.split(' / ')[1]);
                var ECount= QuestHelper.getEnergy();
                LogUtils_logHHAuto("T:"+TCount+" E:"+ECount)
                if ( TCount==0)
                {
                    LogUtils_logHHAuto("No tickets!");
                    setTimer('nextClubChampionTime',15*60);
                    return false;
                }
                else
                {
                    if (TCount!=0)
                    {
                        LogUtils_logHHAuto("Using ticket");
                        $('button[rel=perform].blue_button_L').click();
                        setTimer('nextClubChampionTime',15*60);
                    }
                    gotoPage(getHHScriptVars("pagesIDClub"));
                    return true;
                }
            }
        }
        else if (page==getHHScriptVars("pagesIDClub"))
        {
            LogUtils_logHHAuto('on clubs');
            const onChampTab = $("div.club-champion-members-challenges:visible").length === 1;
            if (!onChampTab) {
                LogUtils_logHHAuto('Click champions tab');
                $("#club_champions_tab").click();
            }
    
            let Started = $("div.club-champion-members-challenges .player-row").length === 1;
            let secsToNextTimer = ClubChampion.getNextClubChampionTimer();
            let noTimer = secsToNextTimer === -1;
    
            if ((Started || StorageHelper_getStoredValue("HHAuto_Setting_autoClubForceStart") === "true") && noTimer)
            {
                let ticketUsed = 0;
                let ticketsUsedRequest = "div.club-champion-members-challenges .player-row .data-column:nth-of-type(3)";
                if ($(ticketsUsedRequest).length >0)
                {
                    ticketUsed = Number($(ticketsUsedRequest)[0].innerText.replace(/[^0-9]/gi, ''));
                }
                let maxTickets = Number(StorageHelper_getStoredValue("HHAuto_Setting_autoClubChampMax"));
                //console.log(maxTickets, ticketUsed);
                if (maxTickets > ticketUsed )
                {
                    LogUtils_logHHAuto("Let's do him!");
                    gotoPage(getHHScriptVars("pagesIDClubChampion"));
                    return true;
                }
                else
                {
                    LogUtils_logHHAuto("Max tickets to use on Club Champ reached.");
                    setTimer('nextClubChampionTime', 60*60);
                }
    
            }
            ClubChampion.updateClubChampionTimer();
            gotoPage(getHHScriptVars("pagesIDHome"));
            return false;
        }
        else
        {
            gotoPage(getHHScriptVars("pagesIDClub"));
            return true;
        }
    }
}
;// CONCATENATED MODULE: ./src/Module/Contest.js




class Contest {
    // returns boolean to set busy
    static run(){
        if(getPage() !== getHHScriptVars("pagesIDContests"))
        {
            LogUtils_logHHAuto("Navigating to contests page.");
            gotoPage(getHHScriptVars("pagesIDContests"));
            // return busy
            return true;
        }
        else
        {
            LogUtils_logHHAuto("On contests page.");
            LogUtils_logHHAuto("Collecting finished contests's reward.");
            let contest_list = $(".contest .ended button[rel='claim']");
            if ( contest_list.length > 0)
            {
                LogUtils_logHHAuto("Collected legendary contest id : "+contest_list[0].getAttribute('id_contest')+".");
                contest_list[0].click();
                if ( contest_list.length > 1 )
                {
                    gotoPage(getHHScriptVars("pagesIDContests"));
                }
            }
    
            var time = getSecondsLeftBeforeNewCompetition() + 30*60; // 30 min after new compet
            setTimer('nextContestTime',Number(time)+1);
            // Not busy
            return false;
        }
    }
    static styles(){
        if(StorageHelper_getStoredValue("HHAuto_Setting_compactEndedContests") === "true")
        {
            const contestsContainerPath = '#contests > div > div.left_part > .scroll_area > .contest > .contest_header.ended';
            GM_addStyle(contestsContainerPath + ' {'
                + 'height: 50px;'
                + 'font-size: 0.7rem;'
            +'}');
            GM_addStyle(contestsContainerPath + ' > .contest_title {'
                + 'font-size: 14px;'
                + 'left: 140px;'
                + 'bottom: 24px;'
            +'}');
            GM_addStyle(contestsContainerPath + ' > .personal_rewards {'
                + 'height: 40px;'
                + 'margin-top: -42px;'
                + 'padding-top: 1px;'
                + 'width: 380px;'
            +'}');
            GM_addStyle(contestsContainerPath + ' > .personal_rewards > button {'
                + 'height: 23px;'
                + 'margin-right: 241px;'
                + 'margin-top: -6px;'
                + 'width: 120px;'
            +'}');
            GM_addStyle(contestsContainerPath + ' > .contest_expiration_timer {'
                + 'bottom: 95px;'
            +'}');
        }
    }
}
;// CONCATENATED MODULE: ./src/Module/DailyGoals.js




class DailyGoals {
    static styles(){
        if(StorageHelper_getStoredValue("HHAuto_Setting_compactDailyGoals") === "true")
        {
            const dailGoalsContainerPath = '#daily_goals .daily-goals-row .daily-goals-left-part .daily-goals-objectives-container';
            GM_addStyle(dailGoalsContainerPath + ' {'
                + 'flex-wrap:wrap;'
                + 'padding: 5px;'
            +'}');
            GM_addStyle(dailGoalsContainerPath + ' .daily-goals-objective .daily-goals-objective-reward .daily_goals_potion_icn {'
                + 'background-size: 20px;'
                + 'height: 30px;'
            +'}');
            GM_addStyle(dailGoalsContainerPath + ' .daily-goals-objective .daily-goals-objective-reward > p {'
                + 'margin-top: 0;'
            +'}');

            GM_addStyle(dailGoalsContainerPath + ' .daily-goals-objective {'
                + 'width:49%;'
                + 'margin-bottom:5px;'
            +'}');

            GM_addStyle(dailGoalsContainerPath + ' .daily-goals-objective .daily-goals-objective-status .objective-progress-bar {'
                + 'height: 20px;'
                + 'width: 11.1rem;'
            +'}');

            GM_addStyle(dailGoalsContainerPath + ' .daily-goals-objective .daily-goals-objective-status .objective-progress-bar > p {'
                + 'font-size: 0.7rem;'
            +'}');

            GM_addStyle(dailGoalsContainerPath + ' .daily-goals-objective .daily-goals-objective-reward {'
                + 'height: 40px;'
                + 'width: 40px;'
            +'}');

            GM_addStyle(dailGoalsContainerPath + ' p {'
                + 'overflow: hidden;'
                + 'text-overflow: ellipsis;'
                + 'white-space: nowrap;'
                + 'max-width: 174px;'
                + 'font-size: 0.7rem;'
            +'}');
        }
    }
    static goAndCollect()
    {
        const rewardsToCollect = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Setting_autoDailyGoalsCollectablesList"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Setting_autoDailyGoalsCollectablesList")):[];
        //console.log(rewardsToCollect.length);
        if (checkTimer('nextDailyGoalsCollectTime') && StorageHelper_getStoredValue("HHAuto_Setting_autoDailyGoalsCollect") === "true")
        {
            //console.log(getPage());
            if (getPage() === getHHScriptVars("pagesIDDailyGoals"))
            {
                LogUtils_logHHAuto("Checking Daily Goals for collectable rewards.");
                LogUtils_logHHAuto("setting autoloop to false");
                StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
                let buttonsToCollect = [];
                const listDailyGoalsTiersToClaim = $("#daily_goals .progress-section .progress-bar-rewards-container .progress-bar-reward");
                let potionsNum = Number($('.progress-section div.potions-total > div > p').text());
                for (let currentTier = 0 ; currentTier < listDailyGoalsTiersToClaim.length ; currentTier++)
                {
                    const currentButton = $("button[rel='claim']", listDailyGoalsTiersToClaim[currentTier]);
                    if(currentButton.length > 0 )
                    {
                        const currentTierNb = currentButton[0].getAttribute("tier");
                        const currentChest = $(".progress-bar-rewards-container", listDailyGoalsTiersToClaim[currentTier]);
                        const currentRewardsList = currentChest.length > 0 ? currentChest.data("rewards") : [];
                        //console.log("checking tier : "+currentTierNb);
                        if (getSecondsLeftBeforeEndOfHHDay() <= getHHScriptVars("dailyRewardMaxRemainingTime") && getSecondsLeftBeforeEndOfHHDay() > 0)
                        {
                            LogUtils_logHHAuto("Force adding for collection chest n° "+currentTierNb);
                            buttonsToCollect.push(currentButton[0]);
                        }
                        else
                        {
                            let validToCollect = true;
                            for (let reward of currentRewardsList)
                            {
                                const rewardType = RewardHelper.getRewardTypeByData(reward);

                                if (! rewardsToCollect.includes(rewardType))
                                {
                                    LogUtils_logHHAuto(`Not adding for collection chest n° ${currentTierNb} because ${rewardType} is not in immediate collection list.`);
                                    validToCollect = false;
                                    break;
                                }
                            }
                            if (validToCollect)
                            {
                                buttonsToCollect.push(currentButton[0]);
                                LogUtils_logHHAuto("Adding for collection chest n° "+currentTierNb);
                            }
                        }
                    }
                }


                if (buttonsToCollect.length >0 || potionsNum <100)
                {
                    function collectDailyGoalsRewards()
                    {
                        if (buttonsToCollect.length >0)
                        {
                            LogUtils_logHHAuto("Collecting chest n° "+buttonsToCollect[0].getAttribute('tier'));
                            buttonsToCollect[0].click();
                            buttonsToCollect.shift();
                            setTimeout(collectDailyGoalsRewards, randomInterval(300, 500));
                        }
                        else
                        {
                            LogUtils_logHHAuto("Daily Goals collection finished.");
                            setTimer('nextDailyGoalsCollectTime',30*60);
                            gotoPage(getHHScriptVars("pagesIDHome"));
                        }
                    }
                    collectDailyGoalsRewards();
                    return true;
                }
                else
                {
                    LogUtils_logHHAuto("No Daily Goals reward to collect.");
                    setTimer('nextDailyGoalsCollectTime',getSecondsLeftBeforeEndOfHHDay() + 3600);
                    gotoPage(getHHScriptVars("pagesIDHome"));
                    return false;
                }
            }
            else
            {
                LogUtils_logHHAuto("Switching to Daily Goals screen.");
                gotoPage(getHHScriptVars("pagesIDDailyGoals"));
                return true;
            }
        }
    }
}
;// CONCATENATED MODULE: ./src/Module/harem/HaremGirl.js







class HaremGirl {
    static AFFECTION_TYPE='affection';
    static EXPERIENCE_TYPE='experience';

    static getMaxOutButton(haremItem){
        return $('#girl-leveler-max-out-'+haremItem+':not([disabled])');
    }

    static switchTabs(haremItem){
        $('#girl-leveler-tabs .switch-tab[data-tab="'+haremItem+'"]').click();
    }

    static confirmMaxOut(){
        const confirmMaxOutButton = $('#girl_max_out_popup button.blue_button_L:not([disabled]):visible[confirm_callback]');
        if(confirmMaxOutButton.length > 0) {
            confirmMaxOutButton.click();
        } else LogUtils_logHHAuto('Confirm max out button not found');
    }

    static maxOutButtonAndConfirm(haremItem, girl) {
        const maxOutButton = HaremGirl.getMaxOutButton(haremItem);
        if(maxOutButton.length > 0) {
            LogUtils_logHHAuto('Max out ' + haremItem + ' for girl ' + girl.id_girl);
            maxOutButton.click();
            setTimeout(HaremGirl.confirmMaxOut, randomInterval(700,1100));
            return true;
        } else {
            LogUtils_logHHAuto('Max out button for' + haremItem + ' for girl ' + girl.id_girl + ' not enabled');
            return false;
        }
    }

    static confirmAwake(){
        const confAwakButton = $('#awakening_popup button.awaken-btn:not([disabled]):visible');
        if(confAwakButton.length > 0) {
            confAwakButton.click(); // Page will be refreshed
            return true;
        } else {
            LogUtils_logHHAuto('Confirmation awake button is not enabled');
            Harem.clearHaremToolVariables();
            // TODO Do not clear in list mode
            return false;
        }
    }
    
    static awakGirl(girl) {
        const numberOfGem = unsafeWindow.player_gems_amount[girl.element].amount;
        const canXpGirl = numberOfGem >= girl.awakening_costs;
        const awakButton = $('#awaken:not([disabled])');
        if(awakButton.length > 0 && canXpGirl) {
            LogUtils_logHHAuto('Awake for girl ' + girl.id_girl);
            awakButton.click();
            setTimeout(HaremGirl.confirmAwake, randomInterval(500,1000)); // Page will be refreshed if done
            return true;
        } else {
            LogUtils_logHHAuto('Awake button for girl ' + girl.id_girl + ' not enabled or not enough gems (' + numberOfGem +'<'+ girl.awakening_costs + ')');
            return false;
        }
    };
    
    static goToGirlQuest(girl, retry=0) {
        const canGiftGirl = girl.nb_grades > girl.graded;
        const upgradeQuest = $('.upgrade_girl').attr('href');
        if(canGiftGirl && upgradeQuest && upgradeQuest.indexOf('/quest/')>=0) {
            LogUtils_logHHAuto('Upgrade for girl ' + girl.id_girl + ' quest:' + upgradeQuest);
            gotoPage(upgradeQuest);
            return true;
        } else {
            LogUtils_logHHAuto('Can\'t upgrade girl ' + girl.id_girl + ': grade (' + girl.graded +'/'+ girl.nb_grades + '), quest :' + upgradeQuest);
            if(!upgradeQuest && retry<2) {
                LogUtils_logHHAuto('Can be loading time, retry in 1s');
                setTimeout(() => {
                    HaremGirl.goToGirlQuest(girl, 1);
                }, randomInterval(1000,1500));
            }
            return false;
        }
    };

    static payGirlQuest(){
        var proceedButtonMatch = $("#controls button.grade-complete-button:not([style*='display:none']):not([style*='display: none'])");
        var proceedButtonCost = $(".price", proceedButtonMatch);
        var proceedCost = parsePrice(proceedButtonCost[0].innerText);
        var moneyCurrent = getHHVars('Hero.currencies.soft_currency');
        
        console.log("Debug girl Quest MONEY for : "+proceedCost);
        if(proceedCost <= moneyCurrent)
        {
            // We have money.
            LogUtils_logHHAuto("Spending "+proceedCost+" Money to proceed.");
            setTimeout(function () {
                proceedButtonMatch.click();
            },randomInterval(500,800));
        }
        else
        {
            LogUtils_logHHAuto("Need "+proceedCost+" Money to proceed.");
            Harem.clearHaremToolVariables();
            // gotoPage('/girl/'+nextGirlId,{resource:haremItem}, randomInterval(1500,2500));
            return;
        }
    }

    static maxOutAndAwake(haremItem, selectedGirl){
        HaremGirl.maxOutButtonAndConfirm(haremItem, selectedGirl);
        setTimeout(function() {
            HaremGirl.awakGirl(selectedGirl);
        }, randomInterval(1500,2500));
    }
    
    static giveHaremGirlItem(haremItem){
        const selectedGirl = unsafeWindow.girl;
        HaremGirl.switchTabs(haremItem);
        const userHaremGirlLimit = Math.min(Number(document.getElementById("menuExpLevel").value), 750);

        if((Number(selectedGirl.level) + 50) <= Number(userHaremGirlLimit)) {
            HaremGirl.HaremDisplayGirlPopup(haremItem, selectedGirl.name + ' '+selectedGirl.Xp.cur+"xp, level "+selectedGirl.level+"/"+userHaremGirlLimit, (1)*5 );

            StorageHelper_setStoredValue("HHAuto_Temp_haremGirlActions", haremItem);
            StorageHelper_setStoredValue("HHAuto_Temp_haremGirlMode", 'girl');
            StorageHelper_setStoredValue("HHAuto_Temp_haremGirlLimit", userHaremGirlLimit);

            if((Number(selectedGirl.level) + 50) >= Number(userHaremGirlLimit)) {
                HaremGirl.maxOutButtonAndConfirm(haremItem, selectedGirl);
                HaremGirl.HaremClearGirlPopup();
            }
            else {
                setTimeout(function() {
                    HaremGirl.maxOutAndAwake(haremItem, selectedGirl);
                }, randomInterval(500,1000));
            }
        } else{
            if(Number(selectedGirl.level) >= Number(userHaremGirlLimit))
                LogUtils_logHHAuto("Girl already above target, ignoring action");
            else
                LogUtils_logHHAuto("Girl and max out will be above target, ignoring action");
        }
    }

    static fillAllAffection(){
        const haremItem = HaremGirl.AFFECTION_TYPE;
        const selectedGirl = unsafeWindow.girl;
        HaremGirl.switchTabs(haremItem);
        const canGiftGirl = selectedGirl.nb_grades > selectedGirl.graded;
        const lastGirlGrad = selectedGirl.nb_grades <= (selectedGirl.graded+1);
        const maxOutButton = HaremGirl.getMaxOutButton(haremItem);

        if(canGiftGirl) {

            if(maxOutButton.length > 0) {
                HaremGirl.maxOutButtonAndConfirm(haremItem, selectedGirl);
            }
            
            if(!lastGirlGrad) {
                setTimeout(function() {
                    HaremGirl.goToGirlQuest(selectedGirl);
                }, randomInterval(1500,2000));
                return true;
            } else {
                LogUtils_logHHAuto("Girl grade reach, keep last to buy manually");
            }
        } else{
            LogUtils_logHHAuto("Girl grade is already maxed out");
        }
        return false;
    }
    
    static addGirlMenu(){
        const girlMenuButtonId = 'girlMenu';
        if($('#'+girlMenuButtonId).length > 0) return;

        var createMenuButton = function(menuId, disabled=false){
            return '<div class="tooltipHH">'
            +    '<span class="tooltipHHtext">'+getTextForUI(menuId,"tooltip")+'</span>'
            +    '<label style="width:200px;font-size: initial;" class="myButton" '+(disabled?'disabled="disabled"':'')+' id="'+menuId+'Button">'+getTextForUI(menuId,"elementText")
            +'</label></div>';
        }
        
        const girlMenuButton = '<div style="position: absolute;left: 425px;top: 0px; font-size: small; z-index:30;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("girlMenu","tooltip")+'</span><label class="myButton" id="'+girlMenuButtonId+'">+</label></div>';
        var openGirlMenu = function(){
            const selectedGirl = unsafeWindow.girl;
            const canGiftGirl = selectedGirl.nb_grades > selectedGirl.graded;// && HaremGirl.getMaxOutButton(HaremGirl.AFFECTION_TYPE).length > 0;

            const menuIDXp = "haremGirlGiveXP";
            const menuIDGifts = "haremGirlGiveGifts";
            const menuIDMaxGifts = "haremGirlGiveMaxGifts";

            const menuIDXpButton = createMenuButton(menuIDXp);
            const menuIDGiftsButton = createMenuButton(menuIDGifts);
            const menuIDMaxGiftsButton = createMenuButton(menuIDMaxGifts, !canGiftGirl);

            
            const girlListMenu = '<div style="padding:50px; display:flex;flex-direction:column">'
            +    '<p id="HaremSortMenuSortText">'+getTextForUI("girlMenu","elementText")+'</p>'
            +    '<div>'
            +     '<div style="padding:10px">'+menuIDXpButton+'</div>'
            //+     '<div style="padding:10px">'+menuIDGiftsButton+'</div>'
            +     '<div style="padding:10px">'+menuIDMaxGiftsButton+'</div>'
            +    '</div>'
            +  '</div>'
            fillHHPopUp("GirlListMenu",getTextForUI("girlListMenu","elementText"), girlListMenu);
            document.getElementById(menuIDXp+'Button').addEventListener("click", function()
            {
                maskHHPopUp();
                HaremGirl.switchTabs(HaremGirl.EXPERIENCE_TYPE);
                HaremGirl.displayExpMenu(HaremGirl.EXPERIENCE_TYPE);
            });
            //document.getElementById(menuIDGifts+'Button').addEventListener("click", function() { Harem.fillCurrentGirlItem(HaremGirl.AFFECTION_TYPE);});
            if(canGiftGirl) {
                document.getElementById(menuIDMaxGifts+'Button').addEventListener("click", function() {
                    maskHHPopUp();
                    HaremGirl.switchTabs(HaremGirl.AFFECTION_TYPE);
                    StorageHelper_setStoredValue("HHAuto_Temp_haremGirlActions", HaremGirl.AFFECTION_TYPE);
                    StorageHelper_setStoredValue("HHAuto_Temp_haremGirlMode", 'girl');
                    StorageHelper_setStoredValue("HHAuto_Temp_haremGirlEnd", 'true');
                    setTimeout(HaremGirl.fillAllAffection, randomInterval(500,800));
                });
            }
        };
        $('#girl-leveler-tabs').append(girlMenuButton);

        GM_registerMenuCommand(getTextForUI('girlMenu',"elementText"), openGirlMenu);
        document.getElementById(girlMenuButtonId).addEventListener("click", openGirlMenu);
    }
   


    static displayExpMenu(haremItem = HaremGirl.EXPERIENCE_TYPE){
        const selectedGirl = unsafeWindow.girl;

        const menuID = "menuExp";
//        const menuExp = '<div style="position: absolute;right: 50px;top: -10px; font-size: small;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuExp","tooltip")+'</span><label style="width:100px" class="myButton" id="menuExp">'+getTextForUI("menuExp","elementText")+'</label></div>'
        const menuExpContent = '<div style="width:600px;justify-content: space-between;align-items: flex-start;"class="HHMenuRow">'
        +   '<div id="menuExp-moveLeft"></div>'
        +   '<div style="padding:10px; display:flex;flex-direction:column;">'
        +    '<p style="min-height:10vh;" id="menuExpText"></p>'
        +    '<div class="HHMenuRow">'
        +     '<p>'+getTextForUI("menuExpLevel","elementText")+'</p>'
        +     '<div style="padding:10px;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuExpLevel","tooltip")+'</span><input id="menuExpLevel" style="width:50px;height:20px" required pattern="'+HHAuto_inputPattern.menuExpLevel+'" type="text" value="'+getHHVars('Hero.infos.level')+'"></div>'
        +    '</div>'
        +    '<input id="menuExpMode" type="hidden" value="">'
        +    '<div style="padding:10px;justify-content:center" class="HHMenuRow">'
        +     '<div id="menuExpHide">'
        +      '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuExpButton","tooltip")+'</span><label style="width:80px" class="myButton" id="menuExpButton">'+getTextForUI("menuExpButton","elementText")+'</label></div>'
        +     '</div>'
        +    '</div>'
        +   '</div>'
        +   '<div id="menuExp-moveRight"></div>'
        +  '</div>';

        fillHHPopUp(menuID,getTextForUI("menuExp","elementText"),menuExpContent);
        displayHHPopUp();
        document.getElementById("menuExpText").innerHTML = selectedGirl.name+" "+selectedGirl.Xp.cur+"xp, level "+selectedGirl.level+"<br>"+getTextForUI("menuExpInfo","elementText")+"<br>";
        document.getElementById("menuExpMode").value = haremItem;

        var KeyUpExp = function(evt)
        {
            if (evt.key === 'Enter')
            {
                maskHHPopUp();
                HaremGirl.giveHaremGirlItem(document.getElementById("menuExpMode").value);
            }
        }

        document.removeEventListener('keyup', KeyUpExp, false);
        document.addEventListener('keyup', KeyUpExp, false);

        document.getElementById("menuExpButton").addEventListener("click", function()
        {
            maskHHPopUp();
            HaremGirl.giveHaremGirlItem(haremItem);
        });
    }
    
    static moduleHaremGirl()
    {
        const haremItem = StorageHelper_getStoredValue("HHAuto_Temp_haremGirlActions");
        const haremGirlMode = StorageHelper_getStoredValue("HHAuto_Temp_haremGirlMode");
        const haremGirlEnd = StorageHelper_getStoredValue("HHAuto_Temp_haremGirlEnd") === 'true';
        const haremGirlLimit = StorageHelper_getStoredValue("HHAuto_Temp_haremGirlLimit");

        try {
            const girl = unsafeWindow.girl;
            const numberOfGem =unsafeWindow.player_gems_amount[girl.element].amount;
            const canAwakeGirl = numberOfGem >= girl.awakening_costs;
            const canGiftGirl = girl.nb_grades > girl.graded && HaremGirl.getMaxOutButton(HaremGirl.AFFECTION_TYPE).length > 0;
            //logHHAuto("moduleHaremGirl: " + girl.id_girl);
            LogUtils_logHHAuto("Current level : " + girl.level + ', max level without gems : ' + girl.level_cap);
            LogUtils_logHHAuto("Number of gem needed in next awakening : " + girl.awakening_costs +" / Gem in stock : " + numberOfGem);
            LogUtils_logHHAuto("Girl grade : " + girl.graded + '/' + girl.nb_grades);

            const menuIDXp = "haremGirlGiveXP";
            const menuIDGifts = "haremGirlGiveGifts";

            var giveHaremXp = function() {displayExpMenu(HaremGirl.EXPERIENCE_TYPE);};
            var giveHaremGifts = function() {displayExpMenu(HaremGirl.AFFECTION_TYPE);};

            if(canAwakeGirl)
                GM_registerMenuCommand(getTextForUI(menuIDXp,"elementText"), giveHaremXp);
            //if(canGiftGirl) // Not supported yet
            //   GM_registerMenuCommand(getTextForUI(menuIDGifts,"elementText"), giveHaremGifts);

            HaremGirl.addGirlMenu(canAwakeGirl, canGiftGirl);

        } catch (error) {
            LogUtils_logHHAuto("ERROR: Can't perform action ");
            console.error(error);
        }

        try {
            const girl = unsafeWindow.girl;
            LogUtils_logHHAuto("moduleHaremGirl: " + girl.name + '(' + girl.id_girl + ')');
            if(!haremItem) {
                // No action to be peformed
                return;
            }
            StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
            LogUtils_logHHAuto("setting autoloop to false as action to be performed on girl");
            LogUtils_logHHAuto("haremGirlMode: " + haremGirlMode);

            if(haremGirlMode === 'girl')
            {
                if( haremItem == HaremGirl.EXPERIENCE_TYPE && haremGirlLimit && (Number(girl.level) + 50) <= Number(haremGirlLimit)){
                    LogUtils_logHHAuto("haremGirlLimit: " + haremGirlLimit);
                    HaremGirl.HaremDisplayGirlPopup(haremItem, girl.name + ' '+girl.Xp.cur+"xp, level "+girl.level+"/"+haremGirlLimit, (1)*5 );
                    if((Number(girl.level) + 50) >= Number(haremGirlLimit)) {
                        HaremGirl.maxOutButtonAndConfirm(haremItem, girl);
                        HaremGirl.HaremClearGirlPopup();

                        Harem.clearHaremToolVariables(); // TODO to make it mode list, do not clear ^^
                    }
                    else
                        HaremGirl.maxOutAndAwake(haremItem, girl);
                } else if(haremItem == HaremGirl.AFFECTION_TYPE){
                    HaremGirl.HaremDisplayGirlPopup(haremItem, girl.name + ' '+girl.graded+"/"+girl.nb_grades+"star",2);
                    if(!HaremGirl.fillAllAffection()){
                        // No more quest
                        HaremGirl.HaremClearGirlPopup();
                        Harem.clearHaremToolVariables();
                    }
                } else {
                    LogUtils_logHHAuto('ERROR, item unknown' + haremItem);
                }
            }
            else if(haremGirlMode === 'list')
            {
                LogUtils_logHHAuto("Action to be performed : give " + haremItem);
                let nextGirlId = -1;
                let girlPosInList = 0;
                let remainingGirls = 0;
                let girlListProgress = '<br />' + getTextForUI("giveLastGirl","elementText");


                let filteredGirlsList = StorageHelper_getStoredValue("HHAuto_Temp_filteredGirlsList")?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_filteredGirlsList")):[];
                LogUtils_logHHAuto("filteredGirlsList", filteredGirlsList);
                if (filteredGirlsList && filteredGirlsList.length > 0) {
                    girlPosInList = filteredGirlsList.indexOf(""+girl.id_girl);
                    if (girlPosInList >=0 && filteredGirlsList.length > (girlPosInList+1)) {
                        remainingGirls = filteredGirlsList.length - girlPosInList - 1;
                        nextGirlId = filteredGirlsList[girlPosInList+1];
                        girlListProgress = (girlPosInList+1) + '/' + filteredGirlsList.length;
                    }
                } else {
                    LogUtils_logHHAuto("ERROR: no girls stored");
                }

                if(haremGirlEnd && haremItem == HaremGirl.AFFECTION_TYPE) {
                    if(HaremGirl.fillAllAffection()){
                        LogUtils_logHHAuto("Going to girl quest");
                        return;
                    }
                } else {
                    const canMaxOut = HaremGirl.getMaxOutButton(haremItem).length > 0;
                    if (canMaxOut)
                    {
                        HaremGirl.HaremDisplayGirlPopup(haremItem, getTextForUI("giveMaxingOut","elementText")  + ' ' + girl.name + ' : '+ girlListProgress, (remainingGirls+1)*5 );
                        HaremGirl.maxOutButtonAndConfirm(haremItem, girl);
                    } else {
                        LogUtils_logHHAuto("Max out button not clickable or not found");
                        HaremGirl.HaremDisplayGirlPopup(haremItem, girl.name + ' ' + getTextForUI("giveMaxedOut","elementText")+' : '+ girlListProgress, (remainingGirls+1)*5 );
                    }
                }

                if (nextGirlId >= 0) {
                    LogUtils_logHHAuto('Go to next girl (' + nextGirlId + ') remaining ' + remainingGirls + ' girls');
                    gotoPage('/girl/'+nextGirlId,{resource:haremItem}, randomInterval(1500,2500));
                } else {
                    LogUtils_logHHAuto("No more girls, go back to harem list");
                    StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "true");
                    gotoPage('/harem/'+girl.id_girl,{}, randomInterval(1500,2500));
                    Harem.clearHaremToolVariables();
                }
            } else {
                StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "true");
                Harem.clearHaremToolVariables();
            }
        } catch (error) {
            LogUtils_logHHAuto("ERROR: Can't perform action ");
            console.error(error);
            StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "true");
            Harem.clearHaremToolVariables();
        }
    }

    static HaremDisplayGirlPopup(haremItem,haremText,remainingTime)
    {
        $(".girl-leveler-panel .girl-section").prepend('<div id="popup_message_harem" class="HHpopup_message" name="popup_message_harem" style="" ><a id="popup_message_harem_close" class="close">&times;</a>'
                        +getTextForUI("give"+haremItem,"elementText")+' : <br>'+haremText+' ('+remainingTime+'sec)</div>');
        document.getElementById("popup_message_harem_close").addEventListener("click", function() {
            Harem.clearHaremToolVariables();
            location.reload();
        });
    }

    static HaremClearGirlPopup()
    {
        $("#popup_message_harem").remove();
    }

    static HaremUpdateGirlPopup(haremItem,haremText,remainingTime)
    {
        HaremGirl.HaremClearGirlPopup();
        HaremGirl.HaremDisplayGirlPopup(haremItem,haremText,remainingTime);
    }
}
;// CONCATENATED MODULE: ./src/Module/Harem.js







class Harem {
    static filterGirlMapCanUpgrade(a)
    {
        return a.gData.can_upgrade;
    }

    static clearHaremToolVariables()
    {
        // logHHAuto('clearHaremToolVariables');
        deleteStoredValue("HHAuto_Temp_haremGirlActions");
        deleteStoredValue("HHAuto_Temp_haremGirlMode");
        deleteStoredValue("HHAuto_Temp_haremGirlEnd");
        deleteStoredValue("HHAuto_Temp_haremGirlLimit");
    }

    static getGirlMapSorted(inSortType = "DateAcquired",inSortReversed = true )
    {
        let girlsMap = getHHVars('GirlSalaryManager.girlsMap');
        if (girlsMap !== null)
        {

            girlsMap = Object.values(girlsMap);
            if (girlsMap.length > 0)
            {
                //console.log(inSortType);
                if (getHHScriptVars("haremSortingFunctions").hasOwnProperty(inSortType))
                {
                    girlsMap.sort(getHHScriptVars("haremSortingFunctions")[inSortType]);
                }
                else
                {
                    LogUtils_logHHAuto("Unknown sorting function, returning Girls Map sorted by date acquired.");
                    girlsMap.sort(getHHScriptVars("haremSortingFunctions").DateAcquired);
                }
            }
            if (inSortReversed)
            {
                girlsMap.reverse();
            }
            /*for(let i=0;i<5;i++)
                console.log(girlsMap[i].gData.name, getGirlUpgradeCost(girlsMap[i].gData.rarity, girlsMap[i].gData.graded + 1));*/
        }
        return girlsMap;
    }

    
    static getGirlsList() {
        let girlsDataList = getHHVars("GirlSalaryManager.girlsMap");
        const isGirlMap = girlsDataList!==null;
        if (!isGirlMap) { girlsDataList = getHHVars("girlsDataList"); }

        let keys = Object.keys(girlsDataList);

        var girlList = new Map()
        for (let j = 0, l = keys.length; j < l; j++){
            let key = parseInt(keys[j], 10);
            let girlData = {gId: key, shards: 100}
            girlList.set(key, girlData);
        }
        return girlList;
    }
    
    static selectNextUpgradableGirl()
    {
        const selectedSortFunction = document.getElementById("HaremSortMenuSortSelector").options[document.getElementById("HaremSortMenuSortSelector").selectedIndex].value;
        const isReverseChecked = document.getElementById("HaremSortMenuSortReverse").checked;
        StorageHelper_setStoredValue("HHAuto_Temp_defaultCustomHaremSort",JSON.stringify({sortFunction:selectedSortFunction, reverse:isReverseChecked}));
        const girlsMap = Harem.getGirlMapSorted(selectedSortFunction,isReverseChecked);
        if (girlsMap === null )
            return;
        const currentSelectedGirlIndex = girlsMap.findIndex((element) => element.gId === $('#harem_left .girls_list div.opened[girl]').attr('girl'))+1;
        const upgradableGirls = girlsMap.slice(currentSelectedGirlIndex).filter(Harem.filterGirlMapCanUpgrade)
        if (upgradableGirls.length > 0)
        {
            gotoPage(`/harem/${upgradableGirls[0].gId}`);
            LogUtils_logHHAuto("Going to : "+upgradableGirls[0].gData.name);
        }
        else
        {
            LogUtils_logHHAuto("No upgradble girls.");
        }
    }
    
    static popUpHaremSort()
    {
        const menuID = "haremNextUpgradableGirl";
        let HaremSortMenu = '<div style="padding:50px; display:flex;flex-direction:column">'
        +    '<p id="HaremSortMenuSortText">'+getTextForUI("HaremSortMenuSortText","elementText")+'</p>'
        +    '<div style="display:flex;flex-direction:row;align-items: center;">'
        +     '<div style="padding:10px"><select id="HaremSortMenuSortSelector"></select></div>'
        +     '<div style="display:flex;flex-direction:column;padding:10px;justify-content:center">'
        +      '<div>'+getTextForUI("HaremSortMenuSortReverse","elementText")+'</div>'
        +      '<div><input id="HaremSortMenuSortReverse" type="checkbox"></div>'
        +     '</div>'
        +    '</div>'
        +    '<div style="display:flex;flex-direction:row;align-items:center;">'
        +     '<div style="display:flex;flex-direction:column;padding:10px;justify-content:center">'
        //+      '<div>'+getTextForUI("HaremSortMenuSortReverse","elementText")+'</div>'
        //+      '<div><input id="HaremSortMenuSortNumber" type="number" name="quantity" min="1" max="20" step="1" value="10"></div>'
        +     '</div>'
        +     '<div style="padding:10px"><label class="myButton" id="HaremSortMenuLaunch">'+getTextForUI("Launch","elementText")+'</label></div>'
        +    '</div>'
        +  '</div>'
        fillHHPopUp("HaremSortMenu",getTextForUI(menuID,"elementText"), HaremSortMenu);

        document.getElementById("HaremSortMenuLaunch").addEventListener("click", Harem.selectNextUpgradableGirl);
        let selectorOptions = document.getElementById("HaremSortMenuSortSelector");

        const storedDefaultSort = (StorageHelper_getStoredValue("HHAuto_Temp_defaultCustomHaremSort") !== undefined && Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_defaultCustomHaremSort")))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_defaultCustomHaremSort")):{sortFunction : "null", reverse:false};

        for (let sortFunction of Object.keys(getHHScriptVars("haremSortingFunctions")))
        {
            let optionElement = document.createElement("option");
            optionElement.value = sortFunction;
            optionElement.text = getTextForUI("HaremSortMenuSortBy","elementText") + getTextForUI(sortFunction,"elementText");
            if ( storedDefaultSort.sortFunction === sortFunction)
            {
                optionElement.selected = true;
            }
            selectorOptions.add(optionElement);
        }

        document.getElementById("HaremSortMenuSortReverse").checked = storedDefaultSort.reverse;
    }

    static moduleHaremNextUpgradableGirl()
    {
        const menuID = "haremNextUpgradableGirl";
        let menuHidden = `<div style="visibility:hidden" id="${menuID}"></div>`;
        if (document.getElementById(menuID) === null)
        {
            $("#contains_all section").prepend(menuHidden);
            GM_registerMenuCommand(getTextForUI(menuID,"elementText"), Harem.popUpHaremSort);
        }
        else
        {
            return;
        }
    }

    static haremOpenFirstXUpgradable()
    {
        const menuID = "haremOpenFirstXUpgradable";
        let menuHidden = `<div style="visibility:hidden" id="${menuID}"></div>`;
        if (document.getElementById(menuID) === null)
        {
            var upgradableGirlz = [];
            var nextUpgradable = 0;
            var openedGirlz = 0;
            var maxOpenedGirlz;
            $("#contains_all section").prepend(menuHidden);
            GM_registerMenuCommand(getTextForUI(menuID,"elementText"), popUpHaremSort);
        }
        else
        {
            return;
        }
        function popUpHaremSort()
        {
            let HaremSortMenu = '<div style="padding:50px; display:flex;flex-direction:column">'
            +    '<p id="HaremSortMenuSortText">'+getTextForUI("HaremSortMenuSortText","elementText")+'</p>'
            +    '<div style="display:flex;flex-direction:row;align-items: center;">'
            +     '<div style="padding:10px"><select id="HaremSortMenuSortSelector"></select></div>'
            +     '<div style="display:flex;flex-direction:column;padding:10px;justify-content:center">'
            +      '<div>'+getTextForUI("HaremSortMenuSortReverse","elementText")+'</div>'
            +      '<div><input id="HaremSortMenuSortReverse" type="checkbox"></div>'
            +     '</div>'
            +    '</div>'
            +    '<div style="display:flex;flex-direction:row;align-items:center;">'
            +     '<div style="display:flex;flex-direction:column;padding:10px;justify-content:center">'
            //+      '<div>'+getTextForUI("HaremSortMenuSortReverse","elementText")+'</div>'
            +      '<div><input id="HaremSortMenuSortNumber" type="number" name="quantity" min="1" max="20" step="1" value="10"></div>'
            +     '</div>'
            +     '<div style="padding:10px"><label class="myButton" id="HaremSortMenuLaunch">'+getTextForUI("Launch","elementText")+'</label></div>'
            +    '</div>'
            +  '</div>'
            fillHHPopUp("HaremSortMenu",getTextForUI(menuID,"elementText"), HaremSortMenu);

            document.getElementById("HaremSortMenuLaunch").addEventListener("click", prepareUpgradable);
            let selectorOptions = document.getElementById("HaremSortMenuSortSelector");
            const storedDefaultSort = (StorageHelper_getStoredValue("HHAuto_Temp_defaultCustomHaremSort") !== undefined && Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_defaultCustomHaremSort")))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_defaultCustomHaremSort")):{sortFunction : "null", reverse:false};

            for (let sortFunction of Object.keys(getHHScriptVars("haremSortingFunctions")))
            {
                let optionElement = document.createElement("option");
                optionElement.value = sortFunction;
                optionElement.text = getTextForUI("HaremSortMenuSortBy","elementText") + getTextForUI(sortFunction,"elementText");
                if ( storedDefaultSort.sortFunction === sortFunction)
                {
                    optionElement.selected = true;
                }
                selectorOptions.add(optionElement);
            }
        }
        function prepareUpgradable()
        {
            const selectedSortFunction = document.getElementById("HaremSortMenuSortSelector").options[document.getElementById("HaremSortMenuSortSelector").selectedIndex].value;
            const isReverseChecked = document.getElementById("HaremSortMenuSortReverse").checked;
            StorageHelper_setStoredValue("HHAuto_Temp_defaultCustomHaremSort",JSON.stringify({sortFunction:selectedSortFunction, reverse:isReverseChecked}));
            const girlsMap = Harem.getGirlMapSorted(selectedSortFunction,isReverseChecked);
            if (girlsMap === null )
                return;
            openedGirlz = 0;
            maxOpenedGirlz = Number(document.getElementById("HaremSortMenuSortNumber").value);
            upgradableGirlz = girlsMap.filter(Harem.filterGirlMapCanUpgrade);
            //console.log(maxOpenedGirlz);
            if (upgradableGirlz.length > 0)
            {
                haremOpenGirlUpgrade();
            }
        }
        function haremOpenGirlUpgrade(first = true)
        {
            if (nextUpgradable<upgradableGirlz.length && openedGirlz < maxOpenedGirlz)
            {
                const girlzQuests = getHHVars('girl_quests');
                if (girlzQuests !== null)
                {
                    let upgradeURL = girlzQuests[upgradableGirlz[nextUpgradable].gId].for_upgrade.url;
                    //console.log(upgradeButton.length);
                    if (upgradeURL.length === 0 )
                    {
                        if (first)
                        {
                            setTimeout(function() { haremOpenGirlUpgrade(false);},1000);
                        }
                        else
                        {
                            nextUpgradable++;
                            haremOpenGirlUpgrade();
                        }
                    }
                    else
                    {
                        //console.log(upgradeButton[0].getAttribute("href"));
                        //upgradeButton[0].setAttribute("target","_blank");
                        //console.log(upgradeButton[0]);
                        //upgradeButton[0].click();
                        GM.openInTab(window.location.protocol+"//"+window.location.hostname+upgradeURL, true);
                        nextUpgradable++;
                        openedGirlz++;
                        haremOpenGirlUpgrade();
                    }
                }
                else
                {
                    LogUtils_logHHAuto("Unable to find girl_quest array.");
                }
            }
        }

    }

    static moduleHaremExportGirlsData()
    {
        const menuID = "ExportGirlsData";
        let ExportGirlsData = `<div style="position: absolute;left: 36%;top: 20px;width:60px;z-index:10" class="tooltipHH" id="${menuID}"><span class="tooltipHHtext">${getTextForUI("ExportGirlsData","tooltip")}</span><label style="font-size:small" class="myButton" id="ExportGirlsDataButton">${getTextForUI("ExportGirlsData","elementText")}</label></div>`;
        if (document.getElementById(menuID) === null)
        {
            $("#contains_all section").prepend(ExportGirlsData);
            document.getElementById("ExportGirlsDataButton").addEventListener("click", saveHHGirlsAsCSV);
            GM_registerMenuCommand(getTextForUI(menuID,"elementText"), saveHHGirlsAsCSV);
        }
        else
        {
            return;
        }


        function saveHHGirlsAsCSV() {
            var dataToSave="";
            dataToSave = extractHHGirls();
            var name='HH_GirlData_'+Date.now()+'.csv';
            const a = document.createElement('a')
            a.download = name
            a.href = URL.createObjectURL(new Blob([dataToSave], {type: 'text/plain'}))
            a.click()
        }

        function extractHHGirls()
        {
            var dataToSave = "Name,Rarity,Class,Figure,Level,Stars,Of,Left,Hardcore,Charm,Know-how,Total,Position,Eyes,Hair,Zodiac,Own\r\n";
            var gMap = getHHVars('GirlSalaryManager.girlsMap');
            if(gMap === null)
            {
                // error
                LogUtils_logHHAuto("Girls Map was undefined...! Error, cannot export girls.");
            }
            else
            {
                try{
                    var cnt = 1;
                    for(var key in gMap)
                    {
                        cnt++;
                        var gData = gMap[key].gData;
                        dataToSave += gData.name + ",";
                        dataToSave += gData.rarity + ",";
                        dataToSave += gData.class + ",";
                        dataToSave += gData.figure + ",";
                        dataToSave += gData.level + ",";
                        dataToSave += gData.graded + ",";
                        dataToSave += gData.nb_grades + ",";
                        dataToSave += Number(gData.nb_grades)-Number(gData.graded) + ",";
                        dataToSave += gData.caracs.carac1 + ",";
                        dataToSave += gData.caracs.carac2 + ",";
                        dataToSave += gData.caracs.carac3 + ",";
                        dataToSave += Number(gData.caracs.carac1)+Number(gData.caracs.carac2)+Number(gData.caracs.carac3) + ",";
                        dataToSave += gData.position_img + ",";
                        dataToSave += stripSpan(gData.ref.eyes) + ",";
                        dataToSave += stripSpan(gData.ref.hair) + ",";
                        dataToSave += gData.ref.zodiac.substring(3) + ",";
                        dataToSave += gData.own + "\r\n";

                    }
                    //            logHHAuto(dataToSave);

                }
                catch(exp){
                    // error
                    LogUtils_logHHAuto("Catched error : Girls Map had undefined property...! Error, cannot export girls : "+exp);
                }
            }
            return dataToSave;
        }

        function stripSpan(tmpStr)
        {
            var newStr = "";
            while(tmpStr.indexOf(">") > -1)
            {
                tmpStr = tmpStr.substring(tmpStr.indexOf(">") + 1);
                newStr += tmpStr.slice(0, tmpStr.indexOf("<"));
                //        tmpStr = tmpStr.substring(tmpStr.indexOf(">")+1);
            }
            return newStr;
        }
    }

    static getFilteredGirlList() {
        // Store girls for harem tools
        let filteredGirlsList = [];

        if (unsafeWindow.harem.filteredGirlsList.length > 0) {
            unsafeWindow.harem.filteredGirlsList.forEach((girl) => {
                if (girl.shards >= 100) filteredGirlsList.push(""+girl.id_girl);
            });
        }
        else if (unsafeWindow.harem.filteredGirlsList.length == 0 && unsafeWindow.harem.preselectedGirlId != null) {
            unsafeWindow.harem.girlsBeforeSelected.forEach((girl) => {
                if (girl.shards >= 100) filteredGirlsList.push(""+girl.id_girl);
            });
            filteredGirlsList.push(unsafeWindow.harem.preselectedGirlId);
            unsafeWindow.harem.girlsAfterSelected.forEach((girl) => {
                if (girl.shards >= 100) filteredGirlsList.push(""+girl.id_girl);
            });
        }
        return filteredGirlsList;
    };

    static moduleHarem()
    {
        const menuIDXp = "haremGiveXP";
        const menuIDGifts = "haremGiveGifts";

        let menuHidden = `<div style="visibility:hidden" id="${menuIDXp}"></div>`;
        if (document.getElementById(menuIDXp) === null)
        {
            // Avoid looping on add menu item
            $("#contains_all section").prepend(menuHidden);

            var giveHaremXp = function() { Harem.fillCurrentGirlItem('experience');};
            var giveHaremGifts = function() { Harem.fillCurrentGirlItem('affection');};

            GM_registerMenuCommand(getTextForUI(menuIDXp,"elementText"), giveHaremXp);
            GM_registerMenuCommand(getTextForUI(menuIDGifts,"elementText"), giveHaremGifts);
        }

        Harem.addGoToGirlPageButton();
        Harem.addGirlListMenu();
    }

    static fillCurrentGirlItem(haremItem){
        let filteredGirlsList = Harem.getFilteredGirlList();
        const displayedGirl = $('#harem_right .opened').attr('girl'); // unsafeWindow.harem.preselectedGirlId

        if (filteredGirlsList && filteredGirlsList.length > 0) {
            let girlToGoTo = filteredGirlsList[0];
            if(displayedGirl && filteredGirlsList.indexOf(""+displayedGirl) >=0) {
                girlToGoTo = displayedGirl;
            }
            LogUtils_logHHAuto("Go to " + girlToGoTo);
            gotoPage('/girl/'+girlToGoTo,{resource:haremItem});
            StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
            LogUtils_logHHAuto("setting autoloop to false");
        }
        StorageHelper_setStoredValue("HHAuto_Temp_haremGirlActions", haremItem);
        StorageHelper_setStoredValue("HHAuto_Temp_haremGirlMode", 'list');
        StorageHelper_setStoredValue("HHAuto_Temp_filteredGirlsList", JSON.stringify(filteredGirlsList));
    };

    static addGoToGirlPageButton(){
        const goToGirlPageButtonId = 'goToGirlPage';
        if($('#'+goToGirlPageButtonId).length > 0) return;

        const displayedGirl = $('#harem_right .opened').attr('girl'); // unsafeWindow.harem.preselectedGirlId

        GM_addStyle('.goToGirlPage {margin-right:10px; font-size: small; z-index:30;} '
        +'@media only screen and (max-width: 1025px) {.goToGirlPage {position: relative; right: -5rem;}}');

        const goToGirlPageButton = '<div class="tooltipHH goToGirlPage"><span class="tooltipHHtext">'+getTextForUI("goToGirlPage","tooltip")+'</span><label class="myButton" id="'+goToGirlPageButtonId+'">'+getTextForUI("goToGirlPage","elementText")+'</label></div>';
        var goToGirl = function(){
            const displayedGirl = $('#harem_right .opened').attr('girl'); // unsafeWindow.harem.preselectedGirlId
            gotoPage('/girl/'+displayedGirl,{resource:'experience'});
        };
        $('#gems-and-token-container').prepend(goToGirlPageButton);

        GM_registerMenuCommand(getTextForUI('goToGirlPage',"elementText"), goToGirl);
        document.getElementById(goToGirlPageButtonId).addEventListener("click", goToGirl);
    }

    static addGirlListMenu(){
        const girlListMenuButtonId = 'girlListMenu';
        if($('#'+girlListMenuButtonId).length > 0) return;

        var createMenuButton = function(menuId, disabled=false){
            return '<div class="tooltipHH">'
            +    '<span class="tooltipHHtext">'+getTextForUI(menuId,"tooltip")+'</span>'
            +    '<label style="width:200px;font-size: initial;" class="myButton" '+(disabled?'disabled="disabled"':'')+' id="'+menuId+'Button">'+getTextForUI(menuId,"elementText")
            +'</label></div>';
        }
        
        const girlListMenuButton = '<div style="position: absolute;left: 250px;top: 50px; font-size: small; z-index:30;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("girlListMenu","tooltip")+'</span><label class="myButton" id="'+girlListMenuButtonId+'">+</label></div>';
        var openGirlMenu = function(){

            
            const menuIDXp = "haremGiveXP";
            const menuIDGifts = "haremGiveGifts";
            const menuIDMaxGifts = "haremGiveMaxGifts";
            const menuNextUpgrad = "haremNextUpgradableGirl";

            const menuIDXpButton = createMenuButton(menuIDXp);
            const menuIDGiftsButton = createMenuButton(menuIDGifts);
            const menuIDMaxGiftsButton = createMenuButton(menuIDMaxGifts);
            const menuNextUpgradButton = createMenuButton(menuNextUpgrad);

            
            const girlListMenu = '<div style="padding:50px; display:flex;flex-direction:column">'
            +    '<p id="HaremSortMenuSortText">'+getTextForUI("girlListMenu","elementText")+'</p>'
            +    '<div>'
            +     '<div style="padding:10px">'+menuIDXpButton+'</div>'
            +     '<div style="padding:10px">'+menuIDGiftsButton+'</div>'
            +     '<div style="padding:10px">'+menuIDMaxGiftsButton+'</div>'
            +     '<div style="padding:10px">'+menuNextUpgradButton+'</div>'
            +    '</div>'
            +  '</div>'
            fillHHPopUp("GirlListMenu",getTextForUI("girlListMenu","elementText"), girlListMenu);
            document.getElementById(menuIDXp+'Button').addEventListener("click", function() { Harem.fillCurrentGirlItem('experience');});
            document.getElementById(menuIDGifts+'Button').addEventListener("click", function() { Harem.fillCurrentGirlItem('affection');});
            document.getElementById(menuIDMaxGifts+'Button').addEventListener("click", function() {
                StorageHelper_setStoredValue("HHAuto_Temp_haremGirlEnd", 'true');
                Harem.fillCurrentGirlItem('affection');
            });
            document.getElementById(menuNextUpgrad+'Button').addEventListener("click", function() { 
                maskHHPopUp();
                Harem.popUpHaremSort();
            });
        };
        $('#harem_left').append(girlListMenuButton);

        GM_registerMenuCommand(getTextForUI('girlListMenu',"elementText"), openGirlMenu);
        document.getElementById(girlListMenuButtonId).addEventListener("click", openGirlMenu);
    }
   
    static HaremSizeNeedsRefresh(inCustomExpi)
    {
        return ! Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_HaremSize")) || JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_HaremSize")).count_date < (new Date().getTime() - inCustomExpi * 1000);
    }

    static moduleHaremCountMax()
    {
        if (Harem.HaremSizeNeedsRefresh(getHHScriptVars("HaremMinSizeExpirationSecs")) && getHHVars('girlsDataList',false) !== null)
        {
            StorageHelper_setStoredValue("HHAuto_Temp_HaremSize", JSON.stringify({count:Object.keys(getHHVars('girlsDataList',false)).length,count_date:new Date().getTime()}));
            LogUtils_logHHAuto("Harem size updated to : "+Object.keys(getHHVars('girlsDataList',false)).length);
        }
    }

    static getGirlUpgradeCost(inRarity, inTargetGrade)
    {
        const rarity = ["starting", "common", "rare", "epic", "legendary", "mythic"];
        const rarityFactors = [1, 2, 6, 14, 20, 50];
        const gradeFactors = [1, 2.5, 2.5, 2, 2, 2];
        const cost11 = 36000;
        let calculatedCosts = {};
        for (let i = 0;i <rarity.length; i++)
        {
            let currentRarityCosts = {};
            for (let j = 0;j < 6;j++)
            {
                let currentCost;
                if (i === 0 && j === 0)
                {
                    //console.log("init 1");
                    currentCost = cost11;
                }
                else if ( j === 0 )
                {
                    //console.log("init -1");
                    currentCost = calculatedCosts[rarity[0]][0]*rarityFactors[i];
                }
                else
                {
                    //console.log("-1");
                    currentCost = currentRarityCosts[j-1]*gradeFactors[j];
                }

                currentRarityCosts[j] = currentCost;
            }
            //console.log(current);
            calculatedCosts[rarity[i]] = currentRarityCosts;
        }
        return calculatedCosts[inRarity][inTargetGrade];
    }
}
;// CONCATENATED MODULE: ./src/Module/Troll.js






class Troll {

    static getEnergy() {
        return Number(getHHVars('Hero.energies.fight.amount'));
    }

    static getEnergyMax() {
        return Number(getHHVars('Hero.energies.fight.max_regen_amount'));
    }

    static getTrollWithGirls() {
        const girlDictionary = Harem.getGirlsList();
        const trollGirlsID = getHHScriptVars("trollGirlsID");
        const trollWithGirls = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    
        if (girlDictionary) {
            for (var tIdx = 0; tIdx < trollGirlsID.length; tIdx++) {
                for (var pIdx = 0; pIdx < trollGirlsID[tIdx].length; pIdx++) {
                    trollWithGirls[tIdx][pIdx] = false;
                    for (var gIdx = 0; gIdx < trollGirlsID[tIdx][pIdx].length; gIdx++) {
                        var idGirl = parseInt(trollGirlsID[tIdx][pIdx][gIdx], 10);
                        if (idGirl == 0) {
                            trollWithGirls[tIdx][pIdx] = false;
                        }
                        else if (girlDictionary.get(idGirl) == undefined) {
                            trollWithGirls[tIdx][pIdx] = true;
                        }
                        else {
                            if (girlDictionary.get(idGirl).shards == 100 && trollWithGirls[tIdx][pIdx] == false) {
                                trollWithGirls[tIdx][pIdx] = false;
                            }
                            else {
                                trollWithGirls[tIdx][pIdx] = true;
                            }
                        }
                    }
    
                }
            }
        }
        // const trollWithGirls = isJSON(getStoredValue("HHAuto_Temp_trollWithGirls"))?JSON.parse(getStoredValue("HHAuto_Temp_trollWithGirls")):[];
        return trollWithGirls;
    }

    static getLastTrollIdAvailable() {
        const id_world = getHHVars('Hero.infos.questing.id_world');
        if(isPshEnvironnement() && id_world > 10) {
            return id_world-3; // PSH parallele adventures
        }else {
            return id_world-1;
        }
    }

    static getTrollIdToFight() {
        let trollWithGirls = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_trollWithGirls"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_trollWithGirls")):[];
        let autoTrollSelectedIndex = StorageHelper_getStoredValue("HHAuto_Setting_autoTrollSelectedIndex");
        if(autoTrollSelectedIndex === undefined || isNaN(autoTrollSelectedIndex)) {
            autoTrollSelectedIndex -1
        }else {
            autoTrollSelectedIndex = Number(autoTrollSelectedIndex);
        }

        var TTF;
        const id_world = getHHVars('Hero.infos.questing.id_world');
        const lastTrollIdAvailable = Troll.getLastTrollIdAvailable();
        if (StorageHelper_getStoredValue("HHAuto_Setting_plusEvent") === "true" && !checkTimer("eventGoing") && StorageHelper_getStoredValue("HHAuto_Temp_eventGirl") !== undefined && JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).is_mythic==="false")
        {
            TTF=JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).troll_id;
            LogUtils_logHHAuto("Event troll fight");
        }
        else if (StorageHelper_getStoredValue("HHAuto_Setting_plusEventMythic") ==="true" && !checkTimer("eventMythicGoing") && StorageHelper_getStoredValue("HHAuto_Temp_eventGirl") !== undefined && JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).is_mythic==="true")
        {
            TTF=JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).troll_id;
            LogUtils_logHHAuto("Mythic Event troll fight");
        }
        else if (autoTrollSelectedIndex === 98 || autoTrollSelectedIndex === 99) {
            if (trollWithGirls === undefined || trollWithGirls.length === 0) {
                LogUtils_logHHAuto("No troll with girls from storage, parsing game info ...");
                trollWithGirls = Troll.getTrollWithGirls();
                StorageHelper_setStoredValue("HHAuto_Temp_trollWithGirls", JSON.stringify(trollWithGirls));
            }

            if (trollWithGirls !== undefined && trollWithGirls.length > 0) {
                if(autoTrollSelectedIndex === 98) {
                    TTF = trollWithGirls.findIndex(troll => troll.find(trollTier => trollTier === true)) + 1;
                }
                else if(autoTrollSelectedIndex === 99) {
                    TTF = trollWithGirls.findLastIndex(troll => troll.find(trollTier => trollTier === true)) + 1;
                    if(TTF > id_world-1) {
                        TTF=id_world-1;
                    }
                }
            } else if(getPage()!==getHHScriptVars("pagesIDHome")) {
                LogUtils_logHHAuto("Can't get troll with girls, going to home page to get girl list.");
                gotoPage(getHHScriptVars("pagesIDHome"));
            } else {
                LogUtils_logHHAuto("Can't get troll with girls, going to last troll.");
                TTF=id_world-1;
            }
        }
        else if(autoTrollSelectedIndex > 0 && autoTrollSelectedIndex < 98)
        {
            TTF=autoTrollSelectedIndex;
            LogUtils_logHHAuto("Custom troll fight.");
        }
        else
        {
            TTF = lastTrollIdAvailable;
            LogUtils_logHHAuto("Last troll fight: " + TTF);
        }

        if (StorageHelper_getStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest") === "true")
        {
            TTF = lastTrollIdAvailable;
            LogUtils_logHHAuto("Last troll fight for quest item: " + TTF);
            //setStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest", "false");
            StorageHelper_setStoredValue("HHAuto_Temp_questRequirement", "none");
        }
        if(TTF >= Trollz.length) {
            LogUtils_logHHAuto("Error: New troll implemented '"+TTF+"' (List to be updated) or wrong troll target found");
            TTF = 1;
        }
        return TTF;
    }

    static doBossBattle()
    {
        var currentPower = Troll.getEnergy();
        if(currentPower < 1)
        {
            //logHHAuto("No power for battle.");
            if (!Troll.canBuyFight().canBuy)
            {
                return false;
            }
        }

        const TTF = Troll.getTrollIdToFight();

        LogUtils_logHHAuto("Fighting troll N "+TTF);
        LogUtils_logHHAuto("Going to crush: "+Trollz[Number(TTF)]);

        // Battles the latest boss.
        // Navigate to latest boss.
        //console.log(getPage());
        if(getPage()===getHHScriptVars("pagesIDTrollPreBattle") && window.location.search=="?id_opponent=" + TTF)
        {
            // On the battle screen.
            Troll.CrushThemFights();
            return true;
        }
        else
        {
            LogUtils_logHHAuto("Navigating to chosen Troll.");
            StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
            LogUtils_logHHAuto("setting autoloop to false");
            //week 28 new battle modification
            //location.href = "/battle.html?id_troll=" + TTF;
            gotoPage(getHHScriptVars("pagesIDTrollPreBattle"),{id_opponent:TTF});
            //End week 28 new battle modification
            return true;
        }
    }

    static CrushThemFights()
    {
        if (getPage() === getHHScriptVars("pagesIDTrollPreBattle")) {
            // On battle page.
            LogUtils_logHHAuto("On Pre battle page.");
            let TTF = queryStringGetParam(window.location.search,'id_opponent');

            let battleButton = $('#pre-battle .battle-buttons a.green_button_L.battle-action-button');
            let battleButtonX10 = $('#pre-battle .battle-buttons button.autofight[data-battles="10"]');
            let battleButtonX50 = $('#pre-battle .battle-buttons button.autofight[data-battles="50"]');
            let battleButtonX10Price = Number(battleButtonX10.attr('price'));
            let battleButtonX50Price = Number(battleButtonX50.attr('price'));
            // let Hero=getHero();
            let hcConfirmValue = getHHVars('Hero.infos.hc_confirm');
            let remainingShards;
            let previousPower = StorageHelper_getStoredValue("HHAuto_Temp_trollPoints") !== undefined ? StorageHelper_getStoredValue("HHAuto_Temp_trollPoints") : 0;
            let currentPower = Troll.getEnergy();

            var checkPreviousFightDone = function(){
                // The goal of this function is to detect slow server response to avoid loop without fight
                if(previousPower > 0 && previousPower == currentPower) {
                    StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
                    LogUtils_logHHAuto("Server seems slow to reply, setting autoloop to false to wait for troll page to load");
                }
            }

            //check if girl still available at troll in case of event
            if (TTF !== null)
            {
                if (StorageHelper_getStoredValue("HHAuto_Temp_eventGirl") !== undefined && TTF === JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).troll_id)
                {
                    if (
                        (
                            JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "true"
                            && StorageHelper_getStoredValue("HHAuto_Setting_plusEventMythic") ==="true"
                        )
                        ||
                        (
                            JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "false"
                            && StorageHelper_getStoredValue("HHAuto_Setting_plusEvent") ==="true"
                        )
                    )
                    {
                        let rewardGirlz=$("#pre-battle .oponnent-panel .opponent_rewards .rewards_list .slot.girl_ico[data-rewards]");

                        if (rewardGirlz.length ===0 || !rewardGirlz.attr('data-rewards').includes('"id_girl":'+JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).girl_id))
                        {
                            LogUtils_logHHAuto("Seems "+JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).girl_name+" is no more available at troll "+Trollz[Number(TTF)]+". Going to event page.");
                            EventModule.parseEventPage(JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).event_id);
                            return true;
                        }
                    }
                }
                let canBuyFightsResult=Troll.canBuyFight();
                if (
                    (canBuyFightsResult.canBuy && currentPower === 0)
                    ||
                    (
                        canBuyFightsResult.canBuy
                        && currentPower < 50
                        && canBuyFightsResult.max === 50
                        && StorageHelper_getStoredValue("HHAuto_Setting_useX50Fights") === "true"
                        && ( JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "true" || StorageHelper_getStoredValue("HHAuto_Setting_useX50FightsAllowNormalEvent") === "true")
                        && TTF === JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).troll_id
                    )
                    ||
                    (
                        canBuyFightsResult.canBuy
                        && currentPower < 10
                        && canBuyFightsResult.max === 20
                        && StorageHelper_getStoredValue("HHAuto_Setting_useX10Fights") === "true"
                        && ( JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "true" || StorageHelper_getStoredValue("HHAuto_Setting_useX10FightsAllowNormalEvent") === "true")
                        && TTF === JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).troll_id
                    )
                )
                {
                    Troll.RechargeCombat();
                    gotoPage(getHHScriptVars("pagesIDTrollPreBattle"),{id_opponent:TTF});
                    return;
                }

                if
                    (
                        StorageHelper_getStoredValue("HHAuto_Temp_eventGirl") !== undefined
                        && JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).girl_shards
                        && Number.isInteger(Number(JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).girl_shards))
                        && battleButtonX10.length > 0
                        && battleButtonX50.length > 0
                        && StorageHelper_getStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest") !== "true"
                    )
                {
                    remainingShards = Number(100 - Number(JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).girl_shards));
                    let bypassThreshold = (
                        (JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "false"
                        && canBuyFightsResult.canBuy
                        ) // eventGirl available and buy comb true
                        || (JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "true"
                            && StorageHelper_getStoredValue("HHAuto_Setting_plusEventMythic") ==="true"
                        )
                    );

                    if (StorageHelper_getStoredValue("HHAuto_Setting_useX50Fights") === "true"
                        && StorageHelper_getStoredValue("HHAuto_Setting_minShardsX50")
                        && Number.isInteger(Number(StorageHelper_getStoredValue("HHAuto_Setting_minShardsX50")))
                        && remainingShards >= Number(StorageHelper_getStoredValue("HHAuto_Setting_minShardsX50"))
                        && (battleButtonX50Price === 0 || getHHVars('Hero.currencies.hard_currency')>=battleButtonX50Price+Number(StorageHelper_getStoredValue("HHAuto_Setting_kobanBank")))
                        && currentPower >= 50
                        && (currentPower >= (Number(StorageHelper_getStoredValue("HHAuto_Setting_autoTrollThreshold")) + 50)
                            || bypassThreshold
                        )
                        && ( JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "true" || StorageHelper_getStoredValue("HHAuto_Setting_useX50FightsAllowNormalEvent") === "true")
                    )
                    {
                        LogUtils_logHHAuto("Going to crush 50 times: "+Trollz[Number(TTF)]+' for '+battleButtonX50Price+' kobans.');

                        setHHVars('Hero.infos.hc_confirm',true);
                        // We have the power.
                        //replaceCheatClick();
                        battleButtonX50[0].click();
                        setHHVars('Hero.infos.hc_confirm',hcConfirmValue);
                        //setStoredValue("HHAuto_Temp_EventFightsBeforeRefresh", Number(getStoredValue("HHAuto_Temp_EventFightsBeforeRefresh")) - 50);
                        LogUtils_logHHAuto("Crushed 50 times: "+Trollz[Number(TTF)]+' for '+battleButtonX50Price+' kobans.');
                        if (StorageHelper_getStoredValue("HHAuto_Temp_questRequirement") === "battle") {
                            // Battle Done.
                            StorageHelper_setStoredValue("HHAuto_Temp_questRequirement", "none");
                        }
                        RewardHelper.ObserveAndGetGirlRewards();
                        return;
                    }
                    else
                    {
                        if (StorageHelper_getStoredValue("HHAuto_Setting_useX50Fights") === "true")
                        {
                            LogUtils_logHHAuto('Unable to use x50 for '+battleButtonX50Price+' kobans,fights : '+Troll.getEnergy()+'/50, remaining shards : '+remainingShards+'/'+StorageHelper_getStoredValue("HHAuto_Setting_minShardsX50")+', kobans : '+getHHVars('Hero.currencies.hard_currency')+'/'+Number(StorageHelper_getStoredValue("HHAuto_Setting_kobanBank")));
                        }
                    }

                    if (StorageHelper_getStoredValue("HHAuto_Setting_useX10Fights") === "true"
                        && StorageHelper_getStoredValue("HHAuto_Setting_minShardsX10")
                        && Number.isInteger(Number(StorageHelper_getStoredValue("HHAuto_Setting_minShardsX10")))
                        && remainingShards >= Number(StorageHelper_getStoredValue("HHAuto_Setting_minShardsX10"))
                        && (battleButtonX10Price === 0 || getHHVars('Hero.currencies.hard_currency')>=battleButtonX10Price+Number(StorageHelper_getStoredValue("HHAuto_Setting_kobanBank")))
                        && currentPower >= 10
                        && (currentPower >= (Number(StorageHelper_getStoredValue("HHAuto_Setting_autoTrollThreshold")) + 10)
                            || bypassThreshold
                        )
                        && ( JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "true" || StorageHelper_getStoredValue("HHAuto_Setting_useX10FightsAllowNormalEvent") === "true")
                    )
                    {
                        LogUtils_logHHAuto("Going to crush 10 times: "+Trollz[Number(TTF)]+' for '+battleButtonX10Price+' kobans.');

                        setHHVars('Hero.infos.hc_confirm',true);
                        // We have the power.
                        //replaceCheatClick();
                        battleButtonX10[0].click();
                        setHHVars('Hero.infos.hc_confirm',hcConfirmValue);
                        //setStoredValue("HHAuto_Temp_EventFightsBeforeRefresh", Number(getStoredValue("HHAuto_Temp_EventFightsBeforeRefresh")) - 10);
                        LogUtils_logHHAuto("Crushed 10 times: "+Trollz[Number(TTF)]+' for '+battleButtonX10Price+' kobans.');
                        if (StorageHelper_getStoredValue("HHAuto_Temp_questRequirement") === "battle") {
                            // Battle Done.
                            StorageHelper_setStoredValue("HHAuto_Temp_questRequirement", "none");
                        }
                        RewardHelper.ObserveAndGetGirlRewards();
                        return;
                    }
                    else
                    {
                        if (StorageHelper_getStoredValue("HHAuto_Setting_useX10Fights") === "true")
                        {
                            LogUtils_logHHAuto('Unable to use x10 for '+battleButtonX10Price+' kobans,fights : '+Troll.getEnergy()+'/10, remaining shards : '+remainingShards+'/'+StorageHelper_getStoredValue("HHAuto_Setting_minShardsX10")+', kobans : '+getHHVars('Hero.currencies.hard_currency')+'/'+Number(StorageHelper_getStoredValue("HHAuto_Setting_kobanBank")));
                        }
                    }
                }

                //Crushing one by one


                if (currentPower > 0)
                {
                    if ($('#pre-battle div.battle-buttons a.single-battle-button[disabled]').length>0)
                    {
                        LogUtils_logHHAuto("Battle Button seems disabled, force reload of page.");
                        gotoPage(getHHScriptVars("pagesIDHome"));
                        return;
                    }
                    if(battleButton === undefined || battleButton.length === 0)
                    {
                        LogUtils_logHHAuto("Battle Button was undefined. Disabling all auto-battle.");
                        document.getElementById("autoTrollBattle").checked = false;
                        StorageHelper_setStoredValue("HHAuto_Setting_autoTrollBattle", "false");

                        //document.getElementById("autoArenaCheckbox").checked = false;
                        if (StorageHelper_getStoredValue("HHAuto_Temp_questRequirement") === "battle")
                        {
                            document.getElementById("autoQuest").checked = false;
                            StorageHelper_setStoredValue("HHAuto_Setting_autoQuest", "false");

                            LogUtils_logHHAuto("Auto-quest disabled since it requires battle and auto-battle has errors.");
                        }
                        return;
                    }
                    LogUtils_logHHAuto("Crushing: "+Trollz[Number(TTF)]);
                    //console.log(battleButton);
                    //replaceCheatClick();
                    checkPreviousFightDone();
                    StorageHelper_setStoredValue("HHAuto_Temp_trollPoints", currentPower);
                    battleButton[0].click();
                }
                else
                {
                    // We need more power.
                    LogUtils_logHHAuto("Battle requires "+battle_price+" power.");
                    StorageHelper_setStoredValue("HHAuto_Temp_battlePowerRequired", battle_price);
                    if(StorageHelper_getStoredValue("HHAuto_Temp_questRequirement") === "battle")
                    {
                        StorageHelper_setStoredValue("HHAuto_Temp_questRequirement", "P"+battle_price);
                    }
                    gotoPage(getHHScriptVars("pagesIDHome"));
                    return;
                }
            }
            else
            {
                checkPreviousFightDone();
                StorageHelper_setStoredValue("HHAuto_Temp_trollPoints", currentPower);
                //replaceCheatClick();
                battleButton[0].click();
            }
        }
        else
        {
            LogUtils_logHHAuto('Unable to identify page.');
            gotoPage(getHHScriptVars("pagesIDHome"));
            return;
        }
        return;
    }

    static RechargeCombat()
    {
        const Hero=getHero();

        let canBuyResult = Troll.canBuyFight();
        if (canBuyResult.canBuy)
        {
            LogUtils_logHHAuto('Recharging '+canBuyResult.toBuy+' fights for '+canBuyResult.price+' kobans.');
            let hcConfirmValue = getHHVars('Hero.infos.hc_confirm');
            setHHVars('Hero.infos.hc_confirm',true);
            // We have the power.
            //replaceCheatClick();
            //console.log($("plus[type='energy_fight']"), canBuyResult.price,canBuyResult.type, canBuyResult.max);
            Hero.recharge($("button.orange_text_button.manual-recharge"), canBuyResult.type, canBuyResult.max, canBuyResult.price);
            setHHVars('Hero.infos.hc_confirm',hcConfirmValue);
            LogUtils_logHHAuto('Recharged up to '+canBuyResult.max+' fights for '+canBuyResult.price+' kobans.');
        }
    }

    
    static canBuyFight(logging=true)
    {
        let type="fight";
        let hero=getHero();
        let result = {canBuy:false, price:0, max:0, toBuy:0, event_mythic:"false", type:type};
        const MAX_BUY = 200;
        let maxx50 = 50;
        let maxx20 = 20;
        const currentFight = Troll.getEnergy();
        const eventAutoBuy =  Math.min(Number(StorageHelper_getStoredValue("HHAuto_Setting_autoBuyTrollNumber"))       || maxx20, MAX_BUY-currentFight);
        const mythicAutoBuy = Math.min(Number(StorageHelper_getStoredValue("HHAuto_Setting_autoBuyMythicTrollNumber")) || maxx20, MAX_BUY-currentFight);
        const pricePerFight = hero.energies[type].seconds_per_point * (unsafeWindow.hh_prices[type + '_cost_per_minute'] / 60);
        let remainingShards;

        if (StorageHelper_getStoredValue("HHAuto_Temp_eventGirl") !== undefined && JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).girl_shards && Number.isInteger(Number(JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).girl_shards)))
        {
            if (
                (
                    StorageHelper_getStoredValue("HHAuto_Setting_buyCombat") =="true"
                    && StorageHelper_getStoredValue("HHAuto_Setting_plusEvent") ==="true"
                    && getSecondsLeft("eventGoing") !== 0
                    && Number(StorageHelper_getStoredValue("HHAuto_Setting_buyCombTimer")) !== NaN
                    && getSecondsLeft("eventGoing") < StorageHelper_getStoredValue("HHAuto_Setting_buyCombTimer")*3600
                    && JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "false"
                )
                ||
                (
                    StorageHelper_getStoredValue("HHAuto_Setting_plusEventMythic") ==="true"
                    && StorageHelper_getStoredValue("HHAuto_Setting_buyMythicCombat") === "true"
                    && getSecondsLeft("eventMythicGoing") !== 0
                    && Number(StorageHelper_getStoredValue("HHAuto_Setting_buyMythicCombTimer")) !== NaN
                    && getSecondsLeft("eventMythicGoing") < StorageHelper_getStoredValue("HHAuto_Setting_buyMythicCombTimer")*3600
                    && JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "true"
                )
            )
            {
                result.event_mythic = JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).is_mythic;
            }
            else
            {
                return result;
            }

            maxx50 = result.event_mythic === "true" ? Math.max(maxx50, mythicAutoBuy) : Math.max(maxx50, eventAutoBuy);
            maxx20 = result.event_mythic === "true" ? Math.max(maxx20, mythicAutoBuy) : Math.max(maxx20, eventAutoBuy);

            //console.log(result);
            remainingShards = Number(100 - Number(JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).girl_shards));
            if
                (
                    StorageHelper_getStoredValue("HHAuto_Setting_minShardsX50") !== undefined
                    && Number.isInteger(Number(StorageHelper_getStoredValue("HHAuto_Setting_minShardsX50")))
                    && remainingShards >= Number(StorageHelper_getStoredValue("HHAuto_Setting_minShardsX50"))
                    && getHHVars('Hero.currencies.hard_currency')>= (pricePerFight * maxx50)+Number(StorageHelper_getStoredValue("HHAuto_Setting_kobanBank"))
                    && StorageHelper_getStoredValue("HHAuto_Setting_useX50Fights") === "true"
                    && currentFight < maxx50
                    && ( result.event_mythic === "true" || StorageHelper_getStoredValue("HHAuto_Setting_useX50FightsAllowNormalEvent") === "true")
                )
            {
                result.max = maxx50;
                result.canBuy = true;
                result.price = pricePerFight * maxx50;
                result.toBuy = maxx50;
            }
            else
            {

                if (logging && StorageHelper_getStoredValue("HHAuto_Setting_useX50Fights") === "true")
                {
                    LogUtils_logHHAuto('Unable to recharge up to '+maxx50+' for '+(pricePerFight * maxx50)+' kobans : current energy : '+currentFight+', remaining shards : '+remainingShards+'/'+StorageHelper_getStoredValue("HHAuto_Setting_minShardsX50")+', kobans : '+getHHVars('Hero.currencies.hard_currency')+'/'+Number(StorageHelper_getStoredValue("HHAuto_Setting_kobanBank")));
                }
                if (getHHVars('Hero.currencies.hard_currency')>=(pricePerFight * maxx20)+Number(StorageHelper_getStoredValue("HHAuto_Setting_kobanBank"))
                )//&& currentFight < 10)
                {
                    result.max = maxx20;
                    result.canBuy = true;
                    result.price = pricePerFight * maxx20;
                    result.toBuy = maxx20;
                }
                else
                {
                    if (logging)
                    {
                        LogUtils_logHHAuto('Unable to recharge up to '+maxx20+' for '+(pricePerFight * maxx20)+' kobans : current energy : '+currentFight+', kobans : '+getHHVars('Hero.currencies.hard_currency')+'/'+Number(StorageHelper_getStoredValue("HHAuto_Setting_kobanBank")));
                    }
                    return result;
                }
            }
        }

        return result;
    }
}

;// CONCATENATED MODULE: ./src/Module/GenericBattle.js





class GenericBattle {
    static doBattle()
    {
        if (getPage() === getHHScriptVars("pagesIDLeagueBattle") || getPage() === getHHScriptVars("pagesIDTrollBattle") || getPage() === getHHScriptVars("pagesIDSeasonBattle") || getPage() === getHHScriptVars("pagesIDPantheonBattle") )
        {
            LogUtils_logHHAuto("On battle page.");
            let troll_id = queryStringGetParam(window.location.search,'id_opponent');
            const lastTrollIdAvailable = Troll.getLastTrollIdAvailable();
            if (getPage() === getHHScriptVars("pagesIDLeagueBattle") && StorageHelper_getStoredValue("HHAuto_Setting_autoLeagues") === "true")
            {
                LogUtils_logHHAuto("Reloading after league fight.");
                gotoPage(getHHScriptVars("pagesIDLeaderboard"),{},randomInterval(4000,5000));
            }
            else if (getPage() === getHHScriptVars("pagesIDTrollBattle") )
            {
                //console.log(Number(troll_id),Number(getHHVars('Hero.infos.questing.id_world'))-1,Number(troll_id) === Number(getHHVars('Hero.infos.questing.id_world'))-1);
                if (StorageHelper_getStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest") === "true" && (Number(troll_id) === lastTrollIdAvailable))
                {
                    StorageHelper_setStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest", "false");
                }
                if(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl") !== undefined &&
                    (
                        StorageHelper_getStoredValue("HHAuto_Setting_plusEvent") === "true" && JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).is_mythic==="false"
                        || 
                        StorageHelper_getStoredValue("HHAuto_Setting_plusEventMythic") === "true" && JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).is_mythic==="true"
                    ))
                {
                    LogUtils_logHHAuto("Event ongoing search for girl rewards in popup.");
                    RewardHelper.ObserveAndGetGirlRewards();
                }
                else
                {
                    if (troll_id !== null)
                    {
                        LogUtils_logHHAuto("Go back to Troll after Troll fight.");
                        gotoPage(getHHScriptVars("pagesIDTrollPreBattle"),{id_opponent:troll_id},randomInterval(2000,4000));
                    }
                    else
                    {
                        LogUtils_logHHAuto("Go to home after unknown troll fight.");
                        gotoPage(getHHScriptVars("pagesIDHome"),{},randomInterval(2000,4000));
                    }
                }

            }
            else if (getPage() === getHHScriptVars("pagesIDSeasonBattle") && StorageHelper_getStoredValue("HHAuto_Setting_autoSeason") === "true")
            {
                LogUtils_logHHAuto("Go back to Season arena after Season fight.");
                gotoPage(getHHScriptVars("pagesIDSeasonArena"),{},randomInterval(2000,4000));
            }
            else if (getPage() === getHHScriptVars("pagesIDPantheonBattle") && StorageHelper_getStoredValue("HHAuto_Setting_autoPantheon") === "true")
            {
                LogUtils_logHHAuto("Go back to Pantheon arena after Pantheon temple.");
                gotoPage(getHHScriptVars("pagesIDPantheon"),{},randomInterval(2000,4000));
            }
            return true;
        }
        else
        {
            LogUtils_logHHAuto('Unable to identify page.');
            gotoPage(getHHScriptVars("pagesIDHome"));
            return;
        }
    }

}
;// CONCATENATED MODULE: ./src/Module/harem/index.js

;// CONCATENATED MODULE: ./src/Module/HaremSalary.js





class HaremSalary {
    static filterGirlMapReadyForCollect(a)
    {
        return a.readyForCollect;
    }

    static CollectMoney ()
    {
        var Clicked=[];
        const Hero = getHero();
        //var ToClick=[];
        var endCollectTS = -1;
        let startCollectTS = -1;
        var maxSecsForSalary = Number(StorageHelper_getStoredValue("HHAuto_Setting_autoSalaryMaxTimer"));
        var collectedGirlzNb = 0;
        var collectedMoney = 0;
        let totalGirlsToCollect = 0;
        let girlsToCollectBeforeWait = randomInterval(6,12);
        function ClickThem()
        {
            if (endCollectTS === -1)
            {
                endCollectTS = new Date().getTime() + 1000 * maxSecsForSalary;
                startCollectTS = new Date().getTime();
            }
            //logHHAuto('Need to click: '+ToClick.length);
            if (Clicked.length>0)
            {
    
                //logHHAuto('clicking N '+ToClick[0].formAction.split('/').last())
                //console.log($(ToClick[0]));
                //$(ToClick[0]).click();
                try{
                    // Scroll to girl
                    $('[id_girl="'+Clicked[0]+'"]')[0].scrollIntoView();
                } catch (err) {
                    try{
                        // Girl must not be visible, scroll to girl list bottom
                        $('.girls_list')[0].scrollTop = $('.girls_list')[0].scrollHeight;
                    }catch (err) {}
                }
                var params = {
                    class: "Girl",
                    id_girl: Clicked[0],
                    action: "get_salary"
                };
                hh_ajax(params, function(data) {
                    if (data.success)
                    {
                        //console.log(Clicked[0]);
                        let girlsDataList = getHHVars("GirlSalaryManager.girlsMap");
                        if (girlsDataList !== null && girlsDataList[Clicked[0]] !== undefined)
                        {
                            const _this2 = girlsDataList[Clicked[0]];
                            _this2.gData.pay_in = data.time + 60;
                            _this2._noDoubleClick = false;
                            _this2._resetSalaryDisplay();
                            //console.log(_this2);
                        }
                        Hero.update("soft_currency", data.money, true);
                        //movingStars(event, "$");
                        Collect.check_state();
                        collectedMoney += data.money;
                        collectedGirlzNb++;
                    }
                    else
                    {
                        LogUtils_logHHAuto("Collect error on n°"+Clicked[0]);
                    }
                    Clicked.shift();
                    if (new Date().getTime() < endCollectTS)
                    {
                        let waitBetweenGirlsTime = randomInterval(300,500);
                        girlsToCollectBeforeWait--;
                        if (girlsToCollectBeforeWait <= 0)
                        {
                            waitBetweenGirlsTime = randomInterval(1200,2000);
                            girlsToCollectBeforeWait = randomInterval(6,12);
                        }
                        LogUtils_logHHAuto("Next girl collection in " + waitBetweenGirlsTime + "ms after n°"+Clicked[0]);
                        setTimeout(ClickThem,waitBetweenGirlsTime);
                        window.top.postMessage({ImAlive:true},'*');
                    }
                    else
                    {
                        LogUtils_logHHAuto('Salary collection reached to the max time of '+maxSecsForSalary+' secs, collected '+collectedGirlzNb+'/'+totalGirlsToCollect+' girls and '+collectedMoney+' money');
                        setTimeout(CollectData,randomInterval(300,500));
                    }
                },
                        function(err) {
                    Clicked.shift();
                    LogUtils_logHHAuto("Bypassed n°"+Clicked[0]);
                    setTimeout(ClickThem,randomInterval(300,500));
                });
                //collectedMoney += $('span.s_value',$(ToClick[0])).length>0?Number($('span.s_value',$(ToClick[0]))[0].innerText.replace(/[^0-9]/gi, '')):0;
                //collectedGirlzNb++;
                //logHHAuto('will click again');
                //console.log(new Date().getTime(),endCollectTS,new Date().getTime() < endCollectTS);
    
    
            }
            else
            {
                const collectionTime = Math.ceil((new Date().getTime() - startCollectTS)/1000);
                LogUtils_logHHAuto(`Salary collection done : collected ${collectedGirlzNb} / ${totalGirlsToCollect} girls and ${collectedMoney} money in ${collectionTime} secs`);
                setTimeout(CollectData,randomInterval(300,500));
            }
        }
    
        function CollectData(inStart = false)
        {
            let allCollected = true;
            let collectableGirlsList = [];
            const girlsList = Harem.getGirlMapSorted(getCurrentSorting(), false);
            if ( girlsList === null)
            {
                gotoPage(getHHScriptVars("pagesIDHome"));
            }
            collectableGirlsList = girlsList.filter(HaremSalary.filterGirlMapReadyForCollect);
    
            totalGirlsToCollect = collectableGirlsList.length;
    
            if (collectableGirlsList.length>0 )
            {
                allCollected = false;
                //console.log(JSON.stringify(collectableGirlsList));
                for ( let girl of collectableGirlsList)
                {
                    Clicked.push(girl.gId);
                }
                LogUtils_logHHAuto({log:"Girls ready to collect: ", GirlsToCollect:Clicked});
            }
            if (Clicked.length>0 && inStart)
            {
                setTimeout(ClickThem,randomInterval(500,1500));
            }
            else//nothing to collect
            {
                let salaryTimer = HaremSalary.predictNextSalaryMinTime();
                if (salaryTimer > 0)
                {
                    LogUtils_logHHAuto("Setting salary timer to "+salaryTimer+" secs.");
                }
                else
                {
                    LogUtils_logHHAuto("Next salary set to 60 secs as remains girls to collect");
                    salaryTimer = 60;
                }
                setTimer('nextSalaryTime',salaryTimer);
                gotoPage(getHHScriptVars("pagesIDHome"),{},randomInterval(300,500));
            }
        }
    
        CollectData(true);
    }
    
    static predictNextSalaryMinTime()
    {
        let girlsDataList = getHHVars("GirlSalaryManager.girlsMap");
        const isGirlMap = girlsDataList!==null;
        if (!isGirlMap)
        {
            girlsDataList = getHHVars("girlsDataList");
        }
        let nextCollect = 0;
        const minSalaryForCollect = Number(StorageHelper_getStoredValue("HHAuto_Setting_autoSalaryMinSalary"));
        let currentCollectSalary = 0;
        if (girlsDataList !== null && minSalaryForCollect !== NaN)
        {
            let girlsSalary = Object.values(girlsDataList).sort(sortByPayIn);
            for (let i of girlsSalary)
            {
                let girl = i;
                if (isGirlMap)
                {
                    girl = i.gData;
                }
                currentCollectSalary += girl.salary;
                nextCollect = girl.pay_in;
                if (currentCollectSalary > minSalaryForCollect)
                {
                    break;
                }
            }
        }
        return nextCollect;
    
        function sortByPayIn(a, b)
        {
            let aPay = a.pay_in?a.pay_in:a.gData.pay_in;
            let bPay = b.pay_in?b.pay_in:b.gData.pay_in;
            return aPay - bPay;
        }
    }
    
    static getSalary() {
        try {
            if(getPage() == getHHScriptVars("pagesIDHarem") || getPage() == getHHScriptVars("pagesIDHome"))
            {
                const salaryButton = $("#collect_all_container button[id='collect_all']")
                const salaryToCollect = !(salaryButton.prop('disabled') || salaryButton.attr("style")==="display: none;");
                const getButtonClass = salaryButton.attr("class");
                let salarySumTag = NaN;
                if (getPage() == getHHScriptVars("pagesIDHarem"))
                {
                    salarySumTag = Number($('[rel="next_salary"]',salaryButton)[0].innerText.replace(/[^0-9]/gi, ''));
                }
                else if (getPage() == getHHScriptVars("pagesIDHome"))
                {
                    salarySumTag = Number($('.sum',salaryButton).attr("amount"));
                }
    
                const enoughSalaryToCollect = salarySumTag === NaN?true:salarySumTag > Number(StorageHelper_getStoredValue("HHAuto_Setting_autoSalaryMinSalary"));
                //console.log(salarySumTag, enoughSalaryToCollect);
                if (salaryToCollect && enoughSalaryToCollect )
                {
                    if (getButtonClass.indexOf("blue_button_L") !== -1 )
                    {
                        //replaceCheatClick();
                        salaryButton.click();
                        LogUtils_logHHAuto('Collected all Premium salary');
                        if (getPage() == getHHScriptVars("pagesIDHarem") )
                        {
                            setTimer('nextSalaryTime',HaremSalary.predictNextSalaryMinTime());
                            return false;
                        }
                        else
                        {
                            gotoPage(getHHScriptVars("pagesIDHome"));
                            return true;
                        }
    
                    }
                    else if ( getButtonClass.indexOf("orange_button_L") !== -1 )
                    {
                        // Not at Harem screen then goto the Harem screen.
                        if (getPage() == getHHScriptVars("pagesIDHarem") )
                        {
                            LogUtils_logHHAuto("Detected Harem Screen. Fetching Salary");
                            //replaceCheatClick();
                            StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
                            LogUtils_logHHAuto("setting autoloop to false");
                            HaremSalary.CollectMoney();
                        }
                        else
                        {
                            LogUtils_logHHAuto("Navigating to Harem window.");
                            gotoPage(getHHScriptVars("pagesIDHarem"));
                        }
                        return true;
                    }
                    else
                    {
                        LogUtils_logHHAuto("Unknown salary button color : "+getButtonClass);
                        setTimer('nextSalaryTime',60);
                    }
                }
                else if (!salaryToCollect)
                {
                    LogUtils_logHHAuto("No salary to collect");
                    setTimer('nextSalaryTime',HaremSalary.predictNextSalaryMinTime());
                }
                else
                {
                    LogUtils_logHHAuto("Not enough salary to collect, wait 15min");
                    setTimer('nextSalaryTime', 15*60);
                }
            }
            else
            {
                // Not at Harem screen then goto the Harem screen.
                if (checkTimer('nextSalaryTime'))
                {
                    LogUtils_logHHAuto("Navigating to Home window.");
                    gotoPage(getHHScriptVars("pagesIDHome"));
                    return true;
                }
            }
        }
        catch (ex) {
            LogUtils_logHHAuto("Catched error : Could not collect salary... " + ex);
            // return not busy
            return false;
        }
    }
}
;// CONCATENATED MODULE: ./src/Module/League.js





class LeagueHelper {
    /* get time in sec */
    static getLeagueEndTime(){
        let league_end = -1;
        const league_end_in = $('#leagues .league_end_in .timer span[rel="expires"]').text();
        if(league_end_in !== undefined && league_end_in !== null && league_end_in.length > 0)
        {
            league_end = Number(convertTimeToInt(league_end_in));
        }
        return league_end;
    }
    static numberOfFightAvailable(opponent) {
        // remove match_history after w32 update
        const matchs = opponent.match_history ? opponent.match_history[opponent.player.id_fighter]: opponent.match_history_sorting[opponent.player.id_fighter];
        return matchs ? matchs.filter(match=>match == null).length : 0
    }
    static getLeagueCurrentLevel()
    {
        if(unsafeWindow.current_tier_number === undefined)
        {
            setTimeout(autoLoop, Number(StorageHelper_getStoredValue("HHAuto_Temp_autoLoopTimeMili")))
        }
        return unsafeWindow.current_tier_number;
    }
    static style(){
        
        GM_addStyle('#leagues .league_content .league_table .data-list .data-row .data-column[column="can_fight"] {'
            + 'min-width: 8.5rem;}'
        );

        GM_addStyle('@media only screen and (min-width: 1026px) {'
            + '.matchRatingNew {'
            + 'display: flex;'
            + 'flex-wrap: nowrap;'
            + 'align-items: center;'
            + 'justify-content: center;'
            + 'text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000; '
            + 'line-height: 17px; '
            + 'max-width: 65px; '
            + 'font-size: 12px;}}'
        );

        GM_addStyle('@media only screen and (max-width: 1025px) {'
            + '.matchRatingNew {'
            + 'width: auto;'
            + 'display: flex;'
            + 'flex-wrap: nowrap;'
            + 'align-items: center;'
            + 'justify-content: center;'
            + 'text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000; '
            + 'line-height: 17px; '
            + 'max-width: 65px; '
            + 'font-size: 12px;}}'
        );

        GM_addStyle('.plus {'
            + 'color: #66CD00;}'
        );

        GM_addStyle('.minus {'
            + 'color: #FF2F2F;}'
        );

        GM_addStyle('.close {'
            + 'color: #FFA500;}'
        );

        GM_addStyle('.powerLevelScouter {'
                + 'width: 25px;}'
            );
        GM_addStyle('#leagues .league_content .league_table .data-list .data-row .data-column[column="nickname"].clubmate .nickname { color: #00CC00 }');
    }

    static addChangeTeamButton() {

        $('.league_buttons_block').append(getGoToChangeTeamButton());
        
        GM_addStyle('#leagues .league_content .league_buttons {'
            + 'max-width: none;}'
        );
        GM_addStyle('#leagues .league_content .league_buttons .league_buttons_block {'
            + 'width: auto;}'
        );
    }

    
    static displayOppoSimuOnButton(id_fighter, simu, force=0) {
        const opponentGoButton = $('a[href*="id_opponent='+id_fighter+'"]');
        if((opponentGoButton.length <= 0 || $('.powerLevelScouter',opponentGoButton).length > 0) && !force) {
            return;
        }
        // logHHAuto('powerLevelScouter not present adding it ' + id_fighter);

        const percentage = nRounding(100*simu.win, 2, -1);
        const points = nRounding(simu.expectedValue, 1, -1);
        const pointText = `${percentage}% (${points})` +
        `<span style="margin:0;display:none;" id="HHPowerCalcScore">${percentage}</span>
        <span style="margin:0;display:none;" id="HHPowerCalcPoints">${points}</span>`;
        // const opponentRow = opponentGoButton.parent().parent();
        opponentGoButton.html(`<div class="matchRatingNew ${simu.scoreClass}"><img class="powerLevelScouter" src=${getHHScriptVars("powerCalcImages")[simu.scoreClass]}>${pointText}</div>`);
    }

    static getEnergy() {
        return Number(getHHVars('Hero.energies.challenge.amount'));
    }

    static getEnergyMax() {
        return Number(getHHVars('Hero.energies.challenge.max_regen_amount'));
    }

    static isAutoLeagueActivated(){
        return StorageHelper_getStoredValue("HHAuto_Setting_autoLeagues") === "true" && getHHVars('Hero.infos.level')>=20;
    }

    static isTimeToFight(){
        const energyAboveThreshold = LeagueHelper.getEnergy() > Number(StorageHelper_getStoredValue("HHAuto_Setting_autoLeaguesThreshold"));
        const paranoiaSpending = LeagueHelper.getEnergy() > 0 && Number(checkParanoiaSpendings('challenge')) > 0;
        const needBoosterToFight = StorageHelper_getStoredValue("HHAuto_Setting_autoLeaguesBoostedOnly") === "true";
        const haveBoosterEquiped = Booster.haveBoosterEquiped();

        if(checkTimer('nextLeaguesTime') && energyAboveThreshold && needBoosterToFight && !haveBoosterEquiped) {
            LogUtils_logHHAuto('Time for league but no booster equipped');
        }

        return (checkTimer('nextLeaguesTime') && energyAboveThreshold && (needBoosterToFight && haveBoosterEquiped || !needBoosterToFight)) || paranoiaSpending;
    }
    
    static moduleSimLeague() {

        LeagueHelper.moduleSimLeagueHideBeatenOppo();
        if($('.change_team_container').length <= 0) {
            LeagueHelper.addChangeTeamButton();
        }

        if ($("#popup_message_league").length >0 || StorageHelper_getStoredValue("HHAuto_Setting_leagueListDisplayPowerCalc") !== "true")
        {
            return;
        }

        const opponentButtons = $('a.go_pre_battle.blue_button_L');
        const opponentSim = $("div.matchRatingNew img.powerLevelScouter");
        const allOpponentsSimDisplayed = (opponentSim.length >= opponentButtons.length);
        const Hero=getHero();


        let SimPower = function()
        {
            if (allOpponentsSimDisplayed)
            {
                // logHHAuto("Stop simu");
                return;
            }

            const opponents_list = getHHVars("opponents_list");
            if(!opponents_list)
            {
                LogUtils_logHHAuto('ERROR: Can\'t find opponent list');
                return;
            }
            let heroFighter = opponents_list.filter(obj => {
                return obj.player.id_fighter == Hero.infos.id;
            });
            if(heroFighter.length > 0) heroFighter = heroFighter[0].player;
            else return;

            /*const canFight = function(opponent) {
                // remove match_history after w32 update
                const matchs = opponent.match_history ? opponent.match_history[opponent.player.id_fighter]: opponent.match_history_sorting[opponent.player.id_fighter];
                return matchs && matchs.length === 3 && (matchs[0] == null || matchs[1] == null || matchs[2] == null)
            }*/

            const containsSimuScore = function(opponents) {
                return $('a[href*="id_opponent='+opponents.player.id_fighter+'"] .matchRatingNew').length > 0;
            }


            const SimPowerOpponent = function(heroFighter, opponents) {

                const opponentData = opponents.player;
                let leaguePlayers = LeagueHelper.getLeaguePlayersData(heroFighter, opponentData);
                //console.log("HH simuFight",JSON.stringify(leaguePlayers.player),JSON.stringify(leaguePlayers.opponent));
                let simu = calculateBattleProbabilities(leaguePlayers.player, leaguePlayers.opponent);

                const oppoPoints = simu.points;
                let expectedValue = 0;
                for (let i=25; i>=3; i--) {
                    if (oppoPoints[i]) {
                        expectedValue += i*oppoPoints[i];
                    }
                }
                simu.expectedValue = expectedValue;

                LeagueHelper.displayOppoSimuOnButton(opponentData.id_fighter, simu);
            }

            for(let opponentIndex = 0;opponentIndex < opponents_list.length ; opponentIndex++)
            {
                let opponents = opponents_list[opponentIndex];
                if (LeagueHelper.numberOfFightAvailable(opponents) > 0 && !containsSimuScore(opponents)) {
                    SimPowerOpponent(heroFighter, opponents); 
                }
            }
            
            //CSS
        }

        SimPower();

        let listUpdateStatus='<div style="position: absolute;left: 650px;top: 14px;width:100px;" class="tooltipHH" id="HHListUpdate"></div>';
        if (document.getElementById("HHListUpdate") === null) {
            $(".leagues_middle_header_script").append(listUpdateStatus);
        }

        if(allOpponentsSimDisplayed || opponentSim.length <=1) {
            let buttonLaunchList='<span class="tooltipHHtext">'+getTextForUI("RefreshOppoList","tooltip")+'</span><label style="width:100%;" class="myButton" id="RefreshOppoList">'+getTextForUI("RefreshOppoList","elementText")+'</label>';
            if (document.getElementById("RefreshOppoList") === null)
            {
                $("#HHListUpdate").html('').append(buttonLaunchList);
                document.getElementById("RefreshOppoList").addEventListener("click", function()
                {
                    document.getElementById("RefreshOppoList").remove();
                    $('a[href*="id_opponent"]').each(function () {
                        $(this).html('Go'); // TODO translate
                    });
                    opponentsTempPowerList = {expirationDate:new Date().getTime() + getHHScriptVars("LeagueListExpirationSecs") * 1000,opponentsList:{}};
                    deleteStoredValue("HHAuto_Temp_LeagueTempOpponentList");
                });
            }
        } else {
            $("#HHListUpdate").html('Building:' + opponentSim.length +"/"+ opponentButtons.length);
        }

        let buttonSortList='<div style="position: absolute;left: 780px;top: 14px;width:75px;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("sortPowerCalc","tooltip")+'</span><label style="width:100%;" class="myButton" id="sortPowerCalc">'+getTextForUI("sortPowerCalc","elementText")+'</label></div>';
        const league_table = $('.league_content .data-list');
        if (document.getElementById("sortPowerCalc") === null && $('.matchRatingNew',league_table).length >0)
        {
            $('.leagues_middle_header_script').append(buttonSortList);
            document.getElementById("sortPowerCalc").addEventListener("click", function ()
            {
                let items = $('.data-row.body-row:visible',league_table).map((i, el) => el).toArray();
                items.sort(function(a, b)
                        {
                    //console.log($('#HHPowerCalcScore',$(a)));
                    const score_a = $('#HHPowerCalcScore',$(a)).length===0?0:Number($('#HHPowerCalcScore',$(a))[0].innerText);
                    const score_b = $('#HHPowerCalcScore',$(b)).length===0?0:Number($('#HHPowerCalcScore',$(b))[0].innerText);
                    const points_a = $('#HHPowerCalcPoints',$(a)).length===0?0:Number($('#HHPowerCalcPoints',$(a))[0].innerText);
                    const points_b = $('#HHPowerCalcPoints',$(b)).length===0?0:Number($('#HHPowerCalcPoints',$(b))[0].innerText);
                    //console.log(score_a,score_b,points_a,points_b);
                    if (score_b === score_a)
                    {
                        return points_b-points_a;
                    }
                    else
                    {
                        return score_b-score_a;
                    }
                });

                for (let item in items)
                {
                    $(items[item]).detach();
                    league_table.append(items[item]);
                }
                $('.league_content .league_table').animate({scrollTop: 0});
            });
        }
    }

    static moduleSimLeagueHideBeatenOppo()
    {
        const beatenOpponents ='<div style="position: absolute;left: 190px;top: 14px;width:100px;"  class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("HideBeatenOppo","tooltip")+'</span><label style="width:100%;" class="myButton" id="HideBeatenOppo">'+getTextForUI("HideBeatenOppo","elementText")+'</label></div>';
        if (
            document.getElementById("beaten_opponents") === null // button from HH OCD script
            &&  document.getElementById("HideBeatenOppo") === null
        )
        {
            if($(".leagues_middle_header_script").length == 0) {
                $('#tower_of_fame .tabs').append('<div class="leagues_middle_header_script"></div>');
                
                GM_addStyle('.leagues_middle_header_script {'
                    + 'display: flow-root;'
                    + 'margin-top: 4px;}'
                );
            }
            function removeBeatenOpponents() {
                var board = document.getElementsByClassName("data-list")[0];
                if(!board) return;
                var opponents = board.getElementsByClassName("data-row body-row");
                for (var i=0; i<opponents.length; i++) {
                    try {
                        if (!opponents[i].className.includes("player-row")) {
                            let hide = true;
                            let results = $(opponents[i]).find('div[column = "match_history"], div[column = "match_history_sorting"]')[0].children; // remove match_history after w32 update
                            for (let j=0; j<results.length; j++) {
                                if (results[j].className == "result ") hide = false;
                            }
                            if (hide) opponents[i].style.display="none";
                        }
                    } catch(e) {}
                }
                $('#leagues .league_content .league_table').getNiceScroll().resize()
            }

            function displayBeatenOpponents() {
                var board = document.getElementsByClassName("data-list")[0];
                if(!board) return;
                var opponents = board.getElementsByClassName("data-row body-row");
                for (var i=0; i<opponents.length; i++) {
                    try {
                        if (!opponents[i].className.includes("player-row")) {
                            let hide = true;
                            let results = $(opponents[i]).find('div[column = "match_history"], div[column = "match_history_sorting"]')[0].children; // remove match_history after w32 update
                            for (let j=0; j<results.length; j++) {
                                if (results[j].className == "result ") hide = false;
                            }
                            if (hide) opponents[i].style.display="";
                        }
                    } catch(e) {}
                }
                $('#leagues .league_content .league_table').getNiceScroll().resize()
            }

            $(".leagues_middle_header_script").append(beatenOpponents);

            let hideBeatenOppo = StorageHelper_getStoredValue("HHAuto_Temp_hideBeatenOppo");
            if (!hideBeatenOppo) {
                hideBeatenOppo = 0;
                StorageHelper_setStoredValue("HHAuto_Temp_hideBeatenOppo", hideBeatenOppo);
            }

            if (hideBeatenOppo == 1) {
                removeBeatenOpponents();
                $('#HideBeatenOppo').html(getTextForUI("display","elementText"));
            }
            else {
                $('#HideBeatenOppo').html(getTextForUI("HideBeatenOppo","elementText"));
            }

            document.getElementById("HideBeatenOppo").addEventListener('click', function(){
                if (hideBeatenOppo == 0) {
                    removeBeatenOpponents();
                    hideBeatenOppo = 1;
                    StorageHelper_setStoredValue("HHAuto_Temp_hideBeatenOppo", hideBeatenOppo);
                    $('#HideBeatenOppo').html(getTextForUI("display","elementText"));
                }
                else {
                    displayBeatenOpponents();
                    hideBeatenOppo = 0;
                    StorageHelper_setStoredValue("HHAuto_Temp_hideBeatenOppo", hideBeatenOppo);
                    $('#HideBeatenOppo').html(getTextForUI("HideBeatenOppo","elementText"));
                }
            });

            let sort_by = document.querySelectorAll('.data-column.head-column');
            for (var sort of sort_by) {
                sort.addEventListener('click', function() {
                    if (hideBeatenOppo == 1) removeBeatenOpponents();
                });
            }
        }
    }
    
    static getLeaguePlayersData(inHeroLeaguesData, inPlayerLeaguesData)
    {
        const {
            chance: playerCrit,
            damage: playerAtk,
            defense: playerDef,
            remaining_ego: playerEgo,
            team: playerTeam
        } = inHeroLeaguesData;
        let playerElements = playerTeam.theme_elements;
        let playerSynergies = playerTeam.synergies;
        if(!playerSynergies) {
            const playerSynergyDataJSON = $('.player-row .button_team_synergy').attr('synergy-data');
            playerSynergies = JSON.parse(playerSynergyDataJSON);
        }
        if (!playerElements || playerElements.length === 0) {
            const playerTeamMemberElements = [0,1,2,3,4,5,6].map(key => playerTeam.girls[key].girl.element_data.type);
            playerElements = calculateThemeFromElements(playerTeamMemberElements);
        }
        const playerBonuses = {
            critDamage: playerSynergies.find(({element: {type}})=>type==='fire').bonus_multiplier,
            critChance: playerSynergies.find(({element: {type}})=>type==='stone').bonus_multiplier,
            defReduce: playerSynergies.find(({element: {type}})=>type==='sun').bonus_multiplier,
            healOnHit: playerSynergies.find(({element: {type}})=>type==='water').bonus_multiplier
        };

        const {
            chance: opponentCrit,
            damage: opponentAtk,
            defense: opponentDef,
            remaining_ego: opponentEgo,
            team: opponentTeam
        } = inPlayerLeaguesData

        const opponentTeamMemberElements = [];
        [0,1,2,3,4,5,6].forEach(key => {
            const teamMember = opponentTeam[key]
            if (teamMember && teamMember.element) {
                opponentTeamMemberElements.push(teamMember.element)
            }
        })
        const opponentElements = opponentTeam.theme_elements.map(({type}) => type);
        const opponentBonuses = calculateSynergiesFromTeamMemberElements(opponentTeamMemberElements)
        const dominanceBonuses = calculateDominationBonuses(playerElements, opponentElements)

        const player = {
            hp: playerEgo * (1 + dominanceBonuses.player.ego),
            dmg: (playerAtk * (1 + dominanceBonuses.player.attack)) - (opponentDef * (1 - playerBonuses.defReduce)),
            critchance: calculateCritChanceShare(playerCrit, opponentCrit) + dominanceBonuses.player.chance + playerBonuses.critChance,
            bonuses: playerBonuses
        };
        const opponent = {
            hp: opponentEgo * (1 + dominanceBonuses.opponent.ego),
            dmg: (opponentAtk * (1 + dominanceBonuses.opponent.attack)) - (playerDef * (1 - opponentBonuses.defReduce)),
            critchance: calculateCritChanceShare(opponentCrit, playerCrit) + dominanceBonuses.opponent.chance + opponentBonuses.critChance,
            name: inPlayerLeaguesData.nickname,
            bonuses: opponentBonuses
        };
        return {player:player, opponent:opponent, dominanceBonuses:dominanceBonuses}
    }   

    static getLeagueOpponentListData(isFirstCall = true)
    {
        let Data=[];
        let opponent_id;
        let fightButton;

        const hasHHBdsmChangeBefore = $('.data-column[column="power"] .matchRating').length > 0;
        if (hasHHBdsmChangeBefore) LogUtils_logHHAuto('HH++ BDSM detected');
        const tableRow = $(".data-list .data-row.body-row");

        var getPowerOrPoints = function (hasHHBdsmChangeBefore, oppoRow)
        {
            if(hasHHBdsmChangeBefore) {
                // HH++ BDSM script exist
                // As power information is removed and replaced by simulation score, we need to use the score
                return Number($('.data-column[column="power"] .matchRating-expected .matchRating-value', oppoRow).text().replace(',', '.'));
            } else {
                return parsePrice($('.data-column[column="power"]', oppoRow).text());
            }
        }

        LogUtils_logHHAuto('Number of player in league:' + tableRow.length);
        LogUtils_logHHAuto('Number of opponent not fought in league:' + $('.data-list .data-row.body-row a').length);

        tableRow.each(function()
        {
            fightButton = $('a', $(this));
            if(fightButton.length > 0) {
                opponent_id = queryStringGetParam(new URL(fightButton.attr("href"),window.location.origin).search, 'id_opponent');
                let opponnent = {
                    opponent_id: opponent_id,
                    rank:  Number($('.data-column[column="place"]', $(this)).text()),
                    nickname: $('.nickname', $(this)).text(),
                    level: Number($('.data-column[column="level"]', $(this)).text()),
                    power: getPowerOrPoints(hasHHBdsmChangeBefore, $(this)),
                    player_league_points: Number($('.data-column[column="player_league_points"]', $(this)).text().replace(/\D/g, '')),
                    simuPoints :  Number($('#HHPowerCalcPoints', $(this)).text()), // not filled yet when building this list
                    stats: {}, // fill stats if needed
                    nb_boosters: $('.boosters', $(this)).children().length,
                };
                Data.push(opponnent);
            }
        });
        const hasHHBdsmChangeAfter = $('.data-column[column="power"] .matchRating').length > 0;
        if(!hasHHBdsmChangeBefore && hasHHBdsmChangeAfter) {
            LogUtils_logHHAuto('HH++ BDSM edit table during computation');
            if(isFirstCall) {
                LogUtils_logHHAuto('Try again');
                return LeagueHelper.getLeagueOpponentListData(false);
            }else {
                LogUtils_logHHAuto('Already called twice, stop');
                return [];
            }
        }
        if(hasHHBdsmChangeBefore) {
            // HH++ BDSM script exist
            Data.sort((a,b) => (b.power > a.power) ? 1 : ((a.power > b.power) ? -1 : 0)); // sort by higher score
        }else {
            Data.sort((a,b) => (a.power > b.power) ? 1 : ((b.power > a.power) ? -1 : 0)); // sort by lower power
        }
        return Data;
    }

    static doLeagueBattle() {
        //logHHAuto("Performing auto leagues.");
        // Confirm if on correct screen.
        const currentPower = LeagueHelper.getEnergy();
        const maxLeagueRegen = LeagueHelper.getEnergyMax();
        const leagueThreshold = Number(StorageHelper_getStoredValue("HHAuto_Setting_autoLeaguesThreshold"));
        const autoLeaguesThreeFights = StorageHelper_getStoredValue("HHAuto_Setting_autoLeaguesThreeFights") === "true";
        let leagueScoreSecurityThreshold = StorageHelper_getStoredValue("HHAuto_Setting_autoLeaguesSecurityThreshold");
        if (leagueScoreSecurityThreshold) {
            leagueScoreSecurityThreshold = Number(leagueScoreSecurityThreshold);
        }else{
            leagueScoreSecurityThreshold = 40;
        }
        // const enoughChallengeForLeague = currentLeagueEnergy > leaguesThreshold && !autoLeaguesThreeFights
        // ||  (currentLeagueEnergy >= (leaguesThreshold+3) || currentLeagueEnergy >= maxLeague && currentLeagueEnergy > leaguesThreshold) && autoLeaguesThreeFights;
        var ltime;

        var page = getPage();
        const Hero=getHero();
        if(page===getHHScriptVars("pagesIDLeagueBattle"))
        {
            // On the battle screen.
            // CrushThemFights(); // TODO ??? // now managed by doBattle
        }
        else if(page === getHHScriptVars("pagesIDLeaderboard"))
        {
            LogUtils_logHHAuto("On leaderboard page.");
            if (StorageHelper_getStoredValue("HHAuto_Setting_autoLeaguesCollect") === "true")
            {
                if ($('#leagues .forced_info button[rel="claim"]').length >0)
                {
                    $('#leagues .forced_info button[rel="claim"]').click(); //click reward
                    gotoPage(getHHScriptVars("pagesIDLeaderboard"))
                }
            }
            //logHHAuto('ls! '+$('h4.leagues').length);
            //$('h4.leagues').each(function(){this.click();}); // ???

            if(currentPower < 1)
            {
                LogUtils_logHHAuto("No power for leagues.");
                //prevent paranoia to wait for league
                StorageHelper_setStoredValue("HHAuto_Temp_paranoiaLeagueBlocked", "true");
                setTimer('nextLeaguesTime',getHHVars('Hero.energies.challenge.next_refresh_ts')+10);
                return;
            }

            LogUtils_logHHAuto('parsing enemies');
            var Data=LeagueHelper.getLeagueOpponentListData();
            if (Data.length==0)
            {
                ltime=35*60;
                LogUtils_logHHAuto('No valid targets!');
                //prevent paranoia to wait for league
                StorageHelper_setStoredValue("HHAuto_Temp_paranoiaLeagueBlocked", "true");
                setTimer('nextLeaguesTime',ltime);
            }
            else
            {
                var getPlayerCurrentLevel = LeagueHelper.getLeagueCurrentLevel();

                if (isNaN(getPlayerCurrentLevel))
                {
                    LogUtils_logHHAuto("Could not get current Rank, stopping League.");
                    //prevent paranoia to wait for league
                    StorageHelper_setStoredValue("HHAuto_Temp_paranoiaLeagueBlocked", "true");
                    setTimer('nextLeaguesTime',Number(30*60)+1);
                    return;
                }
                var currentRank = Number($('.data-list .data-row.body-row.player-row .data-column[column="place"]').text());
                var currentScore = Number($('.data-list .data-row.body-row.player-row .data-column[column="player_league_points"]').text().replace(/\D/g, ''));
                let leagueTargetValue = Number(StorageHelper_getStoredValue("HHAuto_Setting_autoLeaguesSelectedIndex"))+1;
                if (leagueTargetValue < Number(getPlayerCurrentLevel))
                {
                    var totalOpponents = Number($('.data-list .data-row.body-row').length)+1;
                    var maxDemote = 0;
                    if (screen.width < 1026)
                    {
                        totalOpponents = totalOpponents+1;
                    }
                    var rankDemote = totalOpponents - 14;
                    if (currentRank > (totalOpponents - 15))
                    {
                        rankDemote = totalOpponents - 15;
                    }
                    LogUtils_logHHAuto("Current league above target ("+Number(getPlayerCurrentLevel)+"/"+leagueTargetValue+"), needs to demote. max rank : "+rankDemote+"/"+totalOpponents);
                    let getRankDemote = $(".data-list .data-row.body-row .data-column[column='place']:contains("+rankDemote+")").filter(function()
                                                                                                                {
                        return Number($(this).text().trim()) === rankDemote;
                    });
                    if (getRankDemote.length > 0 )
                    {
                        maxDemote = Number( $(".data-column[column='player_league_points']", getRankDemote.parent()).text().replace(/\D/g, ''));
                    }
                    else
                    {
                        maxDemote = 0;
                    }

                    LogUtils_logHHAuto("Current league above target ("+Number(getPlayerCurrentLevel)+"/"+leagueTargetValue+"), needs to demote. Score should not be higher than : "+maxDemote);
                    if ( currentScore + leagueScoreSecurityThreshold >= maxDemote )
                    {
                        let league_end = LeagueHelper.getLeagueEndTime();
                        if (league_end <= (60*60)) {
                            LogUtils_logHHAuto("Can't do league as could go above demote, as last hour setting timer to 5 mins"); 
                            setTimer('nextLeaguesTime',Number(5*60)+1);
                        } else {
                            LogUtils_logHHAuto("Can't do league as could go above demote, setting timer to 30 mins");
                            setTimer('nextLeaguesTime',Number(30*60)+1);
                            //prevent paranoia to wait for league
                            StorageHelper_setStoredValue("HHAuto_Temp_paranoiaLeagueBlocked", "true");
                        }
                        gotoPage(getHHScriptVars("pagesIDHome"));
                        return;
                    }
                }

                var maxStay = -1
                var maxLeague = $("div.tier_icons img").length;
                if ( maxLeague === undefined )
                {
                    maxLeague = Leagues.length;
                }

                if (leagueTargetValue === Number(getPlayerCurrentLevel) && leagueTargetValue < maxLeague)
                {
                    var rankStay = 16;
                    if (currentRank > 15)
                    {
                        rankStay = 15;
                    }
                    LogUtils_logHHAuto("Current league is target ("+Number(getPlayerCurrentLevel)+"/"+leagueTargetValue+"), needs to stay. max rank : "+rankStay);
                    let getRankStay = $(".data-list .data-row.body-row .data-column[column='place']:contains("+rankStay+")").filter(function()
                                                                                                            {
                        return Number($(this).text().trim()) === rankStay;
                    });
                    if (getRankStay.length > 0 )
                    {
                        maxStay = Number( $(".data-column[column='player_league_points']", getRankStay.parent()).text().replace(/\D/g, ''));
                    }
                    else
                    {
                        maxStay = 0;
                    }

                    LogUtils_logHHAuto("Current league is target ("+Number(getPlayerCurrentLevel)+"/"+leagueTargetValue+"), needs to stay. Score should not be higher than : "+maxStay);
                    if ( currentScore + leagueScoreSecurityThreshold >= maxStay && StorageHelper_getStoredValue("HHAuto_Setting_autoLeaguesAllowWinCurrent") !== "true")
                    {
                        LogUtils_logHHAuto("Can't do league as could go above stay, setting timer to 30 mins");
                        setTimer('nextLeaguesTime',Number(30*60)+1);
                        //prevent paranoia to wait for league
                        StorageHelper_setStoredValue("HHAuto_Temp_paranoiaLeagueBlocked", "true");
                        gotoPage(getHHScriptVars("pagesIDHome"));
                        return;
                    }
                }
                LogUtils_logHHAuto(Data.length+' valid targets!');
                StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
                LogUtils_logHHAuto("setting autoloop to false");
                LogUtils_logHHAuto("Hit?" );
                // if (getStoredValue("HHAuto_Setting_autoLeaguesPowerCalc") == "true")
                if (false) // TODO Fix power calc if needed
                { var oppoID; }
                else
                {
                    LogUtils_logHHAuto("Going to fight " + Data[0].nickname + "(" + Data[0].opponent_id + ") with power " + Data[0].power);
                    // change referer
                    window.history.replaceState(null, '', '/leagues-pre-battle.html?id_opponent='+Data[0].opponent_id);

                    const opponents_list = getHHVars("opponents_list");
                    const opponentDataFromList = opponents_list.filter(obj => {
                        return obj.player.id_fighter == Data[0].opponent_id;
                    });

                    let numberOfFightAvailable = 0;
                    if(opponentDataFromList && opponentDataFromList.length> 0)
                        numberOfFightAvailable = LeagueHelper.numberOfFightAvailable(opponentDataFromList[0])
                    else
                        LogUtils_logHHAuto('ERROR opponent ' + Data[0].opponent_id + ' not found in JS list');

                    let numberOfBattle = 1;
                    if(numberOfFightAvailable > 1 && currentPower >= (numberOfFightAvailable + leagueThreshold)){
                        if(maxStay > 0 && currentScore + ( numberOfFightAvailable * leagueScoreSecurityThreshold) >= maxStay) LogUtils_logHHAuto('Can\'t do '+numberOfFightAvailable+' fights in league as could go above stay');
                        else numberOfBattle = numberOfFightAvailable;
                    }
                    LogUtils_logHHAuto("Going to fight " + numberOfBattle + " times (Number fights available from opponent:" + numberOfFightAvailable + ")");

                    if(numberOfBattle === 1) {
                        gotoPage(getHHScriptVars("pagesIDLeagueBattle"),{number_of_battles:1,id_opponent:Data[0].opponent_id});
                    } else {
                        var params1 = {
                            action: "do_battles_leagues",
                            id_opponent: Data[0].opponent_id,
                            number_of_battles: numberOfBattle
                        };
                        hh_ajax(params1, function(data) {
                            // change referer
                            window.history.replaceState(null, '', '/tower-of-fame.html');

                            RewardHelper.closeRewardPopupIfAny();

                            // gotoPage(getHHScriptVars("pagesIDLeaderboard"));
                            location.reload();
                            Hero.updates(data.hero_changes);
                        });
                    }
                }
            }
        }
        else
        {
            // Switch to the correct screen
            LogUtils_logHHAuto("Switching to leagues screen.");
            gotoPage(getHHScriptVars("pagesIDLeaderboard"));
            return;
        }
    }

    static getLeagueOpponentId(opponentsIDList,force=false)
    {
        var opponentsPowerList = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_LeagueOpponentList"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_LeagueOpponentList")):{expirationDate:0,opponentsList:{}};
        var opponentsTempPowerList = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_LeagueTempOpponentList"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_LeagueTempOpponentList")):{expirationDate:0,opponentsList:{}};
        var opponentsIDs= opponentsIDList;
        var oppoNumber = opponentsIDList.length;
        var DataOppo={};
        var maxTime = 1.6;

        if (Object.keys(opponentsPowerList.opponentsList).length === 0 ||  opponentsPowerList.expirationDate < new Date() || force)
        {
            sessionStorage.removeItem("HHAuto_Temp_LeagueOpponentList");
            if (Object.keys(opponentsTempPowerList.opponentsList).length > 0 && opponentsTempPowerList.expirationDate > new Date())
            {
                LogUtils_logHHAuto("Opponents list already started, continuing.");

                for (var i of Object.keys(opponentsTempPowerList.opponentsList))
                {
                    //removing oppo no longer in list
                    if (opponentsIDList.indexOf(i.toString()) !== -1)
                    {
                        //console.log(opponentsTempPowerList[i]);
                        DataOppo[i]=opponentsTempPowerList.opponentsList[i];
                        //console.log(JSON.stringify(DataOppo));
                        //console.log('removed');
                    }
                    //removing already done in opponentsIDList
                    //console.log(opponentsIDList.length)
                    opponentsIDList = opponentsIDList.filter(item => Number(item) !== Number(i));
                    //console.log(opponentsIDList.length)
                }
                //console.log(JSON.stringify(DataOppo));
                sessionStorage.removeItem("HHAuto_Temp_LeagueTempOpponentList");
            }
            else
            {
                LogUtils_logHHAuto("Opponents list not found or expired. Fetching all opponents.");
            }



            //if paranoia not is time's up and not in paranoia spendings
            if (!checkTimer("paranoiaSwitch"))
            {
                let addedTime=opponentsIDList.length*maxTime;
                LogUtils_logHHAuto("Adding time to burst to cover building list : +"+addedTime+"secs");
                addedTime += getSecondsLeft("paranoiaSwitch");
                setTimer("paranoiaSwitch",addedTime);
            }
            getOpponents();
            return -1;
        }
        else
        {
            LogUtils_logHHAuto("Found valid opponents list, using it.")
            return FindOpponent(opponentsPowerList,opponentsIDs);
        }

        function getOpponents()
        {
            //logHHAuto('Need to click: '+ToClick.length);
            var findText = 'playerLeaguesData = ';
            let league_end = LeagueHelper.getLeagueEndTime();
            let maxLeagueListDurationSecs = getHHScriptVars("LeagueListExpirationSecs");
            if (league_end !== -1 && league_end < maxLeagueListDurationSecs)
            {
                maxLeagueListDurationSecs = league_end;
            }
            if (maxLeagueListDurationSecs <1)
            {
                maxLeagueListDurationSecs = 1;
            }
            // TODO fixme
            let listExpirationDate =Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_LeagueTempOpponentList"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_LeagueTempOpponentList")).expirationDate:new Date().getTime() + maxLeagueListDurationSecs * 1000;
            if (opponentsIDList.length>0)
            {
                //logHHAuto('getting data for opponent : '+opponentsIDList[0]);
                //logHHAuto({log:"Opponent list",opponentsIDList:opponentsIDList});
                $.post('/ajax.php',
                    {
                    action: 'leagues_get_opponent_info',
                    opponent_id: opponentsIDList[0]
                },
                    function(data)
                    {
                    //logHHAuto({log:"data for oppo",data:data});
                    var opponentData = data.player;
                    //console.log(opponentData);
                    const players=LeagueHelper.getLeaguePlayersData(getHHVars("hero_fighter"),opponentData);

                    //console.log(player,opponent);
                    let simu = calculateBattleProbabilities(players.player, players.opponent);
                    //console.log(opponent);
                    //console.log(simu);
                    //matchRating=customMatchRating(simu);

                    //matchRating = Number(matchRating.substring(1));
                    //logHHAuto('matchRating:'+matchRating);
                    //if (!isNaN(matchRating))
                    //{
                    DataOppo[Number(opponentData.id_fighter)]=simu;
                    StorageHelper_setStoredValue("HHAuto_Temp_LeagueTempOpponentList", JSON.stringify({expirationDate:listExpirationDate,opponentsList:DataOppo}));
                    //}
                    //DataOppo.push(JSON.parse(data.html.substring(data.html.indexOf(findText)+findText.length,data.html.lastIndexOf(';'))));

                });

                opponentsIDList.shift();
                LeagueHelper.LeagueUpdateGetOpponentPopup(Object.keys(DataOppo).length+'/'+oppoNumber, toHHMMSS((oppoNumber-Object.keys(DataOppo).length)*maxTime));
                setTimeout(getOpponents,randomInterval(800,maxTime*1000));

                window.top.postMessage({ImAlive:true},'*');
            }
            else
            {
                //logHHAuto('nothing to click, checking data');

                //logHHAuto(DataOppo);
                sessionStorage.removeItem("HHAuto_Temp_LeagueTempOpponentList");
                StorageHelper_setStoredValue("HHAuto_Temp_LeagueOpponentList", JSON.stringify({expirationDate:listExpirationDate,opponentsList:DataOppo}));
                LeagueHelper.LeagueClearDisplayGetOpponentPopup();
                //doLeagueBattle();
                LogUtils_logHHAuto("Building list finished, putting autoloop back to true.");
                StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "true");
                setTimeout(autoLoop, Number(StorageHelper_getStoredValue("HHAuto_Temp_autoLoopTimeMili")));
            }
        }

        function FindOpponent(opponentsPowerList,opponentsIDList)
        {
            var maxScore = -1;
            var IdOppo = -1;
            var OppoScore;
            LogUtils_logHHAuto('finding best chance opponent in '+opponentsIDList.length);
            for (var oppo of opponentsIDList)
            {
                //logHHAuto({Opponent:oppo,OppoGet:Number(opponentsPowerList.get(oppo)),maxScore:maxScore});
                const oppoSimu = opponentsPowerList.opponentsList[Number(oppo)];
                if (oppoSimu === undefined)
                {
                    continue;
                }
                OppoScore = Number(oppoSimu.win);
                if (( maxScore == -1 || OppoScore > maxScore ) && !isNaN(OppoScore))
                {

                    maxScore = OppoScore;
                    IdOppo = oppo;
                }
            }
            LogUtils_logHHAuto("highest score opponent : "+IdOppo+'('+nRounding(100*maxScore, 2, -1)+'%)');
            return IdOppo;
        }
        return true;
    }

    

    static LeagueDisplayGetOpponentPopup(numberDone,remainingTime)
    {
        $("#leagues #leagues_middle").prepend('<div id="popup_message_league" class="HHpopup_message" name="popup_message_league" ><a id="popup_message_league_close" class="close">&times;</a>'+getTextForUI("OpponentListBuilding","elementText")+' : <br>'+numberDone+' '+getTextForUI("OpponentParsed","elementText")+' ('+remainingTime+')</div>');
        document.getElementById("popup_message_league_close").addEventListener("click", function()
                                                                            {
            location.reload();
        });
    }

    static LeagueClearDisplayGetOpponentPopup()
    {
        $("#popup_message_league").each(function(){this.remove();});
    }

    static LeagueUpdateGetOpponentPopup(numberDone,remainingTime)
    {
        LeagueHelper.LeagueClearDisplayGetOpponentPopup();
        LeagueHelper.LeagueDisplayGetOpponentPopup(numberDone,remainingTime);
    }
}
;// CONCATENATED MODULE: ./src/Module/Market.js



class Market {
    static doShopping() {
        try
        {
            //logHHAuto("Go shopping");
            const Hero=getHero();
            var MS='carac'+getHHVars('Hero.infos.class');
            var SS1='carac'+(getHHVars('Hero.infos.class')%3+1);
            var SS2='carac'+((getHHVars('Hero.infos.class')+1)%3+1);
            var money=getHHVars('Hero.currencies.soft_currency');
            var kobans=getHHVars('Hero.currencies.hard_currency');


            if (StorageHelper_getStoredValue("HHAuto_Temp_storeContents") === undefined )
            {
                if (! Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_storeContents")) )
                {
                    LogUtils_logHHAuto("Catched error : Could not parse store content.");
                }
                StorageHelper_setStoredValue("HHAuto_Temp_charLevel",0);
                return;
            }

            if (StorageHelper_getStoredValue("HHAuto_Temp_haveAff") === undefined || StorageHelper_getStoredValue("HHAuto_Temp_haveExp") === undefined)
            {
                StorageHelper_setStoredValue("HHAuto_Temp_charLevel", 0);
                return;
            }
            var shop=JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_storeContents"));

            var Exp=Number(StorageHelper_getStoredValue("HHAuto_Setting_autoExp"));
            var Aff=Number(StorageHelper_getStoredValue("HHAuto_Setting_autoAff"));
            var MaxAff=Number(StorageHelper_getStoredValue("HHAuto_Setting_maxAff"));
            var MaxExp=Number(StorageHelper_getStoredValue("HHAuto_Setting_maxExp"));
            var HaveAff=Number(StorageHelper_getStoredValue("HHAuto_Temp_haveAff"));
            var HaveExp=Number(StorageHelper_getStoredValue("HHAuto_Temp_haveExp"));
            var HaveBooster=JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_haveBooster"));
            var MaxBooster=Number(StorageHelper_getStoredValue("HHAuto_Setting_maxBooster"));
            let Was;

            var boosterFilter = StorageHelper_getStoredValue("HHAuto_Setting_autoBuyBoostersFilter").split(";");
            if (StorageHelper_getStoredValue("HHAuto_Setting_autoBuyBoosters") ==="true" && boosterFilter.length > 0)
            {
                Was=shop[1].length;

                for (var boost of boosterFilter)
                {
                    const boosterOwned = HaveBooster.hasOwnProperty(boost) ? Number(HaveBooster[boost]) : 0;
                    for (var n1=shop[1].length-1;n1>=0;n1--)
                    {
                        if (kobans>=Number(StorageHelper_getStoredValue("HHAuto_Setting_kobanBank"))+Number(shop[1][n1].price_buy) && shop[1][n1].item.currency == "hc" && shop[1][n1].item.identifier == boost && (shop[1][n1].item.rarity=='legendary' || shop[1][n1].item.rarity=='mythic') && boosterOwned < MaxBooster)
                        {
                            LogUtils_logHHAuto({log:'wanna buy ',object:shop[1][n1],owning: boosterOwned});
                            if (kobans>=Number(shop[1][n1].price_buy))
                            {
                                LogUtils_logHHAuto({log:'Buying : ',object:shop[1][n1]});
                                // change referer
                                window.history.replaceState(null, '', '/shop.html');
                                kobans-=Number(shop[1][n1].price_buy);
                                var params1 = {
                                    index: shop[1][n1].index,
                                    action: "market_buy",
                                    id_item: shop[1][n1].id_item,
                                    type: "booster"
                                };
                                hh_ajax(params1, function(data) {
                                    Hero.updates(data.changes, false);
                                    if (data.success === false)
                                    {
                                        clearTimer('nextShopTime');
                                    } else {
                                        HaveBooster[boost] = boosterOwned++;
                                        StorageHelper_setStoredValue("HHAuto_Temp_haveBooster", JSON.stringify(HaveBooster));
                                    }
                                    // change referer
                                    window.history.replaceState(null, '', '/home.html');
                                });
                                shop[1].splice(n1,1);
                                StorageHelper_setStoredValue("HHAuto_Temp_storeContents", JSON.stringify(shop));
                                setTimeout(doShopping, randomInterval(600,1200));
                                return;
                            }
                        }
                    }
                }

                if (shop[1].length==0 && Was>0)
                {
                    StorageHelper_setStoredValue("HHAuto_Temp_charLevel", 0);
                }
            }

            if (StorageHelper_getStoredValue("HHAuto_Setting_autoAffW") ==="true" && HaveAff<MaxAff)
            {
                //logHHAuto('gifts');
                Was=shop[2].length;
                var allGiftsPriceSc = 0;
                for (var n2=shop[2].length-1;n2>=0;n2--)
                {
                    if (shop[2][n2].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                    {
                        allGiftsPriceSc += Number(shop[2][n2].price_buy);
                    }
                }
                if (allGiftsPriceSc>0 && money>=Exp+allGiftsPriceSc) {
                    LogUtils_logHHAuto('Buy all gifts for price:' + allGiftsPriceSc);
                    // change referer
                    window.history.replaceState(null, '', '/shop.html');
                    money-=allGiftsPriceSc;
                    var params2 = {
                        action: "market_auto_buy",
                        type: "gift"
                    };
                    hh_ajax(params2, function(data) {
                        Hero.updates(data.changes, false);
                        if (data.success === false)
                        {
                            clearTimer('nextShopTime');
                        }
                        // change referer
                        window.history.replaceState(null, '', '/home.html');
                    });
                    for (var n2=shop[2].length-1;n2>=0;n2--)
                    {
                        if (shop[2][n2].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                        {
                            shop[2].splice(n2,1);
                        }
                    }
                    StorageHelper_setStoredValue("HHAuto_Temp_storeContents", JSON.stringify(shop));
                } else {
                    for (var n2=shop[2].length-1;n2>=0;n2--)
                    {
                        //logHHAuto({log:'wanna buy ',Object:shop[2][n2]});
                        if (money>=Aff+Number(shop[2][n2].price_buy) && money>=Number(shop[2][n2].price_buy) && shop[2][n2].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                        {
                            LogUtils_logHHAuto({log:'Buying : ',Object:shop[2][n2]});
                            // change referer
                            window.history.replaceState(null, '', '/shop.html');
                            money-=Number(shop[2][n2].price_buy);
                            var params2 = {
                                index: shop[2][n2].index,
                                action: "market_buy",
                                id_item: shop[2][n2].id_item,
                                type: "gift"
                            };
                            hh_ajax(params2, function(data) {
                                Hero.updates(data.changes, false);
                                if (data.success === false)
                                {
                                    clearTimer('nextShopTime');
                                }
                                // change referer
                                window.history.replaceState(null, '', '/home.html');
                            });
                            shop[2].splice(n2,1);
                            StorageHelper_setStoredValue("HHAuto_Temp_storeContents", JSON.stringify(shop));
                            setTimeout(doShopping, randomInterval(600,1200));
                            return;
                        }
                    }
                }
                if (shop[2].length==0 && Was>0)
                {
                    StorageHelper_setStoredValue("HHAuto_Temp_charLevel", 0);
                }
            }
            if (StorageHelper_getStoredValue("HHAuto_Setting_autoExpW") ==="true" && HaveExp<MaxExp)
            {
                //logHHAuto('books');
                Was=shop[3].length;
                var allPotionPriceSc = 0;
                for (var n3=shop[3].length-1;n3>=0;n3--)
                {
                    if (shop[3][n3].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                    {
                        allPotionPriceSc += Number(shop[3][n3].price_buy);
                    }
                }
                if (allPotionPriceSc>0 && money>=Exp+allPotionPriceSc) {
                    LogUtils_logHHAuto('Buy all books for price:' + allPotionPriceSc);
                    // change referer
                    window.history.replaceState(null, '', '/shop.html');
                    money-=allPotionPriceSc;
                    var params3 = {
                        action: "market_auto_buy",
                        type: "potion"
                    };
                    hh_ajax(params3, function(data) {
                        Hero.updates(data.changes, false);
                        if (data.success === false)
                        {
                            clearTimer('nextShopTime');
                        }
                        // change referer
                        window.history.replaceState(null, '', '/home.html');
                    });
                    for (var n3=shop[3].length-1;n3>=0;n3--)
                    {
                        if (shop[3][n3].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                        {
                            shop[3].splice(n3,1);
                        }
                    }
                    StorageHelper_setStoredValue("HHAuto_Temp_storeContents", JSON.stringify(shop));
                } else {
                    for (var n3=shop[3].length-1;n3>=0;n3--)
                    {
                        //logHHAuto('wanna buy ',shop[3][n3]);
                        if (money>=Exp+Number(shop[3][n3].price_buy) && money>=Number(shop[3][n3].price_buy) && shop[3][n3].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                        {
                            LogUtils_logHHAuto({log:'Buying : ',Object:shop[3][n3]});
                            // change referer
                            window.history.replaceState(null, '', '/shop.html');
                            money-=Number(shop[3][n3].price);
                            var params3 = {
                                index: shop[3][n3].index,
                                action: "market_buy",
                                id_item: shop[3][n3].id_item,
                                type: "potion"
                            };
                            hh_ajax(params3, function(data) {
                                Hero.updates(data.changes, false);
                                if (data.success === false)
                                {
                                    clearTimer('nextShopTime');
                                }
                                // change referer
                                window.history.replaceState(null, '', '/home.html');
                            });
                            shop[3].splice(n3,1);
                            StorageHelper_setStoredValue("HHAuto_Temp_storeContents", JSON.stringify(shop));
                            setTimeout(doShopping, randomInterval(600,1200));
                            return;
                        }
                    }
                }
                if (shop[3].length==0 && Was>0)
                {
                    StorageHelper_setStoredValue("HHAuto_Temp_charLevel", 0);
                }
            }
            StorageHelper_setStoredValue("HHAuto_Temp_storeContents", JSON.stringify(shop));
            //unsafeWindow.Hero.currencies.soft_currency=money;
            //Hero.update("soft_currency", money, false);
        }
        catch (ex)
        {
            LogUtils_logHHAuto("Catched error : Could not buy : "+ex);
            StorageHelper_setStoredValue("HHAuto_Temp_charLevel", 0);
        }
    }
}
;// CONCATENATED MODULE: ./src/Module/Missions.js




class Missions {
    /**
    * Recieves a list of mission objects and returns the mission object to use.
    * A mission object looks similar to this :-
    * Eg 1:   {"id_member_mission":"256160093","id_mission":"23","duration":"53","cost":"1","remaining_time":"-83057","rewards":[{"classList":{"0":"slot","1":"slot_xp"},"type":"xp","data":28},{"classList":{"0":"slot","1":"slot_SC"},"type":"money","data":277}]}
    * Eg 2:   {"id_member_mission":"256160095","id_mission":"10","duration":"53","cost":"1","remaining_time":"-81330","rewards":[{"classList":{"0":"slot","1":"slot_xp"},"type":"xp","data":28},{"classList":{"0":"slot","1":"rare"},"type":"item","data":{"id_item":"23","type":"gift","subtype":"0","identifier":"K3","rarity":"rare","value":"80","carac1":0,"carac2":0,"carac3":0,"endurance":0,"chance":0,"ego":0,"damage":0,"duration":0,"level_mini":"1","name":"Bracelet","Name":"Bracelet","ico":"https://content.haremheroes.com/pictures/items/K3.png","price_sell":5561,"count":1,"id_m_i":[]}}]}
    * Eg 3:   {"id_member_mission":"256822795","id_mission":"337","duration":"17172","cost":"144","remaining_time":null,"remaining_cost":"144","rewards":[{"classList":{"0":"slot","1":"slot_HC"},"type":"koban","data":11}]}
    * Eg 1 has mission rewards of xp and money.
    * Eg 2 has mission rewards of xp and item.
    * Eg 3 has mission rewards of koban/hard_currency.
    * cost is the koban price for instant complete.
    */
    static getSuitableMission(missionsList)
    {
        var msn = missionsList[0];

        for(var m in missionsList)
        {
            if (JSON.stringify(missionsList[m].rewards).includes("koban") && StorageHelper_getStoredValue("HHAuto_Setting_autoMissionKFirst") === "true")
            {
                return missionsList[m];
            }
            if(Number(msn.duration) > Number(missionsList[m].duration))
            {
                msn = missionsList[m];
            }
        }
        return msn;
    }
    static run() {
        // returns boolean to set busy
        if(getPage() !== getHHScriptVars("pagesIDMissions"))
        {
            LogUtils_logHHAuto("Navigating to missions page.");
            gotoPage(getHHScriptVars("pagesIDMissions"));
            // return busy
            return true;
        }
        else
        {
            LogUtils_logHHAuto("On missions page.");
            if(RewardHelper.closeRewardPopupIfAny()) {
                return true;
            }
            let canCollect = StorageHelper_getStoredValue("HHAuto_Setting_autoMissionCollect") ==="true" && $(".mission_button button:visible[rel='claim']").length >0 && canCollectCompetitionActive();
            if (canCollect)
            {
                LogUtils_logHHAuto("Collecting finished mission's reward.");
                $(".mission_button button:visible[rel='claim']").first().click();
                return true;
            }
            // TODO: select new missions and parse reward data from HTML, it's there in data attributes of tags
            var missions = [];
            var allGood = true;
            // parse missions
            $(".mission_object").each(function(idx,missionObject){
                var data = $.data(missionObject).d;
                // Do not list completed missions
                var toAdd=true;
                if(data.remaining_time !== null){
                    // This is not a fresh mission
                    if(data.remaining_time > 0)
                    {
                        if ($('.finish_in_bar[style*="display:none;"], .finish_in_bar[style*="display: none;"]', missionObject).length === 0)
                        {
                            LogUtils_logHHAuto("Unfinished mission detected...("+data.remaining_time+"sec. remaining)");
                            setTimer('nextMissionTime',Number(data.remaining_time)+1);
                            allGood = false;
                            missions = []; // Clear missions to avoid selecting a smaller one than the one ongoing
                            return false;
                        }
                        else
                        {
                            allGood = false;
                        }
                    }
                    else
                    {
                        if (canCollect)
                        {
                            LogUtils_logHHAuto("Unclaimed mission detected...");
                            gotoPage(getHHScriptVars("pagesIDMissions"),{},randomInterval(1300,1800));
                            return true;
                        }
                    }
                    return;
                }
                else if(data.remaining_cost === null) {
                    // Finished missioned
                    data.finished = true;
                    data.remaining_time = 0;
                    toAdd = false;
                }
                data.missionObject = missionObject;
                var rewards = [];
                // set rewards
                {
                    // get Reward slots
                    var slots = missionObject.querySelectorAll(".slot");
                    // traverse slots
                    $.each(slots,function(idx,slotDiv){
                        var reward = {};
                        // get slot class list
                        reward.classList = slotDiv.classList;
                        // set reward type
                        if(reward.classList.contains("slot_xp"))reward.type = "xp";
                        else if(reward.classList.contains("slot_soft_currency"))reward.type = "money";
                        else if(reward.classList.contains("slot_hard_currency"))reward.type = "koban";
                        else reward.type = "item";
                        // set value if xp
                        if(reward.type === "xp" || reward.type === "money" || reward.type === "koban")
                        {
                            // remove all non numbers and HTML tags
                            try{
                                reward.data = Number(slotDiv.innerHTML.replace(/<.*?>/g,'').replace(/\D/g,''));
                            }
                            catch(e){
                                LogUtils_logHHAuto("Catched error : Couldn't parse xp/money data : "+e);
                                LogUtils_logHHAuto(slotDiv);
                            }
                        }
                        // set item details if item
                        else if(reward.type === "item")
                        {
                            try{
                                reward.data = $.data(slotDiv).d;
                            }
                            catch(e){
                                LogUtils_logHHAuto("Catched error : Couldn't parse item reward slot details : "+e);
                                LogUtils_logHHAuto(slotDiv);
                                reward.type = "unknown";
                            }
                        }
                        rewards.push(reward);
                    });
                }
                data.rewards = rewards;

                if (toAdd) missions.push(data);
            });
            if(!allGood && canCollect)
            {
                LogUtils_logHHAuto("Something went wrong, need to retry in 15secs.");
                setTimer('nextMissionTime',15);
                return true;
            }
            if (!allGood) {
                LogUtils_logHHAuto("Mission ongoing waiting it ends.");
                return true;
            }
            LogUtils_logHHAuto("Missions parsed, mission list is:", missions);
            if(missions.length > 0)
            {
                LogUtils_logHHAuto("Selecting mission from list.");
                var mission = Missions.getSuitableMission(missions);
                LogUtils_logHHAuto("Selected mission to be started (duration: "+mission.duration+"sec):");
                LogUtils_logHHAuto(mission);
                var missionButton = $(mission.missionObject).find("button:visible[rel='mission_start']").first();
                if(missionButton.length > 0) {
                    missionButton.click();
                    gotoPage(getHHScriptVars("pagesIDMissions"),{},randomInterval(1300,1800));
                    setTimer('nextMissionTime',Number(mission.duration)+1);
                }
                else {
                    LogUtils_logHHAuto("Something went wrong, no start button");
                    setTimer('nextMissionTime',15);
                    return true;
                }
            }
            else
            {
                LogUtils_logHHAuto("No missions detected...!");
                // get gift
                var ck = StorageHelper_getStoredValue("HHAuto_Temp_missionsGiftLeft");
                var isAfterGift = document.querySelector("#missions .after_gift").style.display === 'block';
                if(!isAfterGift){
                    if(ck === 'giftleft')
                    {
                        LogUtils_logHHAuto("Collecting gift.");
                        deleteStoredValue("HHAuto_Temp_missionsGiftLeft");
                        document.querySelector(".end_gift button").click();
                    }
                    else{
                        LogUtils_logHHAuto("Refreshing to collect gift...");
                        StorageHelper_setStoredValue("HHAuto_Temp_missionsGiftLeft","giftleft");
                        location.reload();
                        // is busy
                        return true;
                    }
                }
                let time = $('.after_gift span[rel="expires"]').text();
                if(time === undefined || time === null || time.length === 0) {
                    LogUtils_logHHAuto("New mission time was undefined... Setting it manually to 10min.");
                    setTimer('nextMissionTime', 10*60);
                }
                setTimer('nextMissionTime',Number(convertTimeToInt(time))+1);
            }
            // not busy
            return false;
        }
    }
    static styles() {
        if(StorageHelper_getStoredValue("HHAuto_Setting_compactMissions") === "true")
        {
            GM_addStyle('#missions .missions_wrap  {'
                + 'display:flex;'
                + 'flex-wrap: wrap;'
                + 'align-content: baseline;'
            +'}');
            const missionsContainerPath = '#missions .missions_wrap .mission_object.mission_entry';
            GM_addStyle(missionsContainerPath + ' {'
                + 'height: 56px;'
                + 'margin-right:3px;'
                + 'width: 49%;'
            +'}');
            GM_addStyle(missionsContainerPath + ' .mission_reward {'
                + 'width: 110px;'
                + 'padding-left: 5px;'
                + 'padding-top: 5px;'
            +'}');
            GM_addStyle(missionsContainerPath + ' .mission_image {'
                + 'height: 50px;'
                + 'width: 50px;'
                + 'margin-top: 0;'
            +'}');
            GM_addStyle(missionsContainerPath + ' .mission_details {'
                + 'display:none;'
            +'}');
            GM_addStyle(missionsContainerPath + ' .mission_button {'
            + 'display:flex;'
            +'}');
            GM_addStyle(missionsContainerPath + ' .mission_button .duration {'
                + 'top:5px;'
                + 'left:5px;'
            +'}');
            GM_addStyle(missionsContainerPath + ' .mission_button button {'
                + 'margin:0;'
            +'}');
            GM_addStyle(missionsContainerPath + ' .mission_button button[rel="finish"] {'
                + 'height: 50px;'
                + 'top:0;'
                + 'padding: 4px 4px;;'
            +'}');
            GM_addStyle(missionsContainerPath + ' .mission_button button[rel="claim"] {'
                + 'left:0;'
            +'}');
            GM_addStyle(missionsContainerPath + ' .mission_button .hh_bar {'
                + 'left:5px;'
            +'}');
        }
    }
}
;// CONCATENATED MODULE: ./src/Module/Pantheon.js




class Pantheon {

    static getEnergy() {
        return Number(getHHVars('Hero.energies.worship.amount'));
    }

    static getEnergyMax() {
        return Number(getHHVars('Hero.energies.worship.max_regen_amount'));
    }

    static isTimeToFight(){
        const energyAboveThreshold = Pantheon.getEnergy() > Number(StorageHelper_getStoredValue("HHAuto_Setting_autoPantheonThreshold"));
        const paranoiaSpending = Pantheon.getEnergy() > 0 && Number(checkParanoiaSpendings('worship')) > 0;

        return checkTimer('nextPantheonTime') && energyAboveThreshold || paranoiaSpending;Sa
    }

    static run()
    {
        LogUtils_logHHAuto("Performing auto Pantheon.");
        // Confirm if on correct screen.
        var page = getPage();
        var current_worship = Pantheon.getEnergy();
        if(page === getHHScriptVars("pagesIDPantheon"))
        {
            LogUtils_logHHAuto("On pantheon page.");
            LogUtils_logHHAuto("Remaining worship : "+ current_worship);
            if ( current_worship > 0 )
            {
                let pantheonButton = $("#pantheon_tab_container .bottom-container a.blue_button_L.pantheon-pre-battle-btn");
                let templeID = queryStringGetParam(new URL(pantheonButton[0].getAttribute("href"),window.location.origin).search, 'id_opponent');
                if (pantheonButton.length > 0 && templeID !== null )
                {
                    LogUtils_logHHAuto("Going to fight Temple : "+templeID);
                    gotoPage(getHHScriptVars("pagesIDPantheonPreBattle"),{id_opponent:templeID});
                }
                else
                {
                    LogUtils_logHHAuto("Issue to find templeID retry in 60secs.");
                    setTimer('nextPantheonTime',60);
                    gotoPage(getHHScriptVars("pagesIDHome"));
                }
            }
            else
            {
                if (getHHVars('Hero.energies.worship.next_refresh_ts') === 0)
                {
                    setTimer('nextPantheonTime',15*60);
                }
                else
                {
                    setTimer('nextPantheonTime',getHHVars('Hero.energies.worship.next_refresh_ts') + 10);
                }
                gotoPage(getHHScriptVars("pagesIDHome"));
            }
            return;
        }
        else if (page === getHHScriptVars("pagesIDPantheonPreBattle"))
        {
            LogUtils_logHHAuto("On pantheon-pre-battle page.");
            let templeID = queryStringGetParam(window.location.search,'id_opponent');
            LogUtils_logHHAuto("Go and fight temple :"+templeID);
            let pantheonTempleBattleButton =$("#pre-battle .battle-buttons a.green_button_L.battle-action-button.pantheon-single-battle-button[data-pantheon-id='"+templeID+"']");
            if (pantheonTempleBattleButton.length >0)
            {
                //replaceCheatClick();
                StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
                LogUtils_logHHAuto("setting autoloop to false");
                pantheonTempleBattleButton[0].click();
            }
            else
            {
                LogUtils_logHHAuto("Issue to find temple battle button retry in 60secs.");
                setTimer('nextPantheonTime',60);
                gotoPage(getHHScriptVars("pagesIDHome"));
            }
        }
        else
        {
            // Switch to the correct screen
            LogUtils_logHHAuto("Remaining worship : "+ current_worship);
            if ( current_worship > 0 )
            {
                LogUtils_logHHAuto("Switching to pantheon screen.");
                gotoPage(getHHScriptVars("pagesIDPantheon"));

                return;
            }
            else
            {
                if (getHHVars('Hero.energies.worship.next_refresh_ts') === 0)
                {
                    setTimer('nextPantheonTime',15*60);
                }
                else
                {
                    setTimer('nextPantheonTime',getHHVars('Hero.energies.worship.next_refresh_ts') + 10);
                }
                gotoPage(getHHScriptVars("pagesIDHome"));
            }
            return;
        }
    }
}
;// CONCATENATED MODULE: ./src/Module/MonthlyCard.js










class MonthlyCards {
    static updateInputPattern() {
        try {
            if(getHHScriptVars('isEnabledTrollBattle',false)) {
                const maxRegenFight = Troll.getEnergyMax();
                if(maxRegenFight && maxRegenFight > 20) {
                    // 20 - 30 - 40 - 50 - 60
                    const lastAllowedTenth = (maxRegenFight / 10) - 1;
                    HHAuto_inputPattern.autoTrollThreshold = "[1-"+lastAllowedTenth+"]?[0-9]";
                }
            }
            if(getHHScriptVars('isEnabledSeason',false)) {
                const maxRegenKiss = Season.getEnergyMax();
                if(maxRegenKiss && maxRegenKiss > 10) {
                    // 10 - 20 - 30 - 40 - 50
                    const lastAllowedTenth = (maxRegenKiss / 10) - 1;
                    HHAuto_inputPattern.autoSeasonThreshold = "[1-"+lastAllowedTenth+"]?[0-9]";
                }
            }
            if(getHHScriptVars('isEnabledQuest',false)) {
                const maxRegenQuest = QuestHelper.getEnergyMax();
                if(maxRegenQuest && maxRegenQuest > 100) {
                    // 100 - 150 - 200 - 250 - 300
                    if(maxRegenQuest === 200 || maxRegenQuest === 300) {
                        const lastAllowedHundred = ( QuestHelper.getEnergyMax() / 100) - 1;
                        HHAuto_inputPattern.autoQuestThreshold = "[1-"+lastAllowedHundred+"][0-9][0-9]|[1-9]?[0-9]";
                    } else if(maxRegenQuest === 250 ){
                        HHAuto_inputPattern.autoQuestThreshold = "2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]";
                    } else {
                        HHAuto_inputPattern.autoQuestThreshold = "1[0-4][0-9]|[1-9]?[0-9]";
                    }
                }
            }
            if(getHHScriptVars('isEnabledLeagues',false)) {
                const maxRegenLeague = LeagueHelper.getEnergyMax();
                if(maxRegenLeague && maxRegenLeague > 15) {
                    // 15 - 18 - 23 - 26 - 30
                    switch (maxRegenLeague)
                    {
                        case 18 : HHAuto_inputPattern.autoLeaguesThreshold = "1[0-7]|[0-9]"; break;
                        case 23 : HHAuto_inputPattern.autoLeaguesThreshold = "2[0-2]|1[0-9]|[0-9]"; break;
                        case 26 : HHAuto_inputPattern.autoLeaguesThreshold = "2[0-5]|1[0-9]|[0-9]"; break;
                        case 30 : HHAuto_inputPattern.autoLeaguesThreshold = "2[0-9]|1[0-9]|[0-9]"; break;
                    }
                }
            }
            if(getHHScriptVars('isEnabledPantheon',false)) {
                const maxRegenPantheon = Pantheon.getEnergyMax();
                if(maxRegenPantheon && maxRegenPantheon > 10) {
                    // 10 - 15 - 20 - 25 - 30
                    switch (maxRegenPantheon)
                    {
                        case 15 : HHAuto_inputPattern.autoPantheonThreshold = "1[0-4]|[0-9]"; break;
                        case 20 : HHAuto_inputPattern.autoPantheonThreshold = "1[0-9]|[0-9]"; break;
                        case 25 : HHAuto_inputPattern.autoPantheonThreshold = "2[0-4]|1[0-9]|[0-9]"; break;
                        case 30 : HHAuto_inputPattern.autoPantheonThreshold = "[1-2][0-9]|[0-9]"; break;
                    }
                }
            }
        } catch(e) {
            LogUtils_logHHAuto("Catched error : Couldn't parse card info, input patern kept as default : "+e);
        }
    }
}
;// CONCATENATED MODULE: ./src/Module/Pachinko.js





class Pachinko {

    static getGreatPachinko() {
        Pachinko.getFreePachinko('great','nextPachinkoTime','great_pachinko_timer');
    }
    static getMythicPachinko() {
        Pachinko.getFreePachinko('mythic','nextPachinko2Time', 'mythic-timer');
    }
    static getEquipmentPachinko() {
        Pachinko.getFreePachinko('equipment','nextPachinkoEquipTime', 'equipment-timer'); // No timer. yet ?
    }

    static getFreePachinko(pachinkoType, pachinkoTimer, timerClass){
        if(!pachinkoType || !pachinkoTimer){
            return false;
        }

        try {
            if(getPage() !== getHHScriptVars("pagesIDPachinko"))
            {
                LogUtils_logHHAuto("Navigating to Pachinko window.");
                gotoPage(getHHScriptVars("pagesIDPachinko"));
                return true;
            }
            else {
                LogUtils_logHHAuto("Detected Pachinko Screen. Fetching Pachinko, setting autoloop to false");
                StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
                var counter=0;
                LogUtils_logHHAuto('switch to ' + pachinkoType);
                const freeButtonQuery = '#playzone-replace-info button:not([orbs]):not([price]), #playzone-replace-info button[data-free="true"]';
                while ($(freeButtonQuery).length === 0 && (counter++)<250)
                {
                    $('.game-simple-block[type-pachinko='+pachinkoType+']')[0].click();
                }

                if ($(freeButtonQuery).length === 0)
                {
                    LogUtils_logHHAuto('Not ready yet');
                }
                else
                {
                    $(freeButtonQuery)[0].click();
                }

                var npach = $('.'+timerClass+' span[rel="expires"]').text();
                if(npach !== undefined && npach !== null && npach.length > 0)
                {
                    setTimer(pachinkoTimer,Number(convertTimeToInt(npach))+1);
                }
                else
                {
                    LogUtils_logHHAuto("Unable to find "+pachinkoType+" Pachinko time, wait 4h.");
                    setTimer(pachinkoTimer, getHHScriptVars("maxCollectionDelay"));
                }

                setTimeout( function() {
                    RewardHelper.closeRewardPopupIfAny();
                    StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "true");
                    LogUtils_logHHAuto("setting autoloop to true");
                    setTimeout(autoLoop,randomInterval(500,800));
                },randomInterval(300,600));
            }
            return true;
        }
        catch (ex) {
            LogUtils_logHHAuto("Catched error : Could not collect "+pachinkoType+" Pachinko... " + ex);
            setTimer(pachinkoTimer, getHHScriptVars("maxCollectionDelay"));
            return false;
        }
    }
    static modulePachinko() {
        const menuID = "PachinkoButton";
        let PachinkoButton = '<div style="position: absolute;left: 52%;top: 100px;width:60px;z-index:10" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("PachinkoButton","tooltip")+'</span><label style="font-size:small" class="myButton" id="PachinkoButton">'+getTextForUI("PachinkoButton","elementText")+'</label></div>'
    
        if (document.getElementById(menuID) === null)
        {
            $("#contains_all section").prepend(PachinkoButton);
            document.getElementById("PachinkoButton").addEventListener("click", buildPachinkoSelectPopUp);
            GM_registerMenuCommand(getTextForUI(menuID,"elementText"), buildPachinkoSelectPopUp);
        }
        else
        {
            return;
        }
    
        function getNumberOfGirlToWinPatchinko(){
            const girlsRewards = $("div.playing-zone .game-rewards .list-prizes .girl_shards");
            let numberOfGirlsToWin = 0;
            if (girlsRewards.length > 0) {
                try {
                    numberOfGirlsToWin = JSON.parse(girlsRewards.attr("data-rewards")).length;
                } catch(exp) {}
            }
            return numberOfGirlsToWin;
        }
    
        function buildPachinkoSelectPopUp()
        {
            let PachinkoMenu =   '<div style="padding:50px; display:flex;flex-direction:column;font-size:15px;" class="HHAutoScriptMenu">'
            +    '<div style="display:flex;flex-direction:row">'
            +     '<div style="padding:10px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("PachinkoSelector","tooltip")+'</span><select id="PachinkoSelector"></select></div>'
            +     '<div style="padding:10px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("PachinkoLeft","tooltip")+'</span><span id="PachinkoLeft"></span></div>'
            +    '</div>'
            +    '<div class="rowLine">'
            +      '<p id="girls_to_win"></p>'
            +    '</div>'
            +    '<div class="rowLine">'
            +       hhMenuSwitch('PachinkoFillOrbs')
            +       hhMenuSwitch('PachinkoByPassNoGirls')
            +       hhMenuSwitch('PachinkoStopFirstGirl')
            +    '</div>'
            +    '<div class="rowLine">'
            +     '<div style="padding:10px;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("PachinkoXTimes","tooltip")+'</span><input id="PachinkoXTimes" style="width:50px;height:20px" required pattern="'+HHAuto_inputPattern.menuExpLevel+'" type="text" value="1"></div>'
            +    '</div>'
            +    '<div class="rowLine">'
            +     '<div style="padding:10px;width:50%" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("Launch","tooltip")+'</span><label class="myButton" id="PachinkoPlayX" style="font-size:15px; width:100%;text-align:center">'+getTextForUI("Launch","elementText")+'</label></div>'
            +    '</div>'
            +   '<p style="color: red;" id="PachinkoError"></p>'
            +  '</div>'
            fillHHPopUp("PachinkoMenu",getTextForUI("PachinkoButton","elementText"), PachinkoMenu);
    
            function updateOrbsNumber(orbsLeft){
                let fillAllOrbs = document.getElementById("PachinkoFillOrbs").checked;
    
                if (fillAllOrbs && orbsLeft.length >0)
                {
                    document.getElementById("PachinkoXTimes").value = orbsLeft[0].innerText;
                }
                else
                {
                    document.getElementById("PachinkoXTimes").value = 1;
                }
            }
    
            document.getElementById("PachinkoPlayX").addEventListener("click", pachinkoPlayXTimes);
            $(document).on('change',"#PachinkoSelector", function() {
                let timerSelector = document.getElementById("PachinkoSelector");
                let selectorText = timerSelector.options[timerSelector.selectedIndex].text;
                if (selectorText === getTextForUI("PachinkoSelectorNoButtons","elementText"))
                {
                    document.getElementById("PachinkoLeft").innerText = "";
                    return;
                }
                let orbsLeft = $("div.playing-zone div.btns-section button.blue_button_L[nb_games="+timerSelector.options[timerSelector.selectedIndex].value+"] span[total_orbs]");
    
                if (orbsLeft.length >0)
                {
                    document.getElementById("PachinkoLeft").innerText = orbsLeft[0].innerText + getTextForUI("PachinkoOrbsLeft","elementText");
                }
                else
                {
                    document.getElementById("PachinkoLeft").innerText = 0;
                }
                updateOrbsNumber(orbsLeft);
            });
            $(document).on('change',"#PachinkoFillOrbs", function() {
                let fillAllOrbs = document.getElementById("PachinkoFillOrbs").checked;
    
                let timerSelector = document.getElementById("PachinkoSelector");
                let orbsLeft = $("div.playing-zone div.btns-section button.blue_button_L[nb_games="+timerSelector.options[timerSelector.selectedIndex].value+"] span[total_orbs]");
    
                updateOrbsNumber(orbsLeft);
            });
    
            // Add Timer reset options //changed
            let timerOptions = document.getElementById("PachinkoSelector");
            let countTimers=0;
            let PachinkoType = $("div.playing-zone #playzone-replace-info div.cover h2")[0].innerText;
    
            $("div.playing-zone div.btns-section button.blue_button_L").each(function ()
                                                                             {
                let optionElement = document.createElement("option");
                let numberOfGames = Number($(this).attr('nb_games'))
                optionElement.value = numberOfGames;
                countTimers++;
                optionElement.text = PachinkoType+" x"+$(this).attr('nb_games');
                timerOptions.add(optionElement);
    
                if (countTimers === 1)
                {
                    let orbsLeft = $("div.playing-zone div.btns-section button.blue_button_L[nb_games="+numberOfGames+"] span[total_orbs]")[0];
                    document.getElementById("PachinkoLeft").innerText = orbsLeft.innerText+ getTextForUI("PachinkoOrbsLeft","elementText");;
                }
            });
    
            let numberOfGirlsToWin = getNumberOfGirlToWinPatchinko();
            document.getElementById("girls_to_win").innerText= numberOfGirlsToWin + " girls to win"; // TODO translate
            $('#PachinkoStopFirstGirl').parent().parent().parent().toggle(numberOfGirlsToWin>0);
    
    
            if(countTimers === 0)
            {
                let optionElement = document.createElement("option");
                optionElement.value = countTimers;
                optionElement.text = getTextForUI("PachinkoSelectorNoButtons","elementText");
                timerOptions.add(optionElement);
            }
        }
    
        function pachinkoPlayXTimes()
        {
            StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
            LogUtils_logHHAuto("setting autoloop to false");
            let timerSelector = document.getElementById("PachinkoSelector");
            let ByPassNoGirlChecked = document.getElementById("PachinkoByPassNoGirls").checked;
            let stopFirstGirlChecked = document.getElementById("PachinkoStopFirstGirl").checked;
            let buttonValue = Number(timerSelector.options[timerSelector.selectedIndex].value);
            let buttonSelector = "div.playing-zone div.btns-section button.blue_button_L[nb_games="+buttonValue+"]";
            let orbsLeftSelector = buttonSelector+ " span[total_orbs]";
            let orbsLeft = $(orbsLeftSelector);
            let orbsToGo = document.getElementById("PachinkoXTimes").value;
            let orbsPlayed = 0;
    
            if (orbsLeft.length >0)
            {
                orbsLeft=Number(orbsLeft[0].innerText);
            }
            else
            {
                LogUtils_logHHAuto('No Orbs left for : '+timerSelector.options[timerSelector.selectedIndex].text);
                document.getElementById("PachinkoError").innerText=getTextForUI("PachinkoSelectorNoButtons","elementText");
                return;
            }
    
            if ( Number.isNaN(Number(orbsToGo)) || orbsToGo < 1 || orbsToGo > orbsLeft)
            {
                LogUtils_logHHAuto('Invalid orbs number '+orbsToGo);
                document.getElementById("PachinkoError").innerText=getTextForUI("PachinkoInvalidOrbsNb","elementText")+" : "+orbsToGo;
                return;
            }
            let PachinkoPlay =   '<div style="padding:50px; display:flex;flex-direction:column">'
            +   '<p>'+timerSelector.options[timerSelector.selectedIndex].text+' : </p>'
            +   '<p id="PachinkoPlayedTimes" style="padding:10px">0/'+orbsToGo+'</p>'
            +  '<label style="width:80px" class="myButton" id="PachinkoPlayCancel">'+getTextForUI("OptionCancel","elementText")+'</label>'
            + '</div>'
            fillHHPopUp("PachinkoPlay",getTextForUI("PachinkoButton","elementText"), PachinkoPlay);
            document.getElementById("PachinkoPlayCancel").addEventListener("click", function()
                                                                           {
                maskHHPopUp();
                LogUtils_logHHAuto("Cancel clicked, closing popUp.");
    
            });
            function stopXPachinkoNoGirl(){
                LogUtils_logHHAuto("No more girl on Pachinko, cancelling.");
                maskHHPopUp();
                buildPachinkoSelectPopUp();
                document.getElementById("PachinkoError").innerText=getTextForUI("PachinkoNoGirls","elementText");
            }
            function playXPachinko_func()
            {
                if(!isDisplayedHHPopUp())
                {
                    LogUtils_logHHAuto("PopUp closed, cancelling interval, restart autoloop.");
                    StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "true");
                    setTimeout(autoLoop, Number(StorageHelper_getStoredValue("HHAuto_Temp_autoLoopTimeMili")));
                    return;
                }
                if (document.getElementById("confirm_pachinko") !== null )
                {
                    if (ByPassNoGirlChecked && document.getElementById("confirm_pachinko").querySelector("#popup_confirm.blue_button_L") !== null)
                    {
                        document.getElementById("confirm_pachinko").querySelector("#popup_confirm.blue_button_L").click();
                    }
                    else
                    {
                        stopXPachinkoNoGirl();
                        return;
                    }
                }
                let numberOfGirlsToWin = getNumberOfGirlToWinPatchinko();
                // if(!ByPassNoGirlChecked && numberOfGirlsToWin === 0) {
                //     stopXPachinkoNoGirl();
                //     return;
                // }
    
                if (stopFirstGirlChecked && $('#rewards_popup #reward_holder .shards_wrapper:visible').length > 0)
                {
                    LogUtils_logHHAuto("Girl in reward, stopping...");
                    maskHHPopUp();
                    buildPachinkoSelectPopUp();
                    return;
                }
                let pachinkoSelectedButton= $(buttonSelector)[0];
                RewardHelper.closeRewardPopupIfAny();
                let currentOrbsLeft = $(orbsLeftSelector);
                if (currentOrbsLeft.length >0)
                {
                    currentOrbsLeft=Number(currentOrbsLeft[0].innerText);
                }
                else
                {
                    currentOrbsLeft = 0;
                }
                let spendedOrbs = Number(orbsLeft - currentOrbsLeft);
                document.getElementById("PachinkoPlayedTimes").innerText = spendedOrbs+"/"+orbsToGo;
                if (spendedOrbs < orbsToGo && currentOrbsLeft > 0)
                {
                    pachinkoSelectedButton.click();
                }
                else
                {
                    LogUtils_logHHAuto("All spent, going back to Selector.");
                    maskHHPopUp();
                    buildPachinkoSelectPopUp();
                    return;
                }
                setTimeout(playXPachinko_func,randomInterval(500,1500));
            }
            setTimeout(playXPachinko_func,randomInterval(500,1500));
        }
    
    }
}
;// CONCATENATED MODULE: ./src/Module/PlaceOfPower.js




class PlaceOfPower {
    static moduleDisplayPopID()
    {
        if ($('.HHPopIDs').length  > 0) {return}
        $('div.pop_list div[pop_id]').each(function() {
            $(this).prepend('<div class="HHPopIDs">'+$(this).attr('pop_id')+'</div>');
        });
    }
    static styles(){
        if(StorageHelper_getStoredValue("HHAuto_Setting_compactPowerPlace") === "true")
        {
            const popPagePath = '#pop #pop_info .pop_list';
            const popBtnPath = popPagePath +' .pop-action-btn';
            const popContainerPath = popPagePath + ' .pop_list_scrolling_area .pop_thumb_container';
        
            const popButtonStyles = function()
            {
                GM_addStyle( popBtnPath + ' .pop-auto-asign-all, ' + popBtnPath + ' .pop-claim-all {'
                    + 'min-width: auto !important;'
                    + 'height: 26px;'
                    + 'flex-direction: inherit;'
                    + 'column-gap: 12px;'
                    + 'display: inline-flex;'
                +'}');
        
                GM_addStyle( popBtnPath + ' .battle-action-button .action-cost {'
                    + 'width:auto;'
                +'}');
        
                GM_addStyle(popBtnPath + ' .pop-claim-all .action-cost {'
                    + 'display: flex;'
                +'}');
        
                GM_addStyle(popBtnPath + ' .pop-claim-all .action-cost .hc-cost {'
                    + 'display: flex;'
                    + 'align-items: center;'
                +'}');
            }
        
            const popStyles = function()
            {
                GM_addStyle(popContainerPath + ' {'
                    + 'margin:2px;'
                    + 'width: 135px;'
                    + 'min-height: 130px;'
                +'}');
        
                GM_addStyle(popContainerPath + ' .pop_thumb > button {'
                    + 'width: 128px;'
                    + 'height: 25px;'
                +'}');
        
                GM_addStyle(popContainerPath + ' .pop_thumb > .pop_thumb_title {'
                    + 'display: none;'
                +'}');
        
                GM_addStyle(popContainerPath + ' .pop_thumb_expanded,' + popContainerPath + ' .pop_thumb_active {'
                    + 'height: 130px;'
                +'}');
        
                GM_addStyle(popContainerPath + ' .pop_thumb img {'
                    + 'width: 100%;'
                    + 'height: auto;'
                +'}');
        
                GM_addStyle(popContainerPath + ' .pop_thumb > .pop_thumb_progress_bar {'
                    + 'width: 128px;'
                    + 'height: 30px;'
                +'}');
        
                GM_addStyle(popContainerPath + ' .pop_thumb > .pop_thumb_space {'
                    + 'height: 30px;'
                +'}');
        
                GM_addStyle(popContainerPath + ' .pop_thumb > .pop_thumb_progress_bar .hh_bar > .backbar {'
                    + 'width: 123px !important;'
                +'}');
            }
            popButtonStyles();
            popStyles();
        }
    }
    static addPopToUnableToStart(popIndex,message){
        var popUnableToStart=StorageHelper_getStoredValue("HHAuto_Temp_PopUnableToStart")?StorageHelper_getStoredValue("HHAuto_Temp_PopUnableToStart"):"";
        LogUtils_logHHAuto(message);
        if (popUnableToStart === "")
        {
            StorageHelper_setStoredValue("HHAuto_Temp_PopUnableToStart", String(popIndex));
        }
        else
        {
            StorageHelper_setStoredValue("HHAuto_Temp_PopUnableToStart", popUnableToStart+";"+String(popIndex));
        }
    }
    static cleanTempPopToStart()
    {
        sessionStorage.removeItem('HHAuto_Temp_PopUnableToStart');
        sessionStorage.removeItem('HHAuto_Temp_popToStart');
    }
    static removePopFromPopToStart(index)
    {
        var epop;
        var popToSart;
        var newPopToStart;
        popToSart= StorageHelper_getStoredValue("HHAuto_Temp_PopToStart")?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_PopToStart")):[];
        newPopToStart=[];
        for (epop of popToSart)
        {
            if (epop != index)
            {
                newPopToStart.push(epop);
            }
        }
        StorageHelper_setStoredValue("HHAuto_Temp_PopToStart", JSON.stringify(newPopToStart));
    }

    static collectAndUpdate()
    {
        if(getPage() !== getHHScriptVars("pagesIDPowerplacemain")
        )
        {
            LogUtils_logHHAuto("Navigating to powerplaces main page.");
            gotoPage(getHHScriptVars("pagesIDPowerplacemain"));
            // return busy
            return true;
        }
        else
        {
            LogUtils_logHHAuto("On powerplaces main page.");
            StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
            LogUtils_logHHAuto("setting autoloop to false");

            StorageHelper_setStoredValue("HHAuto_Temp_Totalpops", $("div.pop_list div[pop_id]").length); //Count how many different POPs there are and store them locally
            LogUtils_logHHAuto("totalpops : "+StorageHelper_getStoredValue("HHAuto_Temp_Totalpops"));
            var newFilter="";
            if (StorageHelper_getStoredValue("HHAuto_Setting_autoPowerPlacesInverted") === "true")
            {
                // starting from last one.
                $("div.pop_list div[pop_id]").each(function(){newFilter=';'+$(this).attr('pop_id')+newFilter;});
            }
            else
            {
                $("div.pop_list div[pop_id]").each(function(){newFilter=newFilter+';'+$(this).attr('pop_id');});
            }
            if (StorageHelper_getStoredValue("HHAuto_Setting_autoPowerPlacesAll") === "true")
            {
                StorageHelper_setStoredValue("HHAuto_Setting_autoPowerPlacesIndexFilter", newFilter.substring(1));
            }
            StorageHelper_setStoredValue("HHAuto_Temp_currentlyAvailablePops",newFilter.substring(1))
            //collect all
            let buttonClaimQuery = "button[rel='pop_thumb_claim'].purple_button_L:not([style])";
            if ($(buttonClaimQuery).length >0)
            {
                $(buttonClaimQuery)[0].click();
                LogUtils_logHHAuto("Claimed reward for PoP : "+$(buttonClaimQuery)[0].parentElement.getAttribute('pop_id'));
                gotoPage(getHHScriptVars("pagesIDPowerplacemain"));
                return true;
            }



            var filteredPops = StorageHelper_getStoredValue("HHAuto_Setting_autoPowerPlacesIndexFilter")?StorageHelper_getStoredValue("HHAuto_Setting_autoPowerPlacesIndexFilter").split(";"):[];
            var popUnableToStart = StorageHelper_getStoredValue("HHAuto_Temp_PopUnableToStart")?StorageHelper_getStoredValue("HHAuto_Temp_PopUnableToStart").split(";"):[];
            //logHHAuto("filteredPops : "+filteredPops);
            var PopToStart=[];
            $("div.pop_thumb[status='pending_reward']").each(function()
                                                            {
                var pop_id = $(this).attr('pop_id');
                //if index is in filter
                if (filteredPops.includes(pop_id) && ! popUnableToStart.includes(pop_id) && newFilter.includes(pop_id))
                {
                    PopToStart.push(Number(pop_id));
                }
            });


            //get all already started Pop timers
            var currIndex;
            var currTime;
            var minTime = -1;
            var maxTime = -1;
            var e;


            TimerHelper_clearTimer('minPowerPlacesTime');
            TimerHelper_clearTimer('maxPowerPlacesTime');

            let popListRemaining = $('#pop_info .pop_thumb .pop_thumb_remaining > span');
            popListRemaining.each(function() {
                let $elem=$(this);
                let elementText=$elem.text();
                currIndex = $elem.parents('.pop_thumb_expanded').attr('pop_id');
                if (filteredPops.includes(currIndex) && ! popUnableToStart.includes(currIndex))
                {
                    currTime=convertTimeToInt($elem.text());
                    if (minTime === -1 || currTime === -1 || minTime>currTime)
                    {
                        minTime = currTime;

                    }
                    if (maxTime === -1 || maxTime<currTime)
                    {
                        maxTime = currTime;
                    }
                }
            })

            if (minTime != -1)
            {
                if ( minTime > 7*60*60 )
                {
                    //force check of PowerPlaces every 7 hours // TODO: check time 20min != 7h
                    setTimer('minPowerPlacesTime',Number(20*60)+1);
                }
                else if (StorageHelper_getStoredValue("HHAuto_Setting_autoPowerPlacesWaitMax") === "true" && maxTime != -1)
                {
                    setTimer('minPowerPlacesTime',Number(maxTime) + 2*60);
                }
                else
                {
                    setTimer('minPowerPlacesTime',Number(minTime) + 1*60);
                }
            }
            else
            {
                setTimer('minPowerPlacesTime',60);
            }
            if (maxTime != -1)
            {
                setTimer('maxPowerPlacesTime',Number(maxTime)+1);
            }
            //building list of Pop to start
            $("div.pop_thumb[status='can_start']").each(function()
                                                        {
                var pop_id = $(this).attr('pop_id');
                //if index is in filter
                if (filteredPops.includes(pop_id) && !popUnableToStart.includes(pop_id) && newFilter.includes(pop_id))
                {
                    PopToStart.push(Number(pop_id));
                    TimerHelper_clearTimer('minPowerPlacesTime');
                }
            });
            if (PopToStart.length === 0)
            {
                sessionStorage.removeItem('HHAuto_Temp_PopUnableToStart');
            }
            LogUtils_logHHAuto("build popToStart : "+PopToStart);
            StorageHelper_setStoredValue("HHAuto_Temp_PopToStart", JSON.stringify(PopToStart));
            StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "true");
            setTimeout(autoLoop, Number(StorageHelper_getStoredValue("HHAuto_Temp_autoLoopTimeMili")));
            return false;
        }
    }

    
    static girlPower(powerRemaining, girlList, selectedGirls) {
        let subList = girlList;
        if (subList.length>0){
            let currentGirl = subList.pop();
            if(currentGirl.power <= powerRemaining) {
                selectedGirls.push(currentGirl);
                powerRemaining -= currentGirl.power;
            };
            selectedGirls = PlaceOfPower.girlPower(powerRemaining, subList, selectedGirls);
        };
        return selectedGirls;
    }

    // returns boolean to set busy
    static doPowerPlacesStuff(index)
    {
        if(getPage() !== "powerplace"+index)
        {
            LogUtils_logHHAuto("Navigating to powerplace"+index+" page.");
            gotoPage(getHHScriptVars("pagesIDActivities"),{tab:"pop",index:index});
            // return busy
            return true;
        }
        else
        {
            LogUtils_logHHAuto("On powerplace"+index+" page.");

            //getting reward in case failed on main page
            var querySelectorText = "button[rel='pop_claim']:not([style*='display:none']):not([style*='display: none'])";
            if ($(querySelectorText).length>0)
            {
                $(querySelectorText).click();
                LogUtils_logHHAuto("Claimed powerplace"+index);
                if (StorageHelper_getStoredValue("HHAuto_Setting_autoPowerPlacesAll") !== "true")
                {
                    PlaceOfPower.cleanTempPopToStart();
                    gotoPage(getHHScriptVars("pagesIDPowerplacemain"));
                    return true;
                }
            }

            if ($("div.pop_right_part div.no_girls_message").length >0)
            {
                PlaceOfPower.addPopToUnableToStart(index,"Unable to start Pop "+index+" no girls available.");
                PlaceOfPower.removePopFromPopToStart(index);
                return false;
            }


            if (StorageHelper_getStoredValue("HHAuto_Setting_autoPowerPlacesPrecision") === "true") {
                if (document.getElementsByClassName("acting-power-text").length>0) {

                    // How much power is needed
                    const powerElement = document.getElementsByClassName("acting-power-text");
                    let powerText = powerElement[0].innerText;

                    powerText = powerText.substring(powerText.indexOf("/")+1);
                    if (powerText.includes("k") || powerText.includes("K")) {
                        powerText = parseInt(parseFloat(powerText) * 1000);
                    } else if (powerText.includes("m") || powerText.includes("M")) {
                        powerText = parseInt(parseFloat(powerText * 1000000));
                    } else {
                        powerText = parseInt(powerText)
                    }

                    // Goal is to select girls which add to required power without going over
                    // Once completed, if the time will be under 7.5 hours, proceed
                    let girlsList = [];
                    if (document.querySelectorAll('[girl]').length>0) {
                        let availGirls = document.querySelectorAll('[girl]');
                        availGirls.forEach(girl=>{
                            const girlObj = {
                                id : parseInt(girl.attributes["girl"].value),
                                power : parseInt(girl.attributes["skill"].value)
                            }
                            girlsList.push(girlObj);

                        });
                        girlsList.sort((a,b) => {
                            return a.power - b.power;
                        });

                        //Debug can be enabled by manually setting "HHAuto_Temp_Debug" to true in browser console
                        const debugEnabled = Boolean(StorageHelper_getStoredValue("HHAuto_Temp_Debug")!==undefined?(StorageHelper_getStoredValue("HHAuto_Temp_Debug")===true?true:false):false);
                        let startTime = 0;
                        if (debugEnabled) {
                            LogUtils_logHHAuto("PoP debug is enabled");
                            startTime = performance.now();
                        }

                        let girlOptions = [];

                        for (let i = girlsList.length - 1; i >= 0; i--) {
                            const loopGirls = girlsList.slice(0, i + 1);
                            const loopPower = powerText;
                            const loopOptions = PlaceOfPower.girlPower(loopPower, loopGirls, []);
                            girlOptions.push(loopOptions);
                        };

                        let teamScore = 0;
                        let chosenTeam = [];
                        girlOptions.forEach((theseGirls) => {
                            let thisPower = 0;
                            theseGirls.forEach((girl) => {
                                thisPower += girl.power;
                            });
                            // Give the team a score to try and use more efficient teams (ie: fewer girls) instead of just the fastest
                            const kValue = 40;
                            const xValue = thisPower / powerText;
                            const thisScore = Math.min(1, ( (1 - Math.pow(xValue, theseGirls.length)) / (1 - Math.pow(xValue, kValue))));
                            if (thisScore > teamScore) {
                                teamScore = thisScore;
                                chosenTeam = theseGirls;
                            };
                        });

                        if (debugEnabled) {
                            const endTime = performance.now();
                            LogUtils_logHHAuto("PoP precision: calculating this team took "+ (endTime-startTime) +"ms");
                        }

                        availGirls.forEach(availGirl => {
                            chosenTeam.forEach(chosenGirl => {
                                if (parseInt(availGirl.attributes["girl"].value) == chosenGirl.id) {
                                    availGirl.click();
                                };
                            });
                        });
                    };
                };

                if (document.getElementsByClassName("pop_remaining").length>0){
                    if (document.getElementsByClassName("pop_remaining")[0].children.length>0) {
                        const remainText = document.getElementsByClassName("pop_remaining")[0].children[0].innerText
                        LogUtils_logHHAuto("PoP remainText: " + remainText);
                        const hasRemainDays = remainText.includes("d");
                        // If for some reason we cannot parse the text, set time too high to start
                        // This may cause undesirable loops but for now is considered better than having girls stuck in PoP for days
                        const remainHours = remainText.indexOf("h")?parseInt(remainText.substring(remainText.indexOf("h")-2, remainText.indexOf("h"))):9;
                        const remainMins = remainText.indexOf("m")?parseInt(remainText.substring(remainText.indexOf("m")-2, remainText.indexOf("m"))):59;

                        // If we weren't able to get under 7.5 hours, skip
                        if ((hasRemainDays) || (remainHours > 7) || ((remainHours == 7) && (remainMins > 30))) {
                            PlaceOfPower.addPopToUnableToStart(index,"Unable to start Pop "+index+" too much time remaining.");
                            PlaceOfPower.removePopFromPopToStart(index);
                            return false;
                        } else {
                            querySelectorText = "button.blue_button_L[rel='pop_action']:not([disabled])"
                            if ($(querySelectorText).length>0)
                            {
                                document.querySelector(querySelectorText).click();
                                LogUtils_logHHAuto("Started powerplace"+index);
                            };
                        };
                    };
                };
            } else {
                if ($("div.grid_view div.not_selected").length === 1)
                {
                    $("div.grid_view div.not_selected").click();
                    LogUtils_logHHAuto("Only one girl available for powerplace n°"+index+ " assigning her.");
                }
                else
                {
                    querySelectorText = "button.blue_button_L[rel='pop_auto_assign']:not([disabled])"
                    if ($(querySelectorText).length>0)
                    {
                        document.querySelector(querySelectorText).click();
                        LogUtils_logHHAuto("Autoassigned powerplace"+index);
                    }
                }
                querySelectorText = "button.blue_button_L[rel='pop_action']:not([disabled])"
                if ($(querySelectorText).length>0)
                {
                    document.querySelector(querySelectorText).click();
                    LogUtils_logHHAuto("Started powerplace"+index);
                }
                else if ($("button.blue_button_L[rel='pop_action'][disabled]").length >0 && $("div.grid_view div.pop_selected").length >0)
                {
                    PlaceOfPower.addPopToUnableToStart(index,"Unable to start Pop "+index+" not enough girls available.");
                    PlaceOfPower.removePopFromPopToStart(index);
                    return false;
                }
            };

            PlaceOfPower.removePopFromPopToStart(index);
            // Not busy
            return false;
        }
    }
}
;// CONCATENATED MODULE: ./src/Module/TeamModule.js


class TeamModule {
    
    static moduleChangeTeam()
    {
        if (document.getElementById("ChangeTeamButton") !== null || document.getElementById("ChangeTeamButton2") !== null)
        {
            return;
        }
        let ChangeTeamButton = '<div style="position: absolute;left: 60%;top: 110px;width:60px;z-index:10" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("ChangeTeamButton","tooltip")+'</span><label style="font-size:small" class="myButton" id="ChangeTeamButton">'+getTextForUI("ChangeTeamButton","elementText")+'</label></div>'
        let ChangeTeamButton2 = '<div style="position: absolute;left: 60%;top: 180px;width:60px;z-index:10" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("ChangeTeamButton2","tooltip")+'</span><label style="font-size:small" class="myButton" id="ChangeTeamButton2">'+getTextForUI("ChangeTeamButton2","elementText")+'</label></div>'

        GM_addStyle('.topNumber{top: 2px;left: 12px;width: 100%;position: absolute;text-shadow: 1px 1px 1px black, -1px -1px 1px black;}');

        $("#contains_all section").append(ChangeTeamButton);
        $("#contains_all section").append(ChangeTeamButton2);

        function assignTopTeam()
        {
            function selectFromHaremBest(i,best)
            {
                let girlToSelect = best?i:i+7;
                //console.log(i,girlToSelect,best);
                let selectedGirl = $('#contains_all section '+getHHScriptVars("IDpanelEditTeam")+' .harem-panel .panel-body .topNumber[position="'+girlToSelect+'"]');
                selectedGirl.click();
                //console.log(selectedGirl);
                if ($('.topNumber').length > girlToSelect && i<7)
                {
                    setTimeout(function () {assignToTeam(i+1,best)},randomInterval(300,600));
                }
                else
                {
                    if (!best)
                    {
                        assignToTeam(1,true);
                    }
                    else
                    {
                        $("#validate-team").click();
                    }
                }

            }

            function assignToTeam(i=1,best=false)
            {
                let position=i-1;
                let selectedPosition = $('#contains_all section .player-panel .player-team .team-hexagon .team-member-container.selectable[data-team-member-position="'+position+'"]');
                selectedPosition.click();
                //console.log(selectedPosition);
                setTimeout(function () {selectFromHaremBest(i,best)},randomInterval(300,600));

            }

            let topNumbers=$('.topNumber')
            if (topNumbers.length >0)
            {
                assignToTeam();
            }
        }

        function setTopTeam(sumFormulaType)
        {
            let arr = $('div[id_girl]');
            let numTop = 16;
            if (numTop > arr.length) numTop = arr.length;
            let deckID = [];
            let deckStat = [];
            for (let z = 0; z < numTop; z++)
            {
                deckID.push(-1);
                deckStat.push(-1);
            }
            let levelPlayer = Number(getHHVars('Hero.infos.level'));
            for (let i = arr.length - 1; i > -1; i--)
            {
                let gID = Number($(arr[i]).attr('id_girl'));
                let obj = JSON.parse($('.girl_img', $(arr[i])).attr(getHHScriptVars('girlToolTipData')));
                //sum formula
                let tempGrades = obj.graded2;
                //console.log(obj,tempGrades);
                let countTotalGrades = (tempGrades.match(/<g/g) || []).length;
                let countFreeGrades = (tempGrades.match(/grey/g) || []).length;
                let currentStat = obj.caracs.carac1 + obj.caracs.carac2 + obj.caracs.carac3;
                //console.log(currentStat);
                if (sumFormulaType == 1)
                {
                    currentStat = obj.caracs.carac1 + obj.caracs.carac2 + obj.caracs.carac3;
                } else  if (sumFormulaType == 2)
                {
                    currentStat = (obj.caracs.carac1 + obj.caracs.carac2 + obj.caracs.carac3) / obj.level * levelPlayer / (1 + 0.3 * (countTotalGrades - countFreeGrades)) * (1 + 0.3 * (countTotalGrades));
                }
                //console.log(obj.level,levelPlayer,countTotalGrades,countFreeGrades);
                //console.log(currentStat);
                let lowNum = 0; //num
                let lowStat = deckStat[0]; //stat
                for (let j = 1; j < deckID.length; j++)
                {
                    if (deckStat[j] < lowStat)
                    {
                        lowNum = j;
                        lowStat = deckStat[j];
                    }
                }
                if (lowStat < currentStat)
                {
                    deckID[lowNum] = gID;
                    deckStat[lowNum] = currentStat;
                }
            }
            let tmpID = 0;
            let tmpStat = 0;
            //console.log(deckStat,deckID);
            for (let i = 0; i < deckStat.length; i++)
            {
                for (let j = i; j < deckStat.length; j++)
                {
                    if (deckStat[j] > deckStat[i]) {
                        tmpID = deckID[i];
                        tmpStat = deckStat[i];
                        deckID[i] = deckID[j];
                        deckStat[i] = deckStat[j];
                        deckID[j] = tmpID;
                        deckStat[j] = tmpStat;
                    }
                }
            }
            //console.log(deckStat,deckID);
            for (let i = arr.length - 1; i > -1; i--)
            {
                let gID = Number($(arr[i]).attr('id_girl'));
                if (!deckID.includes(gID)) {
                    arr[i].style.display = "none";
                } else {
                    arr[i].style.display = "";
                }
            }
            let mainTeamPanel = $(getHHScriptVars("IDpanelEditTeam")+' .change-team-panel .panel-body > .harem-panel-girls');
            for (let j = 0; j < deckID.length; j++)
            {
                let newDiv
                let arrSort = $('div[id_girl='+deckID[j]+']');
                if ($(arrSort[0]).find('.topNumber').length==0){
                    newDiv = document.createElement("div");
                    newDiv.className = "topNumber";
                    arrSort[0].prepend(newDiv);
                } else {
                    newDiv =  $(arrSort[0]).find('.topNumber')[0];
                }
                $(arrSort[0]).find('.topNumber')[0];
                newDiv.innerText=j + 1;
                newDiv.setAttribute('position',j+1);
                // Go to girl update page on double click
                newDiv.setAttribute("ondblclick","window.location.href='/girl/"+deckID[j]+"'");
                mainTeamPanel.append(arrSort[0]);
            }
            if (document.getElementById("AssignTopTeam") !== null )
            {
                return;
            }
            else
            {
                let AssignTopTeam = '<div style="position: absolute;top: 80px;width:60px;z-index:10" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("AssignTopTeam","tooltip")+'</span><label style="font-size:small" class="myButton" id="AssignTopTeam">'+getTextForUI("AssignTopTeam","elementText")+'</label></div>'
                $("#contains_all section "+getHHScriptVars("IDpanelEditTeam")+" .harem-panel .panel-body").append(AssignTopTeam);
                document.getElementById("AssignTopTeam").addEventListener("click", assignTopTeam);
            }
        }

        document.getElementById("ChangeTeamButton").addEventListener("click", function(){setTopTeam(1)});
        document.getElementById("ChangeTeamButton2").addEventListener("click", function(){setTopTeam(2)});
    }
}
;// CONCATENATED MODULE: ./src/Module/index.js























;// CONCATENATED MODULE: ./src/config/HHEnvVariables.js



const HHKnownEnvironnements = {};
HHKnownEnvironnements["www.hentaiheroes.com"] = {name:"HH_prod",id:"hh_hentai"};
HHKnownEnvironnements["test.hentaiheroes.com"] = {name:"HH_test",id:"hh_hentai"};
HHKnownEnvironnements["www.comixharem.com"] = {name:"CH_prod",id:"hh_comix", baseImgPath:"https://ch.hh-content.com"};
HHKnownEnvironnements["www.gayharem.com"] = {name:"GH_prod",id:"hh_gay"};
HHKnownEnvironnements["www.hornyheroes.com"] = {name:"SH_prod",id:"hh_sexy"};
HHKnownEnvironnements["nutaku.comixharem.com"] = {name:"NCH_prod",id:"hh_comix"};
HHKnownEnvironnements["nutaku.haremheroes.com"] = {name:"NHH_prod",id:"hh_hentai"};
HHKnownEnvironnements["nutaku.gayharem.com"] = {name:"NGH_prod",id:"hh_gay"};
HHKnownEnvironnements["thrix.hentaiheroes.com"] = {name:"THH_prod",id:"hh_hentai"};
HHKnownEnvironnements["eroges.gayharem.com"] = {name:"EGH_prod",id:"hh_gay"};
HHKnownEnvironnements["eroges.hentaiheroes.com"] = {name:"EHH_prod",id:"hh_hentai"};
HHKnownEnvironnements["esprit.hentaiheroes.com"] = {name:"OGHH_prod",id:"hh_hentai"};
HHKnownEnvironnements["www.pornstarharem.com"] = {name:"PH_prod",id:"hh_star", baseImgPath:"https://th.hh-content.com"};
HHKnownEnvironnements["nutaku.pornstarharem.com"] = {name:"NPH_prod",id:"hh_star", baseImgPath:"https://th.hh-content.co"};
HHKnownEnvironnements["www.transpornstarharem.com"] = {name:"TPH_prod",id:"hh_startrans", baseImgPath:"https://images.hh-content.com/startrans"};
HHKnownEnvironnements["nutaku.transpornstarharem.com"] = {name:"NTPH_prod",id:"hh_startrans", baseImgPath:"https://images.hh-content.com/startrans"};
HHKnownEnvironnements["www.mangarpg.com"] = {name:"MRPG_prod",id:"hh_mangarpg", baseImgPath:"https://mh.hh-content.com"};


const HHEnvVariables = {};
HHEnvVariables["global"] = {};
for (let i in HHKnownEnvironnements)
{
    HHEnvVariables[HHKnownEnvironnements[i].name] = {};
    HHEnvVariables[HHKnownEnvironnements[i].name].gameID = HHKnownEnvironnements[i].id;
    HHEnvVariables[HHKnownEnvironnements[i].name].HHGameName = HHKnownEnvironnements[i].name;
    let baseImgPath =  HHKnownEnvironnements[i].baseImgPath ? HHKnownEnvironnements[i].baseImgPath : 'https://hh2.hh-content.com';
    HHEnvVariables[HHKnownEnvironnements[i].name].baseImgPath = baseImgPath;
}

HHEnvVariables["global"].eventIDReg = "event_";
HHEnvVariables["global"].mythicEventIDReg = "mythic_event_";
HHEnvVariables["global"].bossBangEventIDReg = "boss_bang_event_";
HHEnvVariables["global"].sultryMysteriesEventIDReg = "sm_event_";
HHEnvVariables["global"].poaEventIDReg = "path_event_";
HHEnvVariables["global"].girlToolTipData = "data-new-girl-tooltip";
HHEnvVariables["global"].dailyRewardNotifRequest = "#contains_all header .currency .daily-reward-notif";
HHEnvVariables["global"].IDpanelEditTeam = "#edit-team-page"
HHEnvVariables["global"].shopGirlCountRequest = '#girls_list .g1 .nav_placement span:not([contenteditable]';
HHEnvVariables["global"].shopGirlCurrentRequest = '#girls_list .g1 .nav_placement span[contenteditable]';
HHEnvVariables["global"].contestMaxDays = 21;
HHEnvVariables["global"].selectorFilterNotDisplayNone = ':not([style*="display:none"]):not([style*="display: none"])';
HHEnvVariables["global"].selectorClaimAllRewards = "#claim-all:not([disabled]):visible:not([style*='visibility: hidden;'])"; // KK use visibility: hidden or visibility: visible to display this button
HHEnvVariables["global"].HaremMaxSizeExpirationSecs = 7*24*60*60;//7 days
HHEnvVariables["global"].HaremMinSizeExpirationSecs = 24*60*60;//1 days
HHEnvVariables["global"].LeagueListExpirationSecs = 60*60;//1 hour max
HHEnvVariables["global"].minSecsBeforeGoHomeAfterActions = 10;
HHEnvVariables["global"].dailyRewardMaxRemainingTime = 2*60*60;
HHEnvVariables["global"].maxCollectionDelay = 4*60*60;
HHEnvVariables["global"].STOCHASTIC_SIM_RUNS = 10000;
HHEnvVariables["global"].PoVPoGTimestampAttributeName = "data-time-stamp";
HHEnvVariables["global"].ELEMENTS =
    {
    chance: {
        darkness: 'light',
        light: 'psychic',
        psychic: 'darkness'
    },
    egoDamage: {
        fire: 'nature',
        nature: 'stone',
        stone: 'sun',
        sun: 'water',
        water: 'fire'
    }
};
HHEnvVariables["global"].powerCalcImages =
    {
    plus:   "https://i.postimg.cc/qgkpN0sZ/Opponent-green.png",
    close:  "https://i.postimg.cc/3JCgVBdK/Opponent-orange.png",
    minus:  "https://i.postimg.cc/PxgxrBVB/Opponent-red.png",
    chosen: "https://i.postimg.cc/MfKwNbZ8/Opponent-go.png"
};

HHEnvVariables["global"].possibleRewardsList = {'energy_kiss' : "Kisses",
                                                'energy_quest' : "Quest energy",
                                                'energy_fight' : "Fights",
                                                'xp' : "Exp",
                                                'girl_shards' : "Girl shards",
                                                'soft_currency' : "Ymens",
                                                'hard_currency' : "Kobans",
                                                'gift':"Gifts",
                                                'potion' : "Potions",
                                                'booster' : "Boosters",
                                                'orbs': "Orbs",
                                                'gems' : "Gems",
                                                'scrolls' : "Light Bulbs",
                                                'mythic' : "Mythic Rquipment",
                                                'avatar': "Avatar",
                                                'ticket' : "Champions' tickets"};

HHEnvVariables["global"].trollzList =  ["Latest",
                                        "Dark Lord",
                                        "Ninja Spy",
                                        "Gruntt",
                                        "Edwarda",
                                        "Donatien",
                                        "Silvanus",
                                        "Bremen",
                                        "Finalmecia",
                                        "Roko Senseï",
                                        "Karole",
                                        "Jackson\'s Crew",
                                        "Pandora witch",
                                        "Nike",
                                        "Sake",
                                        "WereBunny Police",
                                        "Auga"];

HHEnvVariables["global"].trollGirlsID = [
    [['8', '9', '10'], ['7270263'], ['979916751']],
    [['14', '13', '12'], ['318292466'], ['936580004']],
    [['19', '16', '18'], ['610468472'], ['54950499']],
    [['29', '28', '26'], ['4749652'], ['345655744']],
    [['39', '40', '41'], ['267784162'], ['763020698']],
    [['64', '63', '31'], ['406004250'], ['864899873']],
    [['85', '86', '84'], ['267120960'], ['536361248']],
    [['114', '115', '116'], ['379441499'], ['447396000']],
    [['1247315', '4649579', '7968301'], ['46227677'], ['933487713']],
    [['1379661', '4479579', '1800186'], ['985085118'], ['339765042']],
    [['24316446', '219651566', '501847856'], ['383709663'], ['90685795']],
    [['225365882', '478693885', '231765083'], ['155415482'], ['769649470']],
    [['86962133', '243793871', '284483399'], [0], [0]],
    [['612527302', '167231135', '560979916', '184523411', '549524850', '784911160'], [0], [0]],
    [['164866290', '696124016', '841591253'], [0], [0]],
    [['344730128', '735302216', '851893423'], [0], [0]],
];
HHEnvVariables["global"].lastQuestId = 1768; //  TODO update when new quest comes

HHEnvVariables["global"].leaguesList = ["Wanker I",
                                        "Wanker II",
                                        "Wanker III",
                                        "Sexpert I",
                                        "Sexpert II",
                                        "Sexpert III",
                                        "Dicktator I",
                                        "Dicktator II",
                                        "Dicktator III"];
switch (getLanguageCode())
{
    case "fr":
        HHEnvVariables["global"].trollzList = ["Dernier",
                                               "Dark Lord",
                                               "Espion Ninja",
                                               "Gruntt",
                                               "Edwarda",
                                               "Donatien",
                                               "Silvanus",
                                               "Bremen",
                                               "Finalmecia",
                                               "Roko Senseï",
                                               "Karole",
                                               "Jackson",
                                               "Pandora",
                                               "Nike",
                                               "Sake",
                                               "Police des Lapines-Garous",
                                               "Auga"];
        HHEnvVariables["global"].leaguesList = ["Branleur I",
                                                "Branleur II",
                                                "Branleur III",
                                                "Sexpert I",
                                                "Sexpert II",
                                                "Sexpert III",
                                                "Dicktateur I",
                                                "Dicktateur II",
                                                "Dicktateur III"];
        break;
    default:

        break;
}

function compareOwnFirst(a, b, final_comparaison)
{
    if (a.own && !b.own) {
        return -1
    } else if (!a.own && b.own) {
        return 1
    }
    return final_comparaison
}

HHEnvVariables["global"].haremSortingFunctions = {};
HHEnvVariables["global"].haremSortingFunctions.DateAcquired = function (a, b)
{
    if (a.gData.own && b.gData.own) {
        var dateA = new Date(a.gData.date_added).getTime();
        var dateB = new Date(b.gData.date_added).getTime();
        return dateA - dateB
    } else if (a.gData.own && !b.gData.own)
        return -1;
    else if (!a.gData.own && b.gData.own)
        return 1;
    else
        return b.shards - a.shards
};
HHEnvVariables["global"].haremSortingFunctions.Name = function sortByName(a, b)
{
    var nameA = a.gData.name.toUpperCase();
    var nameB = b.gData.name.toUpperCase();
    if (a.gData.own == b.gData.own) {
        if (nameA < nameB)
            return -1;
        if (nameA > nameB)
            return 1;
        return 0
    } else if (a.gData.own && !b.gData.own)
        return -1;
    else if (!a.gData.own && b.gData.own)
        return 1
};
HHEnvVariables["global"].haremSortingFunctions.Grade = function sortByGrade(a, b)
{
    return compareOwnFirst(a.gData, b.gData, b.gData.graded - a.gData.graded)
};
HHEnvVariables["global"].haremSortingFunctions.Level = function sortByLevel(a, b)
{
    return compareOwnFirst(a.gData, b.gData, b.gData.level - a.gData.level)
};
HHEnvVariables["global"].haremSortingFunctions.Power = function sortByPower(a, b)
{
    return compareOwnFirst(a.gData, b.gData, b.gData.caracs.carac1 + b.gData.caracs.carac2 + b.gData.caracs.carac3 - a.gData.caracs.carac1 - a.gData.caracs.carac2 - a.gData.caracs.carac3)
}
HHEnvVariables["global"].haremSortingFunctions.upgrade_cost = function sortByUpgradeCost(a, b)
{
    const aCost = (Number(a.gData.nb_grades) === Number(a.gData.graded) || !a.gData.own ) ? 0 : Harem.getGirlUpgradeCost(a.gData.rarity, a.gData.graded + 1);
    const bCost = (Number(b.gData.nb_grades) === Number(b.gData.graded) || !b.gData.own ) ? 0 : Harem.getGirlUpgradeCost(b.gData.rarity, b.gData.graded + 1);
    return compareOwnFirst(a.gData, b.gData, bCost - aCost )
}

HHEnvVariables["global"].pagesKnownList = [];

HHEnvVariables["global"].pagesIDHome = "home";
HHEnvVariables["global"].pagesURLHome = "/home.html";
HHEnvVariables["global"].pagesKnownList.push("Home");

HHEnvVariables["global"].pagesIDMissions = "missions";
HHEnvVariables["global"].pagesKnownList.push("Missions");

HHEnvVariables["global"].pagesIDContests = "contests";
HHEnvVariables["global"].pagesKnownList.push("Contests");

HHEnvVariables["global"].pagesIDDailyGoals = "daily_goals";
HHEnvVariables["global"].pagesKnownList.push("DailyGoals");

HHEnvVariables["global"].pagesIDQuest = "quest";
HHEnvVariables["global"].pagesKnownList.push("Quest");

HHEnvVariables["global"].pagesIDActivities = "activities";
HHEnvVariables["global"].pagesURLActivities = "/activities.html";
HHEnvVariables["global"].pagesKnownList.push("Activities");

HHEnvVariables["global"].pagesIDHarem = "harem";
HHEnvVariables["global"].pagesURLHarem = "/harem.html";
HHEnvVariables["global"].pagesKnownList.push("Harem");

HHEnvVariables["global"].pagesIDGirlPage = "girl";
HHEnvVariables["global"].pagesKnownList.push("GirlPage");

HHEnvVariables["global"].pagesIDMap = "map";
HHEnvVariables["global"].pagesURLMap = "/map.html";
HHEnvVariables["global"].pagesKnownList.push("Map");

HHEnvVariables["global"].pagesIDPachinko = "pachinko";
HHEnvVariables["global"].pagesURLPachinko = "/pachinko.html";
HHEnvVariables["global"].pagesKnownList.push("Pachinko");

HHEnvVariables["global"].pagesIDLeaderboard = "leaderboard";
HHEnvVariables["global"].pagesURLLeaderboard = "/tower-of-fame.html";
HHEnvVariables["global"].pagesKnownList.push("Leaderboard");

HHEnvVariables["global"].pagesIDShop = "shop";
HHEnvVariables["global"].pagesURLShop = "/shop.html";
HHEnvVariables["global"].pagesKnownList.push("Shop");

HHEnvVariables["global"].pagesIDClub = "clubs";
HHEnvVariables["global"].pagesURLClub = "/clubs.html";
HHEnvVariables["global"].pagesKnownList.push("Club");

HHEnvVariables["global"].pagesIDPantheon = "pantheon";
HHEnvVariables["global"].pagesURLPantheon = "/pantheon.html";
HHEnvVariables["global"].pagesKnownList.push("Pantheon");

HHEnvVariables["global"].pagesIDPantheonPreBattle = "pantheon-pre-battle";
HHEnvVariables["global"].pagesURLPantheonPreBattle = "/pantheon-pre-battle.html";
HHEnvVariables["global"].pagesKnownList.push("PantheonPreBattle");

HHEnvVariables["global"].pagesIDChampionsPage = "champions";
HHEnvVariables["global"].pagesKnownList.push("ChampionsPage");

HHEnvVariables["global"].pagesIDChampionsMap = "champions_map";
HHEnvVariables["global"].pagesURLChampionsMap = "/champions-map.html";
HHEnvVariables["global"].pagesKnownList.push("ChampionsMap");

HHEnvVariables["global"].pagesIDSeason = "season";
HHEnvVariables["global"].pagesURLSeason = "/season.html";
HHEnvVariables["global"].pagesKnownList.push("Season");

HHEnvVariables["global"].pagesIDSeasonArena = "season_arena";
HHEnvVariables["global"].pagesURLSeasonArena = "/season-arena.html";
HHEnvVariables["global"].pagesKnownList.push("SeasonArena");

HHEnvVariables["global"].pagesIDClubChampion = "club_champion";
HHEnvVariables["global"].pagesURLClubChampion = "/club-champion.html";
HHEnvVariables["global"].pagesKnownList.push("ClubChampion");

HHEnvVariables["global"].pagesIDLeagueBattle = "league-battle";
HHEnvVariables["global"].pagesURLLeagueBattle = "/league-battle.html";
HHEnvVariables["global"].pagesKnownList.push("LeagueBattle");

HHEnvVariables["global"].pagesIDLeaguePreBattle = "leagues-pre-battle";
HHEnvVariables["global"].pagesURLLeaguPreBattle = "/leagues-pre-battle.html";
HHEnvVariables["global"].pagesKnownList.push("LeaguePreBattle");

HHEnvVariables["global"].pagesIDTrollBattle = "troll-battle";
HHEnvVariables["global"].pagesURLTrollBattle = "/troll-battle.html";
HHEnvVariables["global"].pagesKnownList.push("TrollBattle");

HHEnvVariables["global"].pagesIDSeasonBattle = "season-battle";
HHEnvVariables["global"].pagesURLSeasonBattle = "/season-battle.html";
HHEnvVariables["global"].pagesKnownList.push("SeasonBattle");

HHEnvVariables["global"].pagesIDPantheonBattle = "pantheon-battle";
HHEnvVariables["global"].pagesURLPantheonBattle = "/pantheon-battle.html";
HHEnvVariables["global"].pagesKnownList.push("PantheonBattle");

HHEnvVariables["global"].pagesIDTrollPreBattle = "troll-pre-battle";
HHEnvVariables["global"].pagesURLTrollPreBattle = "/troll-pre-battle.html";
HHEnvVariables["global"].pagesKnownList.push("TrollPreBattle");

HHEnvVariables["global"].pagesIDEvent = "event";
HHEnvVariables["global"].pagesURLEvent = "/event.html";
HHEnvVariables["global"].pagesKnownList.push("Event");

HHEnvVariables["global"].pagesIDPoV = "path-of-valor";
HHEnvVariables["global"].pagesURLPoV = "/path-of-valor.html";
HHEnvVariables["global"].pagesKnownList.push("PoV");

HHEnvVariables["global"].pagesIDPoG = "path-of-glory";
HHEnvVariables["global"].pagesURLPoG = "/path-of-glory.html";
HHEnvVariables["global"].pagesKnownList.push("PoG");

HHEnvVariables["global"].pagesIDSeasonalEvent = "seasonal";
HHEnvVariables["global"].pagesURLSeasonalEvent = "/seasonal.html";
HHEnvVariables["global"].pagesKnownList.push("SeasonalEvent");

HHEnvVariables["global"].pagesIDPowerplacemain = "powerplacemain";
HHEnvVariables["global"].pagesKnownList.push("Powerplacemain");

HHEnvVariables["global"].pagesIDBattleTeams = "teams";
HHEnvVariables["global"].pagesURLBattleTeams = "/teams.html";
HHEnvVariables["global"].pagesKnownList.push("BattleTeams");

HHEnvVariables["global"].pagesIDEditTeam = "edit-team";
HHEnvVariables["global"].pagesURLEditTeam = "";
HHEnvVariables["global"].pagesKnownList.push("EditTeam");

HHEnvVariables["global"].pagesIDPoA = "path_of_attraction";
HHEnvVariables["global"].pagesKnownList.push("PoA");

HHEnvVariables["global"].pagesIDBossBang = "boss-bang-battle";
HHEnvVariables["global"].pagesKnownList.push("BossBang");

HHEnvVariables["global"].isEnabledEvents = true;
HHEnvVariables["global"].isEnabledTrollBattle = true;
HHEnvVariables["global"].isEnabledPachinko = true;
HHEnvVariables["global"].isEnabledGreatPachinko = true;
HHEnvVariables["global"].isEnabledMythicPachinko = true;
HHEnvVariables["global"].isEnabledEquipmentPachinko = true;
HHEnvVariables["global"].isEnabledContest = true;
HHEnvVariables["global"].isEnabledPowerPlaces = true;
HHEnvVariables["global"].isEnabledMission = true;
HHEnvVariables["global"].isEnabledQuest = true;
HHEnvVariables["global"].isEnabledSideQuest = true;
HHEnvVariables["global"].isEnabledSeason = true;
HHEnvVariables["global"].isEnabledPantheon = true;
HHEnvVariables["global"].isEnabledAllChamps = true;
HHEnvVariables["global"].isEnabledChamps = true;
HHEnvVariables["global"].isEnabledClubChamp = true;
HHEnvVariables["global"].isEnabledLeagues = true;
HHEnvVariables["global"].isEnabledDailyRewards = true;
HHEnvVariables["global"].isEnabledFreeBundles = true;
HHEnvVariables["global"].isEnabledShop = true;
HHEnvVariables["global"].isEnabledSalary = true;
HHEnvVariables["global"].isEnabledPoVPoG = true;
HHEnvVariables["global"].isEnabledPoV = true;
HHEnvVariables["global"].isEnabledPoG = true;
HHEnvVariables["global"].isEnabledSeasonalEvent = true;
HHEnvVariables["global"].isEnabledBossBangEvent = true;
HHEnvVariables["global"].isEnabledSultryMysteriesEvent = true;
HHEnvVariables["global"].isEnabledDailyGoals = true;
HHEnvVariables["HH_test"].isEnabledDailyRewards = false;// to remove if daily rewards arrives in test
HHEnvVariables["HH_test"].isEnabledFreeBundles = false;// to remove if bundles arrives in test
["CH_prod","NCH_prod"].forEach((element) => {
    HHEnvVariables[element].trollzList = ['Latest',
                                          'BodyHack',
                                          'Grey Golem',
                                          'The Nymph',
                                          'Athicus Ho’ole',
                                          'The Mimic',
                                          'Cockatrice',
                                          'Pomelo',
                                          'Alexa Sl\'Thor'];
});
["CH_prod","NCH_prod"].forEach((element) => {
    HHEnvVariables[element].trollGirlsID = [
        [['830009523', '907801218', '943323021'], [0], [0]],
        [['271746999', '303805209', '701946373'], [0], [0]],
        [['743748788', '977228200', '943323021'], [0], [0]],
        [['140401381', '232860230', '514994766'], [0], [0]],
        [['623293037', '764791769', '801271903'], [0], [0]],
        [['921365371', '942523553', '973271744'], [0], [0]],
        [['364639341', '879781833', '895546748'], [0], [0]],
        [['148877065', '218927643', '340369336'], [0], [0]],
    ];
    HHEnvVariables[element].lastQuestId = -1; //  TODO update when new quest comes
});
HHEnvVariables["SH_prod"].isEnabledSideQuest = false;// to remove when SideQuest arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPowerPlaces = false;// to remove when PoP arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledMythicPachinko = false;// to remove when Mythic Pachinko arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledEquipmentPachinko = false;// to remove when Equipment Pachinko arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledAllChamps = false;// to remove when Champs arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledChamps = false;// to remove when Champs arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledClubChamp = false;// to remove when Club Champs arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPantheon = false;// to remove when Pantheon arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPoVPoG = false;
HHEnvVariables["SH_prod"].isEnabledPoV = false;// to remove when PoV arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPoG = false;// to remove when PoG arrives in hornyheroes
HHEnvVariables["SH_prod"].lastQuestId = -1; //  TODO update when new quest comes
HHEnvVariables["MRPG_prod"].isEnabledSideQuest = false;// to remove when SideQuest arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledMythicPachinko = false;// to remove when Mythic Pachinko arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledEquipmentPachinko = false;// to remove when Equipment Pachinko arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledClubChamp = false;// to remove when Club Champs arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledPantheon = false;// to remove when Pantheon arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledSeasonalEvent = false;// to remove when event arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledBossBangEvent = false;// to remove when event arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledSultryMysteriesEvent = false;// to remove when event arrives in Manga RPG
HHEnvVariables["MRPG_prod"].lastQuestId = -1; //  TODO update when new quest comes
HHEnvVariables["MRPG_prod"].trollzList = ['Latest',
                                        'William Scarlett'];
["PH_prod","NPH_prod"].forEach((element) => {
    HHEnvVariables[element].trollzList = ['Latest',
                                          'Headmistress Asa Akira',
                                          'Sammy Jayne',
                                          'Ivy Winters',
                                          'Sophia  Jade',
                                          'Amia Miley',
                                          'Alyssa Reece',
                                          'Kelly Kline',
                                          'Jamie Brooks',
                                          'Jordan Kingsley',
                                          'EMPTY',
                                          'Sierra Sinn',
                                          'Jasmine Jae'];
    HHEnvVariables[element].isEnabledPoG = false;// to remove when PoG arrives in pornstar
    HHEnvVariables[element].lastQuestId = 14060; //  TODO update when new quest comes
});
["PH_prod","NPH_prod"].forEach((element) => {
    HHEnvVariables[element].trollGirlsID = [
        [['261345306', '795788039', '973280579'], [0], [0]],
        [['482529771', '658322339', '833308213'], [0], [0]],
        [['117837840', '160370794', '306287449', '828011942'], [0], [0]],
        [['564593641', '719705773', '934421949'], [0], [0]],
        [['270611414', '464811282', '781232070'], [0], [0]],
        [['219241809', '380385497', '879198752'], [0], [0]],
        [['165066536', '734325005', '805020628'], [0], [0]],
        [['191661045', '369105612', '665836932'], [0], [0]],
        [['169356639', '383702874', '943667167'], [0], [0]],
        [[0], [0], [0]],
        [['169741198', '459885596', '507702178'], [0], [0]],
        [['258984943', '837109131', '888135956'], [0], [0]],
    ];
});

["TPH_prod","NTPH_prod"].forEach((element) => {
    HHEnvVariables[element].trollzList = ['Latest',
                                          'Ariel Demure',
                                          'Emma Rose',
                                          'Natalie Stone',
                                          'Janie Blade'];
    HHEnvVariables[element].isEnabledSideQuest = false;// to remove when SideQuest arrives in transpornstar
    HHEnvVariables[element].isEnabledPowerPlaces = false;// to remove when PoP arrives in transpornstar
    HHEnvVariables[element].isEnabledClubChamp = false;// to remove when Club Champs arrives in transpornstar
    HHEnvVariables[element].isEnabledPantheon = false;// to remove when Pantheon arrives in transpornstar
    HHEnvVariables[element].isEnabledPoG = false;// to remove when PoG arrives in transpornstar
    HHEnvVariables[element].lastQuestId = -1; //  TODO update when new quest comes
});
["TPH_prod","NTPH_prod"].forEach((element) => {
    HHEnvVariables[element].trollGirlsID = [
        [['171883542', '229180984', '771348244'], [0], [0]],
        [['484962893', '879574564', '910924260'], [0], [0]],
        [['334144727', '667194919', '911144911'], [0], [0]],
        [['473470854', '708191289', '945710078'], [0], [0]],
    ];
    HHEnvVariables[element].lastQuestId = -1; //  TODO update when new quest comes
});

;// CONCATENATED MODULE: ./src/config/HHStoredVars.js



const HHStoredVars_HHStoredVars = {};
//Settings Vars
//Do not move, has to be first one
HHStoredVars_HHStoredVars.HHAuto_Setting_settPerTab =
    {
    default:"false",
    storage:"localStorage",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
// Rest of settings vars
HHStoredVars_HHStoredVars.HHAuto_Setting_autoAff =
    {
    default:"500000000",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoAffW =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoBuyBoosters =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:true
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoBuyBoostersFilter =
    {
    default:"B1;B2;B3;B4",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"List",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoChamps =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
    newValueFunction:function()
    {
        TimerHelper_clearTimer('nextChampionTime');
    }
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoChampsForceStart =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
    newValueFunction:function()
    {
        TimerHelper_clearTimer('nextChampionTime');
    }
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoChampsFilter =
    {
    default:"1;2;3;4;5;6",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"List",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false,
    newValueFunction:function()
    {
        TimerHelper_clearTimer('nextChampionTime');
    }
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoChampsTeamLoop =
    {
    default:"10",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoChampsGirlThreshold =
    {
    default:"0",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoChampsTeamKeepSecondLine =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoChampsUseEne =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_showClubButtonInPoa =
    {
    default:"true",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoClubChamp =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoClubChampMax =
    {
    default:"999",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoClubForceStart =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoContest =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_compactEndedContests =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoExp =
    {
    default:"500000000",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoExpW =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoFreePachinko =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoLeagues =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoLeaguesAllowWinCurrent =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoLeaguesCollect =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoLeaguesBoostedOnly =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoLeaguesThreeFights =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoLeaguesPowerCalc =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_leagueListDisplayPowerCalc =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoLeaguesSelectedIndex =
    {
    default:"0",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"selectedIndex",
    kobanUsing:false,
    customMenuID:"autoLeaguesSelector",
    isValid:/^[0-9]$/
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoLeaguesThreshold =
    {
    default:"0",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoLeaguesSecurityThreshold =
    {
    default:"40",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_compactMissions =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoMission =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoMissionCollect =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoMissionKFirst =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_compactPowerPlace =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoPowerPlaces =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoPowerPlacesAll =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
    newValueFunction:function()
    {
        TimerHelper_clearTimer('minPowerPlacesTime');
        PlaceOfPower.cleanTempPopToStart();
    }
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoPowerPlacesPrecision =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoPowerPlacesInverted =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoPowerPlacesWaitMax =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoPowerPlacesIndexFilter =
    {
    default:"1;2;3",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"List",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false,
    newValueFunction:function()
    {
        TimerHelper_clearTimer('minPowerPlacesTime');
        PlaceOfPower.cleanTempPopToStart();
    }
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoQuest =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoSideQuest =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoQuestThreshold =
    {
    default:"0",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoSalary =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
    newValueFunction:function()
    {
        TimerHelper_clearTimer('nextSalaryTime');
    }
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoSalaryMaxTimer =
    {
    default:"1200",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
/*HHStoredVars.HHAuto_Setting_autoSalaryMinTimer =
    {
    default:"120",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};*/
HHStoredVars_HHStoredVars.HHAuto_Setting_autoSalaryMinSalary =
    {
    default:"20000",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false,
    newValueFunction:function()
    {
        TimerHelper_clearTimer('nextSalaryTime');
    }
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoSeason =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoSeasonCollect =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
    events:{"change":function()
            {
                if (this.checked)
                {
                    getAndStoreCollectPreferences("HHAuto_Setting_autoSeasonCollectablesList");
                    TimerHelper_clearTimer('nextSeasonCollectTime');
                }
            }
           }
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoSeasonCollectAll =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoSeasonCollectablesList =
    {
    default:JSON.stringify([]),
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Array"
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoSeasonPassReds =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:true
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoSeasonThreshold =
    {
    default:"0",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoSeasonBoostedOnly =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoStats =
    {
    default:"500000000",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoStatsSwitch =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoTrollBattle =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoTrollMythicByPassParanoia =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoTrollSelectedIndex =
    {
    default:"0",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false,
    customMenuID:"autoTrollSelector",
    isValid:/^[0-9]|1[0-5]|98|99$/
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoTrollThreshold =
    {
    default:"0",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoChampsForceStartEventGirl =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_buyCombat =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:true
};
HHStoredVars_HHStoredVars.HHAuto_Setting_buyCombTimer =
    {
    default:"16",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_buyMythicCombat =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:true
};
HHStoredVars_HHStoredVars.HHAuto_Setting_buyMythicCombTimer =
    {
    default:"16",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoFreeBundlesCollect =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
    events:{"change":function()
            {
                if (this.checked)
                {
                    getAndStoreCollectPreferences("HHAuto_Setting_autoFreeBundlesCollectablesList", getTextForUI("menuDailyCollectableText","elementText"));
                    TimerHelper_clearTimer('nextFreeBundlesCollectTime');
                }
            }
           }
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoFreeBundlesCollectablesList =
    {
    default:JSON.stringify([]),
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Array"
};
HHStoredVars_HHStoredVars.HHAuto_Setting_waitforContest =
    {
    default:"true",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_mousePause =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_mousePauseTimeout =
    {
    default:"5000",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value"
};
HHStoredVars_HHStoredVars.HHAuto_Setting_collectAllTimer =
    {
    default:"12",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    isValid:/^[1-9][0-9]|[1-9]$/
};
HHStoredVars_HHStoredVars.HHAuto_Setting_eventTrollOrder =
    {
    default:"1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"List",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoBuyTrollNumber =
    {
    default:"20",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"List",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoBuyMythicTrollNumber =
    {
    default:"20",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"List",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_master =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_maxAff =
    {
    default:"50000",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_maxBooster =
    {
    default:"10",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_maxExp =
    {
    default:"10000",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_minShardsX10 =
    {
    default:"10",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false,
    isValid:/^(\d)+$/
};
HHStoredVars_HHStoredVars.HHAuto_Setting_minShardsX50 =
    {
    default:"50",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_updateMarket =
    {
    default:"true",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_paranoia =
    {
    default:"true",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_paranoiaSettings =
    {
    default:"140-320/Sleep:28800-30400|Active:250-460|Casual:1500-2700/6:Sleep|8:Casual|10:Active|12:Casual|14:Active|18:Casual|20:Active|22:Casual|24:Sleep",
    storage:"Storage()",
    HHType:"Setting"
};
HHStoredVars_HHStoredVars.HHAuto_Setting_paranoiaSpendsBefore =
    {
    default:"true",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_plusEvent =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_plusEventMythic =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_plusEventMythicSandalWood =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_bossBangEvent =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_bossBangMinTeam =
    {
    default:"5",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_sultryMysteriesEventRefreshShop =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_collectEventChest =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_PoAMaskRewards =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_PoVMaskRewards =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_PoGMaskRewards =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_SeasonMaskRewards =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_SeasonalEventMaskRewards =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_showCalculatePower =
    {
    default:"true",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_showAdsBack =
    {
    default:"true",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_showRewardsRecap =
    {
    default:"true",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_showInfo =
    {
    default:"true",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_showInfoLeft =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_showMarketTools =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_showTooltips =
    {
    default:"true",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_spendKobans0 =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_kobanBank =
    {
    default:"1000000",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_useX10Fights =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:true
};
HHStoredVars_HHStoredVars.HHAuto_Setting_useX10FightsAllowNormalEvent =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_useX50Fights =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:true
};
HHStoredVars_HHStoredVars.HHAuto_Setting_useX50FightsAllowNormalEvent =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_saveDefaults =
    {
    storage:"localStorage",
    HHType:"Setting"
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoPantheon =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoPantheonThreshold =
    {
    default:"0",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoSeasonalEventCollect =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
    events:{"change":function()
            {
                if (this.checked)
                {
                    getAndStoreCollectPreferences("HHAuto_Setting_autoSeasonalEventCollectablesList");
                    TimerHelper_clearTimer('nextSeasonalEventCollectTime');
                }
            }
           }
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoSeasonalEventCollectAll =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoSeasonalEventCollectablesList =
    {
    default:JSON.stringify([]),
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Array"
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoPoVCollect =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
    events:{"change":function()
            {
                if (this.checked)
                {
                    getAndStoreCollectPreferences("HHAuto_Setting_autoPoVCollectablesList");
                    TimerHelper_clearTimer('nextPoVCollectTime');
                }
            }
           }
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoPoVCollectAll =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoPoVCollectablesList =
    {
    default:JSON.stringify([]),
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Array"
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoPoGCollect =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
    events:{"change":function()
            {
                if (this.checked)
                {
                    getAndStoreCollectPreferences("HHAuto_Setting_autoPoGCollectablesList");
                    TimerHelper_clearTimer('nextPoGCollectTime');
                }
            }
           }
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoPoGCollectAll =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoPoGCollectablesList =
    {
    default:JSON.stringify([]),
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Array"
};
HHStoredVars_HHStoredVars.HHAuto_Setting_compactDailyGoals =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoDailyGoalsCollect =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
    events:{"change":function()
            {
                if (this.checked)
                {
                    getAndStoreCollectPreferences("HHAuto_Setting_autoDailyGoalsCollectablesList", getTextForUI("menuDailyCollectableText","elementText"));
                    TimerHelper_clearTimer('nextDailyGoalsCollectTime');
                }
            }
           }
};
HHStoredVars_HHStoredVars.HHAuto_Setting_autoDailyGoalsCollectablesList =
    {
    default:JSON.stringify([]),
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Array"
};
// Temp vars
HHStoredVars_HHStoredVars.HHAuto_Temp_autoLoop =
    {
    default:"true",
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_battlePowerRequired =
    {
    default:"0",
    storage:"sessionStorage",
    HHType:"Temp"
};
/*HHStoredVars.HHAuto_Temp_leaguesTarget =
    {
    default:"9",
    storage:"sessionStorage",
    HHType:"Temp",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:false,
    menuType:"value",
    kobanUsing:false,
    customMenuID:"autoLeaguesSelector"
};*/
HHStoredVars_HHStoredVars.HHAuto_Temp_questRequirement =
    {
    default:"none",
    storage:"sessionStorage",
    HHType:"Temp"
};
/*HHStoredVars.HHAuto_Temp_userLink =
    {
    default:"none",
    storage:"sessionStorage",
    HHType:"Temp"
};*/
HHStoredVars_HHStoredVars.HHAuto_Temp_autoLoopTimeMili =
    {
    default:"500",
    storage:"Storage()",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_freshStart =
    {
    default:"no",
    storage:"Storage()",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_Logging =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_Debug =
    {
    default: "false",
    storage: "sessionStorage",
    valueType: "Boolean",
    HHType:"Temp"
};
/*HHStoredVars.HHAuto_Temp_trollToFight =
    {
    storage:"sessionStorage",
    HHType:"Temp",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:false,
    menuType:"value",
    kobanUsing:false,
    customMenuID:"autoTrollSelector"
};*/
HHStoredVars_HHStoredVars.HHAuto_Temp_autoTrollBattleSaveQuest =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_burst =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_charLevel =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_filteredGirlsList =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_haremGirlActions =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_haremGirlMode =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_haremGirlEnd =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_haremGirlLimit =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_eventsGirlz =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_eventGirl =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_autoChampsEventGirls =
    {
    storage:"sessionStorage",
    HHType:"Temp"
    //isValid:/^\[({"girl_id":"(\d)+","champ_id":"(\d)+","girl_shards":"(\d)+","girl_name":"([^"])+","event_id":"([^"])+"},?)+\]$/
};
HHStoredVars_HHStoredVars.HHAuto_Temp_trollWithGirls =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_fought =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_haveAff =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_haveExp =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_haveBooster =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_hideBeatenOppo =
{
    default:"0",
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_LeagueOpponentList =
    {
    storage:"sessionStorage",
    HHType:"Temp",
    isValid:/^{"expirationDate":\d+,"opponentsList":{("\d+":{((("(win|loss|avgTurns)":\d*[.,]?\d+)|("scoreClass":"(minus|plus|close)")|("points":{("\d{1,3}":\d*[.,]?\d+,?)+})),?)+},?)+}}$/
};
HHStoredVars_HHStoredVars.HHAuto_Temp_LeagueTempOpponentList =
    {
    storage:"sessionStorage",
    HHType:"Temp",
    isValid:/^{"expirationDate":\d+,"opponentsList":{("\d+":{((("(win|loss|avgTurns|expectedValue)":\d*[.,]?\d+)|("scoreClass":"(minus|plus|close)")|("points":{("\d{1,3}":\d*[.,]?\d+,?)+})),?)+},?)+}}$/
};
/*HHStoredVars.HHAuto_Temp_opponentsListExpirationDate =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};*/
HHStoredVars_HHStoredVars.HHAuto_Temp_paranoiaLeagueBlocked =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_paranoiaQuestBlocked =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_paranoiaSpendings =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_pinfo =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_PopToStart =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_PopUnableToStart =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_storeContents =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_Timers =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_NextSwitch =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_Totalpops =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_currentlyAvailablePops =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_CheckSpentPoints =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_eventsList =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_bossBangTeam =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_boosterStatus =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_LeagueSavedData =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_HaremSize =
    {
    storage:"localStorage",
    HHType:"Temp",
    isValid:/{"count":(\d)+,"count_date":(\d)+}/
};
HHStoredVars_HHStoredVars.HHAuto_Temp_LastPageCalled =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_PoVEndDate =
    {
    storage:"localStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_PoGEndDate =
    {
    storage:"localStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_missionsGiftLeft =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_defaultCustomHaremSort =
    {
    storage:"localStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_unkownPagesList =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars_HHStoredVars.HHAuto_Temp_trollPoints =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};

;// CONCATENATED MODULE: ./src/config/InputPattern.js



const thousandsSeparator = nThousand(11111).replace(/1+/g, '');

const HHAuto_inputPattern = {
    nWith1000sSeparator:"[0-9"+thousandsSeparator+"]+",

    //kobanBank:"[0-9]+",
    buyCombTimer:"[0-9]+",
    buyMythicCombTimer:"[0-9]+",
    autoBuyBoostersFilter:"M?B[1-4](;M?B[1-4])*",
    //calculatePowerLimits:"(\-?[0-9]+;\-?[0-9]+)|default",
    mousePauseTimeout:"[0-9]+",
    collectAllTimer:"[1-9][0-9]|[1-9]",
    autoSalaryTimer:"[0-9]+",
    autoTrollThreshold:"[1]?[0-9]",
    eventTrollOrder:"([1-2][0-9]|[1-9])(;([1-2][0-9]|[1-9]))*",
    autoBuyTrollNumber:"1[0-9][0-9]|[1-9]?[0-9]",//"200|1[0-9][0-9]|[1-9]?[0-9]", // TODO revert in NOV23
    autoSeasonThreshold:"[0-9]",
    autoPantheonThreshold:"[0-9]",
    bossBangMinTeam:"[1-5]",
    autoQuestThreshold:"[1-9]?[0-9]",
    autoLeaguesThreshold:"1[0-4]|[0-9]",
    autoLeaguesSecurityThreshold:"[0-9]+",
    autoPowerPlacesIndexFilter:"[1-9][0-9]{0,1}(;[1-9][0-9]{0,1})*",
    autoChampsFilter:"[1-6](;[1-6])*",
    autoChampsTeamLoop:"[1-9][0-9]|[1-9]",
    //autoStats:"[0-9]+",
    //autoExp:"[0-9]+",
    //maxExp:"[0-9]+",
    //autoAff:"[0-9]+",
    //maxAff:"[0-9]+",
    menuSellNumber:"[0-9]+",
    autoClubChampMax:"[0-9]+",
    menuExpLevel:"[1-4]?[0-9]?[0-9]",
    minShardsX:"(100|[1-9][0-9]|[0-9])"
}
;// CONCATENATED MODULE: ./src/config/index.js



;// CONCATENATED MODULE: ./src/Helper/ConfigHelper.js



function getEnvironnement()
{
    let environnement = "global";
    if (HHKnownEnvironnements[window.location.hostname] !== undefined)
    {
        environnement= HHKnownEnvironnements[window.location.hostname].name;
    }
    else
    {
        fillHHPopUp("unknownURL","Game URL unknown",'<p>This HH URL is unknown to the script.<br>To add it please open an issue in <a href="https://github.com/Roukys/HHauto/issues" target="_blank">Github</a> with following informations : <br>Hostname : '+window.location.hostname+'<br>gameID : '+$('body[page][id]').attr('id')+'<br>You can also use this direct link : <a  target="_blank" href="https://github.com/Roukys/HHauto/issues/new?template=enhancement_request.md&title=Support%20for%20'+window.location.hostname+'&body=Please%20add%20new%20URL%20with%20these%20infos%20%3A%20%0A-%20hostname%20%3A%20'+window.location.hostname+'%0A-%20gameID%20%3A%20'+$('body[page][id]').attr('id')+'%0AThanks">Github issue</a></p>');
    }
    return environnement;
}

function isPshEnvironnement()
{
    return ["PH_prod","NPH_prod"].includes(getEnvironnement());
}

function getHHScriptVars(id, logNotFound = true)
{
    const environnement = getEnvironnement();
    if (HHEnvVariables[environnement] !== undefined && HHEnvVariables[environnement][id] !== undefined)
    {
        return HHEnvVariables[environnement][id];
    }
    else
    {
        if (HHEnvVariables["global"] !== undefined && HHEnvVariables["global"][id] !== undefined )
        {
            return HHEnvVariables["global"][id];
        }
        else
        {
            if (logNotFound)
            {
                LogUtils_logHHAuto("not found var for "+environnement+"/"+id);
            }
            return null;
        }
    }
}
;// CONCATENATED MODULE: ./src/Helper/NumberHelper.js
function add1000sSeparator1()
{
    var nToFormat = this.value;
    this.value = add1000sSeparator(nToFormat);
}

function add1000sSeparator(nToFormat)
{
    return nThousand(remove1000sSeparator(nToFormat));
}

function remove1000sSeparator(nToFormat)
{
    return Number(nToFormat.replace(/\D/g, ''));
}

function nThousand(x) {
    if (typeof x != 'number') {
        x = 0;
    }
    return x.toLocaleString();
}

// Numbers: rounding to K, M, G and T
function nRounding(num, digits, updown) {
    var power = [
        { value: 1, symbol: '' },
        { value: 1E3, symbol: 'K' },
        { value: 1E6, symbol: 'M' },
        { value: 1E9, symbol: 'B' },
        { value: 1E12, symbol: 'T' },
    ];
    var i;
    for (i = power.length - 1; i > 0; i--) {
        if (num >= power[i].value) {
            break;
        }
    }
    if (updown == 1) {
        return (Math.ceil(num / power[i].value * Math.pow(10, digits)) / Math.pow(10, digits)).toFixed(digits) + power[i].symbol;
    }
    else if (updown == 0) {
        return (Math.round(num / power[i].value * Math.pow(10, digits)) / Math.pow(10, digits)).toFixed(digits) + power[i].symbol;
    }
    else if (updown == -1) {
        return (Math.floor(num / power[i].value * Math.pow(10, digits)) / Math.pow(10, digits)).toFixed(digits) + power[i].symbol;
    }
}
;// CONCATENATED MODULE: ./src/Helper/HHMenuHelper.js








function maskInactiveMenus()
{
    let menuIDList =["isEnabledDailyGoals", "isEnabledPoVPoG", "isEnabledPoV", "isEnabledPoG",
                    "isEnabledSeasonalEvent" , "isEnabledBossBangEvent" , "isEnabledSultryMysteriesEvent",
                    "isEnabledDailyRewards", "isEnabledFreeBundles", "isEnabledMission","isEnabledContest",
                    "isEnabledTrollBattle","isEnabledPowerPlaces","isEnabledSalary","isEnabledPachinko","isEnabledQuest","isEnabledSideQuest","isEnabledSeason","isEnabledLeagues",
                    "isEnabledAllChamps","isEnabledChamps","isEnabledClubChamp","isEnabledPantheon","isEnabledShop"];
    for (let menu of menuIDList)
    {
        if ( document.getElementById(menu) !== null && getHHScriptVars(menu,false) !== null && !getHHScriptVars(menu,false) )
        {
            document.getElementById(menu).style.display = "none";
        }
    }
}

function hhButton(textKeyId, buttonId){
    return `<div class="tooltipHH">`
                +`<span class="tooltipHHtext">${getTextForUI(textKeyId,"tooltip")}</span>`
                +`<label class="myButton" id="${buttonId}">${getTextForUI(textKeyId,"elementText")}</label>`
            +`</div>`;
}

function hhMenuSwitch(textKeyAndInputId, isEnabledDivId, isKobanSwitch=false){
    return `<div ${isEnabledDivId ? 'id="'+isEnabledDivId+'"' : '' } class="labelAndButton">`
        +`<span class="HHMenuItemName">${getTextForUI(textKeyAndInputId,"elementText")}</span>`
        +`<div class="tooltipHH">`
            +`<span class="tooltipHHtext">${getTextForUI(textKeyAndInputId,"tooltip")}</span>`
            +`<label class="switch"><input id="${textKeyAndInputId}" type="checkbox"><span class="slider round ${isKobanSwitch ? 'kobans' : ''}"></span></label>`
        +`</div>`
    +`</div>`;
}

function hhMenuSwitchWithImg(textKeyAndInputId, imgPath, isKobanSwitch=false) {
    return `<div class="labelAndButton">`
        +`<span class="HHMenuItemName">${getTextForUI(textKeyAndInputId,"elementText")}</span>`
        +`<div class="imgAndObjectRow">`
            +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/${imgPath}" />`
            +`<div style="padding-left:5px">`
                +`<div class="tooltipHH">`
                    +`<span class="tooltipHHtext">${getTextForUI(textKeyAndInputId,"tooltip")}</span>`
                    +`<label class="switch"><input id="${textKeyAndInputId}" type="checkbox"><span class="slider round ${isKobanSwitch ? 'kobans' : ''}"></span></label>`
                +`</div>`
            +`</div>`
        +`</div>`
    +`</div>`;
}

function hhMenuSelect(textKeyAndInputId) {
    return `<div class="labelAndButton">`
        +`<span class="HHMenuItemName">${getTextForUI(textKeyAndInputId,"elementText")}</span>`
        +`<div class="tooltipHH">`
            +`<span class="tooltipHHtext">${getTextForUI(textKeyAndInputId,"tooltip")}</span>`
            +`<select id="${textKeyAndInputId}"></select>`
        +`</div>`
    +`</div>`;
}

function hhMenuInput(textKeyAndInputId, inputPattern, inputStyle='', inputClass='', inputMode='text') {
    return `<div class="labelAndButton">`
        +`<span class="HHMenuItemName">${getTextForUI(textKeyAndInputId,"elementText")}</span>`
        +`<div class="tooltipHH">`
            +`<span class="tooltipHHtext">${getTextForUI(textKeyAndInputId,"tooltip")}</span>`
            +`<input id="${textKeyAndInputId}" class="${inputClass}" style="${inputStyle}" required pattern="${inputPattern}" type="text" inputMode="${inputMode}">`
        +`</div>`
    +`</div>`;
}

function hhMenuInputWithImg(textKeyAndInputId, inputPattern, inputStyle, imgPath, inputMode='text') {
    return `<div class="labelAndButton">`
        +`<span class="HHMenuItemName">${getTextForUI(textKeyAndInputId,"elementText")}</span>`
        +`<div class="imgAndObjectRow">`
            +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/${imgPath}" />`
            +`<div style="padding-left:5px">`
                +`<div class="tooltipHH">`
                    +`<span class="tooltipHHtext">${getTextForUI(textKeyAndInputId,"tooltip")}</span>`
                    +`<input style="${inputStyle}" id="${textKeyAndInputId}" required pattern="${inputPattern}" type="text" inputMode="${inputMode}">`
                +`</div>`
            +`</div>`
        +`</div>`
    +`</div>`;
}

function switchHHMenuButton(isActive)
{
    var element = document.getElementById("sMenuButton");
    if(element !== null)
    {
        if (StorageHelper_getStoredValue("HHAuto_Setting_master") === "false")
        {
            element.style["background-color"] = "red";
            element.style["background-image"] = "none";
        }
        else if (isActive)
        {
            element.style["background-color"] = "green";
            element.style["background-image"] = "none";
        }
        else
        {
            element.style.removeProperty('background-color');
            element.style.removeProperty('background-image');
        }
    }
}

function setMenuValues()
{
    if (document.getElementById("sMenu") === null)
    {
        return;
    }
    setDefaults();

    for (let i of Object.keys(HHStoredVars_HHStoredVars))
    {
        if (HHStoredVars_HHStoredVars[i].storage !== undefined && HHStoredVars_HHStoredVars[i].HHType !== undefined)
        {
            let storageItem = getStorageItem(HHStoredVars_HHStoredVars[i].storage);
            let menuID = HHStoredVars_HHStoredVars[i].customMenuID !== undefined?HHStoredVars_HHStoredVars[i].customMenuID:i.replace("HHAuto_"+HHStoredVars_HHStoredVars[i].HHType+"_","");
            if (
                HHStoredVars_HHStoredVars[i].setMenu !== undefined
                && storageItem[i] !== undefined
                && HHStoredVars_HHStoredVars[i].setMenu
                && HHStoredVars_HHStoredVars[i].valueType !== undefined
                && HHStoredVars_HHStoredVars[i].menuType !== undefined
            )
            {
                let itemValue = storageItem[i];
                switch (HHStoredVars_HHStoredVars[i].valueType)
                {
                    case "Long Integer":
                        itemValue = add1000sSeparator(itemValue);
                        break;
                    case "Boolean":
                        itemValue = itemValue === "true";
                        break;
                }
                //console.log(menuID,HHStoredVars[i].menuType,itemValue);
                document.getElementById(menuID)[HHStoredVars_HHStoredVars[i].menuType] = itemValue;
            }
        }
        else
        {
            LogUtils_logHHAuto("HHStoredVar "+i+" has no storage or type defined.");
        }
    }
}


function getMenuValues()
{
    if (document.getElementById("sMenu") === null)
    {
        return;
    }
    if (isDisplayedHHPopUp() === 'loadConfig') {return}

    for (let i of Object.keys(HHStoredVars_HHStoredVars))
    {
        if (HHStoredVars_HHStoredVars[i].storage !== undefined && HHStoredVars_HHStoredVars[i].HHType !== undefined)
        {
            let storageItem = getStorageItem(HHStoredVars_HHStoredVars[i].storage);
            let menuID = HHStoredVars_HHStoredVars[i].customMenuID !== undefined?HHStoredVars_HHStoredVars[i].customMenuID:i.replace("HHAuto_"+HHStoredVars_HHStoredVars[i].HHType+"_","");
            if (
                HHStoredVars_HHStoredVars[i].getMenu !== undefined
                && document.getElementById(menuID) !== null
                && HHStoredVars_HHStoredVars[i].getMenu
                && HHStoredVars_HHStoredVars[i].valueType !== undefined
                && HHStoredVars_HHStoredVars[i].menuType !== undefined
            )
            {
                let currentValue = storageItem[i];
                let menuValue = String(document.getElementById(menuID)[HHStoredVars_HHStoredVars[i].menuType]);
                switch (HHStoredVars_HHStoredVars[i].valueType)
                {
                    case "Long Integer":
                        menuValue = String(remove1000sSeparator(menuValue));
                        break;
                }
                //console.log(menuID,HHStoredVars[i].menuType,menuValue,document.getElementById(menuID),HHStoredVars[i].valueType);
                storageItem[i] = menuValue;
                //console.log(i,currentValue, menuValue);
                if (currentValue !== menuValue && HHStoredVars_HHStoredVars[i].newValueFunction !== undefined)
                {
                    //console.log(currentValue,menuValue);
                    HHStoredVars_HHStoredVars[i].newValueFunction.apply();
                }
            }
        }
        else
        {
            LogUtils_logHHAuto("HHStoredVar "+i+" has no storage or type defined.");
        }
    }
    setDefaults();
}


function preventKobanUsingSwitchUnauthorized()
{

    if (this.checked && !document.getElementById("spendKobans0").checked)
    {
        let idToDisable = this.id;
        setTimeout(function(){document.getElementById(idToDisable).checked = false;},500);
    }
}

function addEventsOnMenuItems()
{
    for (let i of Object.keys(HHStoredVars_HHStoredVars))
    {
        //console.log(i);
        if (HHStoredVars_HHStoredVars[i].HHType !== undefined )
        {
            let menuID = HHStoredVars_HHStoredVars[i].customMenuID !== undefined?HHStoredVars_HHStoredVars[i].customMenuID:i.replace("HHAuto_"+HHStoredVars_HHStoredVars[i].HHType+"_","");
            if ( HHStoredVars_HHStoredVars[i].valueType === "Long Integer")
            {
                document.getElementById(menuID).addEventListener("keyup",add1000sSeparator1);
            }
            if (HHStoredVars_HHStoredVars[i].events !== undefined )
            {
                for (let event of Object.keys(HHStoredVars_HHStoredVars[i].events))
                {
                    document.getElementById(menuID).addEventListener(event,HHStoredVars_HHStoredVars[i].events[event]);
                }
            }
            if (HHStoredVars_HHStoredVars[i].kobanUsing !== undefined && HHStoredVars_HHStoredVars[i].kobanUsing)
            {
                document.getElementById(menuID).addEventListener("change", preventKobanUsingSwitchUnauthorized);
            }
            if (HHStoredVars_HHStoredVars[i].menuType !== undefined && HHStoredVars_HHStoredVars[i].menuType === "checked")
            {
                document.getElementById(menuID).addEventListener("change",function ()
                                                                 {
                    if (HHStoredVars_HHStoredVars[i].newValueFunction !== undefined)
                    {
                        HHStoredVars_HHStoredVars[i].newValueFunction.apply();
                    }
                    StorageHelper_setStoredValue(i,this.checked)
                });
            }
        }
    }
}


function getMenu() {
    
    // Add UI buttons.
    return `<div id="sMenu" class="HHAutoScriptMenu" style="display: none;">`
        +`<div style="position: absolute;left: 36%;color: #F00">${getTextForUI("noOtherScripts","elementText")}</div>`
        +`<div class="optionsRow">`
            +`<div class="optionsColumn" style="min-width: 185px;">`
                +`<div style="padding:3px; display:flex; flex-direction:column;">`
                    +`<span>HH Automatic ++</span>`
                    +`<span style="font-size:smaller;">Version ${GM_info.script.version}</span>`
                    +`<div class="internalOptionsRow" style="padding:3px">`
                        + hhButton('gitHub', 'git')
                        + hhButton('ReportBugs', 'ReportBugs')
                        + hhButton('DebugMenu', 'DebugMenu')
                    +`</div>`
                    +`<div class="internalOptionsRow" style="padding:3px">`
                        + hhButton('saveConfig', 'saveConfig')
                        + hhButton('loadConfig', 'loadConfig')
                    +`</div>`
                    +`<div class="internalOptionsRow" style="padding:3px">`
                        + hhButton('saveDefaults', 'saveDefaults')
                    +`</div>`
                +`</div>`
                +`<div class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/design/menu/panel.svg" />`
                        +`<span class="optionsBoxTitle">${getTextForUI("globalTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="rowOptionsBox">`
                        +`<div class="optionsColumn">`
                            + hhMenuSwitch('master') // Master switch
                            + hhMenuSwitch('paranoia')
                            +`<div id="isEnabledMousePause" class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("mousePause","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("mousePause","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="mousePause" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                    +`<input style="text-align:center; width:40px" id="mousePauseTimeout" required pattern="${HHAuto_inputPattern.mousePauseTimeout}" type="text">`
                                +`</div>`
                            +`</div>`
                            + hhMenuInput('collectAllTimer', HHAuto_inputPattern.collectAllTimer, 'text-align:center; width:25px')
                        +`</div>`
                        +`<div class="optionsColumn">`
                            + hhMenuSwitch('waitforContest')
                            + hhMenuSwitch('settPerTab')
                            + hhMenuSwitch('paranoiaSpendsBefore')
                            + hhMenuSwitch('autoFreeBundlesCollect', 'isEnabledFreeBundles')
                            + hhMenuSwitch('collectEventChest')
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/pictures/design/ic_hard_currency.png" />`
                        +`<span class="optionsBoxTitle">Kobans</span>`
                    +`</div>`
                    +`<div class="rowOptionsBox">`
                        + hhMenuSwitchWithImg('spendKobans0', 'design/menu/affil_prog.svg', true)
                        + hhMenuInputWithImg('kobanBank', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:right; width:45px', 'pictures/design/ic_hard_currency.png' )
                    +`</div>`
                +`</div>`
                +`<div class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/design/menu/sex_friends.svg" />`
                        +`<span class="optionsBoxTitle">${getTextForUI("displayTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="rowOptionsBox">`
                        +`<div class="optionsColumn">`
                            + hhMenuSwitch('showInfo')
                            + hhMenuSwitch('showInfoLeft')
                            + hhMenuSwitch('showTooltips')
                        +`</div>`
                        +`<div class="optionsColumn">`
                            + hhMenuSwitch('showCalculatePower')
                            + hhMenuSwitch('PoAMaskRewards')
                            + hhMenuSwitch('showAdsBack')
                            + hhMenuSwitch('showRewardsRecap')
                        +`</div>`
                    +`</div>`
                +`</div>`
            +`</div>`
            +`<div class="optionsColumn" style="min-width: 500px;">`
                +`<div class="optionsRow">`
                    +`<div class="optionsColumn">`
                        +`<div class="optionsBoxWithTitle">`
                            +`<div class="optionsBoxTitle">`
                                +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/design/menu/missions.svg" />`
                                +`<span class="optionsBoxTitle">${getTextForUI("autoActivitiesTitle","elementText")}</span>`
                            +`</div>`
                            +`<div class="optionsBox" style="border:none;padding:0">`
                                +`<div class="internalOptionsRow">`
                                    +`<div id="isEnabledMission" class="internalOptionsRow optionsBox" style="padding:0;margin:0 3px 0 0;">`
                                        + hhMenuSwitch('autoMission')
                                        + hhMenuSwitch('autoMissionCollect')
                                        + hhMenuSwitch('autoMissionKFirst')
                                        + hhMenuSwitch('compactMissions')
                                    +`</div>`
                                    +`<div id="isEnabledContest" class="internalOptionsRow optionsBox" style="padding:0;margin:0 0 0 3px;">`
                                        + hhMenuSwitch('autoContest')
                                        + hhMenuSwitch('compactEndedContests')
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                        +`<div id="isEnabledPowerPlaces" class="optionsBoxWithTitle">`
                            +`<div class="optionsBoxTitle">`
                                +`<span class="optionsBoxTitle">${getTextForUI("autoPowerPlaces","elementText")}</span>`
                            +`</div>`
                            +`<div class="optionsBox">`
                                +`<div class="internalOptionsRow">`
                                    + hhMenuSwitch('autoPowerPlaces')
                                    + hhMenuInput('autoPowerPlacesIndexFilter', HHAuto_inputPattern.autoPowerPlacesIndexFilter, '' )
                                    + hhMenuSwitch('autoPowerPlacesAll')
                                +`</div>`
                                +`<div class="internalOptionsRow">`
                                    + hhMenuSwitch('autoPowerPlacesPrecision')
                                    + hhMenuSwitch('autoPowerPlacesInverted')
                                    + hhMenuSwitch('autoPowerPlacesWaitMax')
                                    + hhMenuSwitch('compactPowerPlace')
                                +`</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                    +`<div class="optionsColumn">`
                        +`<div class="optionsBoxTitle">`
                        +`</div>`
                        +`<div id="isEnabledSalary" class="rowOptionsBox">`
                            +`<div class="internalOptionsRow">`
                                + hhMenuSwitchWithImg('autoSalary', 'pictures/design/harem.svg')
                                + hhMenuInput('autoSalaryMinSalary', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:right; width:45px')
                                + hhMenuInput('autoSalaryMaxTimer', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:right; width:45px')
                            +`</div>`
                        +`</div>`
                        +`<div class="optionsRow">`
                            +`<div id="isEnabledPachinko" class="rowOptionsBox">`
                                +`<div class="internalOptionsRow" style="justify-content: space-between">`
                                    + hhMenuSwitchWithImg('autoFreePachinko', 'pictures/design/menu/pachinko.svg')
                                +`</div>`
                            +`</div>`
                            +`<div id="isEnabledQuest" class="rowOptionsBox">`
                                +`<div class="internalOptionsRow">`
                                    + hhMenuSwitchWithImg('autoQuest', 'design/menu/forward.svg')
                                    + hhMenuSwitch('autoSideQuest', 'isEnabledSideQuest')
                                    + hhMenuInputWithImg('autoQuestThreshold', HHAuto_inputPattern.autoQuestThreshold, 'text-align:center; width:25px', 'pictures/design/ic_energy_quest.png', 'numeric')
                                +`</div>`
                            +`</div>`
                        +`</div>`
                        +`<div class="optionsRow" style="justify-content: space-evenly">`
                            +`<div id="isEnabledDailyGoals" class="optionsBoxWithTitleInline">`
                                +`<div class="optionsBoxTitle">`
                                    +`<span class="optionsBoxTitle">${getTextForUI("dailyGoalsTitle","elementText")}</span>`
                                +`</div>`
                               // +`<div class="optionsBox">`
                                    +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                                        + hhMenuSwitch('autoDailyGoalsCollect')
                                        + hhMenuSwitch('compactDailyGoals')
                                    +`</div>`
                               // +`</div>`
                               //
                            +`</div>`
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div class="optionsRow">`
                    +`<div id="isEnabledSeason" class="optionsBoxWithTitle">`
                        +`<div class="optionsBoxTitle">`
                            +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/design/menu/seasons.svg" />`
                            +`<span class="optionsBoxTitle">${getTextForUI("autoSeasonTitle","elementText")}</span>`
                        +`</div>`
                        +`<div class="optionsBox">`
                            +`<div class="internalOptionsRow">`
                                + hhMenuSwitch('autoSeason')
                                + hhMenuSwitch('autoSeasonCollect')
                                + hhMenuSwitch('autoSeasonCollectAll')
                                + hhMenuSwitch('SeasonMaskRewards')
                            +`</div>`
                            +`<div class="internalOptionsRow">`
                                + hhMenuSwitch('autoSeasonPassReds', '', true)
                                + hhMenuSwitch('autoSeasonBoostedOnly')
                                + hhMenuInputWithImg('autoSeasonThreshold', HHAuto_inputPattern.autoSeasonThreshold, 'text-align:center; width:25px', 'pictures/design/ic_kiss.png', 'numeric' )
                            +`</div>`
                        +`</div>`
                    +`</div>`
                    +`<div id="isEnabledLeagues" class="optionsBoxWithTitle">`
                        +`<div class="optionsBoxTitle">`
                            +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/design/menu/leaderboard.svg" />`
                            +`<span class="optionsBoxTitle">${getTextForUI("autoLeaguesTitle","elementText")}</span>`
                        +`</div>`
                        +`<div class="optionsBox">`
                            +`<div class="internalOptionsRow">`
                                + hhMenuSwitch('autoLeagues')
                                +`<div style="display:none">`
                                + hhMenuSwitch('autoLeaguesPowerCalc')
                                +`</div>`
                                + hhMenuSwitch('autoLeaguesCollect')
                                + hhMenuSwitch('autoLeaguesBoostedOnly')
                                + `<div style="display:none;">` + hhMenuSwitch('autoLeaguesThreeFights') + `</div>`
                                + hhMenuSwitch('leagueListDisplayPowerCalc')
                            +`</div>`
                            +`<div class="internalOptionsRow">`
                                + hhMenuSelect('autoLeaguesSelector')
                                + hhMenuSwitch('autoLeaguesAllowWinCurrent')
                                + hhMenuInputWithImg('autoLeaguesThreshold', HHAuto_inputPattern.autoLeaguesThreshold, 'text-align:center; width:25px', 'pictures/design/league_points.png', 'numeric' )
                                + hhMenuInput('autoLeaguesSecurityThreshold', HHAuto_inputPattern.autoLeaguesSecurityThreshold, 'text-align:center; width:25px', '', 'numeric' )
                            +`</div>`
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div id="isEnabledPoVPoG" class="optionsRow">`
                    +`<div id="isEnabledPoV" class="optionsBoxWithTitle">`
                        +`<div class="optionsBoxTitle">`
                            +`<span class="optionsBoxTitle">${getTextForUI("povTitle","elementText")}</span>`
                        +`</div>`
                        +`<div class="optionsBox">`
                            +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                                + hhMenuSwitch('PoVMaskRewards')
                                + hhMenuSwitch('autoPoVCollect')
                                + hhMenuSwitch('autoPoVCollectAll')
                            +`</div>`
                        +`</div>`
                    +`</div>`
                    +`<div id="isEnabledPoG" class="optionsBoxWithTitle">`
                        +`<div class="optionsBoxTitle">`
                            +`<span class="optionsBoxTitle">${getTextForUI("pogTitle","elementText")}</span>`
                        +`</div>`
                        +`<div id="isEnabledPoVPoG" class="optionsBox">`
                            +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                                + hhMenuSwitch('PoGMaskRewards')
                                + hhMenuSwitch('autoPoGCollect')
                                + hhMenuSwitch('autoPoGCollectAll')
                            +`</div>`
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div id="isEnabledTrollBattle" class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/pictures/design/menu/map.svg" />`
                        +`<span class="optionsBoxTitle">${getTextForUI("autoTrollTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="optionsBox">`
                        +`<div class="internalOptionsRow" style="justify-content: space-between">`
                            + hhMenuSwitch('autoTrollBattle')
                            + hhMenuSelect('autoTrollSelector')
                            + hhMenuInputWithImg('autoTrollThreshold', HHAuto_inputPattern.autoTrollThreshold, 'text-align:center; width:25px', 'pictures/design/ic_energy_fight.png', 'numeric' )
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitch('useX10Fights', '', true)
                            + hhMenuSwitch('useX10FightsAllowNormalEvent')
                            + hhMenuInput('minShardsX10', HHAuto_inputPattern.minShardsX, 'text-align:center; width:7em')
                            + hhMenuSwitch('useX50Fights', '', true)
                            + hhMenuSwitch('useX50FightsAllowNormalEvent')
                            + hhMenuInput('minShardsX50', HHAuto_inputPattern.minShardsX, 'text-align:center; width:7em')
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitch('plusEvent')
                            + hhMenuInput('eventTrollOrder', HHAuto_inputPattern.eventTrollOrder, 'width:120px')
                            + hhMenuSwitch('buyCombat', '', true)
                            + hhMenuInput('autoBuyTrollNumber', HHAuto_inputPattern.autoBuyTrollNumber, 'width:40px')
                            + hhMenuInput('buyCombTimer', HHAuto_inputPattern.buyCombTimer, 'text-align:center; width:40px', '', 'numeric')
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitch('plusEventMythic')
                            + hhMenuSwitch('autoTrollMythicByPassParanoia')
                            + hhMenuSwitch('buyMythicCombat', '', true)
                            + hhMenuInput('autoBuyMythicTrollNumber', HHAuto_inputPattern.autoBuyTrollNumber, 'width:40px')
                            + hhMenuInput('buyMythicCombTimer', HHAuto_inputPattern.buyMythicCombTimer, 'text-align:center; width:40px', '', 'numeric')
                            + `<div style="display:none;">` + hhMenuSwitch('plusEventMythicSandalWood') + '</div>'
                        +`</div>`
                    +`</div>`
                +`</div>`
            +`</div>`
            +`<div class="optionsColumn" style="width: 340px;">`
                +`<div id="isEnabledAllChamps" class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/design/menu/ic_champions.svg" />`
                        +`<span class="optionsBoxTitle">${getTextForUI("autoChampsTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="optionsBox">`
                        +`<div id="isEnabledChamps" class="internalOptionsRow">`
                            + hhMenuSwitch('autoChamps')
                            + hhMenuSwitch('autoChampsForceStart')
                            + hhMenuSwitchWithImg('autoChampsUseEne', 'pictures/design/ic_energy_quest.png')
                            + hhMenuInput('autoChampsFilter', HHAuto_inputPattern.autoChampsFilter, 'text-align:center; width:55px')
                            + hhMenuSwitch('autoChampsForceStartEventGirl')
                        +`</div>`
                        +`<div id="isEnabledClubChamp" class="internalOptionsRow separator">`
                            + hhMenuSwitch('autoClubChamp')
                            + hhMenuSwitch('autoClubForceStart')
                            + hhMenuInputWithImg('autoClubChampMax', HHAuto_inputPattern.autoClubChampMax, 'text-align:center; width:45px', 'pictures/design/champion_ticket.png', 'numeric')
                            + hhMenuSwitch('showClubButtonInPoa')
                        +`</div>`
                        +`<div class="internalOptionsRow separator">`
                            + hhMenuInput('autoChampsTeamLoop', HHAuto_inputPattern.autoChampsTeamLoop, 'text-align:center; width:25px', '', 'numeric')
                            + hhMenuInput('autoChampsGirlThreshold', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:center; width:45px')
                            + hhMenuSwitch('autoChampsTeamKeepSecondLine')
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div id="isEnabledPantheon" class="optionsBoxWithTitleInline">`
                    +`<div class="optionsBoxTitle">`
                        +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/design/menu/ic_champions.svg" />`
                        +`<span class="optionsBoxTitle">${getTextForUI("autoPantheonTitle","elementText")}</span>`
                    +`</div>`
                    // +`<div class="optionsBox">`
                        +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                            + hhMenuSwitch('autoPantheon')
                            + hhMenuInputWithImg('autoPantheonThreshold', HHAuto_inputPattern.autoPantheonThreshold, 'text-align:center; width:25px', 'pictures/design/ic_worship.svg' , 'numeric')
                        +`</div>`
                    // +`</div>`
                +`</div>`
                +`<div id="isEnabledShop" class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/design/menu/shop.svg" />`
                        +`<span class="optionsBoxTitle">${getTextForUI("autoBuy","elementText")}</span>`
                    +`</div>`
                    +`<div class="optionsBox">`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitchWithImg('autoStatsSwitch', 'design/ic_plus.svg')
                            + hhMenuInput('autoStats', HHAuto_inputPattern.nWith1000sSeparator, '', 'maxMoneyInputField')
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitchWithImg('autoExpW', 'design/ic_books_gray.svg')
                            + hhMenuInput('maxExp', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:right; width:60px')
                            + hhMenuInput('autoExp', HHAuto_inputPattern.nWith1000sSeparator, '', 'maxMoneyInputField')
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitchWithImg('autoAffW', 'design/ic_gifts_gray.svg')
                            + hhMenuInput('maxAff', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:right; width:60px')
                            + hhMenuInput('autoAff', HHAuto_inputPattern.nWith1000sSeparator, '', 'maxMoneyInputField')
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitchWithImg('autoBuyBoosters', 'design/ic_boosters_gray.svg', true)
                            + hhMenuInput('maxBooster', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:right; width:45px')
                            + hhMenuInput('autoBuyBoostersFilter', HHAuto_inputPattern.autoBuyBoostersFilter, 'text-align:center; width:70px')
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitchWithImg('showMarketTools', 'design/menu/panel.svg')
                            + hhMenuSwitch('updateMarket')
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div id="isEnabledSeasonalEvent" class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<span class="optionsBoxTitle">${getTextForUI("seasonalEventTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="optionsBox">`
                        +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                            + hhMenuSwitch('SeasonalEventMaskRewards')
                            + hhMenuSwitch('autoSeasonalEventCollect')
                            + hhMenuSwitch('autoSeasonalEventCollectAll')
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div class="optionsRow" style="justify-content: space-evenly">`
                    +`<div id="isEnabledSultryMysteriesEvent" class="optionsBoxWithTitle">`
                        +`<div class="optionsBoxTitle">`
                            +`<span class="optionsBoxTitle">${getTextForUI("sultryMysteriesEventTitle","elementText")}</span>`
                        +`</div>`
                        +`<div class="optionsBox">`
                            +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                                + hhMenuSwitch('sultryMysteriesEventRefreshShop')
                            +`</div>`
                        +`</div>`
                    +`</div>`
                    +`<div id="isEnabledBossBangEvent" class="optionsBoxWithTitle">`
                        +`<div class="optionsBoxTitle">`
                            +`<span class="optionsBoxTitle">${getTextForUI("bossBangEventTitle","elementText")}</span>`
                        +`</div>`
                        +`<div class="optionsBox">`
                            +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                                + hhMenuSwitch('bossBangEvent')
                                + hhMenuInput('bossBangMinTeam', HHAuto_inputPattern.bossBangMinTeam, 'text-align:center; width:25px', '', 'numeric')
                            +`</div>`
                        +`</div>`
                    +`</div>`
                +`</div>`
            +`</div>`
        +`</div>`
    +`</div>`
}
;// CONCATENATED MODULE: ./src/Helper/StorageHelper.js







function getStorage()
{
    return StorageHelper_getStoredValue("HHAuto_Setting_settPerTab") === "true"?sessionStorage:localStorage;
}

function StorageHelper_getStoredValue(inVarName)
{
    if (HHStoredVars_HHStoredVars.hasOwnProperty(inVarName))
    {
        const storedValue = getStorageItem(HHStoredVars_HHStoredVars[inVarName].storage)[inVarName];
        if(HHStoredVars_HHStoredVars[inVarName].kobanUsing) {
            // Check main switch for spenind Koban
            return StorageHelper_getStoredValue('HHAuto_Setting_spendKobans0') === "true" ? storedValue : "false";
        }
        return storedValue
    }
    return undefined;
}

function deleteStoredValue(inVarName)
{
    if (HHStoredVars_HHStoredVars.hasOwnProperty(inVarName))
    {
        getStorageItem(HHStoredVars_HHStoredVars[inVarName].storage).removeItem(inVarName);
    }
}

function StorageHelper_setStoredValue(inVarName, inValue)
{
    if (HHStoredVars_HHStoredVars.hasOwnProperty(inVarName))
    {
        getStorageItem(HHStoredVars_HHStoredVars[inVarName].storage)[inVarName] = inValue;
    }
}


function extractHHVars(dataToSave,extractLog = false,extractTemp=true,extractSettings=true)
{
    let storageType;
    let storageName;
    let currentStorageName = StorageHelper_getStoredValue("HHAuto_Setting_settPerTab") ==="true"?"sessionStorage":"localStorage";
    let variableName;
    let storageItem;
    let varType;
    for (let i of Object.keys(HHStoredVars_HHStoredVars))
    {
        varType = HHStoredVars_HHStoredVars[i].HHType;
        if (varType === "Setting" && extractSettings || varType === "Temp" && extractTemp)
        {
            storageType = HHStoredVars_HHStoredVars[i].storage;
            variableName = i;
            storageName = storageType;
            storageItem = getStorageItem(storageType);
            if (storageType === 'Storage()')
            {
                storageName = currentStorageName;
            }
            if (variableName !== "HHAuto_Temp_Logging")
            {
                dataToSave[storageName+"."+variableName] = StorageHelper_getStoredValue(variableName);
            }
        }
    }
    if (extractLog)
    {
        dataToSave["HHAuto_Temp_Logging"] = JSON.parse(sessionStorage.getItem('HHAuto_Temp_Logging'));
    }
    return dataToSave;
}

function saveHHVarsSettingsAsJSON() {
    var dataToSave={};
    extractHHVars(dataToSave,false,false,true);
    var name='HH_SaveSettings_'+Date.now()+'.json';
    const a = document.createElement('a')
    a.download = name
    a.href = URL.createObjectURL(new Blob([JSON.stringify(dataToSave)], {type: 'application/json'}))
    a.click()
}

function getStorageItem(inStorageType)
{
    switch (inStorageType)
    {
        case 'localStorage' :
            return localStorage;
            break;
        case 'sessionStorage' :
            return sessionStorage;
            break;
        case 'Storage()' :
            return getStorage();
            break;
    }
}

function migrateHHVars()
{
    const varReplacement =
          [
              {from:"HHAuto_Setting_MaxAff", to:"HHAuto_Setting_maxAff"},
              {from:"HHAuto_Setting_MaxExp", to:"HHAuto_Setting_maxExp"},
              {from:"HHAuto_Setting_autoMissionC", to:"HHAuto_Setting_autoMissionCollect"},
          ];
    for(let replacement of varReplacement)
    {
        const oldVar = replacement.from;
        const newVar = replacement.to;
        if (sessionStorage[oldVar] !== undefined)
        {
            sessionStorage[newVar] = sessionStorage[oldVar];
            sessionStorage.removeItem(oldVar);
        }
        if (localStorage[oldVar] !== undefined)
        {
            localStorage[newVar] = localStorage[oldVar];
            localStorage.removeItem(oldVar);
        }
    }

    // TODO to be deleted in NOV23
    if (StorageHelper_getStoredValue("HHAuto_Setting_autoBuyTrollNumber") == "200") {
        StorageHelper_setStoredValue("HHAuto_Setting_autoBuyTrollNumber", "20");
    }
    // TODO to be deleted in NOV23
    if (StorageHelper_getStoredValue("HHAuto_Setting_autoBuyMythicTrollNumber") == "200") {
        StorageHelper_setStoredValue("HHAuto_Setting_autoBuyMythicTrollNumber", "20");
    }
}

function getUserHHStoredVarDefault(inVarName)
{
    if (Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Setting_saveDefaults")))
    {
        let currentDefaults = JSON.parse(StorageHelper_getStoredValue("HHAuto_Setting_saveDefaults"));
        if (currentDefaults !== null && currentDefaults[inVarName] !== undefined)
        {
            return currentDefaults[inVarName];
        }
    }
    return null;
}

function saveHHStoredVarsDefaults()
{
    var dataToSave={};
    getMenuValues();
    extractHHVars(dataToSave,false,false,true);
    let savedHHStoredVars={};
    for(var i of Object.keys(dataToSave))
    {
        let variableName = i.split(".")[1];
        if (variableName !== "HHAuto_Setting_saveDefaults" && HHStoredVars_HHStoredVars[variableName].default !== dataToSave[i])
        {
            savedHHStoredVars[variableName] = dataToSave[i];
        }
    }
    StorageHelper_setStoredValue("HHAuto_Setting_saveDefaults", JSON.stringify(savedHHStoredVars));
    LogUtils_logHHAuto("HHStoredVar defaults saved !");
}

function setHHStoredVarToDefault(inVarName)
{
    if (HHStoredVars_HHStoredVars[inVarName] !== undefined)
    {
        if (HHStoredVars_HHStoredVars[inVarName].default !== undefined && HHStoredVars_HHStoredVars[inVarName].storage !== undefined)
        {
            let storageItem;
            storageItem = getStorageItem(HHStoredVars_HHStoredVars[inVarName].storage);

            let userDefinedDefault = getUserHHStoredVarDefault(inVarName);
            let isValid = HHStoredVars_HHStoredVars[inVarName].isValid===undefined?true:HHStoredVars_HHStoredVars[inVarName].isValid.test(userDefinedDefault);
            if (userDefinedDefault !== null && isValid)
            {
                LogUtils_logHHAuto("HHStoredVar "+inVarName+" set to user default value : "+userDefinedDefault);
                storageItem[inVarName] = userDefinedDefault;
            }
            else
            {
                LogUtils_logHHAuto("HHStoredVar "+inVarName+" set to default value : "+HHStoredVars_HHStoredVars[inVarName].default);
                storageItem[inVarName] = HHStoredVars_HHStoredVars[inVarName].default;
            }
        }
        else
        {
            LogUtils_logHHAuto("HHStoredVar "+inVarName+" either have no storage or default defined.");
        }
    }
    else
    {
        LogUtils_logHHAuto("HHStoredVar "+inVarName+" doesn't exist.");
    }
}

function getHHStoredVarDefault(inVarName)
{
    if (HHStoredVars[inVarName] !== undefined)
    {
        if (HHStoredVars[inVarName].default !== undefined)
        {
            return HHStoredVars[inVarName].default;
        }
        else
        {
            logHHAuto("HHStoredVar "+inVarName+" have no default defined.");
        }
    }
    else
    {
        logHHAuto("HHStoredVar "+inVarName+" doesn't exist.");
    }
}

function debugDeleteAllVars()
{
    Object.keys(localStorage).forEach((key) =>
                                      {
        if (key.startsWith("HHAuto_Setting_"))
        {
            localStorage.removeItem(key);
        }
    });
    Object.keys(sessionStorage).forEach((key) =>
                                        {
        if (key.startsWith("HHAuto_Setting_"))
        {
            sessionStorage.removeItem(key);
        }
    });
    Object.keys(localStorage).forEach((key) =>
                                      {
        if (key.startsWith("HHAuto_Temp_"))
        {
            localStorage.removeItem(key);
        }
    });
    Object.keys(sessionStorage).forEach((key) =>
                                        {
        if (key.startsWith("HHAuto_Temp_") && key !== "HHAuto_Temp_Logging")
        {
            sessionStorage.removeItem(key);
        }
    });
    LogUtils_logHHAuto('Deleted all script vars.');
}


function debugDeleteTempVars()
{
    var dataToSave={};
    extractHHVars(dataToSave,false,false,true);
    var storageType;
    var variableName;
    var storageItem;

    debugDeleteAllVars();
    setDefaults(true);
    var keys=Object.keys(dataToSave);
    for(var i of keys)
    {
        storageType=i.split(".")[0];
        variableName=i.split(".")[1];
        storageItem = getStorageItem(storageType);
        LogUtils_logHHAuto(i+':'+ dataToSave[i]);
        storageItem[variableName] = dataToSave[i];
    }
}


function getAndStoreCollectPreferences(inVarName, inPopUpText = getTextForUI("menuCollectableText","elementText"))
{
    createPopUpCollectables();
    function createPopUpCollectables()
    {
        let menuCollectables = '<div class="HHAutoScriptMenu" style="padding:10px; display:flex;flex-direction:column">'
        +    '<p>'+inPopUpText+'</p>'
        +    '<div style="display:flex;">'
        let count = 0;
        const possibleRewards = getHHScriptVars("possibleRewardsList");
        const rewardsToCollect = Utils_isJSON(StorageHelper_getStoredValue(inVarName))?JSON.parse(StorageHelper_getStoredValue(inVarName)):[];
        for (let currentItem of Object.keys(possibleRewards))
        {
            //console.log(currentItem,possibleRewards[currentItem]);
            if (count === 4)
            {
                count = 0;
                menuCollectables+='</div>';
                menuCollectables+='<div style="display:flex;">';
            }
            const checkedBox = rewardsToCollect.includes(currentItem)?"checked":"";
            menuCollectables+='<div style="display:flex; width:25%">';
            menuCollectables+='<div class="labelAndButton" style=""><label class="switch"><input id="'+currentItem+'" class="menuCollectablesItem" type="checkbox" '+checkedBox+'><span class="slider round"></span></label><span class="HHMenuItemName">'+possibleRewards[currentItem]+'</span></div>'
            menuCollectables+='</div>';
            count++;
        }
        menuCollectables+='</div>';
        menuCollectables+='<div style="display:flex;">';
        menuCollectables+='<div style="display:flex;width:25%">';
        menuCollectables+='<div class="labelAndButton" style=""><span class="HHMenuItemName">Toggle All</span><label class="button">';
        menuCollectables+='<input id="toggleCollectables" class="menuCollectablesItem" type="button" value="Click!"';
        menuCollectables+='onclick="let allInputs = window.document.querySelectorAll(\'#HHAutoPopupGlobalPopup.menuCollectable .menuCollectablesItem\'); ';
        menuCollectables+='allInputs.forEach((currentInput) \=\> {currentInput.checked = !currentInput.checked;}); ';
        menuCollectables+='evt = document.createEvent(\'HTMLevents\'); evt.initEvent(\'change\',true,true); ';
        menuCollectables+='allInputs[0].dispatchEvent(evt);"><span class="button"></span></label></div>';
        menuCollectables +=    '</div>'
            +  '</div>';
        fillHHPopUp("menuCollectable",getTextForUI("menuCollectable","elementText"),menuCollectables);
        document.querySelectorAll("#HHAutoPopupGlobalPopup.menuCollectable .menuCollectablesItem").forEach(currentInput =>
                                                                                                           {
            currentInput.addEventListener("change",getSelectedCollectables);
        });
    }

    function getSelectedCollectables()
    {
        let collectablesList = [];
        document.querySelectorAll("#HHAutoPopupGlobalPopup.menuCollectable .menuCollectablesItem").forEach(currentInput =>
                                                                                                           {
            if (currentInput.checked)
            {
                //console.log(currentInput.id);
                collectablesList.push(currentInput.id);
            }
        });
        StorageHelper_setStoredValue(inVarName, JSON.stringify(collectablesList));
    }
}



const Trollz = getHHScriptVars("trollzList");
const StorageHelper_Leagues = getHHScriptVars("leaguesList");

;// CONCATENATED MODULE: ./src/Utils/BrowserUtils.js
function getBrowserData(nav) {
    var data = {};

    var ua = data.uaString = nav.userAgent;
    var browserMatch = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
    if (browserMatch[1]) { browserMatch[1] = browserMatch[1].toLowerCase(); }
    var operaMatch = browserMatch[1] === 'chrome';
    if (operaMatch) { operaMatch = ua.match(/\bOPR\/([\d\.]+)/); }

    if (/trident/i.test(browserMatch[1])) {
        var msieMatch = /\brv[ :]+([\d\.]+)/g.exec(ua) || [];
        data.name = 'msie';
        data.version = msieMatch[1];
    }
    else if (operaMatch) {
        data.name = 'opera';
        data.version = operaMatch[1];
    }
    else if (browserMatch[1] === 'safari') {
        var safariVersionMatch = ua.match(/version\/([\d\.]+)/i);
        data.name = 'safari';
        data.version = safariVersionMatch[1];
    }
    else {
        data.name = browserMatch[1];
        data.version = browserMatch[2];
    }

    var versionParts = [];
    if (data.version) {
        var versionPartsMatch = data.version.match(/(\d+)/g) || [];
        for (var i=0; i < versionPartsMatch.length; i++) {
            versionParts.push(versionPartsMatch[i]);
        }
        if (versionParts.length > 0) { data.majorVersion = versionParts[0]; }
    }
    data.name = data.name || '(unknown browser name)';
    data.version = {
        full: data.version || '(unknown full browser version)',
        parts: versionParts,
        major: versionParts.length > 0 ? versionParts[0] : '(unknown major browser version)'
    };

    return data.name + ' ' + data.version['full'];
};
;// CONCATENATED MODULE: ./src/Utils/LogUtils.js



function LogUtils_logHHAuto(...args)
{

    const stackTrace = (new Error()).stack;
    let match
    const regExps = [/at Object\.([\w_.]+) \((\S+)\)/, /\n([\w_.]+)@(\S+)/, /\)\n    at ([\w_.]+) \((\S+)\)/];
    regExps.forEach(element => {
        if(!(match && match.length >= 2)) match = stackTrace.match(element);
    });
    if(!(match && match.length >= 2)) match = ['Unknown','Unknown'];

    const callerName = match[1];

    let currDate = new Date();
    var prefix = currDate.toLocaleString()+"."+currDate.getMilliseconds()+":"+callerName;
    var text;
    var currentLoggingText;
    var nbLines;
    var maxLines = 500;

    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (seen.has(value)) {
                    return;
                }
                seen.add(value);
            }
            return value;
        };
    };
    if (args.length === 1)
    {
        if (typeof args[0] === 'string' || args[0] instanceof String)
        {
            text = args[0];
        }
        else
        {
            text = JSON.stringify(args[0], getCircularReplacer(), 2);
        }
    }
    else
    {
        text = JSON.stringify(args, getCircularReplacer(), 2);
    }
    currentLoggingText = StorageHelper_getStoredValue("HHAuto_Temp_Logging")!==undefined?StorageHelper_getStoredValue("HHAuto_Temp_Logging"):"reset";
    //console.log("debug : ",currentLoggingText);
    if (!currentLoggingText.startsWith("{"))
    {
        //console.log("debug : delete currentLog");
        currentLoggingText={};
    }
    else
    {

        currentLoggingText = JSON.parse(currentLoggingText);
    }
    nbLines = Object.keys(currentLoggingText).length;
    //console.log("Debug : Counting log lines : "+nbLines);
    if( nbLines >maxLines)
    {
        var keys=Object.keys(currentLoggingText);
        //console.log("Debug : removing old lines");
        for(var i = 0; i < nbLines-maxLines; i++)
        {
            //console.log("debug delete : "+currentLoggingText[keys[i]]);
            delete currentLoggingText[keys[i]];
        }
    }
    let count=1;
    let newPrefix = prefix;
    while (currentLoggingText.hasOwnProperty(newPrefix) && count < 10)
    {
        newPrefix = prefix + "-" + count;
        count++;
    }
    prefix=newPrefix;
    console.log(prefix+":"+text);
    currentLoggingText[prefix]=text;

    StorageHelper_setStoredValue("HHAuto_Temp_Logging", JSON.stringify(currentLoggingText));

}


function saveHHDebugLog()
{
    var dataToSave={}

    var name='HH_DebugLog_'+Date.now()+'.log';
    dataToSave['HHAuto_browserVersion']=getBrowserData(window.navigator || navigator);
    dataToSave['HHAuto_scriptHandler']=GM_info.scriptHandler+' '+GM_info.version;
    dataToSave['HHAuto_version']=GM_info.script.version;
    dataToSave['HHAuto_HHSite']=window.location.origin;
    extractHHVars(dataToSave,true);
    const a = document.createElement('a')
    a.download = name
    a.href = URL.createObjectURL(new Blob([JSON.stringify(dataToSave, null, 2)], {type: 'application/json'}))
    a.click()
}
;// CONCATENATED MODULE: ./src/Utils/Utils.js



function callItOnce(fn) {
    var called = false;
    return function() {
        if (!called) {
            called = true;
            return fn();
        }
        return;
    }
}

function getCallerFunction()
{
    var stackTrace = (new Error()).stack; // Only tested in latest FF and Chrome
    var callerName = stackTrace.replace(/^Error\s+/, ''); // Sanitize Chrome
    callerName = callerName.split("\n")[1]; // 1st item is this, 2nd item is caller
    callerName = callerName.replace(/^\s+at Object./, ''); // Sanitize Chrome
    callerName = callerName.replace(/ \(.+\)$/, ''); // Sanitize Chrome
    callerName = callerName.replace(/\@.+/, ''); // Sanitize Firefox
    return callerName;
}

function getCallerCallerFunction()
{

    let stackTrace = (new Error()).stack; // Only tested in latest FF and Chrome
    let match
    try {
        match = stackTrace.match(/at Object\.(\w+) \((\S+)\)/);
        match[1] // throw error if match is null
    } catch {
        // Firefox
        match = stackTrace.match(/\n(\w+)@(\S+)/);
    }
    let [callerName, callerPlace] = [match[1], match[2]]

    try{
    console.log('Function ' + match[3] + ' at ' + match[4])
    }catch(err){}
    /*
    var callerName;
    {
        let re = /([^(]+)@|at ([^(]+) \(/g;
        let aRegexResult = re.exec(new Error().stack);
        callerName = aRegexResult[1] || aRegexResult[2];
    }*/
    //console.log(callerName);
    return callerName;
    //return getCallerCallerFunction.caller.caller.name
}
function isFocused()
{
    //let isFoc = false;
    const docFoc = document.hasFocus();
    //const iFrameFoc = $('iframe').length===0?false:$('iframe')[0].contentWindow.document.hasFocus();
    //isFoc = docFoc || iFrameFoc;
    return docFoc;
}
function Utils_isJSON(str)
{
    if (str === undefined || str === null || /^\s*$/.test(str) ) return false;
    str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
    str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
    str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
    return (/^[\],:{}\s]*$/).test(str);
}


function replaceCheatClick()
{
    is_cheat_click=function(e) {
        return false;
    };
}

function getCurrentSorting()
{
    return localStorage.sort_by;
}

/* Used ? */
function waitForKeyElements (selectorTxt,maxMilliWaitTime)
{
    var targetNodes;
    var timer= new Date().getTime() + maxMilliWaitTime;
    targetNodes = jQuery(selectorTxt);

    while ( targetNodes.length === 0 && Math.ceil(timer)-Math.ceil(new Date().getTime()) > 0)
    {
        targetNodes = jQuery(selectorTxt);
    }
    if (targetNodes.length === 0)
    {
        return false;
    }
    else
    {
        return true;
    }
}


function myfileLoad_onChange(event)
{
    $('#LoadConfError')[0].innerText =' ';
    if (event.target.files.length == 0) {return}
    var reader = new FileReader();
    reader.onload = myfileLoad_onReaderLoad;
    reader.readAsText(event.target.files[0]);
}



function myfileLoad_onReaderLoad(event){
    var text = event.target.result;
    var storageType;
    var storageItem;
    var variableName;

    //Json validation
    if (Utils_isJSON(text))
    {
        LogUtils_logHHAuto('the json is ok');
        var jsonNewSettings = JSON.parse(event.target.result);
        //Assign new values to Storage();
        for (const [key, value] of Object.entries(jsonNewSettings))
        {
            storageType=key.split(".")[0];
            variableName=key.split(".")[1];
            storageItem = getStorageItem(storageType);
            LogUtils_logHHAuto(key+':'+ value);
            storageItem[variableName] = value;
        }
        location.reload();
    }else{
        $('#LoadConfError')[0].innerText ='Selected file broken!';
        LogUtils_logHHAuto('the json is Not ok');
    }
}
;// CONCATENATED MODULE: ./src/Utils/HHPopup.js


function fillHHPopUp(inClass,inTitle, inContent)
{
    if (document.getElementById("HHAutoPopupGlobal") === null)
    {
        createHHPopUp();
    }
    else
    {
        displayHHPopUp();
    }
    document.getElementById("HHAutoPopupGlobalContent").innerHTML=inContent;
    document.getElementById("HHAutoPopupGlobalTitle").innerHTML=inTitle;
    document.getElementById("HHAutoPopupGlobalPopup").className =inClass;
}

function createHHPopUp()
{
    GM_addStyle('#HHAutoPopupGlobal.HHAutoOverlay { overflow: auto;  z-index:1000;   position: fixed;   top: 0;   bottom: 0;   left: 0;   right: 0;   background: rgba(0, 0, 0, 0.7);   transition: opacity 500ms;     display: flex;   align-items: center; }  '
    + '#HHAutoPopupGlobalPopup {   margin: auto;   padding: 20px;   background: #fff;   border-radius: 5px;   position: relative;   transition: all 5s ease-in-out; }  '
    + '#HHAutoPopupGlobalTitle {   margin-top: 0;   color: #333;   font-size: larger; } '
    + '#HHAutoPopupGlobalClose {   position: absolute;   top: 0;   right: 30px;   transition: all 200ms;   font-size: 50px;   font-weight: bold;   text-decoration: none;   color: #333; } '
    + '#HHAutoPopupGlobalClose:hover {   color: #06D85F; } '
    + '#HHAutoPopupGlobalContent .HHAutoScriptMenu .rowLine { display:flex;flex-direction:row;align-items:center;column-gap:20px;justify-content: center; } '
    + '#HHAutoPopupGlobalContent {   max-height: 30%;   overflow: auto;   color: #333;   font-size: x-small; }'
    + '#HHAutoPopupGlobalContent .HHAutoScriptMenu .switch {  width: 55px; height: 32px; }'
    + '#HHAutoPopupGlobalContent .HHAutoScriptMenu input:checked + .slider:before { -webkit-transform: translateX(20px); -ms-transform: translateX(20px); transform: translateX(20px); } '
    + '#HHAutoPopupGlobalContent .HHAutoScriptMenu .slider.round::before {  width: 22px; height: 22px; bottom: 5px; }');

    let popUp = '<div id="HHAutoPopupGlobal" class="HHAutoOverlay">'
    +' <div id="HHAutoPopupGlobalPopup">'
    +'   <h2 id="HHAutoPopupGlobalTitle">Here i am</h2>'
    +'   <a id="HHAutoPopupGlobalClose">&times;</a>'
    +'   <div id="HHAutoPopupGlobalContent" class="content">'
    +'      Thank to pop me out of that button, but now im done so you can close this window.'
    +'   </div>'
    +' </div>'
    +'</div>';
    $('body').prepend(popUp);
    document.getElementById("HHAutoPopupGlobalClose").addEventListener("click", function(){
        maskHHPopUp();
    });
    document.addEventListener('keyup', evt => {
        if (evt.key === 'Escape')
        {
            maskHHPopUp();
        }
    });
}

function isDisplayedHHPopUp()
{
    if (document.getElementById("HHAutoPopupGlobal") === null)
    {
        return false;
    }
    if (document.getElementById("HHAutoPopupGlobal").style.display === "none")
    {
        return false;
    }
    return document.getElementById("HHAutoPopupGlobalPopup").className;
}

function displayHHPopUp()
{
    if (document.getElementById("HHAutoPopupGlobal") === null)
    {
        return false;
    }
    document.getElementById("HHAutoPopupGlobal").style.display = "";
    document.getElementById("HHAutoPopupGlobal").style.opacity = 1;
}

function maskHHPopUp()
{
    document.getElementById("HHAutoPopupGlobal").style.display = "none";
    document.getElementById("HHAutoPopupGlobal").style.opacity = 0;
}

function checkAndClosePopup(inBurst)
{
    const popUp = $('#popup_message[style*="display: block"]');
    if ((inBurst || isFocused()) && popUp.length > 0)
    {
        $('close', popUp).click();
    }
}
;// CONCATENATED MODULE: ./src/Utils/index.js




;// CONCATENATED MODULE: ./src/Helper/BDSMHelper.js





function customMatchRating(inSimu) // NOT used ?
{
    let matchRating = inSimu.score;
    var customLimits = getStoredValue("HHAuto_Setting_calculatePowerLimits").split(";");
    if(customLimits.length === 2 && Number(customLimits[0]) < Number(customLimits[1]))
    {
        if (matchRating >= 0)
        {
            matchRating = '+' + matchRating;
        }
        if ( Number(matchRating) < Number(customLimits[0]) )
        {
            return 'r'+matchRating
        }
        else
        {
            if ( Number(matchRating) < Number(customLimits[1]) )
            {
                return 'y'+matchRating
            }
            else
            {
                return 'g'+matchRating
            }
        }
    }
    else
    {
        if ( getStoredValue("HHAuto_Setting_calculatePowerLimits") !== "default")
        {
            setStoredValue("HHAuto_Setting_calculatePowerLimits", "Invalid limits");
        }
        if (matchRating >= 0)
        {
            matchRating = '+' + matchRating;

            if (inSimu.playerEgoCheck <= 0)
            {
                return 'y'+matchRating
            }
            else
            {
                return 'g'+matchRating
            }
        }
        else {
            matchRating = matchRating;
            return 'r'+matchRating
        }
    }
}

let _player;
let _opponent;
let _cache;
let _runs;
//all following lines credit:Tom208 OCD script
function calculateBattleProbabilities(player, opponent) {
    _player = player;
    _opponent = opponent;

    const setup = x => {
        x.critMultiplier = 2 + x.bonuses.critDamage;
        x.dmg = Math.max(0, x.dmg);
        x.baseAttack = {
            probability: 1 - x.critchance,
            damageAmount: Math.ceil(x.dmg),
            healAmount: Math.ceil(x.dmg * x.bonuses.healOnHit)
        };
        x.critAttack = {
            probability: x.critchance,
            damageAmount: Math.ceil(x.dmg * x.critMultiplier),
            healAmount: Math.ceil(x.dmg * x.critMultiplier * x.bonuses.healOnHit)
        };
        x.hp = Math.ceil(x.hp);
    }

    setup(_player);
    setup(_opponent);

    _cache = {};
    _runs = 0;

    let ret;
    try {
        // start simulation from player's turn
        ret = playerTurn(_player.hp, _opponent.hp, 0);
    } catch (error) {
        return {
            points: [],
            win: Number.NaN,
            loss: Number.NaN,
            avgTurns: Number.NaN,
            scoreClass: 'minus'
        };
    }

    const sum = ret.win + ret.loss;
    ret.win /= sum;
    ret.loss /= sum;
    ret.scoreClass = ret.win>0.9?'plus':ret.win<0.5?'minus':'close';

    return ret;


    function mergeResult(x, xProbability, y, yProbability) {
        const points = {};
        Object.entries(x.points).map(([point, probability]) => [point, probability * xProbability])
            .concat(Object.entries(y.points).map(([point, probability]) => [point, probability * yProbability]))
            .forEach(([point, probability]) => {
            points[point] = (points[point] || 0) + probability
        });
        const merge = (x, y) => x * xProbability + y * yProbability;
        const win = merge(x.win, y.win);
        const loss = merge(x.loss, y.loss);
        const avgTurns = merge(x.avgTurns, y.avgTurns);
        return { points, win, loss, avgTurns };
    }

    function playerTurn(playerHP, opponentHP, turns) {
        turns += 1;
        // avoid a stack overflow
        const maxAllowedTurns = 50;
        if (turns > maxAllowedTurns) throw new Error();

        // read cache
        const cachedResult = _cache?.[playerHP]?.[opponentHP];
        if (cachedResult) return cachedResult;

        // simulate base attack and critical attack
        const baseAtk = _player.baseAttack;
        const baseAtkResult = playerAttack(playerHP, opponentHP, baseAtk, turns);
        const critAtk = _player.critAttack;
        const critAtkResult = playerAttack(playerHP, opponentHP, critAtk, turns);
        // merge result
        const mergedResult = mergeResult(baseAtkResult, baseAtk.probability, critAtkResult, critAtk.probability);

        // count player's turn
        mergedResult.avgTurns += 1;

        // write cache
        if (!_cache[playerHP]) _cache[playerHP] = {};
        if (!_cache[playerHP][opponentHP]) _cache[playerHP][opponentHP] = {};
        _cache[playerHP][opponentHP] = mergedResult;

        return mergedResult;
    }

    function playerAttack(playerHP, opponentHP, attack, turns) {
        // damage
        opponentHP -= attack.damageAmount;

        // heal on hit
        playerHP += attack.healAmount;
        playerHP = Math.min(playerHP, _player.hp);

        // check win
        if (opponentHP <= 0) {
            const point = 15 + Math.ceil(10 * playerHP / _player.hp);
            _runs += 1;
            return { points: { [point]: 1 }, win: 1, loss: 0, avgTurns: 0 };
        }

        // next turn
        return opponentTurn(playerHP, opponentHP, turns);
    }

    function opponentTurn(playerHP, opponentHP, turns) {
        // simulate base attack and critical attack
        const baseAtk = _opponent.baseAttack;
        const baseAtkResult = opponentAttack(playerHP, opponentHP, baseAtk, turns);
        const critAtk = _opponent.critAttack;
        const critAtkResult = opponentAttack(playerHP, opponentHP, critAtk, turns);
        // merge result
        return mergeResult(baseAtkResult, baseAtk.probability, critAtkResult, critAtk.probability);
    }

    function opponentAttack(playerHP, opponentHP, attack, turns) {
        // damage
        playerHP -= attack.damageAmount;

        // heal on hit
        opponentHP += attack.healAmount;
        opponentHP = Math.min(opponentHP, _opponent.hp);

        // check loss
        if (playerHP <= 0) {
            const point = 3 + Math.ceil(10 * (_opponent.hp - opponentHP) / _opponent.hp);
            _runs += 1;
            return { points: { [point]: 1 }, win: 0, loss: 1, avgTurns: 0 };
        }

        // next turn
        return playerTurn(playerHP, opponentHP, turns);
    }
}

function calculateThemeFromElements(elements) {
    const counts = countElementsInTeam(elements)

    const theme = []
    Object.entries(counts).forEach(([element, count]) => {
        if (count >= 3) {
            theme.push(element)
        }
    })
    return theme;
}

function countElementsInTeam(elements) {
    return elements.reduce((a,b)=>{a[b]++;return a}, {
        fire: 0,
        stone: 0,
        sun: 0,
        water: 0,
        nature: 0,
        darkness: 0,
        light: 0,
        psychic: 0
    })
}

function simulateBattle (player, opponent) {
    let points

    const playerStartHP = player.hp
    const opponentStartHP = opponent.hp

    let turns = 0

    while (true) {
        turns++
        //your turn
        let damageAmount = player.dmg
        if (Math.random() < player.critchance) {
            damageAmount = player.dmg * player.critMultiplier
        }
        let healAmount = Math.min(playerStartHP - player.hp, damageAmount * player.bonuses.healOnHit)
        opponent.hp -= damageAmount;
        player.hp += healAmount;

        //check win
        if(opponent.hp<=0){
            //count score
            points = 15+Math.ceil(player.hp/playerStartHP * 10);
            break;
        }

        //opp's turn
        damageAmount = opponent.dmg
        if (Math.random() < opponent.critchance) {
            damageAmount = opponent.dmg * opponent.critMultiplier
        }
        healAmount = Math.min(opponentStartHP - opponent.hp, damageAmount * opponent.bonuses.healOnHit)
        player.hp -= damageAmount;
        opponent.hp += healAmount;

        //check loss
        if(player.hp<=0){
            //count score
            points = 3+Math.ceil((opponentStartHP - opponent.hp)/opponentStartHP * 10);
            break;
        }
    }

    return {points, turns}
}

/*
commented        const girlDictionary
replaced         const girlCount = girlDictionary.size || 800
              by const girlCount = isJSON(getStoredValue("HHAuto_Temp_HaremSize"))?JSON.parse(getStoredValue("HHAuto_Temp_HaremSize")).count:800;
              */
function calculateSynergiesFromTeamMemberElements(elements) {
    const counts = countElementsInTeam(elements)

    // Only care about those not included in the stats already: fire, stone, sun and water
    // Assume max harem synergy
    //const girlDictionary = (typeof(localStorage.HHPNMap) == "undefined") ? new Map(): new Map(JSON.parse(localStorage.HHPNMap));
    const girlCount = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_HaremSize"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_HaremSize")).count:800;
    const girlsPerElement = Math.min(girlCount / 8, 100)

    return {
        critDamage: (0.0035 * girlsPerElement) + (0.1  * counts.fire),
        critChance: (0.0007 * girlsPerElement) + (0.02 * counts.stone),
        defReduce:  (0.0007 * girlsPerElement) + (0.02 * counts.sun),
        healOnHit:  (0.001  * girlsPerElement) + (0.03 * counts.water)
    }
}
/*
replaced       ELEMENTS
by getHHScriptVars("ELEMENTS")
*/
function calculateDominationBonuses(playerElements, opponentElements) {
    const bonuses = {
        player: {
            ego: 0,
            attack: 0,
            chance: 0
        },
        opponent: {
            ego: 0,
            attack: 0,
            chance: 0
        }
    };

    [
        {a: playerElements, b: opponentElements, k: 'player'},
        {a: opponentElements, b: playerElements, k: 'opponent'}
    ].forEach(({a,b,k})=>{
        a.forEach(element => {
            if (getHHScriptVars("ELEMENTS").egoDamage[element] && b.includes(getHHScriptVars("ELEMENTS").egoDamage[element])) {
                bonuses[k].ego += 0.1
                bonuses[k].attack += 0.1
            }
            if (getHHScriptVars("ELEMENTS").chance[element] && b.includes(getHHScriptVars("ELEMENTS").chance[element])) {
                bonuses[k].chance += 0.2
            }
        })
    })

    return bonuses
}

function calculateCritChanceShare(ownHarmony, otherHarmony)
{
    return 0.3*ownHarmony/(ownHarmony+otherHarmony)
}
;// CONCATENATED MODULE: ./src/Helper/ButtonHelper.js



function getGoToChangeTeamButton() {
    // TODO change href and translate
    return '<div class="change_team_container"><a id="change_team" href="/teams.html" class="blue_button_L" anim-step="afterStartButton"><div>Change team</div></a></div>';
}

function getGoToClubChampionButton() {
    return `<button data-href="${getHHScriptVars("pagesURLClubChampion")}" class="blue_button_L hh-club-poa">${getTextForUI("goToClubChampions","elementText")}</button>`;
}
;// CONCATENATED MODULE: ./src/Helper/HHHelper.js



function getHHVars(infoSearched, logging = true)
{
    let returnValue = unsafeWindow;
    if (getHHScriptVars(infoSearched,false) !== null)
    {
        infoSearched = getHHScriptVars(infoSearched);
    }

    let splittedInfoSearched = infoSearched.split(".");

    for (let i=0;i<splittedInfoSearched.length;i++)
    {
        if (returnValue[splittedInfoSearched[i]] === undefined)
        {
            if (logging)
            {
                LogUtils_logHHAuto("HH var not found : "+infoSearched+" ("+splittedInfoSearched[i]+" not defined).");
            }
            return null;
        }
        else
        {
            returnValue = returnValue[splittedInfoSearched[i]];
        }
    }
    return returnValue;
}

function setHHVars(infoSearched,newValue)
{
    let returnValue = unsafeWindow;
    if (getHHScriptVars(infoSearched,false) !== null)
    {
        infoSearched = getHHScriptVars(infoSearched);
    }

    let splittedInfoSearched = infoSearched.split(".");

    for (let i=0;i<splittedInfoSearched.length;i++)
    {
        if (returnValue[splittedInfoSearched[i]] === undefined)
        {
            LogUtils_logHHAuto("HH var not found : "+infoSearched+" ("+splittedInfoSearched[i]+" not defined).");
            return -1;
        }
        else if ( i === splittedInfoSearched.length - 1)
        {
            returnValue[splittedInfoSearched[i]] = newValue;
            return 0;
        }
        else
        {
            returnValue = returnValue[splittedInfoSearched[i]];
        }
    }
}

;// CONCATENATED MODULE: ./src/Helper/TimeHelper.js





function getServerTS()
{
    let sec_num = parseInt(getHHVars('server_now_ts'), 10);
    let days = Math.floor(sec_num / 86400);
    let hours = Math.floor(sec_num / 3600) % 24;
    let minutes = Math.floor(sec_num / 60) % 60;
    let seconds = sec_num % 60;
    return {days:days,hours:hours,minutes:minutes,seconds:seconds};
}

function TimeHelper_toHHMMSS(secs)  {
    var sec_num = parseInt(secs, 10);
    var days = Math.floor(sec_num / 86400);
    var hours = Math.floor(sec_num / 3600) % 24;
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;
    var n=0;
    return [days,hours,minutes,seconds]
        .map(v => v < 10 ? "0" + v : v)
        .filter((v,i) => {if (v !== "00"){n++; return true;} return n > 0})
        .join(":");
}

function getSecondsLeftBeforeEndOfHHDay()
{
    let HHEndOfDay = {days:0,hours:11,minutes:0,seconds:0};
    let server_TS = getServerTS();
    HHEndOfDay.days = server_TS.hours<HHEndOfDay.hours?0:1;
    let diffResetTime = (HHEndOfDay.days*86400 + HHEndOfDay.hours * 3600 + HHEndOfDay.minutes * 60) - (server_TS.hours * 3600 + server_TS.minutes * 60);
    return diffResetTime;
}

function getSecondsLeftBeforeNewCompetition()
{
    let HHEndOfDay = {days:0,hours:11,minutes:30,seconds:0};
    let server_TS = getServerTS();
    HHEndOfDay.days = server_TS.hours<HHEndOfDay.hours?0:1;
    let diffResetTime = (HHEndOfDay.days*86400 + HHEndOfDay.hours * 3600 + HHEndOfDay.minutes * 60) - (server_TS.hours * 3600 + server_TS.minutes * 60);
    return diffResetTime;
}

function debugDate(sec_num){
    let days = Math.floor(sec_num / 86400);
    let hours = Math.floor(sec_num / 3600) % 24;
    let minutes = Math.floor(sec_num / 60) % 60;
    let seconds = sec_num % 60;
    return JSON.stringify({days:days,hours:hours,minutes:minutes,seconds:seconds});
}

function convertTimeToInt(remainingTimer){
    let newTimer = 0;
    if (remainingTimer && remainingTimer.length > 0) {
        let splittedTime = remainingTimer.split(' ');
        for (let i = 0; i < splittedTime.length; i++) {
            let timerSymbol = splittedTime[i].match(/[^0-9]+/)[0];
            switch (timerSymbol) {
                case timerDefinitions[hhTimerLocale].days:
                    newTimer += parseInt(splittedTime[i])*86400;
                    break;
                case timerDefinitions[hhTimerLocale].hours:
                    newTimer += parseInt(splittedTime[i])*3600;
                    break;
                case timerDefinitions[hhTimerLocale].minutes:
                    newTimer += parseInt(splittedTime[i])*60;
                    break;
                case timerDefinitions[hhTimerLocale].seconds:
                    newTimer += parseInt(splittedTime[i]);
                    break;
                default:
                    LogUtils_logHHAuto('Timer symbol not recognized: ' + timerSymbol);
            }
        }
    } else {
            LogUtils_logHHAuto('No valid timer definitions, reset to 15min');
            newTimer = 15*60;
    }
    return newTimer;
}

function canCollectCompetitionActive()
{
    return StorageHelper_getStoredValue("HHAuto_Setting_waitforContest") !== "true" || getSecondsLeftBeforeNewCompetition() > 32*60 && getSecondsLeftBeforeNewCompetition() < (24*3600-2*60);
}


function getLimitTimeBeforeEnd(){
    return Number(StorageHelper_getStoredValue("HHAuto_Setting_collectAllTimer")) * 3600;
}


function randomInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}
;// CONCATENATED MODULE: ./src/Helper/HeroHelper.js






function getHero()
{
    if(unsafeWindow.Hero === undefined)
    {
        setTimeout(autoLoop, Number(StorageHelper_getStoredValue("HHAuto_Temp_autoLoopTimeMili")))
        //logHHAuto(window.wrappedJSObject)
    }
    //logHHAuto(unsafeWindow.Hero);
    return unsafeWindow.Hero;
}

function doStatUpgrades()
{
    //Stats?
    //logHHAuto('stats');
    var Hero=getHero();
    var level=getHHVars('Hero.infos.level');
    var stats=[getHHVars('Hero.infos.carac1'),getHHVars('Hero.infos.carac2'),getHHVars('Hero.infos.carac3')];
    var money=getHHVars('Hero.currencies.soft_currency');
    var count=0;
    var M=Number(StorageHelper_getStoredValue("HHAuto_Setting_autoStats"));
    var MainStat=stats[getHHVars('Hero.infos.class')-1];
    var Limit=getHHVars('Hero.infos.level')*30;//getHHVars('Hero.infos.level')*19+Math.min(getHHVars('Hero.infos.level'),25)*21;
    var carac=getHHVars('Hero.infos.class');
    var mp=0;
    var mults=[60,30,10,1];
    for (var car=0; car<3; car++)
    {
        //logHHAuto('stat '+carac);
        var s=stats[carac-1];
        for (var mu=0;mu<5;mu++)
        {
            var mult=mults[mu];
            var price = 5+s*2+(Math.max(0,s-2000)*2)+(Math.max(0,s-4000)*2)+(Math.max(0,s-6000)*2)+(Math.max(0,s-8000)*2);
            price*=mult;
            if (carac==getHHVars('Hero.infos.class'))
            {
                mp=price;
            }
            //logHHAuto('money: '+money+' stat'+carac+': '+stats[carac-1]+' price: '+price);
            if ((stats[carac-1]+mult)<=Limit && (money-price)>M && (carac==getHHVars('Hero.infos.class') || price<mp/2 || (MainStat+mult)>Limit))
            {
                count++;
                LogUtils_logHHAuto('money: '+money+' stat'+carac+': '+stats[carac-1]+' [+'+mult+'] price: '+price);
                money-=price;
                var params = {
                    carac: "carac" + carac,
                    action: "hero_update_stats",
                    nb: mult
                };
                hh_ajax(params, function(data) {
                    Hero.update("soft_currency", 0 - price, true);
                });
                setTimeout(doStatUpgrades, randomInterval(300,500));
                return;
                break;
            }
        }
        carac=(carac+1)%3+1;
    }
}

class HeroHelper {
    static haveBoosterInInventory(idBooster){
        const HaveBooster=isJSON(getStoredValue("HHAuto_Temp_haveBooster"))?JSON.parse(getStoredValue("HHAuto_Temp_haveBooster")):{};
        const boosterOwned = HaveBooster.hasOwnProperty(idBooster) ? Number(HaveBooster[idBooster]) : 0;
        return boosterOwned > 0
    }
    static equipBooster(booster){
        logHHAuto("Not yet enough tested, do not use");
        if(!booster) return false;
        if(!HeroHelper.haveBoosterInInventory(booster.identifier)) return false;
        //action=market_equip_booster&id_item=316&type=booster
        setStoredValue("HHAuto_Temp_autoLoop", "false");
        logHHAuto("Equip "+booster.name+", setting autoloop to false");
        const params = {
            action: "market_equip_booster",
            id_item: booster.id_item,
            type: "booster"
        };
        /*
        hh_ajax(params, function(data) {
            if (data.success) logHHAuto('Booster equipped');
            setStoredValue("HHAuto_Temp_autoLoop", "true");
            setTimeout(autoLoop,randomInterval(500,800));
        }, function (err){
            logHHAuto('Error occured booster not equipped, could be booster is already equipped');
            setStoredValue("HHAuto_Temp_autoLoop", "true");
            setTimeout(autoLoop,randomInterval(500,800));
        });
        */
    }
}
;// CONCATENATED MODULE: ./src/Helper/UrlHelper.js
function queryStringGetParam(inQueryString, inParam)
{
    let urlParams = new URLSearchParams(inQueryString);
    return urlParams.get(inParam);
}

function url_add_param(url, param, value) {
    if (url.indexOf('?') === -1) url += '?';
    else url += '&';
    return url+param+"="+value;
}
;// CONCATENATED MODULE: ./src/Helper/PageHelper.js






function getPage(checkUnknown = false)
{
    var ob = document.getElementById(getHHScriptVars("gameID"));
    if(ob===undefined || ob === null)
    {
        LogUtils_logHHAuto("Unable to find page attribute, stopping script");
        StorageHelper_setStoredValue("HHAuto_Setting_master", "false");
        StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
        LogUtils_logHHAuto("setting autoloop to false");
        throw new Error("Unable to find page attribute, stopping script.");
        return "";
    }
    //var p=ob.className.match(/.*page-(.*) .*/i)[1];
    let activitiesMainPage = getHHScriptVars("pagesIDActivities");
    var tab = queryStringGetParam(window.location.search,'tab');
    var p=ob.getAttribute('page');
    let page = p;
    if (p==activitiesMainPage)
    {
        if (tab === 'contests' || $("#activities-tabs > div.switch-tab.underline-tab.tab-switcher-fade-in[data-tab='contests']").length>0)
        {
            page = getHHScriptVars("pagesIDContests");
        }
        if (tab === 'missions' || $("#activities-tabs > div.switch-tab.underline-tab.tab-switcher-fade-in[data-tab='missions']").length>0)
        {
            page = getHHScriptVars("pagesIDMissions");
        }
        if (tab === 'daily_goals' || $("#activities-tabs > div.switch-tab.underline-tab.tab-switcher-fade-in[data-tab='daily_goals']").length>0)
        {
            page = getHHScriptVars("pagesIDDailyGoals");

            if (tab === 'pop') {
                // Wrong POP targetted
                var index = queryStringGetParam(window.location.search,'index');
                if (index !== null)
                {
                    PlaceOfPower.addPopToUnableToStart(index,"Unable to go to Pop "+index+" as it is locked.");
                    PlaceOfPower.removePopFromPopToStart(index);
                }
            }
        }
        if (tab === 'pop' || $("#activities-tabs > div.switch-tab.underline-tab.tab-switcher-fade-in[data-tab='pop']").length>0)
        {
            // if on Pop menu
            var t;
            var popList= $("div.pop_list")
            if (popList.attr('style') !='display:none' )
            {
                t = 'main';
            }
            else
            {
                // Keep this but not triggered anymore. When Wrong POP is targetted, daily goals is highlighted
                t=$(".pop_thumb_selected").attr("pop_id");
                checkUnknown = false;
                if (t === undefined)
                {
                    var index = queryStringGetParam(window.location.search,'index');
                    if (index !== null)
                    {
                        PlaceOfPower.addPopToUnableToStart(index,"Unable to go to Pop "+index+" as it is locked.");
                        PlaceOfPower.removePopFromPopToStart(index);
                        t='main';
                    }
                }
            }
            page = "powerplace"+t;
        }
    }
    if (checkUnknown)
    {
        const knownPages = getHHScriptVars("pagesKnownList");
        let isKnown = false;
        for (let knownPage of knownPages)
        {
            //console.log(knownPage)
            if (page === getHHScriptVars("pagesID"+knownPage))
            {
                isKnown = true;
            }
        }
        if (!isKnown && page )
        {
            let unknownPageList = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_unkownPagesList"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_unkownPagesList")):{};
            LogUtils_logHHAuto("Page unkown for script : "+page+" / "+window.location.pathname);
            unknownPageList[page] = window.location.pathname;
            //console.log(unknownPageList);
            StorageHelper_setStoredValue("HHAuto_Temp_unkownPagesList", JSON.stringify(unknownPageList));
        }
    }
    return page;
}
;// CONCATENATED MODULE: ./src/Helper/PriceHelper.js


function parsePrice(princeStr) {
    // Parse price to number 105K to 105000, 6.38M to 6380000
    // Replace comma by dots for local supports
    let ret = Number.NaN;
    if(princeStr && princeStr.indexOf('B')>0) {
        ret = Number(princeStr.replace(/B/g, '').replace(',', '.')) * 1000000000;
    } else if(princeStr && princeStr.indexOf('M')>0) {
        ret = Number(princeStr.replace(/M/g, '').replace(',', '.')) * 1000000;
    } else if(princeStr && princeStr.indexOf('K')>0) {
        ret = Number(princeStr.replace(/K/g, '').replace(',', '.')) * 1000;
    } else {
        ret = remove1000sSeparator(princeStr);
    }
    return ret;
}

function manageUnits(inText)
{
    let units = ["firstUnit", "K", "M", "B"];
    let textUnit= "";
    for (let currUnit of units)
    {
        if (inText.includes(currUnit))
        {
            textUnit= currUnit;
        }
    }
    if (textUnit !== "")
    {
        let integerPart;
        let decimalPart;
        if (inText.includes('.') )
        {
            inText = inText.replace(/[^0-9\.]/gi, '');
            integerPart = inText.split('.')[0];
            decimalPart = inText.split('.')[1];

        }
        else if (inText.includes(','))
        {
            inText = inText.replace(/[^0-9,]/gi, '');
            integerPart = inText.split(',')[0];
            decimalPart = inText.split(',')[1];
        }
        else
        {
            integerPart = inText.replace(/[^0-9]/gi, '');
            decimalPart = "0";
        }
        //console.log(integerPart,decimalPart);
        let decimalNumber = Number(integerPart)
        if (Number(decimalPart) !== 0)
        {
            decimalNumber+= Number(decimalPart)/(10**decimalPart.length)
        }
        return decimalNumber*(1000**units.indexOf(textUnit));
    }
    else
    {
        return parseInt(inText.replace(/[^0-9]/gi, ''));
    }
}

;// CONCATENATED MODULE: ./src/Helper/RewardHelper.js











class RewardHelper {
    static getRewardTypeBySlot(inSlot)
    {
        let reward = "undetected";
        if (inSlot.className.indexOf('slot') >= 0)
        {
            if (inSlot.getAttribute("cur") !== null)
            {
                //console.log(currentIndicator+" : "+inSlot.getAttribute("cur"));
                reward = inSlot.getAttribute("cur");
            }
            else if (inSlot.className.indexOf('slot_avatar') >= 0)
            {
                //console.log(currentIndicator+" : avatar");
                if (inSlot.className.indexOf('girl_ico') >= 0)
                {
                    reward = 'girl_shards';
                }
                else
                {
                    reward = 'avatar';
                }
            }
            else if (inSlot.className.indexOf('girl-shards-slot') >= 0)
            {
                reward = 'girl_shards';
            }
            else if (inSlot.className.indexOf('mythic') >= 0)
            {
                //console.log("mythic equipment");
                reward = 'mythic';
            }
            else if (inSlot.className.indexOf('slot_scrolls_') >= 0)
            {
                reward = 'scrolls';
            }
            else if (inSlot.getAttribute("data-d") !== null && $(inSlot).data("d"))
            {
                let objectData = $(inSlot).data("d");
                //console.log(currentIndicator+" : "+inSlot.getAttribute("rarity")+" "+objectData.item.type+" "+objectData.item.value);
                reward = objectData.item.type;
            }else{
                const possibleRewards = getHHScriptVars("possibleRewardsList");
                for (let currentRewards of Object.keys(possibleRewards))
                {
                    if (inSlot.className.indexOf('slot_'+currentRewards) >= 0)
                    {
                        reward = currentRewards;
                    }
                }
            }
        }
        else if (inSlot.className.indexOf('shards_girl_ico') >= 0)
        {
            //console.log(currentIndicator+" : shards_girl_ico");
            reward = 'girl_shards';
        }
        //console.log(reward);
        return reward;
    }

    static getRewardTypeByData(inData)
    {
        let reward = "undetected";
        if (inData.hasOwnProperty("type"))
        {
            reward = inData.type;
        }
        else if (inData.hasOwnProperty("ico"))
        {
            if ( inData.ico.indexOf("items/K") > 0 )
            {
                reward = "gift";
            }
            else if ( inData.ico.indexOf("items/XP") > 0 )
            {
                reward = "potion";
            }
        }
        //console.log(reward);
        return reward;
    }

    static getRewardQuantityByType(rewardType, inSlot){
        // TODO update logic for potion / gift to be more accurate
        switch(rewardType)
        {
            case 'girl_shards' :    return Number($('.shards', inSlot).attr('shards'));
            case 'energy_kiss':
            case 'energy_quest':
            case 'energy_fight' :
            case 'xp' :
            case 'soft_currency' :
            case 'hard_currency' :
            case 'gift':
            case 'potion' :
            case 'booster' :
            case 'orbs':
            case 'gems' :
            case 'scrolls' :
            case 'ticket' :         return parsePrice($('.amount', inSlot).text());
            case 'mythic' :         return 1;
            case 'avatar':          return 1;
            default: LogUtils_logHHAuto('Error: reward type unknown ' + rewardType);
            return 0;
        }
    }
    static getPovNotClaimedRewards(){
        const arrayz = $('.potions-paths-tiers-section .potions-paths-tier.unclaimed');
        const freeSlotSelectors = ".free-slot:not(.claimed-locked) .slot,.free-slot:not(.claimed-locked) .shards_girl_ico";
        const paidSlotSelectors = ".paid-slots:not(.paid-locked):not(.claimed-locked) .slot,.paid-slots:not(.paid-locked):not(.claimed-locked) .shards_girl_ico";

        return RewardHelper.computeRewardsCount(arrayz, freeSlotSelectors, paidSlotSelectors);
    }
    static getSeasonNotClaimedRewards(){
        const arrayz = $('.rewards_pair');
        const freeSlotSelectors = ".free_reward.reward_is_claimable .slot";
        let paidSlotSelectors = "";
        if($("div#gsp_btn_holder[style='display: none;']").length) {
            // Season pass paid
            paidSlotSelectors = ".pass_reward.reward_is_claimable .slot";
        }

        return RewardHelper.computeRewardsCount(arrayz, freeSlotSelectors, paidSlotSelectors);
    }
    static getPoaNotClaimedRewards(){
        const arrayz = $('.nc-poa-reward-pair');
        const freeSlotSelectors = ".nc-poa-free-reward.claimable .slot";
        let paidSlotSelectors = "";
        if($("div#nc-poa-tape-blocker").length == 0) {
            // Season pass paid
            paidSlotSelectors = ".nc-poa-locked-reward.claimable .slot";
        }

        return RewardHelper.computeRewardsCount(arrayz, freeSlotSelectors, paidSlotSelectors);
    }
    static computeRewardsCount(arrayz, freeSlotSelectors, paidSlotSelectors) {
        const rewardCountByType = {};
        var rewardType, rewardSlot, rewardAmount;

// data-d='{"item":{"id_item":"323","type":"potion","identifier":"XP4","rarity":"legendary","price":"500000","currency":"sc","value":"2500","carac1":"0","carac2":"0","carac3":"0","endurance":"0","chance":"0.00","ego":"0","damage":"0","duration":"0","skin":"hentai,gay,sexy","name":"Spell book","ico":"https://hh.hh-content.com/pictures/items/XP4.png","display_price":500000},"quantity":"1"}'

        rewardCountByType['all'] = arrayz.length; 
        if (arrayz.length > 0)
        {
            for (var slotIndex = arrayz.length - 1; slotIndex >= 0; slotIndex--)
            {
                [freeSlotSelectors, paidSlotSelectors].forEach((selector) => {
                    rewardSlot = $(selector,arrayz[slotIndex]);
                    if(rewardSlot.length > 0) {
                        rewardType = RewardHelper.getRewardTypeBySlot(rewardSlot[0]);
                        rewardAmount = RewardHelper.getRewardQuantityByType(rewardType, rewardSlot[0]);
                        if(rewardCountByType.hasOwnProperty(rewardType)) {
                            rewardCountByType[rewardType] = rewardCountByType[rewardType] + rewardAmount;
                        }else{
                            rewardCountByType[rewardType] = rewardAmount;
                        }
                    }
                });
            }
        }
        return rewardCountByType;
    }
    static getRewardsAsHtml(rewardCountByType) {
        let html = '';
        for (const [rewardType, rewardCount] of Object.entries(rewardCountByType)) {
            switch(rewardType)
            {
                // case 'girl_shards' :    return Number($('.shards', inSlot).attr('shards'));
                case 'energy_kiss':     html += '<div class="slot slot_energy_kiss  size_xs"><span class="energy_kiss_icn"></span><div class="amount">'+nRounding(rewardCount,0,-1)+'</div></div>'; break;
                case 'energy_quest':    html += '<div class="slot slot_energy_quest size_xs"><span class="energy_quest_icn"></span><div class="amount">'+nRounding(rewardCount,0,-1)+'</div></div>'; break;
                case 'energy_fight' :   html += '<div class="slot slot_energy_fight  size_xs"><span class="energy_fight_icn"></span><div class="amount">'+nRounding(rewardCount,0,-1)+'</div></div>'; break;
                case 'xp' :             html += '<div class="slot slot_xp size_xs"><span class="xp_icn"></span><div class="amount">'+nRounding(rewardCount,1,-1)+'</div></div>'; break;
                case 'soft_currency' :  html += '<div class="slot slot_soft_currency size_xs"><span class="soft_currency_icn"></span><div class="amount">'+nRounding(rewardCount,1,-1)+'</div></div>'; break;
                case 'hard_currency' :  html += '<div class="slot slot_hard_currency size_xs"><span class="hard_currency_icn"></span><div class="amount">'+nRounding(rewardCount,0,-1)+'</div></div>'; break;
                // case 'gift':
                // case 'potion' :
                // case 'booster' :
                // case 'orbs':
                // case 'gems' :           html += '<div class="slot slot_gems size_xs"><span class="gem_all_icn"></span><div class="amount">'+nRounding(rewardCount,0,-1)+'</div></div>'; break;
                // case 'scrolls' :
                case 'ticket' :         html += '<div class="slot slot_ticket size_xs"><span class="ticket_icn"></span><div class="amount">'+nRounding(rewardCount,0,-1)+'</div></div>'; break;
                // case 'mythic' :         html += '<div class="slot mythic random_equipment size_xs"><span class="mythic_equipment_icn"></span><div class="amount">'+nRounding(rewardCount,0,-1)+'</div></div>'; break;
                // case 'avatar':          return 1;
                default: 
            }
        }
        return html;
    }
    static displayRewardsDiv(target,hhRewardId, rewardCountByType ) {
        try{
            if($('#' + hhRewardId).length <= 0) {
                if (rewardCountByType['all'] > 0) {
                    const rewardsHtml = RewardHelper.getRewardsAsHtml(rewardCountByType);
                    target.append($('<div id='+hhRewardId+' class="HHRewardNotCollected"><h1 style="font-size: small;">'+getTextForUI('rewardsToCollectTitle',"elementText")+'</h1>' + rewardsHtml + '</div>'));
                } else {
                    target.append($('<div id='+hhRewardId+' style="display:none;"></div>'));
                }
            }
        } catch(err) {
            LogUtils_logHHAuto("ERROR:", err.message);
            target.append($('<div id='+hhRewardId+' style="display:none;"></div>'));
        }
    }
    static displayRewardsPovPogDiv() {
        const target = $('.potions-paths-first-row');
        const hhRewardId = 'HHPovPogRewards';
        
        if($('#' + hhRewardId).length <= 0) {
            const rewardCountByType = RewardHelper.getPovNotClaimedRewards();
            RewardHelper.displayRewardsDiv(target, hhRewardId, rewardCountByType);
        }
    }
    static displayRewardsSeasonDiv() {
        const target = $('.seasons_controls_holder_global');
        const hhRewardId = 'HHSeasonRewards';
        if($('#' + hhRewardId).length <= 0) {
            const rewardCountByType = RewardHelper.getSeasonNotClaimedRewards();
            RewardHelper.displayRewardsDiv(target, hhRewardId, rewardCountByType);
        }
    }
    static displayRewardsPoaDiv() {
        const target = $('#poa-content .girls');
        const hhRewardId = 'HHPoaRewards';
        if($('#' + hhRewardId).length <= 0) {
            const rewardCountByType = RewardHelper.getPoaNotClaimedRewards();
            RewardHelper.displayRewardsDiv(target, hhRewardId, rewardCountByType);
        }
    }
    static closeRewardPopupIfAny() {
        let rewardQuery="div#rewards_popup button.blue_button_L:not([disabled]):visible";
        if ($(rewardQuery).length >0 )
        {
            LogUtils_logHHAuto("Close reward popup.");
            $(rewardQuery).click();
            return true;
        }
        return false;
    }
    static ObserveAndGetGirlRewards()
    {
        let inCaseTimer = setTimeout(function(){gotoPage(getHHScriptVars("pagesIDHome"));}, 60000); //in case of issue
        function parseReward()
        {
            if (StorageHelper_getStoredValue("HHAuto_Temp_eventsGirlz") === undefined
                || StorageHelper_getStoredValue("HHAuto_Temp_eventGirl") === undefined
                || !Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_eventsGirlz"))
                || !Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")))
            {
                return -1;
            }
            let foughtTrollId = queryStringGetParam(window.location.search,'id_opponent');
            let eventsGirlz =Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_eventsGirlz"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventsGirlz")):{}
            let eventGirl = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")):{};
            let TTF = eventGirl.troll_id;
            if (foughtTrollId != TTF) {
                LogUtils_logHHAuto('Troll from event not fought, can be issue in event variable (event finished ?)');
                TTF = foughtTrollId;
            }
            if ($('#rewards_popup #reward_holder .shards_wrapper').length === 0)
            {
                clearTimeout(inCaseTimer);
                LogUtils_logHHAuto("No girl in reward going back to Troll");
                gotoPage(getHHScriptVars("pagesIDTrollPreBattle"),{id_opponent:TTF});
                return;
            }
            let renewEvent = "";
            let girlShardsWon = $('.shards_wrapper .shards_girl_ico');
            LogUtils_logHHAuto("Detected girl shard reward");
            for (var currGirl=0; currGirl <= girlShardsWon.length; currGirl++)
            {
                let GirlIdSrc = $("img",girlShardsWon[currGirl]).attr("src");
                let GirlId = GirlIdSrc.split('/')[5];
                let GirlShards = Math.min(Number($('.shards[shards]', girlShardsWon[currGirl]).attr('shards')),100);
                if (eventsGirlz.length >0)
                {
                    let GirlIndex = eventsGirlz.findIndex((element) =>element.girl_id === GirlId);
                    if (GirlIndex !==-1)
                    {
                        let wonShards = GirlShards - Number(eventsGirlz[GirlIndex].girl_shards);
                        eventsGirlz[GirlIndex].girl_shards = GirlShards.toString();
                        if (GirlShards === 100)
                        {
                            renewEvent = eventsGirlz[GirlIndex].event_id;
                        }
                        if (wonShards > 0)
                        {
                            LogUtils_logHHAuto("Won "+wonShards+" event shards for "+eventsGirlz[GirlIndex].girl_name);
                        }
                    }
                }
                if (eventGirl.girl_id === GirlId)
                {
                    eventGirl.girl_shards = GirlShards.toString();
                    if (GirlShards === 100)
                    {
                        renewEvent = eventGirl.event_id;
                    }
                }
            }
            StorageHelper_setStoredValue("HHAuto_Temp_eventsGirlz", JSON.stringify(eventsGirlz));
            StorageHelper_setStoredValue("HHAuto_Temp_eventGirl", JSON.stringify(eventGirl));
            if (renewEvent !== ""
                //|| Number(getStoredValue("HHAuto_Temp_EventFightsBeforeRefresh")) < 1
                || EventModule.checkEvent(eventGirl.event_id)
            )
            {
                clearTimeout(inCaseTimer);
                LogUtils_logHHAuto("Need to check back event page");
                if (renewEvent !== "")
                {
                    EventModule.parseEventPage(renewEvent);
                }
                else
                {
                    EventModule.parseEventPage(eventGirl.event_id);
                }
                return;
            }
            else
            {
                clearTimeout(inCaseTimer);
                LogUtils_logHHAuto("Go back to troll after troll fight.");
                gotoPage(getHHScriptVars("pagesIDTrollPreBattle"),{id_opponent:TTF});
                return;
            }
        }

        let observerReward = new MutationObserver(function(mutations) {
            mutations.forEach(parseReward);
        });

        if ($('#rewards_popup').length >0)
        {
            if ($('#rewards_popup')[0].style.display!=="block")
            {
                StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
                LogUtils_logHHAuto("setting autoloop to false to wait for troll rewards");
                observerReward.observe($('#rewards_popup')[0], {
                    childList: false
                    , subtree: false
                    , attributes: true
                    , characterData: false
                });
            }
            else
            {
                parseReward();
            }
        }

        let observerPass = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation)
                            {
                let querySkip = '#contains_all #new_battle .new-battle-buttons-container #new-battle-skip-btn.blue_text_button[style]';
                if ($(querySkip).length === 0
                    && $(querySkip)[0].style.display!=="block"
                )
                {
                    return;
                }
                else
                {
                    //replaceCheatClick();
                    setTimeout(function()
                            {
                        $(querySkip)[0].click();
                        LogUtils_logHHAuto("Clicking on pass battle.");
                    }, randomInterval(800,1200));
                }
            })
        });

        observerPass.observe($('#contains_all #new_battle .new-battle-buttons-container #new-battle-skip-btn.blue_text_button')[0], {
            childList: false
            , subtree: false
            , attributes: true
            , characterData: false
        });
    }
}

;// CONCATENATED MODULE: ./src/Helper/TimerHelper.js




let Timers = {};

function setTimer(name, seconds)
{
    var ND=new Date().getTime() + seconds * 1000;
    Timers[name]=ND;
    StorageHelper_setStoredValue("HHAuto_Temp_Timers", JSON.stringify(Timers));
    LogUtils_logHHAuto(name+" set to "+TimeHelper_toHHMMSS(ND/1000-new Date().getTimezoneOffset()*60)+' ('+ TimeHelper_toHHMMSS(seconds)+')');
}


function TimerHelper_clearTimer(name)
{
    delete Timers[name];
    StorageHelper_setStoredValue("HHAuto_Temp_Timers", JSON.stringify(Timers));
}

function checkTimer(name)
{
    if (!Timers[name] || Timers[name]<new Date())
    {
        return true;
    }
    return false;
}

function checkTimerMustExist(name)
{
    if (Timers[name] && Timers[name]<new Date())
    {
        return true;
    }
    return false;
}

function getTimer(name)
{
    if (!Timers[name])
    {
        return -1;
    }
    return Timers[name];
}

function getSecondsLeft(name)
{
    if (!Timers[name])
    {
        return 0;
    }
    var result = Math.ceil(Timers[name]/1000)-Math.ceil(new Date().getTime()/1000);
    if (result >0)
    {
        return result;
    }
    else
    {
        return 0;
    }
}

function getTimeLeft(name)
{
    const timerWaitingCompet = ['nextPachinkoTime','nextPachinko2Time','nextPachinkoEquipTime','nextSeasonTime','nextLeaguesTime'];
    if (!Timers[name])
    {
        if (!canCollectCompetitionActive() && timerWaitingCompet.indexOf(name) >= 0)
        {
            return "Wait for contest";
        }
        return "No timer";
    }
    var diff=getSecondsLeft(name);
    if (diff<=0)
    {
        if (!canCollectCompetitionActive() && timerWaitingCompet.indexOf(name) >= 0)
        {
            return "Wait for contest";
        }
        return "Time's up!";
    }
    return TimeHelper_toHHMMSS(diff);
}
// EXTERNAL MODULE: ./src/Helper/WindowHelper.js
var WindowHelper = __webpack_require__(620);
;// CONCATENATED MODULE: ./src/Helper/index.js

















;// CONCATENATED MODULE: ./src/Module/Shop.js






class Shop {

    static isTimeToCheckShop() {
        const updateMarket = StorageHelper_getStoredValue("HHAuto_Setting_updateMarket")  === "true";
        const needBoosterStatus = Booster.needBoosterStatusFromStore();
        return (updateMarket || needBoosterStatus) && ( StorageHelper_getStoredValue("HHAuto_Setting_paranoia") !== "true" || !checkTimer("paranoiaSwitch") )
    }

    static updateShop()
    {
        if(getPage() !== getHHScriptVars("pagesIDShop"))
        {
            LogUtils_logHHAuto("Navigating to Market window.");
            gotoPage(getHHScriptVars("pagesIDShop"));
            return true;
        }
        else {
            LogUtils_logHHAuto("Detected Market Screen. Fetching Assortment");
    
            var assA=[];
            var assB=[];
            var assG=[];
            var assP=[];
            $('#shops div.armor.merchant-inventory-item .slot').each(function(){if (this.dataset.d)assA.push(JSON.parse(this.dataset.d));});
            $('#shops div.booster.merchant-inventory-item .slot').each(function(){if (this.dataset.d)assB.push(JSON.parse(this.dataset.d));});
            $('#shops div.gift.merchant-inventory-item .slot').each(function(){if (this.dataset.d)assG.push(JSON.parse(this.dataset.d));});
            $('#shops div.potion.merchant-inventory-item .slot').each(function(){if (this.dataset.d)assP.push(JSON.parse(this.dataset.d));});
    
            var HaveAff=0;
            var HaveExp=0;
            var HaveBooster={};
            $('#shops div.gift.player-inventory-content .slot').each(function(){if (this.dataset.d) { var d=JSON.parse(this.dataset.d); HaveAff+=d.quantity*d.item.value;}});
            $('#shops div.potion.player-inventory-content .slot').each(function(){if (this.dataset.d) { var d=JSON.parse(this.dataset.d); HaveExp+=d.quantity*d.item.value;}});
    
            $('#shops div.booster.player-inventory-content .slot').each(function(){ if (this.dataset.d) { var d=JSON.parse(this.dataset.d); HaveBooster[d.item.identifier] = d.quantity;}});
    
            StorageHelper_setStoredValue("HHAuto_Temp_haveAff", HaveAff);
            StorageHelper_setStoredValue("HHAuto_Temp_haveExp", HaveExp);
            StorageHelper_setStoredValue("HHAuto_Temp_haveBooster", JSON.stringify(HaveBooster));
    
            LogUtils_logHHAuto('counted '+StorageHelper_getStoredValue("HHAuto_Temp_haveAff")+' Aff, '+StorageHelper_getStoredValue("HHAuto_Temp_haveExp")+' Exp, Booster: ' + JSON.stringify(HaveBooster));
    
            StorageHelper_setStoredValue("HHAuto_Temp_storeContents", JSON.stringify([assA,assB,assG,assP]));
            StorageHelper_setStoredValue("HHAuto_Temp_charLevel", getHHVars('Hero.infos.level'));
    
            var nshop;
            let shopFrozenTimer = $('.shop div.shop_count span[rel="expires"]').first().text();
            if (nshop === undefined && shopFrozenTimer.length > 0)
            {
                nshop = convertTimeToInt(shopFrozenTimer);
            }
            let shopTimer=60;
            if(nshop !== undefined && nshop !== 0)
            {
                // if (Number(nshop)+1 > 2*60*60)
                // {
                //     shopTimer=2*60*60;
                // }
                // else
                // {
                    shopTimer=Number(nshop)+1;
                // }
            }
            setTimer('nextShopTime',shopTimer);
            if (Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_LastPageCalled"))
                && getPage() === JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_LastPageCalled")).page)
            {
                gotoPage(getHHScriptVars("pagesIDHome"));
                LogUtils_logHHAuto("Go to Home after Shopping");
            }
        }
        return false;
    }

    static moduleShopActions()
    {
        const itemsQuery = '#player-inventory.armor .slot:not(.empty):not([menuSellLocked]):not(.mythic)';
        appendMenuSell();
    
        /**
         * @return "potion" / "gift" / player-stats / armor / booster / null
         */
        function getShopType()
        {
            const shopSelected = $('section #shops #tabs-switcher .market-menu-switch-tab.active');
            if (shopSelected.length > 0)
            {
                return shopSelected.attr("type");
            }
            else
            {
                return null;
            }
        }
    
        function menuSellListItems()
        {
            if ($('#menuSellList>.tItems').length === 0)
            {
                GM_addStyle('.tItems {border-collapse: collapse;} '
                            +'.tItems td,th {border: 1px solid #1B4F72;} '
                            +'.tItemsColGroup {border: 3px solid #1B4F72;} '
                            +'.tItemsTh1 {background-color: #2874A6;color: #fff;} '
                            +'.tItemsTh2 {background-color: #3498DB;color: #fff;} '
                            +'.tItemsTBody tr:nth-child(odd) {background-color: #85C1E9;} '
                            +'.tItemsTBody tr:nth-child(even) {background-color: #D6EAF8;} '
                            +'.tItemsTdItems[itemsLockStatus="allLocked"] {color: #FF0000} '
                            +'.tItemsTdItems[itemsLockStatus="noneLocked"] {color: #1B4F72}'
                            +'.tItemsTdItems[itemsLockStatus="someLocked"] {color: #FFA500}');
            }
    
            let itemsCaracsNb=16;
            let itemsCaracs=[];
            for (let i=1;i<itemsCaracsNb+1;i++)
            {
                itemsCaracs.push(i);
            }
            itemsCaracs.push('mythic'); // Needed for mythic equipement, can't use generic method for them
    
            let itemsRarity=["common", "rare", "epic", "legendary", "mythic"];
            let itemsLockedStatus=["not_locked","locked"];
    
            let itemsTypeNb=6;
            let itemsType=[];
            for (let i=1;i<itemsTypeNb+1;i++)
            {
                itemsType.push(i);
            }
    
            let itemsList={};
            for (let c of itemsCaracs)
            {
                let filteredCarac;
                if(c === 'mythic') {
                    filteredCarac = $('#player-inventory.armor .slot:not(.empty)[data-d*=\'"rarity":"mythic"\']');
                } else {
                    filteredCarac = $('#player-inventory.armor .slot:not(.empty)[data-d*=\'"name_add":"'+c+'"\']');
                }
    
                itemsList[c] = {};
                for (let t of itemsType)
                {
                    let filteredType = filteredCarac.filter('[data-d*=\'"subtype":"'+t+'"\']');
                    itemsList[c][t] = {};
                    for (let r of itemsRarity)
                    {
                        let filteredRarity = filteredType.filter('[data-d*=\'"rarity":"'+r+'"\']');
                        itemsList[c][t][r] = {};
                        for (let l of itemsLockedStatus)
                        {
                            let filteredStatus = filteredRarity.filter(l==="locked"?'[menuSellLocked]':':not([menuSellLocked])');
                            itemsList[c][t][r][l]=filteredStatus.length;
                        }
                    }
                }
            }
    
            let itemsListMenu = '<table class="tItems">'
            +' <colgroup class="tItemsColGroup">'
            +'  <col class="tItemsColRarity">'
            +' </colgroup>'
            +' <colgroup class="tItemsColGroup">'
            +'  <col class="tItemsColRarity" span="6">'
            +' </colgroup>'
            +' <colgroup class="tItemsColGroup">'
            +'  <col class="tItemsColRarity" span="6">'
            +' </colgroup>'
            +' <colgroup class="tItemsColGroup">'
            +'  <col class="tItemsColRarity" span="6">'
            +' </colgroup>'
            +' <colgroup class="tItemsColGroup">'
            +'  <col class="tItemsColRarity" span="6">'
            +' </colgroup>'
            +' <colgroup class="tItemsColGroup">'
            +'  <col class="tItemsColRarity" span="6">'
            +' </colgroup>'
            +' <thead class="tItemsTHead">'
            +'  <tr>'
            +'   <th class="tItemsTh1">'+getTextForUI("Rarity","elementText")+'</th>'
            +'   <th class="tItemsTh1" menuSellFilter="c:*;t:*;r:'+itemsRarity[0]+'" colspan="6">'+getTextForUI("RarityCommon","elementText")+'</th>'
            +'   <th class="tItemsTh1" menuSellFilter="c:*;t:*;r:'+itemsRarity[1]+'" colspan="6">'+getTextForUI("RarityRare","elementText")+'</th>'
            +'   <th class="tItemsTh1" menuSellFilter="c:*;t:*;r:'+itemsRarity[2]+'" colspan="6">'+getTextForUI("RarityEpic","elementText")+'</th>'
            +'   <th class="tItemsTh1" menuSellFilter="c:*;t:*;r:'+itemsRarity[3]+'" colspan="6">'+getTextForUI("RarityLegendary","elementText")+'</th>'
            +'   <th class="tItemsTh1" menuSellFilter="c:*;t:*;r:'+itemsRarity[4]+'" colspan="6">'+getTextForUI("RarityMythic","elementText")+'</th>'
            +'  </tr>'
            +'  <tr>'
            +'   <th class="tItemsTh2">'+getTextForUI("equipementCaracs","elementText")+'/'+getTextForUI("equipementType","elementText")+'</th>';
    
            for (let r of itemsRarity)
            {
                itemsListMenu+='   <th class="tItemsTh2" menuSellFilter="c:*;t:'+itemsType[0]+';r:'+r+'">'+getTextForUI("equipementHead","elementText")+'</th>'
                    +'   <th class="tItemsTh2" menuSellFilter="c:*;t:'+itemsType[1]+';r:'+r+'">'+getTextForUI("equipementBody","elementText")+'</th>'
                    +'   <th class="tItemsTh2" menuSellFilter="c:*;t:'+itemsType[2]+';r:'+r+'">'+getTextForUI("equipementLegs","elementText")+'</th>'
                    +'   <th class="tItemsTh2" menuSellFilter="c:*;t:'+itemsType[3]+';r:'+r+'">'+getTextForUI("equipementFlag","elementText")+'</th>'
                    +'   <th class="tItemsTh2" menuSellFilter="c:*;t:'+itemsType[4]+';r:'+r+'">'+getTextForUI("equipementPet","elementText")+'</th>'
                    +'   <th class="tItemsTh2" menuSellFilter="c:*;t:'+itemsType[5]+';r:'+r+'">'+getTextForUI("equipementWeapon","elementText")+'</th>';
            }
    
            itemsListMenu+='  </tr>'
                +' </thead>'
                +' <tbody class="tItemsTBody">';
    
            for (let c of itemsCaracs)
            {
                if(c === 'mythic') {
                    itemsListMenu +='  <tr>'
                        +'   <td class="type" menuSellFilter="c:'+c+';t:*;r:*">'+getTextForUI("RarityMythic","elementText")+'</td>';
                } else {
                    let ext= (c === 16)?"svg":"png";
                    itemsListMenu +='  <tr>'
                        +'   <td class="type" menuSellFilter="c:'+c+';t:*;r:*"><img style="height:20px;width:20px" src="'+getHHScriptVars("baseImgPath")+'/pictures/misc/items_icons/'+c+'.'+ext+'"></td>';
                }
    
                for (let r of itemsRarity)
                {
                    for (let t of itemsType)
                    {
                        let allItems = itemsList[c][t][r];
                        let total = allItems[itemsLockedStatus[0]]+allItems[itemsLockedStatus[1]];
                        let displayNb = allItems[itemsLockedStatus[0]]+'/'+total;
                        let itemsLockStatus;
                        if (total === 0)
                        {
                            displayNb = "";
                        }
                        if (allItems[itemsLockedStatus[1]] === 0)
                        {
                            //no lock
                            itemsLockStatus="noneLocked";
                        }
                        else if (allItems[itemsLockedStatus[1]] === total)
                        {
                            //all locked
                            itemsLockStatus="allLocked";
                        }
                        else
                        {
                            //some locked
                            itemsLockStatus="someLocked";
                        }
    
                        itemsListMenu +='   <td class="tItemsTdItems" itemsLockStatus="'+itemsLockStatus+'" menuSellFilter="c:'+c+';t:'+t+';r:'+r+'"'+'>'+displayNb+'</td>';
                    }
                }
    
                itemsListMenu +='  </tr>';
            }
    
    
    
            itemsListMenu +=' </tbody>'
                +'</table>';
            document.getElementById("menuSellList").innerHTML = itemsListMenu;
    
            function setSlotFilter(inCaracsValue,inTypeValue,inRarityValue,inLockedValue)
            {
                let filter='#player-inventory.armor .slot:not(.empty)';
                if (inCaracsValue !== "*" )
                {
                    filter+='[data-d*=\'"name_add":"'+inCaracsValue+'"\']';
                }
                if (inTypeValue !== "*" )
                {
                    filter+='[data-d*=\'"subtype":"'+inTypeValue+'"\']';
                }
                if (inRarityValue !== "*" )
                {
                    filter+='[data-d*=\'"rarity":"'+inRarityValue+'"\']';
                }
                if (inLockedValue === "locked" || inLockedValue === true)
                {
                    filter+='[menuSellLocked]';
                }
                else
                {
                    filter+=':not([menuSellLocked])';
                }
                return filter;
            }
    
            function setCellsFilter(inCaracsValue,inTypeValue,inRarityValue)
            {
                let filter='table.tItems [menuSellFilter*="';
                if (inCaracsValue !== "*" )
                {
                    filter+='c:'+inCaracsValue+';';
                }
                if (inTypeValue !== "*" )
                {
                    filter+='t:'+inTypeValue+';';
                }
                if (inRarityValue !== "*" )
                {
                    filter+='r:'+inRarityValue;
                }
                filter+='"]';
                return filter;
            }
    
            $('table.tItems [menuSellFilter] ').each(function(){
                this.addEventListener("click", function(){
                    let toLock = !(this.getAttribute("itemsLockStatus") === "allLocked");
                    let c=this.getAttribute("menuSellFilter").split(";")[0].split(":")[1];
                    let t=this.getAttribute("menuSellFilter").split(";")[1].split(":")[1];
                    let r=this.getAttribute("menuSellFilter").split(";")[2].split(":")[1];
                    AllLockUnlock(setSlotFilter(c,t,r,!toLock),toLock);
                    let newLockStatus = toLock?"allLocked":"noneLocked";
                    $(setCellsFilter(c,t,r)).each(function(){
                        this.setAttribute("itemsLockStatus",newLockStatus);
                    });
                });
            });
        }
    
        function AllLockUnlock(inFilter,lock)
        {
            if (lock)
            {
                $(inFilter).each(function(){
                    this.setAttribute("menuSellLocked", "");
                    $(this).prepend('<img class="menuSellLocked" style="position:absolute;width:32px;height:32px" src="https://i.postimg.cc/PxgxrBVB/Opponent-red.png">');
                });
            }
            else
            {
                $(inFilter).each(function(){
                    this.removeAttribute("menuSellLocked");
                    this.querySelector("img.menuSellLocked").remove();
                });
            }
        }
    
        function lockUnlock(inFilter)
        {
            if ($(inFilter).length >0)
            {
                let currentLock = $(inFilter)[0].getAttribute("menuSellLocked");
                if (currentLock === null )
                {
                    $(inFilter)[0].setAttribute("menuSellLocked", "");
                    $(inFilter).prepend('<img class="menuSellLocked" style="position:absolute;width:32px;height:32px" src="https://i.postimg.cc/PxgxrBVB/Opponent-red.png">');
                }
                else
                {
                    $(inFilter)[0].removeAttribute("menuSellLocked");
                    $(inFilter+" img.menuSellLocked")[0].remove();
                }
            }
        }
    
        let menuSellStop = false;
        var allLoaded = false;
        var menuSellMaxItems = "all";
        let fetchStarted = false;
        //ugly hack
        let loadingAnimationStart = unsafeWindow.loadingAnimation.start;
        let loadingAnimationStop = unsafeWindow.loadingAnimation.stop;
        function appendMenuSell()
        {
            let menuID = "SellDialog"
            if (getShopType() !== "armor")
            {
                if (document.getElementById(menuID) !== null)
                {
                    try
                    {
                        $(document).off('ajaxComplete',checkAjaxComplete);
                        for (let menu of ["menuSell", "menuSellLock", "menuSellMaskLocked"])
                        {
                            const GMMenuID = GM_registerMenuCommand(getTextForUI(menu,"elementText"), function(){});
                            document.getElementById(menu).remove();
                            GM_unregisterMenuCommand(GMMenuID);
                        }
                        document.getElementById(menuID).remove();
                    }
                    catch(e)
                    {
                        LogUtils_logHHAuto("Catched error : Couldn't remove "+menuID+" menu : "+e);
                    }
                }
                return;
            }
            else if (document.getElementById(menuID) !== null)
            {
                document.getElementById("menuSellCurrentCount").innerHTML = $(itemsQuery).length;
                return;
            }
    
            GM_addStyle(
                '#SellDialog .close {   position: absolute;   top: 0;   right: 30px;   transition: all 200ms;   font-size: 50px;   font-weight: bold;   text-decoration: none;   color: #333; } '
            + '#SellDialog .close:hover {   color: #06D85F; }'
            + '#SellDialog p { font-size: 15px; }'
            + '#SellDialog p.intro { margin: 0; }'
            + '#SellDialog .myButton { font-size: 12px; min-width: 100px; text-align: center; }'
            + '#SellDialog td.type { text-align: center; }'
            );
    
            var menuSellLock = '<div style="position: absolute;right: 220px;top: 70px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuSellLock","tooltip")+'</span><label style="width:70px" class="myButton" id="menuSellLock">'+getTextForUI("menuSellLock","elementText")+'</label></div>'
            var menuSellMaskLocked = '<div style="position: absolute;right: 140px;top: 70px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuSellMaskLocked","tooltip")+'</span><label style="width:70px" class="myButton" id="menuSellMaskLocked">'+getTextForUI("menuSellMaskLocked","elementText")+'</label></div>'
            var menuSell = '<div style="position: absolute;right: 300px;top: 70px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuSell","tooltip")+'</span><label style="width:70px" class="myButton" id="menuSell">'+getTextForUI("menuSell","elementText")+'</label></div>'
            + '<dialog style="overflow-y:auto;max-width:95%;max-height:95%;"id="SellDialog"><a class="close" id="SellDialogClose">&times;</a><form stylemethod="dialog">'
            +  '<div style="padding:0 10px; display:flex;flex-direction:column;">'
            +   '<p class="intro">'+getTextForUI("menuSellText","elementText")+'</p>'
            +   '<div class="HHMenuRow">'
            +    '<p>'+getTextForUI("menuSellCurrentCount","elementText")+'</p>'
            +    '<p id="menuSellCurrentCount">0</p>'
            +   '</div>'
            + '<div id="menuSellStop"><label style="width:80px" class="myButton" id="menuSellStop">'+getTextForUI("OptionStop","elementText")+'</label></div>'
            +   '<div id="menuSellHide" style="display:none">'
            +    '<p id="menuSellList" style="margin:0;"></p>'
            +    '<div class="HHMenuRow">'
            +     '<div style="padding:10px;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuSellButton","tooltip")+'</span><label class="myButton" id="menuSellButton">'+getTextForUI("menuSellButton","elementText")+'</label></div>'
            +     '<div style="padding:10px;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuSellNumber","tooltip")+'</span><input id="menuSellNumber" style="width:80%;height:20px" required pattern="'+HHAuto_inputPattern.menuSellNumber+'" type="text" value="0"></div>'
            +    '</div>'
            +   '</div>'
            +   '<div id="menuSoldHide" style="display:none">'
            +    '<div class="HHMenuRow">'
            +     '<p>'+getTextForUI("menuSoldText","elementText")+'</p>'
            +     '<p id="menuSoldCurrentCount">0</p>'
            +    '</div>'
            +    '<p id="menuSoldMessage">0</p>'
            +   '</div>'
            +  '</div>'
            + '<menu> <label style="margin-left:800px" class="myButton" id="menuSellCancel">'+getTextForUI("OptionCancel","elementText")+'</label></menu></form></dialog>'
    
            initMenuSell();
            initMenuSellLock();
            initMenuSellMaskLocked();
            GM_registerMenuCommand(getTextForUI("menuSell","elementText"), displayMenuSell);
            GM_registerMenuCommand(getTextForUI("menuSellLock","elementText"), launchMenuSellLock);
            GM_registerMenuCommand(getTextForUI("menuSellMaskLocked","elementText"), launchMenuSellMaskLocked);
            $(document).on('ajaxComplete',checkAjaxComplete);
    
            function initMenuSell()
            {
                $('#player-inventory.armor').append(menuSell);
    
                const closeSellDialog = function(){
                    var SellDialog = document.getElementById("SellDialog");
                    if (typeof SellDialog.showModal !== "function")
                    {
                        alert("The <dialog> API is not supported by this browser");
                        return;
                    }
                    $('#player-inventory.armor .slot:not(.empty)[canBeSold]').removeAttr('canBeSold');
                    SellDialog.close();
                }
    
                document.getElementById("menuSell").addEventListener("click", displayMenuSell);
                document.getElementById("menuSellCancel").addEventListener("click", closeSellDialog);
                document.getElementById("SellDialogClose").addEventListener("click", closeSellDialog);
                document.getElementById("menuSellStop").addEventListener("click", function(){
                    this.style.display = "none";
                    menuSellStop = true;
                });
    
                document.getElementById("menuSellButton").addEventListener("click", function(){
                    if (Number(document.getElementById("menuSellNumber").value) > 0)
                    {
                        LogUtils_logHHAuto("Starting selling "+Number(document.getElementById("menuSellNumber").value)+" items.");
                        sellArmorItems();
                    }
                });
            }
            function displayMenuSell()
            {
                var SellDialog = document.getElementById("SellDialog");
                if (typeof SellDialog.showModal !== "function")
                {
                    alert("The <dialog> API is not supported by this browser");
                    return;
                }
                menuSellMaxItems = Number(window.prompt("Max amount of inventory to load (all for no limit)",menuSellMaxItems));
                if (menuSellMaxItems !== null)
                {
                    menuSellMaxItems = isNaN(menuSellMaxItems)?Number.MAX_VALUE:menuSellMaxItems;
                    document.getElementById("menuSellStop").style.display = "block";
                    menuSellStop = false;
                    fetchStarted = true;
                    unsafeWindow.loadingAnimation.start = function(){};
                    unsafeWindow.loadingAnimation.stop = function(){};
                    if ($('#menuSellList>.tItems').length === 0)
                    {
                        menuSellListItems();
                    }
                    document.getElementById("menuSellHide").style.display = "block";
                    SellDialog.showModal();
                    document.getElementById("menuSellHide").style.display = "none";
                    fetchAllArmorItems();
                }
            }
    
            function initMenuSellMaskLocked()
            {
                $('#player-inventory.armor').append(menuSellMaskLocked);
                document.getElementById("menuSellMaskLocked").addEventListener("click", launchMenuSellMaskLocked);
            }
            function launchMenuSellMaskLocked()
            {
                $("#player-inventory.armor .slot[menuSellLocked]").each(function(){
                    $(this).parent().toggle();
                });
            }
    
            function initMenuSellLock()
            {
                $('#player-inventory.armor').append(menuSellLock);
                document.getElementById("menuSellLock").addEventListener("click", launchMenuSellLock);
            }
            function launchMenuSellLock()
            {
                let filterText = "#player-inventory.armor .slot.selected";
                if ($(filterText).length >0)
                {
                    let toLock=$(filterText)[0].getAttribute("menuSellLocked") === null;
                    AllLockUnlock(filterText,toLock);
                }
            }
        }
    
        function checkAjaxComplete(event,request,settings){
            let match = settings.data.match(/action=market_get_armor&id_member_armor=(\d+)/);
            if (match === null) return;
            allLoaded = request.responseJSON.items.length === 0 && request.responseJSON.success; // No more to load
            if (fetchStarted)
            {
                setTimeout(fetchAllArmorItems, randomInterval(800,1600));
            }
        }
    
        function fetchAllArmorItems()
        {
            let oldCount = $('#player-inventory.armor .slot:not(.empty)').length;
            document.getElementById("menuSellCurrentCount").innerHTML = $(itemsQuery).length;
            let scroll = $("#player-inventory.armor")[0];
            if (menuSellStop || allLoaded || oldCount >= menuSellMaxItems || !document.getElementById("SellDialog").open)
            {
                document.getElementById("menuSellStop").style.display = "none";
                unsafeWindow.loadingAnimation.start = loadingAnimationStart;
                unsafeWindow.loadingAnimation.stop = loadingAnimationStop;
                fetchStarted = false;
                scroll.scrollTop = 0;
                if (document.getElementById("SellDialog").open)
                {
                    document.getElementById("menuSellHide").style.display = "block";
                    menuSellListItems();
                }
                else
                {
                    LogUtils_logHHAuto('Sell Dialog closed, stopping');
                }
                return;
            }
            scroll.scrollTop = scroll.scrollHeight-scroll.offsetHeight;
        }
    
        function sellArmorItems()
        {
            LogUtils_logHHAuto('start selling common, rare and epic stuff');
            document.getElementById("menuSellHide").style.display = "none";
            document.getElementById("menuSoldHide").style.display = "block";
            // return;
            var initialNumberOfItems = $(itemsQuery).length;
            var itemsToSell = Number(document.getElementById("menuSellNumber").value);
            document.getElementById("menuSoldCurrentCount").innerHTML = "0/"+itemsToSell;
            document.getElementById("menuSoldMessage").innerHTML ="";
            let PlayerClass = getHHVars('Hero.infos.class') === null ? $('#equiped > div.icon.class_change_btn').attr('carac') : getHHVars('Hero.infos.class');
            function selling_func()
            {
                if ($('#player-inventory.armor').length === 0)
                {
                    LogUtils_logHHAuto('Wrong tab');
                    return;
                }
                else if (!document.getElementById("SellDialog").open)
                {
                    LogUtils_logHHAuto('Sell Dialog closed, stopping');
                    return;
                }
                let availebleItems = $(itemsQuery);
                let currentNumberOfItems = availebleItems.length;
                if (currentNumberOfItems === 0)
                {
                    LogUtils_logHHAuto('no more items for sale');
                    document.getElementById("menuSoldMessage").innerHTML = getTextForUI("menuSoldMessageNoMore","elementText");
                    menuSellListItems();
                    document.getElementById("menuSellHide").style.display = "block";
                    return;
                }
                //console.log(initialNumberOfItems,currentNumberOfItems);
                if ((initialNumberOfItems - currentNumberOfItems) >= itemsToSell) {
                    LogUtils_logHHAuto('Reach wanted sold items.');
                    document.getElementById("menuSoldMessage").innerHTML = getTextForUI("menuSoldMessageReachNB","elementText");
                    menuSellListItems();
                    document.getElementById("menuSellHide").style.display = "block";
                    return;
                }
                //check Selected item - can we sell it?
                if (availebleItems.filter('.selected').length > 0)
                {
                    let can_sell = false;
                    //Non legendary or with specific attribute
                    if (availebleItems.filter('.selected').filter(':not(.legendary),[canBeSold]').length > 0)
                    {
                        can_sell = true;
                    }
                    LogUtils_logHHAuto('can be sold ' + can_sell+ ' : '+ availebleItems.filter('.selected')[0].getAttribute('data-d'));
                    if (can_sell)
                    {
                        $('#shops .menu-switch-tab-content.active button.green_text_button[rel=sell]').click();
                        let currSellNumber = Number((initialNumberOfItems - currentNumberOfItems) +1);
                        document.getElementById("menuSoldCurrentCount").innerHTML = currSellNumber+"/"+itemsToSell;
                        document.getElementById("menuSellCurrentCount").innerHTML = $(itemsQuery).length;
                        setTimeout(selling_func, 300);
                        return;
                    }
                }
                //Find new sellable items
                if (availebleItems.filter(':not(.selected):not(.legendary),[canBeSold]').length > 0)
                {
                    //Select first non legendary item
                    //Or select item that checked before and can be sold
                    availebleItems.filter(':not(.selected):not(.legendary):not(.mythic),[canBeSold]')[0].click();
                    setTimeout(selling_func, 300);
                    return;
                }
                else if (availebleItems.filter(':not(.selected)').length > 0)
                {
                    let typesOfSets = ['EQ-LE-06','EQ-LE-05','EQ-LE-04','EQ-LE-0' + PlayerClass];
                    let caracsOfSets = ['carac' + PlayerClass,'chance','endurance','carac' + PlayerClass];
                    //[MaxCarac,Index]
                    let arraysOfSets = [
                        [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]],//'EQ-LE-06'
                        [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]],//'EQ-LE-05'
                        [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]],//'EQ-LE-04'
                        [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]]//'EQ-LE-0'+ PlayerClass
                    ];
                    /*//Take equipped items into account
                    for (let indexType = 0; indexType < typesOfSets.length; indexType++)
                    {
                        let equipedArray = $('#equiped .armor .slot[data-d*=' + typesOfSets[indexType] + ']');
                        for (let i5 = 0; i5 < equipedArray.length; i5++) {
                            let equipedObj = JSON.parse($(equipedArray[i5]).attr('data-d'));
                            arraysOfSets[indexType][equipedObj.subtype][0] = equipedObj[caracsOfSets[indexType]];
                        }
                    }*/
    
                    for (let i4 = 0; i4 < availebleItems.length; i4++)
                    {
                        let sellableItemObj = JSON.parse($(availebleItems[i4]).attr('data-d'));
                        let indexType = typesOfSets.indexOf(sellableItemObj.id_equip);
    
                        if (indexType == -1)
                        {
                            //console.log('can_sell2');
                            availebleItems[i4].setAttribute('canBeSold', '');
                        }
                        else
                        {
                            let currentBest = arraysOfSets[indexType][sellableItemObj.subtype];
                            let itemCarac = sellableItemObj[caracsOfSets[indexType]];
                            //checking best gear in inventory based on best class stat
                            if (currentBest[0] < itemCarac)
                            {
                                currentBest[0] = itemCarac;
                                if (currentBest[1] >= 0)
                                {
                                    availebleItems[currentBest[1]].setAttribute('canBeSold', '');
                                }
                                currentBest[1] = i4;
                            }
                            else
                            {
                                availebleItems[i4].setAttribute('canBeSold', '');
                            }
                        }
                    }
                    if ($('#player-inventory.armor [canBeSold]:not([menuSellLocked]):not(.mythic)').length == 0)
                    {
                        LogUtils_logHHAuto('no more items for sale');
                        document.getElementById("menuSoldMessage").innerHTML = getTextForUI("menuSoldMessageNoMore","elementText");
                        menuSellListItems();
                        document.getElementById("menuSellHide").style.display = "block";
                        return;
                    }
                }
    
                setTimeout(selling_func, 300);
            }
            selling_func();
        }
    }
    
}
;// CONCATENATED MODULE: ./src/Service/InfoService.js



function createPInfo() {
    var div = document.createElement('div');
    div.innerHTML = '<div id="pInfo" ></div>'.trim(); //height: auto;

    var pInfo = div.firstElementChild;

    pInfo.addEventListener("dblclick", function() {
        let masterSwitch = document.getElementById("master");
        if (masterSwitch.checked === true) {
            StorageHelper_setStoredValue("HHAuto_Setting_master", "false");
            masterSwitch.checked = false;
            //console.log("Master switch off");
        } else {
            StorageHelper_setStoredValue("HHAuto_Setting_master", "true");
            masterSwitch.checked = true;
            //console.log("Master switch on");
        }
    });
    
    if(getPage()==getHHScriptVars("pagesIDHome"))
    {
        GM_addStyle('#pInfo:hover {max-height : none} #pInfo { max-height : 220px} @media only screen and (max-width: 1025px) {#pInfo { ;top:17% }}');

        if (StorageHelper_getStoredValue("HHAuto_Setting_showAdsBack") === "true")
        {
            GM_addStyle('#sliding-popups#sliding-popups { z-index : 1}');
        }
    }
    else
    {
        GM_addStyle(''
                    +'#pInfo:hover {'
                    +'   padding-top : 22px;'
                    +'   height : auto;'
                    +'   left : 57%;'
                    +'}'
                    +'#pInfo {'
                    +'   right : 1%;'
                    +'   left : 88%;'
                    +'   top : 8%;'
                    +'   z-index : 1000;'
                    +'   height : 22px;'
                    +'   padding-top : unset;'
                    +'}'
                    +'@media only screen and (max-width: 1025px) {'
                    +'   #pInfo {'
                    +'      top : 13%;'
                    +'   }'
                    +'}');
    }
    return div;
}

function updateData() {
    //logHHAuto("updating UI");
    document.querySelectorAll("div#sMenu input[pattern]").forEach(currentInput =>
                                                                  {
        currentInput.checkValidity();
    });
    if (StorageHelper_getStoredValue("HHAuto_Setting_showInfo") =="true") // && busy==false // && getPage()==getHHScriptVars("pagesIDHome")
    {
        let contest = '';
        if (!canCollectCompetitionActive()) contest = " : Wait for contest";
        var Tegzd='';
        Tegzd+=(StorageHelper_getStoredValue("HHAuto_Setting_master") ==="true"?"<span style='color:LimeGreen'>HH auto ++ ON":"<span style='color:red'>HH auto ++ OFF")+'</span>';
        //Tegzd+=(getStoredValue("HHAuto_Setting_master") ==="true"?"<span style='color:LimeGreen'>"+getTextForUI("master","elementText")+" : ON":"<span style='color:red'>"+getTextForUI("master","elementText")+" : OFF")+'</span>';
        //Tegzd+=getTextForUI("master","elementText")+' : '+(getStoredValue("HHAuto_Setting_master") ==="true"?"<span style='color:LimeGreen'>ON":"<span style='color:red'>OFF")+'</span>';
        Tegzd += '<ul>';
        if (StorageHelper_getStoredValue("HHAuto_Setting_paranoia") =="true")
        {
            Tegzd += '<li>'+StorageHelper_getStoredValue("HHAuto_Temp_pinfo")+': '+getTimeLeft('paranoiaSwitch')+'</li>';
        }
        if (getHHScriptVars('isEnabledTrollBattle',false) && StorageHelper_getStoredValue("HHAuto_Setting_autoTrollBattle") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoTrollTitle","elementText")+' : '+Troll.getEnergy()+'/'+Troll.getEnergyMax()+contest+'</li>';
        }
        if (getHHScriptVars("isEnabledSalary",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoSalary") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoSalary","elementText")+' : '+getTimeLeft('nextSalaryTime')+'</li>';
        }
        if (getHHScriptVars('isEnabledSeason',false) && StorageHelper_getStoredValue("HHAuto_Setting_autoSeason") =="true")
        {
            Tegzd += '<li>';
            const boostLimited = StorageHelper_getStoredValue("HHAuto_Setting_autoSeasonBoostedOnly") === "true" && !Booster.haveBoosterEquiped();
            if(boostLimited) {
                Tegzd += '<li style="color:red!important;" title="'+getTextForUI("boostMissing","elementText")+'">';
            }else {
                Tegzd += '<li>';
            }
            Tegzd += getTextForUI("autoSeasonTitle","elementText")+' '+Season.getEnergy()+'/'+Season.getEnergyMax()+' : '+getTimeLeft('nextSeasonTime');
            if(boostLimited) {
                Tegzd += ' ' + getTextForUI("boostMissing","elementText") + '</li>';
            }else {
                Tegzd += '</li>';
            }
        }
        /*if (getHHScriptVars('isEnabledSeason',false) && getStoredValue("HHAuto_Setting_autoSeasonCollect") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoSeasonCollect","elementText")+" "+getTextForUI("autoSeasonTitle","elementText")+' : '+getTimeLeft('nextSeasonCollectTime')+'</li>';
        }
        if (getHHScriptVars('isEnabledPoV',false) && getStoredValue("HHAuto_Setting_autoPoVCollect") =="true")
        {
            Tegzd += '<li>Collect POV : '+getTimeLeft('nextPoVCollectTime')+'</li>';
        }
        if (getHHScriptVars('isEnabledPoG',false) && getStoredValue("HHAuto_Setting_autoPoGCollect") =="true")
        {
            Tegzd += '<li>Collect POG : '+getTimeLeft('nextPoGCollectTime')+'</li>';
        }*/
        if (getHHScriptVars('isEnabledLeagues',false) && StorageHelper_getStoredValue("HHAuto_Setting_autoLeagues") =="true")
        {
            Tegzd += '<li>';
            const boostLimited = StorageHelper_getStoredValue("HHAuto_Setting_autoLeaguesBoostedOnly") === "true" && !Booster.haveBoosterEquiped();
            if(boostLimited) {
                Tegzd += '<li style="color:red!important;" title="'+getTextForUI("boostMissing","elementText")+'">';
            }else {
                Tegzd += '<li>';
            }
            Tegzd += getTextForUI("autoLeaguesTitle","elementText")+' '+LeagueHelper.getEnergy()+'/'+LeagueHelper.getEnergyMax()+' : '+getTimeLeft('nextLeaguesTime');
            if(boostLimited) {
                Tegzd += ' ' + getTextForUI("boostMissing","elementText") + '</li>';
            }else {
                Tegzd += '</li>';
            }
        }
        if (getHHScriptVars("isEnabledChamps",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoChamps") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoChampsTitle","elementText")+' : '+getTimeLeft('nextChampionTime')+'</li>';
        }
        if (getHHScriptVars("isEnabledClubChamp",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoClubChamp") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoClubChamp","elementText")+' : '+getTimeLeft('nextClubChampionTime')+'</li>';
        }
        if (getHHScriptVars('isEnabledPantheon',false) && StorageHelper_getStoredValue("HHAuto_Setting_autoPantheon") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoPantheonTitle","elementText")+' : '+Pantheon.getEnergy()+'/'+Pantheon.getEnergyMax()+' ('+getTimeLeft('nextPantheonTime')+')'+'</li>';
        }
        if (getHHScriptVars("isEnabledShop",false) && StorageHelper_getStoredValue("HHAuto_Setting_updateMarket") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoBuy","elementText")+' : '+getTimeLeft('nextShopTime')+'</li>';
        }
        if (getHHScriptVars("isEnabledMission",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoMission") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoMission","elementText")+' : '+getTimeLeft('nextMissionTime')+'</li>';
        }
        if (getHHScriptVars("isEnabledContest",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoContest") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoContest","elementText")+' : '+getTimeLeft('nextContestTime')+'</li>';
        }
        if (getHHScriptVars("isEnabledPowerPlaces",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoPowerPlaces") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoPowerPlaces","elementText")+' : '+getTimeLeft('minPowerPlacesTime')+'</li>';
        }
        if ( getHHScriptVars("isEnabledPachinko",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoFreePachinko") =="true")
        {
            if (getTimer('nextPachinkoTime') !== -1)
            {
                Tegzd += '<li>'+getTextForUI("autoFreePachinko","elementText")+' : '+getTimeLeft('nextPachinkoTime')+'</li>';
            }
            if (getTimer('nextPachinko2Time') !== -1)
            {
                Tegzd += '<li>'+getTextForUI("autoMythicPachinko","elementText")+' : '+getTimeLeft('nextPachinko2Time')+'</li>';
            }
            if (getTimer('nextPachinkoEquipTime') !== -1)
            {
                Tegzd += '<li>'+getTextForUI("autoEquipmentPachinko","elementText")+' : '+getTimeLeft('nextPachinkoEquipTime')+'</li>';
            }
        }
        if (getTimer('eventMythicNextWave') !== -1)
        {
            Tegzd += '<li>'+getTextForUI("mythicGirlNext","elementText")+' : '+getTimeLeft('eventMythicNextWave')+'</li>';
        }
        if (getTimer('eventSultryMysteryShopRefresh') !== -1)
        {
            Tegzd += '<li>'+getTextForUI("sultryMysteriesEventRefreshShopNext","elementText")+' : '+getTimeLeft('eventSultryMysteryShopRefresh')+'</li>';
        }
        if (StorageHelper_getStoredValue("HHAuto_Temp_haveAff"))
        {
            Tegzd += '<li>'+getTextForUI("autoAffW","elementText")+' : '+add1000sSeparator(StorageHelper_getStoredValue("HHAuto_Temp_haveAff"))+'</li>';
        }
        if (StorageHelper_getStoredValue("HHAuto_Temp_haveExp"))
        {
            Tegzd += '<li>'+getTextForUI("autoExpW","elementText")+' : '+add1000sSeparator(StorageHelper_getStoredValue("HHAuto_Temp_haveExp"))+'</li>';
        }
        Tegzd += '</ul>';

        document.getElementById('pInfo').style.display='block';
        if (StorageHelper_getStoredValue("HHAuto_Setting_showInfoLeft") === 'true' && getPage() === getHHScriptVars("pagesIDHome")) {
            document.getElementById('pInfo').className='left';
        }
        document.getElementById('pInfo').innerHTML = Tegzd;
    }
    else
    {
        document.getElementById('pInfo').style.display='none';
    }
}
;// CONCATENATED MODULE: ./src/Service/MouseService.js


let mouseBusy = false;
let mouseBusyTimeout = 0;
function makeMouseBusy(ms) {
    clearTimeout(mouseBusyTimeout);
    //logHHAuto('mouseBusy' + mouseBusy + ' ' + ms);
    mouseBusy = true;
    mouseBusyTimeout = setTimeout(function(){mouseBusy = false;}, ms);
};

function bindMouseEvents(){
    const mouseTimeoutVal = Number.isInteger(Number(StorageHelper_getStoredValue("HHAuto_Setting_mousePauseTimeout"))) ? Number(StorageHelper_getStoredValue("HHAuto_Setting_mousePauseTimeout")) : 5000;
        document.onmousemove = function() { makeMouseBusy(mouseTimeoutVal); };
        document.onscroll = function() { makeMouseBusy(mouseTimeoutVal); };
        document.onmouseup = function() { makeMouseBusy(mouseTimeoutVal); };
}
;// CONCATENATED MODULE: ./src/Service/PageNavigationService.js




// Returns true if on correct page.
function gotoPage(page,inArgs,delay = -1)
{
    var cp=getPage();
    LogUtils_logHHAuto('going '+cp+'->'+page);

    if (typeof delay != 'number' || delay === -1)
    {
        delay = randomInterval(300,500);
    }

    var togoto = undefined;

    // get page path
    switch(page)
    {
        case getHHScriptVars("pagesIDHome"):
            togoto = getHHScriptVars("pagesURLHome");
            break;
        case getHHScriptVars("pagesIDActivities"):
            togoto = getHHScriptVars("pagesURLActivities");
            break;
        case getHHScriptVars("pagesIDMissions"):
            togoto = getHHScriptVars("pagesURLActivities");
            togoto = url_add_param(togoto, "tab",getHHScriptVars("pagesIDMissions"));
            break;
        case getHHScriptVars("pagesIDPowerplacemain"):
            togoto = getHHScriptVars("pagesURLActivities");
            togoto = url_add_param(togoto, "tab","pop");
            break;
        case getHHScriptVars("pagesIDContests"):
            togoto = getHHScriptVars("pagesURLActivities");
            togoto = url_add_param(togoto, "tab",getHHScriptVars("pagesIDContests"));
            break;
        case getHHScriptVars("pagesIDDailyGoals"):
            togoto = getHHScriptVars("pagesURLActivities");
            togoto = url_add_param(togoto, "tab",getHHScriptVars("pagesIDDailyGoals"));
            break;
        case getHHScriptVars("pagesIDHarem"):
            togoto = getHHScriptVars("pagesURLHarem");
            break;
        case getHHScriptVars("pagesIDMap"):
            togoto = getHHScriptVars("pagesURLMap");
            break;
        case getHHScriptVars("pagesIDPachinko"):
            togoto = getHHScriptVars("pagesURLPachinko");
            break;
        case getHHScriptVars("pagesIDLeaderboard"):
            togoto = getHHScriptVars("pagesURLLeaderboard");
            break;
        case getHHScriptVars("pagesIDShop"):
            togoto = getHHScriptVars("pagesURLShop");
            break;
        case getHHScriptVars("pagesIDQuest"):
            togoto = QuestHelper.getNextQuestLink();
            if(togoto === false) {
                LogUtils_logHHAuto("All quests finished, setting timer to check back later!");
                setTimer('nextMainQuestAttempt', 604800); // 1 week delay
                gotoPage(getHHScriptVars("pagesIDHome"));
                return false;
            }
            LogUtils_logHHAuto("Current quest page: "+togoto);
            break;
        case getHHScriptVars("pagesIDPantheon"):
            togoto = getHHScriptVars("pagesURLPantheon");
            break;
        case getHHScriptVars("pagesIDPantheonPreBattle"):
            togoto = getHHScriptVars("pagesURLPantheonPreBattle");
            break;
        case getHHScriptVars("pagesIDChampionsMap"):
            togoto = getHHScriptVars("pagesURLChampionsMap");
            break;
        case getHHScriptVars("pagesIDSeason") :
            togoto = getHHScriptVars("pagesURLSeason");
            break;
        case getHHScriptVars("pagesIDSeasonArena") :
            togoto = getHHScriptVars("pagesURLSeasonArena");
            break;
        case getHHScriptVars("pagesIDClubChampion") :
            togoto = getHHScriptVars("pagesURLClubChampion");
            break;
        case getHHScriptVars("pagesIDLeagueBattle") :
            togoto = getHHScriptVars("pagesURLLeagueBattle");
            break;
        case getHHScriptVars("pagesIDTrollPreBattle") :
            togoto = getHHScriptVars("pagesURLTrollPreBattle");
            break;
        case getHHScriptVars("pagesIDEvent") :
            togoto = getHHScriptVars("pagesURLEvent");
            break;
        case getHHScriptVars("pagesIDClub") :
            togoto = getHHScriptVars("pagesURLClub");
            break;
        case getHHScriptVars("pagesIDPoV") :
            togoto = getHHScriptVars("pagesURLPoV");
            break;
        case getHHScriptVars("pagesIDPoG") :
            togoto = getHHScriptVars("pagesURLPoG");
            break;
        case getHHScriptVars("pagesIDSeasonalEvent") :
            togoto = getHHScriptVars("pagesURLSeasonalEvent");
            break;
        case (page.match(/^\/champions\/[123456]$/) || {}).input:
            togoto = page;
            break;
        case (page.match(/^\/harem\/\d+$/) || {}).input:
            togoto = page;
            break;
        case (page.match(/^\/girl\/\d+$/) || {}).input:
            togoto = page;
            break;
        case (page.match(/^\/quest\/\d+$/) || {}).input:
            togoto = page;
            break;
        case (page.match(/^\/boss-bang-battle.html\?number_of_battles=\d&bb_team_index=[01234]$/) || {}).input:
            togoto = page;
            break;
        default:
            LogUtils_logHHAuto("Unknown goto page request. No page \'"+page+"\' defined.");
    }
    if(togoto != undefined)
    {
        setLastPageCalled(togoto);
        if (typeof inArgs === 'object' && Object.keys(inArgs).length > 0)
        {
            for (let arg of Object.keys(inArgs))
            {
                togoto = url_add_param(togoto, arg,inArgs[arg]);
            }
        }

        StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
        LogUtils_logHHAuto("setting autoloop to false");
        LogUtils_logHHAuto('GotoPage : '+togoto+' in '+delay+'ms.');
        setTimeout(function () {window.location = window.location.origin + togoto;},delay);
    }
    else
    {
        LogUtils_logHHAuto("Couldn't find page path. Page was undefined...");
        setTimeout(function () {location.reload();},delay);
    }
}

function setLastPageCalled(inPage)
{
    //console.log("testingHome : setting to : "+JSON.stringify({page:inPage, dateTime:new Date().getTime()}));
    StorageHelper_setStoredValue("HHAuto_Temp_LastPageCalled", JSON.stringify({page:inPage, dateTime:new Date().getTime()}));
}
;// CONCATENATED MODULE: ./src/Service/ParanoiaService.js







function replacerMap(key, value) {
    const originalObject = this[key];
    if(originalObject instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(originalObject.entries()), // or with spread: value: [...originalObject]
        };
    } else {
        return value;
    }
}

function reviverMap(key, value) {
    if(typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}

function checkParanoiaSpendings(spendingFunction)
{
    var pSpendings=new Map([]);
    // not set
    if ( StorageHelper_getStoredValue("HHAuto_Temp_paranoiaSpendings") === undefined)
    {
        return -1;
    }
    else
    {
        pSpendings = JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_paranoiaSpendings"),reviverMap);
    }

    if ( StorageHelper_getStoredValue("HHAuto_Temp_paranoiaQuestBlocked") !== undefined && pSpendings.has('quest'))
    {
        pSpendings.delete('quest');
    }

    if ( StorageHelper_getStoredValue("HHAuto_Temp_paranoiaLeagueBlocked") !== undefined && pSpendings.has('challenge'))
    {
        pSpendings.delete('challenge');
    }

    // for all count remaining
    if (spendingFunction === undefined)
    {
        var spendingsRemaining=0;
        for (var i of pSpendings.values())
        {
            spendingsRemaining+=i;
        }
        //logHHAuto("Paranoia spending remaining : "+JSON.stringify(pSpendings,replacerMap));
        return spendingsRemaining;
    }
    else
    {
        // return value if exist else -1
        if (!pSpendings.has(spendingFunction))
        {
            return -1;
        }
        return pSpendings.get(spendingFunction);
    }
}

function clearParanoiaSpendings()
{
    sessionStorage.removeItem('HHAuto_Temp_paranoiaSpendings');
    sessionStorage.removeItem('HHAuto_Temp_NextSwitch');
    sessionStorage.removeItem('HHAuto_Temp_paranoiaQuestBlocked');
    sessionStorage.removeItem('HHAuto_Temp_paranoiaLeagueBlocked');
}

function updatedParanoiaSpendings(inSpendingFunction, inSpent)
{
    var currentPSpendings=new Map([]);
    // not set
    if ( StorageHelper_getStoredValue("HHAuto_Temp_paranoiaSpendings") === undefined)
    {
        return -1;
    }
    else
    {
        currentPSpendings = JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_paranoiaSpendings"),reviverMap);
        if (currentPSpendings.has(inSpendingFunction))
        {
            let currValue = currentPSpendings.get(inSpendingFunction);
            currValue -= inSpent;

            if (currValue >0)
            {
                LogUtils_logHHAuto("Spent "+inSpent+" "+inSpendingFunction+", remains "+currValue+" before Paranoia.");
                currentPSpendings.set(inSpendingFunction,currValue);
            }
            else
            {
                currentPSpendings.delete(inSpendingFunction);
            }
        }
        LogUtils_logHHAuto("Remains to spend before Paranoia : "+JSON.stringify(currentPSpendings,replacerMap));
        StorageHelper_setStoredValue("HHAuto_Temp_paranoiaSpendings", JSON.stringify(currentPSpendings,replacerMap));

    }
}

//sets spending to do before paranoia
function setParanoiaSpendings()
{
    var maxPointsDuringParanoia;
    var totalPointsEndParanoia;
    var paranoiaSpendings=new Map([]);
    var paranoiaSpend;
    var currentEnergy;
    var maxEnergy;
    var toNextSwitch;
    if (StorageHelper_getStoredValue("HHAuto_Temp_NextSwitch") !== undefined && StorageHelper_getStoredValue("HHAuto_Setting_paranoiaSpendsBefore") === "true")
    {
        toNextSwitch = Number((StorageHelper_getStoredValue("HHAuto_Temp_NextSwitch")-new Date().getTime())/1000);

        //if autoLeague is on
        if(getHHScriptVars('isEnabledLeagues',false) && StorageHelper_getStoredValue("HHAuto_Setting_autoLeagues") === "true" && getHHVars('Hero.infos.level')>=20)
        {
            if ( StorageHelper_getStoredValue("HHAuto_Temp_paranoiaLeagueBlocked") === undefined )
            {
                maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getHHVars('Hero.energies.challenge.next_refresh_ts')))/Number(getHHVars('Hero.energies.challenge.seconds_per_point')));
                currentEnergy=LeagueHelper.getEnergy();
                maxEnergy=LeagueHelper.getEnergyMax();
                totalPointsEndParanoia = currentEnergy+maxPointsDuringParanoia;
                //if point refreshed during paranoia would go above max
                if ( totalPointsEndParanoia >= maxEnergy)
                {
                    paranoiaSpend=totalPointsEndParanoia - maxEnergy + 1;
                    paranoiaSpendings.set("challenge",paranoiaSpend);
                    LogUtils_logHHAuto("Setting Paranoia spendings for league : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") spending "+paranoiaSpend);
                }
                else
                {
                    LogUtils_logHHAuto("Setting Paranoia spendings for league : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") No spending ");
                }
            }
        }
        //if autoquest is on
        if(getHHScriptVars('isEnabledQuest',false) && (StorageHelper_getStoredValue("HHAuto_Setting_autoQuest") === "true" || (getHHScriptVars("isEnabledSideQuest",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoSideQuest") === "true")))
        {
            if ( StorageHelper_getStoredValue("HHAuto_Temp_paranoiaQuestBlocked") === undefined )
            {
                maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getHHVars('Hero.energies.quest.next_refresh_ts')))/Number(getHHVars('Hero.energies.quest.seconds_per_point')));
                currentEnergy=QuestHelper.getEnergy();
                maxEnergy=QuestHelper.getEnergyMax();
                totalPointsEndParanoia = currentEnergy+maxPointsDuringParanoia;
                //if point refreshed during paranoia would go above max
                if ( totalPointsEndParanoia >= maxEnergy)
                {
                    paranoiaSpend=totalPointsEndParanoia - maxEnergy + 1;
                    paranoiaSpendings.set("quest",paranoiaSpend);
                    LogUtils_logHHAuto("Setting Paranoia spendings for quest : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") spending "+paranoiaSpend);
                }
                else
                {
                    LogUtils_logHHAuto("Setting Paranoia spendings for quest : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") No spending ");
                }
            }
        }
        //if autoTrollBattle is on
        if(getHHScriptVars('isEnabledTrollBattle',false) && StorageHelper_getStoredValue("HHAuto_Setting_autoTrollBattle") === "true" && getHHVars('Hero.infos.questing.id_world')>0)
        {
            maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getHHVars('Hero.energies.fight.next_refresh_ts')))/Number(getHHVars('Hero.energies.fight.seconds_per_point')));
            currentEnergy=Troll.getEnergy();
            maxEnergy=Troll.getEnergyMax();
            totalPointsEndParanoia = currentEnergy+maxPointsDuringParanoia;
            //if point refreshed during paranoia would go above max
            if ( totalPointsEndParanoia >= maxEnergy)
            {
                paranoiaSpend=totalPointsEndParanoia - maxEnergy + 1;
                paranoiaSpendings.set("fight",paranoiaSpend);
                LogUtils_logHHAuto("Setting Paranoia spendings for troll : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") spending "+paranoiaSpend);
            }
            else
            {
                LogUtils_logHHAuto("Setting Paranoia spendings for troll : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") No spending ");
            }
        }
        //if autoSeason is on
        if(getHHScriptVars('isEnabledSeason',false) && StorageHelper_getStoredValue("HHAuto_Setting_autoSeason") === "true")
        {
            maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getHHVars('Hero.energies.kiss.next_refresh_ts')))/Number(getHHVars('Hero.energies.kiss.seconds_per_point')));
            currentEnergy=Season.getEnergy();
            maxEnergy=Season.getEnergyMax();
            totalPointsEndParanoia = currentEnergy+maxPointsDuringParanoia;
            //if point refreshed during paranoia would go above max
            if ( totalPointsEndParanoia >= maxEnergy)
            {
                paranoiaSpend=totalPointsEndParanoia - maxEnergy + 1;
                paranoiaSpendings.set("kiss",paranoiaSpend);
                LogUtils_logHHAuto("Setting Paranoia spendings for Season : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") spending "+paranoiaSpend);
            }
            else
            {
                LogUtils_logHHAuto("Setting Paranoia spendings for Season : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") No spending ");
            }
        }
        //if autoPantheon is on
        if(getHHScriptVars('isEnabledPantheon',false) && StorageHelper_getStoredValue("HHAuto_Setting_autoPantheon") === "true")
        {
            maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getHHVars('Hero.energies.worship.next_refresh_ts')))/Number(getHHVars('Hero.energies.worship.seconds_per_point')));
            currentEnergy=Pantheon.getEnergy();
            maxEnergy=Pantheon.getEnergyMax();
            totalPointsEndParanoia = currentEnergy+maxPointsDuringParanoia;
            //if point refreshed during paranoia would go above max
            if ( totalPointsEndParanoia >= maxEnergy)
            {
                paranoiaSpend=totalPointsEndParanoia - maxEnergy + 1;
                paranoiaSpendings.set("worship",paranoiaSpend);
                LogUtils_logHHAuto("Setting Paranoia spendings for Pantheon : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") spending "+paranoiaSpend);
            }
            else
            {
                LogUtils_logHHAuto("Setting Paranoia spendings for Pantheon : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") No spending ");
            }
        }

        LogUtils_logHHAuto("Setting paranoia spending to : "+JSON.stringify(paranoiaSpendings,replacerMap));
        StorageHelper_setStoredValue("HHAuto_Temp_paranoiaSpendings", JSON.stringify(paranoiaSpendings,replacerMap));
    }
}

function flipParanoia()
{
    var burst=getBurst();

    var Setting=StorageHelper_getStoredValue("HHAuto_Setting_paranoiaSettings");

    var S1=Setting.split('/').map(s=>s.split('|').map(s=>s.split(':')));

    var toNextSwitch;
    var period;
    var n = new Date().getHours();
    S1[2].some(x => {if (n<x[0]) {period=x[1]; return true;}});

    if (burst)
    {
        var periods=Object.assign(...S1[1].map(d => ({[d[0]]: d[1].split('-')})));

        toNextSwitch=StorageHelper_getStoredValue("HHAuto_Temp_NextSwitch")?Number((StorageHelper_getStoredValue("HHAuto_Temp_NextSwitch")-new Date().getTime())/1000):randomInterval(Number(periods[period][0]),Number(periods[period][1]));

        //match mythic new wave with end of sleep
        if (StorageHelper_getStoredValue("HHAuto_Setting_autoTrollMythicByPassParanoia") === "true" && getTimer("eventMythicNextWave") !== -1 && toNextSwitch>getSecondsLeft("eventMythicNextWave"))
        {
            LogUtils_logHHAuto("Forced rest only until next mythic wave.");
            toNextSwitch=getSecondsLeft("eventMythicNextWave");
        }

        //bypass Paranoia if ongoing mythic
        if (StorageHelper_getStoredValue("HHAuto_Setting_autoTrollMythicByPassParanoia") === "true" && StorageHelper_getStoredValue("HHAuto_Temp_eventGirl") !==undefined && JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).is_mythic==="true")
        {
            //             var trollThreshold = Number(getStoredValue("HHAuto_Setting_autoTrollThreshold"));
            //             if (getStoredValue("HHAuto_Setting_buyMythicCombat") === "true" || getStoredValue("HHAuto_Setting_autoTrollMythicByPassThreshold") === "true")
            //             {
            //                 trollThreshold = 0;
            //             }
            //mythic onGoing and still have some fight above threshold
            if (Troll.getEnergy() > 0) //trollThreshold)
            {
                LogUtils_logHHAuto("Forced bypass Paranoia for mythic (can fight).");
                setTimer('paranoiaSwitch',60);
                return;
            }

            //mythic ongoing and can buyCombat
            // const Hero=getHero();
            // var price=Hero.get_recharge_cost("fight");
            if (Troll.canBuyFight().canBuy && Troll.getEnergy()==0)
            {

                LogUtils_logHHAuto("Forced bypass Paranoia for mythic (can buy).");
                setTimer('paranoiaSwitch',60);
                return;
            }
        }

        if ( checkParanoiaSpendings() === -1 && StorageHelper_getStoredValue("HHAuto_Setting_paranoiaSpendsBefore") === "true" )
        {
            StorageHelper_setStoredValue("HHAuto_Temp_NextSwitch", new Date().getTime() + toNextSwitch * 1000);
            setParanoiaSpendings();
            return;
        }

        if ( checkParanoiaSpendings() === 0 || StorageHelper_getStoredValue("HHAuto_Setting_paranoiaSpendsBefore") === "false" )
        {
            clearParanoiaSpendings();
            PlaceOfPower.cleanTempPopToStart();
            //going into hiding
            StorageHelper_setStoredValue("HHAuto_Temp_burst", "false");
            gotoPage(getHHScriptVars("pagesIDHome"));
        }
        else
        {
            //refresh remaining
            //setParanoiaSpendings(toNextSwitch);
            //let spending go before going in paranoia
            return;
        }
    }
    else
    {
        //if (getPage()!=getHHScriptVars("pagesIDHome")) return;
        //going to work
        StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
        LogUtils_logHHAuto("setting autoloop to false");
        StorageHelper_setStoredValue("HHAuto_Temp_burst", "true");
        var b=S1[0][0][0].split('-');
        toNextSwitch=randomInterval(Number(b[0]),Number(b[1]));
    }
    var ND=new Date().getTime() + toNextSwitch * 1000;
    var message=period+(burst?" rest":" burst");
    LogUtils_logHHAuto("PARANOIA: "+message);
    StorageHelper_setStoredValue("HHAuto_Temp_pinfo", message);

    setTimer('paranoiaSwitch',toNextSwitch);
    //force recheck non completed event after paranoia
    if (StorageHelper_getStoredValue("HHAuto_Temp_burst") =="true")
    {
        let eventList = Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_eventsList"))?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventsList")):{};
        for (let eventID of Object.keys(eventList))
        {
            //console.log(eventID);
            if (!eventList[eventID]["isCompleted"])
            {
                eventList[eventID]["next_refresh"]=new Date().getTime()-1000;
                //console.log("expire");
                if(Object.keys(eventList).length >0)
                {
                    StorageHelper_setStoredValue("HHAuto_Temp_eventsList", JSON.stringify(eventList));
                }
            }
        }
        //sessionStorage.removeItem("HHAuto_Temp_eventsList");
        gotoPage(getHHScriptVars("pagesIDHome"));
    }
}
;// CONCATENATED MODULE: ./src/Service/AutoLoop.js










let busy = false;


function getBurst()
{
    if (document.getElementById('sMenu'))
    {
        if (document.getElementById('sMenu').style.display!=='none' )// && !document.getElementById("DebugDialog").open)
        {
            return false;
        }
    }
    if ($('#contains_all>nav>[rel=content]').length >0)
    {
        if ($('#contains_all>nav>[rel=content]')[0].style.display === "block")// && !document.getElementById("DebugDialog").open)
        {
            return false;
        }
    }
    return StorageHelper_getStoredValue("HHAuto_Setting_master") ==="true"&&(!(StorageHelper_getStoredValue("HHAuto_Setting_paranoia") ==="true") || StorageHelper_getStoredValue("HHAuto_Temp_burst") ==="true");
}


function CheckSpentPoints()
{
    let oldValues=StorageHelper_getStoredValue("HHAuto_Temp_CheckSpentPoints")?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_CheckSpentPoints")):-1;
    let newValues={};
    if (getHHScriptVars('isEnabledTrollBattle',false))
    {
        newValues['fight']=Troll.getEnergy();
    }
    if (getHHScriptVars('isEnabledSeason',false))
    {
        newValues['kiss']=Season.getEnergy();
    }
    if (getHHScriptVars('isEnabledQuest',false))
    {
        newValues['quest']=QuestHelper.getEnergy();
    }
    if (getHHScriptVars('isEnabledLeagues',false))
    {
        newValues['challenge']=LeagueHelper.getEnergy();
    }
    if (getHHScriptVars('isEnabledPantheon',false))
    {
        newValues['worship']=Pantheon.getEnergy();
    }

    if ( oldValues !== -1)
    {
        let spent= {};
        let hasSpend = false;

        for (let i of Object.keys(newValues))
        {
            //console.log(i);
            if (oldValues[i]-newValues[i] >0)
            {
                spent[i]=oldValues[i]-newValues[i];
                updatedParanoiaSpendings(i, spent[i]);
            }

        }
        StorageHelper_setStoredValue("HHAuto_Temp_CheckSpentPoints", JSON.stringify(newValues));

        if (getHHScriptVars('isEnabledLeagues',false) && newValues['challenge'] > (oldValues['challenge'] +1))
        {
            LogUtils_logHHAuto("Seems league point bought, resetting timer.");
            TimerHelper_clearTimer('nextLeaguesTime');
        }
        if (getHHScriptVars('isEnabledSeason',false) && newValues['kiss'] > (oldValues['kiss'] +1))
        {
            LogUtils_logHHAuto("Seems season point bought, resetting timer.");
            TimerHelper_clearTimer('nextSeasonTime');
        }
        if (getHHScriptVars('isEnabledPantheon',false) && newValues['worship'] > (oldValues['worship'] +1))
        {
            LogUtils_logHHAuto("Seems Pantheon point bought, resetting timer.");
            TimerHelper_clearTimer('nextPantheonTime');
        }
    }
    else
    {
        StorageHelper_setStoredValue("HHAuto_Temp_CheckSpentPoints", JSON.stringify(newValues));
    }
}

function autoLoop()
{
    updateData();
    if (StorageHelper_getStoredValue("HHAuto_Temp_questRequirement") === undefined)
    {
        StorageHelper_setStoredValue("HHAuto_Temp_questRequirement", "none");
    }
    if (StorageHelper_getStoredValue("HHAuto_Temp_battlePowerRequired") === undefined)
    {
        StorageHelper_setStoredValue("HHAuto_Temp_battlePowerRequired", "0");
    }

    //var busy = false;
    busy = false;
    var page = window.location.href;
    var currentPower = Troll.getEnergy();

    var burst=getBurst();
    switchHHMenuButton(burst);
    //console.log("burst : "+burst);
    checkAndClosePopup(burst);

    if (burst && !mouseBusy /*|| checkTimer('nextMissionTime')*/)
    {

        if (!checkTimer("paranoiaSwitch") )
        {
            clearParanoiaSpendings();
        }
        CheckSpentPoints();

        //check what happen to timer if no more wave before uncommenting
        /*if (getStoredValue("HHAuto_Setting_plusEventMythic") ==="true" && checkTimerMustExist('eventMythicNextWave'))
        {
            gotoPage(getHHScriptVars("pagesIDHome"));
        }
        */

        const Hero = getHero();
        //if a new event is detected
        const {eventIDs, bossBangEventIDs} = EventModule.parsePageForEventId();
        if(
            busy === false && getHHScriptVars("isEnabledEvents",false)
            &&
            (
                (eventIDs.length > 0 && getPage() !== getHHScriptVars("pagesIDEvent"))
                ||
                (getPage()===getHHScriptVars("pagesIDEvent") && $("#contains_all #events[parsed]").length === 0)
            )
        )
            //&& ( getStoredValue("HHAuto_Temp_EventFightsBeforeRefresh") === undefined || getTimer('eventRefreshExpiration') === -1 || getStoredValue("HHAuto_Temp_eventGirl") === undefined)
        {
            LogUtils_logHHAuto("Going to check on events.");
            busy = true;
            busy = EventModule.parseEventPage(eventIDs[0]);
        }

        if (busy===false && getHHScriptVars("isEnabledShop",false) && Shop.isTimeToCheckShop() && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            if (StorageHelper_getStoredValue("HHAuto_Temp_charLevel") ===undefined)
            {
                StorageHelper_setStoredValue("HHAuto_Temp_charLevel", 0);
            }
            if (checkTimer('nextShopTime') || StorageHelper_getStoredValue("HHAuto_Temp_charLevel")<getHHVars('Hero.infos.level')) {
                LogUtils_logHHAuto("Time to check shop.");
                busy = Shop.updateShop();
            }
        }

        if(busy === false && getHHScriptVars("isEnabledPowerPlaces",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoPowerPlaces") === "true" && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {

            var popToStart = StorageHelper_getStoredValue("HHAuto_Temp_PopToStart")?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_PopToStart")):[];
            if (popToStart.length != 0 || checkTimer('minPowerPlacesTime'))
            {
                //if PopToStart exist bypass function
                var popToStartExist = StorageHelper_getStoredValue("HHAuto_Temp_PopToStart")?true:false;
                //logHHAuto("startcollect : "+popToStartExist);
                if (! popToStartExist)
                {
                    //logHHAuto("pop1:"+popToStart);
                    LogUtils_logHHAuto("Go and collect");
                    busy = true;
                    busy = PlaceOfPower.collectAndUpdate();
                }
                var indexes=(StorageHelper_getStoredValue("HHAuto_Setting_autoPowerPlacesIndexFilter")).split(";");

                popToStart = StorageHelper_getStoredValue("HHAuto_Temp_PopToStart")?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_PopToStart")):[];
                //console.log(indexes, popToStart);
                for(var pop of popToStart)
                {
                    if (busy === false && ! indexes.includes(String(pop)))
                    {
                        LogUtils_logHHAuto("PoP is no longer in list :"+pop+" removing it from start list.");
                        PlaceOfPower.removePopFromPopToStart(pop);
                    }
                }
                popToStart = StorageHelper_getStoredValue("HHAuto_Temp_PopToStart")?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_PopToStart")):[];
                //logHHAuto("pop2:"+popToStart);
                for(var index of indexes)
                {
                    if (busy === false && popToStart.includes(Number(index)))
                    {
                        LogUtils_logHHAuto("Time to do PowerPlace"+index+".");
                        busy = true;
                        busy = PlaceOfPower.doPowerPlacesStuff(index);
                    }
                }
                if (busy === false)
                {
                    //logHHAuto("pop3:"+getStoredValue("HHAuto_Temp_PopToStart"));
                    popToStart = StorageHelper_getStoredValue("HHAuto_Temp_PopToStart")?JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_PopToStart")):[];
                    //logHHAuto("pop3:"+popToStart);
                    if (popToStart.length === 0)
                    {
                        //logHHAuto("removing popToStart");
                        sessionStorage.removeItem('HHAuto_Temp_PopToStart');
                        gotoPage(getHHScriptVars("pagesIDHome"));
                    }
                }
            }
        }

        if
            (
                busy === false
                &&
                (
                    getPage() === getHHScriptVars("pagesIDLeagueBattle")
                    || getPage() === getHHScriptVars("pagesIDTrollBattle")
                    || getPage() === getHHScriptVars("pagesIDSeasonBattle")
                    || getPage() === getHHScriptVars("pagesIDPantheonBattle")
                )
                && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true"
                && canCollectCompetitionActive()
            )
        {
            busy = true;
            GenericBattle.doBattle();
        }

        if(busy === false && getHHScriptVars("isEnabledTrollBattle",false) 
        && (StorageHelper_getStoredValue("HHAuto_Setting_autoTrollBattle") === "true" || StorageHelper_getStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest") === "true")
        && getHHVars('Hero.infos.questing.id_world')>0 && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true" && canCollectCompetitionActive())
        {
            //logHHAuto("fight amount: "+currentPower+" troll threshold: "+Number(getStoredValue("HHAuto_Setting_autoTrollThreshold"))+" paranoia fight: "+Number(checkParanoiaSpendings('fight')));
            if
                (
                    //normal case
                    (
                        Number(currentPower) >= Number(StorageHelper_getStoredValue("HHAuto_Temp_battlePowerRequired"))
                        && Number(currentPower) > 0
                        &&
                        (
                            Number(currentPower) > Number(StorageHelper_getStoredValue("HHAuto_Setting_autoTrollThreshold")) //fight is above threshold
                            || StorageHelper_getStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest") === "true"
                        )
                    )
                    || Number(checkParanoiaSpendings('fight')) > 0 //paranoiaspendings to do
                    ||
                    (
                        // mythic Event Girl available and fights available
                        (
                            StorageHelper_getStoredValue("HHAuto_Temp_eventGirl") !== undefined
                            && JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "true"
                            && StorageHelper_getStoredValue("HHAuto_Setting_plusEventMythic") ==="true"
                        )
                        &&
                        (
                            Number(currentPower) > 0 //has fight => bypassing paranoia
                            || Troll.canBuyFight(false).canBuy // can buy fights
                        )
                    )
                    ||
                    (
                        // normal Event Girl available
                        (
                            StorageHelper_getStoredValue("HHAuto_Temp_eventGirl") !== undefined
                            && JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "false"
                            && StorageHelper_getStoredValue("HHAuto_Setting_plusEvent") ==="true"
                        )
                        &&
                        (
                            (
                                Number(currentPower) > 0 //has fight
                                && Number(currentPower) > Number(StorageHelper_getStoredValue("HHAuto_Setting_autoTrollThreshold")) // above paranoia
                            )
                            || Troll.canBuyFight(false).canBuy // can buy fights
                        )
                    )
                )


            {
                StorageHelper_setStoredValue("HHAuto_Temp_battlePowerRequired", "0");
                busy = true;
                if (StorageHelper_getStoredValue("HHAuto_Setting_autoQuest") !== "true" || StorageHelper_getStoredValue("HHAuto_Temp_questRequirement")[0] !== 'P')
                {
                    busy = Troll.doBossBattle();
                }
                else
                {
                    LogUtils_logHHAuto("AutoBattle disabled for power collection for AutoQuest.");
                    document.getElementById("autoTrollBattle").checked = false;
                    StorageHelper_setStoredValue("HHAuto_Setting_autoTrollBattle", "false");
                    busy = false;
                }
            }
            /*else
            {
                if (getPage() === getHHScriptVars("pagesIDTrollPreBattle"))
                {
                    logHHAuto("Go to home after troll fight");
                    gotoPage(getHHScriptVars("pagesIDHome"));

                }
            }*/

        }
        else
        {
            StorageHelper_setStoredValue("HHAuto_Temp_battlePowerRequired", "0");
        }


        if (busy === false && getHHScriptVars("isEnabledGreatPachinko",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoFreePachinko") === "true" && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true" && checkTimer("nextPachinkoTime") && canCollectCompetitionActive()) {
            LogUtils_logHHAuto("Time to fetch Great Pachinko.");
            busy = Pachinko.getGreatPachinko();
        }

        if (busy === false && getHHScriptVars("isEnabledMythicPachinko",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoFreePachinko") === "true" && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true" && checkTimer("nextPachinko2Time") && canCollectCompetitionActive()) {
            LogUtils_logHHAuto("Time to fetch Mythic Pachinko.");
            busy = Pachinko.getMythicPachinko();
        }

        if (busy === false && getHHScriptVars("isEnabledEquipmentPachinko",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoFreePachinko") === "true" && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true" && checkTimer("nextPachinkoEquipTime") && canCollectCompetitionActive()) {
            LogUtils_logHHAuto("Time to fetch Equipment Pachinko.");
            busy = Pachinko.getEquipmentPachinko();
        }

        if(busy === false && getHHScriptVars("isEnabledContest",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoContest") === "true" && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            if (checkTimer('nextContestTime') || unsafeWindow.has_contests_datas ||$(".contest .ended button[rel='claim']").length>0){
                LogUtils_logHHAuto("Time to get contest rewards.");
                busy = Contest.run();
            }
        }

        if(busy === false && getHHScriptVars("isEnabledMission",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoMission") === "true" && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            if (checkTimer('nextMissionTime')){
                LogUtils_logHHAuto("Time to do missions.");
                busy = Missions.run();
            }
        }

        if (busy === false && getHHScriptVars("isEnabledQuest",false) && (StorageHelper_getStoredValue("HHAuto_Setting_autoQuest") === "true" || (getHHScriptVars("isEnabledSideQuest",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoSideQuest") === "true")) && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true" && canCollectCompetitionActive())
        {
            if (StorageHelper_getStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest") === undefined)
            {
                StorageHelper_setStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest", "false");
            }
            let questRequirement = StorageHelper_getStoredValue("HHAuto_Temp_questRequirement");
            if (questRequirement === "battle")
            {
                if (getHHScriptVars("isEnabledTrollBattle",false) && StorageHelper_getStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest") === "false")
                {
                    LogUtils_logHHAuto("Quest requires battle.");
                    LogUtils_logHHAuto("prepare to save one battle for quest");
                    StorageHelper_setStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest", "true");
                    if(StorageHelper_getStoredValue("HHAuto_Setting_autoTrollBattle") !== "true") {
                        Troll.doBossBattle();
                    }
                }
                busy = true;
            }
            else if (questRequirement[0] === '$')
            {
                if (Number(questRequirement.substr(1)) < getHHVars('Hero.currencies.soft_currency')) {
                    // We have enough money... requirement fulfilled.
                    LogUtils_logHHAuto("Continuing quest, required money obtained.");
                    StorageHelper_setStoredValue("HHAuto_Temp_questRequirement", "none");
                    QuestHelper.run();
                    busy = true;
                }
                else
                {
                    //prevent paranoia to wait for quest
                    StorageHelper_setStoredValue("HHAuto_Temp_paranoiaQuestBlocked", "true");
                    if(isNaN(questRequirement.substr(1)))
                    {
                        LogUtils_logHHAuto(questRequirement);
                        StorageHelper_setStoredValue("HHAuto_Temp_questRequirement", "none");
                        LogUtils_logHHAuto("Invalid money in session storage quest requirement !");
                    }
                    busy = false;
                }
            }
            else if (questRequirement[0] === '*')
            {
                var energyNeeded = Number(questRequirement.substr(1));
                var energyCurrent = QuestHelper.getEnergy();
                if (energyNeeded <= energyCurrent)
                {
                    if (Number(energyCurrent) > Number(StorageHelper_getStoredValue("HHAuto_Setting_autoQuestThreshold")) || Number(checkParanoiaSpendings('quest')) > 0 )
                    {
                        // We have enough energy... requirement fulfilled.
                        LogUtils_logHHAuto("Continuing quest, required energy obtained.");
                        StorageHelper_setStoredValue("HHAuto_Temp_questRequirement", "none");
                        QuestHelper.run();
                        busy = true;
                    }
                    else
                    {
                        busy = false;
                    }
                }
                // Else we need energy, just wait.
                else
                {
                    //prevent paranoia to wait for quest
                    StorageHelper_setStoredValue("HHAuto_Temp_paranoiaQuestBlocked", "true");
                    busy = false;
                    //logHHAuto("Replenishing energy for quest.(" + energyNeeded + " needed)");
                }
            }
            else if (questRequirement[0] === 'P')
            {
                // Battle power required.
                var neededPower = Number(questRequirement.substr(1));
                if(currentPower < neededPower)
                {
                    LogUtils_logHHAuto("Quest requires "+neededPower+" Battle Power for advancement. Waiting...");
                    busy = false;
                    //prevent paranoia to wait for quest
                    StorageHelper_setStoredValue("HHAuto_Temp_paranoiaQuestBlocked", "true");
                }
                else
                {
                    LogUtils_logHHAuto("Battle Power obtained, resuming quest...");
                    StorageHelper_setStoredValue("HHAuto_Temp_questRequirement", "none");
                    QuestHelper.run();
                    busy = true;
                }
            }
            else if (questRequirement === "unknownQuestButton")
            {
                //prevent paranoia to wait for quest
                StorageHelper_setStoredValue("HHAuto_Temp_paranoiaQuestBlocked", "true");
                if (StorageHelper_getStoredValue("HHAuto_Setting_autoQuest") === "true")
                {
                    LogUtils_logHHAuto("AutoQuest disabled.HHAuto_Setting_AutoQuest cannot be performed due to unknown quest button. Please manually proceed the current quest screen.");
                    document.getElementById("autoQuest").checked = false;
                    StorageHelper_setStoredValue("HHAuto_Setting_autoQuest", "false");
                }
                if (StorageHelper_getStoredValue("HHAuto_Setting_autoSideQuest") === "true")
                {
                    LogUtils_logHHAuto("AutoQuest disabled.HHAuto_Setting_autoSideQuest cannot be performed due to unknown quest button. Please manually proceed the current quest screen.");
                    document.getElementById("autoSideQuest").checked = false;
                    StorageHelper_setStoredValue("HHAuto_Setting_autoSideQuest", "false");
                }
                StorageHelper_setStoredValue("HHAuto_Temp_questRequirement", "none");
                busy = false;
            }
            else if (questRequirement === "errorInAutoBattle")
            {
                //prevent paranoia to wait for quest
                StorageHelper_setStoredValue("HHAuto_Temp_paranoiaQuestBlocked", "true");
                if (StorageHelper_getStoredValue("HHAuto_Setting_autoQuest") === "true")
                {
                    LogUtils_logHHAuto("AutoQuest disabled.HHAuto_Setting_AutoQuest cannot be performed due errors in AutoBattle. Please manually proceed the current quest screen.");
                    document.getElementById("autoQuest").checked = false;
                    StorageHelper_setStoredValue("HHAuto_Setting_autoQuest", "false");
                }
                if (StorageHelper_getStoredValue("HHAuto_Setting_autoSideQuest") === "true")
                {
                    LogUtils_logHHAuto("AutoQuest disabled.HHAuto_Setting_autoSideQuest cannot be performed due errors in AutoBattle. Please manually proceed the current quest screen.");
                    document.getElementById("autoSideQuest").checked = false;
                    StorageHelper_setStoredValue("HHAuto_Setting_autoSideQuest", "false");
                }
                StorageHelper_setStoredValue("HHAuto_Temp_questRequirement", "none");
                busy = false;
            }
            else if(questRequirement === "none")
            {
                if (checkTimer('nextMainQuestAttempt') && checkTimer('nextSideQuestAttempt'))
                {
                    if (QuestHelper.getEnergy() > Number(StorageHelper_getStoredValue("HHAuto_Setting_autoQuestThreshold")) || Number(checkParanoiaSpendings('quest')) > 0 )
                    {
                        //logHHAuto("NONE req.");
                        busy = true;
                        QuestHelper.run();
                    }
                }
            }
            else
            {
                //prevent paranoia to wait for quest
                StorageHelper_setStoredValue("HHAuto_Temp_paranoiaQuestBlocked", "true");
                LogUtils_logHHAuto("Invalid quest requirement : "+questRequirement);
                busy=false;
            }
        }
        else if(StorageHelper_getStoredValue("HHAuto_Setting_autoQuest") === "false" && StorageHelper_getStoredValue("HHAuto_Setting_autoSideQuest") === "false")
        {
            StorageHelper_setStoredValue("HHAuto_Temp_questRequirement", "none");
        }

        if(busy === false && getHHScriptVars("isEnabledSeason",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoSeason") === "true" && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true" && canCollectCompetitionActive())
        {
            if (Season.isTimeToFight())
            {
                LogUtils_logHHAuto("Time to fight in Season.");
                Season.run();
                busy = true;
            }
            else if (checkTimer('nextSeasonTime'))
            {
                if (getHHVars('Hero.energies.kiss.next_refresh_ts') === 0)
                {
                    setTimer('nextSeasonTime',15*60);
                }
                else
                {
                    setTimer('nextSeasonTime',getHHVars('Hero.energies.kiss.next_refresh_ts') + 10);
                }
            }
        }

        if(busy === false && getHHScriptVars("isEnabledPantheon",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoPantheon") === "true" && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true" && canCollectCompetitionActive())
        {
            if (Pantheon.isTimeToFight())
            {
                LogUtils_logHHAuto("Time to do Pantheon.");
                Pantheon.run();
                busy = true;
            }
            else if (checkTimer('nextPantheonTime'))
            {
                if (getHHVars('Hero.energies.worship.next_refresh_ts') === 0)
                {
                    setTimer('nextPantheonTime',15*60);
                }
                else
                {
                    setTimer('nextPantheonTime',getHHVars('Hero.energies.worship.next_refresh_ts') + 10);
                }
            }
        }

        if (busy==false && getHHScriptVars("isEnabledChamps",false) 
            && QuestHelper.getEnergy()>=60 && QuestHelper.getEnergy() > Number(StorageHelper_getStoredValue("HHAuto_Setting_autoQuestThreshold"))
            && StorageHelper_getStoredValue("HHAuto_Setting_autoChampsUseEne") ==="true" && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true" && canCollectCompetitionActive())
        {
            function buyTicket()
            {
                var params = {
                    action: 'champion_buy_ticket',
                    currency: 'energy_quest',
                    amount: "1"
                };
                LogUtils_logHHAuto('Buying ticket with energy');
                hh_ajax(params, function(data) {
                    //anim_number($('.tickets_number_amount'), data.tokens - amount, amount);
                    Hero.updates(data.hero_changes);
                    location.reload();
                });
            }
            StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "false");
            LogUtils_logHHAuto("setting autoloop to false");
            busy = true;
            setTimeout(buyTicket,randomInterval(800,1600));
        }

        if (busy==false && getHHScriptVars("isEnabledChamps",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoChamps") ==="true" && checkTimer('nextChampionTime') && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            LogUtils_logHHAuto("Time to check on champions!");
            busy=true;
            busy= Champion.doChampionStuff();
        }

        if (busy==false && getHHScriptVars("isEnabledClubChamp",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoClubChamp") ==="true" && checkTimer('nextClubChampionTime') && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            LogUtils_logHHAuto("Time to check on club champion!");
            busy=true;
            busy= ClubChampion.doClubChampionStuff();
        }

        if(busy === false && getHHScriptVars("isEnabledLeagues",false) && LeagueHelper.isAutoLeagueActivated() && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true" && canCollectCompetitionActive())
        {
            // Navigate to leagues
            if (LeagueHelper.isTimeToFight())
            {
                LogUtils_logHHAuto("Time to fight in Leagues.");
                LeagueHelper.doLeagueBattle();
                busy = true;
            }
            else
            {
                if (checkTimer('nextLeaguesTime'))
                {
                    if (getHHVars('Hero.energies.challenge.next_refresh_ts') === 0)
                    {
                        setTimer('nextLeaguesTime',15*60);
                    }
                    else
                    {
                        setTimer('nextLeaguesTime',getHHVars('Hero.energies.challenge.next_refresh_ts') + 10);
                    }
                }
                /*if (getPage() === getHHScriptVars("pagesIDLeaderboard"))
                {
                    logHHAuto("Go to home after league fight");
                    gotoPage(getHHScriptVars("pagesIDHome"));

                }*/
            }
        }

        if (
            busy==false && getHHScriptVars("isEnabledSeason",false) && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true" &&
            (
                checkTimer('nextSeasonCollectTime') && StorageHelper_getStoredValue("HHAuto_Setting_autoSeasonCollect") === "true" && canCollectCompetitionActive()
                ||
                StorageHelper_getStoredValue("HHAuto_Setting_autoSeasonCollectAll") === "true" && checkTimer('nextSeasonCollectAllTime') && (getTimer('SeasonRemainingTime') == -1 || getSecondsLeft('SeasonRemainingTime') < getLimitTimeBeforeEnd())
            )
        )
        {
            LogUtils_logHHAuto("Time to go and check Season for collecting reward.");
            busy = true;
            busy = Season.goAndCollect();
        }

        if (
            busy==false && getHHScriptVars("isEnabledSeasonalEvent",false) && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true" &&
            (
                checkTimer('nextSeasonalEventCollectTime') && StorageHelper_getStoredValue("HHAuto_Setting_autoSeasonalEventCollect") === "true" && canCollectCompetitionActive()
                ||
                StorageHelper_getStoredValue("HHAuto_Setting_autoSeasonalEventCollectAll") === "true" && checkTimer('nextSeasonalEventCollectAllTime') && (getTimer('SeasonalEventRemainingTime') == -1 || getSecondsLeft('SeasonalEventRemainingTime') < getLimitTimeBeforeEnd())
            )
        )
        {
            LogUtils_logHHAuto("Time to go and check SeasonalEvent for collecting reward.");
            busy = true;
            busy = SeasonalEvent.goAndCollect();
        }

        if (
            busy==false && getHHScriptVars("isEnabledSeasonalEvent",false) && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true" &&
            checkTimer('nextMegaEventRankCollectTime') && StorageHelper_getStoredValue("HHAuto_Setting_autoSeasonalEventCollect") === "true" && canCollectCompetitionActive()
        )
        {
            LogUtils_logHHAuto("Time to go and check  SeasonalEvent for collecting rank reward.");
            busy = true;
            busy = SeasonalEvent.goAndCollectMegaEventRankRewards();
        }

        if (
            busy==false && getHHScriptVars("isEnabledPoV",false) && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true" && getHHVars('Hero.infos.level')>=30 &&
            (
                checkTimer('nextPoVCollectTime') && StorageHelper_getStoredValue("HHAuto_Setting_autoPoVCollect") === "true" && canCollectCompetitionActive()
                ||
                StorageHelper_getStoredValue("HHAuto_Setting_autoPoVCollectAll") === "true" && checkTimer('nextPoVCollectAllTime') && (getTimer('PoVRemainingTime') == -1 || getSecondsLeft('PoVRemainingTime') < getLimitTimeBeforeEnd())
            )
        )
        {
            LogUtils_logHHAuto("Time to go and check Path of Valor for collecting reward.");
            busy = true;
            busy = PathOfValue.goAndCollect();
        }

        if (
            busy==false && getHHScriptVars("isEnabledPoG",false) && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true" && getHHVars('Hero.infos.level')>=30 &&
            (
                checkTimer('nextPoGCollectTime') && StorageHelper_getStoredValue("HHAuto_Setting_autoPoGCollect") === "true" && canCollectCompetitionActive()
                ||
                StorageHelper_getStoredValue("HHAuto_Setting_autoPoGCollectAll") === "true" && checkTimer('nextPoGCollectAllTime') && (getTimer('PoGRemainingTime') == -1 || getSecondsLeft('PoGRemainingTime') < getLimitTimeBeforeEnd())
            )
        )
        {
            LogUtils_logHHAuto("Time to go and check Path of Glory for collecting reward.");
            busy = true;
            busy = PathOfGlory.goAndCollect();
        }

        if (busy==false && getHHScriptVars("isEnabledFreeBundles",false) && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true" && checkTimer('nextFreeBundlesCollectTime') && StorageHelper_getStoredValue("HHAuto_Setting_autoFreeBundlesCollect") === "true" && canCollectCompetitionActive())
        {
            busy = true;
            LogUtils_logHHAuto("Time to go and check Free Bundles for collecting reward.");
            Bundles.goAndCollectFreeBundles();
        }

        if (busy==false && getHHScriptVars("isEnabledDailyGoals",false) && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true" && checkTimer('nextDailyGoalsCollectTime') && StorageHelper_getStoredValue("HHAuto_Setting_autoDailyGoalsCollect") === "true" && canCollectCompetitionActive())
        {
            busy = true;
            LogUtils_logHHAuto("Time to go and check daily Goals for collecting reward.");
            DailyGoals.goAndCollect();
        }

        if (busy === false && getHHScriptVars("isEnabledSalary",false) && StorageHelper_getStoredValue("HHAuto_Setting_autoSalary") === "true" && ( StorageHelper_getStoredValue("HHAuto_Setting_paranoia") !== "true" || !checkTimer("paranoiaSwitch") )  && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            if (checkTimer("nextSalaryTime")) {
                LogUtils_logHHAuto("Time to fetch salary.");
                busy = true;
                busy = HaremSalary.getSalary();
            }
        }

        if(
            busy === false
            && getHHScriptVars("isEnabledBossBangEvent",false) && StorageHelper_getStoredValue("HHAuto_Setting_bossBangEvent") === "true"
            &&
            (
                (
                    bossBangEventIDs.length > 0
                    && getPage() !== getHHScriptVars("pagesIDEvent")
                )
                ||
                (
                    getPage()===getHHScriptVars("pagesIDEvent")
                    && $('#contains_all #events #boss_bang .completed-event').length === 0
                )
            )
        )
        {
            LogUtils_logHHAuto("Going to boss bang event.");
            busy = true;
            busy = EventModule.parseEventPage(bossBangEventIDs[0]);
        }

        if (
            busy === false
            && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true"
            && Harem.HaremSizeNeedsRefresh(getHHScriptVars("HaremMaxSizeExpirationSecs"))
            && getPage() !== getHHScriptVars("pagesIDHarem")

        )
        {
            //console.log(! isJSON(getStoredValue("HHAuto_Temp_HaremSize")),JSON.parse(getStoredValue("HHAuto_Temp_HaremSize")).count_date,new Date().getTime() + getHHScriptVars("HaremSizeExpirationSecs") * 1000);
            busy = true;
            gotoPage(getHHScriptVars("pagesIDHarem"));
        }

        if (
            busy === false
            && Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_LastPageCalled"))
            && getPage() !== getHHScriptVars("pagesIDHome")
            && getPage() === JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_LastPageCalled")).page
            && (new Date().getTime() - JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_LastPageCalled")).dateTime) > getHHScriptVars("minSecsBeforeGoHomeAfterActions") * 1000
        )
        {
            //console.log("testingHome : GotoHome : "+getStoredValue("HHAuto_Temp_LastPageCalled"));
            LogUtils_logHHAuto("Back to home page at the end of actions");
            deleteStoredValue("HHAuto_Temp_LastPageCalled");
            gotoPage(getHHScriptVars("pagesIDHome"));
        }
    }

    if(busy === false && !mouseBusy  && StorageHelper_getStoredValue("HHAuto_Setting_paranoia") === "true" && StorageHelper_getStoredValue("HHAuto_Setting_master") ==="true" && StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true")
    {
        if (checkTimer("paranoiaSwitch")) {
            flipParanoia();
        }
    }

    switch (getPage())
    {
        case getHHScriptVars("pagesIDLeaderboard"):
            if (StorageHelper_getStoredValue("HHAuto_Setting_showCalculatePower") === "true")
            {
                LeagueHelper.moduleSimLeague();
                LeagueHelper.style = callItOnce(LeagueHelper.style);
                LeagueHelper.style();
            }
            break;
        case getHHScriptVars("pagesIDSeasonArena"):
            if (StorageHelper_getStoredValue("HHAuto_Setting_showCalculatePower") === "true" && $("div.matchRatingNew img#powerLevelScouter").length < 3)
            {
                Season.moduleSimSeasonBattle();
            }
            break;
        case getHHScriptVars("pagesIDSeason"):
            if (StorageHelper_getStoredValue("HHAuto_Setting_SeasonMaskRewards") === "true")
            {
                setTimeout(Season.maskReward,500);
            }
            Season.getRemainingTime = callItOnce(Season.getRemainingTime);
            Season.getRemainingTime();
            if (StorageHelper_getStoredValue("HHAuto_Setting_showRewardsRecap") === "true")
            {
                RewardHelper.displayRewardsSeasonDiv();
            }
            break;
        case getHHScriptVars("pagesIDEvent"):
            if (StorageHelper_getStoredValue("HHAuto_Setting_plusEvent") === "true" || StorageHelper_getStoredValue("HHAuto_Setting_plusEventMythic") ==="true")
            {
                EventModule.parseEventPage();
                EventModule.moduleDisplayEventPriority();
            }
            if (StorageHelper_getStoredValue("HHAuto_Setting_bossBangEvent") === "true")
            {
                EventModule.parseEventPage();
                setTimeout(BossBang.goToFightPage, randomInterval(500,1500));
            }
            if (StorageHelper_getStoredValue("HHAuto_Setting_PoAMaskRewards") === "true")
            {
                setTimeout(PathOfAttraction.Hide,500);
            }
            if (StorageHelper_getStoredValue("HHAuto_Setting_showClubButtonInPoa") === "true")
            {
                PathOfAttraction.run = callItOnce(PathOfAttraction.run);
                PathOfAttraction.run();
            }
            if (StorageHelper_getStoredValue("HHAuto_Setting_showRewardsRecap") === "true")
            {
                RewardHelper.displayRewardsPoaDiv();
            }
            break;
        case getHHScriptVars("pagesIDBossBang"):
            if (StorageHelper_getStoredValue("HHAuto_Setting_bossBangEvent") === "true")
            {
                setTimeout(BossBang.skipFightPage, randomInterval(500,1500));
            }
            break;
        case getHHScriptVars("pagesIDPoA"):
            if (StorageHelper_getStoredValue("HHAuto_Setting_PoAMaskRewards") === "true")
            {
                setTimeout(PathOfAttraction.runOld,500);
            }
            break;
        case getHHScriptVars("pagesIDPowerplacemain"):
            PlaceOfPower.moduleDisplayPopID();
            break;
        case getHHScriptVars("pagesIDDailyGoals"):
            break;
        case getHHScriptVars("pagesIDMissions"):
            break;
        case getHHScriptVars("pagesIDShop"):
            if (StorageHelper_getStoredValue("HHAuto_Setting_showMarketTools") === "true")
            {
                Shop.moduleShopActions();
            }
            if(Booster.needBoosterStatusFromStore()) {
                Booster.collectBoostersFromMarket = callItOnce(Booster.collectBoostersFromMarket);
                Booster.collectBoostersFromMarket();
            }
            break;
        case getHHScriptVars("pagesIDHome"):
            setTimeout(Season.displayRemainingTime,500);
            setTimeout(PathOfValue.displayRemainingTime,500);
            setTimeout(PathOfGlory.displayRemainingTime,500);

            Harem.clearHaremToolVariables = callItOnce(Harem.clearHaremToolVariables); // Avoid wired loop, if user reach home page, ensure temp var from harem are cleared
            Harem.clearHaremToolVariables();
            break;
        case getHHScriptVars("pagesIDHarem"):
            Harem.moduleHarem();
            Harem.moduleHaremExportGirlsData();
            Harem.moduleHaremCountMax();
            Harem.moduleHaremNextUpgradableGirl();
            Harem.haremOpenFirstXUpgradable();
            break;
        case getHHScriptVars("pagesIDGirlPage"):
            HaremGirl.moduleHaremGirl = callItOnce(HaremGirl.moduleHaremGirl);
            HaremGirl.moduleHaremGirl();
            break;
        case getHHScriptVars("pagesIDPachinko"):
            Pachinko.modulePachinko();
            break;
        case getHHScriptVars("pagesIDEditTeam"):
            TeamModule.moduleChangeTeam();
            break;
        case getHHScriptVars("pagesIDContests"):
            break;
        case getHHScriptVars("pagesIDPoV"):
            if (StorageHelper_getStoredValue("HHAuto_Setting_PoVMaskRewards") === "true")
            {
                PathOfValue.maskReward();
            }
            PathOfValue.getRemainingTime = callItOnce(PathOfValue.getRemainingTime);
            PathOfValue.getRemainingTime();
            if (StorageHelper_getStoredValue("HHAuto_Setting_showRewardsRecap") === "true")
            {
                RewardHelper.displayRewardsPovPogDiv();
            }
            break;
        case getHHScriptVars("pagesIDPoG"):
            if (StorageHelper_getStoredValue("HHAuto_Setting_PoGMaskRewards") === "true")
            {
                PathOfGlory.maskReward();
            }
            PathOfGlory.getRemainingTime = callItOnce(PathOfGlory.getRemainingTime);
            PathOfGlory.getRemainingTime();
            if (StorageHelper_getStoredValue("HHAuto_Setting_showRewardsRecap") === "true")
            {
                RewardHelper.displayRewardsPovPogDiv();
            }
            break;
        case getHHScriptVars("pagesIDSeasonalEvent"):
            if (StorageHelper_getStoredValue("HHAuto_Setting_SeasonalEventMaskRewards") === "true")
            {
                SeasonalEvent.maskReward();
            }
            SeasonalEvent.getRemainingTime = callItOnce(SeasonalEvent.getRemainingTime);
            SeasonalEvent.getRemainingTime();
            if (StorageHelper_getStoredValue("HHAuto_Setting_showRewardsRecap") === "true")
            {
                SeasonalEvent.displayRewardsSeasonalDiv();
                SeasonalEvent.displayGirlsMileStones();
            }
            break;
        case getHHScriptVars("pagesIDChampionsPage"):
            Champion.moduleSimChampions();
            break;
        case getHHScriptVars("pagesIDClubChampion"):
            Champion.moduleSimChampions();
            break;
        case getHHScriptVars("pagesIDQuest"):
            const haremItem = StorageHelper_getStoredValue("HHAuto_Temp_haremGirlActions");
            const haremGirlMode = StorageHelper_getStoredValue("HHAuto_Temp_haremGirlMode");
            if(haremGirlMode && haremItem === HaremGirl.AFFECTION_TYPE) {
                HaremGirl.payGirlQuest = callItOnce(HaremGirl.payGirlQuest);
                HaremGirl.payGirlQuest();
            }
            break;
        case getHHScriptVars("pagesIDClub"):
            Club.run();
            // if (!checkTimer('nextClubChampionTime') && getNextClubChampionTimer() == -1) {
            //     updateClubChampionTimer();
            // }
            break;
    }


    if(isNaN(StorageHelper_getStoredValue("HHAuto_Temp_autoLoopTimeMili")))
    {
        LogUtils_logHHAuto("AutoLoopTimeMili is not a number.");
        setDefaults(true);
    }
    else if (StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") === "true")
    {
        setTimeout(autoLoop, Number(StorageHelper_getStoredValue("HHAuto_Temp_autoLoopTimeMili")));
    }
    else
    {
        LogUtils_logHHAuto("autoLoop Disabled");
    }

}
;// CONCATENATED MODULE: ./src/Service/TooltipService.js


function manageToolTipsDisplay(important=false)
{

    if(StorageHelper_getStoredValue("HHAuto_Setting_showTooltips") === "true")
    {
        enableToolTipsDisplay(important);
    }
    else
    {
        disableToolTipsDisplay(important);
    }
}

function enableToolTipsDisplay(important=false)
{
    const importantAddendum = important?'; !important':'';
    GM_addStyle('.tooltipHH:hover span.tooltipHHtext { border:1px solid #ffa23e; border-radius:5px; padding:5px; display:block; z-index: 100; position: absolute; width: 150px; color:black; text-align:center; background:white;  opacity:0.9; transform: translateY(-100%)'+importantAddendum+'}');
}

function disableToolTipsDisplay(important=false)
{
    const importantAddendum = important?'; !important':'';
    GM_addStyle('.tooltipHH:hover span.tooltipHHtext { display: none'+importantAddendum+'}');
}
;// CONCATENATED MODULE: ./src/Service/StartService.js









var started=false;
var debugMenuID;

function setDefaults(force = false)
{
    for (let i of Object.keys(HHStoredVars_HHStoredVars))
    {
        if (HHStoredVars_HHStoredVars[i].storage !== undefined )
        {
            let storageItem = getStorageItem(HHStoredVars_HHStoredVars[i].storage);
            let isInvalid = false;
            //console.log(storageItem[i], storageItem[i] !== undefined);
            if (HHStoredVars_HHStoredVars[i].isValid !== undefined && storageItem[i] !== undefined)
            {
                isInvalid = !HHStoredVars_HHStoredVars[i].isValid.test(storageItem[i]);
                if (isInvalid)
                {
                    LogUtils_logHHAuto("HHStoredVar "+i+" is invalid, reseting.");
                    LogUtils_logHHAuto("HHStoredVar "+i+" current value : "+storageItem[i]);
                }
            }
            if (HHStoredVars_HHStoredVars[i].default !== undefined )
            {
                if (storageItem[i] === undefined || force || isInvalid)
                {
                    setHHStoredVarToDefault(i);
                }
            }
            else
            {
                if (force ||isInvalid)
                {
                    storageItem.removeItem(i);
                }
            }
        }
        else
        {
            LogUtils_logHHAuto("HHStoredVar "+i+" has no storage defined.");
        }
    }
}

function hardened_start()
{
    debugMenuID = GM_registerMenuCommand(getTextForUI("saveDebug","elementText"), saveHHDebugLog);
    //GM_unregisterMenuCommand(debugMenuID);
    if (!started)
    {
        started=true;
        start();
    }

}

function start() {

    if (unsafeWindow.Hero===undefined)
    {
        LogUtils_logHHAuto('???no Hero???');
        $('.hh_logo').click();
        setTimeout(hardened_start,5000);
        return;
    }
    Club.checkClubStatus();
    MonthlyCards.updateInputPattern();
    replaceCheatClick();
    migrateHHVars();

    $('.redirect.gay').hide();
    $('.redirect.comix').hide();

    $('#starter_offer').hide();
    $('#starter_offer_background').hide();

    if (StorageHelper_getStoredValue("HHAuto_Temp_Timers"))
    {
        Timers=JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_Timers"));
    }
    // clearEventData("onlyCheckEventsHHScript");
    setDefaults();

    if (StorageHelper_getStoredValue("HHAuto_Setting_mousePause") === "true") {
        bindMouseEvents();
    }

    $('#contains_all').prepend(getMenu());

    GM_addStyle(''
                +'#sMenuButton {'
                +'   position: absolute;'
                +'   top: 45px;'
                +'   right: 15px;'
                +'   z-index:5000;'
                +'}'
                +'@media only screen and (max-width: 1025px) {'
                +'#sMenuButton {'
                +'   width: 40px;'
                +'   height: 40px;'
                +'   top: 75px;'
                +'   right: 10px;'
                +'}}'
               );
    $("#contains_all nav").prepend('<div class="square_blue_btn" id="sMenuButton" ><img src="https://i.postimg.cc/bv7n83z3/script-Icon2.png"></div>');
    document.getElementById("sMenuButton").addEventListener("click", function()
                                                            {
        if (document.getElementById("sMenu").style.display === "none")
        {
            setMenuValues();
            document.getElementById("sMenu").style.display = "flex";
            $('#contains_all')[0].style.zIndex = 9;
        }
        else
        {
            getMenuValues();
            document.getElementById("sMenu").style.display = "none"
            $('#contains_all')[0].style.zIndex = "";
        }
    });

    addEventsOnMenuItems();

    document.getElementById("showTooltips").addEventListener("change",function()
                                                             {
        //console.log(this.checked);
        if (this.checked)
        {
            enableToolTipsDisplay(true);
        }
        else
        {
            disableToolTipsDisplay(true);
        }
    });

    const div = createPInfo();

    if(
        getPage()==getHHScriptVars("pagesIDMissions")
    || getPage()==getHHScriptVars("pagesIDContests")
    || getPage()==getHHScriptVars("pagesIDPowerplacemain")
    || getPage()==getHHScriptVars("pagesIDDailyGoals")
    )
    {
        Contest.styles();
        PlaceOfPower.styles();
        DailyGoals.styles();
        Missions.styles();
    }

    Booster.collectBoostersFromAjaxResponses();

    document.getElementById('contains_all').appendChild(div.firstChild);
    maskInactiveMenus();

    // Add auto troll options
    var trollOptions = document.getElementById("autoTrollSelector");

    const lastTrollIdAvailable = Troll.getLastTrollIdAvailable();
    for (var i=0;i<=lastTrollIdAvailable;i++)
    {
        var option = document.createElement("option");
        option.value=i;
        option.text = Trollz[i];
        if(option.text !== 'EMPTY' && Trollz[i]) {
            // Supports for PH and missing trols or parallel advantures (id world "missing")
            trollOptions.add(option);
        }
    };

    var optionFWG = document.createElement("option");
    optionFWG.value = 98;
    optionFWG.text = getTextForUI("firstTrollWithGirls","elementText");
    trollOptions.add(optionFWG);

    var optionLWG = document.createElement("option");
    optionLWG.value = 99;
    optionLWG.text = getTextForUI("lastTrollWithGirls","elementText");
    trollOptions.add(optionLWG);

    // Add league options
    var leaguesOptions = document.getElementById("autoLeaguesSelector");

    for (var j in StorageHelper_Leagues)
    {
        var optionL = document.createElement("option");
        optionL.value=Number(j)+1;
        optionL.text = StorageHelper_Leagues[j];
        leaguesOptions.add(optionL);
    };

    setMenuValues();
    getMenuValues();
    manageToolTipsDisplay();

    document.getElementById("git").addEventListener("click", function(){ window.open("https://github.com/Roukys/HHauto/wiki"); });
    document.getElementById("ReportBugs").addEventListener("click", function(){ window.open("https://github.com/Roukys/HHauto/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc"); });
    document.getElementById("loadConfig").addEventListener("click", function(){
        let LoadDialog='<p>After you select the file the settings will be automatically updated.</p><p> If nothing happened, then the selected file contains errors.</p><p id="LoadConfError"style="color:#f53939;"></p><p><label><input type="file" id="myfile" accept=".json" name="myfile"> </label></p>';
        fillHHPopUp("loadConfig",getTextForUI("loadConfig","elementText"), LoadDialog);
        document.getElementById('myfile').addEventListener('change', myfileLoad_onChange);

    });
    document.getElementById("saveConfig").addEventListener("click", saveHHVarsSettingsAsJSON);
    document.getElementById("saveDefaults").addEventListener("click", saveHHStoredVarsDefaults);
    document.getElementById("DebugMenu").addEventListener("click", function(){
        let debugDialog =   '<div style="padding:10px; display:flex;flex-direction:column">'
        +    '<p>HHAuto : v'+GM_info.script.version+'</p>'
        +    '<p>'+getTextForUI("DebugFileText","elementText")+'</p>'
        +    '<div style="display:flex;flex-direction:row">'
        +     '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("saveDebug","tooltip")+'</span><label class="myButton" id="saveDebug">'+getTextForUI("saveDebug","elementText")+'</label></div>'
        +    '</div>'
        +    '<p>'+getTextForUI("DebugResetTimerText","elementText")+'</p>'
        +    '<div style="display:flex;flex-direction:row">'
        +     '<div style="padding-right:30px"class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("timerResetButton","tooltip")+'</span><label class="myButton" id="timerResetButton">'+getTextForUI("timerResetButton","elementText")+'</label></div>'
        +     '<div style="padding-right:10px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("timerResetSelector","tooltip")+'</span><select id="timerResetSelector"></select></div>'
        +     '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("timerLeftTime","tooltip")+'</span><span id="timerLeftTime">'+getTextForUI("timerResetNoTimer","elementText")+'</span></div>'
        +    '</div>'
        +    '<p>'+getTextForUI("DebugOptionsText","elementText")+'</p>'
        +    '<div style="display:flex;flex-direction:row">'
        +     '<div style="padding-right:30px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("DeleteTempVars","tooltip")+'</span><label class="myButton" id="DeleteTempVars">'+getTextForUI("DeleteTempVars","elementText")+'</label></div>'
        +     '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("ResetAllVars","tooltip")+'</span><label class="myButton" id="ResetAllVars">'+getTextForUI("ResetAllVars","elementText")+'</label></div>'
        +    '</div>'
        +  '</div>'
        fillHHPopUp("DebugMenu",getTextForUI("DebugMenu","elementText"), debugDialog);
        document.getElementById("DeleteTempVars").addEventListener("click", function(){
            debugDeleteTempVars();
            location.reload();
        });
        document.getElementById("ResetAllVars").addEventListener("click", function(){
            debugDeleteAllVars();
            location.reload();
        });
        document.getElementById("saveDebug").addEventListener("click", saveHHDebugLog);

        document.getElementById("timerResetButton").addEventListener("click", function(){
            let timerSelector = document.getElementById("timerResetSelector");
            if (timerSelector.options[timerSelector.selectedIndex].text !== getTextForUI("timerResetNoTimer","elementText") && timerSelector.options[timerSelector.selectedIndex].text !== getTextForUI("timerResetSelector","elementText"))
            {
                document.getElementById("sMenu").style.display = "none";
                maskHHPopUp();
                setTimer(timerSelector.options[timerSelector.selectedIndex].text,0);
                timerSelector.selectedIndex = 0;
            }
        });
        $(document).on('change',"#timerResetSelector", function() {
            let timerSelector = document.getElementById("timerResetSelector");
            if (timerSelector.options[timerSelector.selectedIndex].text !== getTextForUI("timerResetNoTimer","elementText")  && timerSelector.options[timerSelector.selectedIndex].text !== getTextForUI("timerResetSelector","elementText"))
            {
                document.getElementById("timerLeftTime").innerText = getTimeLeft(timerSelector.options[timerSelector.selectedIndex].text);
            }
            else
            {
                document.getElementById("timerLeftTime").innerText = getTextForUI("timerResetNoTimer","elementText");
            }
        });
        // Add Timer reset options //changed
        let timerOptions = document.getElementById("timerResetSelector");
        var countTimers=0;
        let optionElement = document.createElement("option");
        optionElement.value = countTimers;
        optionElement.text = getTextForUI("timerResetSelector","elementText");
        countTimers++;
        timerOptions.add(optionElement);

        for (let i2 in Timers) {
            let optionElement = document.createElement("option");
            optionElement.value = countTimers;
            countTimers++;
            optionElement.text = i2;
            timerOptions.add(optionElement);
        };

        if(countTimers === 1)
        {
            let optionElement = document.createElement("option");
            optionElement.value = countTimers;
            optionElement.text = getTextForUI("timerResetNoTimer","elementText");
            timerOptions.add(optionElement);
        }

    });

    document.querySelectorAll("div#sMenu input[pattern]").forEach(currentInput =>
                                                                  {
        currentInput.addEventListener('input', () => {
            currentInput.style.backgroundColor = "";
            currentInput.checkValidity();
        });

        currentInput.addEventListener('invalid', () => {
            currentInput.style.backgroundColor = "red";
            //document.getElementById("master").checked = false;
            //setStoredValue("HHAuto_Setting_master", "false");
        });
        currentInput.checkValidity();
    });



    StorageHelper_setStoredValue("HHAuto_Temp_autoLoop", "true");
    if (typeof StorageHelper_getStoredValue("HHAuto_Temp_freshStart") == "undefined" || isNaN(Number(StorageHelper_getStoredValue("HHAuto_Temp_autoLoopTimeMili")))) {
        setDefaults(true);
    }

    if (getBurst())
    {
        Market.doShopping();
        if ( StorageHelper_getStoredValue("HHAuto_Setting_autoStatsSwitch") ==="true" )
        {
            doStatUpgrades();
        }
    }

    if (hh_nutaku)
    {
        function Alive()
        {
            window.top.postMessage({ImAlive:true},'*');
            if (StorageHelper_getStoredValue("HHAuto_Temp_autoLoop") =="true")
            {
                setTimeout(Alive,2000);
            }
        }
        Alive();
    }
    if (Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_LastPageCalled")) && JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_LastPageCalled")).page.indexOf(".html") > 0 )
    {
        //console.log("testingHome : setting to : "+getPage());
        StorageHelper_setStoredValue("HHAuto_Temp_LastPageCalled", JSON.stringify({page:getPage(), dateTime:new Date().getTime()}));
    }
    if (Utils_isJSON(StorageHelper_getStoredValue("HHAuto_Temp_LastPageCalled")) && JSON.parse(StorageHelper_getStoredValue("HHAuto_Temp_LastPageCalled")).page === getHHScriptVars("pagesIDHome"))
    {
        //console.log("testingHome : delete");
        deleteStoredValue("HHAuto_Temp_LastPageCalled");
    }
    getPage(true);
    setTimeout(autoLoop,1000);
    GM_registerMenuCommand(getTextForUI("translate","elementText"),manageTranslationPopUp);

};

;// CONCATENATED MODULE: ./src/Service/index.js







;// CONCATENATED MODULE: ./src/index.js


setTimeout(hardened_start,5000);

$("document").ready(function()
                    {
    hardened_start();

});
})();

/******/ })()
;