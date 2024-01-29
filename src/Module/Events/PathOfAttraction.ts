import {
    ConfigHelper,
    getStoredValue,
    getPage,
    getGoToClubChampionButton,
    RewardHelper,
    setStoredValue,
    TimeHelper,
    randomInterval,
    getSecondsLeft,
    setTimer,
    convertTimeToInt,
    getTextForUI
} from "../../Helper/index";
import { autoLoop } from "../../Service/index";
import { isJSON, logHHAuto } from "../../Utils/index";
import { HHStoredVarPrefixKey } from "../../config/index";

class PoaReward {
    tier=0;
    type='';
    slot=$();

    constructor(tier: number, type: string, slot: JQuery<HTMLElement>) {
        this.tier = tier;
        this.type = type;
        this.slot = slot;
    }
}

export class PathOfAttraction {

    static rewardPairTierPath = "#nc-poa-tape-rewards .nc-poa-reward-pair .nc-poa-step-indicator";
    static freeSlotPath = "#nc-poa-tape-rewards .nc-poa-reward-pair .nc-poa-free-reward";
    static paidSlotPath = "#nc-poa-tape-rewards .nc-poa-reward-pair .nc-poa-locked-reward";
    static getRewardButtonPath = "#poa-content .objective .reward button.purple_button_L";

    static getRemainingTime(){
        const poATimerRequest = '#events .nc-panel-header .event-timer span[rel=expires]';
    
        if ( $(poATimerRequest).length > 0 && (getSecondsLeft("PoARemainingTime") === 0 || getStoredValue(HHStoredVarPrefixKey+"Temp_PoAEndDate") === undefined) )
        {
            const poATimer = Number(convertTimeToInt($(poATimerRequest).text()));
            setTimer("PoARemainingTime",poATimer);
            setStoredValue(HHStoredVarPrefixKey+"Temp_PoAEndDate",Math.ceil(new Date().getTime()/1000)+poATimer);
        }
    }
    static runOld(){
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
    static run(){
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDEvent") && ConfigHelper.getHHScriptVars("isEnabledClubChamp",false) && window.location.search.includes("tab="+ConfigHelper.getHHScriptVars('poaEventIDReg')))
        {
            logHHAuto("On path of attraction event.");
            if($(".hh-club-poa").length <= 0) {
                const championsGoal = $('#poa-content .buttons:has(button[data-href="/champions-map.html"])');
                championsGoal.append(getGoToClubChampionButton());
            }
        }
    }
    static styles(){
        if (getStoredValue(HHStoredVarPrefixKey+"Setting_PoAMaskRewards") === "true")
        {
            setTimeout(PathOfAttraction.Hide,500);
        }
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_showRewardsRecap") === "true")
        {
            RewardHelper.displayRewardsPoaDiv();
        }
        PathOfAttraction.displatCollectAllButton();
    }

    static displatCollectAllButton() {
        if (PathOfAttraction.hasUnclaimedRewards() && $('#PoaCollectAll').length == 0) {

            const button = $(`<button class="purple_button_L" style="padding:0px 5px" id="PoaCollectAll">${getTextForUI("collectAllButton", "elementText")}</button>`);
            const divTooltip = $(`<div class="tooltipHH" style="position: absolute;top: -30px;left: 730px;width: 110px;font-size: small;"><span class="tooltipHHtext">${getTextForUI("collectAllButton", "tooltip")}</span></div>`);
            divTooltip.append(button);
            $('#poa-content').append(divTooltip);
            button.one('click', () => {
                PathOfAttraction.goAndCollect(true);
            });
        }
    }

    static _getClaimableRewards(path: string): PoaReward[] {
        const rewards: PoaReward[] = [];
        const listPoATiersToClaim = $(path);
        for (let currentTier = 0 ; currentTier < listPoATiersToClaim.length ; currentTier++)
        {
            const currentRewardTierNb = listPoATiersToClaim[currentTier].getAttribute("data-nc-reward-id");
            const slotElement = $('.slot',listPoATiersToClaim[currentTier]);
            const slotType = RewardHelper.getRewardTypeBySlot(slotElement[0]);
            rewards[currentRewardTierNb] = new PoaReward(Number(currentRewardTierNb), slotType, slotElement);
        }
        return rewards;
    }

    static hasUnclaimedRewards(): boolean {
        return $(PathOfAttraction.freeSlotPath + ".claimable" + ', ' + PathOfAttraction.paidSlotPath + ".claimable").length > 0
    }

    static getFreeClaimableRewards(): PoaReward[] {
        return PathOfAttraction._getClaimableRewards(PathOfAttraction.freeSlotPath + ".claimable");
    }

    static getPaidClaimableRewards(): PoaReward[] {
        if($("#nc-poa-tape-blocker").length) {
            return [];
        }else {
            return PathOfAttraction._getClaimableRewards(PathOfAttraction.paidSlotPath+ ".claimable");
        }
    }

    static isCompleted():boolean {
        const numberTiers = $(PathOfAttraction.rewardPairTierPath).length;
        const numberClaimedFree = $(PathOfAttraction.freeSlotPath + ".claimed").length;
        const numberClaimedPaid = $(PathOfAttraction.paidSlotPath + ".claimed").length;
        if($("#nc-poa-tape-blocker").length) {
            return numberClaimedFree >= numberTiers;
        }else {
            return numberClaimedFree >= numberTiers && numberClaimedPaid >= numberTiers;
        }
    }

    static async goAndCollect(manualCollectAll = false)
    {
        const debugEnabled = getStoredValue(HHStoredVarPrefixKey + "Temp_Debug") === 'true';
        const needToCollect = getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoACollect") === "true";
        const needToCollectAllBeforeEnd = getStoredValue(HHStoredVarPrefixKey + "Setting_autoPoACollectAll") === "true";

        if (needToCollect || needToCollectAllBeforeEnd || manualCollectAll)
        {
            const rewardsToCollect = isJSON(getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoACollectablesList"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoACollectablesList")):[];
    
            logHHAuto("Checking Path of Attraction for collectable rewards.");
            
            const numberTiers = $(PathOfAttraction.rewardPairTierPath).length;
            const freeClaimableRewards = PathOfAttraction.getFreeClaimableRewards();
            const paidClaimableRewards = PathOfAttraction.getPaidClaimableRewards();

            async function getReward(reward: PoaReward) {
                logHHAuto("Going to get " + JSON.stringify(reward))
                reward.slot.trigger('click');
                await TimeHelper.sleep(randomInterval(300,800));
                $(PathOfAttraction.getRewardButtonPath).trigger('click');
                await TimeHelper.sleep(randomInterval(300,800));
                RewardHelper.closeRewardPopupIfAny(); // Will refresh the page
                await TimeHelper.sleep(randomInterval(500,1000)); // Do not collect before page refresh
            }

            logHHAuto("numberTiers: " +  numberTiers);
            if (debugEnabled) {
                logHHAuto("freeClaimableRewards", freeClaimableRewards);
                logHHAuto("paidClaimableRewards", paidClaimableRewards);
            }
            const freeClaimableTiers = Object.keys(freeClaimableRewards);
            const paidClaimableTiers = Object.keys(paidClaimableRewards);

            if(numberTiers > 0 && (freeClaimableTiers.length > 0 || paidClaimableTiers.length > 0))
            {
                logHHAuto("Collecting rewards, setting autoloop to false");
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
                $(".scroll-area.poa").animate({scrollLeft: 0});
                await TimeHelper.sleep(randomInterval(300,800));

                for (let currentTier = 1 ; currentTier <= numberTiers; currentTier++)
                {
                    if(freeClaimableTiers.includes(''+currentTier)) {
                        if (rewardsToCollect.includes(freeClaimableRewards[currentTier].type) || needToCollectAllBeforeEnd || manualCollectAll)
                        {
                            await getReward(freeClaimableRewards[currentTier]);
                            return true;
                        }
                    }

                    if(paidClaimableTiers.includes(''+currentTier)) {
                        if (rewardsToCollect.includes(paidClaimableRewards[currentTier].type) || needToCollectAllBeforeEnd || manualCollectAll)
                        {
                            await getReward(paidClaimableRewards[currentTier]);
                            return true;
                        }
                    }
                }

                logHHAuto("Path of Attraction collection finished.");
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "true");
                setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoopTimeMili")));
                return true;
            }
            else
            {
                logHHAuto("No Path of Attraction reward to collect.");
            }
        }
        return false;
    }

    static Hide(){
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDEvent") && window.location.search.includes("tab="+ConfigHelper.getHHScriptVars('poaEventIDReg')) && getStoredValue(HHStoredVarPrefixKey+"Setting_PoAMaskRewards") === "true")
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

}
