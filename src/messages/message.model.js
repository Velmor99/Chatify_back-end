const {
  Schema,
  Types: { ObjectId },
} = require("mongoose");
const mongoose = require("mongoose");

const Message = new Schema(
  {
    //либо хранить тут IDconversation либо все месседжи будут храниться в conversation
    conversationId: {
      type: String,
    },
    senderName: {
      type: String,
    },
    senderEmail: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", Message);
