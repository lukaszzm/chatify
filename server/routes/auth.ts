import { login, register } from "../controllers/authControllers";

import { fileUpload } from "../middleware/uploadImage";
import express from "express";

export const authRouter = express.Router();

authRouter.post("/login/", login);
authRouter.post("/register/", fileUpload.single("profileImage"), register);
