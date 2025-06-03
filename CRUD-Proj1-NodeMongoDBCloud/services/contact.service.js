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
  return contactCollection.findOne({ id });
}

export const getIdByUpdateContact = async () => {

}

export const getIdByDeleteContact = async () => {
  return contactCollection.findOneAndDelete({ id });
}