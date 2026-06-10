// Footer alt-bar yasal linklerini Menü Yönetimi'ne (footer_legal) aktarır.
// İSTEĞE BAĞLI: Çalıştırılmadığında footer, 15 dilin tümünde yerelleştirilmiş
// sabit içeriği gösterir. Çalıştırılırsa bu linkler panelden düzenlenebilir hale
// gelir; yalnızca tr/en/ru etiketlenir, diğer 12 dil İngilizceye yedeklenir.
//
// Kullanım:  node scripts/seed-menu.mjs
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "node:fs";

const url = readFileSync(".env.local", "utf8").match(/^DATABASE_URL=(.+)$/m)?.[1]?.replace(/['"]/g, "");
const prisma = new PrismaClient({ datasources: { db: { url } } });

const ITEMS = [
  {
    href: "/legal",
    order: 0,
    labels: { tr: "Hukuk Merkezi", en: "Legal Center", ru: "Правовой центр" },
  },
  {
    href: "/privacy",
    order: 1,
    labels: { tr: "Gizlilik Politikası", en: "Privacy Policy", ru: "Политика конфиденциальности" },
  },
  {
    href: "/cookies",
    order: 2,
    labels: { tr: "Çerez Ayarları", en: "Cookie Settings", ru: "Настройки cookie" },
  },
  {
    href: "/kvkk/FR-0057-Kisisel-Veri-Sahibi-Basvuru-Formu.pdf",
    order: 3,
    external: true,
    labels: { tr: "Başvuru Formu", en: "Application Form", ru: "Форма заявки" },
  },
];

async function main() {
  const existing = await prisma.menuItem.count({ where: { location: "footer_legal" } });
  if (existing > 0) {
    console.log(`footer_legal zaten ${existing} öğe içeriyor — atlanıyor.`);
    return;
  }
  for (const it of ITEMS) {
    await prisma.menuItem.create({
      data: {
        location: "footer_legal",
        href: it.href,
        order: it.order,
        external: Boolean(it.external),
        visible: true,
        translations: {
          create: Object.entries(it.labels).map(([locale, label]) => ({ locale, label })),
        },
      },
    });
    console.log(`+ ${it.labels.tr} (${it.href})`);
  }
  console.log("footer_legal menüsü tohumlandı.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
