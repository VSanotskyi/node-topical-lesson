const express = require("express");

const app = express();

const router = require("./routes/index");

app.use("/api", router);

app.listen(8080, () => {
    console.log("Server started on port 8080");
});