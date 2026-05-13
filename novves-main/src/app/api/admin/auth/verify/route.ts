import { NextRequest, NextResponse } from "next/server";
import {
  verifyToken,
  createAccessToken,
  getCookieValue,
  COOKIE_ACCESS_TOKEN,
  COOKIE_REFRESH_TOKEN,
} from "@/lib/admin/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const accessToken = getCookieValue(request, COOKIE_ACCESS_TOKEN);
  const refreshToken = getCookieValue(request, COOKIE_REFRESH_TOKEN);

  // Try access token first
  if (accessToken) {
    const payload = verifyToken(accessToken);
    if (payload && payload.type === "access") {
      return NextResponse.json({
        authenticated: true,
        username: payload.username,
      });
    }
  }

  // Access token expired or invalid — try refresh token
  if (refreshToken) {
    const payload = verifyToken(refreshToken);
    if (payload && payload.type === "refresh") {
      try {
        const newAccessToken = createAccessToken(
          payload.username,
          payload.role
        );

        const response = NextResponse.json({
          authenticated: true,
          username: payload.username,
        });

        const secure = process.env.NODE_ENV === "production";
        response.headers.append(
          "Set-Cookie",
          `${COOKIE_ACCESS_TOKEN}=${encodeURIComponent(newAccessToken)}; Path=/; Max-Age=${15 * 60}; SameSite=Strict; HttpOnly${secure ? "; Secure" : ""}`
        );

        return response;
      } catch (e) {
        if (e instanceof Error && e.message === "JWT_SECRET_REQUIRED") {
          return NextResponse.json({ authenticated: false }, { status: 503 });
        }
        throw e;
      }
    }
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
