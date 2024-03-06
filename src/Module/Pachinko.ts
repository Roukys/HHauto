import { 
    RewardHelper,
    convertTimeToInt,
    ConfigHelper, 
    getPage, 
    getStoredValue, 
    getTextForUI, 
    hhMenuSwitch, 
    randomInterval, 
    setStoredValue,
    setTimer,
    TimeHelper
} from '../Helper/index';
import { autoLoop, gotoPage } from '../Service/index';
import { isDisplayedHHPopUp, fillHHPopUp, logHHAuto, maskHHPopUp } from '../Utils/index';
import { HHAuto_inputPattern, HHStoredVarPrefixKey } from '../config/index';

export class Pachinko {

    static getGreatPachinko(): Promise<boolean> {
        return Pachinko.getFreePachinko('great','nextPachinkoTime','great-timer');
    }
    static getMythicPachinko(): Promise<boolean> {
        return Pachinko.getFreePachinko('mythic','nextPachinko2Time', 'mythic-timer');
    }
    static getEquipmentPachinko(): Promise<boolean> {
        return Pachinko.getFreePachinko('equipment','nextPachinkoEquipTime', 'equipment-timer');
    }

    static async getFreePachinko(pachinkoType: string, pachinkoTimer: string, timerClass: string):Promise<boolean> {
        if(!pachinkoType || !pachinkoTimer){
            return false;
        }

        try {
            if(getPage() !== ConfigHelper.getHHScriptVars("pagesIDPachinko"))
            {
                logHHAuto("Navigating to Pachinko window.");
                gotoPage(ConfigHelper.getHHScriptVars("pagesIDPachinko"));
                return true;
            }
            else {
                logHHAuto("Detected Pachinko Screen. Fetching Pachinko, setting autoloop to false");
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
                logHHAuto('switch to ' + pachinkoType);
                const equipementSection = '#pachinko_whole .playing-zone';
                const freeButtonQuery = '#playzone-replace-info button[data-free="true"].blue_button_L';

                async function selectPachinko(pachinkoType:string)
                {
                    $('.game-simple-block[type-pachinko=' + pachinkoType + ']').trigger('click');
                    await TimeHelper.sleep(randomInterval(400,600));
                }
                await selectPachinko(pachinkoType);
                if ($(equipementSection).attr('type-panel') != pachinkoType) {
                    logHHAuto(`Error pachinko ${pachinkoType} not loaded after click, retry`);
                    await selectPachinko(pachinkoType);
                }

                if ($(freeButtonQuery).length === 0)
                {
                    logHHAuto('Not ready yet');
                }
                else
                {
                    $(freeButtonQuery).trigger('click');
                }

                var npach = $('.'+timerClass+' span[rel="expires"]').text();
                if(npach !== undefined && npach !== null && npach.length > 0)
                {
                    setTimer(pachinkoTimer,Number(convertTimeToInt(npach)) + randomInterval(1,5));
                }
                else
                {
                    logHHAuto("Unable to find "+pachinkoType+" Pachinko time, wait 4h.");
                    setTimer(pachinkoTimer, ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(1,10));
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
            setTimer(pachinkoTimer, ConfigHelper.getHHScriptVars("maxCollectionDelay") + randomInterval(1,10));
            return false;
        }
    }
    static modulePachinko() {
        const menuID = "PachinkoButton";
        let PachinkoButton = '<div style="position: absolute;left: 52%;top: 100px;width:60px;z-index:10" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("PachinkoButton","tooltip")+'</span><label style="font-size:small" class="myButton" id="PachinkoButton">'+getTextForUI("PachinkoButton","elementText")+'</label></div>'
    
        if (document.getElementById(menuID) === null)
        {
            $("#contains_all section").prepend(PachinkoButton);
            $("#PachinkoButton").on("click", () => { buildPachinkoSelectPopUp(-1)});
            GM_registerMenuCommand(getTextForUI(menuID, "elementText"), () => { buildPachinkoSelectPopUp(-1) });
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
    
        function buildPachinkoSelectPopUp(orbsPlayed: number = -1)
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
            +   `<p id="PachinkoOrbsSpent">${orbsPlayed >= 0 ? getTextForUI("PachinkoOrbsSpent", "elementText") + ' ' + orbsPlayed : ''}</p>`
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
                let orbsLeft = $("div.playing-zone div.btns-section button.blue_button_L[orb_name="+timerSelector.options[timerSelector.selectedIndex].value+"] span[total_orbs]");
    
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
                let timerSelector = <HTMLSelectElement>document.getElementById("PachinkoSelector");
                let orbsLeft = $("div.playing-zone div.btns-section button.blue_button_L[orb_name="+timerSelector.options[timerSelector.selectedIndex].value+"] span[total_orbs]");
    
                updateOrbsNumber(orbsLeft);
            });
    
            // Add Timer reset options //changed
            let timerOptions = <HTMLSelectElement>document.getElementById("PachinkoSelector");
            let countTimers=0;
            let PachinkoType = $("div.playing-zone #playzone-replace-info div.cover h2")[0].innerText;
    
            $("div.playing-zone div.btns-section button.blue_button_L").each(function ()
                                                                             {
                let optionElement = <HTMLOptionElement>document.createElement("option");
                let orbName = $(this).attr('orb_name') || '';
                optionElement.value = orbName;
                countTimers++;
                optionElement.text = `${PachinkoType} x${Pachinko.getHumanPachinkoFromOrbName(orbName)}`;
                timerOptions.add(optionElement);
    
                if (countTimers === 1)
                {
                    let orbsLeft = $("div.playing-zone div.btns-section button.blue_button_L[orb_name="+orbName+"] span[total_orbs]")[0];
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
            let buttonValue:string = timerSelector.options[timerSelector.selectedIndex].value;
            let buttonSelector = "div.playing-zone div.btns-section button.blue_button_L[orb_name="+buttonValue+"]";
            const buttonContinueSelector = '.popup_buttons #play_again:visible';
            let orbsLeftSelector:string = buttonSelector+ " span[total_orbs]";
            let orbsToGo = Number((<HTMLInputElement>document.getElementById("PachinkoXTimes")).value);

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
                // let numberOfGirlsToWin = getNumberOfGirlToWinPatchinko();
                // if(!ByPassNoGirlChecked && numberOfGirlsToWin === 0) {
                //     stopXPachinkoNoGirl();
                //     return;
                // }

                const currentOrbsLeft = getNumberOfOrbsLeft(orbsLeftSelector);
                const spendedOrbs = Number(orbsLeft - currentOrbsLeft);
                if (stopFirstGirlChecked && $('#rewards_popup #reward_holder .shards_wrapper:visible').length > 0)
                {
                    logHHAuto("Girl in reward, stopping...");
                    maskHHPopUp();
                    buildPachinkoSelectPopUp(spendedOrbs);
                    return;
                }
                const pachinkoSelectedButton= $(buttonSelector)[0];
                const continuePachinkoSelectedButton = $(buttonContinueSelector);
                $("#PachinkoPlayedTimes").text(spendedOrbs+"/"+orbsToGo);
                if (spendedOrbs < orbsToGo && currentOrbsLeft > 0)
                {
                    if (continuePachinkoSelectedButton.length > 0) {
                        continuePachinkoSelectedButton.trigger('click');
                    }
                    else {
                        RewardHelper.closeRewardPopupIfAny(false);
                        pachinkoSelectedButton.click();
                    }
                }
                else
                {
                    RewardHelper.closeRewardPopupIfAny(false);
                    logHHAuto("All spent, going back to Selector.");
                    maskHHPopUp();
                    buildPachinkoSelectPopUp(spendedOrbs);
                    return;
                }
                setTimeout(playXPachinko_func,randomInterval(500,1500));
            }
            setTimeout(playXPachinko_func,randomInterval(500,1500));
        }
    
    }

    static getHumanPachinkoFromOrbName(orb_name: string): string
    {
        switch (orb_name) {
            case 'o_v4': return '4';
            case 'o_e1':
            case 'o_eq1':
            case 'o_g1':
            case 'o_m1': return '1';
            case 'o_eq2': return '2';
            case 'o_m3': return '3';
            case 'o_m6': return '6';
            case 'o_eq10':
            case 'o_g10':
            case 'o_e10': return '10';
            case 'o_ed': return 'Draft';
            default: return 'Unknown';
        }
    }
}