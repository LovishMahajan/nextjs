// src/lib/validation.ts
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  price: z.number().int().positive(), // integer paise, like our DB (Phase 4)
});

// The type is DERIVED from the schema — not written by hand.
export type Product = z.infer<typeof ProductSchema>;