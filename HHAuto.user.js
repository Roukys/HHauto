// ==UserScript==
// @name         HaremHeroes Automatic++
// @namespace    https://github.com/Roukys/HHauto
// @version      5.4.14
// @description  Open the menu in HaremHeroes(topright) to toggle AutoControlls. Supports AutoSalary, AutoContest, AutoMission, AutoQuest, AutoTrollBattle, AutoArenaBattle and AutoPachinko(Free), AutoLeagues, AutoChampions and AutoStatUpgrades. Messages are printed in local console.
// @author       JD and Dorten(a bit), roukys, cossname
// @match        http*://nutaku.haremheroes.com/*
// @match        http*://*.hentaiheroes.com/*
// @match        http*://*.gayharem.com/*
// @grant        GM_addStyle
// @license      MIT
// @updateURL   https://github.com/Roukys/HHauto/raw/main/HHAuto.user.js
// @downloadURL https://github.com/Roukys/HHauto/raw/main/HHAuto.user.js
// ==/UserScript==

//CSS Region
GM_addStyle('/* The switch - the box around the slider */ .switch { position: relative; display: inline-block; width: 40px; height: 24px; } /* Hide default HTML checkbox */ .switch input {display:none;} /* The slider */ .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; -webkit-transition: .4s; transition: .4s; } .slider.round:before { position: absolute; content: ""; height: 16px; width: 16px; left: 4px; bottom: 4px; background-color: white; -webkit-transition: .4s; transition: .4s; } input:checked + .slider { background-color: #2196F3; } input:focus + .slider { box-shadow: 0 0 1px #2196F3; } input:checked + .slider:before { -webkit-transform: translateX(16px); -ms-transform: translateX(16px); transform: translateX(16px); } /* Rounded sliders */ .slider.round { border-radius: 24px; } .slider.round:before { border-radius: 50%; }');
GM_addStyle('.myButton {box-shadow: 0px 0px 0px 2px #9fb4f2; background:linear-gradient(to bottom, #7892c2 5%, #476e9e 100%); background-color:#7892c2; border-radius:10px; border:1px solid #4e6096; display:inline-block; cursor:pointer; color:#ffffff; font-family:Arial; font-size:8px; padding:3px 10px; text-decoration:none; text-shadow:0px 1px 0px #283966;}.myButton:hover { background:linear-gradient(to bottom, #476e9e 5%, #7892c2 100%); background-color:#476e9e; } .myButton:active { position:relative; top:1px;}');
GM_addStyle('.HHEventPriority {position: absolute;z-index: 500;background-color: black;}');
GM_addStyle('.HHPopIDs {background-color: black;z-index: 500;position: absolute;margin-top: 25px}');
GM_addStyle('.tooltip:hover { cursor: help; position: relative; } .tooltip span.tooltiptext { display: none; } .tooltip:hover span.tooltiptext { border: #666 2px dotted; padding: 5px 20px 5px 5px; display: block; z-index: 100; background: #e3e3e3; left: 0px; margin: 15px; width: 200px; position: absolute; top: 15px; color: black; }');
GM_addStyle('#popup_message_league { border: #666 2px dotted; padding: 5px 20px 5px 5px; display: block; z-index: 1000; background: #e3e3e3; left: 0px; margin: 15px; width: 500px; position: absolute; top: 15px; color: black;}');
GM_addStyle('#sliding-popups#sliding-popups { z-index : 1;}');
//END CSS Region

// var d="@require      https://cdn.jsdelivr.net/js-cookie/2.2.0/js.cookie.js"

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

function logHHAuto(...args)
{
    var prefix = new Date().toISOString()+":"+getCallerCallerFunction()+":";
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
    console.log(prefix+text);
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

function getSetHeroInfos(infoSearched,newValue)
{
    var returnValue = -1;

    switch (infoSearched)
    {
        case 'carac1' :
            if ( getHero().infos.carac1 !== undefined )
            {
                returnValue = getHero().infos.carac1;
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'carac2' :
            if ( getHero().infos.carac2 !== undefined )
            {
                returnValue = getHero().infos.carac2;
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'carac3' :
            if ( getHero().infos.carac3 !== undefined )
            {
                returnValue = getHero().infos.carac3;
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'caracs.damage' :
            if ( getHero().infos.caracs.damage !== undefined )
            {
                returnValue = getHero().infos.caracs.damage;
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'caracs.def_carac1' :
            if ( getHero().infos.caracs.def_carac1 !== undefined )
            {
                returnValue = getHero().infos.caracs.def_carac1;
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'caracs.def_carac2' :
            if ( getHero().infos.caracs.def_carac2 !== undefined )
            {
                returnValue = getHero().infos.caracs.def_carac2;
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'caracs.def_carac3' :
            if ( getHero().infos.caracs.def_carac3 !== undefined )
            {
                returnValue = getHero().infos.caracs.def_carac3;
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'caracs.ego' :
            if ( getHero().infos.caracs.ego !== undefined )
            {
                returnValue = getHero().infos.caracs.ego;
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'class' :
            if ( getHero().infos.class !== undefined )
            {
                returnValue = getHero().infos.class;
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'challenge.amount' :
            if ( getHero().energies !== undefined )
            {
                returnValue = getHero().energies.challenge.amount;
                if ( newValue !== undefined )
                {
                    Hero.energies.challenge.amount = newValue;
                }
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'fight.amount' :
            if ( getHero().energies !== undefined )
            {
                returnValue = getHero().energies.fight.amount;
                if ( newValue !== undefined )
                {
                    Hero.energies.fight.amount = newValue;
                }
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'kiss.amount' :
            if ( getHero().energies !== undefined )
            {
                returnValue = getHero().energies.kiss.amount;
                if ( newValue !== undefined )
                {
                    Hero.energies.kiss.amount = newValue;
                }
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'quest.amount' :
            if ( getHero().energies !== undefined )
            {
                returnValue = getHero().energies.quest.amount;
                if ( newValue !== undefined )
                {
                    Hero.energies.quest.amount = newValue;
                }
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'fight.max_amount' :
            if ( getHero().energies !== undefined )
            {
                returnValue = getHero().energies.fight.max_amount;
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'kiss.max_amount' :
            if ( getHero().energies !== undefined )
            {
                returnValue = getHero().energies.kiss.max_amount;
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'quest.max_amount' :
            if ( getHero().energies !== undefined )
            {
                returnValue = getHero().energies.quest.max_amount;
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'challenge.max_amount' :
            if ( getHero().energies !== undefined )
            {
                returnValue = getHero().energies.challenge.max_amount;
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'soft_currency' :
            if ( getHero().infos.soft_currency !== undefined )
            {
                return getHero().infos.soft_currency;
                if ( newValue !== undefined )
                {
                    Hero.infos.soft_currency = newValue;
                }
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'hard_currency' :
            if ( getHero().infos.hard_currency !== undefined )
            {
                returnValue = getHero().infos.hard_currency;
                if ( newValue !== undefined )
                {
                    Hero.infos.hard_currency = newValue;
                }
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'level' :
            if ( getHero().infos.level !== undefined )
            {
                returnValue = getHero().infos.level;
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'questing.current_url' :
            if ( getHero().infos.questing.current_url !== undefined )
            {
                returnValue = getHero().infos.questing.current_url;
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'questing.id_world' :
            if ( getHero().infos.questing.id_world !== undefined )
            {
                returnValue = getHero().infos.questing.id_world;
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'quest.seconds_per_point' :
            if ( getHero().energies !== undefined )
            {
                returnValue = getHero().energies.quest.seconds_per_point;
                break;
            }
            else
            {
                returnValue = 450;
                break;
            }
            break;

        case 'fight.seconds_per_point' :
            if ( getHero().energies !== undefined )
            {
                returnValue = getHero().energies.fight.seconds_per_point;
                break;
            }
            else
            {
                returnValue = 1800;
                break;
            }
            break;

        case 'challenge.seconds_per_point' :
            if ( getHero().energies !== undefined )
            {
                returnValue = getHero().energies.challenge.seconds_per_point;
                break;
            }
            else
            {
                returnValue = 2100;
                break;
            }
            break;

        case 'kiss.seconds_per_point' :
            if ( getHero().energies !== undefined )
            {
                returnValue = getHero().energies.kiss.seconds_per_point;
                break;
            }
            else
            {
                returnValue = 3600;
                break;
            }
            break;

        case 'quest.next_refresh_ts' :
            if ( getHero().energies !== undefined )
            {
                returnValue = getHero().energies.quest.next_refresh_ts;
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'fight.next_refresh_ts' :
            if ( getHero().energies !== undefined )
            {
                returnValue = getHero().energies.fight.next_refresh_ts;
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'challenge.next_refresh_ts' :
            if ( getHero().energies !== undefined )
            {
                returnValue = getHero().energies.challenge.next_refresh_ts;
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;

        case 'kiss.next_refresh_ts' :
            if ( getHero().energies !== undefined )
            {
                returnValue = getHero().energies.kiss.next_refresh_ts;
                break;
            }
            else
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
            break;
        default:
            {
                logHHAuto("Hero info not found : "+infoSearched);
                returnValue = -1;
                break;
            }
    }
    return returnValue;
}

function getGirlsMap()
{
    return unsafeWindow.GirlSalaryManager.girlsMap;
}

function getPage()
{
    try{
        var ob = document.getElementById("hh_nutaku");
        if(ob===undefined || ob === null)
        {
            ob = document.getElementById("hh_gay");
        }
        if(ob===undefined || ob === null)
        {
            ob = document.getElementById("hh_hentai");
        }
        var p=ob.className.match(/.*page-(.*) .*/i)[1];
        if (p=="missions" && $('h4.contests.selected').size()>0)
        {
            return "activities"
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
                    var queryString = window.location.search;
                    var urlParams = new URLSearchParams(queryString);
                    var index = urlParams.get('index');
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
    catch(err)
    {
        return ""
    }
}

function url_add_param(url, param) {
    if (url.indexOf('?') === -1) url += '?';
    else url += '&';
    return url+param;
}

// Retruns true if on correct page.
function gotoPage(page, force = false)
{
    var cp=getPage();
    logHHAuto('going '+cp+'->'+page);
    var index;
    var originalPage = page;
    if (page.startsWith('powerplace'))
    {
        index = page.substring('powerplace'.length);
        logHHAuto('Powerplace index : '+index);
        page = 'powerplace';
    }

    if(getPage() === originalPage && !force)
    {
        if (page=='missions')
        {
            $('h4.missions').each(function(){this.click();});
        }
        if (page=='activities')
        {
            $('h4.contests').each(function(){this.click();});
        }
        if (page=='powerplace')
        {
            $('h4.pop').each(function(){this.click();});
        }
        return true;
    }
    else
    {
        var togoto = undefined;

        // get page path
        switch(page)
        {
            case "home":
                togoto = $("nav div[rel='content'] a:has(.home)").attr("href");
                break;
            case "missions":
                togoto = $("nav div[rel='content'] a:has(.activities)").attr("href");
                break;
            case "powerplace":
                togoto = $("nav div[rel='content'] a:has(.activities)").attr("href");
                break;
            case "activities":
                togoto = $("nav div[rel='content'] a:has(.activities)").attr("href");
                break;
            case "harem":
                togoto = $("nav div[rel='content'] a:has(.harem)").attr("href");
                break;
            case "map":
                togoto = $("nav div[rel='content'] a:has(.map)").attr("href");
                break;
            case "arena":
                togoto =$("nav div[rel='content'] a:has(.arena)").attr("href");
                if (togoto === undefined)
                {
                    logHHAuto("Arena page not found, disabling arena");
                    Storage().HHAuto_Setting_autoArenaBattle = "false";
                    location.reload();
                    return false;
                }
                break;
            case "pachinko":
                togoto = $("nav div[rel='content'] a:has(.pachinko)").attr("href");
                break;
            case "leaderboard":
                togoto = $("nav div[rel='content'] a:has(.leaderboard)").attr("href");
                break;
            case "shop":
                togoto = $("nav div[rel='content'] a:has(.shop)").attr("href");
                break;
            case "quest":
                togoto = getSetHeroInfos('questing.current_url');
                if (togoto.includes("world"))
                {
                    logHHAuto("All quests finished, turning off AutoQuest!");
                    Storage().HHAuto_Setting_autoQuest = false;
                    location.reload();
                    return false;
                }
                logHHAuto("Current quest page: "+togoto);
                break;
            case "champions_map":
                togoto = $("nav div[rel='content'] a:has(.champions)").attr("href");
                break;
            case "season" :
                togoto = "/season.html";
                break;
            case "season_arena" :
                togoto = "/season-arena.html";
                break;
            case "club_champion" :
                togoto = "/club-champion.html";
                break;
            case "clubs" :
                togoto = $("nav div[rel='content'] a:has(.clubs)").attr("href");
                break;
            default:
                logHHAuto("Unknown goto page request. No page \'"+page+"\' defined.");
        }
        if(togoto != undefined)
        {
            if (page=="missions")
            {
                togoto = url_add_param(togoto, "tab=" + "missions");
            }
            if (page=="activities")
            {
                togoto = url_add_param(togoto, "tab=" + "contests");
            }
            if (page=="powerplace")
            {
                togoto = url_add_param(togoto, "tab=" + "pop");
                if (index != 'main' )
                {
                    togoto = url_add_param(togoto, "index=" + index);
                }
            }

            sessionStorage.HHAuto_Temp_autoLoop = "false";
            logHHAuto("setting autoloop to false");
            logHHAuto('GotoPage : '+togoto);
            window.location = window.location.origin + togoto;
        }
        else
        {
            logHHAuto("Couldn't find page path. Page was undefined...");
        }
        return false;
    }
}

var proceedQuest = function () {
    //logHHAuto("Starting auto quest.");
    // Check if at correct page.
    if (!gotoPage("quest")) {
        // Click on current quest to naviagte to it.
        logHHAuto("Navigating to current quest.");
        return;
    }
    $("#popup_message close").click();
    // Get the proceed button type
    var proceedButtonMatch = $("#controls button:not([style='display: none;'])");
    if (proceedButtonMatch.length === 0){proceedButtonMatch = $("#controls button[act='free']");}
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
    var proceedType = proceedButtonMatch.attr("act");

    if (proceedButtonMatch.length === 0)
    {
        logHHAuto("Could not find resume button.");
    }
    else if (proceedType === "free") {
        logHHAuto("Proceeding for free.");
        proceedButtonMatch.click();
    }
    else if (proceedType === "pay") {
        var energyCurrent = getSetHeroInfos('quest.amount');
        var moneyCurrent = getSetHeroInfos('soft_currency');
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
        if(proceedCostMoney <= moneyCurrent)
        {
            // We have money.
            logHHAuto("Spending "+proceedCostMoney+" Money to proceed.");
        }
        else
        {
            logHHAuto("Spending "+proceedCostEnergy+" Energy to proceed.");
            sessionStorage.HHAuto_Temp_questRequirement = "$"+proceedCostMoney;
            return;
        }
        proceedButtonMatch.click();
        sessionStorage.HHAuto_Temp_autoLoop = "false";
        logHHAuto("setting autoloop to false");
        location.reload();
    }
    else if (proceedType === "use_item") {
        logHHAuto("Proceeding by using X" + Number($("#controls .item span").text()) + " of the required item.");
        proceedButtonMatch.click();
    }
    else if (proceedType === "battle") {
        logHHAuto("Proceeding to battle troll...");
        sessionStorage.HHAuto_Temp_questRequirement = "battle";
        // Proceed to battle troll.
        proceedButtonMatch.click();
        sessionStorage.HHAuto_Temp_autoLoop = "false";
        logHHAuto("setting autoloop to false");
        location.reload();
    }
    else if (proceedType === "end_archive") {
        logHHAuto("Reached end of current archive. Proceeding to next archive.");
        sessionStorage.HHAuto_Temp_autoLoop = "false";
        logHHAuto("setting autoloop to false");
        proceedButtonMatch.click();
    }
    else if (proceedType === "end_play") {
        logHHAuto("Reached end of current play. Proceeding to next play.");
        sessionStorage.HHAuto_Temp_autoLoop = "false";
        logHHAuto("setting autoloop to false");
        proceedButtonMatch.click();
    }
    else {
        logHHAuto("Could not identify given resume button.");
        sessionStorage.HHAuto_Temp_questRequirement = "unknownQuestButton";
    }
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
    if(!gotoPage("missions"))
    {
        logHHAuto("Navigating to activities page.");
        // return busy
        return true;
    }
    else
    {
        logHHAuto("On activities page.");
        if (Storage().HHAuto_Setting_autoMissionC==="true" && $(".mission_button button:visible[rel='claim']").length >0)
        {
            logHHAuto("Collecting finished mission's reward.");
            $(".mission_button button:visible[rel='claim']").click();
            setTimeout(function(){gotoPage('missions',true);},1500);
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
                    if (Storage().HHAuto_Setting_autoMissionC==="true")
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
                            logHHAuto("Couldn't parse xp/money data.");
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
                            logHHAuto("Couldn't parse item reward slot details.");
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
            setTimeout(function(){gotoPage('missions',true);},1500);
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
                catch(e){}
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
                    catch(e){}
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

function modulePathOfAttractionHide()
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

function moduleSimSeasonReward()
{
    var arrayz;
    var nbReward;
    let modified=false;
    arrayz = $('.rewards_pair:not([style*="display: none;"])');
    if ($("div#gsp_btn_holder[style='display: block;']").length)
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
            obj = $(arrayz[i2]).find('.tick_s:not([style="display: none;"])');
            if (obj.length >= nbReward) {
                arrayz[i2].style.display = "none";
                modified = true;
            }
        }
    }

    if (modified)
    {
        document.getElementById('rewards_cont_scroll').scrollLeft=0;
    }

}

function collectAndUpdatePowerPlaces()
{
    if(!gotoPage("powerplacemain"))
    {
        logHHAuto("Navigating to powerplaces main page.");
        // return busy
        return true;
    }
    else
    {
        logHHAuto("On powerplaces main page.");
        Storage().HHAuto_Temp_Totalpops=$("div.pop_list div[pop_id]").length; //Count how many different POPs there are and store them locally
        logHHAuto("totalpops : "+Storage().HHAuto_Temp_Totalpops);
        var newFilter="";
        $("div.pop_list div[pop_id]").each(function(){newFilter=newFilter+';'+$(this).attr('pop_id');});
        //for (var id=1;id<Number(Storage().HHAuto_Temp_Totalpops)+1;id++)
        //{
        //    newFilter=newFilter+';'+id;
        //}
        //logHHAuto("newfilter : "+newFilter.substring(1));
        if (Storage().HHAuto_Setting_autoPowerPlacesAll === "true")
        {
            Storage().HHAuto_Setting_autoPowerPlacesIndexFilter = newFilter.substring(1);
        }

        var filteredPops = Storage().HHAuto_Setting_autoPowerPlacesIndexFilter?Storage().HHAuto_Setting_autoPowerPlacesIndexFilter.split(";"):[];
        var popUnableToStart = Storage().HHAuto_Temp_PopUnableToStart?Storage().HHAuto_Temp_PopUnableToStart.split(";"):[];
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
        //collect all
        var rewardQuery="div#rewards_popup button.blue_button_L";
        $("button[rel='pop_thumb_claim'].purple_button_L").each(function()
                                                                {
            this.click();
            if ($(rewardQuery).length >0 )
            {
                $(rewardQuery).click();
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
            catch(e){}
        }

        if (minTime != -1)
        {
            if ( minTime > 20*60 )
            {
                //force check of PowerPlaces every 20 mins
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
            Storage().removeItem('HHAuto_Temp_PopUnableToStart');
        }
        logHHAuto("build popToStart : "+PopToStart);
        Storage().HHAuto_Temp_PopToStart = JSON.stringify(PopToStart);
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
    Storage().removeItem('HHAuto_Temp_PopUnableToStart');
    Storage().removeItem('HHAuto_Temp_popToStart');
}

function removePopFromPopToStart(index)
{
    var epop;
    var popToSart;
    var newPopToStart;
    popToSart= Storage().HHAuto_Temp_PopToStart?JSON.parse(Storage().HHAuto_Temp_PopToStart):[];
    newPopToStart=[];
    for (epop of popToSart)
    {
        if (epop != index)
        {
            newPopToStart.push(epop);
        }
    }
    Storage().HHAuto_Temp_PopToStart = JSON.stringify(newPopToStart);
}

function addPopToUnableToStart(popIndex,message)
{
    var popUnableToStart=Storage().HHAuto_Temp_PopUnableToStart?Storage().HHAuto_Temp_PopUnableToStart:"";
    logHHAuto(message);
    if (popUnableToStart === "")
    {
        Storage().HHAuto_Temp_PopUnableToStart = String(popIndex);
    }
    else
    {
        Storage().HHAuto_Temp_PopUnableToStart = popUnableToStart+";"+String(popIndex);
    }
}

// returns boolean to set busy
function doPowerPlacesStuff(index)
{
    if(!gotoPage("powerplace"+index))
    {
        logHHAuto("Navigating to powerplace"+index+" page.");
        // return busy
        return true;
    }
    else
    {
        logHHAuto("On powerplace"+index+" page.");

        //getting reward in case failed on main page
        var querySelectorText = "button[rel='pop_claim']";
        if ($(querySelectorText).length>0)
        {
            $(querySelectorText).click();
            logHHAuto("Claimed powerplace"+index);
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
            catch(e){}
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
        catch(e){}
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
    if(!gotoPage("activities"))
    {
        logHHAuto("Navigating to activities page.");
        // return busy
        return true;
    }
    else
    {
        logHHAuto("On activities page.");
        logHHAuto("Collecting finished contests's reward.");
        $(".contest .ended button[rel='claim']").click();
        // need to get next contest timer data
        var time = 0;
        for(var e in unsafeWindow.HHTimers.timers){
            try{if(unsafeWindow.HHTimers.timers[e].$barElm/*.selector.includes(".contest_timer")*/)
                time=unsafeWindow.HHTimers.timers[e];
               }
            catch(e){}
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
        }}catch(e){}
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

var CollectMoney = function()
{
    var Clicked=[];
    var ToClick=[];

    function ClickThem()
    {
        //logHHAuto('Need to click: '+ToClick.length);
        if (ToClick.length>0)
        {
            //logHHAuto('clicking N '+ToClick[0].formAction.split('/').last())
            $(ToClick[0]).click();
            ToClick.shift();
            //logHHAuto('will click again');
            setTimeout(ClickThem,randomInterval(500,1500));

            window.top.postMessage({ImAlive:true},'*');
        }
        else
        {
            //logHHAuto('nothing to click, checking data');
            CollectData(false);
        }
    }

    function CollectData(inStart = true)
    {
        let allCollected = true;
        var btns=$("#harem_whole #harem_left .salary:not('.loads') button");
        //logHHAuto('buttons: '+btns.size())
        btns.each(function (index, element) {
            //logHHAuto({indexNb:index,formActionElement:element.formAction});
            var gid=Number(element.parentElement.parentElement.parentElement.getAttribute('girl'));
            //logHHAuto('checking '+gid);
            if (!Clicked.includes(gid))
            {
                Clicked.push(gid);
                ToClick.push(element);
                //logHHAuto({log:'added! ',ClickedObj:Clicked,ToClickObj:ToClick});
            }
        });

        logHHAuto({log:"Collected Data: ", ClickedObj:Clicked, ToClickObj:ToClick});

        if (ToClick.length>0 )
        {
            allCollected = false;
        }
        if (ToClick.length>0 && inStart)
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
            var closestTime = undefined;
            var closestGirl = 0;
            var gMap = getGirlsMap();
            if(gMap === undefined)
            {
                // error
                logHHAuto("Girls Map was undefined...! Error, manually setting salary time to 2 min.");
                closestTime = 2*60;
            }
            else
            {
                try{
                    // Calc. closest time
                    for(var key in gMap)
                    {
                        // undefined comparision is always false so first iteration is false, hence the not(!)
                        if(!(closestTime<gMap[key].gData.pay_in) && !Clicked.includes(key) && gMap[key].gData.pay_in!=0)
                        {
                            closestTime = gMap[key].gData.pay_in;
                            closestGirl = key;
                        }
                    }
                }
                catch(exp){
                    // error
                    logHHAuto("Girls Map had undefined property...! Error, manually setting salary time to 2 min.");
                    closestTime = 2*60;
                }
            }
            if(closestTime === undefined)
            {
                logHHAuto("closestTime was undefined...! Error, manually setting salary time to 2 min.");
                closestTime = 2*60;
            }
            var st=Number(Storage().HHAuto_Setting_autoSalaryTimer?Storage().HHAuto_Setting_autoSalaryTimer:"120");
            if(closestTime <= st )
            {
                logHHAuto("closestTime is "+closestTime+" ("+closestGirl+")");
                closestTime = st;
            }
            //if (allCollected)
            //{
            setTimer('nextSalaryTime',Number(closestTime)+1);
            //}
            gotoPage('home');
        }
    }

    CollectData();
}

var getSalary = function () {
    try {
        if(getPage() == "harem")
        {
            logHHAuto("Detected Harem Screen. Fetching Salary");
            is_cheat_click=function(e) {
                return false;
            };
            sessionStorage.HHAuto_Temp_autoLoop = "false";
            logHHAuto("setting autoloop to false");
            CollectMoney();
            // return busy
            return true;
        }
        else if (getPage() == "home")
        {
            var salaryButton = $("#collect_all_container button[id='collect_all']")
            var salaryToCollect = salaryButton.attr("style")==="display: inline-block;"?true:false;
            var getButtonClass = salaryButton.attr("class");
            if (salaryToCollect)
            {
                if (getButtonClass === "blue_button_L")
                {
                    is_cheat_click=function(e) {
                        return false;
                    };
                    salaryButton.click();
                    logHHAuto('Collected all Premium salary');
                    setTimer('nextSalaryTime',Number(Storage().HHAuto_Setting_autoSalaryTimer?Storage().HHAuto_Setting_autoSalaryTimer:"120")+1);
                    return true;
                }
                else if ( getButtonClass === "orange_button_L")
                {
                    // Not at Harem screen then goto the Harem screen.
                    logHHAuto("Navigating to Harem window.");
                    gotoPage("harem");
                    // return busy
                    return true;

                }
                else
                {
                    logHHAuto("Unknown salary button color : "+getButtonClass);
                    setTimer('nextSalaryTime',Number(Storage().HHAuto_Setting_autoSalaryTimer?Storage().HHAuto_Setting_autoSalaryTimer:"120")+1);
                }
            }
            else
            {
                logHHAuto("No salary to collect");
                setTimer('nextSalaryTime',Number(Storage().HHAuto_Setting_autoSalaryTimer?Storage().HHAuto_Setting_autoSalaryTimer:"120")+1);
            }
        }
        else
        {
            // Not at Harem screen then goto the Harem screen.
            logHHAuto("Navigating to Home window.");
            gotoPage("home");
            return true;
        }

    }
    catch (ex) {
        logHHAuto("Could not collect salary... " + ex);
        // return not busy
        return false;
    }
};

var doStatUpgrades=function()
{
    //Stats?
    //logHHAuto('stats');
    var Hero=getHero();
    var level=getSetHeroInfos('level');
    var stats=[getSetHeroInfos('carac1'),getSetHeroInfos('carac2'),getSetHeroInfos('carac3')];
    var money=getSetHeroInfos('soft_currency');
    var count=0;
    var M=Storage().HHAuto_Setting_autoStats?Number(Storage().HHAuto_Setting_autoStats):500000000;
    var MainStat=stats[getSetHeroInfos('class')-1];
    var Limit=getSetHeroInfos('level')*30;//getSetHeroInfos('level')*19+Math.min(getSetHeroInfos('level'),25)*21;
    var carac=getSetHeroInfos('class');
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
            if (carac==getSetHeroInfos('class'))
            {
                mp=price;
            }
            //logHHAuto('money: '+money+' stat'+carac+': '+stats[carac-1]+' price: '+price);
            if ((stats[carac-1]+mult)<=Limit && (money-price)>M && (carac==getSetHeroInfos('class') || price<mp/2 || (MainStat+mult)>Limit))
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

                });
                break;
            }
        }
        carac=(carac+1)%3+1;
    }
}

var doShopping=function()
{
    try
    {

        var Hero=getHero();
        var MS='carac'+getSetHeroInfos('class');
        var SS1='carac'+(getSetHeroInfos('class')%3+1);
        var SS2='carac'+((getSetHeroInfos('class')+1)%3+1);
        var money=getSetHeroInfos('soft_currency');
        var kobans=getSetHeroInfos('hard_currency');

        try
        {
            var shop=JSON.parse(sessionStorage.HHAuto_Temp_storeContents);
        }
        catch(wtf)
        {
            sessionStorage.HHAuto_Temp_charLevel=0;
            return;
        }

        if (!sessionStorage.HHAuto_Temp_haveAff)
        {
            sessionStorage.HHAuto_Temp_charLevel=0;
            return;
        }

        var LGM=Number(Storage().HHAuto_Setting_autoLGM);
        var EGM=Number(Storage().HHAuto_Setting_autoEGM);
        var LGR=Number(Storage().HHAuto_Setting_autoLGR);
        var Exp=Number(Storage().HHAuto_Setting_autoExp);
        var Aff=Number(Storage().HHAuto_Setting_autoAff);
        var MaxAff=Number(Storage().HHAuto_Setting_MaxAff);
        var MaxExp=Number(Storage().HHAuto_Setting_MaxExp);
        var HaveAff=Number(sessionStorage.HHAuto_Temp_haveAff);
        var HaveExp=Number(sessionStorage.HHAuto_Temp_haveExp);


        if (Storage().HHAuto_Setting_autoLGMW==="true" || Storage().HHAuto_Setting_autoLGRW==="true" )//|| Storage().HHAuto_Setting_autoEGMW==="true")
        {
            //logHHAuto('items');
            var Was=shop[0].length;
            for (var n0=shop[0].length-1;n0>=0;n0--)
            {

                if (Storage().HHAuto_Setting_autoLGMW==="true" && money>=LGM+Number(shop[0][n0].price) && shop[0][n0][MS]>0 && shop[0][n0][SS1]==0 && shop[0][n0][SS2]==0 && shop[0][n0].chance==0 && shop[0][n0].endurance==0 && shop[0][n0].rarity=='legendary'||
                    //Storage().HHAuto_Setting_autoEGMW==="true" && money>=EGM+Number(shop[0][n0].price) && shop[0][n0][MS]>0 && shop[0][n0][SS1]==0 && shop[0][n0][SS2]==0 && shop[0][n0].chance==0 && shop[0][n0].endurance==0 && shop[0][n0].rarity=='epic'||
                    Storage().HHAuto_Setting_autoLGRW==="true" && money>=LGR+Number(shop[0][n0].price) && shop[0][n0][MS]>0 && shop[0][n0][SS1]>0 && shop[0][n0][SS2]>0 && shop[0][n0].rarity=='legendary')
                {
                    logHHAuto({log:'wanna buy ',object:shop[0][n0]});
                    if (money>=shop[0][n0].price)
                    {
                        logHHAuto("yay?");
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

                        });
                        shop[0].splice(n0,1);
                    }
                    else
                    {
                        logHHAuto("but can't");
                    }
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
                    if (kobans>=Number(Storage().HHAuto_Setting_kobanBank)+Number(shop[1][n1].price_hc) && shop[1][n1].identifier == boost  && shop[1][n1].rarity=='legendary')
                    {
                        logHHAuto({log:'wanna buy ',object:shop[1][n1]});
                        if (kobans>=Number(shop[1][n1].price_hc))
                        {
                            logHHAuto("yay?");
                            kobans-=Number(shop[1][n1].hc_price);
                            var params1 = {
                                class: "Item",
                                action: "buy",
                                id_item: shop[1][n1].id_item,
                                type: "booster",
                                who: 1
                            };
                            hh_ajax(params1, function(data) {

                            });
                            shop[1].splice(n1,1);
                        }
                        else
                        {
                            logHHAuto("but can't");
                        }
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
                logHHAuto({log:'wanna buy ',Object:shop[2][n2]});
                if (money>=Aff+Number(shop[2][n2].price) && money>=Number(shop[2][n2].price))
                {
                    logHHAuto("yay?");
                    money-=Number(shop[2][n2].price);
                    var params2 = {
                        class: "Item",
                        action: "buy",
                        id_item: shop[2][n2].id_item,
                        type: "gift",
                        who: 1
                    };
                    hh_ajax(params2, function(data) {

                    });
                    shop[2].splice(n2,1);
                }
                else
                {
                    logHHAuto("but can't");
                }
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
                logHHAuto('wanna buy ',shop[3][n3]);
                if (money>=Exp+Number(shop[3][n3].price) && money>=Number(shop[3][n3].price))
                {
                    logHHAuto("yay?");
                    money-=Number(shop[3][n3].price);
                    var params3 = {
                        class: "Item",
                        action: "buy",
                        id_item: shop[3][n3].id_item,
                        type: "potion",
                        who: 1
                    };
                    hh_ajax(params3, function(data) {

                    });
                    shop[3].splice(n3,1);
                }
                else
                {
                    logHHAuto("but can't");
                }
            }
            if (shop[3].length==0 && Was>0)
            {
                sessionStorage.HHAuto_Temp_charLevel=0;
            }
        }
        sessionStorage.HHAuto_Temp_storeContents=JSON.stringify(shop);
        //unsafeWindow.Hero.infos.soft_currency=money;
        getSetHeroInfos('soft_currency',money);
    }
    catch (ex)
    {
        logHHAuto(ex);
        sessionStorage.HHAuto_Temp_charLevel=0;
    }
}

var doBossBattle = function()
{
    var currentPower = getSetHeroInfos('fight.amount');
    if(currentPower < 1)
    {
        //logHHAuto("No power for battle.");
        return;
    }

    var TTF;
    if (Storage().HHAuto_Setting_plusEvent==="true" && (!checkTimer("eventGoing") || !checkTimer("eventMythicGoing")) && sessionStorage.HHAuto_Temp_eventTroll)
    {
        TTF=sessionStorage.HHAuto_Temp_eventTroll;
        logHHAuto("Event troll fight");
    }
    else if(Storage().HHAuto_Temp_trollToFight !== undefined && !isNaN(Storage().HHAuto_Temp_trollToFight) && Storage().HHAuto_Temp_trollToFight !== "0")
    {
        TTF=Storage().HHAuto_Temp_trollToFight;
        logHHAuto("Custom troll fight.");
    }
    else
    {
        TTF=getSetHeroInfos('questing.id_world')-1;
        logHHAuto("Last troll fight");
    }

    if (Storage().HHAuto_Temp_autoTrollBattleSaveQuest == "true")
    {
        TTF=getSetHeroInfos('questing.id_world')-1;
        logHHAuto("Last troll fight for quest item.");
        Storage().HHAuto_Temp_autoTrollBattleSaveQuest = "false";
    }

    logHHAuto("Fighting troll N "+TTF);
    logHHAuto("Going to crush: "+Trollz[Number(TTF)]);

    // Battles the latest boss.
    // Navigate to latest boss.
    if(window.location.pathname=="/battle.html" && window.location.search=="?id_troll=" + TTF)
    {
        // On the battle screen.
        CrushThem();
    }
    else
    {
        logHHAuto("Navigating to chosen Troll.");
        sessionStorage.HHAuto_Temp_autoLoop = "false";
        logHHAuto("setting autoloop to false");
        location.href = "/battle.html?id_troll=" + TTF;
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
            var ECount= getSetHeroInfos('quest.amount');
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
                setTimeout(function(){gotoPage('champions_map');},500);
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
                window.location = window.location.origin + '/champions/'+(i+1);
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
            catch(e){}

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
            var ECount= getSetHeroInfos('quest.amount');
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
                setTimeout(function(){gotoPage('clubs',true);},500);
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
            let SecsToNextTimer = Number(Timer)-Math.ceil(new Date().getTime()/1000);
            noTimer = false;
            logHHAuto("Team is resting for : "+toHHMMSS(SecsToNextTimer));
        }
        if ($(restChampionFilter).length > 0)
        {
            Timer = Number($(restChampionFilter).attr("data-rest-timer"));
            let SecsToNextTimer = Number(Timer)-Math.ceil(new Date().getTime()/1000);
            noTimer = false;
            logHHAuto("Champion is resting for : "+toHHMMSS(SecsToNextTimer));
        }

        if (Started && noTimer)
        {
            let ticketUsed = Number($("div.club_champions_panel tr.personal_highlight td.challenges_count")[0].innerText.replace(/[^0-9]/gi, ''));
            let maxTickets = Number(Storage().HHAuto_Setting_autoClubChampMax?Storage().HHAuto_Setting_autoClubChampMax:"999");
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


function simuFight(player, opponent) {
    let playerEgoCheck = 0;

    //Calculate opponent proc values, determine applicable alpha class and adjust starting ego values for proc
    let opponentProcHCAddOrgasm = [
        0,
        Math.floor(opponent.atk * 0.25),
        Math.floor(opponent.team[2] * 1.3 * 0.75),
        Math.floor(opponent.team[3] * 1.3 * 0.75)
    ];

    let opponentAlphaClass = parseInt(opponent.alpha.class);

    // crit.
    if (opponentAlphaClass == HC) {
        player.ego -= Math.floor(opponent.atk * 0.5);
    }
    if (opponentAlphaClass == CH) {
        //opponent.ego += opponent.def * 2;

        //CH bug
        opponent.ego += 2 * Math.floor(opponent.atk/2);
    }
    if (opponentAlphaClass == KH) {
        opponent.ego += Math.floor(opponent.ego * 0.1);
    }

    //Log opponent name and starting egos for sim
    //console.log('Simulation log for: ' + opponent.name);
    //console.log('Starting Egos adjusted for worst-case proc scenario (0 for you and 1 for the opponent):');
    //console.log('Player Ego: ' + player.ego);
    //console.log('Opponent Ego: ' + opponent.ego);

    function play_turn(cur) {
        let o = cur === player ? opponent : player;

        if( cur.orgasm >= cur.excitement && cur.orgasmCount < 3) {
            //Log results
            //console.log('Round ' + (turns + 1) + ': ' + cur.text + ' orgasm! -' + Math.max(0, Math.round(cur.atk * 1.5 - o.def)));

            orgasm(cur);
        }
        else {
            o.ego -= Math.max(0, cur.atk - o.def);
            cur.orgasm += cur.atk * 2;
            //console.log('Round ' + (turns + 1) + ': ' + cur.text + ' hit! -' + Math.max(0, (cur.atk - o.def)));
        }
        //Log results
        //console.log('after Round ' + (turns + 1) + ': ' + o.text + ' ego: ' + o.ego);
    }

    function orgasm(cur) {
        let o = (cur === player) ? opponent : player;

        ++cur.orgasmCount;
        cur.orgasm = 0;

        o.ego -= Math.max(0, Math.floor(cur.atk * 1.5 - o.def));

        //CH Bug
        /*if(cur === player && opponentAlphaClass == CH) {
            if(cur.orgasmCount > 1) {
                let carac_add = cur.team[cur.orgasmCount+1-1];
                let added_atk = Math.floor(carac_add * 1.3);
                opponent.ego += added_atk * 0.5 / 2;
            } else {
                opponent.ego += cur.atk * 0.5 / 2;
            }
        }*/

        if(cur.orgasmCount <= 2) {
            let carac_add = cur.team[cur.orgasmCount+1];
            let o_carac_add = o.team[cur.orgasmCount+1];

            let added_atk = Math.floor(carac_add * 1.3);
            let added_def = Math.floor(o_carac_add * 1.75);

            cur.atk += added_atk;
            o.def += added_def;

            if(cur === player && opponentAlphaClass == CH) {
                //opponent.ego += 2*added_def;

                //CH bug
                opponent.ego += 2*Math.floor(o_carac_add * 1.3 / 2);
            }
        }

        if(cur === opponent && opponentAlphaClass == HC) {
            player.ego -= opponentProcHCAddOrgasm[opponent.orgasmCount];
            //console.log('Round ' + (turns + 1) + ': HC opponent possibility of Wild Burst on first orgasm! -' + opponentProcHCAddOrgasm[opponent.orgasmCount]);
        }
    }

    //Simulate challenge
    for (var turns = 0; turns < 99; turns++) {

        if( player.ego <= 0) {
            player.ego = 0;
            break;
        }
        play_turn(player);

        if (opponent.ego <= 0) {
            //Check if victory is only a one-turn advantage
            playerEgoCheck = player.ego;

            //Orgasm
            if (opponent.orgasm >= opponent.excitement) {
                playerEgoCheck -= Math.max(0, Math.round(opponent.atk * 1.5 - player.def));
                ++opponent.orgasmCount;

                //Log results
                //console.log('Round ' + (turns + 1) + ': Possibly next: Opponent orgasm! -' + Math.max(0, Math.round(opponent.atk * 1.5 - player.def)));

                if (opponentAlphaClass == HC) {
                    if (opponent.orgasmCount == 1) {
                        playerEgoCheck -= opponentProcHCAddOrgasm[1];
                        //console.log('Round ' + (turns + 1) + ': Possibly next: HC opponent possibility of Wild Burst on first orgasm! -' + opponentProcHCAddOrgasm[1]);
                    }
                    if (opponent.orgasmCount == 2) {
                        playerEgoCheck -= opponentProcHCAddOrgasm[2];
                        //console.log('Round ' + (turns + 1) + ': Possibly next: HC opponent possibility of Wild Burst on second orgasm! -' + opponentProcHCAddOrgasm[2]);
                    }
                    if (opponent.orgasmCount == 3) {
                        playerEgoCheck -= opponentProcHCAddOrgasm[3];
                        //console.log('Round ' + (turns + 1) + ': Possibly next: HC opponent possibility of Wild Burst on third orgasm! -' + opponentProcHCAddOrgasm[3]);
                    }
                }
            }
            //No orgasm
            else {
                playerEgoCheck -= opponent.atk - player.def;
                //console.log('Round ' + (turns + 1) + ': Possibly next: Opponent hit! -' + Math.max(0, (opponent.atk - player.def)));
            }

            if (playerEgoCheck <= 0) {
                //console.log('Close call! After Round ' + (turns + 1) + ': Player ego: ' + playerEgoCheck);
            }

            opponent.ego = 0;
            break;
        }

        play_turn(opponent);
    }

    let matchRating = player.ego - opponent.ego;
    let matchRatingStr = (matchRating >= 0 ? '+' : '') + Math.floor(matchRating);
    let matchRatingClass = matchRating < 0 ? 'minus' : ((matchRating >= 0 && playerEgoCheck <= 0) ? 'close' : 'plus');

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

            if (playerEgoCheck <= 0)
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

function calculatePower(playerEgo,playerDef,playerAtk,playerClass,playerAlpha,playerBeta,playerOmega,playerExcitement,opponentName,opponentEgo,opponentDef,opponentAtk,opponentClass,opponentAlpha,opponentBeta,opponentOmega,opponentExcitement)
{
    var opponentBetaAdd;
    var opponentOmegaAdd;
    var opponentProcHCBase;
    var opponentProcHCAddOrgasm1;
    var opponentProcHCAddOrgasm2;
    var opponentProcHCAddOrgasm3;
    var opponentProcCH;
    var opponentProcKH;
    var opponentAlphaClass;
    var playerOrgasm;
    var playerOrgasmCount;
    var opponentOrgasm;
    var opponentOrgasmCount;
    var playerEgoCheck;
    var playerBetaAdd;
    var playerOmegaAdd;
    var matchRating;

    //logHHAuto({playerEgo:playerEgo,playerDef:playerDef,playerAtk:playerAtk,playerClass:playerClass,playerAlpha:playerAlpha,playerBeta:playerBeta,playerOmega:playerOmega,playerExcitement:playerExcitement,opponentName:opponentName,opponentEgo:opponentEgo,opponentDef:opponentDef,opponentAtk:opponentAtk,opponentClass:opponentClass,opponentAlpha:opponentAlpha,opponentBeta:opponentBeta,opponentOmega:opponentOmega,opponentExcitement:opponentExcitement});


    if (playerClass == 'class1') {
        playerBetaAdd = playerBeta.caracs.carac1;
        playerOmegaAdd = playerOmega.caracs.carac1;
    }
    if (playerClass == 'class2') {
        playerBetaAdd = playerBeta.caracs.carac2;
        playerOmegaAdd = playerOmega.caracs.carac2;
    }
    if (playerClass == 'class3') {
        playerBetaAdd = playerBeta.caracs.carac3;
        playerOmegaAdd = playerOmega.caracs.carac3;
    }

    if (opponentClass == 'class1') {
        opponentBetaAdd = opponentBeta.caracs.carac1;
        opponentOmegaAdd = opponentOmega.caracs.carac1;
    }
    if (opponentClass == 'class2') {
        opponentBetaAdd = opponentBeta.caracs.carac2;
        opponentOmegaAdd = opponentOmega.caracs.carac2;
    }
    if (opponentClass == 'class3') {
        opponentBetaAdd = opponentBeta.caracs.carac3;
        opponentOmegaAdd = opponentOmega.caracs.carac3;
    }



    //Calculate opponent proc values, determine applicable alpha class and adjust starting ego values for proc
    opponentProcHCBase = Math.round(opponentAtk * 0.5);
    opponentProcHCAddOrgasm1 = Math.round(opponentAtk * 0.25);
    opponentProcHCAddOrgasm2 = Math.round(opponentBetaAdd * 1.3 * 0.75);
    opponentProcHCAddOrgasm3 = Math.round(opponentOmegaAdd * 1.3 * 0.75);
    opponentProcCH = opponentDef * 2;
    opponentProcKH = Math.round(opponentEgo * 0.1);
    opponentAlphaClass = opponentAlpha.class;

    if (opponentAlphaClass == '1') {
        playerEgo -= opponentProcHCBase;
    }
    if (opponentAlphaClass == '2') {
        opponentEgo += opponentProcCH;
    }
    if (opponentAlphaClass == '3') {
        opponentEgo += opponentProcKH;
    }

    //Log opponent name and starting egos for sim
    //logHHAuto('Simulation log for: ' + opponentName);
    //logHHAuto('Starting Egos adjusted for worst-case proc scenario:');
    //logHHAuto('Player Ego: ' + playerEgo);
    //logHHAuto('Opponent Ego: ' + opponentEgo);

    playerOrgasm = 0;
    playerOrgasmCount = 0;
    opponentOrgasm = 0;
    opponentOrgasmCount = 0;

    function playerTurn() {
        //Orgasm
        if (playerOrgasm >= playerExcitement) {
            //Orgasm damage
            opponentEgo -= Math.round(playerAtk * 1.5 - opponentDef);
            playerOrgasmCount++;

            //Log results
            //logHHAuto('Round ' + (turns + 1) + ': Player orgasm! -' + Math.round(playerAtk * 1.5 - opponentDef));

            //Orgasm 1
            if (playerOrgasmCount == 1) {
                playerAtk += Math.round(playerBetaAdd * 1.3);
                opponentDef += Math.round(opponentBetaAdd * 1.75);
            }

            //Orgasm 2
            if (playerOrgasmCount == 2) {
                playerAtk += Math.round(playerOmegaAdd * 1.3);
                opponentDef += Math.round(opponentOmegaAdd * 1.75);
            }

            //Reset excitement value
            playerOrgasm = 0;
        }

        //No orgasm
        else {
            opponentEgo -= playerAtk - opponentDef;
            playerOrgasm += playerAtk * 2;
            //logHHAuto('Round ' + (turns + 1) + ': Player hit! -' + (playerAtk - opponentDef));
        }

        //Log results
        //logHHAuto('after Round ' + (turns + 1) + ': Opponent ego: ' + opponentEgo);
    }

    function opponentTurn() {
        //Orgasm
        if (opponentOrgasm >= opponentExcitement) {
            //Orgasm damage
            playerEgo -= Math.round(opponentAtk * 1.5 - playerDef);
            opponentOrgasmCount++;

            //Log results
            //logHHAuto('Round ' + (turns + 1) + ': Opponent orgasm! -' + Math.round(opponentAtk * 1.5 - playerDef));

            //Orgasm 1
            if (opponentOrgasmCount == 1) {
                opponentAtk += Math.round(opponentBetaAdd * 1.3);
                playerDef += Math.round(playerBetaAdd * 1.75);
                if (opponentAlphaClass == '1') {
                    playerEgo -= opponentProcHCAddOrgasm1;
                    //logHHAuto('Round ' + (turns + 1) + ': HC opponent possibility of Wild Burst on first orgasm! -' + opponentProcHCAddOrgasm1);
                }
            }

            //Orgasm 2
            if (opponentOrgasmCount == 2) {
                opponentAtk += Math.round(opponentOmegaAdd * 1.3);
                playerDef += Math.round(playerOmegaAdd * 1.75);
                if (opponentAlphaClass == '1') {
                    playerEgo -= opponentProcHCAddOrgasm2;
                    //logHHAuto('Round ' + (turns + 1) + ': HC opponent possibility of Wild Burst on second orgasm! -' + opponentProcHCAddOrgasm2);
                }
            }

            //Orgasm 3
            if (opponentOrgasmCount == 3) {
                if (opponentAlphaClass == '1') {
                    playerEgo -= opponentProcHCAddOrgasm3;
                    //logHHAuto('Round ' + (turns + 1) + ': HC opponent possibility of Wild Burst on third orgasm! -' + opponentProcHCAddOrgasm3);
                }
            }

            //Reset excitement value
            opponentOrgasm = 0;
        }

        //No orgasm
        else {
            playerEgo -= opponentAtk - playerDef;
            opponentOrgasm += opponentAtk * 2;
            //logHHAuto('Round ' + (turns + 1) + ': Opponent hit! -' + (opponentAtk - playerDef));
        }

        //Log results
        //logHHAuto('after Round ' + (turns + 1) + ': Player ego: ' + playerEgo);
    }

    //Simulate challenge
    for (var turns = 0; turns < 99; turns++) {
        if (playerEgo > 0) {
            playerTurn()
        }
        else {
            break
        }
        if (opponentEgo > 0) {
            opponentTurn()
        }
        else {
            //Check if victory is only a one-turn advantage
            playerEgoCheck = playerEgo;

            //Orgasm
            if (opponentOrgasm >= opponentExcitement) {
                playerEgoCheck -= Math.round(opponentAtk * 1.5 - playerDef);
                opponentOrgasmCount++;

                //Log results
                //logHHAuto('Round ' + (turns + 1) + ': Possibly next: Opponent orgasm! -' + Math.round(opponentAtk * 1.5 - playerDef));

                if (opponentAlphaClass == '1') {
                    if (opponentOrgasmCount == 1) {
                        playerEgoCheck -= opponentProcHCAddOrgasm1;
                        //logHHAuto('Round ' + (turns + 1) + ': Possibly next: HC opponent possibility of Wild Burst on first orgasm! -' + opponentProcHCAddOrgasm1);
                    }
                    if (opponentOrgasmCount == 2) {
                        playerEgoCheck -= opponentProcHCAddOrgasm2;
                        //logHHAuto('Round ' + (turns + 1) + ': Possibly next: HC opponent possibility of Wild Burst on second orgasm! -' + opponentProcHCAddOrgasm2);
                    }
                    if (opponentOrgasmCount == 3) {
                        playerEgoCheck -= opponentProcHCAddOrgasm3;
                        //logHHAuto('Round ' + (turns + 1) + ': Possibly next: HC opponent possibility of Wild Burst on third orgasm! -' + opponentProcHCAddOrgasm3);
                    }
                }
            }
            //No orgasm
            else {
                playerEgoCheck -= opponentAtk - playerDef;
                //logHHAuto('Round ' + (turns + 1) + ': Possibly next: Opponent hit! -' + (opponentAtk - playerDef));
            }

            if (playerEgoCheck <= 0) {
                //logHHAuto('Close call! After Round ' + (turns + 1) + ': Player ego: ' + playerEgoCheck);
            }
            break
        }
    }

    //Round defeated player's ego up to 0 to not skew results
    if (playerEgo < 0) {
        playerEgo = 0;
    }
    if (opponentEgo < 0) {
        opponentEgo = 0;
    }

    //Publish the ego difference as a match rating
    matchRating = playerEgo - opponentEgo;
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

            if (playerEgoCheck <= 0)
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
    var current_kisses = getSetHeroInfos('kiss.amount');
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
            setTimer('nextSeasonTime',getSetHeroInfos('kiss.next_refresh_ts'));
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

    //     else if (page==="battle")
    //     {
    //         CrushThem();
    //     }
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
            setTimer('nextSeasonTime',getSetHeroInfos('kiss.next_refresh_ts'));
        }
        return;
    }
};

var doBattle = function () {
    //logHHAuto("Performing auto battle.");
    // Confirm if on correct screen.
    var page = getPage();
    if(page === "arena")
    {
        if ($("#arena[class='canvas']").length === 1) {
            // Oponent choose screen
            logHHAuto("On opponent choose screen.");
            if(document.getElementById("popups").style.display === "block")
            {
                logHHAuto("Popup detetcted. Refresh page.");
                unsafeWindow.reload();
                return;
            }
            else{
                logHHAuto("No popups.");
            }

            var fought = sessionStorage.HHAuto_Temp_fought?sessionStorage.HHAuto_Temp_fought:0;
            logHHAuto('already fought: '+fought);
            if(fought>=3)
            {
                logHHAuto("No arena opponents found, storing nextArenaTime...")
                var arenatime = 0;
                for(var e in unsafeWindow.HHTimers.timers){
                    try{
                        if(unsafeWindow.HHTimers.timers[e].$elm.selector.startsWith(".arena_refresh_counter"))
                            arenatime=unsafeWindow.HHTimers.timers[e];
                    }
                    catch(e){}
                }
                arenatime = arenatime.remainingTime;
                setTimer('nextArenaTime',Number(arenatime)+1);
                sessionStorage.HHAuto_Temp_fought=0;
                return;
            }
            //selbutton[0].click();
            sessionStorage.HHAuto_Temp_autoLoop = "false";
            logHHAuto("setting autoloop to false");
            sessionStorage.HHAuto_Temp_fought=Number(fought)+1;
            window.location = window.location.origin + '/battle.html?id_arena='+fought;
        }
    }
    else if (page==="battle")
    {
        CrushThem();
    }
    else
    {
        // Switch to the correct screen
        logHHAuto("Switching to battle screen.");
        gotoPage("arena");
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

var doLeagueBattle = function () {
    //logHHAuto("Performing auto leagues.");
    // Confirm if on correct screen.
    var currentPower = getSetHeroInfos('challenge.amount');
    var leagueScoreSecurityThreshold = 40;
    var ltime;

    var page = getPage();
    if(page==='battle')
    {
        // On the battle screen.
        CrushThem();
    }
    else if(page === "leaderboard")
    {
        logHHAuto("On leaderboard page.");
        if (Storage().HHAuto_Setting_autoLeaguesCollect === "true")
        {
            if ($('#leagues_middle .forced_info button[rel="claim"]').length >0)
            {
                $('#leagues_middle .forced_info button[rel="claim"]').click(); //click reward
                setTimeout(function(){gotoPage('leaderboard',true);},500);
            }
        }
        //logHHAuto('ls! '+$('h4.leagues').size());
        $('h4.leagues').each(function(){this.click();});

        if(currentPower < 1)
        {
            logHHAuto("No power for leagues.");
            //prevent paranoia to wait for league
            Storage().HHAuto_Temp_paranoiaLeagueBlocked="true";
            setTimer('nextLeaguesTime',getSetHeroInfos('challenge.next_refresh_ts')+1);
            //             for(var e in unsafeWindow.HHTimers.timers){
            //                 try{
            //                     if(unsafeWindow.HHTimers.timers[e].type=="energy_challenge")
            //                     {
            //                         ltime=unsafeWindow.HHTimers.timers[e];
            //                     }
            //                     if(unsafeWindow.HHTimers.timers[e].type=="challenge")
            //                     {
            //                         ltime=unsafeWindow.HHTimers.timers[e];
            //                     }
            //                 }
            //                 catch(e){}
            //             }
            //             ltime = Number(ltime.remainingTime)+15;
            //             setTimer('nextLeaguesTime',ltime);
            return;
        }

        while ($("span[sort_by='level'][select='asc']").size()==0)
        {
            logHHAuto('resorting');
            $("span[sort_by='level']").each(function(){this.click()});
        }
        logHHAuto('parsing enemies');
        var Data=[];
        var sorting_id;
        $(".leadTable[sorting_table] tr").each(function()
                                               {
            sorting_id = $(this).attr("sorting_id");
            if (this.className.indexOf('selected-player-leagues') != -1)
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
        if (Data.length==0)
        {
            ltime=35*60;
            logHHAuto('No valid targets!');
            //prevent paranoia to wait for league
            Storage().HHAuto_Temp_paranoiaLeagueBlocked="true";
            setTimer('nextLeaguesTime',ltime);
        }
        else
        {
            var getPlayerCurrentLevel = getLeagueCurrentLevel();

            if (isNaN(getPlayerCurrentLevel))
            {
                logHHAuto("Could not get current Rank, stopping League.");
                //prevent paranoia to wait for league
                Storage().HHAuto_Temp_paranoiaLeagueBlocked="true";
                setTimer('nextLeaguesTime',Number(30*60)+1);
                return;
            }
            var currentRank = Number($("tr[class=personal_highlight] td span")[0].innerText);
            var currentScore = Number($("tr[class=personal_highlight] td")[4].innerText.replace(/\D/g, ''));

            if (Number(Storage().HHAuto_Temp_leaguesTarget) < Number(getPlayerCurrentLevel))
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
                logHHAuto("Current league above target ("+Number(getPlayerCurrentLevel)+"/"+Number(Storage().HHAuto_Temp_leaguesTarget)+"), needs to demote. max rank : "+rankDemote+"/"+totalOpponents);
                maxDemote = Number($("div.leagues_table table tr td span:contains("+rankDemote+")").filter(function() {
                    return Number($.trim($(this).text())) === rankDemote;
                }).parent().parent()[0].lastElementChild.innerText.replace(/\D/g, ''));

                logHHAuto("Current league above target ("+Number(getPlayerCurrentLevel)+"/"+Number(Storage().HHAuto_Temp_leaguesTarget)+"), needs to demote. Score should not be higher than : "+maxDemote);
                if ( currentScore + leagueScoreSecurityThreshold >= maxDemote )
                {
                    logHHAuto("Can't do league as could go above demote, setting timer to 30 mins");
                    setTimer('nextLeaguesTime',Number(30*60)+1);
                    //prevent paranoia to wait for league
                    Storage().HHAuto_Temp_paranoiaLeagueBlocked="true";
                    gotoPage("home");
                    return;
                }
            }

            var maxLeague = $("div.tier_icons img").length;
            if ( maxLeague === undefined )
            {
                maxLeague = Leagues.length;
            }

            if (Number(Storage().HHAuto_Temp_leaguesTarget) === Number(getPlayerCurrentLevel) && Number(Storage().HHAuto_Temp_leaguesTarget) < maxLeague)
            {
                var maxStay = 0;
                var rankStay = 16;
                if (currentRank > 15)
                {
                    rankStay = 15;
                }
                logHHAuto("Current league is target ("+Number(getPlayerCurrentLevel)+"/"+Number(Storage().HHAuto_Temp_leaguesTarget)+"), needs to stay. max rank : "+rankStay);
                maxStay = Number($("div.leagues_table table tr td span:contains("+rankStay+")").filter(function() {
                    return Number($.trim($(this).text())) === rankStay;
                }).parent().parent()[0].lastElementChild.innerText.replace(/\D/g, ''));


                logHHAuto("Current league is target ("+Number(getPlayerCurrentLevel)+"/"+Number(Storage().HHAuto_Temp_leaguesTarget)+"), needs to stay. Score should not be higher than : "+maxStay);
                if ( currentScore + leagueScoreSecurityThreshold >= maxStay )
                {
                    logHHAuto("Can't do league as could go above stay, setting timer to 30 mins");
                    setTimer('nextLeaguesTime',Number(30*60)+1);
                    //prevent paranoia to wait for league
                    Storage().HHAuto_Temp_paranoiaLeagueBlocked="true";
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
                    location.href = "/battle.html?league_battle=1&id_member=" + oppoID;
                    clearTimer('nextLeaguesTime');
                }
            }
            else
            {
                location.href = "/battle.html?league_battle=1&id_member=" + Data[0]
            }

        }
    }
    else if (page==="battle")
    {
        CrushThem();
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
    $("#leagues #leagues_middle").prepend('<div id="popup_message_league" class="popup_message_league" name="popup_message_league" >'+getTextForUI("OpponentListBuilding","elementText")+' : <br>'+numberDone+' '+getTextForUI("OpponentParsed","elementText")+' ('+remainingTime+')</div>');
}
function LeagueClearDisplayGetOpponentPopup()
{
    $("#popup_message_league").each(function(){this.remove();});
}

function LeagueUpdateGetOpponentPopup(numberDone,remainingTime)
{
    LeagueClearDisplayGetOpponentPopup();
    LeagueDisplayGetOpponentPopup(numberDone,remainingTime);
}

function getLeagueOpponentId(opponentsIDList)
{
    var opponentsPowerList = sessionStorage.HHAuto_Temp_LeagueOpponentList?JSON.parse(sessionStorage.HHAuto_Temp_LeagueOpponentList,reviverMap):new Map([]);
    var opponentsTempPowerList = sessionStorage.HHAuto_Temp_LeagueTempOpponentList?JSON.parse(sessionStorage.HHAuto_Temp_LeagueTempOpponentList,reviverMap):new Map([]);
    var opponentsListExpirationDate = sessionStorage.HHAuto_Temp_opponentsListExpirationDate?sessionStorage.HHAuto_Temp_opponentsListExpirationDate:'empty';
    var opponentsIDs= opponentsIDList;
    var oppoNumber = opponentsIDList.length;
    var playerEgo;
    var playerDefHC;
    var playerDefKH;
    var playerDefCH;

    var playerAtk;
    var playerClass;
    var playerAlpha;
    var playerBeta;
    var playerOmega;
    var playerExcitement;
    var DataOppo=new Map([]);
    var maxTime = 1.6;

    //toremove after migration in prod
    var girlDataName;
    if ($('div#leagues_left .girls_wrapper .team_girl[g=1][girl-tooltip-data]').length >0)
    {
        girlDataName = "girl-tooltip-data";
    }
    else
    {
        girlDataName = "new-girl-tooltip-data";

    }

    if (opponentsListExpirationDate === 'empty' || opponentsListExpirationDate < new Date() || opponentsPowerList.size ===0)
    {
        if (opponentsTempPowerList.size > 0)
        {
            logHHAuto("Opponents list already started, continuing.");
            //removing already done in opponentsIDList
            for (var i of opponentsTempPowerList.keys())
            {
                opponentsIDList = opponentsIDList.filter(item => Number(item) !== i)
            }
            DataOppo = opponentsTempPowerList;
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

        playerEgo = Math.round(getSetHeroInfos('caracs.ego'));
        playerDefHC = Math.round(getSetHeroInfos('caracs.def_carac1'));
        playerDefCH = Math.round(getSetHeroInfos('caracs.def_carac2'));
        playerDefKH = Math.round(getSetHeroInfos('caracs.def_carac3'));
        playerAtk = Math.round(getSetHeroInfos('caracs.damage'));
        playerClass = $('div#leagues_left .icon').attr('carac');
        playerAlpha = JSON.parse($('div#leagues_left .girls_wrapper .team_girl[g=1]').attr(girlDataName));
        playerBeta = JSON.parse($('div#leagues_left .girls_wrapper .team_girl[g=2]').attr(girlDataName));
        playerOmega = JSON.parse($('div#leagues_left .girls_wrapper .team_girl[g=3]').attr(girlDataName));
        playerExcitement = Math.round((playerAlpha.caracs.carac1 + playerAlpha.caracs.carac2 + playerAlpha.caracs.carac3) * 28);
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
                var opponentDef;
                var playerDef;
                let opponentEgo = opponentData.caracs.ego;
                let opponentAtk = opponentData.caracs.damage
                let opponentAlpha = opponentData.team["1"];
                let opponentBeta = opponentData.team["2"];
                let opponentOmega = opponentData.team["3"];
                let opponentName = opponentData.Name;
                if (opponentData.class == '1') {
                    playerDef = playerDefHC;
                }
                if (opponentData.class == '2') {
                    playerDef = playerDefCH;
                }
                if (opponentData.class == '3') {
                    playerDef = playerDefKH;
                }
                if (playerClass == 'class1') {
                    opponentDef = opponentData.caracs.def_carac1;
                }
                if (playerClass == 'class2') {
                    opponentDef = opponentData.caracs.def_carac2;
                }
                if (playerClass == 'class3') {
                    opponentDef = opponentData.caracs.def_carac3;
                }
                var opponentExcitement = Math.round((opponentData.team["1"].caracs.carac1 + opponentData.team["1"].caracs.carac2 + opponentData.team["1"].caracs.carac3) * 28);
                let playerAlphaAdd;
                let playerBetaAdd;
                let playerOmegaAdd;
                let opponentAlphaAdd;
                let opponentBetaAdd;
                let opponentOmegaAdd;
                if (playerClass == ('class' + HC)) {
                    playerAlphaAdd = playerAlpha.caracs.carac1;
                    playerBetaAdd = playerBeta.caracs.carac1;
                    playerOmegaAdd = playerOmega.caracs.carac1;
                }
                if (playerClass == ('class' + CH)) {
                    playerAlphaAdd = playerAlpha.caracs.carac2;
                    playerBetaAdd = playerBeta.caracs.carac2;
                    playerOmegaAdd = playerOmega.caracs.carac2;
                }
                if (playerClass == ('class' + KH)) {
                    playerAlphaAdd = playerAlpha.caracs.carac3;
                    playerBetaAdd = playerBeta.caracs.carac3;
                    playerOmegaAdd = playerOmega.caracs.carac3;
                }

                if (opponentData.class == HC) {
                    playerDef = playerDefHC;
                    opponentAlphaAdd = opponentAlpha.caracs.carac1;
                    opponentBetaAdd = opponentBeta.caracs.carac1;
                    opponentOmegaAdd = opponentOmega.caracs.carac1;
                }
                if (opponentData.class == CH) {
                    playerDef = playerDefCH;
                    opponentAlphaAdd = opponentAlpha.caracs.carac2;
                    opponentBetaAdd = opponentBeta.caracs.carac2;
                    opponentOmegaAdd = opponentOmega.caracs.carac2;
                }
                if (opponentData.class == KH) {
                    playerDef = playerDefKH;
                    opponentAlphaAdd = opponentAlpha.caracs.carac3;
                    opponentBetaAdd = opponentBeta.caracs.carac3;
                    opponentOmegaAdd = opponentOmega.caracs.carac3;
                }

                let playerTeam = [0, playerAlphaAdd, playerBetaAdd, playerOmegaAdd];
                let opponentTeam = [0, opponentAlphaAdd, opponentBetaAdd, opponentOmegaAdd];


                let player = {
                    ego: playerEgo,
                    originEgo: playerEgo,
                    atk: playerAtk,
                    def: playerDef,

                    alpha: playerAlpha,
                    beta: playerBeta,
                    omega: playerOmega,
                    team: playerTeam,

                    orgasm: 0,
                    orgasmCount: 0,
                    excitement: playerExcitement,

                    text: 'Player',
                };

                let opponent = {
                    ego: opponentEgo,
                    originEgo: opponentEgo,
                    atk: opponentAtk,
                    def: opponentDef,

                    alpha: opponentAlpha,
                    beta: opponentBeta,
                    omega: opponentOmega,
                    team: opponentTeam,

                    orgasm: 0,
                    orgasmCount: 0,
                    excitement: opponentExcitement,

                    text: 'Opponent',
                    name: opponentName,
                };




                //console.log(opponent);
                let simu = simuFight(player, opponent);
                //console.log(opponent);
                //console.log(simu);
                matchRating=customMatchRating(simu);

                //var matchRating = calculatePower(playerEgo,playerDef,playerAtk,playerClass,playerAlpha,playerBeta,playerOmega,playerExcitement,opponentName,opponentEgo,opponentDef,opponentAtk,'class'+opponent.class,opponentAlpha,opponentBeta,opponentOmega,opponentExcitement);
                matchRating = Number(matchRating.substring(1));
                //logHHAuto('matchRating:'+matchRating);
                //if (!isNaN(matchRating))
                //{
                DataOppo.set(opponentData.id_member,matchRating);
                sessionStorage.HHAuto_Temp_LeagueTempOpponentList = JSON.stringify(DataOppo,replacerMap);
                //}
                //DataOppo.push(JSON.parse(data.html.substring(data.html.indexOf(findText)+findText.length,data.html.lastIndexOf(';'))));

            });

            opponentsIDList.shift();
            LeagueUpdateGetOpponentPopup(DataOppo.size+'/'+oppoNumber, toHHMMSS((oppoNumber-DataOppo.size)*maxTime));
            setTimeout(getOpponents,randomInterval(800,maxTime*1000));

            window.top.postMessage({ImAlive:true},'*');
        }
        else
        {
            //logHHAuto('nothing to click, checking data');
            sessionStorage.HHAuto_Temp_opponentsListExpirationDate=new Date().getTime() + 60*60 * 1000
            //logHHAuto(DataOppo);
            sessionStorage.removeItem("HHAuto_Temp_LeagueTempOpponentList");
            sessionStorage.HHAuto_Temp_LeagueOpponentList = JSON.stringify(DataOppo,replacerMap);
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
            OppoScore = Number(opponentsPowerList.get(Number(oppo)));
            if (( maxScore == -1 || OppoScore > maxScore ) && !isNaN(OppoScore))
            {

                maxScore = OppoScore;
                IdOppo = oppo;
            }
        }
        logHHAuto("highest score opponent : "+IdOppo+'('+maxScore+')');
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

var  CrushThem = function()
{
    if (getPage() === "battle") {
        // On battle page.
        if ($("#rewards_popup .blue_text_button").size()>0)
        {
            $("#rewards_popup .blue_text_button").click();
        }
        if ($("#rewards_popup .blue_button_L").size()>0)
        {
            $("#rewards_popup .blue_button_L").click();
        }

        //logHHAuto("On Battle Page.");
        if ($("#battle[class='canvas']").length === 1) {
            // Battle screen
            logHHAuto("On battle screen.");
            // get button with no autofight, i.e. no koban
            var battleButton = $('#battle button[rel="launch"]:not(.autofight)');
            //logHHAuto(battleButton.get());
            //logHHAuto(battleButton);
            var currentPower = getSetHeroInfos('fight.amount');
            if(battleButton === undefined){
                logHHAuto("Battle Button was undefined. Disabling all auto-battle.");
                document.getElementById("autoTrollCheckbox").checked = false;
                //document.getElementById("autoArenaCheckbox").checked = false;
                if (sessionStorage.HHAuto_Temp_questRequirement === "battle")
                {
                    document.getElementById("autoQuestCheckbox").checked = false;
                    logHHAuto("Auto-quest disabled since it requires battle and auto-battle has errors.");
                }
                return;
            }
            var battle_price = battleButton.find('span').size()>0?battleButton.attr("price_fe"):0;

            if (location.search.split("league_battle=")[1])
            {
                currentPower=getSetHeroInfos('challenge.amount');
            }
            if(battle_price === undefined){
                logHHAuto("Could not detect battle button price. Error.");
                logHHAuto("Disabling all auto-battle.");
                document.getElementById("autoTrollCheckbox").checked = false;
                //document.getElementById("autoArenaCheckbox").checked = false;
                if (sessionStorage.HHAuto_Temp_questRequirement === "battle")
                {
                    document.getElementById("autoQuestCheckbox").checked = false;
                    logHHAuto("Auto-quest disabled since it requires battle and auto-battle has errors.");
                }
                return;
            }
            logHHAuto("battle price: "+battle_price+"P")
            if(currentPower >= battle_price)
            {
                // We have the power.
                is_cheat_click=function(e) {
                    return false;
                };
                battleButton.click();
                // Skip
                setTimeout(function(){$("#battle_middle button[rel='skip']").click();},2000);
                setTimeout(function(){$("#rewards_popup .blue_text_button").click();$("#rewards_popup .blue_button_L").click();},3500);

                if (sessionStorage.HHAuto_Temp_questRequirement === "battle") {
                    // Battle Done.
                    sessionStorage.HHAuto_Temp_questRequirement = "none";
                }

                //gotoPage("home");
                return true;
            }
            else
            {
                // We need more power.
                logHHAuto("Battle requires "+battle_price+" power.");
                sessionStorage.HHAuto_Temp_battlePowerRequired = battle_price;
                if(sessionStorage.HHAuto_Temp_questRequirement === "battle")sessionStorage.HHAuto_Temp_questRequirement = "P"+battle_price;
            }
        }
        else {
            logHHAuto("Could not identify battle screen.");
            if (sessionStorage.HHAuto_Temp_questRequirement === "battle") sessionStorage.HHAuto_Temp_questRequirement = "errorInAutoBattle";
            return;
        }
    }
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


var getPachinko = function(){
    try {
        if(!gotoPage("pachinko"))
        {
            // Not at Pachinko screen then goto the Pachinko screen.
            logHHAuto("Navigating to Pachinko window.");
            return;
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
            var npach;
            for(var e in unsafeWindow.HHTimers.timers){
                if(unsafeWindow.HHTimers.timers[e].$elm && unsafeWindow.HHTimers.timers[e].$elm.selector.startsWith(".pachinko_change"))
                    npach=unsafeWindow.HHTimers.timers[e].remainingTime;
            }
            if(npach !== undefined || npach !== 0)
            {
                setTimer('nextPachinkoTime',Number(npach)+1);
            }
            else
            {
                clearTimer('nextPachinkoTime');
            }
        }
    }
    catch (ex) {
        logHHAuto("Could not collect Great Pachinko... " + ex);
    }
};

var getPachinko2 = function(){
    try {
        if(!gotoPage("pachinko"))
        {
            // Not at Pachinko screen then goto the Pachinko screen.
            logHHAuto("Navigating to Pachinko window.");
            return;
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
            while ($('#playzone-replace-info button[free=1]')[0]===undefined && (counter++)<250)
            {
                logHHAuto('to mythic');
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
            var npach;
            for(var e in unsafeWindow.HHTimers.timers){
                if(unsafeWindow.HHTimers.timers[e].$elm && unsafeWindow.HHTimers.timers[e].$elm.selector.startsWith('.game-simple-block[type-pachinko="mythic"]'))
                    npach=unsafeWindow.HHTimers.timers[e].remainingTime;
            }
            if(npach !== undefined || npach !== 0)
            {
                setTimer('nextPachinko2Time',Number(npach)+1);
            }
            else
            {
                clearTimer('nextPachinko2Time');
            }
        }
    }
    catch (ex) {
        logHHAuto("Could not collect Mythic Pachinko... " + ex);
    }
};

var updateShop=function()
{
    if(!gotoPage("shop"))
    {
        logHHAuto("Navigating to Market window.");
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
        sessionStorage.HHAuto_Temp_charLevel=getSetHeroInfos('level');

        var nshop;
        for(var e in unsafeWindow.HHTimers.timers){
            if(unsafeWindow.HHTimers.timers[e].$elm && unsafeWindow.HHTimers.timers[e].$elm.selector.startsWith(".shop_count"))
                nshop=unsafeWindow.HHTimers.timers[e].remainingTime;
        }
        if(nshop !== undefined && nshop !== 0)
        {
            setTimer('nextShopTime',Number(nshop)+1);
        }
        else
        {
            setTimer('nextShopTime',60);
        }
    }
    return false;
}

var toHHMMSS = function (secs)  {
    var sec_num = parseInt(secs, 10);
    var days   = Math.floor(sec_num / 86400);
    var hours   = Math.floor(sec_num / 3600) % 24;
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
    if ( ! Storage().HHAuto_Temp_paranoiaSpendings )
    {
        return -1;
    }
    else
    {
        pSpendings = JSON.parse(Storage().HHAuto_Temp_paranoiaSpendings,reviverMap);
    }

    if ( Storage().HHAuto_Temp_paranoiaQuestBlocked !== undefined && pSpendings.has('quest'))
    {
        pSpendings.delete('quest');
    }

    if ( Storage().HHAuto_Temp_paranoiaLeagueBlocked !== undefined && pSpendings.has('challenge'))
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
    Storage().removeItem('HHAuto_Temp_paranoiaSpendings');
    Storage().removeItem('HHAuto_Temp_NextSwitch');
    Storage().removeItem('HHAuto_Temp_paranoiaQuestBlocked');
    Storage().removeItem('HHAuto_Temp_paranoiaLeagueBlocked');
}

function updatedParanoiaSpendings(inSpendingFunction, inSpent)
{
    var currentPSpendings=new Map([]);
    // not set
    if ( ! Storage().HHAuto_Temp_paranoiaSpendings )
    {
        return -1;
    }
    else
    {
        currentPSpendings = JSON.parse(Storage().HHAuto_Temp_paranoiaSpendings,reviverMap);
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
        Storage().HHAuto_Temp_paranoiaSpendings=JSON.stringify(currentPSpendings,replacerMap);

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
    if (Storage().HHAuto_Temp_NextSwitch && Storage().HHAuto_Setting_paranoiaSpendsBefore === "true")
    {
        toNextSwitch = Number((Storage().HHAuto_Temp_NextSwitch-new Date().getTime())/1000);

        //if autoLeague is on
        if(Storage().HHAuto_Setting_autoLeagues === "true" && getSetHeroInfos('level')>=20)
        {
            if ( Storage().HHAuto_Temp_paranoiaLeagueBlocked === undefined )
            {
                maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getSetHeroInfos('challenge.next_refresh_ts')))/Number(getSetHeroInfos('challenge.seconds_per_point')));
                currentEnergy=Number(getSetHeroInfos('challenge.amount'));
                maxEnergy=Number(getSetHeroInfos('challenge.max_amount'));
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
        if(Storage().HHAuto_Setting_autoQuest === "true")
        {
            if ( Storage().HHAuto_Temp_paranoiaQuestBlocked === undefined )
            {
                maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getSetHeroInfos('quest.next_refresh_ts')))/Number(getSetHeroInfos('quest.seconds_per_point')));
                currentEnergy=Number(getSetHeroInfos('quest.amount'));
                maxEnergy=Number(getSetHeroInfos('quest.max_amount'));
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
        if(Storage().HHAuto_Setting_autoTrollBattle === "true" && getSetHeroInfos('questing.id_world')>0)
        {
            maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getSetHeroInfos('fight.next_refresh_ts')))/Number(getSetHeroInfos('fight.seconds_per_point')));
            currentEnergy=Number(getSetHeroInfos('fight.amount'));
            maxEnergy=Number(getSetHeroInfos('fight.max_amount'));
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
        if(Storage().HHAuto_Setting_autoSeason === "true")
        {
            maxPointsDuringParanoia = Math.ceil((toNextSwitch-Number(getSetHeroInfos('kiss.next_refresh_ts')))/Number(getSetHeroInfos('kiss.seconds_per_point')));
            currentEnergy=Number(getSetHeroInfos('kiss.amount'));
            maxEnergy=Number(getSetHeroInfos('kiss.max_amount'));
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

        logHHAuto("Setting paranoia spending to : "+JSON.stringify(paranoiaSpendings,replacerMap));
        Storage().HHAuto_Temp_paranoiaSpendings=JSON.stringify(paranoiaSpendings,replacerMap);
    }
}

var flipParanoia=function()
{
    var burst=getBurst();

    var Setting=Storage().HHAuto_Temp_paranoiaSettings;

    var S1=Setting.split('/').map(s=>s.split('|').map(s=>s.split(':')));

    var toNextSwitch;
    var period;
    var n = new Date().getHours();
    S1[2].some(x => {if (n<x[0]) {period=x[1]; return true;}});

    if (burst)
    {
        var periods=Object.assign(...S1[1].map(d => ({[d[0]]: d[1].split('-')})));

        toNextSwitch=Storage().HHAuto_Temp_NextSwitch?Number((Storage().HHAuto_Temp_NextSwitch-new Date().getTime())/1000):randomInterval(Number(periods[period][0]),Number(periods[period][1]));
        /*
        if (toNextSwitch<=1800 && Storage().HHAuto_Setting_autoArenaBattle == "true")
        {
            var sl=getSecondsLeft("nextArenaTime");
            toNextSwitch=toNextSwitch<sl?toNextSwitch:sl;
        }
        */

        //match mythic new wave with end of sleep
        if (Storage().HHAuto_Setting_autoTrollMythicByPassParanoia === "true" && getTimer("eventMythicNextWave") !== -1 && toNextSwitch>getSecondsLeft("eventMythicNextWave"))
        {
            logHHAuto("Forced rest only until next mythic wave.");
            toNextSwitch=getSecondsLeft("eventMythicNextWave")+randomInterval(10,30);
        }

        //bypass Paranoia if ongoing mythic
        if (Storage().HHAuto_Setting_autoTrollMythicByPassParanoia === "true" && sessionStorage.HHAuto_Temp_eventTrollIsMythic==="true")
        {
            var trollThreshold = Number(Storage().HHAuto_Setting_autoTrollThreshold);
            if (Storage().HHAuto_Setting_autoTrollMythicByPassThreshold === "true")
            {
                trollThreshold = 0;
            }
            //mythic onGoing and still have some fight above threshold
            if (Number(getSetHeroInfos('fight.amount')) > trollThreshold)
            {
                logHHAuto("Forced bypass Paranoia for mythic (can fight).");
                setTimer('paranoiaSwitch',60);
                return;
            }

            //mythic ongoing and can buyCombat
            var diffMythic=Math.ceil(Timers["eventMythicGoing"]/1000)-Math.ceil(new Date().getTime()/1000);
            var hero=getHero();
            var price=hero.get_recharge_cost("fight");
            if (diffMythic<Storage().HHAuto_Setting_buyMythicCombTimer*3600
                && getSetHeroInfos('fight.amount')==0
                && getSetHeroInfos('hard_currency')>=price+Number(Storage().HHAuto_Setting_kobanBank)
                && Storage().HHAuto_Setting_buyMythicCombat=="true"
               )
            {

                logHHAuto("Forced bypass Paranoia for mythic (can buy).");
                setTimer('paranoiaSwitch',60);
                return;
            }
        }

        if ( checkParanoiaSpendings() === -1 && Storage().HHAuto_Setting_paranoiaSpendsBefore === "true" )
        {
            Storage().HHAuto_Temp_NextSwitch=new Date().getTime() + toNextSwitch * 1000;
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
    var offs=new Date().getTimezoneOffset();
    var message=period+(burst?" rest":" burst");
    logHHAuto("PARANOIA: "+message);
    sessionStorage.HHAuto_Temp_pinfo=message;

    setTimer('paranoiaSwitch',toNextSwitch);
    if (sessionStorage.HHAuto_Temp_burst=="true")
    {
        if (hh_nutaku)
        {
            //window.top.postMessage({reloadMe:true},'*');
            location.reload();
        }
        else
        {
            window.top.location.reload();
        }
    }
}

function moduleSimLeague() {
    var playerEgo;
    var playerDefHC;
    var playerDefKH;
    var playerDefCH;
    var playerDef;
    var playerAtk;
    var playerClass;
    var playerAlpha;
    var playerBeta;
    var playerOmega;
    var playerExcitement;
    var opponentName;
    var opponentEgo;
    var opponentDefHC;
    var opponentDefKH;
    var opponentDefCH;
    var opponentDef;
    var opponentAtk;
    var opponentClass;
    var opponentAlpha;
    var opponentBeta;
    var opponentOmega;
    var opponentExcitement;
    var matchRating;
    var matchRatingFlag;


    //toremove after migration in prod
    var girlDataName;
    if ($('div#leagues_left .girls_wrapper .team_girl[g=1][girl-tooltip-data]').length >0)
    {
        girlDataName = "girl-tooltip-data";
    }
    else
    {
        girlDataName = "new-girl-tooltip-data";

    }

    var SimPower = function()
    {
        if ($("div.matchRatingNew img#powerLevelScouter").length != 0)
        {
            return;
        }
        // player stats
        playerEgo = Math.round(getSetHeroInfos('caracs.ego'));
        playerDefHC = Math.round(getSetHeroInfos('caracs.def_carac1'));
        playerDefCH = Math.round(getSetHeroInfos('caracs.def_carac2'));
        playerDefKH = Math.round(getSetHeroInfos('caracs.def_carac3'));
        playerAtk = Math.round(getSetHeroInfos('caracs.damage'));
        playerClass = $('div#leagues_left .icon').attr('carac');


        playerAlpha = JSON.parse($('div#leagues_left .girls_wrapper .team_girl[g=1]').attr(girlDataName));
        playerBeta = JSON.parse($('div#leagues_left .girls_wrapper .team_girl[g=2]').attr(girlDataName));
        playerOmega = JSON.parse($('div#leagues_left .girls_wrapper .team_girl[g=3]').attr(girlDataName));
        playerExcitement = Math.round((playerAlpha.caracs.carac1 + playerAlpha.caracs.carac2 + playerAlpha.caracs.carac3) * 28);
        // opponent stats
        opponentName = $('div#leagues_right div.player_block div.title').text();
        opponentEgo = parseInt($('div#leagues_right div.lead_ego div:nth-child(2)').text().replace(/[^0-9]/gi, ''));
        opponentDefHC = $('div#leagues_right div.stats_wrap div:nth-child(2)').text();
        opponentDefCH = $('div#leagues_right div.stats_wrap div:nth-child(4)').text();
        opponentDefKH = $('div#leagues_right div.stats_wrap div:nth-child(6)').text();
        opponentAtk = $('div#leagues_right div.stats_wrap div:nth-child(8)').text();
        opponentClass = $('div#leagues_right .icon').attr('carac');
        opponentAlpha = JSON.parse($('div#leagues_right .girls_wrapper .team_girl[g=1]').attr(girlDataName));
        opponentBeta = JSON.parse($('div#leagues_right .girls_wrapper .team_girl[g=2]').attr(girlDataName));
        opponentOmega = JSON.parse($('div#leagues_right .girls_wrapper .team_girl[g=3]').attr(girlDataName));
        opponentExcitement = Math.round((opponentAlpha.caracs.carac1 + opponentAlpha.caracs.carac2 + opponentAlpha.caracs.carac3) * 28);

        //Determine each side's actual defense
        if (playerClass == 'class1') {
            opponentDef = opponentDefHC;
        }
        if (playerClass == 'class2') {
            opponentDef = opponentDefCH;
        }
        if (playerClass == 'class3') {
            opponentDef = opponentDefKH;
        }

        if (opponentClass == 'class1') {
            playerDef = playerDefHC;
        }
        if (opponentClass == 'class2') {
            playerDef = playerDefCH;
        }
        if (opponentClass == 'class3') {
            playerDef = playerDefKH;
        }

        if (opponentDef.includes('.') || opponentDef.includes(',')) {
            opponentDef = parseInt(opponentDef.replace('K', '00').replace(/[^0-9]/gi, ''));
        }
        else {
            opponentDef = parseInt(opponentDef.replace('K', '000').replace(/[^0-9]/gi, ''));
        }


        if (opponentAtk.includes('.') || opponentAtk.includes(',')) {
            opponentAtk = parseInt(opponentAtk.replace('K', '00').replace(/[^0-9]/gi, ''));
        }
        else
        {
            opponentAtk = parseInt(opponentAtk.replace('K', '000').replace(/[^0-9]/gi, ''));
        }

        let playerAlphaAdd;
        let playerBetaAdd;
        let playerOmegaAdd;
        let opponentAlphaAdd;
        let opponentBetaAdd;
        let opponentOmegaAdd;
        if (playerClass == ('class' + HC)) {
            playerAlphaAdd = playerAlpha.caracs.carac1;
            playerBetaAdd = playerBeta.caracs.carac1;
            playerOmegaAdd = playerOmega.caracs.carac1;
        }
        if (playerClass == ('class' + CH)) {
            playerAlphaAdd = playerAlpha.caracs.carac2;
            playerBetaAdd = playerBeta.caracs.carac2;
            playerOmegaAdd = playerOmega.caracs.carac2;
        }
        if (playerClass == ('class' + KH)) {
            playerAlphaAdd = playerAlpha.caracs.carac3;
            playerBetaAdd = playerBeta.caracs.carac3;
            playerOmegaAdd = playerOmega.caracs.carac3;
        }

        if (opponentClass == ('class' + HC)) {
            playerDef = playerDefHC;
            opponentAlphaAdd = opponentAlpha.caracs.carac1;
            opponentBetaAdd = opponentBeta.caracs.carac1;
            opponentOmegaAdd = opponentOmega.caracs.carac1;
        }
        if (opponentClass == ('class' + CH)) {
            playerDef = playerDefCH;
            opponentAlphaAdd = opponentAlpha.caracs.carac2;
            opponentBetaAdd = opponentBeta.caracs.carac2;
            opponentOmegaAdd = opponentOmega.caracs.carac2;
        }
        if (opponentClass == ('class' + KH)) {
            playerDef = playerDefKH;
            opponentAlphaAdd = opponentAlpha.caracs.carac3;
            opponentBetaAdd = opponentBeta.caracs.carac3;
            opponentOmegaAdd = opponentOmega.caracs.carac3;
        }

        let playerTeam = [0, playerAlphaAdd, playerBetaAdd, playerOmegaAdd];
        let opponentTeam = [0, opponentAlphaAdd, opponentBetaAdd, opponentOmegaAdd];

        let player = {
            ego: playerEgo,
            originEgo: playerEgo,
            atk: playerAtk,
            def: playerDef,

            alpha: playerAlpha,
            beta: playerBeta,
            omega: playerOmega,
            team: playerTeam,

            orgasm: 0,
            orgasmCount: 0,
            excitement: playerExcitement,

            text: 'Player',
        };

        let opponent = {
            ego: opponentEgo,
            originEgo: opponentEgo,
            atk: opponentAtk,
            def: opponentDef,

            alpha: opponentAlpha,
            beta: opponentBeta,
            omega: opponentOmega,
            team: opponentTeam,

            orgasm: 0,
            orgasmCount: 0,
            excitement: opponentExcitement,

            text: 'Opponent',
            name: opponentName,
        };

        //console.log(opponent);
        let simu = simuFight(player, opponent);
        //console.log(opponent);
        //console.log(simu);
        matchRating=customMatchRating(simu);

        //matchRating = calculatePower(playerEgo,playerDef,playerAtk,playerClass,playerAlpha,playerBeta,playerOmega,playerExcitement,opponentName,opponentEgo,opponentDef,opponentAtk,opponentClass,opponentAlpha,opponentBeta,opponentOmega,opponentExcitement);

        //Publish the ego difference as a match rating
        matchRatingFlag = matchRating.substring(0,1);
        matchRating = matchRating.substring(1);

        switch (matchRatingFlag)
        {
            case 'g':
                $('div#leagues_right .girls_wrapper').append('<div class="matchRatingNew plus"><img id="powerLevelScouter" src="https://i.postimg.cc/qgkpN0sZ/Opponent-green.png">' + matchRating + '</div>');
                $("tr.lead_table_default div[second-row]").append('<div class="matchRatingNew plus"><img id="powerLevelScouter" src="https://i.postimg.cc/qgkpN0sZ/Opponent-green.png">' + matchRating + '</div>');
                break;
            case 'y':
                $('div#leagues_right .girls_wrapper').append('<div class="matchRatingNew close"><img id="powerLevelScouter" src="https://i.postimg.cc/3JCgVBdK/Opponent-orange.png">' + matchRating + '</div>');
                $("tr.lead_table_default div[second-row]").append('<div class="matchRatingNew close"><img id="powerLevelScouter" src="https://i.postimg.cc/3JCgVBdK/Opponent-orange.png">' + matchRating + '</div>');
                break;
            case 'r':
                $('div#leagues_right .girls_wrapper').append('<div class="matchRatingNew minus"><img id="powerLevelScouter" src="https://i.postimg.cc/PxgxrBVB/Opponent-red.png">' + matchRating + '</div>');
                $("tr.lead_table_default div[second-row]").append('<div class="matchRatingNew minus"><img id="powerLevelScouter" src="https://i.postimg.cc/PxgxrBVB/Opponent-red.png">' + matchRating + '</div>');
                break;
        }


        //Replace opponent excitement with the correct value
        //$('div#leagues_right div.stats_wrap div:nth-child(9) span:nth-child(2)').empty().append(nRounding(opponentExcitement, 0, 1));

        //Replace player excitement with the correct value
        //$('div#leagues_left div.stats_wrap div:nth-child(9) span:nth-child(2)').empty().append(nRounding(playerExcitement, 0, 1));
    }
    if ($("div.matchRatingNew img#powerLevelScouter").length != 0)
    {
        return;
    }
    SimPower();

    // Refresh sim on new opponent selection (Credit: BenBrazke)
    var opntName;
    $('.leadTable').click(function() {
        opntName=''
    })
    function waitOpnt() {
        setTimeout(function() {
            if (JSON.parse($('div#leagues_right .girls_wrapper .team_girl[g=3]').attr(girlDataName))) {
                SimPower();
            }
            else {
                waitOpnt()
            }
        }, 50);
    }
    var observeCallback = function() {
        var opntNameNew = $('div#leagues_right div.player_block div.title')[0].innerHTML
        if (opntName !== opntNameNew) {
            opntName = opntNameNew;
            waitOpnt();
        }
    }
    var observer = new MutationObserver(observeCallback);
    var test = document.getElementById('leagues_right');
    observer.observe(test, {attributes: false, childList: true, subtree: false});

    //CSS

    var sheet = (function() {
        var style = document.createElement('style');
        document.head.appendChild(style);
        return style.sheet;
    })();

    GM_addStyle('#leagues_right .player_block .lead_player_profile .level_wrapper {'
                + 'top: -8px !important;}'
               );

    GM_addStyle('#leagues_right .player_block .lead_player_profile .icon {'
                + 'top: 5px !important;}'
               );

    GM_addStyle('@media only screen and (min-width: 1026px) {'
                + '.matchRatingNew {'
                + 'margin-top: 50px; '
                + 'margin-left: -120px; '
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
}



function moduleSimBattle() {
    var playerEgo;
    var playerDefHC;
    var playerDefKH;
    var playerDefCH;
    var playerDef;
    var playerAtk;
    var playerClass;
    var playerAlpha;
    var playerBeta;
    var playerOmega;
    var playerExcitement;
    var opponentName;
    var opponentEgo;
    var opponentDefHC;
    var opponentDefKH;
    var opponentDefCH;
    var opponentDef;
    var opponentAtk;
    var opponentClass;
    var opponentAlpha;
    var opponentBeta;
    var opponentOmega;
    var opponentExcitement;
    var matchRating;
    var matchRatingFlag;
    if ($("div.matchRatingNew img#powerLevelScouter").length != 0)
    {
        return;
    }
    //toremove after migration in prod
    var girlDataName;
    if ($('div.battle_hero .battle-faces div[girl_n=0][girl-tooltip-data]').length >0)
    {
        girlDataName = "girl-tooltip-data";
    }
    else
    {
        girlDataName = "new-girl-tooltip-data";

    }
    // player stats
    playerEgo = Math.round(getSetHeroInfos('caracs.ego'));
    playerDefHC = Math.round(getSetHeroInfos('caracs.def_carac1'));
    playerDefCH = Math.round(getSetHeroInfos('caracs.def_carac2'));
    playerDefKH = Math.round(getSetHeroInfos('caracs.def_carac3'));
    playerAtk = Math.round(getSetHeroInfos('caracs.damage'));
    playerClass = 'class'+getSetHeroInfos('class');
    //playerClass = $('div#leagues_left .icon').attr('carac');
    playerAlpha = JSON.parse($("div.battle_hero .battle-faces div[girl_n=0]").attr(girlDataName));
    playerBeta =  JSON.parse($("div.battle_hero .battle-faces div[girl_n=1]").attr(girlDataName));
    playerOmega = JSON.parse($("div.battle_hero .battle-faces div[girl_n=2]").attr(girlDataName));
    playerExcitement = Math.round((playerAlpha.caracs.carac1 + playerAlpha.caracs.carac2 + playerAlpha.caracs.carac3) * 28);
    // opponent stats
    opponentName = $('div.battle_opponent h3')[0].innerText;
    opponentEgo = parseInt($('div.battle_opponent .battle-bar-ego .over').text().replace(/[^0-9]/gi, ''));

    opponentDefHC = Number($('div.battle_opponent .stats_wrap').children()[1].innerText.split('-')[0].replace(/[^0-9]/gi, ''));
    opponentDefCH = Number($('div.battle_opponent .stats_wrap').children()[3].innerText.split('-')[0].replace(/[^0-9]/gi, ''));
    opponentDefKH = Number($('div.battle_opponent .stats_wrap').children()[5].innerText.split('-')[0].replace(/[^0-9]/gi, ''));
    opponentAtk = Number($('div.battle_opponent .stats_wrap').children()[7].innerText.split('-')[0].replace(/[^0-9]/gi, ''));
    opponentClass = $('div.battle_opponent h3 div[hh_class_tooltip]').attr('carac');
    opponentAlpha = JSON.parse($('div.battle_opponent .battle-faces div[girl_n=0]').attr(girlDataName));
    opponentBeta = JSON.parse($('div.battle_opponent  .battle-faces div[girl_n=1]').attr(girlDataName));
    opponentOmega = JSON.parse($('div.battle_opponent  .battle-faces div[girl_n=2]').attr(girlDataName));
    opponentExcitement = Math.round((opponentAlpha.caracs.carac1 + opponentAlpha.caracs.carac2 + opponentAlpha.caracs.carac3) * 28);

    //Determine each side's actual defense
    if (playerClass == 'class1') {
        opponentDef = opponentDefHC;
    }
    if (playerClass == 'class2') {
        opponentDef = opponentDefCH;
    }
    if (playerClass == 'class3') {
        opponentDef = opponentDefKH;
    }

    if (opponentClass == 'class1') {
        playerDef = playerDefHC;
    }
    if (opponentClass == 'class2') {
        playerDef = playerDefCH;
    }
    if (opponentClass == 'class3') {
        playerDef = playerDefKH;
    }
    let playerAlphaAdd;
    let playerBetaAdd;
    let playerOmegaAdd;
    let opponentAlphaAdd;
    let opponentBetaAdd;
    let opponentOmegaAdd;
    if (playerClass == ('class' + HC)) {
        playerAlphaAdd = playerAlpha.caracs.carac1;
        playerBetaAdd = playerBeta.caracs.carac1;
        playerOmegaAdd = playerOmega.caracs.carac1;
    }
    if (playerClass == ('class' + CH)) {
        playerAlphaAdd = playerAlpha.caracs.carac2;
        playerBetaAdd = playerBeta.caracs.carac2;
        playerOmegaAdd = playerOmega.caracs.carac2;
    }
    if (playerClass == ('class' + KH)) {
        playerAlphaAdd = playerAlpha.caracs.carac3;
        playerBetaAdd = playerBeta.caracs.carac3;
        playerOmegaAdd = playerOmega.caracs.carac3;
    }

    if (opponentClass == ('class' + HC)) {
        playerDef = playerDefHC;
        opponentAlphaAdd = opponentAlpha.caracs.carac1;
        opponentBetaAdd = opponentBeta.caracs.carac1;
        opponentOmegaAdd = opponentOmega.caracs.carac1;
    }
    if (opponentClass == ('class' + CH)) {
        playerDef = playerDefCH;
        opponentAlphaAdd = opponentAlpha.caracs.carac2;
        opponentBetaAdd = opponentBeta.caracs.carac2;
        opponentOmegaAdd = opponentOmega.caracs.carac2;
    }
    if (opponentClass == ('class' + KH)) {
        playerDef = playerDefKH;
        opponentAlphaAdd = opponentAlpha.caracs.carac3;
        opponentBetaAdd = opponentBeta.caracs.carac3;
        opponentOmegaAdd = opponentOmega.caracs.carac3;
    }

    let playerTeam = [0, playerAlphaAdd, playerBetaAdd, playerOmegaAdd];
    let opponentTeam = [0, opponentAlphaAdd, opponentBetaAdd, opponentOmegaAdd];

    let player = {
        ego: playerEgo,
        originEgo: playerEgo,
        atk: playerAtk,
        def: playerDef,

        alpha: playerAlpha,
        beta: playerBeta,
        omega: playerOmega,
        team: playerTeam,

        orgasm: 0,
        orgasmCount: 0,
        excitement: playerExcitement,

        text: 'Player',
    };

    let opponent = {
        ego: opponentEgo,
        originEgo: opponentEgo,
        atk: opponentAtk,
        def: opponentDef,

        alpha: opponentAlpha,
        beta: opponentBeta,
        omega: opponentOmega,
        team: opponentTeam,

        orgasm: 0,
        orgasmCount: 0,
        excitement: opponentExcitement,

        text: 'Opponent',
        name: opponentName,
    };

    //console.log(opponent);
    let simu = simuFight(player, opponent);
    //console.log(opponent);
    //console.log(simu);
    matchRating=customMatchRating(simu);
    //matchRating = calculatePower(playerEgo,playerDef,playerAtk,playerClass,playerAlpha,playerBeta,playerOmega,playerExcitement,opponentName,opponentEgo,opponentDef,opponentAtk,opponentClass,opponentAlpha,opponentBeta,opponentOmega,opponentExcitement);

    //Publish the ego difference as a match rating
    matchRatingFlag = matchRating.substring(0,1);
    matchRating = matchRating.substring(1);

    switch (matchRatingFlag)
    {
        case 'g':
            $('div.battle_buttons_container').append('<div class="matchRatingNew plus"><img id="powerLevelScouter" src="https://i.postimg.cc/qgkpN0sZ/Opponent-green.png">' + matchRating + '</div>');
            break;
        case 'y':
            $('div.battle_buttons_container').append('<div class="matchRatingNew close"><img id="powerLevelScouter" src="https://i.postimg.cc/3JCgVBdK/Opponent-orange.png">' + matchRating + '</div>');
            break;
        case 'r':
            $('div.battle_buttons_container').append('<div class="matchRatingNew minus"><img id="powerLevelScouter" src="https://i.postimg.cc/PxgxrBVB/Opponent-red.png">' + matchRating + '</div>');
            break;
    }




    //Replace opponent excitement with the correct value
    //$('div#leagues_right div.stats_wrap div:nth-child(9) span:nth-child(2)').empty().append(nRounding(opponentExcitement, 0, 1));

    //Replace player excitement with the correct value
    //$('div#leagues_left div.stats_wrap div:nth-child(9) span:nth-child(2)').empty().append(nRounding(playerExcitement, 0, 1));




    var sheet = (function() {
        var style = document.createElement('style');
        document.head.appendChild(style);
        return style.sheet;
    })();

    //CSS

    GM_addStyle('.matchRatingNew {'
                + 'position : absolute; '
                + 'text-align: left; '
                + 'margin-top: -25px; '
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
}

function moduleSimSeasonBattle() {

    var oppoName;
    var playerEgo;
    var playerDefHC;
    var playerDefKH;
    var playerDefCH;

    var playerAtk;
    var playerClass;
    var playerAlpha;
    var playerBeta;
    var playerOmega;
    var playerExcitement;
    var matchRating;
    var matchRatingFlag;
    var mojoOppo=[];
    var scoreOppo=[];
    var nameOppo=[];
    var index;
    var marker='!!';
    var doDisplay=false;

    try
    {
        if ($("div.matchRatingNew img#powerLevelScouter").length != 3)
        {
            doDisplay=true;
        }
        //toremove after migration in prod
        var girlDataName;
        if ($('div.hero_team div[girl_n=0][girl-tooltip-data]').length >0)
        {
            girlDataName = "girl-tooltip-data";
        }
        else
        {
            girlDataName = "new-girl-tooltip-data";

        }
        // player stats
        playerEgo = Math.round(getSetHeroInfos('caracs.ego'));
        playerDefHC = Math.round(getSetHeroInfos('caracs.def_carac1'));
        playerDefCH = Math.round(getSetHeroInfos('caracs.def_carac2'));
        playerDefKH = Math.round(getSetHeroInfos('caracs.def_carac3'));
        playerAtk = Math.round(getSetHeroInfos('caracs.damage'));
        playerClass = 'class'+getSetHeroInfos('class');
        //playerClass = $('div#leagues_left .icon').attr('carac');
        playerAlpha = JSON.parse($("div.hero_team div[girl_n=0]").attr(girlDataName));
        playerBeta =  JSON.parse($("div.hero_team div[girl_n=1]").attr(girlDataName));
        playerOmega = JSON.parse($("div.hero_team div[girl_n=2]").attr(girlDataName));
        playerExcitement = Math.round((playerAlpha.caracs.carac1 + playerAlpha.caracs.carac2 + playerAlpha.caracs.carac3) * 28);
        for (index=0;index<3;index++)
        {
            var opponentName = $("div.season_arena_opponent_container .hero_details div.hero_name")[index].innerText

            var opponentEgo = Number(document.getElementsByClassName("season_arena_opponent_container")[index].getElementsByClassName("hero_stats")[0].children[2].innerText.replace(/[^0-9]/gi, ''));
            var opponentDef = Number(document.getElementsByClassName("season_arena_opponent_container")[index].getElementsByClassName("hero_stats")[0].children[1].innerText.split('-')[0].replace(/[^0-9]/gi, ''));
            var opponentAtk = Number(document.getElementsByClassName("season_arena_opponent_container")[index].getElementsByClassName("hero_stats")[0].children[0].innerText.split('-')[0].replace(/[^0-9]/gi, ''));

            var opponentClass = $($("div.season_arena_opponent_container .hero_details div[hh_class_tooltip]")[index]).attr('carac');
            var opponentAlpha = JSON.parse($($("div.season_arena_opponent_container .hero_team div[rel='g1']")[index]).attr(girlDataName));
            var opponentBeta = JSON.parse($($("div.season_arena_opponent_container .hero_team div[rel='g2']")[index]).attr(girlDataName));
            var opponentOmega = JSON.parse($($("div.season_arena_opponent_container .hero_team div[rel='g3']")[index]).attr(girlDataName));

            var playerDef;
            if (opponentClass == 'class1') {
                playerDef = playerDefHC;
            }
            if (opponentClass == 'class2') {
                playerDef = playerDefCH;
            }
            if (opponentClass == 'class3') {
                playerDef = playerDefKH;
            }
            var opponentExcitement = Math.round((opponentAlpha.caracs.carac1 + opponentAlpha.caracs.carac2 + opponentAlpha.caracs.carac3) * 28);
            let playerAlphaAdd;
            let playerBetaAdd;
            let playerOmegaAdd;
            let opponentAlphaAdd;
            let opponentBetaAdd;
            let opponentOmegaAdd;
            if (playerClass == ('class' + HC)) {
                playerAlphaAdd = playerAlpha.caracs.carac1;
                playerBetaAdd = playerBeta.caracs.carac1;
                playerOmegaAdd = playerOmega.caracs.carac1;
            }
            if (playerClass == ('class' + CH)) {
                playerAlphaAdd = playerAlpha.caracs.carac2;
                playerBetaAdd = playerBeta.caracs.carac2;
                playerOmegaAdd = playerOmega.caracs.carac2;
            }
            if (playerClass == ('class' + KH)) {
                playerAlphaAdd = playerAlpha.caracs.carac3;
                playerBetaAdd = playerBeta.caracs.carac3;
                playerOmegaAdd = playerOmega.caracs.carac3;
            }

            if (opponentClass == ('class' + HC)) {
                playerDef = playerDefHC;
                opponentAlphaAdd = opponentAlpha.caracs.carac1;
                opponentBetaAdd = opponentBeta.caracs.carac1;
                opponentOmegaAdd = opponentOmega.caracs.carac1;
            }
            if (opponentClass == ('class' + CH)) {
                playerDef = playerDefCH;
                opponentAlphaAdd = opponentAlpha.caracs.carac2;
                opponentBetaAdd = opponentBeta.caracs.carac2;
                opponentOmegaAdd = opponentOmega.caracs.carac2;
            }
            if (opponentClass == ('class' + KH)) {
                playerDef = playerDefKH;
                opponentAlphaAdd = opponentAlpha.caracs.carac3;
                opponentBetaAdd = opponentBeta.caracs.carac3;
                opponentOmegaAdd = opponentOmega.caracs.carac3;
            }

            let playerTeam = [0, playerAlphaAdd, playerBetaAdd, playerOmegaAdd];
            let opponentTeam = [0, opponentAlphaAdd, opponentBetaAdd, opponentOmegaAdd];

            let player = {
                ego: playerEgo,
                originEgo: playerEgo,
                atk: playerAtk,
                def: playerDef,

                alpha: playerAlpha,
                beta: playerBeta,
                omega: playerOmega,
                team: playerTeam,

                orgasm: 0,
                orgasmCount: 0,
                excitement: playerExcitement,

                text: 'Player',
            };

            let opponent = {
                ego: opponentEgo,
                originEgo: opponentEgo,
                atk: opponentAtk,
                def: opponentDef,

                alpha: opponentAlpha,
                beta: opponentBeta,
                omega: opponentOmega,
                team: opponentTeam,

                orgasm: 0,
                orgasmCount: 0,
                excitement: opponentExcitement,

                text: 'Opponent',
                name: opponentName,
            };

            //console.log(opponent);
            let simu = simuFight(player, opponent);
            //console.log(opponent);
            //console.log(simu);
            matchRating=customMatchRating(simu);
            //matchRating = calculatePower(playerEgo,playerDef,playerAtk,playerClass,playerAlpha,playerBeta,playerOmega,playerExcitement,opponentName,opponentEgo,opponentDef,opponentAtk,opponentClass,opponentAlpha,opponentBeta,opponentOmega,opponentExcitement);
            scoreOppo[index]=matchRating;
            mojoOppo[index]=Number($("div.season_arena_opponent_container .slot_victory_points p")[index].innerText);
            //logHHAuto(Number($("div.season_arena_opponent_container .slot_victory_points p")[index].innerText));
            nameOppo[index]=opponentName;
            //Publish the ego difference as a match rating
            matchRatingFlag = matchRating.substring(0,1);
            matchRating = matchRating.substring(1);

            if (doDisplay)
            {

                switch (matchRatingFlag)
                {
                    case 'g':
                        $($('div.season_arena_opponent_container')[index]).append('<div class="matchRatingNew plus"><img id="powerLevelScouter" src="https://i.postimg.cc/qgkpN0sZ/Opponent-green.png">' + matchRating + '</div>');
                        break;
                    case 'y':
                        $($('div.season_arena_opponent_container')[index]).append('<div class="matchRatingNew close"><img id="powerLevelScouter" src="https://i.postimg.cc/3JCgVBdK/Opponent-orange.png">' + matchRating + '</div>');
                        break;
                    case 'r':
                        $($('div.season_arena_opponent_container')[index]).append('<div class="matchRatingNew minus"><img id="powerLevelScouter" src="https://i.postimg.cc/PxgxrBVB/Opponent-red.png">' + matchRating + '</div>');
                        break;
                }
            }
        }

        var chosenID = -1;
        var chosenRating = -1;
        var chosenFlag = -1;
        var chosenMojo = -1;
        var currentFlag;
        var currentScore;
        var currentMojo;
        var numberOfReds=0;

        for (index=0;index<3;index++)
        {
            currentScore = Number(scoreOppo[index].substring(1));
            currentFlag = scoreOppo[index].substring(0,1);
            currentMojo = Number(mojoOppo[index]);
            switch (currentFlag)
            {
                case 'g':
                    currentFlag = 1;
                    break;
                case 'y':
                    currentFlag = 0;
                    break;
                case 'r':
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
            //same green flag same mojo but better score
            else if (chosenFlag == currentFlag && currentFlag == 1 && chosenMojo == currentMojo && chosenRating < currentScore)
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
        if (numberOfReds === 3 && Storage().HHAuto_Setting_autoSeasonPassReds === "true" && getSetHeroInfos('hard_currency')>=price+Number(Storage().HHAuto_Setting_kobanBank))
        {
            chosenID = -2;
        }

        //logHHAuto("Best opportunity opponent : "+oppoName+'('+chosenRating+')');
        if (doDisplay)
        {

            //$('div.season_arena_opponent_container div.matchRatingNew')[chosenID].innerHTML=$('div.season_arena_opponent_container div.matchRatingNew')[chosenID].innerHTML+marker;
            $($('div.season_arena_opponent_container div.matchRatingNew')[chosenID]).append('<img id="powerLevelScouterChosen" src="https://i.postimg.cc/MfKwNbZ8/Opponent-go.png">');


            var sheet = (function() {
                var style = document.createElement('style');
                document.head.appendChild(style);
                return style.sheet;
            })();

            //CSS

            GM_addStyle('.matchRatingNew {'
                        + 'text-align: center; '
                        + 'margin-top: -14px; '
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
        return -1;
    }
}
function CheckSpentPoints()
{
    let oldValues=sessionStorage.HHAuto_Temp_CheckSpentPoints?JSON.parse(sessionStorage.HHAuto_Temp_CheckSpentPoints):-1;
    let newValues={};
    newValues['fight']=Number(getSetHeroInfos('fight.amount'));
    newValues['kiss']=Number(getSetHeroInfos('kiss.amount'));
    newValues['quest']=Number(getSetHeroInfos('quest.amount'));
    newValues['challenge']=Number(getSetHeroInfos('challenge.amount'));

    if ( oldValues !== -1)
    {
        let spent= {};
        let hasSpend = false;
        let checks=['fight','kiss','quest','challenge'];

        for (let i of checks)
        {
            if (oldValues[i]-newValues[i] >0)
            {
                spent[i]=oldValues[i]-newValues[i];
                updatedParanoiaSpendings(i, spent[i]);
            }
        }
        sessionStorage.HHAuto_Temp_CheckSpentPoints=JSON.stringify(newValues);
    }
    else
    {
        sessionStorage.HHAuto_Temp_CheckSpentPoints=JSON.stringify(newValues);
    }
}


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



    var busy = false;
    var page = window.location.href;
    var currentPower = getSetHeroInfos('fight.amount');

    var burst=getBurst();

    if (burst /*|| checkTimer('nextMissionTime')*/)
    {

        if (!checkTimer("paranoiaSwitch") )
        {
            clearParanoiaSpendings();
        }
        CheckSpentPoints();

        if(Storage().HHAuto_Setting_autoFreePachinko === "true" && busy === false){
            // Navigate to pachinko

            if (checkTimer("nextPachinkoTime")) {
                logHHAuto("Time to fetch Great Pachinko.");
                getPachinko();
                busy = true;
            }
            if (checkTimer("nextPachinko2Time")) {
                logHHAuto("Time to fetch Mythic Pachinko.");
                getPachinko2();
                busy = true;
            }
        }

        if(Storage().HHAuto_Setting_autoContest === "true" && busy === false){
            if (checkTimer('nextContestTime') || unsafeWindow.has_contests_datas ||$(".contest .ended button[rel='claim']").size()>0){
                logHHAuto("Time to get contest rewards.");
                busy = doContestStuff();
            }
        }
        if(Storage().HHAuto_Setting_autoPowerPlaces === "true" && busy === false){

            var popToStart = Storage().HHAuto_Temp_PopToStart?JSON.parse(Storage().HHAuto_Temp_PopToStart):[];
            if (popToStart.length != 0 || checkTimer('minPowerPlacesTime'))
            {
                //if PopToStart exist bypass function
                var popToStartExist = Storage().HHAuto_Temp_PopToStart?false:true;
                //logHHAuto("startcollect : "+popToStartExist);
                if (popToStartExist)
                {
                    //logHHAuto("pop1:"+popToStart);
                    logHHAuto("Go and collect");
                    busy = true;
                    busy = collectAndUpdatePowerPlaces();
                }
                var indexes=(Storage().HHAuto_Setting_autoPowerPlacesIndexFilter?Storage().HHAuto_Setting_autoPowerPlacesIndexFilter:"").split(";");

                popToStart = Storage().HHAuto_Temp_PopToStart?JSON.parse(Storage().HHAuto_Temp_PopToStart):[];
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
                //logHHAuto("pop3:"+Storage().HHAuto_Temp_PopToStart);
                popToStart = Storage().HHAuto_Temp_PopToStart?JSON.parse(Storage().HHAuto_Temp_PopToStart):[];
                //logHHAuto("pop3:"+popToStart);
                if (popToStart.length === 0)
                {
                    //logHHAuto("removing popToStart");
                    Storage().removeItem('HHAuto_Temp_PopToStart');
                    gotoPage("home");
                }
            }
        }
        if(Storage().HHAuto_Setting_autoMission === "true" && busy === false){
            if (checkTimer('nextMissionTime')){
                logHHAuto("Time to do missions.");
                busy = doMissionStuff();
            }
        }

        if (Storage().HHAuto_Setting_autoQuest === "true" && busy === false )
        {
            Storage().HHAuto_Temp_autoTrollBattleSaveQuest = (Storage().HHAuto_Temp_autoTrollBattleSaveQuest ? Storage().HHAuto_Temp_autoTrollBattleSaveQuest : "false") ;
            if (sessionStorage.HHAuto_Temp_questRequirement === "battle")
            {
                if (Storage().HHAuto_Temp_autoTrollBattleSaveQuest === "false")
                {
                    logHHAuto("Quest requires battle.");
                    logHHAuto("prepare to save one battle for quest");
                    Storage().HHAuto_Temp_autoTrollBattleSaveQuest = "true";
                    doBossBattle();
                }
                busy = false;
            }
            else if (sessionStorage.HHAuto_Temp_questRequirement[0] === '$')
            {
                if (Number(sessionStorage.HHAuto_Temp_questRequirement.substr(1)) < getSetHeroInfos('soft_currency')) {
                    // We have enough money... requirement fulfilled.
                    logHHAuto("Continuing quest, required money obtained.");
                    sessionStorage.HHAuto_Temp_questRequirement = "none";
                    proceedQuest();
                    busy = false;
                }
                else
                {
                    //prevent paranoia to wait for quest
                    Storage().HHAuto_Temp_paranoiaQuestBlocked="true";
                    if(isNaN(sessionStorage.HHAuto_Temp_questRequirement.substr(1)))
                    {
                        logHHAuto(sessionStorage.HHAuto_Temp_questRequirement);
                        sessionStorage.HHAuto_Temp_questRequirement = "none";
                        logHHAuto("Invalid money in session storage quest requirement !");
                    }
                    else
                    {
                        // Else we need more money.
                        //logHHAuto("Need money for quest, cannot continue. Turning ON AutoSalary.");
                        Storage().HHAuto_Setting_autoQuest = "true";
                    }
                    busy = false;
                }
            }
            else if (sessionStorage.HHAuto_Temp_questRequirement[0] === '*')
            {
                var energyNeeded = Number(sessionStorage.HHAuto_Temp_questRequirement.substr(1));
                var energyCurrent = getSetHeroInfos('quest.amount');
                if (energyNeeded <= energyCurrent)
                {
                    if (Number(getSetHeroInfos('quest.amount')) > Number(Storage().HHAuto_Setting_autoQuestThreshold) || Number(checkParanoiaSpendings('quest')) > 0 )
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
                    Storage().HHAuto_Temp_paranoiaQuestBlocked="true";
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
                    Storage().HHAuto_Temp_paranoiaQuestBlocked="true";
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
                Storage().HHAuto_Temp_paranoiaQuestBlocked="true";
                logHHAuto("AutoQuest disabled.HHAuto_Setting_AutoQuest cannot be performed due to unknown quest button. Please manually proceed the current quest screen.");
                document.getElementById("autoQuestCheckbox").checked = false;
                Storage().HHAuto_Setting_autoQuest = "false";
                sessionStorage.HHAuto_Temp_questRequirement = "none";
                busy = false;
            }
            else if (sessionStorage.HHAuto_Temp_questRequirement === "errorInAutoBattle")
            {
                //prevent paranoia to wait for quest
                Storage().HHAuto_Temp_paranoiaQuestBlocked="true";
                logHHAuto("AutoQuest disabled.HHAuto_Setting_AutoQuest cannot be performed due errors in AutoBattle. Please manually proceed the current quest screen.");
                document.getElementById("autoQuestCheckbox").checked = false;
                Storage().HHAuto_Setting_autoQuest = "false";
                sessionStorage.HHAuto_Temp_questRequirement = "none";
                busy = false;
            }
            else if(sessionStorage.HHAuto_Temp_questRequirement === "none")
            {
                if (Number(getSetHeroInfos('quest.amount')) > Number(Storage().HHAuto_Setting_autoQuestThreshold) || Number(checkParanoiaSpendings('quest')) > 0 )
                {
                    //logHHAuto("NONE req.");
                    busy = true;
                    proceedQuest();
                }
            }
            else
            {
                //prevent paranoia to wait for quest
                Storage().HHAuto_Temp_paranoiaQuestBlocked="true";
                logHHAuto("Invalid quest requirement : "+sessionStorage.HHAuto_Temp_questRequirement);
                busy=false;
            }
        }
        else if(Storage().HHAuto_Setting_autoQuest === "false")
        {
            sessionStorage.HHAuto_Temp_questRequirement = "none";
        }
        /*
        if(Storage().HHAuto_Setting_autoArenaBattle === "true" && busy === false)
        {
            if ($('a[rel=arena] span.button-notification-icon').size()>0)
            {
               logHHAuto('Missed one in arena!');
                setTimer('nextArenaTime',0);
            }
            if(checkTimer("nextArenaTime"))
            {
               logHHAuto("Time to fight in arena.");
                doBattle();
                busy = true;
            }
        }
        */
        if(Storage().HHAuto_Setting_autoSeason === "true" && busy === false )
        {
            if (Number(getSetHeroInfos('kiss.amount')) > 0 && ( (Number(getSetHeroInfos('kiss.amount')) > Number(Storage().HHAuto_Setting_autoSeasonThreshold) && checkTimer('nextSeasonTime')) || Number(checkParanoiaSpendings('kiss')) > 0 ) )
            {
                logHHAuto("Time to fight in Season.");
                doSeason();
                busy = true;
            }
            else
            {
                if (checkTimer('nextSeasonTime'))
                {
                    setTimer('nextSeasonTime',getSetHeroInfos('kiss.next_refresh_ts'));
                }
            }

        }



        if(Storage().HHAuto_Setting_autoTrollBattle === "true" && getSetHeroInfos('questing.id_world')>0)
        {
            if(busy === false && currentPower >= Number(sessionStorage.HHAuto_Temp_battlePowerRequired) && currentPower > 0)
            {
                //logHHAuto("fight amount: "+getSetHeroInfos('fight.amount')+" troll threshold: "+Number(Storage().HHAuto_Setting_autoTrollThreshold)+" paranoia fight: "+Number(checkParanoiaSpendings('fight')));
                if (Number(getSetHeroInfos('fight.amount')) > Number(Storage().HHAuto_Setting_autoTrollThreshold) || Number(checkParanoiaSpendings('fight')) > 0 || (sessionStorage.HHAuto_Temp_eventTrollIsMythic === "true" && Storage().HHAuto_Setting_autoTrollMythicByPassThreshold === "true" ))
                {
                    sessionStorage.HHAuto_Temp_battlePowerRequired = "0";
                    busy = true;
                    if(Storage().HHAuto_Setting_autoQuest === "true")
                    {
                        if(sessionStorage.HHAuto_Temp_questRequirement[0] === 'P')
                        {
                            logHHAuto("AutoBattle disabled for power collection for AutoQuest.");
                            document.getElementById("autoTrollCheckbox").checked = false;
                            Storage().HHAuto_Setting_autoTrollBattle = "false";
                            busy = false;
                        }
                        else
                        {
                            doBossBattle();
                        }
                    }
                    else
                    {
                        doBossBattle();
                    }
                }
            }
        }
        else
        {
            sessionStorage.HHAuto_Temp_battlePowerRequired = "0";
        }

        var ECt= getSetHeroInfos('quest.amount');
        if (ECt>=60 && (Storage().HHAuto_Setting_autoChampsUseEne==="true"))
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

        if (busy==false && Storage().HHAuto_Setting_autoChamps==="true" && checkTimer('nextChampionTime'))
        {
            logHHAuto("Time to check on champions!");
            busy=true;
            busy=doChampionStuff();
        }

        if (busy==false && Storage().HHAuto_Setting_autoClubChamp==="true" && checkTimer('nextClubChampionTime'))
        {
            logHHAuto("Time to check on club champion!");
            busy=true;
            busy=doClubChampionStuff();
        }
        if(Storage().HHAuto_Setting_autoLeagues === "true" && getSetHeroInfos('level')>=20 && busy === false ){
            // Navigate to leagues
            if ((checkTimer('nextLeaguesTime') && Number(getSetHeroInfos('challenge.amount')) > Number(Storage().HHAuto_Setting_autoLeaguesThreshold) ) || Number(checkParanoiaSpendings('challenge')) > 0)
            {
                logHHAuto("Time to fight in Leagues.");
                doLeagueBattle();
                busy = true;
            }
            else
            {
                if (checkTimer('nextLeaguesTime'))
                {
                    setTimer('nextLeaguesTime',getSetHeroInfos('challenge.next_refresh_ts'));
                }
            }
        }

        if (/*autoBuy() &&*/ busy===false && ( Storage().HHAuto_Setting_paranoia !== "true" || !checkTimer("paranoiaSwitch") ) )
        {
            if (sessionStorage.HHAuto_Temp_charLevel===undefined)
            {
                sessionStorage.HHAuto_Temp_charLevel=0;
            }
            if (checkTimer('nextShopTime') || sessionStorage.HHAuto_Temp_charLevel<getSetHeroInfos('level')) {
                logHHAuto("Time to check shop.");
                busy = updateShop();
            }
        }

        if (Storage().HHAuto_Setting_autoSalary === "true" && busy === false && ( Storage().HHAuto_Setting_paranoia !== "true" || !checkTimer("paranoiaSwitch") )) {
            if (checkTimer("nextSalaryTime")) {
                logHHAuto("Time to fetch salary.");
                busy = true;
                busy = getSalary();
            }
        }

        if(busy === true && sessionStorage.HHAuto_Temp_userLink==="none" && !window.location.pathname.startsWith("/quest"))
        {
            sessionStorage.HHAuto_Temp_userLink = page;
        }
        else if(sessionStorage.HHAuto_Temp_userLink !=="none" && busy === false)
        {
            //logHHAuto("Restoring page "+sessionStorage.HHAuto_Temp_userLink);
            //window.location = sessionStorage.HHAuto_Temp_userLink;
            gotoPage('home');
            sessionStorage.HHAuto_Temp_userLink = "none";
        }
    }

    if(Storage().HHAuto_Setting_paranoia === "true" && Storage().HHAuto_Setting_master==="true" && busy === false){
        if (checkTimer("paranoiaSwitch")) {
            flipParanoia();
        }
    }

    if(isNaN(Storage().HHAuto_Temp_autoLoopTimeMili)){
        logHHAuto("AutoLoopTimeMili is not a number.");
        setDefaults();
    }
    else{
        if (sessionStorage.HHAuto_Temp_autoLoop === "true") setTimeout(autoLoop, Number(Storage().HHAuto_Temp_autoLoopTimeMili));
        else
        {
            logHHAuto("autoLoop Disabled");
        }
    }

    var currentPage = window.location.pathname;

    if (getPage() === "leaderboard" && Storage().HHAuto_Setting_showCalculatePower === "true")
    {
        moduleSimLeague();
    }
    if (getPage() === "battle" && Storage().HHAuto_Setting_showCalculatePower === "true" && $(".preBattleAnim").length == 0)
    {
        moduleSimBattle();
    }
    if (getPage() === "season_arena" && Storage().HHAuto_Setting_showCalculatePower === "true")
    {
        moduleSimSeasonBattle();
    }
    if (getPage() === "season" && Storage().HHAuto_Setting_SeasonMaskRewards === "true")
    {
        moduleSimSeasonReward();
    }
    if (getPage() === "home" && $("div.event-widget div.widget[style='display: block;']").length !== 0)
    {
        moduleDisplayEventPriority();
    }
    if (getPage() === "powerplacemain" )
    {
        moduleDisplayPopID();
    }
    if (getPage() === "shop" )
    {
        moduleShopActions();
    }
    if (getPage() == "path_of_attraction" && Storage().HHAuto_Setting_PoAMaskRewards === "true") {
        modulePathOfAttractionHide();
    }

};

function getLevelXp(inRarity, inLevel)
{
    let GIRLS_EXP_LEVELS = [];

    GIRLS_EXP_LEVELS.starting = [0, 10, 21, 32, 43, 54, 65, 76, 87, 98, 109, 120, 131, 142, 154, 166, 178, 190, 202, 214, 226, 238, 250, 262, 274, 286, 299, 312, 325, 338, 351, 364, 377, 390, 403, 416, 429, 443, 457, 471, 485, 499, 513, 527, 541, 555, 569, 584, 599, 614, 629, 644, 659, 674, 689, 704, 720, 736, 752, 768, 784, 800, 816, 832, 849, 866, 883, 900, 917, 934, 951, 968, 985, 1003, 1021, 1039, 1057, 1075, 1093, 1111, 1130, 1149, 1168, 1187, 1206, 1225, 1244, 1264, 1284, 1304, 1324, 1344, 1364, 1384, 1405, 1426, 1447, 1468, 1489, 1510, 1531, 1553, 1575, 1597, 1619, 1641, 1663, 1686, 1709, 1732, 1755, 1778, 1801, 1825, 1849, 1873, 1897, 1921, 1945, 1970, 1995, 2020, 2045, 2070, 2096, 2122, 2148, 2174, 2200, 2227, 2254, 2281, 2308, 2335, 2363, 2391, 2419, 2447, 2475, 2504, 2533, 2562, 2591, 2620, 2650, 2680, 2710, 2740, 2770, 2801, 2832, 2863, 2894, 2926, 2958, 2990, 3022, 3055, 3088, 3121, 3154, 3188, 3222, 3256, 3290, 3325, 3360, 3395, 3430, 3466, 3502, 3538, 3574, 3611, 3648, 3685, 3722, 3760, 3798, 3836, 3875, 3914, 3953, 3992, 4032, 4072, 4112, 4153, 4194, 4235, 4277, 4319, 4361, 4403, 4446, 4489, 4532, 4576, 4620, 4664, 4709, 4754, 4799, 4845, 4891, 4937, 4984, 5031, 5078, 5126, 5174, 5223, 5272, 5321, 5371, 5421, 5471, 5522, 5573, 5624, 5676, 5728, 5781, 5834, 5887, 5941, 5995, 6050, 6105, 6160, 6216, 6272, 6329, 6386, 6444, 6502, 6560, 6619, 6678, 6738, 6798, 6859, 6920, 6981, 7043, 7105, 7168, 7231, 7295, 7359, 7424, 7489, 7555, 7621, 7688, 7755, 7823, 7891, 7960, 8029, 8099, 8169, 8240, 8311, 8383, 8455, 8528, 8601, 8675, 8750, 8825, 8901, 8977, 9054, 9131, 9209, 9288, 9367, 9447, 9527, 9608, 9690, 9772, 9855, 9938, 10022, 10107, 10192, 10278, 10365, 10452, 10540, 10628, 10717, 10807, 10897, 10988, 11080, 11172, 11265, 11359, 11454, 11549, 11645, 11742, 11839, 11937, 12036, 12136, 12236, 12337, 12439, 12542, 12645, 12749, 12854, 12960, 13067, 13174, 13282, 13391, 13501, 13612, 13723, 13835, 13948, 14062, 14177, 14293, 14409, 14526, 14644, 14763, 14883, 15004, 15126, 15249, 15373, 15498, 15623, 15749, 15876, 16004, 16133, 16263, 16394, 16526, 16659, 16793, 16928, 17064, 17201, 17339, 17478, 17618, 17759, 17901, 18044, 18189, 18335, 18482, 18630, 18779, 18929, 19080, 19232, 19385, 19540, 19696, 19853, 20011, 20170, 20330, 20492, 20655, 20819, 20984, 21151, 21319, 21488, 21658, 21830, 22003, 22177, 22352, 22529, 22707, 22886, 23067, 23249, 23432, 23617, 23803, 23991, 24180, 24370, 24562, 24755, 24950, 25146, 25344, 25543, 25744, 25946, 26150, 26355, 26562, 26770, 26980, 27191, 27404, 27619, 27835, 28053, 28272, 28493, 28716, 28940, 29166, 29394, 29623, 29854, 30087, 30322, 30558, 30796, 31036, 31278, 31522, 31767, 32014, 32263, 32514, 32767, 33022, 33279, 33537, 33797, 34059, 34323, 34589, 34857, 35127, 35399, 35673, 35949, 36228, 36509, 36792, 37077, 37364, 37653, 37944, 38237, 38533, 38831, 39131, 39433, 39738, 40045, 40354, 40665, 40979, 41295, 41614, 41935, 42258, 42584, 42912, 43243, 43576, 43912, 44250, 44591, 44934, 45280, 45628, 45979, 46333, 46689, 47048, 47410, 47774, 48141, 48511, 48884, 49259, 49637, 50018, 50402, 50789, 51179, 51572, 51967, 52365, 52766, 53170, 53577, 53988, 54402, 54819];
    GIRLS_EXP_LEVELS.common = [0, 10, 21, 32, 43, 54, 65, 76, 87, 98, 109, 120, 131, 142, 154, 166, 178, 190, 202, 214, 226, 238, 250, 262, 274, 286, 299, 312, 325, 338, 351, 364, 377, 390, 403, 416, 429, 443, 457, 471, 485, 499, 513, 527, 541, 555, 569, 584, 599, 614, 629, 644, 659, 674, 689, 704, 720, 736, 752, 768, 784, 800, 816, 832, 849, 866, 883, 900, 917, 934, 951, 968, 985, 1003, 1021, 1039, 1057, 1075, 1093, 1111, 1130, 1149, 1168, 1187, 1206, 1225, 1244, 1264, 1284, 1304, 1324, 1344, 1364, 1384, 1405, 1426, 1447, 1468, 1489, 1510, 1531, 1553, 1575, 1597, 1619, 1641, 1663, 1686, 1709, 1732, 1755, 1778, 1801, 1825, 1849, 1873, 1897, 1921, 1945, 1970, 1995, 2020, 2045, 2070, 2096, 2122, 2148, 2174, 2200, 2227, 2254, 2281, 2308, 2335, 2363, 2391, 2419, 2447, 2475, 2504, 2533, 2562, 2591, 2620, 2650, 2680, 2710, 2740, 2770, 2801, 2832, 2863, 2894, 2926, 2958, 2990, 3022, 3055, 3088, 3121, 3154, 3188, 3222, 3256, 3290, 3325, 3360, 3395, 3430, 3466, 3502, 3538, 3574, 3611, 3648, 3685, 3722, 3760, 3798, 3836, 3875, 3914, 3953, 3992, 4032, 4072, 4112, 4153, 4194, 4235, 4277, 4319, 4361, 4403, 4446, 4489, 4532, 4576, 4620, 4664, 4709, 4754, 4799, 4845, 4891, 4937, 4984, 5031, 5078, 5126, 5174, 5223, 5272, 5321, 5371, 5421, 5471, 5522, 5573, 5624, 5676, 5728, 5781, 5834, 5887, 5941, 5995, 6050, 6105, 6160, 6216, 6272, 6329, 6386, 6444, 6502, 6560, 6619, 6678, 6738, 6798, 6859, 6920, 6981, 7043, 7105, 7168, 7231, 7295, 7359, 7424, 7489, 7555, 7621, 7688, 7755, 7823, 7891, 7960, 8029, 8099, 8169, 8240, 8311, 8383, 8455, 8528, 8601, 8675, 8750, 8825, 8901, 8977, 9054, 9131, 9209, 9288, 9367, 9447, 9527, 9608, 9690, 9772, 9855, 9938, 10022, 10107, 10192, 10278, 10365, 10452, 10540, 10628, 10717, 10807, 10897, 10988, 11080, 11172, 11265, 11359, 11454, 11549, 11645, 11742, 11839, 11937, 12036, 12136, 12236, 12337, 12439, 12542, 12645, 12749, 12854, 12960, 13067, 13174, 13282, 13391, 13501, 13612, 13723, 13835, 13948, 14062, 14177, 14293, 14409, 14526, 14644, 14763, 14883, 15004, 15126, 15249, 15373, 15498, 15623, 15749, 15876, 16004, 16133, 16263, 16394, 16526, 16659, 16793, 16928, 17064, 17201, 17339, 17478, 17618, 17759, 17901, 18044, 18189, 18335, 18482, 18630, 18779, 18929, 19080, 19232, 19385, 19540, 19696, 19853, 20011, 20170, 20330, 20492, 20655, 20819, 20984, 21151, 21319, 21488, 21658, 21830, 22003, 22177, 22352, 22529, 22707, 22886, 23067, 23249, 23432, 23617, 23803, 23991, 24180, 24370, 24562, 24755, 24950, 25146, 25344, 25543, 25744, 25946, 26150, 26355, 26562, 26770, 26980, 27191, 27404, 27619, 27835, 28053, 28272, 28493, 28716, 28940, 29166, 29394, 29623, 29854, 30087, 30322, 30558, 30796, 31036, 31278, 31522, 31767, 32014, 32263, 32514, 32767, 33022, 33279, 33537, 33797, 34059, 34323, 34589, 34857, 35127, 35399, 35673, 35949, 36228, 36509, 36792, 37077, 37364, 37653, 37944, 38237, 38533, 38831, 39131, 39433, 39738, 40045, 40354, 40665, 40979, 41295, 41614, 41935, 42258, 42584, 42912, 43243, 43576, 43912, 44250, 44591, 44934, 45280, 45628, 45979, 46333, 46689, 47048, 47410, 47774, 48141, 48511, 48884, 49259, 49637, 50018, 50402, 50789, 51179, 51572, 51967, 52365, 52766, 53170, 53577, 53988, 54402, 54819];
    GIRLS_EXP_LEVELS.rare = [0, 12, 25, 38, 51, 64, 77, 90, 103, 116, 129, 142, 156, 170, 184, 198, 212, 226, 240, 254, 268, 282, 297, 312, 327, 342, 357, 372, 387, 402, 417, 433, 449, 465, 481, 497, 513, 529, 545, 561, 578, 595, 612, 629, 646, 663, 680, 697, 715, 733, 751, 769, 787, 805, 823, 841, 860, 879, 898, 917, 936, 955, 974, 994, 1014, 1034, 1054, 1074, 1094, 1114, 1135, 1156, 1177, 1198, 1219, 1240, 1262, 1284, 1306, 1328, 1350, 1372, 1394, 1417, 1440, 1463, 1486, 1509, 1532, 1556, 1580, 1604, 1628, 1652, 1677, 1702, 1727, 1752, 1777, 1802, 1828, 1854, 1880, 1906, 1932, 1959, 1986, 2013, 2040, 2067, 2095, 2123, 2151, 2179, 2207, 2236, 2265, 2294, 2323, 2352, 2382, 2412, 2442, 2472, 2503, 2534, 2565, 2596, 2627, 2659, 2691, 2723, 2755, 2788, 2821, 2854, 2887, 2921, 2955, 2989, 3023, 3058, 3093, 3128, 3163, 3199, 3235, 3271, 3307, 3344, 3381, 3418, 3456, 3494, 3532, 3570, 3609, 3648, 3687, 3727, 3767, 3807, 3847, 3888, 3929, 3970, 4012, 4054, 4096, 4139, 4182, 4225, 4269, 4313, 4357, 4402, 4447, 4492, 4538, 4584, 4630, 4677, 4724, 4771, 4819, 4867, 4915, 4964, 5013, 5062, 5112, 5162, 5213, 5264, 5315, 5367, 5419, 5471, 5524, 5577, 5631, 5685, 5739, 5794, 5849, 5905, 5961, 6017, 6074, 6131, 6189, 6247, 6306, 6365, 6424, 6484, 6544, 6605, 6666, 6728, 6790, 6853, 6916, 6980, 7044, 7108, 7173, 7238, 7304, 7370, 7437, 7504, 7572, 7640, 7709, 7778, 7848, 7918, 7989, 8061, 8133, 8206, 8279, 8353, 8427, 8502, 8577, 8653, 8729, 8806, 8884, 8962, 9041, 9120, 9200, 9281, 9362, 9444, 9526, 9609, 9693, 9777, 9862, 9947, 10033, 10120, 10207, 10295, 10384, 10473, 10563, 10654, 10745, 10837, 10930, 11023, 11117, 11212, 11308, 11404, 11501, 11599, 11697, 11796, 11896, 11997, 12098, 12200, 12303, 12407, 12511, 12616, 12722, 12829, 12937, 13045, 13154, 13264, 13375, 13487, 13600, 13713, 13827, 13942, 14058, 14175, 14293, 14412, 14531, 14651, 14772, 14894, 15017, 15141, 15266, 15392, 15519, 15647, 15776, 15906, 16037, 16169, 16302, 16436, 16571, 16707, 16844, 16982, 17121, 17261, 17402, 17544, 17687, 17831, 17976, 18122, 18269, 18417, 18566, 18716, 18868, 19021, 19175, 19330, 19486, 19643, 19802, 19962, 20123, 20285, 20448, 20613, 20779, 20946, 21114, 21284, 21455, 21627, 21800, 21975, 22151, 22328, 22507, 22687, 22868, 23051, 23235, 23420, 23607, 23795, 23985, 24176, 24368, 24562, 24757, 24954, 25152, 25352, 25553, 25756, 25960, 26166, 26373, 26582, 26792, 27004, 27218, 27433, 27650, 27868, 28088, 28310, 28533, 28758, 28985, 29213, 29443, 29675, 29909, 30144, 30381, 30620, 30861, 31103, 31347, 31593, 31841, 32091, 32343, 32597, 32852, 33109, 33368, 33629, 33892, 34157, 34424, 34693, 34964, 35237, 35512, 35789, 36068, 36349, 36633, 36919, 37207, 37497, 37789, 38083, 38380, 38679, 38980, 39283, 39588, 39896, 40206, 40518, 40833, 41150, 41469, 41791, 42115, 42442, 42771, 43103, 43437, 43774, 44113, 44455, 44799, 45146, 45495, 45847, 46202, 46559, 46919, 47282, 47647, 48015, 48386, 48760, 49136, 49515, 49897, 50282, 50670, 51061, 51455, 51852, 52252, 52655, 53061, 53470, 53882, 54297, 54715, 55136, 55560, 55987, 56418, 56852, 57289, 57729, 58173, 58620, 59070, 59524, 59981, 60442, 60906, 61373, 61844, 62318, 62796, 63278, 63763, 64252, 64745, 65241, 65741];
    GIRLS_EXP_LEVELS.epic = [0, 14, 29, 44, 59, 74, 89, 104, 119, 134, 149, 165, 181, 197, 213, 229, 245, 261, 277, 294, 311, 328, 345, 362, 379, 396, 413, 431, 449, 467, 485, 503, 521, 539, 557, 576, 595, 614, 633, 652, 671, 690, 710, 730, 750, 770, 790, 810, 830, 851, 872, 893, 914, 935, 956, 977, 999, 1021, 1043, 1065, 1087, 1109, 1132, 1155, 1178, 1201, 1224, 1247, 1271, 1295, 1319, 1343, 1367, 1391, 1416, 1441, 1466, 1491, 1516, 1542, 1568, 1594, 1620, 1646, 1673, 1700, 1727, 1754, 1781, 1809, 1837, 1865, 1893, 1921, 1950, 1979, 2008, 2037, 2066, 2096, 2126, 2156, 2186, 2217, 2248, 2279, 2310, 2341, 2373, 2405, 2437, 2469, 2502, 2535, 2568, 2601, 2635, 2669, 2703, 2737, 2772, 2807, 2842, 2877, 2913, 2949, 2985, 3021, 3058, 3095, 3132, 3169, 3207, 3245, 3283, 3322, 3361, 3400, 3439, 3479, 3519, 3559, 3600, 3641, 3682, 3724, 3766, 3808, 3850, 3893, 3936, 3979, 4023, 4067, 4111, 4156, 4201, 4246, 4292, 4338, 4384, 4431, 4478, 4525, 4573, 4621, 4670, 4719, 4768, 4818, 4868, 4918, 4969, 5020, 5071, 5123, 5175, 5228, 5281, 5334, 5388, 5442, 5497, 5552, 5607, 5663, 5719, 5776, 5833, 5891, 5949, 6007, 6066, 6125, 6185, 6245, 6306, 6367, 6429, 6491, 6553, 6616, 6679, 6743, 6807, 6872, 6937, 7003, 7069, 7136, 7203, 7271, 7339, 7408, 7477, 7547, 7617, 7688, 7759, 7831, 7903, 7976, 8049, 8123, 8198, 8273, 8349, 8425, 8502, 8579, 8657, 8736, 8815, 8895, 8975, 9056, 9138, 9220, 9303, 9386, 9470, 9555, 9640, 9726, 9813, 9900, 9988, 10076, 10165, 10255, 10345, 10436, 10528, 10621, 10714, 10808, 10903, 10998, 11094, 11191, 11288, 11386, 11485, 11585, 11685, 11786, 11888, 11991, 12094, 12198, 12303, 12409, 12516, 12623, 12731, 12840, 12950, 13061, 13172, 13284, 13397, 13511, 13626, 13742, 13859, 13976, 14094, 14213, 14333, 14454, 14576, 14699, 14823, 14948, 15074, 15200, 15327, 15455, 15584, 15714, 15845, 15977, 16110, 16244, 16379, 16515, 16652, 16790, 16929, 17069, 17210, 17352, 17496, 17641, 17787, 17934, 18082, 18231, 18381, 18532, 18684, 18837, 18992, 19148, 19305, 19463, 19622, 19782, 19944, 20107, 20271, 20436, 20603, 20771, 20940, 21110, 21282, 21455, 21629, 21804, 21981, 22159, 22338, 22519, 22701, 22884, 23069, 23255, 23443, 23632, 23822, 24014, 24207, 24402, 24598, 24796, 24995, 25196, 25398, 25602, 25807, 26014, 26222, 26432, 26643, 26856, 27071, 27287, 27505, 27724, 27945, 28168, 28392, 28618, 28846, 29075, 29306, 29539, 29774, 30010, 30248, 30488, 30730, 30974, 31219, 31466, 31715, 31966, 32219, 32474, 32731, 32990, 33250, 33512, 33776, 34042, 34310, 34580, 34852, 35126, 35402, 35681, 35962, 36245, 36530, 36817, 37106, 37397, 37690, 37986, 38284, 38584, 38886, 39191, 39498, 39807, 40119, 40433, 40749, 41068, 41389, 41712, 42038, 42366, 42697, 43030, 43366, 43704, 44045, 44388, 44734, 45082, 45433, 45787, 46143, 46502, 46864, 47228, 47595, 47965, 48338, 48713, 49091, 49472, 49856, 50243, 50633, 51026, 51422, 51821, 52223, 52628, 53036, 53447, 53861, 54278, 54698, 55121, 55547, 55976, 56409, 56845, 57284, 57726, 58172, 58621, 59073, 59529, 59988, 60451, 60917, 61387, 61860, 62337, 62817, 63301, 63789, 64280, 64775, 65274, 65776, 66282, 66792, 67306, 67823, 68344, 68869, 69398, 69931, 70468, 71009, 71554, 72103, 72656, 73214, 73776, 74342, 74912, 75487, 76066, 76649];
    GIRLS_EXP_LEVELS.legendary = [0, 16, 33, 50, 67, 84, 101, 118, 135, 152, 170, 188, 206, 224, 242, 260, 278, 297, 316, 335, 354, 373, 392, 411, 431, 451, 471, 491, 511, 531, 551, 572, 593, 614, 635, 656, 677, 698, 720, 742, 764, 786, 808, 830, 853, 876, 899, 922, 945, 968, 992, 1016, 1040, 1064, 1088, 1112, 1137, 1162, 1187, 1212, 1237, 1263, 1289, 1315, 1341, 1367, 1394, 1421, 1448, 1475, 1502, 1529, 1557, 1585, 1613, 1641, 1670, 1699, 1728, 1757, 1786, 1816, 1846, 1876, 1906, 1936, 1967, 1998, 2029, 2060, 2092, 2124, 2156, 2188, 2221, 2254, 2287, 2320, 2354, 2388, 2422, 2456, 2491, 2526, 2561, 2596, 2632, 2668, 2704, 2740, 2777, 2814, 2851, 2888, 2926, 2964, 3002, 3041, 3080, 3119, 3158, 3198, 3238, 3278, 3319, 3360, 3401, 3443, 3485, 3527, 3569, 3612, 3655, 3698, 3742, 3786, 3830, 3875, 3920, 3965, 4011, 4057, 4103, 4150, 4197, 4244, 4292, 4340, 4388, 4437, 4486, 4536, 4586, 4636, 4687, 4738, 4789, 4841, 4893, 4946, 4999, 5052, 5106, 5160, 5215, 5270, 5325, 5381, 5437, 5494, 5551, 5608, 5666, 5724, 5783, 5842, 5902, 5962, 6023, 6084, 6145, 6207, 6269, 6332, 6395, 6459, 6523, 6588, 6653, 6719, 6785, 6852, 6919, 6987, 7055, 7124, 7193, 7263, 7333, 7404, 7475, 7547, 7619, 7692, 7765, 7839, 7914, 7989, 8065, 8141, 8218, 8295, 8373, 8451, 8530, 8610, 8690, 8771, 8852, 8934, 9017, 9100, 9184, 9269, 9354, 9440, 9526, 9613, 9701, 9789, 9878, 9968, 10058, 10149, 10241, 10333, 10426, 10520, 10615, 10710, 10806, 10903, 11000, 11098, 11197, 11297, 11397, 11498, 11600, 11703, 11806, 11910, 12015, 12121, 12227, 12334, 12442, 12551, 12661, 12771, 12882, 12994, 13107, 13221, 13336, 13452, 13568, 13685, 13803, 13922, 14042, 14163, 14285, 14408, 14532, 14656, 14781, 14907, 15034, 15162, 15291, 15421, 15552, 15684, 15817, 15951, 16086, 16222, 16359, 16497, 16636, 16776, 16917, 17059, 17202, 17346, 17492, 17639, 17787, 17936, 18086, 18237, 18389, 18542, 18696, 18852, 19009, 19167, 19326, 19486, 19648, 19811, 19975, 20140, 20306, 20474, 20643, 20813, 20984, 21157, 21331, 21506, 21683, 21861, 22040, 22221, 22403, 22586, 22771, 22957, 23144, 23333, 23523, 23715, 23908, 24103, 24299, 24496, 24695, 24895, 25097, 25300, 25505, 25712, 25920, 26130, 26341, 26554, 26768, 26984, 27202, 27421, 27642, 27865, 28089, 28315, 28543, 28772, 29003, 29236, 29470, 29706, 29944, 30184, 30426, 30669, 30914, 31161, 31410, 31661, 31914, 32168, 32424, 32682, 32942, 33204, 33468, 33734, 34002, 34272, 34544, 34818, 35094, 35372, 35652, 35934, 36219, 36506, 36795, 37086, 37379, 37674, 37972, 38272, 38574, 38878, 39185, 39494, 39805, 40119, 40435, 40753, 41074, 41397, 41722, 42050, 42380, 42713, 43048, 43386, 43726, 44069, 44415, 44763, 45114, 45467, 45823, 46182, 46543, 46907, 47274, 47644, 48016, 48391, 48769, 49150, 49534, 49920, 50309, 50701, 51096, 51494, 51895, 52299, 52706, 53116, 53529, 53945, 54364, 54787, 55213, 55642, 56074, 56509, 56948, 57390, 57835, 58284, 58736, 59191, 59650, 60112, 60578, 61047, 61520, 61996, 62476, 62959, 63446, 63937, 64431, 64929, 65431, 65937, 66446, 66959, 67476, 67997, 68522, 69051, 69584, 70121, 70662, 71207, 71756, 72309, 72866, 73427, 73992, 74562, 75136, 75714, 76297, 76884, 77475, 78071, 78671, 79276, 79885, 80499, 81117, 81740, 82368, 83000, 83637, 84279, 84926, 85578, 86235, 86896, 87562];
    GIRLS_EXP_LEVELS.mythic = [0, 40, 81, 122, 163, 205, 247, 289, 332, 375, 418, 462, 506, 550, 595, 640, 685, 731, 777, 823, 870, 917, 964, 1012, 1060, 1108, 1157, 1206, 1255, 1305, 1355, 1406, 1457, 1508, 1560, 1612, 1664, 1717, 1770, 1824, 1878, 1932, 1987, 2042, 2098, 2154, 2210, 2267, 2324, 2382, 2440, 2499, 2558, 2617, 2677, 2737, 2798, 2859, 2921, 2983, 3046, 3109, 3173, 3237, 3302, 3367, 3433, 3499, 3565, 3632, 3699, 3767, 3835, 3904, 3974, 4044, 4115, 4186, 4258, 4330, 4403, 4476, 4550, 4624, 4699, 4774, 4850, 4927, 5004, 5082, 5160, 5239, 5318, 5398, 5479, 5560, 5642, 5724, 5807, 5891, 5975, 6060, 6146, 6232, 6319, 6407, 6495, 6584, 6673, 6763, 6854, 6945, 7037, 7130, 7224, 7318, 7413, 7509, 7605, 7702, 7800, 7899, 7998, 8098, 8199, 8301, 8403, 8506, 8610, 8715, 8820, 8926, 9033, 9141, 9250, 9359, 9469, 9580, 9692, 9805, 9919, 10033, 10148, 10264, 10381, 10499, 10618, 10738, 10858, 10979, 11101, 11224, 11348, 11473, 11599, 11726, 11854, 11983, 12113, 12244, 12376, 12509, 12643, 12778, 12914, 13051, 13189, 13328, 13468, 13609, 13751, 13894, 14038, 14183, 14329, 14476, 14624, 14774, 14925, 15077, 15230, 15384, 15539, 15695, 15853, 16012, 16172, 16333, 16495, 16658, 16823, 16989, 17156, 17324, 17494, 17665, 17837, 18011, 18186, 18362, 18539, 18718, 18898, 19079, 19262, 19446, 19632, 19819, 20007, 20197, 20388, 20581, 20775, 20970, 21167, 21365, 21565, 21766, 21969, 22173, 22379, 22587, 22796, 23007, 23219, 23433, 23648, 23865, 24084, 24304, 24526, 24750, 24975, 25202, 25431, 25661, 25893, 26127, 26363, 26600, 26839, 27080, 27323, 27567, 27813, 28061, 28311, 28563, 28817, 29073, 29331, 29591, 29852, 30115, 30380, 30647, 30916, 31187, 31460, 31735, 32013, 32293, 32575, 32859, 33145, 33433, 33723, 34015, 34310, 34607, 34906, 35207, 35511, 35817, 36125, 36435, 36748, 37063, 37380, 37700, 38022, 38347, 38674, 39003, 39335, 39669, 40006, 40345, 40687, 41032, 41379, 41729, 42081, 42436, 42794, 43154, 43517, 43883, 44251, 44622, 44996, 45373, 45753, 46136, 46521, 46909, 47300, 47694, 48091, 48491, 48894, 49300, 49709, 50121, 50536, 50954, 51375, 51800, 52228, 52659, 53093, 53530, 53971, 54415, 54862, 55313, 55767, 56225, 56686, 57150, 57618, 58089, 58564, 59042, 59524, 60010, 60499, 60992, 61489, 61989, 62493, 63001, 63513, 64029, 64548, 65071, 65598, 66129, 66664, 67203, 67746, 68293, 68844, 69400, 69960, 70524, 71092, 71664, 72241, 72822, 73407, 73997, 74591, 75190, 75793, 76401, 77013, 77630, 78251, 78877, 79508, 80143, 80783, 81428, 82078, 82733, 83393, 84058, 84728, 85403, 86083, 86768, 87458, 88153, 88853, 89558, 90269, 90985, 91706, 92433, 93165, 93903, 94646, 95395, 96149, 96909, 97675, 98447, 99224, 100007, 100796, 101591, 102392, 103199, 104012, 104831, 105656, 106487, 107325, 108169, 109019, 109876, 110739, 111609, 112485, 113368, 114257, 115153, 116056, 116965, 117881, 118804, 119734, 120671, 121615, 122566, 123524, 124489, 125462, 126442, 127429, 128424, 129426, 130436, 131453, 132478, 133510, 134550, 135598, 136654, 137718, 138790, 139870, 140958, 142054, 143158, 144271, 145392, 146521, 147659, 148805, 149960, 151123, 152295, 153476, 154666, 155865, 157073, 158290, 159516, 160751, 161995, 163249, 164512, 165785, 167067, 168359, 169660, 170971, 172292, 173623, 174964, 176315, 177676, 179047, 180429, 181821, 183223, 184636, 186059, 187493, 188938, 190394, 191861, 193339, 194828, 196328, 197839, 199361, 200895, 202440, 203997, 205566, 207146, 208738, 210342, 211958, 213586, 215227, 216880];
    return GIRLS_EXP_LEVELS[inRarity][inLevel];
}

function moduleShopActions()
{
    appendMenuSell();
    appendMenuAff();
    appendMenuExp();

    function appendMenuAff()
    {
        var menuAff = '<div style="position: absolute;right: 50px;top: -10px;" class="tooltip"><span class="tooltiptext">'+getTextForUI("menuAff","tooltip")+'</span><label style="width:100px" class="myButton" id="menuAff">'+getTextForUI("menuAff","elementText")+'</label></div>'
        + '<dialog id="AffDialog"><form stylemethod="dialog">'
        +  '<div style="padding:10px; display:flex;flex-direction:column;">'
        //+   '<div style="display:flex;flex-direction:row;">'
        +    '<p id="menuAffText"></p>'
        //+   '</div>'
        +   '<p ></p>'
        +   '<div id="menuAffHide" style="display:none">'
        +    '<div style="display:flex;flex-direction:row;">'
        +     '<div style="padding:10px;"class="tooltip"><span class="tooltiptext">'+getTextForUI("menuAffButton","tooltip")+'</span><label class="myButton" id="menuAffButton">'+getTextForUI("menuAffButton","elementText")+'</label></div>'
        +    '</div>'
        +   '</div>'
        +  '</div>'
        + '<menu> <label style="width:80px" class="myButton" id="menuAffCancel">'+getTextForUI("OptionCancel","elementText")+'</label></menu></form></dialog>'

        if ($("#menuAff").length === 0 )
        {
            let getSelectGirlID;
            let girl;
            let giftArray = {};
            let AffToGive;
            $('#inventory > div.gift > label').append(menuAff);
            document.getElementById("menuAff").addEventListener("click", function()
                                                                {
                girl=$('div.girl-ico:not(.not-selected)');
                getSelectGirlID=girl.attr("id_girl");
                let selectedGirl=girl.data("g");

                //                 if ($('div[id_girl='+getSelectGirlID+'][data-g] .aff_val').length === 0 && $('div[id_girl='+getSelectGirlID+'][data-g] .bar-wrap.upgrade.button_glow').length === 0)
                //                 {
                //                     logHHAuto("Error catching girl current Aff, cancelling.");
                //                     if (typeof AffDialog.showModal === "function")
                //                     {
                //                         document.getElementById("menuAffText").innerHTML = getTextForUI("menuAffError","elementText");
                //                         document.getElementById("menuAffHide").style.display = "none";
                //                         AffDialog.showModal();
                //                     }
                //                     else
                //                     {
                //                         alert("The <dialog> API is not supported by this browser");
                //                     }

                //                     return;
                //                 }
                //                 else if ($('div[id_girl='+getSelectGirlID+'][data-g] .aff_val').length === 0 && $('div[id_girl='+getSelectGirlID+'][data-g] .bar-wrap.upgrade.button_glow').length >0)
                if ($('div[id_girl='+getSelectGirlID+'][data-g] .bar-wrap.upgrade.button_glow').length >0)
                {
                    if (typeof AffDialog.showModal === "function")
                    {
                        document.getElementById("menuAffText").innerHTML = selectedGirl.Name+" "+getTextForUI("menuAffNoNeed","elementText");
                        document.getElementById("menuAffHide").style.display = "none";
                        AffDialog.showModal();
                    }
                    else
                    {
                        alert("The <dialog> API is not supported by this browser");
                    }

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
                    menuText = selectedGirl.Name+" "+selectedGirl.Affection.cur+"/"+selectedGirl.Affection.max+"<br>"+getTextForUI("menuDistribution","elementText")+"<br>";
                    let Affkeys = Object.keys(AffToGive.partitions);
                    for ( var i of Affkeys )
                    {
                        menuText = menuText+i+"Aff x "+AffToGive.partitions[i]+"<br>"
                    }
                    menuText = menuText+getTextForUI("Total","elementText")+AffToGive.total+"/"+AffMissing;
                    document.getElementById("menuAffHide").style.display = "block";

                }
                else if (totalAff === 0 || (Number(selectedGirl.Affection.max)-Number(selectedGirl.Affection.cur)) <=minAffItem)
                {
                    menuText = getTextForUI("menuAffNoAff","elementText")+" "+selectedGirl.Name;
                }
                logHHAuto(menuText);
                if (typeof AffDialog.showModal === "function")
                {
                    document.getElementById("menuAffText").innerHTML = menuText;
                    AffDialog.showModal();
                }
                else
                {
                    alert("The <dialog> API is not supported by this browser");
                }
            });
            document.getElementById("menuAffButton").addEventListener("click", function()
                                                                      {
                giveAff(getSelectGirlID, AffToGive, giftArray);
            });
            document.getElementById("menuAffCancel").addEventListener("click", function(){

                if (typeof AffDialog.showModal === "function")
                {

                    AffDialog.close();

                }
                else
                {
                    alert("The <dialog> API is not supported by this browser");
                }
            });
        }
    }

    function giveAff(inGirlID, inAffToGive, inAffArray)
    {
        let girl=$('div.girl-ico:not(.not-selected)');
        let selectedGirl=girl.data("g");
        let selectedGirlAff=selectedGirl.Affection.cur;
        logHHAuto('start giving Aff to '+selectedGirl.Name);
        let currentTotal = selectedGirlAff;
        let currentItem = -1;
        let inAffToGivePartitionBackup = { ...inAffToGive.partitions }
        document.getElementById("menuAffHide").style.display = "none";
        document.getElementById("menuAffText").innerHTML = selectedGirl.Name+" "+selectedGirlAff+"/"+selectedGirl.Affection.max+"<br>"+getTextForUI("menuDistributed","elementText")+"<br>";

        giveAff_func = setInterval(() =>
                                   {

            if (!document.getElementById("AffDialog").open)
            {
                logHHAuto('Aff Dialog closed, stopping');
                clearInterval(giveAff_func);
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
                    let menuText = selectedGirl.Name+" "+selectedGirlAff+"/"+selectedGirl.Affection.max+"<br>"+getTextForUI("menuDistributed","elementText")+"<br>";
                    let Affkeys = Object.keys(inAffToGivePartitionBackup);
                    let givenTotal = 0;
                    logHHAuto({log:"Remains to spend",inAffToGive:inAffToGive});
                    for ( var i of Affkeys )
                    {
                        let diff=Number(inAffToGivePartitionBackup[i]-inAffToGive.partitions[i]);
                        givenTotal += diff*Number(i);
                        if (diff >0)
                        {
                            menuText = menuText+i+"Aff x "+diff+"<br>"
                        }
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
                    clearInterval(giveAff_func);
                    let menuText;
                    if ($('div[id_girl='+inGirlID+'][data-g] .bar-wrap.upgrade.button_glow').length >0)
                    {
                        logHHAuto(selectedGirl.Name+ " is ready to be upgrade");
                        menuText =selectedGirl.Name+" "+getTextForUI("menuAffReadyToUpgrade","elementText")+"<br>"+getTextForUI("menuDistributed","elementText")+"<br>";

                    }
                    else
                    {
                        logHHAuto(selectedGirl.Name+ "max aff given.");
                        menuText =getTextForUI("menuAffEnd","elementText")+" "+selectedGirl.Name+"<br>"+getTextForUI("menuDistributed","elementText")+"<br>";


                    }
                    let givenTotal = 0;
                    let Affkeys = Object.keys(inAffToGivePartitionBackup);
                    for ( var i of Affkeys )
                    {
                        let diff=Number(inAffToGivePartitionBackup[i]-inAffToGive.partitions[i]);
                        givenTotal += diff*Number(i);
                        if (diff >0)
                        {
                            menuText = menuText+i+"Aff x "+diff+"<br>"
                        }
                    }
                    menuText = menuText+getTextForUI("Total","elementText")+givenTotal;
                    document.getElementById("menuAffText").innerHTML = menuText;
                    document.getElementById("menuAffHide").style.display = "none";

                }
                else if (currentItem !== -1)
                {
                    logHHAuto("selected item : "+currentItem);
                    $('div.gift div.inventory_slots div[id_item='+inAffArray[currentItem]+'][data-d]').click();
                    currentTotal+=Number(currentItem)
                }
                return;
            }
            else
            {
                if (inAffArray[currentItem] === $('div.gift div.inventory_slots div[id_item][data-d].selected').attr("id_item") && inAffToGive.partitions[currentItem] >0 )
                {
                    logHHAuto("clicked on "+currentItem);
                    $('#inventory > button.blue_text_button[rel=use]').click();
                    return;
                }
            }
        }, randomInterval(800,1600));
    }
    function appendMenuExp()
    {
        var menuExp = '<div style="position: absolute;right: 50px;top: -10px;" class="tooltip"><span class="tooltiptext">'+getTextForUI("menuExp","tooltip")+'</span><label style="width:100px" class="myButton" id="menuExp">'+getTextForUI("menuExp","elementText")+'</label></div>'
        + '<dialog id="ExpDialog"><form stylemethod="dialog">'
        +  '<div style="padding:10px; display:flex;flex-direction:column;">'
        +    '<p id="menuExpText"></p>'
        +    '<div style="display:flex;flex-direction:row;">'
        +     '<p>'+getTextForUI("menuExpLevel","elementText")+'</p>'
        +     '<div style="padding:10px;" class="tooltip"><span class="tooltiptext">'+getTextForUI("menuExpLevel","tooltip")+'</span><input id="menuExpLevel" style="width:50px;height:20px" required pattern="'+HHAuto_inputPattern.menuExpLevel+'" type="text" value="'+getSetHeroInfos('level')+'"></div>'
        +    '</div>'
        +   '<div id="menuExpHide" style="display:none">'
        +    '<div style="display:flex;flex-direction:row;">'
        +     '<div style="padding:10px;"class="tooltip"><span class="tooltiptext">'+getTextForUI("menuExpButton","tooltip")+'</span><label class="myButton" id="menuExpButton">'+getTextForUI("menuExpButton","elementText")+'</label></div>'
        +    '</div>'
        +   '</div>'
        +  '</div>'
        + '<menu> <label style="width:80px" class="myButton" id="menuExpCancel">'+getTextForUI("OptionCancel","elementText")+'</label></menu></form></dialog>'

        if ($("#menuExp").length === 0 )
        {
            let getSelectGirlID;
            let potionArray = {};
            let ExpToGive;


            $('#inventory > div.potion > label').append(menuExp);
            document.getElementById("menuExp").addEventListener("click", function()
                                                                {
                if (typeof ExpDialog.showModal === "function")
                {
                    prepareExp();
                    ExpDialog.showModal();
                }
                else
                {
                    alert("The <dialog> API is not supported by this browser");
                }
            });
            document.getElementById("menuExpLevel").addEventListener("change", function()
                                                                     {
                prepareExp();
            });
            document.getElementById("menuExpButton").addEventListener("click", function()
                                                                      {
                giveExp(getSelectGirlID, ExpToGive, potionArray);
            });
            document.getElementById("menuExpCancel").addEventListener("click", function(){

                if (typeof ExpDialog.showModal === "function")
                {

                    ExpDialog.close();

                }
                else
                {
                    alert("The <dialog> API is not supported by this browser");
                }
            });

            function prepareExp()
            {

                let targetedLevel = Number(document.getElementById("menuExpLevel").value);

                let girl;

                girl=$('div.girl-ico:not(.not-selected)');
                getSelectGirlID=girl.attr("id_girl");
                let selectedGirl=girl.data("g");
                let selectedGirlTooltip=JSON.parse(girl.attr('girl-tooltip-data') || girl.attr('new-girl-tooltip-data'));

                let selectedGirlExp=selectedGirl.Xp.cur;
                potionArray = {};
                let potionCount = {};
                let minExpItem=99999;
                let totalExp=0;
                let menuText="";
                $('div.potion div.inventory_slots div[id_item][data-d]').each(function()
                                                                              {
                    let data=JSON.parse($(this).attr("data-d"));
                    let countpotion=Number($('div.potion div.inventory_slots div[id_item='+$(this).attr("id_item")+'][data-d] .stack_num span')[0].innerHTML.replace(/[^0-9]/gi, ''))

                    if (minExpItem > Number(data.value))
                    {
                        minExpItem = Number(data.value);
                    }
                    potionCount[Number(data.value)]=countpotion;
                    totalExp+=Number(data.value)*countpotion
                    potionArray[Number(data.value)]=$(this).attr("id_item");
                });

                if (totalExp > 0
                    && Number(selectedGirl.Xp.level) < targetedLevel
                    && Number(selectedGirl.Xp.cur) < getLevelXp(selectedGirlTooltip.rarity,targetedLevel)
                    && (Number(getLevelXp(selectedGirlTooltip.rarity,targetedLevel)-Number(selectedGirl.Xp.cur)) >=minExpItem) )
                {
                    let ExpMissing = Number(getLevelXp(selectedGirlTooltip.rarity,targetedLevel))-Number(selectedGirl.Xp.cur);
                    ExpToGive=findSubsetsPartition(ExpMissing,potionCount);
                    menuText = selectedGirl.Name+" "+selectedGirl.Xp.cur+"/"+getLevelXp(selectedGirlTooltip.rarity,targetedLevel)+"<br>"+getTextForUI("menuDistribution","elementText")+"<br>";
                    let Expkeys = Object.keys(ExpToGive.partitions);
                    for ( var i of Expkeys )
                    {
                        menuText = menuText+i+"Exp x "+ExpToGive.partitions[i]+"<br>"
                    }
                    menuText = menuText+getTextForUI("Total","elementText")+ExpToGive.total+"/"+ExpMissing;
                    document.getElementById("menuExpHide").style.display = "block";
                }
                else
                {
                    menuText = getTextForUI("menuExpNoExp","elementText")+" "+selectedGirl.Name;
                    document.getElementById("menuExpHide").style.display = "none";
                }
                logHHAuto(menuText);
                document.getElementById("menuExpText").innerHTML = menuText;
            }
        }
    }



    function giveExp(inGirlID, inExpToGive, inExpArray)
    {
        let girl=$('div.girl-ico:not(.not-selected)');
        let selectedGirl=girl.data("g");
        let selectedGirlExp=selectedGirl.Xp.cur;
        let selectedGirlTooltip=JSON.parse(girl.attr('girl-tooltip-data') || girl.attr('new-girl-tooltip-data'));
        let targetedLevel = Number(document.getElementById("menuExpLevel").value);
        let targetedXp = getLevelXp(selectedGirlTooltip.rarity,targetedLevel);
        logHHAuto('start giving Exp to '+selectedGirl.Name);
        let currentTotal = selectedGirlExp;
        let currentItem = -1;
        let inExpToGivePartitionBackup = { ...inExpToGive.partitions }
        document.getElementById("menuExpHide").style.display = "none";
        document.getElementById("menuExpText").innerHTML = selectedGirl.Name+" "+selectedGirlExp+"/"+targetedXp+"<br>"+getTextForUI("menuDistributed","elementText")+"<br>";

        giveExp_func = setInterval(() =>
                                   {

            if (!document.getElementById("ExpDialog").open)
            {
                logHHAuto('Exp Dialog closed, stopping');
                clearInterval(giveExp_func);
                return;
            }

            girl=$('div.girl-ico:not(.not-selected)');
            selectedGirl=girl.data("g");
            selectedGirlExp=selectedGirl.Xp.cur;

            //console.log(currentItem, inExpToGive.partitions[currentItem],inExpToGive.partitions,selectedGirlExp,currentTotal);

            //check if previous click has worked
            if (selectedGirlExp === currentTotal)
            {
                //decrease count
                if (currentItem !== -1)
                {
                    logHHAuto('Spent one '+currentItem);
                    inExpToGive.partitions[currentItem] = inExpToGive.partitions[currentItem]-1;
                    let menuText = selectedGirl.Name+" "+selectedGirlExp+"/"+targetedXp+"<br>"+getTextForUI("menuDistributed","elementText")+"<br>";
                    let Expkeys = Object.keys(inExpToGivePartitionBackup);
                    let givenTotal = 0;
                    logHHAuto({log:"Remains to spend",inExpToGive:inExpToGive});
                    for ( var i of Expkeys )
                    {
                        let diff=Number(inExpToGivePartitionBackup[i]-inExpToGive.partitions[i]);
                        givenTotal += diff*Number(i);
                        if (diff >0)
                        {
                            menuText = menuText+i+"Exp x "+diff+"<br>"
                        }
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

                    logHHAuto(selectedGirl.Name+ "max Exp given.");
                    menuText =getTextForUI("menuExpEnd","elementText")+" "+selectedGirl.Name+"<br>"+getTextForUI("menuDistributed","elementText")+"<br>";
                    let givenTotal = 0;
                    let Expkeys = Object.keys(inExpToGivePartitionBackup);
                    for ( var i of Expkeys )
                    {
                        let diff=Number(inExpToGivePartitionBackup[i]-inExpToGive.partitions[i]);
                        givenTotal += diff*Number(i);
                        if (diff >0)
                        {
                            menuText = menuText+i+"Exp x "+diff+"<br>"
                        }
                    }
                    menuText = menuText+getTextForUI("Total","elementText")+givenTotal;
                    document.getElementById("menuExpText").innerHTML = menuText;
                    document.getElementById("menuExpHide").style.display = "none";

                }
                else if (currentItem !== -1)
                {
                    logHHAuto("selected item : "+currentItem);
                    $('div.potion div.inventory_slots div[id_item='+inExpArray[currentItem]+'][data-d]').click();
                    currentTotal+=Number(currentItem)
                }
                return;
            }
            else
            {
                if (inExpArray[currentItem] === $('div.potion div.inventory_slots div[id_item][data-d].selected').attr("id_item") && inExpToGive.partitions[currentItem] >0 )
                {
                    logHHAuto("clicked on "+currentItem);
                    $('#inventory > button.blue_text_button[rel=use]').click();
                    return;
                }
            }
        }, randomInterval(800,1600));
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
                        //	return tmp_result;
                        //}
                    }
                }
                //console.log("result : ",result);
                return result;
            }

            //if ( arr[0] == currentMax )
            //{
            //	return 2;
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

        itemsListMenu +=' <tbody>'
            +'</table>';
        document.getElementById("menuSellList").innerHTML = itemsListMenu;
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

    function appendMenuSell()
    {
        var menuSell = '<div style="position: absolute;right: 50px;top: -10px" class="tooltip"><span class="tooltiptext">'+getTextForUI("menuSell","tooltip")+'</span><label style="width:70px" class="myButton" id="menuSell">'+getTextForUI("menuSell","elementText")+'</label></div>'
        + '<dialog style="overflow-y:auto;max-width:95%;max-height:95%;"id="SellDialog"><form stylemethod="dialog">'
        +  '<div style="padding:10px; display:flex;flex-direction:column;">'
        +   '<p>'+getTextForUI("menuSellText","elementText")+'</p>'
        +   '<div style="display:flex;flex-direction:row;">'
        +    '<p>'+getTextForUI("menuSellCurrentCount","elementText")+'</p>'
        +    '<p id="menuSellCurrentCount">0</p>'
        +   '</div>'
        +   '<p ></p>'
        +   '<div id="menuSellHide" style="display:none">'
        +    '<p id="menuSellList"></p>'
        +    '<div style="display:flex;flex-direction:row;">'
        +     '<div style="padding:10px;"class="tooltip"><span class="tooltiptext">'+getTextForUI("menuSellButton","tooltip")+'</span><label class="myButton" id="menuSellButton">'+getTextForUI("menuSellButton","elementText")+'</label></div>'
        +     '<div style="padding:10px;" class="tooltip"><span class="tooltiptext">'+getTextForUI("menuSellNumber","tooltip")+'</span><input id="menuSellNumber" style="width:80%;height:20px" required pattern="'+HHAuto_inputPattern.menuSellNumber+'" type="text" value="0"></div>'
        +    '</div>'
        +   '</div>'
        +   '<div id="menuSoldHide" style="display:none">'
        +    '<div style="display:flex;flex-direction:row;">'
        +     '<p>'+getTextForUI("menuSoldText","elementText")+'</p>'
        +     '<p id="menuSoldCurrentCount">0</p>'
        +    '</div>'
        +    '<p id="menuSoldMessage">0</p>'
        +   '</div>'
        +  '</div>'
        + '<menu> <label style="width:80px" class="myButton" id="menuSellCancel">'+getTextForUI("OptionCancel","elementText")+'</label></menu></form></dialog>'

        var menuSellLock = '<div style="position: absolute;left: 70px;top: -10px" class="tooltip"><span class="tooltiptext">'+getTextForUI("menuSellLock","tooltip")+'</span><label style="width:70px" class="myButton" id="menuSellLock">'+getTextForUI("menuSellLock","elementText")+'</label></div>'
        var menuSellMaskLocked = '<div style="position: absolute;left: -5px;top: -10px" class="tooltip"><span class="tooltiptext">'+getTextForUI("menuSellMaskLocked","tooltip")+'</span><label style="width:70px" class="myButton" id="menuSellMaskLocked">'+getTextForUI("menuSellMaskLocked","elementText")+'</label></div>'

        if ($("#menuSell").length === 0 )
        {
            $('#inventory > div.armor > label').append(menuSell);

            document.getElementById("menuSell").addEventListener("click", function(){

                if (typeof SellDialog.showModal === "function")
                {

                    SellDialog.showModal();
                    fetchAllArmorItems();
                }
                else
                {
                    alert("The <dialog> API is not supported by this browser");
                }
            });
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

            document.getElementById("menuSellButton").addEventListener("click", function()
                                                                       {
                if (Number(document.getElementById("menuSellNumber").value) >0 )
                {
                    logHHAuto("Starting selling "+Number(document.getElementById("menuSellNumber").value)+" items.");
                    sellArmorItems();
                }
            });
        }
        else if ($('#inventory > div.armor.selected > label').length > 0)
        {
            document.getElementById("menuSellCurrentCount").innerHTML = $('#inventory .selected .inventory_slots .slot:not(.empty):not([menuSellLocked])').length;
        }

        if ($("#menuSellMaskLocked").length === 0 )
        {
            $('#inventory > div.armor > label').append(menuSellMaskLocked);

            document.getElementById("menuSellMaskLocked").addEventListener("click", function(){
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
            });
        }
        if ($("#menuSellLock").length === 0 )
        {
            $('#inventory > div.armor > label').append(menuSellLock);

            document.getElementById("menuSellLock").addEventListener("click", function(){
                let filterText = "#inventory .selected .inventory_slots .slot.selected";
                if ($(filterText).length >0)
                {
                    let toLock=$(filterText)[0].getAttribute("menuSellLocked") === null;
                    AllLockUnlock(filterText,toLock);
                }
            });
        }
    }

    function fetchAllArmorItems()
    {
        //console.log(slots.armor_pack_load);
        if (slots.armor_pack_load < 0)
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
            if (data.last)
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
        selling_func = setInterval(() => {
            if ($('#type_item > div.selected[type=armor]').length === 0)
            {
                logHHAuto('Wrong tab');
                clearInterval(selling_func);
                return;
            }
            else if (!document.getElementById("SellDialog").open)
            {
                logHHAuto('Sell Dialog closed, stopping');
                clearInterval(selling_func);
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
                    clearInterval(selling_func);
                }
                //console.log(initialNumberOfItems,currentNumberOfItems);
                if ((initialNumberOfItems - currentNumberOfItems) < itemsToSell)
                {
                    let PlayerClass = getSetHeroInfos("class") === -1 ? $('#equiped > div.icon.class_change_btn').attr('carac') : getSetHeroInfos("class");
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
                        logHHAuto('can be sold:' + can_sell);
                        if (can_sell)
                        {
                            $('#inventory > button.green_text_button[rel=sell]').click();
                            let currSellNumber = Number((initialNumberOfItems - currentNumberOfItems) +1);
                            document.getElementById("menuSoldCurrentCount").innerHTML = currSellNumber+"/"+itemsToSell;
                            document.getElementById("menuSellCurrentCount").innerHTML = $('#inventory .selected .inventory_slots .slot:not(.empty):not([menuSellLocked])').length;
                            return;
                        }
                    }
                    //Find new non legendary sellable items
                    if ($('#inventory .selected .inventory_slots .slot:not(.selected):not(.empty):not(.legendary):not([menuSellLocked])').length > 0)
                    {
                        //Select first non legendary item
                        $('#inventory .selected .inventory_slots .slot:not(.selected):not(.empty):not(.legendary):not([menuSellLocked])')[0].click();
                        return;
                    }
                    else if ($('#inventory .selected .inventory_slots [canBeSold]:not([menuSellLocked])').length > 0)
                    {
                        //Select item that checked before and can be sold
                        $('#inventory .selected .inventory_slots [canBeSold]:not([menuSellLocked])')[0].click();
                        return;
                    }
                    else if ($('#inventory .selected .inventory_slots .slot:not(.selected):not(.empty):not([menuSellLocked])').length > 0)
                    {
                        let sellableslotsLegObj = $('#inventory .selected .inventory_slots .slot:not(.selected):not(.empty):not([menuSellLocked])');
                        //[MaxCarac,Index]
                        let TypesArrayPlayerClass = [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1]];
                        let equipedArray = $('#equiped .armor .slot[data-d*=EQ-LE-0' + PlayerClass + ']');
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
                            if (sellableslotsLegObj.id_equip != "EQ-LE-06" && sellableslotsLegObj.id_equip != "EQ-LE-04" && sellableslotsLegObj.id_equip != "EQ-LE-05" &&sellableslotsLegObj.id_equip != "EQ-LE-0" + PlayerClass)
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
                            clearInterval(selling_func);
                        }
                    }
                }
                else
                {
                    logHHAuto('Reach wanted sold items.');
                    document.getElementById("menuSoldMessage").innerHTML = getTextForUI("menuSoldMessageReachNB","elementText");
                    menuSellListItems();
                    document.getElementById("menuSellHide").style.display = "block";
                    clearInterval(selling_func);
                }
            }

        }, randomInterval(1000,1600));
    }
}

var moduleDisplayEventPriority=function()
{
    var eventGirlz=sessionStorage.HHAuto_Temp_eventsGirlz?JSON.parse(sessionStorage.HHAuto_Temp_eventsGirlz):[];
    if ($('.HHEventPriority').length  > 0) {return}
    //$("div.event-widget div.widget[style='display: block;'] div.container div.scroll-area div.rewards-block-tape div.girl_reward div.HHEventPriority").each(function(){this.remove();});
    if ( eventGirlz.length >0 )
    {
        var girl;
        var prio;
        var query="div.event-widget div.widget[style='display: block;'] div.container div.scroll-area div.rewards-block-tape div.girl_reward";
        var idArray;
        var currentGirl;
        for ( var e=eventGirlz.length;e>0;e--)
        {
            idArray = Number(e)-1;
            girl = Number(eventGirlz[idArray].split(";")[2]);
            query="div.event-widget div.widget[style='display: block;'] div.container div.scroll-area div.rewards-block-tape div.girl_reward[girl="+girl+"]";
            if ($(query).length >0 )
            {
                currentGirl=$(query)[0];
                $(query).prepend('<div class="HHEventPriority">'+e+'</div>');
                $($(query)).parent()[0].prepend(currentGirl);
            }
        }
    }

}


var CollectEventData=function()
{

    clearTimer('eventMythicNextWave');
    if (unsafeWindow.event_data || unsafeWindow.mythic_event_data)
    {
        //var Trollz=[];
        //var TrollzMythic=[];
        var eventsGirlz=[];
        var Priority=(Storage().HHAuto_Setting_eventTrollOrder?Storage().HHAuto_Setting_eventTrollOrder:"").split(";");

        if (unsafeWindow.event_data && Storage().HHAuto_Setting_plusEvent==="true")
        {
            var timeLeft=event_data.seconds_until_event_end;
            setTimer('eventGoing',timeLeft);

            for (var i=0;i<event_data.girls.length;i++)
            {
                if (!event_data.girls[i].owned_girl
                    && event_data.girls[i].troll
                    && Number(event_data.girls[i].troll.id_troll)<getSetHeroInfos('questing.id_world'))
                {
                    logHHAuto("Event girl : "+event_data.girls[i].name+" ("+event_data.girls[i].shards+"/100) at troll "+event_data.girls[i].troll.id_troll+" priority : "+Priority.indexOf(event_data.girls[i].troll.id_troll));
                    eventsGirlz.push("event;"+i+";"+event_data.girls[i].id_girl+";"+event_data.girls[i].troll.id_troll);
                    //Trollz.push(Number(event_data.girls[i].troll.id_troll));
                }
            }
        }

        if (unsafeWindow.mythic_event_data && Storage().HHAuto_Setting_plusEventMythic==="true")
        {
            var timeLeftMythic=mythic_event_data.seconds_until_event_end;
            setTimer('eventMythicGoing',timeLeftMythic);
            for (i=0;i<mythic_event_data.girls.length;i++)
            {
                if (Number(mythic_event_data.girls[i].shards) !== 100
                    && mythic_event_data.girls[i].troll
                    && mythic_event_data.can_participate === true
                    && Number(mythic_event_data.girls[i].troll.id_troll)<getSetHeroInfos('questing.id_world'))
                {
                    if ( Number(mythic_event_data.event_data.shards_available) !== 0 )
                    {
                        logHHAuto("Mythic Event girl : "+mythic_event_data.girls[i].name+" "+mythic_event_data.girls[i].shards+"/100");
                        //Trollz.push(Number(mythic_event_data.girls[i].troll.id_troll));
                        eventsGirlz.push("mythic_event;"+i+";"+mythic_event_data.girls[i].id_girl+";"+mythic_event_data.girls[i].troll.id_troll);
                        //TrollzMythic.push(Number(mythic_event_data.girls[i].troll.id_troll));
                    }
                    else
                    {
                        setTimer('eventMythicNextWave',Number(mythic_event_data.event_data.next_tranche_in));
                    }
                }
            }
        }

        //logHHAuto(Priority);
        //logHHAuto(Trollz);
        //logHHAuto({log:"EventGirls",eventGirlz:eventsGirlz});
        eventsGirlz = eventsGirlz.filter(function (a) {
            var a_split = a.split(";");
            var a_weighted = Number(Priority.indexOf(a_split[3]));
            if ( a_split[0] === "mythic_event" && Storage().HHAuto_Setting_eventMythicPrio === "true")
            {
                return true;
            }
            else
            {
                return a_weighted !== -1;
            }
        });
        //logHHAuto({log:"Filtered EventGirls",eventGirlz:eventsGirlz});
        if (eventsGirlz.length>0)
        {

            if (Priority[0]!='')
            {
                eventsGirlz.sort(function (a, b) {
                    var a_split = a.split(";");
                    var b_split = b.split(";");
                    var a_weighted = Number(Priority.indexOf(a_split[3]));
                    if ( a_split[0] === "mythic_event" && Storage().HHAuto_Setting_eventMythicPrio === "true")
                    {
                        a_weighted=a_weighted/10;
                    }
                    var b_weighted = Number(Priority.indexOf(b_split[3]));
                    if ( b_split[0] === "mythic_event" && Storage().HHAuto_Setting_eventMythicPrio === "true")
                    {
                        b_weighted=b_weighted/10;
                    }
                    return a_weighted-b_weighted;

                });
                //logHHAuto({log:"Sorted EventGirls",eventGirlz:eventsGirlz});
            }
            sessionStorage.HHAuto_Temp_eventsGirlz = JSON.stringify(eventsGirlz);
            var chosenTroll = Number(eventsGirlz[0].split(";")[3])
            logHHAuto("ET: "+chosenTroll);
            if ( eventsGirlz[0].split(";")[0] === "mythic_event" )
            {
                sessionStorage.HHAuto_Temp_eventTrollIsMythic="true";
            }
            else
            {
                sessionStorage.HHAuto_Temp_eventTrollIsMythic="false";
            }
            sessionStorage.HHAuto_Temp_eventTroll=chosenTroll;
        }
        else
        {
            sessionStorage.removeItem('HHAuto_Temp_eventsGirlz');
            sessionStorage.removeItem('HHAuto_Temp_eventTroll');
            sessionStorage.HHAuto_Temp_eventTrollIsMythic="false";
        }
        /*         if (Trollz.length>0)
        {
            if (Priority[0]!='')
            {
                var found=false;
                for (var n=0;n<Priority.length;n++)
                {
                    if (Trollz.includes(Number(Priority[n])))
                    {
                       logHHAuto("ET: "+Priority[n]);
                        sessionStorage.HHAuto_Temp_eventTroll=Number(Priority[n]);
                        found=true;
                        break;
                    }
                }
                if (!found)
                {
                    delete sessionStorage.HHAuto_Temp_eventTroll;
                    //sessionStorage.HHAuto_Temp_eventTroll=Trollz.sort((a,b)=>{return a-b;})[0];
                }
            }
            else
            {
                sessionStorage.HHAuto_Temp_eventTroll=Trollz.sort((a,b)=>{return a-b;})[0];
            }
        }
        else
        {
            delete sessionStorage.HHAuto_Temp_eventTroll;
        }
        //priorize mythic event over all
        if (Storage().HHAuto_Setting_eventMythicPrio === "true" && TrollzMythic.length>0)
        {
            sessionStorage.HHAuto_Temp_eventTroll=Number(TrollzMythic[0]);
        }
        */

        //logHHAuto('WTF?');
        var hero=getHero();
        var price=hero.get_recharge_cost("fight");
        //buy comb
        if (Storage().HHAuto_Setting_buyCombat=="true" && Storage().HHAuto_Setting_plusEvent==="true" )
        {
            //logHHAuto('WTF!');
            var diff=Math.ceil(Timers["eventGoing"]/1000)-Math.ceil(new Date().getTime()/1000);
            //logHHAuto(diff);
            hero=getHero();
            if (
                diff<Storage().HHAuto_Setting_buyCombTimer*3600
                && sessionStorage.HHAuto_Temp_eventTroll
                && getSetHeroInfos('fight.amount')==0
                && sessionStorage.HHAuto_Temp_eventTrollIsMythic==="false"
            )
            {
                price=hero.get_recharge_cost("fight");
                //logHHAuto('PRC: '+price);
                if (getSetHeroInfos('hard_currency')>=price+Number(Storage().HHAuto_Setting_kobanBank))
                {
                    logHHAuto('Buying comb for '+eventsGirlz[0].split(";")[0]);
                    RechargeCombat(price);
                }
            }
        }
        //buy comb mythic
        if (Storage().HHAuto_Setting_buyMythicCombat=="true" &&  Storage().HHAuto_Setting_plusEventMythic==="true")
        {
            //logHHAuto('WTF!');
            var diffMythic=Math.ceil(Timers["eventMythicGoing"]/1000)-Math.ceil(new Date().getTime()/1000);
            //logHHAuto(diff);
            hero=getHero();
            if (
                diffMythic<Storage().HHAuto_Setting_buyMythicCombTimer*3600 &&
                sessionStorage.HHAuto_Temp_eventTroll
                && getSetHeroInfos('fight.amount')==0
                && sessionStorage.HHAuto_Temp_eventTrollIsMythic==="true"
            )
            {
                price=hero.get_recharge_cost("fight");
                //logHHAuto('PRC: '+price);
                if (getSetHeroInfos('hard_currency')>=price+Number(Storage().HHAuto_Setting_kobanBank))
                {
                    logHHAuto('Buying mythic comb for '+eventsGirlz[0].split(";")[0]);
                    RechargeCombat(price);
                }
            }
        }
        return true;
    }
    logHHAuto('no  event');
    return false;
}

var RechargeCombat=function(price) {
    hh_ajax(
        {
            class: "Hero",
            action: "recharge",
            type: "fight"
        }, function(data) {
            Hero.update("fight.amount", getSetHeroInfos('fight.max_amount'));
            Hero.update("hard_currency", 0 - price, true);
        });

}

/*var autoBuy=function()
{
    return true ;
}*/

var getBurst=function()
{
    if (document.getElementById('sMenu'))
    {
        if (document.getElementById('sMenu').parentElement.style.display=='block' )// && !document.getElementById("DebugDialog").open)
        {
            return false;
        }
    }
    return Storage().HHAuto_Setting_master==="true"&&(!(Storage().HHAuto_Setting_paranoia==="true") || sessionStorage.HHAuto_Temp_burst==="true");
}

function saveHHVarsSettingsAsJSON() {
    var dataToSave={};
    var name='HH_SaveSettings_'+Date.now()+'.json';
    Object.keys(localStorage).forEach((key) =>
                                      {
        if (key.startsWith("HHAuto_Setting_"))
        {
            dataToSave["localStorage."+key] = localStorage.getItem(key);
        }
    });
    Object.keys(sessionStorage).forEach((key) =>
                                        {
        if (key.startsWith("HHAuto_Setting_"))
        {
            dataToSave["sessionStorage."+key] = sessionStorage.getItem(key);
        }
    });
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

function saveHHDebugLog()
{
    var dataToSave={};
    var name='HH_DebugLog_'+Date.now()+'.log';
    dataToSave['HHAuto_browserVersion']=getBrowserData(window.navigator || navigator);
    dataToSave['HHAuto_scriptHandler']=GM_info.scriptHandler+' '+GM_info.version;
    dataToSave['HHAuto_version']=GM_info.script.version;
    dataToSave['HHAuto_HHSite']=window.location.origin;
    Object.keys(localStorage).forEach((key) =>
                                      {
        if (key.startsWith("HHAuto_Setting_"))
        {
            dataToSave["localStorage."+key] = localStorage.getItem(key);
        }
    });
    Object.keys(sessionStorage).forEach((key) =>
                                        {
        if (key.startsWith("HHAuto_Setting_"))
        {
            dataToSave["sessionStorage."+key] = sessionStorage.getItem(key);
        }
    });
    Object.keys(localStorage).forEach((key) =>
                                      {
        if (key.startsWith("HHAuto_Temp_"))
        {
            dataToSave["localStorage."+key] = localStorage.getItem(key);
        }
    });
    Object.keys(sessionStorage).forEach((key) =>
                                        {
        if (key.startsWith("HHAuto_Temp_") && key !== "HHAuto_Temp_Logging")
        {
            dataToSave["sessionStorage."+key] = sessionStorage.getItem(key);
        }
    });
    if (sessionStorage.HHAuto_Temp_Logging)
    {
        dataToSave["sessionStorage.HHAuto_Temp_Logging"] = JSON.parse(sessionStorage.getItem('HHAuto_Temp_Logging'));
    }


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

function myfileLoad_onReaderLoad(event){
    var text = event.target.result;
    var storageType;
    var storageItem;
    var variableName;

    //Json validation
    if (/^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').
                             replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
                             replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
        logHHAuto('the json is ok');
        var jsonNewSettings = JSON.parse(event.target.result);
        //Assign new values to Storage();
        for (const [key, value] of Object.entries(jsonNewSettings)) {
            storageType=key.split(".")[0];
            variableName=key.split(".")[1];
            switch (storageType)
            {
                case 'localStorage' :
                    storageItem = localStorage;
                    break;
                case 'sessionStorage' :
                    storageItem = sessionStorage;
                    break;
            }
            logHHAuto(key+':'+ value);
            storageItem[variableName] = value;
        }
        location.reload();
    }else{
        $('#LoadConfError')[0].innerText ='Selected file broken!';
        logHHAuto('the json is Not ok');
    }
}

function debugDeleteTempVars()
{
    var dataToSave={};
    var storageType;
    var variableName;
    var storageItem;
    Object.keys(localStorage).forEach((key) =>
                                      {
        if (key.startsWith("HHAuto_Setting_"))
        {
            dataToSave["localStorage."+key] = localStorage.getItem(key);
        }
    });
    Object.keys(sessionStorage).forEach((key) =>
                                        {
        if (key.startsWith("HHAuto_Setting_"))
        {
            dataToSave["sessionStorage."+key] = sessionStorage.getItem(key);
        }
    });
    debugDeleteAllVars();
    setDefaults();
    var keys=Object.keys(dataToSave);
    for(var i of keys)
    {
        storageType=i.split(".")[0];
        variableName=i.split(".")[1];
        switch (storageType)
        {
            case 'localStorage' :
                storageItem = localStorage;
                break;
            case 'sessionStorage' :
                storageItem = sessionStorage;
                break;
        }
        logHHAuto(i+':'+ dataToSave[i]);
        storageItem[variableName] = dataToSave[i];
    }

}

function getTextForUI(id,type)
{
    if (HHAuto_ToolTips[HHAuto_Lang] !== undefined && HHAuto_ToolTips[HHAuto_Lang][id] !== undefined && HHAuto_ToolTips[HHAuto_Lang][id][type] !== undefined)
    {
        return HHAuto_ToolTips[HHAuto_Lang][id][type];
    }
    else
    {
        if (HHAuto_ToolTips['en'] !== undefined && HHAuto_ToolTips['en'][id] !== undefined && HHAuto_ToolTips['en'][id][type] !== undefined)
        {
            return HHAuto_ToolTips['en'][id][type];
        }
        else
        {
            logHHAuto("not found text for "+HHAuto_Lang+"/"+id+"/"+type);
            return HHAuto_Lang+"/"+id+"/"+type+" not found.";
        }
    }
}

var migrateHHVars = function ()
{
    var storageType;
    var variableName;
    var oldVarName;
    var storageItem;
    var migratedVars = localStorage.HHAuto_Temp_MigratedVars?true:false;

    if (!migratedVars && localStorage.settPerTab)
    {
        logHHAuto("migrated settbyTab");
        localStorage.HHAuto_Setting_settPerTab = localStorage.settPerTab;
    }

    if(!localStorage.HHAuto_Setting_settPerTab)
    {
        localStorage.HHAuto_Setting_settPerTab="false";
    }

    for (var i in HHVars)
    {
        storageType = HHVars[i].split(".")[0];
        variableName = HHVars[i].split(".")[1];
        oldVarName = variableName.split("_")[2];
        switch (storageType)
        {
            case 'Storage()' :
                storageItem = Storage();
                break;
            case 'localStorage' :
                storageItem = localStorage;
                break;
            case 'sessionStorage' :
                storageItem = sessionStorage;
                break;
        }
        if (!migratedVars && storageItem.getItem(oldVarName) !== null && storageItem.getItem(variableName) === null)
        {
            logHHAuto("migrated var : "+variableName);
            storageItem.setItem(variableName,storageItem.getItem(oldVarName));
        }

        if (localStorage.getItem(oldVarName) !== null)
        {
            localStorage.removeItem(oldVarName);
        }
        if (sessionStorage.getItem(oldVarName) !== null)
        {
            sessionStorage.removeItem(oldVarName);
        }
    }
    localStorage.HHAuto_Temp_MigratedVars="true";

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

const HC = 1;
const CH = 2;
const KH = 3;

var HHAuto_inputPattern = {
    kobanBank:"[0-9]+",
    buyCombTimer:"[0-9]+",
    buyMythicCombTimer:"[0-9]+",
    autoBuyBoostersFilter:"B[1-4](;B[1-4])*",
    calculatePowerLimits:"(\-?[0-9]+;\-?[0-9]+)|default",
    autoSalaryTextbox:"[0-9]+",
    autoTrollThreshold:"[1]?[0-9]",
    eventTrollOrder:"([1-2][0-9]|[1-9])(;([1-2][0-9]|[1-9]))*",
    autoSeasonThreshold:"[0-9]",
    autoQuestThreshold:"[1-9]?[0-9]",
    autoLeaguesThreshold:"1[0-4]|[0-9]",
    autoPowerPlacesIndexFilter:"[1-9][0-9]{0,1}(;[1-9][0-9]{0,1})*",
    autoChampsFilter:"[1-6](;[1-6])*",
    autoStats:"[0-9]+",
    autoExp:"[0-9]+",
    maxExp:"[0-9]+",
    autoAff:"[0-9]+",
    maxAff:"[0-9]+",
    autoLGM:"[0-9]+",
    autoLGR:"[0-9]+",
    autoEGM:"[0-9]+",
    menuSellNumber:"[0-9]+",
    autoClubChampMax:"[0-9]+",
    menuExpLevel:"[1-4]?[0-9]?[0-9]"
}

var HHAuto_ToolTips = [];

HHAuto_ToolTips.en = {
    saveDebug: { elementText: "Save Debug", tooltip : "Allow to produce a debug log file."},
    gitHub: { elementText: "GitHub", tooltip : "Link to GitHub project."},
    saveConfig: { elementText: "Save Config", tooltip : "Allow to save configuration."},
    loadConfig: { elementText: "Load Config", tooltip : "Allow to load configuration."},
    master: { elementText: "Master switch", tooltip : "On/off switch for full script"},
    settPerTab: { elementText: "Settings per tab", tooltip : "Allow the settings to be set for this tab only"},
    paranoia: { elementText: "Paranoia mode", tooltip : "Allow to simulate sleep, and human user (To be documented further)"},
    paranoiaSpendsBefore: { elementText: "Spends points before", tooltip : "On will spends point for options (quest, Troll, Leagues and Season)<br>only if they are enabled<br>and spends points that would be above max limits<br>Ex : you have power for troll at 17, but going 4h45 in paranoia<br>it would mean having 17+10 points (rounded to higher int), thus being above the 20 max<br> it will then spends 8 points to fall back to 19 end of Paranoia, preventing to loose points."},
    spendKobans0: { elementText: "Questionable Shit", tooltip : "First security switches for usage of kobans <br> All 3 needs to be active for Koban spending functions"},
    spendKobans1: { elementText: "Are you sure?", tooltip : "Second security switches for usage of kobans <br>Have to be activated after the first one.<br> All 3 needs to be active for Koban spending functions"},
    spendKobans2: { elementText: "You\'ve been warned", tooltip : "Third security switches for usage of kobans <br>Have to be activated after the second one.<br> All 3 needs to be active for Koban spending functions"},
    kobanBank: { elementText: "Koban Bank", tooltip : "(Integer)<br>Minimum Koban kept when using Koban spending functions"},
    buyCombat: { elementText: "Buy comb. in events", tooltip : "Koban spending functions<br>If enabled : <br>Buying combat point during last X hours of event (if not going under Koban bank value)"},
    buyCombTimer: { elementText: "Hours to buy Comb", tooltip : "(Integer)<br>X last hours of event"},
    autoBuyBoosters: { elementText: "Buy Leg. Boosters", tooltip : "Koban spending functions<br>Allow to buy booster in the market (if not going under Koban bank value)"},
    autoBuyBoostersFilter: { elementText: "Filter", tooltip : "(values separated by ;)<br>Set which booster to buy , order is respected (B1:Ginseng B2:Jujubes B3:Chlorella B4:Cordyceps)"},
    autoSeasonPassReds: { elementText: "Pass 3 reds", tooltip : "Koban spending functions<br>Use kobans to renew Season opponents if 3 reds"},
    showCalculatePower: { elementText: "Show PowerCalc", tooltip : "Display battle simulation indicator for Leagues, battle, Seasons "},
    calculatePowerLimits: { elementText: "Own limits (red;orange)", tooltip : "(red;orange)<br>Define your own red and orange limits for Opponents<br> -6000;0 do mean<br> <-6000 is red, between -6000 and 0 is orange and >=0 is green"},
    showInfo: { elementText: "Show info", tooltip : "if enabled : show info on script values and next runs"},
    autoSalaryCheckbox: { elementText: "AutoSal.", tooltip : "(Integer)<br>if enabled :<br>Collect salaries every X secs"},
    autoSalaryTextbox: { elementText: "min wait", tooltip : "(Integer)<br>X secs to collect Salary"},
    autoMissionCheckbox: { elementText: "AutoMission", tooltip : "if enabled : Automatically do missions"},
    autoMissionCollect: { elementText: "Collect", tooltip : "if enabled : Automatically collect missions"},
    autoTrollCheckbox: { elementText: "AutoTrollBattle", tooltip : "if enabled : Automatically battle troll selected"},
    autoTrollSelector: { elementText: "Troll selector", tooltip : "Select troll to be fought."},
    autoTrollThreshold: { elementText: "Threshold", tooltip : "(Integer 0 to 19)<br>Minimum troll fight to keep"},
    eventTrollOrder: { elementText: "Event Troll Order", tooltip : "(values separated by ;)<br>Allow to select in which order event troll are automatically battled<br>1 : Dark Lord<br>2 : Ninja Spy<br>3 : Gruntt<br>4 : Edwarda<br>5 : Donatien<br>6 : Sylvanus<br>7 : Bremen<br>8 : Finalmecia<br>9 : Fredy Sih Roko<br>10 : Karole<br>11 : Jackson's Crew<br>12 : Pandora Witch<br>13 : Nike"},
    plusEvent: { elementText: "+Event", tooltip : "If enabled : ignore selected troll during event to battle event"},
    plusEventMythic: { elementText: "+Mythic Event", tooltip : "Enable grabbing girls for mythic event, should only play them when shards are available"},
    eventMythicPrio: { elementText: "Priorize over Event Troll Order", tooltip : "Mythic event girl priorized over event troll order if shards available"},
    autoTrollMythicByPassThreshold: { elementText: "Mythic bypass Threshold", tooltip : "Allow mythic to bypass Troll threshold"},
    autoArenaCheckbox: { elementText: "AutoArenaBattle", tooltip : "if enabled : Automatically do Arena (deprecated)"},
    autoSeasonCheckbox: { elementText: "AutoSeason", tooltip : "if enabled : Automatically fight in Seasons (Opponent chosen following PowerCalculation)"},
    autoSeasonCollect: { elementText: "Collect", tooltip : "if enabled : Automatically collect Seasons ( if multiple to collect, will collect one per kiss usage)"},
    autoSeasonThreshold: { elementText: "Threshold", tooltip : "Minimum kiss to keep"},
    autoQuestCheckbox: { elementText: "AutoQuest", tooltip : "if enabled : Automatically do quest"},
    autoQuestThreshold: { elementText: "Threshold", tooltip : "(Integer between 0 and 99)<br>Minimum quest energy to keep"},
    autoContestCheckbox: { elementText: "AutoContest", tooltip : "if enabled : Collect finished contest rewards"},
    autoFreePachinko: { elementText: "AutoPachinko(Free)", tooltip : "if enabled : Automatically collect free Pachinkos"},
    autoLeagues: { elementText: "AutoLeagues", tooltip : "if enabled : Automatically battle Leagues"},
    autoLeaguesPowerCalc: { elementText: "UsePowerCalc", tooltip : "if enabled : will choose opponent using PowerCalc (Opponent list expires every 10 mins and take few mins to be built)"},
    autoLeaguesCollect: { elementText: "Collect", tooltip : "If enabled : Automatically collect Leagues"},
    autoLeaguesSelector: { elementText: "Target League", tooltip : "League to target, to try to demote, stay or go in higher league depending"},
    autoLeaguesThreshold: { elementText: "Threshold", tooltip : "(Integer between 0 and 14)<br>Minimum league fights to keep"},
    autoPowerPlaces: { elementText: "AutoPowerPlaces", tooltip : "if enabled : Automatically Do powerPlaces"},
    autoPowerPlacesIndexFilter: { elementText: "Index Filter", tooltip : "(values separated by ;)<br>Allow to set filter and order on the PowerPlaces to do (order respected only when multiple powerPlace expires at the same time)"},
    autoPowerPlacesAll: { elementText: "Do All", tooltip : "If enabled : ignore filter and do all powerplaces (will update Filter with current ids)"},
    autoChamps: { elementText: "AutoChampions", tooltip : "if enabled : Automatically do champions (if they are started and in filter only)"},
    autoChampsUseEne: { elementText: "UseEne", tooltip : "If enabled : use Energy to buy tickets"},
    autoChampsFilter: { elementText: "Filter", tooltip : "(values separated by ; 1 to 6)<br>Allow to set filter on champions to be fought"},
    autoStats: { elementText: "AutoStats", tooltip : "(Integer)<br>Automatically buy stats in market with money above the setted amount"},
    autoExpW: { elementText: "Buy Exp", tooltip : "if enabled : allow to buy Exp in market<br>Only buy if money bank is above the value<br>Only buy if total Exp owned is below value"},
    autoExp: { elementText: "Min money to keep", tooltip : "(Integer)<br>Minimum money to keep."},
    maxExp: { elementText: "Max Exp to buy", tooltip : "(Integer)<br>Maximum Exp to buy"},
    autoAffW: { elementText: "Buy Aff", tooltip : "if enabled : allow to buy Aff in market<br>Only buy if money bank is above the value<br>Only buy if total Aff owned is below value"},
    autoAff: { elementText: "Min money to keep", tooltip : "(Integer)<br>Minimum money to keep."},
    maxAff: { elementText: "Max Aff to buy", tooltip : "(Integer)<br>Maximum Aff to buy"},
    autoLGMW: { elementText: "Buy Leg Gear Mono", tooltip : "if enabled : allow to buy Mono Legendary gear in the market<br>Only buy if money bank is above the value"},
    autoLGM: { elementText: "Min money to keep", tooltip : "(Integer)<br>Minimum money to keep."},
    autoLGRW: { elementText: "Buy Leg Gear Rainbow", tooltip : "if enabled : allow to buy Rainbow Legendary gear in the market<br>Only buy if money bank is above the value"},
    autoLGR: { elementText: "Min money to keep", tooltip : "(Integer)<br>Minimum money to keep."},
    autoEGM: { elementText: "Buy Epi Gear Mono", tooltip : "if enabled : allow to buy Mono Epic gear in the market<br>Only buy if money bank is above the value"},
    OpponentListBuilding: { elementText: "Opponent list is building", tooltip : ""},
    OpponentParsed: { elementText: "opponents parsed", tooltip : ""},
    DebugMenu: { elementText: "Debug Menu", tooltip : "Options for debug"},
    DebugOptionsText: { elementText: "Buttons below allow to modify script storage, be careful using it.", tooltip : ""},
    DeleteTempVars: { elementText: "Delete temp storage", tooltip : "Delete all temporary storage for the script."},
    ResetAllVars: { elementText: "Reset defaults", tooltip : "Reset all setting to defaults."},
    DebugFileText: { elementText: "Click on button bellow to produce a debug log file", tooltip : ""},
    OptionCancel: { elementText: "Cancel", tooltip : ""},
    SeasonMaskRewards: { elementText: "Mask claimed rewards", tooltip : "Allow to mask all claimed rewards on Season screen"},
    autoClubChamp: { elementText: "AutoClubChamp", tooltip : "if enabled, automatically fight club champion if champion has already been fought once."},
    autoTrollMythicByPassParanoia: { elementText: "Mythic bypass Paranoia", tooltip : "Allow mythic to bypass paranoia.<br>if next wave is during rest, it will force it to wake up for wave.<br>If still fight or can buy fights it will continue."},
    buyMythicCombat: { elementText: "Buy comb. for mythic", tooltip : "Koban spending functions<br>If enabled : <br>Buying combat point during last X hours of mythic event (if not going under Koban bank value)"},
    buyMythicCombTimer: { elementText: "Hours to buy Mythic Comb", tooltip : "(Integer)<br>X last hours of mythic event"},
    DebugResetTimerText: { elementText: "Selector below allow you to reset ongoing timers", tooltip : ""},
    timerResetSelector: { elementText: "Select Timer", tooltip : "Select the timer you want to reset"},
    timerResetButton: { elementText: "Reset", tooltip : "Set the timer to 0."},
    timerLeftTime: { elementText: "", tooltip : "Time remaining"},
    timerResetNoTimer : { elementText: "No selected timer", tooltip : ""},
    menuSell : { elementText: "Sell", tooltip : "Allow to sell items."},
    menuSellText : { elementText: "This will sell the number of items asked starting in display order (first all non legendary then legendary)<br> It will sell all non legendary stuff and keep : <br> - 1 set of rainbow legendary (choosen on highest player class stat)<br> - 1 set of legendary mono player class (choosen on highest stats)<br> - 1 set of legendary harmony (choosen on highest stats)<br> - 1 set of legendary endurance (choosen on highest stats)<br>You can lock/Unlock batch by clicking on the corresponding cell/row/column (notlocked/total), red means all locked, orange some locked.", tooltip : ""},
    menuSellNumber : { elementText: "", tooltip : "Enter the number of items you want to sell : "},
    menuSellButton : { elementText: "Sell", tooltip : "Launch selling funtion."},
    menuSellCurrentCount : { elementText: "Number of sellable items you currently have : ", tooltip : ""},
    menuSellMaskLocked : { elementText: "Mask locked", tooltip : "Allow to mask locked items."},
    menuSoldText : { elementText: "Number of items sold : ", tooltip : ""},
    menuSoldMessageReachNB : { elementText: "Wanted sold items reached.", tooltip : ""},
    menuSoldMessageNoMore : { elementText: " No more sellable items.", tooltip : ""},
    menuAff : { elementText: "Give Aff", tooltip : "Automatically give Aff to selected girl."},
    menuAffButton : { elementText: "Go !", tooltip : "Launch giving aff."},
    menuDistribution : { elementText: "Items to be used : ", tooltip : ""},
    Total : { elementText: "Total : ", tooltip : ""},
    menuAffNoNeed : { elementText: "don't need Aff.", tooltip : ""},
    menuAffNoAff : { elementText: "No Aff available to be given to :", tooltip : ""},
    menuAffError : { elementText: "Error fetching girl Aff field, cancelling.", tooltip : ""},
    menuAffReadyToUpgrade : { elementText: " is ready for upgrade.", tooltip : ""},
    menuAffEnd : { elementText: "All Aff given to :", tooltip : ""},
    menuDistributed : { elementText: "Items used : ", tooltip : ""},
    autoClubChampMax : { elementText: "Max Ticket for club Champ : ", tooltip : "Maximum number of ticket to use on club champion each run."},
    menuSellLock : { elementText: "Lock/ Unlock", tooltip : "Switch the lock to prevent selected item to be sold."},
    Rarity : { elementText: "Rarity", tooltip : ""},
    RarityCommon : { elementText: "Common", tooltip : ""},
    RarityRare : { elementText: "Rare", tooltip : ""},
    RarityEpic : { elementText: "Epic", tooltip : ""},
    RarityLegendary : { elementText: "Legendary", tooltip : ""},
    equipementHead : { elementText: "Head", tooltip : ""},
    equipementBody : { elementText: "Body", tooltip : ""},
    equipementLegs : { elementText: "Legs", tooltip : ""},
    equipementFlag : { elementText: "Flag", tooltip : ""},
    equipementPet : { elementText: "Pet", tooltip : ""},
    equipementWeapon : { elementText: "Weapon", tooltip : ""},
    equipementCaracs : { elementText: "Caracs", tooltip : ""},
    equipementType : { elementText: "Type", tooltip : ""},
    autoMissionKFirst : { elementText: "Koban first", tooltip : "Start by missions rewarded with Kobans."},
    menuExp : { elementText: "Give Exp", tooltip : "Automatically give max Exp to selected girl."},
    menuExpButton : { elementText: "Go !", tooltip : "Launch giving exp."},
    menuExpNoNeed : { elementText: "don't need Exp.", tooltip : ""},
    menuExpNoExp : { elementText: "No Exp available to be given to :", tooltip : ""},
    menuExpError : { elementText: "Error fetching girl Exp field, cancelling.", tooltip : ""},
    menuExpEnd : { elementText: "All Exp given to :", tooltip : ""},
    menuExpLevel :  { elementText: "Enter target Exp level :", tooltip : "Target Exp level for girl"},
    PoAMaskRewards : { elementText: "PoA mask claimed", tooltip : "Masked claimed rewards for Path of Attraction."}
}


HHAuto_ToolTips.fr = {
    saveDebug: { elementText: "Save Debug", tooltip : "Produire un fichier journal de débogage."},
    gitHub: { elementText: "GitHub", tooltip : "Lien vers le projet GitHub."},
    saveConfig: { elementText: "Save Config", tooltip : "Permet de sauvegarder la configuration."},
    loadConfig: { elementText: "Load Config", tooltip : "Permet de charger la configuration."},
    master: { elementText: "Master switch", tooltip : "Bouton marche/arrêt pour le script complet"},
    settPerTab: { elementText: "Settings per tab", tooltip : "Autoriser le paramétrage dans cet onglet uniquement"},
    paranoia: { elementText: "Paranoia mode", tooltip : "Permet de simuler le sommeil, et l'utilisateur humain (à documenter davantage)"},
    paranoiaSpendsBefore: { elementText: "Spends points before", tooltip : "Dépensera des points pour les options (quête, troll, ligues et saison)<br> uniquement si elles sont activées<br>et dépense des points qui seraient supérieurs aux limites maximales<br> Ex : vous avez la puissance d'un troll à 17, mais en allant 4h45 en paranoïa,<br> cela voudrait dire avoir 17+10 points (arrondis à l'int supérieur), donc être au dessus du 20 max<br> il dépensera alors 8 points pour retomber à 19 fin de la paranoïa, empêchant de perdre des points."},
    spendKobans0: { elementText: "Questionable Shit", tooltip : "Premiers commutateurs de sécurité pour l'utilisation des kobans <br> Tous les 3 doivent être actifs pour les fonctions de dépense des kobans"},
    spendKobans1: { elementText: "Are you sure?", tooltip : "Deuxième interrupteur de sécurité pour l'utilisation des kobans <br> Doit être activé après le premier.<br> Tous les 3 doivent être actifs pour les fonctions de dépense des kobans"},
    spendKobans2: { elementText: "You\'ve been warned", tooltip : "Troisième interrupteur de sécurité pour l'utilisation des kobans <br> Doit être activé après le deuxième.<br> Tous les 3 doivent être actifs pour les fonctions de dépense des kobans"},
    kobanBank: { elementText: "Koban Bank", tooltip : "(nombre)<br>Koban minimum conservé lors de l'utilisation des fonctions de dépenses Koban"},
    buyCombat: { elementText: "Buy comb. in events", tooltip : "Fonctions de dépenses Koban<br>Si activées : <br>Achat du point de combat durant les X dernières heures de l'événement (si ne passe pas sous la valeur de la banque Koban)"},
    buyCombTimer: { elementText: "Hours to buy Comb", tooltip : "(nombre)<br>X dernières heures de l'événement"},
    autoBuyBoosters: { elementText: "Buy Leg. Boosters", tooltip : "Fonctions de dépenses de Koban<br>Permettre d'acheter un booster sur le marché (si pas en dessous de la valeur de la banque de Koban)"},
    autoBuyBoostersFilter: { elementText: "Filter", tooltip : "(valeurs séparées par ;)<br>Set quel booster acheter, l'ordre est respecté (B1:Ginseng B2:Jujubes B3:Chlorella B4:Cordyceps)"},
    autoSeasonPassReds: { elementText: "Pass 3 reds", tooltip : "Fonctions de dépense des kobans<br>Utiliser les kobans pour renouveler les adversaires de la saison si 3 rouges"},
    showCalculatePower: { elementText: "Show PowerCalc", tooltip : "Afficher l'indicateur de simulation de bataille pour Ligues, Bataille, Saisons "},
    calculatePowerLimits: { elementText: "Own limits (red;orange)", tooltip : "(rouge;orange)<br>Définissez vos propres limites de rouge et d'orange pour les opposants<br> -6000;0 veux dire<br> <-6000 est rouge, entre -6000 et 0 est orange et >=0 est vert"},
    showInfo: { elementText: "Show info", tooltip : "si activé : afficher des informations sur les valeurs du script et les prochaines exécutions"},
    autoSalaryCheckbox: { elementText: "AutoSal.", tooltip : "si activé :<br>Collecter les salaires toutes les X secondes"},
    autoSalaryTextbox: { elementText: "min wait", tooltip : "(nombre)<br>X secondes pour percevoir le salaire"},
    autoMissionCheckbox: { elementText: "AutoMission", tooltip : "si activé : Effectuer automatiquement des missions"},
    autoMissionCollect: { elementText: "Collect", tooltip : "si activé : collecte automatique des missions"},
    autoTrollCheckbox: { elementText: "AutoTrollBattle", tooltip : "si activé : sélection automatique du troll de combat"},
    autoTrollSelector: { elementText: "Troll selector", tooltip : "Sélectionnez le troll à combattre."},
    autoTrollThreshold: { elementText: "Threshold", tooltip : "Combat minimum de trolls à garder"},
    eventTrollOrder: { elementText: "Event Troll Order", tooltip : "Permet de sélectionner l'ordre dans lequel les trolls d'événements sont automatiquement combattus"},
    plusEvent: { elementText: "+Event", tooltip : "Si activé : ignorer le troll sélectionné lors de l'événement à l'événement de combat"},
    plusEventMythic: { elementText: "+Mythic Event", tooltip : "Permettre d'attraper les filles pour un événement mythique, ne devrait les faire jouer que lorsque des tessons sont disponibles"},
    eventMythicPrio: { elementText: "Priorize over Event Troll Order", tooltip : "fille d’évent mythique privilégiée par rapport à l'ordre des trolls de l'événement si des tessons sont disponibles"},
    autoTrollMythicByPassThreshold: { elementText: "Mythic bypass Threshold", tooltip : "Permettre au mythique de contourner le seuil des trolls"},
    autoArenaCheckbox: { elementText: "AutoArenaBattle", tooltip : "si activé : fait automatiquement l'Arène (déconseillé)"},
    autoSeasonCheckbox: { elementText: "AutoSeason", tooltip : "si activé : combat automatique dans les Saisons (Opposant choisi d'après PowerCalculation)"},
    autoSeasonCollect: { elementText: "Collect", tooltip : "si activé : collecte automatique les items de saisons ( si plusieurs à collecter, en collectera une par utilisation de baiser)"},
    autoSeasonThreshold: { elementText: "Threshold", tooltip : "Baiser minimum à conserver"},
    autoQuestCheckbox: { elementText: "AutoQuest", tooltip : "si activé : Fait automatiquement les quêtes"},
    autoQuestThreshold: { elementText: "Threshold", tooltip : "énergie de quête à conserver"},
    autoContestCheckbox: { elementText: "AutoContest", tooltip : "si activé : Récolter les récompenses de la compet terminé"},
    autoFreePachinko: { elementText: "AutoPachinko(Free)", tooltip : "si activé : collecte automatique les Pachinkos gratuits"},
    autoLeagues: { elementText: "AutoLeagues", tooltip : "si activé : Combattre automatiquement les Ligues"},
    autoLeaguesPowerCalc: { elementText: "UsePowerCalc", tooltip : "si activé : choisira l'adversaire en utilisant PowerCalc (la liste des adversaires expire toutes les 10 minutes et prend quelques minutes pour être construite)"},
    autoLeaguesCollect: { elementText: "Collect", tooltip : "Si activé : Collecte automatique les Ligues"},
    autoLeaguesSelector: { elementText: "Target League", tooltip : "Ligue à viser, à essayer de rétrograder, à rester ou à passer en ligue supérieure selon le choix"},
    autoLeaguesThreshold: { elementText: "Threshold", tooltip : "Combats de ligue minimum à maintenir"},
    autoPowerPlaces: { elementText: "AutoPowerPlaces", tooltip : "si activé : Fait automatiquement les lieux de pouvoir"},
    autoPowerPlacesIndexFilter: { elementText: "Index Filter", tooltip : "Permet de définir un filtre et un ordre sur les lieux de pouvoir à faire (ordre respecté uniquement lorsque plusieurs lieux de pouvoir expirent en même temps)"},
    autoPowerPlacesAll: { elementText: "Do All", tooltip : "Si activé : ignorer le filtre et fait toutes les lieux de pouvoir (mettra à jour le filtre avec les identifiants actuels)"},
    autoChamps: { elementText: "AutoChampions", tooltip : "si activé : fait automatiquement les champions (s'ils sont démarrés et en filtre uniquement)"},
    autoChampsUseEne: { elementText: "UseEne", tooltip : "Si activé : utiliser l'énergie pour acheter des billets de champion"},
    autoChampsFilter: { elementText: "Filter", tooltip : "Permet de filtrer les champions à combattre"},
    autoStats: { elementText: "AutoStats", tooltip : "Achète automatiquement des statistiques sur le marché avec de l'argent au-dessus du montant fixé"},
    autoExpW: { elementText: "Buy Exp", tooltip : "si activé : permet d'acheter de l'Exp sur le marché<br>Achète uniquement si la banque d'argent est supérieure à la valeur<br>Achète uniquement si le total des Exp détenues est inférieur à la valeur"},
    autoExp: { elementText: "Min money to keep", tooltip : "Argent minimum à conserver."},
    maxExp: { elementText: "Max Exp to buy", tooltip : "Exp maximum à acheter"},
    autoAffW: { elementText: "Buy Aff", tooltip : "si activé : permet d'acheter des Aff sur le marché<br>Acheter uniquement si la banque d'argent est supérieure à la valeur<br>Acheter uniquement si le total des Aff détenues est inférieur à la valeur"},
    autoAff: { elementText: "Min money to keep", tooltip : "Argent minimum à conserver."},
    maxAff: { elementText: "Max Aff to buy", tooltip : "Aff maximum à acheter"},
    autoLGMW: { elementText: "Buy Leg Gear Mono", tooltip : "si activé : permet d'acheter du matériel Mono Légendaire sur le marché <br>Achète uniquement si la banque d'argent est au-dessus de la valeur"},
    autoLGM: { elementText: "Min money to keep", tooltip : "Argent minimum à conserver."},
    autoLGRW: { elementText: "Buy Leg Gear Rainbow", tooltip : "si activé : permet d'acheter du matériel Rainbow Légendaire sur le marché<br>Achète uniquement si la banque d'argent est supérieure à la valeur"},
    autoLGR: { elementText: "Min money to keep", tooltip : "Argent minimum à conserver."},
    autoEGM: { elementText: "Buy Epi Gear Mono", tooltip : "si activé : permet d'acheter du matériel Mono Epique sur le marché<br>Acheter seulement si la banque d'argent est au-dessus de la valeur"},
    OpponentListBuilding: { elementText: "La liste des adversaires est en construction", tooltip : ""},
    OpponentParsed : { elementText: "adversaires parcourus", tooltip : ""},
    DebugMenu: { elementText: "Debug Menu", tooltip : "Options pour le debug"},
    DebugOptionsText: { elementText: "Les bouttons ci-dessous permette de modifier les variables du script, a utiliser avec parcimonie.", tooltip : ""},
    DeleteTempVars: { elementText: "Supprimer les variables temporaires", tooltip : "Supprime toutes les variables temporaire du script."},
    ResetAllVars: { elementText: "Back to defaults", tooltip : "Remettre tous les seetings par default"},
    DebugFileText: { elementText: "Cliquer sur le boutton ci-dessous pour produire une log de debug.", tooltip : ""},
    OptionCancel: { elementText: "Annuler", tooltip : ""},
    SeasonMaskRewards: { elementText: "Masquer Gains Saison reclamés", tooltip : "Permet de masquer les gains reclamés de la saison."}
}

HHAuto_ToolTips.de = {
    saveDebug: { elementText: "Save Debug", tooltip : "Erlaube das Erstellen einer Debug Log Datei."},
    gitHub: { elementText: "GitHub", tooltip : "Link zum GitHub Projekt."},
    saveConfig: { elementText: "Save Config", tooltip : "Erlaube die Einstellung zu speichern."},
    loadConfig: { elementText: "Load Config", tooltip : "Erlaube die Einstellung zu laden."},
    master: { elementText: "Master Schalter", tooltip : "An/Aus Schalter für das Skript"},
    settPerTab: { elementText: "Einstellung per Tab", tooltip : "Erlaube die Einstellungen nur für diesen Tab zu setzen."},
    paranoia: { elementText: "Paranoia Modus", tooltip : "Erlaube es Schlaf zu simulieren und einen menschlichen Nutzer (wird weiter dokumentiert)"},
    paranoiaSpendsBefore: { elementText: "Gib Punkte aus vor...", tooltip : "Wenn gewollt, werden Punkte für Optionen ausgegeben (Quest, Troll, Liga und Season)<br> nur wenn sie aktiviert sind<br>und gibt Punkt aus die über dem maximal Limit sind<br> z.B.: Du hast die Power für Troll von 17, gehst aber für 4h45 in den Paranoia Modus,<br> dass heißt 17+10 Punkte (aufgerundet), welches über dem Max von 20 wäre.<br> Es würden dann 9 Punkte ausgegeben, sodass du nur bei 19 Punkten bleibst bis zum Ende des Paranoia Modus um einen Verlust zu verhindern."},
    spendKobans0: { elementText: "Fragwürdige Scheiße", tooltip : "Erster Sicherheitsschalter für die Nutzung von Kobans.<br>Alle 3 müssen aktiviert sein und Kobans auszugeben."},
    spendKobans1: { elementText: "Biste sicher?", tooltip : "Zweiter Sicherheitsschalter für die Nutzung von Kobans.<br>Muss nach dem Ersten aktiviert werden.<br>Alle 3 müssen aktiviert sein und Kobans auszugeben."},
    spendKobans2: { elementText: "Du wurdest gewarnt!", tooltip : "Dritter Sicherheitsschalter für die Nutzung von Kobans <br>Muss nach dem Zweiten aktiviert werden.<br> Alle 3 müssen aktiviert sein und Kobans auszugeben."},
    kobanBank: { elementText: "Koban Bank", tooltip : "(Integer)<br>Minimale Anzahl an Kobans die behalten werden sollen."},
    buyCombat: { elementText: "Kaufe Kobans bei Events", tooltip : "'Kobans ausgeben Funktion'<br> Wenn aktiviert: <br> Kauft Kampfpunkte in den letzten X Stunden eines Events (Wenn es das Minimum nicht unterschreitet)"},
    buyCombTimer: { elementText: "Stunden bis Kauf", tooltip : "(Ganze pos. Zahl)<br>X verbleibende Stunden des Events"},
    autoBuyBoosters: { elementText: "Kaufe Booster", tooltip : "'Koban ausgeben Funktion'<br>Erlaubt es Booster im Markt zu kaufen(Wenn es das Minimum nicht unterschreitet)"},
    autoBuyBoostersFilter: { elementText: "Filter", tooltip : "(Werte getrennt durch ;)<br>Gib an welches Booster gekauft werden sollen, Reihenfolge wird beachtet (B1:Ginseng B2:Jujubes B3:Chlorella B4:Cordyceps)"},
    autoSeasonPassReds: { elementText: "Überspringe drei Rote", tooltip : "'Koban ausgeben Funktion'<br>Benutze Kobans um Season Gegner zu tauschen wenn alle drei Rote sind"},
    showCalculatePower: { elementText: "Zeige Kraftrechner", tooltip : "Zeige Kampfsimulationsindikator an für Liga, Kampf und Season"},
    calculatePowerLimits: { elementText: "Eigene Grenzen (rot;gelb)", tooltip : "(rot;gelb)<br>Definiere deine eigenen Grenzen für rote und orange Gegner<br> -6000;0 meint<br> <-6000 ist rot, zwischen -6000 und 0 ist orange und >=0 ist grün"},
    showInfo: { elementText: "Zeige Info", tooltip : "Wenn aktiv : zeige Information auf Skriptwerten und nächsten Durchläufen"},
    autoSalaryCheckbox: { elementText: "Auto Einkommen", tooltip : "Wenn aktiv :<br>Sammelt das gesamte Einkommen alle X Sek."},
    autoSalaryTextbox: { elementText: "min Warten", tooltip : "(Ganze pos. Zahl)<br>X Sek bis zum Sammeln des Einkommens"},
    autoMissionCheckbox: { elementText: "AutoMission", tooltip : "Wenn aktiv : Macht automatisch Missionen"},
    autoMissionCollect: { elementText: "Einsammeln", tooltip : "Wenn aktiv : Sammelt automatisch Missionsgewinne"},
    autoTrollCheckbox: { elementText: "AutoTrollKampf", tooltip : "Wenn aktiv : Macht automatisch aktivierte Trollkämpfe"},
    autoTrollSelector: { elementText: "Troll Wähler", tooltip : "Wähle Trolle die bekämpfte werden sollen."},
    autoTrollThreshold: { elementText: "Schwellwert", tooltip : "Minimum an Trollpunkten die aufgehoben werden"},
    eventTrollOrder: { elementText: "Event Troll Reihenfolge", tooltip : "Erlaubt eine Auswahl in welcher Reihenfolge die Trolle automatisch bekämpft werden"},
    plusEvent: { elementText: "+Event", tooltip : "Wenn aktiv : Ignoriere ausgewählte Trolle währende eines Events, zugunsten des Events"},
    plusEventMythic: { elementText: "+Mythisches Event", tooltip : "Erlaubt es Mädels beim mystischen Event abzugreifen, sollte sie nur versuchen wenn auch Teile vorhanden sind"},
    eventMythicPrio: { elementText: "Priorisiere über Event Troll Reihenfolge", tooltip : "Mystische Event Mädels werden über die Event Troll Reihenfolge gestellt, sofern Teile erhältlich sind"},
    autoTrollMythicByPassThreshold: { elementText: "Mystische über Schwellenwert", tooltip : "Erlaubt es Punkt über den Schwellwert für das mystische Events zu nutzen"},
    autoTrollMythicByPassParanoia: { elementText: "Mythisch über Paranoia", tooltip : "Wenn aktiv: Erlaubt es den Paranoia Modus zu übergehen. Wenn du noch kämpfen kannst oder dir Energie kaufen kannst, wird gekämpft. Sollte die nächste Welle an Splittern während der Ruhephase sein, wird der Modus unterbrochen und es wird gekämpft"},
    autoArenaCheckbox: { elementText: "AutoArenaKampf", tooltip : "if enabled : Automatically do Arena (deprecated)"},
    autoSeasonCheckbox: { elementText: "AutoSeason", tooltip : "Wenn aktiv : Kämpft automatisch in der Season (Gegner werden wie im Kraftrechner einstellt gewählt)"},
    autoSeasonCollect: { elementText: "Einsammeln", tooltip : "Wenn aktiv : Sammelt automatisch Seasongewinne ein (bei mehr als einem, wird eines pro Küssnutzung eingesammelt)"},
    autoSeasonThreshold: { elementText: "Schwellwert", tooltip : "Minimum Küsse die behalten bleiben"},
    autoQuestCheckbox: { elementText: "AutoQuest", tooltip : "Wenn aktiv : Macht automatisch Quests"},
    autoQuestThreshold: { elementText: "Schwellwert", tooltip : "Minimum an Energie die behalten bleibt"},
    autoContestCheckbox: { elementText: "AutoAufgabe", tooltip : "Wenn aktiv : Sammelt abgeschlossene Aufgabenbelohnungen ein"},
    autoFreePachinko: { elementText: "AutoPachinko(Gratis)", tooltip : "Wenn aktiv : Sammelt freien Glücksspielgewinn ein"},
    autoLeagues: { elementText: "AutoLiga", tooltip : "Wenn aktiv : Kämpft automatisch in der Liga"},
    autoLeaguesPowerCalc: { elementText: "Nutze Kraftrechner", tooltip : "Wenn aktiv : wählt Gegner durch Kraftrechner (Gegnerliste verfällt alle 10 Min und braucht ein Minuten zur Erneuerung)"},
    autoLeaguesCollect: { elementText: "Einsammeln", tooltip : "Wenn aktiv : Sammelt automatisch Ligagewinn ein"},
    autoLeaguesSelector: { elementText: "Ligaziel", tooltip : "Ligaziel, versuche abzusteigen, Platz zu halten oder aufzusteigen"},
    autoLeaguesThreshold: { elementText: "Schwellwert", tooltip : "Minimum an Ligakämpfe behalten"},
    autoPowerPlaces: { elementText: "Auto Orte der Macht", tooltip : "Wenn aktiv : macht automatisch Orte der Macht"},
    autoPowerPlacesIndexFilter: { elementText: "Index Filter", tooltip : "Erlaubt es Filter zusetzen für Orte der Macht und eine Reihenfolge festzulegen (Reihenfolge wird beachtet, sollten mehrere zur gleichen Zeit fertig werden)"},
    autoPowerPlacesAll: { elementText: "Mach alle", tooltip : "Wenn aktiv : ignoriere Filter und mache alle (aktualisiert den Filter mit korrekten IDs)"},
    autoChamps: { elementText: "AutoChampions", tooltip : "Wenn aktiv : Macht automatisch Championkämpfe (nur wenn sie gestartet wurden und im Filter stehen)"},
    autoChampsUseEne: { elementText: "Nutze Energie", tooltip : "Wenn aktiv : Nutze Energie und kaufe Champ. Tickets"},
    autoChampsFilter: { elementText: "Filter", tooltip : "Erlaubt es Filter für zu bekämpfende Champions zu setzen"},
    autoClubChamp: { elementText: "AutoChampions", tooltip : "Wenn aktiv : Macht automatisch ClubChampionkämpfe (nur wenn sie gestartet wurden und im Filter stehen)"},
    autoStats: { elementText: "AutoStats", tooltip : "Kauft automatisch bessere Statuswerte im Markt mit überschüssigem Geld oberhalb des gesetzten Wertes"},
    autoExpW: { elementText: "Kaufe Erfahrung", tooltip : "Wenn aktiv : Erlaube Erfahrung im Markt zu kaufen<br>Kauft nur wenn dein Geld über dem Wert liegt<br>Kauft nur wenn sich im Besitz befinden potentielle Erfahrung unter dem Wert liegt"},
    autoExp: { elementText: "Min Geld verbleib", tooltip : "Minimum an Geld das behalten wird."},
    maxExp: { elementText: "Max ErfahrKauf", tooltip : "Maximum Erfahrung die gekauft wird"},
    autoAffW: { elementText: "KaufAnziehung", tooltip : "Wenn aktiv : Erlaube Anziehung im Markt zu kaufen<br>Kauft nur wenn dein Geld über dem Wert liegt<br>Kauft nur wenn sich im Besitz befinden potentielle Anziehung unter dem Wert liegt"},
    autoAff: { elementText: "Min Geld verbleib", tooltip : "Minimum an Geld das behalten wird."},
    maxAff: { elementText: "Max AnziehungKauf", tooltip : "Maximum an Anziehung die gekauft wird"},
    autoLGMW: { elementText: "Buy Leg Gear Mono", tooltip : "Wenn aktiv : Erlaube es Mono legendäre Rüstung im Markt zu kaufen<br>Kauft nur wenn dein Geld über dem Wert liegt"},
    autoLGM: { elementText: "Min Geld verbleib", tooltip : "Minimum an Geld das behalten wird."},
    autoLGRW: { elementText: "Buy Leg Gear Rainbow", tooltip : "Wenn aktiv : Erlaube es Regenbogenausrüstung im Markt zu kaufen<br>Kauft nur wenn dein Geld über dem Wert liegt"},
    autoLGR: { elementText: "Min Geld verbleib", tooltip : "Minimum an Geld das behalten wird."},
    autoEGM: { elementText: "Buy Epi Gear Mono", tooltip : "Wenn aktiv : Erlaube es Mono epische Ausrüstung im Markt zu kaufen<br>Kauft nur wenn dein Geld über dem Wert liegt"},
    OpponentListBuilding: { elementText: "Gegnerliste wird erstellt", tooltip : ""},
    OpponentParsed : { elementText: "Gegner analysiert", tooltip : ""}
}


HHAuto_ToolTips.es = {
    saveDebug: { elementText: "Salvar Debug", tooltip : "Permite generar un fichero log de depuración."},
    gitHub: { elementText: "GitHub", tooltip : "Link al proyecto GitHub."},
    saveConfig: { elementText: "Salvar config.", tooltip : "Permite salvar la configuración."},
    loadConfig: { elementText: "Cargar config", tooltip : "Permite cargar la configuración."},
    master: { elementText: "Switch maestro", tooltip : "Interruptor de Encendido/Apagado para el script completo"},
    settPerTab: { elementText: "Configuración por ventana", tooltip : "Aplica las opciones sólo a esta ventana"},
    paranoia: { elementText: "Modo Paranoia", tooltip : "Permite simular sueño, y un usuario humano (Pendiente de documentación)"},
    paranoiaSpendsBefore: { elementText: "Gasta puntos antes", tooltip : "\'On\' gastará puntos para opciones (aventura, villanos, ligas y temporada) sólo si éstos están habilitados y gasta puntos que estarían por encima de los límites máximos.<br>Ej : Tienes energia para 17 combates de villanos, pero estarás 4h45m en paranoia.<br> Esto es tener 17+10 combates (redondeado al entero superior), estando así por encima del máximo de 20<br> gastará 8 combates para quedar con 19 al final de la Paranoia, evitando perder puntos."},
    spendKobans0: { elementText: "Porquería cuestionable", tooltip : "Primer interruptor de seguridad para el uso de kobans <br> Los 3 tienen que estar activados para las funciones de gasto de Kobans"},
    spendKobans1: { elementText: "¿Estás seguro?", tooltip : "Segundo interruptor de seguridad para el uso de kobans <br>Tiene que ser activado después del primero.<br> Los 3 tienen que estar activados para las funciones de gasto de Kobans"},
    spendKobans2: { elementText: "Has sido advertido", tooltip : "Tercer interruptor de seguridad para el uso de kobans <br>Tiene que ser activado después del segundo.<br> Los 3 tienen que estar activados para las funciones de gasto de Kobans"},
    kobanBank: { elementText: "Banco de Kobans", tooltip : "(Entero)<br>Minimo de Kobans a conservar cuando se usan funciones de gasto de Kobans"},
    buyCombat: { elementText: "Compra comb. en eventos", tooltip : "Funciones de gasto de Kobans<br>Si habilitado: <br>Compra puntos de combate durante las últimas X horas del evento (si no se baja del valor de Banco de Kobans)"},
    buyCombTimer: { elementText: "Horas para comprar Comb", tooltip : "(Entero)<br>X últimas horas del evento"},
    autoBuyBoosters: { elementText: "Compra Potenciad. Leg.", tooltip : "Funciones de gasto de Kobans<br>Permite comprar potenciadores en el mercado (si no se baja del valor de Banco de Kobans)"},
    autoBuyBoostersFilter: { elementText: "Filtro", tooltip : "(valores separados por ;)<br>Selecciona que potenciador comprar, se respeta el orden (B1:Ginseng B2:Azufaifo B3:Clorela B4:Cordyceps)"},
    autoSeasonPassReds: { elementText: "Pasa 3 rojos", tooltip : "Funciones de gasto de Kobans<br>Usa kobans para renovar oponentes si los 3 rojos"},
    showCalculatePower: { elementText: "Mostar PowerCalc", tooltip : "Muestra simulador de batalla para Liga, batallas, Temporadas "},
    calculatePowerLimits: { elementText: "Límites propios (rojo;naranja)", tooltip : "(rojo;naranja)<br>Define tus propios límites rojos y naranjas para los oponentes<br> -6000;0 significa<br> <-6000 is rojo, entre -6000 and 0 is naranja and >=0 is verde"},
    showInfo: { elementText: "Muestra info", tooltip : "Si habilitado: muestra información de los valores del script y siguientes ejecuciones"},
    autoSalaryCheckbox: { elementText: "AutoSal.", tooltip : "(Entero)<br>Si habilitado:<br>Recauda salario cada X segundos"},
    autoSalaryTextbox: { elementText: "min espera", tooltip : "(Entero)<br>X segundos para recaudar salario"},
    autoMissionCheckbox: { elementText: "AutoMision", tooltip : "Si habilitado: Juega misiones de manera automática"},
    autoMissionCollect: { elementText: "Recaudar", tooltip : "Si habilitado: Recauda misiones de manera automática"},
    autoTrollCheckbox: { elementText: "AutoVillano", tooltip : "Si habilitado: Combate villano seleccionado de manera automática"},
    autoTrollSelector: { elementText: "Selector villano", tooltip : "Selecciona villano para luchar."},
    autoTrollThreshold: { elementText: "Límite", tooltip : "(Entero 0 a 19)<br>Mínimo combates a guardar"},
    eventTrollOrder: { elementText: "Orden combate villano", tooltip : "(Valores separados por ;)<br>Permite seleccionar el orden de combate automático de los villanos"},
    plusEvent: { elementText: "+Evento", tooltip : "Si habilitado: ignora al villano seleccionado durante un evento para luchar el evento"},
    plusEventMythic: { elementText: "+Evento Mythic", tooltip : "Habilita obtener chicas del evento mítico, solo debería jugar cuando haya fragmentos disponibles"},
    eventMythicPrio: { elementText: "Prioriza sobre el orden de evento de villano", tooltip : "La chica del evento mítico es prioritaria sobre el orden del evento de villanos si hay fragmentos disponibles"},
    autoTrollMythicByPassThreshold: { elementText: "Mítico supera límite", tooltip : "Permite que el evento mítico supere el límite de villano"},
    autoArenaCheckbox: { elementText: "AutoBatallaArena", tooltip : "Si habilitado: Combate en Arena de manera automática (obsoleta)"},
    autoSeasonCheckbox: { elementText: "AutoTemporada", tooltip : "Si habilitado: Combate en emporadas de manera automática (Oponente elegido según Calculadora de energía)"},
    autoSeasonCollect: { elementText: "Recaudar", tooltip : "Se habilitado: Recauda temporadas de manera automática (Si multiples para recaudar, recaudará uno por cada uso de beso)"},
    autoSeasonThreshold: { elementText: "Límite", tooltip : "Mínimos besos a conservar"},
    autoQuestCheckbox: { elementText: "AutoAventura", tooltip : "Si habilitado : Juega aventura de manera automática"},
    autoQuestThreshold: { elementText: "Límite", tooltip : "(Entero entre 0 y 99)<br>Minima energía a conservar"},
    autoContestCheckbox: { elementText: "AutoCompetición", tooltip : "Si habilitado: Recauda recompensas de competición finalizada"},
    autoFreePachinko: { elementText: "AutoPachinko(Gratis)", tooltip : "Si habilitado: Recauda pachinkos gratuitos de manera automática"},
    autoLeagues: { elementText: "AutoLigas", tooltip : "Si habilitado: Combate en ligas de manera automática"},
    autoLeaguesPowerCalc: { elementText: "UsarCalcPotencia", tooltip : "Si habilitado: Elige oponentes usando calculadora de potencia (La lista expira cada 10 mins. y tarda pocos minutos en reconstruirse)"},
    autoLeaguesCollect: { elementText: "Recaudar", tooltip : "Si habilitado: Recauda premios de ligas de manera automática"},
    autoLeaguesSelector: { elementText: "Liga objetivo", tooltip : "Liga objetivo, para intentar descender, permanecer o ascender a otra liga en función de ello"},
    autoLeaguesThreshold: { elementText: "Límite", tooltip : "Mínimos combates de liga a conservar"},
    autoPowerPlaces: { elementText: "AutoLugaresPoder", tooltip : "Si habilitado: Juega Lugares de Poder de manera automática"},
    autoPowerPlacesIndexFilter: { elementText: "Filtro de índice", tooltip : "Permite establecer un filto y un orden para jugar Lugares de Poder (el orden solo se respeta cuando multiples Lugares de Poder finalizan al mismo tiempo)"},
    autoPowerPlacesAll: { elementText: "Juega todos", tooltip : "Si habilitado: ignora el filtro y juega todos los Lugares de Poder (actualizará del Filtro con las actuales ids)"},
    autoChamps: { elementText: "AutoCampeones", tooltip : "Si habilitado: Combate a campeones de manera automática (Sólo si han empezado un combate y están en el filtro)"},
    autoChampsUseEne: { elementText: "UsaEne", tooltip : "Si habilitado: Usa energía para comprar tickets"},
    autoChampsFilter: { elementText: "Filtro", tooltip : "Permite establecer un filtro para luchar con campeones"},
    autoStats: { elementText: "AutoEquip", tooltip : "(Entero)<br>Compra equipamiento de manera automática en el mercado con dinero por encima de la cantidad establecida"},
    autoExpW: { elementText: "Compra exp", tooltip : "Si habilitado: Compra experiencia en el mercado<br>Solo si el dinero en el banco es superior a este valor<br>Solo compra si el total de experiencia poseída está por debajo de este valor"},
    autoExp: { elementText: "Min dinero", tooltip : "(Entero)<br>Mínimo dinero a guardar."},
    maxExp: { elementText: "Max experiencia", tooltip : "(Entero)<br>Máxima experiencia a comprar"},
    autoAffW: { elementText: "Compra afec", tooltip : "Si habilitado: Compra afecto en el mercado<br>Solo si el dinero en el banco es superior a este valor<br>Solo compra si el total de afecto poseído está por debajo de este valor"},
    autoAff: { elementText: "Min dinero", tooltip : "(Entero)<br>Mínimo dinero a guardar"},
    maxAff: { elementText: "Max afecto", tooltip : "(Entero)<br>Máximo afecto a comprar"},
    autoLGMW: { elementText: "Compra Eqip.Leg.Mono", tooltip : "Si habilitado: Compra equipamiento legendario mono en el mercado<br>Solo compra si el banco de dinero es superior a este valor"},
    autoLGM: { elementText: "Min dinero", tooltip : "(Entero)<br>Mínimo dinero a guardar"},
    autoLGRW: { elementText: "Compra Eqip.Leg.Arcoiris", tooltip : "Si habilitado: Compra equipamiento legendario arcoiris en el mercado<br>Solo compra si el banco de dinero es superior a este valor"},
    autoLGR: { elementText: "Min dinero", tooltip : "(Entero)<br>Mínimo dinero a guardar"},
    autoEGM: { elementText: "Compra Equip.Epi.Mono", tooltip : "Si habilitado: Compra equipamiento épico mono en el mercado<br>Solo compra si el banco de dinero es superior a este valor"},
    OpponentListBuilding: { elementText: "Lista de oponentes en construcción", tooltip : ""},
    OpponentParsed : { elementText: "opositores analizados", tooltip : ""},
    DebugMenu: { elementText: "Menú depur.", tooltip : "Opciones de depuración"},
    DebugOptionsText: { elementText: "Los botones a continuación permiten modificar el almacenamiento del script, tenga cuidado al usarlos.", tooltip : ""},
    DeleteTempVars: { elementText: "Borra almacenamiento temp.", tooltip : "Borra todo el almacenamiento temporal del script."},
    ResetAllVars: { elementText: "Restaura por defecto", tooltip : "Restaura la configuración por defecto."},
    DebugFileText: { elementText: "Click en el siguiente botón para generar un fichero log de depuración", tooltip : ""},
    OptionCancel: { elementText: "Cancelar", tooltip : ""},
    SeasonMaskRewards: { elementText: "Enmascara recompensas", tooltip : "Permite enmascarar todas las recompensas reclamadas en la pantalla de Temporada"},
    autoClubChamp: { elementText: "AutoClubCamp", tooltip : "Si habilitado: Combate al campeón del club de manera automática"},
    autoTrollMythicByPassParanoia: { elementText: "Mítico ignora paranoia", tooltip : "Permite al mítico ignorar paranoia. Si la siguiente liberación es durante el descanso forzará despertarse para jugar. Si todavía pelea o puede comprar peleas, continuará."},
    buyMythicCombat: { elementText: "Compra comb. para mítico", tooltip : "Función de gasto de Kobans<br>Si habilitado: <br>Comprar puntos de combate durante las últimas X horas del evento mítico (si no se baja del valor de Banco de Kobans)"},
    buyMythicCombTimer: { elementText: "Horas para comprar comb.Mítico", tooltip : "(Entero)<br>X últimas horas del evento mítico"},
    DebugResetTimerText: { elementText: "El selector a continuación permite restablecer los temporizadores", tooltip : ""},
    timerResetSelector: { elementText: "Seleccionar temporizador", tooltip : "Selecciona el temporizador a restablecer"},
    timerResetButton: { elementText: "Restablecer", tooltip : "Establece el temporizador a 0."},
    timerLeftTime: { elementText: "", tooltip : "Tiempo restante"},
    timerResetNoTimer : { elementText: "No hay temporizador seleccionado", tooltip : ""}
}




var HHAuto_Lang = 'en';

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

var Trollz=["Latest","Dark Lord","Ninja Spy","Gruntt","Edwarda","Donatien","Silvanus","Bremen","Finalmecia","Roko Senseï","Karole","Jackson\'s Crew","Pandora witch","Nike"];
var Leagues=["Wanker I","Wanker II","Wanker III","Sexpert I","Sexpert II","Sexpert III","Dicktator I","Dicktator II","Dicktator III"];
var Timers={};
var HHVars=["Storage().HHAuto_Setting_autoAff",
            "Storage().HHAuto_Setting_autoAffW",
            "Storage().HHAuto_Setting_autoArenaBattle",
            "Storage().HHAuto_Setting_autoBuyBoosters",
            "Storage().HHAuto_Setting_autoBuyBoostersFilter",
            "Storage().HHAuto_Setting_autoClubChamp",
            "Storage().HHAuto_Setting_autoChamps",
            "Storage().HHAuto_Setting_autoChampsFilter",
            "Storage().HHAuto_Setting_autoChampsUseEne",
            "Storage().HHAuto_Setting_autoContest",
            "Storage().HHAuto_Setting_autoEGM",
            "Storage().HHAuto_Setting_autoEGMW",
            "Storage().HHAuto_Setting_autoExp",
            "Storage().HHAuto_Setting_autoExpW",
            "Storage().HHAuto_Setting_autoFreePachinko",
            "Storage().HHAuto_Setting_autoLeagues",
            "Storage().HHAuto_Setting_autoLeaguesCollect",
            "Storage().HHAuto_Setting_autoLeaguesMaxRank",
            "Storage().HHAuto_Setting_autoLeaguesPowerCalc",
            "Storage().HHAuto_Setting_autoLeaguesSelectedIndex",
            "Storage().HHAuto_Setting_autoLeaguesThreshold",
            "Storage().HHAuto_Setting_autoLGM",
            "Storage().HHAuto_Setting_autoLGMW",
            "Storage().HHAuto_Setting_autoLGR",
            "Storage().HHAuto_Setting_autoLGRW",
            "Storage().HHAuto_Setting_autoMission",
            "Storage().HHAuto_Setting_autoMissionC",
            "Storage().HHAuto_Setting_autoPowerPlaces",
            "Storage().HHAuto_Setting_autoPowerPlacesAll",
            "Storage().HHAuto_Setting_autoPowerPlacesIndexFilter",
            "Storage().HHAuto_Setting_autoQuest",
            "Storage().HHAuto_Setting_autoQuestThreshold",
            "Storage().HHAuto_Setting_autoSalary",
            "Storage().HHAuto_Setting_autoSalaryTimer",
            "Storage().HHAuto_Setting_autoSeason",
            "Storage().HHAuto_Setting_autoSeasonCollect",
            "Storage().HHAuto_Setting_autoSeasonPassReds",
            "Storage().HHAuto_Setting_autoSeasonThreshold",
            "Storage().HHAuto_Setting_autoStats",
            "Storage().HHAuto_Setting_autoTrollBattle",
            "Storage().HHAuto_Setting_autoTrollMythicByPassThreshold",
            "Storage().HHAuto_Setting_autoTrollMythicByPassParanoia",
            "Storage().HHAuto_Setting_autoTrollSelectedIndex",
            "Storage().HHAuto_Setting_autoTrollThreshold",
            "Storage().HHAuto_Setting_buyCombat",
            "Storage().HHAuto_Setting_buyCombTimer",
            "Storage().HHAuto_Setting_buyMythicCombat",
            "Storage().HHAuto_Setting_buyMythicCombTimer",
            "Storage().HHAuto_Setting_calculatePowerLimits",
            "Storage().HHAuto_Setting_eventMythicPrio",
            "Storage().HHAuto_Setting_eventTrollOrder",
            "Storage().HHAuto_Setting_kobanBank",
            "Storage().HHAuto_Setting_master",
            "Storage().HHAuto_Setting_MaxAff",
            "Storage().HHAuto_Setting_MaxExp",
            "Storage().HHAuto_Setting_paranoia",
            "Storage().HHAuto_Setting_paranoiaSpendsBefore",
            "Storage().HHAuto_Setting_plusEvent",
            "Storage().HHAuto_Setting_plusEventMythic",
            "localStorage.HHAuto_Setting_settPerTab",
            "Storage().HHAuto_Setting_showCalculatePower",
            "Storage().HHAuto_Setting_showInfo",
            "Storage().HHAuto_Setting_spendKobans0",
            "Storage().HHAuto_Setting_spendKobans1",
            "Storage().HHAuto_Setting_spendKobans2",
            "Storage().HHAuto_Setting_SeasonMaskRewards",
            "Storage().HHAuto_Temp_trollToFight",
            "sessionStorage.HHAuto_Temp_autoLoop",
            "Storage().HHAuto_Temp_autoLoopTimeMili",
            "Storage().HHAuto_Temp_autoTrollBattleSaveQuest",
            "sessionStorage.HHAuto_Temp_battlePowerRequired",
            "sessionStorage.HHAuto_Temp_burst",
            "sessionStorage.HHAuto_Temp_charLevel",
            "sessionStorage.HHAuto_Temp_eventsGirlz",
            "sessionStorage.HHAuto_Temp_eventTroll",
            "sessionStorage.HHAuto_Temp_eventTrollIsMythic",
            "sessionStorage.HHAuto_Temp_fought",
            "Storage().HHAuto_Temp_freshStart",
            "sessionStorage.HHAuto_Temp_haveAff",
            "sessionStorage.HHAuto_Temp_haveExp",
            "sessionStorage.HHAuto_Temp_LeagueOpponentList",
            "Storage().HHAuto_Temp_leaguesTarget",
            "sessionStorage.HHAuto_Temp_opponentsListExpirationDate",
            "Storage().HHAuto_Temp_paranoiaLeagueBlocked",
            "Storage().HHAuto_Temp_paranoiaQuestBlocked",
            "Storage().HHAuto_Temp_paranoiaSettings",
            "Storage().HHAuto_Temp_paranoiaSpendings",
            "sessionStorage.HHAuto_Temp_pinfo",
            "Storage().HHAuto_Temp_PopToStart",
            "Storage().HHAuto_Temp_PopUnableToStart",
            "sessionStorage.HHAuto_Temp_questRequirement",
            "localStorage.HHAuto_Temp_showCalculatePower",
            "localStorage.HHAuto_Temp_showInfo",
            "sessionStorage.HHAuto_Temp_storeContents",
            "sessionStorage.HHAuto_Temp_Timers",
            "Storage().HHAuto_Temp_NextSwitch",
            "Storage().HHAuto_Temp_Totalpops",
            "sessionStorage.HHAuto_Temp_userLink",
            "localStorage.HHAuto_Temp_MigratedVars",
            "sessionStorage.HHAuto_Temp_LeagueTempOpponentList",
            "sessionStorage.HHAuto_Temp_CheckSpentPoints",
            "Storage().HHAuto_Setting_autoClubChampMax",
            "Storage().HHAuto_Setting_autoMissionKFirst",
            "Storage().HHAuto_Setting_PoAMaskRewards"];
var updateData = function () {
    //logHHAuto("updating UI");
    if ($('#LoadDialog[open]').length > 0) {return}
    var leaguesOptions = document.getElementById("autoLeaguesSelector");
    Storage().HHAuto_Setting_autoLeaguesSelectedIndex = leaguesOptions.selectedIndex;
    Storage().HHAuto_Temp_leaguesTarget = Number(leaguesOptions.value)+1;

    var trollOptions = document.getElementById("autoTrollSelector");
    Storage().HHAuto_Setting_autoTrollSelectedIndex = trollOptions.selectedIndex;
    Storage().HHAuto_Temp_trollToFight = trollOptions.value;
    Storage().HHAuto_Setting_plusEvent = document.getElementById("plusEvent").checked;
    Storage().HHAuto_Setting_autoSalary = document.getElementById("autoSalaryCheckbox").checked;
    Storage().HHAuto_Setting_autoSalaryTimer = document.getElementById("autoSalaryTextbox").value;
    Storage().HHAuto_Setting_autoContest = document.getElementById("autoContestCheckbox").checked;
    Storage().HHAuto_Setting_autoMission = document.getElementById("autoMissionCheckbox").checked;
    Storage().HHAuto_Setting_autoMissionKFirst = document.getElementById("autoMissionKFirst").checked;
    Storage().HHAuto_Setting_autoPowerPlaces = document.getElementById("autoPowerPlaces").checked;

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
    Storage().HHAuto_Setting_autoSalaryTimer = document.getElementById("autoSalaryTextbox").value;
    Storage().HHAuto_Setting_autoMissionC = document.getElementById("autoMissionCollect").checked;
    Storage().HHAuto_Setting_autoQuest = document.getElementById("autoQuestCheckbox").checked;
    Storage().HHAuto_Setting_autoTrollBattle = document.getElementById("autoTrollCheckbox").checked;
    Storage().HHAuto_Setting_eventTrollOrder = document.getElementById("eventTrollOrder").value;

    Storage().HHAuto_Setting_plusEventMythic = document.getElementById("plusEventMythic").checked;
    Storage().HHAuto_Setting_eventMythicPrio = document.getElementById("eventMythicPrio").checked;
    Storage().HHAuto_Setting_autoTrollMythicByPassThreshold = document.getElementById("autoTrollMythicByPassThreshold").checked ;
    Storage().HHAuto_Setting_autoTrollMythicByPassParanoia = document.getElementById("autoTrollMythicByPassParanoia").checked ;

    Storage().HHAuto_Setting_buyCombTimer = document.getElementById("buyCombTimer").value;
    Storage().HHAuto_Setting_buyMythicCombTimer = document.getElementById("buyMythicCombTimer").value;
    //Storage().HHAuto_Setting_autoArenaBattle = document.getElementById("autoArenaCheckbox").checked;
    Storage().HHAuto_Setting_autoSeason = document.getElementById("autoSeasonCheckbox").checked;
    Storage().HHAuto_Setting_autoSeasonCollect = document.getElementById("autoSeasonCollect").checked;
    Storage().HHAuto_Setting_SeasonMaskRewards = document.getElementById("SeasonMaskRewards").checked;

    Storage().HHAuto_Setting_autoLeagues = document.getElementById("autoLeagues").checked;
    Storage().HHAuto_Setting_autoLeaguesCollect = document.getElementById("autoLeaguesCollect").checked;
    Storage().HHAuto_Setting_autoLeaguesPowerCalc = document.getElementById("autoLeaguesPowerCalc").checked;
    //Storage().HHAuto_Setting_autoLeaguesMaxRank = document.getElementById("autoLeaguesMaxRank").value;
    Storage().HHAuto_Setting_autoStats = document.getElementById("autoStats").value;
    Storage().HHAuto_Setting_paranoia = document.getElementById("paranoia").checked;
    Storage().HHAuto_Setting_paranoiaSpendsBefore = document.getElementById("paranoiaSpendsBefore").checked;
    Storage().HHAuto_Setting_autoFreePachinko = document.getElementById("autoFreePachinko").checked;
    Storage().HHAuto_Setting_autoExp = document.getElementById("autoExp").value;
    Storage().HHAuto_Setting_autoExpW = document.getElementById("autoExpW").checked;
    Storage().HHAuto_Setting_MaxExp = document.getElementById("maxExp").value;
    Storage().HHAuto_Setting_autoAff = document.getElementById("autoAff").value;
    Storage().HHAuto_Setting_autoAffW = document.getElementById("autoAffW").checked;
    Storage().HHAuto_Setting_MaxAff = document.getElementById("maxAff").value;
    Storage().HHAuto_Setting_autoLGM = document.getElementById("autoLGM").value;
    Storage().HHAuto_Setting_autoLGMW = document.getElementById("autoLGMW").checked;
    Storage().HHAuto_Setting_autoLGR = document.getElementById("autoLGR").value;
    Storage().HHAuto_Setting_autoLGRW = document.getElementById("autoLGRW").checked;
    //Storage().HHAuto_Setting_autoEGM = document.getElementById("autoEGM").value;
    //Storage().HHAuto_Setting_autoEGMW = document.getElementById("autoEGMW").checked;
    Storage().HHAuto_Setting_autoBuyBoosters = document.getElementById("autoBuyBoosters").checked;
    Storage().HHAuto_Setting_autoBuyBoostersFilter = document.getElementById("autoBuyBoostersFilter").value;

    if (localStorage.HHAuto_Setting_settPerTab === "true")
    {
        if ( localStorage.HHAuto_Temp_showInfo !== undefined)
        {
            logHHAuto("force set showInfo : "+localStorage.HHAuto_Temp_showInfo);
            Storage().HHAuto_Setting_showInfo = localStorage.HHAuto_Temp_showInfo;
            document.getElementById("showInfo").checked = Storage().HHAuto_Setting_showInfo=="true";
            setTimeout(function() {
                localStorage.removeItem('HHAuto_Temp_showInfo');
                logHHAuto("removed showInfo");
            }, 1000);
        }
        else
        {
            newValue = String(document.getElementById("showInfo").checked);
            if (Storage().HHAuto_Setting_showInfo !== newValue)
            {
                logHHAuto("setting showInfo :"+newValue);
                Storage().HHAuto_Setting_showInfo = document.getElementById("showInfo").checked;
                localStorage.HHAuto_Temp_showInfo = Storage().HHAuto_Setting_showInfo;
            }
        }


        if ( localStorage.HHAuto_Temp_showCalculatePower !== undefined )
        {
            logHHAuto("force set showCalculatePower : "+localStorage.HHAuto_Temp_showCalculatePower);
            Storage().HHAuto_Setting_showCalculatePower = localStorage.HHAuto_Temp_showCalculatePower;
            document.getElementById("showCalculatePower").checked = Storage().HHAuto_Setting_showCalculatePower=="true";
            setTimeout(function() {
                localStorage.removeItem('HHAuto_Temp_showCalculatePower');
                logHHAuto("removed showCalculatePower");
            }, 1000);
        }
        else
        {
            newValue = String(document.getElementById("showCalculatePower").checked);
            if (Storage().HHAuto_Setting_showCalculatePower !== newValue)
            {
                logHHAuto("setting showCalculatePower :"+newValue);
                Storage().HHAuto_Setting_showCalculatePower = document.getElementById("showCalculatePower").checked;
                localStorage.HHAuto_Temp_showCalculatePower = Storage().HHAuto_Setting_showCalculatePower;
            }
        }

    }
    else
    {
        Storage().HHAuto_Setting_showCalculatePower = document.getElementById("showCalculatePower").checked;
        Storage().HHAuto_Setting_showInfo = document.getElementById("showInfo").checked;

    }

    Storage().HHAuto_Setting_calculatePowerLimits = document.getElementById("calculatePowerLimits").value;
    Storage().HHAuto_Setting_autoChamps = document.getElementById("autoChamps").checked;
    Storage().HHAuto_Setting_autoClubChamp = document.getElementById("autoClubChamp").checked;
    Storage().HHAuto_Setting_autoClubChampMax = document.getElementById("autoClubChampMax").value;
    Storage().HHAuto_Setting_autoChampsUseEne = document.getElementById("autoChampsUseEne").checked;
    Storage().HHAuto_Setting_autoChampsFilter = document.getElementById("autoChampsFilter").value;

    Storage().HHAuto_Setting_spendKobans0 = document.getElementById("spendKobans0").checked;
    Storage().HHAuto_Setting_spendKobans1 = document.getElementById("spendKobans1").checked && Storage().HHAuto_Setting_spendKobans0=="true";
    document.getElementById("spendKobans1").checked=Storage().HHAuto_Setting_spendKobans1=="true";
    Storage().HHAuto_Setting_spendKobans2 = document.getElementById("spendKobans2").checked && Storage().HHAuto_Setting_spendKobans1=="true" && Storage().HHAuto_Setting_spendKobans0=="true";
    document.getElementById("spendKobans2").checked=Storage().HHAuto_Setting_spendKobans2=="true";

    Storage().HHAuto_Setting_autoTrollThreshold = document.getElementById("autoTrollThreshold").value;
    Storage().HHAuto_Setting_autoQuestThreshold = document.getElementById("autoQuestThreshold").value;
    Storage().HHAuto_Setting_autoLeaguesThreshold = document.getElementById("autoLeaguesThreshold").value;
    Storage().HHAuto_Setting_autoSeasonThreshold = document.getElementById("autoSeasonThreshold").value;

    Storage().HHAuto_Setting_buyCombat=document.getElementById("buyCombat").checked && Storage().HHAuto_Setting_spendKobans2=="true" && Storage().HHAuto_Setting_spendKobans1=="true" && Storage().HHAuto_Setting_spendKobans0=="true";
    document.getElementById("buyCombat").checked=Storage().HHAuto_Setting_buyCombat=="true";
    Storage().HHAuto_Setting_buyMythicCombat=document.getElementById("buyMythicCombat").checked && Storage().HHAuto_Setting_spendKobans2=="true" && Storage().HHAuto_Setting_spendKobans1=="true" && Storage().HHAuto_Setting_spendKobans0=="true";
    document.getElementById("buyMythicCombat").checked=Storage().HHAuto_Setting_buyMythicCombat=="true";
    Storage().HHAuto_Setting_autoBuyBoosters=document.getElementById("autoBuyBoosters").checked && Storage().HHAuto_Setting_spendKobans2=="true" && Storage().HHAuto_Setting_spendKobans1=="true" && Storage().HHAuto_Setting_spendKobans0=="true";
    document.getElementById("autoBuyBoosters").checked=Storage().HHAuto_Setting_autoBuyBoosters=="true";
    Storage().HHAuto_Setting_autoSeasonPassReds=document.getElementById("autoSeasonPassReds").checked && Storage().HHAuto_Setting_spendKobans2=="true" && Storage().HHAuto_Setting_spendKobans1=="true" && Storage().HHAuto_Setting_spendKobans0=="true";
    document.getElementById("autoSeasonPassReds").checked=Storage().HHAuto_Setting_autoSeasonPassReds=="true";
    Storage().HHAuto_Setting_kobanBank=document.getElementById("kobanBank").value;

    Storage().HHAuto_Setting_PoAMaskRewards = document.getElementById("PoAMaskRewards").checked;


    localStorage.HHAuto_Setting_settPerTab = document.getElementById("settPerTab").checked;

    Storage().HHAuto_Setting_master=document.getElementById("master").checked;

    document.querySelectorAll("div#sMenu input[pattern]").forEach(currentInput =>
                                                                  {
        currentInput.checkValidity();
    });

    if (Storage().HHAuto_Setting_showInfo=="true")
    {
        var Tegzd='';
        Tegzd+='Master: '+(Storage().HHAuto_Setting_master==="true"?"ON":"OFF");
        if (Storage().HHAuto_Setting_paranoia=="true")
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+sessionStorage.HHAuto_Temp_pinfo+': '+getTimeLeft('paranoiaSwitch');
        }
        if (Storage().HHAuto_Setting_autoSalary=="true")
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'Salary check: '+getTimeLeft('nextSalaryTime');
        }
        /*
        if (Storage().HHAuto_Setting_autoArenaBattle=="true")
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'Arena fight: '+getTimeLeft('nextArenaTime');
        }
        */
        if (Storage().HHAuto_Setting_autoSeason=="true")
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'Season: '+getSetHeroInfos('kiss.amount')+'/'+getSetHeroInfos('kiss.max_amount')+' ('+getTimeLeft('nextSeasonTime')+')';
        }
        if (Storage().HHAuto_Setting_autoLeagues=="true")
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'League fight: '+getSetHeroInfos('challenge.amount')+'/'+getSetHeroInfos('challenge.max_amount')+' ('+getTimeLeft('nextLeaguesTime')+')';
        }
        if (Storage().HHAuto_Setting_autoChamps=="true")
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'Champions check: '+getTimeLeft('nextChampionTime');
        }
        if (Storage().HHAuto_Setting_autoClubChamp=="true")
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'Club Champions check: '+getTimeLeft('nextClubChampionTime');
        }
        // if (autoBuy())
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'Shop update: '+getTimeLeft('nextShopTime');
        }
        if (Storage().HHAuto_Setting_autoMission=="true")
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'Mission: '+getTimeLeft('nextMissionTime');
        }
        if (Storage().HHAuto_Setting_autoContest=="true")
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'Contest: '+getTimeLeft('nextContestTime');
        }
        if (Storage().HHAuto_Setting_autoPowerPlaces=="true")
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'PowerPlaces'+': '+getTimeLeft('minPowerPlacesTime');
        }
        if (Storage().HHAuto_Setting_autoFreePachinko=="true")
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'Great Pachinko: '+getTimeLeft('nextPachinkoTime');
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'Mythic Pachinko: '+getTimeLeft('nextPachinko2Time');
        }
        if (!checkTimer('eventMythicNextWave'))
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'Mythic girl next: '+getTimeLeft('eventMythicNextWave');
        }
        Tegzd+=(Tegzd.length>0?'\r\n':'')+'haveAff: '+sessionStorage.HHAuto_Temp_haveAff;
        Tegzd+=(Tegzd.length>0?'\r\n':'')+'haveExp: '+sessionStorage.HHAuto_Temp_haveExp;
        if (Tegzd.length>0)
        {
            document.getElementById('pInfo').style.display='block';
            document.getElementById('pInfo').textContent=Tegzd;
        }
        else
        {
            document.getElementById('pInfo').style.display='none';
        }
    }
    else
    {
        document.getElementById('pInfo').style.display='none';
    }
};

var setDefaults = function () {
    logHHAuto("Setting Defaults.");
    Storage().HHAuto_Setting_autoSalary = "false";
    Storage().HHAuto_Setting_autoSalaryTimer = "120";
    Storage().HHAuto_Setting_autoContest = "false";
    Storage().HHAuto_Setting_autoMission = "false";
    Storage().HHAuto_Setting_autoPowerPlaces = "false";
    Storage().HHAuto_Setting_autoPowerPlacesAll = "false";
    Storage().HHAuto_Setting_autoPowerPlacesIndexFilter = "1;2;3";
    Storage().HHAuto_Setting_autoMissionC = "false";
    Storage().HHAuto_Setting_autoMissionKFirst = "false";
    Storage().HHAuto_Setting_autoLeagues = "false";
    Storage().HHAuto_Setting_autoLeaguesCollect = "false";
    Storage().HHAuto_Setting_autoLeaguesPowerCalc = "false";
    //Storage().HHAuto_Setting_autoLeaguesMaxRank = "0";
    Storage().HHAuto_Temp_leaguesTarget = "9";
    Storage().HHAuto_Setting_autoStats = "500000000";
    sessionStorage.HHAuto_Temp_autoLoop = "true";
    sessionStorage.HHAuto_Temp_userLink = "none";
    Storage().HHAuto_Temp_autoLoopTimeMili = "500";
    Storage().HHAuto_Setting_autoQuest = "false";
    Storage().HHAuto_Setting_autoTrollBattle = "false";
    Storage().HHAuto_Setting_plusEvent = "false";
    Storage().HHAuto_Setting_plusEventMythic = "false";
    Storage().HHAuto_Setting_eventMythicPrio = "false";
    Storage().HHAuto_Setting_autoTrollMythicByPassThreshold = "false";
    Storage().HHAuto_Setting_autoTrollMythicByPassParanoia = "false";
    Storage().HHAuto_Setting_eventTrollOrder="";
    Storage().HHAuto_Setting_buyCombTimer="16";
    Storage().HHAuto_Setting_buyMythicCombTimer="16";
    //Storage().HHAuto_Setting_autoArenaBattle = "false";
    Storage().HHAuto_Setting_autoSeason = "false";
    Storage().HHAuto_Setting_autoSeasonCollect = "false";
    Storage().HHAuto_Setting_SeasonMaskRewards = "false";
    sessionStorage.HHAuto_Temp_battlePowerRequired = "0";
    sessionStorage.HHAuto_Temp_questRequirement = "none";
    Storage().HHAuto_Temp_freshStart = "no";
    Storage().HHAuto_Setting_autoChamps="false";
    Storage().HHAuto_Setting_autoClubChamp="false";
    Storage().HHAuto_Setting_autoClubChampMax = "999";
    Storage().HHAuto_Setting_autoChampsUseEne="false";
    Storage().HHAuto_Setting_autoChampsFilter="1;2;3;4;5;6";
    Storage().HHAuto_Setting_autoFreePachinko = "false";
    Storage().HHAuto_Setting_autoExp = "500000000";
    Storage().HHAuto_Setting_autoExpW = "false";
    Storage().HHAuto_Setting_MaxExp = "10000";
    Storage().HHAuto_Setting_autoAff = "500000000";
    Storage().HHAuto_Setting_autoAffW = "false";
    Storage().HHAuto_Setting_MaxAff = "50000";
    Storage().HHAuto_Setting_autoLGM = "500000000";
    Storage().HHAuto_Setting_autoLGMW = "false";
    Storage().HHAuto_Setting_autoLGR = "500000000";
    Storage().HHAuto_Setting_autoLGRW = "false";
    //Storage().HHAuto_Setting_autoEGM = "500000000";
    //Storage().HHAuto_Setting_autoEGMW = "false";
    Storage().HHAuto_Setting_autoBuyBoostersFilter = "B1;B2;B3;B4";
    Storage().HHAuto_Setting_autoBuyBoosters = "false";
    Storage().HHAuto_Setting_paranoia="true";
    Storage().HHAuto_Setting_paranoiaSpendsBefore="false";

    Storage().HHAuto_Setting_calculatePowerLimits = "default";
    Storage().HHAuto_Setting_autoTrollThreshold="0";
    Storage().HHAuto_Setting_autoQuestThreshold="0";
    Storage().HHAuto_Setting_autoLeaguesThreshold="0";
    Storage().HHAuto_Setting_autoSeasonThreshold="0";

    Storage().HHAuto_Setting_spendKobans0="false";
    Storage().HHAuto_Setting_autoSeasonPassReds ="false";
    Storage().HHAuto_Temp_paranoiaSettings="140-320/Sleep:28800-30400|Active:250-460|Casual:1500-2700/6:Sleep|8:Casual|10:Active|12:Casual|14:Active|18:Casual|20:Active|22:Casual|24:Sleep";
    Storage().HHAuto_Setting_master="false";
    Storage().HHAuto_Setting_PoAMaskRewards = "false";
};





var start = function () {

    if (unsafeWindow.Hero===undefined)
    {
        logHHAuto('???no Hero???');
        $('.hh_logo').click();
        return;
    }
    $('.redirect.gayharem').hide();

    $('#starter_offer').hide();
    $('#starter_offer_background').hide();
    migrateHHVars();
    if (sessionStorage.HHAuto_Temp_Timers)
    {
        Timers=JSON.parse(sessionStorage.HHAuto_Temp_Timers);
    }

    // Add UI buttons.
    var UIcontainer = $("#contains_all nav div[rel='content']");
    UIcontainer.html( '<div style="font-size:x-small;position: absolute;right: 22%;width: inherit;text-align: center;display:flex;flex-direction:column;z-index:1000" id="sMenu">'
                     //dialog Box
                     + '<dialog id="LoadDialog"> <form method="dialog"><p>After you select the file the settings will be automatically updated.</p><p> If nothing happened, then the selected file contains errors.</p><p id="LoadConfError"style="color:#f53939;"></p><p><label><input type="file" id="myfile" name="myfile"> </label></p> <menu> <button value="cancel">'+getTextForUI("OptionCancel","elementText")+'</button></menu> </form></dialog>'
                     + '<dialog id="DebugDialog"><form method="dialog">'
                     +   '<div style="padding:10px; display:flex;flex-direction:column;">'
                     +    '<p>HHAuto : v'+GM_info.script.version+'</p>'
                     +    '<p>'+getTextForUI("DebugFileText","elementText")+'</p>'
                     +    '<div style="display:flex;flex-direction:row;">'
                     +     '<div class="tooltip"><span class="tooltiptext">'+getTextForUI("saveDebug","tooltip")+'</span><label class="myButton" id="saveDebug">'+getTextForUI("saveDebug","elementText")+'</label></div>'
                     +    '</div>'
                     +    '<p>'+getTextForUI("DebugResetTimerText","elementText")+'</p>'
                     +    '<div style="display:flex;flex-direction:row;">'
                     +     '<div style="padding-right:30px;"class="tooltip"><span class="tooltiptext">'+getTextForUI("timerResetButton","tooltip")+'</span><label class="myButton" id="timerResetButton">'+getTextForUI("timerResetButton","elementText")+'</label></div>'
                     +     '<div style="padding-right:10px;" class="tooltip"><span class="tooltiptext">'+getTextForUI("timerResetSelector","tooltip")+'</span><select id="timerResetSelector"></select></div>'
                     +     '<div class="tooltip"><span class="tooltiptext">'+getTextForUI("timerLeftTime","tooltip")+'</span><span id="timerLeftTime">'+getTextForUI("timerResetNoTimer","elementText")+'</span></div>'
                     +    '</div>'
                     +    '<p>'+getTextForUI("DebugOptionsText","elementText")+'</p>'
                     +    '<div style="display:flex;flex-direction:row;">'
                     +     '<div style="padding-right:30px;" class="tooltip"><span class="tooltiptext">'+getTextForUI("DeleteTempVars","tooltip")+'</span><label class="myButton" id="DeleteTempVars">'+getTextForUI("DeleteTempVars","elementText")+'</label></div>'
                     +     '<div class="tooltip"><span class="tooltiptext">'+getTextForUI("ResetAllVars","tooltip")+'</span><label class="myButton" id="ResetAllVars">'+getTextForUI("ResetAllVars","elementText")+'</label></div>'
                     +    '</div>'
                     +  '</div>'
                     + '<menu> <button value="cancel">'+getTextForUI("OptionCancel","elementText")+'</button></menu></form></dialog>'
                     + '<div style="display:flex;flex-direction:row;">'
                     +  '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +   '<div style="padding-bottom:2px;padding-top:2px; display:flex;flex-direction:row;">'
                     +    '<div style="padding-right:30px;" class="tooltip"><span class="tooltiptext">'+getTextForUI("gitHub","tooltip")+'</span><label class="myButton" id="git">'+getTextForUI("gitHub","elementText")+'</label></div>'
                     +    '<div class="tooltip"><span class="tooltiptext">'+getTextForUI("DebugMenu","tooltip")+'</span><label class="myButton" id="DebugMenu">'+getTextForUI("DebugMenu","elementText")+'</label></div>'
                     +   '</div>'
                     +   '<div style="padding-bottom:2px;display:flex;flex-direction:row;">'
                     +    '<div style="padding-right:20px;" class="tooltip"><span class="tooltiptext">'+getTextForUI("saveConfig","tooltip")+'</span><label class="myButton" id="saveConfig">'+getTextForUI("saveConfig","elementText")+'</label></div>'
                     +    '<div class="tooltip"><span class="tooltiptext">'+getTextForUI("loadConfig","tooltip")+'</span><label class="myButton" id="loadConfig">'+getTextForUI("loadConfig","elementText")+'</label></div>'
                     +   '</div>'
                     +   '<div style="display:flex;flex-direction:row; border: 1px dotted;">'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("master","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("master","tooltip")+'</span><label class="switch" ><input id="master" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding-left:10px;padding-right:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("settPerTab","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("settPerTab","tooltip")+'</span><label class="switch"><input id="settPerTab" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +   '</div>'
                     // Region Paranoia
                     +   '<div style="display:flex;flex-direction:column; border: 1px dotted;">'
                     +    '<div style="display:flex;flex-direction:row;">'
                     +     '<div style="display:flex;flex-direction:column;">'
                     +      '<span>'+getTextForUI("paranoia","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("paranoia","tooltip")+'</span><label class="switch"><input id="paranoia" type="checkbox"><span class="slider round"></span></label></div>'
                     +     '</div>'
                     +     '<div style="padding-left:10px;display:flex;flex-direction:column;">'
                     +      '<span>'+getTextForUI("paranoiaSpendsBefore","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("paranoiaSpendsBefore","tooltip")+'</span><label class="switch"><input id="paranoiaSpendsBefore" type="checkbox"><span class="slider round"></span></label></div>'
                     +     '</div>'
                     +    '</div>'
                     +   '</div>'
                     //end region paranoia
                     // Region Shit
                     +   '<div style="display:flex;flex-direction:column; border: 1px dotted;">'
                     +   '<div style="display:flex;flex-direction:row;">'
                     +    '<div style="display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("spendKobans0","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("spendKobans0","tooltip")+'</span><label  class="switch"><input id="spendKobans0" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding-left:20px;display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("spendKobans1","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("spendKobans1","tooltip")+'</span><label  class="switch"><input id="spendKobans1" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +   '</div>'
                     +   '<div style="display:flex;flex-direction:row;">'
                     +    '<div style="display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("spendKobans2","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("spendKobans2","tooltip")+'</span><label  class="switch"><input id="spendKobans2" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +    '<div style="display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("kobanBank","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("kobanBank","tooltip")+'</span><input id="kobanBank" style="width:70%" required pattern="'+HHAuto_inputPattern.kobanBank+'" type="text"></div>'
                     +    '</div>'
                     +   '</div>'
                     +   '<div style="display:flex;flex-direction:row;">'
                     +    '<div style="display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("buyCombat","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("buyCombat","tooltip")+'</span><label class="switch"><input id="buyCombat" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +    '<div style="display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("buyCombTimer","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("buyCombTimer","tooltip")+'</span><input id="buyCombTimer" style="width:50%" required pattern="'+HHAuto_inputPattern.buyCombTimer+'" type="text"></div>'
                     +    '</div>'
                     +   '</div>'
                     +   '<div style="display:flex;flex-direction:row;">'
                     +    '<div style="display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("buyMythicCombat","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("buyMythicCombat","tooltip")+'</span><label class="switch"><input id="buyMythicCombat" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +    '<div style="display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("buyMythicCombTimer","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("buyMythicCombTimer","tooltip")+'</span><input id="buyMythicCombTimer" style="width:50%" required pattern="'+HHAuto_inputPattern.buyMythicCombTimer+'" type="text"></div>'
                     +    '</div>'
                     +   '</div>'
                     +   '<div style="display:flex;flex-direction:row;">'
                     +    '<div style="display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoBuyBoosters","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoBuyBoosters","tooltip")+'</span><label class="switch"><input id="autoBuyBoosters" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +    '<div style="display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoBuyBoostersFilter","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoBuyBoostersFilter","tooltip")+'</span><input style="width:70px" id="autoBuyBoostersFilter" required pattern="'+HHAuto_inputPattern.autoBuyBoostersFilter+'" type="text"></div>'
                     +    '</div>'
                     +    '<div style="display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoSeasonPassReds","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoSeasonPassReds","tooltip")+'</span><label  class="switch"><input id="autoSeasonPassReds" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +   '</div>'
                     +  '</div>'
                     // End Region Shit
                     // calculate Power Region
                     +  '<div style="display:flex;flex-direction:row; border: 1px dotted;">'
                     +   '<div style="display:flex;flex-direction:column;">'
                     +    '<span>'+getTextForUI("showCalculatePower","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("showCalculatePower","tooltip")+'</span><label class="switch"><input id="showCalculatePower" type="checkbox"><span class="slider round"></span></label></div>'
                     +   '</div>'
                     +   '<div style="padding-left:10px;display:flex;flex-direction:column;">'
                     +    '<span>'+getTextForUI("calculatePowerLimits","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("calculatePowerLimits","tooltip")+'</span><input id="calculatePowerLimits" style="width:80%" required pattern="'+HHAuto_inputPattern.calculatePowerLimits+'" type="text"></div>'
                     +   '</div>'
                     +  '</div>'
                     // End Calculate power region
                     +   '<span>'+getTextForUI("showInfo","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("showInfo","tooltip")+'</span><label class="switch"><input id="showInfo" type="checkbox"><span class="slider round"></span></label></div>'
                     +  '</div>'
                     +  '<div style="padding:10px; display:flex;flex-direction:column;">'
                     // Region AutoSalary
                     +   '<div style="display:flex;flex-direction:row; border: 1px dotted;">'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoSalaryCheckbox","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoSalaryCheckbox","tooltip")+'</span><label class="switch"><input id="autoSalaryCheckbox" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoSalaryTextbox","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoSalaryTextbox","tooltip")+'</span><input id="autoSalaryTextbox" style="width:80%" required pattern="'+HHAuto_inputPattern.autoSalaryTextbox+'" type="text"></div>'
                     +    '</div>'
                     //End Region AutoSalary
                     +   '</div>'
                     //Region AutoMission
                     +   '<div style="display:flex;flex-direction:row; border: 1px dotted;">'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoMissionCheckbox","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoMissionCheckbox","tooltip")+'</span><label class="switch"><input id="autoMissionCheckbox" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoMissionCollect","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoMissionCollect","tooltip")+'</span><label class="switch"><input id="autoMissionCollect" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoMissionKFirst","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoMissionKFirst","tooltip")+'</span><label class="switch"><input id="autoMissionKFirst" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +   '</div>'
                     //End Region AutoMission
                     // Region AutoTroll
                     +   '<div style="display:flex;flex-direction:column; border: 1px dotted;">'
                     +    '<div style="display:flex;flex-direction:row;">'
                     +     '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +      '<span>'+getTextForUI("autoTrollCheckbox","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoTrollCheckbox","tooltip")+'</span><label class="switch"><input id="autoTrollCheckbox" type="checkbox"><span class="slider round"></span></label></div>'
                     +     '</div>'
                     +     '<div style="padding-left:10px;display:flex;flex-direction:column;">'
                     +      '<span>'+getTextForUI("autoTrollSelector","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoTrollSelector","tooltip")+'</span><select id="autoTrollSelector"></select></div>'
                     +     '</div>'
                     +     '<div style="padding-left:10px;display:flex;flex-direction:column;">'
                     +      '<span>'+getTextForUI("autoTrollThreshold","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoTrollThreshold","tooltip")+'</span><input style="width:50px" id="autoTrollThreshold" required pattern="'+HHAuto_inputPattern.autoTrollThreshold+'" type="text"></div>'
                     +     '</div>'
                     +    '</div>'
                     +    '<div style="display:flex;flex-direction:row;">'
                     +     '<div style="padding-left:10px;display:flex;flex-direction:column;">'
                     +      '<span>'+getTextForUI("eventTrollOrder","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("eventTrollOrder","tooltip")+'</span><input id="eventTrollOrder" style="width:150px" required pattern="'+HHAuto_inputPattern.eventTrollOrder+'"type="text"></div>'
                     +     '</div>'
                     +     '<div style="padding-left:10px;display:flex;flex-direction:column;">'
                     +      '<span>'+getTextForUI("plusEvent","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("plusEvent","tooltip")+'</span><label class="switch"><input id="plusEvent" type="checkbox"><span class="slider round"></span></label></div>'
                     +     '</div>'
                     +    '</div>'
                     +    '<div style="display:flex;flex-direction:row;">'
                     +     '<div style="padding-left:10px;display:flex;flex-direction:column;">'
                     +      '<span>'+getTextForUI("plusEventMythic","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("plusEventMythic","tooltip")+'</span><label class="switch"><input id="plusEventMythic" type="checkbox"><span class="slider round"></span></label></div>'
                     +     '</div>'
                     +     '<div style="padding-left:10px;display:flex;flex-direction:column;">'
                     +      '<span>'+getTextForUI("eventMythicPrio","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("eventMythicPrio","tooltip")+'</span><label class="switch"><input id="eventMythicPrio" type="checkbox"><span class="slider round"></span></label></div>'
                     +     '</div>'
                     +     '<div style="padding-left:10px;display:flex;flex-direction:column;">'
                     +      '<span>'+getTextForUI("autoTrollMythicByPassThreshold","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoTrollMythicByPassThreshold","tooltip")+'</span><label class="switch"><input id="autoTrollMythicByPassThreshold" type="checkbox"><span class="slider round"></span></label></div>'
                     +     '</div>'
                     +     '<div style="padding-left:10px;display:flex;flex-direction:column;">'
                     +      '<span>'+getTextForUI("autoTrollMythicByPassParanoia","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoTrollMythicByPassParanoia","tooltip")+'</span><label class="switch"><input id="autoTrollMythicByPassParanoia" type="checkbox"><span class="slider round"></span></label></div>'
                     +     '</div>'
                     +    '</div>'
                     +   '</div>'
                     // End Region AutoTroll
                     //+   '<span>'+getTextForUI("autoArenaCheckbox","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoArenaCheckbox","tooltip")+'</span><label class="switch"><input id="autoArenaCheckbox" type="checkbox"><span class="slider round"></span></label></div>'
                     // Region AutoSeason
                     +   '<div style="display:flex;flex-direction:row; border: 1px dotted;">'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoSeasonCheckbox","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoSeasonCheckbox","tooltip")+'</span><label class="switch"><input id="autoSeasonCheckbox" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoSeasonCollect","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoSeasonCollect","tooltip")+'</span><label class="switch"><input id="autoSeasonCollect" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoSeasonThreshold","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoSeasonThreshold","tooltip")+'</span><input style="width:50px" id="autoSeasonThreshold" required pattern="'+HHAuto_inputPattern.autoSeasonThreshold+'" type="text"></div>'
                     +    '</div>'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("SeasonMaskRewards","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("SeasonMaskRewards","tooltip")+'</span><label class="switch"><input id="SeasonMaskRewards" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +   '</div>'
                     // End Region AutoSeason
                     // Region quest
                     +   '<div style="display:flex;flex-direction:row; border: 1px dotted;">'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoQuestCheckbox","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoQuestCheckbox","tooltip")+'</span><label class="switch"><input id="autoQuestCheckbox" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoQuestThreshold","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoQuestThreshold","tooltip")+'</span><input style="width:50px" id="autoQuestThreshold" required pattern="'+HHAuto_inputPattern.autoQuestThreshold+'" type="text"></div>'
                     +    '</div>'
                     +   '</div>'
                     //end region quest
                     +   '<span>'+getTextForUI("autoContestCheckbox","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoContestCheckbox","tooltip")+'</span><label class="switch"><input id="autoContestCheckbox" type="checkbox"><span class="slider round"></span></label></div>'
                     +   '<span>'+getTextForUI("autoFreePachinko","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoFreePachinko","tooltip")+'</span><label class="switch"><input id="autoFreePachinko" type="checkbox"><span class="slider round"></span></label></div>'
                     +   '<span>'+getTextForUI("PoAMaskRewards","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("PoAMaskRewards","tooltip")+'</span><label class="switch"><input id="PoAMaskRewards" type="checkbox"><span class="slider round"></span></label></div>'
                     +  '</div>'
                     +  '<div style="padding:10px; display:flex;flex-direction:column;">'
                     // Region AutoLeagues
                     +   '<div style="display:flex;flex-direction:column; border: 1px dotted;">'
                     +    '<div style="padding:0px; display:flex;flex-direction:row;">'
                     +     '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +      '<span>'+getTextForUI("autoLeagues","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoLeagues","tooltip")+'</span><label class="switch"><input id="autoLeagues" type="checkbox"><span class="slider round"></span></label></div>'
                     +     '</div>'
                     +     '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +      '<span>'+getTextForUI("autoLeaguesPowerCalc","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoLeaguesPowerCalc","tooltip")+'</span><label class="switch"><input id="autoLeaguesPowerCalc" type="checkbox"><span class="slider round"></span></label></div>'
                     +     '</div>'
                     +     '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +      '<span>'+getTextForUI("autoLeaguesCollect","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoLeaguesCollect","tooltip")+'</span><label class="switch"><input id="autoLeaguesCollect" type="checkbox"><span class="slider round"></span></label></div>'
                     +     '</div>'
                     +    '</div>'
                     +    '<div style="padding:0px; display:flex;flex-direction:row;">'
                     +     '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +      '<span>'+getTextForUI("autoLeaguesSelector","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoLeaguesSelector","tooltip")+'</span><select id="autoLeaguesSelector"></select></div>'
                     +     '</div>'
                     +     '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +      '<span>'+getTextForUI("autoLeaguesThreshold","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoLeaguesThreshold","tooltip")+'</span><input style="width:50px" id="autoLeaguesThreshold" required pattern="'+HHAuto_inputPattern.autoLeaguesThreshold+'"type="text"></div>'
                     +     '</div>'
                     +    '</div>'
                     +   '</div>'
                     // End Region AutoLeagues
                     // Region PowerPlace
                     +   '<div style="display:flex;flex-direction:row; border: 1px dotted;">'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoPowerPlaces","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoPowerPlaces","tooltip")+'</span><label class="switch"><input id="autoPowerPlaces" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoPowerPlacesIndexFilter","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoPowerPlacesIndexFilter","tooltip")+'</span><input id="autoPowerPlacesIndexFilter" required pattern="'+HHAuto_inputPattern.autoPowerPlacesIndexFilter+'" type="text"></div>'
                     +    '</div>'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoPowerPlacesAll","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoPowerPlacesAll","tooltip")+'</span><label class="switch"><input id="autoPowerPlacesAll" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +   '</div>'
                     // End Region PowerPlace
                     // Region AutoChampions
                     +   '<div style="display:flex;flex-direction:row; border: 1px dotted;">'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoChamps","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoChamps","tooltip")+'</span><label class="switch"><input id="autoChamps" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoChampsUseEne","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoChampsUseEne","tooltip")+'</span><label class="switch"><input id="autoChampsUseEne" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoChampsFilter","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoChampsFilter","tooltip")+'</span><input style="width:70px" id="autoChampsFilter" required pattern="'+HHAuto_inputPattern.autoChampsFilter+'" type="text"></div>'
                     +    '</div>'
                     +   '</div>'
                     // End Region AutoChampions
                     // Region AutoClubChampion
                     +   '<div style="display:flex;flex-direction:row; border: 1px dotted;">'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoClubChamp","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoClubChamp","tooltip")+'</span><label class="switch"><input id="autoClubChamp" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoClubChampMax","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoClubChampMax","tooltip")+'</span><input style="width:70px" id="autoClubChampMax" required pattern="'+HHAuto_inputPattern.autoClubChampMax+'" type="text"></div>'
                     +    '</div>'
                     +   '</div>'
                     // End Region AutoClubChampions
                     +   '<span>'+getTextForUI("autoStats","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoStats","tooltip")+'</span><input id="autoStats" required pattern="'+HHAuto_inputPattern.autoStats+'" type="text"></div>'
                     +   '<div style="display:flex;flex-direction:row;">'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoExpW","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoExpW","tooltip")+'</span><label class="switch"><input id="autoExpW" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoExp","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoExp","tooltip")+'</span><input id="autoExp" required pattern="'+HHAuto_inputPattern.autoExp+'" type="text"></div>'
                     +    '</div>'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("maxExp","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("maxExp","tooltip")+'</span><input style="width:50px" id="maxExp" required pattern="'+HHAuto_inputPattern.maxExp+'" type="text"></div>'
                     +    '</div>'
                     +   '</div>'
                     +   '<div style="display:flex;flex-direction:row;">'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoAffW","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoAffW","tooltip")+'</span><label class="switch"><input id="autoAffW" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoAff","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoAff","tooltip")+'</span><input id="autoAff" required pattern="'+HHAuto_inputPattern.autoAff+'" type="text"></div>'
                     +    '</div>'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("maxAff","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("maxAff","tooltip")+'</span><input style="width:50px" id="maxAff" required pattern="'+HHAuto_inputPattern.maxAff+'" type="text"></div>'
                     +    '</div>'
                     +   '</div>'
                     +   '<div style="display:flex;flex-direction:row;">'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoLGMW","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoLGMW","tooltip")+'</span><label class="switch"><input id="autoLGMW" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoLGM","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoLGM","tooltip")+'</span><input id="autoLGM" required pattern="'+HHAuto_inputPattern.autoLGM+'" type="text"></div>'
                     +    '</div>'
                     +   '</div>'
                     +   '<div style="display:flex;flex-direction:row;">'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoLGRW","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoLGRW","tooltip")+'</span><label class="switch"><input id="autoLGRW" type="checkbox"><span class="slider round"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding-left:10px; display:flex;flex-direction:column;">'
                     +     '<span>'+getTextForUI("autoLGR","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoLGR","tooltip")+'</span><input id="autoLGR" required pattern="'+HHAuto_inputPattern.autoLGR+'" type="text"></div>'
                     +    '</div>'
                     +   '</div>'
                     //+   '<div style="display:flex;flex-direction:row;">'
                     //+    '<div style="padding:10px; display:flex;flex-direction:column;">'
                     //+     '<span>'+getTextForUI("autoEGMW","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoEGMW","tooltip")+'</span><label class="switch"><input id="autoEGMW" type="checkbox"><span class="slider round"></span></label></div>'
                     //+    '</div>'
                     //+    '<div style="padding:10px; display:flex;flex-direction:column;">'
                     //+     '<span>'+getTextForUI("autoEGM","elementText")+'</span><div class="tooltip"><span class="tooltiptext">'+getTextForUI("autoEGM","tooltip")+'</span><input id="autoEGM" required pattern="'+HHAuto_inputPattern.autoEGM+'" type="text"></div>'
                     //+    '</div>'
                     //+   '</div>'
                     +  '</div>'
                     + '</div>'
                     +'</div>'+UIcontainer.html());

    var div = document.createElement('div');
    div.innerHTML = '<div id="pInfo" style="padding-left:3px;z-index:-1;white-space: pre;position: absolute;right: 5%; left:70%; top:8%;border: 1px solid #ffa23e;background-color: rgba(0,0,0,.5);border-radius: 5px;"></div>'.trim();
    document.getElementById('contains_all').appendChild(div.firstChild);

    // Add auto troll options
    var trollOptions = document.getElementById("autoTrollSelector");

    for (var i=0;i<getSetHeroInfos('questing.id_world');i++)
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
        optionL.value=j;
        optionL.text = Leagues[j];
        leaguesOptions.add(optionL);
    };

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

    document.getElementById("settPerTab").checked = localStorage.HHAuto_Setting_settPerTab === "true";
    trollOptions.selectedIndex = Storage().HHAuto_Setting_autoTrollSelectedIndex;
    leaguesOptions.selectedIndex = Storage().HHAuto_Setting_autoLeaguesSelectedIndex;
    document.getElementById("autoSalaryCheckbox").checked = Storage().HHAuto_Setting_autoSalary === "true";
    document.getElementById("autoSalaryTextbox").value = Storage().HHAuto_Setting_autoSalaryTimer?Storage().HHAuto_Setting_autoSalaryTimer:"120";
    document.getElementById("autoContestCheckbox").checked = Storage().HHAuto_Setting_autoContest === "true";
    document.getElementById("autoMissionCheckbox").checked = Storage().HHAuto_Setting_autoMission === "true";
    document.getElementById("autoMissionCollect").checked = Storage().HHAuto_Setting_autoMissionC === "true";
    document.getElementById("autoMissionKFirst").checked = Storage().HHAuto_Setting_autoMissionKFirst === "true" ;
    document.getElementById("autoQuestCheckbox").checked = Storage().HHAuto_Setting_autoQuest === "true";
    document.getElementById("autoTrollCheckbox").checked = Storage().HHAuto_Setting_autoTrollBattle === "true";
    document.getElementById("eventTrollOrder").value = Storage().HHAuto_Setting_eventTrollOrder?Storage().HHAuto_Setting_eventTrollOrder:"1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20";
    document.getElementById("buyCombTimer").value = Storage().HHAuto_Setting_buyCombTimer?Storage().HHAuto_Setting_buyCombTimer:"16";
    document.getElementById("buyMythicCombTimer").value = Storage().HHAuto_Setting_buyMythicCombTimer?Storage().HHAuto_Setting_buyMythicCombTimer:"16";
    //document.getElementById("autoArenaCheckbox").checked = Storage().HHAuto_Setting_autoArenaBattle === "true";
    document.getElementById("autoSeasonCheckbox").checked = Storage().HHAuto_Setting_autoSeason === "true";
    document.getElementById("autoSeasonCollect").checked = Storage().HHAuto_Setting_autoSeasonCollect === "true";
    document.getElementById("SeasonMaskRewards").checked = Storage().HHAuto_Setting_SeasonMaskRewards === "true";
    document.getElementById("autoSeasonPassReds").checked = Storage().HHAuto_Setting_autoSeasonPassReds === "true";
    document.getElementById("autoFreePachinko").checked = Storage().HHAuto_Setting_autoFreePachinko === "true";
    document.getElementById("autoLeagues").checked = Storage().HHAuto_Setting_autoLeagues === "true";
    //document.getElementById("autoLeaguesMaxRank").value = Storage().HHAuto_Setting_autoLeaguesMaxRank?Storage().HHAuto_Setting_autoLeaguesMaxRank:"0";
    document.getElementById("autoLeaguesPowerCalc").checked = Storage().HHAuto_Setting_autoLeaguesPowerCalc === "true";
    document.getElementById("autoLeaguesCollect").checked = Storage().HHAuto_Setting_autoLeaguesCollect === "true";
    document.getElementById("autoPowerPlaces").checked = Storage().HHAuto_Setting_autoPowerPlaces === "true";
    document.getElementById("autoPowerPlacesAll").checked = Storage().HHAuto_Setting_autoPowerPlacesAll === "true";
    document.getElementById("autoPowerPlacesIndexFilter").value = Storage().HHAuto_Setting_autoPowerPlacesIndexFilter?Storage().HHAuto_Setting_autoPowerPlacesIndexFilter:"1;2;3";
    document.getElementById("autoStats").value = Storage().HHAuto_Setting_autoStats?Storage().HHAuto_Setting_autoStats:"500000000";
    document.getElementById("paranoia").checked = Storage().HHAuto_Setting_paranoia==="true";
    document.getElementById("paranoiaSpendsBefore").checked = Storage().HHAuto_Setting_paranoiaSpendsBefore==="true";
    document.getElementById("autoExp").value = Storage().HHAuto_Setting_autoExp?Storage().HHAuto_Setting_autoExp:"500000000";
    document.getElementById("autoExpW").checked = Storage().HHAuto_Setting_autoExpW === "true";
    document.getElementById("autoAff").value = Storage().HHAuto_Setting_autoAff?Storage().HHAuto_Setting_autoAff:"500000000";
    document.getElementById("autoAffW").checked = Storage().HHAuto_Setting_autoAffW === "true";
    document.getElementById("maxExp").value = Storage().HHAuto_Setting_MaxExp?Storage().HHAuto_Setting_MaxExp:"10000";
    document.getElementById("maxAff").value = Storage().HHAuto_Setting_MaxAff?Storage().HHAuto_Setting_MaxAff:"50000";
    document.getElementById("autoLGM").value = Storage().HHAuto_Setting_autoLGM?Storage().HHAuto_Setting_autoLGM:"500000000";
    document.getElementById("autoLGMW").checked = Storage().HHAuto_Setting_autoLGMW === "true";
    document.getElementById("autoLGR").value = Storage().HHAuto_Setting_autoLGR?Storage().HHAuto_Setting_autoLGR:"500000000";
    document.getElementById("autoLGRW").checked = Storage().HHAuto_Setting_autoLGRW === "true";
    document.getElementById("autoBuyBoosters").checked = Storage().HHAuto_Setting_autoBuyBoosters === "true";
    document.getElementById("autoBuyBoostersFilter").value = Storage().HHAuto_Setting_autoBuyBoostersFilter?Storage().HHAuto_Setting_autoBuyBoostersFilter:"B1;B2;B3;B4";
    //document.getElementById("autoEGM").value = Storage().HHAuto_Setting_autoEGM?Storage().HHAuto_Setting_autoEGM:"500000000";
    //document.getElementById("autoEGMW").checked = Storage().HHAuto_Setting_autoEGMW === "true";
    document.getElementById("showInfo").checked = Storage().HHAuto_Setting_showInfo?Storage().HHAuto_Setting_showInfo==="true":"false";
    document.getElementById("showCalculatePower").checked = Storage().HHAuto_Setting_showCalculatePower?Storage().HHAuto_Setting_showCalculatePower==="true":"false";
    document.getElementById("calculatePowerLimits").value = Storage().HHAuto_Setting_calculatePowerLimits?Storage().HHAuto_Setting_calculatePowerLimits:"default";
    document.getElementById("plusEvent").checked = Storage().HHAuto_Temp_trollToFight=="-1" || Storage().HHAuto_Setting_plusEvent === "true";
    document.getElementById("plusEventMythic").checked = Storage().HHAuto_Setting_plusEventMythic === "true";
    document.getElementById("eventMythicPrio").checked = Storage().HHAuto_Setting_eventMythicPrio === "true";
    document.getElementById("autoTrollMythicByPassThreshold").checked = Storage().HHAuto_Setting_autoTrollMythicByPassThreshold === "true";
    document.getElementById("autoTrollMythicByPassParanoia").checked = Storage().HHAuto_Setting_autoTrollMythicByPassParanoia === "true";

    document.getElementById("autoClubChamp").checked = Storage().HHAuto_Setting_autoClubChamp  === "true";
    document.getElementById("autoClubChampMax").value = Storage().HHAuto_Setting_autoClubChampMax?Storage().HHAuto_Setting_autoClubChampMax:"999";
    document.getElementById("autoChamps").checked = Storage().HHAuto_Setting_autoChamps === "true";
    document.getElementById("autoChampsUseEne").checked = Storage().HHAuto_Setting_autoChampsUseEne === "true";
    document.getElementById("autoChampsFilter").value = Storage().HHAuto_Setting_autoChampsFilter?Storage().HHAuto_Setting_autoChampsFilter:"1;2;3;4;5;6";

    document.getElementById("spendKobans0").checked = Storage().HHAuto_Setting_spendKobans0 === "true";
    document.getElementById("spendKobans1").checked = Storage().HHAuto_Setting_spendKobans1 === "true";
    document.getElementById("spendKobans2").checked = Storage().HHAuto_Setting_spendKobans2 === "true";
    document.getElementById("buyCombat").checked = Storage().HHAuto_Setting_buyCombat === "true";
    document.getElementById("buyMythicCombat").checked = Storage().HHAuto_Setting_buyMythicCombat === "true";
    document.getElementById("kobanBank").value = Storage().HHAuto_Setting_kobanBank?Storage().HHAuto_Setting_kobanBank:"1000000";

    document.getElementById("autoTrollThreshold").value = Storage().HHAuto_Setting_autoTrollThreshold?Storage().HHAuto_Setting_autoTrollThreshold:"0";
    document.getElementById("autoQuestThreshold").value = Storage().HHAuto_Setting_autoQuestThreshold?Storage().HHAuto_Setting_autoQuestThreshold:"0";
    document.getElementById("autoLeaguesThreshold").value = Storage().HHAuto_Setting_autoLeaguesThreshold?Storage().HHAuto_Setting_autoLeaguesThreshold:"0";
    document.getElementById("autoSeasonThreshold").value = Storage().HHAuto_Setting_autoSeasonThreshold?Storage().HHAuto_Setting_autoSeasonThreshold:"0";

    document.getElementById("master").checked = Storage().HHAuto_Setting_master==="true";

    document.getElementById("PoAMaskRewards").checked = Storage().HHAuto_Setting_PoAMaskRewards === "true";
    document.getElementById("git").addEventListener("click", function(){ window.open("https://github.com/Roukys/HHauto/wiki"); });
    document.getElementById("loadConfig").addEventListener("click", function(){
        if (typeof LoadDialog.showModal === "function") {
            LoadDialog.showModal();
        } else {
            alert("The <dialog> API is not supported by this browser");
        }
    });
    document.getElementById("DebugMenu").addEventListener("click", function(){
        if (typeof DebugDialog.showModal === "function") {
            DebugDialog.showModal();
        } else {
            alert("The <dialog> API is not supported by this browser");
        }
    });
    document.getElementById('myfile').addEventListener('change', myfileLoad_onChange);
    document.getElementById("saveConfig").addEventListener("click", function(){
        saveHHVarsSettingsAsJSON();
    });
    document.getElementById("DeleteTempVars").addEventListener("click", function(){
        debugDeleteTempVars();
        location.reload();
    });
    document.getElementById("ResetAllVars").addEventListener("click", function(){
        debugDeleteAllVars();
        location.reload();
    });
    document.getElementById("saveDebug").addEventListener("click", function(){
        saveHHDebugLog();
    });

    document.getElementById("timerResetButton").addEventListener("click", function(){
        let timerSelector = document.getElementById("timerResetSelector");
        if (timerSelector.options[timerSelector.selectedIndex].text !== getTextForUI("timerResetNoTimer","elementText") && timerSelector.options[timerSelector.selectedIndex].text !== getTextForUI("timerResetSelector","elementText"))
        {
            document.getElementById('sMenu').parentElement.style.display=='none';
            DebugDialog.close();
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
        setDefaults();
    }

    if(getPage()=="shop")
    {
        updateShop();
    }

    if (/*autoBuy() &&*/ getBurst())
    {
        doShopping();
        /*}
    if (Storage().HHAuto_Setting_autoStats === "true" && getBurst())
        {*/
        doStatUpgrades();
    }

    if (!CollectEventData())
    {
        setTimeout(function(){CollectEventData();},5000);
    }


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

    autoLoop();
};

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
    setTimeout(hardened_start,1000);

});

setTimeout(hardened_start,5000);
