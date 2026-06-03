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

const visitorSections: LegalSection[] = [
  sec("01", "AMAÇ", [
    p(
      'NOVVES ELEKTRİK MOTOR ANONİM ŞİRKETİ (“NOVVES”, “Şirket”, “biz”) olarak, www.novves.com alan adlı web sitemizi ziyaret eden kişilerin gizliliğine ve kişisel verilerinin korunmasına önem veriyoruz.',
    ),
    p(
      'Bu Web Sitesi Ziyaretçi Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında, web sitemizi ziyaretiniz sırasında veya web sitemiz üzerinden bizimle iletişime geçmeniz halinde kişisel verilerinizin hangi amaçlarla işlendiğini, hangi yöntemlerle toplandığını, hangi hukuki sebeplere dayandığını, kimlerle paylaşılabileceğini ve veri sahibi olarak sahip olduğunuz hakları açıklamak amacıyla hazırlanmıştır.',
    ),
    p(
      'Bu metin yalnızca web sitesi ziyaretçilerine yöneliktir. NOVVES’in genel veri koruma yaklaşımı için “Kişisel Verilerin Korunması ve Gizlilik Politikası”; çerez kullanımı için ise ayrıca “Çerez Politikası” incelenmelidir.',
    ),
  ]),
  sec("02", "VERİ SORUMLUSU BİLGİLERİ", [
    p(
      "Kişisel verileriniz, veri sorumlusu sıfatıyla aşağıda bilgileri yer alan NOVVES ELEKTRİK MOTOR ANONİM ŞİRKETİ tarafından işlenmektedir.",
    ),
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
    p(
      "KEP adresi; resmi başvurular, hukuki bildirimler ve güvenli elektronik tebligat süreçleri için kullanılabilecek resmi iletişim kanalıdır. Genel bilgi ve iletişim talepleriniz için info@novves.com adresi üzerinden de Şirketimizle iletişime geçebilirsiniz.",
    ),
  ]),
  sec("03", "İŞLENEN KİŞİSEL VERİLER", [
    p(
      "Web sitemizi ziyaretiniz veya web sitesi üzerinden bizimle iletişime geçmeniz kapsamında aşağıdaki kişisel veriler işlenebilir:",
    ),
  ]),
  sec("3.1", "Dijital Ziyaret Bilgileri", [
    ul([
      "IP adresi",
      "Ziyaret tarihi ve saati",
      "Erişim yapılan sayfalar",
      "Oturum bilgileri",
      "Trafik ve kullanım kayıtları",
      "Tarayıcı türü ve sürümü",
      "Cihaz türü",
      "İşletim sistemi bilgisi",
      "Dil ve bölge tercihleri",
      "Yönlendiren web sitesi bilgisi",
      "Web sitesi performans ve hata kayıtları",
    ]),
  ]),
  sec("3.2", "İletişim Formu Bilgileri", [
    p(
      "Web sitemizde yer alan iletişim, teklif, katalog, teknik destek, ürün güvenliği bildirimi veya benzeri formları kullanmanız halinde aşağıdaki bilgiler işlenebilir:",
    ),
    ul([
      "Ad ve soyad",
      "Şirket adı",
      "Unvan",
      "Telefon numarası",
      "E-posta adresi",
      "Ülke / şehir bilgisi",
      "Talep konusu",
      "Mesaj içeriği",
      "Ürün, proje veya teknik talep bilgileri",
      "Gönderim tarihi ve işlem kayıtları",
    ]),
  ]),
  sec("3.3", "Çerez ve Benzeri Teknoloji Bilgileri", [
    p(
      "Web sitemizde zorunlu, performans, analitik, işlevsel veya pazarlama amaçlı çerezler kullanılabilir. Çerezler aracılığıyla işlenen bilgiler, çerezin türüne ve kullanım amacına göre değişebilir.",
    ),
    p(
      "Çerezlere ilişkin detaylı açıklamalar, tercih yönetimi ve çerez kategorileri için ayrıca yayımlanan “Çerez Politikası” incelenmelidir.",
    ),
  ]),
  sec("3.4", "Güvenlik ve Log Kayıtları", [
    p(
      "Web sitemizin güvenliğini sağlamak, kötüye kullanımı önlemek, siber saldırı risklerini azaltmak ve sistem sürekliliğini korumak amacıyla teknik güvenlik kayıtları ve log verileri işlenebilir.",
    ),
  ]),
  sec("04", "KİŞİSEL VERİLERİN İŞLENME AMAÇLARI", [
    p("Web sitesi ziyaretçilerine ait kişisel veriler aşağıdaki amaçlarla işlenebilir:"),
    ul([
      "Web sitesinin güvenli, düzgün ve verimli şekilde çalışmasını sağlamak",
      "Web sitesi trafiğini, performansını ve kullanıcı deneyimini analiz etmek",
      "Web sitesindeki teknik hataları tespit etmek ve gidermek",
      "Bilgi güvenliği, sistem güvenliği ve siber güvenlik süreçlerini yürütmek",
      "Yetkisiz erişim, kötüye kullanım, spam, bot trafiği veya saldırı girişimlerini önlemek",
      "İletişim, teklif, katalog, teknik destek veya ürün güvenliği formları üzerinden iletilen talepleri almak ve yanıtlamak",
      "Müşteri, potansiyel müşteri ve iş ortağı iletişim süreçlerini yürütmek",
      "NOVVES ürünleri, çözümleri, katalogları, teknik dokümanları ve hizmetleri hakkında bilgi taleplerini değerlendirmek",
      "Pazarlama, tanıtım ve kurumsal iletişim faaliyetlerini yürütmek",
      "Web sitesinin içeriğini, tasarımını ve performansını iyileştirmek",
      "Hukuki yükümlülükleri yerine getirmek",
      "Uyuşmazlıkların önlenmesi, taleplerin ispatı ve hukuki süreçlerin yürütülmesi",
      "NOVVES’in meşru ticari, teknik ve operasyonel güvenliğini sağlamak",
    ]),
  ]),
  sec("05", "KİŞİSEL VERİLERİN İŞLENMESİNİN HUKUKİ SEBEPLERİ", [
    p(
      "Kişisel verileriniz, KVKK’nın 5. ve 6. maddelerinde belirtilen aşağıdaki hukuki sebeplere dayanılarak işlenebilir:",
    ),
    ul([
      "Kanunlarda açıkça öngörülmesi",
      "Bir sözleşmenin kurulması veya ifası için veri işlemenin gerekli olması",
      "Şirketimizin hukuki yükümlülüğünü yerine getirebilmesi için veri işlemenin zorunlu olması",
      "Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması",
      "Temel hak ve özgürlüklerinize zarar vermemek kaydıyla, Şirketimizin meşru menfaatleri için veri işlemenin zorunlu olması",
      "Açık rızanızın bulunması",
    ]),
    p(
      "Zorunlu çerezler ve güvenlik logları, web sitesinin çalışması ve güvenliğinin sağlanması kapsamında meşru menfaat veya hukuki yükümlülük sebeplerine dayanabilir.",
    ),
    p(
      "Analitik, performans, pazarlama veya reklam amaçlı çerezler ise gerekli olduğu hallerde açık rızanıza veya çerez tercihlerinize bağlı olarak kullanılabilir.",
    ),
  ]),
  sec("06", "KİŞİSEL VERİLERİN TOPLANMA YÖNTEMLERİ", [
    p(
      "Kişisel verileriniz, web sitemizi ziyaretiniz veya web sitesi üzerinden bizimle iletişime geçmeniz sırasında aşağıdaki yöntemlerle toplanabilir:",
    ),
    ul([
      "Web sitesi sunucu kayıtları",
      "Çerezler ve benzeri takip teknolojileri",
      "İletişim formları",
      "Teklif talep formları",
      "Katalog ve doküman talep formları",
      "Teknik destek ve ürün güvenliği bildirim formları",
      "E-posta iletişimi",
      "Güvenlik ve log kayıtları",
      "Analitik ve performans ölçüm araçları",
      "Web sitesi hata ve erişim kayıtları",
    ]),
    p(
      "Kişisel verileriniz otomatik veya otomatik olmayan yöntemlerle, elektronik ortamda işlenebilir.",
    ),
  ]),
  sec("07", "KİŞİSEL VERİLERİN AKTARILMASI", [
    p(
      "Web sitesi ziyaretçilerine ait kişisel veriler, işleme amaçlarıyla sınırlı olmak kaydıyla ve ilgili mevzuata uygun şekilde aşağıdaki kişi ve kuruluşlarla paylaşılabilir:",
    ),
    ul([
      "Yetkili kamu kurum ve kuruluşları",
      "Mahkemeler, icra daireleri ve yasal merciler",
      "Hukuk danışmanları, mali müşavirler ve denetim hizmeti sağlayıcıları",
      "Web sitesi altyapı, hosting, sunucu ve bulut hizmet sağlayıcıları",
      "E-posta, güvenlik, yedekleme, yazılım ve bilgi teknolojileri hizmet sağlayıcıları",
      "Analitik, performans ve çerez yönetimi hizmeti sağlayıcıları",
      "Siber güvenlik, bakım, teknik destek ve sistem yönetimi hizmet sağlayıcıları",
      "Talebinizin niteliğine göre NOVVES’in ilgili iş birimleri, bayileri, temsilcileri veya iş ortakları",
    ]),
    p(
      "Kişisel verileriniz, yalnızca gerekli olduğu ölçüde ve ilgili hukuki şartlar sağlanarak aktarılır.",
    ),
  ]),
  sec("08", "YURT DIŞINA VERİ AKTARIMI", [
    p(
      "Web sitesi altyapısı, bulut hizmetleri, e-posta sistemleri, analitik araçlar, güvenlik servisleri veya dijital hizmet sağlayıcıların yurt dışında bulunması halinde bazı kişisel verileriniz yurt dışına aktarılabilir.",
    ),
    p(
      "Yurt dışına veri aktarımı; KVKK, GDPR ve uygulanabilir diğer veri koruma mevzuatında öngörülen şartlara uygun şekilde gerçekleştirilir. Gerekli hallerde açık rıza, standart sözleşme hükümleri, yeterlilik kararları, taahhütnameler veya ilgili mevzuatta öngörülen diğer güvence mekanizmaları uygulanır.",
    ),
  ]),
  sec("09", "ÇEREZLER", [
    p("Web sitemizde çerezler ve benzeri teknolojiler kullanılabilir."),
    p("Çerezler genel olarak aşağıdaki kategorilerde olabilir:"),
    ul([
      "Zorunlu çerezler",
      "Performans ve analitik çerezleri",
      "İşlevsel çerezler",
      "Reklam ve pazarlama çerezleri",
    ]),
    p(
      "Zorunlu çerezler web sitesinin çalışması için gereklidir. Zorunlu olmayan çerezler ise gerekli olduğu hallerde tercihlerinize veya açık rızanıza bağlı olarak kullanılır.",
    ),
    p(
      "Çerez kullanımı, çerez kategorileri, saklama süreleri, üçüncü taraf çerezleri ve tercih yönetimi hakkında detaylı bilgi için “Çerez Politikası” incelenmelidir.",
    ),
  ]),
  sec("10", "SAKLAMA SÜRELERİ", [
    p(
      "Web sitesi ziyaretçilerine ait kişisel veriler, işlendikleri amaç için gerekli olan süre kadar veya ilgili mevzuatta öngörülen süreler boyunca saklanır.",
    ),
    p("Saklama süreleri belirlenirken aşağıdaki kriterler dikkate alınır:"),
    ul([
      "Web sitesi güvenliği için gerekli teknik saklama süreleri",
      "Talep, başvuru veya iletişim sürecinin devamı",
      "Hukuki yükümlülükler",
      "Dava, uyuşmazlık ve zamanaşımı süreleri",
      "Bilgi güvenliği ve sistem loglama ihtiyaçları",
      "Kullanıcının açık rızası veya çerez tercihleri",
      "NOVVES’in meşru menfaatleri",
    ]),
    p(
      "Saklama süresi sona eren veya işlenme amacı ortadan kalkan kişisel veriler ilgili mevzuata uygun olarak silinir, yok edilir veya anonim hale getirilir.",
    ),
  ]),
  sec("11", "VERİ GÜVENLİĞİ", [
    p(
      "NOVVES, web sitesi üzerinden işlenen kişisel verilerin güvenliğini sağlamak için makul teknik ve idari tedbirleri uygular.",
    ),
    p("Bu kapsamda aşağıdaki önlemler alınabilir:"),
    ul([
      "Erişim yetkilendirme kontrolleri",
      "Güvenlik duvarı ve siber güvenlik önlemleri",
      "Loglama ve izleme sistemleri",
      "Kötüye kullanım ve saldırı tespit mekanizmaları",
      "Sunucu ve hosting güvenliği",
      "Yedekleme ve veri kaybı önleme tedbirleri",
      "Yetkisiz erişime karşı teknik koruma önlemleri",
      "Gizlilik taahhütleri ve tedarikçi kontrolleri",
      "Gerektiğinde şifreleme, maskeleme veya veri minimizasyonu",
    ]),
    p(
      "NOVVES, bilgi güvenliği ve gizlilik yönetimi süreçlerinde ISO/IEC 27001 Bilgi Güvenliği Yönetim Sistemi ve ISO/IEC 27701 Gizlilik Bilgi Yönetim Sistemi prensiplerini dikkate alır. Bu ifade, ayrıca belirtilmedikçe Şirketin ilgili standartlarda sertifikalı olduğu anlamına gelmez.",
    ),
  ]),
  sec("12", "İLGİLİ KİŞİNİN HAKLARI", [
    p(
      "KVKK’nın 11. maddesi uyarınca kişisel veri sahibi olarak aşağıdaki haklara sahipsiniz:",
    ),
    ul([
      "Kişisel verilerinizin işlenip işlenmediğini öğrenme",
      "Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme",
      "Kişisel verilerinizin işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme",
      "Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme",
      "Kişisel verilerinizin eksik veya yanlış işlenmiş olması halinde düzeltilmesini isteme",
      "KVKK’da öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme",
      "Düzeltme, silme veya yok etme işlemlerinin kişisel verilerinizin aktarıldığı üçüncü kişilere bildirilmesini isteme",
      "İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme",
      "Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme",
    ]),
  ]),
  sec("13", "HAKLARINIZI NASIL KULLANABİLİRSİNİZ?", [
    p(
      "Kişisel verilerinize ilişkin taleplerinizi aşağıdaki iletişim kanalları üzerinden NOVVES’e iletebilirsiniz:",
    ),
    p("Resmi Başvuru ve Bildirimler İçin KEP: novveselektrik@hs01.kep.tr"),
    p("Genel İletişim E-postası: info@novves.com"),
    p("Telefon: 0216 467 47 52"),
    p("Posta Adresi: Taşköprü Merkez Mah. Çaydere Sok. No:9/1 İç Kapı No:2 Çiftlikköy / YALOVA"),
    p(
      "Başvurunuzda adınız, soyadınız, iletişim bilgileriniz, talebinizin konusu ve kimliğinizi doğrulamaya yarayacak bilgiler yer almalıdır.",
    ),
    p(
      "NOVVES, başvuruları ilgili mevzuatta öngörülen süreler içinde değerlendirir ve sonuçlandırır. Güvenliğiniz amacıyla, başvurunun size ait olduğunu doğrulamak için ek bilgi veya belge talep edilebilir.",
    ),
  ]),
  sec("14", "AÇIK RIZA VE AYDINLATMA AYRIMI", [
    p(
      "Bu metin, web sitesi ziyaretçilerine yönelik aydınlatma metnidir ve tek başına açık rıza metni değildir.",
    ),
    p(
      "Açık rıza gerektiren işlemler için, gerekli hallerde ayrıca açık rıza metni veya tercih yönetimi mekanizması sunulabilir. Çerez tercihleri, ticari elektronik ileti izinleri ve pazarlama amaçlı veri işleme faaliyetleri, ilgili mevzuata uygun şekilde ayrı olarak yönetilir.",
    ),
  ]),
  sec("15", "ÜÇÜNCÜ TARAF BAĞLANTILAR", [
    p(
      "Web sitemizde üçüncü taraf web sitelerine, sosyal medya platformlarına, video içeriklerine, harita hizmetlerine veya harici dijital hizmetlere bağlantılar bulunabilir.",
    ),
    p(
      "Üçüncü taraf web sitelerinin gizlilik uygulamalarından, veri işleme faaliyetlerinden veya içeriklerinden NOVVES sorumlu değildir. Bu siteleri ziyaret etmeden önce ilgili üçüncü tarafların gizlilik politikalarını ve kullanım koşullarını incelemeniz önerilir.",
    ),
  ]),
  sec("16", "METNİN GÜNCELLENMESİ", [
    p(
      "NOVVES, bu Web Sitesi Ziyaretçi Aydınlatma Metni’ni mevzuat değişiklikleri, web sitesi altyapı güncellemeleri, dijital hizmet sağlayıcı değişiklikleri veya iş süreçlerindeki değişiklikler doğrultusunda zaman zaman güncelleyebilir.",
    ),
    p("Güncel metin, www.novves.com üzerinde yayımlandığı tarihte yürürlüğe girer."),
  ]),
  sec("17", "İLETİŞİM", [
    p(
      "Web sitesi ziyaretçi verilerinin işlenmesi ve kişisel verilerin korunması süreçleriyle ilgili bizimle iletişime geçebilirsiniz.",
    ),
    p("NOVVES ELEKTRİK MOTOR ANONİM ŞİRKETİ"),
    p("Adres: Taşköprü Merkez Mah. Çaydere Sok. No:9/1 İç Kapı No:2 Çiftlikköy / YALOVA"),
    p("Telefon: 0216 467 47 52"),
    p("E-posta: info@novves.com"),
    p("KEP: novveselektrik@hs01.kep.tr"),
    p("Web: www.novves.com"),
    p(
      "NOVVES, web sitesi ziyaretçilerinin kişisel verilerinin korunmasını dijital güven, kurumsal şeffaflık ve mühendislik disiplininin bir parçası olarak görür.",
    ),
  ]),
];

export const visitorDocumentTr: LegalDocument = {
  id: "visitor",
  path: "visitor",
  title: "Web Sitesi Ziyaretçi",
  titleHighlight: "Aydınlatma Metni",
  badge: "WEB ZİYARETÇİLERİ",
  lastUpdated: "Yürürlük tarihi: 28.05.2026",
  storageCode: "POL-LEG-2026-03",
  classification: "Web Sitesi Ziyaretçi Aydınlatma Metni",
  contactEmail: "info@novves.com",
  intro: [
    "Kapsam: Web Ziyaretçileri",
    "Yürürlük Tarihi: 28.05.2026",
    "Doküman Tipi: Web Sitesi Ziyaretçi Aydınlatma Metni",
    "Kapsam: Web sitesi ziyaretçileri, form kullanıcıları ve dijital kanal kullanıcıları",
    "Web Sitesi: www.novves.com",
    "Veri Sorumlusu: NOVVES ELEKTRİK MOTOR ANONİM ŞİRKETİ",
  ],
  sections: visitorSections,
};
