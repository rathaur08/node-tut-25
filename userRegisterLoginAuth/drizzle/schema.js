import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { timestamp } from 'drizzle-orm/pg-core';

// export const usersTables = mysqlTable('users_table', {
//   id: serial().primaryKey(),
//   name: varchar({ length: 255 }).notNull(),
//   age: int().notNull(),
//   email: varchar({ length: 255 }).notNull().unique(),
// });

export const usersTable = mysqlTable('users_table', {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate().notNull(),
});