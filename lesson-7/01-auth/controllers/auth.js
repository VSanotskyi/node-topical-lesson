import bcrypt from "bcrypt";

import User from "../models/user.js";

const register = async (req, res, next) => {
    const {name, email, password} = req.body;

    const normalizedEmail = email.toLowerCase();

    try {
        const user = await User.findOne({email: normalizedEmail});

        if (user) {
            return res.status(409).send({message: "User already registered"});
        }

        const passwordHash = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email: normalizedEmail,
            password: passwordHash,
        });

        res.status(201).send({message: "Registration successful"});
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    const {email, password} = req.body;

    const normalizedEmail = email.toLowerCase();

    try {
        const user = await User.findOne({email: normalizedEmail});

        if (!user) {
            return res
                .status(401)
                .send({message: "Email or password is incorrect"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res
                .status(401)
                .send({message: "Email or password is incorrect"});
        }

        res.send({token: "TOKEN"});
    } catch (error) {
        next(error);
    }
};

export default {
    register,
    login,
};