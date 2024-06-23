import { authenticator } from "otplib";

export const generateOtp = async () => {
  const secret = process.env.OTP_SECRET;

  if (!secret) {
    throw new Error("OTP Secret is required");
  }
  const token = authenticator.generate(secret);

  try {
    const numericToken = token.match(/\d+/g)?.join("");
    return numericToken
  } catch (error) {
    console.error(error);
  }
};
