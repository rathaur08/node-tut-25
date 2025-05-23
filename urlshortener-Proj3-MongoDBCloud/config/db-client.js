import { MongoClient } from "mongodb";

const username = "sunnyrathaur2444";
const password = "nodetut25";
const dbName = "nodetut";

const connectionString = `mongodb+srv://${username}:${password}@cluster0.qygyy.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

export const dbClient = new MongoClient(connectionString);
