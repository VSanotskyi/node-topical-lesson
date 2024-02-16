const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("GET movies");
});

router.get("/1", (req, res) => {
    res.send("GET movies 1");
});

router.post("/", (req, res) => {
    res.send("POST movie");
});

router.put("/1", (req, res) => {
    res.send("PUT movie 1");
});

router.delete("/1", (req, res) => {
    res.send("DELETE movie 1");
});

module.exports = router;