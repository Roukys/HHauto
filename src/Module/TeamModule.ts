import {
    ConfigHelper,
    HeroHelper,
    getPage,
    getTextForUI,
    hhButton,
    randomInterval,
    setStoredValue
} from '../Helper/index';
import { addNutakuSession } from '../Service/PageNavigationService';
import { getHHAjax, logHHAuto } from '../Utils/index';
import { HHStoredVarPrefixKey } from '../config/index';

export class TeamModule {

    static resetTeam() {
        $('#clear-team').trigger('click');
    }
    static validateTeam() {
        $('#validate-team').trigger('click');
    }
    
    static moduleChangeTeam()
    {
        if (document.getElementById("ChangeTeamButton") !== null || document.getElementById("ChangeTeamButton2") !== null)
        {
            return;
        }
        const buttonStyles = 'position: absolute;left: 60%;width:60px;z-index:10';
        const ChangeTeamButton = hhButton('ChangeTeamButton', 'ChangeTeamButton', buttonStyles + ';top: 110px', 'font-size:small');
        const ChangeTeamButton2 = hhButton('ChangeTeamButton2', 'ChangeTeamButton2', buttonStyles + ';top: 160px', 'font-size:small');
        const UnequipAll = hhButton('UnequipAll', 'UnequipAll', buttonStyles + ';top: 210px', 'font-size:small');

        GM_addStyle('.topNumber{top: 2px;left: 12px;width: 100%;position: absolute;text-shadow: 1px 1px 1px black, -1px -1px 1px black;}');

        $("#contains_all section").append(ChangeTeamButton);
        $("#contains_all section").append(ChangeTeamButton2);
        $("#contains_all section").append(UnequipAll);

        $("#ChangeTeamButton" ).on("click", () => { TeamModule.setTopTeam(1) });
        $("#ChangeTeamButton2").on("click", () => { TeamModule.setTopTeam(2) });
        $("#UnequipAll").on("click", TeamModule.unequipAllGirls);
    }
    
    static moduleEquipTeam()
    {
        if (document.getElementById("EquipAll") !== null)
        {
            return;
        }
        const buttonStyles = 'position: absolute;top: 420px;z-index:10';
        const UnequipAll = hhButton('UnequipAll', 'UnequipAll', buttonStyles + ';left: 75%', 'font-size:small');
        const EquipAll = hhButton('EquipAll', 'EquipAll', buttonStyles + ';left: 85%', 'font-size:small');

        $("#contains_all section").append(EquipAll);
        $("#contains_all section").append(UnequipAll);

        $("#EquipAll").on("click", TeamModule.equipAllGirls);
        $("#UnequipAll").on("click", TeamModule.unequipAllGirls);
    }

    static unequipAllGirls() {
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDEditTeam") || getPage() === ConfigHelper.getHHScriptVars("pagesIDBattleTeams")) {
            logHHAuto('Unequip from edit team');
            $("#UnequipAll").attr('disabled', 'disabled');
            const girlId = TeamModule.getFirstSelectedGirlId();
            if (isNaN(girlId) || girlId < 0) {
                logHHAuto('Error: can\'t get mandatory girl id, cancel action');
                return;
            }
            const currentPage = window.location.pathname + window.location.search;
            // change referer
            //logHHAuto('change referer to ' + '/characters/' + girlId);
            window.history.replaceState(null, '', addNutakuSession('/characters/' + girlId) as string);
            var params1 = {
                action: "girl_equipment_unequip_all_girls"
            };
            getHHAjax()(params1, function(data:any) {
                $("#UnequipAll").removeAttr('disabled');
                // change referer
                //logHHAuto('change referer back to ' + currentPage);
                window.history.replaceState(null, '', addNutakuSession(currentPage) as string);
                setTimeout(function () { location.reload(); }, randomInterval(200, 500));
            });
        } 
        // else if (getPage().match(/^\/characters\/\d+$/)) {
        // TODO unequip from harem page
        //     logHHAuto('Unequip from harem page');
        //     if ($('#unequip_all').length > 0) {
        //         $('#unequip_all').trigger('click');
        //     }
        // }
    }

    static equipAllGirls() {
        if (getPage() === ConfigHelper.getHHScriptVars("pagesIDBattleTeams")) {
            setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
            logHHAuto("Setting autoloop to false to let the equip action complete without interruptions.");

            logHHAuto('Equip team');
            $("#EquipAll").attr('disabled', 'disabled');
            const selectedTeam = $('.team-slot-container.selected-team').attr('data-team-index');
            if(isNaN(Number(selectedTeam))){
                logHHAuto('Error: can\'t get selected team index, cancel action');
                return;
            }
            const girlIds = [...unsafeWindow.teams_data[selectedTeam].girls_ids];
            if (girlIds.length != 7) {
                logHHAuto('Error: can\'t get all team members, cancel action');
                return;
            }
            const currentPage = window.location.pathname + window.location.search;
            let index = 0;
            logHHAuto('Selected team: ' + selectedTeam +', Team members to equip: ' + girlIds.join(', '));

            const equipGirl = (girlId: number) => {
                logHHAuto(`Performing equip action for girl ${girlId} (${index + 1}/${girlIds.length})`);
                // change referer
                //logHHAuto('change referer to ' + '/characters/' + girlId);
                window.history.replaceState(null, '', addNutakuSession('/characters/' + girlId) as string);
                var params1 = {
                    action: "girl_equipment_equip_all",
                    id_girl: girlId
                };
                getHHAjax()(params1, function (data: any) {
                    if (data && data.success){
                        logHHAuto(`Successfully equip girl ${girlId}`);
                    } else logHHAuto(`Failed to equip girl ${girlId}`);
                    index++;

                    if(index <= (girlIds.length - 1)){
                        setTimeout(function () { equipGirl(girlIds[index]) }, randomInterval(800, 1000));
                    } else {
                        $("#EquipAll").removeAttr('disabled');
                        // change referer
                        //logHHAuto('change referer back to ' + currentPage);
                        window.history.replaceState(null, '', addNutakuSession(currentPage) as string);
                        setTimeout(function () { location.reload(); }, randomInterval(200, 500));
                    }
                });
            }
            equipGirl(girlIds[index]);
        } 
    }

    static getFirstSelectedGirlId(): number{
        //const selectedPosition = $('#contains_all section .player-panel .player-team .team-hexagon .team-member-container.selectable[data-team-member-position="0"]');
        const selectedPosition = $('.team-member-container[data-team-member-position="0"]');

        if (selectedPosition.length > 0) {
            return Number(selectedPosition.attr('data-girl-id'));
        }
        return -1;
    }

    static assignTopTeam() {
        setStoredValue(HHStoredVarPrefixKey + "Temp_autoLoop", "false");
        logHHAuto("setting autoloop to false");
        function selectFromHaremBest(i, best) {
            let girlToSelect = best ? i : i + 7;
            //console.log(i,girlToSelect,best);
            let selectedGirl = $('#contains_all section ' + ConfigHelper.getHHScriptVars("IDpanelEditTeam") + ' .harem-panel .panel-body .topNumber[position="' + girlToSelect + '"]');
            selectedGirl.click();
            //console.log(selectedGirl);
            if ($('.topNumber').length > girlToSelect && i < 7) {
                setTimeout(function () { assignToTeam(i + 1, best) }, randomInterval(300, 600));
            }
            else {
                if (!best) {
                    assignToTeam(1, true);
                }
                else {
                    TeamModule.validateTeam();
                }
            }

        }

        function assignToTeam(i = 1, best = false) {
            let position = i - 1;
            let selectedPosition = $('#contains_all section .player-panel .player-team .team-hexagon .team-member-container.selectable[data-team-member-position="' + position + '"]');
            selectedPosition.click();
            //console.log(selectedPosition);
            setTimeout(function () { selectFromHaremBest(i, best) }, randomInterval(300, 600));

        }

        let topNumbers = $('.topNumber')
        if (topNumbers.length > 0) {
            TeamModule.resetTeam();
            assignToTeam(1, true); // true = jump to best team directly
        }
    }

    static setTopTeam(sumFormulaType: number) {
        let arr = $('div[id_girl]');
        let numTop = 16;
        if (numTop > arr.length) numTop = arr.length;
        let deckID: number[] = [];
        let deckStat: number[] = [];
        for (let z = 0; z < numTop; z++) {
            deckID.push(-1);
            deckStat.push(-1);
        }
        let levelPlayer = Number(HeroHelper.getLevel());
        for (let i = arr.length - 1; i > -1; i--) {
            let gID = Number($(arr[i]).attr('id_girl'));
            const tooltipData = $('.girl_img', $(arr[i])).attr(<string>ConfigHelper.getHHScriptVars('girlToolTipData')) || '';
            //const girlData = Harem.getGirlData(gID);
            if (tooltipData == '') {
                logHHAuto('ERROR, no girl information found');
                return;
            }
            let obj = JSON.parse(tooltipData);
            //sum formula
            let tempGrades = obj.graded2;
            //console.log(obj,tempGrades);
            let countTotalGrades = (tempGrades.match(/<g/g) || []).length;
            let countFreeGrades = (tempGrades.match(/grey/g) || []).length;
            let currentStat = obj.caracs.carac1 + obj.caracs.carac2 + obj.caracs.carac3;
            //console.log(currentStat);
            if (sumFormulaType == 1) {
                currentStat = obj.caracs.carac1 + obj.caracs.carac2 + obj.caracs.carac3;
            } else if (sumFormulaType == 2) {
                currentStat = (obj.caracs.carac1 + obj.caracs.carac2 + obj.caracs.carac3) / obj.level * levelPlayer / (1 + 0.3 * (countTotalGrades - countFreeGrades)) * (1 + 0.3 * (countTotalGrades));
            }
            //console.log(obj.level,levelPlayer,countTotalGrades,countFreeGrades);
            //console.log(currentStat);
            let lowNum = 0; //num
            let lowStat = deckStat[0]; //stat
            for (let j = 1; j < deckID.length; j++) {
                if (deckStat[j] < lowStat) {
                    lowNum = j;
                    lowStat = deckStat[j];
                }
            }
            if (lowStat < currentStat) {
                deckID[lowNum] = gID;
                deckStat[lowNum] = currentStat;
            }
        }
        let tmpID = 0;
        let tmpStat = 0;
        //console.log(deckStat,deckID);
        for (let i = 0; i < deckStat.length; i++) {
            for (let j = i; j < deckStat.length; j++) {
                if (deckStat[j] > deckStat[i]) {
                    tmpID = deckID[i];
                    tmpStat = deckStat[i];
                    deckID[i] = deckID[j];
                    deckStat[i] = deckStat[j];
                    deckID[j] = tmpID;
                    deckStat[j] = tmpStat;
                }
            }
        }
        //console.log(deckStat,deckID);
        for (let i = arr.length - 1; i > -1; i--) {
            let gID = Number($(arr[i]).attr('id_girl'));
            if (!deckID.includes(gID)) {
                arr[i].style.display = "none";
            } else {
                arr[i].style.display = "";
            }
        }
        let mainTeamPanel = $(ConfigHelper.getHHScriptVars("IDpanelEditTeam") + ' .change-team-panel .panel-body > .harem-panel-girls');
        for (let j = 0; j < deckID.length; j++) {
            let newDiv
            let arrSort = $('div[id_girl=' + deckID[j] + ']');
            if ($(arrSort[0]).find('.topNumber').length == 0) {
                newDiv = document.createElement("div");
                newDiv.className = "topNumber";
                arrSort[0].prepend(newDiv);
            } else {
                newDiv = $(arrSort[0]).find('.topNumber')[0];
            }
            $(arrSort[0]).find('.topNumber')[0];
            newDiv.innerText = j + 1;
            newDiv.setAttribute('position', j + 1);
            // Go to girl update page on double click
            newDiv.setAttribute("ondblclick", "window.location.href='/characters/" + deckID[j] + "'");
            mainTeamPanel.append(arrSort[0]);
        }
        if (document.getElementById("AssignTopTeam") !== null) {
            return;
        }
        else {
            let AssignTopTeam = '<div style="position: absolute;top: 92px;width:100px;z-index:10;margin-left:90px" class="tooltipHH"><span class="tooltipHHtext">' + getTextForUI("AssignTopTeam", "tooltip") + '</span><label style="font-size:small" class="myButton" id="AssignTopTeam">' + getTextForUI("AssignTopTeam", "elementText") + '</label></div>'
            $("#contains_all section " + ConfigHelper.getHHScriptVars("IDpanelEditTeam") + " .harem-panel .panel-body").append(AssignTopTeam);
            $("#AssignTopTeam").on("click", TeamModule.assignTopTeam);
        }
    }
}