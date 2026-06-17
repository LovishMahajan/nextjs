// src/lib/db/queries.ts — all product reads live here
import { db } from "./index";
import { cacheLife, cacheTag, revalidateTag } from "next/cache";

export async function refreshProducts() {
	revalidateTag("products", "max"); // everything tagged "products" is now stale → re-fetched next time
}
export async function getProducts(q?: string) {
	"use cache"; // opt IN (default is dynamic)
	cacheLife("hours"); // safety net: refresh at least this often
	cacheTag("products"); // a handle to invalidate precisely later

	return db.query.products.findMany({
		where: q ? (p, { ilike }) => ilike(p.name, `%${q}%`) : undefined, // DB-side search
		orderBy: (p, { desc }) => desc(p.createdAt),
	});
}

export function getProduct(id: string) {
	return db.query.products.findFirst({
		where: (p, { eq }) => eq(p.id, id),
	});
}
