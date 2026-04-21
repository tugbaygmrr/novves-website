import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

export default async function KisiselVerilerinKorunmasi({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);

  return (
    <main>
      {/* Hero */}
      <section className="relative flex min-h-[540px] items-end overflow-hidden">
        <Image
          src="/images/page-hero/ekibimiz.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#4e525c]/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#71757d]/60 via-[#4a4f58]/82 to-[#2f3440]/94" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_16%_10%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_52%),radial-gradient(ellipse_at_86%_96%,rgba(17,22,33,0.42)_0%,rgba(17,22,33,0)_55%)]" />
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.08]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-36">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link
              href={`/${locale}`}
              className="transition-colors hover:text-white/70"
            >
              Ana Sayfa
            </Link>
            <span>/</span>
            <Link
              href={`/${locale}/kvkk`}
              className="transition-colors hover:text-white/70"
            >
              KVKK
            </Link>
            <span>/</span>
            <span className="text-white/60">Kişisel Verilerin Korunması</span>
          </nav>

          <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.75)] backdrop-blur-[2px] sm:p-8 lg:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                KVKK
              </span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.7rem]">
              Kişisel Verilerin Korunması <span className="text-primary">Kanunu</span>
            </h1>
            <p className="mt-6 max-w-[54ch] text-[18px] leading-[1.62] text-white/72">
              6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#ecebe6] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Opening Paragraph */}
          <div className="mb-8 rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 sm:p-8">
            <p className="text-base leading-7 text-secondary/80">
              NOVVES ELEKTRIK MOTOR ANONIM SIRKETI olarak kisisel verilerinizin
              guvenligine onem veriyoruz. Bu aydinlatma metni, 6698 sayili
              Kisisel Verilerin Korunmasi Kanunu (&ldquo;KVKK&rdquo;)
              kapsaminda, kisisel verilerinizin islenmesine iliskin sizi
              bilgilendirmek amaciyla hazirlanmistir. Sirketimiz, veri sorumlusu
              sifatiyla, kisisel verilerinizi asagida aciklanan amaclar
              dogrultusunda, hukuka ve dururstluk kurallarina uygun sekilde
              isleyecek, kaydedecek, depolayacak, muhafaza edecek,
              gerektiginde ucuncu kisilerle paylasacak ve KVKK&rsquo;nin
              ongorddugu sartlarda imha edecektir.
            </p>
          </div>

          {/* Veri Sorumlusu */}
          <section className="mb-8 rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-dark">
              Veri Sorumlusu
            </h2>
            <div className="rounded-xl border border-ink/10 bg-[#fbf9f3] p-6">
              <p className="text-base leading-7 text-secondary/80">
                6698 sayili Kisisel Verilerin Korunmasi Kanunu uyarinca, kisisel
                verileriniz; veri sorumlusu olarak{" "}
                <strong className="font-semibold text-dark">
                  NOVVES ELEKTRIK MOTOR ANONIM SIRKETI
                </strong>{" "}
                tarafindan asagida aciklanan amaclar kapsaminda islenebilecektir.
              </p>
            </div>
          </section>

          {/* Kapsam ve Hukuki Sebep */}
          <section className="mb-8 rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-dark">
              Kapsam ve Hukuki Sebep
            </h2>
            <p className="text-base leading-7 text-secondary/80">
              Kisisel verileriniz, KVKK&rsquo;nin 5. ve 6. maddelerinde
              belirtilen kisisel veri isleme sart ve amaclarina uygun olarak,
              Sirketimiz tarafindan sunulan urun ve hizmetlerin tarafiniza en
              iyi sekilde sunulabilmesi, sozlesmelerden dogan
              yukumluluklerin yerine getirilmesi, yasal duzenleme geregi
              zorunlu olan bilgi saklama, raporlama ve bilgilendirme
              yukumlulukleri ile sirketimiz tarafindan sunulan urun ve
              hizmetlerin sizlerin begenisine sunulmasi, memnuniyetinizin
              artirilmasi, sirketimizin ticari ve is stratejilerinin
              belirlenmesi ve uygulanmasi amaciyla islenecektir.
            </p>
          </section>

          {/* Kisisel Verilerin Islenmesindeki Amac */}
          <section className="mb-8 rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 sm:p-8">
            <h2 className="mb-4 text-xl font-bold text-dark">
              Kisisel Verilerin Islenmesindeki Amac
            </h2>
            <p className="mb-4 text-base leading-7 text-secondary/80">
              Toplanan kisisel verileriniz, KVKK&rsquo;nin 5. ve 6.
              maddelerinde belirtilen kisisel veri isleme sart ve amaclarina
              uygun olarak asagidaki amaclarla islenebilecektir:
            </p>
            <ol className="list-decimal space-y-3 pl-6 text-base leading-7 text-secondary/80">
              <li>
                Sirketimiz tarafindan sunulan urun ve hizmetlerden sizleri
                faydalandirmak icin gerekli calismalarin is birimlerimiz
                tarafindan yapilmasi
              </li>
              <li>
                Sirketimiz tarafindan sunulan urun ve hizmetlerin sizlerin
                begenisine sunulmasi, onerilmesi ve tanitilmasi icin gerekli
                olan aktivitelerin planlanmasi ve icrasi
              </li>
              <li>
                Sirketimiz tarafindan yurtulan ticari faaliyetlerin
                gerceklestirilmesi icin ilgili is birimleri tarafindan gerekli
                calismalarin yapilmasi ve buna bagli is sureclerinin
                yurutulmesi
              </li>
              <li>
                Sirketimizin ticari ve is stratejilerinin belirlenmesi ve
                uygulanmasi
              </li>
              <li>
                Sirketimizin insan kaynaklari politikalarinin
                yurutulmesinin temini
              </li>
              <li>
                Is basvurusunda bulunan adaylarin basvuru sureclerinin
                degerlendirilmesi
              </li>
              <li>
                Sirketimizin ve sirketimizle is iliskisi icinde olan
                kisilerin hukuki ve ticari guvenliginin temini
              </li>
              <li>
                Sirketimiz tarafindan yurutulen iletisime yonelik idari
                operasyonlar
              </li>
              <li>
                Sirketimizin ticari guvenilirliginin saglanmasi amaciyla
                finans ve muhasebe islerinin yurutulmesi
              </li>
              <li>
                Sirketimizin denetim faaliyetlerinin planlanmasi ve icrasi
              </li>
              <li>
                Yasal duzenleme geregi zorunlu olan bilgi saklama, raporlama
                ve bilgilendirme yukumluluklerin yerine getirilmesi
              </li>
              <li>
                Sirketimiz tesislerinin ve calisanlarinin guvenliginin
                saglanmasi
              </li>
              <li>
                Resmi kurum ve kuruluslarin taleplerinin karsilanmasi
              </li>
            </ol>
          </section>

          {/* Kisisel Verilerin Ucuncu Kisilerle Paylasilmasi */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-bold text-dark">
              Kisisel Verilerin Ucuncu Kisilerle Paylasilmasi
            </h2>
            <p className="text-base leading-7 text-secondary/80">
              Toplanan kisisel verileriniz; KVKK&rsquo;nin 8. ve 9.
              maddelerinde belirtilen kisisel veri isleme sart ve amaclarina
              uygun olarak, sirketimiz tarafindan sunulan urun ve hizmetlerin
              sizlere en iyi sekilde sunulabilmesi, sozlesmelerden dogan
              yukumluluklerin yerine getirilmesi, sirketimizin ticari ve is
              stratejilerinin belirlenmesi ve uygulanmasi, sirketimizin
              mevzuattan kaynaklanan yukumluluklerin yerine getirilmesi
              amaciyla; is ortaklarimiza, tedarikci firmalarimiza, kanunen
              yetkili kamu kurumlarina ve ozel kisilere KVKK&rsquo;nin 8. ve 9.
              maddelerinde belirtilen sartlara uygun olarak aktarilabilecektir.
            </p>
          </section>

          {/* Ilgili Kisi Olarak Haklariniz */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-bold text-dark">
              Ilgili Kisi (Veri Sahibi) Olarak Haklariniz
            </h2>
            <p className="mb-4 text-base leading-7 text-secondary/80">
              KVKK&rsquo;nin 11. maddesi uyarinca, kisisel veri sahibi olarak
              asagidaki haklara sahipsiniz:
            </p>
            <ol className="list-none space-y-4 pl-0 text-base leading-7 text-secondary/80">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  a
                </span>
                <span>
                  Kisisel verilerinizin islenip islenmedigini ogrenme
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  b
                </span>
                <span>
                  Kisisel verileriniz islenmisse buna iliskin bilgi talep etme
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  c
                </span>
                <span>
                  Kisisel verilerinizin islenme amacini ve bunlarin amacina
                  uygun kullanilip kullanilmadigini ogrenme
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  d
                </span>
                <span>
                  Yurt icinde veya yurt disinda kisisel verilerinizin
                  aktarildigi ucuncu kisileri bilme
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  e
                </span>
                <span>
                  Kisisel verilerinizin eksik veya yanlis islenmis olmasi
                  halinde bunlarin duzeltilmesini isteme
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  f
                </span>
                <span>
                  KVKK&rsquo;nin 7. maddesinde ongorlen sartlar cercevesinde
                  kisisel verilerinizin silinmesini veya yok edilmesini isteme
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  g
                </span>
                <span>
                  (e) ve (f) bentleri uyarinca yapilan islemlerin, kisisel
                  verilerinizin aktarildigi ucuncu kisilere bildirilmesini
                  isteme
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  h
                </span>
                <span>
                  Islenen verilerin munhasiran otomatik sistemler vasitasiyla
                  analiz edilmesi suretiyle aleyhinize bir sonucun ortaya
                  cikmasina itiraz etme
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  i
                </span>
                <span>
                  Kisisel verilerinizin kanuna aykiri olarak islenmesi
                  sebebiyle zarara ugramaniz halinde zararin giderilmesini
                  talep etme
                </span>
              </li>
            </ol>
          </section>

          {/* Contact Info */}
          <section className="mb-12">
            <h2 className="mb-4 text-xl font-bold text-dark">
              Iletisim Bilgileri
            </h2>
            <p className="mb-6 text-base leading-7 text-secondary/80">
              Yukarida belirtilen haklarinizi kullanmak icin asagidaki
              iletisim bilgilerimiz araciligiyla bize ulasabilirsiniz:
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-6">
                <h3 className="mb-2 text-sm font-bold text-dark">
                  Merkez Ofis
                </h3>
                <p className="text-sm leading-6 text-secondary/70">
                  NOVVES ELEKTRIK MOTOR ANONIM SIRKETI
                  <br />
                  Ikitelli OSB Mah. Aykosan Sanayi Sitesi
                  <br />
                  1. Kisim 22. Ada No: 58-59-60
                  <br />
                  Basaksehir / Istanbul
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50 p-6">
                <h3 className="mb-2 text-sm font-bold text-dark">Fabrika</h3>
                <p className="text-sm leading-6 text-secondary/70">
                  NOVVES ELEKTRIK MOTOR ANONIM SIRKETI
                  <br />
                  Sakarya 4. Organize Sanayi Bolgesi
                  <br />
                  3. Cadde No: 13 Akyazi / Sakarya
                </p>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50 p-6">
              <h3 className="mb-2 text-sm font-bold text-dark">
                E-posta Adresleri
              </h3>
              <p className="text-sm leading-6 text-secondary/70">
                <a
                  href="mailto:kvkk@novves.com"
                  className="text-primary hover:underline"
                >
                  kvkk@novves.com
                </a>{" "}
                /{" "}
                <a
                  href="mailto:info@novves.com"
                  className="text-primary hover:underline"
                >
                  info@novves.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-dark py-16 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/kvkk`}
              className="rounded-lg border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-primary hover:text-primary"
            >
              KVKK
            </Link>
            <Link
              href={`/${locale}/iletisim`}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e55a28]"
            >
              İletişim
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
