import { Router } from "express";
import { getHome, getContact, getAbout, postHomeProduct, getEditHomeProductPage, postEditHomeProductPage, deleteHomeProduct } from "../controllers/home.controller.js"

const router = Router();

router.get("/", getHome);
router.post("/", postHomeProduct)

// Home Page Products Update / Edit / Delete 
router.route("/edit/:id")
  .get(getEditHomeProductPage)
  .post(postEditHomeProductPage)

router.route("/delete/:id").post(deleteHomeProduct);

router.get("/contact", getContact);

router.get("/about", getAbout);

// 404 Page Not Found (Use router.use to handle all methods)
router.use((req, res) => {
  res.status(404).send("404 - Page Not Found");
});

// Named export
export const homeRoutes = router;