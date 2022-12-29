import {
  sendMessage,
  getMessages,
  getRecentMessages,
} from "../controllers/messageControllers";

import express from "express";
import { auth } from "../middleware/auth";

export const messagesRouter = express.Router();

messagesRouter.use(auth);
messagesRouter.post("/messages/", sendMessage);
messagesRouter.get("/messages/:id", getMessages);
messagesRouter.get("/messages/", getRecentMessages);
