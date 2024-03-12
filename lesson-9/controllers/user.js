import * as fs from "node:fs/promises";
import * as path from "node:path";

import User from "../models/user.js";

const uploadAvatar = async (req, res, next) => {
    try {
        await fs.rename(req.file.path,
            path.join(process.cwd(), "public", "avatars", req.file.filename));

        const user = await User.findByIdAndUpdate(
            req.user.id,
            {avatar: req.file.filename},
            {new: true});

        if (user === null) {
            res.status(404).send({message: "User not found"});
        }

        res.send(user);
    } catch (error) {
        next(error);
    }
};

const getAvatar = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (user === null) {
            return res.status(404).send({message: "User not found"});
        }

        if (user.avatar === null) {
            return res.status(404).send({message: "Avatar not found"});
        }

        res.sendfile(path.join(process.cwd(), "public", "avatars", user.avatar));
    } catch (error) {
        next(error);
    }
};

export default {
    uploadAvatar,
    getAvatar,
};