// Validate Environment Variables in Express.js Using Zod

// 1
// export const PORT = isNaN(process.env.PORT) ? 3000 : 
// parseInt(process.env.PORT);

// 2
import { ZodError, z } from "zod";

const ageSchema = z.number().min(18).max(100).int();

const userAge = 50;

// 2.1
const parseUserAge = ageSchema.parse(userAge);
console.log(parseUserAge);

// 2.2
// const { data, error, success } = ageSchema.safeParse(userAge);
// console.log(data);

// 2.3
// try {
//   const parseUserAge = ageSchema.parse(userAge);
//   console.log(parseUserAge);
// } catch (error) {
//   if (error instanceof ZodError) {
//     console.log(error.issues[0].message)
//   } else {
//     console.log("Unexpected error", error)
//   }
// }
