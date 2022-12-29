import { IMessage } from "../interfaces/Message.interface";
import { axiosConfig } from "../service/axiosConfig";

export const getRecentMessages = async () => {
  const result = await axiosConfig.get("messages/");

  return result.data;
};

export const getUserInfo = async (ID: string) => {
  const result = await axiosConfig.get(`users/id/${ID}`);

  return result.data;
};

export const newMessage = async (message: IMessage) => {
  const result = await axiosConfig.post(`messages/`, message);

  return { ...result.data, userInfo: message.userInfo };
};

export const getMessages = async (ID: string) => {
  const result = await axiosConfig.get(`messages/${ID}`);

  return result.data;
};
