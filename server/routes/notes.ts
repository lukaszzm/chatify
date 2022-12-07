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
notesRouter.post("/add-note/", addNote);
notesRouter.delete("/delete-note/:id", deleteNote);
notesRouter.get("/get-all-notes/", getAllNotes);
notesRouter.get("/get-note/:id", getNote);
