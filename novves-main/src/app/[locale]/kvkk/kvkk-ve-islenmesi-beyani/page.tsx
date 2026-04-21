import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

export default async function KvkkVeIslenmesiBeyani({
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
      <section className="relative flex min-h-[420px] items-end overflow-hidden">
        <Image
          src="/images/page-hero/ekibimiz.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-dark/30" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6 lg:px-8">
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
            <span className="text-white/60">
              KVKK ve Islenmesi Beyani
            </span>
          </nav>

          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                KVKK
              </span>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              KVKK ve Islenmesi{" "}
              <span className="text-primary">Beyani</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/50">
              NOVVES Elektrik Motor A.S. kisisel verilerin korunmasi ve
              islenmesi politikasi
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Section 1 - Giris */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-dark">1. GIRIS</h2>
            <div className="space-y-4 text-base leading-7 text-secondary/80">
              <p>
                NOVVES ELEKTRIK MOTOR ANONIM SIRKETI (&ldquo;Sirket&rdquo;)
                olarak, 6698 sayili Kisisel Verilerin Korunmasi Kanunu
                (&ldquo;KVKK&rdquo; veya &ldquo;Kanun&rdquo;) kapsaminda
                kisisel verilerin islenmesi ve korunmasina buyuk onem
                vermekteyiz. Bu politika belgesi, Sirketimizin kisisel
                verilerin islenmesine iliskin ilke ve esaslarini
                belirlemektedir.
              </p>
              <p>
                Isbu Kisisel Verilerin Korunmasi ve Islenmesi Politikasi
                (&ldquo;Politika&rdquo;), Sirketimizin KVKK kapsamindaki
                yukumluluklerin yerine getirilmesi ve kisisel verilerin
                korunmasi konusundaki yaklasimini ortaya koymaktadir. Politika,
                Sirketimiz tarafindan gerceklestirilen kisisel veri isleme
                faaliyetlerinin tamamini kapsamaktadir.
              </p>
              <p>
                Bu Politika, Sirketimiz calisanlari, is ortaklari, musterileri,
                tedarikci firma yetkilileri, ziyaretcileri ve kisisel verileri
                Sirketimiz tarafindan islenen tum gercek kisileri
                kapsamaktadir.
              </p>
              <p>
                Politika, KVKK ve ilgili mevzuat hukumleri cercevesinde
                hazirlanmis olup, mevzuatta meydana gelecek degisiklikler ve
                Kisisel Verileri Koruma Kurulu kararlari dogrultusunda
                guncellenecektir.
              </p>
            </div>
          </section>

          {/* Section 2 - Veri Sorumlusu */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-dark">
              2. VERI SORUMLUSU
            </h2>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-6">
              <p className="text-base leading-7 text-secondary/80">
                KVKK uyarinca,{" "}
                <strong className="font-semibold text-dark">
                  NOVVES ELEKTRIK MOTOR ANONIM SIRKETI
                </strong>{" "}
                veri sorumlusu sifatiyla, kisisel verileri asagida aciklanan
                ilke ve esaslara uygun olarak islemektedir. Sirketimiz, Veri
                Sorumlusu sicilina (VERBiS) kayitli olup, kisisel verilerin
                islenmesine iliskin tum faaliyetlerini KVKK ve ilgili mevzuata
                uygun olarak yurutmektedir.
              </p>
            </div>
          </section>

          {/* Section 3 - Tanimlar */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-dark">
              3. TANIMLAR
            </h2>
            <p className="mb-6 text-base leading-7 text-secondary/80">
              Bu Politikada gecen tanimlar asagida aciklanmistir:
            </p>
            <div className="grid gap-4">
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                  <dt className="text-sm font-bold text-dark">
                    Acik Riza
                  </dt>
                  <dd className="text-sm leading-6 text-secondary/70">
                    Belirli bir konuya iliskin, bilgilendirilmeye dayanan ve
                    ozgur iradeyle aciklanan riza
                  </dd>
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                  <dt className="text-sm font-bold text-dark">
                    Anonim Hale Getirme
                  </dt>
                  <dd className="text-sm leading-6 text-secondary/70">
                    Kisisel verilerin, baska verilerle eslestirilse dahi
                    hicbir surette kimligibelirli veya belirlenebilir bir
                    gercek kisiyle iliskilendirilemeyecek hale getirilmesi
                  </dd>
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                  <dt className="text-sm font-bold text-dark">
                    Baskanlik
                  </dt>
                  <dd className="text-sm leading-6 text-secondary/70">
                    Kisisel Verileri Koruma Kurumu Baskanligi
                  </dd>
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                  <dt className="text-sm font-bold text-dark">
                    Ilgili Kisi
                  </dt>
                  <dd className="text-sm leading-6 text-secondary/70">
                    Kisisel verisi islenen gercek kisi
                  </dd>
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                  <dt className="text-sm font-bold text-dark">
                    Kisisel Veri
                  </dt>
                  <dd className="text-sm leading-6 text-secondary/70">
                    Kimligibelirli veya belirlenebilir gercek kisiye iliskin
                    her turlu bilgi
                  </dd>
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                  <dt className="text-sm font-bold text-dark">
                    Ozel Nitelikli Kisisel Veri
                  </dt>
                  <dd className="text-sm leading-6 text-secondary/70">
                    Kisilerin irki, etnik kokeni, siyasi dusuncesi, felsefi
                    inanci, dini, mezhebi veya diger inanclari, kilik ve
                    kiyafeti, dernek, vakif ya da sendika uyeligi, sagligi,
                    cinsel hayati, ceza mahkumiyeti ve guvenlik tedbirleriyle
                    ilgili verileri ile biyometrik ve genetik verileri
                  </dd>
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                  <dt className="text-sm font-bold text-dark">
                    Kisisel Verilerin Islenmesi
                  </dt>
                  <dd className="text-sm leading-6 text-secondary/70">
                    Kisisel verilerin tamamen veya kismen otomatik olan ya da
                    herhangi bir veri kayit sisteminin parcasi olmak kaydiyla
                    otomatik olmayan yollarla elde edilmesi, kaydedilmesi,
                    depolanmasi, muhafaza edilmesi, degistirilmesi, yeniden
                    duzenlenmesi, aciklanmasi, aktarilmasi, devralinmasi, elde
                    edilebilir hale getirilmesi, siniflandirilmasi ya da
                    kullaniminin engellenmesi gibi veriler uzerinde
                    gerceklestirilen her turlu islem
                  </dd>
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                  <dt className="text-sm font-bold text-dark">Kurul</dt>
                  <dd className="text-sm leading-6 text-secondary/70">
                    Kisisel Verileri Koruma Kurulu
                  </dd>
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                  <dt className="text-sm font-bold text-dark">Kurum</dt>
                  <dd className="text-sm leading-6 text-secondary/70">
                    Kisisel Verileri Koruma Kurumu
                  </dd>
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                  <dt className="text-sm font-bold text-dark">
                    Veri Islyen
                  </dt>
                  <dd className="text-sm leading-6 text-secondary/70">
                    Veri sorumlusunun verdigi yetkiye dayanarak onun adina
                    kisisel verileri isleyen gercek veya tuzel kisi
                  </dd>
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                  <dt className="text-sm font-bold text-dark">
                    Veri Kayit Sistemi
                  </dt>
                  <dd className="text-sm leading-6 text-secondary/70">
                    Kisisel verilerin belirli kriterlere gore yapilandirildarak
                    islendigi kayit sistemi
                  </dd>
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                  <dt className="text-sm font-bold text-dark">
                    Veri Sorumlusu
                  </dt>
                  <dd className="text-sm leading-6 text-secondary/70">
                    Kisisel verilerin isleme amaclarini ve vasitalarini
                    belirleyen, veri kayit sisteminin kurulmasindan ve
                    yonetilmesinden sorumlu olan gercek veya tuzel kisi
                  </dd>
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                  <dt className="text-sm font-bold text-dark">VERBiS</dt>
                  <dd className="text-sm leading-6 text-secondary/70">
                    Veri Sorumlulari Sicil Bilgi Sistemi
                  </dd>
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                  <dt className="text-sm font-bold text-dark">KVKK</dt>
                  <dd className="text-sm leading-6 text-secondary/70">
                    6698 sayili Kisisel Verilerin Korunmasi Kanunu
                  </dd>
                </div>
              </div>
              <div className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                <div className="grid gap-4 sm:grid-cols-[200px_1fr]">
                  <dt className="text-sm font-bold text-dark">Politika</dt>
                  <dd className="text-sm leading-6 text-secondary/70">
                    NOVVES Elektrik Motor A.S. Kisisel Verilerin Korunmasi ve
                    Islenmesi Politikasi
                  </dd>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 - Veri Guvenligi Kurulu */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-dark">
              4. VERI GUVENLIGI KURULU
            </h2>

            <div className="mb-8">
              <h3 className="mb-4 text-lg font-bold text-dark">
                4.1 Kurulun Olusumu
              </h3>
              <p className="text-base leading-7 text-secondary/80">
                Sirketimiz bunyesinde, kisisel verilerin korunmasi ve
                islenmesine iliskin surecslerin yonetimi ve denetimi amaciyla
                bir Veri Guvenligi Kurulu olusturulmustur. Kurul, ust yonetim
                tarafindan atanan uyelerden olusmmakta olup, Sirketimizin
                kisisel veri isleme politikalarinin belirlenmesi,
                uygulanmasi ve denetlenmesi gorevlerini ustlenmektedir.
              </p>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold text-dark">
                4.2 Kurulun Gorevleri
              </h3>
              <p className="mb-4 text-base leading-7 text-secondary/80">
                Veri Guvenligi Kurulunun baslica gorevleri sunlardir:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-secondary/80">
                <li>
                  Kisisel veri koruma politikalarini ve prosedurlerini
                  belirlemek ve guncellemek
                </li>
                <li>
                  Kisisel veri isleme faaliyetlerinin KVKK ve ilgili mevzuata
                  uygunlugunu denetlemek
                </li>
                <li>
                  Veri ihlali durumlarinda gerekli aksiyonlarin alinmasini
                  koordine etmek
                </li>
                <li>
                  Calisanlarin kisisel verilerin korunmasi konusunda
                  bilinclendirme faaliyetlerini planlamak ve yurutmek
                </li>
                <li>
                  Ilgili kisilerin basvurularini degerlendirmek ve
                  sonuclandirmak
                </li>
                <li>
                  Kisisel Verileri Koruma Kurumu ile iletisimi saglamak
                </li>
              </ul>
            </div>
          </section>

          {/* Section 5 - Politika Esaslari */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-dark">
              5. POLITIKA ESASLARI
            </h2>

            {/* 5.1 */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-bold text-dark">
                5.1 TEMEL ILKELER
              </h3>

              <div className="mb-6">
                <h4 className="mb-3 text-base font-bold text-dark">
                  5.1.1 Hukuka ve Durrustluk Kuralina Uygun Isleme
                </h4>
                <p className="text-base leading-7 text-secondary/80">
                  Sirketimiz, kisisel verilerin islenmesinde hukuksal
                  duzenlemelerle getirilen ilkelere uygun hareket etmekte ve
                  kisisel veri isleme faaliyetlerinde dururstluk kuralina
                  uygun davranmaktadir. Bu kapsamda, kisisel veriler amacla
                  baglantili, sinirli ve olculu olarak islenmekte; ilgili
                  kisilerin makul beklentileri ve cikarlari dikkate
                  alinmaktadir.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-base font-bold text-dark">
                  5.1.2 Kisisel Verilerin Dogrulugu ve Guncelliginin
                  Saglanmasi
                </h4>
                <p className="text-base leading-7 text-secondary/80">
                  Sirketimiz, islenen kisisel verilerin dogrulugu ve
                  guncelligini saglamak icin gerekli mekanizmalari
                  olusturmakta ve isletmektedir. Ilgili kisilerin
                  basvurmasi halinde, kisisel verilerinin dogru ve guncel
                  olmasini saglamak icin gerekli duzeltme islemleri
                  yapilmaktadir.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-base font-bold text-dark">
                  5.1.3 Belirli, Acik ve Mesru Amaclarla Isleme
                </h4>
                <p className="text-base leading-7 text-secondary/80">
                  Sirketimiz, kisisel verileri belirli, acik ve mesru amaclar
                  dogrultusunda islemektedir. Kisisel verilerin hangi
                  amaclarla islenecegiisleme faaliyeti baslamadan once
                  belirlenmekte ve ilgili kisilere bu amaclar hakkinda
                  bilgilendirme yapilmaktadir.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-base font-bold text-dark">
                  5.1.4 Isleme Amacyla Baglantili, Sinirli ve Olculu Olma
                </h4>
                <p className="text-base leading-7 text-secondary/80">
                  Sirketimiz, kisisel verileri yalnizca isleme amacinin
                  gerektirdigi olcude islemekte ve amacla ilgisi olmayan veya
                  islenmesine ihtiyac duyulmayan kisisel verilerin
                  islenmesinden kacinmaktadir. Veri minimizasyonu ilkesine
                  uygun olarak, isleme amacini karsilamak icin yeterli
                  miktarda veri islenmektedir.
                </p>
              </div>
            </div>

            {/* 5.2 */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-bold text-dark">
                5.2 HUKUKA UYGUN ISLEME FAALIYETI
              </h3>

              <div className="mb-6">
                <h4 className="mb-3 text-base font-bold text-dark">
                  5.2.1 Kisisel Verilerin Islenmesi Sartlari
                </h4>
                <p className="mb-4 text-base leading-7 text-secondary/80">
                  Sirketimiz, KVKK&rsquo;nin 5. maddesi kapsaminda, kisisel
                  verilerin islenmesinde asagidaki sartlardan bir veya
                  birkacinin mevcut olmasini saglamaktadir:
                </p>
                <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-secondary/80">
                  <li>Ilgili kisinin acik rizasinin bulunmasi</li>
                  <li>Kanunlarda acikca ongormulmus olmasi</li>
                  <li>
                    Fiili imkansizlik nedeniyle rizasini aciklayamayacak
                    durumda bulunan veya rizasina hukuki gecerlilik
                    taninmayan kisinin kendisinin ya da bir baskasinin hayati
                    veya beden butunlugunu koruma zorunlulugu
                  </li>
                  <li>
                    Bir sozlesmenin kurulmasi veya ifasiyla dogrudan
                    dogruya ilgili olmasi kaydiyla, sozlesmenin taraflarina
                    ait kisisel verilerin islenmesinin gerekli olmasi
                  </li>
                  <li>
                    Veri sorumlusunun hukuki yukumlulugun yerine
                    getirebilmesi icin zorunlu olmasi
                  </li>
                  <li>
                    Ilgili kisinin kendisi tarafindan alenilestirilmis
                    olmasi
                  </li>
                  <li>
                    Bir hakkin tesisi, kullanilmasi veya korunmasi icin
                    veri islemenin zorunlu olmasi
                  </li>
                  <li>
                    Ilgili kisinin temel hak ve ozgurluklerin zarar
                    vermemek kaydiyla, veri sorumlusunun mesru menfaatleri
                    icin veri islenmesinin zorunlu olmasi
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-base font-bold text-dark">
                  5.2.2 Ozel Nitelikli Kisisel Verilerin Islenmesi Sartlari
                </h4>
                <p className="mb-4 text-base leading-7 text-secondary/80">
                  Sirketimiz, KVKK&rsquo;nin 6. maddesi kapsaminda, ozel
                  nitelikli kisisel verilerin islenmesinde Kurul tarafindan
                  belirlenen yeterli onlemleri almakta ve asagidaki sartlara
                  uygun hareket etmektedir:
                </p>
                <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-secondary/80">
                  <li>
                    Saglik ve cinsel hayata iliskin kisisel veriler disindaki
                    ozel nitelikli kisisel veriler, kanunlarda ongorlen
                    hallerde ilgili kisinin acik rizasi aranmaksizin
                    islenebilmektedir
                  </li>
                  <li>
                    Saglik ve cinsel hayata iliskin kisisel veriler, kamu
                    sagligi, koruyucu hekimlik, tibbi teshis, tedavi ve
                    bakim hizmetlerinin yurutulmesi, saglik hizmetleri ile
                    finansmaninin planlanmasi ve yonetimi amaciyla,
                    sir saklama yukumlulugu altinda bulunan kisiler veya
                    yetkili kurum ve kuruluslar tarafindan ilgili kisinin
                    acik rizasi aranmaksizin islenebilmektedir
                  </li>
                </ul>
              </div>
            </div>

            {/* 5.3 */}
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-bold text-dark">
                5.3 HUKUKA UYGUN VERI AKTARIMI
              </h3>

              <div className="mb-6">
                <h4 className="mb-3 text-base font-bold text-dark">
                  5.3.1 Yurt Icine Veri Aktarimi
                </h4>
                <p className="text-base leading-7 text-secondary/80">
                  Sirketimiz, KVKK&rsquo;nin 8. maddesi kapsaminda, kisisel
                  verilerin yurt icinde aktarilmasinda, KVKK&rsquo;nin 5. ve
                  6. maddelerinde yer alan isleme sartlarindan bir veya
                  birkacinin mevcut olmasini saglamaktadir. Kisisel veriler,
                  ilgili kisinin acik rizasi olmaksizin, yalnizca kanunda
                  acikca ongorlen hallerde ucuncu kisilere
                  aktarilabilmektedir.
                </p>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-base font-bold text-dark">
                  5.3.2 Yurt Disina Veri Aktarimi
                </h4>
                <p className="text-base leading-7 text-secondary/80">
                  Sirketimiz, KVKK&rsquo;nin 9. maddesi kapsaminda, kisisel
                  verilerin yurt disina aktarilmasinda, ilgili kisinin acik
                  rizasinin bulunmasini veya KVKK&rsquo;nin 5. ve 6.
                  maddelerinde yer alan isleme sartlarindan birinin mevcut
                  olmasi kaydiyla, aktarimin yapilacagi ulkede yeterli
                  korumanin bulunmasini ya da yeterli korumanin bulunmamasi
                  halinde Turkiye&rsquo;deki ve ilgili yabanci ulkedeki veri
                  sorumlularinin yeterli bir korumayitaahhut etmelerini ve
                  Kurul&rsquo;un izninin bulunmasini saglamaktadir.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 - Yukumlulukler */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-dark">
              6. YUKUMLULUKLER
            </h2>

            <div className="mb-6">
              <h3 className="mb-4 text-lg font-bold text-dark">
                6.1 Aydinlatma Yukumlulugu
              </h3>
              <p className="text-base leading-7 text-secondary/80">
                Sirketimiz, KVKK&rsquo;nin 10. maddesi geregi, kisisel
                verilerin elde edilmesi sirasinda ilgili kisileri
                aydinlatmakla yukumludur. Bu kapsamda; veri sorumlusunun ve
                varsa temsilcisinin kimligi, kisisel verilerin hangi amacla
                islenecegi, islenen verilerin kimlere ve hangi amacla
                aktarilabilecegi, veri toplamanin yontemi ve hukuki sebebi ile
                ilgili kisinin haklari hakkinda bilgilendirme yapilmaktadir.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-4 text-lg font-bold text-dark">
                6.2 Veri Guvenligine Iliskin Yukumlulukler
              </h3>
              <p className="text-base leading-7 text-secondary/80">
                Sirketimiz, KVKK&rsquo;nin 12. maddesi geregi, kisisel
                verilerin hukuka aykiri olarak islenmesini onlemek, kisisel
                verilere hukuka aykiri olarak erisilmesini onlemek ve kisisel
                verilerin muhafazasini saglamak amaciyla uygun guvenlik
                duzeyini temin etmeye yonelik gerekli her turlu teknik ve
                idari tedbirleri almakla yukumludur.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-4 text-lg font-bold text-dark">
                6.3 Ilgili Kisi Basvurularinin Karsilanmasi
              </h3>
              <p className="text-base leading-7 text-secondary/80">
                Sirketimiz, KVKK&rsquo;nin 13. maddesi geregi, ilgili
                kisilerin kisisel verilerine iliskin taleplerini en gec otuz
                gun icinde ucretsiz olarak sonuclandirmaktadir. Ancak,
                islemin ayrica bir maliyet gerektirmesi halinde, Kurul
                tarafindan belirlenen tarifedeki ucret ilgili kisiden
                talep edilebilecektir.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-4 text-lg font-bold text-dark">
                6.4 Kurul Kararlarina Uyum
              </h3>
              <p className="text-base leading-7 text-secondary/80">
                Sirketimiz, Kurul tarafindan alisan kararlara uyum saglamakta
                ve gerekli tum aksiyonlari almaktadir. Kurul tarafindan
                yapilan tebligat ve bildirimler derhal degerlendirilerek,
                istenen bilgi ve belgeler suresi icinde Kurul&rsquo;a
                iletilmektedir.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="mb-4 text-lg font-bold text-dark">
                6.5 VERBiS Kaydi
              </h3>
              <p className="text-base leading-7 text-secondary/80">
                Sirketimiz, KVKK geregi Veri Sorumlulari Sicil Bilgi
                Sistemine (VERBiS) kayitli olup, kisisel veri isleme
                faaliyetlerine iliskin bilgiler VERBiS uzerinden
                kamuoyuyla paylasilmaktadir. VERBiS kayitlari, kisisel veri
                isleme faaliyetlerindeki degisikliklere paralel olarak
                guncellenmektedir.
              </p>
            </div>
          </section>

          {/* Section 7 - Kisisel Verilerin Guvenliginin Saglanmasi */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-dark">
              7. KISISEL VERILERIN GUVENLIGININ SAGLANMASI
            </h2>

            <div className="mb-6">
              <h3 className="mb-4 text-lg font-bold text-dark">
                7.1 Teknik Tedbirler
              </h3>
              <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-secondary/80">
                <li>
                  Ag guvenligi ve uygulama guvenligi saglanmaktadir
                </li>
                <li>
                  Kisisel veri guvenligi takibi yapilmaktadir
                </li>
                <li>
                  Kisisel veri iceren ortamlarin guvenligi saglanmaktadir
                </li>
                <li>
                  Kisisel veriler yedeklenmekte ve yedek verilerin guvenligi
                  saglanmaktadir
                </li>
                <li>
                  Sifreleme teknolojileri kullanilmaktadir
                </li>
                <li>
                  Erisim loglari duzenli olarak tutulmaktadir
                </li>
                <li>
                  Guncel anti-virus sistemleri kullanilmaktadir
                </li>
                <li>
                  Guvenlik duvarlari kullanilmaktadir
                </li>
                <li>
                  Sizma testleri duzenli olarak uygulanmaktadir
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="mb-4 text-lg font-bold text-dark">
                7.2 Idari Tedbirler
              </h3>
              <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-secondary/80">
                <li>
                  Calisanlara kisisel verilerin korunmasi konusunda egitimler
                  verilmektedir
                </li>
                <li>
                  Kisisel veri isleme envanteri hazirlanmistir
                </li>
                <li>
                  Kurumsal politikalar hazirlanmis ve uygulamaya
                  konulmustur
                </li>
                <li>
                  Gizlilik taahhutnameleri yapilmaktadir
                </li>
                <li>
                  Kisisel veri isleme sureclerinde gorev alan
                  calisanlarin yetki matrisleri olusturulmustur
                </li>
                <li>
                  Periyodik ve rastgele denetimler yapilmaktadir
                </li>
                <li>
                  Veri isleme faaliyetleri KVKK&rsquo;ya uyumluluk acisindan
                  deger-lendirilmektedir
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="mb-4 text-lg font-bold text-dark">
                7.3 Veri Ihlali Bildirimi
              </h3>
              <p className="text-base leading-7 text-secondary/80">
                Sirketimiz, islenen kisisel verilerin kanuni olmayan yollarla
                baskalaritarafindan elde edilmesi halinde, bu durumu en kisa
                surede ilgilisine ve Kurul&rsquo;a bildirmektedir. Kurul,
                gerek gormesi halinde bu durumu, kendi internet sitesinde ya
                da uygun gorecegi baska bir yontemle ilan edebilir.
                Sirketimiz, veri ihlali durumlarinda hizli ve etkili bir
                mudahale icin olay mudahale prosedurlerini hazirlamis ve
                ilgili personeli bu konuda egitmistir.
              </p>
            </div>
          </section>

          {/* Section 8 - Kisisel Verilerin Imhasi */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-dark">
              8. KISISEL VERILERIN IMHASI
            </h2>
            <div className="space-y-4 text-base leading-7 text-secondary/80">
              <p>
                KVKK&rsquo;nin 7. maddesi uyarinca, kisisel verilerin islenmesini
                gerektiren sebeplerin ortadan kalkmasi halinde, kisisel veriler
                re&rsquo;sen veya ilgili kisinin talebi uzerine Sirketimiz
                tarafindan silinmekte, yok edilmekte veya anonim hale
                getirilmektedir.
              </p>
              <p>
                Sirketimiz, kisisel verilerin silinmesi, yok edilmesi veya
                anonim hale getirilmesine iliskin usul ve esaslari &ldquo;Kisisel
                Veri Saklama ve Imha Politikasi&rdquo;nda detayli olarak
                belirlenmistir. Kisisel verilerin imhasi, periyodik olarak ve
                ilgili kisinin talebi uzerine gerceklestirilmektedir.
              </p>
              <p>
                Silme islemi, kisisel verilerin ilgili kullanicilar icin
                hicbir sekilde erisilemez ve tekrar kullanilmaz hale
                getirilmesi islemidir. Yok etme islemi, kisisel verilerin
                hic kimse tarafindan hicbir sekilde erisilemez, geri
                getirilemez ve tekrar kullanilamaz hale getirilmesi islemidir.
                Anonim hale getirme islemi ise kisisel verilerin baska
                verilerle eslestirilse dahi hicbir surette kimligi belirli veya
                belirlenebilir bir gercek kisiyle iliskilendirilemeyecek hale
                getirilmesidir.
              </p>
            </div>
          </section>

          {/* Section 9 - Revizyon */}
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-bold text-dark">
              9. REVIZYON
            </h2>
            <div className="space-y-4 text-base leading-7 text-secondary/80">
              <p>
                Isbu Politika, KVKK ve ilgili mevzuattaki degisiklikler,
                Kurul kararlari ve sirketimizin kisisel veri isleme
                faaliyetlerindeki degisiklikler dogrultusunda duzenli olarak
                gozden gecirilmekte ve gerektiginde guncellenmektedir.
              </p>
              <p>
                Politikada yapilan her turlu degisiklik, Sirketimizin internet
                sitesinde yayimlanmakta ve ilgili paydas ve is ortaklarina
                bildirilmektedir. Politikanin guncel halinine
                sirketimizin internet sitesi uzerinden erisim saglanabilir.
              </p>
              <p>
                Bu Politika, NOVVES ELEKTRIK MOTOR ANONIM SIRKETI Yonetim
                Kurulu tarafindan onaylanmis olup, yururluge girmistir.
              </p>
            </div>
          </section>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-dark py-14 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/kvkk`}
              className="rounded border border-white/20 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:border-primary hover:text-primary"
            >
              KVKK
            </Link>
            <Link
              href={`/${locale}/iletisim`}
              className="rounded bg-primary px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e55a28]"
            >
              Iletisim
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
