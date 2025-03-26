import z from "zod";


export const productSchema = z.object({
  product_name: z.string({ required_error: "Name is Required" })
    .trim()
    .min(3, { message: "Name must be at least 3 characters long." })
    .max(100, { message: "Name must be no more than 100 characters." }),
  product_value: z.coerce.number({ required_error: "Value is Required" })
    .int()
    .min(1, { message: "value must be at least 1 characters long." })
    .max(100, { message: "value must be no more than 100 characters." }),
})