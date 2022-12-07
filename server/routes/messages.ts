import {
  sendMessage,
  getMessages,
  getRecentMessages,
} from "../controllers/messageControllers";

import express from "express";
import { auth } from "../middleware/auth";

export const messagesRouter = express.Router();

messagesRouter.use(auth);
messagesRouter.post("/send-message/", sendMessage);
messagesRouter.get("/get-messages/:id", getMessages);
messagesRouter.get("/get-recent-messages/", getRecentMessages);
