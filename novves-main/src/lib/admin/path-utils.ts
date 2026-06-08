/** Get/set nested values by dot path with optional array indices: "items[0].q" */

export function getByPath(data: unknown, path: string): unknown {
  if (!path) return data;
  const parts = path.split(/\.|\[(\d+)\]/).filter(Boolean);
  let current: unknown = data;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    const num = Number(part);
    if (!isNaN(num) && Array.isArray(current)) {
      current = current[num];
    } else if (typeof current === "object") {
      current = (current as Record<string, unknown>)[part];
    } else {
      return undefined;
    }
  }
  return current;
}

export function setByPath(data: unknown, path: string, value: unknown): unknown {
  const copy = JSON.parse(JSON.stringify(data));
  const parts = path.split(/\.|\[(\d+)\]/).filter(Boolean);
  let obj: Record<string, unknown> | unknown[] = copy;
  for (let i = 0; i < parts.length - 1; i++) {
    const p = parts[i];
    const num = Number(p);
    if (!isNaN(num)) {
      obj = (obj as unknown[])[num] as Record<string, unknown>;
    } else {
      obj = (obj as Record<string, unknown>)[p] as Record<string, unknown>;
    }
  }
  const last = parts[parts.length - 1];
  const lastNum = Number(last);
  if (!isNaN(lastNum)) {
    (obj as unknown[])[lastNum] = value;
  } else {
    (obj as Record<string, unknown>)[last] = value;
  }
  return copy;
}

export function getArrayPath(path: string): string | null {
  const match = path.match(/^(.+)\[\]/);
  return match ? match[1] : null;
}

export function isAdvancedKey(key: string): boolean {
  const lower = key.toLowerCase();
  return (
    lower.includes("href") ||
    lower.includes("arialabel") ||
    lower.includes("aria") ||
    lower.endsWith("classname") ||
    lower === "id" ||
    lower === "scroll" ||
    lower.includes("iframe")
  );
}
