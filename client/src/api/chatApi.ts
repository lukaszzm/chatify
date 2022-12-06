import axios from "axios";
import { IMessage } from "../interfaces/Message.interface";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const getRecentMessages = async () => {
  const token = localStorage.getItem("token");

  const result = await axios.get(`/messages/get-recent-messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return result.data;
};

export const getUserInfo = async (ID: string) => {
  const token = localStorage.getItem("token");

  const result = await axios.get(`/auth/user-by-id/${ID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return result.data;
};

export const newMessage = async (message: IMessage) => {
  const token = localStorage.getItem("token");

  const result = await axios.post(`/messages/send-message`, message, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return { ...result.data, userInfo: message.userInfo };
};

export const getMessages = async (ID: string) => {
  const token = localStorage.getItem("token");

  const result = await axios.get(`/messages/get-messages/${ID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return result.data;
};
