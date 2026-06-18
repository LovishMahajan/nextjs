// src/lib/auth.ts
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import { headers } from "next/headers";

export const auth = betterAuth({
	database: drizzleAdapter(db, { provider: "pg" }), // uses YOUR Postgres (Phase 4)
	emailAndPassword: { enabled: true }, // simplest method to start
	user: {
		additionalFields: {
			role: { type: "string", defaultValue: "user", input: false }, // ← input: false matters
		},
	},
});

export async function getCurrentUser() {
	const session = await auth.api.getSession({ headers: await headers() });
	return session?.user ?? null; // null = not logged in
}
