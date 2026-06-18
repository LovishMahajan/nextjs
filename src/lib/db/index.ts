// src/lib/db/index.ts — a single shared connection for the whole app
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";
import * as authSchema from "@/lib/auth-schema";
import { env } from "@/lib/env";

// Dev hot-reload re-runs this file on every save. Without caching the pool on
// globalThis, each save opens a NEW pool and you eventually exhaust the DB's
// connection limit ("too many clients"). This guard reuses one pool in dev.
const globalForDb = globalThis as unknown as { pool?: Pool };
const pool =
	globalForDb.pool ?? new Pool({ connectionString: env.DATABASE_URL });
if (process.env.NODE_ENV !== "production") globalForDb.pool = pool;

export const db = drizzle(pool, { schema: { ...schema, ...authSchema } });
