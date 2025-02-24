import { db } from "./config/db.js";
import { eq } from 'drizzle-orm';
import { usersTable } from "./drizzle/schema.js";


const main = async () => {
  // 1 insert
  // const insertUser = await db.insert(usersTable)
  //   .values({ name: "Sunny", age: "30", email: "sunny@gmail.com" })
  // console.log(" insertUser ", insertUser);

  // 2 insert Multi Users 
  // const insertMultiUsers = await db.insert(usersTable)
  //   .values([
  //     { name: "Rahul", age: "78", email: "rahul@gmail.com" },
  //     { name: "Ravi", age: "34", email: "ravi@gmail.com" }
  //   ])
  // console.log(" insertMultiUsers ", insertMultiUsers);

  // 3  Read User Data
  // const readUsers = await db.select().from(usersTable);
  // console.log(" readUsers ", readUsers);

  // 4  Read Data Using Filter usersTable 
  // const readFilterUsers = await db.select().from(usersTable).where({ name: "Sunny" });
  // const readFilterUsers1 = await db.select().from(usersTable).where({ email: "sunny@gmail.com" });
  // console.log(" readFilterUsers ", readFilterUsers);
  // console.log(" readFilterUsers1 ", readFilterUsers1);

  // 
  // 4  Update usersTable Data
  // const updateUser = await db.update(usersTable).set({ age: "24" }).where({ name: "Sunny" });
  // console.log(" updateUser ", updateUser);

  // 5  2-Method Update usersTable Data 
  const updateUser2 = await db.update(usersTable).set({ age: "25" }).where(eq(usersTable.email, "sunny@gmail.com"));
  console.log(" updateUser2 ", updateUser2);

};

main().catch((err) => {
  console.log(err);
});