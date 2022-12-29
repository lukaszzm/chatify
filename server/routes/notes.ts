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
notesRouter.post("/notes/", addNote);
notesRouter.delete("/notes/:id", deleteNote);
notesRouter.get("/notes/", getAllNotes);
notesRouter.get("/notes/:id", getNote);
