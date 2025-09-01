import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1)
});

export const reqOtpSchema = z.object({
    email: z.email()
});


export const verifyOtpSchemaForSignup = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  code: z.string().length(6)
});

export const verifyOtpSchemaForLogin = z.object({
  email: z.string().email(),
  code: z.string().length(6)
});
