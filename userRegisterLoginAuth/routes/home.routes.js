import { Router } from "express";
import { getHome, getContact } from "../controllers/home.controller.js"

const router = Router();

router.get("/", getHome);

router.get("/contact", getContact);

router.get("/about", (req, res) => res.send("About Page!"));

// 404 Page Not Found (Use router.use to handle all methods)
router.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// Named export
export const homeRoutes = router;