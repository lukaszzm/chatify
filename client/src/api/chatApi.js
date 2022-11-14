import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export const getRecentMessages = async () => {
  const token = localStorage.getItem("token");

  const result = await axios.get(`/messages/get-recent-messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return result.data;
};

export const getUserInfo = async (ID) => {
  const token = localStorage.getItem("token");

  const result = await axios.get(`/auth/user-by-id/${ID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return result.data;
};

export const newMessage = async (message) => {
  const token = localStorage.getItem("token");

  const result = await axios.post(`/messages/send-message`, message, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return result.data;
}

export const getMessages = async (ID) => {
  const token = localStorage.getItem("token");

  const result = await axios.get(`/messages/get-messages/${ID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return result.data;
}
