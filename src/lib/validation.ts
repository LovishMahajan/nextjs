// src/lib/validation.ts
import { z } from "zod";

export const ProductSchema = z.object({
	id: z.string().uuid(),
	name: z.string().min(1),
	price: z.number().int().positive(), // integer paise, like our DB (Phase 4)
});

export const CreateProductSchema = z.object({
	name: z.string().min(1),
	price: z.number().int().positive(), // integer paise
});

export const ProductFormSchema = z.object({
	name: z.string().min(1, "Name is required"),
	rupees: z
		.number({ error: "Enter a valid price" })
		.positive("Price must be greater than 0"),
});

// The type is DERIVED from the schema — not written by hand.
export type Product = z.infer<typeof ProductSchema>;
export type CreateProduct = z.infer<typeof CreateProductSchema>;
export type ProductForm = z.infer<typeof ProductFormSchema>;
