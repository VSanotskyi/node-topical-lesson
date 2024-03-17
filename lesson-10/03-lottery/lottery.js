import generateNumber from "./generateNumber.js";

const lottery = (expect) => {
    const actual = generateNumber();

    if (actual !== expect) {
        return "You lost :(";
    }

    return "$$$ You WIN $$$";
};

export default lottery;
