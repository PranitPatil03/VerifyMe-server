import { authenticator } from "otplib";

export const generateOtp = async () => {
  const secret = process.env.OTP_SECRET;

  if (!secret) {
    throw new Error("OTP Secret is required");
  }
  const token = authenticator.generate(secret);

  try {
    const isValid1 = authenticator.check(token, secret);
    const isValid2 = authenticator.verify({ token, secret });
    console.log("Line 14", isValid1);
    console.log("Line 15", isValid2);
    const numericToken = token.match(/\d+/g)?.join("");
    return numericToken
  } catch (error) {
    console.error(error);
  }
};
