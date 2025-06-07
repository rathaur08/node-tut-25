import Contact from "../models/contact.model.js";
import { ObjectId } from "mongodb";

export const saveContactData = async (contactData) => {
  console.log("contactData", contactData);
  return Contact.create(contactData);
};

export const getContactData = async () => {
  return Contact.find();
}

export const getIdByDeleteContact = async (id) => {
  // console.log("id: ", id);
  return Contact.deleteOne({ _id: new ObjectId(id) });
}