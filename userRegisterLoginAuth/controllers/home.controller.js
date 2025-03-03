
export const getHome = (req, res) => {

  let isLoggedIn = req.headers.cookie;
  isLoggedIn = Boolean(isLoggedIn?.split("=")[1]);
  console.log("isLoggedIn:", isLoggedIn);

  return res.render("index", { isLoggedIn })
};

export const getContact = (req, res) => {
  return res.render("Contact")
};