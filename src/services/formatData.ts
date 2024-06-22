import jwt from "jsonwebtoken";
import { UserType } from "./types";

export const formatData = (user: UserType) => {
  const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

  if (!SECRET_ACCESS_KEY) {
    throw new Error("JWT Secret is undefined.");
  }

  const accessToken = jwt.sign({ id: user.userId }, SECRET_ACCESS_KEY);

  return {
    accessToken,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  };
};
