import {
    RewardHelper,
    canCollectCompetitionActive,
    convertTimeToInt,
    deleteStoredValue,
    getHHScriptVars,
    getPage,
    getStoredValue,
    randomInterval,
    setStoredValue,
    setTimer
} from "../Helper";
import { gotoPage } from "../Service";
import { logHHAuto } from "../Utils";

export class Missions {
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
    static run() {
        // returns boolean to set busy
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
            if(RewardHelper.closeRewardPopupIfAny()) {
                return true;
            }
            let canCollect = getStoredValue("HHAuto_Setting_autoMissionCollect") ==="true" && $(".mission_button button:visible[rel='claim']").length >0 && canCollectCompetitionActive();
            if (canCollect)
            {
                logHHAuto("Collecting finished mission's reward.");
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
                            logHHAuto("Unfinished mission detected...("+data.remaining_time+"sec. remaining)");
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
                            logHHAuto("Unclaimed mission detected...");
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

                if (toAdd) missions.push(data);
            });
            if(!allGood && canCollect)
            {
                logHHAuto("Something went wrong, need to retry in 15secs.");
                setTimer('nextMissionTime',15);
                return true;
            }
            if (!allGood) {
                logHHAuto("Mission ongoing waiting it ends.");
                return true;
            }
            logHHAuto("Missions parsed, mission list is:", missions);
            if(missions.length > 0)
            {
                logHHAuto("Selecting mission from list.");
                var mission = Missions.getSuitableMission(missions);
                logHHAuto("Selected mission to be started (duration: "+mission.duration+"sec):");
                logHHAuto(mission);
                var missionButton = $(mission.missionObject).find("button:visible[rel='mission_start']").first();
                if(missionButton.length > 0) {
                    missionButton.click();
                    gotoPage(getHHScriptVars("pagesIDMissions"),{},randomInterval(1300,1800));
                    setTimer('nextMissionTime',Number(mission.duration)+1);
                }
                else {
                    logHHAuto("Something went wrong, no start button");
                    setTimer('nextMissionTime',15);
                    return true;
                }
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
    static styles() {
        if(getStoredValue("HHAuto_Setting_compactMissions") === "true")
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
                + 'left:145px;'
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