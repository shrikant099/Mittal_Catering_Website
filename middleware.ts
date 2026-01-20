import { NextRequest, NextResponse } from "next/server";
import { ROLES } from "@/lib/roles";

function decodeJwt(token: string) {
  try {
    const base64 = token.split(".")[1];
    return JSON.parse(Buffer.from(base64, "base64").toString());
  } catch {
    return null;
  }
}

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // Allow login/signup always
  if (pathname === "/login" || pathname === "/signup") {
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const payload: any = decodeJwt(token);
    if (!payload || ![ROLES.ADMIN, ROLES.SUPER_ADMIN].includes(payload.role)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
