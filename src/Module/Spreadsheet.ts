import {
    ConfigHelper,
    getPage,
    getTextForUI
} from '../Helper/index';
import { onAjaxResponse } from '../Utils/index';

export class Spreadsheet {
    static LINK_CLASS = 'hhauto-spreadsheet-link';
    static BDSMPP_CLASS = 'script-blessing-spreadsheet-link';
    static POPUP_SELECTOR = '#blessings_popup .blessings_wrapper';

    static isEnabled() {
        return ConfigHelper.getHHScriptVars("isEnabledSpreadsheets", false);
    }

    static run() {
        if (!Spreadsheet.isEnabled() || $('.' + Spreadsheet.BDSMPP_CLASS).length > 0 || $('.' + Spreadsheet.LINK_CLASS).length > 0) return;
        const page = getPage();
        if (page === ConfigHelper.getHHScriptVars("pagesIDHome")) {

            onAjaxResponse(/action=get_girls_blessings/i, (response, opt, xhr, evt) => {
                setTimeout(async function () {
                    const href = ConfigHelper.getHHScriptVars("spreadsheet");
                    if (!href) return;

                    const $sheet_link = $(`<a class="${Spreadsheet.LINK_CLASS}" target="_blank" href="${href}"><span class="nav_grid_icn"></span><span>${getTextForUI("spreadsheet", "elementText")}</span></a>`)

                    $(Spreadsheet.POPUP_SELECTOR).append($sheet_link)
                }, 200);
            })



            GM_addStyle('.' + Spreadsheet.LINK_CLASS + ' {position: absolute; top: 5px; right: 60px;}');     
            GM_addStyle('.' + Spreadsheet.LINK_CLASS + ' .nav_grid_icn {display: inline-block;}');     
        }
    }
}