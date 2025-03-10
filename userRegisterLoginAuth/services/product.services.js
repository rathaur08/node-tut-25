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