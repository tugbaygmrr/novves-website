/** Türkçe karakter-duyarlı URL slug üretir. */
export function slugify(input: string, fallback = "icerik"): string {
  const slug = input
    .toLowerCase()
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 120);
  return slug || fallback;
}
