import { gotoPage } from "../Service";
import { isJSON, logHHAuto } from "../Utils";
import { parsePrice } from "./PriceHelper";
import { getHHScriptVars } from "./ConfigHelper";
import { getTextForUI } from "./LanguageHelper";
import { nRounding } from "./NumberHelper";
import { getStoredValue, setStoredValue } from "./StorageHelper";
import { randomInterval } from "./TimeHelper";
import { EventModule } from "../Module";

export class RewardHelper {
    static getRewardTypeBySlot(inSlot)
    {
        let reward = "undetected";
        if (inSlot.className.indexOf('slot') >= 0)
        {
            if (inSlot.getAttribute("cur") !== null)
            {
                //console.log(currentIndicator+" : "+inSlot.getAttribute("cur"));
                reward = inSlot.getAttribute("cur");
            }
            else if (inSlot.className.indexOf('slot_avatar') >= 0)
            {
                //console.log(currentIndicator+" : avatar");
                if (inSlot.className.indexOf('girl_ico') >= 0)
                {
                    reward = 'girl_shards';
                }
                else
                {
                    reward = 'avatar';
                }
            }
            else if (inSlot.className.indexOf('girl-shards-slot') >= 0)
            {
                reward = 'girl_shards';
            }
            else if (inSlot.className.indexOf('mythic') >= 0)
            {
                //console.log("mythic equipment");
                reward = 'mythic';
            }
            else if (inSlot.className.indexOf('slot_scrolls_') >= 0)
            {
                reward = 'scrolls';
            }
            else if (inSlot.getAttribute("data-d") !== null && $(inSlot).data("d"))
            {
                let objectData = $(inSlot).data("d");
                //console.log(currentIndicator+" : "+inSlot.getAttribute("rarity")+" "+objectData.item.type+" "+objectData.item.value);
                reward = objectData.item.type;
            }else{
                const possibleRewards = getHHScriptVars("possibleRewardsList");
                for (let currentRewards of Object.keys(possibleRewards))
                {
                    if (inSlot.className.indexOf('slot_'+currentRewards) >= 0)
                    {
                        reward = currentRewards;
                    }
                }
            }
        }
        else if (inSlot.className.indexOf('shards_girl_ico') >= 0)
        {
            //console.log(currentIndicator+" : shards_girl_ico");
            reward = 'girl_shards';
        }
        //console.log(reward);
        return reward;
    }

    static getRewardTypeByData(inData)
    {
        let reward = "undetected";
        if (inData.hasOwnProperty("type"))
        {
            reward = inData.type;
        }
        else if (inData.hasOwnProperty("ico"))
        {
            if ( inData.ico.indexOf("items/K") > 0 )
            {
                reward = "gift";
            }
            else if ( inData.ico.indexOf("items/XP") > 0 )
            {
                reward = "potion";
            }
        }
        //console.log(reward);
        return reward;
    }

    static getRewardQuantityByType(rewardType, inSlot){
        // TODO update logic for potion / gift to be more accurate
        switch(rewardType)
        {
            case 'girl_shards' :    return Number($('.shards', inSlot).attr('shards'));
            case 'energy_kiss':
            case 'energy_quest':
            case 'energy_fight' :
            case 'xp' :
            case 'soft_currency' :
            case 'hard_currency' :
            case 'gift':
            case 'potion' :
            case 'booster' :
            case 'orbs':
            case 'gems' :
            case 'scrolls' :
            case 'ticket' :         return parsePrice($('.amount', inSlot).text());
            case 'mythic' :         return 1;
            case 'avatar':          return 1;
            default: logHHAuto('Error: reward type unknown ' + rewardType);
            return 0;
        }
    }
    static getPovNotClaimedRewards(){
        const arrayz = $('.potions-paths-tiers-section .potions-paths-tier.unclaimed');
        const freeSlotSelectors = ".free-slot:not(.claimed-locked) .slot,.free-slot:not(.claimed-locked) .shards_girl_ico";
        const paidSlotSelectors = ".paid-slots:not(.paid-locked):not(.claimed-locked) .slot,.paid-slots:not(.paid-locked):not(.claimed-locked) .shards_girl_ico";

        return RewardHelper.computeRewardsCount(arrayz, freeSlotSelectors, paidSlotSelectors);
    }
    static getSeasonalNotClaimedRewards(){
        const arrayz = $('.seasonal-tier.unclaimed, .mega-tier.free-slot:has(button.mega-claim-reward)');
        const freeSlotSelectors = ".slot";
        const paidSlotSelectors = ""; // Not available

        return RewardHelper.computeRewardsCount(arrayz, freeSlotSelectors, paidSlotSelectors);
    }
    static getSeasonNotClaimedRewards(){
        const arrayz = $('.rewards_pair');
        const freeSlotSelectors = ".free_reward.reward_is_claimable .slot";
        let paidSlotSelectors = "";
        if($("div#gsp_btn_holder[style='display: none;']").length) {
            // Season pass paid
            paidSlotSelectors = ".pass_reward.reward_is_claimable .slot";
        }

        return RewardHelper.computeRewardsCount(arrayz, freeSlotSelectors, paidSlotSelectors);
    }
    static computeRewardsCount(arrayz, freeSlotSelectors, paidSlotSelectors) {
        const rewardCountByType = {};
        var rewardType, rewardSlot, rewardAmount;

// data-d='{"item":{"id_item":"323","type":"potion","identifier":"XP4","rarity":"legendary","price":"500000","currency":"sc","value":"2500","carac1":"0","carac2":"0","carac3":"0","endurance":"0","chance":"0.00","ego":"0","damage":"0","duration":"0","skin":"hentai,gay,sexy","name":"Spell book","ico":"https://hh.hh-content.com/pictures/items/XP4.png","display_price":500000},"quantity":"1"}'

        rewardCountByType['all'] = arrayz.length; 
        if (arrayz.length > 0)
        {
            for (var slotIndex = arrayz.length - 1; slotIndex >= 0; slotIndex--)
            {
                [freeSlotSelectors, paidSlotSelectors].forEach((selector) => {
                    rewardSlot = $(selector,arrayz[slotIndex]);
                    if(rewardSlot.length > 0) {
                        rewardType = RewardHelper.getRewardTypeBySlot(rewardSlot[0]);
                        rewardAmount = RewardHelper.getRewardQuantityByType(rewardType, rewardSlot[0]);
                        if(rewardCountByType.hasOwnProperty(rewardType)) {
                            rewardCountByType[rewardType] = rewardCountByType[rewardType] + rewardAmount;
                        }else{
                            rewardCountByType[rewardType] = rewardAmount;
                        }
                    }
                });
            }
        }
        return rewardCountByType;
    }
    static getRewardsAsHtml(rewardCountByType) {
        let html = '';
        for (const [rewardType, rewardCount] of Object.entries(rewardCountByType)) {
            switch(rewardType)
            {
                // case 'girl_shards' :    return Number($('.shards', inSlot).attr('shards'));
                case 'energy_kiss':     html += '<div class="slot slot_energy_kiss  size_xs"><span class="energy_kiss_icn"></span><div class="amount">'+nRounding(rewardCount,0,-1)+'</div></div>'; break;
                case 'energy_quest':    html += '<div class="slot slot_energy_quest size_xs"><span class="energy_quest_icn"></span><div class="amount">'+nRounding(rewardCount,0,-1)+'</div></div>'; break;
                case 'energy_fight' :   html += '<div class="slot slot_energy_fight  size_xs"><span class="energy_fight_icn"></span><div class="amount">'+nRounding(rewardCount,0,-1)+'</div></div>'; break;
                case 'xp' :             html += '<div class="slot slot_xp size_xs"><span class="xp_icn"></span><div class="amount">'+nRounding(rewardCount,1,-1)+'</div></div>'; break;
                case 'soft_currency' :  html += '<div class="slot slot_soft_currency size_xs"><span class="soft_currency_icn"></span><div class="amount">'+nRounding(rewardCount,1,-1)+'</div></div>'; break;
                case 'hard_currency' :  html += '<div class="slot slot_hard_currency size_xs"><span class="hard_currency_icn"></span><div class="amount">'+nRounding(rewardCount,0,-1)+'</div></div>'; break;
                // case 'gift':
                // case 'potion' :
                // case 'booster' :
                // case 'orbs':
                // case 'gems' :           html += '<div class="slot slot_gems size_xs"><span class="gem_all_icn"></span><div class="amount">'+nRounding(rewardCount,0,-1)+'</div></div>'; break;
                // case 'scrolls' :
                case 'ticket' :         html += '<div class="slot slot_ticket size_xs"><span class="ticket_icn"></span><div class="amount">'+nRounding(rewardCount,0,-1)+'</div></div>'; break;
                // case 'mythic' :         html += '<div class="slot mythic random_equipment size_xs"><span class="mythic_equipment_icn"></span><div class="amount">'+nRounding(rewardCount,0,-1)+'</div></div>'; break;
                // case 'avatar':          return 1;
                default: 
            }
        }
        return html;
    }
    static displayRewardsPovPogDiv() {
        const target = $('.potions-paths-first-row .potions-paths-title-panel');
        const hhRewardId = 'HHPovPogRewards';
        try{
            if($('#' + hhRewardId).length <= 0) {
                const rewardCountByType = RewardHelper.getPovNotClaimedRewards();
                if (rewardCountByType['all'] > 0) {
                    const rewardsHtml = RewardHelper.getRewardsAsHtml(rewardCountByType);
                    target.after($('<div id='+hhRewardId+' class="HHRewardNotCollected"><h1 style="font-size: small;">'+getTextForUI('rewardsToCollectTitle',"elementText")+'</h1>' + rewardsHtml + '</div>'));
                } else {
                    target.after($('<div id='+hhRewardId+' style="display:none;"></div>'));
                }
            }
        } catch(err) {
            logHHAuto("ERROR:", err.message);
            target.append($('<div id='+hhRewardId+' style="display:none;"></div>'));
        }
    }
    static displayRewardsSeasonalDiv(isMegaSeasonalEvent=false) {
        const target = $('.event-resource-location');
        const hhRewardId = 'HHSeasonalRewards';
        try{
            if($('#' + hhRewardId).length <= 0) {
                const rewardCountByType = RewardHelper.getSeasonalNotClaimedRewards();
                // logHHAuto("Rewards seasonal event:", JSON.stringify(rewardCountByType));
                if (rewardCountByType['all'] > 0) {
                    GM_addStyle('.seasonal-event-panel .seasonal-event-container .tabs-section #home_tab_container .middle-container .event-resource-location .buttons-container { height: 5rem; margin-top: 0;}'); 
                    GM_addStyle('.seasonal-event-panel .seasonal-event-container .tabs-section #home_tab_container .middle-container .event-resource-location .buttons-container a { height: 2rem;}'); 

                    const rewardsHtml = RewardHelper.getRewardsAsHtml(rewardCountByType);
                    target.append($('<div id='+hhRewardId+' class="HHRewardNotCollected"><h1 style="font-size: small;">'+getTextForUI('rewardsToCollectTitle',"elementText")+'</h1>' + rewardsHtml + '</div>'));
                } else {
                    target.append($('<div id='+hhRewardId+' style="display:none;"></div>'));
                }
            }
        } catch(err) {
            logHHAuto("ERROR:", err.message);
            target.append($('<div id='+hhRewardId+' style="display:none;"></div>'));
        }
    }
    static displayRewardsSeasonDiv() {
        const target = $('.controls_right_side');
        const hhRewardId = 'HHSeasonRewards';
        try{
            if($('#' + hhRewardId).length <= 0) {
                const rewardCountByType = RewardHelper.getSeasonNotClaimedRewards();
                if (rewardCountByType['all'] > 0) {
                    const rewardsHtml = RewardHelper.getRewardsAsHtml(rewardCountByType);
                    target.append($('<div id='+hhRewardId+' class="HHRewardNotCollected"><h1 style="font-size: small;">'+getTextForUI('rewardsToCollectTitle',"elementText")+'</h1>' + rewardsHtml + '</div>'));
                } else {
                    target.append($('<div id='+hhRewardId+' style="display:none;"></div>'));
                }
            }
        } catch(err) {
            logHHAuto("ERROR:", err.message);
            target.append($('<div id='+hhRewardId+' style="display:none;"></div>'));
        }
    }
    static closeRewardPopupIfAny() {
        let rewardQuery="div#rewards_popup button.blue_button_L:not([disabled]):visible";
        if ($(rewardQuery).length >0 )
        {
            logHHAuto("Close reward popup.");
            $(rewardQuery).click();
            return true;
        }
        return false;
    }
    static ObserveAndGetGirlRewards()
    {
        let inCaseTimer = setTimeout(function(){gotoPage(getHHScriptVars("pagesIDHome"));}, 60000); //in case of issue
        function parseReward()
        {
            if (getStoredValue("HHAuto_Temp_eventsGirlz") === undefined
                || getStoredValue("HHAuto_Temp_eventGirl") === undefined
                || !isJSON(getStoredValue("HHAuto_Temp_eventsGirlz"))
                || !isJSON(getStoredValue("HHAuto_Temp_eventGirl")))
            {
                return -1;
            }
            let eventsGirlz =isJSON(getStoredValue("HHAuto_Temp_eventsGirlz"))?JSON.parse(getStoredValue("HHAuto_Temp_eventsGirlz")):{}
            let eventGirl = isJSON(getStoredValue("HHAuto_Temp_eventGirl"))?JSON.parse(getStoredValue("HHAuto_Temp_eventGirl")):{};
            let TTF = eventGirl.troll_id;
            if ($('#rewards_popup #reward_holder .shards_wrapper').length === 0)
            {
                clearTimeout(inCaseTimer);
                logHHAuto("No girl in reward going back to Troll");
                gotoPage(getHHScriptVars("pagesIDTrollPreBattle"),{id_opponent:TTF});
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
            setStoredValue("HHAuto_Temp_eventsGirlz", JSON.stringify(eventsGirlz));
            setStoredValue("HHAuto_Temp_eventGirl", JSON.stringify(eventGirl));
            if (renewEvent !== ""
                //|| Number(getStoredValue("HHAuto_Temp_EventFightsBeforeRefresh")) < 1
                || EventModule.checkEvent(eventGirl.event_id)
            )
            {
                clearTimeout(inCaseTimer);
                logHHAuto("Need to check back event page");
                if (renewEvent !== "")
                {
                    EventModule.parseEventPage(renewEvent);
                }
                else
                {
                    EventModule.parseEventPage(eventGirl.event_id);
                }
                return;
            }
            else
            {
                clearTimeout(inCaseTimer);
                logHHAuto("Go back to troll after troll fight.");
                gotoPage(getHHScriptVars("pagesIDTrollPreBattle"),{id_opponent:TTF});
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
                setStoredValue("HHAuto_Temp_autoLoop", "false");
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
}
