import express from "express";

import routes from "./routes/index.js";

import "./db.js";

const app = express();

app.use("/api", routes);

app.use((req, res) => {
    res.status(404).send("Not found");
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});