import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

const Resume = mongoose.model("Note", NoteSchema);
export default Resume;
