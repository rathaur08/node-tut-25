import { Router } from "express";
import multer from "multer";
import path from "path";
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

const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/avatar")
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}_${Math.random()}${ext}`)
  }
})

const avatarFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const avatarUpload = multer({
  storage: avatarStorage,
  fileFilter: avatarFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5mb
});

router.route("/edit-profile")
  .get(authControllers.getEditProfilePage)
  .post(avatarUpload.single("avatar"), authControllers.postEditProfilePage);
// .post(authControllers.postEditProfilePage);

router.route("/change-password")
  .get(authControllers.getChangePasswordPage)
  .post(authControllers.postChangePasswordPage);

router.route("/reset-password")
  .get(authControllers.getResetPasswordPage)
  .post(authControllers.postForgotPasswordPage);

router.route("/reset-password/:token")
  .get(authControllers.getResetPasswordTokenPage)
  .post(authControllers.postResetPasswordTokenPage)

router.route("/google").get(authControllers.getGoogleLoginPage);
router.route("/google/callback").get(authControllers.getGoogleLoginCallback);

router.route("/github").get(authControllers.getGithubLoginPage);
router.route("/github/callback").get(authControllers.getGithubLoginCallback);

router.route("/set-password")
  .get(authControllers.getSetPasswordPage)
  .post(authControllers.postSetPasswordPage)

router.route("/logout").get(authControllers.userLogoutPage);

export const authRoute = router;
