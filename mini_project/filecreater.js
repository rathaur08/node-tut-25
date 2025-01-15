
import readline from "readline";
import fs from "fs";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const fileCreation = () => {
  rl.question("enter your filename:", (filename) => {
    rl.question("enter the content for your file : ", (content) => {
      fs.writeFile(`${filename}.txt`, content, (err) => {
        if (err) {
          console.error(`eror write the file: , ${err.message}`)
        } else {
          console.log(`File "${filename}.txt" created successfully! `)
        }
        rl.close()
      })
    })
  })
}

fileCreation();