import express from "express";
import { homeRoutes } from "./routes/home.routes.js";
import { authRoute } from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

// express router

app.use(authRoute);
app.use(homeRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
