// src/app/login/page.tsx — the "/login" route
import { AuthForm } from "@/components/auth-form";

export default function LoginPage() {
  return (
    <main>
      <h1>Sign in</h1>
      <AuthForm />
    </main>
  );
}