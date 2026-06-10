"use client";

import * as React from "react";
import { ChevronRight, FileText, ExternalLink } from "lucide-react";
import { cn } from "@/lib/panel/cn";
import { toast } from "@/lib/panel/stores/toast-store";
import { useEditorStore } from "@/lib/panel/stores/editor-store";
import { getAdminPageGroups } from "@/lib/admin/content-sections";
import { getPreviewUrl } from "@/lib/admin/preview-routes";
import { PageHeader } from "@/components/panel/shell/page-header";
import { Button } from "@/components/panel/ui/button";
import { Skeleton } from "@/components/panel/ui/skeleton";
import { SectionEditor } from "./section-editor";
import { SolutionStripManager } from "@/components/panel/modules/solution-strip-manager";
import { ProductStripManager } from "@/components/panel/modules/product-strip-manager";
import { ReferenceStripManager } from "@/components/panel/modules/reference-strip-manager";
import { CertificateStripManager } from "@/components/panel/modules/certificate-strip-manager";
import { EngineeringStripManager } from "@/components/panel/modules/engineering-strip-manager";

const CUSTOM_HOME_SECTIONS = [
  "solutionCarouselByHref",
  "productCategories",
  "referencePreview",
  "certificatePreview",
  "engineeringPillarsSection",
];

/** Bu (file, section) jenerik editör yerine özel yönetici ile düzenlenir. */
function isCustomSection(file: string, section: string) {
  return file === "home" && CUSTOM_HOME_SECTIONS.includes(section);
}

export function SayfalarClient({ initialFile }: { initialFile?: string }) {
  const pageGroups = React.useMemo(() => getAdminPageGroups(), []);
  const firstFile =
    initialFile && pageGroups.some((g) => g.file === initialFile)
      ? initialFile
      : pageGroups[0]?.file ?? "home";

  const [activeFile, setActiveFile] = React.useState(firstFile);
  const [view, setView] = React.useState<"pages" | "edit">("pages");
  const [activeSection, setActiveSection] = React.useState("");
  const [locale, setLocale] = React.useState("tr");
  const [loading, setLoading] = React.useState(false);
  const init = useEditorStore((s) => s.init);

  const currentGroup = pageGroups.find((g) => g.file === activeFile);
  const currentSection = currentGroup?.sections.find((s) => s.key === activeSection);

  const loadSection = React.useCallback(
    async (file: string, section: string, loc: string) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/admin/content/${file}?locale=${loc}`);
        if (!res.ok) throw new Error();
        const json = await res.json();
        init(json.data?.[section] ?? null);
      } catch {
        toast.error("İçerik yüklenemedi");
        init(null);
      } finally {
        setLoading(false);
      }
    },
    [init],
  );

  React.useEffect(() => {
    if (view === "edit" && activeSection && !isCustomSection(activeFile, activeSection)) {
      loadSection(activeFile, activeSection, locale);
    }
  }, [view, activeFile, activeSection, locale, loadSection]);

  function changePage(file: string) {
    setActiveFile(file);
    setView("pages");
    setActiveSection("");
  }

  return (
    <div>
      <PageHeader
        title="Sayfalar"
        description="Sitedeki her bölümü tek tek, kod bilmeden düzenleyin."
        actions={
          currentGroup && (
            <a href={getPreviewUrl(locale, activeFile, "")} target="_blank" rel="noreferrer">
              <Button variant="secondary" size="sm">
                <ExternalLink className="h-4 w-4" />
                Sayfayı Aç
              </Button>
            </a>
          )
        }
      />

      {/* Sayfa sekmeleri */}
      <div className="panel-scroll mb-5 flex gap-1.5 overflow-x-auto pb-1">
        {pageGroups.map((g) => (
          <button
            key={g.file}
            type="button"
            onClick={() => changePage(g.file)}
            className={cn(
              "shrink-0 rounded-lg px-3.5 py-1.5 text-[13px] font-medium transition-colors",
              activeFile === g.file
                ? "bg-panel-accent text-panel-accent-fg"
                : "bg-panel-surface-2 text-panel-fg-muted hover:bg-panel-border hover:text-panel-fg",
            )}
          >
            {g.label}
          </button>
        ))}
      </div>

      {view === "pages" && currentGroup && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {currentGroup.sections.map((s, i) => (
            <button
              key={s.key}
              type="button"
              onClick={() => {
                setActiveSection(s.key);
                setView("edit");
              }}
              className="group flex items-center gap-3 rounded-xl border border-panel-border bg-panel-surface p-4 text-left transition-all panel-hover-raise"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-panel-surface-2 text-panel-fg-subtle group-hover:bg-panel-accent-soft group-hover:text-panel-accent">
                <FileText className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold text-panel-fg">{s.label}</p>
                <p className="text-[11.5px] text-panel-fg-subtle">Bölüm {i + 1}</p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-panel-fg-subtle transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      )}

      {view === "edit" && currentGroup && currentSection && (
        isCustomSection(activeFile, activeSection) ? (
          (() => {
            const back = () => {
              setView("pages");
              setActiveSection("");
            };
            if (activeSection === "solutionCarouselByHref") return <SolutionStripManager onBack={back} />;
            if (activeSection === "productCategories") return <ProductStripManager onBack={back} />;
            if (activeSection === "referencePreview") return <ReferenceStripManager onBack={back} />;
            if (activeSection === "engineeringPillarsSection") return <EngineeringStripManager onBack={back} />;
            return <CertificateStripManager onBack={back} />;
          })()
        ) : loading ? (
          <div className="overflow-hidden rounded-2xl border border-panel-border bg-panel-surface">
            <div className="border-b border-panel-border px-5 py-3.5">
              <Skeleton className="h-5 w-48" />
            </div>
            <div className="space-y-4 px-5 py-6">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-9 w-full" />
            </div>
          </div>
        ) : (
          <SectionEditor
            file={activeFile}
            section={activeSection}
            sectionLabel={currentSection.label}
            pageLabel={currentGroup.label}
            locale={locale}
            onLocaleChange={setLocale}
            onBack={() => {
              setView("pages");
              setActiveSection("");
            }}
          />
        )
      )}
    </div>
  );
}
