import { createUser, getUserByEmail } from "../services/auth.services.js";

export const getRegisterPage = (req, res) => {
  return res.render("auth/register")
};

// Handling User Registration in Express – Storing Data in Database
export const postRegister = async (req, res) => {
  // console.log(req.body);
  const { name, age, email, password } = req.body;

  const userExists = await getUserByEmail(email);
  console.log("userExists", userExists);

  if (userExists) return res.redirect("/register");

  const [user] = await createUser({ name, age, email, password })
  console.log("user", user);

  res.redirect("/login")
};

export const getLoginPage = (req, res) => {
  return res.render("auth/login")
};

export const postLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  console.log("user", user);

  if (!user) return res.redirect("/login");

  if (user.password !== password) return res.redirect("/login");

  res.cookie("isLoggedIn", true);
  res.redirect("/")
};