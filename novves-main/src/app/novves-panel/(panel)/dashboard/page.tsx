import Link from "next/link";
import {
  Image as ImageIcon,
  ExternalLink,
  Plus,
  TrendingUp,
  FileText,
  AlertTriangle,
  Clock,
  CheckCircle2,
  History,
  Inbox,
  ArrowRight,
  Users,
  FolderArchive,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/panel/ui/card";
import { Badge } from "@/components/panel/ui/badge";
import { Button } from "@/components/panel/ui/button";
import { PageHeader } from "@/components/panel/shell/page-header";
import { PANEL_BASE } from "@/lib/panel/nav";
import { getDashboardData } from "@/lib/panel/data/dashboard";
import { relativeTimeTr, formatDateTr } from "@/lib/panel/format";

export const dynamic = "force-dynamic";

const TONE_BG: Record<string, string> = {
  accent: "bg-panel-accent-soft text-panel-accent",
  info: "bg-panel-info-soft text-panel-info",
  success: "bg-panel-success-soft text-panel-success",
  warning: "bg-panel-warning-soft text-panel-warning",
};

const AUDIT_ACTION: Record<string, string> = {
  create: "oluşturdu",
  update: "güncelledi",
  delete: "sildi",
  publish: "yayınladı",
  login: "giriş yaptı",
};

const ENTITY_LABEL: Record<string, string> = {
  TechnicalDocument: "Teknik Doküman",
  Media: "Medya",
  Reference: "Referans",
  TeamMember: "Ekip Üyesi",
  Article: "Blog/Haber",
  Product: "Ürün",
  MenuItem: "Menü",
  SiteSetting: "Site Ayarı",
  SeoMeta: "SEO Meta",
  Redirect: "Yönlendirme",
  ContactSubmission: "İletişim Talebi",
};

const SUB_STATUS: Record<string, { label: string; variant: "accent" | "neutral" }> = {
  NEW: { label: "Yeni", variant: "accent" },
  READ: { label: "Okundu", variant: "neutral" },
  ARCHIVED: { label: "Arşiv", variant: "neutral" },
};

const QUICK = [
  { label: "Sayfa Düzenle", href: `${PANEL_BASE}/sayfalar`, icon: FileText },
  { label: "Yeni Doküman", href: `${PANEL_BASE}/teknik-merkez/yeni`, icon: FolderArchive },
  { label: "Medya Yükle", href: `${PANEL_BASE}/medya`, icon: ImageIcon },
  { label: "SEO Kontrol", href: `${PANEL_BASE}/seo`, icon: TrendingUp },
];

export default async function DashboardPage() {
  const data = await getDashboardData();

  const stats = [
    { label: "Teknik Doküman", value: data.counts.technicalDocs, href: `${PANEL_BASE}/teknik-merkez`, icon: FolderArchive, tone: "accent" as const },
    { label: "Ekip", value: data.counts.team, href: `${PANEL_BASE}/ekip`, icon: Users, tone: "success" as const },
    { label: "Medya", value: data.counts.media, href: `${PANEL_BASE}/medya`, icon: ImageIcon, tone: "info" as const },
    { label: "İletişim", value: data.contactTotal, href: `${PANEL_BASE}/iletisim`, icon: Inbox, tone: "warning" as const },
  ];

  return (
    <div>
      <PageHeader
        title="Gösterge Paneli"
        description="Site içeriğinin genel durumu ve hızlı erişim."
        actions={
          <>
            <a href="/tr" target="_blank" rel="noreferrer">
              <Button variant="secondary" size="sm">
                <ExternalLink className="h-4 w-4" />
                Siteyi Görüntüle
              </Button>
            </a>
            <Link href={`${PANEL_BASE}/teknik-merkez/yeni`}>
              <Button size="sm">
                <Plus className="h-4 w-4" />
                Yeni Doküman
              </Button>
            </Link>
          </>
        }
      />

      {!data.ok && (
        <div className="mb-5 flex items-center gap-2 rounded-xl border border-panel-danger/30 bg-panel-danger-soft px-3.5 py-2.5 text-[12.5px] text-panel-danger">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          Veritabanına şu an ulaşılamıyor — sayımlar geçici olarak boş gösteriliyor.
        </div>
      )}

      {/* Yeni iletişim talebi şeridi */}
      {data.contactNew > 0 && (
        <Link
          href={`${PANEL_BASE}/iletisim`}
          className="mb-5 flex items-center gap-4 rounded-2xl border border-panel-accent/25 bg-panel-accent-soft px-5 py-4 transition-colors hover:brightness-[0.98]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-panel-accent text-panel-accent-fg">
            <Inbox className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <p className="text-[15px] font-bold text-panel-fg">
              {data.contactNew} yeni iletişim talebi bekliyor
            </p>
            <p className="text-[13px] text-panel-fg-muted">
              Toplam {data.contactTotal} talep. İncelemek için tıklayın.
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-panel-accent" />
        </Link>
      )}

      {/* İstatistik kartları */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link key={s.label} href={s.href}>
              <Card className="panel-hover-raise">
                <CardContent className="flex items-start justify-between p-5">
                  <div>
                    <p className="text-[13px] font-medium text-panel-fg-muted">{s.label}</p>
                    <p className="mt-1.5 text-[28px] font-bold leading-none tracking-tight text-panel-fg">
                      {s.value}
                    </p>
                  </div>
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${TONE_BG[s.tone]}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Hızlı erişim */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {QUICK.map((q) => {
          const Icon = q.icon;
          return (
            <Link key={q.label} href={q.href}>
              <Button variant="secondary" size="sm">
                <Icon className="h-4 w-4" />
                {q.label}
              </Button>
            </Link>
          );
        })}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Son işlemler (audit) */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Son İşlemler</CardTitle>
            <span className="text-[12px] text-panel-fg-subtle">Aktivite kaydı</span>
          </CardHeader>
          <CardContent className="space-y-0.5">
            {data.recentAudit.length === 0 ? (
              <p className="py-8 text-center text-[13px] text-panel-fg-muted">Henüz işlem kaydı yok.</p>
            ) : (
              data.recentAudit.map((a) => (
                <div key={a.id} className="flex items-center gap-3 rounded-lg px-2 py-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-panel-surface-2 text-panel-fg-subtle">
                    <History className="h-4 w-4" />
                  </span>
                  <p className="min-w-0 flex-1 truncate text-[13px] text-panel-fg-muted">
                    <span className="font-semibold text-panel-fg">{a.username ?? "—"}</span>{" "}
                    {ENTITY_LABEL[a.entity] ?? a.entity} {AUDIT_ACTION[a.action] ?? a.action}
                  </p>
                  <span className="shrink-0 text-[12px] text-panel-fg-subtle">
                    {relativeTimeTr(a.createdAt)}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* İçerik durumu + trafik */}
        <div className="space-y-5">
          <Card>
            <CardHeader>
              <CardTitle>İçerik Durumu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-2 text-panel-fg-muted">
                  <CheckCircle2 className="h-4 w-4 text-panel-success" /> Yayında
                </span>
                <Badge variant="success">{data.published}</Badge>
              </div>
              <div className="flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-2 text-panel-fg-muted">
                  <Clock className="h-4 w-4 text-panel-warning" /> Taslak
                </span>
                <Badge variant="warning">{data.draft}</Badge>
              </div>
              <Link
                href={`${PANEL_BASE}/seo`}
                className="flex items-center justify-between text-[13px] transition-colors hover:text-panel-fg"
              >
                <span className="flex items-center gap-2 text-panel-fg-muted">
                  <AlertTriangle className="h-4 w-4 text-panel-danger" /> SEO eksik
                </span>
                <Badge variant="danger">{data.seoIssues}</Badge>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trafik</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-panel-border bg-panel-surface-2 text-center text-[12px] text-panel-fg-subtle">
                Analytics entegrasyonu
                <br />
                (Ayarlar &rsaquo; Analytics ile bağlanacak)
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Son iletişim talepleri */}
      <Card className="mt-5">
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Son İletişim Talepleri</CardTitle>
          <Link
            href={`${PANEL_BASE}/iletisim`}
            className="text-[12px] font-medium text-panel-accent hover:underline"
          >
            Tümü
          </Link>
        </CardHeader>
        <CardContent className="space-y-0.5">
          {data.recentSubmissions.length === 0 ? (
            <p className="py-8 text-center text-[13px] text-panel-fg-muted">Henüz talep yok.</p>
          ) : (
            data.recentSubmissions.map((sub) => {
              const st = SUB_STATUS[sub.status] ?? SUB_STATUS.READ;
              return (
                <div key={sub.id} className="flex items-center gap-3 rounded-lg px-2 py-2.5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13.5px] font-medium text-panel-fg">
                      {sub.name}
                      {sub.company && <span className="text-panel-fg-subtle"> · {sub.company}</span>}
                    </p>
                    <p className="truncate text-[12px] text-panel-fg-subtle">{sub.subject ?? "—"}</p>
                  </div>
                  <Badge variant={st.variant}>{st.label}</Badge>
                  <span className="shrink-0 text-[12px] text-panel-fg-subtle">
                    {formatDateTr(sub.createdAt)}
                  </span>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
}
