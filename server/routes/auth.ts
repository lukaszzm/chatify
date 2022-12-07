import {
  getUserById,
  getUserByName,
  updateFirstName,
  updateLastName,
  updatePassword,
  updateProfileImage,
  login,
  register,
} from "../controllers/userControllers";

import { auth } from "../middleware/auth";
import { fileUpload } from "../middleware/uploadImage";
import express from "express";

export const authRouter = express.Router();

authRouter.post("/login/", login);
authRouter.post("/register/", fileUpload.single("profileImage"), register);

authRouter.use(auth);
authRouter.get("/user-by-id/:id", getUserById);
authRouter.get("/user-by-name/:input", getUserByName);
authRouter.patch("/update-first-name/:firstName", updateFirstName);
authRouter.patch("/update-last-name/:lastName", updateLastName);
authRouter.patch("/update-password", updatePassword);
authRouter.patch(
  "/update-profile-image",
  fileUpload.single("profileImage"),
  updateProfileImage
);
