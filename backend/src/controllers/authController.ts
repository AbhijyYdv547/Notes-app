import type { Request, Response } from "express";
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { addMinutes, isBefore } from "date-fns";
import dotenv from "dotenv"
import User from "../model/User.js";
import { oauth2client } from "../utils/googleConfig.js";
import axios from "axios";
import Otp from "../model/Otp.js";
dotenv.config()

interface GoogleUser {
  email: string;
  name: string;
}

export const reqOtpController = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if ( !email ) {
            res.status(400).json({ error: "All fields are required" });
            return;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.authProvider === 'google') {
                res.status(409).json({ error: "Email already registered via Google. Please use Google Login." });
                return;
            }
        }
        const code = crypto.randomInt(100000, 999999).toString();
        const expiresAt = addMinutes(new Date(), 10);

        await Otp.create({ data: { email, code, expiresAt } });
        await sendOtpEmail(email, code).catch(() => {});
        res.status(201).json({
            message: "Otp sent if the email is vaild"
        });

    } catch (e) {
        res.status(409).json({
            message: "User already exists with this username"
        })
    }
}

export const verifyOtpController = async (req: Request, res: Response) => {
  try {
    const { email, code, name } = req.body;
    if (!email || !code ) {
      res.status(400).json({ error: "Email and otp are required" });
      return;
    }
    const record = await Otp.findOne({ 
        email:email,
        code:code,
        consumed:false
     });

if (!record  || !record.expiresAt || isBefore(record.expiresAt, new Date())){
    res.status(400).json({ message: "Invalid or expired OTP" });
    return
}

    let user = await User.findOne({email})
    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    if (user.authProvider === 'google') {
      res.status(400).json({ error: "Account registered via Google. Use Google Login." });
      return;
    }

await Otp.findByIdAndUpdate(record._id, { consumed: true });


    if (!process.env.JWT_SECRET) {
      res.status(500).json({ error: "JWT secret not set" })
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        })

        res.json({
            message: "Login Successful"
        })
    } catch (e) {
        res.status(500).json({ message: "Internal server error" });
    }

}

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


        const result = await User.findById({userId})

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


export const googleLogin = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    if (!code) {
      res.status(400).json({ error: "Missing code from Google" });
      return;
    }

    const { tokens } = await oauth2client.getToken(code);
    oauth2client.setCredentials(tokens);

    const userRes = await axios.get<GoogleUser>(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    )

    const { email, name } = userRes.data;

    if (!email || !name) {
      res.status(400).json({ error: "Email and Password are required" });
      return;
    }

    let user = await User.findOne({ email });
    
    if (!user) {
      user = await User.create({ name, email, authProvider: 'google' });
    }else if (user.authProvider === 'local') {
  res.status(400).json({ error: "This email is already registered with a password. Please use email/password login." });
  return;
}

    if (!process.env.JWT_SECRET) {
      res.status(500).json({ error: "JWT secret not set" })
      return;
    }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        })

        res.json({
            message: "Login Successful"
        })

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error"
    })
  }
}