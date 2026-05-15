import fs from "fs";

/** Sunucu tarafı JSON dosyası — boş içerik ve geçersiz JSON için anlamlı hata. */
export function readJsonFile<T = unknown>(filePath: string): T {
  if (!fs.existsSync(filePath)) {
    throw new Error(`JSON file not found: ${filePath}`);
  }
  const raw = fs.readFileSync(filePath, "utf-8").trim();
  if (!raw) {
    throw new Error(`JSON file is empty: ${filePath}`);
  }
  try {
    return JSON.parse(raw) as T;
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    throw new Error(`Invalid JSON in ${filePath}: ${detail}`);
  }
}

/** İstemci veya API yanıtı — boş gövde SyntaxError üretmez. */
export function parseJsonText<T = unknown>(raw: string): T | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed) as T;
  } catch {
    return null;
  }
}
