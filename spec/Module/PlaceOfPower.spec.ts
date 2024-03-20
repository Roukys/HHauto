import { PlaceOfPower } from "../../src/Module/PlaceOfPower";

describe("PlaceOfPower", function () {
    describe("styles", function () {
        it("default", function () {
            expect(() => PlaceOfPower.styles()).not.toThrow()
        });
    });
});