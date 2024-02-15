const fs = require("node:fs/promises");
const path = require("node:path");

const express = require("express");

const app = express();

const checkAuth = (req, res, next) => {
    const apiKey = req.query["api-key"];

    console.log("middleware books");
    if (apiKey !== "123") {
        return res.status(404).send("Please proide api key");
    }

    next();
};

app.get("/", (req, res) => {
    res.send("Home");
});

app.use((req, res, next) => {
    console.log("middleware global");
    next();
});

app.get("/books", checkAuth, async (req, res) => {
    const filePath = path.join(__dirname, "books.json");

    try {
        const data = await fs.readFile(filePath, {encoding: "utf-8"});
        const books = JSON.parse(data);

        res.send(books);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});