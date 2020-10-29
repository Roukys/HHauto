// ==UserScript==
// @name         HaremHeroes Automatic++
// @namespace    https://github.com/Roukys/HHauto
// @version      5.2-beta.1
// @description  Open the menu in HaremHeroes(topright) to toggle AutoControlls. Supports AutoSalary, AutoContest, AutoMission, AutoQuest, AutoTrollBattle, AutoArenaBattle and AutoPachinko(Free), AutoLeagues, AutoChampions and AutoStatUpgrades. Messages are printed in local console.
// @author       JD and Dorten(a bit) and roukys
// @match        http*://nutaku.haremheroes.com/*
// @match        http*://*.hentaiheroes.com/*
// @grant        GM_addStyle
// @license      MIT
// @updateURL   https://github.com/Roukys/HHauto/raw/main/HHAuto.user.js
// @downloadURL https://github.com/Roukys/HHauto/raw/main/HHAuto.user.js
// ==/UserScript==

GM_addStyle('/* The switch - the box around the slider */ .switch { position: relative; display: inline-block; width: 40px; height: 24px; } /* Hide default HTML checkbox */ .switch input {display:none;} /* The slider */ .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; -webkit-transition: .4s; transition: .4s; } .slider.round:before { position: absolute; content: ""; height: 16px; width: 16px; left: 4px; bottom: 4px; background-color: white; -webkit-transition: .4s; transition: .4s; } input:checked + .slider { background-color: #2196F3; } input:focus + .slider { box-shadow: 0 0 1px #2196F3; } input:checked + .slider:before { -webkit-transform: translateX(16px); -ms-transform: translateX(16px); transform: translateX(16px); } /* Rounded sliders */ .slider.round { border-radius: 24px; } .slider.round:before { border-radius: 50%; }');

// var d="@require      https://cdn.jsdelivr.net/js-cookie/2.2.0/js.cookie.js"

function Storage()
{
    return localStorage.settPerTab==="true"?sessionStorage:localStorage;
}

function getHero()
{
    if(unsafeWindow.Hero === undefined)
    {
        setTimeout(autoLoop, Number(Storage().autoLoopTimeMili))
        //console.log(window.wrappedJSObject)
    }
    //console.log(unsafeWindow.Hero);
    return unsafeWindow.Hero;
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
            ob = document.getElementById("hh_hentai");
        }
        var p=ob.className.match(/.*page-(.*) .*/i)[1];
        if (p=="missions" && $('h4.contests.selected').size()>0)
        {
            return "activities"
        }
        if (p=="missions" && $('h4.pop.selected').size()>0)
        {
            var t=$(".pop_thumb_selected").attr("index");
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
function gotoPage(page)
{
    var cp=getPage();
    console.log('going '+cp+'->'+page);
    var index;
    var originalPage = page;
    if (page.startsWith('powerplace'))
    {
        index = page.substring('powerplace'.length);
        console.log('Powerplace index : '+index);
        page = 'powerplace';
    }

    if(getPage() === originalPage)
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
                togoto = getHero().infos.questing.current_url;
                if (togoto.includes("world"))
                {
                    console.log("All quests finished, turning off AutoQuest!");
                    Storage().autoQuest = false;
                    location.reload();
                    return false;
                }
                console.log("Current quest page: "+togoto);
                break;
            case "champions_map":
                togoto = $("nav div[rel='content'] a:has(.champions)").attr("href");
                break;
            case "season" :
                togoto = "/season.html";
                break;
            case "season-arena" :
                togoto = "/season-arena.html";
                break;
            default:
                console.log("Unknown goto page request. No page \'"+page+"\' defined.");
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
                togoto = url_add_param(togoto, "index=" + index);
            }

            sessionStorage.autoLoop = "false";
            console.log('GotoPage : '+togoto);
            window.location = window.location.origin + togoto;
        }
        else console.log("Couldn't find page path. Page was undefined...");
        return false;
    }
}

var proceedQuest = function () {
    //console.log("Starting auto quest.");
    // Check if at correct page.
    if (!gotoPage("quest")) {
        // Click on current quest to naviagte to it.
        console.log("Navigating to current quest.");
        return;
    }
    $("#popup_message close").click();
    // Get the proceed button type
    var proceedButtonMatch = $("#controls button:not([style='display: none;'])");
    if (proceedButtonMatch.length === 0){proceedButtonMatch = $("#controls button[act='free']");}
    var proceedCostEnergy = Number($("#controls .cost span[cur='*']").text());
    var units = [" ", "K", "M", "G", "T", "P", "E", "Z", "Y"]
    var proceedCostMoney = $("#controls .cost span[cur='$']").text().replace(/\s+/g, '');
    var Unit=proceedCostMoney.substr(-1);
    if (units.includes(Unit))
    {
        proceedCostMoney=Number(proceedCostMoney.split(Unit)[0].replace(",","").trim())*(1000**units.indexOf(Unit))
    }
    else
    {
        proceedCostMoney=Number(proceedCostMoney.replace(",","").trim());
    }
    var proceedType = proceedButtonMatch.attr("act");

    if (proceedButtonMatch.length === 0) console.log("Could not find resume button.");
    else if (proceedType === "free") {
        console.log("Proceeding for free.");
        proceedButtonMatch.click();
    }
    else if (proceedType === "pay") {
        var energyCurrent = getHero().infos.energy_quest;
        var moneyCurrent = getHero().infos.soft_currency;
        if(proceedCostEnergy <= energyCurrent)
        {
            // We have energy.
            console.log("Spending "+proceedCostEnergy+" Energy to proceed.");
        }
        else
        {
            console.log("Quest requires "+proceedCostEnergy+" Energy to proceed.");
            sessionStorage.questRequirement = "*"+proceedCostEnergy;
            return;
        }
        if(proceedCostMoney <= moneyCurrent)
        {
            // We have money.
            console.log("Spending "+proceedCostMoney+" Money to proceed.");
        }
        else
        {
            console.log("Spending "+proceedCostEnergy+" Energy to proceed.");
            sessionStorage.questRequirement = "$"+proceedCostMoney;
            return;
        }
        proceedButtonMatch.click();
        sessionStorage.autoLoop = "false";
        location.reload();
    }
    else if (proceedType === "use_item") {
        console.log("Proceeding by using X" + Number($("#controls .item span").text()) + " of the required item.");
        proceedButtonMatch.click();
    }
    else if (proceedType === "battle") {
        console.log("Proceeding to battle troll...");
        sessionStorage.questRequirement = "battle";
        // Proceed to battle troll.
        proceedButtonMatch.click();
        sessionStorage.autoLoop = "false";
        location.reload();
    }
    else if (proceedType === "end_archive") {
        console.log("Reached end of current archive. Proceeding to next archive.");
        sessionStorage.autoLoop = "false";
        proceedButtonMatch.click();
    }
    else if (proceedType === "end_play") {
        console.log("Reached end of current play. Proceeding to next play.");
        sessionStorage.autoLoop = "false";
        proceedButtonMatch.click();
    }
    else {
        console.log("Could not identify given resume button.");
        sessionStorage.questRequirement = "unknownQuestButton";
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
        console.log("Navigating to activities page.");
        // return busy
        return true;
    }
    else
    {
        console.log("On activities page.");
        if (Storage().autoMissionC==="true")
        {
            console.log("Collecting finished mission's reward.");
            $(".mission_button button:visible[rel='claim']").click();
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
                    console.log("Unfinished mission detected...("+data.remaining_time+"sec. remaining)");
                    setTimer('nextMissionTime',Number(data.remaining_time)+1);
                    allGood = false;
                    return;
                }
                else{
                    console.log("Unclaimed mission detected...");
                    if (Storage().autoMissionC==="true")
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
                    else if(reward.classList.contains("slot_SC"))reward.type = "money";
                    else if(reward.classList.contains("slot_HC"))reward.type = "koban";
                    else reward.type = "item";
                    // set value if xp
                    if(reward.type === "xp" || reward.type === "money" || reward.type === "koban")
                    {
                        // remove all non numbers and HTML tags
                        try{
                            reward.data = Number(slotDiv.innerHTML.replace(/<.*?>/g,'').replace(/\D/g,''));
                        }
                        catch(e){
                            console.log("Couldn't parse xp/money data.");
                            console.log(slotDiv);
                        }
                    }
                    // set item details if item
                    else if(reward.type === "item")
                    {
                        try{
                            reward.data = $.data(slotDiv).d;
                        }
                        catch(e){
                            console.log("Couldn't parse item reward slot details.");
                            console.log(slotDiv);
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
            console.log("Something went wrong, need to retry later...");
            // busy
            return true;
        }
        console.log("Missions parsed, mission list is:-");
        console.log(missions);
        if(missions.length > 0)
        {
            console.log("Selecting mission from list.");
            var mission = getSuitableMission(missions);
            console.log("Selected mission:-");
            console.log(mission);
            console.log("Selected mission duration: "+mission.duration+"sec.");
            var missionButton = $(mission.missionObject).find("button:visible").first();
            console.log("Mission button of type: "+missionButton.attr("rel"));
            console.log("Clicking mission button.");
            missionButton.click();
            setTimer('nextMissionTime',Number(mission.duration)+1);
        }
        else{
            console.log("No missions detected...!");
            // get gift
            var ck = sessionStorage['giftleft'];
            var isAfterGift = document.querySelector("#missions .after_gift").style.display === 'block';
            if(!isAfterGift){
                if(ck === undefined || ck === 'giftleft')
                {
                    console.log("Collecting gift.");
                    delete sessionStorage['giftleft'];
                    document.querySelector(".end_gift button").click();
                }
                else{
                    console.log("Refreshing to collect gift...");
                    sessionStorage['giftleft']='giftleft';
                    window.reload();
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
                console.log("New mission time was undefined... Setting it manually to 10min.");
                time = 10*60;
            }
            setTimer('nextMissionTime',Number(time)+1);
        }
        // not busy
        return false;
    }
}

// returns boolean to set busy
function doPowerPlacesStuff(index)
{

    if(!gotoPage("powerplace"+index))
    {
        console.log("Navigating to powerplace"+index+" page.");
        // return busy
        return true;
    }
    else
    {
        console.log("On powerplace"+index+" page.");
        console.log("Collecting finished powerplace"+index+"'s reward.");
        $("button[rel='pop_claim']").click();

        console.log("Autofill for next powerplace"+index+" action.");
        $("button[rel='pop_auto_assign']").click();

        console.log("Starting next powerplace"+index+" action.");
        $("button[rel='pop_action']").click();

        // need to get next powerplaces timer data
        var time = 0;
        for(var e in unsafeWindow.HHTimers.timers){
            try{if(unsafeWindow.HHTimers.timers[e].$elm.selector.startsWith(".pop_central_part"))
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
                if(unsafeWindow.HHTimers.timers[e].$elm && unsafeWindow.HHTimers.timers[e].$elm.selector.startsWith(".pop_remaining"))
                    // get closest time
                    if(!(unsafeWindow.HHTimers.timers[e].remainingTime>time))
                        time=unsafeWindow.HHTimers.timers[e].remainingTime;
            }
        }}catch(e){}
        if(time === undefined){
            console.log("New powerplace time was undefined... Setting it manually to 10min.");
            time = 10*60;
        }
        setTimer('nextPowerPlacesTime'+index,Number(time)+1);
        // Not busy
        return false;
    }
}

// returns boolean to set busy
function doContestStuff()
{
    if(!gotoPage("activities"))
    {
        console.log("Navigating to activities page.");
        // return busy
        return true;
    }
    else
    {
        console.log("On activities page.");
        console.log("Collecting finished contests's reward.");
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
            console.log("New contest time was undefined... Setting it manually to 10min.");
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
        //console.log('Need to click: ',ToClick.length);
        if (ToClick.length>0)
        {
            //console.log('clicking N ',ToClick[0].formAction.split('/').last())
            $(ToClick[0]).click();
            ToClick.shift();
            //console.log('will click again');
            setTimeout(ClickThem,randomInterval(300,900));

            window.top.postMessage({ImAlive:true},'*');
        }
        else
        {
            //console.log('nothing to click, checking data');
            CollectData();
        }
    }

    function CollectData()
    {
        var btns=$("#harem_whole #harem_left .salary:not('.loads') button");
        //console.log('buttons: ',btns.size())
        btns.each(function (index, element) {
            //console.log(index,element.formAction);
            var gid=Number(element.parentElement.parentElement.parentElement.getAttribute('girl'));
            //console.log('checking '+gid);
            if (!Clicked.includes(gid))
            {
                Clicked.push(gid);
                ToClick.push(element);
                //console.log('added! ',Clicked,ToClick);
            }
        });

        console.log('Collected Data: ',Clicked,ToClick);

        if (ToClick.length>0)
        {
            //console.log('clicking!');
            setTimeout(ClickThem,randomInterval(150,500));
        }
        else//nothing to collect
        {
            var closestTime = undefined;
            var closestGirl = 0;
            var gMap = getGirlsMap();
            if(gMap === undefined)
            {
                // error
                console.log("Girls Map was undefined...! Error, manually setting salary time to 2 min.");
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
                    console.log("Girls Map had undefined property...! Error, manually setting salary time to 2 min.");
                    closestTime = 2*60;
                }
            }
            if(closestTime === undefined)
            {
                console.log("closestTime was undefined...! Error, manually setting salary time to 2 min.");
                closestTime = 2*60;
            }
            var st=Number(Storage().autoSalaryTimer?Storage().autoSalaryTimer:"120");
            if(closestTime <= st )
            {
                console.log("closestTime is "+closestTime+" ("+closestGirl+")");
                closestTime = st;
            }
            setTimer('nextSalaryTime',Number(closestTime)+1);
            sessionStorage.autoLoop = "true";
            setTimeout(autoLoop, Number(Storage().autoLoopTimeMili));
        }
    }

    CollectData();
}

var getSalary = function () {
    try {
        if(getPage() == "harem")
        {
            console.log("Detected Harem Screen. Fetching Salary");
            is_cheat_click=function(e) {
                return false;
            };
            sessionStorage.autoLoop = "false";
            CollectMoney();
            // return busy
            return true;
        }
        else if (getPage() == "home")
        {
            var salaryButton = $("#collect_all_container button[id='collect_all']")
            var salaryToCollect = salaryButton.attr("style")==="display: inline-block;"?true:false;
            var getButtonClass = salaryButton.attr("class");
            console.log(salaryToCollect,getButtonClass);
            if (salaryToCollect)
            {
                if (getButtonClass === "blue_button_L")
                {
                    is_cheat_click=function(e) {
                        return false;
                    };
                    salaryButton.click();
                    console.log('Collected all Premium salary');
                    setTimer('nextSalaryTime',Number(Storage().autoSalaryTimer?Storage().autoSalaryTimer:"120")+1);
                    return true;
                }
                else if ( getButtonClass === "orange_button_L")
                {
                    // Not at Harem screen then goto the Harem screen.
                    console.log("Navigating to Harem window.");
                    gotoPage("harem");
                    // return busy
                    return true;

                }
                else
                {
                    console.log("Unknown salary button color : "+getButtonClass);
                    setTimer('nextSalaryTime',Number(Storage().autoSalaryTimer?Storage().autoSalaryTimer:"120")+1);
                }
            }
            else
            {
                console.log("No salary to collect");
                setTimer('nextSalaryTime',Number(Storage().autoSalaryTimer?Storage().autoSalaryTimer:"120")+1);
            }
        }
        else
        {
            // Not at Harem screen then goto the Harem screen.
            console.log("Navigating to Home window.");
            gotoPage("home");
            return true;
        }

    }
    catch (ex) {
        console.log("Could not collect salary... " + ex);
        // return not busy
        return false;
    }
};

var doStatUpgrades=function()
{
    //Stats?
    //console.log('stats');
    var Hero=getHero();
    var level=Hero.infos.level;
    var stats=[Hero.infos.carac1,Hero.infos.carac2,Hero.infos.carac3];
    var money=Hero.infos.soft_currency;
    var count=0;
    var M=Storage().autoStats?Number(Storage().autoStats):500000000;
    var MainStat=stats[Hero.infos.class-1];
    var Limit=Hero.infos.level*30;//Hero.infos.level*19+Math.min(Hero.infos.level,25)*21;
    var carac=Hero.infos.class;
    var mp=0;
    var mults=[60,30,10,1];
    for (var car=0; car<3; car++)
    {
        //console.log('stat '+carac);
        var s=stats[carac-1];
        for (var mu=0;mu<5;mu++)
        {
            var mult=mults[mu];
            var price = 5+s*2+(Math.max(0,s-2000)*2)+(Math.max(0,s-4000)*2)+(Math.max(0,s-6000)*2)+(Math.max(0,s-8000)*2);
            price*=mult;
            if (carac==Hero.infos.class)
            {
                mp=price;
            }
            //console.log('money: '+money+' stat'+carac+': '+stats[carac-1]+' price: '+price);
            if ((stats[carac-1]+mult)<=Limit && (money-price)>M && (carac==Hero.infos.class || price<mp/2 || (MainStat+mult)>Limit))
            {
                count++;
                console.log('money: '+money+' stat'+carac+': '+stats[carac-1]+' [+'+mult+'] price: '+price);
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
        var MS='carac'+Hero.infos.class;
        var SS1='carac'+(Hero.infos.class%3+1);
        var SS2='carac'+((Hero.infos.class+1)%3+1);
        var money=Hero.infos.soft_currency;

        try
        {
            var shop=JSON.parse(sessionStorage.storeContents);
        }
        catch(wtf)
        {
            sessionStorage.charLevel=0;
            return;
        }

        if (!sessionStorage.haveAff)
        {
            sessionStorage.charLevel=0;
            return;
        }

        var LGM=Number(Storage().autoLGM);
        var EGM=Number(Storage().autoEGM);
        var LGR=Number(Storage().autoLGR);
        var Exp=Number(Storage().autoExp);
        var Aff=Number(Storage().autoAff);
        var MaxAff=Number(Storage().MaxAff);
        var MaxExp=Number(Storage().MaxExp);
        var HaveAff=Number(sessionStorage.haveAff);
        var HaveExp=Number(sessionStorage.haveExp);


        if (Storage().autoLGMW==="true" || Storage().autoLGRW==="true" || Storage().autoEGMW==="true")
        {
            //console.log('items');
            var Was=shop[0].length;
            for (var n=shop[0].length-1;n>=0;n--)
            {

                if (Storage().autoLGMW==="true" && money>=LGM+Number(shop[0][n].price) && shop[0][n][MS]>0 && shop[0][n][SS1]==0 && shop[0][n][SS2]==0 && shop[0][n].chance==0 && shop[0][n].endurance==0 && shop[0][n].rarity=='legendary'||
                    Storage().autoEGMW==="true" && money>=EGM+Number(shop[0][n].price) && shop[0][n][MS]>0 && shop[0][n][SS1]==0 && shop[0][n][SS2]==0 && shop[0][n].chance==0 && shop[0][n].endurance==0 && shop[0][n].rarity=='epic'||
                    Storage().autoLGRW==="true" && money>=LGR+Number(shop[0][n].price) && shop[0][n][MS]>0 && shop[0][n][SS1]>0 && shop[0][n][SS2]>0 && shop[0][n].rarity=='legendary')
                {
                    console.log('wanna buy ',shop[0][n]);
                    if (money>=shop[0][n].price)
                    {
                        console.log("yay?");
                        money-=shop[0][n].price;
                        var params = {
                            class: "Item",
                            action: "buy",
                            id_item: shop[0][n].id_item,
                            type: "armor",
                            who: 1,
                            id_skin: shop[0][n].id_skin,
                            id_equip: shop[0][n].id_equip,
                        };
                        hh_ajax(params, function(data) {

                        });
                        shop[0].splice(n,1);
                    }
                    else
                    {
                        console.log("but can't");
                    }
                }
            }
            if (shop[0].length==0 && Was>0)
            {
                sessionStorage.charLevel=0;
            }
        }

        if (Storage().autoAffW==="true" && HaveAff<MaxAff)
        {
            //console.log('gifts');
            Was=shop[1].length;
            for (var nn=shop[1].length-1;nn>=0;nn--)
            {
                console.log('wanna buy ',shop[1][nn]);
                if (money>=Aff+Number(shop[1][nn].price) && money>=shop[1][nn].price)
                {
                    console.log("yay?");
                    money-=shop[1][nn].price;
                    var params2 = {
                        class: "Item",
                        action: "buy",
                        id_item: shop[1][nn].id_item,
                        type: "gift",
                        who: 1
                    };
                    hh_ajax(params2, function(data) {

                    });
                    shop[1].splice(nn,1);
                }
                else
                {
                    console.log("but can't");
                }
            }
            if (shop[1].length==0 && Was>0)
            {
                sessionStorage.charLevel=0;
            }
        }

        if (Storage().autoExpW==="true" && HaveExp<MaxExp)
        {
            //console.log('books');
            Was=shop[2].length;
            for (var nnn=shop[2].length-1;nnn>=0;nnn--)
            {
                console.log('wanna buy ',shop[2][nnn]);
                if (money>=Exp+Number(shop[2][nnn].price) && money>=shop[2][nnn].price)
                {
                    console.log("yay?");
                    money-=shop[2][nnn].price;
                    var params3 = {
                        class: "Item",
                        action: "buy",
                        id_item: shop[2][nnn].id_item,
                        type: "potion",
                        who: 1
                    };
                    hh_ajax(params3, function(data) {

                    });
                    shop[2].splice(nnn,1);
                }
                else
                {
                    console.log("but can't");
                }
            }
            if (shop[2].length==0 && Was>0)
            {
                sessionStorage.charLevel=0;
            }
        }
        sessionStorage.storeContents=JSON.stringify(shop);
        unsafeWindow.Hero.infos.soft_currency=money;
    }
    catch (ex)
    {
        console.log(ex);
        sessionStorage.charLevel=0;
    }
}

var doBossBattle = function()
{
    var currentPower = getHero().infos.energy_fight;
    if(currentPower < 1)
    {
        //console.log("No power for battle.");
        return;
    }

    var TTF;
    if (Storage().plusEvent==="true" && !checkTimer("eventGoing") && sessionStorage.eventTroll)
    {
        TTF=sessionStorage.eventTroll;
        console.log("Event troll fight");
    }
    else if(Storage().trollToFight !== undefined && !isNaN(Storage().trollToFight) && Storage().trollToFight !== "0")
    {
        TTF=Storage().trollToFight;
        console.log("Custom troll fight.");
    }
    else
    {
        TTF=getHero().infos.questing.id_world-1;
        console.log("Last troll fight");
    }

    if (Storage().autoTrollBattleSaveQuest == "true")
    {
        TTF=getHero().infos.questing.id_world-1;
        console.log("Last troll fight for quest item.");
        Storage().autoTrollBattleSaveQuest = "false";
    }

    console.log("Fighting troll N "+TTF);
    console.log("Going to crush: "+Trollz[Number(TTF)]);

    // Battles the latest boss.
    // Navigate to latest boss.
    //console.log('!!!!!',window.location.href,window.location.href=="/battle.html?id_troll=" + TTF);
    if(window.location.pathname=="/battle.html" && window.location.search=="?id_troll=" + TTF)
    {
        // On the battle screen.
        CrushThem();
    }
    else
    {
        console.log("Navigating to chosen Troll.");
        sessionStorage.autoLoop = "false";
        location.href = "/battle.html?id_troll=" + TTF;
        return true;
    }
};

var doChampionStuff=function()
{
    var page=getPage();
    if (page=='champions')
    {
        console.log('on champion page');
        if ($('button[rel=perform].blue_button_L').length==0)
        {
            console.log('Something is wrong!');
            location.href = "/home.html";
            return true;
        }
        else
        {
            var TCount=Number($('div.input-field > span')[1].innerText.split(' / ')[1]);
            var ECount= getHero().infos.energy_quest;
            console.log("T:"+TCount+" E:"+ECount+" "+(Storage().autoChampsUseEne==="true"))
            if ( TCount==0)
            {
                console.log("No tickets!");
                setTimer('nextChampionTime',15*60);
                return false;
            }
            else
            {
                if (TCount!=0)
                {
                    console.log("Using ticket");
                    $('button[rel=perform].blue_button_L').click();
                }
                setTimeout(function(){gotoPage('champions_map');},500);
                return true;
            }
        }
    }
    else if (page=='champions_map')
    {
        console.log('on champion map');
        var Filter=Storage().autoChampsFilter.split(';').map(s=>Number(s));

        for (let i=0;i<$('span.stage-bar-tier').length;i++)
        {
            let Impression=$('span.stage-bar-tier')[i].getAttribute("hh_title");
            let Started=Impression.split('/')[0]!="0";
            let OnTimer=$($('a.champion-lair div.champion-lair-name')[i+1]).find('div[rel=timer]').length>0;
            let Filtered=Filter.includes(i+1);
            console.log("Champion "+(i+1)+" ["+Impression+"]"+(Started?" Started;":" Not started;")+(OnTimer?" on timer;":" not on timer;")+(Filtered?" Included in filter":" Excluded from filter"));

            if (Started && !OnTimer && Filtered)
            {
                console.log("Let's do him!");
                window.location = window.location.origin + '/champions/'+(i+1);
                return true;
            }
        }
        console.log("No good candidate");
        setTimer('nextChampionTime',15*60);
        return false;
    }
    else
    {
        gotoPage('champions_map');
        return true;
    }
}
// Numbers: thousand spacing
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
/* ============
    calculatePower Credit Raphael, 1121, Sluimerstand, shal (Hentai Heroes++ (OCD) 0.12.2)
   ============ */

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
    //console.log('Simulation log for: ' + opponentName);
    //console.log('Starting Egos adjusted for worst-case proc scenario:');
    //console.log('Player Ego: ' + playerEgo);
    //console.log('Opponent Ego: ' + opponentEgo);

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
            //console.log('Round ' + (turns + 1) + ': Player orgasm! -' + Math.round(playerAtk * 1.5 - opponentDef));

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
            //console.log('Round ' + (turns + 1) + ': Player hit! -' + (playerAtk - opponentDef));
        }

        //Log results
        //console.log('after Round ' + (turns + 1) + ': Opponent ego: ' + opponentEgo);
    }

    function opponentTurn() {
        //Orgasm
        if (opponentOrgasm >= opponentExcitement) {
            //Orgasm damage
            playerEgo -= Math.round(opponentAtk * 1.5 - playerDef);
            opponentOrgasmCount++;

            //Log results
            //console.log('Round ' + (turns + 1) + ': Opponent orgasm! -' + Math.round(opponentAtk * 1.5 - playerDef));

            //Orgasm 1
            if (opponentOrgasmCount == 1) {
                opponentAtk += Math.round(opponentBetaAdd * 1.3);
                playerDef += Math.round(playerBetaAdd * 1.75);
                if (opponentAlphaClass == '1') {
                    playerEgo -= opponentProcHCAddOrgasm1;
                    //console.log('Round ' + (turns + 1) + ': HC opponent possibility of Wild Burst on first orgasm! -' + opponentProcHCAddOrgasm1);
                }
            }

            //Orgasm 2
            if (opponentOrgasmCount == 2) {
                opponentAtk += Math.round(opponentOmegaAdd * 1.3);
                playerDef += Math.round(playerOmegaAdd * 1.75);
                if (opponentAlphaClass == '1') {
                    playerEgo -= opponentProcHCAddOrgasm2;
                    //console.log('Round ' + (turns + 1) + ': HC opponent possibility of Wild Burst on second orgasm! -' + opponentProcHCAddOrgasm2);
                }
            }

            //Orgasm 3
            if (opponentOrgasmCount == 3) {
                if (opponentAlphaClass == '1') {
                    playerEgo -= opponentProcHCAddOrgasm3;
                    //console.log('Round ' + (turns + 1) + ': HC opponent possibility of Wild Burst on third orgasm! -' + opponentProcHCAddOrgasm3);
                }
            }

            //Reset excitement value
            opponentOrgasm = 0;
        }

        //No orgasm
        else {
            playerEgo -= opponentAtk - playerDef;
            opponentOrgasm += opponentAtk * 2;
            //console.log('Round ' + (turns + 1) + ': Opponent hit! -' + (opponentAtk - playerDef));
        }

        //Log results
        //console.log('after Round ' + (turns + 1) + ': Player ego: ' + playerEgo);
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
                //console.log('Round ' + (turns + 1) + ': Possibly next: Opponent orgasm! -' + Math.round(opponentAtk * 1.5 - playerDef));

                if (opponentAlphaClass == '1') {
                    if (opponentOrgasmCount == 1) {
                        playerEgoCheck -= opponentProcHCAddOrgasm1;
                        //console.log('Round ' + (turns + 1) + ': Possibly next: HC opponent possibility of Wild Burst on first orgasm! -' + opponentProcHCAddOrgasm1);
                    }
                    if (opponentOrgasmCount == 2) {
                        playerEgoCheck -= opponentProcHCAddOrgasm2;
                        //console.log('Round ' + (turns + 1) + ': Possibly next: HC opponent possibility of Wild Burst on second orgasm! -' + opponentProcHCAddOrgasm2);
                    }
                    if (opponentOrgasmCount == 3) {
                        playerEgoCheck -= opponentProcHCAddOrgasm3;
                        //console.log('Round ' + (turns + 1) + ': Possibly next: HC opponent possibility of Wild Burst on third orgasm! -' + opponentProcHCAddOrgasm3);
                    }
                }
            }
            //No orgasm
            else {
                playerEgoCheck -= opponentAtk - playerDef;
                //console.log('Round ' + (turns + 1) + ': Possibly next: Opponent hit! -' + (opponentAtk - playerDef));
            }

            if (playerEgoCheck <= 0) {
                //console.log('Close call! After Round ' + (turns + 1) + ': Player ego: ' + playerEgoCheck);
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
    if (matchRating >= 0) {
        matchRating = '+' + nThousand(matchRating);

        if (playerEgoCheck <= 0) {
            return 'y'+matchRating
        }
        else {
            return 'g'+matchRating
        }
    }
    else {
        matchRating = nThousand(matchRating);
        return 'r'+matchRating
    }
}

var doSeason = function () {
    console.log("Performing auto Season.");
    // Confirm if on correct screen.
    var page = getPage();
    if(page === "season")
    {
        console.log("On season page.");

        var current_kisses = getHero().infos.energy_kiss;
        $("button[id='claim_btn_s'").click();
        //<button id="claim_btn_s" class="bordeaux_button_s" style="z-index: 1000; visibility: visible;">Claim</button>


        console.log("Remaining kisses : "+ current_kisses);
        if ( current_kisses > 0 )
        {
            console.log("Switching to Season-arena screen.");
            gotoPage("season-arena");
            return;
        }


    }
    else if (page === "season_arena")
    {
        console.log("On season arena page.");

        //try{
            var minID = -1;
            var scoreRating = -1;
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

            // player stats

            playerEgo = Math.round(getHero().infos.caracs.ego);
            playerDefHC = Math.round(getHero().infos.caracs.def_carac1);
            playerDefCH = Math.round(getHero().infos.caracs.def_carac2);
            playerDefKH = Math.round(getHero().infos.caracs.def_carac3);
            playerAtk = Math.round(getHero().infos.caracs.damage);
            playerClass = 'class'+getHero().infos.class;
            //playerClass = $('div#leagues_left .icon').attr('carac');
            playerAlpha = JSON.parse($("div.hero_team div[girl_n=0]").attr('girl-tooltip-data'));
            playerBeta =  JSON.parse($("div.hero_team div[girl_n=1]").attr('girl-tooltip-data'));
            playerOmega = JSON.parse($("div.hero_team div[girl_n=2]").attr('girl-tooltip-data'));
            playerExcitement = Math.round((playerAlpha.caracs.carac1 + playerAlpha.caracs.carac2 + playerAlpha.caracs.carac3) * 28);

            


            for (var index=0;index<3;index++)
            {
                var opponentName = $("div.season_arena_opponent_container .hero_details div:not([class]):not([carac])")[index].innerText;
                var opponentEgo = Number(document.getElementsByClassName("season_arena_opponent_container")[index].getElementsByClassName("hero_stats")[0].children[2].outerText.replace(/\s+/g, ''));
                var opponentDef = Number(document.getElementsByClassName("season_arena_opponent_container")[index].getElementsByClassName("hero_stats")[0].children[1].outerText.split('-')[0].replace(/\s+/g, ''));
                var opponentAtk = Number(document.getElementsByClassName("season_arena_opponent_container")[index].getElementsByClassName("hero_stats")[0].children[0].outerText.split('-')[0].replace(/\s+/g, ''));

                var opponentClass = $($("div.season_arena_opponent_container .hero_details div[hh_class_tooltip]")[index]).attr('carac');
                var opponentAlpha = JSON.parse($($("div.season_arena_opponent_container .hero_team div[rel='g1']")[index]).attr('girl-tooltip-data'));
                var opponentBeta = JSON.parse($($("div.season_arena_opponent_container .hero_team div[rel='g2']")[index]).attr('girl-tooltip-data'));
                var opponentOmega = JSON.parse($($("div.season_arena_opponent_container .hero_team div[rel='g3']")[index]).attr('girl-tooltip-data'));

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

                //endurance :Number(document.getElementsByClassName("season_arena_opponent_container")[index].getElementsByClassName("hero_stats")[0].children[2].outerText.replace(/\s+/g, ''));
                //console.log(playerEgo,playerDef,playerAtk,playerClass,playerAlpha,playerBeta,playerOmega,playerExcitement,opponentName,opponentEgo,opponentDef,opponentAtk,opponentClass,opponentAlpha,opponentBeta,opponentOmega,opponentExcitement);
                var currentValue = calculatePower(playerEgo,playerDef,playerAtk,playerClass,playerAlpha,playerBeta,playerOmega,playerExcitement,opponentName,opponentEgo,opponentDef,opponentAtk,opponentClass,opponentAlpha,opponentBeta,opponentOmega,opponentExcitement);
                //console.log("matchrating : "+currentValue);
                currentValue = currentValue.substring(1).replace(/\s+/g, '');
                //console.log(currentValue);
                currentValue = Number(currentValue);
                console.log(opponentName+':'+currentValue);
                if (scoreRating == -1 || scoreRating < currentValue)
                {
                    scoreRating = currentValue;
                    minID = index;
                    oppoName = opponentName;
                }
            }

            if (minID != -1 )
            {
                //location.href = document.getElementsByClassName("opponent_perform_button_container")[minID].children[0].getAttribute('href');
                console.log("Going to crush : "+oppoName);
                return true;
            }
        //}
        //catch(err)
        //{
        //    return ""
        //}
    }
    //     else if (page==="battle")
    //     {
    //         CrushThem();
    //     }
    else
    {
        // Switch to the correct screen
        console.log("Switching to Season screen.");
        gotoPage("season");
        return;
    }
};

var doBattle = function () {
    //console.log("Performing auto battle.");
    // Confirm if on correct screen.
    var page = getPage();
    if(page === "arena")
    {
        if ($("#arena[class='canvas']").length === 1) {
            // Oponent choose screen
            console.log("On opponent choose screen.");
            if(document.getElementById("popups").style.display === "block")
            {
                console.log("Popup detetcted. Refresh page.");
                unsafeWindow.reload();
                return;
            }
            else{
                console.log("No popups.");
            }

            var fought = sessionStorage.fought?sessionStorage.fought:0;
            console.log('already fought: '+fought);
            if(fought>=3)
            {
                console.log("No arena opponents found, storing nextArenaTime...")
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
                sessionStorage.fought=0;
                return;
            }
            //selbutton[0].click();
            sessionStorage.autoLoop = "false";
            sessionStorage.fought=Number(fought)+1;
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
        console.log("Switching to battle screen.");
        gotoPage("arena");
        return;
    }
};

var doLeagueBattle = function () {
    //console.log("Performing auto leagues.");
    // Confirm if on correct screen.
    var currentPower = getHero().infos.energy_challenge;
    var ltime;

    var page = getPage();
    if(page==='battle')
    {
        // On the battle screen.
        CrushThem();
    }
    else if(page === "leaderboard")
    {
        console.log("On leaderboard page.");
        // console.log('ls! '+$('h4.leagues').size());
        $('h4.leagues').each(function(){this.click();});
        var GetPlayerLineRank = $("tr[class=personal_highlight] td span")[0].innerText;
        if (isNaN(GetPlayerLineRank) && Number(Storage().autoLeaguesMaxRank) != 0)
        {
            console.log("Could not get current Rank, stopping League.");
            setTimer('nextLeaguesTime',Number(30*60)+1);
            return;
        }
        var currentRank = Number($("tr[class=personal_highlight] td span")[0].innerText);
        if(currentPower < 1)
        {
            console.log("No power for leagues.");
            for(var e in unsafeWindow.HHTimers.timers){
                try{
                    if(unsafeWindow.HHTimers.timers[e].type=="energy_challenge")
                        ltime=unsafeWindow.HHTimers.timers[e];
                }
                catch(e){}
            }
            ltime = Number(ltime.remainingTime)+15;
            setTimer('nextLeaguesTime',ltime);
            return;
        }

        if (currentRank <= Number(Storage().autoLeaguesMaxRank))
        {
            console.log("Max League rank reached, setting timer to 30 mins");
            setTimer('nextLeaguesTime',Number(30*60)+1);
            return;
        }


        while ($("span[sort_by='level'][select='asc']").size()==0)
        {
            console.log('resorting');
            $("span[sort_by='level']").each(function(){this.click()});
        }
        console.log('parsing enemies');
        var Data=[];
        $(".leadTable[sorting_table] tr").each(function(){if (this.cells[3].innerHTML==='0/3' || this.cells[3].innerHTML==='1/3' || this.cells[3].innerHTML==='2/3'){Data.push(this);}});
        if (Data.length==0)
        {
            ltime=35*60;
            console.log('No valid targets!');
            setTimer('nextLeaguesTime',ltime);
        }
        else
        {
            console.log(Data.length+' valid targets!');
            sessionStorage.autoLoop = "false";
            console.log("Hit?" );
            location.href = "/battle.html?league_battle=1&id_member=" + $(Data[0]).attr("sorting_id")
        }
    }
    else if (page==="battle")
    {
        CrushThem();
    }
    else
    {
        // Switch to the correct screen
        console.log("Switching to leagues screen.");
        gotoPage("leaderboard");
        return;
    }
};

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

        //console.log("On Battle Page.");
        if ($("#battle[class='canvas']").length === 1) {
            // Battle screen
            console.log("On battle screen.");
            // get button with no autofight, i.e. no koban
            var battleButton = $('#battle button[rel="launch"]:not(.autofight)');
            //console.log(battleButton.get());
            //console.log(battleButton);
            var currentPower = getHero().infos.energy_fight;
            if(battleButton === undefined){
                console.log("Battle Button was undefined. Disabling all auto-battle.");
                document.getElementById("autoBattleCheckbox").checked = false;
                document.getElementById("autoArenaCheckbox").checked = false;
                if (sessionStorage.questRequirement === "battle")
                {
                    document.getElementById("autoQuestCheckbox").checked = false;
                    console.log("Auto-quest disabled since it requires battle and auto-battle has errors.");
                }
                return;
            }
            var battle_price = battleButton.find('span').size()>0?battleButton.attr("price_fe"):0;

            if (location.search.split("league_battle=")[1])
            {
                currentPower=getHero().infos.energy_challenge;
            }
            if(battle_price === undefined){
                console.log("Could not detect battle button price. Error.");
                console.log("Disabling all auto-battle.");
                document.getElementById("autoBattleCheckbox").checked = false;
                document.getElementById("autoArenaCheckbox").checked = false;
                if (sessionStorage.questRequirement === "battle")
                {
                    document.getElementById("autoQuestCheckbox").checked = false;
                    console.log("Auto-quest disabled since it requires battle and auto-battle has errors.");
                }
                return;
            }
            console.log("battle price: "+battle_price+"P")
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

                if (sessionStorage.questRequirement === "battle") {
                    // Battle Done.
                    sessionStorage.questRequirement = "none";
                }

                location.href = "/home.html";
                return true;
            }
            else
            {
                // We need more power.
                console.log("Battle requires "+battle_price+" power.");
                sessionStorage.battlePowerRequired = battle_price;
                if(sessionStorage.questRequirement === "battle")sessionStorage.questRequirement = "P"+battle_price;
            }
        }
        else {
            console.log("Could not identify battle screen.");
            if (sessionStorage.questRequirement === "battle") sessionStorage.questRequirement = "errorInAutoBattle";
            return;
        }
    }
}

var setTimer=function(name, seconds)
{
    var ND=new Date().getTime() + seconds * 1000;
    Timers[name]=ND;
    sessionStorage.Timers=JSON.stringify(Timers);
    console.log(name+" set to "+toHHMMSS(ND/1000-new Date().getTimezoneOffset()*60)+' ('+ toHHMMSS(seconds)+')');
}

var clearTimer=function(name)
{
    delete Timers[name];
    sessionStorage.Timers=JSON.stringify(Timers);
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

var getSecondsLeft=function(name)
{
    if (!Timers[name])
    {
        return 0;
    }
    return Math.ceil(Timers[name]/1000)-Math.ceil(new Date().getTime()/1000);
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



var updateData = function () {
    //console.log("updating UI");

    var trollOptions = document.getElementById("autoTrollSelector");
    Storage().autoTrollSelectedIndex = trollOptions.selectedIndex;
    Storage().trollToFight = trollOptions.value;
    Storage().plusEvent = document.getElementById("plusEvent").checked;
    Storage().autoSalary = document.getElementById("autoSalaryCheckbox").checked;
    Storage().autoSalaryTimer = document.getElementById("autoSalaryTextbox").value;
    Storage().autoContest = document.getElementById("autoContestCheckbox").checked;
    Storage().autoMission = document.getElementById("autoMissionCheckbox").checked;
    Storage().autoPowerPlaces = document.getElementById("autoPowerPlaces").checked;
    Storage().autoPowerPlacesIndexFilter = document.getElementById("autoPowerPlacesIndexFilter").value;
    Storage().autoSalaryTimer = document.getElementById("autoSalaryTextbox").value;
    Storage().autoMissionC = document.getElementById("autoMissionCollect").checked;
    Storage().autoQuest = document.getElementById("autoQuestCheckbox").checked;
    Storage().autoTrollBattle = document.getElementById("autoBattleCheckbox").checked;
    Storage().eventTrollOrder = document.getElementById("eventTrollOrder").value;
    Storage().buyCombTimer = document.getElementById("buyCombTimer").value;
    Storage().autoArenaBattle = document.getElementById("autoArenaCheckbox").checked;
    Storage().autoSeason = document.getElementById("autoSeasonCheckbox").checked;
    Storage().autoLeagues = document.getElementById("autoLeagues").checked;
    Storage().autoLeaguesMaxRank = document.getElementById("autoLeaguesMaxRank").value;
    Storage().autoStats = document.getElementById("autoStats").value;
    Storage().paranoia = document.getElementById("paranoia").checked;
    Storage().autoFreePachinko = document.getElementById("autoFreePachinko").checked;
    Storage().autoExp = document.getElementById("autoExp").value;
    Storage().autoExpW = document.getElementById("autoExpW").checked;
    Storage().MaxExp = document.getElementById("maxExp").value;
    Storage().autoAff = document.getElementById("autoAff").value;
    Storage().autoAffW = document.getElementById("autoAffW").checked;
    Storage().MaxAff = document.getElementById("maxAff").value;
    Storage().autoLGM = document.getElementById("autoLGM").value;
    Storage().autoLGMW = document.getElementById("autoLGMW").checked;
    Storage().autoLGR = document.getElementById("autoLGR").value;
    Storage().autoLGRW = document.getElementById("autoLGRW").checked;
    Storage().autoEGM = document.getElementById("autoEGM").value;
    Storage().autoEGMW = document.getElementById("autoEGMW").checked;
    Storage().showInfo = document.getElementById("showInfo").checked;
    Storage().autoChamps = document.getElementById("autoChamps").checked;
    Storage().autoChampsUseEne = document.getElementById("autoChampsUseEne").checked;
    Storage().autoChampsFilter = document.getElementById("autoChampsFilter").value;

    Storage().spendKobans0 = document.getElementById("spendKobans0").checked;
    Storage().spendKobans1 = document.getElementById("spendKobans1").checked && Storage().spendKobans0=="true";
    document.getElementById("spendKobans1").checked=Storage().spendKobans1=="true";
    Storage().spendKobans2 = document.getElementById("spendKobans2").checked && Storage().spendKobans1=="true" && Storage().spendKobans0=="true"
    document.getElementById("spendKobans2").checked=Storage().spendKobans2=="true";

    Storage().buyCombat=document.getElementById("buyCombat").checked && Storage().spendKobans2=="true" && Storage().spendKobans1=="true" && Storage().spendKobans0=="true"
    document.getElementById("buyCombat").checked=Storage().buyCombat=="true";
    Storage().kobanBank=document.getElementById("kobanBank").value;

    localStorage.settPerTab = document.getElementById("settPerTab").checked;

    Storage().master=document.getElementById("master").checked;

    if (Storage().showInfo=="true")
    {
        var Tegzd='';
        Tegzd+='Master: '+(Storage().master==="true"?"ON":"OFF");
        if (Storage().paranoia=="true")
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+sessionStorage.pinfo+': '+getTimeLeft('paranoiaSwitch');
        }
        if (Storage().autoSalary=="true")
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'Salary check: '+getTimeLeft('nextSalaryTime');
        }
        if (Storage().autoArenaBattle=="true")
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'Arena fight: '+getTimeLeft('nextArenaTime');
        }
        if (Storage().autoSeason=="true")
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'Season kisses left: '+getHero().infos.energy_kiss;
        }
        if (Storage().autoLeagues=="true")
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'League fight: '+getTimeLeft('nextLeaguesTime');
        }
        if (Storage().autoChamps=="true")
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'Champions check: '+getTimeLeft('nextChampionTime');
        }
        // if (autoBuy())
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'Shop update: '+getTimeLeft('nextShopTime');
        }
        if (Storage().autoMission=="true")
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'Mission: '+getTimeLeft('nextMissionTime');
        }
        if (Storage().autoContest=="true")
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'Contest: '+getTimeLeft('nextContestTime');
        }
        if (Storage().autoPowerPlaces=="true")
        {
            var minTime=-1;
            var indexes=(Storage().autoPowerPlacesIndexFilter?Storage().autoPowerPlacesIndexFilter:"").split(";");


            for(var index=0;index<indexes.length;index++)
            {

                if (minTime == -1 || getSecondsLeft('nextPowerPlacesTime'+indexes[index]) < getSecondsLeft('nextPowerPlacesTime'+indexes[minTime]))
                {
                    minTime=index;
                }

            }
            if (minTime != -1)
            {
                Tegzd+=(Tegzd.length>0?'\r\n':'')+'PowerPlaces'+': '+getTimeLeft('nextPowerPlacesTime'+indexes[minTime]);
            }
        }
        if (Storage().autoFreePachinko=="true")
        {
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'Great Pachinko: '+getTimeLeft('nextPachinkoTime');
            Tegzd+=(Tegzd.length>0?'\r\n':'')+'Mythic Pachinko: '+getTimeLeft('nextPachinko2Time');
        }
        Tegzd+=(Tegzd.length>0?'\r\n':'')+'haveAff: '+sessionStorage.haveAff;
        Tegzd+=(Tegzd.length>0?'\r\n':'')+'haveExp: '+sessionStorage.haveExp;
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

var getPachinko = function(){
    try {
        if(!gotoPage("pachinko"))
        {
            // Not at Pachinko screen then goto the Pachinko screen.
            console.log("Navigating to Pachinko window.");
            return;
        }
        else {
            console.log("Detected Pachinko Screen. Fetching Pachinko");
            var counter=0;
            while ($('#playzone-replace-info button[free=1]')[0]===undefined && (counter++)<250)
            {
                $('.game-simple-block[type-pachinko=great]')[0].click();
            }
            //if ($('#playzone-replace-info button[free=1]')[0].style.display=="none")
            if ($('#playzone-replace-info button[free=1]')[0]===undefined)
            {
                console.log('Not ready yet');
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
        console.log("Could not collect Great Pachinko... " + ex);
    }
};

var getPachinko2 = function(){
    try {
        if(!gotoPage("pachinko"))
        {
            // Not at Pachinko screen then goto the Pachinko screen.
            console.log("Navigating to Pachinko window.");
            return;
        }
        else {
            console.log("Detected Pachinko Screen. Fetching Pachinko");
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
                console.log('to mythic');
                $('.game-simple-block[type-pachinko=mythic]')[0].click();
            }
            //if (butt===undefined)
            if ($('#playzone-replace-info button[free=1]')[0]===undefined)
            {
                //    console.log("Fuck my life!");
                //    setTimer('nextPachinko2Time',600);
                //    return false;
                console.log('Not ready yet');
            }
            else
            {
                $('#playzone-replace-info button[free=1]')[0].click();
            }
            //if (butt.className!="blue_button_L")
            //{
            //    console.log('Not ready yet');
            //}
            //else
            //{
            //    console.log('click');
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
        console.log("Could not collect Mythic Pachinko... " + ex);
    }
};

var updateShop=function()
{
    if(!gotoPage("shop"))
    {
        console.log("Navigating to Market window.");
        return true;
    }
    else {
        console.log("Detected Market Screen. Fetching Assortment");

        var assA=[];
        var assG=[];
        var assP=[];
        $('#shop div.armor .slot').each(function(){if (this.dataset.d)assA.push(JSON.parse(this.dataset.d));});
        $('#shop div.gift .slot').each(function(){if (this.dataset.d)assG.push(JSON.parse(this.dataset.d));});
        $('#shop div.potion .slot').each(function(){if (this.dataset.d)assP.push(JSON.parse(this.dataset.d));});

        var HaveAff=0;
        var HaveExp=0;
        $('#inventory div.gift .slot').each(function(){if (this.dataset.d) { var d=JSON.parse(this.dataset.d); HaveAff+=d.count*d.value;}});
        $('#inventory div.potion .slot').each(function(){if (this.dataset.d) { var d=JSON.parse(this.dataset.d); HaveExp+=d.count*d.value;}});

        sessionStorage.haveAff=HaveAff;
        sessionStorage.haveExp=HaveExp;

        console.log('counted',sessionStorage.haveAff,sessionStorage.haveExp);

        sessionStorage.storeContents = JSON.stringify([assA,assG,assP]);
        sessionStorage.charLevel=getHero().infos.level;

        var nshop;
        for(var e in unsafeWindow.HHTimers.timers){
            if(unsafeWindow.HHTimers.timers[e].$elm && unsafeWindow.HHTimers.timers[e].$elm.selector.startsWith(".shop_count"))
                nshop=unsafeWindow.HHTimers.timers[e].remainingTime;
        }
        if(nshop !== undefined && nshop !== 0)
        {
            console.log(nshop);
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

var flipParanoia=function()
{
    var burst=getBurst();

    var Setting=Storage().paranoiaSettings;

    var S1=Setting.split('/').map(s=>s.split('|').map(s=>s.split(':')));

    var toNextSwitch;
    var period;
    var n = new Date().getHours();
    S1[2].some(x => {if (n<x[0]) {period=x[1]; return true;}});

    if (burst && getHero().infos.energy_fight!=0 && Storage().autoTrollBattle=='true') //double(or more) burst if we want to fight
    {
        burst=false;
    }

    if (burst)
    {
        //going into hiding
        sessionStorage.burst="false";

        var periods=Object.assign(...S1[1].map(d => ({[d[0]]: d[1].split('-')})));

        toNextSwitch=randomInterval(Number(periods[period][0]),Number(periods[period][1]));
        if (toNextSwitch<=1800 && Storage().autoArenaBattle == "true")
        {
            var sl=getSecondsLeft("nextArenaTime");
            toNextSwitch=toNextSwitch<sl?toNextSwitch:sl;
        }
    }
    else
    {
        //if (getPage()!='home') return;
        //going to work
        sessionStorage.autoLoop = "false";
        sessionStorage.burst="true";
        var b=S1[0][0][0].split('-');
        toNextSwitch=randomInterval(Number(b[0]),Number(b[1]));
    }
    var ND=new Date().getTime() + toNextSwitch * 1000;
    var offs=new Date().getTimezoneOffset();
    var message=period+(burst?" rest":" burst");
    console.log("PARANOIA: "+message);
    sessionStorage.pinfo=message;

    setTimer('paranoiaSwitch',toNextSwitch);
    if (sessionStorage.burst=="true")
    {
        if (hh_nutaku)
        {
            window.top.postMessage({reloadMe:true},'*');
        }
        else
        {
            window.top.location.reload();
        }
    }
}

var autoLoop = function () {
    updateData();
    if (!sessionStorage.questRequirement)
    {
        sessionStorage.questRequirement="none";
    }
    if (!sessionStorage.userLink)
    {
        sessionStorage.userLink="none"
    }
    if (!sessionStorage.battlePowerRequired)
    {
        sessionStorage.battlePowerRequired="0";
    }

    var busy = false;
    var page = window.location.href;
    var currentPower = getHero().infos.energy_fight;

    var burst=getBurst();

    if (burst /*|| checkTimer('nextMissionTime')*/)
    {
        if(Storage().autoFreePachinko === "true" && busy === false){
            // Navigate to pachinko

            if (checkTimer("nextPachinkoTime")) {
                console.log("Time to fetch Great Pachinko.");
                getPachinko();
                busy = true;
            }
            if (checkTimer("nextPachinko2Time")) {
                console.log("Time to fetch Mythic Pachinko.");
                getPachinko2();
                busy = true;
            }
        }
        if(Storage().autoLeagues === "true" && getHero().infos.level>=20 && busy === false ){
            // Navigate to leagues
            if (checkTimer('nextLeaguesTime')) {
                console.log("Time to fight in Leagues.");
                doLeagueBattle();
                busy = true;
            }
        }
        if(Storage().autoContest === "true" && busy === false){
            if (checkTimer('nextContestTime') || unsafeWindow.has_contests_datas ||$(".contest .ended button[rel='claim']").size()>0){
                console.log("Time to get contest rewards.");
                busy = doContestStuff();
            }
        }
        if(Storage().autoPowerPlaces === "true" && busy === false){
            var indexes=(Storage().autoPowerPlacesIndexFilter?Storage().autoPowerPlacesIndexFilter:"").split(";");
            for(var index=0;index<indexes.length;index++)
            {
                if (checkTimer('nextPowerPlacesTime'+indexes[index]) && busy === false){
                    console.log("Time to do PowerPlaces"+indexes[index]+".");
                    busy = doPowerPlacesStuff(indexes[index]);
                }
            }
        }
        if(Storage().autoMission === "true" && busy === false){
            if (checkTimer('nextMissionTime')){
                console.log("Time to do missions.");
                busy = doMissionStuff();
            }
        }
        if (Storage().autoQuest === "true" && busy === false ) {
            if (sessionStorage.questRequirement === "battle" && Storage().autoTrollBattleSaveQuest === "false") {
                console.log("Quest requires battle.");
                console.log("prepare to save one battle for quest");
                Storage().autoTrollBattleSaveQuest = "true";
                doBossBattle();
                busy = false;
            }
            else if (sessionStorage.questRequirement[0] === '$') {
                if (Number(sessionStorage.questRequirement.substr(1)) < getHero().infos.soft_currency) {
                    // We have enough money... requirement fulfilled.
                    console.log("Continuing quest, required money obtained.");
                    sessionStorage.questRequirement = "none";
                    proceedQuest();
                    busy = false;
                }
                else {
                    if(isNaN(sessionStorage.questRequirement.substr(1)))
                    {
                        console.log(sessionStorage.questRequirement);
                        sessionStorage.questRequirement = "none";
                        console.log("Invalid money in session storage quest requirement !");
                    }
                    else{
                        // Else we need more money.
                        //console.log("Need money for quest, cannot continue. Turning ON AutoSalary.");
                        Storage().autoQuest = "true";
                    }
                    busy = false;
                }
            }
            else if (sessionStorage.questRequirement[0] === '*') {
                var energyNeeded = Number(sessionStorage.questRequirement.substr(1));
                var energyCurrent = getHero().infos.energy_quest;
                if (energyNeeded <= energyCurrent) {
                    // We have enough energy... requirement fulfilled.
                    console.log("Continuing quest, required energy obtained.");
                    sessionStorage.questRequirement = "none";
                    proceedQuest();
                    busy = true;
                }
                // Else we need energy, just wait.
                else {
                    busy = false;
                    //console.log("Replenishing energy for quest.(" + energyNeeded + " needed)");
                }
            }
            else if (sessionStorage.questRequirement[0] === 'P')
            {
                // Battle power required.
                var neededPower = Number(sessionStorage.questRequirement.substr(1));
                if(currentPower < neededPower)
                {
                    console.log("Quest requires "+neededPower+" Battle Power for advancement. Waiting...");
                    busy = false;
                }
                else
                {
                    console.log("Battle Power obtained, resuming quest...");
                    sessionStorage.questRequirement = "none";
                    proceedQuest();
                    busy = true;
                }
            }
            else if (sessionStorage.questRequirement === "unknownQuestButton") {
                console.log("AutoQuest disabled.AutoQuest cannot be performed due to unknown quest button. Please manually proceed the current quest screen.");
                document.getElementById("autoQuestCheckbox").checked = false;
                Storage().autoQuest = "false";
                sessionStorage.questRequirement = "none";
                busy = false;
            }
            else if (sessionStorage.questRequirement === "errorInAutoBattle") {
                console.log("AutoQuest disabled.AutoQuest cannot be performed due errors in AutoBattle. Please manually proceed the current quest screen.");
                document.getElementById("autoQuestCheckbox").checked = false;
                Storage().autoQuest = "false";
                sessionStorage.questRequirement = "none";
                busy = false;
            }
            else if(sessionStorage.questRequirement === "none")
            {
                //console.log("NONE req.");
                busy = true;
                proceedQuest();
            }
            else
            {
                console.log("Invalid quest requirement : "+sessionStorage.questRequirement);
                busy=false;
            }
        }
        else if(Storage().autoQuest === "false"){sessionStorage.questRequirement = "none";}

        if(Storage().autoArenaBattle === "true" && busy === false)
        {
            if (/*unsafeWindow.arena_data && unsafeWindow.arena_data.active_opponent*/$('a[rel=arena] span.button-notification-icon').size()>0)
            {
                console.log('Missed one in arena!');
                setTimer('nextArenaTime',0);
            }
            if(checkTimer("nextArenaTime"))
            {
                console.log("Time to fight in arena.");
                doBattle();
                busy = true;
            }
        }
        if(Storage().autoSeason === "true" && busy === false && getHero().infos.energy_kiss)
        {
            console.log("Time to fight in Season.");
            doSeason();
            busy = true;

        }



        if(Storage().autoTrollBattle === "true" && getHero().infos.questing.id_world>0)
        {
            if(busy === false && currentPower >= Number(sessionStorage.battlePowerRequired) && currentPower > 0)
            {
                sessionStorage.battlePowerRequired = "0";
                busy = true;
                if(Storage().autoQuest === "true")
                {
                    if(sessionStorage.questRequirement[0] === 'P')
                    {
                        console.log("AutoBattle disabled for power collection for AutoQuest.");
                        document.getElementById("autoBattleCheckbox").checked = false;
                        Storage().autoTrollBattle = "false";
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
        else{sessionStorage.battlePowerRequired = "0";}

        var ECt= getHero().infos.energy_quest;
        if (ECt>=60 && (Storage().autoChampsUseEne==="true"))
        {
            console.log('Buying ticket with energy');
            var amount = 1;
            var currency = 'energy_quest';
            var params = {
                namespace: 'h\\Champions',
                class: 'Champions',
                action: 'buy_ticket',
                currency: currency,
                amount: amount
            };

            hh_ajax(params, function(data) {
                anim_number($('.tickets_number_amount'), data.tokens - amount, amount);
                Hero.updates(data.heroChangesUpdate);
            });
        }

        if (busy==false && Storage().autoChamps==="true" && checkTimer('nextChampionTime'))
        {
            console.log("Time to check on champions!");
            busy=doChampionStuff();
        }

        if (/*autoBuy() &&*/ busy===false)
        {
            if (sessionStorage.charLevel===undefined)
            {
                sessionStorage.charLevel=0;
            }
            if (checkTimer('nextShopTime') || sessionStorage.charLevel<getHero().infos.level) {
                console.log("Time to check shop.");
                busy = updateShop();
            }
        }

        if (Storage().autoSalary === "true" && busy === false) {
            if (checkTimer("nextSalaryTime")) {
                console.log("Time to fetch salary.");
                busy = getSalary();
            }
        }

        if(busy === true && sessionStorage.userLink==="none" && !window.location.pathname.startsWith("/quest"))
        {
            sessionStorage.userLink = page;
        }
        else if(sessionStorage.userLink !=="none" && busy === false)
        {
            console.log("Restoring page "+sessionStorage.userLink);
            window.location = sessionStorage.userLink;
            sessionStorage.userLink = "none";
        }
    }

    if(Storage().paranoia === "true" && Storage().master==="true"){
        if (checkTimer("paranoiaSwitch")) {
            flipParanoia();
        }
    }

    if(isNaN(Storage().autoLoopTimeMili)){
        console.log("AutoLoopTimeMili is not a number.");
        setDefaults();
    }
    else{
        if (sessionStorage.autoLoop === "true") setTimeout(autoLoop, Number(localStorage.autoLoopTimeMili));
        else console.log("autoLoop Disabled");
    }
};

var setDefaults = function () {
    console.log("Setting Defaults.");
    Storage().autoSalary = "false";
    Storage().autoSalaryTimer = "120";
    Storage().autoContest = "false";
    Storage().autoMission = "false";
    Storage().autoPowerPlaces = "false";
    Storage().autoPowerPlacesIndexFilter = "1;2;3";
    Storage().autoMissionC = "false";
    Storage().autoLeagues = "false";
    Storage().autoLeaguesMaxRank = "0";
    Storage().autoStats = "500000000";
    sessionStorage.autoLoop = "true";
    sessionStorage.userLink = "none";
    Storage().autoLoopTimeMili = "500";
    Storage().autoQuest = "false";
    Storage().autoTrollBattle = "false";
    Storage().eventTrollOrder="";
    Storage().buyCombTimer="16";
    Storage().autoArenaBattle = "false";
    Storage().autoSeason = "false";
    sessionStorage.battlePowerRequired = "0";
    sessionStorage.questRequirement = "none";
    Storage().freshStart = "no";
    Storage().autoChamps="false";
    Storage().autoChampsUseEne="false";
    Storage().autoChampsFilter="1;2;3;4;5;6";
    Storage().autoFreePachinko = "false";
    Storage().autoExp = "500000000";
    Storage().autoExpW = "false";
    Storage().MaxExp = "10000";
    Storage().autoAff = "500000000";
    Storage().autoAffW = "false";
    Storage().MaxAff = "50000";
    Storage().autoLGM = "500000000";
    Storage().autoLGMW = "false";
    Storage().autoLGR = "500000000";
    Storage().autoLGRW = "false";
    Storage().autoEGM = "500000000";
    Storage().autoEGMW = "false";
    Storage().paranoia="false";
    Storage().showInfo="true";
    Storage().spendKobans0="false";
    Storage().paranoiaSettings="120-300/Sleep:28800-29400|Active:300-420|Casual:1800-2100/6:Sleep|18:Active|22:Casual|24:Sleep";
    Storage().master="false";
};

var CollectEventData=function()
{
    if (unsafeWindow.event_data)
    {
        var timeLeft=event_data.seconds_until_event_end;
        setTimer('eventGoing',timeLeft);
        var Trollz=[];
        for (var i=0;i<event_data.girls.length;i++)
        {
            if (!event_data.girls[i].owned_girl && event_data.girls[i].troll)
            {
                if (Number(event_data.girls[i].troll.id_troll)<getHero().infos.questing.id_world)
                {
                    Trollz.push(Number(event_data.girls[i].troll.id_troll));
                }
            }
        }

        var Priority=(Storage().eventTrollOrder?Storage().eventTrollOrder:"").split(";");
        console.log(Priority);
        console.log(Trollz);
        if (Trollz.length>0)
        {
            if (Priority[0]!='')
            {
                var found=false;
                for (var n=0;n<Priority.length;n++)
                {
                    if (Trollz.includes(Number(Priority[n])))
                    {
                        console.log("ET: "+Priority[n]);
                        sessionStorage.eventTroll=Number(Priority[n]);
                        found=true;
                        break;
                    }
                }
                if (!found)
                {
                    delete sessionStorage.eventTroll;
                    //sessionStorage.eventTroll=Trollz.sort((a,b)=>{return a-b;})[0];
                }
            }
            else
            {
                sessionStorage.eventTroll=Trollz.sort((a,b)=>{return a-b;})[0];
            }
        }
        else
        {
            delete sessionStorage.eventTroll;
        }
        //console.log('WTF?');
        if (Storage().buyCombat=="true" && Storage().plusEvent=="true")
        {
            //console.log('WTF!');
            var diff=Math.ceil(Timers["eventGoing"]/1000)-Math.ceil(new Date().getTime()/1000);
            //console.log(diff);
            var hero=getHero();
            if (diff<Storage().buyCombTimer*3600 && sessionStorage.eventTroll && hero.infos.energy_fight==0)//Less than 20 hours remains and we still haven't get all troll girls
            {
                var price=hero.get_recharge_cost("fight");
                //console.log('PRC: '+price);
                if (hero.infos.hard_currency>=price+Number(Storage().kobanBank))
                {
                    console.log('Buying comb');
                    RechargeCombat(price);
                }
            }
        }
        return true;
    }
    console.log('no  event');
    return false;
}

var RechargeCombat=function(price) {
    hh_ajax(
        {
            class: "Hero",
            action: "recharge",
            type: "fight"
        }, function(data) {
            Hero.update("energy_fight", Hero.infos["energy_fight_max"]);
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
        if (document.getElementById('sMenu').parentElement.style.display=='block')
        {
            return false;
        }
    }
    return Storage().master==="true"&&(!(Storage().paranoia==="true") || sessionStorage.burst==="true");
}

var Trollz=["Latest","Dark Lord","Ninja Spy","Gruntt","Edwarda","Donatien","Silvanus","Bremen","Finalmecia","Roko Senseï","Karole","Jackson\'s Crew","Pandora witch"];
var Timers={};

var start = function () {

    if (unsafeWindow.Hero===undefined)
    {
        console.log('???no Hero???');
        $('.hh_logo').click();
        return;
    }
    $('.redirect.gayharem').hide();

    $('#starter_offer').hide();
    $('#starter_offer_background').hide();
    if (sessionStorage.Timers)
    {
        Timers=JSON.parse(sessionStorage.Timers);
    }
    // Add UI buttons.
    var UIcontainer = $("#contains_all nav div[rel='content']");
    UIcontainer.html( '<div style="font-size:x-small;position: absolute;right: 22%;width: inherit;text-align: center;display:flex;flex-direction:column;z-index:1000" id="sMenu">'
                     + '<div style="display:flex;flex-direction:row;">'
                     +  '<div style="padding:10px; display:flex;flex-direction:column;">'
                     +   '<span>Master switch</span><div><label class=\"switch\" title=\"Turn off to pause script\"><input id=\"master\" type=\"checkbox\"><span class=\"slider round\"></span></label></div>'
                     +   '<span>Questionable Shit</span><div><label class=\"switch\"><input id=\"spendKobans0\" type=\"checkbox\"><span class=\"slider round\"></span></label></div>'
                     +   '<span>Are you sure?</span><div><label class=\"switch\"><input id=\"spendKobans1\" type=\"checkbox\"><span class=\"slider round\"></span></label></div>'
                     +   '<span>You\'ve been warned</span><div><label class=\"switch\"><input id=\"spendKobans2\" type=\"checkbox\"><span class=\"slider round\"></span></label></div>'
                     +   '<span>Buy comb. in events</span><div><label class=\"switch\"><input id=\"buyCombat\" type=\"checkbox\"><span class=\"slider round\"></span></label><input id="kobanBank" type="text"></div>'
                     +   '<span>Hours to buy Comb</span><div><input id="buyCombTimer" style="width:80%" type="text"></div>'
                     +   '<span>Event Troll Order</span><div><input id="eventTrollOrder" style="width:80%" type="text"></div>'
                     +  '</div>'
                     +  '<div style="padding:10px; display:flex;flex-direction:column;">'
                     +   '<span>Settings per tab</span><div><label class=\"switch\"><input id=\"settPerTab\" type=\"checkbox\"><span class=\"slider round\"></span></label></div>'
                     +   '<div style="display:flex;flex-direction:row;">'
                     +    '<div style="padding:10px; display:flex;flex-direction:column;">'
                     +     '<span>AutoSal.</span><div><label class=\"switch\"><input id=\"autoSalaryCheckbox\" type=\"checkbox\"><span class=\"slider round\"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding:10px; display:flex;flex-direction:column;">'
                     +     '<span>min wait</span><div><input id="autoSalaryTextbox" style="width:80%" type="text"></div>'
                     +    '</div>'
                     +   '</div>'
                     +   '<span>AutoContest</span><div><label class=\"switch\"><input id=\"autoContestCheckbox\" type=\"checkbox\"><span class=\"slider round\"></span></label></div>'
                     +   '<div style="display:flex;flex-direction:row;">'
                     +    '<div style="padding:10px; display:flex;flex-direction:column;">'
                     +     '<span>AutoMission</span><div><label class=\"switch\"><input id=\"autoMissionCheckbox\" type=\"checkbox\"><span class=\"slider round\"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding:10px; display:flex;flex-direction:column;">'
                     +     '<span>Collect</span><div><label class=\"switch\"><input id=\"autoMissionCollect\" type=\"checkbox\"><span class=\"slider round\"></span></label></div>'
                     +    '</div>'
                     +   '</div>'
                     +   '<span>AutoQuest</span><div><label class=\"switch\"><input id=\"autoQuestCheckbox\" type=\"checkbox\"><span class=\"slider round\"></span></label></div>'
                     +   '<div style="display:flex;flex-direction:row;">'
                     +    '<div style="padding:10px; display:flex;flex-direction:column;">'
                     +     '<span>AutoTrollBattle</span><div><label class=\"switch\"><input id=\"autoBattleCheckbox\" type=\"checkbox\"><span class=\"slider round\"></span></label><select id=\"autoTrollSelector\"></select></div>'
                     +    '</div>'
                     +    '<div style="padding:10px; display:flex;flex-direction:column;">'
                     +     '<span>+Event</span><div><label class=\"switch\"><input id=\"plusEvent\" type=\"checkbox\"><span class=\"slider round\"></span></label></div>'
                     +    '</div>'
                     +   '</div>'
                     +   '<span>AutoArenaBattle</span><div><label class=\"switch\"><input id=\"autoArenaCheckbox\" type=\"checkbox\"><span class=\"slider round\"></span></label></div>'
                     +   '<span>AutoSeason</span><div><label class=\"switch\"><input id=\"autoSeasonCheckbox\" type=\"checkbox\"><span class=\"slider round\"></span></label></div>'
                     +   '<span>AutoPachinko(Free)</span><div><label class=\"switch\"><input id=\"autoFreePachinko\" type=\"checkbox\"><span class=\"slider round\"></span></label></div>'
                     +   '<span>Paranoia mode</span><div><label class=\"switch\"><input id=\"paranoia\" type=\"checkbox\"><span class=\"slider round\"></span></label></div>'
                     +  '</div>'
                     +  '<div style="padding:10px; display:flex;flex-direction:column;">'
                     +   '<div style="display:flex;flex-direction:row;">'
                     +    '<div style="padding:10px; display:flex;flex-direction:column;">'
                     +     '<span>AutoLeagues</span><div><label class=\"switch\"><input id=\"autoLeagues\" type=\"checkbox\"><span class=\"slider round\"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding:10px; display:flex;flex-direction:column;">'
                     +     '<span>Max rank (0 for none)</span><div><input id="autoLeaguesMaxRank" type="text"></div>'
                     +    '</div>'
                     +   '</div>'
                     +   '<div style="display:flex;flex-direction:row;">'
                     +    '<div style="padding:10px; display:flex;flex-direction:column;">'
                     +     '<span>AutoPowerPlaces</span><div><label class=\"switch\"><input id=\"autoPowerPlaces\" type=\"checkbox\"><span class=\"slider round\"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding:10px; display:flex;flex-direction:column;">'
                     +     '<span>Index Filter</span><div><input id="autoPowerPlacesIndexFilter" type="text"></div>'
                     +    '</div>'
                     +   '</div>'
                     +   '<div style="display:flex;flex-direction:row;">'
                     +    '<div style="padding:10px; display:flex;flex-direction:column;">'
                     +     '<span>AutoChampions</span><div><label class=\"switch\"><input id=\"autoChamps\" type=\"checkbox\"><span class=\"slider round\"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding:10px; display:flex;flex-direction:column;">'
                     +     '<span>UseEne</span><div><label class=\"switch\"><input id=\"autoChampsUseEne\" type=\"checkbox\"><span class=\"slider round\"></span></label></div>'
                     +    '</div>'
                     +    '<div style="padding:10px; display:flex;flex-direction:column;">'
                     +     '<span>Filter</span><div><input id="autoChampsFilter" type="text"></div>'
                     +    '</div>'
                     +   '</div>'
                     +   '<span>AutoStats</span><div><input id="autoStats" type="text"></div>'
                     +   '<span>Buy Exp</span><div style="width:200px"><label class=\"switch\"><input id=\"autoExpW\" type=\"checkbox\"><span class=\"slider round\"></span></label><input id="autoExp" style="width:50%" type="text"><input id="maxExp" style="width:30%" type="text"></div>'
                     +   '<span>Buy Aff</span><div style="width:200px"><label class=\"switch\"><input id=\"autoAffW\" type=\"checkbox\"><span class=\"slider round\"></span></label><input id="autoAff" style="width:50%" type="text"><input id="maxAff" style="width:30%" type="text"></div>'
                     +   '<span>Buy Leg Gear Mono</span><div><label class=\"switch\"><input id=\"autoLGMW\" type=\"checkbox\"><span class=\"slider round\"></span></label><input id="autoLGM" type="text"></div>'
                     +   '<span>Buy Leg Gear Rainbow</span><div><label class=\"switch\"><input id=\"autoLGRW\" type=\"checkbox\"><span class=\"slider round\"></span></label><input id="autoLGR" type="text"></div>'
                     +   '<span>Buy Epi Gear Mono</span><div><label class=\"switch\"><input id=\"autoEGMW\" type=\"checkbox\"><span class=\"slider round\"></span></label><input id="autoEGM" type="text"></div>'
                     +   '<span>Show info</span><div><label class=\"switch\"><input id=\"showInfo\" type=\"checkbox\"><span class=\"slider round\"></span></label></div>'
                     +  '</div>'
                     + '</div>'
                     +'</div>'+UIcontainer.html());

    var div = document.createElement('div');
    div.innerHTML = '<div id="pInfo" style="padding-left:3px;z-index:-1;white-space: pre;position: absolute;right: 5%; left:70%; top:8%;border: 1px solid #ffa23e;background-color: rgba(0,0,0,.5);border-radius: 5px;"></div>'.trim();
    document.getElementById('contains_all').appendChild(div.firstChild);

    // Add auto troll options
    var trollOptions = document.getElementById("autoTrollSelector");

    for (var i=0;i<unsafeWindow.Hero.infos.questing.id_world;i++)
    {
        var option = document.createElement("option");
        option.value=i;
        option.text = Trollz[i];
        trollOptions.add(option);
    };

    document.getElementById("settPerTab").checked = localStorage.settPerTab === "true";
    trollOptions.selectedIndex = Storage().autoTrollSelectedIndex;
    document.getElementById("autoSalaryCheckbox").checked = Storage().autoSalary === "true";
    document.getElementById("autoSalaryTextbox").value = Storage().autoSalaryTimer?Storage().autoSalaryTimer:"120";
    document.getElementById("autoContestCheckbox").checked = Storage().autoContest === "true";
    document.getElementById("autoMissionCheckbox").checked = Storage().autoMission === "true";
    document.getElementById("autoMissionCollect").checked = Storage().autoMissionC === "true";
    document.getElementById("autoQuestCheckbox").checked = Storage().autoQuest === "true";
    document.getElementById("autoBattleCheckbox").checked = Storage().autoTrollBattle === "true";
    document.getElementById("eventTrollOrder").value = Storage().eventTrollOrder?Storage().eventTrollOrder:"1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20";
    document.getElementById("buyCombTimer").value = Storage().buyCombTimer?Storage().buyCombTimer:"16";
    document.getElementById("autoArenaCheckbox").checked = Storage().autoArenaBattle === "true";
    document.getElementById("autoSeasonCheckbox").checked = Storage().autoSeason === "true";
    document.getElementById("autoFreePachinko").checked = Storage().autoFreePachinko === "true";
    document.getElementById("autoLeagues").checked = Storage().autoLeagues === "true";
    document.getElementById("autoLeaguesMaxRank").value = Storage().autoLeaguesMaxRank?Storage().autoLeaguesMaxRank:"0";
    document.getElementById("autoPowerPlaces").checked = Storage().autoPowerPlaces === "true";
    document.getElementById("autoPowerPlacesIndexFilter").value = Storage().autoPowerPlacesIndexFilter?Storage().autoPowerPlacesIndexFilter:"1;2;3";
    document.getElementById("autoStats").value = Storage().autoStats?Storage().autoStats:"500000000";
    document.getElementById("paranoia").checked = Storage().paranoia==="true";
    document.getElementById("autoExp").value = Storage().autoExp?Storage().autoExp:"500000000";
    document.getElementById("autoExpW").checked = Storage().autoExpW === "true";
    document.getElementById("autoAff").value = Storage().autoAff?Storage().autoAff:"500000000";
    document.getElementById("autoAffW").checked = Storage().autoAffW === "true";
    document.getElementById("maxExp").value = Storage().MaxExp?Storage().MaxExp:"10000";
    document.getElementById("maxAff").value = Storage().MaxAff?Storage().MaxAff:"50000";
    document.getElementById("autoLGM").value = Storage().autoLGM?Storage().autoLGM:"500000000";
    document.getElementById("autoLGMW").checked = Storage().autoLGMW === "true";
    document.getElementById("autoLGR").value = Storage().autoLGR?Storage().autoLGR:"500000000";
    document.getElementById("autoLGRW").checked = Storage().autoLGRW === "true";
    document.getElementById("autoEGM").value = Storage().autoEGM?Storage().autoEGM:"500000000";
    document.getElementById("autoEGMW").checked = Storage().autoEGMW === "true";
    document.getElementById("showInfo").checked = Storage().showInfo === "true";
    document.getElementById("plusEvent").checked = Storage().trollToFight=="-1" || Storage().plusEvent === "true";

    document.getElementById("autoChamps").checked = Storage().autoChamps === "true";
    document.getElementById("autoChampsUseEne").checked = Storage().autoChampsUseEne === "true";
    document.getElementById("autoChampsFilter").value = Storage().autoChampsFilter?Storage().autoChampsFilter:"1;2;3;4;5;6";

    document.getElementById("spendKobans0").checked = Storage().spendKobans0 === "true";
    document.getElementById("spendKobans1").checked = Storage().spendKobans1 === "true";
    document.getElementById("spendKobans2").checked = Storage().spendKobans2 === "true";
    document.getElementById("buyCombat").checked = Storage().buyCombat === "true";
    document.getElementById("kobanBank").value = Storage().kobanBank?Storage().kobanBank:"1000000";

    document.getElementById("master").checked = Storage().master!=="false";

    sessionStorage.autoLoop = "true";
    if (typeof Storage().freshStart == "undefined" || isNaN(Number(Storage().autoLoopTimeMili))) {
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
    if (Storage().autoStats === "true" && getBurst())
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
            if (sessionStorage.autoLoop=="true")
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
