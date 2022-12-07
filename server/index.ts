import mongoose, { ConnectOptions } from "mongoose";
import express, { NextFunction, Request, Response } from "express";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import { messagesRouter, authRouter, notesRouter } from "./routes";
import { IMessage } from "./interfaces/IMessage.interface";

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(port, () => console.log(`SERVER STARTED ON ${port}`));

const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@chatify.5xwhr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => console.log(err));

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use("/api/auth", authRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/notes", notesRouter);

interface ServerToClientEvents {
  "receive-message": (message: IMessage) => void;
}

interface ClientToServerEvents {
  "send-message": (message: IMessage) => void;
  "add-user": (userID: string) => void;
}

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userID) => {
    global.onlineUsers.set(userID, socket.id);
  });

  socket.on("send-message", (data) => {
    const sendUserToken = global.onlineUsers.get(data.toId);
    if (!sendUserToken) socket.to(sendUserToken).emit("receive-message", data);
  });
});

app.use((err: TypeError, req: Request, res: Response, next: NextFunction) => {
  if (req.file) {
    fs.unlink(req.file.path, () => {
      return;
    });
  }
  if (err) {
    return res
      .status(500)
      .send(err.message || "Something went wrong. Try again later.");
  }
  return res.status(404).send("Not Found.");
});
