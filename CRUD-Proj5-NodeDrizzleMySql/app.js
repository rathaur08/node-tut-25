import express from "express";
import dotenv from "dotenv";
import { ContactRoutes } from "./routes/contact.route.js";

const app = express();

const PORT = process.env.PORT || 3200;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// express router
app.use(ContactRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
