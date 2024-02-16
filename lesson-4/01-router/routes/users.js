const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("GET users");
});

router.get("/1", (req, res) => {
    res.send("GET user 1");
});

router.post("/", (req, res) => {
    res.send("POST user");
});

router.put("/1", (req, res) => {
    res.send("PUT user 1");
});

router.delete("/1", (req, res) => {
    res.send("DELETE user 1");
});

module.exports = router;