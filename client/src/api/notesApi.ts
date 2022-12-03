import axios from "axios";
import { INote } from "../interfaces/Note.interface";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const getNotes = async () => {
  const token = localStorage.getItem("token");

  const result = await axios.get(`/notes/get-all-notes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
};

export const newNote = async (newNote: INote) => {
  const token = localStorage.getItem("token");
  const note = { ...newNote, createdAt: Date.now() };
  const result = await axios.post(`/notes/add-note`, note, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
};

export const getNoteInfo = async (ID: string) => {
  const token = localStorage.getItem("token");
  const result = await axios.get(`/notes/get-note/${ID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
};

export const deleteNote = async (ID: string) => {
  const token = localStorage.getItem("token");
  const result = await axios.delete(`/notes/delete-note/${ID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
};
