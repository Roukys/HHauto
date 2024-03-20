import { PathOfValue } from "../../src/Module/index";

describe("PathOfValue", function () {
    describe("styles", function () {
        it("default", function () {
            expect(() => PathOfValue.styles()).not.toThrow()
        });
    });
});