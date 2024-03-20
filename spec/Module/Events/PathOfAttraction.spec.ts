import { PathOfAttraction } from "../../../src/Module/index";

describe("PathOfAttraction", function () {
    describe("styles", function () {
        it("default", function () {
            expect(() => PathOfAttraction.styles()).not.toThrow()
        });
    });
});