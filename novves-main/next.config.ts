import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: false,
    /** Yerel public görseli değişince eski optimize çıktısının takılı kalmaması için (özellikle dev). */
    minimumCacheTTL: 0,
    /**
     * Varsayılan tek kalıp `{ pathname: "**", search: "" }` iken `src` içinde `?v=...` yasaklanıyor.
     * `search` vermeden sadece pathname ile eşleşince sorgu dizgesine izin verilir (cache bust).
     */
    localPatterns: [{ pathname: "/images/**" }, { pathname: "/animation/**" }],
    qualities: [75, 90, 92],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "1mb",
      allowedOrigins: ["localhost:3000"],
    },
  },
};

export default nextConfig;
