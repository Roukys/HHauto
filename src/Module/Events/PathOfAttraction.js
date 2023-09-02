import {
    getHHScriptVars,
    getStoredValue,
    getPage,
    getGoToClubChampionButton
} from "../../Helper";
import { logHHAuto } from "../../Utils";

export class PathOfAttraction {
    static runOld(){
        //https://nutaku.haremheroes.com/path-of-attraction.html"
        let array = $('#path_of_attraction div.poa.container div.all-objectives .objective.completed');
        if (array.length == 0) {
            return
        }
        let lengthNeeded = $('.golden-block.locked').length > 0 ? 1 : 2;
        for (let i = array.length - 1; i >= 0; i--) {
            if ($(array[i]).find('.picked-reward').length == lengthNeeded) {
                array[i].style.display = "none";
            }
        }
    }
    static run(){
        if (getPage() === getHHScriptVars("pagesIDEvent") && getHHScriptVars("isEnabledClubChamp",false) && window.location.search.includes("tab="+getHHScriptVars('poaEventIDReg')))
        {
            logHHAuto("On path of attraction event.");
            if($(".hh-club-poa").length <= 0) {
                const championsGoal = $('#poa-content .buttons:has(button[data-href="/champions-map.html"])');
                championsGoal.append(getGoToClubChampionButton());
            }
        }
    }
    static styles(){
        if (getStoredValue("HHAuto_Setting_PoAMaskRewards") === "true")
        {
            setTimeout(PathOfAttraction.Hide(),500);
        }
    }
    static Hide(){
        if (getPage() === getHHScriptVars("pagesIDEvent") && window.location.search.includes("tab="+getHHScriptVars('poaEventIDReg')) && getStoredValue("HHAuto_Setting_PoAMaskRewards") === "true")
        {
            let arrayz;
            let nbReward;
            let modified=false;
            arrayz = $('.nc-poa-reward-pair:not([style*="display:none"]):not([style*="display: none"])');
            if ($("#nc-poa-tape-blocker").length)
            {
                nbReward=1;
            }
            else
            {
                nbReward=2;
            }
    
            var obj;
            if (arrayz.length > 0) {
                for (var i2 = arrayz.length - 1; i2 >= 0; i2--) {
                    obj = $(arrayz[i2]).find('.nc-poa-reward-container.claimed');
                    if (obj.length >= nbReward) {
                        //console.log("scroll before : "+document.getElementById('rewards_cont_scroll').scrollLeft);
                        //console.log("width : "+arrayz[i2].offsetWidth);
                        $("#events .nc-panel-body .scroll-area")[0].scrollLeft-=arrayz[i2].offsetWidth;
                        //console.log("scroll after : "+document.getElementById('rewards_cont_scroll').scrollLeft);arrayz[i2].style.display = "none";
                        arrayz[i2].style.display = "none";
                        modified = true;
                    }
                }
            }
        }
    }

}