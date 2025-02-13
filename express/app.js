import express from "express";
import { PORT } from "./env.js";
import path from "path";

const app = express();

// Handle Form Submission Code
const staticPath = path.join(import.meta.dirname, "public");
app.use(express.static(staticPath));

app.use(express.urlencoded({ extended: true }));

// app.get("/contact", (req, res) => {
//   console.log(req.query)
//   res.redirect("/")
//   // res.send(` contact page is -: ${req.query.name}, and Massage -: ${req.query.message}`)
// });

app.post("/contact", (req, res) => {
  console.log(req.body)
  res.redirect("/")
  // res.send(` contact page is -: ${req.query.name}, and Massage -: ${req.query.message}`)
});

app.get("/", (req, res) => {
  const homePagePath = path.join(import.meta.dirname, "public", "index.html");
  res.sendFile(homePagePath);
});

app.get("/about", (req, res) => res.send("About Helllo World!"));

app.get("/product", (req, res) => {
  console.log(req.query)
  res.send(` Product Name is -: ${req.query.search}, and Limit -: ${req.query.limit}`)
  // Example URL Added Multi Parameters (http://localhost:3000/product?search=iphone16&limit=15)
});

app.get("/profile/:username", (req, res) => {
  console.log(req.params)
  res.send(` Profile Name is : ${req.params.username}`)
});

app.get("/profile/:username/artical/:slug", (req, res) => {
  console.log(req.params);
  const formatedSlig = req.params.slug.replace(/-/g, " ");
  res.send(` Profile Name is : ${req.params.username} artical is ${req.params.slug}`);
});

// 404 Page Not Found
app.use((req, res) => {
  // return res.status(404).send("<h1>404 Error <br/> Page Not Found!</h1>")

  // 2 Method Code File Path -----------
  return res
    .status(404)
    .sendFile(path.join(import.meta.dirname, "views", "404.html"))
});

// const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});
