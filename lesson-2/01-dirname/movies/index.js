const fs = require("node:fs/promises");
const path = require("node:path");

const readMovies = async () => {
    const filePath = path.join(__dirname, "../data/movies.txt");

    return await fs.readFile(filePath, {encoding: "utf-8"});
};

module.exports = {
    readMovies,
};