import { saveContactData } from "../services/contact.service.js";

export const getContactPage = async (req, res) => {
  try {
    return res.render("contact");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
}

export const postContactPage = async (req, res) => {
  try {

    console.log("Contact Form Data", req.body);
    const { name, email, phone, message } = req.body;

    await saveContactData({ name, email, phone, message });

    return res.redirect("/contact");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
}