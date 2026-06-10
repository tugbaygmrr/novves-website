// Teknik Merkez doküman kategorilerini tohumlar (idempotent).
// Çalıştır: DATABASE_URL=... node scripts/seed-doc-categories.mjs
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CATEGORIES = [
  { slug: "teknik-dokuman", order: 1, tr: "Teknik Doküman", en: "Technical Document", ru: "Технический документ" },
  { slug: "sertifika", order: 2, tr: "Sertifika", en: "Certificate", ru: "Сертификат" },
  { slug: "katalog", order: 3, tr: "Katalog", en: "Catalog", ru: "Каталог" },
  { slug: "test-raporu", order: 4, tr: "Test Raporu", en: "Test Report", ru: "Протокол испытаний" },
  { slug: "cfd-raporu", order: 5, tr: "CFD Raporu", en: "CFD Report", ru: "CFD-отчёт" },
  { slug: "brosur", order: 6, tr: "Broşür", en: "Brochure", ru: "Брошюра" },
  { slug: "montaj-kilavuzu", order: 7, tr: "Montaj Kılavuzu", en: "Installation Guide", ru: "Руководство по монтажу" },
];

for (const c of CATEGORIES) {
  const cat = await prisma.docCategory.upsert({
    where: { slug: c.slug },
    update: { order: c.order },
    create: { slug: c.slug, order: c.order },
  });
  for (const [locale, name] of [["tr", c.tr], ["en", c.en], ["ru", c.ru]]) {
    await prisma.docCategoryTranslation.upsert({
      where: { categoryId_locale: { categoryId: cat.id, locale } },
      update: { name },
      create: { categoryId: cat.id, locale, name },
    });
  }
}

const n = await prisma.docCategory.count();
console.log(`Tamam: ${n} doküman kategorisi.`);
await prisma.$disconnect();
