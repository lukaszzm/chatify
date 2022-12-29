import {
  sendMessage,
  getMessages,
  getRecentMessages,
} from "../controllers/messageControllers";

import express from "express";
import { auth } from "../middleware/auth";

export const messagesRouter = express.Router();

messagesRouter.use(auth);
messagesRouter.post("/", sendMessage);
messagesRouter.get("/:id", getMessages);
messagesRouter.get("/", getRecentMessages);
