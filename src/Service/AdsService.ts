import { ConfigHelper } from "../Helper/ConfigHelper";
import { getStoredValue } from "../Helper/StorageHelper";
import { randomInterval } from "../Helper/TimeHelper";
import { HHStoredVarPrefixKey } from "../config/HHStoredVars";

export class AdsService {
    static closeHomeAds() {
        /*
        if ($('#ad_home close:visible').length) {
            setTimeout(() => {
                $('#ad_home close').trigger('click')
            }, randomInterval(1500, 5000));
        }*/
    }

    static isCrossGameAds(): boolean {
        return $("#sliding-popups #crosspromo_show_ad").length > 0;
    }

    static isSexFriendsAds(): boolean {
        return $("#sliding-popups #crosspromo_show_localreward").length > 0;
    }

    static moveAds(page: string):void {
        if (getStoredValue(HHStoredVarPrefixKey + "Setting_showAdsBack") === "true") {
            if (page == ConfigHelper.getHHScriptVars("pagesIDHome")) {
                if (!AdsService.isCrossGameAds() && !AdsService.isSexFriendsAds()) {
                    GM_addStyle('#sliding-popups#sliding-popups { z-index : 1}');
                    GM_addStyle('#ad_home { z-index : 1}');
                    GM_addStyle('.ad-revive-container { z-index : 1}');
                }
            }
            else {
                GM_addStyle('#ad_champions_map { top: 35rem !important; }');
                GM_addStyle('#ad_god-path { position: absolute !important; top: 35rem !important; }');
                GM_addStyle('#ad_battle { top: 32rem !important; }');
                GM_addStyle('#ad_activities { position: absolute !important; top: 32rem !important; }');
                GM_addStyle('#ad_quest { top: 25rem !important; }');
                GM_addStyle('#ad_labyrinth { top: 30rem !important; }');
                GM_addStyle('#ad_shop { top: 35rem !important; }');
            }
        }
    }
}