import type { LegalDocId, LegalCenterUi, LegalDocument } from "@/lib/legal-center/types";
import type { LegalNavItem } from "@/components/legal-center/legal-center-sidebar";
import { LegalCenterShell } from "@/components/legal-center/legal-center-shell";
import { LegalCenterMainContent } from "@/components/legal-center/legal-center-content";
import { LegalCenterPrintActions } from "@/components/legal-center/legal-center-print-actions";

type Props = {
  locale: string;
  activeId: LegalDocId;
  ui: LegalCenterUi;
  doc: LegalDocument;
  navItems: LegalNavItem[];
};

/** Sunucuda render — büyük belge metni istemciye gönderilmez. */
export function LegalCenterPage({ locale, activeId, ui, doc, navItems }: Props) {
  const header = (
    <header className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="rounded bg-[#FFDBD0] px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter text-[#390C00]">
            {doc.badge}
          </span>
          <span className="text-[11px] font-medium tracking-wide text-secondary/70 sm:text-xs">
            {doc.lastUpdated}
          </span>
        </div>
        <h1 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-dark sm:text-3xl lg:text-4xl">
          {doc.title}{" "}
          {doc.titleHighlight ? (
            <span className="text-primary">{doc.titleHighlight}</span>
          ) : null}
        </h1>
      </div>
      <LegalCenterPrintActions printLabel={ui.print} downloadLabel={ui.downloadPdf} />
    </header>
  );

  return (
    <LegalCenterShell
      locale={locale}
      activeId={activeId}
      ui={ui}
      navItems={navItems}
      header={header}
    >
      <LegalCenterMainContent doc={doc} ui={ui} locale={locale} />
    </LegalCenterShell>
  );
}
