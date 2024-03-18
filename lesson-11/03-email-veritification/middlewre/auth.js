import jwt from "jsonwebtoken";

import User from "../models/user.js";

const {SECRET_KEY} = process.env;

const auth = async (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if (!authHeaders) {
        return res.status(401).send({message: "Invalid token"});
    }

    const [bearer, token] = authHeaders.split(" ");

    if (bearer !== "Bearer") {
        return res.status(401).send({message: "Invalid token"});
    }

    jwt.verify(token, SECRET_KEY, async (err, decode) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).send({message: "Token expired"});
            }

            return res.status(401).send({message: "Invalid token"});
        }

        const user = await User.findById(decode.id);

        if (!user) {
            return res.status(401).send({message: "Invalid token"});
        }

        if (user.token !== token) {
            return res.status(401).send({message: "Invalid token"});
        }

        if (user.verify === false) {
            return res.status(401).send({message: "Your account is not verified"});
        }

        req.user = {
            id: decode.id,
        };

        next();
    });
};

export default auth;