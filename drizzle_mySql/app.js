import { db } from "./config/db.js";
import { usersTable } from "./drizzle/schema.js";

const main = async () => {
  // 1 insert
  const insertUser = await db.insert(usersTable)
    .values({ name: "Sunny", age: "30", email: "sunny@gmail.com" })
  console.log(" insertUser ", insertUser);
};

main().catch((err) => {
  console.log(err);
});