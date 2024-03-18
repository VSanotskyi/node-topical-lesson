import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI)
    .then(() => {
        console.log("Database connection successful");
    })
    .catch((err) => {
        console.error("Database connect error", err);
        process.exit(1);
    });