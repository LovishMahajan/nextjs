// src/components/product-creator.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOptimistic, startTransition } from "react";
import { ProductFormSchema, type ProductForm } from "@/lib/validation";
import { createProduct } from "@/app/products/actions";

type Item = { id: string; name: string; price: number };

export function ProductCreator({ initial }: { initial: Item[] }) {
	const {
		register, // connects an <input> to the form
		handleSubmit, // wraps your submit fn; runs validation FIRST
		reset, // clears the form after success
		formState: { errors, isSubmitting }, // per-field errors + a submitting flag
	} = useForm<ProductForm>({ resolver: zodResolver(ProductFormSchema) });

	const [items, addOptimistic] = useOptimistic(
		initial,
		(state, draft: Item) => [draft, ...state],
	);

	// handleSubmit only calls this AFTER the Zod schema passes on the client.
	async function onSubmit(data: ProductForm) {
		const price = Math.round(data.rupees * 100); // rupees → paise (Phase 4)
		const draft: Item = {
			id: "temp-" + Date.now(),
			name: data.name,
			price,
		};

		startTransition(() => addOptimistic(draft));
		reset(); // clear the inputs immediately

		const res = await createProduct({ name: data.name, price }); // server RE-validates
		if (!res.ok) alert("Save failed — the item was removed");
	}

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input {...register("name")} placeholder="Name" />
				{errors.name && (
					<span style={{ color: "red" }}>{errors.name.message}</span>
				)}

				<input
					{...register("rupees", { valueAsNumber: true })}
					placeholder="Price (₹)"
					type="number"
					step="0.01"
				/>
				{errors.rupees && (
					<span style={{ color: "red" }}>
						{errors.rupees.message}
					</span>
				)}

				<button disabled={isSubmitting}>Create product</button>
			</form>

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
