const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

// import mongoose, { Schema } from "mongoose";
// import bcrypt from "bcrypt";

// Create the User schema
const UserSchema = new Schema(
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
      required: function (this) {
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
UserSchema.pre(
  "save",
  async function (next) {
    if (!this.isModified("passwordHash") || !this.passwordHash) return next();

    try {
      const salt = await bcrypt.genSalt(10);
      this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
      next();
    } catch (error) {
      next(error);
    }
  }
);

// Method to compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword
  ){
  if (!this.passwordHash) return false; // No password for OAuth users
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;

