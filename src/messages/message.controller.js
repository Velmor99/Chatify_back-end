const MessageModel = require("./message.model");
const ConversationModel = require("../conversations/conversation.model");
// const io = require("socket.io")

class MessageController {
  // async connectToRoom(req, res, next) {
  //   try {

  //     io(4040, {
  //       cors: {
  //         origin: "http://localhost:3000",
  //         methods: ["GET", "POST"],
  //       },
  //     });

  //     io.on("connection", (socket) => {
  //       console.log(socket.id)
  //       io.emit("welcome")
  //  })

  //   } catch (error) {

  //   }
  // }

  async postMessage(req, res, next) {
    try {
      const newMessage = new MessageModel(req.body);
      const saveMessage = await newMessage.save();
      const conversation = await ConversationModel.findById(
        req.body.conversationId
      );
      //todo проверка на наличие диалога
      console.log(conversation)
      conversation.lastMessage = req.body.text;
      conversation.messages.push(saveMessage._id)
      conversation.save();
      res.status(200).json(saveMessage);
    } catch (error) {
      next(error);
    }
  }

  async getMessagesOfConversation(req, res, next) {
    try {
      const messages = await MessageModel.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MessageController();
