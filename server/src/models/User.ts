import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

// Define the User interface for TypeScript
export interface IUser extends Document {
  fullName: string;
  email: string;
  username?: string;
  passwordHash?: string; // Optional for OAuth users
  profilePicture: string;
  bio: string;
  posts: mongoose.Types.ObjectId[];
  friends: mongoose.Types.ObjectId[];
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  googleId?: string; // Add Google ID for OAuth users
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Create the User schema
const UserSchema: Schema<IUser> = new Schema(
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
      unique: true,
      sparse: true, // Allows null/undefined values but ensures uniqueness
    },
    passwordHash: {
      type: String,
      required: function (this: IUser) {
        return !this.googleId; // Only require passwordHash for non-OAuth users
      },
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
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows null/undefined values but ensures uniqueness
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Hash the password before saving the user, only if it's a regular user with a password
UserSchema.pre<IUser>(
  "save",
  async function (next: mongoose.CallbackWithoutResultAndOptionalError) {
    if (!this.isModified("passwordHash") || !this.passwordHash) return next();

    try {
      const salt = await bcrypt.genSalt(10);
      this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
      next();
    } catch (error) {
      const err = error as Error;
      next(err);
    }
  }
);

// Method to compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.passwordHash) return false; // No password for OAuth users
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
