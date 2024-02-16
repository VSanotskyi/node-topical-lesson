const express = require("express");

const router = express.Router();

const movieRouters = require("./movies");
const bookRouters = require("./books");
const userRouters = require("./users");

router.use("/movies", movieRouters);
router.use("/books", bookRouters);
router.use("/users", userRouters);

module.exports = router;