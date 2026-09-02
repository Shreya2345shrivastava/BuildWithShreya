import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { env } from "@/env";

// In-memory rate limiting (works per isolate in Edge runtimes)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export default async function proxy(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "127.0.0.1";
  const path = request.nextUrl.pathname;

  // Rate Limiting Logic for API routes
  if (path.startsWith("/api/")) {
    const windowMs = 60 * 1000; // 1 minute
    const maxRequests = 100; // limit each IP to 100 requests per windowMs

    const current = rateLimitMap.get(ip) || { count: 0, timestamp: Date.now() };
    if (Date.now() - current.timestamp > windowMs) {
      current.count = 1;
      current.timestamp = Date.now();
    } else {
      current.count += 1;
    }
    rateLimitMap.set(ip, current);

    if (current.count > maxRequests) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }
  }

  const token = await getToken({
    req: request,
    secret: env.NEXTAUTH_SECRET,
  });

  const isDashboardRoute = path.startsWith("/dashboard");

  if (isDashboardRoute && !token) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
