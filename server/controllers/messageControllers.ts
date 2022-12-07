import { Messages } from "../models/messages";
import { removeDuplications } from "../utils/removeDuplications";
import { Request, Response, NextFunction } from "express";
import { IMessage } from "../interfaces/IMessage.interface";

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userID: string = req.body.id;
    const chatID: string = req.params.id;
    const messages = await Messages.find({
      $or: [
        {
          $and: [
            {
              fromId: userID,
            },
            {
              toId: chatID,
            },
          ],
        },
        {
          $and: [
            {
              fromId: chatID,
            },
            {
              toId: userID,
            },
          ],
        },
      ],
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

export const sendMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { text, fromId, toId }: IMessage = req.body;

    const data = await Messages.create({
      text: text,
      fromId: fromId,
      toId: toId,
      createdAt: Date.now(),
    });

    if (data) return res.json(data);
  } catch (err) {
    next(err);
  }
};

export const getRecentMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ID = req.body.id;
    let recentMessages: IMessage[] = await Messages.aggregate([
      { $match: { $or: [{ fromId: ID }, { toId: ID }] } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: { $concat: ["$fromId", "$toId"] },
          text: { $first: "$text" },
          createdAt: {
            $first: "$createdAt",
          },
          fromId: {
            $first: "$fromId",
          },
          toId: {
            $first: "$toId",
          },
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $addFields: {
          fromId: { $toObjectId: "$fromId" },
          toId: { $toObjectId: "$toId" },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "fromId",
          foreignField: "_id",
          as: "fromIdUserInfo",
          pipeline: [
            {
              $project: {
                firstName: 1,
                _id: 1,
                lastName: 1,
                profileImage: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "toId",
          foreignField: "_id",
          as: "toIdUserInfo",
          pipeline: [
            {
              $project: {
                firstName: 1,
                _id: 1,
                lastName: 1,
                profileImage: 1,
              },
            },
          ],
        },
      },
    ]);

    recentMessages = removeDuplications(ID, recentMessages);

    recentMessages.map((el) => {
      delete el.fromIdUserInfo;
      delete el.toIdUserInfo;
    });

    res.json(recentMessages);
  } catch (err) {
    next(err);
  }
};
