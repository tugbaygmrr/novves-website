import type { LegalContentBlock, LegalDocument, LegalSection } from "@/lib/legal-center/types";

const p = (text: string): LegalContentBlock => ({ type: "paragraph", text });
const ul = (items: string[]): LegalContentBlock => ({ type: "list", items });

function sec(
  number: string,
  title: string,
  blocks: LegalContentBlock[],
): LegalSection {
  return { number, title, blocks };
}

const termsSections: LegalSection[] = [
  sec("01", "GİRİŞ", [
    p(
      "Bu Kullanım Koşulları, www.novves.com alan adlı web sitesinin ve bu web sitesi üzerinden sunulan içeriklerin, dokümanların, görsellerin, katalogların, teknik bilgilerin, marka unsurlarının, formların ve dijital hizmetlerin kullanımına ilişkin kuralları düzenler.",
    ),
    p(
      "Web sitesini ziyaret eden, inceleyen, kullanan, form dolduran, doküman indiren veya NOVVES ile web sitesi üzerinden iletişim kuran tüm kullanıcılar bu Kullanım Koşulları’nı okumuş, anlamış ve kabul etmiş sayılır.",
    ),
    p("Bu koşulları kabul etmiyorsanız web sitesini kullanmamanız gerekmektedir."),
  ]),
  sec("02", "ŞİRKET BİLGİLERİ", [
    p("Şirket Ünvanı: NOVVES ELEKTRİK MOTOR ANONİM ŞİRKETİ"),
    p("Adres: Taşköprü Merkez Mah. Çaydere Sok. No:9/1 İç Kapı No:2 Çiftlikköy / YALOVA"),
    p("Telefon: 0216 467 47 52"),
    p("E-posta: info@novves.com"),
    p("KEP Adresi: novveselektrik@hs01.kep.tr"),
    p("Vergi Dairesi: Yalova"),
    p("Vergi Kimlik No: 6320968919"),
    p("Ticaret Sicil No: 9358"),
    p("MERSİS No: 0632-0968-9190-0002"),
    p("Web Sitesi: www.novves.com"),
  ]),
  sec("03", "WEB SİTESİNİN AMACI", [
    p(
      "NOVVES web sitesi; Şirketimizin ürünleri, mühendislik çözümleri, teknik kabiliyetleri, üretim faaliyetleri, hizmetleri, sektörel çözümleri, katalogları, sertifikasyon süreçleri, iletişim kanalları ve kurumsal bilgileri hakkında genel bilgilendirme yapmak amacıyla hazırlanmıştır.",
    ),
    p(
      "Web sitesinde yer alan bilgiler; genel tanıtım, teknik bilgilendirme, ticari iletişim, ön değerlendirme, ürün ve çözüm tanıtımı amacı taşır. Web sitesinde sunulan hiçbir bilgi, tek başına bağlayıcı teklif, kesin teknik taahhüt, mühendislik onayı, proje tasarımı, garanti beyanı veya sözleşme hükmü niteliğinde değildir.",
    ),
    p(
      "NOVVES ürünleri, her proje özelinde teknik gerekliliklere, kullanım alanına, çevresel koşullara, yürürlükteki mevzuata, standartlara, sertifikalara ve müşteri ihtiyaçlarına göre ayrıca değerlendirilmelidir.",
    ),
  ]),
  sec("04", "KULLANIM HAKKI", [
    p(
      "NOVVES, kullanıcılara web sitesini yalnızca kişisel, kurumsal ve ticari bilgi edinme amacıyla sınırlı, devredilemez, münhasır olmayan ve geri alınabilir bir kullanım hakkı tanır.",
    ),
    p(
      "Bu kullanım hakkı, web sitesinin veya web sitesinde yer alan içeriklerin mülkiyetinin, telif haklarının, marka haklarının, tasarım haklarının, patent haklarının veya diğer fikri ve sınai mülkiyet haklarının kullanıcıya devredildiği anlamına gelmez.",
    ),
    p(
      "NOVVES, web sitesine erişimi herhangi bir zamanda, önceden bildirim yapmaksızın sınırlandırma, askıya alma, değiştirme veya tamamen sonlandırma hakkını saklı tutar.",
    ),
  ]),
  sec("05", "FİKRİ VE SINAİ MÜLKİYET HAKLARI", [
    p(
      "Web sitesinde yer alan tüm metinler, görseller, fotoğraflar, videolar, grafikler, çizimler, ikonlar, logolar, marka unsurları, sloganlar, kataloglar, teknik dokümanlar, ürün isimleri, ürün aileleri, ürün kodları, tasarım öğeleri, animasyonlar, yazılım bileşenleri, sayfa düzenleri ve diğer tüm içerikler NOVVES’e veya ilgili hak sahiplerine aittir.",
    ),
    p(
      "NOVVES adı, NOVVES logosu, ürün aileleri, marka kimliği, kurumsal tasarım dili, “Born to Flow” gibi sloganlar, ürün görselleri, teknik katalog yapıları ve web sitesinde kullanılan tüm marka unsurları, ilgili mevzuat kapsamında korunmaktadır.",
    ),
    p(
      "Kullanıcılar, NOVVES’in önceden yazılı izni olmaksızın web sitesinde yer alan içerikleri aşağıdaki şekillerde kullanamaz:",
    ),
    ul([
      "Kopyalamak",
      "Çoğaltmak",
      "Yayınlamak",
      "Dağıtmak",
      "Satmak",
      "Kiralamak",
      "Türev çalışma oluşturmak",
      "Ticari amaçla kullanmak",
      "Başka bir web sitesinde, katalogda, sunumda veya dijital platformda yayımlamak",
      "NOVVES ile bağlantılıymış izlenimi oluşturacak şekilde kullanmak",
      "Marka, logo, ürün adı veya teknik dokümanları değiştirerek kullanmak",
    ]),
    p(
      "NOVVES’in açık yazılı izni olmadan hiçbir içerik, bayi, temsilci, tedarikçi, müşteri, rakip firma veya üçüncü kişi tarafından ticari tanıtım, satış, pazarlama, katalog, reklam, sosyal medya, teklif dosyası veya proje sunumu amacıyla kullanılamaz.",
    ),
  ]),
  sec("06", "MARKA, LOGO VE KURUMSAL KİMLİK KULLANIMI", [
    p(
      "NOVVES logosu, marka adı, sloganları, ürün aileleri, kurumsal renkleri, ürün görselleri ve marka kimliği unsurları yalnızca NOVVES’in yazılı izniyle kullanılabilir.",
    ),
    p("NOVVES markasının kullanımı aşağıdaki hallerde yasaktır:"),
    ul([
      "NOVVES’in onayı olmadan bayi, distribütör, temsilci veya yetkili servis izlenimi vermek",
      "NOVVES ürünleriyle ilgisi olmayan ürün veya hizmetlerde marka kullanmak",
      "NOVVES markasını yanıltıcı, eksik, hatalı veya itibar zedeleyici şekilde kullanmak",
      "NOVVES ürünlerini taklit eden ürünlerde marka, logo veya benzer görsel unsurlar kullanmak",
      "NOVVES’in teknik sertifikalarını, test raporlarını veya uygunluk belgelerini izinsiz çoğaltmak veya değiştirmek",
      "NOVVES’e ait görsel, katalog veya teknik içerikleri başka bir marka altında kullanmak",
    ]),
    p(
      "Yetkili bayi, temsilci, iş ortağı veya tedarikçi statüsü, yalnızca NOVVES tarafından yazılı olarak verilmiş açık yetkiye dayanır.",
    ),
  ]),
  sec("07", "TEKNİK İÇERİKLER VE ÜRÜN BİLGİLERİ", [
    p(
      "Web sitesinde yer alan teknik bilgiler, ürün açıklamaları, katalog değerleri, performans tabloları, hava debisi, basınç, motor gücü, ses seviyesi, sıcaklık dayanımı, sertifika bilgileri, ürün görselleri ve benzeri içerikler genel bilgilendirme amacı taşır.",
    ),
    p(
      "NOVVES, teknik verilerin doğru ve güncel olması için makul özeni gösterir. Ancak web sitesinde yer alan teknik bilgiler; ürün geliştirme, tasarım değişikliği, üretim iyileştirmesi, sertifikasyon güncellemesi, tedarik değişikliği veya mevzuat değişiklikleri nedeniyle zaman içinde değişebilir.",
    ),
    p(
      "Kesin ürün seçimi, teknik uygunluk, performans doğrulaması, proje şartnamesi, sertifika kapsamı ve uygulama uygunluğu için NOVVES’in yazılı teknik onayı, güncel katalogları, teklif dokümanları, sözleşmeleri veya proje özelindeki mühendislik değerlendirmeleri esas alınmalıdır.",
    ),
    p(
      "Web sitesinde yer alan bilgiler, profesyonel mühendislik hizmetinin, proje tasarımının, yangın güvenliği danışmanlığının, mekanik tesisat hesaplarının, CFD analizinin veya yetkili kurum onayının yerine geçmez.",
    ),
  ]),
  sec("08", "SERTİFİKALAR, STANDARTLAR VE UYGUNLUK BEYANLARI", [
    p(
      "NOVVES web sitesinde ürünlerle ilgili standartlara, sertifikasyon süreçlerine, test metotlarına, uygunluk beyanlarına veya teknik normlara atıf yapılabilir.",
    ),
    p(
      "Bu atıflar, yalnızca ilgili ürün, model, seri, sıcaklık dayanımı, kullanım amacı ve sertifika kapsamı bakımından değerlendirilmelidir. Her ürünün her pazarda, her proje koşulunda veya her mevzuat kapsamında otomatik olarak uygun olduğu anlamına gelmez.",
    ),
    p(
      "EN 12101-3, AMCA, ISO, CE, CPR, yangın güvenliği, duman tahliye, aksiyal fan, jet fan, motor, otomasyon veya diğer teknik standartlara ilişkin bilgiler, proje özelinde ayrıca doğrulanmalıdır.",
    ),
    p(
      "Kullanıcı, web sitesinde yer alan standart, sertifika veya teknik açıklamalara dayanarak işlem yapmadan önce NOVVES’ten güncel ve yazılı doğrulama talep etmelidir.",
    ),
  ]),
  sec("09", "TEKLİF, SİPARİŞ VE SÖZLEŞME SÜREÇLERİ", [
    p(
      "Web sitesinde yer alan ürün, hizmet, teknik çözüm, görsel, katalog veya açıklamalar; NOVVES tarafından verilmiş bağlayıcı bir teklif, satış taahhüdü veya sözleşme anlamına gelmez.",
    ),
    p(
      "Teklif, sipariş, üretim, teslimat, garanti, servis, ödeme ve satış şartları; NOVVES tarafından yazılı olarak düzenlenen teklif, proforma fatura, sipariş teyidi, sözleşme, teknik şartname veya taraflar arasında imzalanan özel belgelerle belirlenir.",
    ),
    p(
      "Web sitesi üzerinden gönderilen iletişim, teklif, katalog, teknik destek veya başvuru formları, tek başına sözleşme kurulması anlamına gelmez. NOVVES, gelen talepleri değerlendirme, reddetme, ek bilgi isteme veya uygun gördüğü şekilde yanıt verme hakkını saklı tutar.",
    ),
  ]),
  sec("10", "KULLANICININ YÜKÜMLÜLÜKLERİ", [
    p(
      "Kullanıcı, web sitesini kullanırken yürürlükteki mevzuata, dürüstlük kurallarına, ticari etik ilkelerine ve bu Kullanım Koşulları’na uygun hareket etmeyi kabul eder.",
    ),
    p("Kullanıcı aşağıdaki eylemleri gerçekleştiremez:"),
    ul([
      "Web sitesini hukuka aykırı amaçlarla kullanmak",
      "Yanlış, eksik, yanıltıcı veya üçüncü kişilere ait bilgilerle form doldurmak",
      "Web sitesinin güvenliğini, çalışmasını veya erişilebilirliğini bozacak işlemler yapmak",
      "Virüs, zararlı yazılım, bot, otomatik tarama, veri kazıma veya saldırı amaçlı yazılım kullanmak",
      "Web sitesinden izinsiz veri çekmek, kopyalamak veya arşivlemek",
      "NOVVES markasına, itibarına veya ticari faaliyetlerine zarar verecek davranışlarda bulunmak",
      "Web sitesindeki içerikleri izinsiz ticari amaçla kullanmak",
      "Üçüncü kişilerin fikri mülkiyet, gizlilik veya kişilik haklarını ihlal etmek",
      "NOVVES adına hareket ettiği, yetkili olduğu veya temsilci olduğu izlenimi oluşturmak",
      "Teknik bilgileri değiştirerek, bağlamından kopararak veya yanıltıcı şekilde kullanmak",
    ]),
    p(
      "NOVVES, bu yükümlülüklere aykırı hareket eden kullanıcıların web sitesine erişimini sınırlandırabilir ve hukuki yollara başvurabilir.",
    ),
  ]),
  sec("11", "ÜÇÜNCÜ TARAF BAĞLANTILAR", [
    p(
      "Web sitesinde, üçüncü taraf web sitelerine, sosyal medya platformlarına, video içeriklerine, harita hizmetlerine, belge indirme alanlarına veya diğer dijital hizmetlere bağlantılar bulunabilir.",
    ),
    p(
      "Bu bağlantılar yalnızca kullanıcıya kolaylık sağlamak amacıyla sunulur. NOVVES, üçüncü taraf sitelerin içeriklerinden, güvenliğinden, gizlilik uygulamalarından, veri işleme faaliyetlerinden, hizmet kalitesinden veya güncelliğinden sorumlu değildir.",
    ),
    p(
      "Üçüncü taraf siteleri ziyaret eden kullanıcıların, ilgili sitelerin kullanım koşullarını ve gizlilik politikalarını incelemesi önerilir.",
    ),
  ]),
  sec("12", "KULLANICI TARAFINDAN GÖNDERİLEN BİLGİLER", [
    p(
      "Kullanıcılar, web sitesi üzerinden iletişim formu, teklif formu, teknik destek formu, ürün güvenliği bildirimi, kariyer başvurusu veya benzeri kanallar aracılığıyla NOVVES’e bilgi gönderebilir.",
    ),
    p(
      "Kullanıcı, gönderdiği bilgilerin doğru, güncel, hukuka uygun ve kendisine ait olduğunu kabul eder. Üçüncü kişilere ait bilgilerin NOVVES’e iletilmesi halinde, gerekli bilgilendirme ve izinlerin alınmasından kullanıcı sorumludur.",
    ),
    p(
      "NOVVES’e gönderilen teknik bilgi, talep, proje verisi, çizim, şartname veya benzeri içerikler, ilgili talebin değerlendirilmesi, teklif hazırlanması, teknik analiz yapılması, müşteri ilişkilerinin yürütülmesi veya hukuki yükümlülüklerin yerine getirilmesi amacıyla kullanılabilir.",
    ),
    p(
      "Kullanıcı tarafından gönderilen kişisel veriler, NOVVES’in Kişisel Verilerin Korunması ve Gizlilik Politikası ile ilgili aydınlatma metinleri kapsamında işlenir.",
    ),
  ]),
  sec("13", "GİZLİLİK VE KİŞİSEL VERİLERİN KORUNMASI", [
    p(
      "NOVVES, kişisel verilerin korunmasına önem verir. Web sitesi üzerinden elde edilen kişisel veriler, ilgili mevzuata ve NOVVES’in yayımladığı veri koruma metinlerine uygun olarak işlenir.",
    ),
    p(
      "Kişisel verilerin işlenmesine ilişkin detaylı bilgi için “Kişisel Verilerin Korunması ve Gizlilik Politikası”, “Web Sitesi Ziyaretçi Aydınlatma Metni”, “Çerez Politikası” ve ilgili diğer metinler incelenmelidir.",
    ),
  ]),
  sec("14", "ÇEREZLER", [
    p(
      "Web sitesinde kullanıcı deneyimini iyileştirmek, site performansını ölçmek, güvenliği sağlamak ve dijital hizmetleri sunmak amacıyla çerezler ve benzeri teknolojiler kullanılabilir.",
    ),
    p(
      "Çerez kullanımı hakkında detaylı bilgi, web sitesinde yayımlanan “Çerez Politikası” üzerinden sunulur.",
    ),
  ]),
  sec("15", "SORUMLULUĞUN SINIRLANDIRILMASI", [
    p("NOVVES, web sitesinin kesintisiz, hatasız, virüssüz veya her zaman erişilebilir olacağını garanti etmez."),
    p(
      "Web sitesinde yer alan içeriklerin kullanılması, yorumlanması veya bu içeriklere dayanılarak karar alınması nedeniyle doğabilecek doğrudan veya dolaylı zararlardan, kar kaybından, veri kaybından, iş kesintisinden, proje uygunsuzluğundan, teknik hatalardan veya üçüncü taraf taleplerinden NOVVES sorumlu tutulamaz.",
    ),
    p(
      "Kullanıcı, web sitesindeki teknik bilgileri, ürün açıklamalarını veya katalog değerlerini kullanmadan önce NOVVES’ten güncel ve yazılı doğrulama alması gerektiğini kabul eder.",
    ),
    p(
      "NOVVES’in herhangi bir sorumluluğu doğması halinde, bu sorumluluk yürürlükteki emredici mevzuat hükümleriyle sınırlıdır.",
    ),
  ]),
  sec("16", "WEB SİTESİNDE DEĞİŞİKLİK YAPMA HAKKI", [
    p(
      "NOVVES, web sitesinde yer alan her türlü bilgi, ürün, hizmet, görsel, katalog, teknik içerik, fiyat bilgisi, sertifika açıklaması, iletişim bilgisi ve kullanım koşulunu herhangi bir zamanda önceden bildirim yapmaksızın değiştirme, güncelleme, kaldırma veya yayından çekme hakkını saklı tutar.",
    ),
    p("Web sitesindeki güncellemeler, yayımlandığı tarihte yürürlüğe girer."),
  ]),
  sec("17", "İHRACAT, YAPTIRIMLAR VE UYGUNLUK", [
    p(
      "NOVVES ürünleri, teknik dokümanları veya mühendislik çözümleri bazı ülkelerde ihracat, ithalat, ürün güvenliği, sertifikasyon, gümrük, yaptırım veya yerel mevzuat kurallarına tabi olabilir.",
    ),
    p(
      "Kullanıcı, NOVVES ürünlerini veya teknik bilgilerini kullanırken ilgili ülke mevzuatına, ürün güvenliği kurallarına, ihracat ve ithalat düzenlemelerine, yaptırım listelerine ve yerel uygunluk yükümlülüklerine uymakla sorumludur.",
    ),
    p(
      "NOVVES, hukuka aykırı, yaptırımlara tabi, riskli veya uygunluk sorunu doğurabilecek işlemleri reddetme hakkını saklı tutar.",
    ),
  ]),
  sec("18", "MÜCBİR SEBEP", [
    p(
      "Doğal afetler, yangın, sel, deprem, salgın hastalık, savaş, grev, lokavt, tedarik zinciri kesintileri, enerji kesintileri, internet altyapı sorunları, siber saldırılar, resmi makam kararları, mevzuat değişiklikleri ve NOVVES’in makul kontrolü dışında gelişen benzeri olaylar mücbir sebep sayılır.",
    ),
    p(
      "Mücbir sebep hallerinde NOVVES, web sitesinin kesintiye uğraması, hizmetlerin gecikmesi veya içeriklere erişilememesi nedeniyle sorumlu tutulamaz.",
    ),
  ]),
  sec("19", "KULLANIM KOŞULLARININ İHLALİ", [
    p("Kullanıcının bu Kullanım Koşulları’nı ihlal etmesi halinde NOVVES;"),
    ul([
      "Kullanıcının web sitesine erişimini sınırlandırabilir",
      "İlgili içerik, form veya talebi değerlendirmeye almayabilir",
      "Hukuka aykırı kullanımın durdurulmasını talep edebilir",
      "Zararların tazminini talep edebilir",
      "Gerekli gördüğü hallerde yasal yollara başvurabilir",
    ]),
    p(
      "NOVVES’in bu haklardan herhangi birini kullanmaması, söz konusu haktan feragat ettiği anlamına gelmez.",
    ),
  ]),
  sec("20", "UYGULANACAK HUKUK VE YETKİLİ MAHKEME", [
    p("Bu Kullanım Koşulları’nın uygulanmasında Türkiye Cumhuriyeti hukuku geçerlidir."),
    p(
      "Taraflar arasında doğabilecek uyuşmazlıklarda, emredici mevzuat hükümleri saklı kalmak kaydıyla, Yalova Mahkemeleri ve İcra Daireleri yetkilidir.",
    ),
  ]),
  sec("21", "KULLANIM KOŞULLARININ GÜNCELLENMESİ", [
    p(
      "NOVVES, bu Kullanım Koşulları’nı mevzuat değişiklikleri, web sitesi güncellemeleri, operasyonel ihtiyaçlar, teknik geliştirmeler veya kurumsal politika değişiklikleri doğrultusunda zaman zaman güncelleyebilir.",
    ),
    p("Güncel Kullanım Koşulları, www.novves.com üzerinde yayımlandığı tarihte yürürlüğe girer."),
  ]),
  sec("22", "İLETİŞİM", [
    p(
      "Kullanım Koşulları, fikri mülkiyet hakları, marka kullanımı, web sitesi içerikleri veya hukuki bildirimlerle ilgili bizimle iletişime geçebilirsiniz.",
    ),
    p("NOVVES ELEKTRİK MOTOR ANONİM ŞİRKETİ"),
    p("Adres: Taşköprü Merkez Mah. Çaydere Sok. No:9/1 İç Kapı No:2 Çiftlikköy / YALOVA"),
    p("Telefon: 0216 467 47 52"),
    p("E-posta: info@novves.com"),
    p("KEP: novveselektrik@hs01.kep.tr"),
    p("Web: www.novves.com"),
    p(
      "NOVVES, mühendislik, üretim, teknik dokümantasyon, marka değeri ve dijital varlıklarının korunmasını kurumsal güvenin ayrılmaz bir parçası olarak görür.",
    ),
  ]),
];

export const termsDocumentTr: LegalDocument = {
  id: "terms",
  path: "terms",
  title: "Kullanım",
  titleHighlight: "Koşulları",
  badge: "FİKRİ MÜLKİYET / KURALLAR",
  lastUpdated: "Yürürlük tarihi: 28.05.2026",
  storageCode: "POL-LEG-2026-02",
  classification: "Web Sitesi Kullanım Koşulları",
  contactEmail: "info@novves.com",
  intro: [
    "Kapsam: Fikri Mülkiyet / Kurallar",
    "Yürürlük Tarihi: 28.05.2026",
    "Doküman Tipi: Web Sitesi Kullanım Koşulları",
    "Kapsam: Fikri Mülkiyet, Web Sitesi Kullanımı, Teknik İçerik, Marka Kullanımı ve Sorumluluk Sınırları",
    "Web Sitesi: www.novves.com",
    "Şirket: NOVVES ELEKTRİK MOTOR ANONİM ŞİRKETİ",
  ],
  sections: termsSections,
};
