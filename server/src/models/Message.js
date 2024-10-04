const mongoose = require("mongoose");
const { Schema } = mongoose;

// import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema({
  conversation: { type: Schema.Types.ObjectId, ref: "Conversation" },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;
