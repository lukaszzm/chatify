import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const getNotes = async () => {
  const token = localStorage.getItem("token");

  const result = await axios.get(`/notes/get-all-notes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
};

export const newNote = async ({ title, text }) => {
    const token = localStorage.getItem("token");
    const note = {title: title, text: text, createdAt: Date.now()}
    const result = await axios.post(
        `/notes/add-not`,
        note,
        { headers: { Authorization: `Bearer ${token}` } }
    );
    return result.data;
};
