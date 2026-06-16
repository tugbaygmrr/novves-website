"use client";

import * as React from "react";
import { Mail, Trash2, Inbox, Building2, Phone, AtSign } from "lucide-react";
import { apiGet, apiPatch, apiDelete } from "@/lib/panel/api";
import { toast } from "@/lib/panel/stores/toast-store";
import { formatDateTimeTr } from "@/lib/panel/format";
import { PageHeader } from "@/components/panel/shell/page-header";
import { Tabs } from "@/components/panel/ui/tabs";
import { StatusBadge } from "@/components/panel/ui/status-badge";
import { Button } from "@/components/panel/ui/button";
import { Badge } from "@/components/panel/ui/badge";
import { Skeleton } from "@/components/panel/ui/skeleton";
import { EmptyState } from "@/components/panel/ui/empty-state";
import { Pagination } from "@/components/panel/ui/pagination";
import { Dialog } from "@/components/panel/ui/dialog";
import { ConfirmDialog } from "@/components/panel/ui/confirm-dialog";

interface Submission {
  id: number;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  subject: string | null;
  message: string;
  status: string;
  createdAt: string;
}

const STATUS_TABS = [
  { value: "", label: "Tümü" },
  { value: "NEW", label: "Yeni" },
  { value: "READ", label: "Okundu" },
  { value: "ARCHIVED", label: "Arşiv" },
];

export function SubmissionsInbox() {
  const [items, setItems] = React.useState<Submission[]>([]);
  const [total, setTotal] = React.useState(0);
  const [newCount, setNewCount] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(30);
  const [page, setPage] = React.useState(1);
  const [status, setStatus] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState<Submission | null>(null);
  const [del, setDel] = React.useState<Submission | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (status) params.set("status", status);
      params.set("page", String(page));
      const json = await apiGet<{ items: Submission[]; total: number; newCount: number; pageSize: number }>(
        `/api/admin/submissions?${params.toString()}`,
      );
      setItems(json.items);
      setTotal(json.total);
      setNewCount(json.newCount);
      setPageSize(json.pageSize);
    } catch {
      toast.error("Talepler yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, [status, page]);

  React.useEffect(() => {
    load();
  }, [load]);
  React.useEffect(() => setPage(1), [status]);

  async function setStatusOf(id: number, st: string) {
    try {
      await apiPatch(`/api/admin/submissions/${id}`, { status: st });
      setItems((prev) => prev.map((s) => (s.id === id ? { ...s, status: st } : s)));
      setSelected((s) => (s && s.id === id ? { ...s, status: st } : s));
    } catch {
      toast.error("Güncellenemedi");
    }
  }

  function open(s: Submission) {
    setSelected(s);
    if (s.status === "NEW") setStatusOf(s.id, "READ");
  }

  return (
    <div>
      <PageHeader title="İletişim Talepleri" description="Web sitesi iletişim formu başvuruları." />

      <div className="mb-4 flex items-center justify-between gap-3">
        <Tabs items={STATUS_TABS} value={status} onValueChange={setStatus} layoutId="sub-status" />
        {newCount > 0 && (
          <Badge variant="accent" dot>
            {newCount} yeni
          </Badge>
        )}
      </div>

      {loading ? (
        <div className="space-y-2 rounded-2xl border border-panel-border bg-panel-surface p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState icon={Inbox} title="Talep yok" description="Bu filtrede başvuru bulunmuyor." />
      ) : (
        <>
          <div className="divide-y divide-panel-border overflow-hidden rounded-2xl border border-panel-border bg-panel-surface">
            {items.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => open(s)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-panel-surface-2"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-panel-surface-2 text-panel-fg-subtle">
                  <Mail className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 truncate text-[13.5px] font-semibold text-panel-fg">
                    {s.name}
                    {s.company && <span className="font-normal text-panel-fg-subtle">· {s.company}</span>}
                    {s.status === "NEW" && <span className="h-1.5 w-1.5 rounded-full bg-panel-accent" />}
                  </p>
                  <p className="truncate text-[12px] text-panel-fg-muted">{s.subject || s.message}</p>
                </div>
                <div className="shrink-0 text-right">
                  <StatusBadge status={s.status} />
                  <p className="mt-1 text-[11px] text-panel-fg-subtle">{formatDateTimeTr(s.createdAt)}</p>
                </div>
              </button>
            ))}
          </div>
          <Pagination page={page} total={total} pageSize={pageSize} onPage={setPage} />
        </>
      )}

      <Dialog open={!!selected} onClose={() => setSelected(null)} size="lg" title={selected?.subject || "Talep"}>
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <Contact icon={Mail} label="Ad" value={selected.name} />
              <Contact icon={AtSign} label="E-posta" value={selected.email} href={`mailto:${selected.email}`} />
              {selected.company && <Contact icon={Building2} label="Firma" value={selected.company} />}
              {selected.phone && <Contact icon={Phone} label="Telefon" value={selected.phone} href={`tel:${selected.phone}`} />}
            </div>
            <div className="rounded-xl border border-panel-border bg-panel-surface-2 p-4">
              <p className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-panel-fg">{selected.message}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-panel-border pt-3">
              <Button variant="secondary" size="sm" onClick={() => setStatusOf(selected.id, "READ")}>
                Okundu
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setStatusOf(selected.id, "ARCHIVED")}>
                Arşivle
              </Button>
              <Button variant="danger-soft" size="sm" className="ml-auto" onClick={() => setDel(selected)}>
                <Trash2 className="h-4 w-4" />
                Sil
              </Button>
            </div>
          </div>
        )}
      </Dialog>

      <ConfirmDialog
        open={!!del}
        onClose={() => setDel(null)}
        onConfirm={async () => {
          if (!del) return;
          await apiDelete(`/api/admin/submissions/${del.id}`);
          toast.success("Silindi");
          setSelected(null);
          load();
        }}
        title="Talebi sil"
        description="Bu başvuru kalıcı olarak silinecek."
        confirmLabel="Sil"
        danger
      />
    </div>
  );
}

function Contact({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-lg bg-panel-surface-2 px-3 py-2">
      <Icon className="h-4 w-4 shrink-0 text-panel-fg-subtle" />
      <div className="min-w-0">
        <p className="text-[10.5px] uppercase tracking-wide text-panel-fg-subtle">{label}</p>
        {href ? (
          <a href={href} className="truncate text-[13px] font-medium text-panel-accent hover:underline">
            {value}
          </a>
        ) : (
          <p className="truncate text-[13px] font-medium text-panel-fg">{value}</p>
        )}
      </div>
    </div>
  );
}
