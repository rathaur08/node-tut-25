import { Router } from "express";
import { deleteContactByIdPage, getContactPage, postContactPage } from "../controllers/contact.controller.js";

const router = Router();

router.route("/contact").get(getContactPage).post(postContactPage)

router.route("/contact/delete/:id").post(deleteContactByIdPage);

// Named exports
export const ContactRoutes = router;
