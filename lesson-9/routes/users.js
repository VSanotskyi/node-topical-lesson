import express from "express";

import userController from "../controllers/user.js";
import upload from "../middlewre/upload.js";

const route = express.Router();

route.get("/avatar", userController.getAvatar);
route.patch("/avatar", upload.single("avatar"), userController.uploadAvatar);

export default route;