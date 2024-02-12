const fs = require("node:fs/promises");

async function main() {
    const data = await fs.readFile("movies.txt", {encoding: "utf-8"});

    console.log(data.split("\n"));
    await fs.writeFile(
        "movies.txt",
        data
            .split("\n")
            .filter(film => film !== "Goodfellas")
            .join("\n"));
}

main().catch(console.error);