import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Users } from "../models/users";
import { IUser } from "../interfaces/IUser.interface";
import bcrypt from "bcryptjs";

const JWT_TOKEN = process.env.JWT_TOKEN as string;
const DEFAULT_PROFILE_PATH = process.env.DEFAULT_PROFILE_PATH as string;

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    const fixedEmail = email.toLowerCase();
    const user = await Users.findOne({ email: fixedEmail });

    if (!user) return res.status(401).send("Your mail is incorrect.");

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).send("Your password is incorrect.");

    const id = user._id.toString();

    let token: string;
    try {
      token = jwt.sign(id, JWT_TOKEN);
    } catch (err) {
      throw new Error("Something went wrong.");
    }

    const { firstName, lastName, profileImage } = user;
    res.send({ id, token, firstName, lastName, profileImage });
  } catch (err) {
    next(err);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email: string = req.body.email.toLowerCase();
    const user = await Users.findOne({ email: email });

    if (user) throw new Error("This email is already used!");

    const profileImage = req.file ? req.file.path : DEFAULT_PROFILE_PATH;

    const { firstName, lastName }: IUser = req.body;

    const newUser = new Users({
      email: email,
      password: bcrypt.hashSync(req.body.password, 12),
      firstName: firstName,
      lastName: lastName,
      profileImage: profileImage,
    });

    newUser.save();
    const id = newUser._id.toString();

    let token: string;
    try {
      token = jwt.sign(id, JWT_TOKEN);
    } catch (err) {
      throw new Error("Something went wrong.");
    }

    return res
      .status(201)
      .send({ id, token, firstName, lastName, profileImage });
  } catch (err) {
    next(err);
  }
};
