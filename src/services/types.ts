import mongoose, { Document, Schema, Model } from "mongoose";

export interface UserTypeDatabase extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone?: string;
}

export interface UserType {
  userId: string;
  firstName: string;
  lastName: string;
  password:string,
  email: string;
  phone?: string;
}
