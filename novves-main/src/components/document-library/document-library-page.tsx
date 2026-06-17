"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { LocaleFlag } from "@/components/locale-flags";
import { hasLocale, localeUi, type Locale } from "@/i18n/config";
import {
  DOCUMENT_LIBRARY_MOBILE_DRAWER,
  DOCUMENT_LIBRARY_PAGE_PADDING_TOP,
  DOCUMENT_LIBRARY_PAGE_X,
  DOCUMENT_LIBRARY_TOUCH_TARGET,
} from "@/lib/document-library/layout";
import { SIDEBAR_PANEL_SCROLL } from "@/lib/sidebar-panel-scroll";
import {
  collectDocumentLanguages,
  filterDocuments,
  getDocumentDownloadHref,
  getDocumentLanguages,
} from "@/lib/document-library/search";
import type {
  DocumentLibraryItem,
  DocumentLibraryPageProps,
  DocumentLibraryStatus,
  DocumentLibraryTreeIcon,
  DocumentLibraryTreeNode,
  DocumentLibraryUi,
} from "@/lib/document-library/types";

/** PNG bayraklar — doküman kütüphanesi dil filtresi */
const DOC_LIB_FLAG_PNG: Partial<Record<Locale, string>> = {
  tr: "/images/flags/tr.png",
  en: "/images/flags/en.png",
};

function DocumentLibraryFlagImage({
  locale,
  size = "md",
}: {
  locale: string;
  size?: "sm" | "md";
}) {
  const src = DOC_LIB_FLAG_PNG[locale as Locale];
  if (!src) {
    return <LocaleFlag locale={locale} className={size === "sm" ? "h-3.5 w-[1.05rem]" : "h-5 w-7"} />;
  }
  const dim = size === "sm" ? { w: 28, h: 20, className: "h-5 w-7" } : { w: 36, h: 26, className: "h-6 w-9" };
  return (
    <Image
      src={src}
      alt=""
      width={dim.w}
      height={dim.h}
      unoptimized
      className={`shrink-0 rounded-[3px] border border-black/[0.08] object-cover shadow-sm ${dim.className}`}
    />
  );
}

function TreeIcon({ name, className }: { name: DocumentLibraryTreeIcon; className?: string }) {
  const iconClass = ["h-4", "w-4", "shrink-0", "block", className ?? "text-dark"]
    .filter(Boolean)
    .join(" ");
  const p = {
    className: iconClass,
    viewBox: "0 0 24 24",
    width: 16,
    height: 16,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };
  switch (name) {
    case "library":
      return (
        <svg {...p}>
          <path d="M4 19h16M6 4h12v15H6V4zM10 4v15M14 4v15M18 4v15" />
        </svg>
      );
    case "catalog":
      return (
        <svg {...p}>
          <rect x="3" y="5" width="7" height="7" rx="1" />
          <rect x="14" y="5" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="5" rx="1" />
          <rect x="14" y="14" width="7" height="5" rx="1" />
        </svg>
      );
    case "datasheet":
      return (
        <svg {...p}>
          <path d="M8 4h8v16H8zM5 8h14M5 12h14M5 16h10" />
        </svg>
      );
    case "brochure":
      return (
        <svg {...p}>
          <path d="M8 4h8a2 2 0 012 2v12l-4-2-4 2V6a2 2 0 012-2zM10 9h4M10 13h4" />
        </svg>
      );
    case "manual":
      return (
        <svg {...p}>
          <path d="M6 4h7l5 4v12H6a2 2 0 01-2-2V6a2 2 0 012-2zM8 10h8M8 14h6" />
        </svg>
      );
    case "certificate":
      return (
        <svg {...p}>
          <circle cx="12" cy="9" r="4" />
          <path d="M8 14h8l1 6H7l1-6z" />
        </svg>
      );
    case "cad":
      return (
        <svg {...p}>
          <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 8v8M8 10.5h8" />
        </svg>
      );
    case "training":
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="9" />
          <path d="M10 8.5v7l6-3.5-6-3.5z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "troubleshooting":
      return (
        <svg {...p}>
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      );
    case "performance":
      return (
        <svg {...p}>
          <path d="M4 19h16M6 16l3-6 3 4 3-7 3 5" />
        </svg>
      );
    case "efficiency":
      return (
        <svg {...p} className={[iconClass, "text-emerald-600"].join(" ")}>
          <path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z" />
        </svg>
      );
    default:
      return null;
  }
}

function formatPreviewBadge(fileFormat?: string): string {
  const f = (fileFormat ?? "").toUpperCase();
  if (f.includes("CAD")) return "CAD";
  if (f.includes("PDF")) return "PDF";
  if (f.includes("VIDEO") || f.includes("MP4")) return "MP4";
  return "DOC";
}

function DocumentPreview({
  previewImage,
  defaultPreviewImage,
  previewTag,
  fileFormat,
  title,
}: {
  previewImage?: string;
  defaultPreviewImage: string;
  previewTag: string;
  fileFormat?: string;
  title: string;
}) {
  const [failed, setFailed] = useState(false);
  const src = (previewImage?.trim() || defaultPreviewImage).trim();

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return (
      <DocumentPreviewIcon previewTag={previewTag} fileFormat={fileFormat} title={title} />
    );
  }

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-sand-200 ring-1 ring-inset ring-ink/[0.06]"
      role="img"
      aria-label={title}
    >
      <Image
        src={src}
        alt={title}
        fill
        className="object-contain object-center p-2"
        sizes="(max-width: 1280px) 100vw, 320px"
        onError={() => setFailed(true)}
      />
      <span className="absolute left-2 top-2 rounded bg-dark/85 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
        {previewTag}
      </span>
    </div>
  );
}

function DocumentPreviewIcon({
  previewTag,
  fileFormat,
  title,
}: {
  previewTag: string;
  fileFormat?: string;
  title: string;
}) {
  const badge = formatPreviewBadge(fileFormat);
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-sand-200 ring-1 ring-inset ring-ink/[0.06]"
      role="img"
      aria-label={title}
    >
      <div className="flex h-full flex-col items-center justify-center gap-3 px-6 py-8">
        <div className="relative">
          <svg
            className="h-[4.5rem] w-[4.5rem] text-dark/90 sm:h-20 sm:w-20"
            viewBox="0 0 48 56"
            fill="none"
            aria-hidden
          >
            <path
              d="M8 4h22l10 10v38a4 4 0 01-4 4H8a4 4 0 01-4-4V8a4 4 0 014-4z"
              fill="white"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M30 4v10h10"
              fill="#F2F4F6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M14 28h20M14 34h16M14 40h12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.35"
            />
          </svg>
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded bg-primary px-2 py-0.5 text-[9px] font-extrabold tracking-wider text-white shadow-sm">
            {badge}
          </span>
        </div>
        {fileFormat ? (
          <p className="max-w-full truncate text-center text-[11px] font-medium text-secondary/80">{fileFormat}</p>
        ) : null}
      </div>
      <span className="absolute left-2 top-2 rounded bg-dark/85 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
        {previewTag}
      </span>
    </div>
  );
}

function StatusBadge({
  status,
  table,
}: {
  status: DocumentLibraryStatus;
  table: DocumentLibraryUi["table"];
}) {
  const labels: Record<DocumentLibraryStatus, string> = {
    active: table.statusActive,
    passive: table.statusPassive,
    critical: table.statusCritical,
    current: table.statusCurrent,
    approved: table.statusApproved,
    video: table.statusVideo,
  };
  const styles: Record<DocumentLibraryStatus, string> = {
    active: "bg-dark/10 text-dark",
    passive: "bg-sand-200 text-secondary",
    critical: "bg-primary/15 text-primary",
    current: "bg-dark/10 text-dark",
    approved: "bg-dark/10 text-dark",
    video: "bg-dark/10 text-dark",
  };
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-wide ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function DocumentRowLanguageFlags({ doc }: { doc: DocumentLibraryItem }) {
  const langs = getDocumentLanguages(doc);
  return (
    <span className="inline-flex items-center gap-1" aria-label={langs.join(", ")}>
      {langs.map((lang) => (
        <span
          key={lang}
          title={hasLocale(lang) ? localeUi[lang as Locale].label : lang.toUpperCase()}
          className="inline-flex rounded-md p-0.5"
        >
          <DocumentLibraryFlagImage locale={lang} size="sm" />
        </span>
      ))}
    </span>
  );
}

function DocumentLanguageFlagButtons({
  languages,
  active,
  onSelect,
  stopPropagation = false,
  size = "md",
}: {
  languages: string[];
  active: string | null;
  onSelect: (lang: string) => void;
  stopPropagation?: boolean;
  size?: "sm" | "md";
}) {
  return (
    <span className="inline-flex items-center gap-1.5" role="group" aria-label="Dil filtresi">
      {languages.map((lang) => {
        if (!hasLocale(lang)) return null;
        const cfg = localeUi[lang as Locale];
        const isActive = active === lang;
        return (
          <button
            key={lang}
            type="button"
            title={cfg.label}
            aria-pressed={isActive}
            aria-label={cfg.label}
            onClick={(e) => {
              if (stopPropagation) {
                e.stopPropagation();
                e.preventDefault();
              }
              onSelect(lang);
            }}
            className={`rounded-lg p-1 transition-all ${
              isActive
                ? "bg-primary/15 ring-2 ring-primary/55 shadow-sm"
                : "bg-white ring-1 ring-ink/10 hover:ring-primary/35"
            }`}
          >
            <DocumentLibraryFlagImage locale={lang} size={size} />
          </button>
        );
      })}
    </span>
  );
}

function DocumentLanguageFilterDropdown({
  languages,
  active,
  onSelect,
  allLabel,
  languageLabel,
  open,
  onOpenChange,
}: {
  languages: string[];
  active: string | null;
  onSelect: (lang: string | null) => void;
  allLabel: string;
  languageLabel: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [open, onOpenChange]);

  const activeCfg = active && hasLocale(active) ? localeUi[active as Locale] : null;

  return (
    <div ref={ref} className="relative mb-2.5 sm:mb-3">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex w-full items-center justify-between gap-3 rounded-xl bg-white px-3 py-2.5 text-left shadow-[0_8px_32px_-12px_rgba(25,28,30,0.06)] ring-1 ring-ink/10 transition-colors hover:ring-primary/25 sm:px-4 sm:py-3"
      >
        <span className="flex min-w-0 items-center gap-2.5">
          {activeCfg ? (
            <DocumentLibraryFlagImage locale={active!} size="sm" />
          ) : (
            <span className="flex h-5 w-7 shrink-0 items-center justify-center rounded-[3px] bg-sand-100 text-[10px] text-secondary">
              …
            </span>
          )}
          <span className="min-w-0 truncate text-xs font-semibold text-ink sm:text-sm">
            <span className="text-secondary">{languageLabel}: </span>
            {activeCfg ? activeCfg.label : allLabel}
          </span>
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-secondary/60 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={languageLabel}
          className="absolute inset-x-0 top-full z-30 mt-1 overflow-hidden rounded-xl border border-sand-200 bg-white py-1 shadow-[0_16px_40px_-12px_rgba(25,28,30,0.18)]"
        >
          <li role="option" aria-selected={active === null}>
            <button
              type="button"
              onClick={() => onSelect(null)}
              className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-xs font-semibold transition-colors hover:bg-sand-100 sm:px-4 sm:text-sm ${
                active === null ? "bg-primary/8 text-primary" : "text-ink"
              }`}
            >
              <span className="flex h-5 w-7 shrink-0 items-center justify-center rounded-[3px] bg-sand-100 text-[9px] font-bold text-secondary">
                ALL
              </span>
              {allLabel}
            </button>
          </li>
          {languages.map((lang) => {
            if (!hasLocale(lang)) return null;
            const cfg = localeUi[lang as Locale];
            const isActive = active === lang;
            return (
              <li key={lang} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={() => onSelect(lang)}
                  className={`flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-xs font-semibold transition-colors hover:bg-sand-100 sm:px-4 sm:text-sm ${
                    isActive ? "bg-primary/8 text-primary" : "text-ink"
                  }`}
                >
                  <DocumentLibraryFlagImage locale={lang} size="sm" />
                  <span>{cfg.label}</span>
                  <span className="ml-auto font-mono text-[10px] text-secondary/70">{cfg.short}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 shrink-0 text-secondary transition-transform ${open ? "rotate-90" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function TreeSection({
  node,
  depth = 0,
  expanded,
  activeFilter,
  collapsed,
  onToggle,
  onSelectFilter,
  onRequestExpandSidebar,
}: {
  node: DocumentLibraryTreeNode;
  depth?: number;
  expanded: Set<string>;
  activeFilter: string | null;
  collapsed: boolean;
  onToggle: (id: string) => void;
  onSelectFilter: (category: string | null, nodeId: string) => void;
  onRequestExpandSidebar?: () => void;
}) {
  const hasChildren = Boolean(node.children?.length);
  const isOpen = expanded.has(node.id);
  const isTroubleshooting = node.variant === "troubleshooting";
  const isActive = node.filterCategory && activeFilter === node.filterCategory;

  const rowClass = isActive
    ? "bg-primary/10 font-bold text-primary hover:bg-primary/15"
    : isTroubleshooting
      ? "font-semibold text-ink/80 hover:bg-primary/5 hover:text-primary"
      : "text-ink/80 hover:bg-sand-200/80";

  const handleSelect = () => {
    if (collapsed) {
      onRequestExpandSidebar?.();
      if (hasChildren) onToggle(node.id);
      if (node.filterCategory) onSelectFilter(node.filterCategory, node.id);
      return;
    }
    if (hasChildren) {
      onToggle(node.id);
      return;
    }
    if (node.filterCategory) onSelectFilter(node.filterCategory, node.id);
    else onSelectFilter(null, node.id);
  };

  if (collapsed) {
    return (
      <button
        type="button"
        title={node.label}
        onClick={handleSelect}
        className={`flex w-full items-center justify-center rounded-lg p-2.5 transition-colors ${rowClass}`}
      >
        {node.icon ? <TreeIcon name={node.icon} className={isActive ? "text-primary" : undefined} /> : null}
      </button>
    );
  }

  return (
    <div className={depth > 0 ? "ml-1" : ""}>
      <div
        className={`flex w-full items-center gap-0.5 rounded-lg pr-1 transition-colors ${rowClass} ${
          isActive ? "ring-1 ring-primary/35" : ""
        }`}
      >
        {hasChildren ? (
          <button
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Daralt" : "Genişlet"}
            onClick={(e) => {
              e.stopPropagation();
              onToggle(node.id);
            }}
            className="shrink-0 rounded-md p-1.5 hover:bg-sand-200"
          >
            <IconChevron open={isOpen} />
          </button>
        ) : (
          <span className="w-7 shrink-0" />
        )}
        <button
          type="button"
          onClick={handleSelect}
          className="flex min-w-0 flex-1 items-center gap-2 py-1.5 text-left text-xs font-medium"
        >
          {node.icon ? <TreeIcon name={node.icon} className={isActive ? "text-primary" : undefined} /> : null}
          <span className="truncate">{node.label}</span>
        </button>
      </div>
      {hasChildren && isOpen ? (
        <div className="mt-0.5 space-y-0.5 border-l-2 border-primary/20 pl-2 ml-2">
          {node.children!.map((child) => (
            <TreeSection
              key={child.id}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              activeFilter={activeFilter}
              collapsed={collapsed}
              onToggle={onToggle}
              onSelectFilter={onSelectFilter}
              onRequestExpandSidebar={onRequestExpandSidebar}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function DocumentLibrarySidebarPanel({
  ui,
  tree,
  expandedTree,
  activeFilter,
  collapsed,
  onToggleTree,
  onSelectFilter,
  onToggleCollapsed,
}: {
  ui: DocumentLibraryUi;
  tree: DocumentLibraryTreeNode[];
  expandedTree: Set<string>;
  activeFilter: string | null;
  collapsed: boolean;
  onToggleTree: (id: string) => void;
  onSelectFilter: (category: string | null, nodeId: string) => void;
  onToggleCollapsed: () => void;
}) {
  const expandSidebar = () => {
    if (collapsed) onToggleCollapsed();
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        className={`mb-3 flex shrink-0 ${collapsed ? "flex-col items-center gap-2" : "flex-row items-center justify-between gap-2"}`}
      >
        {!collapsed ? (
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-dark text-[10px] font-bold text-white">
              NV
            </div>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-ink">{ui.sidebar.libraryName}</p>
              <p className="text-[10px] text-secondary">{ui.sidebar.libraryTag}</p>
            </div>
          </div>
        ) : (
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-dark text-[10px] font-bold text-white"
            title={ui.sidebar.libraryName}
          >
            NV
          </div>
        )}
        <button
          type="button"
          onClick={onToggleCollapsed}
          className="shrink-0 rounded-lg p-1.5 text-secondary transition-colors hover:bg-sand-200 hover:text-ink"
          aria-label={collapsed ? ui.sidebar.expandSidebar : ui.sidebar.collapseSidebar}
          title={collapsed ? ui.sidebar.expandSidebar : ui.sidebar.collapseSidebar}
        >
          <svg
            className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>


      {!collapsed ? (
        <p className="mb-2 shrink-0 text-[10px] font-bold tracking-[0.15em] text-secondary">{ui.sidebar.hierarchy}</p>
      ) : null}

      <div className={`min-h-0 flex-1 space-y-1 ${SIDEBAR_PANEL_SCROLL}`}>
        {tree.map((node) => (
          <TreeSection
            key={node.id}
            node={node}
            expanded={expandedTree}
            activeFilter={activeFilter}
            collapsed={collapsed}
            onToggle={onToggleTree}
            onSelectFilter={onSelectFilter}
            onRequestExpandSidebar={expandSidebar}
          />
        ))}
      </div>
    </div>
  );
}

function DocumentLibraryInspectorPanel({
  ui,
  selected,
  defaultPreviewImage,
  downloadLanguage,
  onDownloadLanguageChange,
}: {
  ui: DocumentLibraryUi;
  selected: DocumentLibraryItem;
  defaultPreviewImage: string;
  downloadLanguage: string | null;
  onDownloadLanguageChange: (lang: string) => void;
}) {
  const downloadLangs = selected.languages?.length ? selected.languages : null;
  const activeDownloadLang =
    downloadLanguage && downloadLangs?.includes(downloadLanguage)
      ? downloadLanguage
      : (downloadLangs?.[0] ?? selected.language);
  const downloadHref = getDocumentDownloadHref(selected, activeDownloadLang);

  return (
    <>
      <DocumentPreview
        previewImage={selected.previewImage}
        defaultPreviewImage={defaultPreviewImage}
        previewTag={ui.inspector.previewTag}
        fileFormat={selected.fileFormat}
        title={selected.title}
      />
      <p className="mt-5 text-[10px] font-bold tracking-[0.15em] text-secondary">{ui.inspector.docSummary}</p>
      <dl className="mt-3 space-y-2 text-xs">
        <div className="flex justify-between gap-2">
          <dt className="text-secondary">{ui.inspector.fileFormat}</dt>
          <dd className="font-semibold text-ink">{selected.fileFormat}</dd>
        </div>
        <div className="flex justify-between gap-2">
          <dt className="text-secondary">{ui.inspector.revision}</dt>
          <dd className="font-semibold text-ink">{selected.revision}</dd>
        </div>
        <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-2">
          <dt className="text-secondary">{ui.inspector.lastModified}</dt>
          <dd className="font-semibold text-ink sm:text-end">{selected.lastModified}</dd>
        </div>
      </dl>
      <p className="mt-6 text-[10px] font-bold tracking-[0.15em] text-secondary">{ui.inspector.revisionLogs}</p>
      <ul className="mt-3 space-y-4">
        {(selected.revisionLogs ?? []).map((log, i) => (
          <li key={log.label} className="flex gap-3">
            <div className={`mt-1 w-1 shrink-0 rounded-full ${i === 0 ? "bg-primary" : "bg-sand-300"}`} />
            <div>
              <p className="text-xs font-bold text-ink">{log.label}</p>
              <p className="text-[10px] text-secondary">{log.when}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-[10px] font-bold tracking-[0.15em] text-secondary">{ui.inspector.shareDocument}</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {[
          { label: ui.inspector.shareLink, icon: "🔗" },
          { label: ui.inspector.shareWhatsapp, icon: "WA" },
          { label: ui.inspector.shareEmail, icon: "@" },
        ].map((s) => (
          <button
            key={s.label}
            type="button"
            className="flex flex-col items-center gap-1 rounded-xl bg-sand-100 py-3 text-[10px] font-semibold text-secondary transition-colors hover:bg-sand-200"
          >
            <span className="text-sm">{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>
      <p className="mt-6 text-[10px] font-bold tracking-[0.15em] text-secondary">{ui.inspector.secureDownload}</p>
      {downloadLangs && downloadLangs.length > 1 ? (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-[10px] font-semibold text-secondary">{ui.table.language}:</span>
          <DocumentLanguageFlagButtons
            languages={downloadLangs}
            active={activeDownloadLang}
            onSelect={onDownloadLanguageChange}
          />
        </div>
      ) : null}
      <p className="mt-2 flex gap-2 text-[11px] leading-relaxed text-secondary">
        <span className="shrink-0" aria-hidden>
          🔒
        </span>
        {ui.inspector.secureDownloadNote}
      </p>
      <a
        href={downloadHref ?? "#"}
        target={downloadHref ? "_blank" : undefined}
        rel={downloadHref ? "noopener noreferrer" : undefined}
        aria-disabled={!downloadHref}
        className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-dark px-4 py-3 text-xs font-bold text-white transition-colors hover:bg-[#131b2e] ${
          downloadHref ? "" : "pointer-events-none opacity-70"
        }`}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5 5 5M12 15V5" />
        </svg>
        {ui.inspector.downloadDocument}
      </a>
    </>
  );
}

export function DocumentLibraryPage({
  locale,
  ui,
  documents,
  tree,
  defaultPreviewImage,
}: DocumentLibraryPageProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string | null>(null);
  const [languageFilterOpen, setLanguageFilterOpen] = useState(false);
  const [downloadLanguage, setDownloadLanguage] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState(documents[0]?.id ?? "");
  const [inspectorOpen, setInspectorOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [mobileInspectorOpen, setMobileInspectorOpen] = useState(false);
  const [expandedTree, setExpandedTree] = useState<Set<string>>(
    () => new Set(tree.filter((n) => n.defaultExpanded).map((n) => n.id)),
  );
  const [activeNav, setActiveNav] = useState<"inventory" | "dashboard" | "compliance" | "audit">("inventory");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const availableLanguages = useMemo(
    () => collectDocumentLanguages(documents, locale),
    [documents, locale],
  );
  const showLanguageFlags = availableLanguages.length > 1;

  const selectLanguageFilter = useCallback((lang: string | null) => {
    setLanguageFilter(lang);
    setLanguageFilterOpen(false);
  }, []);

  const filtered = useMemo(
    () => filterDocuments(documents, search, categoryFilter, languageFilter),
    [documents, search, categoryFilter, languageFilter],
  );
  const selected =
    filtered.find((d) => d.id === selectedId) ?? filtered[0] ?? documents[0] ?? null;

  const toggleTree = useCallback((id: string) => {
    setExpandedTree((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectFilter = useCallback((category: string | null, _nodeId?: string) => {
    void _nodeId;
    setCategoryFilter(category);
    setMobileSidebarOpen(false);
  }, []);

  const selectDocument = useCallback((id: string) => {
    setSelectedId(id);
    setInspectorOpen(true);
    const doc = documents.find((d) => d.id === id);
    if (doc?.languages?.length) {
      setDownloadLanguage(languageFilter && doc.languages.includes(languageFilter) ? languageFilter : doc.languages[0]);
    } else {
      setDownloadLanguage(null);
    }
  }, [documents, languageFilter]);

  const focusTroubleshooting = useCallback(() => {
    const t = ui.sidebar.tree.troubleshooting;
    setCategoryFilter(t);
    setExpandedTree((prev) => new Set([...prev, "document-library"]));
    const first = documents.find((d) => d.treeCategory === t || d.status === "critical");
    if (first) setSelectedId(first.id);
  }, [documents, ui.sidebar.tree.troubleshooting]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileSidebarOpen(false);
        setMobileInspectorOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const open = mobileSidebarOpen || mobileInspectorOpen;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileSidebarOpen, mobileInspectorOpen]);

  const clearCategoryFilter = useCallback(() => setCategoryFilter(null), []);

  const navItems = [
    { key: "dashboard" as const, label: ui.nav.dashboard },
    { key: "inventory" as const, label: ui.nav.inventory },
    { key: "compliance" as const, label: ui.nav.compliance },
    { key: "audit" as const, label: ui.nav.audit },
  ];

  const titleClass = (doc: DocumentLibraryItem) =>
    doc.criticalTitle ? "text-primary" : doc.highlight ? "text-primary" : "text-ink";

  const renderDocumentTitle = (doc: DocumentLibraryItem) => (
    <span className={titleClass(doc)}>{doc.title}</span>
  );

  return (
    <div
      className={`doc-lib-root flex flex-col bg-sand-200 text-[#191C1E] ${DOCUMENT_LIBRARY_PAGE_PADDING_TOP} lg:max-h-dvh lg:min-h-dvh`}
    >
      <header className="shrink-0 bg-dark px-3 py-3 sm:px-6">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="min-w-0">
            <p className="font-display text-xs font-extrabold leading-tight tracking-tight text-white sm:text-sm md:text-base">
              {ui.brandTitle}
            </p>
            <p className="mt-0.5 hidden text-[10px] font-medium uppercase tracking-[0.2em] text-white/45 sm:block">
              {ui.brandSubtitle}
            </p>
          </div>
          <nav
            className="-mx-1 flex min-w-0 items-center gap-x-4 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-x-6 md:mx-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
            aria-label="Archive"
          >
            {navItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveNav(item.key)}
                className={`relative shrink-0 whitespace-nowrap px-0.5 pb-2 text-xs font-semibold transition-colors sm:pb-1 ${DOCUMENT_LIBRARY_TOUCH_TARGET} flex items-center ${
                  activeNav === item.key ? "text-white" : "text-white/55 hover:text-white/80"
                }`}
              >
                {item.label}
                {activeNav === item.key ? (
                  <span className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-primary" />
                ) : null}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {mobileSidebarOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
            aria-label={ui.inspector.close}
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside
            className={`fixed left-0 z-50 flex w-[min(100vw,20rem)] max-w-[85vw] flex-col overflow-y-auto overscroll-contain bg-sand-100 p-4 shadow-2xl lg:hidden ${DOCUMENT_LIBRARY_MOBILE_DRAWER}`}
          >
            <div className="mb-3 flex items-center justify-between border-b border-ink/[0.06] pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-ink">{ui.sidebar.hierarchy}</span>
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="rounded-lg p-2 text-secondary hover:bg-white"
                aria-label={ui.inspector.close}
              >
                ✕
              </button>
            </div>
            <DocumentLibrarySidebarPanel
              ui={ui}
              tree={tree}
              expandedTree={expandedTree}
              activeFilter={categoryFilter}
              collapsed={false}
              onToggleTree={toggleTree}
              onSelectFilter={selectFilter}
              onToggleCollapsed={() => setMobileSidebarOpen(false)}
            />
          </aside>
        </>
      ) : null}

      {mobileInspectorOpen && selected ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-ink/40 xl:hidden"
            aria-label={ui.inspector.close}
            onClick={() => setMobileInspectorOpen(false)}
          />
          <aside
            className={`fixed inset-x-0 bottom-0 z-50 flex max-h-[min(92dvh,720px)] flex-col overflow-hidden rounded-t-2xl border-t border-sand-300/80 bg-white pb-[env(safe-area-inset-bottom)] shadow-2xl sm:inset-x-auto sm:bottom-auto sm:left-auto sm:right-0 sm:top-20 sm:h-[calc(100dvh-5rem)] sm:max-h-[calc(100dvh-5rem)] sm:w-full sm:max-w-md sm:rounded-none sm:border-l sm:border-t-0 sm:pb-0 lg:top-28 lg:h-[calc(100dvh-7rem)] lg:max-h-[calc(100dvh-7rem)] xl:hidden`}
          >
            <div className="shrink-0 border-b border-sand-300/70 px-4 py-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[10px] font-bold tracking-[0.15em] text-secondary">{ui.inspector.title}</p>
                <button
                  type="button"
                  onClick={() => setMobileInspectorOpen(false)}
                  className="rounded-lg p-1.5 text-secondary hover:bg-sand-100"
                  aria-label={ui.inspector.close}
                >
                  ✕
                </button>
              </div>
            </div>
            <div className={`min-h-0 flex-1 px-4 pb-6 pt-3 ${SIDEBAR_PANEL_SCROLL}`}>
              <DocumentLibraryInspectorPanel
                ui={ui}
                selected={selected}
                defaultPreviewImage={defaultPreviewImage}
                downloadLanguage={downloadLanguage}
                onDownloadLanguageChange={setDownloadLanguage}
              />
            </div>
          </aside>
        </>
      ) : null}

      <div className="mx-auto flex w-full max-w-[1800px] flex-col lg:min-h-0 lg:flex-1 lg:flex-row lg:overflow-hidden">
        <aside
          className={`hidden min-h-0 shrink-0 flex-col overflow-hidden bg-sand-100 transition-[width] duration-200 ease-out lg:flex ${
            sidebarCollapsed ? "w-[4.5rem] p-2" : "w-[min(100%,17rem)] min-w-[14rem] p-3 xl:p-4"
          }`}
        >
          <DocumentLibrarySidebarPanel
            ui={ui}
            tree={tree}
            expandedTree={expandedTree}
            activeFilter={categoryFilter}
            collapsed={sidebarCollapsed}
            onToggleTree={toggleTree}
            onSelectFilter={selectFilter}
            onToggleCollapsed={() => setSidebarCollapsed((c) => !c)}
          />
        </aside>

        <div className="flex min-w-0 flex-col lg:min-h-0 lg:flex-1">
          <div
            className={`sticky top-0 z-20 shrink-0 border-b border-ink/[0.04] bg-sand-200/95 py-3 backdrop-blur-md sm:py-4 lg:static lg:border-0 lg:bg-sand-200 lg:backdrop-blur-none ${DOCUMENT_LIBRARY_PAGE_X}`}
          >
            <div className="mx-auto max-w-4xl">
              {showLanguageFlags ? (
                <DocumentLanguageFilterDropdown
                  languages={availableLanguages}
                  active={languageFilter}
                  onSelect={selectLanguageFilter}
                  allLabel={ui.searchAllLanguages}
                  languageLabel={ui.table.language}
                  open={languageFilterOpen}
                  onOpenChange={setLanguageFilterOpen}
                />
              ) : null}
              <label className="relative block">
                <span className="sr-only">{ui.searchPlaceholder}</span>
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-secondary/60 sm:left-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <circle cx="11" cy="11" r="7" />
                  <path strokeLinecap="round" d="M20 20l-3-3" />
                </svg>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={ui.searchPlaceholder}
                  className="w-full rounded-xl bg-white py-3 pl-10 pr-3 text-sm text-ink shadow-[0_8px_32px_-12px_rgba(25,28,30,0.06)] outline-none ring-1 ring-ink/10 placeholder:text-secondary/50 focus:ring-2 focus:ring-primary/35 sm:rounded-2xl sm:py-3.5 sm:pl-12 sm:pr-4"
                />
              </label>
            </div>

            {categoryFilter ? (
              <div className="mx-auto mt-2 flex max-w-4xl flex-wrap items-center gap-2">
                <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold text-primary">
                  <span className="truncate">{categoryFilter}</span>
                  <button
                    type="button"
                    onClick={clearCategoryFilter}
                    className="shrink-0 rounded-full p-0.5 hover:bg-primary/20"
                    aria-label="Filtreyi kaldır"
                  >
                    ✕
                  </button>
                </span>
              </div>
            ) : null}

            <div className="mx-auto mt-3 flex max-w-4xl gap-2 xl:hidden">
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(true)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl bg-white px-3 py-3 text-xs font-semibold text-ink ring-1 ring-ink/10 ${DOCUMENT_LIBRARY_TOUCH_TARGET}`}
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h10" />
                </svg>
                <span className="truncate">{ui.sidebar.hierarchy}</span>
              </button>
              <button
                type="button"
                onClick={() => selected && setMobileInspectorOpen(true)}
                disabled={!selected}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl bg-dark px-3 py-3 text-xs font-semibold text-white disabled:opacity-40 ${DOCUMENT_LIBRARY_TOUCH_TARGET}`}
              >
                <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="truncate">{ui.inspector.title}</span>
              </button>
            </div>
          </div>

          <div
            className={`pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3 sm:pt-4 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:overscroll-contain ${DOCUMENT_LIBRARY_PAGE_X}`}
          >
            <div className="overflow-visible rounded-xl bg-white shadow-[0_8px_32px_-12px_rgba(25,28,30,0.06)] sm:overflow-hidden sm:rounded-2xl">
              <div className="hidden md:block">
                <div className="relative max-h-[min(50vh,28rem)] overflow-auto lg:max-h-[min(55vh,32rem)] xl:max-h-[min(60vh,36rem)]">
                  <table className="w-full min-w-[44rem] border-collapse text-left">
                    <thead className="sticky top-0 z-10 bg-sand-100 shadow-[0_1px_0_0_#F2F4F6]">
                      <tr>
                        <th className="whitespace-nowrap px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-secondary sm:px-5">
                          {ui.table.category}
                        </th>
                        <th className="whitespace-nowrap px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-secondary sm:px-5">
                          {ui.table.documentNo}
                        </th>
                        <th className="whitespace-nowrap px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-secondary sm:px-5">
                          {ui.table.documentName}
                        </th>
                        <th className="whitespace-nowrap px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-secondary sm:px-5">
                          {ui.table.language}
                        </th>
                        <th className="whitespace-nowrap px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-secondary sm:px-5">
                          {ui.table.status}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sand-200">
                      {filtered.map((doc) => (
                        <tr
                          key={doc.id}
                          onClick={() => selectDocument(doc.id)}
                          className={`cursor-pointer transition-colors hover:bg-sand-100/60 ${
                            selected?.id === doc.id ? "bg-sand-100 ring-1 ring-inset ring-primary/20" : ""
                          }`}
                        >
                          <td className="max-w-[8rem] px-3 py-3 text-[11px] font-semibold uppercase tracking-wide text-secondary sm:max-w-none sm:px-5 sm:py-4">
                            <span className="line-clamp-2">{doc.category}</span>
                          </td>
                          <td className="whitespace-nowrap px-3 py-3 font-mono text-[10px] text-secondary/80 sm:px-5 sm:py-4 sm:text-xs">
                            {doc.code}
                          </td>
                          <td className="min-w-[12rem] px-3 py-3 text-sm font-semibold leading-snug sm:px-5 sm:py-4">
                            {renderDocumentTitle(doc)}
                          </td>
                          <td className="whitespace-nowrap px-3 py-3 sm:px-5 sm:py-4">
                            <DocumentRowLanguageFlags doc={doc} />
                          </td>
                          <td className="whitespace-nowrap px-3 py-3 sm:px-5 sm:py-4">
                            <StatusBadge status={doc.status} table={ui.table} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <ul className="divide-y divide-sand-200 md:hidden">
                {filtered.map((doc) => (
                  <li key={doc.id}>
                    <button
                      type="button"
                      onClick={() => selectDocument(doc.id)}
                      className={`flex w-full flex-col gap-2 px-3 py-4 text-left transition-colors active:bg-sand-100 sm:px-4 ${
                        selected?.id === doc.id
                          ? "bg-sand-100 ring-1 ring-inset ring-primary/20"
                          : "hover:bg-sand-100/60"
                      } ${DOCUMENT_LIBRARY_TOUCH_TARGET}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wide text-secondary">
                          {doc.category}
                        </span>
                        <div className="flex shrink-0 items-center gap-2">
                          <DocumentRowLanguageFlags doc={doc} />
                          <StatusBadge status={doc.status} table={ui.table} />
                        </div>
                      </div>
                      <span className="text-sm font-semibold leading-snug">{renderDocumentTitle(doc)}</span>
                      <span className="font-mono text-[10px] text-secondary/80">{doc.code}</span>
                    </button>
                  </li>
                ))}
              </ul>
              {filtered.length === 0 ? (
                <p className="px-4 py-12 text-center text-sm text-secondary sm:px-5">{ui.emptyResults}</p>
              ) : null}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
              <div className="rounded-xl bg-gradient-to-br from-[#1d2f4d] to-[#131b2e] p-4 text-white shadow-[0_8px_32px_-12px_rgba(19,27,46,0.3)] sm:rounded-2xl sm:p-5 xl:col-span-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                  {ui.widgets.emergencyTitle}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/75 sm:mt-3">{ui.widgets.emergencyText}</p>
                <button
                  type="button"
                  onClick={focusTroubleshooting}
                  className={`mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-bold text-white hover:bg-primary-deep sm:mt-4 sm:w-auto sm:py-2 ${DOCUMENT_LIBRARY_TOUCH_TARGET}`}
                >
                  {ui.widgets.emergencyCta}
                  <span aria-hidden>→</span>
                </button>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-[0_8px_32px_-12px_rgba(25,28,30,0.06)] sm:rounded-2xl sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-2xl font-extrabold text-ink sm:text-3xl">{ui.widgets.complianceValue}</p>
                    <p className="mt-1 text-[10px] font-bold tracking-[0.12em] text-secondary">
                      {ui.widgets.complianceLabel}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-8-5-8-10V6l8-4z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-[0_8px_32px_-12px_rgba(25,28,30,0.06)] sm:rounded-2xl sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-2xl font-extrabold text-ink sm:text-3xl">{ui.widgets.efficiencyValue}</p>
                    <p className="mt-1 text-[10px] font-bold tracking-[0.12em] text-secondary">
                      {ui.widgets.efficiencyLabel}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5 5 5M12 5v12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {inspectorOpen && selected ? (
          <aside className="hidden min-h-0 w-[min(100%,20rem)] shrink-0 flex-col overflow-hidden border-l border-sand-300/70 bg-white xl:flex">
            <div className="flex items-center justify-between border-b border-sand-300/70 px-4 py-3">
              <p className="text-[10px] font-bold tracking-[0.15em] text-secondary">{ui.inspector.title}</p>
              <button
                type="button"
                onClick={() => setInspectorOpen(false)}
                className="rounded-lg p-1.5 text-secondary hover:bg-sand-100"
                aria-label={ui.inspector.close}
              >
                ✕
              </button>
            </div>
            <div className={`min-h-0 flex-1 px-3 pb-4 pt-3 sm:px-4 ${SIDEBAR_PANEL_SCROLL}`}>
              <DocumentLibraryInspectorPanel
                ui={ui}
                selected={selected}
                defaultPreviewImage={defaultPreviewImage}
                downloadLanguage={downloadLanguage}
                onDownloadLanguageChange={setDownloadLanguage}
              />
            </div>
          </aside>
        ) : null}

        {!inspectorOpen && selected ? (
          <button
            type="button"
            onClick={() => setInspectorOpen(true)}
            className={`fixed bottom-20 right-3 z-30 hidden rounded-full bg-dark px-4 py-3 text-xs font-bold text-white shadow-lg sm:bottom-24 sm:right-4 xl:flex ${DOCUMENT_LIBRARY_TOUCH_TARGET}`}
          >
            {ui.inspector.title}
          </button>
        ) : null}
      </div>

      <footer className="shrink-0 bg-dark px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-[10px] text-white/55 sm:px-6">
        <div className="mx-auto flex max-w-[1800px] flex-col items-center justify-between gap-3 text-center sm:flex-row sm:gap-2 sm:text-left">
          <p className="max-w-prose leading-relaxed">{ui.footer.copyright}</p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <Link href={`/${locale}/privacy`} className="hover:text-white">
              {ui.footer.privacy}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-white">
              {ui.footer.terms}
            </Link>
            <span className="cursor-default hover:text-white">{ui.footer.security}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
