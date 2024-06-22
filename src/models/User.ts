import mongoose, { Document, Schema, Model } from "mongoose";
import { UserType, UserTypeDatabase } from "../services/types";

const ContactSchema: Schema = new Schema({
  type: {
    type: String,
    enum: ["email", "phone"],
    required: true,
  },
  value: {
    type: String,
    required: true,
    unique: true,
  },
});

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
  contact: {
    type: ContactSchema,
    required: true,
  },
});

export const User: Model<UserType> = mongoose.model<UserType>(
  "User",
  UserSchema
);
