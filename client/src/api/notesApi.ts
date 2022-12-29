import { INote } from "../interfaces/Note.interface";
import { axiosConfig } from "../service/axiosConfig";

export const getNotes = async () => {
  const result = await axiosConfig.get("notes/");

  return result.data;
};

export const newNote = async (newNote: INote) => {
  const note = { ...newNote, createdAt: Date.now() };
  const result = await axiosConfig.post(`notes/`, note);

  return result.data;
};

export const getNoteInfo = async (ID: string) => {
  const result = await axiosConfig.get(`notes/${ID}`);

  return result.data;
};

export const deleteNote = async (ID: string) => {
  const result = await axiosConfig.delete(`notes/${ID}`);

  return result.data;
};
