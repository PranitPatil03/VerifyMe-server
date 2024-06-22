import mongoose, { Document, Schema, Model } from "mongoose";
import { UserTypeDatabase } from "../services/types";

const UserSchema: Schema<UserTypeDatabase> = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
  },
});

export const User: Model<UserTypeDatabase> = mongoose.model<UserTypeDatabase>(
  "User",
  UserSchema
);
