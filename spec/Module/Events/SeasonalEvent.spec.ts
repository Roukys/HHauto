import { SeasonalEvent } from "../../../src/Module/index";

describe("SeasonalEvent", function () {
    describe("styles", function () {
        it("default", function () {
            expect(() => SeasonalEvent.styles()).not.toThrow()
        });
    });
});