import { Router } from "express";
import { getContactPage, postContactPage } from "../controllers/contact.controller.js";

const router = Router();

router.route("/contact").get(getContactPage).post(postContactPage)

// Named exports
export const ContactRoutes = router;
