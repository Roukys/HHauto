import {
    RewardHelper,
    TimeHelper,
    checkTimer,
    convertTimeToInt,
    getHHScriptVars,
    getHHVars,
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

export class PathOfValue {
    static getRemainingTime(){
        const poVTimerRequest = '#pov_tab_container > div.potions-paths-first-row .potions-paths-timer span[rel=expires]';

        if ( $(poVTimerRequest).length > 0 && (getSecondsLeft("PoVRemainingTime") === 0 || getStoredValue(HHStoredVarPrefixKey+"Temp_PoVEndDate") === undefined) )
        {
            const poVTimer = Number(convertTimeToInt($(poVTimerRequest).text()));
            setTimer("PoVRemainingTime",poVTimer);
            setStoredValue(HHStoredVarPrefixKey+"Temp_PoVEndDate",Math.ceil(new Date().getTime()/1000)+poVTimer);
        }
    }
    static displayRemainingTime()
    {
        EventModule.displayGenericRemainingTime("#scriptPovTime", "path-of-valor", "HHAutoPoVTimer", "PoVRemainingTime", HHStoredVarPrefixKey+"Temp_PoVEndDate");
    }
    static isEnabled(){
        return getHHScriptVars("isEnabledPoV",false) && getHHVars('Hero.infos.level')>=getHHScriptVars("LEVEL_MIN_POV");
    }
    static goAndCollect()
    {
        const rewardsToCollect = isJSON(getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoVCollectablesList"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoVCollectablesList")):[];

        if (getPage() === getHHScriptVars("pagesIDPoV"))
        {
            PathOfValue.getRemainingTime();
            const povEnd = getSecondsLeft("PoVRemainingTime");
            logHHAuto("PoV end in " + TimeHelper.debugDate(povEnd));

            if (checkTimer('nextPoVCollectAllTime') && povEnd < getLimitTimeBeforeEnd() && getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoVCollectAll") === "true")
            {
                if ($(getHHScriptVars("selectorClaimAllRewards")).length > 0)
                {
                    logHHAuto("Going to collect all POV item at once.");
                    setTimeout(function (){
                        $(getHHScriptVars("selectorClaimAllRewards"))[0].click();
                        setTimer('nextPoVCollectAllTime',getHHScriptVars("maxCollectionDelay") + randomInterval(60,180)); // Add timer to check again later if there is new items to collect
                        setTimeout(function (){gotoPage(getHHScriptVars("pagesIDHome"));},500);
                    },500);
                    return true;
                }
                else
                {
                    setTimer('nextPoVCollectAllTime',getHHScriptVars("maxCollectionDelay") + randomInterval(60,180));
                }
            }
            if (checkTimer('nextPoVCollectTime') && getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoVCollect") === "true")
            {
                logHHAuto("Checking Path of Valor for collectable rewards.");
                logHHAuto("setting autoloop to false");
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
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
                            setTimer('nextPoVCollectTime',getHHScriptVars("maxCollectionDelay") + randomInterval(60,180));
                            gotoPage(getHHScriptVars("pagesIDHome"));
                        }
                    }
                    collectPoVRewards();
                    return true;
                }
                else
                {
                    logHHAuto("No Path of Valor reward to collect.");
                    setTimer('nextPoVCollectTime',getHHScriptVars("maxCollectionDelay") + randomInterval(60,180));
                    setTimer('nextPoVCollectAllTime',getHHScriptVars("maxCollectionDelay") + randomInterval(60,180));
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
    static styles(){

    }
    static maskReward(){
        EventModule.moduleSimPoVPogMaskReward('pov_tab_container');
    }

}