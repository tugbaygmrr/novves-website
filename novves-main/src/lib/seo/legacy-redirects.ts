type NextRedirectRule = { source: string; destination: string; permanent: boolean };

/** Legacy static path to target after `[locale]/`. Empty string = homepage. */
const LEGACY_PATH_TARGETS: Record<string, string> = {
  "/index.html": "",
  "/index.htm": "",
  "/home.html": "",
  "/default.html": "",
  "/anasayfa.html": "",
  "/main.html": "",

  "/urunler.html": "urunler/hava-hareketi",
  "/urunler": "urunler/hava-hareketi",
  "/products.html": "urunler/hava-hareketi",
  "/products": "urunler/hava-hareketi",
  "/product.html": "urunler/hava-hareketi",

  "/cozumler.html": "cozumler/duman-isi-tahliye-sistemleri",
  "/cozumler": "cozumler/duman-isi-tahliye-sistemleri",
  "/solutions.html": "cozumler/duman-isi-tahliye-sistemleri",
  "/solutions": "cozumler/duman-isi-tahliye-sistemleri",
  "/solution.html": "cozumler/duman-isi-tahliye-sistemleri",

  "/hizmetler.html": "hizmetler",
  "/hizmetler": "hizmetler",
  "/services.html": "hizmetler",
  "/services": "hizmetler",

  "/iletisim.html": "iletisim",
  "/iletisim": "iletisim",
  "/contact.html": "iletisim",
  "/contact": "iletisim",
  "/contact-us.html": "iletisim",
  "/contact-us": "iletisim",

  "/kurumsal.html": "kurumsal/biz-kimiz",
  "/kurumsal": "kurumsal",
  "/hakkimizda.html": "kurumsal/biz-kimiz",
  "/hakkimizda": "kurumsal/biz-kimiz",
  "/about.html": "kurumsal/biz-kimiz",
  "/about": "kurumsal/biz-kimiz",
  "/about-us.html": "kurumsal/biz-kimiz",
  "/about-us": "kurumsal/biz-kimiz",
  "/corporate.html": "kurumsal",
  "/company.html": "kurumsal/biz-kimiz",

  "/referanslar.html": "kurumsal/referanslar",
  "/referanslar": "kurumsal/referanslar",
  "/references.html": "kurumsal/referanslar",
  "/references": "kurumsal/referanslar",

  "/haberler.html": "kurumsal/haberler",
  "/haberler": "kurumsal/haberler",
  "/news.html": "kurumsal/haberler",
  "/news": "kurumsal/haberler",
  "/basin.html": "kurumsal/basin-odasi",
  "/press.html": "kurumsal/basin-odasi",

  "/sertifikalar.html": "teknik-merkez/dokuman-kutuphanesi",
  "/sertifikalar": "teknik-merkez/dokuman-kutuphanesi",
  "/certificates.html": "teknik-merkez/dokuman-kutuphanesi",
  "/certificates": "teknik-merkez/dokuman-kutuphanesi",

  "/patentler.html": "kurumsal/patentlerimiz",
  "/patents.html": "kurumsal/patentlerimiz",
  "/patentlerimiz.html": "kurumsal/patentlerimiz",
  "/patentlerimiz": "kurumsal/patentlerimiz",

  "/kariyer.html": "kariyer",
  "/kariyer": "kariyer",
  "/career.html": "kariyer",
  "/careers.html": "kariyer",
  "/career": "kariyer",
  "/careers": "kariyer",

  "/teknik-merkez.html": "teknik-merkez/dokuman-kutuphanesi",
  "/teknik-merkez": "teknik-merkez/dokuman-kutuphanesi",
  "/teknik.html": "teknik-merkez/dokuman-kutuphanesi",
  "/technical.html": "teknik-merkez/dokuman-kutuphanesi",
  "/dokumanlar.html": "teknik-merkez/dokuman-kutuphanesi",
  "/documents.html": "teknik-merkez/dokuman-kutuphanesi",
  "/katalog.html": "teknik-merkez/dokuman-kutuphanesi",
  "/catalog.html": "teknik-merkez/dokuman-kutuphanesi",
  "/catalogue.html": "teknik-merkez/dokuman-kutuphanesi",

  "/kvkk.html": "legal",
  "/kvkk": "legal",
  "/gizlilik.html": "privacy",
  "/privacy.html": "privacy",
  "/privacy": "privacy",
  "/legal.html": "legal",
  "/legal": "legal",

  "/surdurulebilirlik.html": "surdurulebilirlik",
  "/surdurulebilirlik": "surdurulebilirlik",
  "/sustainability.html": "surdurulebilirlik",
  "/sustainability": "surdurulebilirlik",

  "/partnerlerimiz.html": "iletisim/partnerlerimiz",
  "/partnerlerimiz": "iletisim/partnerlerimiz",
  "/partners.html": "iletisim/partnerlerimiz",
  "/partners": "iletisim/partnerlerimiz",

  "/sosyal-medya.html": "iletisim/sosyal-medya",
  "/social.html": "iletisim/sosyal-medya",

  "/novves": "",
  "/novves/": "",
  "/shop.html": "urunler/hava-hareketi",
  "/shop": "urunler/hava-hareketi",
  "/magaza.html": "urunler/hava-hareketi",
  "/store.html": "urunler/hava-hareketi",
};

/** Legacy hyphen URLs: /urunler-klima-santralleri.html -> urunler/klima-santralleri */
const LEGACY_HYPHEN_SECTIONS = ["urunler", "cozumler", "hizmetler", "kurumsal"] as const;

const LEGACY_NESTED_PREFIXES: Array<{ prefix: string; targetPrefix: string }> = [
  { prefix: "/urunler/", targetPrefix: "urunler/" },
  { prefix: "/cozumler/", targetPrefix: "cozumler/" },
  { prefix: "/hizmetler/", targetPrefix: "hizmetler/" },
  { prefix: "/kurumsal/", targetPrefix: "kurumsal/" },
  { prefix: "/iletisim/", targetPrefix: "iletisim/" },
  { prefix: "/novves/", targetPrefix: "" },
];

/** Legacy subdomains mapped to target locale on the new site. */
export const LEGACY_ALT_HOST_LOCALE: Record<string, "tr" | "en"> = {
  "en.novves.com": "en",
  "www.en.novves.com": "en",
  "shop.novves.com": "tr",
  "www.shop.novves.com": "tr",
};

function normalizeLegacyPath(pathname: string): string {
  let p = pathname.trim();
  if (!p.startsWith("/")) p = `/${p}`;
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p.toLowerCase();
}

function buildLocalePath(locale: string, pathAfterLocale: string): string {
  return pathAfterLocale ? `/${locale}/${pathAfterLocale}` : `/${locale}`;
}

function resolveHyphenLegacy(key: string, locale: "tr" | "en"): string | null {
  for (const section of LEGACY_HYPHEN_SECTIONS) {
    const re = new RegExp(`^/${section}-([a-z0-9-]+)(?:\\.html)?$`, "i");
    const m = key.match(re);
    if (m) {
      return buildLocalePath(locale, `${section}/${m[1]}`);
    }
  }
  return null;
}

/** Map legacy URL to new localized path. Returns null when no match. */
export function resolveLegacyRedirect(
  pathname: string,
  locale: "tr" | "en" = "tr",
): string | null {
  const key = normalizeLegacyPath(pathname);

  const hyphen = resolveHyphenLegacy(key, locale);
  if (hyphen) return hyphen;

  const exact = LEGACY_PATH_TARGETS[key];
  if (exact !== undefined) {
    return buildLocalePath(locale, exact);
  }

  for (const { prefix, targetPrefix } of LEGACY_NESTED_PREFIXES) {
    if (!key.startsWith(prefix)) continue;
    const rest = key.slice(prefix.length).replace(/\.html$/i, "");
    if (!rest) {
      const parentKey = prefix.slice(0, -1);
      const parent = LEGACY_PATH_TARGETS[parentKey] ?? LEGACY_PATH_TARGETS[prefix];
      if (parent !== undefined) return buildLocalePath(locale, parent);
      continue;
    }
    const joined = targetPrefix ? `${targetPrefix}${rest}` : rest;
    return buildLocalePath(locale, joined);
  }

  if (/\.html$/i.test(key)) {
    const bare = key.replace(/\.html$/i, "");
    const bareHyphen = resolveHyphenLegacy(bare, locale);
    if (bareHyphen) return bareHyphen;
    const bareTarget = LEGACY_PATH_TARGETS[bare];
    if (bareTarget !== undefined) return buildLocalePath(locale, bareTarget);
  }

  return null;
}

/** Redirect legacy subdomains (en.novves.com, shop.novves.com) to canonical www paths. */
export function resolveLegacyHostRedirect(
  host: string,
  pathname: string,
): string | null {
  const locale = LEGACY_ALT_HOST_LOCALE[host];
  if (!locale) return null;

  const mapped = resolveLegacyRedirect(pathname, locale);
  if (mapped) return mapped;

  if (locale === "en") {
    const first = pathname.split("/").filter(Boolean)[0];
    const localeCodes = ["tr", "en", "ru", "ar", "de", "it", "fr", "az", "kk", "tg", "es", "zh", "ur", "lt", "pl"];
    if (first && localeCodes.includes(first)) {
      return pathname.startsWith("/") ? pathname : `/${pathname}`;
    }
    if (pathname === "/" || pathname === "") return "/en";
    return pathname.startsWith("/") ? `/en${pathname}` : `/en/${pathname}`;
  }

  return "/tr/urunler/hava-hareketi";
}

/** next.config.ts permanent redirects (default locale TR). */
export function getLegacyNextRedirects(): NextRedirectRule[] {
  const seen = new Set<string>();
  const rules: NextRedirectRule[] = [];

  const add = (source: string, destination: string) => {
    if (seen.has(source)) return;
    seen.add(source);
    rules.push({ source, destination, permanent: true });
  };

  for (const section of LEGACY_HYPHEN_SECTIONS) {
    add(`/${section}-:slug.html`, `/tr/${section}/:slug`);
    add(`/${section}-:slug`, `/tr/${section}/:slug`);
  }

  for (const [source, target] of Object.entries(LEGACY_PATH_TARGETS)) {
    if (source === "/" || source === "") continue;
    add(source, buildLocalePath("tr", target));
    if (!source.endsWith("/")) add(`${source}/`, buildLocalePath("tr", target));
  }

  return rules;
}
