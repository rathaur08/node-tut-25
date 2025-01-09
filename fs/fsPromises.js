const fs = require('fs/promises');
const path = require('path');

const fileName = "fsPromises.txt";
const filepath = path.join(__dirname, fileName);


// syntext: fs.writeFile(path, data, options, callback)----
//  file data created anf .txt file :----
const writeFile = fs.writeFile(filepath, "This is the initial Data", "utf-8",)
  .then(console.log("File created succesfully!"))
  .catch((err) => console.error(err));

// file data read ------------------------
// const readFile = fs.readFile(filepath, "utf-8",)
//   .then((data) => console.log("File has been Readed -: ", data))
//   .catch((err) => console.error(err));


// update code -----------------------
// const appendFile = fs.appendFile(filepath, "\nThis is the initial Data Updated", "utf-8",)
//   .then(console.log("File has been Updeted"))
//   .catch((err) => console.error(err));

// Delete code -----------------------

// const deleteFile = fs.unlink(filepath)
//   .then(console.log("File has been Deleted"))
//   .catch((err) => console.error(err));

// check Folder Files Path ----------------

// const folderFilesPath = __dirname
// const pathFile = fs.readdir(folderFilesPath)
//   .then((data) => console.log(data))
//   .catch((err) => console.error(err));