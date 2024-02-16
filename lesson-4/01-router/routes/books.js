const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("GET books");
});

router.get("/1", (req, res) => {
    res.send("GET book 1");
});

router.post("/", (req, res) => {
    res.send("POST book");
});

router.put("/1", (req, res) => {
    res.send("PUT book 1");
});

router.delete("/1", (req, res) => {
    res.send("DELETE book 1");
});

module.exports = router;