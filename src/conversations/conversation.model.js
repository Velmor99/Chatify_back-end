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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", Conversation);
