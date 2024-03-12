import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import {json} from "express";

const {SECRET_KEY} = process.env;

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

    const normalizedEmail = email ? email.toLowerCase() : null;

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

        const payload = {
            name: user.name,
            id: user.id,
        };

        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: 60 * 60});

        await User.findByIdAndUpdate(user.id, {token});

        res.send({token});
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {token: null});

        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

export default {
    register,
    login,
    logout,
};