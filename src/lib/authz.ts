// src/lib/authz.ts
import { getCurrentUser } from "@/lib/auth"; // Phase 10

// One place that maps role → permissions. Easy to audit, easy to extend.
const ROLE_PERMISSIONS: Record<string, string[]> = {
  admin: ["product:create", "product:update", "product:delete"],
  user: [],
};

function hasPermission(role: string, perm: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(perm) ?? false;
}

// Throws if the caller isn't allowed. Returns the user if they are.
export async function requirePermission(perm: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("UNAUTHENTICATED");        // not logged in
  if (!hasPermission(user.role, perm)) throw new Error("FORBIDDEN"); // logged in, not allowed
  return user;
}