import { getBrowserData } from '../../src/Utils/BrowserUtils';

describe("BrowserUtils", function () {

    describe("getBrowserData", function () {
        it("Chrome", function () {
            const nav = {
                userAgent: 'Mozilla/5.0 (Linux; Android 13; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile'
            };
            expect(getBrowserData(nav as any)).toBe("chrome 112.0.0.0");
        });
        it("Samsung browser", function () {
            const nav = {
                userAgent: 'Mozilla/5.0 (Linux; Android 12; SM-S515DL Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/17.0 Chrome/98.0.4758.101 Mobile Safari/537.36'
            };
            expect(getBrowserData(nav as any)).toBe("chrome 98.0.4758.101");
        });
        it("Firefox", function () {
            const nav = {
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0'
            };
            expect(getBrowserData(nav as any)).toBe("firefox 123.0");
        });
        it("Edge", function () {
            const nav = {
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Edg/122.0.0.0'
            };
            expect(getBrowserData(nav as any)).toBe("edg 122.0.0.0");
        });
        it("Opera", function () {
            const nav = {
                userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36 OPR/108.0.0.0'
            };
            expect(getBrowserData(nav as any)).toBe("opera 108.0.0.0");
        });
        it("Internet explorer", function () {
            const nav = {
                userAgent: 'Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko'
            };
            expect(getBrowserData(nav as any)).toBe("msie 11.0");
        });
        it("Safari", function () {
            const nav = {
                userAgent: 'Mozilla/5.0 (iPhone14,6; U; CPU iPhone OS 15_4 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19E241 Safari/602.1'
            };
            expect(getBrowserData(nav as any)).toBe("safari 10.0");
        });
    });
});