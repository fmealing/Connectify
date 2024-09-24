import mongoose, { Schema, Document } from "mongoose";

// Interface for Post Document
export interface IPost extends Document {
  user: mongoose.Types.ObjectId;
  image: string;
  content: string;
  hashtags: string[];
}

// Post Schema
const PostSchema: Schema = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    image: { type: String, required: true },
    content: { type: String, required: true },
    hashtags: { type: [String], required: false },
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>("Post", PostSchema);
export default Post;
