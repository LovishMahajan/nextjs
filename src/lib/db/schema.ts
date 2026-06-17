// src/lib/db/schema.ts — schema in TypeScript; types are derived from this
import { pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
	id: uuid("id").defaultRandom().primaryKey(),
	name: text("name").notNull(),
	price: integer("price").notNull(), // money as integer MINOR units (paise) — see below
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
