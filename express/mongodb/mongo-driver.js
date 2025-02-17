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
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 10 },
  email: { type: String, required: true, unique: true },
  // createdAt: { type: Date, default: Date.now }, // Corrected default value
  // updatedAt: { type: Date, default: Date.now } // Corrected default value
},
  {
    timestamps: true
  }
);

// we will use middleware
// important Note Middleware use always Model Top
// Middleware must be defined before the model
// userSchema.pre(
//   ["updateOne", "updatemany", "findOneAndUpdate"],
//   function (next) {
//     this.set({ updatedAt: Date.now() });
//     next();
//   }
// );

// Model must be defined after middleware
const User = mongoose.model("User", userSchema);

// insert Single User Data Fun 
async function insertUser() {
  try {
    const newUser = new User({ name: "Varun", age: 25, email: "varun@gmail.com" });
    await newUser.save();
    console.log("User inserted successfully");
  } catch (error) {
    console.error("Error inserting user", error);
  }
}

// insert Many User Date Fun 
async function insertManyUsers() {
  try {
    const users = [
      { name: "Abhi", age: 29, email: "abhi@gmail.com" },
      { name: "Varun", age: 25, email: "varun@gmail.com" }
    ];
    await User.insertMany(users);
    console.log("Users inserted successfully");
  } catch (error) {
    console.error("Error inserting users", error);
  }
}

// Get User Data Func 
async function getUsers() {
  try {
    const users = await User.find();
    console.log("Users retrieved successfully", users);

    // Get one Data 
    // const findOneData = await User.findOne({ name: "Sunny" })
    // console.log("Users retrieved successfully", findOneData);
    // console.log(`Users ${findOneData.name} id :`, findOneData._id.toHexString());
  } catch (error) {
    console.error("Error retrieving users", error);
  }
}

// Update User Data Func 
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

// Delete User Data Func 
async function deleteUser(name) {
  try {
    // const deletedUser = await User.deleteOne({ name: name });
    // console.log("User deleted successfully", deletedUser);

    const deletedManyUser = await User.deleteMany({ name: name });
    console.log("User deleted successfully", deletedManyUser);
  } catch (error) {
    console.error("Error deleting user", error);
  }
}

(async () => {
  await connectDB();
  // await insertUser();
  // await insertManyUsers();
  // await getUsers();
  // await updateUser("Tarun", 28);
  // await deleteUser("Abhi");
  mongoose.connection.close();
})();