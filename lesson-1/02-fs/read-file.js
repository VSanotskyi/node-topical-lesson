// const fs = require("node:fs");
const fs = require("node:fs/promises");

console.log("before");

// fs.readFile("read.txt", {encoding: "utf-8"}, (err, data) => {
//     if (err) {
//         throw err;
//     }
//     console.log(data);
// });

// fs.promises
//     .readFile("read.txt", {encoding: "utf-8"})
//     .then(data => console.log(data))
//     .catch(err => console.log(err));

fs.readFile("read.txt", {encoding: "utf-8"})
    .then(console.log)
    .catch(console.log);

console.log("after");