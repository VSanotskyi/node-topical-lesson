import "dotenv/config";
import mongoose from "mongoose";

const DB_URI = process.env.DB_URI;
console.log(process.env.DB_URI);

mongoose.connect(DB_URI)
    .then(() => console.log("Database connection success"))
    .catch(error => {
        console.log("Database connection error", error);
        process.exit(1);
    });