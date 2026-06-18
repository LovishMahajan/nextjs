// src/proxy.ts — edge gate: fast redirect. NOT the security guarantee.
import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  // A cheap presence check — is there a session cookie at all?
  const hasSession = req.cookies.has("better-auth.session_token");

  if (!hasSession && req.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Only run this on the paths that need it — keeps it cheap.
export const config = {
  matcher: ["/dashboard/:path*"],
};