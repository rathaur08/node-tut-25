import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { timestamp } from 'drizzle-orm/pg-core';

export const contactTable = mysqlTable('Contactss', {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(), // Best practice for phone numbers
  message: varchar({ length: 500 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdateFn().notNull(),
});
