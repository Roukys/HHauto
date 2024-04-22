import { 
    ConfigHelper,
    HHMenu,
    TimeHelper,
    getHHVars,
    getPage,
    getStoredValue,
    getTextForUI,
    hhMenuSelect,
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
    static HAREM_SELECTED_GIRLS = '.harem-panel-girls .harem-girl-container.selected';
    static BUILD_BUTTON_ID = 'hhAutoLabyTeam';

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

    static moduleBuildTeam():void{
        if ($(`.${Labyrinth.BUILD_BUTTON_ID}`).length == 0) {
            const divButtons = $('<div style="position:absolute;left:-55px;top:-310px;width:150%;display:flex;gap:4px;z-index:1"></div>');


            const options = '<option value="1">Tank</option><option value="2">Mage</option><option value="3">Attack</option>';
            ['Back', 'Mid', 'Front'].forEach((value, index) => {
                const select = hhMenuSelect('autoLabyrinthBuild' + value, '', options);
                divButtons.append(select);
            });

            ['Team'/*, 'Tank', 'Mage', 'Attack'*/].forEach((value, index) => {
                const button = $(`<button id="${Labyrinth.BUILD_BUTTON_ID + value}" class="blue_button_L ${Labyrinth.BUILD_BUTTON_ID}" style="padding: 5px;flex-grow: 1;"></button>`);
                button.text(getTextForUI("autoLabyrinthBuild" + value, "elementText"));
                button.on('click', Labyrinth._buildTeam);
                divButtons.append(button);
            });
            

            $('#edit-team-page .boss-bang-panel').append(divButtons);
            ['Front', 'Mid', 'Back'].forEach((value, index) => {
                $('#autoLabyrinthBuild' + value).val((index + 1)+ '').trigger('change');
            });

            GM_registerMenuCommand(getTextForUI("autoLabyrinthBuildTeam", "elementText"), Labyrinth._buildTeam);
        }
    }

    static async _removeLowPowerGirls(){
        const lowPowerGirls = Labyrinth.getLowPowerTeamMember();
        if (lowPowerGirls.length > 0) {
            try {
                const freeGirls = Labyrinth.getHaremGirl(0, true, lowPowerGirls.length);

                for (let i = 0; i < lowPowerGirls.length; i++) {
                    lowPowerGirls[i].trigger('click');
                    await TimeHelper.sleep(randomInterval(400, 700));
                    freeGirls[i].trigger('click');
                    await TimeHelper.sleep(randomInterval(400, 700));
                }
            } catch (err) {
                logHHAuto('Error during changing low power girls');
            }
        }
    }

    static async _buildTeam() {
        // Girl position
        //   1
        // 6   2
        //   0
        // 5   3
        //   4

        setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
        logHHAuto("setting autoloop to false");

        var selectGirl = async (girlPosition: number, girlToBeSelected: JQuery<HTMLElement>) => {
            const girl = $('.team-hexagon .team-member-container.selectable[data-team-member-position="' + girlPosition + '"]');
            if (girl.attr('data-girl-id') != girlToBeSelected.attr('id_girl')) {
                girl.trigger('click');
                await TimeHelper.sleep(randomInterval(400, 700));
                girlToBeSelected.trigger('click');
                await TimeHelper.sleep(randomInterval(400, 700));
            }
        }

        $(`.${Labyrinth.BUILD_BUTTON_ID}`).attr('disabled','disabled');
        if ($(Labyrinth.HAREM_SELECTED_GIRLS).length == 0) {
            $('#auto-fill-team:not([disabled])').trigger('click');
            await TimeHelper.sleep(randomInterval(200, 500));
        }

        // await Labyrinth._removeLowPowerGirls();

        const girlClassFront = Number($('#autoLabyrinthBuildFront').val());
        const frontGirls = Labyrinth.getHaremGirl(girlClassFront);
        let frontGirlIndex = 0;
        if (frontGirls.length >= 1) await selectGirl(2, frontGirls[frontGirlIndex++]);
        if (frontGirls.length >= 2) await selectGirl(3, frontGirls[frontGirlIndex++]);

        const girlClassMid = Number($('#autoLabyrinthBuildMid').val());
        const midGirls = Labyrinth.getHaremGirl(girlClassMid, false, 5);
        let midGirlIndex = girlClassMid == girlClassFront ? frontGirlIndex : 0;
        if (midGirls.length >= (midGirlIndex+1)) await selectGirl(1, midGirls[midGirlIndex++]);
        if (midGirls.length >= (midGirlIndex+1)) await selectGirl(0, midGirls[midGirlIndex++]);
        if (midGirls.length >= (midGirlIndex+1)) await selectGirl(4, midGirls[midGirlIndex++]);

        const girlClassBack = Number($('#autoLabyrinthBuildBack').val());
        const backGirls = Labyrinth.getHaremGirl(girlClassBack, false, 7);
        let backGirlIndex = girlClassBack == girlClassMid ? midGirlIndex : girlClassBack == girlClassFront ? frontGirlIndex : 0;
        if (backGirls.length >= (backGirlIndex+1)) await selectGirl(5, backGirls[backGirlIndex++]);
        if (backGirls.length >= (backGirlIndex+1)) await selectGirl(6, backGirls[backGirlIndex++]);

        $(`.${Labyrinth.BUILD_BUTTON_ID}`).removeAttr('disabled');

        setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "true");
        logHHAuto("setting autoloop to true");
    }

    static getHaremGirl(girlClass: number = 0, excludeSelected = false, numberOfGirls: number = 2): JQuery<HTMLElement>[] {
        const haremGirlSelector = '.harem-panel-girls .harem-girl-container' + (excludeSelected ? ':not(.selected)' : '');
        const hardCoreGirls = [];

        let girls = $(haremGirlSelector);
        for (let i = 0; i < girls.length && hardCoreGirls.length <= numberOfGirls; i++) {
            const tooltipData = $('.girl_img', $(girls[i])).attr(<string>ConfigHelper.getHHScriptVars('girlToolTipData')) || '';
            if (tooltipData == '') {
                logHHAuto('ERROR, no girl information found');
                continue;
            }
            const obj = JSON.parse(tooltipData);
            const remainingEgo = Number($('.ego-bar-container span', $(girls[i])).text().replace('%', ''))
            if ((girlClass == 0 || obj.class == girlClass) && remainingEgo > 50) {
                hardCoreGirls.push($(girls[i]));
            }
        }
        return hardCoreGirls;
    }

    static getLowPowerTeamMember(): JQuery<HTMLElement>[] {
        const teamGirlSelector = '.team-hexagon .team-member-container';
        const lowPowerGirls = [];

        let haremGirls = $(Labyrinth.HAREM_SELECTED_GIRLS);
        for (let i = 0; i < haremGirls.length; i++) {
            const id_girl = $(haremGirls[i]).attr('id_girl');

            const remainingEgo = Number($('.ego-bar-container span', $(haremGirls[i])).text().replace('%', ''))
            if (remainingEgo > 0 && remainingEgo < 30) {
                logHHAuto(`Adding low power girl ${id_girl}`);
                lowPowerGirls.push($(teamGirlSelector + '[data-girl-id="' + id_girl + '"]'));
            }
        }
        return lowPowerGirls;
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