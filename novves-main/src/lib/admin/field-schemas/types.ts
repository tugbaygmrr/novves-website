export type FieldType =
  | "text"
  | "textarea"
  | "image"
  | "icon"
  | "link"
  | "number"
  | "toggle"
  | "list";

export type FieldSchema = {
  path: string;
  label: string;
  help?: string;
  type: FieldType;
  maxLength?: number;
  rows?: number;
  advancedOnly?: boolean;
  /** For list type: fields inside each array item */
  itemFields?: FieldSchema[];
  /** Label for the list section */
  listLabel?: string;
};

export type SectionSchema = {
  file: string;
  section: string;
  title: string;
  description?: string;
  /** Section data is a top-level array (e.g. home.pillars) */
  rootIsArray?: boolean;
  fields: FieldSchema[];
};
