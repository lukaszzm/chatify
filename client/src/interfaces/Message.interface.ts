import { IUser } from "./User.interface";

export interface IMessage {
  _id: string;
  text: string;
  fromId: string;
  toId: string;
  createdAt: Date | string;
  userInfo: IUser[];
}
