import { dbClient } from "../config/db-client.js";

const db = dbClient.db(process.env.MONGODB_DATABASE_NAME);
const contactCollection = db.collection("contacts");
//
export const saveContactData = async (contactData) => {
  console.log("contactData", contactData);
  return contactCollection.insertOne(contactData);
};


// OLD COLDE

// import { dbClient } from "../config/db-client.js";
// import { env } from "../config/env.js";

// const db = dbClient.db(process.env.MONGODB_DATABASE_NAME);
// const shortenerCollection = db.collection("shorterers");

// export const loadLinks = async () => {
//   return shortenerCollection.find().toArray();
// }

// export const saveLinks = async (links) => {
//   return shortenerCollection.insertOne(links)
// };


// export const getLinkByShortCode = async (shortCode) => {
//   return await shortenerCollection.findOne({ shortCode })
// }
