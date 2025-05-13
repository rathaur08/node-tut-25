import { count, desc, eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { contactTable, productTables } from "../drizzle/schema.js";

// getAllProductData
export const getAllProductData = async ({ userId, limit = 10, offset = 0 }) => {

  const condition = eq(productTables.userId, userId);

  const productList = await db.select().from(productTables)
    .where(condition)
    .orderBy(desc(productTables.createdAt))
    .limit(limit).offset(offset);

  const [{ totalProduct }] = await db.select({ totalProduct: count() })
    .from(productTables).where(condition);

  return { productList, totalProduct };
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

// 
export const createContact = async ({ name, number, email, message }) => {
  return await db.insert(contactTable)
    .values({ name, number, email, message })
    .$returningId();
}