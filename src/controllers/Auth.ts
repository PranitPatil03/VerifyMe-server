import bcrypt from "bcrypt";
import { User } from "../models/User";
import { UserType } from "../services/types";
import { formatData } from "../services/formatData";

import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (req: Request, res: Response) => {
  const date = new Date();
  try {
    const { firstName, lastName, password, contact } = req.body;

    bcrypt.hash(password, 10, async (err, hashed_password) => {
      if (err) {
        return res.status(500).json({ error: "Error hashing password" });
      }

      const userId = `${uuidv4()}-${date.getTime()}`;

      const user: UserType = {
        userId,
        firstName,
        lastName,
        password: hashed_password,
        contact: contact,
      };

      const newUser = new User(user);

      newUser.save().then((user) => {
        return res.status(200).json({ User: formatData(user) });
      });
    });
  } catch (err: any) {
    if (err.code == 11000) {
      return res.status(500).json({ error: "This email already exits" });
    }

    return res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
  } catch (err) {}
};
