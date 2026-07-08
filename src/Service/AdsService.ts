// AdsService.ts
//
// Manages in-game advertisements that can interfere with automation.
// When the "show ads in background" setting is enabled, this service
// pushes ad containers behind the game UI via z-index overrides so
// they don't block click targets. On non-home pages, ads are
// repositioned further down the page to avoid overlap.
//
// Also detects cross-game promo popups and sex-friends ads that use
// a different DOM structure than regular ads.
//
// Reward-ad automation (issue #1746): the Home page shows one or more
// cross-promo reward ads, each a `<button>` whose onclick calls
// `shared.hh_crosspromo.redirectToCrosspromo(id, url, 1, 1)` and whose text
// is "Try it now". runAdCycle() (master switch autoAdsClick, off by default)
// handles the ads one per tick: it clicks a button, closes the ad tab it opens
// and then confirms the reward with the game's OK button
// (`button[confirm_blue_button]`), before moving on to the next ad shortly
// after. The tab is closed via the handle returned by a temporarily wrapped
// `unsafeWindow.open` -- a window a script opened may be closed again by its
// opener, cross-origin notwithstanding. An ad already handled this page session
// is never clicked again (its button can linger until the page reloads). Every
// failure path (popup blocker, missing confirm button, no ad present) logs and
// arms a cooldown timer instead of retrying in a tight loop.
//
// Used by: StartService (on page load), Pipeline.config (handleKobanAds)

import { ConfigHelper } from "../Helper/ConfigHelper";
import { getStoredValue } from "../Helper/StorageHelper";
import { randomInterval } from "../Helper/TimeHelper";
import { setTimer } from "../Helper/TimerHelper";
import { logHHAuto } from "../Utils/LogUtils";
import { HHStoredVarPrefixKey } from "../config/HHStoredVars";
import { SK } from "../config/StorageKeys";

/** Minimal shape of the global `open` used by the capture wrapper (testable). */
export interface WindowOpener {
    open: (...args: unknown[]) => Window | null;
}

// Cooldown windows (seconds). Never a tight retry loop (issue #1746 acceptance).
// DONE: nothing left to do (all ads handled / none present) -- rest a while.
// NEXT: more ads to handle, or an OK button expected shortly -- come back soon.
// BLOCKED: a popup blocker stopped the ad tab -- back off, retrying won't help.
const AD_COOLDOWN_DONE: [number, number] = [15 * 60, 20 * 60];
const AD_COOLDOWN_NEXT: [number, number] = [60, 3 * 60];
const AD_COOLDOWN_BLOCKED: [number, number] = [20 * 60, 30 * 60];

// The reward-ad "Try it now" button is identified by its onclick calling the
// game's cross-promo redirect. Matching the handler (not a wrapper class or the
// localized button text) keeps the selector stable across layout/locale changes
// and never matches the OK confirm button (which has no such onclick).
const AD_BUTTON_SELECTOR = 'button[onclick*="redirectToCrosspromo"]';
// The reward is confirmed back in the game tab with the OK button, marked by
// the `confirm_blue_button` attribute (locale-independent, unlike its text).
const AD_CONFIRM_SELECTOR = 'button[confirm_blue_button]';

/** Stable key for one ad button (its onclick carries the cross-promo id + url). */
function adKey(btn: HTMLElement): string {
    return btn.getAttribute("onclick") || btn.outerHTML;
}

/**
 * Temporarily wrap `win.open`, run `clickFn` and return the captured window
 * handle. The game's cross-promo redirect does NOT open the ad tab
 * synchronously inside the click (it fires a tracking request first), so the
 * wrapper stays installed for up to `timeoutMs` and resolves as soon as the
 * first `open` call happens. The original `open` is ALWAYS restored
 * (try/finally), even if `clickFn` throws or the timeout expires, so no other
 * window.open user is affected. Pure/host-agnostic so it can be unit-tested
 * with a mock opener.
 */
export async function captureOpenedWindow(win: WindowOpener, clickFn: () => void, timeoutMs = 8000, pollMs = 200): Promise<Window | null> {
    let handle: Window | null = null;
    const original = win.open;
    win.open = function (this: unknown, ...args: unknown[]): Window | null {
        const w = original.apply(win, args) as Window | null;
        if (!handle) handle = w;
        return w;
    } as WindowOpener["open"];
    try {
        clickFn();
        const deadline = Date.now() + timeoutMs;
        while (!handle && Date.now() < deadline) {
            await adsDelay(pollMs);
        }
    } finally {
        win.open = original;
    }
    return handle;
}

/**
 * Find every reward-ad "Try it now" button currently on the page. Exported for
 * testing.
 */
export function findAdButtons(): HTMLElement[] {
    return Array.from(document.querySelectorAll<HTMLElement>(AD_BUTTON_SELECTOR));
}

/**
 * True unless the element (or an ancestor) is explicitly hidden. Deliberately
 * tolerant -- only inline/computed `display:none` / `visibility:hidden` count
 * as hidden -- so it works both in the browser and in jsdom (which has no
 * layout, so offset-based visibility checks always report hidden there).
 * Exported for testing.
 */
export function isElementDisplayed(el: HTMLElement): boolean {
    let node: HTMLElement | null = el;
    while (node) {
        const style = window.getComputedStyle(node);
        if (style.display === "none" || style.visibility === "hidden") return false;
        node = node.parentElement;
    }
    return true;
}

/**
 * Find the game's VISIBLE reward-confirm ("OK") button, or null. The game can
 * keep hidden confirm-popup templates in the DOM, so the first selector match
 * is not necessarily the popup the user sees. Exported for testing.
 */
export function findConfirmButton(): HTMLElement | null {
    const candidates = Array.from(document.querySelectorAll<HTMLElement>(AD_CONFIRM_SELECTOR));
    return candidates.find(isElementDisplayed) ?? null;
}

function adsDelay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export class AdsService {
    // Ads clicked during this page session, keyed by adKey(). Prevents
    // re-clicking an ad whose button lingers after it has been watched (the
    // set is cleared naturally when the page reloads and the script re-inits).
    static handledAdKeys: Set<string> = new Set<string>();

    static closeHomeAds() {
        if ($('#ad_home close:visible').length) {
            setTimeout(() => {
                $('#ad_home close').trigger('click')
            }, randomInterval(3000, 5000));
        }
    }

    static isCrossGameAds(): boolean {
        return $("#sliding-popups #crosspromo_show_ad").length > 0;
    }

    static isSexFriendsAds(): boolean {
        return $("#sliding-popups #crosspromo_show_localreward").length > 0;
    }

    static moveAds(page: string):void {
        if (getStoredValue(HHStoredVarPrefixKey + SK.showAdsBack) === "true") {
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
                GM_addStyle('#ad_labyrinth-pre-battle { top: 30rem !important; }');
                GM_addStyle('#ad_shop { top: 35rem !important; }');
                GM_addStyle('#ad_season { top: 30rem !important; }');
                GM_addStyle('#ad_love_raids {margin-top: 0 !important; }');
                GM_addStyle('#ad_harem {margin-top: 5rem !important; }');
            }
        }
    }

    /** True when the reward-ad automation master switch is enabled. */
    static isAdClickActivated(): boolean {
        return getStoredValue(HHStoredVarPrefixKey + SK.autoAdsClick) === "true";
    }

    /** Ad buttons not yet handled this page session. Exported via the class for testing. */
    static findUnhandledAdButtons(): HTMLElement[] {
        return findAdButtons().filter(b => !AdsService.handledAdKeys.has(adKey(b)));
    }

    /**
     * Poll for the visible reward-confirm ("OK") button up to `timeoutMs`.
     * Resolves with the button once it appears, or null on timeout (never
     * loops forever). The OK button can show up well after the ad tab closes
     * (the reward is only credited server-side once the watch counted), so
     * the wait is generous.
     */
    static async waitForConfirmButton(timeoutMs = 60000, pollMs = 500): Promise<HTMLElement | null> {
        const deadline = Date.now() + timeoutMs;
        for (;;) {
            const btn = findConfirmButton();
            if (btn) return btn;
            if (Date.now() >= deadline) return null;
            await adsDelay(pollMs);
        }
    }

    /**
     * One reward-ad step on the Home page (issue #1746). Handles a single ad per
     * call and comes back soon (NEXT cooldown) while more remain, so all ads are
     * drained over a few ticks rather than one every 15-20 min:
     *   1. If an OK confirm button is already visible (from a previous step),
     *      click it and come back soon (more ads may follow).
     *   2. Otherwise pick the first not-yet-handled "Try it now" button.
     *   3. Wrap unsafeWindow.open, click it and capture the ad-tab handle --
     *      the game opens the tab AFTER a tracking round-trip, so the wrapper
     *      stays armed for a few seconds instead of only during the click.
     *   4. With a handle: wait 3-5 s, close the tab. Without one: keep going,
     *      the reward may still be credited (the tab may have opened through a
     *      path the wrapper cannot see).
     *   5. Wait (up to 60 s) for the visible OK button and click it.
     *   6. Cooldowns: OK confirmed or tab handled -> NEXT while more remains,
     *      else DONE. Neither handle nor OK -> popup blocker, long back-off.
     *
     * Every exit path arms `nextAdsTime`, so the caller's precondition
     * (checkTimer) rate-limits re-entry -- there is no unbounded retry loop.
     * Returns true when an action was taken (drives the pipeline slot-hold).
     */
    static async runAdCycle(): Promise<boolean> {
        if (!AdsService.isAdClickActivated()) return false;

        // Confirm a reward left over from an earlier (possibly interrupted) step.
        const pending = findConfirmButton();
        if (pending) {
            logHHAuto("Ads: confirming pending reward (OK).");
            pending.click();
            setTimer("nextAdsTime", randomInterval(...AD_COOLDOWN_NEXT));
            return true;
        }

        const buttons = AdsService.findUnhandledAdButtons();
        if (buttons.length === 0) {
            logHHAuto("Ads: no new reward ad to click.");
            setTimer("nextAdsTime", randomInterval(...AD_COOLDOWN_DONE));
            return false;
        }

        const target = buttons[0];
        logHHAuto("Ads: clicking reward ad ('Try it now'). " + (buttons.length - 1) + " more waiting.");
        const handle = await captureOpenedWindow(unsafeWindow as unknown as WindowOpener, () => {
            target.click();
        });

        if (handle) {
            await adsDelay(randomInterval(3000, 5000));
            try {
                handle.close();
            } catch (err) {
                logHHAuto("Ads: could not close ad tab: " + String(err));
            }
        } else {
            // The tab may still have opened through a path the wrapper cannot
            // see (or a popup blocker stopped it) -- wait for the confirm
            // before deciding which of the two it was.
            logHHAuto("Ads: no ad-tab handle captured, waiting for the reward confirm anyway.");
        }

        const confirmBtn = await AdsService.waitForConfirmButton();

        if (!handle && !confirmBtn) {
            // Neither a tab we control nor a reward confirm: popup blocker.
            // Do NOT retry in a loop -- log, leave the ad unhandled and back
            // off for a long cooldown.
            logHHAuto("Ads: no ad tab and no reward confirm (popup blocker?). Backing off.");
            setTimer("nextAdsTime", randomInterval(...AD_COOLDOWN_BLOCKED));
            return false;
        }

        // Watched: never click this ad again this session, even if its button
        // lingers after the reward is claimed.
        AdsService.handledAdKeys.add(adKey(target));

        if (confirmBtn) {
            logHHAuto("Ads: reward available, confirming (OK).");
            confirmBtn.click();
        } else {
            logHHAuto("Ads: reward confirm (OK) not visible yet, will retry shortly.");
        }

        // Come back soon if more ads remain, or if the OK has not appeared yet
        // (the pending-confirm check at the top of the next step will catch it).
        const moreAds = AdsService.findUnhandledAdButtons().length > 0;
        const cooldown = (confirmBtn && !moreAds) ? AD_COOLDOWN_DONE : AD_COOLDOWN_NEXT;
        setTimer("nextAdsTime", randomInterval(...cooldown));
        return true;
    }
}
