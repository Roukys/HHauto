import { hardened_start } from "./Service/index";

declare global {
    interface Window {
        // Below just informs IDE and/or TS-compiler (it's set in `.js` file).
        championData: any;
        Collect: any;
        current_tier_number: any;
        event_data: any;
        girl: any;
        GirlSalaryManager: any;
        harem: any;
        has_contests_datas: any;
        hero_data: any;
        shared: any;
        Hero: any;
        hh_ajax: any;
        hh_nutaku: any;
        hh_prices: any;
        HHTimers: any;
        is_cheat_click: any;
        league_tag: any;
        loadingAnimation: any;
        opponents: any;
        player_gems_amount: any;
        season_sec_untill_event_end: any;
        seasonal_event_active: any;
        seasonal_time_remaining: any;
        server_now_ts: any;
        id_girl: any;
    }
}

setTimeout(hardened_start,5000);

$(function() {
    hardened_start();
});