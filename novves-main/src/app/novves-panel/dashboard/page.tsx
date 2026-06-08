"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { localeUi } from "@/i18n/config";
import { ADMIN_PAGE_GROUPS } from "@/lib/admin/content-sections";
import { getSectionSchema, hasSectionSchema } from "@/lib/admin/field-schemas";
import { getPreviewUrl } from "@/lib/admin/preview-routes";
import { AdminShell, type AdminMode } from "@/components/admin/admin-shell";
import { AdvancedSidebar } from "@/components/admin/advanced/sidebar";
import { FieldEditor } from "@/components/admin/advanced/field-editor";
import { PageGrid } from "@/components/admin/simple/page-grid";
import { SectionList } from "@/components/admin/simple/section-list";
import { SchemaForm } from "@/components/admin/simple/schema-form";
import { SmartFallbackForm } from "@/components/admin/simple/smart-fallback-form";
import { SaveBar } from "@/components/admin/simple/save-bar";
import { confirmIfDirty, isDirty, snapshotData } from "@/components/admin/shared/unsaved-guard";

const PARTNER_RECORDS_FILE = "partner-records";
const MODE_STORAGE_KEY = "novves-admin-mode";

const PAGE_GROUPS = [
  ...ADMIN_PAGE_GROUPS,
  {
    file: PARTNER_RECORDS_FILE,
    label: "Partnerler",
    icon: "M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l-.001.027c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681-2.72 8.986 8.986 0 013.742.477m.94 3.198a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z",
    sections: [{ key: "records", label: "Partner Listesi" }],
  },
];

type SimpleView = "pages" | "sections" | "edit";

export default function DashboardPage() {
  const router = useRouter();
  const [mode, setMode] = useState<AdminMode>("simple");
  const [simpleView, setSimpleView] = useState<SimpleView>("pages");
  const [locale, setLocale] = useState("tr");
  const [activeFile, setActiveFile] = useState("home");
  const [activeSection, setActiveSection] = useState("hero");
  const [content, setContent] = useState<Record<string, unknown> | null>(null);
  const [formData, setFormData] = useState<unknown>(null);
  const [savedSnapshot, setSavedSnapshot] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [copying, setCopying] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [username, setUsername] = useState("");
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [expandedGroup, setExpandedGroup] = useState("home");
  const [contentSource, setContentSource] = useState("");
  const [backingUp, setBackingUp] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const modeInitialized = useRef(false);

  const isPartnerRecords = activeFile === PARTNER_RECORDS_FILE;
  const dirty = isDirty(savedSnapshot, formData);
  const currentGroup = PAGE_GROUPS.find((g) => g.file === activeFile);
  const currentSection = currentGroup?.sections.find((s) => s.key === activeSection);
  const sectionSchema = getSectionSchema(activeFile, activeSection);
  const previewUrl = getPreviewUrl(locale, activeFile, activeSection);

  useEffect(() => {
    if (modeInitialized.current) return;
    modeInitialized.current = true;
    const stored = localStorage.getItem(MODE_STORAGE_KEY);
    if (stored === "simple" || stored === "advanced") setMode(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem(MODE_STORAGE_KEY, mode);
  }, [mode]);

  useEffect(() => {
    fetch("/api/admin/auth/verify")
      .then((r) => r.json())
      .then((d) => {
        if (!d.authenticated) router.replace("/novves-panel");
        else setUsername(d.username);
      })
      .catch(() => router.replace("/novves-panel"));
  }, [router]);

  const loadContent = useCallback(async () => {
    setLoading(true);
    try {
      if (isPartnerRecords) {
        const res = await fetch("/api/admin/content/partner-records");
        if (!res.ok) throw new Error();
        const json = await res.json();
        const records = json.records ?? [];
        setContent({ records });
        setFormData(records);
        setSavedSnapshot(snapshotData(records));
        setContentSource("partner-records.json");
        return;
      }

      const res = await fetch(`/api/admin/content/${activeFile}?locale=${locale}`);
      if (!res.ok) throw new Error();
      const json = await res.json();
      setContent(json.data);
      const sectionData = json.data[activeSection] ?? null;
      setFormData(sectionData);
      setSavedSnapshot(snapshotData(sectionData));
      setContentSource(json.source === "db+json" ? "JSON + DB" : "JSON dosyasi");
    } catch {
      setMessage({ type: "error", text: "Icerik yuklenemedi" });
    } finally {
      setLoading(false);
    }
  }, [locale, activeFile, activeSection, isPartnerRecords]);

  useEffect(() => {
    loadContent();
  }, [loadContent]);

  function handleFieldChange(path: string, value: unknown) {
    setFormData((prev: unknown) => {
      const copy = JSON.parse(JSON.stringify(prev));
      const parts = path.split(/\.|\[(\d+)\]/).filter(Boolean);
      let obj: Record<string, unknown> = copy;
      for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        const num = Number(p);
        obj = (isNaN(num) ? obj[p] : (obj as unknown as unknown[])[num]) as Record<string, unknown>;
      }
      const last = parts[parts.length - 1];
      const lastNum = Number(last);
      if (isNaN(lastNum)) obj[last] = value;
      else (obj as unknown as unknown[])[lastNum] = value;
      return copy;
    });
  }

  function guardedAction(action: () => void) {
    if (!confirmIfDirty(dirty)) return;
    action();
  }

  function selectSection(file: string, sectionKey: string) {
    guardedAction(() => {
      setActiveFile(file);
      setActiveSection(sectionKey);
      setExpandedGroup(file);
      setMessage(null);
      if (mode === "simple") setSimpleView("edit");
    });
  }

  function handleModeChange(next: AdminMode) {
    guardedAction(() => {
      setMode(next);
      if (next === "simple") setSimpleView("pages");
    });
  }

  function handleLocaleChange(next: string) {
    guardedAction(() => setLocale(next));
  }

  async function handleCopyFromTr() {
    if (locale === "tr" || isPartnerRecords) return;
    if (!window.confirm("Bu bolumun Turkce icerigi mevcut dile kopyalanacak. Emin misiniz?")) return;
    setCopying(true);
    try {
      if (isPartnerRecords) return;
      const res = await fetch(`/api/admin/content/${activeFile}?locale=tr`);
      if (!res.ok) throw new Error();
      const json = await res.json();
      const trData = json.data[activeSection];
      if (trData !== undefined) {
        setFormData(trData);
        setMessage({ type: "success", text: "Turkce icerik kopyalandi. Kaydetmeyi unutmayin." });
      }
    } catch {
      setMessage({ type: "error", text: "Kopyalama basarisiz" });
    } finally {
      setCopying(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const csrfToken =
        document.cookie
          .split("; ")
          .find((c) => c.startsWith("admin_csrf_token="))
          ?.split("=")[1] ?? "";

      const url = isPartnerRecords
        ? "/api/admin/content/partner-records"
        : `/api/admin/content/${activeFile}`;

      const body = isPartnerRecords
        ? { records: formData }
        : { locale, section: activeSection, data: formData };

      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": decodeURIComponent(csrfToken),
        },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) setMessage({ type: "error", text: json.error || "Kaydetme basarisiz" });
      else {
        setMessage({ type: "success", text: "Kaydedildi!" });
        setSavedSnapshot(snapshotData(formData));
        loadContent();
      }
    } catch {
      setMessage({ type: "error", text: "Sunucu hatasi" });
    } finally {
      setSaving(false);
    }
  }

  async function handleBackupAll() {
    setBackingUp(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/content/backup", { method: "POST" });
      const json = await res.json();
      if (!res.ok) setMessage({ type: "error", text: json.error || "Yedekleme basarisiz" });
      else setMessage({ type: "success", text: "Tum sozluk dosyalari yedeklendi" });
    } catch {
      setMessage({ type: "error", text: "Yedekleme hatasi" });
    } finally {
      setBackingUp(false);
    }
  }

  async function handleRestore() {
    if (isPartnerRecords) return;
    if (!window.confirm(`${activeFile}.json (${locale}) yedekten geri yuklensin mi?`)) return;
    setRestoring(true);
    try {
      const res = await fetch(`/api/admin/content/backup?locale=${locale}&file=${activeFile}`);
      const json = await res.json();
      if (!res.ok) setMessage({ type: "error", text: json.error || "Geri yukleme basarisiz" });
      else {
        setMessage({ type: "success", text: json.message || "Geri yuklendi" });
        loadContent();
      }
    } catch {
      setMessage({ type: "error", text: "Geri yukleme hatasi" });
    } finally {
      setRestoring(false);
    }
  }

  async function handleLogout() {
    if (!confirmIfDirty(dirty, "Kaydedilmemis degisiklikler var. Cikmak istiyor musunuz?")) return;
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/novves-panel");
  }

  function renderForm() {
    if (loading) {
      return (
        <div className="flex h-80 items-center justify-center rounded-2xl border border-gray-200 bg-white">
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-gray-200 border-t-orange-500" />
            <span className="text-[14px] text-gray-400">Yukleniyor...</span>
          </div>
        </div>
      );
    }

    if (formData === null) {
      return (
        <div className="flex h-40 items-center justify-center rounded-2xl border border-gray-200 bg-white text-[15px] text-gray-400">
          Bu bolum icin icerik bulunamadi
        </div>
      );
    }

    if (mode === "advanced") {
      return <FieldEditor data={formData} path="" onChange={handleFieldChange} />;
    }

    if (sectionSchema) {
      return (
        <SchemaForm
          schema={sectionSchema}
          data={formData}
          onChange={setFormData}
        />
      );
    }

    return <SmartFallbackForm data={formData} onChange={setFormData} />;
  }

  const breadcrumb =
    mode === "simple" ? (
      <div className="flex flex-wrap items-center gap-2">
        {simpleView !== "pages" && (
          <button
            type="button"
            onClick={() =>
              guardedAction(() => setSimpleView(simpleView === "edit" ? "sections" : "pages"))
            }
            className="font-semibold text-orange-600 hover:underline"
          >
            {simpleView === "edit" ? currentGroup?.label : "Ana Menu"}
          </button>
        )}
        {simpleView === "edit" && (
          <>
            <span className="text-gray-300">/</span>
            <span className="font-semibold text-gray-800">{currentSection?.label}</span>
            {!isPartnerRecords && (
              <>
                <span className="text-gray-300">/</span>
                <span>{localeUi[locale as keyof typeof localeUi]?.label ?? locale}</span>
              </>
            )}
          </>
        )}
      </div>
    ) : (
      <div className="flex flex-wrap items-center gap-2 text-[13px]">
        <span className="text-gray-500">{currentGroup?.label}</span>
        <span className="text-gray-300">/</span>
        <span className="font-semibold text-gray-800">{currentSection?.label}</span>
        {contentSource && (
          <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-600">
            {contentSource}
          </span>
        )}
      </div>
    );

  if (mode === "advanced") {
    return (
      <div className="flex min-h-screen bg-[#f8f9fb]">
        <AdvancedSidebar
          groups={PAGE_GROUPS}
          activeFile={activeFile}
          activeSection={activeSection}
          locale={locale}
          expandedGroup={expandedGroup}
          sidebarSearch={sidebarSearch}
          username={username}
          isPartnerRecords={isPartnerRecords}
          onLocaleChange={handleLocaleChange}
          onSearchChange={setSidebarSearch}
          onExpandGroup={(file) => {
            setExpandedGroup(expandedGroup === file && !sidebarSearch ? "" : file);
            if (activeFile !== file) {
              setActiveFile(file);
              setActiveSection(PAGE_GROUPS.find((g) => g.file === file)?.sections[0]?.key ?? "");
            }
          }}
          onSelectSection={selectSection}
          onLogout={handleLogout}
        />

        <main className="ml-0 flex-1 max-md:ml-0 md:ml-[280px]">
          <header className="sticky top-0 z-20 border-b border-gray-200/60 bg-white/80 px-4 py-4 backdrop-blur-lg sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                {breadcrumb}
                <span className="rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 font-mono text-[10px] text-gray-400">
                  {isPartnerRecords ? "partner-records.json" : `${activeFile}.json`}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleModeChange("simple")}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-[11px] font-medium text-gray-500 hover:border-orange-200 hover:text-orange-600"
                >
                  Basit Mod
                </button>
                <button
                  type="button"
                  onClick={handleRestore}
                  disabled={restoring || isPartnerRecords}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-[11px] font-medium text-gray-500 hover:border-blue-200 hover:text-blue-600 disabled:opacity-50"
                >
                  {restoring ? "Geri yukleniyor..." : "Yedekten Geri Yukle"}
                </button>
                <button
                  type="button"
                  onClick={handleBackupAll}
                  disabled={backingUp}
                  className="rounded-lg border border-gray-200 px-3 py-1.5 text-[11px] font-medium text-gray-500 hover:border-orange-200 hover:text-orange-600 disabled:opacity-50"
                >
                  {backingUp ? "Yedekleniyor..." : "Tumunu Yedekle"}
                </button>
              </div>
            </div>
          </header>

          <div className="p-4 sm:p-8">
            {message && <MessageBanner message={message} onDismiss={() => setMessage(null)} />}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="max-h-[calc(100vh-220px)] overflow-y-auto px-4 py-6 sm:px-8">
                {renderForm()}
              </div>
              <SaveBar
                saving={saving}
                dirty={dirty}
                previewUrl={previewUrl}
                onSave={handleSave}
                onConfirmSave
              />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <AdminShell
      mode={mode}
      onModeChange={handleModeChange}
      username={username}
      locale={locale}
      onLocaleChange={handleLocaleChange}
      onCopyFromTr={simpleView === "edit" ? handleCopyFromTr : undefined}
      copying={copying}
      hideLocale={simpleView !== "edit" || isPartnerRecords}
      breadcrumb={simpleView !== "pages" ? breadcrumb : undefined}
      onLogout={handleLogout}
    >
      {message && <MessageBanner message={message} onDismiss={() => setMessage(null)} />}

      {simpleView === "pages" && (
        <PageGrid
          groups={PAGE_GROUPS}
          onSelect={(file) => {
            setActiveFile(file);
            setExpandedGroup(file);
            setSimpleView("sections");
          }}
        />
      )}

      {simpleView === "sections" && currentGroup && (
        <SectionList
          group={currentGroup}
          onSelect={(key) => selectSection(activeFile, key)}
          onBack={() => guardedAction(() => setSimpleView("pages"))}
        />
      )}

      {simpleView === "edit" && (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-900">
              {sectionSchema?.title ?? currentSection?.label}
            </h2>
            {hasSectionSchema(activeFile, activeSection) && (
              <p className="mt-1 text-[13px] text-green-600">Kolay duzenleme modu aktif</p>
            )}
          </div>
          <div className="max-h-[calc(100vh-280px)] overflow-y-auto px-6 py-6">
            {renderForm()}
          </div>
          <SaveBar
            saving={saving}
            dirty={dirty}
            previewUrl={previewUrl}
            onSave={handleSave}
            onConfirmSave
          />
        </div>
      )}
    </AdminShell>
  );
}

function MessageBanner({
  message,
  onDismiss,
}: {
  message: { type: "success" | "error"; text: string };
  onDismiss: () => void;
}) {
  return (
    <div
      className={`mb-5 flex items-center gap-2.5 rounded-xl border px-4 py-3 text-[14px] font-medium ${
        message.type === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-red-200 bg-red-50 text-red-600"
      }`}
    >
      <svg className={`h-5 w-5 shrink-0 ${message.type === "success" ? "text-emerald-500" : "text-red-500"}`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d={message.type === "success" ? "M4.5 12.75l6 6 9-13.5" : "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"} />
      </svg>
      {message.text}
      <button type="button" onClick={onDismiss} className="ml-auto opacity-40 hover:opacity-70">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
