import * as fs from "fs";
import * as path from "path";
import {
    AdsService,
    captureOpenedWindow,
    findAdButtons,
    findConfirmButton,
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
    it("captures the handle the wrapped open returns and restores the original", () => {
        const fakeWin = {} as Window;
        const originalOpen = jest.fn(() => fakeWin);
        const opener: WindowOpener = { open: originalOpen as unknown as WindowOpener["open"] };

        const handle = captureOpenedWindow(opener, () => { opener.open("http://ad.example"); });

        expect(handle).toBe(fakeWin);
        expect(originalOpen).toHaveBeenCalledWith("http://ad.example");
        // Restored: the property is the exact original function again.
        expect(opener.open).toBe(originalOpen);
    });

    it("returns null when the click does not open a window (popup blocker)", () => {
        const opener: WindowOpener = { open: jest.fn(() => null) as unknown as WindowOpener["open"] };
        const handle = captureOpenedWindow(opener, () => { /* no open call */ });
        expect(handle).toBeNull();
    });

    it("restores the original open even when the click throws", () => {
        const originalOpen = jest.fn(() => ({} as Window));
        const opener: WindowOpener = { open: originalOpen as unknown as WindowOpener["open"] };
        expect(() => captureOpenedWindow(opener, () => { throw new Error("boom"); })).toThrow("boom");
        expect(opener.open).toBe(originalOpen);
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

    it("confirms a pending reward (OK) left over from a previous cycle", async () => {
        setStoredValue(HHStoredVarPrefixKey + SK.autoAdsClick, "true");
        document.body.innerHTML = `<button confirm_blue_button="">OK</button>`;
        const clickSpy = jest.fn();
        (document.querySelector("button[confirm_blue_button]") as HTMLElement).addEventListener("click", clickSpy);

        const acted = await AdsService.runAdCycle();
        expect(acted).toBe(true);
        expect(clickSpy).toHaveBeenCalled();
        expect(checkTimer("nextAdsTime")).toBe(false);
    });

    it("backs off (no retry) when no window handle is captured (popup blocker)", async () => {
        setStoredValue(HHStoredVarPrefixKey + SK.autoAdsClick, "true");
        document.body.innerHTML = adButtonHtml();
        // The redirect opens nothing -> captureOpenedWindow returns null.
        (unsafeWindow as unknown as { open: jest.Mock }).open = jest.fn(() => null);
        const acted = await AdsService.runAdCycle();
        expect(acted).toBe(false);
        expect(checkTimer("nextAdsTime")).toBe(false); // long cooldown armed
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

    it("skips ads it already handled this session", () => {
        document.body.innerHTML = adButtonHtml(52, "a") + adButtonHtml(99, "b");
        expect(AdsService.findUnhandledAdButtons().length).toBe(2);
        AdsService.handledAdKeys.add(document.getElementById("a")!.getAttribute("onclick")!);
        expect(AdsService.findUnhandledAdButtons().map(x => x.id)).toEqual(["b"]);
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
        await jest.advanceTimersByTimeAsync(16000); // 15s confirm wait times out (no OK)
        await p1;

        expect(AdsService.handledAdKeys.size).toBe(1);
        expect(AdsService.findUnhandledAdButtons().map(x => x.id)).toEqual(["b"]);

        // Step 2: clicks the remaining ad, not the already-handled one.
        clearTimer("nextAdsTime");
        const p2 = AdsService.runAdCycle();
        await jest.advanceTimersByTimeAsync(6000);
        await jest.advanceTimersByTimeAsync(16000);
        await p2;

        expect(AdsService.handledAdKeys.size).toBe(2);
        expect(openSpy).toHaveBeenCalledTimes(2); // exactly two ads opened, no re-click
    });
});
