// src/app/products/error.tsx
"use client";
export default function Error({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	return (
		<main>
			<p>Something went wrong loading products.</p>
			<button onClick={reset}>Retry</button>
		</main>
	);
}
