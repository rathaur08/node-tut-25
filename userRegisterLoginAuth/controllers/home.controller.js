import { getAllProductData, createProduct } from "../services/product.services.js";

//
export const getHome = async (req, res) => {

  try {
    const product = await getAllProductData()
    return res.render("index", { product })

  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error")
  }

};

export const postHomeProduct = async (req, res) => {

  console.log("postHomeProduct ", req.body);
  const { product_name, product_value } = req.body;

  const [product] = await createProduct({ product_name, product_value })
  console.log("Create product", product);

  res.redirect("/")
};

export const getContact = (req, res) => {
  return res.render("Contact")
};