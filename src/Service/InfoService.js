import { 
    getHHVars,
    getStoredValue, 
    getTextForUI,
    getTimeLeft ,
    canCollectCompetitionActive, 
    getHHScriptVars,
    getTimer,
    add1000sSeparator,
    getPage,
    setStoredValue
} from "../Helper";

export function createPInfo() {
    var div = document.createElement('div');
    div.innerHTML = '<div id="pInfo" ></div>'.trim(); //height: auto;

    var pInfo = div.firstElementChild;

    pInfo.addEventListener("dblclick", function() {
        let masterSwitch = document.getElementById("master");
        if (masterSwitch.checked === true) {
            setStoredValue("HHAuto_Setting_master", "false");
            masterSwitch.checked = false;
            //console.log("Master switch off");
        } else {
            setStoredValue("HHAuto_Setting_master", "true");
            masterSwitch.checked = true;
            //console.log("Master switch on");
        }
    });
    
    if(getPage()==getHHScriptVars("pagesIDHome"))
    {
        GM_addStyle('#pInfo:hover {max-height : none} #pInfo { max-height : 220px} @media only screen and (max-width: 1025px) {#pInfo { ;top:17% }}');

        if (getStoredValue("HHAuto_Setting_showAdsBack") === "true")
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
                    +'   left : 57%;'
                    +'}'
                    +'#pInfo {'
                    +'   right : 1%;'
                    +'   left : 88%;'
                    +'   top : 8%;'
                    +'   z-index : 1000;'
                    +'   height : 22px;'
                    +'   padding-top : unset;'
                    +'}'
                    +'@media only screen and (max-width: 1025px) {'
                    +'   #pInfo {'
                    +'      top : 13%;'
                    +'   }'
                    +'}');
    }
    return div;
}

export function updateData() {
    //logHHAuto("updating UI");
    document.querySelectorAll("div#sMenu input[pattern]").forEach(currentInput =>
                                                                  {
        currentInput.checkValidity();
    });
    if (getStoredValue("HHAuto_Setting_showInfo") =="true") // && busy==false // && getPage()==getHHScriptVars("pagesIDHome")
    {
        let contest = '';
        if (!canCollectCompetitionActive()) contest = " : Wait for contest";
        var Tegzd='';
        Tegzd+=(getStoredValue("HHAuto_Setting_master") ==="true"?"<span style='color:LimeGreen'>HH auto ++ ON":"<span style='color:red'>HH auto ++ OFF")+'</span>';
        //Tegzd+=(getStoredValue("HHAuto_Setting_master") ==="true"?"<span style='color:LimeGreen'>"+getTextForUI("master","elementText")+" : ON":"<span style='color:red'>"+getTextForUI("master","elementText")+" : OFF")+'</span>';
        //Tegzd+=getTextForUI("master","elementText")+' : '+(getStoredValue("HHAuto_Setting_master") ==="true"?"<span style='color:LimeGreen'>ON":"<span style='color:red'>OFF")+'</span>';
        Tegzd += '<ul>';
        if (getStoredValue("HHAuto_Setting_paranoia") =="true")
        {
            Tegzd += '<li>'+getStoredValue("HHAuto_Temp_pinfo")+': '+getTimeLeft('paranoiaSwitch')+'</li>';
        }
        if (getHHScriptVars('isEnabledTrollBattle',false) && getStoredValue("HHAuto_Setting_autoTrollBattle") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoTrollTitle","elementText")+' : '+getHHVars('Hero.energies.fight.amount')+'/'+getHHVars('Hero.energies.fight.max_regen_amount')+contest+'</li>';
        }
        if (getHHScriptVars("isEnabledSalary",false) && getStoredValue("HHAuto_Setting_autoSalary") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoSalary","elementText")+' : '+getTimeLeft('nextSalaryTime')+'</li>';
        }
        if (getHHScriptVars('isEnabledSeason',false) && getStoredValue("HHAuto_Setting_autoSeason") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoSeasonTitle","elementText")+' '+getHHVars('Hero.energies.kiss.amount')+'/'+getHHVars('Hero.energies.kiss.max_regen_amount')+' : '+getTimeLeft('nextSeasonTime')+'</li>';
        }
        /*if (getHHScriptVars('isEnabledSeason',false) && getStoredValue("HHAuto_Setting_autoSeasonCollect") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoSeasonCollect","elementText")+" "+getTextForUI("autoSeasonTitle","elementText")+' : '+getTimeLeft('nextSeasonCollectTime')+'</li>';
        }
        if (getHHScriptVars('isEnabledPoV',false) && getStoredValue("HHAuto_Setting_autoPoVCollect") =="true")
        {
            Tegzd += '<li>Collect POV : '+getTimeLeft('nextPoVCollectTime')+'</li>';
        }
        if (getHHScriptVars('isEnabledPoG',false) && getStoredValue("HHAuto_Setting_autoPoGCollect") =="true")
        {
            Tegzd += '<li>Collect POG : '+getTimeLeft('nextPoGCollectTime')+'</li>';
        }*/
        if (getHHScriptVars('isEnabledLeagues',false) && getStoredValue("HHAuto_Setting_autoLeagues") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoLeaguesTitle","elementText")+' '+getHHVars('Hero.energies.challenge.amount')+'/'+getHHVars('Hero.energies.challenge.max_regen_amount')+' : '+getTimeLeft('nextLeaguesTime')+'</li>';
        }
        if (getHHScriptVars("isEnabledChamps",false) && getStoredValue("HHAuto_Setting_autoChamps") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoChampsTitle","elementText")+' : '+getTimeLeft('nextChampionTime')+'</li>';
        }
        if (getHHScriptVars("isEnabledClubChamp",false) && getStoredValue("HHAuto_Setting_autoClubChamp") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoClubChamp","elementText")+' : '+getTimeLeft('nextClubChampionTime')+'</li>';
        }
        if (getHHScriptVars('isEnabledPantheon',false) && getStoredValue("HHAuto_Setting_autoPantheon") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoPantheonTitle","elementText")+' : '+getHHVars('Hero.energies.worship.amount')+'/'+getHHVars('Hero.energies.worship.max_regen_amount')+' ('+getTimeLeft('nextPantheonTime')+')'+'</li>';
        }
        if (getHHScriptVars("isEnabledShop",false) && getStoredValue("HHAuto_Setting_updateMarket") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoBuy","elementText")+' : '+getTimeLeft('nextShopTime')+'</li>';
        }
        if (getHHScriptVars("isEnabledMission",false) && getStoredValue("HHAuto_Setting_autoMission") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoMission","elementText")+' : '+getTimeLeft('nextMissionTime')+'</li>';
        }
        if (getHHScriptVars("isEnabledContest",false) && getStoredValue("HHAuto_Setting_autoContest") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoContest","elementText")+' : '+getTimeLeft('nextContestTime')+'</li>';
        }
        if (getHHScriptVars("isEnabledPowerPlaces",false) && getStoredValue("HHAuto_Setting_autoPowerPlaces") =="true")
        {
            Tegzd += '<li>'+getTextForUI("autoPowerPlaces","elementText")+' : '+getTimeLeft('minPowerPlacesTime')+'</li>';
        }
        if ( getHHScriptVars("isEnabledPachinko",false) && getStoredValue("HHAuto_Setting_autoFreePachinko") =="true")
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
        if (getStoredValue("HHAuto_Temp_haveAff"))
        {
            Tegzd += '<li>'+getTextForUI("autoAffW","elementText")+' : '+add1000sSeparator(getStoredValue("HHAuto_Temp_haveAff"))+'</li>';
        }
        if (getStoredValue("HHAuto_Temp_haveExp"))
        {
            Tegzd += '<li>'+getTextForUI("autoExpW","elementText")+' : '+add1000sSeparator(getStoredValue("HHAuto_Temp_haveExp"))+'</li>';
        }
        Tegzd += '</ul>';

        document.getElementById('pInfo').style.display='block';
        if (getStoredValue("HHAuto_Setting_showInfoLeft") === 'true' && getPage() === getHHScriptVars("pagesIDHome")) {
            document.getElementById('pInfo').className='left';
        }
        document.getElementById('pInfo').innerHTML = Tegzd;
    }
    else
    {
        document.getElementById('pInfo').style.display='none';
    }
}