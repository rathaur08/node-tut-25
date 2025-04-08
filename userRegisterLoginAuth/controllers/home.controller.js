import { getAllProductData, createProduct, findProductById, updateProduct, deleteProductById, createContact } from "../services/product.services.js";
import z from "zod";
import { contactSchema } from "../validators/product.validator.js";

// 
export const getHome = async (req, res) => {

  try {
    if (!req.user) return res.redirect("/login");
    const product = await getAllProductData(req.user.id)
    return res.render("index", { product, errors: req.flash("errors") })

  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error")
  }

};

export const postHomeProduct = async (req, res) => {

  if (!req.user) return res.redirect("/login");

  // console.log("postHomeProduct ", req.body);
  const { product_name, product_value } = req.body;

  const [product] = await createProduct({ product_name, product_value, userId: req.user.id })
  // console.log("Create product", product);

  if (product) {
    req.flash("errors", "Product with that already exitsts, please added another")
  };

  return res.redirect("/")
};

// getEditHomeProductPage
export const getEditHomeProductPage = async (req, res) => {
  if (!req.user) return res.redirect("/login");

  // const id = req.params;
  const { data: id, error } = z.coerce.number().int().safeParse((req.params.id))
  if (error) return res.redirect("/404");

  try {
    const product = await findProductById(id);
    if (!product) return res.redirect("/404");
    res.render("edit-product", {
      id: product.id,
      product_name: product.product_name,
      product_value: product.product_value,
      errors: req.flash("errors"),

    });

  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error")
  }
}

// postEditHomeProductPage
export const postEditHomeProductPage = async (req, res) => {
  if (!req.user) return res.redirect("/login");

  // const id = req.params;
  const { data: id, error } = z.coerce.number().int().safeParse((req.params.id))
  if (error) return res.redirect("/404");

  try {
    const { product_name, product_value } = req.body;
    const newUpdatedProductData = await updateProduct({ id, product_name, product_value });
    if (!newUpdatedProductData) return res.redirect("/404");

    res.redirect("/");
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      req.flash("errors", "Product already exist please enter another")
      return res.redirect(`/edit/${id}`)
    }
    console.error(error);
    return res.status(500).send("Internal Server Error")
  }
}

// deleteHomeProduct
export const deleteHomeProduct = async (req, res) => {
  if (!req.user) return res.redirect("/login");


  try {
    const { data: id, error } = z.coerce.number().int().safeParse((req.params.id))
    if (error) return res.redirect("/404");

    await deleteProductById(id)

    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error")
  }
};

export const getContact = (req, res) => {
  return res.render("Contact", {
    errors: req.flash("errors"),
  })
};

export const postContact = async (req, res) => {

  const { data, error } = contactSchema.safeParse(req.body);

  if (error) {
    const errorMessages = error.errors.map((err) => err.message);
    req.flash("errors", errorMessages);
    console.error("error", errorMessages);
    return res.redirect("/contact");
  }

  const { name, number, email, message } = data;
  await createContact({ name, number, email, message });

  return res.redirect("/");

}

export const getAbout = (req, res) => {
  return res.render("About")
};