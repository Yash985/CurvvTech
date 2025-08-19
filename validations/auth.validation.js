import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be aleast 6 characters"),
  role: z.string(),
});

export const LoginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string(),
});
