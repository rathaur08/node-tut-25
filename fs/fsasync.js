const fs = require('fs');
const path = require('path');

const fileName = "fsAsycn.txt";
const filepath = path.join(__dirname, fileName);


// syntext: fs.writeFile(path, data, options, callback)----
//  file data creata anf .txt file :----
// const writeFile = fs.writeFile(
//   filepath, "This is the initial Data", "utf-8",
//   (err) => {
//     if (err) console.error(err);
//     else console.log("File has been Created & Saved");
//   }
// );
// console.log(writeFile);


// file data read ------------------------

// const readFile = fs.readFile(filepath, "utf-8",
//   (err, data) => {
//     if (err) console.error(err);
//     else console.log("File has been Readed -: ", data);
//   });
// console.log(readFile.toString());
// console.log(readFile);

// update code -----------------------

// const appendFile = fs.appendFile(
//   filepath, "\nThis is the initial Data", "utf-8",
//   (err, data) => {
//     if (err) console.error(err);
//     else console.log("File has been Updated -: ", data);
//   });
// console.log(appendFile);

// Delete code -----------------------
// const deleteFile = fs.unlink(filepath,
//   (err) => {
//     if (err) console.error(err);
//     else console.log("File has been Deleted");
//   });
// console.log(deleteFile);