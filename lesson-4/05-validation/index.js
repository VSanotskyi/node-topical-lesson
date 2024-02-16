const crypto = require("node:crypto");

const express = require("express");

const jsonParser = express.json();

const movieSchema = require("./schemas/movies");

const app = express();

app.post("/api/movies", jsonParser, (req, res) => {
    const movie = {
        title: req.body.title,
    };

    const {value, error} = movieSchema.validate(movie);

    if (typeof error !== "undefined") {
        res.status(400).send("Validation error");
    }

    res.status(201).send({...value, id: crypto.randomUUID()});
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});