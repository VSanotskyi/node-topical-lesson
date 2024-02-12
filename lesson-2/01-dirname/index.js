const movies = require("./movies");

movies
    .readMovies()
    .then(console.log)
    .catch(console.error);
