import express, { Request, Response } from "express";
import { createUser, loginUser, sendOTP, verifyOTP,} from "../controllers/auth";

export const authRouter = express.Router();

authRouter
  .post("/signup", createUser)
  .post("/login", loginUser)
  .post("/sendmail", sendOTP)
  .post("/verifyotp",verifyOTP)
