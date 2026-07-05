// MenuColumnRight.ts
//
// DOM construction (layout): the right column of the #sMenu panel — champions
// and club champion, pantheon, shop/auto-buy and the events box. Pure string
// production from MenuWidgets rows.
//
// Split out of HHMenuHelper/MenuTemplate as part of WART-002 (behavior-neutral).

import { HHAuto_inputPattern } from "../../config/InputPattern";
import { MenuPorts } from "./MenuPorts";
import { hhMenuInput, hhMenuInputWithImg, hhMenuSwitch, hhMenuSwitchWithImg } from "./MenuWidgets";

export function buildRightColumn(): string {
    const { getTextForUI, getHHScriptVars } = MenuPorts;
        return `<div class="optionsColumn" style="width: 340px;">`
            +`<div id="isEnabledAllChamps" class="optionsBoxWithTitle">`
                +`<div class="optionsBoxTitle">`
                    +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/design/menu/ic_champions.svg" />`
                    +`<span class="optionsBoxTitle">${getTextForUI("autoChampsTitle","elementText")}</span>`
                +`</div>`
                +`<div class="optionsBox">`
                    +`<div id="isEnabledChamps" class="internalOptionsRow">`
                        + hhMenuSwitch('autoChamps')
                        + hhMenuSwitch('autoChampsForceStart')
                        + hhMenuSwitchWithImg('autoChampsUseEne', 'pictures/design/ic_energy_quest.png')
                        + hhMenuInput('autoChampsFilter', HHAuto_inputPattern.autoChampsFilter, 'text-align:center; width:55px')
                        + hhMenuSwitch('autoChampsForceStartEventGirl')
                    +`</div>`
                    +`<div id="isEnabledClubChamp" class="internalOptionsRow separator">`
                        + hhMenuSwitch('autoClubChamp')
                        + hhMenuSwitch('autoClubForceStart')
                        + hhMenuInputWithImg('autoClubChampMax', HHAuto_inputPattern.autoClubChampMax, 'text-align:center; width:45px', 'pictures/design/champion_ticket.png', 'numeric')
                        + hhMenuSwitch('showClubButtonInPoa')
                        + hhMenuSwitch('autoChampAlignTimer')
                    +`</div>`
                    +`<div class="internalOptionsRow separator">`
                        + hhMenuInput('autoChampsTeamLoop', HHAuto_inputPattern.autoChampsTeamLoop, 'text-align:center; width:25px', '', 'numeric')
                        + hhMenuInput('autoChampsGirlThreshold', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:center; width:45px')
                        + hhMenuSwitch('autoChampsTeamKeepSecondLine')
                        + hhMenuSwitch('autoBuildChampsTeam')
                    +`</div>`
                +`</div>`
            +`</div>`
            +`<div id="isEnabledPantheon" class="">` // optionsBoxWithTitle
                // +`<div class="optionsBoxTitle">`
                //     +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/design/menu/ic_champions.svg" />`
                //     +`<span class="optionsBoxTitle">${getTextForUI("autoPantheonTitle","elementText")}</span>`
                // +`</div>`
                +`<div class="optionsBox">`
                    +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                        + hhMenuSwitch('autoPantheon')
                        + hhMenuInputWithImg('autoPantheonThreshold', HHAuto_inputPattern.autoPantheonThreshold, 'text-align:center; width:25px', 'pictures/design/ic_worship.svg' , 'numeric')
                        + hhMenuInputWithImg('autoPantheonRunThreshold', HHAuto_inputPattern.autoPantheonRunThreshold, 'text-align:center; width:25px', 'pictures/design/ic_worship.svg' , 'numeric')
                        + hhMenuSwitch('autoPantheonBoostedOnly')
                    +`</div>`
                +`</div>`
            +`</div>`
            +`<div id="isEnabledShop" class="optionsBoxWithTitle">`
                +`<div class="optionsBoxTitle">`
                    +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/design/menu/shop.svg" />`
                    +`<span class="optionsBoxTitle">${getTextForUI("autoBuy","elementText")}</span>`
                +`</div>`
                +`<div class="optionsBox">`
                    +`<div class="internalOptionsRow">`
                        + hhMenuSwitchWithImg('autoStatsSwitch', 'design/ic_plus.svg')
                        + hhMenuInput('autoStats', HHAuto_inputPattern.nWith1000sSeparator, '', 'maxMoneyInputField')
                    +`</div>`
                    +`<div class="internalOptionsRow">`
                        + hhMenuSwitchWithImg('autoExpW', 'design/ic_books_gray.svg')
                        + hhMenuInput('maxExp', HHAuto_inputPattern.nWith1000sSeparator, '', 'maxMoneyInputField')
                        + hhMenuInput('autoExp', HHAuto_inputPattern.nWith1000sSeparator, '', 'maxMoneyInputField')
                    +`</div>`
                    +`<div class="internalOptionsRow">`
                        + hhMenuSwitchWithImg('autoAffW', 'design/ic_gifts_gray.svg')
                        + hhMenuInput('maxAff', HHAuto_inputPattern.nWith1000sSeparator, '', 'maxMoneyInputField')
                        + hhMenuInput('autoAff', HHAuto_inputPattern.nWith1000sSeparator, '', 'maxMoneyInputField')
                    +`</div>`
                    +`<div class="internalOptionsRow">`
                        + hhMenuSwitchWithImg('autoBuyBoosters', 'design/ic_boosters_gray.svg', true)
                        + hhMenuInput('maxBooster', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:right; width:45px')
                        + hhMenuInput('autoBuyBoostersFilter', HHAuto_inputPattern.autoBuyBoostersFilter, 'text-align:center; width:70px')
                    +`</div>`
                    +`<div class="internalOptionsRow">`
                        + hhMenuSwitch('autoEquipBoosters')
                        + hhMenuInput('autoEquipBoostersSlots', HHAuto_inputPattern.autoEquipBoostersSlots, 'text-align:center; width:70px')
                    +`</div>`
                    +`<div class="internalOptionsRow" style="justify-content: flex-end">`
                        + hhMenuInput('autoEquipMythicBooster', HHAuto_inputPattern.autoEquipMythicBooster, 'text-align:center; width:70px')
                    +`</div>`
                    +`<div class="internalOptionsRow">`
                        + hhMenuSwitchWithImg('showMarketTools', 'design/menu/panel.svg')
                        + hhMenuSwitch('updateMarket')
                    +`</div>`
                +`</div>`
            +`</div>`
            +`<div class="optionsRow" style="display:block">`
                +`<div id="isEnabledEvents" class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<span class="optionsBoxTitle">${getTextForUI("eventTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="optionsBox" style="border-style: dotted;">`
                        +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                            +`<div class="optionsBox">`
                                +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                                    + hhMenuSwitch('hideOwnedGirls', '', false, true)
                                +`</div>`
                            +`</div>`
                            +`<div id="isEnabledDPEvent" class="optionsBoxWithTitle">`
                                +`<div class="optionsBoxTitle">`
                                    +`<span class="optionsBoxTitle">${getTextForUI("doublePenetrationEventTitle","elementText")}</span>`
                                +`</div>`
                                +`<div class="optionsBox">`
                                    +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                                        + hhMenuSwitch('autodpEventCollect')
                                        + hhMenuSwitch('autodpEventCollectAll')
                                    +`</div>`
                                +`</div>`
                            + `</div>`
                            + `<div id="isEnabledLivelySceneEvent" class="optionsBoxWithTitle">`
                                + `<div class="optionsBoxTitle">`
                                    + `<span class="optionsBoxTitle">${getTextForUI("livelySceneEventTitle", "elementText")}</span>`
                                + `</div>`
                                + `<div class="optionsBox">`
                                    + `<div class="internalOptionsRow" style="justify-content: space-evenly">`
                                        + hhMenuSwitch('autoLivelySceneEventCollect')
                                        + hhMenuSwitch('autoLivelySceneEventCollectAll')
                                    + `</div>`
                                + `</div>`
                            + `</div>`
                        +`</div>`
                        +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                            +`<div id="isEnabledSultryMysteriesEvent" class="optionsBoxWithTitle">`
                                +`<div class="optionsBoxTitle">`
                                    +`<span class="optionsBoxTitle">${getTextForUI("sultryMysteriesEventTitle","elementText")}</span>`
                                +`</div>`
                                +`<div class="optionsBox">`
                                    +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                                        + hhMenuSwitch('sultryMysteriesEventRefreshShop')
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                            +`<div id="isEnabledBossBangEvent" class="optionsBoxWithTitle">`
                                +`<div class="optionsBoxTitle">`
                                    +`<span class="optionsBoxTitle">${getTextForUI("bossBangEventTitle","elementText")}</span>`
                                +`</div>`
                                +`<div class="optionsBox">`
                                    +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                                        + hhMenuSwitch('bossBangEvent')
                                        + hhMenuInput('bossBangMinTeam', HHAuto_inputPattern.bossBangMinTeam, 'text-align:center; width:25px', '', 'numeric')
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                            +`<div id="isEnabledPoa" class="optionsBoxWithTitle">`
                                +`<div class="optionsBoxTitle">`
                                    +`<span class="optionsBoxTitle">${getTextForUI("poaTitle","elementText")}</span>`
                                +`</div>`
                                +`<div class="optionsBox">`
                                    +`<div class="internalOptionsRow" style="justify-content: space-evenly">`
                                        + hhMenuSwitch('autoPoACollect')
                                        + hhMenuSwitch('autoPoACollectAll')
                                    +`</div>`
                                +`</div>`
                            +`</div>`
                        +`</div>`
                    +`</div>`
                +`</div>`
            +`</div>`
        +`</div>`;
    }
