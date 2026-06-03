import fs from "node:fs/promises";
import path from "node:path";
import {
  HIZMETLER_TAILWIND_CONFIG_SCRIPT,
} from "@/lib/hizmetler-design-tokens";
import hizmetlerTrToLocalesAuto from "@/lib/hizmetler-tr-to-locales.auto.json";

export async function readHizmetlerHtml(): Promise<string> {
  const candidates = [
    path.join(process.cwd(), "public/embed/hizmetler-stitch.html"),
    "C:/Users/Tuğba/Desktop/hizmetler_stitch_digital_document_library/code.html",
  ];
  for (const filePath of candidates) {
    try {
      return await fs.readFile(filePath, "utf8");
    } catch {
      /* try next */
    }
  }
  return "";
}

export function applyReplacementMap(input: string, map: Record<string, string>): string {
  const entries = Object.entries(map).sort((a, b) => b[0].length - a[0].length);
  return entries.reduce((acc, [from, to]) => {
    let next = acc.replaceAll(from, to);
    if (from.includes("&")) next = next.replaceAll(from.replaceAll("&", "&amp;"), to);
    if (from.includes("&amp;")) next = next.replaceAll(from.replaceAll("&amp;", "&"), to);
    return next;
  }, input);
}

export function localizeHizmetlerHtml(locale: string, html: string): string {
  if (locale === "tr") return html;
  const all = hizmetlerTrToLocalesAuto as Record<string, Record<string, string>>;
  const map = all[locale] ?? all.en ?? {};
  return applyReplacementMap(html, map);
}

export function extractMainInnerHtml(fullHtml: string): string {
  const open = fullHtml.indexOf("<main");
  if (open < 0) return "";
  const openEnd = fullHtml.indexOf(">", open);
  if (openEnd < 0) return "";
  const close = fullHtml.indexOf("</main>", openEnd);
  if (close < 0) return "";
  return fullHtml.slice(open, close + "</main>".length);
}

export function stripAsideFromHtml(html: string): string {
  return html.replace(/<aside[\s\S]*?<\/aside>/gi, "");
}

/** Stitch HTML embeds custom Material palette tokens; iframe needs the same config. */
export function extractTailwindConfigScript(fullHtml: string): string {
  const match = fullHtml.match(/<script id="tailwind-config">[\s\S]*?<\/script>/i);
  return match?.[0] ?? HIZMETLER_TAILWIND_CONFIG_SCRIPT;
}

export function buildHubIframeDocument(
  mainHtml: string,
  headExtras = "",
  tailwindConfigScript = "",
): string {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
${tailwindConfigScript}
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
<style>
  body { font-family: Inter, sans-serif; margin: 0; padding: 0; background: #f4f4ea; }
  .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
  .industrial-gradient { background: linear-gradient(135deg, #131B2E 0%, #000000 100%); }
</style>
${headExtras}
</head>
<body class="text-on-surface" style="background-color:#f4f4ea">
${mainHtml}
</body>
</html>`;
}
