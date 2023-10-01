import {
    getHHScriptVars,
    getHHVars,
    getStoredValue,
    getTextForUI,
    randomInterval,
    setStoredValue
} from "../Helper";
import { logHHAuto } from "../Utils";

export class TeamModule {

    static resetTeam() {
        $('#clear-team').click();
    }
    static validateTeam() {
        $('#validate-team').click();
    }
    
    static moduleChangeTeam()
    {
        if (document.getElementById("ChangeTeamButton") !== null || document.getElementById("ChangeTeamButton2") !== null)
        {
            return;
        }
        let ChangeTeamButton = '<div style="position: absolute;left: 60%;top: 110px;width:60px;z-index:10" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("ChangeTeamButton","tooltip")+'</span><label style="font-size:small" class="myButton" id="ChangeTeamButton">'+getTextForUI("ChangeTeamButton","elementText")+'</label></div>'
        let ChangeTeamButton2 = '<div style="position: absolute;left: 60%;top: 180px;width:60px;z-index:10" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("ChangeTeamButton2","tooltip")+'</span><label style="font-size:small" class="myButton" id="ChangeTeamButton2">'+getTextForUI("ChangeTeamButton2","elementText")+'</label></div>'

        GM_addStyle('.topNumber{top: 2px;left: 12px;width: 100%;position: absolute;text-shadow: 1px 1px 1px black, -1px -1px 1px black;}');

        $("#contains_all section").append(ChangeTeamButton);
        $("#contains_all section").append(ChangeTeamButton2);

        function assignTopTeam()
        {
            setStoredValue("HHAuto_Temp_autoLoop", "false");
            logHHAuto("setting autoloop to false");
            function selectFromHaremBest(i,best)
            {
                let girlToSelect = best?i:i+7;
                //console.log(i,girlToSelect,best);
                let selectedGirl = $('#contains_all section '+getHHScriptVars("IDpanelEditTeam")+' .harem-panel .panel-body .topNumber[position="'+girlToSelect+'"]');
                selectedGirl.click();
                //console.log(selectedGirl);
                if ($('.topNumber').length > girlToSelect && i<7)
                {
                    setTimeout(function () {assignToTeam(i+1,best)},randomInterval(300,600));
                }
                else
                {
                    if (!best)
                    {
                        assignToTeam(1,true);
                    }
                    else
                    {
                        TeamModule.validateTeam();
                    }
                }

            }

            function assignToTeam(i=1,best=false)
            {
                let position=i-1;
                let selectedPosition = $('#contains_all section .player-panel .player-team .team-hexagon .team-member-container.selectable[data-team-member-position="'+position+'"]');
                selectedPosition.click();
                //console.log(selectedPosition);
                setTimeout(function () {selectFromHaremBest(i,best)},randomInterval(300,600));

            }

            let topNumbers=$('.topNumber')
            if (topNumbers.length >0)
            {
                TeamModule.resetTeam();
                assignToTeam(1,true); // true = jump to best team directly
            }
        }

        function setTopTeam(sumFormulaType)
        {
            let arr = $('div[id_girl]');
            let numTop = 16;
            if (numTop > arr.length) numTop = arr.length;
            let deckID = [];
            let deckStat = [];
            for (let z = 0; z < numTop; z++)
            {
                deckID.push(-1);
                deckStat.push(-1);
            }
            let levelPlayer = Number(getHHVars('Hero.infos.level'));
            for (let i = arr.length - 1; i > -1; i--)
            {
                let gID = Number($(arr[i]).attr('id_girl'));
                let obj = JSON.parse($('.girl_img', $(arr[i])).attr(getHHScriptVars('girlToolTipData')));
                //sum formula
                let tempGrades = obj.graded2;
                //console.log(obj,tempGrades);
                let countTotalGrades = (tempGrades.match(/<g/g) || []).length;
                let countFreeGrades = (tempGrades.match(/grey/g) || []).length;
                let currentStat = obj.caracs.carac1 + obj.caracs.carac2 + obj.caracs.carac3;
                //console.log(currentStat);
                if (sumFormulaType == 1)
                {
                    currentStat = obj.caracs.carac1 + obj.caracs.carac2 + obj.caracs.carac3;
                } else  if (sumFormulaType == 2)
                {
                    currentStat = (obj.caracs.carac1 + obj.caracs.carac2 + obj.caracs.carac3) / obj.level * levelPlayer / (1 + 0.3 * (countTotalGrades - countFreeGrades)) * (1 + 0.3 * (countTotalGrades));
                }
                //console.log(obj.level,levelPlayer,countTotalGrades,countFreeGrades);
                //console.log(currentStat);
                let lowNum = 0; //num
                let lowStat = deckStat[0]; //stat
                for (let j = 1; j < deckID.length; j++)
                {
                    if (deckStat[j] < lowStat)
                    {
                        lowNum = j;
                        lowStat = deckStat[j];
                    }
                }
                if (lowStat < currentStat)
                {
                    deckID[lowNum] = gID;
                    deckStat[lowNum] = currentStat;
                }
            }
            let tmpID = 0;
            let tmpStat = 0;
            //console.log(deckStat,deckID);
            for (let i = 0; i < deckStat.length; i++)
            {
                for (let j = i; j < deckStat.length; j++)
                {
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
            for (let i = arr.length - 1; i > -1; i--)
            {
                let gID = Number($(arr[i]).attr('id_girl'));
                if (!deckID.includes(gID)) {
                    arr[i].style.display = "none";
                } else {
                    arr[i].style.display = "";
                }
            }
            let mainTeamPanel = $(getHHScriptVars("IDpanelEditTeam")+' .change-team-panel .panel-body > .harem-panel-girls');
            for (let j = 0; j < deckID.length; j++)
            {
                let newDiv
                let arrSort = $('div[id_girl='+deckID[j]+']');
                if ($(arrSort[0]).find('.topNumber').length==0){
                    newDiv = document.createElement("div");
                    newDiv.className = "topNumber";
                    arrSort[0].prepend(newDiv);
                } else {
                    newDiv =  $(arrSort[0]).find('.topNumber')[0];
                }
                $(arrSort[0]).find('.topNumber')[0];
                newDiv.innerText=j + 1;
                newDiv.setAttribute('position',j+1);
                // Go to girl update page on double click
                newDiv.setAttribute("ondblclick","window.location.href='/girl/"+deckID[j]+"'");
                mainTeamPanel.append(arrSort[0]);
            }
            if (document.getElementById("AssignTopTeam") !== null )
            {
                return;
            }
            else
            {
                let AssignTopTeam = '<div style="position: absolute;top: 80px;width:60px;z-index:10" class="tooltipHH"><span class="tooltipHHtext">'+getTextForUI("AssignTopTeam","tooltip")+'</span><label style="font-size:small" class="myButton" id="AssignTopTeam">'+getTextForUI("AssignTopTeam","elementText")+'</label></div>'
                $("#contains_all section "+getHHScriptVars("IDpanelEditTeam")+" .harem-panel .panel-body").append(AssignTopTeam);
                document.getElementById("AssignTopTeam").addEventListener("click", assignTopTeam);
            }
        }

        document.getElementById("ChangeTeamButton").addEventListener("click", function(){setTopTeam(1)});
        document.getElementById("ChangeTeamButton2").addEventListener("click", function(){setTopTeam(2)});
    }
}