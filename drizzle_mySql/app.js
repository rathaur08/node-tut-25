import { db } from "./config/db.js";
import { usersTable } from "./drizzle/schema.js";

const main = async () => {
  // 1 insert
  // const insertUser = await db.insert(usersTable)
  //   .values({ name: "Sunny", age: "30", email: "sunny@gmail.com" })
  // console.log(" insertUser ", insertUser);

  // 2 insert Multi Users 
  const insertMultiUsers = await db.insert(usersTable)
    .values([
      { name: "Rahul", age: "78", email: "rahul@gmail.com" },
      { name: "Ravi", age: "34", email: "ravi@gmail.com" }
    ])
  console.log(" insertMultiUsers ", insertMultiUsers);


};

main().catch((err) => {
  console.log(err);
});