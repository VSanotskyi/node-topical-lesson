const express = require("express");

const app = express();

app.get("/api/users", (req, res) => {

    res.send("GET users");
});

app.get("/api/users/:id", (req, res) => {
    const {id} = req.params;
    res.send(`GET user ${id}`);
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});