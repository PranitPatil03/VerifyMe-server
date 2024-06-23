import express, { Request, Response } from "express";
import {
  changePassword,
  createUser,
  loginUser,
  sendOTP,
  verifyOTP,
} from "../controllers/auth";

export const authRouter = express.Router();

authRouter
  .post("/signup", createUser)
  .post("/login", loginUser)
  .post("/send-mail", sendOTP)
  .post("/verify-otp", verifyOTP)
  .post("/change-password", changePassword);
