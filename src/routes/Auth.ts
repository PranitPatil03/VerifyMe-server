import express, { Request, Response } from "express";
import { createUser, loginUser } from "../controllers/Auth";

export const authRouter = express.Router();

authRouter.post("/signup", createUser).post("/login", loginUser);
