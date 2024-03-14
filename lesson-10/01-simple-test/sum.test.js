import {sum} from "./sum.js";

// {
//     const result = sum(1, 2);
//     if (result !== 3) throw new Error(`Expect 3, but got ${result}`);
// }
//
// {
//     const result = sum(2, 2);
//     if (result !== 4) throw new Error(`Expect 4, but got ${result}`);
// }

const describe = (text, cb) => {
    console.log(text);
    cb();
};

const test = (text, cb) => {
    console.log(`  ${text}`);
    cb();
};

const expect = (actual) => {
    return {
        toBe: (expected) => {
            if (actual !== expected) {
                throw new Error(`Expected ${expected}, but got ${actual}`);
            } else {
                console.log("ok");
            }
        },
    };
};

describe("sum", () => {
    test("1 + 2 = 3", () => {
        const res = sum(1, 2);
        expect(res).toBe(3);
    });

    test("2 + 2 = 4", () => {
        const res = sum(2, 2);
        expect(res).toBe(4);
    });
});

console.log("OK");