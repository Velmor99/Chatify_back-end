const ConversationModel = require("./conversation.model");

class ConversationController {
  async createConversation(req, res, next) {
    const newConversation = new ConversationModel({
      members: [req.body.senderId, req.body.receiverId],
    });

    try {
      const savedConversation = await newConversation.save();
      res.status(200).json(savedConversation);
    } catch (error) {
      next(error);
    }
  }

  async getConversation(req, res, next) {
    try {
      const conversation = await ConversationModel.find({
        members: { $in: [req.params.memberId] },
      });
      res.status(200).json(conversation)
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ConversationController();
