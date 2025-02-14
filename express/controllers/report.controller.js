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
  // const student = [
  //   { name: "sunny", grade: "10th", favSubject: "Maths" },
  //   { name: "Rahul", grade: "9th", favSubject: "Hindi" },
  //   { name: "Amit", grade: "11th", favSubject: "English" },
  //   { name: "harsh", grade: "12th", favSubject: "Physis" }
  // ]
  return res.render("report", { student })
};