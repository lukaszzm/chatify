import { ObjectId } from "mongoose";

export interface IUser {
  _id: string | ObjectId;
  firstName: string;
  lastName: string;
  profileImage: string;
}
