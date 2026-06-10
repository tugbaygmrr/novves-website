"use client";

import * as React from "react";
import { Plus, Pencil, Trash2, ShieldCheck } from "lucide-react";
import { apiGet, apiPost, apiPatch, apiDelete } from "@/lib/panel/api";
import { toast } from "@/lib/panel/stores/toast-store";
import { formatDateTimeTr } from "@/lib/panel/format";
import { ROLES, ROLE_LABELS, type Role } from "@/lib/admin/rbac";
import { PageHeader } from "@/components/panel/shell/page-header";
import { Table, THead, TBody, TR, TH, TD } from "@/components/panel/ui/table";
import { Input } from "@/components/panel/ui/input";
import { Select } from "@/components/panel/ui/select";
import { Switch } from "@/components/panel/ui/switch";
import { Button } from "@/components/panel/ui/button";
import { Badge } from "@/components/panel/ui/badge";
import { Skeleton } from "@/components/panel/ui/skeleton";
import { Dialog } from "@/components/panel/ui/dialog";
import { ConfirmDialog } from "@/components/panel/ui/confirm-dialog";
import { Field } from "@/components/panel/form/field";

interface UserRow {
  id: number;
  username: string;
  role: string;
  isActive: boolean;
  lastLogin: string | null;
  createdAt: string;
}

export function UsersManager() {
  const [items, setItems] = React.useState<UserRow[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [creating, setCreating] = React.useState(false);
  const [editing, setEditing] = React.useState<UserRow | null>(null);
  const [del, setDel] = React.useState<UserRow | null>(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const json = await apiGet<{ items: UserRow[] }>("/api/admin/users");
      setItems(json.items);
    } catch {
      toast.error("Kullanıcılar yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  return (
    <div>
      <PageHeader
        title="Kullanıcılar"
        description="Panel kullanıcıları ve yetki rolleri."
        actions={
          <Button size="sm" onClick={() => setCreating(true)}>
            <Plus className="h-4 w-4" />
            Yeni Kullanıcı
          </Button>
        }
      />

      {loading ? (
        <div className="space-y-2 rounded-2xl border border-panel-border bg-panel-surface p-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : (
        <Table>
          <THead>
            <TR>
              <TH>Kullanıcı</TH>
              <TH>Rol</TH>
              <TH>Durum</TH>
              <TH>Son giriş</TH>
              <TH className="w-24 text-right">İşlem</TH>
            </TR>
          </THead>
          <TBody>
            {items.map((u) => (
              <TR key={u.id}>
                <TD>
                  <span className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-panel-accent-soft text-[11px] font-bold uppercase text-panel-accent">
                      {u.username.slice(0, 2)}
                    </span>
                    <span className="font-semibold text-panel-fg">{u.username}</span>
                  </span>
                </TD>
                <TD>
                  <Badge variant={u.role === "SUPER_ADMIN" ? "accent" : "neutral"}>
                    <ShieldCheck className="h-3 w-3" />
                    {ROLE_LABELS[u.role as Role] ?? u.role}
                  </Badge>
                </TD>
                <TD>
                  <Badge variant={u.isActive ? "success" : "neutral"} dot>
                    {u.isActive ? "Aktif" : "Pasif"}
                  </Badge>
                </TD>
                <TD className="text-panel-fg-muted">
                  {u.lastLogin ? formatDateTimeTr(u.lastLogin) : "—"}
                </TD>
                <TD>
                  <div className="flex justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => setEditing(u)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-muted hover:bg-panel-surface-2 hover:text-panel-fg"
                      aria-label="Düzenle"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDel(u)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-panel-fg-muted hover:bg-panel-danger-soft hover:text-panel-danger"
                      aria-label="Sil"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </TD>
              </TR>
            ))}
          </TBody>
        </Table>
      )}

      {creating && (
        <CreateUserDialog
          onClose={() => setCreating(false)}
          onDone={() => {
            setCreating(false);
            load();
          }}
        />
      )}
      {editing && (
        <EditUserDialog
          user={editing}
          onClose={() => setEditing(null)}
          onDone={() => {
            setEditing(null);
            load();
          }}
        />
      )}
      <ConfirmDialog
        open={!!del}
        onClose={() => setDel(null)}
        onConfirm={async () => {
          if (!del) return;
          try {
            await apiDelete(`/api/admin/users/${del.id}`);
            toast.success("Silindi");
            load();
          } catch (e) {
            toast.error(e instanceof Error ? e.message : "Silinemedi");
          }
        }}
        title="Kullanıcıyı sil"
        description={del ? `"${del.username}" silinecek.` : ""}
        confirmLabel="Sil"
        danger
      />
    </div>
  );
}

function RoleSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value)}>
      {ROLES.map((r) => (
        <option key={r} value={r}>
          {ROLE_LABELS[r]}
        </option>
      ))}
    </Select>
  );
}

function CreateUserDialog({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState<string>("CONTENT_EDITOR");
  const [saving, setSaving] = React.useState(false);

  async function save() {
    if (!username.trim() || password.length < 6) return toast.error("Kullanıcı adı + en az 6 haneli şifre");
    setSaving(true);
    try {
      await apiPost("/api/admin/users", { username, password, role, isActive: true });
      toast.success("Kullanıcı oluşturuldu");
      onDone();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Oluşturulamadı");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog
      open
      onClose={onClose}
      title="Yeni Kullanıcı"
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Vazgeç
          </Button>
          <Button size="sm" onClick={save} loading={saving}>
            Oluştur
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Kullanıcı adı" required>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        </Field>
        <Field label="Şifre" required hint="En az 6 karakter">
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <Field label="Rol">
          <RoleSelect value={role} onChange={setRole} />
        </Field>
      </div>
    </Dialog>
  );
}

function EditUserDialog({
  user,
  onClose,
  onDone,
}: {
  user: UserRow;
  onClose: () => void;
  onDone: () => void;
}) {
  const [role, setRole] = React.useState(user.role);
  const [isActive, setIsActive] = React.useState(user.isActive);
  const [password, setPassword] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  async function save() {
    setSaving(true);
    try {
      const body: Record<string, unknown> = { role, isActive };
      if (password) body.password = password;
      await apiPatch(`/api/admin/users/${user.id}`, body);
      toast.success("Güncellendi");
      onDone();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Güncellenemedi");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog
      open
      onClose={onClose}
      title={`${user.username} — Düzenle`}
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Vazgeç
          </Button>
          <Button size="sm" onClick={save} loading={saving}>
            Kaydet
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Rol">
          <RoleSelect value={role} onChange={setRole} />
        </Field>
        <Field label="Durum">
          <label className="flex items-center gap-2.5 text-[13px] text-panel-fg-muted">
            <Switch checked={isActive} onCheckedChange={setIsActive} />
            {isActive ? "Aktif" : "Pasif"}
          </label>
        </Field>
        <Field label="Şifre sıfırla" hint="Boş bırakırsanız değişmez">
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Yeni şifre" />
        </Field>
      </div>
    </Dialog>
  );
}
