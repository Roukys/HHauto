import { 
    RewardHelper,
    convertTimeToInt,
    getHHScriptVars, 
    getPage, 
    getStoredValue, 
    getTextForUI, 
    hhMenuSwitch, 
    randomInterval, 
    setStoredValue,
    setTimer
} from "../Helper";
import { autoLoop, gotoPage } from "../Service";
import { isDisplayedHHPopUp, fillHHPopUp, logHHAuto, maskHHPopUp } from "../Utils";
import { HHAuto_inputPattern, HHStoredVarPrefixKey } from "../config";

export class Pachinko {

    static getGreatPachinko() {
        Pachinko.getFreePachinko('great','nextPachinkoTime','great-timer');
    }
    static getMythicPachinko() {
        Pachinko.getFreePachinko('mythic','nextPachinko2Time', 'mythic-timer');
    }
    static getEquipmentPachinko() {
        Pachinko.getFreePachinko('equipment','nextPachinkoEquipTime', 'equipment-timer'); // No timer. yet ?
    }

    static getFreePachinko(pachinkoType, pachinkoTimer, timerClass){
        if(!pachinkoType || !pachinkoTimer){
            return false;
        }

        try {
            if(getPage() !== getHHScriptVars("pagesIDPachinko"))
            {
                logHHAuto("Navigating to Pachinko window.");
                gotoPage(getHHScriptVars("pagesIDPachinko"));
                return true;
            }
            else {
                logHHAuto("Detected Pachinko Screen. Fetching Pachinko, setting autoloop to false");
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
                var counter=0;
                logHHAuto('switch to ' + pachinkoType);
                const freeButtonQuery = '#playzone-replace-info button:not([orbs]):not([price]), #playzone-replace-info button[data-free="true"]';
                while ($(freeButtonQuery).length === 0 && (counter++)<250)
                {
                    $('.game-simple-block[type-pachinko='+pachinkoType+']')[0].click();
                }

                if ($(freeButtonQuery).length === 0)
                {
                    logHHAuto('Not ready yet');
                }
                else
                {
                    $(freeButtonQuery)[0].click();
                }

                var npach = $('.'+timerClass+' span[rel="expires"]').text();
                if(npach !== undefined && npach !== null && npach.length > 0)
                {
                    setTimer(pachinkoTimer,Number(convertTimeToInt(npach)) + randomInterval(1,5));
                }
                else
                {
                    logHHAuto("Unable to find "+pachinkoType+" Pachinko time, wait 4h.");
                    setTimer(pachinkoTimer, getHHScriptVars("maxCollectionDelay") + randomInterval(1,10));
                }

                setTimeout( function() {
                    RewardHelper.closeRewardPopupIfAny();
                    setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "true");
                    logHHAuto("setting autoloop to true");
                    setTimeout(autoLoop,randomInterval(500,800));
                },randomInterval(300,600));
            }
            return true;
        }
        catch (ex) {
            logHHAuto("Catched error : Could not collect "+pachinkoType+" Pachinko... " + ex);
            setTimer(pachinkoTimer, getHHScriptVars("maxCollectionDelay") + randomInterval(1,10));
            return false;
        }
    }
    static modulePachinko() {
        const menuID = "PachinkoButton";
        let PachinkoButton = '<div style="position: absolute;left: 52%;top: 100px;width:60px;z-index:10" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("PachinkoButton","tooltip")+'</span><label style="font-size:small" class="myButton" id="PachinkoButton">'+getTextForUI("PachinkoButton","elementText")+'</label></div>'
    
        if (document.getElementById(menuID) === null)
        {
            $("#contains_all section").prepend(PachinkoButton);
            document.getElementById("PachinkoButton").addEventListener("click", buildPachinkoSelectPopUp);
            GM_registerMenuCommand(getTextForUI(menuID,"elementText"), buildPachinkoSelectPopUp);
        }
        else
        {
            return;
        }
    
        function getNumberOfGirlToWinPatchinko(){
            const girlsRewards = $("div.playing-zone .game-rewards .list-prizes .girl_shards");
            let numberOfGirlsToWin = 0;
            if (girlsRewards.length > 0) {
                try {
                    numberOfGirlsToWin = JSON.parse(girlsRewards.attr("data-rewards")).length;
                } catch(exp) {}
            }
            return numberOfGirlsToWin;
        }
    
        function buildPachinkoSelectPopUp()
        {
            let PachinkoMenu =   '<div style="padding:50px; display:flex;flex-direction:column;font-size:15px;" class="HHAutoScriptMenu">'
            +    '<div style="display:flex;flex-direction:row">'
            +     '<div style="padding:10px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("PachinkoSelector","tooltip")+'</span><select id="PachinkoSelector"></select></div>'
            +     '<div style="padding:10px" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("PachinkoLeft","tooltip")+'</span><span id="PachinkoLeft"></span></div>'
            +    '</div>'
            +    '<div class="rowLine">'
            +      '<p id="girls_to_win"></p>'
            +    '</div>'
            +    '<div class="rowLine">'
            +       hhMenuSwitch('PachinkoFillOrbs')
            +       hhMenuSwitch('PachinkoByPassNoGirls')
            +       hhMenuSwitch('PachinkoStopFirstGirl')
            +    '</div>'
            +    '<div class="rowLine">'
            +     '<div style="padding:10px;" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("PachinkoXTimes","tooltip")+'</span><input id="PachinkoXTimes" style="width:50px;height:20px" required pattern="'+HHAuto_inputPattern.menuExpLevel+'" type="text" value="1"></div>'
            +    '</div>'
            +    '<div class="rowLine">'
            +     '<div style="padding:10px;width:50%" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("Launch","tooltip")+'</span><label class="myButton" id="PachinkoPlayX" style="font-size:15px; width:100%;text-align:center">'+getTextForUI("Launch","elementText")+'</label></div>'
            +    '</div>'
            +   '<p style="color: red;" id="PachinkoError"></p>'
            +  '</div>'
            fillHHPopUp("PachinkoMenu",getTextForUI("PachinkoButton","elementText"), PachinkoMenu);
    
            function updateOrbsNumber(orbsLeft){
                let fillAllOrbs = document.getElementById("PachinkoFillOrbs").checked;
    
                if (fillAllOrbs && orbsLeft.length >0)
                {
                    document.getElementById("PachinkoXTimes").value = orbsLeft[0].innerText;
                }
                else
                {
                    document.getElementById("PachinkoXTimes").value = 1;
                }
            }
    
            document.getElementById("PachinkoPlayX").addEventListener("click", pachinkoPlayXTimes);
            $(document).on('change',"#PachinkoSelector", function() {
                let timerSelector = document.getElementById("PachinkoSelector");
                let selectorText = timerSelector.options[timerSelector.selectedIndex].text;
                if (selectorText === getTextForUI("PachinkoSelectorNoButtons","elementText"))
                {
                    document.getElementById("PachinkoLeft").innerText = "";
                    return;
                }
                let orbsLeft = $("div.playing-zone div.btns-section button.blue_button_L[nb_games="+timerSelector.options[timerSelector.selectedIndex].value+"] span[total_orbs]");
    
                if (orbsLeft.length >0)
                {
                    document.getElementById("PachinkoLeft").innerText = orbsLeft[0].innerText + getTextForUI("PachinkoOrbsLeft","elementText");
                }
                else
                {
                    document.getElementById("PachinkoLeft").innerText = 0;
                }
                updateOrbsNumber(orbsLeft);
            });
            $(document).on('change',"#PachinkoFillOrbs", function() {
                let fillAllOrbs = document.getElementById("PachinkoFillOrbs").checked;
    
                let timerSelector = document.getElementById("PachinkoSelector");
                let orbsLeft = $("div.playing-zone div.btns-section button.blue_button_L[nb_games="+timerSelector.options[timerSelector.selectedIndex].value+"] span[total_orbs]");
    
                updateOrbsNumber(orbsLeft);
            });
    
            // Add Timer reset options //changed
            let timerOptions = document.getElementById("PachinkoSelector");
            let countTimers=0;
            let PachinkoType = $("div.playing-zone #playzone-replace-info div.cover h2")[0].innerText;
    
            $("div.playing-zone div.btns-section button.blue_button_L").each(function ()
                                                                             {
                let optionElement = document.createElement("option");
                let numberOfGames = Number($(this).attr('nb_games'))
                optionElement.value = numberOfGames;
                countTimers++;
                optionElement.text = PachinkoType+" x"+$(this).attr('nb_games');
                timerOptions.add(optionElement);
    
                if (countTimers === 1)
                {
                    let orbsLeft = $("div.playing-zone div.btns-section button.blue_button_L[nb_games="+numberOfGames+"] span[total_orbs]")[0];
                    document.getElementById("PachinkoLeft").innerText = orbsLeft.innerText+ getTextForUI("PachinkoOrbsLeft","elementText");;
                }
            });
    
            let numberOfGirlsToWin = getNumberOfGirlToWinPatchinko();
            document.getElementById("girls_to_win").innerText= numberOfGirlsToWin + " girls to win"; // TODO translate
            $('#PachinkoStopFirstGirl').parent().parent().parent().toggle(numberOfGirlsToWin>0);
    
    
            if(countTimers === 0)
            {
                let optionElement = document.createElement("option");
                optionElement.value = countTimers;
                optionElement.text = getTextForUI("PachinkoSelectorNoButtons","elementText");
                timerOptions.add(optionElement);
            }
        }
    
        function pachinkoPlayXTimes()
        {
            setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            logHHAuto("setting autoloop to false");
            let timerSelector = document.getElementById("PachinkoSelector");
            let ByPassNoGirlChecked = document.getElementById("PachinkoByPassNoGirls").checked;
            let stopFirstGirlChecked = document.getElementById("PachinkoStopFirstGirl").checked;
            let buttonValue = Number(timerSelector.options[timerSelector.selectedIndex].value);
            let buttonSelector = "div.playing-zone div.btns-section button.blue_button_L[nb_games="+buttonValue+"]";
            let orbsLeftSelector = buttonSelector+ " span[total_orbs]";
            let orbsLeft = $(orbsLeftSelector);
            let orbsToGo = document.getElementById("PachinkoXTimes").value;
            let orbsPlayed = 0;
    
            if (orbsLeft.length >0)
            {
                orbsLeft=Number(orbsLeft[0].innerText);
            }
            else
            {
                logHHAuto('No Orbs left for : '+timerSelector.options[timerSelector.selectedIndex].text);
                document.getElementById("PachinkoError").innerText=getTextForUI("PachinkoSelectorNoButtons","elementText");
                return;
            }
    
            if ( Number.isNaN(Number(orbsToGo)) || orbsToGo < 1 || orbsToGo > orbsLeft)
            {
                logHHAuto('Invalid orbs number '+orbsToGo);
                document.getElementById("PachinkoError").innerText=getTextForUI("PachinkoInvalidOrbsNb","elementText")+" : "+orbsToGo;
                return;
            }
            let PachinkoPlay =   '<div style="padding:50px; display:flex;flex-direction:column">'
            +   '<p>'+timerSelector.options[timerSelector.selectedIndex].text+' : </p>'
            +   '<p id="PachinkoPlayedTimes" style="padding:10px">0/'+orbsToGo+'</p>'
            +  '<label style="width:80px" class="myButton" id="PachinkoPlayCancel">'+getTextForUI("OptionCancel","elementText")+'</label>'
            + '</div>'
            fillHHPopUp("PachinkoPlay",getTextForUI("PachinkoButton","elementText"), PachinkoPlay);
            document.getElementById("PachinkoPlayCancel").addEventListener("click", function()
                                                                           {
                maskHHPopUp();
                logHHAuto("Cancel clicked, closing popUp.");
    
            });
            function stopXPachinkoNoGirl(){
                logHHAuto("No more girl on Pachinko, cancelling.");
                maskHHPopUp();
                buildPachinkoSelectPopUp();
                document.getElementById("PachinkoError").innerText=getTextForUI("PachinkoNoGirls","elementText");
            }
            function playXPachinko_func()
            {
                if(!isDisplayedHHPopUp())
                {
                    logHHAuto("PopUp closed, cancelling interval, restart autoloop.");
                    setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "true");
                    setTimeout(autoLoop, Number(getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoopTimeMili")));
                    return;
                }
                if (document.getElementById("confirm_pachinko") !== null )
                {
                    if (ByPassNoGirlChecked && document.getElementById("confirm_pachinko").querySelector("#popup_confirm.blue_button_L") !== null)
                    {
                        document.getElementById("confirm_pachinko").querySelector("#popup_confirm.blue_button_L").click();
                    }
                    else
                    {
                        stopXPachinkoNoGirl();
                        return;
                    }
                }
                let numberOfGirlsToWin = getNumberOfGirlToWinPatchinko();
                // if(!ByPassNoGirlChecked && numberOfGirlsToWin === 0) {
                //     stopXPachinkoNoGirl();
                //     return;
                // }
    
                if (stopFirstGirlChecked && $('#rewards_popup #reward_holder .shards_wrapper:visible').length > 0)
                {
                    logHHAuto("Girl in reward, stopping...");
                    maskHHPopUp();
                    buildPachinkoSelectPopUp();
                    return;
                }
                let pachinkoSelectedButton= $(buttonSelector)[0];
                RewardHelper.closeRewardPopupIfAny();
                let currentOrbsLeft = $(orbsLeftSelector);
                if (currentOrbsLeft.length >0)
                {
                    currentOrbsLeft=Number(currentOrbsLeft[0].innerText);
                }
                else
                {
                    currentOrbsLeft = 0;
                }
                let spendedOrbs = Number(orbsLeft - currentOrbsLeft);
                document.getElementById("PachinkoPlayedTimes").innerText = spendedOrbs+"/"+orbsToGo;
                if (spendedOrbs < orbsToGo && currentOrbsLeft > 0)
                {
                    pachinkoSelectedButton.click();
                }
                else
                {
                    logHHAuto("All spent, going back to Selector.");
                    maskHHPopUp();
                    buildPachinkoSelectPopUp();
                    return;
                }
                setTimeout(playXPachinko_func,randomInterval(500,1500));
            }
            setTimeout(playXPachinko_func,randomInterval(500,1500));
        }
    
    }
}