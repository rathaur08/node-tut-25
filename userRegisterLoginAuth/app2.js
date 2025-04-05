import { db } from "./config/db.js";
import { usersTable } from "./drizzle/schema.js";

const main = async () => {
  // 1 :- insert Data
  // User Registration in Express – Storing Data in Database
  // const insertUser = await db.insert(usersTable)
  //   .values({ name: "Sunny", age: "30", email: "sunny@gmail.com", password: "123" })
  // console.log(" insertUser ", insertUser);

};

main().catch((err) => {
  console.error(err);
});