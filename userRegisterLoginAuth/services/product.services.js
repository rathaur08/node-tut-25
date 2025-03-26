import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { productTables } from "../drizzle/schema.js";

// getAllProductData

export const getAllProductData = async (userId) => {
  return await db.select().from(productTables)
    .where(eq(productTables.userId, userId));
}

export const createProduct = async ({ product_name, product_value, userId }) => {
  return await db.insert(productTables)
    .values({ product_name, product_value, userId })
    .$returningId();
}

// findProductById
export const findProductById = async (id) => {
  const [result] = await db.select().from(productTables)
    .where(eq(productTables.id, id));
  return result;
}

// updateProduct
export const updateProduct = async ({ id, product_name, product_value }) => {
  return await db.update(productTables)
    .set({ product_name, product_value })
    .where(eq(productTables.id, id));
}

// deleteProductById
export const deleteProductById = async (id) => {
  return await db.delete(productTables)
    .where(eq(productTables.id, id));
}