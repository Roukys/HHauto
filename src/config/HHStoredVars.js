import {
    clearTimer,
    getAndStoreCollectPreferences,
    getTextForUI
} from "../Helper";
import { PlaceOfPower } from "../Module";

export const HHStoredVars = {};
//Settings Vars
//Do not move, has to be first one
HHStoredVars.HHAuto_Setting_settPerTab =
    {
    default:"false",
    storage:"localStorage",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
// Rest of settings vars
HHStoredVars.HHAuto_Setting_autoAff =
    {
    default:"500000000",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoAffW =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoBuyBoosters =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:true
};
HHStoredVars.HHAuto_Setting_autoBuyBoostersFilter =
    {
    default:"B1;B2;B3;B4",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"List",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoChamps =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
    newValueFunction:function()
    {
        clearTimer('nextChampionTime');
    }
};
HHStoredVars.HHAuto_Setting_autoChampsForceStart =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
    newValueFunction:function()
    {
        clearTimer('nextChampionTime');
    }
};
HHStoredVars.HHAuto_Setting_autoChampsFilter =
    {
    default:"1;2;3;4;5;6",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"List",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false,
    newValueFunction:function()
    {
        clearTimer('nextChampionTime');
    }
};
HHStoredVars.HHAuto_Setting_autoChampsTeamLoop =
    {
    default:"10",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoChampsGirlThreshold =
    {
    default:"0",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoChampsTeamKeepSecondLine =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoChampsUseEne =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_showClubButtonInPoa =
    {
    default:"true",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoClubChamp =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoClubChampMax =
    {
    default:"999",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoClubForceStart =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoContest =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_compactEndedContests =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoExp =
    {
    default:"500000000",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoExpW =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoFreePachinko =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoLeagues =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoLeaguesAllowWinCurrent =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoLeaguesCollect =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoLeaguesBoostedOnly =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoLeaguesThreeFights =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoLeaguesPowerCalc =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_leagueListDisplayPowerCalc =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoLeaguesSelectedIndex =
    {
    default:"0",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"selectedIndex",
    kobanUsing:false,
    customMenuID:"autoLeaguesSelector",
    isValid:/^[0-9]$/
};
HHStoredVars.HHAuto_Setting_autoLeaguesThreshold =
    {
    default:"0",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoLeaguesSecurityThreshold =
    {
    default:"40",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_compactMissions =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoMission =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoMissionCollect =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoMissionKFirst =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_compactPowerPlace =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoPowerPlaces =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoPowerPlacesAll =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
    newValueFunction:function()
    {
        clearTimer('minPowerPlacesTime');
        PlaceOfPower.cleanTempPopToStart();
    }
};
HHStoredVars.HHAuto_Setting_autoPowerPlacesPrecision =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
};
HHStoredVars.HHAuto_Setting_autoPowerPlacesInverted =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
};
HHStoredVars.HHAuto_Setting_autoPowerPlacesWaitMax =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
};
HHStoredVars.HHAuto_Setting_autoPowerPlacesIndexFilter =
    {
    default:"1;2;3",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"List",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false,
    newValueFunction:function()
    {
        clearTimer('minPowerPlacesTime');
        PlaceOfPower.cleanTempPopToStart();
    }
};
HHStoredVars.HHAuto_Setting_autoQuest =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoSideQuest =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoQuestThreshold =
    {
    default:"0",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoSalary =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
    newValueFunction:function()
    {
        clearTimer('nextSalaryTime');
    }
};
HHStoredVars.HHAuto_Setting_autoSalaryMaxTimer =
    {
    default:"1200",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
/*HHStoredVars.HHAuto_Setting_autoSalaryMinTimer =
    {
    default:"120",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};*/
HHStoredVars.HHAuto_Setting_autoSalaryMinSalary =
    {
    default:"20000",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false,
    newValueFunction:function()
    {
        clearTimer('nextSalaryTime');
    }
};
HHStoredVars.HHAuto_Setting_autoSeason =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoSeasonCollect =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
    events:{"change":function()
            {
                if (this.checked)
                {
                    getAndStoreCollectPreferences("HHAuto_Setting_autoSeasonCollectablesList");
                    clearTimer('nextSeasonCollectTime');
                }
            }
           }
};
HHStoredVars.HHAuto_Setting_autoSeasonCollectAll =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoSeasonCollectablesList =
    {
    default:JSON.stringify([]),
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Array"
};
HHStoredVars.HHAuto_Setting_autoSeasonPassReds =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:true
};
HHStoredVars.HHAuto_Setting_autoSeasonThreshold =
    {
    default:"0",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoSeasonBoostedOnly =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoStats =
    {
    default:"500000000",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoStatsSwitch =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoTrollBattle =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoTrollMythicByPassParanoia =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoTrollSelectedIndex =
    {
    default:"0",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false,
    customMenuID:"autoTrollSelector",
    isValid:/^[0-9]|1[0-5]|98|99$/
};
HHStoredVars.HHAuto_Setting_autoTrollThreshold =
    {
    default:"0",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoChampsForceStartEventGirl =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_buyCombat =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:true
};
HHStoredVars.HHAuto_Setting_buyCombTimer =
    {
    default:"16",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_buyMythicCombat =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:true
};
HHStoredVars.HHAuto_Setting_buyMythicCombTimer =
    {
    default:"16",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoFreeBundlesCollect =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
    events:{"change":function()
            {
                if (this.checked)
                {
                    getAndStoreCollectPreferences("HHAuto_Setting_autoFreeBundlesCollectablesList", getTextForUI("menuDailyCollectableText","elementText"));
                    clearTimer('nextFreeBundlesCollectTime');
                }
            }
           }
};
HHStoredVars.HHAuto_Setting_autoFreeBundlesCollectablesList =
    {
    default:JSON.stringify([]),
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Array"
};
HHStoredVars.HHAuto_Setting_waitforContest =
    {
    default:"true",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_mousePause =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_mousePauseTimeout =
    {
    default:"5000",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value"
};
HHStoredVars.HHAuto_Setting_collectAllTimer =
    {
    default:"12",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    isValid:/^[1-9][0-9]|[1-9]$/
};
HHStoredVars.HHAuto_Setting_eventTrollOrder =
    {
    default:"1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"List",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoBuyTrollNumber =
    {
    default:"20",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"List",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoBuyMythicTrollNumber =
    {
    default:"20",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"List",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_master =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_maxAff =
    {
    default:"50000",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_maxBooster =
    {
    default:"10",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_maxExp =
    {
    default:"10000",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_minShardsX10 =
    {
    default:"10",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false,
    isValid:/^(\d)+$/
};
HHStoredVars.HHAuto_Setting_minShardsX50 =
    {
    default:"50",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_updateMarket =
    {
    default:"true",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_paranoia =
    {
    default:"true",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_paranoiaSettings =
    {
    default:"140-320/Sleep:28800-30400|Active:250-460|Casual:1500-2700/6:Sleep|8:Casual|10:Active|12:Casual|14:Active|18:Casual|20:Active|22:Casual|24:Sleep",
    storage:"Storage()",
    HHType:"Setting"
};
HHStoredVars.HHAuto_Setting_paranoiaSpendsBefore =
    {
    default:"true",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_plusEvent =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_plusEventMythic =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_plusEventMythicSandalWood =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_bossBangEvent =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_bossBangMinTeam =
    {
    default:"5",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_sultryMysteriesEventRefreshShop =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_collectEventChest =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_PoAMaskRewards =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_PoVMaskRewards =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_PoGMaskRewards =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_SeasonMaskRewards =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_SeasonalEventMaskRewards =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_showCalculatePower =
    {
    default:"true",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_showAdsBack =
    {
    default:"true",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_showRewardsRecap =
    {
    default:"true",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_showInfo =
    {
    default:"true",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_showInfoLeft =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_showMarketTools =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_showTooltips =
    {
    default:"true",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_spendKobans0 =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_kobanBank =
    {
    default:"1000000",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Long Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_useX10Fights =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:true
};
HHStoredVars.HHAuto_Setting_useX10FightsAllowNormalEvent =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_useX50Fights =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:true
};
HHStoredVars.HHAuto_Setting_useX50FightsAllowNormalEvent =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_saveDefaults =
    {
    storage:"localStorage",
    HHType:"Setting"
};
HHStoredVars.HHAuto_Setting_autoPantheon =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoPantheonThreshold =
    {
    default:"0",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:true,
    menuType:"value",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoPantheonBoostedOnly =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoSeasonalEventCollect =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
    events:{"change":function()
            {
                if (this.checked)
                {
                    getAndStoreCollectPreferences("HHAuto_Setting_autoSeasonalEventCollectablesList");
                    clearTimer('nextSeasonalEventCollectTime');
                }
            }
           }
};
HHStoredVars.HHAuto_Setting_autoSeasonalEventCollectAll =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoSeasonalEventCollectablesList =
    {
    default:JSON.stringify([]),
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Array"
};
HHStoredVars.HHAuto_Setting_autoPoVCollect =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
    events:{"change":function()
            {
                if (this.checked)
                {
                    getAndStoreCollectPreferences("HHAuto_Setting_autoPoVCollectablesList");
                    clearTimer('nextPoVCollectTime');
                }
            }
           }
};
HHStoredVars.HHAuto_Setting_autoPoVCollectAll =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoPoVCollectablesList =
    {
    default:JSON.stringify([]),
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Array"
};
HHStoredVars.HHAuto_Setting_autoPoGCollect =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
    events:{"change":function()
            {
                if (this.checked)
                {
                    getAndStoreCollectPreferences("HHAuto_Setting_autoPoGCollectablesList");
                    clearTimer('nextPoGCollectTime');
                }
            }
           }
};
HHStoredVars.HHAuto_Setting_autoPoGCollectAll =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoPoGCollectablesList =
    {
    default:JSON.stringify([]),
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Array"
};
HHStoredVars.HHAuto_Setting_compactDailyGoals =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false
};
HHStoredVars.HHAuto_Setting_autoDailyGoalsCollect =
    {
    default:"false",
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Boolean",
    getMenu:true,
    setMenu:true,
    menuType:"checked",
    kobanUsing:false,
    events:{"change":function()
            {
                if (this.checked)
                {
                    getAndStoreCollectPreferences("HHAuto_Setting_autoDailyGoalsCollectablesList", getTextForUI("menuDailyCollectableText","elementText"));
                    clearTimer('nextDailyGoalsCollectTime');
                }
            }
           }
};
HHStoredVars.HHAuto_Setting_autoDailyGoalsCollectablesList =
    {
    default:JSON.stringify([]),
    storage:"Storage()",
    HHType:"Setting",
    valueType:"Array"
};
// Temp vars
HHStoredVars.HHAuto_Temp_autoLoop =
    {
    default:"true",
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_battlePowerRequired =
    {
    default:"0",
    storage:"sessionStorage",
    HHType:"Temp"
};
/*HHStoredVars.HHAuto_Temp_leaguesTarget =
    {
    default:"9",
    storage:"sessionStorage",
    HHType:"Temp",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:false,
    menuType:"value",
    kobanUsing:false,
    customMenuID:"autoLeaguesSelector"
};*/
HHStoredVars.HHAuto_Temp_questRequirement =
    {
    default:"none",
    storage:"sessionStorage",
    HHType:"Temp"
};
/*HHStoredVars.HHAuto_Temp_userLink =
    {
    default:"none",
    storage:"sessionStorage",
    HHType:"Temp"
};*/
HHStoredVars.HHAuto_Temp_autoLoopTimeMili =
    {
    default:"500",
    storage:"Storage()",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_freshStart =
    {
    default:"no",
    storage:"Storage()",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_Logging =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_Debug =
    {
    default: "false",
    storage: "sessionStorage",
    valueType: "Boolean",
    HHType:"Temp"
};
/*HHStoredVars.HHAuto_Temp_trollToFight =
    {
    storage:"sessionStorage",
    HHType:"Temp",
    valueType:"Small Integer",
    getMenu:true,
    setMenu:false,
    menuType:"value",
    kobanUsing:false,
    customMenuID:"autoTrollSelector"
};*/
HHStoredVars.HHAuto_Temp_autoTrollBattleSaveQuest =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_burst =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_charLevel =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_filteredGirlsList =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_haremGirlActions =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_haremGirlMode =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_haremGirlEnd =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_haremGirlLimit =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_eventsGirlz =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_eventGirl =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_autoChampsEventGirls =
    {
    storage:"sessionStorage",
    HHType:"Temp"
    //isValid:/^\[({"girl_id":"(\d)+","champ_id":"(\d)+","girl_shards":"(\d)+","girl_name":"([^"])+","event_id":"([^"])+"},?)+\]$/
};
HHStoredVars.HHAuto_Temp_trollWithGirls =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_fought =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_haveAff =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_haveExp =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_haveBooster =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_hideBeatenOppo =
{
    default:"0",
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_LeagueOpponentList =
    {
    storage:"sessionStorage",
    HHType:"Temp",
    isValid:/^{"expirationDate":\d+,"opponentsList":{("\d+":{((("(win|loss|avgTurns)":\d*[.,]?\d+)|("scoreClass":"(minus|plus|close)")|("points":{("\d{1,3}":\d*[.,]?\d+,?)+})),?)+},?)+}}$/
};
HHStoredVars.HHAuto_Temp_LeagueTempOpponentList =
    {
    storage:"sessionStorage",
    HHType:"Temp",
    isValid:/^{"expirationDate":\d+,"opponentsList":{("\d+":{((("(win|loss|avgTurns|expectedValue)":\d*[.,]?\d+)|("scoreClass":"(minus|plus|close)")|("points":{("\d{1,3}":\d*[.,]?\d+,?)+})),?)+},?)+}}$/
};
/*HHStoredVars.HHAuto_Temp_opponentsListExpirationDate =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};*/
HHStoredVars.HHAuto_Temp_paranoiaLeagueBlocked =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_paranoiaQuestBlocked =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_paranoiaSpendings =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_pinfo =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_PopToStart =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_PopUnableToStart =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_storeContents =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_Timers =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_NextSwitch =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_Totalpops =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_currentlyAvailablePops =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_CheckSpentPoints =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_eventsList =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_bossBangTeam =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_boosterStatus =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_LeagueSavedData =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_HaremSize =
    {
    storage:"localStorage",
    HHType:"Temp",
    isValid:/{"count":(\d)+,"count_date":(\d)+}/
};
HHStoredVars.HHAuto_Temp_LastPageCalled =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_PoVEndDate =
    {
    storage:"localStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_PoGEndDate =
    {
    storage:"localStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_missionsGiftLeft =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_defaultCustomHaremSort =
    {
    storage:"localStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_unkownPagesList =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
HHStoredVars.HHAuto_Temp_trollPoints =
    {
    storage:"sessionStorage",
    HHType:"Temp"
};
