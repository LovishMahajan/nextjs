import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>Catalogue</h1>
      <Link href="/login">Sign in</Link>
      <Link href="/products">Browse products</Link>
    </main>
  );
}