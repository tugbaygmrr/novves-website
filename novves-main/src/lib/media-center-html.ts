import "server-only";
import fs from "node:fs/promises";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "medya-merkezi");

export const MEDIA_CENTER_HTML_PATH = path.join(CONTENT_DIR, "code.html");
export const PATENTS_HTML_PATH = path.join(CONTENT_DIR, "patents-code.html");

export async function readMediaCenterHtml(): Promise<string> {
  return fs.readFile(MEDIA_CENTER_HTML_PATH, "utf8");
}

export async function readPatentsHtml(): Promise<string> {
  return fs.readFile(PATENTS_HTML_PATH, "utf8");
}

export function mediaCenterHtmlMissingMessage(which: "media" | "patents"): string {
  const filePath = which === "media" ? MEDIA_CENTER_HTML_PATH : PATENTS_HTML_PATH;
  const title =
    which === "media" ? "Medya Merkezi kod dosyas? bulunamad?." : "Patentler sayfas? kod dosyas? bulunamad?.";
  return `
    <!doctype html>
    <html lang="tr">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>${which === "media" ? "Medya Merkezi" : "Patentlerimiz"}</title>
        <style>
          body { font-family: Inter, Arial, sans-serif; padding: 24px; }
          .card { border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; background: #fff; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>${title}</h2>
          <p>Beklenen dosya:</p>
          <code>${filePath}</code>
        </div>
      </body>
    </html>
  `;
}
