import express from "express";
import { PORT } from "./env.js";
import path from "path";

const app = express();

const staticPath = path.join(import.meta.dirname, "public");
app.use("/public", express.static(staticPath));

app.get("/", (req, res) => {

  const homePagePath = path.join(import.meta.dirname, "public", "index.html");
  res.sendFile(homePagePath);

});

app.get("/about", (req, res) => res.send("About Helllo World!"));

app.get("/profile/:username", (req, res) => {
  console.log(req.params)
  res.send(` Profile Name is : ${req.params.username}`)
});

app.get("/profile/:username/artical/:slug", (req, res) => {
  console.log(req.params);
  const formatedSlig = req.params.slug.replace(/-/g, " ");
  res.send(` Profile Name is : ${req.params.username} artical is ${req.params.slug}`);
});

// const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});
