import {
    clearTimer,
    convertTimeToInt,
    getHHScriptVars,
    getPage,
    getStoredValue,
    setStoredValue,
    setTimer
} from "../Helper";
import { autoLoop, gotoPage } from "../Service";
import { logHHAuto } from "../Utils";

export class PlaceOfPower {
    static moduleDisplayPopID()
    {
        if ($('.HHPopIDs').length  > 0) {return}
        $('div.pop_list div[pop_id]').each(function() {
            $(this).prepend('<div class="HHPopIDs">'+$(this).attr('pop_id')+'</div>');
        });
    }
    static styles(){
        if(getStoredValue("HHAuto_Setting_compactPowerPlace") === "true")
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
        var popUnableToStart=getStoredValue("HHAuto_Temp_PopUnableToStart")?getStoredValue("HHAuto_Temp_PopUnableToStart"):"";
        logHHAuto(message);
        if (popUnableToStart === "")
        {
            setStoredValue("HHAuto_Temp_PopUnableToStart", String(popIndex));
        }
        else
        {
            setStoredValue("HHAuto_Temp_PopUnableToStart", popUnableToStart+";"+String(popIndex));
        }
    }
    static cleanTempPopToStart()
    {
        sessionStorage.removeItem('HHAuto_Temp_PopUnableToStart');
        sessionStorage.removeItem('HHAuto_Temp_popToStart');
    }
    static removePopFromPopToStart(index)
    {
        var epop;
        var popToSart;
        var newPopToStart;
        popToSart= getStoredValue("HHAuto_Temp_PopToStart")?JSON.parse(getStoredValue("HHAuto_Temp_PopToStart")):[];
        newPopToStart=[];
        for (epop of popToSart)
        {
            if (epop != index)
            {
                newPopToStart.push(epop);
            }
        }
        setStoredValue("HHAuto_Temp_PopToStart", JSON.stringify(newPopToStart));
    }

    static collectAndUpdate()
    {
        if(getPage() !== getHHScriptVars("pagesIDPowerplacemain")
        )
        {
            logHHAuto("Navigating to powerplaces main page.");
            gotoPage(getHHScriptVars("pagesIDPowerplacemain"));
            // return busy
            return true;
        }
        else
        {
            logHHAuto("On powerplaces main page.");
            setStoredValue("HHAuto_Temp_autoLoop", "false");
            logHHAuto("setting autoloop to false");

            setStoredValue("HHAuto_Temp_Totalpops", $("div.pop_list div[pop_id]").length); //Count how many different POPs there are and store them locally
            logHHAuto("totalpops : "+getStoredValue("HHAuto_Temp_Totalpops"));
            var newFilter="";
            if (getStoredValue("HHAuto_Setting_autoPowerPlacesInverted") === "true")
            {
                // starting from last one.
                $("div.pop_list div[pop_id]").each(function(){newFilter=';'+$(this).attr('pop_id')+newFilter;});
            }
            else
            {
                $("div.pop_list div[pop_id]").each(function(){newFilter=newFilter+';'+$(this).attr('pop_id');});
            }
            if (getStoredValue("HHAuto_Setting_autoPowerPlacesAll") === "true")
            {
                setStoredValue("HHAuto_Setting_autoPowerPlacesIndexFilter", newFilter.substring(1));
            }
            setStoredValue("HHAuto_Temp_currentlyAvailablePops",newFilter.substring(1))
            //collect all
            let buttonClaimQuery = "button[rel='pop_thumb_claim'].purple_button_L:not([style])";
            if ($(buttonClaimQuery).length >0)
            {
                $(buttonClaimQuery)[0].click();
                logHHAuto("Claimed reward for PoP : "+$(buttonClaimQuery)[0].parentElement.getAttribute('pop_id'));
                gotoPage(getHHScriptVars("pagesIDPowerplacemain"));
                return true;
            }



            var filteredPops = getStoredValue("HHAuto_Setting_autoPowerPlacesIndexFilter")?getStoredValue("HHAuto_Setting_autoPowerPlacesIndexFilter").split(";"):[];
            var popUnableToStart = getStoredValue("HHAuto_Temp_PopUnableToStart")?getStoredValue("HHAuto_Temp_PopUnableToStart").split(";"):[];
            //logHHAuto("filteredPops : "+filteredPops);
            var PopToStart=[];
            $("div.pop_thumb[status='pending_reward']").each(function()
                                                            {
                var pop_id = $(this).attr('pop_id');
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
                    setTimer('minPowerPlacesTime',Number(20*60)+1);
                }
                else if (getStoredValue("HHAuto_Setting_autoPowerPlacesWaitMax") === "true" && maxTime != -1)
                {
                    setTimer('minPowerPlacesTime',Number(maxTime) + 2*60);
                }
                else
                {
                    setTimer('minPowerPlacesTime',Number(minTime) + 1*60);
                }
            }
            else
            {
                setTimer('minPowerPlacesTime',60);
            }
            if (maxTime != -1)
            {
                setTimer('maxPowerPlacesTime',Number(maxTime)+1);
            }
            //building list of Pop to start
            $("div.pop_thumb[status='can_start']").each(function()
                                                        {
                var pop_id = $(this).attr('pop_id');
                //if index is in filter
                if (filteredPops.includes(pop_id) && !popUnableToStart.includes(pop_id) && newFilter.includes(pop_id))
                {
                    PopToStart.push(Number(pop_id));
                    clearTimer('minPowerPlacesTime');
                }
            });
            if (PopToStart.length === 0)
            {
                sessionStorage.removeItem('HHAuto_Temp_PopUnableToStart');
            }
            logHHAuto("build popToStart : "+PopToStart);
            setStoredValue("HHAuto_Temp_PopToStart", JSON.stringify(PopToStart));
            setStoredValue("HHAuto_Temp_autoLoop", "true");
            setTimeout(autoLoop, Number(getStoredValue("HHAuto_Temp_autoLoopTimeMili")));
            return false;
        }
    }

    
    static girlPower(powerRemaining, girlList, selectedGirls) {
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
            gotoPage(getHHScriptVars("pagesIDActivities"),{tab:"pop",index:index});
            // return busy
            return true;
        }
        else
        {
            logHHAuto("On powerplace"+index+" page.");

            //getting reward in case failed on main page
            var querySelectorText = "button[rel='pop_claim']:not([style*='display:none']):not([style*='display: none'])";
            if ($(querySelectorText).length>0)
            {
                $(querySelectorText).click();
                logHHAuto("Claimed powerplace"+index);
                if (getStoredValue("HHAuto_Setting_autoPowerPlacesAll") !== "true")
                {
                    PlaceOfPower.cleanTempPopToStart();
                    gotoPage(getHHScriptVars("pagesIDPowerplacemain"));
                    return true;
                }
            }

            if ($("div.pop_right_part div.no_girls_message").length >0)
            {
                PlaceOfPower.addPopToUnableToStart(index,"Unable to start Pop "+index+" no girls available.");
                PlaceOfPower.removePopFromPopToStart(index);
                return false;
            }


            if (getStoredValue("HHAuto_Setting_autoPowerPlacesPrecision") === "true") {
                if (document.getElementsByClassName("acting-power-text").length>0) {

                    // How much power is needed
                    const powerElement = document.getElementsByClassName("acting-power-text");
                    let powerText = powerElement[0].innerText;

                    powerText = powerText.substring(powerText.indexOf("/")+1);
                    if (powerText.includes("k") || powerText.includes("K")) {
                        powerText = parseInt(parseFloat(powerText) * 1000);
                    } else if (powerText.includes("m") || powerText.includes("M")) {
                        powerText = parseInt(parseFloat(powerText * 1000000));
                    } else {
                        powerText = parseInt(powerText)
                    }

                    // Goal is to select girls which add to required power without going over
                    // Once completed, if the time will be under 7.5 hours, proceed
                    let girlsList = [];
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

                        //Debug can be enabled by manually setting "HHAuto_Temp_Debug" to true in browser console
                        const debugEnabled = Boolean(getStoredValue("HHAuto_Temp_Debug")!==undefined?(getStoredValue("HHAuto_Temp_Debug")===true?true:false):false);
                        let startTime = 0;
                        if (debugEnabled) {
                            logHHAuto("PoP debug is enabled");
                            startTime = performance.now();
                        }

                        let girlOptions = [];

                        for (let i = girlsList.length - 1; i >= 0; i--) {
                            const loopGirls = girlsList.slice(0, i + 1);
                            const loopPower = powerText;
                            const loopOptions = PlaceOfPower.girlPower(loopPower, loopGirls, []);
                            girlOptions.push(loopOptions);
                        };

                        let teamScore = 0;
                        let chosenTeam = [];
                        girlOptions.forEach((theseGirls) => {
                            let thisPower = 0;
                            theseGirls.forEach((girl) => {
                                thisPower += girl.power;
                            });
                            // Give the team a score to try and use more efficient teams (ie: fewer girls) instead of just the fastest
                            const kValue = 40;
                            const xValue = thisPower / powerText;
                            const thisScore = Math.min(1, ( (1 - Math.pow(xValue, theseGirls.length)) / (1 - Math.pow(xValue, kValue))));
                            if (thisScore > teamScore) {
                                teamScore = thisScore;
                                chosenTeam = theseGirls;
                            };
                        });

                        if (debugEnabled) {
                            const endTime = performance.now();
                            logHHAuto("PoP precision: calculating this team took "+ (endTime-startTime) +"ms");
                        }

                        availGirls.forEach(availGirl => {
                            chosenTeam.forEach(chosenGirl => {
                                if (parseInt(availGirl.attributes["girl"].value) == chosenGirl.id) {
                                    availGirl.click();
                                };
                            });
                        });
                    };
                };

                if (document.getElementsByClassName("pop_remaining").length>0){
                    if (document.getElementsByClassName("pop_remaining")[0].children.length>0) {
                        const remainText = document.getElementsByClassName("pop_remaining")[0].children[0].innerText
                        logHHAuto("PoP remainText: " + remainText);
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
                                document.querySelector(querySelectorText).click();
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
                        document.querySelector(querySelectorText).click();
                        logHHAuto("Autoassigned powerplace"+index);
                    }
                }
                querySelectorText = "button.blue_button_L[rel='pop_action']:not([disabled])"
                if ($(querySelectorText).length>0)
                {
                    document.querySelector(querySelectorText).click();
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
}