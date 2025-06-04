import { ObjectId } from "mongodb";
import { dbClient } from "../config/db-client.js";

const db = dbClient.db(process.env.MONGODB_DATABASE_NAME);
const contactCollection = db.collection("contacts");

export const saveContactData = async (contactData) => {
  console.log("contactData", contactData);
  return contactCollection.insertOne(contactData);
};

export const getContactData = async () => {
  return contactCollection.find().toArray();
}

export const getIdByContactData = async (id) => {
  return contactCollection.findOne({ _id: new ObjectId(id) });
}

export const getIdByUpdateContact = async ({ id, name, email, phone, message }) => {
  return contactCollection.updateOne(
    { _id: new ObjectId(id) }, // Filter by _id (don't try to set it)
    {
      $set: {
        name,
        email,
        phone,
        message
      }
    }
  );
}

export const getIdByDeleteContact = async (id) => {
  // console.log("id: ", id);
  return contactCollection.deleteOne({ _id: new ObjectId(id) });
}