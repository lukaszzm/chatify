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
authRouter.get("/users/id/:id", getUserById);
authRouter.get("/users/name/:input", getUserByName);
authRouter.patch("/users/first-name/:firstName", updateFirstName);
authRouter.patch("/users/last-name/:lastName", updateLastName);
authRouter.patch("/users/password", updatePassword);
authRouter.patch(
  "/users/profile-image/",
  fileUpload.single("profileImage"),
  updateProfileImage
);
