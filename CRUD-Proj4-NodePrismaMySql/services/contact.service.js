import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const saveContactData = async ({ name, email, phone, message }) => {
  // const [rows] = await db.execute("insert into contacts( name, email, phone, message ) values(?,?,?,?)",
  //   [name, email, phone, message]
  // )
  // return rows;

  // using Prisma get data in sql
  const rows = await prisma.Contact.create({
    data: { name, email, phone, message }
  });
  return rows;
};

export const getContactData = async () => {
  // const [rows] = await db.execute("select * from contacts")
  // return rows;

  // using Prisma get data in sql
  const rows = await prisma.Contact.findMany()
  return rows;
}

export const getIdByContactData = async (id) => {
  // const [result] = await db.execute(
  //   'SELECT * FROM contacts WHERE id = ?',
  //   [id]
  // );
  // return result;

  // using Prisma get data in sql
  const rows = await prisma.Contact.findUnique({
    where: { id },
  })
  return rows;
}

export const getIdByUpdateContact = async ({ id, name, email, phone, message }) => {
  const [result] = await db.execute(
    `UPDATE contacts 
     SET name = ?, email = ?, phone = ?, message = ? 
     WHERE id = ?`,
    [name, email, phone, message, id]
  );
  console.log("result.affectedRows", result.affectedRows);
  return result;
}

export const getIdByDeleteContact = async (id) => {
  // const [result] = await db.execute(
  //   'DELETE FROM contacts WHERE id = ?',
  //   [id]
  // );
  // return result;

  // using Prisma delete one data in sql
  const result = await prisma.Contact.delete({
    where: { id: parseInt(id, 10) } // Converts a string to an integer.
  });
  return result;
}