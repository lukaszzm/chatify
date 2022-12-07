import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_TOKEN = process.env.JWT_TOKEN as string;

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : undefined;
    if (!token) {
      throw new Error();
    }
    const decodedToken = jwt.verify(token, JWT_TOKEN);
    req.body.id = decodedToken;
    next();
  } catch {
    res.status(401).send("Authorization Error.");
  }
};
