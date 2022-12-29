import {
  getUserById,
  getUserByName,
  updateFirstName,
  updateLastName,
  updatePassword,
  updateProfileImage,
} from "../controllers/userControllers";

import { auth } from "../middleware/auth";
import { fileUpload } from "../middleware/uploadImage";
import express from "express";

export const usersRouter = express.Router();

usersRouter.use(auth);
usersRouter.get("/id/:id", getUserById);
usersRouter.get("/name/:input", getUserByName);
usersRouter.patch("/first-name/:firstName", updateFirstName);
usersRouter.patch("/last-name/:lastName", updateLastName);
usersRouter.patch("/password", updatePassword);
usersRouter.patch(
  "/profile-image/",
  fileUpload.single("profileImage"),
  updateProfileImage
);
