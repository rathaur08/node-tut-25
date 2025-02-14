import path from "path";
import { student } from "../models/report.model.js";

export const getHome = (req, res) => {
  const homePagePath = path.join(import.meta.dirname, "public", "index.html");
  res.sendFile(homePagePath);
};

export const getContact = (req, res) => {
  console.log(req.body)
  res.redirect("/")
  // res.send(` contact page is -: ${req.query.name}, and Massage -: ${req.query.message}`)
};

export const reportCont = (req, res) => {
  // student data get from models
  return res.render("report", { student })
};