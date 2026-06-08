#!/usr/bin/env node
/**
 * Capture real homepage section screenshots for admin panel previews.
 * Requires: dev server on BASE_URL, playwright (`npx playwright install chromium` once).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public/images/admin-previews/home");
const BASE_URL = process.env.ADMIN_PREVIEW_URL || "http://localhost:3000/tr";
const CONSENT_KEY = "NOVVES_cookie_consent_v2";
const CONSENT_VALUE = JSON.stringify({ analytics: true, marketing: true });

const HIDE_CHROME_CSS = `
  nav.fixed.end-0 { display: none !important; }
  [id^="cookie"], [data-cookie-banner] { display: none !important; }
  #animation-2 .hero-cert-marquee-track { visibility: hidden !important; }
  #animation-2 .absolute.right-5 { display: none !important; }
`;

async function injectHideChrome(page) {
  await page.addStyleTag({ content: HIDE_CHROME_CSS });
}

/** Hero onizleme: canli siteye dokunmadan screenshot icin pervane karesine seek. */
async function prepareHeroFanVisual(page) {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  await page.evaluate(() => {
    const v = document.querySelector("#animation-2 video");
    if (v) {
      v.preload = "auto";
      v.load();
      window.dispatchEvent(new WheelEvent("wheel", { bubbles: true }));
    }
  });

  await page
    .waitForFunction(() => {
      const v = document.querySelector("#animation-2 video");
      return v && v.readyState >= 2 && Number.isFinite(v.duration) && v.duration > 0.1;
    }, { timeout: 20000 })
    .catch(() => {});

  await scrollHeroProgress(page, 0.14);
  await page.waitForTimeout(1100);

  await page.evaluate(() => {
    const v = document.querySelector("#animation-2 video");
    if (!v || !Number.isFinite(v.duration)) return;
    v.currentTime = Math.min(v.duration * 0.44, v.duration - 0.05);
    v.style.objectPosition = "88% center";
    v.style.transform = "translateZ(0) scale(1.06)";
  });

  await page.waitForTimeout(500);
  await injectHideChrome(page);
}

async function scrollHeroProgress(page, progress) {
  await page.evaluate((p) => {
    const container = document.getElementById("animation-2");
    if (!container) return;
    const start = container.offsetTop;
    const end = start + container.offsetHeight - window.innerHeight;
    const range = Math.max(end - start, 1);
    window.scrollTo(0, start + p * range);
  }, progress);
}

async function waitHeroProgress(page, minProgress) {
  await page
    .waitForFunction(
      (min) => {
        const container = document.getElementById("animation-2");
        if (!container) return false;
        const start = container.offsetTop;
        const end = start + container.offsetHeight - window.innerHeight;
        const range = Math.max(end - start, 1);
        const progress = (window.scrollY - start) / range;
        const wrap = document.querySelector('[data-admin-preview="hero-end-wrap"]');
        const endOpacity = wrap ? parseFloat(wrap.style.opacity || "0") : 0;
        return progress >= min - 0.02 || endOpacity >= 0.85;
      },
      minProgress,
      { timeout: 12000 }
    )
    .catch(() => {});
  await page.waitForTimeout(900);
}

/** sectionKey -> { selector, prep?: async (page) => void, clipHeight?: number } */
const HOME_CAPTURES = [
  {
    key: "hero",
    selector: '[data-admin-preview="hero-viewport"]',
    prep: prepareHeroFanVisual,
    clipHeight: 720,
  },
  {
    key: "animation2",
    selector: '[data-admin-preview="hero-end"]',
    prep: async (page) => {
      await scrollHeroProgress(page, 0.93);
      await waitHeroProgress(page, 0.88);
      await injectHideChrome(page);
    },
  },
  { key: "solutionCarouselByHref", selector: "#solution-categories" },
  { key: "productCategories", selector: "#product-categories" },
  {
    key: "productCategoryBlurbs",
    selector: "#product-categories [data-product-strip-card]",
    prep: async (page) => {
      await page.locator("#product-categories").scrollIntoViewIfNeeded();
    },
  },
  {
    key: "productCategoryFeatures",
    selector: "#product-categories [data-product-strip-card]:first-child",
  },
  { key: "catalogPreview", selector: "#catalogs" },
  { key: "referencePreview", selector: "#references" },
  { key: "certificatePreview", selector: "#certificates" },
  { key: "engineeringPillarsSection", selector: "#pillars-journey header" },
  { key: "pillars", selector: "#pillars-journey .grid.grid-cols-1.gap-8" },
  {
    key: "engineeringShowcase",
    selector: "#engineering .border-b.border-ink\\/10",
    prep: async (page) => {
      await page.locator("#pillars-journey").scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
    },
  },
  { key: "faq", selector: "#faq .lg\\:col-span-8" },
  { key: "finalCta", selector: "#faq aside" },
  { key: "companyProfileSection", selector: "#company-profile" },
];

async function captureLocator(page, loc, outPath, clipHeight) {
  await loc.scrollIntoViewIfNeeded({ timeout: 15000 });
  await page.waitForTimeout(400);

  if (clipHeight) {
    const box = await loc.boundingBox();
    if (box) {
      await page.screenshot({
        path: outPath,
        type: "png",
        clip: {
          x: box.x,
          y: box.y,
          width: box.width,
          height: Math.min(box.height, clipHeight),
        },
      });
      return;
    }
  }

  await loc.screenshot({ path: outPath, type: "png" });
}

async function main() {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    console.error("Playwright yok. Calistirin: npm install -D playwright && npx playwright install chromium");
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    locale: "tr-TR",
  });

  await context.addInitScript(
    (key, value) => {
      try {
        localStorage.setItem(key, value);
      } catch {
        /* ignore */
      }
    },
    CONSENT_KEY,
    CONSENT_VALUE
  );

  const page = await context.newPage();

  console.log("Loading", BASE_URL);
  const res = await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 120000 });
  if (!res || !res.ok()) {
    console.error("Sayfa yuklenemedi:", res?.status());
    await browser.close();
    process.exit(1);
  }

  const acceptBtn = page.getByRole("button", { name: /kabul|accept|t\u00fcm\u00fcn\u00fc/i }).first();
  if (await acceptBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
    await acceptBtn.click();
    await page.waitForTimeout(500);
  }

  await page.evaluate(() => {
    localStorage.setItem("NOVVES_cookie_consent_v2", JSON.stringify({ analytics: true, marketing: true }));
    window.dispatchEvent(
      new CustomEvent("novves:cookie-consent-updated", {
        detail: { analytics: true, marketing: true },
      })
    );
  });
  await page.waitForTimeout(1200);

  const captured = [];

  for (const item of HOME_CAPTURES) {
    const outPath = path.join(OUT_DIR, `${item.key}.png`);
    try {
      if (item.prep) await item.prep(page);
      const loc = page.locator(item.selector).first();
      await captureLocator(page, loc, outPath, item.clipHeight);
      captured.push(item.key);
      console.log("OK", item.key);
    } catch (err) {
      console.warn("SKIP", item.key, err.message?.slice(0, 120));
    }
  }

  try {
    const nav = page.locator("header").first();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await nav.screenshot({ path: path.join(OUT_DIR, "pageChrome.png"), type: "png" });
    captured.push("pageChrome");
    console.log("OK", "pageChrome");
  } catch (e) {
    console.warn("SKIP pageChrome", e.message);
  }

  await browser.close();

  const metaPath = path.join(ROOT, "src/lib/admin/section-preview-meta.ts");
  let meta = fs.readFileSync(metaPath, "utf8");
  for (const key of captured) {
    const webPath = `/images/admin-previews/home/${key}.png`;
    const re = new RegExp(`(home:\\s*\\{[\\s\\S]*?${key}:\\s*\\{[\\s\\S]*?image:\\s*")[^"]+(")`, "m");
    if (re.test(meta)) {
      meta = meta.replace(re, `$1${webPath}$2`);
    }
  }
  fs.writeFileSync(metaPath, meta, "utf8");
  new TextDecoder("utf-8", { fatal: true }).decode(fs.readFileSync(metaPath));

  console.log(`\nCaptured ${captured.length} previews -> public/images/admin-previews/home/`);
  console.log("Updated section-preview-meta.ts image paths");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
