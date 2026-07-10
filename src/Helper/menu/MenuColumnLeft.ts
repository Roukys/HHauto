// MenuColumnLeft.ts
//
// DOM construction (layout): the left column of the #sMenu panel — script
// header buttons, global options, kobans, display toggles, PoV/PoG and harem.
// Pure string production from MenuWidgets rows.
//
// Split out of HHMenuHelper/MenuTemplate as part of WART-002 (behavior-neutral).

import { HHAuto_inputPattern } from "../../config/InputPattern";
import { MenuPorts } from "./MenuPorts";
import { hhButton, hhMenuInput, hhMenuInputWithImg, hhMenuSwitch, hhMenuSwitchWithImg } from "./MenuWidgets";

export function buildLeftColumn(): string {
    const { getTextForUI, getHHScriptVars } = MenuPorts;
        return `<div class="optionsColumn" style="min-width: 185px;">`
            +`<div style="padding:3px; display:flex; flex-direction:column;">`
                +`<span>HH Automatic ++</span>`
                +`<span style="font-size:smaller;">Version ${GM.info.script.version}</span>`
                +`<div class="internalOptionsRow" style="padding:3px">`
                    + hhButton('gitHub', 'git')
                    + hhButton('ReportBugs', 'ReportBugs')
                    + hhButton('DebugMenu', 'DebugMenu')
                +`</div>`
                +`<div class="internalOptionsRow" style="padding:3px">`
                    + hhButton('saveConfig', 'saveConfig')
                    + hhButton('loadConfig', 'loadConfig')
                +`</div>`
                +`<div class="internalOptionsRow" style="padding:3px">`
                    + hhButton('saveDefaults', 'saveDefaults')
                    + hhButton('settingsSurvey', 'settingsSurvey')
                    + hhButton('blockOrder', 'blockOrder')
                +`</div>`
            +`</div>`
            +`<div class="optionsBoxWithTitle">`
                +`<div class="optionsBoxTitle">`
                    +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/design/menu/panel.svg" />`
                    +`<span class="optionsBoxTitle">${getTextForUI("globalTitle","elementText")}</span>`
                +`</div>`
                +`<div class="rowOptionsBox" style="display:grid;grid-auto-flow: column;">`
                    +`<div class="optionsColumn">`
                        + hhMenuSwitch('master') // Master switch
                        + hhMenuSwitch('paranoia')
                        +`<div id="isEnabledMousePause" class="labelAndButton">`
                            +`<span class="HHMenuItemName">${getTextForUI("mousePause","elementText")}</span>`
                            +`<div class="tooltipHH">`
                                +`<span class="tooltipHHtext">${getTextForUI("mousePause","tooltip")}</span>`
                                +`<label class="switch">`
                                    +`<input id="mousePause" type="checkbox">`
                                    +`<span class="slider round">`
                                    +`</span>`
                                +`</label>`
                                +`<input style="text-align:center; width:40px" id="mousePauseTimeout" required pattern="${HHAuto_inputPattern.mousePauseTimeout}" type="text">`
                            +`</div>`
                        +`</div>`
                        + hhMenuInput('collectAllTimer', HHAuto_inputPattern.collectAllTimer, 'text-align:center; width:25px')
                        + hhMenuSwitch('showTooltips')
                        + hhMenuInput('autoPentaDrillDelay', HHAuto_inputPattern.autoPentaDrillDelay, 'text-align:center; width:25px')
                    +`</div>`
                    +`<div class="optionsColumn">`
                        +`<div class="labelAndButton">`
                            +`<span class="HHMenuItemName">${getTextForUI("waitforContest","elementText")}</span>`
                            +`<div class="tooltipHH">`
                                +`<span class="tooltipHHtext">${getTextForUI("waitforContest","tooltip")}</span>`
                                +`<label class="switch">`
                                    +`<input id="waitforContest" type="checkbox">`
                                    +`<span class="slider round">`
                                    +`</span>`
                                +`</label>`
                                +`<input style="text-align:center; width:30px" id="safeSecondsForContest" required pattern="${HHAuto_inputPattern.safeSecondsForContest}" type="text">`
                            +`</div>`
                        +`</div>`
                        + hhMenuSwitch('settPerTab')
                        + hhMenuSwitch('pipelineDiagnose')
                        + hhMenuSwitch('paranoiaSpendsBefore')
                        + hhMenuSwitch('autoFreeBundlesCollect', 'isEnabledFreeBundles')
                        + hhMenuSwitch('collectEventChest')
                    +`</div>`
                +`</div>`
            +`</div>`
            +`<div class="optionsBoxWithTitle">`
                +`<div class="optionsBoxTitle">`
                    +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/pictures/design/ic_hard_currency.png" />`
                    +`<span class="optionsBoxTitle">Kobans</span>`
                +`</div>`
                +`<div class="rowOptionsBox">`
                    + hhMenuSwitchWithImg('spendKobans0', 'design/menu/affil_prog.svg', true)
                    + hhMenuInputWithImg('kobanBank', HHAuto_inputPattern.nWith1000sSeparator, 'text-align:right; width:50px', 'pictures/design/ic_hard_currency.png' )
                +`</div>`
            +`</div>`
            +`<div class="optionsBoxWithTitle">`
                +`<div class="optionsBoxTitle">`
                    +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/design/menu/sex_friends.svg" />`
                    +`<span class="optionsBoxTitle">${getTextForUI("displayTitle","elementText")}</span>`
                +`</div>`
                +`<div class="rowOptionsBox">`
                    +`<div class="optionsColumn">`
                        + hhMenuSwitch('showInfo')
                        + hhMenuSwitch('showInfoLeft', '', false, true)
                    +`</div>`
                    +`<div class="optionsColumn">`
                        + hhMenuSwitch('showCalculatePower')
                        + hhMenuSwitch('showAdsBack', '', false, true)
                        + hhMenuSwitch('autoAdsClick')
                    +`</div>`
                    +`<div class="optionsColumn">`
                        + hhMenuSwitch('showRewardsRecap')
                        + hhMenuSwitch('AllMaskRewards', '', false, true)
                    +`</div>`
                +`</div>`
            + `</div>`
            + `<div class="rowOptionsBox">`
                +`<div id="isEnabledPoV" class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<span class="optionsBoxTitle">${getTextForUI("povTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="optionsBox">`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitch('autoPoVCollect')
                            + hhMenuSwitch('autoPoVCollectAll')
                        +`</div>`
                    +`</div>`
                +`</div>`
                +`<div id="isEnabledPoG" class="optionsBoxWithTitle">`
                    +`<div class="optionsBoxTitle">`
                        +`<span class="optionsBoxTitle">${getTextForUI("pogTitle","elementText")}</span>`
                    +`</div>`
                    +`<div class="optionsBox">`
                        +`<div class="internalOptionsRow">`
                            + hhMenuSwitch('autoPoGCollect')
                            + hhMenuSwitch('autoPoGCollectAll')
                        +`</div>`
                    +`</div>`
                +`</div>`
            + `</div>`
            +`<div class="optionsBoxWithTitle">`
                +`<div class="optionsBoxTitle">`
                    +`<img class="iconImg" src="${getHHScriptVars("baseImgPath")}/pictures/design/harem.svg" />`
                    +`<span class="optionsBoxTitle">${getTextForUI("haremTitle","elementText")}</span>`
                +`</div>`
                +`<div class="rowOptionsBox">`
                    + hhMenuSwitch('showHaremAvatarMissingGirls', '', false, true)
                    + hhMenuSwitchWithImg('showHaremTools', 'design/menu/panel.svg')
                    + hhMenuSwitchWithImg('showHaremSkillsButtons', 'design/menu/panel.svg')
                +`</div>`
            + `</div>`
        +`</div>`;
}
