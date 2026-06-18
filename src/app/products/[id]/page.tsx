// src/app/products/[id]/page.tsx — matches "/products/<anything>"
import { Suspense } from "react";
import { getProduct } from "@/lib/db/queries";

// A slow child — pretend this is an expensive reviews query
async function Reviews() {
	await new Promise((r) => setTimeout(r, 2000)); // simulate 2s of work
	return <p>★★★★☆ — Great product (slow data, streamed in)</p>;
}

export default async function ProductPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const product = await getProduct(id);
	if (!product)
		return (
			<main>
				<p>Product not found.</p>
			</main>
		); // findFirst can return undefined
	return (
		<main>
			<h1>{product.name}</h1>
			<p>₹{(product.price / 100).toFixed(2)}</p>

			<Suspense fallback={<p>Loading reviews…</p>}>
				<Reviews /> {/* page shows instantly; this fills in after 2s */}
			</Suspense>
		</main>
	);
}
