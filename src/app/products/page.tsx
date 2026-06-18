// src/app/products/page.tsx — static shell
import { Suspense } from "react";
import { getCurrentUser } from "@/lib/auth";
import { getProducts } from "@/lib/db/queries";
import { ProductCreator } from "@/components/product-creator";

export default function ProductsPage({
	searchParams,
}: {
	searchParams: Promise<{ q?: string }>;
}) {
	return (
		<main>
			<h1>Products</h1>
			<Suspense fallback={<p>Loading products…</p>}>
				<ProductList searchParams={searchParams} />
			</Suspense>
			<Suspense fallback={<p>…</p>}>
				<CreatorSlot />
			</Suspense>
		</main>
	);
}

// dynamic hole #1 — reads headers()
async function CreatorSlot() {
	const user = await getCurrentUser();
	if (!user) return <p>Log in to add products.</p>;
	const products = await getProducts();
	return (
		<ProductCreator
			initial={products.map((p) => ({
				id: p.id,
				name: p.name,
				price: p.price,
			}))}
		/>
	);
}

// dynamic hole #2 — reads searchParams
async function ProductList({
	searchParams,
}: {
	searchParams: Promise<{ q?: string }>;
}) {
	const { q } = await searchParams;
	const products = await getProducts(q);
	return (
		<>
			<form method="get">
				<input
					type="text"
					name="q"
					defaultValue={q ?? ""}
					placeholder="Search…"
				/>
				<button type="submit">Search</button>
			</form>
		</>
	);
}
