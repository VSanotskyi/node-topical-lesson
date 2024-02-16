const fs = require("node:fs/promises");
const path = require("node:path");

const express = require("express");

const app = express();

app.get("/api/users", async (req, res, next) => {
    const usersPath = path.join(__dirname, "users1.json");

    try {
        const data = await fs.readFile(usersPath, {encoding: "utf-8"});

        res.send(JSON.parse(data));
    } catch (error) {
        next(error);
    }
});

app.get("api/movies", (req, res) => {
    res.send("GET movies");
});

app.use((req, res) => {
    res.status(404).send("Route not found");
});

app.use((err, req, res, next) => {
    const {statusCode = 500, statusMessage = "Internal server error"} = err;
    res.status(statusCode).send({statusMessage});
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});

