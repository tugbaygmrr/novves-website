import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

export default async function GuvenlikVeGizlilikPolitikasi({
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
            <span className="text-white/60">Güvenlik ve Gizlilik Politikası</span>
          </nav>

          <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.75)] backdrop-blur-[2px] sm:p-8 lg:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                KVKK
              </span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.7rem]">
              Güvenlik ve Gizlilik <span className="text-primary">Politikası</span>
            </h1>
            <p className="mt-6 max-w-[54ch] text-[18px] leading-[1.62] text-white/72">
              NOVVES Elektrik Motor A.Ş. güvenlik ve gizlilik politikası hakkında detaylı bilgi.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#ecebe6] py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* GUVENLIK POLITIKASI */}
          <section className="mb-8 rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-bold text-dark">
              GUVENLIK POLITIKASI
            </h2>
            <div className="space-y-4 text-base leading-7 text-secondary/80">
              <p>
                NOVVES ELEKTRIK MOTOR ANONIM SIRKETI olarak, bilgi
                guvenliginin saglanmasi, kisisel verilerin korunmasi ve gizlilik
                ilkelerine buyuk onem vermekteyiz. Sirketimiz, bilgi varliklarinin
                korunmasi, gizliliginin ve butunlugunun saglanmasi ile bilgi
                sistemlerinin surekliligi icin gerekli her turlu teknik ve idari
                tedbiri almaktadir.
              </p>
              <p>
                Bilgi guvenligine iliskin politikalarimiz, ulusal ve uluslararasi
                standartlara uygun olarak olusturulmus olup, duzenli olarak
                guncellenmekte ve iyilestirilmektedir. Tum calisanlarimiz, bilgi
                guvenligi konusunda bilinclendirme egitimlerine tabi tutulmaktadir.
              </p>
              <p>
                Sirketimiz, bilgi guvenligini tehdit eden ihlallerin onlenmesi,
                tespit edilmesi ve bu ihlallere mudahale edilmesi amaciyla etkin
                bir bilgi guvenligi yonetim sistemi isletmektedir. Bu sistem
                kapsaminda, duzenli risk degerlendirmeleri yapilmakta ve gerekli
                onlemler alinmaktadir.
              </p>
              <p>
                Bilgi guvenligi politikamiz, sirketimizin tum birimlerini, is
                ortaklarini, tedarikci firmalarini ve ucuncu taraflari
                kapsamaktadir. Tum paydas ve is ortaklarimizin bu politikaya uyum
                saglamasi beklenmektedir.
              </p>
            </div>
          </section>

          {/* GIZLILIK POLITIKASI */}
          <section className="mb-8 rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 sm:p-8">
            <h2 className="mb-6 text-2xl font-bold text-dark">
              GIZLILIK POLITIKASI
            </h2>
            <div className="space-y-4 text-base leading-7 text-secondary/80">
              <p>
                NOVVES ELEKTRIK MOTOR ANONIM SIRKETI, internet sitesi
                ziyaretcilerinin ve musterilerinin gizliligine saygili olmaya
                ozen gostermektedir. Bu Gizlilik Politikasi, web sitemiz
                araciligiyla toplanan bilgilerin nasil kullanildigini, kimlerle
                paylasildigini ve bilgi guvenliginin nasil saglandigini
                aciklamaktadir.
              </p>
              <p>
                Web sitemizi ziyaret ederek veya hizmetlerimizi kullanarak bu
                Gizlilik Politikasinda belirtilen uygulamalari kabul etmis
                sayilirsiniz. Politikamiz, 6698 sayili Kisisel Verilerin
                Korunmasi Kanunu ve ilgili mevzuat hukumlerine uygun olarak
                hazirlanmistir.
              </p>
            </div>
          </section>

          {/* Section 1 */}
          <section className="mb-8 rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-bold text-dark">
              1. Kisisel Verilerin Korunmasi
            </h3>
            <p className="text-base leading-7 text-secondary/80">
              Kisisel verileriniz, 6698 sayili Kisisel Verilerin Korunmasi
              Kanunu ve ilgili mevzuat hukumlerine uygun olarak, veri sorumlusu
              sifatiyla NOVVES ELEKTRIK MOTOR ANONIM SIRKETI tarafindan
              islenebilecektir. Kisisel verilerinizin islenmesi, kanunda
              belirtilen ilkelere uygun olarak, belirli, acik ve mesru amaclar
              icin ve isleme amacina uygun, sinirli ve olculu sekilde
              gerceklestirilmektedir.
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-8 rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-bold text-dark">
              2. Elektronik Iletiler
            </h3>
            <p className="text-base leading-7 text-secondary/80">
              NOVVES ELEKTRIK MOTOR ANONIM SIRKETI, musterilerine ve web sitesi
              kullanicilarinaletisim amaciyla elektronik ileti gonderebilir. Bu
              iletiler, onay vermeniz durumunda gonderilmekte olup, dilediginiz
              zaman elektronik ileti almaktan vazgecebilirsiniz. Ticari
              elektronik iletilerin gonderilmesi, 6563 sayili Elektronik
              Ticaretin Duzenlenmesi Hakkinda Kanun ve ilgili yonetmelik
              hukumlerine uygun olarak yapilmaktadir.
            </p>
          </section>

          {/* Section 3 */}
          <section className="mb-8 rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-bold text-dark">
              3. Log Verileri, Cerezler (Cookies) ve Web Isaretcileri
            </h3>
            <p className="mb-4 text-base leading-7 text-secondary/80">
              Web sitemizi ziyaret ettiginizde, sunucularimiz otomatik olarak
              bazi bilgileri kaydeder. Bu log verileri asagidakileri
              icerebilir:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-secondary/80">
              <li>IP adresiniz</li>
              <li>Tarayici turu ve surumu</li>
              <li>Isletim sistemi bilgileriniz</li>
              <li>Ziyaret ettiginiz sayfalar ve ziyaret sureleri</li>
              <li>Yonlendiren URL (referrer)</li>
              <li>Erisim tarihi ve saati</li>
              <li>Cerez verileri</li>
              <li>Cihaz bilgileri</li>
            </ul>
            <p className="mt-4 text-base leading-7 text-secondary/80">
              Cerezler, web sitemizin duzgun calismasini saglamak, kullanici
              deneyimini iyilestirmek ve ziyaretci istatistiklerini analiz
              etmek amaciyla kullanilmaktadir. Tarayicinizin ayarlarini
              degistirerek cerezleri devre disi birakabilirsiniz; ancak bu
              durumda web sitemizin bazi ozelliklerinin duzgun calismayabilecegini
              bilgilerinize sunariz.
            </p>
          </section>

          {/* Section 4 */}
          <section className="mb-8 rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-bold text-dark">
              4. Verilerinizin Kullanim Amaclari
            </h3>
            <p className="mb-4 text-base leading-7 text-secondary/80">
              Toplanan kisisel verileriniz asagidaki amaclarla
              kullanilabilecektir:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-secondary/80">
              <li>Web sitesi kullanim deneyiminizi kisisellestirmek</li>
              <li>Urun ve hizmetlerimizi gelistirmek</li>
              <li>Taleplerinize ve sorulariniza yanit vermek</li>
              <li>Pazarlama ve tanitim faaliyetleri yuritmek</li>
              <li>
                Yasal yukumluluklerimizi yerine getirmek
              </li>
              <li>
                Is ortakliklari ve tedarik zinciri sureclerini yonetmek
              </li>
              <li>
                Istatistiksel analizler ve arastirmalar yapmak
              </li>
              <li>
                Bilgi guvenligi sureclerini yurutmek
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="mb-8 rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-bold text-dark">
              5. Veri Guvenligi
            </h3>
            <div className="space-y-4 text-base leading-7 text-secondary/80">
              <p>
                NOVVES ELEKTRIK MOTOR ANONIM SIRKETI, kisisel verilerinizin
                guvenligini saglamak icin gerekli teknik ve idari tedbirleri
                almaktadir. Verileriniz, yetkisiz erisime, kayba, degistirilmeye
                veya ifsa edilmeye karsi korunmaktadir.
              </p>
              <p>
                Sirketimiz, kisisel verilerin islenmesi surecinde gerekli
                guvenlik duzeyini saglamak amaciyla guncel teknolojik
                imkanlara uygun teknik onlemler almakta ve alinan teknik
                onlemleri duzenli olarak guncellemektedir.
              </p>
              <p>
                Kisisel verilere erisim yetkileri sinirlandirilmis olup,
                yalnizca gorevli ve yetkili personel tarafindan erisilebilir
                durumdadir. Erisim yetkileri duzenli olarak gozden
                gecirilmekte ve guncellenmektedir.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-8 rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-bold text-dark">
              6. Siber Guvenligin Saglanmasi
            </h3>
            <div className="space-y-4 text-base leading-7 text-secondary/80">
              <p>
                NOVVES ELEKTRIK MOTOR ANONIM SIRKETI, siber guvenlik
                tehditlerini onlemek ve bilgi sistemlerinin guvenligini saglamak
                icin kapsamli onlemler almaktadir. Sirketimiz, bilgi
                teknolojileri altyapisini duzenli olarak denetlemekte ve
                guvenlik aciklarina karsi surekli tarama yapmaktadir.
              </p>
              <p>
                Ag guvenligi, ates duvari (firewall) sistemleri, saldiri
                tespit ve onleme sistemleri (IDS/IPS), antivirusyazilimlari
                ve diger guvenlik araclari kullanilarak bilgi sistemleri
                korunmaktadir. Tum guvenlik yazilimlari ve sistemleri duzenli
                olarak guncellenmektedir.
              </p>
              <p>
                Siber guvenlik olaylarina karsi hizli ve etkili mudahale
                saglanmasi amaciyla olay mudahale planlari hazirlanmis ve
                ilgili personel egitilmistir. Duzenli tatbikatlar
                yapilarak mudahale kapasitesi test edilmektedir.
              </p>
              <p>
                Sirketimiz, siber guvenlik konusunda ulusal ve uluslararasi
                standartlara uyum saglamakta ve en iyi uygulamalari takip
                etmektedir. Guvenlik politikalari ve prosedurler duzenli
                olarak gozden gecirilmekte ve guncellenmektedir.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-8 rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-bold text-dark">
              7. Kisisel Veri Guvenliginin Takibi
            </h3>
            <p className="mb-4 text-base leading-7 text-secondary/80">
              Sirketimiz, kisisel veri guvenliginin saglanmasi ve surekli
              iyilestirilmesi amaciyla asagidaki takip mekanizmalarini
              isletmektedir:
            </p>
            <ol className="list-none space-y-4 pl-0 text-base leading-7 text-secondary/80">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  a
                </span>
                <span>
                  <strong className="font-semibold text-dark">
                    Guvenlik Denetimleri:
                  </strong>{" "}
                  Kisisel verilerin islendigi tum sistemler ve surecler duzenli
                  olarak denetlenmektedir. Ic denetim ekipleri ve bagimsiz
                  denetciler tarafindan periyodik denetimler
                  gerceklestirilmektedir.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  b
                </span>
                <span>
                  <strong className="font-semibold text-dark">
                    Erisim Kayitlari:
                  </strong>{" "}
                  Kisisel verilere yapilan tum erisimler loglanmakta ve duzenli
                  olarak incelenmektedir. Yetkisiz erisim girisimleriastem
                  tarafindan otomatik olarak tespit edilmekte ve
                  raporlanmaktadir.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  c
                </span>
                <span>
                  <strong className="font-semibold text-dark">
                    Guvenlik Acigi Taramalari:
                  </strong>{" "}
                  Bilgi sistemleri duzenli olarak guvenlik acigi taramalarindan
                  gecirilmekte, tespit edilen aciklar ivedilikle
                  giderilmektedir.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  d
                </span>
                <span>
                  <strong className="font-semibold text-dark">
                    Calisan Egitimleri:
                  </strong>{" "}
                  Tum calisanlara duzenli olarak kisisel veri guvenligi ve
                  bilgi guvenligi egitimleri verilmekte, farkindalik
                  duzeyleri olculmekte ve gelistirilmektedir.
                </span>
              </li>
            </ol>
          </section>

          {/* Section 8 */}
          <section className="mb-8 rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-bold text-dark">
              8. Kisisel Veri Iceren Ortamlarin Guvenliginin Saglanmasi
            </h3>
            <p className="mb-4 text-base leading-7 text-secondary/80">
              Kisisel veri iceren dijital ve fiziksel ortamlarin guvenligi icin
              asagidaki onlemler alinmaktadir:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-secondary/80">
              <li>
                Kisisel veri iceren fiziksel ortamlar (sunucu odalari, arsiv
                alanlari) yalnizca yetkili personelin erisimine aciktir
              </li>
              <li>
                Fiziksel ortamlarda guvenlik kameralari ve erisim kontrol
                sistemleri bulunmaktadir
              </li>
              <li>
                Dijital ortamda saklanan kisisel veriler sifreleme teknolojileri
                ile korunmaktadir
              </li>
              <li>
                Kisisel veri iceren kagit ortamindaki belgeler kilitli dolaplarda
                muhafaza edilmektedir
              </li>
              <li>
                Kullanim disinda kalan kisisel veri iceren ortamlar geri
                donusumsuz olarak imha edilmektedir
              </li>
              <li>
                Tasinabilir bellek, CD, DVD gibi medyalar sifrelenmis olarak
                saklanmaktadir
              </li>
              <li>
                Kisisel veri iceren ortamlarin envanteri tutulmakta ve
                duzenli olarak guncellenmektedir
              </li>
            </ul>
          </section>

          {/* Section 9 */}
          <section className="mb-8 rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-bold text-dark">
              9. Bilgi Teknoloji Sistemleri Tedariqi, Gelistirme ve Bakimi
            </h3>
            <p className="mb-4 text-base leading-7 text-secondary/80">
              Bilgi teknolojileri sistemlerinin tedariqi, gelistirilmesi ve
              bakimi sureclerinde kisisel veri guvenligini saglamak amaciyla
              asagidaki tedbirler uygulanmaktadir:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-secondary/80">
              <li>
                Yeni sistem tedariqi ve gelistirme sureclerinde veri koruma etki
                degerlendirmesi yapilmaktadir
              </li>
              <li>
                Ucuncu taraf yazilim ve hizmet saglayicilarinin veri guvenligi
                standartlarina uyumlulugu denetlenmektedir
              </li>
              <li>
                Sistem guncellemeleri ve yamalari duzenli olarak
                uygulanmaktadir
              </li>
              <li>
                Test ortamlarinda gercek kisisel veriler kullanilmamaktadir
              </li>
              <li>
                Yazilim gelistirme sureclerinde guvenli kodlama pratikleri
                uygulanmaktadir
              </li>
              <li>
                Sistem degisiklikleri oncesinde guvenlik testleri
                yapilmaktadir
              </li>
              <li>
                Bakim islemleri sirasinda kisisel veri erisimi
                sinirlandirilmaktadir
              </li>
            </ul>
          </section>

          {/* Section 10 */}
          <section className="mb-8 rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-bold text-dark">
              10. Kisisel Verilerin Yedeklenmesi
            </h3>
            <p className="mb-4 text-base leading-7 text-secondary/80">
              Kisisel verilerin kaybolmasi veya zarar gormesi riskine karsi
              asagidaki yedekleme tedbirleri uygulanmaktadir:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-secondary/80">
              <li>
                Kisisel veriler duzenli olarak yedeklenmekte ve yedekler guvenli
                ortamlarda saklanmaktadir
              </li>
              <li>
                Yedekleme medyalari sifrelenerek korunmaktadir
              </li>
              <li>
                Yedeklerin geri yukleme testleri periyodik olarak
                yapilmaktadir
              </li>
              <li>
                Yedekleme ortamlarina erisim yalnizca yetkili personelle
                sinirlidir
              </li>
              <li>
                Felaket kurtarma planlari hazirlanmis ve duzenli olarak test
                edilmektedir
              </li>
              <li>
                Yedekleme sureleri, veri saklama politikalarina uygun olarak
                belirlenmistir
              </li>
            </ul>
          </section>

          {/* Section 11 */}
          <section className="mb-8 rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-bold text-dark">
              11. Veri Aktarimlari
            </h3>
            <p className="mb-4 text-base leading-7 text-secondary/80">
              Kisisel verilerin aktarilmasi sirasinda asagidaki guvenlik
              onlemleri alinmaktadir:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-secondary/80">
              <li>
                Kisisel veriler, e-posta yoluyla aktarilmasi gerektiginde
                sifrelenmis olarak gonderilmektedir
              </li>
              <li>
                Kisisel veri aktarimlari guvenli iletisim protokolleri (SSL/TLS)
                uzerinden gerceklestirilmektedir
              </li>
              <li>
                Yurt disina veri aktarimi yapilmasi halinde, KVKK&rsquo;nin 9.
                maddesinde belirtilen sartlara uyulmalktadir ve yeterli korumayi
                saglayan ulkelere veya veri sahibinin acik rizasinin alindigi
                durumlarda aktarim yapilmaktadir
              </li>
            </ul>
          </section>

          {/* Section 12 */}
          <section className="mb-12">
            <h3 className="mb-4 text-lg font-bold text-dark">
              12. Cocuklarin Online Faaliyetlerini Koruma
            </h3>
            <p className="mb-4 text-base leading-7 text-secondary/80">
              NOVVES ELEKTRIK MOTOR ANONIM SIRKETI, cocuklarin cevrimici
              guvenligine onem vermekte ve asagidaki tedbirleri uygulamaktadir:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-base leading-7 text-secondary/80">
              <li>
                Web sitemiz ve hizmetlerimiz 18 yasin altindaki cocuklara yonelik
                degildir ve bilerek cocuklardan kisisel veri toplamamaktayiz
              </li>
              <li>
                Bir cocugun kisisel verilerinin toplandiginin farkina varilmasi
                halinde, bu veriler derhal silinmektedir
              </li>
              <li>
                Ebeveynlerin veya yasal vasilerin, cocuklarina ait kisisel
                verilerin islenmesine iliskin itiraz ve talepleri oncelikli olarak
                degerlendirilmektedir
              </li>
            </ul>
          </section>

          {/* Section 13 */}
          <section className="mb-12">
            <h3 className="mb-4 text-lg font-bold text-dark">
              13. Yeni Surecleri Gizlilik Kurallarina Uygun Tasarlama
            </h3>
            <div className="space-y-4 text-base leading-7 text-secondary/80">
              <p>
                NOVVES ELEKTRIK MOTOR ANONIM SIRKETI, yeni is surecleri, urun
                ve hizmetler gelistirirken &ldquo;tasarimdan itibaren
                gizlilik&rdquo; (privacy by design) ilkesini benimsemektedir.
                Bu ilke geregi, kisisel verilerin korunmasi hususu, sureclerin
                tasarim asamasindan itibaren goz onunde bulundurulmaktadir.
              </p>
              <p>
                Yeni bir surec, urun veya hizmet gelistirilmeden once veri
                koruma etki degerlendirmesi yapilmakta, olasi riskler
                belirlenmekte ve gerekli onlemler alinmaktadir. Gizlilik
                kurallarina uyum, yalnizca yasal bir zorunluluk olarak degil,
                sirketimizin temel degerlerinden biri olarak kabul
                edilmektedir.
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
