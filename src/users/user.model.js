const {
  Schema,
  Types: { ObjectId },
} = require("mongoose");
const mongoose = require("mongoose");
const user = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String | Number,
    required: false,
  },
  img: {
    type: String,
    default: "",
  },
  privacy: {
    type: String,
    enum: ["public", "private"],
    // required: true,
    default: "public",
  },
  theme: {
    type: String,
    enum: ["dark", "light"],
    required: true,
    default: "light",
  },
  conversations: [{type: Object, ref: "Conversation"}],
  token: String,
});

module.exports = mongoose.model("User", user);
