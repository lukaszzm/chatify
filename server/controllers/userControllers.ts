import { Users } from "../models/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../interfaces/IUser.interface";

const JWT_TOKEN = process.env.JWT_TOKEN as string;
const DEFAULT_PROFILE_PATH = process.env.DEFAULT_PROFILE_PATH as string;

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await Users.find(
      { _id: req.params.id },
      { _id: 1, firstName: 1, lastName: 1, profileImage: 1 }
    );
    return res.json(user);
  } catch (err) {
    next(err);
  }
};

export const getUserByName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: string = req.body.id;
    const input = req.params.input;

    const users = await Users.find(
      {
        $and: [
          {
            $expr: {
              $regexMatch: {
                input: {
                  $concat: ["$firstName", " ", "$lastName"],
                },
                regex: input,
                options: "i",
              },
            },
          },
          {
            _id: { $ne: id },
          },
        ],
      },
      { firstName: 1, lastName: 1, profileImage: 1 }
    );
    return res.json(users);
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    let fixedEmail = email.toLowerCase();
    const user = await Users.findOne({ email: fixedEmail });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const id = user._id.toString();
        let token;
        try {
          token = jwt.sign(id, JWT_TOKEN);
        } catch (err) {
          res.status(400).send("Something went wrong.");
        }
        const { firstName, lastName, profileImage } = user;
        res.send({ id, token, firstName, lastName, profileImage });
      } else {
        res.status(400).send("Your password is incorrect.");
      }
    } else {
      res.status(400).send("Your mail is incorrect.");
    }
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
    let profileImage = DEFAULT_PROFILE_PATH;
    if (req.file) profileImage = req.file.path;

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
    let token;
    try {
      token = jwt.sign(id, JWT_TOKEN);
    } catch (err) {
      return res.status(400).send("Something went wrong.");
    }
    return res.send({ id, token, firstName, lastName, profileImage });
  } catch (err) {
    next(err);
  }
};

export const updateFirstName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: string = req.body.id;
    const newFirstName = req.params.firstName;
    await Users.findByIdAndUpdate(id, { firstName: newFirstName });
  } catch (err) {
    next(err);
  }
  return res.send("Success! Your first name has been updated.");
};

export const updateLastName = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: string = req.body.id;
    const newLastName = req.params.lastName;
    await Users.findByIdAndUpdate(id, { lastName: newLastName });
  } catch (err) {
    next(err);
  }
  return res.send("Success! Your last name has been updated.");
};

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      id,
      currentPassword,
      newPassword,
    }: { id: string; currentPassword: string; newPassword: string } = req.body;
    const user = await Users.findOne({ _id: id });
    if (user) {
      const match = await bcrypt.compare(currentPassword, user.password);
      if (match) {
        await Users.findByIdAndUpdate(id, {
          password: bcrypt.hashSync(newPassword, 12),
        });
        return res.send("Succesfull. Your password has been changed.");
      } else {
        return res.status(400).send("Your password is incorrect.");
      }
    } else {
      return res.status(400).send("Something went wrong.");
    }
  } catch (err) {
    next(err);
  }
};

export const updateProfileImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: string = req.body.id;
    const newFilePath = req.file!.path;
    await Users.findByIdAndUpdate(id, { profileImage: newFilePath });
    return res.send(newFilePath);
  } catch (err) {
    next(err);
  }
};
