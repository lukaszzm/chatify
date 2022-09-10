const mongoose = require("mongoose");
const express = require("express");
const socket = require("socket.io");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const bodyParser = require("body-parser");

const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

const server = app.listen(port, () => console.log(`SERVER STARTED ON ${port}`));

const io = socket(server, {
  cors: {
    origin: '*',
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

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

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

app.use((err, res) => {
  if (err) {
    res.status(500).send("Something went wrong. Try again later.");
  }
  res.status(404).send("Not Found.");
});
