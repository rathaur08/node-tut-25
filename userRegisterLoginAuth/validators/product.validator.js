import z from "zod";


export const productSchema = z.object({
  product_name: z.string({ required_error: "Product name is required" })
    .trim()
    .min(3, { message: "Product name must be at least 3 characters long." })
    .max(100, { message: "Product name must be no more than 100 characters." }),

  product_value: z.coerce.number({ required_error: "Product value is required" })
    .min(1, { message: "Product value must be at least 1." })
    .max(10000, { message: "Product value must be no more than 10,000." }),

  product_image: z.string({ required_error: "Product image is required" })
    .trim()
    .url({ message: "Product image must be a valid URL." })
    .max(500, { message: "Product image URL must be no more than 500 characters." }),
});


export const contactSchema = z.object({
  name: z.string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters long." })
    .max(100, { message: "Name must be no more than 100 characters." }),

  number: z.string({ required_error: "Number is required" })
    .trim()
    .min(10, { message: "Number must be at least 10 digits." })
    .max(15, { message: "Number must be no more than 15 digits." })
    .regex(/^[0-9]+$/, { message: "Number must contain digits only." }),

  email: z.string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Please enter a valid email address." })
    .max(100, { message: "Email must be no more than 100 characters." }),

  message: z.string({ required_error: "Message is required" })
    .trim()
    .min(3, { message: "Message must be at least 3 characters long." })
    .max(1000, { message: "Message must be no more than 1000 characters." }),
});

export const productSearchParamsSchema = z.object({
  page: z.coerce
    .number()
    .int()
    .positive()
    .min(1)
    .optional() // optional must come before default, otherwise default value won't be set.
    .default(1)
    .catch(1), // if validation error occurs, then it will choose 1. it is necessary, otherwise if validation fails then 500 will occur
});