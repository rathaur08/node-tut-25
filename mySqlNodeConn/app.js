import mysql from "mysql2/promise";


//  1: to connect to mysql
const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password@123",
  database: "nodetut25",
})
console.log("MySQL Connected Successfully");

//  2: we need to create a db

// run this query only one time after comment
// await db.execute(`create database nodetut25`)

// console.log(await db.execute("show databases"))


//  3: then we to create a table

// await db.execute(`
//   CREATE TABLE users (
//     id int auto_increment primary key,
//     username varchar(100) not null,
//     email varchar(100) not null unique
//   )
// `)