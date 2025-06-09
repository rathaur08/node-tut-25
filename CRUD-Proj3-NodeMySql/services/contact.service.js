import { db } from "../config/db-client.js";

export const saveContactData = async ({ name, email, phone, message }) => {
  const [rows] = await db.execute("insert into contacts( name, email, phone, message ) values(?,?,?,?)",
    [name, email, phone, message]
  )
  return rows;
};

export const getContactData = async () => {
  const [rows] = await db.execute("select * from contacts")
  return rows;
}

export const getIdByContactData = async (id) => {
}

export const getIdByUpdateContact = async ({ id, name, email, phone, message }) => {

}

export const getIdByDeleteContact = async (id) => {
  const [result] = await db.execute(
    'DELETE FROM contacts WHERE id = ?',
    [id]
  );
  return result;
}