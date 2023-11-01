import {
    RewardHelper,
    TimeHelper,
    checkTimer,
    convertTimeToInt,
    getHHScriptVars,
    getLimitTimeBeforeEnd,
    getPage,
    getSecondsLeft,
    getStoredValue,
    randomInterval,
    setStoredValue,
    setTimer } from "../../Helper";
    import { gotoPage } from "../../Service";
    import { isJSON, logHHAuto } from "../../Utils";
import { HHStoredVarPrefixKey } from "../../config";
import { EventModule } from "./EventModule";

export class PathOfGlory {
    static getRemainingTime(){
        const poGTimerRequest = '#pog_tab_container > div.potions-paths-first-row .potions-paths-timer span[rel=expires]';
    
        if ( $(poGTimerRequest).length > 0 && (getSecondsLeft("PoGRemainingTime") === 0 || getStoredValue(HHStoredVarPrefixKey+"Temp_PoGEndDate") === undefined) )
        {
            const poGTimer = Number(convertTimeToInt($(poGTimerRequest).text()));
            setTimer("PoGRemainingTime",poGTimer);
            setStoredValue(HHStoredVarPrefixKey+"Temp_PoGEndDate",Math.ceil(new Date().getTime()/1000)+poGTimer);
        }
    }
    static displayRemainingTime()
    {
        EventModule.displayGenericRemainingTime("#scriptPogTime", "path-of-glory", "HHAutoPoGTimer", "PoGRemainingTime", HHStoredVarPrefixKey+"Temp_PoGEndDate");
    }
    static goAndCollect()
    {
        const rewardsToCollect = isJSON(getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoGCollectablesList"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoGCollectablesList")):[];

        if (getPage() === getHHScriptVars("pagesIDPoG"))
        {
            PathOfGlory.getRemainingTime();
            const pogEnd = getSecondsLeft("PoGRemainingTime");
            logHHAuto("PoG end in " + TimeHelper.debugDate(pogEnd));

            if (checkTimer('nextPoGCollectAllTime') && pogEnd < getLimitTimeBeforeEnd() && getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoGCollectAll") === "true")
            {
                if ($(getHHScriptVars("selectorClaimAllRewards")).length > 0)
                {
                    logHHAuto("Going to collect all POG item at once.");
                    setTimeout(function (){
                        $(getHHScriptVars("selectorClaimAllRewards"))[0].click();
                        setTimer('nextPoGCollectAllTime',getHHScriptVars("maxCollectionDelay") + randomInterval(60,180)); // Add timer to check again later if there is new items to collect
                        setTimeout(function (){gotoPage(getHHScriptVars("pagesIDHome"));},500);
                    },500);
                    return true;
                }
                else
                {
                    setTimer('nextPoGCollectAllTime',getHHScriptVars("maxCollectionDelay") + randomInterval(60,180));
                }
            }
            if (checkTimer('nextPoGCollectTime') && (getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoGCollect") === "true" || getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoGCollectAll") === "true"))
            {
                logHHAuto("Checking Path of Glory for collectable rewards.");
                logHHAuto("setting autoloop to false");
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
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
                            setTimer('nextPoGCollectTime',getHHScriptVars("maxCollectionDelay") + randomInterval(60,180));
                            gotoPage(getHHScriptVars("pagesIDHome"));
                        }
                    }
                    collectPoGRewards();
                    return true;
                }
                else
                {
                    logHHAuto("No Path of Glory reward to collect.");
                    setTimer('nextPoGCollectTime',getHHScriptVars("maxCollectionDelay") + randomInterval(60,180));
                    setTimer('nextPoGCollectAllTime',getHHScriptVars("maxCollectionDelay") + randomInterval(60,180));
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
    static maskReward(){
        EventModule.moduleSimPoVPogMaskReward('pog_tab_container');
    }
    static styles(){

    }


}