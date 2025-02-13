import express from "express";
import { PORT } from "./env.js";
import path from "path";
import {shortRoutes} from "./routes/short.routes.js"

const app = express();

// Handle Form Submission Code
const staticPath = path.join(import.meta.dirname, "public");
app.use(express.static(staticPath));

app.use(express.urlencoded({ extended: true }));

// express router
app.use(shortRoutes);

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
