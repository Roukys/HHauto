import * as fs from "fs";
import * as path from "path";
import {
    AdsService,
    captureOpenedWindow,
    findAdButtons,
    findConfirmButton,
    isElementDisplayed,
    WindowOpener,
} from "../../src/Service/AdsService";
import { HHStoredVarPrefixKey } from "../../src/config/HHStoredVars";
import { SK } from "../../src/config/StorageKeys";
import { setStoredValue } from "../../src/Helper/StorageHelper";
import { clearTimer, checkTimer } from "../../src/Helper/TimerHelper";

function loadHtmlFixture(name: string): string {
    return fs.readFileSync(path.join(__dirname, "..", "fixtures", "ads", `${name}.html`), "utf-8");
}

describe("captureOpenedWindow (window.open wrapper)", () => {
    it("captures the handle the wrapped open returns and restores the original", async () => {
        const fakeWin = {} as Window;
        const originalOpen = jest.fn(() => fakeWin);
        const opener: WindowOpener = { open: originalOpen as unknown as WindowOpener["open"] };

        const handle = await captureOpenedWindow(opener, () => { opener.open("http://ad.example"); });

        expect(handle).toBe(fakeWin);
        expect(originalOpen).toHaveBeenCalledWith("http://ad.example");
        // Restored: the property is the exact original function again.
        expect(opener.open).toBe(originalOpen);
    });

    it("captures a handle from an open that happens AFTER the click returns", async () => {
        // The game's redirect fires a tracking request first and opens the ad
        // tab asynchronously; the wrapper must stay armed past the click.
        const fakeWin = {} as Window;
        const originalOpen = jest.fn(() => fakeWin);
        const opener: WindowOpener = { open: originalOpen as unknown as WindowOpener["open"] };

        const p = captureOpenedWindow(opener, () => {
            setTimeout(() => { opener.open("http://ad.example"); }, 500);
        }, 3000, 50);
        const handle = await p;

        expect(handle).toBe(fakeWin);
        expect(opener.open).toBe(originalOpen);
    });

    it("returns null when nothing opens within the timeout (popup blocker)", async () => {
        const opener: WindowOpener = { open: jest.fn(() => null) as unknown as WindowOpener["open"] };
        const handle = await captureOpenedWindow(opener, () => { /* no open call */ }, 200, 50);
        expect(handle).toBeNull();
    });

    it("restores the original open even when the click throws", async () => {
        const originalOpen = jest.fn(() => ({} as Window));
        const opener: WindowOpener = { open: originalOpen as unknown as WindowOpener["open"] };
        await expect(captureOpenedWindow(opener, () => { throw new Error("boom"); })).rejects.toThrow("boom");
        expect(opener.open).toBe(originalOpen);
    });
});

describe("isElementDisplayed / visible confirm detection", () => {
    afterEach(() => { document.body.innerHTML = ""; });

    it("skips a hidden confirm template and returns the visible one", () => {
        document.body.innerHTML =
            `<div style="display:none"><button confirm_blue_button="" id="hidden">OK</button></div>`
            + `<button confirm_blue_button="" id="shown">OK</button>`;
        expect(isElementDisplayed(document.getElementById("hidden")!)).toBe(false);
        expect(isElementDisplayed(document.getElementById("shown")!)).toBe(true);
        expect(findConfirmButton()?.id).toBe("shown");
    });

    it("returns null when only hidden confirm buttons exist", () => {
        document.body.innerHTML =
            `<div style="display:none"><button confirm_blue_button="">OK</button></div>`;
        expect(findConfirmButton()).toBeNull();
    });
});

describe("ad DOM scan (fixture home-ad-tiles)", () => {
    beforeEach(() => {
        document.body.innerHTML = loadHtmlFixture("home-ad-tiles");
    });
    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("finds every 'Try it now' cross-promo button", () => {
        const buttons = findAdButtons();
        // The fixture has three cross-promo ad buttons and one confirm button.
        expect(buttons.length).toBe(3);
        buttons.forEach(b => expect(b.getAttribute("onclick")).toContain("redirectToCrosspromo"));
    });

    it("does not treat the confirm (OK) button as an ad button", () => {
        const confirm = findConfirmButton();
        expect(confirm).not.toBeNull();
        expect(confirm!.hasAttribute("confirm_blue_button")).toBe(true);
        // The OK button has no redirectToCrosspromo onclick, so it is not an ad.
        expect(findAdButtons()).not.toContain(confirm);
    });

    it("returns null for the confirm button when none is present", () => {
        document.body.innerHTML = `<button onclick="shared.hh_crosspromo.redirectToCrosspromo(1,'x',1,1)">Try it now</button>`;
        expect(findConfirmButton()).toBeNull();
    });
});

describe("AdsService.runAdCycle", () => {
    let savedOpen: typeof window.open;

    // Simulates the game's cross-promo redirect helper referenced by the ad
    // buttons' inline onclick: it opens the ad tab via the (wrapped) window.open.
    function installCrossPromo() {
        (globalThis as unknown as { shared: unknown }).shared = {
            hh_crosspromo: {
                redirectToCrosspromo: (_id: number, url: string) =>
                    (unsafeWindow as unknown as { open: (u: string) => Window | null }).open(url),
            },
        };
    }
    function adButtonHtml(id = 52, extraId = "tryBtn"): string {
        return `<button id="${extraId}" class="blue_text_button small" `
            + `onclick="shared.hh_crosspromo.redirectToCrosspromo(${id}, 'http://ad.example', 1, 1)">Try it now</button>`;
    }

    beforeEach(() => {
        clearTimer("nextAdsTime");
        document.body.innerHTML = "";
        AdsService.handledAdKeys.clear();
        savedOpen = (unsafeWindow as unknown as { open: typeof window.open }).open;
        installCrossPromo();
        setStoredValue(HHStoredVarPrefixKey + SK.autoAdsClick, "false");
    });
    afterEach(() => {
        (unsafeWindow as unknown as { open: typeof window.open }).open = savedOpen;
        clearTimer("nextAdsTime");
        jest.useRealTimers();
    });

    it("does nothing and arms no timer when the master switch is off", async () => {
        document.body.innerHTML = adButtonHtml();
        const acted = await AdsService.runAdCycle();
        expect(acted).toBe(false);
        expect(checkTimer("nextAdsTime")).toBe(true); // no cooldown armed
    });

    it("arms an idle cooldown but does not act when no ad is present", async () => {
        setStoredValue(HHStoredVarPrefixKey + SK.autoAdsClick, "true");
        const acted = await AdsService.runAdCycle();
        expect(acted).toBe(false);
        expect(checkTimer("nextAdsTime")).toBe(false); // cooldown armed -> no tight loop
    });

    it("confirms a pending reward (OK) left over from a recent ad click", async () => {
        setStoredValue(HHStoredVarPrefixKey + SK.autoAdsClick, "true");
        document.body.innerHTML = `<button confirm_blue_button="">OK</button>`;
        // An ad was clicked moments ago -- the visible OK is our reward confirm.
        AdsService.handledAdKeys.set("some-ad", Date.now());
        const clickSpy = jest.fn();
        (document.querySelector("button[confirm_blue_button]") as HTMLElement).addEventListener("click", clickSpy);

        const acted = await AdsService.runAdCycle();
        expect(acted).toBe(true);
        expect(clickSpy).toHaveBeenCalled();
        expect(checkTimer("nextAdsTime")).toBe(false);
    });

    it("does NOT auto-confirm a stray OK dialog without a recent ad click", async () => {
        setStoredValue(HHStoredVarPrefixKey + SK.autoAdsClick, "true");
        // A generic confirm popup is open, but no ad was clicked recently --
        // this OK belongs to some other dialog and must not be pressed.
        document.body.innerHTML = `<button confirm_blue_button="">OK</button>`;
        const clickSpy = jest.fn();
        (document.querySelector("button[confirm_blue_button]") as HTMLElement).addEventListener("click", clickSpy);

        const acted = await AdsService.runAdCycle();
        expect(clickSpy).not.toHaveBeenCalled();
        expect(acted).toBe(false); // falls through to "no new reward ad"
    });

    it("backs off (no retry) when neither a tab handle nor a confirm appears (popup blocker)", async () => {
        jest.useFakeTimers();
        setStoredValue(HHStoredVarPrefixKey + SK.autoAdsClick, "true");
        document.body.innerHTML = adButtonHtml();
        // The redirect opens nothing -> no handle; no OK ever shows up either.
        (unsafeWindow as unknown as { open: jest.Mock }).open = jest.fn(() => null);
        const p = AdsService.runAdCycle();
        await jest.advanceTimersByTimeAsync(9000);  // 8s handle-capture window
        await jest.advanceTimersByTimeAsync(61000); // 60s confirm wait times out
        const acted = await p;
        expect(acted).toBe(false);
        expect(checkTimer("nextAdsTime")).toBe(false); // long cooldown armed
        expect(AdsService.handledAdKeys.size).toBe(0); // stays retryable later
    });

    it("still confirms the reward when the tab opened through a path the wrapper cannot see", async () => {
        jest.useFakeTimers();
        setStoredValue(HHStoredVarPrefixKey + SK.autoAdsClick, "true");
        document.body.innerHTML = adButtonHtml();
        // No handle captured, but the game credits the reward and shows OK.
        (unsafeWindow as unknown as { open: jest.Mock }).open = jest.fn(() => null);
        const confirmClick = jest.fn();
        document.body.addEventListener("click", (e) => {
            if ((e.target as HTMLElement).id === "okBtn") confirmClick();
        });
        setTimeout(() => {
            document.body.insertAdjacentHTML("beforeend", `<button id="okBtn" confirm_blue_button="">OK</button>`);
        }, 12000); // appears after the handle window, during the confirm wait

        const p = AdsService.runAdCycle();
        await jest.advanceTimersByTimeAsync(9000);  // handle window expires
        await jest.advanceTimersByTimeAsync(5000);  // OK appears + poll tick
        const acted = await p;

        expect(acted).toBe(true);
        expect(confirmClick).toHaveBeenCalled();
        expect(AdsService.handledAdKeys.size).toBe(1); // watched, not re-clicked
    });

    it("clicks an ad, closes the tab, then confirms the reward (OK)", async () => {
        jest.useFakeTimers();
        setStoredValue(HHStoredVarPrefixKey + SK.autoAdsClick, "true");
        document.body.innerHTML = adButtonHtml();

        const closeSpy = jest.fn(() => {
            // The game reveals the OK confirm button after the ad tab closes.
            document.body.insertAdjacentHTML("beforeend", `<button id="okBtn" confirm_blue_button="">OK</button>`);
        });
        const fakeWin = { close: closeSpy } as unknown as Window;
        (unsafeWindow as unknown as { open: jest.Mock }).open = jest.fn(() => fakeWin);
        const confirmClick = jest.fn();
        document.body.addEventListener("click", (e) => {
            if ((e.target as HTMLElement).id === "okBtn") confirmClick();
        });

        const p = AdsService.runAdCycle();
        await jest.advanceTimersByTimeAsync(6000); // past the 3-5s close delay
        await jest.advanceTimersByTimeAsync(1000); // past a confirm poll tick
        const acted = await p;

        expect(acted).toBe(true);
        expect(closeSpy).toHaveBeenCalled();
        expect(confirmClick).toHaveBeenCalled();
        expect(checkTimer("nextAdsTime")).toBe(false); // success cooldown armed
    });

    it("skips ads clicked within the re-click cooldown", () => {
        document.body.innerHTML = adButtonHtml(52, "a") + adButtonHtml(99, "b");
        expect(AdsService.findUnhandledAdButtons().length).toBe(2);
        AdsService.handledAdKeys.set(document.getElementById("a")!.getAttribute("onclick")!, Date.now());
        expect(AdsService.findUnhandledAdButtons().map(x => x.id)).toEqual(["b"]);
    });

    it("clicks an ad again once its re-click cooldown expired (repeatable reward ads)", () => {
        document.body.innerHTML = adButtonHtml(52, "a");
        // Clicked more than HANDLED_TTL_MS ago -- the game's own cooldown is
        // over and the lingering button is a fresh, clickable ad again.
        AdsService.handledAdKeys.set(
            document.getElementById("a")!.getAttribute("onclick")!,
            Date.now() - AdsService.HANDLED_TTL_MS - 1000,
        );
        expect(AdsService.findUnhandledAdButtons().map(x => x.id)).toEqual(["a"]);
        expect(AdsService.handledAdKeys.size).toBe(0); // expired entry pruned
    });

    it("drains multiple ads over successive steps without re-clicking a handled one", async () => {
        jest.useFakeTimers();
        setStoredValue(HHStoredVarPrefixKey + SK.autoAdsClick, "true");
        document.body.innerHTML = adButtonHtml(52, "a") + adButtonHtml(99, "b");

        const fakeWin = { close: jest.fn() } as unknown as Window;
        const openSpy = jest.fn(() => fakeWin);
        (unsafeWindow as unknown as { open: jest.Mock }).open = openSpy;

        // Step 1: clicks the first ad; the second stays unhandled.
        const p1 = AdsService.runAdCycle();
        await jest.advanceTimersByTimeAsync(6000);  // 3-5s close delay
        await jest.advanceTimersByTimeAsync(61000); // 60s confirm wait times out (no OK)
        await p1;

        expect(AdsService.handledAdKeys.size).toBe(1);
        expect(AdsService.findUnhandledAdButtons().map(x => x.id)).toEqual(["b"]);

        // Step 2: clicks the remaining ad, not the already-handled one.
        clearTimer("nextAdsTime");
        const p2 = AdsService.runAdCycle();
        await jest.advanceTimersByTimeAsync(6000);
        await jest.advanceTimersByTimeAsync(61000);
        await p2;

        expect(AdsService.handledAdKeys.size).toBe(2);
        expect(openSpy).toHaveBeenCalledTimes(2); // exactly two ads opened, no re-click
    });
});
