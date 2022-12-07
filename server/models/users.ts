import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    firstName: {
      type: String,
      required: true,
      maxLength: 25,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 25,
    },
    profileImage: {
      type: String,
      required: false,
    },
  },
  { collection: "users" }
);

export const Users = mongoose.model("Users", userSchema);
