import z from "zod";

export const registerUserSchema = z.object({
  name: z.string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters long." })
    .max(100, { message: "Name must be no more than 100 characters." }),

  age: z.coerce.number({ required_error: "Age is required" })
    .int({ message: "Age must be a whole number." })
    .min(13, { message: "You must be at least 13 years old." })
    .max(120, { message: "Please enter a valid age." }),

  email: z.string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Please enter a valid email address." })
    .max(100, { message: "Email must be no more than 100 characters." }),

  password: z.string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password must be no more than 100 characters." }),
});

export const verifyUserSchema = z.object({
  name: z.string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters long." })
    .max(100, { message: "Name must be no more than 100 characters." }),
})

export const loginUserSchema = z.object({
  email: z.string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Please enter a valid email address." })
    .max(100, { message: "Email must be no more than 100 characters." }),

  password: z.string({ required_error: "Password is required" })
    .trim()
    .min(6, { message: "Password must be at least 6 characters long." })
    .max(100, { message: "Password must be no more than 100 characters." }),
})

export const verifyEmailSchema = z.object({
  token: z.string({ required_error: "Verification token is required" })
    .trim()
    .length(8, { message: "Token must be exactly 8 characters long." }),

  email: z.string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Please enter a valid email address." }),
});

export const verifyPasswordSchema = z.object({
  currentPassword: z.string({ required_error: "Current password is required." })
    .min(1, { message: "Current password cannot be empty." }),

  newPassword: z.string({ required_error: "New password is required." })
    .min(6, { message: "New password must be at least 6 characters long." })
    .max(100, { message: "New password must be no more than 100 characters." }),

  confirmPassword: z.string({ required_error: "Please confirm your new password." })
    .min(6, { message: "Confirm password must be at least 6 characters long." })
    .max(100, { message: "Confirm password must be no more than 100 characters." }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Targets the confirmPassword field
});

export const forgotPasswordSchema = z.object({
  email: z.string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Please enter a valid email address." }),
});