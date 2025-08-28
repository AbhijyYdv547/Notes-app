import bcryptjs from "bcryptjs"
import type { Request, Response } from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../model/User.js";
import { oauth2client } from "../utils/googleConfig.js";
import axios from "axios";
dotenv.config()

interface GoogleUser {
  email: string;
  name: string;
}

export const signupController = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ error: "All fields are required" });
            return;
        }

        const trimmedPassword = password.trim();
        const regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/;

        if (!regex.test(trimmedPassword)) {
            res.status(400).json({ message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.' });
            return;
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            if (existingUser.authProvider === 'google') {
                return res.status(409).json({ error: "Email already registered via Google. Please use Google Login." });
            }
            return res.status(409).json({ error: "Email already in use" });
        }


        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({
            message: "Register Successful",
            userId: user.id
        });

    } catch (e) {
        res.status(409).json({
            message: "User already exists with this username"
        })
    }
}

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: "Email and Password are required" });
      return;
    }
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    if (user.authProvider === 'google') {
      res.status(400).json({ error: "Account registered via Google. Use Google Login." });
      return;
    }


    const isMatch = await bcryptjs.compare(password, user.password || '');
    if (!isMatch) {
      res.status(401).json({ error: "Invalid credentials" });
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
        if (typeof userId !== "number") {
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
    return res.status(200).json({
      message: "Success",
      token,
      user
    })

  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error"
    })
  }
}