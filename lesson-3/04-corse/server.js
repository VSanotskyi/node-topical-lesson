const fs = require("node:fs/promises");
const path = require("node:path");

const express = require("express");
const cors = require("cors");

const server = express();

server.use(cors());

server.use("/books", async (req, res) => {
    const pathFile = path.join(__dirname, "books.json");

    try {
        const books = await fs.readFile(pathFile, {encoding: "utf-8"});
        res.send(JSON.parse(books));
    } catch (error) {
        res.send(error);
    }
});

server.listen(8080, () => {
    console.log("Server started on port 8080");
});