import mongoose, { Schema, Document } from "mongoose";

interface IConversation extends Document {
  participants: mongoose.Types.ObjectId[];
  lastMessage?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const ConversationSchema: Schema = new Schema(
  {
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

export default mongoose.model<IConversation>(
  "Conversation",
  ConversationSchema
);
