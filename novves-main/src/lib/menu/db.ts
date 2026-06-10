import "server-only";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

export type PublicMenuItem = {
  id: number;
  href: string;
  label: string;
  icon: string | null;
  external: boolean;
  children: PublicMenuItem[];
};

/** Etiketi istenen dile göre çöz; yoksa en → tr → ilk çeviriye düş. */
function resolveLabel(
  translations: { locale: string; label: string }[],
  locale: string,
): string {
  return (
    translations.find((t) => t.locale === locale)?.label ??
    translations.find((t) => t.locale === "en")?.label ??
    translations.find((t) => t.locale === "tr")?.label ??
    translations[0]?.label ??
    ""
  );
}

/**
 * Bir konumdaki görünür menü öğelerini (üst seviye + alt öğeler), seçili dilde döndürür.
 * DB erişilemezse veya satır yoksa boş dizi döner — çağıran bileşen sabit içeriğe (fallback) düşer.
 */
export const getMenu = cache(async (location: string, locale: string): Promise<PublicMenuItem[]> => {
  try {
    const rows = await prisma.menuItem.findMany({
      where: { location, visible: true },
      orderBy: [{ order: "asc" }, { id: "asc" }],
      include: { translations: { select: { locale: true, label: true } } },
    });

    const byId = new Map<number, PublicMenuItem>();
    for (const r of rows) {
      byId.set(r.id, {
        id: r.id,
        href: r.href,
        label: resolveLabel(r.translations, locale),
        icon: r.icon,
        external: r.external,
        children: [],
      });
    }

    const roots: PublicMenuItem[] = [];
    for (const r of rows) {
      const node = byId.get(r.id)!;
      if (r.parentId && byId.has(r.parentId)) {
        byId.get(r.parentId)!.children.push(node);
      } else {
        roots.push(node);
      }
    }
    return roots;
  } catch {
    return [];
  }
});
