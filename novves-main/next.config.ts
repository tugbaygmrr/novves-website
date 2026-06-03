import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const configDir = path.dirname(fileURLToPath(import.meta.url));

function findAppRootWithNext(start: string): string | undefined {
  let dir = path.resolve(start);
  for (let i = 0; i < 40; i++) {
    if (fs.existsSync(path.join(dir, "node_modules", "next", "package.json"))) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) return undefined;
    dir = parent;
  }
  return undefined;
}

function nestedNovvesMain(from: string): string | undefined {
  const nested = path.join(from, "novves-main");
  if (fs.existsSync(path.join(nested, "node_modules", "next", "package.json"))) {
    return nested;
  }
  return undefined;
}

const projectRoot =
  findAppRootWithNext(process.cwd()) ??
  findAppRootWithNext(configDir) ??
  nestedNovvesMain(configDir) ??
  configDir;

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
  turbopack: {
    root: projectRoot,
  },

  /**
   * Dev: çok sayıda kare dosyası izlenmesin (RAM/CPU, Windows watcher limiti).
   * Kare değişikliği: `npm run dev:turbo` veya build sonrası yenile.
   */
  webpack: (config, { dev }) => {
    if (!dev) return config;
    const ignored = [
      "**/node_modules/**",
      "**/.git/**",
      "**/public/animation/**",
      "**/data/legal-locales/**",
      "**/*.tr-to-locale.checkpoint.json",
    ];
    const apply = (c: { watchOptions?: Record<string, unknown> }) => {
      c.watchOptions = { ...c.watchOptions, ignored };
    };
    if (Array.isArray(config)) {
      config.forEach(apply);
    } else {
      apply(config);
    }
    return config;
  },

  /** Slash yanlışlığı veya "tr"+"bu" yapışık yazım: /trbu → /tr */
  async redirects() {
    return [
      { source: "/trbu", destination: "/tr", permanent: false },
      { source: "/trbu/:path*", destination: "/tr/:path*", permanent: false },
      {
        source: "/:locale/legal/terms",
        destination: "/:locale/terms",
        permanent: false,
      },
      {
        source: "/:locale/legal/privacy",
        destination: "/:locale/privacy",
        permanent: false,
      },
      {
        source: "/:locale/legal/visitor",
        destination: "/:locale/visitor",
        permanent: false,
      },
      {
        source: "/:locale/legal/cookies",
        destination: "/:locale/cookies",
        permanent: false,
      },
      {
        source: "/:locale/legal/customer",
        destination: "/:locale/customer",
        permanent: false,
      },
      {
        source: "/:locale/legal/product-safety",
        destination: "/:locale/product-safety",
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/animation/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  images: {
    formats: ["image/avif", "image/webp"],
    /** Mobil öncelikli daha küçük ara genişlikler */
    deviceSizes: [384, 512, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: false,
    /** Yerel public görseli değişince eski optimize çıktısının takılı kalmaması için (özellikle dev). */
    minimumCacheTTL: 0,
    /**
     * Varsayılan tek kalıp `{ pathname: "**", search: "" }` iken `src` içinde `?v=...` yasaklanıyor.
     * `search` vermeden sadece pathname ile eşleşince sorgu dizgesine izin verilir (cache bust).
     */
    localPatterns: [{ pathname: "/images/**" }, { pathname: "/animation/**" }],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
    ],
    qualities: [75, 80, 82, 90, 92],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "1mb",
      allowedOrigins: ["localhost:3000", "127.0.0.1:3000"],
    },
  },
};

export default nextConfig;
