import mongoose from "mongoose";

const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  code: { type: String }, 
  expiresAt: { type:Date },
  consumed: { type:Boolean, default:false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Otp", OtpSchema);
