import { TimeHelper, convertTimeToInt, randomInterval } from "../../src/Helper/TimeHelper";


describe("Time Helper", function () {

    beforeEach(function () {
        unsafeWindow.server_now_ts = 1234;
    });

    describe("getServerTS", function () {
        it("default", function () {
            expect(TimeHelper.getServerTS()).toEqual({"days": 0, "hours": 1, "minutes": 20, "seconds": 34});
        });
        it("Time 123456789", function () {
            unsafeWindow.server_now_ts = 123456789;
            expect(TimeHelper.getServerTS()).toEqual({"days": 1428, "hours": 22, "minutes": 33, "seconds": 9});
        });
    });

    describe("toHHMMSS", function () {
        it("default", function () {
            expect(TimeHelper.toHHMMSS(151220)).toBe('01:18:00:20');
            expect(TimeHelper.toHHMMSS(583260)).toBe('06:18:01:00');
        });
    });

    describe("debugDate", function () {
        it("default", function () {
            expect(TimeHelper.debugDate(151220)).toBe('{\"days\":1,\"hours\":18,\"minutes\":0,\"seconds\":20}');
            expect(TimeHelper.debugDate(583260)).toBe('{\"days\":6,\"hours\":18,\"minutes\":1,\"seconds\":0}');
        });
    });

    describe("randomInterval", function () {
        it("Some", function () {
            let newTime = randomInterval(10, 20);
            expect(newTime > 10).toBeTruthy();
            expect(newTime < 20).toBeTruthy();
            newTime = randomInterval(60, 120);
            expect(newTime > 60).toBeTruthy();
            expect(newTime < 120).toBeTruthy();
        });
    });

    describe("convertTimeToInt", function () {
        it("default new time random between 15 and 17min", function () {
            let newTime = convertTimeToInt('');
            expect(newTime > 15*60).toBeTruthy();
            expect(newTime < 17*60).toBeTruthy();
            newTime = convertTimeToInt(undefined);
            expect(newTime > 15*60).toBeTruthy();
            expect(newTime < 17*60).toBeTruthy();
            newTime = convertTimeToInt(null);
            expect(newTime > 15*60).toBeTruthy();
            expect(newTime < 17*60).toBeTruthy();
            newTime = convertTimeToInt(' ');
            expect(newTime > 15*60).toBeTruthy();
            expect(newTime < 17*60).toBeTruthy();
        });
        it("Error case new time random between 15 and 17min", function () {
            let newTime = convertTimeToInt(' ');
            expect(newTime > 15*60).toBeTruthy();
            expect(newTime < 17*60).toBeTruthy();
            newTime = convertTimeToInt('1m 5');
            expect(newTime > 15*60).toBeTruthy();
            expect(newTime < 17*60).toBeTruthy();
            newTime = convertTimeToInt('99');
            expect(newTime > 15*60).toBeTruthy();
            expect(newTime < 17*60).toBeTruthy();
        });
        it("Some times", function () {
            expect(convertTimeToInt('12s')).toBe(12);
            expect(convertTimeToInt('6m 36s')).toBe(6 * 60 + 36);
            expect(convertTimeToInt('1h 27m')).toBe(3600 + 27*60);
            expect(convertTimeToInt('11d 17h')).toBe(1011600);
        });
    });

    describe("canCollectCompetitionActive", function () {
        xit("default", function () {
            //expect(TimeHelper.canCollectCompetitionActive()).toBeTruthy()
        });
    });

    describe("getSecondsLeftBeforeNewCompetition", function () {
        xit("default", function () {
            //expect(TimeHelper.getSecondsLeftBeforeNewCompetition()).toBe(0);
        });
    });
});