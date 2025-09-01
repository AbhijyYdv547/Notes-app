import mongoose from "mongoose";
import 'dotenv/config';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true, 
    } as any); 

    console.log("✅ Connected to MongoDB Atlas");
  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1); 
  }
};
