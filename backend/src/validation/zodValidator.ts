import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1)
});

export const reqOtpSchema = z.object({
    email: z.email()
})

export const verifyOtpSchema = z.object({
    email: z.email(),
    code: z.string()
})