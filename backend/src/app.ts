import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();

dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.REACT_APP_URL,
    credentials: true,
  }));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

// app.use(errorHandler)

const PORT = Number(process.env.PORT) || 3000; 
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
