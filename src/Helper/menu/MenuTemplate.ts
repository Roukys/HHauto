// MenuTemplate.ts
//
// DOM construction (layout): assembles the full settings panel (div#sMenu) from
// the three column builders. `debugEnabled` (read from storage) gates rows that
// were hidden by survey feedback. Pure string production; the returned markup is
// injected by StartService.
//
// Split out of HHMenuHelper as part of WART-002 (behavior-neutral). Reads its
// storage/translation helpers from MenuPorts so this file stays a graph leaf
// (see MenuPorts.ts).

import { TK } from "../../config/StorageKeys";
import { MenuPorts } from "./MenuPorts";
import { buildLeftColumn } from "./MenuColumnLeft";
import { buildMiddleColumn } from "./MenuColumnMiddle";
import { buildRightColumn } from "./MenuColumnRight";

export function getMenu() {
    const { getTextForUI, getStoredValue, storedVarPrefix } = MenuPorts;
    const debugEnabled = getStoredValue(storedVarPrefix+TK.Debug)==='true';

    // Add UI buttons.
    return `<div id="sMenu" class="HHAutoScriptMenu" style="display: none;">`
        +`<div style="position: absolute;left: 380px;color: #F00">${getTextForUI("noOtherScripts","elementText")}</div>`
        +`<div class="optionsRow">`
            + buildLeftColumn()
            + buildMiddleColumn(debugEnabled)
            + buildRightColumn()
        +`</div>`
    +`</div>`
}
