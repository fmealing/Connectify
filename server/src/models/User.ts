import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

// Define the User interface for TypeScript
export interface IUser extends Document {
  fullName: string;
  email: string;
  username: string;
  passwordHash: string;
  profilePicture: string;
  bio: string;
  posts: mongoose.Types.ObjectId[];
  friends: mongoose.Types.ObjectId[];
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Create the User schema
const UserSchema: Schema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://storage.googleapis.com/connectify-images/1727796607846_default%20image.jpg",
    },
    bio: {
      type: String,
      default: "",
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Hash the password before saving the user
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const isMatch = await bcrypt.compare(candidatePassword, this.passwordHash);
  console.log("Password Comparison Result: ", isMatch); // Log comparison result
  return isMatch;
};

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
