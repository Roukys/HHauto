import { PathOfGlory } from "../../src/Module/index";

describe("PathOfGlory", function () {
    describe("styles", function () {
        it("default", function () {
            expect(() => PathOfGlory.styles()).not.toThrow()
        });
    });
});