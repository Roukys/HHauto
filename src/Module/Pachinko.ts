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
} from '../Helper/index';
import { autoLoop, gotoPage } from '../Service/index';
import { isDisplayedHHPopUp, fillHHPopUp, logHHAuto, maskHHPopUp } from '../Utils/index';
import { HHAuto_inputPattern, HHStoredVarPrefixKey } from '../config/index';

export class Pachinko {

    static getGreatPachinko():boolean {
        return Pachinko.getFreePachinko('great','nextPachinkoTime','great-timer');
    }
    static getMythicPachinko():boolean {
        return Pachinko.getFreePachinko('mythic','nextPachinko2Time', 'mythic-timer');
    }
    static getEquipmentPachinko():boolean {
        return Pachinko.getFreePachinko('equipment','nextPachinkoEquipTime', 'equipment-timer'); // No timer. yet ?
    }

    static getFreePachinko(pachinkoType, pachinkoTimer, timerClass):boolean {
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
            $("#PachinkoButton").on("click", buildPachinkoSelectPopUp);
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
                    numberOfGirlsToWin = JSON.parse(girlsRewards.attr("data-rewards")||'').length;
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
                let fillAllOrbs =  (<HTMLInputElement>document.getElementById("PachinkoFillOrbs")).checked;
    
                if (fillAllOrbs && orbsLeft.length >0)
                {
                    (<HTMLInputElement>document.getElementById("PachinkoXTimes")).value = orbsLeft[0].innerText;
                }
                else
                {
                    (<HTMLInputElement>document.getElementById("PachinkoXTimes")).value = '1';
                }
            }
    
            $("#PachinkoPlayX").on("click", pachinkoPlayXTimes);
            $(document).on('change',"#PachinkoSelector", function() {
                let timerSelector:HTMLSelectElement = <HTMLSelectElement>document.getElementById("PachinkoSelector");
                let selectorText = timerSelector.options[timerSelector.selectedIndex].text;
                if (selectorText === getTextForUI("PachinkoSelectorNoButtons","elementText"))
                {
                    $("#PachinkoLeft").text("");
                    return;
                }
                let orbsLeft = $("div.playing-zone div.btns-section button.blue_button_L[nb_games="+timerSelector.options[timerSelector.selectedIndex].value+"] span[total_orbs]");
    
                if (orbsLeft.length >0)
                {
                    $("#PachinkoLeft").text(orbsLeft[0].innerText + getTextForUI("PachinkoOrbsLeft","elementText"));
                }
                else
                {
                    $("#PachinkoLeft").text('0');
                }
                updateOrbsNumber(orbsLeft);
            });
            $(document).on('change',"#PachinkoFillOrbs", function() {
                let fillAllOrbs =  (<HTMLInputElement>document.getElementById("PachinkoFillOrbs")).checked;
    
                let timerSelector = <HTMLSelectElement>document.getElementById("PachinkoSelector");
                let orbsLeft = $("div.playing-zone div.btns-section button.blue_button_L[nb_games="+timerSelector.options[timerSelector.selectedIndex].value+"] span[total_orbs]");
    
                updateOrbsNumber(orbsLeft);
            });
    
            // Add Timer reset options //changed
            let timerOptions = <HTMLSelectElement>document.getElementById("PachinkoSelector");
            let countTimers=0;
            let PachinkoType = $("div.playing-zone #playzone-replace-info div.cover h2")[0].innerText;
    
            $("div.playing-zone div.btns-section button.blue_button_L").each(function ()
                                                                             {
                let optionElement = <HTMLOptionElement>document.createElement("option");
                let numberOfGames = $(this).attr('nb_games') || '';
                optionElement.value = numberOfGames;
                countTimers++;
                optionElement.text = PachinkoType+" x"+$(this).attr('nb_games');
                timerOptions.add(optionElement);
    
                if (countTimers === 1)
                {
                    let orbsLeft = $("div.playing-zone div.btns-section button.blue_button_L[nb_games="+numberOfGames+"] span[total_orbs]")[0];
                    $("#PachinkoLeft").text(orbsLeft.innerText+ getTextForUI("PachinkoOrbsLeft","elementText"));
                }
            });
    
            let numberOfGirlsToWin = getNumberOfGirlToWinPatchinko();
            $("#girls_to_win").text(numberOfGirlsToWin + " girls to win"); // TODO translate
            $('#PachinkoStopFirstGirl').parent().parent().parent().toggle(numberOfGirlsToWin>0);
    
    
            if(countTimers === 0)
            {
                let optionElement = <HTMLOptionElement>document.createElement("option");
                optionElement.value = countTimers+'';
                optionElement.text = getTextForUI("PachinkoSelectorNoButtons","elementText");
                timerOptions.add(optionElement);
            }
        }
    
        function pachinkoPlayXTimes()
        {
            setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            logHHAuto("setting autoloop to false");
            let timerSelector = <HTMLSelectElement>document.getElementById("PachinkoSelector");
            let ByPassNoGirlChecked = (<HTMLInputElement>document.getElementById("PachinkoByPassNoGirls")).checked;
            let stopFirstGirlChecked = (<HTMLInputElement>document.getElementById("PachinkoStopFirstGirl")).checked;
            let buttonValue = Number(timerSelector.options[timerSelector.selectedIndex].value);
            let buttonSelector = "div.playing-zone div.btns-section button.blue_button_L[nb_games="+buttonValue+"]";
            let orbsLeftSelector:string = buttonSelector+ " span[total_orbs]";
            let orbsToGo = Number((<HTMLInputElement>document.getElementById("PachinkoXTimes")).value);
            let orbsPlayed = 0;

            function getNumberOfOrbsLeft(orbsLeftSelector:string): number
            {
                let orbsLeft = 0;
                if ($(orbsLeftSelector).length > 0)
                {
                    orbsLeft=Number($(orbsLeftSelector).first().text());
                }
                if(isNaN(orbsLeft)) {
                    orbsLeft = 0;
                    logHHAuto("ERROR getting orbs left");
                }
                return orbsLeft;
            }
            const orbsLeft:number = getNumberOfOrbsLeft(orbsLeftSelector);
            if (orbsLeft <= 0)
            {
                logHHAuto('No Orbs left for : '+timerSelector.options[timerSelector.selectedIndex].text);
                $("#PachinkoError").text(getTextForUI("PachinkoSelectorNoButtons","elementText"));
                return;
            }
    
            if ( Number.isNaN(Number(orbsToGo)) || orbsToGo < 1 || orbsToGo > orbsLeft)
            {
                logHHAuto('Invalid orbs number '+orbsToGo);
                $("#PachinkoError").text(getTextForUI("PachinkoInvalidOrbsNb","elementText")+" : "+orbsToGo);
                return;
            }
            let PachinkoPlay =   '<div style="padding:20px 50px; display:flex;flex-direction:column">'
            +   '<p>'+timerSelector.options[timerSelector.selectedIndex].text+' : </p>'
            +   '<p id="PachinkoPlayedTimes" style="padding:0 10px">0/'+orbsToGo+'</p>'
            +  '<label style="width:80px" class="myButton" id="PachinkoPlayCancel">'+getTextForUI("OptionCancel","elementText")+'</label>'
            + '</div>'
            fillHHPopUp("PachinkoPlay",getTextForUI("PachinkoButton","elementText"), PachinkoPlay);
            $("#PachinkoPlayCancel").on("click", () => {
                maskHHPopUp();
                logHHAuto("Cancel clicked, closing popUp.");
            });
            function stopXPachinkoNoGirl(){
                logHHAuto("No more girl on Pachinko, cancelling.");
                maskHHPopUp();
                buildPachinkoSelectPopUp();
                $("#PachinkoError").text(getTextForUI("PachinkoNoGirls","elementText"));
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
                const confirmPachinko = document.getElementById("confirm_pachinko");
                if (confirmPachinko !== null )
                {
                    if (ByPassNoGirlChecked && confirmPachinko.querySelector("#popup_confirm.blue_button_L") !== null)
                    {
                        (<HTMLElement>confirmPachinko.querySelector("#popup_confirm.blue_button_L")).click()
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
                RewardHelper.closeRewardPopupIfAny(false);
                const currentOrbsLeft = getNumberOfOrbsLeft(orbsLeftSelector);
                let spendedOrbs = Number(orbsLeft - currentOrbsLeft);
                $("#PachinkoPlayedTimes").text(spendedOrbs+"/"+orbsToGo);
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