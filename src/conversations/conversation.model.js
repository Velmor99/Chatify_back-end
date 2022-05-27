const {
  Schema,
  Types: { ObjectId },
} = require("mongoose");
const mongoose = require("mongoose");

const Conversation = new Schema(
  {
    members: {
      type: Array,
    },
    //todo либо хранить тут id либо искать по IDconversation и сортировать по дате
    messages: [{ type: ObjectId, ref: "Messages"}],
    lastMessage: { type: String, default: "" },
    isRead: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", Conversation);
