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
await db.execute(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    message VARCHAR(250) NOT NULL
  )
`)