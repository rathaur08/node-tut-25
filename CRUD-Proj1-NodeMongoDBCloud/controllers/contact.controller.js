
export const getContactPage = async (req, res) => {
  try {
    return res.render("contact");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
}

export const postContactPage = async (req, res) => {

}