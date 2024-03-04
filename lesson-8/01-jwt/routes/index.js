import express from "express";

import auth from "../middlewre/auth.js";
import authRoutes from "./auth.js";
import bookRoutes from "./books.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/books", auth, bookRoutes);

export default router;