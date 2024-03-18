import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        default: null,
    },
    avatar: {
        type: String,
        default: null,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verifyToken: {
        type: String,
        default: null,
    },
});

export default mongoose.model("User", userSchema);