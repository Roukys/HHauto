import {
    clearTimer,
    convertTimeToInt,
    ConfigHelper,
    getPage,
    getStoredValue,
    randomInterval,
    setStoredValue,
    setTimer
} from '../Helper/index';
import { autoLoop, gotoPage } from '../Service/index';
import { logHHAuto } from '../Utils/index';
import { HHStoredVarPrefixKey } from '../config/index';

export class PlaceOfPower {
    static moduleDisplayPopID()
    {
        if ($('.HHPopIDs').length  > 0) {return}
        $('div.pop_list div[pop_id]').each(function() {
            $(this).prepend('<div class="HHPopIDs">'+$(this).attr('pop_id')+'</div>');
        });
    }
    static styles(){
        if(getStoredValue(HHStoredVarPrefixKey+"Setting_compactPowerPlace") === "true")
        {
            const popPagePath = '#pop #pop_info .pop_list';
            const popBtnPath = popPagePath +' .pop-action-btn';
            const popContainerPath = popPagePath + ' .pop_list_scrolling_area .pop_thumb_container';
        
            const popButtonStyles = function()
            {
                GM_addStyle( popBtnPath + ' .pop-auto-asign-all, ' + popBtnPath + ' .pop-claim-all {'
                    + 'min-width: auto !important;'
                    + 'height: 26px;'
                    + 'flex-direction: inherit;'
                    + 'column-gap: 12px;'
                    + 'display: inline-flex;'
                +'}');
        
                GM_addStyle( popBtnPath + ' .battle-action-button .action-cost {'
                    + 'width:auto;'
                +'}');
        
                GM_addStyle(popBtnPath + ' .pop-claim-all .action-cost {'
                    + 'display: flex;'
                +'}');
        
                GM_addStyle(popBtnPath + ' .pop-claim-all .action-cost .hc-cost {'
                    + 'display: flex;'
                    + 'align-items: center;'
                +'}');
            }
        
            const popStyles = function()
            {
                GM_addStyle(popContainerPath + ' {'
                    + 'margin:2px;'
                    + 'width: 135px;'
                    + 'min-height: 130px;'
                +'}');
        
                GM_addStyle(popContainerPath + ' .pop_thumb > button {'
                    + 'width: 128px;'
                    + 'height: 25px;'
                +'}');
        
                GM_addStyle(popContainerPath + ' .pop_thumb > .pop_thumb_title {'
                    + 'display: none;'
                +'}');
        
                GM_addStyle(popContainerPath + ' .pop_thumb_expanded,' + popContainerPath + ' .pop_thumb_active {'
                    + 'height: 130px;'
                +'}');
        
                GM_addStyle(popContainerPath + ' .pop_thumb img {'
                    + 'width: 100%;'
                    + 'height: auto;'
                +'}');
        
                GM_addStyle(popContainerPath + ' .pop_thumb > .pop_thumb_progress_bar {'
                    + 'width: 128px;'
                    + 'height: 30px;'
                +'}');
        
                GM_addStyle(popContainerPath + ' .pop_thumb > .pop_thumb_space {'
                    + 'height: 30px;'
                +'}');
        
                GM_addStyle(popContainerPath + ' .pop_thumb > .pop_thumb_progress_bar .hh_bar > .backbar {'
                    + 'width: 123px !important;'
                +'}');
            }
            popButtonStyles();
            popStyles();
        }
    }
    static addPopToUnableToStart(popIndex,message){
        var popUnableToStart=getStoredValue(HHStoredVarPrefixKey+"Temp_PopUnableToStart")?getStoredValue(HHStoredVarPrefixKey+"Temp_PopUnableToStart"):"";
        logHHAuto(message);
        if (popUnableToStart === "")
        {
            setStoredValue(HHStoredVarPrefixKey+"Temp_PopUnableToStart", String(popIndex));
        }
        else
        {
            setStoredValue(HHStoredVarPrefixKey+"Temp_PopUnableToStart", popUnableToStart+";"+String(popIndex));
        }
    }
    static cleanTempPopToStart()
    {
        sessionStorage.removeItem(HHStoredVarPrefixKey+'Temp_PopUnableToStart');
        sessionStorage.removeItem(HHStoredVarPrefixKey+'Temp_popToStart');
    }
    static removePopFromPopToStart(index)
    {
        var epop;
        var popToSart;
        var newPopToStart;
        popToSart= getStoredValue(HHStoredVarPrefixKey+"Temp_PopToStart")?JSON.parse(getStoredValue(HHStoredVarPrefixKey+"Temp_PopToStart")):[];
        newPopToStart=[];
        for (epop of popToSart)
        {
            if (epop != index)
            {
                newPopToStart.push(epop);
            }
        }
        setStoredValue(HHStoredVarPrefixKey+"Temp_PopToStart", JSON.stringify(newPopToStart));
    }

    static collectAndUpdate()
    {
        if(getPage() !== ConfigHelper.getHHScriptVars("pagesIDPowerplacemain")
        )
        {
            logHHAuto("Navigating to powerplaces main page.");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDPowerplacemain"));
            // return busy
            return true;
        }
        else
        {
            logHHAuto("On powerplaces main page.");
            setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            logHHAuto("setting autoloop to false");

            setStoredValue(HHStoredVarPrefixKey+"Temp_Totalpops", $("div.pop_list div[pop_id]").length); //Count how many different POPs there are and store them locally
            logHHAuto("totalpops : "+getStoredValue(HHStoredVarPrefixKey+"Temp_Totalpops"));
            var newFilter="";
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoPowerPlacesInverted") === "true")
            {
                // starting from last one.
                $("div.pop_list div[pop_id]").each(function(){newFilter=';'+$(this).attr('pop_id')+newFilter;});
            }
            else
            {
                $("div.pop_list div[pop_id]").each(function(){newFilter=newFilter+';'+$(this).attr('pop_id');});
            }
            if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoPowerPlacesAll") === "true")
            {
                setStoredValue(HHStoredVarPrefixKey+"Setting_autoPowerPlacesIndexFilter", newFilter.substring(1));
            }
            setStoredValue(HHStoredVarPrefixKey+"Temp_currentlyAvailablePops",newFilter.substring(1))
            //collect all
            let buttonClaimQuery = "button[rel='pop_thumb_claim'].purple_button_L:not([style])";
            if ($(buttonClaimQuery).length >0)
            {
                $(buttonClaimQuery).first().trigger('click');
                logHHAuto("Claimed reward for PoP : "+$(buttonClaimQuery).first().parent().attr('pop_id'));
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDPowerplacemain"));
                return true;
            }



            var filteredPops = getStoredValue(HHStoredVarPrefixKey+"Setting_autoPowerPlacesIndexFilter")?getStoredValue(HHStoredVarPrefixKey+"Setting_autoPowerPlacesIndexFilter").split(";"):[];
            var popUnableToStart = getStoredValue(HHStoredVarPrefixKey+"Temp_PopUnableToStart")?getStoredValue(HHStoredVarPrefixKey+"Temp_PopUnableToStart").split(";"):[];
            //logHHAuto("filteredPops : "+filteredPops);
            var PopToStart:number[]=[];
            $("div.pop_thumb[status='pending_reward']").each(function()
                                                            {
                var pop_id = $(this).attr('pop_id') || '';
                //if index is in filter
                if (filteredPops.includes(pop_id) && ! popUnableToStart.includes(pop_id) && newFilter.includes(pop_id))
                {
                    PopToStart.push(Number(pop_id));
                }
            });


            //get all already started Pop timers
            var currIndex;
            var currTime;
            var minTime = -1;
            var maxTime = -1;
            var e;


            clearTimer('minPowerPlacesTime');
            clearTimer('maxPowerPlacesTime');

            let popListRemaining = $('#pop_info .pop_thumb .pop_thumb_remaining > span');
            popListRemaining.each(function() {
                let $elem=$(this);
                let elementText=$elem.text();
                currIndex = $elem.parents('.pop_thumb_expanded').attr('pop_id');
                if (filteredPops.includes(currIndex) && ! popUnableToStart.includes(currIndex))
                {
                    currTime=convertTimeToInt($elem.text());
                    if (minTime === -1 || currTime === -1 || minTime>currTime)
                    {
                        minTime = currTime;

                    }
                    if (maxTime === -1 || maxTime<currTime)
                    {
                        maxTime = currTime;
                    }
                }
            })

            if (minTime != -1)
            {
                if ( minTime > 7*60*60 )
                {
                    //force check of PowerPlaces every 7 hours // TODO: check time 20min != 7h
                    setTimer('minPowerPlacesTime',randomInterval(20*60, 25*60));
                }
                else if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoPowerPlacesWaitMax") === "true" && maxTime != -1)
                {
                    setTimer('minPowerPlacesTime',Number(maxTime) + randomInterval(2*60, 5*60));
                }
                else
                {
                    setTimer('minPowerPlacesTime',Number(minTime) + randomInterval(1*60, 3*60));
                }
            }
            else
            {
                setTimer('minPowerPlacesTime', randomInterval(60,100));
            }
            if (maxTime != -1)
            {
                setTimer('maxPowerPlacesTime',Number(maxTime)+ randomInterval(1,10));
            }
            //building list of Pop to start
            $("div.pop_thumb[status='can_start']").each(function()
                                                        {
                var pop_id = $(this).attr('pop_id')||'';
                //if index is in filter
                if (filteredPops.includes(pop_id) && !popUnableToStart.includes(pop_id) && newFilter.includes(pop_id))
                {
                    PopToStart.push(Number(pop_id));
                    clearTimer('minPowerPlacesTime');
                }
            });
            if (PopToStart.length === 0)
            {
                sessionStorage.removeItem(HHStoredVarPrefixKey+'Temp_PopUnableToStart');
            }
            logHHAuto("build popToStart : "+PopToStart);
            setStoredValue(HHStoredVarPrefixKey+"Temp_PopToStart", JSON.stringify(PopToStart));
            setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "true");
            setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoopTimeMili")));
            return false;
        }
    }

    
    static girlPower(powerRemaining:number, girlList:any[], selectedGirls:any[]):any[] {
        let subList = girlList;
        if (subList.length>0){
            let currentGirl = subList.pop();
            if(currentGirl.power <= powerRemaining) {
                selectedGirls.push(currentGirl);
                powerRemaining -= currentGirl.power;
            };
            selectedGirls = PlaceOfPower.girlPower(powerRemaining, subList, selectedGirls);
        };
        return selectedGirls;
    }

    // returns boolean to set busy
    static doPowerPlacesStuff(index)
    {
        if(getPage() !== "powerplace"+index)
        {
            logHHAuto("Navigating to powerplace"+index+" page.");
            gotoPage(ConfigHelper.getHHScriptVars("pagesIDActivities"),{tab:"pop",index:index});
            // return busy
            return true;
        }
        else
        {
            logHHAuto("On powerplace"+index+" page.");
            const debugEnabled = getStoredValue(HHStoredVarPrefixKey+"Temp_Debug")==='true';

            //getting reward in case failed on main page
            var querySelectorText = "button[rel='pop_claim']:not([style*='display:none']):not([style*='display: none'])";
            if ($(querySelectorText).length>0)
            {
                $(querySelectorText).click();
                logHHAuto("Claimed powerplace"+index);
                if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoPowerPlacesAll") !== "true")
                {
                    PlaceOfPower.cleanTempPopToStart();
                    gotoPage(ConfigHelper.getHHScriptVars("pagesIDPowerplacemain"));
                    return true;
                }
            }

            if ($("div.pop_right_part div.no_girls_message").length >0)
            {
                PlaceOfPower.addPopToUnableToStart(index,"Unable to start Pop "+index+" no girls available.");
                PlaceOfPower.removePopFromPopToStart(index);
                return false;
            }


            if (getStoredValue(HHStoredVarPrefixKey+"Setting_autoPowerPlacesPrecision") === "true") {
                if (document.getElementsByClassName("acting-power-text").length>0) {
                    PlaceOfPower.selectGirls()
                };

                if (document.getElementsByClassName("pop_remaining").length>0){
                    if (document.getElementsByClassName("pop_remaining")[0].children.length>0) {
                        const remainText = (<HTMLElement>document.getElementsByClassName("pop_remaining")[0].children[0]).innerText
                        logHHAuto("PoP remainText: " + remainText);
                        if (debugEnabled) logHHAuto("PoP acting-power-text: " + $('.acting-power-text').text());
                        const hasRemainDays = remainText.includes("d");
                        // If for some reason we cannot parse the text, set time too high to start
                        // This may cause undesirable loops but for now is considered better than having girls stuck in PoP for days
                        const remainHours = remainText.indexOf("h")?parseInt(remainText.substring(remainText.indexOf("h")-2, remainText.indexOf("h"))):9;
                        const remainMins = remainText.indexOf("m")?parseInt(remainText.substring(remainText.indexOf("m")-2, remainText.indexOf("m"))):59;

                        // If we weren't able to get under 7.5 hours, skip
                        if ((hasRemainDays) || (remainHours > 7) || ((remainHours == 7) && (remainMins > 30))) {
                            PlaceOfPower.addPopToUnableToStart(index,"Unable to start Pop "+index+" too much time remaining.");
                            PlaceOfPower.removePopFromPopToStart(index);
                            return false;
                        } else {
                            querySelectorText = "button.blue_button_L[rel='pop_action']:not([disabled])"
                            if ($(querySelectorText).length>0)
                            {
                                (<HTMLElement>document.querySelector(querySelectorText)).click();
                                logHHAuto("Started powerplace"+index);
                            };
                        };
                    };
                };
            } else {
                if ($("div.grid_view div.not_selected").length === 1)
                {
                    $("div.grid_view div.not_selected").click();
                    logHHAuto("Only one girl available for powerplace n°"+index+ " assigning her.");
                }
                else
                {
                    querySelectorText = "button.blue_button_L[rel='pop_auto_assign']:not([disabled])"
                    if ($(querySelectorText).length>0)
                    {
                        (<HTMLElement>document.querySelector(querySelectorText)).click();
                        logHHAuto("Autoassigned powerplace"+index);
                    }
                }
                querySelectorText = "button.blue_button_L[rel='pop_action']:not([disabled])"
                if ($(querySelectorText).length>0)
                {
                    (<HTMLElement>document.querySelector(querySelectorText)).click();
                    logHHAuto("Started powerplace"+index);
                }
                else if ($("button.blue_button_L[rel='pop_action'][disabled]").length >0 && $("div.grid_view div.pop_selected").length >0)
                {
                    PlaceOfPower.addPopToUnableToStart(index,"Unable to start Pop "+index+" not enough girls available.");
                    PlaceOfPower.removePopFromPopToStart(index);
                    return false;
                }
            };

            PlaceOfPower.removePopFromPopToStart(index);
            // Not busy
            return false;
        }
    }

    static getPowerNeeded():number
    {
        const powerElement = document.getElementsByClassName("acting-power-text");
        let powerText:string|number = (<HTMLElement>powerElement[0]).innerText;

        powerText = powerText.substring(powerText.indexOf("/")+1);
        if (powerText.includes("k") || powerText.includes("K")) {
            powerText = Math.round(parseFloat(powerText) * 1000);
        } else if (powerText.includes("m") || powerText.includes("M")) {
            powerText = Math.round(parseFloat(powerText) * 1000000);
        } else {
            powerText = parseInt(powerText)
        }
        return powerText;
    }

    static selectGirls()
    {
        const debugEnabled = getStoredValue(HHStoredVarPrefixKey+"Temp_Debug")==='true';

        // How much power is needed
        const powerNeeded = PlaceOfPower.getPowerNeeded();

        // Goal is to select girls which add to required power without going over
        // Once completed, if the time will be under 7.5 hours, proceed
        let girlsList:any[] = [];
        if (document.querySelectorAll('[girl]').length>0) {
            let availGirls = document.querySelectorAll('[girl]');
            availGirls.forEach(girl=>{
                const girlObj = {
                    id : parseInt(girl.attributes["girl"].value),
                    power : parseInt(girl.attributes["skill"].value)
                }
                girlsList.push(girlObj);

            });
            girlsList.sort((a,b) => {
                return a.power - b.power;
            });

            const chosenTeam = PlaceOfPower.chooseGirlsTeam(powerNeeded, girlsList);
            availGirls.forEach(availGirlElement => {
                const availGirl = <HTMLElement> availGirlElement;
                chosenTeam.forEach(chosenGirl => {
                    if (parseInt(availGirl.attributes["girl"].value) == chosenGirl.id) {
                        availGirl.click();
                    };
                });
            });
        };
    }

    static chooseGirlsTeam(powerText:number, girlsList:any[])
    {
        //Debug can be enabled by manually setting "HHAuto_Temp_Debug" to true in browser console
        const debugEnabled = getStoredValue(HHStoredVarPrefixKey+"Temp_Debug")==='true';
        let startTime = 0;
        if (debugEnabled) {
            logHHAuto("PoP debug is enabled");
            logHHAuto("PoP power needed:" + powerText);
            startTime = performance.now();
        }

        let girlOptions:any[] = [];

        for (let i = girlsList.length - 1; i >= 0; i--) {
            const loopGirls = girlsList.slice(0, i + 1);
            const loopPower = powerText;
            const loopOptions = PlaceOfPower.girlPower(loopPower, loopGirls, []);
            girlOptions.push(loopOptions);
        };

        let teamScore = 0;
        let chosenTeam:any[] = [];
        girlOptions.forEach((theseGirls) => {
            let thisPower = 0;
            theseGirls.forEach((girl) => {
                thisPower += girl.power;
            });
            // Give the team a score to try and use more efficient teams (ie: fewer girls) instead of just the fastest
            // const kValue = 40;
            const xValue = thisPower / powerText;
            // Reverted to previous algo, seems to work better for now...
            const thisScore = Math.min(1, ((xValue) * ((1 / Math.sqrt(theseGirls.length))+0.28)));
            // const thisScore = Math.min(1, ( (1 - Math.pow(xValue, theseGirls.length)) / (1 - Math.pow(xValue, kValue))));
            // if (debugEnabled) {
            //     logHHAuto("-----------------",
            //     {
            //         xValue: xValue,
            //         power: thisPower + ' / ' + powerText,
            //         score: thisScore + ' / ' + teamScore,
            //         scores:  Math.pow(xValue, theseGirls.length) + ' / ' + Math.pow(xValue, kValue),
            //         nbGirls: theseGirls.length
            //     } );
            // }
            if (thisScore > teamScore) {
                teamScore = thisScore;
                chosenTeam = theseGirls;
            };
        });

        if (debugEnabled) {
            const endTime = performance.now();
            logHHAuto("PoP precision: calculating this team took "+ (endTime-startTime) +"ms");
            let teamPower = 0;
            chosenTeam.forEach((girl:any) => {
                teamPower += girl.power;
            });
            logHHAuto("PoP teamPower:" + teamPower);
            logHHAuto("PoP teamScore:" + teamScore);
            logHHAuto("PoP chosenTeam ("+chosenTeam.length+" girls):" + JSON.stringify(chosenTeam));
        }
        return chosenTeam;
    }
}