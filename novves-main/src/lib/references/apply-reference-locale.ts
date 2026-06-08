import type { Locale } from "@/i18n/config";
import type { Reference } from "@/data/references";
import { translateReferenceFields } from "./reference-translator";

export function applyReferenceLocale(reference: Reference, locale: Locale): Reference {
  if (locale === "tr") return reference;
  const translated = translateReferenceFields(reference.id, reference.title, reference.description, locale);
  return { ...reference, ...translated };
}

export function applyReferencesLocale(references: Reference[], locale: Locale): Reference[] {
  if (locale === "tr") return references;
  return references.map((item) => applyReferenceLocale(item, locale));
}
