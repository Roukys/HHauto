import { 
    NumberHelper,
    ConfigHelper,
    getHHVars,
    getPage,
    getStoredValue, 
    getTextForUI,
    getTimeLeft ,
    getTimer,
    setStoredValue,
    TimeHelper
} from '../Helper/index';
import { Booster, Contest, LeagueHelper, Pantheon, Season, Troll } from '../Module/index';
import { logHHAuto } from '../Utils/index';
import { HHStoredVarPrefixKey } from '../config/index';

export function createPInfo():JQuery<HTMLElement> {
    const pInfo = $('<div id="pInfo" ></div>');

    if(pInfo != null) {
        pInfo.on("dblclick", function() {
            let masterSwitch = <HTMLInputElement>document.getElementById("master");
            if (masterSwitch.checked === true) {
                setStoredValue(HHStoredVarPrefixKey+"Setting_master", "false");
                masterSwitch.checked = false;
                //console.log("Master switch off");
            } else {
                setStoredValue(HHStoredVarPrefixKey+"Setting_master", "true");
                masterSwitch.checked = true;
                //console.log("Master switch on");
            }
        });
    }
    
    if(getPage()==ConfigHelper.getHHScriptVars("pagesIDHome"))
    {
        GM_addStyle('#pInfo:hover {max-height : none} #pInfo { max-height : 220px} @media only screen and (max-width: 1025px) {#pInfo { ;top:17% }}');

        if (getStoredValue(HHStoredVarPrefixKey+"Setting_showAdsBack") === "true")
        {
            GM_addStyle('#sliding-popups#sliding-popups { z-index : 1}');
        }
    }
    else
    {
        GM_addStyle(''
                    +'#pInfo:hover {'
                    +'   padding-top : 22px;'
                    +'   height : auto;'
                    +'   left : 51%;'
                    +'}'
                    +'#pInfo {'
                    +'   left : 84%;'
                    +'   top : 8%;'
                    +'   z-index : 1000;'
                    +'   height : 22px;'
                    +'   padding-top : unset;'
                    +'}'
                    +'@media only screen and (max-width: 1025px) {'
                    +'   #pInfo {'
                    +'      top : 14%;'
                    +'   }'
                    +'}');
    }
    return pInfo;
}

export function updateData() {
    //logHHAuto("updating UI");
    document.querySelectorAll("div#sMenu input[pattern]").forEach(currentInput =>
                                                                  {
        (<HTMLInputElement>currentInput).checkValidity();
    });
    const pInfo = document.getElementById('pInfo');
    if(pInfo == null) {
        logHHAuto('ERROR pInfo element not found');
        return;
    }
    if (getStoredValue(HHStoredVarPrefixKey+"Setting_showInfo") =="true") // && busy==false // && getPage()==ConfigHelper.getHHScriptVars("pagesIDHome")
    {
        let contest = '';
        if (!TimeHelper.canCollectCompetitionActive()) contest = " : Wait for contest";
        var Tegzd='';
        Tegzd+=(getStoredValue(HHStoredVarPrefixKey+"Setting_master") ==="true"?"<span style='color:LimeGreen'>HH auto ++ ON":"<span style='color:red'>HH auto ++ OFF")+'</span>';
        //Tegzd+=(getStoredValue(HHStoredVarPrefixKey+"Setting_master") ==="true"?"<span style='color:LimeGreen'>"+getTextForUI("master","elementText")+" : ON":"<span style='color:red'>"+getTextForUI("master","elementText")+" : OFF")+'</span>';
        //Tegzd+=getTextForUI("master","elementText")+' : '+(getStoredValue(HHStoredVarPrefixKey+"Setting_master") ==="true"?"<span style='color:LimeGreen'>ON":"<span style='color:red'>OFF")+'</span>';
        //Tegzd+=(getStoredValue(HHStoredVarPrefixKey+"Temp_autoLoop") ==="true"?"<span style='color:LimeGreen;float:right'>Loop ON":"<span style='color:red;float:right'>Loop OFF")+'</span>';
        Tegzd += '<ul>';
        if (getStoredValue(HHStoredVarPrefixKey+"Setting_paranoia") =="true")
        {
            Tegzd += '<li>'+getStoredValue(HHStoredVarPrefixKey+"Temp_pinfo")+': '+getTimeLeft('paranoiaSwitch')+'</li>';
        }
        Tegzd += Contest.getPinfo();
        if (ConfigHelper.getHHScriptVars('isEnabledTrollBattle',false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoTrollBattle") == "true")
        {
            Tegzd += Troll.getPinfo(contest);
        }
        if (ConfigHelper.getHHScriptVars("isEnabledSalary",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSalary") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoSalary","elementText")+' : '+getTimeLeft('nextSalaryTime')+'</li>';
        }
        if (ConfigHelper.getHHScriptVars('isEnabledSeason',false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoSeason") =="true")
        {
            Tegzd += Season.getPinfo();
        }
        /*
        if (ConfigHelper.getHHScriptVars('isEnabledPoV',false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoVCollect") =="true")
        {
            Tegzd += '<li>Collect POV : '+getTimeLeft('nextPoVCollectTime')+'</li>';
        }
        if (ConfigHelper.getHHScriptVars('isEnabledPoG',false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoPoGCollect") =="true")
        {
            Tegzd += '<li>Collect POG : '+getTimeLeft('nextPoGCollectTime')+'</li>';
        }*/
        if (ConfigHelper.getHHScriptVars('isEnabledLeagues',false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoLeagues") =="true")
        {
            Tegzd += LeagueHelper.getPinfo();
        }
        if (ConfigHelper.getHHScriptVars("isEnabledChamps",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoChamps") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoChampsTitle","elementText")+' : '+getTimeLeft('nextChampionTime')+'</li>';
        }
        if (ConfigHelper.getHHScriptVars("isEnabledClubChamp",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoClubChamp") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoClubChamp","elementText")+' : '+getTimeLeft('nextClubChampionTime')+'</li>';
        }
        if (ConfigHelper.getHHScriptVars('isEnabledPantheon',false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoPantheon") =="true")
        {
            Tegzd += Pantheon.getPinfo();
        }
        if (ConfigHelper.getHHScriptVars("isEnabledShop",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_updateMarket") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoBuy","elementText")+' : '+getTimeLeft('nextShopTime')+'</li>';
        }
        if (ConfigHelper.getHHScriptVars("isEnabledMission",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoMission") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoMission","elementText")+' : '+getTimeLeft('nextMissionTime')+'</li>';
        }
        if (ConfigHelper.getHHScriptVars("isEnabledContest",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoContest") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoContest","elementText")+' : '+getTimeLeft('nextContestTime')+'</li>';
        }
        if (ConfigHelper.getHHScriptVars("isEnabledPowerPlaces",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoPowerPlaces") =="true")
        {
            Tegzd += '<li>'+getTextForUI("powerPlacesTitle","elementText")+' : '+getTimeLeft('minPowerPlacesTime')+'</li>';
        }
        if ( ConfigHelper.getHHScriptVars("isEnabledPachinko",false) && getStoredValue(HHStoredVarPrefixKey+"Setting_autoFreePachinko") =="true")
        {
            if (getTimer('nextPachinkoTime') !== -1)
            {
                Tegzd += '<li>'+getTextForUI("autoFreePachinko","elementText")+' : '+getTimeLeft('nextPachinkoTime')+'</li>';
            }
            if (getTimer('nextPachinko2Time') !== -1)
            {
                Tegzd += '<li>'+getTextForUI("autoMythicPachinko","elementText")+' : '+getTimeLeft('nextPachinko2Time')+'</li>';
            }
            if (getTimer('nextPachinkoEquipTime') !== -1)
            {
                Tegzd += '<li>'+getTextForUI("autoEquipmentPachinko","elementText")+' : '+getTimeLeft('nextPachinkoEquipTime')+'</li>';
            }
        }
        if (getTimer('eventMythicNextWave') !== -1)
        {
            Tegzd += '<li>'+getTextForUI("mythicGirlNext","elementText")+' : '+getTimeLeft('eventMythicNextWave')+'</li>';
        }
        if (getTimer('eventSultryMysteryShopRefresh') !== -1)
        {
            Tegzd += '<li>'+getTextForUI("sultryMysteriesEventRefreshShopNext","elementText")+' : '+getTimeLeft('eventSultryMysteryShopRefresh')+'</li>';
        }
        if (getStoredValue(HHStoredVarPrefixKey+"Temp_haveAff"))
        {
            Tegzd += '<li>'+getTextForUI("autoAffW","elementText")+' : '+NumberHelper.add1000sSeparator(getStoredValue(HHStoredVarPrefixKey+"Temp_haveAff"))+'</li>';
        }
        if (getStoredValue(HHStoredVarPrefixKey+"Temp_haveExp"))
        {
            Tegzd += '<li>'+getTextForUI("autoExpW","elementText")+' : '+NumberHelper.add1000sSeparator(getStoredValue(HHStoredVarPrefixKey+"Temp_haveExp"))+'</li>';
        }
        Tegzd += '</ul>';

        pInfo.style.display='block';
        if (getStoredValue(HHStoredVarPrefixKey+"Setting_showInfoLeft") === 'true' && getPage() === ConfigHelper.getHHScriptVars("pagesIDHome")) {
            pInfo.className='left';
        }
        pInfo.innerHTML = Tegzd;
    }
    else
    {
        pInfo.style.display='none';
    }
}