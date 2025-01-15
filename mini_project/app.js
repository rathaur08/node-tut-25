import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const todos = [];

const showMenu = () => {
  console.log("\n1: add a Task");
  console.log("2: View Tasks");
  console.log("3: Exit");
  rl.question("choose an options:", handleInput)
}

const handleInput = (option) => {

  if (option === "1") {
    rl.question("Enter the task : ", (task) => {
      todos.push(task);
      console.log("Task added : ", task);
      showMenu();
    })
  } else if (option === "2") {
    console.log("\n your todo list: ");
    todos.forEach((task, index) => {
      console.log(`${index + 1}. ${task}`);
    })
    showMenu();
  } else if (option === "3") {
    console.log("good byee.");
    rl.close();
  } else {
    console.log("Invalid Option. please Try again");
    showMenu();
  }
}

showMenu();