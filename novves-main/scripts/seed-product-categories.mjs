// Ürün kategorilerini tohumlar (idempotent).
// Çalıştır: DATABASE_URL=... node scripts/seed-product-categories.mjs
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CATS = [
  { slug: "duman-tahliye-fanlari", icon: "fan", order: 1, tr: "Duman Tahliye Fanları", en: "Smoke Extraction Fans", ru: "Дымоудаляющие вентиляторы" },
  { slug: "jet-fanlar", icon: "wind", order: 2, tr: "Jet Fanlar", en: "Jet Fans", ru: "Струйные вентиляторы" },
  { slug: "aksiyal-fanlar", icon: "fan", order: 3, tr: "Aksiyal Fanlar", en: "Axial Fans", ru: "Осевые вентиляторы" },
  { slug: "cati-fanlari", icon: "building", order: 4, tr: "Çatı Fanları", en: "Roof Fans", ru: "Крышные вентиляторы" },
  { slug: "duvar-fanlari", icon: "fan", order: 5, tr: "Duvar Fanları", en: "Wall Fans", ru: "Настенные вентиляторы" },
  { slug: "atex-fanlar", icon: "shield", order: 6, tr: "ATEX Fanlar", en: "ATEX Fans", ru: "ATEX вентиляторы" },
  { slug: "damper-sistemleri", icon: "list", order: 7, tr: "Damper Sistemleri", en: "Damper Systems", ru: "Системы заслонок" },
  { slug: "otomasyon-panolari", icon: "monitor", order: 8, tr: "Otomasyon Panoları", en: "Automation Panels", ru: "Панели автоматизации" },
  { slug: "fan-aksesuarlari", icon: "folder", order: 9, tr: "Fan Aksesuarları", en: "Fan Accessories", ru: "Аксессуары вентиляторов" },
];

for (const c of CATS) {
  const cat = await prisma.productCategory.upsert({
    where: { slug: c.slug },
    update: { order: c.order, iconSlug: c.icon },
    create: { slug: c.slug, order: c.order, iconSlug: c.icon },
  });
  for (const [locale, name] of [["tr", c.tr], ["en", c.en], ["ru", c.ru]]) {
    await prisma.productCategoryTranslation.upsert({
      where: { categoryId_locale: { categoryId: cat.id, locale } },
      update: { name },
      create: { categoryId: cat.id, locale, name },
    });
  }
}

const n = await prisma.productCategory.count();
console.log(`Tamam: ${n} ürün kategorisi.`);
await prisma.$disconnect();
