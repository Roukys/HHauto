// MenuColumnMiddle.ts
//
// DOM construction (layout): the middle column of the #sMenu panel — missions,
// power places, daily goals, labyrinth, quests, season, leagues, troll battle,
// penta-drill and the seasonal event. `debugEnabled` gates survey-hidden rows.
// Pure string production from MenuWidgets rows.
//
// Split out of HHMenuHelper/MenuTemplate as part of WART-002 (behavior-neutral).

import { HHAuto_inputPattern } from "../../config/InputPattern";
import { MenuPorts } from "./MenuPorts";
import { hhMenuInput, hhMenuInputWithImg, hhMenuSelect, hhMenuSwitch } from "./MenuWidgets";

export function buildMiddleColumn(debugEnabled: boolean): string {
    const { getTextForUI, getHHScriptVars } = MenuPorts;
        return `<div class="optionsColumn" style="min-width: 520px;">`
            +`<div class="optionsRow">`
                +`<div class="optionsColumn">`
                    +`<div class="optionsBoxWithTitle">`
                        +`<div class="optionsBoxTitle">`
                            +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/design/menu/missions.svg" />`
                            +`<span class="optionsBoxTitle">${getTextForUI("autoActivitiesTitle","elementText")}</span>`
                        +`</div>`
                        +`<div class="optionsBox" style="border:none;padding:0">`
                            +`<div class="internalOptionsRow">`
                                +`<div id="isEnabledMission" class="internalOptionsRow optionsBox" style="padding:0;margin:0 3px 0 0;">`
                                    + hhMenuSwitch('autoMission')
                                    + hhMenuSwitch('autoMissionCollect')
                                    + hhMenuSwitch('autoMissionKFirst')
                                    + hhMenuSwitch('compactMissions', '', false, true)
                                    + hhMenuSwitch('invertMissions', '', false, true)
                                +`</div>`
                                +`<div id="isEnabledContest" class="internalOptionsRow optionsBox" style="padding:0;margin:0 0 0 3px;">`
                                    + hhMenuSwitch('autoContest')
                                    + hhMenuSwitch('compactEndedContests', '', false, true)
                                +`</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                    +`<div class="optionsBox" style="border:none;padding:0">`
                        +`<div class="internalOptionsRow">`
                            +`<div id="isEnabledPowerPlaces" class="optionsBoxWithTitle">`
                                +`<div class="optionsBoxTitle">`
                                    +`<span class="optionsBoxTitle">${getTextForUI("powerPlacesTitle","elementText")}</span>`
                                +`</div>`
                                +`<div class="optionsBox">`
                                    +`<div class="internalOptionsRow">`
                                        + hhMenuSwitch('autoPowerPlaces')
                                        + hhMenuInput('autoPowerPlacesIndexFilter', HHAuto_inputPattern.autoPowerPlacesIndexFilter, 'width: 100px;' )
                                        + hhMenuSwitch('autoPowerPlacesAll')
                                    +`</div>`
                                    +`<div class="internalOptionsRow">`
                                        + hhMenuSwitch('autoPowerPlacesPrecision')
                                        + hhMenuSwitch('autoPowerPlacesInverted')
                                        + hhMenuSwitch('autoPowerPlacesWaitMax')
                                        + hhMenuSwitch('compactPowerPlace', '', false, true)
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                            +`<div class="optionsBoxWithTitle">`
                                +`<div class="optionsBoxTitle">`
                                    + `<span class="optionsBoxTitle">${getTextForUI("dailyGoalsTitle","elementText")}</span>`
                                +`</div>`
                                +`<div id="isEnabledDailyGoals" class="rowOptionsBox">`
                                    +`<div class="internalOptionsRow">`
                                        + `<div style="${debugEnabled ? '' : 'display:none;'}">` + hhMenuSwitch('autoDailyGoals') + `</div>`
                                        + hhMenuSwitch('autoDailyGoalsCollect')
                                        + hhMenuSwitch('compactDailyGoals', '', false, true)
                                    + `</div>`
                                + `</div>`
                                + `<div class="internalOptionsRow">`
                                    + `<div class="rowOptionsBox">`
                                        + `<div id="isEnabledPachinko" class="internalOptionsRow">`
                                            + hhMenuSwitch('autoFreePachinko')
                                        + `</div>`
                                    + `</div>`
                                    + `<div class="rowOptionsBox">`
                                        +`<div id="isEnabledSalary" class="internalOptionsRow">`
                                            + hhMenuSwitch('autoSalary')
                                            + hhMenuInput('autoSalaryMinSalary', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:right; width:45px')
                                        + `</div>`
                                    +`</div>`
                                + `</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div class="optionsColumn">`
                    +`<div class="optionsBoxTitle">` // Empty box to align with left column
                    +`</div>`
                    +`<div id="isEnabledLabyrinth" class="optionsBox">`
                        + `<div class="internalOptionsRow" style="justify-content: space-evenly">`
                            + hhMenuSwitch('autoLabyrinth')
                            + hhMenuSelect('autoLabyDifficulty', 'width:60px;')
                        +`</div>`
                        + `<div class="internalOptionsRow" style="justify-content: space-evenly">`
                            + hhMenuSwitch('autoLabyHard')
                            + hhMenuSwitch('autoLabySweep')
                            + hhMenuSwitch('autoLabyCustomTeamBuilder')
                        +`</div>`
                    +`</div>`
                    +`<div class="optionsRow">`
                        +`<div id="isEnabledQuest" class="rowOptionsBox">`
                            +`<div class="internalOptionsRow">`
                                + hhMenuSwitch('autoQuest')
                                + hhMenuSwitch('autoSideQuest', 'isEnabledSideQuest')
                                + hhMenuInputWithImg('autoQuestThreshold', HHAuto_inputPattern.autoQuestThreshold, 'text-align:center; width:25px', 'pictures/design/ic_energy_quest.png', 'numeric')
                            +`</div>`
                        +`</div>`
                    +`</div>`
                +`</div>`
            +`</div>`
            +`<div class="optionsRow" style="justify-content: space-evenly">`
                +`<div id="isEnabledSeason" class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/design/menu/seasons.svg" />`
                        +`<span class="optionsBoxTitle">${getTextForUI("autoSeasonTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="optionsBox">`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitch('autoSeason')
                            + hhMenuSwitch('autoSeasonCollect')
                            + hhMenuSwitch('autoSeasonCollectAll')
                            + hhMenuSelect('seasonFocusSelector', 'width:85px;')
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            + `<div style="${debugEnabled ? '' : 'display:none;'}">` // #1533 hidden: 0% usage in survey (168 responses). Remove div wrapper to restore.
                            + hhMenuSwitch('autoSeasonPassReds', '', true)
                            + `</div>`
                            + hhMenuSwitch('autoSeasonBoostedOnly')
                            + hhMenuSwitch('autoSeasonSkipLowMojo')
                            +`<div class="labelAndButton" style="width: 70px;">`
                                +`<span class="HHMenuItemName">${getTextForUI("autoSeasonMaxTier","elementText")}</span>`
                                +`<div class="tooltipHH">`
                                    +`<span class="tooltipHHtext">${getTextForUI("autoSeasonMaxTier","tooltip")}</span>`
                                    +`<label class="switch">`
                                        +`<input id="autoSeasonMaxTier" type="checkbox">`
                                        +`<span class="slider round">`
                                        +`</span>`
                                    +`</label>`
                                    +`<input style="text-align:center; width:20px" id="autoSeasonMaxTierNb" required pattern="${HHAuto_inputPattern.autoSeasonMaxTierNb}" type="text">`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            + hhMenuInputWithImg('autoSeasonThreshold', HHAuto_inputPattern.autoSeasonThreshold, 'text-align:center; width:30px', 'pictures/design/ic_kiss.png', 'numeric' )
                            + hhMenuSwitch('seasonDisplayPowerCalc')
                            + hhMenuInputWithImg('autoSeasonRunThreshold', HHAuto_inputPattern.autoSeasonRunThreshold, 'text-align:center; width:25px', 'pictures/design/ic_kiss.png', 'numeric' )
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div id="isEnabledLeagues" class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/design/menu/leaderboard.svg" />`
                        +`<span class="optionsBoxTitle">${getTextForUI("autoLeaguesTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="optionsBox">`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitch('autoLeagues')
                            + hhMenuSelect('autoLeaguesSortMode', 'width:85px;')
                            + hhMenuSwitch('autoLeaguesCollect')
                            + hhMenuSwitch('autoLeaguesBoostedOnly')
                            + hhMenuSwitch('leagueListDisplayPowerCalc')
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSelect('autoLeaguesSelector')
                            + hhMenuSwitch('autoLeaguesAllowWinCurrent')
                            + hhMenuSwitch('autoLeaguesForceOneFight')
                        +`</div>`
                        +`<div class="internalOptionsRow">`
                            + hhMenuInputWithImg('autoLeaguesThreshold', HHAuto_inputPattern.autoLeaguesThreshold, 'text-align:center; width:25px', 'pictures/design/league_points.png', 'numeric' )
                            + hhMenuInputWithImg('autoLeaguesRunThreshold', HHAuto_inputPattern.autoLeaguesRunThreshold, 'text-align:center; width:25px', 'pictures/design/league_points.png', 'numeric' )
                            + hhMenuInput('autoLeaguesSecurityThreshold', HHAuto_inputPattern.autoLeaguesSecurityThreshold, 'text-align:center; width:25px', '', 'numeric' )
                        +`</div>`
                    +`</div>`
                +`</div>`
            +`</div>`
            +`<div id="isEnabledTrollBattle" class="optionsBoxWithTitle">`
                +`<div class="optionsBoxTitle">`
                    +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/pictures/design/menu/map.svg" />`
                    +`<span class="optionsBoxTitle">${getTextForUI("autoTrollTitle","elementText")}</span>`
                +`</div>`
                +`<div class="optionsBox">`
                    +`<div class="internalOptionsRow" style="justify-content: space-between">`
                        + hhMenuSwitch('autoTrollBattle')
                        + hhMenuSelect('autoTrollSelector')
                        + hhMenuInputWithImg('autoTrollThreshold', HHAuto_inputPattern.autoTrollThreshold, 'text-align:center; width:25px', 'pictures/design/ic_energy_fight.png', 'numeric' )
                        + hhMenuInputWithImg('autoTrollRunThreshold', HHAuto_inputPattern.autoTrollRunThreshold, 'text-align:center; width:25px', 'pictures/design/ic_energy_fight.png', 'numeric')
                        + `<div style="border-left:1px solid #ffa23e;height:36px;"> </div>`
                    +`</div>`
                    +`<div class="internalOptionsRow">`
                        + `<div style="${debugEnabled ? '' : 'display:none;'}">` // #1533 hidden: 0% usage in survey (168 responses). Remove div wrapper to restore.
                        + hhMenuSwitch('useX10Fights', '', true)
                        + hhMenuSwitch('useX10FightsAllowNormalEvent')
                        + hhMenuInput('minShardsX10', HHAuto_inputPattern.minShardsX, 'text-align:center; width:7em')
                        + hhMenuSwitch('useX50Fights', '', true)
                        + hhMenuSwitch('useX50FightsAllowNormalEvent')
                        + hhMenuInput('minShardsX50', HHAuto_inputPattern.minShardsX, 'text-align:center; width:7em')
                        + `</div>`
                        + hhMenuSwitch('plusGirlSkins')
                        + hhMenuInput('sandalwoodMinShardsThreshold', HHAuto_inputPattern.sandalwoodLimit, 'text-align:center; width:7em')
                    +`</div>`
                    +`<div class="internalOptionsRow separator">`
                        + hhMenuSwitch('plusEvent')
                        + hhMenuInput('eventTrollOrder', HHAuto_inputPattern.eventTrollOrder, 'width:150px')
                        + hhMenuSwitch('buyCombat', '', true)
                        + hhMenuInput('buyCombTimer', HHAuto_inputPattern.buyCombTimer, 'text-align:center; width:40px', '', 'numeric')
                        + hhMenuInput('autoBuyTrollNumber', HHAuto_inputPattern.autoBuyTrollNumber, 'width:40px')
                        + hhMenuSwitch('plusEventSandalWood')
                    +`</div>`
                    +`<div class="internalOptionsRow separator">`
                        + hhMenuSwitch('plusEventMythic')
                        + hhMenuSwitch('autoTrollMythicByPassParanoia')
                        + hhMenuSwitch('buyMythicCombat', '', true)
                        + hhMenuInput('autoBuyMythicTrollNumber', HHAuto_inputPattern.autoBuyTrollNumber, 'width:40px')
                        + hhMenuInput('buyMythicCombTimer', HHAuto_inputPattern.buyMythicCombTimer, 'text-align:center; width:40px', '', 'numeric')
                        + hhMenuSwitch('plusEventMythicSandalWood')
                    +`</div>`
                    +`<div class="internalOptionsRow separator">`
                        + hhMenuSwitch('plusLoveRaid')
                        + hhMenuSelect('loveRaidSelector')
                        + hhMenuSwitch('autoTrollLoveRaidByPassThreshold')
                        + hhMenuSelect('raidStarsSelector', 'width:75px;')
                        + hhMenuSwitch('buyLoveRaidCombat', '', true)
                        + hhMenuInput('autoBuyLoveRaidTrollNumber', HHAuto_inputPattern.autoBuyTrollNumber, 'width:40px')
                        + hhMenuSwitch('plusEventLoveRaidSandalWood')
                    +`</div>`
                +`</div>`
            +`</div>`
            +`<div class="optionsRow" style="justify-content: space-evenly">`
                +`<div id="isEnabledPentaDrill" class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<span class="optionsBoxTitle">${getTextForUI("autoPentaDrillTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="optionsBox">`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitch('autoPentaDrill')
                            + hhMenuSwitch('autoPentaDrillCollect')
                            + hhMenuSwitch('autoPentaDrillCollectAll')
                            + hhMenuSwitch('autoPentaDrillBoostedOnly')
                            + hhMenuInputWithImg('autoPentaDrillThreshold', HHAuto_inputPattern.autoPentaDrillThreshold, 'text-align:center; width:30px', 'images/penta_drill/penta_drill.png', 'numeric' )
                            + hhMenuInputWithImg('autoPentaDrillRunThreshold', HHAuto_inputPattern.autoPentaDrillRunThreshold, 'text-align:center; width:25px', 'images/penta_drill/penta_drill.png', 'numeric' )
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div id="isEnabledSeasonalEvent" class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<span class="optionsBoxTitle">${getTextForUI("seasonalEventTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="optionsBox">`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitch('autoSeasonalEventCollect')
                            + hhMenuSwitch('autoSeasonalEventCollectAll')
                            + hhMenuSwitch('autoSeasonalBuyFreeCard')
                        +`</div>`
                    +`</div>`
                +`</div>`
            +`</div>`
        +`</div>`;
}
