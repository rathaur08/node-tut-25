import { eq } from "drizzle-orm";
import { db } from "../config/db-client.js";
import { contactTable } from "../drizzle/schema.js";

export const saveContactData = async ({ name, email, phone, message }) => {

  return await db.insert(contactTable)
    .values({ name, phone, email, message })
    .$returningId();

};

export const getContactData = async () => {
  const rows = await db.select().from(contactTable)
  return rows;
}

export const getIdByContactData = async (id) => {

  const [result] = await db.select().from(contactTable)
    .where(eq(contactTable.id, id))
  return result;

}

export const getIdByUpdateContact = async ({ id, name, email, phone, message }) => {

  const [result] = await db.update(contactTable)
    .set({ name, email, phone, message })
    .where(eq(contactTable.id, id))
  return result;

}

export const getIdByDeleteContact = async (id) => {

  return await db.delete(contactTable).where(eq(contactTable.id, id));

}