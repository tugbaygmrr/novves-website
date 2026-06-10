"use client";

import * as React from "react";
import Link from "next/link";
import { Pencil, Trash2, FolderArchive, FileText } from "lucide-react";
import { PANEL_BASE } from "@/lib/panel/nav";
import { useResourceList } from "@/lib/panel/use-resource-list";
import { formatBytes } from "@/lib/panel/format";
import { PageHeader } from "@/components/panel/shell/page-header";
import { Table, THead, TBody, TR, TH, TD } from "@/components/panel/ui/table";
import { StatusBadge } from "@/components/panel/ui/status-badge";
import { Pagination } from "@/components/panel/ui/pagination";
import { EmptyState } from "@/components/panel/ui/empty-state";
import { Skeleton } from "@/components/panel/ui/skeleton";
import { ConfirmDialog } from "@/components/panel/ui/confirm-dialog";
import { ListToolbar, RowActions } from "@/components/panel/data/list-toolbar";

interface DocItem {
  id: number;
  slug: string;
  title: string;
  categoryName: string;
  version: string | null;
  status: string;
  file: { id: number; path: string; fileName: string; size: number } | null;
}

const STATUS_OPTS = [
  { value: "", label: "Tüm durumlar" },
  { value: "DRAFT", label: "Taslak" },
  { value: "PUBLISHED", label: "Yayında" },
];

export function TechnicalDocsList() {
  const L = useResourceList<DocItem>("/api/admin/technical-documents");
  const [del, setDel] = React.useState<DocItem | null>(null);

  return (
    <div>
      <PageHeader title="Teknik Merkez" description="PDF, katalog ve teknik dokümanları yönetin." />
      <ListToolbar
        q={L.q}
        onQ={L.setQ}
        status={L.status}
        onStatus={L.setStatus}
        statusOptions={STATUS_OPTS}
        newHref={`${PANEL_BASE}/teknik-merkez/yeni`}
        newLabel="Yeni Doküman"
      />

      {L.loading ? (
        <div className="space-y-2 rounded-2xl border border-panel-border bg-panel-surface p-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : L.items.length === 0 ? (
        <EmptyState icon={FolderArchive} title="Henüz doküman yok" description="İlk dokümanı yükleyin." />
      ) : (
        <>
          <Table>
            <THead>
              <TR>
                <TH className="w-12"></TH>
                <TH>Başlık</TH>
                <TH>Kategori</TH>
                <TH>Sürüm</TH>
                <TH>Durum</TH>
                <TH className="w-24 text-right">İşlem</TH>
              </TR>
            </THead>
            <TBody>
              {L.items.map((d) => (
                <TR key={d.id}>
                  <TD>
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-panel-surface-2 text-panel-fg-subtle">
                      <FileText className="h-4 w-4" />
                    </span>
                  </TD>
                  <TD>
                    <Link href={`${PANEL_BASE}/teknik-merkez/${d.id}`} className="font-semibold text-panel-fg hover:text-panel-accent">
                      {d.title}
                    </Link>
                    {d.file && (
                      <p className="text-[11.5px] text-panel-fg-subtle">
                        {d.file.fileName} · {formatBytes(d.file.size)}
                      </p>
                    )}
                  </TD>
                  <TD className="text-panel-fg-muted">{d.categoryName}</TD>
                  <TD className="text-panel-fg-muted">{d.version ?? "—"}</TD>
                  <TD>
                    <StatusBadge status={d.status} />
                  </TD>
                  <TD>
                    <RowActions>
                      <Link
                        href={`${PANEL_BASE}/teknik-merkez/${d.id}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-muted hover:bg-panel-surface-2 hover:text-panel-fg"
                        aria-label="Düzenle"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDel(d)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-muted hover:bg-panel-danger-soft hover:text-panel-danger"
                        aria-label="Sil"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </RowActions>
                  </TD>
                </TR>
              ))}
            </TBody>
          </Table>
          <Pagination page={L.page} total={L.total} pageSize={L.pageSize} onPage={L.setPage} />
        </>
      )}

      <ConfirmDialog
        open={!!del}
        onClose={() => setDel(null)}
        onConfirm={async () => {
          if (del) await L.remove(del.id);
        }}
        title="Dokümanı sil"
        description={del ? `"${del.title}" silinecek. Emin misiniz?` : ""}
        confirmLabel="Sil"
        danger
      />
    </div>
  );
}
