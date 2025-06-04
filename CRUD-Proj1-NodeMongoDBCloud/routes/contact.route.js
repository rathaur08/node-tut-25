import { Router } from "express";
import { deleteContactByIdPage, getContactPage, getEditContactPage, postContactPage, postEditContectPage } from "../controllers/contact.controller.js";

const router = Router();

router.route("/contact").get(getContactPage).post(postContactPage)

router.route("/contact/delete/:id").post(deleteContactByIdPage);

router.route("/contact/edit/:id").get(getEditContactPage).post(postEditContectPage)

// Named exports
export const ContactRoutes = router;
