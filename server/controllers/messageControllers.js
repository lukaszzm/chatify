const Messages = require("../models/messages");
const removeDuplications = require("../utils/removeDuplications");

module.exports.getMessages = async (req, res, next) => {
  try {
    const userID = req.body.id;
    const chatID = req.params.id;
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

module.exports.sendMessage = async (req, res, next) => {
  try {
    const { text, fromId, toId } = req.body;

    const data = await Messages.create({
      text: text,
      fromId: fromId,
      toId: toId,
      createdAt: Date.now(),
    });

    if (data) return res.json("Message added successfully!");
    else return res.json("Failed to add message to the database");
  } catch (err) {
    next(err);
  }
};

module.exports.getRecentMessages = async (req, res, next) => {
  try {
    const ID = req.body.id;
    let recentMessages = await Messages.aggregate([
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
                profilePath: 1,
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
                profilePath: 1,
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
