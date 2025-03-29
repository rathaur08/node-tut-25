import { relations, sql } from 'drizzle-orm';
import { boolean, text } from 'drizzle-orm/gel-core';
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

export const sessionsTables = mysqlTable('sessions_table', {
  id: int().autoincrement().primaryKey(),
  userId: int("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }), // userid sessions data auto delete a user doesn't exist
  valid: boolean().default(true).notNull(),
  userAgent: text("user_agent"),
  ip: varchar({ length: 250 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate().notNull(),
});

export const verifyEmailTokensTable = mysqlTable('is_email_valid', {
  id: int().autoincrement().primaryKey(),
  userId: int("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }), // userid sessions data auto delete a user doesn't exist
  token: varchar({ length: 8 }).notNull(),
  expiresAt: timestamp("expires_at").default(sql`(CURRENT_TIMESTAMP + INTERVAL 1 DAY)`).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate().notNull(),
});

export const usersTable = mysqlTable('users_table', {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  age: int().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  isEmailValid: boolean("is_email_valid").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().$onUpdate().notNull(),
});

// A user can have many Product Table
export const usersRelation = relations(usersTable, ({ many }) => ({
  productTable: many(productTables),
  sessionsTable: many(sessionsTables),
}))

// A Product Table belongs to a user
export const productTableRelation = relations(productTables, ({ one }) => ({
  user: one(usersTable, {
    fields: [productTables.userId], //foreign key
    references: [usersTable.id],
  }),
}));

// A sessions Table belongs to a user
export const sessionsTableRelation = relations(sessionsTables, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionsTables.userId], // foreign Key
    references: [usersTable.id],
  })
}))