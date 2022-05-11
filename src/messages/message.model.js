const {
  Schema,
  Types: { ObjectId },
} = require("mongoose");
const mongoose = require("mongoose");

const Message = new Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
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
