import { relations } from 'drizzle-orm';
import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { timestamp } from 'drizzle-orm/pg-core';

export const productTables = mysqlTable('product_table', {
  id: int().autoincrement().primaryKey(),
  product_name: varchar({ length: 255 }).notNull(),
  product_value: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate().notNull(),
  userId: int("user_id").notNull().references(() => usersTable.id),
});

export const usersTable = mysqlTable('users_table', {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate().notNull(),
});

// // A user can have many Product Table
// export const usersRelation = relations(usersTable, ({ many }) => ({
//   productTable: many(productTables),
// }))

// // A Product Table belongs to a user
// export const productTableRelation = relations(productTables, ({ one }) => ({
//   user: one(usersTable, {
//     fields: [productTables.userId], //foreign key
//     references: [usersTable.id],
//   }),
// }));