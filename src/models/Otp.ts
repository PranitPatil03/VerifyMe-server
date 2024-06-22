import mongoose, { Document, Schema, Model } from "mongoose";
import { OtpTypeDatabase } from "../services/types";

const OtpSchema: Schema<OtpTypeDatabase> = new Schema<OtpTypeDatabase>(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
    },
  }
);

export const Otp: Model<OtpTypeDatabase> = mongoose.model<OtpTypeDatabase>(
  "Otp",
  OtpSchema
);
