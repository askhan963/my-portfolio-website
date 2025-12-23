import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // 1. Admin Security Check
    if (req.nextUrl.pathname.startsWith("/admin")) {
      if (req.nextUrl.pathname === "/admin/login") {
        return NextResponse.next();
      }
      return NextResponse.next(); // Let withAuth handle the role check via callbacks
    }

    // 2. Analytics Tracking (Non-blocking)
    const isApi = req.nextUrl.pathname.startsWith("/api");
    const isStatic = req.nextUrl.pathname.match(/\.(.*)$/);
    const isNext = req.nextUrl.pathname.startsWith("/_next");
    const isFavicon = req.nextUrl.pathname.includes("favicon.ico");

    if (!isApi && !isStatic && !isNext && !isFavicon) {
      const url = req.nextUrl.clone();
      url.pathname = "/api/analytics/track";
      
      fetch(url.toString(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pathname: req.nextUrl.pathname,
          country: (req as any).geo?.country || "Unknown",
          userAgent: req.headers.get("user-agent"),
          referrer: req.headers.get("referer"),
        }),
      }).catch((err) => console.error("Tracking Error:", err));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        if (req.nextUrl.pathname.startsWith("/admin")) {
          if (req.nextUrl.pathname === "/admin/login") return true;
          return token?.role === "ADMIN";
        }
        return true;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

