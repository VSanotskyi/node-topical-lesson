const crypto = require("node:crypto");

const express = require("express");

const app = express();

const jsonParser = express.json();

app.get("/api/movies", (req, res) => {
    res.send("GET movies");
});

app.post("/api/movies", jsonParser, (req, res) => {
    const {title} = req.body;

    res.status(201).send({id: crypto.randomUUID(), title});
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});

