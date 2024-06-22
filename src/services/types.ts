import mongoose, { Document} from "mongoose";

export interface Error {
  status?: number;
  message?: string;
}
export interface UserTypeDatabase extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone?: string;
}

export interface OtpTypeDatabase extends Document{
  email:string,
  otp:string,
}
export interface UserType {
  userId: string;
  firstName: string;
  lastName: string;
  password:string,
  email: string;
  phone?: string;
}
