import express from "express";
import { ContactRoutes } from "./routes/contact.route.js";
import { connectDB } from "./config/db-client.js";

const app = express();

const PORT = process.env.PORT || 3200;

// connectDB to Database Function
connectDB();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// express router
app.use(ContactRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
