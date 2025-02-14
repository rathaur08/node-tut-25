import { readFile, writeFile } from "fs/promises"
import path from "path";
import { Router } from "express";
import { reportCont } from "../controllers/report.controller.js"

const router = Router();

router.get("/", (req, res) => {
  const homePagePath = path.join(import.meta.dirname, "public", "index.html");
  res.sendFile(homePagePath);
});

// app.get("/contact", (req, res) => {
//   console.log(req.query)
//   res.redirect("/")
//   // res.send(` contact page is -: ${req.query.name}, and Massage -: ${req.query.message}`)
// });

router.post("/contact", (req, res) => {
  console.log(req.body)
  res.redirect("/")
  // res.send(` contact page is -: ${req.query.name}, and Massage -: ${req.query.message}`)
});

router.get("/about", (req, res) => res.send("About Page!"));

// added report File code to controllers files
// Add controllers Code 
router.get("/report", reportCont);

// router.get("/report", (req, res) => {
//   const student = [
//     { name: "sunny", grade: "10th", favSubject: "Maths" },
//     { name: "Rahul", grade: "9th", favSubject: "Hindi" },
//     { name: "Amit", grade: "11th", favSubject: "English" },
//     { name: "harsh", grade: "12th", favSubject: "Physis" }
//   ]
//   return res.render("report", { student })
// });

router.get("/product", (req, res) => {
  console.log(req.query)
  res.send(` Product Name is -: ${req.query.search}, and Limit -: ${req.query.limit}`)
  // Example URL Added Multi Parameters (http://localhost:3000/product?search=iphone16&limit=15)
});

router.get("/profile/:username", (req, res) => {
  console.log(req.params)
  res.send(` Profile Name is : ${req.params.username}`)
});

router.get("/profile/:username/artical/:slug", (req, res) => {
  console.log(req.params);
  const formatedSlig = req.params.slug.replace(/-/g, " ");
  res.send(` Profile Name is : ${req.params.username} artical is ${req.params.slug}`);
});

// // --------  404 Page Not Found ---------
// router.use((req, res) => {
//   // return res.status(404).send("<h1>404 Error <br/> Page Not Found!</h1>")
//   // 2 Method Code File Path -----------
//   return res
//     .status(404)
//     .sendFile(path.join(import.meta.dirname, "views", "404.html"))
// });

// default export
// export default router;

// Named export
export const shortRoutes = router;