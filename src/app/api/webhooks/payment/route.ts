// src/app/api/webhooks/payment/route.ts
import { NextRequest } from "next/server";
import { z } from "zod";

// Validate the incoming body at the boundary — Phase 6's rule applies to webhooks too.
const PaymentEventSchema = z.object({
	orderId: z.string(),
	amount: z.number().int().positive(),
	status: z.enum(["succeeded", "failed"]),
});

export async function POST(req: NextRequest) {
	const parsed = PaymentEventSchema.safeParse(await req.json()); // external input → safeParse
	if (!parsed.success) {
		return Response.json({ error: "Invalid payload" }, { status: 400 });
	}

	// In a real webhook you'd FIRST verify a signature header to confirm it's really
	// from the payment provider — we'll cover that properly with security in Phase 11.
	// ...process the event (mark order paid, etc.)...

	return Response.json({ received: true });
}
