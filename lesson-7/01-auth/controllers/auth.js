import bcrypt from "bcrypt";

import User from "../models/user.js";

const register = async (req, res, next) => {
    const {name, email, password} = req.body;

    const normalizeEmail = email.toLowerCase();

    try {
        const user = await User.findOne({email: normalizeEmail});

        if (user) {
            return res.status(409).send({message: "User already registered"});
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await User.create({name, email: normalizeEmail, password: passwordHash});

        res.status(201).send({message: "Registration successful"});
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        const normalizedEmail = email.toLowerCase();
        const user = await User.findOne({email: normalizedEmail});

        if (!user) {
            console.log("email");
            return res.status(401).send({message: "Email or password is incorrect"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch === false) {
            console.log("password");
            return res.status(401).send({message: "Email or password is incorrect"});
        }

        res.end("Token");

    } catch (error) {
        next(error);
    }
};

export default {register, login};