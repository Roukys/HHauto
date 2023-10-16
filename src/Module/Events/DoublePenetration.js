import {
    RewardHelper,
    checkTimer,
    getHHScriptVars,
    getStoredValue,
    randomInterval,
    setStoredValue,
    setTimer,
} from "../../Helper";
import { autoLoop, gotoPage } from "../../Service";
import { isJSON, logHHAuto } from "../../Utils";
import { HHStoredVarPrefixKey } from "../../config";

export class DoublePenetration {
    
    static goAndCollect()
    {
        const rewardsToCollect = isJSON(getStoredValue(HHStoredVarPrefixKey+"Setting_autodpEventCollectablesList"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Setting_autodpEventCollectablesList")):[];

        const needToCollect = (checkTimer('nextDpEventCollectTime') && getStoredValue(HHStoredVarPrefixKey+"Setting_autodpEventCollect") === "true")

        const dPTierQuery = "#dp-content .tiers-container .player-progression-container .tier-container:has(button.display-block)";
        const dPFreeSlotQuery = ".free-slot .slot,.free-slot .slot_girl_shards";
        const dPPaidSlotQuery = ".paid-slot .slot,.paid-slot .slot_girl_shards";
        const isPassPaid = $("#nc-poa-tape-blocker button.unlock-poa-bonus-rewards:visible").length <= 0;

        if (needToCollect)
        {
            if (needToCollect) logHHAuto("Checking double penetration event for collectable rewards.");
            logHHAuto("setting autoloop to false");
            setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            let buttonsToCollect = [];
            const listDpEventTiersToClaim = $(dPTierQuery);

            for (let currentTier = 0 ; currentTier < listDpEventTiersToClaim.length ; currentTier++)
            {
                const currentButton = $("button[rel='reward-claim']", listDpEventTiersToClaim[currentTier])[0];
                const currentTierNb = currentButton.getAttribute("tier");
                //console.log("checking tier : "+currentTierNb);
                const freeSlotType = RewardHelper.getRewardTypeBySlot($(dPFreeSlotQuery,listDpEventTiersToClaim[currentTier])[0]);
                if (rewardsToCollect.includes(freeSlotType))
                {
                    
                    if (isPassPaid) {
                        // One button for both
                        const paidSlotType = RewardHelper.getRewardTypeBySlot($(dPPaidSlotQuery, listDpEventTiersToClaim[currentTier])[0]);
                        if (rewardsToCollect.includes(paidSlotType))
                        {
                            buttonsToCollect.push(currentButton);
                            logHHAuto("Adding for collection tier (free + paid) : "+currentTierNb);
                        } else {
                            logHHAuto("Can't add tier " + currentTierNb + " as paid reward isn't to be colled");
                        }
                    } else {
                        buttonsToCollect.push(currentButton);
                        logHHAuto("Adding for collection tier (only free) : "+currentTierNb);
                    }
                }
            }

            if (buttonsToCollect.length >0)
            {
                function collectDpEventRewards()
                {
                    if (buttonsToCollect.length >0)
                    {
                        logHHAuto("Collecting tier : "+buttonsToCollect[0].getAttribute('tier'));
                        buttonsToCollect[0].click();
                        buttonsToCollect.shift();
                        setTimeout(RewardHelper.closeRewardPopupIfAny, randomInterval(300, 500));
                        setTimeout(collectDpEventRewards, randomInterval(500,800));
                    }
                    else
                    {
                        logHHAuto("Double penetration collection finished.");
                        setTimer('nextDpEventCollectTime',getHHScriptVars("maxCollectionDelay") + randomInterval(60,180));
                        //gotoPage(getHHScriptVars("pagesIDHome"));
                        setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "true");
                        setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoopTimeMili")));
                    }
                }
                collectDpEventRewards();
                return true;
            }
            else
            {
                logHHAuto("No double penetration reward to collect.");
                setTimer('nextDpEventCollectTime',getHHScriptVars("maxCollectionDelay") + randomInterval(60,180));
                //gotoPage(getHHScriptVars("pagesIDHome"));
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "true");
                setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoopTimeMili")));
                return false;
            }
        }
        return false;
    }
}