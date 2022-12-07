import { ObjectId } from "mongoose";
import { IUser } from "./IUser.interface";

export interface IMessage {
  _id: string | ObjectId;
  text: string;
  fromId: string;
  toId: string;
  createdAt: string;
  fromIdUserInfo?: IUser[];
  toIdUserInfo?: IUser[];
  userInfo?: IUser[];
}
