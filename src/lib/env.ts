// src/lib/env.ts
import { z } from "zod";

const EnvSchema = z.object({
	DATABASE_URL: z.string().url(),
	BETTER_AUTH_SECRET: z.string().min(1),
	BETTER_AUTH_URL: z.string().url(),
});

// .parse THROWS on failure. A bad env var is OUR bug, so we WANT a loud crash at boot —
// not a silent failure later. This line runs once when the module first loads.
export const env = EnvSchema.parse(process.env);
