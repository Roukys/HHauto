import {
    ConfigHelper,
    randomInterval,
    setTimer,
    convertTimeToInt,
    getLimitTimeBeforeEnd,
    getStoredValue,
    checkTimer,
    getHHVars,
    RewardHelper,
    setStoredValue,
    TimeHelper,
    getTextForUI,
} from "../../Helper/index";
import { autoLoop, gotoPage } from "../../Service/index";
import { isJSON, logHHAuto } from "../../Utils/index";
import { HHStoredVarPrefixKey } from "../../config/index";
import { KKPuzzlePieces } from "../../model/index";

export class LivelyScene {

    static isEnabled() {
        return ConfigHelper.getHHScriptVars("isEnabledLivelySceneEvent", false); // And 10 girls 3*
    }

    static parse(hhEvent: any, eventList: any, hhEventData: any) {
        const eventID = hhEvent.eventId;
        let refreshTimer = randomInterval(3600, 4000);

        let timeLeft = $('#contains_all #events .nc-panel .timer span[rel="expires"]').text();
        let remainingTime = 3600;
        if (timeLeft !== undefined && timeLeft.length) {
            remainingTime = Number(convertTimeToInt(timeLeft));
        }
        setTimer('eventLivelySceneGoing', remainingTime);

        eventList[eventID] = {};
        eventList[eventID]["id"] = eventID;
        eventList[eventID]["type"] = hhEvent.eventType;
        eventList[eventID]["seconds_before_end"] = new Date().getTime() + remainingTime * 1000;
        eventList[eventID]["next_refresh"] = new Date().getTime() + refreshTimer * 1000;
        eventList[eventID]["isCompleted"] = $(".puzzle_piece.locked:visible,.puzzle_piece.claimable").length == 0;

        const manualCollectAll = getStoredValue(HHStoredVarPrefixKey + "Temp_poaManualCollectAll") === 'true';

        if (getStoredValue(HHStoredVarPrefixKey + "Setting_autoLivelySceneEventCollect") === "true" || manualCollectAll
            || remainingTime < getLimitTimeBeforeEnd() && getStoredValue(HHStoredVarPrefixKey + "Setting_autoLivelySceneEventCollectAll") === "true") {
            LivelyScene.goAndCollect(remainingTime, manualCollectAll);
        }

    }

    static parseClaimableRewards(remainingTime: number, manualCollectAll = false) {
        const claimablePieces: KKPuzzlePieces[] = [];
        const puzzlePieces: KKPuzzlePieces[] = getHHVars('current_event.event_data.puzzle_pieces');
        const rewardsToCollect = isJSON(getStoredValue(HHStoredVarPrefixKey + "Setting_autoLivelySceneEventCollectablesList")) ? JSON.parse(getStoredValue(HHStoredVarPrefixKey + "Setting_autoLivelySceneEventCollectablesList")) : [];
        const needToCollectAll = remainingTime < getLimitTimeBeforeEnd() && getStoredValue(HHStoredVarPrefixKey + "Setting_autoLivelySceneEventCollectAll") === "true";
        const needToCollect = (checkTimer('nextLivelySceneEventCollectTime') && getStoredValue(HHStoredVarPrefixKey + "Setting_autoLivelySceneEventCollect") === "true");

        // logHHAuto("Checking double penetration event for collectable rewards.");

        for (let currentPiece = 0; currentPiece < puzzlePieces.length; currentPiece++) {
            const puzzlePiece:KKPuzzlePieces = puzzlePieces[currentPiece];
            if (puzzlePiece.reward_unlocked && !puzzlePiece.reward_claimed) {
                let rewardType = puzzlePiece?.reward?.shards ? 'girl_shards' : puzzlePiece?.reward?.rewards[0].type;

                if (rewardsToCollect.includes(rewardType) && needToCollect || needToCollectAll || manualCollectAll) {
                    logHHAuto(`Reward to collect ${puzzlePiece?.reward?.rewards[0].value}x${puzzlePiece?.reward?.rewards[0].type}`);
                    claimablePieces.push(puzzlePiece);
                }
            }

        }

        logHHAuto('claimablePieces', claimablePieces);
        return claimablePieces;
    }

    static async goAndCollect(remainingTime: number, manualCollectAll = false)
    {
        try {
            const rewards = LivelyScene.parseClaimableRewards(remainingTime, manualCollectAll);
            if (manualCollectAll) setStoredValue(HHStoredVarPrefixKey + "Temp_lseManualCollectAll", 'true');

            if (rewards.length > 0) {
                logHHAuto("Going to collect rewards.");
                logHHAuto("setting autoloop to false");
                setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");

                let buttonsToCollect: HTMLElement[] = [];

                for (let currentReward = 0; currentReward < rewards.length; currentReward++) {
                    const reward = rewards[currentReward];
                    const puzzlePiece = $(`#puzzle_template #puzzle_piece_${reward.id_piece}.claimable`);

                    if (puzzlePiece.length > 0) {
                        puzzlePiece.trigger('click');
                        await TimeHelper.sleep(randomInterval(200, 400));

                        const currentCollectButton = $('.lse_side_panel button.purple_button_L.claimable');
                        if (currentCollectButton.length > 0) {
                            currentCollectButton.trigger('click');
                            await TimeHelper.sleep(randomInterval(400, 700));
                            RewardHelper.closeRewardPopupIfAny() // refresh;
                            await TimeHelper.sleep(randomInterval(400, 700));
                            return true;
                        }
                    }

                }
            }
            else {
                logHHAuto("No (more) LivelyScene reward to collect .");
                setTimer('nextLivelySceneEventCollectTime', ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(60, 180));
                setStoredValue(HHStoredVarPrefixKey + "Temp_lseManualCollectAll", 'false');
                //gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
                // setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "true");
                //setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey + "Temp_autoLoopTimeMili")));
                return false;
            }
        } catch ({ errName, message }) {
            logHHAuto(`ERROR during collect LivelyScene rewards: ${message}`);
        }
        return false;
    }
    static run(){
        LivelyScene.displayCollectAllButton();
    }

    static hasUnclaimedRewards(): boolean {
        return $(".puzzle_piece.claimable:visible").length > 0
    }

    static displayCollectAllButton() {
        if (LivelyScene.hasUnclaimedRewards() && $('#LivelySceneCollectAll').length == 0) {

            const button = $(`<button class="purple_button_L" style="padding:0px 5px" id="LivelySceneCollectAll">${getTextForUI("collectAllButton", "elementText")}</button>`);
            const divTooltip = $(`<div class="tooltipHH" style="position: absolute;top: 0px;right: 45px;font-size: small; z-index:5"><span class="tooltipHHtext">${getTextForUI("collectAllButton", "tooltip")}</span></div>`);
            divTooltip.append(button);
            $('#lse_content').append(divTooltip);
            button.one('click', () => {
                LivelyScene.goAndCollect(Infinity,true);
            });
        }
    }
}