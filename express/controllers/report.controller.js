// import files links for your used
import { student } from "../models/report.model.js";

export const reportCont = (req, res) => {
  // const student = [
  //   { name: "sunny", grade: "10th", favSubject: "Maths" },
  //   { name: "Rahul", grade: "9th", favSubject: "Hindi" },
  //   { name: "Amit", grade: "11th", favSubject: "English" },
  //   { name: "harsh", grade: "12th", favSubject: "Physis" }
  // ]
  return res.render("report", { student })
};