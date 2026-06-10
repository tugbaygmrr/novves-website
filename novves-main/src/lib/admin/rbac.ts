// Saf RBAC mantığı (client + server). Sunucuya özel kontroller: rbac-server.ts

// ── Roller ────────────────────────────────────────────────────────────────────
export const ROLES = [
  "SUPER_ADMIN",
  "ADMIN",
  "EDITOR",
  "SEO_SPECIALIST",
  "CONTENT_EDITOR",
] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABELS: Record<Role, string> = {
  SUPER_ADMIN: "Süper Admin",
  ADMIN: "Admin",
  EDITOR: "Editör",
  SEO_SPECIALIST: "SEO Uzmanı",
  CONTENT_EDITOR: "İçerik Editörü",
};

// ── Modüller ve eylemler ──────────────────────────────────────────────────────
export type AdminModule =
  | "dashboard"
  | "home"
  | "products"
  | "solutions"
  | "services"
  | "technical"
  | "references"
  | "team"
  | "mediaCenter"
  | "blog"
  | "seo"
  | "menu"
  | "contact"
  | "mediaLibrary"
  | "users";

export type Action = "read" | "write" | "delete" | "publish";

export type AuthedUser = { username: string; role: Role };

const CONTENT_MODULES: AdminModule[] = [
  "home",
  "products",
  "solutions",
  "services",
  "technical",
  "references",
  "team",
  "mediaCenter",
  "blog",
];

/** rol → izin matrisi. `true` döndürürse eylem serbest. */
export function can(role: Role, mod: AdminModule, action: Action): boolean {
  switch (role) {
    case "SUPER_ADMIN":
      return true;
    case "ADMIN":
      return mod === "users" ? action === "read" : true;
    case "EDITOR":
      if (mod === "users") return false;
      if (mod === "seo" || mod === "menu") return action === "read";
      if (mod === "contact") return action !== "delete";
      if (CONTENT_MODULES.includes(mod) || mod === "mediaLibrary") return true;
      return action === "read";
    case "SEO_SPECIALIST":
      if (mod === "seo") return true;
      if (mod === "menu") return action === "read" || action === "write";
      if (mod === "users") return false;
      return action === "read";
    case "CONTENT_EDITOR":
      if (mod === "users" || mod === "seo" || mod === "menu") return false;
      if (CONTENT_MODULES.includes(mod) || mod === "mediaLibrary") {
        return action === "read" || action === "write";
      }
      if (mod === "contact") return action === "read";
      return action === "read";
    default:
      return false;
  }
}

/** "admin" gibi eski rolleri yeni enum'a normalize et. */
export function normalizeRole(raw: string): Role {
  if (raw === "admin" || raw === "superadmin") return "SUPER_ADMIN";
  return (ROLES as readonly string[]).includes(raw) ? (raw as Role) : "CONTENT_EDITOR";
}
