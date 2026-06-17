// src/components/product-creator.tsx
"use client";
import { useOptimistic, useState, startTransition } from "react";
import { createProduct } from "@/app/products/actions";

type Item = { id: string; name: string; price: number };
export function ProductCreator({ initial }: { initial: Item[] }) {
	const [name, setName] = useState("");
	const [rupees, setRupees] = useState("");

	// optimistic list = the server-confirmed list + any pending drafts
	const [items, addOptimistic] = useOptimistic(
		initial,
		(state, draft: Item) => [draft, ...state],
	);

	async function handleCreate() {
		const price = Math.round(Number(rupees) * 100);
		const draft: Item = { id: "temp-" + Date.now(), name, price };

		// Show it IMMEDIATELY (must be inside a transition).
		startTransition(() => addOptimistic(draft));
		setName("");
		setRupees("");

		const res = await createProduct({ name: draft.name, price });
		// If it failed, the optimistic draft is dropped on the next render automatically —
		// but we should tell the user so the disappearance isn't mysterious.
		if (!res.ok) alert("Save failed — the item was removed");
	}

	return (
		<div>
			<input
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Name"
			/>
			<input
				value={rupees}
				onChange={(e) => setRupees(e.target.value)}
				placeholder="Price (₹)"
				type="number"
			/>
			<button onClick={handleCreate}>Create product</button>

			<ul>
				{items.map((p) => (
					<li key={p.id}>
						{p.name} — ₹{(p.price / 100).toFixed(2)}
						{p.id.startsWith("temp-") && " (saving…)"}
					</li>
				))}
			</ul>
		</div>
	);
}
