import crypto from "node:crypto";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import User from "../models/user.js";
import e, {json} from "express";

const {SECRET_KEY, MAILTRAP_USER, MAILTRAP_PASS} = process.env;

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: MAILTRAP_USER,
        pass: MAILTRAP_PASS,
    },
});

const register = async (req, res, next) => {
    const {name, email, password} = req.body;

    const normalizedEmail = email.toLowerCase();

    try {
        const user = await User.findOne({email: normalizedEmail});

        if (user) {
            return res.status(409).send({message: "User already registered"});
        }

        const passwordHash = await bcrypt.hash(password, 10);
        const verifyToken = crypto.randomUUID();

        await transport.sendMail({
            to: email,
            from: "vsanotskyi@gmail.com",
            subject: "Welcome to BookShelf",
            html: `To confirm you registration please click on the <a href="http://localhost:8080/api/auth/verify/${verifyToken}">Link</a>`,
            text: `To confirm you registration please open the link http://localhost:8080/api/auth/verify/${verifyToken}`,
        });

        await User.create({
            name,
            verifyToken,
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

        if (user.verify === false) {
            return res.status(401).send({message: "Your account is not verified"});
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

const verify = async (req, res, next) => {
    const {token} = req.params;

    try {
        const user = await User.findOne({verifyToken: token});

        if (!user) {
            return res.status(404).send({message: "Not found"});
        }

        await User.findByIdAndUpdate(user._id, {verify: true, verifyToken: null});

        res.send({message: "Email confirm successfully"});
    } catch (error) {
        next(error);
    }
};

export default {
    register,
    login,
    logout,
    verify,
};