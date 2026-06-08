import fs from "fs";
import path from "path";
import type { Locale } from "@/i18n/config";

export function getDictionaryPath(locale: Locale, file: string): string {
  return path.join(
    process.cwd(),
    "src",
    "app",
    "[locale]",
    "dictionaries",
    locale,
    `${file}.json`,
  );
}

export function getPartnerRecordsPath(): string {
  return path.join(
    process.cwd(),
    "src",
    "app",
    "[locale]",
    "iletisim",
    "partnerlerimiz",
    "partner-records.json",
  );
}

export function loadJsonFile(filePath: string): Record<string, unknown> {
  if (!fs.existsSync(filePath)) return {};
  const raw = fs.readFileSync(filePath, "utf-8").trim();
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export function loadJsonArray(filePath: string): unknown[] {
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8").trim();
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function backupFile(filePath: string): void {
  if (fs.existsSync(filePath)) {
    fs.copyFileSync(filePath, `${filePath}.backup`);
  }
}

export function writeJsonFile(filePath: string, data: unknown): void {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf-8");
}
