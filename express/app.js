import express from "express";

const app = express();

app.get("/", (req, res) => res.send("Helllo World!"));
app.get("/about", (req, res) => res.send("About Helllo World!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`);
});
