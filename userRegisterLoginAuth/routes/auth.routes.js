import { Router } from "express";
import * as authControllers from "../controllers/auth.controller.js";

const router = Router();

// router.get("/register", authControllers.getRegisterPage);
router.route("/register")
  .get(authControllers.getRegisterPage)
  .post(authControllers.postRegister);

// router.get("/login", authControllers.getLoginPage);
// router.post("/login", authControllers.postLogin);
router.route("/login")
  .get(authControllers.getLoginPage)
  .post(authControllers.postLogin);

router.route("/profile").get(authControllers.getProfilePage);

router.route("/verify-email").get(authControllers.getVerifyEmailPage);

router.route("/resend-verification-link").post(authControllers.postResendVerificationLink);

router.route("/verify-email-token").get(authControllers.getVerifyEmailToken);

router.route("/edit-profile")
  .get(authControllers.getEditProfilePage)
  .post(authControllers.postEditProfilePage);

router.route("/change-password")
  .get(authControllers.getChangePasswordPage)
  .post(authControllers.postChangePasswordPage);

router.route("/reset-password")
  .get(authControllers.getResetPasswordPage)
  .post(authControllers.postForgotPasswordPage);

router.route("/reset-password/:token")
  .get(authControllers.getResetPasswordTokenPage)
  .post(authControllers.postResetPasswordTokenPage)

router.route("/logout").get(authControllers.userLogoutPage);

export const authRoute = router;
