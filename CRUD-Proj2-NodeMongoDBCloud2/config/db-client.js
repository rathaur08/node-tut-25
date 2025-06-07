import mongoose from "mongoose";

const username = "sunnyrathaur2444";
const password = "nodetut25";
const dbName = "nodetut";

const connectionString = `mongodb+srv://${username}:${password}@cluster0.qygyy.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

export const connectDB = async () => {
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