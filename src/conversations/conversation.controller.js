const ConversationModel = require("./conversation.model");
const UserModel = require("../users/user.model");

class ConversationController {
  async createConversation(req, res, next) {
    const sender = await UserModel.findById(req.body.senderId);
      const reciever = await UserModel.findById(req.body.receiverId);
    const newConversation = new ConversationModel({
      members: [{name: sender.username, email: sender.email, img: sender.img}, {name: reciever.username, email: reciever.email, img: reciever.img}],
    });
    try {
      //todo проверка на наличие уже существующего диалога
      const savedConversation = await newConversation.save();
      //todo проверка на наличие таких пользователей
      sender.conversations.push(savedConversation._id);
      reciever.conversations.push(savedConversation._id);
      sender.save();
      reciever.save();
      res.status(200).json(savedConversation);
    } catch (error) {
      next(error);
    }
  }

  async getConversation(req, res, next) {
    try {
      //todo пока что будет по email но в будущем должен быть token
      const user = await UserModel.findOne({email: req.params.email})
      const populated = await user.populate("conversations")
      // const conversation = await ConversationModel.find({
      //   members: { $in: [req.params.memberId] },
      // });
      // res.status(200).json(conversation);
      res.status(200).json(populated.conversations)
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ConversationController();
