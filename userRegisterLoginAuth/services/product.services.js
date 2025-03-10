import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { productTables } from "../drizzle/schema.js";

// getAllProductData

export const getAllProductData = async () => {
  return await db.select().from(productTables);
}

export const createProduct = async ({ product_name, product_value, userId = "8" }) => {
  return await db.insert(productTables)
    .values({ product_name, product_value, userId })
    .$returningId();
}