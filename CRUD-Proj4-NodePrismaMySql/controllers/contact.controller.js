import { getContactData, getIdByContactData, getIdByDeleteContact, getIdByUpdateContact, saveContactData } from "../services/contact.service.js";

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

// getEditContactPage
export const getEditContactPage = async (req, res) => {

  try {
    const id = req.params.id;

    const contact = await getIdByContactData(id);

    if (!contact) {
      return res.status(404).send("Contact not found");
    }
    // console.log("getEditContactPage", contact);

    res.render("editContact", {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.message
    });

  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error")
  }
}

// postEditContectPage
export const postEditContectPage = async (req, res) => {
  const id = req.params.id;

  try {
    const { name, email, phone, message } = req.body;

    const newUpdatedContactData = await getIdByUpdateContact({ id, name, email, phone, message });

    if (!newUpdatedContactData) return res.redirect("/404");

    res.redirect("/contact");

  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error")
  }
}