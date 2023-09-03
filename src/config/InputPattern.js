import {nThousand} from '../Helper';


export const thousandsSeparator = nThousand(11111).replace(/1+/g, '');

export const HHAuto_inputPattern = {
    nWith1000sSeparator:"[0-9"+thousandsSeparator+"]+",

    //kobanBank:"[0-9]+",
    buyCombTimer:"[0-9]+",
    buyMythicCombTimer:"[0-9]+",
    autoBuyBoostersFilter:"M?B[1-4](;M?B[1-4])*",
    //calculatePowerLimits:"(\-?[0-9]+;\-?[0-9]+)|default",
    mousePauseTimeout:"[0-9]+",
    collectAllTimer:"[1-9][0-9]|[1-9]",
    autoSalaryTimer:"[0-9]+",
    autoTrollThreshold:"[1]?[0-9]",
    eventTrollOrder:"([1-2][0-9]|[1-9])(;([1-2][0-9]|[1-9]))*",
    autoSeasonThreshold:"[0-9]",
    autoPantheonThreshold:"[0-9]",
    bossBangMinTeam:"[1-5]",
    autoQuestThreshold:"[1-9]?[0-9]",
    autoLeaguesThreshold:"1[0-4]|[0-9]",
    autoLeaguesSecurityThreshold:"[0-9]+",
    autoPowerPlacesIndexFilter:"[1-9][0-9]{0,1}(;[1-9][0-9]{0,1})*",
    autoChampsFilter:"[1-6](;[1-6])*",
    autoChampsTeamLoop:"[1-9][0-9]|[1-9]",
    //autoStats:"[0-9]+",
    //autoExp:"[0-9]+",
    //maxExp:"[0-9]+",
    //autoAff:"[0-9]+",
    //maxAff:"[0-9]+",
    menuSellNumber:"[0-9]+",
    autoClubChampMax:"[0-9]+",
    menuExpLevel:"[1-4]?[0-9]?[0-9]",
    minShardsX:"(100|[1-9][0-9]|[0-9])"
}