const http = require("node:http");

const server = http.createServer((req, res) => {
    console.log(req.method);
    console.log(req.url);

    if (req.method === "GET" && req.url === "/") {
        return res.end("Home");
    }

    if (req.method === "GET" && req.url === "/movies") {
        return res.end("Movies");
    }

    res.statusCode = 404;
    res.end("Not found");
});

server.listen(8080, () => {
    console.log("Server started on port 8080");
});