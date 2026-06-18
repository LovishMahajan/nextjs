// src/app/products/actions.ts
"use server";

import { CreateProductSchema } from "@/lib/validation";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { updateTag } from "next/cache";
import { requirePermission } from "@/lib/authz";

export async function createProduct(raw: unknown) {
	await requirePermission("product:create");
	
	const parsed = CreateProductSchema.safeParse(raw);
	if (!parsed.success) {
		return { ok: false as const, errors: parsed.error.flatten() };
	}

	const [created] = await db.insert(products).values(parsed.data).returning();

	// The user just made this change and expects to see it immediately →
	// updateTag (read-your-writes), not revalidateTag. This is the Phase 5 payoff.
	updateTag("products");

	return { ok: true as const, product: created };
}
