import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const todoTable = pgTable("todo_table", {
  id: serial("id").primaryKey(),
  message: text("message").notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertPost = typeof todoTable.$inferInsert;
export type SelectPost = typeof todoTable.$inferSelect;
