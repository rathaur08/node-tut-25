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
    const newUser = new User({ name: "Abhi", age: 55 });
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

async function getUsers() {
  try {
    const users = await User.find();
    // console.log("Users retrieved successfully", users);

    // Get one Data 
    const findOneData = await User.findOne({ name: "Sunny" })
    console.log("Users retrieved successfully", findOneData);
    console.log(`Users ${findOneData.name} id :`, findOneData._id.toHexString());
  } catch (error) {
    console.error("Error retrieving users", error);
  }
}

async function updateUser(name, newAge) {
  try {
    const updatedOneUser = await User.updateOne(
      { name: name },
      { $set: { age: newAge } }
    );
    console.log("User updated successfully", updatedOneUser);

    // const updatedUser = await User.findOneAndUpdate(
    //   { name: name },
    //   { age: newAge },
    //   { new: true }
    // );
    // console.log("User updated successfully", updatedUser);
  } catch (error) {
    console.error("Error updating user", error);
  }
}

(async () => {
  await connectDB();
  // await insertUser();
  // await insertUsers();
  // await getUsers();
  await updateUser("Sunny", 99);
  mongoose.connection.close();
})();