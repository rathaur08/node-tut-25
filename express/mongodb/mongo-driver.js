import { MongoClient } from "mongodb";

const client = new MongoClient("url-local");

await client.connect();

const db = client.db("mongodb_nodejs_db");
const userCollection = db.collection("users");

userCollection.insertOne({ name: "sunny", age: "24" })