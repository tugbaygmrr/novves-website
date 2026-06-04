import fs from "fs";
import path from "path";
import { getPublicDir } from "@/lib/public-dir";

/** JSON yolu → repoda mevcut dosya */
const IMAGE_ALIASES: Record<string, string> = {
  "/images/products/diferansiyel-basinc-sensoru.jpg": "/images/products/diferansiyel-basinc-sensoru.png",
  "/images/products/diferansiyel-basinc-sensoru-pi10v.jpg":
    "/images/products/diferansiyel-basinc-sensoru.png",
  "/images/products/kanal-tipi-duman-sensoru.jpg": "/images/products/kanal-tipi-duman-sensoru.png",
};

/** Dosya adı (uzantısız) → mevcut ürün görseli */
const BASENAME_ALIASES: Record<string, string> = {
  "ae-sf-baglanti-ayaklari": "/images/products/yayli-titresim-izolatoru.png",
  "ae-pm-tel-kafes": "/images/products/ae-fjf.png",
  "ae-ic-giris-konisi": "/images/products/ae-fjf.png",
  "ae-cf-karsi-flans": "/images/products/ae-fjf.png",
  "ae-fj2f": "/images/products/ae-fjf.png",
  "ae-sd100": "/images/products/ae-fjf.png",
  "ae-rs": "/images/products/ae-fjf.png",
  "ae-dfc": "/images/products/ae-fjf.png",
  "ae-frs": "/images/products/heron-rv.png",
  "emniyet-salteri": "/images/products/basinclandirma-kontrol-panosu.png",
  "korumali-emniyet-salteri": "/images/products/basinclandirma-kontrol-panosu.png",
  "monofaze-hiz-kontrol-cihazi": "/images/products/basinclandirma-kontrol-panosu.png",
  "g4-panel-filtre": "/images/products/cyclone.png",
  "g2-g3-panel-filtre": "/images/products/cyclone.png",
  "g2-metal-yag-tutucu-filtre": "/images/products/cyclone.png",
  "g2-g3-metal-yag-tutucu-filtre": "/images/products/cyclone.png",
  free: "/images/products/ae-fjf.png",
};

const ACCESSORY_KEYWORD_FALLBACK: { match: RegExp; image: string }[] = [
  { match: /susturucu|silencer/i, image: "/images/products/ae-fjf.png" },
  { match: /filtre|filter/i, image: "/images/products/cyclone.png" },
  { match: /şalter|switch/i, image: "/images/products/basinclandirma-kontrol-panosu.png" },
  { match: /sensör|sensor|invertör|inverter|kontrol|panos/i, image: "/images/products/basinclandirma-kontrol-panosu.png" },
  { match: /flanş|flexibl|bağlantı|kafes|konisi|koni/i, image: "/images/products/ae-fjf.png" },
  { match: /ısıtıcı|isitici/i, image: "/images/products/elektrikli-isitici.png" },
  { match: /çatı|cati|adaptör|soket|başlık|baslik|çıkış|cikis/i, image: "/images/products/heron-rv.png" },
  { match: /kanat|yönlendirici|yonlendirici/i, image: "/images/products/ae-fjf.png" },
  { match: /izolatör|titreşim/i, image: "/images/products/yayli-titresim-izolatoru.png" },
  { match: /ayak|montaj/i, image: "/images/products/yayli-titresim-izolatoru.png" },
  { match: /kutu/i, image: "/images/products/heron-rv.png" },
];

function stripQueryHash(src: string): string {
  return src.split(/[?#]/)[0];
}

function fileExists(publicPath: string): boolean {
  const clean = stripQueryHash(publicPath);
  if (!clean.startsWith("/")) return false;
  const full = path.join(getPublicDir(), clean.replace(/^\//, ""));
  try {
    return fs.statSync(full).isFile();
  } catch {
    return false;
  }
}

function extensionVariants(src: string): string[] {
  const out = [src];
  if (src.endsWith(".jpg")) out.push(src.replace(/\.jpg$/i, ".png"));
  if (src.endsWith(".jpeg")) out.push(src.replace(/\.jpeg$/i, ".png"));
  if (src.endsWith(".png")) out.push(src.replace(/\.png$/i, ".jpg"));
  return out;
}

function basenameFromPublicPath(src: string): string | undefined {
  const base = path.basename(src).replace(/\.[^.]+$/, "");
  return base || undefined;
}

function keywordFallback(label: string): string | undefined {
  for (const { match, image } of ACCESSORY_KEYWORD_FALLBACK) {
    if (match.test(label) && fileExists(image)) return image;
  }
  return undefined;
}

/**
 * `public/` altında dosya var mı kontrol eder; yoksa anlamlı yedek döner.
 */
export function resolvePublicImage(
  src: string,
  options?: { fallback?: string; label?: string },
): string {
  const fallback =
    options?.fallback ?? "/images/products/categories/aksesuarlar-card-hero.png";
  const trimmed = src.trim();

  // JSON’da tanımlı dosya varsa doğrudan kullan (etiket anahtar sözcüğü yanlış eşlemesin)
  const pathOnly = stripQueryHash(trimmed);
  const cacheSuffix = trimmed.slice(pathOnly.length);

  if (pathOnly) {
    for (const variant of extensionVariants(pathOnly)) {
      if (fileExists(variant)) return variant + cacheSuffix;
    }
  }

  const candidates: string[] = [];

  if (pathOnly) {
    const alias = IMAGE_ALIASES[pathOnly];
    if (alias) candidates.push(alias);
    candidates.push(...extensionVariants(pathOnly));

    const base = basenameFromPublicPath(pathOnly);
    if (base && BASENAME_ALIASES[base]) candidates.push(BASENAME_ALIASES[base]);
  }

  if (options?.label) {
    const kw = keywordFallback(options.label);
    if (kw) candidates.push(kw);
  }

  candidates.push(fallback);

  const seen = new Set<string>();
  for (const c of candidates) {
    if (!c || seen.has(c)) continue;
    seen.add(c);
    if (fileExists(c)) return c + cacheSuffix;
  }

  return fallback;
}

export function hasPublicImage(src: string): boolean {
  const resolved = resolvePublicImage(src, {
    fallback: "__missing__",
    label: "",
  });
  return resolved !== "__missing__";
}
