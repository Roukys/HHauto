// ==UserScript==
// @name         HaremHeroes Automatic++
// @namespace    https://github.com/Roukys/HHauto
// @version      5.6.25
// @description  Open the menu in HaremHeroes(topright) to toggle AutoControlls. Supports AutoSalary, AutoContest, AutoMission, AutoQuest, AutoTrollBattle, AutoArenaBattle and AutoPachinko(Free), AutoLeagues, AutoChampions and AutoStatUpgrades. Messages are printed in local console.
// @author       JD and Dorten(a bit), Roukys, cossname, YotoTheOne, CLSchwab, deuxge
// @match        http*://*.haremheroes.com/*
// @match        http*://*.hentaiheroes.com/*
// @match        http*://*.gayharem.com/*
// @match        http*://*.comixharem.com/*
// @match        http*://*.hornyheroes.com/*
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @grant        GM.openInTab
// @license      MIT
// @updateURL    https://github.com/Roukys/HHauto/raw/main/HHAuto.user.js
// @downloadURL  https://github.com/Roukys/HHauto/raw/main/HHAuto.user.js
// ==/UserScript==

//CSS Region
GM_addStyle('/* The switch - the box around the slider */ #sMenu .switch { position: relative; display: inline-block; width: 34px; height: 20px } /* Hide default HTML checkbox */ #sMenu .switch input { display:none } /* The slider */#sMenu .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; -webkit-transition: .4s; transition: .4s; } #sMenu .slider.round:before { position: absolute; content: ""; height: 14px; width: 14px; left: 3px; bottom: 3px; background-color: white; -webkit-transition: .4s; transition: .4s; } #sMenu input:checked + .slider { background-color: #2196F3; } #sMenu input:focus + .slider { box-shadow: 0 0 1px #2196F3; } #sMenu input:checked + .slider:before { -webkit-transform: translateX(10px); -ms-transform: translateX(10px); transform: translateX(10px); } /* Rounded sliders */ #sMenu .slider.round { border-radius: 14px; }  #sMenu .slider.round:before { border-radius: 50%; }');
GM_addStyle('#sMenu input:checked + .slider.kobans { background-color: red; } #sMenu input:not(:checked) + .slider.round.kobans:before { background-color: red } #sMenu input:checked + .slider.round.kobans:before { background-color: white }')
GM_addStyle('#pInfo {padding-left:3px; z-index:1;white-space: pre;position: absolute;right: 5%; left:77%; height:auto; top:11%; overflow: hidden; border: 1px solid #ffa23e; background-color: rgba(0,0,0,.5); border-radius: 5px; font-size:9pt;}');
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
GM_addStyle('.myButton {box-shadow: 0px 0px 0px 2px #9fb4f2; background:linear-gradient(to bottom, #7892c2 5%, #476e9e 100%); background-color:#7892c2; border-radius:10px; border:1px solid #4e6096; display:inline-block; cursor:pointer; color:#ffffff; font-family:Arial; font-size:8px; padding:3px 7px; text-decoration:none; text-shadow:0px 1px 0px #283966;}.myButton:hover { background:linear-gradient(to bottom, #476e9e 5%, #7892c2 100%); background-color:#476e9e; } .myButton:active { position:relative; top:1px;}');
GM_addStyle('.HHEventPriority {position: absolute;z-index: 500;background-color: black}');
GM_addStyle('.HHPopIDs {background-color: black;z-index: 500;position: absolute;margin-top: 25px}');
GM_addStyle('.tooltipHH:hover { cursor: help; position: relative; } .tooltipHH span.tooltipHHtext { display: none }');
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

function add1000SeparatorEvent()
{
    for (let i of Object.keys(HHStoredVars))
    {
        if (HHStoredVars[i].HHType !== undefined && HHStoredVars[i].valueType === "Long Integer")
        {
            let menuID = HHStoredVars[i].customMenuID !== undefined?HHStoredVars[i].customMenuID:i.replace("HHAuto_"+HHStoredVars[i].HHType+"_","");
            document.getElementById(menuID).addEventListener("keyup",add1000sSeparator1);
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

function Storage()
{
    return localStorage.HHAuto_Setting_settPerTab==="true"?sessionStorage:localStorage;
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
        var jan = new Date(0, 1);
        var jul = new Date(6, 1);
        return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    }

    var today = new Date();

    function isDstObserved(today)
    {
        return today.getTimezoneOffset() < stdTimezoneOffset();
    }

    if (isDstObserved(today))
    {
        return -60;
    }
    else
    {
        return 0;
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


function logHHAuto(...args)
{
    let currDate = new Date();
    var prefix = currDate.toLocaleString()+"."+currDate.getMilliseconds()+":"+getCallerCallerFunction();
    var text;
    var currentLoggingText;
    var nbLines;
    var maxLines = 500;
    if (args.length === 1)
    {
        if (typeof args[0] === 'string' || args[0] instanceof String)
        {
            text = args[0];
        }
        else
        {
            text = JSON.stringify(args[0], null, 2);
        }
    }
    else
    {
        text = JSON.stringify(args, null, 2);
    }
    currentLoggingText = sessionStorage.HHAuto_Temp_Logging?sessionStorage.HHAuto_Temp_Logging:"reset";
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

    sessionStorage.HHAuto_Temp_Logging=JSON.stringify(currentLoggingText);

}

function getHero()
{
    if(unsafeWindow.Hero === undefined)
    {
        setTimeout(autoLoop, Number(Storage().HHAuto_Temp_autoLoopTimeMili))
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

function getPage()
{
    var ob = document.getElementById(getHHScriptVars("gameID"));
    if(ob===undefined || ob === null)
    {
        logHHAuto("Unable to find page attribute, stopping script");
        Storage().HHAuto_Setting_master = "false";
        sessionStorage.HHAuto_Temp_autoLoop = "false";
        logHHAuto("setting autoloop to false");
        throw new Error("Unable to find page attribute, stopping script.");
        return "";
    }
    //var p=ob.className.match(/.*page-(.*) .*/i)[1];
    var p=ob.getAttribute('page');
    if (p=="missions" && $('h4.contests.selected').size()>0)
    {
        return "contests"
    }
    if (p=="missions" && $('h4.pop.selected').size()>0)
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
        return "powerplace"+t
    }
    else
    {
        return p;
    }

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

    if (typeof delay != 'number')
    {
        delay = -1;
    }
    if (delay === -1 )
    {
        delay = randomInterval(300,500);
    }

    var togoto = undefined;

    // get page path
    switch(page)
    {
        case "home":
            togoto = getHHScriptVars("gotoPageHome");
            break;
        case "activities":
            togoto = getHHScriptVars("gotoPageActivities");
            break;
        case "harem":
            togoto = getHHScriptVars("gotoPageHarem");
            break;
        case "map":
            togoto = getHHScriptVars("gotoPageMap");
            break;
        case "pachinko":
            togoto = getHHScriptVars("gotoPagePachinko");
            break;
        case "leaderboard":
            togoto = getHHScriptVars("gotoPageLeaderboard");
            break;
        case "shop":
            togoto = getHHScriptVars("gotoPageShop");
            break;
        case "quest":
            togoto = getHHVars('Hero.infos.questing.current_url');
            if (togoto.includes("world"))
            {
                logHHAuto("All quests finished, turning off AutoQuest!");
                Storage().HHAuto_Setting_autoQuest = false;
                location.reload();
                return false;
            }
            logHHAuto("Current quest page: "+togoto);
            break;
        case "pantheon":
            togoto = getHHScriptVars("gotoPagePantheon");
            break;
        case "pantheon-pre-battle":
            togoto = getHHScriptVars("gotoPagePantheonPreBattle");
            break;
        case "champions_map":
            togoto = getHHScriptVars("gotoPageChampionsMap");
            break;
        case "season" :
            togoto = getHHScriptVars("gotoPageSeason");
            break;
        case "season_arena" :
            togoto = getHHScriptVars("gotoPageSeasonArena");
            break;
        case "club_champion" :
            togoto = getHHScriptVars("gotoPageClubChampion");
            break;
        case "league-battle" :
            togoto = getHHScriptVars("gotoPageLeagueBattle");
            break;
        case "troll-pre-battle" :
            togoto = getHHScriptVars("gotoPageTrollPreBattle");
            break;
        case "event" :
            togoto = getHHScriptVars("gotoPageEvent");
            break;
        case "clubs" :
            togoto = getHHScriptVars("gotoPageClub");
            break;
        case (page.match(/^\/champions\/[123456]$/) || {}).input:
            togoto = page;
            break;
        case (page.match(/^\/harem\/\d+$/) || {}).input:
            togoto = page;
            break;
        default:
            logHHAuto("Unknown goto page request. No page \'"+page+"\' defined.");
    }
    if(togoto != undefined)
    {
        if (typeof inArgs === 'object' && Object.keys(inArgs).length > 0)
        {
            for (let arg of Object.keys(inArgs))
            {
                togoto = url_add_param(togoto, arg,inArgs[arg]);
            }
        }

        sessionStorage.HHAuto_Temp_autoLoop = "false";
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

var proceedQuest = function () {
    //logHHAuto("Starting auto quest.");
    // Check if at correct page.
    if (getPage() !== "quest") {
        // Click on current quest to naviagte to it.
        logHHAuto("Navigating to current quest.");
        gotoPage("quest");
        return;
    }
    $("#popup_message close").click();
    // Get the proceed button type
    var proceedButtonMatch = $("#controls button:not([style*='display:none']):not([style*='display: none'])");
    if (proceedButtonMatch.length === 0)
    {
        proceedButtonMatch = $("#controls button#free");
    }
    var proceedCostEnergy = Number($("#controls .cost span[cur='*']").text());
    var units = [" ", "K", "M", "G", "T", "P", "E", "Z", "Y"]
    var proceedCostMoney = $("#controls .cost span[cur='$']").text();
    var Unit=proceedCostMoney.substr(-1);
    if (units.includes(Unit))
    {
        proceedCostMoney=Number(proceedCostMoney.split(Unit)[0].replace(/[^0-9]/gi, ''))*(1000**units.indexOf(Unit))
    }
    else
    {
        proceedCostMoney=Number(proceedCostMoney.replace(/[^0-9]/gi, ''));
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
        //sessionStorage.HHAuto_Temp_autoLoop = "false";
        //logHHAuto("setting autoloop to false");
        //proceedButtonMatch.click();
    }
    else if (proceedType === "pay") {
        var energyCurrent = getHHVars('Hero.energies.quest.amount');
        var moneyCurrent = getHHVars('Hero.infos.soft_currency');
        let payType = $("#controls .cost span[cur]:not([style*='display:none']):not([style*='display: none'])").attr('cur');
        //console.log("DebugQuest payType : "+payType);
        if (payType === "*")
        {
            //console.log("DebugQuest payType : "+payType+" for : "+proceedCostEnergy);
            if(proceedCostEnergy <= energyCurrent)
            {
                // We have energy.
                logHHAuto("Spending "+proceedCostEnergy+" Energy to proceed.");
            }
            else
            {
                logHHAuto("Quest requires "+proceedCostEnergy+" Energy to proceed.");
                sessionStorage.HHAuto_Temp_questRequirement = "*"+proceedCostEnergy;
                return;
            }
        }
        else if (payType === "$")
        {
            //console.log("DebugQuest payType : "+payType+" for : "+proceedCostMoney);
            if(proceedCostMoney <= moneyCurrent)
            {
                // We have money.
                logHHAuto("Spending "+proceedCostMoney+" Money to proceed.");
            }
            else
            {
                logHHAuto("Spending "+proceedCostMoney+" Money to proceed.");
                sessionStorage.HHAuto_Temp_questRequirement = "$"+proceedCostMoney;
                return;
            }
        }
        //proceedButtonMatch.click();
        //sessionStorage.HHAuto_Temp_autoLoop = "false";
        //logHHAuto("setting autoloop to false");
    }
    else if (proceedType === "use_item") {
        logHHAuto("Proceeding by using X" + Number($("#controls .item span").text()) + " of the required item.");
        //proceedButtonMatch.click();
        //sessionStorage.HHAuto_Temp_autoLoop = "false";
        //logHHAuto("setting autoloop to false");
    }
    else if (proceedType === "battle") {
        logHHAuto("Proceeding to battle troll...");
        sessionStorage.HHAuto_Temp_questRequirement = "battle";
        // Proceed to battle troll.
        //proceedButtonMatch.click();
        //sessionStorage.HHAuto_Temp_autoLoop = "false";
        //logHHAuto("setting autoloop to false");
    }
    else if (proceedType === "end_archive") {
        logHHAuto("Reached end of current archive. Proceeding to next archive.");
        //sessionStorage.HHAuto_Temp_autoLoop = "false";
        //logHHAuto("setting autoloop to false");
        //proceedButtonMatch.click();
    }
    else if (proceedType === "end_play") {
        logHHAuto("Reached end of current play. Proceeding to next play.");
        //sessionStorage.HHAuto_Temp_autoLoop = "false";
        //logHHAuto("setting autoloop to false");
        //proceedButtonMatch.click();
    }
    else {
        logHHAuto("Could not identify given resume button.");
        sessionStorage.HHAuto_Temp_questRequirement = "unknownQuestButton";
        return;
    }
    sessionStorage.HHAuto_Temp_autoLoop = "false";
    logHHAuto("setting autoloop to false");
    setTimeout(function ()
               {
        proceedButtonMatch.click();
        sessionStorage.HHAuto_Temp_autoLoop = "true";
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
        if (JSON.stringify(missionsList[m].rewards).includes("koban") && Storage().HHAuto_Setting_autoMissionKFirst === "true")
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
    if(getPage() !== "missions")
    {
        logHHAuto("Navigating to missions page.");
        gotoPage("activities",{tab:"missions"});
        // return busy
        return true;
    }
    else
    {
        logHHAuto("On missions page.");
        let canCollect = Storage().HHAuto_Setting_autoMissionCollect==="true" && $(".mission_button button:visible[rel='claim']").length >0 && getSecondsLeftBeforeNewCompetition() > 35*60 && getSecondsLeftBeforeNewCompetition() < (24*3600-5*60);
        if (canCollect)
        {
            logHHAuto("Collecting finished mission's reward.");
            $(".mission_button button:visible[rel='claim']").click();
            gotoPage("activities",{tab:"missions"},1500);
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
                    logHHAuto("Unfinished mission detected...("+data.remaining_time+"sec. remaining)");
                    setTimer('nextMissionTime',Number(data.remaining_time)+1);
                    allGood = false;
                    return;
                }
                else{
                    logHHAuto("Unclaimed mission detected...");
                    if (canCollect)
                    {
                        allGood = false;
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
        if(!allGood){
            logHHAuto("Something went wrong, need to retry later...");
            // busy
            return true;
        }
        logHHAuto("Missions parsed, mission list is:-");
        logHHAuto(missions);
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
            gotoPage("activities",{tab:"missions"},1500);
            setTimer('nextMissionTime',Number(mission.duration)+1);
        }
        else
        {
            logHHAuto("No missions detected...!");
            // get gift
            var ck = sessionStorage['giftleft'];
            var isAfterGift = document.querySelector("#missions .after_gift").style.display === 'block';
            if(!isAfterGift){
                if(ck === 'giftleft')
                {
                    logHHAuto("Collecting gift.");
                    delete sessionStorage['giftleft'];
                    document.querySelector(".end_gift button").click();
                }
                else{
                    logHHAuto("Refreshing to collect gift...");
                    sessionStorage['giftleft']='giftleft';
                    location.reload();
                    // is busy
                    return true;
                }
            }
            var time = 0;
            for(var e in unsafeWindow.HHTimers.timers){
                try{if(unsafeWindow.HHTimers.timers[e].$elm.selector.includes("#missions_counter"))
                    time=unsafeWindow.HHTimers.timers[e];
                   }
                catch(e)
                {
                    logHHAuto("Catched error : Could not parse mission timer : "+e);
                }
            }
            if (time !== undefined)
            {
                time = time.remainingTime;
            }
            if(time === undefined)
            {
                //try again with different selector
                for(e in unsafeWindow.HHTimers.timers){
                    try{if(unsafeWindow.HHTimers.timers[e].$elm.selector.includes(".after_gift"))
                        time=unsafeWindow.HHTimers.timers[e];
                       }
                    catch(e)
                    {
                        logHHAuto("Catched error : Could not parse after gift timer : "+e);
                    }
                }
                if (time !== undefined)
                {
                    time = time.remainingTime;
                }
            }
            if(time === undefined){
                logHHAuto("New mission time was undefined... Setting it manually to 10min.");
                time = 10*60;
            }
            setTimer('nextMissionTime',Number(time)+1);
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

function dailyRewardAvailable()
{
    let dailyRewardNotifRequest = getHHScriptVars("dailyRewardNotifRequest",false);
    if (dailyRewardNotifRequest !==null && getPage() == "home" && $(dailyRewardNotifRequest).length > 0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function collectDailyRewards()
{
    if (getPage() == "home")
    {
        logHHAuto('Trying to get daily rewards!');
        let dailyRewardNotifRequest = getHHScriptVars("dailyRewardNotifRequest",false);
        let dailyRewardButtonRequest = '#no_HC .blue_button_L.daily-claim-btn:not([disabled])';
        //Daily rewards notification check
        if (dailyRewardNotifRequest !==null && dailyRewardAvailable())
        {
            if ($('#no_HC')[0].style.display != "block")
            {
                //replaceCheatClick();
                $(dailyRewardNotifRequest)[0].click();
            }
        }
        //console.log($(dailyRewardButtonRequest).length);
        if ($(dailyRewardButtonRequest).length > 0)
        {
            //replaceCheatClick();
            $(dailyRewardButtonRequest)[0].click();
            logHHAuto('Collected daily rewards!')
        }
    }
}


function modulePathOfAttractionHide()
{
    if (getPage() === "event" && window.location.search.includes("tab=path_event") && Storage().HHAuto_Setting_PoAMaskRewards === "true")
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
        +     '<div style="padding:10px"class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("PachinkoPlayX","tooltip")+'</span><label class="myButton" id="PachinkoPlayX">'+getTextForUI("PachinkoPlayX","elementText")+'</label></div>'
        +     '<div style="padding:10px;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("PachinkoXTimes","tooltip")+'</span><input id="PachinkoXTimes" style="width:50px;height:20px" required pattern="'+HHAuto_inputPattern.menuExpLevel+'" type="text" value="1"></div>'
        +     '<div style="display:flex;flex-direction:column;align-items: center;">'
        +      '<div>'+getTextForUI("PachinkoByPassNoGirls","elementText")+'</div>'
        +      '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("PachinkoByPassNoGirls","tooltip")+'</span><input id="PachinkoByPassNoGirls" type="checkbox"></div>'
        +     '</div>'
        +    '</div>'
        +   '<p style="color: red;" id="PachinkoError"></p>'
        +  '</div>'
        fillHHPopUp("PachinkoMenu",getTextForUI("PachinkoButton","elementText"), PachinkoMenu);



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
            if(!isHHPopUpDisplayed())
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

function moduleSimSeasonReward()
{
    var arrayz;
    var nbReward;
    let modified=false;
    arrayz = $('.rewards_pair:not([style*="display:none"]):not([style*="display: none"])');
    if ($("div#gsp_btn_holder[style='display: block;']").length)
    {
        nbReward=1;
    }
    else
    {
        nbReward=2;
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
            }

        }

        function assignToTeam(i=1,best=false)
        {
            let position=i-1;
            let selectedPosition = $('#contains_all section .team-panel .hero-team .team-hexagon .team-member-container.selectable[data-team-member-position="'+position+'"]');
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

function getGirlMapSorted()
{
    let girlsMap = getHHVars('GirlSalaryManager.girlsMap');
    if (girlsMap !== null)
    {

        girlsMap = Object.values(girlsMap);
        if (girlsMap.length > 0)
        {
            const storedSort = localStorage.sort_by;
            if (storedSort == "name")
                girlsMap.sort(sortByName);
            else if (storedSort == "grade")
                girlsMap.sort(sortByGrade);
            else
                girlsMap.sort(sortGirlMapDateAcquired);
        }
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
        GM_registerMenuCommand(getTextForUI(menuID,"elementText"), selectNextUpgradableGirl);
    }
    else
    {
        return;
    }

    function selectNextUpgradableGirl()
    {
        const girlsMap = getGirlMapSorted();
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
        GM_registerMenuCommand(getTextForUI(menuID,"elementText"), prepareUpgradable);
    }
    else
    {
        return;
    }
    function prepareUpgradable()
    {
        let girlsMap = getGirlMapSorted();
        if (girlsMap === null )
            return;
        openedGirlz = 0;
        maxOpenedGirlz = Number(window.prompt("How many ?","10"));
        upgradableGirlz = girlsMap.filter(filterGirlMapCanUpgrade);
        if (upgradableGirlz.length > 0)
        {
            haremOpenGirlUpgrade();
        }
    }
    function haremOpenGirlUpgrade(first = true)
    {
        if (nextUpgradable<upgradableGirlz.length && openedGirlz < maxOpenedGirlz)
        {
            let upgradeURL = upgradableGirlz[nextUpgradable].gData.quests.for_upgrade.url;
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
    if(getPage() !== "powerplacemain")
    {
        logHHAuto("Navigating to powerplaces main page.");
        gotoPage("activities",{tab:"pop"});
        // return busy
        return true;
    }
    else
    {
        logHHAuto("On powerplaces main page.");
        sessionStorage.HHAuto_Temp_Totalpops=$("div.pop_list div[pop_id]").length; //Count how many different POPs there are and store them locally
        logHHAuto("totalpops : "+sessionStorage.HHAuto_Temp_Totalpops);
        var newFilter="";
        $("div.pop_list div[pop_id]").each(function(){newFilter=newFilter+';'+$(this).attr('pop_id');});
        //for (var id=1;id<Number(sessionStorage.HHAuto_Temp_Totalpops)+1;id++)
        //{
        //    newFilter=newFilter+';'+id;
        //}
        //logHHAuto("newfilter : "+newFilter.substring(1));
        if (Storage().HHAuto_Setting_autoPowerPlacesAll === "true")
        {
            Storage().HHAuto_Setting_autoPowerPlacesIndexFilter = newFilter.substring(1);
        }
        //collect all
        let rewardQuery="div#rewards_popup button.blue_button_L";
        let buttonClaimQuery = "button[rel='pop_thumb_claim'].purple_button_L:not([style])";
        if ($(buttonClaimQuery).length >0)
        {
            $(buttonClaimQuery)[0].click();
            logHHAuto("Claimed reward for PoP : "+$(buttonClaimQuery)[0].parentElement.getAttribute('pop_id'));
            gotoPage("activities",{tab:"pop"});
            return true;
        }
        /*         $("button[rel='pop_thumb_claim'].purple_button_L:not([style])").each(function()
                                                                             {
            this.click();
            location.reload();
            if ($(rewardQuery).length >0 )
            {
                $(rewardQuery).click();
            }
            return;
        }); */



        var filteredPops = Storage().HHAuto_Setting_autoPowerPlacesIndexFilter;
        var popUnableToStart = sessionStorage.HHAuto_Temp_PopUnableToStart?sessionStorage.HHAuto_Temp_PopUnableToStart.split(";"):[];
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
        for(e in unsafeWindow.HHTimers.timers){
            try{
                if(unsafeWindow.HHTimers.timers[e].$elm.selector.includes(".pop_thumb"))
                {
                    //logHHAuto("found timer "+HHTimers.timers[e].$elm.context.outerHTML);
                    currIndex = $(HHTimers.timers[e].$elm.context.outerHTML).attr('pop_id');
                    //if index is in filter
                    if (filteredPops.includes(currIndex) && ! popUnableToStart.includes(currIndex))
                    {
                        currTime=unsafeWindow.HHTimers.timers[e].remainingTime;
                        if (minTime === -1 || currTime === -1 || minTime>currTime)
                        {
                            minTime = currTime;

                        }
                        if (maxTime === -1 || maxTime<currTime)
                        {
                            maxTime = currTime;
                        }
                    }
                }
            }
            catch(e)
            {
                logHHAuto("Catched error : Could not parse powerplace timer : "+e);
            }
        }

        if (minTime != -1)
        {
            if ( minTime > 7*60*60 )
            {
                //force check of PowerPlaces every 7 hours
                setTimer('minPowerPlacesTime',Number(20*60)+1);
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
        sessionStorage.HHAuto_Temp_PopToStart = JSON.stringify(PopToStart);
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
    popToSart= sessionStorage.HHAuto_Temp_PopToStart?JSON.parse(sessionStorage.HHAuto_Temp_PopToStart):[];
    newPopToStart=[];
    for (epop of popToSart)
    {
        if (epop != index)
        {
            newPopToStart.push(epop);
        }
    }
    sessionStorage.HHAuto_Temp_PopToStart = JSON.stringify(newPopToStart);
}

function addPopToUnableToStart(popIndex,message)
{
    var popUnableToStart=sessionStorage.HHAuto_Temp_PopUnableToStart?sessionStorage.HHAuto_Temp_PopUnableToStart:"";
    logHHAuto(message);
    if (popUnableToStart === "")
    {
        sessionStorage.HHAuto_Temp_PopUnableToStart = String(popIndex);
    }
    else
    {
        sessionStorage.HHAuto_Temp_PopUnableToStart = popUnableToStart+";"+String(popIndex);
    }
}

// returns boolean to set busy
function doPowerPlacesStuff(index)
{
    if(getPage() !== "powerplace"+index)
    {
        logHHAuto("Navigating to powerplace"+index+" page.");
        gotoPage("activities",{tab:"pop",index:index});
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
            if (Storage().HHAuto_Setting_autoPowerPlacesAll !== "true")
            {
                cleanTempPopToStart();
                gotoPage("activities",{tab:"pop"});
                return;
            }
        }

        if ($("div.pop_right_part div.no_girls_message").length >0)
        {
            addPopToUnableToStart(index,"Unable to start Pop "+index+" no girls available.");
            removePopFromPopToStart(index);
            return false;
        }

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


        // need to get next powerplaces timer data
        var time = 0;
        for(var e in unsafeWindow.HHTimers.timers){
            try
            {
                if(unsafeWindow.HHTimers.timers[e].$elm.selector.startsWith(".pop_central_part"))
                    time=unsafeWindow.HHTimers.timers[e];
            }
            catch(e)
            {
                logHHAuto("Catched error : Could not parse powerplaces timers : "+e);
            }
        }
        time = time.remainingTime;
        try{
            if(time === undefined)
            {
                //try again with different selector
                time = undefined;
                for(e in unsafeWindow.HHTimers.timers){
                    if(unsafeWindow.HHTimers.timers[e].$elm && unsafeWindow.HHTimers.timers[e].$elm.selector.startsWith(".pop_remaining"))
                        // get closest time
                        if(!(unsafeWindow.HHTimers.timers[e].remainingTime>time))
                            time=unsafeWindow.HHTimers.timers[e].remainingTime;
                }
            }
        }
        catch(e)
        {
            logHHAuto("Catched error : Could not parse pop remaining timer : "+e);
        }
        if(time === undefined){
            logHHAuto("New powerplace time was undefined... Setting it manually to 30secs.");
            time = 30;
        }
        else
        {
            removePopFromPopToStart(index);
        }
        // Not busy
        return false;
    }
}

// returns boolean to set busy
function doContestStuff()
{
    if(getPage() !== "contests")
    {
        logHHAuto("Navigating to contests page.");
        gotoPage("activities",{tab:"contests"});
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
                gotoPage("activities",{tab:"contests"});
            }
        }
        /*
        //getting legendary contest first not cumulating them
        let contest_list = $(".contest.is_legendary .ended button[rel='claim']");
        if ( contest_list.length > 0)
        {
            logHHAuto("Collected legendary contest id : "+contest_list[0].getAttribute('id_contest')+".");
            contest_list[0].click();
            gotoPage("activities",{tab:"contests"});
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
            gotoPage("activities",{tab:"contests"});
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

function sortGirlMapDateAcquired(a, b) {
    if (getHHVars("all_possible_girls") === null)
        return -1;
    if (a.gData.own && b.gData.own) {
        var dateA = new Date(getHHVars("all_possible_girls")[a.gId].date_added).getTime();
        var dateB = new Date(getHHVars("all_possible_girls")[b.gId].date_added).getTime();
        return dateA - dateB
    } else if (a.gData.own && !b.gData.own)
        return -1;
    else if (!a.gData.own && b.gData.own)
        return 1;
    else
        return b.shards - a.shards
}

function sortByName(a, b) {
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
}
function sortByGrade(a, b) {
    if (a.gData.own && b.gData.own)
        return b.gData.graded - a.gData.graded;
    else if (a.gData.own && !b.gData.own)
        return -1;
    else if (!a.gData.own && b.gData.own)
        return 1
}

var CollectMoney = function()
{
    var Clicked=[];
    //var ToClick=[];
    var endCollectTS = -1;
    let startCollectTS = -1;
    var maxSecsForSalary = Number(Storage().HHAuto_Setting_autoSalaryMaxTimer);
    var collectedGirlzNb = 0;
    var collectedMoney = 0;
    let totalGirlsToCollect = 0;
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
                Clicked.shift();
                if (new Date().getTime() < endCollectTS)
                {
                    setTimeout(ClickThem,randomInterval(300,500));
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
        /*var btns=$("#harem_whole #harem_left .salary:not('.loads') button");
        //logHHAuto('buttons: '+btns.size())
        btns.each(function (index, element) {
            //logHHAuto({indexNb:index,formActionElement:element.formAction});
            var gid=Number(element.parentElement.parentElement.parentElement.getAttribute('girl'));
            //logHHAuto('checking '+gid);
            if (!Clicked.includes(gid))
            {
                Clicked.push(gid);
                //ToClick.push(element);
                //logHHAuto({log:'added! ',ClickedObj:Clicked,ToClickObj:ToClick});
            }
        });
        */
        const girlsList = getGirlMapSorted();
        if ( girlsList === null)
        {
            gotoPage("home");
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
            gotoPage("home",{},randomInterval(300,500));
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
        girlsDataList = ggetHHVars("girlsDataList");
    }
    let nextCollect = 0;
    const minSalaryForCollect = Number(Storage().HHAuto_Setting_autoSalaryMinSalary);
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
        if(getPage() == "harem" || getPage() == "home")
        {
            const salaryButton = $("#collect_all_container button[id='collect_all']")
            const salaryToCollect = salaryButton.attr("style")==="display: inline-block;"?true:false;
            const getButtonClass = salaryButton.attr("class");
            let salarySumTag = NaN;
            if (getPage() == "harem")
            {
                salarySumTag = Number($('[rel="next_salary"]',salaryButton)[0].innerText.replace(/[^0-9]/gi, ''));
            }
            else if (getPage() == "home")
            {
                salarySumTag = Number($('.sum',salaryButton).attr("amount"));
            }

            const enoughSalaryToCollect = salarySumTag === NaN?true:salarySumTag > Number(Storage().HHAuto_Setting_autoSalaryMinSalary);
            //console.log(salarySumTag, enoughSalaryToCollect);
            if (salaryToCollect && enoughSalaryToCollect )
            {
                if (getButtonClass.indexOf("blue_button_L") !== -1 )
                {
                    //replaceCheatClick();
                    salaryButton.click();
                    logHHAuto('Collected all Premium salary');
                    if (getPage() == "harem" )
                    {
                        setTimer('nextSalaryTime',predictNextSalaryMinTime());
                        return false;
                    }
                    else
                    {
                        gotoPage("home");
                        return true;
                    }

                }
                else if ( getButtonClass.indexOf("orange_button_L") !== -1 )
                {
                    // Not at Harem screen then goto the Harem screen.
                    if (getPage() == "harem" )
                    {
                        logHHAuto("Detected Harem Screen. Fetching Salary");
                        //replaceCheatClick();
                        sessionStorage.HHAuto_Temp_autoLoop = "false";
                        logHHAuto("setting autoloop to false");
                        CollectMoney();
                    }
                    else
                    {
                        logHHAuto("Navigating to Harem window.");
                        gotoPage("harem");
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
                gotoPage("home");
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
    var money=getHHVars('Hero.infos.soft_currency');
    var count=0;
    var M=Number(Storage().HHAuto_Setting_autoStats);
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
        logHHAuto("Go shopping");
        var Hero=getHero();
        var MS='carac'+getHHVars('Hero.infos.class');
        var SS1='carac'+(getHHVars('Hero.infos.class')%3+1);
        var SS2='carac'+((getHHVars('Hero.infos.class')+1)%3+1);
        var money=getHHVars('Hero.infos.soft_currency');
        var kobans=getHHVars('Hero.infos.hard_currency');

        try
        {
            var shop=JSON.parse(sessionStorage.HHAuto_Temp_storeContents);
        }
        catch(wtf)
        {
            logHHAuto("Catched error : Could not parse store content : "+wtf);
            sessionStorage.HHAuto_Temp_charLevel=0;
            return;
        }

        if (!sessionStorage.HHAuto_Temp_haveAff)
        {
            sessionStorage.HHAuto_Temp_charLevel=0;
            return;
        }

        var LGM=Number(Storage().HHAuto_Setting_autoLGM);
        var LGR=Number(Storage().HHAuto_Setting_autoLGR);
        var Exp=Number(Storage().HHAuto_Setting_autoExp);
        var Aff=Number(Storage().HHAuto_Setting_autoAff);
        var MaxAff=Number(Storage().HHAuto_Setting_maxAff);
        var MaxExp=Number(Storage().HHAuto_Setting_maxExp);
        var HaveAff=Number(sessionStorage.HHAuto_Temp_haveAff);
        var HaveExp=Number(sessionStorage.HHAuto_Temp_haveExp);


        if (Storage().HHAuto_Setting_autoLGMW==="true" || Storage().HHAuto_Setting_autoLGRW==="true" )
        {
            //logHHAuto('items');
            var Was=shop[0].length;
            for (var n0=shop[0].length-1;n0>=0;n0--)
            {

                if (
                    (
                        Storage().HHAuto_Setting_autoLGMW==="true"
                        && money>=LGM+Number(shop[0][n0].price)
                        && shop[0][n0][MS]>0
                        && shop[0][n0][SS1]==0
                        && shop[0][n0][SS2]==0
                        && shop[0][n0].chance==0
                        && shop[0][n0].endurance==0
                        && shop[0][n0].rarity=='legendary'
                        && shop[0][n0].currency == "sc" // "sc" for soft currency = money, "hc" for hard currency = kobans
                    )
                    ||
                    (
                        Storage().HHAuto_Setting_autoLGRW==="true"
                        && money>=LGR+Number(shop[0][n0].price)
                        && shop[0][n0][MS]>0
                        && shop[0][n0][SS1]>0
                        && shop[0][n0][SS2]>0
                        && shop[0][n0].rarity=='legendary'
                        && shop[0][n0].currency == "sc" // "sc" for soft currency = money, "hc" for hard currency = kobans
                    )
                )
                {
                    //logHHAuto({log:'wanna buy ',object:shop[0][n0]});
                    if (money>=shop[0][n0].price)
                    {
                        logHHAuto({log:'Buying : ',object:shop[0][n0]});
                        money-=Number(shop[0][n0].price);
                        var params0 = {
                            class: "Item",
                            action: "buy",
                            id_item: shop[0][n0].id_item,
                            type: "armor",
                            who: 1,
                            id_skin: shop[0][n0].id_skin,
                            id_equip: shop[0][n0].id_equip
                        };
                        hh_ajax(params0, function(data) {
                            Hero.updates(data.changes, false);
                        });
                        shop[0].splice(n0,1);
                        sessionStorage.HHAuto_Temp_storeContents=JSON.stringify(shop);
                        setTimeout(doShopping, randomInterval(300,500));
                        return;

                    }
                    /*else
                    {
                        logHHAuto("but can't");
                    }*/
                }
            }
            if (shop[0].length==0 && Was>0)
            {
                sessionStorage.HHAuto_Temp_charLevel=0;
            }
        }

        var boosterFilter = Storage().HHAuto_Setting_autoBuyBoostersFilter.split(";");
        if (Storage().HHAuto_Setting_autoBuyBoosters==="true" && boosterFilter.length > 0)
        {
            Was=shop[1].length;

            for (var boost of boosterFilter)
            {
                for (var n1=shop[1].length-1;n1>=0;n1--)
                {
                    if (kobans>=Number(Storage().HHAuto_Setting_kobanBank)+Number(shop[1][n1].price) && shop[1][n1].currency == "hc" && shop[1][n1].identifier == boost && (shop[1][n1].rarity=='legendary' || shop[1][n1].rarity=='mythic'))
                    {
                        //logHHAuto({log:'wanna buy ',object:shop[1][n1]});
                        if (kobans>=Number(shop[1][n1].price))
                        {
                            logHHAuto({log:'Buying : ',object:shop[1][n1]});
                            kobans-=Number(shop[1][n1].price);
                            var params1 = {
                                class: "Item",
                                action: "buy",
                                id_item: shop[1][n1].id_item,
                                type: "booster",
                                who: 1
                            };
                            hh_ajax(params1, function(data) {
                                Hero.updates(data.changes, false);
                            });
                            shop[1].splice(n1,1);
                            sessionStorage.HHAuto_Temp_storeContents=JSON.stringify(shop);
                            setTimeout(doShopping, randomInterval(300,500));
                            return;
                        }
                        /*else
                        {
                            logHHAuto("but can't");
                        }*/
                    }
                }
            }

            if (shop[1].length==0 && Was>0)
            {
                sessionStorage.HHAuto_Temp_charLevel=0;
            }
        }

        if (Storage().HHAuto_Setting_autoAffW==="true" && HaveAff<MaxAff)
        {
            //logHHAuto('gifts');
            Was=shop[2].length;
            for (var n2=shop[2].length-1;n2>=0;n2--)
            {
                //logHHAuto({log:'wanna buy ',Object:shop[2][n2]});
                if (money>=Aff+Number(shop[2][n2].price) && money>=Number(shop[2][n2].price) && shop[2][n2].currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                {
                    logHHAuto({log:'Buying : ',Object:shop[2][n2]});
                    money-=Number(shop[2][n2].price);
                    var params2 = {
                        class: "Item",
                        action: "buy",
                        id_item: shop[2][n2].id_item,
                        type: "gift",
                        who: 1
                    };
                    hh_ajax(params2, function(data) {
                        Hero.updates(data.changes, false);
                    });
                    shop[2].splice(n2,1);
                    sessionStorage.HHAuto_Temp_storeContents=JSON.stringify(shop);
                    setTimeout(doShopping, randomInterval(300,500));
                    return;
                }
                /*else
                {
                    logHHAuto("but can't");
                }*/
            }
            if (shop[2].length==0 && Was>0)
            {
                sessionStorage.HHAuto_Temp_charLevel=0;
            }
        }
        if (Storage().HHAuto_Setting_autoExpW==="true" && HaveExp<MaxExp)
        {
            //logHHAuto('books');
            Was=shop[3].length;
            for (var n3=shop[3].length-1;n3>=0;n3--)
            {
                //logHHAuto('wanna buy ',shop[3][n3]);
                if (money>=Exp+Number(shop[3][n3].price) && money>=Number(shop[3][n3].price) && shop[3][n3].currency == "sc") // "sc" for soft currency = money, "hc" for hard currency = kobans
                {
                    logHHAuto({log:'Buying : ',Object:shop[3][n3]});
                    money-=Number(shop[3][n3].price);
                    var params3 = {
                        class: "Item",
                        action: "buy",
                        id_item: shop[3][n3].id_item,
                        type: "potion",
                        who: 1
                    };
                    hh_ajax(params3, function(data) {
                        Hero.updates(data.changes, false);
                    });
                    shop[3].splice(n3,1);
                    sessionStorage.HHAuto_Temp_storeContents=JSON.stringify(shop);
                    setTimeout(doShopping, randomInterval(300,500));
                    return;
                }
                /*else
                {
                    logHHAuto("but can't");
                }*/
            }
            if (shop[3].length==0 && Was>0)
            {
                sessionStorage.HHAuto_Temp_charLevel=0;
            }
        }
        sessionStorage.HHAuto_Temp_storeContents=JSON.stringify(shop);
        //unsafeWindow.Hero.infos.soft_currency=money;
        //Hero.update("soft_currency", money, false);
    }
    catch (ex)
    {
        logHHAuto("Catched error : Could not buy : "+ex);
        sessionStorage.HHAuto_Temp_charLevel=0;
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
            return;
        }
    }

    var TTF;
    if (Storage().HHAuto_Setting_plusEvent==="true" && !checkTimer("eventGoing") && sessionStorage.HHAuto_Temp_eventGirl !== undefined && JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).is_mythic==="false")
    {
        TTF=JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).troll_id;
        logHHAuto("Event troll fight");
    }
    else if (Storage().HHAuto_Setting_plusEventMythic==="true" && !checkTimer("eventMythicGoing") && sessionStorage.HHAuto_Temp_eventGirl !== undefined && JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).is_mythic==="true")
    {
        TTF=JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).troll_id;
        logHHAuto("Mythic Event troll fight");
    }
    else if(sessionStorage.HHAuto_Temp_trollToFight !== undefined && !isNaN(sessionStorage.HHAuto_Temp_trollToFight) && sessionStorage.HHAuto_Temp_trollToFight !== "0")
    {
        TTF=sessionStorage.HHAuto_Temp_trollToFight;
        logHHAuto("Custom troll fight.");
    }
    else
    {
        TTF=getHHVars('Hero.infos.questing.id_world')-1;
        logHHAuto("Last troll fight");
    }

    if (sessionStorage.HHAuto_Temp_autoTrollBattleSaveQuest == "true")
    {
        TTF=getHHVars('Hero.infos.questing.id_world')-1;
        logHHAuto("Last troll fight for quest item.");
        sessionStorage.HHAuto_Temp_autoTrollBattleSaveQuest = "false";
        sessionStorage.HHAuto_Temp_questRequirement = "none";
    }

    logHHAuto("Fighting troll N "+TTF);
    logHHAuto("Going to crush: "+Trollz[Number(TTF)]);

    // Battles the latest boss.
    // Navigate to latest boss.
    //console.log(getPage());
    if(getPage()===getHHScriptVars("getPageTrollPreBattle") && window.location.search=="?id_opponent=" + TTF)
    {
        // On the battle screen.
        CrushThemFights();
    }
    else
    {
        logHHAuto("Navigating to chosen Troll.");
        sessionStorage.HHAuto_Temp_autoLoop = "false";
        logHHAuto("setting autoloop to false");
        //week 28 new battle modification
        //location.href = "/battle.html?id_troll=" + TTF;
        gotoPage("troll-pre-battle",{id_opponent:TTF});
        //End week 28 new battle modification


        return true;
    }
};

var doChampionStuff=function()
{
    var page=getPage();
    if (page=='champions')
    {
        logHHAuto('on champion page');
        if ($('button[rel=perform].blue_button_L').length==0)
        {
            logHHAuto('Something is wrong!');
            gotoPage("home");
            return true;
        }
        else
        {
            var TCount=Number($('div.input-field > span')[1].innerText.split(' / ')[1]);
            var ECount= getHHVars('Hero.energies.quest.amount');
            logHHAuto("T:"+TCount+" E:"+ECount+" "+(Storage().HHAuto_Setting_autoChampsUseEne==="true"))
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
                gotoPage('champions_map');
                return true;
            }
        }
    }
    else if (page=='champions_map')
    {
        logHHAuto('on champion map');
        var Filter=Storage().HHAuto_Setting_autoChampsFilter.split(';').map(s=>Number(s));
        var minTime = -1;
        var currTime;
        var e;

        for (let i=0;i<$('span.stage-bar-tier').length;i++)
        {
            let Impression=$('span.stage-bar-tier')[i].getAttribute("hh_title");
            let Started=Impression.split('/')[0]!="0";
            let OnTimerOld=$($('a.champion-lair div.champion-lair-name')[i+1]).find('div[rel=timer]').length>0
            let timerNew=Number($($('a.champion-lair div.champion-lair-name')[i+1]).find('div#championTimer').attr('timer'));
            let OnTimerNew=false;
            if ( ! isNaN(timerNew) && (timerNew > Math.ceil(new Date().getTime()/1000)))
            {
                OnTimerNew = true;
            }

            let OnTimer= OnTimerOld || OnTimerNew;
            let Filtered=Filter.includes(i+1);
            logHHAuto("Champion "+(i+1)+" ["+Impression+"]"+(Started?" Started;":" Not started;")+(OnTimer?" on timer;":" not on timer;")+(Filtered?" Included in filter":" Excluded from filter"));

            if (Started && !OnTimer && Filtered)
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
                if(unsafeWindow.HHTimers.timers[e].$elm[0].offsetParent.className === "champion-lair")
                {
                    currTime=unsafeWindow.HHTimers.timers[e].remainingTime;
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
        gotoPage('home');
        return false;
    }
    else
    {
        gotoPage('champions_map');
        return true;
    }
}

var doClubChampionStuff=function()
{
    var page=getPage();
    if (page=='club_champion')
    {
        logHHAuto('on club_champion page');
        if ($('button[rel=perform].blue_button_L').length==0)
        {
            logHHAuto('Something is wrong!');
            gotoPage("home");
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
                    setTimer('nextClubChampionTime',3);
                }
                gotoPage('clubs');
                return true;
            }
        }
    }
    else if (page=='clubs')
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

        if ((Started || Storage().HHAuto_Setting_autoClubForceStart === "true") && noTimer)
        {
            let ticketUsed = 0;
            let ticketsUsedRequest = "div.club_champions_panel tr.personal_highlight td.challenges_count";
            if ($(ticketsUsedRequest).length >0)
            {
                ticketUsed = Number($(ticketsUsedRequest)[0].innerText.replace(/[^0-9]/gi, ''));
            }
            let maxTickets = Number(Storage().HHAuto_Setting_autoClubChampMax);
            //console.log(maxTickets, ticketUsed);
            if (maxTickets > ticketUsed )
            {
                logHHAuto("Let's do him!");
                gotoPage('club_champion');
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
        gotoPage('home');
        return false;
    }
    else
    {
        gotoPage('clubs');
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
    var customLimits = Storage().HHAuto_Setting_calculatePowerLimits.split(";");
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
        if ( Storage().HHAuto_Setting_calculatePowerLimits !== "default")
        {
            Storage().HHAuto_Setting_calculatePowerLimits = "Invalid limits";
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

var doSeason = function () {
    logHHAuto("Performing auto Season.");
    // Confirm if on correct screen.
    var page = getPage();
    var current_kisses = getHHVars('Hero.energies.kiss.amount');
    if(page === "season")
    {
        logHHAuto("On season page.");
        if (Storage().HHAuto_Setting_autoSeasonCollect === "true")
        {
            $("button[id='claim_btn_s'").click();
        }
        logHHAuto("Remaining kisses : "+ current_kisses);
        if ( current_kisses > 0 )
        {
            logHHAuto("Switching to Season Arena screen.");
            gotoPage("season_arena");
        }
        else
        {
            if (getHHVars('Hero.energies.kiss.next_refresh_ts') === 0)
            {
                setTimer('nextSeasonTime',15*60);
            }
            else
            {
                setTimer('nextSeasonTime',getHHVars('Hero.energies.kiss.next_refresh_ts'));
            }

            gotoPage('home');
        }
        return;
        //<button id="claim_btn_s" class="bordeaux_button_s" style="z-index: 1000; visibility: visible;">Claim</button>
    }
    else if (page === "season_arena")
    {
        logHHAuto("On season arena page.");

        var chosenID=moduleSimSeasonBattle();
        if (chosenID !== -1 && chosenID !== -2 )
        {
            location.href = document.getElementsByClassName("opponent_perform_button_container")[chosenID].children[0].getAttribute('href');
            sessionStorage.HHAuto_Temp_autoLoop = "false";
            logHHAuto("setting autoloop to false");
            logHHAuto("Going to crush : "+$("div.season_arena_opponent_container .hero_details div.hero_name")[chosenID].innerText);
            return true;
        }
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
            sessionStorage.HHAuto_Temp_autoLoop = "false";
            logHHAuto("setting autoloop to false");
            setTimer('nextSeasonTime',5);
            setTimeout(refreshOpponents,randomInterval(800,1600));

            return true;
        }
        if (chosenID === -1 )
        {
            logHHAuto("Season : was not able to choose opponent.");
            setTimer('nextSeasonTime',30*60);
        }
    }
    else
    {
        // Switch to the correct screen
        logHHAuto("Remaining kisses : "+ current_kisses);
        if ( current_kisses > 0 )
        {
            if (Storage().HHAuto_Setting_autoSeasonCollect === "true")
            {
                logHHAuto("Switching to Season screen.");
                gotoPage("season");
            }
            else
            {
                logHHAuto("Switching to Season Arena screen.");
                gotoPage("season_arena");
            }
            return;
        }
        else
        {
            if (getHHVars('Hero.energies.kiss.next_refresh_ts') === 0)
            {
                setTimer('nextSeasonTime',15*60);
            }
            else
            {
                setTimer('nextSeasonTime',getHHVars('Hero.energies.kiss.next_refresh_ts'));
            }
            gotoPage('home');
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
    if(page === "pantheon")
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
                gotoPage("pantheon-pre-battle",{id_opponent:templeID});
            }
            else
            {
                logHHAuto("Issue to find templeID retry in 60secs.");
                setTimer('nextPantheonTime',60);
                gotoPage('home');
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
                setTimer('nextPantheonTime',getHHVars('Hero.energies.worship.next_refresh_ts'));
            }
            gotoPage('home');
        }
        return;
        //<button id="claim_btn_s" class="bordeaux_button_s" style="z-index: 1000; visibility: visible;">Claim</button>
    }
    else if (page === "pantheon-pre-battle")
    {
        logHHAuto("On pantheon-pre-battle page.");
        let templeID = queryStringGetParam(window.location.search,'id_opponent');
        logHHAuto("Go and fight temple :"+templeID);
        let pantheonTempleBattleButton =$("#pre-battle .battle-buttons a.green_button_L.battle-action-button.pantheon-single-battle-button[data-pantheon-id='"+templeID+"']");
        if (pantheonTempleBattleButton.length >0)
        {
            //replaceCheatClick();
            pantheonTempleBattleButton[0].click();
        }
        else
        {
            logHHAuto("Issue to find temple battle button retry in 60secs.");
            setTimer('nextPantheonTime',60);
            gotoPage('home');
        }
    }
    else
    {
        // Switch to the correct screen
        logHHAuto("Remaining worship : "+ current_worship);
        if ( current_worship > 0 )
        {
            logHHAuto("Switching to pantheon screen.");
            gotoPage("pantheon");

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
                setTimer('nextPantheonTime',getHHVars('Hero.energies.worship.next_refresh_ts'));
            }
            gotoPage('home');
        }
        return;
    }
};

var getLeagueCurrentLevel = function ()
{
    if(unsafeWindow.league_tag === undefined)
    {
        setTimeout(autoLoop, Number(Storage().HHAuto_Temp_autoLoopTimeMili))
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
    if(page==='battle')
    {
        // On the battle screen.
        CrushThemFights();
    }
    else if(page === "leaderboard")
    {
        logHHAuto("On leaderboard page.");
        if (Storage().HHAuto_Setting_autoLeaguesCollect === "true")
        {
            if ($('#leagues_middle .forced_info button[rel="claim"]').length >0)
            {
                $('#leagues_middle .forced_info button[rel="claim"]').click(); //click reward
                gotoPage('leaderboard')
            }
        }
        //logHHAuto('ls! '+$('h4.leagues').size());
        $('h4.leagues').each(function(){this.click();});

        if(currentPower < 1)
        {
            logHHAuto("No power for leagues.");
            //prevent paranoia to wait for league
            sessionStorage.HHAuto_Temp_paranoiaLeagueBlocked="true";
            setTimer('nextLeaguesTime',getHHVars('Hero.energies.challenge.next_refresh_ts')+1);
            return;
        }

        while ($("span[sort_by='level'][select='asc']").size()==0)
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
            sessionStorage.HHAuto_Temp_paranoiaLeagueBlocked="true";
            setTimer('nextLeaguesTime',ltime);
        }
        else
        {
            var getPlayerCurrentLevel = getLeagueCurrentLevel();

            if (isNaN(getPlayerCurrentLevel))
            {
                logHHAuto("Could not get current Rank, stopping League.");
                //prevent paranoia to wait for league
                sessionStorage.HHAuto_Temp_paranoiaLeagueBlocked="true";
                setTimer('nextLeaguesTime',Number(30*60)+1);
                return;
            }
            var currentRank = Number($("tr[class=personal_highlight] td span")[0].innerText);
            var currentScore = Number($("tr[class=personal_highlight] td")[4].innerText.replace(/\D/g, ''));

            if (Number(sessionStorage.HHAuto_Temp_leaguesTarget) < Number(getPlayerCurrentLevel))
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
                logHHAuto("Current league above target ("+Number(getPlayerCurrentLevel)+"/"+Number(sessionStorage.HHAuto_Temp_leaguesTarget)+"), needs to demote. max rank : "+rankDemote+"/"+totalOpponents);
                let getRankDemote = $("div.leagues_table table tr td span:contains("+rankDemote+")").filter(function()
                                                                                                            {
                    return Number($.trim($(this).text())) === rankDemote;
                });
                if (getRankDemote.length > 0 )
                {
                    maxDemote = Number(getRankDemote.parent().parent()[0].lastElementChild.innerText.replace(/\D/g, ''));
                }
                else
                {
                    maxDemote = 0;
                }

                logHHAuto("Current league above target ("+Number(getPlayerCurrentLevel)+"/"+Number(sessionStorage.HHAuto_Temp_leaguesTarget)+"), needs to demote. Score should not be higher than : "+maxDemote);
                if ( currentScore + leagueScoreSecurityThreshold >= maxDemote )
                {
                    logHHAuto("Can't do league as could go above demote, setting timer to 30 mins");
                    setTimer('nextLeaguesTime',Number(30*60)+1);
                    //prevent paranoia to wait for league
                    sessionStorage.HHAuto_Temp_paranoiaLeagueBlocked="true";
                    gotoPage("home");
                    return;
                }
            }

            var maxLeague = $("div.tier_icons img").length;
            if ( maxLeague === undefined )
            {
                maxLeague = Leagues.length;
            }

            if (Number(sessionStorage.HHAuto_Temp_leaguesTarget) === Number(getPlayerCurrentLevel) && Number(sessionStorage.HHAuto_Temp_leaguesTarget) < maxLeague)
            {
                var maxStay = 0;
                var rankStay = 16;
                if (currentRank > 15)
                {
                    rankStay = 15;
                }
                logHHAuto("Current league is target ("+Number(getPlayerCurrentLevel)+"/"+Number(sessionStorage.HHAuto_Temp_leaguesTarget)+"), needs to stay. max rank : "+rankStay);
                let getRankStay = $("div.leagues_table table tr td span:contains("+rankStay+")").filter(function()
                                                                                                        {
                    return Number($.trim($(this).text())) === rankStay;
                });
                if (getRankStay.length > 0 )
                {
                    maxStay = Number(getRankStay.parent().parent()[0].lastElementChild.innerText.replace(/\D/g, ''));
                }
                else
                {
                    maxStay = 0;
                }

                logHHAuto("Current league is target ("+Number(getPlayerCurrentLevel)+"/"+Number(sessionStorage.HHAuto_Temp_leaguesTarget)+"), needs to stay. Score should not be higher than : "+maxStay);
                if ( currentScore + leagueScoreSecurityThreshold >= maxStay && Storage().HHAuto_Setting_autoLeaguesAllowWinCurrent !== "true")
                {
                    logHHAuto("Can't do league as could go above stay, setting timer to 30 mins");
                    setTimer('nextLeaguesTime',Number(30*60)+1);
                    //prevent paranoia to wait for league
                    sessionStorage.HHAuto_Temp_paranoiaLeagueBlocked="true";
                    gotoPage("home");
                    return;
                }
            }
            logHHAuto(Data.length+' valid targets!');
            sessionStorage.HHAuto_Temp_autoLoop = "false";
            logHHAuto("setting autoloop to false");
            logHHAuto("Hit?" );
            if (Storage().HHAuto_Setting_autoLeaguesPowerCalc == "true")
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
                    gotoPage("league-battle",{number_of_battles:1,id_opponent:oppoID});
                    //End week 28 new battle modification

                    clearTimer('nextLeaguesTime');
                }
            }
            else
            {
                //week 28 new battle modification
                //location.href = "/battle.html?league_battle=1&id_member=" + Data[0]
                gotoPage("league-battle",{number_of_battles:1,id_opponent:Data[0]});
                //End week 28 new battle modification

            }

        }
    }
    else
    {
        // Switch to the correct screen
        logHHAuto("Switching to leagues screen.");
        gotoPage("leaderboard");
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
    var opponentsPowerList = isJSON(sessionStorage.HHAuto_Temp_LeagueOpponentList)?JSON.parse(sessionStorage.HHAuto_Temp_LeagueOpponentList):{expirationDate:0,opponentsList:{}};
    var opponentsTempPowerList = isJSON(sessionStorage.HHAuto_Temp_LeagueTempOpponentList)?JSON.parse(sessionStorage.HHAuto_Temp_LeagueTempOpponentList):{expirationDate:0,opponentsList:{}};
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
            if(HHTimers.timers[e].$elm && HHTimers.timers[e].$elm.selector.startsWith(".league_end_in"))
            {
                league_end=HHTimers.timers[e].remainingTime;
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
        let listExpirationDate =isJSON(sessionStorage.HHAuto_Temp_LeagueTempOpponentList)?JSON.parse(sessionStorage.HHAuto_Temp_LeagueTempOpponentList).expirationDate:new Date().getTime() + maxLeagueListDurationSecs * 1000;
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
                var opponentData = JSON.parse(data.html.substring(data.html.indexOf(findText)+findText.length,data.html.lastIndexOf(';')));
                const players=getLeaguePlayersData(getHHVars("heroLeaguesData"),opponentData);

                //console.log(player,opponent);
                let simu = calculateBattleProbabilities(players.player, players.opponent);
                //console.log(opponent);
                //console.log(simu);
                //matchRating=customMatchRating(simu);

                //matchRating = Number(matchRating.substring(1));
                //logHHAuto('matchRating:'+matchRating);
                //if (!isNaN(matchRating))
                //{
                DataOppo[Number(opponentData.id_member)]=simu;
                sessionStorage.HHAuto_Temp_LeagueTempOpponentList = JSON.stringify({expirationDate:listExpirationDate,opponentsList:DataOppo});
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
            sessionStorage.HHAuto_Temp_LeagueOpponentList = JSON.stringify({expirationDate:listExpirationDate,opponentsList:DataOppo});
            LeagueClearDisplayGetOpponentPopup();
            //doLeagueBattle();
            logHHAuto("Building list finished, putting autoloop back to true.");
            sessionStorage.HHAuto_Temp_autoLoop = "true";
            setTimeout(autoLoop, Number(Storage().HHAuto_Temp_autoLoopTimeMili));
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
    if (getPage() === getHHScriptVars("getPageTrollPreBattle")) {
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
        let currentPower = Number(getHHVars('Hero.energies.fight.amount'));

        //check if girl still available at troll in case of event
        if (TTF !== null)
        {
            if (sessionStorage.HHAuto_Temp_eventGirl !== undefined && TTF === JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).troll_id)
            {
                if (
                    (
                        JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).is_mythic === "true"
                        && Storage().HHAuto_Setting_plusEventMythic==="true"
                    )
                    ||
                    (
                        JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).is_mythic === "false"
                        && Storage().HHAuto_Setting_plusEvent==="true"
                    )
                )
                {
                    let rewardGirlz=$("#pre-battle #opponent-panel .fighter-rewards .rewards_list .girls_reward[data-rewards]");

                    if (rewardGirlz.length ===0 || !rewardGirlz.attr('data-rewards').includes('"id_girl":"'+JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).girl_id+'"'))
                    {
                        logHHAuto("Seems "+JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).girl_name+" is no more available at troll "+Trollz[Number(TTF)]+". Going to event page.");
                        parseEventPage(JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).event_id);
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
                    && Storage().HHAuto_Setting_useX50Fights === "true"
                    && ( JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).is_mythic === "true" || Storage().HHAuto_Setting_useX50FightsAllowNormalEvent === "true")
                )
                ||
                (
                    canBuyFightsResult.canBuy
                    && currentPower < 10
                    && canBuyFightsResult.max === 20
                    && Storage().HHAuto_Setting_useX10Fights === "true"
                    && ( JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).is_mythic === "true" || Storage().HHAuto_Setting_useX10FightsAllowNormalEvent === "true")
                )
            )
            {
                RechargeCombat();
                gotoPage("troll-pre-battle",{id_opponent:TTF});
                return;
            }

            if (sessionStorage.HHAuto_Temp_eventGirl !== undefined && JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).girl_shards && Number.isInteger(Number(JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).girl_shards)) && battleButtonX10.length > 0 && battleButtonX50.length > 0)
            {
                remainingShards = Number(100 - Number(JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).girl_shards));
                let bypassThreshold = (
                    (JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).is_mythic === "false"
                     && canBuyFightsResult.canBuy
                    ) // eventGirl available and buy comb true
                    || (JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).is_mythic === "true"
                        && Storage().HHAuto_Setting_plusEventMythic==="true"
                       )
                );

                if (Storage().HHAuto_Setting_useX50Fights === "true"
                    && Storage().HHAuto_Setting_minShardsX50
                    && Number.isInteger(Number(Storage().HHAuto_Setting_minShardsX50))
                    && remainingShards >= Number(Storage().HHAuto_Setting_minShardsX50)
                    && (battleButtonX50Price === 0 || getHHVars('Hero.infos.hard_currency')>=battleButtonX50Price+Number(Storage().HHAuto_Setting_kobanBank))
                    && currentPower >= 50
                    && (currentPower >= (Number(Storage().HHAuto_Setting_autoTrollThreshold) + 50)
                        || bypassThreshold
                       )
                    && ( JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).is_mythic === "true" || Storage().HHAuto_Setting_useX50FightsAllowNormalEvent === "true")
                   )
                {
                    logHHAuto("Going to crush 50 times: "+Trollz[Number(TTF)]+' for '+battleButtonX50Price+' kobans.');

                    setHHVars('Hero.infos.hc_confirm',true);
                    // We have the power.
                    //replaceCheatClick();
                    battleButtonX50[0].click();
                    setHHVars('Hero.infos.hc_confirm',hcConfirmValue);
                    //sessionStorage.HHAuto_Temp_EventFightsBeforeRefresh = Number(sessionStorage.HHAuto_Temp_EventFightsBeforeRefresh) - 50;
                    logHHAuto("Crushed 50 times: "+Trollz[Number(TTF)]+' for '+battleButtonX50Price+' kobans.');
                    if (sessionStorage.HHAuto_Temp_questRequirement === "battle") {
                        // Battle Done.
                        sessionStorage.HHAuto_Temp_questRequirement = "none";
                    }
                    ObserveAndGetGirlRewards();
                    return;
                }
                else
                {
                    if (Storage().HHAuto_Setting_useX50Fights === "true")
                    {
                        logHHAuto('Unable to use x50 for '+battleButtonX50Price+' kobans,fights : '+getHHVars('Hero.energies.fight.amount')+'/50, remaining shards : '+remainingShards+'/'+Storage().HHAuto_Setting_minShardsX50+', kobans : '+getHHVars('Hero.infos.hard_currency')+'/'+Number(Storage().HHAuto_Setting_kobanBank));
                    }
                }

                if (Storage().HHAuto_Setting_useX10Fights === "true"
                    && Storage().HHAuto_Setting_minShardsX10
                    && Number.isInteger(Number(Storage().HHAuto_Setting_minShardsX10))
                    && remainingShards >= Number(Storage().HHAuto_Setting_minShardsX10)
                    && (battleButtonX10Price === 0 || getHHVars('Hero.infos.hard_currency')>=battleButtonX10Price+Number(Storage().HHAuto_Setting_kobanBank))
                    && currentPower >= 10
                    && (currentPower >= (Number(Storage().HHAuto_Setting_autoTrollThreshold) + 10)
                        || bypassThreshold
                       )
                    && ( JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).is_mythic === "true" || Storage().HHAuto_Setting_useX10FightsAllowNormalEvent === "true")
                   )
                {
                    logHHAuto("Going to crush 10 times: "+Trollz[Number(TTF)]+' for '+battleButtonX10Price+' kobans.');

                    setHHVars('Hero.infos.hc_confirm',true);
                    // We have the power.
                    //replaceCheatClick();
                    battleButtonX10[0].click();
                    setHHVars('Hero.infos.hc_confirm',hcConfirmValue);
                    //sessionStorage.HHAuto_Temp_EventFightsBeforeRefresh = Number(sessionStorage.HHAuto_Temp_EventFightsBeforeRefresh) - 10;
                    logHHAuto("Crushed 10 times: "+Trollz[Number(TTF)]+' for '+battleButtonX10Price+' kobans.');
                    if (sessionStorage.HHAuto_Temp_questRequirement === "battle") {
                        // Battle Done.
                        sessionStorage.HHAuto_Temp_questRequirement = "none";
                    }
                    ObserveAndGetGirlRewards();
                    return;
                }
                else
                {
                    if (Storage().HHAuto_Setting_useX10Fights === "true")
                    {
                        logHHAuto('Unable to use x10 for '+battleButtonX10Price+' kobans,fights : '+getHHVars('Hero.energies.fight.amount')+'/10, remaining shards : '+remainingShards+'/'+Storage().HHAuto_Setting_minShardsX10+', kobans : '+getHHVars('Hero.infos.hard_currency')+'/'+Number(Storage().HHAuto_Setting_kobanBank));
                    }
                }
            }

            //Crushing one by one


            if (currentPower > 0)
            {
                if ($('#pre-battle div.battle-buttons a.single-battle-button[disabled]').length>0)
                {
                    logHHAuto("Battle Button seems disabled, force reload of page.");
                    gotoPage("home");
                    return;
                }
                if(battleButton === undefined || battleButton.length === 0)
                {
                    logHHAuto("Battle Button was undefined. Disabling all auto-battle.");
                    document.getElementById("autoTrollBattle").checked = false;
                    Storage().HHAuto_Setting_autoTrollBattle = "false"

                    //document.getElementById("autoArenaCheckbox").checked = false;
                    if (sessionStorage.HHAuto_Temp_questRequirement === "battle")
                    {
                        document.getElementById("autoQuest").checked = false;
                        Storage().HHAuto_Setting_autoQuest= "false";

                        logHHAuto("Auto-quest disabled since it requires battle and auto-battle has errors.");
                    }
                    return;
                }
                logHHAuto("Crushing: "+Trollz[Number(TTF)]);
                //console.log(battleButton);
                //replaceCheatClick();
                battleButton[0].click();
                /*if (sessionStorage.HHAuto_Temp_EventFightsBeforeRefresh)
                {
                    sessionStorage.HHAuto_Temp_EventFightsBeforeRefresh = Number(sessionStorage.HHAuto_Temp_EventFightsBeforeRefresh) - 1;
                }
                */
            }
            else
            {
                // We need more power.
                logHHAuto("Battle requires "+battle_price+" power.");
                sessionStorage.HHAuto_Temp_battlePowerRequired = battle_price;
                if(sessionStorage.HHAuto_Temp_questRequirement === "battle")sessionStorage.HHAuto_Temp_questRequirement = "P"+battle_price;
                gotoPage("home");
                return;
            }
        }
        else
        {
            //replaceCheatClick();
            battleButton[0].click();
        }
    }
    else
    {
        logHHAuto('Unable to identify page.');
        gotoPage("home");
        return;
    }
    return;
}

function doBattle()
{
    if (getPage() === "battle" )
    {
        logHHAuto("On battle page.");
        /*if ($("#rewards_popup .blue_text_button").size()>0)
        {
            $("#rewards_popup .blue_text_button").click();
        }
        if ($("#rewards_popup .blue_button_L").size()>0)
        {
            $("#rewards_popup .blue_button_L").click();
        }*/
        let troll_id = queryStringGetParam(window.location.search,'id_opponent');
        if (window.location.pathname === "/league-battle.html" && Storage().HHAuto_Setting_autoLeagues === "true")
        {
            logHHAuto("Reloading after league fight.");
            gotoPage("leaderboard",{},randomInterval(4000,5000));
        }
        else if (window.location.pathname === "/troll-battle.html")
        {
            if(sessionStorage.HHAuto_Temp_eventGirl !== undefined)
            {
                ObserveAndGetGirlRewards();
            }
            else
            {
                if (troll_id !== null)
                {
                    logHHAuto("Go back to Troll after Troll fight.");
                    gotoPage("troll-pre-battle",{id_opponent:troll_id},randomInterval(2000,4000));
                }
                else
                {
                    logHHAuto("Go to home after unknown troll fight.");
                    gotoPage('home',{},randomInterval(2000,4000));
                }
            }

        }
        else if (window.location.pathname === "/season-battle.html" && Storage().HHAuto_Setting_autoSeason === "true")
        {
            logHHAuto("Go back to Season arena after Season fight.");
            gotoPage('season_arena',{},randomInterval(2000,4000));
        }
        else if (window.location.pathname === "/pantheon-battle.html" && Storage().HHAuto_Setting_autoPantheon === "true")
        {
            logHHAuto("Go back to Pantheon arena after Pantheon temple.");
            gotoPage('pantheon',{},randomInterval(2000,4000));
        }
        return true;
    }
    else
    {
        logHHAuto('Unable to identify page.');
        gotoPage("home");
        return;
    }
}

function ObserveAndGetGirlRewards()
{
    let inCaseTimer = setTimeout(function(){gotoPage('home');}, 60000); //in case of issue
    function parseReward()
    {
        if (sessionStorage.HHAuto_Temp_eventsGirlz === undefined
            || sessionStorage.HHAuto_Temp_eventGirl === undefined
            || !isJSON(sessionStorage.HHAuto_Temp_eventsGirlz)
            || !isJSON(sessionStorage.HHAuto_Temp_eventGirl))
        {
            return -1;
        }
        let eventsGirlz =isJSON(sessionStorage.HHAuto_Temp_eventsGirlz)?JSON.parse(sessionStorage.HHAuto_Temp_eventsGirlz):{}
        let eventGirl = isJSON(sessionStorage.HHAuto_Temp_eventGirl)?JSON.parse(sessionStorage.HHAuto_Temp_eventGirl):{};
        let TTF = eventGirl.troll_id;
        if ($('#rewards_popup #reward_holder .shards_wrapper').length === 0)
        {
            clearTimeout(inCaseTimer);
            logHHAuto("No girl in reward going back to Troll");
            gotoPage("troll-pre-battle",{id_opponent:TTF});
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
        sessionStorage.HHAuto_Temp_eventsGirlz = JSON.stringify(eventsGirlz);
        sessionStorage.HHAuto_Temp_eventGirl = JSON.stringify(eventGirl);
        if (renewEvent !== ""
            //|| Number(sessionStorage.HHAuto_Temp_EventFightsBeforeRefresh) < 1
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
            gotoPage("troll-pre-battle",{id_opponent:TTF});
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
            sessionStorage.HHAuto_Temp_autoLoop = "false";
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
    sessionStorage.HHAuto_Temp_Timers=JSON.stringify(Timers);
    logHHAuto(name+" set to "+toHHMMSS(ND/1000-new Date().getTimezoneOffset()*60)+' ('+ toHHMMSS(seconds)+')');
}


var clearTimer=function(name)
{
    delete Timers[name];
    sessionStorage.HHAuto_Temp_Timers=JSON.stringify(Timers);
}

var checkTimer=function(name)
{
    if (!Timers[name])
    {
        return true;
    }
    if (Timers[name]<new Date())
    {
        return true;
    }
    return false;
}

var checkTimerMustExist=function(name)
{
    if (!Timers[name])
    {
        return false;
    }
    if (Timers[name]<new Date())
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
    if (!Timers[name])
    {
        return "No timer";
    }
    var diff=getSecondsLeft(name);
    if (diff<=0)
    {
        return "Time's up!";
    }
    return toHHMMSS(diff);
}


var getFreeGreatPachinko = function(){
    try {
        if(getPage() !== "pachinko")
        {
            // Not at Pachinko screen then goto the Pachinko screen.
            logHHAuto("Navigating to Pachinko window.");
            gotoPage("pachinko");
            return true;
        }
        else {
            logHHAuto("Detected Pachinko Screen. Fetching Pachinko");
            var counter=0;
            while ($('#playzone-replace-info button[free=1]')[0]===undefined && (counter++)<250)
            {
                $('.game-simple-block[type-pachinko=great]')[0].click();
            }
            //if ($('#playzone-replace-info button[free=1]')[0].style.display=="none")
            if ($('#playzone-replace-info button[free=1]')[0]===undefined)
            {
                logHHAuto('Not ready yet');
            }
            else
            {
                $('#playzone-replace-info button[free=1]')[0].click();
            }
            var npach = -1;
            for(let e in unsafeWindow.HHTimers.timers)
            {
                if(unsafeWindow.HHTimers.timers[e].$elm && unsafeWindow.HHTimers.timers[e].$elm.selector.startsWith(".pachinko_change"))
                {
                    npach=unsafeWindow.HHTimers.timers[e].remainingTime;
                }
            }
            if(npach !== -1)
            {
                setTimer('nextPachinkoTime',Number(npach)+1);
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
        if(getPage() !== "pachinko")
        {
            // Not at Pachinko screen then goto the Pachinko screen.
            logHHAuto("Navigating to Pachinko window.");
            gotoPage("pachinko");
            return true;
        }
        else {
            logHHAuto("Detected Pachinko Screen. Fetching Pachinko");
            var butt;
            if (hh_nutaku)
            {
                butt=$('#playzone-replace-info button[play="pachinko5|25|hard_currency"]')[0];
            }
            else
            {
                butt=$('#playzone-replace-info button[play="pachinko5|150|hard_currency"]')[0];
            }
            var counter=0;
            //while (butt===undefined && (counter++)<250)
            logHHAuto('to mythic');
            while ($('#playzone-replace-info button[free=1]')[0]===undefined && (counter++)<250)
            {
                //logHHAuto('to mythic');
                $('.game-simple-block[type-pachinko=mythic]')[0].click();
            }
            //if (butt===undefined)
            if ($('#playzone-replace-info button[free=1]')[0]===undefined)
            {
                //   logHHAuto("Fuck my life!");
                //    setTimer('nextPachinko2Time',600);
                //    return false;
                logHHAuto('Not ready yet');
            }
            else
            {
                $('#playzone-replace-info button[free=1]')[0].click();
            }
            //if (butt.className!="blue_button_L")
            //{
            //   logHHAuto('Not ready yet');
            //}
            //else
            //{
            //   logHHAuto('click');
            //    butt.click();
            //}
            var npach = -1;
            for(var e in unsafeWindow.HHTimers.timers){
                if(unsafeWindow.HHTimers.timers[e].$elm && unsafeWindow.HHTimers.timers[e].$elm.selector.startsWith('.game-simple-block[type-pachinko="mythic"]'))
                    npach=unsafeWindow.HHTimers.timers[e].remainingTime;
            }
            if(npach !== -1)
            {
                setTimer('nextPachinko2Time',Number(npach)+1);
            }
            else
            {
                logHHAuto("Unable to find Great Pachinko time, wait 1h.");
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
    if(getPage() !== "shop")
    {
        logHHAuto("Navigating to Market window.");
        gotoPage("shop");
        return true;
    }
    else {
        logHHAuto("Detected Market Screen. Fetching Assortment");

        var assA=[];
        var assB=[];
        var assG=[];
        var assP=[];
        $('#shop div.armor .slot').each(function(){if (this.dataset.d)assA.push(JSON.parse(this.dataset.d));});
        $('#shop div.booster .slot').each(function(){if (this.dataset.d)assB.push(JSON.parse(this.dataset.d));});
        $('#shop div.gift .slot').each(function(){if (this.dataset.d)assG.push(JSON.parse(this.dataset.d));});
        $('#shop div.potion .slot').each(function(){if (this.dataset.d)assP.push(JSON.parse(this.dataset.d));});

        var HaveAff=0;
        var HaveExp=0;
        $('#inventory div.gift .slot').each(function(){if (this.dataset.d) { var d=JSON.parse(this.dataset.d); HaveAff+=d.count*d.value;}});
        $('#inventory div.potion .slot').each(function(){if (this.dataset.d) { var d=JSON.parse(this.dataset.d); HaveExp+=d.count*d.value;}});

        sessionStorage.HHAuto_Temp_haveAff=HaveAff;
        sessionStorage.HHAuto_Temp_haveExp=HaveExp;

        logHHAuto('counted '+sessionStorage.HHAuto_Temp_haveAff+' Aff '+sessionStorage.HHAuto_Temp_haveExp+' Exp');

        sessionStorage.HHAuto_Temp_storeContents = JSON.stringify([assA,assB,assG,assP]);
        sessionStorage.HHAuto_Temp_charLevel=getHHVars('Hero.infos.level');

        var nshop;
        for(var e in unsafeWindow.HHTimers.timers){
            if(unsafeWindow.HHTimers.timers[e].$elm && unsafeWindow.HHTimers.timers[e].$elm.selector.startsWith(".shop_count"))
                nshop=unsafeWindow.HHTimers.timers[e].remainingTime;
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
    if ( ! sessionStorage.HHAuto_Temp_paranoiaSpendings )
    {
        return -1;
    }
    else
    {
        pSpendings = JSON.parse(sessionStorage.HHAuto_Temp_paranoiaSpendings,reviverMap);
    }

    if ( sessionStorage.HHAuto_Temp_paranoiaQuestBlocked !== undefined && pSpendings.has('quest'))
    {
        pSpendings.delete('quest');
    }

    if ( sessionStorage.HHAuto_Temp_paranoiaLeagueBlocked !== undefined && pSpendings.has('challenge'))
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
    if ( ! sessionStorage.HHAuto_Temp_paranoiaSpendings )
    {
        return -1;
    }
    else
    {
        currentPSpendings = JSON.parse(sessionStorage.HHAuto_Temp_paranoiaSpendings,reviverMap);
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
        sessionStorage.HHAuto_Temp_paranoiaSpendings=JSON.stringify(currentPSpendings,replacerMap);

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
    if (sessionStorage.HHAuto_Temp_NextSwitch && Storage().HHAuto_Setting_paranoiaSpendsBefore === "true")
    {
        toNextSwitch = Number((sessionStorage.HHAuto_Temp_NextSwitch-new Date().getTime())/1000);

        //if autoLeague is on
        if(getHHScriptVars('isEnabledLeagues',false) && Storage().HHAuto_Setting_autoLeagues === "true" && getHHVars('Hero.infos.level')>=20)
        {
            if ( sessionStorage.HHAuto_Temp_paranoiaLeagueBlocked === undefined )
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
        if(getHHScriptVars('isEnabledQuest',false) && Storage().HHAuto_Setting_autoQuest === "true")
        {
            if ( sessionStorage.HHAuto_Temp_paranoiaQuestBlocked === undefined )
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
        if(getHHScriptVars('isEnabledTrollBattle',false) && Storage().HHAuto_Setting_autoTrollBattle === "true" && getHHVars('Hero.infos.questing.id_world')>0)
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
        if(getHHScriptVars('isEnabledSeason',false) && Storage().HHAuto_Setting_autoSeason === "true")
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
        if(getHHScriptVars('isEnabledPantheon',false) && Storage().HHAuto_Setting_autoPantheon === "true")
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
        sessionStorage.HHAuto_Temp_paranoiaSpendings=JSON.stringify(paranoiaSpendings,replacerMap);
    }
}

var flipParanoia=function()
{
    var burst=getBurst();

    var Setting=Storage().HHAuto_Setting_paranoiaSettings;

    var S1=Setting.split('/').map(s=>s.split('|').map(s=>s.split(':')));

    var toNextSwitch;
    var period;
    var n = new Date().getHours();
    S1[2].some(x => {if (n<x[0]) {period=x[1]; return true;}});

    if (burst)
    {
        var periods=Object.assign(...S1[1].map(d => ({[d[0]]: d[1].split('-')})));

        toNextSwitch=sessionStorage.HHAuto_Temp_NextSwitch?Number((sessionStorage.HHAuto_Temp_NextSwitch-new Date().getTime())/1000):randomInterval(Number(periods[period][0]),Number(periods[period][1]));

        //match mythic new wave with end of sleep
        if (Storage().HHAuto_Setting_autoTrollMythicByPassParanoia === "true" && getTimer("eventMythicNextWave") !== -1 && toNextSwitch>getSecondsLeft("eventMythicNextWave"))
        {
            logHHAuto("Forced rest only until next mythic wave.");
            toNextSwitch=getSecondsLeft("eventMythicNextWave");
        }

        //bypass Paranoia if ongoing mythic
        if (Storage().HHAuto_Setting_autoTrollMythicByPassParanoia === "true" && sessionStorage.HHAuto_Temp_eventGirl !==undefined && JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).is_mythic==="true")
        {
            //             var trollThreshold = Number(Storage().HHAuto_Setting_autoTrollThreshold);
            //             if (Storage().HHAuto_Setting_buyMythicCombat === "true" || Storage().HHAuto_Setting_autoTrollMythicByPassThreshold === "true")
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

        if ( checkParanoiaSpendings() === -1 && Storage().HHAuto_Setting_paranoiaSpendsBefore === "true" )
        {
            sessionStorage.HHAuto_Temp_NextSwitch=new Date().getTime() + toNextSwitch * 1000;
            setParanoiaSpendings();
            return;
        }

        if ( checkParanoiaSpendings() === 0 || Storage().HHAuto_Setting_paranoiaSpendsBefore === "false" )
        {
            clearParanoiaSpendings();
            cleanTempPopToStart();
            //going into hiding
            sessionStorage.HHAuto_Temp_burst="false";
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
        //if (getPage()!='home') return;
        //going to work
        sessionStorage.HHAuto_Temp_autoLoop = "false";
        logHHAuto("setting autoloop to false");
        sessionStorage.HHAuto_Temp_burst="true";
        var b=S1[0][0][0].split('-');
        toNextSwitch=randomInterval(Number(b[0]),Number(b[1]));
    }
    var ND=new Date().getTime() + toNextSwitch * 1000;
    var message=period+(burst?" rest":" burst");
    logHHAuto("PARANOIA: "+message);
    sessionStorage.HHAuto_Temp_pinfo=message;

    setTimer('paranoiaSwitch',toNextSwitch);
    //force recheck non completed event after paranoia
    if (sessionStorage.HHAuto_Temp_burst=="true")
    {
        let eventList = isJSON(sessionStorage.HHAuto_Temp_eventsList)?JSON.parse(sessionStorage.HHAuto_Temp_eventsList):{};
        for (let eventID of Object.keys(eventList))
        {
            //console.log(eventID);
            if (!eventList[eventID]["isCompleted"])
            {
                eventList[eventID]["next_refresh"]=new Date().getTime()-1000;
                //console.log("expire");
                if(Object.keys(eventList).length >0)
                {
                    sessionStorage.HHAuto_Temp_eventsList = JSON.stringify(eventList);
                }
            }
        }
        //sessionStorage.removeItem("HHAuto_Temp_eventsList");
        gotoPage('home');
    }
}

function manageUnits(inText)
{
    let units = ["firstUnit", "K", "M", "G", "T", "P", "E", "Z", "Y"];
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
        if (inText.includes('.') || inText.includes(','))
        {
            return parseInt(inText.replace(/[^0-9]/gi, ''))*(100**units.indexOf(textUnit));
        }
        else
        {
            return parseInt(inText.replace(/[^0-9]/gi, ''))*(1000**units.indexOf(textUnit));
        }
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
        total_ego: playerEgo,
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
        ego: opponentEgo,
    } = inPlayerLeaguesData.caracs
    const {
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
        name: $('#leagues_right .player_block .title').text(),
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

        let leaguePlayers = getLeaguePlayersData(getHHVars("heroLeaguesData"),getHHVars("playerLeaguesData"));
        //console.log("HH simuFight",JSON.stringify(leaguePlayers.player),JSON.stringify(leaguePlayers.opponent));
        let simu = calculateBattleProbabilities(leaguePlayers.player, leaguePlayers.opponent);
        //console.log(opponent);
        //console.log(simu);
        //matchRating=customMatchRating(simu);

        //Publish the ego difference as a match rating
        //matchRatingFlag = matchRating.substring(0,1);
        //matchRating = matchRating.substring(1);

        $('div#leagues_right .player_block .challenge').prepend(`<div class="matchRatingNew ${simu.scoreClass}"><img id="powerLevelScouter" src=${getHHScriptVars("powerCalcImages")[simu.scoreClass]}>${nRounding(100*simu.win, 2, -1)}%</div>`);
        $("tr.lead_table_default div[second-row]").append(`<div class="matchRatingNew ${simu.scoreClass}"><img id="powerLevelScouter" src=${getHHScriptVars("powerCalcImages")[simu.scoreClass]}>${nRounding(100*simu.win, 2, -1)}%</div>`);

        //CSS

        GM_addStyle('#leagues_right .player_block .lead_player_profile .level_wrapper {'
                    + 'top: -8px !important;}'
                   );

        GM_addStyle('#leagues_right .player_block .lead_player_profile .icon {'
                    + 'top: 5px !important;}'
                   );

        GM_addStyle('@media only screen and (min-width: 1026px) {'
                    + '.matchRatingNew {'
                    + 'position: absolute;'
                    + 'margin-top: 20px; '
                    + 'margin-left: 40px; '
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
            if (JSON.parse($('div#leagues_right .player_block .team-hexagon-container .team-member-container[data-team-member-position=0] img').attr(girlDataName)))
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
        var opntNameNew = $('div#leagues_right div.player_block div.title')[0].innerHTML
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
        if ($('tr[sorting_id] td span.nickname span.OppoScore').length > 0)
        {
            return
        }

        let opponentsIDList = getLeagueOpponentListData();
        let sorting_id;
        let player;
        let opponentsPowerList = isJSON(sessionStorage.HHAuto_Temp_LeagueOpponentList) ? JSON.parse(sessionStorage.HHAuto_Temp_LeagueOpponentList) : -1;
        let opponentsTempPowerList = isJSON(sessionStorage.HHAuto_Temp_LeagueTempOpponentList) ? JSON.parse(sessionStorage.HHAuto_Temp_LeagueTempOpponentList) : -1;
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
                const points_a = $('#HHPowerCalcScore',$(a)).length===0?0:Number($('#HHPowerCalcPoints',$(a))[0].innerText);
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

    /*let buttonSaveOpponent='<div style="position: absolute;left: 520px;top: 14px;width:100px;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("buttonSaveOpponent","tooltip")+'</span><label style="width:100%;" class="myButton" id="buttonSaveOpponent">'+getTextForUI("buttonSaveOpponent","elementText")+'</label></div>';
    if (document.getElementById("buttonSaveOpponent") === null) {
        $("#leagues_middle").append(buttonSaveOpponent);
        document.getElementById("buttonSaveOpponent").addEventListener("click", function () {
            let caracsHero = 0;
            for (let j = 0; j<heroLeaguesData.team.girls.length;j++)
            {
                for (let z=1;z<4;z++)
                {
                    caracsHero = caracsHero +  Number(heroLeaguesData.team.girls[j].caracs['carac'+z]);}
            }
            //caracsHero = caracsHero * 0.12;
            //console.log(caracsHero);
            let leagueSavedData = {
                "opponent": getLeaguePlayersData().opponent,
                "hero_caracs_team" : caracsHero,
                "playersBonuses": getLeaguePlayersData().playersBonuses
            };
            sessionStorage.HHAuto_Temp_LeagueSavedData = JSON.stringify(leagueSavedData);
            //console.log(JSON.stringify(leagueSavedData));
        });
    }
    */

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
            /*$('#emptyStarPanel g#iconHideStars')[0].addEventListener("click", function () {
                switchHideButton();
            }, true);*/
            // setTimeout(function(){},2
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
        $('#season-arena .battle_hero .hero_stats .hero_stats_row div').each(function ()
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
        const playerTeam = $('#season-arena .battle_hero .hero_team .team-member img').map((i, el) => $(el).data('new-girl-tooltip')).toArray();
        const playerSynergies = JSON.parse($('#season-arena .battle_hero .hero_team .icon-area').attr('synergy-data'));
        const playerTeamMemberElements = playerTeam.map(({element_data: {type: element}})=>element);
        const playerElements = calculateThemeFromElements(playerTeamMemberElements)
        const playerBonuses = {
            critDamage: playerSynergies.find(({element: {type}})=>type==='fire').bonus_multiplier,
            critChance: playerSynergies.find(({element: {type}})=>type==='stone').bonus_multiplier,
            defReduce: playerSynergies.find(({element: {type}})=>type==='sun').bonus_multiplier,
            healOnHit: playerSynergies.find(({element: {type}})=>type==='water').bonus_multiplier
        };

        for (let index=0;index<3;index++)
        {

            const opponentName = $("div.season_arena_opponent_container .hero_details div.hero_name")[index].innerText
            const opponentEgo = manageUnits($('div.opponents_arena .season_arena_opponent_container .hero_stats')[index].querySelectorAll('.hero_stats_row span.pull_right')[2].innerText);
            const opponentDef = manageUnits($('div.opponents_arena .season_arena_opponent_container .hero_stats')[index].querySelectorAll('.hero_stats_row span.pull_right')[1].innerText);
            const opponentAtk = manageUnits($('div.opponents_arena .season_arena_opponent_container .hero_stats')[index].querySelectorAll('.hero_stats_row span.pull_right')[0].innerText);
            const opponentCrit = manageUnits($('div.opponents_arena .season_arena_opponent_container .hero_stats')[index].querySelectorAll('.hero_stats_row span.pull_right')[3].innerText);
            const opponentTeam = $('.team-member img',$('#season-arena .opponents_arena .season_arena_opponent_container .hero_team')[index]).map((i, el) => $(el).data('new-girl-tooltip')).toArray();
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
            mojoOppo[index]=Number($("div.season_arena_opponent_container .slot_victory_points p")[index].innerText);
            //logHHAuto(Number($("div.season_arena_opponent_container .slot_victory_points p")[index].innerText));
            nameOppo[index]=opponentName;
            expOppo[index]=Number($("div.season_arena_opponent_container .slot_season_xp_girl")[index].lastElementChild.innerText.replace(/\D/g, ''));
            affOppo[index]=Number($("div.season_arena_opponent_container .slot_season_affection_girl")[index].lastElementChild.innerText.replace(/\D/g, ''));
            //Publish the ego difference as a match rating
            //matchRatingFlag = matchRating.substring(0,1);
            //matchRating = matchRating.substring(1);

            if (doDisplay)
            {
                $($('div.season_arena_opponent_container .hero_team .icon-area')[index]).prepend(`<div class="matchRatingNew ${simu.scoreClass}"><img id="powerLevelScouter" src=${getHHScriptVars("powerCalcImages")[simu.scoreClass]}>${nRounding(100*simu.win, 2, -1)}%</div>`);
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
                chosenRating = currentScore;
                chosenFlag = currentFlag;
                chosenID = index;
                chosenMojo = currentMojo;
                oppoName = nameOppo[index];
                currentGains = currentAff + currentExp;
            }
            //same orange flag but better score
            else if (chosenFlag == currentFlag && currentFlag == 0 && chosenRating < currentScore)
            {
                //logHHAuto('second');
                chosenRating = currentScore;
                chosenFlag = currentFlag;
                chosenID = index;
                chosenMojo = currentMojo;
                oppoName = nameOppo[index];
            }
            //same red flag but better mojo
            else if (chosenFlag == currentFlag && currentFlag == -1 && chosenMojo < currentMojo)
            {
                //logHHAuto('second');
                chosenRating = currentScore;
                chosenFlag = currentFlag;
                chosenID = index;
                chosenMojo = currentMojo;
                oppoName = nameOppo[index];
            }
            //same green flag but better mojo
            else if (chosenFlag == currentFlag && currentFlag == 1 && chosenMojo < currentMojo)
            {
                //logHHAuto('third');
                chosenRating = currentScore;
                chosenFlag = currentFlag;
                chosenID = index;
                chosenMojo = currentMojo;
                oppoName = nameOppo[index];
            }
            //same green flag same mojo but better gains
            else if (chosenFlag == currentFlag && currentFlag == 1 && chosenMojo == currentMojo && currentGains < currentAff + currentExp)
            {
                //logHHAuto('third');
                chosenRating = currentScore;
                chosenFlag = currentFlag;
                chosenID = index;
                chosenMojo = currentMojo;
                oppoName = nameOppo[index];
            }
            //same green flag same mojo same gains but better score
            else if (chosenFlag == currentFlag && currentFlag == 1 && chosenMojo == currentMojo && currentGains === currentAff + currentExp && currentScore > chosenRating)
            {
                //logHHAuto('third');
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
        if (numberOfReds === 3 && Storage().HHAuto_Setting_autoSeasonPassReds === "true" && getHHVars('Hero.infos.hard_currency')>=price+Number(Storage().HHAuto_Setting_kobanBank))
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
    let oldValues=sessionStorage.HHAuto_Temp_CheckSpentPoints?JSON.parse(sessionStorage.HHAuto_Temp_CheckSpentPoints):-1;
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
        sessionStorage.HHAuto_Temp_CheckSpentPoints=JSON.stringify(newValues);

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
        sessionStorage.HHAuto_Temp_CheckSpentPoints=JSON.stringify(newValues);
    }
}

var busy = false;

var autoLoop = function () {

    updateData();
    if (!sessionStorage.HHAuto_Temp_questRequirement)
    {
        sessionStorage.HHAuto_Temp_questRequirement="none";
    }
    if (!sessionStorage.HHAuto_Temp_userLink)
    {
        sessionStorage.HHAuto_Temp_userLink="none"
    }
    if (!sessionStorage.HHAuto_Temp_battlePowerRequired)
    {
        sessionStorage.HHAuto_Temp_battlePowerRequired="0";
    }



    //var busy = false;
    busy = false;
    var page = window.location.href;
    var currentPower = getHHVars('Hero.energies.fight.amount');

    var burst=getBurst();
    switchHHMenuButton(burst);
    //console.log("burst : "+burst);

    if (burst /*|| checkTimer('nextMissionTime')*/)
    {

        if (!checkTimer("paranoiaSwitch") )
        {
            clearParanoiaSpendings();
        }
        CheckSpentPoints();

        //check what happen to timer if no more wave before uncommenting
        /*if (Storage().HHAuto_Setting_plusEventMythic==="true" && checkTimerMustExist('eventMythicNextWave'))
        {
            gotoPage('home');
        }
        */

        //if a new event is detected
        let eventQuery = '#contains_all #homepage .event-widget a[rel="event"]:not([href="#"])';
        let mythicEventQuery = '#contains_all #homepage .event-widget a[rel="mythic_event"]:not([href="#"])';
        let eventIDs=[];
        if (getPage()==="event")
        {
            if (queryStringGetParam(window.location.search,'tab') !== null)
            {
                eventIDs.push(queryStringGetParam(window.location.search,'tab'));
            }
        }
        else if (getPage() === "home")
        {
            let parsedURL;
            queryResults=$(eventQuery);
            if (queryResults.length >0)
            {
                for(let index = 0;index < queryResults.length;index++)
                {
                    parsedURL = new URL(queryResults[index].getAttribute("href"),window.location.origin);
                    if (queryStringGetParam(parsedURL.search,'tab') !== null && checkEvent(queryStringGetParam(parsedURL.search,'tab')))
                    {
                        eventIDs.push(queryStringGetParam(parsedURL.search,'tab'));
                    }
                }
            }
            queryResults=$(mythicEventQuery)
            if(queryResults.length >0)
            {
                for(let index = 0;index < queryResults.length;index++)
                {
                    parsedURL = new URL(queryResults[index].getAttribute("href"),window.location.origin);
                    if (queryStringGetParam(parsedURL.search,'tab') !== null && checkEvent(queryStringGetParam(parsedURL.search,'tab')))
                    {
                        eventIDs.push(queryStringGetParam(parsedURL.search,'tab'));
                    }
                }
            }
        }
        if(
            getHHScriptVars("isEnabledEvents",false)
            && busy === false
            &&
            (
                (
                    eventIDs.length > 0
                    && getPage() !== "event"
                )
                ||
                (
                    getPage()==="event"
                    && $("#contains_all #events[parsed]").length === 0
                )
            )
        )
            //&& ( sessionStorage.HHAuto_Temp_EventFightsBeforeRefresh === undefined || getTimer('eventRefreshExpiration') === -1 || sessionStorage.HHAuto_Temp_eventGirl === undefined)
        {
            logHHAuto("Going to check on events.");
            busy = true;
            busy = parseEventPage(eventIDs[0]);
        }


        if(busy === false && getPage()==="battle" && sessionStorage.HHAuto_Temp_autoLoop === "true")
        {
            busy = true;
            doBattle();
        }

        if(getHHScriptVars("isEnabledTrollBattle",false) && Storage().HHAuto_Setting_autoTrollBattle === "true" && getHHVars('Hero.infos.questing.id_world')>0 && sessionStorage.HHAuto_Temp_autoLoop === "true")
        {
            if(busy === false && currentPower >= Number(sessionStorage.HHAuto_Temp_battlePowerRequired) && (currentPower > 0 || canBuyFight(false).canBuy))
            {
                //logHHAuto("fight amount: "+currentPower+" troll threshold: "+Number(Storage().HHAuto_Setting_autoTrollThreshold)+" paranoia fight: "+Number(checkParanoiaSpendings('fight')));
                if (Number(currentPower) > Number(Storage().HHAuto_Setting_autoTrollThreshold) //fight is above threshold
                    || Number(checkParanoiaSpendings('fight')) > 0 //paranoiaspendings to do
                    || (sessionStorage.HHAuto_Temp_eventGirl  !== undefined
                        && JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).is_mythic === "false"
                        && canBuyFight().canBuy
                       ) // eventGirl available and buy comb true
                    || (sessionStorage.HHAuto_Temp_eventGirl !== undefined
                        && JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).is_mythic === "true"
                        && Storage().HHAuto_Setting_plusEventMythic==="true"
                       ) // mythicEventGirl available and fights available
                   )
                {
                    sessionStorage.HHAuto_Temp_battlePowerRequired = "0";
                    busy = true;
                    if(Storage().HHAuto_Setting_autoQuest === "true")
                    {
                        if(sessionStorage.HHAuto_Temp_questRequirement[0] === 'P')
                        {
                            logHHAuto("AutoBattle disabled for power collection for AutoQuest.");
                            document.getElementById("autoTrollBattle").checked = false;
                            Storage().HHAuto_Setting_autoTrollBattle = "false";
                            busy = false;
                        }
                        else
                        {
                            busy = doBossBattle();
                        }
                    }
                    else
                    {
                        busy = doBossBattle();
                    }
                }
            }
        }
        else
        {
            sessionStorage.HHAuto_Temp_battlePowerRequired = "0";
        }

        if (getHHScriptVars("isEnabledGreatPachinko",false) && Storage().HHAuto_Setting_autoFreePachinko === "true" && busy === false && sessionStorage.HHAuto_Temp_autoLoop === "true" && checkTimer("nextPachinkoTime")) {
            logHHAuto("Time to fetch Great Pachinko.");
            busy = true;
            busy =getFreeGreatPachinko();

        }
        if (getHHScriptVars("isEnabledMythicPachinko",false) && Storage().HHAuto_Setting_autoFreePachinko === "true" && busy === false && sessionStorage.HHAuto_Temp_autoLoop === "true" && checkTimer("nextPachinko2Time") && getHHScriptVars("gameID") !== HHEnvVariables["SH_prod"].gameID ) {
            logHHAuto("Time to fetch Mythic Pachinko.");
            busy = true;
            busy = getFreeMythicPachinko();

        }

        if(getHHScriptVars("isEnabledContest",false) && Storage().HHAuto_Setting_autoContest === "true" && busy === false && sessionStorage.HHAuto_Temp_autoLoop === "true")
        {
            if (checkTimer('nextContestTime') || unsafeWindow.has_contests_datas ||$(".contest .ended button[rel='claim']").size()>0){
                logHHAuto("Time to get contest rewards.");
                busy = doContestStuff();
            }
        }

        if(getHHScriptVars("isEnabledPowerPlaces",false) && Storage().HHAuto_Setting_autoPowerPlaces === "true" && busy === false && sessionStorage.HHAuto_Temp_autoLoop === "true")
        {

            var popToStart = sessionStorage.HHAuto_Temp_PopToStart?JSON.parse(sessionStorage.HHAuto_Temp_PopToStart):[];
            if (popToStart.length != 0 || checkTimer('minPowerPlacesTime'))
            {
                //if PopToStart exist bypass function
                var popToStartExist = sessionStorage.HHAuto_Temp_PopToStart?false:true;
                //logHHAuto("startcollect : "+popToStartExist);
                if (popToStartExist)
                {
                    //logHHAuto("pop1:"+popToStart);
                    logHHAuto("Go and collect");
                    busy = true;
                    busy = collectAndUpdatePowerPlaces();
                }
                var indexes=(Storage().HHAuto_Setting_autoPowerPlacesIndexFilter).split(";");

                popToStart = sessionStorage.HHAuto_Temp_PopToStart?JSON.parse(sessionStorage.HHAuto_Temp_PopToStart):[];
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
                //logHHAuto("pop3:"+sessionStorage.HHAuto_Temp_PopToStart);
                popToStart = sessionStorage.HHAuto_Temp_PopToStart?JSON.parse(sessionStorage.HHAuto_Temp_PopToStart):[];
                //logHHAuto("pop3:"+popToStart);
                if (busy ===false && popToStart.length === 0)
                {
                    //logHHAuto("removing popToStart");
                    sessionStorage.removeItem('HHAuto_Temp_PopToStart');
                    gotoPage("home");
                }
            }
        }

        if(getHHScriptVars("isEnabledMission",false) && Storage().HHAuto_Setting_autoMission === "true" && busy === false && sessionStorage.HHAuto_Temp_autoLoop === "true")
        {
            if (checkTimer('nextMissionTime')){
                logHHAuto("Time to do missions.");
                busy = doMissionStuff();
            }
        }

        if (getHHScriptVars("isEnabledQuest",false) && Storage().HHAuto_Setting_autoQuest === "true" && busy === false  && sessionStorage.HHAuto_Temp_autoLoop === "true")
        {
            sessionStorage.HHAuto_Temp_autoTrollBattleSaveQuest = (sessionStorage.HHAuto_Temp_autoTrollBattleSaveQuest ? sessionStorage.HHAuto_Temp_autoTrollBattleSaveQuest : "false") ;
            if (sessionStorage.HHAuto_Temp_questRequirement === "battle")
            {
                if (getHHScriptVars("isEnabledTrollBattle",false) && sessionStorage.HHAuto_Temp_autoTrollBattleSaveQuest === "false")
                {
                    logHHAuto("Quest requires battle.");
                    logHHAuto("prepare to save one battle for quest");
                    sessionStorage.HHAuto_Temp_autoTrollBattleSaveQuest = "true";
                    doBossBattle();
                }
                busy = true;
            }
            else if (sessionStorage.HHAuto_Temp_questRequirement[0] === '$')
            {
                if (Number(sessionStorage.HHAuto_Temp_questRequirement.substr(1)) < getHHVars('Hero.infos.soft_currency')) {
                    // We have enough money... requirement fulfilled.
                    logHHAuto("Continuing quest, required money obtained.");
                    sessionStorage.HHAuto_Temp_questRequirement = "none";
                    proceedQuest();
                    busy = true;
                }
                else
                {
                    //prevent paranoia to wait for quest
                    sessionStorage.HHAuto_Temp_paranoiaQuestBlocked="true";
                    if(isNaN(sessionStorage.HHAuto_Temp_questRequirement.substr(1)))
                    {
                        logHHAuto(sessionStorage.HHAuto_Temp_questRequirement);
                        sessionStorage.HHAuto_Temp_questRequirement = "none";
                        logHHAuto("Invalid money in session storage quest requirement !");
                    }
                    busy = false;
                }
            }
            else if (sessionStorage.HHAuto_Temp_questRequirement[0] === '*')
            {
                var energyNeeded = Number(sessionStorage.HHAuto_Temp_questRequirement.substr(1));
                var energyCurrent = getHHVars('Hero.energies.quest.amount');
                if (energyNeeded <= energyCurrent)
                {
                    if (Number(getHHVars('Hero.energies.quest.amount')) > Number(Storage().HHAuto_Setting_autoQuestThreshold) || Number(checkParanoiaSpendings('quest')) > 0 )
                    {
                        // We have enough energy... requirement fulfilled.
                        logHHAuto("Continuing quest, required energy obtained.");
                        sessionStorage.HHAuto_Temp_questRequirement = "none";
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
                    sessionStorage.HHAuto_Temp_paranoiaQuestBlocked="true";
                    busy = false;
                    //logHHAuto("Replenishing energy for quest.(" + energyNeeded + " needed)");
                }
            }
            else if (sessionStorage.HHAuto_Temp_questRequirement[0] === 'P')
            {
                // Battle power required.
                var neededPower = Number(sessionStorage.HHAuto_Temp_questRequirement.substr(1));
                if(currentPower < neededPower)
                {
                    logHHAuto("Quest requires "+neededPower+" Battle Power for advancement. Waiting...");
                    busy = false;
                    //prevent paranoia to wait for quest
                    sessionStorage.HHAuto_Temp_paranoiaQuestBlocked="true";
                }
                else
                {
                    logHHAuto("Battle Power obtained, resuming quest...");
                    sessionStorage.HHAuto_Temp_questRequirement = "none";
                    proceedQuest();
                    busy = true;
                }
            }
            else if (sessionStorage.HHAuto_Temp_questRequirement === "unknownQuestButton")
            {
                //prevent paranoia to wait for quest
                sessionStorage.HHAuto_Temp_paranoiaQuestBlocked="true";
                logHHAuto("AutoQuest disabled.HHAuto_Setting_AutoQuest cannot be performed due to unknown quest button. Please manually proceed the current quest screen.");
                document.getElementById("autoQuest").checked = false;
                Storage().HHAuto_Setting_autoQuest = "false";
                sessionStorage.HHAuto_Temp_questRequirement = "none";
                busy = false;
            }
            else if (sessionStorage.HHAuto_Temp_questRequirement === "errorInAutoBattle")
            {
                //prevent paranoia to wait for quest
                sessionStorage.HHAuto_Temp_paranoiaQuestBlocked="true";
                logHHAuto("AutoQuest disabled.HHAuto_Setting_AutoQuest cannot be performed due errors in AutoBattle. Please manually proceed the current quest screen.");
                document.getElementById("autoQuest").checked = false;
                Storage().HHAuto_Setting_autoQuest = "false";
                sessionStorage.HHAuto_Temp_questRequirement = "none";
                busy = false;
            }
            else if(sessionStorage.HHAuto_Temp_questRequirement === "none")
            {
                if (Number(getHHVars('Hero.energies.quest.amount')) > Number(Storage().HHAuto_Setting_autoQuestThreshold) || Number(checkParanoiaSpendings('quest')) > 0 )
                {
                    //logHHAuto("NONE req.");
                    busy = true;
                    proceedQuest();
                }
            }
            else
            {
                //prevent paranoia to wait for quest
                sessionStorage.HHAuto_Temp_paranoiaQuestBlocked="true";
                logHHAuto("Invalid quest requirement : "+sessionStorage.HHAuto_Temp_questRequirement);
                busy=false;
            }
        }
        else if(Storage().HHAuto_Setting_autoQuest === "false")
        {
            sessionStorage.HHAuto_Temp_questRequirement = "none";
        }

        if(getHHScriptVars("isEnabledSeason",false) && Storage().HHAuto_Setting_autoSeason === "true" && busy === false && sessionStorage.HHAuto_Temp_autoLoop === "true")
        {
            if (Number(getHHVars('Hero.energies.kiss.amount')) > 0 && ( (Number(getHHVars('Hero.energies.kiss.amount')) > Number(Storage().HHAuto_Setting_autoSeasonThreshold) && checkTimer('nextSeasonTime')) || Number(checkParanoiaSpendings('kiss')) > 0 ) )
            {
                logHHAuto("Time to fight in Season.");
                doSeason();
                busy = true;
            }
            else
            {
                if (checkTimer('nextSeasonTime'))
                {
                    if (getHHVars('Hero.energies.kiss.next_refresh_ts') === 0)
                    {
                        setTimer('nextSeasonTime',15*60);
                    }
                    else
                    {
                        setTimer('nextSeasonTime',getHHVars('Hero.energies.kiss.next_refresh_ts'));
                    }
                }
            }

        }

        if(getHHScriptVars("isEnabledPantheon",false) && Storage().HHAuto_Setting_autoPantheon === "true" && busy === false && sessionStorage.HHAuto_Temp_autoLoop === "true")
        {
            if (Number(getHHVars('Hero.energies.worship.amount')) > 0 && ( (Number(getHHVars('Hero.energies.worship.amount')) > Number(Storage().HHAuto_Setting_autoPantheonThreshold) && checkTimer('nextPantheonTime')) || Number(checkParanoiaSpendings('worship')) > 0 ) )
            {
                logHHAuto("Time to do Pantheon.");
                doPantheon();
                busy = true;
            }
            else
            {
                if (checkTimer('nextPantheonTime'))
                {
                    if (getHHVars('Hero.energies.worship.next_refresh_ts') === 0)
                    {
                        setTimer('nextPantheonTime',15*60);
                    }
                    else
                    {
                        setTimer('nextPantheonTime',getHHVars('Hero.energies.worship.next_refresh_ts'));
                    }
                }
            }

        }

        var ECt= getHHVars('Hero.energies.quest.amount');
        if (getHHScriptVars("isEnabledChamps",false) && ECt>=60 && (Storage().HHAuto_Setting_autoChampsUseEne==="true") && sessionStorage.HHAuto_Temp_autoLoop === "true")
        {
            function buyTicket()
            {
                var params = {
                    namespace: 'h\\Champions',
                    class: 'ChampionController',
                    action: 'buy_ticket',
                    currency: 'energy_quest',
                    amount: 1
                };
                logHHAuto('Buying ticket with energy');
                hh_ajax(params, function(data) {
                    //anim_number($('.tickets_number_amount'), data.tokens - amount, amount);
                    Hero.updates(data.heroChangesUpdate);
                    location.reload();
                });
            }
            sessionStorage.HHAuto_Temp_autoLoop = "false";
            logHHAuto("setting autoloop to false");
            busy = true;
            setTimeout(buyTicket,randomInterval(800,1600));
        }

        if (getHHScriptVars("isEnabledChamps",false) && busy==false && Storage().HHAuto_Setting_autoChamps==="true" && checkTimer('nextChampionTime') && sessionStorage.HHAuto_Temp_autoLoop === "true")
        {
            logHHAuto("Time to check on champions!");
            busy=true;
            busy=doChampionStuff();
        }

        if (getHHScriptVars("isEnabledClubChamp",false) && busy==false && Storage().HHAuto_Setting_autoClubChamp==="true" && checkTimer('nextClubChampionTime') && sessionStorage.HHAuto_Temp_autoLoop === "true")
        {
            logHHAuto("Time to check on club champion!");
            busy=true;
            busy=doClubChampionStuff();
        }

        if(getHHScriptVars("isEnabledLeagues",false) && Storage().HHAuto_Setting_autoLeagues === "true" && getHHVars('Hero.infos.level')>=20 && busy === false && sessionStorage.HHAuto_Temp_autoLoop === "true")
        {
            // Navigate to leagues
            if ((checkTimer('nextLeaguesTime') && Number(getHHVars('Hero.energies.challenge.amount')) > Number(Storage().HHAuto_Setting_autoLeaguesThreshold) ) || Number(checkParanoiaSpendings('challenge')) > 0)
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
                        setTimer('nextLeaguesTime',getHHVars('Hero.energies.challenge.next_refresh_ts'));
                    }
                }
            }
        }

        if (getHHScriptVars("isEnabledDailyRewards",false) && busy==false && sessionStorage.HHAuto_Temp_autoLoop === "true" && getPage() === "home" && getSecondsLeftBeforeEndOfHHDay() < 3600 && getSecondsLeftBeforeEndOfHHDay() > 5*60 && Storage().HHAuto_Setting_collectDailyRewards === "true" && dailyRewardAvailable())
        {
            busy = true;
            collectDailyRewards();
        }

        if (getHHScriptVars("isEnabledShop",false) && busy===false && ( Storage().HHAuto_Setting_paranoia !== "true" || !checkTimer("paranoiaSwitch") )  && sessionStorage.HHAuto_Temp_autoLoop === "true")
        {
            if (sessionStorage.HHAuto_Temp_charLevel===undefined)
            {
                sessionStorage.HHAuto_Temp_charLevel=0;
            }
            if (checkTimer('nextShopTime') || sessionStorage.HHAuto_Temp_charLevel<getHHVars('Hero.infos.level')) {
                logHHAuto("Time to check shop.");
                busy = updateShop();
            }
        }

        if (getHHScriptVars("isEnabledSalary",false) && Storage().HHAuto_Setting_autoSalary === "true" && busy === false && ( Storage().HHAuto_Setting_paranoia !== "true" || !checkTimer("paranoiaSwitch") )  && sessionStorage.HHAuto_Temp_autoLoop === "true")
        {
            if (checkTimer("nextSalaryTime")) {
                logHHAuto("Time to fetch salary.");
                busy = true;
                busy = getSalary();
            }
        }

        if (
            busy === false
            && sessionStorage.HHAuto_Temp_autoLoop === "true"
            && HaremSizeNeedsRefresh(getHHScriptVars("HaremMaxSizeExpirationSecs"))
        )
        {
            //console.log(! isJSON(sessionStorage.HHAuto_Temp_HaremSize),JSON.parse(sessionStorage.HHAuto_Temp_HaremSize).count_date,new Date().getTime() + getHHScriptVars("HaremSizeExpirationSecs") * 1000);
            busy = true;
            gotoPage("harem");
        }


        if(busy === true && sessionStorage.HHAuto_Temp_userLink==="none" && !window.location.pathname.startsWith("/quest"))
        {
            sessionStorage.HHAuto_Temp_userLink = page;
        }
        else if(sessionStorage.HHAuto_Temp_userLink !=="none" && busy === false && sessionStorage.HHAuto_Temp_autoLoop === "true" && getPage() !== "home")
        {
            logHHAuto("Back to home page at the end of actions");
            //window.location = sessionStorage.HHAuto_Temp_userLink;
            gotoPage('home');
            sessionStorage.HHAuto_Temp_userLink = "none";
        }
    }

    if(Storage().HHAuto_Setting_paranoia === "true" && Storage().HHAuto_Setting_master==="true" && busy === false  && sessionStorage.HHAuto_Temp_autoLoop === "true")
    {
        if (checkTimer("paranoiaSwitch")) {
            flipParanoia();
        }
    }

    if (getPage() === "leaderboard" && Storage().HHAuto_Setting_showCalculatePower === "true")
    {
        moduleSimLeague();
    }
    if (getPage() === "season_arena" && Storage().HHAuto_Setting_showCalculatePower === "true")
    {
        moduleSimSeasonBattle();
    }
    if (getPage() === "season" && Storage().HHAuto_Setting_SeasonMaskRewards === "true")
    {
        setTimeout(moduleSimSeasonReward,500);
    }
    if (getPage() === "event" && ( Storage().HHAuto_Setting_plusEvent==="true" || Storage().HHAuto_Setting_plusEventMythic==="true"))
    {
        parseEventPage();
        moduleDisplayEventPriority();
    }
    if (getPage() === "event" && Storage().HHAuto_Setting_PoAMaskRewards === "true")
    {
        modulePathOfAttractionHide();
    }
    if (getPage() == "path_of_attraction" && Storage().HHAuto_Setting_PoAMaskRewards === "true") {
        moduleOldPathOfAttractionHide();
    }
    if (getPage() === "powerplacemain" )
    {
        moduleDisplayPopID();
    }
    if (getPage() === "shop" && Storage().HHAuto_Setting_showMarketTools === "true")
    {
        moduleShopActions();
    }
    if (getPage() === "harem")
    {
        moduleHarem();
        moduleHaremExportGirlsData();
        moduleHaremCountMax();
        moduleHaremNextUpgradableGirl();
        haremOpenFirstXUpgradable();
    }
    if (getPage() === "pachinko")
    {
        modulePachinko();
    }
    if (getPage() === getHHScriptVars("pageEditTeam"))
    {
        moduleChangeTeam();
    }
    if (getPage() === "contests" )
    {
        moduleDisplayContestsDeletion();
    }

    if(isNaN(Storage().HHAuto_Temp_autoLoopTimeMili))
    {
        logHHAuto("AutoLoopTimeMili is not a number.");
        setDefaults(true);
    }
    else
    {
        if (sessionStorage.HHAuto_Temp_autoLoop === "true")
        {
            setTimeout(autoLoop, Number(Storage().HHAuto_Temp_autoLoopTimeMili));
        }
        else
        {
            logHHAuto("autoLoop Disabled");
        }
    }

}

function HaremSizeNeedsRefresh(inCustomExpi)
{
    return ! isJSON(sessionStorage.HHAuto_Temp_HaremSize) || JSON.parse(sessionStorage.HHAuto_Temp_HaremSize).count_date < (new Date().getTime() - inCustomExpi * 1000);
}

function moduleHaremCountMax()
{
    if (HaremSizeNeedsRefresh(getHHScriptVars("HaremMinSizeExpirationSecs")) && getHHVars('girlsDataList',false) !== null)
    {
        sessionStorage.HHAuto_Temp_HaremSize = JSON.stringify({count:Object.keys(getHHVars('girlsDataList',false)).length,count_date:new Date().getTime()});
        logHHAuto("Harem size updated to : "+Object.keys(getHHVars('girlsDataList',false)).length);
        //console.log(sessionStorage.HHAuto_Temp_HaremSize);
    }
}

function getLevelXp(inRarity, inLevel)
{
    let GIRLS_EXP_LEVELS = [];

    GIRLS_EXP_LEVELS.starting = [0, 10, 21, 32, 43, 54, 65, 76, 87, 98, 109, 120, 131, 142, 154, 166, 178, 190, 202, 214, 226, 238, 250, 262, 274, 286, 299, 312, 325, 338, 351, 364, 377, 390, 403, 416, 429, 443, 457, 471, 485, 499, 513, 527, 541, 555, 569, 584, 599, 614, 629, 644, 659, 674, 689, 704, 720, 736, 752, 768, 784, 800, 816, 832, 849, 866, 883, 900, 917, 934, 951, 968, 985, 1003, 1021, 1039, 1057, 1075, 1093, 1111, 1130, 1149, 1168, 1187, 1206, 1225, 1244, 1264, 1284, 1304, 1324, 1344, 1364, 1384, 1405, 1426, 1447, 1468, 1489, 1510, 1531, 1553, 1575, 1597, 1619, 1641, 1663, 1686, 1709, 1732, 1755, 1778, 1801, 1825, 1849, 1873, 1897, 1921, 1945, 1970, 1995, 2020, 2045, 2070, 2096, 2122, 2148, 2174, 2200, 2227, 2254, 2281, 2308, 2335, 2363, 2391, 2419, 2447, 2475, 2504, 2533, 2562, 2591, 2620, 2650, 2680, 2710, 2740, 2770, 2801, 2832, 2863, 2894, 2926, 2958, 2990, 3022, 3055, 3088, 3121, 3154, 3188, 3222, 3256, 3290, 3325, 3360, 3395, 3430, 3466, 3502, 3538, 3574, 3611, 3648, 3685, 3722, 3760, 3798, 3836, 3875, 3914, 3953, 3992, 4032, 4072, 4112, 4153, 4194, 4235, 4277, 4319, 4361, 4403, 4446, 4489, 4532, 4576, 4620, 4664, 4709, 4754, 4799, 4845, 4891, 4937, 4984, 5031, 5078, 5126, 5174, 5223, 5272, 5321, 5371, 5421, 5471, 5522, 5573, 5624, 5676, 5728, 5781, 5834, 5887, 5941, 5995, 6050, 6105, 6160, 6216, 6272, 6329, 6386, 6444, 6502, 6560, 6619, 6678, 6738, 6798, 6859, 6920, 6981, 7043, 7105, 7168, 7231, 7295, 7359, 7424, 7489, 7555, 7621, 7688, 7755, 7823, 7891, 7960, 8029, 8099, 8169, 8240, 8311, 8383, 8455, 8528, 8601, 8675, 8750, 8825, 8901, 8977, 9054, 9131, 9209, 9288, 9367, 9447, 9527, 9608, 9690, 9772, 9855, 9938, 10022, 10107, 10192, 10278, 10365, 10452, 10540, 10628, 10717, 10807, 10897, 10988, 11080, 11172, 11265, 11359, 11454, 11549, 11645, 11742, 11839, 11937, 12036, 12136, 12236, 12337, 12439, 12542, 12645, 12749, 12854, 12960, 13067, 13174, 13282, 13391, 13501, 13612, 13723, 13835, 13948, 14062, 14177, 14293, 14409, 14526, 14644, 14763, 14883, 15004, 15126, 15249, 15373, 15498, 15623, 15749, 15876, 16004, 16133, 16263, 16394, 16526, 16659, 16793, 16928, 17064, 17201, 17339, 17478, 17618, 17759, 17901, 18044, 18189, 18335, 18482, 18630, 18779, 18929, 19080, 19232, 19385, 19540, 19696, 19853, 20011, 20170, 20330, 20492, 20655, 20819, 20984, 21151, 21319, 21488, 21658, 21830, 22003, 22177, 22352, 22529, 22707, 22886, 23067, 23249, 23432, 23617, 23803, 23991, 24180, 24370, 24562, 24755, 24950, 25146, 25344, 25543, 25744, 25946, 26150, 26355, 26562, 26770, 26980, 27191, 27404, 27619, 27835, 28053, 28272, 28493, 28716, 28940, 29166, 29394, 29623, 29854, 30087, 30322, 30558, 30796, 31036, 31278, 31522, 31767, 32014, 32263, 32514, 32767, 33022, 33279, 33537, 33797, 34059, 34323, 34589, 34857, 35127, 35399, 35673, 35949, 36228, 36509, 36792, 37077, 37364, 37653, 37944, 38237, 38533, 38831, 39131, 39433, 39738, 40045, 40354, 40665, 40979, 41295, 41614, 41935, 42258, 42584, 42912, 43243, 43576, 43912, 44250, 44591, 44934, 45280, 45628, 45979, 46333, 46689, 47048, 47410, 47774, 48141, 48511, 48884, 49259, 49637, 50018, 50402, 50789, 51179, 51572, 51967, 52365, 52766, 53170, 53577, 53988, 54402, 54819];
    GIRLS_EXP_LEVELS.common = [0, 10, 21, 32, 43, 54, 65, 76, 87, 98, 109, 120, 131, 142, 154, 166, 178, 190, 202, 214, 226, 238, 250, 262, 274, 286, 299, 312, 325, 338, 351, 364, 377, 390, 403, 416, 429, 443, 457, 471, 485, 499, 513, 527, 541, 555, 569, 584, 599, 614, 629, 644, 659, 674, 689, 704, 720, 736, 752, 768, 784, 800, 816, 832, 849, 866, 883, 900, 917, 934, 951, 968, 985, 1003, 1021, 1039, 1057, 1075, 1093, 1111, 1130, 1149, 1168, 1187, 1206, 1225, 1244, 1264, 1284, 1304, 1324, 1344, 1364, 1384, 1405, 1426, 1447, 1468, 1489, 1510, 1531, 1553, 1575, 1597, 1619, 1641, 1663, 1686, 1709, 1732, 1755, 1778, 1801, 1825, 1849, 1873, 1897, 1921, 1945, 1970, 1995, 2020, 2045, 2070, 2096, 2122, 2148, 2174, 2200, 2227, 2254, 2281, 2308, 2335, 2363, 2391, 2419, 2447, 2475, 2504, 2533, 2562, 2591, 2620, 2650, 2680, 2710, 2740, 2770, 2801, 2832, 2863, 2894, 2926, 2958, 2990, 3022, 3055, 3088, 3121, 3154, 3188, 3222, 3256, 3290, 3325, 3360, 3395, 3430, 3466, 3502, 3538, 3574, 3611, 3648, 3685, 3722, 3760, 3798, 3836, 3875, 3914, 3953, 3992, 4032, 4072, 4112, 4153, 4194, 4235, 4277, 4319, 4361, 4403, 4446, 4489, 4532, 4576, 4620, 4664, 4709, 4754, 4799, 4845, 4891, 4937, 4984, 5031, 5078, 5126, 5174, 5223, 5272, 5321, 5371, 5421, 5471, 5522, 5573, 5624, 5676, 5728, 5781, 5834, 5887, 5941, 5995, 6050, 6105, 6160, 6216, 6272, 6329, 6386, 6444, 6502, 6560, 6619, 6678, 6738, 6798, 6859, 6920, 6981, 7043, 7105, 7168, 7231, 7295, 7359, 7424, 7489, 7555, 7621, 7688, 7755, 7823, 7891, 7960, 8029, 8099, 8169, 8240, 8311, 8383, 8455, 8528, 8601, 8675, 8750, 8825, 8901, 8977, 9054, 9131, 9209, 9288, 9367, 9447, 9527, 9608, 9690, 9772, 9855, 9938, 10022, 10107, 10192, 10278, 10365, 10452, 10540, 10628, 10717, 10807, 10897, 10988, 11080, 11172, 11265, 11359, 11454, 11549, 11645, 11742, 11839, 11937, 12036, 12136, 12236, 12337, 12439, 12542, 12645, 12749, 12854, 12960, 13067, 13174, 13282, 13391, 13501, 13612, 13723, 13835, 13948, 14062, 14177, 14293, 14409, 14526, 14644, 14763, 14883, 15004, 15126, 15249, 15373, 15498, 15623, 15749, 15876, 16004, 16133, 16263, 16394, 16526, 16659, 16793, 16928, 17064, 17201, 17339, 17478, 17618, 17759, 17901, 18044, 18189, 18335, 18482, 18630, 18779, 18929, 19080, 19232, 19385, 19540, 19696, 19853, 20011, 20170, 20330, 20492, 20655, 20819, 20984, 21151, 21319, 21488, 21658, 21830, 22003, 22177, 22352, 22529, 22707, 22886, 23067, 23249, 23432, 23617, 23803, 23991, 24180, 24370, 24562, 24755, 24950, 25146, 25344, 25543, 25744, 25946, 26150, 26355, 26562, 26770, 26980, 27191, 27404, 27619, 27835, 28053, 28272, 28493, 28716, 28940, 29166, 29394, 29623, 29854, 30087, 30322, 30558, 30796, 31036, 31278, 31522, 31767, 32014, 32263, 32514, 32767, 33022, 33279, 33537, 33797, 34059, 34323, 34589, 34857, 35127, 35399, 35673, 35949, 36228, 36509, 36792, 37077, 37364, 37653, 37944, 38237, 38533, 38831, 39131, 39433, 39738, 40045, 40354, 40665, 40979, 41295, 41614, 41935, 42258, 42584, 42912, 43243, 43576, 43912, 44250, 44591, 44934, 45280, 45628, 45979, 46333, 46689, 47048, 47410, 47774, 48141, 48511, 48884, 49259, 49637, 50018, 50402, 50789, 51179, 51572, 51967, 52365, 52766, 53170, 53577, 53988, 54402, 54819];
    GIRLS_EXP_LEVELS.rare = [0, 12, 25, 38, 51, 64, 77, 90, 103, 116, 129, 142, 156, 170, 184, 198, 212, 226, 240, 254, 268, 282, 297, 312, 327, 342, 357, 372, 387, 402, 417, 433, 449, 465, 481, 497, 513, 529, 545, 561, 578, 595, 612, 629, 646, 663, 680, 697, 715, 733, 751, 769, 787, 805, 823, 841, 860, 879, 898, 917, 936, 955, 974, 994, 1014, 1034, 1054, 1074, 1094, 1114, 1135, 1156, 1177, 1198, 1219, 1240, 1262, 1284, 1306, 1328, 1350, 1372, 1394, 1417, 1440, 1463, 1486, 1509, 1532, 1556, 1580, 1604, 1628, 1652, 1677, 1702, 1727, 1752, 1777, 1802, 1828, 1854, 1880, 1906, 1932, 1959, 1986, 2013, 2040, 2067, 2095, 2123, 2151, 2179, 2207, 2236, 2265, 2294, 2323, 2352, 2382, 2412, 2442, 2472, 2503, 2534, 2565, 2596, 2627, 2659, 2691, 2723, 2755, 2788, 2821, 2854, 2887, 2921, 2955, 2989, 3023, 3058, 3093, 3128, 3163, 3199, 3235, 3271, 3307, 3344, 3381, 3418, 3456, 3494, 3532, 3570, 3609, 3648, 3687, 3727, 3767, 3807, 3847, 3888, 3929, 3970, 4012, 4054, 4096, 4139, 4182, 4225, 4269, 4313, 4357, 4402, 4447, 4492, 4538, 4584, 4630, 4677, 4724, 4771, 4819, 4867, 4915, 4964, 5013, 5062, 5112, 5162, 5213, 5264, 5315, 5367, 5419, 5471, 5524, 5577, 5631, 5685, 5739, 5794, 5849, 5905, 5961, 6017, 6074, 6131, 6189, 6247, 6306, 6365, 6424, 6484, 6544, 6605, 6666, 6728, 6790, 6853, 6916, 6980, 7044, 7108, 7173, 7238, 7304, 7370, 7437, 7504, 7572, 7640, 7709, 7778, 7848, 7918, 7989, 8061, 8133, 8206, 8279, 8353, 8427, 8502, 8577, 8653, 8729, 8806, 8884, 8962, 9041, 9120, 9200, 9281, 9362, 9444, 9526, 9609, 9693, 9777, 9862, 9947, 10033, 10120, 10207, 10295, 10384, 10473, 10563, 10654, 10745, 10837, 10930, 11023, 11117, 11212, 11308, 11404, 11501, 11599, 11697, 11796, 11896, 11997, 12098, 12200, 12303, 12407, 12511, 12616, 12722, 12829, 12937, 13045, 13154, 13264, 13375, 13487, 13600, 13713, 13827, 13942, 14058, 14175, 14293, 14412, 14531, 14651, 14772, 14894, 15017, 15141, 15266, 15392, 15519, 15647, 15776, 15906, 16037, 16169, 16302, 16436, 16571, 16707, 16844, 16982, 17121, 17261, 17402, 17544, 17687, 17831, 17976, 18122, 18269, 18417, 18566, 18716, 18868, 19021, 19175, 19330, 19486, 19643, 19802, 19962, 20123, 20285, 20448, 20613, 20779, 20946, 21114, 21284, 21455, 21627, 21800, 21975, 22151, 22328, 22507, 22687, 22868, 23051, 23235, 23420, 23607, 23795, 23985, 24176, 24368, 24562, 24757, 24954, 25152, 25352, 25553, 25756, 25960, 26166, 26373, 26582, 26792, 27004, 27218, 27433, 27650, 27868, 28088, 28310, 28533, 28758, 28985, 29213, 29443, 29675, 29909, 30144, 30381, 30620, 30861, 31103, 31347, 31593, 31841, 32091, 32343, 32597, 32852, 33109, 33368, 33629, 33892, 34157, 34424, 34693, 34964, 35237, 35512, 35789, 36068, 36349, 36633, 36919, 37207, 37497, 37789, 38083, 38380, 38679, 38980, 39283, 39588, 39896, 40206, 40518, 40833, 41150, 41469, 41791, 42115, 42442, 42771, 43103, 43437, 43774, 44113, 44455, 44799, 45146, 45495, 45847, 46202, 46559, 46919, 47282, 47647, 48015, 48386, 48760, 49136, 49515, 49897, 50282, 50670, 51061, 51455, 51852, 52252, 52655, 53061, 53470, 53882, 54297, 54715, 55136, 55560, 55987, 56418, 56852, 57289, 57729, 58173, 58620, 59070, 59524, 59981, 60442, 60906, 61373, 61844, 62318, 62796, 63278, 63763, 64252, 64745, 65241, 65741];
    GIRLS_EXP_LEVELS.epic = [0, 14, 29, 44, 59, 74, 89, 104, 119, 134, 149, 165, 181, 197, 213, 229, 245, 261, 277, 294, 311, 328, 345, 362, 379, 396, 413, 431, 449, 467, 485, 503, 521, 539, 557, 576, 595, 614, 633, 652, 671, 690, 710, 730, 750, 770, 790, 810, 830, 851, 872, 893, 914, 935, 956, 977, 999, 1021, 1043, 1065, 1087, 1109, 1132, 1155, 1178, 1201, 1224, 1247, 1271, 1295, 1319, 1343, 1367, 1391, 1416, 1441, 1466, 1491, 1516, 1542, 1568, 1594, 1620, 1646, 1673, 1700, 1727, 1754, 1781, 1809, 1837, 1865, 1893, 1921, 1950, 1979, 2008, 2037, 2066, 2096, 2126, 2156, 2186, 2217, 2248, 2279, 2310, 2341, 2373, 2405, 2437, 2469, 2502, 2535, 2568, 2601, 2635, 2669, 2703, 2737, 2772, 2807, 2842, 2877, 2913, 2949, 2985, 3021, 3058, 3095, 3132, 3169, 3207, 3245, 3283, 3322, 3361, 3400, 3439, 3479, 3519, 3559, 3600, 3641, 3682, 3724, 3766, 3808, 3850, 3893, 3936, 3979, 4023, 4067, 4111, 4156, 4201, 4246, 4292, 4338, 4384, 4431, 4478, 4525, 4573, 4621, 4670, 4719, 4768, 4818, 4868, 4918, 4969, 5020, 5071, 5123, 5175, 5228, 5281, 5334, 5388, 5442, 5497, 5552, 5607, 5663, 5719, 5776, 5833, 5891, 5949, 6007, 6066, 6125, 6185, 6245, 6306, 6367, 6429, 6491, 6553, 6616, 6679, 6743, 6807, 6872, 6937, 7003, 7069, 7136, 7203, 7271, 7339, 7408, 7477, 7547, 7617, 7688, 7759, 7831, 7903, 7976, 8049, 8123, 8198, 8273, 8349, 8425, 8502, 8579, 8657, 8736, 8815, 8895, 8975, 9056, 9138, 9220, 9303, 9386, 9470, 9555, 9640, 9726, 9813, 9900, 9988, 10076, 10165, 10255, 10345, 10436, 10528, 10621, 10714, 10808, 10903, 10998, 11094, 11191, 11288, 11386, 11485, 11585, 11685, 11786, 11888, 11991, 12094, 12198, 12303, 12409, 12516, 12623, 12731, 12840, 12950, 13061, 13172, 13284, 13397, 13511, 13626, 13742, 13859, 13976, 14094, 14213, 14333, 14454, 14576, 14699, 14823, 14948, 15074, 15200, 15327, 15455, 15584, 15714, 15845, 15977, 16110, 16244, 16379, 16515, 16652, 16790, 16929, 17069, 17210, 17352, 17496, 17641, 17787, 17934, 18082, 18231, 18381, 18532, 18684, 18837, 18992, 19148, 19305, 19463, 19622, 19782, 19944, 20107, 20271, 20436, 20603, 20771, 20940, 21110, 21282, 21455, 21629, 21804, 21981, 22159, 22338, 22519, 22701, 22884, 23069, 23255, 23443, 23632, 23822, 24014, 24207, 24402, 24598, 24796, 24995, 25196, 25398, 25602, 25807, 26014, 26222, 26432, 26643, 26856, 27071, 27287, 27505, 27724, 27945, 28168, 28392, 28618, 28846, 29075, 29306, 29539, 29774, 30010, 30248, 30488, 30730, 30974, 31219, 31466, 31715, 31966, 32219, 32474, 32731, 32990, 33250, 33512, 33776, 34042, 34310, 34580, 34852, 35126, 35402, 35681, 35962, 36245, 36530, 36817, 37106, 37397, 37690, 37986, 38284, 38584, 38886, 39191, 39498, 39807, 40119, 40433, 40749, 41068, 41389, 41712, 42038, 42366, 42697, 43030, 43366, 43704, 44045, 44388, 44734, 45082, 45433, 45787, 46143, 46502, 46864, 47228, 47595, 47965, 48338, 48713, 49091, 49472, 49856, 50243, 50633, 51026, 51422, 51821, 52223, 52628, 53036, 53447, 53861, 54278, 54698, 55121, 55547, 55976, 56409, 56845, 57284, 57726, 58172, 58621, 59073, 59529, 59988, 60451, 60917, 61387, 61860, 62337, 62817, 63301, 63789, 64280, 64775, 65274, 65776, 66282, 66792, 67306, 67823, 68344, 68869, 69398, 69931, 70468, 71009, 71554, 72103, 72656, 73214, 73776, 74342, 74912, 75487, 76066, 76649];
    GIRLS_EXP_LEVELS.legendary = [0, 16, 33, 50, 67, 84, 101, 118, 135, 152, 170, 188, 206, 224, 242, 260, 278, 297, 316, 335, 354, 373, 392, 411, 431, 451, 471, 491, 511, 531, 551, 572, 593, 614, 635, 656, 677, 698, 720, 742, 764, 786, 808, 830, 853, 876, 899, 922, 945, 968, 992, 1016, 1040, 1064, 1088, 1112, 1137, 1162, 1187, 1212, 1237, 1263, 1289, 1315, 1341, 1367, 1394, 1421, 1448, 1475, 1502, 1529, 1557, 1585, 1613, 1641, 1670, 1699, 1728, 1757, 1786, 1816, 1846, 1876, 1906, 1936, 1967, 1998, 2029, 2060, 2092, 2124, 2156, 2188, 2221, 2254, 2287, 2320, 2354, 2388, 2422, 2456, 2491, 2526, 2561, 2596, 2632, 2668, 2704, 2740, 2777, 2814, 2851, 2888, 2926, 2964, 3002, 3041, 3080, 3119, 3158, 3198, 3238, 3278, 3319, 3360, 3401, 3443, 3485, 3527, 3569, 3612, 3655, 3698, 3742, 3786, 3830, 3875, 3920, 3965, 4011, 4057, 4103, 4150, 4197, 4244, 4292, 4340, 4388, 4437, 4486, 4536, 4586, 4636, 4687, 4738, 4789, 4841, 4893, 4946, 4999, 5052, 5106, 5160, 5215, 5270, 5325, 5381, 5437, 5494, 5551, 5608, 5666, 5724, 5783, 5842, 5902, 5962, 6023, 6084, 6145, 6207, 6269, 6332, 6395, 6459, 6523, 6588, 6653, 6719, 6785, 6852, 6919, 6987, 7055, 7124, 7193, 7263, 7333, 7404, 7475, 7547, 7619, 7692, 7765, 7839, 7914, 7989, 8065, 8141, 8218, 8295, 8373, 8451, 8530, 8610, 8690, 8771, 8852, 8934, 9017, 9100, 9184, 9269, 9354, 9440, 9526, 9613, 9701, 9789, 9878, 9968, 10058, 10149, 10241, 10333, 10426, 10520, 10615, 10710, 10806, 10903, 11000, 11098, 11197, 11297, 11397, 11498, 11600, 11703, 11806, 11910, 12015, 12121, 12227, 12334, 12442, 12551, 12661, 12771, 12882, 12994, 13107, 13221, 13336, 13452, 13568, 13685, 13803, 13922, 14042, 14163, 14285, 14408, 14532, 14656, 14781, 14907, 15034, 15162, 15291, 15421, 15552, 15684, 15817, 15951, 16086, 16222, 16359, 16497, 16636, 16776, 16917, 17059, 17202, 17346, 17492, 17639, 17787, 17936, 18086, 18237, 18389, 18542, 18696, 18852, 19009, 19167, 19326, 19486, 19648, 19811, 19975, 20140, 20306, 20474, 20643, 20813, 20984, 21157, 21331, 21506, 21683, 21861, 22040, 22221, 22403, 22586, 22771, 22957, 23144, 23333, 23523, 23715, 23908, 24103, 24299, 24496, 24695, 24895, 25097, 25300, 25505, 25712, 25920, 26130, 26341, 26554, 26768, 26984, 27202, 27421, 27642, 27865, 28089, 28315, 28543, 28772, 29003, 29236, 29470, 29706, 29944, 30184, 30426, 30669, 30914, 31161, 31410, 31661, 31914, 32168, 32424, 32682, 32942, 33204, 33468, 33734, 34002, 34272, 34544, 34818, 35094, 35372, 35652, 35934, 36219, 36506, 36795, 37086, 37379, 37674, 37972, 38272, 38574, 38878, 39185, 39494, 39805, 40119, 40435, 40753, 41074, 41397, 41722, 42050, 42380, 42713, 43048, 43386, 43726, 44069, 44415, 44763, 45114, 45467, 45823, 46182, 46543, 46907, 47274, 47644, 48016, 48391, 48769, 49150, 49534, 49920, 50309, 50701, 51096, 51494, 51895, 52299, 52706, 53116, 53529, 53945, 54364, 54787, 55213, 55642, 56074, 56509, 56948, 57390, 57835, 58284, 58736, 59191, 59650, 60112, 60578, 61047, 61520, 61996, 62476, 62959, 63446, 63937, 64431, 64929, 65431, 65937, 66446, 66959, 67476, 67997, 68522, 69051, 69584, 70121, 70662, 71207, 71756, 72309, 72866, 73427, 73992, 74562, 75136, 75714, 76297, 76884, 77475, 78071, 78671, 79276, 79885, 80499, 81117, 81740, 82368, 83000, 83637, 84279, 84926, 85578, 86235, 86896, 87562];
    GIRLS_EXP_LEVELS.mythic = [0, 40, 81, 122, 163, 205, 247, 289, 332, 375, 418, 462, 506, 550, 595, 640, 685, 731, 777, 823, 870, 917, 964, 1012, 1060, 1108, 1157, 1206, 1255, 1305, 1355, 1406, 1457, 1508, 1560, 1612, 1664, 1717, 1770, 1824, 1878, 1932, 1987, 2042, 2098, 2154, 2210, 2267, 2324, 2382, 2440, 2499, 2558, 2617, 2677, 2737, 2798, 2859, 2921, 2983, 3046, 3109, 3173, 3237, 3302, 3367, 3433, 3499, 3565, 3632, 3699, 3767, 3835, 3904, 3974, 4044, 4115, 4186, 4258, 4330, 4403, 4476, 4550, 4624, 4699, 4774, 4850, 4927, 5004, 5082, 5160, 5239, 5318, 5398, 5479, 5560, 5642, 5724, 5807, 5891, 5975, 6060, 6146, 6232, 6319, 6407, 6495, 6584, 6673, 6763, 6854, 6945, 7037, 7130, 7224, 7318, 7413, 7509, 7605, 7702, 7800, 7899, 7998, 8098, 8199, 8301, 8403, 8506, 8610, 8715, 8820, 8926, 9033, 9141, 9250, 9359, 9469, 9580, 9692, 9805, 9919, 10033, 10148, 10264, 10381, 10499, 10618, 10738, 10858, 10979, 11101, 11224, 11348, 11473, 11599, 11726, 11854, 11983, 12113, 12244, 12376, 12509, 12643, 12778, 12914, 13051, 13189, 13328, 13468, 13609, 13751, 13894, 14038, 14183, 14329, 14476, 14624, 14774, 14925, 15077, 15230, 15384, 15539, 15695, 15853, 16012, 16172, 16333, 16495, 16658, 16823, 16989, 17156, 17324, 17494, 17665, 17837, 18011, 18186, 18362, 18539, 18718, 18898, 19079, 19262, 19446, 19632, 19819, 20007, 20197, 20388, 20581, 20775, 20970, 21167, 21365, 21565, 21766, 21969, 22173, 22379, 22587, 22796, 23007, 23219, 23433, 23648, 23865, 24084, 24304, 24526, 24750, 24975, 25202, 25431, 25661, 25893, 26127, 26363, 26600, 26839, 27080, 27323, 27567, 27813, 28061, 28311, 28563, 28817, 29073, 29331, 29591, 29852, 30115, 30380, 30647, 30916, 31187, 31460, 31735, 32013, 32293, 32575, 32859, 33145, 33433, 33723, 34015, 34310, 34607, 34906, 35207, 35511, 35817, 36125, 36435, 36748, 37063, 37380, 37700, 38022, 38347, 38674, 39003, 39335, 39669, 40006, 40345, 40687, 41032, 41379, 41729, 42081, 42436, 42794, 43154, 43517, 43883, 44251, 44622, 44996, 45373, 45753, 46136, 46521, 46909, 47300, 47694, 48091, 48491, 48894, 49300, 49709, 50121, 50536, 50954, 51375, 51800, 52228, 52659, 53093, 53530, 53971, 54415, 54862, 55313, 55767, 56225, 56686, 57150, 57618, 58089, 58564, 59042, 59524, 60010, 60499, 60992, 61489, 61989, 62493, 63001, 63513, 64029, 64548, 65071, 65598, 66129, 66664, 67203, 67746, 68293, 68844, 69400, 69960, 70524, 71092, 71664, 72241, 72822, 73407, 73997, 74591, 75190, 75793, 76401, 77013, 77630, 78251, 78877, 79508, 80143, 80783, 81428, 82078, 82733, 83393, 84058, 84728, 85403, 86083, 86768, 87458, 88153, 88853, 89558, 90269, 90985, 91706, 92433, 93165, 93903, 94646, 95395, 96149, 96909, 97675, 98447, 99224, 100007, 100796, 101591, 102392, 103199, 104012, 104831, 105656, 106487, 107325, 108169, 109019, 109876, 110739, 111609, 112485, 113368, 114257, 115153, 116056, 116965, 117881, 118804, 119734, 120671, 121615, 122566, 123524, 124489, 125462, 126442, 127429, 128424, 129426, 130436, 131453, 132478, 133510, 134550, 135598, 136654, 137718, 138790, 139870, 140958, 142054, 143158, 144271, 145392, 146521, 147659, 148805, 149960, 151123, 152295, 153476, 154666, 155865, 157073, 158290, 159516, 160751, 161995, 163249, 164512, 165785, 167067, 168359, 169660, 170971, 172292, 173623, 174964, 176315, 177676, 179047, 180429, 181821, 183223, 184636, 186059, 187493, 188938, 190394, 191861, 193339, 194828, 196328, 197839, 199361, 200895, 202440, 203997, 205566, 207146, 208738, 210342, 211958, 213586, 215227, 216880];
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
    if (isJSON(sessionStorage.HHAuto_Temp_LeagueSavedData))
    {
        let leagueSavedData = JSON.parse(sessionStorage.HHAuto_Temp_LeagueSavedData);
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

function moduleShopActions()
{
    appendMenuSell();
    appendMenuAff();
    appendMenuExp();
    appendMenuRemoveMaxed();
    //appendSimFight();


    function getShopType()
    {
        const shopSelected = $('section #shops #shops_left #type_item .selected');
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
                '<div>'+getTextForUI("name","elementText")+' : </div>'+
                '<div id="simResultName">Long User Name</div>'+
                '<div>'+getTextForUI("simResultMarketPreviousScore","elementText")+'</div>'+
                '<div id="simResultPreviousScore">'+getTextForUI("none","elementText")+'</div>'+
                '<div>'+getTextForUI("simResultMarketScore","elementText")+'</div>'+
                '<div id="simResultScore">'+getTextForUI("none","elementText")+'</div>'+
                '<div id="buttonSimResultMarket" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("SimResultMarketButton","tooltip")+'</span>'+getTextForUI("SimResultMarketButton","elementText")+'</div>'+
                '</div>';
            //$('#simResult')[0].outerHTML = 	labelSimFight;
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

    function appendMenuRemoveMaxed()
    {
        const menuID = "menuRemoveMaxed"

        var menuRemoveMaxed = '<div style="position: absolute;right:0px;top: -10px;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI(menuID,"tooltip")+'</span><label style="width:80px;text-align: center;" class="myButton" id='+menuID+'>'+getTextForUI(menuID,"elementText")+'</label></div>'

        if (getShopType() !== "potion" && getShopType() !== "gift")
        {

            if (document.getElementById(menuID) !== null)
            {
                try
                {
                    const GMMenuID = GM_registerMenuCommand(getTextForUI(menuID,"elementText"), removeMaxedGirls);
                    document.getElementById(menuID).remove();
                    GM_unregisterMenuCommand(GMMenuID);
                }
                catch(e)
                {
                    logHHAuto("Catched error : Couldn't remove "+menuID+" menu : "+e);
                }
            }
            return;
        }
        else
        {

            if (document.getElementById(menuID) === null)
            {
                $('section #shops #shops_right #girls_list').append(menuRemoveMaxed);
                GM_registerMenuCommand(getTextForUI(menuID,"elementText"), removeMaxedGirls);
            }
            else
            {
                return;
            }
        }

        function removeMaxedGirls()
        {
            let count=0;
            let girlzQuery="div.girl-ico[id_girl][data-g]";
            let girlNb=Number($(girlzQuery).length);
            let shopType = $('section #shops #shops_left #type_item .selected').attr("type");
            $(girlzQuery).each(function ()
                               {
                let dataG = $(this).data("g");
                if
                    (
                        (
                            shopType === "gift"
                            &&
                            (
                                dataG.can_upgrade
                                || dataG.Affection.maxed
                            )
                        )
                        ||
                        (
                            shopType === "potion"
                            &&
                            (
                                dataG.Xp.maxed
                            )
                        )
                    )
                {
                    this.remove();
                    count++;
                }
            });
            $(getHHScriptVars("shopGirlCountRequest"))[0].innerText = girlNb-count;
            $(getHHScriptVars("shopGirlCurrentRequest"))[0].innerText=1;
        }

        document.getElementById(menuID).addEventListener("click", removeMaxedGirls);
    }

    function findSubsetsPartition(inTotal, inSets)
    {
        let arr = [];
        var max = 0;
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

        while( result.total !== inTotal && inTotal>1)
        {
            //console.log("result : "+result,"inTotal : "+inTotal);
            inTotal -=1;
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

    function appendMenuAff()
    {

        const menuID = "AffDialog";
        const menuAff = '<div style="position: absolute;right: 50px;top: -10px;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuAff","tooltip")+'</span><label style="width:100px" class="myButton" id="menuAff">'+getTextForUI("menuAff","elementText")+'</label></div>'
        + '<dialog style="min-width: 50%;margin-top: 7%;margin-left: 1%;" id="AffDialog"><form stylemethod="dialog">'
        +  '<div style="justify-content: space-between;align-items: flex-start;"class="HHMenuRow">'
        +   '<div id="menuAff-moveLeft"></div>'
        +   '<div style="padding:10px; display:flex;flex-direction:column;">'
        +    '<p id="menuAffText"></p>'
        +    '<p ></p>'
        +    '<div class="HHMenuRow" style="padding:10px;justify-content:center">'
        +     '<div>'+getTextForUI("autoGiveAff","elementText")+'</div>'
        +     '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoGiveAff","tooltip")+'</span><input id="autoGiveAff" type="checkbox"></div>'
        +    '</div>'
        +    '<div style="padding:10px;justify-content:center" class="HHMenuRow">'
        +     '<div id="menuAffHide" style="display:none">'
        +      '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuAffButton","tooltip")+'</span><label style="width:80px" class="myButton" id="menuAffButton">'+getTextForUI("menuAffButton","elementText")+'</label></div>'
        +     '</div>'
        +     '<div><label style="margin-left:10px;width:80px" class="myButton" id="menuAffCancel">'+getTextForUI("OptionCancel","elementText")+'</label></div>'
        +    '</div>'
        +   '</div>'
        +   '<div id="menuAff-moveRight"></div>'
        +  '</div>'
        + '</form></dialog>'
        let getSelectGirlID;
        let girl;
        let giftArray = {};
        let AffToGive;
        let canGiveAff = false;
        if ( getShopType() !== "gift")
        {

            if (document.getElementById(menuID) !== null)
            {
                try
                {
                    const GMMenuID = GM_registerMenuCommand(getTextForUI("menuAff","elementText"), function(){});
                    document.getElementById("menuAff").remove();
                    document.getElementById(menuID).remove();
                    GM_unregisterMenuCommand(GMMenuID);
                }
                catch(e)
                {
                    logHHAuto("Catched error : Couldn't remove "+menuID+" menu : "+e);
                }
            }
            return;
        }
        else
        {
            if (document.getElementById(menuID) === null)
            {
                initAffMenu();
                GM_registerMenuCommand(getTextForUI("menuAff","elementText"), displayPopUpAff);
            }
            else
            {
                return;
            }
        }

        function initAffMenu()
        {

            $('#inventory > div.gift > label').append(menuAff);
            GM_addStyle('#menuAff-moveRight, #menuAff-moveLeft {'
                        + 'width: 0;'
                        + 'float: left;'
                        + 'border: 20px solid transparent;'
                        + 'height: 0;'
                        + 'opacity: 0.5;'
                        + 'margin:-1px;}');

            GM_addStyle('div#menuAff-moveLeft {'
                        + 'border-right-color: blue;}');

            GM_addStyle('div#menuAff-moveRight {'
                        + 'border-left-color: blue;}');

            document.getElementById("menuAff-moveLeft").addEventListener("click", moveLeftAff);
            document.getElementById("menuAff-moveRight").addEventListener("click", moveRightAff);

            document.getElementById("menuAff").addEventListener("click", displayPopUpAff);
            document.getElementById("autoGiveAff").addEventListener('change', function()
                                                                    {
                if (this.checked)
                {
                    giveAffAutoNext();
                }
            });
            document.getElementById("menuAffButton").addEventListener("click", launchGiveAff);
            document.getElementById("menuAffCancel").addEventListener("click", function(){

                if (typeof AffDialog.showModal === "function")
                {
                    document.getElementById("autoGiveAff").checked = false;
                    AffDialog.close();
                    document.removeEventListener('keyup', KeyUpAff, false);
                }
                else
                {
                    alert("The <dialog> API is not supported by this browser");
                }
            });
        }
        function KeyUpAff(evt)
        {
            if (evt.key === 'Enter')
            {
                launchGiveAff();
            }
            else if (evt.keyCode == '37')
            {
                // left arrow
                moveLeftAff();
            }
            else if (evt.keyCode == '39')
            {
                // right arrow
                moveRightAff();
            }
        }
        function displayPopUpAff()
        {
            calculateAffSelectedGirl();
            document.removeEventListener('keyup', KeyUpAff, false);
            document.addEventListener('keyup', KeyUpAff, false);
            giveAffAutoNext();
        }
        function moveLeftAff()
        {
            $('div.g1 span[nav="left"]').click();
            calculateAffSelectedGirl();
        }
        function moveRightAff()
        {
            $('div.g1 span[nav="right"]').click();
            calculateAffSelectedGirl();
        }
        function launchGiveAff()
        {
            document.getElementById("menuAff-moveLeft").style.visibility = "hidden";
            document.getElementById("menuAff-moveRight").style.visibility = "hidden";
            giveAff(getSelectGirlID, AffToGive, giftArray);
        }
        function calculateAffSelectedGirl()
        {
            girl=$('div.girl-ico:not(.not-selected)');
            getSelectGirlID=girl.attr("id_girl");
            let selectedGirl=girl.data("g");
            //console.log(getSelectGirlID,$('.bar-wrap.upgrade.button_glow[rel="aff"]', girl).length >0 || $('.bar-wrap.maxed[rel="aff"]', girl).length >0);
            document.getElementById("menuAffHide").style.display = "none";
            if (
                $('.bar-wrap.upgrade.button_glow[rel="aff"]', girl).length >0
                || $('.bar-wrap.maxed[rel="aff"]', girl).length >0
            )
            {
                if (typeof AffDialog.showModal === "function")
                {
                    document.getElementById("menuAffText").innerHTML = selectedGirl.name+" "+getTextForUI("menuAffNoNeed","elementText");
                    document.getElementById("menuAffHide").style.display = "none";
                    if (!document.getElementById("AffDialog").open)
                    {
                        AffDialog.showModal();

                    }
                }
                else
                {
                    alert("The <dialog> API is not supported by this browser");
                }
                return;
            }

            let selectedGirlAff=selectedGirl.Affection.cur;
            giftArray = {};
            let giftCount = {};
            let minAffItem=99999;
            let totalAff=0;
            let menuText="";
            $('div.gift div.inventory_slots div[id_item][data-d]').each(function()
                                                                        {
                let data=JSON.parse($(this).attr("data-d"));
                let countGift=Number($('div.gift div.inventory_slots div[id_item='+$(this).attr("id_item")+'][data-d] .stack_num span')[0].innerHTML.replace(/[^0-9]/gi, ''))
                if (data.rarity === "mythic")
                {
                    return;
                }
                if (minAffItem > Number(data.value))
                {
                    minAffItem = Number(data.value);
                }
                giftCount[Number(data.value)]=countGift;
                totalAff+=Number(data.value)*countGift
                giftArray[Number(data.value)]=$(this).attr("id_item");
            });
            if (Number(selectedGirl.Affection.cur) < Number(selectedGirl.Affection.max) && totalAff > 0 && (Number(selectedGirl.Affection.max)-Number(selectedGirl.Affection.cur)) >=minAffItem)
            {
                let AffMissing = Number(selectedGirl.Affection.max)-Number(selectedGirl.Affection.cur);
                AffToGive=findSubsetsPartition(AffMissing,giftCount);
                menuText = selectedGirl.name+" "+selectedGirl.Affection.cur+"/"+selectedGirl.Affection.max+"<br>"+getTextForUI("menuDistribution","elementText")+"<br>";
                let Affkeys = Object.keys(AffToGive.partitions);
                for ( var i of Affkeys )
                {
                    menuText = menuText+i+"Aff x "+AffToGive.partitions[i]+"<br>"
                }
                menuText = menuText+getTextForUI("Total","elementText")+AffToGive.total+"/"+AffMissing;
                document.getElementById("menuAffHide").style.display = "block";
                canGiveAff = true;

            }
            else if (totalAff === 0 || (Number(selectedGirl.Affection.max)-Number(selectedGirl.Affection.cur)) <=minAffItem)
            {
                menuText = getTextForUI("menuAffNoAff","elementText")+" "+selectedGirl.name;
            }
            logHHAuto(menuText)
            if (typeof AffDialog.showModal === "function")
            {
                document.getElementById("menuAffText").innerHTML = menuText;
                if (!document.getElementById("AffDialog").open)
                {
                    AffDialog.showModal();
                }

            }
            else
            {
                alert("The <dialog> API is not supported by this browser");
            }
        }

        function giveAffAutoNext()
        {
            if (!document.getElementById("autoGiveAff").checked)
            {
                return;
            }
            let girlzCount = Number($(getHHScriptVars("shopGirlCounterRequest")).text().split('/')[1]);
            let currentGirl = Number($(getHHScriptVars("shopGirlCounterRequest")).text().split('/')[0]);
            let giftNb = $('div.gift div.inventory_slots div[id_item][data-d]').length;
            if (currentGirl < girlzCount && !canGiveAff && giftNb > 0)
            {
                logHHAuto("Moving to next girl.");
                moveRightAff();
                setTimeout(giveAffAutoNext,randomInterval(300, 600));
            }
            else if ( canGiveAff && giftNb > 0)
            {
                logHHAuto("Auto give Aff.");
                launchGiveAff();
            }
            else
            {
                logHHAuto("Can't give more aff.");
                document.getElementById("autoGiveAff").checked = false;
            }

        }

        function giveAff(inGirlID, inAffToGive, inAffArray)
        {
            let girl=$('div.girl-ico:not(.not-selected)');
            let selectedGirl=girl.data("g");
            let selectedGirlAff=selectedGirl.Affection.cur;
            logHHAuto('start giving Aff to '+selectedGirl.name);
            let currentTotal = selectedGirlAff;
            let currentItem = -1;
            let inAffToGivePartitionBackup = { ...inAffToGive.partitions }
            document.getElementById("menuAffHide").style.display = "none";
            document.getElementById("menuAffText").innerHTML = selectedGirl.name+" "+selectedGirlAff+"/"+selectedGirl.Affection.max+"<br>"+getTextForUI("menuDistributed","elementText")+"<br>";

            let oldTime = new Date();

            function giveAff_func()
            {
                let newTime = new Date();
                //console.log("giveAff_func : "+Number(newTime-oldTime)+"ms");
                oldTime = newTime;
                if (!document.getElementById("AffDialog").open)
                {
                    logHHAuto('Aff Dialog closed, stopping');$
                    document.removeEventListener('keyup', KeyUpAff, false);
                    document.getElementById("autoGiveAff").checked = false;
                    return;
                }

                if ($('div[id_girl='+inGirlID+'][data-g] .bar-wrap.upgrade.button_glow').length >0)
                {
                    selectedGirlAff = currentTotal;
                }
                else
                {
                    girl=$('div.girl-ico:not(.not-selected)');
                    selectedGirl=girl.data("g");
                    selectedGirlAff=selectedGirl.Affection.cur;
                }
                //console.log(currentItem, inAffToGive.partitions[currentItem],inAffToGive.partitions,selectedGirlAff,currentTotal);

                //check if previous click has worked
                if (selectedGirlAff === currentTotal)
                {
                    //decrease count
                    if (currentItem !== -1)
                    {
                        logHHAuto('Spent one '+currentItem);
                        inAffToGive.partitions[currentItem] = inAffToGive.partitions[currentItem]-1;
                        let menuText = selectedGirl.name+" "+selectedGirlAff+"/"+selectedGirl.Affection.max+"<br>"+getTextForUI("menuDistributed","elementText")+"<br>";
                        let Affkeys = Object.keys(inAffToGivePartitionBackup);
                        let givenTotal = 0;
                        logHHAuto({log:"Remains to spend",inAffToGive:inAffToGive});
                        for ( var i of Affkeys )
                        {
                            let diff=Number(inAffToGivePartitionBackup[i]-inAffToGive.partitions[i]);
                            givenTotal += diff*Number(i);
                            if (diff >0)
                            {
                                //menuText = menuText+i+"Aff x "+diff+"<br>";
                            }
                            menuText = menuText+i+"Aff x "+diff+"/"+inAffToGivePartitionBackup[i]+"<br>";
                        }
                        menuText = menuText+getTextForUI("Total","elementText")+givenTotal+"/"+inAffToGive.total;
                        document.getElementById("menuAffText").innerHTML = menuText;

                    }
                    //select item
                    let itemKeys=Object.keys(inAffToGive.partitions);
                    currentItem = -1;
                    for ( let i of itemKeys )
                    {
                        if (inAffToGive.partitions[i] >0)
                        {
                            currentItem = i;
                        }
                    }

                    if (currentItem === -1)
                    {
                        let menuText;
                        if ($('div[id_girl='+inGirlID+'][data-g] .bar-wrap.upgrade.button_glow').length >0)
                        {
                            logHHAuto(selectedGirl.name+ " is ready to be upgrade");
                            menuText =selectedGirl.name+" "+getTextForUI("menuAffReadyToUpgrade","elementText")+"<br>"+getTextForUI("menuDistributed","elementText")+"<br>";
                        }
                        else
                        {
                            logHHAuto(selectedGirl.name+ "max aff given.");
                            menuText =getTextForUI("menuAffEnd","elementText")+" "+selectedGirl.name+"<br>"+getTextForUI("menuDistributed","elementText")+"<br>";
                        }
                        let givenTotal = 0;
                        let Affkeys = Object.keys(inAffToGivePartitionBackup);
                        for ( var i of Affkeys )
                        {
                            let diff=Number(inAffToGivePartitionBackup[i]-inAffToGive.partitions[i]);
                            givenTotal += diff*Number(i);
                            if (diff >0)
                            {
                                //menuText = menuText+i+"Aff x "+diff+"<br>";
                            }
                            menuText = menuText+i+"Aff x "+diff+"/"+inAffToGivePartitionBackup[i]+"<br>";
                        }
                        menuText = menuText+getTextForUI("Total","elementText")+givenTotal;
                        document.getElementById("menuAffText").innerHTML = menuText;
                        document.getElementById("menuAffHide").style.display = "none";
                        document.getElementById("menuAff-moveLeft").style.visibility = "visible";
                        document.getElementById("menuAff-moveRight").style.visibility = "visible";
                        canGiveAff = false;
                        giveAffAutoNext();
                    }
                    else
                    {
                        currentTotal+=Number(currentItem);
                        const currentItemSelector = 'div.gift div.inventory_slots div[id_item='+inAffArray[currentItem]+'][data-d]';
                        if ($(currentItemSelector+'.selected').length === 0 )
                        {
                            logHHAuto("selected item : "+currentItem);
                            $(currentItemSelector).click();
                            setTimeout(giveAff_func, randomInterval(400,800));
                        }
                        else
                        {
                            giveAff_func();
                        }
                    }
                    return;
                }
                else
                {
                    if (inAffArray[currentItem] === $('div.gift div.inventory_slots div[id_item][data-d].selected').attr("id_item") && inAffToGive.partitions[currentItem] >0 )
                    {
                        logHHAuto("clicked on "+currentItem);
                        $('#inventory > button.blue_text_button[rel=use]').click();
                        setTimeout(giveAff_func, randomInterval(100,200));
                        return;
                    }
                }
            }
            setTimeout(giveAff_func, randomInterval(300,600));
        }
    }


    function appendMenuExp()
    {
        const menuID = "ExpDialog";
        const menuExp = '<div style="position: absolute;right: 50px;top: -10px;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuExp","tooltip")+'</span><label style="width:100px" class="myButton" id="menuExp">'+getTextForUI("menuExp","elementText")+'</label></div>'
        + '<dialog style="width: 50%;margin-top: 7%;margin-left: 1%;" id="ExpDialog"><form stylemethod="dialog">'
        +  '<div style="justify-content: space-between;align-items: flex-start;"class="HHMenuRow">'
        +   '<div id="menuExp-moveLeft"></div>'
        +   '<div style="padding:10px; display:flex;flex-direction:column;">'
        +    '<p id="menuExpText"></p>'
        +    '<div class="HHMenuRow">'
        +     '<p>'+getTextForUI("menuExpLevel","elementText")+'</p>'
        +     '<div style="padding:10px;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuExpLevel","tooltip")+'</span><input id="menuExpLevel" style="width:50px;height:20px" required pattern="'+HHAuto_inputPattern.menuExpLevel+'" type="text" value="'+getHHVars('Hero.infos.level')+'"></div>'
        +    '</div>'
        +    '<div class="HHMenuRow" style="padding:10px;justify-content:center">'
        +     '<div>'+getTextForUI("autoGiveExp","elementText")+'</div>'
        +     '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoGiveExp","tooltip")+'</span><input id="autoGiveExp" type="checkbox"></div>'
        +    '</div>'
        +    '<div style="padding:10px;justify-content:center" class="HHMenuRow">'
        +     '<div id="menuExpHide" style="display:none">'
        +      '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuExpButton","tooltip")+'</span><label style="width:80px" class="myButton" id="menuExpButton">'+getTextForUI("menuExpButton","elementText")+'</label></div>'
        +     '</div>'
        +    '<div><label style="margin-left:10px;width:80px" class="myButton" id="menuExpCancel">'+getTextForUI("OptionCancel","elementText")+'</label></div>'
        +    '</div>'
        +   '</div>'
        +   '<div id="menuExp-moveRight"></div>'
        +  '</div>'
        + '<menu> </menu></form></dialog>'
        let canGiveEp = false;
        let getSelectGirlID;
        let potionArray = {};
        let ExpToGive;
        let canGiveExp = false;
        if ( getShopType() !== "potion")
        {

            if (document.getElementById(menuID) !== null)
            {
                try
                {
                    const GMMenuID = GM_registerMenuCommand(getTextForUI("menuExp","elementText"), function(){});
                    document.getElementById("menuExp").remove();
                    document.getElementById(menuID).remove();
                    GM_unregisterMenuCommand(GMMenuID);
                }
                catch(e)
                {
                    logHHAuto("Catched error : Couldn't remove "+menuID+" menu : "+e);
                }
            }
            return;
        }
        else
        {
            if (document.getElementById(menuID) === null)
            {
                initExpMenu();
                GM_registerMenuCommand(getTextForUI("menuExp","elementText"), displayExpMenu);
            }
            else
            {
                return;
            }
        }
        function initExpMenu()
        {
            $('#inventory > div.potion > label').append(menuExp);
            GM_addStyle('#menuExp-moveRight, #menuExp-moveLeft {'
                        + 'width: 0;'
                        + 'float: left;'
                        + 'border: 20px solid transparent;'
                        + 'height: 0;'
                        + 'opacity: 0.5;'
                        + 'margin:-1px;}');

            GM_addStyle('div#menuExp-moveLeft {'
                        + 'border-right-color: blue;}');

            GM_addStyle('div#menuExp-moveRight {'
                        + 'border-left-color: blue;}');


            document.getElementById("menuExp-moveLeft").addEventListener("click", function()
                                                                         {
                moveLeftExp();
            });
            document.getElementById("menuExp-moveRight").addEventListener("click", function()
                                                                          {
                moveRightExp();
            });
            document.getElementById("autoGiveExp").addEventListener('change', function()
                                                                    {
                if (this.checked)
                {
                    giveExpAutoNext();
                }
            });
            document.getElementById("menuExp").addEventListener("click", displayExpMenu);
            document.getElementById("menuExpLevel").addEventListener("change", function()
                                                                     {
                prepareExp();
            });
            document.getElementById("menuExpButton").addEventListener("click", function()
                                                                      {
                launchGiveExp();
            });
            document.getElementById("menuExpCancel").addEventListener("click", function(){

                if (typeof ExpDialog.showModal === "function")
                {
                    document.removeEventListener('keyup', KeyUpExp, false);
                    document.getElementById("autoGiveExp").checked = false;
                    ExpDialog.close();

                }
                else
                {
                    alert("The <dialog> API is not supported by this browser");
                }
            });
        }
        function KeyUpExp(evt)
        {
            if (evt.key === 'Enter')
            {
                launchGiveExp();
            }
            else if (evt.keyCode == '37')
            {
                // left arrow
                moveLeftExp();
            }
            else if (evt.keyCode == '39')
            {
                // right arrow
                moveRightExp();
            }
        }

        function displayExpMenu()
        {
            if (typeof ExpDialog.showModal === "function")
            {
                prepareExp();
                document.removeEventListener('keyup', KeyUpExp, false);
                document.addEventListener('keyup', KeyUpExp, false);
                ExpDialog.showModal();
                giveExpAutoNext();
            }
            else
            {
                alert("The <dialog> API is not supported by this browser");
            }
        }
        function giveExpAutoNext()
        {
            if (!document.getElementById("autoGiveExp").checked)
            {
                return;
            }
            let girlzCount = Number($(getHHScriptVars("shopGirlCounterRequest")).text().split('/')[1]);
            let currentGirl = Number($(getHHScriptVars("shopGirlCounterRequest")).text().split('/')[0]);
            let giftNb = $('div.potion div.inventory_slots div[id_item][data-d]').length;
            //console.log(currentGirl,girlzCount,giftNb);
            if (currentGirl < girlzCount && !canGiveExp && giftNb > 0)
            {
                logHHAuto("Moving to next girl.");
                moveRightExp();
                setTimeout(giveExpAutoNext,randomInterval(300, 600));
            }
            else if ( canGiveExp && giftNb > 0)
            {
                logHHAuto("Auto give Exp.");
                launchGiveExp();
            }
            else
            {
                logHHAuto("Can't give more exp.");
                document.getElementById("autoGiveExp").checked = false;
            }

        }
        function prepareExp()
        {

            let targetedLevel = Number(document.getElementById("menuExpLevel").value);

            let girl;

            girl=$('div.girl-ico:not(.not-selected)');
            getSelectGirlID=girl.attr("id_girl");
            let selectedGirl=girl.data("g");
            let selectedGirlTooltip=JSON.parse(girl.attr(getHHScriptVars('girlToolTipData')));

            let selectedGirlExp=selectedGirl.Xp.cur;
            potionArray = {};
            let potionCount = {};
            let minExpItem=99999;
            let totalExp=0;
            let menuText="";
            $('div.potion div.inventory_slots div[id_item][data-d]').each(function()
                                                                          {
                let data=JSON.parse($(this).attr("data-d"));
                if (data.rarity === "mythic")
                {
                    return;
                }
                let countpotion=Number($('div.potion div.inventory_slots div[id_item='+$(this).attr("id_item")+'][data-d] .stack_num span')[0].innerHTML.replace(/[^0-9]/gi, ''))

                if (minExpItem > Number(data.value))
                {
                    minExpItem = Number(data.value);
                }
                potionCount[Number(data.value)]=countpotion;
                totalExp+=Number(data.value)*countpotion
                potionArray[Number(data.value)]=$(this).attr("id_item");
            });
            //console.log(potionCount);
            if (totalExp > 0
                && Number(selectedGirl.Xp.level) < targetedLevel
                && Number(selectedGirl.Xp.cur) < getLevelXp(selectedGirlTooltip.rarity,targetedLevel)
                && (Number(getLevelXp(selectedGirlTooltip.rarity,targetedLevel)-Number(selectedGirl.Xp.cur)) >=minExpItem) )
            {
                let ExpMissing = Number(getLevelXp(selectedGirlTooltip.rarity,targetedLevel))-Number(selectedGirl.Xp.cur);
                ExpToGive=findSubsetsPartition(ExpMissing,potionCount);
                menuText = selectedGirl.name+" "+selectedGirl.Xp.cur+"/"+getLevelXp(selectedGirlTooltip.rarity,targetedLevel)+"<br>"+getTextForUI("menuDistribution","elementText")+"<br>";
                let Expkeys = Object.keys(ExpToGive.partitions);
                for ( var i of Expkeys )
                {
                    menuText = menuText+i+"Exp x "+ExpToGive.partitions[i]+"<br>"
                }
                menuText = menuText+getTextForUI("Total","elementText")+ExpToGive.total+"/"+ExpMissing;
                document.getElementById("menuExpHide").style.display = "block";
                canGiveExp = true;
            }
            else
            {
                menuText = getTextForUI("menuExpNoExp","elementText")+" "+selectedGirl.name;
                document.getElementById("menuExpHide").style.display = "none";
            }
            logHHAuto(menuText);
            document.getElementById("menuExpText").innerHTML = menuText;
        }
        function moveLeftExp()
        {
            $('div.g1 span[nav="left"]').click();
            prepareExp();
        }
        function moveRightExp()
        {
            $('div.g1 span[nav="right"]').click();
            prepareExp();
        }
        function launchGiveExp()
        {
            document.getElementById("menuExp-moveLeft").style.visibility = "hidden";
            document.getElementById("menuExp-moveRight").style.visibility = "hidden";
            giveExp(getSelectGirlID, ExpToGive, potionArray);

        }
        function giveExp(inGirlID, inExpToGive, inExpArray)
        {
            let girl=$('div.girl-ico:not(.not-selected)');
            let selectedGirl=girl.data("g");
            let selectedGirlExp=selectedGirl.Xp.cur;
            let selectedGirlTooltip=JSON.parse(girl.attr(getHHScriptVars('girlToolTipData')));
            let targetedLevel = Number(document.getElementById("menuExpLevel").value);
            let targetedXp = getLevelXp(selectedGirlTooltip.rarity,targetedLevel);
            logHHAuto('start giving Exp to '+selectedGirl.name);
            let currentTotal = selectedGirlExp;
            let currentItem = -1;
            let inExpToGivePartitionBackup = { ...inExpToGive.partitions }
            document.getElementById("menuExpHide").style.display = "none";
            document.getElementById("menuExpText").innerHTML = selectedGirl.name+" "+selectedGirlExp+"/"+targetedXp+"<br>"+getTextForUI("menuDistributed","elementText")+"<br>";

            let oldTime = new Date();

            function giveExp_func()
            {
                let newTime = new Date();
                //console.log("giveExp_func : "+Number(newTime-oldTime)+"ms");
                oldTime = newTime;

                if (!document.getElementById("ExpDialog").open)
                {
                    logHHAuto('Exp Dialog closed, stopping');
                    document.getElementById("autoGiveExp").checked = false;
                    document.removeEventListener('keyup', KeyUpExp, false);
                    return;
                }

                girl=$('div.girl-ico:not(.not-selected)');
                selectedGirl=girl.data("g");
                selectedGirlExp=selectedGirl.Xp.cur;

                //console.log(currentItem, inExpToGive.partitions[currentItem],inExpToGive.partitions,selectedGirlExp,currentTotal);
                //check awakening
                const awakeningCostButtonSelector = '#awakening_popup'+getHHScriptVars("selectorFilterNotDisplayNone")+' > div.awakening-container > div:nth-child(3) > button';
                const awakeningCostSelector = awakeningCostButtonSelector+' > div.action-cost';

                if ($(awakeningCostSelector).length > 0)
                {

                    const awakeningCost = $(awakeningCostSelector)[0].innerText.length>0?$(awakeningCostSelector)[0].innerText.split('/')[0]:0;
                    if (false)//awakeningCost === 0)
                    {
                        $(awakeningCostButtonSelector).click();
                        setTimeout(giveExp_func, randomInterval(400,800));
                        logHHAuto(`Auto free awakening for ${selectedGirl.name}`);
                        return;
                    }
                    else
                    {
                        const awakeningCostBank = $(awakeningCostSelector)[0].innerText.split('/')[1];
                        const awakeningCostGemSRC = $('img',$(awakeningCostButtonSelector)).attr("src");
                        const awakeningCostGemText = awakeningCostGemSRC.match(/\/([^/.]+)\.png/)[1];
                        clearInterval(giveExp_func);
                        logHHAuto(`${selectedGirl.name} needs awakening, cost : ${$(awakeningCostSelector)[0].innerText} ${awakeningCostGemText} gems`);
                        let menuText =getTextForUI("menuExpAwakeningNeeded","elementText")+$(awakeningCostSelector)[0].innerText+"<img style='width: 23px;margin-left: 5px;' src='"+awakeningCostGemSRC+"'> : "+selectedGirl.name+"<br>"+getTextForUI("menuDistributed","elementText")+"<br>";
                        canGiveExp =false;
                        document.getElementById("menuExpText").innerHTML = menuText;
                        document.getElementById("menuExpHide").style.display = "none";
                        document.getElementById("menuExp-moveLeft").style.visibility = "visible";
                        document.getElementById("menuExp-moveRight").style.visibility = "visible";
                        giveExpAutoNext();
                        return;
                    }
                }
                //check if previous click has worked
                if (selectedGirlExp === currentTotal)
                {
                    //decrease count
                    if (currentItem !== -1)
                    {
                        logHHAuto('Spent one '+currentItem);
                        inExpToGive.partitions[currentItem] = inExpToGive.partitions[currentItem]-1;
                        let menuText = selectedGirl.name+" "+selectedGirlExp+"/"+targetedXp+"<br>"+getTextForUI("menuDistributed","elementText")+"<br>";
                        let Expkeys = Object.keys(inExpToGivePartitionBackup);
                        let givenTotal = 0;
                        logHHAuto({log:"Remains to spend",inExpToGive:inExpToGive});
                        for ( var i of Expkeys )
                        {
                            let diff=Number(inExpToGivePartitionBackup[i]-inExpToGive.partitions[i]);
                            givenTotal += diff*Number(i);
                            if (diff >0)
                            {
                                //menuText = menuText+i+"Exp x "+diff+"<br>";
                            }
                            menuText = menuText+i+"Exp x "+diff+"/"+inExpToGivePartitionBackup[i]+"<br>";
                        }
                        menuText = menuText+getTextForUI("Total","elementText")+givenTotal+"/"+inExpToGive.total;
                        document.getElementById("menuExpText").innerHTML = menuText;

                    }
                    //select item
                    let itemKeys=Object.keys(inExpToGive.partitions);
                    currentItem = -1;
                    for ( let i of itemKeys )
                    {
                        if (inExpToGive.partitions[i] >0)
                        {
                            currentItem = i;
                        }
                    }


                    if (currentItem === -1)
                    {
                        clearInterval(giveExp_func);
                        let menuText;

                        logHHAuto(selectedGirl.name+ "max Exp given.");
                        menuText =getTextForUI("menuExpEnd","elementText")+" "+selectedGirl.name+"<br>"+getTextForUI("menuDistributed","elementText")+"<br>";
                        let givenTotal = 0;
                        let Expkeys = Object.keys(inExpToGivePartitionBackup);
                        for ( var i of Expkeys )
                        {
                            let diff=Number(inExpToGivePartitionBackup[i]-inExpToGive.partitions[i]);
                            givenTotal += diff*Number(i);
                            if (diff >0)
                            {
                                //menuText = menuText+i+"Exp x "+diff+"<br>";
                            }
                            menuText = menuText+i+"Exp x "+diff+"/"+inExpToGivePartitionBackup[i]+"<br>";
                        }
                        menuText = menuText+getTextForUI("Total","elementText")+givenTotal;
                        canGiveExp =false;
                        document.getElementById("menuExpText").innerHTML = menuText;
                        document.getElementById("menuExpHide").style.display = "none";
                        document.getElementById("menuExp-moveLeft").style.visibility = "visible";
                        document.getElementById("menuExp-moveRight").style.visibility = "visible";
                        giveExpAutoNext();
                    }
                    else
                    {
                        currentTotal+=Number(currentItem);
                        const currentItemSelector = 'div.potion div.inventory_slots div[id_item='+inExpArray[currentItem]+'][data-d]';
                        if ($(currentItemSelector+'.selected').length === 0 )
                        {
                            logHHAuto("selected item : "+currentItem);
                            $(currentItemSelector).click();
                            setTimeout(giveExp_func, randomInterval(400,800));
                        }
                        else
                        {
                            giveExp_func();
                        }
                    }
                    return;
                }
                else
                {
                    if (inExpArray[currentItem] === $('div.potion div.inventory_slots div[id_item][data-d].selected').attr("id_item") && inExpToGive.partitions[currentItem] >0 )
                    {
                        logHHAuto("clicked on "+currentItem);
                        $('#inventory > button.blue_text_button[rel=use]').click();
                        setTimeout(giveExp_func, randomInterval(100,200));
                        return;
                    }
                }
            }
            setTimeout(giveExp_func, randomInterval(300,600));
        }


    }

    function menuSellListItems()
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
                    +'.tItemsTdItems[itemsLockStatus="someLocked"] {color: #FFA500}' );

        let itemsCaracsNb=16;
        let itemsCaracs=[];
        for (let i=1;i<itemsCaracsNb+1;i++)
        {
            itemsCaracs.push(i)
        }

        let itemsRarity=["common", "rare", "epic", "legendary"];
        let itemsLockedStatus=["not_locked","locked"];

        let itemsTypeNb=6;
        let itemsType=[];
        for (let i=1;i<itemsTypeNb+1;i++)
        {
            itemsType.push(i)
        }

        let itemsList={};
        for (let c of itemsCaracs)
        {
            if (itemsList[c] === undefined)
            {
                itemsList[c] = {};
            }
            for( let t of itemsType)
            {
                if (itemsList[c][t] === undefined)
                {
                    itemsList[c][t] = {};
                }
                for (let r of itemsRarity)
                {
                    if (itemsList[c][t][r] === undefined)
                    {
                        itemsList[c][t][r] = {};
                    }
                    for(let l of itemsLockedStatus)
                    {
                        itemsList[c][t][r][l]=$(setSlotFilter(c,t,r,l)).length;
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
        +' <thead class="tItemsTHead">'
        +'  <tr>'
        +'   <th class="tItemsTh1">'+getTextForUI("Rarity","elementText")+'</th>'
        +'   <th class="tItemsTh1" menuSellFilter="c:*;t:*;r:'+itemsRarity[0]+'" colspan="6">'+getTextForUI("RarityCommon","elementText")+'</th>'
        +'   <th class="tItemsTh1" menuSellFilter="c:*;t:*;r:'+itemsRarity[1]+'" colspan="6">'+getTextForUI("RarityRare","elementText")+'</th>'
        +'   <th class="tItemsTh1" menuSellFilter="c:*;t:*;r:'+itemsRarity[2]+'" colspan="6">'+getTextForUI("RarityEpic","elementText")+'</th>'
        +'   <th class="tItemsTh1" menuSellFilter="c:*;t:*;r:'+itemsRarity[3]+'" colspan="6">'+getTextForUI("RarityLegendary","elementText")+'</th>'
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
            let ext="png";
            if (c === 16)
            {
                ext = "svg";
            }
            itemsListMenu +='  <tr>'
                +'   <td menuSellFilter="c:'+c+';t:*;r:*"><img style="height:20px;width:20px" src="https://hh2.hh-content.com/pictures/misc/items_icons/'+c+'.'+ext+'"></td>';
            for( let r of itemsRarity)
            {
                for (let t of itemsType)
                {
                    let total= itemsList[c][t][r][itemsLockedStatus[0]]+itemsList[c][t][r][itemsLockedStatus[1]];
                    let displayNb = itemsList[c][t][r][itemsLockedStatus[0]]+'/'+total;
                    let itemsLockStatus;
                    if (total === 0)
                    {
                        displayNb = "";
                    }
                    else
                    {
                        if (itemsList[c][t][r][itemsLockedStatus[1]] === 0)
                        {
                            //no lock
                            itemsLockStatus="noneLocked";
                        }
                        else if ( itemsList[c][t][r][itemsLockedStatus[1]] === total)
                        {
                            //all locked
                            itemsLockStatus="allLocked";
                        }
                        else
                        {
                            //some locked
                            itemsLockStatus="someLocked";
                        }
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
            let filter='#inventory .selected .inventory_slots .slot:not(.empty)';
            if (inCaracsValue !== "*" )
            {
                filter+='[data-d*="\"name_add\":\"'+inCaracsValue+'\""]';
            }
            if (inTypeValue !== "*" )
            {
                filter+='[data-d*="\"subtype\":\"'+inTypeValue+'\""]';
            }
            if (inRarityValue !== "*" )
            {
                filter+='[data-d*="\"rarity\":\"'+inRarityValue+'\""]';
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

        $('table.tItems [menuSellFilter] ').each(function()
                                                 {
            this.addEventListener("click", function()
                                  {
                let toLock = !(this.getAttribute("itemsLockStatus") === "allLocked");
                let c=this.getAttribute("menuSellFilter").split(";")[0].split(":")[1];
                let t=this.getAttribute("menuSellFilter").split(";")[1].split(":")[1];
                let r=this.getAttribute("menuSellFilter").split(";")[2].split(":")[1];
                AllLockUnlock(setSlotFilter(c,t,r,!toLock),toLock);
                if (toLock)
                {
                    $(setCellsFilter(c,t,r)).each(function()
                                                  {
                        this.setAttribute("itemsLockStatus","allLocked");
                    });
                }
                else
                {
                    $(setCellsFilter(c,t,r)).each(function()
                                                  {
                        this.setAttribute("itemsLockStatus","noneLocked");
                    });
                }
            });
        });
    }

    function AllLockUnlock(inFilter,lock)
    {
        if ($(inFilter).length >0)
        {
            $(inFilter).each(function()
                             {
                if (lock)
                {
                    this.setAttribute("menuSellLocked", "");
                    $(this).prepend('<img class="menuSellLocked" style="position:absolute;width:32px;height:32px" src="https://i.postimg.cc/PxgxrBVB/Opponent-red.png">');
                }
                else
                {
                    this.removeAttribute("menuSellLocked");
                    this.querySelector("img.menuSellLocked").remove();
                }
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
    var menuSellMaxItems = "all";
    function appendMenuSell()
    {
        let menuID = "SellDialog"

        var menuSellLock = '<div style="position: absolute;left: 70px;top: -10px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuSellLock","tooltip")+'</span><label style="width:70px" class="myButton" id="menuSellLock">'+getTextForUI("menuSellLock","elementText")+'</label></div>'
        var menuSellMaskLocked = '<div style="position: absolute;left: -5px;top: -10px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuSellMaskLocked","tooltip")+'</span><label style="width:70px" class="myButton" id="menuSellMaskLocked">'+getTextForUI("menuSellMaskLocked","elementText")+'</label></div>'
        var menuSell = '<div style="position: absolute;right: 50px;top: -10px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("menuSell","tooltip")+'</span><label style="width:70px" class="myButton" id="menuSell">'+getTextForUI("menuSell","elementText")+'</label></div>'
        + '<dialog style="overflow-y:auto;max-width:95%;max-height:95%;"id="SellDialog"><form stylemethod="dialog">'
        +  '<div style="padding:10px; display:flex;flex-direction:column;">'
        +   '<p>'+getTextForUI("menuSellText","elementText")+'</p>'
        +   '<div class="HHMenuRow">'
        +    '<p>'+getTextForUI("menuSellCurrentCount","elementText")+'</p>'
        +    '<p id="menuSellCurrentCount">0</p>'
        +   '</div>'
        +   '<div id="menuSellStop"><label style="width:80px" class="myButton" id="menuSellStop">'+getTextForUI("OptionStop","elementText")+'</label></div>'
        +   '<p ></p>'
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
        if (getShopType() !== "armor")
        {

            if (document.getElementById(menuID) !== null)
            {
                try
                {
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
        else
        {

            if (document.getElementById(menuID) === null)
            {
                initMenuSell();
                initMenuSellLock();
                initMenuSellMaskLocked();
                GM_registerMenuCommand(getTextForUI("menuSell","elementText"), displayMenuSell);
                GM_registerMenuCommand(getTextForUI("menuSellLock","elementText"), launchMenuSellLock);
                GM_registerMenuCommand(getTextForUI("menuSellMaskLocked","elementText"), launchMenuSellMaskLocked);
            }
            else
            {
                document.getElementById("menuSellCurrentCount").innerHTML = $('#inventory .selected .inventory_slots .slot:not(.empty):not([menuSellLocked])').length;
                return;
            }
        }

        function initMenuSell()
        {
            $('#inventory > div.armor > label').append(menuSell);


            document.getElementById("menuSell").addEventListener("click", displayMenuSell);
            document.getElementById("menuSellCancel").addEventListener("click", function(){

                if (typeof SellDialog.showModal === "function")
                {

                    SellDialog.close();

                }
                else
                {
                    alert("The <dialog> API is not supported by this browser");
                }
            });
            document.getElementById("menuSellStop").addEventListener("click", function(){
                this.style.display = "none";
                menuSellStop = true;
            });

            document.getElementById("menuSellButton").addEventListener("click", function()
                                                                       {
                if (Number(document.getElementById("menuSellNumber").value) >0 )
                {
                    logHHAuto("Starting selling "+Number(document.getElementById("menuSellNumber").value)+" items.");
                    sellArmorItems();
                }
            });
        }
        function displayMenuSell()
        {
            if (typeof SellDialog.showModal === "function")
            {
                menuSellMaxItems = Number(window.prompt("Max amount of inventory to load (all for no limit)",menuSellMaxItems));
                if (menuSellMaxItems !== null)
                {
                    menuSellMaxItems = menuSellMaxItems===NaN?Number.MAX_VALUE:menuSellMaxItems;
                    SellDialog.showModal();
                    fetchAllArmorItems();
                }
            }
            else
            {
                alert("The <dialog> API is not supported by this browser");
            }
        }

        function initMenuSellMaskLocked()
        {
            $('#inventory > div.armor > label').append(menuSellMaskLocked);
            document.getElementById("menuSellMaskLocked").addEventListener("click", launchMenuSellMaskLocked);
        }
        function launchMenuSellMaskLocked()
        {
            let filterText = "#inventory .selected .inventory_slots .slot[menuSellLocked]";
            if ($(filterText).length >0)
            {
                $(filterText).each(function()
                                   {
                    if(this.style.display === "none")
                    {
                        this.style.display="block";
                    }
                    else
                    {
                        this.style.display="none";
                    }
                });
            }
        }

        function initMenuSellLock()
        {
            $('#inventory > div.armor > label').append(menuSellLock);

            document.getElementById("menuSellLock").addEventListener("click", launchMenuSellLock);
        }
        function launchMenuSellLock()
        {
            let filterText = "#inventory .selected .inventory_slots .slot.selected";
            if ($(filterText).length >0)
            {
                let toLock=$(filterText)[0].getAttribute("menuSellLocked") === null;
                AllLockUnlock(filterText,toLock);
            }
        }
    }

    function fetchAllArmorItems()
    {
        //console.log(slots.armor_pack_load);
        if (slots.armor_pack_load < 0 || $('#inventory .selected .inventory_slots .slot:not(.empty)').length >= menuSellMaxItems)
        {
            document.getElementById("menuSellCurrentCount").innerHTML = $('#inventory .selected .inventory_slots .slot:not(.empty):not([menuSellLocked])').length;
            document.getElementById("menuSellHide").style.display = "block";
            menuSellListItems();
            return;
        }
        if (!document.getElementById("SellDialog").open)
        {
            logHHAuto('Sell Dialog closed, stopping');
            return;
        }
        slots.armor_pack_load++;
        hh_ajax({
            class: "Item",
            action: "armor_pack_load",
            pack: slots.armor_pack_load,
            shift: slots.load_item_shift
        }, function(data) {
            //loadingAnimation.stop();
            //$useB.prop("disabled", false);
            //$sellB.prop("disabled", false);
            //var $last = $("#inventory [tab].armor .slot").not(".empty").last();
            var last = $("#inventory [tab].armor .slot").not(".empty").last();
            $("#shops #inventory [tab].armor>.inventory_slots>div>.slot.empty").remove();
            $("#shops #inventory [tab].armor>.inventory_slots>div").find(last).after(data.html);
            //slots.slotAction.normalizeRow("armor");
            //$slots = $slots.add($("#shops #inventory [tab].armor .slot"));
            //if (data.last) slots.armor_pack_load = -100;
            dragndrop.initInventoryItemsDraggable($("#inventory > div.armor.selected > div > div > div.slot"));
            if (data.last || menuSellStop)
            {
                slots.armor_pack_load = -100;
                document.getElementById("menuSellCurrentCount").innerHTML = $('#inventory .selected .inventory_slots .slot:not(.empty):not([menuSellLocked])').length;
                document.getElementById("menuSellHide").style.display = "block";
                menuSellListItems();
            }
            else
            {
                if (document.getElementById("menuSellCurrentCount"))
                {
                    document.getElementById("menuSellCurrentCount").innerHTML = $('#inventory .selected .inventory_slots .slot:not(.empty):not([menuSellLocked])').length;
                    setTimeout(fetchAllArmorItems, randomInterval(800,1600));
                }
            }
            //if (callback) callback();
        });
    }

    function sellArmorItems()
    {
        logHHAuto('start selling not legendary stuff');
        document.getElementById("menuSellHide").style.display = "none";
        document.getElementById("menuSoldHide").style.display = "block";
        // return;
        var initialNumberOfItems = $('#inventory .selected .inventory_slots .slot:not(.empty):not([menuSellLocked])').length;
        var itemsToSell = Number(document.getElementById("menuSellNumber").value);
        document.getElementById("menuSoldCurrentCount").innerHTML = "0/"+itemsToSell;
        document.getElementById("menuSoldMessage").innerHTML ="";
        function selling_func()
        {
            if ($('#type_item > div.selected[type=armor]').length === 0)
            {
                logHHAuto('Wrong tab');
                return;
            }
            else if (!document.getElementById("SellDialog").open)
            {
                logHHAuto('Sell Dialog closed, stopping');
                return;
            }
            else
            {
                let currentNumberOfItems = $('#inventory .selected .inventory_slots .slot:not(.empty):not([menuSellLocked])').length;
                if (currentNumberOfItems === 0)
                {
                    logHHAuto('no more items for sale');
                    document.getElementById("menuSoldMessage").innerHTML = getTextForUI("menuSoldMessageNoMore","elementText");
                    menuSellListItems();
                    document.getElementById("menuSellHide").style.display = "block";
                    return;
                }
                //console.log(initialNumberOfItems,currentNumberOfItems);
                if ((initialNumberOfItems - currentNumberOfItems) < itemsToSell)
                {
                    let PlayerClass = getHHVars('Hero.infos.class') === null ? $('#equiped > div.icon.class_change_btn').attr('carac') : getHHVars('Hero.infos.class');
                    //check Selected item - can we sell it?
                    if ($('#inventory .selected .inventory_slots .selected:not([menuSellLocked])').length > 0)
                    {
                        let can_sell = false;
                        //Non legendary check
                        if ($('#inventory .selected .inventory_slots .selected:not([menuSellLocked])')[0].className.indexOf('legendary') < 0)
                        {
                            can_sell = true;

                        }
                        //Legendary but with specific className
                        else if ($('#inventory .selected .inventory_slots .selected[canBeSold]:not([menuSellLocked])').length > 0)
                        {
                            can_sell = true;
                        }
                        else
                        {
                            let CurrObj;
                            CurrObj = JSON.parse($('#inventory .selected .inventory_slots .selected:not([menuSellLocked])')[0].getAttribute('data-d'));
                            if (CurrObj.id_equip != "EQ-LE-06" && CurrObj.id_equip != "EQ-LE-0" + PlayerClass)
                            {
                                can_sell = true;
                            }
                        }
                        logHHAuto('can be sold ' + can_sell+ ' : '+ $('#inventory .selected .inventory_slots .selected:not([menuSellLocked])')[0].getAttribute('data-d'));
                        if (can_sell)
                        {
                            $('#inventory > button.green_text_button[rel=sell]').click();
                            let currSellNumber = Number((initialNumberOfItems - currentNumberOfItems) +1);
                            document.getElementById("menuSoldCurrentCount").innerHTML = currSellNumber+"/"+itemsToSell;
                            document.getElementById("menuSellCurrentCount").innerHTML = $('#inventory .selected .inventory_slots .slot:not(.empty):not([menuSellLocked])').length;
                            setTimeout(selling_func, 300);
                            return;
                        }
                    }
                    //Find new non legendary sellable items
                    if ($('#inventory .selected .inventory_slots .slot:not(.selected):not(.empty):not(.legendary):not([menuSellLocked])').length > 0)
                    {
                        //Select first non legendary item
                        $('#inventory .selected .inventory_slots .slot:not(.selected):not(.empty):not(.legendary):not([menuSellLocked])')[0].click();
                        setTimeout(selling_func, 300);
                        return;
                    }
                    else if ($('#inventory .selected .inventory_slots [canBeSold]:not([menuSellLocked])').length > 0)
                    {
                        //Select item that checked before and can be sold
                        $('#inventory .selected .inventory_slots [canBeSold]:not([menuSellLocked])')[0].click();
                        setTimeout(selling_func, randomInterval(300,500));
                        return;
                    }
                    else if ($('#inventory .selected .inventory_slots .slot:not(.selected):not(.empty):not([menuSellLocked])').length > 0)
                    {
                        let sellableslotsLegObj = $('#inventory .selected .inventory_slots .slot:not(.selected):not(.empty):not([menuSellLocked])');
                        //[MaxCarac,Index]
                        let TypesArrayPlayerClass = [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]];
                        let equipedArray = $('#equiped .armor .slot[data-d*=EQ-LE-0' + PlayerClass + ']');
                        //console.log(equipedArray,TypesArrayPlayerClass);
                        if (equipedArray.length > 0)
                        {
                            let equipedObj;
                            for (let i5 = 0; i5 < equipedArray.length; i5++)
                            {
                                equipedObj = JSON.parse($(equipedArray[i5]).attr('data-d'));
                                TypesArrayPlayerClass[equipedObj.subtype][0] = equipedObj['carac' + PlayerClass];
                            }
                        }

                        let TypesArrayRainbow = [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]];
                        equipedArray = $('#equiped .armor .slot[data-d*=EQ-LE-06]');
                        if (equipedArray.length > 0)
                        {
                            let equipedObj;
                            for (let i5 = 0; i5 < equipedArray.length; i5++)
                            {
                                equipedObj = JSON.parse($(equipedArray[i5]).attr('data-d'));
                                TypesArrayRainbow[equipedObj.subtype][0] = equipedObj['carac' + PlayerClass];
                            }
                        }

                        let TypesArrayEndurance = [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]];
                        equipedArray = $('#equiped .armor .slot[data-d*=EQ-LE-04]');
                        if (equipedArray.length > 0)
                        {
                            let equipedObj;
                            for (let i5 = 0; i5 < equipedArray.length; i5++)
                            {
                                equipedObj = JSON.parse($(equipedArray[i5]).attr('data-d'));
                                TypesArrayEndurance[equipedObj.subtype][0] = equipedObj['endurance'];
                            }
                        }

                        let TypesArrayHarmony = [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]];
                        equipedArray = $('#equiped .armor .slot[data-d*=EQ-LE-05]');
                        if (equipedArray.length > 0)
                        {
                            let equipedObj;
                            for (let i5 = 0; i5 < equipedArray.length; i5++)
                            {
                                equipedObj = JSON.parse($(equipedArray[i5]).attr('data-d'));
                                TypesArrayHarmony[equipedObj.subtype][0] = equipedObj['chance'];
                            }
                        }

                        let sellableslotsLeg = $('#inventory .selected .inventory_slots .slot:not(.empty):not([menuSellLocked])');
                        for (var i4 = 0; i4 < sellableslotsLeg.length; i4++)
                        {
                            sellableslotsLegObj = JSON.parse($(sellableslotsLeg[i4]).attr('data-d'));
                            //check item type - if not rainbow or not monocolored(NOT for player's class)
                            if (sellableslotsLegObj.id_equip !== "EQ-LE-06" && sellableslotsLegObj.id_equip !== "EQ-LE-04" && sellableslotsLegObj.id_equip !== "EQ-LE-05" &&sellableslotsLegObj.id_equip !== "EQ-LE-0" + PlayerClass)
                            {
                                //console.log('can_sell2');
                                sellableslotsLeg[i4].setAttribute('canBeSold', '');
                            }
                            else if (sellableslotsLegObj.id_equip == "EQ-LE-06")
                            {
                                //checking best gear in inventory based on best class stat
                                if (TypesArrayRainbow[sellableslotsLegObj.subtype][0] < sellableslotsLegObj['carac' + PlayerClass])
                                {
                                    TypesArrayRainbow[sellableslotsLegObj.subtype][0] = sellableslotsLegObj['carac' + PlayerClass];
                                    if (TypesArrayRainbow[sellableslotsLegObj.subtype][1] >= 0)
                                    {
                                        sellableslotsLeg[TypesArrayRainbow[sellableslotsLegObj.subtype][1]].setAttribute('canBeSold', '');
                                    }
                                    TypesArrayRainbow[sellableslotsLegObj.subtype][1] = i4;
                                }
                                else
                                {
                                    sellableslotsLeg[i4].setAttribute('canBeSold', '');
                                }
                            }
                            else if (sellableslotsLegObj.id_equip == "EQ-LE-0" + PlayerClass)
                            {
                                //checking best gear in inventory based on best class stat
                                if (TypesArrayPlayerClass[sellableslotsLegObj.subtype][0] < sellableslotsLegObj['carac' + PlayerClass])
                                {
                                    TypesArrayPlayerClass[sellableslotsLegObj.subtype][0] = sellableslotsLegObj['carac' + PlayerClass];
                                    if (TypesArrayPlayerClass[sellableslotsLegObj.subtype][1] >= 0)
                                    {
                                        sellableslotsLeg[TypesArrayPlayerClass[sellableslotsLegObj.subtype][1]].setAttribute('canBeSold', '');
                                    }
                                    TypesArrayPlayerClass[sellableslotsLegObj.subtype][1] = i4;
                                }
                                else
                                {
                                    sellableslotsLeg[i4].setAttribute('canBeSold', '');
                                }
                            }
                            else if (sellableslotsLegObj.id_equip == "EQ-LE-04")
                            {
                                //checking best gear in inventory based on best class stat
                                if (TypesArrayEndurance[sellableslotsLegObj.subtype][0] < sellableslotsLegObj['endurance'])
                                {
                                    TypesArrayEndurance[sellableslotsLegObj.subtype][0] = sellableslotsLegObj['endurance'];
                                    if (TypesArrayEndurance[sellableslotsLegObj.subtype][1] >= 0)
                                    {
                                        sellableslotsLeg[TypesArrayEndurance[sellableslotsLegObj.subtype][1]].setAttribute('canBeSold', '');
                                    }
                                    TypesArrayEndurance[sellableslotsLegObj.subtype][1] = i4;
                                }
                                else
                                {
                                    sellableslotsLeg[i4].setAttribute('canBeSold', '');
                                }
                            }
                            else if (sellableslotsLegObj.id_equip == "EQ-LE-05")
                            {
                                //checking best gear in inventory based on best class stat
                                if (TypesArrayHarmony[sellableslotsLegObj.subtype][0] < sellableslotsLegObj['chance'])
                                {
                                    TypesArrayHarmony[sellableslotsLegObj.subtype][0] = sellableslotsLegObj['chance'];
                                    if (TypesArrayHarmony[sellableslotsLegObj.subtype][1] >= 0)
                                    {
                                        sellableslotsLeg[TypesArrayHarmony[sellableslotsLegObj.subtype][1]].setAttribute('canBeSold', '');
                                    }
                                    TypesArrayHarmony[sellableslotsLegObj.subtype][1] = i4;
                                }
                                else
                                {
                                    sellableslotsLeg[i4].setAttribute('canBeSold', '');
                                }
                            }
                        }
                        if ($('#inventory .selected .inventory_slots [canBeSold]:not([menuSellLocked])').length == 0)
                        {
                            logHHAuto('no more items for sale');
                            document.getElementById("menuSoldMessage").innerHTML = getTextForUI("menuSoldMessageNoMore","elementText");
                            menuSellListItems();
                            document.getElementById("menuSellHide").style.display = "block";
                            return;
                        }
                    }
                }
                else
                {
                    logHHAuto('Reach wanted sold items.');
                    document.getElementById("menuSoldMessage").innerHTML = getTextForUI("menuSoldMessageReachNB","elementText");
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
    if (sessionStorage.HHAuto_Temp_eventsGirlz === undefined) {return}
    let eventGirlz=isJSON(sessionStorage.HHAuto_Temp_eventsGirlz)?JSON.parse(sessionStorage.HHAuto_Temp_eventsGirlz):{};

    //$("div.event-widget div.widget[style='display: block;'] div.container div.scroll-area div.rewards-block-tape div.girl_reward div.HHEventPriority").each(function(){this.remove();});
    if ( eventGirlz.length >0)
    {
        var girl;
        var prio;
        var baseQuery="#events .nc-event-container .scroll-area .nc-event-list-rewards-container .nc-event-list-reward";
        var idArray;
        var currentGirl;
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
    let eventList = isJSON(sessionStorage.HHAuto_Temp_eventsList)?JSON.parse(sessionStorage.HHAuto_Temp_eventsList):{};
    let eventsGirlz = isJSON(sessionStorage.HHAuto_Temp_eventsGirlz)?JSON.parse(sessionStorage.HHAuto_Temp_eventsGirlz):[];
    let eventGirl =isJSON(sessionStorage.HHAuto_Temp_eventGirl)?JSON.parse(sessionStorage.HHAuto_Temp_eventGirl):{};
    let hasMythic = false;
    let hasEvent = false;
    for (let prop of Object.keys(eventList))
    {
        if (
            eventList[prop]["seconds_before_end"]<new Date()
            ||
            (
                eventList[prop]["isMythic"]
                && Storage().HHAuto_Setting_plusEventMythic!=="true"
            )
            ||
            (
                !eventList[prop]["isMythic"]
                && Storage().HHAuto_Setting_plusEvent!=="true"
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
    }
    else
    {
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
            sessionStorage.HHAuto_Temp_eventsGirlz = JSON.stringify(eventsGirlz);
        }
        if (!eventList.hasOwnProperty(eventGirl.event_id) || eventGirl.event_id ===inEventID)
        {
            sessionStorage.removeItem('HHAuto_Temp_eventGirl');
        }
        sessionStorage.HHAuto_Temp_eventsList = JSON.stringify(eventList);
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

function parseEventPage(inTab="global")
{
    if(getPage() === "event" )
    {
        let queryEventTabCheck=$("#contains_all #events");
        let eventHref = $("#contains_all #events .events-list .event-title.active").attr("href");
        let parsedURL = new URL(eventHref,window.location.origin);
        let eventID = queryStringGetParam(parsedURL.search,'tab')
        if (
            !eventID.startsWith(getHHScriptVars('eventIDReg'))
            && !eventID.startsWith(getHHScriptVars('mythicEventIDReg'))
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
        let eventList = isJSON(sessionStorage.HHAuto_Temp_eventsList)?JSON.parse(sessionStorage.HHAuto_Temp_eventsList):{};
        let eventsGirlz = isJSON(sessionStorage.HHAuto_Temp_eventsGirlz)?JSON.parse(sessionStorage.HHAuto_Temp_eventsGirlz):[];
        let Priority=(Storage().HHAuto_Setting_eventTrollOrder).split(";");

        let refreshTimer = 3600;
        if (eventID.startsWith(getHHScriptVars('eventIDReg')) && Storage().HHAuto_Setting_plusEvent==="true")
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
            let allEventGirlz = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container');
            for (let currIndex = 0;currIndex<allEventGirlz.length;currIndex++)
            {
                let element = allEventGirlz[currIndex];
                let button = $('.nc-events-prize-locations-buttons-container a:not(.disabled)[href^="/troll-pre-battle.html"]', element);
                if (button.length > 0)
                {
                    eventList[eventID]["isCompleted"] = false;
                    let buttonHref = button.attr("href");
                    let girlId = element.getAttribute("data-reward-girl-id");
                    let girlName = $('.shards_bar_wrapper .shards[shards]',element).attr('name');
                    parsedURL = new URL(buttonHref,window.location.origin);
                    let TrollID = queryStringGetParam(parsedURL.search,'id_opponent');
                    let girlShards = $('.shards_bar_wrapper .shards[shards]',element).attr('shards');
                    logHHAuto("Event girl : "+girlName+" ("+girlShards+"/100) at troll "+TrollID+" priority : "+Priority.indexOf(TrollID)+" on event : ",eventID);
                    eventsGirlz.push({girl_id:girlId,troll_id:TrollID,girl_shards:girlShards,is_mythic:"false",girl_name:girlName,event_id:eventID});
                }
            }
        }
        if (eventID.startsWith(getHHScriptVars('mythicEventIDReg')) && Storage().HHAuto_Setting_plusEventMythic==="true")
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
            let allEventGirlz = $('#contains_all #events .nc-panel-body .nc-event-container .nc-event-reward-container');
            for (let currIndex = 0;currIndex<allEventGirlz.length;currIndex++)
            {
                let element = allEventGirlz[currIndex];
                let button = $('.nc-events-prize-locations-buttons-container a:not(.disabled)[href^="/troll-pre-battle.html"]', element);
                let ShardsQuery = '#events .nc-panel .nc-panel-body .nc-event-reward-container .nc-events-prize-locations-container .shards-info span.number';
                let timerQuery= '#events .nc-panel .nc-panel-body .nc-event-reward-container .nc-events-prize-locations-container .shards-info span.timer'
                if ($(ShardsQuery).length > 0 )
                {
                    let remShards=Number($(ShardsQuery)[0].innerText);
                    let nextWave=($(timerQuery).length > 0)?parseTime($(timerQuery)[0].innerText):-1;
                    if (button.length > 0)
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
                            let buttonHref = button.attr("href");
                            let girlId = element.getAttribute("data-reward-girl-id");
                            let girlName = $('.shards_bar_wrapper .shards[shards]',element).attr('name');
                            parsedURL = new URL(buttonHref,window.location.origin);
                            let TrollID = queryStringGetParam(parsedURL.search,'id_opponent');
                            let girlShards = $('.shards_bar_wrapper .shards[shards]',element).attr('shards');
                            logHHAuto("Event girl : "+girlName+" ("+girlShards+"/100) at troll "+TrollID+" priority : "+Priority.indexOf(TrollID)+" on event : ",eventID);
                            eventsGirlz.push({girl_id:girlId,troll_id:TrollID,girl_shards:girlShards,is_mythic:"true",girl_name:girlName,event_id:eventID});
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
        if(Object.keys(eventList).length >0)
        {
            sessionStorage.HHAuto_Temp_eventsList = JSON.stringify(eventList);
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
            sessionStorage.HHAuto_Temp_eventsGirlz = JSON.stringify(eventsGirlz);
            var chosenTroll = Number(eventsGirlz[0].troll_id)
            logHHAuto("ET: "+chosenTroll);
            sessionStorage.HHAuto_Temp_eventGirl=JSON.stringify(eventsGirlz[0]);
            queryEventTabCheck[0].setAttribute('parsed', 'true');
            //sessionStorage.HHAuto_Temp_EventFightsBeforeRefresh = "20000";
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
            gotoPage("event",{tab:inTab});
        }
        else
        {
            gotoPage("event");
        }
        return true;
    }
}

function checkEvent(inEventID)
{
    let eventList = isJSON(sessionStorage.HHAuto_Temp_eventsList)?JSON.parse(sessionStorage.HHAuto_Temp_eventsList):{};
    let result = false;
    let eventType = inEventID.startsWith(getHHScriptVars('mythicEventIDReg'))?"mythic":(inEventID.startsWith(getHHScriptVars('eventIDReg'))?"event":"");
    if (eventType === "mythic" && Storage().HHAuto_Setting_plusEventMythic!=="true")
    {
        return false;
    }
    if (eventType === "event" && Storage().HHAuto_Setting_plusEvent!=="true")
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
            if (eventList[inEventID]["next_refresh"]<new Date() || (eventType === "mythic" && checkTimerMustExist('eventMythicNextWave')))
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

    if (sessionStorage.HHAuto_Temp_eventGirl !== undefined && JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).girl_shards && Number.isInteger(Number(JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).girl_shards)))
    {
        if (
            (
                Storage().HHAuto_Setting_buyCombat=="true"
                && Storage().HHAuto_Setting_plusEvent==="true"
                && getSecondsLeft("eventGoing") !== 0
                && Number(Storage().HHAuto_Setting_buyCombTimer) !== NaN
                && getSecondsLeft("eventGoing") < Storage().HHAuto_Setting_buyCombTimer*3600
                && JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).is_mythic === "false"
            )
            ||
            (
                Storage().HHAuto_Setting_plusEventMythic==="true"
                && Storage().HHAuto_Setting_buyMythicCombat=="true"
                && getSecondsLeft("eventMythicGoing") !== 0
                && Number(Storage().HHAuto_Setting_buyMythicCombTimer) !== NaN
                && getSecondsLeft("eventMythicGoing") < Storage().HHAuto_Setting_buyMythicCombTimer*3600
                && JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).is_mythic === "true"
            )
        )
        {
            result.event_mythic = JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).is_mythic;
        }
        else
        {
            return result;
        }

        //console.log(result);
        remainingShards = Number(100 - Number(JSON.parse(sessionStorage.HHAuto_Temp_eventGirl).girl_shards));
        if (Storage().HHAuto_Setting_minShardsX50
            && Number.isInteger(Number(Storage().HHAuto_Setting_minShardsX50))
            && remainingShards >= Number(Storage().HHAuto_Setting_minShardsX50)
            && getHHVars('Hero.infos.hard_currency')>=pricex50+Number(Storage().HHAuto_Setting_kobanBank)
            && Storage().HHAuto_Setting_useX50Fights === "true"
            && currentFight < maxx50
            && ( result.event_mythic || Storage().HHAuto_Setting_useX50FightsAllowNormalEvent === "true")
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
                logHHAuto('Unable to recharge up to '+maxx50+' for '+pricex50+' kobans : current energy : '+currentFight+', remaining shards : '+remainingShards+'/'+Storage().HHAuto_Setting_minShardsX50+', kobans : '+getHHVars('Hero.infos.hard_currency')+'/'+Number(Storage().HHAuto_Setting_kobanBank));
            }
            if (getHHVars('Hero.infos.hard_currency')>=pricex20+Number(Storage().HHAuto_Setting_kobanBank)
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
                    logHHAuto('Unable to recharge up to '+maxx20+' for '+pricex20+' kobans : current energy : '+currentFight+', kobans : '+getHHVars('Hero.infos.hard_currency')+'/'+Number(Storage().HHAuto_Setting_kobanBank));
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
    return Storage().HHAuto_Setting_master==="true"&&(!(Storage().HHAuto_Setting_paranoia==="true") || sessionStorage.HHAuto_Temp_burst==="true");
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
    let currentStorageName = localStorage.HHAuto_Setting_settPerTab==="true"?"sessionStorage":"localStorage";
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
                dataToSave[storageName+"."+variableName] = storageItem.getItem(variableName);
            }
        }
    }
    if (extractLog)
    {
        dataToSave["sessionStorage.HHAuto_Temp_Logging"] = JSON.parse(sessionStorage.getItem('HHAuto_Temp_Logging'));
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

    if(Storage().HHAuto_Setting_showTooltips === "true")
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
    let chatVars =getHHVars("Chat_vars.CLUB_ID",false);
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
    if (isJSON(localStorage.HHAuto_Setting_saveDefaults))
    {
        let currentDefaults = JSON.parse(localStorage.HHAuto_Setting_saveDefaults);
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
    localStorage.HHAuto_Setting_saveDefaults = JSON.stringify(savedHHStoredVars);
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
            return Storage();
            break;
    }
}

function getMenuValues()
{
    if (document.getElementById("sMenu") === null)
    {
        return;
    }
    if (isHHPopUpDisplayed() === 'loadConfig') {return}

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
                //console.log(menuID,HHStoredVars[i].menuType,itemValue);
                storageItem[i] = menuValue;
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

    /*var leaguesOptions = document.getElementById("autoLeaguesSelector");
    Storage().HHAuto_Setting_autoLeaguesSelectedIndex = leaguesOptions.selectedIndex;
    sessionStorage.HHAuto_Temp_leaguesTarget = Number(leaguesOptions.value)+1;

    var trollOptions = document.getElementById("autoTrollSelector");
    Storage().HHAuto_Setting_autoTrollSelectedIndex = trollOptions.selectedIndex;
    sessionStorage.HHAuto_Temp_trollToFight = trollOptions.value;

    Storage().HHAuto_Setting_plusEvent = document.getElementById("plusEvent").checked;
    Storage().HHAuto_Setting_autoSalary = document.getElementById("autoSalary").checked;
    Storage().HHAuto_Setting_autoSalaryMinTimer = remove1000sSeparator(document.getElementById("autoSalaryMinTimer").value);
    Storage().HHAuto_Setting_autoSalaryMaxTimer = remove1000sSeparator(document.getElementById("autoSalaryMaxTimer").value);
    Storage().HHAuto_Setting_autoContest = document.getElementById("autoContest").checked;
    Storage().HHAuto_Setting_autoMission = document.getElementById("autoMission").checked;
    Storage().HHAuto_Setting_autoMissionKFirst = document.getElementById("autoMissionKFirst").checked;
    Storage().HHAuto_Setting_autoPowerPlaces = document.getElementById("autoPowerPlaces").checked;
    Storage().HHAuto_Setting_collectDailyRewards = document.getElementById("collectDailyRewards").checked;

    var newValue = String(document.getElementById("autoPowerPlacesAll").checked);
    if (Storage().HHAuto_Setting_autoPowerPlacesAll != newValue)
    {
        Storage().HHAuto_Setting_autoPowerPlacesAll = document.getElementById("autoPowerPlacesAll").checked;
        clearTimer('minPowerPlacesTime');
        cleanTempPopToStart();
    }
    newValue = String(document.getElementById("autoPowerPlacesIndexFilter").value);
    if (Storage().HHAuto_Setting_autoPowerPlacesIndexFilter != newValue)
    {
        Storage().HHAuto_Setting_autoPowerPlacesIndexFilter = document.getElementById("autoPowerPlacesIndexFilter").value;
        clearTimer('minPowerPlacesTime');
        cleanTempPopToStart();
    }

    Storage().HHAuto_Setting_autoPowerPlacesIndexFilter = document.getElementById("autoPowerPlacesIndexFilter").value;
    Storage().HHAuto_Setting_autoMissionCollect = document.getElementById("autoMissionCollect").checked;
    Storage().HHAuto_Setting_autoQuest = document.getElementById("autoQuest").checked;
    Storage().HHAuto_Setting_autoTrollBattle = document.getElementById("autoTrollBattle").checked;
    Storage().HHAuto_Setting_eventTrollOrder = document.getElementById("eventTrollOrder").value;

    Storage().HHAuto_Setting_plusEventMythic = document.getElementById("plusEventMythic").checked;
    Storage().HHAuto_Setting_autoTrollMythicByPassParanoia = document.getElementById("autoTrollMythicByPassParanoia").checked ;

    Storage().HHAuto_Setting_buyCombTimer = document.getElementById("buyCombTimer").value;
    Storage().HHAuto_Setting_buyMythicCombTimer = document.getElementById("buyMythicCombTimer").value;

    Storage().HHAuto_Setting_autoSeason = document.getElementById("autoSeason").checked;
    Storage().HHAuto_Setting_autoSeasonCollect = document.getElementById("autoSeasonCollect").checked;
    Storage().HHAuto_Setting_SeasonMaskRewards = document.getElementById("SeasonMaskRewards").checked;

    Storage().HHAuto_Setting_autoLeagues = document.getElementById("autoLeagues").checked;
    Storage().HHAuto_Setting_autoLeaguesCollect = document.getElementById("autoLeaguesCollect").checked;
    Storage().HHAuto_Setting_autoLeaguesPowerCalc = document.getElementById("autoLeaguesPowerCalc").checked;
    Storage().HHAuto_Setting_autoLeaguesAllowWinCurrent = document.getElementById("autoLeaguesAllowWinCurrent").checked;
    Storage().HHAuto_Setting_autoStats = remove1000sSeparator(document.getElementById("autoStats").value);
    Storage().HHAuto_Setting_autoStatsSwitch=document.getElementById("autoStatsSwitch").checked;
    Storage().HHAuto_Setting_paranoia = document.getElementById("paranoia").checked;
    Storage().HHAuto_Setting_paranoiaSpendsBefore = document.getElementById("paranoiaSpendsBefore").checked;
    Storage().HHAuto_Setting_autoFreePachinko = document.getElementById("autoFreePachinko").checked;
    Storage().HHAuto_Setting_autoExp = remove1000sSeparator(document.getElementById("autoExp").value);
    Storage().HHAuto_Setting_autoExpW = document.getElementById("autoExpW").checked;
    Storage().HHAuto_Setting_maxExp = remove1000sSeparator(document.getElementById("maxExp").value);
    Storage().HHAuto_Setting_autoAff = remove1000sSeparator(document.getElementById("autoAff").value);
    Storage().HHAuto_Setting_autoAffW = document.getElementById("autoAffW").checked;
    Storage().HHAuto_Setting_maxAff = remove1000sSeparator(document.getElementById("maxAff").value);
    Storage().HHAuto_Setting_autoLGM = remove1000sSeparator(document.getElementById("autoLGM").value);
    Storage().HHAuto_Setting_autoLGMW = document.getElementById("autoLGMW").checked;
    Storage().HHAuto_Setting_autoLGR = remove1000sSeparator(document.getElementById("autoLGR").value);
    Storage().HHAuto_Setting_autoLGRW = document.getElementById("autoLGRW").checked;
    Storage().HHAuto_Setting_autoBuyBoosters = document.getElementById("autoBuyBoosters").checked;
    Storage().HHAuto_Setting_autoBuyBoostersFilter = document.getElementById("autoBuyBoostersFilter").value;
    Storage().HHAuto_Setting_showMarketTools = document.getElementById("showMarketTools").checked;



    newValue = String(document.getElementById("showTooltips").checked);
    if (Storage().HHAuto_Setting_showTooltips != newValue)
    {
        Storage().HHAuto_Setting_showTooltips = document.getElementById("showTooltips").checked;
        manageToolTipsDisplay(true);
    }

    Storage().HHAuto_Setting_showCalculatePower = document.getElementById("showCalculatePower").checked;
    Storage().HHAuto_Setting_showInfo = document.getElementById("showInfo").checked;

    //Storage().HHAuto_Setting_calculatePowerLimits = document.getElementById("calculatePowerLimits").value;
    Storage().HHAuto_Setting_autoChamps = document.getElementById("autoChamps").checked;
    Storage().HHAuto_Setting_autoClubChamp = document.getElementById("autoClubChamp").checked;
    Storage().HHAuto_Setting_autoClubForceStart = document.getElementById("autoClubForceStart").checked;

    Storage().HHAuto_Setting_autoClubChampMax = document.getElementById("autoClubChampMax").value;
    Storage().HHAuto_Setting_autoChampsUseEne = document.getElementById("autoChampsUseEne").checked;
    Storage().HHAuto_Setting_autoChampsFilter = document.getElementById("autoChampsFilter").value;

    Storage().HHAuto_Setting_kobanBank = remove1000sSeparator(document.getElementById("kobanBank").value);
    Storage().HHAuto_Setting_spendKobans0 = document.getElementById("spendKobans0").checked;
    Storage().HHAuto_Setting_buyCombat=document.getElementById("buyCombat").checked && Storage().HHAuto_Setting_spendKobans0==="true" ;// && Storage().HHAuto_Setting_spendKobans2=="true" && Storage().HHAuto_Setting_spendKobans1=="true" ;
    document.getElementById("buyCombat").checked=Storage().HHAuto_Setting_buyCombat==="true";
    Storage().HHAuto_Setting_buyMythicCombat=document.getElementById("buyMythicCombat").checked && Storage().HHAuto_Setting_spendKobans0==="true" ;// && Storage().HHAuto_Setting_spendKobans2=="true" && Storage().HHAuto_Setting_spendKobans1=="true";
    document.getElementById("buyMythicCombat").checked=Storage().HHAuto_Setting_buyMythicCombat==="true";

    Storage().HHAuto_Setting_autoBuyBoosters=document.getElementById("autoBuyBoosters").checked && Storage().HHAuto_Setting_spendKobans0==="true" ;//&& Storage().HHAuto_Setting_spendKobans2=="true" && Storage().HHAuto_Setting_spendKobans1=="true";
    document.getElementById("autoBuyBoosters").checked=Storage().HHAuto_Setting_autoBuyBoosters==="true";
    Storage().HHAuto_Setting_autoSeasonPassReds=document.getElementById("autoSeasonPassReds").checked && Storage().HHAuto_Setting_spendKobans0=="true" ;//&& Storage().HHAuto_Setting_spendKobans2=="true" && Storage().HHAuto_Setting_spendKobans1=="true";
    document.getElementById("autoSeasonPassReds").checked=Storage().HHAuto_Setting_autoSeasonPassReds==="true";
    Storage().HHAuto_Setting_useX50Fights= document.getElementById("useX50Fights").checked && Storage().HHAuto_Setting_spendKobans0==="true" ;
    document.getElementById("useX50Fights").checked=Storage().HHAuto_Setting_useX50Fights==="true";
    Storage().HHAuto_Setting_useX10Fights= document.getElementById("useX10Fights").checked && Storage().HHAuto_Setting_spendKobans0==="true" ;
    document.getElementById("useX10Fights").checked=Storage().HHAuto_Setting_useX10Fights==="true";


    Storage().HHAuto_Setting_minShardsX50=document.getElementById("minShardsX50").value;
    Storage().HHAuto_Setting_minShardsX10=document.getElementById("minShardsX10").value;
    Storage().HHAuto_Setting_useX10FightsAllowNormalEvent=document.getElementById("useX10FightsAllowNormalEvent").checked;
    Storage().HHAuto_Setting_useX50FightsAllowNormalEvent=document.getElementById("useX50FightsAllowNormalEvent").checked;

    Storage().HHAuto_Setting_autoTrollThreshold = document.getElementById("autoTrollThreshold").value;
    Storage().HHAuto_Setting_autoQuestThreshold = document.getElementById("autoQuestThreshold").value;
    Storage().HHAuto_Setting_autoLeaguesThreshold = document.getElementById("autoLeaguesThreshold").value;
    Storage().HHAuto_Setting_autoSeasonThreshold = document.getElementById("autoSeasonThreshold").value;
    Storage().HHAuto_Setting_PoAMaskRewards = document.getElementById("PoAMaskRewards").checked;
    Storage().HHAuto_Setting_autoPantheon = document.getElementById("autoPantheon").checked;
    Storage().HHAuto_Setting_autoPantheonThreshold = document.getElementById("autoPantheonThreshold").value;
    localStorage.HHAuto_Setting_settPerTab = document.getElementById("settPerTab").checked;

    Storage().HHAuto_Setting_master=document.getElementById("master").checked;
    */
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

function addKobanUsingEvent()
{
    for (let i of Object.keys(HHStoredVars))
    {
        if (HHStoredVars[i].HHType !== undefined && HHStoredVars[i].kobanUsing)
        {
            let menuID = HHStoredVars[i].customMenuID !== undefined?HHStoredVars[i].customMenuID:i.replace("HHAuto_"+HHStoredVars[i].HHType+"_","");
            document.getElementById(menuID).addEventListener("change",preventKobanUsingSwitchUnauthorized);
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

    /*document.getElementById("settPerTab").checked = localStorage.HHAuto_Setting_settPerTab === "true";
    document.getElementById("autoTrollSelector").selectedIndex = Storage().HHAuto_Setting_autoTrollSelectedIndex;
    document.getElementById("autoLeaguesSelector").selectedIndex = Storage().HHAuto_Setting_autoLeaguesSelectedIndex;
    document.getElementById("autoSalary").checked = Storage().HHAuto_Setting_autoSalary === "true";
    document.getElementById("autoSalaryMinTimer").value = add1000sSeparator(Storage().HHAuto_Setting_autoSalaryMinTimer);
    document.getElementById("autoSalaryMaxTimer").value = add1000sSeparator(Storage().HHAuto_Setting_autoSalaryMaxTimer);
    document.getElementById("autoContest").checked = Storage().HHAuto_Setting_autoContest === "true";
    document.getElementById("autoMission").checked = Storage().HHAuto_Setting_autoMission === "true";
    document.getElementById("autoMissionCollect").checked = Storage().HHAuto_Setting_autoMissionCollect === "true";
    document.getElementById("autoMissionKFirst").checked = Storage().HHAuto_Setting_autoMissionKFirst === "true" ;
    document.getElementById("autoQuest").checked = Storage().HHAuto_Setting_autoQuest === "true";
    document.getElementById("autoTrollBattle").checked = Storage().HHAuto_Setting_autoTrollBattle === "true";
    document.getElementById("eventTrollOrder").value = Storage().HHAuto_Setting_eventTrollOrder;
    document.getElementById("buyCombTimer").value = Storage().HHAuto_Setting_buyCombTimer;
    document.getElementById("buyMythicCombTimer").value = Storage().HHAuto_Setting_buyMythicCombTimer;
    document.getElementById("autoSeason").checked = Storage().HHAuto_Setting_autoSeason === "true";
    document.getElementById("autoSeasonCollect").checked = Storage().HHAuto_Setting_autoSeasonCollect === "true";
    document.getElementById("SeasonMaskRewards").checked = Storage().HHAuto_Setting_SeasonMaskRewards === "true";
    document.getElementById("autoSeasonPassReds").checked = Storage().HHAuto_Setting_autoSeasonPassReds === "true";
    document.getElementById("autoFreePachinko").checked = Storage().HHAuto_Setting_autoFreePachinko === "true";
    document.getElementById("autoLeagues").checked = Storage().HHAuto_Setting_autoLeagues === "true";
    //document.getElementById("autoLeaguesMaxRank").value = Storage().HHAuto_Setting_autoLeaguesMaxRank;
    document.getElementById("autoLeaguesPowerCalc").checked = Storage().HHAuto_Setting_autoLeaguesPowerCalc === "true";
    document.getElementById("autoLeaguesCollect").checked = Storage().HHAuto_Setting_autoLeaguesCollect === "true";
    document.getElementById("autoLeaguesAllowWinCurrent").checked = Storage().HHAuto_Setting_autoLeaguesAllowWinCurrent === "true";
    document.getElementById("autoPowerPlaces").checked = Storage().HHAuto_Setting_autoPowerPlaces === "true";
    document.getElementById("autoPowerPlacesAll").checked = Storage().HHAuto_Setting_autoPowerPlacesAll === "true";
    document.getElementById("autoPowerPlacesIndexFilter").value = Storage().HHAuto_Setting_autoPowerPlacesIndexFilter;
    document.getElementById("autoStats").value = add1000sSeparator(Storage().HHAuto_Setting_autoStats);
    document.getElementById("autoStatsSwitch").checked = Storage().HHAuto_Setting_autoStatsSwitch==="true";
    document.getElementById("paranoia").checked = Storage().HHAuto_Setting_paranoia==="true";
    document.getElementById("paranoiaSpendsBefore").checked = Storage().HHAuto_Setting_paranoiaSpendsBefore==="true";
    document.getElementById("autoExp").value = add1000sSeparator(Storage().HHAuto_Setting_autoExp);
    document.getElementById("autoExpW").checked = Storage().HHAuto_Setting_autoExpW === "true";
    document.getElementById("autoAff").value = add1000sSeparator(Storage().HHAuto_Setting_autoAff);
    document.getElementById("autoAffW").checked = Storage().HHAuto_Setting_autoAffW === "true";
    document.getElementById("maxExp").value = add1000sSeparator(Storage().HHAuto_Setting_maxExp);
    document.getElementById("maxAff").value = add1000sSeparator(Storage().HHAuto_Setting_maxAff);
    document.getElementById("autoLGM").value = add1000sSeparator(Storage().HHAuto_Setting_autoLGM);
    document.getElementById("autoLGMW").checked = Storage().HHAuto_Setting_autoLGMW === "true";
    document.getElementById("autoLGR").value = add1000sSeparator(Storage().HHAuto_Setting_autoLGR);
    document.getElementById("autoLGRW").checked = Storage().HHAuto_Setting_autoLGRW === "true";
    document.getElementById("autoBuyBoosters").checked = Storage().HHAuto_Setting_autoBuyBoosters === "true";
    document.getElementById("autoBuyBoostersFilter").value = Storage().HHAuto_Setting_autoBuyBoostersFilter;
    document.getElementById("showMarketTools").checked = Storage().HHAuto_Setting_showMarketTools === "true";
    document.getElementById("showInfo").checked = Storage().HHAuto_Setting_showInfo==="true";
    document.getElementById("showTooltips").checked = Storage().HHAuto_Setting_showTooltips==="true";
    document.getElementById("collectDailyRewards").checked = Storage().HHAuto_Setting_collectDailyRewards === "true" ;

    document.getElementById("showCalculatePower").checked = Storage().HHAuto_Setting_showCalculatePower==="true";
    //document.getElementById("calculatePowerLimits").value = Storage().HHAuto_Setting_calculatePowerLimits;
    document.getElementById("plusEvent").checked = Storage().HHAuto_Setting_plusEvent === "true";
    document.getElementById("plusEventMythic").checked = Storage().HHAuto_Setting_plusEventMythic === "true";
    document.getElementById("useX50Fights").checked= Storage().HHAuto_Setting_useX50Fights === "true";
    document.getElementById("useX10Fights").checked= Storage().HHAuto_Setting_useX10Fights === "true";
    document.getElementById("useX10FightsAllowNormalEvent").checked=Storage().HHAuto_Setting_useX10FightsAllowNormalEvent==="true";
    document.getElementById("useX50FightsAllowNormalEvent").checked=Storage().HHAuto_Setting_useX50FightsAllowNormalEvent==="true";
    document.getElementById("minShardsX50").value=Storage().HHAuto_Setting_minShardsX50;
    document.getElementById("minShardsX10").value=Storage().HHAuto_Setting_minShardsX10;
    document.getElementById("autoTrollMythicByPassParanoia").checked = Storage().HHAuto_Setting_autoTrollMythicByPassParanoia === "true";
    document.getElementById("autoClubChamp").checked = Storage().HHAuto_Setting_autoClubChamp  === "true";
    document.getElementById("autoClubForceStart").checked = Storage().HHAuto_Setting_autoClubForceStart  === "true";
    document.getElementById("autoClubChampMax").value = Storage().HHAuto_Setting_autoClubChampMax;
    document.getElementById("autoChamps").checked = Storage().HHAuto_Setting_autoChamps === "true";
    document.getElementById("autoChampsUseEne").checked = Storage().HHAuto_Setting_autoChampsUseEne === "true";
    document.getElementById("autoChampsFilter").value = Storage().HHAuto_Setting_autoChampsFilter;
    document.getElementById("spendKobans0").checked = Storage().HHAuto_Setting_spendKobans0 === "true";
    document.getElementById("buyCombat").checked = Storage().HHAuto_Setting_buyCombat === "true";
    document.getElementById("buyMythicCombat").checked = Storage().HHAuto_Setting_buyMythicCombat === "true";
    document.getElementById("kobanBank").value = add1000sSeparator(Storage().HHAuto_Setting_kobanBank);
    document.getElementById("autoTrollThreshold").value = Storage().HHAuto_Setting_autoTrollThreshold;
    document.getElementById("autoQuestThreshold").value = Storage().HHAuto_Setting_autoQuestThreshold;
    document.getElementById("autoLeaguesThreshold").value = Storage().HHAuto_Setting_autoLeaguesThreshold;
    document.getElementById("autoSeasonThreshold").value = Storage().HHAuto_Setting_autoSeasonThreshold;
    document.getElementById("autoPantheon").checked = Storage().HHAuto_Setting_autoPantheon=== "true";
    document.getElementById("autoPantheonThreshold").value = Storage().HHAuto_Setting_autoPantheonThreshold;
    document.getElementById("master").checked = Storage().HHAuto_Setting_master==="true";
    document.getElementById("PoAMaskRewards").checked = Storage().HHAuto_Setting_PoAMaskRewards === "true";
    */
}

var setDefaults = function (force = false)
{
    for (let i of Object.keys(HHStoredVars))
    {
        if (HHStoredVars[i].storage !== undefined )
        {
            let storageItem = getStorageItem(HHStoredVars[i].storage);
            let isInvalid = false;
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

    /*Storage().HHAuto_Setting_autoSalary = "false";
    Storage().HHAuto_Setting_autoSalaryMinTimer = "120";
    Storage().HHAuto_Setting_autoSalaryMaxTimer = "1200";
    Storage().HHAuto_Setting_autoContest = "false";
    Storage().HHAuto_Setting_autoMission = "false";
    Storage().HHAuto_Setting_autoPowerPlaces = "false";
    Storage().HHAuto_Setting_autoPowerPlacesAll = "false";
    Storage().HHAuto_Setting_autoPowerPlacesIndexFilter = "1;2;3";
    Storage().HHAuto_Setting_autoMissionCollect = "false";
    Storage().HHAuto_Setting_autoMissionKFirst = "false";
    Storage().HHAuto_Setting_autoLeagues = "false";
    Storage().HHAuto_Setting_autoLeaguesCollect = "false";
    Storage().HHAuto_Setting_autoLeaguesPowerCalc = "false";
    Storage().HHAuto_Setting_autoLeaguesAllowWinCurrent = "false";
    //Storage().HHAuto_Setting_autoLeaguesMaxRank = "0";
    Storage().HHAuto_Setting_collectDailyRewards = "false";
    sessionStorage.HHAuto_Temp_leaguesTarget = "9";
    Storage().HHAuto_Setting_autoStats = add1000sSeparator("500000000");

    sessionStorage.HHAuto_Temp_autoLoop = "true";
    sessionStorage.HHAuto_Temp_userLink = "none";
    Storage().HHAuto_Temp_autoLoopTimeMili = "500";
    Storage().HHAuto_Setting_autoQuest = "false";
    Storage().HHAuto_Setting_autoTrollBattle = "false";
    Storage().HHAuto_Setting_plusEvent = "false";
    Storage().HHAuto_Setting_plusEventMythic = "false";
    //Storage().HHAuto_Setting_eventMythicPrio = "false";
    Storage().HHAuto_Setting_useX50Fights= "false";
    Storage().HHAuto_Setting_useX10Fights= "false";
    Storage().HHAuto_Setting_useX10FightsAllowNormalEvent="false";
    Storage().HHAuto_Setting_useX50FightsAllowNormalEvent="false";
    Storage().HHAuto_Setting_minShardsX10="10";
    Storage().HHAuto_Setting_minShardsX50="50";
    //Storage().HHAuto_Setting_autoTrollMythicByPassThreshold = "false";
    Storage().HHAuto_Setting_autoTrollMythicByPassParanoia = "false";
    Storage().HHAuto_Setting_eventTrollOrder="";
    Storage().HHAuto_Setting_buyCombTimer="16";
    Storage().HHAuto_Setting_buyMythicCombTimer="16";
    Storage().HHAuto_Setting_autoSeason = "false";
    Storage().HHAuto_Setting_autoSeasonCollect = "false";
    Storage().HHAuto_Setting_SeasonMaskRewards = "false";
    sessionStorage.HHAuto_Temp_battlePowerRequired = "0";
    sessionStorage.HHAuto_Temp_questRequirement = "none";
    Storage().HHAuto_Temp_freshStart = "no";
    Storage().HHAuto_Setting_autoChamps="false";
    Storage().HHAuto_Setting_autoClubChamp="false";
    Storage().HHAuto_Setting_autoClubForceStart="false";
    Storage().HHAuto_Setting_autoClubChampMax = "999";
    Storage().HHAuto_Setting_autoChampsUseEne="false";
    Storage().HHAuto_Setting_autoChampsFilter="1;2;3;4;5;6";
    Storage().HHAuto_Setting_autoFreePachinko = "false";
    Storage().HHAuto_Setting_autoStats = add1000sSeparator("500000000");
    Storage().HHAuto_Setting_autoStatsSwitch="false";
    Storage().HHAuto_Setting_autoExp = add1000sSeparator("500000000");
    Storage().HHAuto_Setting_autoExpW = "false";
    Storage().HHAuto_Setting_maxExp = add1000sSeparator("10000");
    Storage().HHAuto_Setting_autoAff = add1000sSeparator("500000000");
    Storage().HHAuto_Setting_autoAffW = "false";
    Storage().HHAuto_Setting_maxAff = add1000sSeparator("50000");
    Storage().HHAuto_Setting_autoLGM = add1000sSeparator("500000000");
    Storage().HHAuto_Setting_autoLGMW = "false";
    Storage().HHAuto_Setting_autoLGR = add1000sSeparator("500000000");
    Storage().HHAuto_Setting_autoLGRW = "false";
    Storage().HHAuto_Setting_autoBuyBoostersFilter = "B1;B2;B3;B4";
    Storage().HHAuto_Setting_autoBuyBoosters = "false";
    Storage().HHAuto_Setting_showMarketTools = "false";
    Storage().HHAuto_Setting_paranoia="true";
    Storage().HHAuto_Setting_paranoiaSpendsBefore="false";
    Storage().HHAuto_Setting_showTooltips = "true";
    Storage().HHAuto_Setting_calculatePowerLimits = "default";
    Storage().HHAuto_Setting_autoTrollThreshold="0";
    Storage().HHAuto_Setting_autoQuestThreshold="0";
    Storage().HHAuto_Setting_autoLeaguesThreshold="0";
    Storage().HHAuto_Setting_autoSeasonThreshold="0";

    Storage().HHAuto_Setting_spendKobans0="false";
    Storage().HHAuto_Setting_autoSeasonPassReds ="false";
    Storage().HHAuto_Setting_paranoiaSettings="140-320/Sleep:28800-30400|Active:250-460|Casual:1500-2700/6:Sleep|8:Casual|10:Active|12:Casual|14:Active|18:Casual|20:Active|22:Casual|24:Sleep";
    Storage().HHAuto_Setting_master="false";
    Storage().HHAuto_Setting_PoAMaskRewards = "false";
    */
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
HHEnvVariables["global"].girlToolTipData = "data-new-girl-tooltip";
HHEnvVariables["global"].dailyRewardNotifRequest = "#contains_all header .currency .daily-reward-notif";
HHEnvVariables["global"].pageEditTeam = "edit-team"
HHEnvVariables["global"].IDpanelEditTeam = "#edit-team-page"
HHEnvVariables["global"].shopGirlCountRequest = '#girls_list .g1 .number.selected span:not([contenteditable]';
HHEnvVariables["global"].shopGirlCurrentRequest = '#girls_list .g1 .number.selected span[contenteditable]';
HHEnvVariables["global"].shopGirlCounterRequest = '#girls_list .g1 .number.selected';
HHEnvVariables["global"].contestMaxDays = 21;
HHEnvVariables["global"].selectorFilterNotDisplayNone = ':not([style*="display:none"]):not([style*="display: none"])';
HHEnvVariables["global"].HaremMaxSizeExpirationSecs = 7*24*60*60;//7 days
HHEnvVariables["global"].HaremMinSizeExpirationSecs = 24*60*60;//1 days
HHEnvVariables["global"].LeagueListExpirationSecs = 60*60;//1 hour max
HHEnvVariables["global"].STOCHASTIC_SIM_RUNS = 10000;
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
    MB4:   {name:"Angels' semen scent", usage:"+25% power against PoA for next 60 missions"},
};

switch (getLanguageCode())
{
    case "fr":
        HHEnvVariables["global"].trollzList = ["Dernier","Dark Lord","Espion Ninja","Gruntt","Edwarda","Donatien","Silvanus","Bremen","Finalmecia","Roko Senseï","Karole","Jackson","Pandora","Nike","Sake"];
        HHEnvVariables["global"].leaguesList = ["Branleur I","Branleur II","Branleur III","Sexpert I","Sexpert II","Sexpert III","Dicktateur I","Dicktateur II","Dicktateur III"]
        break;
    default:
        HHEnvVariables["global"].trollzList =  ["Latest","Dark Lord","Ninja Spy","Gruntt","Edwarda","Donatien","Silvanus","Bremen","Finalmecia","Roko Senseï","Karole","Jackson\'s Crew","Pandora witch","Nike","Sake"];
        HHEnvVariables["global"].leaguesList = ["Wanker I","Wanker II","Wanker III","Sexpert I","Sexpert II","Sexpert III","Dicktator I","Dicktator II","Dicktator III"];
}

HHEnvVariables["global"].gotoPageHome = '/home.html';
HHEnvVariables["global"].gotoPageActivities = '/activities.html';
HHEnvVariables["global"].gotoPageHarem = '/harem.html';
HHEnvVariables["global"].gotoPageMap = '/map.html';
HHEnvVariables["global"].gotoPagePachinko = '/pachinko.html';
HHEnvVariables["global"].gotoPageLeaderboard = '/tower-of-fame.html';
HHEnvVariables["global"].gotoPageShop = '/shop.html';
HHEnvVariables["global"].gotoPageClub = '/clubs.html';
HHEnvVariables["global"].gotoPagePantheon = "/pantheon.html";
HHEnvVariables["global"].gotoPagePantheonPreBattle = "/pantheon-pre-battle.html";
HHEnvVariables["global"].gotoPageChampionsMap = "/champions-map.html";
HHEnvVariables["global"].gotoPageSeason = "/season.html";
HHEnvVariables["global"].gotoPageSeasonArena = "/season-arena.html";
HHEnvVariables["global"].gotoPageClubChampion = "/club-champion.html";
HHEnvVariables["global"].gotoPageLeagueBattle = "/league-battle.html";
HHEnvVariables["global"].gotoPageTrollPreBattle = "/troll-pre-battle.html";
HHEnvVariables["global"].gotoPageEvent = "/event.html";

//to correct when new troll pre battle page arrives in prod
//HHEnvVariables["global"].getPageTrollPreBattle = "pre_battle";
HHEnvVariables["global"].getPageTrollPreBattle = "troll-pre-battle";

HHEnvVariables["global"].isEnabledEvents = true;
HHEnvVariables["global"].isEnabledTrollBattle = true;
HHEnvVariables["global"].isEnabledPachinko = true;
HHEnvVariables["global"].isEnabledGreatPachinko = true;
HHEnvVariables["global"].isEnabledMythicPachinko = true;
HHEnvVariables["global"].isEnabledContest = true;
HHEnvVariables["global"].isEnabledPowerPlaces = true;
HHEnvVariables["global"].isEnabledMission = true;
HHEnvVariables["global"].isEnabledQuest = true;
HHEnvVariables["global"].isEnabledSeason = true;
HHEnvVariables["global"].isEnabledPantheon = true;
HHEnvVariables["global"].isEnabledAllChamps = true;
HHEnvVariables["global"].isEnabledChamps = true;
HHEnvVariables["global"].isEnabledClubChamp = true;
HHEnvVariables["global"].isEnabledLeagues = true;
HHEnvVariables["global"].isEnabledDailyRewards = true;
HHEnvVariables["global"].isEnabledShop = true;
HHEnvVariables["global"].isEnabledSalary = true;
HHEnvVariables["HH_test"].isEnabledDailyRewards = false;// to remove if daily rewards arrives in test
HHEnvVariables["CH_prod"].isEnabledAllChamps = false;// to remove when Champs arrives in Comix
HHEnvVariables["CH_prod"].isEnabledChamps = false;// to remove when Champs arrives in Comix
HHEnvVariables["CH_prod"].isEnabledClubChamp = false;// to remove when Club Champs arrives in Comix
HHEnvVariables["CH_prod"].isEnabledPantheon = false;// to remove when Pantheon arrives in Comix
HHEnvVariables["CH_prod"].isEnabledPowerPlaces = false;// to remove when PoP arrives in Comix
HHEnvVariables["SH_prod"].isEnabledPowerPlaces = false;// to remove when PoP arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledMythicPachinko = false;// to remove when Great Pachinko arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledAllChamps = false;// to remove when Champs arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledChamps = false;// to remove when Champs arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledClubChamp = false;// to remove when Club Champs arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPantheon = false;// to remove when Pantheon arrives in hornyheroes

const HC = 1;
const CH = 2;
const KH = 3;

var HHAuto_inputPattern = {
    nWith1000sSeparator:"[0-9"+thousandsSeparator+"]+",

    //kobanBank:"[0-9]+",
    buyCombTimer:"[0-9]+",
    buyMythicCombTimer:"[0-9]+",
    autoBuyBoostersFilter:"B[1-4](;B[1-4])*",
    //calculatePowerLimits:"(\-?[0-9]+;\-?[0-9]+)|default",
    autoSalaryTimer:"[0-9]+",
    autoTrollThreshold:"[1]?[0-9]",
    eventTrollOrder:"([1-2][0-9]|[1-9])(;([1-2][0-9]|[1-9]))*",
    autoSeasonThreshold:"[0-9]",
    autoPantheonThreshold:"[0-9]",
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

HHAuto_ToolTips.en.saveDebug = { version: "5.6.24", elementText: "Save Debug", tooltip: "Allow to produce a debug log file."};
HHAuto_ToolTips.en.gitHub = { version: "5.6.24", elementText: "GitHub", tooltip: "Link to GitHub project."};
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
HHAuto_ToolTips.en.eventTrollOrder = { version: "5.6.24", elementText: "Event Troll Order", tooltip: "(values separated by ;)<br>Allow to select in which order event troll are automatically battled<br>1 : Dark Lord<br>2 : Ninja Spy<br>3 : Gruntt<br>4 : Edwarda<br>5 : Donatien<br>6 : Sylvanus<br>7 : Bremen<br>8 : Finalmecia<br>9 : Fredy Sih Roko<br>10 : Karole<br>11 : Jackson's Crew<br>12 : Pandora Witch<br>13 : Nike<br>14 : Sake"};
HHAuto_ToolTips.en.plusEvent = { version: "5.6.24", elementText: "+Event", tooltip: "If enabled : ignore selected troll during event to battle event"};
HHAuto_ToolTips.en.plusEventMythic = { version: "5.6.24", elementText: "+Mythic Event", tooltip: "Enable grabbing girls for mythic event, should only play them when shards are available, Mythic girl troll will be priorized over Event Troll."};
//HHAuto_ToolTips.en.eventMythicPrio = { version: "5.6.24", elementText: "Priorize over Event Troll Order", tooltip: "Mythic event girl priorized over event troll order if shards available"};
//HHAuto_ToolTips.en.autoTrollMythicByPassThreshold = { version: "5.6.24", elementText: "Mythic bypass Threshold", tooltip: "Allow mythic to bypass Troll threshold"};
HHAuto_ToolTips.en.autoSeasonTitle = { version: "5.6.24", elementText: "Season"};
HHAuto_ToolTips.en.autoSeason = { version: "5.6.24", elementText: "Enable", tooltip: "if enabled : Automatically fight in Seasons (Opponent chosen following PowerCalculation)"};
HHAuto_ToolTips.en.autoSeasonCollect = { version: "5.6.24", elementText: "Collect", tooltip: "if enabled : Automatically collect Seasons ( if multiple to collect, will collect one per kiss usage)"};
HHAuto_ToolTips.en.autoSeasonThreshold = { version: "5.6.24", elementText: "Threshold", tooltip: "Minimum kiss to keep"};
HHAuto_ToolTips.en.autoQuest = { version: "5.6.24", elementText: "Quest", tooltip: "if enabled : Automatically do quest"};
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
HHAuto_ToolTips.en.autoChampsTitle = { version: "5.6.24", elementText: "Champions"};
HHAuto_ToolTips.en.autoChamps = { version: "5.6.24", elementText: "Normal", tooltip: "if enabled : Automatically do champions (if they are started and in filter only)"};
HHAuto_ToolTips.en.autoChampsUseEne = { version: "5.6.24", elementText: "Buy tickets", tooltip: "If enabled : use Energy to buy tickets"};
HHAuto_ToolTips.en.autoChampsFilter = { version: "5.6.24", elementText: "Filter", tooltip: "(values separated by ; 1 to 6)<br>Allow to set filter on champions to be fought"};
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
HHAuto_ToolTips.en.menuSellText = { version: "5.6.24", elementText: "This will sell the number of items asked starting in display order (first all non legendary then legendary)<br> It will sell all non legendary stuff and keep : <br> - 1 set of rainbow legendary (choosen on highest player class stat)<br> - 1 set of legendary mono player class (choosen on highest stats)<br> - 1 set of legendary harmony (choosen on highest stats)<br> - 1 set of legendary endurance (choosen on highest stats)<br>You can lock/Unlock batch by clicking on the corresponding cell/row/column (notlocked/total), red means all locked, orange some locked.", tooltip: ""};
HHAuto_ToolTips.en.menuSellNumber = { version: "5.6.24", elementText: "", tooltip: "Enter the number of items you want to sell : "};
HHAuto_ToolTips.en.menuSellButton = { version: "5.6.24", elementText: "Sell", tooltip: "Launch selling funtion."};
HHAuto_ToolTips.en.menuSellCurrentCount = { version: "5.6.24", elementText: "Number of sellable items you currently have : ", tooltip: ""};
HHAuto_ToolTips.en.menuSellMaskLocked = { version: "5.6.24", elementText: "Mask locked", tooltip: "Allow to mask locked items."};
HHAuto_ToolTips.en.menuSoldText = { version: "5.6.24", elementText: "Number of items sold : ", tooltip: ""};
HHAuto_ToolTips.en.menuSoldMessageReachNB = { version: "5.6.24", elementText: "Wanted sold items reached.", tooltip: ""};
HHAuto_ToolTips.en.menuSoldMessageNoMore = { version: "5.6.24", elementText: " No more sellable items.", tooltip: ""};
HHAuto_ToolTips.en.menuAff = { version: "5.6.24", elementText: "Give Aff", tooltip: "Automatically give Aff to selected girl."};
HHAuto_ToolTips.en.menuAffButton = { version: "5.6.24", elementText: "Go !", tooltip: "Launch giving aff."};
HHAuto_ToolTips.en.menuDistribution = { version: "5.6.24", elementText: "Items to be used : ", tooltip: ""};
HHAuto_ToolTips.en.Total = { version: "5.6.24", elementText: "Total : ", tooltip: ""};
HHAuto_ToolTips.en.menuAffNoNeed = { version: "5.6.24", elementText: "don't need Aff.", tooltip: ""};
HHAuto_ToolTips.en.menuAffNoAff = { version: "5.6.24", elementText: "No Aff available to be given to :", tooltip: ""};
HHAuto_ToolTips.en.menuAffError = { version: "5.6.24", elementText: "Error fetching girl Aff field, cancelling.", tooltip: ""};
HHAuto_ToolTips.en.menuAffReadyToUpgrade = { version: "5.6.24", elementText: " is ready for upgrade.", tooltip: ""};
HHAuto_ToolTips.en.menuAffEnd = { version: "5.6.24", elementText: "All Aff given to :", tooltip: ""};
HHAuto_ToolTips.en.menuDistributed = { version: "5.6.24", elementText: "Items used : ", tooltip: ""};
HHAuto_ToolTips.en.autoClubChampMax = { version: "5.6.24", elementText: "Max tickets per run", tooltip: "Maximum number of tickets to use on the club champion at each run."};
HHAuto_ToolTips.en.menuSellLock = { version: "5.6.24", elementText: "Lock/ Unlock", tooltip: "Switch the lock to prevent selected item to be sold."};
HHAuto_ToolTips.en.Rarity = { version: "5.6.24", elementText: "Rarity", tooltip: ""};
HHAuto_ToolTips.en.RarityCommon = { version: "5.6.24", elementText: "Common", tooltip: ""};
HHAuto_ToolTips.en.RarityRare = { version: "5.6.24", elementText: "Rare", tooltip: ""};
HHAuto_ToolTips.en.RarityEpic = { version: "5.6.24", elementText: "Epic", tooltip: ""};
HHAuto_ToolTips.en.RarityLegendary = { version: "5.6.24", elementText: "Legendary", tooltip: ""};
HHAuto_ToolTips.en.equipementHead = { version: "5.6.24", elementText: "Head", tooltip: ""};
HHAuto_ToolTips.en.equipementBody = { version: "5.6.24", elementText: "Body", tooltip: ""};
HHAuto_ToolTips.en.equipementLegs = { version: "5.6.24", elementText: "Legs", tooltip: ""};
HHAuto_ToolTips.en.equipementFlag = { version: "5.6.24", elementText: "Flag", tooltip: ""};
HHAuto_ToolTips.en.equipementPet = { version: "5.6.24", elementText: "Pet", tooltip: ""};
HHAuto_ToolTips.en.equipementWeapon = { version: "5.6.24", elementText: "Weapon", tooltip: ""};
HHAuto_ToolTips.en.equipementCaracs = { version: "5.6.24", elementText: "Caracs", tooltip: ""};
HHAuto_ToolTips.en.equipementType = { version: "5.6.24", elementText: "Type", tooltip: ""};
HHAuto_ToolTips.en.autoMissionKFirst = { version: "5.6.24", elementText: "Kobans first", tooltip: "Start by missions rewarded with Kobans."};
HHAuto_ToolTips.en.menuExp = { version: "5.6.24", elementText: "Give Exp", tooltip: "Automatically give max Exp to selected girl."};
HHAuto_ToolTips.en.menuExpButton = { version: "5.6.24", elementText: "Go !", tooltip: "Launch giving exp."};
HHAuto_ToolTips.en.menuExpNoNeed = { version: "5.6.24", elementText: "don't need Exp.", tooltip: ""};
HHAuto_ToolTips.en.menuExpNoExp = { version: "5.6.24", elementText: "No Exp available to be given to :", tooltip: ""};
HHAuto_ToolTips.en.menuExpError = { version: "5.6.24", elementText: "Error fetching girl Exp field, cancelling.", tooltip: ""};
HHAuto_ToolTips.en.menuExpEnd = { version: "5.6.24", elementText: "All Exp given to :", tooltip: ""};
HHAuto_ToolTips.en.menuExpLevel =  { version: "5.6.24", elementText: "Enter target Exp level :", tooltip: "Target Exp level for girl"};
HHAuto_ToolTips.en.menuExpAwakeningNeeded =  { version: "5.6.24", elementText: "Girl need awakening ", tooltip: ""};
HHAuto_ToolTips.en.PoAMaskRewards = { version: "5.6.24", elementText: "PoA mask claimed", tooltip: "Masked claimed rewards for Path of Attraction."};
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
HHAuto_ToolTips.en.PachinkoSelectorNoButtons = {version: "5.6.24", elementText: "No Orbs available.", tooltip: ""};
HHAuto_ToolTips.en.PachinkoSelector = {version: "5.6.24", elementText: "", tooltip: "Pachinko Selector."};
HHAuto_ToolTips.en.PachinkoLeft = {version: "5.6.24", elementText: "", tooltip: "Currently available orbs."};
HHAuto_ToolTips.en.PachinkoXTimes = {version: "5.6.24", elementText: "Number to use : ", tooltip: "Set the number of orbs tu use o selected pachinko."};
HHAuto_ToolTips.en.PachinkoPlayX = {version: "5.6.24", elementText: "Launch", tooltip: "Launch X uses of selected orbs"};
HHAuto_ToolTips.en.PachinkoButton = {version: "5.6.24", elementText: "Use Pachinko", tooltip: "Allow to automatically use the selected Pachinko. (Only for Orbs games)"};
HHAuto_ToolTips.en.PachinkoOrbsLeft = {version: "5.6.24", elementText: " orbs remaining.", tooltip: ""};
HHAuto_ToolTips.en.PachinkoInvalidOrbsNb = {version: "5.6.24", elementText: 'Invalid orbs number'};
HHAuto_ToolTips.en.PachinkoNoGirls = {version: "5.6.24", elementText: 'No more any girls available.'};
HHAuto_ToolTips.en.PachinkoByPassNoGirls = {version: "5.6.24", elementText: 'Bypass no girls', tooltip: "Bypass the no girls in Pachinko warning."};
HHAuto_ToolTips.en.ChangeTeamButton = {version: "5.6.24", elementText: "Current Best", tooltip: "Get list of top 16 girls for your team."};
HHAuto_ToolTips.en.ChangeTeamButton2 = {version: "5.6.24", elementText: "Possible Best", tooltip: "Get list of top 16 girls for your team if they are Max Lv & Aff"};
HHAuto_ToolTips.en.AssignTopTeam  = {version: "5.6.24", elementText: "Assign first 7", tooltip: "Put the first 7 ones in the team."};
HHAuto_ToolTips.en.ExportGirlsData = {version: "5.6.24", elementText: "⤓", tooltip: "Export Girls data."};
HHAuto_ToolTips.en.menuRemoveMaxed = {version: "5.6.24", elementText: "Remove maxed", tooltip: "Remove maxed girls"};
HHAuto_ToolTips.en.collectDailyRewards = {version: "5.6.24", elementText: "Collect daily", tooltip: "Collect daily rewards if not collected 1 hour before end of HH day."};
HHAuto_ToolTips.en.saveDefaults = {version: "5.6.24", elementText: "Save defaults", tooltip: "Save your own defaults values for new tabs."};
HHAuto_ToolTips.en.autoGiveAff = {version: "5.6.24", elementText: "Auto Give", tooltip: "If enabled, will automatically give Aff to girls in order ( you can use OCD script to filter )."};
HHAuto_ToolTips.en.autoGiveExp = {version: "5.6.24", elementText: "Auto Give", tooltip: "If enabled, will automatically give Exp to girls in order ( you can use OCD script to filter )."};
HHAuto_ToolTips.en.autoPantheonTitle = {version: "5.6.24", elementText: "Pantheon", tooltip: ""};
HHAuto_ToolTips.en.autoPantheon = { version: "5.6.24", elementText: "Enable", tooltip: "if enabled : Automatically do Pantheon"};
HHAuto_ToolTips.en.autoPantheonThreshold = { version: "5.6.24", elementText: "Threshold", tooltip: "(Integer 0 to 19)<br>Minimum worship to keep"};
HHAuto_ToolTips.en.buttonSaveOpponent = { version: "5.6.24", elementText: "Save opponent data", tooltip: "Save opponent data for fight simulation in market."};
HHAuto_ToolTips.en.SimResultMarketButton = { version: "5.6.24", elementText: "Sim. results", tooltip: "Simulate result with League saved opponent."};
HHAuto_ToolTips.en.simResultMarketPreviousScore = { version: "5.6.24", elementText: "Previous score :", tooltip: ""};
HHAuto_ToolTips.en.simResultMarketScore = { version: "5.6.24", elementText: "Score : ", tooltip: ""};
HHAuto_ToolTips.en.none = { version: "5.6.24", elementText: "None", tooltip: ""};
HHAuto_ToolTips.en.name = { version: "5.6.24", elementText: "Name", tooltip: ""};
HHAuto_ToolTips.en.sortPowerCalc = { version: "5.6.24", elementText: "Sort by score", tooltip: "Sorting opponents by score."};
HHAuto_ToolTips.en.haremNextUpgradableGirl = { version: "5.6.24", elementText: "Go to next upgradable Girl.", tooltip: ""};
HHAuto_ToolTips.en.haremOpenFirstXUpgradable = { version: "5.6.24", elementText: "Open X upgradable girl quest.", tooltip: ""};
HHAuto_ToolTips.en.translate = { version: "5.6.25", elementText: "Translate", tooltip: ""};
HHAuto_ToolTips.en.saveTranslation = { version: "5.6.25", elementText: "Save translation"};
HHAuto_ToolTips.en.saveTranslationText = { version: "5.6.25", elementText: "Below you'll find all text that can be translated.<br>To contribute, modify directly in the cell the translation (if empty click on the blue part ;))<br><p style='margin-block-start:0px;margin-block-end:0px;color:gray'>Gray cells are translations needing update.</p><p style='margin-block-start:0px;margin-block-end:0px;color:blue'>Blue cell are missing translations</p><p style='margin-block-start:0px;margin-block-end:0px;color:red'>Please try to keep the text length to prevent UI issues.</p>At the bottom you'll find a button to generate a txt file with your modification.<br>Please upload it to : <a target='_blank' href='https://github.com/Roukys/HHauto/issues/426'>Github</a>", tooltip: ""};


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
HHAuto_ToolTips.fr.autoTrollMythicByPassParanoia = { version: "5.6.24", elementText: "Mythique annule paranoïa", tooltip: "Si activé : autorise le script à ne pas respecter le mode Parano lors d'un événement mythique.<br>Si la prochaine vague est pendant une phase de sommeil le script combattra quand même<br>tant que des combats et des fragments sont disponibles."};
HHAuto_ToolTips.fr.buyMythicCombat = { version: "5.6.24", elementText: "Achat comb. pour mythique", tooltip: "<p style='color:red'>/!\\ Dépense des Kobans /!\\<br>("+HHAuto_ToolTips.fr.spendKobans0.elementText+" doit être activé)</p>Si activé : achète des points de combat (poings) pendant les X dernières heures de l'événement mythique (sans dépasser la limite de la banque de kobans), passera outre la réserve de combats si nécessaire."};
HHAuto_ToolTips.fr.buyMythicCombTimer = { version: "5.6.24", elementText: "Heures d'achat comb.", tooltip: "(Nombre entier)<br>X dernières heures de l'événement mythique"};
HHAuto_ToolTips.fr.mythicGirlNext = { version: "5.6.24", elementText: "Vague mythique"};


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
HHAuto_ToolTips.es.autoFreePachinko = { version: "5.6.24", elementText: "AutoPachinko(Gratis)", tooltip: "Si habilitado: Recauda pachinkos gratuitos de manera automática"};
HHAuto_ToolTips.es.autoLeagues = { version: "5.6.24", elementText: "AutoLigas", tooltip: "Si habilitado: Combate en ligas de manera automática"};
HHAuto_ToolTips.es.autoLeaguesPowerCalc = { version: "5.6.24", elementText: "UsarCalcPotencia", tooltip: "Si habilitado: Elige oponentes usando calculadora de potencia (La lista expira cada 10 mins. y tarda pocos minutos en reconstruirse)"};
HHAuto_ToolTips.es.autoLeaguesCollect = { version: "5.6.24", elementText: "Recaudar", tooltip: "Si habilitado: Recauda premios de ligas de manera automática"};
HHAuto_ToolTips.es.autoLeaguesSelector = { version: "5.6.24", elementText: "Liga objetivo", tooltip: "Liga objetivo, para intentar descender, permanecer o ascender a otra liga en función de ello"};
HHAuto_ToolTips.es.autoLeaguesThreshold = { version: "5.6.24", elementText: "Límite", tooltip: "Mínimos combates de liga a conservar"};
HHAuto_ToolTips.es.autoPowerPlaces = { version: "5.6.24", elementText: "AutoLugaresPoder", tooltip: "Si habilitado: Juega Lugares de Poder de manera automática"};
HHAuto_ToolTips.es.autoPowerPlacesIndexFilter = { version: "5.6.24", elementText: "Filtro de índice", tooltip: "Permite establecer un filto y un orden para jugar Lugares de Poder (el orden solo se respeta cuando multiples Lugares de Poder finalizan al mismo tiempo)"};
HHAuto_ToolTips.es.autoPowerPlacesAll = { version: "5.6.24", elementText: "Juega todos", tooltip: "Si habilitado: ignora el filtro y juega todos los Lugares de Poder (actualizará del Filtro con las actuales ids)"};
HHAuto_ToolTips.es.autoChamps = { version: "5.6.24", elementText: "AutoCampeones", tooltip: "Si habilitado: Combate a campeones de manera automática (Sólo si han empezado un combate y están en el filtro)"};
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
    kobanUsing:false
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
    kobanUsing:false
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
    customMenuID:"autoLeaguesSelector"
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
    kobanUsing:false
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
    customMenuID:"autoTrollSelector"
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
HHStoredVars.HHAuto_Setting_collectDailyRewards =
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
HHStoredVars.HHAuto_Temp_leaguesTarget =
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
};
HHStoredVars.HHAuto_Temp_questRequirement =
    {
    default:"none",
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_userLink =
    {
    default:"none",
    storage:"sessionStorage",
    HHType:"Temp"
};
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
HHStoredVars.HHAuto_Temp_trollToFight =
    {
    storage:"sessionStorage",
    HHType:"Temp",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:false,
    menuType:"value",
    kobanUsing:false,
    customMenuID:"autoTrollSelector"
};
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
HHStoredVars.HHAuto_Temp_LeagueSavedData =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_HaremSize =
    {
    storage:"sessionStorage",
    HHType:"Temp",
    isValid:/{"count":(\d)+,"count_date":(\d)+}/
};
/*
//Do not move, has to be first one
HHStoredVars.HHAuto_Setting_settPerTab = {default:  "false", storage : "localStorage", type : "Setting"};
// Rest of settings vars
HHStoredVars.HHAuto_Setting_autoAff = {default:  "500000000", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoAffW = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoBuyBoosters = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoBuyBoostersFilter = {default:  "B1;B2;B3;B4", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoChamps = {default: "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoChampsFilter = {default: "1;2;3;4;5;6", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoChampsUseEne = {default: "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoClubChamp = {default: "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoClubChampMax = {default:  "999", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoClubForceStart = {default: "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoContest = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoExp = {default:  "500000000", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoExpW = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoFreePachinko = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoLeagues = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoLeaguesAllowWinCurrent = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoLeaguesCollect = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoLeaguesPowerCalc = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoLeaguesSelectedIndex = {default:  0, storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoLeaguesThreshold = {default: "0", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoLGM = {default:  "500000000", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoLGMW = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoLGR = {default:  "500000000", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoLGRW = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoMission = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoMissionCollect = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoMissionKFirst = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoPowerPlaces = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoPowerPlacesAll = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoPowerPlacesIndexFilter = {default:  "1;2;3", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoQuest = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoQuestThreshold = {default: "0", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoSalary = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoSalaryMaxTimer = {default:  "1200", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoSalaryMinTimer = {default:  "120", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoSeason = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoSeasonCollect = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoSeasonPassReds = {default: "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoSeasonThreshold = {default: "0", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoStats = {default:  "500000000", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoStatsSwitch = {default: "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoTrollBattle = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoTrollMythicByPassParanoia = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoTrollSelectedIndex = {default:  0, storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoTrollThreshold = {default: "0", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_buyCombat = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_buyCombTimer = {default: "16", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_buyMythicCombat = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_buyMythicCombTimer = {default: "16", storage : "Storage()", type : "Setting"};
//HHStoredVars.HHAuto_Setting_calculatePowerLimits = {default:  "default", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_collectDailyRewards = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_eventTrollOrder = {default: "1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_master = {default: "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_maxAff = {default:  "50000", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_maxExp = {default:  "10000", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_minShardsX10 = {default: "10", storage : "Storage()", type : "Setting", isValid:/^(\d)+$/};
HHStoredVars.HHAuto_Setting_minShardsX50 = {default: "50", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_paranoia = {default: "true", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_paranoiaSettings = {default: "140-320/Sleep:28800-30400|Active:250-460|Casual:1500-2700/6:Sleep|8:Casual|10:Active|12:Casual|14:Active|18:Casual|20:Active|22:Casual|24:Sleep", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_paranoiaSpendsBefore = {default: "true", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_plusEvent = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_plusEventMythic = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_PoAMaskRewards = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_SeasonMaskRewards = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_showCalculatePower = {default:  "true", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_showInfo = {default:  "true", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_showMarketTools = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_showTooltips = {default:  "true", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_spendKobans0 = {default: "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_kobanBank = {default: "1000000", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_useX10Fights = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_useX10FightsAllowNormalEvent = {default: "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_useX50Fights = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_useX50FightsAllowNormalEvent = {default: "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_saveDefaults = {default: "{}", storage : "localStorage", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoPantheon = {default:  "false", storage : "Storage()", type : "Setting"};
HHStoredVars.HHAuto_Setting_autoPantheonThreshold = {default: "0", storage : "Storage()", type : "Setting"};


//Temp vars
HHStoredVars.HHAuto_Temp_autoLoop = {default:  "true", storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_battlePowerRequired = {default:  "0", storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_leaguesTarget = {default:  "9", storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_questRequirement = {default:  "none", storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_userLink = {default:  "none", storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_autoLoopTimeMili = {default:  "500", storage : "Storage()", type : "Temp"};
HHStoredVars.HHAuto_Temp_freshStart = {default:  "no", storage : "Storage()", type : "Temp"};
HHStoredVars.HHAuto_Temp_Logging = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_trollToFight = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_autoTrollBattleSaveQuest = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_burst = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_charLevel = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_eventsGirlz = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_eventGirl = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_fought = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_haveAff = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_haveExp = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_LeagueOpponentList = { storage : "sessionStorage", type : "Temp", isValid:/{"dataType":"Map","value":\[(\[(\d)+,{"points"[^\]]+\],?)+\]}/};
HHStoredVars.HHAuto_Temp_LeagueTempOpponentList = { storage : "sessionStorage", type : "Temp", isValid:/{"dataType":"Map","value":\[(\[(\d)+,{"points"[^\]]+\],?)+\]}/};
HHStoredVars.HHAuto_Temp_opponentsListExpirationDate = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_paranoiaLeagueBlocked = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_paranoiaQuestBlocked = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_paranoiaSpendings = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_pinfo = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_PopToStart = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_PopUnableToStart = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_storeContents = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_Timers = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_NextSwitch = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_Totalpops = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_CheckSpentPoints = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_eventsList = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_LeagueSavedData = { storage : "sessionStorage", type : "Temp"};
HHStoredVars.HHAuto_Temp_HaremSize = { storage : "sessionStorage", type : "Temp", isValid:/{"count":(\d)+,"count_date":(\d)+}/};
*/

var updateData = function () {
    //logHHAuto("updating UI");
    document.querySelectorAll("div#sMenu input[pattern]").forEach(currentInput =>
                                                                  {
        currentInput.checkValidity();
    });
    if (Storage().HHAuto_Setting_showInfo=="true") // && busy==false // && getPage()=="home"
    {
        var Tegzd='';
        Tegzd+=(Storage().HHAuto_Setting_master==="true"?"<span style='color:LimeGreen'>HH auto ++ ON":"<span style='color:red'>HH auto ++ OFF")+'</span>';
        //Tegzd+=(Storage().HHAuto_Setting_master==="true"?"<span style='color:LimeGreen'>"+getTextForUI("master","elementText")+" : ON":"<span style='color:red'>"+getTextForUI("master","elementText")+" : OFF")+'</span>';
        //Tegzd+=getTextForUI("master","elementText")+' : '+(Storage().HHAuto_Setting_master==="true"?"<span style='color:LimeGreen'>ON":"<span style='color:red'>OFF")+'</span>';
        if (Storage().HHAuto_Setting_paranoia=="true")
        {
            Tegzd += '<br>'+sessionStorage.HHAuto_Temp_pinfo+': '+getTimeLeft('paranoiaSwitch');
        }
        if (getHHScriptVars('isEnabledTrollBattle',false) && Storage().HHAuto_Setting_autoTrollBattle=="true")
        {
            Tegzd += '<br>'+getTextForUI("autoTrollTitle","elementText")+' : '+getHHVars('Hero.energies.fight.amount')+'/'+getHHVars('Hero.energies.fight.max_amount');
        }
        if (getHHScriptVars("isEnabledSalary",false) && Storage().HHAuto_Setting_autoSalary=="true")
        {
            Tegzd += '<br>'+getTextForUI("autoSalary","elementText")+' : '+getTimeLeft('nextSalaryTime');
        }
        if (getHHScriptVars('isEnabledSeason',false) && Storage().HHAuto_Setting_autoSeason=="true")
        {
            Tegzd += '<br>'+getTextForUI("autoSeasonTitle","elementText")+' : '+getHHVars('Hero.energies.kiss.amount')+'/'+getHHVars('Hero.energies.kiss.max_amount')+' ('+getTimeLeft('nextSeasonTime')+')';
        }
        if (getHHScriptVars('isEnabledLeagues',false) && Storage().HHAuto_Setting_autoLeagues=="true")
        {
            Tegzd += '<br>'+getTextForUI("autoLeaguesTitle","elementText")+' : '+getHHVars('Hero.energies.challenge.amount')+'/'+getHHVars('Hero.energies.challenge.max_amount')+' ('+getTimeLeft('nextLeaguesTime')+')';
        }
        if (getHHScriptVars("isEnabledChamps",false) && Storage().HHAuto_Setting_autoChamps=="true")
        {
            Tegzd += '<br>'+getTextForUI("autoChampsTitle","elementText")+' : '+getTimeLeft('nextChampionTime');
        }
        if (getHHScriptVars("isEnabledClubChamp",false) && Storage().HHAuto_Setting_autoClubChamp=="true")
        {
            Tegzd += '<br>'+getTextForUI("autoClubChamp","elementText")+' : '+getTimeLeft('nextClubChampionTime');
        }
        if (getHHScriptVars('isEnabledPantheon',false) && Storage().HHAuto_Setting_autoPantheon=="true")
        {
            Tegzd += '<br>'+getTextForUI("autoPantheonTitle","elementText")+' : '+getHHVars('Hero.energies.worship.amount')+'/'+getHHVars('Hero.energies.worship.max_amount')+' ('+getTimeLeft('nextPantheonTime')+')';
        }
        if (getHHScriptVars("isEnabledShop",false))
        {
            Tegzd += '<br>'+getTextForUI("autoBuy","elementText")+' : '+getTimeLeft('nextShopTime');
        }
        if (getHHScriptVars("isEnabledMission",false) && Storage().HHAuto_Setting_autoMission=="true")
        {
            Tegzd += '<br>'+getTextForUI("autoMission","elementText")+' : '+getTimeLeft('nextMissionTime');
        }
        if (getHHScriptVars("isEnabledContest",false) && Storage().HHAuto_Setting_autoContest=="true")
        {
            Tegzd += '<br>'+getTextForUI("autoContest","elementText")+' : '+getTimeLeft('nextContestTime');
        }
        if (getHHScriptVars("isEnabledPowerPlaces",false) && Storage().HHAuto_Setting_autoPowerPlaces=="true")
        {
            Tegzd += '<br>'+getTextForUI("autoPowerPlaces","elementText")+' : '+getTimeLeft('minPowerPlacesTime');
        }
        if ( getHHScriptVars("isEnabledPachinko",false) && Storage().HHAuto_Setting_autoFreePachinko=="true")
        {
            if (getTimer('nextPachinkoTime') !== -1)
            {
                Tegzd += '<br>'+getTextForUI("autoFreePachinko","elementText")+' : '+getTimeLeft('nextPachinkoTime');
            }
            if (getTimer('nextPachinko2Time') !== -1)
            {
                Tegzd += '<br>'+getTextForUI("autoMythicPachinko","elementText")+' : '+getTimeLeft('nextPachinko2Time');
            }
        }
        if (getTimer('eventMythicNextWave') !== -1)
        {
            Tegzd += '<br>'+getTextForUI("mythicGirlNext","elementText")+' : '+getTimeLeft('eventMythicNextWave');
        }
        Tegzd += '<br>'+getTextForUI("autoAffW","elementText")+' : '+sessionStorage.HHAuto_Temp_haveAff;
        Tegzd += '<br>'+getTextForUI("autoExpW","elementText")+' : '+sessionStorage.HHAuto_Temp_haveExp;
        //if (Tegzd.length>0)
        //{
        document.getElementById('pInfo').style.display='block';
        document.getElementById('pInfo').innerHTML =Tegzd;  //document.getElementById('pInfo').textContent=Tegzd;
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
    let menuIDList =["isEnabledDailyRewards","isEnabledMission","isEnabledContest","isEnabledTrollBattle","isEnabledPowerPlaces","isEnabledSalary","isEnabledPachinko","isEnabledQuest","isEnabledSeason","isEnabledLeagues","isEnabledAllChamps","isEnabledChamps","isEnabledClubChamp","isEnabledPantheon","isEnabledShop"];
    for (let menu of menuIDList)
    {
        if ( document.getElementById(menu) !== null && getHHScriptVars(menu,false) !== null && !getHHScriptVars(menu,false) )
        {
            document.getElementById(menu).style.visibility = "hidden";
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

var start = function () {

    if (unsafeWindow.Hero===undefined)
    {
        logHHAuto('???no Hero???');
        $('.hh_logo').click();
        return;
    }
    checkClubStatus();
    replaceCheatClick();
    migrateHHVars();

    $('.redirect.gay').hide();
    $('.redirect.comix').hide();

    $('#starter_offer').hide();
    $('#starter_offer_background').hide();

    if (sessionStorage.HHAuto_Temp_Timers)
    {
        Timers=JSON.parse(sessionStorage.HHAuto_Temp_Timers);
    }
    clearEventData("onlyCheckEventsHHScript");
    setDefaults();

    // Add UI buttons.
    let sMenu ='<div id="sMenu" style="top: 45px;right: 52px;padding: 4px;display: none;opacity: 1;border-radius: 4px;border: 1px solid #ffa23e;background-color: #1e261e;font-size:x-small; position:absolute; text-align:left; flex-direction:column; justify-content:space-between; z-index:10000">'

    //dialog Boxes
    //+ '<dialog id="LoadDialog"> <form method="dialog"><p>After you select the file the settings will be automatically updated.</p><p> If nothing happened, then the selected file contains errors.</p><p id="LoadConfError"style="color:#f53939;"></p><p><label><input type="file" id="myfile" accept=".json" name="myfile"> </label></p> <menu> <button value="cancel">'+getTextForUI("OptionCancel","elementText")+'</button></menu> </form></dialog>'
    /*+ '<dialog id="DebugDialog" style="overflow:visible"><form method="dialog">'
                     +   '<div style="padding:10px; display:flex;flex-direction:column">'
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
                     + '<menu> <button value="cancel">'+getTextForUI("OptionCancel","elementText")+'</button></menu></form></dialog>'*/

    // _row of 3 columns_
    + '<div class="optionsRow">'  //+ '<div style="display:flex;flex-direction:row;">'

    // |column 1|
    +  '<div class="optionsColumn">'  // style="justify-content: flex-start"
    // Title
    //+   '<div class="optionsBox">'
    +   '<div style="padding:3px; display:flex; flex-direction:column;">'
    +    '<span>HH Automatic ++</span>'
    +    '<span style="font-size:smaller; padding-bottom:10px">Version '+GM_info.script.version+'</span>'
    //+   '</div>'
    // Top buttons
    //+   '<div class="optionsBox">'
    +    '<div class="internalOptionsRow" style="padding:3px">'
    +     '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("gitHub","tooltip")+'</span><label class="myButton" id="git">'+getTextForUI("gitHub","elementText")+'</label></div>'
    +     '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("DebugMenu","tooltip")+'</span><label class="myButton" id="DebugMenu">'+getTextForUI("DebugMenu","elementText")+'</label></div>'
    +    '</div>'
    +    '<div class="internalOptionsRow" style="padding:3px">'
    +     '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("saveConfig","tooltip")+'</span><label class="myButton" id="saveConfig">'+getTextForUI("saveConfig","elementText")+'</label></div>'
    +     '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("loadConfig","tooltip")+'</span><label class="myButton" id="loadConfig">'+getTextForUI("loadConfig","elementText")+'</label></div>'
    +    '</div>'
    +    '<div class="internalOptionsRow" style="padding:3px">'
    +     '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("saveDefaults","tooltip")+'</span><label class="myButton" id="saveDefaults">'+getTextForUI("saveDefaults","elementText")+'</label></div>'
    +    '</div>'
    +   '</div>'
    // Region global
    +   '<div class="optionsBoxWithTitle">'
    +    '<div class="optionsBoxTitle">'
    +     '<img class="iconImg" src="https://hh2.hh-content.com/design/menu/panel.svg" />'  //width="12px" height="15px"
    +     '<span class="optionsBoxTitle">'+getTextForUI("globalTitle","elementText")+'</span>'
    +    '</div>'
    +    '<div class="rowOptionsBox">'  //+    '<div class="optionsBox" style="flex-direction:row; align-items:flex-end">'
    +     '<div class="optionsColumn">'  //+     '<div style="padding:3px; display:flex; flex-direction:column;">'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("master","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("master","tooltip")+'</span><label class="switch"><input id="master" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("paranoia","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("paranoia","tooltip")+'</span><label class="switch"><input id="paranoia" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div id="isEnabledDailyRewards" class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("collectDailyRewards","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("collectDailyRewards","tooltip")+'</span><label class="switch"><input id="collectDailyRewards" type="checkbox"><span class="slider round"></span></label></div></div>'
    +     '</div>'
    +     '<div class="optionsColumn">'  //+     '<div style="padding:3px; display:flex; flex-direction:column">'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("settPerTab","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("settPerTab","tooltip")+'</span><label class="switch"><input id="settPerTab" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("paranoiaSpendsBefore","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("paranoiaSpendsBefore","tooltip")+'</span><label class="switch"><input id="paranoiaSpendsBefore" type="checkbox"><span class="slider round"></span></label></div></div>'
    +     '</div>'
    +    '</div>'
    +   '</div>'
    // End region global

    // Region kobans
    +   '<div class="rowOptionsBox">'  //+   '<div class="optionsBox">'
    //+    '<div class="internalOptionsRow">'
    +     '<div class="labelAndButton">' // start img and label
    +      '<span class="HHMenuItemName" style="padding-bottom:2px">'+getTextForUI("spendKobans0","elementText")+'</span>'
    +      '<div class="imgAndObjectRow">'  //+      '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    +       '<img class="iconImg" src="https://hh2.hh-content.com/design/menu/affil_prog.svg" />'  //height="20px" width="20px"
    +       '<div style="padding-left:5px">'
    +        '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("spendKobans0","tooltip")+'</span><label class="switch"><input id="spendKobans0" type="checkbox"><span class="slider round kobans"></span></label></div>'
    +       '</div>'
    +      '</div>'
    +     '</div>' // end img and label

    +     '<div class="labelAndButton">' // start img and label
    +      '<span class="HHMenuItemName" style="padding-bottom:2px">'+getTextForUI("kobanBank","elementText")+'</span>'
    +      '<div class="imgAndObjectRow">'  //+      '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    +       '<img class="iconImg" src="https://hh2.hh-content.com/design/ic_HC.png" />'  //height="20px" width="20px"
    +       '<div style="padding-left:5px">'
    +        '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("kobanBank","tooltip")+'</span><input id="kobanBank" style="text-align:right; width:45px" required pattern="'+HHAuto_inputPattern.nWith1000sSeparator+'" type="text"></div>'
    +       '</div>'
    +      '</div>'
    +     '</div>' // end img and label

    //+     '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("kobanBank","elementText")+'</span>  //<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("kobanBank","tooltip")+'</span><input id="kobanBank" style="width:70%" required pattern="'+HHAuto_inputPattern.nWith1000sSeparator+'" type="text"></div></div>'
    +   '</div>'
    // End region kobans

    // Region display
    +   '<div class="optionsBoxWithTitle">'
    +    '<div class="optionsBoxTitle">'
    +     '<img class="iconImg" src="https://hh2.hh-content.com/design/menu/sex_friends.svg" />'  //width="12px" height="15px"
    +     '<span class="optionsBoxTitle">'+getTextForUI("displayTitle","elementText")+'</span>'
    +    '</div>'
    +    '<div class="rowOptionsBox">'  //+    '<div class="optionsBox" style="flex-direction:row; align-items:flex-end">'  //+    '<div class="optionsBox" style="flex-direction:row">'
    +     '<div class="optionsColumn">'  //+     '<div style="padding:3px; display:flex; flex-direction:column">'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("showInfo","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("showInfo","tooltip")+'</span><label class="switch"><input id="showInfo" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("showTooltips","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("showTooltips","tooltip")+'</span><label class="switch"><input id="showTooltips" type="checkbox"><span class="slider round"></span></label></div></div>'
    +     '</div>'
    +     '<div class="optionsColumn">'  //+     '<div style="padding:3px; display:flex; flex-direction:column;">'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("showCalculatePower","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("showCalculatePower","tooltip")+'</span><label class="switch"><input id="showCalculatePower" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("PoAMaskRewards","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("PoAMaskRewards","tooltip")+'</span><label class="switch"><input id="PoAMaskRewards" type="checkbox"><span class="slider round"></span></label></div></div>'
    +     '</div>'
    +    '</div>'
    +   '</div>'
    // End region display
    +  '</div>'
    // |End column 1|

    // |Colmumn 2|
    +  '<div class="optionsColumn">'
    // _Line 1_
    +  '<div class="optionsRow">'  //+   '<div style="display: flex;flex-direction: row;justify-content: space-between">'

    //Region activities
    +   '<div class="optionsBoxWithTitle">'
    +    '<div class="optionsBoxTitle">'
    +     '<img class="iconImg" src="https://hh2.hh-content.com/design/menu/missions.svg" />'  //width="15px" height="15px"
    +     '<span class="optionsBoxTitle">'+getTextForUI("autoActivitiesTitle","elementText")+'</span>'
    +    '</div>'
    +    '<div class="optionsBox">'
    +     '<div class="internalOptionsRow">'
    +      '<div id="isEnabledMission" class="internalOptionsRow">'
    +       '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoMission","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoMission","tooltip")+'</span><label class="switch"><input id="autoMission" type="checkbox"><span class="slider round"></span></label></div></div>'
    +       '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoMissionCollect","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoMissionCollect","tooltip")+'</span><label class="switch"><input id="autoMissionCollect" type="checkbox"><span class="slider round"></span></label></div></div>'
    +       '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoMissionKFirst","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoMissionKFirst","tooltip")+'</span><label class="switch"><input id="autoMissionKFirst" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '</div>'
    +      '<div id="isEnabledContest" class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoContest","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoContest","tooltip")+'</span><label class="switch"><input id="autoContest" type="checkbox"><span class="slider round"></span></label></div></div>'
    +     '</div>'

    +     '<div id="isEnabledPowerPlaces" class="internalOptionsRow">'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoPowerPlaces","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoPowerPlaces","tooltip")+'</span><label class="switch"><input id="autoPowerPlaces" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoPowerPlacesIndexFilter","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoPowerPlacesIndexFilter","tooltip")+'</span><input id="autoPowerPlacesIndexFilter" required pattern="'+HHAuto_inputPattern.autoPowerPlacesIndexFilter+'" type="text"></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoPowerPlacesAll","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoPowerPlacesAll","tooltip")+'</span><label class="switch"><input id="autoPowerPlacesAll" type="checkbox"><span class="slider round"></span></label></div></div>'
    +     '</div>'
    +    '</div>'
    +   '</div>'
    // End region activities

    +   '<div class="optionsColumn">'  //+   '<div style="display: flex;flex-direction: column;justify-content: space-between">'
    // Region salary
    +   '<div class="optionsBoxTitle"></div>'
    +    '<div id="isEnabledSalary" class="rowOptionsBox">'  //+   '<div class="optionsBox">'
    +    '<div class="internalOptionsRow">'
    +     '<div class="labelAndButton">' // start img and label
    +      '<span class="HHMenuItemName" style="padding-bottom:2px">'+getTextForUI("autoSalary","elementText")+'</span>'
    +      '<div class="imgAndObjectRow">'  //+      '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    +       '<img class="iconImg" src="https://hh2.hh-content.com/pictures/design/harem.svg" />'  //height="20px" width="20px"
    +       '<div style="padding-left:5px">'
    +        '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoSalary","tooltip")+'</span><label class="switch"><input id="autoSalary" type="checkbox"><span class="slider round"></span></label></div>'
    +       '</div>'
    +      '</div>'
    +     '</div>' // end img and label
    +     '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoSalaryMinSalary","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoSalaryMinSalary","tooltip")+'</span><input id="autoSalaryMinSalary" style="text-align:right; width:45px" required pattern="'+HHAuto_inputPattern.nWith1000sSeparator+'" type="text"></div></div>'
    +     '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoSalaryMaxTimer","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoSalaryMaxTimer","tooltip")+'</span><input id="autoSalaryMaxTimer" style="text-align:right; width:45px" required pattern="'+HHAuto_inputPattern.nWith1000sSeparator+'" type="text"></div></div>'
    +    '</div>'
    +   '</div>'
    // End region salary

    +  '<div class="optionsRow">'  //+   '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    // Region pachinko
    +    '<div id="isEnabledPachinko" class="rowOptionsBox">'  //+   '<div class="optionsBox">'
    +    '<div class="internalOptionsRow" style="justify-content: space-between">'
    +     '<div class="labelAndButton">' // start img and label
    +      '<span class="HHMenuItemName" style="padding-bottom:2px">'+getTextForUI("autoFreePachinko","elementText")+'</span>'
    +      '<div class="imgAndObjectRow">'  //+      '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    +       '<img class="iconImg" src="https://hh2.hh-content.com/design/menu/pachinko.svg" />'  //height="20px" width="20px"
    +       '<div style="padding-left:5px">'
    +        '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoFreePachinko","tooltip")+'</span><label class="switch"><input id="autoFreePachinko" type="checkbox"><span class="slider round"></span></label></div>'
    +       '</div>'
    +      '</div>'
    +     '</div>' // end img and label
    +    '</div>'
    +   '</div>'
    // End region pachinko

    // Region quest
    +    '<div id="isEnabledQuest" class="rowOptionsBox">'  //+   '<div class="optionsBox" style="flex-direction:row; align-items:flex-end">'  //+   '<div class="optionsBox">'
    +    '<div class="internalOptionsRow">'
    +     '<div class="labelAndButton">' // start img and label
    +      '<span class="HHMenuItemName" style="padding-bottom:2px">'+getTextForUI("autoQuest","elementText")+'</span>'
    +      '<div class="imgAndObjectRow">'  //+      '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    +       '<img class="iconImg" src="https://hh2.hh-content.com/design/menu/forward.svg" />'  //height="20px" width="20px"
    +       '<div style="padding-left:5px">'
    +        '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoQuest","tooltip")+'</span><label class="switch"><input id="autoQuest" type="checkbox"><span class="slider round"></span></label></div>'
    +       '</div>'
    +      '</div>'
    +     '</div>' // end img and label

    +     '<div class="labelAndButton">' // start img and label
    +      '<span class="HHMenuItemName" style="padding-bottom:2px">'+getTextForUI("autoQuestThreshold","elementText")+'</span>'
    +      '<div class="imgAndObjectRow">'  //+      '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    +       '<img class="iconImg" src="https://hh2.hh-content.com/design/ic_Energy.png" />'  //height="20px" width="20px"
    +       '<div style="padding-left:5px">'
    +        '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoQuestThreshold","tooltip")+'</span><input style="text-align:center; width:25px" id="autoQuestThreshold" required pattern="'+HHAuto_inputPattern.autoQuestThreshold+'" type="text"></div>'
    +       '</div>'
    +      '</div>'
    +     '</div>' // end img and label

    //+     '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoQuestThreshold","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoQuestThreshold","tooltip")+'</span><input style="width:50px" id="autoQuestThreshold" required pattern="'+HHAuto_inputPattern.autoQuestThreshold+'" type="text"></div></div>'
    +    '</div>'
    +   '</div>'
    // End region quest
    +   '</div>'
    +   '</div>'
    +   '</div>'

    // _Line 2_
    +  '<div class="optionsRow">'  //+   '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    // Region autoSeason
    +   '<div id="isEnabledSeason" class="optionsBoxWithTitle">'
    +    '<div class="optionsBoxTitle">'
    +     '<img class="iconImg" src="https://hh2.hh-content.com/design/menu/seasons.svg" />'  //width="15px" height="15px"
    +     '<span class="optionsBoxTitle">'+getTextForUI("autoSeasonTitle","elementText")+'</span>'
    +    '</div>'
    +    '<div class="optionsBox">'
    +     '<div class="internalOptionsRow">'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoSeason","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoSeason","tooltip")+'</span><label class="switch"><input id="autoSeason" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoSeasonCollect","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoSeasonCollect","tooltip")+'</span><label class="switch"><input id="autoSeasonCollect" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("SeasonMaskRewards","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("SeasonMaskRewards","tooltip")+'</span><label class="switch"><input id="SeasonMaskRewards" type="checkbox"><span class="slider round"></span></label></div></div>'
    +     '</div>'
    +     '<div class="internalOptionsRow">'
    //+      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("calculatePowerLimits","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("calculatePowerLimits","tooltip")+'</span><input id="calculatePowerLimits" style="text-align:center; width:80%" required pattern="'+HHAuto_inputPattern.calculatePowerLimits+'" type="text"></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoSeasonPassReds","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoSeasonPassReds","tooltip")+'</span><label  class="switch"><input id="autoSeasonPassReds" type="checkbox"><span class="slider round kobans"></span></label></div></div>'

    +      '<div class="labelAndButton">' // start img and label
    +       '<span class="HHMenuItemName" style="padding-bottom:2px">'+getTextForUI("autoSeasonThreshold","elementText")+'</span>'
    +       '<div class="imgAndObjectRow">'  //+      '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    +        '<img class="iconImg" src="https://hh2.hh-content.com/pictures/design/ic_kiss.png" />'  //height="20px" width="20px"
    +        '<div style="padding-left:5px">'
    +         '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoSeasonThreshold","tooltip")+'</span><input style="text-align:center; width:25px" id="autoSeasonThreshold" required pattern="'+HHAuto_inputPattern.autoSeasonThreshold+'" type="text"></div>'
    +        '</div>'
    +       '</div>'
    +      '</div>' // end img and label

    //+      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoSeasonThreshold","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoSeasonThreshold","tooltip")+'</span><input style="width:50px" id="autoSeasonThreshold" required pattern="'+HHAuto_inputPattern.autoSeasonThreshold+'" type="text"></div></div>'
    +     '</div>'
    +    '</div>'
    +   '</div>'
    // End region autoSeason

    // Region autoLeagues
    +   '<div id="isEnabledLeagues" class="optionsBoxWithTitle">'
    +    '<div class="optionsBoxTitle">'
    +     '<img class="iconImg" src="https://hh2.hh-content.com/design/menu/leaderboard.svg" />'  //width="15px" height="15px"
    +     '<span class="optionsBoxTitle">'+getTextForUI("autoLeaguesTitle","elementText")+'</span>'
    +    '</div>'
    +    '<div class="optionsBox">'
    +     '<div class="internalOptionsRow">'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoLeagues","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoLeagues","tooltip")+'</span><label class="switch"><input id="autoLeagues" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton" style="align-items:center"><span class="HHMenuItemName">'+getTextForUI("autoLeaguesPowerCalc","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoLeaguesPowerCalc","tooltip")+'</span><label class="switch"><input id="autoLeaguesPowerCalc" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton" style="align-items:right"><span class="HHMenuItemName">'+getTextForUI("autoLeaguesCollect","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoLeaguesCollect","tooltip")+'</span><label class="switch"><input id="autoLeaguesCollect" type="checkbox"><span class="slider round"></span></label></div></div>'
    +     '</div>'
    +     '<div class="internalOptionsRow">'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoLeaguesSelector","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoLeaguesSelector","tooltip")+'</span><select id="autoLeaguesSelector"></select></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoLeaguesAllowWinCurrent","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoLeaguesAllowWinCurrent","tooltip")+'</span><label class="switch"><input id="autoLeaguesAllowWinCurrent" type="checkbox"><span class="slider round"></span></label></div></div>'

    +      '<div class="labelAndButton">' // start img and label
    +       '<span class="HHMenuItemName" style="padding-bottom:2px">'+getTextForUI("autoLeaguesThreshold","elementText")+'</span>'
    +       '<div class="imgAndObjectRow">'  //+      '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    +        '<img class="iconImg" src="https://hh2.hh-content.com/league_points.png" />'  //height="20px" width="20px"
    +        '<div style="padding-left:5px">'
    +         '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoLeaguesThreshold","tooltip")+'</span><input style="text-align:center; width:25px" id="autoLeaguesThreshold" required pattern="'+HHAuto_inputPattern.autoLeaguesThreshold+'"type="text"></div>'
    +        '</div>'
    +       '</div>'
    +      '</div>' // end img and label

    //+      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoLeaguesThreshold","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoLeaguesThreshold","tooltip")+'</span><input style="width:50px" id="autoLeaguesThreshold" required pattern="'+HHAuto_inputPattern.autoLeaguesThreshold+'"type="text"></div></div>'
    +     '</div>'
    +    '</div>'
    +   '</div>'
    // End region autoLeagues
    +   '</div>'

    // Region autoTroll
    // Title
    +   '<div id="isEnabledTrollBattle" class="optionsBoxWithTitle">'
    +    '<div class="optionsBoxTitle">'
    +     '<img class="iconImg" src="https://hh2.hh-content.com/design/menu/map.svg" />'  //width="15px" height="15px"
    +     '<span class="optionsBoxTitle">'+getTextForUI("autoTrollTitle","elementText")+'</span>'
    +    '</div>'
    +    '<div class="optionsBox">'

    // _Line 1_
    +     '<div class="internalOptionsRow" style="justify-content: space-between">'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoTrollBattle","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoTrollBattle","tooltip")+'</span><label class="switch"><input id="autoTrollBattle" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoTrollSelector","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoTrollSelector","tooltip")+'</span><select id="autoTrollSelector"></select></div></div>'

    +      '<div class="labelAndButton">' // start img and label
    +       '<span class="HHMenuItemName" style="padding-bottom:2px">'+getTextForUI("autoTrollThreshold","elementText")+'</span>'
    +       '<div class="imgAndObjectRow">'  //+      '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    +        '<img class="iconImg" src="https://hh.hh-content.com/design/ic_BattlePts.png" />'  //height="20px" width="20px"
    +        '<div style="padding-left:5px">'
    +         '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoTrollThreshold","tooltip")+'</span><input style="text-align:center; width:25px" id="autoTrollThreshold" required pattern="'+HHAuto_inputPattern.autoTrollThreshold+'" type="text"></div>'
    +        '</div>'
    +       '</div>'
    +      '</div>' // end img and label
    //+      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoTrollThreshold","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoTrollThreshold","tooltip")+'</span><input style="width:50px" id="autoTrollThreshold" required pattern="'+HHAuto_inputPattern.autoTrollThreshold+'" type="text"></div></div>'
    +     '</div>'

    // _Line 2_
    +     '<div class="internalOptionsRow">'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("useX10Fights","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("useX10Fights","tooltip")+'</span><label class="switch"><input id="useX10Fights" type="checkbox"><span class="slider round kobans"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("useX10FightsAllowNormalEvent","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("useX10FightsAllowNormalEvent","tooltip")+'</span><label class="switch"><input id="useX10FightsAllowNormalEvent" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("minShardsX10","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("minShardsX10","tooltip")+'</span><input id="minShardsX10" style="text-align:center; width:7em" required pattern="'+HHAuto_inputPattern.minShardsX+'"type="text"></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("useX50Fights","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("useX50Fights","tooltip")+'</span><label class="switch"><input id="useX50Fights" type="checkbox"><span class="slider round kobans"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("useX50FightsAllowNormalEvent","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("useX50FightsAllowNormalEvent","tooltip")+'</span><label class="switch"><input id="useX50FightsAllowNormalEvent" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("minShardsX50","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("minShardsX50","tooltip")+'</span><input id="minShardsX50" style="text-align:center; width:7em" required pattern="'+HHAuto_inputPattern.minShardsX+'" type="text"></div></div>'
    +     '</div>'

    // _Line 3_
    +     '<div class="internalOptionsRow">'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("plusEvent","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("plusEvent","tooltip")+'</span><label class="switch"><input id="plusEvent" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("eventTrollOrder","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("eventTrollOrder","tooltip")+'</span><input id="eventTrollOrder" style="width:120px" required pattern="'+HHAuto_inputPattern.eventTrollOrder+'"type="text"></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("buyCombat","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("buyCombat","tooltip")+'</span><label class="switch"><input id="buyCombat" type="checkbox"><span class="slider round kobans"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("buyCombTimer","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("buyCombTimer","tooltip")+'</span><input id="buyCombTimer" style="text-align:center; width:50%" required pattern="'+HHAuto_inputPattern.buyCombTimer+'" type="text"></div></div>'
    +     '</div>'

    // _Line 4_
    +     '<div class="internalOptionsRow">'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("plusEventMythic","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("plusEventMythic","tooltip")+'</span><label class="switch"><input id="plusEventMythic" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoTrollMythicByPassParanoia","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoTrollMythicByPassParanoia","tooltip")+'</span><label class="switch"><input id="autoTrollMythicByPassParanoia" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("buyMythicCombat","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("buyMythicCombat","tooltip")+'</span><label class="switch"><input id="buyMythicCombat" type="checkbox"><span class="slider round kobans"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("buyMythicCombTimer","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("buyMythicCombTimer","tooltip")+'</span><input id="buyMythicCombTimer" style="text-align:center; width:50%" required pattern="'+HHAuto_inputPattern.buyMythicCombTimer+'" type="text"></div></div>'
    +     '</div>'
    +    '</div>'
    +   '</div>'
    // End region autoTroll

    +  '</div>'
    // |End column 2|

    // |Column 3|
    +  '<div class="optionsColumn">'
    // Region champions
    +   '<div id="isEnabledAllChamps" class="optionsBoxWithTitle">'
    +    '<div class="optionsBoxTitle">'
    +     '<img class="iconImg" src="https://hh2.hh-content.com/design/menu/ic_champions.svg" />'  //width="15px" height="15px"
    +     '<span class="optionsBoxTitle">'+getTextForUI("autoChampsTitle","elementText")+'</span>'
    +    '</div>'
    +    '<div class="optionsBox">'
    // _Line 1_
    +     '<div id="isEnabledChamps" class="internalOptionsRow">'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoChamps","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoChamps","tooltip")+'</span><label class="switch"><input id="autoChamps" type="checkbox"><span class="slider round"></span></label></div></div>'

    +      '<div class="labelAndButton">' // start img and label
    +       '<span class="HHMenuItemName" style="padding-bottom:2px">'+getTextForUI("autoChampsUseEne","elementText")+'</span>'
    +       '<div class="imgAndObjectRow">'  //+      '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    +        '<img class="iconImg" src="https://hh2.hh-content.com/design/ic_Energy.png" />'  //height="20px" width="20px"
    +        '<div style="padding-left:5px">'
    +         '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoChampsUseEne","tooltip")+'</span><label class="switch"><input id="autoChampsUseEne" type="checkbox"><span class="slider round"></span></label></div>'
    +        '</div>'
    +       '</div>'
    +      '</div>' // end img and label

    //+      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoChampsUseEne","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoChampsUseEne","tooltip")+'</span><label class="switch"><input id="autoChampsUseEne" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoChampsFilter","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoChampsFilter","tooltip")+'</span><input style="text-align:center; width:70px" id="autoChampsFilter" required pattern="'+HHAuto_inputPattern.autoChampsFilter+'" type="text"></div></div>'
    +     '</div>'
    //+    '</div>'
    // _Line 2_
    //+    '<div class="optionsBox">'
    +     '<div id="isEnabledClubChamp" class="internalOptionsRow">'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoClubChamp","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoClubChamp","tooltip")+'</span><label class="switch"><input id="autoClubChamp" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoClubForceStart","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoClubForceStart","tooltip")+'</span><label class="switch"><input id="autoClubForceStart" type="checkbox"><span class="slider round"></span></label></div></div>'

    +      '<div class="labelAndButton" style="align-items: flex-end;">' // start img and label
    +       '<span class="HHMenuItemName" style="padding-bottom:2px">'+getTextForUI("autoClubChampMax","elementText")+'</span>'
    +       '<div class="imgAndObjectRow">'  //+      '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    +        '<img class="iconImg" src="https://hh2.hh-content.com/pictures/design/champion_ticket.png" />'  //height="20px" width="20px"
    +        '<div style="padding-left:5px">'
    +         '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoClubChampMax","tooltip")+'</span><input style="text-align:center; width:45px" id="autoClubChampMax" required pattern="'+HHAuto_inputPattern.autoClubChampMax+'" type="text"></div>'
    +        '</div>'
    +       '</div>'
    +      '</div>' // end img and label

    //+      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoClubChampMax","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoClubChampMax","tooltip")+'</span><input style="width:70px" id="autoClubChampMax" required pattern="'+HHAuto_inputPattern.autoClubChampMax+'" type="text"></div></div>'
    +     '</div>'
    +    '</div>'
    +   '</div>'
    // End region champions
    // Region Pantheon
    +   '<div id="isEnabledPantheon" class="optionsBoxWithTitle">'
    +    '<div class="optionsBoxTitle">'
    +     '<img class="iconImg" src="https://hh2.hh-content.com/design/menu/ic_champions.svg" />'  //width="15px" height="15px"
    +     '<span class="optionsBoxTitle">'+getTextForUI("autoPantheonTitle","elementText")+'</span>'
    +    '</div>'
    +    '<div class="optionsBox">'
    +     '<div class="internalOptionsRow" style="justify-content: space-between">'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoPantheon","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoPantheon","tooltip")+'</span><label class="switch"><input id="autoPantheon" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton">' // start img and label
    +       '<span class="HHMenuItemName" style="padding-bottom:2px">'+getTextForUI("autoPantheonThreshold","elementText")+'</span>'
    +       '<div class="imgAndObjectRow">'  //+      '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    +        '<img class="iconImg" src="https://hh.hh-content.com/pictures/design/ic_worship.svg" />'  //height="20px" width="20px"
    +        '<div style="padding-left:5px">'
    +         '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoPantheonThreshold","tooltip")+'</span><input style="text-align:center; width:25px" id="autoPantheonThreshold" required pattern="'+HHAuto_inputPattern.autoPantheonThreshold+'" type="text"></div>'
    +        '</div>'
    +       '</div>'
    +      '</div>' // end img and label
    +     '</div>'
    +    '</div>'
    +   '</div>'
    // End region Pantheon

    // Region market
    +   '<div id="isEnabledShop" class="optionsBoxWithTitle">'
    +    '<div class="optionsBoxTitle">'
    +     '<img class="iconImg" src="https://hh2.hh-content.com/design/menu/shop.svg" />'  //width="15px" height="15px"
    +     '<span class="optionsBoxTitle">'+getTextForUI("autoBuy","elementText")+'</span>'
    +    '</div>'
    +    '<div class="optionsBox">'
    +     '<div class="internalOptionsRow">'

    +      '<div class="labelAndButton">' // start img and label
    +       '<span class="HHMenuItemName" style="padding-bottom:2px">'+getTextForUI("autoStatsSwitch","elementText")+'</span>'
    +       '<div class="imgAndObjectRow">'  //+      '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    +        '<img class="iconImg" src="https://hh2.hh-content.com/design/ic_plus.svg" />'  //height="20px" width="20px"
    +        '<div style="padding-left:5px">'
    +         '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoStatsSwitch","tooltip")+'</span><label class="switch"><input id="autoStatsSwitch" type="checkbox"><span class="slider round"></span></label></div>'
    +        '</div>'
    +       '</div>'
    +      '</div>' // end img and label

    //+      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoStatsSwitch","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoStatsSwitch","tooltip")+'</span><label class="switch"><input id="autoStatsSwitch" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoStats","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoStats","tooltip")+'</span><input class="maxMoneyInputField" id="autoStats" required pattern="'+HHAuto_inputPattern.nWith1000sSeparator+'" type="text"></div></div>'
    +     '</div>'
    +     '<div class="internalOptionsRow">'

    +      '<div class="labelAndButton">' // start img and label
    +       '<span class="HHMenuItemName" style="padding-bottom:2px">'+getTextForUI("autoExpW","elementText")+'</span>'
    +       '<div class="imgAndObjectRow">'  //+      '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    +        '<img class="iconImg" src="https://hh2.hh-content.com/design/ic_books_gray.svg" />'  //height="20px" width="20px"
    +        '<div style="padding-left:5px">'
    +         '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoExpW","tooltip")+'</span><label class="switch"><input id="autoExpW" type="checkbox"><span class="slider round"></span></label></div>'
    +        '</div>'
    +       '</div>'
    +      '</div>' // end img and label

    //+      '<div class="labelAndButton"><span class="HHMenuItemName" class="HHMenuItemName">'+getTextForUI("autoExpW","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoExpW","tooltip")+'</span><label class="switch"><input id="autoExpW" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("maxExp","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("maxExp","tooltip")+'</span><input style="text-align:right; width:60px" id="maxExp" required pattern="'+HHAuto_inputPattern.nWith1000sSeparator+'" type="text"></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoExp","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoExp","tooltip")+'</span><input class="maxMoneyInputField" id="autoExp" required pattern="'+HHAuto_inputPattern.nWith1000sSeparator+'" type="text"></div></div>'  // style="width:100px"
    +     '</div>'
    +     '<div class="internalOptionsRow">'

    +      '<div class="labelAndButton">' // start img and label
    +       '<span class="HHMenuItemName" style="padding-bottom:2px">'+getTextForUI("autoAffW","elementText")+'</span>'
    +       '<div class="imgAndObjectRow">'  //+      '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    +        '<img class="iconImg" src="https://hh2.hh-content.com/design/ic_gifts_gray.svg" />'  //height="20px" width="20px"
    +        '<div style="padding-left:5px">'
    +         '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoAffW","tooltip")+'</span><label class="switch"><input id="autoAffW" type="checkbox"><span class="slider round"></span></label></div>'
    +        '</div>'
    +       '</div>'
    +      '</div>' // end img and label

    //+      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoAffW","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoAffW","tooltip")+'</span><label class="switch"><input id="autoAffW" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("maxAff","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("maxAff","tooltip")+'</span><input style="text-align:right; width:60px" id="maxAff" required pattern="'+HHAuto_inputPattern.nWith1000sSeparator+'" type="text"></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoAff","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoAff","tooltip")+'</span><input class="maxMoneyInputField" id="autoAff" required pattern="'+HHAuto_inputPattern.nWith1000sSeparator+'" type="text"></div></div>'
    +     '</div>'
    +     '<div class="internalOptionsRow">'

    +      '<div class="labelAndButton">' // start img and label
    +       '<span class="HHMenuItemName" style="padding-bottom:2px">'+getTextForUI("autoLGMW","elementText")+'</span>'
    +       '<div class="imgAndObjectRow">'  //+      '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    +        '<img class="iconImg" src="https://hh2.hh-content.com/design/ic_equipment_gray.svg" />'  //height="20px" width="20px"
    +        '<div style="padding-left:5px">'
    +         '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoLGMW","tooltip")+'</span><label class="switch"><input id="autoLGMW" type="checkbox"><span class="slider round"></span></label></div>'
    +        '</div>'
    +       '</div>'
    +      '</div>' // end img and label

    //+      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoLGMW","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoLGMW","tooltip")+'</span><label class="switch"><input id="autoLGMW" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoLGM","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoLGM","tooltip")+'</span><input class="maxMoneyInputField" id="autoLGM" required pattern="'+HHAuto_inputPattern.nWith1000sSeparator+'" type="text"></div></div>'
    +     '</div>'
    +     '<div class="internalOptionsRow">'

    +      '<div class="labelAndButton">' // start img and label
    +       '<span class="HHMenuItemName" style="padding-bottom:2px">'+getTextForUI("autoLGRW","elementText")+'</span>'
    +       '<div class="imgAndObjectRow">'  //+      '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    +        '<img class="iconImg" src="https://hh2.hh-content.com/pictures/misc/items_icons/16.svg" />'  //height="20px" width="20px"
    +        '<div style="padding-left:5px">'
    +         '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoLGRW","tooltip")+'</span><label class="switch"><input id="autoLGRW" type="checkbox"><span class="slider round"></span></label></div>'
    +        '</div>'
    +       '</div>'
    +      '</div>' // end img and label

    //+      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoLGRW","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoLGRW","tooltip")+'</span><label class="switch"><input id="autoLGRW" type="checkbox"><span class="slider round"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoLGR","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoLGR","tooltip")+'</span><input class="maxMoneyInputField" id="autoLGR" required pattern="'+HHAuto_inputPattern.nWith1000sSeparator+'" type="text"></div></div>'
    +     '</div>'
    +     '<div class="internalOptionsRow">'

    +      '<div class="labelAndButton">' // start img and label
    +       '<span class="HHMenuItemName" style="padding-bottom:2px">'+getTextForUI("autoBuyBoosters","elementText")+'</span>'
    +       '<div class="imgAndObjectRow">'  //+      '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    +        '<img class="iconImg" src="https://hh2.hh-content.com/design/ic_boosters_gray.svg" />'  //height="20px" width="20px"
    +        '<div style="padding-left:5px">'
    +         '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoBuyBoosters","tooltip")+'</span><label class="switch"><input id="autoBuyBoosters" type="checkbox"><span class="slider round kobans"></span></label></div>'
    +        '</div>'
    +       '</div>'
    +      '</div>' // end img and label

    //+      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoBuyBoosters","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoBuyBoosters","tooltip")+'</span><label class="switch"><input id="autoBuyBoosters" type="checkbox"><span class="slider round kobans"></span></label></div></div>'
    +      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("autoBuyBoostersFilter","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("autoBuyBoostersFilter","tooltip")+'</span><input style="text-align:center; width:70px" id="autoBuyBoostersFilter" required pattern="'+HHAuto_inputPattern.autoBuyBoostersFilter+'" type="text"></div></div>'
    +     '</div>'
    +     '<div class="internalOptionsRow">'

    +      '<div class="labelAndButton">' // start img and label
    +       '<span class="HHMenuItemName" style="padding-bottom:2px">'+getTextForUI("showMarketTools","elementText")+'</span>'
    +       '<div class="imgAndObjectRow">'  //+      '<div style="display: flex;flex-direction: row;justify-content: space-between">'
    +        '<img class="iconImg" src="https://hh2.hh-content.com/design/menu/panel.svg" />'  //height="20px" width="20px"
    +        '<div style="padding-left:5px">'
    +         '<div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("showMarketTools","tooltip")+'</span><label class="switch"><input id="showMarketTools" type="checkbox"><span class="slider round"></span></label></div>'
    +        '</div>'
    +       '</div>'
    +      '</div>' // end img and label

    //+      '<div class="labelAndButton"><span class="HHMenuItemName">'+getTextForUI("showMarketTools","elementText")+'</span><div class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("showMarketTools","tooltip")+'</span><label class="switch"><input id="showMarketTools" type="checkbox"><span class="slider round"></span></label></div></div>'
    +     '</div>'
    //+     '<div class="internalOptionsRow">'
    //+     '</div>'
    +    '</div>'
    +   '</div>'
    +  '</div>'
    // End region market
    // |End column 3|
    + '</div>'
    // _End row of 3 columns_
    +'</div>';
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

    add1000SeparatorEvent();

    addKobanUsingEvent();

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
            Storage().HHAuto_Setting_master = "false";
            masterSwitch.checked = false;
            //console.log("Master switch off");
        } else {
            Storage().HHAuto_Setting_master = "true";
            masterSwitch.checked = true;
            //console.log("Master switch on");
        }
    });
    if(getPage()=="home")
    {
        GM_addStyle('#pInfo:hover {max-height : none} #pInfo { max-height : 220px} @media only screen and (max-width: 1025px) {#pInfo { ;top:17% }}');
        /*function setpInfoHomeFolded()
        {
            pInfo.style.maxHeight = "220px";
            //pInfo.style.overflow = "auto";
        }
        setpInfoHomeFolded();
        pInfo.addEventListener("mouseover", function() { pInfo.style.maxHeight = "none"; });
        pInfo.addEventListener("mouseout", setpInfoHomeFolded);
        */

        //Storage().HHAuto_Setting_infoBoxIsHidden = "false";
        //console.log("Showing InfoBox");
    }
    else
    {
        GM_addStyle(''
                    +'#pInfo:hover {'
                    +'   padding-top : 22px;'
                    +'   height : auto;'
                    +'   left : 77%;'
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
        /*function setpInfoFolded()
        {
            pInfo.style.right = "1%";
            pInfo.style.left = "88%";
            pInfo.style.top = "7%";
            pInfo.style["z-index"]="1000";
            pInfo.style.height = "22px";
            pInfo.style["padding-top"] = "";
        }
        setpInfoFolded();
        pInfo.addEventListener("mouseover", function()
                               {
            pInfo.style["padding-top"] = "22px";
            pInfo.style.height= "auto";
            pInfo.style.left = "";
        });
        pInfo.addEventListener("mouseout", setpInfoFolded);
        */
        //Storage().HHAuto_Setting_infoBoxIsHidden = "true";
        //console.log("Hiding InfoBox");
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
    document.getElementById("loadConfig").addEventListener("click", function(){
        /*if (typeof LoadDialog.showModal === "function") {
            LoadDialog.showModal();
        } else {
            alert("The <dialog> API is not supported by this browser");
        }*/
        let LoadDialog='<p>After you select the file the settings will be automatically updated.</p><p> If nothing happened, then the selected file contains errors.</p><p id="LoadConfError"style="color:#f53939;"></p><p><label><input type="file" id="myfile" accept=".json" name="myfile"> </label></p>';
        fillHHPopUp("loadConfig",getTextForUI("loadConfig","elementText"), LoadDialog);
        document.getElementById('myfile').addEventListener('change', myfileLoad_onChange);

    });
    document.getElementById("saveConfig").addEventListener("click", saveHHVarsSettingsAsJSON);
    document.getElementById("saveDefaults").addEventListener("click", saveHHStoredVarsDefaults);
    document.getElementById("DebugMenu").addEventListener("click", function(){
        /*if (typeof DebugDialog.showModal === "function") {
            DebugDialog.showModal();
        } else {
            alert("The <dialog> API is not supported by this browser");
        }
        */
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
            //Storage().HHAuto_Setting_master="false";
        });
        currentInput.checkValidity();
    });



    sessionStorage.HHAuto_Temp_autoLoop = "true";
    if (typeof Storage().HHAuto_Temp_freshStart == "undefined" || isNaN(Number(Storage().HHAuto_Temp_autoLoopTimeMili))) {
        setDefaults(true);
    }

    if(getPage()=="shop")
    {
        updateShop();
    }

    if (getBurst())
    {
        doShopping();
        if ( Storage().HHAuto_Setting_autoStatsSwitch==="true" )
        {
            doStatUpgrades();
        }
    }

    /*if (!CollectEventData())
    {
        setTimeout(function(){CollectEventData();},5000);
    }
    */

    if (hh_nutaku)
    {
        function Alive()
        {
            window.top.postMessage({ImAlive:true},'*');
            if (sessionStorage.HHAuto_Temp_autoLoop=="true")
            {
                setTimeout(Alive,2000);
            }
        }
        Alive();
    }

    setTimeout(autoLoop,1000);
    GM_registerMenuCommand(getTextForUI("translate","elementText"),manageTranslationPopUp);
};

function manageTranslationPopUp()
{
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
        translatePopUpContent +='  <tr id="'+item+'">';
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
        console.log("test");
        let translation = `Translated to : ${currentLanguage}\n`;
        translation += `From version : ${GM_info.version}\n`;
        let hasTranslation = false;
        for ( let item of Object.keys(HHAuto_ToolTips.en))
        {
            const currentTranslatedElementText = $(`#${item} [type="elementText"]`)[0].innerHTML;
            const currentTranslatedTooltip = $(`#${item} [type="tooltip"]`)[0].innerHTML;
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
            const name='HH_TranslateTo_'+currentLanguage+'_'+Date.now()+'.txt';
            const a = document.createElement('a');
            a.download = name;
            a.href = URL.createObjectURL(new Blob([translation], {type: 'text/plain'}));
            a.click();
        }
    }
}

function switchHHMenuButton(isActive)
{
    if(document.getElementById("sMenuButton") !== null)
    {
        if (Storage().HHAuto_Setting_master === "false")
        {
            document.getElementById("sMenuButton").style["background-color"] = "red";
            document.getElementById("sMenuButton").style["background-image"] = "none";
        }
        else
        {
            if (isActive)
            {
                document.getElementById("sMenuButton").style["background-color"] = "green";
                document.getElementById("sMenuButton").style["background-image"] = "none";
            }
            else
            {
                document.getElementById("sMenuButton").style.removeProperty('background-color');
                document.getElementById("sMenuButton").style.removeProperty('background-image');
            }
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

function isHHPopUpDisplayed()
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
var hardened_start=function()
{
    if (!started)
    {
        started=true;
        start();
    }
}

$("document").ready(function()
                    {
    hardened_start();

});

setTimeout(hardened_start,5000);

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
              by const girlCount = isJSON(sessionStorage.HHAuto_Temp_HaremSize)?JSON.parse(sessionStorage.HHAuto_Temp_HaremSize).count:800;
              */
function calculateSynergiesFromTeamMemberElements(elements) {
    const counts = countElementsInTeam(elements)

    // Only care about those not included in the stats already: fire, stone, sun and water
    // Assume max harem synergy
    //const girlDictionary = (typeof(localStorage.HHPNMap) == "undefined") ? new Map(): new Map(JSON.parse(localStorage.HHPNMap));
    const girlCount = isJSON(sessionStorage.HHAuto_Temp_HaremSize)?JSON.parse(sessionStorage.HHAuto_Temp_HaremSize).count:800;
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
