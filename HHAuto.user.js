// ==UserScript==
// @name         HaremHeroes Automatic++
// @namespace    https://github.com/Roukys/HHauto
// @version      5.11.3
// @description  Open the menu in HaremHeroes(topright) to toggle AutoControlls. Supports AutoSalary, AutoContest, AutoMission, AutoQuest, AutoTrollBattle, AutoArenaBattle and AutoPachinko(Free), AutoLeagues, AutoChampions and AutoStatUpgrades. Messages are printed in local console.
// @author       JD and Dorten(a bit), Roukys, cossname, YotoTheOne, CLSchwab, deuxge, react31, PrimusVox, OldRon1977, tsokh
// @match        http*://*.haremheroes.com/*
// @match        http*://*.hentaiheroes.com/*
// @match        http*://*.gayharem.com/*
// @match        http*://*.comixharem.com/*
// @match        http*://*.hornyheroes.com/*
// @match        http*://*.pornstarharem.com/*
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM.openInTab
// @license      MIT
// @updateURL    https://github.com/Roukys/HHauto/raw/main/HHAuto.user.js
// @downloadURL  https://github.com/Roukys/HHauto/raw/main/HHAuto.user.js
// ==/UserScript==

//CSS Region
GM_addStyle('.HHAutoScriptMenu .switch { position: relative; display: inline-block; width: 34px; height: 20px; top:0 }/* The switch - the box around the slider */ '
            +'.HHAutoScriptMenu .switch input { display:none } /* Hide default HTML checkbox */ '
            +'.HHAutoScriptMenu .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; -webkit-transition: .4s; transition: .4s; } /* The slider */'
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
//GM_addStyle('span.HHMenuItemName {font-size: xx-small; line-height: 150%}');
//GM_addStyle('span.HHMenuItemName {font-size: smaller; line-height: 120%}');
GM_addStyle('span.HHMenuItemName {padding-bottom:2px; line-height:120%}');
GM_addStyle('div.optionsRow {display:flex; flex-direction:row; justify-content: space-between}'); //; padding:3px;
GM_addStyle('span.optionsBoxTitle {padding-left:5px}'); //; padding-bottom:2px
GM_addStyle('div.optionsColumn {display:flex; flex-direction:column; justify-content: space-between}'); //; padding:3px;
GM_addStyle('div.optionsBoxWithTitle {display:flex; flex-direction:column}');
GM_addStyle('img.iconImg {max-width:15px; height:15px}');
GM_addStyle('div.optionsBoxTitle {padding:5px 15px 0px 5px; height:15px; display:flex; flex-direction:row; justify-content:center; align-items:center;}'); //; padding:2px; padding-bottom:0px;
GM_addStyle('div.rowOptionsBox {margin:3px; padding:3px; font-size:smaller; display:flex; flex-direction:row; align-items:flex-start; border: 1px solid #ffa23e; border-radius: 5px}');
GM_addStyle('div.optionsBox {margin:3px; padding:3px; font-size:smaller; display:flex; flex-direction:column; border:1px solid #ffa23e; border-radius:5px}');
GM_addStyle('div.internalOptionsRow {display:flex; flex-direction:row; justify-content: space-between; align-items: flex-end}'); //; padding:3px;
GM_addStyle('div.imgAndObjectRow {display:flex; flex-direction:row; justify-content:flex-start; align-items:center}'); //; padding:3px;//class="internalOptionsRow" style="justify-content:flex-start; align-items:center"
GM_addStyle('div.labelAndButton {padding:3px; display:flex;flex-direction:column}');
GM_addStyle('div.HHMenuItemBox {padding:0.2em}');
GM_addStyle('div.HHMenuRow {display:flex; flex-direction:row; align-items:center; align-content:center; justify-content:flex-start}');
GM_addStyle('input.maxMoneyInputField  {text-align:right; width:70px}');
GM_addStyle('.myButton {box-shadow: 0px 0px 0px 2px #9fb4f2; background:linear-gradient(to bottom, #7892c2 5%, #476e9e 100%); background-color:#7892c2; border-radius:10px; border:1px solid #4e6096; display:inline-block; cursor:pointer; color:#ffffff; font-family:Arial; font-size:8px; padding:3px 7px; text-decoration:none; text-shadow:0px 1px 0px #283966;}'
            +'.myButton:hover { background:linear-gradient(to bottom, #476e9e 5%, #7892c2 100%); background-color:#476e9e; }'
            +'.myButton:active { position:relative; top:1px;}');
GM_addStyle('.HHEventPriority {position: absolute;z-index: 500;background-color: black}');
GM_addStyle('.HHPopIDs {background-color: black;z-index: 500;position: absolute;margin-top: 25px}');
GM_addStyle('.tooltipHH:hover { cursor: help; position: relative; }'
            +'.tooltipHH span.tooltipHHtext { display: none }');
GM_addStyle('#popup_message_league { border: #666 2px dotted; padding: 5px 20px 5px 5px; display: block; z-index: 1000; background: #e3e3e3; left: 0px; margin: 15px; width: 500px; position: absolute; top: 15px; color: black}');
GM_addStyle('#sliding-popups#sliding-popups { z-index : 1}');
//END CSS Region

function replaceCheatClick()
{
    is_cheat_click=function(e) {
        return false;
    };
}

const thousandsSeparator = nThousand(11111).replace(/1+/g, '');

function nThousand(x) {
    if (typeof x != 'number') {
        x = 0;
    }
    return x.toLocaleString();
}

function addEventsOnMenuItems()
{
    for (let i of Object.keys(HHStoredVars))
    {
        //console.log(i);
        if (HHStoredVars[i].HHType !== undefined )
        {
            let menuID = HHStoredVars[i].customMenuID !== undefined?HHStoredVars[i].customMenuID:i.replace("HHAuto_"+HHStoredVars[i].HHType+"_","");
            if ( HHStoredVars[i].valueType === "Long Integer")
            {
                document.getElementById(menuID).addEventListener("keyup",add1000sSeparator1);
            }
            if (HHStoredVars[i].events !== undefined )
            {
                for (let event of Object.keys(HHStoredVars[i].events))
                {
                    document.getElementById(menuID).addEventListener(event,HHStoredVars[i].events[event]);
                }
            }
            if (HHStoredVars[i].kobanUsing !== undefined && HHStoredVars[i].kobanUsing)
            {
                document.getElementById(menuID).addEventListener("change",preventKobanUsingSwitchUnauthorized);
            }
            if (HHStoredVars[i].menuType !== undefined && HHStoredVars[i].menuType === "checked")
            {
                document.getElementById(menuID).addEventListener("change",function ()
                                                                 {
                    if (HHStoredVars[i].newValueFunction !== undefined)
                    {
                        HHStoredVars[i].newValueFunction.apply();
                    }
                    setStoredValue(i,this.checked)
                });
            }
        }
    }
}

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

function getStorage()
{
    return getStoredValue("HHAuto_Setting_settPerTab") === "true"?sessionStorage:localStorage;
}

function getStoredValue(inVarName)
{
    return HHStoredVars.hasOwnProperty(inVarName)?getStorageItem(HHStoredVars[inVarName].storage)[inVarName]:undefined;
}

function deleteStoredValue(inVarName)
{
    if (HHStoredVars.hasOwnProperty(inVarName))
    {
        getStorageItem(HHStoredVars[inVarName].storage).removeItem(inVarName);
    }
}

function setStoredValue(inVarName, inValue)
{
    if (HHStoredVars.hasOwnProperty(inVarName))
    {
        getStorageItem(HHStoredVars[inVarName].storage)[inVarName] = inValue;
    }
}

function getCallerFunction()
{
    return getCallerFunction.caller.name
}

function getCallerCallerFunction()
{
    return getCallerCallerFunction.caller.caller.name
}
function getDSTOffset()
{
    function stdTimezoneOffset()
    {
        var jan = new Date(2020,0, 1);
        var jul = new Date(2020,6, 1);
        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    }

    var today = new Date();

    function isDstObserved(today)
    {
        return today.getTimezoneOffset() < stdTimezoneOffset();
    }

    if (isDstObserved(today))
    {
        return -120; // Summer time
    }
    else
    {
        return -60; // Winter time
    }
}
function getServerTS()
{
    let sec_num = parseInt(getHHVars('server_now_ts'), 10);
    const DST = new Date().getTimezoneOffset();
    sec_num -= getDSTOffset() * 60;
    let days = Math.floor(sec_num / 86400);
    let hours = Math.floor(sec_num / 3600) % 24;
    let minutes = Math.floor(sec_num / 60) % 60;
    let seconds = sec_num % 60;
    return {days:days,hours:hours,minutes:minutes,seconds:seconds};
}

function getSecondsLeftBeforeEndOfHHDay()
{
    let HHEndOfDay = {days:0,hours:13,minutes:0,seconds:0};
    let server_TS = getServerTS();
    HHEndOfDay.days = server_TS.hours<HHEndOfDay.hours?server_TS.days:server_TS.days+1;
    return (HHEndOfDay.days - server_TS.days)*86400 + (HHEndOfDay.hours - server_TS.hours)*3600 + (HHEndOfDay.minutes - server_TS.minutes)*60 + (HHEndOfDay.days - server_TS.days);
}

function getSecondsLeftBeforeNewCompetition()
{
    let HHEndOfDay = {days:0,hours:13,minutes:30,seconds:0};
    let server_TS = getServerTS();
    HHEndOfDay.days = server_TS.hours<HHEndOfDay.hours?server_TS.days:server_TS.days+1;
    return (HHEndOfDay.days - server_TS.days)*86400 + (HHEndOfDay.hours - server_TS.hours)*3600 + (HHEndOfDay.minutes - server_TS.minutes)*60 + (HHEndOfDay.days - server_TS.days);
}

function canCollectCompetitionActive(){
    return getSecondsLeftBeforeNewCompetition() > 35*60 && getSecondsLeftBeforeNewCompetition() < (24*3600-5*60);
}

function debugDate(sec_num){
    let days = Math.floor(sec_num / 86400);
    let hours = Math.floor(sec_num / 3600) % 24;
    let minutes = Math.floor(sec_num / 60) % 60;
    let seconds = sec_num % 60;
    return JSON.stringify({days:days,hours:hours,minutes:minutes,seconds:seconds});
}

function getLimitTimeBeforeEnd(){
    return Number(getStoredValue("HHAuto_Setting_collectAllTimer"));
}

function getCurLocale(){
    let uiLang = $('body[page][id]').attr('class').match(/lang-.*\b/)[0].split('-')[1];
    if (uiLang === undefined || uiLang === null || uiLang.length == 0) {
        logHHAuto('UI language not found or missing: ' + uiLang);
    } else return uiLang;
}

function convertTimeToInt(remainingTimer){
    let splittedTime = remainingTimer.split(' ');
    let newTimer = 0;
    let curLocale = getCurLocale();
    for (let i = 0; i < splittedTime.length; i++) {
        switch (splittedTime[i].match(/[^0-9]+/)[0]) {
            case uiLanguage[curLocale].hours:
                newTimer += parseInt(splittedTime[i])*3600;
                break;
            case uiLanguage[curLocale].minutes:
                newTimer += parseInt(splittedTime[i])*60;
                break;
            case uiLanguage[curLocale].seconds:
                newTimer += parseInt(splittedTime[i]);
                break;
        }
    }
    return newTimer;
}

function logHHAuto(...args)
{
    let currDate = new Date();
    var prefix = currDate.toLocaleString()+"."+currDate.getMilliseconds()+":"+getCallerCallerFunction();
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
    currentLoggingText = getStoredValue("HHAuto_Temp_Logging")!==undefined?getStoredValue("HHAuto_Temp_Logging"):"reset";
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

    setStoredValue("HHAuto_Temp_Logging", JSON.stringify(currentLoggingText));

}

function getHero()
{
    if(unsafeWindow.Hero === undefined)
    {
        setTimeout(autoLoop, Number(getStoredValue("HHAuto_Temp_autoLoopTimeMili")))
        //logHHAuto(window.wrappedJSObject)
    }
    //logHHAuto(unsafeWindow.Hero);
    return unsafeWindow.Hero;
}

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
                logHHAuto("HH var not found : "+infoSearched+" ("+splittedInfoSearched[i]+" not defined).");
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
            logHHAuto("HH var not found : "+infoSearched+" ("+splittedInfoSearched[i]+" not defined).");
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

function getGirlsMap()
{
    return unsafeWindow.GirlSalaryManager.girlsMap;
}

function getPage(checkUnknown = false)
{
    var ob = document.getElementById(getHHScriptVars("gameID"));
    if(ob===undefined || ob === null)
    {
        logHHAuto("Unable to find page attribute, stopping script");
        setStoredValue("HHAuto_Setting_master", "false");
        setStoredValue("HHAuto_Temp_autoLoop", "false");
        logHHAuto("setting autoloop to false");
        throw new Error("Unable to find page attribute, stopping script.");
        return "";
    }
    //var p=ob.className.match(/.*page-(.*) .*/i)[1];
    let activitiesMainPage = getHHScriptVars("pagesIDActivities");
    var p=ob.getAttribute('page');
    let page = p;
    if (p==activitiesMainPage)
    {
        if ($('h4.contests.selected').length>0 || $("#activities-tabs > div.switch-tab.underline-tab.tab-switcher-fade-in[data-tab='contests']").length>0)
        {
            page = getHHScriptVars("pagesIDContests");
        }
        if ($('h4.missions.selected').length>0 || $("#activities-tabs > div.switch-tab.underline-tab.tab-switcher-fade-in[data-tab='missions']").length>0)
        {
            page = getHHScriptVars("pagesIDMissions");
        }
        if ($('h4.daily_goals.selected').length>0 || $("#activities-tabs > div.switch-tab.underline-tab.tab-switcher-fade-in[data-tab='daily_goals']").length>0)
        {
            page = getHHScriptVars("pagesIDDailyGoals");
        }
        if ($('h4.pop.selected').length>0 || $("#activities-tabs > div.switch-tab.underline-tab.tab-switcher-fade-in[data-tab='pop']").length>0)
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
                t=$(".pop_thumb_selected").attr("pop_id");
                checkUnknown = false;
                if (t === undefined)
                {
                    var index = queryStringGetParam(window.location.search,'index');
                    if (index !== null)
                    {
                        addPopToUnableToStart(index,"Unable to go to Pop "+index+" as it is locked.");
                        removePopFromPopToStart(index);
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
            let unknownPageList = isJSON(getStoredValue("HHAuto_Temp_unkownPagesList"))?JSON.parse(getStoredValue("HHAuto_Temp_unkownPagesList")):{};
            logHHAuto("Page unkown for script : "+page+" / "+window.location.pathname);
            unknownPageList[page] = window.location.pathname;
            //console.log(unknownPageList);
            setStoredValue("HHAuto_Temp_unkownPagesList", JSON.stringify(unknownPageList));
        }
    }
    return page;
}

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

// Returns true if on correct page.
function gotoPage(page,inArgs,delay = -1)
{
    var cp=getPage();
    logHHAuto('going '+cp+'->'+page);

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
            let mainQuest = getStoredValue("HHAuto_Setting_autoQuest") === "true";
            let sideQuest = getHHScriptVars("isEnabledSideQuest",false) && getStoredValue("HHAuto_Setting_autoSideQuest") === "true";
            togoto = getHHVars('Hero.infos.questing.current_url');
            if ((mainQuest && sideQuest && togoto.includes("world")) || (!mainQuest && sideQuest))
            {
                togoto = '/side-quests.html';
            }
            else if (togoto.includes("world"))
            {
                logHHAuto("All quests finished, turning off AutoQuest!");
                setStoredValue("HHAuto_Setting_autoQuest", false);
                //setStoredValue("HHAuto_Setting_autoSideQuest", false);
                location.reload();
                return false;
            }
            logHHAuto("Current quest page: "+togoto);
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
        case (page.match(/^\/quest\/\d+$/) || {}).input:
            togoto = page;
            break;
        case (page.match(/^\/boss-bang-battle.html\?number_of_battles=\d&bb_team_index=[01234]$/) || {}).input:
            togoto = page;
            break;
        default:
            logHHAuto("Unknown goto page request. No page \'"+page+"\' defined.");
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

        setStoredValue("HHAuto_Temp_autoLoop", "false");
        logHHAuto("setting autoloop to false");
        logHHAuto('GotoPage : '+togoto+' in '+delay+'ms.');
        setTimeout(function () {window.location = window.location.origin + togoto;},delay);
    }
    else
    {
        logHHAuto("Couldn't find page path. Page was undefined...");
        setTimeout(function () {location.reload();},delay);
    }
}

function setLastPageCalled(inPage)
{
    //console.log("testingHome : setting to : "+JSON.stringify({page:inPage, dateTime:new Date().getTime()}));
    setStoredValue("HHAuto_Temp_LastPageCalled", JSON.stringify({page:inPage, dateTime:new Date().getTime()}));
}

function parsePrice(princeStr){
    // Parse price to number 105K to 105000, 6.38M to 6380000
    let ret = Number.NaN;
    if(princeStr && princeStr.indexOf('B')>0) {
        ret = Number(princeStr.replace(/B/g, '')) * 1000000000;
    } else if(princeStr && princeStr.indexOf('M')>0) {
        ret = Number(princeStr.replace(/M/g, '')) * 1000000;
    } else if(princeStr && princeStr.indexOf('K')>0) {
        ret = Number(princeStr.replace(/K/g, '')) * 1000;
    } else {
        ret = remove1000sSeparator(princeStr);
    }
    return ret;
}

var proceedQuest = function () {
    //logHHAuto("Starting auto quest.");
    // Check if at correct page.
    let page = getPage();
    let mainQuestUrl = getHHVars('Hero.infos.questing.current_url');
    let doMainQuest = getStoredValue("HHAuto_Setting_autoQuest") === "true" && !mainQuestUrl.includes("world");
    if (!doMainQuest && page === 'side-quests' && getHHScriptVars("isEnabledSideQuest",false) && getStoredValue("HHAuto_Setting_autoSideQuest") === "true") {
        var quests = $('.side-quest:has(.slot) .side-quest-button');
        if (quests.length > 0) {
            logHHAuto("Navigating to side quest.");
            gotoPage(quests.attr('href'));
        }
        else {
            logHHAuto("All quests finished, turning off AutoQuest!");
            setStoredValue("HHAuto_Setting_autoQuest", false);
            setStoredValue("HHAuto_Setting_autoSideQuest", false);
            location.reload();
        }
        return;
    }
    if (page !== getHHScriptVars("pagesIDQuest") || (doMainQuest && mainQuestUrl != window.location.pathname)) {
        // Click on current quest to naviagte to it.
        logHHAuto("Navigating to current quest.");
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
        logHHAuto("Could not find resume button.");
        return;
    }
    else if (proceedType === "free") {
        logHHAuto("Proceeding for free.");
        //setStoredValue"HHAuto_Temp_autoLoop", "false");
        //logHHAuto("setting autoloop to false");
        //proceedButtonMatch.click();
    }
    else if (proceedType === "pay") {
        var proceedButtonCost = $("#controls button:not([style*='display:none']):not([style*='display: none']) .action-cost .price");
        var proceedCost = parsePrice(proceedButtonCost[0].innerText);
        var payTypeNRJ = $("#controls button:not([style*='display:none']):not([style*='display: none']) .action-cost .energy_quest_icn").length>0;
        var energyCurrent = getHHVars('Hero.energies.quest.amount');
        var moneyCurrent = getHHVars('Hero.currencies.soft_currency');
        let payType = $("#controls .cost span[cur]:not([style*='display:none']):not([style*='display: none'])").attr('cur');
        //console.log("DebugQuest payType : "+payType);
        if (payTypeNRJ)
        {
            console.log("DebugQuest ENERGY for : "+proceedCost);
            if(proceedCost <= energyCurrent)
            {
                // We have energy.
                logHHAuto("Spending "+proceedCost+" Energy to proceed.");
            }
            else
            {
                logHHAuto("Quest requires "+proceedCost+" Energy to proceed.");
                setStoredValue("HHAuto_Temp_questRequirement", "*"+proceedCost);
                return;
            }
        }
        else
        {
            console.log("DebugQuest MONEY for : "+proceedCost);
            if(proceedCost <= moneyCurrent)
            {
                // We have money.
                logHHAuto("Spending "+proceedCost+" Money to proceed.");
            }
            else
            {
                logHHAuto("Spending "+proceedCost+" Money to proceed.");
                setStoredValue("HHAuto_Temp_questRequirement", "$"+proceedCost);
                return;
            }
        }
        //proceedButtonMatch.click();
        //setStoredValue("HHAuto_Temp_autoLoop", "false");
        //logHHAuto("setting autoloop to false");
    }
    else if (proceedType === "use_item") {
        logHHAuto("Proceeding by using X" + Number($("#controls .item span").text()) + " of the required item.");
        //proceedButtonMatch.click();
        //setStoredValue("HHAuto_Temp_autoLoop", "false");
        //logHHAuto("setting autoloop to false");
    }
    else if (proceedType === "battle") {
        logHHAuto("Quest need battle...");
        setStoredValue("HHAuto_Temp_questRequirement", "battle");
        // Proceed to battle troll.
        //proceedButtonMatch.click();
        //setStoredValue("HHAuto_Temp_autoLoop", "false");
        //logHHAuto("setting autoloop to false");
    }
    else if (proceedType === "end_archive") {
        logHHAuto("Reached end of current archive. Proceeding to next archive.");
        //setStoredValue("HHAuto_Temp_autoLoop", "false");
        //logHHAuto("setting autoloop to false");
        //proceedButtonMatch.click();
    }
    else if (proceedType === "end_play") {
        let rewards = $('#popups[style="display: block;"]>#rewards_popup[style="display: block;"] button.blue_button_L[confirm_blue_button]');
        if (proceedButtonMatch.attr('disabled') && rewards.length>0){
            logHHAuto("Reached end of current archive. Claim reward.");
            rewards.click();
            return;
        }
        logHHAuto("Reached end of current play. Proceeding to next play.");
        //setStoredValue("HHAuto_Temp_autoLoop", "false");
        //logHHAuto("setting autoloop to false");
        //proceedButtonMatch.click();
    }
    else {
        logHHAuto("Could not identify given resume button.");
        setStoredValue("HHAuto_Temp_questRequirement", "unknownQuestButton");
        return;
    }
    setStoredValue("HHAuto_Temp_autoLoop", "false");
    logHHAuto("setting autoloop to false");
    setTimeout(function ()
               {
        proceedButtonMatch.click();
        setStoredValue("HHAuto_Temp_autoLoop", "true");
        logHHAuto("setting autoloop to true");
        setTimeout(autoLoop,randomInterval(500,800));
    },randomInterval(500,800));
    //setTimeout(function () {location.reload();},randomInterval(800,1500));
};

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
function getSuitableMission(missionsList)
{
    var msn = missionsList[0];

    for(var m in missionsList)
    {
        if (JSON.stringify(missionsList[m].rewards).includes("koban") && getStoredValue("HHAuto_Setting_autoMissionKFirst") === "true")
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

// returns boolean to set busy
function doMissionStuff()
{
    if(getPage() !== getHHScriptVars("pagesIDMissions"))
    {
        logHHAuto("Navigating to missions page.");
        gotoPage(getHHScriptVars("pagesIDMissions"));
        // return busy
        return true;
    }
    else
    {
        logHHAuto("On missions page.");
        let canCollect = getStoredValue("HHAuto_Setting_autoMissionCollect") ==="true" && $(".mission_button button:visible[rel='claim']").length >0 && canCollectCompetitionActive();
        if (canCollect)
        {
            logHHAuto("Collecting finished mission's reward.");
            $(".mission_button button:visible[rel='claim']").click();
            gotoPage(getHHScriptVars("pagesIDMissions"),{},1500);
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
                    if ($('.finish_in_bar[style*="display:none"], .finish_in_bar[style*="display: none"]', missionObject).length === 0)
                    {
                        logHHAuto("Unfinished mission detected...("+data.remaining_time+"sec. remaining)");
                        setTimer('nextMissionTime',Number(data.remaining_time)+1);
                        allGood = false;
                        return;
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
                        logHHAuto("Unclaimed mission detected...");
                        gotoPage(getHHScriptVars("pagesIDMissions"),{},1500);
                        return true;
                    }
                }
                return;
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
                            logHHAuto("Catched error : Couldn't parse xp/money data : "+e);
                            logHHAuto(slotDiv);
                        }
                    }
                    // set item details if item
                    else if(reward.type === "item")
                    {
                        try{
                            reward.data = $.data(slotDiv).d;
                        }
                        catch(e){
                            logHHAuto("Catched error : Couldn't parse item reward slot details : "+e);
                            logHHAuto(slotDiv);
                            reward.type = "unknown";
                        }
                    }
                    rewards.push(reward);
                });
            }
            data.rewards = rewards;

            missions.push(data);
        });
        if(!allGood && canCollect)
        {
            logHHAuto("Something went wrong, need to retry in 15secs.");
            setTimer('nextMissionTime',15);
            return true;
        }
        logHHAuto("Missions parsed, mission list is:", missions);
        if(missions.length > 0)
        {
            logHHAuto("Selecting mission from list.");
            var mission = getSuitableMission(missions);
            logHHAuto("Selected mission:-");
            logHHAuto(mission);
            logHHAuto("Selected mission duration: "+mission.duration+"sec.");
            var missionButton = $(mission.missionObject).find("button:visible").first();
            logHHAuto("Mission button of type: "+missionButton.attr("rel"));
            logHHAuto("Clicking mission button.");
            missionButton.click();
            gotoPage(getHHScriptVars("pagesIDMissions"),{},1500);
            setTimer('nextMissionTime',Number(mission.duration)+1);
        }
        else
        {
            logHHAuto("No missions detected...!");
            // get gift
            var ck = getStoredValue("HHAuto_Temp_missionsGiftLeft");
            var isAfterGift = document.querySelector("#missions .after_gift").style.display === 'block';
            if(!isAfterGift){
                if(ck === 'giftleft')
                {
                    logHHAuto("Collecting gift.");
                    deleteStoredValue("HHAuto_Temp_missionsGiftLeft");
                    document.querySelector(".end_gift button").click();
                }
                else{
                    logHHAuto("Refreshing to collect gift...");
                    setStoredValue("HHAuto_Temp_missionsGiftLeft","giftleft");
                    location.reload();
                    // is busy
                    return true;
                }
            }
            let time = $('.after_gift span[rel="expires"]').text();
            if(time === undefined || time === null || time.length === 0) {
                logHHAuto("New mission time was undefined... Setting it manually to 10min.");
                setTimer('nextMissionTime', 10*60);
            }
            setTimer('nextMissionTime',Number(convertTimeToInt(time))+1);
        }
        // not busy
        return false;
    }
}

function moduleDisplayPopID()
{
    if ($('.HHPopIDs').length  > 0) {return}
    $('div.pop_list div[pop_id]').each(function() {
        $(this).prepend('<div class="HHPopIDs">'+$(this).attr('pop_id')+'</div>');
    });
}

function moduleDisplayContestsDeletion()
{
    if($('.HHcontest').length > 0)
    {
        return
    }
    let contests = $('div.contest:not(.is_legendary)');
    let lastContestId = parseInt(contests.last().attr('id_contest'));
    let laterDayToCollect = lastContestId - getHHScriptVars("contestMaxDays");
    contests.each(function()
                  {
        const activeUntil = parseInt($(this).attr('id_contest')) - laterDayToCollect;
        $('.shadow',$(this)).append('<div class="HHcontest">Deleted in '+activeUntil+' days</div>');
    });
}

function moduleOldPathOfAttractionHide()
{
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

function modulePathOfAttractionHide()
{
    if (getPage() === getHHScriptVars("pagesIDEvent") && window.location.search.includes("tab=path_event") && getStoredValue("HHAuto_Setting_PoAMaskRewards") === "true")
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

function getSeasonRemainingTime()
{
    const seasonTimer = unsafeWindow.season_sec_untill_event_end;

    if ( seasonTimer != undefined && (getSecondsLeft("SeasonRemainingTime") === 0 || getStoredValue("HHAuto_Temp_SeasonEndDate") === undefined) )
    {
        setTimer("SeasonRemainingTime",seasonTimer);
        setStoredValue("HHAuto_Temp_SeasonEndDate",Math.ceil(new Date().getTime()/1000)+seasonTimer);
    }
}

function getSeasonalEventRemainingTime()
{
    /*
    const seasonalEventTimerRequest = `#pog_tab_container > div.potions-paths-first-row > div.potions-paths-timer.timer[${getHHScriptVars("PoVPoGTimestampAttributeName")}]`;

    if ( $(seasonalEventTimerRequest).length > 0 && (getSecondsLeft("SeasonalEventRemainingTime") === 0 || getStoredValue("HHAuto_Temp_SeasonalEventEndDate") === undefined) )
    {
        const seasonalEventTimer = Number($(seasonalEventTimerRequest).attr(getHHScriptVars("PoVPoGTimestampAttributeName")));
        setTimer("SeasonalEventRemainingTime",seasonalEventTimer);
        setStoredValue("HHAuto_Temp_SeasonalEventEndDate",Math.ceil(new Date().getTime()/1000)+seasonalEventTimer);
    }
    */
}

function getPoVRemainingTime()
{
    const poVTimerRequest = `#pov_tab_container > div.potions-paths-first-row > div.potions-paths-timer.timer[${getHHScriptVars("PoVPoGTimestampAttributeName")}]`;

    if ( $(poVTimerRequest).length > 0 && (getSecondsLeft("PoVRemainingTime") === 0 || getStoredValue("HHAuto_Temp_PoVEndDate") === undefined) )
    {
        const poVTimer = Number($(poVTimerRequest).attr(getHHScriptVars("PoVPoGTimestampAttributeName")));
        setTimer("PoVRemainingTime",poVTimer);
        setStoredValue("HHAuto_Temp_PoVEndDate",Math.ceil(new Date().getTime()/1000)+poVTimer);
    }
}

function getPoGRemainingTime()
{
    const poGTimerRequest = `#pog_tab_container > div.potions-paths-first-row > div.potions-paths-timer.timer[${getHHScriptVars("PoVPoGTimestampAttributeName")}]`;

    if ( $(poGTimerRequest).length > 0 && (getSecondsLeft("PoGRemainingTime") === 0 || getStoredValue("HHAuto_Temp_PoGEndDate") === undefined) )
    {
        const poGTimer = Number($(poGTimerRequest).attr(getHHScriptVars("PoVPoGTimestampAttributeName")));
        setTimer("PoGRemainingTime",poGTimer);
        setStoredValue("HHAuto_Temp_PoGEndDate",Math.ceil(new Date().getTime()/1000)+poGTimer);
    }
}

function displayGenericRemainingTime(scriptId, aRel, hhtimerId, timerName, timerEndDateName)
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
        if (getStoredValue(timerEndDateName) !== undefined)
        {
            setTimer(timerName,getStoredValue(timerEndDateName)-(Math.ceil(new Date().getTime())/1000));
        }
    }
}

function displaySeasonRemainingTime()
{
    displayGenericRemainingTime("#scriptSeasonTime", "season", "HHAutoSeasonTimer", "SeasonRemainingTime", "HHAuto_Temp_SeasonEndDate");
}

function displaySeasonalEventRemainingTime()
{
    // TODO
    // displayGenericRemainingTime("#scriptSeasonalEventTime", "seasonalEvent", "HHAutoSeasonalEventTimer", "SeasonalEventRemainingTime", "HHAuto_Temp_SeasonalEventEndDate");
}

function displayPoVRemainingTime()
{
    displayGenericRemainingTime("#scriptPovTime", "path-of-valor", "HHAutoPoVTimer", "PoVRemainingTime", "HHAuto_Temp_PoVEndDate");
}

function displayPoGRemainingTime()
{
    displayGenericRemainingTime("#scriptPogTime", "path-of-glory", "HHAutoPoGTimer", "PoGRemainingTime", "HHAuto_Temp_PoGEndDate");
}

function moduleSimChampions()
{
    setStoredValue("HHAuto_Temp_autoLoop", "false");
    logHHAuto("setting autoloop to false");

    var getPoses = function($images){
        var poses=[];
        $images.each(function(idx,pose){
            var imgSrc = $(pose).attr('src');
            var poseNumber = imgSrc.substring(imgSrc.lastIndexOf('/')+1).replace(/\D/g, '');
            poses.push(poseNumber);
        });
        return poses;
    }

    let champTeamButton = '<div style="position: absolute;left: 330px;top: 10px;width:90px;z-index:10" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("ChampTeamButton","tooltip")+'</span><label class="myButton" id="ChampTeamButton">'+getTextForUI("ChampTeamButton","elementText")+'</label></div>';

    $(".champions-top__inner-wrapper").append(champTeamButton);
    var champTeam = unsafeWindow.championData.team;

    var indicateBestTeam = function() {
        const championRequiredPoses = getPoses($(".champions-over__champion-info.champions-animation .champion-pose"));
        const girlBoxes = $(".champions-middle__girl-selection.champions-animation .girl-selection__girl-box");
        var girlsPerPose={};
        var girls=[];
        $(".hhgirlOrder").remove();

        girlBoxes.each(function(girlIndex,girlBox){
            const $girl = $('.girl-box__draggable ', $(girlBox));
            const girlData = champTeam[girlIndex];

            if (girlData.id_girl != $girl.attr('id_girl')) {
                logHHAuto('Invalid girls ' + girlData.id_girl + 'vs' + $girl.attr('id_girl'));
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
                let color = i >= 5 ? 'white' : 'gold';
                girlsPerPose[expectedPose][0].htmlDom.append('<span class="hhgirlOrder" title="'+getTextForUI("ChampGirlOrder","tooltip")+' '+(i+1)+'" style="position: absolute;top: 41px;left: 3px;z-index: 10;color:'+color+';">'+(i+1)+'</span>');
                girlsPerPose[expectedPose].shift();
            }
            girls[i].htmlDom.append('<span class="hhgirlOrder" title="'+getTextForUI("ChampGirlLowOrder","tooltip")+' '+(i+1)+'" style="position: absolute;top: 41px;left: 47px;z-index: 10;color:silver;">'+(i+1)+'</span>');
        }
    };

    var checkAjaxCompleteOnChampionPage = function(event,request,settings){ 
        let match = settings.data.match(/action=champion_team_draft/);
        if (match === null) return;
        champTeam = request.responseJSON.teamArray;

        setTimeout(indicateBestTeam, 1000);
    };

    $(document).on('ajaxComplete',checkAjaxCompleteOnChampionPage);
    
    document.getElementById("ChampTeamButton").addEventListener("click", indicateBestTeam);
    GM_registerMenuCommand(getTextForUI("ChampTeamButton","elementText"), indicateBestTeam);
    setTimeout(indicateBestTeam, 1000);
}

function moduleSimPoVMaskReward()
{
    var arrayz;
    var nbReward;
    let modified = false;
    arrayz = $('.potions-paths-tier:not([style*="display:none"]):not([style*="display: none"])');
    //doesn sure about  " .purchase-pov-pass"-button visibility
    if ($('#pov_tab_container .potions-paths-second-row .purchase-pass:not([style*="display:none"]):not([style*="display: none"])').length)
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
        let divToModify = $('.pov-progress-bar-section');
        if (divToModify.length > 0)
        {
            $('.pov-progress-bar-section')[0].scrollTop = '0';
        }
    }
}

function moduleSimPoGMaskReward()
{
    var arrayz;
    var nbReward;
    let modified = false;
    arrayz = $('.potions-paths-tier:not([style*="display:none"]):not([style*="display: none"])');
    //doesn sure about  " .purchase-pov-pass"-button visibility
    if ($('#pog_tab_container .potions-paths-second-row .purchase-pass:not([style*="display:none"]):not([style*="display: none"])').length)
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
        let divToModify = $('.pov-progress-bar-section');
        if (divToModify.length > 0)
        {
            $('.pov-progress-bar-section')[0].scrollTop = '0';
        }
    }
}

function moduleSimSeasonalMaskReward()
{
    var arrayz;
    let modified = false;
    arrayz = $('.seasonal-progress-bar-tiers .seasonal-tier-container:not([style*="display:none"]):not([style*="display: none"])');
    var obj;
    if (arrayz.length > 0)
    {
        for (var i2 = arrayz.length - 1; i2 >= 0; i2--)
        {
            obj = $(arrayz[i2]).find('.claimed-slot:not([style*="display:none"]):not([style*="display: none"])');
            if (obj.length >= 1)
            {
                arrayz[i2].style.display = "none";
                modified = true;
            }
        }
    }

    if (modified)
    {
        let divToModify = $('.seasonal-progress-bar-section');
        if (divToModify.length > 0)
        {
            divToModify.getNiceScroll().resize();

            const width_px = 152.1;
            const start_px = 101;
            const rewards_unclaimed = $('.seasonal-tier.unclaimed').length;
            const scroll_width_hidden = parseInt(start_px + (rewards_unclaimed - 1) * width_px, 10);
            $('.seasonal-progress-bar-current').css('width', scroll_width_hidden + 'px');
            
            try {
                divToModify.getNiceScroll(0).doScrollLeft(0, 200);
            } catch(err) {}
        }
    }
}

function modulePachinko()
{
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

    function buildPachinkoSelectPopUp()
    {
        let PachinkoMenu =   '<div style="padding:50px; display:flex;flex-direction:column">'
        +    '<div style="display:flex;flex-direction:row">'
        +     '<div style="padding:10px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("PachinkoSelector","tooltip")+'</span><select id="PachinkoSelector"></select></div>'
        +     '<div style="padding:10px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("PachinkoLeft","tooltip")+'</span><span id="PachinkoLeft"></span></div>'
        +    '</div>'
        +    '<div style="display:flex;flex-direction:row;align-items:center;">'
        +     '<div style="padding:10px"class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("Launch","tooltip")+'</span><label class="myButton" id="PachinkoPlayX">'+getTextForUI("Launch","elementText")+'</label></div>'
        +     '<div style="padding:10px;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("PachinkoXTimes","tooltip")+'</span><input id="PachinkoXTimes" style="width:50px;height:20px" required pattern="'+HHAuto_inputPattern.menuExpLevel+'" type="text" value="1"></div>'
        +     '<div>'
        +      '<div style="display:flex;flex-direction:row;align-items: center;padding-bottom:8px">'
        +       '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("PachinkoFillOrbs","tooltip")+'</span><input id="PachinkoFillOrbs" name="PachinkoFillOrbs" type="checkbox"></div>'
        +       '<div><label for="PachinkoFillOrbs">'+getTextForUI("PachinkoFillOrbs","elementText")+'</label></div>'
        +      '</div>'
        +      '<div style="display:flex;flex-direction:row;align-items: center;">'
        +       '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("PachinkoByPassNoGirls","tooltip")+'</span><input id="PachinkoByPassNoGirls" name="PachinkoByPassNoGirls" type="checkbox"></div>'
        +       '<div><label for="PachinkoByPassNoGirls">'+getTextForUI("PachinkoByPassNoGirls","elementText")+'</label></div>'
        +      '</div>'
        +     '</div>'
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
        let timerSelector = document.getElementById("PachinkoSelector");
        let ByPassNoGirlChecked = document.getElementById("PachinkoByPassNoGirls").checked;
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
            logHHAuto('No Orbs left for : '+timerSelector.options[timerSelector.selectedIndex].text);
            document.getElementById("PachinkoError").innerText=getTextForUI("PachinkoSelectorNoButtons","elementText");
            return;
        }

        if ( Number.isNaN(Number(orbsToGo)) || orbsToGo < 1 || orbsToGo > orbsLeft)
        {
            logHHAuto('Invalid orbs number '+orbsToGo);
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
            logHHAuto("Cancel clicked, closing popUp.");

        });
        function playXPachinko_func()
        {
            if(!isDisplayedHHPopUp())
            {
                logHHAuto("PopUp closed, cancelling interval.");
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
                    logHHAuto("No more girl on Pachinko, cancelling.");
                    maskHHPopUp();
                    buildPachinkoSelectPopUp();
                    document.getElementById("PachinkoError").innerText=getTextForUI("PachinkoNoGirls","elementText");
                }
            }
            let pachinkoSelectedButton= $(buttonSelector);
            let rewardQuery="div#rewards_popup button.blue_button_L";
            if ($(rewardQuery).length >0 )
            {
                $(rewardQuery).click();
            }
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
                logHHAuto("All spent, going back to Selector.");
                maskHHPopUp();
                buildPachinkoSelectPopUp();
                return;
            }
            setTimeout(playXPachinko_func,randomInterval(500,1500));
        }
        setTimeout(playXPachinko_func,randomInterval(500,1500));
    }

}

function moduleSimSeasonMaskReward()
{
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
    //console.log("scroll before : "+document.getElementById('rewards_cont_scroll').scrollLeft);


    if (arrayz.length > 0) {
        for (var i2 = arrayz.length - 1; i2 >= 0; i2--) {
            obj = $(arrayz[i2]).find('.tick_s:not([style*="display:none"]):not([style*="display: none"])');
            if (obj.length >= nbReward) {
                //console.log("width : "+arrayz[i2].offsetWidth);
                //document.getElementById('rewards_cont_scroll').scrollLeft-=arrayz[i2].offsetWidth;
                arrayz[i2].style.display = "none";
                modified = true;
            }
        }
    }
    if (modified)
    {
        let divToModify = $('#seasons_row1');
        if (divToModify.length > 0)
        {
            divToModify[0].style.transform ="translate3d(0px, 0px, 0px)";
        }
        divToModify = $('#ascrail2000-hr .nicescroll-cursors');
        if (divToModify.length > 0)
        {
            divToModify[0].style.left = '0px';
        }
    }
    //console.log("scroll after : "+document.getElementById('rewards_cont_scroll').scrollLeft);
}

function moduleChangeTeam()
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
            let obj = JSON.parse($(arr[i]).attr(getHHScriptVars('girlToolTipData')));
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

function getCurrentSorting()
{
    return localStorage.sort_by;
}

function getGirlMapSorted(inSortType = "DateAcquired",inSortReversed = true )
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
                logHHAuto("Unknown sorting function, returning Girls Map sorted by date acquired.");
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

function moduleHaremNextUpgradableGirl()
{
    const menuID = "haremNextUpgradableGirl";
    let menuHidden = `<div style="visibility:hidden" id="${menuID}"></div>`;
    if (document.getElementById(menuID) === null)
    {
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
        //+      '<div><input id="HaremSortMenuSortNumber" type="number" name="quantity" min="1" max="20" step="1" value="10"></div>'
        +     '</div>'
        +     '<div style="padding:10px"><label class="myButton" id="HaremSortMenuLaunch">'+getTextForUI("Launch","elementText")+'</label></div>'
        +    '</div>'
        +  '</div>'
        fillHHPopUp("HaremSortMenu",getTextForUI(menuID,"elementText"), HaremSortMenu);

        document.getElementById("HaremSortMenuLaunch").addEventListener("click", selectNextUpgradableGirl);
        let selectorOptions = document.getElementById("HaremSortMenuSortSelector");

        const storedDefaultSort = (getStoredValue("HHAuto_Temp_defaultCustomHaremSort") !== undefined && isJSON(getStoredValue("HHAuto_Temp_defaultCustomHaremSort")))?JSON.parse(getStoredValue("HHAuto_Temp_defaultCustomHaremSort")):{sortFunction : "null", reverse:false};

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
    function selectNextUpgradableGirl()
    {
        const selectedSortFunction = document.getElementById("HaremSortMenuSortSelector").options[document.getElementById("HaremSortMenuSortSelector").selectedIndex].value;
        const isReverseChecked = document.getElementById("HaremSortMenuSortReverse").checked;
        setStoredValue("HHAuto_Temp_defaultCustomHaremSort",JSON.stringify({sortFunction:selectedSortFunction, reverse:isReverseChecked}));
        const girlsMap = getGirlMapSorted(selectedSortFunction,isReverseChecked);
        if (girlsMap === null )
            return;
        const currentSelectedGirlIndex = girlsMap.findIndex((element) => element.gId === $('#harem_left .girls_list div.opened[girl]').attr('girl'))+1;
        const upgradableGirls = girlsMap.slice(currentSelectedGirlIndex).filter(filterGirlMapCanUpgrade)
        if (upgradableGirls.length > 0)
        {
            gotoPage(`/harem/${upgradableGirls[0].gId}`);
            logHHAuto("Going to : "+upgradableGirls[0].gData.name);
        }
        else
        {
            logHHAuto("No upgradble girls.");
        }
    }
}

function haremOpenFirstXUpgradable()
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
        const storedDefaultSort = (getStoredValue("HHAuto_Temp_defaultCustomHaremSort") !== undefined && isJSON(getStoredValue("HHAuto_Temp_defaultCustomHaremSort")))?JSON.parse(getStoredValue("HHAuto_Temp_defaultCustomHaremSort")):{sortFunction : "null", reverse:false};

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
        setStoredValue("HHAuto_Temp_defaultCustomHaremSort",JSON.stringify({sortFunction:selectedSortFunction, reverse:isReverseChecked}));
        const girlsMap = getGirlMapSorted(selectedSortFunction,isReverseChecked);
        if (girlsMap === null )
            return;
        openedGirlz = 0;
        maxOpenedGirlz = Number(document.getElementById("HaremSortMenuSortNumber").value);
        upgradableGirlz = girlsMap.filter(filterGirlMapCanUpgrade);
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
                logHHAuto("Unable to find girl_quest array.");
            }
        }
    }

}

function moduleHaremExportGirlsData()
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
        dataToSave = "Name,Rarity,Class,Figure,Level,Stars,Of,Left,Hardcore,Charm,Know-how,Total,Position,Eyes,Hair,Zodiac,Own\r\n";
        var gMap = getHHVars('GirlSalaryManager.girlsMap');
        if(gMap === null)
        {
            // error
            logHHAuto("Girls Map was undefined...! Error, cannot export girls.");
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
                logHHAuto("Catched error : Girls Map had undefined property...! Error, cannot export girls : "+exp);
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

function collectAndUpdatePowerPlaces()
{
    if(getPage() !== getHHScriptVars("pagesIDPowerplacemain")
      )
    {
        logHHAuto("Navigating to powerplaces main page.");
        gotoPage(getHHScriptVars("pagesIDPowerplacemain"));
        // return busy
        return true;
    }
    else
    {
        logHHAuto("On powerplaces main page.");
        setStoredValue("HHAuto_Temp_Totalpops", $("div.pop_list div[pop_id]").length); //Count how many different POPs there are and store them locally
        logHHAuto("totalpops : "+getStoredValue("HHAuto_Temp_Totalpops"));
        var newFilter="";
        if (getStoredValue("HHAuto_Setting_autoPowerPlacesInverted") === "true")
        {
            // starting from last one.
            $("div.pop_list div[pop_id]").each(function(){newFilter=';'+$(this).attr('pop_id')+newFilter;});
        }
        else
        {
            $("div.pop_list div[pop_id]").each(function(){newFilter=newFilter+';'+$(this).attr('pop_id');});
        }
        if (getStoredValue("HHAuto_Setting_autoPowerPlacesAll") === "true")
        {
            setStoredValue("HHAuto_Setting_autoPowerPlacesIndexFilter", newFilter.substring(1));
        }
        setStoredValue("HHAuto_Temp_currentlyAvailablePops",newFilter.substring(1))
        //collect all
        let rewardQuery="div#rewards_popup button.blue_button_L";
        let buttonClaimQuery = "button[rel='pop_thumb_claim'].purple_button_L:not([style])";
        if ($(buttonClaimQuery).length >0)
        {
            $(buttonClaimQuery)[0].click();
            logHHAuto("Claimed reward for PoP : "+$(buttonClaimQuery)[0].parentElement.getAttribute('pop_id'));
            gotoPage(getHHScriptVars("pagesIDPowerplacemain"));
            return true;
        }



        var filteredPops = getStoredValue("HHAuto_Setting_autoPowerPlacesIndexFilter")?getStoredValue("HHAuto_Setting_autoPowerPlacesIndexFilter").split(";"):[];
        var popUnableToStart = getStoredValue("HHAuto_Temp_PopUnableToStart")?getStoredValue("HHAuto_Temp_PopUnableToStart").split(";"):[];
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


        clearTimer('minPowerPlacesTime');
        clearTimer('maxPowerPlacesTime');
  
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
                //force check of PowerPlaces every 7 hours
                setTimer('minPowerPlacesTime',Number(20*60)+1);
            }
            else if (getStoredValue("HHAuto_Setting_autoPowerPlacesAll") === "true")
            {
                setTimer('minPowerPlacesTime',Number(maxTime)+1);
            }
            else 
            {
                setTimer('minPowerPlacesTime',Number(minTime)+1);
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
            if (filteredPops.includes(pop_id) && ! popUnableToStart.includes(pop_id))
            {
                PopToStart.push(Number(pop_id));
                clearTimer('minPowerPlacesTime');
            }
        });
        if (PopToStart.length === 0)
        {
            sessionStorage.removeItem('HHAuto_Temp_PopUnableToStart');
        }
        logHHAuto("build popToStart : "+PopToStart);
        setStoredValue("HHAuto_Temp_PopToStart", JSON.stringify(PopToStart));
        return false;
    }
}


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

function cleanTempPopToStart()
{
    sessionStorage.removeItem('HHAuto_Temp_PopUnableToStart');
    sessionStorage.removeItem('HHAuto_Temp_popToStart');
}

function removePopFromPopToStart(index)
{
    var epop;
    var popToSart;
    var newPopToStart;
    popToSart= getStoredValue("HHAuto_Temp_PopToStart")?JSON.parse(getStoredValue("HHAuto_Temp_PopToStart")):[];
    newPopToStart=[];
    for (epop of popToSart)
    {
        if (epop != index)
        {
            newPopToStart.push(epop);
        }
    }
    setStoredValue("HHAuto_Temp_PopToStart", JSON.stringify(newPopToStart));
}

function addPopToUnableToStart(popIndex,message)
{
    var popUnableToStart=getStoredValue("HHAuto_Temp_PopUnableToStart")?getStoredValue("HHAuto_Temp_PopUnableToStart"):"";
    logHHAuto(message);
    if (popUnableToStart === "")
    {
        setStoredValue("HHAuto_Temp_PopUnableToStart", String(popIndex));
    }
    else
    {
        setStoredValue("HHAuto_Temp_PopUnableToStart", popUnableToStart+";"+String(popIndex));
    }
}

// returns boolean to set busy
function doPowerPlacesStuff(index)
{
    if(getPage() !== "powerplace"+index)
    {
        logHHAuto("Navigating to powerplace"+index+" page.");
        gotoPage(getHHScriptVars("pagesIDActivities"),{tab:"pop",index:index});
        // return busy
        return true;
    }
    else
    {
        logHHAuto("On powerplace"+index+" page.");

        //getting reward in case failed on main page
        var querySelectorText = "button[rel='pop_claim']:not([style*='display:none']):not([style*='display: none'])";
        if ($(querySelectorText).length>0)
        {
            $(querySelectorText).click();
            logHHAuto("Claimed powerplace"+index);
            if (getStoredValue("HHAuto_Setting_autoPowerPlacesAll") !== "true")
            {
                cleanTempPopToStart();
                gotoPage(getHHScriptVars("pagesIDPowerplacemain"));
                return;
            }
        }

        if ($("div.pop_right_part div.no_girls_message").length >0)
        {
            addPopToUnableToStart(index,"Unable to start Pop "+index+" no girls available.");
            removePopFromPopToStart(index);
            return false;
        }


        if (getStoredValue("HHAuto_Setting_autoPowerPlacesPrecision") === "true") {
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
                    const debugEnabled = Boolean(getStoredValue("HHAuto_Temp_Debug")!==undefined?(getStoredValue("HHAuto_Temp_Debug")===true?true:false):false);
                    let startTime = 0;
                    if (debugEnabled) {
                        logHHAuto("PoP debug is enabled");
                        startTime = performance.now();
                    }

                    let girlOptions = [];

                    for (let i = girlsList.length - 1; i >= 0; i--) {
                        const loopGirls = girlsList.slice(0, i + 1);
                        const loopPower = powerText;
                        const loopOptions = girlPower(loopPower, loopGirls, []);
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
                        const thisScore = Math.min(1, ((thisPower/powerText) * ((1 / Math.sqrt(theseGirls.length))+0.28)));
                        if (thisScore > teamScore) {
                            teamScore = thisScore;
                            chosenTeam = theseGirls;
                        };
                    });

                    if (debugEnabled) {
                        const endTime = performance.now();
                        logHHAuto("PoP precision: calculating this team took "+ (endTime-startTime) +"ms");
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
                    logHHAuto("PoP remainText: " + remainText);
                    const hasRemainDays = remainText.includes("d");
                    // If for some reason we cannot parse the text, set time too high to start
                    // This may cause undesirable loops but for now is considered better than having girls stuck in PoP for days
                    const remainHours = remainText.indexOf("h")?parseInt(remainText.substring(remainText.indexOf("h")-2, remainText.indexOf("h"))):9;
                    const remainMins = remainText.indexOf("m")?parseInt(remainText.substring(remainText.indexOf("m")-2, remainText.indexOf("m"))):59;

                    // If we weren't able to get under 7.5 hours, skip
                    if ((hasRemainDays) || (remainHours > 7) || ((remainHours == 7) && (remainMins > 30))) {
                        addPopToUnableToStart(index,"Unable to start Pop "+index+" too much time remaining.");
                        removePopFromPopToStart(index);
                        return false;
                    } else {
                        querySelectorText = "button.blue_button_L[rel='pop_action']:not([disabled])"
                        if ($(querySelectorText).length>0)
                        {
                            document.querySelector(querySelectorText).click();
                            logHHAuto("Started powerplace"+index);
                        };
                    };
                };
            };
        } else {
            if ($("div.grid_view div.not_selected").length === 1)
            {
                $("div.grid_view div.not_selected").click();
                logHHAuto("Only one girl available for powerplace n°"+index+ " assigning her.");
            }
            else
            {
                querySelectorText = "button.blue_button_L[rel='pop_auto_assign']:not([disabled])"
                if ($(querySelectorText).length>0)
                {
                    document.querySelector(querySelectorText).click();
                    logHHAuto("Autoassigned powerplace"+index);
                }
            }
            querySelectorText = "button.blue_button_L[rel='pop_action']:not([disabled])"
            if ($(querySelectorText).length>0)
            {
                document.querySelector(querySelectorText).click();
                logHHAuto("Started powerplace"+index);
            }
            else if ($("button.blue_button_L[rel='pop_action'][disabled]").length >0 && $("div.grid_view div.pop_selected").length >0)
            {
                addPopToUnableToStart(index,"Unable to start Pop "+index+" not enough girls available.");
                removePopFromPopToStart(index);
                return false;
            }
        };

        removePopFromPopToStart(index);
        // Not busy
        return false;
    }
}

function girlPower(powerRemaining, girlList, selectedGirls) {
    let subList = girlList;
    if (subList.length>0){
        let currentGirl = subList.pop();
        if(currentGirl.power <= powerRemaining) {
            selectedGirls.push(currentGirl);
            powerRemaining -= currentGirl.power;
        };
        selectedGirls = girlPower(powerRemaining, subList, selectedGirls);
    };
    return selectedGirls;
};

// returns boolean to set busy
function doContestStuff()
{
    if(getPage() !== getHHScriptVars("pagesIDContests"))
    {
        logHHAuto("Navigating to contests page.");
        gotoPage(getHHScriptVars("pagesIDContests"));
        // return busy
        return true;
    }
    else
    {
        logHHAuto("On contests page.");
        logHHAuto("Collecting finished contests's reward.");
        let contest_list = $(".contest .ended button[rel='claim']");
        if ( contest_list.length > 0)
        {
            logHHAuto("Collected legendary contest id : "+contest_list[0].getAttribute('id_contest')+".");
            contest_list[0].click();
            if ( contest_list.length > 1 )
            {
                gotoPage(getHHScriptVars("pagesIDContests"));
            }
        }
        /*
        //getting legendary contest first not cumulating them
        let contest_list = $(".contest.is_legendary .ended button[rel='claim']");
        if ( contest_list.length > 0)
        {
            logHHAuto("Collected legendary contest id : "+contest_list[0].getAttribute('id_contest')+".");
            contest_list[0].click();
            gotoPage(getHHScriptVars("pagesIDContests"));
        }

        contest_list = $(".contest:not(.is_legendary) .ended button[rel='claim']");
        let lastContestId = parseInt(contests.last().attr('id_contest'));
        let laterDayToCollect = lastContestId - getHHScriptVars("contestMaxDays");
        contest_list.filter(function()
                            {
            return parseInt($(this).attr('id_contest')) - laterDayToCollect < 0;
        });
        if ( contest_list.length > 0)
        {
            logHHAuto("Collected legendary contest id : "+contest_list[0].getAttribute('id_contest')+".");
            contest_list[0].click();
            gotoPage(getHHScriptVars("pagesIDContests"));
        }*/
        // need to get next contest timer data
        var time = 0;
        for(var e in unsafeWindow.HHTimers.timers){
            try{if(unsafeWindow.HHTimers.timers[e].$barElm/*.selector.includes(".contest_timer")*/)
                time=unsafeWindow.HHTimers.timers[e];
               }
            catch(e)
            {
                logHHAuto("Catched error : Could not parse contest timer : "+e);
            }
        }
        time = time.remainingTime;
        try{if(time === undefined)
        {
            //try again with different selector
            time = undefined;
            for(e in unsafeWindow.HHTimers.timers){
                if(unsafeWindow.HHTimers.timers[e].$elm && unsafeWindow.HHTimers.timers[e].$elm[0].className.includes("contest_timer"))
                    // get closest time
                    if(!(unsafeWindow.HHTimers.timers[e].remainingTime>time))
                        time=unsafeWindow.HHTimers.timers[e].remainingTime;
            }
        }}catch(e)
        {
            logHHAuto("Catched error : Could not parse contest timer : "+e);
        }
        if(time === undefined){
            logHHAuto("New contest time was undefined... Setting it manually to 10min.");
            time = 10*60;
        }
        setTimer('nextContestTime',Number(time)+1);
        // Not busy
        return false;
    }
}

function randomInterval(min,max) // min and max included
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function filterGirlMapReadyForCollect(a)
{
    return a.readyForCollect;
}

function filterGirlMapCanUpgrade(a)
{
    return a.gData.can_upgrade;
}

var CollectMoney = function()
{
    var Clicked=[];
    //var ToClick=[];
    var endCollectTS = -1;
    let startCollectTS = -1;
    var maxSecsForSalary = Number(getStoredValue("HHAuto_Setting_autoSalaryMaxTimer"));
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
            var params = {
                class: "Girl",
                id_girl: Clicked[0],
                action: "get_salary"
            };
            hh_ajax(params, function(data) {
                if (data.success)
                {
                    //console.log(Clicked[0]);
                    if (getHHVars('GirlSalaryManager.girlsMap') !== null && getHHVars('GirlSalaryManager.girlsMap')[Clicked[0]] !== undefined)
                    {
                        const _this2 =getHHVars('GirlSalaryManager.girlsMap')[Clicked[0]];
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
                    logHHAuto("Collect error on n°"+Clicked[0]);
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
                    logHHAuto("Next girl collection in " + waitBetweenGirlsTime + "ms after n°"+Clicked[0]);
                    setTimeout(ClickThem,waitBetweenGirlsTime);
                    window.top.postMessage({ImAlive:true},'*');
                }
                else
                {
                    logHHAuto('Salary collection reached to the max time of '+maxSecsForSalary+' secs, collected '+collectedGirlzNb+'/'+totalGirlsToCollect+' girls and '+collectedMoney+' money');
                    setTimeout(CollectData,randomInterval(300,500));
                }
            },
                    function(err) {
                Clicked.shift();
                logHHAuto("Bypassed n°"+Clicked[0]);
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
            logHHAuto(`Salary collection done : collected ${collectedGirlzNb} / ${totalGirlsToCollect} girls and ${collectedMoney} money in ${collectionTime} secs`);
            setTimeout(CollectData,randomInterval(300,500));
        }
    }

    function CollectData(inStart = false)
    {
        let allCollected = true;
        let collectableGirlsList = [];
        const girlsList = getGirlMapSorted(getCurrentSorting(), false);
        if ( girlsList === null)
        {
            gotoPage(getHHScriptVars("pagesIDHome"));
        }
        collectableGirlsList = girlsList.filter(filterGirlMapReadyForCollect);

        totalGirlsToCollect = collectableGirlsList.length;

        if (collectableGirlsList.length>0 )
        {
            allCollected = false;
            //console.log(JSON.stringify(collectableGirlsList));
            for ( let girl of collectableGirlsList)
            {
                Clicked.push(girl.gId);
            }
            logHHAuto({log:"Girls ready to collect: ", GirlsToCollect:Clicked});
        }
        if (Clicked.length>0 && inStart)
        {
            //logHHAuto('clicking!');

            // add time to paranoia
            //var addedTime=ToClick.length*1.6;
            //logHHAuto("Adding time to burst to cover getting salary : +"+addedTime+"secs");
            //addedTime += getSecondsLeft("paranoiaSwitch");
            //setTimer("paranoiaSwitch",addedTime);

            setTimeout(ClickThem,randomInterval(500,1500));
        }
        else//nothing to collect
        {
            let salaryTimer =predictNextSalaryMinTime();
            if (salaryTimer > 0)
            {
                salaryTimer = predictNextSalaryMinTime();
                logHHAuto("Setting salary timer to "+salaryTimer+" secs.");
            }
            else
            {
                logHHAuto("Next salary set to 60 secs as remains girls to collect");
                salaryTimer = 60;
            }
            setTimer('nextSalaryTime',salaryTimer);
            gotoPage(getHHScriptVars("pagesIDHome"),{},randomInterval(300,500));
        }
    }

    CollectData(true);
}

function predictNextSalaryMinTime(inGirlsDataList)
{
    let girlsDataList = getHHVars("GirlSalaryManager.girlsMap");
    const isGirlMap = getHHVars("GirlSalaryManager.girlsMap")!==null;
    if (!isGirlMap)
    {
        girlsDataList = getHHVars("girlsDataList");
    }
    let nextCollect = 0;
    const minSalaryForCollect = Number(getStoredValue("HHAuto_Setting_autoSalaryMinSalary"));
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

var getSalary = function () {
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

            const enoughSalaryToCollect = salarySumTag === NaN?true:salarySumTag > Number(getStoredValue("HHAuto_Setting_autoSalaryMinSalary"));
            //console.log(salarySumTag, enoughSalaryToCollect);
            if (salaryToCollect && enoughSalaryToCollect )
            {
                if (getButtonClass.indexOf("blue_button_L") !== -1 )
                {
                    //replaceCheatClick();
                    salaryButton.click();
                    logHHAuto('Collected all Premium salary');
                    if (getPage() == getHHScriptVars("pagesIDHarem") )
                    {
                        setTimer('nextSalaryTime',predictNextSalaryMinTime());
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
                        logHHAuto("Detected Harem Screen. Fetching Salary");
                        //replaceCheatClick();
                        setStoredValue("HHAuto_Temp_autoLoop", "false");
                        logHHAuto("setting autoloop to false");
                        CollectMoney();
                    }
                    else
                    {
                        logHHAuto("Navigating to Harem window.");
                        gotoPage(getHHScriptVars("pagesIDHarem"));
                    }
                    return true;
                }
                else
                {
                    logHHAuto("Unknown salary button color : "+getButtonClass);
                    setTimer('nextSalaryTime',60);
                }
            }
            else
            {
                logHHAuto("Not enough salary to collect");
                setTimer('nextSalaryTime',predictNextSalaryMinTime());
            }
        }
        else
        {
            // Not at Harem screen then goto the Harem screen.
            if (checkTimer('nextSalaryTime'))
            {
                logHHAuto("Navigating to Home window.");
                gotoPage(getHHScriptVars("pagesIDHome"));
                return true;
            }
        }
    }
    catch (ex) {
        logHHAuto("Catched error : Could not collect salary... " + ex);
        // return not busy
        return false;
    }
};

var doStatUpgrades=function()
{
    //Stats?
    //logHHAuto('stats');
    var Hero=getHero();
    var level=getHHVars('Hero.infos.level');
    var stats=[getHHVars('Hero.infos.carac1'),getHHVars('Hero.infos.carac2'),getHHVars('Hero.infos.carac3')];
    var money=getHHVars('Hero.currencies.soft_currency');
    var count=0;
    var M=Number(getStoredValue("HHAuto_Setting_autoStats"));
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
                logHHAuto('money: '+money+' stat'+carac+': '+stats[carac-1]+' [+'+mult+'] price: '+price);
                money-=price;
                var params = {
                    class: "Hero",
                    carac: carac,
                    action: "update_stats",
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

function doShopping()
{
    try
    {
        //logHHAuto("Go shopping");
        var Hero=getHero();
        var MS='carac'+getHHVars('Hero.infos.class');
        var SS1='carac'+(getHHVars('Hero.infos.class')%3+1);
        var SS2='carac'+((getHHVars('Hero.infos.class')+1)%3+1);
        var money=getHHVars('Hero.currencies.soft_currency');
        var kobans=getHHVars('Hero.currencies.hard_currency');


        if (getStoredValue("HHAuto_Temp_storeContents") === undefined )
        {
            if (! isJSON(getStoredValue("HHAuto_Temp_storeContents")) )
            {
                logHHAuto("Catched error : Could not parse store content.");
            }
            setStoredValue("HHAuto_Temp_charLevel",0);
            return;
        }

        if (getStoredValue("HHAuto_Temp_haveAff") === undefined || getStoredValue("HHAuto_Temp_haveExp") === undefined)
        {
            setStoredValue("HHAuto_Temp_charLevel", 0);
            return;
        }
        var shop=JSON.parse(getStoredValue("HHAuto_Temp_storeContents"));


        var LGM=Number(getStoredValue("HHAuto_Setting_autoLGM"));
        var LGR=Number(getStoredValue("HHAuto_Setting_autoLGR"));
        var Exp=Number(getStoredValue("HHAuto_Setting_autoExp"));
        var Aff=Number(getStoredValue("HHAuto_Setting_autoAff"));
        var MaxAff=Number(getStoredValue("HHAuto_Setting_maxAff"));
        var MaxExp=Number(getStoredValue("HHAuto_Setting_maxExp"));
        var HaveAff=Number(getStoredValue("HHAuto_Temp_haveAff"));
        var HaveExp=Number(getStoredValue("HHAuto_Temp_haveExp"));


        if (getStoredValue("HHAuto_Setting_autoLGMW") ==="true" || getStoredValue("HHAuto_Setting_autoLGRW") ==="true" )
        {
            //logHHAuto('items');
            var Was=shop[0].length;
            for (var n0=shop[0].length-1;n0>=0;n0--)
            {

                if (
                    (
                        getStoredValue("HHAuto_Setting_autoLGMW") ==="true"
                        && money>=LGM+Number(shop[0][n0].price_buy)
                        && shop[0][n0][MS]>0
                        && shop[0][n0][SS1]==0
                        && shop[0][n0][SS2]==0
                        && shop[0][n0].chance==0
                        && shop[0][n0].endurance==0
                        && shop[0][n0].rarity=='legendary'
                        && shop[0][n0].item.currency == "sc" // "sc" for soft currency = money, "hc" for hard currency = kobans
                    )
                    ||
                    (
                        getStoredValue("HHAuto_Setting_autoLGRW") ==="true"
                        && money>=LGR+Number(shop[0][n0].price_buy)
                        && shop[0][n0][MS]>0
                        && shop[0][n0][SS1]>0
                        && shop[0][n0][SS2]>0
                        && shop[0][n0].rarity=='legendary'
                        && shop[0][n0].item.currency == "sc" // "sc" for soft currency = money, "hc" for hard currency = kobans
                    )
                )
                {
                    //logHHAuto({log:'wanna buy ',object:shop[0][n0]});
                    if (money>=shop[0][n0].price)
                    {
                        logHHAuto({log:'Buying : ',object:shop[0][n0]});
                        money-=Number(shop[0][n0].price_buy);
                        var params0 = {
                            index: shop[0][n0].index,
                            action: "market_buy",
                            id_item: shop[0][n0].id_item,
                            type: "armor",
                            id_skin: shop[0][n0].id_skin,
                            id_equip: shop[0][n0].id_equip
                        };
                        hh_ajax(params0, function(data) {
                            Hero.updates(data.changes, false);
                            if (data.success === false)
                            {
                                clearTimer('nextShopTime');
                            }
                        });
                        shop[0].splice(n0,1);
                        setStoredValue("HHAuto_Temp_storeContents", JSON.stringify(shop));
                        setTimeout(doShopping, randomInterval(600,1200));
                        return;

                    }
                }
            }
            if (shop[0].length==0 && Was>0)
            {
                setStoredValue("HHAuto_Temp_charLevel", 0);
            }
        }

        var boosterFilter = getStoredValue("HHAuto_Setting_autoBuyBoostersFilter").split(";");
        if (getStoredValue("HHAuto_Setting_autoBuyBoosters") ==="true" && boosterFilter.length > 0)
        {
            Was=shop[1].length;

            for (var boost of boosterFilter)
            {
                for (var n1=shop[1].length-1;n1>=0;n1--)
                {
                    if (kobans>=Number(getStoredValue("HHAuto_Setting_kobanBank"))+Number(shop[1][n1].price_buy) && shop[1][n1].item.currency == "hc" && shop[1][n1].identifier == boost && (shop[1][n1].rarity=='legendary' || shop[1][n1].rarity=='mythic'))
                    {
                        logHHAuto({log:'wanna buy ',object:shop[1][n1]});
                        if (kobans>=Number(shop[1][n1].price))
                        {
                            logHHAuto({log:'Buying : ',object:shop[1][n1]});
                            kobans-=Number(shop[1][n1].price);
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
                                }
                            });
                            shop[1].splice(n1,1);
                            setStoredValue("HHAuto_Temp_storeContents", JSON.stringify(shop));
                            setTimeout(doShopping, randomInterval(600,1200));
                            return;
                        }
                    }
                }
            }

            if (shop[1].length==0 && Was>0)
            {
                setStoredValue("HHAuto_Temp_charLevel", 0);
            }
        }

        if (getStoredValue("HHAuto_Setting_autoAffW") ==="true" && HaveAff<MaxAff)
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
                logHHAuto('Buy all gifts for price:' + allGiftsPriceSc);
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
                });
                for (var n2=shop[2].length-1;n2>=0;n2--)
                {
                    if (shop[2][n2].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                    {
                        shop[2].splice(n2,1);
                    }
                }
                setStoredValue("HHAuto_Temp_storeContents", JSON.stringify(shop));
            } else {
                for (var n2=shop[2].length-1;n2>=0;n2--)
                {
                    //logHHAuto({log:'wanna buy ',Object:shop[2][n2]});
                    if (money>=Aff+Number(shop[2][n2].price_buy) && money>=Number(shop[2][n2].price_buy) && shop[2][n2].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                    {
                        logHHAuto({log:'Buying : ',Object:shop[2][n2]});
                        money-=Number(shop[2][n2].price);
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
                        });
                        shop[2].splice(n2,1);
                        setStoredValue("HHAuto_Temp_storeContents", JSON.stringify(shop));
                        setTimeout(doShopping, randomInterval(600,1200));
                        return;
                    }
                }
            }
            if (shop[2].length==0 && Was>0)
            {
                setStoredValue("HHAuto_Temp_charLevel", 0);
            }
        }
        if (getStoredValue("HHAuto_Setting_autoExpW") ==="true" && HaveExp<MaxExp)
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
                logHHAuto('Buy all books for price:' + allPotionPriceSc);
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
                });
                for (var n3=shop[3].length-1;n3>=0;n3--)
                {
                    if (shop[3][n3].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                    {
                        shop[3].splice(n3,1);
                    }
                }
                setStoredValue("HHAuto_Temp_storeContents", JSON.stringify(shop));
            } else {
                for (var n3=shop[3].length-1;n3>=0;n3--)
                {
                    //logHHAuto('wanna buy ',shop[3][n3]);
                    if (money>=Exp+Number(shop[3][n3].price_buy) && money>=Number(shop[3][n3].price_buy) && shop[3][n3].item.currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                    {
                        logHHAuto({log:'Buying : ',Object:shop[3][n3]});
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
                        });
                        shop[3].splice(n3,1);
                        setStoredValue("HHAuto_Temp_storeContents", JSON.stringify(shop));
                        setTimeout(doShopping, randomInterval(600,1200));
                        return;
                    }
                }
            }
            if (shop[3].length==0 && Was>0)
            {
                setStoredValue("HHAuto_Temp_charLevel", 0);
            }
        }
        setStoredValue("HHAuto_Temp_storeContents", JSON.stringify(shop));
        //unsafeWindow.Hero.currencies.soft_currency=money;
        //Hero.update("soft_currency", money, false);
    }
    catch (ex)
    {
        logHHAuto("Catched error : Could not buy : "+ex);
        setStoredValue("HHAuto_Temp_charLevel", 0);
    }
}

var doBossBattle = function()
{
    var currentPower = getHHVars('Hero.energies.fight.amount');
    if(currentPower < 1)
    {
        //logHHAuto("No power for battle.");
        if (!canBuyFight().canBuy)
        {
            return false;
        }
    }

    var TTF;
    if (getStoredValue("HHAuto_Setting_plusEvent") ==="true" && !checkTimer("eventGoing") && getStoredValue("HHAuto_Temp_eventGirl") !== undefined && JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic==="false")
    {
        TTF=JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).troll_id;
        logHHAuto("Event troll fight");
    }
    else if (getStoredValue("HHAuto_Setting_plusEventMythic") ==="true" && !checkTimer("eventMythicGoing") && getStoredValue("HHAuto_Temp_eventGirl") !== undefined && JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic==="true")
    {
        TTF=JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).troll_id;
        logHHAuto("Mythic Event troll fight");
    }
    else if(getStoredValue("HHAuto_Setting_autoTrollSelectedIndex") !== undefined && !isNaN(getStoredValue("HHAuto_Setting_autoTrollSelectedIndex")) && getStoredValue("HHAuto_Setting_autoTrollSelectedIndex") !== "0")
    {
        TTF=getStoredValue("HHAuto_Setting_autoTrollSelectedIndex");
        logHHAuto("Custom troll fight.");
    }
    else
    {
        TTF=getHHVars('Hero.infos.questing.id_world')-1;
        logHHAuto("Last troll fight");
    }

    if (getStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest") === "true")
    {
        TTF=getHHVars('Hero.infos.questing.id_world')-1;
        logHHAuto("Last troll fight for quest item.");
        //setStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest", "false");
        setStoredValue("HHAuto_Temp_questRequirement", "none");
    }

    logHHAuto("Fighting troll N "+TTF);
    logHHAuto("Going to crush: "+Trollz[Number(TTF)]);

    // Battles the latest boss.
    // Navigate to latest boss.
    //console.log(getPage());
    if(getPage()===getHHScriptVars("pagesIDTrollPreBattle") && window.location.search=="?id_opponent=" + TTF)
    {
        // On the battle screen.
        CrushThemFights();
        return true;
    }
    else
    {
        logHHAuto("Navigating to chosen Troll.");
        setStoredValue("HHAuto_Temp_autoLoop", "false");
        logHHAuto("setting autoloop to false");
        //week 28 new battle modification
        //location.href = "/battle.html?id_troll=" + TTF;
        gotoPage(getHHScriptVars("pagesIDTrollPreBattle"),{id_opponent:TTF});
        //End week 28 new battle modification
        return true;
    }
};

var doChampionStuff=function()
{
    var page=getPage();
    if (page==getHHScriptVars("pagesIDChampionsPage"))
    {
        logHHAuto('on champion page');
        if ($('button[rel=perform].blue_button_L').length==0)
        {
            logHHAuto('Something is wrong!');
            gotoPage(getHHScriptVars("pagesIDHome"));
            return true;
        }
        else
        {
            var TCount=Number($('div.input-field > span')[1].innerText.split(' / ')[1]);
            var ECount= getHHVars('Hero.energies.quest.amount');
            logHHAuto("T:"+TCount+" E:"+ECount+" "+(getStoredValue("HHAuto_Setting_autoChampsUseEne") ==="true"))
            if ( TCount==0)
            {
                logHHAuto("No tickets!");
                setTimer('nextChampionTime',15*60);
                return false;
            }
            else
            {
                if (TCount!=0)
                {
                    logHHAuto("Using ticket");
                    $('button[rel=perform].blue_button_L').click();
                }
                gotoPage(getHHScriptVars("pagesIDChampionsMap"));
                return true;
            }
        }
    }
    else if (page==getHHScriptVars("pagesIDChampionsMap"))
    {
        logHHAuto('on champion map');
        var Filter=getStoredValue("HHAuto_Setting_autoChampsFilter").split(';').map(s=>Number(s));
        var minTime = -1;
        var currTime;
        var e;

        for (let i=0;i<$('span.stage-bar-tier').length;i++)
        {
            let Impression=$('span.stage-bar-tier')[i].getAttribute("hh_title");
            const autoChampsForceStartEventGirl = getStoredValue("HHAuto_Setting_autoChampsForceStartEventGirl") === "true";
            const autoChampsEventGirls = isJSON(getStoredValue("HHAuto_Temp_autoChampsEventGirls"))?JSON.parse(getStoredValue("HHAuto_Temp_autoChampsEventGirls")):[];
            const autoChampsForceStart = getStoredValue("HHAuto_Setting_autoChampsForceStart") === "true";
            let Started=Impression.split('/')[0].replace(/[^0-9]/gi, '')!="0" ;
            let OnTimerOld=$($('a.champion-lair div.champion-lair-name')[i+1]).find('div[rel=timer]').length>0
            let timerNew=Number($($('a.champion-lair div.champion-lair-name')[i+1]).find('div#championTimer').attr('timer'));
            let OnTimerNew=false;
            if ( ! isNaN(timerNew) && (timerNew > Math.ceil(new Date().getTime()/1000)))
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
                            && isJSON(firstLockedLevelOfChamp)
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
                            logHHAuto("Seems Girl is no more available at Champion "+Number(i+1)+". Going to event page.");
                            parseEventPage(autoChampGirlsEventsID);
                            return true;
                        }
                    }
                }

            }
            const eventGirlForced=autoChampGirlOnChamp;
            logHHAuto("Champion "+(i+1)+" ["+Impression+"]"+(Started?" Started;":" Not started;")+(autoChampsForceStart?" Force start;":" Not force start;")+(OnTimer?" on timer;":" not on timer;")+(Filtered?" Included in filter;":" Excluded from filter;")+(eventGirlForced?" Forced for event":" Not event forced"));

            if ((Started || eventGirlForced || autoChampsForceStart) && !OnTimer && Filtered)
            {
                logHHAuto("Let's do him!");
                gotoPage('/champions/'+Number(i+1));
                //window.location = window.location.origin + '/champions/'+(i+1);
                return true;
            }
        }

        logHHAuto("No good candidate");
        currTime = -1;
        $('a.champion-lair div.champion-lair-name div#championTimer').each(function()
                                                                           {
            var timer = $(this).attr('timer');
            var currTime=Number(timer)-Math.ceil(new Date().getTime()/1000);

            if (minTime === -1 || currTime === -1 || minTime>currTime)
            {
                minTime = currTime;
            }
        });

        for(e in unsafeWindow.HHTimers.timers){
            try
            {
                var hhTimer = unsafeWindow.HHTimers.timers[e];
                if(hhTimer.$elm[0].offsetParent && hhTimer.$elm[0].offsetParent.className === "champion-lair")
                {
                    currTime=hhTimer.remainingTime;
                    if (minTime === -1 || currTime === -1 || minTime>currTime)
                    {
                        minTime = currTime;
                    }
                }
            }
            catch(e)
            {
                logHHAuto("Catched error : Could not parse champion timer : "+e);
            }

        }
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

var doClubChampionStuff=function()
{
    var page=getPage();
    if (page==getHHScriptVars("pagesIDClubChampion"))
    {
        logHHAuto('on club_champion page');
        if ($('button[rel=perform].blue_button_L').length==0)
        {
            logHHAuto('Something is wrong!');
            gotoPage(getHHScriptVars("pagesIDHome"));
            return true;
        }
        else
        {
            var TCount=Number($('div.input-field > span')[1].innerText.split(' / ')[1]);
            var ECount= getHHVars('Hero.energies.quest.amount');
            logHHAuto("T:"+TCount+" E:"+ECount)
            if ( TCount==0)
            {
                logHHAuto("No tickets!");
                setTimer('nextClubChampionTime',15*60);
                return false;
            }
            else
            {
                if (TCount!=0)
                {
                    logHHAuto("Using ticket");
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
        logHHAuto('on clubs');
        let Started = $("div.club_champions_panel tr.personal_highlight").length === 1;
        let noTimer = true;
        let Timer= -1;
        let SecsToNextTimer = -1;
        let restTeamFilter = "div.club_champions_details_container div.team_rest_timer[data-rest-timer]";
        let restChampionFilter = "div.club_champions_details_container div.champion_rest_timer[data-rest-timer]";

        if ($(restTeamFilter).length > 0)
        {
            Timer = Number($(restTeamFilter).attr("data-rest-timer"));
            SecsToNextTimer = Number(Timer)-Math.ceil(new Date().getTime()/1000);
            noTimer = false;
            logHHAuto("Team is resting for : "+toHHMMSS(SecsToNextTimer));
        }
        if ($(restChampionFilter).length > 0)
        {
            Timer = Number($(restChampionFilter).attr("data-rest-timer"));
            SecsToNextTimer = Number(Timer)-Math.ceil(new Date().getTime()/1000);
            noTimer = false;
            logHHAuto("Champion is resting for : "+toHHMMSS(SecsToNextTimer));
        }

        if ((Started || getStoredValue("HHAuto_Setting_autoClubForceStart") === "true") && noTimer)
        {
            let ticketUsed = 0;
            let ticketsUsedRequest = "div.club_champions_panel tr.personal_highlight td.challenges_count";
            if ($(ticketsUsedRequest).length >0)
            {
                ticketUsed = Number($(ticketsUsedRequest)[0].innerText.replace(/[^0-9]/gi, ''));
            }
            let maxTickets = Number(getStoredValue("HHAuto_Setting_autoClubChampMax"));
            //console.log(maxTickets, ticketUsed);
            if (maxTickets > ticketUsed )
            {
                logHHAuto("Let's do him!");
                gotoPage(getHHScriptVars("pagesIDClubChampion"));
                return true;
            }
            else
            {
                logHHAuto("Max tickets to use on Club Champ reached.");
            }

        }
        if (SecsToNextTimer === -1 || SecsToNextTimer > 30*60)
        {
            setTimer('nextClubChampionTime',15*60);
        }
        else
        {
            setTimer('nextClubChampionTime',SecsToNextTimer);
        }
        gotoPage(getHHScriptVars("pagesIDHome"));
        return false;
    }
    else
    {
        gotoPage(getHHScriptVars("pagesIDClub"));
        return true;
    }
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

function customMatchRating(inSimu)
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

function getRewardTypeByData(inData)
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

function getRewardTypeBySlot(inSlot)
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
        else if (inSlot.getAttribute("rarity") !== null && $(inSlot).data("d"))
        {
            let objectData = $(inSlot).data("d");
            //console.log(currentIndicator+" : "+inSlot.getAttribute("rarity")+" "+objectData.item.type+" "+objectData.item.value);
            reward = objectData.item.type;
        }
        else if (inSlot.className.indexOf('mythic') >= 0)
        {
            //console.log("mythic equipment");
            reward = 'mythic';
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

function goAndCollectDailyRewards()
{
    const rewardsToCollect = isJSON(getStoredValue("HHAuto_Setting_autoDailyRewardsCollectablesList"))?JSON.parse(getStoredValue("HHAuto_Setting_autoDailyRewardsCollectablesList")):[];
    if (getPage() == getHHScriptVars("pagesIDHome"))
    {
        const dailyRewardNotifRequest = getHHScriptVars("dailyRewardNotifRequest",false);
        const dailyRewardSlotRequest = "#popup_daily_rewards .daily_reward_container.daily_claim";
        //Daily rewards notification check
        if ($(dailyRewardNotifRequest).length > 0)
        {
            logHHAuto("setting autoloop to false");
            setStoredValue("HHAuto_Temp_autoLoop", "false");
            if ($('#no_HC')[0].style.display != "block")
            {
                //replaceCheatClick();
                logHHAuto('Opening daily rewards window.');
                $(dailyRewardNotifRequest)[0].click();
                setTimeout(goAndCollectDailyRewards, randomInterval(1000, 1500));
                return true;
            }
            if ($(dailyRewardSlotRequest).length > 0)
            {
                //replaceCheatClick();
                const getRewardType = getRewardTypeBySlot($(".slot",dailyRewardSlotRequest)[0]);
                if (rewardsToCollect.includes(getRewardType))
                {
                    $("button.blue_button_L.daily-claim-btn:not([disabled])", dailyRewardSlotRequest)[0].click();
                    logHHAuto('Collected immediate daily rewards, setting timer to next day.');
                    setTimer('nextDailyRewardsCollectTime', getSecondsLeftBeforeEndOfHHDay() + 3600);
                }
                else if (getSecondsLeftBeforeEndOfHHDay() <= getHHScriptVars("dailyRewardMaxRemainingTime") && getSecondsLeftBeforeEndOfHHDay() > 0)
                {
                    logHHAuto('Collected daily rewards, setting timer to next day.');
                    $("button.blue_button_L.daily-claim-btn:not([disabled])", dailyRewardSlotRequest)[0].click();
                    setTimer('nextDailyRewardsCollectTime', getSecondsLeftBeforeEndOfHHDay() + 3600);
                }
                else
                {
                    logHHAuto('Reward not set for immediate collection, setting timer to near end of HH day.');
                    setTimer('nextDailyRewardsCollectTime', getSecondsLeftBeforeEndOfHHDay() - getHHScriptVars("dailyRewardMaxRemainingTime"));
                }
            }
            else
            {
                logHHAuto('Seems reward already collected, setting timer to 1h.');
                setTimer('nextDailyRewardsCollectTime', 3600);
            }
            gotoPage(getHHScriptVars("pagesIDHome"));
        }
        else
        {
            logHHAuto('No more daily reward, setting timer to next day.');
            setTimer('nextDailyRewardsCollectTime', getSecondsLeftBeforeEndOfHHDay() + 3600);
        }
    }
    else
    {
        logHHAuto("Navigating to home page.");
        gotoPage(getHHScriptVars("pagesIDHome"));
        // return busy
        return true;
    }

}

function goAndCollectDailyGoals()
{
    const rewardsToCollect = isJSON(getStoredValue("HHAuto_Setting_autoDailyGoalsCollectablesList"))?JSON.parse(getStoredValue("HHAuto_Setting_autoDailyGoalsCollectablesList")):[];
    //console.log(rewardsToCollect.length);
    if (checkTimer('nextDailyGoalsCollectTime') && getStoredValue("HHAuto_Setting_autoDailyGoalsCollect") === "true")
    {
        //console.log(getPage());
        if (getPage() === getHHScriptVars("pagesIDDailyGoals"))
        {
            logHHAuto("Checking Daily Goals for collectable rewards.");
            logHHAuto("setting autoloop to false");
            setStoredValue("HHAuto_Temp_autoLoop", "false");
            let buttonsToCollect = [];
            const listDailyGoalsTiersToClaim = $("#daily_goals .progress-section .progress-bar-rewards-container .progress-bar-reward");
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
                        logHHAuto("Force adding for collection chest n° "+currentTierNb);
                        buttonsToCollect.push(currentButton[0]);
                    }
                    else
                    {
                        let validToCollect = true;
                        for (let reward of currentRewardsList)
                        {
                            const rewardType = getRewardTypeByData(reward);

                            if (! rewardsToCollect.includes(rewardType))
                            {
                                logHHAuto(`Not adding for collection chest n° ${currentTierNb} because ${rewardType} is not in immediate collection list.`);
                                validToCollect = false;
                                break;
                            }
                        }
                        if (validToCollect)
                        {
                            buttonsToCollect.push(currentButton[0]);
                            logHHAuto("Adding for collection chest n° "+currentTierNb);
                        }
                    }
                }
            }


            if (buttonsToCollect.length >0)
            {
                function collectDailyGoalsRewards()
                {
                    if (buttonsToCollect.length >0)
                    {
                        logHHAuto("Collecting chest n° "+buttonsToCollect[0].getAttribute('tier'));
                        buttonsToCollect[0].click();
                        buttonsToCollect.shift();
                        setTimeout(collectDailyGoalsRewards, randomInterval(300, 500));
                    }
                    else
                    {
                        logHHAuto("Daily Goals collection finished.");
                        setTimer('nextDailyGoalsCollectTime',30*60);
                        gotoPage(getHHScriptVars("pagesIDHome"));
                    }
                }
                collectDailyGoalsRewards();
                return true;
            }
            else
            {
                logHHAuto("No Daily Goals reward to collect.");
                setTimer('nextDailyGoalsCollectTime',30*60);
                gotoPage(getHHScriptVars("pagesIDHome"));
                return false;
            }
        }
        else
        {
            logHHAuto("Switching to Daily Goals screen.");
            gotoPage(getHHScriptVars("pagesIDDailyGoals"));
            return true;
        }
    }
}

function goAndCollectSeasonalEvent()
{
    const rewardsToCollect = isJSON(getStoredValue("HHAuto_Setting_autoSeasonalEventCollectablesList"))?JSON.parse(getStoredValue("HHAuto_Setting_autoSeasonalEventCollectablesList")):[];

    if (getPage() === getHHScriptVars("pagesIDSeasonalEvent"))
    {
        // TODO fix timer during next seasonal event
        const seasonalEventEnd = 30*24*60*60;// Temp 30 days to prevent script collection // getSecondsLeft("SeasonalEventRemainingTime");
        // logHHAuto("Seasonal end in " + seasonalEventEnd);

        if (checkTimer('nextSeasonalEventCollectAllTime') && seasonalEventEnd < getLimitTimeBeforeEnd() && getStoredValue("HHAuto_Setting_autoSeasonalEventCollectAll") === "true")
        {
            if ($(getHHScriptVars("selectorClaimAllRewards")).length > 0)
            {
                logHHAuto("Going to collect all seasonal item at once.");
                setTimeout(function (){
                    $(getHHScriptVars("selectorClaimAllRewards"))[0].click();
                    setTimer('nextSeasonalEventCollectAllTime',getHHScriptVars("maxCollectionDelay")); // Add timer to check again later if there is new items to collect
                    setTimeout(function (){gotoPage(getHHScriptVars("pagesIDHome"));},500);
                },500);
                return true;
            }
            else
            {
                setTimer('nextSeasonalEventCollectAllTime',getHHScriptVars("maxCollectionDelay"));
            }
        }
        if (checkTimer('nextSeasonalEventCollectTime') && getStoredValue("HHAuto_Setting_autoSeasonalEventCollect") === "true")
        {
            logHHAuto("Checking SeasonalEvent for collectable rewards.");
            logHHAuto("setting autoloop to false");
            setStoredValue("HHAuto_Temp_autoLoop", "false");
            let buttonsToCollect = [];
            const listSeasonalEventTiersToClaim = $("#home_tab_container div.bottom-container div.right-part-container div.seasonal-progress-bar-tiers div.seasonal-tier.unclaimed");
            for (let currentTier = 0 ; currentTier < listSeasonalEventTiersToClaim.length ; currentTier++)
            {
                const currentButton = $("button[rel='claim']", listSeasonalEventTiersToClaim[currentTier])[0];
                const currentTierNb = currentButton.getAttribute("tier");
                //console.log("checking tier : "+currentTierNb);
                const freeSlotType = getRewardTypeBySlot($(".free-slot .slot,.free-slot .shards_girl_ico",listSeasonalEventTiersToClaim[currentTier])[0]);
                if (rewardsToCollect.includes(freeSlotType))
                {
                    buttonsToCollect.push(currentButton);
                    logHHAuto("Adding for collection tier (only free) : "+currentTierNb);

                }
            }

            if (buttonsToCollect.length >0)
            {
                function collectSeasonalEventRewards()
                {
                    if (buttonsToCollect.length >0)
                    {
                        logHHAuto("Collecting tier : "+buttonsToCollect[0].getAttribute('tier'));
                        buttonsToCollect[0].click();
                        buttonsToCollect.shift();
                        setTimeout(collectSeasonalEventRewards, randomInterval(300, 500));
                    }
                    else
                    {
                        logHHAuto("SeasonalEvent collection finished.");
                        setTimer('nextSeasonalEventCollectTime',getHHScriptVars("maxCollectionDelay"));
                        gotoPage(getHHScriptVars("pagesIDHome"));
                    }
                }
                collectSeasonalEventRewards();
                return true;
            }
            else
            {
                logHHAuto("No SeasonalEvent reward to collect.");
                setTimer('nextSeasonalEventCollectTime',getHHScriptVars("maxCollectionDelay"));
                setTimer('nextSeasonalEventCollectAllTime',getHHScriptVars("maxCollectionDelay"));
                gotoPage(getHHScriptVars("pagesIDHome"));
                return false;
            }
        }
        return false;
    }
    else
    {
        logHHAuto("Switching to SeasonalEvent screen.");
        gotoPage(getHHScriptVars("pagesIDSeasonalEvent"));
        return true;
    }
}

function goAndCollectPoV()
{
    const rewardsToCollect = isJSON(getStoredValue("HHAuto_Setting_autoPoVCollectablesList"))?JSON.parse(getStoredValue("HHAuto_Setting_autoPoVCollectablesList")):[];

    if (getPage() === getHHScriptVars("pagesIDPoV"))
    {
        const povEnd = getSecondsLeft("PoVRemainingTime");
        logHHAuto("PoV end in " + debugDate(povEnd));

        if (checkTimer('nextPoVCollectAllTime') && povEnd < getLimitTimeBeforeEnd() && getStoredValue("HHAuto_Setting_autoPoVCollectAll") === "true")
        {
            if ($(getHHScriptVars("selectorClaimAllRewards")).length > 0)
            {
                logHHAuto("Going to collect all POV item at once.");
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
        if (checkTimer('nextPoVCollectTime') && getStoredValue("HHAuto_Setting_autoPoVCollect") === "true")
        {
            logHHAuto("Checking Path of Valor for collectable rewards.");
            logHHAuto("setting autoloop to false");
            setStoredValue("HHAuto_Temp_autoLoop", "false");
            let buttonsToCollect = [];
            const listPoVTiersToClaim = $("#pov_tab_container div.potions-paths-second-row div.potions-paths-central-section div.potions-paths-tier.unclaimed");
            for (let currentTier = 0 ; currentTier < listPoVTiersToClaim.length ; currentTier++)
            {
                const currentButton = $("button[rel='claim']", listPoVTiersToClaim[currentTier])[0];
                const currentTierNb = currentButton.getAttribute("tier");
                //console.log("checking tier : "+currentTierNb);
                const freeSlotType = getRewardTypeBySlot($(".free-slot .slot,.free-slot .shards_girl_ico",listPoVTiersToClaim[currentTier])[0]);
                if (rewardsToCollect.includes(freeSlotType))
                {
                    const paidSlots = $(".paid-slots:not(.paid-locked) .slot,.paid-slots:not(.paid-locked) .shards_girl_ico",listPoVTiersToClaim[currentTier]);
                    if (paidSlots.length >0)
                    {
                        if (rewardsToCollect.includes(getRewardTypeBySlot(paidSlots[0])) && rewardsToCollect.includes(getRewardTypeBySlot(paidSlots[1])))
                        {
                            buttonsToCollect.push(currentButton);
                            logHHAuto("Adding for collection tier (with paid) : "+currentTierNb);
                        }
                    }
                    else
                    {
                        buttonsToCollect.push(currentButton);
                        logHHAuto("Adding for collection tier (only free) : "+currentTierNb);
                    }
                }
            }


            if (buttonsToCollect.length >0)
            {
                function collectPoVRewards()
                {
                    if (buttonsToCollect.length >0)
                    {
                        logHHAuto("Collecting tier : "+buttonsToCollect[0].getAttribute('tier'));
                        buttonsToCollect[0].click();
                        buttonsToCollect.shift();
                        setTimeout(collectPoVRewards, randomInterval(300, 500));
                    }
                    else
                    {
                        logHHAuto("Path of Valor collection finished.");
                        setTimer('nextPoVCollectTime',getHHScriptVars("maxCollectionDelay"));
                        gotoPage(getHHScriptVars("pagesIDHome"));
                    }
                }
                collectPoVRewards();
                return true;
            }
            else
            {
                logHHAuto("No Path of Valor reward to collect.");
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
        logHHAuto("Switching to Path of Valor screen.");
        gotoPage(getHHScriptVars("pagesIDPoV"));
        return true;
    }
}

function goAndCollectPoG()
{
    const rewardsToCollect = isJSON(getStoredValue("HHAuto_Setting_autoPoGCollectablesList"))?JSON.parse(getStoredValue("HHAuto_Setting_autoPoGCollectablesList")):[];

    if (getPage() === getHHScriptVars("pagesIDPoG"))
    {
        const pogEnd = getSecondsLeft("PoGRemainingTime");
        logHHAuto("PoG end in " + debugDate(pogEnd));

        if (checkTimer('nextPoGCollectAllTime') && pogEnd < getLimitTimeBeforeEnd() && getStoredValue("HHAuto_Setting_autoPoGCollectAll") === "true")
        {
            if ($(getHHScriptVars("selectorClaimAllRewards")).length > 0)
            {
                logHHAuto("Going to collect all POG item at once.");
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
        if (checkTimer('nextPoGCollectTime') && (getStoredValue("HHAuto_Setting_autoPoGCollect") === "true" || getStoredValue("HHAuto_Setting_autoPoGCollectAll") === "true"))
        {
            logHHAuto("Checking Path of Glory for collectable rewards.");
            logHHAuto("setting autoloop to false");
            setStoredValue("HHAuto_Temp_autoLoop", "false");
            let buttonsToCollect = [];
            const listPoGTiersToClaim = $("#pog_tab_container div.potions-paths-second-row div.potions-paths-central-section div.potions-paths-tier.unclaimed");
            for (let currentTier = 0 ; currentTier < listPoGTiersToClaim.length ; currentTier++)
            {
                const currentButton = $("button[rel='claim']", listPoGTiersToClaim[currentTier])[0];
                const currentTierNb = currentButton.getAttribute("tier");
                //console.log("checking tier : "+currentTierNb);
                const freeSlotType = getRewardTypeBySlot($(".free-slot .slot,.free-slot .shards_girl_ico",listPoGTiersToClaim[currentTier])[0]);
                if (rewardsToCollect.includes(freeSlotType))
                {
                    const paidSlots = $(".paid-slots:not(.paid-locked) .slot,.paid-slots:not(.paid-locked) .shards_girl_ico",listPoGTiersToClaim[currentTier]);
                    if (paidSlots.length >0)
                    {
                        if (rewardsToCollect.includes(getRewardTypeBySlot(paidSlots[0])) && rewardsToCollect.includes(getRewardTypeBySlot(paidSlots[1])))
                        {
                            buttonsToCollect.push(currentButton);
                            logHHAuto("Adding for collection tier (with paid) : "+currentTierNb);
                        }
                    }
                    else
                    {
                        buttonsToCollect.push(currentButton);
                        logHHAuto("Adding for collection tier (only free) : "+currentTierNb);
                    }
                }
            }


            if (buttonsToCollect.length >0)
            {
                function collectPoGRewards()
                {
                    if (buttonsToCollect.length >0)
                    {
                        logHHAuto("Collecting tier : "+buttonsToCollect[0].getAttribute('tier'));
                        buttonsToCollect[0].click();
                        buttonsToCollect.shift();
                        setTimeout(collectPoGRewards, randomInterval(300, 500));
                    }
                    else
                    {
                        logHHAuto("Path of Glory collection finished.");
                        setTimer('nextPoGCollectTime',getHHScriptVars("maxCollectionDelay"));
                        gotoPage(getHHScriptVars("pagesIDHome"));
                    }
                }
                collectPoGRewards();
                return true;
            }
            else
            {
                logHHAuto("No Path of Glory reward to collect.");
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
        logHHAuto("Switching to Path of Glory screen.");
        gotoPage(getHHScriptVars("pagesIDPoG"));
        return true;
    }
}

function goAndCollectSeason()
{
    const rewardsToCollect = isJSON(getStoredValue("HHAuto_Setting_autoSeasonCollectablesList"))?JSON.parse(getStoredValue("HHAuto_Setting_autoSeasonCollectablesList")):[];

    if (getPage() === getHHScriptVars("pagesIDSeason"))
    {
        const seasonEnd = unsafeWindow.season_sec_untill_event_end;
        logHHAuto("Season end in " + debugDate(seasonEnd));

        if (checkTimer('nextSeasonCollectAllTime') && seasonEnd < getLimitTimeBeforeEnd() && getStoredValue("HHAuto_Setting_autoSeasonCollectAll") === "true")
        {
            if($(getHHScriptVars("selectorClaimAllRewards")).length > 0)
            {
                logHHAuto("Going to collect all Season item at once.");
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
        if (checkTimer('nextSeasonCollectTime') && getStoredValue("HHAuto_Setting_autoSeasonCollect") === "true")
        {
            logHHAuto("Going to collect Season.");
            logHHAuto("setting autoloop to false");
            setStoredValue("HHAuto_Temp_autoLoop", "false");

            let limitClassPass = "";
            if ($("div#gsp_btn_holder:visible").length)
            {
                limitClassPass = ".free_reward"; // without season pass
            }

            let buttonsToCollect = [];
            const listSeasonTiersToClaim = $("#seasons_row1 .rewards_pair .reward_wrapper.reward_is_claimable"+limitClassPass);
            for (let currentReward = 0 ; currentReward < listSeasonTiersToClaim.length ; currentReward++)
            {
                const currentRewardSlot = getRewardTypeBySlot($(".slot, .shards_girl_ico",listSeasonTiersToClaim[currentReward])[0]);
                const currentTier = $(".tier_number",$(listSeasonTiersToClaim[currentReward]).parent())[0].innerText;
                //console.log(currentRewardSlot);
                if (rewardsToCollect.includes(currentRewardSlot))
                {
                    if (listSeasonTiersToClaim[currentReward].className.indexOf('pass-reward') > 0)
                    {
                        logHHAuto("Adding for collection tier n°"+currentTier+" reward (paid) : "+currentRewardSlot);
                        buttonsToCollect.push({reward : currentRewardSlot, button : listSeasonTiersToClaim[currentReward], tier : currentTier, paid:true});
                    }
                    else
                    {
                        logHHAuto("Adding for collection n°"+currentTier+" reward (free) : "+currentRewardSlot);
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
                            const currentSelectedRewardType = getRewardTypeBySlot($(".slot, .shards_girl_ico",rewardPlaceHolder)[0]);
                            const currentTier = $("#preview_tier")[0].innerText.split(" ")[1];
                            if (
                                rewardPlaceHolder.length >0
                                && rewardsToCollect.includes(currentSelectedRewardType)
                                && currentSelectedRewardType === currentToCollect.reward
                                && currentTier === currentToCollect.tier
                            )
                            {
                                logHHAuto("Collecting tier n°"+currentToCollect.tier+" : "+currentSelectedRewardType);
                                setTimeout(function (){$("#claim_btn_s")[0].click();},500);
                            }
                            else
                            {
                                logHHAuto(`Issue collecting n°${currentToCollect.tier} : ${currentToCollect.reward} : \n`
                                         +`rewardPlaceHolder.length : ${rewardPlaceHolder.length}\n`
                                         +`rewardsToCollect.includes(currentSelectedRewardType) : ${rewardsToCollect.includes(currentSelectedRewardType)}\n`
                                         +`currentSelectedRewardType : ${currentSelectedRewardType} / currentToCollect.reward : ${currentToCollect.reward} => ${currentSelectedRewardType === currentToCollect.reward}\n`
                                         +`currentTier : ${currentTier} / currentToCollect.tier : ${currentToCollect.tier} => ${currentTier === currentToCollect.tier}`);

                                logHHAuto("Proceeding with next one.");
                            }

                            buttonsToCollect.shift();
                            setTimeout(collectSeasonRewards,1000);
                            return;
                        }
                        else
                        {
                            logHHAuto("Selecting reward n°"+currentToCollect.tier+" : "+currentToCollect.reward);
                            currentToCollect.button.click();
                            setTimeout(function () {collectSeasonRewards(true);}, randomInterval(300, 500));
                        }
                    }
                    else
                    {
                        logHHAuto("Season collection finished.");
                        setTimer('nextSeasonCollectTime',getHHScriptVars("maxCollectionDelay"));
                        gotoPage(getHHScriptVars("pagesIDHome"));
                    }
                }
                collectSeasonRewards();
                return true;
            }
            else
            {
                logHHAuto("No season collection to do.");
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
        logHHAuto("Switching to Season Rewards screen.");
        gotoPage(getHHScriptVars("pagesIDSeason"));
        return true;
    }
}

var doSeason = function ()
{
    logHHAuto("Performing auto Season.");
    // Confirm if on correct screen.
    var page = getPage();
    var current_kisses = getHHVars('Hero.energies.kiss.amount');
    if (page === getHHScriptVars("pagesIDSeasonArena"))
    {
        logHHAuto("On season arena page.");

        var chosenID=moduleSimSeasonBattle();
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
                logHHAuto("Three red opponents, paying for refresh.");
                hh_ajax(params, function(data){
                    Hero.update("hard_currency", data.hard_currency, false);
                    location.reload();
                })
            }
            setStoredValue("HHAuto_Temp_autoLoop", "false");
            logHHAuto("setting autoloop to false");
            setTimer('nextSeasonTime',5);
            setTimeout(refreshOpponents,randomInterval(800,1600));

            return true;
        }
        else if (chosenID === -1 )
        {
            logHHAuto("Season : was not able to choose opponent.");
            setTimer('nextSeasonTime',30*60);
        }
        else
        {
            location.href = document.getElementsByClassName("opponent_perform_button_container")[chosenID].children[0].getAttribute('href');
            setStoredValue("HHAuto_Temp_autoLoop", "false");
            logHHAuto("setting autoloop to false");
            logHHAuto("Going to crush : "+$("div.season_arena_opponent_container .personal_info div.player-name")[chosenID].innerText);
            setTimer('nextSeasonCollectTime',5);
            return true;
        }
    }
    else
    {
        // Switch to the correct screen
        logHHAuto("Remaining kisses : "+ current_kisses);
        if ( current_kisses > 0 )
        {
            logHHAuto("Switching to Season Arena screen.");
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
};

function doPantheon()
{
    logHHAuto("Performing auto Pantheon.");
    // Confirm if on correct screen.
    var page = getPage();
    var current_worship = getHHVars('Hero.energies.worship.amount');
    if(page === getHHScriptVars("pagesIDPantheon"))
    {
        logHHAuto("On pantheon page.");
        logHHAuto("Remaining worship : "+ current_worship);
        if ( current_worship > 0 )
        {
            let pantheonButton = $("#pantheon_tab_container .bottom-container a.blue_button_L.pantheon-pre-battle-btn");
            let templeID = queryStringGetParam(new URL(pantheonButton[0].getAttribute("href"),window.location.origin).search, 'id_opponent');
            if (pantheonButton.length > 0 && templeID !== null )
            {
                logHHAuto("Going to fight Temple : "+templeID);
                gotoPage(getHHScriptVars("pagesIDPantheonPreBattle"),{id_opponent:templeID});
            }
            else
            {
                logHHAuto("Issue to find templeID retry in 60secs.");
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
        //<button id="claim_btn_s" class="bordeaux_button_s" style="z-index: 1000; visibility: visible;">Claim</button>
    }
    else if (page === getHHScriptVars("pagesIDPantheonPreBattle"))
    {
        logHHAuto("On pantheon-pre-battle page.");
        let templeID = queryStringGetParam(window.location.search,'id_opponent');
        logHHAuto("Go and fight temple :"+templeID);
        let pantheonTempleBattleButton =$("#pre-battle .battle-buttons a.green_button_L.battle-action-button.pantheon-single-battle-button[data-pantheon-id='"+templeID+"']");
        if (pantheonTempleBattleButton.length >0)
        {
            //replaceCheatClick();
            setStoredValue("HHAuto_Temp_autoLoop", "false");
            logHHAuto("setting autoloop to false");
            pantheonTempleBattleButton[0].click();
            setTimeout(function () {location.reload();}, 1000);
        }
        else
        {
            logHHAuto("Issue to find temple battle button retry in 60secs.");
            setTimer('nextPantheonTime',60);
            gotoPage(getHHScriptVars("pagesIDHome"));
        }
    }
    else
    {
        // Switch to the correct screen
        logHHAuto("Remaining worship : "+ current_worship);
        if ( current_worship > 0 )
        {
            logHHAuto("Switching to pantheon screen.");
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
};

var getLeagueCurrentLevel = function ()
{
    if(unsafeWindow.league_tag === undefined)
    {
        setTimeout(autoLoop, Number(getStoredValue("HHAuto_Temp_autoLoopTimeMili")))
    }
    return unsafeWindow.league_tag;
}

function getLeagueOpponentListData()
{
    let Data=[];
    let sorting_id;
    $(".leadTable[sorting_table] tr").each(function()
                                           {
        sorting_id = $(this).attr("sorting_id");
        if (this.className.indexOf('selected-player-leagues') !== -1)
        {
            if ( ($(".leadTable[sorting_table] tr.selected-player-leagues div.result.won").length + $(".leadTable[sorting_table] tr.selected-player-leagues div.result.lost").length) < 3)
            {
                Data.push(sorting_id);
            }
        }
        else
        {
            if (this.cells[3].innerHTML==='0/3' || this.cells[3].innerHTML==='1/3' || this.cells[3].innerHTML==='2/3')
            {
                Data.push(sorting_id);
            }
        }
    });
    return Data;
}

var doLeagueBattle = function () {
    //logHHAuto("Performing auto leagues.");
    // Confirm if on correct screen.
    var currentPower = getHHVars('Hero.energies.challenge.amount');
    var leagueScoreSecurityThreshold = 40;
    var ltime;

    var page = getPage();
    if(page===getHHScriptVars("pagesIDLeagueBattle"))
    {
        // On the battle screen.
        CrushThemFights();
    }
    else if(page === getHHScriptVars("pagesIDLeaderboard"))
    {
        logHHAuto("On leaderboard page.");
        if (getStoredValue("HHAuto_Setting_autoLeaguesCollect") === "true")
        {
            if ($('#leagues_middle .forced_info button[rel="claim"]').length >0)
            {
                $('#leagues_middle .forced_info button[rel="claim"]').click(); //click reward
                gotoPage(getHHScriptVars("pagesIDLeaderboard"))
            }
        }
        //logHHAuto('ls! '+$('h4.leagues').length);
        $('h4.leagues').each(function(){this.click();});

        if(currentPower < 1)
        {
            logHHAuto("No power for leagues.");
            //prevent paranoia to wait for league
            setStoredValue("HHAuto_Temp_paranoiaLeagueBlocked", "true");
            setTimer('nextLeaguesTime',getHHVars('Hero.energies.challenge.next_refresh_ts')+10);
            return;
        }

        while ($("span[sort_by='level'][select='asc']").length==0)
        {
            //logHHAuto('resorting');
            $("span[sort_by='level']").each(function(){this.click()});
        }
        logHHAuto('parsing enemies');
        var Data=getLeagueOpponentListData();
        if (Data.length==0)
        {
            ltime=35*60;
            logHHAuto('No valid targets!');
            //prevent paranoia to wait for league
            setStoredValue("HHAuto_Temp_paranoiaLeagueBlocked", "true");
            setTimer('nextLeaguesTime',ltime);
        }
        else
        {
            var getPlayerCurrentLevel = getLeagueCurrentLevel();

            if (isNaN(getPlayerCurrentLevel))
            {
                logHHAuto("Could not get current Rank, stopping League.");
                //prevent paranoia to wait for league
                setStoredValue("HHAuto_Temp_paranoiaLeagueBlocked", "true");
                setTimer('nextLeaguesTime',Number(30*60)+1);
                return;
            }
            var currentRank = Number($("tr[class=personal_highlight] td span")[0].innerText);
            var currentScore = Number($("tr[class=personal_highlight] td")[4].innerText.replace(/\D/g, ''));
            let leagueTargetValue = Number(getStoredValue("HHAuto_Setting_autoLeaguesSelectedIndex"))+1;
            if (leagueTargetValue < Number(getPlayerCurrentLevel))
            {
                var maxDemote = 0;
                var totalOpponents = Number($("div.leagues_table table tr td:contains(/3)").length)+1;
                if (screen.width < 1026)
                {
                    totalOpponents = totalOpponents+1;
                }
                var rankDemote = totalOpponents - 14;
                if (currentRank > (totalOpponents - 15))
                {
                    rankDemote = totalOpponents - 15;
                }
                logHHAuto("Current league above target ("+Number(getPlayerCurrentLevel)+"/"+leagueTargetValue+"), needs to demote. max rank : "+rankDemote+"/"+totalOpponents);
                let getRankDemote = $("div.leagues_table table tr td span:contains("+rankDemote+")").filter(function()
                                                                                                            {
                    return Number($(this).text().trim()) === rankDemote;
                });
                if (getRankDemote.length > 0 )
                {
                    maxDemote = Number(getRankDemote.parent().parent()[0].lastElementChild.innerText.replace(/\D/g, ''));
                }
                else
                {
                    maxDemote = 0;
                }

                logHHAuto("Current league above target ("+Number(getPlayerCurrentLevel)+"/"+leagueTargetValue+"), needs to demote. Score should not be higher than : "+maxDemote);
                if ( currentScore + leagueScoreSecurityThreshold >= maxDemote )
                {
                    logHHAuto("Can't do league as could go above demote, setting timer to 30 mins");
                    setTimer('nextLeaguesTime',Number(30*60)+1);
                    //prevent paranoia to wait for league
                    setStoredValue("HHAuto_Temp_paranoiaLeagueBlocked", "true");
                    gotoPage(getHHScriptVars("pagesIDHome"));
                    return;
                }
            }

            var maxLeague = $("div.tier_icons img").length;
            if ( maxLeague === undefined )
            {
                maxLeague = Leagues.length;
            }

            if (leagueTargetValue === Number(getPlayerCurrentLevel) && leagueTargetValue < maxLeague)
            {
                var maxStay = 0;
                var rankStay = 16;
                if (currentRank > 15)
                {
                    rankStay = 15;
                }
                logHHAuto("Current league is target ("+Number(getPlayerCurrentLevel)+"/"+leagueTargetValue+"), needs to stay. max rank : "+rankStay);
                let getRankStay = $("div.leagues_table table tr td span:contains("+rankStay+")").filter(function()
                                                                                                        {
                    return Number($(this).text().trim()) === rankStay;
                });
                if (getRankStay.length > 0 )
                {
                    maxStay = Number(getRankStay.parent().parent()[0].lastElementChild.innerText.replace(/\D/g, ''));
                }
                else
                {
                    maxStay = 0;
                }

                logHHAuto("Current league is target ("+Number(getPlayerCurrentLevel)+"/"+leagueTargetValue+"), needs to stay. Score should not be higher than : "+maxStay);
                if ( currentScore + leagueScoreSecurityThreshold >= maxStay && getStoredValue("HHAuto_Setting_autoLeaguesAllowWinCurrent") !== "true")
                {
                    logHHAuto("Can't do league as could go above stay, setting timer to 30 mins");
                    setTimer('nextLeaguesTime',Number(30*60)+1);
                    //prevent paranoia to wait for league
                    setStoredValue("HHAuto_Temp_paranoiaLeagueBlocked", "true");
                    gotoPage(getHHScriptVars("pagesIDHome"));
                    return;
                }
            }
            logHHAuto(Data.length+' valid targets!');
            setStoredValue("HHAuto_Temp_autoLoop", "false");
            logHHAuto("setting autoloop to false");
            logHHAuto("Hit?" );
            if (getStoredValue("HHAuto_Setting_autoLeaguesPowerCalc") == "true")
            {
                var oppoID = getLeagueOpponentId(Data);
                if (oppoID == -1)
                {
                    logHHAuto('opponent list is building next waiting');
                    //setTimer('nextLeaguesTime',2*60);
                }
                else
                {
                    logHHAuto('going to crush ID : '+oppoID);
                    //week 28 new battle modification
                    //location.href = "/battle.html?league_battle=1&id_member=" + oppoID;
                    gotoPage(getHHScriptVars("pagesIDLeagueBattle"),{number_of_battles:1,id_opponent:oppoID});
                    //End week 28 new battle modification

                    clearTimer('nextLeaguesTime');
                }
            }
            else
            {
                //week 28 new battle modification
                //location.href = "/battle.html?league_battle=1&id_member=" + Data[0]
                gotoPage(getHHScriptVars("pagesIDLeagueBattle"),{number_of_battles:1,id_opponent:Data[0]});
                //End week 28 new battle modification
            }
        }
    }
    else
    {
        // Switch to the correct screen
        logHHAuto("Switching to leagues screen.");
        gotoPage(getHHScriptVars("pagesIDLeaderboard"));
        return;
    }
};

function LeagueDisplayGetOpponentPopup(numberDone,remainingTime)
{
    $("#leagues #leagues_middle").prepend('<div id="popup_message_league" class="popup_message_league" name="popup_message_league" ><a id="popup_message_league_close">&times;</a>'+getTextForUI("OpponentListBuilding","elementText")+' : <br>'+numberDone+' '+getTextForUI("OpponentParsed","elementText")+' ('+remainingTime+')</div>');
    document.getElementById("popup_message_league_close").addEventListener("click", function()
                                                                           {
        location.reload();
    });
}
GM_addStyle("#popup_message_league_close {   position: absolute;   top: 20px;   right: 30px;   transition: all 200ms;   font-size: 30px;   font-weight: bold;   text-decoration: none;   color: #333; } #popup_message_league_close:hover {   color: #06D85F; }");
function LeagueClearDisplayGetOpponentPopup()
{
    $("#popup_message_league").each(function(){this.remove();});
}

function LeagueUpdateGetOpponentPopup(numberDone,remainingTime)
{
    LeagueClearDisplayGetOpponentPopup();
    LeagueDisplayGetOpponentPopup(numberDone,remainingTime);
}

function getLeagueOpponentId(opponentsIDList,force=false)
{
    var opponentsPowerList = isJSON(getStoredValue("HHAuto_Temp_LeagueOpponentList"))?JSON.parse(getStoredValue("HHAuto_Temp_LeagueOpponentList")):{expirationDate:0,opponentsList:{}};
    var opponentsTempPowerList = isJSON(getStoredValue("HHAuto_Temp_LeagueTempOpponentList"))?JSON.parse(getStoredValue("HHAuto_Temp_LeagueTempOpponentList")):{expirationDate:0,opponentsList:{}};
    var opponentsIDs= opponentsIDList;
    var oppoNumber = opponentsIDList.length;
    var DataOppo={};
    var maxTime = 1.6;

    //toremove after migration in prod
    var girlDataName = getHHScriptVars('girlToolTipData');

    if (Object.keys(opponentsPowerList.opponentsList).length === 0 ||  opponentsPowerList.expirationDate < new Date() || force)
    {
        sessionStorage.removeItem("HHAuto_Temp_LeagueOpponentList");
        if (Object.keys(opponentsTempPowerList.opponentsList).length > 0 && opponentsTempPowerList.expirationDate > new Date())
        {
            logHHAuto("Opponents list already started, continuing.");

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
            logHHAuto("Opponents list not found or expired. Fetching all opponents.");
        }



        //if paranoia not is time's up and not in paranoia spendings
        if (!checkTimer("paranoiaSwitch"))
        {
            let addedTime=opponentsIDList.length*maxTime;
            logHHAuto("Adding time to burst to cover building list : +"+addedTime+"secs");
            addedTime += getSecondsLeft("paranoiaSwitch");
            setTimer("paranoiaSwitch",addedTime);
        }
        getOpponents();
        return -1;
    }
    else
    {
        logHHAuto("Found valid opponents list, using it.")
        return FindOpponent(opponentsPowerList,opponentsIDs);
    }

    function getOpponents()
    {
        //logHHAuto('Need to click: '+ToClick.length);
        var findText = 'playerLeaguesData = ';
        let league_end = -1;
        let maxLeagueListDurationSecs = getHHScriptVars("LeagueListExpirationSecs");
        for(let e in HHTimers.timers)
        {
            if (!unsafeWindow.HHTimers.timers[e].$elm) {continue;}
            let element = unsafeWindow.HHTimers.timers[e].$elm[0];
            while(element){
                if (element.classList && element.classList.contains("league_end_in")) {
                    league_end=HHTimers.timers[e].remainingTime;
                    break;
                }
                element=element.parentNode;
            }
        }
        if (league_end !== -1 && league_end < maxLeagueListDurationSecs)
        {
            maxLeagueListDurationSecs = league_end;
        }
        if (maxLeagueListDurationSecs <1)
        {
            maxLeagueListDurationSecs = 1;
        }
        let listExpirationDate =isJSON(getStoredValue("HHAuto_Temp_LeagueTempOpponentList"))?JSON.parse(getStoredValue("HHAuto_Temp_LeagueTempOpponentList")).expirationDate:new Date().getTime() + maxLeagueListDurationSecs * 1000;
        if (opponentsIDList.length>0)
        {
            //logHHAuto('getting data for opponent : '+opponentsIDList[0]);
            //logHHAuto({log:"Opponent list",opponentsIDList:opponentsIDList});
            $.post('/ajax.php',
                   {
                namespace: 'h\\Leagues',
                class: 'Leagues',
                action: 'get_opponent_info',
                opponent_id: opponentsIDList[0]
            },
                   function(data)
                   {
                //logHHAuto({log:"data for oppo",data:data});
                var opponentData = data.player;
                //console.log(opponentData);
                const players=getLeaguePlayersData(getHHVars("hero_fighter"),opponentData);

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
                setStoredValue("HHAuto_Temp_LeagueTempOpponentList", JSON.stringify({expirationDate:listExpirationDate,opponentsList:DataOppo}));
                //}
                //DataOppo.push(JSON.parse(data.html.substring(data.html.indexOf(findText)+findText.length,data.html.lastIndexOf(';'))));

            });

            opponentsIDList.shift();
            LeagueUpdateGetOpponentPopup(Object.keys(DataOppo).length+'/'+oppoNumber, toHHMMSS((oppoNumber-Object.keys(DataOppo).length)*maxTime));
            setTimeout(getOpponents,randomInterval(800,maxTime*1000));

            window.top.postMessage({ImAlive:true},'*');
        }
        else
        {
            //logHHAuto('nothing to click, checking data');

            //logHHAuto(DataOppo);
            sessionStorage.removeItem("HHAuto_Temp_LeagueTempOpponentList");
            setStoredValue("HHAuto_Temp_LeagueOpponentList", JSON.stringify({expirationDate:listExpirationDate,opponentsList:DataOppo}));
            LeagueClearDisplayGetOpponentPopup();
            //doLeagueBattle();
            logHHAuto("Building list finished, putting autoloop back to true.");
            setStoredValue("HHAuto_Temp_autoLoop", "true");
            setTimeout(autoLoop, Number(getStoredValue("HHAuto_Temp_autoLoopTimeMili")));
        }
    }

    function FindOpponent(opponentsPowerList,opponentsIDList)
    {
        var maxScore = -1;
        var IdOppo = -1;
        var OppoScore;
        logHHAuto('finding best chance opponent in '+opponentsIDList.length);
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
        logHHAuto("highest score opponent : "+IdOppo+'('+nRounding(100*maxScore, 2, -1)+'%)');
        return IdOppo;
    }
    return true;
};

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
var CrushThemFights=function()
{
    if (getPage() === getHHScriptVars("pagesIDTrollPreBattle")) {
        // On battle page.
        logHHAuto("On Pre battle page.");
        let TTF = queryStringGetParam(window.location.search,'id_opponent');

        let battleButton = $('#pre-battle .battle-buttons a.green_button_L.battle-action-button');
        let battleButtonX10 = $('#pre-battle .battle-buttons button.autofight[data-battles="10"]');
        let battleButtonX50 = $('#pre-battle .battle-buttons button.autofight[data-battles="50"]');
        let battleButtonX10Price = Number(battleButtonX10.attr('price'));
        let battleButtonX50Price = Number(battleButtonX50.attr('price'));
        let hero=getHero();
        let hcConfirmValue = getHHVars('Hero.infos.hc_confirm');
        let remainingShards;
        let previousPower = getStoredValue("HHAuto_Temp_trollPoints") !== undefined ? getStoredValue("HHAuto_Temp_trollPoints") : 0;
        let currentPower = Number(getHHVars('Hero.energies.fight.amount'));

        var checkPreviousFightDone = function(){
            // The goal of this function is to detect slow server response to avoid loop without fight
            if(previousPower > 0 && previousPower == currentPower) {
                setStoredValue("HHAuto_Temp_autoLoop", "false");
                logHHAuto("Server seems slow to reply, setting autoloop to false to wait for troll page to load");
            }
        }

        //check if girl still available at troll in case of event
        if (TTF !== null)
        {
            if (getStoredValue("HHAuto_Temp_eventGirl") !== undefined && TTF === JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).troll_id)
            {
                if (
                    (
                        JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "true"
                        && getStoredValue("HHAuto_Setting_plusEventMythic") ==="true"
                    )
                    ||
                    (
                        JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "false"
                        && getStoredValue("HHAuto_Setting_plusEvent") ==="true"
                    )
                )
                {
                    let rewardGirlz=$("#pre-battle .oponnent-panel .opponent_rewards .rewards_list .girls_reward[data-rewards]");

                    if (rewardGirlz.length ===0 || !rewardGirlz.attr('data-rewards').includes('"id_girl":'+JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).girl_id))
                    {
                        logHHAuto("Seems "+JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).girl_name+" is no more available at troll "+Trollz[Number(TTF)]+". Going to event page.");
                        parseEventPage(JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).event_id);
                        return true;
                    }
                }
            }
            let canBuyFightsResult=canBuyFight();
            if (
                (canBuyFightsResult.canBuy && currentPower === 0)
                ||
                (
                    canBuyFightsResult.canBuy
                    && currentPower < 50
                    && canBuyFightsResult.max === 50
                    && getStoredValue("HHAuto_Setting_useX50Fights") === "true"
                    && ( JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "true" || getStoredValue("HHAuto_Setting_useX50FightsAllowNormalEvent") === "true")
                    && TTF === JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).troll_id
                )
                ||
                (
                    canBuyFightsResult.canBuy
                    && currentPower < 10
                    && canBuyFightsResult.max === 20
                    && getStoredValue("HHAuto_Setting_useX10Fights") === "true"
                    && ( JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "true" || getStoredValue("HHAuto_Setting_useX10FightsAllowNormalEvent") === "true")
                    && TTF === JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).troll_id
                )
            )
            {
                RechargeCombat();
                gotoPage(getHHScriptVars("pagesIDTrollPreBattle"),{id_opponent:TTF});
                return;
            }

            if
                (
                    getStoredValue("HHAuto_Temp_eventGirl") !== undefined
                    && JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).girl_shards
                    && Number.isInteger(Number(JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).girl_shards))
                    && battleButtonX10.length > 0
                    && battleButtonX50.length > 0
                    && getStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest") !== "true"
                )
            {
                remainingShards = Number(100 - Number(JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).girl_shards));
                let bypassThreshold = (
                    (JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "false"
                     && canBuyFightsResult.canBuy
                    ) // eventGirl available and buy comb true
                    || (JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "true"
                        && getStoredValue("HHAuto_Setting_plusEventMythic") ==="true"
                       )
                );

                if (getStoredValue("HHAuto_Setting_useX50Fights") === "true"
                    && getStoredValue("HHAuto_Setting_minShardsX50")
                    && Number.isInteger(Number(getStoredValue("HHAuto_Setting_minShardsX50")))
                    && remainingShards >= Number(getStoredValue("HHAuto_Setting_minShardsX50"))
                    && (battleButtonX50Price === 0 || getHHVars('Hero.currencies.hard_currency')>=battleButtonX50Price+Number(getStoredValue("HHAuto_Setting_kobanBank")))
                    && currentPower >= 50
                    && (currentPower >= (Number(getStoredValue("HHAuto_Setting_autoTrollThreshold")) + 50)
                        || bypassThreshold
                       )
                    && ( JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "true" || getStoredValue("HHAuto_Setting_useX50FightsAllowNormalEvent") === "true")
                   )
                {
                    logHHAuto("Going to crush 50 times: "+Trollz[Number(TTF)]+' for '+battleButtonX50Price+' kobans.');

                    setHHVars('Hero.infos.hc_confirm',true);
                    // We have the power.
                    //replaceCheatClick();
                    battleButtonX50[0].click();
                    setHHVars('Hero.infos.hc_confirm',hcConfirmValue);
                    //setStoredValue("HHAuto_Temp_EventFightsBeforeRefresh", Number(getStoredValue("HHAuto_Temp_EventFightsBeforeRefresh")) - 50);
                    logHHAuto("Crushed 50 times: "+Trollz[Number(TTF)]+' for '+battleButtonX50Price+' kobans.');
                    if (getStoredValue("HHAuto_Temp_questRequirement") === "battle") {
                        // Battle Done.
                        setStoredValue("HHAuto_Temp_questRequirement", "none");
                    }
                    ObserveAndGetGirlRewards();
                    return;
                }
                else
                {
                    if (getStoredValue("HHAuto_Setting_useX50Fights") === "true")
                    {
                        logHHAuto('Unable to use x50 for '+battleButtonX50Price+' kobans,fights : '+getHHVars('Hero.energies.fight.amount')+'/50, remaining shards : '+remainingShards+'/'+getStoredValue("HHAuto_Setting_minShardsX50")+', kobans : '+getHHVars('Hero.currencies.hard_currency')+'/'+Number(getStoredValue("HHAuto_Setting_kobanBank")));
                    }
                }

                if (getStoredValue("HHAuto_Setting_useX10Fights") === "true"
                    && getStoredValue("HHAuto_Setting_minShardsX10")
                    && Number.isInteger(Number(getStoredValue("HHAuto_Setting_minShardsX10")))
                    && remainingShards >= Number(getStoredValue("HHAuto_Setting_minShardsX10"))
                    && (battleButtonX10Price === 0 || getHHVars('Hero.currencies.hard_currency')>=battleButtonX10Price+Number(getStoredValue("HHAuto_Setting_kobanBank")))
                    && currentPower >= 10
                    && (currentPower >= (Number(getStoredValue("HHAuto_Setting_autoTrollThreshold")) + 10)
                        || bypassThreshold
                       )
                    && ( JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "true" || getStoredValue("HHAuto_Setting_useX10FightsAllowNormalEvent") === "true")
                   )
                {
                    logHHAuto("Going to crush 10 times: "+Trollz[Number(TTF)]+' for '+battleButtonX10Price+' kobans.');

                    setHHVars('Hero.infos.hc_confirm',true);
                    // We have the power.
                    //replaceCheatClick();
                    battleButtonX10[0].click();
                    setHHVars('Hero.infos.hc_confirm',hcConfirmValue);
                    //setStoredValue("HHAuto_Temp_EventFightsBeforeRefresh", Number(getStoredValue("HHAuto_Temp_EventFightsBeforeRefresh")) - 10);
                    logHHAuto("Crushed 10 times: "+Trollz[Number(TTF)]+' for '+battleButtonX10Price+' kobans.');
                    if (getStoredValue("HHAuto_Temp_questRequirement") === "battle") {
                        // Battle Done.
                        setStoredValue("HHAuto_Temp_questRequirement", "none");
                    }
                    ObserveAndGetGirlRewards();
                    return;
                }
                else
                {
                    if (getStoredValue("HHAuto_Setting_useX10Fights") === "true")
                    {
                        logHHAuto('Unable to use x10 for '+battleButtonX10Price+' kobans,fights : '+getHHVars('Hero.energies.fight.amount')+'/10, remaining shards : '+remainingShards+'/'+getStoredValue("HHAuto_Setting_minShardsX10")+', kobans : '+getHHVars('Hero.currencies.hard_currency')+'/'+Number(getStoredValue("HHAuto_Setting_kobanBank")));
                    }
                }
            }

            //Crushing one by one


            if (currentPower > 0)
            {
                if ($('#pre-battle div.battle-buttons a.single-battle-button[disabled]').length>0)
                {
                    logHHAuto("Battle Button seems disabled, force reload of page.");
                    gotoPage(getHHScriptVars("pagesIDHome"));
                    return;
                }
                if(battleButton === undefined || battleButton.length === 0)
                {
                    logHHAuto("Battle Button was undefined. Disabling all auto-battle.");
                    document.getElementById("autoTrollBattle").checked = false;
                    setStoredValue("HHAuto_Setting_autoTrollBattle", "false");

                    //document.getElementById("autoArenaCheckbox").checked = false;
                    if (getStoredValue("HHAuto_Temp_questRequirement") === "battle")
                    {
                        document.getElementById("autoQuest").checked = false;
                        setStoredValue("HHAuto_Setting_autoQuest", "false");

                        logHHAuto("Auto-quest disabled since it requires battle and auto-battle has errors.");
                    }
                    return;
                }
                logHHAuto("Crushing: "+Trollz[Number(TTF)]);
                //console.log(battleButton);
                //replaceCheatClick();
                checkPreviousFightDone();
                setStoredValue("HHAuto_Temp_trollPoints", currentPower);
                battleButton[0].click();
            }
            else
            {
                // We need more power.
                logHHAuto("Battle requires "+battle_price+" power.");
                setStoredValue("HHAuto_Temp_battlePowerRequired", battle_price);
                if(getStoredValue("HHAuto_Temp_questRequirement") === "battle")
                {
                    setStoredValue("HHAuto_Temp_questRequirement", "P"+battle_price);
                }
                gotoPage(getHHScriptVars("pagesIDHome"));
                return;
            }
        }
        else
        {
            checkPreviousFightDone();
            setStoredValue("HHAuto_Temp_trollPoints", currentPower);
            //replaceCheatClick();
            battleButton[0].click();
        }
    }
    else
    {
        logHHAuto('Unable to identify page.');
        gotoPage(getHHScriptVars("pagesIDHome"));
        return;
    }
    return;
}

function doBattle()
{
    if (getPage() === getHHScriptVars("pagesIDLeagueBattle") || getPage() === getHHScriptVars("pagesIDTrollBattle") || getPage() === getHHScriptVars("pagesIDSeasonBattle") || getPage() === getHHScriptVars("pagesIDPantheonBattle") )
    {
        logHHAuto("On battle page.");
        let troll_id = queryStringGetParam(window.location.search,'id_opponent');
        if (getPage() === getHHScriptVars("pagesIDLeagueBattle") && getStoredValue("HHAuto_Setting_autoLeagues") === "true")
        {
            logHHAuto("Reloading after league fight.");
            gotoPage(getHHScriptVars("pagesIDLeaderboard"),{},randomInterval(4000,5000));
        }
        else if (getPage() === getHHScriptVars("pagesIDTrollBattle") )
        {
            //console.log(Number(troll_id),Number(getHHVars('Hero.infos.questing.id_world'))-1,Number(troll_id) === Number(getHHVars('Hero.infos.questing.id_world'))-1);
            if (getStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest") === "true" && Number(troll_id) === Number(getHHVars('Hero.infos.questing.id_world'))-1)
            {
                setStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest", "false");
            }
            if(getStoredValue("HHAuto_Temp_eventGirl") !== undefined)
            {
                ObserveAndGetGirlRewards();
            }
            else
            {
                if (troll_id !== null)
                {
                    logHHAuto("Go back to Troll after Troll fight.");
                    gotoPage(getHHScriptVars("pagesIDTrollPreBattle"),{id_opponent:troll_id},randomInterval(2000,4000));
                }
                else
                {
                    logHHAuto("Go to home after unknown troll fight.");
                    gotoPage(getHHScriptVars("pagesIDHome"),{},randomInterval(2000,4000));
                }
            }

        }
        else if (getPage() === getHHScriptVars("pagesIDSeasonBattle") && getStoredValue("HHAuto_Setting_autoSeason") === "true")
        {
            logHHAuto("Go back to Season arena after Season fight.");
            gotoPage(getHHScriptVars("pagesIDSeasonArena"),{},randomInterval(2000,4000));
        }
        else if (getPage() === getHHScriptVars("pagesIDPantheonBattle") && getStoredValue("HHAuto_Setting_autoPantheon") === "true")
        {
            logHHAuto("Go back to Pantheon arena after Pantheon temple.");
            gotoPage(getHHScriptVars("pagesIDPantheon"),{},randomInterval(2000,4000));
        }
        return true;
    }
    else
    {
        logHHAuto('Unable to identify page.');
        gotoPage(getHHScriptVars("pagesIDHome"));
        return;
    }
}

function ObserveAndGetGirlRewards()
{
    let inCaseTimer = setTimeout(function(){gotoPage(getHHScriptVars("pagesIDHome"));}, 60000); //in case of issue
    function parseReward()
    {
        if (getStoredValue("HHAuto_Temp_eventsGirlz") === undefined
            || getStoredValue("HHAuto_Temp_eventGirl") === undefined
            || !isJSON(getStoredValue("HHAuto_Temp_eventsGirlz"))
            || !isJSON(getStoredValue("HHAuto_Temp_eventGirl")))
        {
            return -1;
        }
        let eventsGirlz =isJSON(getStoredValue("HHAuto_Temp_eventsGirlz"))?JSON.parse(getStoredValue("HHAuto_Temp_eventsGirlz")):{}
        let eventGirl = isJSON(getStoredValue("HHAuto_Temp_eventGirl"))?JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")):{};
        let TTF = eventGirl.troll_id;
        if ($('#rewards_popup #reward_holder .shards_wrapper').length === 0)
        {
            clearTimeout(inCaseTimer);
            logHHAuto("No girl in reward going back to Troll");
            gotoPage(getHHScriptVars("pagesIDTrollPreBattle"),{id_opponent:TTF});
            return;
        }
        let renewEvent = "";
        let girlShardsWon = $('.shards_wrapper .shards_girl_ico');
        logHHAuto("Detected girl shard reward");
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
                        logHHAuto("Won "+wonShards+" event shards for "+eventsGirlz[GirlIndex].girl_name);
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
        setStoredValue("HHAuto_Temp_eventsGirlz", JSON.stringify(eventsGirlz));
        setStoredValue("HHAuto_Temp_eventGirl", JSON.stringify(eventGirl));
        if (renewEvent !== ""
            //|| Number(getStoredValue("HHAuto_Temp_EventFightsBeforeRefresh")) < 1
            || checkEvent(eventGirl.event_id)
           )
        {
            clearTimeout(inCaseTimer);
            logHHAuto("Need to check back event page");
            if (renewEvent !== "")
            {
                parseEventPage(renewEvent);
            }
            else
            {
                parseEventPage(eventGirl.event_id);
            }
            return;
        }
        else
        {
            clearTimeout(inCaseTimer);
            logHHAuto("Go back to troll after troll fight.");
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
            setStoredValue("HHAuto_Temp_autoLoop", "false");
            logHHAuto("setting autoloop to false to wait for troll rewards");
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
                    logHHAuto("Clicking on pass battle.");
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

var setTimer=function(name, seconds)
{
    var ND=new Date().getTime() + seconds * 1000;
    Timers[name]=ND;
    setStoredValue("HHAuto_Temp_Timers", JSON.stringify(Timers));
    logHHAuto(name+" set to "+toHHMMSS(ND/1000-new Date().getTimezoneOffset()*60)+' ('+ toHHMMSS(seconds)+')');
}


var clearTimer=function(name)
{
    delete Timers[name];
    setStoredValue("HHAuto_Temp_Timers", JSON.stringify(Timers));
}

var checkTimer=function(name)
{
    if (!Timers[name] || Timers[name]<new Date())
    {
        return true;
    }
    return false;
}

var checkTimerMustExist=function(name)
{
    if (Timers[name] && Timers[name]<new Date())
    {
        return true;
    }
    return false;
}

var getTimer=function(name)
{
    if (!Timers[name])
    {
        return -1;
    }
    return Timers[name];
}

var getSecondsLeft=function(name)
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

var getTimeLeft=function(name)
{
    const timerWaitingCompet = ['nextPachinkoTime','nextPachinko2Time','nextSeasonTime','nextLeaguesTime','nextMissionTime'];
    if (!Timers[name])
    {
        if (!canCollectCompetitionActive() && timerWaitingCompet.indexOf(name) >= 0)
        {
            return "Wait for compet";
        }
        return "No timer";
    }
    var diff=getSecondsLeft(name);
    if (diff<=0)
    {
        if (!canCollectCompetitionActive() && timerWaitingCompet.indexOf(name) >= 0)
        {
            return "Wait for compet";
        }
        return "Time's up!";
    }
    return toHHMMSS(diff);
}


var getFreeGreatPachinko = function(){
    try {
        if(getPage() !== getHHScriptVars("pagesIDPachinko"))
        {
            // Not at Pachinko screen then goto the Pachinko screen.
            logHHAuto("Navigating to Pachinko window.");
            gotoPage(getHHScriptVars("pagesIDPachinko"));
            return true;
        }
        else {
            logHHAuto("Detected Pachinko Screen. Fetching Pachinko");
            var counter=0;
            while ($('#playzone-replace-info button[data-free="true"]')[0]===undefined && (counter++)<250)
            {
                $('.game-simple-block[type-pachinko=great]')[0].click();
            }

            if ($('#playzone-replace-info button[data-free="true"]')[0]===undefined)
            {
                logHHAuto('Not ready yet');
            }
            else
            {
                $('#playzone-replace-info button[data-free="true"]')[0].click();
            }

            var npach = $('.great_pachinko_timer span[rel="expires"]').text();
            if(npach !== undefined && npach !== null && npach.length > 0)
            {
                setTimer('nextPachinkoTime',Number(convertTimeToInt(npach))+1);
            }
            else
            {
                logHHAuto("Unable to find Great Pachinko time, wait 1h.");
                setTimer('nextPachinkoTime',3600);
            }
        }
        return true;
    }
    catch (ex) {
        logHHAuto("Catched error : Could not collect Great Pachinko... " + ex);
    }
};

var getFreeMythicPachinko = function(){
    try {
        if(getPage() !== getHHScriptVars("pagesIDPachinko"))
        {
            // Not at Pachinko screen then goto the Pachinko screen.
            logHHAuto("Navigating to Pachinko window.");
            gotoPage(getHHScriptVars("pagesIDPachinko"));
            return true;
        }
        else {
            logHHAuto("Detected Pachinko Screen. Fetching Pachinko");
            var counter=0;
            logHHAuto('to mythic');
            while ($('#playzone-replace-info button[data-free="true"]')[0]===undefined && (counter++)<250)
            {
                $('.game-simple-block[type-pachinko=mythic]')[0].click();
            }

            if ($('#playzone-replace-info button[data-free="true"]')[0]===undefined)
            {
                logHHAuto('Not ready yet');
            }
            else
            {
                $('#playzone-replace-info button[data-free="true"]')[0].click();
            }

            var npach = $('.mythic-timer span[rel="expires"]').text();
            if(npach !== undefined && npach !== null && npach.length > 0)
            {
                setTimer('nextPachinko2Time',Number(convertTimeToInt(npach))+1);
            }
            else
            {
                logHHAuto("Unable to find Mythic Pachinko time, wait 1h.");
                setTimer('nextPachinko2Time',3600);
            }
        }
        return false;
    }
    catch (ex) {
        logHHAuto("Catched error : Could not collect Mythic Pachinko... " + ex);
    }
};

var updateShop=function()
{
    if(getPage() !== getHHScriptVars("pagesIDShop"))
    {
        logHHAuto("Navigating to Market window.");
        gotoPage(getHHScriptVars("pagesIDShop"));
        return true;
    }
    else {
        logHHAuto("Detected Market Screen. Fetching Assortment");

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
        $('#shops div.gift.player-inventory-content .slot').each(function(){if (this.dataset.d) { var d=JSON.parse(this.dataset.d); HaveAff+=d.quantity*d.item.value;}});
        $('#shops div.potion.player-inventory-content .slot').each(function(){if (this.dataset.d) { var d=JSON.parse(this.dataset.d); HaveExp+=d.quantity*d.item.value;}});

        setStoredValue("HHAuto_Temp_haveAff", HaveAff);
        setStoredValue("HHAuto_Temp_haveExp", HaveExp);

        logHHAuto('counted '+getStoredValue("HHAuto_Temp_haveAff")+' Aff '+getStoredValue("HHAuto_Temp_haveExp")+' Exp');

        setStoredValue("HHAuto_Temp_storeContents", JSON.stringify([assA,assB,assG,assP]));
        setStoredValue("HHAuto_Temp_charLevel", getHHVars('Hero.infos.level'));

        var nshop;
        let shopFrozenTimer = $('.shop div.shop_count span[rel="expires"]').first().text();
        if (nshop === undefined && shopFrozenTimer.length > 0)
        {
            nshop = convertTimeToInt(shopFrozenTimer);
        }
        let shopTimer=60;
        if(nshop !== undefined && nshop !== 0)
        {
            if (Number(nshop)+1 > 2*60*60)
            {
                shopTimer=2*60*60;
            }
            else
            {
                shopTimer=Number(nshop)+1;
            }
        }
        setTimer('nextShopTime',shopTimer);
        if (isJSON(getStoredValue("HHAuto_Temp_LastPageCalled"))
            && getPage() === JSON.parse(getStoredValue("HHAuto_Temp_LastPageCalled")).page)
        {
            gotoPage(getHHScriptVars("pagesIDHome"));
            logHHAuto("Go to Home after Shopping");
        }
    }
    return false;
}

var toHHMMSS = function (secs)  {
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

var checkParanoiaSpendings=function(spendingFunction)
{
    var pSpendings=new Map([]);
    // not set
    if ( getStoredValue("HHAuto_Temp_paranoiaSpendings") === undefined)
    {
        return -1;
    }
    else
    {
        pSpendings = JSON.parse(getStoredValue("HHAuto_Temp_paranoiaSpendings"),reviverMap);
    }

    if ( getStoredValue("HHAuto_Temp_paranoiaQuestBlocked") !== undefined && pSpendings.has('quest'))
    {
        pSpendings.delete('quest');
    }

    if ( getStoredValue("HHAuto_Temp_paranoiaLeagueBlocked") !== undefined && pSpendings.has('challenge'))
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

var clearParanoiaSpendings=function()
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
    if ( getStoredValue("HHAuto_Temp_paranoiaSpendings") === undefined)
    {
        return -1;
    }
    else
    {
        currentPSpendings = JSON.parse(getStoredValue("HHAuto_Temp_paranoiaSpendings"),reviverMap);
        if (currentPSpendings.has(inSpendingFunction))
        {
            let currValue = currentPSpendings.get(inSpendingFunction);
            currValue -= inSpent;

            if (currValue >0)
            {
                logHHAuto("Spent "+inSpent+" "+inSpendingFunction+", remains "+currValue+" before Paranoia.");
                currentPSpendings.set(inSpendingFunction,currValue);
            }
            else
            {
                currentPSpendings.delete(inSpendingFunction);
            }
        }
        logHHAuto("Remains to spend before Paranoia : "+JSON.stringify(currentPSpendings,replacerMap));
        setStoredValue("HHAuto_Temp_paranoiaSpendings", JSON.stringify(currentPSpendings,replacerMap));

    }
}

//sets spending to do before paranoia
var setParanoiaSpendings=function()
{
    var maxPointsDuringParanoia;
    var totalPointsEndParanoia;
    var paranoiaSpendings=new Map([]);
    var paranoiaSpend;
    var currentEnergy;
    var maxEnergy;
    var toNextSwitch;
    if (getStoredValue("HHAuto_Temp_NextSwitch") !== undefined && getStoredValue("HHAuto_Setting_paranoiaSpendsBefore") === "true")
    {
        toNextSwitch = Number((getStoredValue("HHAuto_Temp_NextSwitch")-new Date().getTime())/1000);

        //if autoLeague is on
        if(getHHScriptVars('isEnabledLeagues',false) && getStoredValue("HHAuto_Setting_autoLeagues") === "true" && getHHVars('Hero.infos.level')>=20)
        {
            if ( getStoredValue("HHAuto_Temp_paranoiaLeagueBlocked") === undefined )
            {
                maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getHHVars('Hero.energies.challenge.next_refresh_ts')))/Number(getHHVars('Hero.energies.challenge.seconds_per_point')));
                currentEnergy=Number(getHHVars('Hero.energies.challenge.amount'));
                maxEnergy=Number(getHHVars('Hero.energies.challenge.max_amount'));
                totalPointsEndParanoia = currentEnergy+maxPointsDuringParanoia;
                //if point refreshed during paranoia would go above max
                if ( totalPointsEndParanoia >= maxEnergy)
                {
                    paranoiaSpend=totalPointsEndParanoia - maxEnergy + 1;
                    paranoiaSpendings.set("challenge",paranoiaSpend);
                    logHHAuto("Setting Paranoia spendings for league : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") spending "+paranoiaSpend);
                }
                else
                {
                    logHHAuto("Setting Paranoia spendings for league : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") No spending ");
                }
            }
        }
        //if autoquest is on
        if(getHHScriptVars('isEnabledQuest',false) && (getStoredValue("HHAuto_Setting_autoQuest") === "true" || (getHHScriptVars("isEnabledSideQuest",false) && getStoredValue("HHAuto_Setting_autoSideQuest") === "true")))
        {
            if ( getStoredValue("HHAuto_Temp_paranoiaQuestBlocked") === undefined )
            {
                maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getHHVars('Hero.energies.quest.next_refresh_ts')))/Number(getHHVars('Hero.energies.quest.seconds_per_point')));
                currentEnergy=Number(getHHVars('Hero.energies.quest.amount'));
                maxEnergy=Number(getHHVars('Hero.energies.quest.max_amount'));
                totalPointsEndParanoia = currentEnergy+maxPointsDuringParanoia;
                //if point refreshed during paranoia would go above max
                if ( totalPointsEndParanoia >= maxEnergy)
                {
                    paranoiaSpend=totalPointsEndParanoia - maxEnergy + 1;
                    paranoiaSpendings.set("quest",paranoiaSpend);
                    logHHAuto("Setting Paranoia spendings for quest : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") spending "+paranoiaSpend);
                }
                else
                {
                    logHHAuto("Setting Paranoia spendings for quest : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") No spending ");
                }
            }
        }
        //if autoTrollBattle is on
        if(getHHScriptVars('isEnabledTrollBattle',false) && getStoredValue("HHAuto_Setting_autoTrollBattle") === "true" && getHHVars('Hero.infos.questing.id_world')>0)
        {
            maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getHHVars('Hero.energies.fight.next_refresh_ts')))/Number(getHHVars('Hero.energies.fight.seconds_per_point')));
            currentEnergy=Number(getHHVars('Hero.energies.fight.amount'));
            maxEnergy=Number(getHHVars('Hero.energies.fight.max_amount'));
            totalPointsEndParanoia = currentEnergy+maxPointsDuringParanoia;
            //if point refreshed during paranoia would go above max
            if ( totalPointsEndParanoia >= maxEnergy)
            {
                paranoiaSpend=totalPointsEndParanoia - maxEnergy + 1;
                paranoiaSpendings.set("fight",paranoiaSpend);
                logHHAuto("Setting Paranoia spendings for troll : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") spending "+paranoiaSpend);
            }
            else
            {
                logHHAuto("Setting Paranoia spendings for troll : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") No spending ");
            }
        }
        //if autoSeason is on
        if(getHHScriptVars('isEnabledSeason',false) && getStoredValue("HHAuto_Setting_autoSeason") === "true")
        {
            maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getHHVars('Hero.energies.kiss.next_refresh_ts')))/Number(getHHVars('Hero.energies.kiss.seconds_per_point')));
            currentEnergy=Number(getHHVars('Hero.energies.kiss.amount'));
            maxEnergy=Number(getHHVars('Hero.energies.kiss.max_amount'));
            totalPointsEndParanoia = currentEnergy+maxPointsDuringParanoia;
            //if point refreshed during paranoia would go above max
            if ( totalPointsEndParanoia >= maxEnergy)
            {
                paranoiaSpend=totalPointsEndParanoia - maxEnergy + 1;
                paranoiaSpendings.set("kiss",paranoiaSpend);
                logHHAuto("Setting Paranoia spendings for Season : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") spending "+paranoiaSpend);
            }
            else
            {
                logHHAuto("Setting Paranoia spendings for Season : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") No spending ");
            }
        }
        //if autoPantheon is on
        if(getHHScriptVars('isEnabledPantheon',false) && getStoredValue("HHAuto_Setting_autoPantheon") === "true")
        {
            maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getHHVars('Hero.energies.worship.next_refresh_ts')))/Number(getHHVars('Hero.energies.worship.seconds_per_point')));
            currentEnergy=Number(getHHVars('Hero.energies.worship.amount'));
            maxEnergy=Number(getHHVars('Hero.energies.worship.max_amount'));
            totalPointsEndParanoia = currentEnergy+maxPointsDuringParanoia;
            //if point refreshed during paranoia would go above max
            if ( totalPointsEndParanoia >= maxEnergy)
            {
                paranoiaSpend=totalPointsEndParanoia - maxEnergy + 1;
                paranoiaSpendings.set("worship",paranoiaSpend);
                logHHAuto("Setting Paranoia spendings for Pantheon : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") spending "+paranoiaSpend);
            }
            else
            {
                logHHAuto("Setting Paranoia spendings for Pantheon : "+currentEnergy+"+"+maxPointsDuringParanoia+" max gained in "+toNextSwitch+" secs => ("+totalPointsEndParanoia+"/"+maxEnergy+") No spending ");
            }
        }

        logHHAuto("Setting paranoia spending to : "+JSON.stringify(paranoiaSpendings,replacerMap));
        setStoredValue("HHAuto_Temp_paranoiaSpendings", JSON.stringify(paranoiaSpendings,replacerMap));
    }
}

var flipParanoia=function()
{
    var burst=getBurst();

    var Setting=getStoredValue("HHAuto_Setting_paranoiaSettings");

    var S1=Setting.split('/').map(s=>s.split('|').map(s=>s.split(':')));

    var toNextSwitch;
    var period;
    var n = new Date().getHours();
    S1[2].some(x => {if (n<x[0]) {period=x[1]; return true;}});

    if (burst)
    {
        var periods=Object.assign(...S1[1].map(d => ({[d[0]]: d[1].split('-')})));

        toNextSwitch=getStoredValue("HHAuto_Temp_NextSwitch")?Number((getStoredValue("HHAuto_Temp_NextSwitch")-new Date().getTime())/1000):randomInterval(Number(periods[period][0]),Number(periods[period][1]));

        //match mythic new wave with end of sleep
        if (getStoredValue("HHAuto_Setting_autoTrollMythicByPassParanoia") === "true" && getTimer("eventMythicNextWave") !== -1 && toNextSwitch>getSecondsLeft("eventMythicNextWave"))
        {
            logHHAuto("Forced rest only until next mythic wave.");
            toNextSwitch=getSecondsLeft("eventMythicNextWave");
        }

        //bypass Paranoia if ongoing mythic
        if (getStoredValue("HHAuto_Setting_autoTrollMythicByPassParanoia") === "true" && getStoredValue("HHAuto_Temp_eventGirl") !==undefined && JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic==="true")
        {
            //             var trollThreshold = Number(getStoredValue("HHAuto_Setting_autoTrollThreshold"));
            //             if (getStoredValue("HHAuto_Setting_buyMythicCombat") === "true" || getStoredValue("HHAuto_Setting_autoTrollMythicByPassThreshold") === "true")
            //             {
            //                 trollThreshold = 0;
            //             }
            //mythic onGoing and still have some fight above threshold
            if (Number(getHHVars('Hero.energies.fight.amount')) > 0) //trollThreshold)
            {
                logHHAuto("Forced bypass Paranoia for mythic (can fight).");
                setTimer('paranoiaSwitch',60);
                return;
            }

            //mythic ongoing and can buyCombat
            var hero=getHero();
            var price=hero.get_recharge_cost("fight");
            if (canBuyFight().canBuy
                && getHHVars('Hero.energies.fight.amount')==0
               )
            {

                logHHAuto("Forced bypass Paranoia for mythic (can buy).");
                setTimer('paranoiaSwitch',60);
                return;
            }
        }

        if ( checkParanoiaSpendings() === -1 && getStoredValue("HHAuto_Setting_paranoiaSpendsBefore") === "true" )
        {
            setStoredValue("HHAuto_Temp_NextSwitch", new Date().getTime() + toNextSwitch * 1000);
            setParanoiaSpendings();
            return;
        }

        if ( checkParanoiaSpendings() === 0 || getStoredValue("HHAuto_Setting_paranoiaSpendsBefore") === "false" )
        {
            clearParanoiaSpendings();
            cleanTempPopToStart();
            //going into hiding
            setStoredValue("HHAuto_Temp_burst", "false");
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
        setStoredValue("HHAuto_Temp_autoLoop", "false");
        logHHAuto("setting autoloop to false");
        setStoredValue("HHAuto_Temp_burst", "true");
        var b=S1[0][0][0].split('-');
        toNextSwitch=randomInterval(Number(b[0]),Number(b[1]));
    }
    var ND=new Date().getTime() + toNextSwitch * 1000;
    var message=period+(burst?" rest":" burst");
    logHHAuto("PARANOIA: "+message);
    setStoredValue("HHAuto_Temp_pinfo", message);

    setTimer('paranoiaSwitch',toNextSwitch);
    //force recheck non completed event after paranoia
    if (getStoredValue("HHAuto_Temp_burst") =="true")
    {
        let eventList = isJSON(getStoredValue("HHAuto_Temp_eventsList"))?JSON.parse(getStoredValue("HHAuto_Temp_eventsList")):{};
        for (let eventID of Object.keys(eventList))
        {
            //console.log(eventID);
            if (!eventList[eventID]["isCompleted"])
            {
                eventList[eventID]["next_refresh"]=new Date().getTime()-1000;
                //console.log("expire");
                if(Object.keys(eventList).length >0)
                {
                    setStoredValue("HHAuto_Temp_eventsList", JSON.stringify(eventList));
                }
            }
        }
        //sessionStorage.removeItem("HHAuto_Temp_eventsList");
        gotoPage(getHHScriptVars("pagesIDHome"));
    }
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

function calculatePlayersBonuses(inPlayerTeamElement, inOpponentTeamElement)
{
    let playerBonus = 0;
    let opponentBonus = 0;

    for (let i=0; i<inOpponentTeamElement.length; i++) {
        for (let j=0; j<inPlayerTeamElement.length; j++) {
            switch (inOpponentTeamElement[i]) {
                case "fire":
                    if (inPlayerTeamElement[j] == "water")
                        playerBonus += 1;
                    else if (inPlayerTeamElement[j] == "nature")
                        opponentBonus += 1;
                    break;
                case "nature":
                    if (inPlayerTeamElement[j] == "fire")
                        playerBonus += 1;
                    else if (inPlayerTeamElement[j] == "stone")
                        opponentBonus += 1;
                    break;
                case "stone":
                    if (inPlayerTeamElement[j] == "nature")
                        playerBonus += 1;
                    else if (inPlayerTeamElement[j] == "sun")
                        opponentBonus += 1;
                    break;
                case "sun":
                    if (inPlayerTeamElement[j] == "stone")
                        playerBonus += 1;
                    else if (inPlayerTeamElement[j] == "water")
                        opponentBonus += 1;
                    break;
                case "water":
                    if (inPlayerTeamElement[j] == "sun")
                        playerBonus += 1;
                    else if (inPlayerTeamElement[j] == "fire")
                        opponentBonus += 1;
                    break;
            }
        }
    }

    return {playerBonus:playerBonus, opponentBonus:opponentBonus};
}

function getLeaguePlayersData(inHeroLeaguesData, inPlayerLeaguesData)
{
    const {
        chance: playerCrit,
        damage: playerAtk,
        defense: playerDef,
        remaining_ego: playerEgo,
        team: playerTeam
    } = inHeroLeaguesData
    let playerElements;
    let playerSynergies
    if (playerTeam.theme_elements != undefined && playerTeam.synergies != undefined)
    {
        playerElements = playerTeam.theme_elements.map(({type}) => type);
        playerSynergies = playerTeam.synergies
    }
    else
    {
        const playerTeam_new = $('#leagues_left').find('.team-hexagon-container .team-member img').map((i, el) => $(el).data('new-girl-tooltip')).toArray();
        const playerTeamMemberElements = playerTeam_new.map(({element_data: {type: element}})=>element);
        playerElements = calculateThemeFromElements(playerTeamMemberElements);
        const playerSynergyDataJSON = $('#leagues_left').find('.hexa .icon-area').attr('synergy-data');
        playerSynergies = JSON.parse(playerSynergyDataJSON);
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
        name: $('#leagues_right .leagues_team_block .title').text(),
        bonuses: opponentBonuses
    };
    return {player:player, opponent:opponent, dominanceBonuses:dominanceBonuses}
}

function moduleSimLeague() {
    //let matchRating;
    //let matchRatingFlag;

    if ($("#popup_message_league").length >0)
    {
        return;
    }
    let girlDataName=getHHScriptVars('girlToolTipData');

    let SimPower = function()
    {
        if ($("div.matchRatingNew img#powerLevelScouter").length !== 0)
        {
            return;
        }

        let opponentData;
        const opponentId = $('#leagues_right .avatar_border>img').attr('hero-page-id');
        const loadedLeaguePlayers = getHHVars("loadedLeaguePlayers");
        if(Object.keys(loadedLeaguePlayers).length) opponentData = loadedLeaguePlayers[opponentId].player;
        else opponentData = getHHVars("opponent_fighter.player");
        let leaguePlayers = getLeaguePlayersData(getHHVars("hero_fighter"), opponentData);
        //console.log("HH simuFight",JSON.stringify(leaguePlayers.player),JSON.stringify(leaguePlayers.opponent));
        let simu = calculateBattleProbabilities(leaguePlayers.player, leaguePlayers.opponent);
        //console.log(opponent);
        //console.log(simu);
        //matchRating=customMatchRating(simu);

        //Publish the ego difference as a match rating
        //matchRatingFlag = matchRating.substring(0,1);
        //matchRating = matchRating.substring(1);
        var opponentsTempPowerList = isJSON(getStoredValue("HHAuto_Temp_LeagueTempOpponentList"))?JSON.parse(getStoredValue("HHAuto_Temp_LeagueTempOpponentList")):{expirationDate:new Date().getTime() + getHHScriptVars("LeagueListExpirationSecs") * 1000,opponentsList:{}};
        var DataOppo = opponentsTempPowerList.opponentsList;

        const oppoPoints = simu.points;
        let expectedValue = 0;
        for (let i=25; i>=3; i--) {
            if (oppoPoints[i]) {
                expectedValue += i*oppoPoints[i];
            }
        }

        const pointText = `${nRounding(100*simu.win, 2, -1)}% (${nRounding(expectedValue, 1, -1)})`;
        $('div#leagues_right .leagues_team_block  .challenge').prepend(`<div class="matchRatingNew ${simu.scoreClass}"><img id="powerLevelScouter" src=${getHHScriptVars("powerCalcImages")[simu.scoreClass]}>${pointText}</div>`);

        if($('tr.lead_table_default td span.nickname span.OppoScore').length > 0) {
            $('tr.lead_table_default td span.nickname span.OppoScore').remove();
        }
        $("tr.lead_table_default td span.nickname").append(`<span class='OppoScore ${simu.scoreClass}' title="${pointText}"><span style="margin:0;" id="HHPowerCalcScore">${nRounding(100*simu.win, 2, -1)}</span>% (<span style="margin:0;" id="HHPowerCalcPoints">${nRounding(expectedValue, 1, -1)}</span>)</span>`);
        DataOppo[Number(opponentData.id_fighter)]=simu;
        setStoredValue("HHAuto_Temp_LeagueTempOpponentList", JSON.stringify({expirationDate:opponentsTempPowerList.expirationDate,opponentsList:DataOppo}));

        //CSS

        GM_addStyle('#leagues_right .leagues_team_block  .lead_player_profile .level_wrapper {'
                    + 'top: -8px !important;}'
                   );

        GM_addStyle('#leagues_right .leagues_team_block  .lead_player_profile .icon {'
                    + 'top: 5px !important;}'
                   );

        GM_addStyle('@media only screen and (min-width: 1026px) {'
                    + '.matchRatingNew {'
                    + 'position: absolute;'
                    + 'margin-top: -25px; '
                    + 'margin-left: 20px; '
                    + 'text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000; '
                    + 'line-height: 17px; '
                    + 'font-size: 14px;}}'
                   );

        GM_addStyle('@media only screen and (max-width: 1025px) {'
                    + '.matchRatingNew {'
                    + 'text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000; '
                    + 'line-height: 17px; '
                    + 'font-size: 14px;}}'
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
                    + 'margin-left: -8px; '
                    + 'margin-right: 1px; '
                    + 'width: 25px;}'
                   );

        //Replace opponent excitement with the correct value
        //$('div#leagues_right div.stats_wrap div:nth-child(9) span:nth-child(2)').empty().append(nRounding(opponentExcitement, 0, 1));

        //Replace player excitement with the correct value
        //$('div#leagues_left div.stats_wrap div:nth-child(9) span:nth-child(2)').empty().append(nRounding(playerExcitement, 0, 1));
    }

    SimPower();

    // Refresh sim on new opponent selection (Credit: BenBrazke)
    var opntName;
    $('.leadTable').click(function()
                          {
        opntName=''
    })
    function waitOpnt() {
        setTimeout(function() {
            if (JSON.parse($('div#leagues_right .leagues_team_block  .team-hexagon-container .team-member-container[data-team-member-position=0] img').attr(girlDataName)))
            {
                SimPower();
            }
            else {
                waitOpnt()
            }
        }, 50);
    }
    var observeCallback = function()
    {
        var opntNameNew = $('div#leagues_right div.leagues_team_block .title')[0].innerHTML
        if (opntName !== opntNameNew)
        {
            opntName = opntNameNew;
            waitOpnt();
        }
    }
    var observer = new MutationObserver(observeCallback);
    var test = document.getElementById('leagues_right');
    observer.observe(test, {attributes: false, childList: true, subtree: false});


    function DisplayMatchScore() {
        if ($('tr[sorting_id] td span.nickname span.OppoScore').length > 1)
        {
            return
        }

        let opponentsIDList = getLeagueOpponentListData();
        let sorting_id;
        let player;
        let opponentsPowerList = isJSON(getStoredValue("HHAuto_Temp_LeagueOpponentList")) ? JSON.parse(getStoredValue("HHAuto_Temp_LeagueOpponentList")) : -1;
        let opponentsTempPowerList = isJSON(getStoredValue("HHAuto_Temp_LeagueTempOpponentList")) ? JSON.parse(getStoredValue("HHAuto_Temp_LeagueTempOpponentList")) : -1;
        let maxScore = -1;
        let IdOppo = -1;
        let OppoScore;

        //console.log(opponentsPowerList,opponentsTempPowerList,opponentsListExpirationDate,opponentsListExpirationDate < new Date());
        if (opponentsPowerList === -1 ||  opponentsPowerList.expirationDate < new Date())
        {
            opponentsPowerList = opponentsTempPowerList;
        }

        if (opponentsPowerList === -1 ||  opponentsPowerList.expirationDate < new Date())
        {
            return;
        }

        for (let oppo of opponentsIDList)
        {
            const oppoSimu = opponentsPowerList.opponentsList[Number(oppo)];
            if (oppoSimu === undefined)
            {
                continue;
            }
            OppoScore = Number(oppoSimu.win);
            const oppoPoints = oppoSimu.points;
            let expectedValue = 0;
            if ($('tr[sorting_id=' + oppo + '] td span.nickname').length > 0 && opponentsPowerList.opponentsList[Number(oppo)] !== undefined)
            {
                for (let i=25; i>=3; i--) {
                    if (oppoPoints[i]) {
                        expectedValue += i*oppoPoints[i];
                    }
                }
                $('tr[sorting_id=' + oppo + '] td span.nickname').append(`<span class='OppoScore ${oppoSimu.scoreClass}'><span style="margin:0;" id="HHPowerCalcScore">${nRounding(100*OppoScore, 2, -1)}</span>% (<span style="margin:0;" id="HHPowerCalcPoints">${nRounding(expectedValue, 1, -1)}</span>)</span>`);

            }
        }

    }
    DisplayMatchScore();
    // Refresh sim on new opponent selection (Credit: BenBrazke)
    var opntName2;
    $('#leagues_middle').click(function() {
        opntName2=''
    })
    function waitOpnt2() {
        setTimeout(function() {
            if ($('div#leagues_middle div.leagues_table .personal_highlight').length >0) {
                DisplayMatchScore();
            }
            else {
                waitOpnt2()
            }
        }, 50);
    }
    var observeCallback2 = function() {
        var opntNameNew2 = $('div#leagues_middle div.leagues_table thead')[0].innerHTML
        if (opntName2 !== opntNameNew2) {
            opntName2 = opntNameNew2;
            waitOpnt2();
        }
    }
    var observer2 = new MutationObserver(observeCallback2);
    var test2 = $('div#leagues_middle div.leagues_table tbody')[0];
    observer2.observe(test2, {attributes: true, childList: true, subtree: false});

    moduleSimLeagueHideBeatenOppo();

    let buttonLaunchList='<div style="position: absolute;left: 300px;top: 14px;width:100px;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("RefreshOppoList","tooltip")+'</span><label style="width:100%;" class="myButton" id="RefreshOppoList">'+getTextForUI("RefreshOppoList","elementText")+'</label></div>';
    if (document.getElementById("RefreshOppoList") === null)
    {
        $("#leagues_middle").append(buttonLaunchList);
        document.getElementById("RefreshOppoList").addEventListener("click", function()
                                                                    {
            document.getElementById("RefreshOppoList").remove();
            $('tr[sorting_id] td span.nickname span.OppoScore').each(function () {
                this.remove();
            });
            getLeagueOpponentId(getLeagueOpponentListData(),true);
        });
    }
    let buttonSortList='<div style="position: absolute;left: 410px;top: 14px;width:75px;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("sortPowerCalc","tooltip")+'</span><label style="width:100%;" class="myButton" id="sortPowerCalc">'+getTextForUI("sortPowerCalc","elementText")+'</label></div>';
    const league_table = $('#leagues_middle tbody.leadTable');
    if (document.getElementById("sortPowerCalc") === null && $('.OppoScore',league_table).length >0)
    {
        $('#leagues_middle').append(buttonSortList);
        document.getElementById("sortPowerCalc").addEventListener("click", function ()
                                                                  {
            let items = $('tr',league_table).map((i, el) => el).toArray();
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
        });
    }

}

function moduleSimLeagueHideBeatenOppo()
{
    const beatenOpponents ='<div style="position: absolute;left: 190px;top: 14px;width:100px;"  class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("HideBeatenOppo","tooltip")+'</span><label style="width:100%;" class="myButton" id="HideBeatenOppo">'+getTextForUI("HideBeatenOppo","elementText")+'</label></div>';
    if (
        document.getElementById("beaten_opponents") === null // button from HH OCD script
        &&  document.getElementById("HideBeatenOppo") === null 
    )
    { 
        function removeBeatenOpponents() {
            var board = document.getElementsByClassName("leadTable")[0];
            if(!board) return;
            var opponents = board.getElementsByTagName("tr");
            for (var i=0; i<opponents.length; i++) {
                try {
                    const playerId = $(opponents[i]).attr('sorting_id');
                    if(unsafeWindow.leagues_list.find(({id_player}) => id_player === playerId).nb_challenges_played === "3" && opponents[i].className.indexOf('selected-player-leagues') == -1){
                        opponents[i].style.display="none";
                    }
                } catch(e) {}
            }
            $('.lead_table_view').getNiceScroll().resize()
        }

        function displayBeatenOpponents() {
            var board = document.getElementsByClassName("leadTable")[0];
            if(!board) return;
            var opponents = board.getElementsByTagName("tr");
            for (var i=0; i<opponents.length; i++) {
                try {
                    const playerId = $(opponents[i]).attr('sorting_id');
                    if(unsafeWindow.leagues_list.find(({id_player}) => id_player === playerId).nb_challenges_played === "3"){
                        opponents[i].style.display="";
                    }
                } catch(e) {}
            }
            $('.lead_table_view').getNiceScroll().resize()
        }

        $("#leagues_middle").append(beatenOpponents);

        let hideBeatenOppo = getStoredValue("HHAuto_Temp_hideBeatenOppo");
        if (!hideBeatenOppo) {
            hideBeatenOppo = 0;
            setStoredValue("HHAuto_Temp_hideBeatenOppo", hideBeatenOppo);
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
                setStoredValue("HHAuto_Temp_hideBeatenOppo", hideBeatenOppo);
                $('#HideBeatenOppo').html(getTextForUI("display","elementText"));
            }
            else {
                displayBeatenOpponents();
                hideBeatenOppo = 0;
                setStoredValue("HHAuto_Temp_hideBeatenOppo", hideBeatenOppo);
                $('#HideBeatenOppo').html(getTextForUI("HideBeatenOppo","elementText"));
            }
        });
    }
}

function moduleHarem()
{


    var emptyStar = emptyStar ? emptyStar : 0;
    function haremEmptyStar(classHide) {
        if ($('#emptyStarPanel').length == 0) {
            let emptyStarArray0 = $("div.girls_list div[girl]:not(.not_owned) g." + classHide);
            $('#harem_left').append('<div id="emptyStarPanel">'
                                    + '<div id="emptyStarPanel-moveLeft">'
                                    + '</div>'
                                    + '<g id="iconHideStars" class="can_upgrade" ></g>' //onclick="switchHideButton();"
                                    + '<div id="emptyStarPanel-moveRight">'
                                    + '</div>'
                                    + '<div id="emptyStarPanel-description">' + emptyStarArray0.length
                                    + '</div>'
                                    + '</div>');
            $('#emptyStarPanel div#emptyStarPanel-moveRight')[0].addEventListener("click", function () {
                setOffsetEmptyStar(1);
            }, true);
            $('#emptyStarPanel div#emptyStarPanel-moveLeft')[0].addEventListener("click", function () {
                setOffsetEmptyStar(-1);
            }, true);
            GM_addStyle('#emptyStarPanel {'
                        + 'z-index: 99; '
                        + 'width: 50px; '
                        + 'padding: 3px 10px 0 3px; '
                        + 'position: absolute; bottom: 23px;right: 10px;}');

            GM_addStyle('#emptyStarPanel div:hover {'
                        + 'opacity: 1; '
                        + 'cursor: pointer;}');

            GM_addStyle('#emptyStarPanel {'
                        + 'z-index: 99;'
                        + 'width: 120px;'
                        + 'padding: 0;'
                        + 'position: absolute;'
                        + 'bottom: 17px;'
                        + 'right: -24px;'
                        + 'height: 50px;}');

            GM_addStyle('#emptyStarPanel-moveRight, #emptyStarPanel-moveLeft {'
                        + 'width: 0;'
                        + 'float: left;'
                        + 'border: 20px solid transparent;'
                        + 'height: 0;'
                        + 'opacity: 0.5;'
                        + 'margin:-1px;}');

            GM_addStyle('#emptyStarPanel-description {'
                        + 'width: 110px;'
                        + 'line-height: 20px;'
                        + 'text-align: center;}');

            GM_addStyle('#emptyStarPanel g {'
                        + 'background-size: 100% auto;'
                        + 'width: 38px;'
                        + 'float: left;'
                        + 'height: 34px;'
                        + 'opacity: 1;}');
            GM_addStyle('#emptyStarPanel g.grey {'
                        + 'background-image: url(https://hh.hh-content.com/design_v2/affstar_empty_S.png);}');
            GM_addStyle('#emptyStarPanel g.can_upgrade {'
                        + 'background-image: url(https://hh.hh-content.com/design_v2/affstar_upgrade.png);}');

            GM_addStyle('#emptyStarPanel div#emptyStarPanel-moveLeft {'
                        + 'border-right-color: red;}');

            GM_addStyle('#emptyStarPanel div#emptyStarPanel-moveRight {'
                        + 'border-left-color: red;}');
        }
    }
    function switchHideButton() {
        if ($('#emptyStarPanel g')[0].className == 'grey') {
            $('#emptyStarPanel g')[0].className = 'can_upgrade'
        } else {
            $('#emptyStarPanel g')[0].className = 'grey'
        }
        emptyStar = 0;
        setOffsetEmptyStar(0);
    }
    function haremHideStars() {
        let girlArrayHide = $('div[id_girl] div[girl]:not(.not_owned) .g_infos .graded');
        if (girlArrayHide.length > 0) {
            for (let i = 0; i < girlArrayHide.length; i++) {
                if ($(girlArrayHide[i]).find('g[class]').length == 0) {
                    girlArrayHide[i].parentElement.parentElement.parentElement.parentElement.style.display = "none";
                }
            }
        }
    }
    function setOffsetEmptyStar(offer) {
        let classHide = $('#emptyStarPanel g#iconHideStars')[0].className == "grey" ? "grey" : ($('#emptyStarPanel g#iconHideStars')[0].className == "can_upgrade" ? "green" : "");
        let emptyStarArray = $("div.girls_list div[girl]:not(.not_owned) g." + classHide);
        if (emptyStarArray.length == 0) {
            $('#emptyStarPanel-description')[0].innerHTML = '0';
            return;
        }
        emptyStar = Number(emptyStar) + Number(offer);
        if (emptyStar < 0) {
            emptyStar = emptyStarArray.length - 1;
        }
        if (emptyStar > emptyStarArray.length - 1) {
            emptyStar = 0;
        }
        $(".girls_list g." + classHide + "[style]").each(function () {
            this.removeAttribute("style");
        });
        emptyStarArray[emptyStar].scrollIntoView({
            block: "center",
            inline: "nearest"
        });
        let borderColor = classHide == "grey" ? "red" : (classHide == "green" ? "#1ff51f" : "red");
        emptyStarArray[emptyStar].style.border = '3px ' + borderColor + ' dashed';
        emptyStarArray[emptyStar].style.padding = '8px';
        $('#emptyStarPanel-description')[0].innerHTML = (Number(emptyStar) + 1) + '/' + emptyStarArray.length;
    }

    /*if ($('#emptyStarPanel g').length >0 && $('#emptyStarPanel g.green').length >0)
    {
        haremEmptyStar("green");
    }
    else
    {
        haremEmptyStar("grey");
    }
    */

    //haremEmptyStar("green");
}


function moduleSimSeasonBattle()
{
    let doDisplay=false;
    let mojoOppo=[];
    let scoreOppo=[];
    let nameOppo=[];
    let expOppo=[];
    let affOppo=[];
    try
    {
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
            mojoOppo[index]=Number($(".slot_victory_points p",opponents[index])[0].innerText);
            //logHHAuto(mojoOppo[index]);
            nameOppo[index]=opponentName;
            expOppo[index]=Number($(".slot_season_xp_girl",opponents[index])[0].lastElementChild.innerText.replace(/\D/g, ''));
            affOppo[index]=Number($(".slot_season_affection_girl",opponents[index])[0].lastElementChild.innerText.replace(/\D/g, ''));
            //Publish the ego difference as a match rating
            //matchRatingFlag = matchRating.substring(0,1);
            //matchRating = matchRating.substring(1);

            if (doDisplay)
            {
                $('.player-team .icon-area',opponents[index]).prepend(`<div class="matchRatingNew ${simu.scoreClass}"><img id="powerLevelScouter" src=${getHHScriptVars("powerCalcImages")[simu.scoreClass]}>${nRounding(100*simu.win, 2, -1)}%</div>`);
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
        if (numberOfReds === 3 && getStoredValue("HHAuto_Setting_autoSeasonPassReds") === "true" && getHHVars('Hero.currencies.hard_currency')>=price+Number(getStoredValue("HHAuto_Setting_kobanBank")))
        {
            chosenID = -2;
        }

        //logHHAuto("Best opportunity opponent : "+oppoName+'('+chosenRating+')');
        if (doDisplay)
        {

            $($('div.season_arena_opponent_container div.matchRatingNew')[chosenID]).append(`<img id="powerLevelScouterChosen" src=${getHHScriptVars("powerCalcImages").chosen}>`);

            //CSS

            GM_addStyle('.matchRatingNew {'
                        + 'text-align: center; '
                        + 'margin-right: 5px; '
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
                        + 'margin-left: -8px; '
                        + 'margin-right: 1px; '
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
        logHHAuto("Catched error : Could not display season score : "+err);
        return -1;
    }
}

function CheckSpentPoints()
{
    let oldValues=getStoredValue("HHAuto_Temp_CheckSpentPoints")?JSON.parse(getStoredValue("HHAuto_Temp_CheckSpentPoints")):-1;
    let newValues={};
    if (getHHScriptVars('isEnabledTrollBattle',false))
    {
        newValues['fight']=Number(getHHVars('Hero.energies.fight.amount'));
    }
    if (getHHScriptVars('isEnabledSeason',false))
    {
        newValues['kiss']=Number(getHHVars('Hero.energies.kiss.amount'));
    }
    if (getHHScriptVars('isEnabledQuest',false))
    {
        newValues['quest']=Number(getHHVars('Hero.energies.quest.amount'));
    }
    if (getHHScriptVars('isEnabledLeagues',false))
    {
        newValues['challenge']=Number(getHHVars('Hero.energies.challenge.amount'));
    }
    if (getHHScriptVars('isEnabledPantheon',false))
    {
        newValues['worship']=Number(getHHVars('Hero.energies.worship.amount'));
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
        setStoredValue("HHAuto_Temp_CheckSpentPoints", JSON.stringify(newValues));

        if (getHHScriptVars('isEnabledLeagues',false) && newValues['challenge'] > (oldValues['challenge'] +1))
        {
            logHHAuto("Seems league point bought, resetting timer.");
            clearTimer('nextLeaguesTime');
        }
        if (getHHScriptVars('isEnabledSeason',false) && newValues['kiss'] > (oldValues['kiss'] +1))
        {
            logHHAuto("Seems season point bought, resetting timer.");
            clearTimer('nextSeasonTime');
        }
        if (getHHScriptVars('isEnabledPantheon',false) && newValues['worship'] > (oldValues['worship'] +1))
        {
            logHHAuto("Seems Pantheon point bought, resetting timer.");
            clearTimer('nextPantheonTime');
        }
    }
    else
    {
        setStoredValue("HHAuto_Temp_CheckSpentPoints", JSON.stringify(newValues));
    }
}

function isFocused()
{
    //let isFoc = false;
    const docFoc = document.hasFocus();
    //const iFrameFoc = $('iframe').length===0?false:$('iframe')[0].contentWindow.document.hasFocus();
    //isFoc = docFoc || iFrameFoc;
    return docFoc;
}

function checkAndClosePopup(inBurst)
{
    const popUp = $('#popup_message[style*="display: block"]');
    if ((inBurst || isFocused()) && popUp.length > 0)
    {
        $('close', popUp).click();
    }
}

var busy = false;

var autoLoop = function ()
{
    updateData();
    if (getStoredValue("HHAuto_Temp_questRequirement") === undefined)
    {
        setStoredValue("HHAuto_Temp_questRequirement", "none");
    }
    if (getStoredValue("HHAuto_Temp_battlePowerRequired") === undefined)
    {
        setStoredValue("HHAuto_Temp_battlePowerRequired", "0");
    }

    //var busy = false;
    busy = false;
    var page = window.location.href;
    var currentPower = getHHVars('Hero.energies.fight.amount');

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
        checkAndCleanBoostersData();
        CheckSpentPoints();

        //check what happen to timer if no more wave before uncommenting
        /*if (getStoredValue("HHAuto_Setting_plusEventMythic") ==="true" && checkTimerMustExist('eventMythicNextWave'))
        {
            gotoPage(getHHScriptVars("pagesIDHome"));
        }
        */

        //if a new event is detected
        let eventQuery = '#contains_all #homepage .event-widget a[rel="event"]:not([href="#"])';
        let mythicEventQuery = '#contains_all #homepage .event-widget a[rel="mythic_event"]:not([href="#"])';
        let bossBangEventQuery = '#contains_all #homepage .event-widget a[rel="boss_bang_event"]:not([href="#"])';
        let sultryMysteriesEventQuery = '#contains_all #homepage .event-widget a[rel="sm_event"]:not([href="#"])';
        let seasonalEventQuery = '#contains_all #homepage .seasonal-event a';
        let eventIDs=[];
        let bossBangEventIDs=[];
        let sultryMysteriesEventIDs=[];
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
                if (queryStringGetParam(parsedURL.search,'tab') !== null && checkEvent(queryStringGetParam(parsedURL.search,'tab')))
                {
                    eventIDs.push(queryStringGetParam(parsedURL.search,'tab'));
                }
            }
            queryResults=$(mythicEventQuery);
            for(let index = 0;index < queryResults.length;index++)
            {
                parsedURL = new URL(queryResults[index].getAttribute("href"),window.location.origin);
                if (queryStringGetParam(parsedURL.search,'tab') !== null && checkEvent(queryStringGetParam(parsedURL.search,'tab')))
                {
                    eventIDs.push(queryStringGetParam(parsedURL.search,'tab'));
                }
            }
            queryResults=$(bossBangEventQuery);
            for(let index = 0;index < queryResults.length;index++)
            {
                parsedURL = new URL(queryResults[index].getAttribute("href"),window.location.origin);
                if (queryStringGetParam(parsedURL.search,'tab') !== null && checkEvent(queryStringGetParam(parsedURL.search,'tab')))
                {
                    bossBangEventIDs.push(queryStringGetParam(parsedURL.search,'tab'));
                }
            }
            queryResults=$(sultryMysteriesEventQuery);
            for(let index = 0;index < queryResults.length;index++)
            {
                parsedURL = new URL(queryResults[index].getAttribute("href"),window.location.origin);
                if (queryStringGetParam(parsedURL.search,'tab') !== null && checkEvent(queryStringGetParam(parsedURL.search,'tab')))
                {
                    sultryMysteriesEventIDs.push(queryStringGetParam(parsedURL.search,'tab'));
                }
            }
            queryResults=$(seasonalEventQuery);
            if(getStoredValue("HHAuto_Setting_autoSeasonalEventCollect") === "true" && queryResults == 0)
            {
                logHHAuto("No seasonal event found, deactivate auto collect.");
                setStoredValue("HHAuto_Setting_autoSeasonalEventCollect", "false");
            }
        }
        if(
            busy === false
            && getHHScriptVars("isEnabledEvents",false)
            &&
            (
                (
                    eventIDs.length > 0
                    && getPage() !== getHHScriptVars("pagesIDEvent")
                )
                ||
                (
                    getPage()===getHHScriptVars("pagesIDEvent")
                    && $("#contains_all #events[parsed]").length === 0
                )
            )
        )
            //&& ( getStoredValue("HHAuto_Temp_EventFightsBeforeRefresh") === undefined || getTimer('eventRefreshExpiration') === -1 || getStoredValue("HHAuto_Temp_eventGirl") === undefined)
        {
            logHHAuto("Going to check on events.");
            busy = true;
            busy = parseEventPage(eventIDs[0]);
        }

        if (busy===false && getHHScriptVars("isEnabledShop",false) && ( getStoredValue("HHAuto_Setting_paranoia") !== "true" || !checkTimer("paranoiaSwitch") )  && getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            if (getStoredValue("HHAuto_Temp_charLevel") ===undefined)
            {
                setStoredValue("HHAuto_Temp_charLevel", 0);
            }
            if (checkTimer('nextShopTime') || getStoredValue("HHAuto_Temp_charLevel")<getHHVars('Hero.infos.level')) {
                logHHAuto("Time to check shop.");
                busy = updateShop();
            }
        }

        if(busy === false && getHHScriptVars("isEnabledPowerPlaces",false) && getStoredValue("HHAuto_Setting_autoPowerPlaces") === "true" && getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {

            var popToStart = getStoredValue("HHAuto_Temp_PopToStart")?JSON.parse(getStoredValue("HHAuto_Temp_PopToStart")):[];
            if (popToStart.length != 0 || checkTimer('minPowerPlacesTime'))
            {
                //if PopToStart exist bypass function
                var popToStartExist = getStoredValue("HHAuto_Temp_PopToStart")?true:false;
                //logHHAuto("startcollect : "+popToStartExist);
                if (! popToStartExist)
                {
                    //logHHAuto("pop1:"+popToStart);
                    logHHAuto("Go and collect");
                    busy = true;
                    busy = collectAndUpdatePowerPlaces();
                }
                var indexes=(getStoredValue("HHAuto_Setting_autoPowerPlacesIndexFilter")).split(";");

                popToStart = getStoredValue("HHAuto_Temp_PopToStart")?JSON.parse(getStoredValue("HHAuto_Temp_PopToStart")):[];
                //console.log(indexes, popToStart);
                for(var pop of popToStart)
                {
                    if (busy === false && ! indexes.includes(String(pop)))
                    {
                        logHHAuto("PoP is no longer in list :"+pop+" removing it from start list.");
                        removePopFromPopToStart(pop);
                    }
                }
                popToStart = getStoredValue("HHAuto_Temp_PopToStart")?JSON.parse(getStoredValue("HHAuto_Temp_PopToStart")):[];
                //logHHAuto("pop2:"+popToStart);
                for(var index of indexes)
                {
                    if (busy === false && popToStart.includes(Number(index)))
                    {
                        logHHAuto("Time to do PowerPlace"+index+".");
                        busy = true;
                        busy = doPowerPlacesStuff(index);
                    }
                }
                if (busy === false)
                {
                    //logHHAuto("pop3:"+getStoredValue("HHAuto_Temp_PopToStart"));
                    popToStart = getStoredValue("HHAuto_Temp_PopToStart")?JSON.parse(getStoredValue("HHAuto_Temp_PopToStart")):[];
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
                && getStoredValue("HHAuto_Temp_autoLoop") === "true"
                && canCollectCompetitionActive()
            )
        {
            busy = true;
            doBattle();
        }

        if(busy === false && getHHScriptVars("isEnabledTrollBattle",false) && getStoredValue("HHAuto_Setting_autoTrollBattle") === "true" && getHHVars('Hero.infos.questing.id_world')>0 && getStoredValue("HHAuto_Temp_autoLoop") === "true" && canCollectCompetitionActive())
        {
            //logHHAuto("fight amount: "+currentPower+" troll threshold: "+Number(getStoredValue("HHAuto_Setting_autoTrollThreshold"))+" paranoia fight: "+Number(checkParanoiaSpendings('fight')));
            if
                (
                    //normal case
                    (
                        Number(currentPower) >= Number(getStoredValue("HHAuto_Temp_battlePowerRequired"))
                        && Number(currentPower) > 0
                        &&
                        (
                            Number(currentPower) > Number(getStoredValue("HHAuto_Setting_autoTrollThreshold")) //fight is above threshold
                            || getStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest") === "true"
                        )
                    )
                    || Number(checkParanoiaSpendings('fight')) > 0 //paranoiaspendings to do
                    ||
                    (
                        // mythic Event Girl available and fights available
                        (
                            getStoredValue("HHAuto_Temp_eventGirl") !== undefined
                            && JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "true"
                            && getStoredValue("HHAuto_Setting_plusEventMythic") ==="true"
                        )
                        &&
                        (
                            Number(currentPower) > 0 //has fight => bypassing paranoia
                            || canBuyFight(false).canBuy // can buy fights
                        )
                    )
                    ||
                    (
                        // normal Event Girl available
                        (
                            getStoredValue("HHAuto_Temp_eventGirl") !== undefined
                            && JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "false"
                            && getStoredValue("HHAuto_Setting_plusEvent") ==="true"
                        )
                        &&
                        (
                            (
                                Number(currentPower) > 0 //has fight
                                && Number(currentPower) > Number(getStoredValue("HHAuto_Setting_autoTrollThreshold")) // above paranoia
                            )
                            || canBuyFight(false).canBuy // can buy fights
                        )
                    )
                )


            {
                setStoredValue("HHAuto_Temp_battlePowerRequired", "0");
                busy = true;
                if (getStoredValue("HHAuto_Setting_autoQuest") !== "true" || getStoredValue("HHAuto_Temp_questRequirement")[0] !== 'P')
                {
                    busy = doBossBattle();
                }
                else
                {
                    logHHAuto("AutoBattle disabled for power collection for AutoQuest.");
                    document.getElementById("autoTrollBattle").checked = false;
                    setStoredValue("HHAuto_Setting_autoTrollBattle", "false");
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
            setStoredValue("HHAuto_Temp_battlePowerRequired", "0");
        }


        if (busy === false && getHHScriptVars("isEnabledGreatPachinko",false) && getStoredValue("HHAuto_Setting_autoFreePachinko") === "true" && getStoredValue("HHAuto_Temp_autoLoop") === "true" && checkTimer("nextPachinkoTime") && canCollectCompetitionActive()) {
            logHHAuto("Time to fetch Great Pachinko.");
            busy = true;
            busy =getFreeGreatPachinko();

        }
        if (busy === false && getHHScriptVars("isEnabledMythicPachinko",false) && getStoredValue("HHAuto_Setting_autoFreePachinko") === "true" && getStoredValue("HHAuto_Temp_autoLoop") === "true" && checkTimer("nextPachinko2Time") && canCollectCompetitionActive()) {
            logHHAuto("Time to fetch Mythic Pachinko.");
            busy = true;
            busy = getFreeMythicPachinko();

        }

        if(busy === false && getHHScriptVars("isEnabledContest",false) && getStoredValue("HHAuto_Setting_autoContest") === "true" && getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            if (checkTimer('nextContestTime') || unsafeWindow.has_contests_datas ||$(".contest .ended button[rel='claim']").length>0){
                logHHAuto("Time to get contest rewards.");
                busy = doContestStuff();
            }
        }

        if(busy === false && getHHScriptVars("isEnabledMission",false) && getStoredValue("HHAuto_Setting_autoMission") === "true" && getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            if (checkTimer('nextMissionTime')){
                logHHAuto("Time to do missions.");
                busy = doMissionStuff();
            }
        }

        if (busy === false && getHHScriptVars("isEnabledQuest",false) && (getStoredValue("HHAuto_Setting_autoQuest") === "true" || (getHHScriptVars("isEnabledSideQuest",false) && getStoredValue("HHAuto_Setting_autoSideQuest") === "true")) && getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            if (getStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest") === undefined)
            {
                setStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest", "false");
            }
            let questRequirement = getStoredValue("HHAuto_Temp_questRequirement");
            if (questRequirement === "battle")
            {
                if (getHHScriptVars("isEnabledTrollBattle",false) && getStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest") === "false")
                {
                    logHHAuto("Quest requires battle.");
                    logHHAuto("prepare to save one battle for quest");
                    setStoredValue("HHAuto_Temp_autoTrollBattleSaveQuest", "true");
                    //doBossBattle();
                }
                busy = true;
            }
            else if (questRequirement[0] === '$')
            {
                if (Number(questRequirement.substr(1)) < getHHVars('Hero.currencies.soft_currency')) {
                    // We have enough money... requirement fulfilled.
                    logHHAuto("Continuing quest, required money obtained.");
                    setStoredValue("HHAuto_Temp_questRequirement", "none");
                    proceedQuest();
                    busy = true;
                }
                else
                {
                    //prevent paranoia to wait for quest
                    setStoredValue("HHAuto_Temp_paranoiaQuestBlocked", "true");
                    if(isNaN(questRequirement.substr(1)))
                    {
                        logHHAuto(questRequirement);
                        setStoredValue("HHAuto_Temp_questRequirement", "none");
                        logHHAuto("Invalid money in session storage quest requirement !");
                    }
                    busy = false;
                }
            }
            else if (questRequirement[0] === '*')
            {
                var energyNeeded = Number(questRequirement.substr(1));
                var energyCurrent = getHHVars('Hero.energies.quest.amount');
                if (energyNeeded <= energyCurrent)
                {
                    if (Number(energyCurrent) > Number(getStoredValue("HHAuto_Setting_autoQuestThreshold")) || Number(checkParanoiaSpendings('quest')) > 0 )
                    {
                        // We have enough energy... requirement fulfilled.
                        logHHAuto("Continuing quest, required energy obtained.");
                        setStoredValue("HHAuto_Temp_questRequirement", "none");
                        proceedQuest();
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
                    setStoredValue("HHAuto_Temp_paranoiaQuestBlocked", "true");
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
                    logHHAuto("Quest requires "+neededPower+" Battle Power for advancement. Waiting...");
                    busy = false;
                    //prevent paranoia to wait for quest
                    setStoredValue("HHAuto_Temp_paranoiaQuestBlocked", "true");
                }
                else
                {
                    logHHAuto("Battle Power obtained, resuming quest...");
                    setStoredValue("HHAuto_Temp_questRequirement", "none");
                    proceedQuest();
                    busy = true;
                }
            }
            else if (questRequirement === "unknownQuestButton")
            {
                //prevent paranoia to wait for quest
                setStoredValue("HHAuto_Temp_paranoiaQuestBlocked", "true");
                if (getStoredValue("HHAuto_Setting_autoQuest") === "true")
                {
                    logHHAuto("AutoQuest disabled.HHAuto_Setting_AutoQuest cannot be performed due to unknown quest button. Please manually proceed the current quest screen.");
                    document.getElementById("autoQuest").checked = false;
                    setStoredValue("HHAuto_Setting_autoQuest", "false");
                }
                if (getStoredValue("HHAuto_Setting_autoSideQuest") === "true")
                {
                    logHHAuto("AutoQuest disabled.HHAuto_Setting_autoSideQuest cannot be performed due to unknown quest button. Please manually proceed the current quest screen.");
                    document.getElementById("autoSideQuest").checked = false;
                    setStoredValue("HHAuto_Setting_autoSideQuest", "false");
                }
                setStoredValue("HHAuto_Temp_questRequirement", "none");
                busy = false;
            }
            else if (questRequirement === "errorInAutoBattle")
            {
                //prevent paranoia to wait for quest
                setStoredValue("HHAuto_Temp_paranoiaQuestBlocked", "true");
                if (getStoredValue("HHAuto_Setting_autoQuest") === "true")
                {
                    logHHAuto("AutoQuest disabled.HHAuto_Setting_AutoQuest cannot be performed due errors in AutoBattle. Please manually proceed the current quest screen.");
                    document.getElementById("autoQuest").checked = false;
                    setStoredValue("HHAuto_Setting_autoQuest", "false");
                }
                if (getStoredValue("HHAuto_Setting_autoSideQuest") === "true")
                {
                    logHHAuto("AutoQuest disabled.HHAuto_Setting_autoSideQuest cannot be performed due errors in AutoBattle. Please manually proceed the current quest screen.");
                    document.getElementById("autoSideQuest").checked = false;
                    setStoredValue("HHAuto_Setting_autoSideQuest", "false");
                }
                setStoredValue("HHAuto_Temp_questRequirement", "none");
                busy = false;
            }
            else if(questRequirement === "none")
            {
                if (Number(getHHVars('Hero.energies.quest.amount')) > Number(getStoredValue("HHAuto_Setting_autoQuestThreshold")) || Number(checkParanoiaSpendings('quest')) > 0 )
                {
                    //logHHAuto("NONE req.");
                    busy = true;
                    proceedQuest();
                }
            }
            else
            {
                //prevent paranoia to wait for quest
                setStoredValue("HHAuto_Temp_paranoiaQuestBlocked", "true");
                logHHAuto("Invalid quest requirement : "+questRequirement);
                busy=false;
            }
        }
        else if(getStoredValue("HHAuto_Setting_autoQuest") === "false" && getStoredValue("HHAuto_Setting_autoSideQuest") === "false")
        {
            setStoredValue("HHAuto_Temp_questRequirement", "none");
        }

        if(busy === false && getHHScriptVars("isEnabledSeason",false) && getStoredValue("HHAuto_Setting_autoSeason") === "true" && getStoredValue("HHAuto_Temp_autoLoop") === "true" && canCollectCompetitionActive())
        {
            if (Number(getHHVars('Hero.energies.kiss.amount')) > 0 && ( (Number(getHHVars('Hero.energies.kiss.amount')) > Number(getStoredValue("HHAuto_Setting_autoSeasonThreshold")) && checkTimer('nextSeasonTime')) || Number(checkParanoiaSpendings('kiss')) > 0 ) )
            {
                logHHAuto("Time to fight in Season.");
                doSeason();
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

        if(busy === false && getHHScriptVars("isEnabledPantheon",false) && getStoredValue("HHAuto_Setting_autoPantheon") === "true" && getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            if (Number(getHHVars('Hero.energies.worship.amount')) > 0 && ( (Number(getHHVars('Hero.energies.worship.amount')) > Number(getStoredValue("HHAuto_Setting_autoPantheonThreshold")) && checkTimer('nextPantheonTime')) || Number(checkParanoiaSpendings('worship')) > 0 ) )
            {
                logHHAuto("Time to do Pantheon.");
                doPantheon();
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

        if (busy==false && getHHScriptVars("isEnabledChamps",false) && getHHVars('Hero.energies.quest.amount')>=60 && getStoredValue("HHAuto_Setting_autoChampsUseEne") ==="true" && getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            function buyTicket()
            {
                var params = {
                    action: 'champion_buy_ticket',
                    currency: 'energy_quest',
                    amount: "1"
                };
                logHHAuto('Buying ticket with energy');
                hh_ajax(params, function(data) {
                    //anim_number($('.tickets_number_amount'), data.tokens - amount, amount);
                    Hero.updates(data.heroChangesUpdate);
                    location.reload();
                });
            }
            setStoredValue("HHAuto_Temp_autoLoop", "false");
            logHHAuto("setting autoloop to false");
            busy = true;
            setTimeout(buyTicket,randomInterval(800,1600));
        }

        if (busy==false && getHHScriptVars("isEnabledChamps",false) && getStoredValue("HHAuto_Setting_autoChamps") ==="true" && checkTimer('nextChampionTime') && getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            logHHAuto("Time to check on champions!");
            busy=true;
            busy=doChampionStuff();
        }

        if (busy==false && getHHScriptVars("isEnabledClubChamp",false) && getStoredValue("HHAuto_Setting_autoClubChamp") ==="true" && checkTimer('nextClubChampionTime') && getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            logHHAuto("Time to check on club champion!");
            busy=true;
            busy=doClubChampionStuff();
        }

        if(busy === false && getHHScriptVars("isEnabledLeagues",false) && getStoredValue("HHAuto_Setting_autoLeagues") === "true" && getHHVars('Hero.infos.level')>=20 && getStoredValue("HHAuto_Temp_autoLoop") === "true" && canCollectCompetitionActive())
        {
            // Navigate to leagues
            if ((checkTimer('nextLeaguesTime') && Number(getHHVars('Hero.energies.challenge.amount')) > Number(getStoredValue("HHAuto_Setting_autoLeaguesThreshold")) ) || Number(checkParanoiaSpendings('challenge')) > 0)
            {
                logHHAuto("Time to fight in Leagues.");
                doLeagueBattle();
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
            busy==false && getHHScriptVars("isEnabledSeason",false) && getStoredValue("HHAuto_Temp_autoLoop") === "true" && 
            (
                checkTimer('nextSeasonCollectTime') && getStoredValue("HHAuto_Setting_autoSeasonCollect") === "true" 
                || 
                getStoredValue("HHAuto_Setting_autoSeasonCollectAll") === "true" && checkTimer('nextSeasonCollectAllTime') && (getTimer('SeasonRemainingTime') == -1 || getSecondsLeft('SeasonRemainingTime') < getLimitTimeBeforeEnd())
            )
        )
        {
            logHHAuto("Time to go and check Season for collecting reward.");
            busy = true;
            busy = goAndCollectSeason();
        }

        if (
            busy==false && getHHScriptVars("isEnabledSeasonalEvent",false) && getStoredValue("HHAuto_Temp_autoLoop") === "true" && 
            (
                checkTimer('nextSeasonalEventCollectTime') && getStoredValue("HHAuto_Setting_autoSeasonalEventCollect") === "true"
                ||
                getStoredValue("HHAuto_Setting_autoSeasonalEventCollectAll") === "true" && checkTimer('nextSeasonalEventCollectAllTime') && (getTimer('SeasonalEventRemainingTime') == -1 || getSecondsLeft('SeasonalEventRemainingTime') < getLimitTimeBeforeEnd())
            )
        )
        {
            logHHAuto("Time to go and check SeasonalEvent for collecting reward.");
            busy = true;
            busy = goAndCollectSeasonalEvent();
        }

        if (
            busy==false && getHHScriptVars("isEnabledPoV",false) && getStoredValue("HHAuto_Temp_autoLoop") === "true" && 
            (
                checkTimer('nextPoVCollectTime') && getStoredValue("HHAuto_Setting_autoPoVCollect") === "true" 
                || 
                getStoredValue("HHAuto_Setting_autoPoVCollectAll") === "true" && checkTimer('nextPoVCollectAllTime') && (getTimer('PoVRemainingTime') == -1 || getSecondsLeft('PoVRemainingTime') < getLimitTimeBeforeEnd())
            )
        )
        {
            logHHAuto("Time to go and check Path of Valor for collecting reward.");
            busy = true;
            busy = goAndCollectPoV();
        }

        if (
            busy==false && getHHScriptVars("isEnabledPoG",false) && getStoredValue("HHAuto_Temp_autoLoop") === "true" && 
            (
                checkTimer('nextPoGCollectTime') && getStoredValue("HHAuto_Setting_autoPoGCollect") === "true" 
                || 
                getStoredValue("HHAuto_Setting_autoPoGCollectAll") === "true" && checkTimer('nextPoGCollectAllTime') && (getTimer('PoGRemainingTime') == -1 || getSecondsLeft('PoGRemainingTime') < getLimitTimeBeforeEnd())
            )
        )
        {
            logHHAuto("Time to go and check Path of Glory for collecting reward.");
            busy = true;
            busy = goAndCollectPoG();
        }

        if (busy==false && getHHScriptVars("isEnabledDailyRewards",false) && getStoredValue("HHAuto_Temp_autoLoop") === "true" && checkTimer('nextDailyRewardsCollectTime') && getStoredValue("HHAuto_Setting_autoDailyRewardsCollect") === "true")
        {
            busy = true;
            logHHAuto("Time to go and check Daily Rewards for collecting reward.");
            goAndCollectDailyRewards();
        }

        if (busy==false && getHHScriptVars("isEnabledDailyGoals",false) && getStoredValue("HHAuto_Temp_autoLoop") === "true" && checkTimer('nextDailyGoalsCollectTime') && getStoredValue("HHAuto_Setting_autoDailyGoalsCollect") === "true")
        {
            busy = true;
            logHHAuto("Time to go and check daily Goals for collecting reward.");
            goAndCollectDailyGoals();
        }

        if (busy === false && getHHScriptVars("isEnabledSalary",false) && getStoredValue("HHAuto_Setting_autoSalary") === "true" && ( getStoredValue("HHAuto_Setting_paranoia") !== "true" || !checkTimer("paranoiaSwitch") )  && getStoredValue("HHAuto_Temp_autoLoop") === "true")
        {
            if (checkTimer("nextSalaryTime")) {
                logHHAuto("Time to fetch salary.");
                busy = true;
                busy = getSalary();
            }
        }

        if(
            busy === false
            && getHHScriptVars("isEnabledBossBangEvent",false) && getStoredValue("HHAuto_Setting_plusEventBossBang") === "true"
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
            logHHAuto("Going to boss bang event.");
            busy = true;
            busy = parseEventPage(bossBangEventIDs[0]);
        }

        if(
            busy === false
            &&
            (
                (
                    sultryMysteriesEventIDs.length > 0
                    && getPage() !== getHHScriptVars("pagesIDEvent")
                )
            )
        )
        {
            logHHAuto("Going tosultry mystery event.");
            busy = true;
            busy = parseEventPage(sultryMysteriesEventIDs[0]);
        }

        if (
            busy === false
            && getStoredValue("HHAuto_Temp_autoLoop") === "true"
            && HaremSizeNeedsRefresh(getHHScriptVars("HaremMaxSizeExpirationSecs"))
            && getPage() !== getHHScriptVars("pagesIDHarem")

        )
        {
            //console.log(! isJSON(getStoredValue("HHAuto_Temp_HaremSize")),JSON.parse(getStoredValue("HHAuto_Temp_HaremSize")).count_date,new Date().getTime() + getHHScriptVars("HaremSizeExpirationSecs") * 1000);
            busy = true;
            gotoPage(getHHScriptVars("pagesIDHarem"));
        }

        if (
            busy === false
            && isJSON(getStoredValue("HHAuto_Temp_LastPageCalled"))
            && getPage() !== getHHScriptVars("pagesIDHome")
            && getPage() === JSON.parse(getStoredValue("HHAuto_Temp_LastPageCalled")).page
            && (new Date().getTime() - JSON.parse(getStoredValue("HHAuto_Temp_LastPageCalled")).dateTime) > getHHScriptVars("minSecsBeforeGoHomeAfterActions") * 1000
        )
        {
            //console.log("testingHome : GotoHome : "+getStoredValue("HHAuto_Temp_LastPageCalled"));
            logHHAuto("Back to home page at the end of actions");
            deleteStoredValue("HHAuto_Temp_LastPageCalled");
            gotoPage(getHHScriptVars("pagesIDHome"));
        }
    }

    if(busy === false  && getStoredValue("HHAuto_Setting_paranoia") === "true" && getStoredValue("HHAuto_Setting_master") ==="true" && getStoredValue("HHAuto_Temp_autoLoop") === "true")
    {
        if (checkTimer("paranoiaSwitch")) {
            flipParanoia();
        }
    }

    switch (getPage())
    {
        case getHHScriptVars("pagesIDLeaderboard"):
            if (getStoredValue("HHAuto_Setting_showCalculatePower") === "true")
            {
                moduleSimLeague();
            }
            break;
        case getHHScriptVars("pagesIDSeasonArena"):
            if (getStoredValue("HHAuto_Setting_showCalculatePower") === "true" && $("div.matchRatingNew img#powerLevelScouter").length < 3)
            {
                moduleSimSeasonBattle();
            }
            break;
        case getHHScriptVars("pagesIDSeason"):
            if (getStoredValue("HHAuto_Setting_SeasonMaskRewards") === "true")
            {
                setTimeout(moduleSimSeasonMaskReward,500);
            }
            getSeasonRemainingTime();
            break;
        case getHHScriptVars("pagesIDEvent"):
            if (getStoredValue("HHAuto_Setting_plusEvent") ==="true" || getStoredValue("HHAuto_Setting_plusEventMythic") ==="true")
            {
                parseEventPage();
                moduleDisplayEventPriority();
            }
            if (getStoredValue("HHAuto_Setting_plusEventBossBang") ==="true")
            {
                parseEventPage();
                setTimeout(goToBossBangeFightPage, randomInterval(500,1500));
            }
            if (getStoredValue("HHAuto_Setting_PoAMaskRewards") === "true")
            {
                setTimeout(modulePathOfAttractionHide,500);
            }
            break;
        case getHHScriptVars("pagesIDBossBang"):
            if (getStoredValue("HHAuto_Setting_plusEventBossBang") === "true")
            {
                setTimeout(skipBossBangFightPage,randomInterval(500,1500));
            }
            break;
        case getHHScriptVars("pagesIDPoA"):
            if (getStoredValue("HHAuto_Setting_PoAMaskRewards") === "true")
            {
                setTimeout(moduleOldPathOfAttractionHide,500);
            }
            break;
        case getHHScriptVars("pagesIDPowerplacemain"):
            moduleDisplayPopID();
            break;
        case getHHScriptVars("pagesIDShop"):
            if (getStoredValue("HHAuto_Setting_showMarketTools") === "true")
            {
                moduleShopActions();
            }
            moduleShopGetBoosters();
            break;
        case getHHScriptVars("pagesIDHome"):
            setTimeout(displaySeasonRemainingTime,500);
            setTimeout(displaySeasonalEventRemainingTime,500);
            setTimeout(displayPoVRemainingTime,500);
            setTimeout(displayPoGRemainingTime,500);
            break;
        case getHHScriptVars("pagesIDHarem"):
            moduleHarem();
            moduleHaremExportGirlsData();
            moduleHaremCountMax();
            moduleHaremNextUpgradableGirl();
            haremOpenFirstXUpgradable();
            break;
        case getHHScriptVars("pagesIDPachinko"):
            modulePachinko();
            break;
        case getHHScriptVars("pagesIDEditTeam"):
            moduleChangeTeam();
            break;
        case getHHScriptVars("pagesIDContests"):
            moduleDisplayContestsDeletion();
            break;
        case getHHScriptVars("pagesIDPoV"):
            if (getStoredValue("HHAuto_Setting_PoVMaskRewards") === "true")
            {
                moduleSimPoVMaskReward();
            }
            getPoVRemainingTime();
            break;
        case getHHScriptVars("pagesIDPoG"):
            if (getStoredValue("HHAuto_Setting_PoGMaskRewards") === "true")
            {
                moduleSimPoGMaskReward();
            }
            getPoGRemainingTime();
            break;
        case getHHScriptVars("pagesIDSeasonalEvent"):
            if (getStoredValue("HHAuto_Setting_SeasonalEventMaskRewards") === "true")
            {
                moduleSimSeasonalMaskReward();
            }
            getSeasonalEventRemainingTime();
            break;
        case getHHScriptVars("pagesIDChampionsPage"):
            moduleSimChampions();
            break;
        case getHHScriptVars("pagesIDClubChampion"):
            moduleSimChampions();
            break;
    }


    if(isNaN(getStoredValue("HHAuto_Temp_autoLoopTimeMili")))
    {
        logHHAuto("AutoLoopTimeMili is not a number.");
        setDefaults(true);
    }
    else if (getStoredValue("HHAuto_Temp_autoLoop") === "true")
    {
        setTimeout(autoLoop, Number(getStoredValue("HHAuto_Temp_autoLoopTimeMili")));
    }
    else
    {
        logHHAuto("autoLoop Disabled");
    }

}

function HaremSizeNeedsRefresh(inCustomExpi)
{
    return ! isJSON(getStoredValue("HHAuto_Temp_HaremSize")) || JSON.parse(getStoredValue("HHAuto_Temp_HaremSize")).count_date < (new Date().getTime() - inCustomExpi * 1000);
}

function moduleHaremCountMax()
{
    if (HaremSizeNeedsRefresh(getHHScriptVars("HaremMinSizeExpirationSecs")) && getHHVars('girlsDataList',false) !== null)
    {
        setStoredValue("HHAuto_Temp_HaremSize", JSON.stringify({count:Object.keys(getHHVars('girlsDataList',false)).length,count_date:new Date().getTime()}));
        logHHAuto("Harem size updated to : "+Object.keys(getHHVars('girlsDataList',false)).length);
        //console.log(getStoredValue("HHAuto_Temp_HaremSize"));

        /*if (busy === false)
        {
            gotoPage(getHHScriptVars("pagesIDHome"));
            logHHAuto("Go to home after getting Harem Size");
        }*/
    }
}

function getGirlUpgradeCost(inRarity, inTargetGrade)
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

function getLevelXp(inRarity, inLevel)
{
    const lvl_max_girl = 750;
    let GIRLS_EXP_LEVELS = [];

    GIRLS_EXP_LEVELS.starting = [];
    GIRLS_EXP_LEVELS.common = [];
    GIRLS_EXP_LEVELS.rare = [];
    GIRLS_EXP_LEVELS.epic = [];
    GIRLS_EXP_LEVELS.legendary = [];
    GIRLS_EXP_LEVELS.mythic = [];

    GIRLS_EXP_LEVELS.starting[0] = 10;
    GIRLS_EXP_LEVELS.common[0] = 10;
    GIRLS_EXP_LEVELS.rare[0] = 12;
    GIRLS_EXP_LEVELS.epic[0] = 14;
    GIRLS_EXP_LEVELS.legendary[0] = 16;
    GIRLS_EXP_LEVELS.mythic[0] = 40;

    for (let i=1; i < (lvl_max_girl-1); i++) {
        GIRLS_EXP_LEVELS.starting[i] = GIRLS_EXP_LEVELS.starting[(i-1)] + Math.ceil(GIRLS_EXP_LEVELS.starting[0]*Math.pow(1.0075, i));
        GIRLS_EXP_LEVELS.common[i] = GIRLS_EXP_LEVELS.common[(i-1)] + Math.ceil(GIRLS_EXP_LEVELS.common[0]*Math.pow(1.0075, i));
        GIRLS_EXP_LEVELS.rare[i] = GIRLS_EXP_LEVELS.rare[(i-1)] + Math.ceil(GIRLS_EXP_LEVELS.rare[0]*Math.pow(1.0075, i));
        GIRLS_EXP_LEVELS.epic[i] = GIRLS_EXP_LEVELS.epic[(i-1)] + Math.ceil(GIRLS_EXP_LEVELS.epic[0]*Math.pow(1.0075, i));
        GIRLS_EXP_LEVELS.legendary[i] = GIRLS_EXP_LEVELS.legendary[(i-1)] + Math.ceil(GIRLS_EXP_LEVELS.legendary[0]*Math.pow(1.0075, i));
        GIRLS_EXP_LEVELS.mythic[i] = GIRLS_EXP_LEVELS.mythic[(i-1)] + Math.ceil(GIRLS_EXP_LEVELS.mythic[0]*Math.pow(1.0075, i));
    }
    inLevel--;
    return GIRLS_EXP_LEVELS[inRarity][inLevel];
}

function getBoostersData()
{
    let boosterA = $('#equiped .sub_block .booster .slot:not(.empty):not(.mythic)');
    let boostersArray = {flat:{carac1:0,carac2:0,carac3:0,damage:0,ego:0,endurance:0},percent:{carac1:0,carac2:0,carac3:0,damage:0,ego:0,endurance:0}};
    for (let bi = 0;bi< boosterA.length;bi++)
    {
        let boosterItem = JSON.parse($('#equiped .sub_block .booster .slot:not(.empty)')[bi].attributes['data-d'].value);
        let bossterId = Number(boosterItem.id_item);
        switch (bossterId)
        {
            case 7 : /*Ginseng root */
            case 8 : /*Ginseng root */
            case 9 : /*Ginseng root */
                boostersArray.flat.carac1 += boosterItem.carac1;
                boostersArray.flat.carac2 += boosterItem.carac2;
                boostersArray.flat.carac3 += boosterItem.carac3;
                break
            case 10 : /*Jujubes */
            case 11 : /*Jujubes */
            case 12 : /*Jujubes */
                boostersArray.flat.chance += boosterItem.chance;
                break
            case 28 : /*Chlorella */
            case 29 : /*Chlorella */
            case 30 : /*Chlorella */
                boostersArray.flat.ego += boosterItem.ego;
                break
            case 31 : /*Cordyceps */
            case 32 : /*Cordyceps */
            case 33 : /*Cordyceps */
                boostersArray.flat.damage += boosterItem.damage;
                break
            case 316 : /*Ginseng root*/
                boostersArray.percent.carac1 += boosterItem.carac1;
                boostersArray.percent.carac2 += boosterItem.carac2;
                boostersArray.percent.carac3 += boosterItem.carac3;
                break
            case 317 : /*Jujubes*/
                boostersArray.percent.chance += boosterItem.chance;
                break
            case 318 : /*Chlorella*/
                boostersArray.percent.ego += boosterItem.ego;
                break
            case 319 : /*Cordyceps*/
                boostersArray.percent.damage += boosterItem.damage;
                break
        }
    }
    return boostersArray;
}

function simFightFunc()
{
    //console.log('simFightFunc');
    if (isJSON(getStoredValue("HHAuto_Temp_LeagueSavedData")))
    {
        let leagueSavedData = JSON.parse(getStoredValue("HHAuto_Temp_LeagueSavedData"));
        let classHero = Number(getHHVars("Hero.infos.class"));
        let defHero = 0;
        let stat;
        let boosters = getBoostersData();
        //console.log("Data: ");
        //console.log(leagueSavedData);
        for (let i=1;i<4;i++)
        {
            if (i != classHero)
            {
                defHero = defHero + getHHVars("Hero.infos.caracs.carac"+i);
                //console.log(`${classHero},${i},${defHero}` );
            }
        }
        defHero = defHero * 0.25 + leagueSavedData.hero_caracs_team * 0.12;
        //console.log(defHero+':'+getSetHeroInfos('caracs.defense'));
        let endurance = Number(getHHVars("Hero.infos.caracs.endurance"));
        let ego = (parseFloat(endurance + leagueSavedData.hero_caracs_team * 2) + Number(boosters.flat.ego)) * (1+(Number(boosters.percent.ego)/100));
        let damage = (Number(getHHVars("Hero.infos.caracs.carac" + classHero)) + Number(boosters.flat.damage));
        let atk = parseFloat(damage + leagueSavedData.hero_caracs_team * 0.25) * (1+(Number(boosters.percent.damage)/100));
        //console.log(endurance,parseFloat(endurance + leagueSavedData.hero_caracs_team * 2),ego,Number(getHHVars("Hero.infos.caracs.carac" + classHero)),damage,parseFloat(damage + leagueSavedData.hero_caracs_team * 0.25),atk);
        let player =
            {
                ego: ego*(1+leagueSavedData.playersBonuses.playerBonus*0.1),
                originEgo: ego*(1+leagueSavedData.playersBonuses.playerBonus*0.1),
                atk: atk*(1+leagueSavedData.playersBonuses.playerBonus*0.1),
                def: defHero,
                text: 'Player',
            };
        let opponent = leagueSavedData.opponent;
        //console.log("HH simuFight",JSON.stringify(player),JSON.stringify(opponent));
        let result = simuFight(player, opponent);
        $('#simResultPreviousScore')[0].innerText = $('#simResultScore')[0].innerText;
        $('#simResultPreviousScore')[0].className = $('#simResultScore')[0].className;
        $('#simResultName')[0].innerText = opponent.name;
        $('#simResultScore')[0].innerText = result.scoreStr;
        $('#simResultScore')[0].className = result.scoreClass;
        //console.log(result);
    }
    else
    {
        $('#simResultName')[0].innerText = 'empty';
        $('#simResultScore')[0].innerText = '0';
        $('#simResultScore')[0].className = 'close';
    }
}

function moduleShopGetBoosters()
{
    let boosterA = $('#equiped .sub_block .booster .slot:not(.empty)');
    let boostersArray = [];
    for (let index = 0;index < boosterA.length;index++)
    {
        const currentBooster = JSON.parse(JSON.stringify($(boosterA[index]).data("d")));
        const propertiesToDelete = ['id_m_i',"id_member", "stacked"];
        for (let prop of propertiesToDelete)
        {
            if (currentBooster.hasOwnProperty(prop))
            {
                delete currentBooster[prop];
            }
        }
        boostersArray.push(currentBooster);
    }
    if (boostersArray.length > 0 )
    {
        setStoredValue("HHAuto_Temp_BoostersData", JSON.stringify(boostersArray));
    }
    else
    {
        sessionStorage.removeItem("HHAuto_Temp_BoostersData");
    }
}

function checkAndCleanBoostersData()
{
    if ( isJSON(getStoredValue("HHAuto_Temp_BoostersData")))
    {
        const boostersData = JSON.parse(getStoredValue("HHAuto_Temp_BoostersData"));
        boostersData.filter(function(boost)
                            {
            return getBoosterExpiration(boost) !== "0";
        });
    }
}

function getBoosterExpiration(booster)
{
    if (booster.rarity === "mythic")
    {
        return booster.usages_remaining;
    }
    else
    {
        const secsLeft = Math.ceil(Number(booster.lifetime))-Math.ceil(new Date().getTime()/1000);
        if (secsLeft > 0 )
        {
            return toHHMMSS(secsLeft);
        }
        else
        {
            return "0";
        }
    }
}

function moduleShopActions()
{
    appendMenuSell();
    //appendSimFight();


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

    function appendSimFight()
    {
        if ($("#simResult").length === 0 ) {
            let labelSimFight = '<div id="simResult">'+
                '<div>'+getTextForUI("Name","elementText")+' : </div>'+
                '<div id="simResultName">Long User Name</div>'+
                '<div>'+getTextForUI("simResultMarketPreviousScore","elementText")+'</div>'+
                '<div id="simResultPreviousScore">'+getTextForUI("none","elementText")+'</div>'+
                '<div>'+getTextForUI("simResultMarketScore","elementText")+'</div>'+
                '<div id="simResultScore">'+getTextForUI("none","elementText")+'</div>'+
                '<div id="buttonSimResultMarket" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("SimResultMarketButton","tooltip")+'</span>'+getTextForUI("SimResultMarketButton","elementText")+'</div>'+
                '</div>';
            //$('#simResult')[0].outerHTML =    labelSimFight;
            GM_addStyle('.plus {'
                        + 'color: #66CD00;}'
                       );
            GM_addStyle('#shops #equiped div.sub_block div.booster {'
                        + 'width: 77%;}'
                       );

            GM_addStyle('.minus {'
                        + 'color: #FF2F2F;}'
                       );

            GM_addStyle('.close {'
                        + 'color: #FFA500;}'
                       );
            GM_addStyle('#simResultScore, #simResultPreviousScore {'+
                        'font-size:13px;'+
                        'line-height: 20px;'+
                        'height:20px;}');
            GM_addStyle('#simResultName {'+
                        'font-size:14px;'+
                        'padding: 0 5px;'+
                        'line-height: 30px;'+
                        'height:30px;}');
            GM_addStyle('#simResult {'+
                        'position: absolute;'+
                        'width: 80px;'+
                        'height: 135px;'+
                        'z-index: 9;'+
                        'right: 80px;'+
                        'top: 70px;'+
                        'font-size: 10px;'+
                        'text-align: center;'+
                        'color: #057;'+
                        'line-height: 1em;'+
                        'border: solid 1px #057;}');
            GM_addStyle('#buttonSimResultMarket {'+
                        'box-sizing: inherit;'+
                        'vertical-align: bottom;'+
                        'font: inherit;'+
                        'color: #fff;'+
                        'box-shadow: 0 3px 0 rgba(13,22,25,.6),inset 0 3px 0 #6df0ff;'+
                        'border: 1px solid #000;'+
                        'background-image: linear-gradient(to top,#008ed5 0,#05719c 100%);'+
                        'cursor: pointer;'+
                        'text-decoration: none;'+
                        'display: inline-block;'+
                        'transition: box-shadow 90ms ease-in-out;'+
                        'position: absolute;'+
                        'bottom: 0;'+
                        'left: 0;'+
                        'width: 100%;'+
                        'padding: 10px 5px 10px;');
            $('#equiped').append(labelSimFight);
            let observer = new MutationObserver(mutationRecords => {
                for(const mutation of mutationRecords) {
                    if (mutation.type === 'childList') {
                        let type = mutation.target.attributes[0];
                        if (type.nodeValue == 'armor' && mutation.removedNodes.length == 0){
                            //console.log(mutation);
                            simFightFunc();
                        }
                    }
                }
                //console.log(mutationRecords);
            });
            elem = document.getElementById('equiped');
            observer.observe(elem, {
                childList: true,
                subtree: true,
                characterDataOldValue: false
            });
            document.getElementById("buttonSimResultMarket").addEventListener("click", function () {simFightFunc()});
            simFightFunc();
        }
    }

    function findSubsetsPartition(inTotal, inSets, inForceLastItemLimit = 0)
    {
        let arr = [];
        var max = 0;
        const initialTotal = inTotal;
        for ( var sub in inSets)
        {
            //console.log(inSets[sub],sub);
            max+= inSets[sub]*sub;
        }
        //console.log(max);
        if (inTotal>max)
        {
            return {total:max,partitions:{...inSets}};
        }
        var result= SubsetsRepartition(inTotal, inSets);
        //console.log("subset result : ", result);

        while
            (
                result.total !== inTotal
                &&
                (
                    (
                        inForceLastItemLimit === 0
                        && inTotal>1
                    )
                    ||
                    (
                        inForceLastItemLimit !== 0
                        && Number(inTotal-initialTotal)<=inForceLastItemLimit
                    )

                )
            )
        {
            if (inForceLastItemLimit === 0)
            {
                inTotal -=1;
            }
            else
            {
                inTotal +=1;
            }
            result = SubsetsRepartition(inTotal, inSets);
        };
        if (inTotal === 0)
        {
            return -1;
        }
        return result;

        function SubsetsRepartition(inMax, subSets, currentMax = inMax, currentset = 0 )
        {
            //console.log("start subset with :",inMax, subSets, currentMax, currentset);
            var currentSets={...subSets};
            if ( currentMax > 0 )
            {
                var result = -1;
                var keys = Object.keys(currentSets);
                //console.log(keys);
                keys = keys.sort((b, a) => a - b);
                //console.log(keys);
                for ( var i of keys )
                {
                    //console.log(inTotal);
                    if (Number(i) <=currentMax && currentSets[i] >0)
                    {
                        currentSets[i] = currentSets[i] -1;
                        arr[currentset] = Number(i);
                        //console.log(arr);
                        //console.log(inTotal-Number(i));
                        return SubsetsRepartition(inMax, currentSets,currentMax-Number(i), currentset+1);
                        //console.log("tmp_result",tmp_result);
                        //if (tmp_result !== -1)
                        //{
                        //console.log("result : ",result);
                        //  return tmp_result;
                        //}
                    }
                }
                //console.log("result : ",result);
                return result;
            }

            //if ( arr[0] == currentMax )
            //{
            //  return 2;
            //}
            var needs={};
            needs[arr[0]]=1;
            for (var k = 1; k < currentset; k++) {
                if ( needs[arr[k]] === undefined)
                {
                    needs[arr[k]]=1;
                }
                else
                {
                    needs[arr[k]]=needs[arr[k]]+1
                }
            }
            //document.write(sum + '<br/>')
            //console.log(result);
            return {total:inMax,partitions:needs};
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
                    +'   <td menuSellFilter="c:'+c+';t:*;r:*">'+getTextForUI("RarityMythic","elementText")+'</td>';
            } else {
                let ext= (c === 16)?"svg":"png";
                itemsListMenu +='  <tr>'
                    +'   <td menuSellFilter="c:'+c+';t:*;r:*"><img style="height:20px;width:20px" src="https://hh2.hh-content.com/pictures/misc/items_icons/'+c+'.'+ext+'"></td>';
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
                    logHHAuto("Catched error : Couldn't remove "+menuID+" menu : "+e);
                }
            }
            return;
        }
        else if (document.getElementById(menuID) !== null)
        {
            document.getElementById("menuSellCurrentCount").innerHTML = $('#player-inventory.armor .slot:not(.empty):not([menuSellLocked])').length;
            return;
        }

        var menuSellLock = '<div style="position: absolute;right: 220px;top: 70px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuSellLock","tooltip")+'</span><label style="width:70px" class="myButton" id="menuSellLock">'+getTextForUI("menuSellLock","elementText")+'</label></div>'
        var menuSellMaskLocked = '<div style="position: absolute;right: 140px;top: 70px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuSellMaskLocked","tooltip")+'</span><label style="width:70px" class="myButton" id="menuSellMaskLocked">'+getTextForUI("menuSellMaskLocked","elementText")+'</label></div>'
        var menuSell = '<div style="position: absolute;right: 300px;top: 70px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuSell","tooltip")+'</span><label style="width:70px" class="myButton" id="menuSell">'+getTextForUI("menuSell","elementText")+'</label></div>'
        + '<dialog style="overflow-y:auto;max-width:95%;max-height:95%;"id="SellDialog"><form stylemethod="dialog">'
        +  '<div style="padding:10px; display:flex;flex-direction:column;">'
        +   '<p>'+getTextForUI("menuSellText","elementText")+'</p>'
        +   '<div class="HHMenuRow">'
        +    '<p>'+getTextForUI("menuSellCurrentCount","elementText")+'</p>'
        +    '<p id="menuSellCurrentCount">0</p>'
        +   '</div>'
        + '<div id="menuSellStop"><label style="width:80px" class="myButton" id="menuSellStop">'+getTextForUI("OptionStop","elementText")+'</label></div>'
        +   '<div id="menuSellHide" style="display:none">'
        +    '<p id="menuSellList"></p>'
        +    '<div class="HHMenuRow">'
        +     '<div style="padding:10px;"class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuSellButton","tooltip")+'</span><label class="myButton" id="menuSellButton">'+getTextForUI("menuSellButton","elementText")+'</label></div>'
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
        + '<menu> <label style="width:80px" class="myButton" id="menuSellCancel">'+getTextForUI("OptionCancel","elementText")+'</label></menu></form></dialog>'

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


            document.getElementById("menuSell").addEventListener("click", displayMenuSell);
            document.getElementById("menuSellCancel").addEventListener("click", function(){
                var SellDialog = document.getElementById("SellDialog");
                if (typeof SellDialog.showModal !== "function")
                {
                    alert("The <dialog> API is not supported by this browser");
                    return;
                }
                $('#player-inventory.armor .slot:not(.empty)[canBeSold]').removeAttr('canBeSold');
                SellDialog.close();
            });
            document.getElementById("menuSellStop").addEventListener("click", function(){
                this.style.display = "none";
                menuSellStop = true;
            });

            document.getElementById("menuSellButton").addEventListener("click", function(){
                if (Number(document.getElementById("menuSellNumber").value) > 0)
                {
                    logHHAuto("Starting selling "+Number(document.getElementById("menuSellNumber").value)+" items.");
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
        document.getElementById("menuSellCurrentCount").innerHTML = $('#player-inventory.armor .slot:not(.empty):not([menuSellLocked])').length;
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
                logHHAuto('Sell Dialog closed, stopping');
            }
            return;
        }
        scroll.scrollTop = scroll.scrollHeight-scroll.offsetHeight;
    }

    function sellArmorItems()
    {
        logHHAuto('start selling common, rare and epic stuff');
        document.getElementById("menuSellHide").style.display = "none";
        document.getElementById("menuSoldHide").style.display = "block";
        // return;
        var initialNumberOfItems = $('#player-inventory.armor .slot:not(.empty):not([menuSellLocked])').length;
        var itemsToSell = Number(document.getElementById("menuSellNumber").value);
        document.getElementById("menuSoldCurrentCount").innerHTML = "0/"+itemsToSell;
        document.getElementById("menuSoldMessage").innerHTML ="";
        let PlayerClass = getHHVars('Hero.infos.class') === null ? $('#equiped > div.icon.class_change_btn').attr('carac') : getHHVars('Hero.infos.class');
        function selling_func()
        {
            if ($('#player-inventory.armor').length === 0)
            {
                logHHAuto('Wrong tab');
                return;
            }
            else if (!document.getElementById("SellDialog").open)
            {
                logHHAuto('Sell Dialog closed, stopping');
                return;
            }
            let availebleItems = $('#player-inventory.armor .slot:not(.empty):not([menuSellLocked])');
            let currentNumberOfItems = availebleItems.length;
            if (currentNumberOfItems === 0)
            {
                logHHAuto('no more items for sale');
                document.getElementById("menuSoldMessage").innerHTML = getTextForUI("menuSoldMessageNoMore","elementText");
                menuSellListItems();
                document.getElementById("menuSellHide").style.display = "block";
                return;
            }
            //console.log(initialNumberOfItems,currentNumberOfItems);
            if ((initialNumberOfItems - currentNumberOfItems) >= itemsToSell) {
                logHHAuto('Reach wanted sold items.');
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
                if (availebleItems.filter('.selected').filter(':not(.legendary):not(.mythic),[canBeSold]').length > 0)
                {
                    can_sell = true;
                }
                logHHAuto('can be sold ' + can_sell+ ' : '+ availebleItems.filter('.selected')[0].getAttribute('data-d'));
                if (can_sell)
                {
                    $('#shops .menu-switch-tab-content.active button.green_text_button[rel=sell]').click();
                    let currSellNumber = Number((initialNumberOfItems - currentNumberOfItems) +1);
                    document.getElementById("menuSoldCurrentCount").innerHTML = currSellNumber+"/"+itemsToSell;
                    document.getElementById("menuSellCurrentCount").innerHTML = $('#player-inventory.armor .slot:not(.empty):not([menuSellLocked])').length;
                    setTimeout(selling_func, 300);
                    return;
                }
            }
            //Find new sellable items
            if (availebleItems.filter(':not(.selected):not(.legendary):not(.mythic),[canBeSold]').length > 0)
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
                if ($('#player-inventory.armor [canBeSold]:not([menuSellLocked])').length == 0)
                {
                    logHHAuto('no more items for sale');
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

var moduleDisplayEventPriority=function()
{
    if ($('.HHEventPriority').length  > 0) {return}
    let eventGirlz=isJSON(getStoredValue("HHAuto_Temp_eventsGirlz"))?JSON.parse(getStoredValue("HHAuto_Temp_eventsGirlz")):{};
    let eventChamps = isJSON(getStoredValue("HHAuto_Temp_autoChampsEventGirls"))?JSON.parse(getStoredValue("HHAuto_Temp_autoChampsEventGirls")):[];
    //$("div.event-widget div.widget[style='display: block;'] div.container div.scroll-area div.rewards-block-tape div.girl_reward div.HHEventPriority").each(function(){this.remove();});
    if ( eventGirlz.length >0 || eventChamps.length >0)
    {
        var girl;
        var prio;
        var baseQuery="#events .scroll-area .nc-event-list-reward-container .nc-event-list-reward";
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
                $(query).click();
            }
        }
    }

}

var clearEventData=function(inEventID)
{
    //sessionStorage.removeItem('HHAuto_Temp_eventsGirlz');
    //sessionStorage.removeItem('HHAuto_Temp_eventGirl');
    //clearTimer('eventMythicNextWave');
    //clearTimer('eventRefreshExpiration');
    //sessionStorage.removeItem('HHAuto_Temp_EventFightsBeforeRefresh');
    let eventList = isJSON(getStoredValue("HHAuto_Temp_eventsList"))?JSON.parse(getStoredValue("HHAuto_Temp_eventsList")):{};
    let eventsGirlz = isJSON(getStoredValue("HHAuto_Temp_eventsGirlz"))?JSON.parse(getStoredValue("HHAuto_Temp_eventsGirlz")):[];
    let eventGirl =isJSON(getStoredValue("HHAuto_Temp_eventGirl"))?JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")):{};
    let eventChamps = isJSON(getStoredValue("HHAuto_Temp_autoChampsEventGirls"))?JSON.parse(getStoredValue("HHAuto_Temp_autoChampsEventGirls")):[];
    let hasMythic = false;
    let hasEvent = false;
    for (let prop of Object.keys(eventList))
    {
        if (
            eventList[prop]["seconds_before_end"]<new Date()
            ||
            (
                eventList[prop]["isMythic"]
                && getStoredValue("HHAuto_Setting_plusEventMythic") !=="true"
            )
            ||
            (
                !eventList[prop]["isMythic"]
                && getStoredValue("HHAuto_Setting_plusEvent") !=="true"
            )
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
        clearTimer('eventMythicNextWave');
        clearTimer('eventMythicGoing');
    }
    if (hasEvent === false)
    {
        clearTimer('eventGoing');
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
            setStoredValue("HHAuto_Temp_autoChampsEventGirls", JSON.stringify(eventChamps));
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
            setStoredValue("HHAuto_Temp_eventsGirlz", JSON.stringify(eventsGirlz));
        }

        if (!eventList.hasOwnProperty(eventGirl.event_id) || eventGirl.event_id ===inEventID)
        {
            sessionStorage.removeItem('HHAuto_Temp_eventGirl');
        }

        setStoredValue("HHAuto_Temp_eventsList", JSON.stringify(eventList));
    }
}

function parseTime(inTimeString)
{
    let textDay= 'd';
    let textHour= 'h';
    let textMinute= 'm';
    let textSecond= 's';
    if ($('html')[0].lang === 'en')
    {
        textDay= 'd';
        textHour= 'h';
        textMinute= 'm';
        textSecond= 's';
    }
    else if ($('html')[0].lang === 'fr')
    {
        textDay= 'j';
        textHour= 'h';
        textMinute= 'm';
        textSecond= 's';
    }
    else if ($('html')[0].lang === 'es_ES')
    {
        textDay= 'd';
        textHour= 'h';
        textMinute= 'm';
        textSecond= 's';
    }
    else if ($('html')[0].lang === 'de_DE')
    {
        textDay= 'd';
        textHour= 'h';
        textMinute= 'm';
        textSecond= 'z';
    }
    else if ($('html')[0].lang === 'it_IT')
    {
        textDay= 'g';
        textHour= 'h';
        textMinute= 'm';
        textSecond= 's';
    }
    let atDay = inTimeString.indexOf(textDay);
    let atHour = inTimeString.indexOf(textHour);
    let atMinute = inTimeString.indexOf(textMinute);
    let atSecond = inTimeString.indexOf(textSecond);
    let day = atDay == -1 ? 0 : parseInt(inTimeString.substring(0, atDay).trim());
    let hour = atHour == -1 ? 0 : parseInt(inTimeString.substring(atDay+1, atHour).trim());
    let minute = atMinute == -1 ? 0 : parseInt(inTimeString.substring(atHour+1, atMinute).trim());
    let second = atSecond == -1 ? 0 : parseInt(inTimeString.substring(atMinute+1, atSecond).trim());
    return (day*24*3600 + hour*3600 + minute*60 + second);
}

function skipBossBangFightPage()
{
    const rewardsButton = $('#rewards_popup .blue_button_L:not([disabled]):visible');
    const skipFightButton = $('#new_battle #new-battle-skip-btn:not([disabled]):visible');
    if(rewardsButton.length > 0)
    {
        logHHAuto("Click get rewards bang fight");
        rewardsButton.click();
        
    } 
    else if(skipFightButton.length > 0) 
    {
        logHHAuto("Click skip boss bang fight");
        skipFightButton.click();
        setTimeout(skipBossBangFightPage,randomInterval(500,1500));
    }
    setStoredValue("HHAuto_Temp_autoLoop", "false");
}

function goToBossBangeFightPage(){
    const teamIndexFound = parseInt(getStoredValue("HHAuto_Temp_bossBangTeam"));
    let bangButton = $('#contains_all #events #boss_bang .boss-bang-event-info #start-bang-button:not([disabled])');
    if(teamIndexFound >= 0 && bangButton.length > 0) {
        gotoPage(bangButton.attr('href'));
    }
}

function parseEventPage(inTab="global")
{
    if(getPage() === getHHScriptVars("pagesIDEvent") )
    {
        let queryEventTabCheck=$("#contains_all #events");
        let eventHref = $("#contains_all #events .events-list .event-title.active").attr("href");
        let parsedURL = new URL(eventHref,window.location.origin);
        let eventID = queryStringGetParam(parsedURL.search,'tab')
        if (
            !eventID.startsWith(getHHScriptVars('eventIDReg'))
            && !eventID.startsWith(getHHScriptVars('mythicEventIDReg'))
            && !eventID.startsWith(getHHScriptVars('bossBangEventIDReg'))
            && !eventID.startsWith(getHHScriptVars('sultryMysteriesEventIDReg'))
        )
        {
            if (queryEventTabCheck.attr('parsed') === undefined)
            {
                logHHAuto("Not parsable event");
                queryEventTabCheck[0].setAttribute('parsed', 'true');
            }
            return false;
        }
        if (queryEventTabCheck.attr('parsed') !== undefined)
        {

            if (!checkEvent(eventID))
            {
                //logHHAuto("Events already parsed.");
                return false;
            }
        }
        queryEventTabCheck[0].setAttribute('parsed', 'true');
        logHHAuto("On event page.");
        clearEventData(eventID);
        //let eventsGirlz=[];
        let eventList = isJSON(getStoredValue("HHAuto_Temp_eventsList"))?JSON.parse(getStoredValue("HHAuto_Temp_eventsList")):{};
        let eventsGirlz = isJSON(getStoredValue("HHAuto_Temp_eventsGirlz"))?JSON.parse(getStoredValue("HHAuto_Temp_eventsGirlz")):[];
        let eventChamps = isJSON(getStoredValue("HHAuto_Temp_autoChampsEventGirls"))?JSON.parse(getStoredValue("HHAuto_Temp_autoChampsEventGirls")):[];
        let Priority=(getStoredValue("HHAuto_Setting_eventTrollOrder")).split(";");
        const hhEventData = unsafeWindow.event_data;
        if (!hhEventData) {
            logHHAuto("Error getting current event Data from HH.");
        }

        let refreshTimer = 3600;
        if (eventID.startsWith(getHHScriptVars('eventIDReg')) && getStoredValue("HHAuto_Setting_plusEvent") ==="true")
        {
            logHHAuto("On going event.");
            let timeLeft=$('#contains_all #events .nc-expiration-label#timer').attr("data-seconds-until-event-end");
            eventList[eventID]={};
            eventList[eventID]["id"]=eventID;
            eventList[eventID]["isMythic"]=false;
            eventList[eventID]["seconds_before_end"]=new Date().getTime() + Number(timeLeft) * 1000;
            eventList[eventID]["next_refresh"]=new Date().getTime() + refreshTimer * 1000;
            eventList[eventID]["isCompleted"] = true;
            setTimer('eventGoing',timeLeft);
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
                                    logHHAuto("Troll " + TrollID + " is not available for girl " +  girlName + " (" + girlId + ") ignoring");
                                    TrollID = undefined;
                                }
                            } catch (error) {
                                try {
                                    let parsedURL = new URL(girlData.source.anchor_win_from[0].url ,window.location.origin);
                                    TrollID = queryStringGetParam(parsedURL.search,'id_opponent');
                                    if (girlData.source.anchor_win_from.disabled) {
                                        logHHAuto("Troll " + TrollID + " is not available for girl " +  girlName + " (" + girlId + ") ignoring");
                                        TrollID = undefined;
                                    }
                                } catch (error) {
                                    logHHAuto("Can't get troll from girls " +  girlName + " (" + girlId + ")");
                                }
                            }
                        } else if (girlData.source.name === 'event_champion_girl') {
                            try {
                                ChampID = girlData.source.anchor_source.url.split('/champions/')[1];
                                if (girlData.source.anchor_source.disabled) {
                                    logHHAuto("Champion " + ChampID + " is not available for girl " +  girlName + " (" + girlId + ") ignoring");
                                    ChampID = undefined;
                                }
                            } catch (error) {
                                try {
                                    ChampID = girlData.source.anchor_win_from[0].url.split('/champions/')[1];
                                    if (girlData.source.anchor_win_from.disabled) {
                                        logHHAuto("Champion " + ChampID + " is not available for girl " +  girlName + " (" + girlId + ") ignoring");
                                        ChampID = undefined;
                                    }
                                } catch (error) {
                                    logHHAuto("Can't get champion from girls " +  girlName + " (" + girlId + ")");
                                }
                            }
                        
                        }
                    }
                    if (TrollID) {                    
                        logHHAuto("Event girl : "+girlName+" ("+girlShards+"/100) at troll "+TrollID+" priority : "+Priority.indexOf(TrollID)+" on event : ",eventID);
                        eventsGirlz.push({girl_id:girlId,troll_id:TrollID,girl_shards:girlShards,is_mythic:"false",girl_name:girlName,event_id:eventID});
                    }
                    if (ChampID) {
                        logHHAuto("Event girl : "+girlName+" ("+girlShards+"/100) at champ "+ChampID+" on event : ",eventID);
                        eventChamps.push({girl_id:girlId,champ_id:ChampID,girl_shards:girlShards,girl_name:girlName,event_id:eventID});
                    }
                }
            }
        }
        if (eventID.startsWith(getHHScriptVars('mythicEventIDReg')) && getStoredValue("HHAuto_Setting_plusEventMythic") ==="true")
        {
            logHHAuto("On going mythic event.");
            let timeLeft=$('#contains_all #events .nc-expiration-label#timer').attr("data-seconds-until-event-end");
            eventList[eventID]={};
            eventList[eventID]["id"]=eventID;
            eventList[eventID]["isMythic"]=true;
            eventList[eventID]["seconds_before_end"]=new Date().getTime() + Number(timeLeft) * 1000;
            eventList[eventID]["next_refresh"]=new Date().getTime() + refreshTimer * 1000;
            eventList[eventID]["isCompleted"] = true;
            setTimer('eventMythicGoing',timeLeft);
            let allEventGirlz = hhEventData ? hhEventData.girls : [];
            for (let currIndex = 0;currIndex<allEventGirlz.length;currIndex++)
            {
                let girlData = allEventGirlz[currIndex];
                let ShardsQuery = '#events .nc-panel .nc-panel-body .nc-event-reward-container .nc-events-prize-locations-container .shards-info span.number';
                let timerQuery= '#events .nc-panel .nc-panel-body .nc-event-reward-container .nc-events-prize-locations-container .shards-info span.timer'
                if ($(ShardsQuery).length > 0 )
                {
                    let remShards=Number($(ShardsQuery)[0].innerText);
                    let nextWave=($(timerQuery).length > 0)?parseTime($(timerQuery)[0].innerText):-1;
                    if (girlData.shards < 100)
                    {
                        eventList[eventID]["isCompleted"] = false;
                        if (nextWave === -1)
                        {
                            clearTimer('eventMythicNextWave');
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
                            TrollID = queryStringGetParam(parsedURL.search,'id_opponent');
                            if (girlData.source.anchor_source.disabled) {
                                logHHAuto("Troll " + TrollID + " is not available for mythic girl " +  girlName + " (" + girlId + ") ignoring");
                            } else {
                                logHHAuto("Event girl : "+girlName+" ("+girlShards+"/100) at troll "+TrollID+" priority : "+Priority.indexOf(TrollID)+" on event : ",eventID);
                                eventsGirlz.push({girl_id:girlId,troll_id:TrollID,girl_shards:girlShards,is_mythic:"true",girl_name:girlName,event_id:eventID});
                            }
                        }
                        else
                        {
                            if (nextWave === -1)
                            {
                                eventList[eventID]["isCompleted"] = true;
                                clearTimer('eventMythicNextWave');
                            }
                        }
                    }
                }
            }
        }
        if (eventID.startsWith(getHHScriptVars('bossBangEventIDReg')) && getStoredValue("HHAuto_Setting_plusEventBossBang") ==="true")
        {
            logHHAuto("On going bossBang event.");
            let timeLeft=$('#contains_all #events .nc-expiration-label#timer').attr("data-seconds-until-event-end");
            eventList[eventID]={};
            eventList[eventID]["id"]=eventID;
            eventList[eventID]["isMythic"]=false;
            eventList[eventID]["bossBang"]=true;
            eventList[eventID]["seconds_before_end"]=new Date().getTime() + Number(timeLeft) * 1000;
            eventList[eventID]["next_refresh"]=new Date().getTime() + refreshTimer * 1000;
            eventList[eventID]["isCompleted"] = $('#contains_all #events #boss_bang .completed-event').length > 0;
            setTimer('eventBossBangGoing',timeLeft);
            let teamEventz = $('#contains_all #events #boss_bang .boss-bang-teams-container .boss-bang-team-slot');
            let teamFound = false;
            const firstTeamToStartWith = getStoredValue("HHAuto_Setting_bossBangMinTeam");
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
                            logHHAuto("Select team " + teamIndex + ", Ego: "+parseInt(teamEgo.text()));
                            setStoredValue("HHAuto_Temp_bossBangTeam", teamIndex);
                            return true;
                        }
                    } else {
                        logHHAuto("Team " + teamIndex + " not eligible");
                    }
                }
            }
            else if(eventList[eventID]["isCompleted"]) 
            {
                logHHAuto("Boss bang completed, disabled boss bang event setting");
                setStoredValue("HHAuto_Setting_plusEventBossBang", false);
            }
            if(!teamFound) {
                setStoredValue("HHAuto_Temp_bossBangTeam", -1);
            }
        }
        if (eventID.startsWith(getHHScriptVars('sultryMysteriesEventIDReg')))
        {
            logHHAuto("On going sultry mysteries event.");
            logHHAuto("Refresh shop content.");
            $('#shop_tab').click();

            let timeLeft=$('#contains_all #events .nc-expiration-label#timer').attr("data-seconds-until-event-end");
            let shopTimeLeft=$('#contains_all #events #shop_tab_container .shop-section .shop-timer').attr("data-time-stamp");
            eventList[eventID]={};
            eventList[eventID]["id"]=eventID;
            eventList[eventID]["sultryMystery"]=true;
            eventList[eventID]["seconds_before_end"]=new Date().getTime() + Number(timeLeft) * 1000;
            eventList[eventID]["next_shop_refresh"]=new Date().getTime() + Number(shopTimeLeft) * 1000;
            eventList[eventID]["next_refresh"]=new Date().getTime() + refreshTimer * 1000;
            eventList[eventID]["isCompleted"] = false;
            setTimer('eventSultryMysteryGoing', timeLeft);
            setTimer('eventSultryMysteryShopRefresh', shopTimeLeft);


            setTimeout(function(){$('#grid_tab').click();;},randomInterval(300,800));
        }
        if(Object.keys(eventList).length >0)
        {
            setStoredValue("HHAuto_Temp_eventsList", JSON.stringify(eventList));
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

                setStoredValue("HHAuto_Temp_eventsGirlz", JSON.stringify(eventsGirlz));
                var chosenTroll = Number(eventsGirlz[0].troll_id)
                logHHAuto("ET: "+chosenTroll);
                setStoredValue("HHAuto_Temp_eventGirl", JSON.stringify(eventsGirlz[0]));
            }
            if (eventChamps.length>0)
            {
                setStoredValue("HHAuto_Temp_autoChampsEventGirls", JSON.stringify(eventChamps));
            }
            queryEventTabCheck[0].setAttribute('parsed', 'true');
            //setStoredValue("HHAuto_Temp_EventFightsBeforeRefresh", "20000");
            //setTimer('eventRefreshExpiration', 3600);
        }
        else
        {
            queryEventTabCheck[0].setAttribute('parsed', 'true');
            clearEventData(eventID);
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

function getEventType(inEventID){
    if(inEventID.startsWith(getHHScriptVars('mythicEventIDReg'))) return "mythic";
    if(inEventID.startsWith(getHHScriptVars('eventIDReg'))) return "event";
    if(inEventID.startsWith(getHHScriptVars('bossBangEventIDReg'))) return "bossBang";
    return "";
}

function checkEvent(inEventID)
{
    let eventList = isJSON(getStoredValue("HHAuto_Temp_eventsList"))?JSON.parse(getStoredValue("HHAuto_Temp_eventsList")):{};
    let result = false;
    let eventType = getEventType(inEventID);
    if (eventType === "mythic" && getStoredValue("HHAuto_Setting_plusEventMythic") !=="true")
    {
        return false;
    }
    if (eventType === "event" && getStoredValue("HHAuto_Setting_plusEvent") !=="true")
    {
        return false;
    }
    if (eventType === "bossBang" && getStoredValue("HHAuto_Setting_plusEventBossBang") !=="true")
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
            if (
                eventList[inEventID]["next_refresh"]<new Date() 
                //|| 
                //(eventType === "sultryMystery" && eventList[inEventID]["next_shop_refresh"]<new Date() 
                || 
                (eventType === "mythic" && checkTimerMustExist('eventMythicNextWave'))
                )
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}


function canBuyFight(logging=true)
{
    let type="fight";
    let hero=getHero();
    let result = {canBuy:false, price:0, max:0, toBuy:0, event_mythic:"false", type:type};
    let maxx50 = 50;
    let maxx20 = 20;
    let currentFight =Number( getHHVars('Hero.energies.fight.amount'));
    let pricex50=hero.get_max_recharge_cost(type,maxx50)
    let pricex20=hero.get_recharge_cost(type);
    let canRecharge20 = false;
    let remainingShards;

    if (getStoredValue("HHAuto_Temp_eventGirl") !== undefined && JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).girl_shards && Number.isInteger(Number(JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).girl_shards)))
    {
        if (
            (
                getStoredValue("HHAuto_Setting_buyCombat") =="true"
                && getStoredValue("HHAuto_Setting_plusEvent") ==="true"
                && getSecondsLeft("eventGoing") !== 0
                && Number(getStoredValue("HHAuto_Setting_buyCombTimer")) !== NaN
                && getSecondsLeft("eventGoing") < getStoredValue("HHAuto_Setting_buyCombTimer")*3600
                && JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "false"
            )
            ||
            (
                getStoredValue("HHAuto_Setting_plusEventMythic") ==="true"
                && getStoredValue("HHAuto_Setting_buyMythicCombat") === "true"
                && getSecondsLeft("eventMythicGoing") !== 0
                && Number(getStoredValue("HHAuto_Setting_buyMythicCombTimer")) !== NaN
                && getSecondsLeft("eventMythicGoing") < getStoredValue("HHAuto_Setting_buyMythicCombTimer")*3600
                && JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic === "true"
            )
        )
        {
            result.event_mythic = JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).is_mythic;
        }
        else
        {
            return result;
        }

        //console.log(result);
        remainingShards = Number(100 - Number(JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")).girl_shards));
        if
            (
                getStoredValue("HHAuto_Setting_minShardsX50") !== undefined
                && Number.isInteger(Number(getStoredValue("HHAuto_Setting_minShardsX50")))
                && remainingShards >= Number(getStoredValue("HHAuto_Setting_minShardsX50"))
                && getHHVars('Hero.currencies.hard_currency')>=pricex50+Number(getStoredValue("HHAuto_Setting_kobanBank"))
                && getStoredValue("HHAuto_Setting_useX50Fights") === "true"
                && currentFight < maxx50
                && ( result.event_mythic || getStoredValue("HHAuto_Setting_useX50FightsAllowNormalEvent") === "true")
            )
        {
            result.max = maxx50;
            result.canBuy = true;
            result.price = pricex50;
            result.toBuy = maxx50-currentFight;
        }
        else
        {

            if (logging)
            {
                logHHAuto('Unable to recharge up to '+maxx50+' for '+pricex50+' kobans : current energy : '+currentFight+', remaining shards : '+remainingShards+'/'+getStoredValue("HHAuto_Setting_minShardsX50")+', kobans : '+getHHVars('Hero.currencies.hard_currency')+'/'+Number(getStoredValue("HHAuto_Setting_kobanBank")));
            }
            if (getHHVars('Hero.currencies.hard_currency')>=pricex20+Number(getStoredValue("HHAuto_Setting_kobanBank"))
               )//&& currentFight < 10)
            {
                result.max = maxx20;
                result.canBuy = true;
                result.price = pricex20;
                result.toBuy = maxx20-currentFight;
            }
            else
            {
                if (logging)
                {
                    logHHAuto('Unable to recharge up to '+maxx20+' for '+pricex20+' kobans : current energy : '+currentFight+', kobans : '+getHHVars('Hero.currencies.hard_currency')+'/'+Number(getStoredValue("HHAuto_Setting_kobanBank")));
                }
                return result;
            }
        }
    }

    return result;
}

var RechargeCombat=function()
{
    let hero=getHero();

    let canBuyResult = canBuyFight();
    if (canBuyResult.canBuy)
    {
        logHHAuto('Recharging '+canBuyResult.toBuy+' fights for '+canBuyResult.price+' kobans.');
        let hcConfirmValue = getHHVars('Hero.infos.hc_confirm');
        setHHVars('Hero.infos.hc_confirm',true);
        // We have the power.
        //replaceCheatClick();
        //console.log($("plus[type='energy_fight']"), canBuyResult.price,canBuyResult.type, canBuyResult.max);
        hero.recharge($("plus[type='energy_fight']"), canBuyResult.price,canBuyResult.type, canBuyResult.max);
        setHHVars('Hero.infos.hc_confirm',hcConfirmValue);
        logHHAuto('Recharged up to '+canBuyResult.max+' fights for '+canBuyResult.price+' kobans.');
    }
    //     hh_ajax(
    //         {
    //             class: "Hero",
    //             action: "recharge",
    //             type: type,
    //             max: max
    //         }, function(data)
    //         {
    //             Hero.update("energy_"+type, max || Hero.energies[type].max_amount);
    //             Hero.update("hard_currency", 0 - price, true);
    //             setTimeout(function(){location.reload();},randomInterval(500,1500));
    //             //Hero.update("fight.amount", getHHVars('Hero.energies.fight.max_amount'));
    //             //Hero.update("hard_currency", 0 - price, true);
    //         });
    //    logHHAuto('Recharged up to 50 fights.');
}

var getBurst=function()
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
    return getStoredValue("HHAuto_Setting_master") ==="true"&&(!(getStoredValue("HHAuto_Setting_paranoia") ==="true") || getStoredValue("HHAuto_Temp_burst") ==="true");
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

function extractHHVars(dataToSave,extractLog = false,extractTemp=true,extractSettings=true)
{
    let storageType;
    let storageName;
    let currentStorageName = getStoredValue("HHAuto_Setting_settPerTab") ==="true"?"sessionStorage":"localStorage";
    let variableName;
    let storageItem;
    let varType;
    for (let i of Object.keys(HHStoredVars))
    {
        varType = HHStoredVars[i].HHType;
        if (varType === "Setting" && extractSettings || varType === "Temp" && extractTemp)
        {
            storageType = HHStoredVars[i].storage;
            variableName = i;
            storageName = storageType;
            storageItem = getStorageItem(storageType);
            if (storageType === 'Storage()')
            {
                storageName = currentStorageName;
            }
            if (variableName !== "HHAuto_Temp_Logging")
            {
                dataToSave[storageName+"."+variableName] = getStoredValue(variableName);
            }
        }
    }
    if (extractLog)
    {
        dataToSave["HHAuto_Temp_Logging"] = JSON.parse(sessionStorage.getItem('HHAuto_Temp_Logging'));
    }
    return dataToSave;
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

function myfileLoad_onChange(event)
{
    $('#LoadConfError')[0].innerText =' ';
    if (event.target.files.length == 0) {return}
    var reader = new FileReader();
    reader.onload = myfileLoad_onReaderLoad;
    reader.readAsText(event.target.files[0]);
}

function isJSON(str)
{
    if (str === undefined || str === null || /^\s*$/.test(str) ) return false;
    str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
    str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
    str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
    return (/^[\],:{}\s]*$/).test(str);
}

function myfileLoad_onReaderLoad(event){
    var text = event.target.result;
    var storageType;
    var storageItem;
    var variableName;

    //Json validation
    if (isJSON(text))
    {
        logHHAuto('the json is ok');
        var jsonNewSettings = JSON.parse(event.target.result);
        //Assign new values to Storage();
        for (const [key, value] of Object.entries(jsonNewSettings))
        {
            storageType=key.split(".")[0];
            variableName=key.split(".")[1];
            storageItem = getStorageItem(storageType);
            logHHAuto(key+':'+ value);
            storageItem[variableName] = value;
        }
        location.reload();
    }else{
        $('#LoadConfError')[0].innerText ='Selected file broken!';
        logHHAuto('the json is Not ok');
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
    logHHAuto('Deleted all script vars.');
}

function manageToolTipsDisplay(important=false)
{

    if(getStoredValue("HHAuto_Setting_showTooltips") === "true")
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

function checkClubStatus()
{
    let chatVars =getHHVars("Chat_vars.CLUB_INFO.id_club",false);
    if (chatVars === null || chatVars === false)
    {
        HHEnvVariables[getHHScriptVars("HHGameName")].isEnabledClubChamp = false;
    }
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
        logHHAuto(i+':'+ dataToSave[i]);
        storageItem[variableName] = dataToSave[i];
    }
}

function getUserHHStoredVarDefault(inVarName)
{
    if (isJSON(getStoredValue("HHAuto_Setting_saveDefaults")))
    {
        let currentDefaults = JSON.parse(getStoredValue("HHAuto_Setting_saveDefaults"));
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
        if (variableName !== "HHAuto_Setting_saveDefaults" && HHStoredVars[variableName].default !== dataToSave[i])
        {
            savedHHStoredVars[variableName] = dataToSave[i];
        }
    }
    setStoredValue("HHAuto_Setting_saveDefaults", JSON.stringify(savedHHStoredVars));
    logHHAuto("HHStoredVar defaults saved !");
}

function setHHStoredVarToDefault(inVarName)
{
    if (HHStoredVars[inVarName] !== undefined)
    {
        if (HHStoredVars[inVarName].default !== undefined && HHStoredVars[inVarName].storage !== undefined)
        {
            let storageItem;
            storageItem = getStorageItem(HHStoredVars[inVarName].storage);

            let userDefinedDefault = getUserHHStoredVarDefault(inVarName);
            let isValid = HHStoredVars[inVarName].isValid===undefined?true:HHStoredVars[inVarName].isValid.test(userDefinedDefault);
            if (userDefinedDefault !== null && isValid)
            {
                logHHAuto("HHStoredVar "+inVarName+" set to user default value : "+userDefinedDefault);
                storageItem[inVarName] = userDefinedDefault;
            }
            else
            {
                logHHAuto("HHStoredVar "+inVarName+" set to default value : "+HHStoredVars[inVarName].default);
                storageItem[inVarName] = HHStoredVars[inVarName].default;
            }
        }
        else
        {
            logHHAuto("HHStoredVar "+inVarName+" either have no storage or default defined.");
        }
    }
    else
    {
        logHHAuto("HHStoredVar "+inVarName+" doesn't exist.");
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

function getMenuValues()
{
    if (document.getElementById("sMenu") === null)
    {
        return;
    }
    if (isDisplayedHHPopUp() === 'loadConfig') {return}

    for (let i of Object.keys(HHStoredVars))
    {
        if (HHStoredVars[i].storage !== undefined && HHStoredVars[i].HHType !== undefined)
        {
            let storageItem = getStorageItem(HHStoredVars[i].storage);
            let menuID = HHStoredVars[i].customMenuID !== undefined?HHStoredVars[i].customMenuID:i.replace("HHAuto_"+HHStoredVars[i].HHType+"_","");
            if (
                HHStoredVars[i].getMenu !== undefined
                && document.getElementById(menuID) !== null
                && HHStoredVars[i].getMenu
                && HHStoredVars[i].valueType !== undefined
                && HHStoredVars[i].menuType !== undefined
            )
            {
                let currentValue = storageItem[i];
                let menuValue = String(document.getElementById(menuID)[HHStoredVars[i].menuType]);
                switch (HHStoredVars[i].valueType)
                {
                    case "Long Integer":
                        menuValue = String(remove1000sSeparator(menuValue));
                        break;
                }
                //console.log(menuID,HHStoredVars[i].menuType,menuValue,document.getElementById(menuID),HHStoredVars[i].valueType);
                storageItem[i] = menuValue;
                //console.log(i,currentValue, menuValue);
                if (currentValue !== menuValue && HHStoredVars[i].newValueFunction !== undefined)
                {
                    //console.log(currentValue,menuValue);
                    HHStoredVars[i].newValueFunction.apply();
                }
            }
        }
        else
        {
            logHHAuto("HHStoredVar "+i+" has no storage or type defined.");
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
        const rewardsToCollect = isJSON(getStoredValue(inVarName))?JSON.parse(getStoredValue(inVarName)):[];
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
        setStoredValue(inVarName, JSON.stringify(collectablesList));
    }
}

function setMenuValues()
{
    if (document.getElementById("sMenu") === null)
    {
        return;
    }
    setDefaults();

    for (let i of Object.keys(HHStoredVars))
    {
        if (HHStoredVars[i].storage !== undefined && HHStoredVars[i].HHType !== undefined)
        {
            let storageItem = getStorageItem(HHStoredVars[i].storage);
            let menuID = HHStoredVars[i].customMenuID !== undefined?HHStoredVars[i].customMenuID:i.replace("HHAuto_"+HHStoredVars[i].HHType+"_","");
            if (
                HHStoredVars[i].setMenu !== undefined
                && storageItem[i] !== undefined
                && HHStoredVars[i].setMenu
                && HHStoredVars[i].valueType !== undefined
                && HHStoredVars[i].menuType !== undefined
            )
            {
                let itemValue = storageItem[i];
                switch (HHStoredVars[i].valueType)
                {
                    case "Long Integer":
                        itemValue = add1000sSeparator(itemValue);
                        break;
                    case "Boolean":
                        itemValue = itemValue === "true";
                        break;
                }
                //console.log(menuID,HHStoredVars[i].menuType,itemValue);
                document.getElementById(menuID)[HHStoredVars[i].menuType] = itemValue;
            }
        }
        else
        {
            logHHAuto("HHStoredVar "+i+" has no storage or type defined.");
        }
    }
}

var setDefaults = function (force = false)
{
    for (let i of Object.keys(HHStoredVars))
    {
        if (HHStoredVars[i].storage !== undefined )
        {
            let storageItem = getStorageItem(HHStoredVars[i].storage);
            let isInvalid = false;
            //console.log(storageItem[i], storageItem[i] !== undefined);
            if (HHStoredVars[i].isValid !== undefined && storageItem[i] !== undefined)
            {
                isInvalid = !HHStoredVars[i].isValid.test(storageItem[i]);
                if (isInvalid)
                {
                    logHHAuto("HHStoredVar "+i+" is invalid, reseting.");
                    logHHAuto("HHStoredVar "+i+" current value : "+storageItem[i]);
                }
            }
            if (HHStoredVars[i].default !== undefined )
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
            logHHAuto("HHStoredVar "+i+" has no storage defined.");
        }

    }

};
/*
 0: version strings are equal
 1: version a is greater than b
-1: version b is greater than a
*/
function cmpVersions(a, b)
{
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }) ;
}

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
    }
    catch
    {
    }
    return HHAuto_Lang;
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
            logHHAuto("not found text for "+HHAuto_Lang+"/"+id+"/"+type);
            return HHAuto_Lang+"/"+id+"/"+type+" not found.";
        }
    }
}

function getHHScriptVars(id, logNotFound = true)
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
                logHHAuto("not found var for "+environnement+"/"+id);
            }
            return null;
        }
    }
}
let HHKnownEnvironnements = {};
HHKnownEnvironnements["www.hentaiheroes.com"] = {name:"HH_prod",id:"hh_hentai"};
HHKnownEnvironnements["test.hentaiheroes.com"] = {name:"HH_test",id:"hh_hentai"};
HHKnownEnvironnements["www.comixharem.com"] = {name:"CH_prod",id:"hh_comix"};
HHKnownEnvironnements["www.gayharem.com"] = {name:"GH_prod",id:"hh_gay"};
HHKnownEnvironnements["www.hornyheroes.com"] = {name:"SH_prod",id:"hh_sexy"};
HHKnownEnvironnements["nutaku.comixharem.com"] = {name:"NCH_prod",id:"hh_comix"};
HHKnownEnvironnements["nutaku.haremheroes.com"] = {name:"NHH_prod",id:"hh_hentai"};
HHKnownEnvironnements["nutaku.gayharem.com"] = {name:"NGH_prod",id:"hh_gay"};
HHKnownEnvironnements["thrix.hentaiheroes.com"] = {name:"THH_prod",id:"hh_hentai"};
HHKnownEnvironnements["eroges.gayharem.com"] = {name:"EGH_prod",id:"hh_gay"};
HHKnownEnvironnements["eroges.hentaiheroes.com"] = {name:"EHH_prod",id:"hh_hentai"};
HHKnownEnvironnements["esprit.hentaiheroes.com"] = {name:"OGHH_prod",id:"hh_hentai"};
HHKnownEnvironnements["www.pornstarharem.com"] = {name:"PH_prod",id:"hh_star"};
HHKnownEnvironnements["nutaku.pornstarharem.com"] = {name:"NPH_prod",id:"hh_star"};


var HHEnvVariables = {};
HHEnvVariables["global"] = {};
for (let i in HHKnownEnvironnements)
{
    HHEnvVariables[HHKnownEnvironnements[i].name] = {};
    HHEnvVariables[HHKnownEnvironnements[i].name].gameID = HHKnownEnvironnements[i].id;
    HHEnvVariables[HHKnownEnvironnements[i].name].HHGameName = HHKnownEnvironnements[i].name;
}

HHEnvVariables["global"].eventIDReg = "event_";
HHEnvVariables["global"].mythicEventIDReg = "mythic_event_";
HHEnvVariables["global"].bossBangEventIDReg = "boss_bang_event_";
HHEnvVariables["global"].sultryMysteriesEventIDReg = "sm_event_";
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
HHEnvVariables["global"].boostersIdentifier =
    {
    MB1:   {name:"Sandalwood perfume", usage:"1 more shards when winning shards from villain, up to 11."},
    MB2:   {name:"All Mastery's Emblem", usage:"+15% attack power against League/Seasons for next 100 fights"},
    MB3:   {name:"Headband of determination", usage:"+25% damage against champions for next 200 fights"},
    MB4:   {name:"Luxurious Watch", usage:"+25% power against PoA for next 60 missions"},
    MB5:   {name:"Combative Cinnamon", usage:"+5 mojo on a win and 0 on a loose for next 100 season fight"},
    MB6:   {name:"Alban's travel memories", usage:"+20% xp (5 if level 300 or higher), up to 100000"},
    MB7:   {name:"Angels' semen scent", usage:"+25% power against PoA for next 60 missions"},
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
    const aCost = (Number(a.gData.nb_grades) === Number(a.gData.graded) || !a.gData.own ) ? 0 : getGirlUpgradeCost(a.gData.rarity, a.gData.graded + 1);
    const bCost = (Number(b.gData.nb_grades) === Number(b.gData.graded) || !b.gData.own ) ? 0 : getGirlUpgradeCost(b.gData.rarity, b.gData.graded + 1);
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
HHEnvVariables["global"].isEnabledShop = true;
HHEnvVariables["global"].isEnabledSalary = true;
HHEnvVariables["global"].isEnabledPoVPoG = true;
HHEnvVariables["global"].isEnabledPoV = true;
HHEnvVariables["global"].isEnabledPoG = true;
HHEnvVariables["global"].isEnabledSeasonalEvent = true;
HHEnvVariables["global"].isEnabledBossBangEvent = true;
HHEnvVariables["global"].isEnabledDailyGoals = true;
HHEnvVariables["HH_test"].isEnabledDailyRewards = false;// to remove if daily rewards arrives in test
["CH_prod","NCH_prod"].forEach((element) => {
    HHEnvVariables[element].trollzList = ['Latest',
                                          'BodyHack',
                                          'Grey Golem',
                                          'The Nymph',
                                          'Athicus Ho’ole',
                                          'The Mimic',
                                          'Cockatrice',
                                          'Pomelo'];
})
HHEnvVariables["SH_prod"].isEnabledSideQuest = false;// to remove when SideQuest arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPowerPlaces = false;// to remove when PoP arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledMythicPachinko = false;// to remove when Mythic Pachinko arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledAllChamps = false;// to remove when Champs arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledChamps = false;// to remove when Champs arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledClubChamp = false;// to remove when Club Champs arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPantheon = false;// to remove when Pantheon arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPoVPoG = false;
HHEnvVariables["SH_prod"].isEnabledPoV = false;// to remove when PoV arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPoG = false;// to remove when PoG arrives in hornyheroes
["PH_prod","NPH_prod"].forEach((element) => {
    HHEnvVariables[element].trollzList = ['Latest',
                                          'Headmistress Asa Akira',
                                          'Sammy Jayne',
                                          'Ivy Winters',
                                          'Sophia  Jade',
                                          'Amia Miley',
                                          'Alyssa Reece',
                                          'Kelly Kline',
                                          'Jamie Brooks'];
    HHEnvVariables[element].isEnabledPantheon = false;// to remove when Pantheon arrives in pornstar
    HHEnvVariables[element].isEnabledPoG = false;// to remove when PoG arrives in pornstar
})

const HC = 1;
const CH = 2;
const KH = 3;

var HHAuto_inputPattern = {
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
    autoSeasonThreshold:"[0-9]",
    autoPantheonThreshold:"[0-9]",
    bossBangMinTeam:"[1-5]",
    autoQuestThreshold:"[1-9]?[0-9]",
    autoLeaguesThreshold:"1[0-4]|[0-9]",
    autoPowerPlacesIndexFilter:"[1-9][0-9]{0,1}(;[1-9][0-9]{0,1})*",
    autoChampsFilter:"[1-6](;[1-6])*",
    //autoStats:"[0-9]+",
    //autoExp:"[0-9]+",
    //maxExp:"[0-9]+",
    //autoAff:"[0-9]+",
    //maxAff:"[0-9]+",
    //autoLGM:"[0-9]+",
    //autoLGR:"[0-9]+",
    menuSellNumber:"[0-9]+",
    autoClubChampMax:"[0-9]+",
    menuExpLevel:"[1-4]?[0-9]?[0-9]",
    minShardsX:"(100|[1-9][0-9]|[0-9])"
}

var HHAuto_ToolTips = {en:{}, fr:{}, es:{}, de:{}, it:{}};
var uiLanguage = {
    'en':{'hours': "h", minutes: "m", seconds: "s"}, 
    'de_DE':{hours: "h", minutes: "m", seconds: "s"}, 
    'es_ES':{hours: "h", minutes: "m", seconds: "s"}, 
    'fr':{hours: "h", minutes: "m", seconds: "s"}, 
    'it_IT':{hours: "h", minutes: "m", seconds: "s"}, 
    'ru_RU':{hours: "ч", minutes: "мин", seconds: "сек"},
    'ja_JP':{hours: "時間", minutes: "分", seconds: "秒"}
};

HHAuto_ToolTips.en.saveDebug = { version: "5.6.24", elementText: "Save Debug", tooltip: "Allow to produce a debug log file."};
HHAuto_ToolTips.en.gitHub = { version: "5.6.24", elementText: "GitHub", tooltip: "Link to GitHub project."};
HHAuto_ToolTips.en.ReportBugs = { version: "5.7.1", elementText: "Report Bugs", tooltip: "Link to GitHub issue list to open and follow bugs."};
HHAuto_ToolTips.en.noOtherScripts = { version: "5.7.1", elementText: "Please do not use other scripts, it can create incompatibility (HH++ OCD supported)", tooltip: ""};
HHAuto_ToolTips.en.saveConfig = { version: "5.6.24", elementText: "Save Config", tooltip: "Allow to save configuration."};
HHAuto_ToolTips.en.loadConfig = { version: "5.6.24", elementText: "Load Config", tooltip: "Allow to load configuration."};
HHAuto_ToolTips.en.globalTitle = { version: "5.6.24", elementText: "Global options"};
HHAuto_ToolTips.en.master = { version: "5.6.24", elementText: "Master switch", tooltip: "On/off switch for full script"};
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
HHAuto_ToolTips.en.autoBuyBoostersFilter = { version: "5.6.25", elementText: "Filter", tooltip: "(values separated by ;)<br>Set list of codes of booster to buy, order is respected.<br>Code:Name<br>B1:Ginseng<br>B2:Jujubes<br>B3:Chlorella<br>B4:Cordyceps<br>MB1:Sandalwood perfume<br>MB2:All Mastery's Emblem<br>MB3:Headband of determination<br>MB4:Luxurious Watch<br>MB5:Combative Cinnamon<br>MB6:Alban's travel memories<br>MB7:Angels' semen scent"};
HHAuto_ToolTips.en.autoSeasonPassReds = { version: "5.6.24", elementText: "Pass 3 reds", tooltip: "<p style='color:red'>/!\\ Kobans spending function /!\\<br>("+HHAuto_ToolTips.en.spendKobans0.elementText+" must be ON)</p>Use kobans to renew Season opponents if 3 reds"};
HHAuto_ToolTips.en.showCalculatePower = { version: "5.6.24", elementText: "Show PowerCalc", tooltip: "Display battle simulation indicator for Leagues, battle, Seasons "};
//HHAuto_ToolTips.en.calculatePowerLimits = { version: "5.6.24", elementText: "Own limits", tooltip: "(red;orange)<br>Define your own red and orange limits for Opponents<br> -6000;0 do mean<br> <-6000 is red, between -6000 and 0 is orange and >=0 is green"};
HHAuto_ToolTips.en.showInfo = { version: "5.6.24", elementText: "Show info", tooltip: "if enabled : show info on script values and next runs"};
HHAuto_ToolTips.en.autoSalary = { version: "5.6.24", elementText: "Salary", tooltip: "(Integer)<br>if enabled :<br>Collect salaries every X secs"};
//HHAuto_ToolTips.en.autoSalaryMinTimer = { version: "5.6.24", elementText: "Minimum wait", tooltip: "(Integer)<br>X secs to next Salary collection"};
HHAuto_ToolTips.en.autoSalaryMinSalary = { version: "5.6.24", elementText: "Min. salary", tooltip: "(Integer)<br>Minium salary to start collection"};
HHAuto_ToolTips.en.autoSalaryMaxTimer = { version: "5.6.24", elementText: "Max. collect time", tooltip: "(Integer)<br>X secs to collect Salary, before stopping."};
HHAuto_ToolTips.en.autoMission = { version: "5.6.24", elementText: "Mission", tooltip: "if enabled : Automatically do missions"};
HHAuto_ToolTips.en.autoMissionCollect = { version: "5.6.24", elementText: "Collect", tooltip: "if enabled : Automatically collect missions after start of new competition."};
HHAuto_ToolTips.en.autoTrollTitle = { version: "5.6.24", elementText: "Battle Troll"};
HHAuto_ToolTips.en.autoTrollBattle = { version: "5.6.24", elementText: "Enable", tooltip: "if enabled : Automatically battle troll selected"};
HHAuto_ToolTips.en.autoTrollSelector = { version: "5.6.24", elementText: "Troll selector", tooltip: "Select troll to be fought."};
HHAuto_ToolTips.en.autoTrollThreshold = { version: "5.6.24", elementText: "Threshold", tooltip: "(Integer 0 to 19)<br>Minimum troll fight to keep"};
HHAuto_ToolTips.en.eventTrollOrder = { version: "5.6.38", elementText: "Event Troll Order", tooltip: "(values separated by ;)<br>Allow to select in which order event troll are automatically battled<br>1 : Dark Lord<br>2 : Ninja Spy<br>3 : Gruntt<br>4 : Edwarda<br>5 : Donatien<br>6 : Sylvanus<br>7 : Bremen<br>8 : Finalmecia<br>9 : Fredy Sih Roko<br>10 : Karole<br>11 : Jackson's Crew<br>12 : Pandora Witch<br>13 : Nike<br>14 : Sake<br>15 : WereBunny Police"};
HHAuto_ToolTips.en.autoChampsForceStartEventGirl = { version: "5.6.98", elementText: "Event force", tooltip: "if enabled, will fight for event girl champion even if not started. Champions will need to be activated and champions to be in the filter."};
HHAuto_ToolTips.en.plusEvent = { version: "5.6.24", elementText: "+Event", tooltip: "If enabled : ignore selected troll during event to battle event"};
HHAuto_ToolTips.en.plusEventMythic = { version: "5.6.24", elementText: "+Mythic Event", tooltip: "Enable grabbing girls for mythic event, should only play them when shards are available, Mythic girl troll will be priorized over Event Troll."};
//HHAuto_ToolTips.en.eventMythicPrio = { version: "5.6.24", elementText: "Priorize over Event Troll Order", tooltip: "Mythic event girl priorized over event troll order if shards available"};
//HHAuto_ToolTips.en.autoTrollMythicByPassThreshold = { version: "5.6.24", elementText: "Mythic bypass Threshold", tooltip: "Allow mythic to bypass Troll threshold"};
HHAuto_ToolTips.en.autoSeasonTitle = { version: "5.6.24", elementText: "Season"};
HHAuto_ToolTips.en.autoSeason = { version: "5.6.24", elementText: "Enable", tooltip: "if enabled : Automatically fight in Seasons (Opponent chosen following PowerCalculation)"};
HHAuto_ToolTips.en.autoSeasonCollect = { version: "5.6.24", elementText: "Collect", tooltip: "if enabled : Automatically collect Seasons ( if multiple to collect, will collect one per kiss usage)"};
HHAuto_ToolTips.en.autoSeasonCollectAll = { version: "5.7.0", elementText: "Collect all", tooltip: "if enabled : Automatically collect all items before end of season (configured with Collect all timer)"};
HHAuto_ToolTips.en.autoSeasonThreshold = { version: "5.6.24", elementText: "Threshold", tooltip: "Minimum kiss to keep"};
HHAuto_ToolTips.en.autoQuest = { version: "5.6.74", elementText: "Main Quest", tooltip: "if enabled : Automatically do main quest"};
HHAuto_ToolTips.en.autoSideQuest = { version: "5.6.83", elementText: "Side Quests", tooltip: "if enabled : Automatically do next available side quest (Enabled main quest has higher priority than side quests)"};
HHAuto_ToolTips.en.autoQuestThreshold = { version: "5.6.24", elementText: "Threshold", tooltip: "(Integer between 0 and 99)<br>Minimum quest energy to keep"};
HHAuto_ToolTips.en.autoContest = { version: "5.6.24", elementText: "Claim Contest", tooltip: "if enabled : Collect finished contest rewards"};
HHAuto_ToolTips.en.autoFreePachinko = { version: "5.6.24", elementText: "Pachinko", tooltip: "if enabled : Automatically collect free Pachinkos"};
HHAuto_ToolTips.en.autoMythicPachinko = { version: "5.6.24", elementText: "Mythic Pachinko"};
HHAuto_ToolTips.en.autoLeaguesTitle = { version: "5.6.24", elementText: "Leagues"};
HHAuto_ToolTips.en.autoLeagues = { version: "5.6.24", elementText: "Enable", tooltip: "if enabled : Automatically battle Leagues"};
HHAuto_ToolTips.en.autoLeaguesPowerCalc = { version: "5.6.24", elementText: "Use PowerCalc", tooltip: "if enabled : will choose opponent using PowerCalc (Opponent list expires every 10 mins and take few mins to be built)"};
HHAuto_ToolTips.en.autoLeaguesCollect = { version: "5.6.24", elementText: "Collect", tooltip: "If enabled : Automatically collect Leagues"};
HHAuto_ToolTips.en.autoLeaguesSelector = { version: "5.6.24", elementText: "Target League", tooltip: "League to target, to try to demote, stay or go in higher league depending"};
HHAuto_ToolTips.en.autoLeaguesAllowWinCurrent = {version: "5.6.24", elementText:"Allow win", tooltip: "If check will allow to win targeted league and then demote next league to fall back to targeted league."};
HHAuto_ToolTips.en.autoLeaguesThreshold = { version: "5.6.24", elementText: "Threshold", tooltip: "(Integer between 0 and 14)<br>Minimum league fights to keep"};
HHAuto_ToolTips.en.autoPowerPlaces = { version: "5.6.24", elementText: "Places of Power", tooltip: "if enabled : Automatically Do powerPlaces"};
HHAuto_ToolTips.en.autoPowerPlacesIndexFilter = { version: "5.6.24", elementText: "Index Filter", tooltip: "(values separated by ;)<br>Allow to set filter and order on the PowerPlaces to do (order respected only when multiple powerPlace expires at the same time)"};//<table style='font-size: 8px;line-height: 1;'><tr><td>Reward</td>  <td>HC</td>    <td>CH</td>   <td>KH</td></tr><tr><td>Champ tickets & M¥</td>    <td>4</td>   <td>5</td>   <td>6</td></tr><tr><td>Kobans & K¥</td>  <td>7</td>   <td>8</td>   <td>9</td></tr><tr><td>Epic Book & K¥</td> <td>10</td>  <td>11</td> <td>12</td></tr><tr><td>Epic Orbs & K¥</td>  <td>13</td>  <td>14</td>  <td>15</td></tr><tr><td>Leg. Booster & K¥</td>   <td>16</td>  <td>17</td>  <td>18</td></tr><tr><td>Champions tickets & K¥</td>  <td>19</td>  <td>20</td>  <td>21</td></tr><tr><td>Epic Gift & K¥</td>  <td>22</td>  <td>23</td>  <td>24</td></tr></table>"};
HHAuto_ToolTips.en.autoPowerPlacesAll = { version: "5.6.24", elementText: "Do All", tooltip: "If enabled : ignore filter and do all powerplaces (will update Filter with current ids)"};
HHAuto_ToolTips.en.autoPowerPlacesPrecision = { version: "5.6.103", elementText: "PoP precision", tooltip: "If enabled : use more advanced algorithm to try and find best team instead of using auto. This is more useful when you have a smaller roster and may be very slow with large rosters."};
HHAuto_ToolTips.en.autoPowerPlacesInverted = { version: "5.10.0", elementText: "PoP inverted", tooltip: "If enabled : fill the POP starting from the last one."};
HHAuto_ToolTips.en.autoChampsTitle = { version: "5.6.24", elementText: "Champions"};
HHAuto_ToolTips.en.autoChamps = { version: "5.6.24", elementText: "Normal", tooltip: "if enabled : Automatically do champions (if they are started and in filter only)"};
HHAuto_ToolTips.en.autoChampsForceStart = { version: "5.6.76", elementText: "Force start", tooltip: "if enabled : will fight filtered champions even if not started."};
HHAuto_ToolTips.en.autoChampsUseEne = { version: "5.6.24", elementText: "Buy tickets", tooltip: "If enabled : use Energy to buy tickets"};
HHAuto_ToolTips.en.autoChampsFilter = { version: "5.6.24", elementText: "Filter", tooltip: "(values separated by ; 1 to 6)<br>Allow to set filter on champions to be fought"};
HHAuto_ToolTips.en.ChampTeamButton = { version: "5.8.0", elementText: "Indicate team order", tooltip: "Add number for the prefered girl order to fight champion"};
HHAuto_ToolTips.en.ChampGirlOrder = { version: "5.8.0", elementText: "", tooltip: "Girl to be used at position"};
HHAuto_ToolTips.en.ChampGirlLowOrder = { version: "5.11.0", elementText: "", tooltip: "For Worst team, girl to be used at position"};
HHAuto_ToolTips.en.autoStats = { version: "5.6.24", elementText: "Money to keep", tooltip: "(Integer)<br>Automatically buy stats in market with money above the setted amount"};
HHAuto_ToolTips.en.autoStatsSwitch = { version: "5.6.24", elementText: "Stats", tooltip: "Allow to on/off autoStats"};
HHAuto_ToolTips.en.autoExpW = { version: "5.6.24", elementText: "Books", tooltip: "if enabled : allow to buy Exp in market<br>Only buy if money bank is above the value<br>Only buy if total Exp owned is below value"};
HHAuto_ToolTips.en.autoExp = { version: "5.6.24", elementText: "Money to keep", tooltip: "(Integer)<br>Minimum money to keep."};
HHAuto_ToolTips.en.maxExp = { version: "5.6.24", elementText: "Max Exp.", tooltip: "(Integer)<br>Maximum Exp to buy"};
HHAuto_ToolTips.en.autoAffW = { version: "5.6.24", elementText: "Gifts", tooltip: "if enabled : allow to buy Aff in market<br>Only buy if money bank is above the value<br>Only buy if total Aff owned is below value"};
HHAuto_ToolTips.en.autoAff = { version: "5.6.24", elementText: "Money to keep", tooltip: "(Integer)<br>Minimum money to keep."};
HHAuto_ToolTips.en.maxAff = { version: "5.6.24", elementText: "Max Aff.", tooltip: "(Integer)<br>Maximum Aff to buy"};
HHAuto_ToolTips.en.autoLGMW = { version: "5.6.24", elementText: "Leg. Class Gear", tooltip: "if enabled : allow to buy Mono Legendary gear in the market<br>Only buy if money bank is above the value"};
HHAuto_ToolTips.en.autoLGM = { version: "5.6.24", elementText: "Money to keep", tooltip: "(Integer)<br>Minimum money to keep."};
HHAuto_ToolTips.en.autoLGRW = { version: "5.6.24", elementText: "Leg. Rainbow Gear", tooltip: "if enabled : allow to buy Rainbow Legendary gear in the market<br>Only buy if money bank is above the value"};
HHAuto_ToolTips.en.autoLGR = { version: "5.6.24", elementText: "Money to keep", tooltip: "(Integer)<br>Minimum money to keep."};
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
HHAuto_ToolTips.en.povpogTitle = { version: "5.6.133", elementText: "Path of Value/Glory"};
HHAuto_ToolTips.en.seasonalEventTitle = { version: "5.6.133", elementText: "Seasonal Event"};
HHAuto_ToolTips.en.PoAMaskRewards = { version: "5.6.24", elementText: "PoA mask claimed", tooltip: "Masked claimed rewards for Path of Attraction."};
HHAuto_ToolTips.en.PoVMaskRewards = { version: "5.6.26", elementText: "PoV mask claimed", tooltip: "Masked claimed rewards for Path of Valor."};
HHAuto_ToolTips.en.PoGMaskRewards = { version: "5.6.89", elementText: "PoG mask claimed", tooltip: "Masked claimed rewards for Path of Glory."};
HHAuto_ToolTips.en.SeasonalEventMaskRewards = { version: "5.6.132", elementText: "Seasonal Event mask claimed", tooltip: "Masked claimed rewards for Seasonal Event."};
HHAuto_ToolTips.en.BossBangEvent = { version: "5.6.137", elementText: "Boss Bang Event", tooltip: "Perform boss bang fight script will start with the team configured after."};
HHAuto_ToolTips.en.bossBangMinTeam = { version: "5.6.137", elementText: "First Team", tooltip: "First team to start with<br>If 5 will start with last team and reach the first one."};
HHAuto_ToolTips.en.showTooltips = { version: "5.6.24", elementText: "Show tooltips", tooltip: "Show tooltip on menu."};
HHAuto_ToolTips.en.showMarketTools = { version: "5.6.24", elementText: "Show market tools", tooltip: "Show Market tools."};
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
HHAuto_ToolTips.en.PachinkoFillOrbs = {version: "5.6.134", elementText: 'Fill all orbs', tooltip: "Fill input with all available orbs."};
HHAuto_ToolTips.en.ChangeTeamButton = {version: "5.6.24", elementText: "Current Best", tooltip: "Get list of top 16 girls for your team."};
HHAuto_ToolTips.en.ChangeTeamButton2 = {version: "5.6.24", elementText: "Possible Best", tooltip: "Get list of top 16 girls for your team if they are Max Lv & Aff"};
HHAuto_ToolTips.en.AssignTopTeam = {version: "5.6.24", elementText: "Assign first 7", tooltip: "Put the first 7 ones in the team."};
HHAuto_ToolTips.en.ExportGirlsData = {version: "5.6.24", elementText: "⤓", tooltip: "Export Girls data."};
HHAuto_ToolTips.en.autoDailyRewardsCollect = {version: "5.6.54", elementText: "Collect daily Rewards", tooltip: "Collect daily rewards if not collected 2 hours before end of HH day."};
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
HHAuto_ToolTips.en.autoDailyGoalsCollect = {version: "5.6.54", elementText: "Collect daily Goals", tooltip: "Collect daily Goals if not collected 2 hours before end of HH day."};
HHAuto_ToolTips.en.HaremSortMenuSortText = {version: "5.6.56", elementText: "Select the wanted harem sorting : ", tooltip: ""};
HHAuto_ToolTips.en.DateAcquired = {version: "5.6.56", elementText: "Date recruited", tooltip: ""};
HHAuto_ToolTips.en.Grade = {version: "5.6.56", elementText: "Grade", tooltip: ""};
HHAuto_ToolTips.en.Level = {version: "5.6.56", elementText: "Level", tooltip: ""};
HHAuto_ToolTips.en.Power = {version: "5.6.56", elementText: "Power", tooltip: ""};
HHAuto_ToolTips.en.upgrade_cost = {version: "5.6.56", elementText: "Upgrade cost", tooltip: ""};
HHAuto_ToolTips.en.HaremSortMenuSortBy = {version: "5.6.56", elementText: "Sort by ", tooltip: ""};
HHAuto_ToolTips.en.HaremSortMenuSortReverse = {version: "5.6.56", elementText: "Reverse", tooltip: ""};
HHAuto_ToolTips.en.collectAllTimer = {version: "5.7.0", elementText: "Collect all timer (in hour)", tooltip: "Hour(s) before end of events to collect all rewards (Low time create risk of not collecting), Need activation on each events (POV, POG, season)"};


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
//HHAuto_ToolTips.fr.calculatePowerLimits = { version: "5.6.24", elementText: "Limites perso", tooltip: "(rouge;orange)<br>Définissez vos propres limites de rouge et d'orange pour les opposants<br> -6000;0 veux dire<br> <-6000 est rouge, entre -6000 et 0 est orange et >=0 est vert"};
HHAuto_ToolTips.fr.showInfo = { version: "5.6.24", elementText: "Infos", tooltip: "Si activé : affiche une fenêtre d'informations sur le script."};
HHAuto_ToolTips.fr.autoSalary = { version: "5.6.24", elementText: "Salaire", tooltip: "Si activé :<br>Collecte les salaires toutes les X secondes."};
//HHAuto_ToolTips.fr.autoSalaryMinTimer = { version: "5.6.24", elementText: "Attente min.", tooltip: "(Nombre entier)<br>Secondes d'attente minimum entre deux collectes."};
HHAuto_ToolTips.fr.autoMission = { version: "5.6.24", elementText: "Missions", tooltip: "Si activé : lance automatiquement les missions."};
HHAuto_ToolTips.fr.autoMissionCollect = { version: "5.6.24", elementText: "Collecter", tooltip: "Si activé : collecte automatiquement les récompenses des missions."};
HHAuto_ToolTips.fr.autoTrollBattle = { version: "5.6.24", elementText: "Activer", tooltip: "Si activé : combat automatiquement le troll."};
HHAuto_ToolTips.fr.autoTrollSelector = { version: "5.6.24", elementText: "Sélection troll", tooltip: "Sélection du troll à combattre"};
HHAuto_ToolTips.fr.autoTrollThreshold = { version: "5.6.24", elementText: "Réserve", tooltip: "Points de combat de trolls (poings) minimum à conserver"};
HHAuto_ToolTips.fr.eventTrollOrder = { version: "5.6.24", elementText: "Ordre Trolls d'événement", tooltip: "Permet de sélectionner l'ordre dans lequel les trolls d'événements sont automatiquement combattus."};
HHAuto_ToolTips.fr.plusEvent = { version: "5.6.24", elementText: "+Evénmt.", tooltip: "Si activé : ignore le troll sélectionné et combat les trolls d'événement s'il y a une fille à gagner."};
HHAuto_ToolTips.fr.plusEventMythic = { version: "5.6.24", elementText: "+Evénmt. mythique", tooltip: "Si activé : ignorer le troll sélectionné et combat le troll d'événement mythique s'il y a une fille à gagner et des fragments disponibles."};
HHAuto_ToolTips.fr.autoSeason = { version: "5.6.24", elementText: "Activer", tooltip: "Si activé : combat automatique de saison (Adversaire sélectionné avec PowerCalc)."};
HHAuto_ToolTips.fr.autoSeasonCollect = { version: "5.6.24", elementText: "Collecter", tooltip: "Si activé : collecte automatiquement les récompenses de saison (si plusieurs à collecter, en collectera une par combat)."};
HHAuto_ToolTips.fr.autoSeasonThreshold = { version: "5.6.24", elementText: "Réserve", tooltip: "Points de combat de saison (Baiser) minimum à conserver."};
HHAuto_ToolTips.fr.autoQuest = { version: "5.6.24", elementText: "Quête", tooltip: "Si activé : Fait automatiquement les quêtes"};
HHAuto_ToolTips.fr.autoQuestThreshold = { version: "5.6.24", elementText: "Réserve", tooltip: "Energie de quête minimum à conserver"};
HHAuto_ToolTips.fr.autoContest = { version: "5.6.24", elementText: "Compét'", tooltip: "Si activé : récolter les récompenses de la compét' terminée"};
HHAuto_ToolTips.fr.autoFreePachinko = { version: "5.6.24", elementText: "Pachinko", tooltip: "Si activé : collecte automatiquement les Pachinkos gratuits"};
HHAuto_ToolTips.fr.autoMythicPachinko = { version: "5.6.24", elementText: "Pachinko mythique"};
HHAuto_ToolTips.fr.autoLeagues = { version: "5.6.24", elementText: "Activer", tooltip: "Si activé : Combattre automatiquement en Ligues"};
HHAuto_ToolTips.fr.autoLeaguesPowerCalc = { version: "5.6.24", elementText: "Utiliser PowerCalc", tooltip: "Si activé : choisira l'adversaire en utilisant PowerCalc (la liste des adversaires expire toutes les 10 minutes et prend quelques minutes pour être construite)."};
HHAuto_ToolTips.fr.autoLeaguesCollect = { version: "5.6.24", elementText: "Collecter", tooltip: "Si activé : Collecte automatiquement les récompenses de la Ligue terminée"};
HHAuto_ToolTips.fr.autoLeaguesSelector = { version: "5.6.24", elementText: "Ligue ciblée", tooltip: "Objectif de niveau de ligue (à atteindre, à conserver ou à dépasser selon le choix)."};
HHAuto_ToolTips.fr.autoLeaguesAllowWinCurrent = {version: "5.6.24", elementText:"Autoriser dépassement", tooltip: "Si activé, le script tentera de gagner la ligue ciblée puis rétrogradera la semaine suivante pour retourner dans la ligue ciblée."};
HHAuto_ToolTips.fr.autoLeaguesThreshold = { version: "5.6.24", elementText: "Réserve", tooltip: "Points de combat de ligue minimum à conserver."};
HHAuto_ToolTips.fr.autoPowerPlaces = { version: "5.6.24", elementText: "Lieux de pouvoir", tooltip: "Si activé : Fait automatiquement les lieux de pouvoir."};
HHAuto_ToolTips.fr.autoPowerPlacesIndexFilter = { version: "5.6.24", elementText: "Filtre", tooltip: "Permet de définir un filtre et un ordre sur les lieux de pouvoir à faire (uniquement lorsque plusieurs lieux de pouvoir expirent en même temps)."};
HHAuto_ToolTips.fr.autoPowerPlacesAll = { version: "5.6.24", elementText: "Tous", tooltip: "Si activé : ignore le filtre et fait tous les lieux de pouvoir (mettra à jour le filtre avec les identifiants actuels)"};
HHAuto_ToolTips.fr.autoChampsTitle = { version: "5.6.24", elementText: "Champions"};
HHAuto_ToolTips.fr.autoChamps = { version: "5.6.24", elementText: "Normal", tooltip: "Si activé : combat automatiquement les champions (s'ils sont démarrés manuellement et en filtre uniquement)."};
HHAuto_ToolTips.fr.autoChampsUseEne = { version: "5.6.24", elementText: "Achat tickets", tooltip: "Si activé : utiliser l'énergie pour acheter des tickets de champion (60 énergie nécessaire ; ne marchera pas si Quête auto activée)."};
HHAuto_ToolTips.fr.autoChampsFilter = { version: "5.6.24", elementText: "Filtre", tooltip: "Permet de filtrer les champions à combattre."};
HHAuto_ToolTips.fr.autoStatsSwitch = { version: "5.6.24", elementText: "Stats", tooltip: "Achète automatiquement des statistiques sur le marché."};
HHAuto_ToolTips.fr.autoStats = { version: "5.6.24", elementText: "Argent à garder", tooltip: "Argent minimum à conserver lors de l'achat automatique de statistiques."};
HHAuto_ToolTips.fr.autoExpW = { version: "5.6.24", elementText: "Livres", tooltip: "Si activé : permet d'acheter des livres d'expérience sur le marché tout en respectant les limites d'expérience et d'argent ci-après."};
HHAuto_ToolTips.fr.autoExp = { version: "5.6.24", elementText: "Argent à garder", tooltip: "Argent minimum à conserver lors de l'achat automatique de livres d'expérience."};
HHAuto_ToolTips.fr.maxExp = { version: "5.6.24", elementText: "Exp. max", tooltip: "Expérience maximum en stock pour l'achat de livres d'expérience."};
HHAuto_ToolTips.fr.autoAffW = { version: "5.6.24", elementText: "Cadeaux", tooltip: "Si activé : permet d'acheter des cadeaux d'affection sur le marché tout en respectant les limites d'affection et d'argent ci-après."};
HHAuto_ToolTips.fr.autoAff = { version: "5.6.24", elementText: "Argent à garder", tooltip: "Argent minimum à conserver lors de l'achat automatique de cadeaux d'affection."};
HHAuto_ToolTips.fr.maxAff = { version: "5.6.24", elementText: "Aff. max", tooltip: "Affection maximum en stock pour l'achat de cadeaux d'affection."};
HHAuto_ToolTips.fr.autoLGMW = { version: "5.6.24", elementText: "Eq. de classe lég.", tooltip: "Si activé : permet d'acheter du matériel de classe Légendaire sur le marché tout en respectant la limite d'argent ci-après."};
HHAuto_ToolTips.fr.autoLGM = { version: "5.6.24", elementText: "Argent à garder", tooltip: "Argent minimum à conserver lors de l'achat automatique d'équipement de classe légendaire."};
HHAuto_ToolTips.fr.autoLGRW = { version: "5.6.24", elementText: "Eq. super-sexe lég.", tooltip: "Si activé : permet d'acheter du matériel super-sexe Légendaire sur le marché tout en respectant la limite d'argent ci-après."};
HHAuto_ToolTips.fr.autoLGR = { version: "5.6.24", elementText: "Argent à garder", tooltip: "Argent minimum à conserver lors de l'achat automatique d'équipement super-sexe."};
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
HHAuto_ToolTips.fr.seasonalEventTitle = { version: "5.6.133", elementText: "Evènements saisoniers"};
HHAuto_ToolTips.fr.mousePause = {version: "5.6.135", elementText: "Pause souris", tooltip: "Pause le script pour 5 secondes quand des mouvements de la souris sont detecté. Evite le sript d'interrompre les actions manuelles. (en ms, 5000ms=5s)"};
HHAuto_ToolTips.fr.PoVMaskRewards = { version: "5.6.133", elementText: "Masquer gains VDLV", tooltip: "Permet de masquer les gains réclamés de la Voie de la Valeur."};
HHAuto_ToolTips.fr.PoGMaskRewards = { version: "5.6.133", elementText: "Masquer gains VDLG", tooltip: "Permet de masquer les gains réclamés de la Voie de la Gloire."};
HHAuto_ToolTips.fr.SeasonalEventMaskRewards = { version: "5.6.133", elementText: "Masquer gains saisonier", tooltip: "Permet de masquer les gains réclamés des évènements saisoniers."};
HHAuto_ToolTips.fr.BossBangEvent = { version: "5.6.137", elementText: "Evènements Boss Bang", tooltip: "Si activé : Effectue les combats boss bang en commençant par l'équipe configuré si après."};
HHAuto_ToolTips.fr.bossBangMinTeam = { version: "5.6.137", elementText: "Première équipe", tooltip: "Première équipe à utiliser<br>Si 5, le script commencera par la dernière pour finir par la premiere."};
HHAuto_ToolTips.fr.autoDailyRewardsCollect = {version: "5.6.133", elementText: "Collecter récompense journalier", tooltip: "Permet de collecter les récompenses journalières si non collectées 2 heures avant la fin du jour HH."};
HHAuto_ToolTips.fr.autoDailyGoalsCollect = {version: "5.6.133", elementText: "Collecter objectifs journalier", tooltip: "Permet de collecter les objectifs journaliers si non collectés 2 heures avant la fin du jour HH."};
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
HHAuto_ToolTips.de.autoLGMW = { version: "5.6.24", elementText: "Buy Leg Gear Mono", tooltip: "Wenn aktiv : Erlaube es Mono legendäre Rüstung im Markt zu kaufen<br>Kauft nur wenn dein Geld über dem Wert liegt"};
HHAuto_ToolTips.de.autoLGM = { version: "5.6.24", elementText: "Min Geld verbleib", tooltip: "Minimum an Geld das behalten wird."};
HHAuto_ToolTips.de.autoLGRW = { version: "5.6.24", elementText: "Buy Leg Gear Rainbow", tooltip: "Wenn aktiv : Erlaube es Regenbogenausrüstung im Markt zu kaufen<br>Kauft nur wenn dein Geld über dem Wert liegt"};
HHAuto_ToolTips.de.autoLGR = { version: "5.6.24", elementText: "Min Geld verbleib", tooltip: "Minimum an Geld das behalten wird."};
HHAuto_ToolTips.de.OpponentListBuilding = { version: "5.6.24", elementText: "Gegnerliste wird erstellt", tooltip: ""};
HHAuto_ToolTips.de.OpponentParsed = { version: "5.6.24", elementText: "Gegner analysiert", tooltip: ""};

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
HHAuto_ToolTips.es.autoLGMW = { version: "5.6.24", elementText: "Compra Eqip.Leg.Mono", tooltip: "Si habilitado: Compra equipamiento legendario mono en el mercado<br>Solo compra si el banco de dinero es superior a este valor"};
HHAuto_ToolTips.es.autoLGM = { version: "5.6.24", elementText: "Min dinero", tooltip: "(Entero)<br>Mínimo dinero a guardar"};
HHAuto_ToolTips.es.autoLGRW = { version: "5.6.24", elementText: "Compra Eqip.Leg.Arcoiris", tooltip: "Si habilitado: Compra equipamiento legendario arcoiris en el mercado<br>Solo compra si el banco de dinero es superior a este valor"};
HHAuto_ToolTips.es.autoLGR = { version: "5.6.24", elementText: "Min dinero", tooltip: "(Entero)<br>Mínimo dinero a guardar"};
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

var Trollz = getHHScriptVars("trollzList");
var Leagues = getHHScriptVars("leaguesList");
var Timers = {};

var HHStoredVars = {};
//Settings Vars
//Do not move, has to be first one
HHStoredVars.HHAuto_Setting_settPerTab =
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
HHStoredVars.HHAuto_Setting_autoAff =
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
HHStoredVars.HHAuto_Setting_autoAffW =
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
HHStoredVars.HHAuto_Setting_autoBuyBoosters =
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
HHStoredVars.HHAuto_Setting_autoBuyBoostersFilter =
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
HHStoredVars.HHAuto_Setting_autoChamps =
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
        clearTimer('nextChampionTime');
    }
};
HHStoredVars.HHAuto_Setting_autoChampsForceStart =
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
        clearTimer('nextChampionTime');
    }
};
HHStoredVars.HHAuto_Setting_autoChampsFilter =
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
        clearTimer('nextChampionTime');
    }
};
HHStoredVars.HHAuto_Setting_autoChampsUseEne =
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
HHStoredVars.HHAuto_Setting_autoClubChamp =
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
HHStoredVars.HHAuto_Setting_autoClubChampMax =
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
HHStoredVars.HHAuto_Setting_autoClubForceStart =
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
HHStoredVars.HHAuto_Setting_autoContest =
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
HHStoredVars.HHAuto_Setting_autoExp =
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
HHStoredVars.HHAuto_Setting_autoExpW =
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
HHStoredVars.HHAuto_Setting_autoFreePachinko =
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
HHStoredVars.HHAuto_Setting_autoLeagues =
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
HHStoredVars.HHAuto_Setting_autoLeaguesAllowWinCurrent =
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
HHStoredVars.HHAuto_Setting_autoLeaguesCollect =
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
HHStoredVars.HHAuto_Setting_autoLeaguesPowerCalc =
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
HHStoredVars.HHAuto_Setting_autoLeaguesSelectedIndex =
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
HHStoredVars.HHAuto_Setting_autoLeaguesThreshold =
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
HHStoredVars.HHAuto_Setting_autoLGM =
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
HHStoredVars.HHAuto_Setting_autoLGMW =
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
HHStoredVars.HHAuto_Setting_autoLGR =
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
HHStoredVars.HHAuto_Setting_autoLGRW =
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
HHStoredVars.HHAuto_Setting_autoMission =
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
HHStoredVars.HHAuto_Setting_autoMissionCollect =
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
HHStoredVars.HHAuto_Setting_autoMissionKFirst =
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
HHStoredVars.HHAuto_Setting_autoPowerPlaces =
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
HHStoredVars.HHAuto_Setting_autoPowerPlacesAll =
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
        clearTimer('minPowerPlacesTime');
        cleanTempPopToStart();
    }
};
HHStoredVars.HHAuto_Setting_autoPowerPlacesPrecision =
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
HHStoredVars.HHAuto_Setting_autoPowerPlacesInverted =
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
HHStoredVars.HHAuto_Setting_autoPowerPlacesIndexFilter =
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
        clearTimer('minPowerPlacesTime');
        cleanTempPopToStart();
    }
};
HHStoredVars.HHAuto_Setting_autoQuest =
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
HHStoredVars.HHAuto_Setting_autoSideQuest =
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
HHStoredVars.HHAuto_Setting_autoQuestThreshold =
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
HHStoredVars.HHAuto_Setting_autoSalary =
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
        clearTimer('nextSalaryTime');
    }
};
HHStoredVars.HHAuto_Setting_autoSalaryMaxTimer =
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
HHStoredVars.HHAuto_Setting_autoSalaryMinSalary =
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
        clearTimer('nextSalaryTime');
    }
};
HHStoredVars.HHAuto_Setting_autoSeason =
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
HHStoredVars.HHAuto_Setting_autoSeasonCollect =
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
                    clearTimer('nextSeasonCollectTime');
                }
            }
           }
};
HHStoredVars.HHAuto_Setting_autoSeasonCollectAll =
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
HHStoredVars.HHAuto_Setting_autoSeasonCollectablesList =
    {
    default:JSON.stringify([]),
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Array"
};
HHStoredVars.HHAuto_Setting_autoSeasonPassReds =
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
HHStoredVars.HHAuto_Setting_autoSeasonThreshold =
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
HHStoredVars.HHAuto_Setting_autoStats =
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
HHStoredVars.HHAuto_Setting_autoStatsSwitch =
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
HHStoredVars.HHAuto_Setting_autoTrollBattle =
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
HHStoredVars.HHAuto_Setting_autoTrollMythicByPassParanoia =
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
HHStoredVars.HHAuto_Setting_autoTrollSelectedIndex =
    {
    default:"0",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"selectedIndex",
    kobanUsing:false,
    customMenuID:"autoTrollSelector",
    isValid:/^[0-9]|1[0-5]$/
};
HHStoredVars.HHAuto_Setting_autoTrollThreshold =
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
HHStoredVars.HHAuto_Setting_autoChampsForceStartEventGirl =
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
HHStoredVars.HHAuto_Setting_buyCombat =
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
HHStoredVars.HHAuto_Setting_buyCombTimer =
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
HHStoredVars.HHAuto_Setting_buyMythicCombat =
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
HHStoredVars.HHAuto_Setting_buyMythicCombTimer =
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
/*HHStoredVars.HHAuto_Setting_calculatePowerLimits =
    {
    default:"default",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"List",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};*/
HHStoredVars.HHAuto_Setting_autoDailyRewardsCollect =
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
                    getAndStoreCollectPreferences("HHAuto_Setting_autoDailyRewardsCollectablesList", getTextForUI("menuDailyCollectableText","elementText"));
                    clearTimer('nextDailyRewardsCollectTime');
                }
            }
           }
};
HHStoredVars.HHAuto_Setting_autoDailyRewardsCollectablesList =
    {
    default:JSON.stringify([]),
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Array"
};
HHStoredVars.HHAuto_Setting_mousePause =
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
HHStoredVars.HHAuto_Setting_mousePauseTimeout =
    {
    default:"5000",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value"
};
HHStoredVars.HHAuto_Setting_collectAllTimer =
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
HHStoredVars.HHAuto_Setting_eventTrollOrder =
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
HHStoredVars.HHAuto_Setting_master =
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
HHStoredVars.HHAuto_Setting_maxAff =
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
HHStoredVars.HHAuto_Setting_maxExp =
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
HHStoredVars.HHAuto_Setting_minShardsX10 =
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
HHStoredVars.HHAuto_Setting_minShardsX50 =
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
HHStoredVars.HHAuto_Setting_paranoia =
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
HHStoredVars.HHAuto_Setting_paranoiaSettings =
    {
    default:"140-320/Sleep:28800-30400|Active:250-460|Casual:1500-2700/6:Sleep|8:Casual|10:Active|12:Casual|14:Active|18:Casual|20:Active|22:Casual|24:Sleep",
    storage:"Storage()",
    HHType:"Setting"
};
HHStoredVars.HHAuto_Setting_paranoiaSpendsBefore =
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
HHStoredVars.HHAuto_Setting_plusEvent =
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
HHStoredVars.HHAuto_Setting_plusEventMythic =
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
HHStoredVars.HHAuto_Setting_plusEventBossBang =
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
HHStoredVars.HHAuto_Setting_bossBangMinTeam =
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
HHStoredVars.HHAuto_Setting_PoAMaskRewards =
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
HHStoredVars.HHAuto_Setting_PoVMaskRewards =
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
HHStoredVars.HHAuto_Setting_PoGMaskRewards =
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
HHStoredVars.HHAuto_Setting_SeasonMaskRewards =
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
HHStoredVars.HHAuto_Setting_SeasonalEventMaskRewards =
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
HHStoredVars.HHAuto_Setting_showCalculatePower =
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
HHStoredVars.HHAuto_Setting_showInfo =
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
HHStoredVars.HHAuto_Setting_showMarketTools =
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
HHStoredVars.HHAuto_Setting_showTooltips =
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
HHStoredVars.HHAuto_Setting_spendKobans0 =
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
HHStoredVars.HHAuto_Setting_kobanBank =
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
HHStoredVars.HHAuto_Setting_useX10Fights =
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
HHStoredVars.HHAuto_Setting_useX10FightsAllowNormalEvent =
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
HHStoredVars.HHAuto_Setting_useX50Fights =
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
HHStoredVars.HHAuto_Setting_useX50FightsAllowNormalEvent =
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
HHStoredVars.HHAuto_Setting_saveDefaults =
    {
    storage:"localStorage",
    HHType:"Setting"
};
HHStoredVars.HHAuto_Setting_autoPantheon =
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
HHStoredVars.HHAuto_Setting_autoPantheonThreshold =
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
HHStoredVars.HHAuto_Setting_autoSeasonalEventCollect =
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
                    clearTimer('nextSeasonalEventCollectTime');
                }
            }
           }
};
HHStoredVars.HHAuto_Setting_autoSeasonalEventCollectAll =
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
HHStoredVars.HHAuto_Setting_autoSeasonalEventCollectablesList =
    {
    default:JSON.stringify([]),
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Array"
};
HHStoredVars.HHAuto_Setting_autoPoVCollect =
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
                    clearTimer('nextPoVCollectTime');
                }
            }
           }
};
HHStoredVars.HHAuto_Setting_autoPoVCollectAll =
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
HHStoredVars.HHAuto_Setting_autoPoVCollectablesList =
    {
    default:JSON.stringify([]),
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Array"
};
HHStoredVars.HHAuto_Setting_autoPoGCollect =
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
                    clearTimer('nextPoGCollectTime');
                }
            }
           }
};
HHStoredVars.HHAuto_Setting_autoPoGCollectAll =
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
HHStoredVars.HHAuto_Setting_autoPoGCollectablesList =
    {
    default:JSON.stringify([]),
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Array"
};
HHStoredVars.HHAuto_Setting_autoDailyGoalsCollect =
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
                    clearTimer('nextDailyGoalsCollectTime');
                }
            }
           }
};
HHStoredVars.HHAuto_Setting_autoDailyGoalsCollectablesList =
    {
    default:JSON.stringify([]),
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Array"
};
// Temp vars
HHStoredVars.HHAuto_Temp_autoLoop =
    {
    default:"true",
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_battlePowerRequired =
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
HHStoredVars.HHAuto_Temp_questRequirement =
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
HHStoredVars.HHAuto_Temp_autoLoopTimeMili =
    {
    default:"500",
    storage:"Storage()",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_freshStart =
    {
    default:"no",
    storage:"Storage()",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_Logging =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_Debug =
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
HHStoredVars.HHAuto_Temp_autoTrollBattleSaveQuest =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_burst =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_charLevel =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_eventsGirlz =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_eventGirl =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_autoChampsEventGirls =
    {
    storage:"sessionStorage",
    HHType:"Temp",
    isValid:/^\[({"girl_id":"(\d)+","champ_id":"(\d)+","girl_shards":"(\d)+","girl_name":"([^"])+","event_id":"([^"])+"},?)+\]$/
};
HHStoredVars.HHAuto_Temp_fought =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_haveAff =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_haveExp =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_LeagueOpponentList =
    {
    storage:"sessionStorage",
    HHType:"Temp",
    isValid:/^{"expirationDate":\d+,"opponentsList":{("\d+":{((("(win|loss|avgTurns)":\d*[.,]?\d+)|("scoreClass":"(minus|plus|close)")|("points":{("\d{1,3}":\d*[.,]?\d+,?)+})),?)+},?)+}}$/
};
HHStoredVars.HHAuto_Temp_LeagueTempOpponentList =
    {
    storage:"sessionStorage",
    HHType:"Temp",
    isValid:/^{"expirationDate":\d+,"opponentsList":{("\d+":{((("(win|loss|avgTurns)":\d*[.,]?\d+)|("scoreClass":"(minus|plus|close)")|("points":{("\d{1,3}":\d*[.,]?\d+,?)+})),?)+},?)+}}$/
};
/*HHStoredVars.HHAuto_Temp_opponentsListExpirationDate =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};*/
HHStoredVars.HHAuto_Temp_paranoiaLeagueBlocked =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_paranoiaQuestBlocked =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_paranoiaSpendings =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_pinfo =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_PopToStart =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_PopUnableToStart =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_storeContents =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_Timers =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_NextSwitch =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_Totalpops =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_currentlyAvailablePops =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_CheckSpentPoints =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_eventsList =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_bossBangTeam =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_LeagueSavedData =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_HaremSize =
    {
    storage:"localStorage",
    HHType:"Temp",
    isValid:/{"count":(\d)+,"count_date":(\d)+}/
};
HHStoredVars.HHAuto_Temp_BoostersData =
    {
    storage:"localStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_LastPageCalled =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_PoVEndDate =
    {
    storage:"localStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_PoGEndDate =
    {
    storage:"localStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_missionsGiftLeft =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_defaultCustomHaremSort =
    {
    storage:"localStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_unkownPagesList =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_trollPoints =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};

var updateData = function () {
    //logHHAuto("updating UI");
    document.querySelectorAll("div#sMenu input[pattern]").forEach(currentInput =>
                                                                  {
        currentInput.checkValidity();
    });
    if (getStoredValue("HHAuto_Setting_showInfo") =="true") // && busy==false // && getPage()==getHHScriptVars("pagesIDHome")
    {
        var Tegzd='';
        Tegzd+=(getStoredValue("HHAuto_Setting_master") ==="true"?"<span style='color:LimeGreen'>HH auto ++ ON":"<span style='color:red'>HH auto ++ OFF")+'</span>';
        //Tegzd+=(getStoredValue("HHAuto_Setting_master") ==="true"?"<span style='color:LimeGreen'>"+getTextForUI("master","elementText")+" : ON":"<span style='color:red'>"+getTextForUI("master","elementText")+" : OFF")+'</span>';
        //Tegzd+=getTextForUI("master","elementText")+' : '+(getStoredValue("HHAuto_Setting_master") ==="true"?"<span style='color:LimeGreen'>ON":"<span style='color:red'>OFF")+'</span>';
        Tegzd += '<ul>';
        if (getStoredValue("HHAuto_Setting_paranoia") =="true")
        {
            Tegzd += '<li>'+getStoredValue("HHAuto_Temp_pinfo")+': '+getTimeLeft('paranoiaSwitch')+'</li>';
        }
        if (getHHScriptVars('isEnabledTrollBattle',false) && getStoredValue("HHAuto_Setting_autoTrollBattle") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoTrollTitle","elementText")+' : '+getHHVars('Hero.energies.fight.amount')+'/'+getHHVars('Hero.energies.fight.max_amount')+'</li>';
        }
        if (getHHScriptVars("isEnabledSalary",false) && getStoredValue("HHAuto_Setting_autoSalary") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoSalary","elementText")+' : '+getTimeLeft('nextSalaryTime')+'</li>';
        }
        if (getHHScriptVars('isEnabledSeason',false) && getStoredValue("HHAuto_Setting_autoSeason") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoSeasonTitle","elementText")+' : '+getHHVars('Hero.energies.kiss.amount')+'/'+getHHVars('Hero.energies.kiss.max_amount')+' ('+getTimeLeft('nextSeasonTime')+')'+'</li>';
        }
        /*if (getHHScriptVars('isEnabledSeason',false) && getStoredValue("HHAuto_Setting_autoSeasonCollect") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoSeasonCollect","elementText")+" "+getTextForUI("autoSeasonTitle","elementText")+' : '+getTimeLeft('nextSeasonCollectTime')+'</li>';
        }*/
        if (getHHScriptVars('isEnabledLeagues',false) && getStoredValue("HHAuto_Setting_autoLeagues") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoLeaguesTitle","elementText")+' : '+getHHVars('Hero.energies.challenge.amount')+'/'+getHHVars('Hero.energies.challenge.max_amount')+' ('+getTimeLeft('nextLeaguesTime')+')'+'</li>';
        }
        if (getHHScriptVars("isEnabledChamps",false) && getStoredValue("HHAuto_Setting_autoChamps") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoChampsTitle","elementText")+' : '+getTimeLeft('nextChampionTime')+'</li>';
        }
        if (getHHScriptVars("isEnabledClubChamp",false) && getStoredValue("HHAuto_Setting_autoClubChamp") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoClubChamp","elementText")+' : '+getTimeLeft('nextClubChampionTime')+'</li>';
        }
        if (getHHScriptVars('isEnabledPantheon',false) && getStoredValue("HHAuto_Setting_autoPantheon") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoPantheonTitle","elementText")+' : '+getHHVars('Hero.energies.worship.amount')+'/'+getHHVars('Hero.energies.worship.max_amount')+' ('+getTimeLeft('nextPantheonTime')+')'+'</li>';
        }
        if (getHHScriptVars("isEnabledShop",false))
        {
            Tegzd += '<li>'+getTextForUI("autoBuy","elementText")+' : '+getTimeLeft('nextShopTime')+'</li>';
        }
        if (getHHScriptVars("isEnabledMission",false) && getStoredValue("HHAuto_Setting_autoMission") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoMission","elementText")+' : '+getTimeLeft('nextMissionTime')+'</li>';
        }
        if (getHHScriptVars("isEnabledContest",false) && getStoredValue("HHAuto_Setting_autoContest") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoContest","elementText")+' : '+getTimeLeft('nextContestTime')+'</li>';
        }
        if (getHHScriptVars("isEnabledPowerPlaces",false) && getStoredValue("HHAuto_Setting_autoPowerPlaces") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoPowerPlaces","elementText")+' : '+getTimeLeft('minPowerPlacesTime')+'</li>';
        }
        if ( getHHScriptVars("isEnabledPachinko",false) && getStoredValue("HHAuto_Setting_autoFreePachinko") =="true")
        {
            if (getTimer('nextPachinkoTime') !== -1)
            {
                Tegzd += '<li>'+getTextForUI("autoFreePachinko","elementText")+' : '+getTimeLeft('nextPachinkoTime')+'</li>';
            }
            if (getTimer('nextPachinko2Time') !== -1)
            {
                Tegzd += '<li>'+getTextForUI("autoMythicPachinko","elementText")+' : '+getTimeLeft('nextPachinko2Time')+'</li>';
            }
        }
        if (getTimer('eventMythicNextWave') !== -1)
        {
            Tegzd += '<li>'+getTextForUI("mythicGirlNext","elementText")+' : '+getTimeLeft('eventMythicNextWave')+'</li>';
        }
        if (getStoredValue("HHAuto_Temp_haveAff"))
        {
            Tegzd += '<li>'+getTextForUI("autoAffW","elementText")+' : '+add1000sSeparator(getStoredValue("HHAuto_Temp_haveAff"))+'</li>';
        }
        if (getStoredValue("HHAuto_Temp_haveExp"))
        {
            Tegzd += '<li>'+getTextForUI("autoExpW","elementText")+' : '+add1000sSeparator(getStoredValue("HHAuto_Temp_haveExp"))+'</li>';
        }
        /*if (isJSON(getStoredValue("HHAuto_Temp_BoostersData")))
        {
            for(let boost of JSON.parse(getStoredValue("HHAuto_Temp_BoostersData")))
            {
                Tegzd += `<li>${boost.rarity} <img class="iconImg" src="${boost.ico}" /> : ${getBoosterExpiration(boost)} </li>`;
            }
        }*/
        Tegzd += '</ul>';
        //if (Tegzd.length>0)
        //{
        document.getElementById('pInfo').style.display='block';
        document.getElementById('pInfo').innerHTML = Tegzd; //document.getElementById('pInfo').textContent=Tegzd;
        // }
        // else
        // {
        //     document.getElementById('pInfo').style.display='none';
        // }
    }
    else
    {
        document.getElementById('pInfo').style.display='none';
    }
};

function maskInactiveMenus()
{
    let menuIDList =["isEnabledDailyGoals", "isEnabledPoVPoG", "isEnabledPoV", "isEnabledPoG", "isEnabledSeasonalEvent" , "isEnabledBossBangEvent" , "isEnabledDailyRewards","isEnabledMission","isEnabledContest","isEnabledTrollBattle","isEnabledPowerPlaces","isEnabledSalary","isEnabledPachinko","isEnabledQuest","isEnabledSideQuest","isEnabledSeason","isEnabledLeagues","isEnabledAllChamps","isEnabledChamps","isEnabledClubChamp","isEnabledPantheon","isEnabledShop"];
    for (let menu of menuIDList)
    {
        if ( document.getElementById(menu) !== null && getHHScriptVars(menu,false) !== null && !getHHScriptVars(menu,false) )
        {
            document.getElementById(menu).style.display = "none";
        }
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
}

let mouseBusy = false;
let mouseBusyTimeout = 0;
function makeMouseBusy(ms) {
    clearTimeout(mouseBusyTimeout);
    mouseBusy = true;
    mouseBusyTimeout = setTimeout(function(){mouseBusy = false;}, ms);
};
var start = function () {

    if (unsafeWindow.Hero===undefined)
    {
        logHHAuto('???no Hero???');
        $('.hh_logo').click();
        setTimeout(hardened_start,5000);
        return;
    }
    checkClubStatus();
    replaceCheatClick();
    migrateHHVars();

    $('.redirect.gay').hide();
    $('.redirect.comix').hide();

    $('#starter_offer').hide();
    $('#starter_offer_background').hide();

    if (getStoredValue("HHAuto_Temp_Timers"))
    {
        Timers=JSON.parse(getStoredValue("HHAuto_Temp_Timers"));
    }
    clearEventData("onlyCheckEventsHHScript");
    setDefaults();

    if (getStoredValue("HHAuto_Setting_mousePause") === "true") {
        const mouseTimeoutVal = getStoredValue("HHAuto_Setting_mousePauseTimeout").isInteger ? getStoredValue("HHAuto_Setting_mousePauseTimeout") : 5000;
        document.onmousemove = function() { makeMouseBusy(mouseTimeoutVal); };
        document.onscroll = function() { makeMouseBusy(mouseTimeoutVal); };
        document.onmouseup = function() { makeMouseBusy(mouseTimeoutVal); };
    }

    // Add UI buttons.
    let sMenu =`<div id="sMenu" class="HHAutoScriptMenu" style="top: 45px;right: 52px;padding: 4px;display: none;opacity: 1;border-radius: 4px;border: 1px solid #ffa23e;background-color: #1e261e;font-size:x-small; position:absolute; text-align:left; flex-direction:column; justify-content:space-between; z-index:10000; overflow:auto; max-height:calc(100% - 45px)">`
        +`<div style="position: absolute;left: 40%;color: #F00">${getTextForUI("noOtherScripts","elementText")}</div>`
        +`<div class="optionsRow">`
            +`<div class="optionsColumn">`
                +`<div style="padding:3px; display:flex; flex-direction:column;">`
                    +`<span>HH Automatic ++</span>`
                    +`<span style="font-size:smaller; padding-bottom:10px">Version ${GM_info.script.version}</span>`
                    +`<div class="internalOptionsRow" style="padding:3px">`
                        +`<div class="tooltipHH">`
                            +`<span class="tooltipHHtext">${getTextForUI("gitHub","tooltip")}</span>`
                            +`<label class="myButton" id="git">${getTextForUI("gitHub","elementText")}</label>`
                        +`</div>`
                        +`<div class="tooltipHH">`
                            +`<span class="tooltipHHtext">${getTextForUI("ReportBugs","tooltip")}</span>`
                            +`<label class="myButton" id="ReportBugs">${getTextForUI("ReportBugs","elementText")}</label>`
                        +`</div>`
                        +`<div class="tooltipHH">`
                            +`<span class="tooltipHHtext">${getTextForUI("DebugMenu","tooltip")}</span>`
                            +`<label class="myButton" id="DebugMenu">${getTextForUI("DebugMenu","elementText")}</label>`
                        +`</div>`
                    +`</div>`
                    +`<div class="internalOptionsRow" style="padding:3px">`
                        +`<div class="tooltipHH">`
                            +`<span class="tooltipHHtext">${getTextForUI("saveConfig","tooltip")}</span>`
                            +`<label class="myButton" id="saveConfig">${getTextForUI("saveConfig","elementText")}</label>`
                        +`</div>`
                        +`<div class="tooltipHH">`
                            +`<span class="tooltipHHtext">${getTextForUI("loadConfig","tooltip")}</span>`
                            +`<label class="myButton" id="loadConfig">${getTextForUI("loadConfig","elementText")}</label>`
                        +`</div>`
                    +`</div>`
                    +`<div class="internalOptionsRow" style="padding:3px">`
                        +`<div class="tooltipHH">`
                            +`<span class="tooltipHHtext">${getTextForUI("saveDefaults","tooltip")}</span>`
                            +`<label class="myButton" id="saveDefaults">${getTextForUI("saveDefaults","elementText")}</label>`
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<img class="iconImg" src="https://hh2.hh-content.com/design/menu/panel.svg" />`
                        +`<span class="optionsBoxTitle">${getTextForUI("globalTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="rowOptionsBox">`
                        +`<div class="optionsColumn">`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("master","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("master","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="master" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("paranoia","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("paranoia","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="paranoia" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div id="isEnabledDailyRewards" class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("autoDailyRewardsCollect","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("autoDailyRewardsCollect","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="autoDailyRewardsCollect" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
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
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("collectAllTimer","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("collectAllTimer","tooltip")}</span>`
                                    +`<input style="text-align:center; width:25px" id="collectAllTimer" required pattern="${HHAuto_inputPattern.collectAllTimer}" type="text">`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                        +`<div class="optionsColumn">`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("settPerTab","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("settPerTab","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="settPerTab" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("paranoiaSpendsBefore","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("paranoiaSpendsBefore","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="paranoiaSpendsBefore" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div id="isEnabledDailyGoals" class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("autoDailyGoalsCollect","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("autoDailyGoalsCollect","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="autoDailyGoalsCollect" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div class="rowOptionsBox">`
                    +`<div class="labelAndButton">`
                        +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("spendKobans0","elementText")}</span>`
                        +`<div class="imgAndObjectRow">`
                            +`<img class="iconImg" src="https://hh2.hh-content.com/design/menu/affil_prog.svg" />`
                            +`<div style="padding-left:5px">`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("spendKobans0","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="spendKobans0" type="checkbox">`
                                        +`<span class="slider round kobans">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                    +`<div class="labelAndButton">`
                        +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("kobanBank","elementText")}</span>`
                        +`<div class="imgAndObjectRow">`
                            +`<img class="iconImg" src="https://hh2.hh-content.com/pictures/design/ic_hard_currency.png" />`
                            +`<div style="padding-left:5px">`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("kobanBank","tooltip")}</span>`
                                    +`<input id="kobanBank" style="text-align:right; width:45px" required pattern="${HHAuto_inputPattern.nWith1000sSeparator}" type="text">`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<img class="iconImg" src="https://hh2.hh-content.com/design/menu/sex_friends.svg" />`
                        +`<span class="optionsBoxTitle">${getTextForUI("displayTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="rowOptionsBox">`
                        +`<div class="optionsColumn">`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("showInfo","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("showInfo","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="showInfo" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("showTooltips","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("showTooltips","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="showTooltips" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                        +`<div class="optionsColumn">`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("showCalculatePower","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("showCalculatePower","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="showCalculatePower" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("PoAMaskRewards","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("PoAMaskRewards","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="PoAMaskRewards" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                +`</div>`
            +`</div>`
            +`<div class="optionsColumn">`
                +`<div class="optionsRow">`
                    +`<div class="optionsBoxWithTitle">`
                        +`<div class="optionsBoxTitle">`
                            +`<img class="iconImg" src="https://hh2.hh-content.com/design/menu/missions.svg" />`
                            +`<span class="optionsBoxTitle">${getTextForUI("autoActivitiesTitle","elementText")}</span>`
                        +`</div>`
                        +`<div class="optionsBox">`
                            +`<div class="internalOptionsRow">`
                                +`<div id="isEnabledMission" class="internalOptionsRow">`
                                    +`<div class="labelAndButton">`
                                        +`<span class="HHMenuItemName">${getTextForUI("autoMission","elementText")}</span>`
                                        +`<div class="tooltipHH">`
                                            +`<span class="tooltipHHtext">${getTextForUI("autoMission","tooltip")}</span>`
                                            +`<label class="switch">`
                                                +`<input id="autoMission" type="checkbox">`
                                                +`<span class="slider round">`
                                                +`</span>`
                                            +`</label>`
                                        +`</div>`
                                    +`</div>`
                                    +`<div class="labelAndButton">`
                                        +`<span class="HHMenuItemName">${getTextForUI("autoMissionCollect","elementText")}</span>`
                                        +`<div class="tooltipHH">`
                                            +`<span class="tooltipHHtext">${getTextForUI("autoMissionCollect","tooltip")}</span>`
                                            +`<label class="switch">`
                                                +`<input id="autoMissionCollect" type="checkbox">`
                                                +`<span class="slider round">`
                                                +`</span>`
                                            +`</label>`
                                        +`</div>`
                                    +`</div>`
                                    +`<div class="labelAndButton">`
                                        +`<span class="HHMenuItemName">${getTextForUI("autoMissionKFirst","elementText")}</span>`
                                        +`<div class="tooltipHH">`
                                            +`<span class="tooltipHHtext">${getTextForUI("autoMissionKFirst","tooltip")}</span>`
                                            +`<label class="switch">`
                                                +`<input id="autoMissionKFirst" type="checkbox">`
                                                +`<span class="slider round">`
                                                +`</span>`
                                            +`</label>`
                                        +`</div>`
                                    +`</div>`
                                +`</div>`
                                +`<div id="isEnabledContest" class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoContest","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoContest","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="autoContest" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                            +`<div id="isEnabledPowerPlaces" class="internalOptionsRow">`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoPowerPlaces","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoPowerPlaces","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="autoPowerPlaces" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoPowerPlacesIndexFilter","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoPowerPlacesIndexFilter","tooltip")}</span>`
                                        +`<input id="autoPowerPlacesIndexFilter" required pattern="${HHAuto_inputPattern.autoPowerPlacesIndexFilter}" type="text">`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoPowerPlacesAll","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoPowerPlacesAll","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="autoPowerPlacesAll" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoPowerPlacesPrecision","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoPowerPlacesPrecision","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="autoPowerPlacesPrecision" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoPowerPlacesInverted","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoPowerPlacesInverted","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="autoPowerPlacesInverted" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                    +`<div class="optionsColumn">`
                        +`<div class="optionsBoxTitle">`
                        +`</div>`
                        +`<div id="isEnabledSalary" class="rowOptionsBox">`
                            +`<div class="internalOptionsRow">`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoSalary","elementText")}</span>`
                                    +`<div class="imgAndObjectRow">`
                                        +`<img class="iconImg" src="https://hh2.hh-content.com/pictures/design/harem.svg" />`
                                        +`<div style="padding-left:5px">`
                                            +`<div class="tooltipHH">`
                                                +`<span class="tooltipHHtext">${getTextForUI("autoSalary","tooltip")}</span>`
                                                +`<label class="switch">`
                                                    +`<input id="autoSalary" type="checkbox">`
                                                    +`<span class="slider round">`
                                                    +`</span>`
                                                +`</label>`
                                            +`</div>`
                                        +`</div>`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoSalaryMinSalary","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoSalaryMinSalary","tooltip")}</span>`
                                        +`<input id="autoSalaryMinSalary" style="text-align:right; width:45px" required pattern="${HHAuto_inputPattern.nWith1000sSeparator}" type="text">`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoSalaryMaxTimer","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoSalaryMaxTimer","tooltip")}</span>`
                                        +`<input id="autoSalaryMaxTimer" style="text-align:right; width:45px" required pattern="${HHAuto_inputPattern.nWith1000sSeparator}" type="text">`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                        +`<div class="optionsRow">`
                            +`<div id="isEnabledPachinko" class="rowOptionsBox">`
                                +`<div class="internalOptionsRow" style="justify-content: space-between">`
                                    +`<div class="labelAndButton">`
                                        +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoFreePachinko","elementText")}</span>`
                                        +`<div class="imgAndObjectRow">`
                                            +`<img class="iconImg" src="https://hh2.hh-content.com/pictures/design/menu/pachinko.svg" />`
                                            +`<div style="padding-left:5px">`
                                                +`<div class="tooltipHH">`
                                                    +`<span class="tooltipHHtext">${getTextForUI("autoFreePachinko","tooltip")}</span>`
                                                    +`<label class="switch">`
                                                        +`<input id="autoFreePachinko" type="checkbox">`
                                                        +`<span class="slider round">`
                                                        +`</span>`
                                                    +`</label>`
                                                +`</div>`
                                            +`</div>`
                                        +`</div>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                            +`<div id="isEnabledQuest" class="rowOptionsBox">`
                                +`<div class="internalOptionsRow">`
                                    +`<div class="labelAndButton">`
                                        +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoQuest","elementText")}</span>`
                                        +`<div class="imgAndObjectRow">`
                                            +`<img class="iconImg" src="https://hh2.hh-content.com/design/menu/forward.svg" />`
                                            +`<div style="padding-left:5px">`
                                                +`<div class="tooltipHH">`
                                                    +`<span class="tooltipHHtext">${getTextForUI("autoQuest","tooltip")}</span>`
                                                    +`<label class="switch">`
                                                        +`<input id="autoQuest" type="checkbox">`
                                                        +`<span class="slider round">`
                                                        +`</span>`
                                                    +`</label>`
                                                +`</div>`
                                            +`</div>`
                                        +`</div>`
                                    +`</div>`
                                    +`<div id="isEnabledSideQuest" class="labelAndButton">`
                                        +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoSideQuest","elementText")}</span>`
                                        +`<div class="tooltipHH">`
                                            +`<span class="tooltipHHtext">${getTextForUI("autoSideQuest","tooltip")}</span>`
                                            +`<label class="switch">`
                                                +`<input id="autoSideQuest" type="checkbox">`
                                                +`<span class="slider round">`
                                                +`</span>`
                                            +`</label>`
                                        +`</div>`
                                    +`</div>`
                                    +`<div class="labelAndButton">`
                                        +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoQuestThreshold","elementText")}</span>`
                                        +`<div class="imgAndObjectRow">`
                                            +`<img class="iconImg" src="https://hh2.hh-content.com/pictures/design/ic_energy_quest.png" />`
                                            +`<div style="padding-left:5px">`
                                                +`<div class="tooltipHH">`
                                                    +`<span class="tooltipHHtext">${getTextForUI("autoQuestThreshold","tooltip")}</span>`
                                                    +`<input style="text-align:center; width:25px" id="autoQuestThreshold" required pattern="${HHAuto_inputPattern.autoQuestThreshold}" type="text">`
                                                +`</div>`
                                            +`</div>`
                                        +`</div>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div class="optionsRow">`
                    +`<div id="isEnabledSeason" class="optionsBoxWithTitle">`
                        +`<div class="optionsBoxTitle">`
                            +`<img class="iconImg" src="https://hh2.hh-content.com/design/menu/seasons.svg" />`
                            +`<span class="optionsBoxTitle">${getTextForUI("autoSeasonTitle","elementText")}</span>`
                        +`</div>`
                        +`<div class="optionsBox">`
                            +`<div class="internalOptionsRow">`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoSeason","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoSeason","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="autoSeason" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoSeasonCollect","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoSeasonCollect","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="autoSeasonCollect" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoSeasonCollectAll","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoSeasonCollectAll","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="autoSeasonCollectAll" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("SeasonMaskRewards","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("SeasonMaskRewards","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="SeasonMaskRewards" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                            +`<div class="internalOptionsRow">`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoSeasonPassReds","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoSeasonPassReds","tooltip")}</span>`
                                        +`<label  class="switch">`
                                            +`<input id="autoSeasonPassReds" type="checkbox">`
                                            +`<span class="slider round kobans">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoSeasonThreshold","elementText")}</span>`
                                    +`<div class="imgAndObjectRow">`
                                        +`<img class="iconImg" src="https://hh2.hh-content.com/pictures/design/ic_kiss.png" />`
                                        +`<div style="padding-left:5px">`
                                            +`<div class="tooltipHH">`
                                                +`<span class="tooltipHHtext">${getTextForUI("autoSeasonThreshold","tooltip")}</span>`
                                                +`<input style="text-align:center; width:25px" id="autoSeasonThreshold" required pattern="${HHAuto_inputPattern.autoSeasonThreshold}" type="text">`
                                            +`</div>`
                                        +`</div>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                    +`<div id="isEnabledLeagues" class="optionsBoxWithTitle">`
                        +`<div class="optionsBoxTitle">`
                            +`<img class="iconImg" src="https://hh2.hh-content.com/design/menu/leaderboard.svg" />`
                            +`<span class="optionsBoxTitle">${getTextForUI("autoLeaguesTitle","elementText")}</span>`
                        +`</div>`
                        +`<div class="optionsBox">`
                            +`<div class="internalOptionsRow">`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoLeagues","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoLeagues","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="autoLeagues" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton" style="align-items:center">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoLeaguesPowerCalc","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoLeaguesPowerCalc","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="autoLeaguesPowerCalc" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton" style="align-items:right">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoLeaguesCollect","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoLeaguesCollect","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="autoLeaguesCollect" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                            +`<div class="internalOptionsRow">`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoLeaguesSelector","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoLeaguesSelector","tooltip")}</span>`
                                        +`<select id="autoLeaguesSelector">`
                                        +`</select>`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoLeaguesAllowWinCurrent","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoLeaguesAllowWinCurrent","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="autoLeaguesAllowWinCurrent" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoLeaguesThreshold","elementText")}</span>`
                                    +`<div class="imgAndObjectRow">`
                                        +`<img class="iconImg" src="https://hh2.hh-content.com/league_points.png" />`
                                        +`<div style="padding-left:5px">`
                                            +`<div class="tooltipHH">`
                                                +`<span class="tooltipHHtext">${getTextForUI("autoLeaguesThreshold","tooltip")}</span>`
                                                +`<input style="text-align:center; width:25px" id="autoLeaguesThreshold" required pattern="${HHAuto_inputPattern.autoLeaguesThreshold}"type="text">`
                                            +`</div>`
                                        +`</div>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div class="optionsRow">`
                    +`<div class="optionsBoxWithTitle">`
                        +`<div class="optionsBoxTitle">`
                            +`<span class="optionsBoxTitle">${getTextForUI("povpogTitle","elementText")}</span>`
                        +`</div>`
                        +`<div id="isEnabledPoVPoG" class="optionsBox">`
                            +`<div id="isEnabledPoV" class="internalOptionsRow" style="justify-content: space-evenly">`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("PoVMaskRewards","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("PoVMaskRewards","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="PoVMaskRewards" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoPoVCollect","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoPoVCollect","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="autoPoVCollect" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoPoVCollectAll","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoPoVCollectAll","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="autoPoVCollectAll" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                            +`<div id="isEnabledPoG" class="internalOptionsRow" style="justify-content: space-evenly">`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("PoGMaskRewards","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("PoGMaskRewards","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="PoGMaskRewards" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoPoGCollect","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoPoGCollect","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="autoPoGCollect" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoPoGCollectAll","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoPoGCollectAll","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="autoPoGCollectAll" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                    +`<div id="isEnabledSeasonalEvent" class="optionsBoxWithTitle">`
                        +`<div class="optionsBoxTitle">`
                            +`<span class="optionsBoxTitle">${getTextForUI("seasonalEventTitle","elementText")}</span>`
                        +`</div>`
                        +`<div class="optionsBox">`
                            +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("SeasonalEventMaskRewards","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("SeasonalEventMaskRewards","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="SeasonalEventMaskRewards" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoSeasonalEventCollect","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoSeasonalEventCollect","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="autoSeasonalEventCollect" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton" style="display:none;">` // Hidden until next seasonal event
                                    +`<span class="HHMenuItemName">${getTextForUI("autoSeasonalEventCollectAll","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoSeasonalEventCollectAll","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="autoSeasonalEventCollectAll" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div id="isEnabledTrollBattle" class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<img class="iconImg" src="https://hh2.hh-content.com/pictures/design/menu/map.svg" />`
                        +`<span class="optionsBoxTitle">${getTextForUI("autoTrollTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="optionsBox">`
                        +`<div class="internalOptionsRow" style="justify-content: space-between">`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("autoTrollBattle","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("autoTrollBattle","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="autoTrollBattle" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("autoTrollSelector","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("autoTrollSelector","tooltip")}</span>`
                                    +`<select id="autoTrollSelector">`
                                    +`</select>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoTrollThreshold","elementText")}</span>`
                                +`<div class="imgAndObjectRow">`
                                    +`<img class="iconImg" src="https://hh.hh-content.com/pictures/design/ic_energy_fight.png" />`
                                    +`<div style="padding-left:5px">`
                                        +`<div class="tooltipHH">`
                                            +`<span class="tooltipHHtext">${getTextForUI("autoTrollThreshold","tooltip")}</span>`
                                            +`<input style="text-align:center; width:25px" id="autoTrollThreshold" required pattern="${HHAuto_inputPattern.autoTrollThreshold}" type="text">`
                                        +`</div>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("useX10Fights","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("useX10Fights","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="useX10Fights" type="checkbox">`
                                        +`<span class="slider round kobans">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("useX10FightsAllowNormalEvent","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("useX10FightsAllowNormalEvent","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="useX10FightsAllowNormalEvent" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("minShardsX10","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("minShardsX10","tooltip")}</span>`
                                    +`<input id="minShardsX10" style="text-align:center; width:7em" required pattern="${HHAuto_inputPattern.minShardsX}"type="text">`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("useX50Fights","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("useX50Fights","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="useX50Fights" type="checkbox">`
                                        +`<span class="slider round kobans">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("useX50FightsAllowNormalEvent","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("useX50FightsAllowNormalEvent","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="useX50FightsAllowNormalEvent" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("minShardsX50","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("minShardsX50","tooltip")}</span>`
                                    +`<input id="minShardsX50" style="text-align:center; width:7em" required pattern="${HHAuto_inputPattern.minShardsX}" type="text">`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("plusEvent","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("plusEvent","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="plusEvent" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("eventTrollOrder","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("eventTrollOrder","tooltip")}</span>`
                                    +`<input id="eventTrollOrder" style="width:120px" required pattern="${HHAuto_inputPattern.eventTrollOrder}"type="text">`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("buyCombat","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("buyCombat","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="buyCombat" type="checkbox">`
                                        +`<span class="slider round kobans">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("buyCombTimer","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("buyCombTimer","tooltip")}</span>`
                                    +`<input id="buyCombTimer" style="text-align:center; width:50%" required pattern="${HHAuto_inputPattern.buyCombTimer}" type="text">`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("plusEventMythic","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("plusEventMythic","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="plusEventMythic" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("autoTrollMythicByPassParanoia","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("autoTrollMythicByPassParanoia","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="autoTrollMythicByPassParanoia" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("buyMythicCombat","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("buyMythicCombat","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="buyMythicCombat" type="checkbox">`
                                        +`<span class="slider round kobans">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("buyMythicCombTimer","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("buyMythicCombTimer","tooltip")}</span>`
                                    +`<input id="buyMythicCombTimer" style="text-align:center; width:50%" required pattern="${HHAuto_inputPattern.buyMythicCombTimer}" type="text">`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                +`</div>`
            +`</div>`
            +`<div class="optionsColumn">`
                +`<div id="isEnabledAllChamps" class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<img class="iconImg" src="https://hh2.hh-content.com/design/menu/ic_champions.svg" />`
                        +`<span class="optionsBoxTitle">${getTextForUI("autoChampsTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="optionsBox">`
                        +`<div id="isEnabledChamps" class="internalOptionsRow">`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("autoChamps","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("autoChamps","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="autoChamps" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("autoChampsForceStart","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("autoChampsForceStart","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="autoChampsForceStart" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoChampsUseEne","elementText")}</span>`
                                +`<div class="imgAndObjectRow">`
                                    +`<img class="iconImg" src="https://hh2.hh-content.com/pictures/design/ic_energy_quest.png" />`
                                    +`<div style="padding-left:5px">`
                                        +`<div class="tooltipHH">`
                                            +`<span class="tooltipHHtext">${getTextForUI("autoChampsUseEne","tooltip")}</span>`
                                            +`<label class="switch">`
                                                +`<input id="autoChampsUseEne" type="checkbox">`
                                                +`<span class="slider round">`
                                                +`</span>`
                                            +`</label>`
                                        +`</div>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("autoChampsFilter","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("autoChampsFilter","tooltip")}</span>`
                                    +`<input style="text-align:center; width:70px" id="autoChampsFilter" required pattern="${HHAuto_inputPattern.autoChampsFilter}" type="text">`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("autoChampsForceStartEventGirl","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("autoChampsForceStartEventGirl","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="autoChampsForceStartEventGirl" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                        +`<div id="isEnabledClubChamp" class="internalOptionsRow">`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("autoClubChamp","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("autoClubChamp","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="autoClubChamp" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("autoClubForceStart","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("autoClubForceStart","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="autoClubForceStart" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton" style="align-items: flex-end;">`
                                +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoClubChampMax","elementText")}</span>`
                                +`<div class="imgAndObjectRow">`
                                    +`<img class="iconImg" src="https://hh2.hh-content.com/pictures/design/champion_ticket.png" />`
                                    +`<div style="padding-left:5px">`
                                        +`<div class="tooltipHH">`
                                            +`<span class="tooltipHHtext">${getTextForUI("autoClubChampMax","tooltip")}</span>`
                                            +`<input style="text-align:center; width:45px" id="autoClubChampMax" required pattern="${HHAuto_inputPattern.autoClubChampMax}" type="text">`
                                        +`</div>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div class="optionsRow" style="justify-content: space-evenly">`
                    +`<div id="isEnabledPantheon" class="optionsBoxWithTitle">`
                        +`<div class="optionsBoxTitle">`
                            +`<img class="iconImg" src="https://hh2.hh-content.com/design/menu/ic_champions.svg" />`
                            +`<span class="optionsBoxTitle">${getTextForUI("autoPantheonTitle","elementText")}</span>`
                        +`</div>`
                        +`<div class="optionsBox">`
                            +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName">${getTextForUI("autoPantheon","elementText")}</span>`
                                    +`<div class="tooltipHH">`
                                        +`<span class="tooltipHHtext">${getTextForUI("autoPantheon","tooltip")}</span>`
                                        +`<label class="switch">`
                                            +`<input id="autoPantheon" type="checkbox">`
                                            +`<span class="slider round">`
                                            +`</span>`
                                        +`</label>`
                                    +`</div>`
                                +`</div>`
                                +`<div class="labelAndButton">`
                                    +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoPantheonThreshold","elementText")}</span>`
                                    +`<div class="imgAndObjectRow">`
                                        +`<img class="iconImg" src="https://hh.hh-content.com/pictures/design/ic_worship.svg" />`
                                        +`<div style="padding-left:5px">`
                                            +`<div class="tooltipHH">`
                                                +`<span class="tooltipHHtext">${getTextForUI("autoPantheonThreshold","tooltip")}</span>`
                                                +`<input style="text-align:center; width:25px" id="autoPantheonThreshold" required pattern="${HHAuto_inputPattern.autoPantheonThreshold}" type="text">`
                                            +`</div>`
                                        +`</div>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                    +`<div id="isEnabledBossBangEvent" class="optionsBox">`
                        +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("BossBangEvent","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("BossBangEvent","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="plusEventBossBang" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("bossBangMinTeam","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("bossBangMinTeam","tooltip")}</span>`
                                    +`<input style="text-align:center; width:25px" id="bossBangMinTeam" required pattern="${HHAuto_inputPattern.bossBangMinTeam}" type="text">`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div id="isEnabledShop" class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<img class="iconImg" src="https://hh2.hh-content.com/design/menu/shop.svg" />`
                        +`<span class="optionsBoxTitle">${getTextForUI("autoBuy","elementText")}</span>`
                    +`</div>`
                    +`<div class="optionsBox">`
                        +`<div class="internalOptionsRow">`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoStatsSwitch","elementText")}</span>`
                                +`<div class="imgAndObjectRow">`
                                    +`<img class="iconImg" src="https://hh2.hh-content.com/design/ic_plus.svg" />`
                                    +`<div style="padding-left:5px">`
                                        +`<div class="tooltipHH">`
                                            +`<span class="tooltipHHtext">${getTextForUI("autoStatsSwitch","tooltip")}</span>`
                                            +`<label class="switch">`
                                                +`<input id="autoStatsSwitch" type="checkbox">`
                                                +`<span class="slider round">`
                                                +`</span>`
                                            +`</label>`
                                        +`</div>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("autoStats","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("autoStats","tooltip")}</span>`
                                    +`<input class="maxMoneyInputField" id="autoStats" required pattern="${HHAuto_inputPattern.nWith1000sSeparator}" type="text">`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoExpW","elementText")}</span>`
                                +`<div class="imgAndObjectRow">`
                                    +`<img class="iconImg" src="https://hh2.hh-content.com/design/ic_books_gray.svg" />`
                                    +`<div style="padding-left:5px">`
                                        +`<div class="tooltipHH">`
                                            +`<span class="tooltipHHtext">${getTextForUI("autoExpW","tooltip")}</span>`
                                            +`<label class="switch">`
                                                +`<input id="autoExpW" type="checkbox">`
                                                +`<span class="slider round">`
                                                +`</span>`
                                            +`</label>`
                                        +`</div>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("maxExp","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("maxExp","tooltip")}</span>`
                                    +`<input style="text-align:right; width:60px" id="maxExp" required pattern="${HHAuto_inputPattern.nWith1000sSeparator}" type="text">`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("autoExp","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("autoExp","tooltip")}</span>`
                                    +`<input class="maxMoneyInputField" id="autoExp" required pattern="${HHAuto_inputPattern.nWith1000sSeparator}" type="text">`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoAffW","elementText")}</span>`
                                +`<div class="imgAndObjectRow">`
                                    +`<img class="iconImg" src="https://hh2.hh-content.com/design/ic_gifts_gray.svg" />`
                                    +`<div style="padding-left:5px">`
                                        +`<div class="tooltipHH">`
                                            +`<span class="tooltipHHtext">${getTextForUI("autoAffW","tooltip")}</span>`
                                            +`<label class="switch">`
                                                +`<input id="autoAffW" type="checkbox">`
                                                +`<span class="slider round">`
                                                +`</span>`
                                            +`</label>`
                                        +`</div>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("maxAff","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("maxAff","tooltip")}</span>`
                                    +`<input style="text-align:right; width:60px" id="maxAff" required pattern="${HHAuto_inputPattern.nWith1000sSeparator}" type="text">`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("autoAff","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("autoAff","tooltip")}</span>`
                                    +`<input class="maxMoneyInputField" id="autoAff" required pattern="${HHAuto_inputPattern.nWith1000sSeparator}" type="text">`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoLGMW","elementText")}</span>`
                                +`<div class="imgAndObjectRow">`
                                    +`<img class="iconImg" src="https://hh2.hh-content.com/design/ic_equipment_gray.svg" />`
                                    +`<div style="padding-left:5px">`
                                        +`<div class="tooltipHH">`
                                            +`<span class="tooltipHHtext">${getTextForUI("autoLGMW","tooltip")}</span>`
                                            +`<label class="switch">`
                                                +`<input id="autoLGMW" type="checkbox">`
                                                +`<span class="slider round">`
                                                +`</span>`
                                            +`</label>`
                                        +`</div>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("autoLGM","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("autoLGM","tooltip")}</span>`
                                    +`<input class="maxMoneyInputField" id="autoLGM" required pattern="${HHAuto_inputPattern.nWith1000sSeparator}" type="text">`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoLGRW","elementText")}</span>`
                                +`<div class="imgAndObjectRow">`
                                    +`<img class="iconImg" src="https://hh2.hh-content.com/pictures/misc/items_icons/16.svg" />`
                                    +`<div style="padding-left:5px">`
                                        +`<div class="tooltipHH">`
                                            +`<span class="tooltipHHtext">${getTextForUI("autoLGRW","tooltip")}</span>`
                                            +`<label class="switch">`
                                                +`<input id="autoLGRW" type="checkbox">`
                                                +`<span class="slider round">`
                                                +`</span>`
                                            +`</label>`
                                        +`</div>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("autoLGR","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("autoLGR","tooltip")}</span>`
                                    +`<input class="maxMoneyInputField" id="autoLGR" required pattern="${HHAuto_inputPattern.nWith1000sSeparator}" type="text">`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("autoBuyBoosters","elementText")}</span>`
                                +`<div class="imgAndObjectRow">`
                                    +`<img class="iconImg" src="https://hh2.hh-content.com/design/ic_boosters_gray.svg" />`
                                    +`<div style="padding-left:5px">`
                                        +`<div class="tooltipHH">`
                                            +`<span class="tooltipHHtext">${getTextForUI("autoBuyBoosters","tooltip")}</span>`
                                            +`<label class="switch">`
                                                +`<input id="autoBuyBoosters" type="checkbox">`
                                                +`<span class="slider round kobans">`
                                                +`</span>`
                                            +`</label>`
                                        +`</div>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName">${getTextForUI("autoBuyBoostersFilter","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("autoBuyBoostersFilter","tooltip")}</span>`
                                    +`<input style="text-align:center; width:70px" id="autoBuyBoostersFilter" required pattern="${HHAuto_inputPattern.autoBuyBoostersFilter}" type="text">`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            +`<div class="labelAndButton">`
                                +`<span class="HHMenuItemName" style="padding-bottom:2px">${getTextForUI("showMarketTools","elementText")}</span>`
                                +`<div class="imgAndObjectRow">`
                                    +`<img class="iconImg" src="https://hh2.hh-content.com/design/menu/panel.svg" />`
                                    +`<div style="padding-left:5px">`
                                        +`<div class="tooltipHH">`
                                            +`<span class="tooltipHHtext">${getTextForUI("showMarketTools","tooltip")}</span>`
                                            +`<label class="switch">`
                                                +`<input id="showMarketTools" type="checkbox">`
                                                +`<span class="slider round">`
                                                +`</span>`
                                            +`</label>`
                                        +`</div>`
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                +`</div>`
            +`</div>`
        +`</div>`
    +`</div>`
    $('#contains_all').prepend(sMenu);

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
                +'   top: 20px;'
                +'   right: 74px;'
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

    var div = document.createElement('div');
    div.innerHTML = '<div id="pInfo" ></div>'.trim(); //height: auto;

    var pInfo = div.firstElementChild;

    pInfo.addEventListener("dblclick", function() {
        let masterSwitch = document.getElementById("master");
        if (masterSwitch.checked === true) {
            setStoredValue("HHAuto_Setting_master", "false");
            masterSwitch.checked = false;
            //console.log("Master switch off");
        } else {
            setStoredValue("HHAuto_Setting_master", "true");
            masterSwitch.checked = true;
            //console.log("Master switch on");
        }
    });
    if(getPage()==getHHScriptVars("pagesIDHome"))
    {
        GM_addStyle('#pInfo:hover {max-height : none} #pInfo { max-height : 220px} @media only screen and (max-width: 1025px) {#pInfo { ;top:17% }}');
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

    document.getElementById('contains_all').appendChild(div.firstChild);
    maskInactiveMenus();

    // Add auto troll options
    var trollOptions = document.getElementById("autoTrollSelector");

    for (var i=0;i<getHHVars('Hero.infos.questing.id_world');i++)
    {
        var option = document.createElement("option");
        option.value=i;
        option.text = Trollz[i];
        trollOptions.add(option);
    };

    // Add league options
    var leaguesOptions = document.getElementById("autoLeaguesSelector");

    for (var j in Leagues)
    {
        var optionL = document.createElement("option");
        optionL.value=Number(j)+1;
        optionL.text = Leagues[j];
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



    setStoredValue("HHAuto_Temp_autoLoop", "true");
    if (typeof getStoredValue("HHAuto_Temp_freshStart") == "undefined" || isNaN(Number(getStoredValue("HHAuto_Temp_autoLoopTimeMili")))) {
        setDefaults(true);
    }

    if (getBurst())
    {
        doShopping();
        if ( getStoredValue("HHAuto_Setting_autoStatsSwitch") ==="true" )
        {
            doStatUpgrades();
        }
    }

    if (hh_nutaku)
    {
        function Alive()
        {
            window.top.postMessage({ImAlive:true},'*');
            if (getStoredValue("HHAuto_Temp_autoLoop") =="true")
            {
                setTimeout(Alive,2000);
            }
        }
        Alive();
    }
    if (isJSON(getStoredValue("HHAuto_Temp_LastPageCalled")) && JSON.parse(getStoredValue("HHAuto_Temp_LastPageCalled")).page.indexOf(".html") > 0 )
    {
        //console.log("testingHome : setting to : "+getPage());
        setStoredValue("HHAuto_Temp_LastPageCalled", JSON.stringify({page:getPage(), dateTime:new Date().getTime()}));
    }
    if (isJSON(getStoredValue("HHAuto_Temp_LastPageCalled")) && JSON.parse(getStoredValue("HHAuto_Temp_LastPageCalled")).page === getHHScriptVars("pagesIDHome"))
    {
        //console.log("testingHome : delete");
        deleteStoredValue("HHAuto_Temp_LastPageCalled");
    }
    getPage(true);
    setTimeout(autoLoop,1000);
    GM_registerMenuCommand(getTextForUI("translate","elementText"),manageTranslationPopUp);

};

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

function switchHHMenuButton(isActive)
{
    var element = document.getElementById("sMenuButton");
    if(element !== null)
    {
        if (getStoredValue("HHAuto_Setting_master") === "false")
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
    GM_addStyle('#HHAutoPopupGlobal.HHAutoOverlay { overflow: auto;  z-index:1000;   position: fixed;   top: 0;   bottom: 0;   left: 0;   right: 0;   background: rgba(0, 0, 0, 0.7);   transition: opacity 500ms;     display: flex;   align-items: center; }  #HHAutoPopupGlobalPopup {   margin: auto;   padding: 20px;   background: #fff;   border-radius: 5px;   position: relative;   transition: all 5s ease-in-out; }  #HHAutoPopupGlobalTitle {   margin-top: 0;   color: #333;   font-size: larger; } #HHAutoPopupGlobalClose {   position: absolute;   top: 20px;   right: 30px;   transition: all 200ms;   font-size: 30px;   font-weight: bold;   text-decoration: none;   color: #333; } #HHAutoPopupGlobalClose:hover {   color: #06D85F; } #HHAutoPopupGlobalContent {   max-height: 30%;   overflow: auto;   color: #333;   font-size: x-small; }')
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

var started=false;
var debugMenuID;
var hardened_start=function()
{
    debugMenuID = GM_registerMenuCommand(getTextForUI("saveDebug","elementText"), saveHHDebugLog);
    //GM_unregisterMenuCommand(debugMenuID);
    if (!started)
    {
        started=true;
        start();
    }

}

setTimeout(hardened_start,5000);

$("document").ready(function()
                    {
    hardened_start();

});

//all following lines credit:Tom208 OCD script
//old simuFight
function simuFight(player, opponent) {
    let playerEgoCheck = 0;
    let opponentEgoCheck = 0;

    //crit.
    player.ego -= Math.max(0, opponent.atk - player.def);

    //Log opponent name and starting egos for sim
    //console.log('Simulation log for: ' + opponent.name);
    //console.log('Starting Egos adjusted for the case proc scenario (0 for you and 1 for the opponent):');
    //console.log('Player Ego: ' + player.ego);
    //console.log('Opponent Ego: ' + opponent.ego);

    function play_turn(cur) {
        let o = cur === player ? opponent : player;

        o.ego -= Math.max(0, cur.atk - o.def);
        //console.log('Round ' + (turns + 1) + ': ' + cur.text + ' hit! -' + Math.max(0, (cur.atk - o.def)));

        //Log results
        //console.log('after Round ' + (turns + 1) + ': ' + o.text + ' ego: ' + o.ego);
    }

    //Simulate challenge
    for (var turns = 0; turns < 25; turns++) {

        if( player.ego <= 0) {
            //Check if defeat stands with 1 critical hit for the player
            opponentEgoCheck = opponent.ego;
            opponentEgoCheck -= player.atk - opponent.def;

            if (opponentEgoCheck <= 0)
                //console.log('Victory! With 1 critical hit for player, Opponent ego: ' + opponentEgoCheck);

                player.ego = 0;
            break;
        }
        play_turn(player);

        if (opponent.ego <= 0) {
            //Check if victory stands with 2 critical hits for the opponent
            playerEgoCheck = player.ego;
            playerEgoCheck -= opponent.atk - player.def;

            if (playerEgoCheck <= 0)
                //console.log('Defeat! With 1 more critical hit for opponent, Player ego: ' + playerEgoCheck);

                opponent.ego = 0;
            break;
        }

        play_turn(opponent);
    }

    let matchRating = player.ego - opponent.ego;
    let matchRatingStr = (matchRating >= 0 ? '+' : '') + nThousand(Math.floor(matchRating));
    let matchRatingClass;
    if (matchRating < 0 && opponentEgoCheck <= 0)
        matchRatingClass = 'close';
    else if (matchRating < 0 && opponentEgoCheck > 0)
        matchRatingClass = 'minus';
    else if (matchRating > 0 && playerEgoCheck <= 0)
        matchRatingClass = 'close';
    else if (matchRating > 0 && playerEgoCheck > 0)
        matchRatingClass = 'plus';

    let points = matchRating >= 0 ? Math.min(25, 15+player.ego/player.originEgo*10) : Math.max(3, 3+(opponent.originEgo-opponent.ego)/opponent.originEgo*10);
    let pointsInt = Math.floor( points * 10 )/10;
    if( Math.floor( points ) == points )
        pointsInt -= 1/10;
    pointsInt += 1;
    pointsInt = Math.floor(pointsInt);

    let pointsStr = '+' + pointsInt;

    return {
        score: Math.floor(matchRating),
        scoreStr: matchRatingStr,
        scoreClass: matchRatingClass,
        playerEgoCheck: playerEgoCheck,
        points: pointsInt,
        pointsStr: pointsStr
    };
}


/*
commented      const logging = loadSetting("logSimFight");
commented all  if (logging)
replaced       STOCHASTIC_SIM_RUNS
            by getHHScriptVars("STOCHASTIC_SIM_RUNS")
            */
function calculateBattleProbabilities (player, opponent) {
    //const logging = loadSetting("logSimFight");
    const ret = {
        points: {},
        win: 0,
        loss: 0,
        avgTurns: 0,
        scoreClass: ''
    }

    player.critMultiplier = 2 + player.bonuses.critDamage
    opponent.critMultiplier = 2 + opponent.bonuses.critDamage

    let runs = 0
    let wins = 0
    let losses = 0
    const pointsCollector = {}
    let totalTurns = 0

    while (runs < getHHScriptVars("STOCHASTIC_SIM_RUNS")) {
        const {points, turns} = simulateBattle({...player}, {...opponent})

        pointsCollector[points] = (pointsCollector[points] || 0) + 1
        if (points >= 15) {
            wins++
        } else {
            losses++
        }

        totalTurns += turns
        runs++
    }

    ret.points = Object.entries(pointsCollector).map(([points, occurrences]) => ({[points]: occurrences/runs})).reduce((a,b)=>Object.assign(a,b), {})

    ret.win = wins/runs
    ret.loss = losses/runs
    ret.avgTurns = totalTurns/runs
    ret.scoreClass = ret.win>0.9?"plus":ret.win<0.5?"minus":"close"

    //if (logging) {console.log(`Ran ${runs} simulations against ${opponent.name}, won ${ret.win * 100}% of simulated fights, average turns: ${ret.avgTurns}`)}

    return ret
}

/*
*/
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
    const girlCount = isJSON(getStoredValue("HHAuto_Temp_HaremSize"))?JSON.parse(getStoredValue("HHAuto_Temp_HaremSize")).count:800;
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