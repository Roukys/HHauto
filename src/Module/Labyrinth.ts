import { 
    ConfigHelper,
    getHHVars,
    getPage,
    getStoredValue,
    queryStringGetParam,
    randomInterval,
    setStoredValue,
    setTimer
} from '../Helper/index';
import { logHHAuto } from '../Utils/index';
import { HHStoredVarPrefixKey } from '../config/index';

class LabyrinthOpponent{
    button: JQuery<HTMLElement> | null;
    type:string;
    isOpponent: boolean;
    isOpponentEasy: boolean;
    isTreasure: boolean;
    isShrine: boolean;
    isNext: boolean;
    power: number;
}

export class Labyrinth {
    static isEnabled(){
        return ConfigHelper.getHHScriptVars("isEnabledLabyrinth",false); // more than 14 girls
    }
    static isEnded(){
        return $('.cleared-labyrinth-container').length > 0;
    }

    static run(){
        const page = getPage();
        if(page === ConfigHelper.getHHScriptVars("pagesIDLabyrinth"))
        {
            /*
            if($('.labChosen').length<=0) {
                logHHAuto("Issue to find labyrinth next step button, retry in 60secs.");
                setTimer('nextLabyrinthTime', randomInterval(60, 70));
                return;
            }
            logHHAuto("On Labyrinth page.");
    
            setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
            logHHAuto("setting autoloop to false");
            $('.labChosen').click();
            */
        }
        else if (page === ConfigHelper.getHHScriptVars("pagesIDLabyrinthPreBattle"))
        {
            logHHAuto("On labyrinth-pre-battle page.");
            let templeID = queryStringGetParam(window.location.search,'id_opponent');
            logHHAuto("Go and fight labyrinth :"+templeID);
            let labyrinthBattleButton =$("#pre-battle .buttons-container .blue_button_L");
            if (labyrinthBattleButton.length >0)
            {
                setStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop", "false");
                logHHAuto("setting autoloop to false");
                labyrinthBattleButton[0].click();
            }
            else
            {
                logHHAuto("Issue to find labyrinth battle button retry in 60secs.");
                setTimer('nextLabyrinthTime', randomInterval(60, 70));
                //gotoPage(ConfigHelper.getHHScriptVars("pagesIDHome"));
            }
        }
        else
        {
            //gotoPage(ConfigHelper.getHHScriptVars("pagesIDLabyrinth"));
        }
    }

    static getCurrentFloorNumber(): number {
        const floorDom = $('#labyrinth-tabs .tab-switcher-fade-in .floor-number-text');
        let floor = 0;
        if (floorDom.length > 0) {
            floor = Number($('#labyrinth-tabs .tab-switcher-fade-in .floor-number-text').text());
            if (isNaN(floor) || floor === 0) {
                logHHAuto("Error getting floor");
                floor = 0;
            }
        }
        return floor;
    }

    static sim(){
        if(getPage() === ConfigHelper.getHHScriptVars("pagesIDLabyrinth"))
        {
            if ($('.labChosen').length > 0 || Labyrinth.isEnded()) {
                return;
            }
            logHHAuto("On Labyrinth page.");

            GM_addStyle('.labChosen {width: 25px; top: 55px; position: relative; left: 35px;}');
    
            const NB_ROW = 11;
            for(let rowIndex = 1; rowIndex <= NB_ROW; rowIndex++) {
                const row = $('#row_'+rowIndex+'.row-hex-container');
                const currentLevel = row.attr('key');
                const items = $('.hex-container:has(.hex-type:not(.completed-hex):not(.hero))', row);
    
                const options:LabyrinthOpponent[] = [];
                if (items.length > 0) {
                    $.each(items,(hexIndex,hex) => {
                        const option = Labyrinth.parseHex(hexIndex,hex);
                        options.push(option);
                    });
                }
    
                logHHAuto("Row " + currentLevel + ". and options " + JSON.stringify(options));
                const choosenOption = Labyrinth.findBetter(options);
                
                if(choosenOption) {
                    Labyrinth.appendChoosenTag(choosenOption);
                    break;
                }
            }
        }
    }

    static findBetter(options:LabyrinthOpponent[]){
        let choosenOption:LabyrinthOpponent|null = null;
        const debugEnabled = getStoredValue(HHStoredVarPrefixKey+"Temp_Debug")==='true';
        const floor = Labyrinth.getCurrentFloorNumber();

        options.forEach((option) =>
        {
            let isBetter = false;
            if(option.button && option.isNext) {
                if (choosenOption == null)
                {
                    if(debugEnabled) logHHAuto('first');
                    isBetter = true;
                }
                else if (floor === 1 || floor === 2)
                {
                    // TODO not ready yet
                    if (!choosenOption.isOpponentEasy && option.isOpponentEasy)
                    {
                        if(debugEnabled) logHHAuto('Floor 1,2: Easy opponent');
                        isBetter = true;
                    }
                    else if (choosenOption.isOpponent && !choosenOption.isOpponentEasy && !option.isOpponent)
                    {
                        if(debugEnabled) logHHAuto('Floor 1,2: not opponent');
                        isBetter = true;
                    }
                    else if (choosenOption.power > option.power)
                    {
                        if(debugEnabled) logHHAuto('Floor 1,2: Powerless opponent');
                        isBetter = true;
                    }
                } else {
                    // Floor 3
                    if(!choosenOption.isShrine && option.isShrine )
                    {
                        if(debugEnabled) logHHAuto('Floor 3: isShrine');
                        isBetter = true;
                    }
                    else if (choosenOption.isOpponent && !option.isOpponent)
                    {
                        if(debugEnabled) logHHAuto('Floor 3: not opponent');
                        isBetter = true;
                    }
                    else if (choosenOption.power > option.power)
                    {
                        if(debugEnabled) logHHAuto('Floor 3: Powerless opponent');
                        isBetter = true;
                    }
                }
            }

            if (isBetter) {
                choosenOption = option;
            }
        });
        return choosenOption;
    }

    static confirmNoHeal(){
        const confirmButton = $('#confirmation_popup #popup_confirm:visible');
        if (confirmButton.length > 0) {
            logHHAuto("Confirm button");
            confirmButton.click();
        }
    }

    static selectReward(){
        // TODO choose reward
        $('#labyrinth_reward_popup #reward_holder .relic-container .relic-card-buttons .claim-relic-btn');
        // relic-container rare-relic
        // relic-container common-relic
        // relic-container common-relic large-card // Girl specific
        // relic-container legendary-relic
        
        // Close reward popup
        $('#labyrinth_reward_popup #reward_holder #close-relic-popup');
    }

    static isChoosen(option){
        const choosen = `<img class="labChosen" src=${ConfigHelper.getHHScriptVars("powerCalcImages").chosen}>`;
        if(option.button && option.isNext) {
            if (option.isShrine || option.isTreasure) {
                option.button.append(choosen);
                return true;
            }
            // TODO opponent order
        }
        return false;
    }

    static appendChoosenTag(option){
        option.button.append(`<img class="labChosen" src=${ConfigHelper.getHHScriptVars("powerCalcImages").chosen}>`);
    }

    static parseHex(hexIndex,hex): LabyrinthOpponent
    {
        // opponent_super_easy / opponent_easy / opponent_medium  / opponent_hard / opponent_boss  
        // shrine / treasure
        const type = $('.clickable-hex', hex).attr('hex_type') || ($('.hex-type', hex).attr('hex_type') || '').replace('hex-type', '').trim();
        const button = $('.clickable-hex', hex);

        return {
            button: button.length > 0 ? button.first() : null,
            type: type,
            isOpponent: type.indexOf('opponent_') >= 0,
            isOpponentEasy: type.indexOf('opponent_easy') >= 0,
            isTreasure: type.indexOf('treasure') >= 0,
            isShrine: type.indexOf('shrine') >= 0,
            isNext: type.indexOf('upcoming-hex') < 0,
            power: Number($('.opponent-power .opponent-power-text', hex).attr('data-power'))
        };
    }
}