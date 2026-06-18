"use client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        type="password"
      />
      <button onClick={() => authClient.signUp.email({ email, password, name: email })}>
        Sign up
      </button>
      <button onClick={() => authClient.signIn.email({ email, password })}>
        Sign in
      </button>
      <button onClick={() => authClient.signOut()}>Sign out</button>
    </div>
  );
}