import type { ComponentType } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  FolderArchive,
  TrendingUp,
  Menu as MenuIcon,
  Inbox,
  Image as ImageIcon,
  UserCog,
  Settings,
} from "lucide-react";
import { can, type AdminModule, type Role } from "@/lib/admin/rbac";

export type PanelIcon = ComponentType<{ className?: string }>;

export interface NavItem {
  label: string;
  href: string;
  icon: PanelIcon;
  /** RBAC modülü; "read" izni olmayan kullanıcıya gösterilmez. */
  module: AdminModule;
  /** Yalnızca bu roller görebilir (modül izninden bağımsız ek kısıt). */
  onlyRoles?: Role[];
  /** Arama/command için ek anahtar kelimeler. */
  keywords?: string[];
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

/** Yeni panel kök yolu — cutover'da "/novves-panel" olacak. */
export const PANEL_BASE = "/novves-panel";

export const NAV_GROUPS: NavGroup[] = [
  {
    title: "Genel",
    items: [
      {
        label: "Gösterge Paneli",
        href: `${PANEL_BASE}/dashboard`,
        icon: LayoutDashboard,
        module: "dashboard",
        keywords: ["dashboard", "ana ekran", "özet"],
      },
    ],
  },
  {
    title: "İçerik",
    items: [
      {
        label: "Sayfalar",
        href: `${PANEL_BASE}/sayfalar`,
        icon: FileText,
        module: "home",
        keywords: ["section", "bölüm", "hero", "içerik", "metin"],
      },
      {
        label: "Ekip",
        href: `${PANEL_BASE}/ekip`,
        icon: Users,
        module: "team",
        keywords: ["personel", "çalışan", "kadro"],
      },
      {
        label: "Teknik Merkez",
        href: `${PANEL_BASE}/teknik-merkez`,
        icon: FolderArchive,
        module: "technical",
        keywords: ["doküman", "pdf", "katalog", "sertifika", "indirilebilir"],
      },
    ],
  },
  {
    title: "Pazarlama",
    items: [
      {
        label: "SEO Yönetimi",
        href: `${PANEL_BASE}/seo`,
        icon: TrendingUp,
        module: "seo",
        keywords: ["meta", "başlık", "açıklama", "sitemap", "robots", "skor"],
      },
      {
        label: "Menü",
        href: `${PANEL_BASE}/menu`,
        icon: MenuIcon,
        module: "menu",
        keywords: ["navigasyon", "navbar", "footer", "link"],
      },
    ],
  },
  {
    title: "Sistem",
    items: [
      {
        label: "İletişim Talepleri",
        href: `${PANEL_BASE}/iletisim`,
        icon: Inbox,
        module: "contact",
        keywords: ["form", "başvuru", "mesaj", "gelen kutusu"],
      },
      {
        label: "Medya Kütüphanesi",
        href: `${PANEL_BASE}/medya`,
        icon: ImageIcon,
        module: "mediaLibrary",
        keywords: ["görsel", "dosya", "upload", "yükle", "resim"],
      },
      {
        label: "Kullanıcılar",
        href: `${PANEL_BASE}/kullanicilar`,
        icon: UserCog,
        module: "users",
        keywords: ["rol", "yetki", "admin", "hesap"],
      },
      {
        label: "Ayarlar",
        href: `${PANEL_BASE}/ayarlar`,
        icon: Settings,
        module: "users",
        onlyRoles: ["SUPER_ADMIN", "ADMIN"],
        keywords: ["logo", "favicon", "sosyal", "smtp", "analytics", "site"],
      },
    ],
  },
];

/** Kullanıcının rolüne göre erişebileceği nav gruplarını döndürür. */
export function filterNavForRole(role: Role): NavGroup[] {
  return NAV_GROUPS.map((g) => ({
    ...g,
    items: g.items.filter(
      (it) =>
        can(role, it.module, "read") && (!it.onlyRoles || it.onlyRoles.includes(role)),
    ),
  })).filter((g) => g.items.length > 0);
}

/** Düz (gruplanmamış) nav listesi — command palette ve breadcrumb için. */
export function flatNav(): NavItem[] {
  return NAV_GROUPS.flatMap((g) => g.items);
}
