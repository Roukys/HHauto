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
    getTextForUI,
    randomInterval,
    setStoredValue,
    setTimer } from "../../Helper";
import { gotoPage } from "../../Service";
import { isJSON, logHHAuto } from "../../Utils";
import { HHStoredVarPrefixKey } from "../../config";

export class SeasonalEvent {
    static isMegaSeasonalEvent() {
        return $('#get_mega_pass_kobans_btn').length > 0
    }
    static isMegaPassPaid() {
        return $('#get_mega_pass_kobans_btn:visible').length <= 0
    }
    static getRemainingTime(){
        const seasonalEventTimerRequest = `.mega-event-panel .mega-event-container .mega-timer span[rel=expires]`

        if ( $(seasonalEventTimerRequest).length > 0 && (getSecondsLeft("SeasonalEventRemainingTime") === 0 || getStoredValue(HHStoredVarPrefixKey+"Temp_SeasonalEventEndDate") === undefined) )
        {
            const seasonalEventTimer = Number(convertTimeToInt($(seasonalEventTimerRequest).text()));
            setTimer("SeasonalEventRemainingTime",seasonalEventTimer);
            setStoredValue(HHStoredVarPrefixKey+"Temp_SeasonalEventEndDate",Math.ceil(new Date().getTime()/1000)+seasonalEventTimer);
        }
    }
    static displayRemainingTime()
    {
        logHHAuto('Not implemented');
    }
    static getSeasonalNotClaimedRewards(){
        const arrayz = $('.mega-tier.unclaimed');
        const freeSlotSelectors = ".slot";
        const paidSlotSelectors = ""; // Not available

        return RewardHelper.computeRewardsCount(arrayz, freeSlotSelectors, paidSlotSelectors);
    }
    static getMegaSeasonalNotClaimedRewards(){
        const arrayz = $('.mega-tier-container:has(.free-slot button.mega-claim-reward)');
        const freeSlotSelectors = ".free-slot .slot";
        const paidSlotSelectors = SeasonalEvent.isMegaPassPaid() ? ".paid-unclaimed .slot" : "";

        return RewardHelper.computeRewardsCount(arrayz, freeSlotSelectors, paidSlotSelectors);
    }
    static goAndCollect()
    {
        const rewardsToCollect = isJSON(getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonalEventCollectablesList"))?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonalEventCollectablesList")):[];

        if (getPage() === getHHScriptVars("pagesIDSeasonalEvent"))
        {
            SeasonalEvent.getRemainingTime();
            const isMegaSeasonalEvent = SeasonalEvent.isMegaSeasonalEvent();
            const seasonalEventEnd = getSecondsLeft("SeasonalEventRemainingTime");
            // logHHAuto("Seasonal end in " + seasonalEventEnd);
            const needToCollect = (checkTimer('nextSeasonalEventCollectTime') && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonalEventCollect") === "true")
            const needToCollectAllBeforeEnd = (checkTimer('nextSeasonalEventCollectAllTime') && seasonalEventEnd < getLimitTimeBeforeEnd() && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeasonalEventCollectAll") === "true");

            const seasonalTierQuery = "#home_tab_container div.bottom-container div.right-part-container div.mega-progress-bar-tiers div.mega-tier.unclaimed";
            const megaSeasonalTierQuery = "#home_tab_container div.bottom-container div.right-part-container div.mega-progress-bar-section div.mega-tier-container:has(.free-slot button.mega-claim-reward)";
            const seasonalFreeSlotQuery = ".mega-slot .slot,.mega-slot .slot_girl_shards";
            const seasonalPaidSlotQuery = ""; // N/A
            const megaSeasonalFreeSlotQuery = ".free-slot .slot";
            const megaSeasonalPaidSlotQuery = ".pass-slot.paid-unclaimed .slot";

            if (needToCollect || needToCollectAllBeforeEnd)
            {
                if (needToCollect) logHHAuto("Checking SeasonalEvent for collectable rewards.");
                if (needToCollectAllBeforeEnd) logHHAuto("Going to collect all SeasonalEvent rewards.");
                logHHAuto("setting autoloop to false");
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
                let buttonsToCollect = [];

                const listSeasonalEventTiersToClaim = isMegaSeasonalEvent ? $(megaSeasonalTierQuery) : $(seasonalTierQuery);
                const freeSlotQuery =  isMegaSeasonalEvent ? megaSeasonalFreeSlotQuery : seasonalFreeSlotQuery;
                const paidSlotQuery =  isMegaSeasonalEvent ? megaSeasonalPaidSlotQuery : seasonalPaidSlotQuery;
                const isPassPaid = isMegaSeasonalEvent && SeasonalEvent.isMegaPassPaid();

                for (let currentTier = 0 ; currentTier < listSeasonalEventTiersToClaim.length ; currentTier++)
                {
                    const currentButton = $("button[rel='claim']", listSeasonalEventTiersToClaim[currentTier])[0];
                    const currentTierNb = currentButton.getAttribute("tier");
                    //console.log("checking tier : "+currentTierNb);
                    const freeSlotType = RewardHelper.getRewardTypeBySlot($(freeSlotQuery,listSeasonalEventTiersToClaim[currentTier])[0]);
                    if (rewardsToCollect.includes(freeSlotType) || needToCollectAllBeforeEnd)
                    {
                        
                        if (isPassPaid) {
                            // One button for both
                            const paidSlotType = RewardHelper.getRewardTypeBySlot($(paidSlotQuery, listSeasonalEventTiersToClaim[currentTier])[0]);
                            if (rewardsToCollect.includes(paidSlotType) || needToCollectAllBeforeEnd)
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
                    function collectSeasonalEventRewards()
                    {
                        if (buttonsToCollect.length >0)
                        {
                            logHHAuto("Collecting tier : "+buttonsToCollect[0].getAttribute('tier'));
                            buttonsToCollect[0].click();
                            buttonsToCollect.shift();
                            setTimeout(collectSeasonalEventRewards, randomInterval(300, 500));
                        }
                        else
                        {
                            logHHAuto("SeasonalEvent collection finished.");
                            setTimer('nextSeasonalEventCollectTime',getHHScriptVars("maxCollectionDelay") + randomInterval(60,180));
                            gotoPage(getHHScriptVars("pagesIDHome"));
                        }
                    }
                    collectSeasonalEventRewards();
                    return true;
                }
                else
                {
                    logHHAuto("No SeasonalEvent reward to collect.");
                    setTimer('nextSeasonalEventCollectTime',getHHScriptVars("maxCollectionDelay") + randomInterval(60,180));
                    setTimer('nextSeasonalEventCollectAllTime',getHHScriptVars("maxCollectionDelay") + randomInterval(60,180));
                    gotoPage(getHHScriptVars("pagesIDHome"));
                    return false;
                }
            }
            return false;
        }
        else if(unsafeWindow.seasonal_event_active || unsafeWindow.seasonal_time_remaining > 0)
        {
            logHHAuto("Switching to SeasonalEvent screen.");
            gotoPage(getHHScriptVars("pagesIDSeasonalEvent"));
            return true;
        }
        else
        {
            logHHAuto("No SeasonalEvent active.");
            setTimer('nextSeasonalEventCollectTime', 604800); // 1 week delay
            setTimer('nextSeasonalEventCollectAllTime', 604800); // 1 week delay
            return false;
        }
    }
    static styles(){
        if (getStoredValue(HHStoredVarPrefixKey+"Setting_SeasonalEventMaskRewards") === "true")
        {
            SeasonalEvent.maskReward();
        }
    }
    static maskReward(){

        var arrayz;
        let modified = false;
        
        const isMegaSeasonalEvent = SeasonalEvent.isMegaSeasonalEvent();
        const seasonalTierQuery = ".mega-progress-bar-tiers .mega-tier-container";
        const megaSeasonalTierQuery = ".mega-progress-bar-tiers .mega-tier-container";

        arrayz = $((isMegaSeasonalEvent ? megaSeasonalTierQuery : seasonalTierQuery) + ':not([style*="display:none"]):not([style*="display: none"])');
        var obj;
        if (arrayz.length > 0)
        {
            for (var i2 = arrayz.length - 1; i2 >= 0; i2--)
            {
                obj = $(arrayz[i2]).find('.claimed:not([style*="display:none"]):not([style*="display: none"])'); // TODO ".paid-claimed .slot"
                if (obj.length >= 1)
                {
                    arrayz[i2].style.display = "none";
                    modified = true;
                }
            }
        }
    
        if (modified)
        {
            let divToModify = $('.seasonal-progress-bar-section, .mega-progress-bar-section');
            if (divToModify.length > 0)
            {
                divToModify.getNiceScroll().resize();
    
                const width_px = 152.1;
                const start_px = 101;
                const rewards_unclaimed = $('.mega-tier.unclaimed, .free-slot:not(.claimed)').length;
                const scroll_width_hidden = parseInt(start_px + (rewards_unclaimed - 1) * width_px, 10);
                $('.seasonal-progress-bar-current, .mega-progress-bar').css('width', scroll_width_hidden + 'px');
    
                try {
                    divToModify.getNiceScroll(0).doScrollLeft(0, 200);
                } catch(err) {}
            }
        }
    }
    static displayGirlsMileStones() {
        if($('.HHGirlMilestone').length > 0) return;
        const $playerPoints = $('.player-shards .mega-event-currency');
        if($playerPoints.length == 0) {
            logHHAuto("ERROR: Can't find player points");
        }
        const playerPoints = $playerPoints.length ? Number($playerPoints.text()) : 0;

        const girlContainer = $('.girls-reward-container');

        const girlSlotRewards = $('#home_tab_container .bottom-container .slot.slot_girl_shards');
        girlSlotRewards.each(function(index, girlSlot) {
            const milestone = Number($('.tier-level p',$(girlSlot).parents('.mega-tier-container')).text());
            if(milestone > 0) {
                girlContainer.append(SeasonalEvent.getGirlMileStonesDiv(playerPoints, milestone, index+1))
            }
        });
    }
    static getGirlMileStonesDiv(playerPoints, girlPointsTarget, girlIndex) {
        const greeNitckHtml = '<img class="nc-claimed-reward-check" src="'+getHHScriptVars("baseImgPath")+'/clubs/ic_Tick.png">';
        const girlDiv = $('<div class="HHGirlMilestone girl-img-'+girlIndex+'"><div>Girl '+girlIndex+':'+playerPoints+'/'+girlPointsTarget+'</div></div>');
        if(playerPoints >= girlPointsTarget) {
            girlDiv.addClass('green');
            girlDiv.append($(greeNitckHtml));
        }
        return girlDiv;
    }
    static displayRewardsSeasonalDiv() {
        const target = $('.girls-reward-container'); // $('.event-resource-location');
        const hhRewardId = 'HHSeasonalRewards';
        const isMegaSeasonalEvent = SeasonalEvent.isMegaSeasonalEvent();
        try{
            if($('#' + hhRewardId).length <= 0) {
                const rewardCountByType = isMegaSeasonalEvent ? SeasonalEvent.getMegaSeasonalNotClaimedRewards() : SeasonalEvent.getSeasonalNotClaimedRewards();
                logHHAuto("Rewards seasonal event:", JSON.stringify(rewardCountByType));
                if (rewardCountByType['all'] > 0) {
                    // GM_addStyle('.seasonal-event-panel .seasonal-event-container .tabs-section #home_tab_container .middle-container .event-resource-location .buttons-container { height: 5rem; margin-top: 0;}'); 
                    // GM_addStyle('.seasonal-event-panel .seasonal-event-container .tabs-section #home_tab_container .middle-container .event-resource-location .buttons-container a { height: 2rem;}'); 

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
    static goAndCollectMegaEventRankRewards() {
        if (getPage() === getHHScriptVars("pagesIDSeasonalEvent"))
        {
            const isMegaSeasonalEvent = SeasonalEvent.isMegaSeasonalEvent();
            const topRank = $('#mega-event-tabs #top_ranking_tab');
            const eventRank = $('#mega-event-tabs #event_ranking_tab');
            if(!isMegaSeasonalEvent && topRank.length === 0 && eventRank.length === 0) {
                logHHAuto('Not Mega Event');
                setTimer('nextMegaEventRankCollectTime', 604800); // 1 week delay
                return;
            } else if(topRank.length > 0 || eventRank.length > 0) {
                logHHAuto('Not Mega Event but rank tab exist');
            }
            logHHAuto('Collect Mega Event Rank Rewards');
            // switch tabs
            if( topRank.length > 0) topRank.click();
            else if( eventRank.length > 0) eventRank.click();

            setTimer('nextMegaEventRankCollectTime', TimeHelper.getSecondsLeftBeforeEndOfHHDay()  + randomInterval(3600,4000));
        }
        else if(unsafeWindow.seasonal_event_active || unsafeWindow.seasonal_time_remaining > 0)
        {
            logHHAuto("Switching to SeasonalEvent screen.");
            gotoPage(getHHScriptVars("pagesIDSeasonalEvent"));
            return true;
        }
        else
        {
            logHHAuto("No SeasonalEvent active.");
            setTimer('nextMegaEventRankCollectTime', 604800); // 1 week delay
            return false;
        }
    }
}