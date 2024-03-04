import express from "express";

import authControllers from "../controllers/auth.js";

const router = express.Router();
const jsonParser = express.json();

router.post("/register", jsonParser, authControllers.register);
router.post("/login", jsonParser, authControllers.login);

export default router;