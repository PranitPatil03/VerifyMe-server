import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Error, UserType } from "../services/types";
import { formatData } from "../services/formatData";

import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { sendOtpByMail } from "../services/mail";
import { generateOtp } from "../services/otp";
import { Otp } from "../models/Otp";

export const createUser = async (req: Request, res: Response) => {
  const date = new Date();
  try {
    const { firstName, lastName, password, email, phone } = req.body;

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
        email,
        phone,
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
    const { email, password } = req.body;

    const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }

    if (!SECRET_ACCESS_KEY) {
      throw new Error("JWT secret key not provided");
    }

    const accessToken = jwt.sign({ id: user.userId }, SECRET_ACCESS_KEY);

    return res.status(200).json({ User: formatData(user) });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};

export const sendOTP = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    let otp: string | undefined = await generateOtp();

    if (!otp) {
      throw new Error("Failed to generate OTP");
    }

    let updatedOtp = await Otp.findOneAndUpdate(
      { email },
      { otp },
      { new: true, upsert: true }
    );

    if (!updatedOtp) {
      updatedOtp = await new Otp({ email, otp }).save();
    }

    await sendOtpByMail(email, otp);

    console.log("OTP sent successfully to:", email);

    return res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (error: any) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { email, userOtp } = req.body;
  console.log("Line 112",email,userOtp)
  
  try {
    const otpRecord = await Otp.findOne({ email });

    console.log("Line 116",otpRecord)

    if (!otpRecord) {
      return res
        .status(404)
        .json({ error: "OTP record not found for the email" });
    }

    if (otpRecord.otp !== userOtp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    return res.status(200).json({ message: "OTP verified successfully" ,status:true});
  } catch (error: any) {
    console.error("Error verifying OTP:", error);
    return res
      .status(500)
      .json({ error: "Failed to verify OTP, Enter Correct OTP",status:false});
  }
};

export const changePassword = async (req: Request, res: Response)  => {
  const { email, current_password, new_password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(current_password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid current password' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(new_password, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });

  } catch (error:any) {
    console.error('Error changing password:', error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
