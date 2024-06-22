import mongoose, { Document, Schema, Model } from "mongoose";

export interface ContactType {
  type: "email" | "phone";
  value: string;
}

export interface UserTypeDatabase extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  password: string;
  contact: ContactType;
}

export interface UserType {
  userId: string;
  firstName: string;
  lastName: string;
  password: string;
  contact: ContactType;
}
