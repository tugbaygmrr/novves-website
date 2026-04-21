import { NextRequest, NextResponse } from "next/server";
import {
  verifyToken,
  createAccessToken,
  setAuthCookies,
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
      // Issue a new access token
      const newAccessToken = createAccessToken(payload.username);

      const response = NextResponse.json({
        authenticated: true,
        username: payload.username,
      });

      // Set new access token cookie
      const secure = process.env.NODE_ENV === "production";
      response.headers.append(
        "Set-Cookie",
        `${COOKIE_ACCESS_TOKEN}=${encodeURIComponent(newAccessToken)}; Path=/; Max-Age=${15 * 60}; SameSite=Strict; HttpOnly${secure ? "; Secure" : ""}`
      );

      return response;
    }
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
