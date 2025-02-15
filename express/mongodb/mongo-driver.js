import mongoose from "mongoose";

const username = "sunnyrathaur2444";
const password = "nodetut25";
const dbName = "nodetut";

const connectionString = `mongodb+srv://${username}:${password}@cluster0.qygyy.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

async function connectDB() {
  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
}

const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const User = mongoose.model("User", userSchema);

// insert User One Code 
async function insertUser() {
  try {
    const newUser = new User({ name: "Rahul", age: 22 });
    await newUser.save();
    console.log("User inserted successfully");
  } catch (error) {
    console.error("Error inserting user", error);
  }
}

// insert User Many Code 
async function insertUsers() {
  try {
    const users = [
      { name: "Ravi", age: 20 },
      { name: "Harsh", age: 27 }
    ];
    await User.insertMany(users);
    console.log("Users inserted successfully");
  } catch (error) {
    console.error("Error inserting users", error);
  }
}


(async () => {
  await connectDB();
  // await insertUser();
  await insertUsers();
  mongoose.connection.close();
})();