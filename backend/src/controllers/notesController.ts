import Resume from "../model/Note.js";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Note from "../model/Note.js";


dotenv.config();


export const createController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title,body } = req.body;
    const note = await Note.create({
        title: title,
        body: body,
        user: req.userId
    })

    res.status(200).json(note);
    return;
  } catch (error:any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
    return;
  }
};


export const getController = async (req: Request, res: Response) => {
  try {
    const notes = await Note.find({ userId: req.userId });
    res.json(notes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}


export const getSpecificController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // @ts-ignore
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid resume ID" });
      return;
    }
    const resume = await Resume.findOne({ _id: id, userId: req.userId });
    if (!resume) {
      res.status(404).json({ error: "Resume not found" });
      return;
    }
    res.json(resume);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}


export const delController = async (req: Request, res: Response) => {
  try {

    const deleted = await Resume.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!deleted) {
      res.status(404).json({ error: "Resume not found" });
      return;
    }
    res.json({ message: "Resume deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}