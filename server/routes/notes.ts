import {
  addNote,
  deleteNote,
  getAllNotes,
  getNote,
} from "../controllers/notesControllers";

import express from "express";
import { auth } from "../middleware/auth";

export const notesRouter = express.Router();

notesRouter.use(auth);
notesRouter.post("/", addNote);
notesRouter.delete("/:id", deleteNote);
notesRouter.get("/", getAllNotes);
notesRouter.get("/:id", getNote);
