#!/usr/bin/env node
/**
 * Post-deploy SEO verification (audit section 07).
 * Usage:
 *   npm run seo:verify
 *   npm run seo:verify -- --base=https://www.novves.com
 *   npm run seo:verify -- --base=http://localhost:3000 --paths=/tr,/en/urunler/duman-isi-tahliye-fanlari
 */

const DEFAULT_BASE = process.env.SEO_VERIFY_BASE ?? "https://www.novves.com";
const DEFAULT_PATHS = ["/tr", "/en", "/tr/urunler/duman-isi-tahliye-fanlari", "/tr/cozumler/duman-isi-tahliye-sistemleri"];

function parseArgs() {
  const args = process.argv.slice(2);
  let base = DEFAULT_BASE;
  let paths = [...DEFAULT_PATHS];
  for (const arg of args) {
    if (arg.startsWith("--base=")) base = arg.slice(7).replace(/\/$/, "");
    if (arg.startsWith("--paths=")) paths = arg.slice(8).split(",").filter(Boolean);
  }
  return { base, paths };
}

async function fetchText(url, label) {
  const res = await fetch(url, {
    headers: { "User-Agent": "novves-seo-verify/1.0" },
    redirect: "follow",
  });
  const text = await res.text();
  return { url, label, status: res.status, ok: res.ok, text, finalUrl: res.url };
}

function extractMeta(html, attr, key) {
  const re = new RegExp(
    `<meta[^>]+${attr}=["']${key}["'][^>]+content=["']([^"']+)["']|<meta[^>]+content=["']([^"']+)["'][^>]+${attr}=["']${key}["']`,
    "i",
  );
  const m = html.match(re);
  return m?.[1] ?? m?.[2] ?? null;
}

function extractLink(html, rel) {
  const re = new RegExp(
    `<link[^>]+rel=["']${rel}["'][^>]+href=["']([^"']+)["']|<link[^>]+href=["']([^"']+)["'][^>]+rel=["']${rel}["']`,
    "i",
  );
  const m = html.match(re);
  return m?.[1] ?? m?.[2] ?? null;
}

function extractAll(html, pattern) {
  return [...html.matchAll(pattern)].map((m) => m[1] ?? m[0]);
}

function checkPage(base, path, html, status) {
  const issues = [];
  const passes = [];
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;

  if (status !== 200) {
    issues.push(`HTTP ${status}`);
    return { url, issues, passes };
  }

  const canonical = extractLink(html, "canonical");
  if (!canonical) issues.push("missing canonical");
  else if (!canonical.startsWith("http")) issues.push(`canonical not absolute: ${canonical}`);
  else if (canonical.includes("localhost")) issues.push(`canonical points to localhost: ${canonical}`);
  else passes.push(`canonical: ${canonical}`);

  const hreflang = extractAll(html, /hreflang=["']([^"']+)["']/gi);
  if (hreflang.length < 10) issues.push(`hreflang count low: ${hreflang.length} (expected ~16 incl. x-default)`);
  else passes.push(`hreflang tags: ${hreflang.length}`);

  if (!hreflang.includes("x-default")) issues.push("missing hreflang x-default");
  else passes.push("x-default present");

  const ogTitle = extractMeta(html, "property", "og:title");
  const ogDesc = extractMeta(html, "property", "og:description");
  const ogUrl = extractMeta(html, "property", "og:url");
  const ogImage = extractMeta(html, "property", "og:image");

  if (!ogTitle) issues.push("missing og:title");
  else passes.push(`og:title present`);

  if (!ogDesc) issues.push("missing og:description");
  else if (ogDesc.toLowerCase().includes("industrial ventilation, smoke control and air management")) {
    issues.push("og:description looks like site default, not page-specific");
  } else passes.push("og:description page-specific");

  if (!ogUrl) issues.push("missing og:url");
  else passes.push("og:url present");

  if (!ogImage) issues.push("missing og:image");
  else if (!ogImage.includes("/og?")) issues.push(`og:image not dynamic /og route: ${ogImage.slice(0, 80)}`);
  else passes.push("og:image dynamic");

  const jsonLdCount = (html.match(/application\/ld\+json/gi) ?? []).length;
  if (jsonLdCount === 0) issues.push("no JSON-LD blocks");
  else passes.push(`JSON-LD blocks: ${jsonLdCount}`);

  return { url, issues, passes };
}

function checkRobots(text, base) {
  const issues = [];
  const passes = [];
  if (!/User-agent:\s*\*/i.test(text)) issues.push("missing User-agent: *");
  else passes.push("User-agent: *");

  if (!/Allow:\s*\//i.test(text)) issues.push("missing Allow: /");
  else passes.push("Allow: /");

  if (!/Sitemap:/i.test(text)) issues.push("missing Sitemap directive");
  else {
    const m = text.match(/Sitemap:\s*(.+)/i);
    if (m && !m[1].includes("novves.com") && base.includes("novves.com")) {
      issues.push(`Sitemap URL may be wrong: ${m[1].trim()}`);
    } else passes.push(`Sitemap: ${m?.[1]?.trim() ?? "found"}`);
  }

  if (/Disallow:\s*\/$/m.test(text)) issues.push("Disallow: / would block entire site");
  return { issues, passes };
}

function checkSitemapXml(text, label) {
  const issues = [];
  const passes = [];
  if (!text.includes("<urlset") && !text.includes("<sitemapindex")) {
    issues.push(`${label}: not valid sitemap XML`);
    return { issues, passes };
  }
  passes.push(`${label}: valid XML`);
  const locCount = (text.match(/<loc>/g) ?? []).length;
  if (locCount > 0) passes.push(`${label}: ${locCount} <loc> entries`);
  const hreflangCount = (text.match(/hreflang=/g) ?? []).length;
  if (hreflangCount > 0) passes.push(`${label}: hreflang in sitemap (${hreflangCount})`);
  else if (text.includes("<urlset")) issues.push(`${label}: no hreflang alternates in url entries`);
  return { issues, passes };
}

async function main() {
  const { base, paths } = parseArgs();
  console.log(`\nSEO verify — base: ${base}\n${"=".repeat(50)}`);

  let fail = 0;

  // robots.txt
  try {
    const robots = await fetchText(`${base}/robots.txt`, "robots.txt");
    if (!robots.ok) {
      console.log(`\n[FAIL] robots.txt — HTTP ${robots.status}`);
      fail++;
    } else {
      const r = checkRobots(robots.text, base);
      console.log("\nrobots.txt");
      r.passes.forEach((p) => console.log(`  [OK] ${p}`));
      r.issues.forEach((i) => {
        console.log(`  [FAIL] ${i}`);
        fail++;
      });
    }
  } catch (e) {
    console.log(`\n[FAIL] robots.txt — ${e.message}`);
    fail++;
  }

  // sitemap
  for (const smPath of ["/sitemap.xml", "/sitemap/tr.xml"]) {
    try {
      const sm = await fetchText(`${base}${smPath}`, smPath);
      if (!sm.ok) {
        console.log(`\n[FAIL] ${smPath} — HTTP ${sm.status}`);
        fail++;
        continue;
      }
      const s = checkSitemapXml(sm.text, smPath);
      console.log(`\n${smPath}`);
      s.passes.forEach((p) => console.log(`  [OK] ${p}`));
      s.issues.forEach((i) => {
        console.log(`  [FAIL] ${i}`);
        fail++;
      });
    } catch (e) {
      console.log(`\n[FAIL] ${smPath} — ${e.message}`);
      fail++;
    }
  }

  // sample pages
  for (const path of paths) {
    try {
      const page = await fetchText(`${base}${path}`, path);
      const result = checkPage(base, path, page.text, page.status);
      console.log(`\n${result.url}`);
      result.passes.forEach((p) => console.log(`  [OK] ${p}`));
      result.issues.forEach((i) => {
        console.log(`  [FAIL] ${i}`);
        fail++;
      });
    } catch (e) {
      console.log(`\n[FAIL] ${path} — ${e.message}`);
      fail++;
    }
  }

  // og image route
  try {
    const og = await fetchText(`${base}/og?title=SEO+Verify`, "/og");
    if (og.status === 200 && og.text.length > 1000) {
      console.log("\n/og dynamic image");
      console.log("  [OK] responds with image payload");
    } else {
      console.log(`\n[FAIL] /og — HTTP ${og.status} or empty`);
      fail++;
    }
  } catch (e) {
    console.log(`\n[FAIL] /og — ${e.message}`);
    fail++;
  }

  console.log(`\n${"=".repeat(50)}`);
  if (fail === 0) {
    console.log("All automated checks passed.");
    process.exit(0);
  } else {
    console.log(`${fail} issue(s) found. Cross-check with GSC + Rich Results Test.`);
    process.exit(1);
  }
}

main();
