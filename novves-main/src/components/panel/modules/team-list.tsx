"use client";

import * as React from "react";
import Link from "next/link";
import { Pencil, Trash2, Users, User } from "lucide-react";
import { PANEL_BASE } from "@/lib/panel/nav";
import { useResourceList } from "@/lib/panel/use-resource-list";
import { PageHeader } from "@/components/panel/shell/page-header";
import { Table, THead, TBody, TR, TH, TD } from "@/components/panel/ui/table";
import { StatusBadge } from "@/components/panel/ui/status-badge";
import { Pagination } from "@/components/panel/ui/pagination";
import { EmptyState } from "@/components/panel/ui/empty-state";
import { Skeleton } from "@/components/panel/ui/skeleton";
import { ConfirmDialog } from "@/components/panel/ui/confirm-dialog";
import { ListToolbar, RowActions } from "@/components/panel/data/list-toolbar";

interface TeamItem {
  id: number;
  name: string;
  title: string | null;
  department: string | null;
  status: string;
  photo: string | null;
}

export function TeamList() {
  const L = useResourceList<TeamItem>("/api/admin/team");
  const [del, setDel] = React.useState<TeamItem | null>(null);

  return (
    <div>
      <PageHeader title="Ekip" description="Ekip üyelerini yönetin." />
      <ListToolbar q={L.q} onQ={L.setQ} newHref={`${PANEL_BASE}/ekip/yeni`} newLabel="Yeni Üye" />

      {L.loading ? (
        <div className="space-y-2 rounded-2xl border border-panel-border bg-panel-surface p-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : L.items.length === 0 ? (
        <EmptyState icon={Users} title="Henüz ekip üyesi yok" description="İlk üyeyi ekleyin." />
      ) : (
        <>
          <Table>
            <THead>
              <TR>
                <TH className="w-14"></TH>
                <TH>Ad</TH>
                <TH>Ünvan</TH>
                <TH>Departman</TH>
                <TH>Durum</TH>
                <TH className="w-24 text-right">İşlem</TH>
              </TR>
            </THead>
            <TBody>
              {L.items.map((m) => (
                <TR key={m.id}>
                  <TD>
                    <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-panel-surface-2">
                      {m.photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.photo} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <User className="h-4 w-4 text-panel-fg-subtle" />
                      )}
                    </span>
                  </TD>
                  <TD>
                    <Link href={`${PANEL_BASE}/ekip/${m.id}`} className="font-semibold text-panel-fg hover:text-panel-accent">
                      {m.name}
                    </Link>
                  </TD>
                  <TD className="text-panel-fg-muted">{m.title ?? "—"}</TD>
                  <TD className="text-panel-fg-muted">{m.department ?? "—"}</TD>
                  <TD>
                    <StatusBadge status={m.status} />
                  </TD>
                  <TD>
                    <RowActions>
                      <Link
                        href={`${PANEL_BASE}/ekip/${m.id}`}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-muted hover:bg-panel-surface-2 hover:text-panel-fg"
                        aria-label="Düzenle"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setDel(m)}
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
        title="Üyeyi sil"
        description={del ? `"${del.name}" silinecek. Emin misiniz?` : ""}
        confirmLabel="Sil"
        danger
      />
    </div>
  );
}
