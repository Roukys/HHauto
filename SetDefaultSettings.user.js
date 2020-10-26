// ==UserScript==
// @name     HentaiHeroes autologin and parameters settings
// @match    http*://*.hentaiheroes.com/*
// @namespace    https://github.com/Roukys/HHauto
// @version      1
// @description  Auto login and force parameters
// @author       roukys
// @match        http*://*.hentaiheroes.com/*
// @license      MIT
// @downloadURL https://github.com/Roukys/HHauto/raw/main/SetDefaultSettings.user.js
// ==/UserScript==


var usr = "username";
var pword = "password";

setDefaults();

loginOnHH(usr, pword);


function loginOnHH (user, passwd) 
{
    if(document.getElementsByName('login').length > 0)
    {
        document.getElementsByName('login')[0].value = user;
        document.getElementsByName('password')[0].value = passwd;
        document.getElementsByClassName('steel2 b_m')[0].click();
    }
}

function setDefaults ()
{
  localStorage.settPerTab="false";

  Storage().master="false";

  Storage().showInfo="true";

  //need to be true for buy koban to work
  Storage().spendKobans0="false";
  //need to be true for buy koban to work
  Storage().spendKobans1="false";
  //need to be true for buy koban to work
  Storage().spendKobans2="false";
  //auto buy combat in event
  Storage().buyCombat="false";
  //min kobans to keep
  Storage().kobanBank="1000000";
  //remaining event hours
  Storage().buyCombTimer="16";

  Storage().autoSalary = "false";
  //check time for salary in secs
  Storage().autoSalaryTimer = "60";

  //auto Compét
  Storage().autoContest = "false";

  //auto mission
  Storage().autoMission = "false";
  //auto mission collect
  Storage().autoMissionC = "false";

  //auto PowerPlaces
  Storage().autoPowerPlaces = "false";
  Storage().autoPowerPlacesIndexFilter = "1;2;3";

  //auto quest
  Storage().autoQuest = "false";

  // auto troll
  Storage().autoTrollBattle = "false";
  //select troll to fight
  //"0" => "Latest"
  //"1" => "Dark Lord"
  //"2" => "Ninja Spy"
  //"3" => "Gruntt"
  //"4" => "Edwarda"
  //"5" => "Donatien"
  //"6" => "Silvanus"
  //"7" => "Bremen"
  //"8" => "Finalmecia"
  //"9" => "Roko Senseï"
  //"10" => "Karole"
  //"11" => "Jackson's Crew"
  //"12" => "Pandora witch"
  Storage().autoTrollSelectedIndex="0";
  //specific troll event order
  Storage().plusEvent="false";
  //troll order for event
  Storage().eventTrollOrder=";1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20";


  Storage().autoArenaBattle = "false";
  Storage().autoSeason = "false";

  Storage().autoFreePachinko = "false";

  Storage().paranoia="false";
  Storage().paranoiaSettings="120-300/Sleep:18000-19800|Active:300-420|Casual:1800-2100/5:Sleep|6:Casual|9:Active|11:Casual|16:Active|18:Casual|22:Active|24:Casual";

  //auto leagues
  Storage().autoLeagues = "false";

  //auto champion switch
  Storage().autoChamps="false";
  //buying ticket with 60 energy
  Storage().autoChampsUseEne="false";
  //auto cham filter
  Storage().autoChampsFilter="1;2;3;4;5;6";

  //auto stats min money
  Storage().autoStats = "999999999";

  //auto exp buying switch
  Storage().autoExpW = "false";
  //auto exp min money
  Storage().autoExp = "999999999";
  //auto exp max exp
  Storage().MaxExp = "0";

  //auto aff buying switch
  Storage().autoAffW = "false";
  //auto aff min money
  Storage().autoAff = "999999999";
  //auto aff max aff
  Storage().MaxAff = "0";

  //to define
  Storage().autoLGMW = "false";
  Storage().autoLGM = "999999999";

  //to define
  Storage().autoLGRW = "false";
  Storage().autoLGR = "999999999";

  //to define
  Storage().autoEGMW = "false";
  Storage().autoEGM = "999999999";
}
