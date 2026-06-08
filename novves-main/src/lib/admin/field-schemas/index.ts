import type { SectionSchema } from "./types";
import { HOME_SCHEMAS } from "./home";
import { COMMON_SCHEMAS } from "./common";
import { CONTACT_SCHEMAS } from "./contact";
import { PARTNER_SCHEMA } from "./partner";

export type { FieldSchema, FieldType, SectionSchema } from "./types";

const ALL_SCHEMAS: SectionSchema[] = [
  ...HOME_SCHEMAS,
  ...COMMON_SCHEMAS,
  ...CONTACT_SCHEMAS,
  PARTNER_SCHEMA,
];

const SCHEMA_MAP = new Map<string, SectionSchema>();
for (const schema of ALL_SCHEMAS) {
  SCHEMA_MAP.set(`${schema.file}:${schema.section}`, schema);
}

export function getSectionSchema(
  file: string,
  section: string
): SectionSchema | null {
  return SCHEMA_MAP.get(`${file}:${section}`) ?? null;
}

export function hasSectionSchema(file: string, section: string): boolean {
  return SCHEMA_MAP.has(`${file}:${section}`);
}
