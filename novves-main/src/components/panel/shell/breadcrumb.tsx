"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { PANEL_BASE, flatNav } from "@/lib/panel/nav";

const TRAILING_LABELS: Record<string, string> = {
  yeni: "Yeni",
  duzenle: "Düzenle",
};

/** Pathname'den kırıntı yolu üretir: Panel › Bölüm › Alt. */
export function Breadcrumb() {
  const pathname = usePathname();
  const rel = pathname.replace(PANEL_BASE, "").replace(/^\/+/, "");
  const segments = rel.split("/").filter(Boolean);

  const section = flatNav().find((it) => pathname.startsWith(it.href));

  const crumbs: { label: string; href?: string }[] = [
    { label: "Panel", href: `${PANEL_BASE}/dashboard` },
  ];

  if (section) {
    crumbs.push({ label: section.label, href: section.href });
    // Bölüm kökünden sonraki segmentler (yeni / id)
    const sectionSlug = section.href.split("/").pop();
    const idx = segments.indexOf(sectionSlug ?? "");
    const rest = idx >= 0 ? segments.slice(idx + 1) : [];
    rest.forEach((seg) => {
      const label = TRAILING_LABELS[seg] ?? (/^\d+$/.test(seg) ? "Düzenle" : seg);
      crumbs.push({ label });
    });
  }

  return (
    <nav aria-label="Sayfa konumu" className="flex min-w-0 items-center gap-1.5 text-[13px]">
      {crumbs.map((c, i) => {
        const last = i === crumbs.length - 1;
        return (
          <span key={i} className="flex min-w-0 items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-panel-fg-subtle" />}
            {c.href && !last ? (
              <Link
                href={c.href}
                className="truncate text-panel-fg-muted transition-colors hover:text-panel-fg"
              >
                {c.label}
              </Link>
            ) : (
              <span className={last ? "truncate font-semibold text-panel-fg" : "truncate text-panel-fg-muted"}>
                {c.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
