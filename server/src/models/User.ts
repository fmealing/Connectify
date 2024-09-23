import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// 1. Define the TypeScript interface for the User Document
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  generateAuthToken(): string; // Method to generate JWT
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// 2. Create the User schema
const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// 3. Hash the password before saving the user
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 4. Method to compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to generate JWT
UserSchema.methods.generateAuthToken = function () {
  // Create a token with user id and email, valid for 1 hour
  const token = jwt.sign(
    { _id: this._id, email: this.email },
    process.env.JWT_SECRET as string, // Use JWT secret from .env
    {
      expiresIn: "1h",
    }
  );
  return token;
};

// 5. Export the User model
const User = mongoose.model<IUser>("User", UserSchema);
export default User;
