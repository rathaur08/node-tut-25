import Contact from "../models/contact.model.js";

export const saveContactData = async (contactData) => {
  console.log("contactData", contactData);
  return Contact.create(contactData);
};
