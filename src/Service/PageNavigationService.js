import { getHHScriptVars, getPage, randomInterval, setStoredValue, setTimer, url_add_param } from "../Helper";
import { QuestHelper } from "../Module";
import { logHHAuto } from "../Utils";

// Returns true if on correct page.
export function gotoPage(page,inArgs,delay = -1)
{
    var cp=getPage();
    logHHAuto('going '+cp+'->'+page);

    if (typeof delay != 'number' || delay === -1)
    {
        delay = randomInterval(300,500);
    }

    var togoto = undefined;

    // get page path
    switch(page)
    {
        case getHHScriptVars("pagesIDHome"):
            togoto = getHHScriptVars("pagesURLHome");
            break;
        case getHHScriptVars("pagesIDActivities"):
            togoto = getHHScriptVars("pagesURLActivities");
            break;
        case getHHScriptVars("pagesIDMissions"):
            togoto = getHHScriptVars("pagesURLActivities");
            togoto = url_add_param(togoto, "tab",getHHScriptVars("pagesIDMissions"));
            break;
        case getHHScriptVars("pagesIDPowerplacemain"):
            togoto = getHHScriptVars("pagesURLActivities");
            togoto = url_add_param(togoto, "tab","pop");
            break;
        case getHHScriptVars("pagesIDContests"):
            togoto = getHHScriptVars("pagesURLActivities");
            togoto = url_add_param(togoto, "tab",getHHScriptVars("pagesIDContests"));
            break;
        case getHHScriptVars("pagesIDDailyGoals"):
            togoto = getHHScriptVars("pagesURLActivities");
            togoto = url_add_param(togoto, "tab",getHHScriptVars("pagesIDDailyGoals"));
            break;
        case getHHScriptVars("pagesIDHarem"):
            togoto = getHHScriptVars("pagesURLHarem");
            break;
        case getHHScriptVars("pagesIDMap"):
            togoto = getHHScriptVars("pagesURLMap");
            break;
        case getHHScriptVars("pagesIDPachinko"):
            togoto = getHHScriptVars("pagesURLPachinko");
            break;
        case getHHScriptVars("pagesIDLeaderboard"):
            togoto = getHHScriptVars("pagesURLLeaderboard");
            break;
        case getHHScriptVars("pagesIDShop"):
            togoto = getHHScriptVars("pagesURLShop");
            break;
        case getHHScriptVars("pagesIDQuest"):
            togoto = QuestHelper.getNextQuestLink();
            if(togoto === false) {
                logHHAuto("All quests finished, setting timer to check back later!");
                setTimer('nextMainQuestAttempt', 604800); // 1 week delay
                gotoPage(getHHScriptVars("pagesIDHome"));
                return false;
            }
            logHHAuto("Current quest page: "+togoto);
            break;
        case getHHScriptVars("pagesIDPantheon"):
            togoto = getHHScriptVars("pagesURLPantheon");
            break;
        case getHHScriptVars("pagesIDPantheonPreBattle"):
            togoto = getHHScriptVars("pagesURLPantheonPreBattle");
            break;
        case getHHScriptVars("pagesIDChampionsMap"):
            togoto = getHHScriptVars("pagesURLChampionsMap");
            break;
        case getHHScriptVars("pagesIDSeason") :
            togoto = getHHScriptVars("pagesURLSeason");
            break;
        case getHHScriptVars("pagesIDSeasonArena") :
            togoto = getHHScriptVars("pagesURLSeasonArena");
            break;
        case getHHScriptVars("pagesIDClubChampion") :
            togoto = getHHScriptVars("pagesURLClubChampion");
            break;
        case getHHScriptVars("pagesIDLeagueBattle") :
            togoto = getHHScriptVars("pagesURLLeagueBattle");
            break;
        case getHHScriptVars("pagesIDTrollPreBattle") :
            togoto = getHHScriptVars("pagesURLTrollPreBattle");
            break;
        case getHHScriptVars("pagesIDEvent") :
            togoto = getHHScriptVars("pagesURLEvent");
            break;
        case getHHScriptVars("pagesIDClub") :
            togoto = getHHScriptVars("pagesURLClub");
            break;
        case getHHScriptVars("pagesIDPoV") :
            togoto = getHHScriptVars("pagesURLPoV");
            break;
        case getHHScriptVars("pagesIDPoG") :
            togoto = getHHScriptVars("pagesURLPoG");
            break;
        case getHHScriptVars("pagesIDSeasonalEvent") :
            togoto = getHHScriptVars("pagesURLSeasonalEvent");
            break;
        case (page.match(/^\/champions\/[123456]$/) || {}).input:
            togoto = page;
            break;
        case (page.match(/^\/harem\/\d+$/) || {}).input:
            togoto = page;
            break;
        case (page.match(/^\/girl\/\d+$/) || {}).input:
            togoto = page;
            break;
        case (page.match(/^\/quest\/\d+$/) || {}).input:
            togoto = page;
            break;
        case (page.match(/^\/boss-bang-battle.html\?number_of_battles=\d&bb_team_index=[01234]$/) || {}).input:
            togoto = page;
            break;
        default:
            logHHAuto("Unknown goto page request. No page \'"+page+"\' defined.");
    }
    if(togoto != undefined)
    {
        setLastPageCalled(togoto);
        if (typeof inArgs === 'object' && Object.keys(inArgs).length > 0)
        {
            for (let arg of Object.keys(inArgs))
            {
                togoto = url_add_param(togoto, arg,inArgs[arg]);
            }
        }

        setStoredValue("HHAuto_Temp_autoLoop", "false");
        logHHAuto("setting autoloop to false");
        logHHAuto('GotoPage : '+togoto+' in '+delay+'ms.');
        setTimeout(function () {window.location = window.location.origin + togoto;},delay);
    }
    else
    {
        logHHAuto("Couldn't find page path. Page was undefined...");
        setTimeout(function () {location.reload();},delay);
    }
}

function setLastPageCalled(inPage)
{
    //console.log("testingHome : setting to : "+JSON.stringify({page:inPage, dateTime:new Date().getTime()}));
    setStoredValue("HHAuto_Temp_LastPageCalled", JSON.stringify({page:inPage, dateTime:new Date().getTime()}));
}