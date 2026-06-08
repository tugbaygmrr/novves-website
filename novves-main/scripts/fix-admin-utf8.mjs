#!/usr/bin/env node
/**
 * Fix admin panel Turkish text using Unicode escapes (Windows-safe).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function w(rel, content) {
  const file = path.join(ROOT, rel);
  fs.writeFileSync(file, content, "utf8");
  const ok = fs.readFileSync(file, "utf8");
  if (!ok.includes("\u0130") && content.includes("\u0130")) throw new Error(`verify fail: ${rel}`);
  console.log("OK", rel);
}

function patch(rel, pairs) {
  const file = path.join(ROOT, rel);
  let text = fs.readFileSync(file, "utf8");
  for (const [a, b] of pairs) text = text.split(a).join(b);
  fs.writeFileSync(file, text, "utf8");
  console.log("patch", rel);
}

// page-group-meta.ts
w(
  "src/lib/admin/page-group-meta.ts",
  `/** Human descriptions for simple-mode page cards. */

export const PAGE_GROUP_DESCRIPTIONS: Record<string, string> = {
  home: "Ana sayfadaki ba\u015fl\u0131klar\u0131, metinleri ve butonlar\u0131 d\u00fczenleyin",
  common: "\u00dcst men\u00fc ve alt bilgi (footer) yaz\u0131lar\u0131n\u0131 de\u011fi\u015ftirin",
  products: "\u00dcr\u00fcn sayfalar\u0131ndaki a\u00e7\u0131klama ve ba\u015fl\u0131klar\u0131 d\u00fczenleyin",
  solutions: "\u00c7\u00f6z\u00fcm sayfalar\u0131ndaki metinleri g\u00fcncelleyin",
  services: "Hizmet sayfalar\u0131ndaki i\u00e7erikleri d\u00fczenleyin",
  corporate: "Kurumsal sayfa metinlerini g\u00fcncelleyin",
  contact: "\u0130leti\u015fim sayfas\u0131 ve form yaz\u0131lar\u0131n\u0131 d\u00fczenleyin",
  sustainability: "S\u00fcrd\u00fcr\u00fclebilirlik sayfas\u0131 metinlerini de\u011fi\u015ftirin",
  technical: "Teknik merkez ve blog metinlerini d\u00fczenleyin",
  kvkk: "Gizlilik ve KVKK sayfas\u0131 metinlerini g\u00fcncelleyin",
  "partner-records": "Partner listesini ekleyin veya d\u00fczenleyin",
};
`,
);

const patches = [
  ["src/components/admin/simple/locale-picker.tsx", [
    ["Turkce'den kopyala", "T\u00fcrk\u00e7e'den kopyala"],
    ["Kopyalaniyor...", "Kopyalan\u0131yor..."],
  ]],
  ["src/components/admin/simple/save-bar.tsx", [
    ["Degisiklikleri kaydetmek istediginize emin misiniz?", "De\u011fi\u015fiklikleri kaydetmek istedi\u011finize emin misiniz?"],
    ["Siteyi Gor", "Siteyi G\u00f6r"],
    ["Kaydedilmemis degisiklikler var", "Kaydedilmemi\u015f de\u011fi\u015fiklikler var"],
  ]],
  ["src/components/admin/simple/page-grid.tsx", [
    ["Ne degistirmek istiyorsunuz?", "Ne de\u011fi\u015ftirmek istiyorsunuz?"],
    ["Asagidaki kartlardan birini secin", "A\u015fa\u011f\u0131daki kartlardan birini se\u00e7in"],
    ["metinleri duzenleyin", "metinleri d\u00fczenleyin"],
    [" bolum ", " b\u00f6l\u00fcm "],
  ]],
  ["src/components/admin/simple/section-list.tsx", [
    ["Duzenlemek istediginiz bolumu secin", "D\u00fczenlemek istedi\u011finiz b\u00f6l\u00fcm\u00fc se\u00e7in"],
  ]],
  ["src/components/admin/simple/schema-form.tsx", [
    ['?? "Oge"', '?? "\u00d6\u011fe"'],
    ['?? "oge"', '?? "\u00f6\u011fe"'],
    ["Gelismis ayarlar", "Geli\u015fmi\u015f ayarlar"],
  ]],
  ["src/components/admin/simple/smart-fallback-form.tsx", [
    ["Tum alanlari goster", "T\u00fcm alanlar\u0131 g\u00f6ster"],
    [" ile acabilirsiniz", " ile a\u00e7abilirsiniz"],
  ]],
  ["src/components/admin/advanced/sidebar.tsx", [
    ["Gelismis Mod", "Geli\u015fmi\u015f Mod"],
    ["Bolum ara...", "B\u00f6l\u00fcm ara..."],
    ["Yonetici", "Y\u00f6netici"],
    ['title="Cikis"', 'title="\u00c7\u0131k\u0131\u015f"'],
  ]],
  ["src/components/admin/advanced/field-editor.tsx", [
    [" oge", " \u00f6\u011fe"],
  ]],
  ["src/components/admin/shared/unsaved-guard.ts", [
    ["Kaydedilmemis degisiklikler var. Devam etmek istiyor musunuz?", "Kaydedilmemi\u015f de\u011fi\u015fiklikler var. Devam etmek istiyor musunuz?"],
  ]],
  ["src/app/novves-panel/dashboard/page.tsx", [
    ["Icerik yuklenemedi", "\u0130\u00e7erik y\u00fcklenemedi"],
    ["Bu bolumun Turkce icerigi", "Bu b\u00f6l\u00fcm\u00fcn T\u00fcrk\u00e7e i\u00e7eri\u011fi"],
    ["Turkce icerik kopyalandi. Kaydetmeyi unutmayin.", "T\u00fcrk\u00e7e i\u00e7erik kopyaland\u0131. Kaydetmeyi unutmay\u0131n."],
    ["Kopyalama basarisiz", "Kopyalama ba\u015far\u0131s\u0131z"],
    ["Kaydetme basarisiz", "Kaydetme ba\u015far\u0131s\u0131z"],
    ["Sunucu hatasi", "Sunucu hatas\u0131"],
    ["Yedekleme basarisiz", "Yedekleme ba\u015far\u0131s\u0131z"],
    ["Tum sozluk dosyalari yedeklendi", "T\u00fcm s\u00f6zl\u00fck dosyalar\u0131 yedeklendi"],
    ["geri yuklensin mi?", "geri y\u00fcklensin mi?"],
    ["Geri yukleme basarisiz", "Geri y\u00fckleme ba\u015far\u0131s\u0131z"],
    ["Geri yuklendi", "Geri y\u00fcklendi"],
    ["Geri yukleme hatasi", "Geri y\u00fckleme hatas\u0131"],
    ["Kaydedilmemis degisiklikler var. Cikmak istiyor musunuz?", "Kaydedilmemi\u015f de\u011fi\u015fiklikler var. \u00c7\u0131kmak istiyor musunuz?"],
    ["Yukleniyor...", "Y\u00fckleniyor..."],
    ["Bu bolum icin icerik bulunamadi", "Bu b\u00f6l\u00fcm i\u00e7in i\u00e7erik bulunamad\u0131"],
    ["Geri yukleniyor...", "Geri y\u00fckleniyor..."],
    ["Yedekten Geri Yukle", "Yedekten Geri Y\u00fckle"],
    ["Tumunu Yedekle", "T\u00fcm\u00fcn\u00fc Yedekle"],
    ["Kolay duzenleme modu aktif", "Kolay d\u00fczenleme modu aktif"],
    ["JSON dosyasi", "JSON dosyas\u0131"],
  ]],
];

for (const [rel, pairs] of patches) patch(rel, pairs);

// content-sections.ts + field-labels.ts (ASCII -> proper Turkish)
patch("src/lib/admin/content-sections.ts", [
  ['label: "3 Sutun"', 'label: "3 S\u00fctun"'],
  ['label: "Muhendislik Vitrin"', 'label: "M\u00fchendislik Vitrin"'],
  ['label: "Muhendislik Sutunlari"', 'label: "M\u00fchendislik S\u00fctunlar\u0131"'],
  ['label: "Ana Sayfa Bantlari"', 'label: "Ana Sayfa Bantlar\u0131"'],
  ['label: "Urun Kategorileri"', 'label: "\u00dcr\u00fcn Kategorileri"'],
  ['label: "Cozum Karuseli"', 'label: "\u00c7\u00f6z\u00fcm Karuseli"'],
  ['label: "Kategori Aciklamalari"', 'label: "Kategori A\u00e7\u0131klamalar\u0131"'],
  ['label: "Kategori Ozellikleri"', 'label: "Kategori \u00d6zellikleri"'],
  ['label: "Katalog Onizleme"', 'label: "Katalog \u00d6nizleme"'],
  ['label: "Sertifika Onizleme"', 'label: "Sertifika \u00d6nizleme"'],
  ['label: "Sirket Profili"', 'label: "\u015eirket Profili"'],
  ['label: "Profil Kartlari"', 'label: "Profil Kartlar\u0131"'],
  ['label: "Referans Onizleme"', 'label: "Referans \u00d6nizleme"'],
  ['label: "Cozum Detay Ortak"', 'label: "\u00c7\u00f6z\u00fcm Detay Ortak"'],
  ['label: "Urunler"', 'label: "\u00dcr\u00fcnler"'],
  ['label: "Cozumler"', 'label: "\u00c7\u00f6z\u00fcmler"'],
  ['label: "Duman ve Isi Tahliye"', 'label: "Duman ve Is\u0131 Tahliye"'],
  ['label: "Konfor Iklimlendirme"', 'label: "Konfor \u0130klimlendirme"'],
  ['label: "Endustriyel Hava"', 'label: "End\u00fcstriyel Hava"'],
  ['label: "Hayvancilik Tesisleri"', 'label: "Hayvanc\u0131l\u0131k Tesisleri"'],
  ['label: "Trafo/Enerji Odalari"', 'label: "Trafo/Enerji Odalar\u0131"'],
  ['label: "Sera ve Tarimsal"', 'label: "Sera ve Tar\u0131msal"'],
  ['label: "Akilli Otomasyon"', 'label: "Ak\u0131ll\u0131 Otomasyon"'],
  ['label: "Konut Havalandirma"', 'label: "Konut Havaland\u0131rma"'],
  ['label: "Proje Bazli Imalat"', 'label: "Proje Bazl\u0131 \u0130malat"'],
  ['label: "CFD Danismanlik"', 'label: "CFD Dan\u0131\u015fmanl\u0131k"'],
  ['label: "Genel Bakis"', 'label: "Genel Bak\u0131\u015f"'],
  ['label: "Yerinde Kesif"', 'label: "Yerinde Ke\u015fif"'],
  ['label: "Fan Secimi"', 'label: "Fan Se\u00e7imi"'],
  ['label: "Bakim ve Performans"', 'label: "Bak\u0131m ve Performans"'],
  ['label: "Egitim ve Danismanlik"', 'label: "E\u011fitim ve Dan\u0131\u015fmanl\u0131k"'],
  ['label: "CEO Mesaji"', 'label: "CEO Mesaj\u0131"'],
  ['label: "Basin Odasi"', 'label: "Bas\u0131n Odas\u0131"'],
  ['label: "Iletisim"', 'label: "\u0130leti\u015fim"'],
  ['label: "Iletisim Sayfasi"', 'label: "\u0130leti\u015fim Sayfas\u0131"'],
  ['label: "Iletisim Hub"', 'label: "\u0130leti\u015fim Hub"'],
  ['label: "Surdurulebilirlik"', 'label: "S\u00fcrd\u00fcr\u00fclebilirlik"'],
  ['label: "Geri Donusum"', 'label: "Geri D\u00f6n\u00fc\u015f\u00fcm"'],
  ['label: "Dokuman Kutuphanesi"', 'label: "Dok\u00fcman K\u00fct\u00fcphanesi"'],
  ['label: "Fan Secici"', 'label: "Fan Se\u00e7ici"'],
  ['label: "Baslik"', 'label: "Ba\u015fl\u0131k"'],
  ['label: "Baslik Vurgu"', 'label: "Ba\u015fl\u0131k Vurgu"'],
  ['label: "Aciklama"', 'label: "A\u00e7\u0131klama"'],
  ['label: "Bolum Etiketi"', 'label: "B\u00f6l\u00fcm Etiketi"'],
  ['label: "Bolum Basligi"', 'label: "B\u00f6l\u00fcm Ba\u015fl\u0131\u011f\u0131"'],
]);

patch("src/lib/admin/field-labels.ts", [
  ['title: "Baslik"', 'title: "Ba\u015fl\u0131k"'],
  ['desc: "Aciklama"', 'desc: "A\u00e7\u0131klama"'],
  ['description: "Aciklama"', 'description: "A\u00e7\u0131klama"'],
  ['subtitle: "Alt baslik"', 'subtitle: "Alt ba\u015fl\u0131k"'],
  ['headline: "Ana baslik"', 'headline: "Ana ba\u015fl\u0131k"'],
  ['cta: "Buton yazisi"', 'cta: "Buton yaz\u0131s\u0131"'],
  ['value: "Deger"', 'value: "De\u011fer"'],
  ['image: "Gorsel"', 'image: "G\u00f6rsel"'],
  ['intro: "Giris metni"', 'intro: "Giri\u015f metni"'],
  ['eyebrow: "Ust satir"', 'eyebrow: "\u00dcst sat\u0131r"'],
  ['country: "Ulke"', 'country: "\u00dclke"'],
  ['scroll: "Kaydirma"', 'scroll: "Kayd\u0131rma"'],
  ['linkLabel: "Link yazisi"', 'linkLabel: "Link yaz\u0131s\u0131"'],
  ['linkAriaLabel: "Erisilebilirlik metni"', 'linkAriaLabel: "Eri\u015filebilirlik metni"'],
  ['ariaLabel: "Erisilebilirlik metni"', 'ariaLabel: "Eri\u015filebilirlik metni"'],
  ['heroTitle: "Baslik"', 'heroTitle: "Ba\u015fl\u0131k"'],
  ['heroDesc: "Aciklama"', 'heroDesc: "A\u00e7\u0131klama"'],
  ['formTitle: "Form basligi"', 'formTitle: "Form ba\u015fl\u0131\u011f\u0131"'],
  ['formDesc: "Form aciklamasi"', 'formDesc: "Form a\u00e7\u0131klamas\u0131"'],
  ['send: "Gonder butonu"', 'send: "G\u00f6nder butonu"'],
  ['copyright: "Telif hakki"', 'copyright: "Telif hakk\u0131"'],
  ['breadcrumbContact: "Iletisim (breadcrumb)"', 'breadcrumbContact: "\u0130leti\u015fim (breadcrumb)"'],
  ['viewAll: "Tumunu gor"', 'viewAll: "T\u00fcm\u00fcn\u00fc g\u00f6r"'],
  ['featured: "One cikan"', 'featured: "\u00d6ne \u00e7\u0131kan"'],
  ['openMenu: "Menu ac"', 'openMenu: "Men\u00fc a\u00e7"'],
  ['logoSrc: "Logo gorseli"', 'logoSrc: "Logo g\u00f6rseli"'],
  ['websiteLabel: "Web sitesi yazisi"', 'websiteLabel: "Web sitesi yaz\u0131s\u0131"'],
  ['iklimlendirme: "Iklimlendirme"', 'iklimlendirme: "\u0130klimlendirme"'],
  ['sogutmaVeIsitma: "Sogutma ve Isitma"', 'sogutmaVeIsitma: "So\u011futma ve Is\u0131tma"'],
  ['havaYonetimi: "Hava Yonetimi"', 'havaYonetimi: "Hava Y\u00f6netimi"'],
  ['havaDagitimi: "Hava Dagitimi"', 'havaDagitimi: "Hava Da\u011f\u0131t\u0131m\u0131"'],
  ['titresimVeSesIzolasyon: "Titresim ve Ses Izolasyon"', 'titresimVeSesIzolasyon: "Titre\u015fim ve Ses \u0130zolasyon"'],
  ['banyoFanlari: "Banyo Fanlari"', 'banyoFanlari: "Banyo Fanlar\u0131"'],
  ['catiFanlari: "Cati Fanlari"', 'catiFanlari: "\u00c7at\u0131 Fanlar\u0131"'],
  ['dumanIsiTahliyeFanlari: "Duman Isi Tahliye Fanlari"', 'dumanIsiTahliyeFanlari: "Duman Is\u0131 Tahliye Fanlar\u0131"'],
  ['endustriyelFanlar: "Endustriyel Fanlar"', 'endustriyelFanlar: "End\u00fcstriyel Fanlar"'],
  ['hucreliFanlar: "Hucreli Fanlar"', 'hucreliFanlar: "H\u00fccreli Fanlar"'],
  ['isiGeriKazanimCihazlari: "Isi Geri Kazanim Cihazlari"', 'isiGeriKazanimCihazlari: "Is\u0131 Geri Kazan\u0131m Cihazlar\u0131"'],
  ['kanalFanlari: "Kanal Fanlari"', 'kanalFanlari: "Kanal Fanlar\u0131"'],
  ['mutfakFanlari: "Mutfak Fanlari"', 'mutfakFanlari: "Mutfak Fanlar\u0131"'],
  ['siginakFanlari: "Siginak Fanlari"', 'siginakFanlari: "S\u0131\u011f\u0131nak Fanlar\u0131"'],
]);

// Verify
const home = fs.readFileSync(path.join(ROOT, "src/lib/admin/field-schemas/home.ts"), "utf8");
if (!home.includes("Ba\u015fl\u0131k")) throw new Error("verify home failed");
console.log("All UTF-8 fixes applied");
