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
router.route("/logout").get(authControllers.userLogoutPage);

export const authRoute = router;
