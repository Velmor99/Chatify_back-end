const express = require("express");
// const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./users/user.router");
const conversationRouter = require("./conversations/conversation.router");
const messageRouter = require('./messages/message.router')
const PORT = process.env.PORT || 4040;
const MONGODB_URL = process.env.MONGODB_URL;

module.exports = class ServerAPI {
  constructor() {
    this.server = null;
    this.httpServer = null;
    this.io = null;
  }

  start() {
    this.initServer();
    this.initMiddlewares();
    this.initRoutes();
    this.initDataBase();
    this.startListen();
  }

  initServer() {
    this.server = express();
    //
    this.httpServer = http.createServer(this.server);
    this.io = new Server(this.httpServer, {
      cors: {
        origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002"],
        methods: ["GET", "POST"],
      },
    });
  }

  initMiddlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  initRoutes() {
    this.server.use("/api/auth", userRouter);
    this.server.use("/api/conversation", conversationRouter);
    this.server.use("/api/message", messageRouter)
  }

  async initDataBase() {
    try {
      const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
      mongoose.connect(MONGODB_URL, opts);
      console.log("DB Connected");
    } catch (err) {
      if (err) {
        console.log("Connection with error");
        process.exit(1);
      }
    }
  }

  startListen() {
    this.io.on("connection", (socket) => {
      console.log(`User Connected: ${socket.id}`);

      socket.on("join_room", (data) => {
        socket.join(JSON.parse(data.room));
      });

      socket.on("send_message", (data) => {
        socket.broadcast.emit("receive_message", data)
        socket.emit("receive_message", data)
      });
    });
    //
    this.httpServer.listen(PORT, () => {
      console.log("Server started listening on port", PORT);
    });
  }
};
