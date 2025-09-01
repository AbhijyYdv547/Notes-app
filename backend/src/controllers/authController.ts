import type { Request, Response } from "express";
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { addMinutes, isBefore } from "date-fns";
import dotenv from "dotenv"
import User from "../model/User.js";
import Otp from "../model/Otp.js";
import { reqOtpSchema, verifyOtpSchema } from "../validation/zodValidator.js";
import { sendOtpEmail } from "../services/otp.js";
dotenv.config()

interface GoogleUser {
  email: string;
  name: string;
}

export const signupRequestOtpController = async (req: Request, res: Response) => {
  try {
    const parsed = reqOtpSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid input" });

    const { email, name } = parsed.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists. Please login." });
    }

    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = addMinutes(new Date(), 10);

    await Otp.create({ email, code, expiresAt, consumed: false });
    await sendOtpEmail(email, code).catch(() => {});

    return res.status(201).json({ message: "OTP sent for signup" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Signup: Verify OTP and create user
export const signupVerifyOtpController = async (req: Request, res: Response) => {
  try {
    const parsed = verifyOtpSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid input" });

    const { email, code, name } = parsed.data;

    const record = await Otp.findOne({ email, code, consumed: false });
    if (!record || !record.expiresAt || isBefore(record.expiresAt, new Date())) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "User already exists" });

    // Mark OTP as consumed
    await Otp.findByIdAndUpdate(record._id, { consumed: true });

    // Create user
    const user = await User.create({
      email,
      name,
      authProvider: "otp"
    });

    // Generate JWT
    if (!process.env.JWT_SECRET) return res.status(500).json({ message: "JWT secret not set" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000
    });

    return res.json({ message: "Signup successful", user: { id: user._id, name: user.name } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Login: Request OTP
export const loginRequestOtpController = async (req: Request, res: Response) => {
  try {
    const parsed = reqOtpSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid input" });

    const { email } = parsed.data;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found. Please signup." });

    const code = crypto.randomInt(100000, 999999).toString();
    const expiresAt = addMinutes(new Date(), 10);

    await Otp.create({ email, code, expiresAt, consumed: false });
    await sendOtpEmail(email, code).catch(() => {});

    return res.status(201).json({ message: "OTP sent for login" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Login: Verify OTP
export const loginVerifyOtpController = async (req: Request, res: Response) => {
  try {
    const parsed = verifyOtpSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid input" });

    const { email, code } = parsed.data;

    const record = await Otp.findOne({ email, code, consumed: false });
    if (!record || !record.expiresAt || isBefore(record.expiresAt, new Date())) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    await Otp.findByIdAndUpdate(record._id, { consumed: true });

    if (!process.env.JWT_SECRET) return res.status(500).json({ message: "JWT secret not set" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 1000
    });

    return res.json({ message: "Login successful", user: { id: user._id, name: user.name } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const logoutController = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  res.json({ message: "Logged out" });
}

export const myInfoController = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }


    const result = await User.findById(userId)

    if (!result) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({
      user: {
        id: result.id,
        name: result?.name
      }
    })
  } catch (e) {
    console.error("myInfoController error:", e);
    res.status(500).json({ message: "Internal server error" });
  }
}

