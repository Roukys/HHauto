// ==UserScript==
// @name         HaremHeroes Automatic++
// @namespace    https://github.com/Roukys/HHauto
// @version      7.6.0
// @description  Open the menu in HaremHeroes(topright) to toggle AutoControlls. Supports AutoSalary, AutoContest, AutoMission, AutoQuest, AutoTrollBattle, AutoArenaBattle and AutoPachinko(Free), AutoLeagues, AutoChampions and AutoStatUpgrades. Messages are printed in local console.
// @author       JD and Dorten(a bit), Roukys, cossname, YotoTheOne, CLSchwab, deuxge, react31, PrimusVox, OldRon1977, tsokh, UncleBob800
// @match        http*://*.haremheroes.com/*
// @match        http*://*.hentaiheroes.com/*
// @match        http*://*.gayharem.com/*
// @match        http*://*.comixharem.com/*
// @match        http*://*.hornyheroes.com/*
// @match        http*://*.pornstarharem.com/*
// @match        http*://*.transpornstarharem.com/*
// @match        http*://*.gaypornstarharem.com/*
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
GM_addStyle('#pInfo {padding-left:3px; z-index:1;white-space: pre;position: absolute;right: 5%; left:51%; height:auto; top:11%; overflow: hidden; border: 1px solid #ffa23e; background-color: rgba(0,0,0,.5); border-radius: 5px; font-size:9pt; user-select: none; -webkit-user-select: none; -moz-user-select: none;}'
            + '#pInfo ul {margin:0; padding:0; columns:2; list-style-type: none;}'
            + '#pInfo ul li {margin:0}');
GM_addStyle('#pInfo.left {right: 480px; left:220px; top:12%;');
GM_addStyle('span.HHMenuItemName {padding-bottom:2px; line-height:120%;}');
GM_addStyle('div.optionsRow {display:flex; flex-direction:row; justify-content: space-between}'); //; padding:3px;
GM_addStyle('span.optionsBoxTitle {padding-left:5px}'); //; padding-bottom:2px
GM_addStyle('div.optionsColumn {display:flex; flex-direction:column}');
GM_addStyle('div.optionsBoxWithTitle {display:flex; flex-direction:column}');
GM_addStyle('div.optionsBoxWithTitleInline {display:flex; flex-direction:row; border:1px solid #ffa23e; border-radius:5px; margin:1px}');
GM_addStyle('div.optionsBoxWithTitleInline .optionsBox {border: none}');
GM_addStyle('img.iconImg {max-width:15px; height:15px}');
GM_addStyle('#sMenu {top: 5px;right: 52px;padding: 4px;opacity: 1;border-radius: 4px;border: 1px solid #ffa23e;background-color: #1e261e;font-size:x-small; position:absolute; text-align:left; flex-direction:column; justify-content:space-between; z-index:10000; overflow:auto; max-height:calc(100% - 5px); scrollbar-width: thin;max-width: calc(100% - 52px);}');
GM_addStyle('#sMenu::-webkit-scrollbar {width: 6px;height: 6px;background: #000;}');
GM_addStyle('#sMenu::-webkit-scrollbar-thumb { background: #ffa23e; -webkit-border-radius: 1ex; -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);}');
GM_addStyle('#sMenu::-webkit-scrollbar-corner {background: #000;}');
GM_addStyle('#sMenu .HHMenuItemName {font-size:8px;}');
GM_addStyle('div.optionsBoxTitle {padding:3px 15px 0px 5px; height:12px; display:flex; flex-direction:row; justify-content:center; align-items:center;}'); //; padding:2px; padding-bottom:0px;
GM_addStyle('div.rowOptionsBox {margin:1px; padding:3px; font-size:smaller; display:flex; flex-direction:row; align-items:flex-start; border: 1px solid #ffa23e; border-radius: 5px}');
GM_addStyle('div.optionsBox {margin:1px 3px 1px; padding:3px; font-size:smaller; display:flex; flex-direction:column; border:1px solid #ffa23e; border-radius:5px}');
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
// GM_addStyle('.HHGirlMilestone.green { border: solid 1px green }');
GM_addStyle('.HHGirlMilestone .nc-claimed-reward-check { width:20px; position:absolute; }'); 
GM_addStyle('#HHSeasonRewards { position: absolute; right: 1.25rem; bottom: 14rem; padding: 0.5rem; background: rgba(0,0,0,.5); border-radius: 10px; z-index: 1;}'); 
GM_addStyle('#HHSeasonalRewards { position: absolute; left: 1.25rem; bottom: 1rem; padding: 0.5rem; background: rgba(0,0,0,.5); border-radius: 10px; z-index: 1;}'); 
GM_addStyle('#HHPoaRewards { position: absolute; left: 15rem; bottom: 0; padding: 0.5rem; background: rgba(0,0,0,.5); border-radius: 10px; z-index: 1;}'); 
GM_addStyle('#HHDpRewards { position: absolute; left: 0; top: 12rem; padding: 0.5rem; background: rgba(0,0,0,.5); border-radius: 10px; z-index: 1;}'); 
// copy CSS from HH OCD, to make it work on other game than HH
GM_addStyle('#pov_tab_container .potions-paths-first-row .potions-paths-title-panel { transform: scale(0.5);  position: relative; top: -37px; }');
GM_addStyle('img.eventCompleted { width: 10px; margin-left:2px }');
// Remove blur on pose preview
GM_addStyle('#popups #girl_preview_popup .preview-locked_icn { display: none; }');
GM_addStyle('#popups #girl_preview_popup #poses-tab_container .pose-preview_wrapper.locked img { filter: none !important; }');
//END CSS Region


/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/model/BDSMPlayer.ts
//@ts-check
class BDSMPlayer {
    constructor(hp, atk, adv_def, critchance, bonuses, tier4, tier5, name = '') {
        this.tier4 = { dmg: 0, def: 0 };
        this.tier5 = { id: 0, value: 0 };
        this.name = '';
        this.hp = hp;
        this.atk = atk;
        this.adv_def = adv_def;
        this.critchance = critchance;
        this.bonuses = bonuses;
        this.tier4 = tier4;
        this.tier5 = tier5;
        this.name = name;
    }
}

;// CONCATENATED MODULE: ./src/model/Champion.ts
class ChampionModel {
    constructor(index, impression, inFilter) {
        this.timer = -1;
        this.started = false;
        this.inFilter = false;
        this.hasEventGirls = false;
        this.index = index;
        this.impression = impression;
        this.inFilter = inFilter;
        this.started = impression != "0";
        if (this.started) {
            this.timer = 0;
        }
    }
}

;// CONCATENATED MODULE: ./src/Helper/UrlHelper.ts
function queryStringGetParam(inQueryString, inParam) {
    let urlParams = new URLSearchParams(inQueryString);
    return urlParams.get(inParam);
}
function url_add_param(url, param, value) {
    if (url.indexOf('?') === -1)
        url += '?';
    else
        url += '&';
    return url + param + "=" + value;
}

;// CONCATENATED MODULE: ./src/Utils/Utils.ts


function callItOnce(fn) {
    var called = false;
    return function () {
        if (!called) {
            called = true;
            return fn();
        }
        return;
    };
}
function getCallerFunction() {
    var stackTrace = (new Error()).stack || ''; // Only tested in latest FF and Chrome
    var callerName = stackTrace.replace(/^Error\s+/, ''); // Sanitize Chrome
    callerName = callerName.split("\n")[1]; // 1st item is this, 2nd item is caller
    callerName = callerName.replace(/^\s+at Object./, ''); // Sanitize Chrome
    callerName = callerName.replace(/ \(.+\)$/, ''); // Sanitize Chrome
    callerName = callerName.replace(/\@.+/, ''); // Sanitize Firefox
    return callerName;
}
function getCallerCallerFunction() {
    let stackTrace = (new Error()).stack || ''; // Only tested in latest FF and Chrome
    let match;
    try {
        match = stackTrace.match(/at Object\.(\w+) \((\S+)\)/);
        match[1]; // throw error if match is null
    }
    catch (_a) {
        // Firefox
        match = stackTrace.match(/\n(\w+)@(\S+)/);
    }
    let [callerName, callerPlace] = [match[1], match[2]];
    try {
        console.log('Function ' + match[3] + ' at ' + match[4]);
    }
    catch (err) { }
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
function isFocused() {
    //let isFoc = false;
    const docFoc = document.hasFocus();
    //const iFrameFoc = $('iframe').length===0?false:$('iframe')[0].contentWindow.document.hasFocus();
    //isFoc = docFoc || iFrameFoc;
    return docFoc;
}
function isJSON(str) {
    if (str === undefined || str === null || /^\s*$/.test(str))
        return false;
    str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
    str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
    str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
    return (/^[\],:{}\s]*$/).test(str);
}
function replaceCheatClick() {
    unsafeWindow.is_cheat_click = function (e) {
        return false;
    };
}
function getCurrentSorting() {
    return localStorage.sort_by;
}
/* Used ?
export function waitForKeyElements (selectorTxt,maxMilliWaitTime)
{
    var targetNodes;
    var timer= new Date().getTime() + maxMilliWaitTime;
    targetNodes = jQuery(selectorTxt);

    while ( targetNodes.length === 0 && Math.ceil(timer)-Math.ceil(new Date().getTime()) > 0)
    {
        targetNodes = jQuery(selectorTxt);
    }
    return targetNodes.length !== 0);
}*/
function myfileLoad_onChange(event) {
    $('#LoadConfError')[0].innerText = ' ';
    if (event.target.files.length == 0) {
        return;
    }
    var reader = new FileReader();
    reader.onload = myfileLoad_onReaderLoad;
    reader.readAsText(event.target.files[0]);
}
function myfileLoad_onReaderLoad(event) {
    var text = event.target.result;
    var storageType;
    var storageItem;
    var variableName;
    //Json validation
    if (isJSON(text)) {
        LogUtils_logHHAuto('the json is ok');
        var jsonNewSettings = JSON.parse(event.target.result);
        //Assign new values to Storage();
        for (const [key, value] of Object.entries(jsonNewSettings)) {
            storageType = key.split(".")[0];
            variableName = key.split(".")[1];
            storageItem = getStorageItem(storageType);
            LogUtils_logHHAuto(key + ':' + value);
            storageItem[variableName] = value;
        }
        location.reload();
    }
    else {
        $('#LoadConfError')[0].innerText = 'Selected file broken!';
        LogUtils_logHHAuto('the json is Not ok');
    }
}

;// CONCATENATED MODULE: ./src/Utils/HHPopup.ts

class HHPopup {
    static fillContent(content) {
        const elem = document.getElementById("HHAutoPopupGlobalContent");
        if (elem != null)
            elem.innerHTML = content;
    }
    static fillTitle(title) {
        const elem = document.getElementById("HHAutoPopupGlobalTitle");
        if (elem != null)
            elem.innerHTML = title;
    }
    static fillClasses(inClass) {
        const elem = document.getElementById("HHAutoPopupGlobalPopup");
        if (elem != null)
            elem.className = inClass;
    }
}
function fillHHPopUp(inClass, inTitle, inContent) {
    if (document.getElementById("HHAutoPopupGlobal") === null) {
        createHHPopUp();
    }
    else {
        displayHHPopUp();
    }
    HHPopup.fillContent(inContent);
    HHPopup.fillTitle(inTitle);
    HHPopup.fillClasses(inClass);
}
function createHHPopUp() {
    GM_addStyle('#HHAutoPopupGlobal.HHAutoOverlay { overflow: auto;  z-index:1000;   position: fixed;   top: 0;   bottom: 0;   left: 0;   right: 0;   background: rgba(0, 0, 0, 0.7);   transition: opacity 500ms;     display: flex;   align-items: center; }  '
        + '#HHAutoPopupGlobalPopup {   margin: auto;   padding: 20px;   background: #fff;   border-radius: 5px;   position: relative;   transition: all 5s ease-in-out; }  '
        + '#HHAutoPopupGlobalTitle {   margin-top: 0;   color: #333;   font-size: larger; } '
        + '#HHAutoPopupGlobalClose {   position: absolute;   top: 0;   right: 30px;   transition: all 200ms;   font-size: 50px;   font-weight: bold;   text-decoration: none;   color: #333; } '
        + '#HHAutoPopupGlobalClose:hover {   color: #06D85F; } '
        + '#HHAutoPopupGlobalContent .HHAutoScriptMenu .rowLine { display:flex;flex-direction:row;align-items:center;column-gap:20px;justify-content: center; } '
        + '#HHAutoPopupGlobalContent {   max-height: 30%;   overflow: auto;   color: #333;   font-size: x-small; }'
        + '#HHAutoPopupGlobalContent .HHAutoScriptMenu .switch {  width: 55px; height: 32px; }'
        + '#HHAutoPopupGlobalContent .HHAutoScriptMenu input:checked + .slider:before { -webkit-transform: translateX(20px); -ms-transform: translateX(20px); transform: translateX(20px); } '
        + '#HHAutoPopupGlobalContent .HHAutoScriptMenu .slider.round::before {  width: 22px; height: 22px; bottom: 5px; }'
        + '.PachinkoPlay {margin-top: 20px !important; }');
    let popUp = '<div id="HHAutoPopupGlobal" class="HHAutoOverlay">'
        + ' <div id="HHAutoPopupGlobalPopup">'
        + '   <h2 id="HHAutoPopupGlobalTitle">Here i am</h2>'
        + '   <a id="HHAutoPopupGlobalClose">&times;</a>'
        + '   <div id="HHAutoPopupGlobalContent" class="content">'
        + '      Thank to pop me out of that button, but now im done so you can close this window.'
        + '   </div>'
        + ' </div>'
        + '</div>';
    $('body').prepend(popUp);
    $("#HHAutoPopupGlobalClose").on("click", function () {
        maskHHPopUp();
    });
    document.addEventListener('keyup', evt => {
        if (evt.key === 'Escape') {
            maskHHPopUp();
        }
    });
}
function isDisplayedHHPopUp() {
    const popupGlobal = document.getElementById("HHAutoPopupGlobal");
    const popupGlobalPopup = document.getElementById("HHAutoPopupGlobalPopup");
    if (popupGlobal === null || popupGlobalPopup === null) {
        return false;
    }
    if (popupGlobal.style.display === "none") {
        return false;
    }
    return popupGlobalPopup.className;
}
function displayHHPopUp() {
    const popupGlobal = document.getElementById("HHAutoPopupGlobal");
    if (popupGlobal === null) {
        return false;
    }
    popupGlobal.style.display = "";
    popupGlobal.style.opacity = '1';
}
function maskHHPopUp() {
    const popupGlobal = document.getElementById("HHAutoPopupGlobal");
    if (popupGlobal !== null) {
        popupGlobal.style.display = "none";
        popupGlobal.style.opacity = '0';
    }
}
function checkAndClosePopup(inBurst) {
    const popUp = $('#popup_message[style*="display: block"]');
    if ((inBurst || isFocused()) && popUp.length > 0) {
        $('close', popUp).click();
    }
}

;// CONCATENATED MODULE: ./src/Utils/index.ts





;// CONCATENATED MODULE: ./src/i18n/empty.ts
const HHAuto_ToolTips = { en: {}, fr: {}, es: {}, de: {}, it: {} };
const w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
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
    };
}
else {
    hhTimerLocale = 'en';
    timerDefinitions = { 'en': { days: "d", hours: "h", minutes: "m", seconds: "s" } };
}

;// CONCATENATED MODULE: ./src/i18n/en.ts

HHAuto_ToolTips.en['saveDebug'] = { version: "5.6.24", elementText: "Save Debug", tooltip: "Allow to produce a debug log file." };
HHAuto_ToolTips.en['gitHub'] = { version: "5.6.24", elementText: "GitHub", tooltip: "Link to GitHub project." };
HHAuto_ToolTips.en['ReportBugs'] = { version: "5.7.1", elementText: "Report Bugs", tooltip: "Link to GitHub issue list to open and follow bugs." };
HHAuto_ToolTips.en['noOtherScripts'] = { version: "6.15.8", elementText: "Please do not use other scripts, it can create incompatibility (HH++ supported)", tooltip: "" };
HHAuto_ToolTips.en['saveConfig'] = { version: "5.6.24", elementText: "Save Config", tooltip: "Allow to save configuration." };
HHAuto_ToolTips.en['loadConfig'] = { version: "5.6.24", elementText: "Load Config", tooltip: "Allow to load configuration." };
HHAuto_ToolTips.en['globalTitle'] = { version: "5.6.24", elementText: "Global options" };
HHAuto_ToolTips.en['master'] = { version: "5.6.24", elementText: "Master switch", tooltip: "On/off switch for full script" };
HHAuto_ToolTips.en['waitforContest'] = { version: "6.10.0", elementText: "Wait for contest", tooltip: "If enabled, most of activities using ressources are pending when not contest is active, input in second represent the safe time to wait before and after real contest time" };
HHAuto_ToolTips.en['settPerTab'] = { version: "5.6.24", elementText: "Settings per tab", tooltip: "Allow the settings to be set for this tab only" };
HHAuto_ToolTips.en['paranoia'] = { version: "5.6.24", elementText: "Paranoia mode", tooltip: "Allow to simulate sleep, and human user (To be documented further)" };
HHAuto_ToolTips.en['paranoiaSpendsBefore'] = { version: "5.6.24", elementText: "Spend points before", tooltip: "On will spend points for options (quest, Troll, Leagues and Season)<br>only if they are enabled<br>and spend points that would be above max limits<br>Ex : you have power for troll at 17, but going 4h45 in paranoia<br>it would mean having 17+10 points (rounded to higher int), thus being above the 20 max<br> it will then spend 8 points to fall back to 19 end of Paranoia, preventing to loose points." };
HHAuto_ToolTips.en['spendKobans0'] = { version: "5.6.24", elementText: "Spend Kobans", tooltip: "<p style='color:red'>/!\\ Allow Kobans spending /!\\</p>Security switches for usage of kobans, needs to be active for Kobans spending functions" };
//HHAuto_ToolTips.en['spendKobans1'] = { version: "5.6.24", elementText: "Are you sure?", tooltip: "Second security switches for usage of kobans <br>Have to be activated after the first one.<br> All 3 needs to be active for Kobans spending functions"};
//HHAuto_ToolTips.en['spendKobans2'] = { version: "5.6.24", elementText: "You\'ve been warned", tooltip: "Third security switches for usage of kobans <br>Have to be activated after the second one.<br> All 3 needs to be active for Kobans spending functions"};
HHAuto_ToolTips.en['kobanBank'] = { version: "5.6.24", elementText: "Kobans Bank", tooltip: "(Integer)<br>Minimum Kobans kept when using Kobans spending functions" };
HHAuto_ToolTips.en['displayTitle'] = { version: "5.6.24", elementText: "Display options" };
HHAuto_ToolTips.en['autoActivitiesTitle'] = { version: "5.6.24", elementText: "Activities" };
HHAuto_ToolTips.en['buyCombat'] = { version: "5.6.24", elementText: "Buy comb. for events", tooltip: "<p style='color:red'>/!\\ Kobans spending function /!\\<br>(" + HHAuto_ToolTips.en['spendKobans0'].elementText + " must be ON)</p>If enabled : <br>Buying combat point during last X hours of event (if not going under Koban bank value), this will bypass threshold if event girl shards available." };
HHAuto_ToolTips.en['buyCombTimer'] = { version: "5.6.24", elementText: "Hours to buy Combats", tooltip: "(Integer)<br>X last hours of event" };
HHAuto_ToolTips.en['autoBuyBoosters'] = { version: "5.6.25", elementText: "Myth. & Leg. Boosters", tooltip: "<p style='color:red'>/!\\ Kobans spending function /!\\<br>(" + HHAuto_ToolTips.en['spendKobans0'].elementText + " must be ON)</p>Allow to buy booster in the market (if not going under Koban bank value)" };
HHAuto_ToolTips.en['autoBuyBoostersFilter'] = { version: "5.37.0", elementText: "Filter", tooltip: "(values separated by ;)<br>Set list of codes of booster to buy, order is respected.<br>Code:Name<br>B1:Ginseng<br>B2:Jujubes<br>B3:Chlorella<br>B4:Cordyceps<br>MB1:Sandalwood perfume<br>MB2:All Mastery's Emblem<br>MB3:Headband of determination<br>MB4:Luxurious Watch<br>MB5:Combative Cinnamon<br>MB6:Alban's travel memories<br>MB7:Angels' semen scent<br>MB8:Leagues mastery emblem<br>MB9:Seasons mastery emblem<br>MB10:Gem Detector<br>MB11:Banger<br>MB12:Shiny Aura" };
HHAuto_ToolTips.en['autoSeasonPassReds'] = { version: "5.6.24", elementText: "Pass 3 reds", tooltip: "<p style='color:red'>/!\\ Kobans spending function /!\\<br>(" + HHAuto_ToolTips.en['spendKobans0'].elementText + " must be ON)</p>Use kobans to renew Season opponents if 3 reds" };
HHAuto_ToolTips.en['showCalculatePower'] = { version: "6.8.0", elementText: "PowerCalc", tooltip: "Display battle simulation indicator for Leagues, battle, Seasons " };
HHAuto_ToolTips.en['showAdsBack'] = { version: "5.34.15", elementText: "Move ads to the back", tooltip: "Move the ads section to the background." };
//HHAuto_ToolTips.en['calculatePowerLimits'] = { version: "5.6.24", elementText: "Own limits", tooltip: "(red;orange)<br>Define your own red and orange limits for Opponents<br> -6000;0 do mean<br> <-6000 is red, between -6000 and 0 is orange and >=0 is green"};
HHAuto_ToolTips.en['showInfo'] = { version: "5.6.24", elementText: "Show info", tooltip: "if enabled : show info on script values and next runs" };
HHAuto_ToolTips.en['showInfoLeft'] = { version: "5.23.0", elementText: "Show info Left", tooltip: "Show info on left side vs on right side" };
HHAuto_ToolTips.en['autoSalary'] = { version: "5.6.24", elementText: "Salary", tooltip: "(Integer)<br>if enabled :<br>Collect salaries every X secs" };
//HHAuto_ToolTips.en['autoSalaryMinTimer'] = { version: "5.6.24", elementText: "Minimum wait", tooltip: "(Integer)<br>X secs to next Salary collection"};
HHAuto_ToolTips.en['autoSalaryMinSalary'] = { version: "5.6.24", elementText: "Min. salary", tooltip: "(Integer)<br>Minium salary to start collection" };
HHAuto_ToolTips.en['autoSalaryMaxTimer'] = { version: "5.6.24", elementText: "Max. collect time", tooltip: "(Integer)<br>X secs to collect Salary, before stopping." };
HHAuto_ToolTips.en['autoSalaryResetFilters'] = { version: "7.5.0", elementText: "Reset filters", tooltip: "Reset harem filters before collect salary." };
HHAuto_ToolTips.en['autoMission'] = { version: "5.6.24", elementText: "Mission", tooltip: "if enabled : Automatically do missions" };
HHAuto_ToolTips.en['autoMissionCollect'] = { version: "5.6.24", elementText: "Collect", tooltip: "if enabled : Automatically collect missions after start of new competition." };
HHAuto_ToolTips.en['compactMissions'] = { version: "5.24.0", elementText: "Compact", tooltip: "Add styles to compact missions display" };
HHAuto_ToolTips.en['autoTrollTitle'] = { version: "5.6.24", elementText: "Battle Troll" };
HHAuto_ToolTips.en['autoTrollBattle'] = { version: "5.6.24", elementText: "Enable", tooltip: "if enabled : Automatically battle troll selected" };
HHAuto_ToolTips.en['autoTrollSelector'] = { version: "5.6.24", elementText: "Troll selector", tooltip: "Select troll to be fought." };
HHAuto_ToolTips.en['autoTrollThreshold'] = { version: "5.6.24", elementText: "Threshold", tooltip: "(Integer 0 to 19)<br>Minimum troll fight to keep" };
HHAuto_ToolTips.en['autoTrollRunThreshold'] = { version: "6.8.0", elementText: "Run Threshold", tooltip: "Minimum troll fights before script start spending<br> 0 to spend as soon as energy above threshold" };
HHAuto_ToolTips.en['eventTrollOrder'] = { version: "5.6.38", elementText: "Event Troll Order", tooltip: "(values separated by ;)<br>Allow to select in which order event troll are automatically battled<br>1 : Dark Lord<br>2 : Ninja Spy<br>3 : Gruntt<br>4 : Edwarda<br>5 : Donatien<br>6 : Sylvanus<br>7 : Bremen<br>8 : Finalmecia<br>9 : Fredy Sih Roko<br>10 : Karole<br>11 : Jackson's Crew<br>12 : Pandora Witch<br>13 : Nike<br>14 : Sake<br>15 : WereBunny Police" };
HHAuto_ToolTips.en['autoBuyTrollNumber'] = { version: "6.1.0", elementText: "Troll auto buy", tooltip: "Number of combat points to be bought during an event" };
HHAuto_ToolTips.en['autoBuyMythicTrollNumber'] = { version: "6.1.0", elementText: "Mythic auto buy", tooltip: "Number of combat points to be bought during a mythics event" };
HHAuto_ToolTips.en['firstTrollWithGirls'] = { version: "5.32.0", elementText: "First troll with girl" };
HHAuto_ToolTips.en['lastTrollWithGirls'] = { version: "5.32.0", elementText: "Last troll with girl" };
HHAuto_ToolTips.en['autoChampsForceStartEventGirl'] = { version: "5.6.98", elementText: "Event force", tooltip: "if enabled, will fight for event girl champion even if not started. Champions will need to be activated and champions to be in the filter." };
HHAuto_ToolTips.en['plusEvent'] = { version: "5.6.24", elementText: "+Event", tooltip: "If enabled : ignore selected troll during event to battle event" };
HHAuto_ToolTips.en['plusEventMythic'] = { version: "5.6.24", elementText: "+Mythic Event", tooltip: "Enable grabbing girls for mythic event, should only play them when shards are available, Mythic girl troll will be priorized over Event Troll." };
HHAuto_ToolTips.en['plusEventMythicSandalWood'] = { version: "7.2.0", elementText: "Equip Sandalwood", tooltip: "Will equip sandalwood before mythic fight if enough in inventory<br>Do not equip if less than 10 shards to win<br>Will not buy any." };
HHAuto_ToolTips.en['eventCompleted'] = { version: "7.1.3", elementText: "Event completed", tooltip: "Event completed" };
//HHAuto_ToolTips.en['eventMythicPrio'] = { version: "5.6.24", elementText: "Priorize over Event Troll Order", tooltip: "Mythic event girl priorized over event troll order if shards available"};
//HHAuto_ToolTips.en['autoTrollMythicByPassThreshold'] = { version: "5.6.24", elementText: "Mythic bypass Threshold", tooltip: "Allow mythic to bypass Troll threshold"};
HHAuto_ToolTips.en['autoSeasonTitle'] = { version: "5.6.24", elementText: "Season" };
HHAuto_ToolTips.en['autoSeason'] = { version: "5.6.24", elementText: "Enable", tooltip: "if enabled : Automatically fight in Seasons (Opponent chosen following PowerCalculation)" };
HHAuto_ToolTips.en['autoSeasonCollect'] = { version: "5.6.24", elementText: "Collect", tooltip: "if enabled : Automatically collect Seasons ( if multiple to collect, will collect one per kiss usage)" };
HHAuto_ToolTips.en['autoSeasonCollectAll'] = { version: "5.7.0", elementText: "Collect all", tooltip: "if enabled : Automatically collect all items before end of season (configured with Collect all timer)" };
HHAuto_ToolTips.en['autoSeasonThreshold'] = { version: "5.6.24", elementText: "Threshold", tooltip: "Minimum kiss to keep" };
HHAuto_ToolTips.en['autoSeasonRunThreshold'] = { version: "6.8.0", elementText: "Run Threshold", tooltip: "Minimum kiss fights before script start spending<br> 0 to spend as soon as energy above threshold" };
HHAuto_ToolTips.en['autoSeasonBoostedOnly'] = { version: "6.5.0", elementText: "Boosted only", tooltip: "If enabled : Need booster to fight in season" };
HHAuto_ToolTips.en['autoQuest'] = { version: "5.6.74", elementText: "Main Quest", tooltip: "if enabled : Automatically do main quest" };
HHAuto_ToolTips.en['autoSideQuest'] = { version: "5.6.83", elementText: "Side Quests", tooltip: "if enabled : Automatically do next available side quest (Enabled main quest has higher priority than side quests)" };
HHAuto_ToolTips.en['autoQuestThreshold'] = { version: "5.6.24", elementText: "Threshold", tooltip: "(Integer between 0 and 99)<br>Minimum quest energy to keep" };
HHAuto_ToolTips.en['autoContest'] = { version: "5.6.24", elementText: "Claim Contest", tooltip: "if enabled : Collect finished contest rewards" };
HHAuto_ToolTips.en['compactEndedContests'] = { version: "5.24.0", elementText: "Compact", tooltip: "Add styles to compact ended contests display" };
HHAuto_ToolTips.en['autoFreePachinko'] = { version: "5.6.24", elementText: "Pachinko", tooltip: "if enabled : Automatically collect free Pachinkos" };
HHAuto_ToolTips.en['autoMythicPachinko'] = { version: "5.6.24", elementText: "Mythic Pachinko" };
HHAuto_ToolTips.en['autoEquipmentPachinko'] = { version: "5.34.9", elementText: "Equipment Pachinko" };
HHAuto_ToolTips.en['autoLeaguesTitle'] = { version: "5.6.24", elementText: "Leagues" };
HHAuto_ToolTips.en['autoLeagues'] = { version: "5.6.24", elementText: "Enable", tooltip: "if enabled : Automatically battle Leagues" };
HHAuto_ToolTips.en['leagueListDisplayPowerCalc'] = { version: "5.34.18", elementText: "Display PowerCalc", tooltip: "Display powerCalc in league list (stil in developpment)" };
HHAuto_ToolTips.en['autoLeaguesCollect'] = { version: "5.6.24", elementText: "Collect", tooltip: "If enabled : Automatically collect Leagues" };
HHAuto_ToolTips.en['autoLeaguesRunThreshold'] = { version: "6.8.0", elementText: "Run Threshold", tooltip: "Minimum league fights before script start spending<br> 0 to spend as soon as energy above threshold" };
HHAuto_ToolTips.en['autoLeaguesForceOneFight'] = { version: "6.12.4", elementText: "One fight", tooltip: "Only use one fight at a time in league" };
HHAuto_ToolTips.en['autoLeaguesBoostedOnly'] = { version: "6.5.0", elementText: "Boosted only", tooltip: "If enabled : Need booster to fight in league" };
HHAuto_ToolTips.en['boostMissing'] = { version: "6.5.0", elementText: "No booster Equipped" };
HHAuto_ToolTips.en['waitRunThreshold'] = { version: "6.8.0", elementText: "Wait run threshold" };
HHAuto_ToolTips.en['autoLeaguesSelector'] = { version: "5.6.24", elementText: "Target League", tooltip: "League to target, to try to demote, stay or go in higher league depending" };
HHAuto_ToolTips.en['autoLeaguesSortMode'] = { version: "7.6.0", elementText: "Sorting", tooltip: "Select opponent sorting method. <br>Displayed order, <br>power value <br>or internal sim powercalc" };
HHAuto_ToolTips.en['autoLeaguesdisplayedOrder'] = { version: "7.6.0", elementText: "Displayed order" };
HHAuto_ToolTips.en['autoLeaguesPower'] = { version: "7.6.0", elementText: "Use power" };
HHAuto_ToolTips.en['autoLeaguesPowerCalc'] = { version: "6.14.0", elementText: "Use PowerCalc", tooltip: "if enabled : will choose opponent using PowerCalc" };
HHAuto_ToolTips.en['autoLeaguesAllowWinCurrent'] = { version: "5.6.24", elementText: "Allow win", tooltip: "If check will allow to win targeted league and then demote next league to fall back to targeted league." };
HHAuto_ToolTips.en['autoLeaguesThreshold'] = { version: "5.6.24", elementText: "Threshold", tooltip: "(Integer between 0 and 14)<br>Minimum league fights to keep" };
HHAuto_ToolTips.en['autoLeaguesSecurityThreshold'] = { version: "5.18.0", elementText: "Security Threshold", tooltip: "(Integer)<br>Points limit to prevent the script performing any league fight to keep user in targetted league and avoid promotion. Change only if you accept the risk" };
HHAuto_ToolTips.en['powerPlacesTitle'] = { version: "6.8.0", elementText: "Places of Power", tooltip: "" };
HHAuto_ToolTips.en['autoPowerPlaces'] = { version: "6.8.0", elementText: "Enable", tooltip: "if enabled : Automatically Do powerPlaces" };
HHAuto_ToolTips.en['autoPowerPlacesIndexFilter'] = { version: "5.6.24", elementText: "Index Filter", tooltip: "(values separated by ;)<br>Allow to set filter and order on the PowerPlaces to do (order respected only when multiple powerPlace expires at the same time)" }; //<table style='font-size: 8px;line-height: 1;'><tr><td>Reward</td>  <td>HC</td>    <td>CH</td>   <td>KH</td></tr><tr><td>Champ tickets & M¥</td>    <td>4</td>   <td>5</td>   <td>6</td></tr><tr><td>Kobans & K¥</td>  <td>7</td>   <td>8</td>   <td>9</td></tr><tr><td>Epic Book & K¥</td> <td>10</td>  <td>11</td> <td>12</td></tr><tr><td>Epic Orbs & K¥</td>  <td>13</td>  <td>14</td>  <td>15</td></tr><tr><td>Leg. Booster & K¥</td>   <td>16</td>  <td>17</td>  <td>18</td></tr><tr><td>Champions tickets & K¥</td>  <td>19</td>  <td>20</td>  <td>21</td></tr><tr><td>Epic Gift & K¥</td>  <td>22</td>  <td>23</td>  <td>24</td></tr></table>"};
HHAuto_ToolTips.en['autoPowerPlacesAll'] = { version: "5.6.24", elementText: "Do All", tooltip: "If enabled : ignore filter and do all powerplaces (will update Filter with current ids)" };
HHAuto_ToolTips.en['autoPowerPlacesPrecision'] = { version: "5.6.103", elementText: "PoP precision", tooltip: "If enabled : use more advanced algorithm to try and find best team instead of using auto. This is more useful when you have a smaller roster and may be very slow with large rosters." };
HHAuto_ToolTips.en['autoPowerPlacesInverted'] = { version: "5.10.0", elementText: "PoP inverted", tooltip: "If enabled : fill the POP starting from the last one." };
HHAuto_ToolTips.en['autoPowerPlacesWaitMax'] = { version: "5.20.0", elementText: "PoP wait max", tooltip: "If enabled : POP will wait all POP are ended before starting new one." };
HHAuto_ToolTips.en['compactPowerPlace'] = { version: "5.24.0", elementText: "Compact", tooltip: "Add styles to compact power places display" };
HHAuto_ToolTips.en['autoChampsTitle'] = { version: "5.6.24", elementText: "Champions" };
HHAuto_ToolTips.en['autoChamps'] = { version: "5.6.24", elementText: "Normal", tooltip: "if enabled : Automatically do champions (if they are started and in filter only)" };
HHAuto_ToolTips.en['autoChampsForceStart'] = { version: "5.6.76", elementText: "Force start", tooltip: "if enabled : will fight filtered champions even if not started." };
HHAuto_ToolTips.en['autoChampAlignTimer'] = { version: "6.15.0", elementText: "Align timers", tooltip: "if enabled : will align champion and club champion timers." };
HHAuto_ToolTips.en['autoChampsUseEne'] = { version: "5.39.0", elementText: "Buy tickets", tooltip: "If enabled : use Energy to buy tickets respecting the energy quest threshold" };
HHAuto_ToolTips.en['autoChampsFilter'] = { version: "5.6.24", elementText: "Filter", tooltip: "(values separated by ; 1 to 6)<br>Allow to set filter on champions to be fought" };
HHAuto_ToolTips.en['autoChampsTeamLoop'] = { version: "5.21.0", elementText: "Auto team Loops", tooltip: "Number of loop to search for champion team for every button click" };
HHAuto_ToolTips.en['autoChampsGirlThreshold'] = { version: "6.4.0", elementText: "Girl min power", tooltip: "Minimum power for the girl to be considered (power without pose boost, in white)" };
HHAuto_ToolTips.en['autoChampsTeamKeepSecondLine'] = { version: "5.27.0", elementText: "Keep second line girls", tooltip: "If enabled: keep second line matching girls when first line is not full" };
HHAuto_ToolTips.en['ChampTeamButton'] = { version: "5.8.0", elementText: "Indicate team order", tooltip: "Add number for the prefered girl order to fight champion" };
HHAuto_ToolTips.en['updateChampTeamButton'] = { version: "5.21.0", elementText: "Find best team", tooltip: "" };
HHAuto_ToolTips.en['ChampGirlOrder'] = { version: "5.8.0", elementText: "", tooltip: "Girl to be used at position" };
HHAuto_ToolTips.en['ChampGirlLowOrder'] = { version: "5.11.0", elementText: "", tooltip: "For Worst team, girl to be used at position" };
HHAuto_ToolTips.en['goToClubChampions'] = { version: "5.25.0", elementText: "Go To Club Champion" };
HHAuto_ToolTips.en['autoStats'] = { version: "5.6.24", elementText: "Money to keep", tooltip: "(Integer)<br>Automatically buy stats in market with money above the setted amount" };
HHAuto_ToolTips.en['autoStatsSwitch'] = { version: "5.6.24", elementText: "Stats", tooltip: "Allow to on/off autoStats" };
HHAuto_ToolTips.en['autoExpW'] = { version: "5.6.24", elementText: "Books", tooltip: "if enabled : allow to buy Exp in market<br>Only buy if money bank is above the value<br>Only buy if total Exp owned is below value" };
HHAuto_ToolTips.en['autoExp'] = { version: "5.6.24", elementText: "Money to keep", tooltip: "(Integer)<br>Minimum money to keep." };
HHAuto_ToolTips.en['maxExp'] = { version: "5.6.24", elementText: "Max Exp.", tooltip: "(Integer)<br>Maximum Exp to buy" };
HHAuto_ToolTips.en['autoAffW'] = { version: "5.6.24", elementText: "Gifts", tooltip: "if enabled : allow to buy Aff in market<br>Only buy if money bank is above the value<br>Only buy if total Aff owned is below value" };
HHAuto_ToolTips.en['autoAff'] = { version: "5.6.24", elementText: "Money to keep", tooltip: "(Integer)<br>Minimum money to keep." };
HHAuto_ToolTips.en['maxAff'] = { version: "5.6.24", elementText: "Max Aff.", tooltip: "(Integer)<br>Maximum Aff to buy" };
HHAuto_ToolTips.en['maxBooster'] = { version: "5.38.0", elementText: "Max Booster.", tooltip: "(Integer)<br>Maximum booster to buy (limit for each booster type)" };
HHAuto_ToolTips.en['OpponentListBuilding'] = { version: "5.6.24", elementText: "Opponent list is building", tooltip: "" };
HHAuto_ToolTips.en['OpponentParsed'] = { version: "5.6.24", elementText: "opponents parsed", tooltip: "" };
HHAuto_ToolTips.en['DebugMenu'] = { version: "5.6.24", elementText: "Debug Menu", tooltip: "Options for debug" };
HHAuto_ToolTips.en['DebugOptionsText'] = { version: "5.6.24", elementText: "Buttons below allow to modify script storage, be careful using it.", tooltip: "" };
HHAuto_ToolTips.en['DeleteTempVars'] = { version: "5.6.24", elementText: "Delete temp storage", tooltip: "Delete all temporary storage for the script." };
HHAuto_ToolTips.en['ResetAllVars'] = { version: "5.6.24", elementText: "Reset defaults", tooltip: "Reset all setting to defaults." };
HHAuto_ToolTips.en['DebugFileText'] = { version: "5.6.24", elementText: "Click on button bellow to produce a debug log file", tooltip: "" };
HHAuto_ToolTips.en['OptionCancel'] = { version: "5.6.24", elementText: "Cancel", tooltip: "" };
HHAuto_ToolTips.en['OptionStop'] = { version: "5.6.24", elementText: "Stop", tooltip: "" };
HHAuto_ToolTips.en['SeasonMaskRewards'] = { version: "5.6.24", elementText: "Mask claimed", tooltip: "Allow to mask all claimed rewards on Season screen" };
HHAuto_ToolTips.en['showClubButtonInPoa'] = { version: "6.15.8", elementText: "Go to in Events", tooltip: "if enabled, add a 'go to' button in Event related objectives." };
HHAuto_ToolTips.en['autoClubChamp'] = { version: "5.6.24", elementText: "Club", tooltip: "if enabled, automatically fight club champion if champion has already been fought once." };
HHAuto_ToolTips.en['autoClubForceStart'] = { version: "5.6.24", elementText: "Force start", tooltip: "if enabled, will fight club champion even if not started." };
HHAuto_ToolTips.en['autoTrollMythicByPassParanoia'] = { version: "5.6.24", elementText: "Mythic bypass Paranoia", tooltip: "Allow mythic to bypass paranoia.<br>if next wave is during rest, it will force it to wake up for wave.<br>If still fight or can buy fights it will continue." };
HHAuto_ToolTips.en['buyMythicCombat'] = { version: "5.6.24", elementText: "Buy comb. for mythic event", tooltip: "<p style='color:red'>/!\\ Kobans spending function /!\\<br>(" + HHAuto_ToolTips.en['spendKobans0'].elementText + " must be ON)</p>If enabled : <br>Buying combat point during last X hours of mythic event (if not going under Koban bank value), this will bypass threshold if mythic girl shards available." };
HHAuto_ToolTips.en['buyMythicCombTimer'] = { version: "5.6.24", elementText: "Hours to buy Mythic Combats", tooltip: "(Integer)<br>X last hours of mythic event" };
HHAuto_ToolTips.en['DebugResetTimerText'] = { version: "5.6.24", elementText: "Selector below allow you to reset ongoing timers", tooltip: "" };
HHAuto_ToolTips.en['timerResetSelector'] = { version: "5.6.24", elementText: "Select Timer", tooltip: "Select the timer you want to reset" };
HHAuto_ToolTips.en['timerResetButton'] = { version: "5.6.24", elementText: "Reset", tooltip: "Set the timer to 0." };
HHAuto_ToolTips.en['timerLeftTime'] = { version: "5.6.24", elementText: "", tooltip: "Time remaining" };
HHAuto_ToolTips.en['timerResetNoTimer'] = { version: "5.6.24", elementText: "No selected timer", tooltip: "" };
HHAuto_ToolTips.en['menuSell'] = { version: "5.6.24", elementText: "Sell", tooltip: "Allow to sell items." };
HHAuto_ToolTips.en['menuSellText'] = { version: "5.6.126", elementText: "This will sell the number of items asked starting in display order (first all non legendary then legendary)<br> It will sell all Common, Rare, Epic stuff and keep : <br> - 1 set of rainbow legendary (choosen on highest player class stat)<br> - 1 set of legendary mono player class (choosen on highest stats)<br> - 1 set of legendary harmony (choosen on highest stats)<br> - 1 set of legendary endurance (choosen on highest stats)<br> - All mythics<br>You can lock/Unlock batch by clicking on the corresponding cell/row/column (notlocked/total), red means all locked, orange some locked.", tooltip: "" };
HHAuto_ToolTips.en['menuSellNumber'] = { version: "5.6.24", elementText: "", tooltip: "Enter the number of items you want to sell : " };
HHAuto_ToolTips.en['menuSellButton'] = { version: "5.6.24", elementText: "Sell", tooltip: "Launch selling funtion." };
HHAuto_ToolTips.en['menuSellCurrentCount'] = { version: "5.6.24", elementText: "Number of sellable items you currently have : ", tooltip: "" };
HHAuto_ToolTips.en['menuSellMaskLocked'] = { version: "5.6.24", elementText: "Mask locked", tooltip: "Allow to mask locked items." };
HHAuto_ToolTips.en['menuSoldText'] = { version: "5.6.24", elementText: "Number of items sold : ", tooltip: "" };
HHAuto_ToolTips.en['menuSoldMessageReachNB'] = { version: "5.6.24", elementText: "Wanted sold items reached.", tooltip: "" };
HHAuto_ToolTips.en['menuSoldMessageNoMore'] = { version: "5.6.24", elementText: " No more sellable items.", tooltip: "" };
HHAuto_ToolTips.en['menuSoldMessageErrorLoaded'] = { version: "6.16.0", elementText: " An error occured: more items were loaded, need restart.", tooltip: "" };
HHAuto_ToolTips.en['menuDistribution'] = { version: "5.6.24", elementText: "Items to be used : ", tooltip: "" };
HHAuto_ToolTips.en['Total'] = { version: "5.6.24", elementText: "Total : ", tooltip: "" };
HHAuto_ToolTips.en['menuAllowedExceed'] = { version: "5.6.42", elementText: "Allow to exceed by : ", tooltip: "" };
HHAuto_ToolTips.en['menuDistributed'] = { version: "5.6.24", elementText: "Items used : ", tooltip: "" };
HHAuto_ToolTips.en['autoClubChampMax'] = { version: "5.6.24", elementText: "Max tickets per run", tooltip: "Maximum number of tickets to use on the club champion at each run." };
HHAuto_ToolTips.en['menuSellLock'] = { version: "5.6.24", elementText: "Lock/ Unlock", tooltip: "Switch the lock to prevent selected item to be sold." };
HHAuto_ToolTips.en['Rarity'] = { version: "5.6.24", elementText: "Rarity", tooltip: "" };
HHAuto_ToolTips.en['RarityCommon'] = { version: "5.6.24", elementText: "Common", tooltip: "" };
HHAuto_ToolTips.en['RarityRare'] = { version: "5.6.24", elementText: "Rare", tooltip: "" };
HHAuto_ToolTips.en['RarityEpic'] = { version: "5.6.24", elementText: "Epic", tooltip: "" };
HHAuto_ToolTips.en['RarityLegendary'] = { version: "5.6.24", elementText: "Legendary", tooltip: "" };
HHAuto_ToolTips.en['RarityMythic'] = { version: "5.6.126", elementText: "Mythic", tooltip: "" };
HHAuto_ToolTips.en['equipementHead'] = { version: "5.6.24", elementText: "Head", tooltip: "" };
HHAuto_ToolTips.en['equipementBody'] = { version: "5.6.24", elementText: "Body", tooltip: "" };
HHAuto_ToolTips.en['equipementLegs'] = { version: "5.6.24", elementText: "Legs", tooltip: "" };
HHAuto_ToolTips.en['equipementFlag'] = { version: "5.6.24", elementText: "Flag", tooltip: "" };
HHAuto_ToolTips.en['equipementPet'] = { version: "5.6.24", elementText: "Pet", tooltip: "" };
HHAuto_ToolTips.en['equipementWeapon'] = { version: "5.6.24", elementText: "Weapon", tooltip: "" };
HHAuto_ToolTips.en['equipementCaracs'] = { version: "5.6.24", elementText: "Caracs", tooltip: "" };
HHAuto_ToolTips.en['equipementType'] = { version: "5.6.24", elementText: "Type", tooltip: "" };
HHAuto_ToolTips.en['autoMissionKFirst'] = { version: "5.6.24", elementText: "Kobans first", tooltip: "Start by missions rewarded with Kobans." };
HHAuto_ToolTips.en['affection'] = { version: "6.11.0", elementText: "Affection" };
HHAuto_ToolTips.en['experience'] = { version: "6.11.0", elementText: "Experience" };
HHAuto_ToolTips.en['upradable'] = { version: "6.11.0", elementText: "Upradable" };
HHAuto_ToolTips.en['giveexperience'] = { version: "6.2.0", elementText: "Give experience", tooltip: "Automatically give max current range Exp to selected girl." };
HHAuto_ToolTips.en['giveaffection'] = { version: "6.2.0", elementText: "Give Affection", tooltip: "Automatically give max current range affection to selected girl." };
HHAuto_ToolTips.en['giveAllaffection'] = { version: "6.2.0", elementText: "Give All Affection", tooltip: "Automatically give all affection to selected girl." };
HHAuto_ToolTips.en['menuExp'] = { version: "6.2.0", elementText: "Give Exp", tooltip: "" };
HHAuto_ToolTips.en['menuExpInfo'] = { version: "5.30.0", elementText: "Max out button will be used until requested level is reached" };
HHAuto_ToolTips.en['menuExpButton'] = { version: "5.30.0", elementText: "Go !", tooltip: "Launch giving exp." };
HHAuto_ToolTips.en['menuExpLevel'] = { version: "5.30.00", elementText: "Enter target Exp level :", tooltip: "Target Exp level for girl" };
HHAuto_ToolTips.en['giveLastGirl'] = { version: "5.30.0", elementText: "Last girl, going back to harem list..." };
HHAuto_ToolTips.en['giveMaxingOut'] = { version: "5.30.0", elementText: "Maxing out" };
HHAuto_ToolTips.en['giveMaxedOut'] = { version: "5.30.0", elementText: "already maxed out, skipping" };
HHAuto_ToolTips.en['goToGirlPage'] = { version: "6.2.0", elementText: "Girl page", tooltip: "Open the girl management page" };
HHAuto_ToolTips.en['girlListMenu'] = { version: "6.2.0", elementText: "Girl list menu", tooltip: "Open girl list menu" };
HHAuto_ToolTips.en['girlMenu'] = { version: "6.2.0", elementText: "Girl menu", tooltip: "Open girl menu" };
HHAuto_ToolTips.en['povpogTitle'] = { version: "5.6.133", elementText: "Path of Valor/Glory" };
HHAuto_ToolTips.en['povTitle'] = { version: "5.20.3", elementText: "Path of Valor" };
HHAuto_ToolTips.en['pogTitle'] = { version: "5.20.3", elementText: "Path of Glory" };
HHAuto_ToolTips.en['poaTitle'] = { version: "6.15.8", elementText: "Path of Attraction" };
HHAuto_ToolTips.en['seasonalEventTitle'] = { version: "5.6.133", elementText: "Seasonal Event" };
HHAuto_ToolTips.en['PoAMaskRewards'] = { version: "6.15.8", elementText: "Mask claimed", tooltip: "Masked claimed rewards for Path of Attraction." };
HHAuto_ToolTips.en['PoVMaskRewards'] = { version: "6.15.8", elementText: "Mask claimed", tooltip: "Masked claimed rewards for Path of Valor." };
HHAuto_ToolTips.en['PoGMaskRewards'] = { version: "6.15.8", elementText: "Mask claimed", tooltip: "Masked claimed rewards for Path of Glory." };
HHAuto_ToolTips.en['rewardsToCollectTitle'] = { version: "5.37.0", elementText: "Energies, XP, currencies available to collect" };
HHAuto_ToolTips.en['showRewardsRecap'] = { version: "5.37.0", elementText: "Show rewards recap", tooltip: "Show cumulated information for energies, XP and currencies" };
HHAuto_ToolTips.en['hideOwnedGirls'] = { version: "7.4.1", elementText: "Hide Owned girls", tooltip: "Hide owned girls in event page, when event have more than 30 girls to win and players have already more than 10 girls" };
HHAuto_ToolTips.en['SeasonalEventMaskRewards'] = { version: "6.8.4", elementText: "Mask claimed", tooltip: "Masked claimed rewards for Seasonal Event." };
HHAuto_ToolTips.en['bossBangEvent'] = { version: "5.20.3", elementText: "Enable", tooltip: "Perform boss bang fight script will start with the team configured after." };
HHAuto_ToolTips.en['bossBangEventTitle'] = { version: "5.20.3", elementText: "Boss Bang" };
HHAuto_ToolTips.en['bossBangMinTeam'] = { version: "5.6.137", elementText: "First Team", tooltip: "First team to start with<br>If 5 will start with last team and reach the first one." };
HHAuto_ToolTips.en['sultryMysteriesEventTitle'] = { version: "6.15.8", elementText: "Sultry Mysteries" };
HHAuto_ToolTips.en['eventTitle'] = { version: "6.15.8", elementText: "Events" };
HHAuto_ToolTips.en['doublePenetrationEventTitle'] = { version: "6.15.8", elementText: "DP" };
HHAuto_ToolTips.en['autodpEventCollect'] = { version: "6.8.4", elementText: "Collect", tooltip: "Collect double penetration event rewards" };
HHAuto_ToolTips.en['autodpEventCollectAll'] = { version: "7.1.0", elementText: "Collect All", tooltip: "if enabled : Automatically collect all items before end of double penetration event (configured with Collect all timer)" };
HHAuto_ToolTips.en['sultryMysteriesEventRefreshShop'] = { version: "5.21.6", elementText: "Refresh Shop", tooltip: "Open Sultry Mysteries shop tab to trigger shop update." };
HHAuto_ToolTips.en['sultryMysteriesEventRefreshShopNext'] = { version: "5.22.5", elementText: "Sultry Shop" };
HHAuto_ToolTips.en['collectEventChest'] = { version: "5.28.0", elementText: "Collect event chest", tooltip: "If enabled: collect event chest when active after getting all girls" };
HHAuto_ToolTips.en['dailyMissionGirlTitle'] = { version: "6.5.2", elementText: "Complete the Daily Missions of to get me!" };
HHAuto_ToolTips.en['showTooltips'] = { version: "5.6.24", elementText: "Show tooltips", tooltip: "Show tooltip on menu." };
HHAuto_ToolTips.en['showMarketTools'] = { version: "5.6.24", elementText: "Show market tools", tooltip: "Show Market tools." };
HHAuto_ToolTips.en['updateMarket'] = { version: "5.22.0", elementText: "Update market", tooltip: "Update player data from market screens (Equipement, books and gift owned as well as next refresh time)." };
HHAuto_ToolTips.en['useX10Fights'] = { version: "5.6.24", elementText: "Use x10", tooltip: "<p style='color:red'>/!\\ Kobans spending function /!\\<br>(" + HHAuto_ToolTips.en['spendKobans0'].elementText + " must be ON)</p>If enabled : <br>Use x10 button if 10 fights or more to do (if not going under Koban bank value).<br>x50 takes precedence on x10 if all conditions are filled." };
HHAuto_ToolTips.en['useX50Fights'] = { version: "5.6.24", elementText: "Use x50", tooltip: "<p style='color:red'>/!\\ Kobans spending function /!\\<br>(" + HHAuto_ToolTips.en['spendKobans0'].elementText + " must be ON)</p>If enabled : <br>Use x50 button if 50 fights or more to do (if not going under Koban bank value).<br>Takes precedence on x10 if all conditions are filled." };
HHAuto_ToolTips.en['useX10FightsAllowNormalEvent'] = { version: "5.6.24", elementText: "x10 for Event", tooltip: "If off:<br> X10 will only be used for mythic event<br>If enabled : <br>Allow x10 button for normal event if 10 fights or more to do (if not going under Koban bank value).<br>x50 takes precedence on x10 if all conditions are filled." };
HHAuto_ToolTips.en['useX50FightsAllowNormalEvent'] = { version: "5.6.24", elementText: "x50 for Event", tooltip: "If off:<br> X50 will only be used for mythic event<br>If enabled : <br>Use x50 button for normal event if 50 fights or more to do (if not going under Koban bank value).<br>Takes precedence on x10 if all conditions are filled." };
HHAuto_ToolTips.en['autoBuy'] = { version: "5.6.24", elementText: "Market" };
HHAuto_ToolTips.en['minShardsX50'] = { version: "5.6.24", elementText: "Min. shards x50", tooltip: "Only use x50 button if remaining shards of current girl is equal or above this limit." };
HHAuto_ToolTips.en['minShardsX10'] = { version: "5.6.24", elementText: "Min. shards x10", tooltip: "Only use x10 button if remaining shards of current girl is equal or above this limit." };
HHAuto_ToolTips.en['mythicGirlNext'] = { version: "5.6.24", elementText: "Mythic girl wave" };
HHAuto_ToolTips.en['RefreshOppoList'] = { version: "5.6.24", elementText: "Refresh Opponent list", tooltip: "Allow to force a refresh of opponent list." };
HHAuto_ToolTips.en['HideBeatenOppo'] = { version: "5.7.1", elementText: "Hide", tooltip: "Allow to hide beaten opponent from the list." };
HHAuto_ToolTips.en['display'] = { version: "5.7.1", elementText: "Display", tooltip: "" };
HHAuto_ToolTips.en['PachinkoSelectorNoButtons'] = { version: "5.6.24", elementText: "No Orbs available.", tooltip: "" };
HHAuto_ToolTips.en['PachinkoSelector'] = { version: "5.6.24", elementText: "", tooltip: "Pachinko Selector." };
HHAuto_ToolTips.en['PachinkoLeft'] = { version: "5.6.24", elementText: "", tooltip: "Currently available orbs." };
HHAuto_ToolTips.en['PachinkoXTimes'] = { version: "5.6.24", elementText: "Number to use : ", tooltip: "Set the number of orbs tu use o selected pachinko." };
HHAuto_ToolTips.en['Launch'] = { version: "5.6.56", elementText: "Launch", tooltip: "" };
HHAuto_ToolTips.en['PachinkoButton'] = { version: "5.6.24", elementText: "Use Pachinko", tooltip: "Allow to automatically use the selected Pachinko. (Only for Orbs games)" };
HHAuto_ToolTips.en['PachinkoOrbsLeft'] = { version: "5.6.24", elementText: " orbs remaining.", tooltip: "" };
HHAuto_ToolTips.en['PachinkoInvalidOrbsNb'] = { version: "5.6.24", elementText: 'Invalid orbs number' };
HHAuto_ToolTips.en['PachinkoNoGirls'] = { version: "5.6.24", elementText: 'No more any girls available.' };
HHAuto_ToolTips.en['PachinkoByPassNoGirls'] = { version: "5.6.24", elementText: 'Bypass no girls', tooltip: "Bypass the no girls in Pachinko warning." };
HHAuto_ToolTips.en['PachinkoStopFirstGirl'] = { version: "5.35.00", elementText: 'Stop first girl', tooltip: "Stop when a girl is won." };
HHAuto_ToolTips.en['PachinkoFillOrbs'] = { version: "5.6.134", elementText: 'Fill all orbs', tooltip: "Fill input with all available orbs." };
HHAuto_ToolTips.en['PachinkoOrbsSpent'] = { version: "7.3.5", elementText: 'Orbs spent:', tooltip: "" };
HHAuto_ToolTips.en['ChangeTeamButton'] = { version: "5.6.24", elementText: "Current Best", tooltip: "Get list of top 16 girls for your team." };
HHAuto_ToolTips.en['ChangeTeamButton2'] = { version: "5.6.24", elementText: "Possible Best", tooltip: "Get list of top 16 girls for your team if they are Max Lv & Aff" };
HHAuto_ToolTips.en['AssignTopTeam'] = { version: "5.6.24", elementText: "Assign first 7", tooltip: "Put the first 7 ones in the team." };
HHAuto_ToolTips.en['ExportGirlsData'] = { version: "5.6.24", elementText: "⤓", tooltip: "Export Girls data." };
HHAuto_ToolTips.en['autoFreeBundlesCollect'] = { version: "5.16.0", elementText: "Collect free bundles", tooltip: "Collect free bundles." };
HHAuto_ToolTips.en['mousePause'] = { version: "5.6.135", elementText: "Mouse Pause", tooltip: "Pause script activity for 5 seconds when mouse movement is detected. Helps stop script from interrupting manual actions. (in ms, 5000ms=5s)" };
HHAuto_ToolTips.en['saveDefaults'] = { version: "5.6.24", elementText: "Save defaults", tooltip: "Save your own defaults values for new tabs." };
HHAuto_ToolTips.en['autoGiveAff'] = { version: "5.6.24", elementText: "Auto Give", tooltip: "If enabled, will automatically give Aff to girls in order ( you can use OCD script to filter )." };
HHAuto_ToolTips.en['autoGiveExp'] = { version: "5.6.24", elementText: "Auto Give", tooltip: "If enabled, will automatically give Exp to girls in order ( you can use OCD script to filter )." };
HHAuto_ToolTips.en['autoPantheonTitle'] = { version: "5.6.24", elementText: "Pantheon", tooltip: "" };
HHAuto_ToolTips.en['autoLabyrinth'] = { version: "6.18.0", elementText: "Labyrinth", tooltip: "if enabled : Automatically do Labyrinth" };
HHAuto_ToolTips.en['autoPantheon'] = { version: "6.8.0", elementText: "Pantheon", tooltip: "if enabled : Automatically do Pantheon" };
HHAuto_ToolTips.en['autoPantheonThreshold'] = { version: "5.6.24", elementText: "Threshold", tooltip: "Minimum worship to keep<br>Max 10" };
HHAuto_ToolTips.en['autoPantheonRunThreshold'] = { version: "6.8.0", elementText: "Run Threshold", tooltip: "Minimum worship before script start spending<br> 0 to spend as soon as energy above threshold" };
HHAuto_ToolTips.en['autoPantheonBoostedOnly'] = { version: "6.7.0", elementText: "Boosted only", tooltip: "If enabled : Need booster to fight in Pantheon" };
HHAuto_ToolTips.en['buttonSaveOpponent'] = { version: "5.6.24", elementText: "Save opponent data", tooltip: "Save opponent data for fight simulation in market." };
HHAuto_ToolTips.en['SimResultMarketButton'] = { version: "5.6.24", elementText: "Sim. results", tooltip: "Simulate result with League saved opponent." };
HHAuto_ToolTips.en['simResultMarketPreviousScore'] = { version: "5.6.24", elementText: "Previous score :", tooltip: "" };
HHAuto_ToolTips.en['simResultMarketScore'] = { version: "5.6.24", elementText: "Score : ", tooltip: "" };
HHAuto_ToolTips.en['none'] = { version: "5.6.24", elementText: "None", tooltip: "" };
HHAuto_ToolTips.en['Name'] = { version: "5.6.24", elementText: "Name", tooltip: "" };
HHAuto_ToolTips.en['sortPowerCalc'] = { version: "5.6.24", elementText: "Sort by score", tooltip: "Sorting opponents by score." };
HHAuto_ToolTips.en['haremNextUpgradableGirl'] = { version: "5.6.24", elementText: "Go to next upgradable Girl.", tooltip: "" };
HHAuto_ToolTips.en['haremOpenFirstXUpgradable'] = { version: "5.6.24", elementText: "Open X upgradable girl quest.", tooltip: "" };
HHAuto_ToolTips.en['translate'] = { version: "5.6.25", elementText: "Translate", tooltip: "" };
HHAuto_ToolTips.en['saveTranslation'] = { version: "5.6.25", elementText: "Save translation" };
HHAuto_ToolTips.en['saveTranslationText'] = { version: "5.6.25", elementText: "Below you'll find all text that can be translated.<br>To contribute, modify directly in the cell the translation (if empty click on the blue part ;))<br><p style='margin-block-start:0px;margin-block-end:0px;color:gray'>Gray cells are translations needing update.</p><p style='margin-block-start:0px;margin-block-end:0px;color:blue'>Blue cell are missing translations</p><p style='margin-block-start:0px;margin-block-end:0px;color:red'>Please try to keep the text length to prevent UI issues.</p>At the bottom you'll find a button to generate a txt file with your modification.<br>Please upload it to : <a target='_blank' href='https://github.com/Roukys/HHauto/issues/426'>Github</a>", tooltip: "" };
HHAuto_ToolTips.en['menuCollectable'] = { version: "5.6.47", elementText: "Collectable preferences.", tooltip: "" };
HHAuto_ToolTips.en['menuCollectableText'] = { version: "5.6.47", elementText: "Please select the collectables you want to be automatically collected.", tooltip: "" };
HHAuto_ToolTips.en['menuDailyCollectableText'] = { version: "5.6.49", elementText: "Please select the collectables you want to be immediately collected.", tooltip: "" };
HHAuto_ToolTips.en['autoPoVCollect'] = { version: "6.15.8", elementText: "Collect", tooltip: "if enabled : Automatically collect Path of Valor." };
HHAuto_ToolTips.en['autoPoVCollectAll'] = { version: "6.15.8", elementText: "Collect All", tooltip: "if enabled : Automatically collect all items before end of Path of Valor (configured with Collect all timer)" };
HHAuto_ToolTips.en['autoSeasonalEventCollect'] = { version: "5.7.0", elementText: "Collect", tooltip: "if enabled : Automatically collect Seasonal Event." };
HHAuto_ToolTips.en['autoSeasonalEventCollectAll'] = { version: "5.7.0", elementText: "Collect all", tooltip: "if enabled : Automatically collect all items before end of seasonal event (configured with Collect all timer)" };
HHAuto_ToolTips.en['autoPoGCollect'] = { version: "6.15.8", elementText: "Collect", tooltip: "if enabled : Automatically collect Path of Glory." };
HHAuto_ToolTips.en['autoPoGCollectAll'] = { version: "6.15.8", elementText: "Collect All", tooltip: "if enabled : Automatically collect all items before end of Path of Glory (configured with Collect all timer)" };
HHAuto_ToolTips.en['autoPoACollect'] = { version: "6.16.0", elementText: "Collect", tooltip: "if enabled : Automatically collect Path of Attraction event." };
HHAuto_ToolTips.en['autoPoACollectAll'] = { version: "6.16.0", elementText: "Collect All", tooltip: "if enabled : Automatically collect all items before end of Path of Attraction event (configured with Collect all timer)" };
HHAuto_ToolTips.en['dailyGoalsTitle'] = { version: "5.24.0", elementText: "Daily Goals" };
HHAuto_ToolTips.en['autoDailyGoalsCollect'] = { version: "5.6.54", elementText: "Collect", tooltip: "Collect daily Goals if not collected 2 hours before end of HH day." };
HHAuto_ToolTips.en['compactDailyGoals'] = { version: "5.24.0", elementText: "Compact", tooltip: "Add styles to compact daily goals display" };
HHAuto_ToolTips.en['HaremSortMenuSortText'] = { version: "5.6.56", elementText: "Select the wanted harem sorting : ", tooltip: "" };
HHAuto_ToolTips.en['DateAcquired'] = { version: "5.6.56", elementText: "Date recruited", tooltip: "" };
HHAuto_ToolTips.en['Grade'] = { version: "5.6.56", elementText: "Grade", tooltip: "" };
HHAuto_ToolTips.en['Level'] = { version: "5.6.56", elementText: "Level", tooltip: "" };
HHAuto_ToolTips.en['Power'] = { version: "5.6.56", elementText: "Power", tooltip: "" };
HHAuto_ToolTips.en['upgrade_cost'] = { version: "5.6.56", elementText: "Upgrade cost", tooltip: "" };
HHAuto_ToolTips.en['HaremSortMenuSortBy'] = { version: "5.6.56", elementText: "Sort by ", tooltip: "" };
HHAuto_ToolTips.en['HaremSortMenuSortReverse'] = { version: "5.6.56", elementText: "Reverse", tooltip: "" };
HHAuto_ToolTips.en['haremGiveXP'] = { version: "6.2.0", elementText: "Fill current XP of filtered girls", tooltip: "Use max out button XP on current level for filtered girls" };
HHAuto_ToolTips.en['haremGiveGifts'] = { version: "6.2.0", elementText: "Fill current affection of filtered girls", tooltip: "Use max out button affection on current level for filtered girls" };
HHAuto_ToolTips.en['haremGiveMaxGifts'] = { version: "6.11.0", elementText: "Fill all affection of filtered girls", tooltip: "Give all affection for filtered girls, pay for necessary grades<br/>Not pay last grade" };
HHAuto_ToolTips.en['haremUpgradeMax'] = { version: "6.11.0", elementText: "Full upgrade of filtered girls", tooltip: "Perform all upgrades for filtered girls (including last one), give necessary affections" };
HHAuto_ToolTips.en['haremGirlGiveXP'] = { version: "5.30.0", elementText: "Give XP to girl", tooltip: "Open submenu to give xp to girl" };
HHAuto_ToolTips.en['haremGirlGiveGifts'] = { version: "5.30.0", elementText: "Give Gifts to girl", tooltip: "" };
HHAuto_ToolTips.en['haremGirlGiveMaxGifts'] = { version: "6.2.0", elementText: "Give max Gifts to girl", tooltip: "Use max out button to reach max grade, pay for necessary grades<br> Don't pay the last one" };
HHAuto_ToolTips.en['haremGirlUpgradeMax'] = { version: "6.12.0", elementText: "Full upgrade girl", tooltip: "Perform all upgrades for the girl (including last one), give necessary affections" };
HHAuto_ToolTips.en['collectAllTimer'] = { version: "5.7.0", elementText: "Collect all timer (in hour)", tooltip: "Hour(s) before end of events to collect all rewards (Low time create risk of not collecting), Need activation on each events (POV, POG, season)" };
HHAuto_ToolTips.en['collectAllButton'] = { version: "7.3.0", elementText: "Collect all", tooltip: "Automatically collect all items" };

;// CONCATENATED MODULE: ./src/i18n/fr.ts

HHAuto_ToolTips.fr['saveDebug'] = { version: "5.6.24", elementText: "Sauver log", tooltip: "Sauvegarder un fichier journal de débogage." };
HHAuto_ToolTips.fr['gitHub'] = { version: "5.6.24", elementText: "GitHub", tooltip: "Lien vers le projet GitHub." };
HHAuto_ToolTips.fr['saveConfig'] = { version: "5.6.24", elementText: "Sauver config", tooltip: "Permet de sauvegarder la configuration." };
HHAuto_ToolTips.fr['loadConfig'] = { version: "5.6.24", elementText: "Charger config", tooltip: "Permet de charger la configuration." };
HHAuto_ToolTips.fr['master'] = { version: "5.6.24", elementText: "Script on/off", tooltip: "Bouton marche/arrêt pour le script complet" };
HHAuto_ToolTips.fr['settPerTab'] = { version: "5.6.24", elementText: "Options par onglet", tooltip: "Active le paramétrage par onglet.<br>Si activé : permet d'ouvrir le jeu dans un autre onglet tout en laissant le script fonctionner sur le premier.<br>Les options du script ne seront pas sauvegardées à la fermeture du navigateur." };
HHAuto_ToolTips.fr['paranoia'] = { version: "5.6.24", elementText: "Mode Parano", tooltip: "Permet de simuler le sommeil et l'utilisateur humain (à documenter davantage)" };
HHAuto_ToolTips.fr['paranoiaSpendsBefore'] = { version: "5.6.24", elementText: "Utiliser points avant", tooltip: "Dépensera des points pour les options (quête, troll, ligues et saison)<br> uniquement si elles sont activées<br>et dépense des points qui seraient perdus pendant la nuit<br> Ex : vous avez la puissance d'un troll à 17, mais en allant 4h45 en paranoïa,<br> cela voudrait dire avoir 17+10 points (arrondis à l'int supérieur), donc être au dessus du 20 max<br> il dépensera alors 8 points pour retomber à 19 fin de la paranoïa, empêchant de perdre des points." };
HHAuto_ToolTips.fr['spendKobans0'] = { version: "5.6.24", elementText: "Dépense Kobans", tooltip: "<p style='color:red'>/!\\ Autorise la dépense des Kobans /!\\</p>Si activé : permet d'activer les fonctions utilisant des kobans" };
HHAuto_ToolTips.fr['kobanBank'] = { version: "5.6.24", elementText: "Kobans à conserver", tooltip: "Minimum de Kobans conservé en banque par les fonctions utilisant des kobans.<br>Ces fonctions ne s'exécuteront pas si elles risquent de faire passer la réserve de kobans sous cette limite." };
HHAuto_ToolTips.fr['buyCombat'] = { version: "5.6.24", elementText: "Achat comb. événmt", tooltip: "<p style='color:red'>/!\\ Dépense des Kobans /!\\<br>(" + HHAuto_ToolTips.fr['spendKobans0'].elementText + " doit être activé)</p>Si activé : <br>recharge automatiquement les points de combat durant les X dernières heures de l'événement (sans faire passer sous la valeur de la réserve de Kobans)" };
HHAuto_ToolTips.fr['buyCombTimer'] = { version: "5.6.24", elementText: "Heures d'achat comb.", tooltip: "(Nombre entier)<br>X dernières heures de l'événement" };
HHAuto_ToolTips.fr['autoBuyBoosters'] = { version: "5.6.24", elementText: "Boosters lég.", tooltip: "<p style='color:red'>/!\\ Dépense des Kobans /!\\<br>(" + HHAuto_ToolTips.fr['spendKobans0'].elementText + " doit être activé)</p>Permet d'acheter des boosters sur le marché (sans faire passer sous la valeur de la réserve de Kobans)." };
HHAuto_ToolTips.fr['autoBuyBoostersFilter'] = { version: "5.6.24", elementText: "Filtre", tooltip: "(valeurs séparées par ;)<br>Définit quel(s) booster(s) acheter, respecter l'ordre (B1:Ginseng B2:Jujubes B3:Chlorella B4:Cordyceps)." };
HHAuto_ToolTips.fr['autoSeasonPassReds'] = { version: "5.6.24", elementText: "Passer 3 rouges", tooltip: "<p style='color:red'>/!\\ Dépense des Kobans /!\\<br>(" + HHAuto_ToolTips.fr['spendKobans0'].elementText + " doit être activé)</p>Utilise des kobans pour renouveler les adversaires de la saison si PowerCalc détermine 3 combats rouges (perdus)." };
HHAuto_ToolTips.fr['showCalculatePower'] = { version: "6.8.0", elementText: "PowerCalc", tooltip: "Si activé : affiche le résultat des calculs du module PowerCalc (Simulateur de combats pour Ligues, Trolls, Saisons)." };
HHAuto_ToolTips.fr['showAdsBack'] = { version: "5.34.15", elementText: "Move ads to the back", tooltip: "Si activé : deplace les pubs à l'arrière plan." };
//HHAuto_ToolTips.fr['calculatePowerLimits'] = { version: "5.6.24", elementText: "Limites perso", tooltip: "(rouge;orange)<br>Définissez vos propres limites de rouge et d'orange pour les opposants<br> -6000;0 veux dire<br> <-6000 est rouge, entre -6000 et 0 est orange et >=0 est vert"};
HHAuto_ToolTips.fr['showInfo'] = { version: "5.6.24", elementText: "Infos", tooltip: "Si activé : affiche une fenêtre d'informations sur le script." };
HHAuto_ToolTips.fr['showInfoLeft'] = { version: "5.23.0", elementText: "Infos à gauche", tooltip: "Affiche la fenêtre d'information à gauche plutot qu'à droite" };
HHAuto_ToolTips.fr['autoSalary'] = { version: "5.6.24", elementText: "Salaire", tooltip: "Si activé :<br>Collecte les salaires toutes les X secondes." };
//HHAuto_ToolTips.fr['autoSalaryMinTimer'] = { version: "5.6.24", elementText: "Attente min.", tooltip: "(Nombre entier)<br>Secondes d'attente minimum entre deux collectes."};
HHAuto_ToolTips.fr['autoSalaryMinSalary'] = { version: "5.20.3", elementText: "Salaire mini", tooltip: "(Integer)<br>Salare minium pour démarrer la collecte" };
HHAuto_ToolTips.fr['autoSalaryMaxTimer'] = { version: "5.20.3", elementText: "Temps de collecte max", tooltip: "(Integer)<br>X secs pour collecter le salaire avant d'arrêter." };
HHAuto_ToolTips.fr['autoMission'] = { version: "5.6.24", elementText: "Missions", tooltip: "Si activé : lance automatiquement les missions." };
HHAuto_ToolTips.fr['autoMissionCollect'] = { version: "5.6.24", elementText: "Collecter", tooltip: "Si activé : collecte automatiquement les récompenses des missions." };
HHAuto_ToolTips.fr['compactMissions'] = { version: "5.24.0", elementText: "Compacter", tooltip: "Compacter l'affichage des missions" };
HHAuto_ToolTips.fr['autoTrollBattle'] = { version: "5.6.24", elementText: "Activer", tooltip: "Si activé : combat automatiquement le troll." };
HHAuto_ToolTips.fr['autoTrollSelector'] = { version: "5.6.24", elementText: "Sélection troll", tooltip: "Sélection du troll à combattre" };
HHAuto_ToolTips.fr['autoTrollThreshold'] = { version: "5.6.24", elementText: "Réserve", tooltip: "Points de combat de trolls (poings) minimum à conserver" };
HHAuto_ToolTips.fr['eventTrollOrder'] = { version: "5.6.24", elementText: "Ordre Trolls d'événement", tooltip: "Permet de sélectionner l'ordre dans lequel les trolls d'événements sont automatiquement combattus." };
HHAuto_ToolTips.fr['firstTrollWithGirls'] = { version: "5.32.0", elementText: "Premier troll avec une fille" };
HHAuto_ToolTips.fr['lastTrollWithGirls'] = { version: "5.32.0", elementText: "Dernier troll avec une fille" };
HHAuto_ToolTips.fr['eventTrollOrder'] = { version: "6.15.8", elementText: "Ordre des Trolls lors des évènements", tooltip: "(valeurs séparées par ;)<br>Défini l'ordre dans lequels les combats de Troll seront effectué<br>1 : Dark Lord<br>2 : Espion Ninja<br>[]...]" };
HHAuto_ToolTips.fr['plusEvent'] = { version: "5.6.24", elementText: "+Evénmt.", tooltip: "Si activé : ignore le troll sélectionné et combat les trolls d'événement s'il y a une fille à gagner." };
HHAuto_ToolTips.fr['plusEventMythic'] = { version: "5.6.24", elementText: "+Evénmt. mythique", tooltip: "Si activé : ignorer le troll sélectionné et combat le troll d'événement mythique s'il y a une fille à gagner et des fragments disponibles." };
HHAuto_ToolTips.fr['autoSeason'] = { version: "5.6.24", elementText: "Activer", tooltip: "Si activé : combat automatique de saison (Adversaire sélectionné avec PowerCalc)." };
HHAuto_ToolTips.fr['autoSeasonCollect'] = { version: "5.6.24", elementText: "Collecter", tooltip: "Si activé : collecte automatiquement les récompenses de saison (si plusieurs à collecter, en collectera une par combat)." };
HHAuto_ToolTips.fr['autoSeasonCollectAll'] = { version: "6.15.8", elementText: "Tout collecter", tooltip: "Si activé : Collect Automatiquement toutes les récompense avant la fin de la Saison (configuré avec le timer \"Tout collecter\")" };
HHAuto_ToolTips.fr['autoSeasonThreshold'] = { version: "5.6.24", elementText: "Réserve", tooltip: "Points de combat de saison (Baiser) minimum à conserver." };
HHAuto_ToolTips.fr['autoQuest'] = { version: "5.6.24", elementText: "Quête", tooltip: "Si activé : Fait automatiquement les quêtes" };
HHAuto_ToolTips.fr['autoQuestThreshold'] = { version: "5.6.24", elementText: "Réserve", tooltip: "Energie de quête minimum à conserver" };
HHAuto_ToolTips.fr['autoContest'] = { version: "5.6.24", elementText: "Compét'", tooltip: "Si activé : récolter les récompenses de la compét' terminée" };
HHAuto_ToolTips.fr['compactEndedContests'] = { version: "5.24.0", elementText: "Compacter", tooltip: "Compacter l'affichage des compet'" };
HHAuto_ToolTips.fr['autoFreePachinko'] = { version: "5.6.24", elementText: "Pachinko", tooltip: "Si activé : collecte automatiquement les Pachinkos gratuits" };
HHAuto_ToolTips.fr['autoMythicPachinko'] = { version: "5.6.24", elementText: "Pachinko mythique" };
HHAuto_ToolTips.fr['autoEquipmentPachinko'] = { version: "5.34.9", elementText: "Pachinko d'équipment" };
HHAuto_ToolTips.fr['autoLeagues'] = { version: "5.6.24", elementText: "Activer", tooltip: "Si activé : Combattre automatiquement en Ligues" };
HHAuto_ToolTips.fr['autoLeaguesSortMode'] = { version: "7.6.0", elementText: "Methode de tri", tooltip: "Definit la methode de choix de l'adversaire. <br>Ordre affiché, <br>Utiliser le pouvoir <br>ou la simu powercalc interne" };
HHAuto_ToolTips.fr['autoLeaguesdisplayedOrder'] = { version: "7.6.0", elementText: "Ordre affiché" };
HHAuto_ToolTips.fr['autoLeaguesPower'] = { version: "7.6.0", elementText: "Utiliser le pouvoir" };
HHAuto_ToolTips.fr['autoLeaguesPowerCalc'] = { version: "6.14.0", elementText: "Utiliser PowerCalc", tooltip: "Si activé : choisira l'adversaire en utilisant PowerCalc." };
HHAuto_ToolTips.fr['autoLeaguesCollect'] = { version: "5.6.24", elementText: "Collecter", tooltip: "Si activé : Collecte automatiquement les récompenses de la Ligue terminée" };
HHAuto_ToolTips.fr['autoLeaguesSelector'] = { version: "5.6.24", elementText: "Ligue ciblée", tooltip: "Objectif de niveau de ligue (à atteindre, à conserver ou à dépasser selon le choix)." };
HHAuto_ToolTips.fr['autoLeaguesAllowWinCurrent'] = { version: "5.6.24", elementText: "Autoriser dépassement", tooltip: "Si activé, le script tentera de gagner la ligue ciblée puis rétrogradera la semaine suivante pour retourner dans la ligue ciblée." };
HHAuto_ToolTips.fr['autoLeaguesThreshold'] = { version: "5.6.24", elementText: "Réserve", tooltip: "Points de combat de ligue minimum à conserver." };
HHAuto_ToolTips.fr['powerPlacesTitle'] = { version: "6.8.0", elementText: "Lieux de pouvoir", tooltip: "" };
HHAuto_ToolTips.fr['autoPowerPlaces'] = { version: "6.8.0", elementText: "Activer", tooltip: "Si activé : Fait automatiquement les lieux de pouvoir." };
HHAuto_ToolTips.fr['autoPowerPlacesIndexFilter'] = { version: "5.6.24", elementText: "Filtre", tooltip: "Permet de définir un filtre et un ordre sur les lieux de pouvoir à faire (uniquement lorsque plusieurs lieux de pouvoir expirent en même temps)." };
HHAuto_ToolTips.fr['autoPowerPlacesAll'] = { version: "5.6.24", elementText: "Tous", tooltip: "Si activé : ignore le filtre et fait tous les lieux de pouvoir (mettra à jour le filtre avec les identifiants actuels)" };
HHAuto_ToolTips.fr['compactPowerPlace'] = { version: "5.24.0", elementText: "Compacter", tooltip: "Compacter l'affichage des leux de pouvoir" };
HHAuto_ToolTips.fr['autoChampsTitle'] = { version: "5.6.24", elementText: "Champions" };
HHAuto_ToolTips.fr['autoChamps'] = { version: "5.6.24", elementText: "Normal", tooltip: "Si activé : combat automatiquement les champions (s'ils sont démarrés manuellement et en filtre uniquement)." };
HHAuto_ToolTips.fr['autoChampsUseEne'] = { version: "5.6.24", elementText: "Achat tickets", tooltip: "Si activé : utiliser l'énergie pour acheter des tickets de champion (30 énergie nécessaire ; ne marchera pas si Quête auto activée)." };
HHAuto_ToolTips.fr['autoChampsFilter'] = { version: "5.6.24", elementText: "Filtre", tooltip: "Permet de filtrer les champions à combattre." };
HHAuto_ToolTips.fr['goToClubChampions'] = { version: "5.25.0", elementText: "Aller au Champion de Club" };
HHAuto_ToolTips.fr['autoStatsSwitch'] = { version: "5.6.24", elementText: "Stats", tooltip: "Achète automatiquement des statistiques sur le marché." };
HHAuto_ToolTips.fr['autoStats'] = { version: "5.6.24", elementText: "Argent à garder", tooltip: "Argent minimum à conserver lors de l'achat automatique de statistiques." };
HHAuto_ToolTips.fr['autoExpW'] = { version: "5.6.24", elementText: "Livres", tooltip: "Si activé : permet d'acheter des livres d'expérience sur le marché tout en respectant les limites d'expérience et d'argent ci-après." };
HHAuto_ToolTips.fr['autoExp'] = { version: "5.6.24", elementText: "Argent à garder", tooltip: "Argent minimum à conserver lors de l'achat automatique de livres d'expérience." };
HHAuto_ToolTips.fr['maxExp'] = { version: "5.6.24", elementText: "Exp. max", tooltip: "Expérience maximum en stock pour l'achat de livres d'expérience." };
HHAuto_ToolTips.fr['autoAffW'] = { version: "5.6.24", elementText: "Cadeaux", tooltip: "Si activé : permet d'acheter des cadeaux d'affection sur le marché tout en respectant les limites d'affection et d'argent ci-après." };
HHAuto_ToolTips.fr['autoAff'] = { version: "5.6.24", elementText: "Argent à garder", tooltip: "Argent minimum à conserver lors de l'achat automatique de cadeaux d'affection." };
HHAuto_ToolTips.fr['maxAff'] = { version: "5.6.24", elementText: "Aff. max", tooltip: "Affection maximum en stock pour l'achat de cadeaux d'affection." };
HHAuto_ToolTips.fr['OpponentListBuilding'] = { version: "5.6.24", elementText: "La liste des adversaires est en construction", tooltip: "" };
HHAuto_ToolTips.fr['OpponentParsed'] = { version: "5.6.24", elementText: "adversaires parcourus", tooltip: "" };
HHAuto_ToolTips.fr['DebugMenu'] = { version: "5.6.24", elementText: "Debug Menu", tooltip: "Options pour le debug" };
HHAuto_ToolTips.fr['DebugOptionsText'] = { version: "5.6.24", elementText: "Les boutons ci-dessous permette de modifier les variables du script, a utiliser avec prudence.", tooltip: "" };
HHAuto_ToolTips.fr['DeleteTempVars'] = { version: "5.6.24", elementText: "Supprimer les variables temporaires", tooltip: "Supprime toutes les variables temporaire du script." };
HHAuto_ToolTips.fr['ResetAllVars'] = { version: "5.6.24", elementText: "Réinitialiser", tooltip: "Remettre toutes les options par default" };
HHAuto_ToolTips.fr['DebugFileText'] = { version: "5.6.24", elementText: "Cliquer sur le boutton ci-dessous pour produire une journal de debug.", tooltip: "" };
HHAuto_ToolTips.fr['OptionCancel'] = { version: "5.6.24", elementText: "Annuler", tooltip: "" };
HHAuto_ToolTips.fr['SeasonMaskRewards'] = { version: "5.6.24", elementText: "Masquer gains", tooltip: "Permet de masquer les gains réclamés de la saison." };
HHAuto_ToolTips.fr['globalTitle'] = { version: "5.6.24", elementText: "Général" };
HHAuto_ToolTips.fr['displayTitle'] = { version: "5.6.24", elementText: "Affichage" };
HHAuto_ToolTips.fr['autoActivitiesTitle'] = { version: "5.6.24", elementText: "Activités" };
HHAuto_ToolTips.fr['autoTrollTitle'] = { version: "5.6.24", elementText: "Combat troll" };
HHAuto_ToolTips.fr['autoSeasonTitle'] = { version: "5.6.24", elementText: "Saison" };
HHAuto_ToolTips.fr['autoLeaguesTitle'] = { version: "5.6.24", elementText: "Ligues" };
HHAuto_ToolTips.fr['PoAMaskRewards'] = { version: "6.15.8", elementText: "Masquer gains", tooltip: "Si activé : masque les récompenses déjà réclamées du chemin d'affection." };
HHAuto_ToolTips.fr['showTooltips'] = { version: "5.6.24", elementText: "Infobulles", tooltip: "Si activé : affiche des bulles d'aide lors du survol des éléments avec la souris." };
HHAuto_ToolTips.fr['autoClubChamp'] = { version: "5.6.24", elementText: "Club", tooltip: "Si activé : combat automatiquement le champion de club si au moins un combat a déjà été effectué." };
HHAuto_ToolTips.fr['autoClubChampMax'] = { version: "5.6.24", elementText: "Max. tickets par session", tooltip: "Nombre maximum de ticket à utiliser sur une même session du champion de club." };
HHAuto_ToolTips.fr['showMarketTools'] = { version: "5.6.24", elementText: "Outils du marché", tooltip: "Si activé : affiche des icones supplémentaires dans le marché pour trier et vendre automatiquement l'équipement." };
HHAuto_ToolTips.fr['useX10Fights'] = { version: "5.6.24", elementText: "Combats x10", tooltip: "<p style='color:red'>/!\\ Dépense des Kobans /!\\<br>(" + HHAuto_ToolTips.fr['spendKobans0'].elementText + " doit être activé)</p>Si activé : <br>utilise le bouton x10 si 10 combats sont disponibles (Si Dépense Kobans activée et suffisamment de kobans en banque)." };
HHAuto_ToolTips.fr['useX50Fights'] = { version: "5.6.24", elementText: "Combats x50", tooltip: '<p style="color:red">/!\\ Dépense des Kobans /!\\<br>(' + HHAuto_ToolTips.fr['spendKobans0'].elementText + ' doit être activé)</p>Si activé : <br>utilise le bouton x50 si 50 combats sont disponibles (Si Dépense Kobans activée et suffisamment de kobans en banque).' };
HHAuto_ToolTips.fr['autoBuy'] = { version: "5.6.24", elementText: "Marché" };
HHAuto_ToolTips.fr['minShardsX50'] = { version: "5.6.24", elementText: "Frags min. x50", tooltip: "Utiliser le bouton x50 si le nombre de fragments restant est supérieur ou égal à..." };
HHAuto_ToolTips.fr['minShardsX10'] = { version: "5.6.24", elementText: "Frags min. x10", tooltip: "Utiliser le bouton x10 si le nombre de fragments restant est supérieur ou égal à..." };
HHAuto_ToolTips.fr['autoMissionKFirst'] = { version: "5.6.24", elementText: "Prioriser Kobans", tooltip: "Si activé : commence par les missions qui rapportent des kobans." };
HHAuto_ToolTips.fr['povpogTitle'] = { version: "5.6.133", elementText: "Voie de la Valeur/Gloire" };
HHAuto_ToolTips.fr['povTitle'] = { version: "5.20.3", elementText: "Voie de la Valeur" };
HHAuto_ToolTips.fr['pogTitle'] = { version: "5.20.3", elementText: "Voie de la Gloire" };
HHAuto_ToolTips.fr['poaTitle'] = { version: "6.15.8", elementText: "Chemin d'affection" };
HHAuto_ToolTips.fr['seasonalEventTitle'] = { version: "5.6.133", elementText: "Evènements saisoniers" };
HHAuto_ToolTips.fr['mousePause'] = { version: "5.6.135", elementText: "Pause souris", tooltip: "Pause le script pour 5 secondes quand des mouvements de la souris sont detecté. Evite le sript d'interrompre les actions manuelles. (en ms, 5000ms=5s)" };
HHAuto_ToolTips.fr['PoVMaskRewards'] = { version: "6.15.8", elementText: "Masquer gains", tooltip: "Permet de masquer les gains réclamés de la Voie de la Valeur." };
HHAuto_ToolTips.fr['PoGMaskRewards'] = { version: "6.15.8", elementText: "Masquer gains", tooltip: "Permet de masquer les gains réclamés de la Voie de la Gloire." };
HHAuto_ToolTips.fr['rewardsToCollectTitle'] = { version: "6.15.8", elementText: "Energies, XP, monnaies à collecter" };
HHAuto_ToolTips.fr['showRewardsRecap'] = { version: "6.15.8", elementText: "Affiche recap de récompenses", tooltip: "Affiche les récompenses cumulés des energies, l'XP et les monnaies" };
HHAuto_ToolTips.fr['SeasonalEventMaskRewards'] = { version: "6.8.4", elementText: "Masquer gains", tooltip: "Permet de masquer les gains réclamés des évènements saisoniers." };
HHAuto_ToolTips.fr['bossBangEvent'] = { version: "5.20.3", elementText: "Activer", tooltip: "Si activé : Effectue les combats boss bang en commençant par l'équipe configuré si après." };
HHAuto_ToolTips.fr['bossBangEventTitle'] = { version: "6.15.8", elementText: "Boss Bang" };
HHAuto_ToolTips.fr['bossBangMinTeam'] = { version: "5.6.137", elementText: "Première équipe", tooltip: "Première équipe à utiliser<br>Si 5, le script commencera par la dernière pour finir par la premiere." };
HHAuto_ToolTips.fr['sultryMysteriesEventTitle'] = { version: "6.15.8", elementText: "Mystère sensuel" };
HHAuto_ToolTips.fr['eventTitle'] = { version: "6.15.8", elementText: "Evènements" };
HHAuto_ToolTips.fr['autodpEventCollect'] = { version: "6.15.8", elementText: "Collecter", tooltip: "Permet de collecter les gains de l'évènement double penetration" };
HHAuto_ToolTips.fr['autodpEventCollectAll'] = { version: "7.1.0", elementText: "Tout collecter", tooltip: "Si activé : Collect Automatiquement toutes les récompense avant la fin de l'évènement double penetration (configuré avec le timer \"Tout collecter\")" };
HHAuto_ToolTips.fr['autoFreeBundlesCollect'] = { version: "5.16.0", elementText: "Collecter offres gratuites", tooltip: "Permet de collecter les offres gratuites." };
HHAuto_ToolTips.fr['dailyGoalsTitle'] = { version: "5.24.0", elementText: "Objectifs journalier" };
HHAuto_ToolTips.fr['autoDailyGoalsCollect'] = { version: "5.24.0", elementText: "Collecter", tooltip: "Permet de collecter les objectifs journaliers si non collectés 2 heures avant la fin du jour HH." };
HHAuto_ToolTips.fr['compactDailyGoals'] = { version: "5.24.0", elementText: "Compacter", tooltip: "Compacter l'affichage des objectifs journalier" };
HHAuto_ToolTips.fr['autoPoVCollect'] = { version: "6.15.8", elementText: "Collecter", tooltip: "Permet de collecter les gains de la Voie de la Valeur." };
HHAuto_ToolTips.fr['autoPoVCollectAll'] = { version: "6.15.8", elementText: "Tout collecter", tooltip: "Si activé : Collect Automatiquement toutes les récompense avant la fin de la Voie de la Valeur (configuré avec le timer \"Tout collecter\")" };
HHAuto_ToolTips.fr['autoSeasonalEventCollect'] = { version: "5.7.0", elementText: "Collecter", tooltip: "Permet de collecter les gains des évènements saisoniers." };
HHAuto_ToolTips.fr['autoSeasonalEventCollectAll'] = { version: "6.15.8", elementText: "Tout collecter", tooltip: "Si activé : Collect Automatiquement toutes les récompense avant la fin de l'évenement saisonier (configuré avec le timer \"Tout collecter\")" };
HHAuto_ToolTips.fr['autoPoGCollect'] = { version: "6.15.8", elementText: "Collecter", tooltip: "Permet de collecter les gains de la Voie de la Gloire." };
HHAuto_ToolTips.fr['autoPoGCollectAll'] = { version: "6.15.8", elementText: "Tout collecter", tooltip: "Si activé : Collect Automatiquement toutes les récompense avant la fin de la Voie de la Gloire (configuré avec le timer \"Tout collecter\")" };
HHAuto_ToolTips.fr['autoPoACollect'] = { version: "6.16.0", elementText: "Collecter", tooltip: "Permet de collecter les gains de l'event chemin d'affection." };
HHAuto_ToolTips.fr['autoPoACollectAll'] = { version: "6.16.0", elementText: "Tout collecter", tooltip: "Si activé : Collect Automatiquement toutes les récompense avant la fin de l'event chemin d'affection (configuré avec le timer \"Tout collecter\")" };
HHAuto_ToolTips.fr['autoPantheon'] = { version: "5.6.24", elementText: "Activer", tooltip: "Si activé : combat automatiquement le Pantheon" };
HHAuto_ToolTips.fr['autoPantheonThreshold'] = { version: "5.6.24", elementText: "Réserve", tooltip: "Vénération minimum à garder<br>Max 10" };
HHAuto_ToolTips.fr['autoTrollMythicByPassParanoia'] = { version: "5.6.24", elementText: "Mythique annule paranoïa", tooltip: "Si activé : autorise le script à ne pas respecter le mode Parano lors d'un événement mythique.<br>Si la prochaine vague est pendant une phase de sommeil le script combattra quand même<br>tant que des combats et des fragments sont disponibles." };
HHAuto_ToolTips.fr['buyMythicCombat'] = { version: "5.6.24", elementText: "Achat comb. pour mythique", tooltip: "<p style='color:red'>/!\\ Dépense des Kobans /!\\<br>(" + HHAuto_ToolTips.fr['spendKobans0'].elementText + " doit être activé)</p>Si activé : achète des points de combat (poings) pendant les X dernières heures de l'événement mythique (sans dépasser la limite de la banque de kobans), passera outre la réserve de combats si nécessaire." };
HHAuto_ToolTips.fr['buyMythicCombTimer'] = { version: "5.6.24", elementText: "Heures d'achat comb.", tooltip: "(Nombre entier)<br>X dernières heures de l'événement mythique" };
HHAuto_ToolTips.fr['mythicGirlNext'] = { version: "5.6.24", elementText: "Vague mythique" };
HHAuto_ToolTips.fr['PachinkoFillOrbs'] = { version: "5.6.134", elementText: 'Remplir orbes', tooltip: "Remplir le champs avec toutes les orbes disponibles." };
HHAuto_ToolTips.fr['collectAllTimer'] = { version: "6.15.8", elementText: "Timer Tout collecter (en heure)", tooltip: "Nombre d'heure avant la fin de l'evenement pour collecter toutes les récompenses (Faible temps peu entrainer un echec de collecte), Nécéssite une activation sur chaque évenement (POV, POG, season)" };
HHAuto_ToolTips.fr['collectAllButton'] = { version: "7.3.0", elementText: "Tout réclamer", tooltip: "Réclame toutes les récompenses de manière automatique" };

;// CONCATENATED MODULE: ./src/i18n/de.ts

HHAuto_ToolTips.de['saveDebug'] = { version: "5.6.24", elementText: "Save Debug", tooltip: "Erlaube das Erstellen einer Debug Log Datei." };
HHAuto_ToolTips.de['gitHub'] = { version: "5.6.24", elementText: "GitHub", tooltip: "Link zum GitHub Projekt." };
HHAuto_ToolTips.de['saveConfig'] = { version: "5.6.24", elementText: "Save Config", tooltip: "Erlaube die Einstellung zu speichern." };
HHAuto_ToolTips.de['loadConfig'] = { version: "5.6.24", elementText: "Load Config", tooltip: "Erlaube die Einstellung zu laden." };
HHAuto_ToolTips.de['master'] = { version: "5.6.24", elementText: "Master Schalter", tooltip: "An/Aus Schalter für das Skript" };
HHAuto_ToolTips.de['settPerTab'] = { version: "5.6.24", elementText: "Einstellung per Tab", tooltip: "Erlaube die Einstellungen nur für diesen Tab zu setzen." };
HHAuto_ToolTips.de['paranoia'] = { version: "5.6.24", elementText: "Paranoia Modus", tooltip: "Erlaube es Schlaf zu simulieren und einen menschlichen Nutzer (wird weiter dokumentiert)" };
HHAuto_ToolTips.de['paranoiaSpendsBefore'] = { version: "5.6.24", elementText: "Gib Punkte aus vor...", tooltip: "Wenn gewollt, werden Punkte für Optionen ausgegeben (Quest, Troll, Liga und Season)<br> nur wenn sie aktiviert sind<br>und gibt Punkt aus die über dem maximal Limit sind<br> z.B.: Du hast die Power für Troll von 17, gehst aber für 4h45 in den Paranoia Modus,<br> dass heißt 17+10 Punkte (aufgerundet), welches über dem Max von 20 wäre.<br> Es würden dann 9 Punkte ausgegeben, sodass du nur bei 19 Punkten bleibst bis zum Ende des Paranoia Modus um einen Verlust zu verhindern." };
HHAuto_ToolTips.de['spendKobans0'] = { version: "5.6.24", elementText: "Fragwürdige Scheiße", tooltip: "Erster Sicherheitsschalter für die Nutzung von Kobans.<br>Alle 3 müssen aktiviert sein und Kobans auszugeben." };
//HHAuto_ToolTips.de['spendKobans1'] = { version: "5.6.24", elementText: "Biste sicher?", tooltip: "Zweiter Sicherheitsschalter für die Nutzung von Kobans.<br>Muss nach dem Ersten aktiviert werden.<br>Alle 3 müssen aktiviert sein und Kobans auszugeben."};
//HHAuto_ToolTips.de['spendKobans2'] = { version: "5.6.24", elementText: "Du wurdest gewarnt!", tooltip: "Dritter Sicherheitsschalter für die Nutzung von Kobans <br>Muss nach dem Zweiten aktiviert werden.<br> Alle 3 müssen aktiviert sein und Kobans auszugeben."};
HHAuto_ToolTips.de['kobanBank'] = { version: "5.6.24", elementText: "Koban Bank", tooltip: "(Integer)<br>Minimale Anzahl an Kobans die behalten werden sollen." };
HHAuto_ToolTips.de['buyCombat'] = { version: "5.6.24", elementText: "Kaufe Kobans bei Events", tooltip: "'Kobans ausgeben Funktion'<br> Wenn aktiviert: <br> Kauft Kampfpunkte in den letzten X Stunden eines Events (Wenn es das Minimum nicht unterschreitet)" };
HHAuto_ToolTips.de['buyCombTimer'] = { version: "5.6.24", elementText: "Stunden bis Kauf", tooltip: "(Ganze pos. Zahl)<br>X verbleibende Stunden des Events" };
HHAuto_ToolTips.de['autoBuyBoosters'] = { version: "5.6.24", elementText: "Kaufe Booster", tooltip: "'Koban ausgeben Funktion'<br>Erlaubt es Booster im Markt zu kaufen(Wenn es das Minimum nicht unterschreitet)" };
HHAuto_ToolTips.de['autoBuyBoostersFilter'] = { version: "5.6.24", elementText: "Filter", tooltip: "(Werte getrennt durch ;)<br>Gib an welches Booster gekauft werden sollen, Reihenfolge wird beachtet (B1:Ginseng B2:Jujubes B3:Chlorella B4:Cordyceps)" };
HHAuto_ToolTips.de['autoSeasonPassReds'] = { version: "5.6.24", elementText: "Überspringe drei Rote", tooltip: "'Koban ausgeben Funktion'<br>Benutze Kobans um Season Gegner zu tauschen wenn alle drei Rote sind" };
HHAuto_ToolTips.de['showCalculatePower'] = { version: "6.8.0", elementText: "Zeige Kraftrechner", tooltip: "Zeige Kampfsimulationsindikator an für Liga, Kampf und Season" };
//HHAuto_ToolTips.de['calculatePowerLimits'] = { version: "5.6.24", elementText: "Eigene Grenzen (rot;gelb)", tooltip: "(rot;gelb)<br>Definiere deine eigenen Grenzen für rote und orange Gegner<br> -6000;0 meint<br> <-6000 ist rot, zwischen -6000 und 0 ist orange und >=0 ist grün"};
HHAuto_ToolTips.de['showInfo'] = { version: "5.6.24", elementText: "Zeige Info", tooltip: "Wenn aktiv : zeige Information auf Skriptwerten und nächsten Durchläufen" };
HHAuto_ToolTips.de['autoSalary'] = { version: "5.6.24", elementText: "Auto Einkommen", tooltip: "Wenn aktiv :<br>Sammelt das gesamte Einkommen alle X Sek." };
//HHAuto_ToolTips.de['autoSalaryMinTimer'] = { version: "5.6.24", elementText: "min Warten", tooltip: "(Ganze pos. Zahl)<br>X Sek bis zum Sammeln des Einkommens"};
HHAuto_ToolTips.de['autoMission'] = { version: "5.6.24", elementText: "AutoMission", tooltip: "Wenn aktiv : Macht automatisch Missionen" };
HHAuto_ToolTips.de['autoMissionCollect'] = { version: "5.6.24", elementText: "Einsammeln", tooltip: "Wenn aktiv : Sammelt automatisch Missionsgewinne" };
HHAuto_ToolTips.de['autoTrollBattle'] = { version: "5.6.24", elementText: "AutoTrollKampf", tooltip: "Wenn aktiv : Macht automatisch aktivierte Trollkämpfe" };
HHAuto_ToolTips.de['autoTrollSelector'] = { version: "5.6.24", elementText: "Troll Wähler", tooltip: "Wähle Trolle die bekämpfte werden sollen." };
HHAuto_ToolTips.de['autoTrollThreshold'] = { version: "5.6.24", elementText: "Schwellwert", tooltip: "Minimum an Trollpunkten die aufgehoben werden" };
HHAuto_ToolTips.de['eventTrollOrder'] = { version: "5.6.24", elementText: "Event Troll Reihenfolge", tooltip: "Erlaubt eine Auswahl in welcher Reihenfolge die Trolle automatisch bekämpft werden" };
HHAuto_ToolTips.de['plusEvent'] = { version: "5.6.24", elementText: "+Event", tooltip: "Wenn aktiv : Ignoriere ausgewählte Trolle währende eines Events, zugunsten des Events" };
HHAuto_ToolTips.de['plusEventMythic'] = { version: "5.6.24", elementText: "+Mythisches Event", tooltip: "Erlaubt es Mädels beim mystischen Event abzugreifen, sollte sie nur versuchen wenn auch Teile vorhanden sind" };
//HHAuto_ToolTips.de['eventMythicPrio'] = { version: "5.6.24", elementText: "Priorisiere über Event Troll Reihenfolge", tooltip: "Mystische Event Mädels werden über die Event Troll Reihenfolge gestellt, sofern Teile erhältlich sind"};
//HHAuto_ToolTips.de['autoTrollMythicByPassThreshold'] = { version: "5.6.24", elementText: "Mystische über Schwellenwert", tooltip: "Erlaubt es Punkt über den Schwellwert für das mystische Events zu nutzen"};
HHAuto_ToolTips.de['autoTrollMythicByPassParanoia'] = { version: "5.6.24", elementText: "Mythisch über Paranoia", tooltip: "Wenn aktiv: Erlaubt es den Paranoia Modus zu übergehen. Wenn du noch kämpfen kannst oder dir Energie kaufen kannst, wird gekämpft. Sollte die nächste Welle an Splittern während der Ruhephase sein, wird der Modus unterbrochen und es wird gekämpft" };
HHAuto_ToolTips.de['autoArenaCheckbox'] = { version: "5.6.24", elementText: "AutoArenaKampf", tooltip: "if enabled : Automatically do Arena (deprecated)" };
HHAuto_ToolTips.de['autoSeason'] = { version: "5.6.24", elementText: "AutoSeason", tooltip: "Wenn aktiv : Kämpft automatisch in der Season (Gegner werden wie im Kraftrechner einstellt gewählt)" };
HHAuto_ToolTips.de['autoSeasonCollect'] = { version: "5.6.24", elementText: "Einsammeln", tooltip: "Wenn aktiv : Sammelt automatisch Seasongewinne ein (bei mehr als einem, wird eines pro Küssnutzung eingesammelt)" };
HHAuto_ToolTips.de['autoSeasonThreshold'] = { version: "5.6.24", elementText: "Schwellwert", tooltip: "Minimum Küsse die behalten bleiben" };
HHAuto_ToolTips.de['autoQuest'] = { version: "5.6.24", elementText: "AutoQuest", tooltip: "Wenn aktiv : Macht automatisch Quests" };
HHAuto_ToolTips.de['autoQuestThreshold'] = { version: "5.6.24", elementText: "Schwellwert", tooltip: "Minimum an Energie die behalten bleibt" };
HHAuto_ToolTips.de['autoContest'] = { version: "5.6.24", elementText: "AutoAufgabe", tooltip: "Wenn aktiv : Sammelt abgeschlossene Aufgabenbelohnungen ein" };
HHAuto_ToolTips.de['autoFreePachinko'] = { version: "5.6.24", elementText: "AutoPachinko(Gratis)", tooltip: "Wenn aktiv : Sammelt freien Glücksspielgewinn ein" };
HHAuto_ToolTips.de['autoLeagues'] = { version: "5.6.24", elementText: "AutoLiga", tooltip: "Wenn aktiv : Kämpft automatisch in der Liga" };
HHAuto_ToolTips.de['autoLeaguesPowerCalc'] = { version: "6.14.0", elementText: "Nutze Kraftrechner", tooltip: "Wenn aktiv : wählt Gegner durch Kraftrechner" };
HHAuto_ToolTips.de['autoLeaguesCollect'] = { version: "5.6.24", elementText: "Einsammeln", tooltip: "Wenn aktiv : Sammelt automatisch Ligagewinn ein" };
HHAuto_ToolTips.de['autoLeaguesSelector'] = { version: "5.6.24", elementText: "Ligaziel", tooltip: "Ligaziel, versuche abzusteigen, Platz zu halten oder aufzusteigen" };
HHAuto_ToolTips.de['autoLeaguesThreshold'] = { version: "5.6.24", elementText: "Schwellwert", tooltip: "Minimum an Ligakämpfe behalten" };
HHAuto_ToolTips.de['powerPlacesTitle'] = { version: "6.8.0", elementText: "Auto Orte der Macht", tooltip: "" };
HHAuto_ToolTips.de['autoPowerPlaces'] = { version: "6.8.0", elementText: "Aktivieren", tooltip: "Wenn aktiv : macht automatisch Orte der Macht" };
HHAuto_ToolTips.de['autoPowerPlacesIndexFilter'] = { version: "5.6.24", elementText: "Index Filter", tooltip: "Erlaubt es Filter zusetzen für Orte der Macht und eine Reihenfolge festzulegen (Reihenfolge wird beachtet, sollten mehrere zur gleichen Zeit fertig werden)" };
HHAuto_ToolTips.de['autoPowerPlacesAll'] = { version: "5.6.24", elementText: "Mach alle", tooltip: "Wenn aktiv : ignoriere Filter und mache alle (aktualisiert den Filter mit korrekten IDs)" };
HHAuto_ToolTips.de['autoChamps'] = { version: "5.6.24", elementText: "AutoChampions", tooltip: "Wenn aktiv : Macht automatisch Championkämpfe (nur wenn sie gestartet wurden und im Filter stehen)" };
HHAuto_ToolTips.de['autoChampsUseEne'] = { version: "5.6.24", elementText: "Nutze Energie", tooltip: "Wenn aktiv : Nutze Energie und kaufe Champ. Tickets" };
HHAuto_ToolTips.de['autoChampsFilter'] = { version: "5.6.24", elementText: "Filter", tooltip: "Erlaubt es Filter für zu bekämpfende Champions zu setzen" };
HHAuto_ToolTips.de['autoClubChamp'] = { version: "5.6.24", elementText: "AutoChampions", tooltip: "Wenn aktiv : Macht automatisch ClubChampionkämpfe (nur wenn sie gestartet wurden und im Filter stehen)" };
HHAuto_ToolTips.de['autoStats'] = { version: "5.6.24", elementText: "Min Geld verbleib", tooltip: "Kauft automatisch bessere Statuswerte im Markt mit überschüssigem Geld oberhalb des gesetzten Wertes" };
HHAuto_ToolTips.de['autoExpW'] = { version: "5.6.24", elementText: "Kaufe Erfahrung", tooltip: "Wenn aktiv : Erlaube Erfahrung im Markt zu kaufen<br>Kauft nur wenn dein Geld über dem Wert liegt<br>Kauft nur wenn sich im Besitz befinden potentielle Erfahrung unter dem Wert liegt" };
HHAuto_ToolTips.de['autoExp'] = { version: "5.6.24", elementText: "Min Geld verbleib", tooltip: "Minimum an Geld das behalten wird." };
HHAuto_ToolTips.de['maxExp'] = { version: "5.6.24", elementText: "Max ErfahrKauf", tooltip: "Maximum Erfahrung die gekauft wird" };
HHAuto_ToolTips.de['autoAffW'] = { version: "5.6.24", elementText: "KaufAnziehung", tooltip: "Wenn aktiv : Erlaube Anziehung im Markt zu kaufen<br>Kauft nur wenn dein Geld über dem Wert liegt<br>Kauft nur wenn sich im Besitz befinden potentielle Anziehung unter dem Wert liegt" };
HHAuto_ToolTips.de['autoAff'] = { version: "5.6.24", elementText: "Min Geld verbleib", tooltip: "Minimum an Geld das behalten wird." };
HHAuto_ToolTips.de['maxAff'] = { version: "5.6.24", elementText: "Max AnziehungKauf", tooltip: "Maximum an Anziehung die gekauft wird" };
HHAuto_ToolTips.de['OpponentListBuilding'] = { version: "5.6.24", elementText: "Gegnerliste wird erstellt", tooltip: "" };
HHAuto_ToolTips.de['OpponentParsed'] = { version: "5.6.24", elementText: "Gegner analysiert", tooltip: "" };
HHAuto_ToolTips.de['povTitle'] = { version: "5.20.3", elementText: "Pfad der Tapferkeit (PoV)" };
HHAuto_ToolTips.de['pogTitle'] = { version: "5.20.3", elementText: "Pfad des Ruhmes (PoG)" };

;// CONCATENATED MODULE: ./src/i18n/es.ts

HHAuto_ToolTips.es['saveDebug'] = { version: "5.6.24", elementText: "Salvar Debug", tooltip: "Permite generar un fichero log de depuración." };
HHAuto_ToolTips.es['gitHub'] = { version: "5.6.24", elementText: "GitHub", tooltip: "Link al proyecto GitHub." };
HHAuto_ToolTips.es['saveConfig'] = { version: "5.6.24", elementText: "Salvar config.", tooltip: "Permite salvar la configuración." };
HHAuto_ToolTips.es['loadConfig'] = { version: "5.6.24", elementText: "Cargar config", tooltip: "Permite cargar la configuración." };
HHAuto_ToolTips.es['master'] = { version: "5.6.24", elementText: "Switch maestro", tooltip: "Interruptor de Encendido/Apagado para el script completo" };
HHAuto_ToolTips.es['settPerTab'] = { version: "5.6.24", elementText: "Configuración por ventana", tooltip: "Aplica las opciones sólo a esta ventana" };
HHAuto_ToolTips.es['paranoia'] = { version: "5.6.24", elementText: "Modo Paranoia", tooltip: "Permite simular sueño, y un usuario humano (Pendiente de documentación)" };
HHAuto_ToolTips.es['paranoiaSpendsBefore'] = { version: "5.6.24", elementText: "Gasta puntos antes", tooltip: "\'On\' gastará puntos para opciones (aventura, villanos, ligas y temporada) sólo si éstos están habilitados y gasta puntos que estarían por encima de los límites máximos.<br>Ej : Tienes energia para 17 combates de villanos, pero estarás 4h45m en paranoia.<br> Esto es tener 17+10 combates (redondeado al entero superior), estando así por encima del máximo de 20<br> gastará 8 combates para quedar con 19 al final de la Paranoia, evitando perder puntos." };
HHAuto_ToolTips.es['spendKobans0'] = { version: "5.6.24", elementText: "Kobans securidad", tooltip: "Interruptor de seguridad para el uso de kobans,tienen que estar activados para las funciones de gasto de Kobans" };
//HHAuto_ToolTips.es['spendKobans1'] = { version: "5.6.24", elementText: "¿Estás seguro?", tooltip: "Segundo interruptor de seguridad para el uso de kobans <br>Tiene que ser activado después del primero.<br> Los 3 tienen que estar activados para las funciones de gasto de Kobans"};
//HHAuto_ToolTips.es['spendKobans2'] = { version: "5.6.24", elementText: "Has sido advertido", tooltip: "Tercer interruptor de seguridad para el uso de kobans <br>Tiene que ser activado después del segundo.<br> Los 3 tienen que estar activados para las funciones de gasto de Kobans"};
HHAuto_ToolTips.es['kobanBank'] = { version: "5.6.24", elementText: "Banco de Kobans", tooltip: "(Entero)<br>Minimo de Kobans a conservar cuando se usan funciones de gasto de Kobans" };
HHAuto_ToolTips.es['buyCombat'] = { version: "5.6.24", elementText: "Compra comb. en eventos", tooltip: "Funciones de gasto de Kobans<br>Si habilitado: <br>Compra puntos de combate durante las últimas X horas del evento (si no se baja del valor de Banco de Kobans)" };
HHAuto_ToolTips.es['buyCombTimer'] = { version: "5.6.24", elementText: "Horas para comprar Comb", tooltip: "(Entero)<br>X últimas horas del evento" };
HHAuto_ToolTips.es['autoBuyBoosters'] = { version: "5.6.24", elementText: "Compra Potenciad. Leg.", tooltip: "Funciones de gasto de Kobans<br>Permite comprar potenciadores en el mercado (si no se baja del valor de Banco de Kobans)" };
HHAuto_ToolTips.es['autoBuyBoostersFilter'] = { version: "5.6.24", elementText: "Filtro", tooltip: "(valores separados por ;)<br>Selecciona que potenciador comprar, se respeta el orden (B1:Ginseng B2:Azufaifo B3:Clorela B4:Cordyceps)" };
HHAuto_ToolTips.es['autoSeasonPassReds'] = { version: "5.6.24", elementText: "Pasa 3 rojos", tooltip: "Funciones de gasto de Kobans<br>Usa kobans para renovar oponentes si los 3 rojos" };
HHAuto_ToolTips.es['showCalculatePower'] = { version: "6.8.0", elementText: "Mostar PowerCalc", tooltip: "Muestra simulador de batalla para Liga, batallas, Temporadas " };
//HHAuto_ToolTips.es['calculatePowerLimits'] = { version: "5.6.24", elementText: "Límites propios (rojo;naranja)", tooltip: "(rojo;naranja)<br>Define tus propios límites rojos y naranjas para los oponentes<br> -6000;0 significa<br> <-6000 is rojo, entre -6000 and 0 is naranja and >=0 is verde"};
HHAuto_ToolTips.es['showInfo'] = { version: "5.6.24", elementText: "Muestra info", tooltip: "Si habilitado: muestra información de los valores del script y siguientes ejecuciones" };
HHAuto_ToolTips.es['autoSalary'] = { version: "5.6.24", elementText: "AutoSal.", tooltip: "(Entero)<br>Si habilitado:<br>Recauda salario cada X segundos" };
//HHAuto_ToolTips.es['autoSalaryMinTimer'] = { version: "5.6.24", elementText: "min espera", tooltip: "(Entero)<br>X segundos para recaudar salario"};
HHAuto_ToolTips.es['autoMission'] = { version: "5.6.24", elementText: "AutoMision", tooltip: "Si habilitado: Juega misiones de manera automática" };
HHAuto_ToolTips.es['autoMissionCollect'] = { version: "5.6.24", elementText: "Recaudar", tooltip: "Si habilitado: Recauda misiones de manera automática" };
HHAuto_ToolTips.es['autoTrollBattle'] = { version: "5.6.24", elementText: "AutoVillano", tooltip: "Si habilitado: Combate villano seleccionado de manera automática" };
HHAuto_ToolTips.es['autoTrollSelector'] = { version: "5.6.24", elementText: "Selector villano", tooltip: "Selecciona villano para luchar." };
HHAuto_ToolTips.es['autoTrollThreshold'] = { version: "5.6.24", elementText: "Límite", tooltip: "(Entero 0 a 19)<br>Mínimo combates a guardar" };
HHAuto_ToolTips.es['eventTrollOrder'] = { version: "5.6.24", elementText: "Orden combate villano", tooltip: "(Valores separados por ;)<br>Permite seleccionar el orden de combate automático de los villanos" };
HHAuto_ToolTips.es['plusEvent'] = { version: "5.6.24", elementText: "+Evento", tooltip: "Si habilitado: ignora al villano seleccionado durante un evento para luchar el evento" };
HHAuto_ToolTips.es['plusEventMythic'] = { version: "5.6.24", elementText: "+Evento Mythic", tooltip: "Habilita obtener chicas del evento mítico, solo debería jugar cuando haya fragmentos disponibles" };
//HHAuto_ToolTips.es['eventMythicPrio'] = { version: "5.6.24", elementText: "Prioriza sobre el orden de evento de villano", tooltip: "La chica del evento mítico es prioritaria sobre el orden del evento de villanos si hay fragmentos disponibles"};
//HHAuto_ToolTips.es['autoTrollMythicByPassThreshold'] = { version: "5.6.24", elementText: "Mítico supera límite", tooltip: "Permite que el evento mítico supere el límite de villano"};
HHAuto_ToolTips.es['autoArenaCheckbox'] = { version: "5.6.24", elementText: "AutoBatallaArena", tooltip: "Si habilitado: Combate en Arena de manera automática (obsoleta)" };
HHAuto_ToolTips.es['autoSeason'] = { version: "5.6.24", elementText: "AutoTemporada", tooltip: "Si habilitado: Combate en emporadas de manera automática (Oponente elegido según Calculadora de energía)" };
HHAuto_ToolTips.es['autoSeasonCollect'] = { version: "5.6.24", elementText: "Recaudar", tooltip: "Se habilitado: Recauda temporadas de manera automática (Si multiples para recaudar, recaudará uno por cada uso de beso)" };
HHAuto_ToolTips.es['autoSeasonThreshold'] = { version: "5.6.24", elementText: "Límite", tooltip: "Mínimos besos a conservar" };
HHAuto_ToolTips.es['autoQuest'] = { version: "5.6.24", elementText: "AutoAventura", tooltip: "Si habilitado : Juega aventura de manera automática" };
HHAuto_ToolTips.es['autoQuestThreshold'] = { version: "5.6.24", elementText: "Límite", tooltip: "(Entero entre 0 y 99)<br>Minima energía a conservar" };
HHAuto_ToolTips.es['autoContest'] = { version: "5.6.24", elementText: "AutoCompetición", tooltip: "Si habilitado: Recauda recompensas de competición finalizada" };
HHAuto_ToolTips.es['autoFreePachinko'] = { version: "5.6.138", elementText: "AutoPachinko (Gratis)", tooltip: "Si habilitado: Recauda pachinkos gratuitos de manera automática" };
HHAuto_ToolTips.es['autoLeagues'] = { version: "5.6.24", elementText: "AutoLigas", tooltip: "Si habilitado: Combate en ligas de manera automática" };
HHAuto_ToolTips.es['autoLeaguesPowerCalc'] = { version: "6.14.0", elementText: "UsarCalcPotencia", tooltip: "Si habilitado: Elige oponentes usando calculadora de potencia" };
HHAuto_ToolTips.es['autoLeaguesCollect'] = { version: "5.6.24", elementText: "Recaudar", tooltip: "Si habilitado: Recauda premios de ligas de manera automática" };
HHAuto_ToolTips.es['autoLeaguesSelector'] = { version: "5.6.24", elementText: "Liga objetivo", tooltip: "Liga objetivo, para intentar descender, permanecer o ascender a otra liga en función de ello" };
HHAuto_ToolTips.es['autoLeaguesThreshold'] = { version: "5.6.24", elementText: "Límite", tooltip: "Mínimos combates de liga a conservar" };
HHAuto_ToolTips.es['powerPlacesTitle'] = { version: "6.8.0", elementText: "AutoLugaresPoder", tooltip: "Si habilitado: Juega Lugares de Poder de manera automática" };
HHAuto_ToolTips.es['autoPowerPlaces'] = { version: "6.8.0", elementText: "Habilitar", tooltip: "Si habilitado: Juega Lugares de Poder de manera automática" };
HHAuto_ToolTips.es['autoPowerPlacesIndexFilter'] = { version: "5.6.24", elementText: "Filtro de índice", tooltip: "Permite establecer un filto y un orden para jugar Lugares de Poder (el orden solo se respeta cuando multiples Lugares de Poder finalizan al mismo tiempo)" };
HHAuto_ToolTips.es['autoPowerPlacesAll'] = { version: "5.6.24", elementText: "Juega todos", tooltip: "Si habilitado: ignora el filtro y juega todos los Lugares de Poder (actualizará del Filtro con las actuales ids)" };
HHAuto_ToolTips.es['autoChamps'] = { version: "5.6.138", elementText: "Auto Campeones", tooltip: "Si habilitado: Combate a campeones de manera automática (Sólo si han empezado un combate y están en el filtro)" };
HHAuto_ToolTips.es['autoChampsUseEne'] = { version: "5.6.24", elementText: "UsaEne", tooltip: "Si habilitado: Usa energía para comprar tickets" };
HHAuto_ToolTips.es['autoChampsFilter'] = { version: "5.6.24", elementText: "Filtro", tooltip: "Permite establecer un filtro para luchar con campeones" };
HHAuto_ToolTips.es['autoStats'] = { version: "5.6.24", elementText: "Min dinero", tooltip: "(Entero)<br>Compra equipamiento de manera automática en el mercado con dinero por encima de la cantidad establecida" };
HHAuto_ToolTips.es['autoExpW'] = { version: "5.6.24", elementText: "Compra exp", tooltip: "Si habilitado: Compra experiencia en el mercado<br>Solo si el dinero en el banco es superior a este valor<br>Solo compra si el total de experiencia poseída está por debajo de este valor" };
HHAuto_ToolTips.es['autoExp'] = { version: "5.6.24", elementText: "Min dinero", tooltip: "(Entero)<br>Mínimo dinero a guardar." };
HHAuto_ToolTips.es['maxExp'] = { version: "5.6.24", elementText: "Max experiencia", tooltip: "(Entero)<br>Máxima experiencia a comprar" };
HHAuto_ToolTips.es['autoAffW'] = { version: "5.6.24", elementText: "Compra afec", tooltip: "Si habilitado: Compra afecto en el mercado<br>Solo si el dinero en el banco es superior a este valor<br>Solo compra si el total de afecto poseído está por debajo de este valor" };
HHAuto_ToolTips.es['autoAff'] = { version: "5.6.24", elementText: "Min dinero", tooltip: "(Entero)<br>Mínimo dinero a guardar" };
HHAuto_ToolTips.es['maxAff'] = { version: "5.6.24", elementText: "Max afecto", tooltip: "(Entero)<br>Máximo afecto a comprar" };
HHAuto_ToolTips.es['OpponentListBuilding'] = { version: "5.6.24", elementText: "Lista de oponentes en construcción", tooltip: "" };
HHAuto_ToolTips.es['OpponentParsed'] = { version: "5.6.24", elementText: "opositores analizados", tooltip: "" };
HHAuto_ToolTips.es['DebugMenu'] = { version: "5.6.24", elementText: "Menú depur.", tooltip: "Opciones de depuración" };
HHAuto_ToolTips.es['DebugOptionsText'] = { version: "5.6.24", elementText: "Los botones a continuación permiten modificar el almacenamiento del script, tenga cuidado al usarlos.", tooltip: "" };
HHAuto_ToolTips.es['DeleteTempVars'] = { version: "5.6.24", elementText: "Borra almacenamiento temp.", tooltip: "Borra todo el almacenamiento temporal del script." };
HHAuto_ToolTips.es['ResetAllVars'] = { version: "5.6.24", elementText: "Restaura por defecto", tooltip: "Restaura la configuración por defecto." };
HHAuto_ToolTips.es['DebugFileText'] = { version: "5.6.24", elementText: "Click en el siguiente botón para generar un fichero log de depuración", tooltip: "" };
HHAuto_ToolTips.es['OptionCancel'] = { version: "5.6.24", elementText: "Cancelar", tooltip: "" };
HHAuto_ToolTips.es['SeasonMaskRewards'] = { version: "5.6.24", elementText: "Enmascara recompensas", tooltip: "Permite enmascarar todas las recompensas reclamadas en la pantalla de Temporada" };
HHAuto_ToolTips.es['autoClubChamp'] = { version: "5.6.24", elementText: "AutoClubCamp", tooltip: "Si habilitado: Combate al campeón del club de manera automática" };
HHAuto_ToolTips.es['autoTrollMythicByPassParanoia'] = { version: "5.6.24", elementText: "Mítico ignora paranoia", tooltip: "Permite al mítico ignorar paranoia. Si la siguiente liberación es durante el descanso forzará despertarse para jugar. Si todavía pelea o puede comprar peleas, continuará." };
HHAuto_ToolTips.es['buyMythicCombat'] = { version: "5.6.24", elementText: "Compra comb. para mítico", tooltip: "Función de gasto de Kobans<br>Si habilitado: <br>Comprar puntos de combate durante las últimas X horas del evento mítico (si no se baja del valor de Banco de Kobans)" };
HHAuto_ToolTips.es['buyMythicCombTimer'] = { version: "5.6.24", elementText: "Horas para comprar comb.Mítico", tooltip: "(Entero)<br>X últimas horas del evento mítico" };
HHAuto_ToolTips.es['DebugResetTimerText'] = { version: "5.6.24", elementText: "El selector a continuación permite restablecer los temporizadores", tooltip: "" };
HHAuto_ToolTips.es['timerResetSelector'] = { version: "5.6.24", elementText: "Seleccionar temporizador", tooltip: "Selecciona el temporizador a restablecer" };
HHAuto_ToolTips.es['timerResetButton'] = { version: "5.6.24", elementText: "Restablecer", tooltip: "Establece el temporizador a 0." };
HHAuto_ToolTips.es['timerLeftTime'] = { version: "5.6.24", elementText: "", tooltip: "Tiempo restante" };
HHAuto_ToolTips.es['timerResetNoTimer'] = { version: "5.6.24", elementText: "No hay temporizador seleccionado", tooltip: "" };
HHAuto_ToolTips.es['povTitle'] = { version: "5.20.3", elementText: "Camino del Valor" };
HHAuto_ToolTips.es['pogTitle'] = { version: "5.20.3", elementText: "Camino de la Gloria" };

;// CONCATENATED MODULE: ./src/i18n/index.ts






;// CONCATENATED MODULE: ./src/Helper/LanguageHelper.ts


function getLanguageCode() {
    let HHAuto_Lang = 'en';
    try {
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
    catch (_a) {
    }
    return HHAuto_Lang;
}
/*
 0: version strings are equal
 1: version a is greater than b
-1: version b is greater than a
*/
function cmpVersions(a, b) {
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}
function getTextForUI(id, type) {
    let HHAuto_Lang = getLanguageCode();
    let defaultLanguageText = null;
    let defaultLanguageVersion = "0";
    //console.log(id);
    if (HHAuto_ToolTips['en'] !== undefined && HHAuto_ToolTips['en'][id] !== undefined && HHAuto_ToolTips['en'][id][type] !== undefined) {
        defaultLanguageText = HHAuto_ToolTips['en'][id][type];
        defaultLanguageVersion = HHAuto_ToolTips['en'][id].version;
    }
    if (HHAuto_ToolTips[HHAuto_Lang] !== undefined && HHAuto_ToolTips[HHAuto_Lang][id] !== undefined && HHAuto_ToolTips[HHAuto_Lang][id][type] !== undefined && cmpVersions(HHAuto_ToolTips[HHAuto_Lang][id].version, defaultLanguageVersion) >= 0) {
        return HHAuto_ToolTips[HHAuto_Lang][id][type];
    }
    else {
        if (defaultLanguageText !== null) {
            return defaultLanguageText;
        }
        else {
            LogUtils_logHHAuto("not found text for " + HHAuto_Lang + "/" + id + "/" + type);
            return HHAuto_Lang + "/" + id + "/" + type + " not found.";
        }
    }
}
function manageTranslationPopUp() {
    const HtmlIdPrefix = "HH_TranslateTo_";
    GM_addStyle('.tItems {border-collapse: collapse;text-align:center;vertical-align:middle;} '
        + '.tItems td,th {border: 1px solid #1B4F72;} '
        + '.tItemsColGroup {border: 3px solid #1B4F72;} '
        + '.tItemsTh1 {background-color: #2874A6;color: #fff;} '
        + '.tItemsTh2 {width: 25%;background-color: #3498DB;color: #fff;} '
        + '.tItemsTBody tr:nth-child(odd) {background-color: #85C1E9;} '
        + '.tItemsTBody tr:nth-child(even) {background-color: #D6EAF8;} '
        + '.tReworkedCell {background-color: gray} '
        + '.tEditableDiv:Empty {background-color:blue}');
    let translatePopUpContent = '<div">' + getTextForUI("saveTranslationText", "elementText") + '</div>'
        + '<table class="tItems">'
        + ' <colgroup class="tItemsColGroup">'
        + '  <col class="tItemsColRarity" span="2">'
        + ' </colgroup>'
        + ' <colgroup class="tItemsColGroup">'
        + '  <col class="tItemsColRarity" span="2">'
        + ' </colgroup>'
        + ' <thead class="tItemsTHead">'
        + '  <tr>'
        + '   <th class="tItemsTh1" colspan="2">' + "Text" + '</th>'
        + '   <th class="tItemsTh1" colspan="2">' + "Tooltip" + '</th>'
        + '  </tr>'
        + '  <tr>'
        + '   <th class="tItemsTh2">' + "English" + '</th>'
        + '   <th class="tItemsTh2">' + $('html')[0].lang + '</th>'
        + '   <th class="tItemsTh2">' + "English" + '</th>'
        + '   <th class="tItemsTh2">' + $('html')[0].lang + '</th>'
        + '  </tr>'
        + ' </thead>'
        + ' <tbody class="tItemsTBody">';
    const currentLanguage = getLanguageCode();
    for (let item of Object.keys(HHAuto_ToolTips.en)) {
        let reworkedClass = "";
        translatePopUpContent += '  <tr id="' + HtmlIdPrefix + item + '">';
        let currentEnElementText = HHAuto_ToolTips.en[item].elementText;
        if (currentEnElementText === undefined || currentEnElementText === "") {
            currentEnElementText = "";
            translatePopUpContent += '   <td></td><td><div type="elementText"></div></td>';
        }
        else {
            translatePopUpContent += '   <td>' + currentEnElementText + '</td>';
            let currentElementText = HHAuto_ToolTips[currentLanguage][item] ? HHAuto_ToolTips[currentLanguage][item].elementText : "";
            if (currentElementText === undefined) {
                currentElementText = "";
            }
            if (currentElementText !== getTextForUI(item, "elementText")) {
                reworkedClass = " tReworkedCell";
            }
            translatePopUpContent += '   <td><div type="elementText" class="tEditableDiv' + reworkedClass + '" contenteditable>' + currentElementText + '</div></td>';
        }
        reworkedClass = "";
        let currentEnTooltip = HHAuto_ToolTips.en[item].tooltip;
        if (currentEnTooltip === undefined || currentEnTooltip === "") {
            currentEnTooltip = "";
            translatePopUpContent += '   <td></td><td><div type="tooltip"></div></td>';
        }
        else {
            translatePopUpContent += '   <td>' + currentEnTooltip + '</td>';
            let currentTooltip = HHAuto_ToolTips[currentLanguage][item] ? HHAuto_ToolTips[currentLanguage][item].tooltip : "";
            if (currentTooltip === undefined) {
                currentTooltip = "";
            }
            if (currentTooltip !== getTextForUI(item, "tooltip")) {
                reworkedClass = " tReworkedCell";
            }
            translatePopUpContent += '   <td><div type="tooltip" class="tEditableDiv' + reworkedClass + '" contenteditable>' + currentTooltip + '</div></td>';
        }
        translatePopUpContent += '  </tr>';
    }
    translatePopUpContent += ' </tbody>';
    translatePopUpContent += '</table>';
    translatePopUpContent += '<div style="margin:10px"><label style="width:80px" class="myButton" id="saveTranslationAsTxt">' + getTextForUI("saveTranslation", "elementText") + '</label></div>';
    fillHHPopUp("translationPopUp", getTextForUI("translate", "elementText"), translatePopUpContent);
    $("#saveTranslationAsTxt").on("click", saveTranslationAsTxt);
    function saveTranslationAsTxt() {
        //console.log("test");
        let translation = `Translated to : ${currentLanguage}\n`;
        translation += `From version : ${GM_info.version}\n`;
        let hasTranslation = false;
        for (let item of Object.keys(HHAuto_ToolTips.en)) {
            const currentTranslatedElementText = $(`#${HtmlIdPrefix + item} [type="elementText"]`)[0].innerHTML;
            const currentTranslatedTooltip = $(`#${HtmlIdPrefix + item} [type="tooltip"]`)[0].innerHTML;
            let currentElementText = HHAuto_ToolTips[currentLanguage][item] ? HHAuto_ToolTips[currentLanguage][item].elementText : "";
            let currentTooltip = HHAuto_ToolTips[currentLanguage][item] ? HHAuto_ToolTips[currentLanguage][item].tooltip : "";
            if (currentTooltip === undefined) {
                currentTooltip = "";
            }
            if (currentElementText === undefined) {
                currentElementText = "";
            }
            if (currentTranslatedElementText !== currentElementText || currentTranslatedTooltip !== currentTooltip) {
                //console.log(currentTranslatedElementText !== currentElementText, currentElementText, currentTranslatedElementText)
                //console.log(currentTranslatedTooltip !== currentTooltip, currentTooltip, currentTranslatedTooltip)
                const enVersion = HHAuto_ToolTips.en[item].version;
                translation += `HHAuto_ToolTips.${item} = { version: "${enVersion}"`;
                if (currentTranslatedElementText !== "") {
                    translation += `, elementText: "${currentTranslatedElementText}"`;
                }
                if (currentTranslatedTooltip !== "") {
                    translation += `, tooltip: "${currentTranslatedTooltip}"};\n`;
                }
                hasTranslation = true;
            }
        }
        if (hasTranslation) {
            const name = HtmlIdPrefix + currentLanguage + '_' + Date.now() + '.txt';
            const a = document.createElement('a');
            a.download = name;
            a.href = URL.createObjectURL(new Blob([translation], { type: 'text/plain' }));
            a.click();
        }
    }
}

;// CONCATENATED MODULE: ./src/Module/Booster.ts
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





const DEFAULT_BOOSTERS = { normal: [], mythic: [] };
class Booster {
    //all following lines credit:Tom208 OCD script  
    static collectBoostersFromAjaxResponses() {
        $(document).ajaxComplete(function (evt, xhr, opt) {
            if (opt && opt.data && opt.data.search && ~opt.data.search(/(action|class)/)) {
                setTimeout(function () {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (!xhr || !xhr.responseText || !xhr.responseText.length) {
                            return;
                        }
                        const boosterStatus = Booster.getBoosterFromStorage();
                        const response = JSON.parse(xhr.responseText);
                        if (!response || !response.success)
                            return;
                        const searchParams = new URLSearchParams(opt.data);
                        const mappedParams = ['action', 'class', 'type', 'id_item', 'number_of_battles', 'battles_amount'].map(key => ({ [key]: searchParams.get(key) })).reduce((a, b) => Object.assign(a, b), {});
                        const { action, class: className, type, id_item, number_of_battles, battles_amount } = mappedParams;
                        const { success, equipped_booster } = response;
                        if (!success) {
                            return;
                        }
                        if (action === 'market_equip_booster' && type === 'booster') {
                            const idItemParsed = parseInt(id_item || '');
                            //const isMythic = idItemParsed >= 632 && idItemParsed <= 638
                            const isMythic = idItemParsed >= 632;
                            const boosterData = equipped_booster;
                            if (boosterData) {
                                const clonedData = Object.assign({}, boosterData);
                                if (isMythic) {
                                    boosterStatus.mythic.push(clonedData);
                                }
                                else {
                                    boosterStatus.normal.push(Object.assign(Object.assign({}, clonedData), { endAt: clonedData.lifetime }));
                                }
                                setStoredValue(HHStoredVarPrefixKey + 'Temp_boosterStatus', JSON.stringify(boosterStatus));
                                //$(document).trigger('boosters:equipped', {id_item, isMythic, new_id: clonedData.id_member_booster_equipped})
                            }
                            return;
                        }
                        let mythicUpdated = false;
                        let sandalwoodEnded = false;
                        let sandalwood, allMastery, leagueMastery, seasonMastery, headband, watch, cinnamon, perfume;
                        boosterStatus.mythic.forEach(booster => {
                            switch (booster.item.identifier) {
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
                        });
                        if (sandalwood && action === 'do_battles_trolls') {
                            const isMultibattle = parseInt(number_of_battles || '') > 1;
                            const { rewards } = response;
                            if (rewards && rewards.data && rewards.data.shards) {
                                let drops = 0;
                                rewards.data.shards.forEach(({ previous_value, value }) => {
                                    if (isMultibattle) {
                                        // Can't reliably determine how many drops, assume MD where each drop would be 1 shard.
                                        const shardsDropped = value - previous_value;
                                        drops += Math.floor(shardsDropped / 2);
                                    }
                                    else {
                                        drops++;
                                    }
                                });
                                sandalwood.usages_remaining -= drops;
                                mythicUpdated = true;
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
                        boosterStatus.mythic = boosterStatus.mythic.filter(({ usages_remaining }) => usages_remaining > 0);
                        setStoredValue(HHStoredVarPrefixKey + 'Temp_boosterStatus', JSON.stringify(boosterStatus));
                        /*if (mythicUpdated) {
                            $(document).trigger('boosters:updated-mythic')
                        }*/
                        try {
                            if (sandalwood && mythicUpdated && sandalwoodEnded) {
                                const isMultibattle = parseInt(number_of_battles || '') > 1;
                                LogUtils_logHHAuto("sandalwood may be ended need a new one");
                                if (getStoredValue(HHStoredVarPrefixKey + "Setting_plusEventMythic") === "true" && getStoredValue(HHStoredVarPrefixKey + "Setting_plusEventMythicSandalWood") === "true" && EventModule.getEventMythicGirl().is_mythic) {
                                    if (isMultibattle) {
                                        // TODO go to market if sandalwood not ended, continue. If ended, buy a new one
                                        gotoPage(ConfigHelper.getHHScriptVars("pagesIDShop"));
                                    }
                                }
                            }
                        }
                        catch (err) {
                            LogUtils_logHHAuto('Catch error during equip sandalwood for mythic' + err);
                        }
                    });
                }, 200);
            }
        });
    }
    static needBoosterStatusFromStore() {
        const isMythicAutoSandalWood = getStoredValue(HHStoredVarPrefixKey + "Setting_plusEventMythicSandalWood") === "true";
        const isLeagueWithBooster = getStoredValue(HHStoredVarPrefixKey + "Setting_autoLeaguesBoostedOnly") === "true";
        const isSeasonWithBooster = getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonBoostedOnly") === "true";
        const isPantheonWithBooster = getStoredValue(HHStoredVarPrefixKey + "Setting_autoPantheonBoostedOnly") === "true";
        return isLeagueWithBooster || isSeasonWithBooster || isPantheonWithBooster || isMythicAutoSandalWood;
    }
    static getBoosterFromStorage() {
        return isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_boosterStatus")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_boosterStatus")) : DEFAULT_BOOSTERS;
    }
    static haveBoosterEquiped(boosterCode = '') {
        const boosterStatus = Booster.getBoosterFromStorage();
        const serverNow = getHHVars('server_now_ts');
        if (boosterCode == '') {
            // have at least one
            return /*boosterStatus.mythic.length > 0 ||*/ boosterStatus.normal.some((booster) => booster.endAt > serverNow);
        }
        else {
            return boosterStatus.mythic.some((booster) => booster.item.identifier === boosterCode)
                || boosterStatus.normal.some((booster) => booster.item.identifier === boosterCode && booster.endAt > serverNow);
        }
    }
    static collectBoostersFromMarket() {
        const activeSlots = $('#equiped .booster .slot:not(.empty):not(.mythic)').map((i, el) => $(el).data('d')).toArray();
        const activeMythicSlots = $('#equiped .booster .slot:not(.empty).mythic').map((i, el) => $(el).data('d')).toArray();
        const boosterStatus = {
            normal: activeSlots.map((data) => (Object.assign(Object.assign({}, data), { endAt: getHHVars('server_now_ts') + data.expiration }))),
            mythic: activeMythicSlots,
        };
        setStoredValue(HHStoredVarPrefixKey + 'Temp_boosterStatus', JSON.stringify(boosterStatus));
    }
    static needSandalWoodEquipped(nextTrollChoosen) {
        const eventGirl = EventModule.getEventMythicGirl();
        const activated = getStoredValue(HHStoredVarPrefixKey + "Setting_plusEventMythic") === "true" && getStoredValue(HHStoredVarPrefixKey + "Setting_plusEventMythicSandalWood") === "true";
        const correctTrollTargetted = eventGirl.is_mythic && eventGirl.troll_id == nextTrollChoosen;
        const ownedSandalwood = HeroHelper.haveBoosterInInventory(Booster.SANDALWOOD_PERFUME.identifier);
        if (activated && correctTrollTargetted && !Booster.haveBoosterEquiped(Booster.SANDALWOOD_PERFUME.identifier) && ownedSandalwood) {
            const remainingShards = Number(100 - Number(eventGirl.shards));
            if (remainingShards > 10) {
                return true;
            }
            else {
                LogUtils_logHHAuto("Less than 10 shards, do not equip Sandalwood to avoid loss");
            }
        }
        return false;
    }
    static equipeSandalWoodIfNeeded(nextTrollChoosen) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (Booster.needSandalWoodEquipped(nextTrollChoosen)) {
                    // Equip a new one
                    const equiped = yield HeroHelper.equipBooster(Booster.SANDALWOOD_PERFUME);
                    if (!equiped) {
                        const numberFailure = HeroHelper.getSandalWoodEquipFailure();
                        if (numberFailure >= 3) {
                            LogUtils_logHHAuto("Failure when equip Sandalwood for mythic for the third time, deactivated auto sandalwood");
                            setStoredValue(HHStoredVarPrefixKey + "Setting_plusEventMythicSandalWood", 'false');
                        }
                        else
                            LogUtils_logHHAuto("Failure when equip Sandalwood for mythic");
                    }
                    return equiped;
                }
            }
            catch (error) {
                return Promise.resolve(false);
            }
            return Promise.resolve(false);
        });
    }
}
Booster.GINSENG_ROOT = { "id_item": "316", "identifier": "B1", "name": "Ginseng root", "rarity": "legendary" };
Booster.SANDALWOOD_PERFUME = { "id_item": "632", "identifier": "MB1", "name": "Sandalwood perfume", "rarity": "mythic" };

;// CONCATENATED MODULE: ./src/Module/Bundles.ts




class Bundles {
    static goAndCollectFreeBundles() {
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDHome")) {
            try {
                if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoFreeBundlesCollect") !== "true") {
                    LogUtils_logHHAuto("Error autoFreeBundlesCollect not activated.");
                    return;
                }
                const plusButton = $("header .currency .reversed_tooltip");
                if (plusButton.length > 0) {
                    LogUtils_logHHAuto("click button for popup.");
                    plusButton[0].click();
                }
                else {
                    LogUtils_logHHAuto("No button for popup. Try again in 5h.");
                    setTimer('nextFreeBundlesCollectTime', randomInterval(4 * 60 * 60, 6 * 60 * 60));
                    return false;
                }
                LogUtils_logHHAuto("setting autoloop to false");
                setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                const bundleTabsContainerQuery = "#popups .payments-wrapper .payment-tabs";
                const bundleTabsListQuery = '.event_bundles, .special_offers, .period_deal';
                const subTabsQuery = "#popups .payments-wrapper .content-container .subtabs-container .card-container";
                const freeButtonBundleQuery = "#popups .payments-wrapper .bundle .bundle-offer-price .blue_button_L:enabled[price='0.00']";
                function collectFreeBundlesFinished(message, nextFreeBundlesCollectTime) {
                    LogUtils_logHHAuto(message);
                    setTimer('nextFreeBundlesCollectTime', nextFreeBundlesCollectTime);
                    $("#popups .close_cross").trigger('click'); // Close popup
                    setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "true");
                    LogUtils_logHHAuto("setting autoloop to true");
                    setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey + "Temp_autoLoopTimeMili")));
                }
                function parseAndCollectFreeBundles() {
                    const freeBundlesNumber = $(freeButtonBundleQuery).length;
                    if (freeBundlesNumber > 0) {
                        LogUtils_logHHAuto("Free Bundles found: " + freeBundlesNumber);
                        let buttonsToCollect = [];
                        for (let currentBundle = 0; currentBundle < freeBundlesNumber; currentBundle++) {
                            buttonsToCollect.push($(freeButtonBundleQuery)[currentBundle]);
                        }
                        function collectFreeBundle() {
                            if (buttonsToCollect.length > 0) {
                                LogUtils_logHHAuto("Collecting bundle n°" + buttonsToCollect[0].getAttribute('product'));
                                buttonsToCollect[0].click();
                                buttonsToCollect.shift();
                                setTimeout(RewardHelper.closeRewardPopupIfAny, randomInterval(500, 800));
                                setTimeout(switchToBundleTabs, randomInterval(1500, 2500));
                            }
                        }
                        collectFreeBundle();
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                function switchToBundleTabs() {
                    const bundleTabs = $(bundleTabsListQuery, $(bundleTabsContainerQuery));
                    if (bundleTabs.length > 0) {
                        let freeBundleFound = false;
                        for (let bundleIndex = 0; bundleIndex < bundleTabs.length && !freeBundleFound; bundleIndex++) {
                            bundleTabs[bundleIndex].click();
                            LogUtils_logHHAuto("Looking in tabs '" + $(bundleTabs[bundleIndex]).attr('type') + "'.");
                            freeBundleFound = parseAndCollectFreeBundles();
                            if (!freeBundleFound && $(subTabsQuery).length > 0) {
                                const subTabs = $(subTabsQuery);
                                LogUtils_logHHAuto("Sub tabs found, switching to next one");
                                for (let subTabIndex = 1; subTabIndex < subTabs.length && !freeBundleFound; subTabIndex++) {
                                    subTabs[subTabIndex].click();
                                    LogUtils_logHHAuto("Looking in sub tabs '" + $(subTabs[subTabIndex]).attr('period_deal') + "'.");
                                    freeBundleFound = parseAndCollectFreeBundles();
                                }
                            }
                        }
                        if (!freeBundleFound)
                            collectFreeBundlesFinished("Free bundle collection finished.", TimeHelper.getSecondsLeftBeforeEndOfHHDay() + randomInterval(3600, 4000));
                    }
                    else {
                        collectFreeBundlesFinished("No bundle tabs in popup, wait one hour.", 60 * 60);
                        return false;
                    }
                }
                // Wait popup is opened
                setTimeout(switchToBundleTabs, randomInterval(1400, 1800));
                return true;
            }
            catch ({ errName, message }) {
                LogUtils_logHHAuto(`ERROR during free bundles run: ${message}, retry in 1h`);
                setTimer('nextFreeBundlesCollectTime', randomInterval(3600, 4000));
                return false;
            }
        }
        else {
            LogUtils_logHHAuto("Navigating to home page.");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
            // return busy
            return true;
        }
    }
}

;// CONCATENATED MODULE: ./src/Module/Events/BossBang.ts




class BossBang {
    static skipFightPage() {
        const rewardsButton = $('#rewards_popup .blue_button_L:not([disabled]):visible');
        const skipFightButton = $('#battle #new-battle-skip-btn:not([disabled]):visible');
        if (rewardsButton.length > 0) {
            LogUtils_logHHAuto("Click get rewards bang fight");
            rewardsButton.trigger('click');
            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
        }
        else if (skipFightButton.length > 0) {
            LogUtils_logHHAuto("Click skip boss bang fight");
            skipFightButton.trigger('click');
            setTimeout(BossBang.skipFightPage, randomInterval(1300, 1900));
            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
        }
    }
    static goToFightPage() {
        const teamIndexFound = parseInt(getStoredValue(HHStoredVarPrefixKey + "Temp_bossBangTeam"));
        let bangButton = $('#contains_all #events #boss_bang .boss-bang-event-info #start-bang-button:not([disabled])');
        if (teamIndexFound >= 0 && bangButton.length > 0) {
            gotoPage(bangButton.attr('href'));
        }
    }
}

;// CONCATENATED MODULE: ./src/Module/Events/DoublePenetration.ts




class DoublePenetration {
    static goAndCollect(dpRemainingTime, manualCollectAll = false) {
        try {
            const rewardsToCollect = isJSON(getStoredValue(HHStoredVarPrefixKey + "Setting_autodpEventCollectablesList")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Setting_autodpEventCollectablesList")) : [];
            const needToCollectAll = dpRemainingTime < getLimitTimeBeforeEnd() && getStoredValue(HHStoredVarPrefixKey + "Setting_autodpEventCollectAll") === "true";
            const needToCollect = (checkTimer('nextDpEventCollectTime') && getStoredValue(HHStoredVarPrefixKey + "Setting_autodpEventCollect") === "true");
            const dPTierQuery = "#dp-content .tiers-container .player-progression-container .tier-container:has(button.display-block)";
            const dPFreeSlotQuery = ".free-slot .slot,.free-slot .slot_girl_shards";
            const dPPaidSlotQuery = ".paid-slot .slot,.paid-slot .slot_girl_shards";
            const isPassPaid = $("#nc-poa-tape-blocker button.unlock-poa-bonus-rewards:visible").length <= 0;
            if (needToCollect || needToCollectAll || manualCollectAll) {
                LogUtils_logHHAuto("Checking double penetration event for collectable rewards.");
                LogUtils_logHHAuto("setting autoloop to false");
                setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                let buttonsToCollect = [];
                const listDpEventTiersToClaim = $(dPTierQuery);
                for (let currentTier = 0; currentTier < listDpEventTiersToClaim.length; currentTier++) {
                    const currentButton = $("button[rel='reward-claim']", listDpEventTiersToClaim[currentTier])[0];
                    const currentTierNb = currentButton.getAttribute("tier");
                    //console.log("checking tier : "+currentTierNb);
                    if (needToCollectAll) {
                        LogUtils_logHHAuto("Adding for collection tier before end of event: " + currentTierNb);
                        buttonsToCollect.push(currentButton);
                    }
                    else if (manualCollectAll) {
                        LogUtils_logHHAuto("Adding for collection tier from manual collect all: " + currentTierNb);
                        buttonsToCollect.push(currentButton);
                    }
                    else {
                        const freeSlotType = RewardHelper.getRewardTypeBySlot($(dPFreeSlotQuery, listDpEventTiersToClaim[currentTier])[0]);
                        if (rewardsToCollect.includes(freeSlotType)) {
                            if (isPassPaid) {
                                // One button for both
                                const paidSlotType = RewardHelper.getRewardTypeBySlot($(dPPaidSlotQuery, listDpEventTiersToClaim[currentTier])[0]);
                                if (rewardsToCollect.includes(paidSlotType)) {
                                    buttonsToCollect.push(currentButton);
                                    LogUtils_logHHAuto("Adding for collection tier (free + paid) : " + currentTierNb);
                                }
                                else {
                                    LogUtils_logHHAuto("Can't add tier " + currentTierNb + " as paid reward isn't to be colled");
                                }
                            }
                            else {
                                buttonsToCollect.push(currentButton);
                                LogUtils_logHHAuto("Adding for collection tier (only free) : " + currentTierNb);
                            }
                        }
                    }
                }
                if (buttonsToCollect.length > 0) {
                    function collectDpEventRewards() {
                        if (buttonsToCollect.length > 0) {
                            LogUtils_logHHAuto("Collecting tier : " + buttonsToCollect[0].getAttribute('tier'));
                            buttonsToCollect[0].click();
                            buttonsToCollect.shift();
                            setTimeout(RewardHelper.closeRewardPopupIfAny, randomInterval(300, 500));
                            setTimeout(collectDpEventRewards, randomInterval(500, 800));
                        }
                        else {
                            LogUtils_logHHAuto("Double penetration collection finished.");
                            setTimer('nextDpEventCollectTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180));
                            //gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "true");
                            setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey + "Temp_autoLoopTimeMili")));
                        }
                    }
                    collectDpEventRewards();
                    return true;
                }
                else {
                    LogUtils_logHHAuto("No double penetration reward to collect.");
                    setTimer('nextDpEventCollectTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180));
                    //gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                    setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "true");
                    setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey + "Temp_autoLoopTimeMili")));
                    return false;
                }
            }
            return true;
        }
        catch ({ errName, message }) {
            LogUtils_logHHAuto(`ERROR during collect DP rewards: ${message}`);
        }
        return false;
    }
    static run() {
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDEvent") && window.location.search.includes("tab=" + ConfigHelper.getHHScriptVars('doublePenetrationEventIDReg'))) {
            LogUtils_logHHAuto("On Double penetration event.");
            if (getStoredValue(HHStoredVarPrefixKey + "Setting_showClubButtonInPoa") === "true" && ConfigHelper.getHHScriptVars("isEnabledClubChamp", false)) {
                GM_addStyle('#dp-content .left-container .objectives-container .hard-objective .nc-sub-panel div.buttons .redirect-buttons {flex-direction: column;}');
                if ($(".hard-objective .hh-club-poa").length <= 0) {
                    const championsGoal = $('.hard-objective .redirect-buttons:has(button[data-href="/champions-map.html"])');
                    championsGoal.append(getGoToClubChampionButton());
                }
                if ($(".easy-objective .hh-club-poa").length <= 0) {
                    const championsGoal = $('.easy-objective .redirect-buttons:has(button[data-href="/champions-map.html"])');
                    championsGoal.append(getGoToClubChampionButton());
                }
            }
            if (getStoredValue(HHStoredVarPrefixKey + "Setting_showRewardsRecap") === "true") {
                DoublePenetration.displayRewardsDiv();
                DoublePenetration.displayCollectAllButton();
            }
        }
    }
    static hasUnclaimedRewards() {
        return $(".tier-container button.purple_button_L:visible").length > 0;
    }
    static displayRewardsDiv() {
        try {
            const target = $('#dp-content .right-container');
            const hhRewardId = 'HHDpRewards';
            if ($('#' + hhRewardId).length <= 0) {
                const rewardCountByType = DoublePenetration.getNotClaimedRewards();
                RewardHelper.displayRewardsDiv(target, hhRewardId, rewardCountByType);
            }
        }
        catch ({ errName, message }) {
            LogUtils_logHHAuto(`ERROR in display DP rewards: ${message}`);
        }
    }
    static getNotClaimedRewards() {
        const arrayz = $('#dp-content .tier-container:has(.tier-level button[rel="reward-claim"]:visible)');
        const freeSlotSelectors = ".free-slot .slot";
        let paidSlotSelectors = "";
        if ($("div#nc-poa-tape-blocker").length == 0) {
            // Season pass paid
            paidSlotSelectors = ".paid-slot  .slot";
        }
        return RewardHelper.computeRewardsCount(arrayz, freeSlotSelectors, paidSlotSelectors);
    }
    static displayCollectAllButton() {
        if (DoublePenetration.hasUnclaimedRewards() && $('#dpCollectAll').length == 0) {
            const button = $(`<button class="purple_button_L" style="padding:0px 5px" id="dpCollectAll">${getTextForUI("collectAllButton", "elementText")}</button>`);
            const divTooltip = $(`<div class="tooltipHH" style="position: absolute;top: 135px;width: 80px;font-size: small; z-index:5"><span class="tooltipHHtext">${getTextForUI("collectAllButton", "tooltip")}</span></div>`);
            divTooltip.append(button);
            $('#dp-content .tiers-container .player-potions').append(divTooltip);
            button.one('click', () => {
                DoublePenetration.goAndCollect(Infinity, true);
            });
        }
    }
}

;// CONCATENATED MODULE: ./src/Module/Events/PathOfAttraction.ts
var PathOfAttraction_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




class PoaReward {
    constructor(tier, type, slot) {
        this.tier = 0;
        this.type = '';
        this.slot = $();
        this.tier = tier;
        this.type = type;
        this.slot = slot;
    }
}
class PathOfAttraction {
    static getRemainingTime() {
        const poATimerRequest = '#events .nc-panel-header .event-timer span[rel=expires]';
        if ($(poATimerRequest).length > 0 && (getSecondsLeft("PoARemainingTime") === 0 || getStoredValue(HHStoredVarPrefixKey + "Temp_PoAEndDate") === undefined)) {
            const poATimer = Number(convertTimeToInt($(poATimerRequest).text()));
            setTimer("PoARemainingTime", poATimer);
            setStoredValue(HHStoredVarPrefixKey + "Temp_PoAEndDate", Math.ceil(new Date().getTime() / 1000) + poATimer);
        }
    }
    static runOld() {
        //https://nutaku.haremheroes.com/path-of-attraction.html"
        let array = $('#path_of_attraction div.poa.container div.all-objectives .objective.completed');
        if (array.length == 0) {
            return;
        }
        let lengthNeeded = $('.golden-block.locked').length > 0 ? 1 : 2;
        for (let i = array.length - 1; i >= 0; i--) {
            if ($(array[i]).find('.picked-reward').length == lengthNeeded) {
                array[i].style.display = "none";
            }
        }
    }
    static run() {
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDEvent") && ConfigHelper.getHHScriptVars("isEnabledClubChamp", false) && window.location.search.includes("tab=" + ConfigHelper.getHHScriptVars('poaEventIDReg'))) {
            LogUtils_logHHAuto("On path of attraction event.");
            if ($(".hh-club-poa").length <= 0) {
                const championsGoal = $('#poa-content .buttons:has(button[data-href="/champions-map.html"])');
                championsGoal.append(getGoToClubChampionButton());
            }
        }
    }
    static styles() {
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_PoAMaskRewards") === "true") {
            setTimeout(PathOfAttraction.Hide, 500);
        }
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_showRewardsRecap") === "true") {
            PathOfAttraction.displayRewardsDiv();
        }
        PathOfAttraction.displayCollectAllButton();
    }
    static displayCollectAllButton() {
        if (PathOfAttraction.hasUnclaimedRewards() && $('#PoaCollectAll').length == 0) {
            const button = $(`<button class="purple_button_L" style="padding:0px 5px" id="PoaCollectAll">${getTextForUI("collectAllButton", "elementText")}</button>`);
            const divTooltip = $(`<div class="tooltipHH" style="position: absolute;top: -30px;left: 730px;width: 110px;font-size: small; z-index:5"><span class="tooltipHHtext">${getTextForUI("collectAllButton", "tooltip")}</span></div>`);
            divTooltip.append(button);
            $('#poa-content').append(divTooltip);
            button.one('click', () => {
                PathOfAttraction.goAndCollect(true);
            });
        }
    }
    static displayRewardsDiv() {
        try {
            const target = $('#poa-content .girls');
            const hhRewardId = 'HHPoaRewards';
            if ($('#' + hhRewardId).length <= 0) {
                const rewardCountByType = PathOfAttraction.getNotClaimedRewards();
                RewardHelper.displayRewardsDiv(target, hhRewardId, rewardCountByType);
            }
        }
        catch ({ errName, message }) {
            LogUtils_logHHAuto(`ERROR in display POA rewards: ${message}`);
        }
    }
    static getNotClaimedRewards() {
        const arrayz = $('.nc-poa-reward-pair');
        const freeSlotSelectors = ".nc-poa-free-reward.claimable .slot";
        let paidSlotSelectors = "";
        if ($("div#nc-poa-tape-blocker").length == 0) {
            // Season pass paid
            paidSlotSelectors = ".nc-poa-locked-reward.claimable .slot";
        }
        return RewardHelper.computeRewardsCount(arrayz, freeSlotSelectors, paidSlotSelectors);
    }
    static _getClaimableRewards(path) {
        const rewards = [];
        const listPoATiersToClaim = $(path);
        for (let currentTier = 0; currentTier < listPoATiersToClaim.length; currentTier++) {
            const currentRewardTierNb = listPoATiersToClaim[currentTier].getAttribute("data-nc-reward-id");
            const slotElement = $('.slot', listPoATiersToClaim[currentTier]);
            const slotType = RewardHelper.getRewardTypeBySlot(slotElement[0]);
            rewards[currentRewardTierNb] = new PoaReward(Number(currentRewardTierNb), slotType, slotElement);
        }
        return rewards;
    }
    static hasUnclaimedRewards() {
        return $(PathOfAttraction.freeSlotPath + ".claimable" + ', ' + PathOfAttraction.paidSlotPath + ".claimable").length > 0;
    }
    static getFreeClaimableRewards() {
        return PathOfAttraction._getClaimableRewards(PathOfAttraction.freeSlotPath + ".claimable");
    }
    static getPaidClaimableRewards() {
        if ($("#nc-poa-tape-blocker").length) {
            return [];
        }
        else {
            return PathOfAttraction._getClaimableRewards(PathOfAttraction.paidSlotPath + ".claimable");
        }
    }
    static isCompleted() {
        const numberTiers = $(PathOfAttraction.rewardPairTierPath).length;
        const numberClaimedFree = $(PathOfAttraction.freeSlotPath + ".claimed").length;
        const numberClaimedPaid = $(PathOfAttraction.paidSlotPath + ".claimed").length;
        if ($("#nc-poa-tape-blocker").length) {
            return numberClaimedFree >= numberTiers;
        }
        else {
            return numberClaimedFree >= numberTiers && numberClaimedPaid >= numberTiers;
        }
    }
    static goAndCollect(manualCollectAll = false) {
        return PathOfAttraction_awaiter(this, void 0, void 0, function* () {
            const debugEnabled = getStoredValue(HHStoredVarPrefixKey + "Temp_Debug") === 'true';
            const needToCollect = getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoACollect") === "true";
            const needToCollectAllBeforeEnd = getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoACollectAll") === "true";
            if (manualCollectAll)
                setStoredValue(HHStoredVarPrefixKey + "Temp_poaManualCollectAll", 'true');
            if (needToCollect || needToCollectAllBeforeEnd || manualCollectAll) {
                const rewardsToCollect = isJSON(getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoACollectablesList")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoACollectablesList")) : [];
                LogUtils_logHHAuto("Checking Path of Attraction for collectable rewards.");
                const numberTiers = $(PathOfAttraction.rewardPairTierPath).length;
                const freeClaimableRewards = PathOfAttraction.getFreeClaimableRewards();
                const paidClaimableRewards = PathOfAttraction.getPaidClaimableRewards();
                function getReward(reward) {
                    return PathOfAttraction_awaiter(this, void 0, void 0, function* () {
                        LogUtils_logHHAuto("Going to get " + JSON.stringify(reward));
                        reward.slot.trigger('click');
                        yield TimeHelper.sleep(randomInterval(300, 800));
                        $(PathOfAttraction.getRewardButtonPath).trigger('click');
                        yield TimeHelper.sleep(randomInterval(300, 800));
                        RewardHelper.closeRewardPopupIfAny(); // Will refresh the page
                        yield TimeHelper.sleep(randomInterval(500, 1000)); // Do not collect before page refresh
                    });
                }
                LogUtils_logHHAuto("numberTiers: " + numberTiers);
                if (debugEnabled) {
                    LogUtils_logHHAuto("freeClaimableRewards", freeClaimableRewards);
                    LogUtils_logHHAuto("paidClaimableRewards", paidClaimableRewards);
                }
                const freeClaimableTiers = Object.keys(freeClaimableRewards);
                const paidClaimableTiers = Object.keys(paidClaimableRewards);
                if (numberTiers > 0 && (freeClaimableTiers.length > 0 || paidClaimableTiers.length > 0)) {
                    LogUtils_logHHAuto("Collecting rewards, setting autoloop to false");
                    setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                    $(".scroll-area.poa").animate({ scrollLeft: 0 });
                    yield TimeHelper.sleep(randomInterval(300, 800));
                    for (let currentTier = 1; currentTier <= numberTiers; currentTier++) {
                        if (freeClaimableTiers.includes('' + currentTier)) {
                            if (rewardsToCollect.includes(freeClaimableRewards[currentTier].type) || needToCollectAllBeforeEnd || manualCollectAll) {
                                yield getReward(freeClaimableRewards[currentTier]);
                                return true;
                            }
                        }
                        if (paidClaimableTiers.includes('' + currentTier)) {
                            if (rewardsToCollect.includes(paidClaimableRewards[currentTier].type) || needToCollectAllBeforeEnd || manualCollectAll) {
                                yield getReward(paidClaimableRewards[currentTier]);
                                return true;
                            }
                        }
                    }
                    LogUtils_logHHAuto("Path of Attraction collection finished.");
                    setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "true");
                    setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey + "Temp_autoLoopTimeMili")));
                    return true;
                }
                else {
                    LogUtils_logHHAuto("No Path of Attraction reward to collect.");
                    setStoredValue(HHStoredVarPrefixKey + "Temp_poaManualCollectAll", 'false');
                }
            }
            return false;
        });
    }
    static Hide() {
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDEvent") && window.location.search.includes("tab=" + ConfigHelper.getHHScriptVars('poaEventIDReg')) && getStoredValue(HHStoredVarPrefixKey + "Setting_PoAMaskRewards") === "true") {
            let arrayz;
            let nbReward;
            let modified = false;
            arrayz = $('.nc-poa-reward-pair:not([style*="display:none"]):not([style*="display: none"])');
            if ($("#nc-poa-tape-blocker").length) {
                nbReward = 1;
            }
            else {
                nbReward = 2;
            }
            var obj;
            if (arrayz.length > 0) {
                for (var i2 = arrayz.length - 1; i2 >= 0; i2--) {
                    obj = $(arrayz[i2]).find('.nc-poa-reward-container.claimed');
                    if (obj.length >= nbReward) {
                        //console.log("scroll before : "+document.getElementById('rewards_cont_scroll').scrollLeft);
                        //console.log("width : "+arrayz[i2].offsetWidth);
                        $("#events .nc-panel-body .scroll-area")[0].scrollLeft -= arrayz[i2].offsetWidth;
                        //console.log("scroll after : "+document.getElementById('rewards_cont_scroll').scrollLeft);arrayz[i2].style.display = "none";
                        arrayz[i2].style.display = "none";
                        modified = true;
                    }
                }
            }
        }
    }
}
PathOfAttraction.rewardPairTierPath = "#nc-poa-tape-rewards .nc-poa-reward-pair .nc-poa-step-indicator";
PathOfAttraction.freeSlotPath = "#nc-poa-tape-rewards .nc-poa-reward-pair .nc-poa-free-reward";
PathOfAttraction.paidSlotPath = "#nc-poa-tape-rewards .nc-poa-reward-pair .nc-poa-locked-reward";
PathOfAttraction.getRewardButtonPath = "#poa-content .objective .reward button.purple_button_L";

;// CONCATENATED MODULE: ./src/Module/Events/SultryMysteries.ts

class SultryMysteries {
    static isEnabled() {
        return getHHVars('Hero.infos.level') >= ConfigHelper.getHHScriptVars("LEVEL_MIN_EVENT_SM");
    }
}

;// CONCATENATED MODULE: ./src/Module/Events/EventModule.ts








class EventModule {
    static clearEventData(inEventID) {
        //clearTimer('eventMythicNextWave');
        //clearTimer('eventRefreshExpiration');
        //sessionStorage.removeItem(HHStoredVarPrefixKey+'Temp_EventFightsBeforeRefresh');
        let eventList = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsList")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsList")) : {};
        let eventsGirlz = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsGirlz")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsGirlz")) : [];
        let eventGirl = EventModule.getEventGirl();
        let eventMythicGirl = EventModule.getEventMythicGirl();
        let eventChamps = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_autoChampsEventGirls")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_autoChampsEventGirls")) : [];
        let hasMythic = false;
        let hasEvent = false;
        for (let prop of Object.keys(eventList)) {
            if (eventList[prop]["seconds_before_end"] < new Date()
                ||
                    (eventList[prop]["type"] === 'mythic' && getStoredValue(HHStoredVarPrefixKey + "Setting_plusEventMythic") !== "true")
                ||
                    (eventList[prop]["type"] === 'event' && getStoredValue(HHStoredVarPrefixKey + "Setting_plusEvent") !== "true")
                ||
                    (eventList[prop]["type"] === 'bossBang' && getStoredValue(HHStoredVarPrefixKey + "Setting_bossBangEvent") !== "true")
                ||
                    (eventList[prop]["type"] === 'sultryMysteries' && getStoredValue(HHStoredVarPrefixKey + "Setting_sultryMysteriesEventRefreshShop") !== "true")) {
                delete eventList[prop];
            }
            else {
                if (!eventList[prop]["isCompleted"]) {
                    if (eventList[prop]["isMythic"]) {
                        hasMythic = true;
                    }
                    else {
                        hasEvent = true;
                    }
                }
            }
        }
        if (hasMythic === false) {
            clearTimer('eventMythicNextWave');
            clearTimer('eventMythicGoing');
        }
        if (hasEvent === false) {
            clearTimer('eventGoing');
        }
        if (Object.keys(eventList).length === 0) {
            sessionStorage.removeItem(HHStoredVarPrefixKey + 'Temp_eventsGirlz');
            sessionStorage.removeItem(HHStoredVarPrefixKey + 'Temp_eventGirl');
            sessionStorage.removeItem(HHStoredVarPrefixKey + 'Temp_eventMythicGirl');
            sessionStorage.removeItem(HHStoredVarPrefixKey + 'Temp_eventsList');
            sessionStorage.removeItem(HHStoredVarPrefixKey + 'Temp_autoChampsEventGirls');
        }
        else {
            //console.log(JSON.stringify(eventChamps));
            eventChamps = eventChamps.filter(function (a) {
                if (!eventList.hasOwnProperty(a.event_id) || a.event_id === inEventID) {
                    return false;
                }
                else {
                    return true;
                }
            });
            if (Object.keys(eventChamps).length === 0) {
                sessionStorage.removeItem(HHStoredVarPrefixKey + 'Temp_autoChampsEventGirls');
            }
            else {
                setStoredValue(HHStoredVarPrefixKey + "Temp_autoChampsEventGirls", JSON.stringify(eventChamps));
            }
            eventsGirlz = eventsGirlz.filter(function (a) {
                if (!eventList.hasOwnProperty(a.event_id) || a.event_id === inEventID) {
                    return false;
                }
                else {
                    return true;
                }
            });
            if (Object.keys(eventsGirlz).length === 0) {
                sessionStorage.removeItem(HHStoredVarPrefixKey + 'Temp_eventsGirlz');
            }
            else {
                setStoredValue(HHStoredVarPrefixKey + "Temp_eventsGirlz", JSON.stringify(eventsGirlz));
            }
            if (!eventList.hasOwnProperty(eventGirl.event_id) || eventGirl.event_id === inEventID) {
                sessionStorage.removeItem(HHStoredVarPrefixKey + 'Temp_eventGirl');
            }
            if (!eventList.hasOwnProperty(eventMythicGirl.event_id) || eventMythicGirl.event_id === inEventID) {
                sessionStorage.removeItem(HHStoredVarPrefixKey + 'Temp_eventMythicGirl');
            }
            setStoredValue(HHStoredVarPrefixKey + "Temp_eventsList", JSON.stringify(eventList));
        }
    }
    static getDisplayedIdEventPage(logging = true) {
        let eventHref = $("#contains_all #events .events-list .event-title.active").attr("href") || '';
        if (!eventHref && logging) {
            LogUtils_logHHAuto('Error href not found for current event');
        }
        if (eventHref) {
            let parsedURL = new URL(eventHref, window.location.origin);
            return queryStringGetParam(parsedURL.search, 'tab') || '';
        }
        return '';
    }
    static showCompletedEvent() {
        try {
            let oneEventCompleted = false;
            if ($('img.eventCompleted').length <= 0 && $(`#contains_all #homepage .event-widget a:not([href="#"])`).length > 0) {
                const img = $(`<div class="tooltipHH" style="display: inline-block;">`
                    + `<span class="tooltipHHtext">${getTextForUI('eventCompleted', "tooltip")}</span>`
                    + `<img src=${ConfigHelper.getHHScriptVars("powerCalcImages")['plus']} class="eventCompleted" title="${getTextForUI('eventCompleted', "tooltip")}" />`
                    + `</div>`);
                const eventList = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsList")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsList")) : {};
                for (let eventID of Object.keys(eventList)) {
                    if (eventList[eventID]["isCompleted"]) {
                        const eventTimer = $(`#contains_all #homepage .event-widget a[href*="${eventID}"] .timer p`);
                        eventTimer.append(img);
                        oneEventCompleted = true;
                    }
                }
            }
            if (!oneEventCompleted) {
                const eventTimer = $(`#contains_all #homepage`);
                eventTimer.append($(`<img src=${ConfigHelper.getHHScriptVars("powerCalcImages")['minus']} class="eventCompleted" style="display:none" />`));
            }
        }
        catch (error) { /* ignore errors */ }
    }
    static parseEventPage(inTab = "global") {
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDEvent")) {
            let queryEventTabCheck = $("#contains_all #events");
            const eventID = EventModule.getDisplayedIdEventPage();
            if (inTab !== "global" && inTab !== eventID) {
                if (eventID == '') {
                    LogUtils_logHHAuto("ERROR: No event Id found in current page, clear event data and go to home");
                    EventModule.clearEventData(inTab);
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                }
                else {
                    LogUtils_logHHAuto("Wrong event opened, need to change event page");
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDEvent"), { tab: inTab });
                }
                return true;
            }
            const hhEvent = EventModule.getEvent(eventID);
            if (!hhEvent.eventTypeKnown) {
                if (queryEventTabCheck.attr('parsed') === undefined) {
                    LogUtils_logHHAuto("Not parsable event");
                    queryEventTabCheck[0].setAttribute('parsed', 'true');
                }
                return false;
            }
            if (queryEventTabCheck.attr('parsed') !== undefined) {
                if (!EventModule.checkEvent(eventID)) {
                    //logHHAuto("Events already parsed.");
                    return false;
                }
            }
            queryEventTabCheck[0].setAttribute('parsed', 'true');
            LogUtils_logHHAuto("On event page : " + eventID);
            EventModule.clearEventData(eventID);
            //let eventsGirlz=[];
            let eventList = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsList")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsList")) : {};
            let eventsGirlz = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsGirlz")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsGirlz")) : [];
            let eventChamps = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_autoChampsEventGirls")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_autoChampsEventGirls")) : [];
            let Priority = (getStoredValue(HHStoredVarPrefixKey + "Setting_eventTrollOrder") || '').split(";");
            const hhEventData = unsafeWindow.event_data;
            if ((hhEvent.isPlusEvent || hhEvent.isPlusEventMythic) && !hhEventData) {
                LogUtils_logHHAuto("Error getting current event Data from HH.");
            }
            let refreshTimer = randomInterval(3600, 4000);
            if (hhEvent.isPlusEvent) {
                LogUtils_logHHAuto("On going event.");
                let timeLeft = $('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
                if (timeLeft !== undefined && timeLeft.length) {
                    setTimer('eventGoing', Number(convertTimeToInt(timeLeft)));
                }
                else
                    setTimer('eventGoing', refreshTimer);
                eventList[eventID] = {};
                eventList[eventID]["id"] = eventID;
                eventList[eventID]["type"] = hhEvent.eventType;
                eventList[eventID]["seconds_before_end"] = new Date().getTime() + Number(convertTimeToInt(timeLeft)) * 1000;
                eventList[eventID]["next_refresh"] = new Date().getTime() + refreshTimer * 1000;
                eventList[eventID]["isCompleted"] = true;
                let allEventGirlz = hhEventData ? hhEventData.girls : [];
                for (let currIndex = 0; currIndex < allEventGirlz.length; currIndex++) {
                    let girlData = allEventGirlz[currIndex];
                    if (girlData.shards < 100) {
                        eventList[eventID]["isCompleted"] = false;
                        const eventGirl = new EventGirl(girlData, eventID, eventList[eventID]["seconds_before_end"]);
                        if (eventGirl.isOnTroll()) {
                            LogUtils_logHHAuto(`Event girl : ${eventGirl.toString()} with priority : ${Priority.indexOf('' + eventGirl.troll_id)}`, eventGirl);
                            eventsGirlz.push(eventGirl);
                        }
                        if (eventGirl.isOnChampion()) {
                            LogUtils_logHHAuto(`Event girl : ${eventGirl.toString()}`, eventGirl);
                            eventChamps.push(eventGirl);
                        }
                    }
                }
                if (eventList[eventID]["isCompleted"]) {
                    EventModule.collectEventChestIfPossible();
                }
            }
            if (hhEvent.isPlusEventMythic) {
                LogUtils_logHHAuto("On going mythic event.");
                let timeLeft = $('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
                if (timeLeft !== undefined && timeLeft.length) {
                    setTimer('eventMythicGoing', Number(convertTimeToInt(timeLeft)));
                }
                else
                    setTimer('eventMythicGoing', refreshTimer);
                eventList[eventID] = {};
                eventList[eventID]["id"] = eventID;
                eventList[eventID]["type"] = hhEvent.eventType;
                eventList[eventID]["isMythic"] = true;
                eventList[eventID]["seconds_before_end"] = new Date().getTime() + Number(convertTimeToInt(timeLeft)) * 1000;
                eventList[eventID]["next_refresh"] = new Date().getTime() + refreshTimer * 1000;
                eventList[eventID]["isCompleted"] = true;
                let allEventGirlz = hhEventData ? hhEventData.girls : [];
                for (let currIndex = 0; currIndex < allEventGirlz.length; currIndex++) {
                    let girlData = allEventGirlz[currIndex];
                    let ShardsQuery = '#events .nc-panel .nc-panel-body .nc-event-reward-container .nc-events-prize-locations-container .shards-info span.number';
                    let timerQuery = '#events .nc-panel .nc-panel-body .nc-event-reward-container .nc-events-prize-locations-container .shards-info span.timer';
                    if ($(ShardsQuery).length > 0) {
                        let remShards = Number($(ShardsQuery)[0].innerText);
                        let nextWave = ($(timerQuery).length > 0) ? convertTimeToInt($(timerQuery)[0].innerText) : -1;
                        if (girlData.shards < 100) {
                            eventList[eventID]["isCompleted"] = false;
                            if (nextWave === -1) {
                                clearTimer('eventMythicNextWave');
                            }
                            else {
                                setTimer('eventMythicNextWave', nextWave);
                            }
                            const eventGirl = new EventGirl(girlData, eventID, eventList[eventID]["seconds_before_end"], true);
                            if (remShards !== 0) {
                                if (eventGirl.isOnTroll()) {
                                    LogUtils_logHHAuto(`Event girl : ${eventGirl.toString()} with priority : ${Priority.indexOf('' + eventGirl.troll_id)}`, eventGirl);
                                    eventsGirlz.push(eventGirl);
                                }
                            }
                            else {
                                if (nextWave === -1) {
                                    eventList[eventID]["isCompleted"] = true;
                                    clearTimer('eventMythicNextWave');
                                }
                            }
                        }
                        else {
                            // No more needed if girl is owned
                            clearTimer('eventMythicNextWave');
                        }
                    }
                }
            }
            if (hhEvent.isBossBangEvent) {
                LogUtils_logHHAuto("On going bossBang event.");
                let timeLeft = $('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
                if (timeLeft !== undefined && timeLeft.length) {
                    setTimer('eventBossBangGoing', Number(convertTimeToInt(timeLeft)));
                }
                else
                    setTimer('eventBossBangGoing', refreshTimer);
                eventList[eventID] = {};
                eventList[eventID]["id"] = eventID;
                eventList[eventID]["type"] = hhEvent.eventType;
                eventList[eventID]["seconds_before_end"] = new Date().getTime() + Number(convertTimeToInt(timeLeft)) * 1000;
                eventList[eventID]["next_refresh"] = new Date().getTime() + refreshTimer * 1000;
                eventList[eventID]["isCompleted"] = $('#contains_all #events #boss_bang .completed-event').length > 0;
                let teamEventz = $('#contains_all #events #boss_bang .boss-bang-teams-container .boss-bang-team-slot');
                let teamFound = false;
                const firstTeamToStartWith = getStoredValue(HHStoredVarPrefixKey + "Setting_bossBangMinTeam");
                if ($('.boss-bang-team-ego', teamEventz[firstTeamToStartWith - 1]).length > 0) {
                    // Do not trigger event if not all teams are set
                    for (let currIndex = teamEventz.length - 1; currIndex >= 0 && !teamFound; currIndex--) {
                        // start with last team first
                        let teamz = $(teamEventz[currIndex]);
                        const teamIndex = teamz.data('slot-index');
                        const teamEgo = $('.boss-bang-team-ego', teamz);
                        if (teamEgo.length > 0 && parseInt(teamEgo.text()) > 0) {
                            if (!teamFound) {
                                if (!teamz.hasClass('.selected-hero-team'))
                                    teamz.click();
                                teamFound = true;
                                LogUtils_logHHAuto("Select team " + (teamIndex + 1) + ", Ego: " + parseInt(teamEgo.text()));
                                setStoredValue(HHStoredVarPrefixKey + "Temp_bossBangTeam", teamIndex);
                                return true;
                            }
                        }
                        else {
                            LogUtils_logHHAuto("Team " + teamIndex + " not eligible");
                        }
                    }
                }
                else if (eventList[eventID]["isCompleted"]) {
                    LogUtils_logHHAuto("Boss bang completed, disabled boss bang event setting");
                    setStoredValue(HHStoredVarPrefixKey + "Setting_bossBangEvent", false);
                }
                if (!teamFound) {
                    setStoredValue(HHStoredVarPrefixKey + "Temp_bossBangTeam", -1);
                }
            }
            if (hhEvent.isSultryMysteriesEvent) {
                LogUtils_logHHAuto("On going sultry mysteries event.");
                let timeLeft = $('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
                if (timeLeft !== undefined && timeLeft.length) {
                    setTimer('eventSultryMysteryGoing', Number(convertTimeToInt(timeLeft)));
                }
                else
                    setTimer('eventSultryMysteryGoing', 3600);
                eventList[eventID] = {};
                eventList[eventID]["id"] = eventID;
                eventList[eventID]["type"] = hhEvent.eventType;
                eventList[eventID]["seconds_before_end"] = new Date().getTime() + Number(convertTimeToInt(timeLeft)) * 1000;
                eventList[eventID]["next_refresh"] = new Date().getTime() + refreshTimer * 1000;
                eventList[eventID]["isCompleted"] = false;
                if (checkTimer("eventSultryMysteryShopRefresh")) {
                    LogUtils_logHHAuto("Refresh sultry mysteries shop content.");
                    const shopButton = $('#shop_tab');
                    const gridButton = $('#grid_tab');
                    shopButton.click();
                    setTimeout(function () {
                        let shopTimeLeft = $('#contains_all #events #shop_tab_container .shop-section .shop-timer span[rel="expires"]').text();
                        setTimer('eventSultryMysteryShopRefresh', Number(convertTimeToInt(shopTimeLeft)) + randomInterval(60, 180));
                        eventList[eventID]["next_shop_refresh"] = new Date().getTime() + Number(shopTimeLeft) * 1000;
                        setTimeout(function () { gridButton.click(); }, randomInterval(800, 1200));
                    }, randomInterval(300, 500));
                }
            }
            if (hhEvent.isDPEvent) {
                LogUtils_logHHAuto("On going double penetration event.");
                let timeLeft = $('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
                let dpRemainingTime = 3600;
                if (timeLeft !== undefined && timeLeft.length) {
                    dpRemainingTime = Number(convertTimeToInt(timeLeft));
                }
                setTimer('eventDPGoing', dpRemainingTime);
                eventList[eventID] = {};
                eventList[eventID]["id"] = eventID;
                eventList[eventID]["type"] = hhEvent.eventType;
                eventList[eventID]["seconds_before_end"] = new Date().getTime() + dpRemainingTime * 1000;
                eventList[eventID]["next_refresh"] = new Date().getTime() + refreshTimer * 1000;
                eventList[eventID]["isCompleted"] = false;
                if (getStoredValue(HHStoredVarPrefixKey + "Setting_autodpEventCollect") === "true" || dpRemainingTime < getLimitTimeBeforeEnd() && getStoredValue(HHStoredVarPrefixKey + "Setting_autodpEventCollectAll") === "true") {
                    DoublePenetration.goAndCollect(dpRemainingTime);
                }
            }
            if (hhEvent.isPoa) {
                LogUtils_logHHAuto("On going path of Attraction event.");
                PathOfAttraction.getRemainingTime();
                const poAEnd = getSecondsLeft("PoARemainingTime");
                LogUtils_logHHAuto("PoA end in " + TimeHelper.debugDate(poAEnd));
                let refreshTimerPoa = ConfigHelper.getHHScriptVars('maxCollectionDelay');
                if (poAEnd < Math.max(refreshTimerPoa, getLimitTimeBeforeEnd()) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoACollectAll") === "true") {
                    refreshTimerPoa = Math.min(refreshTimerPoa, getLimitTimeBeforeEnd());
                }
                LogUtils_logHHAuto("PoA next refres in " + TimeHelper.debugDate(refreshTimerPoa));
                eventList[eventID] = {};
                eventList[eventID]["id"] = eventID;
                eventList[eventID]["type"] = hhEvent.eventType;
                eventList[eventID]["seconds_before_end"] = new Date().getTime() + poAEnd * 1000;
                eventList[eventID]["next_refresh"] = new Date().getTime() + refreshTimerPoa * 1000;
                eventList[eventID]["isCompleted"] = PathOfAttraction.isCompleted();
                const manualCollectAll = getStoredValue(HHStoredVarPrefixKey + "Temp_poaManualCollectAll") === 'true';
                if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoACollect") === "true" || manualCollectAll || poAEnd < getLimitTimeBeforeEnd() && getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoACollectAll") === "true") {
                    PathOfAttraction.goAndCollect(manualCollectAll);
                }
            }
            if (Object.keys(eventList).length > 0) {
                setStoredValue(HHStoredVarPrefixKey + "Temp_eventsList", JSON.stringify(eventList));
            }
            else {
                sessionStorage.removeItem(HHStoredVarPrefixKey + "Temp_eventsList");
            }
            eventsGirlz = eventsGirlz.filter(function (a) {
                var a_weighted = Number(Priority.indexOf('' + a.troll_id));
                if (a.is_mythic) {
                    return true;
                }
                else {
                    return a_weighted !== -1;
                }
            });
            if (eventsGirlz.length > 0 || eventChamps.length > 0) {
                if (eventsGirlz.length > 0) {
                    if (Priority[0] !== '') {
                        eventsGirlz.sort(function (a, b) {
                            var a_weighted = Number(Priority.indexOf('' + a.troll_id));
                            if (a.is_mythic) {
                                a_weighted = a_weighted - Priority.length;
                            }
                            var b_weighted = Number(Priority.indexOf('' + b.troll_id));
                            if (b.is_mythic) {
                                b_weighted = b_weighted - Priority.length;
                            }
                            return a_weighted - b_weighted;
                        });
                        //logHHAuto({log:"Sorted EventGirls",eventGirlz:eventsGirlz});
                    }
                    setStoredValue(HHStoredVarPrefixKey + "Temp_eventsGirlz", JSON.stringify(eventsGirlz));
                    EventModule.saveEventGirl(eventsGirlz[0]);
                }
                if (eventChamps.length > 0) {
                    setStoredValue(HHStoredVarPrefixKey + "Temp_autoChampsEventGirls", JSON.stringify(eventChamps));
                }
                queryEventTabCheck[0].setAttribute('parsed', 'true');
                //setStoredValue(HHStoredVarPrefixKey+"Temp_EventFightsBeforeRefresh", "20000");
                //setTimer('eventRefreshExpiration', 3600);
            }
            else {
                queryEventTabCheck[0].setAttribute('parsed', 'true');
                EventModule.clearEventData(eventID);
            }
            return false;
        }
        else {
            if (inTab !== "global") {
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDEvent"), { tab: inTab });
            }
            else {
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDEvent"));
            }
            return true;
        }
    }
    static saveEventGirl(eventGirlz) {
        var chosenTroll = Number(eventGirlz.troll_id);
        LogUtils_logHHAuto("ET: " + chosenTroll);
        if (!eventGirlz.is_mythic) {
            setStoredValue(HHStoredVarPrefixKey + "Temp_eventGirl", JSON.stringify(eventGirlz));
        }
        else {
            // setStoredValue(HHStoredVarPrefixKey + "Temp_eventGirl", JSON.stringify(eventGirlz)); // TODO remove when migration is done
            setStoredValue(HHStoredVarPrefixKey + "Temp_eventMythicGirl", JSON.stringify(eventGirlz));
        }
    }
    static getEventGirl() {
        return isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_eventGirl")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_eventGirl")) : {};
    }
    static getEventMythicGirl() {
        return isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_eventMythicGirl")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_eventMythicGirl")) : {};
    }
    static getEventType(inEventID) {
        if (inEventID.startsWith(ConfigHelper.getHHScriptVars('mythicEventIDReg')))
            return "mythic";
        if (inEventID.startsWith(ConfigHelper.getHHScriptVars('eventIDReg')))
            return "event";
        if (inEventID.startsWith(ConfigHelper.getHHScriptVars('bossBangEventIDReg')))
            return "bossBang";
        if (inEventID.startsWith(ConfigHelper.getHHScriptVars('sultryMysteriesEventIDReg')))
            return "sultryMysteries";
        if (inEventID.startsWith(ConfigHelper.getHHScriptVars('doublePenetrationEventIDReg')))
            return "doublePenetration";
        if (inEventID.startsWith(ConfigHelper.getHHScriptVars('poaEventIDReg')))
            return "poa";
        //    if(inEventID.startsWith('cumback_contest_')) return "";
        //    if(inEventID.startsWith('legendary_contest_')) return "";
        //    if(inEventID.startsWith('dpg_event_')) return ""; // Double date
        return "";
    }
    static getEvent(inEventID) {
        const eventType = EventModule.getEventType(inEventID);
        const isPlusEvent = inEventID.startsWith(ConfigHelper.getHHScriptVars('eventIDReg')) && getStoredValue(HHStoredVarPrefixKey + "Setting_plusEvent") === "true";
        const isPlusEventMythic = inEventID.startsWith(ConfigHelper.getHHScriptVars('mythicEventIDReg')) && getStoredValue(HHStoredVarPrefixKey + "Setting_plusEventMythic") === "true";
        const isBossBangEvent = inEventID.startsWith(ConfigHelper.getHHScriptVars('bossBangEventIDReg')) && getStoredValue(HHStoredVarPrefixKey + "Setting_bossBangEvent") === "true";
        const isSultryMysteriesEvent = inEventID.startsWith(ConfigHelper.getHHScriptVars('sultryMysteriesEventIDReg')) && getStoredValue(HHStoredVarPrefixKey + "Setting_sultryMysteriesEventRefreshShop") === "true" && SultryMysteries.isEnabled();
        const isDPEvent = inEventID.startsWith(ConfigHelper.getHHScriptVars('doublePenetrationEventIDReg'));
        const isPoa = inEventID.startsWith(ConfigHelper.getHHScriptVars('poaEventIDReg'));
        return {
            eventTypeKnown: eventType !== '',
            eventId: inEventID,
            eventType: eventType,
            isPlusEvent: isPlusEvent, // and activated
            isPlusEventMythic: isPlusEventMythic, // and activated
            isBossBangEvent: isBossBangEvent, // and activated
            isSultryMysteriesEvent: isSultryMysteriesEvent, // and activated
            isDPEvent: isDPEvent, // and activated
            isPoa: isPoa, // and activated
            isEnabled: isPlusEvent || isPlusEventMythic || isBossBangEvent || isSultryMysteriesEvent || isDPEvent || isPoa
        };
    }
    static isEventActive(inEventID) {
        let eventList = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsList")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsList")) : {};
        if (eventList.hasOwnProperty(inEventID) && !eventList[inEventID]["isCompleted"]) {
            return eventList[inEventID]["seconds_before_end"] > new Date();
        }
        return false;
    }
    static checkEvent(inEventID) {
        let eventList = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsList")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsList")) : {};
        const hhEvent = EventModule.getEvent(inEventID);
        if (!hhEvent.eventTypeKnown || hhEvent.eventTypeKnown && !hhEvent.isEnabled) {
            return false;
        }
        if (!eventList.hasOwnProperty(inEventID)) {
            return true;
        }
        else {
            if (eventList[inEventID]["isCompleted"]) {
                return false;
            }
            else {
                return (eventList[inEventID]["next_refresh"] < new Date()
                    ||
                        (hhEvent.isPlusEventMythic && checkTimerMustExist('eventMythicNextWave'))
                    ||
                        (hhEvent.isSultryMysteriesEvent && checkTimerMustExist('eventSultryMysteryShopRefresh'))
                    ||
                        (hhEvent.isDPEvent && checkTimerMustExist('nextDpEventCollectTime')));
            }
        }
    }
    static displayPrioInDailyMissionGirl(baseQuery) {
        let allEventGirlz = unsafeWindow.event_data ? unsafeWindow.event_data.girls : [];
        if (!allEventGirlz)
            return;
        for (let currIndex = 0; currIndex < allEventGirlz.length; currIndex++) {
            let girlData = allEventGirlz[currIndex];
            if (girlData.shards < 100 && girlData.source && girlData.source.name === 'event_dm') {
                let query = baseQuery + "[data-select-girl-id=" + girlData.id_girl + "]";
                if ($(query).length > 0) {
                    let currentGirl = $(query).parent()[0];
                    $(query).prepend('<div class="HHEventPriority" title="' + getTextForUI('dailyMissionGirlTitle', 'elementText') + '">DM</div>');
                    $(query).css('position', 'relative');
                    $($(query)).parent().parent()[0].prepend(currentGirl);
                }
            }
        }
    }
    static hideOwnedGilrs() {
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_hideOwnedGirls") === "true") {
            if ($('.nc-event-list-reward.already-owned').length > 10 && $('.nc-event-list-reward.girl_ico').length > 30) {
                $('.nc-event-list-reward.already-owned').parent().hide();
            }
        }
    }
    static moduleDisplayEventPriority() {
        if ($('.HHEventPriority').length > 0) {
            return;
        }
        const baseQuery = "#events .scroll-area .nc-event-list-reward-container .nc-event-list-reward";
        EventModule.displayPrioInDailyMissionGirl(baseQuery);
        let eventGirlz = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsGirlz")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsGirlz")) : [];
        let eventChamps = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_autoChampsEventGirls")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_autoChampsEventGirls")) : [];
        //$("div.event-widget div.widget[style='display: block;'] div.container div.scroll-area div.rewards-block-tape div.girl_reward div.HHEventPriority").each(function(){this.remove();});
        if (eventGirlz.length > 0 || eventChamps.length > 0) {
            var girl;
            var prio;
            var idArray;
            var currentGirl;
            for (var ec = eventChamps.length; ec > 0; ec--) {
                idArray = Number(ec) - 1;
                girl = Number(eventChamps[idArray].girl_id);
                let query = baseQuery + "[data-select-girl-id=" + girl + "]";
                if ($(query).length > 0) {
                    currentGirl = $(query).parent()[0];
                    $(query).prepend('<div class="HHEventPriority">C' + eventChamps[idArray].champ_id + '</div>');
                    $(query).css('position', 'relative');
                    $($(query)).parent().parent()[0].prepend(currentGirl);
                }
            }
            for (var e = eventGirlz.length; e > 0; e--) {
                idArray = Number(e) - 1;
                girl = Number(eventGirlz[idArray].girl_id);
                let query = baseQuery + "[data-select-girl-id=" + girl + "]";
                if ($(query).length > 0) {
                    currentGirl = $(query).parent()[0];
                    $(query).prepend('<div class="HHEventPriority">' + e + '</div>');
                    $($(query)).parent().parent()[0].prepend(currentGirl);
                    $(query).css('position', 'relative');
                    $(query).trigger('click');
                }
            }
        }
    }
    static displayGenericRemainingTime(scriptId, aRel, hhtimerId, timerName, timerEndDateName) {
        const displayTimer = $(scriptId).length === 0;
        if (getTimer(timerName) !== -1) {
            const domSelector = '#homepage a[rel="' + aRel + '"] .notif-position > span';
            if ($("#" + hhtimerId).length === 0) {
                if (displayTimer) {
                    $(domSelector).prepend('<span id="' + hhtimerId + '"></span>');
                    GM_addStyle('#' + hhtimerId + '{position: absolute;top: 26px;left: 30px;width: 100px;font-size: .6rem ;z-index: 1;}');
                }
            }
            else {
                if (!displayTimer) {
                    $("#" + hhtimerId)[0].remove();
                }
            }
            if (displayTimer) {
                $("#" + hhtimerId)[0].innerText = getTimeLeft(timerName);
            }
        }
        else {
            if (getStoredValue(timerEndDateName) !== undefined) {
                setTimer(timerName, getStoredValue(timerEndDateName) - (Math.ceil(new Date().getTime()) / 1000));
            }
        }
    }
    static moduleSimPoVPogMaskReward(containerId) {
        var arrayz;
        var nbReward;
        let modified = false;
        arrayz = $('.potions-paths-tier:not([style*="display:none"]):not([style*="display: none"])');
        //doesn sure about  " .purchase-pov-pass"-button visibility
        if ($('#' + containerId + ' .potions-paths-second-row .purchase-pass:not([style*="display:none"]):not([style*="display: none"])').length) {
            nbReward = 1;
        }
        else {
            nbReward = 2;
        }
        var obj;
        if (arrayz.length > 0) {
            for (var i2 = arrayz.length - 1; i2 >= 0; i2--) {
                obj = $(arrayz[i2]).find('.claimed-slot:not([style*="display:none"]):not([style*="display: none"])');
                if (obj.length >= nbReward) {
                    //console.log("width : "+arrayz[i2].offsetWidth);
                    //document.getElementById('rewards_cont_scroll').scrollLeft-=arrayz[i2].offsetWidth;
                    arrayz[i2].style.display = "none";
                    modified = true;
                }
            }
        }
        if (modified) {
            let divToModify = $('.potions-paths-progress-bar-section');
            if (divToModify.length > 0) {
                $('.potions-paths-progress-bar-section')[0].scrollTop = 0;
            }
        }
    }
    static collectEventChestIfPossible() {
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_collectEventChest") === "true") {
            const eventChestId = "#extra-rewards-claim-btn:not([disabled])";
            if ($(eventChestId).length > 0) {
                LogUtils_logHHAuto("Collect event chest");
                $(eventChestId).click();
            }
        }
    }
    static parsePageForEventId() {
        const eventQuery = '#contains_all #homepage .event-widget a[rel="event"]:not([href="#"])';
        const mythicEventQuery = '#contains_all #homepage .event-widget a[rel="mythic_event"]:not([href="#"])';
        const bossBangEventQuery = '#contains_all #homepage .event-widget a[rel="boss_bang_event"]:not([href="#"])';
        const sultryMysteriesEventQuery = '#contains_all #homepage .event-widget a[rel="sm_event"]:not([href="#"])';
        const dpEventQuery = '#contains_all #homepage .event-widget a[rel="dp_event"]:not([href="#"])';
        const seasonalEventQuery = '#contains_all #homepage .seasonal-event a, #contains_all #homepage .mega-event a';
        const povEventQuery = '#contains_all #homepage .event-container a[rel="path-of-valor"]';
        const pogEventQuery = '#contains_all #homepage .event-container a[rel="path-of-glory"]';
        const poaEventQuery = '#contains_all #homepage .event-widget a[rel="path_event"]:not([href="#"])';
        let eventIDs = [];
        let ongoingEventIDs = [];
        let bossBangEventIDs = [];
        const currentPage = getPage();
        function parseForEventId(query, eventList) {
            let parsedURL;
            let eventId;
            let queryResults = $(query);
            for (let index = 0; index < queryResults.length; index++) {
                parsedURL = new URL(queryResults[index].getAttribute("href") || '', window.location.origin);
                eventId = queryStringGetParam(parsedURL.search, 'tab') || '';
                if (eventId !== '' && EventModule.checkEvent(eventId)) {
                    eventList.push(eventId);
                }
                if (eventId !== '') {
                    ongoingEventIDs.push(eventId);
                }
            }
        }
        if (currentPage === ConfigHelper.getHHScriptVars("pagesIDEvent")) {
            const currentPageEventId = EventModule.getDisplayedIdEventPage();
            if (currentPageEventId !== null && EventModule.checkEvent(currentPageEventId)) {
                eventIDs.push(currentPageEventId);
            }
            let parsedURL;
            let eventId;
            let eventsQuery = '.events-list a.event-title:not(.active)';
            let queryResults = $(eventsQuery);
            for (let index = 0; index < queryResults.length; index++) {
                parsedURL = new URL(queryResults[index].getAttribute("href") || '', window.location.origin);
                eventId = queryStringGetParam(parsedURL.search, 'tab') || '';
                if (eventId !== '' && EventModule.checkEvent(eventId)) {
                    eventIDs.push(eventId);
                }
            }
        }
        else if (currentPage === ConfigHelper.getHHScriptVars("pagesIDHome")) {
            let queryResults;
            parseForEventId(eventQuery, eventIDs);
            parseForEventId(mythicEventQuery, eventIDs);
            parseForEventId(poaEventQuery, eventIDs);
            parseForEventId(bossBangEventQuery, bossBangEventIDs);
            parseForEventId(sultryMysteriesEventQuery, eventIDs);
            if ($(sultryMysteriesEventQuery).length <= 0 && getTimer("eventSultryMysteryShopRefresh") !== -1) {
                // event is over
                clearTimer("eventSultryMysteryShopRefresh");
            }
            parseForEventId(dpEventQuery, eventIDs);
            if (getStoredValue(HHStoredVarPrefixKey + "Setting_autodpEventCollect") === "true" && $(dpEventQuery).length == 0) {
                LogUtils_logHHAuto("No double penetration event found, deactivate collect.");
                setStoredValue(HHStoredVarPrefixKey + "Setting_autodpEventCollect", "false");
            }
            queryResults = $(seasonalEventQuery);
            if ((getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonalEventCollect") === "true" || getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonalEventCollectAll") === "true") && queryResults.length == 0) {
                LogUtils_logHHAuto("No seasonal event found, deactivate collect.");
                setStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonalEventCollect", "false");
                setStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonalEventCollectAll", "false");
            }
            queryResults = $(povEventQuery);
            if ((getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoVCollect") === "true" || getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoVCollectAll") === "true") && queryResults.length == 0) {
                LogUtils_logHHAuto("No pov event found, deactivate collect.");
                setStoredValue(HHStoredVarPrefixKey + "Setting_autoPoVCollect", "false");
                setStoredValue(HHStoredVarPrefixKey + "Setting_autoPoVCollectAll", "false");
            }
            queryResults = $(pogEventQuery);
            if ((getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoGCollect") === "true" || getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoGCollectAll") === "true") && queryResults.length == 0) {
                LogUtils_logHHAuto("No pog event found, deactivate collect.");
                setStoredValue(HHStoredVarPrefixKey + "Setting_autoPoGCollect", "false");
                setStoredValue(HHStoredVarPrefixKey + "Setting_autoPoGCollectAll", "false");
            }
        }
        /*
                if (currentPage === ConfigHelper.getHHScriptVars("pagesIDEvent") || currentPage === ConfigHelper.getHHScriptVars("pagesIDHome")) {
                    const eventList = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsList")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsList")) : {};
                    for (const eventIDStored of Object.keys(eventList)) {
                        //console.log(eventID);
                        if (!ongoingEventIDs.includes(eventIDStored)) {
                            logHHAuto(`Event ${eventIDStored} seems not available anymore, removing from store`);
                            EventModule.clearEventData(eventIDStored);
                        }
                    }
                }
        */
        return { eventIDs: eventIDs, bossBangEventIDs: bossBangEventIDs };
    }
}

;// CONCATENATED MODULE: ./src/Module/Events/PathOfGlory.ts





class PathOfGlory {
    static getRemainingTime() {
        const poGTimerRequest = '#pog_tab_container > div.potions-paths-first-row .potions-paths-timer span[rel=expires]';
        if ($(poGTimerRequest).length > 0 && (getSecondsLeft("PoGRemainingTime") === 0 || getStoredValue(HHStoredVarPrefixKey + "Temp_PoGEndDate") === undefined)) {
            const poGTimer = Number(convertTimeToInt($(poGTimerRequest).text()));
            setTimer("PoGRemainingTime", poGTimer);
            setStoredValue(HHStoredVarPrefixKey + "Temp_PoGEndDate", Math.ceil(new Date().getTime() / 1000) + poGTimer);
        }
    }
    static displayRemainingTime() {
        EventModule.displayGenericRemainingTime("#scriptPogTime", "path-of-glory", "HHAutoPoGTimer", "PoGRemainingTime", HHStoredVarPrefixKey + "Temp_PoGEndDate");
    }
    static isEnabled() {
        return ConfigHelper.getHHScriptVars("isEnabledPoG", false) && getHHVars('Hero.infos.level') >= ConfigHelper.getHHScriptVars("LEVEL_MIN_POG");
    }
    static goAndCollect() {
        const rewardsToCollect = isJSON(getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoGCollectablesList")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoGCollectablesList")) : [];
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDPoG")) {
            PathOfGlory.getRemainingTime();
            const pogEnd = getSecondsLeft("PoGRemainingTime");
            LogUtils_logHHAuto("PoG end in " + TimeHelper.debugDate(pogEnd));
            if (checkTimer('nextPoGCollectAllTime') && pogEnd < getLimitTimeBeforeEnd() && getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoGCollectAll") === "true") {
                if ($(ConfigHelper.getHHScriptVars("selectorClaimAllRewards")).length > 0) {
                    LogUtils_logHHAuto("Going to collect all POG item at once.");
                    setTimeout(function () {
                        $(ConfigHelper.getHHScriptVars("selectorClaimAllRewards"))[0].click();
                        setTimer('nextPoGCollectAllTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180)); // Add timer to check again later if there is new items to collect
                        setTimeout(function () { gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome")); }, 500);
                    }, 500);
                    return true;
                }
                else {
                    setTimer('nextPoGCollectAllTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180));
                }
            }
            if (checkTimer('nextPoGCollectTime') && (getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoGCollect") === "true" || getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoGCollectAll") === "true")) {
                LogUtils_logHHAuto("Checking Path of Glory for collectable rewards.");
                LogUtils_logHHAuto("setting autoloop to false");
                setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                let buttonsToCollect = [];
                const listPoGTiersToClaim = $("#pog_tab_container div.potions-paths-second-row div.potions-paths-central-section div.potions-paths-tier.unclaimed");
                for (let currentTier = 0; currentTier < listPoGTiersToClaim.length; currentTier++) {
                    const currentButton = $("button[rel='claim']", listPoGTiersToClaim[currentTier])[0];
                    const currentTierNb = currentButton.getAttribute("tier");
                    //console.log("checking tier : "+currentTierNb);
                    const freeSlotType = RewardHelper.getRewardTypeBySlot($(".free-slot .slot,.free-slot .shards_girl_ico", listPoGTiersToClaim[currentTier])[0]);
                    if (rewardsToCollect.includes(freeSlotType)) {
                        const paidSlots = $(".paid-slots:not(.paid-locked) .slot,.paid-slots:not(.paid-locked) .shards_girl_ico", listPoGTiersToClaim[currentTier]);
                        if (paidSlots.length > 0) {
                            if (rewardsToCollect.includes(RewardHelper.getRewardTypeBySlot(paidSlots[0])) && rewardsToCollect.includes(RewardHelper.getRewardTypeBySlot(paidSlots[1]))) {
                                buttonsToCollect.push(currentButton);
                                LogUtils_logHHAuto("Adding for collection tier (with paid) : " + currentTierNb);
                            }
                        }
                        else {
                            buttonsToCollect.push(currentButton);
                            LogUtils_logHHAuto("Adding for collection tier (only free) : " + currentTierNb);
                        }
                    }
                }
                if (buttonsToCollect.length > 0) {
                    function collectPoGRewards() {
                        if (buttonsToCollect.length > 0) {
                            LogUtils_logHHAuto("Collecting tier : " + buttonsToCollect[0].getAttribute('tier'));
                            buttonsToCollect[0].click();
                            buttonsToCollect.shift();
                            setTimeout(collectPoGRewards, randomInterval(300, 500));
                        }
                        else {
                            LogUtils_logHHAuto("Path of Glory collection finished.");
                            setTimer('nextPoGCollectTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180));
                            gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                        }
                    }
                    collectPoGRewards();
                    return true;
                }
                else {
                    LogUtils_logHHAuto("No Path of Glory reward to collect.");
                    setTimer('nextPoGCollectTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180));
                    setTimer('nextPoGCollectAllTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180));
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                    return false;
                }
            }
            return false;
        }
        else {
            LogUtils_logHHAuto("Switching to Path of Glory screen.");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDPoG"));
            return true;
        }
    }
    static maskReward() {
        EventModule.moduleSimPoVPogMaskReward('pog_tab_container');
    }
    static styles() {
    }
}

;// CONCATENATED MODULE: ./src/Module/Events/PathOfValue.ts





class PathOfValue {
    static getRemainingTime() {
        const poVTimerRequest = '#pov_tab_container > div.potions-paths-first-row .potions-paths-timer span[rel=expires]';
        if ($(poVTimerRequest).length > 0 && (getSecondsLeft("PoVRemainingTime") === 0 || getStoredValue(HHStoredVarPrefixKey + "Temp_PoVEndDate") === undefined)) {
            const poVTimer = Number(convertTimeToInt($(poVTimerRequest).text()));
            setTimer("PoVRemainingTime", poVTimer);
            setStoredValue(HHStoredVarPrefixKey + "Temp_PoVEndDate", Math.ceil(new Date().getTime() / 1000) + poVTimer);
        }
    }
    static displayRemainingTime() {
        EventModule.displayGenericRemainingTime("#scriptPovTime", "path-of-valor", "HHAutoPoVTimer", "PoVRemainingTime", HHStoredVarPrefixKey + "Temp_PoVEndDate");
    }
    static isEnabled() {
        return ConfigHelper.getHHScriptVars("isEnabledPoV", false) && getHHVars('Hero.infos.level') >= ConfigHelper.getHHScriptVars("LEVEL_MIN_POV");
    }
    static goAndCollect() {
        const rewardsToCollect = isJSON(getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoVCollectablesList")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoVCollectablesList")) : [];
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDPoV")) {
            PathOfValue.getRemainingTime();
            const povEnd = getSecondsLeft("PoVRemainingTime");
            LogUtils_logHHAuto("PoV end in " + TimeHelper.debugDate(povEnd));
            if (checkTimer('nextPoVCollectAllTime') && povEnd < getLimitTimeBeforeEnd() && getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoVCollectAll") === "true") {
                if ($(ConfigHelper.getHHScriptVars("selectorClaimAllRewards")).length > 0) {
                    LogUtils_logHHAuto("Going to collect all POV item at once.");
                    setTimeout(function () {
                        $(ConfigHelper.getHHScriptVars("selectorClaimAllRewards"))[0].click();
                        setTimer('nextPoVCollectAllTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180)); // Add timer to check again later if there is new items to collect
                        setTimeout(function () { gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome")); }, 500);
                    }, 500);
                    return true;
                }
                else {
                    setTimer('nextPoVCollectAllTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180));
                }
            }
            if (checkTimer('nextPoVCollectTime') && getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoVCollect") === "true") {
                LogUtils_logHHAuto("Checking Path of Valor for collectable rewards.");
                LogUtils_logHHAuto("setting autoloop to false");
                setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                let buttonsToCollect = [];
                const listPoVTiersToClaim = $("#pov_tab_container div.potions-paths-second-row div.potions-paths-central-section div.potions-paths-tier.unclaimed");
                for (let currentTier = 0; currentTier < listPoVTiersToClaim.length; currentTier++) {
                    const currentButton = $("button[rel='claim']", listPoVTiersToClaim[currentTier])[0];
                    const currentTierNb = currentButton.getAttribute("tier");
                    //console.log("checking tier : "+currentTierNb);
                    const freeSlotType = RewardHelper.getRewardTypeBySlot($(".free-slot .slot,.free-slot .shards_girl_ico", listPoVTiersToClaim[currentTier])[0]);
                    if (rewardsToCollect.includes(freeSlotType)) {
                        const paidSlots = $(".paid-slots:not(.paid-locked) .slot,.paid-slots:not(.paid-locked) .shards_girl_ico", listPoVTiersToClaim[currentTier]);
                        if (paidSlots.length > 0) {
                            if (rewardsToCollect.includes(RewardHelper.getRewardTypeBySlot(paidSlots[0])) && rewardsToCollect.includes(RewardHelper.getRewardTypeBySlot(paidSlots[1]))) {
                                buttonsToCollect.push(currentButton);
                                LogUtils_logHHAuto("Adding for collection tier (with paid) : " + currentTierNb);
                            }
                        }
                        else {
                            buttonsToCollect.push(currentButton);
                            LogUtils_logHHAuto("Adding for collection tier (only free) : " + currentTierNb);
                        }
                    }
                }
                if (buttonsToCollect.length > 0) {
                    function collectPoVRewards() {
                        if (buttonsToCollect.length > 0) {
                            LogUtils_logHHAuto("Collecting tier : " + buttonsToCollect[0].getAttribute('tier'));
                            buttonsToCollect[0].click();
                            buttonsToCollect.shift();
                            setTimeout(collectPoVRewards, randomInterval(300, 500));
                        }
                        else {
                            LogUtils_logHHAuto("Path of Valor collection finished.");
                            setTimer('nextPoVCollectTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180));
                            gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                        }
                    }
                    collectPoVRewards();
                    return true;
                }
                else {
                    LogUtils_logHHAuto("No Path of Valor reward to collect.");
                    setTimer('nextPoVCollectTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180));
                    setTimer('nextPoVCollectAllTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180));
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                    return false;
                }
            }
            return false;
        }
        else {
            LogUtils_logHHAuto("Switching to Path of Valor screen.");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDPoV"));
            return true;
        }
    }
    static styles() {
    }
    static maskReward() {
        EventModule.moduleSimPoVPogMaskReward('pov_tab_container');
    }
}

;// CONCATENATED MODULE: ./src/Module/Events/Season.ts






class Season {
    static getRemainingTime() {
        const seasonTimer = unsafeWindow.season_sec_untill_event_end;
        if (seasonTimer != undefined && (getSecondsLeft("SeasonRemainingTime") === 0 || getStoredValue(HHStoredVarPrefixKey + "Temp_SeasonEndDate") === undefined)) {
            setTimer("SeasonRemainingTime", seasonTimer);
            setStoredValue(HHStoredVarPrefixKey + "Temp_SeasonEndDate", Math.ceil(new Date().getTime() / 1000) + seasonTimer);
        }
    }
    static displayRemainingTime() {
        EventModule.displayGenericRemainingTime("#scriptSeasonTime", "season", "HHAutoSeasonTimer", "SeasonRemainingTime", HHStoredVarPrefixKey + "Temp_SeasonEndDate");
    }
    static getEnergy() {
        return Number(getHHVars('Hero.energies.kiss.amount'));
    }
    static getEnergyMax() {
        return Number(getHHVars('Hero.energies.kiss.max_regen_amount'));
    }
    static getPinfo() {
        const threshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonThreshold"));
        const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonRunThreshold"));
        let Tegzd = '';
        const boostLimited = getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonBoostedOnly") === "true" && !Booster.haveBoosterEquiped();
        if (boostLimited) {
            Tegzd += '<li style="color:red!important;" title="' + getTextForUI("boostMissing", "elementText") + '">';
        }
        else {
            Tegzd += '<li>';
        }
        Tegzd += getTextForUI("autoSeasonTitle", "elementText") + ' ' + Season.getEnergy() + '/' + Season.getEnergyMax();
        if (runThreshold > 0) {
            Tegzd += ' (' + threshold + '<' + Season.getEnergy() + '<' + runThreshold + ')';
        }
        if (runThreshold > 0 && Season.getEnergy() < runThreshold) {
            Tegzd += ' ' + getTextForUI("waitRunThreshold", "elementText");
        }
        else {
            Tegzd += ' : ' + getTimeLeft('nextSeasonTime');
        }
        if (boostLimited) {
            Tegzd += ' ' + getTextForUI("boostMissing", "elementText") + '</li>';
        }
        else {
            Tegzd += '</li>';
        }
        return Tegzd;
    }
    static isTimeToFight() {
        const threshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonThreshold"));
        const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonRunThreshold"));
        const humanLikeRun = getStoredValue(HHStoredVarPrefixKey + "Temp_SeasonHumanLikeRun") === "true";
        const energyAboveThreshold = humanLikeRun && Season.getEnergy() > threshold || Season.getEnergy() > Math.max(threshold, runThreshold - 1);
        const paranoiaSpending = Season.getEnergy() > 0 && Number(checkParanoiaSpendings('kiss')) > 0;
        const needBoosterToFight = getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonBoostedOnly") === "true";
        const haveBoosterEquiped = Booster.haveBoosterEquiped();
        if (checkTimer('nextSeasonTime') && energyAboveThreshold && needBoosterToFight && !haveBoosterEquiped) {
            LogUtils_logHHAuto('Time for season but no booster equipped');
        }
        return (checkTimer('nextSeasonTime') && energyAboveThreshold && (needBoosterToFight && haveBoosterEquiped || !needBoosterToFight)) || paranoiaSpending;
    }
    static moduleSimSeasonBattle() {
        const hero_data = unsafeWindow.hero_data;
        const opponentDatas = unsafeWindow.opponents;
        let doDisplay = false;
        let mojoOppo = [];
        let scoreOppo = [];
        let nameOppo = [];
        let expOppo = [];
        let affOppo = [];
        try {
            // TODO update
            if ($("div.matchRatingNew img#powerLevelScouter").length != 3) {
                doDisplay = true;
            }
            let opponents = $('div.opponents_arena .season_arena_opponent_container');
            for (let index = 0; index < 3; index++) {
                const { player, opponent } = BDSMHelper.getBdsmPlayersData(hero_data, opponentDatas[index].player);
                if (doDisplay) {
                    //console.log("HH simuFight",JSON.stringify(player),JSON.stringify(opponent), opponentBonuses);
                }
                const simu = calculateBattleProbabilities(player, opponent);
                scoreOppo[index] = simu;
                mojoOppo[index] = Number($(".slot_victory_points .amount", opponents[index])[0].innerText);
                //logHHAuto(mojoOppo[index]);
                nameOppo[index] = opponent.name;
                expOppo[index] = Number($(".slot_season_xp_girl", opponents[index])[0].lastElementChild.innerText.replace(/\D/g, ''));
                affOppo[index] = Number($(".slot_season_affection_girl", opponents[index])[0].lastElementChild.innerText.replace(/\D/g, ''));
                GM_addStyle('#season-arena .opponents_arena .opponent_perform_button_container {'
                    + 'width: 200px;}');
                GM_addStyle('.green_button_L.btn_season_perform, .leagues_team_block .challenge button.blue_button_L {'
                    + 'background-image: linear-gradient(to top,#008ed5 0,#05719c 100%);'
                    + '-webkit-box-shadow: 0 3px 0 rgb(13 22 25 / 35%), inset 0 3px 0 #6df0ff;'
                    + '-moz-box-shadow: 0 3px 0 rgba(13,22,25,.35),inset 0 3px 0 #6df0ff;'
                    + 'box-shadow: 0 3px 0 rgb(13 22 25 / 35%), inset 0 3px 0 #6df0ff;}');
                GM_addStyle('#season-arena .matchRatingNew {'
                    + 'display: flex;'
                    + 'align-items: center;'
                    + 'justify-content: space-between;}');
                $('.player-panel-buttons .btn_season_perform', opponents[index]).contents().filter(function () { return this.nodeType === 3; }).remove();
                $('.player-panel-buttons .btn_season_perform', opponents[index]).find('span').remove();
                $('.player-panel-buttons .opponent_perform_button_container .green_button_L.btn_season_perform .energy_kiss_icn.kiss_icon_s').remove();
                if (doDisplay) {
                    $('.player-panel-buttons .opponent_perform_button_container .green_button_L.btn_season_perform', opponents[index]).prepend(`<div class="matchRatingNew ${simu.scoreClass}"><img id="powerLevelScouter" src=${ConfigHelper.getHHScriptVars("powerCalcImages")[simu.scoreClass]}>${NumberHelper.nRounding(100 * simu.win, 2, -1)}%</div>`);
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
            var numberOfReds = 0;
            let currentGains;
            let oppoName;
            for (let index = 0; index < 3; index++) {
                let isBetter = false;
                currentScore = Number(scoreOppo[index].win);
                currentFlag = scoreOppo[index].scoreClass;
                currentMojo = Number(mojoOppo[index]);
                currentExp = Number(expOppo[index]);
                currentAff = Number(affOppo[index]);
                switch (currentFlag) {
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
                if (chosenRating == -1 || chosenFlag < currentFlag) {
                    //logHHAuto('first');
                    isBetter = true;
                    currentGains = currentAff + currentExp;
                }
                //same orange flag but better score
                else if (chosenFlag == currentFlag && currentFlag == 0 && chosenRating < currentScore) {
                    //logHHAuto('second');
                    isBetter = true;
                }
                //same red flag but better mojo
                else if (chosenFlag == currentFlag && currentFlag == -1 && chosenMojo < currentMojo) {
                    //logHHAuto('second');
                    isBetter = true;
                }
                // same red flag same mojo but better score
                else if (chosenFlag == currentFlag && currentFlag == -1 && chosenMojo == currentMojo && currentScore > chosenRating) {
                    //logHHAuto('second');
                    isBetter = true;
                }
                //same green flag but better mojo
                else if (chosenFlag == currentFlag && currentFlag == 1 && chosenMojo < currentMojo) {
                    //logHHAuto('third');
                    isBetter = true;
                }
                //same green flag same mojo but better gains
                else if (chosenFlag == currentFlag && currentFlag == 1 && chosenMojo == currentMojo && currentGains < currentAff + currentExp) {
                    //logHHAuto('third');
                    isBetter = true;
                }
                //same green flag same mojo same gains but better score
                else if (chosenFlag == currentFlag && currentFlag == 1 && chosenMojo == currentMojo && currentGains === currentAff + currentExp && currentScore > chosenRating) {
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
            var price = Number($("div.opponents_arena button#refresh_villains").attr('price'));
            if (isNaN(price)) {
                price = 12;
            }
            if (numberOfReds === 3 && getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonPassReds") === "true" && getHHVars('Hero.currencies.hard_currency') >= price + Number(getStoredValue(HHStoredVarPrefixKey + "Setting_kobanBank"))) {
                chosenID = -2;
            }
            $($('div.season_arena_opponent_container div.matchRatingNew')).append(`<img id="powerLevelScouterNonChosen">`);
            GM_addStyle('#powerLevelScouterChosen, #powerLevelScouterNonChosen {'
                + 'width: 25px;}');
            //logHHAuto("Best opportunity opponent : "+oppoName+'('+chosenRating+')');
            if (doDisplay) {
                $($('.season_arena_opponent_container .matchRatingNew #powerLevelScouterNonChosen')[chosenID]).remove();
                $($('div.season_arena_opponent_container div.matchRatingNew')[chosenID]).append(`<img id="powerLevelScouterChosen" src=${ConfigHelper.getHHScriptVars("powerCalcImages").chosen}>`);
                //CSS
                GM_addStyle('.matchRatingNew {'
                    + 'text-align: center; '
                    + 'text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000; '
                    + 'line-height: 17px; '
                    + 'font-size: 14px;}');
                GM_addStyle('.plus {'
                    + 'color: #66CD00;}');
                GM_addStyle('.minus {'
                    + 'color: #FF2F2F;}');
                GM_addStyle('.close {'
                    + 'color: #FFA500;}');
                GM_addStyle('#powerLevelScouter {'
                    + 'width: 25px;}');
                GM_addStyle('#powerLevelScouterChosen {'
                    + 'width: 25px;}');
            }
            return chosenID;
        }
        catch (err) {
            LogUtils_logHHAuto("Catched error : Could not display season score : " + err);
            return -1;
        }
    }
    static run() {
        LogUtils_logHHAuto("Performing auto Season.");
        // Confirm if on correct screen.
        const Hero = getHero();
        var page = getPage();
        var current_kisses = Season.getEnergy();
        if (page === ConfigHelper.getHHScriptVars("pagesIDSeasonArena")) {
            LogUtils_logHHAuto("On season arena page.");
            var chosenID = Season.moduleSimSeasonBattle();
            if (chosenID === -2) {
                //change opponents and reload
                function refreshOpponents() {
                    var params = {
                        namespace: 'h\\Season',
                        class: 'Arena',
                        action: 'arena_reload'
                    };
                    LogUtils_logHHAuto("Three red opponents, paying for refresh.");
                    unsafeWindow.hh_ajax(params, function (data) {
                        Hero.update("hard_currency", data.hard_currency, false);
                        location.reload();
                    });
                }
                setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                LogUtils_logHHAuto("setting autoloop to false");
                setTimer('nextSeasonTime', 5);
                setTimeout(refreshOpponents, randomInterval(800, 1600));
                return true;
            }
            else if (chosenID === -1) {
                LogUtils_logHHAuto("Season : was not able to choose opponent.");
                setTimer('nextSeasonTime', randomInterval(30 * 60, 35 * 60));
            }
            else {
                const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonRunThreshold"));
                if (runThreshold > 0) {
                    setStoredValue(HHStoredVarPrefixKey + "Temp_SeasonHumanLikeRun", "true");
                }
                const toGoTo = document.getElementsByClassName("opponent_perform_button_container")[chosenID].children[0].getAttribute('href') || '';
                if (toGoTo == '') {
                    LogUtils_logHHAuto('Season : Error getting opponent location');
                    setTimer('nextSeasonTime', randomInterval(30 * 60, 35 * 60));
                    return false;
                }
                location.href = addNutakuSession(toGoTo);
                setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                LogUtils_logHHAuto("setting autoloop to false");
                LogUtils_logHHAuto("Going to crush : " + $("div.season_arena_opponent_container .personal_info div.player-name")[chosenID].innerText);
                setTimer('nextSeasonTime', 5);
                return true;
            }
        }
        else {
            // Switch to the correct screen
            LogUtils_logHHAuto("Remaining kisses : " + current_kisses);
            if (current_kisses > 0) {
                LogUtils_logHHAuto("Switching to Season Arena screen.");
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDSeasonArena"));
            }
            else {
                if (getHHVars('Hero.energies.kiss.next_refresh_ts') === 0) {
                    setTimer('nextSeasonTime', randomInterval(15 * 60, 17 * 60));
                }
                else {
                    const next_refresh = getHHVars('Hero.energies.kiss.next_refresh_ts');
                    setTimer('nextSeasonTime', randomInterval(next_refresh + 10, next_refresh + 180));
                }
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
            }
            return;
        }
    }
    static displayRewardsDiv() {
        try {
            const target = $('.seasons_controls_holder_global');
            const hhRewardId = 'HHSeasonRewards';
            if ($('#' + hhRewardId).length <= 0) {
                const rewardCountByType = Season.getNotClaimedRewards();
                RewardHelper.displayRewardsDiv(target, hhRewardId, rewardCountByType);
            }
        }
        catch ({ errName, message }) {
            LogUtils_logHHAuto(`ERROR in display Season rewards: ${message}`);
        }
    }
    static getNotClaimedRewards() {
        const arrayz = $('.rewards_pair');
        const freeSlotSelectors = ".free_reward.reward_is_claimable .slot";
        let paidSlotSelectors = "";
        if ($("div#gsp_btn_holder[style='display: none;']").length) {
            // Season pass paid
            paidSlotSelectors = ".pass_reward.reward_is_claimable .slot";
        }
        return RewardHelper.computeRewardsCount(arrayz, freeSlotSelectors, paidSlotSelectors);
    }
    static goAndCollect() {
        const rewardsToCollect = isJSON(getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonCollectablesList")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonCollectablesList")) : [];
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDSeason")) {
            Season.getRemainingTime();
            const seasonEnd = getSecondsLeft("SeasonRemainingTime");
            LogUtils_logHHAuto("Season end in " + TimeHelper.debugDate(seasonEnd));
            if (checkTimer('nextSeasonCollectAllTime') && seasonEnd < getLimitTimeBeforeEnd() && getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonCollectAll") === "true") {
                if ($(ConfigHelper.getHHScriptVars("selectorClaimAllRewards")).length > 0) {
                    LogUtils_logHHAuto("Going to collect all Season item at once.");
                    setTimeout(function () {
                        $(ConfigHelper.getHHScriptVars("selectorClaimAllRewards"))[0].click();
                        setTimer('nextSeasonCollectAllTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180)); // Add timer to check again later if there is new items to collect
                        setTimeout(function () { gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome")); }, 500);
                    }, 500);
                    return true;
                }
                else {
                    setTimer('nextSeasonCollectAllTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180));
                }
            }
            if (checkTimer('nextSeasonCollectTime') && getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonCollect") === "true") {
                LogUtils_logHHAuto("Going to collect Season.");
                LogUtils_logHHAuto("setting autoloop to false");
                setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                let limitClassPass = "";
                if ($("div#gsp_btn_holder:visible").length) {
                    limitClassPass = ".free_reward"; // without season pass
                }
                let buttonsToCollect = [];
                const listSeasonTiersToClaim = $("#seasons_tab_container .rewards_pair .reward_wrapper.reward_is_claimable" + limitClassPass);
                LogUtils_logHHAuto('Found ' + listSeasonTiersToClaim.length + ' rewards available for collection before filtering');
                for (let currentReward = 0; currentReward < listSeasonTiersToClaim.length; currentReward++) {
                    const currentRewardSlot = RewardHelper.getRewardTypeBySlot($(".slot, .shards_girl_ico", listSeasonTiersToClaim[currentReward])[0]);
                    const currentTier = $(".tier_number", $(listSeasonTiersToClaim[currentReward]).parent())[0].innerText;
                    //console.log(currentRewardSlot);
                    if (rewardsToCollect.includes(currentRewardSlot)) {
                        if (listSeasonTiersToClaim[currentReward].className.indexOf('pass-reward') > 0) {
                            LogUtils_logHHAuto("Adding for collection tier n°" + currentTier + " reward (paid) : " + currentRewardSlot);
                            buttonsToCollect.push({ reward: currentRewardSlot, button: listSeasonTiersToClaim[currentReward], tier: currentTier, paid: true });
                        }
                        else {
                            LogUtils_logHHAuto("Adding for collection n°" + currentTier + " reward (free) : " + currentRewardSlot);
                            buttonsToCollect.push({ reward: currentRewardSlot, button: listSeasonTiersToClaim[currentReward], tier: currentTier, paid: false });
                        }
                    }
                }
                //console.log(JSON.stringify(buttonsToCollect));
                if (buttonsToCollect.length > 0) {
                    function collectSeasonRewards(inHasSelected = false) {
                        if (buttonsToCollect.length > 0) {
                            const currentToCollect = buttonsToCollect[0];
                            if (inHasSelected) {
                                const rewardPlaceHolder = $("#preview_placeholder .reward_wrapper.reward_is_claimable, #preview_placeholder .reward_wrapper.reward_is_next");
                                const currentSelectedRewardType = RewardHelper.getRewardTypeBySlot($(".slot, .shards_girl_ico", rewardPlaceHolder)[0]);
                                const currentTier = $("#preview_tier")[0].innerText.split(" ")[1];
                                if (rewardPlaceHolder.length > 0
                                    && rewardsToCollect.includes(currentSelectedRewardType)
                                    && currentSelectedRewardType === currentToCollect.reward
                                    && currentTier === currentToCollect.tier) {
                                    LogUtils_logHHAuto("Collecting tier n°" + currentToCollect.tier + " : " + currentSelectedRewardType);
                                    setTimeout(function () { $("#claim_btn_s")[0].click(); }, 500);
                                }
                                else {
                                    LogUtils_logHHAuto(`Issue collecting n°${currentToCollect.tier} : ${currentToCollect.reward} : \n`
                                        + `rewardPlaceHolder.length : ${rewardPlaceHolder.length}\n`
                                        + `rewardsToCollect.includes(currentSelectedRewardType) : ${rewardsToCollect.includes(currentSelectedRewardType)}\n`
                                        + `currentSelectedRewardType : ${currentSelectedRewardType} / currentToCollect.reward : ${currentToCollect.reward} => ${currentSelectedRewardType === currentToCollect.reward}\n`
                                        + `currentTier : ${currentTier} / currentToCollect.tier : ${currentToCollect.tier} => ${currentTier === currentToCollect.tier}`);
                                    LogUtils_logHHAuto("Proceeding with next one.");
                                }
                                buttonsToCollect.shift();
                                setTimeout(collectSeasonRewards, 1000);
                                return;
                            }
                            else {
                                LogUtils_logHHAuto("Selecting reward n°" + currentToCollect.tier + " : " + currentToCollect.reward);
                                currentToCollect.button.click();
                                setTimeout(function () { collectSeasonRewards(true); }, randomInterval(300, 500));
                            }
                        }
                        else {
                            LogUtils_logHHAuto("Season collection finished.");
                            setTimer('nextSeasonCollectTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180));
                            gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                        }
                    }
                    collectSeasonRewards();
                    return true;
                }
                else {
                    LogUtils_logHHAuto("No season collection to do.");
                    setTimer('nextSeasonCollectTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180));
                    setTimer('nextSeasonCollectAllTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180));
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                    return false;
                }
            }
            return false;
        }
        else {
            LogUtils_logHHAuto("Switching to Season Rewards screen.");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDSeason"));
            return true;
        }
    }
    static styles() {
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_SeasonMaskRewards") === "true") {
            Season.maskReward();
        }
    }
    static maskReward() {
        if ($('.HHaHidden').length > 0 || $('.script-hide-claimed').length > 0 /*OCD*/) {
            return;
        }
        var arrayz;
        var nbReward;
        let modified = false;
        arrayz = $('.rewards_pair:not([style*="display:none"]):not([style*="display: none"])');
        if ($("div#gsp_btn_holder[style='display: none;']").length) {
            nbReward = 2;
        }
        else {
            nbReward = 1;
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
        if (modified) {
            $('.rewards_seasons_row').css('width', 'max-content');
            const $rowScroll = $('.rewards_container_seasons');
            if ($rowScroll.length && $rowScroll.getNiceScroll(0).doScrollLeft) {
                $rowScroll.getNiceScroll().resize();
                $rowScroll.getNiceScroll(0).doScrollLeft(0, 200);
            }
        }
    }
}

;// CONCATENATED MODULE: ./src/Module/Events/Seasonal.ts




class SeasonalEvent {
    static isMegaSeasonalEvent() {
        return $('#get_mega_pass_kobans_btn').length > 0;
    }
    static isMegaPassPaid() {
        return $('#get_mega_pass_kobans_btn:visible').length <= 0;
    }
    static getRemainingTime() {
        const seasonalEventTimerRequest = `.mega-event-panel .mega-event-container .mega-timer span[rel=expires]`;
        if ($(seasonalEventTimerRequest).length > 0 && (getSecondsLeft("SeasonalEventRemainingTime") === 0 || getStoredValue(HHStoredVarPrefixKey + "Temp_SeasonalEventEndDate") === undefined)) {
            const seasonalEventTimer = Number(convertTimeToInt($(seasonalEventTimerRequest).text()));
            setTimer("SeasonalEventRemainingTime", seasonalEventTimer);
            setStoredValue(HHStoredVarPrefixKey + "Temp_SeasonalEventEndDate", Math.ceil(new Date().getTime() / 1000) + seasonalEventTimer);
        }
    }
    static displayRemainingTime() {
        LogUtils_logHHAuto('Not implemented');
    }
    static getSeasonalNotClaimedRewards() {
        const arrayz = $(SeasonalEvent.SEASONAL_REWARD_PATH);
        const freeSlotSelectors = ".slot";
        const paidSlotSelectors = ""; // Not available
        return RewardHelper.computeRewardsCount(arrayz, freeSlotSelectors, paidSlotSelectors);
    }
    static getMegaSeasonalNotClaimedRewards() {
        const arrayz = $(SeasonalEvent.SEASONAL_REWARD_MEGA_PATH);
        const freeSlotSelectors = ".free-slot .slot";
        const paidSlotSelectors = SeasonalEvent.isMegaPassPaid() ? ".paid-unclaimed .slot" : "";
        return RewardHelper.computeRewardsCount(arrayz, freeSlotSelectors, paidSlotSelectors);
    }
    static goAndCollect(manualCollectAll = false) {
        const rewardsToCollect = isJSON(getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonalEventCollectablesList")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonalEventCollectablesList")) : [];
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDSeasonalEvent")) {
            SeasonalEvent.getRemainingTime();
            const isMegaSeasonalEvent = SeasonalEvent.isMegaSeasonalEvent();
            const seasonalEventEnd = getSecondsLeft("SeasonalEventRemainingTime");
            // logHHAuto("Seasonal end in " + seasonalEventEnd);
            const needToCollect = (checkTimer('nextSeasonalEventCollectTime') && getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonalEventCollect") === "true");
            const needToCollectAllBeforeEnd = (checkTimer('nextSeasonalEventCollectAllTime') && seasonalEventEnd < getLimitTimeBeforeEnd() && getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonalEventCollectAll") === "true");
            const seasonalTierQuery = "#home_tab_container div.bottom-container div.right-part-container div.mega-progress-bar-tiers div.mega-tier.unclaimed";
            const megaSeasonalTierQuery = "#home_tab_container div.bottom-container div.right-part-container div.mega-progress-bar-section div.mega-tier-container:has(.free-slot button.mega-claim-reward)";
            const seasonalFreeSlotQuery = ".mega-slot .slot,.mega-slot .slot_girl_shards";
            const seasonalPaidSlotQuery = ""; // N/A
            const megaSeasonalFreeSlotQuery = ".free-slot .slot";
            const megaSeasonalPaidSlotQuery = ".pass-slot.paid-unclaimed .slot";
            if (needToCollect || needToCollectAllBeforeEnd || manualCollectAll) {
                if (needToCollect)
                    LogUtils_logHHAuto("Checking SeasonalEvent for collectable rewards.");
                if (needToCollectAllBeforeEnd)
                    LogUtils_logHHAuto("Going to collect all SeasonalEvent rewards.");
                if (manualCollectAll)
                    LogUtils_logHHAuto("Going to collect all SeasonalEvent rewards after collect all button usage.");
                LogUtils_logHHAuto("setting autoloop to false");
                setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                let buttonsToCollect = [];
                const listSeasonalEventTiersToClaim = isMegaSeasonalEvent ? $(megaSeasonalTierQuery) : $(seasonalTierQuery);
                const freeSlotQuery = isMegaSeasonalEvent ? megaSeasonalFreeSlotQuery : seasonalFreeSlotQuery;
                const paidSlotQuery = isMegaSeasonalEvent ? megaSeasonalPaidSlotQuery : seasonalPaidSlotQuery;
                const isPassPaid = isMegaSeasonalEvent && SeasonalEvent.isMegaPassPaid();
                for (let currentTier = 0; currentTier < listSeasonalEventTiersToClaim.length; currentTier++) {
                    const currentButton = $("button[rel='claim']", listSeasonalEventTiersToClaim[currentTier])[0];
                    const currentTierNb = currentButton.getAttribute("tier");
                    //console.log("checking tier : "+currentTierNb);
                    const freeSlotType = RewardHelper.getRewardTypeBySlot($(freeSlotQuery, listSeasonalEventTiersToClaim[currentTier])[0]);
                    if (rewardsToCollect.includes(freeSlotType) || needToCollectAllBeforeEnd || manualCollectAll) {
                        if (isPassPaid) {
                            // One button for both
                            const paidSlotType = RewardHelper.getRewardTypeBySlot($(paidSlotQuery, listSeasonalEventTiersToClaim[currentTier])[0]);
                            if (rewardsToCollect.includes(paidSlotType) || needToCollectAllBeforeEnd || manualCollectAll) {
                                buttonsToCollect.push(currentButton);
                                LogUtils_logHHAuto("Adding for collection tier (free + paid) : " + currentTierNb);
                            }
                            else {
                                LogUtils_logHHAuto("Can't add tier " + currentTierNb + " as paid reward isn't to be colled");
                            }
                        }
                        else {
                            buttonsToCollect.push(currentButton);
                            LogUtils_logHHAuto("Adding for collection tier (only free) : " + currentTierNb);
                        }
                    }
                }
                if (buttonsToCollect.length > 0) {
                    function closeRewardAndCollectagain() {
                        RewardHelper.closeRewardPopupIfAny(false);
                        setTimeout(collectSeasonalEventRewards, randomInterval(300, 500));
                    }
                    function collectSeasonalEventRewards() {
                        if (buttonsToCollect.length > 0) {
                            LogUtils_logHHAuto("Collecting tier : " + buttonsToCollect[0].getAttribute('tier'));
                            buttonsToCollect[0].click();
                            buttonsToCollect.shift();
                            setTimeout(closeRewardAndCollectagain, randomInterval(300, 500));
                        }
                        else {
                            LogUtils_logHHAuto("SeasonalEvent collection finished.");
                            setTimer('nextSeasonalEventCollectTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180));
                            if (!manualCollectAll) {
                                gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                            }
                        }
                    }
                    collectSeasonalEventRewards();
                    return true;
                }
                else {
                    LogUtils_logHHAuto("No SeasonalEvent reward to collect.");
                    setTimer('nextSeasonalEventCollectTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180));
                    setTimer('nextSeasonalEventCollectAllTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180));
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                    return false;
                }
            }
            return false;
        }
        else if (unsafeWindow.seasonal_event_active || unsafeWindow.seasonal_time_remaining > 0) {
            LogUtils_logHHAuto("Switching to SeasonalEvent screen.");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDSeasonalEvent"));
            return true;
        }
        else {
            LogUtils_logHHAuto("No SeasonalEvent active.");
            setTimer('nextSeasonalEventCollectTime', 604800); // 1 week delay
            setTimer('nextSeasonalEventCollectAllTime', 604800); // 1 week delay
            return false;
        }
    }
    static styles() {
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_SeasonalEventMaskRewards") === "true") {
            SeasonalEvent.maskReward();
        }
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_showRewardsRecap") === "true") {
            SeasonalEvent.displayRewardsSeasonalDiv();
            // SeasonalEvent.displayGirlsMileStones(); // TODO fixme
            SeasonalEvent.displayCollectAllButton();
        }
    }
    static hasUnclaimedRewards() {
        return $(SeasonalEvent.SEASONAL_REWARD_MEGA_PATH + ', ' + SeasonalEvent.SEASONAL_REWARD_PATH).length > 0;
    }
    static maskReward() {
        var arrayz;
        let modified = false;
        const isMegaSeasonalEvent = SeasonalEvent.isMegaSeasonalEvent();
        const seasonalTierQuery = ".mega-progress-bar-tiers .mega-tier-container";
        const megaSeasonalTierQuery = ".mega-progress-bar-tiers .mega-tier-container";
        arrayz = $((isMegaSeasonalEvent ? megaSeasonalTierQuery : seasonalTierQuery) + ':not([style*="display:none"]):not([style*="display: none"])');
        var obj;
        if (arrayz.length > 0) {
            for (var i2 = arrayz.length - 1; i2 >= 0; i2--) {
                obj = $(arrayz[i2]).find('.claimed:not([style*="display:none"]):not([style*="display: none"])'); // TODO ".paid-claimed .slot"
                if (obj.length >= 1) {
                    arrayz[i2].style.display = "none";
                    modified = true;
                }
            }
        }
        if (modified) {
            let divToModify = $('.seasonal-progress-bar-section, .mega-progress-bar-section');
            if (divToModify.length > 0) {
                divToModify.getNiceScroll().resize();
                const width_px = 152.1;
                const start_px = 101;
                const rewards_unclaimed = $('.mega-tier.unclaimed, .free-slot:not(.claimed)').length;
                const scroll_width_hidden = Math.floor(start_px + (rewards_unclaimed - 1) * width_px);
                $('.seasonal-progress-bar-current, .mega-progress-bar').css('width', scroll_width_hidden + 'px');
                try {
                    divToModify.getNiceScroll(0).doScrollLeft(0, 200);
                }
                catch (err) { }
            }
        }
    }
    static displayCollectAllButton() {
        if (SeasonalEvent.hasUnclaimedRewards() && $('#SeasonalCollectAll').length == 0) {
            const button = $(`<button class="purple_button_L" id="SeasonalCollectAll">${getTextForUI("collectAllButton", "elementText")}</button>`);
            const divTooltip = $(`<div class="tooltipHH" style="position: absolute;top: 260px;width: 110px;font-size: small;"><span class="tooltipHHtext">${getTextForUI("collectAllButton", "tooltip")}</span></div>`);
            divTooltip.append(button);
            $('#home_tab_container .bottom-container').append(divTooltip);
            button.one('click', () => {
                SeasonalEvent.goAndCollect(true);
            });
        }
    }
    static displayGirlsMileStones() {
        if ($('.HHGirlMilestone').length > 0)
            return;
        const $playerPoints = $('.player-shards .mega-event-currency');
        if ($playerPoints.length == 0) {
            LogUtils_logHHAuto("ERROR: Can't find player points");
        }
        const playerPoints = $playerPoints.length ? Number($playerPoints.text()) : 0;
        const girlContainer = $('.girls-reward-container');
        const girlSlotRewards = $('#home_tab_container .bottom-container .slot.slot_girl_shards');
        girlSlotRewards.each(function (index, girlSlot) {
            const milestone = Number($('.tier-level p', $(girlSlot).parents('.mega-tier-container')).text());
            if (milestone > 0) {
                girlContainer.append(SeasonalEvent.getGirlMileStonesDiv(playerPoints, milestone, index + 1));
            }
        });
    }
    static getGirlMileStonesDiv(playerPoints, girlPointsTarget, girlIndex) {
        const greeNitckHtml = '<img class="nc-claimed-reward-check" src="' + ConfigHelper.getHHScriptVars("baseImgPath") + '/clubs/ic_Tick.png">';
        const girlDiv = $('<div class="HHGirlMilestone girl-img-' + girlIndex + '"><div>Girl ' + girlIndex + ':' + playerPoints + '/' + girlPointsTarget + '</div></div>');
        if (playerPoints >= girlPointsTarget) {
            girlDiv.addClass('green');
            girlDiv.append($(greeNitckHtml));
        }
        return girlDiv;
    }
    static displayRewardsSeasonalDiv() {
        const target = $('.girls-reward-container'); // $('.event-resource-location');
        const hhRewardId = 'HHSeasonalRewards';
        const isMegaSeasonalEvent = SeasonalEvent.isMegaSeasonalEvent();
        try {
            if ($('#' + hhRewardId).length <= 0) {
                const rewardCountByType = isMegaSeasonalEvent ? SeasonalEvent.getMegaSeasonalNotClaimedRewards() : SeasonalEvent.getSeasonalNotClaimedRewards();
                LogUtils_logHHAuto("Rewards seasonal event:", JSON.stringify(rewardCountByType));
                if (rewardCountByType['all'] > 0) {
                    // GM_addStyle('.seasonal-event-panel .seasonal-event-container .tabs-section #home_tab_container .middle-container .event-resource-location .buttons-container { height: 5rem; margin-top: 0;}'); 
                    // GM_addStyle('.seasonal-event-panel .seasonal-event-container .tabs-section #home_tab_container .middle-container .event-resource-location .buttons-container a { height: 2rem;}'); 
                    const rewardsHtml = RewardHelper.getRewardsAsHtml(rewardCountByType);
                    target.append($('<div id=' + hhRewardId + ' class="HHRewardNotCollected"><h1 style="font-size: small;">' + getTextForUI('rewardsToCollectTitle', "elementText") + '</h1>' + rewardsHtml + '</div>'));
                }
                else {
                    target.append($('<div id=' + hhRewardId + ' style="display:none;"></div>'));
                }
            }
        }
        catch (err) {
            LogUtils_logHHAuto("ERROR:", err.message);
            target.append($('<div id=' + hhRewardId + ' style="display:none;"></div>'));
        }
    }
    static goAndCollectMegaEventRankRewards() {
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDSeasonalEvent")) {
            const isMegaSeasonalEvent = SeasonalEvent.isMegaSeasonalEvent();
            const topRank = $('#mega-event-tabs #top_ranking_tab');
            const eventRank = $('#mega-event-tabs #event_ranking_tab');
            if (!isMegaSeasonalEvent && topRank.length === 0 && eventRank.length === 0) {
                LogUtils_logHHAuto('Not Mega Event');
                setTimer('nextMegaEventRankCollectTime', 604800); // 1 week delay
                return false;
            }
            else if (topRank.length > 0 || eventRank.length > 0) {
                LogUtils_logHHAuto('Not Mega Event but rank tab exist');
            }
            LogUtils_logHHAuto('Collect Mega Event Rank Rewards');
            // switch tabs
            if (topRank.length > 0)
                topRank.trigger("click");
            else if (eventRank.length > 0)
                eventRank.trigger("click");
            setTimer('nextMegaEventRankCollectTime', TimeHelper.getSecondsLeftBeforeEndOfHHDay() + randomInterval(3600, 4000));
        }
        else if (unsafeWindow.seasonal_event_active || unsafeWindow.seasonal_time_remaining > 0) {
            LogUtils_logHHAuto("Switching to SeasonalEvent screen.");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDSeasonalEvent"));
            return true;
        }
        else {
            LogUtils_logHHAuto("No SeasonalEvent active.");
            setTimer('nextMegaEventRankCollectTime', 604800); // 1 week delay
        }
        return false;
    }
}
SeasonalEvent.SEASONAL_REWARD_PATH = '.mega-tier.unclaimed';
SeasonalEvent.SEASONAL_REWARD_MEGA_PATH = '.mega-tier-container:has(.free-slot button.mega-claim-reward)';

;// CONCATENATED MODULE: ./src/Module/Events/index.ts










;// CONCATENATED MODULE: ./src/Module/Quest.ts




class QuestHelper {
    static getEnergy() {
        return Number(getHHVars('Hero.energies.quest.amount'));
    }
    static getEnergyMax() {
        return Number(getHHVars('Hero.energies.quest.max_regen_amount'));
    }
    static getNextQuestLink() {
        const mainQuest = getStoredValue(HHStoredVarPrefixKey + "Setting_autoQuest") === "true";
        const sideQuest = ConfigHelper.getHHScriptVars("isEnabledSideQuest", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoSideQuest") === "true";
        let nextQuestUrl = QuestHelper.getMainQuestUrl();
        if ((mainQuest && sideQuest && (nextQuestUrl.includes("world"))) || (!mainQuest && sideQuest)) {
            nextQuestUrl = QuestHelper.SITE_QUEST_PAGE;
        }
        else if (nextQuestUrl.includes("world")) {
            return undefined;
        }
        return nextQuestUrl;
    }
    static getMainQuestUrl() {
        let mainQuestUrl = getHHVars('Hero.infos.questing.current_url');
        const id_world = Number(getHHVars('Hero.infos.questing.id_world'));
        const id_quest = Number(getHHVars('Hero.infos.questing.id_quest'));
        const lastQuestId = ConfigHelper.getHHScriptVars("lastQuestId", false);
        const trollz = ConfigHelper.getHHScriptVars("trollzList");
        if (id_world < (trollz.length) || lastQuestId > 0 && id_quest != lastQuestId) {
            // Fix when KK quest url is world url
            mainQuestUrl = "/quest/" + id_quest;
        }
        return mainQuestUrl;
    }
    static run() {
        //logHHAuto("Starting auto quest.");
        // Check if at correct page.
        let page = getPage();
        let mainQuestUrl = QuestHelper.getMainQuestUrl();
        let doMainQuest = getStoredValue(HHStoredVarPrefixKey + "Setting_autoQuest") === "true" && !mainQuestUrl.includes("world");
        if (!doMainQuest && page === 'side-quests' && ConfigHelper.getHHScriptVars("isEnabledSideQuest", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoSideQuest") === "true") {
            var quests = $('.side-quest:has(.slot) .side-quest-button');
            if (quests.length > 0) {
                LogUtils_logHHAuto("Navigating to side quest.");
                gotoPage(quests.attr('href'));
            }
            else {
                LogUtils_logHHAuto("All quests finished, setting timer to check back later!");
                if (checkTimer('nextMainQuestAttempt')) {
                    setTimer('nextMainQuestAttempt', 604800);
                } // 1 week delay
                setTimer('nextSideQuestAttempt', 604800); // 1 week delay
                location.reload();
            }
            return;
        }
        if (page !== ConfigHelper.getHHScriptVars("pagesIDQuest") || (doMainQuest && mainQuestUrl != window.location.pathname)) {
            // Click on current quest to naviagte to it.
            LogUtils_logHHAuto("Navigating to current quest.");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDQuest"));
            return;
        }
        $("#popup_message close").click();
        $("#level_up close").click();
        // Get the proceed button type
        var proceedButtonMatch = $("#controls button:not([style*='display:none']):not([style*='display: none'])");
        if (proceedButtonMatch.length === 0) {
            proceedButtonMatch = $("#controls button#free");
        }
        var proceedType = proceedButtonMatch.attr("id");
        //console.log("DebugQuest proceedType : "+proceedType);
        if (proceedButtonMatch.length === 0) {
            LogUtils_logHHAuto("Could not find resume button.");
            return;
        }
        else if (proceedButtonMatch.attr('disabled') && proceedType != "end_play") {
            LogUtils_logHHAuto("Button is disabled for animation wait a bit.");
            return;
        }
        if (proceedType === "free") {
            LogUtils_logHHAuto("Proceeding for free.");
            //setStoredValue"HHAuto_Temp_autoLoop", "false");
            //logHHAuto("setting autoloop to false");
            //proceedButtonMatch.click();
        }
        else if (proceedType === "pay") {
            var proceedButtonCost = $("#controls button:not([style*='display:none']):not([style*='display: none']) .action-cost .price");
            var proceedCost = parsePrice(proceedButtonCost[0].innerText);
            var payTypeNRJ = $("#controls button:not([style*='display:none']):not([style*='display: none']) .action-cost .energy_quest_icn").length > 0;
            var energyCurrent = QuestHelper.getEnergy();
            var moneyCurrent = getHHVars('Hero.currencies.soft_currency');
            let payType = $("#controls .cost span[cur]:not([style*='display:none']):not([style*='display: none'])").attr('cur');
            //console.log("DebugQuest payType : "+payType);
            if (payTypeNRJ) {
                // console.log("DebugQuest ENERGY for : "+proceedCost + " / " + energyCurrent);
                if (proceedCost <= energyCurrent) {
                    // We have energy.
                    LogUtils_logHHAuto("Spending " + proceedCost + " Energy to proceed.");
                }
                else {
                    LogUtils_logHHAuto("Quest requires " + proceedCost + " Energy to proceed.");
                    setStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement", "*" + proceedCost);
                    return;
                }
            }
            else {
                console.log("DebugQuest MONEY for : " + proceedCost);
                if (proceedCost <= moneyCurrent) {
                    // We have money.
                    LogUtils_logHHAuto("Spending " + proceedCost + " Money to proceed.");
                }
                else {
                    LogUtils_logHHAuto("Need " + proceedCost + " Money to proceed.");
                    setStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement", "$" + proceedCost);
                    return;
                }
            }
            //proceedButtonMatch.click();
            //setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            //logHHAuto("setting autoloop to false");
        }
        else if (proceedType === "use_item") {
            LogUtils_logHHAuto("Proceeding by using X" + Number($("#controls .item span").text()) + " of the required item.");
            //proceedButtonMatch.click();
            //setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            //logHHAuto("setting autoloop to false");
        }
        else if (proceedType === "battle") {
            LogUtils_logHHAuto("Quest need battle...");
            setStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement", "battle");
            // Proceed to battle troll.
            //proceedButtonMatch.click();
            //setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            //logHHAuto("setting autoloop to false");
        }
        else if (proceedType === "end_archive") {
            LogUtils_logHHAuto("Reached end of current archive. Proceeding to next archive.");
            //setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            //logHHAuto("setting autoloop to false");
            //proceedButtonMatch.click();
        }
        else if (proceedType === "end_play") {
            let rewards = $('#popups[style="display: block;"]>#rewards_popup[style="display: block;"] button.blue_button_L[confirm_blue_button]');
            if (proceedButtonMatch.attr('disabled') && rewards.length > 0) {
                LogUtils_logHHAuto("Reached end of current archive. Claim reward.");
                rewards.click();
                return;
            }
            LogUtils_logHHAuto("Reached end of current play. Proceeding to next play.");
            //setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            //logHHAuto("setting autoloop to false");
            //proceedButtonMatch.click();
        }
        else {
            LogUtils_logHHAuto("Could not identify given resume button.");
            setStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement", "unknownQuestButton");
            return;
        }
        setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
        LogUtils_logHHAuto("setting autoloop to false");
        setTimeout(function () {
            proceedButtonMatch.click();
            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "true");
            LogUtils_logHHAuto("setting autoloop to true");
            setTimeout(autoLoop, randomInterval(800, 1200));
        }, randomInterval(500, 800));
        //setTimeout(function () {location.reload();},randomInterval(800,1500));
    }
}
QuestHelper.SITE_QUEST_PAGE = '/side-quests.html';

;// CONCATENATED MODULE: ./src/Module/Champion.ts







class Champion {
    run() {
    }
    static ChampDisplayAutoTeamPopup(numberDone, numberEnd, remainingTime) {
        $(".champions-top__inner-wrapper").prepend('<div id="popup_message_champ" class="HHpopup_message" name="popup_message_champ" style="margin:0px;width:400px" ><a id="popup_message_champ_close" class="close">&times;</a>'
            + getTextForUI("autoChampsTeamLoop", "elementText") + ' : <br>' + numberDone + '/' + numberEnd + ' (' + remainingTime + 'sec)</div>');
        $("#popup_message_champ_close").on("click", function () { location.reload(); });
    }
    static ChampClearAutoTeamPopup() {
        $("#popup_message_champ").each(function () { this.remove(); });
    }
    static ChamppUpdateAutoTeamPopup(numberDone, numberEnd, remainingTime) {
        Champion.ChampClearAutoTeamPopup();
        Champion.ChampDisplayAutoTeamPopup(numberDone, numberEnd, remainingTime);
    }
    static moduleSimChampions() {
        if ($('#updateChampTeamButton').length > 0) {
            return;
        }
        var getPoses = function ($images) {
            var poses = [];
            $images.each(function (idx, pose) {
                var imgSrc = $(pose).attr('src') || '';
                var poseNumber = imgSrc.substring(imgSrc.lastIndexOf('/') + 1).replace(/\D/g, '');
                poses.push(poseNumber);
            });
            return poses;
        };
        var getChampMaxLoop = function () { return getStoredValue(HHStoredVarPrefixKey + "Setting_autoChampsTeamLoop") !== undefined ? getStoredValue(HHStoredVarPrefixKey + "Setting_autoChampsTeamLoop") : 10; };
        var getMinGirlPower = function () { return getStoredValue(HHStoredVarPrefixKey + "Setting_autoChampsGirlThreshold") !== undefined ? getStoredValue(HHStoredVarPrefixKey + "Setting_autoChampsGirlThreshold") : 50000; };
        var getChampSecondLine = function () { return getStoredValue(HHStoredVarPrefixKey + "Setting_autoChampsTeamKeepSecondLine") === 'true'; };
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
        const changeDraftButtonQuery = ".champions-bottom__footer button.champions-bottom__draft-team";
        const newDraftButtonQuery = ".champions-bottom__footer button.champions-bottom__make-draft";
        const confirmDraftButtonQuery = ".champions-bottom__footer button.champions-bottom__confirm-team";
        //$(".champions-top__inner-wrapper").append(champTeamButton);
        if (freeDrafts > 0) {
            let updateChampTeamButton = '<div style="position: absolute;left: 330px;top: 10px;width:90px;z-index:10" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("updateChampTeamButton", "tooltip") + '</span><label class="myButton" id="updateChampTeamButton">' + getTextForUI("updateChampTeamButton", "elementText") + ' x' + maxLoops + '</label></div>';
            $(".champions-top__inner-wrapper").append(updateChampTeamButton);
        }
        var indicateBestTeam = function () {
            const girlBoxes = $(girlBoxesQuery);
            var girlsPerPose = {};
            var girls = [];
            $(".hhgirlOrder").remove();
            girlBoxes.each(function (girlIndex, girlBox) {
                const $girl = $('.girl-box__draggable ', $(girlBox));
                const girlData = champTeam[girlIndex];
                if (girlData.id_girl != $girl.attr('id_girl')) {
                    LogUtils_logHHAuto('Invalid girls ' + girlData.id_girl + 'vs' + $girl.attr('id_girl'));
                    return;
                }
                const poseNumber = girlData.figure;
                if (!girlsPerPose[poseNumber]) {
                    girlsPerPose[poseNumber] = [];
                }
                girlsPerPose[poseNumber].push({ data: girlData, htmlDom: $girl });
                girlsPerPose[poseNumber].sort((a, b) => b.data.damage - a.data.damage);
                girls.push({ data: girlData, htmlDom: $girl });
                girls.sort((a, b) => a.data.damage - b.data.damage);
            });
            for (var i = 0; i < 10; i++) {
                var expectedPose = championRequiredPoses[i % 5];
                if (girlsPerPose[expectedPose] && girlsPerPose[expectedPose].length > 0) {
                    let color = 'gold'; // i >= 5 ? 'white' : 'gold';
                    girlsPerPose[expectedPose][0].htmlDom.append('<span class="hhgirlOrder" title="' + getTextForUI("ChampGirlOrder", "tooltip") + ' ' + (i + 1) + '" style="position: absolute;top: 41px;left: 3px;z-index: 10;color:' + color + ';">' + (i + 1) + '</span>');
                    girlsPerPose[expectedPose].shift();
                }
                if (girls && girls[i])
                    girls[i].htmlDom.append('<span class="hhgirlOrder" title="' + getTextForUI("ChampGirlLowOrder", "tooltip") + ' ' + (i + 1) + '" style="position: absolute;top: 41px;left: 47px;z-index: 10;color:red;">' + (i + 1) + '</span>');
            }
        };
        //document.getElementById("ChampTeamButton").addEventListener("click", indicateBestTeam);
        GM_registerMenuCommand(getTextForUI("ChampTeamButton", "elementText"), indicateBestTeam);
        $(document).on('click', changeDraftButtonQuery, indicateBestTeam);
        $(document).on('click', newDraftButtonQuery, indicateBestTeam);
        $(document).on('click', confirmDraftButtonQuery, indicateBestTeam);
        var checkAjaxCompleteOnChampionPage = function (event, request, settings) {
            let match = settings.data.match(/action=champion_team_draft/);
            if (match === null)
                return;
            champTeam = request.responseJSON.teamArray;
            freeDrafts = request.responseJSON.freeDrafts;
            setTimeout(indicateBestTeam, 1000);
        };
        var selectGirls = function () {
            Champion.ChamppUpdateAutoTeamPopup(counterLoop + 1, maxLoops, (maxLoops - counterLoop) * 5);
            $('#updateChampTeamButton').text('Loop ' + (counterLoop + 1) + '/' + maxLoops);
            const girlBoxes = $(".champions-middle__girl-selection.champions-animation .girl-selection__girl-box");
            var girlsPerPose = {};
            var girls = [];
            var teamGirls = [];
            var girlsClicked = false;
            girlBoxes.each(function (girlIndex, girlBox) {
                const $girl = $('.girl-box__draggable ', $(girlBox));
                const girlData = champTeam[girlIndex];
                if (girlData.id_girl != $girl.attr('id_girl')) {
                    LogUtils_logHHAuto('Invalid girls ' + girlData.id_girl + 'vs' + $girl.attr('id_girl'));
                    return;
                }
                const poseNumber = girlData.figure;
                if (!girlsPerPose[poseNumber]) {
                    girlsPerPose[poseNumber] = [];
                }
                girlsPerPose[poseNumber].push({ data: girlData, htmlDom: $girl });
                girlsPerPose[poseNumber].sort((a, b) => b.data.damage - a.data.damage);
                girls.push({ data: girlData, htmlDom: $girl });
                girls.sort((a, b) => a.data.damage - b.data.damage);
            });
            const hero_damage = unsafeWindow.championData.hero_damage;
            // Build team
            if (keepSecondLineGirls) {
                var teamGirlIndex = 0;
                for (var i = 0; i < 10; i++) {
                    var expectedPose = championRequiredPoses[i % 5];
                    if (girlsPerPose[expectedPose] && girlsPerPose[expectedPose].length > 0 && teamGirlIndex < 5) {
                        if ((girlsPerPose[expectedPose][0].data.damage + hero_damage) >= girlMinPower) {
                            teamGirls[teamGirlIndex++] = girlsPerPose[expectedPose][0].data.id_girl;
                        }
                        girlsPerPose[expectedPose].shift();
                    }
                }
            }
            else {
                for (var i = 0; i < 5; i++) {
                    var expectedPose = championRequiredPoses[i % 5];
                    teamGirls[i] = -1;
                    if (girlsPerPose[expectedPose] && girlsPerPose[expectedPose].length > 0) {
                        if ((girlsPerPose[expectedPose][0].data.damage + hero_damage) >= girlMinPower) {
                            teamGirls[i] = girlsPerPose[expectedPose][0].data.id_girl;
                        }
                        girlsPerPose[expectedPose].shift();
                    }
                }
            }
            LogUtils_logHHAuto('Team of girls ' + teamGirls);
            var toggleSelectGirl = function (girlId, girlDraggable, timer = 1000) {
                setTimeout(function () {
                    console.log("click " + girlId, girlDraggable);
                    girlDraggable.click();
                }, timer);
            };
            // Unselect girls
            const selectedGirls = $(".champions-middle__girl-selection.champions-animation .girl-selection__girl-box .girl-box__draggable.selected");
            selectedGirls.each(function (girlIndex, girlBox) {
                const selectedGirlId = $(girlBox).attr('id_girl');
                if (teamGirls.indexOf(selectedGirlId) < 0) {
                    girlsClicked = true;
                    LogUtils_logHHAuto("Unselected as out of the team :" + selectedGirlId);
                    toggleSelectGirl(selectedGirlId, $(girlBox), randomInterval(300, 600));
                }
            });
            // Select girls
            for (var i = 0; i < 5; i++) {
                if (teamGirls[i] >= 0) {
                    var girlDraggable = $('.girl-box__draggable[id_girl="' + teamGirls[i] + '"]');
                    if (!girlDraggable.hasClass('selected')) {
                        girlsClicked = true;
                        LogUtils_logHHAuto("Girl not selected :" + teamGirls[i]);
                        toggleSelectGirl(teamGirls[i], girlDraggable, randomInterval(800, 1200));
                    }
                    else {
                        LogUtils_logHHAuto("Girl already selected :" + teamGirls[i]);
                    }
                }
            }
            var newDraftInterval = girlsClicked ? randomInterval(1800, 2500) : randomInterval(800, 1500);
            setTimeout(function () {
                if ($(newDraftButtonQuery).length > 0)
                    $(newDraftButtonQuery).click();
            }, newDraftInterval);
            LogUtils_logHHAuto("Free drafts remanings :" + freeDrafts);
            counterLoop++;
            if (freeDrafts > 0 && counterLoop <= maxLoops) {
                setTimeout(selectGirls, randomInterval(3500, 5500)); // Wait animation
            }
            else {
                Champion.ChampClearAutoTeamPopup();
                $('#updateChampTeamButton').removeAttr('disabled').text(getTextForUI("updateChampTeamButton", "elementText") + ' x' + maxLoops);
                if ($(confirmDraftButtonQuery).length > 0)
                    $(confirmDraftButtonQuery).click();
                LogUtils_logHHAuto("Auto team ended, refresh page, restarting autoloop");
                location.reload();
            }
        };
        var findBestTeam = function () {
            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
            LogUtils_logHHAuto("setting autoloop to false");
            maxLoops = getChampMaxLoop();
            keepSecondLineGirls = getChampSecondLine();
            $('#updateChampTeamButton').attr('disabled', 'disabled').text('Starting soon...');
            Champion.ChamppUpdateAutoTeamPopup('Starting soon...', maxLoops, (maxLoops) * 2);
            LogUtils_logHHAuto("keep second line : " + keepSecondLineGirls);
            counterLoop = 0;
            if ($(changeDraftButtonQuery).length > 0)
                $(changeDraftButtonQuery).click();
            setTimeout(selectGirls, randomInterval(800, 1300));
        };
        $(document).on('ajaxComplete', checkAjaxCompleteOnChampionPage);
        setTimeout(indicateBestTeam, randomInterval(800, 1200));
        if (freeDrafts > 0) {
            if ($('#updateChampTeamButton').length > 0)
                $("#updateChampTeamButton").on("click", findBestTeam);
            GM_registerMenuCommand(getTextForUI("updateChampTeamButton", "elementText"), findBestTeam);
        }
        else {
            LogUtils_logHHAuto("No more free draft available");
        }
    }
    static getChampionListFromMap() {
        const Filter = (getStoredValue(HHStoredVarPrefixKey + "Setting_autoChampsFilter") || '').split(';').map(s => Number(s));
        const championMap = [];
        // const autoChampsForceStart = getStoredValue(HHStoredVarPrefixKey + "Setting_autoChampsForceStart") === "true";
        const autoChampsForceStartEventGirl = getStoredValue(HHStoredVarPrefixKey + "Setting_autoChampsForceStartEventGirl") === "true";
        const autoChampsEventGirls = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_autoChampsEventGirls")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_autoChampsEventGirls")) : [];
        const championWithEventGirl = autoChampsEventGirls.map(a => Number(a.champ_id));
        $('span.stage-bar-tier').each(function (i, tier) {
            const champion = new ChampionModel(i, (tier.getAttribute("hh_title") || '').split('/')[0].replace(/[^0-9]/gi, ''), Filter.includes(i + 1));
            let timerElm = $($('a.champion-lair div.champion-lair-name')[i + 1]).find('span[rel=expires]').text();
            if (timerElm !== undefined && timerElm !== null && timerElm.length > 0) {
                champion.timer = Number(convertTimeToInt(timerElm));
            }
            champion.hasEventGirls = championWithEventGirl.includes(i + 1);
            if (autoChampsForceStartEventGirl && championWithEventGirl.includes(i + 1) && champion.timer < 0) {
                champion.timer = 0;
            }
            // if (autoChampsForceStart && champion.timer < 0) {
            //     champion.timer = 0;
            // }
            championMap.push(champion);
        });
        return championMap;
    }
    static doChampionStuff() {
        var page = getPage();
        if (page == ConfigHelper.getHHScriptVars("pagesIDChampionsPage")) {
            LogUtils_logHHAuto('on champion page');
            if ($('button[rel=perform].blue_button_L').length == 0) {
                LogUtils_logHHAuto('Something is wrong!');
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                return true;
            }
            else {
                var TCount = Number($('div.input-field > span')[1].innerText.split(' / ')[1]);
                var ECount = QuestHelper.getEnergy();
                LogUtils_logHHAuto("T:" + TCount + " E:" + ECount + " " + (getStoredValue(HHStoredVarPrefixKey + "Setting_autoChampsUseEne") === "true"));
                if (TCount == 0) {
                    LogUtils_logHHAuto("No tickets!");
                    const nextTime = randomInterval(3600, 4000);
                    setTimer('nextChampionTime', nextTime);
                    if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoClubChamp") === "true") {
                        // no ticket for both
                        setTimer('nextClubChampionTime', nextTime);
                    }
                    return false;
                }
                else {
                    if (TCount != 0) {
                        LogUtils_logHHAuto("Using ticket");
                        $('button[rel=perform].blue_button_L').click();
                    }
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDChampionsMap"));
                    return true;
                }
            }
        }
        else if (page == ConfigHelper.getHHScriptVars("pagesIDChampionsMap")) {
            LogUtils_logHHAuto('on champion map');
            const championMap = Champion.getChampionListFromMap();
            const autoChampsForceStartEventGirl = getStoredValue(HHStoredVarPrefixKey + "Setting_autoChampsForceStartEventGirl") === "true";
            const autoChampsEventGirls = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_autoChampsEventGirls")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_autoChampsEventGirls")) : [];
            const autoChampsForceStart = getStoredValue(HHStoredVarPrefixKey + "Setting_autoChampsForceStart") === "true";
            for (let i = 0; i < championMap.length; i++) {
                let OnTimer = championMap[i].timer > 0;
                let autoChampGirlInEvent = false;
                let autoChampGirlOnChamp = false;
                let autoChampGirlsIds = [];
                let autoChampGirlsEventsID;
                if (autoChampsForceStartEventGirl) {
                    for (let ec = autoChampsEventGirls.length; ec > 0; ec--) {
                        let idArray = Number(ec) - 1;
                        if (Number(autoChampsEventGirls[idArray].champ_id) === i + 1) {
                            autoChampGirlInEvent = true;
                            autoChampGirlsIds.push(Number(autoChampsEventGirls[idArray].girl_id));
                            autoChampGirlsEventsID = autoChampsEventGirls[idArray].event_id;
                        }
                    }
                    let firstLockedLevelOfChampRequest = 'a.champion-lair[href*=' + Number(i + 1) + '] .stage-icon.locked';
                    if (autoChampGirlInEvent && $(firstLockedLevelOfChampRequest).length > 0) {
                        let firstLockedLevelOfChamp = $(firstLockedLevelOfChampRequest)[0].getAttribute("champion-rewards-tooltip");
                        if (firstLockedLevelOfChamp !== undefined
                            && isJSON(firstLockedLevelOfChamp)
                            && JSON.parse(firstLockedLevelOfChamp || '').stage.girl_shards
                            && JSON.parse(firstLockedLevelOfChamp || '').stage.girl_shards.length > 0) {
                            let parsedFirstLockedLevelOfChamp = JSON.parse(firstLockedLevelOfChamp || '');
                            for (let girlIt = 0; girlIt < parsedFirstLockedLevelOfChamp.stage.girl_shards.length; girlIt++) {
                                if (autoChampGirlsIds.includes(parsedFirstLockedLevelOfChamp.stage.girl_shards[girlIt].id_girl)) {
                                    autoChampGirlOnChamp = true;
                                }
                            }
                            if (!autoChampGirlOnChamp) {
                                LogUtils_logHHAuto("Seems Girl is no more available at Champion " + Number(i + 1) + ". Going to event page.");
                                EventModule.parseEventPage(autoChampGirlsEventsID);
                                return true;
                            }
                        }
                    }
                }
                const eventGirlForced = autoChampGirlOnChamp;
                LogUtils_logHHAuto("Champion " + (i + 1) + " [" + championMap[i].impression + "]"
                    + (championMap[i].started ? " Started;" : " Not started;")
                    + (autoChampsForceStart ? " Force start;" : " Not force start;")
                    + (OnTimer ? " on timer;" : " not on timer;")
                    + (championMap[i].inFilter ? " Included in filter;" : " Excluded from filter;")
                    + (eventGirlForced ? " Forced for event" : " Not event forced"));
                if ((championMap[i].started || eventGirlForced || autoChampsForceStart) && !OnTimer && championMap[i].inFilter) {
                    LogUtils_logHHAuto("Let's do him!");
                    gotoPage('/champions/' + Number(i + 1));
                    //window.location = window.location.origin + '/champions/'+(i+1);
                    return true;
                }
            }
            LogUtils_logHHAuto("No good candidate");
            Champion.findNextChamptionTime(championMap);
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
            return false;
        }
        else {
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDChampionsMap"));
            return true;
        }
    }
    static findNextChamptionTime(championMap = undefined) {
        if (getPage() == ConfigHelper.getHHScriptVars("pagesIDChampionsMap")) {
            const debugEnabled = getStoredValue(HHStoredVarPrefixKey + "Temp_Debug") === 'true';
            const autoChampsForceStart = getStoredValue(HHStoredVarPrefixKey + "Setting_autoChampsForceStart") === "true";
            var minTime = -1; // less than 15min
            var minTimeEnded = -1;
            var currTime;
            if (championMap == undefined) {
                championMap = Champion.getChampionListFromMap();
            }
            // if (debugEnabled) logHHAuto('championMap: ', championMap);
            for (let i = 0; i < championMap.length; i++) {
                if (championMap[i].inFilter) {
                    currTime = championMap[i].timer;
                    if (currTime === 0) {
                        minTime = 0;
                        minTimeEnded = -1; // end loop so value is not accurate
                        break;
                    }
                    else if (currTime > 0) {
                        if (currTime > minTimeEnded) {
                            minTimeEnded = currTime;
                        }
                        if (currTime > minTime && currTime < 1800) {
                            minTime = currTime;
                        } // less than 30min
                    }
                    else if (!championMap[i].started && autoChampsForceStart) {
                        minTime = 0;
                        minTimeEnded = -1; // end loop so value is not accurate
                        break;
                    }
                }
            }
            //fetching min
            let nextChampionTime;
            LogUtils_logHHAuto('minTimeEnded: ' + minTimeEnded + ', minTime:' + minTime);
            if (minTime === -1 && minTimeEnded === -1) {
                nextChampionTime = randomInterval(3600, 4000);
            }
            else if (minTime === -1) {
                LogUtils_logHHAuto('Champion ended, next time: ' + minTimeEnded);
                nextChampionTime = randomInterval(minTimeEnded, 180 + minTimeEnded);
            }
            else {
                LogUtils_logHHAuto('Champion next time: ' + minTime);
                const maxTime = minTime > 0 ? 180 + minTime : 0.5;
                nextChampionTime = randomInterval(minTime, maxTime);
            }
            Champion._setTimer(nextChampionTime);
        }
    }
    /**
     *
     * @param {number} nextChampionTime
     * @private
     */
    static _setTimer(nextChampionTime) {
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoClubChamp") === "true"
            && getStoredValue(HHStoredVarPrefixKey + "Setting_autoChampAlignTimer") === "true"
            && getStoredValue(HHStoredVarPrefixKey + "Temp_clubChampLimitReached") !== "true") {
            const champClubTimeLeft = getSecondsLeft('nextClubChampionTime');
            if (nextChampionTime > 10 && champClubTimeLeft < 1200 && nextChampionTime < 1200) { // align settings
                // 20 min for standard wait time
                nextChampionTime = Math.max(nextChampionTime, champClubTimeLeft);
            }
        }
        setTimer('nextChampionTime', nextChampionTime);
    }
}

;// CONCATENATED MODULE: ./src/Module/Club.ts



class Club {
    static run() {
        const onChampTab = $("div.club-champion-members-challenges:visible").length === 1;
        if (onChampTab) {
            $('button.orange_button_L.btn_skip_team_cooldown').css('display', 'none');
            if (!$('button.orange_button_L.btn_skip_champion_cooldown').length) {
                $('.challenge_container').css('display', 'block');
            }
        }
    }
    static checkClubStatus() {
        let chatVars = null;
        try {
            chatVars = getHHVars("Chat_vars.CLUB_INFO.id_club", false);
        }
        catch (e) {
            LogUtils_logHHAuto("Catched error : Couldn't parse CLUB_INFO : " + e);
        }
        if (chatVars === null || chatVars === false) {
            HHEnvVariables[ConfigHelper.getHHScriptVars("HHGameName")].isEnabledClubChamp = false;
        }
    }
}

;// CONCATENATED MODULE: ./src/Module/ClubChampion.ts





class ClubChampion {
    static getNextClubChampionTimer() {
        var page = getPage();
        if (page == ConfigHelper.getHHScriptVars("pagesIDClub")) {
            let SecsToNextTimer = -1;
            let restTeamFilter = 'div.club_champions_details_container div.team_rest_timer span[rel="timer"]';
            let restChampionFilter = 'div.club_champions_details_container div.champion_rest_timer span[rel="expires"]';
            if ($(restTeamFilter).length > 0) {
                SecsToNextTimer = Number(convertTimeToInt($(restTeamFilter).text()));
                LogUtils_logHHAuto("Team is resting for : " + TimeHelper.toHHMMSS(SecsToNextTimer));
            }
            else if ($(restChampionFilter).length > 0) {
                SecsToNextTimer = Number(convertTimeToInt($(restChampionFilter).text()));
                LogUtils_logHHAuto("Champion is resting for : " + TimeHelper.toHHMMSS(SecsToNextTimer));
                if (ClubChampion.hasGirlReward()) {
                    SecsToNextTimer = randomInterval(30 * 60, 35 * 60);
                    LogUtils_logHHAuto("Champion has girl reward");
                }
            }
            else {
                LogUtils_logHHAuto('No timer found');
            }
            LogUtils_logHHAuto('on clubs, next timer:' + SecsToNextTimer);
            return SecsToNextTimer;
        }
        return 0; // -1 is only when no timer on club page
    }
    static updateClubChampionTimer() {
        var page = getPage();
        if (page == ConfigHelper.getHHScriptVars("pagesIDClub")) {
            LogUtils_logHHAuto('on clubs');
            let secsToNextTimer = ClubChampion.getNextClubChampionTimer();
            let noTimer = (secsToNextTimer === -1);
            let nextClubChampionTime;
            if (secsToNextTimer === -1) {
                nextClubChampionTime = randomInterval(15 * 60, 17 * 60);
            }
            else if (secsToNextTimer > 7200 && getStoredValue(HHStoredVarPrefixKey + "Setting_autoClubForceStart") === "true") {
                nextClubChampionTime = randomInterval(115 * 60, 125 * 60);
            }
            else {
                nextClubChampionTime = randomInterval(secsToNextTimer, 180 + secsToNextTimer);
            }
            ClubChampion._setTimer(nextClubChampionTime);
            return noTimer;
        }
        return true;
    }
    /** From club champion page */
    static getRemainingRestTime() {
        let remainingRestTime = 0;
        let timerElm = $('.champions-bottom__rest .timer span[rel=expires]').text();
        if (timerElm !== undefined && timerElm !== null && timerElm.length > 0) {
            remainingRestTime = Number(convertTimeToInt(timerElm));
        }
        return remainingRestTime;
    }
    static hasGirlReward() {
        return $('#club_champions .club_champions_rewards_container .slot.slot_girl_shards').length > 0;
    }
    static resetTimerIfNeeded() {
        if ($('button[rel=perform].blue_button_L').length > 0 && $('.champions-bottom__rest').length == 0
            && getStoredValue(HHStoredVarPrefixKey + "Setting_autoClubChamp") === "true") {
            const champTimeLeft = getSecondsLeft('nextClubChampionTime');
            if (champTimeLeft > 60) {
                LogUtils_logHHAuto("Club champion seems available, reduce next timer to 30-60s.");
                ClubChampion._setTimer(randomInterval(30, 60));
            }
        }
    }
    static doClubChampionStuff() {
        var page = getPage();
        if (page == ConfigHelper.getHHScriptVars("pagesIDClubChampion")) {
            LogUtils_logHHAuto('on club_champion page');
            if ($('button[rel=perform].blue_button_L').length == 0) {
                if ($('.champions-bottom__rest').length > 0) {
                    LogUtils_logHHAuto('Girls are resting');
                    const restTime = ClubChampion.getRemainingRestTime();
                    ClubChampion._setTimer(randomInterval(restTime + 10, restTime + 2 * 60));
                }
                else {
                    LogUtils_logHHAuto('Something is wrong!');
                    ClubChampion._setTimer(randomInterval(15 * 60, 17 * 60));
                }
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                return true;
            }
            else {
                var TCount = Number($('div.input-field > span')[1].innerText.split(' / ')[1]);
                var ECount = QuestHelper.getEnergy();
                LogUtils_logHHAuto("T:" + TCount + " E:" + ECount);
                if (TCount == 0) {
                    LogUtils_logHHAuto("No tickets!");
                    const nextTime = randomInterval(3600, 4000);
                    if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoChamps") === "true") {
                        // No ticket for boths
                        setTimer('nextChampionTime', nextTime);
                    }
                    setTimer('nextClubChampionTime', nextTime);
                    return false;
                }
                else {
                    if (TCount != 0) {
                        LogUtils_logHHAuto("Using ticket");
                        $('button[rel=perform].blue_button_L').trigger('click');
                        ClubChampion._setTimer(randomInterval(15 * 60, 17 * 60));
                    }
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDClub"));
                    return true;
                }
            }
        }
        else if (page == ConfigHelper.getHHScriptVars("pagesIDClub")) {
            deleteStoredValue(HHStoredVarPrefixKey + "Temp_clubChampLimitReached");
            LogUtils_logHHAuto('on clubs');
            const onChampTab = $("div.club-champion-members-challenges:visible").length === 1;
            if (!onChampTab) {
                LogUtils_logHHAuto('Click champions tab');
                $("#club_champions_tab").trigger('click');
            }
            let Started = $("div.club-champion-members-challenges .player-row").length === 1;
            let secsToNextTimer = ClubChampion.getNextClubChampionTimer();
            let noTimer = secsToNextTimer === -1;
            if ((Started || getStoredValue(HHStoredVarPrefixKey + "Setting_autoClubForceStart") === "true") && noTimer) {
                let ticketUsed = 0;
                let ticketsUsedRequest = "div.club-champion-members-challenges .player-row .data-column:nth-of-type(3)";
                if ($(ticketsUsedRequest).length > 0) {
                    ticketUsed = Number($(ticketsUsedRequest)[0].innerText.replace(/[^0-9]/gi, ''));
                }
                let maxTickets = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoClubChampMax"));
                //console.log(maxTickets, ticketUsed);
                if (maxTickets > ticketUsed) {
                    LogUtils_logHHAuto("Let's do him!");
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDClubChampion"));
                    return true;
                }
                else {
                    LogUtils_logHHAuto("Max tickets to use on Club Champ reached.");
                    setStoredValue(HHStoredVarPrefixKey + "Temp_clubChampLimitReached", "true");
                    setTimer('nextClubChampionTime', randomInterval(4 * 60 * 60, 5 * 60 * 60));
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                    return false;
                }
            }
            ClubChampion.updateClubChampionTimer();
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
            return false;
        }
        else {
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDClub"));
            return true;
        }
    }
    /**
     *
     * @param {number} nextClubChampionTime
     * @private
     */
    static _setTimer(nextClubChampionTime) {
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoChamps") === "true" && getStoredValue(HHStoredVarPrefixKey + "Setting_autoChampAlignTimer") === "true") {
            const champTimeLeft = getSecondsLeft('nextChampionTime');
            if (nextClubChampionTime > 10 && champTimeLeft < 1200 && nextClubChampionTime < 1200) { // align settings
                // 20 min for standard wait time
                nextClubChampionTime = Math.max(nextClubChampionTime, champTimeLeft);
            }
        }
        setTimer('nextClubChampionTime', nextClubChampionTime);
    }
}

;// CONCATENATED MODULE: ./src/Module/Contest.ts




class Contest {
    // returns boolean to set busy
    static run() {
        if (getPage() !== ConfigHelper.getHHScriptVars("pagesIDContests")) {
            LogUtils_logHHAuto("Navigating to contests page.");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDContests"));
            // return busy
            return true;
        }
        else {
            LogUtils_logHHAuto("On contests page.");
            LogUtils_logHHAuto("Collecting finished contests's reward.");
            let contest_list = $(".contest .ended button[rel='claim']");
            if (contest_list.length > 0) {
                LogUtils_logHHAuto("Collected legendary contest id : " + contest_list[0].getAttribute('id_contest') + ".");
                contest_list[0].click();
                if (contest_list.length > 1) {
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDContests"));
                }
            }
            var time = TimeHelper.getSecondsLeftBeforeNewCompetition() + randomInterval(30 * 60, 35 * 60); // 30 min after new compet
            setTimer('nextContestTime', time);
            // Not busy
            return false;
        }
    }
    static styles() {
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_compactEndedContests") === "true") {
            const contestsContainerPath = '#contests > div > div.left_part > .scroll_area > .contest > .contest_header.ended';
            GM_addStyle(contestsContainerPath + ' {'
                + 'height: 50px;'
                + 'font-size: 0.7rem;'
                + '}');
            GM_addStyle(contestsContainerPath + ' > .contest_title {'
                + 'font-size: 14px;'
                + 'left: 140px;'
                + 'bottom: 24px;'
                + '}');
            GM_addStyle(contestsContainerPath + ' > .personal_rewards {'
                + 'height: 40px;'
                + 'margin-top: -42px;'
                + 'padding-top: 1px;'
                + 'width: 380px;'
                + '}');
            GM_addStyle(contestsContainerPath + ' > .personal_rewards > button {'
                + 'height: 23px;'
                + 'margin-right: 241px;'
                + 'margin-top: -6px;'
                + 'width: 120px;'
                + '}');
            GM_addStyle(contestsContainerPath + ' > .contest_expiration_timer {'
                + 'bottom: 95px;'
                + '}');
        }
    }
}

;// CONCATENATED MODULE: ./src/Module/DailyGoals.ts




class DailyGoals {
    static styles() {
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_compactDailyGoals") === "true") {
            const dailGoalsContainerPath = '#daily_goals .daily-goals-row .daily-goals-left-part .daily-goals-objectives-container';
            GM_addStyle(dailGoalsContainerPath + ' {'
                + 'flex-wrap:wrap;'
                + 'padding: 5px;'
                + '}');
            GM_addStyle(dailGoalsContainerPath + ' .daily-goals-objective .daily-goals-objective-reward .daily_goals_potion_icn {'
                + 'background-size: 20px;'
                + 'height: 30px;'
                + '}');
            GM_addStyle(dailGoalsContainerPath + ' .daily-goals-objective .daily-goals-objective-reward > p {'
                + 'margin-top: 0;'
                + '}');
            GM_addStyle(dailGoalsContainerPath + ' .daily-goals-objective {'
                + 'width:49%;'
                + 'margin-bottom:5px;'
                + '}');
            GM_addStyle(dailGoalsContainerPath + ' .daily-goals-objective .daily-goals-objective-status .objective-progress-bar {'
                + 'height: 20px;'
                + 'width: 11.1rem;'
                + '}');
            GM_addStyle(dailGoalsContainerPath + ' .daily-goals-objective .daily-goals-objective-status .objective-progress-bar > p {'
                + 'font-size: 0.7rem;'
                + '}');
            GM_addStyle(dailGoalsContainerPath + ' .daily-goals-objective .daily-goals-objective-reward {'
                + 'height: 40px;'
                + 'width: 40px;'
                + '}');
            GM_addStyle(dailGoalsContainerPath + ' p {'
                + 'overflow: hidden;'
                + 'text-overflow: ellipsis;'
                + 'white-space: nowrap;'
                + 'max-width: 174px;'
                + 'font-size: 0.7rem;'
                + '}');
        }
    }
    static goAndCollect() {
        const rewardsToCollect = isJSON(getStoredValue(HHStoredVarPrefixKey + "Setting_autoDailyGoalsCollectablesList")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Setting_autoDailyGoalsCollectablesList")) : [];
        //console.log(rewardsToCollect.length);
        if (checkTimer('nextDailyGoalsCollectTime') && getStoredValue(HHStoredVarPrefixKey + "Setting_autoDailyGoalsCollect") === "true") {
            //console.log(getPage());
            if (getPage() === ConfigHelper.getHHScriptVars("pagesIDDailyGoals")) {
                try {
                    LogUtils_logHHAuto("Checking Daily Goals for collectable rewards. Setting autoloop to false");
                    setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                    let buttonsToCollect = [];
                    const listDailyGoalsTiersToClaim = $("#daily_goals .progress-section .progress-bar-rewards-container .progress-bar-reward");
                    let potionsNum = Number($('.progress-section div.potions-total > div > p').text());
                    for (let currentTier = 0; currentTier < listDailyGoalsTiersToClaim.length; currentTier++) {
                        const currentButton = $("button[rel='claim']", listDailyGoalsTiersToClaim[currentTier]);
                        if (currentButton.length > 0) {
                            const currentTierNb = currentButton[0].getAttribute("tier");
                            const currentChest = $(".progress-bar-rewards-container", listDailyGoalsTiersToClaim[currentTier]);
                            const currentRewardsList = currentChest.length > 0 ? currentChest.data("rewards") : [];
                            //console.log("checking tier : "+currentTierNb);
                            if (TimeHelper.getSecondsLeftBeforeEndOfHHDay() <= ConfigHelper.getHHScriptVars("dailyRewardMaxRemainingTime") && TimeHelper.getSecondsLeftBeforeEndOfHHDay() > 0) {
                                LogUtils_logHHAuto("Force adding for collection chest n° " + currentTierNb);
                                buttonsToCollect.push(currentButton[0]);
                            }
                            else {
                                let validToCollect = true;
                                for (let reward of currentRewardsList) {
                                    const rewardType = RewardHelper.getRewardTypeByData(reward);
                                    if (!rewardsToCollect.includes(rewardType)) {
                                        LogUtils_logHHAuto(`Not adding for collection chest n° ${currentTierNb} because ${rewardType} is not in immediate collection list.`);
                                        validToCollect = false;
                                        break;
                                    }
                                }
                                if (validToCollect) {
                                    buttonsToCollect.push(currentButton[0]);
                                    LogUtils_logHHAuto("Adding for collection chest n° " + currentTierNb);
                                }
                            }
                        }
                    }
                    if (buttonsToCollect.length > 0 || potionsNum < 100) {
                        function collectDailyGoalsRewards() {
                            if (buttonsToCollect.length > 0) {
                                LogUtils_logHHAuto("Collecting chest n° " + buttonsToCollect[0].getAttribute('tier'));
                                buttonsToCollect[0].click();
                                buttonsToCollect.shift();
                                setTimeout(collectDailyGoalsRewards, randomInterval(300, 500));
                            }
                            else {
                                LogUtils_logHHAuto("Daily Goals collection finished.");
                                setTimer('nextDailyGoalsCollectTime', randomInterval(30 * 60, 35 * 60));
                                gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                            }
                        }
                        collectDailyGoalsRewards();
                        return true;
                    }
                    else {
                        LogUtils_logHHAuto("No Daily Goals reward to collect.");
                        setTimer('nextDailyGoalsCollectTime', TimeHelper.getSecondsLeftBeforeEndOfHHDay() + randomInterval(3600, 4000));
                        gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                        return false;
                    }
                }
                catch ({ errName, message }) {
                    LogUtils_logHHAuto(`ERROR during daily goals run: ${message}, retry in 1h`);
                    setTimer('nextDailyGoalsCollectTime', randomInterval(3600, 4000));
                    return false;
                }
            }
            else {
                LogUtils_logHHAuto("Switching to Daily Goals screen.");
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDDailyGoals"));
                return true;
            }
        }
    }
}

;// CONCATENATED MODULE: ./src/Module/Harem.ts




class Harem {
    static filterGirlMapCanUpgrade(a) {
        return a.gData.can_upgrade;
    }
    static clearHaremToolVariables() {
        // logHHAuto('clearHaremToolVariables');
        deleteStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlActions");
        deleteStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlMode");
        deleteStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlEnd");
        deleteStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlPayLast");
        deleteStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlLimit");
        const lastActionPerformed = getStoredValue(HHStoredVarPrefixKey + "Temp_lastActionPerformed");
        if (lastActionPerformed == Harem.HAREM_UPGRADE_LAST_ACTION) {
            setStoredValue(HHStoredVarPrefixKey + "Temp_lastActionPerformed", "none");
        }
    }
    static getGirlMapSorted(inSortType = "DateAcquired", inSortReversed = true) {
        let girlsMap = getHHVars("GirlSalaryManager.girlsMap");
        // if (girlsMap === null) {
        //     girlsMap = getHHVars("girlsDataList");
        // }
        if (girlsMap !== null) {
            girlsMap = Object.values(girlsMap);
            if (girlsMap.length > 0) {
                //console.log(inSortType);
                if (ConfigHelper.getHHScriptVars("haremSortingFunctions").hasOwnProperty(inSortType)) {
                    girlsMap.sort(ConfigHelper.getHHScriptVars("haremSortingFunctions")[inSortType]);
                }
                else {
                    LogUtils_logHHAuto("Unknown sorting function, returning Girls Map sorted by date acquired.");
                    girlsMap.sort(ConfigHelper.getHHScriptVars("haremSortingFunctions").DateAcquired);
                }
            }
            if (inSortReversed) {
                girlsMap.reverse();
            }
            /*for(let i=0;i<5;i++)
                console.log(girlsMap[i].gData.name, getGirlUpgradeCost(girlsMap[i].gData.rarity, girlsMap[i].gData.graded + 1));*/
        }
        return girlsMap;
    }
    static getGirlsList() {
        let girlsDataList = Harem.getHaremGirlsFromOcdIfExist();
        if (girlsDataList == null && getPage() === ConfigHelper.getHHScriptVars("pagesIDEditTeam")) {
            girlsDataList = getHHVars("availableGirls");
        }
        if (girlsDataList == null && getPage() === ConfigHelper.getHHScriptVars("pagesIDWaifu")) {
            girlsDataList = getHHVars("girlsDataList");
        }
        if (girlsDataList != null) {
            let girlNameDictionary = new Map();
            girlsDataList.forEach((data) => {
                girlNameDictionary.set(data.id_girl + "", data);
            });
            girlsDataList = girlNameDictionary;
        }
        return girlsDataList;
    }
    static selectNextUpgradableGirl() {
        const HaremSortMenuSortSelector = document.getElementById("HaremSortMenuSortSelector");
        const HaremSortMenuSortReverse = document.getElementById("HaremSortMenuSortReverse");
        const selectedSortFunction = HaremSortMenuSortSelector.options[HaremSortMenuSortSelector.selectedIndex].value;
        const isReverseChecked = HaremSortMenuSortReverse.checked;
        setStoredValue(HHStoredVarPrefixKey + "Temp_defaultCustomHaremSort", JSON.stringify({ sortFunction: selectedSortFunction, reverse: isReverseChecked }));
        const girlsMap = Harem.getGirlMapSorted(selectedSortFunction, isReverseChecked);
        if (girlsMap === null)
            return;
        const currentSelectedGirlIndex = girlsMap.findIndex((element) => element.gId === $('#harem_left .girls_list div.opened[girl]').attr('girl')) + 1;
        const upgradableGirls = girlsMap.slice(currentSelectedGirlIndex).filter(Harem.filterGirlMapCanUpgrade);
        if (upgradableGirls.length > 0) {
            gotoPage(`/harem/${upgradableGirls[0].gId}`);
            LogUtils_logHHAuto("Going to : " + upgradableGirls[0].gData.name);
        }
        else {
            LogUtils_logHHAuto("No upgradble girls.");
        }
    }
    static popUpHaremSort() {
        const menuID = "haremNextUpgradableGirl";
        let HaremSortMenu = '<div style="padding:50px; display:flex;flex-direction:column">'
            + '<p id="HaremSortMenuSortText">' + getTextForUI("HaremSortMenuSortText", "elementText") + '</p>'
            + '<div style="display:flex;flex-direction:row;align-items: center;">'
            + '<div style="padding:10px"><select id="HaremSortMenuSortSelector"></select></div>'
            + '<div style="display:flex;flex-direction:column;padding:10px;justify-content:center">'
            + '<div>' + getTextForUI("HaremSortMenuSortReverse", "elementText") + '</div>'
            + '<div><input id="HaremSortMenuSortReverse" type="checkbox"></div>'
            + '</div>'
            + '</div>'
            + '<div style="display:flex;flex-direction:row;align-items:center;">'
            + '<div style="display:flex;flex-direction:column;padding:10px;justify-content:center">'
            //+      '<div>'+getTextForUI("HaremSortMenuSortReverse","elementText")+'</div>'
            //+      '<div><input id="HaremSortMenuSortNumber" type="number" name="quantity" min="1" max="20" step="1" value="10"></div>'
            + '</div>'
            + '<div style="padding:10px"><label class="myButton" id="HaremSortMenuLaunch">' + getTextForUI("Launch", "elementText") + '</label></div>'
            + '</div>'
            + '</div>';
        fillHHPopUp("HaremSortMenu", getTextForUI(menuID, "elementText"), HaremSortMenu);
        $("#HaremSortMenuLaunch").on("click", Harem.selectNextUpgradableGirl);
        const selectorOptions = document.getElementById("HaremSortMenuSortSelector");
        const HaremSortMenuSortReverse = document.getElementById("HaremSortMenuSortReverse");
        const storedDefaultSort = (getStoredValue(HHStoredVarPrefixKey + "Temp_defaultCustomHaremSort") !== undefined && isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_defaultCustomHaremSort"))) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_defaultCustomHaremSort")) : { sortFunction: "null", reverse: false };
        for (let sortFunction of Object.keys(ConfigHelper.getHHScriptVars("haremSortingFunctions"))) {
            let optionElement = document.createElement("option");
            optionElement.value = sortFunction;
            optionElement.text = getTextForUI("HaremSortMenuSortBy", "elementText") + getTextForUI(sortFunction, "elementText");
            if (storedDefaultSort.sortFunction === sortFunction) {
                optionElement.selected = true;
            }
            selectorOptions.add(optionElement);
        }
        HaremSortMenuSortReverse.checked = storedDefaultSort.reverse;
    }
    static moduleHaremNextUpgradableGirl() {
        const menuID = "haremNextUpgradableGirl";
        let menuHidden = `<div style="visibility:hidden" id="${menuID}"></div>`;
        if (document.getElementById(menuID) === null) {
            $("#contains_all section").prepend(menuHidden);
            GM_registerMenuCommand(getTextForUI(menuID, "elementText"), Harem.popUpHaremSort);
        }
        else {
            return;
        }
    }
    static haremOpenFirstXUpgradable() {
        const menuID = "haremOpenFirstXUpgradable";
        let menuHidden = `<div style="visibility:hidden" id="${menuID}"></div>`;
        if (document.getElementById(menuID) === null) {
            var upgradableGirlz = [];
            var nextUpgradable = 0;
            var openedGirlz = 0;
            var maxOpenedGirlz;
            $("#contains_all section").prepend(menuHidden);
            GM_registerMenuCommand(getTextForUI(menuID, "elementText"), popUpHaremSort);
        }
        else {
            return;
        }
        function popUpHaremSort() {
            let HaremSortMenu = '<div style="padding:50px; display:flex;flex-direction:column">'
                + '<p id="HaremSortMenuSortText">' + getTextForUI("HaremSortMenuSortText", "elementText") + '</p>'
                + '<div style="display:flex;flex-direction:row;align-items: center;">'
                + '<div style="padding:10px"><select id="HaremSortMenuSortSelector"></select></div>'
                + '<div style="display:flex;flex-direction:column;padding:10px;justify-content:center">'
                + '<div>' + getTextForUI("HaremSortMenuSortReverse", "elementText") + '</div>'
                + '<div><input id="HaremSortMenuSortReverse" type="checkbox"></div>'
                + '</div>'
                + '</div>'
                + '<div style="display:flex;flex-direction:row;align-items:center;">'
                + '<div style="display:flex;flex-direction:column;padding:10px;justify-content:center">'
                //+      '<div>'+getTextForUI("HaremSortMenuSortReverse","elementText")+'</div>'
                + '<div><input id="HaremSortMenuSortNumber" type="number" name="quantity" min="1" max="20" step="1" value="10"></div>'
                + '</div>'
                + '<div style="padding:10px"><label class="myButton" id="HaremSortMenuLaunch">' + getTextForUI("Launch", "elementText") + '</label></div>'
                + '</div>'
                + '</div>';
            fillHHPopUp("HaremSortMenu", getTextForUI(menuID, "elementText"), HaremSortMenu);
            $("#HaremSortMenuLaunch").on("click", prepareUpgradable);
            const selectorOptions = document.getElementById("HaremSortMenuSortSelector");
            const storedDefaultSort = (getStoredValue(HHStoredVarPrefixKey + "Temp_defaultCustomHaremSort") !== undefined && isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_defaultCustomHaremSort"))) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_defaultCustomHaremSort")) : { sortFunction: "null", reverse: false };
            for (let sortFunction of Object.keys(ConfigHelper.getHHScriptVars("haremSortingFunctions"))) {
                let optionElement = document.createElement("option");
                optionElement.value = sortFunction;
                optionElement.text = getTextForUI("HaremSortMenuSortBy", "elementText") + getTextForUI(sortFunction, "elementText");
                if (storedDefaultSort.sortFunction === sortFunction) {
                    optionElement.selected = true;
                }
                selectorOptions.add(optionElement);
            }
        }
        function prepareUpgradable() {
            const HaremSortMenuSortSelector = document.getElementById("HaremSortMenuSortSelector");
            const HaremSortMenuSortReverse = document.getElementById("HaremSortMenuSortReverse");
            const HaremSortMenuSortNumber = document.getElementById("HaremSortMenuSortNumber");
            const selectedSortFunction = HaremSortMenuSortSelector.options[HaremSortMenuSortSelector.selectedIndex].value;
            const isReverseChecked = HaremSortMenuSortReverse.checked;
            setStoredValue(HHStoredVarPrefixKey + "Temp_defaultCustomHaremSort", JSON.stringify({ sortFunction: selectedSortFunction, reverse: isReverseChecked }));
            const girlsMap = Harem.getGirlMapSorted(selectedSortFunction, isReverseChecked);
            if (girlsMap === null)
                return;
            openedGirlz = 0;
            maxOpenedGirlz = Number(HaremSortMenuSortNumber.value);
            upgradableGirlz = girlsMap.filter(Harem.filterGirlMapCanUpgrade);
            //console.log(maxOpenedGirlz);
            if (upgradableGirlz.length > 0) {
                haremOpenGirlUpgrade();
            }
        }
        function haremOpenGirlUpgrade(first = true) {
            if (nextUpgradable < upgradableGirlz.length && openedGirlz < maxOpenedGirlz) {
                const girlzQuests = getHHVars('girl_quests');
                if (girlzQuests !== null) {
                    let upgradeURL = girlzQuests[upgradableGirlz[nextUpgradable].gId].for_upgrade.url;
                    //console.log(upgradeButton.length);
                    if (upgradeURL.length === 0) {
                        if (first) {
                            setTimeout(function () { haremOpenGirlUpgrade(false); }, 1000);
                        }
                        else {
                            nextUpgradable++;
                            haremOpenGirlUpgrade();
                        }
                    }
                    else {
                        //console.log(upgradeButton[0].getAttribute("href"));
                        //upgradeButton[0].setAttribute("target","_blank");
                        //console.log(upgradeButton[0]);
                        //upgradeButton[0].click();
                        GM.openInTab(window.location.protocol + "//" + window.location.hostname + upgradeURL, true);
                        nextUpgradable++;
                        openedGirlz++;
                        haremOpenGirlUpgrade();
                    }
                }
                else {
                    LogUtils_logHHAuto("Unable to find girl_quest array.");
                }
            }
        }
    }
    static getHaremGirlsFromOcdIfExist() {
        if (localStorage.getItem('HHS.HHPNMap') !== null) {
            try {
                const girlsArray = JSON.parse(localStorage.getItem('HHS.HHPNMap'));
                let girlNameDictionary = new Map();
                girlsArray.forEach((data) => {
                    girlNameDictionary.set(data[0] + "", data[1]);
                });
                return girlNameDictionary;
            }
            catch (error) {
                return null;
            }
        }
        else {
            return null;
        }
    }
    static moduleHaremExportGirlsData() {
        const menuID = "ExportGirlsData";
        let styles = 'position: absolute;left: 870px;top: 80px;width:24px;z-index:10';
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDWaifu")) {
            styles = 'position: absolute;left: 870px;top: 35px;width:24px;z-index:10';
        }
        let ExportGirlsData = `<div style="${styles}" class="tooltipHH" id="${menuID}"><span class="tooltipHHtext">${getTextForUI("ExportGirlsData", "tooltip")}</span><label style="font-size:small" class="myButton" id="ExportGirlsDataButton">${getTextForUI("ExportGirlsData", "elementText")}</label></div>`;
        if (document.getElementById(menuID) === null) {
            $("#filter_girls").after(ExportGirlsData);
            $("#ExportGirlsDataButton").on("click", saveHHGirlsAsCSV);
            GM_registerMenuCommand(getTextForUI(menuID, "elementText"), saveHHGirlsAsCSV);
        }
        else {
            return;
        }
        function saveHHGirlsAsCSV() {
            var dataToSave = "";
            dataToSave = extractHHGirls();
            var name = 'HH_GirlData_' + Date.now() + '.csv';
            const a = document.createElement('a');
            a.download = name;
            a.href = URL.createObjectURL(new Blob([dataToSave], { type: 'text/plain' }));
            a.click();
        }
        function extractHHGirls() {
            var dataToSave = "Name,Rarity,Class,Figure,Level,Stars,Of,Left,Hardcore,Charm,Know-how,Total,Position,Eyes,Hair,Zodiac,Own,Element\r\n";
            var gMap = getHHVars('girlsDataList') || getHHVars('availableGirls');
            if (gMap === null) {
                // error
                LogUtils_logHHAuto("Girls Map was undefined...! Error, cannot export girls.");
            }
            else {
                try {
                    var cnt = 1;
                    for (var key in gMap) {
                        cnt++;
                        var gData = gMap[key];
                        dataToSave += gData.name + ",";
                        dataToSave += gData.rarity + ",";
                        dataToSave += gData.class + ",";
                        dataToSave += gData.figure + ",";
                        dataToSave += gData.level + ",";
                        dataToSave += gData.graded + ",";
                        dataToSave += gData.nb_grades + ",";
                        dataToSave += Number(gData.nb_grades) - Number(gData.graded) + ",";
                        dataToSave += gData.caracs.carac1 + ",";
                        dataToSave += gData.caracs.carac2 + ",";
                        dataToSave += gData.caracs.carac3 + ",";
                        dataToSave += Number(gData.caracs.carac1) + Number(gData.caracs.carac2) + Number(gData.caracs.carac3) + ",";
                        dataToSave += gData.position_img + ",";
                        dataToSave += gData.eye_color1 + ","; // TODO update with user friendly color
                        dataToSave += gData.hair_color1 + ","; // TODO update with user friendly color
                        dataToSave += gData.zodiac.substring(3) + ",";
                        dataToSave += true + ",";
                        dataToSave += gData.element + "\r\n";
                    }
                    //            logHHAuto(dataToSave);
                }
                catch (exp) {
                    // error
                    LogUtils_logHHAuto("Catched error : Girls Map had undefined property...! Error, cannot export girls : " + exp);
                }
            }
            return dataToSave;
        }
        function stripSpan(tmpStr) {
            var newStr = "";
            while (tmpStr.indexOf(">") > -1) {
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
        const girlsDataList = getHHVars("girlsDataList");
        const girlsListSec = getHHVars("GirlSalaryManager.girlsListSec");
        if (girlsDataList) {
            Object.values(girlsDataList).forEach((girl) => {
                if (girl.shards >= 100)
                    filteredGirlsList.push("" + girl.id_girl);
            });
        }
        else if (girlsListSec.length > 0) {
            girlsListSec.forEach((girl) => {
                if (girl.gData.shards >= 100)
                    filteredGirlsList.push("" + girl.gId);
            });
        }
        return filteredGirlsList;
    }
    static moduleHarem() {
        const menuIDXp = "haremGiveXP";
        const menuIDGifts = "haremGiveGifts";
        let menuHidden = `<div style="visibility:hidden" id="${menuIDXp}"></div>`;
        if (document.getElementById(menuIDXp) === null) {
            // Avoid looping on add menu item
            $("#contains_all section").prepend(menuHidden);
            var giveHaremXp = function () { Harem.fillCurrentGirlItem('experience'); };
            var giveHaremGifts = function () { Harem.fillCurrentGirlItem('affection'); };
            GM_registerMenuCommand(getTextForUI(menuIDXp, "elementText"), giveHaremXp);
            GM_registerMenuCommand(getTextForUI(menuIDGifts, "elementText"), giveHaremGifts);
        }
        Harem.addGoToGirlPageButton();
        Harem.addGirlListMenu();
    }
    static fillCurrentGirlItem(haremItem, payLast = false) {
        let filteredGirlsList = Harem.getFilteredGirlList();
        const displayedGirl = $('#harem_right .opened').attr('girl'); // unsafeWindow.harem.preselectedGirlId
        if (filteredGirlsList && filteredGirlsList.length > 0) {
            let girlToGoTo = filteredGirlsList[0];
            if (displayedGirl && filteredGirlsList.indexOf("" + displayedGirl) >= 0) {
                girlToGoTo = displayedGirl;
            }
            LogUtils_logHHAuto("Go to " + girlToGoTo);
            gotoPage('/girl/' + girlToGoTo, { resource: haremItem });
            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
            LogUtils_logHHAuto("setting autoloop to false");
        }
        setStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlActions", haremItem);
        setStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlMode", 'list');
        if (payLast)
            setStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlPayLast", 'true');
        setStoredValue(HHStoredVarPrefixKey + "Temp_filteredGirlsList", JSON.stringify(filteredGirlsList));
        setStoredValue(HHStoredVarPrefixKey + "Temp_lastActionPerformed", Harem.HAREM_UPGRADE_LAST_ACTION);
    }
    ;
    static addGoToGirlPageButton() {
        const goToGirlPageButtonId = 'goToGirlPage';
        if ($('#' + goToGirlPageButtonId).length > 0)
            return;
        const displayedGirl = $('#harem_right .opened').attr('girl') || ''; // unsafeWindow.harem.preselectedGirlId
        const girlOwned = displayedGirl != '' && $('#harem_right .opened .avatar-box:visible').length > 0;
        //GM_addStyle('#harem_right>div[girl] .middle_part div.avatar-box img.avatar { height: 365px; margin-bottom: 30px;}');
        //GM_addStyle('#harem_right>div[girl] .middle_part div.avatar-box canvas.animated-girl-display { height: 59rem; top: -18rem;}');
        GM_addStyle('.goToGirlPage {position: relative; bottom: 12px; left: 250px; font-size: small; width: fit-content; z-index:30;}');
        // using a for new tab option
        const goToGirlPageButton = '<div class="tooltipHH goToGirlPage"><span class="tooltipHHtext">' + getTextForUI("goToGirlPage", "tooltip") + '</span><a href="/girl/' + displayedGirl + '?resource=experience" class="myButton" id="' + goToGirlPageButtonId + '">' + getTextForUI("goToGirlPage", "elementText") + '</a></div>';
        var goToGirl = function () {
            const displayedGirl = $('#harem_right .opened').attr('girl'); // unsafeWindow.harem.preselectedGirlId
            gotoPage('/girl/' + displayedGirl, { resource: 'experience' });
        };
        $('#harem_right .middle_part').append(goToGirlPageButton);
        if (girlOwned) {
            GM_registerMenuCommand(getTextForUI('goToGirlPage', "elementText"), goToGirl);
        }
        else {
            $('#' + goToGirlPageButtonId).hide();
        }
    }
    static addGirlListMenu() {
        const girlListMenuButtonId = 'girlListMenu';
        if ($('#' + girlListMenuButtonId).length > 0)
            return;
        var createMenuButton = function (menuId, disabled = false) {
            return '<div class="tooltipHH">'
                + '<span class="tooltipHHtext">' + getTextForUI(menuId, "tooltip") + '</span>'
                + '<label style="font-size: initial;" class="myButton" ' + (disabled ? 'disabled="disabled"' : '') + ' id="' + menuId + 'Button">' + getTextForUI(menuId, "elementText")
                + '</label></div>';
        };
        const girlListMenuButton = '<div style="position: absolute;left: 250px;top: 35px; font-size: small; z-index:30;" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("girlListMenu", "tooltip") + '</span><label class="myButton" id="' + girlListMenuButtonId + '">+</label></div>';
        var openGirlMenu = function () {
            const menuIDXp = "haremGiveXP";
            const menuIDGifts = "haremGiveGifts";
            const menuIDMaxGifts = "haremGiveMaxGifts";
            const menuIDUpgradeMax = "haremUpgradeMax";
            const menuNextUpgrad = "haremNextUpgradableGirl";
            const menuIDXpButton = createMenuButton(menuIDXp);
            const menuIDGiftsButton = createMenuButton(menuIDGifts);
            const menuIDMaxGiftsButton = createMenuButton(menuIDMaxGifts);
            const menuIDUpgradeMaxButton = createMenuButton(menuIDUpgradeMax);
            const menuNextUpgradButton = createMenuButton(menuNextUpgrad);
            const imgPath = ConfigHelper.getHHScriptVars("baseImgPath");
            const girlListMenu = '<div style="padding:50px; display:flex;flex-direction:column;width:400px">'
                // +    '<p id="HaremGirlListMenuText">'+getTextForUI("girlListMenu","elementText")+'</p>'
                + '<div class="optionsBoxWithTitle">'
                + '<div class="optionsBoxTitle"><img class="iconImg" src="' + imgPath + '/design/ic_books_gray.svg"><span class="optionsBoxTitle">' + getTextForUI("experience", "elementText") + '</span></div>'
                + '<div class="optionsBox">'
                + '<div style="padding:10px">' + menuIDXpButton + '</div>'
                + '</div>'
                + '</div>'
                + '<div class="optionsBoxWithTitle">'
                + '<div class="optionsBoxTitle"><img class="iconImg" src="' + imgPath + '/design/ic_gifts_gray.svg"><span class="optionsBoxTitle">' + getTextForUI("affection", "elementText") + '</span></div>'
                + '<div class="optionsBox">'
                + '<div style="padding:10px">' + menuIDGiftsButton + '</div>'
                + '<div style="padding:10px">' + menuIDMaxGiftsButton + '</div>'
                + '<div style="padding:10px">' + menuIDUpgradeMaxButton + '</div>'
                + '</div>'
                + '</div>'
                // +    '<div class="optionsBoxWithTitle">' // TODO fixme
                // +       '<div class="optionsBoxTitle"><img class="iconImg" src="'+imgPath+'/design_v2/affstar_upgrade.png"><span class="optionsBoxTitle">'+getTextForUI("upradable","elementText")+'</span></div>'
                // +       '<div class="optionsBox">'
                // +         '<div style="padding:10px">'+menuNextUpgradButton+'</div>'
                // +       '</div>'
                // +    '</div>'
                + '</div>';
            fillHHPopUp("GirlListMenu", getTextForUI("girlListMenu", "elementText"), girlListMenu);
            $('#' + menuIDXp + 'Button').on("click", function () { Harem.fillCurrentGirlItem('experience'); });
            $('#' + menuIDGifts + 'Button').on("click", function () { Harem.fillCurrentGirlItem('affection'); });
            $('#' + menuIDMaxGifts + 'Button').on("click", function () {
                setStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlEnd", 'true');
                Harem.fillCurrentGirlItem('affection');
            });
            $('#' + menuIDUpgradeMax + 'Button').on("click", function () {
                setStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlEnd", 'true');
                Harem.fillCurrentGirlItem('affection', true);
            });
            $('#' + menuNextUpgrad + 'Button').on("click", function () {
                maskHHPopUp();
                Harem.popUpHaremSort();
            });
        };
        $('#harem_left').append(girlListMenuButton);
        GM_registerMenuCommand(getTextForUI('girlListMenu', "elementText"), openGirlMenu);
        $('#' + girlListMenuButtonId).on("click", openGirlMenu);
    }
    static HaremSizeNeedsRefresh(inCustomExpi) {
        return !isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_HaremSize")) || JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_HaremSize")).count_date < (new Date().getTime() - inCustomExpi * 1000);
    }
    static moduleHaremCountMax() {
        const girlList = getHHVars('girlsDataList', false) || getHHVars('availableGirls', false);
        if (Harem.HaremSizeNeedsRefresh(ConfigHelper.getHHScriptVars("HaremMinSizeExpirationSecs")) && girlList !== null) {
            setStoredValue(HHStoredVarPrefixKey + "Temp_HaremSize", JSON.stringify({ count: Object.keys(girlList).length, count_date: new Date().getTime() }));
            LogUtils_logHHAuto("Harem size updated to : " + Object.keys(girlList).length);
        }
    }
    static getGirlUpgradeCost(inRarity, inTargetGrade) {
        const rarity = ["starting", "common", "rare", "epic", "legendary", "mythic"];
        const rarityFactors = [1, 2, 6, 14, 20, 50];
        const gradeFactors = [1, 2.5, 2.5, 2, 2, 2];
        const cost11 = 36000;
        let calculatedCosts = {};
        for (let i = 0; i < rarity.length; i++) {
            let currentRarityCosts = {};
            for (let j = 0; j < 6; j++) {
                let currentCost;
                if (i === 0 && j === 0) {
                    //console.log("init 1");
                    currentCost = cost11;
                }
                else if (j === 0) {
                    //console.log("init -1");
                    currentCost = calculatedCosts[rarity[0]][0] * rarityFactors[i];
                }
                else {
                    //console.log("-1");
                    currentCost = currentRarityCosts[j - 1] * gradeFactors[j];
                }
                currentRarityCosts[j] = currentCost;
            }
            //console.log(current);
            calculatedCosts[rarity[i]] = currentRarityCosts;
        }
        return calculatedCosts[inRarity][inTargetGrade];
    }
}
Harem.HAREM_UPGRADE_LAST_ACTION = 'haremGirl';

;// CONCATENATED MODULE: ./src/Module/Troll.ts
var Troll_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







class Troll {
    static getEnergy() {
        return Number(getHHVars('Hero.energies.fight.amount'));
    }
    static getEnergyMax() {
        return Number(getHHVars('Hero.energies.fight.max_regen_amount'));
    }
    static getTrollWithGirls() {
        const girlDictionary = Harem.getGirlsList();
        const trollGirlsID = ConfigHelper.getHHScriptVars("trollGirlsID");
        const trollWithGirls = [];
        if (girlDictionary) {
            for (var tIdx = 0; tIdx < trollGirlsID.length; tIdx++) {
                trollWithGirls[tIdx] = 0;
                for (var pIdx = 0; pIdx < trollGirlsID[tIdx].length; pIdx++) {
                    for (var gIdx = 0; gIdx < trollGirlsID[tIdx][pIdx].length; gIdx++) {
                        var idGirl = parseInt(trollGirlsID[tIdx][pIdx][gIdx], 10);
                        if (idGirl != 0 && (girlDictionary.get("" + idGirl) == undefined || girlDictionary.get("" + idGirl).shards < 100)) {
                            trollWithGirls[tIdx] += 1;
                        }
                    }
                }
            }
        }
        return trollWithGirls;
    }
    static getPinfo(contest) {
        const threshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollThreshold"));
        const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollRunThreshold"));
        let Tegzd = '<li>';
        Tegzd += getTextForUI("autoTrollTitle", "elementText") + ' ' + Troll.getEnergy() + '/' + Troll.getEnergyMax() + contest;
        if (runThreshold > 0) {
            Tegzd += ' (' + threshold + '<' + Troll.getEnergy() + '<' + runThreshold + ')';
            if (Troll.getEnergy() < runThreshold)
                Tegzd += ' ' + getTextForUI("waitRunThreshold", "elementText");
        }
        Tegzd += '</li>';
        return Tegzd;
    }
    static isEnabled() {
        return ConfigHelper.getHHScriptVars("isEnabledTrollBattle", false) && getHHVars('Hero.infos.questing.id_world') > 0;
    }
    static isTrollFightActivated() {
        return Troll.isEnabled() &&
            (getStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollBattle") === "true" || getStoredValue(HHStoredVarPrefixKey + "Temp_autoTrollBattleSaveQuest") === "true");
    }
    static getLastTrollIdAvailable() {
        const id_world = Number(getHHVars('Hero.infos.questing.id_world'));
        if (ConfigHelper.isPshEnvironnement() && id_world > 10) {
            const trollIdMapping = ConfigHelper.getHHScriptVars("trollIdMapping");
            if (trollIdMapping.hasOwnProperty(id_world)) {
                return trollIdMapping[id_world]; // PSH parallele adventures
            }
            LogUtils_logHHAuto(`Error Troll ID mapping need to be updated with world ${id_world}`);
        }
        return id_world - 1;
    }
    static getTrollIdFromEvent(eventGirl) {
        if (eventGirl && EventModule.isEventActive(eventGirl.event_id)) {
            return eventGirl.troll_id;
        }
        else {
            if (eventGirl)
                EventModule.clearEventData(eventGirl.event_id);
            LogUtils_logHHAuto("Event troll completed, clear event and get new troll ID");
            return Troll.getTrollIdToFight();
        }
    }
    static getTrollSelectedIndex() {
        let autoTrollSelectedIndex = getStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollSelectedIndex");
        if (autoTrollSelectedIndex === undefined || isNaN(autoTrollSelectedIndex)) {
            autoTrollSelectedIndex = -1;
        }
        else {
            autoTrollSelectedIndex = Number(autoTrollSelectedIndex);
        }
        return autoTrollSelectedIndex;
    }
    static getTrollIdToFight() {
        const debugEnabled = getStoredValue(HHStoredVarPrefixKey + "Temp_Debug") === 'true';
        let trollWithGirls = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_trollWithGirls")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_trollWithGirls")) : [];
        const autoTrollSelectedIndex = Troll.getTrollSelectedIndex();
        let TTF = 0;
        const lastTrollIdAvailable = Troll.getLastTrollIdAvailable();
        const eventGirl = EventModule.getEventGirl();
        const eventMythicGirl = EventModule.getEventMythicGirl();
        if (debugEnabled) {
            LogUtils_logHHAuto('eventGirl', eventGirl);
            LogUtils_logHHAuto('eventMythicGirl', eventMythicGirl);
        }
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_plusEventMythic") === "true" && !checkTimer("eventMythicGoing") && eventMythicGirl.girl_id && eventMythicGirl.is_mythic) {
            LogUtils_logHHAuto("Mythic Event troll fight");
            TTF = Troll.getTrollIdFromEvent(eventMythicGirl);
        }
        else if (getStoredValue(HHStoredVarPrefixKey + "Setting_plusEvent") === "true" && !checkTimer("eventGoing") && eventGirl.girl_id && !eventGirl.is_mythic) {
            LogUtils_logHHAuto("Event troll fight");
            TTF = Troll.getTrollIdFromEvent(eventGirl);
        }
        else if (autoTrollSelectedIndex === 98 || autoTrollSelectedIndex === 99) {
            if (trollWithGirls === undefined || trollWithGirls.length === 0) {
                LogUtils_logHHAuto("No troll with girls from storage, parsing game info ...");
                trollWithGirls = Troll.getTrollWithGirls();
                if (trollWithGirls.length === 0) {
                    LogUtils_logHHAuto("Need girls list, going to Waifu page to get them");
                    setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDWaifu"));
                    return -1;
                }
                setStoredValue(HHStoredVarPrefixKey + "Temp_trollWithGirls", JSON.stringify(trollWithGirls));
            }
            if (trollWithGirls !== undefined && trollWithGirls.length > 0) {
                if (autoTrollSelectedIndex === 98) {
                    if (debugEnabled)
                        LogUtils_logHHAuto("First troll with girls from storage");
                    TTF = trollWithGirls.findIndex((troll) => troll > 0) + 1;
                }
                else if (autoTrollSelectedIndex === 99) {
                    if (debugEnabled)
                        LogUtils_logHHAuto("Last troll with girls from storage");
                    TTF = trollWithGirls.findLastIndex((troll) => troll > 0) + 1;
                    if (TTF > lastTrollIdAvailable) {
                        TTF = lastTrollIdAvailable;
                    }
                }
            }
            else if (getPage() !== ConfigHelper.getHHScriptVars("pagesIDHome")) {
                LogUtils_logHHAuto("Can't get troll with girls, going to home page to get girl list.");
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
            }
            else {
                LogUtils_logHHAuto("Can't get troll with girls, going to last troll.");
                TTF = lastTrollIdAvailable;
            }
        }
        else if (autoTrollSelectedIndex > 0 && autoTrollSelectedIndex < 98) {
            TTF = autoTrollSelectedIndex;
            LogUtils_logHHAuto("Custom troll fight.");
        }
        else {
            TTF = lastTrollIdAvailable;
            LogUtils_logHHAuto("Last troll fight: " + TTF);
        }
        if (getStoredValue(HHStoredVarPrefixKey + "Temp_autoTrollBattleSaveQuest") === "true") {
            TTF = lastTrollIdAvailable;
            LogUtils_logHHAuto("Last troll fight for quest item: " + TTF);
            //setStoredValue(HHStoredVarPrefixKey+"Temp_autoTrollBattleSaveQuest", "false");
            setStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement", "none");
        }
        const trollz = ConfigHelper.getHHScriptVars("trollzList");
        if (TTF <= 0) {
            TTF = lastTrollIdAvailable > 0 ? lastTrollIdAvailable : 1;
            LogUtils_logHHAuto(`Error: wrong troll target found. Backup to ${TTF}`);
        }
        if (TTF >= trollz.length) {
            LogUtils_logHHAuto("Error: New troll implemented '" + TTF + "' (List to be updated) or wrong troll target found");
            TTF = 1;
        }
        return TTF;
    }
    static doBossBattle() {
        return Troll_awaiter(this, void 0, void 0, function* () {
            var currentPower = Troll.getEnergy();
            if (currentPower < 1) {
                const eventGirl = EventModule.getEventGirl();
                const eventMythicGirl = EventModule.getEventMythicGirl();
                //logHHAuto("No power for battle.");
                if (!Troll.canBuyFight(eventGirl).canBuy && !Troll.canBuyFight(eventMythicGirl).canBuy) {
                    return false;
                }
            }
            const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollRunThreshold"));
            if (runThreshold > 0 && currentPower == runThreshold) {
                setStoredValue(HHStoredVarPrefixKey + "Temp_TrollHumanLikeRun", "true");
            }
            let TTF = Troll.getTrollIdToFight();
            const trollz = ConfigHelper.getHHScriptVars("trollzList");
            const currentPage = getPage();
            if (!TTF || TTF <= 0) {
                if (getStoredValue(HHStoredVarPrefixKey + "Temp_TrollInvalid") === "true") {
                    LogUtils_logHHAuto(`ERROR: Invalid troll N°${TTF}, again, going to first troll`);
                    TTF = 1;
                }
                else {
                    LogUtils_logHHAuto(`ERROR: Invalid troll N°${TTF}, do not fight, retry...`);
                    setStoredValue(HHStoredVarPrefixKey + "Temp_TrollInvalid", "true");
                    return true;
                }
            }
            if (Booster.needSandalWoodEquipped(TTF)) {
                if (currentPage !== ConfigHelper.getHHScriptVars("pagesIDShop")) {
                    LogUtils_logHHAuto('Go to Shop page to update booster status');
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDShop"));
                    return true;
                }
                else {
                    LogUtils_logHHAuto('Updating booster status');
                    Booster.collectBoostersFromMarket();
                    const equipped = yield Booster.equipeSandalWoodIfNeeded(TTF);
                    if (equipped) {
                        LogUtils_logHHAuto('Updating booster status after new booster equipped before fight');
                        Booster.collectBoostersFromMarket();
                    }
                }
            }
            LogUtils_logHHAuto(`Fighting troll N°${TTF}, ${trollz[Number(TTF)]}`);
            // Battles the latest boss.
            // Navigate to latest boss.
            //console.log(getPage());
            if (currentPage === ConfigHelper.getHHScriptVars("pagesIDTrollPreBattle") && window.location.search.includes("id_opponent=" + TTF)) {
                // On the battle screen.
                Troll.CrushThemFights();
                return true;
            }
            else {
                LogUtils_logHHAuto("Navigating to chosen Troll.");
                setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                LogUtils_logHHAuto("setting autoloop to false");
                //week 28 new battle modification
                //location.href = "/battle.html?id_troll=" + TTF;
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDTrollPreBattle"), { id_opponent: TTF });
                //End week 28 new battle modification
                return true;
            }
        });
    }
    static CrushThemFights() {
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDTrollPreBattle")) {
            // On battle page.
            LogUtils_logHHAuto("On Pre battle page.");
            let TTF = Number(queryStringGetParam(window.location.search, 'id_opponent'));
            const trollz = ConfigHelper.getHHScriptVars("trollzList");
            let battleButton = $('#pre-battle .battle-buttons a.green_button_L.battle-action-button');
            let battleButtonX10 = $('#pre-battle .battle-buttons button.autofight[data-battles="10"]');
            let battleButtonX50 = $('#pre-battle .battle-buttons button.autofight[data-battles="50"]');
            let battleButtonX10Price = Number(battleButtonX10.attr('price'));
            let battleButtonX50Price = Number(battleButtonX50.attr('price'));
            // let Hero=getHero();
            let hcConfirmValue = getHHVars('Hero.infos.hc_confirm');
            let remainingShards;
            let previousPower = getStoredValue(HHStoredVarPrefixKey + "Temp_trollPoints") !== undefined ? getStoredValue(HHStoredVarPrefixKey + "Temp_trollPoints") : 0;
            let currentPower = Troll.getEnergy();
            var checkPreviousFightDone = function () {
                // The goal of this function is to detect slow server response to avoid loop without fight
                if (previousPower > 0 && previousPower == currentPower) {
                    setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                    LogUtils_logHHAuto("Server seems slow to reply, setting autoloop to false to wait for troll page to load");
                }
            };
            //check if girl still available at troll in case of event
            let eventTrollGirl;
            const eventGirl = EventModule.getEventGirl();
            const eventMythicGirl = EventModule.getEventMythicGirl();
            if (TTF !== null) {
                const rewardGirlz = $("#pre-battle .oponnent-panel .opponent_rewards .rewards_list .slot.girl_ico[data-rewards]");
                const trollGirlRewards = rewardGirlz.attr('data-rewards') || '';
                const autoTrollSelectedIndex = Troll.getTrollSelectedIndex();
                if (eventMythicGirl.girl_id && TTF === eventMythicGirl.troll_id && eventMythicGirl.is_mythic && getStoredValue(HHStoredVarPrefixKey + "Setting_plusEventMythic") === "true") {
                    eventTrollGirl = eventMythicGirl;
                    if (rewardGirlz.length === 0 || !trollGirlRewards.includes('"id_girl":' + eventMythicGirl.girl_id)) {
                        LogUtils_logHHAuto(`Seems ${eventMythicGirl.name} is no more available at troll ${trollz[Number(TTF)]}. Going to event page.`);
                        EventModule.parseEventPage(eventMythicGirl.event_id);
                        return true;
                    }
                }
                if (eventGirl.girl_id && TTF === eventGirl.troll_id && !eventGirl.is_mythic && getStoredValue(HHStoredVarPrefixKey + "Setting_plusEvent") === "true") {
                    eventTrollGirl = eventGirl;
                    if (rewardGirlz.length === 0 || !trollGirlRewards.includes('"id_girl":' + eventGirl.girl_id)) {
                        LogUtils_logHHAuto(`Seems ${eventGirl.name} is no more available at troll ${trollz[Number(TTF)]}. Going to event page.`);
                        EventModule.parseEventPage(eventGirl.event_id);
                        return true;
                    }
                }
                if (rewardGirlz.length === 0 && (autoTrollSelectedIndex === 98 || autoTrollSelectedIndex === 99)) {
                    LogUtils_logHHAuto(`Seems no more girls available at troll ${trollz[Number(TTF)]}, looking for next troll.`);
                    let trollWithGirls = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_trollWithGirls")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_trollWithGirls")) : [];
                    trollWithGirls[TTF] = 0;
                    setStoredValue(HHStoredVarPrefixKey + "Temp_trollWithGirls", JSON.stringify(trollWithGirls));
                    const newTroll = Troll.getTrollIdToFight();
                    if (TTF != newTroll) {
                        gotoPage(ConfigHelper.getHHScriptVars("pagesIDTrollPreBattle"), { id_opponent: newTroll });
                        return true;
                    }
                    else {
                        LogUtils_logHHAuto(`Same troll found, go for it.`);
                    }
                }
                let canBuyFightsResult = Troll.canBuyFight(eventTrollGirl);
                if ((canBuyFightsResult.canBuy && currentPower === 0)
                    ||
                        (canBuyFightsResult.canBuy
                            && currentPower < 50
                            && canBuyFightsResult.max === 50
                            && getStoredValue(HHStoredVarPrefixKey + "Setting_useX50Fights") === "true"
                            && ((eventTrollGirl === null || eventTrollGirl === void 0 ? void 0 : eventTrollGirl.is_mythic) || getStoredValue(HHStoredVarPrefixKey + "Setting_useX50FightsAllowNormalEvent") === "true")
                            && TTF === (eventTrollGirl === null || eventTrollGirl === void 0 ? void 0 : eventTrollGirl.troll_id))
                    ||
                        (canBuyFightsResult.canBuy
                            && currentPower < 10
                            && canBuyFightsResult.max === 20
                            && getStoredValue(HHStoredVarPrefixKey + "Setting_useX10Fights") === "true"
                            && ((eventTrollGirl === null || eventTrollGirl === void 0 ? void 0 : eventTrollGirl.is_mythic) || getStoredValue(HHStoredVarPrefixKey + "Setting_useX10FightsAllowNormalEvent") === "true")
                            && TTF === (eventTrollGirl === null || eventTrollGirl === void 0 ? void 0 : eventTrollGirl.troll_id))) {
                    Troll.RechargeCombat(eventTrollGirl);
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDTrollPreBattle"), { id_opponent: TTF });
                    return true;
                }
                if (Number.isInteger(eventTrollGirl === null || eventTrollGirl === void 0 ? void 0 : eventTrollGirl.shards)
                    && battleButtonX10.length > 0
                    && battleButtonX50.length > 0
                    && getStoredValue(HHStoredVarPrefixKey + "Temp_autoTrollBattleSaveQuest") !== "true") {
                    remainingShards = Number(100 - (eventTrollGirl === null || eventTrollGirl === void 0 ? void 0 : eventTrollGirl.shards));
                    let bypassThreshold = (((eventTrollGirl === null || eventTrollGirl === void 0 ? void 0 : eventTrollGirl.is_mythic)
                        && canBuyFightsResult.canBuy) // eventGirl available and buy comb true
                        || ((eventTrollGirl === null || eventTrollGirl === void 0 ? void 0 : eventTrollGirl.is_mythic) && getStoredValue(HHStoredVarPrefixKey + "Setting_plusEventMythic") === "true"));
                    if (getStoredValue(HHStoredVarPrefixKey + "Setting_useX50Fights") === "true"
                        && getStoredValue(HHStoredVarPrefixKey + "Setting_minShardsX50")
                        && Number.isInteger(Number(getStoredValue(HHStoredVarPrefixKey + "Setting_minShardsX50")))
                        && remainingShards >= Number(getStoredValue(HHStoredVarPrefixKey + "Setting_minShardsX50"))
                        && (battleButtonX50Price === 0 || getHHVars('Hero.currencies.hard_currency') >= battleButtonX50Price + Number(getStoredValue(HHStoredVarPrefixKey + "Setting_kobanBank")))
                        && currentPower >= 50
                        && (currentPower >= (Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollThreshold")) + 50)
                            || bypassThreshold)
                        && ((eventTrollGirl === null || eventTrollGirl === void 0 ? void 0 : eventTrollGirl.is_mythic) || getStoredValue(HHStoredVarPrefixKey + "Setting_useX50FightsAllowNormalEvent") === "true")) {
                        LogUtils_logHHAuto("Going to crush 50 times: " + trollz[Number(TTF)] + ' for ' + battleButtonX50Price + ' kobans.');
                        setHHVars('Hero.infos.hc_confirm', true);
                        // We have the power.
                        //replaceCheatClick();
                        battleButtonX50[0].click();
                        setHHVars('Hero.infos.hc_confirm', hcConfirmValue);
                        //setStoredValue(HHStoredVarPrefixKey+"Temp_EventFightsBeforeRefresh", Number(getStoredValue(HHStoredVarPrefixKey+"Temp_EventFightsBeforeRefresh")) - 50);
                        LogUtils_logHHAuto("Crushed 50 times: " + trollz[Number(TTF)] + ' for ' + battleButtonX50Price + ' kobans.');
                        if (getStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement") === "battle") {
                            // Battle Done.
                            setStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement", "none");
                        }
                        RewardHelper.ObserveAndGetGirlRewards();
                        return;
                    }
                    else {
                        if (getStoredValue(HHStoredVarPrefixKey + "Setting_useX50Fights") === "true") {
                            LogUtils_logHHAuto('Unable to use x50 for ' + battleButtonX50Price + ' kobans,fights : ' + Troll.getEnergy() + '/50, remaining shards : ' + remainingShards + '/' + getStoredValue(HHStoredVarPrefixKey + "Setting_minShardsX50") + ', kobans : ' + getHHVars('Hero.currencies.hard_currency') + '/' + Number(getStoredValue(HHStoredVarPrefixKey + "Setting_kobanBank")));
                        }
                    }
                    if (getStoredValue(HHStoredVarPrefixKey + "Setting_useX10Fights") === "true"
                        && getStoredValue(HHStoredVarPrefixKey + "Setting_minShardsX10")
                        && Number.isInteger(Number(getStoredValue(HHStoredVarPrefixKey + "Setting_minShardsX10")))
                        && remainingShards >= Number(getStoredValue(HHStoredVarPrefixKey + "Setting_minShardsX10"))
                        && (battleButtonX10Price === 0 || getHHVars('Hero.currencies.hard_currency') >= battleButtonX10Price + Number(getStoredValue(HHStoredVarPrefixKey + "Setting_kobanBank")))
                        && currentPower >= 10
                        && (currentPower >= (Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollThreshold")) + 10)
                            || bypassThreshold)
                        && (eventTrollGirl.is_mythic || getStoredValue(HHStoredVarPrefixKey + "Setting_useX10FightsAllowNormalEvent") === "true")) {
                        LogUtils_logHHAuto("Going to crush 10 times: " + trollz[Number(TTF)] + ' for ' + battleButtonX10Price + ' kobans.');
                        setHHVars('Hero.infos.hc_confirm', true);
                        // We have the power.
                        //replaceCheatClick();
                        battleButtonX10[0].click();
                        setHHVars('Hero.infos.hc_confirm', hcConfirmValue);
                        //setStoredValue(HHStoredVarPrefixKey+"Temp_EventFightsBeforeRefresh", Number(getStoredValue(HHStoredVarPrefixKey+"Temp_EventFightsBeforeRefresh")) - 10);
                        LogUtils_logHHAuto("Crushed 10 times: " + trollz[Number(TTF)] + ' for ' + battleButtonX10Price + ' kobans.');
                        if (getStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement") === "battle") {
                            // Battle Done.
                            setStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement", "none");
                        }
                        RewardHelper.ObserveAndGetGirlRewards();
                        return;
                    }
                    else {
                        if (getStoredValue(HHStoredVarPrefixKey + "Setting_useX10Fights") === "true") {
                            LogUtils_logHHAuto('Unable to use x10 for ' + battleButtonX10Price + ' kobans,fights : ' + Troll.getEnergy() + '/10, remaining shards : ' + remainingShards + '/' + getStoredValue(HHStoredVarPrefixKey + "Setting_minShardsX10") + ', kobans : ' + getHHVars('Hero.currencies.hard_currency') + '/' + Number(getStoredValue(HHStoredVarPrefixKey + "Setting_kobanBank")));
                        }
                    }
                }
                //Crushing one by one
                if (currentPower > 0) {
                    if ($('#pre-battle div.battle-buttons a.single-battle-button[disabled]').length > 0) {
                        LogUtils_logHHAuto("Battle Button seems disabled, force reload of page.");
                        gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                        return;
                    }
                    if (battleButton === undefined || battleButton.length === 0) {
                        LogUtils_logHHAuto("Battle Button was undefined. Disabling all auto-battle.");
                        document.getElementById("autoTrollBattle").checked = false;
                        setStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollBattle", "false");
                        //document.getElementById("autoArenaCheckbox").checked = false;
                        if (getStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement") === "battle") {
                            document.getElementById("autoQuest").checked = false;
                            setStoredValue(HHStoredVarPrefixKey + "Setting_autoQuest", "false");
                            LogUtils_logHHAuto("Auto-quest disabled since it requires battle and auto-battle has errors.");
                        }
                        return;
                    }
                    LogUtils_logHHAuto("Crushing: " + trollz[Number(TTF)]);
                    //console.log(battleButton);
                    //replaceCheatClick();
                    checkPreviousFightDone();
                    setStoredValue(HHStoredVarPrefixKey + "Temp_trollPoints", currentPower);
                    battleButton[0].click();
                }
                else {
                    // We need more power.
                    const battle_price = 1; // TODO what is the expected value here ?
                    LogUtils_logHHAuto(`Battle requires ${battle_price} power, having ${currentPower}.`);
                    setStoredValue(HHStoredVarPrefixKey + "Temp_battlePowerRequired", battle_price);
                    if (getStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement") === "battle") {
                        setStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement", "P" + battle_price);
                    }
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                    return;
                }
            }
            else {
                checkPreviousFightDone();
                setStoredValue(HHStoredVarPrefixKey + "Temp_trollPoints", currentPower);
                //replaceCheatClick();
                battleButton[0].click();
            }
        }
        else {
            LogUtils_logHHAuto('Unable to identify page.');
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
            return;
        }
        return;
    }
    static RechargeCombat(eventTrollGirl) {
        const Hero = getHero();
        let canBuyResult = Troll.canBuyFight(eventTrollGirl);
        if (canBuyResult.canBuy) {
            LogUtils_logHHAuto('Recharging ' + canBuyResult.toBuy + ' fights for ' + canBuyResult.price + ' kobans.');
            let hcConfirmValue = getHHVars('Hero.infos.hc_confirm');
            setHHVars('Hero.infos.hc_confirm', true);
            // We have the power.
            //replaceCheatClick();
            //console.log($("plus[type='energy_fight']"), canBuyResult.price,canBuyResult.type, canBuyResult.max);
            Hero.recharge($("button.orange_text_button.manual-recharge"), canBuyResult.type, canBuyResult.max, canBuyResult.price);
            setHHVars('Hero.infos.hc_confirm', hcConfirmValue);
            LogUtils_logHHAuto('Recharged up to ' + canBuyResult.max + ' fights for ' + canBuyResult.price + ' kobans.');
        }
    }
    static canBuyFight(eventGirl, logging = true) {
        const type = "fight";
        let hero = getHero();
        let result = { canBuy: false, price: 0, max: 0, toBuy: 0, event_mythic: "false", type: type };
        const MAX_BUY = 200;
        let maxx50 = 50;
        let maxx20 = 20;
        const currentFight = Troll.getEnergy();
        const eventAutoBuy = Math.min(Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoBuyTrollNumber")) || maxx20, MAX_BUY - currentFight);
        const mythicAutoBuy = Math.min(Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoBuyMythicTrollNumber")) || maxx20, MAX_BUY - currentFight);
        const pricePerFight = hero.energies[type].seconds_per_point * (unsafeWindow.hh_prices[type + '_cost_per_minute'] / 60);
        let remainingShards;
        if (Number.isInteger(eventGirl === null || eventGirl === void 0 ? void 0 : eventGirl.shards)) {
            if ((getStoredValue(HHStoredVarPrefixKey + "Setting_buyCombat") == "true"
                && getStoredValue(HHStoredVarPrefixKey + "Setting_plusEvent") === "true"
                && getSecondsLeft("eventGoing") !== 0
                && !Number.isNaN(Number(getStoredValue(HHStoredVarPrefixKey + "Setting_buyCombTimer")))
                && getSecondsLeft("eventGoing") < getStoredValue(HHStoredVarPrefixKey + "Setting_buyCombTimer") * 3600
                && eventGirl.girl_id && !eventGirl.is_mythic)
                ||
                    (getStoredValue(HHStoredVarPrefixKey + "Setting_plusEventMythic") === "true"
                        && getStoredValue(HHStoredVarPrefixKey + "Setting_buyMythicCombat") === "true"
                        && getSecondsLeft("eventMythicGoing") !== 0
                        && !Number.isNaN(Number(getStoredValue(HHStoredVarPrefixKey + "Setting_buyMythicCombTimer")))
                        && getSecondsLeft("eventMythicGoing") < getStoredValue(HHStoredVarPrefixKey + "Setting_buyMythicCombTimer") * 3600
                        && eventGirl.is_mythic)) {
                result.event_mythic = eventGirl.is_mythic.toString();
            }
            else {
                return result;
            }
            maxx50 = result.event_mythic === "true" ? Math.max(maxx50, mythicAutoBuy) : Math.max(maxx50, eventAutoBuy);
            maxx20 = result.event_mythic === "true" ? mythicAutoBuy : eventAutoBuy;
            //console.log(result);
            remainingShards = Number(100 - eventGirl.shards);
            if (getStoredValue(HHStoredVarPrefixKey + "Setting_minShardsX50") !== undefined
                && Number.isInteger(Number(getStoredValue(HHStoredVarPrefixKey + "Setting_minShardsX50")))
                && remainingShards >= Number(getStoredValue(HHStoredVarPrefixKey + "Setting_minShardsX50"))
                && getHHVars('Hero.currencies.hard_currency') >= (pricePerFight * maxx50) + Number(getStoredValue(HHStoredVarPrefixKey + "Setting_kobanBank"))
                && getStoredValue(HHStoredVarPrefixKey + "Setting_useX50Fights") === "true"
                && currentFight < maxx50
                && (result.event_mythic === "true" || getStoredValue(HHStoredVarPrefixKey + "Setting_useX50FightsAllowNormalEvent") === "true")) {
                result.max = maxx50;
                result.canBuy = true;
                result.price = pricePerFight * maxx50;
                result.toBuy = maxx50;
            }
            else {
                if (logging && getStoredValue(HHStoredVarPrefixKey + "Setting_useX50Fights") === "true") {
                    LogUtils_logHHAuto('Unable to recharge up to ' + maxx50 + ' for ' + (pricePerFight * maxx50) + ' kobans : current energy : ' + currentFight + ', remaining shards : ' + remainingShards + '/' + getStoredValue(HHStoredVarPrefixKey + "Setting_minShardsX50") + ', kobans : ' + getHHVars('Hero.currencies.hard_currency') + '/' + Number(getStoredValue(HHStoredVarPrefixKey + "Setting_kobanBank")));
                }
                if (getHHVars('Hero.currencies.hard_currency') >= (pricePerFight * maxx20) + Number(getStoredValue(HHStoredVarPrefixKey + "Setting_kobanBank"))) //&& currentFight < 10)
                 {
                    result.max = maxx20;
                    result.canBuy = true;
                    result.price = pricePerFight * maxx20;
                    result.toBuy = maxx20;
                }
                else {
                    if (logging) {
                        LogUtils_logHHAuto('Unable to recharge up to ' + maxx20 + ' for ' + (pricePerFight * maxx20) + ' kobans : current energy : ' + currentFight + ', kobans : ' + getHHVars('Hero.currencies.hard_currency') + '/' + Number(getStoredValue(HHStoredVarPrefixKey + "Setting_kobanBank")));
                    }
                    return result;
                }
            }
        }
        return result;
    }
}

;// CONCATENATED MODULE: ./src/Module/GenericBattle.ts






class GenericBattle {
    static doBattle() {
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDLeagueBattle") || getPage() === ConfigHelper.getHHScriptVars("pagesIDTrollBattle") || getPage() === ConfigHelper.getHHScriptVars("pagesIDSeasonBattle") || getPage() === ConfigHelper.getHHScriptVars("pagesIDPantheonBattle")) {
            LogUtils_logHHAuto("On battle page.");
            let troll_id = queryStringGetParam(window.location.search, 'id_opponent');
            const lastTrollIdAvailable = Troll.getLastTrollIdAvailable();
            if (getPage() === ConfigHelper.getHHScriptVars("pagesIDLeagueBattle") && getStoredValue(HHStoredVarPrefixKey + "Setting_autoLeagues") === "true") {
                LogUtils_logHHAuto("Reloading after league fight.");
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDLeaderboard"), {}, randomInterval(4000, 5000));
            }
            else if (getPage() === ConfigHelper.getHHScriptVars("pagesIDTrollBattle")) {
                //console.log(Number(troll_id),Number(getHHVars('Hero.infos.questing.id_world'))-1,Number(troll_id) === Number(getHHVars('Hero.infos.questing.id_world'))-1);
                if (getStoredValue(HHStoredVarPrefixKey + "Temp_autoTrollBattleSaveQuest") === "true" && (Number(troll_id) === lastTrollIdAvailable)) {
                    setStoredValue(HHStoredVarPrefixKey + "Temp_autoTrollBattleSaveQuest", "false");
                }
                const eventGirl = EventModule.getEventGirl();
                const eventMythicGirl = EventModule.getEventMythicGirl();
                if (getStoredValue(HHStoredVarPrefixKey + "Setting_plusEvent") === "true" && (eventGirl === null || eventGirl === void 0 ? void 0 : eventGirl.girl_id) && !(eventGirl === null || eventGirl === void 0 ? void 0 : eventGirl.is_mythic)
                    ||
                        getStoredValue(HHStoredVarPrefixKey + "Setting_plusEventMythic") === "true" && (eventMythicGirl === null || eventMythicGirl === void 0 ? void 0 : eventMythicGirl.girl_id) && (eventMythicGirl === null || eventMythicGirl === void 0 ? void 0 : eventMythicGirl.is_mythic)) {
                    LogUtils_logHHAuto("Event ongoing search for girl rewards in popup.");
                    RewardHelper.ObserveAndGetGirlRewards();
                }
                else {
                    if (troll_id !== null) {
                        LogUtils_logHHAuto("Go back to Troll after Troll fight.");
                        gotoPage(ConfigHelper.getHHScriptVars("pagesIDTrollPreBattle"), { id_opponent: troll_id }, randomInterval(2000, 4000));
                    }
                    else {
                        LogUtils_logHHAuto("Go to home after unknown troll fight.");
                        gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"), {}, randomInterval(2000, 4000));
                    }
                }
            }
            else if (getPage() === ConfigHelper.getHHScriptVars("pagesIDSeasonBattle") && getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeason") === "true") {
                LogUtils_logHHAuto("Go back to Season arena after Season fight.");
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDSeasonArena"), {}, randomInterval(2000, 4000));
            }
            else if (getPage() === ConfigHelper.getHHScriptVars("pagesIDPantheonBattle") && getStoredValue(HHStoredVarPrefixKey + "Setting_autoPantheon") === "true") {
                LogUtils_logHHAuto("Go back to Pantheon arena after Pantheon temple.");
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDPantheon"), {}, randomInterval(2000, 4000));
            }
            else if (getPage() === ConfigHelper.getHHScriptVars("pagesIDLabyrinthBattle") && getStoredValue(HHStoredVarPrefixKey + "Setting_autoLabyrinth") === "true") {
                LogUtils_logHHAuto("Go back to Labyrinth after fight.");
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDLabyrinth"), {}, randomInterval(2000, 4000));
            }
            return true;
        }
        else {
            LogUtils_logHHAuto('Unable to identify page.');
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
            return;
        }
    }
}

;// CONCATENATED MODULE: ./src/Module/harem/HaremGirl.ts
var HaremGirl_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





class HaremGirl {
    static getMaxOutButton(haremItem) {
        return $('#girl-leveler-max-out-' + haremItem + ':not([disabled])');
    }
    static getMaxOutAllButton(haremItem) {
        return $('#girl-leveler-max-out-all-levels-' + haremItem + ':not([disabled])');
    }
    static switchTabs(haremItem) {
        $('#girl-leveler-tabs .switch-tab[data-tab="' + haremItem + '"]').click();
    }
    static confirmMaxOut() {
        const confirmMaxOutButton = $('#girl_max_out_popup button.blue_button_L:not([disabled]):visible[confirm_callback]');
        if (confirmMaxOutButton.length > 0) {
            confirmMaxOutButton.click();
        }
        else
            LogUtils_logHHAuto('Confirm max out button not found');
    }
    static maxOutButtonAndConfirm(haremItem, girl) {
        return new Promise((resolve) => {
            const maxOutButton = HaremGirl.getMaxOutButton(haremItem);
            if (maxOutButton.length > 0) {
                LogUtils_logHHAuto('Max out ' + haremItem + ' for girl ' + girl.id_girl);
                maxOutButton.click();
                setTimeout(() => {
                    HaremGirl.confirmMaxOut();
                    setTimeout(() => {
                        resolve(true);
                    }, 200);
                }, randomInterval(700, 1100));
            }
            else {
                LogUtils_logHHAuto('Max out button for' + haremItem + ' for girl ' + girl.id_girl + ' not enabled');
                resolve(false);
            }
        });
    }
    static confirmMaxOutAllCash() {
        const confirmMaxOutButton = $('#girl_max_out_all_levels_popup button.green_button_L:not([disabled]):visible[confirm_callback][currency="soft_currency"]');
        if (confirmMaxOutButton.length > 0) {
            confirmMaxOutButton.trigger('click');
        }
        else
            LogUtils_logHHAuto('Confirm max out all button not found');
    }
    static maxOutAllButtonAndConfirm(haremItem, girl) {
        return new Promise((resolve) => {
            const maxOutButton = HaremGirl.getMaxOutAllButton(haremItem);
            if (maxOutButton.length > 0) {
                LogUtils_logHHAuto('Max out all ' + haremItem + ' for girl ' + girl.id_girl);
                maxOutButton.trigger('click');
                setTimeout(() => {
                    HaremGirl.confirmMaxOutAllCash();
                    setTimeout(() => {
                        resolve(true);
                    }, 200);
                }, randomInterval(700, 1100));
            }
            else {
                LogUtils_logHHAuto('Max out all button for' + haremItem + ' for girl ' + girl.id_girl + ' not enabled');
                resolve(false);
            }
        });
    }
    static confirmAwake() {
        const confAwakButton = $('#awakening_popup button.awaken-btn:not([disabled]):visible');
        if (confAwakButton.length > 0) {
            confAwakButton.trigger('click'); // Page will be refreshed
            return true;
        }
        else {
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
        if (awakButton.length > 0 && canXpGirl) {
            LogUtils_logHHAuto('Awake for girl ' + girl.id_girl);
            awakButton.trigger('click');
            setTimeout(HaremGirl.confirmAwake, randomInterval(500, 1000)); // Page will be refreshed if done
            return true;
        }
        else {
            LogUtils_logHHAuto('Awake button for girl ' + girl.id_girl + ' not enabled or not enough gems (' + numberOfGem + '<' + girl.awakening_costs + ')');
            return false;
        }
    }
    ;
    static goToGirlQuest(girl, retry = 0) {
        const canGiftGirl = girl.nb_grades > girl.graded;
        const upgradeQuest = $('.upgrade_girl').attr('href');
        if (canGiftGirl && upgradeQuest && upgradeQuest.indexOf('/quest/') >= 0) {
            LogUtils_logHHAuto('Upgrade for girl ' + girl.id_girl + ' quest:' + upgradeQuest);
            gotoPage(upgradeQuest);
            return true;
        }
        else {
            LogUtils_logHHAuto('Can\'t upgrade girl ' + girl.id_girl + ': grade (' + girl.graded + '/' + girl.nb_grades + '), quest :' + upgradeQuest);
            if (!upgradeQuest && retry < 2) {
                LogUtils_logHHAuto('Can be loading time, retry in 1s');
                setTimeout(() => {
                    HaremGirl.goToGirlQuest(girl, 1);
                }, randomInterval(1000, 1500));
            }
            return false;
        }
    }
    ;
    static payGirlQuest() {
        var proceedButtonMatch = $("#controls button.grade-complete-button:not([style*='display:none']):not([style*='display: none'])");
        if (proceedButtonMatch.length > 0) {
            var proceedButtonCost = $(".price", proceedButtonMatch);
            var proceedCost = parsePrice(proceedButtonCost[0].innerText);
            var moneyCurrent = getHHVars('Hero.currencies.soft_currency');
            setStoredValue(HHStoredVarPrefixKey + "Temp_lastActionPerformed", Harem.HAREM_UPGRADE_LAST_ACTION);
            console.log("Debug girl Quest MONEY for : " + proceedCost);
            if (proceedCost <= moneyCurrent) {
                // We have money.
                LogUtils_logHHAuto("Spending " + proceedCost + " Money to proceed.");
                setTimeout(function () {
                    proceedButtonMatch.trigger('click');
                }, randomInterval(500, 800));
                return true;
            }
            else {
                LogUtils_logHHAuto("Need " + proceedCost + " Money to proceed.");
                Harem.clearHaremToolVariables();
                return false;
            }
        }
        else {
            const haremGirlPayLast = getStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlPayLast") == 'true';
            if (haremGirlPayLast) {
                // back
                gotoPage('/girl/' + unsafeWindow.id_girl, { resource: 'affection' }, randomInterval(1500, 2500));
                return true;
            }
            else {
                LogUtils_logHHAuto("ERROR No pay button found stopping.");
                Harem.clearHaremToolVariables();
                return false;
            }
        }
    }
    static maxOutAndAwake(haremItem, selectedGirl) {
        return HaremGirl_awaiter(this, void 0, void 0, function* () {
            yield HaremGirl.maxOutButtonAndConfirm(haremItem, selectedGirl);
            setTimeout(function () {
                HaremGirl.awakGirl(selectedGirl);
            }, randomInterval(1500, 2500));
        });
    }
    static giveHaremGirlItem(haremItem) {
        return HaremGirl_awaiter(this, void 0, void 0, function* () {
            const selectedGirl = unsafeWindow.girl;
            HaremGirl.switchTabs(haremItem);
            const userHaremGirlLimit = Math.min(Number(document.getElementById("menuExpLevel").value), 750);
            if ((Number(selectedGirl.level) + 50) <= Number(userHaremGirlLimit)) {
                HaremGirl.HaremDisplayGirlPopup(haremItem, selectedGirl.name + ' ' + selectedGirl.Xp.cur + "xp, level " + selectedGirl.level + "/" + userHaremGirlLimit, (1) * 5);
                setStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlActions", haremItem);
                setStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlMode", 'girl');
                setStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlLimit", userHaremGirlLimit);
                setStoredValue(HHStoredVarPrefixKey + "Temp_lastActionPerformed", Harem.HAREM_UPGRADE_LAST_ACTION);
                if ((Number(selectedGirl.level) + 50) >= Number(userHaremGirlLimit)) {
                    yield HaremGirl.maxOutButtonAndConfirm(haremItem, selectedGirl);
                    HaremGirl.HaremClearGirlPopup();
                }
                else {
                    setTimeout(function () {
                        HaremGirl.maxOutAndAwake(haremItem, selectedGirl);
                    }, randomInterval(500, 1000));
                }
            }
            else {
                if (Number(selectedGirl.level) >= Number(userHaremGirlLimit))
                    LogUtils_logHHAuto("Girl already above target, ignoring action");
                else
                    LogUtils_logHHAuto("Girl and max out will be above target, ignoring action");
            }
        });
    }
    static fillAllAffection() {
        return HaremGirl_awaiter(this, void 0, void 0, function* () {
            const haremItem = HaremGirl.AFFECTION_TYPE;
            const selectedGirl = unsafeWindow.girl;
            HaremGirl.switchTabs(haremItem);
            const haremGirlPayLast = getStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlPayLast") == 'true';
            const canGiftGirl = selectedGirl.nb_grades > selectedGirl.graded;
            const lastGirlGrad = selectedGirl.nb_grades <= (selectedGirl.graded + 1);
            const maxOutButton = HaremGirl.getMaxOutButton(haremItem);
            const maxOutAllButton = HaremGirl.getMaxOutAllButton(haremItem);
            if (canGiftGirl) {
                if (haremGirlPayLast && maxOutAllButton.length > 0) {
                    yield HaremGirl.maxOutAllButtonAndConfirm(haremItem, selectedGirl);
                    // reach girl quest
                    return true;
                }
                else if (maxOutButton.length > 0) {
                    yield HaremGirl.maxOutButtonAndConfirm(haremItem, selectedGirl);
                    if (!lastGirlGrad || haremGirlPayLast) {
                        setTimeout(function () {
                            HaremGirl.goToGirlQuest(selectedGirl);
                        }, randomInterval(1500, 2000));
                        return true;
                    }
                    else {
                        LogUtils_logHHAuto("Girl grade reach, keep last to buy manually");
                    }
                }
            }
            else {
                LogUtils_logHHAuto("Girl grade is already maxed out");
            }
            return false;
        });
    }
    static addGirlMenu() {
        const girlMenuButtonId = 'girlMenu';
        if ($('#' + girlMenuButtonId).length > 0)
            return;
        var createMenuButton = function (menuId, disabled = false) {
            return '<div class="tooltipHH">'
                + '<span class="tooltipHHtext">' + getTextForUI(menuId, "tooltip") + '</span>'
                + '<label style="font-size: initial;" class="myButton" ' + (disabled ? 'disabled="disabled"' : '') + ' id="' + menuId + 'Button">' + getTextForUI(menuId, "elementText")
                + '</label></div>';
        };
        const girlMenuButton = '<div style="position: absolute;left: 425px;top: 0px; font-size: small; z-index:30;" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("girlMenu", "tooltip") + '</span><label class="myButton" id="' + girlMenuButtonId + '">+</label></div>';
        var openGirlMenu = function () {
            const selectedGirl = unsafeWindow.girl;
            const canGiftGirl = selectedGirl.nb_grades > selectedGirl.graded; // && HaremGirl.getMaxOutButton(HaremGirl.AFFECTION_TYPE).length > 0;
            const menuIDXp = "haremGirlGiveXP";
            const menuIDGifts = "haremGirlGiveGifts";
            const menuIDMaxGifts = "haremGirlGiveMaxGifts";
            const menuIDUpgradeMax = "haremGirlUpgradeMax";
            const menuIDXpButton = createMenuButton(menuIDXp);
            const menuIDGiftsButton = createMenuButton(menuIDGifts);
            const menuIDMaxGiftsButton = createMenuButton(menuIDMaxGifts, !canGiftGirl);
            const menuIDUpgradeMaxButton = createMenuButton(menuIDUpgradeMax, !canGiftGirl);
            const imgPath = ConfigHelper.getHHScriptVars("baseImgPath");
            const girlMenu = '<div style="padding:50px; display:flex;flex-direction:column">'
                //+    '<p id="HaremGirlMenuText">'+getTextForUI("girlMenu","elementText")+'</p>'
                + '<div class="optionsBoxWithTitle">'
                + '<div class="optionsBoxTitle"><img class="iconImg" src="' + imgPath + '/design/ic_books_gray.svg"><span class="optionsBoxTitle">' + getTextForUI("experience", "elementText") + '</span></div>'
                + '<div class="optionsBox">'
                + '<div style="padding:10px">' + menuIDXpButton + '</div>'
                + '</div>'
                + '</div>'
                + '<div class="optionsBoxWithTitle">'
                + '<div class="optionsBoxTitle"><img class="iconImg" src="' + imgPath + '/design/ic_gifts_gray.svg"><span class="optionsBoxTitle">' + getTextForUI("affection", "elementText") + '</span></div>'
                + '<div class="optionsBox">'
                //+       '<div style="padding:10px">'+menuIDGiftsButton+'</div>'
                + '<div style="padding:10px">' + menuIDMaxGiftsButton + '</div>'
                + '<div style="padding:10px">' + menuIDUpgradeMaxButton + '</div>'
                + '</div>'
                + '</div>';
            fillHHPopUp("GirlMenu", getTextForUI("girlMenu", "elementText"), girlMenu);
            $('#' + menuIDXp + 'Button').on("click", function () {
                maskHHPopUp();
                HaremGirl.switchTabs(HaremGirl.EXPERIENCE_TYPE);
                HaremGirl.displayExpMenu(HaremGirl.EXPERIENCE_TYPE);
            });
            if (canGiftGirl) {
                const fillGirlGifts = (payLast = false) => {
                    maskHHPopUp();
                    HaremGirl.switchTabs(HaremGirl.AFFECTION_TYPE);
                    setStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlActions", HaremGirl.AFFECTION_TYPE);
                    setStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlMode", 'girl');
                    setStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlEnd", 'true');
                    setStoredValue(HHStoredVarPrefixKey + "Temp_lastActionPerformed", Harem.HAREM_UPGRADE_LAST_ACTION);
                    if (payLast)
                        setStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlPayLast", 'true');
                    setTimeout(HaremGirl.fillAllAffection, randomInterval(500, 800));
                };
                $('#' + menuIDMaxGifts + 'Button').on("click", () => {
                    fillGirlGifts(false);
                });
                $('#' + menuIDUpgradeMax + 'Button').on("click", () => {
                    fillGirlGifts(true);
                });
            }
        };
        $('#girl-leveler-tabs').append(girlMenuButton);
        GM_registerMenuCommand(getTextForUI('girlMenu', "elementText"), openGirlMenu);
        $('#' + girlMenuButtonId).on("click", openGirlMenu);
    }
    static displayExpMenu(haremItem = HaremGirl.EXPERIENCE_TYPE) {
        const selectedGirl = unsafeWindow.girl;
        const menuID = "menuExp";
        //        const menuExp = '<div style="position: absolute;right: 50px;top: -10px; font-size: small;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuExp","tooltip")+'</span><label style="width:100px" class="myButton" id="menuExp">'+getTextForUI("menuExp","elementText")+'</label></div>'
        const menuExpContent = '<div style="width:600px;justify-content: space-between;align-items: flex-start;"class="HHMenuRow">'
            + '<div id="menuExp-moveLeft"></div>'
            + '<div style="padding:10px; display:flex;flex-direction:column;">'
            + '<p style="min-height:10vh;" id="menuExpText"></p>'
            + '<div class="HHMenuRow">'
            + '<p>' + getTextForUI("menuExpLevel", "elementText") + '</p>'
            + '<div style="padding:10px;" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("menuExpLevel", "tooltip") + '</span><input id="menuExpLevel" style="width:50px;height:20px" required pattern="' + HHAuto_inputPattern.menuExpLevel + '" type="text" value="' + getHHVars('Hero.infos.level') + '"></div>'
            + '</div>'
            + '<input id="menuExpMode" type="hidden" value="">'
            + '<div style="padding:10px;justify-content:center" class="HHMenuRow">'
            + '<div id="menuExpHide">'
            + '<div class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("menuExpButton", "tooltip") + '</span><label style="width:80px" class="myButton" id="menuExpButton">' + getTextForUI("menuExpButton", "elementText") + '</label></div>'
            + '</div>'
            + '</div>'
            + '</div>'
            + '<div id="menuExp-moveRight"></div>'
            + '</div>';
        fillHHPopUp(menuID, getTextForUI("menuExp", "elementText"), menuExpContent);
        displayHHPopUp();
        $("#menuExpText").html(selectedGirl.name + " " + selectedGirl.Xp.cur + "xp, level " + selectedGirl.level + "<br>" + getTextForUI("menuExpInfo", "elementText") + "<br>");
        document.getElementById("menuExpMode").value = haremItem;
        var KeyUpExp = function (evt) {
            if (evt.key === 'Enter') {
                maskHHPopUp();
                HaremGirl.giveHaremGirlItem(document.getElementById("menuExpMode").value);
            }
        };
        document.removeEventListener('keyup', KeyUpExp, false);
        document.addEventListener('keyup', KeyUpExp, false);
        $("#menuExpButton").on("click", function () {
            maskHHPopUp();
            HaremGirl.giveHaremGirlItem(haremItem);
        });
    }
    static canGiftGirl() {
        try {
            const girl = unsafeWindow.girl;
            return girl.nb_grades > girl.graded && HaremGirl.getMaxOutButton(HaremGirl.AFFECTION_TYPE).length > 0;
        }
        catch (error) {
            LogUtils_logHHAuto("ERROR can't compute canGiftGirl");
            return false;
        }
    }
    static canAwakeGirl() {
        try {
            const girl = unsafeWindow.girl;
            const numberOfGem = unsafeWindow.player_gems_amount[girl.element].amount;
            return numberOfGem >= girl.awakening_costs;
        }
        catch (error) {
            LogUtils_logHHAuto("ERROR can't compute canAwakeGirl");
            return false;
        }
    }
    static moduleHaremGirl() {
        try {
            const canAwakeGirl = HaremGirl.canAwakeGirl();
            //const canGiftGirl = HaremGirl.canGiftGirl();
            const girl = unsafeWindow.girl;
            const numberOfGem = unsafeWindow.player_gems_amount[girl.element].amount;
            //logHHAuto("moduleHaremGirl: " + girl.id_girl);
            LogUtils_logHHAuto("Current level : " + girl.level + ', max level without gems : ' + girl.level_cap);
            LogUtils_logHHAuto("Number of gem needed in next awakening : " + girl.awakening_costs + " / Gem in stock : " + numberOfGem);
            LogUtils_logHHAuto("Girl grade : " + girl.graded + '/' + girl.nb_grades);
            const menuIDXp = "haremGirlGiveXP";
            const menuIDGifts = "haremGirlGiveGifts";
            var giveHaremXp = function () { HaremGirl.displayExpMenu(HaremGirl.EXPERIENCE_TYPE); };
            //var giveHaremGifts = function() {HaremGirl.displayExpMenu(HaremGirl.AFFECTION_TYPE);};
            if (canAwakeGirl)
                GM_registerMenuCommand(getTextForUI(menuIDXp, "elementText"), giveHaremXp);
            //if(canGiftGirl) // Not supported yet
            //   GM_registerMenuCommand(getTextForUI(menuIDGifts,"elementText"), giveHaremGifts);
            HaremGirl.addGirlMenu();
        }
        catch ({ errName, message }) {
            LogUtils_logHHAuto(`ERROR: Can't add menu girl: ${errName}, ${message}`);
            console.error(message);
        }
    }
    static run() {
        return HaremGirl_awaiter(this, void 0, void 0, function* () {
            try {
                const haremItem = getStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlActions");
                const haremGirlMode = getStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlMode");
                const haremGirlEnd = getStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlEnd") === 'true';
                const haremGirlLimit = getStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlLimit");
                const canGiftGirl = HaremGirl.canGiftGirl();
                const canAwakeGirl = HaremGirl.canAwakeGirl();
                const girl = unsafeWindow.girl;
                if (!haremItem) {
                    // No action to be peformed
                    return Promise.resolve(false);
                }
                LogUtils_logHHAuto("run HaremGirl: " + girl.name + '(' + girl.id_girl + ')');
                setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                LogUtils_logHHAuto("setting autoloop to false as action to be performed on girl");
                LogUtils_logHHAuto("Action to be performed (mode: " + haremGirlMode + ") : give " + haremItem);
                if (haremGirlMode === 'girl') {
                    if (haremItem == HaremGirl.EXPERIENCE_TYPE && haremGirlLimit && (Number(girl.level) + 50) <= Number(haremGirlLimit)) {
                        LogUtils_logHHAuto("haremGirlLimit: " + haremGirlLimit);
                        HaremGirl.HaremDisplayGirlPopup(haremItem, girl.name + ' ' + girl.Xp.cur + "xp, level " + girl.level + "/" + haremGirlLimit, (1) * 5);
                        if ((Number(girl.level) + 50) >= Number(haremGirlLimit)) {
                            yield HaremGirl.maxOutButtonAndConfirm(haremItem, girl);
                            HaremGirl.HaremClearGirlPopup();
                            Harem.clearHaremToolVariables();
                        }
                        else
                            HaremGirl.maxOutAndAwake(haremItem, girl);
                    }
                    else if (haremItem == HaremGirl.AFFECTION_TYPE && (canGiftGirl)) {
                        HaremGirl.HaremDisplayGirlPopup(haremItem, girl.name + ' ' + girl.graded + "/" + girl.nb_grades + "star", 2);
                        if (!(yield HaremGirl.fillAllAffection())) {
                            LogUtils_logHHAuto("No more quest");
                            // No more quest
                            HaremGirl.HaremClearGirlPopup();
                            Harem.clearHaremToolVariables();
                            return Promise.resolve(false);
                        }
                    }
                    else {
                        LogUtils_logHHAuto('ERROR, no action found to be executed. ', { haremItem: haremItem, canGiftGirl: canGiftGirl, canAwakeGirl: canAwakeGirl });
                        Harem.clearHaremToolVariables();
                        return Promise.resolve(false);
                    }
                    return Promise.resolve(true);
                }
                else if (haremGirlMode === 'list') {
                    let nextGirlId = -1;
                    let girlPosInList = 0;
                    let remainingGirls = 0;
                    let girlListProgress = '';
                    const lastGirlListProgress = '<br />' + getTextForUI("giveLastGirl", "elementText");
                    let filteredGirlsList = getStoredValue(HHStoredVarPrefixKey + "Temp_filteredGirlsList") ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_filteredGirlsList")) : [];
                    LogUtils_logHHAuto("filteredGirlsList", filteredGirlsList);
                    if (filteredGirlsList && filteredGirlsList.length > 0) {
                        girlPosInList = filteredGirlsList.indexOf("" + girl.id_girl);
                        if (girlPosInList >= 0 && filteredGirlsList.length > (girlPosInList + 1)) {
                            remainingGirls = filteredGirlsList.length - girlPosInList - 1;
                            nextGirlId = filteredGirlsList[girlPosInList + 1];
                            girlListProgress = (girlPosInList + 1) + '/' + filteredGirlsList.length;
                        }
                    }
                    else {
                        LogUtils_logHHAuto("ERROR: no girls stored");
                    }
                    if (haremGirlEnd && haremItem == HaremGirl.AFFECTION_TYPE) {
                        if (girl.graded == girl.nb_grades && nextGirlId < 0)
                            girlListProgress += lastGirlListProgress;
                        HaremGirl.HaremDisplayGirlPopup(haremItem, girl.name + ' ' + girl.graded + "/" + girl.nb_grades + "star : Girl " + girlListProgress, (remainingGirls + 1) * 5);
                        if (yield HaremGirl.fillAllAffection()) {
                            LogUtils_logHHAuto("Going to girl quest");
                            return Promise.resolve(true);
                        }
                    }
                    else {
                        const canMaxOut = HaremGirl.getMaxOutButton(haremItem).length > 0;
                        if (nextGirlId < 0)
                            girlListProgress += lastGirlListProgress;
                        if (canMaxOut) {
                            HaremGirl.HaremDisplayGirlPopup(haremItem, getTextForUI("giveMaxingOut", "elementText") + ' ' + girl.name + ' : ' + girlListProgress, (remainingGirls + 1) * 5);
                            yield HaremGirl.maxOutButtonAndConfirm(haremItem, girl);
                        }
                        else {
                            LogUtils_logHHAuto("Max out button not clickable or not found");
                            HaremGirl.HaremDisplayGirlPopup(haremItem, girl.name + ' ' + getTextForUI("giveMaxedOut", "elementText") + ' : ' + girlListProgress, (remainingGirls + 1) * 5);
                        }
                    }
                    if (nextGirlId >= 0) {
                        LogUtils_logHHAuto('Go to next girl (' + nextGirlId + ') remaining ' + remainingGirls + ' girls');
                        gotoPage('/girl/' + nextGirlId, { resource: haremItem }, randomInterval(1500, 2500));
                        return Promise.resolve(true);
                    }
                    else {
                        LogUtils_logHHAuto("No more girls, go back to harem list");
                        setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "true");
                        gotoPage('/harem/' + girl.id_girl, {}, randomInterval(1500, 2500));
                        Harem.clearHaremToolVariables();
                    }
                }
                else {
                    setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "true");
                    Harem.clearHaremToolVariables();
                }
            }
            catch ({ errName, message }) {
                LogUtils_logHHAuto(`ERROR: Can't add menu girl: ${errName}, ${message}`);
                console.error(message);
                setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "true");
                Harem.clearHaremToolVariables();
            }
            finally {
                Promise.resolve(false);
            }
        });
    }
    static HaremDisplayGirlPopup(haremItem, haremText, remainingTime) {
        $(".girl-leveler-panel .girl-section").prepend('<div id="popup_message_harem" class="HHpopup_message" name="popup_message_harem" style="" ><a id="popup_message_harem_close" class="close">&times;</a>'
            + getTextForUI("give" + haremItem, "elementText") + ' : <br>' + haremText + ' (' + remainingTime + 'sec)</div>');
        setTimeout(() => {
            $("#popup_message_harem_close").one("click", function () {
                Harem.clearHaremToolVariables();
                location.reload();
            });
        }, 200);
    }
    static HaremClearGirlPopup(retry = false) {
        try {
            $("#popup_message_harem").remove();
            if ($("#popup_message_harem").length > 0 && !retry) {
                setTimeout(() => { HaremGirl.HaremClearGirlPopup(true); }, 1500);
            }
        }
        catch (error) {
            LogUtils_logHHAuto("Can't remove popup_message_harem");
        }
    }
}
HaremGirl.AFFECTION_TYPE = 'affection';
HaremGirl.EXPERIENCE_TYPE = 'experience';

;// CONCATENATED MODULE: ./src/Module/harem/index.ts


;// CONCATENATED MODULE: ./src/Module/HaremSalary.ts
var HaremSalary_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





class HaremSalary {
    static filterGirlMapReadyForCollect(a) {
        return a.readyForCollect;
    }
    static scrollToGirl(girlId) {
        try {
            // Scroll to girl
            $('[id_girl="' + girlId + '"]')[0].scrollIntoView();
        }
        catch (err) {
            // Girl must not be visible, scroll to girl list bottom
            HaremSalary.scrollToLastGirl();
        }
    }
    static scrollToLastGirl() {
        try {
            $('.girls_list')[0].scrollTop = $('.girls_list')[0].scrollHeight;
        }
        catch (err) { }
    }
    static CollectMoney() {
        return HaremSalary_awaiter(this, void 0, void 0, function* () {
            const debugEnabled = getStoredValue(HHStoredVarPrefixKey + "Temp_Debug") === 'true';
            var Clicked = [];
            const Hero = getHero();
            var endCollectTS = -1;
            let startCollectTS = -1;
            var maxSecsForSalary = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoSalaryMaxTimer")) || 1200;
            var collectedGirlzNb = 0;
            var collectedMoney = 0;
            let totalGirlsToCollect = 0; // TODO update when loading a new "page"
            let totalGirlsDisplayed = 0;
            let girlsToCollectBeforeWait = randomInterval(6, 12);
            let girlPageCollecting = 1;
            let lastGirlScrolledTo = -1;
            function ClickThem() {
                if (endCollectTS === -1) {
                    endCollectTS = new Date().getTime() + 1000 * maxSecsForSalary;
                    startCollectTS = new Date().getTime();
                }
                //logHHAuto('Need to click: '+ToClick.length);
                if (Clicked.length > 0) {
                    HaremSalary.scrollToGirl(Clicked[0]);
                    var params = {
                        class: "Girl",
                        id_girl: Clicked[0],
                        action: "get_salary"
                    };
                    unsafeWindow.hh_ajax(params, function (data) {
                        if (data.success) {
                            //console.log(Clicked[0]);
                            let girlsDataList = getHHVars("GirlSalaryManager.girlsMap");
                            if (girlsDataList !== null && girlsDataList[Clicked[0]] !== undefined) {
                                const _this2 = girlsDataList[Clicked[0]];
                                _this2.gData.pay_in = data.time + 60;
                                _this2._noDoubleClick = false;
                                _this2._resetSalaryDisplay();
                                //console.log(_this2);
                            }
                            Hero.update("soft_currency", data.money, true);
                            // unsafeWindow.Collect.check_state(); // Update money in button based on filtered girls
                            collectedMoney += data.money;
                            collectedGirlzNb++;
                        }
                        else {
                            LogUtils_logHHAuto(`Collect error on n°${Clicked[0]}`);
                        }
                        Clicked.shift();
                        if (new Date().getTime() < endCollectTS) {
                            let waitBetweenGirlsTime = randomInterval(300, 500);
                            girlsToCollectBeforeWait--;
                            if (girlsToCollectBeforeWait <= 0) {
                                waitBetweenGirlsTime = randomInterval(1200, 2000);
                                girlsToCollectBeforeWait = randomInterval(6, 12);
                            }
                            LogUtils_logHHAuto(`Next girl collection in ${waitBetweenGirlsTime}ms after n°${Clicked[0]}`);
                            setTimeout(ClickThem, waitBetweenGirlsTime);
                            if (window.top)
                                window.top.postMessage({ ImAlive: true }, '*');
                        }
                        else {
                            LogUtils_logHHAuto(`Salary collection reached to the max time of ${maxSecsForSalary} secs, collected ${collectedGirlzNb}/${totalGirlsToCollect} girls and ${collectedMoney} money`);
                            setTimeout(CollectData, randomInterval(300, 500));
                        }
                    }, function (err) {
                        Clicked.shift();
                        LogUtils_logHHAuto(`Bypassed n°${Clicked[0]}`);
                        setTimeout(ClickThem, randomInterval(300, 500));
                    });
                }
                else {
                    const collectionTime = Math.ceil((new Date().getTime() - startCollectTS) / 1000);
                    LogUtils_logHHAuto(`Salary collection done for page n°${girlPageCollecting} : collected ${collectedGirlzNb} / ${totalGirlsToCollect} girls and ${collectedMoney} money in ${collectionTime} secs`);
                    setTimeout(() => { CollectData(true); }, randomInterval(300, 500));
                    girlPageCollecting++;
                }
            }
            function CollectData(inStart = false) {
                let collectableGirlsList = [];
                const girlsList = Harem.getGirlMapSorted(getCurrentSorting(), false);
                const salarySumTag = HaremSalary.getSalarySumTag();
                if (girlsList === null) {
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDHarem"));
                }
                collectableGirlsList = girlsList.filter(HaremSalary.filterGirlMapReadyForCollect);
                const allOwnedGirlsLoaded = totalGirlsDisplayed > 0 && totalGirlsDisplayed === girlsList.length;
                totalGirlsDisplayed = girlsList.length;
                totalGirlsToCollect = collectableGirlsList.length;
                if (collectableGirlsList.length > 0) {
                    //console.log(JSON.stringify(collectableGirlsList));
                    for (let girl of collectableGirlsList) {
                        Clicked.push(girl.gId);
                    }
                    if (debugEnabled)
                        LogUtils_logHHAuto({ log: "Girls ready to collect: ", GirlsToCollect: Clicked });
                }
                if (Clicked.length > 0 && inStart) {
                    setTimeout(ClickThem, randomInterval(500, 1500));
                }
                else if (salarySumTag && inStart && !allOwnedGirlsLoaded) {
                    // Some money to collect, scrolling
                    const girlIdToLoad = Number($('.girls_list .harem-girl:not(.not_owned)').last().attr('girl'));
                    if (lastGirlScrolledTo != girlIdToLoad) {
                        lastGirlScrolledTo = girlIdToLoad;
                        LogUtils_logHHAuto(`Some salary need to be collected in next pages, scroll down to ${girlIdToLoad}`);
                        HaremSalary.scrollToGirl(girlIdToLoad + '');
                    }
                    else {
                        LogUtils_logHHAuto(`Some salary need to be collected in next pages, same girl as before, scroll down to bottom`);
                        HaremSalary.scrollToLastGirl();
                    }
                    setTimeout(() => { CollectData(inStart); }, randomInterval(1200, 1800));
                }
                else //nothing to collect or time spent already
                 {
                    let salaryTimer = HaremSalary.predictNextSalaryMinTime();
                    if (salaryTimer > 0) {
                        salaryTimer = randomInterval(salaryTimer, 180 + salaryTimer);
                        LogUtils_logHHAuto(`Setting salary timer to ${salaryTimer} secs.`);
                    }
                    else {
                        LogUtils_logHHAuto("Next salary set to 60 secs as remains girls to collect");
                        salaryTimer = randomInterval(50, 70);
                    }
                    setTimer('nextSalaryTime', salaryTimer);
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"), {}, randomInterval(300, 500));
                }
            }
            if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoSalaryResetFilters") === "true") {
                LogUtils_logHHAuto('Reseting girl filters');
                $('#reset-filters').trigger('click');
                yield TimeHelper.sleep(randomInterval(800, 1200)); // wait loading
            }
            CollectData(true);
        });
    }
    static getNextSalaryTimeFromHomePage() {
        const salaryTimer = $('.pay-in:visible', HaremSalary.getSalaryButton());
        if (salaryTimer.length > 0) {
            return convertTimeToInt(salaryTimer.text()) || -1;
        }
        return -1;
    }
    static setSalaryTimeFromHomePage() {
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDHome")) {
            const minSalaryForCollect = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoSalaryMinSalary")) || 20000;
            const salaryAmount = Number($('.sum', HaremSalary.getSalaryButton()).attr('amount'));
            if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoSalaryResetFilters") === "true"
                && salaryAmount > minSalaryForCollect) {
                LogUtils_logHHAuto(`Some salary to be collected ${salaryAmount}`);
                setTimer('nextSalaryTime', randomInterval(1, 10));
                return;
            }
            const nextSalaryTime = HaremSalary.getNextSalaryTimeFromHomePage();
            if (nextSalaryTime > 0)
                setTimer('nextSalaryTime', randomInterval(nextSalaryTime, 60 + nextSalaryTime));
        }
    }
    static predictNextSalaryMinTime() {
        let girlsDataList = getHHVars("GirlSalaryManager.girlsMap");
        if (girlsDataList === null) {
            girlsDataList = getHHVars("girlsDataList");
        }
        let nextCollect = 0;
        const minSalaryForCollect = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoSalaryMinSalary")) || 20000;
        let currentCollectSalary = 0;
        if (girlsDataList !== null && !Number.isNaN(minSalaryForCollect)) {
            let girlsSalary = Object.values(girlsDataList).sort(sortByPayIn);
            for (let i of girlsSalary) {
                let girl = i;
                if (i.gData) {
                    girl = i.gData;
                }
                if (girl.shards >= 100) {
                    currentCollectSalary += girl.salary;
                    nextCollect = girl.pay_in;
                    if (currentCollectSalary > minSalaryForCollect) {
                        break;
                    }
                }
            }
        }
        return nextCollect;
        function sortByPayIn(a, b) {
            let aPay = a.pay_in ? a.pay_in : a.gData.pay_in;
            let bPay = b.pay_in ? b.pay_in : b.gData.pay_in;
            return aPay - bPay;
        }
    }
    static getSalaryButton() {
        return $("#collect_all_container button[id='collect_all']");
    }
    static getSalarySumTag() {
        const salaryButton = HaremSalary.getSalaryButton();
        let salarySumTag = NaN;
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDHarem")) {
            salarySumTag = Number($('[rel="next_salary"]', salaryButton)[0].innerText.replace(/[^0-9]/gi, ''));
        }
        else if (getPage() === ConfigHelper.getHHScriptVars("pagesIDHome")) {
            salarySumTag = Number($('.sum', salaryButton).attr("amount"));
        }
        return salarySumTag;
    }
    static getSalary() {
        try {
            if (getPage() === ConfigHelper.getHHScriptVars("pagesIDHarem") || getPage() === ConfigHelper.getHHScriptVars("pagesIDHome")) {
                const salaryButton = HaremSalary.getSalaryButton();
                const salaryToCollect = !(salaryButton.prop('disabled') || salaryButton.attr("style") === "display: none;");
                const getButtonClass = salaryButton.attr("class") || '';
                const salarySumTag = HaremSalary.getSalarySumTag();
                const enoughSalaryToCollect = Number.isNaN(salarySumTag) ? true : salarySumTag > Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoSalaryMinSalary") || 20000);
                //console.log(salarySumTag, enoughSalaryToCollect);
                if (salaryToCollect && enoughSalaryToCollect) {
                    if (getButtonClass.indexOf("blue_button_L") !== -1) {
                        //replaceCheatClick();
                        salaryButton.trigger('click');
                        LogUtils_logHHAuto('Collected all Premium salary');
                        let nextSalaryTime = -1;
                        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDHarem")) {
                            nextSalaryTime = HaremSalary.predictNextSalaryMinTime();
                        }
                        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDHome")) {
                            nextSalaryTime = HaremSalary.getNextSalaryTimeFromHomePage();
                        }
                        if (nextSalaryTime > 0)
                            setTimer('nextSalaryTime', randomInterval(nextSalaryTime, 60 + nextSalaryTime));
                        return false;
                    }
                    else if (getButtonClass.indexOf("orange_button_L") !== -1) {
                        // Not at Harem screen then goto the Harem screen.
                        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDHarem")) {
                            LogUtils_logHHAuto("Detected Harem Screen. Fetching Salary");
                            //replaceCheatClick();
                            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                            LogUtils_logHHAuto("setting autoloop to false");
                            HaremSalary.CollectMoney();
                        }
                        else {
                            LogUtils_logHHAuto("Navigating to Harem window.");
                            gotoPage(ConfigHelper.getHHScriptVars("pagesIDHarem"));
                        }
                        return true;
                    }
                    else {
                        LogUtils_logHHAuto("Unknown salary button color : " + getButtonClass);
                        setTimer('nextSalaryTime', randomInterval(60, 70));
                    }
                }
                else if (!salaryToCollect) {
                    LogUtils_logHHAuto("No salary to collect");
                    const nextSalaryTime = HaremSalary.predictNextSalaryMinTime();
                    setTimer('nextSalaryTime', randomInterval(nextSalaryTime, 180 + nextSalaryTime));
                }
                else {
                    LogUtils_logHHAuto("Not enough salary to collect, wait 15min");
                    setTimer('nextSalaryTime', randomInterval(15 * 60, 17 * 60));
                }
            }
            else {
                // Not at Harem screen then goto the Harem screen nor home page.
                if (checkTimer('nextSalaryTime')) {
                    LogUtils_logHHAuto("Navigating to Harem page");
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDHarem"));
                    return true;
                }
            }
        }
        catch (ex) {
            LogUtils_logHHAuto("Catched error : Could not collect salary... " + ex);
            setTimer('nextSalaryTime', randomInterval(3600, 4200));
            // return not busy
            return false;
        }
        return false;
    }
}

;// CONCATENATED MODULE: ./src/Module/Labyrinth.ts



class LabyrinthOpponent {
}
class Labyrinth {
    static isEnabled() {
        return ConfigHelper.getHHScriptVars("isEnabledLabyrinth", false); // more than 14 girls
    }
    static isEnded() {
        return $('.cleared-labyrinth-container').length > 0;
    }
    static run() {
        const page = getPage();
        if (page === ConfigHelper.getHHScriptVars("pagesIDLabyrinth")) {
            /*
            if($('.labChosen').length<=0) {
                logHHAuto("Issue to find labyrinth next step button, retry in 60secs.");
                setTimer('nextLabyrinthTime', randomInterval(60, 70));
                return;
            }
            logHHAuto("On Labyrinth page.");
    
            setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            logHHAuto("setting autoloop to false");
            $('.labChosen').click();
            */
        }
        else if (page === ConfigHelper.getHHScriptVars("pagesIDLabyrinthPreBattle")) {
            LogUtils_logHHAuto("On labyrinth-pre-battle page.");
            let templeID = queryStringGetParam(window.location.search, 'id_opponent');
            LogUtils_logHHAuto("Go and fight labyrinth :" + templeID);
            let labyrinthBattleButton = $("#pre-battle .buttons-container .blue_button_L");
            if (labyrinthBattleButton.length > 0) {
                setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                LogUtils_logHHAuto("setting autoloop to false");
                labyrinthBattleButton[0].click();
            }
            else {
                LogUtils_logHHAuto("Issue to find labyrinth battle button retry in 60secs.");
                setTimer('nextLabyrinthTime', randomInterval(60, 70));
                //gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
            }
        }
        else {
            //gotoPage(ConfigHelper.getHHScriptVars("pagesIDLabyrinth"));
        }
    }
    static getCurrentFloorNumber() {
        const floorDom = $('#labyrinth-tabs .tab-switcher-fade-in .floor-number-text');
        let floor = 0;
        if (floorDom.length > 0) {
            floor = Number($('#labyrinth-tabs .tab-switcher-fade-in .floor-number-text').text());
            if (isNaN(floor) || floor === 0) {
                LogUtils_logHHAuto("Error getting floor");
                floor = 0;
            }
        }
        return floor;
    }
    static sim() {
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDLabyrinth")) {
            if ($('.labChosen').length > 0 || Labyrinth.isEnded()) {
                return;
            }
            LogUtils_logHHAuto("On Labyrinth page.");
            GM_addStyle('.labChosen {width: 25px; top: 55px; position: relative; left: 35px;}');
            const NB_ROW = 11;
            for (let rowIndex = 1; rowIndex <= NB_ROW; rowIndex++) {
                const row = $('#row_' + rowIndex + '.row-hex-container');
                const currentLevel = row.attr('key');
                const items = $('.hex-container:has(.hex-type:not(.completed-hex):not(.hero))', row);
                const options = [];
                if (items.length > 0) {
                    $.each(items, (hexIndex, hex) => {
                        const option = Labyrinth.parseHex(hexIndex, hex);
                        options.push(option);
                    });
                }
                LogUtils_logHHAuto("Row " + currentLevel + ". and options " + JSON.stringify(options));
                const choosenOption = Labyrinth.findBetter(options);
                if (choosenOption) {
                    Labyrinth.appendChoosenTag(choosenOption);
                    break;
                }
            }
        }
    }
    static findBetter(options) {
        let choosenOption = null;
        const debugEnabled = getStoredValue(HHStoredVarPrefixKey + "Temp_Debug") === 'true';
        const floor = Labyrinth.getCurrentFloorNumber();
        options.forEach((option) => {
            let isBetter = false;
            if (option.button && option.isNext) {
                if (choosenOption == null) {
                    if (debugEnabled)
                        LogUtils_logHHAuto('first');
                    isBetter = true;
                }
                else if (floor === 1 || floor === 2) {
                    // TODO not ready yet
                    if (!choosenOption.isOpponentEasy && option.isOpponentEasy) {
                        if (debugEnabled)
                            LogUtils_logHHAuto('Floor 1,2: Easy opponent');
                        isBetter = true;
                    }
                    else if (choosenOption.isOpponent && !choosenOption.isOpponentEasy && !option.isOpponent) {
                        if (debugEnabled)
                            LogUtils_logHHAuto('Floor 1,2: not opponent');
                        isBetter = true;
                    }
                    else if (choosenOption.power > option.power) {
                        if (debugEnabled)
                            LogUtils_logHHAuto('Floor 1,2: Powerless opponent');
                        isBetter = true;
                    }
                }
                else {
                    // Floor 3
                    if (!choosenOption.isShrine && option.isShrine) {
                        if (debugEnabled)
                            LogUtils_logHHAuto('Floor 3: isShrine');
                        isBetter = true;
                    }
                    else if (choosenOption.isOpponent && !option.isOpponent) {
                        if (debugEnabled)
                            LogUtils_logHHAuto('Floor 3: not opponent');
                        isBetter = true;
                    }
                    else if (choosenOption.power > option.power) {
                        if (debugEnabled)
                            LogUtils_logHHAuto('Floor 3: Powerless opponent');
                        isBetter = true;
                    }
                }
            }
            if (isBetter) {
                choosenOption = option;
            }
        });
        return choosenOption;
    }
    static confirmNoHeal() {
        const confirmButton = $('#confirmation_popup #popup_confirm:visible');
        if (confirmButton.length > 0) {
            LogUtils_logHHAuto("Confirm button");
            confirmButton.click();
        }
    }
    static selectReward() {
        // TODO choose reward
        $('#labyrinth_reward_popup #reward_holder .relic-container .relic-card-buttons .claim-relic-btn');
        // relic-container rare-relic
        // relic-container common-relic
        // relic-container common-relic large-card // Girl specific
        // relic-container legendary-relic
        // Close reward popup
        $('#labyrinth_reward_popup #reward_holder #close-relic-popup');
    }
    static isChoosen(option) {
        const choosen = `<img class="labChosen" src=${ConfigHelper.getHHScriptVars("powerCalcImages").chosen}>`;
        if (option.button && option.isNext) {
            if (option.isShrine || option.isTreasure) {
                option.button.append(choosen);
                return true;
            }
            // TODO opponent order
        }
        return false;
    }
    static appendChoosenTag(option) {
        option.button.append(`<img class="labChosen" src=${ConfigHelper.getHHScriptVars("powerCalcImages").chosen}>`);
    }
    static parseHex(hexIndex, hex) {
        // opponent_super_easy / opponent_easy / opponent_medium  / opponent_hard / opponent_boss  
        // shrine / treasure
        const type = $('.clickable-hex', hex).attr('hex_type') || ($('.hex-type', hex).attr('hex_type') || '').replace('hex-type', '').trim();
        const button = $('.clickable-hex', hex);
        return {
            button: button.length > 0 ? button.first() : null,
            type: type,
            isOpponent: type.indexOf('opponent_') >= 0,
            isOpponentEasy: type.indexOf('opponent_easy') >= 0,
            isTreasure: type.indexOf('treasure') >= 0,
            isShrine: type.indexOf('shrine') >= 0,
            isNext: type.indexOf('upcoming-hex') < 0,
            power: Number($('.opponent-power .opponent-power-text', hex).attr('data-power'))
        };
    }
}

;// CONCATENATED MODULE: ./src/Module/League.ts






class LeagueHelper {
    /* get time in sec */
    static getLeagueEndTime() {
        let league_end = -1;
        const league_end_in = $('#leagues .league_end_in .timer span[rel="expires"]').text();
        if (league_end_in !== undefined && league_end_in !== null && league_end_in.length > 0) {
            league_end = Number(convertTimeToInt(league_end_in));
        }
        return league_end;
    }
    static numberOfFightAvailable(opponent) {
        const forceOneFight = getStoredValue(HHStoredVarPrefixKey + "Setting_autoLeaguesForceOneFight") === 'true';
        if (forceOneFight)
            return 1;
        // remove match_history after w32 update
        const matchs = opponent.match_history ? opponent.match_history[opponent.player.id_fighter] : opponent.match_history_sorting[opponent.player.id_fighter];
        return matchs ? matchs.filter(match => match == null).length : 0;
    }
    static getLeagueCurrentLevel() {
        if (unsafeWindow.current_tier_number === undefined) {
            setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey + "Temp_autoLoopTimeMili")));
        }
        return unsafeWindow.current_tier_number;
    }
    static style() {
        GM_addStyle('#leagues .league_content .league_table .data-list .data-row .data-column[column="can_fight"] {'
            + 'min-width: 8.5rem;}');
        GM_addStyle('@media only screen and (min-width: 1026px) {'
            + '.matchRatingNew {'
            + 'display: flex;'
            + 'flex-wrap: nowrap;'
            + 'align-items: center;'
            + 'justify-content: center;'
            + 'text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000; '
            + 'line-height: 17px; '
            + 'max-width: 65px; '
            + 'font-size: 12px;}}');
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
            + 'font-size: 12px;}}');
        GM_addStyle('.plus {'
            + 'color: #66CD00;}');
        GM_addStyle('.minus {'
            + 'color: #FF2F2F;}');
        GM_addStyle('.close {'
            + 'color: #FFA500;}');
        GM_addStyle('.powerLevelScouter {'
            + 'width: 25px;}');
        GM_addStyle('#leagues .league_content .league_table .data-list .data-row .data-column[column="nickname"].clubmate .nickname { color: #00CC00 }');
    }
    static addChangeTeamButton() {
        $('.league_buttons_block').append(getGoToChangeTeamButton());
        GM_addStyle('#leagues .league_content .league_buttons {'
            + 'max-width: none;}');
        GM_addStyle('#leagues .league_content .league_buttons .league_buttons_block {'
            + 'width: auto;}');
    }
    static getSimPowerOpponent(heroFighter, opponents) {
        let leaguePlayers = BDSMHelper.getBdsmPlayersData(heroFighter, opponents.player, true);
        let simu = calculateBattleProbabilities(leaguePlayers.player, leaguePlayers.opponent);
        const oppoPoints = simu.points;
        let expectedValue = 0;
        for (let i = 25; i >= 3; i--) {
            if (oppoPoints[i]) {
                expectedValue += i * oppoPoints[i];
            }
        }
        simu.expectedValue = expectedValue;
        return simu;
    }
    static displayOppoSimuOnButton(id_fighter, simu, force = 0) {
        const opponentGoButton = $('a[href*="id_opponent=' + id_fighter + '"]');
        if ((opponentGoButton.length <= 0 || $('.powerLevelScouter', opponentGoButton).length > 0) && !force) {
            return;
        }
        // logHHAuto('powerLevelScouter not present adding it ' + id_fighter);
        const percentage = NumberHelper.nRounding(100 * simu.win, 2, -1);
        const points = NumberHelper.nRounding(simu.expectedValue, 1, -1);
        const pointText = `${percentage}% (${points})` +
            `<span style="margin:0;display:none;" id="HHPowerCalcScore">${percentage}</span>
        <span style="margin:0;display:none;" id="HHPowerCalcPoints">${points}</span>`;
        // const opponentRow = opponentGoButton.parent().parent();
        opponentGoButton.html(`<div class="matchRatingNew ${simu.scoreClass}"><img class="powerLevelScouter" src=${ConfigHelper.getHHScriptVars("powerCalcImages")[simu.scoreClass]}>${pointText}</div>`);
    }
    static getEnergy() {
        return Number(getHHVars('Hero.energies.challenge.amount'));
    }
    static getEnergyMax() {
        return Number(getHHVars('Hero.energies.challenge.max_regen_amount'));
    }
    static isEnabled() {
        return ConfigHelper.getHHScriptVars("isEnabledLeagues", false) && getHHVars('Hero.infos.level') >= ConfigHelper.getHHScriptVars("LEVEL_MIN_LEAGUE");
    }
    static isAutoLeagueActivated() {
        return getStoredValue(HHStoredVarPrefixKey + "Setting_autoLeagues") === "true" && LeagueHelper.isEnabled();
    }
    static getPinfo() {
        const threshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoLeaguesThreshold"));
        const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoLeaguesRunThreshold"));
        let Tegzd = '';
        const boostLimited = getStoredValue(HHStoredVarPrefixKey + "Setting_autoLeaguesBoostedOnly") === "true" && !Booster.haveBoosterEquiped();
        if (boostLimited) {
            Tegzd += '<li style="color:red!important;" title="' + getTextForUI("boostMissing", "elementText") + '">';
        }
        else {
            Tegzd += '<li>';
        }
        Tegzd += getTextForUI("autoLeaguesTitle", "elementText") + ' ' + LeagueHelper.getEnergy() + '/' + LeagueHelper.getEnergyMax();
        if (runThreshold > 0) {
            Tegzd += ' (' + threshold + '<' + LeagueHelper.getEnergy() + '<' + runThreshold + ')';
        }
        if (runThreshold > 0 && LeagueHelper.getEnergy() < runThreshold) {
            Tegzd += ' ' + getTextForUI("waitRunThreshold", "elementText");
        }
        else {
            Tegzd += ' : ' + getTimeLeft('nextLeaguesTime');
        }
        if (boostLimited) {
            Tegzd += ' ' + getTextForUI("boostMissing", "elementText") + '</li>';
        }
        else {
            Tegzd += '</li>';
        }
        return Tegzd;
    }
    static isTimeToFight() {
        const threshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoLeaguesThreshold"));
        const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoLeaguesRunThreshold"));
        const humanLikeRun = getStoredValue(HHStoredVarPrefixKey + "Temp_LeagueHumanLikeRun") === "true";
        const league_end = LeagueHelper.getLeagueEndTime();
        if (league_end > 0 && league_end <= (60 * 60)) {
            // Last league hour //TODO
            LogUtils_logHHAuto("Last League hour");
        }
        const energyAboveThreshold = humanLikeRun && LeagueHelper.getEnergy() > threshold || LeagueHelper.getEnergy() > Math.max(threshold, runThreshold - 1);
        const paranoiaSpending = LeagueHelper.getEnergy() > 0 && Number(checkParanoiaSpendings('challenge')) > 0;
        const needBoosterToFight = getStoredValue(HHStoredVarPrefixKey + "Setting_autoLeaguesBoostedOnly") === "true";
        const haveBoosterEquiped = Booster.haveBoosterEquiped();
        // logHHAuto('League:', {threshold: threshold, runThreshold:runThreshold, energyAboveThreshold: energyAboveThreshold});
        if (checkTimer('nextLeaguesTime') && energyAboveThreshold && needBoosterToFight && !haveBoosterEquiped) {
            LogUtils_logHHAuto('Time for league but no booster equipped');
        }
        return (checkTimer('nextLeaguesTime') && energyAboveThreshold && (needBoosterToFight && haveBoosterEquiped || !needBoosterToFight)) || paranoiaSpending;
    }
    static moduleSimLeague() {
        LeagueHelper.moduleSimLeagueHideBeatenOppo();
        if ($('.change_team_container').length <= 0) {
            LeagueHelper.addChangeTeamButton();
        }
        if ($("#popup_message_league").length > 0 || getStoredValue(HHStoredVarPrefixKey + "Setting_leagueListDisplayPowerCalc") !== "true") {
            return;
        }
        const opponentButtons = $('a.go_pre_battle.blue_button_L');
        const opponentSim = $("div.matchRatingNew img.powerLevelScouter");
        const allOpponentsSimDisplayed = (opponentSim.length >= opponentButtons.length);
        const Hero = getHero();
        const debugEnabled = getStoredValue(HHStoredVarPrefixKey + "Temp_Debug") === 'true';
        let SimPower = function () {
            if (allOpponentsSimDisplayed) {
                // logHHAuto("Stop simu");
                return;
            }
            const opponents_list = getHHVars("opponents_list");
            if (!opponents_list) {
                LogUtils_logHHAuto('ERROR: Can\'t find opponent list');
                return;
            }
            let heroFighter = opponents_list.find((el) => el.player.id_fighter == getHHVars('Hero.infos.id')).player;
            const containsSimuScore = function (opponents) { return $('a[href*="id_opponent=' + opponents.player.id_fighter + '"] .matchRatingNew').length > 0; };
            const containsOcdScore = function (opponents) { return $('.matchRating', $('a[href*="id_opponent=' + opponents.player.id_fighter + '"]').parent()).length > 0; };
            let opponentsPowerList = LeagueHelper._getTempLeagueOpponentList();
            let opponentsPowerListChanged = false;
            for (let opponentIndex = 0; opponentIndex < opponents_list.length; opponentIndex++) {
                let opponents = opponents_list[opponentIndex];
                if (LeagueHelper.numberOfFightAvailable(opponents) > 0 && !containsSimuScore(opponents) && !containsOcdScore(opponents)) {
                    let simu;
                    let leagueOpponent;
                    if (opponentsPowerList && opponentsPowerList.opponentsList.length > 0) {
                        try {
                            leagueOpponent = opponentsPowerList.opponentsList.find((el) => el.opponent_id == opponents.player.id_fighter);
                            if (leagueOpponent)
                                simu = leagueOpponent.simu;
                        }
                        catch (error) {
                            LogUtils_logHHAuto("Error when getting oppo " + opponents.player.id_fighter + "from storage");
                            if (debugEnabled)
                                LogUtils_logHHAuto(error);
                        }
                    }
                    if (!simu) {
                        simu = LeagueHelper.getSimPowerOpponent(heroFighter, opponents);
                        leagueOpponent = new LeagueOpponent(opponents.player.id_fighter, 
                        // opponents.place,
                        opponents.nickname, 
                        // opponents.level,
                        opponents.power, 
                        // opponents.player_league_points,
                        Number(NumberHelper.nRounding(simu.expectedValue, 1, -1)), 
                        // 0, // Boster numbers?
                        // opponents,
                        simu);
                        opponentsPowerList.opponentsList.push(leagueOpponent);
                        opponentsPowerListChanged = true;
                    }
                    LeagueHelper.displayOppoSimuOnButton(opponents.player.id_fighter, simu);
                }
            }
            if (opponentsPowerListChanged) {
                LogUtils_logHHAuto('Save opponent list for later');
                setStoredValue(HHStoredVarPrefixKey + "Temp_LeagueOpponentList", JSON.stringify(opponentsPowerList));
            }
            //CSS
        };
        SimPower();
        let listUpdateStatus = '<div style="position: absolute;left: 720px;top: 0px;width:100px;" class="tooltipHH" id="HHListUpdate"></div>';
        if (document.getElementById("HHListUpdate") === null) {
            $(".leagues_middle_header_script").append(listUpdateStatus);
        }
        if (allOpponentsSimDisplayed || opponentSim.length <= 1) {
            let buttonLaunchList = '<span class="tooltipHHtext">' + getTextForUI("RefreshOppoList", "tooltip") + '</span><label style="width:100%;" class="myButton" id="RefreshOppoList">' + getTextForUI("RefreshOppoList", "elementText") + '</label>';
            if (document.getElementById("RefreshOppoList") === null) {
                $("#HHListUpdate").html('').append(buttonLaunchList);
                $("#RefreshOppoList").on("click", function () {
                    $("#RefreshOppoList").remove();
                    $('a[href*="id_opponent"]').each(function () {
                        $(this).html('Go'); // TODO translate
                    });
                });
            }
        }
        else {
            $("#HHListUpdate").html('Building:' + opponentSim.length + "/" + opponentButtons.length);
        }
        let buttonSortList = '<div style="position: absolute;left: 780px;top: 14px;width:75px;" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("sortPowerCalc", "tooltip") + '</span><label style="width:100%;" class="myButton" id="sortPowerCalc">' + getTextForUI("sortPowerCalc", "elementText") + '</label></div>';
        const league_table = $('.league_content .data-list');
        if (document.getElementById("sortPowerCalc") === null && $('.matchRatingNew', league_table).length > 0) {
            $('.leagues_middle_header_script').append(buttonSortList);
            $("#sortPowerCalc").on("click", function () {
                let items = $('.data-row.body-row:visible', league_table).map((i, el) => el).toArray();
                items.sort(function (a, b) {
                    //console.log($('#HHPowerCalcScore',$(a)));
                    const score_a = $('#HHPowerCalcScore', $(a)).length === 0 ? 0 : Number($('#HHPowerCalcScore', $(a))[0].innerText);
                    const score_b = $('#HHPowerCalcScore', $(b)).length === 0 ? 0 : Number($('#HHPowerCalcScore', $(b))[0].innerText);
                    const points_a = $('#HHPowerCalcPoints', $(a)).length === 0 ? 0 : Number($('#HHPowerCalcPoints', $(a))[0].innerText);
                    const points_b = $('#HHPowerCalcPoints', $(b)).length === 0 ? 0 : Number($('#HHPowerCalcPoints', $(b))[0].innerText);
                    //console.log(score_a,score_b,points_a,points_b);
                    if (score_b === score_a) {
                        return points_b - points_a;
                    }
                    else {
                        return score_b - score_a;
                    }
                });
                for (let item in items) {
                    $(items[item]).detach();
                    league_table.append(items[item]);
                }
                $('.league_content .league_table').animate({ scrollTop: 0 });
            });
        }
    }
    static moduleSimLeagueHideBeatenOppo() {
        const beatenOpponents = '<div style="position: absolute;left: 190px;top: 14px;width:100px;"  class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("HideBeatenOppo", "tooltip") + '</span><label style="width:100%;" class="myButton" id="HideBeatenOppo">' + getTextForUI("HideBeatenOppo", "elementText") + '</label></div>';
        if ((document.getElementById("beaten_opponents") === null && document.getElementById("league_filter") === null) // button from HH OCD script
            && document.getElementById("HideBeatenOppo") === null) {
            if ($(".leagues_middle_header_script").length == 0) {
                $('#leagues-tabs').append('<div class="leagues_middle_header_script"></div>');
                GM_addStyle('.leagues_middle_header_script {'
                    + 'display: flow-root;'
                    + 'margin-top: 4px;}');
            }
            function removeBeatenOpponents() {
                var board = document.getElementsByClassName("data-list")[0];
                if (!board)
                    return;
                var opponents = board.getElementsByClassName("data-row body-row");
                for (var i = 0; i < opponents.length; i++) {
                    try {
                        if (!opponents[i].className.includes("player-row")) {
                            let hide = true;
                            let results = $(opponents[i]).find('div[column = "match_history"], div[column = "match_history_sorting"]')[0].children; // remove match_history after w32 update
                            for (let j = 0; j < results.length; j++) {
                                if (results[j].className == "result ")
                                    hide = false;
                            }
                            if (hide)
                                opponents[i].style.display = "none";
                        }
                    }
                    catch (e) { }
                }
                $('#leagues .league_content .league_table').getNiceScroll().resize();
            }
            function displayBeatenOpponents() {
                var board = document.getElementsByClassName("data-list")[0];
                if (!board)
                    return;
                var opponents = board.getElementsByClassName("data-row body-row");
                for (var i = 0; i < opponents.length; i++) {
                    try {
                        if (!opponents[i].className.includes("player-row")) {
                            let hide = true;
                            let results = $(opponents[i]).find('div[column = "match_history"], div[column = "match_history_sorting"]')[0].children; // remove match_history after w32 update
                            for (let j = 0; j < results.length; j++) {
                                if (results[j].className == "result ")
                                    hide = false;
                            }
                            if (hide)
                                opponents[i].style.display = "";
                        }
                    }
                    catch (e) { }
                }
                $('#leagues .league_content .league_table').getNiceScroll().resize();
            }
            $(".leagues_middle_header_script").append(beatenOpponents);
            let hideBeatenOppo = getStoredValue(HHStoredVarPrefixKey + "Temp_hideBeatenOppo");
            if (!hideBeatenOppo) {
                hideBeatenOppo = 0;
                setStoredValue(HHStoredVarPrefixKey + "Temp_hideBeatenOppo", hideBeatenOppo);
            }
            if (hideBeatenOppo == 1) {
                removeBeatenOpponents();
                $('#HideBeatenOppo').html(getTextForUI("display", "elementText"));
            }
            else {
                $('#HideBeatenOppo').html(getTextForUI("HideBeatenOppo", "elementText"));
            }
            $("#HideBeatenOppo").on('click', function () {
                if (hideBeatenOppo == 0) {
                    removeBeatenOpponents();
                    hideBeatenOppo = 1;
                    setStoredValue(HHStoredVarPrefixKey + "Temp_hideBeatenOppo", hideBeatenOppo);
                    $('#HideBeatenOppo').html(getTextForUI("display", "elementText"));
                }
                else {
                    displayBeatenOpponents();
                    hideBeatenOppo = 0;
                    setStoredValue(HHStoredVarPrefixKey + "Temp_hideBeatenOppo", hideBeatenOppo);
                    $('#HideBeatenOppo').html(getTextForUI("HideBeatenOppo", "elementText"));
                }
            });
            let sort_by = document.querySelectorAll('.data-column.head-column');
            for (var sort of sort_by) {
                sort.addEventListener('click', function () {
                    if (hideBeatenOppo == 1)
                        removeBeatenOpponents();
                });
            }
        }
    }
    static _getTempLeagueOpponentList() {
        const maxLeagueListDurationSecs = ConfigHelper.getHHScriptVars("LeagueListExpirationSecs");
        let opponentsPowerList = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_LeagueOpponentList")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_LeagueOpponentList")) : { expirationDate: 0, opponentsList: [] };
        if (Object.keys(opponentsPowerList.opponentsList).length === 0 || opponentsPowerList.expirationDate < new Date()) {
            deleteStoredValue(HHStoredVarPrefixKey + "Temp_LeagueOpponentList");
            opponentsPowerList.expirationDate = new Date().getTime() + maxLeagueListDurationSecs * 1000;
        }
        else {
            LogUtils_logHHAuto('Found valid opponent list in storage, reuse it');
        }
        return opponentsPowerList;
    }
    static getLeagueOpponentListData(isFirstCall = true) {
        let Data = [];
        let opponent_id;
        let fightButton;
        let opponentsPowerList;
        const sortMode = getStoredValue(HHStoredVarPrefixKey + "Setting_autoLeaguesSortIndex");
        let usePowerCalc = sortMode === LeagueHelper.SORT_POWERCALC;
        const debugEnabled = getStoredValue(HHStoredVarPrefixKey + "Temp_Debug") === 'true';
        const hasHHBdsmChangeBefore = $('.data-column[column="power"] .matchRating').length > 0;
        if (hasHHBdsmChangeBefore)
            LogUtils_logHHAuto('HH++ BDSM detected');
        const tableRow = $(".data-list .data-row.body-row");
        var getPowerOrPoints = function (hasHHBdsmChangeBefore, oppoRow) {
            if (hasHHBdsmChangeBefore) {
                // HH++ BDSM script exist
                // As power information is removed and replaced by simulation score, we need to use the score
                return Number($('.data-column[column="power"] .matchRating-expected .matchRating-value', oppoRow).text().replace(',', '.'));
            }
            else {
                return parsePrice($('.data-column[column="power"]', oppoRow).text());
            }
        };
        LogUtils_logHHAuto('Number of player in league:' + tableRow.length + '. Number of opponent not fought in league:' + $('.data-list .data-row.body-row a').length);
        const opponents_list = getHHVars("opponents_list");
        let heroFighter;
        if (usePowerCalc) {
            opponentsPowerList = LeagueHelper._getTempLeagueOpponentList();
            try {
                heroFighter = opponents_list === null || opponents_list === void 0 ? void 0 : opponents_list.find((el) => el.player.id_fighter == getHHVars('Hero.infos.id')).player;
            }
            catch (error) {
                LogUtils_logHHAuto('Error, falback to not use powercalc');
                if (debugEnabled)
                    LogUtils_logHHAuto(error);
                usePowerCalc = false;
            }
        }
        let canUseSimu = usePowerCalc && !!opponents_list && !!heroFighter;
        tableRow.each(function () {
            fightButton = $('a', $(this));
            if (fightButton.length > 0) {
                opponent_id = queryStringGetParam(new URL(fightButton.attr("href"), window.location.origin).search, 'id_opponent');
                let leagueOpponent;
                if (opponentsPowerList && opponentsPowerList.opponentsList.length > 0) {
                    try {
                        leagueOpponent = opponentsPowerList.opponentsList.find((el) => el.opponent_id == opponent_id);
                    }
                    catch (error) {
                        LogUtils_logHHAuto("Error when getting oppo " + opponent_id + " from storage");
                    }
                }
                if (!leagueOpponent) {
                    let expectedPoints = 0;
                    let opponents;
                    let simu = {};
                    if (canUseSimu) {
                        try {
                            opponents = opponents_list.find((el) => el.player.id_fighter == opponent_id);
                            simu = LeagueHelper.getSimPowerOpponent(heroFighter, opponents);
                            expectedPoints = Number(NumberHelper.nRounding(simu.expectedValue, 1, -1));
                        }
                        catch (error) {
                            LogUtils_logHHAuto("Error in simu for oppo " + opponent_id + ", falback to not use powercalc");
                            canUseSimu = false;
                        }
                    }
                    leagueOpponent = new LeagueOpponent(opponent_id, 
                    // Number($('.data-column[column="place"]', $(this)).text()),
                    $('.nickname', $(this)).text(), 
                    // Number($('.data-column[column="level"]', $(this)).text()),
                    getPowerOrPoints(hasHHBdsmChangeBefore, $(this)), 
                    // Number($('.data-column[column="player_league_points"]', $(this)).text().replace(/\D/g, '')),
                    expectedPoints, 
                    // $('.boosters', $(this)).children().length,
                    // opponents,
                    simu);
                }
                Data.push(leagueOpponent);
            }
        });
        const hasHHBdsmChangeAfter = $('.data-column[column="power"] .matchRating').length > 0;
        if (!hasHHBdsmChangeBefore && hasHHBdsmChangeAfter) {
            LogUtils_logHHAuto('HH++ BDSM edit table during computation');
            if (isFirstCall) {
                LogUtils_logHHAuto('Try again');
                return LeagueHelper.getLeagueOpponentListData(false);
            }
            else {
                LogUtils_logHHAuto('Already called twice, stop');
                return [];
            }
        }
        if (canUseSimu) { // sortMode === LeagueHelper.SORT_POWERCALC
            Data.sort((a, b) => (b.simuPoints > a.simuPoints) ? 1 : ((a.simuPoints > b.simuPoints) ? -1 : 0)); // sort by higher score
        }
        else if (sortMode === LeagueHelper.SORT_POWER && !hasHHBdsmChangeBefore) {
            Data.sort((a, b) => (a.power > b.power) ? 1 : ((b.power > a.power) ? -1 : 0)); // sort by lower power
        } // sortMode === LeagueHelper.SORT_DISPLAYED // No sorting, keep html order
        // if(hasHHBdsmChangeBefore) {
        //     // HH++ BDSM script exist
        //     Data.sort((a,b) => (b.power > a.power) ? 1 : ((a.power > b.power) ? -1 : 0)); // sort by higher score
        // }else {
        //     Data.sort((a,b) => (a.power > b.power) ? 1 : ((b.power > a.power) ? -1 : 0)); // sort by lower power
        // }
        //}
        if (usePowerCalc) {
            LogUtils_logHHAuto('Save opponent list for later');
            setStoredValue(HHStoredVarPrefixKey + "Temp_LeagueOpponentList", JSON.stringify({ expirationDate: opponentsPowerList.expirationDate, opponentsList: Data }));
        }
        return Data;
    }
    static doLeagueBattle() {
        //logHHAuto("Performing auto leagues.");
        // Confirm if on correct screen.
        const currentPower = LeagueHelper.getEnergy();
        const maxLeagueRegen = LeagueHelper.getEnergyMax();
        const leagueThreshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoLeaguesThreshold"));
        const debugEnabled = getStoredValue(HHStoredVarPrefixKey + "Temp_Debug") === 'true';
        let leagueScoreSecurityThreshold = getStoredValue(HHStoredVarPrefixKey + "Setting_autoLeaguesSecurityThreshold");
        if (leagueScoreSecurityThreshold) {
            leagueScoreSecurityThreshold = Number(leagueScoreSecurityThreshold);
        }
        else {
            leagueScoreSecurityThreshold = 40;
        }
        var page = getPage();
        const Hero = getHero();
        if (page === ConfigHelper.getHHScriptVars("pagesIDLeagueBattle")) {
            // On the battle screen.
            // CrushThemFights(); // TODO ??? // now managed by doBattle
        }
        else if (page === ConfigHelper.getHHScriptVars("pagesIDLeaderboard")) {
            LogUtils_logHHAuto("On leaderboard page.");
            if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoLeaguesCollect") === "true") {
                if ($('#leagues .forced_info button[rel="claim"]').length > 0) {
                    $('#leagues .forced_info button[rel="claim"]').click(); //click reward
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDLeaderboard"));
                }
            }
            LogUtils_logHHAuto('parsing enemies');
            var Data = LeagueHelper.getLeagueOpponentListData();
            const league_end = LeagueHelper.getLeagueEndTime();
            if (currentPower < 1 && Data.length > 0) {
                LogUtils_logHHAuto("No power for leagues.");
                //prevent paranoia to wait for league
                setStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaLeagueBlocked", "true");
                const next_refresh = getHHVars('Hero.energies.challenge.next_refresh_ts');
                setTimer('nextLeaguesTime', randomInterval(next_refresh + 10, next_refresh + 3 * 60));
                return;
            }
            if (Data.length == 0) {
                LogUtils_logHHAuto('No valid targets!');
                //prevent paranoia to wait for league
                setStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaLeagueBlocked", "true");
                if ($('#leagues .forced_info').length > 0) {
                    setTimer('nextLeaguesTime', randomInterval(30 * 60, 35 * 60));
                }
                else {
                    LogUtils_logHHAuto('Set timer to league ends.');
                    setTimer('nextLeaguesTime', randomInterval(league_end - 5 * 60, league_end));
                }
            }
            else {
                var getPlayerCurrentLevel = LeagueHelper.getLeagueCurrentLevel();
                if (isNaN(getPlayerCurrentLevel)) {
                    LogUtils_logHHAuto("Could not get current Rank, stopping League.");
                    //prevent paranoia to wait for league
                    setStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaLeagueBlocked", "true");
                    setTimer('nextLeaguesTime', randomInterval(30 * 60, 35 * 60));
                    return;
                }
                var currentRank = Number($('.data-list .data-row.body-row.player-row .data-column[column="place"]').text());
                var currentScore = Number($('.data-list .data-row.body-row.player-row .data-column[column="player_league_points"]').text().replace(/\D/g, ''));
                let leagueTargetValue = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoLeaguesSelectedIndex")) + 1;
                if (leagueTargetValue < Number(getPlayerCurrentLevel)) {
                    var totalOpponents = Number($('.data-list .data-row.body-row').length) + 1;
                    var maxDemote = 0;
                    if (screen.width < 1026) {
                        totalOpponents = totalOpponents + 1;
                    }
                    var rankDemote = totalOpponents - 14;
                    if (currentRank > (totalOpponents - 15)) {
                        rankDemote = totalOpponents - 15;
                    }
                    LogUtils_logHHAuto("Current league above target (" + Number(getPlayerCurrentLevel) + "/" + leagueTargetValue + "), needs to demote. max rank : " + rankDemote + "/" + totalOpponents);
                    let getRankDemote = $(".data-list .data-row.body-row .data-column[column='place']:contains(" + rankDemote + ")").filter(function () {
                        return Number($(this).text().trim()) === rankDemote;
                    });
                    if (getRankDemote.length > 0) {
                        maxDemote = Number($(".data-column[column='player_league_points']", getRankDemote.parent()).text().replace(/\D/g, ''));
                    }
                    else {
                        maxDemote = 0;
                    }
                    LogUtils_logHHAuto("Current league above target (" + Number(getPlayerCurrentLevel) + "/" + leagueTargetValue + "), needs to demote. Score should not be higher than : " + maxDemote);
                    if (currentScore + leagueScoreSecurityThreshold >= maxDemote) {
                        if (league_end <= (60 * 60)) {
                            LogUtils_logHHAuto("Can't do league as could go above demote, as last hour setting timer to 5 mins");
                            setTimer('nextLeaguesTime', randomInterval(5 * 60, 8 * 60));
                        }
                        else {
                            LogUtils_logHHAuto("Can't do league as could go above demote, setting timer to 30 mins");
                            setTimer('nextLeaguesTime', randomInterval(30 * 60, 35 * 60));
                        }
                        //prevent paranoia to wait for league
                        setStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaLeagueBlocked", "true");
                        gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                        return;
                    }
                }
                const leagues = ConfigHelper.getHHScriptVars("leaguesList");
                var maxStay = -1;
                var maxLeague = $("div.tier_icons img").length;
                if (maxLeague === undefined) {
                    maxLeague = leagues.length;
                }
                if (leagueTargetValue === Number(getPlayerCurrentLevel) && leagueTargetValue < maxLeague) {
                    var rankStay = 16;
                    if (currentRank > 15) {
                        rankStay = 15;
                    }
                    LogUtils_logHHAuto("Current league is target (" + Number(getPlayerCurrentLevel) + "/" + leagueTargetValue + "), needs to stay. max rank : " + rankStay);
                    let getRankStay = $(".data-list .data-row.body-row .data-column[column='place']:contains(" + rankStay + ")").filter(function () {
                        return Number($(this).text().trim()) === rankStay;
                    });
                    if (getRankStay.length > 0) {
                        maxStay = Number($(".data-column[column='player_league_points']", getRankStay.parent()).text().replace(/\D/g, ''));
                    }
                    else {
                        maxStay = 0;
                    }
                    LogUtils_logHHAuto("Current league is target (" + Number(getPlayerCurrentLevel) + "/" + leagueTargetValue + "), needs to stay. Score should not be higher than : " + maxStay);
                    if (currentScore + leagueScoreSecurityThreshold >= maxStay && getStoredValue(HHStoredVarPrefixKey + "Setting_autoLeaguesAllowWinCurrent") !== "true") {
                        LogUtils_logHHAuto("Can't do league as could go above stay, setting timer to 30 mins");
                        setTimer('nextLeaguesTime', randomInterval(30 * 60, 35 * 60));
                        //prevent paranoia to wait for league
                        setStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaLeagueBlocked", "true");
                        gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                        return;
                    }
                }
                LogUtils_logHHAuto(Data.length + ' valid targets!');
                setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                LogUtils_logHHAuto("setting autoloop to false");
                LogUtils_logHHAuto("Hit?");
                const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoLeaguesRunThreshold"));
                if (runThreshold > 0) {
                    setStoredValue(HHStoredVarPrefixKey + "Temp_LeagueHumanLikeRun", "true");
                }
                const nextOpponent = Data[0];
                LogUtils_logHHAuto("Going to fight " + nextOpponent.nickname + "(" + nextOpponent.opponent_id + ") with power " + nextOpponent.power);
                if (debugEnabled)
                    LogUtils_logHHAuto(JSON.stringify(nextOpponent));
                // change referer
                window.history.replaceState(null, '', addNutakuSession(ConfigHelper.getHHScriptVars("pagesURLLeaguPreBattle") + '?id_opponent=' + nextOpponent.opponent_id));
                const opponents_list = getHHVars("opponents_list");
                const opponentDataFromList = opponents_list.filter(obj => {
                    return obj.player.id_fighter == nextOpponent.opponent_id;
                });
                if (debugEnabled)
                    LogUtils_logHHAuto("opponentDataFromList ", JSON.stringify(opponentDataFromList));
                let numberOfFightAvailable = 0;
                if (opponentDataFromList && opponentDataFromList.length > 0)
                    numberOfFightAvailable = LeagueHelper.numberOfFightAvailable(opponentDataFromList[0]);
                else
                    LogUtils_logHHAuto('ERROR opponent ' + nextOpponent.opponent_id + ' not found in JS list');
                let numberOfBattle = 1;
                if (numberOfFightAvailable > 1 && currentPower >= (numberOfFightAvailable + leagueThreshold)) {
                    if (maxStay > 0 && currentScore + (numberOfFightAvailable * leagueScoreSecurityThreshold) >= maxStay)
                        LogUtils_logHHAuto('Can\'t do ' + numberOfFightAvailable + ' fights in league as could go above stay');
                    else
                        numberOfBattle = numberOfFightAvailable;
                }
                LogUtils_logHHAuto("Going to fight " + numberOfBattle + " times (Number fights available from opponent:" + numberOfFightAvailable + ")");
                if (numberOfBattle <= 1) {
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDLeagueBattle"), { number_of_battles: 1, id_opponent: nextOpponent.opponent_id });
                }
                else {
                    var params1 = {
                        action: "do_battles_leagues",
                        id_opponent: nextOpponent.opponent_id,
                        number_of_battles: numberOfBattle
                    };
                    params1 = addNutakuSession(params1);
                    unsafeWindow.hh_ajax(params1, function (data) {
                        // change referer
                        window.history.replaceState(null, '', addNutakuSession(ConfigHelper.getHHScriptVars("pagesURLLeaderboard")));
                        RewardHelper.closeRewardPopupIfAny();
                        // gotoPage(ConfigHelper.getHHScriptVars("pagesIDLeaderboard"));
                        location.reload();
                        Hero.updates(data.hero_changes);
                    });
                }
            }
        }
        else {
            // Switch to the correct screen
            LogUtils_logHHAuto("Switching to leagues screen.");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDLeaderboard"));
            return;
        }
    }
    static LeagueDisplayGetOpponentPopup(numberDone, remainingTime) {
        $("#leagues #leagues_middle").prepend('<div id="popup_message_league" class="HHpopup_message" name="popup_message_league" ><a id="popup_message_league_close" class="close">&times;</a>' + getTextForUI("OpponentListBuilding", "elementText") + ' : <br>' + numberDone + ' ' + getTextForUI("OpponentParsed", "elementText") + ' (' + remainingTime + ')</div>');
        $("#popup_message_league_close").on("click", () => { location.reload(); });
    }
    static LeagueClearDisplayGetOpponentPopup() {
        $("#popup_message_league").each(function () { this.remove(); });
    }
    static LeagueUpdateGetOpponentPopup(numberDone, remainingTime) {
        LeagueHelper.LeagueClearDisplayGetOpponentPopup();
        LeagueHelper.LeagueDisplayGetOpponentPopup(numberDone, remainingTime);
    }
}
LeagueHelper.SORT_DISPLAYED = '0';
LeagueHelper.SORT_POWER = '1';
LeagueHelper.SORT_POWERCALC = '2';

;// CONCATENATED MODULE: ./src/Service/PageNavigationService.ts




// Returns true if on correct page.
function gotoPage(page, inArgs = {}, delay = -1) {
    var cp = getPage();
    LogUtils_logHHAuto('going ' + cp + '->' + page);
    if (typeof delay != 'number' || delay === -1) {
        delay = randomInterval(300, 500);
    }
    var togoto = undefined;
    // get page path
    switch (page) {
        case ConfigHelper.getHHScriptVars("pagesIDHome"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLHome");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDActivities"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLActivities");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDMissions"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLActivities");
            togoto = url_add_param(togoto, "tab", ConfigHelper.getHHScriptVars("pagesIDMissions"));
            break;
        case ConfigHelper.getHHScriptVars("pagesIDPowerplacemain"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLActivities");
            togoto = url_add_param(togoto, "tab", "pop");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDContests"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLActivities");
            togoto = url_add_param(togoto, "tab", ConfigHelper.getHHScriptVars("pagesIDContests"));
            break;
        case ConfigHelper.getHHScriptVars("pagesIDDailyGoals"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLActivities");
            togoto = url_add_param(togoto, "tab", ConfigHelper.getHHScriptVars("pagesIDDailyGoals"));
            break;
        case ConfigHelper.getHHScriptVars("pagesIDHarem"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLHarem");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDMap"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLMap");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDPachinko"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLPachinko");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDLeaderboard"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLLeaderboard");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDShop"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLShop");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDQuest"):
            togoto = QuestHelper.getNextQuestLink();
            if (togoto === undefined) {
                LogUtils_logHHAuto("All quests finished, setting timer to check back later!");
                setTimer('nextMainQuestAttempt', 604800); // 1 week delay
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                return false;
            }
            LogUtils_logHHAuto("Current quest page: " + togoto);
            break;
        case ConfigHelper.getHHScriptVars("pagesIDPantheon"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLPantheon");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDPantheonPreBattle"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLPantheonPreBattle");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDLabyrinth"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLLabyrinth");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDChampionsMap"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLChampionsMap");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDSeason"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLSeason");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDSeasonArena"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLSeasonArena");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDClubChampion"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLClubChampion");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDLeagueBattle"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLLeagueBattle");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDTrollPreBattle"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLTrollPreBattle");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDEvent"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLEvent");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDClub"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLClub");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDPoV"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLPoV");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDPoG"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLPoG");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDSeasonalEvent"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLSeasonalEvent");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDEditTeam"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLEditTeam");
            break;
        case ConfigHelper.getHHScriptVars("pagesIDWaifu"):
            togoto = ConfigHelper.getHHScriptVars("pagesURLWaifu");
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
            LogUtils_logHHAuto("Unknown goto page request. No page \'" + page + "\' defined.");
    }
    if (togoto != undefined) {
        setLastPageCalled(togoto);
        if (typeof inArgs === 'object' && Object.keys(inArgs).length > 0) {
            for (let arg of Object.keys(inArgs)) {
                togoto = url_add_param(togoto, arg, inArgs[arg]);
            }
        }
        togoto = addNutakuSession(togoto);
        setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
        LogUtils_logHHAuto("setting autoloop to false");
        LogUtils_logHHAuto('GotoPage : ' + togoto + ' in ' + delay + 'ms.');
        setTimeout(function () { window.location.href = window.location.origin + togoto; }, delay);
    }
    else {
        LogUtils_logHHAuto("Couldn't find page path. Page was undefined...");
        setTimeout(function () { location.reload(); }, delay);
    }
}
function addNutakuSession(togoto) {
    if (unsafeWindow.hh_nutaku) {
        const hhSession = queryStringGetParam(window.location.search, 'sess');
        if (hhSession) {
            if (typeof togoto === 'string') {
                togoto = url_add_param(togoto, 'sess', hhSession);
            }
            else if (typeof togoto === 'object' || Array.isArray(togoto)) {
                togoto['sess'] = hhSession;
            }
        }
        else {
            LogUtils_logHHAuto('ERROR Nutaku detected and no session found');
        }
    }
    return togoto;
}
function setLastPageCalled(inPage) {
    //console.log("testingHome : setting to : "+JSON.stringify({page:inPage, dateTime:new Date().getTime()}));
    setStoredValue(HHStoredVarPrefixKey + "Temp_LastPageCalled", JSON.stringify({ page: inPage, dateTime: new Date().getTime() }));
}

;// CONCATENATED MODULE: ./src/Module/Market.ts




class Market {
    static doShopping() {
        try {
            //logHHAuto("Go shopping");
            const Hero = getHero();
            var MS = 'carac' + getHHVars('Hero.infos.class');
            var SS1 = 'carac' + (getHHVars('Hero.infos.class') % 3 + 1);
            var SS2 = 'carac' + ((getHHVars('Hero.infos.class') + 1) % 3 + 1);
            var money = getHHVars('Hero.currencies.soft_currency');
            var kobans = getHHVars('Hero.currencies.hard_currency');
            if (getStoredValue(HHStoredVarPrefixKey + "Temp_storeContents") === undefined) {
                if (!isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_storeContents"))) {
                    LogUtils_logHHAuto("Catched error : Could not parse store content.");
                }
                setStoredValue(HHStoredVarPrefixKey + "Temp_charLevel", 0);
                return;
            }
            if (getStoredValue(HHStoredVarPrefixKey + "Temp_haveAff") === undefined || getStoredValue(HHStoredVarPrefixKey + "Temp_haveExp") === undefined) {
                setStoredValue(HHStoredVarPrefixKey + "Temp_charLevel", 0);
                return;
            }
            var shop = JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_storeContents"));
            var Exp = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoExp"));
            var Aff = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoAff"));
            var MaxAff = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_maxAff"));
            var MaxExp = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_maxExp"));
            var HaveAff = Number(getStoredValue(HHStoredVarPrefixKey + "Temp_haveAff"));
            var HaveExp = Number(getStoredValue(HHStoredVarPrefixKey + "Temp_haveExp"));
            var HaveBooster = JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_haveBooster"));
            var MaxBooster = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_maxBooster"));
            let Was;
            var boosterFilter = getStoredValue(HHStoredVarPrefixKey + "Setting_autoBuyBoostersFilter").split(";");
            if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoBuyBoosters") === "true" && boosterFilter.length > 0) {
                Was = shop[1].length;
                for (var boost of boosterFilter) {
                    let boosterOwned = HaveBooster.hasOwnProperty(boost) ? Number(HaveBooster[boost]) : 0;
                    for (var n1 = shop[1].length - 1; n1 >= 0; n1--) {
                        if (kobans >= Number(getStoredValue(HHStoredVarPrefixKey + "Setting_kobanBank")) + Number(shop[1][n1].price_buy) && shop[1][n1].item.currency == "hc" && shop[1][n1].item.identifier == boost && (shop[1][n1].item.rarity == 'legendary' || shop[1][n1].item.rarity == 'mythic') && boosterOwned < MaxBooster) {
                            LogUtils_logHHAuto({ log: 'wanna buy ', object: shop[1][n1], owning: boosterOwned });
                            if (kobans >= Number(shop[1][n1].price_buy)) {
                                LogUtils_logHHAuto({ log: 'Buying : ', object: shop[1][n1] });
                                // change referer
                                window.history.replaceState(null, '', addNutakuSession('/shop.html'));
                                kobans -= Number(shop[1][n1].price_buy);
                                var params1 = {
                                    index: shop[1][n1].index,
                                    action: "market_buy",
                                    id_item: shop[1][n1].id_item,
                                    type: "booster"
                                };
                                unsafeWindow.hh_ajax(params1, function (data) {
                                    Hero.updates(data.changes, false);
                                    if (data.success === false) {
                                        clearTimer('nextShopTime');
                                    }
                                    else {
                                        HaveBooster[boost] = (boosterOwned + 1);
                                        setStoredValue(HHStoredVarPrefixKey + "Temp_haveBooster", JSON.stringify(HaveBooster));
                                    }
                                    // change referer
                                    window.history.replaceState(null, '', addNutakuSession('/home.html'));
                                });
                                shop[1].splice(n1, 1);
                                setStoredValue(HHStoredVarPrefixKey + "Temp_storeContents", JSON.stringify(shop));
                                setTimeout(Market.doShopping, randomInterval(600, 1200));
                                return;
                            }
                        }
                    }
                }
                if (shop[1].length == 0 && Was > 0) {
                    setStoredValue(HHStoredVarPrefixKey + "Temp_charLevel", 0);
                }
            }
            if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoAffW") === "true" && HaveAff < MaxAff) {
                //logHHAuto('gifts');
                Was = shop[2].length;
                var allGiftsPriceSc = 0;
                for (var n2 = shop[2].length - 1; n2 >= 0; n2--) {
                    if (shop[2][n2].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                     {
                        allGiftsPriceSc += Number(shop[2][n2].price_buy);
                    }
                }
                if (allGiftsPriceSc > 0 && money >= Exp + allGiftsPriceSc) {
                    LogUtils_logHHAuto('Buy all gifts for price:' + allGiftsPriceSc);
                    // change referer
                    window.history.replaceState(null, '', addNutakuSession('/shop.html'));
                    money -= allGiftsPriceSc;
                    var params2 = {
                        action: "market_auto_buy",
                        type: "gift"
                    };
                    unsafeWindow.hh_ajax(params2, function (data) {
                        Hero.updates(data.changes, false);
                        if (data.success === false) {
                            clearTimer('nextShopTime');
                        }
                        // change referer
                        window.history.replaceState(null, '', addNutakuSession('/home.html'));
                    });
                    for (var n2 = shop[2].length - 1; n2 >= 0; n2--) {
                        if (shop[2][n2].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                         {
                            shop[2].splice(n2, 1);
                        }
                    }
                    setStoredValue(HHStoredVarPrefixKey + "Temp_storeContents", JSON.stringify(shop));
                }
                else {
                    for (var n2 = shop[2].length - 1; n2 >= 0; n2--) {
                        //logHHAuto({log:'wanna buy ',Object:shop[2][n2]});
                        if (money >= Aff + Number(shop[2][n2].price_buy) && money >= Number(shop[2][n2].price_buy) && shop[2][n2].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                         {
                            LogUtils_logHHAuto({ log: 'Buying : ', Object: shop[2][n2] });
                            // change referer
                            window.history.replaceState(null, '', addNutakuSession('/shop.html'));
                            money -= Number(shop[2][n2].price_buy);
                            var params4 = {
                                index: shop[2][n2].index,
                                action: "market_buy",
                                id_item: shop[2][n2].id_item,
                                type: "gift"
                            };
                            unsafeWindow.hh_ajax(params4, function (data) {
                                Hero.updates(data.changes, false);
                                if (data.success === false) {
                                    clearTimer('nextShopTime');
                                }
                                // change referer
                                window.history.replaceState(null, '', addNutakuSession('/home.html'));
                            });
                            shop[2].splice(n2, 1);
                            setStoredValue(HHStoredVarPrefixKey + "Temp_storeContents", JSON.stringify(shop));
                            setTimeout(Market.doShopping, randomInterval(600, 1200));
                            return;
                        }
                    }
                }
                if (shop[2].length == 0 && Was > 0) {
                    setStoredValue(HHStoredVarPrefixKey + "Temp_charLevel", 0);
                }
            }
            if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoExpW") === "true" && HaveExp < MaxExp) {
                //logHHAuto('books');
                Was = shop[3].length;
                var allPotionPriceSc = 0;
                for (var n3 = shop[3].length - 1; n3 >= 0; n3--) {
                    if (shop[3][n3].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                     {
                        allPotionPriceSc += Number(shop[3][n3].price_buy);
                    }
                }
                if (allPotionPriceSc > 0 && money >= Exp + allPotionPriceSc) {
                    LogUtils_logHHAuto('Buy all books for price:' + allPotionPriceSc);
                    // change referer
                    window.history.replaceState(null, '', addNutakuSession('/shop.html'));
                    money -= allPotionPriceSc;
                    var params3 = {
                        action: "market_auto_buy",
                        type: "potion"
                    };
                    unsafeWindow.hh_ajax(params3, function (data) {
                        Hero.updates(data.changes, false);
                        if (data.success === false) {
                            clearTimer('nextShopTime');
                        }
                        // change referer
                        window.history.replaceState(null, '', addNutakuSession('/home.html'));
                    });
                    for (var n3 = shop[3].length - 1; n3 >= 0; n3--) {
                        if (shop[3][n3].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                         {
                            shop[3].splice(n3, 1);
                        }
                    }
                    setStoredValue(HHStoredVarPrefixKey + "Temp_storeContents", JSON.stringify(shop));
                }
                else {
                    for (var n3 = shop[3].length - 1; n3 >= 0; n3--) {
                        //logHHAuto('wanna buy ',shop[3][n3]);
                        if (money >= Exp + Number(shop[3][n3].price_buy) && money >= Number(shop[3][n3].price_buy) && shop[3][n3].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                         {
                            LogUtils_logHHAuto({ log: 'Buying : ', Object: shop[3][n3] });
                            // change referer
                            window.history.replaceState(null, '', addNutakuSession('/shop.html'));
                            money -= Number(shop[3][n3].price);
                            var params5 = {
                                index: shop[3][n3].index,
                                action: "market_buy",
                                id_item: shop[3][n3].id_item,
                                type: "potion"
                            };
                            unsafeWindow.hh_ajax(params5, function (data) {
                                Hero.updates(data.changes, false);
                                if (data.success === false) {
                                    clearTimer('nextShopTime');
                                }
                                // change referer
                                window.history.replaceState(null, '', addNutakuSession('/home.html'));
                            });
                            shop[3].splice(n3, 1);
                            setStoredValue(HHStoredVarPrefixKey + "Temp_storeContents", JSON.stringify(shop));
                            setTimeout(Market.doShopping, randomInterval(600, 1200));
                            return;
                        }
                    }
                }
                if (shop[3].length == 0 && Was > 0) {
                    setStoredValue(HHStoredVarPrefixKey + "Temp_charLevel", 0);
                }
            }
            setStoredValue(HHStoredVarPrefixKey + "Temp_storeContents", JSON.stringify(shop));
            //unsafeWindow.Hero.currencies.soft_currency=money;
            //Hero.update("soft_currency", money, false);
        }
        catch (ex) {
            LogUtils_logHHAuto("Catched error : Could not buy : " + ex);
            setStoredValue(HHStoredVarPrefixKey + "Temp_charLevel", 0);
        }
    }
}

;// CONCATENATED MODULE: ./src/Module/Missions.ts





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
    static getSuitableMission(missionsList) {
        var msn = missionsList[0];
        try {
            for (var m in missionsList) {
                if (JSON.stringify(missionsList[m].rewards).includes("koban") && getStoredValue(HHStoredVarPrefixKey + "Setting_autoMissionKFirst") === "true") {
                    return missionsList[m];
                }
                if (Number(msn.duration) > Number(missionsList[m].duration)) {
                    msn = missionsList[m];
                }
            }
        }
        catch (error) {
            LogUtils_logHHAuto("Something went wrong, starting first mission in the list ", error);
            msn = missionsList[0];
        }
        return msn;
    }
    static run() {
        // returns boolean to set busy
        if (getPage() !== ConfigHelper.getHHScriptVars("pagesIDMissions")) {
            LogUtils_logHHAuto("Navigating to missions page.");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDMissions"));
            // return busy
            return true;
        }
        else {
            try {
                const debugEnabled = getStoredValue(HHStoredVarPrefixKey + "Temp_Debug") === 'true';
                LogUtils_logHHAuto("On missions page.");
                if (RewardHelper.closeRewardPopupIfAny()) {
                    return true;
                }
                let canCollect = getStoredValue(HHStoredVarPrefixKey + "Setting_autoMissionCollect") === "true" && $(".mission_button button:visible[rel='claim']").length > 0 && TimeHelper.canCollectCompetitionActive();
                if (canCollect) {
                    LogUtils_logHHAuto("Collecting finished mission's reward.");
                    $(".mission_button button:visible[rel='claim']").first().click();
                    return true;
                }
                var { allGood, missions } = Missions.parseMissions(canCollect);
                if (!allGood && canCollect) {
                    LogUtils_logHHAuto("Something went wrong, need to retry in 15secs.");
                    setTimer('nextMissionTime', randomInterval(15, 30));
                    return true;
                }
                if (!allGood) {
                    LogUtils_logHHAuto("Mission ongoing waiting it ends.");
                    if (checkTimer('nextMissionTime'))
                        setTimer('nextMissionTime', randomInterval(15, 30));
                    return true;
                }
                if (debugEnabled)
                    LogUtils_logHHAuto("Missions parsed, mission list is:", missions);
                if (missions.length > 0) {
                    var mission = Missions.getSuitableMission(missions);
                    LogUtils_logHHAuto(`Selected mission to be started (duration: ${mission.duration}sec):`);
                    if (debugEnabled)
                        LogUtils_logHHAuto(mission);
                    var missionButton = $(mission.missionObject).find("button:visible[rel='mission_start']").first();
                    if (missionButton.length > 0) {
                        missionButton.trigger('click');
                        gotoPage(ConfigHelper.getHHScriptVars("pagesIDMissions"), {}, randomInterval(1300, 1800));
                        setTimer('nextMissionTime', Number(mission.duration) + randomInterval(1, 5));
                    }
                    else {
                        LogUtils_logHHAuto("Something went wrong, no start button");
                        setTimer('nextMissionTime', randomInterval(15, 30));
                        return true;
                    }
                }
                else {
                    LogUtils_logHHAuto("No missions detected...!");
                    // get gift
                    var ck = getStoredValue(HHStoredVarPrefixKey + "Temp_missionsGiftLeft");
                    var isAfterGift = document.querySelector("#missions .after_gift").style.display === 'block';
                    if (!isAfterGift) {
                        if (ck === 'giftleft') {
                            LogUtils_logHHAuto("Collecting gift.");
                            deleteStoredValue(HHStoredVarPrefixKey + "Temp_missionsGiftLeft");
                            document.querySelector(".end_gift button").click();
                        }
                        else {
                            LogUtils_logHHAuto("Refreshing to collect gift...");
                            setStoredValue(HHStoredVarPrefixKey + "Temp_missionsGiftLeft", "giftleft");
                            location.reload();
                            // is busy
                            return true;
                        }
                    }
                    let time = $('.after_gift span[rel="expires"]').text();
                    if (time === undefined || time === null || time.length === 0) {
                        LogUtils_logHHAuto("New mission time was undefined... Setting it manually to 10min.");
                        setTimer('nextMissionTime', randomInterval(10 * 60, 12 * 60));
                    }
                    setTimer('nextMissionTime', Number(convertTimeToInt(time)) + randomInterval(1, 5));
                }
            }
            catch ({ errName, message }) {
                LogUtils_logHHAuto(`ERROR during mission run: ${message}, retry in 10min`);
                setTimer('nextMissionTime', randomInterval(10 * 60, 12 * 60));
            }
            // not busy
            return false;
        }
    }
    static parseMissions(canCollect) {
        var missions = [];
        var lastMissionData = {};
        var allGood = true;
        // parse missions
        const allMissions = $(".mission_object");
        LogUtils_logHHAuto("Found " + allMissions.length + " missions to be parsed.");
        try {
            allMissions.each((idx, missionObject) => {
                var data = $.data(missionObject).d;
                lastMissionData = data;
                // Do not list completed missions
                var toAdd = true;
                if (data.remaining_time !== null) {
                    // This is not a fresh mission
                    if (data.remaining_time > 0) {
                        if ($('.finish_in_bar[style*="display:none;"], .finish_in_bar[style*="display: none;"]', missionObject).length === 0) {
                            LogUtils_logHHAuto("Unfinished mission detected...(" + data.remaining_time + "sec. remaining)");
                            setTimer('nextMissionTime', Number(data.remaining_time) + randomInterval(1, 5));
                            allGood = false;
                            missions = []; // Clear missions to avoid selecting a smaller one than the one ongoing
                            return false;
                        }
                        else {
                            allGood = false;
                        }
                    }
                    else {
                        if (canCollect) {
                            LogUtils_logHHAuto("Unclaimed mission detected...");
                            gotoPage(ConfigHelper.getHHScriptVars("pagesIDMissions"), {}, randomInterval(1300, 1800));
                            return false;
                        }
                    }
                    return;
                }
                else if (data.remaining_cost === null) {
                    // Finished missioned
                    data.finished = true;
                    data.remaining_time = 0;
                    toAdd = false;
                }
                data.missionObject = missionObject;
                var rewards = Missions.getMissionRewards(missionObject);
                data.rewards = rewards;
                if (toAdd)
                    missions.push(data);
            });
        }
        catch (error) {
            LogUtils_logHHAuto("Catched error : Couldn't parse missions (try again in 15min) : " + error);
            LogUtils_logHHAuto("Last mission parsed : " + JSON.stringify(lastMissionData));
            setTimer('nextMissionTime', randomInterval(15 * 60, 20 * 60));
            allGood = false;
        }
        return { allGood, missions };
    }
    static getMissionRewards(missionObject) {
        var rewards = [];
        // set rewards
        try {
            // get Reward slots
            var slots = missionObject.querySelectorAll(".slot");
            // traverse slots
            $.each(slots, function (idx, slotDiv) {
                var reward = new MissionRewards();
                // get slot class list
                reward.classList = slotDiv.classList;
                // set reward type
                if (reward.classList.contains("slot_xp"))
                    reward.type = "xp";
                else if (reward.classList.contains("slot_soft_currency"))
                    reward.type = "money";
                else if (reward.classList.contains("slot_hard_currency"))
                    reward.type = "koban";
                else
                    reward.type = "item";
                // set value if xp
                if (reward.type === "xp" || reward.type === "money" || reward.type === "koban") {
                    // remove all non numbers and HTML tags
                    try {
                        reward.data = Number(slotDiv.innerHTML.replace(/<.*?>/g, '').replace(/\D/g, ''));
                    }
                    catch (e) {
                        LogUtils_logHHAuto("Catched error : Couldn't parse xp/money data : " + e);
                        LogUtils_logHHAuto(slotDiv);
                    }
                }
                // set item details if item
                else if (reward.type === "item") {
                    try {
                        reward.data = $.data(slotDiv).d;
                    }
                    catch (e) {
                        LogUtils_logHHAuto("Catched error : Couldn't parse item reward slot details : " + e);
                        LogUtils_logHHAuto(slotDiv);
                        reward.type = "unknown";
                    }
                }
                rewards.push(reward);
            });
        }
        catch (error) {
            LogUtils_logHHAuto("Catched error : Couldn't parse rewards for missions : " + error);
        }
        return rewards;
    }
    static styles() {
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_compactMissions") === "true") {
            GM_addStyle('#missions .missions_wrap  {'
                + 'display:flex;'
                + 'flex-wrap: wrap;'
                + 'align-content: baseline;'
                + '}');
            const missionsContainerPath = '#missions .missions_wrap .mission_object.mission_entry';
            GM_addStyle(missionsContainerPath + ' {'
                + 'height: 56px;'
                + 'margin-right:3px;'
                + 'width: 49%;'
                + '}');
            GM_addStyle(missionsContainerPath + ' .mission_reward {'
                + 'width: 110px;'
                + 'padding-left: 5px;'
                + 'padding-top: 5px;'
                + '}');
            GM_addStyle(missionsContainerPath + ' .mission_image {'
                + 'height: 50px;'
                + 'width: 50px;'
                + 'margin-top: 0;'
                + '}');
            GM_addStyle(missionsContainerPath + ' .mission_details {'
                + 'display:none;'
                + '}');
            GM_addStyle(missionsContainerPath + ' .mission_button {'
                + 'display:flex;'
                + 'flex-direction:inherit;'
                + 'width:245px;'
                + '}');
            GM_addStyle(missionsContainerPath + ' .mission_button .duration {'
                + 'top:5px;'
                + 'left:5px;'
                + 'width: auto;'
                + '}');
            GM_addStyle(missionsContainerPath + ' .mission_button button {'
                + 'margin:0;'
                + '}');
            GM_addStyle(missionsContainerPath + ' .mission_button button[rel="finish"] {'
                + 'height: 50px;'
                + 'top:0;'
                + 'left: 2rem;'
                + 'padding: 4px 4px;'
                + '}');
            GM_addStyle(missionsContainerPath + ' .mission_button button[rel="claim"] {'
                + 'left:0;'
                + '}');
            GM_addStyle(missionsContainerPath + ' .mission_button .hh_bar {'
                + 'left:5px;'
                + '}');
        }
    }
}

;// CONCATENATED MODULE: ./src/Module/Pantheon.ts





class Pantheon {
    static getEnergy() {
        return Number(getHHVars('Hero.energies.worship.amount'));
    }
    static getEnergyMax() {
        return Number(getHHVars('Hero.energies.worship.max_regen_amount'));
    }
    static getPinfo() {
        const threshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoPantheonThreshold"));
        const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoPantheonRunThreshold"));
        let Tegzd = '';
        const boostLimited = getStoredValue(HHStoredVarPrefixKey + "Setting_autoPantheonBoostedOnly") === "true" && !Booster.haveBoosterEquiped();
        if (boostLimited) {
            Tegzd += '<li style="color:red!important;" title="' + getTextForUI("boostMissing", "elementText") + '">';
        }
        else {
            Tegzd += '<li>';
        }
        Tegzd += getTextForUI("autoPantheonTitle", "elementText") + ' ' + Pantheon.getEnergy() + '/' + Pantheon.getEnergyMax();
        if (runThreshold > 0) {
            Tegzd += ' (' + threshold + '<' + Pantheon.getEnergy() + '<' + runThreshold + ')';
        }
        if (runThreshold > 0 && Pantheon.getEnergy() < runThreshold) {
            Tegzd += ' ' + getTextForUI("waitRunThreshold", "elementText");
        }
        else {
            Tegzd += ' : ' + getTimeLeft('nextPantheonTime');
        }
        if (boostLimited) {
            Tegzd += ' ' + getTextForUI("boostMissing", "elementText") + '</li>';
        }
        else {
            Tegzd += '</li>';
        }
        return Tegzd;
    }
    static isEnabled() {
        return ConfigHelper.getHHScriptVars("isEnabledPantheon", false) && getHHVars('Hero.infos.level') >= ConfigHelper.getHHScriptVars("LEVEL_MIN_PANTHEON");
    }
    static isTimeToFight() {
        const threshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoPantheonThreshold"));
        const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoPantheonRunThreshold"));
        const humanLikeRun = getStoredValue(HHStoredVarPrefixKey + "Temp_PantheonHumanLikeRun") === "true";
        const energyAboveThreshold = humanLikeRun && Pantheon.getEnergy() > threshold || Pantheon.getEnergy() > Math.max(threshold, runThreshold - 1);
        const paranoiaSpending = Pantheon.getEnergy() > 0 && Number(checkParanoiaSpendings('worship')) > 0;
        const needBoosterToFight = getStoredValue(HHStoredVarPrefixKey + "Setting_autoPantheonBoostedOnly") === "true";
        const haveBoosterEquiped = Booster.haveBoosterEquiped();
        if (checkTimer('nextPantheonTime') && energyAboveThreshold && needBoosterToFight && !haveBoosterEquiped) {
            LogUtils_logHHAuto('Time for pantheon but no booster equipped');
        }
        return (checkTimer('nextPantheonTime') && energyAboveThreshold && (needBoosterToFight && haveBoosterEquiped || !needBoosterToFight)) || paranoiaSpending;
    }
    static run() {
        LogUtils_logHHAuto("Performing auto Pantheon.");
        // Confirm if on correct screen.
        var page = getPage();
        var current_worship = Pantheon.getEnergy();
        if (page === ConfigHelper.getHHScriptVars("pagesIDPantheon")) {
            LogUtils_logHHAuto("On pantheon page.");
            LogUtils_logHHAuto("Remaining worship : " + current_worship);
            if (current_worship > 0) {
                const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoPantheonRunThreshold"));
                if (runThreshold > 0) {
                    setStoredValue(HHStoredVarPrefixKey + "Temp_PantheonHumanLikeRun", "true");
                }
                let pantheonButton = $("#pantheon_tab_container .bottom-container a.blue_button_L.pantheon-pre-battle-btn");
                let templeID = queryStringGetParam(new URL(pantheonButton[0].getAttribute("href") || '', window.location.origin).search, 'id_opponent');
                if (pantheonButton.length > 0 && templeID !== null) {
                    LogUtils_logHHAuto("Going to fight Temple : " + templeID);
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDPantheonPreBattle"), { id_opponent: templeID });
                }
                else {
                    LogUtils_logHHAuto("Issue to find templeID retry in 60secs.");
                    setTimer('nextPantheonTime', randomInterval(60, 70));
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                }
            }
            else {
                if (getHHVars('Hero.energies.worship.next_refresh_ts') === 0) {
                    setTimer('nextPantheonTime', randomInterval(15 * 60, 17 * 60));
                }
                else {
                    const next_refresh = getHHVars('Hero.energies.worship.next_refresh_ts');
                    setTimer('nextPantheonTime', randomInterval(next_refresh + 10, next_refresh + 180));
                }
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
            }
            return;
        }
        else if (page === ConfigHelper.getHHScriptVars("pagesIDPantheonPreBattle")) {
            LogUtils_logHHAuto("On pantheon-pre-battle page.");
            let templeID = queryStringGetParam(window.location.search, 'id_opponent');
            LogUtils_logHHAuto("Go and fight temple :" + templeID);
            let pantheonTempleBattleButton = $("#pre-battle .battle-buttons a.green_button_L.battle-action-button.pantheon-single-battle-button[data-pantheon-id='" + templeID + "']");
            if (pantheonTempleBattleButton.length > 0) {
                //replaceCheatClick();
                setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                LogUtils_logHHAuto("setting autoloop to false");
                pantheonTempleBattleButton[0].click();
            }
            else {
                LogUtils_logHHAuto("Issue to find temple battle button retry in 60secs.");
                setTimer('nextPantheonTime', randomInterval(60, 70));
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
            }
        }
        else {
            // Switch to the correct screen
            LogUtils_logHHAuto("Remaining worship : " + current_worship);
            if (current_worship > 0) {
                LogUtils_logHHAuto("Switching to pantheon screen.");
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDPantheon"));
                return;
            }
            else {
                if (getHHVars('Hero.energies.worship.next_refresh_ts') === 0) {
                    setTimer('nextPantheonTime', randomInterval(15 * 60, 17 * 60));
                }
                else {
                    const next_refresh = getHHVars('Hero.energies.worship.next_refresh_ts');
                    setTimer('nextPantheonTime', randomInterval(next_refresh + 10, next_refresh + 180));
                }
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
            }
            return;
        }
    }
}

;// CONCATENATED MODULE: ./src/Module/MonthlyCard.ts








class MonthlyCards {
    static updateInputPattern() {
        try {
            if (ConfigHelper.getHHScriptVars('isEnabledTrollBattle', false)) {
                const maxRegenFight = Troll.getEnergyMax();
                if (maxRegenFight && maxRegenFight > 20) {
                    // 20 - 30 - 40 - 50 - 60
                    const lastAllowedTenth = (maxRegenFight / 10) - 1;
                    HHAuto_inputPattern.autoTrollThreshold = "[1-" + lastAllowedTenth + "]?[0-9]";
                    HHAuto_inputPattern.autoTrollRunThreshold = maxRegenFight + "|" + HHAuto_inputPattern.autoTrollThreshold;
                }
            }
            if (ConfigHelper.getHHScriptVars('isEnabledSeason', false)) {
                const maxRegenKiss = Season.getEnergyMax();
                if (maxRegenKiss && maxRegenKiss > 10) {
                    // 10 - 20 - 30 - 40 - 50
                    const lastAllowedTenth = (maxRegenKiss / 10) - 1;
                    HHAuto_inputPattern.autoSeasonThreshold = "[1-" + lastAllowedTenth + "]?[0-9]";
                    HHAuto_inputPattern.autoSeasonRunThreshold = maxRegenKiss + "|" + HHAuto_inputPattern.autoSeasonThreshold;
                }
            }
            if (ConfigHelper.getHHScriptVars('isEnabledQuest', false)) {
                const maxRegenQuest = QuestHelper.getEnergyMax();
                if (maxRegenQuest && maxRegenQuest > 100) {
                    // 100 - 150 - 200 - 250 - 300
                    if (maxRegenQuest === 200 || maxRegenQuest === 300) {
                        const lastAllowedHundred = (QuestHelper.getEnergyMax() / 100) - 1;
                        HHAuto_inputPattern.autoQuestThreshold = "[1-" + lastAllowedHundred + "][0-9][0-9]|[1-9]?[0-9]";
                    }
                    else if (maxRegenQuest === 250) {
                        HHAuto_inputPattern.autoQuestThreshold = "2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9]";
                    }
                    else {
                        HHAuto_inputPattern.autoQuestThreshold = "1[0-4][0-9]|[1-9]?[0-9]";
                    }
                }
            }
            if (ConfigHelper.getHHScriptVars('isEnabledLeagues', false)) {
                const maxRegenLeague = LeagueHelper.getEnergyMax();
                if (maxRegenLeague && maxRegenLeague > 15) {
                    // 15 - 18 - 23 - 26 - 30
                    switch (maxRegenLeague) {
                        case 18:
                            HHAuto_inputPattern.autoLeaguesThreshold = "1[0-7]|[0-9]";
                            HHAuto_inputPattern.autoLeaguesRunThreshold = "1[0-8]|[0-9]";
                            break;
                        case 23:
                            HHAuto_inputPattern.autoLeaguesThreshold = "2[0-2]|1[0-9]|[0-9]";
                            HHAuto_inputPattern.autoLeaguesRunThreshold = "2[0-3]|1[0-9]|[0-9]";
                            break;
                        case 26:
                            HHAuto_inputPattern.autoLeaguesThreshold = "2[0-5]|1[0-9]|[0-9]";
                            HHAuto_inputPattern.autoLeaguesRunThreshold = "2[0-6]|1[0-9]|[0-9]";
                            break;
                        case 30:
                            HHAuto_inputPattern.autoLeaguesThreshold = "2[0-9]|1[0-9]|[0-9]";
                            HHAuto_inputPattern.autoLeaguesRunThreshold = "30|[1-2][0-9]|[0-9]";
                            break;
                    }
                }
            }
            if (ConfigHelper.getHHScriptVars('isEnabledPantheon', false)) {
                const maxRegenPantheon = Pantheon.getEnergyMax();
                if (maxRegenPantheon && maxRegenPantheon > 10) {
                    // 10 - 15 - 20 - 25 - 30
                    switch (maxRegenPantheon) {
                        case 15:
                            HHAuto_inputPattern.autoPantheonThreshold = "1[0-4]|[0-9]";
                            HHAuto_inputPattern.autoPantheonRunThreshold = "1[0-5]|[0-9]";
                            break;
                        case 20:
                            HHAuto_inputPattern.autoPantheonThreshold = "1[0-9]|[0-9]";
                            HHAuto_inputPattern.autoPantheonRunThreshold = "20|1[0-9]|[0-9]";
                            break;
                        case 25:
                            HHAuto_inputPattern.autoPantheonThreshold = "2[0-4]|1[0-9]|[0-9]";
                            HHAuto_inputPattern.autoPantheonRunThreshold = "2[0-5]|1[0-9]|[0-9]";
                            break;
                        case 30:
                            HHAuto_inputPattern.autoPantheonThreshold = "[1-2][0-9]|[0-9]";
                            HHAuto_inputPattern.autoPantheonRunThreshold = "30|[1-2][0-9]|[0-9]";
                            break;
                    }
                }
            }
        }
        catch (e) {
            LogUtils_logHHAuto("Catched error : Couldn't parse card info, input patern kept as default : " + e);
        }
    }
}

;// CONCATENATED MODULE: ./src/Module/Pachinko.ts
var Pachinko_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




class Pachinko {
    static getGreatPachinko() {
        return Pachinko.getFreePachinko('great', 'nextPachinkoTime', 'great-timer');
    }
    static getMythicPachinko() {
        return Pachinko.getFreePachinko('mythic', 'nextPachinko2Time', 'mythic-timer');
    }
    static getEquipmentPachinko() {
        return Pachinko.getFreePachinko('equipment', 'nextPachinkoEquipTime', 'equipment-timer');
    }
    static getFreePachinko(pachinkoType, pachinkoTimer, timerClass) {
        return Pachinko_awaiter(this, void 0, void 0, function* () {
            if (!pachinkoType || !pachinkoTimer) {
                return false;
            }
            try {
                if (getPage() !== ConfigHelper.getHHScriptVars("pagesIDPachinko")) {
                    LogUtils_logHHAuto("Navigating to Pachinko window.");
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDPachinko"));
                    return true;
                }
                else {
                    LogUtils_logHHAuto("Detected Pachinko Screen. Fetching Pachinko, setting autoloop to false");
                    setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                    LogUtils_logHHAuto('switch to ' + pachinkoType);
                    const equipementSection = '#pachinko_whole .playing-zone';
                    const freeButtonQuery = '#playzone-replace-info button[data-free="true"].blue_button_L';
                    function selectPachinko(pachinkoType) {
                        return Pachinko_awaiter(this, void 0, void 0, function* () {
                            $('.game-simple-block[type-pachinko=' + pachinkoType + ']').trigger('click');
                            yield TimeHelper.sleep(randomInterval(400, 600));
                        });
                    }
                    yield selectPachinko(pachinkoType);
                    if ($(equipementSection).attr('type-panel') != pachinkoType) {
                        LogUtils_logHHAuto(`Error pachinko ${pachinkoType} not loaded after click, retry`);
                        yield selectPachinko(pachinkoType);
                    }
                    if ($(freeButtonQuery).length === 0) {
                        LogUtils_logHHAuto('Not ready yet');
                    }
                    else {
                        $(freeButtonQuery).trigger('click');
                    }
                    var npach = $('.' + timerClass + ' span[rel="expires"]').text();
                    if (npach !== undefined && npach !== null && npach.length > 0) {
                        setTimer(pachinkoTimer, Number(convertTimeToInt(npach)) + randomInterval(1, 5));
                    }
                    else {
                        LogUtils_logHHAuto("Unable to find " + pachinkoType + " Pachinko time, wait 4h.");
                        setTimer(pachinkoTimer, ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(1, 10));
                    }
                    setTimeout(function () {
                        RewardHelper.closeRewardPopupIfAny();
                        setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "true");
                        LogUtils_logHHAuto("setting autoloop to true");
                        setTimeout(autoLoop, randomInterval(500, 800));
                    }, randomInterval(300, 600));
                }
                return true;
            }
            catch (ex) {
                LogUtils_logHHAuto("Catched error : Could not collect " + pachinkoType + " Pachinko... " + ex);
                setTimer(pachinkoTimer, ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(1, 10));
                return false;
            }
        });
    }
    static modulePachinko() {
        const menuID = "PachinkoButton";
        let PachinkoButton = '<div style="position: absolute;left: 52%;top: 100px;width:60px;z-index:10" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("PachinkoButton", "tooltip") + '</span><label style="font-size:small" class="myButton" id="PachinkoButton">' + getTextForUI("PachinkoButton", "elementText") + '</label></div>';
        if (document.getElementById(menuID) === null) {
            $("#contains_all section").prepend(PachinkoButton);
            $("#PachinkoButton").on("click", () => { buildPachinkoSelectPopUp(-1); });
            GM_registerMenuCommand(getTextForUI(menuID, "elementText"), () => { buildPachinkoSelectPopUp(-1); });
        }
        else {
            return;
        }
        function getNumberOfGirlToWinPatchinko() {
            const girlsRewards = $("div.playing-zone .game-rewards .list-prizes .girl_shards");
            let numberOfGirlsToWin = 0;
            if (girlsRewards.length > 0) {
                try {
                    numberOfGirlsToWin = JSON.parse(girlsRewards.attr("data-rewards") || '').length;
                }
                catch (exp) { }
            }
            return numberOfGirlsToWin;
        }
        function buildPachinkoSelectPopUp(orbsPlayed = -1) {
            let PachinkoMenu = '<div style="padding:50px; display:flex;flex-direction:column;font-size:15px;" class="HHAutoScriptMenu">'
                + '<div style="display:flex;flex-direction:row">'
                + '<div style="padding:10px" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("PachinkoSelector", "tooltip") + '</span><select id="PachinkoSelector"></select></div>'
                + '<div style="padding:10px" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("PachinkoLeft", "tooltip") + '</span><span id="PachinkoLeft"></span></div>'
                + '</div>'
                + '<div class="rowLine">'
                + '<p id="girls_to_win"></p>'
                + '</div>'
                + '<div class="rowLine">'
                + hhMenuSwitch('PachinkoFillOrbs')
                + hhMenuSwitch('PachinkoByPassNoGirls')
                + hhMenuSwitch('PachinkoStopFirstGirl')
                + '</div>'
                + '<div class="rowLine">'
                + '<div style="padding:10px;" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("PachinkoXTimes", "tooltip") + '</span><input id="PachinkoXTimes" style="width:50px;height:20px" required pattern="' + HHAuto_inputPattern.menuExpLevel + '" type="text" value="1"></div>'
                + '</div>'
                + '<div class="rowLine">'
                + '<div style="padding:10px;width:50%" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("Launch", "tooltip") + '</span><label class="myButton" id="PachinkoPlayX" style="font-size:15px; width:100%;text-align:center">' + getTextForUI("Launch", "elementText") + '</label></div>'
                + '</div>'
                + '<p style="color: red;" id="PachinkoError"></p>'
                + `<p id="PachinkoOrbsSpent">${orbsPlayed >= 0 ? getTextForUI("PachinkoOrbsSpent", "elementText") + ' ' + orbsPlayed : ''}</p>`
                + '</div>';
            fillHHPopUp("PachinkoMenu", getTextForUI("PachinkoButton", "elementText"), PachinkoMenu);
            function updateOrbsNumber(orbsLeft) {
                let fillAllOrbs = document.getElementById("PachinkoFillOrbs").checked;
                if (fillAllOrbs && orbsLeft.length > 0) {
                    document.getElementById("PachinkoXTimes").value = orbsLeft[0].innerText;
                }
                else {
                    document.getElementById("PachinkoXTimes").value = '1';
                }
            }
            $("#PachinkoPlayX").on("click", pachinkoPlayXTimes);
            $(document).on('change', "#PachinkoSelector", function () {
                let timerSelector = document.getElementById("PachinkoSelector");
                let selectorText = timerSelector.options[timerSelector.selectedIndex].text;
                if (selectorText === getTextForUI("PachinkoSelectorNoButtons", "elementText")) {
                    $("#PachinkoLeft").text("");
                    return;
                }
                let orbsLeft = $("div.playing-zone div.btns-section button.blue_button_L[orb_name=" + timerSelector.options[timerSelector.selectedIndex].value + "] span[total_orbs]");
                if (orbsLeft.length > 0) {
                    $("#PachinkoLeft").text(orbsLeft[0].innerText + getTextForUI("PachinkoOrbsLeft", "elementText"));
                }
                else {
                    $("#PachinkoLeft").text('0');
                }
                updateOrbsNumber(orbsLeft);
            });
            $(document).on('change', "#PachinkoFillOrbs", function () {
                let timerSelector = document.getElementById("PachinkoSelector");
                let orbsLeft = $("div.playing-zone div.btns-section button.blue_button_L[orb_name=" + timerSelector.options[timerSelector.selectedIndex].value + "] span[total_orbs]");
                updateOrbsNumber(orbsLeft);
            });
            // Add Timer reset options //changed
            let timerOptions = document.getElementById("PachinkoSelector");
            let countTimers = 0;
            let PachinkoType = $("div.playing-zone #playzone-replace-info div.cover h2")[0].innerText;
            $("div.playing-zone div.btns-section button.blue_button_L").each(function () {
                let optionElement = document.createElement("option");
                let orbName = $(this).attr('orb_name') || '';
                optionElement.value = orbName;
                countTimers++;
                optionElement.text = `${PachinkoType} x${Pachinko.getHumanPachinkoFromOrbName(orbName)}`;
                timerOptions.add(optionElement);
                if (countTimers === 1) {
                    let orbsLeft = $("div.playing-zone div.btns-section button.blue_button_L[orb_name=" + orbName + "] span[total_orbs]")[0];
                    $("#PachinkoLeft").text(orbsLeft.innerText + getTextForUI("PachinkoOrbsLeft", "elementText"));
                }
            });
            let numberOfGirlsToWin = getNumberOfGirlToWinPatchinko();
            $("#girls_to_win").text(numberOfGirlsToWin + " girls to win"); // TODO translate
            $('#PachinkoStopFirstGirl').parent().parent().parent().toggle(numberOfGirlsToWin > 0);
            if (countTimers === 0) {
                let optionElement = document.createElement("option");
                optionElement.value = countTimers + '';
                optionElement.text = getTextForUI("PachinkoSelectorNoButtons", "elementText");
                timerOptions.add(optionElement);
            }
        }
        function pachinkoPlayXTimes() {
            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
            LogUtils_logHHAuto("setting autoloop to false");
            let timerSelector = document.getElementById("PachinkoSelector");
            let ByPassNoGirlChecked = document.getElementById("PachinkoByPassNoGirls").checked;
            let stopFirstGirlChecked = document.getElementById("PachinkoStopFirstGirl").checked;
            let buttonValue = timerSelector.options[timerSelector.selectedIndex].value;
            let buttonSelector = "div.playing-zone div.btns-section button.blue_button_L[orb_name=" + buttonValue + "]";
            const buttonContinueSelector = '.popup_buttons #play_again:visible';
            let orbsLeftSelector = buttonSelector + " span[total_orbs]";
            let orbsToGo = Number(document.getElementById("PachinkoXTimes").value);
            function getNumberOfOrbsLeft(orbsLeftSelector) {
                let orbsLeft = 0;
                if ($(orbsLeftSelector).length > 0) {
                    orbsLeft = Number($(orbsLeftSelector).first().text());
                }
                if (isNaN(orbsLeft)) {
                    orbsLeft = 0;
                    LogUtils_logHHAuto("ERROR getting orbs left");
                }
                return orbsLeft;
            }
            const orbsLeft = getNumberOfOrbsLeft(orbsLeftSelector);
            if (orbsLeft <= 0) {
                LogUtils_logHHAuto('No Orbs left for : ' + timerSelector.options[timerSelector.selectedIndex].text);
                $("#PachinkoError").text(getTextForUI("PachinkoSelectorNoButtons", "elementText"));
                return;
            }
            if (Number.isNaN(Number(orbsToGo)) || orbsToGo < 1 || orbsToGo > orbsLeft) {
                LogUtils_logHHAuto('Invalid orbs number ' + orbsToGo);
                $("#PachinkoError").text(getTextForUI("PachinkoInvalidOrbsNb", "elementText") + " : " + orbsToGo);
                return;
            }
            let PachinkoPlay = '<div style="padding:20px 50px; display:flex;flex-direction:column">'
                + '<p>' + timerSelector.options[timerSelector.selectedIndex].text + ' : </p>'
                + '<p id="PachinkoPlayedTimes" style="padding:0 10px">0/' + orbsToGo + '</p>'
                + '<label style="width:80px" class="myButton" id="PachinkoPlayCancel">' + getTextForUI("OptionCancel", "elementText") + '</label>'
                + '</div>';
            fillHHPopUp("PachinkoPlay", getTextForUI("PachinkoButton", "elementText"), PachinkoPlay);
            $("#PachinkoPlayCancel").on("click", () => {
                maskHHPopUp();
                LogUtils_logHHAuto("Cancel clicked, closing popUp.");
            });
            function stopXPachinkoNoGirl() {
                LogUtils_logHHAuto("No more girl on Pachinko, cancelling.");
                maskHHPopUp();
                buildPachinkoSelectPopUp();
                $("#PachinkoError").text(getTextForUI("PachinkoNoGirls", "elementText"));
            }
            function playXPachinko_func() {
                if (!isDisplayedHHPopUp()) {
                    LogUtils_logHHAuto("PopUp closed, cancelling interval, restart autoloop.");
                    setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "true");
                    setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey + "Temp_autoLoopTimeMili")));
                    return;
                }
                const confirmPachinko = document.getElementById("confirm_pachinko");
                if (confirmPachinko !== null) {
                    if (ByPassNoGirlChecked && confirmPachinko.querySelector("#popup_confirm.blue_button_L") !== null) {
                        confirmPachinko.querySelector("#popup_confirm.blue_button_L").click();
                    }
                    else {
                        stopXPachinkoNoGirl();
                        return;
                    }
                }
                // let numberOfGirlsToWin = getNumberOfGirlToWinPatchinko();
                // if(!ByPassNoGirlChecked && numberOfGirlsToWin === 0) {
                //     stopXPachinkoNoGirl();
                //     return;
                // }
                const currentOrbsLeft = getNumberOfOrbsLeft(orbsLeftSelector);
                const spendedOrbs = Number(orbsLeft - currentOrbsLeft);
                if (stopFirstGirlChecked && $('#rewards_popup #reward_holder .shards_wrapper:visible').length > 0) {
                    LogUtils_logHHAuto("Girl in reward, stopping...");
                    maskHHPopUp();
                    buildPachinkoSelectPopUp(spendedOrbs);
                    return;
                }
                const pachinkoSelectedButton = $(buttonSelector)[0];
                const continuePachinkoSelectedButton = $(buttonContinueSelector);
                $("#PachinkoPlayedTimes").text(spendedOrbs + "/" + orbsToGo);
                if (spendedOrbs < orbsToGo && currentOrbsLeft > 0) {
                    if (continuePachinkoSelectedButton.length > 0) {
                        continuePachinkoSelectedButton.trigger('click');
                    }
                    else {
                        RewardHelper.closeRewardPopupIfAny(false);
                        pachinkoSelectedButton.click();
                    }
                }
                else {
                    RewardHelper.closeRewardPopupIfAny(false);
                    LogUtils_logHHAuto("All spent, going back to Selector.");
                    maskHHPopUp();
                    buildPachinkoSelectPopUp(spendedOrbs);
                    return;
                }
                setTimeout(playXPachinko_func, randomInterval(500, 1500));
            }
            setTimeout(playXPachinko_func, randomInterval(500, 1500));
        }
    }
    static getHumanPachinkoFromOrbName(orb_name) {
        switch (orb_name) {
            case 'o_v4': return '4';
            case 'o_e1':
            case 'o_eq1':
            case 'o_g1':
            case 'o_m1': return '1';
            case 'o_eq2': return '2';
            case 'o_m3': return '3';
            case 'o_m6': return '6';
            case 'o_eq10':
            case 'o_g10':
            case 'o_e10': return '10';
            case 'o_ed': return 'Draft';
            default: return 'Unknown';
        }
    }
}

;// CONCATENATED MODULE: ./src/Module/PlaceOfPower.ts




class PlaceOfPower {
    static moduleDisplayPopID() {
        if ($('.HHPopIDs').length > 0) {
            return;
        }
        $('div.pop_list div[pop_id]').each(function () {
            $(this).prepend('<div class="HHPopIDs">' + $(this).attr('pop_id') + '</div>');
        });
    }
    static styles() {
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_compactPowerPlace") === "true") {
            const popPagePath = '#pop #pop_info .pop_list';
            const popBtnPath = popPagePath + ' .pop-action-btn';
            const popContainerPath = popPagePath + ' .pop_list_scrolling_area .pop_thumb_container';
            const popButtonStyles = function () {
                GM_addStyle(popBtnPath + ' .pop-auto-asign-all, ' + popBtnPath + ' .pop-claim-all {'
                    + 'min-width: auto !important;'
                    + 'height: 26px;'
                    + 'flex-direction: inherit;'
                    + 'column-gap: 12px;'
                    + 'display: inline-flex;'
                    + '}');
                GM_addStyle(popBtnPath + ' .battle-action-button .action-cost {'
                    + 'width:auto;'
                    + '}');
                GM_addStyle(popBtnPath + ' .pop-claim-all .action-cost {'
                    + 'display: flex;'
                    + '}');
                GM_addStyle(popBtnPath + ' .pop-claim-all .action-cost .hc-cost {'
                    + 'display: flex;'
                    + 'align-items: center;'
                    + '}');
            };
            const popStyles = function () {
                GM_addStyle(popContainerPath + ' {'
                    + 'margin:2px;'
                    + 'width: 135px;'
                    + 'min-height: 130px;'
                    + '}');
                GM_addStyle(popContainerPath + ' .pop_thumb > button {'
                    + 'width: 128px;'
                    + 'height: 25px;'
                    + '}');
                GM_addStyle(popContainerPath + ' .pop_thumb > .pop_thumb_title {'
                    + 'display: none;'
                    + '}');
                GM_addStyle(popContainerPath + ' .pop_thumb_expanded,' + popContainerPath + ' .pop_thumb_active {'
                    + 'height: 130px;'
                    + '}');
                GM_addStyle(popContainerPath + ' .pop_thumb img {'
                    + 'width: 100%;'
                    + 'height: auto;'
                    + '}');
                GM_addStyle(popContainerPath + ' .pop_thumb > .pop_thumb_progress_bar {'
                    + 'width: 128px;'
                    + 'height: 30px;'
                    + '}');
                GM_addStyle(popContainerPath + ' .pop_thumb > .pop_thumb_space {'
                    + 'height: 30px;'
                    + '}');
                GM_addStyle(popContainerPath + ' .pop_thumb > .pop_thumb_progress_bar .hh_bar > .backbar {'
                    + 'width: 123px !important;'
                    + '}');
            };
            popButtonStyles();
            popStyles();
        }
    }
    static addPopToUnableToStart(popIndex, message) {
        var popUnableToStart = getStoredValue(HHStoredVarPrefixKey + "Temp_PopUnableToStart") ? getStoredValue(HHStoredVarPrefixKey + "Temp_PopUnableToStart") : "";
        LogUtils_logHHAuto(message);
        if (popUnableToStart === "") {
            setStoredValue(HHStoredVarPrefixKey + "Temp_PopUnableToStart", String(popIndex));
        }
        else {
            setStoredValue(HHStoredVarPrefixKey + "Temp_PopUnableToStart", popUnableToStart + ";" + String(popIndex));
        }
    }
    static cleanTempPopToStart() {
        sessionStorage.removeItem(HHStoredVarPrefixKey + 'Temp_PopUnableToStart');
        sessionStorage.removeItem(HHStoredVarPrefixKey + 'Temp_popToStart');
    }
    static removePopFromPopToStart(index) {
        var epop;
        var popToSart;
        var newPopToStart;
        popToSart = getStoredValue(HHStoredVarPrefixKey + "Temp_PopToStart") ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_PopToStart")) : [];
        newPopToStart = [];
        for (epop of popToSart) {
            if (epop != index) {
                newPopToStart.push(epop);
            }
        }
        setStoredValue(HHStoredVarPrefixKey + "Temp_PopToStart", JSON.stringify(newPopToStart));
    }
    static collectAndUpdate() {
        if (getPage() !== ConfigHelper.getHHScriptVars("pagesIDPowerplacemain")) {
            LogUtils_logHHAuto("Navigating to powerplaces main page.");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDPowerplacemain"));
            // return busy
            return true;
        }
        else {
            LogUtils_logHHAuto("On powerplaces main page.");
            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
            LogUtils_logHHAuto("setting autoloop to false");
            setStoredValue(HHStoredVarPrefixKey + "Temp_Totalpops", $("div.pop_list div[pop_id]").length); //Count how many different POPs there are and store them locally
            LogUtils_logHHAuto("totalpops : " + getStoredValue(HHStoredVarPrefixKey + "Temp_Totalpops"));
            var newFilter = "";
            if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoPowerPlacesInverted") === "true") {
                // starting from last one.
                $("div.pop_list div[pop_id]").each(function () { newFilter = ';' + $(this).attr('pop_id') + newFilter; });
            }
            else {
                $("div.pop_list div[pop_id]").each(function () { newFilter = newFilter + ';' + $(this).attr('pop_id'); });
            }
            if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoPowerPlacesAll") === "true") {
                setStoredValue(HHStoredVarPrefixKey + "Setting_autoPowerPlacesIndexFilter", newFilter.substring(1));
            }
            setStoredValue(HHStoredVarPrefixKey + "Temp_currentlyAvailablePops", newFilter.substring(1));
            //collect all
            let buttonClaimQuery = "button[rel='pop_thumb_claim'].purple_button_L:not([style])";
            if ($(buttonClaimQuery).length > 0) {
                $(buttonClaimQuery).first().trigger('click');
                LogUtils_logHHAuto("Claimed reward for PoP : " + $(buttonClaimQuery).first().parent().attr('pop_id'));
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDPowerplacemain"));
                return true;
            }
            var filteredPops = getStoredValue(HHStoredVarPrefixKey + "Setting_autoPowerPlacesIndexFilter") ? getStoredValue(HHStoredVarPrefixKey + "Setting_autoPowerPlacesIndexFilter").split(";") : [];
            var popUnableToStart = getStoredValue(HHStoredVarPrefixKey + "Temp_PopUnableToStart") ? getStoredValue(HHStoredVarPrefixKey + "Temp_PopUnableToStart").split(";") : [];
            //logHHAuto("filteredPops : "+filteredPops);
            var PopToStart = [];
            $("div.pop_thumb[status='pending_reward']").each(function () {
                var pop_id = $(this).attr('pop_id') || '';
                //if index is in filter
                if (filteredPops.includes(pop_id) && !popUnableToStart.includes(pop_id) && newFilter.includes(pop_id)) {
                    PopToStart.push(Number(pop_id));
                }
            });
            //get all already started Pop timers
            var currIndex;
            var currTime;
            var minTime = -1;
            var maxTime = -1;
            var e;
            clearTimer('minPowerPlacesTime');
            clearTimer('maxPowerPlacesTime');
            let popListRemaining = $('#pop_info .pop_thumb .pop_thumb_remaining > span');
            popListRemaining.each(function () {
                let $elem = $(this);
                let elementText = $elem.text();
                currIndex = $elem.parents('.pop_thumb_expanded').attr('pop_id');
                if (filteredPops.includes(currIndex) && !popUnableToStart.includes(currIndex)) {
                    currTime = convertTimeToInt($elem.text());
                    if (minTime === -1 || currTime === -1 || minTime > currTime) {
                        minTime = currTime;
                    }
                    if (maxTime === -1 || maxTime < currTime) {
                        maxTime = currTime;
                    }
                }
            });
            if (minTime != -1) {
                if (minTime > 7 * 60 * 60) {
                    //force check of PowerPlaces every 7 hours // TODO: check time 20min != 7h
                    setTimer('minPowerPlacesTime', randomInterval(20 * 60, 25 * 60));
                }
                else if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoPowerPlacesWaitMax") === "true" && maxTime != -1) {
                    setTimer('minPowerPlacesTime', Number(maxTime) + randomInterval(2 * 60, 5 * 60));
                }
                else {
                    setTimer('minPowerPlacesTime', Number(minTime) + randomInterval(1 * 60, 3 * 60));
                }
            }
            else {
                setTimer('minPowerPlacesTime', randomInterval(60, 100));
            }
            if (maxTime != -1) {
                setTimer('maxPowerPlacesTime', Number(maxTime) + randomInterval(1, 10));
            }
            //building list of Pop to start
            $("div.pop_thumb[status='can_start']").each(function () {
                var pop_id = $(this).attr('pop_id') || '';
                //if index is in filter
                if (filteredPops.includes(pop_id) && !popUnableToStart.includes(pop_id) && newFilter.includes(pop_id)) {
                    PopToStart.push(Number(pop_id));
                    clearTimer('minPowerPlacesTime');
                }
            });
            if (PopToStart.length === 0) {
                sessionStorage.removeItem(HHStoredVarPrefixKey + 'Temp_PopUnableToStart');
            }
            LogUtils_logHHAuto("build popToStart : " + PopToStart);
            setStoredValue(HHStoredVarPrefixKey + "Temp_PopToStart", JSON.stringify(PopToStart));
            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "true");
            setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey + "Temp_autoLoopTimeMili")));
            return false;
        }
    }
    static girlPower(powerRemaining, girlList, selectedGirls) {
        let subList = girlList;
        if (subList.length > 0) {
            let currentGirl = subList.pop();
            if (currentGirl.power <= powerRemaining) {
                selectedGirls.push(currentGirl);
                powerRemaining -= currentGirl.power;
            }
            ;
            selectedGirls = PlaceOfPower.girlPower(powerRemaining, subList, selectedGirls);
        }
        ;
        return selectedGirls;
    }
    // returns boolean to set busy
    static doPowerPlacesStuff(index) {
        if (getPage() !== "powerplace" + index) {
            LogUtils_logHHAuto("Navigating to powerplace" + index + " page.");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDActivities"), { tab: "pop", index: index });
            // return busy
            return true;
        }
        else {
            LogUtils_logHHAuto("On powerplace" + index + " page.");
            const debugEnabled = getStoredValue(HHStoredVarPrefixKey + "Temp_Debug") === 'true';
            //getting reward in case failed on main page
            var querySelectorText = "button[rel='pop_claim']:not([style*='display:none']):not([style*='display: none'])";
            if ($(querySelectorText).length > 0) {
                $(querySelectorText).click();
                LogUtils_logHHAuto("Claimed powerplace" + index);
                if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoPowerPlacesAll") !== "true") {
                    PlaceOfPower.cleanTempPopToStart();
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDPowerplacemain"));
                    return true;
                }
            }
            if ($("div.pop_right_part div.no_girls_message").length > 0) {
                PlaceOfPower.addPopToUnableToStart(index, "Unable to start Pop " + index + " no girls available.");
                PlaceOfPower.removePopFromPopToStart(index);
                return false;
            }
            if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoPowerPlacesPrecision") === "true") {
                if (document.getElementsByClassName("acting-power-text").length > 0) {
                    PlaceOfPower.selectGirls();
                }
                ;
                if (document.getElementsByClassName("pop_remaining").length > 0) {
                    if (document.getElementsByClassName("pop_remaining")[0].children.length > 0) {
                        const remainText = document.getElementsByClassName("pop_remaining")[0].children[0].innerText;
                        LogUtils_logHHAuto("PoP remainText: " + remainText);
                        if (debugEnabled)
                            LogUtils_logHHAuto("PoP acting-power-text: " + $('.acting-power-text').text());
                        const hasRemainDays = remainText.includes("d");
                        // If for some reason we cannot parse the text, set time too high to start
                        // This may cause undesirable loops but for now is considered better than having girls stuck in PoP for days
                        const remainHours = remainText.indexOf("h") ? parseInt(remainText.substring(remainText.indexOf("h") - 2, remainText.indexOf("h"))) : 9;
                        const remainMins = remainText.indexOf("m") ? parseInt(remainText.substring(remainText.indexOf("m") - 2, remainText.indexOf("m"))) : 59;
                        // If we weren't able to get under 9.5 hours, skip
                        if ((hasRemainDays) || (remainHours > 9) || ((remainHours == 9) && (remainMins > 30))) {
                            PlaceOfPower.addPopToUnableToStart(index, "Unable to start Pop " + index + " too much time remaining.");
                            PlaceOfPower.removePopFromPopToStart(index);
                            return false;
                        }
                        else {
                            querySelectorText = "button.blue_button_L[rel='pop_action']:not([disabled])";
                            if ($(querySelectorText).length > 0) {
                                document.querySelector(querySelectorText).click();
                                LogUtils_logHHAuto("Started powerplace" + index);
                            }
                            ;
                        }
                        ;
                    }
                    ;
                }
                ;
            }
            else {
                if ($("div.grid_view div.not_selected").length === 1) {
                    $("div.grid_view div.not_selected").click();
                    LogUtils_logHHAuto("Only one girl available for powerplace n°" + index + " assigning her.");
                }
                else {
                    querySelectorText = "button.blue_button_L[rel='pop_auto_assign']:not([disabled])";
                    if ($(querySelectorText).length > 0) {
                        document.querySelector(querySelectorText).click();
                        LogUtils_logHHAuto("Autoassigned powerplace" + index);
                    }
                }
                querySelectorText = "button.blue_button_L[rel='pop_action']:not([disabled])";
                if ($(querySelectorText).length > 0) {
                    document.querySelector(querySelectorText).click();
                    LogUtils_logHHAuto("Started powerplace" + index);
                }
                else if ($("button.blue_button_L[rel='pop_action'][disabled]").length > 0 && $("div.grid_view div.pop_selected").length > 0) {
                    PlaceOfPower.addPopToUnableToStart(index, "Unable to start Pop " + index + " not enough girls available.");
                    PlaceOfPower.removePopFromPopToStart(index);
                    return false;
                }
            }
            ;
            PlaceOfPower.removePopFromPopToStart(index);
            // Not busy
            return false;
        }
    }
    static getPowerNeeded() {
        const powerElement = document.getElementsByClassName("acting-power-text");
        let powerText = powerElement[0].innerText;
        powerText = powerText.substring(powerText.indexOf("/") + 1);
        if (powerText.includes("k") || powerText.includes("K")) {
            powerText = Math.round(parseFloat(powerText) * 1000);
        }
        else if (powerText.includes("m") || powerText.includes("M")) {
            powerText = Math.round(parseFloat(powerText) * 1000000);
        }
        else {
            powerText = parseInt(powerText);
        }
        return powerText;
    }
    static selectGirls() {
        const debugEnabled = getStoredValue(HHStoredVarPrefixKey + "Temp_Debug") === 'true';
        // How much power is needed
        const powerNeeded = PlaceOfPower.getPowerNeeded();
        // Goal is to select girls which add to required power without going over
        // Once completed, if the time will be under 7.5 hours, proceed
        let girlsList = [];
        if (document.querySelectorAll('[girl]').length > 0) {
            let availGirls = document.querySelectorAll('[girl]');
            availGirls.forEach(girl => {
                const girlObj = {
                    id: parseInt(girl.attributes["girl"].value),
                    power: parseInt(girl.attributes["skill"].value)
                };
                girlsList.push(girlObj);
            });
            girlsList.sort((a, b) => {
                return a.power - b.power;
            });
            const chosenTeam = PlaceOfPower.chooseGirlsTeam(powerNeeded, girlsList);
            availGirls.forEach(availGirlElement => {
                const availGirl = availGirlElement;
                chosenTeam.forEach(chosenGirl => {
                    if (parseInt(availGirl.attributes["girl"].value) == chosenGirl.id) {
                        availGirl.click();
                    }
                    ;
                });
            });
        }
        ;
    }
    static chooseGirlsTeam(powerText, girlsList) {
        //Debug can be enabled by manually setting "HHAuto_Temp_Debug" to true in browser console
        const debugEnabled = getStoredValue(HHStoredVarPrefixKey + "Temp_Debug") === 'true';
        let startTime = 0;
        if (debugEnabled) {
            LogUtils_logHHAuto("PoP debug is enabled");
            LogUtils_logHHAuto("PoP power needed:" + powerText);
            startTime = performance.now();
        }
        let girlOptions = [];
        for (let i = girlsList.length - 1; i >= 0; i--) {
            const loopGirls = girlsList.slice(0, i + 1);
            const loopPower = powerText;
            const loopOptions = PlaceOfPower.girlPower(loopPower, loopGirls, []);
            girlOptions.push(loopOptions);
        }
        ;
        let teamScore = 0;
        let chosenTeam = [];
        girlOptions.forEach((theseGirls) => {
            let thisPower = 0;
            theseGirls.forEach((girl) => {
                thisPower += girl.power;
            });
            // Give the team a score to try and use more efficient teams (ie: fewer girls) instead of just the fastest
            // const kValue = 40;
            const xValue = thisPower / powerText;
            // Reverted to previous algo, seems to work better for now...
            const thisScore = Math.min(1, ((xValue) * ((1 / Math.sqrt(theseGirls.length)) + 0.28)));
            // const thisScore = Math.min(1, ( (1 - Math.pow(xValue, theseGirls.length)) / (1 - Math.pow(xValue, kValue))));
            // if (debugEnabled) {
            //     logHHAuto("-----------------",
            //     {
            //         xValue: xValue,
            //         power: thisPower + ' / ' + powerText,
            //         score: thisScore + ' / ' + teamScore,
            //         scores:  Math.pow(xValue, theseGirls.length) + ' / ' + Math.pow(xValue, kValue),
            //         nbGirls: theseGirls.length
            //     } );
            // }
            if (thisScore > teamScore) {
                teamScore = thisScore;
                chosenTeam = theseGirls;
            }
            ;
        });
        if (debugEnabled) {
            const endTime = performance.now();
            LogUtils_logHHAuto("PoP precision: calculating this team took " + (endTime - startTime) + "ms");
            let teamPower = 0;
            chosenTeam.forEach((girl) => {
                teamPower += girl.power;
            });
            LogUtils_logHHAuto("PoP teamPower:" + teamPower);
            LogUtils_logHHAuto("PoP teamScore:" + teamScore);
            LogUtils_logHHAuto("PoP chosenTeam (" + chosenTeam.length + " girls):" + JSON.stringify(chosenTeam));
        }
        return chosenTeam;
    }
}

;// CONCATENATED MODULE: ./src/Module/Shop.ts





class Shop {
    static isTimeToCheckShop() {
        const updateMarket = getStoredValue(HHStoredVarPrefixKey + "Setting_updateMarket") === "true";
        const needBoosterStatus = Booster.needBoosterStatusFromStore();
        return (updateMarket || needBoosterStatus) && (getStoredValue(HHStoredVarPrefixKey + "Setting_paranoia") !== "true" || !checkTimer("paranoiaSwitch"));
    }
    static updateShop() {
        if (getPage() !== ConfigHelper.getHHScriptVars("pagesIDShop")) {
            LogUtils_logHHAuto("Navigating to Market window.");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDShop"));
            return true;
        }
        else {
            LogUtils_logHHAuto("Detected Market Screen. Fetching Assortment");
            var assA = [];
            var assB = [];
            var assG = [];
            var assP = [];
            $('#shops div.armor.merchant-inventory-item .slot').each(function () { if (this.dataset.d)
                assA.push(JSON.parse(this.dataset.d)); });
            $('#shops div.booster.merchant-inventory-item .slot').each(function () { if (this.dataset.d)
                assB.push(JSON.parse(this.dataset.d)); });
            $('#shops div.gift.merchant-inventory-item .slot').each(function () { if (this.dataset.d)
                assG.push(JSON.parse(this.dataset.d)); });
            $('#shops div.potion.merchant-inventory-item .slot').each(function () { if (this.dataset.d)
                assP.push(JSON.parse(this.dataset.d)); });
            var HaveAff = 0;
            var HaveExp = 0;
            var HaveBooster = {};
            $('#shops div.gift.player-inventory-content .slot').each(function () { if (this.dataset.d) {
                var d = JSON.parse(this.dataset.d);
                HaveAff += d.quantity * d.item.value;
            } });
            $('#shops div.potion.player-inventory-content .slot').each(function () { if (this.dataset.d) {
                var d = JSON.parse(this.dataset.d);
                HaveExp += d.quantity * d.item.value;
            } });
            $('#shops div.booster.player-inventory-content .slot').each(function () { if (this.dataset.d) {
                var d = JSON.parse(this.dataset.d);
                HaveBooster[d.item.identifier] = d.quantity;
            } });
            setStoredValue(HHStoredVarPrefixKey + "Temp_haveAff", HaveAff);
            setStoredValue(HHStoredVarPrefixKey + "Temp_haveExp", HaveExp);
            setStoredValue(HHStoredVarPrefixKey + "Temp_haveBooster", JSON.stringify(HaveBooster));
            LogUtils_logHHAuto('counted ' + getStoredValue(HHStoredVarPrefixKey + "Temp_haveAff") + ' Aff, ' + getStoredValue(HHStoredVarPrefixKey + "Temp_haveExp") + ' Exp, Booster: ' + JSON.stringify(HaveBooster));
            setStoredValue(HHStoredVarPrefixKey + "Temp_storeContents", JSON.stringify([assA, assB, assG, assP]));
            setStoredValue(HHStoredVarPrefixKey + "Temp_charLevel", getHHVars('Hero.infos.level'));
            var nshop;
            let shopFrozenTimer = $('.shop div.shop_count span[rel="expires"]').first().text();
            if (nshop === undefined && shopFrozenTimer.length > 0) {
                nshop = convertTimeToInt(shopFrozenTimer);
            }
            let shopTimer = 60;
            if (nshop !== undefined && nshop !== 0) {
                // if (Number(nshop)+1 > 2*60*60)
                // {
                //     shopTimer=2*60*60;
                // }
                // else
                // {
                shopTimer = Number(nshop) + 1;
                // }
            }
            setTimer('nextShopTime', shopTimer + randomInterval(60, 180));
            if (isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_LastPageCalled"))
                && getPage() === JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_LastPageCalled")).page) {
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                LogUtils_logHHAuto("Go to Home after Shopping");
            }
        }
        return false;
    }
    static moduleShopActions() {
        const itemsQuery = '#player-inventory.armor .slot:not(.empty):not([menuSellLocked]):not(.mythic)';
        appendMenuSell();
        /**
         * @return "potion" / "gift" / player-stats / armor / booster / null
         */
        function getShopType() {
            const shopSelected = $('section #shops #tabs-switcher .market-menu-switch-tab.active');
            if (shopSelected.length > 0) {
                return shopSelected.attr("type");
            }
            else {
                return null;
            }
        }
        function menuSellListItems() {
            if ($('#menuSellList>.tItems').length === 0) {
                GM_addStyle('.tItems {border-collapse: collapse;} '
                    + '.tItems td,th {border: 1px solid #1B4F72;} '
                    + '.tItemsColGroup {border: 3px solid #1B4F72;} '
                    + '.tItemsTh1 {background-color: #2874A6;color: #fff;} '
                    + '.tItemsTh2 {background-color: #3498DB;color: #fff;} '
                    + '.tItemsTBody tr:nth-child(odd) {background-color: #85C1E9;} '
                    + '.tItemsTBody tr:nth-child(even) {background-color: #D6EAF8;} '
                    + '.tItemsTdItems[itemsLockStatus="allLocked"] {color: #FF0000} '
                    + '.tItemsTdItems[itemsLockStatus="noneLocked"] {color: #1B4F72}'
                    + '.tItemsTdItems[itemsLockStatus="someLocked"] {color: #FFA500}');
            }
            let itemsCaracsNb = 16;
            let itemsCaracs = [];
            for (let i = 1; i < itemsCaracsNb + 1; i++) {
                itemsCaracs.push(i);
            }
            itemsCaracs.push('mythic'); // Needed for mythic equipement, can't use generic method for them
            let itemsRarity = ["common", "rare", "epic", "legendary", "mythic"];
            let itemsLockedStatus = ["not_locked", "locked"];
            let itemsTypeNb = 6;
            let itemsType = [];
            for (let i = 1; i < itemsTypeNb + 1; i++) {
                itemsType.push(i);
            }
            let itemsList = {};
            for (let c of itemsCaracs) {
                let filteredCarac;
                if (c === 'mythic') {
                    filteredCarac = $('#player-inventory.armor .slot:not(.empty)[data-d*=\'"rarity":"mythic"\']');
                }
                else {
                    filteredCarac = $('#player-inventory.armor .slot:not(.empty)[data-d*=\'"name_add":' + c + '\']');
                }
                itemsList[c] = {};
                for (let t of itemsType) {
                    let filteredType = filteredCarac.filter('[data-d*=\'"subtype":' + t + '\']');
                    itemsList[c][t] = {};
                    for (let r of itemsRarity) {
                        let filteredRarity = filteredType.filter('[data-d*=\'"rarity":"' + r + '"\']');
                        itemsList[c][t][r] = {};
                        for (let l of itemsLockedStatus) {
                            let filteredStatus = filteredRarity.filter(l === "locked" ? '[menuSellLocked]' : ':not([menuSellLocked])');
                            itemsList[c][t][r][l] = filteredStatus.length;
                        }
                    }
                }
            }
            let itemsListMenu = '<table class="tItems">'
                + ' <colgroup class="tItemsColGroup">'
                + '  <col class="tItemsColRarity">'
                + ' </colgroup>'
                + ' <colgroup class="tItemsColGroup">'
                + '  <col class="tItemsColRarity" span="6">'
                + ' </colgroup>'
                + ' <colgroup class="tItemsColGroup">'
                + '  <col class="tItemsColRarity" span="6">'
                + ' </colgroup>'
                + ' <colgroup class="tItemsColGroup">'
                + '  <col class="tItemsColRarity" span="6">'
                + ' </colgroup>'
                + ' <colgroup class="tItemsColGroup">'
                + '  <col class="tItemsColRarity" span="6">'
                + ' </colgroup>'
                + ' <colgroup class="tItemsColGroup">'
                + '  <col class="tItemsColRarity" span="6">'
                + ' </colgroup>'
                + ' <thead class="tItemsTHead">'
                + '  <tr>'
                + '   <th class="tItemsTh1">' + getTextForUI("Rarity", "elementText") + '</th>'
                + '   <th class="tItemsTh1" menuSellFilter="c:*;t:*;r:' + itemsRarity[0] + '" colspan="6">' + getTextForUI("RarityCommon", "elementText") + '</th>'
                + '   <th class="tItemsTh1" menuSellFilter="c:*;t:*;r:' + itemsRarity[1] + '" colspan="6">' + getTextForUI("RarityRare", "elementText") + '</th>'
                + '   <th class="tItemsTh1" menuSellFilter="c:*;t:*;r:' + itemsRarity[2] + '" colspan="6">' + getTextForUI("RarityEpic", "elementText") + '</th>'
                + '   <th class="tItemsTh1" menuSellFilter="c:*;t:*;r:' + itemsRarity[3] + '" colspan="6">' + getTextForUI("RarityLegendary", "elementText") + '</th>'
                + '   <th class="tItemsTh1" menuSellFilter="c:*;t:*;r:' + itemsRarity[4] + '" colspan="6">' + getTextForUI("RarityMythic", "elementText") + '</th>'
                + '  </tr>'
                + '  <tr>'
                + '   <th class="tItemsTh2">' + getTextForUI("equipementCaracs", "elementText") + '/' + getTextForUI("equipementType", "elementText") + '</th>';
            for (let r of itemsRarity) {
                itemsListMenu += '   <th class="tItemsTh2" menuSellFilter="c:*;t:' + itemsType[0] + ';r:' + r + '">' + getTextForUI("equipementHead", "elementText") + '</th>'
                    + '   <th class="tItemsTh2" menuSellFilter="c:*;t:' + itemsType[1] + ';r:' + r + '">' + getTextForUI("equipementBody", "elementText") + '</th>'
                    + '   <th class="tItemsTh2" menuSellFilter="c:*;t:' + itemsType[2] + ';r:' + r + '">' + getTextForUI("equipementLegs", "elementText") + '</th>'
                    + '   <th class="tItemsTh2" menuSellFilter="c:*;t:' + itemsType[3] + ';r:' + r + '">' + getTextForUI("equipementFlag", "elementText") + '</th>'
                    + '   <th class="tItemsTh2" menuSellFilter="c:*;t:' + itemsType[4] + ';r:' + r + '">' + getTextForUI("equipementPet", "elementText") + '</th>'
                    + '   <th class="tItemsTh2" menuSellFilter="c:*;t:' + itemsType[5] + ';r:' + r + '">' + getTextForUI("equipementWeapon", "elementText") + '</th>';
            }
            itemsListMenu += '  </tr>'
                + ' </thead>'
                + ' <tbody class="tItemsTBody">';
            for (let c of itemsCaracs) {
                if (c === 'mythic') {
                    itemsListMenu += '  <tr>'
                        + '   <td class="type" menuSellFilter="c:' + c + ';t:*;r:*">' + getTextForUI("RarityMythic", "elementText") + '</td>';
                }
                else {
                    let ext = (c === 16) ? "svg" : "png";
                    itemsListMenu += '  <tr>'
                        + '   <td class="type" menuSellFilter="c:' + c + ';t:*;r:*"><img style="height:20px;width:20px" src="' + ConfigHelper.getHHScriptVars("baseImgPath") + '/pictures/misc/items_icons/' + c + '.' + ext + '"></td>';
                }
                for (let r of itemsRarity) {
                    for (let t of itemsType) {
                        let allItems = itemsList[c][t][r];
                        let total = allItems[itemsLockedStatus[0]] + allItems[itemsLockedStatus[1]];
                        let displayNb = allItems[itemsLockedStatus[0]] + '/' + total;
                        let itemsLockStatus;
                        if (total === 0) {
                            displayNb = "";
                        }
                        if (allItems[itemsLockedStatus[1]] === 0) {
                            //no lock
                            itemsLockStatus = "noneLocked";
                        }
                        else if (allItems[itemsLockedStatus[1]] === total) {
                            //all locked
                            itemsLockStatus = "allLocked";
                        }
                        else {
                            //some locked
                            itemsLockStatus = "someLocked";
                        }
                        itemsListMenu += '   <td class="tItemsTdItems" itemsLockStatus="' + itemsLockStatus + '" menuSellFilter="c:' + c + ';t:' + t + ';r:' + r + '"' + '>' + displayNb + '</td>';
                    }
                }
                itemsListMenu += '  </tr>';
            }
            itemsListMenu += ' </tbody>'
                + '</table>';
            $("#menuSellList").html(itemsListMenu);
            function setSlotFilter(inCaracsValue, inTypeValue, inRarityValue, inLockedValue) {
                let filter = '#player-inventory.armor .slot:not(.empty)';
                if (inCaracsValue !== "*") {
                    filter += '[data-d*=\'"name_add":"' + inCaracsValue + '"\']';
                }
                if (inTypeValue !== "*") {
                    filter += '[data-d*=\'"subtype":"' + inTypeValue + '"\']';
                }
                if (inRarityValue !== "*") {
                    filter += '[data-d*=\'"rarity":"' + inRarityValue + '"\']';
                }
                if (inLockedValue === "locked" || inLockedValue === true) {
                    filter += '[menuSellLocked]';
                }
                else {
                    filter += ':not([menuSellLocked])';
                }
                return filter;
            }
            function setCellsFilter(inCaracsValue, inTypeValue, inRarityValue) {
                let filter = 'table.tItems [menuSellFilter*="';
                if (inCaracsValue !== "*") {
                    filter += 'c:' + inCaracsValue + ';';
                }
                if (inTypeValue !== "*") {
                    filter += 't:' + inTypeValue + ';';
                }
                if (inRarityValue !== "*") {
                    filter += 'r:' + inRarityValue;
                }
                filter += '"]';
                return filter;
            }
            $('table.tItems [menuSellFilter] ').each(function () {
                this.addEventListener("click", function () {
                    const menuSellFilter = (this.getAttribute("menuSellFilter") || '').split(";");
                    let toLock = !(this.getAttribute("itemsLockStatus") === "allLocked");
                    let c = menuSellFilter[0].split(":")[1];
                    let t = menuSellFilter[1].split(":")[1];
                    let r = menuSellFilter[2].split(":")[1];
                    AllLockUnlock(setSlotFilter(c, t, r, !toLock), toLock);
                    let newLockStatus = toLock ? "allLocked" : "noneLocked";
                    $(setCellsFilter(c, t, r)).each(function () {
                        this.setAttribute("itemsLockStatus", newLockStatus);
                    });
                });
            });
        }
        function AllLockUnlock(inFilter, lock) {
            if (lock) {
                $(inFilter).each(function () {
                    this.setAttribute("menuSellLocked", "");
                    $(this).prepend('<img class="menuSellLocked" style="position:absolute;width:32px;height:32px" src="https://i.postimg.cc/PxgxrBVB/Opponent-red.png">');
                });
            }
            else {
                $(inFilter).each(function () {
                    this.removeAttribute("menuSellLocked");
                    this.querySelector("img.menuSellLocked").remove();
                });
            }
        }
        function lockUnlock(inFilter) {
            if ($(inFilter).length > 0) {
                let currentLock = $(inFilter)[0].getAttribute("menuSellLocked");
                if (currentLock === null) {
                    $(inFilter)[0].setAttribute("menuSellLocked", "");
                    $(inFilter).prepend('<img class="menuSellLocked" style="position:absolute;width:32px;height:32px" src="https://i.postimg.cc/PxgxrBVB/Opponent-red.png">');
                }
                else {
                    $(inFilter)[0].removeAttribute("menuSellLocked");
                    $(inFilter + " img.menuSellLocked")[0].remove();
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
        function appendMenuSell() {
            let menuID = "SellDialog";
            if (getShopType() !== "armor") {
                if (document.getElementById(menuID) !== null) {
                    try {
                        $(document).off('ajaxComplete', checkAjaxComplete);
                        for (let menu of ["menuSell", "menuSellLock", "menuSellMaskLocked"]) {
                            const GMMenuID = GM_registerMenuCommand(getTextForUI(menu, "elementText"), function () { });
                            $("#" + menu).remove();
                            GM_unregisterMenuCommand(GMMenuID);
                        }
                        $("#" + menuID).remove();
                    }
                    catch (e) {
                        LogUtils_logHHAuto("Catched error : Couldn't remove " + menuID + " menu : " + e);
                    }
                }
                return;
            }
            else if (document.getElementById(menuID) !== null) {
                document.getElementById("menuSellCurrentCount").innerHTML = $(itemsQuery).length + '';
                return;
            }
            GM_addStyle('#SellDialog .close {   position: absolute;   top: 0;   right: 30px;   transition: all 200ms;   font-size: 50px;   font-weight: bold;   text-decoration: none;   color: #333; } '
                + '#SellDialog .close:hover {   color: #06D85F; }'
                + '#SellDialog p { font-size: 15px; }'
                + '#SellDialog p.intro { margin: 0; }'
                + '#SellDialog .myButton { font-size: 12px; min-width: 100px; text-align: center; }'
                + '#SellDialog td.type { text-align: center; }');
            var menuSellLock = '<div style="position: absolute;right: 220px;top: 70px" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("menuSellLock", "tooltip") + '</span><label style="width:70px" class="myButton" id="menuSellLock">' + getTextForUI("menuSellLock", "elementText") + '</label></div>';
            var menuSellMaskLocked = '<div style="position: absolute;right: 140px;top: 70px" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("menuSellMaskLocked", "tooltip") + '</span><label style="width:70px" class="myButton" id="menuSellMaskLocked">' + getTextForUI("menuSellMaskLocked", "elementText") + '</label></div>';
            var menuSell = '<div style="position: absolute;right: 300px;top: 70px" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("menuSell", "tooltip") + '</span><label style="width:70px" class="myButton" id="menuSell">' + getTextForUI("menuSell", "elementText") + '</label></div>'
                + '<dialog style="overflow-y:auto;max-width:95%;max-height:95%;"id="SellDialog"><a class="close" id="SellDialogClose">&times;</a><form stylemethod="dialog">'
                + '<div style="padding:0 10px; display:flex;flex-direction:column;">'
                + '<p class="intro">' + getTextForUI("menuSellText", "elementText") + '</p>'
                + '<div class="HHMenuRow">'
                + '<p>' + getTextForUI("menuSellCurrentCount", "elementText") + '</p>'
                + '<p id="menuSellCurrentCount">0</p>'
                + '</div>'
                + '<div id="menuSellStop"><label style="width:80px" class="myButton" id="menuSellStop">' + getTextForUI("OptionStop", "elementText") + '</label></div>'
                + '<div id="menuSellHide" style="display:none">'
                + '<p id="menuSellList" style="margin:0;"></p>'
                + '<div class="HHMenuRow">'
                + '<div style="padding:10px;" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("menuSellButton", "tooltip") + '</span><label class="myButton" id="menuSellButton">' + getTextForUI("menuSellButton", "elementText") + '</label></div>'
                + '<div style="padding:10px;" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("menuSellNumber", "tooltip") + '</span><input id="menuSellNumber" style="width:80%;height:20px" required pattern="' + HHAuto_inputPattern.menuSellNumber + '" type="text" value="0"></div>'
                + '</div>'
                + '</div>'
                + '<div id="menuSoldHide" style="display:none">'
                + '<div class="HHMenuRow">'
                + '<p>' + getTextForUI("menuSoldText", "elementText") + '</p>'
                + '<p id="menuSoldCurrentCount">0</p>'
                + '</div>'
                + '<p id="menuSoldMessage">0</p>'
                + '</div>'
                + '</div>'
                + '<menu> <label style="margin-left:800px" class="myButton" id="menuSellCancel">' + getTextForUI("OptionCancel", "elementText") + '</label></menu></form></dialog>';
            initMenuSell();
            initMenuSellLock();
            initMenuSellMaskLocked();
            GM_registerMenuCommand(getTextForUI("menuSell", "elementText"), displayMenuSell);
            GM_registerMenuCommand(getTextForUI("menuSellLock", "elementText"), launchMenuSellLock);
            GM_registerMenuCommand(getTextForUI("menuSellMaskLocked", "elementText"), launchMenuSellMaskLocked);
            $(document).on('ajaxComplete', checkAjaxComplete);
            function initMenuSell() {
                $('#player-inventory.armor').append(menuSell);
                const closeSellDialog = function () {
                    const SellDialog = document.getElementById("SellDialog");
                    if (typeof SellDialog.showModal !== "function") {
                        alert("The <dialog> API is not supported by this browser");
                        return;
                    }
                    $('#player-inventory.armor .slot:not(.empty)[canBeSold]').removeAttr('canBeSold');
                    SellDialog.close();
                };
                $("#menuSell").on("click", displayMenuSell);
                $("#menuSellCancel").on("click", closeSellDialog);
                $("#SellDialogClose").on("click", closeSellDialog);
                $("#menuSellStop").on("click", function () {
                    this.style.display = "none";
                    menuSellStop = true;
                });
                $("#menuSellButton").on("click", function () {
                    if (Number(document.getElementById("menuSellNumber").value) > 0) {
                        LogUtils_logHHAuto("Starting selling " + Number(document.getElementById("menuSellNumber").value) + " items.");
                        sellArmorItems();
                    }
                });
            }
            function displayMenuSell() {
                const SellDialog = document.getElementById("SellDialog");
                if (typeof SellDialog.showModal !== "function") {
                    alert("The <dialog> API is not supported by this browser");
                    LogUtils_logHHAuto("The <dialog> API is not supported by this browser");
                    return;
                }
                menuSellMaxItems = Number(window.prompt("Max amount of inventory to load (all for no limit)", menuSellMaxItems + ''));
                if (menuSellMaxItems !== null) {
                    menuSellMaxItems = isNaN(menuSellMaxItems) ? Number.MAX_VALUE : menuSellMaxItems;
                    LogUtils_logHHAuto(`Going to load ${menuSellMaxItems} items`);
                    $("menuSellStop").css("display", "block");
                    menuSellStop = false;
                    fetchStarted = true;
                    unsafeWindow.loadingAnimation.start = function () { };
                    unsafeWindow.loadingAnimation.stop = function () { };
                    if ($('#menuSellList>.tItems').length === 0) {
                        menuSellListItems();
                    }
                    $("#menuSellHide").css("display", "block");
                    SellDialog.showModal();
                    $("#menuSellHide").css("display", "none");
                    fetchAllArmorItems();
                }
            }
            function initMenuSellMaskLocked() {
                $('#player-inventory.armor').append(menuSellMaskLocked);
                $("#menuSellMaskLocked").on("click", launchMenuSellMaskLocked);
            }
            function launchMenuSellMaskLocked() {
                $("#player-inventory.armor .slot[menuSellLocked]").each(function () {
                    $(this).parent().toggle();
                });
            }
            function initMenuSellLock() {
                $('#player-inventory.armor').append(menuSellLock);
                $("#menuSellLock").on("click", launchMenuSellLock);
            }
            function launchMenuSellLock() {
                let filterText = "#player-inventory.armor .slot.selected";
                if ($(filterText).length > 0) {
                    let toLock = $(filterText)[0].getAttribute("menuSellLocked") === null;
                    AllLockUnlock(filterText, toLock);
                }
            }
        }
        function checkAjaxComplete(event, request, settings) {
            let match = settings.data.match(/action=market_get_armor&id_member_armor=(\d+)/);
            if (match === null)
                return;
            allLoaded = request.responseJSON.items.length === 0 && request.responseJSON.success; // No more to load
            if (fetchStarted) {
                setTimeout(fetchAllArmorItems, randomInterval(800, 1600));
            }
        }
        function fetchAllArmorItems() {
            let oldCount = $(itemsQuery).length;
            $("#menuSellCurrentCount").html(oldCount + '');
            if (allLoaded) {
                LogUtils_logHHAuto(`No more items to load, currently: ${oldCount}/${menuSellMaxItems}`);
            }
            else {
                LogUtils_logHHAuto(`Loading items, currently: ${oldCount}/${menuSellMaxItems}`);
            }
            let scroll = $("#player-inventory.armor")[0];
            const SellDialog = document.getElementById("SellDialog");
            if (menuSellStop || allLoaded || oldCount >= Number(menuSellMaxItems) || !SellDialog.open) {
                $("#menuSellStop").css("display", "none");
                unsafeWindow.loadingAnimation.start = loadingAnimationStart;
                unsafeWindow.loadingAnimation.stop = loadingAnimationStop;
                fetchStarted = false;
                scroll.scrollTop = 0;
                if (SellDialog.open) {
                    $("#menuSellHide").css("display", "block");
                    menuSellListItems();
                }
                else {
                    LogUtils_logHHAuto('Sell Dialog closed, stopping');
                }
                return;
            }
            scroll.scrollTop = scroll.scrollHeight - scroll.offsetHeight;
        }
        function sellArmorEnded() {
            $("#menuSellHide").css("display", "block");
            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "true");
            setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey + "Temp_autoLoopTimeMili")));
        }
        function sellArmorItems() {
            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
            LogUtils_logHHAuto("setting autoloop to false");
            LogUtils_logHHAuto('start selling common, rare and epic stuff');
            $("#menuSellHide").css("display", "none");
            $("#menuSoldHide").css("display", "block");
            // Scroll to top
            $('#player-inventory').animate({ scrollTop: 0 });
            var initialNumberOfItems = $(itemsQuery).length;
            var itemsToSell = Number(document.getElementById("menuSellNumber").value);
            $("#menuSoldCurrentCount").html("0/" + itemsToSell);
            $("#menuSoldMessage").html("");
            let PlayerClass = getHHVars('Hero.infos.class') === null ? $('#equiped > div.icon.class_change_btn').attr('carac') : getHHVars('Hero.infos.class');
            function sellingEnd(message) {
                $("#menuSoldMessage").html(message);
                menuSellListItems();
                sellArmorEnded();
            }
            function selling_func() {
                const SellDialog = document.getElementById("SellDialog");
                if ($('#player-inventory.armor').length === 0) {
                    LogUtils_logHHAuto('Wrong tab');
                    sellArmorEnded();
                    return;
                }
                else if (!SellDialog.open) {
                    LogUtils_logHHAuto('Sell Dialog closed, stopping');
                    sellArmorEnded();
                    return;
                }
                let availebleItems = $(itemsQuery);
                let currentNumberOfItems = availebleItems.length;
                if (currentNumberOfItems === 0) {
                    LogUtils_logHHAuto('no more items for sale');
                    sellingEnd(getTextForUI("menuSoldMessageNoMore", "elementText"));
                    return;
                }
                if (initialNumberOfItems < currentNumberOfItems) {
                    LogUtils_logHHAuto('Some items was loaded in the background, can\'t continue');
                    sellingEnd(getTextForUI("menuSoldMessageErrorLoaded", "elementText"));
                    return;
                }
                //console.log(initialNumberOfItems,currentNumberOfItems);
                if ((initialNumberOfItems - currentNumberOfItems) >= itemsToSell) {
                    LogUtils_logHHAuto('Reach wanted sold items.');
                    sellingEnd(getTextForUI("menuSoldMessageReachNB", "elementText"));
                    return;
                }
                //check Selected item - can we sell it?
                if (availebleItems.filter('.selected').length > 0) {
                    let can_sell = false;
                    //Non legendary or with specific attribute
                    if (availebleItems.filter('.selected').filter(':not(.legendary),[canBeSold]').length > 0) {
                        can_sell = true;
                    }
                    LogUtils_logHHAuto('can be sold ' + can_sell + ' : ' + availebleItems.filter('.selected')[0].getAttribute('data-d'));
                    if (can_sell) {
                        $('#shops .menu-switch-tab-content.active button.green_text_button[rel=sell]').click();
                        let currSellNumber = Number((initialNumberOfItems - currentNumberOfItems) + 1);
                        $("#menuSoldCurrentCount").html(currSellNumber + "/" + itemsToSell);
                        $("#menuSellCurrentCount").html($(itemsQuery).length + '');
                        setTimeout(selling_func, randomInterval(300, 700));
                        return;
                    }
                }
                //Find new sellable items
                if (availebleItems.filter(':not(.selected):not(.legendary),[canBeSold]').length > 0) {
                    //Select first non legendary item
                    //Or select item that checked before and can be sold
                    availebleItems.filter(':not(.selected):not(.legendary):not(.mythic),[canBeSold]')[0].click();
                    setTimeout(selling_func, randomInterval(300, 700));
                    return;
                }
                else if (availebleItems.filter(':not(.selected)').length > 0) {
                    let typesOfSets = ['EQ-LE-06', 'EQ-LE-05', 'EQ-LE-04', 'EQ-LE-0' + PlayerClass];
                    let caracsOfSets = ['carac' + PlayerClass, 'chance', 'endurance', 'carac' + PlayerClass];
                    //[MaxCarac,Index]
                    let arraysOfSets = [
                        [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]], //'EQ-LE-06'
                        [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]], //'EQ-LE-05'
                        [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]], //'EQ-LE-04'
                        [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]] //'EQ-LE-0'+ PlayerClass
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
                    for (let i4 = 0; i4 < availebleItems.length; i4++) {
                        let sellableItemObj = JSON.parse($(availebleItems[i4]).attr('data-d') || '');
                        let indexType = typesOfSets.indexOf(sellableItemObj.id_equip);
                        if (indexType == -1) {
                            //console.log('can_sell2');
                            availebleItems[i4].setAttribute('canBeSold', '');
                        }
                        else {
                            let currentBest = arraysOfSets[indexType][sellableItemObj.subtype];
                            let itemCarac = sellableItemObj[caracsOfSets[indexType]];
                            //checking best gear in inventory based on best class stat
                            if (currentBest[0] < itemCarac) {
                                currentBest[0] = itemCarac;
                                if (currentBest[1] >= 0) {
                                    availebleItems[currentBest[1]].setAttribute('canBeSold', '');
                                }
                                currentBest[1] = i4;
                            }
                            else {
                                availebleItems[i4].setAttribute('canBeSold', '');
                            }
                        }
                    }
                    if ($('#player-inventory.armor [canBeSold]:not([menuSellLocked]):not(.mythic)').length == 0) {
                        LogUtils_logHHAuto('no more items for sale');
                        sellingEnd(getTextForUI("menuSoldMessageReachNB", "elementText"));
                        return;
                    }
                }
                setTimeout(selling_func, randomInterval(300, 700));
            }
            selling_func();
        }
    }
}

;// CONCATENATED MODULE: ./src/Module/TeamModule.ts



class TeamModule {
    static resetTeam() {
        $('#clear-team').click();
    }
    static validateTeam() {
        $('#validate-team').click();
    }
    static moduleChangeTeam() {
        if (document.getElementById("ChangeTeamButton") !== null || document.getElementById("ChangeTeamButton2") !== null) {
            return;
        }
        let ChangeTeamButton = '<div style="position: absolute;left: 60%;top: 110px;width:60px;z-index:10" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("ChangeTeamButton", "tooltip") + '</span><label style="font-size:small" class="myButton" id="ChangeTeamButton">' + getTextForUI("ChangeTeamButton", "elementText") + '</label></div>';
        let ChangeTeamButton2 = '<div style="position: absolute;left: 60%;top: 180px;width:60px;z-index:10" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("ChangeTeamButton2", "tooltip") + '</span><label style="font-size:small" class="myButton" id="ChangeTeamButton2">' + getTextForUI("ChangeTeamButton2", "elementText") + '</label></div>';
        GM_addStyle('.topNumber{top: 2px;left: 12px;width: 100%;position: absolute;text-shadow: 1px 1px 1px black, -1px -1px 1px black;}');
        $("#contains_all section").append(ChangeTeamButton);
        $("#contains_all section").append(ChangeTeamButton2);
        function assignTopTeam() {
            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
            LogUtils_logHHAuto("setting autoloop to false");
            function selectFromHaremBest(i, best) {
                let girlToSelect = best ? i : i + 7;
                //console.log(i,girlToSelect,best);
                let selectedGirl = $('#contains_all section ' + ConfigHelper.getHHScriptVars("IDpanelEditTeam") + ' .harem-panel .panel-body .topNumber[position="' + girlToSelect + '"]');
                selectedGirl.click();
                //console.log(selectedGirl);
                if ($('.topNumber').length > girlToSelect && i < 7) {
                    setTimeout(function () { assignToTeam(i + 1, best); }, randomInterval(300, 600));
                }
                else {
                    if (!best) {
                        assignToTeam(1, true);
                    }
                    else {
                        TeamModule.validateTeam();
                    }
                }
            }
            function assignToTeam(i = 1, best = false) {
                let position = i - 1;
                let selectedPosition = $('#contains_all section .player-panel .player-team .team-hexagon .team-member-container.selectable[data-team-member-position="' + position + '"]');
                selectedPosition.click();
                //console.log(selectedPosition);
                setTimeout(function () { selectFromHaremBest(i, best); }, randomInterval(300, 600));
            }
            let topNumbers = $('.topNumber');
            if (topNumbers.length > 0) {
                TeamModule.resetTeam();
                assignToTeam(1, true); // true = jump to best team directly
            }
        }
        function setTopTeam(sumFormulaType) {
            let arr = $('div[id_girl]');
            let numTop = 16;
            if (numTop > arr.length)
                numTop = arr.length;
            let deckID = [];
            let deckStat = [];
            for (let z = 0; z < numTop; z++) {
                deckID.push(-1);
                deckStat.push(-1);
            }
            let levelPlayer = Number(getHHVars('Hero.infos.level'));
            for (let i = arr.length - 1; i > -1; i--) {
                let gID = Number($(arr[i]).attr('id_girl'));
                const tooltipData = $('.girl_img', $(arr[i])).attr(ConfigHelper.getHHScriptVars('girlToolTipData')) || '';
                if (tooltipData == '') {
                    LogUtils_logHHAuto('ERROR, no girl information found');
                    return;
                }
                let obj = JSON.parse(tooltipData);
                //sum formula
                let tempGrades = obj.graded2;
                //console.log(obj,tempGrades);
                let countTotalGrades = (tempGrades.match(/<g/g) || []).length;
                let countFreeGrades = (tempGrades.match(/grey/g) || []).length;
                let currentStat = obj.caracs.carac1 + obj.caracs.carac2 + obj.caracs.carac3;
                //console.log(currentStat);
                if (sumFormulaType == 1) {
                    currentStat = obj.caracs.carac1 + obj.caracs.carac2 + obj.caracs.carac3;
                }
                else if (sumFormulaType == 2) {
                    currentStat = (obj.caracs.carac1 + obj.caracs.carac2 + obj.caracs.carac3) / obj.level * levelPlayer / (1 + 0.3 * (countTotalGrades - countFreeGrades)) * (1 + 0.3 * (countTotalGrades));
                }
                //console.log(obj.level,levelPlayer,countTotalGrades,countFreeGrades);
                //console.log(currentStat);
                let lowNum = 0; //num
                let lowStat = deckStat[0]; //stat
                for (let j = 1; j < deckID.length; j++) {
                    if (deckStat[j] < lowStat) {
                        lowNum = j;
                        lowStat = deckStat[j];
                    }
                }
                if (lowStat < currentStat) {
                    deckID[lowNum] = gID;
                    deckStat[lowNum] = currentStat;
                }
            }
            let tmpID = 0;
            let tmpStat = 0;
            //console.log(deckStat,deckID);
            for (let i = 0; i < deckStat.length; i++) {
                for (let j = i; j < deckStat.length; j++) {
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
            for (let i = arr.length - 1; i > -1; i--) {
                let gID = Number($(arr[i]).attr('id_girl'));
                if (!deckID.includes(gID)) {
                    arr[i].style.display = "none";
                }
                else {
                    arr[i].style.display = "";
                }
            }
            let mainTeamPanel = $(ConfigHelper.getHHScriptVars("IDpanelEditTeam") + ' .change-team-panel .panel-body > .harem-panel-girls');
            for (let j = 0; j < deckID.length; j++) {
                let newDiv;
                let arrSort = $('div[id_girl=' + deckID[j] + ']');
                if ($(arrSort[0]).find('.topNumber').length == 0) {
                    newDiv = document.createElement("div");
                    newDiv.className = "topNumber";
                    arrSort[0].prepend(newDiv);
                }
                else {
                    newDiv = $(arrSort[0]).find('.topNumber')[0];
                }
                $(arrSort[0]).find('.topNumber')[0];
                newDiv.innerText = j + 1;
                newDiv.setAttribute('position', j + 1);
                // Go to girl update page on double click
                newDiv.setAttribute("ondblclick", "window.location.href='/girl/" + deckID[j] + "'");
                mainTeamPanel.append(arrSort[0]);
            }
            if (document.getElementById("AssignTopTeam") !== null) {
                return;
            }
            else {
                let AssignTopTeam = '<div style="position: absolute;top: 92px;width:100px;z-index:10;margin-left:90px" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("AssignTopTeam", "tooltip") + '</span><label style="font-size:small" class="myButton" id="AssignTopTeam">' + getTextForUI("AssignTopTeam", "elementText") + '</label></div>';
                $("#contains_all section " + ConfigHelper.getHHScriptVars("IDpanelEditTeam") + " .harem-panel .panel-body").append(AssignTopTeam);
                $("#AssignTopTeam").on("click", assignTopTeam);
            }
        }
        $("#ChangeTeamButton").on("click", () => { setTopTeam(1); });
        $("#ChangeTeamButton2").on("click", () => { setTopTeam(2); });
    }
}

;// CONCATENATED MODULE: ./src/Module/index.ts

























;// CONCATENATED MODULE: ./src/config/HHEnvVariables.ts


const HHKnownEnvironnements = {};
HHKnownEnvironnements["www.hentaiheroes.com"] = { name: "HH_prod", id: "hh_hentai" };
HHKnownEnvironnements["test.hentaiheroes.com"] = { name: "HH_test", id: "hh_hentai" };
HHKnownEnvironnements["www.comixharem.com"] = { name: "CH_prod", id: "hh_comix", baseImgPath: "https://ch.hh-content.com" };
HHKnownEnvironnements["www.gayharem.com"] = { name: "GH_prod", id: "hh_gay" };
HHKnownEnvironnements["www.hornyheroes.com"] = { name: "SH_prod", id: "hh_sexy" };
HHKnownEnvironnements["nutaku.comixharem.com"] = { name: "NCH_prod", id: "hh_comix" };
HHKnownEnvironnements["nutaku.haremheroes.com"] = { name: "NHH_prod", id: "hh_hentai" };
HHKnownEnvironnements["nutaku.gayharem.com"] = { name: "NGH_prod", id: "hh_gay" };
HHKnownEnvironnements["thrix.hentaiheroes.com"] = { name: "THH_prod", id: "hh_hentai" };
HHKnownEnvironnements["eroges.gayharem.com"] = { name: "EGH_prod", id: "hh_gay" };
HHKnownEnvironnements["eroges.hentaiheroes.com"] = { name: "EHH_prod", id: "hh_hentai" };
HHKnownEnvironnements["esprit.hentaiheroes.com"] = { name: "OGHH_prod", id: "hh_hentai" };
HHKnownEnvironnements["www.pornstarharem.com"] = { name: "PH_prod", id: "hh_star", baseImgPath: "https://th.hh-content.com" };
HHKnownEnvironnements["nutaku.pornstarharem.com"] = { name: "NPH_prod", id: "hh_star", baseImgPath: "https://th.hh-content.com" };
HHKnownEnvironnements["www.transpornstarharem.com"] = { name: "TPH_prod", id: "hh_startrans", baseImgPath: "https://images.hh-content.com/startrans" };
HHKnownEnvironnements["nutaku.transpornstarharem.com"] = { name: "NTPH_prod", id: "hh_startrans", baseImgPath: "https://images.hh-content.com/startrans" };
HHKnownEnvironnements["www.mangarpg.com"] = { name: "MRPG_prod", id: "hh_mangarpg", baseImgPath: "https://mh.hh-content.com" };
HHKnownEnvironnements["www.gaypornstarharem.com"] = { name: "GPSH_prod", id: "hh_stargay", baseImgPath: "https://images.hh-content.com/stargay" };
HHKnownEnvironnements["nutaku.gaypornstarharem.com"] = { name: "NGPSH_prod", id: "hh_stargay", baseImgPath: "https://images.hh-content.com/stargay" };
const HHEnvVariables = {};
HHEnvVariables["global"] = {};
for (let i in HHKnownEnvironnements) {
    HHEnvVariables[HHKnownEnvironnements[i].name] = {};
    HHEnvVariables[HHKnownEnvironnements[i].name].gameID = HHKnownEnvironnements[i].id;
    HHEnvVariables[HHKnownEnvironnements[i].name].HHGameName = HHKnownEnvironnements[i].name;
    let baseImgPath = HHKnownEnvironnements[i].baseImgPath ? HHKnownEnvironnements[i].baseImgPath : 'https://hh2.hh-content.com';
    HHEnvVariables[HHKnownEnvironnements[i].name].baseImgPath = baseImgPath;
}
HHEnvVariables["global"].eventIDReg = "event_";
HHEnvVariables["global"].mythicEventIDReg = "mythic_event_";
HHEnvVariables["global"].bossBangEventIDReg = "boss_bang_event_";
HHEnvVariables["global"].sultryMysteriesEventIDReg = "sm_event_";
HHEnvVariables["global"].doublePenetrationEventIDReg = "dp_event_";
HHEnvVariables["global"].poaEventIDReg = "path_event_";
HHEnvVariables["global"].girlToolTipData = "data-new-girl-tooltip";
HHEnvVariables["global"].dailyRewardNotifRequest = "#contains_all header .currency .daily-reward-notif";
HHEnvVariables["global"].IDpanelEditTeam = "#edit-team-page";
HHEnvVariables["global"].shopGirlCountRequest = '#girls_list .g1 .nav_placement span:not([contenteditable]';
HHEnvVariables["global"].shopGirlCurrentRequest = '#girls_list .g1 .nav_placement span[contenteditable]';
HHEnvVariables["global"].selectorFilterNotDisplayNone = ':not([style*="display:none"]):not([style*="display: none"])';
HHEnvVariables["global"].selectorClaimAllRewards = "#claim-all:not([disabled]):visible:not([style*='visibility: hidden;'])"; // KK use visibility: hidden or visibility: visible to display this button
HHEnvVariables["global"].HaremMaxSizeExpirationSecs = 7 * 24 * 60 * 60; //7 days
HHEnvVariables["global"].HaremMinSizeExpirationSecs = 24 * 60 * 60; //1 days
HHEnvVariables["global"].LeagueListExpirationSecs = 2 * 60; //2 min
HHEnvVariables["global"].minSecsBeforeGoHomeAfterActions = 10;
HHEnvVariables["global"].dailyRewardMaxRemainingTime = 2 * 60 * 60;
HHEnvVariables["global"].maxCollectionDelay = 6 * 60 * 60;
HHEnvVariables["global"].STOCHASTIC_SIM_RUNS = 10000;
HHEnvVariables["global"].PoVPoGTimestampAttributeName = "data-time-stamp";
HHEnvVariables["global"].CHAMP_TICKET_PRICE = 30;
HHEnvVariables["global"].LEVEL_MIN_POV = 30;
HHEnvVariables["global"].LEVEL_MIN_POG = 30;
HHEnvVariables["global"].LEVEL_MIN_LEAGUE = 20;
HHEnvVariables["global"].LEVEL_MIN_PANTHEON = 15;
HHEnvVariables["global"].LEVEL_MIN_EVENT_SM = 15;
HHEnvVariables["global"].boosterId_MB1 = 632;
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
        plus: "https://i.postimg.cc/qgkpN0sZ/Opponent-green.png",
        close: "https://i.postimg.cc/3JCgVBdK/Opponent-orange.png",
        minus: "https://i.postimg.cc/PxgxrBVB/Opponent-red.png",
        chosen: "https://i.postimg.cc/MfKwNbZ8/Opponent-go.png"
    };
HHEnvVariables["global"].possibleRewardsList = { 'energy_kiss': "Kisses",
    'energy_quest': "Quest energy",
    'energy_fight': "Fights",
    'xp': "Exp",
    'girl_shards': "Girl shards",
    'random_girl_shards': "Random girl shards",
    'soft_currency': "Ymens",
    'hard_currency': "Kobans",
    'gift': "Gifts",
    'potion': "Potions",
    'booster': "Boosters",
    'orbs': "Orbs",
    'gems': "Gems",
    'scrolls': "Light Bulbs",
    'mythic': "Mythic Rquipment",
    'avatar': "Avatar",
    'ticket': "Champions' tickets",
    'event_cash': "Event cash",
    'rejuvenation_stone': "Rejuvenation Stones" };
HHEnvVariables["global"].trollzList = ["Latest",
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
    "Auga",
    "Gross"];
HHEnvVariables["global"].trollIdMapping = []; // Empty means no specific mapping
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
    [['547099506', '572827174', '653889168'], [0], [0]],
];
HHEnvVariables["global"].lastQuestId = 1820; //  TODO update when new quest comes
HHEnvVariables["global"].leaguesList = ["Wanker I",
    "Wanker II",
    "Wanker III",
    "Sexpert I",
    "Sexpert II",
    "Sexpert III",
    "Dicktator I",
    "Dicktator II",
    "Dicktator III"];
switch (getLanguageCode()) {
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
            "Auga",
            "Gross"];
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
function compareOwnFirst(a, b, final_comparaison) {
    if (a.is_owned && !b.is_owned) {
        return -1;
    }
    else if (!a.is_owned && b.is_owned) {
        return 1;
    }
    return final_comparaison;
}
HHEnvVariables["global"].haremSortingFunctions = {};
HHEnvVariables["global"].haremSortingFunctions.date_recruited =
    HHEnvVariables["global"].haremSortingFunctions.DateAcquired = function (a, b) {
        if (a.gData.is_owned && b.gData.is_owned) {
            var dateA = new Date(a.gData.date_added).getTime();
            var dateB = new Date(b.gData.date_added).getTime();
            return dateA - dateB;
        }
        else if (a.gData.is_owned && !b.gData.is_owned)
            return -1;
        else if (!a.gData.is_owned && b.gData.is_owned)
            return 1;
        else
            return b.shards - a.shards;
    };
HHEnvVariables["global"].haremSortingFunctions.Name = function sortByName(a, b) {
    var nameA = a.gData.name.toUpperCase();
    var nameB = b.gData.name.toUpperCase();
    if (a.gData.is_owned == b.gData.is_owned) {
        if (nameA < nameB)
            return -1;
        if (nameA > nameB)
            return 1;
        return 0;
    }
    else if (a.gData.is_owned && !b.gData.is_owned)
        return -1;
    else if (!a.gData.is_owned && b.gData.is_owned)
        return 1;
};
HHEnvVariables["global"].haremSortingFunctions.Grade = function sortByGrade(a, b) {
    return compareOwnFirst(a.gData, b.gData, b.gData.graded - a.gData.graded);
};
HHEnvVariables["global"].haremSortingFunctions.Level = function sortByLevel(a, b) {
    return compareOwnFirst(a.gData, b.gData, b.gData.level - a.gData.level);
};
HHEnvVariables["global"].haremSortingFunctions.Power = function sortByPower(a, b) {
    return compareOwnFirst(a.gData, b.gData, b.gData.caracs.carac1 + b.gData.caracs.carac2 + b.gData.caracs.carac3 - a.gData.caracs.carac1 - a.gData.caracs.carac2 - a.gData.caracs.carac3);
};
HHEnvVariables["global"].haremSortingFunctions.upgrade_cost = function sortByUpgradeCost(a, b) {
    const aCost = (Number(a.gData.nb_grades) === Number(a.gData.graded) || !a.gData.is_owned) ? 0 : Harem.getGirlUpgradeCost(a.gData.rarity, a.gData.graded + 1);
    const bCost = (Number(b.gData.nb_grades) === Number(b.gData.graded) || !b.gData.is_owned) ? 0 : Harem.getGirlUpgradeCost(b.gData.rarity, b.gData.graded + 1);
    return compareOwnFirst(a.gData, b.gData, bCost - aCost);
};
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
HHEnvVariables["global"].pagesURLLeaderboard = "/leagues.html";
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
HHEnvVariables["global"].pagesIDLabyrinth = "labyrinth";
HHEnvVariables["global"].pagesURLabyrinth = "/labyrinth.html";
HHEnvVariables["global"].pagesKnownList.push("Labyrinth");
HHEnvVariables["global"].pagesIDLabyrinthPreBattle = "labyrinth-pre-battle";
HHEnvVariables["global"].pagesURLLabyrinthPreBattle = "/labyrinth-pre-battle.html";
HHEnvVariables["global"].pagesKnownList.push("LabyrinthPreBattle");
HHEnvVariables["global"].pagesIDLabyrinthBattle = "labyrinth-battle";
HHEnvVariables["global"].pagesURLLabyrinthBattle = "/labyrinth-battle.html";
HHEnvVariables["global"].pagesKnownList.push("LabyrinthBattle");
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
HHEnvVariables["global"].pagesIDWaifu = "waifu";
HHEnvVariables["global"].pagesURLWaifu = "/waifu.html";
HHEnvVariables["global"].pagesKnownList.push("Waifu");
HHEnvVariables["global"].pagesIDBattleTeams = "teams";
HHEnvVariables["global"].pagesURLBattleTeams = "/teams.html";
HHEnvVariables["global"].pagesKnownList.push("BattleTeams");
HHEnvVariables["global"].pagesIDEditTeam = "edit-team";
HHEnvVariables["global"].pagesURLEditTeam = "/edit-team.html";
HHEnvVariables["global"].pagesKnownList.push("EditTeam");
HHEnvVariables["global"].pagesIDPoA = "path_of_attraction";
HHEnvVariables["global"].pagesKnownList.push("PoA");
HHEnvVariables["global"].pagesIDBossBang = "boss-bang-battle";
HHEnvVariables["global"].pagesKnownList.push("BossBang");
HHEnvVariables["global"].pagesIDSexGodPath = "sex-god-path";
HHEnvVariables["global"].pagesURLSexGodPath = "/sex-god-path.html";
HHEnvVariables["global"].pagesKnownList.push("SexGodPath");
HHEnvVariables["global"].pagesIDLabyrinthEntrance = "labyrinth-entrance";
HHEnvVariables["global"].pagesURLLabyrinthEntrance = "/labyrinth-entrance.html";
HHEnvVariables["global"].pagesKnownList.push("LabyrinthEntrance");
HHEnvVariables["global"].pagesIDLabyrinthPoolSelect = "labyrinth-pool-select";
HHEnvVariables["global"].pagesURLLabyrinthPoolSelect = "/labyrinth-pool-select.html";
HHEnvVariables["global"].pagesKnownList.push("LabyrinthPoolSelect");
HHEnvVariables["global"].pagesIDEditLabyrinthTeam = "edit-labyrinth-team";
HHEnvVariables["global"].pagesURLEditLabyrinthTeam = "/edit-labyrinth-team.html";
HHEnvVariables["global"].pagesKnownList.push("EditLabyrinthTeam");
HHEnvVariables["global"].pagesIDMemberProgression = "member-progression";
HHEnvVariables["global"].pagesURLMemberProgression = "/member-progression.html";
HHEnvVariables["global"].pagesKnownList.push("MemberProgression");
HHEnvVariables["global"].pagesIDHeroPage = "hero_pages";
HHEnvVariables["global"].pagesURLHeroPage = "/hero/profile.html";
HHEnvVariables["global"].pagesKnownList.push("HeroPage");
HHEnvVariables["global"].pagesIDGirlEquipmentUpgrade = "girl-equipment-upgrade";
HHEnvVariables["global"].pagesURLGirlEquipmentUpgrade = "girl-equipment-upgrade.html";
HHEnvVariables["global"].pagesKnownList.push("GirlEquipmentUpgrade");
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
HHEnvVariables["global"].isEnabledLabyrinth = true;
HHEnvVariables["global"].isEnabledAllChamps = true;
HHEnvVariables["global"].isEnabledChamps = true;
HHEnvVariables["global"].isEnabledClubChamp = true;
HHEnvVariables["global"].isEnabledLeagues = true;
HHEnvVariables["global"].isEnabledDailyRewards = true;
HHEnvVariables["global"].isEnabledFreeBundles = true;
HHEnvVariables["global"].isEnabledShop = true;
HHEnvVariables["global"].isEnabledSalary = true;
HHEnvVariables["global"].isEnabledPoV = true;
HHEnvVariables["global"].isEnabledPoG = true;
HHEnvVariables["global"].isEnabledSeasonalEvent = true;
HHEnvVariables["global"].isEnabledBossBangEvent = true;
HHEnvVariables["global"].isEnabledDPEvent = true;
HHEnvVariables["global"].isEnabledSultryMysteriesEvent = true;
HHEnvVariables["global"].isEnabledDailyGoals = true;
HHEnvVariables["HH_test"].isEnabledDailyRewards = false; // to remove if daily rewards arrives in test
HHEnvVariables["HH_test"].isEnabledFreeBundles = false; // to remove if bundles arrives in test
["GH_prod", "NGH_prod", "EGH_prod"].forEach((element) => {
    HHEnvVariables[element].trollzList = ['Latest',
        'Dark Lord',
        'Ninja Spy',
        'Gruntt',
        'Edward',
        'Donatien',
        'Silvanus',
        'Bremen',
        'Edernas',
        'Fredy Sih Roko Senseï',
        'Maro',
        'Jackson&#8217;s Crew',
        'Icarus Warlock',
        'Sol'];
    switch (getLanguageCode()) {
        case "fr":
            HHEnvVariables[element].trollzList[2] = 'Espion Ninja';
            HHEnvVariables[element].trollzList[11] = 'Éq. de Jackson';
            HHEnvVariables[element].trollzList[12] = 'Sorcier Icarus';
            break;
        case "de":
            HHEnvVariables[element].trollzList[1] = 'Dunkler Lor';
            HHEnvVariables[element].trollzList[2] = 'Ninjaspion';
            HHEnvVariables[element].trollzList[11] = 'Jacksons Crew';
            break;
        default:
            break;
    }
});
["CH_prod", "NCH_prod"].forEach((element) => {
    HHEnvVariables[element].trollzList = ['Latest',
        'BodyHack',
        'Grey Golem',
        'The Nymph',
        'Athicus Ho’ole',
        'The Mimic',
        'Cockatrice',
        'Pomelo',
        'Alexa Sl\'Thor',
        'D\'KLONG',
        'Virtue Man'];
});
["CH_prod", "NCH_prod"].forEach((element) => {
    HHEnvVariables[element].trollGirlsID = [
        [['830009523', '907801218', '943323021'], [0], [0]],
        [['271746999', '303805209', '701946373'], [0], [0]],
        [['743748788', '977228200', '943323021'], [0], [0]],
        [['140401381', '232860230', '514994766'], [0], [0]],
        [['623293037', '764791769', '801271903'], [0], [0]],
        [['921365371', '942523553', '973271744'], [0], [0]],
        [['364639341', '879781833', '895546748'], [0], [0]],
        [['148877065', '218927643', '340369336'], [0], [0]],
        [['258185125', '897951171', '971686222'], [0], [0]],
    ];
    HHEnvVariables[element].lastQuestId = -1; //  TODO update when new quest comes
    HHEnvVariables[element].boosterId_MB1 = 2619;
});
HHEnvVariables["SH_prod"].isEnabledSideQuest = false; // to remove when SideQuest arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPowerPlaces = false; // to remove when PoP arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledMythicPachinko = false; // to remove when Mythic Pachinko arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledEquipmentPachinko = false; // to remove when Equipment Pachinko arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledAllChamps = false; // to remove when Champs arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledChamps = false; // to remove when Champs arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledClubChamp = false; // to remove when Club Champs arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPantheon = false; // to remove when Pantheon arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledLabyrinth = false; // to remove when Pantheon arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPoV = false; // to remove when PoV arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPoG = false; // to remove when PoG arrives in hornyheroes
HHEnvVariables["SH_prod"].lastQuestId = -1; //  TODO update when new quest comes
HHEnvVariables["MRPG_prod"].isEnabledSideQuest = false; // to remove when SideQuest arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledMythicPachinko = false; // to remove when Mythic Pachinko arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledEquipmentPachinko = false; // to remove when Equipment Pachinko arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledClubChamp = false; // to remove when Club Champs arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledPantheon = false; // to remove when Pantheon arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledLabyrinth = false; // to remove when Pantheon arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledSeasonalEvent = false; // to remove when event arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledBossBangEvent = false; // to remove when event arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledSultryMysteriesEvent = false; // to remove when event arrives in Manga RPG
HHEnvVariables["MRPG_prod"].lastQuestId = -1; //  TODO update when new quest comes
HHEnvVariables["MRPG_prod"].trollzList = ['Latest',
    'William Scarlett'];
["PH_prod", "NPH_prod"].forEach((element) => {
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
        'Jasmine Jae',
        'Bella Rose',
        'Paige Taylor'];
    HHEnvVariables[element].trollIdMapping = { 10: 9, 14: 11, 16: 12, 18: 13, 19: 14 }; // under 10 id as usual
    HHEnvVariables[element].lastQuestId = 16100; //  TODO update when new quest comes
    HHEnvVariables[element].boosterId_MB1 = 2619;
});
["PH_prod", "NPH_prod"].forEach((element) => {
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
        [['270920965', '600910475', '799448349'], [0], [0]],
    ];
});
["TPH_prod", "NTPH_prod"].forEach((element) => {
    HHEnvVariables[element].trollzList = ['Latest',
        'Ariel Demure',
        'Emma Rose',
        'Natalie Stone',
        'Janie Blade',
        'Nikki Nort',
        'Mistress Venom'];
    HHEnvVariables[element].isEnabledSideQuest = false; // to remove when SideQuest arrives in transpornstar
    HHEnvVariables[element].isEnabledClubChamp = false; // to remove when Club Champs arrives in transpornstar
    HHEnvVariables[element].isEnabledPantheon = false; // to remove when Pantheon arrives in transpornstar
    HHEnvVariables[element].isEnabledLabyrinth = false; // to remove when Pantheon arrives in transpornstar
    HHEnvVariables[element].isEnabledPoG = false; // to remove when PoG arrives in transpornstar
    HHEnvVariables[element].lastQuestId = -1; //  TODO update when new quest comes
});
["TPH_prod", "NTPH_prod"].forEach((element) => {
    HHEnvVariables[element].trollGirlsID = [
        [['171883542', '229180984', '771348244'], [0], [0]],
        [['484962893', '879574564', '910924260'], [0], [0]],
        [['334144727', '667194919', '911144911'], [0], [0]],
        [['473470854', '708191289', '945710078'], [0], [0]],
        [['104549634', '521022556', '526732951'], [0], [0]],
        [['317800067', '542090972', '920682672'], [0], [0]],
    ];
    HHEnvVariables[element].lastQuestId = -1; //  TODO update when new quest comes
});
["GPSH_prod", "NGPSH_prod"].forEach((element) => {
    HHEnvVariables[element].trollzList = ['Latest',
        'Tristan Hunter',
        'Troll 2'];
    HHEnvVariables[element].isEnabledSideQuest = false; // to remove when SideQuest arrives in gaypornstar
    HHEnvVariables[element].isEnabledPowerPlaces = false; // to remove when PoP arrives in gaypornstar
    HHEnvVariables[element].isEnabledMythicPachinko = false; // to remove when Champs arrives in gaypornstar
    HHEnvVariables[element].isEnabledClubChamp = false; // to remove when Club Champs arrives in gaypornstar
    HHEnvVariables[element].isEnabledPantheon = false; // to remove when Pantheon arrives in gaypornstar
    HHEnvVariables[element].isEnabledLabyrinth = false; // to remove when Pantheon arrives in gaypornstar
    HHEnvVariables[element].isEnabledPoG = false; // to remove when PoG arrives in gaypornstar
    HHEnvVariables[element].trollGirlsID = [
        [['780402171', '374763633', '485499759'], [0], [0]],
        [[0, 0, 0], [0], [0]], // TODO get girls id
    ];
    HHEnvVariables[element].lastQuestId = -1; //  TODO update when new quest comes
    HHEnvVariables[element].boosterId_MB1 = 2619;
});
// Object.values(girlsDataList).filter(girl => girl.source?.name == "troll_tier" && girl.source?.group?.id == "7")

;// CONCATENATED MODULE: ./src/config/HHStoredVars.ts


const HHStoredVars_HHStoredVars = {};
//Settings Vars
const HHStoredVarPrefixKey = "HHAuto_"; // default HHAuto_
//Do not move, has to be first one
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_settPerTab"] =
    {
        default: "false",
        storage: "localStorage",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
// Rest of settings vars
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoAff"] =
    {
        default: "500000000",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Long Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoAffW"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoBuyBoosters"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: true
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoBuyBoostersFilter"] =
    {
        default: "B1;B2;B3;B4",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "List",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoChamps"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
        newValueFunction: function () {
            clearTimer('nextChampionTime');
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoChampAlignTimer"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoChampsForceStart"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
        newValueFunction: function () {
            clearTimer('nextChampionTime');
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoChampsFilter"] =
    {
        default: "1;2;3;4;5;6",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "List",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false,
        newValueFunction: function () {
            clearTimer('nextChampionTime');
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoChampsTeamLoop"] =
    {
        default: "10",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoChampsGirlThreshold"] =
    {
        default: "0",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Long Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoChampsTeamKeepSecondLine"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoChampsUseEne"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_showClubButtonInPoa"] =
    {
        default: "true",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoClubChamp"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
        newValueFunction: function () {
            clearTimer('nextClubChampionTime');
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoClubChampMax"] =
    {
        default: "999",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoClubForceStart"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
        newValueFunction: function () {
            clearTimer('nextClubChampionTime');
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoContest"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_compactEndedContests"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoExp"] =
    {
        default: "500000000",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Long Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoExpW"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoFreePachinko"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
        newValueFunction: function () {
            clearTimer('nextPachinkoTime');
            clearTimer('nextPachinko2Time');
            clearTimer('nextPachinkoEquipTime');
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoLeagues"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
        newValueFunction: function () {
            clearTimer('nextLeaguesTime');
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoLeaguesAllowWinCurrent"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoLeaguesCollect"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoLeaguesBoostedOnly"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoLeaguesRunThreshold"] =
    {
        default: "0",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoLeaguesForceOneFight"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_leagueListDisplayPowerCalc"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
        newValueFunction: function () {
            deleteStoredValue(HHStoredVarPrefixKey + "Temp_LeagueOpponentList");
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoLeaguesSelectedIndex"] =
    {
        default: "0",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "selectedIndex",
        kobanUsing: false,
        customMenuID: "autoLeaguesSelector",
        isValid: /^[0-9]$/
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoLeaguesSortIndex"] =
    {
        default: "1",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "selectedIndex",
        kobanUsing: false,
        customMenuID: "autoLeaguesSortMode",
        isValid: /^[0-9]$/,
        newValueFunction: function () {
            deleteStoredValue(HHStoredVarPrefixKey + "Temp_LeagueOpponentList");
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoLeaguesThreshold"] =
    {
        default: "0",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoLeaguesSecurityThreshold"] =
    {
        default: "40",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_compactMissions"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoMission"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoMissionCollect"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoMissionKFirst"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_compactPowerPlace"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoPowerPlaces"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoPowerPlacesAll"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
        newValueFunction: function () {
            clearTimer('minPowerPlacesTime');
            PlaceOfPower.cleanTempPopToStart();
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoPowerPlacesPrecision"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoPowerPlacesInverted"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoPowerPlacesWaitMax"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoPowerPlacesIndexFilter"] =
    {
        default: "1;2;3",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "List",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false,
        newValueFunction: function () {
            clearTimer('minPowerPlacesTime');
            PlaceOfPower.cleanTempPopToStart();
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoQuest"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoSideQuest"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoQuestThreshold"] =
    {
        default: "0",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoSalary"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
        newValueFunction: function () {
            clearTimer('nextSalaryTime');
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoSalaryResetFilters"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoSalaryMaxTimer"] =
    {
        default: "1200",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Long Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
/*HHStoredVars[HHStoredVarPrefixKey+"Setting_autoSalaryMinTimer"] =
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
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoSalaryMinSalary"] =
    {
        default: "20000",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Long Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false,
        newValueFunction: function () {
            clearTimer('nextSalaryTime');
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoSeason"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
        newValueFunction: function () {
            clearTimer('nextSeasonTime');
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoSeasonCollect"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
        events: { "change": function () {
                if (this.checked) {
                    getAndStoreCollectPreferences(HHStoredVarPrefixKey + "Setting_autoSeasonCollectablesList");
                    clearTimer('nextSeasonCollectTime');
                }
            }
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoSeasonCollectAll"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoSeasonCollectablesList"] =
    {
        default: JSON.stringify([]),
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Array"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoSeasonPassReds"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: true
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoSeasonThreshold"] =
    {
        default: "0",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoSeasonRunThreshold"] =
    {
        default: "0",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoSeasonBoostedOnly"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoStats"] =
    {
        default: "500000000",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Long Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoStatsSwitch"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoTrollBattle"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoTrollMythicByPassParanoia"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoTrollSelectedIndex"] =
    {
        default: "0",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false,
        customMenuID: "autoTrollSelector",
        isValid: /^[0-9]|1[0-5]|98|99$/
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoTrollThreshold"] =
    {
        default: "0",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoTrollRunThreshold"] =
    {
        default: "0",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoChampsForceStartEventGirl"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_buyCombat"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: true
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_buyCombTimer"] =
    {
        default: "16",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_buyMythicCombat"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: true
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_buyMythicCombTimer"] =
    {
        default: "16",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoFreeBundlesCollect"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
        events: { "change": function () {
                if (this.checked) {
                    getAndStoreCollectPreferences(HHStoredVarPrefixKey + "Setting_autoFreeBundlesCollectablesList", getTextForUI("menuDailyCollectableText", "elementText"));
                    clearTimer('nextFreeBundlesCollectTime');
                }
            }
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoFreeBundlesCollectablesList"] =
    {
        default: JSON.stringify([]),
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Array"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_waitforContest"] =
    {
        default: "true",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_safeSecondsForContest"] =
    {
        default: "120",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_mousePause"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_mousePauseTimeout"] =
    {
        default: "5000",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_collectAllTimer"] =
    {
        default: "12",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        isValid: /^[1-9][0-9]|[1-9]$/
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_eventTrollOrder"] =
    {
        default: "1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "List",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoBuyTrollNumber"] =
    {
        default: "20",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "List",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoBuyMythicTrollNumber"] =
    {
        default: "20",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "List",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_master"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_maxAff"] =
    {
        default: "50000",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Long Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_maxBooster"] =
    {
        default: "10",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Long Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_maxExp"] =
    {
        default: "10000",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Long Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_minShardsX10"] =
    {
        default: "10",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false,
        isValid: /^(\d)+$/
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_minShardsX50"] =
    {
        default: "50",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_updateMarket"] =
    {
        default: "true",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_paranoia"] =
    {
        default: "true",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
        newValueFunction: function () {
            clearTimer('paranoiaSwitch');
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_paranoiaSettings"] =
    {
        default: "140-320/Sleep:28800-30400|Active:250-460|Casual:1500-2700/6:Sleep|8:Casual|10:Active|12:Casual|14:Active|18:Casual|20:Active|22:Casual|24:Sleep",
        storage: "Storage()",
        HHType: "Setting"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_paranoiaSpendsBefore"] =
    {
        default: "true",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_plusEvent"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_plusEventMythic"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_plusEventMythicSandalWood"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autodpEventCollect"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
        events: { "change": function () {
                if (this.checked) {
                    getAndStoreCollectPreferences(HHStoredVarPrefixKey + "Setting_autodpEventCollectablesList");
                    clearTimer('nextdpEventCollectTime');
                }
            }
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autodpEventCollectablesList"] =
    {
        default: JSON.stringify([]),
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Array"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autodpEventCollectAll"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_bossBangEvent"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_bossBangMinTeam"] =
    {
        default: "5",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_sultryMysteriesEventRefreshShop"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_collectEventChest"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_PoAMaskRewards"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_PoVMaskRewards"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_PoGMaskRewards"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_SeasonMaskRewards"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_SeasonalEventMaskRewards"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_showCalculatePower"] =
    {
        default: "true",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_showAdsBack"] =
    {
        default: "true",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_showRewardsRecap"] =
    {
        default: "true",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_hideOwnedGirls"] =
    {
        default: "true",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_showInfo"] =
    {
        default: "true",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_showInfoLeft"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_showMarketTools"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_showTooltips"] =
    {
        default: "true",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_spendKobans0"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_kobanBank"] =
    {
        default: "1000000",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Long Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_useX10Fights"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: true
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_useX10FightsAllowNormalEvent"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_useX50Fights"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: true
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_useX50FightsAllowNormalEvent"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_saveDefaults"] =
    {
        storage: "localStorage",
        HHType: "Setting"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoPantheon"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoPantheonThreshold"] =
    {
        default: "0",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoPantheonRunThreshold"] =
    {
        default: "0",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Small Integer",
        getMenu: true,
        setMenu: true,
        menuType: "value",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoPantheonBoostedOnly"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoLabyrinth"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoSeasonalEventCollect"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
        events: { "change": function () {
                if (this.checked) {
                    getAndStoreCollectPreferences(HHStoredVarPrefixKey + "Setting_autoSeasonalEventCollectablesList");
                    clearTimer('nextSeasonalEventCollectTime');
                }
            }
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoSeasonalEventCollectAll"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoSeasonalEventCollectablesList"] =
    {
        default: JSON.stringify([]),
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Array"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoPoVCollect"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
        events: { "change": function () {
                if (this.checked) {
                    getAndStoreCollectPreferences(HHStoredVarPrefixKey + "Setting_autoPoVCollectablesList");
                    clearTimer('nextPoVCollectTime');
                }
            }
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoPoVCollectAll"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoPoVCollectablesList"] =
    {
        default: JSON.stringify([]),
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Array"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoPoGCollect"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
        events: { "change": function () {
                if (this.checked) {
                    getAndStoreCollectPreferences(HHStoredVarPrefixKey + "Setting_autoPoGCollectablesList");
                    clearTimer('nextPoGCollectTime');
                }
            }
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoPoGCollectAll"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoPoGCollectablesList"] =
    {
        default: JSON.stringify([]),
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Array"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoPoACollect"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
        events: { "change": function () {
                if (this.checked) {
                    getAndStoreCollectPreferences(HHStoredVarPrefixKey + "Setting_autoPoACollectablesList");
                    clearTimer('nextPoACollectTime');
                }
            }
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoPoACollectAll"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoPoACollectablesList"] =
    {
        default: JSON.stringify([]),
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Array"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_compactDailyGoals"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoDailyGoalsCollect"] =
    {
        default: "false",
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Boolean",
        getMenu: true,
        setMenu: true,
        menuType: "checked",
        kobanUsing: false,
        events: { "change": function () {
                if (this.checked) {
                    getAndStoreCollectPreferences(HHStoredVarPrefixKey + "Setting_autoDailyGoalsCollectablesList", getTextForUI("menuDailyCollectableText", "elementText"));
                    clearTimer('nextDailyGoalsCollectTime');
                }
            }
        }
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Setting_autoDailyGoalsCollectablesList"] =
    {
        default: JSON.stringify([]),
        storage: "Storage()",
        HHType: "Setting",
        valueType: "Array"
    };
// Temp vars
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_scriptversion"] =
    {
        default: "0",
        storage: "localStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_autoLoop"] =
    {
        default: "true",
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_battlePowerRequired"] =
    {
        default: "0",
        storage: "sessionStorage",
        HHType: "Temp"
    };
/*HHStoredVars[HHStoredVarPrefixKey+"Temp_leaguesTarget"] =
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
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_lastActionPerformed"] =
    {
        default: "none",
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_questRequirement"] =
    {
        default: "none",
        storage: "sessionStorage",
        HHType: "Temp"
    };
/*HHStoredVars[HHStoredVarPrefixKey+"Temp_userLink"] =
    {
    default:"none",
    storage:"sessionStorage",
    HHType:"Temp"
};*/
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_autoLoopTimeMili"] =
    {
        default: "1000",
        storage: "Storage()",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_freshStart"] =
    {
        default: "no",
        storage: "Storage()",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_Logging"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_Debug"] =
    {
        default: "false",
        storage: "sessionStorage",
        valueType: "Boolean",
        HHType: "Temp"
    };
/*HHStoredVars[HHStoredVarPrefixKey+"Temp_trollToFight"] =
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
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_autoTrollBattleSaveQuest"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_burst"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_charLevel"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_filteredGirlsList"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_haremGirlActions"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_haremGirlMode"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_haremGirlPayLast"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_haremGirlEnd"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_haremGirlLimit"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_eventsGirlz"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_eventGirl"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_eventMythicGirl"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_autoChampsEventGirls"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
        //isValid:/^\[({"girl_id":"(\d)+","champ_id":"(\d)+","girl_shards":"(\d)+","girl_name":"([^"])+","event_id":"([^"])+"},?)+\]$/
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_clubChampLimitReached"] =
    {
        default: "false",
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_trollWithGirls"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_fought"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_haveAff"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_haveExp"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_haveBooster"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_hideBeatenOppo"] =
    {
        default: "0",
        storage: "Storage()",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_LeagueOpponentList"] =
    {
        storage: "sessionStorage",
        HHType: "Temp",
        //isValid:/^{"expirationDate":\d+,"opponentsList":{("\d+":{((("(win|loss|avgTurns)":\d*[.,]?\d+)|("scoreClass":"(minus|plus|close)")|("points":{("\d{1,3}":\d*[.,]?\d+,?)+})),?)+},?)+}}$/
    };
/*
HHStoredVars[HHStoredVarPrefixKey+"Temp_LeagueTempOpponentList"] =
    {
    storage:"sessionStorage",
    HHType:"Temp",
    isValid:/^{"expirationDate":\d+,"opponentsList":{("\d+":{((("(win|loss|avgTurns|expectedValue)":\d*[.,]?\d+)|("scoreClass":"(minus|plus|close)")|("points":{("\d{1,3}":\d*[.,]?\d+,?)+})),?)+},?)+}}$/
};*/
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_paranoiaLeagueBlocked"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_paranoiaQuestBlocked"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_paranoiaSpendings"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_pinfo"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_PopToStart"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_PopUnableToStart"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_storeContents"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_Timers"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_NextSwitch"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_Totalpops"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_currentlyAvailablePops"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_CheckSpentPoints"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_eventsList"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_bossBangTeam"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_boosterStatus"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_sandalwoodFailure"] =
    {
        default: "0",
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_LeagueSavedData"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_LeagueHumanLikeRun"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_TrollHumanLikeRun"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_TrollInvalid"] =
    {
        default: "false",
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_PantheonHumanLikeRun"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_SeasonHumanLikeRun"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_HaremSize"] =
    {
        storage: "localStorage",
        HHType: "Temp",
        isValid: /{"count":(\d)+,"count_date":(\d)+}/
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_LastPageCalled"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_PoAEndDate"] =
    {
        storage: "localStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_PoVEndDate"] =
    {
        storage: "localStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_PoGEndDate"] =
    {
        storage: "localStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_poaManualCollectAll"] =
    {
        default: "false",
        storage: "localStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_missionsGiftLeft"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_defaultCustomHaremSort"] =
    {
        storage: "localStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_unkownPagesList"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };
HHStoredVars_HHStoredVars[HHStoredVarPrefixKey + "Temp_trollPoints"] =
    {
        storage: "sessionStorage",
        HHType: "Temp"
    };

;// CONCATENATED MODULE: ./src/config/InputPattern.ts
const thousandsSeparator = (11111).toLocaleString().replace(/1+/g, '');
const HHAuto_inputPattern = {
    nWith1000sSeparator: "[0-9" + thousandsSeparator + "]+",
    //kobanBank:"[0-9]+",
    buyCombTimer: "[0-9]+",
    buyMythicCombTimer: "[0-9]+",
    autoBuyBoostersFilter: "(B[1-4]|MB[1-9]|MB1[1-2])(;B[1-4]|;MB[1-9]|;MB1[1-2])*",
    //calculatePowerLimits:"(\-?[0-9]+;\-?[0-9]+)|default",
    mousePauseTimeout: "[0-9]+",
    safeSecondsForContest: "[0-9]+",
    collectAllTimer: "[1-9][0-9]|[1-9]",
    autoSalaryTimer: "[0-9]+",
    autoTrollThreshold: "[1]?[0-9]",
    autoTrollRunThreshold: "(20|[1]?[0-9])",
    eventTrollOrder: "([1-2][0-9]|[1-9])(;([1-2][0-9]|[1-9]))*",
    autoBuyTrollNumber: "200|1[0-9][0-9]|[1-9]?[0-9]",
    autoSeasonThreshold: "[0-9]",
    autoSeasonRunThreshold: "10|[0-9]",
    autoPantheonThreshold: "[0-9]",
    autoPantheonRunThreshold: "10|[0-9]",
    bossBangMinTeam: "[1-5]",
    autoQuestThreshold: "[1-9]?[0-9]",
    autoLeaguesThreshold: "1[0-4]|[0-9]",
    autoLeaguesRunThreshold: "1[0-5]|[0-9]",
    autoLeaguesSecurityThreshold: "[0-9]+",
    autoPowerPlacesIndexFilter: "[1-9][0-9]{0,1}(;[1-9][0-9]{0,1})*",
    autoChampsFilter: "[1-6](;[1-6])*",
    autoChampsTeamLoop: "[1-9][0-9]|[1-9]",
    //autoStats:"[0-9]+",
    //autoExp:"[0-9]+",
    //maxExp:"[0-9]+",
    //autoAff:"[0-9]+",
    //maxAff:"[0-9]+",
    menuSellNumber: "[0-9]+",
    autoClubChampMax: "[0-9]+",
    menuExpLevel: "[1-4]?[0-9]?[0-9]",
    minShardsX: "(100|[1-9][0-9]|[0-9])"
};

;// CONCATENATED MODULE: ./src/config/index.ts




;// CONCATENATED MODULE: ./src/Helper/ConfigHelper.ts


class ConfigHelper {
    static getEnvironnement() {
        let environnement = "global";
        if (HHKnownEnvironnements[window.location.hostname] !== undefined) {
            environnement = HHKnownEnvironnements[window.location.hostname].name;
        }
        else {
            fillHHPopUp("unknownURL", "Game URL unknown", '<p>This HH URL is unknown to the script.<br>To add it please open an issue in <a href="https://github.com/Roukys/HHauto/issues" target="_blank">Github</a> with following informations : <br>Hostname : ' + window.location.hostname + '<br>gameID : ' + $('body[page][id]').attr('id') + '<br>You can also use this direct link : <a  target="_blank" href="https://github.com/Roukys/HHauto/issues/new?template=enhancement_request.md&title=Support%20for%20' + window.location.hostname + '&body=Please%20add%20new%20URL%20with%20these%20infos%20%3A%20%0A-%20hostname%20%3A%20' + window.location.hostname + '%0A-%20gameID%20%3A%20' + $('body[page][id]').attr('id') + '%0AThanks">Github issue</a></p>');
        }
        return environnement;
    }
    static isPshEnvironnement() {
        return ["PH_prod", "NPH_prod"].includes(ConfigHelper.getEnvironnement());
    }
    static getHHScriptVars(id, logNotFound = true) {
        const environnement = ConfigHelper.getEnvironnement();
        if (HHEnvVariables[environnement] !== undefined && HHEnvVariables[environnement][id] !== undefined) {
            return HHEnvVariables[environnement][id];
        }
        else {
            if (HHEnvVariables["global"] !== undefined && HHEnvVariables["global"][id] !== undefined) {
                return HHEnvVariables["global"][id];
            }
            else {
                if (logNotFound) {
                    LogUtils_logHHAuto("not found var for " + environnement + "/" + id);
                }
                return null;
            }
        }
    }
}

;// CONCATENATED MODULE: ./src/Helper/NumberHelper.ts
function add1000sSeparator1() {
    var nToFormat = this.value;
    this.value = NumberHelper.add1000sSeparator(nToFormat);
}
class NumberHelper {
    static add1000sSeparator(nToFormat) {
        return NumberHelper.nThousand(NumberHelper.remove1000sSeparator(nToFormat));
    }
    static remove1000sSeparator(nToFormat) {
        return Number(nToFormat.replace(/\D/g, ''));
    }
    static nThousand(x) {
        if (typeof x != 'number') {
            x = 0;
        }
        return x.toLocaleString();
    }
    // Numbers: rounding to K, M, G and T
    static nRounding(num, digits, updown) {
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
}

;// CONCATENATED MODULE: ./src/Helper/HHMenuHelper.ts








class HHMenu {
    createMenuButton() {
        if ($('#' + HHMenu.BUTTON_MENU_ID).length > 0)
            return;
        GM_addStyle(''
            + '#sMenuButton {'
            + '   position: absolute;'
            + '   top: 45px;'
            + '   right: 15px;'
            + '   z-index:5000;'
            + '}'
            + '@media only screen and (max-width: 1025px) {'
            + '#sMenuButton {'
            + '   width: 40px;'
            + '   height: 40px;'
            + '   top: 60px;'
            + '   right: 10px;'
            + '}}');
        $("#contains_all nav").prepend('<div class="square_blue_btn" id="' + HHMenu.BUTTON_MENU_ID + '" ><img src="https://i.postimg.cc/bv7n83z3/script-Icon2.png"></div>');
        $("#sMenuButton").on("click", () => {
            const sMenu = document.getElementById("sMenu");
            if (sMenu != null) {
                if (sMenu.style.display === "none") {
                    setMenuValues();
                    sMenu.style.display = "flex";
                    $('#contains_all')[0].style.zIndex = '9';
                }
                else {
                    getMenuValues();
                    sMenu.style.display = "none";
                    $('#contains_all')[0].style.zIndex = "";
                }
            }
        });
    }
    _createHtmlOption(value, text) {
        var option = document.createElement("option");
        option.value = value;
        option.text = text;
        return option;
    }
    fillTrollSelectMenu(lastTrollIdAvailable) {
        var trollOptions = document.getElementById("autoTrollSelector");
        try {
            const trollz = ConfigHelper.getHHScriptVars("trollzList");
            for (var i = 0; i <= lastTrollIdAvailable; i++) {
                var option = this._createHtmlOption(i + '', trollz[i]);
                if (option.text !== 'EMPTY' && trollz[i]) {
                    // Supports for PH and missing trols or parallel advantures (id world "missing")
                    trollOptions.add(option);
                }
            }
        }
        catch ({ errName, message }) {
            trollOptions.add(this._createHtmlOption('0', 'Error!'));
            LogUtils_logHHAuto(`Error filling trolls: ${errName}, ${message}`);
        }
        trollOptions.add(this._createHtmlOption('98', getTextForUI("firstTrollWithGirls", "elementText")));
        trollOptions.add(this._createHtmlOption('99', getTextForUI("lastTrollWithGirls", "elementText")));
    }
    fillLeagueSelectMenu() {
        var leaguesOptions = document.getElementById("autoLeaguesSelector");
        try {
            const leagues = ConfigHelper.getHHScriptVars("leaguesList");
            for (var j in leagues) {
                leaguesOptions.add(this._createHtmlOption((Number(j) + 1) + '', leagues[j]));
            }
            ;
        }
        catch ({ errName, message }) {
            leaguesOptions.add(this._createHtmlOption('0', 'Error!'));
            LogUtils_logHHAuto(`Error filling leagues: ${errName}, ${message}`);
        }
    }
    fillLeaguSortMenu() {
        var sortsOptions = document.getElementById("autoLeaguesSortMode");
        sortsOptions.add(this._createHtmlOption(LeagueHelper.SORT_DISPLAYED, getTextForUI("autoLeaguesdisplayedOrder", "elementText")));
        sortsOptions.add(this._createHtmlOption(LeagueHelper.SORT_POWER, getTextForUI("autoLeaguesPower", "elementText")));
        sortsOptions.add(this._createHtmlOption(LeagueHelper.SORT_POWERCALC, getTextForUI("autoLeaguesPowerCalc", "elementText")));
    }
}
HHMenu.BUTTON_MENU_ID = 'sMenuButton';
function maskInactiveMenus() {
    let menuIDList = ["isEnabledDailyGoals", "isEnabledPoV", "isEnabledPoG",
        "isEnabledSeasonalEvent", "isEnabledBossBangEvent", "isEnabledSultryMysteriesEvent",
        "isEnabledDailyRewards", "isEnabledFreeBundles", "isEnabledMission", "isEnabledContest",
        "isEnabledTrollBattle", "isEnabledPowerPlaces", "isEnabledSalary", "isEnabledPachinko", "isEnabledQuest", "isEnabledSideQuest", "isEnabledSeason", "isEnabledLeagues",
        "isEnabledAllChamps", "isEnabledChamps", "isEnabledClubChamp", "isEnabledPantheon", "isEnabledShop"];
    for (let menu of menuIDList) {
        const menuElement = document.getElementById(menu);
        if (menuElement !== null && ConfigHelper.getHHScriptVars(menu, false) !== null && !ConfigHelper.getHHScriptVars(menu, false)) {
            menuElement.style.display = "none";
        }
    }
}
function hhButton(textKeyId, buttonId) {
    return `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI(textKeyId, "tooltip")}</span>`
        + `<label class="myButton" id="${buttonId}">${getTextForUI(textKeyId, "elementText")}</label>`
        + `</div>`;
}
function hhMenuSwitch(textKeyAndInputId, isEnabledDivId = '', isKobanSwitch = false) {
    return `<div ${isEnabledDivId ? 'id="' + isEnabledDivId + '"' : ''} class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI(textKeyAndInputId, "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI(textKeyAndInputId, "tooltip")}</span>`
        + `<label class="switch"><input id="${textKeyAndInputId}" type="checkbox"><span class="slider round ${isKobanSwitch ? 'kobans' : ''}"></span></label>`
        + `</div>`
        + `</div>`;
}
function hhMenuSwitchWithImg(textKeyAndInputId, imgPath, isKobanSwitch = false) {
    return `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI(textKeyAndInputId, "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/${imgPath}" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI(textKeyAndInputId, "tooltip")}</span>`
        + `<label class="switch"><input id="${textKeyAndInputId}" type="checkbox"><span class="slider round ${isKobanSwitch ? 'kobans' : ''}"></span></label>`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`;
}
function hhMenuSelect(textKeyAndInputId, inputStyle = '') {
    return `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI(textKeyAndInputId, "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI(textKeyAndInputId, "tooltip")}</span>`
        + `<select id="${textKeyAndInputId}" style="${inputStyle}" ></select>`
        + `</div>`
        + `</div>`;
}
function hhMenuInput(textKeyAndInputId, inputPattern, inputStyle = '', inputClass = '', inputMode = 'text') {
    return `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI(textKeyAndInputId, "elementText")}</span>`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI(textKeyAndInputId, "tooltip")}</span>`
        + `<input id="${textKeyAndInputId}" class="${inputClass}" style="${inputStyle}" required pattern="${inputPattern}" type="text" inputMode="${inputMode}">`
        + `</div>`
        + `</div>`;
}
function hhMenuInputWithImg(textKeyAndInputId, inputPattern, inputStyle, imgPath, inputMode = 'text') {
    return `<div class="labelAndButton">`
        + `<span class="HHMenuItemName">${getTextForUI(textKeyAndInputId, "elementText")}</span>`
        + `<div class="imgAndObjectRow">`
        + `<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/${imgPath}" />`
        + `<div style="padding-left:5px">`
        + `<div class="tooltipHH">`
        + `<span class="tooltipHHtext">${getTextForUI(textKeyAndInputId, "tooltip")}</span>`
        + `<input style="${inputStyle}" id="${textKeyAndInputId}" required pattern="${inputPattern}" type="text" inputMode="${inputMode}">`
        + `</div>`
        + `</div>`
        + `</div>`
        + `</div>`;
}
function switchHHMenuButton(isActive) {
    var element = document.getElementById("sMenuButton");
    if (element !== null) {
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_master") === "false") {
            element.style["background-color"] = "red";
            element.style["background-image"] = "none";
        }
        else if (isActive) {
            element.style["background-color"] = "green";
            element.style["background-image"] = "none";
        }
        else {
            element.style.removeProperty('background-color');
            element.style.removeProperty('background-image');
        }
    }
}
function setMenuValues() {
    if (document.getElementById("sMenu") === null) {
        return;
    }
    setDefaults();
    for (let i of Object.keys(HHStoredVars_HHStoredVars)) {
        if (HHStoredVars_HHStoredVars[i].storage !== undefined && HHStoredVars_HHStoredVars[i].HHType !== undefined) {
            let storageItem = getStorageItem(HHStoredVars_HHStoredVars[i].storage);
            let menuID = HHStoredVars_HHStoredVars[i].customMenuID !== undefined ? HHStoredVars_HHStoredVars[i].customMenuID : i.replace(HHStoredVarPrefixKey + HHStoredVars_HHStoredVars[i].HHType + "_", "");
            const menuElement = document.getElementById(menuID);
            if (HHStoredVars_HHStoredVars[i].setMenu !== undefined
                && storageItem[i] !== undefined
                && HHStoredVars_HHStoredVars[i].setMenu
                && HHStoredVars_HHStoredVars[i].valueType !== undefined
                && HHStoredVars_HHStoredVars[i].menuType !== undefined
                && menuElement != null) {
                let itemValue = storageItem[i];
                switch (HHStoredVars_HHStoredVars[i].valueType) {
                    case "Long Integer":
                        itemValue = NumberHelper.add1000sSeparator(itemValue);
                        break;
                    case "Boolean":
                        itemValue = itemValue === "true";
                        break;
                }
                //console.log(menuID,HHStoredVars[i].menuType,itemValue);
                menuElement[HHStoredVars_HHStoredVars[i].menuType] = itemValue;
            }
            else if (menuElement == null) {
                // logHHAuto('ERROR: Element with ID "'+menuID+'" not found');
            }
        }
        else {
            LogUtils_logHHAuto("HHStoredVar " + i + " has no storage or type defined.");
        }
    }
}
function getMenuValues() {
    if (document.getElementById("sMenu") === null) {
        return;
    }
    if (isDisplayedHHPopUp() === 'loadConfig') {
        return;
    }
    for (let i of Object.keys(HHStoredVars_HHStoredVars)) {
        if (HHStoredVars_HHStoredVars[i].storage !== undefined && HHStoredVars_HHStoredVars[i].HHType !== undefined) {
            let storageItem = getStorageItem(HHStoredVars_HHStoredVars[i].storage);
            let menuID = HHStoredVars_HHStoredVars[i].customMenuID !== undefined ? HHStoredVars_HHStoredVars[i].customMenuID : i.replace(HHStoredVarPrefixKey + HHStoredVars_HHStoredVars[i].HHType + "_", "");
            const menuElement = document.getElementById(menuID);
            if (HHStoredVars_HHStoredVars[i].getMenu !== undefined
                && document.getElementById(menuID) !== null
                && HHStoredVars_HHStoredVars[i].getMenu
                && HHStoredVars_HHStoredVars[i].valueType !== undefined
                && HHStoredVars_HHStoredVars[i].menuType !== undefined
                && menuElement != null) {
                let currentValue = storageItem[i];
                let menuValue = String(menuElement[HHStoredVars_HHStoredVars[i].menuType]);
                switch (HHStoredVars_HHStoredVars[i].valueType) {
                    case "Long Integer":
                        menuValue = String(NumberHelper.remove1000sSeparator(menuValue));
                        break;
                }
                //console.log(menuID,HHStoredVars[i].menuType,menuValue,document.getElementById(menuID),HHStoredVars[i].valueType);
                storageItem[i] = menuValue;
                //console.log(i,currentValue, menuValue);
                if (currentValue !== menuValue && HHStoredVars_HHStoredVars[i].newValueFunction !== undefined) {
                    //console.log(currentValue,menuValue);
                    HHStoredVars_HHStoredVars[i].newValueFunction.apply();
                }
            }
        }
        else {
            LogUtils_logHHAuto("HHStoredVar " + i + " has no storage or type defined.");
        }
    }
    setDefaults();
}
function preventKobanUsingSwitchUnauthorized() {
    if (this.checked && !document.getElementById("spendKobans0").checked) {
        let idToDisable = this.id;
        setTimeout(function () { document.getElementById(idToDisable).checked = false; }, 500);
    }
}
function addEventsOnMenuItems() {
    for (let i of Object.keys(HHStoredVars_HHStoredVars)) {
        //console.log(i);
        if (HHStoredVars_HHStoredVars[i].HHType !== undefined) {
            let menuID = HHStoredVars_HHStoredVars[i].customMenuID !== undefined ? HHStoredVars_HHStoredVars[i].customMenuID : i.replace(HHStoredVarPrefixKey + HHStoredVars_HHStoredVars[i].HHType + "_", "");
            const menuElement = document.getElementById(menuID);
            if (menuElement != null) {
                if (HHStoredVars_HHStoredVars[i].valueType === "Long Integer") {
                    menuElement.addEventListener("keyup", add1000sSeparator1);
                }
                if (HHStoredVars_HHStoredVars[i].events !== undefined) {
                    for (let event of Object.keys(HHStoredVars_HHStoredVars[i].events)) {
                        menuElement.addEventListener(event, HHStoredVars_HHStoredVars[i].events[event]);
                    }
                }
                if (HHStoredVars_HHStoredVars[i].kobanUsing !== undefined && HHStoredVars_HHStoredVars[i].kobanUsing) {
                    menuElement.addEventListener("change", preventKobanUsingSwitchUnauthorized);
                }
                if (HHStoredVars_HHStoredVars[i].menuType !== undefined && HHStoredVars_HHStoredVars[i].menuType === "checked") {
                    menuElement.addEventListener("change", function () {
                        if (HHStoredVars_HHStoredVars[i].newValueFunction !== undefined) {
                            HHStoredVars_HHStoredVars[i].newValueFunction.apply();
                        }
                        setStoredValue(i, this.checked);
                    });
                }
            }
        }
    }
}
function getMenu() {
    const debugEnabled = getStoredValue(HHStoredVarPrefixKey + "Temp_Debug") === 'true';
    const getLeftColumn = () => {
        return `<div class="optionsColumn" style="min-width: 185px;">`
            + `<div style="padding:3px; display:flex; flex-direction:column;">`
            + `<span>HH Automatic ++</span>`
            + `<span style="font-size:smaller;">Version ${GM.info.script.version}</span>`
            + `<div class="internalOptionsRow" style="padding:3px">`
            + hhButton('gitHub', 'git')
            + hhButton('ReportBugs', 'ReportBugs')
            + hhButton('DebugMenu', 'DebugMenu')
            + `</div>`
            + `<div class="internalOptionsRow" style="padding:3px">`
            + hhButton('saveConfig', 'saveConfig')
            + hhButton('loadConfig', 'loadConfig')
            + `</div>`
            + `<div class="internalOptionsRow" style="padding:3px">`
            + hhButton('saveDefaults', 'saveDefaults')
            + `</div>`
            + `</div>`
            + `<div class="optionsBoxWithTitle">`
            + `<div class="optionsBoxTitle">`
            + `<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/design/menu/panel.svg" />`
            + `<span class="optionsBoxTitle">${getTextForUI("globalTitle", "elementText")}</span>`
            + `</div>`
            + `<div class="rowOptionsBox" style="display:grid;grid-auto-flow: column;">`
            + `<div class="optionsColumn">`
            + hhMenuSwitch('master') // Master switch
            + hhMenuSwitch('paranoia')
            + `<div id="isEnabledMousePause" class="labelAndButton">`
            + `<span class="HHMenuItemName">${getTextForUI("mousePause", "elementText")}</span>`
            + `<div class="tooltipHH">`
            + `<span class="tooltipHHtext">${getTextForUI("mousePause", "tooltip")}</span>`
            + `<label class="switch">`
            + `<input id="mousePause" type="checkbox">`
            + `<span class="slider round">`
            + `</span>`
            + `</label>`
            + `<input style="text-align:center; width:40px" id="mousePauseTimeout" required pattern="${HHAuto_inputPattern.mousePauseTimeout}" type="text">`
            + `</div>`
            + `</div>`
            + hhMenuInput('collectAllTimer', HHAuto_inputPattern.collectAllTimer, 'text-align:center; width:25px')
            + `</div>`
            + `<div class="optionsColumn">`
            + `<div class="labelAndButton">`
            + `<span class="HHMenuItemName">${getTextForUI("waitforContest", "elementText")}</span>`
            + `<div class="tooltipHH">`
            + `<span class="tooltipHHtext">${getTextForUI("waitforContest", "tooltip")}</span>`
            + `<label class="switch">`
            + `<input id="waitforContest" type="checkbox">`
            + `<span class="slider round">`
            + `</span>`
            + `</label>`
            + `<input style="text-align:center; width:30px" id="safeSecondsForContest" required pattern="${HHAuto_inputPattern.safeSecondsForContest}" type="text">`
            + `</div>`
            + `</div>`
            + hhMenuSwitch('settPerTab')
            + hhMenuSwitch('paranoiaSpendsBefore')
            + hhMenuSwitch('autoFreeBundlesCollect', 'isEnabledFreeBundles')
            + hhMenuSwitch('collectEventChest')
            + `</div>`
            + `</div>`
            + `</div>`
            + `<div class="optionsBoxWithTitle">`
            + `<div class="optionsBoxTitle">`
            + `<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/pictures/design/ic_hard_currency.png" />`
            + `<span class="optionsBoxTitle">Kobans</span>`
            + `</div>`
            + `<div class="rowOptionsBox">`
            + hhMenuSwitchWithImg('spendKobans0', 'design/menu/affil_prog.svg', true)
            + hhMenuInputWithImg('kobanBank', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:right; width:50px', 'pictures/design/ic_hard_currency.png')
            + `</div>`
            + `</div>`
            + `<div class="optionsBoxWithTitle">`
            + `<div class="optionsBoxTitle">`
            + `<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/design/menu/sex_friends.svg" />`
            + `<span class="optionsBoxTitle">${getTextForUI("displayTitle", "elementText")}</span>`
            + `</div>`
            + `<div class="rowOptionsBox">`
            + `<div class="optionsColumn">`
            + hhMenuSwitch('showInfo')
            + hhMenuSwitch('showTooltips')
            + `</div>`
            + `<div class="optionsColumn">`
            + hhMenuSwitch('showCalculatePower')
            + hhMenuSwitch('showAdsBack')
            + `</div>`
            + `<div class="optionsColumn">`
            + hhMenuSwitch('showRewardsRecap')
            + hhMenuSwitch('showInfoLeft')
            + `</div>`
            + `</div>`
            + `</div>`
            + `<div id="isEnabledPoa" class="optionsBoxWithTitle">`
            + `<div class="optionsBoxTitle">`
            + `<span class="optionsBoxTitle">${getTextForUI("poaTitle", "elementText")}</span>`
            + `</div>`
            + `<div class="optionsBox">`
            + `<div class="internalOptionsRow" style="justify-content: space-evenly">`
            + hhMenuSwitch('PoAMaskRewards')
            + hhMenuSwitch('autoPoACollect')
            + hhMenuSwitch('autoPoACollectAll')
            + `</div>`
            + `</div>`
            + `</div>`
            + `</div>`;
    };
    const getMiddleColumn = () => {
        return `<div class="optionsColumn" style="min-width: 500px;">`
            + `<div class="optionsRow">`
            + `<div class="optionsColumn">`
            + `<div class="optionsBoxWithTitle">`
            + `<div class="optionsBoxTitle">`
            + `<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/design/menu/missions.svg" />`
            + `<span class="optionsBoxTitle">${getTextForUI("autoActivitiesTitle", "elementText")}</span>`
            + `</div>`
            + `<div class="optionsBox" style="border:none;padding:0">`
            + `<div class="internalOptionsRow">`
            + `<div id="isEnabledMission" class="internalOptionsRow optionsBox" style="padding:0;margin:0 3px 0 0;">`
            + hhMenuSwitch('autoMission')
            + hhMenuSwitch('autoMissionCollect')
            + hhMenuSwitch('autoMissionKFirst')
            + hhMenuSwitch('compactMissions')
            + `</div>`
            + `<div id="isEnabledContest" class="internalOptionsRow optionsBox" style="padding:0;margin:0 0 0 3px;">`
            + hhMenuSwitch('autoContest')
            + hhMenuSwitch('compactEndedContests')
            + `</div>`
            + `</div>`
            + `</div>`
            + `</div>`
            + `<div id="isEnabledPowerPlaces" class="optionsBoxWithTitle">`
            + `<div class="optionsBoxTitle">`
            + `<span class="optionsBoxTitle">${getTextForUI("powerPlacesTitle", "elementText")}</span>`
            + `</div>`
            + `<div class="optionsBox">`
            + `<div class="internalOptionsRow">`
            + hhMenuSwitch('autoPowerPlaces')
            + hhMenuInput('autoPowerPlacesIndexFilter', HHAuto_inputPattern.autoPowerPlacesIndexFilter, '')
            + hhMenuSwitch('autoPowerPlacesAll')
            + `</div>`
            + `<div class="internalOptionsRow">`
            + hhMenuSwitch('autoPowerPlacesPrecision')
            + hhMenuSwitch('autoPowerPlacesInverted')
            + hhMenuSwitch('autoPowerPlacesWaitMax')
            + hhMenuSwitch('compactPowerPlace')
            + `</div>`
            + `</div>`
            + `</div>`
            + `</div>`
            + `<div class="optionsColumn">`
            + `<div class="optionsBoxTitle">`
            + `</div>`
            + `<div id="isEnabledSalary" class="rowOptionsBox">`
            + `<div class="internalOptionsRow">`
            + hhMenuSwitchWithImg('autoSalary', 'pictures/design/harem.svg')
            + hhMenuInput('autoSalaryMinSalary', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:right; width:45px')
            + hhMenuInput('autoSalaryMaxTimer', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:right; width:45px')
            + hhMenuSwitch('autoSalaryResetFilters')
            + `</div>`
            + `</div>`
            + `<div class="optionsRow">`
            + `<div id="isEnabledPachinko" class="rowOptionsBox">`
            + `<div class="internalOptionsRow" style="justify-content: space-between">`
            + hhMenuSwitchWithImg('autoFreePachinko', 'pictures/design/menu/pachinko.svg')
            + `</div>`
            + `</div>`
            + `<div id="isEnabledQuest" class="rowOptionsBox">`
            + `<div class="internalOptionsRow">`
            + hhMenuSwitchWithImg('autoQuest', 'design/menu/forward.svg')
            + hhMenuSwitch('autoSideQuest', 'isEnabledSideQuest')
            + hhMenuInputWithImg('autoQuestThreshold', HHAuto_inputPattern.autoQuestThreshold, 'text-align:center; width:25px', 'pictures/design/ic_energy_quest.png', 'numeric')
            + `</div>`
            + `</div>`
            + `</div>`
            + `<div class="optionsRow" style="justify-content: space-evenly">`
            + `<div id="isEnabledDailyGoals" class="optionsBoxWithTitleInline">`
            + `<div class="optionsBoxTitle">`
            + `<span class="optionsBoxTitle">${getTextForUI("dailyGoalsTitle", "elementText")}</span>`
            + `</div>`
            // +`<div class="optionsBox">`
            + `<div class="internalOptionsRow" style="justify-content: space-evenly">`
            + hhMenuSwitch('autoDailyGoalsCollect')
            + hhMenuSwitch('compactDailyGoals')
            + `</div>`
            // +`</div>`
            //
            + `</div>`
            + `</div>`
            + `</div>`
            + `</div>`
            + `<div class="optionsRow">`
            + `<div id="isEnabledSeason" class="optionsBoxWithTitle">`
            + `<div class="optionsBoxTitle">`
            + `<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/design/menu/seasons.svg" />`
            + `<span class="optionsBoxTitle">${getTextForUI("autoSeasonTitle", "elementText")}</span>`
            + `</div>`
            + `<div class="optionsBox">`
            + `<div class="internalOptionsRow">`
            + hhMenuSwitch('autoSeason')
            + hhMenuSwitch('autoSeasonCollect')
            + hhMenuSwitch('autoSeasonCollectAll')
            + hhMenuSwitch('SeasonMaskRewards')
            + `</div>`
            + `<div class="internalOptionsRow">`
            + hhMenuSwitch('autoSeasonPassReds', '', true)
            + hhMenuSwitch('autoSeasonBoostedOnly')
            + `</div>`
            + `<div class="internalOptionsRow">`
            + hhMenuInputWithImg('autoSeasonThreshold', HHAuto_inputPattern.autoSeasonThreshold, 'text-align:center; width:25px', 'pictures/design/ic_kiss.png', 'numeric')
            + hhMenuInputWithImg('autoSeasonRunThreshold', HHAuto_inputPattern.autoSeasonRunThreshold, 'text-align:center; width:25px', 'pictures/design/ic_kiss.png', 'numeric')
            + `</div>`
            + `</div>`
            + `</div>`
            + `<div id="isEnabledLeagues" class="optionsBoxWithTitle">`
            + `<div class="optionsBoxTitle">`
            + `<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/design/menu/leaderboard.svg" />`
            + `<span class="optionsBoxTitle">${getTextForUI("autoLeaguesTitle", "elementText")}</span>`
            + `</div>`
            + `<div class="optionsBox">`
            + `<div class="internalOptionsRow">`
            + hhMenuSwitch('autoLeagues')
            + hhMenuSelect('autoLeaguesSortMode', 'width:85px;')
            + hhMenuSwitch('autoLeaguesCollect')
            + hhMenuSwitch('autoLeaguesBoostedOnly')
            + hhMenuSwitch('leagueListDisplayPowerCalc')
            + `</div>`
            + `<div class="internalOptionsRow">`
            + hhMenuSelect('autoLeaguesSelector')
            + hhMenuSwitch('autoLeaguesAllowWinCurrent')
            + hhMenuSwitch('autoLeaguesForceOneFight')
            + `</div>`
            + `<div class="internalOptionsRow">`
            + hhMenuInputWithImg('autoLeaguesThreshold', HHAuto_inputPattern.autoLeaguesThreshold, 'text-align:center; width:25px', 'pictures/design/league_points.png', 'numeric')
            + hhMenuInputWithImg('autoLeaguesRunThreshold', HHAuto_inputPattern.autoLeaguesRunThreshold, 'text-align:center; width:25px', 'pictures/design/league_points.png', 'numeric')
            + hhMenuInput('autoLeaguesSecurityThreshold', HHAuto_inputPattern.autoLeaguesSecurityThreshold, 'text-align:center; width:25px', '', 'numeric')
            + `</div>`
            + `</div>`
            + `</div>`
            + `</div>`
            + `<div class="optionsRow">`
            + `<div id="isEnabledPoV" class="optionsBoxWithTitle">`
            + `<div class="optionsBoxTitle">`
            + `<span class="optionsBoxTitle">${getTextForUI("povTitle", "elementText")}</span>`
            + `</div>`
            + `<div class="optionsBox">`
            + `<div class="internalOptionsRow">`
            + hhMenuSwitch('PoVMaskRewards')
            + hhMenuSwitch('autoPoVCollect')
            + hhMenuSwitch('autoPoVCollectAll')
            + `</div>`
            + `</div>`
            + `</div>`
            + `<div id="isEnabledPoG" class="optionsBoxWithTitle">`
            + `<div class="optionsBoxTitle">`
            + `<span class="optionsBoxTitle">${getTextForUI("pogTitle", "elementText")}</span>`
            + `</div>`
            + `<div class="optionsBox">`
            + `<div class="internalOptionsRow">`
            + hhMenuSwitch('PoGMaskRewards')
            + hhMenuSwitch('autoPoGCollect')
            + hhMenuSwitch('autoPoGCollectAll')
            + `</div>`
            + `</div>`
            + `</div>`
            + `<div id="isEnabledSeasonalEvent" class="optionsBoxWithTitle">`
            + `<div class="optionsBoxTitle">`
            + `<span class="optionsBoxTitle">${getTextForUI("seasonalEventTitle", "elementText")}</span>`
            + `</div>`
            + `<div class="optionsBox">`
            + `<div class="internalOptionsRow">`
            + hhMenuSwitch('SeasonalEventMaskRewards')
            + hhMenuSwitch('autoSeasonalEventCollect')
            + hhMenuSwitch('autoSeasonalEventCollectAll')
            + `</div>`
            + `</div>`
            + `</div>`
            + `</div>`
            + `<div id="isEnabledTrollBattle" class="optionsBoxWithTitle">`
            + `<div class="optionsBoxTitle">`
            + `<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/pictures/design/menu/map.svg" />`
            + `<span class="optionsBoxTitle">${getTextForUI("autoTrollTitle", "elementText")}</span>`
            + `</div>`
            + `<div class="optionsBox">`
            + `<div class="internalOptionsRow" style="justify-content: space-between">`
            + hhMenuSwitch('autoTrollBattle')
            + hhMenuSelect('autoTrollSelector')
            + hhMenuInputWithImg('autoTrollThreshold', HHAuto_inputPattern.autoTrollThreshold, 'text-align:center; width:25px', 'pictures/design/ic_energy_fight.png', 'numeric')
            + hhMenuInputWithImg('autoTrollRunThreshold', HHAuto_inputPattern.autoTrollRunThreshold, 'text-align:center; width:25px', 'pictures/design/ic_energy_fight.png', 'numeric')
            + `</div>`
            + `<div class="internalOptionsRow">`
            + hhMenuSwitch('useX10Fights', '', true)
            + hhMenuSwitch('useX10FightsAllowNormalEvent')
            + hhMenuInput('minShardsX10', HHAuto_inputPattern.minShardsX, 'text-align:center; width:7em')
            + hhMenuSwitch('useX50Fights', '', true)
            + hhMenuSwitch('useX50FightsAllowNormalEvent')
            + hhMenuInput('minShardsX50', HHAuto_inputPattern.minShardsX, 'text-align:center; width:7em')
            + `</div>`
            + `<div class="internalOptionsRow">`
            + hhMenuSwitch('plusEvent')
            + hhMenuInput('eventTrollOrder', HHAuto_inputPattern.eventTrollOrder, 'width:150px')
            + hhMenuSwitch('buyCombat', '', true)
            + hhMenuInput('autoBuyTrollNumber', HHAuto_inputPattern.autoBuyTrollNumber, 'width:40px')
            + hhMenuInput('buyCombTimer', HHAuto_inputPattern.buyCombTimer, 'text-align:center; width:40px', '', 'numeric')
            + `</div>`
            + `<div class="internalOptionsRow separator">`
            + hhMenuSwitch('plusEventMythic')
            + hhMenuSwitch('autoTrollMythicByPassParanoia')
            + hhMenuSwitch('buyMythicCombat', '', true)
            + hhMenuInput('autoBuyMythicTrollNumber', HHAuto_inputPattern.autoBuyTrollNumber, 'width:40px')
            + hhMenuInput('buyMythicCombTimer', HHAuto_inputPattern.buyMythicCombTimer, 'text-align:center; width:40px', '', 'numeric')
            + hhMenuSwitch('plusEventMythicSandalWood')
            + `</div>`
            + `</div>`
            + `</div>`
            + `</div>`;
    };
    const getRightColumn = () => {
        return `<div class="optionsColumn" style="width: 340px;">`
            + `<div id="isEnabledAllChamps" class="optionsBoxWithTitle">`
            + `<div class="optionsBoxTitle">`
            + `<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/design/menu/ic_champions.svg" />`
            + `<span class="optionsBoxTitle">${getTextForUI("autoChampsTitle", "elementText")}</span>`
            + `</div>`
            + `<div class="optionsBox">`
            + `<div id="isEnabledChamps" class="internalOptionsRow">`
            + hhMenuSwitch('autoChamps')
            + hhMenuSwitch('autoChampsForceStart')
            + hhMenuSwitchWithImg('autoChampsUseEne', 'pictures/design/ic_energy_quest.png')
            + hhMenuInput('autoChampsFilter', HHAuto_inputPattern.autoChampsFilter, 'text-align:center; width:55px')
            + hhMenuSwitch('autoChampsForceStartEventGirl')
            + `</div>`
            + `<div id="isEnabledClubChamp" class="internalOptionsRow separator">`
            + hhMenuSwitch('autoClubChamp')
            + hhMenuSwitch('autoClubForceStart')
            + hhMenuInputWithImg('autoClubChampMax', HHAuto_inputPattern.autoClubChampMax, 'text-align:center; width:45px', 'pictures/design/champion_ticket.png', 'numeric')
            + hhMenuSwitch('showClubButtonInPoa')
            + hhMenuSwitch('autoChampAlignTimer')
            + `</div>`
            + `<div class="internalOptionsRow separator">`
            + hhMenuInput('autoChampsTeamLoop', HHAuto_inputPattern.autoChampsTeamLoop, 'text-align:center; width:25px', '', 'numeric')
            + hhMenuInput('autoChampsGirlThreshold', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:center; width:45px')
            + hhMenuSwitch('autoChampsTeamKeepSecondLine')
            + `</div>`
            + `</div>`
            + `</div>`
            + `<div id="isEnabledPantheon" class="">` // optionsBoxWithTitle
            // +`<div class="optionsBoxTitle">`
            //     +`<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/design/menu/ic_champions.svg" />`
            //     +`<span class="optionsBoxTitle">${getTextForUI("autoPantheonTitle","elementText")}</span>`
            // +`</div>`
            + `<div class="optionsBox">`
            + `<div class="internalOptionsRow" style="justify-content: space-evenly">`
            + hhMenuSwitch('autoPantheon')
            + hhMenuInputWithImg('autoPantheonThreshold', HHAuto_inputPattern.autoPantheonThreshold, 'text-align:center; width:25px', 'pictures/design/ic_worship.svg', 'numeric')
            + hhMenuInputWithImg('autoPantheonRunThreshold', HHAuto_inputPattern.autoPantheonRunThreshold, 'text-align:center; width:25px', 'pictures/design/ic_worship.svg', 'numeric')
            + hhMenuSwitch('autoPantheonBoostedOnly')
            + `</div>`
            + `</div>`
            + `</div>`
            + `<div id="isEnabledLabyrinth" class="" style="display:none">` // optionsBoxWithTitle
            + `<div class="optionsBox">`
            + `<div class="internalOptionsRow" style="justify-content: space-evenly">`
            + hhMenuSwitch('autoLabyrinth')
            + `</div>`
            + `</div>`
            + `</div>`
            + `<div id="isEnabledShop" class="optionsBoxWithTitle">`
            + `<div class="optionsBoxTitle">`
            + `<img class="iconImg" src="${ConfigHelper.getHHScriptVars("baseImgPath")}/design/menu/shop.svg" />`
            + `<span class="optionsBoxTitle">${getTextForUI("autoBuy", "elementText")}</span>`
            + `</div>`
            + `<div class="optionsBox">`
            + `<div class="internalOptionsRow">`
            + hhMenuSwitchWithImg('autoStatsSwitch', 'design/ic_plus.svg')
            + hhMenuInput('autoStats', HHAuto_inputPattern.nWith1000sSeparator, '', 'maxMoneyInputField')
            + `</div>`
            + `<div class="internalOptionsRow">`
            + hhMenuSwitchWithImg('autoExpW', 'design/ic_books_gray.svg')
            + hhMenuInput('maxExp', HHAuto_inputPattern.nWith1000sSeparator, '', 'maxMoneyInputField')
            + hhMenuInput('autoExp', HHAuto_inputPattern.nWith1000sSeparator, '', 'maxMoneyInputField')
            + `</div>`
            + `<div class="internalOptionsRow">`
            + hhMenuSwitchWithImg('autoAffW', 'design/ic_gifts_gray.svg')
            + hhMenuInput('maxAff', HHAuto_inputPattern.nWith1000sSeparator, '', 'maxMoneyInputField')
            + hhMenuInput('autoAff', HHAuto_inputPattern.nWith1000sSeparator, '', 'maxMoneyInputField')
            + `</div>`
            + `<div class="internalOptionsRow">`
            + hhMenuSwitchWithImg('autoBuyBoosters', 'design/ic_boosters_gray.svg', true)
            + hhMenuInput('maxBooster', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:right; width:45px')
            + hhMenuInput('autoBuyBoostersFilter', HHAuto_inputPattern.autoBuyBoostersFilter, 'text-align:center; width:70px')
            + `</div>`
            + `<div class="internalOptionsRow">`
            + hhMenuSwitchWithImg('showMarketTools', 'design/menu/panel.svg')
            + hhMenuSwitch('updateMarket')
            + `</div>`
            + `</div>`
            + `</div>`
            + `<div class="optionsRow" style="display:block">`
            + `<div id="isEnabledEvents" class="optionsBoxWithTitle">`
            + `<div class="optionsBoxTitle">`
            + `<span class="optionsBoxTitle">${getTextForUI("eventTitle", "elementText")}</span>`
            + `</div>`
            + `<div class="optionsBox" style="border-style: dotted;">`
            + `<div class="internalOptionsRow" style="justify-content: space-evenly">`
            + `<div class="optionsBox">`
            + `<div class="internalOptionsRow" style="justify-content: space-evenly">`
            + hhMenuSwitch('hideOwnedGirls')
            + `</div>`
            + `</div>`
            + `<div id="isEnabledDPEvent" class="optionsBoxWithTitle">`
            + `<div class="optionsBoxTitle">`
            + `<span class="optionsBoxTitle">${getTextForUI("doublePenetrationEventTitle", "elementText")}</span>`
            + `</div>`
            + `<div class="optionsBox">`
            + `<div class="internalOptionsRow" style="justify-content: space-evenly">`
            + hhMenuSwitch('autodpEventCollect')
            + hhMenuSwitch('autodpEventCollectAll')
            + `</div>`
            + `</div>`
            + `</div>`
            + `</div>`
            + `<div class="internalOptionsRow" style="justify-content: space-evenly">`
            + `<div id="isEnabledSultryMysteriesEvent" class="optionsBoxWithTitle">`
            + `<div class="optionsBoxTitle">`
            + `<span class="optionsBoxTitle">${getTextForUI("sultryMysteriesEventTitle", "elementText")}</span>`
            + `</div>`
            + `<div class="optionsBox">`
            + `<div class="internalOptionsRow" style="justify-content: space-evenly">`
            + hhMenuSwitch('sultryMysteriesEventRefreshShop')
            + `</div>`
            + `</div>`
            + `</div>`
            + `<div id="isEnabledBossBangEvent" class="optionsBoxWithTitle">`
            + `<div class="optionsBoxTitle">`
            + `<span class="optionsBoxTitle">${getTextForUI("bossBangEventTitle", "elementText")}</span>`
            + `</div>`
            + `<div class="optionsBox">`
            + `<div class="internalOptionsRow" style="justify-content: space-evenly">`
            + hhMenuSwitch('bossBangEvent')
            + hhMenuInput('bossBangMinTeam', HHAuto_inputPattern.bossBangMinTeam, 'text-align:center; width:25px', '', 'numeric')
            + `</div>`
            + `</div>`
            + `</div>`
            + `</div>`
            + `</div>`
            + `</div>`
            + `</div>`
            + `</div>`;
    };
    // Add UI buttons.
    return `<div id="sMenu" class="HHAutoScriptMenu" style="display: none;">`
        + `<div style="position: absolute;left: 380px;color: #F00">${getTextForUI("noOtherScripts", "elementText")}</div>`
        + `<div class="optionsRow">`
        + getLeftColumn()
        + getMiddleColumn()
        + getRightColumn()
        + `</div>`
        + `</div>`;
}

;// CONCATENATED MODULE: ./src/Helper/StorageHelper.ts






function getStorage() {
    return getStoredValue(HHStoredVarPrefixKey + "Setting_settPerTab") === "true" ? sessionStorage : localStorage;
}
function getStoredValue(inVarName) {
    if (HHStoredVars_HHStoredVars.hasOwnProperty(inVarName)) {
        const storedValue = getStorageItem(HHStoredVars_HHStoredVars[inVarName].storage)[inVarName];
        if (HHStoredVars_HHStoredVars[inVarName].kobanUsing) {
            // Check main switch for spenind Koban
            return getStoredValue(HHStoredVarPrefixKey + 'Setting_spendKobans0') === "true" ? storedValue : "false";
        }
        return storedValue;
    }
    return undefined;
}
function deleteStoredValue(inVarName) {
    if (HHStoredVars_HHStoredVars.hasOwnProperty(inVarName)) {
        getStorageItem(HHStoredVars_HHStoredVars[inVarName].storage).removeItem(inVarName);
    }
}
function setStoredValue(inVarName, inValue, retry = false) {
    if (HHStoredVars_HHStoredVars.hasOwnProperty(inVarName)) {
        try {
            getStorageItem(HHStoredVars_HHStoredVars[inVarName].storage)[inVarName] = inValue;
        }
        catch ({ errName, message }) {
            cleanLogsInStorage();
            LogUtils_logHHAuto(`ERROR: Can't save value in storage for ${inVarName} (${message}), ${retry ? 'user storage need to be cleaned' : 'retry...'}`);
            if (!retry)
                setStoredValue(inVarName, inValue, true);
        }
    }
}
function extractHHVars(dataToSave, extractLog = false, extractTemp = true, extractSettings = true) {
    let storageType;
    let storageName;
    let currentStorageName = getStoredValue(HHStoredVarPrefixKey + "Setting_settPerTab") === "true" ? "sessionStorage" : "localStorage";
    let variableName;
    let storageItem;
    let varType;
    for (let i of Object.keys(HHStoredVars_HHStoredVars)) {
        varType = HHStoredVars_HHStoredVars[i].HHType;
        if (varType === "Setting" && extractSettings || varType === "Temp" && extractTemp) {
            storageType = HHStoredVars_HHStoredVars[i].storage;
            variableName = i;
            storageName = storageType;
            storageItem = getStorageItem(storageType);
            if (storageType === 'Storage()') {
                storageName = currentStorageName;
            }
            if (variableName !== HHStoredVarPrefixKey + "Temp_Logging") {
                dataToSave[storageName + "." + variableName] = getStoredValue(variableName);
            }
        }
    }
    if (extractLog) {
        dataToSave[HHStoredVarPrefixKey + "Temp_Logging"] = JSON.parse(sessionStorage.getItem(HHStoredVarPrefixKey + 'Temp_Logging') || '');
    }
    return dataToSave;
}
function saveHHVarsSettingsAsJSON() {
    var dataToSave = {};
    extractHHVars(dataToSave, false, false, true);
    var name = 'HH_SaveSettings_' + Date.now() + '.json';
    const a = document.createElement('a');
    a.download = name;
    a.href = URL.createObjectURL(new Blob([JSON.stringify(dataToSave)], { type: 'application/json' }));
    a.click();
}
function getStorageItem(inStorageType) {
    switch (inStorageType) {
        case 'localStorage':
            return localStorage;
            break;
        case 'sessionStorage':
            return sessionStorage;
            break;
        case 'Storage()':
            return getStorage();
            break;
    }
}
function migrateHHVars() {
    /*
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
    }*/
    if (HHStoredVarPrefixKey !== 'HHAuto_' && haveHHAutoSettings()) {
        // Migrate from default to custom keys
        for (const newKey of Object.keys(HHStoredVars_HHStoredVars)) {
            const oldKeys = newKey.replace(HHStoredVarPrefixKey, 'HHAuto_');
            const storageItem = getStorageItem(HHStoredVars_HHStoredVars[newKey].storage);
            const itemValue = storageItem[oldKeys];
            storageItem.removeItem(oldKeys);
            if (itemValue) {
                setStoredValue(newKey, itemValue);
            }
        }
    }
}
function haveHHAutoSettings() {
    let have = false;
    have = have || Object.keys(localStorage).some((key) => key.startsWith("HHAuto_"));
    have = have || Object.keys(sessionStorage).some((key) => key.startsWith("HHAuto_"));
    return have;
}
function getUserHHStoredVarDefault(inVarName) {
    if (isJSON(getStoredValue(HHStoredVarPrefixKey + "Setting_saveDefaults"))) {
        let currentDefaults = JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Setting_saveDefaults"));
        if (currentDefaults !== null && currentDefaults[inVarName] !== undefined) {
            return currentDefaults[inVarName];
        }
    }
    return null;
}
function saveHHStoredVarsDefaults() {
    var dataToSave = {};
    getMenuValues();
    extractHHVars(dataToSave, false, false, true);
    let savedHHStoredVars = {};
    for (var i of Object.keys(dataToSave)) {
        let variableName = i.split(".")[1];
        if (variableName !== HHStoredVarPrefixKey + "Setting_saveDefaults" && HHStoredVars_HHStoredVars[variableName].default !== dataToSave[i]) {
            savedHHStoredVars[variableName] = dataToSave[i];
        }
    }
    setStoredValue(HHStoredVarPrefixKey + "Setting_saveDefaults", JSON.stringify(savedHHStoredVars));
    LogUtils_logHHAuto("HHStoredVar defaults saved !");
}
function setHHStoredVarToDefault(inVarName) {
    if (HHStoredVars_HHStoredVars[inVarName] !== undefined) {
        if (HHStoredVars_HHStoredVars[inVarName].default !== undefined && HHStoredVars_HHStoredVars[inVarName].storage !== undefined) {
            let storageItem;
            storageItem = getStorageItem(HHStoredVars_HHStoredVars[inVarName].storage);
            let userDefinedDefault = getUserHHStoredVarDefault(inVarName);
            let isValid = HHStoredVars_HHStoredVars[inVarName].isValid === undefined ? true : HHStoredVars_HHStoredVars[inVarName].isValid.test(userDefinedDefault);
            if (userDefinedDefault !== null && isValid) {
                LogUtils_logHHAuto("HHStoredVar " + inVarName + " set to user default value : " + userDefinedDefault);
                storageItem[inVarName] = userDefinedDefault;
            }
            else {
                LogUtils_logHHAuto("HHStoredVar " + inVarName + " set to default value : " + HHStoredVars_HHStoredVars[inVarName].default);
                storageItem[inVarName] = HHStoredVars_HHStoredVars[inVarName].default;
            }
        }
        else {
            LogUtils_logHHAuto("HHStoredVar " + inVarName + " either have no storage or default defined.");
        }
    }
    else {
        LogUtils_logHHAuto("HHStoredVar " + inVarName + " doesn't exist.");
    }
}
function getHHStoredVarDefault(inVarName) {
    if (HHStoredVars[inVarName] !== undefined) {
        if (HHStoredVars[inVarName].default !== undefined) {
            return HHStoredVars[inVarName].default;
        }
        else {
            logHHAuto("HHStoredVar " + inVarName + " have no default defined.");
        }
    }
    else {
        logHHAuto("HHStoredVar " + inVarName + " doesn't exist.");
    }
}
function debugDeleteAllVars() {
    Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(HHStoredVarPrefixKey + "Setting_")) {
            localStorage.removeItem(key);
        }
    });
    Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith(HHStoredVarPrefixKey + "Setting_")) {
            sessionStorage.removeItem(key);
        }
    });
    Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(HHStoredVarPrefixKey + "Temp_")) {
            localStorage.removeItem(key);
        }
    });
    Object.keys(sessionStorage).forEach((key) => {
        if (key.startsWith(HHStoredVarPrefixKey + "Temp_") && key !== HHStoredVarPrefixKey + "Temp_Logging") {
            sessionStorage.removeItem(key);
        }
    });
    LogUtils_logHHAuto('Deleted all script vars.');
}
function debugDeleteTempVars() {
    var dataToSave = {};
    extractHHVars(dataToSave, false, false, true);
    var storageType;
    var variableName;
    var storageItem;
    debugDeleteAllVars();
    setDefaults(true);
    var keys = Object.keys(dataToSave);
    for (var i of keys) {
        storageType = i.split(".")[0];
        variableName = i.split(".")[1];
        storageItem = getStorageItem(storageType);
        LogUtils_logHHAuto(i + ':' + dataToSave[i]);
        storageItem[variableName] = dataToSave[i];
    }
}
function getAndStoreCollectPreferences(inVarName, inPopUpText = getTextForUI("menuCollectableText", "elementText")) {
    createPopUpCollectables();
    function createPopUpCollectables() {
        let menuCollectables = '<div class="HHAutoScriptMenu" style="padding:10px; display:flex;flex-direction:column">'
            + '<p>' + inPopUpText + '</p>'
            + '<div style="display:flex;">';
        let count = 0;
        const possibleRewards = ConfigHelper.getHHScriptVars("possibleRewardsList");
        const rewardsToCollect = isJSON(getStoredValue(inVarName)) ? JSON.parse(getStoredValue(inVarName)) : [];
        for (let currentItem of Object.keys(possibleRewards)) {
            //console.log(currentItem,possibleRewards[currentItem]);
            if (count === 4) {
                count = 0;
                menuCollectables += '</div>';
                menuCollectables += '<div style="display:flex;">';
            }
            const checkedBox = rewardsToCollect.includes(currentItem) ? "checked" : "";
            menuCollectables += '<div style="display:flex; width:25%">';
            menuCollectables += '<div class="labelAndButton" style=""><label class="switch"><input id="' + currentItem + '" class="menuCollectablesItem" type="checkbox" ' + checkedBox + '><span class="slider round"></span></label><span class="HHMenuItemName">' + possibleRewards[currentItem] + '</span></div>';
            menuCollectables += '</div>';
            count++;
        }
        menuCollectables += '</div>';
        menuCollectables += '<div style="display:flex;">';
        menuCollectables += '<div style="display:flex;width:25%">';
        menuCollectables += '<div class="labelAndButton" style=""><span class="HHMenuItemName">Toggle All</span><label class="button">';
        menuCollectables += '<input id="toggleCollectables" class="menuCollectablesItem" type="button" value="Click!"';
        menuCollectables += 'onclick="let allInputs = window.document.querySelectorAll(\'#HHAutoPopupGlobalPopup.menuCollectable .menuCollectablesItem\'); ';
        menuCollectables += 'allInputs.forEach((currentInput) \=\> {currentInput.checked = !currentInput.checked;}); ';
        menuCollectables += 'evt = document.createEvent(\'HTMLevents\'); evt.initEvent(\'change\',true,true); ';
        menuCollectables += 'allInputs[0].dispatchEvent(evt);"><span class="button"></span></label></div>';
        menuCollectables += '</div>'
            + '</div>';
        fillHHPopUp("menuCollectable", getTextForUI("menuCollectable", "elementText"), menuCollectables);
        document.querySelectorAll("#HHAutoPopupGlobalPopup.menuCollectable .menuCollectablesItem").forEach(currentInput => {
            currentInput.addEventListener("change", getSelectedCollectables);
        });
    }
    function getSelectedCollectables() {
        let collectablesList = [];
        document.querySelectorAll("#HHAutoPopupGlobalPopup.menuCollectable .menuCollectablesItem").forEach(currentInputElement => {
            const currentInput = currentInputElement;
            if (currentInput.checked) {
                //console.log(currentInput.id);
                collectablesList.push(currentInput.id);
            }
        });
        setStoredValue(inVarName, JSON.stringify(collectablesList));
    }
}
function getLocalStorageSize() {
    var allStrings = '';
    for (var key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            allStrings += localStorage[key];
        }
    }
    for (var key in sessionStorage) {
        if (sessionStorage.hasOwnProperty(key)) {
            allStrings += sessionStorage[key];
        }
    }
    return allStrings ? 3 + ((allStrings.length * 16) / (8 * 1024)) + ' KB' : 'Empty (0 KB)';
}

;// CONCATENATED MODULE: ./src/Utils/BrowserUtils.ts
function getBrowserData(nav) {
    let name, version;
    var ua = nav.userAgent;
    var browserMatch = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*([\d\.]+)/i) || [];
    if (browserMatch[1]) {
        browserMatch[1] = browserMatch[1].toLowerCase();
    }
    var operaMatch;
    if (browserMatch[1] === 'chrome') {
        operaMatch = ua.match(/\bOPR\/([\d\.]+)/);
    }
    if (/trident/i.test(browserMatch[1])) {
        var msieMatch = /\brv[ :]+([\d\.]+)/g.exec(ua) || [];
        name = 'msie';
        version = msieMatch[1];
    }
    else if (operaMatch) {
        name = 'opera';
        version = operaMatch[1];
    }
    else if (browserMatch[1] === 'safari') {
        var safariVersionMatch = ua.match(/version\/([\d\.]+)/i);
        name = 'safari';
        version = safariVersionMatch[1];
    }
    else {
        name = browserMatch[1];
        version = browserMatch[2];
    }
    var versionParts = [];
    if (version) {
        var versionPartsMatch = version.match(/(\d+)/g) || [];
        for (var i = 0; i < versionPartsMatch.length; i++) {
            versionParts.push(versionPartsMatch[i]);
        }
        //if (versionParts.length > 0) { data.majorVersion = versionParts[0]; }
    }
    name = name || '(unknown browser name)';
    version = {
        full: version || '(unknown full browser version)',
        parts: versionParts,
        major: versionParts.length > 0 ? versionParts[0] : '(unknown major browser version)'
    };
    return name + ' ' + version['full'];
}
;

;// CONCATENATED MODULE: ./src/Utils/LogUtils.ts



const MAX_LINES = 500;
function cleanLogsInStorage() {
    var currentLoggingText = {};
    let currDate = new Date();
    var prefix = currDate.toLocaleString() + "." + currDate.getMilliseconds() + ":cleanLogsInStorage";
    currentLoggingText[prefix] = 'Cleaned logging, storage size before clean ' + getLocalStorageSize();
    setStoredValue(HHStoredVarPrefixKey + "Temp_Logging", JSON.stringify(currentLoggingText));
    // Delete big temp in storage
    deleteStoredValue(HHStoredVarPrefixKey + "Temp_LeagueOpponentList");
}
function LogUtils_logHHAuto(...args) {
    const stackTrace = (new Error()).stack || '';
    let match;
    const regExps = [/at Object\.([\w_.]+) \((\S+)\)/, /\n([\w_.]+)@(\S+)/, /\)\n    at ([\w_.]+) \((\S+)\)/];
    regExps.forEach(element => {
        if (!(match && match.length >= 2))
            match = stackTrace.match(element);
    });
    if (!(match && match.length >= 2))
        match = ['Unknown', 'Unknown'];
    const callerName = match[1];
    let currDate = new Date();
    var prefix = currDate.toLocaleString() + "." + currDate.getMilliseconds() + ":" + callerName;
    var text;
    var currentLoggingText;
    var nbLines;
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
    if (args.length === 1) {
        if (typeof args[0] === 'string' || args[0] instanceof String) {
            text = args[0];
        }
        else {
            text = JSON.stringify(args[0], getCircularReplacer(), 2);
        }
    }
    else {
        text = JSON.stringify(args, getCircularReplacer(), 2);
    }
    currentLoggingText = getStoredValue(HHStoredVarPrefixKey + "Temp_Logging") !== undefined ? getStoredValue(HHStoredVarPrefixKey + "Temp_Logging") : "reset";
    //console.log("debug : ",currentLoggingText);
    if (!currentLoggingText.startsWith("{")) {
        //console.log("debug : delete currentLog");
        currentLoggingText = {};
    }
    else {
        currentLoggingText = JSON.parse(currentLoggingText);
    }
    nbLines = Object.keys(currentLoggingText).length;
    //console.log("Debug : Counting log lines : "+nbLines);
    if (nbLines > MAX_LINES) {
        var keys = Object.keys(currentLoggingText);
        //console.log("Debug : removing old lines");
        for (var i = 0; i < nbLines - MAX_LINES; i++) {
            //console.log("debug delete : "+currentLoggingText[keys[i]]);
            delete currentLoggingText[keys[i]];
        }
    }
    let count = 1;
    let newPrefix = prefix;
    while (currentLoggingText.hasOwnProperty(newPrefix) && count < 10) {
        newPrefix = prefix + "-" + count;
        count++;
    }
    prefix = newPrefix;
    console.log(prefix + ":" + text);
    currentLoggingText[prefix] = text;
    setStoredValue(HHStoredVarPrefixKey + "Temp_Logging", JSON.stringify(currentLoggingText));
}
function saveHHDebugLog() {
    var dataToSave = {};
    var name = 'HH_DebugLog_' + Date.now() + '.log';
    dataToSave['HHAuto_browserVersion'] = getBrowserData(window.navigator || navigator);
    dataToSave['HHAuto_scriptHandler'] = GM_info.scriptHandler + ' ' + GM_info.version;
    dataToSave['HHAuto_version'] = GM_info.script.version;
    dataToSave['HHAuto_HHSite'] = window.location.origin;
    dataToSave['HHAuto_storageSize'] = getLocalStorageSize();
    extractHHVars(dataToSave, true);
    const a = document.createElement('a');
    a.download = name;
    a.href = URL.createObjectURL(new Blob([JSON.stringify(dataToSave, null, 2)], { type: 'application/json' }));
    a.click();
}

;// CONCATENATED MODULE: ./src/model/EventGirl.ts


class EventGirl {
    constructor(girlData, eventId, seconds_before_end, is_mythic = false, parseSource = true) {
        this.name = '';
        this.event_id = '';
        this.girl_id = girlData.id_girl;
        this.shards = girlData.shards;
        this.seconds_before_end = seconds_before_end;
        this.is_mythic = is_mythic;
        this.name = girlData.name;
        this.event_id = eventId;
        if (parseSource) {
            this.parseSource(girlData);
        }
    }
    /*
    constructor(girl_id: number, troll_id: number, champ_id: number, girl_shards: number, girl_name: string, event_id: string, is_mythic: boolean = false) {
        this.girl_id = girl_id;
        this.troll_id = troll_id;
        this.champ_id = champ_id;
        this.girl_shards = girl_shards;
        this.is_mythic = is_mythic;
        this.girl_name = girl_name;
        this.event_id = event_id;
    }*/
    isOnTroll() {
        return this.troll_id > 0;
    }
    isOnChampion() {
        return this.champ_id > 0;
    }
    toString() {
        if (this.isOnTroll()) {
            return `Event girl : ${this.name} (${this.shards}/100) at troll ${this.troll_id} on event : ${this.event_id}`;
        }
        else if (this.isOnChampion()) {
            return `Event girl : ${this.name} (${this.shards}/100) at champ ${this.champ_id} on event : ${this.event_id}`;
        }
        return `Event girl : ${this.name} (${this.shards}/100) on event : ${this.event_id}`;
    }
    parseSource(girlData) {
        if (girlData.source) {
            if (girlData.source.name === 'event_troll') {
                try {
                    let parsedURL = new URL(girlData.source.anchor_source.url, window.location.origin);
                    this.troll_id = Number(queryStringGetParam(parsedURL.search, 'id_opponent'));
                    if (girlData.source.anchor_source.disabled) {
                        LogUtils_logHHAuto(`Troll ${this.troll_id} is not available for ${this.is_mythic ? 'mythic ' : ''}girl ${this.name} (${this.girl_id}) ignoring`);
                        this.troll_id = undefined;
                    }
                }
                catch (error) {
                    try {
                        let parsedURL = new URL(girlData.source.anchor_win_from[0].url, window.location.origin);
                        this.troll_id = Number(queryStringGetParam(parsedURL.search, 'id_opponent'));
                        if (girlData.source.anchor_win_from.disabled) {
                            LogUtils_logHHAuto(`Troll ${this.troll_id} is not available for ${this.is_mythic ? 'mythic ' : ''}girl ${this.name} (${this.girl_id}) ignoring`);
                            this.troll_id = undefined;
                        }
                    }
                    catch (error) {
                        LogUtils_logHHAuto(`Can't get troll from girl ${this.name} (${this.girl_id})`);
                    }
                }
            }
            else if (girlData.source.name === 'event_champion_girl') {
                try {
                    this.champ_id = Number(girlData.source.anchor_source.url.split('/champions/')[1]);
                    if (girlData.source.anchor_source.disabled) {
                        LogUtils_logHHAuto(`Champion ${this.champ_id} is not available for ${this.is_mythic ? 'mythic ' : ''}girl ${this.name} (${this.girl_id}) ignoring`);
                        this.champ_id = undefined;
                    }
                }
                catch (error) {
                    try {
                        this.champ_id = Number(girlData.source.anchor_win_from[0].url.split('/champions/')[1]);
                        if (girlData.source.anchor_win_from.disabled) {
                            LogUtils_logHHAuto(`Champion ${this.champ_id} is not available for ${this.is_mythic ? 'mythic ' : ''}girl ${this.name} (${this.girl_id}) ignoring`);
                            this.champ_id = undefined;
                        }
                    }
                    catch (error) {
                        LogUtils_logHHAuto(`Can't get champion from girl ${this.name} (${this.girl_id})`);
                    }
                }
            }
            else if (girlData.source.name === 'event_dm') {
                // Daily missions girl
            }
            else if (girlData.source.name === 'pachinko_event') {
                // pachinko event girl
            }
            else {
                LogUtils_logHHAuto(`Other source found ${girlData.source.name}`);
            }
        }
    }
}

;// CONCATENATED MODULE: ./src/model/LeagueOpponent.ts
//@ts-check
class LeagueOpponent {
    // constructor(opponent_id: any,rank: number,nickname: string,level: number,power: number,player_league_points: number,simuPoints: number,nb_boosters: number, kkOpponent:KKLeagueOpponent, simu:BDSMSimu){
    constructor(opponent_id, nickname, power, simuPoints, simu) {
        // stats= {}; // fill stats if needed
        // nb_boosters: number = 0;
        // kkOpponent:KKLeagueOpponent = {} as any;
        this.simu = {};
        this.opponent_id = opponent_id;
        // this.rank = rank;
        this.nickname = nickname;
        // this.level = level;
        this.power = power;
        // this.player_league_points = player_league_points;
        this.simuPoints = simuPoints;
        // this.nb_boosters = nb_boosters;
        // this.kkOpponent = kkOpponent;
        this.simu = simu;
    }
}

;// CONCATENATED MODULE: ./src/model/Mission.ts
class Mission {
    constructor() {
        this.finished = false;
    }
}
class MissionRewards {
    constructor() {
        this.type = '';
    }
}

;// CONCATENATED MODULE: ./src/model/index.ts








;// CONCATENATED MODULE: ./src/Helper/BDSMHelper.ts


class BDSMHelper {
    static fightBonues(team) {
        return {
            critDamage: team.synergies.find(({ element: { type } }) => type === 'fire').bonus_multiplier,
            critChance: team.synergies.find(({ element: { type } }) => type === 'stone').bonus_multiplier,
            defReduce: team.synergies.find(({ element: { type } }) => type === 'sun').bonus_multiplier,
            healOnHit: team.synergies.find(({ element: { type } }) => type === 'water').bonus_multiplier
        };
    }
    static getBdsmPlayersData(inHeroData, opponentData, inLeague = false) {
        // player stats
        const playerEgo = inHeroData.remaining_ego;
        const playerDef = inHeroData.defense;
        const playerAtk = inHeroData.damage;
        const playerCrit = inHeroData.chance;
        let playerElements = [];
        inHeroData.team.theme_elements.forEach((el) => playerElements.push(el.type));
        const playerBonuses = BDSMHelper.fightBonues(inHeroData.team);
        const opponentEgo = opponentData.remaining_ego;
        const opponentDef = opponentData.defense;
        const opponentAtk = opponentData.damage;
        const opponentCrit = opponentData.chance;
        let opponentElements = [];
        opponentData.team.theme_elements.forEach((el) => opponentElements.push(el.type));
        const opponentBonuses = BDSMHelper.fightBonues(opponentData.team);
        const dominanceBonuses = calculateDominationBonuses(playerElements, opponentElements);
        const player = new BDSMPlayer(inLeague ? playerEgo * (1 + dominanceBonuses.player.ego) : playerEgo, inLeague ? playerAtk * (1 + dominanceBonuses.player.attack) : playerAtk, opponentDef, calculateCritChanceShare(playerCrit, opponentCrit) + dominanceBonuses.player.chance + playerBonuses.critChance, playerBonuses, calculateTier4SkillValue(inHeroData.team.girls), calculateTier5SkillValue(inHeroData.team.girls), inHeroData.nickname);
        const opponent = new BDSMPlayer(opponentEgo, opponentAtk, inLeague ? playerDef * (1 - opponentBonuses.defReduce) : playerDef, calculateCritChanceShare(opponentCrit, playerCrit) + dominanceBonuses.opponent.chance + opponentBonuses.critChance, opponentBonuses, calculateTier4SkillValue(opponentData.team.girls), calculateTier5SkillValue(opponentData.team.girls), opponentData.nickname);
        return { player: player, opponent: opponent, dominanceBonuses: dominanceBonuses };
    }
}
let _player;
let _opponent;
let _cache;
let _runs;
//all following lines credit:Tom208 OCD script
const tier5_Skill_Id = [11, 12, 13, 14];
function calculateBattleProbabilities(player, opponent) {
    _player = player;
    _opponent = opponent;
    const setup = x => {
        x.critMultiplier = 2 + x.bonuses.critDamage;
        x.hp = Math.ceil(x.hp);
    };
    setup(_player);
    setup(_opponent);
    _cache = {};
    _runs = 0;
    //Tier 5 skill : Shield
    let playerShield = 0;
    let opponentShield = 0;
    let ret;
    try {
        // start simulation from player's turn
        ret = playerTurn(_player.hp, _opponent.hp, 0);
    }
    catch (error) {
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
    ret.scoreClass = ret.win > 0.9 ? 'plus' : ret.win < 0.5 ? 'minus' : 'close';
    return ret;
    function calculateDmg(x, turns) {
        const dmg = x.atk * Math.pow((1 + x.tier4.dmg), turns) - x.adv_def * Math.pow((1 + x.tier4.def), turns);
        return {
            baseAtk: {
                probability: 1 - x.critchance,
                damageAmount: Math.ceil(dmg)
            },
            critAtk: {
                probability: x.critchance,
                damageAmount: Math.ceil(dmg * x.critMultiplier)
            }
        };
    }
    function mergeResult(x, xProbability, y, yProbability) {
        const points = {};
        Object.entries(x.points).map(([point, probability]) => [point, probability * xProbability])
            .concat(Object.entries(y.points).map(([point, probability]) => [point, probability * yProbability]))
            .forEach(([point, probability]) => {
            points[point] = (points[point] || 0) + probability;
        });
        const merge = (x, y) => x * xProbability + y * yProbability;
        const win = merge(x.win, y.win);
        const loss = merge(x.loss, y.loss);
        const avgTurns = merge(x.avgTurns, y.avgTurns);
        return { points, win, loss, avgTurns };
    }
    function playerTurn(playerHP, opponentHP, turns) {
        var _a;
        turns += 1;
        // avoid a stack overflow
        const maxAllowedTurns = 50;
        if (turns > maxAllowedTurns)
            throw new Error();
        // read cache
        const cachedResult = (_a = _cache === null || _cache === void 0 ? void 0 : _cache[playerHP]) === null || _a === void 0 ? void 0 : _a[opponentHP];
        if (cachedResult)
            return cachedResult;
        // simulate base attack and critical attack
        const { baseAtk, critAtk } = calculateDmg(_player, turns);
        const baseAtkResult = playerAttack(playerHP, opponentHP, baseAtk, turns);
        const critAtkResult = playerAttack(playerHP, opponentHP, critAtk, turns);
        // merge result
        const mergedResult = mergeResult(baseAtkResult, baseAtk.probability, critAtkResult, critAtk.probability);
        // count player's turn
        mergedResult.avgTurns += 1;
        // write cache
        if (!_cache[playerHP])
            _cache[playerHP] = {};
        if (!_cache[playerHP][opponentHP])
            _cache[playerHP][opponentHP] = {};
        _cache[playerHP][opponentHP] = mergedResult;
        return mergedResult;
    }
    function playerAttack(playerHP, opponentHP, attack, turns) {
        //Tier 5 skill : Stun
        if (_opponent.tier5.id == 11 && (turns == 2 || turns == 3)) {
            // next turn
            return playerTurn(playerHP, opponentHP, turns);
        }
        let playerDamage = Math.max(0, (attack.damageAmount - opponentShield));
        opponentHP -= playerDamage;
        //Tier 5 skill : Shield
        if (_player.tier5.id == 12 && turns == 1) {
            playerShield = Math.ceil(_player.tier5.value * _player.hp);
        }
        if (_opponent.tier5.id == 12 && turns > 1) {
            opponentShield -= attack.damageAmount;
            opponentShield = Math.max(0, opponentShield);
        }
        //Tier 5 skill : Reflect
        let opponentReflectDmg = 0;
        if (_opponent.tier5.id == 13 && (turns == 2 || turns == 3)) {
            opponentReflectDmg = Math.ceil(_opponent.tier5.value * attack.damageAmount);
            playerHP -= Math.max(0, (opponentReflectDmg - playerShield));
            playerShield -= opponentReflectDmg;
            playerShield = Math.max(0, playerShield);
        }
        //Tier 5 skill : Execute
        if (_player.tier5.id == 14) {
            let opponentHPRate = opponentHP / _opponent.hp;
            if (opponentHPRate <= _player.tier5.value) {
                opponentHP = 0;
            }
        }
        // heal on hit
        let playerHeal = Math.ceil(_player.bonuses.healOnHit * playerDamage);
        playerHP += playerHeal;
        playerHP = Math.min(playerHP, _player.hp);
        // check win
        if (opponentHP <= 0) {
            const point = Math.min(25, 15 + Math.ceil(10 * playerHP / _player.hp));
            _runs += 1;
            return { points: { [point]: 1 }, win: 1, loss: 0, avgTurns: 0 };
        }
        // next turn
        return opponentTurn(playerHP, opponentHP, turns);
    }
    function opponentTurn(playerHP, opponentHP, turns) {
        // simulate base attack and critical attack
        const { baseAtk, critAtk } = calculateDmg(_opponent, turns);
        const baseAtkResult = opponentAttack(playerHP, opponentHP, baseAtk, turns);
        const critAtkResult = opponentAttack(playerHP, opponentHP, critAtk, turns);
        // merge result
        return mergeResult(baseAtkResult, baseAtk.probability, critAtkResult, critAtk.probability);
    }
    function opponentAttack(playerHP, opponentHP, attack, turns) {
        //Tier 5 skill : Stun
        if (_player.tier5.id == 11 && (turns == 1 || turns == 2)) {
            // next turn
            return playerTurn(playerHP, opponentHP, turns);
        }
        // damage
        let opponentDamage = Math.max(0, (attack.damageAmount - playerShield));
        playerHP -= opponentDamage;
        //Tier 5 skill : Shield
        if (_opponent.tier5.id == 12 && turns == 1) {
            opponentShield = Math.ceil(_opponent.tier5.value * _opponent.hp);
        }
        if (_player.tier5.id == 12) {
            playerShield -= attack.damageAmount;
            playerShield = Math.max(0, playerShield);
        }
        //Tier 5 skill : Reflect
        let playerReflectDmg = 0;
        if (_player.tier5.id == 13 && (turns == 1 || turns == 2)) {
            playerReflectDmg = Math.ceil(_player.tier5.value * attack.damageAmount);
            opponentHP -= Math.max(0, (playerReflectDmg - opponentShield));
            opponentShield -= playerReflectDmg;
            opponentShield = Math.max(0, opponentShield);
        }
        //Tier 5 skill : Execute
        if (_opponent.tier5.id == 14) {
            let playerHPRate = playerHP / _player.hp;
            if (playerHPRate <= _opponent.tier5.value) {
                playerHP = 0;
                //console.log("PLAYER EXECUTED!!");
            }
        }
        // heal on hit
        let opponentHeal = Math.ceil(_opponent.bonuses.healOnHit * opponentDamage);
        opponentHP += opponentHeal;
        opponentHP = Math.min(opponentHP, _opponent.hp);
        // check loss
        if (playerHP <= 0) {
            const point = Math.max(3, 3 + Math.ceil(10 * (_opponent.hp - opponentHP) / _opponent.hp));
            _runs += 1;
            return { points: { [point]: 1 }, win: 0, loss: 1, avgTurns: 0 };
        }
        // next turn
        return playerTurn(playerHP, opponentHP, turns);
    }
}
function calculateTier4SkillValue(teamGirlsArray) {
    let skill_tier_4 = { dmg: 0, def: 0 };
    teamGirlsArray.forEach((girl) => {
        if (girl.skills[9])
            skill_tier_4.dmg += girl.skills[9].skill.percentage_value / 100;
        if (girl.skills[10])
            skill_tier_4.def += girl.skills[10].skill.percentage_value / 100;
    });
    return skill_tier_4;
}
function calculateTier5SkillValue(teamGirlsArray) {
    let skill_tier_5 = { id: 0, value: 0 };
    const girl = teamGirlsArray[0];
    tier5_Skill_Id.forEach((id) => {
        if (girl.skills[id]) {
            skill_tier_5.id = id;
            skill_tier_5.value = (id == 11) ? parseInt(girl.skills[id].skill.display_value_text, 10) / 100 : girl.skills[id].skill.percentage_value / 100;
        }
    });
    return skill_tier_5;
}
/*
export function calculateThemeFromElements(elements) {
    const counts = countElementsInTeam(elements)

    const theme = []
    Object.entries(counts).forEach(([element, count]) => {
        if (count >= 3) {
            theme.push(element)
        }
    })
    return theme;
}

export function countElementsInTeam(elements) {
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
*/
/*
commented        const girlDictionary
replaced         const girlCount = girlDictionary.size || 800
              by const girlCount = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_HaremSize"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_HaremSize")).count:800;
              *
export function calculateSynergiesFromTeamMemberElements(elements) {
    const counts = countElementsInTeam(elements)

    // Only care about those not included in the stats already: fire, stone, sun and water
    // Assume max harem synergy
    //const girlDictionary = (typeof(localStorage.HHPNMap) == "undefined") ? new Map(): new Map(JSON.parse(localStorage.HHPNMap));
    const girlCount = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_HaremSize"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_HaremSize")).count:800;
    const girlsPerElement = Math.min(girlCount / 8, 100)

    return {
        critDamage: (0.0035 * girlsPerElement) + (0.1  * counts.fire),
        critChance: (0.0007 * girlsPerElement) + (0.02 * counts.stone),
        defReduce:  (0.0007 * girlsPerElement) + (0.02 * counts.sun),
        healOnHit:  (0.001  * girlsPerElement) + (0.03 * counts.water)
    }
}
*/
/*
replaced       ELEMENTS
by ConfigHelper.getHHScriptVars("ELEMENTS")
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
        { a: playerElements, b: opponentElements, k: 'player' },
        { a: opponentElements, b: playerElements, k: 'opponent' }
    ].forEach(({ a, b, k }) => {
        a.forEach(element => {
            if (ConfigHelper.getHHScriptVars("ELEMENTS").egoDamage[element] && b.includes(ConfigHelper.getHHScriptVars("ELEMENTS").egoDamage[element])) {
                bonuses[k].ego += 0.1;
                bonuses[k].attack += 0.1;
            }
            if (ConfigHelper.getHHScriptVars("ELEMENTS").chance[element] && b.includes(ConfigHelper.getHHScriptVars("ELEMENTS").chance[element])) {
                bonuses[k].chance += 0.2;
            }
        });
    });
    return bonuses;
}
function calculateCritChanceShare(ownHarmony, otherHarmony) {
    return 0.3 * ownHarmony / (ownHarmony + otherHarmony);
}

;// CONCATENATED MODULE: ./src/Helper/ButtonHelper.ts


function getGoToChangeTeamButton() {
    // TODO change href and translate
    return '<div class="change_team_container"><a id="change_team" href="/teams.html" class="blue_button_L" anim-step="afterStartButton"><div>Change team</div></a></div>';
}
function getGoToClubChampionButton() {
    return `<button data-href="${ConfigHelper.getHHScriptVars("pagesURLClubChampion")}" class="blue_button_L hh-club-poa">${getTextForUI("goToClubChampions", "elementText")}</button>`;
}

;// CONCATENATED MODULE: ./src/Helper/HHHelper.ts


function getHHVars(infoSearched, logging = true) {
    let returnValue = unsafeWindow;
    if (ConfigHelper.getHHScriptVars(infoSearched, false) !== null) {
        infoSearched = ConfigHelper.getHHScriptVars(infoSearched);
    }
    let splittedInfoSearched = infoSearched.split(".");
    for (let i = 0; i < splittedInfoSearched.length; i++) {
        if (returnValue[splittedInfoSearched[i]] === undefined) {
            if (logging) {
                LogUtils_logHHAuto("HH var not found : " + infoSearched + " (" + splittedInfoSearched[i] + " not defined).");
            }
            return null;
        }
        else {
            returnValue = returnValue[splittedInfoSearched[i]];
        }
    }
    return returnValue;
}
function setHHVars(infoSearched, newValue) {
    let returnValue = unsafeWindow;
    if (ConfigHelper.getHHScriptVars(infoSearched, false) !== null) {
        infoSearched = ConfigHelper.getHHScriptVars(infoSearched);
    }
    let splittedInfoSearched = infoSearched.split(".");
    for (let i = 0; i < splittedInfoSearched.length; i++) {
        if (returnValue[splittedInfoSearched[i]] === undefined) {
            LogUtils_logHHAuto("HH var not found : " + infoSearched + " (" + splittedInfoSearched[i] + " not defined).");
            return -1;
        }
        else if (i === splittedInfoSearched.length - 1) {
            returnValue[splittedInfoSearched[i]] = newValue;
            return 0;
        }
        else {
            returnValue = returnValue[splittedInfoSearched[i]];
        }
    }
}

;// CONCATENATED MODULE: ./src/Helper/TimeHelper.ts





Date.prototype.stdTimezoneOffset = function () {
    var jan = new Date(this.getFullYear(), 0, 1);
    var jul = new Date(this.getFullYear(), 6, 1);
    return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};
Date.prototype.isDstObserved = function () {
    return this.getTimezoneOffset() < this.stdTimezoneOffset();
};
/*
(new Date()).toLocaleString([], {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  })
  */
class TimeHelper {
    static getEETDSTOffset() {
        if (TimeHelper.dSTOffset < 0) {
            const today = new Date();
            function getEuropeStdTimezoneOffset(today) {
                // KK is in Sofia
                var jan = new Date(new Date(today.getFullYear(), 0, 1).toLocaleString('en-US', { timeZone: 'Europe/Sofia' }));
                var jul = new Date(new Date(today.getFullYear(), 6, 1).toLocaleString('en-US', { timeZone: 'Europe/Sofia' }));
                return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
            }
            function isDstObserved(today) {
                return today.getTimezoneOffset() < getEuropeStdTimezoneOffset(today);
            }
            if (isDstObserved(today)) {
                TimeHelper.dSTOffset = 120; // Summer time
            }
            else {
                TimeHelper.dSTOffset = 60; // Winter time
            }
        }
        return TimeHelper.dSTOffset;
    }
    static getServerTS() {
        let sec_num = parseInt(getHHVars('server_now_ts'), 10);
        sec_num += TimeHelper.getEETDSTOffset() * 60;
        let days = Math.floor(sec_num / 86400);
        let hours = Math.floor(sec_num / 3600) % 24;
        let minutes = Math.floor(sec_num / 60) % 60;
        let seconds = sec_num % 60;
        return { days: days, hours: hours, minutes: minutes, seconds: seconds };
    }
    static canCollectCompetitionActive() {
        let safeTime = getStoredValue(HHStoredVarPrefixKey + "Setting_safeSecondsForContest") !== undefined ? Number(getStoredValue(HHStoredVarPrefixKey + "Setting_safeSecondsForContest")) : 120;
        if (isNaN(safeTime) || safeTime < 0)
            safeTime = 120;
        return getStoredValue(HHStoredVarPrefixKey + "Setting_waitforContest") !== "true" || TimeHelper.getSecondsLeftBeforeNewCompetition() > (30 * 60 + safeTime) && TimeHelper.getSecondsLeftBeforeNewCompetition() < (24 * 3600 - safeTime);
    }
    static toHHMMSS(secs) {
        var sec_num = parseInt(secs, 10);
        var days = Math.floor(sec_num / 86400);
        var hours = Math.floor(sec_num / 3600) % 24;
        var minutes = Math.floor(sec_num / 60) % 60;
        var seconds = sec_num % 60;
        var n = 0;
        return [days, hours, minutes, seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v, i) => { if (v !== "00") {
            n++;
            return true;
        } return n > 0; })
            .join(":");
    }
    static getSecondsLeftBeforeEndOfHHDay() {
        let HHEndOfDay = { days: 0, hours: 13, minutes: 0, seconds: 0 };
        let server_TS = TimeHelper.getServerTS();
        HHEndOfDay.days = server_TS.hours < HHEndOfDay.hours ? 0 : 1;
        let diffResetTime = (HHEndOfDay.days * 86400 + HHEndOfDay.hours * 3600 + HHEndOfDay.minutes * 60) - (server_TS.hours * 3600 + server_TS.minutes * 60);
        return diffResetTime;
    }
    static getSecondsLeftBeforeNewCompetition() {
        let HHEndOfDay = { days: 0, hours: 13, minutes: 30, seconds: 0 };
        let server_TS = TimeHelper.getServerTS();
        HHEndOfDay.days = server_TS.hours < HHEndOfDay.hours ? 0 : 1;
        let diffResetTime = (HHEndOfDay.days * 86400 + HHEndOfDay.hours * 3600 + HHEndOfDay.minutes * 60) - (server_TS.hours * 3600 + server_TS.minutes * 60);
        return diffResetTime;
    }
    static debugDate(sec_num) {
        let days = Math.floor(sec_num / 86400);
        let hours = Math.floor(sec_num / 3600) % 24;
        let minutes = Math.floor(sec_num / 60) % 60;
        let seconds = sec_num % 60;
        return JSON.stringify({ days: days, hours: hours, minutes: minutes, seconds: seconds });
    }
    static sleep(waitTime) {
        return new Promise((resolve) => {
            setTimeout(resolve, waitTime);
        });
    }
}
TimeHelper.dSTOffset = -1;
function convertTimeToInt(remainingTimer) {
    let newTimer = 0;
    if (remainingTimer && remainingTimer.length > 0) {
        try {
            let splittedTime = remainingTimer.trim().split(' ');
            for (let i = 0; i < splittedTime.length; i++) {
                let timerSymbol = splittedTime[i].match(/[^0-9]+/)[0];
                switch (timerSymbol) {
                    case timerDefinitions[hhTimerLocale].days:
                        newTimer += parseInt(splittedTime[i]) * 86400;
                        break;
                    case timerDefinitions[hhTimerLocale].hours:
                        newTimer += parseInt(splittedTime[i]) * 3600;
                        break;
                    case timerDefinitions[hhTimerLocale].minutes:
                        newTimer += parseInt(splittedTime[i]) * 60;
                        break;
                    case timerDefinitions[hhTimerLocale].seconds:
                        newTimer += parseInt(splittedTime[i]);
                        break;
                    default:
                        LogUtils_logHHAuto('Timer symbol not recognized: ' + timerSymbol);
                }
            }
        }
        catch ({ errName, message }) {
            LogUtils_logHHAuto(`ERROR: occured, reset to 15min: ${errName}, ${message}`);
            newTimer = randomInterval(15 * 60, 17 * 60);
        }
    }
    else {
        LogUtils_logHHAuto('No valid timer definitions, reset to 15min');
        newTimer = randomInterval(15 * 60, 17 * 60);
    }
    return newTimer;
}
function getLimitTimeBeforeEnd() {
    return Number(getStoredValue(HHStoredVarPrefixKey + "Setting_collectAllTimer")) * 3600;
}
function randomInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

;// CONCATENATED MODULE: ./src/Helper/HeroHelper.ts
var HeroHelper_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};







function getHero() {
    if (unsafeWindow.Hero === undefined) {
        setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey + "Temp_autoLoopTimeMili")));
        //logHHAuto(window.wrappedJSObject)
    }
    //logHHAuto(unsafeWindow.Hero);
    return unsafeWindow.Hero;
}
function doStatUpgrades() {
    //Stats?
    //logHHAuto('stats');
    var Hero = getHero();
    var stats = [getHHVars('Hero.infos.carac1'), getHHVars('Hero.infos.carac2'), getHHVars('Hero.infos.carac3')];
    var money = getHHVars('Hero.currencies.soft_currency');
    var count = 0;
    var M = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoStats"));
    var MainStat = stats[getHHVars('Hero.infos.class') - 1];
    var Limit = getHHVars('Hero.infos.level') * 30; //getHHVars('Hero.infos.level')*19+Math.min(getHHVars('Hero.infos.level'),25)*21;
    var carac = getHHVars('Hero.infos.class');
    var mp = 0;
    var mults = [60, 30, 10, 1];
    for (var car = 0; car < 3; car++) {
        //logHHAuto('stat '+carac);
        var s = stats[carac - 1];
        for (var mu = 0; mu < 5; mu++) {
            var mult = mults[mu];
            var price = 5 + s * 2 + (Math.max(0, s - 2000) * 2) + (Math.max(0, s - 4000) * 2) + (Math.max(0, s - 6000) * 2) + (Math.max(0, s - 8000) * 2);
            price *= mult;
            if (carac == getHHVars('Hero.infos.class')) {
                mp = price;
            }
            //logHHAuto('money: '+money+' stat'+carac+': '+stats[carac-1]+' price: '+price);
            if ((stats[carac - 1] + mult) <= Limit && (money - price) > M && (carac == getHHVars('Hero.infos.class') || price < mp / 2 || (MainStat + mult) > Limit)) {
                count++;
                LogUtils_logHHAuto('money: ' + money + ' stat' + carac + ': ' + stats[carac - 1] + ' [+' + mult + '] price: ' + price);
                money -= price;
                var params = {
                    carac: "carac" + carac,
                    action: "hero_update_stats",
                    nb: mult
                };
                unsafeWindow.hh_ajax(params, function (data) {
                    Hero.update("soft_currency", 0 - price, true);
                });
                setTimeout(doStatUpgrades, randomInterval(300, 500));
                return;
                break;
            }
        }
        carac = (carac + 1) % 3 + 1;
    }
}
class HeroHelper {
    static haveBoosterInInventory(idBooster) {
        const HaveBooster = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_haveBooster")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_haveBooster")) : {};
        const boosterOwned = HaveBooster.hasOwnProperty(idBooster) ? Number(HaveBooster[idBooster]) : 0;
        return boosterOwned > 0;
    }
    static equipBooster(booster) {
        return HeroHelper_awaiter(this, void 0, void 0, function* () {
            if (!booster)
                return Promise.resolve(false);
            if (!HeroHelper.haveBoosterInInventory(booster.identifier)) {
                LogUtils_logHHAuto("Booster " + booster + " not in inventory");
                return Promise.resolve(false);
            }
            let itemId = ConfigHelper.getHHScriptVars("boosterId_" + booster.identifier, false);
            if (!itemId) {
                itemId = booster.id_item;
            }
            //action=market_equip_booster&id_item=316&type=booster
            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
            LogUtils_logHHAuto("Equip " + booster.name + ", setting autoloop to false");
            const params = {
                action: "market_equip_booster",
                id_item: itemId,
                type: "booster"
            };
            return new Promise((resolve) => {
                // change referer
                const currentPath = window.location.href.replace('http://', '').replace('https://', '').replace(window.location.hostname, '');
                window.history.replaceState(null, '', addNutakuSession('/shop.html'));
                unsafeWindow.hh_ajax(params, function (data) {
                    if (data.success)
                        LogUtils_logHHAuto('Booster equipped');
                    else
                        HeroHelper.getSandalWoodEquipFailure(true); // Increase failure
                    setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "true");
                    setTimeout(autoLoop, randomInterval(500, 800));
                    resolve(true);
                }, function (err) {
                    LogUtils_logHHAuto('Error occured booster not equipped, could be booster is already equipped');
                    setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "true");
                    setTimeout(autoLoop, randomInterval(500, 800));
                    HeroHelper.getSandalWoodEquipFailure(true); // Increase failure
                    resolve(false);
                });
                // change referer
                window.history.replaceState(null, '', addNutakuSession(currentPath));
            });
        });
    }
    static getSandalWoodEquipFailure(increase = false) {
        var _a;
        const numberFailureStr = (_a = getStoredValue(HHStoredVarPrefixKey + "Temp_sandalwoodFailure")) !== null && _a !== void 0 ? _a : '0';
        let numberFailure = numberFailureStr ? Number(numberFailureStr) : 0;
        if (isNaN(numberFailure))
            numberFailure = 0;
        if (increase)
            numberFailure = numberFailure + 1;
        setStoredValue(HHStoredVarPrefixKey + "Temp_sandalwoodFailure", numberFailure);
        return numberFailure;
    }
}

;// CONCATENATED MODULE: ./src/Helper/PageHelper.ts






function getPage(checkUnknown = false) {
    var ob = document.getElementById(ConfigHelper.getHHScriptVars("gameID"));
    if (ob === undefined || ob === null) {
        LogUtils_logHHAuto("Unable to find page attribute, stopping script");
        setStoredValue(HHStoredVarPrefixKey + "Setting_master", "false");
        setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
        LogUtils_logHHAuto("setting autoloop to false");
        throw new Error("Unable to find page attribute, stopping script.");
        return "";
    }
    //var p=ob.className.match(/.*page-(.*) .*/i)[1];
    let activitiesMainPage = ConfigHelper.getHHScriptVars("pagesIDActivities");
    var tab = queryStringGetParam(window.location.search, 'tab');
    var p = ob.getAttribute('page');
    let page = p;
    if (p == activitiesMainPage) {
        if (tab === 'contests' || $("#activities-tabs > div.switch-tab.underline-tab.tab-switcher-fade-in[data-tab='contests']").length > 0) {
            page = ConfigHelper.getHHScriptVars("pagesIDContests");
        }
        if (tab === 'missions' || $("#activities-tabs > div.switch-tab.underline-tab.tab-switcher-fade-in[data-tab='missions']").length > 0) {
            page = ConfigHelper.getHHScriptVars("pagesIDMissions");
        }
        if (tab === 'daily_goals' || $("#activities-tabs > div.switch-tab.underline-tab.tab-switcher-fade-in[data-tab='daily_goals']").length > 0) {
            page = ConfigHelper.getHHScriptVars("pagesIDDailyGoals");
            if (tab === 'pop') {
                // Wrong POP targetted
                var index = queryStringGetParam(window.location.search, 'index');
                if (index !== null) {
                    PlaceOfPower.addPopToUnableToStart(index, "Unable to go to Pop " + index + " as it is locked.");
                    PlaceOfPower.removePopFromPopToStart(index);
                }
            }
        }
        if (tab === 'pop' || $("#activities-tabs > div.switch-tab.underline-tab.tab-switcher-fade-in[data-tab='pop']").length > 0) {
            // if on Pop menu
            var t;
            var popList = $("div.pop_list");
            if (popList.attr('style') != 'display:none') {
                t = 'main';
            }
            else {
                // Keep this but not triggered anymore. When Wrong POP is targetted, daily goals is highlighted
                t = $(".pop_thumb_selected").attr("pop_id");
                checkUnknown = false;
                if (t === undefined) {
                    var index = queryStringGetParam(window.location.search, 'index');
                    if (index !== null) {
                        PlaceOfPower.addPopToUnableToStart(index, "Unable to go to Pop " + index + " as it is locked.");
                        PlaceOfPower.removePopFromPopToStart(index);
                        t = 'main';
                    }
                }
            }
            page = "powerplace" + t;
        }
    }
    if (checkUnknown) {
        const knownPages = ConfigHelper.getHHScriptVars("pagesKnownList");
        let isKnown = false;
        for (let knownPage of knownPages) {
            //console.log(knownPage)
            if (page === ConfigHelper.getHHScriptVars("pagesID" + knownPage)) {
                isKnown = true;
            }
        }
        if (!isKnown && page) {
            let unknownPageList = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_unkownPagesList")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_unkownPagesList")) : {};
            LogUtils_logHHAuto("Page unkown for script : " + page + " / " + window.location.pathname);
            unknownPageList[page] = window.location.pathname;
            //console.log(unknownPageList);
            setStoredValue(HHStoredVarPrefixKey + "Temp_unkownPagesList", JSON.stringify(unknownPageList));
        }
    }
    return page;
}

;// CONCATENATED MODULE: ./src/Helper/PriceHelper.ts

function parsePrice(princeStr) {
    // Parse price to number 105K to 105000, 6.38M to 6380000
    // Replace comma by dots for local supports
    let ret = Number.NaN;
    if (princeStr && princeStr.indexOf('B') > 0) {
        ret = Number(princeStr.replace(/B/g, '').replace(',', '.')) * 1000000000;
    }
    else if (princeStr && princeStr.indexOf('M') > 0) {
        ret = Number(princeStr.replace(/M/g, '').replace(',', '.')) * 1000000;
    }
    else if (princeStr && princeStr.indexOf('K') > 0) {
        ret = Number(princeStr.replace(/K/g, '').replace(',', '.')) * 1000;
    }
    else {
        ret = NumberHelper.remove1000sSeparator(princeStr);
    }
    return ret;
}
/*
export function manageUnits(inText)
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
*/ 

;// CONCATENATED MODULE: ./src/Helper/RewardHelper.ts











class RewardHelper {
    static getRewardTypeBySlot(inSlot) {
        var _a, _b;
        let reward = "undetected";
        if (inSlot && ((_a = inSlot.className) === null || _a === void 0 ? void 0 : _a.indexOf('slot')) >= 0) {
            if (inSlot.getAttribute("cur") !== null) {
                //console.log(currentIndicator+" : "+inSlot.getAttribute("cur"));
                reward = inSlot.getAttribute("cur");
            }
            else if (inSlot.className.indexOf('slot_avatar') >= 0) {
                //console.log(currentIndicator+" : avatar");
                if (inSlot.className.indexOf('girl_ico') >= 0) {
                    reward = 'girl_shards';
                }
                else {
                    reward = 'avatar';
                }
            }
            else if (inSlot.className.indexOf('girl-shards-slot') >= 0 || inSlot.className.indexOf('slot_girl_shards') >= 0) {
                reward = 'girl_shards';
            }
            else if (inSlot.className.indexOf('slot_random_girl') >= 0) {
                reward = 'random_girl_shards'; // Random girl shards
            }
            else if (inSlot.className.indexOf('mythic') >= 0) {
                //console.log("mythic equipment");
                reward = 'mythic';
            }
            else if (inSlot.className.indexOf('slot_scrolls_') >= 0) {
                reward = 'scrolls';
            }
            else if (inSlot.className.indexOf('slot_seasonal_event_cash') >= 0) {
                reward = 'event_cash';
            }
            else if (inSlot.getAttribute("data-d") !== null && $(inSlot).data("d")) {
                let objectData = $(inSlot).data("d");
                //console.log(currentIndicator+" : "+inSlot.getAttribute("rarity")+" "+objectData.item.type+" "+objectData.item.value);
                reward = objectData.item.type;
            }
            else {
                const possibleRewards = ConfigHelper.getHHScriptVars("possibleRewardsList");
                for (let currentRewards of Object.keys(possibleRewards)) {
                    if (inSlot.className.indexOf('slot_' + currentRewards) >= 0) {
                        reward = currentRewards;
                    }
                }
            }
        }
        else if (inSlot && ((_b = inSlot.className) === null || _b === void 0 ? void 0 : _b.indexOf('shards_girl_ico')) >= 0) {
            //console.log(currentIndicator+" : shards_girl_ico");
            reward = 'girl_shards';
        }
        //console.log(reward);
        return reward;
    }
    static getRewardTypeByData(inData) {
        var _a, _b;
        let reward = "undetected";
        if (inData === null || inData === void 0 ? void 0 : inData.hasOwnProperty("type")) {
            reward = inData.type;
        }
        else if (inData === null || inData === void 0 ? void 0 : inData.hasOwnProperty("ico")) {
            if (((_a = inData.ico) === null || _a === void 0 ? void 0 : _a.indexOf("items/K")) > 0) {
                reward = "gift";
            }
            else if (((_b = inData.ico) === null || _b === void 0 ? void 0 : _b.indexOf("items/XP")) > 0) {
                reward = "potion";
            }
        }
        //console.log(reward);
        return reward;
    }
    static getRewardQuantityByType(rewardType, inSlot) {
        // TODO update logic for potion / gift to be more accurate
        switch (rewardType) {
            case 'girl_shards': return Number($('.shards', inSlot).attr('shards'));
            case 'random_girl_shards':
            case 'energy_kiss':
            case 'energy_quest':
            case 'energy_fight':
            case 'xp':
            case 'soft_currency':
            case 'hard_currency':
            case 'event_cash':
            case 'gift':
            case 'potion':
            case 'booster':
            case 'orbs':
            case 'gems':
            case 'scrolls':
            case 'ticket': return parsePrice($('.amount', inSlot).text());
            case 'mythic': return 1;
            case 'avatar': return 1;
            default:
                LogUtils_logHHAuto('Error: reward type unknown ' + rewardType);
                return 0;
        }
    }
    static getPovNotClaimedRewards() {
        const arrayz = $('.potions-paths-tiers-section .potions-paths-tier.unclaimed');
        const freeSlotSelectors = ".free-slot:not(.claimed-locked) .slot,.free-slot:not(.claimed-locked) .shards_girl_ico";
        const paidSlotSelectors = ".paid-slots:not(.paid-locked):not(.claimed-locked) .slot,.paid-slots:not(.paid-locked):not(.claimed-locked) .shards_girl_ico";
        return RewardHelper.computeRewardsCount(arrayz, freeSlotSelectors, paidSlotSelectors);
    }
    static computeRewardsCount(arrayz, freeSlotSelectors, paidSlotSelectors) {
        const rewardCountByType = new Map();
        var rewardType, rewardSlot, rewardAmount;
        // data-d='{"item":{"id_item":"323","type":"potion","identifier":"XP4","rarity":"legendary","price":"500000","currency":"sc","value":"2500","carac1":"0","carac2":"0","carac3":"0","endurance":"0","chance":"0.00","ego":"0","damage":"0","duration":"0","skin":"hentai,gay,sexy","name":"Spell book","ico":"https://hh.hh-content.com/pictures/items/XP4.png","display_price":500000},"quantity":"1"}'
        rewardCountByType['all'] = arrayz.length;
        if (arrayz.length > 0) {
            for (var slotIndex = arrayz.length - 1; slotIndex >= 0; slotIndex--) {
                [freeSlotSelectors, paidSlotSelectors].forEach((selector) => {
                    rewardSlot = $(selector, arrayz[slotIndex]);
                    if (rewardSlot.length > 0) {
                        rewardType = RewardHelper.getRewardTypeBySlot(rewardSlot[0]);
                        rewardAmount = RewardHelper.getRewardQuantityByType(rewardType, rewardSlot[0]);
                        if (rewardCountByType.hasOwnProperty(rewardType)) {
                            rewardCountByType[rewardType] = rewardCountByType[rewardType] + rewardAmount;
                        }
                        else {
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
        if (rewardCountByType)
            //for (const [rewardType, rewardCount] of rewardCountByType.entries()) {
            for (const rewardType in rewardCountByType) {
                const rewardCount = rewardCountByType[rewardType];
                switch (rewardType) {
                    // case 'girl_shards' :    return Number($('.shards', inSlot).attr('shards'));
                    case 'random_girl_shards':
                        html += '<div class="slot slot_random_girl  size_xs"><span class="random_girl_icn"></span><div class="amount">' + NumberHelper.nRounding(rewardCount, 0, -1) + '</div></div>';
                        break;
                    case 'energy_kiss':
                        html += '<div class="slot slot_energy_kiss  size_xs"><span class="energy_kiss_icn"></span><div class="amount">' + NumberHelper.nRounding(rewardCount, 0, -1) + '</div></div>';
                        break;
                    case 'energy_quest':
                        html += '<div class="slot slot_energy_quest size_xs"><span class="energy_quest_icn"></span><div class="amount">' + NumberHelper.nRounding(rewardCount, 0, -1) + '</div></div>';
                        break;
                    case 'energy_fight':
                        html += '<div class="slot slot_energy_fight  size_xs"><span class="energy_fight_icn"></span><div class="amount">' + NumberHelper.nRounding(rewardCount, 0, -1) + '</div></div>';
                        break;
                    case 'xp':
                        html += '<div class="slot slot_xp size_xs"><span class="xp_icn"></span><div class="amount">' + NumberHelper.nRounding(rewardCount, 1, -1) + '</div></div>';
                        break;
                    case 'soft_currency':
                        html += '<div class="slot slot_soft_currency size_xs"><span class="soft_currency_icn"></span><div class="amount">' + NumberHelper.nRounding(rewardCount, 1, -1) + '</div></div>';
                        break;
                    case 'hard_currency':
                        html += '<div class="slot slot_hard_currency size_xs"><span class="hard_currency_icn"></span><div class="amount">' + NumberHelper.nRounding(rewardCount, 0, -1) + '</div></div>';
                        break;
                    case 'event_cash':
                        html += '<div class="slot slot_seasonal_event_cash size_xs"><span class="mega_event_cash_icn"></span><div class="amount">' + NumberHelper.nRounding(rewardCount, 0, -1) + '</div></div>';
                        break;
                    // case 'gift':
                    // case 'potion' :
                    // case 'booster' :
                    // case 'orbs':
                    // case 'gems' :           html += '<div class="slot slot_gems size_xs"><span class="gem_all_icn"></span><div class="amount">'+nRounding(rewardCount,0,-1)+'</div></div>'; break;
                    // case 'scrolls' :
                    case 'ticket':
                        html += '<div class="slot slot_ticket size_xs"><span class="ticket_icn"></span><div class="amount">' + NumberHelper.nRounding(rewardCount, 0, -1) + '</div></div>';
                        break;
                    // case 'mythic' :         html += '<div class="slot mythic random_equipment size_xs"><span class="mythic_equipment_icn"></span><div class="amount">'+nRounding(rewardCount,0,-1)+'</div></div>'; break;
                    // case 'avatar':          return 1;
                    default:
                }
            }
        return html;
    }
    static displayRewardsDiv(target, hhRewardId, rewardCountByType) {
        const emptyRewardDiv = $('<div id=' + hhRewardId + ' style="display:none;"></div>');
        try {
            if ($('#' + hhRewardId).length <= 0) {
                if (rewardCountByType['all'] > 0) {
                    const rewardsHtml = RewardHelper.getRewardsAsHtml(rewardCountByType);
                    if (rewardsHtml && rewardsHtml != '') {
                        target.append($('<div id=' + hhRewardId + ' class="HHRewardNotCollected"><h1 style="font-size: small;">' + getTextForUI('rewardsToCollectTitle', "elementText") + '</h1>' + rewardsHtml + '</div>'));
                    }
                    else {
                        target.append(emptyRewardDiv);
                    }
                }
                else {
                    target.append(emptyRewardDiv);
                }
            }
        }
        catch (err) {
            LogUtils_logHHAuto("ERROR:", err.message);
            target.append(emptyRewardDiv);
        }
    }
    static displayRewardsPovPogDiv() {
        const target = $('.potions-paths-first-row');
        const hhRewardId = 'HHPovPogRewards';
        if ($('#' + hhRewardId).length <= 0) {
            const rewardCountByType = RewardHelper.getPovNotClaimedRewards();
            RewardHelper.displayRewardsDiv(target, hhRewardId, rewardCountByType);
        }
    }
    static closeRewardPopupIfAny(logging = true) {
        let rewardQuery = "div#rewards_popup button.blue_button_L:not([disabled]):visible";
        if ($(rewardQuery).length > 0) {
            if (logging)
                LogUtils_logHHAuto("Close reward popup.");
            $(rewardQuery).trigger('click');
            return true;
        }
        return false;
    }
    static ObserveAndGetGirlRewards() {
        let inCaseTimer = setTimeout(function () { gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome")); }, 60000); //in case of issue
        function parseReward() {
            var _a, _b;
            let eventsGirlz = isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsGirlz")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_eventsGirlz")) : [];
            let eventGirl = EventModule.getEventGirl();
            let eventMythicGirl = EventModule.getEventMythicGirl();
            if (!eventsGirlz || eventsGirlz.length == 0) {
                return -1;
            }
            let foughtTrollId = Number(queryStringGetParam(window.location.search, 'id_opponent'));
            if (eventMythicGirl.troll_id && foughtTrollId != eventMythicGirl.troll_id && eventGirl.troll_id && foughtTrollId != eventGirl.troll_id) {
                LogUtils_logHHAuto(`Troll from mythic event (${eventMythicGirl.troll_id}) or from event (${eventGirl.troll_id}) not fought, was (${foughtTrollId}) instead.
                Can be issue in event variable (mythic event finished: ${EventModule.isEventActive(eventMythicGirl.event_id)},  event finished: ${EventModule.isEventActive(eventGirl.event_id)})`);
                // TTF = foughtTrollId;
            }
            if ($('#rewards_popup #reward_holder .shards_wrapper').length === 0) {
                clearTimeout(inCaseTimer);
                LogUtils_logHHAuto("No girl in reward going back to Troll");
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDTrollPreBattle"), { id_opponent: foughtTrollId });
                return;
            }
            let renewEvent = "";
            let girlShardsWon = $('.shards_wrapper .shards_girl_ico');
            LogUtils_logHHAuto("Detected girl shard reward");
            for (var currGirl = 0; currGirl <= girlShardsWon.length; currGirl++) {
                let girlIdSrc = $("img", girlShardsWon[currGirl]).attr("src") || '';
                let girlId = Number(girlIdSrc.split('/')[5]);
                let girlShards = Math.min(Number($('.shards[shards]', girlShardsWon[currGirl]).attr('shards')), 100);
                if (eventsGirlz.length > 0) {
                    let girlIndex = eventsGirlz.findIndex((element) => element.girl_id === girlId);
                    if (girlIndex !== -1) {
                        let wonShards = girlShards - eventsGirlz[girlIndex].shards;
                        eventsGirlz[girlIndex].shards = girlShards;
                        if (girlShards === 100) {
                            renewEvent = eventsGirlz[girlIndex].event_id;
                        }
                        if (wonShards > 0) {
                            LogUtils_logHHAuto("Won " + wonShards + " event shards for " + eventsGirlz[girlIndex].name);
                        }
                    }
                }
                if (eventMythicGirl.girl_id === girlId) {
                    eventMythicGirl.shards = girlShards;
                    if (girlShards === 100) {
                        renewEvent = eventMythicGirl.event_id;
                    }
                }
                if (eventGirl.girl_id === girlId) {
                    eventGirl.shards = girlShards;
                    if (girlShards === 100) {
                        renewEvent = eventGirl.event_id;
                    }
                }
            }
            setStoredValue(HHStoredVarPrefixKey + "Temp_eventsGirlz", JSON.stringify(eventsGirlz));
            if (eventGirl === null || eventGirl === void 0 ? void 0 : eventGirl.girl_id)
                EventModule.saveEventGirl(eventGirl);
            if (eventMythicGirl === null || eventMythicGirl === void 0 ? void 0 : eventMythicGirl.girl_id)
                EventModule.saveEventGirl(eventMythicGirl);
            if (renewEvent !== ""
                //|| Number(getStoredValue(HHStoredVarPrefixKey+"Temp_EventFightsBeforeRefresh")) < 1
                || (eventGirl === null || eventGirl === void 0 ? void 0 : eventGirl.girl_id) && EventModule.checkEvent(eventGirl.event_id)
                || (eventMythicGirl === null || eventMythicGirl === void 0 ? void 0 : eventMythicGirl.girl_id) && EventModule.checkEvent(eventMythicGirl.event_id)) {
                clearTimeout(inCaseTimer);
                LogUtils_logHHAuto(`Need to check back event page: '${renewEvent}' or '${(_a = eventGirl === null || eventGirl === void 0 ? void 0 : eventGirl.event_id) !== null && _a !== void 0 ? _a : ''}' or '${(_b = eventMythicGirl === null || eventMythicGirl === void 0 ? void 0 : eventMythicGirl.event_id) !== null && _b !== void 0 ? _b : ''}' `);
                if (renewEvent !== "") {
                    EventModule.parseEventPage(renewEvent);
                }
                else if ((eventMythicGirl === null || eventMythicGirl === void 0 ? void 0 : eventMythicGirl.girl_id) && EventModule.checkEvent(eventMythicGirl.event_id)) {
                    EventModule.parseEventPage(eventMythicGirl.event_id);
                }
                else if ((eventGirl === null || eventGirl === void 0 ? void 0 : eventGirl.girl_id) && EventModule.checkEvent(eventGirl.event_id)) {
                    EventModule.parseEventPage(eventGirl.event_id);
                }
                return;
            }
            else {
                clearTimeout(inCaseTimer);
                LogUtils_logHHAuto("Go back to troll after troll fight.");
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDTrollPreBattle"), { id_opponent: foughtTrollId });
                return;
            }
        }
        let observerReward = new MutationObserver(function (mutations) {
            mutations.forEach(parseReward);
        });
        if ($('#rewards_popup').length > 0) {
            if ($('#rewards_popup')[0].style.display !== "block") {
                setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                LogUtils_logHHAuto("setting autoloop to false to wait for troll rewards");
                observerReward.observe($('#rewards_popup')[0], {
                    childList: false,
                    subtree: false,
                    attributes: true,
                    characterData: false
                });
            }
            else {
                parseReward();
            }
        }
        let observerPass = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                let querySkip = '#contains_all #new_battle .new-battle-buttons-container #new-battle-skip-btn.blue_text_button[style]';
                if ($(querySkip).length === 0
                    && $(querySkip)[0].style.display !== "block") {
                    return;
                }
                else {
                    //replaceCheatClick();
                    setTimeout(function () {
                        $(querySkip)[0].click();
                        LogUtils_logHHAuto("Clicking on pass battle.");
                    }, randomInterval(800, 1200));
                }
            });
        });
        observerPass.observe($('#contains_all .new-battle-buttons-container #new-battle-skip-btn.blue_text_button')[0], {
            childList: false,
            subtree: false,
            attributes: true,
            characterData: false
        });
    }
}

;// CONCATENATED MODULE: ./src/Helper/TimerHelper.ts




let Timers = {};
function setTimers(timer) {
    Timers = timer;
}
function setTimer(name, seconds) {
    var ND = new Date().getTime() + seconds * 1000;
    Timers[name] = ND;
    setStoredValue(HHStoredVarPrefixKey + "Temp_Timers", JSON.stringify(Timers));
    LogUtils_logHHAuto(name + " set to " + TimeHelper.toHHMMSS(ND / 1000 - new Date().getTimezoneOffset() * 60) + ' (' + TimeHelper.toHHMMSS(seconds) + ')');
}
function clearTimer(name) {
    delete Timers[name];
    setStoredValue(HHStoredVarPrefixKey + "Temp_Timers", JSON.stringify(Timers));
}
function checkTimer(name) {
    if (!Timers[name] || Timers[name] < new Date()) {
        return true;
    }
    return false;
}
function checkTimerMustExist(name) {
    if (Timers[name] && Timers[name] < new Date()) {
        return true;
    }
    return false;
}
function getTimer(name) {
    if (!Timers[name]) {
        return -1;
    }
    return Timers[name];
}
function getSecondsLeft(name) {
    if (!Timers[name]) {
        return 0;
    }
    var result = Math.ceil(Timers[name] / 1000) - Math.ceil(new Date().getTime() / 1000);
    if (result > 0) {
        return result;
    }
    else {
        return 0;
    }
}
function getTimeLeft(name) {
    const timerWaitingCompet = ['nextPachinkoTime', 'nextPachinko2Time', 'nextPachinkoEquipTime', 'nextSeasonTime', 'nextLeaguesTime'];
    if (!Timers[name]) {
        if (!TimeHelper.canCollectCompetitionActive() && timerWaitingCompet.indexOf(name) >= 0) {
            return "Wait for contest";
        }
        return "No timer";
    }
    var diff = getSecondsLeft(name);
    if (diff <= 0) {
        if (!TimeHelper.canCollectCompetitionActive() && timerWaitingCompet.indexOf(name) >= 0) {
            return "Wait for contest";
        }
        return "Time's up!";
    }
    return TimeHelper.toHHMMSS(diff);
}

;// CONCATENATED MODULE: ./src/Helper/index.ts

















;// CONCATENATED MODULE: ./src/Service/AutoLoop.ts
var AutoLoop_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};





let busy = false;
function getBurst() {
    const sMenu = document.getElementById('sMenu');
    if (sMenu != null) {
        if (sMenu.style.display !== 'none') // && !document.getElementById("DebugDialog").open)
         {
            return false;
        }
    }
    if ($('#contains_all>nav>[rel=content]').length > 0) {
        if ($('#contains_all>nav>[rel=content]')[0].style.display === "block") // && !document.getElementById("DebugDialog").open)
         {
            return false;
        }
    }
    return getStoredValue(HHStoredVarPrefixKey + "Setting_master") === "true" && (!(getStoredValue(HHStoredVarPrefixKey + "Setting_paranoia") === "true") || getStoredValue(HHStoredVarPrefixKey + "Temp_burst") === "true");
}
function CheckSpentPoints() {
    let oldValues = getStoredValue(HHStoredVarPrefixKey + "Temp_CheckSpentPoints") ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_CheckSpentPoints")) : -1;
    let newValues = {};
    if (ConfigHelper.getHHScriptVars('isEnabledTrollBattle', false)) {
        newValues['fight'] = Troll.getEnergy();
    }
    if (ConfigHelper.getHHScriptVars('isEnabledSeason', false)) {
        newValues['kiss'] = Season.getEnergy();
    }
    if (ConfigHelper.getHHScriptVars('isEnabledQuest', false)) {
        newValues['quest'] = QuestHelper.getEnergy();
    }
    if (ConfigHelper.getHHScriptVars('isEnabledLeagues', false)) {
        newValues['challenge'] = LeagueHelper.getEnergy();
    }
    if (ConfigHelper.getHHScriptVars('isEnabledPantheon', false)) {
        newValues['worship'] = Pantheon.getEnergy();
    }
    if (oldValues !== -1) {
        let spent = {};
        let hasSpend = false;
        for (let i of Object.keys(newValues)) {
            //console.log(i);
            if (oldValues[i] - newValues[i] > 0) {
                spent[i] = oldValues[i] - newValues[i];
                updatedParanoiaSpendings(i, spent[i]);
            }
        }
        setStoredValue(HHStoredVarPrefixKey + "Temp_CheckSpentPoints", JSON.stringify(newValues));
        if (ConfigHelper.getHHScriptVars('isEnabledLeagues', false) && newValues['challenge'] > (oldValues['challenge'] + 1)) {
            LogUtils_logHHAuto("Seems league point bought, resetting timer.");
            clearTimer('nextLeaguesTime');
        }
        if (ConfigHelper.getHHScriptVars('isEnabledSeason', false) && newValues['kiss'] > (oldValues['kiss'] + 1)) {
            LogUtils_logHHAuto("Seems season point bought, resetting timer.");
            clearTimer('nextSeasonTime');
        }
        if (ConfigHelper.getHHScriptVars('isEnabledPantheon', false) && newValues['worship'] > (oldValues['worship'] + 1)) {
            LogUtils_logHHAuto("Seems Pantheon point bought, resetting timer.");
            clearTimer('nextPantheonTime');
        }
    }
    else {
        setStoredValue(HHStoredVarPrefixKey + "Temp_CheckSpentPoints", JSON.stringify(newValues));
    }
}
function isAutoLoopActive() {
    return getStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop") === "true";
}
function autoLoop() {
    return AutoLoop_awaiter(this, void 0, void 0, function* () {
        updateData();
        if (getStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement") === undefined) {
            setStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement", "none");
        }
        if (getStoredValue(HHStoredVarPrefixKey + "Temp_battlePowerRequired") === undefined) {
            setStoredValue(HHStoredVarPrefixKey + "Temp_battlePowerRequired", "0");
        }
        //var busy = false;
        busy = false;
        var page = window.location.href;
        var currentPower = Troll.getEnergy();
        var burst = getBurst();
        switchHHMenuButton(burst);
        //console.log("burst : "+burst);
        checkAndClosePopup(burst);
        let lastActionPerformed = getStoredValue(HHStoredVarPrefixKey + "Temp_lastActionPerformed");
        let eventParsed = null;
        if (burst && !mouseBusy /*|| checkTimer('nextMissionTime')*/) {
            if (!checkTimer("paranoiaSwitch")) {
                clearParanoiaSpendings();
            }
            CheckSpentPoints();
            const canCollectCompetitionActive = TimeHelper.canCollectCompetitionActive();
            //check what happen to timer if no more wave before uncommenting
            /*if (getStoredValue(HHStoredVarPrefixKey+"Setting_plusEventMythic") ==="true" && checkTimerMustExist('eventMythicNextWave'))
            {
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
            }
            */
            //logHHAuto("lastActionPerformed " + lastActionPerformed);
            const Hero = getHero();
            //if a new event is detected
            const { eventIDs, bossBangEventIDs } = EventModule.parsePageForEventId();
            if (busy === false && ConfigHelper.getHHScriptVars("isEnabledEvents", false) && (lastActionPerformed === "none" || lastActionPerformed === "event" || (getStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollBattle") === "true" && getStoredValue(HHStoredVarPrefixKey + "Setting_plusEventMythic") === "true"))
                &&
                    ((eventIDs.length > 0 && getPage() !== ConfigHelper.getHHScriptVars("pagesIDEvent"))
                        ||
                            (getPage() === ConfigHelper.getHHScriptVars("pagesIDEvent") && $("#contains_all #events[parsed]").length < eventIDs.length))) {
                LogUtils_logHHAuto("Going to check on events.");
                busy = true;
                busy = EventModule.parseEventPage(eventIDs[0]);
                eventParsed = eventIDs[0];
                lastActionPerformed = "event";
                if (eventIDs.length > 1) {
                    LogUtils_logHHAuto("More events to be parsed.", JSON.stringify(eventIDs));
                    busy = true;
                }
            }
            if (busy === false && isAutoLoopActive() && canCollectCompetitionActive
                && getStoredValue(HHStoredVarPrefixKey + "Setting_plusEventMythic") === "true" && checkTimerMustExist('eventMythicNextWave') && getSecondsLeft("eventMythicGoing") > 0
                && Troll.isTrollFightActivated()) {
                LogUtils_logHHAuto("Mythic wave !");
                lastActionPerformed = "troll";
            }
            if (busy === false && ConfigHelper.getHHScriptVars("isEnabledShop", false) && Shop.isTimeToCheckShop() && isAutoLoopActive() && (lastActionPerformed === "none" || lastActionPerformed === "shop")) {
                if (getStoredValue(HHStoredVarPrefixKey + "Temp_charLevel") === undefined) {
                    setStoredValue(HHStoredVarPrefixKey + "Temp_charLevel", 0);
                }
                if (checkTimer('nextShopTime') || getStoredValue(HHStoredVarPrefixKey + "Temp_charLevel") < getHHVars('Hero.infos.level')) {
                    LogUtils_logHHAuto("Time to check shop.");
                    busy = Shop.updateShop();
                    lastActionPerformed = "shop";
                }
            }
            if (busy === false && ConfigHelper.getHHScriptVars("isEnabledPowerPlaces", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoPowerPlaces") === "true"
                && isAutoLoopActive() && (lastActionPerformed === "none" || lastActionPerformed === "pop")) {
                var popToStart = getStoredValue(HHStoredVarPrefixKey + "Temp_PopToStart") ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_PopToStart")) : [];
                if (popToStart.length != 0 || checkTimer('minPowerPlacesTime')) {
                    //if PopToStart exist bypass function
                    var popToStartExist = getStoredValue(HHStoredVarPrefixKey + "Temp_PopToStart") ? true : false;
                    //logHHAuto("startcollect : "+popToStartExist);
                    if (!popToStartExist) {
                        //logHHAuto("pop1:"+popToStart);
                        LogUtils_logHHAuto("Go and collect");
                        busy = true;
                        busy = PlaceOfPower.collectAndUpdate();
                    }
                    var indexes = (getStoredValue(HHStoredVarPrefixKey + "Setting_autoPowerPlacesIndexFilter")).split(";");
                    popToStart = getStoredValue(HHStoredVarPrefixKey + "Temp_PopToStart") ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_PopToStart")) : [];
                    //console.log(indexes, popToStart);
                    for (var pop of popToStart) {
                        if (busy === false && !indexes.includes(String(pop))) {
                            LogUtils_logHHAuto("PoP is no longer in list :" + pop + " removing it from start list.");
                            PlaceOfPower.removePopFromPopToStart(pop);
                        }
                    }
                    popToStart = getStoredValue(HHStoredVarPrefixKey + "Temp_PopToStart") ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_PopToStart")) : [];
                    //logHHAuto("pop2:"+popToStart);
                    for (var index of indexes) {
                        if (busy === false && popToStart.includes(Number(index))) {
                            LogUtils_logHHAuto("Time to do PowerPlace" + index + ".");
                            busy = true;
                            busy = PlaceOfPower.doPowerPlacesStuff(index);
                            lastActionPerformed = "pop";
                        }
                    }
                    if (busy === false) {
                        //logHHAuto("pop3:"+getStoredValue(HHStoredVarPrefixKey+"Temp_PopToStart"));
                        popToStart = getStoredValue(HHStoredVarPrefixKey + "Temp_PopToStart") ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_PopToStart")) : [];
                        //logHHAuto("pop3:"+popToStart);
                        if (popToStart.length === 0) {
                            //logHHAuto("removing popToStart");
                            sessionStorage.removeItem(HHStoredVarPrefixKey + 'Temp_PopToStart');
                            gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                        }
                    }
                }
            }
            if (busy === false
                &&
                    (getPage() === ConfigHelper.getHHScriptVars("pagesIDLeagueBattle")
                        || getPage() === ConfigHelper.getHHScriptVars("pagesIDTrollBattle")
                        || getPage() === ConfigHelper.getHHScriptVars("pagesIDSeasonBattle")
                        || getPage() === ConfigHelper.getHHScriptVars("pagesIDPantheonBattle")
                        || getPage() === ConfigHelper.getHHScriptVars("pagesIDLabyrinthBattle"))
                && isAutoLoopActive() && canCollectCompetitionActive) {
                busy = true;
                GenericBattle.doBattle();
            }
            if (busy === false && Troll.isTrollFightActivated()
                && isAutoLoopActive() && canCollectCompetitionActive
                && (lastActionPerformed === "none" || lastActionPerformed === "troll" || lastActionPerformed === "quest")) {
                const threshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollThreshold"));
                const runThreshold = Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollRunThreshold"));
                const humanLikeRun = getStoredValue(HHStoredVarPrefixKey + "Temp_TrollHumanLikeRun") === "true";
                const energyAboveThreshold = humanLikeRun && currentPower > threshold || currentPower > Math.max(threshold, runThreshold - 1);
                //logHHAuto("fight amount: "+currentPower+" troll threshold: "+threshold+" paranoia fight: "+Number(checkParanoiaSpendings('fight')));
                const eventGirl = EventModule.getEventGirl();
                const eventMythicGirl = EventModule.getEventMythicGirl();
                if (
                //normal case
                (currentPower >= Number(getStoredValue(HHStoredVarPrefixKey + "Temp_battlePowerRequired"))
                    && currentPower > 0
                    &&
                        (energyAboveThreshold
                            || getStoredValue(HHStoredVarPrefixKey + "Temp_autoTrollBattleSaveQuest") === "true"))
                    || Number(checkParanoiaSpendings('fight')) > 0 //paranoiaspendings to do
                    ||
                        (
                        // mythic Event Girl available and fights available
                        (eventMythicGirl.girl_id && eventMythicGirl.is_mythic && getStoredValue(HHStoredVarPrefixKey + "Setting_plusEventMythic") === "true")
                            &&
                                (currentPower > 0 //has fight => bypassing paranoia
                                    || Troll.canBuyFight(eventMythicGirl, false).canBuy // can buy fights
                                ))
                    ||
                        (
                        // normal Event Girl available
                        (eventGirl.girl_id && !eventGirl.is_mythic && getStoredValue(HHStoredVarPrefixKey + "Setting_plusEvent") === "true")
                            &&
                                (energyAboveThreshold
                                    || Troll.canBuyFight(eventGirl, false).canBuy // can buy fights
                                ))) {
                    LogUtils_logHHAuto('Troll:', { threshold: threshold, runThreshold: runThreshold, TrollHumanLikeRun: humanLikeRun });
                    setStoredValue(HHStoredVarPrefixKey + "Temp_battlePowerRequired", "0");
                    busy = true;
                    if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoQuest") !== "true" || getStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement")[0] !== 'P') {
                        busy = yield Troll.doBossBattle();
                        lastActionPerformed = "troll";
                    }
                    else {
                        LogUtils_logHHAuto("AutoBattle disabled for power collection for AutoQuest.");
                        document.getElementById("autoTrollBattle").checked = false;
                        setStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollBattle", "false");
                        busy = false;
                    }
                }
                else {
                    if (getStoredValue(HHStoredVarPrefixKey + "Temp_TrollHumanLikeRun") === "true") {
                        // end run
                        setStoredValue(HHStoredVarPrefixKey + "Temp_TrollHumanLikeRun", "false");
                    }
                    /*if (getPage() === ConfigHelper.getHHScriptVars("pagesIDTrollPreBattle"))
                    {
                        logHHAuto("Go to home after troll fight");
                        gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
    
                    }*/
                }
            }
            else {
                setStoredValue(HHStoredVarPrefixKey + "Temp_battlePowerRequired", "0");
            }
            if (busy === false && ConfigHelper.getHHScriptVars("isEnabledMythicPachinko", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoFreePachinko") === "true"
                && isAutoLoopActive() && checkTimer("nextPachinko2Time") && canCollectCompetitionActive
                && (lastActionPerformed === "none" || lastActionPerformed === "pachinko")) {
                LogUtils_logHHAuto("Time to fetch Mythic Pachinko.");
                busy = yield Pachinko.getMythicPachinko();
                lastActionPerformed = "pachinko";
            }
            if (busy === false && ConfigHelper.getHHScriptVars("isEnabledGreatPachinko", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoFreePachinko") === "true"
                && isAutoLoopActive() && checkTimer("nextPachinkoTime") && canCollectCompetitionActive
                && (lastActionPerformed === "none" || lastActionPerformed === "pachinko")) {
                LogUtils_logHHAuto("Time to fetch Great Pachinko.");
                busy = yield Pachinko.getGreatPachinko();
                lastActionPerformed = "pachinko";
            }
            if (busy === false && ConfigHelper.getHHScriptVars("isEnabledEquipmentPachinko", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoFreePachinko") === "true"
                && isAutoLoopActive() && checkTimer("nextPachinkoEquipTime") && canCollectCompetitionActive
                && (lastActionPerformed === "none" || lastActionPerformed === "pachinko")) {
                LogUtils_logHHAuto("Time to fetch Equipment Pachinko.");
                busy = yield Pachinko.getEquipmentPachinko();
                lastActionPerformed = "pachinko";
            }
            if (busy === false && ConfigHelper.getHHScriptVars("isEnabledContest", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoContest") === "true"
                && isAutoLoopActive() && (lastActionPerformed === "none" || lastActionPerformed === "contest")) {
                if (checkTimer('nextContestTime') || unsafeWindow.has_contests_datas || $(".contest .ended button[rel='claim']").length > 0) {
                    LogUtils_logHHAuto("Time to get contest rewards.");
                    busy = Contest.run();
                    lastActionPerformed = "contest";
                }
            }
            if (busy === false && ConfigHelper.getHHScriptVars("isEnabledMission", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoMission") === "true"
                && isAutoLoopActive() && (lastActionPerformed === "none" || lastActionPerformed === "mission")) {
                if (checkTimer('nextMissionTime')) {
                    LogUtils_logHHAuto("Time to do missions.");
                    busy = Missions.run();
                    lastActionPerformed = "mission";
                }
            }
            if (busy === false && ConfigHelper.getHHScriptVars("isEnabledQuest", false)
                && (getStoredValue(HHStoredVarPrefixKey + "Setting_autoQuest") === "true" || (ConfigHelper.getHHScriptVars("isEnabledSideQuest", false)
                    && getStoredValue(HHStoredVarPrefixKey + "Setting_autoSideQuest") === "true")) && isAutoLoopActive()
                && canCollectCompetitionActive && (lastActionPerformed === "none" || lastActionPerformed === "quest")) {
                if (getStoredValue(HHStoredVarPrefixKey + "Temp_autoTrollBattleSaveQuest") === undefined) {
                    setStoredValue(HHStoredVarPrefixKey + "Temp_autoTrollBattleSaveQuest", "false");
                }
                let questRequirement = getStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement");
                if (questRequirement === "battle") {
                    if (ConfigHelper.getHHScriptVars("isEnabledTrollBattle", false) && getStoredValue(HHStoredVarPrefixKey + "Temp_autoTrollBattleSaveQuest") === "false") {
                        LogUtils_logHHAuto("Quest requires battle.");
                        LogUtils_logHHAuto("prepare to save one battle for quest");
                        setStoredValue(HHStoredVarPrefixKey + "Temp_autoTrollBattleSaveQuest", "true");
                        if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollBattle") !== "true") {
                            Troll.doBossBattle();
                            busy = true;
                        }
                    }
                }
                else if (questRequirement[0] === '$') {
                    if (Number(questRequirement.substr(1)) < getHHVars('Hero.currencies.soft_currency')) {
                        // We have enough money... requirement fulfilled.
                        LogUtils_logHHAuto("Continuing quest, required money obtained.");
                        setStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement", "none");
                        QuestHelper.run();
                        busy = true;
                    }
                    else {
                        //prevent paranoia to wait for quest
                        setStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaQuestBlocked", "true");
                        if (isNaN(questRequirement.substr(1))) {
                            LogUtils_logHHAuto(questRequirement);
                            setStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement", "none");
                            LogUtils_logHHAuto("Invalid money in session storage quest requirement !");
                        }
                        busy = false;
                    }
                }
                else if (questRequirement[0] === '*') {
                    var energyNeeded = Number(questRequirement.substr(1));
                    var energyCurrent = QuestHelper.getEnergy();
                    if (energyNeeded <= energyCurrent) {
                        if (Number(energyCurrent) > Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoQuestThreshold")) || Number(checkParanoiaSpendings('quest')) > 0) {
                            // We have enough energy... requirement fulfilled.
                            LogUtils_logHHAuto("Continuing quest, required energy obtained.");
                            setStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement", "none");
                            QuestHelper.run();
                            busy = true;
                        }
                        else {
                            busy = false;
                        }
                    }
                    // Else we need energy, just wait.
                    else {
                        //prevent paranoia to wait for quest
                        setStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaQuestBlocked", "true");
                        busy = false;
                        //logHHAuto("Replenishing energy for quest.(" + energyNeeded + " needed)");
                    }
                }
                else if (questRequirement[0] === 'P') {
                    // Battle power required.
                    var neededPower = Number(questRequirement.substr(1));
                    if (currentPower < neededPower) {
                        LogUtils_logHHAuto("Quest requires " + neededPower + " Battle Power for advancement. Waiting...");
                        busy = false;
                        //prevent paranoia to wait for quest
                        setStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaQuestBlocked", "true");
                    }
                    else {
                        LogUtils_logHHAuto("Battle Power obtained, resuming quest...");
                        setStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement", "none");
                        QuestHelper.run();
                        busy = true;
                    }
                }
                else if (questRequirement === "unknownQuestButton") {
                    //prevent paranoia to wait for quest
                    setStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaQuestBlocked", "true");
                    if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoQuest") === "true") {
                        LogUtils_logHHAuto("AutoQuest disabled.HHAuto_Setting_AutoQuest cannot be performed due to unknown quest button. Please manually proceed the current quest screen.");
                        document.getElementById("autoQuest").checked = false;
                        setStoredValue(HHStoredVarPrefixKey + "Setting_autoQuest", "false");
                    }
                    if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoSideQuest") === "true") {
                        LogUtils_logHHAuto("AutoQuest disabled.HHAuto_Setting_autoSideQuest cannot be performed due to unknown quest button. Please manually proceed the current quest screen.");
                        document.getElementById("autoSideQuest").checked = false;
                        setStoredValue(HHStoredVarPrefixKey + "Setting_autoSideQuest", "false");
                    }
                    setStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement", "none");
                    busy = false;
                }
                else if (questRequirement === "errorInAutoBattle") {
                    //prevent paranoia to wait for quest
                    setStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaQuestBlocked", "true");
                    if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoQuest") === "true") {
                        LogUtils_logHHAuto("AutoQuest disabled.HHAuto_Setting_AutoQuest cannot be performed due errors in AutoBattle. Please manually proceed the current quest screen.");
                        document.getElementById("autoQuest").checked = false;
                        setStoredValue(HHStoredVarPrefixKey + "Setting_autoQuest", "false");
                    }
                    if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoSideQuest") === "true") {
                        LogUtils_logHHAuto("AutoQuest disabled.HHAuto_Setting_autoSideQuest cannot be performed due errors in AutoBattle. Please manually proceed the current quest screen.");
                        document.getElementById("autoSideQuest").checked = false;
                        setStoredValue(HHStoredVarPrefixKey + "Setting_autoSideQuest", "false");
                    }
                    setStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement", "none");
                    busy = false;
                }
                else if (questRequirement === "none") {
                    if (checkTimer('nextMainQuestAttempt') && checkTimer('nextSideQuestAttempt')) {
                        if (QuestHelper.getEnergy() > Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoQuestThreshold")) || Number(checkParanoiaSpendings('quest')) > 0) {
                            //logHHAuto("NONE req.");
                            busy = true;
                            QuestHelper.run();
                        }
                    }
                }
                else {
                    //prevent paranoia to wait for quest
                    setStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaQuestBlocked", "true");
                    LogUtils_logHHAuto("Invalid quest requirement : " + questRequirement);
                    busy = false;
                }
                if (busy)
                    lastActionPerformed = "quest";
            }
            else if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoQuest") === "false" && getStoredValue(HHStoredVarPrefixKey + "Setting_autoSideQuest") === "false") {
                setStoredValue(HHStoredVarPrefixKey + "Temp_questRequirement", "none");
            }
            if (busy === false && ConfigHelper.getHHScriptVars("isEnabledSeason", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeason") === "true"
                && isAutoLoopActive() && canCollectCompetitionActive && (lastActionPerformed === "none" || lastActionPerformed === "season")) {
                if (Season.isTimeToFight()) {
                    LogUtils_logHHAuto("Time to fight in Season.");
                    Season.run();
                    busy = true;
                    lastActionPerformed = "season";
                }
                else if (checkTimer('nextSeasonTime')) {
                    if (getStoredValue(HHStoredVarPrefixKey + "Temp_SeasonHumanLikeRun") === "true") {
                        // end run
                        setStoredValue(HHStoredVarPrefixKey + "Temp_SeasonHumanLikeRun", "false");
                    }
                    if (getHHVars('Hero.energies.kiss.next_refresh_ts') === 0) {
                        setTimer('nextSeasonTime', randomInterval(15 * 60, 17 * 60));
                    }
                    else {
                        const next_refresh = getHHVars('Hero.energies.kiss.next_refresh_ts');
                        setTimer('nextSeasonTime', randomInterval(next_refresh + 10, next_refresh + 180));
                    }
                }
            }
            if (busy === false && getStoredValue(HHStoredVarPrefixKey + "Setting_autoPantheon") === "true" && Pantheon.isEnabled()
                && isAutoLoopActive() && canCollectCompetitionActive && (lastActionPerformed === "none" || lastActionPerformed === "pantheon")) {
                if (Pantheon.isTimeToFight()) {
                    LogUtils_logHHAuto("Time to do Pantheon.");
                    Pantheon.run();
                    busy = true;
                    lastActionPerformed = "pantheon";
                }
                else if (checkTimer('nextPantheonTime')) {
                    if (getStoredValue(HHStoredVarPrefixKey + "Temp_PantheonHumanLikeRun") === "true") {
                        // end run
                        setStoredValue(HHStoredVarPrefixKey + "Temp_PantheonHumanLikeRun", "false");
                    }
                    if (getHHVars('Hero.energies.worship.next_refresh_ts') === 0) {
                        setTimer('nextPantheonTime', randomInterval(15 * 60, 17 * 60));
                    }
                    else {
                        const next_refresh = getHHVars('Hero.energies.worship.next_refresh_ts');
                        setTimer('nextPantheonTime', randomInterval(next_refresh + 10, next_refresh + 180));
                    }
                    //logHHAuto("reset lastActionPerformed from pantheon");
                    lastActionPerformed = "none";
                }
            }
            if (busy === false && getStoredValue(HHStoredVarPrefixKey + "Setting_autoLabyrinth") === "true" && Labyrinth.isEnabled() && checkTimer('nextLabyrinthTime')
                && isAutoLoopActive() && canCollectCompetitionActive && (lastActionPerformed === "none" || lastActionPerformed === "labyrinth")) {
                Labyrinth.run();
                busy = true;
                lastActionPerformed = "labyrinth";
            }
            if (busy == false && ConfigHelper.getHHScriptVars("isEnabledChamps", false)
                && QuestHelper.getEnergy() >= ConfigHelper.getHHScriptVars("CHAMP_TICKET_PRICE") && QuestHelper.getEnergy() > Number(getStoredValue(HHStoredVarPrefixKey + "Setting_autoQuestThreshold"))
                && getStoredValue(HHStoredVarPrefixKey + "Setting_autoChampsUseEne") === "true" && isAutoLoopActive()
                && canCollectCompetitionActive && (lastActionPerformed === "none" || lastActionPerformed === "champion")) {
                function buyTicket() {
                    var params = {
                        action: 'champion_buy_ticket',
                        currency: 'energy_quest',
                        amount: "1"
                    };
                    LogUtils_logHHAuto('Buying ticket with energy');
                    unsafeWindow.hh_ajax(params, function (data) {
                        //anim_number($('.tickets_number_amount'), data.tokens - amount, amount);
                        Hero.updates(data.hero_changes);
                        location.reload();
                    });
                }
                setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
                LogUtils_logHHAuto("setting autoloop to false");
                busy = true;
                setTimeout(buyTicket, randomInterval(800, 1600));
                lastActionPerformed = "champion";
            }
            if (busy == false && ConfigHelper.getHHScriptVars("isEnabledChamps", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoChamps") === "true" && checkTimer('nextChampionTime')
                && isAutoLoopActive() && (lastActionPerformed === "none" || lastActionPerformed === "champion")) {
                LogUtils_logHHAuto("Time to check on champions!");
                busy = true;
                busy = Champion.doChampionStuff();
                lastActionPerformed = "champion";
            }
            if (busy == false && ConfigHelper.getHHScriptVars("isEnabledClubChamp", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoClubChamp") === "true" && checkTimer('nextClubChampionTime')
                && isAutoLoopActive() && (lastActionPerformed === "none" || lastActionPerformed === "clubChampion")) {
                LogUtils_logHHAuto("Time to check on club champion!");
                busy = true;
                busy = ClubChampion.doClubChampionStuff();
                lastActionPerformed = "clubChampion";
            }
            if (busy === false && LeagueHelper.isAutoLeagueActivated() && isAutoLoopActive()
                && canCollectCompetitionActive && (lastActionPerformed === "none" || lastActionPerformed === "league")) {
                // Navigate to leagues
                if (LeagueHelper.isTimeToFight()) {
                    LogUtils_logHHAuto("Time to fight in Leagues.");
                    LeagueHelper.doLeagueBattle();
                    busy = true;
                    lastActionPerformed = "league";
                }
                else {
                    if (getStoredValue(HHStoredVarPrefixKey + "Temp_LeagueHumanLikeRun") === "true") {
                        // end run
                        setStoredValue(HHStoredVarPrefixKey + "Temp_LeagueHumanLikeRun", "false");
                    }
                    if (checkTimer('nextLeaguesTime')) {
                        if (getHHVars('Hero.energies.challenge.next_refresh_ts') === 0) {
                            setTimer('nextLeaguesTime', randomInterval(15 * 60, 17 * 60));
                        }
                        else {
                            const next_refresh = getHHVars('Hero.energies.challenge.next_refresh_ts');
                            setTimer('nextLeaguesTime', randomInterval(next_refresh + 10, next_refresh + 180));
                        }
                    }
                    //logHHAuto("reset lastActionPerformed from league");
                    lastActionPerformed = "none";
                    /*if (getPage() === ConfigHelper.getHHScriptVars("pagesIDLeaderboard"))
                    {
                        logHHAuto("Go to home after league fight");
                        gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
    
                    }*/
                }
            }
            if (busy == false && ConfigHelper.getHHScriptVars("isEnabledSeason", false) && isAutoLoopActive() &&
                (checkTimer('nextSeasonCollectTime') && getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonCollect") === "true" && canCollectCompetitionActive
                    ||
                        getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonCollectAll") === "true" && checkTimer('nextSeasonCollectAllTime') && (getTimer('SeasonRemainingTime') == -1 || getSecondsLeft('SeasonRemainingTime') < getLimitTimeBeforeEnd())) && (lastActionPerformed === "none" || lastActionPerformed === "season")) {
                LogUtils_logHHAuto("Time to go and check Season for collecting reward.");
                busy = true;
                busy = Season.goAndCollect();
                lastActionPerformed = "season";
            }
            if (busy == false && ConfigHelper.getHHScriptVars("isEnabledSeasonalEvent", false) && isAutoLoopActive() &&
                (checkTimer('nextSeasonalEventCollectTime') && getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonalEventCollect") === "true" && canCollectCompetitionActive
                    ||
                        getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonalEventCollectAll") === "true" && checkTimer('nextSeasonalEventCollectAllTime') && (getTimer('SeasonalEventRemainingTime') == -1 || getSecondsLeft('SeasonalEventRemainingTime') < getLimitTimeBeforeEnd())) && (lastActionPerformed === "none" || lastActionPerformed === "seasonal")) {
                LogUtils_logHHAuto("Time to go and check SeasonalEvent for collecting reward.");
                busy = true;
                busy = SeasonalEvent.goAndCollect();
                lastActionPerformed = "seasonal";
            }
            if (busy == false && ConfigHelper.getHHScriptVars("isEnabledSeasonalEvent", false) && isAutoLoopActive() &&
                checkTimer('nextMegaEventRankCollectTime') && getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeasonalEventCollect") === "true" && canCollectCompetitionActive
                && (lastActionPerformed === "none" || lastActionPerformed === "seasonal")) {
                LogUtils_logHHAuto("Time to go and check  SeasonalEvent for collecting rank reward.");
                busy = true;
                busy = SeasonalEvent.goAndCollectMegaEventRankRewards();
                lastActionPerformed = "seasonal";
            }
            if (busy == false && isAutoLoopActive() && PathOfValue.isEnabled() &&
                (checkTimer('nextPoVCollectTime') && getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoVCollect") === "true" && canCollectCompetitionActive
                    ||
                        getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoVCollectAll") === "true" && checkTimer('nextPoVCollectAllTime') && (getTimer('PoVRemainingTime') == -1 || getSecondsLeft('PoVRemainingTime') < getLimitTimeBeforeEnd())) && (lastActionPerformed === "none" || lastActionPerformed === "pov")) {
                LogUtils_logHHAuto("Time to go and check Path of Valor for collecting reward.");
                busy = true;
                busy = PathOfValue.goAndCollect();
                lastActionPerformed = "pov";
            }
            if (busy == false && isAutoLoopActive() && PathOfGlory.isEnabled() &&
                (checkTimer('nextPoGCollectTime') && getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoGCollect") === "true" && canCollectCompetitionActive
                    ||
                        getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoGCollectAll") === "true" && checkTimer('nextPoGCollectAllTime') && (getTimer('PoGRemainingTime') == -1 || getSecondsLeft('PoGRemainingTime') < getLimitTimeBeforeEnd())) && (lastActionPerformed === "none" || lastActionPerformed === "pog")) {
                LogUtils_logHHAuto("Time to go and check Path of Glory for collecting reward.");
                busy = true;
                busy = PathOfGlory.goAndCollect();
                lastActionPerformed = "pog";
            }
            if (busy == false && ConfigHelper.getHHScriptVars("isEnabledFreeBundles", false) && isAutoLoopActive() && checkTimer('nextFreeBundlesCollectTime')
                && getStoredValue(HHStoredVarPrefixKey + "Setting_autoFreeBundlesCollect") === "true" && canCollectCompetitionActive
                && (lastActionPerformed === "none" || lastActionPerformed === "bundle")) {
                busy = true;
                LogUtils_logHHAuto("Time to go and check Free Bundles for collecting reward.");
                Bundles.goAndCollectFreeBundles();
                lastActionPerformed = "bundle";
            }
            if (busy == false && ConfigHelper.getHHScriptVars("isEnabledDailyGoals", false) && isAutoLoopActive() && checkTimer('nextDailyGoalsCollectTime')
                && getStoredValue(HHStoredVarPrefixKey + "Setting_autoDailyGoalsCollect") === "true" && canCollectCompetitionActive
                && (lastActionPerformed === "none" || lastActionPerformed === "dailyGoals")) {
                busy = true;
                LogUtils_logHHAuto("Time to go and check daily Goals for collecting reward.");
                DailyGoals.goAndCollect();
                lastActionPerformed = "dailyGoals";
            }
            if (busy === false && ConfigHelper.getHHScriptVars("isEnabledSalary", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoSalary") === "true"
                && (getStoredValue(HHStoredVarPrefixKey + "Setting_paranoia") !== "true" || !checkTimer("paranoiaSwitch"))
                && isAutoLoopActive() && (lastActionPerformed === "none" || lastActionPerformed === "salary")) {
                if (checkTimer("nextSalaryTime")) {
                    LogUtils_logHHAuto("Time to fetch salary.");
                    busy = HaremSalary.getSalary();
                    // if(busy) lastActionPerformed = "salary"; // Removed from continuous actions for now
                }
            }
            if (busy === false
                && ConfigHelper.getHHScriptVars("isEnabledBossBangEvent", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_bossBangEvent") === "true"
                &&
                    ((bossBangEventIDs.length > 0
                        && getPage() !== ConfigHelper.getHHScriptVars("pagesIDEvent"))
                        ||
                            (getPage() === ConfigHelper.getHHScriptVars("pagesIDEvent")
                                && $('#contains_all #events #boss_bang .completed-event').length === 0)) && (lastActionPerformed === "none" || lastActionPerformed === "event")) {
                LogUtils_logHHAuto("Going to boss bang event.");
                busy = true;
                busy = EventModule.parseEventPage(bossBangEventIDs[0]);
                lastActionPerformed = "event";
            }
            if (busy === false
                && isAutoLoopActive()
                && Harem.HaremSizeNeedsRefresh(ConfigHelper.getHHScriptVars("HaremMaxSizeExpirationSecs"))
                && getPage() !== ConfigHelper.getHHScriptVars("pagesIDWaifu")
                && getPage() !== ConfigHelper.getHHScriptVars("pagesIDEditTeam")
                && (lastActionPerformed === "none")) {
                //console.log(! isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_HaremSize")),JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_HaremSize")).count_date,new Date().getTime() + ConfigHelper.getHHScriptVars("HaremSizeExpirationSecs") * 1000);
                busy = true;
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDWaifu"));
            }
            if (busy === false
                && isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_LastPageCalled"))
                && getPage() !== ConfigHelper.getHHScriptVars("pagesIDHome")
                && getPage() === JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_LastPageCalled")).page
                && (new Date().getTime() - JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_LastPageCalled")).dateTime) > ConfigHelper.getHHScriptVars("minSecsBeforeGoHomeAfterActions") * 1000) {
                //console.log("testingHome : GotoHome : "+getStoredValue(HHStoredVarPrefixKey+"Temp_LastPageCalled"));
                LogUtils_logHHAuto("Back to home page at the end of actions");
                deleteStoredValue(HHStoredVarPrefixKey + "Temp_LastPageCalled");
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
            }
        }
        switch (getPage()) {
            case ConfigHelper.getHHScriptVars("pagesIDLeaderboard"):
                if (getStoredValue(HHStoredVarPrefixKey + "Setting_showCalculatePower") === "true") {
                    LeagueHelper.moduleSimLeague = callItOnce(LeagueHelper.moduleSimLeague);
                    LeagueHelper.moduleSimLeague();
                    LeagueHelper.style = callItOnce(LeagueHelper.style);
                    LeagueHelper.style();
                }
                break;
            case ConfigHelper.getHHScriptVars("pagesIDSeasonArena"):
                if (getStoredValue(HHStoredVarPrefixKey + "Setting_showCalculatePower") === "true" && $("div.matchRatingNew img#powerLevelScouter").length < 3) {
                    Season.moduleSimSeasonBattle();
                }
                break;
            case ConfigHelper.getHHScriptVars("pagesIDSeason"):
                if (getStoredValue(HHStoredVarPrefixKey + "Setting_SeasonMaskRewards") === "true") {
                    setTimeout(Season.maskReward, 500);
                }
                Season.getRemainingTime = callItOnce(Season.getRemainingTime);
                Season.getRemainingTime();
                if (getStoredValue(HHStoredVarPrefixKey + "Setting_showRewardsRecap") === "true") {
                    Season.displayRewardsDiv();
                }
                break;
            case ConfigHelper.getHHScriptVars("pagesIDEvent"):
                const eventID = EventModule.getDisplayedIdEventPage(false);
                if (eventID != '') {
                    if (getStoredValue(HHStoredVarPrefixKey + "Setting_plusEvent") === "true" || getStoredValue(HHStoredVarPrefixKey + "Setting_plusEventMythic") === "true") {
                        if (eventParsed == null) {
                            EventModule.parseEventPage();
                        }
                        EventModule.moduleDisplayEventPriority();
                        EventModule.hideOwnedGilrs();
                    }
                    if (getStoredValue(HHStoredVarPrefixKey + "Setting_bossBangEvent") === "true" && EventModule.getEvent(eventID).isBossBangEvent) {
                        if (eventParsed == null) {
                            EventModule.parseEventPage();
                        }
                        setTimeout(BossBang.goToFightPage, randomInterval(500, 1500));
                    }
                    if (EventModule.getEvent(eventID).isPoa) {
                        PathOfAttraction.styles();
                        if (getStoredValue(HHStoredVarPrefixKey + "Setting_showClubButtonInPoa") === "true") {
                            PathOfAttraction.run = callItOnce(PathOfAttraction.run);
                            PathOfAttraction.run();
                        }
                    }
                    if (EventModule.getEvent(eventID).isDPEvent) {
                        DoublePenetration.run = callItOnce(DoublePenetration.run);
                        DoublePenetration.run();
                    }
                }
                break;
            case ConfigHelper.getHHScriptVars("pagesIDBossBang"):
                if (getStoredValue(HHStoredVarPrefixKey + "Setting_bossBangEvent") === "true") {
                    setTimeout(BossBang.skipFightPage, randomInterval(500, 1500));
                }
                break;
            case ConfigHelper.getHHScriptVars("pagesIDPoA"):
                if (getStoredValue(HHStoredVarPrefixKey + "Setting_PoAMaskRewards") === "true") {
                    setTimeout(PathOfAttraction.runOld, 500);
                }
                break;
            case ConfigHelper.getHHScriptVars("pagesIDPowerplacemain"):
                PlaceOfPower.moduleDisplayPopID();
                break;
            case ConfigHelper.getHHScriptVars("pagesIDDailyGoals"):
                break;
            case ConfigHelper.getHHScriptVars("pagesIDMissions"):
                break;
            case ConfigHelper.getHHScriptVars("pagesIDShop"):
                if (getStoredValue(HHStoredVarPrefixKey + "Setting_showMarketTools") === "true") {
                    Shop.moduleShopActions();
                }
                if (Booster.needBoosterStatusFromStore()) {
                    Booster.collectBoostersFromMarket = callItOnce(Booster.collectBoostersFromMarket);
                    setTimeout(Booster.collectBoostersFromMarket, 200);
                }
                break;
            case ConfigHelper.getHHScriptVars("pagesIDHome"):
                setTimeout(Season.displayRemainingTime, 500);
                setTimeout(PathOfValue.displayRemainingTime, 500);
                setTimeout(PathOfGlory.displayRemainingTime, 500);
                setTimeout(EventModule.showCompletedEvent, 500);
                Harem.clearHaremToolVariables = callItOnce(Harem.clearHaremToolVariables); // Avoid wired loop, if user reach home page, ensure temp var from harem are cleared
                Harem.clearHaremToolVariables();
                HaremSalary.setSalaryTimeFromHomePage = callItOnce(HaremSalary.setSalaryTimeFromHomePage);
                HaremSalary.setSalaryTimeFromHomePage();
                break;
            case ConfigHelper.getHHScriptVars("pagesIDHarem"):
                Harem.moduleHarem();
                // Harem.moduleHaremExportGirlsData(); // moved to edit team
                // Harem.moduleHaremNextUpgradableGirl(); // TODO fixme
                // Harem.haremOpenFirstXUpgradable(); // TODO fixme
                break;
            case ConfigHelper.getHHScriptVars("pagesIDGirlPage"):
                HaremGirl.moduleHaremGirl = callItOnce(HaremGirl.moduleHaremGirl);
                HaremGirl.moduleHaremGirl();
                HaremGirl.run = callItOnce(HaremGirl.run);
                busy = yield HaremGirl.run();
                break;
            case ConfigHelper.getHHScriptVars("pagesIDPachinko"):
                Pachinko.modulePachinko();
                break;
            case ConfigHelper.getHHScriptVars("pagesIDEditTeam"):
                TeamModule.moduleChangeTeam();
                Harem.moduleHaremExportGirlsData();
                Harem.moduleHaremCountMax();
                break;
            case ConfigHelper.getHHScriptVars("pagesIDWaifu"):
                Harem.moduleHaremExportGirlsData();
                Harem.moduleHaremCountMax();
                break;
            case ConfigHelper.getHHScriptVars("pagesIDContests"):
                break;
            case ConfigHelper.getHHScriptVars("pagesIDPoV"):
                if (getStoredValue(HHStoredVarPrefixKey + "Setting_PoVMaskRewards") === "true") {
                    PathOfValue.maskReward();
                }
                PathOfValue.getRemainingTime = callItOnce(PathOfValue.getRemainingTime);
                PathOfValue.getRemainingTime();
                if (getStoredValue(HHStoredVarPrefixKey + "Setting_showRewardsRecap") === "true") {
                    RewardHelper.displayRewardsPovPogDiv();
                }
                break;
            case ConfigHelper.getHHScriptVars("pagesIDPoG"):
                if (getStoredValue(HHStoredVarPrefixKey + "Setting_PoGMaskRewards") === "true") {
                    PathOfGlory.maskReward();
                }
                PathOfGlory.getRemainingTime = callItOnce(PathOfGlory.getRemainingTime);
                PathOfGlory.getRemainingTime();
                if (getStoredValue(HHStoredVarPrefixKey + "Setting_showRewardsRecap") === "true") {
                    RewardHelper.displayRewardsPovPogDiv();
                }
                break;
            case ConfigHelper.getHHScriptVars("pagesIDSeasonalEvent"):
                SeasonalEvent.styles();
                SeasonalEvent.getRemainingTime = callItOnce(SeasonalEvent.getRemainingTime);
                SeasonalEvent.getRemainingTime();
                break;
            case ConfigHelper.getHHScriptVars("pagesIDChampionsMap"):
                if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoChamps") === "true") {
                    Champion.findNextChamptionTime = callItOnce(Champion.findNextChamptionTime);
                    setTimeout(Champion.findNextChamptionTime, 500);
                }
                break;
            case ConfigHelper.getHHScriptVars("pagesIDChampionsPage"):
                Champion.moduleSimChampions();
                break;
            case ConfigHelper.getHHScriptVars("pagesIDClubChampion"):
                Champion.moduleSimChampions();
                ClubChampion.resetTimerIfNeeded = callItOnce(ClubChampion.resetTimerIfNeeded);
                ClubChampion.resetTimerIfNeeded();
                break;
            case ConfigHelper.getHHScriptVars("pagesIDQuest"):
                const haremItem = getStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlActions");
                const haremGirlMode = getStoredValue(HHStoredVarPrefixKey + "Temp_haremGirlMode");
                if (haremGirlMode && haremItem === HaremGirl.AFFECTION_TYPE) {
                    HaremGirl.payGirlQuest = callItOnce(HaremGirl.payGirlQuest);
                    busy = HaremGirl.payGirlQuest();
                }
                break;
            case ConfigHelper.getHHScriptVars("pagesIDClub"):
                Club.run();
                break;
            case ConfigHelper.getHHScriptVars("pagesIDLabyrinth"):
                if (getStoredValue(HHStoredVarPrefixKey + "Setting_showCalculatePower") === "true") {
                    Labyrinth.sim = callItOnce(Labyrinth.sim);
                    Labyrinth.sim();
                }
                break;
        }
        if (busy === false && !mouseBusy && getStoredValue(HHStoredVarPrefixKey + "Setting_paranoia") === "true" && getStoredValue(HHStoredVarPrefixKey + "Setting_master") === "true" && isAutoLoopActive()) {
            if (checkTimer("paranoiaSwitch")) {
                flipParanoia();
            }
        }
        if (busy === false && burst && !mouseBusy && lastActionPerformed != "none") {
            lastActionPerformed = "none";
            // logHHAuto("no action performed in this loop, rest lastActionPerformed");
        }
        if (lastActionPerformed != getStoredValue(HHStoredVarPrefixKey + "Temp_lastActionPerformed")) {
            LogUtils_logHHAuto("lastActionPerformed changed to " + lastActionPerformed);
        }
        setStoredValue(HHStoredVarPrefixKey + "Temp_lastActionPerformed", lastActionPerformed);
        if (isNaN(getStoredValue(HHStoredVarPrefixKey + "Temp_autoLoopTimeMili"))) {
            LogUtils_logHHAuto("AutoLoopTimeMili is not a number.");
            setDefaults(true);
        }
        else if (isAutoLoopActive()) {
            setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey + "Temp_autoLoopTimeMili")));
        }
        else {
            LogUtils_logHHAuto("autoLoop Disabled");
        }
    });
}

;// CONCATENATED MODULE: ./src/Service/InfoService.ts




function createPInfo() {
    const pInfo = $('<div id="pInfo" ></div>');
    if (pInfo != null) {
        pInfo.on("dblclick", function () {
            let masterSwitch = document.getElementById("master");
            if (masterSwitch.checked === true) {
                setStoredValue(HHStoredVarPrefixKey + "Setting_master", "false");
                masterSwitch.checked = false;
                //console.log("Master switch off");
            }
            else {
                setStoredValue(HHStoredVarPrefixKey + "Setting_master", "true");
                masterSwitch.checked = true;
                //console.log("Master switch on");
            }
        });
    }
    if (getPage() == ConfigHelper.getHHScriptVars("pagesIDHome")) {
        GM_addStyle('#pInfo:hover {max-height : none} #pInfo { max-height : 220px} @media only screen and (max-width: 1025px) {#pInfo { ;top:17% }}');
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_showAdsBack") === "true") {
            GM_addStyle('#sliding-popups#sliding-popups { z-index : 1}');
        }
    }
    else {
        GM_addStyle(''
            + '#pInfo:hover {'
            + '   padding-top : 22px;'
            + '   height : auto;'
            + '   left : 51%;'
            + '}'
            + '#pInfo {'
            + '   left : 84%;'
            + '   top : 8%;'
            + '   z-index : 1000;'
            + '   height : 22px;'
            + '   padding-top : unset;'
            + '}'
            + '@media only screen and (max-width: 1025px) {'
            + '   #pInfo {'
            + '      top : 14%;'
            + '   }'
            + '}');
    }
    return pInfo;
}
function updateData() {
    //logHHAuto("updating UI");
    document.querySelectorAll("div#sMenu input[pattern]").forEach(currentInput => {
        currentInput.checkValidity();
    });
    const pInfo = document.getElementById('pInfo');
    if (pInfo == null) {
        LogUtils_logHHAuto('ERROR pInfo element not found');
        return;
    }
    if (getStoredValue(HHStoredVarPrefixKey + "Setting_showInfo") == "true") // && busy==false // && getPage()==ConfigHelper.getHHScriptVars("pagesIDHome")
     {
        let contest = '';
        if (!TimeHelper.canCollectCompetitionActive())
            contest = " : Wait for contest";
        var Tegzd = '';
        Tegzd += (getStoredValue(HHStoredVarPrefixKey + "Setting_master") === "true" ? "<span style='color:LimeGreen'>HH auto ++ ON" : "<span style='color:red'>HH auto ++ OFF") + '</span>';
        //Tegzd+=(getStoredValue(HHStoredVarPrefixKey+"Setting_master") ==="true"?"<span style='color:LimeGreen'>"+getTextForUI("master","elementText")+" : ON":"<span style='color:red'>"+getTextForUI("master","elementText")+" : OFF")+'</span>';
        //Tegzd+=getTextForUI("master","elementText")+' : '+(getStoredValue(HHStoredVarPrefixKey+"Setting_master") ==="true"?"<span style='color:LimeGreen'>ON":"<span style='color:red'>OFF")+'</span>';
        //Tegzd+=(getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") ==="true"?"<span style='color:LimeGreen;float:right'>Loop ON":"<span style='color:red;float:right'>Loop OFF")+'</span>';
        Tegzd += '<ul>';
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_paranoia") == "true") {
            Tegzd += '<li>' + getStoredValue(HHStoredVarPrefixKey + "Temp_pinfo") + ': ' + getTimeLeft('paranoiaSwitch') + '</li>';
        }
        if (ConfigHelper.getHHScriptVars('isEnabledTrollBattle', false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollBattle") == "true") {
            Tegzd += Troll.getPinfo(contest);
        }
        if (ConfigHelper.getHHScriptVars("isEnabledSalary", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoSalary") == "true") {
            Tegzd += '<li>' + getTextForUI("autoSalary", "elementText") + ' : ' + getTimeLeft('nextSalaryTime') + '</li>';
        }
        if (ConfigHelper.getHHScriptVars('isEnabledSeason', false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeason") == "true") {
            Tegzd += Season.getPinfo();
        }
        /*
        if (ConfigHelper.getHHScriptVars('isEnabledPoV',false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoVCollect") =="true")
        {
            Tegzd += '<li>Collect POV : '+getTimeLeft('nextPoVCollectTime')+'</li>';
        }
        if (ConfigHelper.getHHScriptVars('isEnabledPoG',false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoGCollect") =="true")
        {
            Tegzd += '<li>Collect POG : '+getTimeLeft('nextPoGCollectTime')+'</li>';
        }*/
        if (ConfigHelper.getHHScriptVars('isEnabledLeagues', false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoLeagues") == "true") {
            Tegzd += LeagueHelper.getPinfo();
        }
        if (ConfigHelper.getHHScriptVars("isEnabledChamps", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoChamps") == "true") {
            Tegzd += '<li>' + getTextForUI("autoChampsTitle", "elementText") + ' : ' + getTimeLeft('nextChampionTime') + '</li>';
        }
        if (ConfigHelper.getHHScriptVars("isEnabledClubChamp", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoClubChamp") == "true") {
            Tegzd += '<li>' + getTextForUI("autoClubChamp", "elementText") + ' : ' + getTimeLeft('nextClubChampionTime') + '</li>';
        }
        if (ConfigHelper.getHHScriptVars('isEnabledPantheon', false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoPantheon") == "true") {
            Tegzd += Pantheon.getPinfo();
        }
        if (ConfigHelper.getHHScriptVars("isEnabledShop", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_updateMarket") == "true") {
            Tegzd += '<li>' + getTextForUI("autoBuy", "elementText") + ' : ' + getTimeLeft('nextShopTime') + '</li>';
        }
        if (ConfigHelper.getHHScriptVars("isEnabledMission", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoMission") == "true") {
            Tegzd += '<li>' + getTextForUI("autoMission", "elementText") + ' : ' + getTimeLeft('nextMissionTime') + '</li>';
        }
        if (ConfigHelper.getHHScriptVars("isEnabledContest", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoContest") == "true") {
            Tegzd += '<li>' + getTextForUI("autoContest", "elementText") + ' : ' + getTimeLeft('nextContestTime') + '</li>';
        }
        if (ConfigHelper.getHHScriptVars("isEnabledPowerPlaces", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoPowerPlaces") == "true") {
            Tegzd += '<li>' + getTextForUI("powerPlacesTitle", "elementText") + ' : ' + getTimeLeft('minPowerPlacesTime') + '</li>';
        }
        if (ConfigHelper.getHHScriptVars("isEnabledPachinko", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoFreePachinko") == "true") {
            if (getTimer('nextPachinkoTime') !== -1) {
                Tegzd += '<li>' + getTextForUI("autoFreePachinko", "elementText") + ' : ' + getTimeLeft('nextPachinkoTime') + '</li>';
            }
            if (getTimer('nextPachinko2Time') !== -1) {
                Tegzd += '<li>' + getTextForUI("autoMythicPachinko", "elementText") + ' : ' + getTimeLeft('nextPachinko2Time') + '</li>';
            }
            if (getTimer('nextPachinkoEquipTime') !== -1) {
                Tegzd += '<li>' + getTextForUI("autoEquipmentPachinko", "elementText") + ' : ' + getTimeLeft('nextPachinkoEquipTime') + '</li>';
            }
        }
        if (getTimer('eventMythicNextWave') !== -1) {
            Tegzd += '<li>' + getTextForUI("mythicGirlNext", "elementText") + ' : ' + getTimeLeft('eventMythicNextWave') + '</li>';
        }
        if (getTimer('eventSultryMysteryShopRefresh') !== -1) {
            Tegzd += '<li>' + getTextForUI("sultryMysteriesEventRefreshShopNext", "elementText") + ' : ' + getTimeLeft('eventSultryMysteryShopRefresh') + '</li>';
        }
        if (getStoredValue(HHStoredVarPrefixKey + "Temp_haveAff")) {
            Tegzd += '<li>' + getTextForUI("autoAffW", "elementText") + ' : ' + NumberHelper.add1000sSeparator(getStoredValue(HHStoredVarPrefixKey + "Temp_haveAff")) + '</li>';
        }
        if (getStoredValue(HHStoredVarPrefixKey + "Temp_haveExp")) {
            Tegzd += '<li>' + getTextForUI("autoExpW", "elementText") + ' : ' + NumberHelper.add1000sSeparator(getStoredValue(HHStoredVarPrefixKey + "Temp_haveExp")) + '</li>';
        }
        Tegzd += '</ul>';
        pInfo.style.display = 'block';
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_showInfoLeft") === 'true' && getPage() === ConfigHelper.getHHScriptVars("pagesIDHome")) {
            pInfo.className = 'left';
        }
        pInfo.innerHTML = Tegzd;
    }
    else {
        pInfo.style.display = 'none';
    }
}

;// CONCATENATED MODULE: ./src/Service/MouseService.ts


let mouseBusy = false;
let mouseBusyTimeout = 0;
function makeMouseBusy(ms) {
    clearTimeout(mouseBusyTimeout);
    //logHHAuto('mouseBusy' + mouseBusy + ' ' + ms);
    mouseBusy = true;
    mouseBusyTimeout = setTimeout(function () { mouseBusy = false; }, ms);
}
;
function bindMouseEvents() {
    const mouseTimeoutVal = Number.isInteger(Number(getStoredValue(HHStoredVarPrefixKey + "Setting_mousePauseTimeout"))) ? Number(getStoredValue(HHStoredVarPrefixKey + "Setting_mousePauseTimeout")) : 5000;
    document.onmousemove = function () { makeMouseBusy(mouseTimeoutVal); };
    document.onscroll = function () { makeMouseBusy(mouseTimeoutVal); };
    document.onmouseup = function () { makeMouseBusy(mouseTimeoutVal); };
}

;// CONCATENATED MODULE: ./src/Service/ParanoiaService.ts






function replacerMap(key, value) {
    const originalObject = this[key];
    if (originalObject instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(originalObject.entries()), // or with spread: value: [...originalObject]
        };
    }
    else {
        return value;
    }
}
function reviverMap(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}
function checkParanoiaSpendings(spendingFunction = undefined) {
    var pSpendings = new Map([]);
    // not set
    if (getStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaSpendings") === undefined) {
        return -1;
    }
    else {
        pSpendings = JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaSpendings"), reviverMap);
    }
    if (getStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaQuestBlocked") !== undefined && pSpendings.has('quest')) {
        pSpendings.delete('quest');
    }
    if (getStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaLeagueBlocked") !== undefined && pSpendings.has('challenge')) {
        pSpendings.delete('challenge');
    }
    // for all count remaining
    if (spendingFunction === undefined) {
        var spendingsRemaining = 0;
        for (var i of pSpendings.values()) {
            spendingsRemaining += Number(i);
        }
        //logHHAuto("Paranoia spending remaining : "+JSON.stringify(pSpendings,replacerMap));
        return spendingsRemaining;
    }
    else {
        // return value if exist else -1
        return pSpendings.get(spendingFunction) || -1;
    }
}
function clearParanoiaSpendings() {
    sessionStorage.removeItem(HHStoredVarPrefixKey + 'Temp_paranoiaSpendings');
    sessionStorage.removeItem(HHStoredVarPrefixKey + 'Temp_NextSwitch');
    sessionStorage.removeItem(HHStoredVarPrefixKey + 'Temp_paranoiaQuestBlocked');
    sessionStorage.removeItem(HHStoredVarPrefixKey + 'Temp_paranoiaLeagueBlocked');
}
function updatedParanoiaSpendings(inSpendingFunction, inSpent) {
    var currentPSpendings = new Map([]);
    // not set
    if (getStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaSpendings") === undefined) {
        return -1;
    }
    else {
        currentPSpendings = JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaSpendings"), reviverMap);
        if (currentPSpendings.has(inSpendingFunction)) {
            let currValue = currentPSpendings.get(inSpendingFunction) || 0;
            currValue -= inSpent;
            if (currValue > 0) {
                LogUtils_logHHAuto("Spent " + inSpent + " " + inSpendingFunction + ", remains " + currValue + " before Paranoia.");
                currentPSpendings.set(inSpendingFunction, currValue);
            }
            else {
                currentPSpendings.delete(inSpendingFunction);
            }
        }
        LogUtils_logHHAuto("Remains to spend before Paranoia : " + JSON.stringify(currentPSpendings, replacerMap));
        setStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaSpendings", JSON.stringify(currentPSpendings, replacerMap));
    }
}
//sets spending to do before paranoia
function setParanoiaSpendings() {
    var maxPointsDuringParanoia;
    var totalPointsEndParanoia;
    var paranoiaSpendings = new Map([]);
    var paranoiaSpend;
    var currentEnergy;
    var maxEnergy;
    var toNextSwitch;
    if (getStoredValue(HHStoredVarPrefixKey + "Temp_NextSwitch") !== undefined && getStoredValue(HHStoredVarPrefixKey + "Setting_paranoiaSpendsBefore") === "true") {
        toNextSwitch = Number((getStoredValue(HHStoredVarPrefixKey + "Temp_NextSwitch") - new Date().getTime()) / 1000);
        //if autoLeague is on
        if (LeagueHelper.isAutoLeagueActivated()) {
            if (getStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaLeagueBlocked") === undefined) {
                maxPointsDuringParanoia = Math.ceil((toNextSwitch - Number(getHHVars('Hero.energies.challenge.next_refresh_ts'))) / Number(getHHVars('Hero.energies.challenge.seconds_per_point')));
                currentEnergy = LeagueHelper.getEnergy();
                maxEnergy = LeagueHelper.getEnergyMax();
                totalPointsEndParanoia = currentEnergy + maxPointsDuringParanoia;
                //if point refreshed during paranoia would go above max
                if (totalPointsEndParanoia >= maxEnergy) {
                    paranoiaSpend = totalPointsEndParanoia - maxEnergy + 1;
                    paranoiaSpendings.set("challenge", paranoiaSpend);
                    LogUtils_logHHAuto("Setting Paranoia spendings for league : " + currentEnergy + "+" + maxPointsDuringParanoia + " max gained in " + toNextSwitch + " secs => (" + totalPointsEndParanoia + "/" + maxEnergy + ") spending " + paranoiaSpend);
                }
                else {
                    LogUtils_logHHAuto("Setting Paranoia spendings for league : " + currentEnergy + "+" + maxPointsDuringParanoia + " max gained in " + toNextSwitch + " secs => (" + totalPointsEndParanoia + "/" + maxEnergy + ") No spending ");
                }
            }
        }
        //if autoquest is on
        if (ConfigHelper.getHHScriptVars('isEnabledQuest', false) && (getStoredValue(HHStoredVarPrefixKey + "Setting_autoQuest") === "true" || (ConfigHelper.getHHScriptVars("isEnabledSideQuest", false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoSideQuest") === "true"))) {
            if (getStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaQuestBlocked") === undefined) {
                maxPointsDuringParanoia = Math.ceil((toNextSwitch - Number(getHHVars('Hero.energies.quest.next_refresh_ts'))) / Number(getHHVars('Hero.energies.quest.seconds_per_point')));
                currentEnergy = QuestHelper.getEnergy();
                maxEnergy = QuestHelper.getEnergyMax();
                totalPointsEndParanoia = currentEnergy + maxPointsDuringParanoia;
                //if point refreshed during paranoia would go above max
                if (totalPointsEndParanoia >= maxEnergy) {
                    paranoiaSpend = totalPointsEndParanoia - maxEnergy + 1;
                    paranoiaSpendings.set("quest", paranoiaSpend);
                    LogUtils_logHHAuto("Setting Paranoia spendings for quest : " + currentEnergy + "+" + maxPointsDuringParanoia + " max gained in " + toNextSwitch + " secs => (" + totalPointsEndParanoia + "/" + maxEnergy + ") spending " + paranoiaSpend);
                }
                else {
                    LogUtils_logHHAuto("Setting Paranoia spendings for quest : " + currentEnergy + "+" + maxPointsDuringParanoia + " max gained in " + toNextSwitch + " secs => (" + totalPointsEndParanoia + "/" + maxEnergy + ") No spending ");
                }
            }
        }
        //if autoTrollBattle is on
        if (ConfigHelper.getHHScriptVars('isEnabledTrollBattle', false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollBattle") === "true" && getHHVars('Hero.infos.questing.id_world') > 0) {
            maxPointsDuringParanoia = Math.ceil((toNextSwitch - Number(getHHVars('Hero.energies.fight.next_refresh_ts'))) / Number(getHHVars('Hero.energies.fight.seconds_per_point')));
            currentEnergy = Troll.getEnergy();
            maxEnergy = Troll.getEnergyMax();
            totalPointsEndParanoia = currentEnergy + maxPointsDuringParanoia;
            //if point refreshed during paranoia would go above max
            if (totalPointsEndParanoia >= maxEnergy) {
                paranoiaSpend = totalPointsEndParanoia - maxEnergy + 1;
                paranoiaSpendings.set("fight", paranoiaSpend);
                LogUtils_logHHAuto("Setting Paranoia spendings for troll : " + currentEnergy + "+" + maxPointsDuringParanoia + " max gained in " + toNextSwitch + " secs => (" + totalPointsEndParanoia + "/" + maxEnergy + ") spending " + paranoiaSpend);
            }
            else {
                LogUtils_logHHAuto("Setting Paranoia spendings for troll : " + currentEnergy + "+" + maxPointsDuringParanoia + " max gained in " + toNextSwitch + " secs => (" + totalPointsEndParanoia + "/" + maxEnergy + ") No spending ");
            }
        }
        //if autoSeason is on
        if (ConfigHelper.getHHScriptVars('isEnabledSeason', false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoSeason") === "true") {
            maxPointsDuringParanoia = Math.ceil((toNextSwitch - Number(getHHVars('Hero.energies.kiss.next_refresh_ts'))) / Number(getHHVars('Hero.energies.kiss.seconds_per_point')));
            currentEnergy = Season.getEnergy();
            maxEnergy = Season.getEnergyMax();
            totalPointsEndParanoia = currentEnergy + maxPointsDuringParanoia;
            //if point refreshed during paranoia would go above max
            if (totalPointsEndParanoia >= maxEnergy) {
                paranoiaSpend = totalPointsEndParanoia - maxEnergy + 1;
                paranoiaSpendings.set("kiss", paranoiaSpend);
                LogUtils_logHHAuto("Setting Paranoia spendings for Season : " + currentEnergy + "+" + maxPointsDuringParanoia + " max gained in " + toNextSwitch + " secs => (" + totalPointsEndParanoia + "/" + maxEnergy + ") spending " + paranoiaSpend);
            }
            else {
                LogUtils_logHHAuto("Setting Paranoia spendings for Season : " + currentEnergy + "+" + maxPointsDuringParanoia + " max gained in " + toNextSwitch + " secs => (" + totalPointsEndParanoia + "/" + maxEnergy + ") No spending ");
            }
        }
        //if autoPantheon is on
        if (ConfigHelper.getHHScriptVars('isEnabledPantheon', false) && getStoredValue(HHStoredVarPrefixKey + "Setting_autoPantheon") === "true") {
            maxPointsDuringParanoia = Math.ceil((toNextSwitch - Number(getHHVars('Hero.energies.worship.next_refresh_ts'))) / Number(getHHVars('Hero.energies.worship.seconds_per_point')));
            currentEnergy = Pantheon.getEnergy();
            maxEnergy = Pantheon.getEnergyMax();
            totalPointsEndParanoia = currentEnergy + maxPointsDuringParanoia;
            //if point refreshed during paranoia would go above max
            if (totalPointsEndParanoia >= maxEnergy) {
                paranoiaSpend = totalPointsEndParanoia - maxEnergy + 1;
                paranoiaSpendings.set("worship", paranoiaSpend);
                LogUtils_logHHAuto("Setting Paranoia spendings for Pantheon : " + currentEnergy + "+" + maxPointsDuringParanoia + " max gained in " + toNextSwitch + " secs => (" + totalPointsEndParanoia + "/" + maxEnergy + ") spending " + paranoiaSpend);
            }
            else {
                LogUtils_logHHAuto("Setting Paranoia spendings for Pantheon : " + currentEnergy + "+" + maxPointsDuringParanoia + " max gained in " + toNextSwitch + " secs => (" + totalPointsEndParanoia + "/" + maxEnergy + ") No spending ");
            }
        }
        LogUtils_logHHAuto("Setting paranoia spending to : " + JSON.stringify(paranoiaSpendings, replacerMap));
        setStoredValue(HHStoredVarPrefixKey + "Temp_paranoiaSpendings", JSON.stringify(paranoiaSpendings, replacerMap));
    }
}
function flipParanoia() {
    var burst = getBurst();
    var Setting = getStoredValue(HHStoredVarPrefixKey + "Setting_paranoiaSettings");
    var S1 = Setting.split('/').map(s => s.split('|').map(s => s.split(':')));
    var toNextSwitch;
    var period;
    var n = new Date().getHours();
    S1[2].some(x => { if (n < x[0]) {
        period = x[1];
        return true;
    } });
    if (burst) {
        var periods = Object.assign({}, ...S1[1].map((d) => ({ [d[0]]: d[1].split('-') })));
        toNextSwitch = getStoredValue(HHStoredVarPrefixKey + "Temp_NextSwitch") ? Number((getStoredValue(HHStoredVarPrefixKey + "Temp_NextSwitch") - new Date().getTime()) / 1000) : randomInterval(Number(periods[period][0]), Number(periods[period][1]));
        //match mythic new wave with end of sleep
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollMythicByPassParanoia") === "true" && getTimer("eventMythicNextWave") !== -1 && toNextSwitch > getSecondsLeft("eventMythicNextWave")) {
            LogUtils_logHHAuto("Forced rest only until next mythic wave.");
            toNextSwitch = getSecondsLeft("eventMythicNextWave");
        }
        //bypass Paranoia if ongoing mythic
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoTrollMythicByPassParanoia") === "true") {
            const eventMythicGirl = EventModule.getEventMythicGirl();
            if (eventMythicGirl.girl_id && eventMythicGirl.is_mythic) {
                //             var trollThreshold = Number(getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollThreshold"));
                //             if (getStoredValue(HHStoredVarPrefixKey+"Setting_buyMythicCombat") === "true" || getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollMythicByPassThreshold") === "true")
                //             {
                //                 trollThreshold = 0;
                //             }
                //mythic onGoing and still have some fight above threshold
                if (Troll.getEnergy() > 0) //trollThreshold)
                 {
                    LogUtils_logHHAuto("Forced bypass Paranoia for mythic (can fight).");
                    setTimer('paranoiaSwitch', 60);
                    return;
                }
                //mythic ongoing and can buyCombat
                // const Hero=getHero();
                // var price=Hero.get_recharge_cost("fight");
                if (Troll.canBuyFight(eventMythicGirl).canBuy && Troll.getEnergy() == 0) {
                    LogUtils_logHHAuto("Forced bypass Paranoia for mythic (can buy).");
                    setTimer('paranoiaSwitch', 60);
                    return;
                }
            }
        }
        if (checkParanoiaSpendings() === -1 && getStoredValue(HHStoredVarPrefixKey + "Setting_paranoiaSpendsBefore") === "true") {
            setStoredValue(HHStoredVarPrefixKey + "Temp_NextSwitch", new Date().getTime() + toNextSwitch * 1000);
            setParanoiaSpendings();
            return;
        }
        if (checkParanoiaSpendings() === 0 || getStoredValue(HHStoredVarPrefixKey + "Setting_paranoiaSpendsBefore") === "false") {
            clearParanoiaSpendings();
            PlaceOfPower.cleanTempPopToStart();
            //going into hiding
            setStoredValue(HHStoredVarPrefixKey + "Temp_burst", "false");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
        }
        else {
            //refresh remaining
            //setParanoiaSpendings(toNextSwitch);
            //let spending go before going in paranoia
            return;
        }
    }
    else {
        //if (getPage()!=ConfigHelper.getHHScriptVars("pagesIDHome")) return;
        //going to work
        setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
        LogUtils_logHHAuto("setting autoloop to false");
        setStoredValue(HHStoredVarPrefixKey + "Temp_burst", "true");
        var b = S1[0][0][0].split('-');
        toNextSwitch = randomInterval(Number(b[0]), Number(b[1]));
    }
    var ND = new Date().getTime() + toNextSwitch * 1000;
    var message = period + (burst ? " rest" : " burst");
    LogUtils_logHHAuto("PARANOIA: " + message);
    setStoredValue(HHStoredVarPrefixKey + "Temp_pinfo", message);
    setTimer('paranoiaSwitch', toNextSwitch);
    //force recheck non completed event after paranoia
    if (getStoredValue(HHStoredVarPrefixKey + "Temp_burst") == "true") {
        /*
        let eventList = isJSON(getStoredValue(HHStoredVarPrefixKey+"Temp_eventsList"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_eventsList")):{};
        for (let eventID of Object.keys(eventList))
        {
            //console.log(eventID);
            if (!eventList[eventID]["isCompleted"])
            {
                eventList[eventID]["next_refresh"]=new Date().getTime()-1000;
                //console.log("expire");
                if(Object.keys(eventList).length >0)
                {
                    setStoredValue(HHStoredVarPrefixKey+"Temp_eventsList", JSON.stringify(eventList));
                }
            }
        }
        */
        //sessionStorage.removeItem(HHStoredVarPrefixKey+"Temp_eventsList");
        gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
    }
}

;// CONCATENATED MODULE: ./src/Service/TooltipService.ts


function manageToolTipsDisplay(important = false) {
    if (getStoredValue(HHStoredVarPrefixKey + "Setting_showTooltips") === "true") {
        enableToolTipsDisplay(important);
    }
    else {
        disableToolTipsDisplay(important);
    }
}
function enableToolTipsDisplay(important = false) {
    const importantAddendum = important ? '; !important' : '';
    GM_addStyle('.tooltipHH:hover span.tooltipHHtext { border:1px solid #ffa23e; border-radius:5px; padding:5px; display:block; z-index: 100; position: absolute; width: 150px; color:black; text-align:center; background:white;  opacity:0.9; transform: translateY(-100%)' + importantAddendum + '}');
}
function disableToolTipsDisplay(important = false) {
    const importantAddendum = important ? '; !important' : '';
    GM_addStyle('.tooltipHH:hover span.tooltipHHtext { display: none' + importantAddendum + '}');
}

;// CONCATENATED MODULE: ./src/Service/StartService.ts








var started = false;
var debugMenuID;
class StartService {
    static checkVersion() {
        let previousScriptVersion = getStoredValue(HHStoredVarPrefixKey + "Temp_scriptversion");
        if (previousScriptVersion != GM.info.script.version) {
            // run action on new script version
            LogUtils_logHHAuto(`New script version detected from ${previousScriptVersion} to ${GM.info.script.version}`);
            setStoredValue(HHStoredVarPrefixKey + "Temp_scriptversion", GM.info.script.version);
            deleteStoredValue(HHStoredVarPrefixKey + "Temp_trollWithGirls"); // Format changed with 7.3.7
        }
    }
}
function setDefaults(force = false) {
    for (let i of Object.keys(HHStoredVars_HHStoredVars)) {
        if (HHStoredVars_HHStoredVars[i].storage !== undefined) {
            let storageItem = getStorageItem(HHStoredVars_HHStoredVars[i].storage);
            let isInvalid = false;
            //console.log(storageItem[i], storageItem[i] !== undefined);
            if (HHStoredVars_HHStoredVars[i].isValid !== undefined && storageItem[i] !== undefined) {
                isInvalid = !HHStoredVars_HHStoredVars[i].isValid.test(storageItem[i]);
                if (isInvalid) {
                    LogUtils_logHHAuto("HHStoredVar " + i + " is invalid, reseting.");
                    LogUtils_logHHAuto("HHStoredVar " + i + " current value : " + storageItem[i]);
                }
            }
            if (HHStoredVars_HHStoredVars[i].default !== undefined) {
                if (storageItem[i] === undefined || force || isInvalid) {
                    setHHStoredVarToDefault(i);
                }
            }
            else {
                if (force || isInvalid) {
                    storageItem.removeItem(i);
                }
            }
        }
        else {
            LogUtils_logHHAuto("HHStoredVar " + i + " has no storage defined.");
        }
    }
}
function hardened_start() {
    debugMenuID = GM_registerMenuCommand(getTextForUI("saveDebug", "elementText"), saveHHDebugLog);
    //GM_unregisterMenuCommand(debugMenuID);
    if (unsafeWindow.jQuery == undefined) {
        console.log("HHAUTO WARNING: No jQuery found.");
        //setTimeout(()=>{ location.reload }, randomInterval(15*60, 20*60) * 1000);
        return;
    }
    if (!started) {
        started = true;
        start();
    }
}
function start() {
    var _a;
    if (unsafeWindow.Hero === undefined) {
        LogUtils_logHHAuto('???no Hero???');
        $('.hh_logo').click();
        setTimeout(hardened_start, 5000);
        return;
    }
    if ($("a[rel='phoenix_member_login']").length > 0) {
        LogUtils_logHHAuto('Not logged in, please login first!');
        return;
    }
    StartService.checkVersion();
    Club.checkClubStatus();
    MonthlyCards.updateInputPattern();
    replaceCheatClick();
    migrateHHVars();
    if (getStoredValue(HHStoredVarPrefixKey + "Setting_leagueListDisplayPowerCalc") !== "true" && getStoredValue(HHStoredVarPrefixKey + "Setting_autoLeaguesSortIndex") !== LeagueHelper.SORT_POWERCALC) {
        // remove big var not removed from previous version
        deleteStoredValue(HHStoredVarPrefixKey + "Temp_LeagueOpponentList");
    }
    $('.redirect.gay').hide();
    $('.redirect.comix').hide();
    $('#starter_offer').hide();
    $('#starter_offer_background').hide();
    if (getStoredValue(HHStoredVarPrefixKey + "Temp_Timers")) {
        setTimers(JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_Timers")));
    }
    // clearEventData("onlyCheckEventsHHScript");
    setDefaults();
    if (getStoredValue(HHStoredVarPrefixKey + "Setting_mousePause") === "true") {
        bindMouseEvents();
    }
    const hhAutoMenu = new HHMenu();
    $('#contains_all').prepend(getMenu());
    hhAutoMenu.createMenuButton();
    addEventsOnMenuItems();
    $("#showTooltips").on("change", () => {
        //console.log(this.checked);
        if ($("#showTooltips")[0].checked) {
            enableToolTipsDisplay(true);
        }
        else {
            disableToolTipsDisplay(true);
        }
    });
    const pInfoDiv = createPInfo();
    if (getPage() == ConfigHelper.getHHScriptVars("pagesIDMissions")
        || getPage() == ConfigHelper.getHHScriptVars("pagesIDContests")
        || getPage() == ConfigHelper.getHHScriptVars("pagesIDPowerplacemain")
        || getPage() == ConfigHelper.getHHScriptVars("pagesIDDailyGoals")) {
        Contest.styles();
        PlaceOfPower.styles();
        DailyGoals.styles();
        Missions.styles();
    }
    Booster.collectBoostersFromAjaxResponses();
    $('#contains_all').append(pInfoDiv);
    maskInactiveMenus();
    // Add auto troll options
    hhAutoMenu.fillTrollSelectMenu(Troll.getLastTrollIdAvailable());
    // Add league options
    hhAutoMenu.fillLeagueSelectMenu();
    hhAutoMenu.fillLeaguSortMenu();
    setMenuValues();
    getMenuValues();
    manageToolTipsDisplay();
    $("#git").on("click", function () { window.open("https://github.com/Roukys/HHauto/wiki"); });
    $("#ReportBugs").on("click", function () { window.open("https://github.com/Roukys/HHauto/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc"); });
    $("#loadConfig").on("click", function () {
        let LoadDialog = '<p>After you select the file the settings will be automatically updated.</p><p> If nothing happened, then the selected file contains errors.</p><p id="LoadConfError"style="color:#f53939;"></p><p><label><input type="file" id="myfile" accept=".json" name="myfile"> </label></p>';
        fillHHPopUp("loadConfig", getTextForUI("loadConfig", "elementText"), LoadDialog);
        $('#myfile').on('change', myfileLoad_onChange);
    });
    $("#saveConfig").on("click", saveHHVarsSettingsAsJSON);
    $("#saveDefaults").on("click", saveHHStoredVarsDefaults);
    $("#DebugMenu").on("click", function () {
        let debugDialog = '<div style="padding:10px; display:flex;flex-direction:column">'
            + '<p>HHAuto : v' + GM_info.script.version + '</p>'
            + '<p>' + getTextForUI("DebugFileText", "elementText") + '</p>'
            + '<div style="display:flex;flex-direction:row">'
            + '<div class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("saveDebug", "tooltip") + '</span><label class="myButton" id="saveDebug">' + getTextForUI("saveDebug", "elementText") + '</label></div>'
            + '</div>'
            + '<p>' + getTextForUI("DebugResetTimerText", "elementText") + '</p>'
            + '<div style="display:flex;flex-direction:row">'
            + '<div style="padding-right:30px"class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("timerResetButton", "tooltip") + '</span><label class="myButton" id="timerResetButton">' + getTextForUI("timerResetButton", "elementText") + '</label></div>'
            + '<div style="padding-right:10px" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("timerResetSelector", "tooltip") + '</span><select id="timerResetSelector"></select></div>'
            + '<div class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("timerLeftTime", "tooltip") + '</span><span id="timerLeftTime">' + getTextForUI("timerResetNoTimer", "elementText") + '</span></div>'
            + '</div>'
            + '<p>' + getTextForUI("DebugOptionsText", "elementText") + '</p>'
            + '<div style="display:flex;flex-direction:row">'
            + '<div style="padding-right:30px" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("DeleteTempVars", "tooltip") + '</span><label class="myButton" id="DeleteTempVars">' + getTextForUI("DeleteTempVars", "elementText") + '</label></div>'
            + '<div class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("ResetAllVars", "tooltip") + '</span><label class="myButton" id="ResetAllVars">' + getTextForUI("ResetAllVars", "elementText") + '</label></div>'
            + '</div>'
            + '</div>';
        fillHHPopUp("DebugMenu", getTextForUI("DebugMenu", "elementText"), debugDialog);
        $("#DeleteTempVars").on("click", function () {
            debugDeleteTempVars();
            location.reload();
        });
        $("#ResetAllVars").on("click", function () {
            debugDeleteAllVars();
            location.reload();
        });
        $("#saveDebug").on("click", saveHHDebugLog);
        $("#timerResetButton").on("click", function () {
            let timerSelector = document.getElementById("timerResetSelector");
            if (timerSelector.options[timerSelector.selectedIndex].text !== getTextForUI("timerResetNoTimer", "elementText") && timerSelector.options[timerSelector.selectedIndex].text !== getTextForUI("timerResetSelector", "elementText")) {
                const sMenu = document.getElementById("sMenu");
                if (sMenu != null)
                    sMenu.style.display = "none";
                maskHHPopUp();
                setTimer(timerSelector.options[timerSelector.selectedIndex].text, 0);
                timerSelector.selectedIndex = 0;
            }
        });
        $(document).on('change', "#timerResetSelector", function () {
            let timerSelector = document.getElementById("timerResetSelector");
            const timerLeftTime = document.getElementById("timerLeftTime");
            if (timerSelector.options[timerSelector.selectedIndex].text !== getTextForUI("timerResetNoTimer", "elementText") && timerSelector.options[timerSelector.selectedIndex].text !== getTextForUI("timerResetSelector", "elementText")) {
                $("#timerLeftTime").text(getTimeLeft(timerSelector.options[timerSelector.selectedIndex].text));
            }
            else {
                $("#timerLeftTime").text(getTextForUI("timerResetNoTimer", "elementText"));
            }
        });
        // Add Timer reset options //changed
        let timerOptions = document.getElementById("timerResetSelector");
        var countTimers = 0;
        let optionElement = document.createElement("option");
        optionElement.value = countTimers + '';
        optionElement.text = getTextForUI("timerResetSelector", "elementText");
        countTimers++;
        timerOptions.add(optionElement);
        for (let i2 in Timers) {
            let optionElement = document.createElement("option");
            optionElement.value = countTimers + '';
            countTimers++;
            optionElement.text = i2;
            timerOptions.add(optionElement);
        }
        ;
        if (countTimers === 1) {
            let optionElement = document.createElement("option");
            optionElement.value = countTimers + '';
            optionElement.text = getTextForUI("timerResetNoTimer", "elementText");
            timerOptions.add(optionElement);
        }
    });
    document.querySelectorAll("div#sMenu input[pattern]").forEach((currentInputElement) => {
        const currentInput = currentInputElement;
        currentInput.addEventListener('input', () => {
            currentInput.style.backgroundColor = "";
            currentInput.checkValidity();
        });
        currentInput.addEventListener('invalid', () => {
            currentInput.style.backgroundColor = "red";
            //document.getElementById("master").checked = false;
            //setStoredValue(HHStoredVarPrefixKey+"Setting_master", "false");
        });
        currentInput.checkValidity();
    });
    setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "true");
    if (typeof getStoredValue(HHStoredVarPrefixKey + "Temp_freshStart") == "undefined" || isNaN(Number(getStoredValue(HHStoredVarPrefixKey + "Temp_autoLoopTimeMili")))) {
        setDefaults(true);
    }
    if (getBurst()) {
        Market.doShopping();
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoStatsSwitch") === "true") {
            doStatUpgrades();
        }
    }
    if (unsafeWindow.hh_nutaku && window.top) {
        function Alive() {
            if (window.top)
                window.top.postMessage({ ImAlive: true }, '*');
            if (getStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop") == "true") {
                setTimeout(Alive, 2000);
            }
        }
        Alive();
    }
    if (isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_LastPageCalled")) && ((_a = JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_LastPageCalled")).page) === null || _a === void 0 ? void 0 : _a.indexOf(".html")) > 0) {
        //console.log("testingHome : setting to : "+getPage());
        setStoredValue(HHStoredVarPrefixKey + "Temp_LastPageCalled", JSON.stringify({ page: getPage(), dateTime: new Date().getTime() }));
    }
    if (isJSON(getStoredValue(HHStoredVarPrefixKey + "Temp_LastPageCalled")) && JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Temp_LastPageCalled")).page === ConfigHelper.getHHScriptVars("pagesIDHome")) {
        //console.log("testingHome : delete");
        deleteStoredValue(HHStoredVarPrefixKey + "Temp_LastPageCalled");
    }
    getPage(true);
    setTimeout(autoLoop, 1000);
    GM_registerMenuCommand(getTextForUI("translate", "elementText"), manageTranslationPopUp);
}
;

;// CONCATENATED MODULE: ./src/Service/index.ts








;// CONCATENATED MODULE: ./src/index.ts

setTimeout(hardened_start, 5000);
$(function () {
    hardened_start();
});

/******/ })()
;