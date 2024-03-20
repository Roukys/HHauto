import { Contest } from "../../src/Module/Contest";

describe("Contest", function () {
    describe("styles", function () {
        it("default", function () {
            expect(() => Contest.styles()).not.toThrow()
        });
    });
});