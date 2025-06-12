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
  // const [result] = await db.execute(
  //   'SELECT * FROM contacts WHERE id = ?',
  //   [id]
  // );
  // return result;
}

export const getIdByUpdateContact = async ({ id, name, email, phone, message }) => {
  // const [result] = await db.execute(
  //   `UPDATE contacts 
  //    SET name = ?, email = ?, phone = ?, message = ? 
  //    WHERE id = ?`,
  //   [name, email, phone, message, id]
  // );
  // console.log("result.affectedRows", result.affectedRows);
  // return result;
}

export const getIdByDeleteContact = async (id) => {

  return await db.delete(contactTable).where(eq(contactTable.id, id));

}