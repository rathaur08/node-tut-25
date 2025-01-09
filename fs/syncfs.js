const fs = require('fs');
const path = require('path');

const fileName = "text.txt";
const filepath = path.join(__dirname, fileName);

//  file data creata anf .txt file
// const writeFile = fs.writeFileSync(
//   filepath, "This is the initial Data", "utf-8"
// );
// console.log(writeFile);


// file data read ------------------------

// const readFile = fs.readFileSync(filepath, "utf-8");
// console.log(readFile.toString());
// console.log(readFile);

// update code -----------------------

// const appendFile = fs.appendFileSync(
//   filepath, "\nThis is the initial Data", "utf-8"
// );
// console.log(appendFile);

// Delete code -----------------------
// const deleteFile = fs.unlinkSync(filepath);
// console.log(deleteFile);

// Update FIle Nane code -----------------------

// const newUpdatedFileName = "updateText.txt";
// const newFilePath = path.join(__dirname, newUpdatedFileName)
// const renameFile = fs.renameSync(filepath, newFilePath);
// console.log(renameFile);