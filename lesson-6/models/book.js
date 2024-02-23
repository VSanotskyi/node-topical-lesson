import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        match: /[\w\s]+/,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        enum: [
            "Action",
            "History",
            "Biography",
        ],
    },
    year: {
        type: Number,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model("Book", bookSchema);
