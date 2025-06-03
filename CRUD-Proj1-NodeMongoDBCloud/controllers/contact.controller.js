import { getContactData, getIdByDeleteContact, saveContactData } from "../services/contact.service.js";

export const getContactPage = async (req, res) => {
  try {
    const contactData = await getContactData();
    return res.render("contact", { contactData });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
}

export const postContactPage = async (req, res) => {
  try {

    console.log("Contact Form Data", req.body);
    const { name, email, phone, message } = req.body;
    console.log("Contact Form", name, email, phone, message);

    await saveContactData({ name, email, phone, message });

    return res.redirect("/contact");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
}

export const deleteContactByIdPage = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id);
    await getIdByDeleteContact(id);

    return res.redirect("/contact");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
}