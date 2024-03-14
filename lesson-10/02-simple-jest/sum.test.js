import {sum} from "./sum.js";

describe("sum", () => {
    test("1 + 2 should return 3", () => {
        const res = sum(1, 2);
        expect(res).toBe(3);
    });
    test("2 + 2 should return 4", () => {
        const res = sum(2, 2);
        expect(res).toBe(4);
    });
});