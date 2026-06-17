// src/components/like-button.tsx — a CLIENT island
"use client";
import { useState } from "react";

export function LikeButton() {
	const [liked, setLiked] = useState(false);
	return (
		<button onClick={() => setLiked(!liked)}>{liked ? "♥" : "♡"}</button>
	);
}
