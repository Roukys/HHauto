import {
    RewardHelper,
    checkTimer,
    getHHScriptVars,
    getPage,
    getSecondsLeftBeforeEndOfHHDay,
    getStoredValue,
    randomInterval,
    setStoredValue,
    setTimer
} from "../Helper";
import { gotoPage } from "../Service";
import { isJSON, logHHAuto } from "../Utils";
import { HHStoredVarPrefixKey } from "../config";

export class DailyGoals {
    static styles(){
        if(getStoredValue(HHStoredVarPrefixKey+"Setting_compactDailyGoals") === "true")
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
        const rewardsToCollect = isJSON(getStoredValue(HHStoredVarPrefixKey+"Setting_autoDailyGoalsCollectablesList"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Setting_autoDailyGoalsCollectablesList")):[];
        //console.log(rewardsToCollect.length);
        if (checkTimer('nextDailyGoalsCollectTime') && getStoredValue(HHStoredVarPrefixKey+"Setting_autoDailyGoalsCollect") === "true")
        {
            //console.log(getPage());
            if (getPage() === getHHScriptVars("pagesIDDailyGoals"))
            {
                logHHAuto("Checking Daily Goals for collectable rewards.");
                logHHAuto("setting autoloop to false");
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
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
                            logHHAuto("Force adding for collection chest n° "+currentTierNb);
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


                if (buttonsToCollect.length >0 || potionsNum <100)
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
                            setTimer('nextDailyGoalsCollectTime', randomInterval(30*60, 35*60));
                            gotoPage(getHHScriptVars("pagesIDHome"));
                        }
                    }
                    collectDailyGoalsRewards();
                    return true;
                }
                else
                {
                    logHHAuto("No Daily Goals reward to collect.");
                    setTimer('nextDailyGoalsCollectTime', getSecondsLeftBeforeEndOfHHDay() + randomInterval(3600, 4000));
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
}