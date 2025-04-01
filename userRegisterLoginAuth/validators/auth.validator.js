import z from "zod";


export const registerUserSchema = z.object({
  name: z.string().trim()
    .min(3, { message: "Name must be at least 3 characters long." })
    .max(100, { message: "Name must be no more than 100 characters." }),
  age: z.coerce.number().int(),
  email: z.string().trim().email().max(100),
  password: z.string().trim().min(3).max(100),
})

export const loginUserSchema = z.object({
  email: z.string().trim().email().max(100),
  password: z.string().trim().min(3).max(100),
})

export const verifyEmailSchema = z.object({
  token: z.string().trim().length(8),
  email: z.string().trim().email(),
})