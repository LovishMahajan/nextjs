// drizzle.config.ts
import { config } from "dotenv";
config({ path: ".env.local" }); // let the CLI read your DATABASE_URL

import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: ["./src/lib/db/schema.ts","./src/lib/auth-schema.ts"],
	out: "./drizzle", // generated SQL migrations land here
	dialect: "postgresql",
	dbCredentials: { url: process.env.DATABASE_URL! },
});
