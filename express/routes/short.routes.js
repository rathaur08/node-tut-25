import { Router } from "express";
import { getHome, getContact, reportCont } from "../controllers/report.controller.js"

const router = Router();

router.get("/", getHome);

router.post("/contact", getContact);

router.get("/about", (req, res) => res.send("About Page!"));

// added report File code to controllers files
// Add controllers Code 
router.get("/report", reportCont);

router.get("/product", (req, res) => {
  console.log(req.query)
  res.send(` Product Name is -: ${req.query.search}, and Limit -: ${req.query.limit}`)
  // Example URL Added Multi Parameters (http://localhost:3000/product?search=iphone16&limit=15)
});

router.get("/profile/:username", (req, res) => {
  console.log(req.params)
  res.send(` Profile Name is : ${req.params.username}`)
});

router.get("/blog/:blogname/artical/:slug", (req, res) => {
  console.log(req.params);
  const formatedSlig = req.params.slug.replace(/-/g, " ");
  res.send(` Profile Name is : ${req.params.blogname} artical is ${req.params.slug}`);
});

// default export
// export default router;

// Named export
export const shortRoutes = router;