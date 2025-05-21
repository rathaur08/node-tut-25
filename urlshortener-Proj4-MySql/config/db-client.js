import mysql from "mysql2/promise";
// import { env } from "./env.js";

//  1: to connect to mysql
export const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "nodejs_tut25",
})
console.log("MySQL Connected Successfully");

// Remark :- this code only one time work after code commentd
// await db.execute(`
//   CREATE TABLE short_links (
//     id int auto_increment primary key,
//     short_code varchar(100) not null unique,
//     url varchar(100) not null
//   )
// `)
