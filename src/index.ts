// index.ts - HHAuto entry point
//
// This is the Tampermonkey userscript entry point. It augments the
// global Window interface with game-specific properties that the script
// reads from the page context (via unsafeWindow), then kicks off
// initialization in two ways:
//
//   1. An IIFE that calls hardened_start() immediately on script load
//   2. A setTimeout fallback that retries after 5 seconds in case the
//      game's JS hasn't finished loading yet
//
// hardened_start() verifies jQuery is available, checks for "Forbidden"
// error pages, and delegates to start() which sets up the full menu,
// timers, and auto-loop.

import { hardened_start } from "./Service/StartService";
import { autoLoop, setBlockTick } from "./Service/AutoLoop";
import { getBlockScheduler, buildRegistryAndOrder } from "./Service/BlockPipeline";
import { setPipelineRegistryProvider } from "./Service/PipelineOrderService";
import { setPachinkoAutoLoopKick } from "./Module/Pachinko";
import { KKLoveRaid } from "./model/KK/KKLoveRaid";
import { KKPentaDrillOpponents } from "./model/KK/KKPentaDrillOpponents";
import { KKHero } from "./model/KK/KKHero";
import { KKDailyGoal } from "./model/KK/kkDailyGoal";
import type { KKTeamGirl } from "./model/KK/KKTeamGirl";
import type { KKHaremGirl } from "./model/KK/KKHaremGirl";
import type { HHEventData } from "./model/HHEvent";

declare global {
    var love_raids: KKLoveRaid[] | undefined;
    interface Window {
        // Game globals injected by the page, read via unsafeWindow. These
        // declarations only inform the TS compiler; the shapes are the
        // minimal subset the script actually reads (WART-001). Globals the
        // script only passes through or truth-tests stay `unknown` -- widen
        // to a real interface when a new property access appears.
        championData: unknown;
        contests_timer?: {
            next_contest: number;
            duration: number;
            remaining_time: number;
            [key: string]: unknown;
        };
        Collect: unknown;
        current_tier_number?: number;
        daily_goals_list?: KKDailyGoal[];
        event_data?: HHEventData;
        current_event?: HHEventData;
        girl?: KKHaremGirl;
        harem: unknown;
        has_contests_datas?: unknown;
        // Raw season-arena fighter payload; only forwarded into
        // BDSMHelper.getBdsmPlayersData.
        hero_data?: unknown;
        shared?: {
            Hero?: KKHero;
            general?: {
                hh_ajax?: (...args: unknown[]) => unknown;
                is_cheat_click?: (...args: unknown[]) => unknown;
                [key: string]: unknown;
            };
            animations?: {
                loadingAnimation?: {
                    start: () => void;
                    stop: () => void;
                };
                [key: string]: unknown;
            };
            [key: string]: unknown;
        }
        hh_nutaku?: unknown;
        hh_prices: Record<string, number>;
        HHTimers: unknown;
        is_cheat_click: unknown;
        league_tag: unknown;
        // Season-arena opponent array; consumers guard with Array.isArray.
        opponents: unknown;
        player_gems_amount?: Record<string, { amount: number } | undefined>;
        season_sec_untill_event_end: number | undefined;
        seasonal_event_active: boolean;
        seasonal_time_remaining: number;
        mega_event_data: unknown;
        penta_drill_data?: {
            cycle_data?: { seconds_until_event_end?: number; [key: string]: unknown };
            [key: string]: unknown;
        };
        opponents_list: KKPentaDrillOpponents[] | undefined;
        mega_event_active: boolean;
        mega_event_time_remaining: number;
        server_now_ts?: number;
        id_girl?: number | string;
        girl_squad?: { remaining_ego_percent: number; [key: string]: unknown }[];
        teams_data: Record<string, {
            girls_ids: number[];
            girls: KKTeamGirl[];
            [key: string]: unknown;
        }>;
        //pop
        pop_list?: unknown[];
        pop_index?: number;
        love_raids: KKLoveRaid[] | undefined;
    }
}

// Inject the autoLoop kick into Pachinko so it can restart the loop after a
// run without a static Module->Service import (lesson zirkulaerer-import-tdz-crash).
setPachinkoAutoLoopKick(autoLoop);

// Inject the block-scheduler tick into AutoLoop from the boot path (instead of
// a static AutoLoop->BlockPipeline import) to avoid an import cycle / TDZ
// (lesson zirkulaerer-import-tdz-crash).
setBlockTick((ctx) => getBlockScheduler().tick(ctx));
// Wire the Block-Order popup's registry provider (avoids a static
// PipelineOrderService->BlockPipeline import cycle).
setPipelineRegistryProvider(buildRegistryAndOrder);

hardened_start();