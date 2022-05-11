const MessageModel = require("./message.model");

class MessageController {
  async postMessage(req, res, next) {
    try {
      const newMessage = new MessageModel(req.body);
      const saveMessage = await newMessage.save();
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
