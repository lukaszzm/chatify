import { Notes } from "../models/notes";
import { Request, Response, NextFunction } from "express";
import { INote } from "../interfaces/INote.interface";

export const getAllNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id: string = req.body.id;

  try {
    const notes = await Notes.find(
      { fromId: id },
      { title: 1, createdAt: 1 }
    ).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

export const getNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const note = await Notes.findById(id);
    res.send(note);
  } catch (err) {
    next(err);
  }
};

export const addNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, title, text, createdAt }: INote = req.body;

  try {
    const newNote = new Notes({
      fromId: id,
      title: title,
      text: text,
      createdAt: createdAt,
    });
    newNote.save();
    res.send(newNote);
  } catch (err) {
    next(err);
  }
};

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req.body.id;
  const noteId = req.params.id;

  try {
    const note = await Notes.findById(noteId);
    if (!note) throw new Error("This note does not exist!");
    if (note.fromId !== userId)
      throw new Error("This note does not belong to this user!");
    note.remove();
    res.send("Success!");
  } catch (err) {
    next(err);
  }
};
