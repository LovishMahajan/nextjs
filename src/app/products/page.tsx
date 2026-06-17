// src/app/products/page.tsx — the "/products" route
import Link from "next/link";
import { LikeButton } from "@/components/like-button";
import { getProducts } from "@/lib/db/queries";
import { z } from "zod";
import { ProductCreator } from "@/components/product-creator";

// A schema describing what we EXPECT the external API to return
const ExternalProductSchema = z.object({
	id: z.number(),
	title: z.string(),
	price: z.number(),
});

async function getExternalProducts() {
	const res = await fetch("https://fakestoreapi.com/products");

	// .safeParse does NOT throw — it returns { success, data } | { success, error }.
	// External input failing is EXPECTED (not our bug), so we handle it gracefully.
	const parsed = z.array(ExternalProductSchema).safeParse(await res.json());

	if (!parsed.success) {
		throw new Error("Upstream API returned an unexpected shape");
	}
	return parsed.data; // from here on, fully typed AND verified at runtime
}
export default async function ProductsPage({
	searchParams,
}: {
	searchParams: Promise<{ q?: string }>;
}) {
	const { q } = await searchParams;
	const products = await getProducts(q); // runs on the server, awaited before render
	return (
		<main>
			<h1>Products</h1>
			{/* Plain GET form — submitting writes ?q=... to the URL, no JS needed */}
			<form method="get">
				<input
					type="text"
					name="q"
					defaultValue={q ?? ""}
					placeholder="Search…"
				/>
				<button type="submit">Search</button>
			</form>
			<ProductCreator initial={products.map((p) => ({ id: p.id, name: p.name, price: p.price }))} />
		</main>
	);
}
