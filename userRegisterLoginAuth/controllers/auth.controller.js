import { ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_EXPIRY } from "../config/constants.js";
import { getHtmlFromMjmlTemplate } from "../lib/get-html-from-mjml-template.js";
import { sendEmail } from "../lib/send-email.js";
import {
  createUser, getUserByEmail, hashPassword, comparePassword,
  //  generateToken
  createSession, createAccessToken, createRefreshToken,
  clearUserSession,
  authenticateUser,
  findUserById,
  generateRandomToken,
  insertVerifyEmailToken,
  createVerifyEmailLink,
  findVerificationEmailToken,
  verifyUserEmailAndUpdate,
  clearVerifyEmailToken,
  sendNewVerifyEmailLink,
  updateUserByName,
  updateUserPassword,
  findUserByEmail,
  createResetPasswordLink,
  getResetPasswordToken,
  clearResetPasswordToken
} from "../services/auth.services.js";
import { getAllProductData } from "../services/product.services.js";
import { forgotPasswordSchema, loginUserSchema, registerUserSchema, verifyEmailSchema, verifyPasswordSchema, verifyResetPasswordSchema, verifyUserSchema } from "../validators/auth.validator.js";

export const getRegisterPage = (req, res) => {
  if (req.user) return res.redirect("/");

  return res.render("auth/register", { errors: req.flash("errors") })
};

// Handling User Registration in Express – Storing Data in Database
export const postRegister = async (req, res) => {
  if (req.user) return res.redirect("/");

  // console.log(req.body);
  // const { name, age, email, password } = req.body;

  const { data, error } = registerUserSchema.safeParse(req.body);
  // console.log(data);

  if (error) {
    const errors = error.errors[0].message;
    req.flash("errors", errors);
    console.error("error", error);
    res.redirect("/register");
  }

  const { name, age, email, password } = data;

  const userExists = await getUserByEmail(email);
  // console.log("userExists", userExists);

  // if (userExists) return res.redirect("/register");
  if (userExists) {
    req.flash("errors", "User already exists.");
    return res.redirect("/register");
  }

  const hashedPassword = await hashPassword(password);

  const [user] = await createUser({ name, age, email, password: hashedPassword })
  // console.log("user", user);

  // write a code Users Logged In After Registration 
  await authenticateUser({ req, res, user, name, email })

  await sendNewVerifyEmailLink({ email, userId: user.id });

  res.redirect("/")
};

export const getLoginPage = (req, res) => {
  if (req.user) return res.redirect("/");

  return res.render("auth/login", { errors: req.flash("errors") })
};

export const postLogin = async (req, res) => {
  if (req.user) return res.redirect("/");

  // const { email, password } = req.body;

  const { data, error } = loginUserSchema.safeParse(req.body);
  // console.log(data);

  if (error) {
    const errors = error.errors[0].message;
    req.flash("errors", errors);
    // console.error("error", error);
    res.redirect("/login");
  }

  const { email, password } = data;

  const user = await getUserByEmail(email);
  // console.log("user", user);

  // if (!user) return res.redirect("/login");
  if (!user) {
    req.flash("errors", "Invalid Email OR Password");
    return res.redirect("/login");
  }

  const isPasswordValid = await comparePassword(password, user.password);

  // if (user.password !== password) return res.redirect("/login");
  // if (!isPasswordValid) return res.redirect("/login");
  if (!isPasswordValid) {
    req.flash("errors", "Invalid Email OR Password");
    return res.redirect("/login");
  }

  // res.cookie("isLoggedIn", true);
  // const token = generateToken({
  //   id: user.id,
  //   name: user.name,
  //   email: user.email,
  // });

  // res.cookie("access_token", token);

  // we need to create a sessions
  await authenticateUser({ req, res, user })

  res.redirect("/")
};

// Do You Need to Set Path=/ Manually?
//    ✅ cookie-parser and Express automatically set the path to / by default.

// getProfilePage
// profile
export const getProfilePage = async (req, res) => {
  // if (!req.user) return res.send("Not logged in");
  // return res.send(`<h1>Hey ${req.user.name} - ${req.user.email}</h1>`);

  if (!req.user) return res.send("Not logged in");;

  const user = await findUserById(req.user.id);
  if (!user) return res.redirect("/login");

  const userProducts = await getAllProductData(user.id);

  return res.render("auth/Profile", {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      isEmailValid: user.isEmailValid,
      createdAt: user.createdAt,
      products: userProducts,
    }
  })
};

// getEditProfilePage
export const getEditProfilePage = async (req, res) => {

  if (!req.user) return res.redirect("/");

  const user = await findUserById(req.user.id);

  if (!user) return res.status(404).send("User Not Found");

  return res.render("auth/editProfile", {
    name: user.name,
    errors: req.flash("errors"),
  })

}

// postEditProfilePage
export const postEditProfilePage = async (req, res) => {

  if (!req.user) return res.redirect("/");

  // const user = req.body;
  const { data, error } = verifyUserSchema.safeParse(req.body);

  if (error) {
    const errorMessages = error.errors.map((err) => err.message);
    req.flash("errors", errorMessages);
    console.error("error", errorMessages);
    res.redirect("/edit-profile");
  }

  await updateUserByName({ userId: req.user.id, name: data.name })

  return res.redirect("/profile");

}

// getChangePasswordPage
export const getChangePasswordPage = async (req, res) => {

  if (!req.user) return res.redirect("/");

  return res.render("auth/changePassword", {
    errors: req.flash("errors"),
  })

};

// postChangePasswordPage
export const postChangePasswordPage = async (req, res) => {

  if (!req.user) return res.redirect("/");
  const { data, error } = verifyPasswordSchema.safeParse(req.body);

  if (error) {
    const errorMessages = error.errors.map((err) => err.message);
    req.flash("errors", errorMessages);
    console.error("error", errorMessages);
    res.redirect("/change-password");
  }

  const { currentPassword, newPassword } = data;

  const user = await findUserById(req.user.id);
  if (!user) return res.status(404).send("User Not Found");

  const isPasswordValid = await comparePassword(currentPassword, user.password);
  if (!isPasswordValid) {
    req.flash("errors", "Currunt Password that you entered is invalid");
    return res.redirect("/change-password");
  }

  await updateUserPassword({ newPassword, userId: user.id })

  return res.redirect("/profile");

}

// getResetPasswordPage
export const getResetPasswordPage = async (req, res) => {

  return res.render("auth/forgetPassword", {
    formSubmitted: req.flash("formSubmitted")[0],
    errors: req.flash("errors"),
  })

}

// postForgotPasswordPage
export const postForgotPasswordPage = async (req, res) => {

  const { data, error } = forgotPasswordSchema.safeParse(req.body);

  if (error) {
    const errorMessages = error.errors.map((err) => err.message);
    req.flash("errors", errorMessages[0]);
    console.error("error", errorMessages);
    return res.redirect("/reset-password");
  }

  const user = await findUserByEmail(data.email);

  if (!user) {
    req.flash("errors", "Invalid Email");
    return res.redirect("/reset-password");
  }

  if (user) {
    const resetPasswordLink = await createResetPasswordLink({
      userId: user.id
    });

    const html = await getHtmlFromMjmlTemplate("reset-password-email", {
      name: user.name,
      link: resetPasswordLink,
    })

    // console.log("html", html);
    sendEmail({
      to: user.email,
      subject: "RESET YOUR PASSWORD",
      html,
    });
  }

  req.flash("formSubmitted", true);

  return res.redirect("/reset-password");
}

// getResetPasswordTokenPage
export const getResetPasswordTokenPage = async (req, res) => {
  const { token } = req.params;
  const passwordResetData = await getResetPasswordToken(token)
  if (!passwordResetData) return res.render("auth/wrongResetPasswordToken")

  return res.render("auth/resetPassword", {
    formSubmitted: req.flash("formSubmitted")[0],
    errors: req.flash("errors"),
    token,
  })
}

// postResetPasswordTokenPage
export const postResetPasswordTokenPage = async (req, res) => {
  const { token } = req.params;

  const passwordResetData = await getResetPasswordToken(token)
  if (!passwordResetData) {
    req.flash("errors", "Password Token is not matching");
    return res.render("auth/wrong-reset-password-token");
  }

  const { data, error } = verifyResetPasswordSchema.safeParse(req.body);
  if (error) {
    const errorMessages = error.errors.map((err) => err.message);
    req.flash("errors", errorMessages[0]);
    return res.redirect(`/reset-password/${token}`);
  }

  const { newPassword } = data;

  const user = await findUserById(passwordResetData.userId);

  await clearResetPasswordToken(user.id);

  await updateUserPassword({ userId: user.id, newPassword })

  return res.redirect("/login");

}

// getVerifyEmailPage
export const getVerifyEmailPage = async (req, res) => {
  // if (!req.user || req.user.isEmailValid) return res.redirect("/");

  if (!req.user) return res.redirect("/");

  const user = await findUserById(req.user.id);

  if (!user || user.isEmailValid) return res.redirect("/");

  return res.render("auth/verifyEmail", {
    email: req.user.email,
  });
};

// postResendVerificationLink
export const postResendVerificationLink = async (req, res) => {

  if (!req.user) return res.redirect("/");
  const user = await findUserById(req.user.id);
  if (!user || user.isEmailValid) return res.redirect("/");

  await sendNewVerifyEmailLink({ email: req.user.email, userId: req.user.id });

  res.redirect("/verify-email");
}

// getVerifyEmailToken
export const getVerifyEmailToken = async (req, res) => {

  const { data, error } = verifyEmailSchema.safeParse(req.query)
  if (error) {
    return res.send("Verification link Invalid or expired!")
  }

  // const token = await findVerificationEmailToken(data); // without join code
  const [token] = await findVerificationEmailToken(data); // with join code

  // console.log("VerificationEmail -Token: ", token);
  if (!token) res.send("Verification link invalid or expired!")

  await verifyUserEmailAndUpdate(token.email);

  // clearVerifyEmailToken(token.email).catch(console.error)
  clearVerifyEmailToken(token.userId).catch(console.error)

  return res.redirect("/profile");
}

// user Logout Page 
export const userLogoutPage = async (req, res) => {
  await clearUserSession(req.user.sessionId);

  res.clearCookie("access_token");
  res.clearCookie("refresh_token");

  res.redirect("/login");
};
