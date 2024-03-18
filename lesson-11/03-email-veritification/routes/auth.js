import express from "express";

import auth from "../middlewre/auth.js";
import authControllers from "../controllers/auth.js";

const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, authControllers.register);
router.post("/login", jsonParser, authControllers.login);
router.get("/logout", auth, authControllers.logout);
router.get("/verify/:token", authControllers.verify);

export default router;