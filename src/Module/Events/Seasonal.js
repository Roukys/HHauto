import {
    RewardHelper,
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

export class SeasonalEvent {
    static getRemainingTime(){
        const seasonalEventTimerRequest = `.seasonal-event-panel .seasonal-event-container .seasonal-timer span[rel=expires]`;
    
        if ( $(seasonalEventTimerRequest).length > 0 && (getSecondsLeft("SeasonalEventRemainingTime") === 0 || getStoredValue("HHAuto_Temp_SeasonalEventEndDate") === undefined) )
        {
            const seasonalEventTimer = Number(convertTimeToInt($(seasonalEventTimerRequest).text()));
            setTimer("SeasonalEventRemainingTime",seasonalEventTimer);
            setStoredValue("HHAuto_Temp_SeasonalEventEndDate",Math.ceil(new Date().getTime()/1000)+seasonalEventTimer);
        }
    }
    static displayRemainingTime()
    {
        logHHAuto('Not implemented');
    }
    static goAndCollect()
    {
        const rewardsToCollect = isJSON(getStoredValue("HHAuto_Setting_autoSeasonalEventCollectablesList"))?JSON.parse(getStoredValue("HHAuto_Setting_autoSeasonalEventCollectablesList")):[];

        if (getPage() === getHHScriptVars("pagesIDSeasonalEvent"))
        {
            SeasonalEvent.getRemainingTime();
            const seasonalEventEnd = getSecondsLeft("SeasonalEventRemainingTime");
            // logHHAuto("Seasonal end in " + seasonalEventEnd);
            const needToCollect = (checkTimer('nextSeasonalEventCollectTime') && getStoredValue("HHAuto_Setting_autoSeasonalEventCollect") === "true")
            const needToCollectAllBeforeEnd = (checkTimer('nextSeasonalEventCollectAllTime') && seasonalEventEnd < getLimitTimeBeforeEnd() && getStoredValue("HHAuto_Setting_autoSeasonalEventCollectAll") === "true");

            if (needToCollect || needToCollectAllBeforeEnd)
            {
                if (needToCollect) logHHAuto("Checking SeasonalEvent for collectable rewards.");
                if (needToCollectAllBeforeEnd) logHHAuto("Going to collect all SeasonalEvent rewards.");
                logHHAuto("setting autoloop to false");
                setStoredValue("HHAuto_Temp_autoLoop", "false");
                let buttonsToCollect = [];
                const listSeasonalEventTiersToClaim = $("#home_tab_container div.bottom-container div.right-part-container div.seasonal-progress-bar-tiers div.seasonal-tier.unclaimed");
                for (let currentTier = 0 ; currentTier < listSeasonalEventTiersToClaim.length ; currentTier++)
                {
                    const currentButton = $("button[rel='claim']", listSeasonalEventTiersToClaim[currentTier])[0];
                    const currentTierNb = currentButton.getAttribute("tier");
                    //console.log("checking tier : "+currentTierNb);
                    const freeSlotType = RewardHelper.getRewardTypeBySlot($(".seasonal-slot .slot,.seasonal-slot .slot_girl_shards",listSeasonalEventTiersToClaim[currentTier])[0]);
                    if (rewardsToCollect.includes(freeSlotType) || needToCollectAllBeforeEnd)
                    {
                        buttonsToCollect.push(currentButton);
                        logHHAuto("Adding for collection tier (only free) : "+currentTierNb);

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
                            setTimer('nextSeasonalEventCollectTime',getHHScriptVars("maxCollectionDelay"));
                            gotoPage(getHHScriptVars("pagesIDHome"));
                        }
                    }
                    collectSeasonalEventRewards();
                    return true;
                }
                else
                {
                    logHHAuto("No SeasonalEvent reward to collect.");
                    setTimer('nextSeasonalEventCollectTime',getHHScriptVars("maxCollectionDelay"));
                    setTimer('nextSeasonalEventCollectAllTime',getHHScriptVars("maxCollectionDelay"));
                    gotoPage(getHHScriptVars("pagesIDHome"));
                    return false;
                }
            }
            return false;
        }
        else if(unsafeWindow.seasonal_event_active)
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
        if (getStoredValue("HHAuto_Setting_SeasonalEventMaskRewards") === "true")
        {
            SeasonalEvent.maskReward();
        }
    }
    static maskReward(){

        var arrayz;
        let modified = false;
        arrayz = $('.seasonal-progress-bar-tiers .seasonal-tier-container:not([style*="display:none"]):not([style*="display: none"])');
        var obj;
        if (arrayz.length > 0)
        {
            for (var i2 = arrayz.length - 1; i2 >= 0; i2--)
            {
                obj = $(arrayz[i2]).find('.claimed:not([style*="display:none"]):not([style*="display: none"])');
                if (obj.length >= 1)
                {
                    arrayz[i2].style.display = "none";
                    modified = true;
                }
            }
        }
    
        if (modified)
        {
            let divToModify = $('.seasonal-progress-bar-section');
            if (divToModify.length > 0)
            {
                divToModify.getNiceScroll().resize();
    
                const width_px = 152.1;
                const start_px = 101;
                const rewards_unclaimed = $('.seasonal-tier.unclaimed').length;
                const scroll_width_hidden = parseInt(start_px + (rewards_unclaimed - 1) * width_px, 10);
                $('.seasonal-progress-bar-current').css('width', scroll_width_hidden + 'px');
    
                try {
                    divToModify.getNiceScroll(0).doScrollLeft(0, 200);
                } catch(err) {}
            }
        }
    }
    static displayGirlsMileStones() {
        if($('.HHGirlMilestone').length > 0) return;
        const playerPoints = Number($('.player-shards .circle-container').text());

        const girlContainer = $('.girls-reward-container');
        
        girlContainer.append(SeasonalEvent.getGirlMileStonesDiv(playerPoints, 4600, 0))
        .append(SeasonalEvent.getGirlMileStonesDiv(playerPoints, 9000, 1))
        .append(SeasonalEvent.getGirlMileStonesDiv(playerPoints, 13500, 2))
        .append(SeasonalEvent.getGirlMileStonesDiv(playerPoints, 18000, 3));
    }
    static getGirlMileStonesDiv(playerPoints, girlPointsTarget, girlIndex) {
        const greeNitckHtml = '<img class="nc-claimed-reward-check" src="'+getHHScriptVars("baseImgPath")+'/clubs/ic_Tick.png">';
        const girlDiv = $('<div class="HHGirlMilestone girl-img-'+girlIndex+'">Girl '+(girlIndex+1)+':'+playerPoints+'/'+girlPointsTarget+'</div>');
        if(playerPoints >= girlPointsTarget) {
            girlDiv.addClass('green');
            girlDiv.append($(greeNitckHtml));
        }
        return girlDiv;
    }
}