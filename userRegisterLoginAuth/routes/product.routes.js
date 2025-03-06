import { Router } from "express";
import * as authControllers from "../controllers/product.controller.js";

const router = Router();

// router.get("/product", (req, res) => res.send("Product Page!"));
router.route("/product").get(authControllers.getProductPage)

export const productRoute = router;
