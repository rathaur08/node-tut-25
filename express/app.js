import express from "express";
import { PORT } from "./env.js";
import path from "path";

const app = express();

app.get("/", (req, res) => {
  
  const homePagePath = path.join(import.meta.dirname, "public", "index.html");
  res.sendFile(homePagePath);
  
});

app.get("/about", (req, res) => res.send("About Helllo World!"));

// const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});
