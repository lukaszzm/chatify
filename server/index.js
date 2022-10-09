const mongoose = require("mongoose");
const express = require("express");
const socket = require("socket.io");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const noteRoutes = require("./routes/notes");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(port, () => console.log(`SERVER STARTED ON ${port}`));

const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const mongoDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@chatify.5xwhr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => console.log(err));

app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notes", noteRoutes)

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;

  socket.on("add-user", (userID) => {
    onlineUsers.set(userID, socket.id);
  });

  socket.on("send-message", (data) => {
    const sendUserToken = onlineUsers.get(data.toId);
    if (sendUserToken !== undefined) {
      socket.to(sendUserToken).emit("receive-message", data);
    }
  });
});

app.use(( err, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, (err) => {
      return;
    })
  }
  if (err) {
    console.log(err);
    return res.status(500).send(err.message || "Something went wrong. Try again later.");
  }
  return res.status(404).send("Not Found.");
});
