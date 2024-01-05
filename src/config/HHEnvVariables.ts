import { getLanguageCode } from "../Helper/LanguageHelper";
import { Harem } from '../Module/index';

export const HHKnownEnvironnements = {};
HHKnownEnvironnements["www.hentaiheroes.com"] = {name:"HH_prod",id:"hh_hentai"};
HHKnownEnvironnements["test.hentaiheroes.com"] = {name:"HH_test",id:"hh_hentai"};
HHKnownEnvironnements["www.comixharem.com"] = {name:"CH_prod",id:"hh_comix", baseImgPath:"https://ch.hh-content.com"};
HHKnownEnvironnements["www.gayharem.com"] = {name:"GH_prod",id:"hh_gay"};
HHKnownEnvironnements["www.hornyheroes.com"] = {name:"SH_prod",id:"hh_sexy"};
HHKnownEnvironnements["nutaku.comixharem.com"] = {name:"NCH_prod",id:"hh_comix"};
HHKnownEnvironnements["nutaku.haremheroes.com"] = {name:"NHH_prod",id:"hh_hentai"};
HHKnownEnvironnements["nutaku.gayharem.com"] = {name:"NGH_prod",id:"hh_gay"};
HHKnownEnvironnements["thrix.hentaiheroes.com"] = {name:"THH_prod",id:"hh_hentai"};
HHKnownEnvironnements["eroges.gayharem.com"] = {name:"EGH_prod",id:"hh_gay"};
HHKnownEnvironnements["eroges.hentaiheroes.com"] = {name:"EHH_prod",id:"hh_hentai"};
HHKnownEnvironnements["esprit.hentaiheroes.com"] = {name:"OGHH_prod",id:"hh_hentai"};
HHKnownEnvironnements["www.pornstarharem.com"] = {name:"PH_prod",id:"hh_star", baseImgPath:"https://th.hh-content.com"};
HHKnownEnvironnements["nutaku.pornstarharem.com"] = {name:"NPH_prod",id:"hh_star", baseImgPath:"https://th.hh-content.com"};
HHKnownEnvironnements["www.transpornstarharem.com"] = {name:"TPH_prod",id:"hh_startrans", baseImgPath:"https://images.hh-content.com/startrans"};
HHKnownEnvironnements["nutaku.transpornstarharem.com"] = {name:"NTPH_prod",id:"hh_startrans", baseImgPath:"https://images.hh-content.com/startrans"};
HHKnownEnvironnements["www.mangarpg.com"] = {name:"MRPG_prod",id:"hh_mangarpg", baseImgPath:"https://mh.hh-content.com"};
HHKnownEnvironnements["www.gaypornstarharem.com"] = {name:"GPSH_prod",id:"hh_stargay", baseImgPath:"https://images.hh-content.com/stargay"};
HHKnownEnvironnements["nutaku.gaypornstarharem.com"] = {name:"NGPSH_prod",id:"hh_stargay", baseImgPath:"https://images.hh-content.com/stargay"};


export const HHEnvVariables = {};
HHEnvVariables["global"] = {};
for (let i in HHKnownEnvironnements)
{
    HHEnvVariables[HHKnownEnvironnements[i].name] = {};
    HHEnvVariables[HHKnownEnvironnements[i].name].gameID = HHKnownEnvironnements[i].id;
    HHEnvVariables[HHKnownEnvironnements[i].name].HHGameName = HHKnownEnvironnements[i].name;
    let baseImgPath =  HHKnownEnvironnements[i].baseImgPath ? HHKnownEnvironnements[i].baseImgPath : 'https://hh2.hh-content.com';
    HHEnvVariables[HHKnownEnvironnements[i].name].baseImgPath = baseImgPath;
}

HHEnvVariables["global"].eventIDReg = "event_";
HHEnvVariables["global"].mythicEventIDReg = "mythic_event_";
HHEnvVariables["global"].bossBangEventIDReg = "boss_bang_event_";
HHEnvVariables["global"].sultryMysteriesEventIDReg = "sm_event_";
HHEnvVariables["global"].doublePenetrationEventIDReg = "dp_event_";
HHEnvVariables["global"].poaEventIDReg = "path_event_";
HHEnvVariables["global"].girlToolTipData = "data-new-girl-tooltip";
HHEnvVariables["global"].dailyRewardNotifRequest = "#contains_all header .currency .daily-reward-notif";
HHEnvVariables["global"].IDpanelEditTeam = "#edit-team-page"
HHEnvVariables["global"].shopGirlCountRequest = '#girls_list .g1 .nav_placement span:not([contenteditable]';
HHEnvVariables["global"].shopGirlCurrentRequest = '#girls_list .g1 .nav_placement span[contenteditable]';
HHEnvVariables["global"].selectorFilterNotDisplayNone = ':not([style*="display:none"]):not([style*="display: none"])';
HHEnvVariables["global"].selectorClaimAllRewards = "#claim-all:not([disabled]):visible:not([style*='visibility: hidden;'])"; // KK use visibility: hidden or visibility: visible to display this button
HHEnvVariables["global"].HaremMaxSizeExpirationSecs = 7*24*60*60;//7 days
HHEnvVariables["global"].HaremMinSizeExpirationSecs = 24*60*60;//1 days
HHEnvVariables["global"].LeagueListExpirationSecs = 2*60;//2 min
HHEnvVariables["global"].minSecsBeforeGoHomeAfterActions = 10;
HHEnvVariables["global"].dailyRewardMaxRemainingTime = 2*60*60;
HHEnvVariables["global"].maxCollectionDelay = 6*60*60;
HHEnvVariables["global"].STOCHASTIC_SIM_RUNS = 10000;
HHEnvVariables["global"].PoVPoGTimestampAttributeName = "data-time-stamp";
HHEnvVariables["global"].CHAMP_TICKET_PRICE = 30;
HHEnvVariables["global"].LEVEL_MIN_POV = 30;
HHEnvVariables["global"].LEVEL_MIN_POG = 30;
HHEnvVariables["global"].LEVEL_MIN_LEAGUE = 20;
HHEnvVariables["global"].LEVEL_MIN_PANTHEON = 15;
HHEnvVariables["global"].LEVEL_MIN_EVENT_SM = 15;
HHEnvVariables["global"].boosterId_MB1 = 632;

HHEnvVariables["global"].ELEMENTS =
    {
    chance: {
        darkness: 'light',
        light: 'psychic',
        psychic: 'darkness'
    },
    egoDamage: {
        fire: 'nature',
        nature: 'stone',
        stone: 'sun',
        sun: 'water',
        water: 'fire'
    }
};
HHEnvVariables["global"].powerCalcImages =
    {
    plus:   "https://i.postimg.cc/qgkpN0sZ/Opponent-green.png",
    close:  "https://i.postimg.cc/3JCgVBdK/Opponent-orange.png",
    minus:  "https://i.postimg.cc/PxgxrBVB/Opponent-red.png",
    chosen: "https://i.postimg.cc/MfKwNbZ8/Opponent-go.png"
};

HHEnvVariables["global"].possibleRewardsList = {'energy_kiss' : "Kisses",
                                                'energy_quest' : "Quest energy",
                                                'energy_fight' : "Fights",
                                                'xp' : "Exp",
                                                'girl_shards' : "Girl shards",
                                                'random_girl_shards' : "Random girl shards",
                                                'soft_currency' : "Ymens",
                                                'hard_currency' : "Kobans",
                                                'gift':"Gifts",
                                                'potion' : "Potions",
                                                'booster' : "Boosters",
                                                'orbs': "Orbs",
                                                'gems' : "Gems",
                                                'scrolls' : "Light Bulbs",
                                                'mythic' : "Mythic Rquipment",
                                                'avatar': "Avatar",
                                                'ticket' : "Champions' tickets",
                                                'event_cash' : "Event cash"};

HHEnvVariables["global"].trollzList =  ["Latest",
                                        "Dark Lord",
                                        "Ninja Spy",
                                        "Gruntt",
                                        "Edwarda",
                                        "Donatien",
                                        "Silvanus",
                                        "Bremen",
                                        "Finalmecia",
                                        "Roko Senseï",
                                        "Karole",
                                        "Jackson\'s Crew",
                                        "Pandora witch",
                                        "Nike",
                                        "Sake",
                                        "WereBunny Police",
                                        "Auga",
                                        "Gross"];

HHEnvVariables["global"].trollIdMapping =  []; // Empty means no specific mapping

HHEnvVariables["global"].trollGirlsID = [
    [['8', '9', '10'], ['7270263'], ['979916751']],
    [['14', '13', '12'], ['318292466'], ['936580004']],
    [['19', '16', '18'], ['610468472'], ['54950499']],
    [['29', '28', '26'], ['4749652'], ['345655744']],
    [['39', '40', '41'], ['267784162'], ['763020698']],
    [['64', '63', '31'], ['406004250'], ['864899873']],
    [['85', '86', '84'], ['267120960'], ['536361248']],
    [['114', '115', '116'], ['379441499'], ['447396000']],
    [['1247315', '4649579', '7968301'], ['46227677'], ['933487713']],
    [['1379661', '4479579', '1800186'], ['985085118'], ['339765042']],
    [['24316446', '219651566', '501847856'], ['383709663'], ['90685795']],
    [['225365882', '478693885', '231765083'], ['155415482'], ['769649470']],
    [['86962133', '243793871', '284483399'], [0], [0]],
    [['612527302', '167231135', '560979916', '184523411', '549524850', '784911160'], [0], [0]],
    [['164866290', '696124016', '841591253'], [0], [0]],
    [['344730128', '735302216', '851893423'], [0], [0]],
    [['547099506', '572827174', '653889168'], [0], [0]],
];
HHEnvVariables["global"].lastQuestId = 1808; //  TODO update when new quest comes

HHEnvVariables["global"].leaguesList = ["Wanker I",
                                        "Wanker II",
                                        "Wanker III",
                                        "Sexpert I",
                                        "Sexpert II",
                                        "Sexpert III",
                                        "Dicktator I",
                                        "Dicktator II",
                                        "Dicktator III"];
switch (getLanguageCode())
{
    case "fr":
        HHEnvVariables["global"].trollzList = ["Dernier",
                                               "Dark Lord",
                                               "Espion Ninja",
                                               "Gruntt",
                                               "Edwarda",
                                               "Donatien",
                                               "Silvanus",
                                               "Bremen",
                                               "Finalmecia",
                                               "Roko Senseï",
                                               "Karole",
                                               "Jackson",
                                               "Pandora",
                                               "Nike",
                                               "Sake",
                                               "Police des Lapines-Garous",
                                               "Auga",
                                               "Gross"];
        HHEnvVariables["global"].leaguesList = ["Branleur I",
                                                "Branleur II",
                                                "Branleur III",
                                                "Sexpert I",
                                                "Sexpert II",
                                                "Sexpert III",
                                                "Dicktateur I",
                                                "Dicktateur II",
                                                "Dicktateur III"];
        break;
    default:

        break;
}

function compareOwnFirst(a, b, final_comparaison)
{
    if (a.own && !b.own) {
        return -1
    } else if (!a.own && b.own) {
        return 1
    }
    return final_comparaison
}

HHEnvVariables["global"].haremSortingFunctions = {};
HHEnvVariables["global"].haremSortingFunctions.DateAcquired = function (a, b)
{
    if (a.gData.own && b.gData.own) {
        var dateA = new Date(a.gData.date_added).getTime();
        var dateB = new Date(b.gData.date_added).getTime();
        return dateA - dateB
    } else if (a.gData.own && !b.gData.own)
        return -1;
    else if (!a.gData.own && b.gData.own)
        return 1;
    else
        return b.shards - a.shards
};
HHEnvVariables["global"].haremSortingFunctions.Name = function sortByName(a, b)
{
    var nameA = a.gData.name.toUpperCase();
    var nameB = b.gData.name.toUpperCase();
    if (a.gData.own == b.gData.own) {
        if (nameA < nameB)
            return -1;
        if (nameA > nameB)
            return 1;
        return 0
    } else if (a.gData.own && !b.gData.own)
        return -1;
    else if (!a.gData.own && b.gData.own)
        return 1
};
HHEnvVariables["global"].haremSortingFunctions.Grade = function sortByGrade(a, b)
{
    return compareOwnFirst(a.gData, b.gData, b.gData.graded - a.gData.graded)
};
HHEnvVariables["global"].haremSortingFunctions.Level = function sortByLevel(a, b)
{
    return compareOwnFirst(a.gData, b.gData, b.gData.level - a.gData.level)
};
HHEnvVariables["global"].haremSortingFunctions.Power = function sortByPower(a, b)
{
    return compareOwnFirst(a.gData, b.gData, b.gData.caracs.carac1 + b.gData.caracs.carac2 + b.gData.caracs.carac3 - a.gData.caracs.carac1 - a.gData.caracs.carac2 - a.gData.caracs.carac3)
}
HHEnvVariables["global"].haremSortingFunctions.upgrade_cost = function sortByUpgradeCost(a, b)
{
    const aCost = (Number(a.gData.nb_grades) === Number(a.gData.graded) || !a.gData.own ) ? 0 : Harem.getGirlUpgradeCost(a.gData.rarity, a.gData.graded + 1);
    const bCost = (Number(b.gData.nb_grades) === Number(b.gData.graded) || !b.gData.own ) ? 0 : Harem.getGirlUpgradeCost(b.gData.rarity, b.gData.graded + 1);
    return compareOwnFirst(a.gData, b.gData, bCost - aCost )
}

HHEnvVariables["global"].pagesKnownList = [];

HHEnvVariables["global"].pagesIDHome = "home";
HHEnvVariables["global"].pagesURLHome = "/home.html";
HHEnvVariables["global"].pagesKnownList.push("Home");

HHEnvVariables["global"].pagesIDMissions = "missions";
HHEnvVariables["global"].pagesKnownList.push("Missions");

HHEnvVariables["global"].pagesIDContests = "contests";
HHEnvVariables["global"].pagesKnownList.push("Contests");

HHEnvVariables["global"].pagesIDDailyGoals = "daily_goals";
HHEnvVariables["global"].pagesKnownList.push("DailyGoals");

HHEnvVariables["global"].pagesIDQuest = "quest";
HHEnvVariables["global"].pagesKnownList.push("Quest");

HHEnvVariables["global"].pagesIDActivities = "activities";
HHEnvVariables["global"].pagesURLActivities = "/activities.html";
HHEnvVariables["global"].pagesKnownList.push("Activities");

HHEnvVariables["global"].pagesIDHarem = "harem";
HHEnvVariables["global"].pagesURLHarem = "/harem.html";
HHEnvVariables["global"].pagesKnownList.push("Harem");

HHEnvVariables["global"].pagesIDGirlPage = "girl";
HHEnvVariables["global"].pagesKnownList.push("GirlPage");

HHEnvVariables["global"].pagesIDMap = "map";
HHEnvVariables["global"].pagesURLMap = "/map.html";
HHEnvVariables["global"].pagesKnownList.push("Map");

HHEnvVariables["global"].pagesIDPachinko = "pachinko";
HHEnvVariables["global"].pagesURLPachinko = "/pachinko.html";
HHEnvVariables["global"].pagesKnownList.push("Pachinko");

HHEnvVariables["global"].pagesIDLeaderboard = "leaderboard";
HHEnvVariables["global"].pagesURLLeaderboard = "/tower-of-fame.html";
HHEnvVariables["global"].pagesKnownList.push("Leaderboard");

HHEnvVariables["global"].pagesIDShop = "shop";
HHEnvVariables["global"].pagesURLShop = "/shop.html";
HHEnvVariables["global"].pagesKnownList.push("Shop");

HHEnvVariables["global"].pagesIDClub = "clubs";
HHEnvVariables["global"].pagesURLClub = "/clubs.html";
HHEnvVariables["global"].pagesKnownList.push("Club");

HHEnvVariables["global"].pagesIDPantheon = "pantheon";
HHEnvVariables["global"].pagesURLPantheon = "/pantheon.html";
HHEnvVariables["global"].pagesKnownList.push("Pantheon");

HHEnvVariables["global"].pagesIDPantheonPreBattle = "pantheon-pre-battle";
HHEnvVariables["global"].pagesURLPantheonPreBattle = "/pantheon-pre-battle.html";
HHEnvVariables["global"].pagesKnownList.push("PantheonPreBattle");

HHEnvVariables["global"].pagesIDLabyrinth = "labyrinth";
HHEnvVariables["global"].pagesURLabyrinth = "/labyrinth.html";
HHEnvVariables["global"].pagesKnownList.push("Labyrinth");

HHEnvVariables["global"].pagesIDLabyrinthPreBattle = "labyrinth-pre-battle";
HHEnvVariables["global"].pagesURLLabyrinthPreBattle = "/labyrinth-pre-battle.html";
HHEnvVariables["global"].pagesKnownList.push("LabyrinthPreBattle");

HHEnvVariables["global"].pagesIDLabyrinthBattle = "labyrinth-battle";
HHEnvVariables["global"].pagesURLLabyrinthBattle = "/labyrinth-battle.html";
HHEnvVariables["global"].pagesKnownList.push("LabyrinthBattle");


HHEnvVariables["global"].pagesIDChampionsPage = "champions";
HHEnvVariables["global"].pagesKnownList.push("ChampionsPage");

HHEnvVariables["global"].pagesIDChampionsMap = "champions_map";
HHEnvVariables["global"].pagesURLChampionsMap = "/champions-map.html";
HHEnvVariables["global"].pagesKnownList.push("ChampionsMap");

HHEnvVariables["global"].pagesIDSeason = "season";
HHEnvVariables["global"].pagesURLSeason = "/season.html";
HHEnvVariables["global"].pagesKnownList.push("Season");

HHEnvVariables["global"].pagesIDSeasonArena = "season_arena";
HHEnvVariables["global"].pagesURLSeasonArena = "/season-arena.html";
HHEnvVariables["global"].pagesKnownList.push("SeasonArena");

HHEnvVariables["global"].pagesIDClubChampion = "club_champion";
HHEnvVariables["global"].pagesURLClubChampion = "/club-champion.html";
HHEnvVariables["global"].pagesKnownList.push("ClubChampion");

HHEnvVariables["global"].pagesIDLeagueBattle = "league-battle";
HHEnvVariables["global"].pagesURLLeagueBattle = "/league-battle.html";
HHEnvVariables["global"].pagesKnownList.push("LeagueBattle");

HHEnvVariables["global"].pagesIDLeaguePreBattle = "leagues-pre-battle";
HHEnvVariables["global"].pagesURLLeaguPreBattle = "/leagues-pre-battle.html";
HHEnvVariables["global"].pagesKnownList.push("LeaguePreBattle");

HHEnvVariables["global"].pagesIDTrollBattle = "troll-battle";
HHEnvVariables["global"].pagesURLTrollBattle = "/troll-battle.html";
HHEnvVariables["global"].pagesKnownList.push("TrollBattle");

HHEnvVariables["global"].pagesIDSeasonBattle = "season-battle";
HHEnvVariables["global"].pagesURLSeasonBattle = "/season-battle.html";
HHEnvVariables["global"].pagesKnownList.push("SeasonBattle");

HHEnvVariables["global"].pagesIDPantheonBattle = "pantheon-battle";
HHEnvVariables["global"].pagesURLPantheonBattle = "/pantheon-battle.html";
HHEnvVariables["global"].pagesKnownList.push("PantheonBattle");

HHEnvVariables["global"].pagesIDTrollPreBattle = "troll-pre-battle";
HHEnvVariables["global"].pagesURLTrollPreBattle = "/troll-pre-battle.html";
HHEnvVariables["global"].pagesKnownList.push("TrollPreBattle");

HHEnvVariables["global"].pagesIDEvent = "event";
HHEnvVariables["global"].pagesURLEvent = "/event.html";
HHEnvVariables["global"].pagesKnownList.push("Event");

HHEnvVariables["global"].pagesIDPoV = "path-of-valor";
HHEnvVariables["global"].pagesURLPoV = "/path-of-valor.html";
HHEnvVariables["global"].pagesKnownList.push("PoV");

HHEnvVariables["global"].pagesIDPoG = "path-of-glory";
HHEnvVariables["global"].pagesURLPoG = "/path-of-glory.html";
HHEnvVariables["global"].pagesKnownList.push("PoG");

HHEnvVariables["global"].pagesIDSeasonalEvent = "seasonal";
HHEnvVariables["global"].pagesURLSeasonalEvent = "/seasonal.html";
HHEnvVariables["global"].pagesKnownList.push("SeasonalEvent");

HHEnvVariables["global"].pagesIDPowerplacemain = "powerplacemain";
HHEnvVariables["global"].pagesKnownList.push("Powerplacemain");

HHEnvVariables["global"].pagesIDBattleTeams = "teams";
HHEnvVariables["global"].pagesURLBattleTeams = "/teams.html";
HHEnvVariables["global"].pagesKnownList.push("BattleTeams");

HHEnvVariables["global"].pagesIDEditTeam = "edit-team";
HHEnvVariables["global"].pagesURLEditTeam = "";
HHEnvVariables["global"].pagesKnownList.push("EditTeam");

HHEnvVariables["global"].pagesIDPoA = "path_of_attraction";
HHEnvVariables["global"].pagesKnownList.push("PoA");

HHEnvVariables["global"].pagesIDBossBang = "boss-bang-battle";
HHEnvVariables["global"].pagesKnownList.push("BossBang");

HHEnvVariables["global"].isEnabledEvents = true;
HHEnvVariables["global"].isEnabledTrollBattle = true;
HHEnvVariables["global"].isEnabledPachinko = true;
HHEnvVariables["global"].isEnabledGreatPachinko = true;
HHEnvVariables["global"].isEnabledMythicPachinko = true;
HHEnvVariables["global"].isEnabledEquipmentPachinko = true;
HHEnvVariables["global"].isEnabledContest = true;
HHEnvVariables["global"].isEnabledPowerPlaces = true;
HHEnvVariables["global"].isEnabledMission = true;
HHEnvVariables["global"].isEnabledQuest = true;
HHEnvVariables["global"].isEnabledSideQuest = true;
HHEnvVariables["global"].isEnabledSeason = true;
HHEnvVariables["global"].isEnabledPantheon = true;
HHEnvVariables["global"].isEnabledLabyrinth = true;
HHEnvVariables["global"].isEnabledAllChamps = true;
HHEnvVariables["global"].isEnabledChamps = true;
HHEnvVariables["global"].isEnabledClubChamp = true;
HHEnvVariables["global"].isEnabledLeagues = true;
HHEnvVariables["global"].isEnabledDailyRewards = true;
HHEnvVariables["global"].isEnabledFreeBundles = true;
HHEnvVariables["global"].isEnabledShop = true;
HHEnvVariables["global"].isEnabledSalary = true;
HHEnvVariables["global"].isEnabledPoV = true;
HHEnvVariables["global"].isEnabledPoG = true;
HHEnvVariables["global"].isEnabledSeasonalEvent = true;
HHEnvVariables["global"].isEnabledBossBangEvent = true;
HHEnvVariables["global"].isEnabledDPEvent = true;
HHEnvVariables["global"].isEnabledSultryMysteriesEvent = true;
HHEnvVariables["global"].isEnabledDailyGoals = true;
HHEnvVariables["HH_test"].isEnabledDailyRewards = false;// to remove if daily rewards arrives in test
HHEnvVariables["HH_test"].isEnabledFreeBundles = false;// to remove if bundles arrives in test
["GH_prod","NGH_prod","EGH_prod"].forEach((element) => {
    HHEnvVariables[element].trollzList = ['Latest', 
                                          'Dark Lord',
                                          'Ninja Spy',
                                          'Gruntt',
                                          'Edward',
                                          'Donatien',
                                          'Silvanus',
                                          'Bremen',
                                          'Edernas',
                                          'Fredy Sih Roko Senseï',
                                          'Maro',
                                          'Jackson&#8217;s Crew',
                                          'Icarus Warlock',
                                          'Sol'];
    switch (getLanguageCode()) {
        case "fr":
            HHEnvVariables[element].trollzList[2] = 'Espion Ninja';
            HHEnvVariables[element].trollzList[11] = 'Éq. de Jackson';
            HHEnvVariables[element].trollzList[12] = 'Sorcier Icarus';
            break;
        case "de":
            HHEnvVariables[element].trollzList[1] = 'Dunkler Lor';
            HHEnvVariables[element].trollzList[2] = 'Ninjaspion';
            HHEnvVariables[element].trollzList[11] = 'Jacksons Crew';
            break;
        default:
            break;
    }
});
["CH_prod","NCH_prod"].forEach((element) => {
    HHEnvVariables[element].trollzList = ['Latest',
                                          'BodyHack',
                                          'Grey Golem',
                                          'The Nymph',
                                          'Athicus Ho’ole',
                                          'The Mimic',
                                          'Cockatrice',
                                          'Pomelo',
                                          'Alexa Sl\'Thor',
                                          'D\'KLONG'];
});
["CH_prod","NCH_prod"].forEach((element) => {
    HHEnvVariables[element].trollGirlsID = [
        [['830009523', '907801218', '943323021'], [0], [0]],
        [['271746999', '303805209', '701946373'], [0], [0]],
        [['743748788', '977228200', '943323021'], [0], [0]],
        [['140401381', '232860230', '514994766'], [0], [0]],
        [['623293037', '764791769', '801271903'], [0], [0]],
        [['921365371', '942523553', '973271744'], [0], [0]],
        [['364639341', '879781833', '895546748'], [0], [0]],
        [['148877065', '218927643', '340369336'], [0], [0]],
        [['258185125', '897951171', '971686222'], [0], [0]],
    ];
    HHEnvVariables[element].lastQuestId = -1; //  TODO update when new quest comes
    HHEnvVariables[element].boosterId_MB1 = 2619;
});
HHEnvVariables["SH_prod"].isEnabledSideQuest = false;// to remove when SideQuest arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPowerPlaces = false;// to remove when PoP arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledMythicPachinko = false;// to remove when Mythic Pachinko arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledEquipmentPachinko = false;// to remove when Equipment Pachinko arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledAllChamps = false;// to remove when Champs arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledChamps = false;// to remove when Champs arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledClubChamp = false;// to remove when Club Champs arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPantheon = false;// to remove when Pantheon arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledLabyrinth = false;// to remove when Pantheon arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPoV = false;// to remove when PoV arrives in hornyheroes
HHEnvVariables["SH_prod"].isEnabledPoG = false;// to remove when PoG arrives in hornyheroes
HHEnvVariables["SH_prod"].lastQuestId = -1; //  TODO update when new quest comes
HHEnvVariables["MRPG_prod"].isEnabledSideQuest = false;// to remove when SideQuest arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledMythicPachinko = false;// to remove when Mythic Pachinko arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledEquipmentPachinko = false;// to remove when Equipment Pachinko arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledClubChamp = false;// to remove when Club Champs arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledPantheon = false;// to remove when Pantheon arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledLabyrinth = false;// to remove when Pantheon arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledSeasonalEvent = false;// to remove when event arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledBossBangEvent = false;// to remove when event arrives in Manga RPG
HHEnvVariables["MRPG_prod"].isEnabledSultryMysteriesEvent = false;// to remove when event arrives in Manga RPG
HHEnvVariables["MRPG_prod"].lastQuestId = -1; //  TODO update when new quest comes
HHEnvVariables["MRPG_prod"].trollzList = ['Latest',
                                        'William Scarlett'];
["PH_prod","NPH_prod"].forEach((element) => {
    HHEnvVariables[element].trollzList = ['Latest',
                                          'Headmistress Asa Akira',
                                          'Sammy Jayne',
                                          'Ivy Winters',
                                          'Sophia  Jade',
                                          'Amia Miley',
                                          'Alyssa Reece',
                                          'Kelly Kline',
                                          'Jamie Brooks',
                                          'Jordan Kingsley',
                                          'EMPTY',
                                          'Sierra Sinn',
                                          'Jasmine Jae',
                                          'Bella Rose'];
    HHEnvVariables[element].trollIdMapping = { 10: 9, 14: 11, 16: 12, 18: 13 }; // under 10 id as usual
    HHEnvVariables[element].lastQuestId = 16100; //  TODO update when new quest comes
    HHEnvVariables[element].boosterId_MB1 = 2619;
});
["PH_prod","NPH_prod"].forEach((element) => {
    HHEnvVariables[element].trollGirlsID = [
        [['261345306', '795788039', '973280579'], [0], [0]],
        [['482529771', '658322339', '833308213'], [0], [0]],
        [['117837840', '160370794', '306287449', '828011942'], [0], [0]],
        [['564593641', '719705773', '934421949'], [0], [0]],
        [['270611414', '464811282', '781232070'], [0], [0]],
        [['219241809', '380385497', '879198752'], [0], [0]],
        [['165066536', '734325005', '805020628'], [0], [0]],
        [['191661045', '369105612', '665836932'], [0], [0]],
        [['169356639', '383702874', '943667167'], [0], [0]],
        [[0], [0], [0]],
        [['169741198', '459885596', '507702178'], [0], [0]],
        [['258984943', '837109131', '888135956'], [0], [0]],
        [['270920965', '600910475', '799448349'], [0], [0]],
    ];
});

["TPH_prod","NTPH_prod"].forEach((element) => {
    HHEnvVariables[element].trollzList = ['Latest',
                                          'Ariel Demure',
                                          'Emma Rose',
                                          'Natalie Stone',
                                          'Janie Blade',
                                          'Nikki Nort',
                                          'Mistress Venom'];
    HHEnvVariables[element].isEnabledSideQuest = false;// to remove when SideQuest arrives in transpornstar
    HHEnvVariables[element].isEnabledClubChamp = false;// to remove when Club Champs arrives in transpornstar
    HHEnvVariables[element].isEnabledPantheon = false;// to remove when Pantheon arrives in transpornstar
    HHEnvVariables[element].isEnabledLabyrinth = false;// to remove when Pantheon arrives in transpornstar
    HHEnvVariables[element].isEnabledPoG = false;// to remove when PoG arrives in transpornstar
    HHEnvVariables[element].lastQuestId = -1; //  TODO update when new quest comes
});
["TPH_prod","NTPH_prod"].forEach((element) => {
    HHEnvVariables[element].trollGirlsID = [
        [['171883542', '229180984', '771348244'], [0], [0]],
        [['484962893', '879574564', '910924260'], [0], [0]],
        [['334144727', '667194919', '911144911'], [0], [0]],
        [['473470854', '708191289', '945710078'], [0], [0]],
        [['104549634', '521022556', '526732951'], [0], [0]],
        [['317800067', '542090972', '920682672'], [0], [0]],
    ];
    HHEnvVariables[element].lastQuestId = -1; //  TODO update when new quest comes
});

["GPSH_prod","NGPSH_prod"].forEach((element) => {
    HHEnvVariables[element].trollzList = ['Latest', 
                                          'Tristan Hunter',
                                          'Troll 2'];

    HHEnvVariables[element].isEnabledSideQuest = false;// to remove when SideQuest arrives in gaypornstar
    HHEnvVariables[element].isEnabledPowerPlaces = false;// to remove when PoP arrives in gaypornstar
    HHEnvVariables[element].isEnabledMythicPachinko = false;// to remove when Champs arrives in gaypornstar
    HHEnvVariables[element].isEnabledClubChamp = false;// to remove when Club Champs arrives in gaypornstar
    HHEnvVariables[element].isEnabledPantheon = false;// to remove when Pantheon arrives in gaypornstar
    HHEnvVariables[element].isEnabledLabyrinth = false;// to remove when Pantheon arrives in gaypornstar
    HHEnvVariables[element].isEnabledPoG = false;// to remove when PoG arrives in gaypornstar
    HHEnvVariables[element].trollGirlsID = [
        [['780402171', '374763633', '485499759'], [0], [0]],
        [[0,0,0], [0], [0]], // TODO get girls id
    ];
    HHEnvVariables[element].lastQuestId = -1; //  TODO update when new quest comes
    HHEnvVariables[element].boosterId_MB1 = 2619;
});
// Object.values(girlsDataList).filter(girl => girl.source?.name == "troll_tier" && girl.source?.group?.id == "7")
