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

const customerSections: LegalSection[] = [
  sec("01", "AMAÇ", [
    p(
      'NOVVES ELEKTRİK MOTOR ANONİM ŞİRKETİ (“NOVVES”, “Şirket”, “biz”) olarak, müşterilerimizin, potansiyel müşterilerimizin, bayi ve temsilcilerimizin, proje paydaşlarımızın ve iş ilişkisi içinde olduğumuz kurumların yetkililerinin kişisel verilerinin korunmasına önem veriyoruz.',
    ),
    p(
      "Bu Müşteri Aydınlatma Metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) kapsamında; teklif, sipariş, satış, sözleşme, proje, teknik değerlendirme, faturalandırma, sevkiyat, servis, bakım, garanti, satış sonrası destek ve müşteri ilişkileri süreçlerinde kişisel verilerinizin hangi amaçlarla işlendiğini, hangi yöntemlerle toplandığını, hangi hukuki sebeplere dayandığını, kimlerle paylaşılabileceğini ve veri sahibi olarak sahip olduğunuz hakları açıklamak amacıyla hazırlanmıştır.",
    ),
    p(
      "Bu metin; NOVVES ile ticari ilişki kuran veya kurma ihtimali bulunan gerçek kişi müşterileri, tüzel kişi müşterilerin yetkililerini, çalışanlarını, temsilcilerini, proje sorumlularını, satın alma ekiplerini, teknik ekiplerini, finans ve muhasebe yetkililerini, danışmanlarını ve diğer iş bağlantılarını kapsar.",
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
      "KEP adresi; resmi başvurular, hukuki bildirimler ve güvenli elektronik tebligat süreçleri için kullanılabilecek resmi iletişim kanalıdır. Genel bilgi ve iletişim talepleriniz için info@novves.com adresi üzerinden Şirketimizle iletişime geçebilirsiniz.",
    ),
  ]),
  sec("03", "İŞLENEN KİŞİSEL VERİ KATEGORİLERİ", [
    p(
      "NOVVES ile yürütülen B2B teklif, satış, proje ve müşteri ilişkileri süreçlerinde aşağıdaki kişisel veri kategorileri işlenebilir.",
    ),
  ]),
  sec("3.1", "Kimlik Bilgileri", [
    p(
      "Ad, soyad, unvan, çalışılan kurum, departman, görev, imza, temsil yetkisi bilgileri ve gerektiğinde kimlik doğrulama için gerekli sınırlı bilgiler.",
    ),
  ]),
  sec("3.2", "İletişim Bilgileri", [
    p(
      "Telefon numarası, e-posta adresi, iş adresi, şirket adresi, teslimat adresi, fatura adresi ve iletişim tercihleri.",
    ),
  ]),
  sec("3.3", "Müşteri ve İşlem Bilgileri", [
    p(
      "Teklif talepleri, ürün ve hizmet talepleri, sipariş bilgileri, teklif numarası, sipariş numarası, proje adı, ürün seçimi, katalog ve teknik doküman talepleri, görüşme kayıtları, toplantı notları, müşteri talep ve şikâyetleri, satış ve satış sonrası işlem kayıtları.",
    ),
  ]),
  sec("3.4", "Teknik ve Proje Bilgileri", [
    p(
      "Proje lokasyonu, proje tipi, kullanım alanı, ürün teknik özellikleri, fan seçim bilgileri, motor bilgileri, debi, basınç, sıcaklık dayanımı, sertifika ihtiyacı, teknik şartname, proje dokümanları, keşif bilgileri, uygulama koşulları, servis ve bakım talepleri.",
    ),
    p(
      "Bu bilgiler çoğunlukla tüzel kişi veya proje bilgisi niteliğinde olmakla birlikte, ilgili kişiyle ilişkilendirildiği ölçüde kişisel veri olarak değerlendirilebilir.",
    ),
  ]),
  sec("3.5", "Finans ve Muhasebe Bilgileri", [
    p(
      "Cari hesap bilgileri, fatura bilgileri, ödeme ve tahsilat kayıtları, banka bilgileri, vergi bilgileri, proforma fatura, irsaliye, ödeme planı, mutabakat ve finansal işlem kayıtları.",
    ),
  ]),
  sec("3.6", "Sözleşme ve Hukuki İşlem Bilgileri", [
    p(
      "Sözleşme süreçleri, teklif şartları, sipariş teyitleri, satın alma belgeleri, ticari yazışmalar, yetki belgeleri, imza sirküleri, uyuşmazlık kayıtları, dava ve icra süreçleriyle ilgili bilgiler.",
    ),
  ]),
  sec("3.7", "Dijital ve İletişim Kayıtları", [
    p(
      "E-posta yazışmaları, web sitesi formları, telefon görüşme notları, CRM kayıtları, ERP kayıtları, çevrim içi toplantı kayıtları, IP adresi, log kayıtları ve dijital işlem kayıtları.",
    ),
  ]),
  sec("3.8", "Görsel ve İşitsel Kayıtlar", [
    p(
      "Fuar, toplantı, saha ziyareti, fabrika ziyareti, teknik keşif, ürün tanıtımı veya kurumsal etkinliklerde elde edilen fotoğraf, video veya ses kayıtları.",
    ),
  ]),
  sec("04", "KİŞİSEL VERİLERİN İŞLENME AMAÇLARI", [
    p("Kişisel verileriniz aşağıdaki amaçlarla işlenebilir:"),
    ul([
      "Teklif taleplerinin alınması, değerlendirilmesi ve yanıtlanması",
      "Ürün, hizmet, proje ve teknik çözüm ihtiyaçlarının analiz edilmesi",
      "Fan, motor, otomasyon, duman tahliye, havalandırma ve benzeri teknik ürün seçim süreçlerinin yürütülmesi",
      "Proje bazlı mühendislik, saha keşfi, teknik değerlendirme ve çözüm geliştirme süreçlerinin yürütülmesi",
      "Teklif, proforma fatura, sipariş teyidi, sözleşme ve ticari dokümanların hazırlanması",
      "Satış, sipariş, üretim, teslimat ve sevkiyat süreçlerinin yürütülmesi",
      "Faturalandırma, cari hesap, ödeme, tahsilat ve mutabakat süreçlerinin yürütülmesi",
      "Müşteri, bayi, temsilci, distribütör ve proje paydaşı ilişkilerinin yönetilmesi",
      "Ürün güvenliği, kalite kontrol, sertifikasyon, test ve teknik dokümantasyon süreçlerinin yürütülmesi",
      "Garanti, servis, bakım, yedek parça, arıza bildirimi ve satış sonrası destek süreçlerinin yürütülmesi",
      "Müşteri memnuniyeti, talep, öneri ve şikâyet yönetimi süreçlerinin yürütülmesi",
      "Fuar, etkinlik, toplantı, sunum ve kurumsal iletişim süreçlerinin yürütülmesi",
      "NOVVES ürünleri, çözümleri, katalogları, teknik dokümanları ve hizmetleri hakkında bilgilendirme yapılması",
      "Ticari iletişim, pazarlama ve tanıtım faaliyetlerinin yürütülmesi",
      "İhracat, ithalat, lojistik, gümrük ve dış ticaret süreçlerinin yürütülmesi",
      "Yasal saklama, raporlama, denetim ve resmi kurumlara bilgi verme yükümlülüklerinin yerine getirilmesi",
      "Şirketimizin hukuki, ticari, teknik ve operasyonel güvenliğinin sağlanması",
      "Uyuşmazlıkların önlenmesi, hukuki hakların korunması ve yasal süreçlerin yürütülmesi",
    ]),
  ]),
  sec("05", "KİŞİSEL VERİLERİN İŞLENMESİNİN HUKUKİ SEBEPLERİ", [
    p(
      "Kişisel verileriniz, KVKK’nın 5. ve 6. maddelerinde belirtilen aşağıdaki hukuki sebeplere dayanılarak işlenebilir:",
    ),
    ul([
      "Kanunlarda açıkça öngörülmesi",
      "Bir sözleşmenin kurulması veya ifası için kişisel veri işlenmesinin gerekli olması",
      "Şirketimizin hukuki yükümlülüğünü yerine getirebilmesi için veri işlemenin zorunlu olması",
      "Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması",
      "Temel hak ve özgürlüklerinize zarar vermemek kaydıyla, Şirketimizin meşru menfaatleri için veri işlemenin zorunlu olması",
      "İlgili kişinin kendisi tarafından alenileştirilmiş olması",
      "Açık rızanızın bulunması",
    ]),
    p(
      "Teklif, sipariş, sözleşme, fatura, sevkiyat, ödeme ve satış sonrası destek süreçlerinde kişisel verileriniz çoğunlukla sözleşmenin kurulması veya ifası, hukuki yükümlülük, bir hakkın tesisi veya korunması ve NOVVES’in meşru menfaatleri kapsamında işlenmektedir.",
    ),
    p(
      "Ticari elektronik ileti, pazarlama faaliyetleri, açık rıza gerektiren tanıtım süreçleri veya özel nitelikli kişisel veri işleme faaliyetleri bakımından gerekli hallerde ayrıca açık rızanız alınır.",
    ),
  ]),
  sec("06", "KİŞİSEL VERİLERİN TOPLANMA YÖNTEMLERİ", [
    p(
      "Kişisel verileriniz aşağıdaki kanallar aracılığıyla otomatik veya otomatik olmayan yöntemlerle toplanabilir:",
    ),
    ul([
      "Web sitesi iletişim, teklif, katalog ve teknik destek formları",
      "E-posta yazışmaları",
      "Telefon görüşmeleri",
      "Satış ve müşteri ilişkileri görüşmeleri",
      "Fuar, etkinlik, toplantı ve saha ziyaretleri",
      "Bayi, temsilci, distribütör ve iş ortağı iletişimleri",
      "Teklif, sipariş, sözleşme, proforma fatura, fatura ve irsaliye süreçleri",
      "ERP, CRM, muhasebe, kalite, üretim, servis ve doküman yönetim sistemleri",
      "Teknik şartname, proje dokümanı, keşif raporu, ürün seçim formu ve servis formları",
      "Resmi kurumlar, gümrük müşavirleri, lojistik firmaları, tedarikçiler ve hizmet sağlayıcılar",
      "Sosyal medya, dijital iletişim kanalları ve çevrim içi toplantı araçları",
    ]),
    p("Kişisel verileriniz sözlü, yazılı veya elektronik ortamda işlenebilir."),
  ]),
  sec("07", "KİŞİSEL VERİLERİN AKTARILMASI", [
    p(
      "Kişisel verileriniz, işleme amaçlarıyla sınırlı olmak kaydıyla ve ilgili mevzuata uygun şekilde aşağıdaki kişi ve kuruluşlarla paylaşılabilir:",
    ),
    ul([
      "Yetkili kamu kurum ve kuruluşları",
      "Mahkemeler, icra daireleri, kolluk birimleri ve yasal merciler",
      "Mali müşavirler, bağımsız denetçiler, hukuk danışmanları ve danışmanlık hizmeti sağlayıcıları",
      "Bankalar, ödeme kuruluşları ve finansal hizmet sağlayıcıları",
      "Tedarikçiler, alt yükleniciler, üretim ve servis paydaşları",
      "Lojistik firmaları, kargo şirketleri, gümrük müşavirleri ve dış ticaret hizmet sağlayıcıları",
      "Yazılım, bulut, hosting, e-posta, siber güvenlik, ERP, CRM ve bilgi teknolojileri hizmet sağlayıcıları",
      "Bayiler, temsilciler, distribütörler ve iş ortakları",
      "Proje işverenleri, ana yükleniciler, mekanik tesisat firmaları, danışmanlar ve proje paydaşları",
      "Sertifikasyon, test, kalite kontrol, akreditasyon ve teknik denetim kuruluşları",
      "Sigorta şirketleri ve iş sağlığı güvenliği hizmet sağlayıcıları",
      "Satış sonrası servis, bakım, garanti ve teknik destek süreçlerinde görev alan yetkili kişi ve kuruluşlar",
    ]),
    p(
      "Kişisel verileriniz yalnızca gerekli olduğu ölçüde ve ilgili hukuki şartlar sağlanarak aktarılır.",
    ),
  ]),
  sec("08", "YURT DIŞINA VERİ AKTARIMI", [
    p(
      "NOVVES, ihracat, ithalat, uluslararası proje, yurt dışı bayi/temsilci ağı, global tedarik zinciri, teknik destek ve dijital hizmet sağlayıcıları nedeniyle bazı süreçlerde yurt dışındaki kişi ve kuruluşlarla çalışabilir.",
    ),
    p(
      "Bu kapsamda kişisel verileriniz; müşteriler, tedarikçiler, iş ortakları, temsilciler, teknik servis paydaşları, bulut hizmet sağlayıcıları, e-posta servisleri, CRM/ERP hizmetleri, lojistik firmaları veya yetkili kurumlarla paylaşılabilir.",
    ),
    p(
      "Yurt dışına veri aktarımı; KVKK, GDPR ve uygulanabilir diğer veri koruma mevzuatlarında öngörülen şartlara uygun şekilde gerçekleştirilir. Gerekli hallerde açık rıza, standart sözleşme hükümleri, yeterlilik kararları, taahhütnameler veya ilgili mevzuatta öngörülen diğer güvence mekanizmaları uygulanır.",
    ),
  ]),
  sec("09", "TİCARİ ELEKTRONİK İLETİLER VE PAZARLAMA", [
    p(
      "NOVVES; ürünleri, çözümleri, katalogları, teknik dokümanları, fuar katılımları, etkinlikleri, kampanyaları, kurumsal duyuruları ve sektörel gelişmeleri hakkında müşterileri ve potansiyel müşterileri bilgilendirebilir.",
    ),
    p(
      "Ticari elektronik iletiler, ilgili mevzuata uygun olarak ve gerekli hallerde önceden alınmış izninize dayanılarak gönderilir.",
    ),
    p(
      "Ticari elektronik ileti almak istememeniz halinde, iletilerde yer alan çıkış yöntemlerini kullanabilir veya info@novves.com adresi üzerinden bizimle iletişime geçebilirsiniz.",
    ),
  ]),
  sec("10", "SAKLAMA SÜRELERİ", [
    p(
      "Kişisel verileriniz, ilgili mevzuatta öngörülen süreler boyunca veya işlendikleri amaç için gerekli olan süre kadar saklanır.",
    ),
    p("Saklama süreleri belirlenirken aşağıdaki kriterler dikkate alınır:"),
    ul([
      "Teklif ve satış sürecinin devamı",
      "Sözleşme ilişkisinin devamı",
      "Sipariş, üretim, teslimat, sevkiyat ve garanti süreçleri",
      "Fatura, muhasebe, vergi ve finansal kayıt yükümlülükleri",
      "Satış sonrası servis, bakım ve teknik destek ihtiyaçları",
      "Ürün güvenliği, kalite, sertifikasyon ve teknik dokümantasyon gereklilikleri",
      "İhracat, ithalat, gümrük ve dış ticaret kayıt yükümlülükleri",
      "Dava, uyuşmazlık, icra ve zamanaşımı süreleri",
      "NOVVES’in meşru ticari ve operasyonel ihtiyaçları",
    ]),
    p(
      "Saklama süresi sona eren veya işlenme amacı ortadan kalkan kişisel veriler ilgili mevzuata uygun olarak silinir, yok edilir veya anonim hale getirilir.",
    ),
  ]),
  sec("11", "VERİ GÜVENLİĞİ", [
    p(
      "NOVVES, kişisel verilerin güvenliğini sağlamak için makul teknik ve idari tedbirleri uygular.",
    ),
    p("Bu kapsamda aşağıdaki önlemler alınabilir:"),
    ul([
      "Yetkilendirme ve erişim kontrolü",
      "Kullanıcı yetki yönetimi",
      "Parola ve kimlik doğrulama kontrolleri",
      "ERP, CRM ve dijital sistem erişim kontrolleri",
      "Güvenlik duvarı, antivirüs ve siber güvenlik önlemleri",
      "Loglama ve izleme sistemleri",
      "Veri yedekleme ve iş sürekliliği önlemleri",
      "Gizlilik taahhütleri ve çalışan farkındalık çalışmaları",
      "Tedarikçi ve hizmet sağlayıcı güvenlik kontrolleri",
      "Gerektiğinde şifreleme, maskeleme, anonimleştirme veya veri minimizasyonu",
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
      "Bu metin, müşteri ve potansiyel müşterilere yönelik aydınlatma metnidir. Bu metin tek başına açık rıza metni değildir.",
    ),
    p(
      "Açık rıza gerektiren işlemler için, gerekli hallerde ayrıca açık rıza metni, ticari elektronik ileti izni, çerez tercih paneli veya benzeri tercih yönetimi mekanizmaları sunulabilir.",
    ),
    p(
      "Aydınlatma yapılması, açık rıza verildiği anlamına gelmez. Açık rızaya dayalı işlemler, ilgili kişinin özgür iradesiyle verdiği ayrı onay kapsamında yürütülür.",
    ),
  ]),
  sec("15", "METNİN GÜNCELLENMESİ", [
    p(
      "NOVVES, bu Müşteri Aydınlatma Metni’ni mevzuat değişiklikleri, operasyonel ihtiyaçlar, satış süreçleri, teklif sistemleri, dijital altyapı güncellemeleri veya iş süreçlerindeki değişiklikler doğrultusunda zaman zaman güncelleyebilir.",
    ),
    p("Güncel metin, www.novves.com üzerinde yayımlandığı tarihte yürürlüğe girer."),
  ]),
  sec("16", "İLETİŞİM", [
    p(
      "Müşteri süreçleri ve kişisel verilerin korunmasıyla ilgili bizimle iletişime geçebilirsiniz.",
    ),
    p("NOVVES ELEKTRİK MOTOR ANONİM ŞİRKETİ"),
    p("Adres: Taşköprü Merkez Mah. Çaydere Sok. No:9/1 İç Kapı No:2 Çiftlikköy / YALOVA"),
    p("Telefon: 0216 467 47 52"),
    p("E-posta: info@novves.com"),
    p("KEP: novveselektrik@hs01.kep.tr"),
    p("Web: www.novves.com"),
    p(
      "NOVVES, müşteri ilişkileri, teklif süreçleri, mühendislik çözümleri, satış operasyonları ve satış sonrası destek faaliyetlerinde kişisel verilerin korunmasını kurumsal güvenin ayrılmaz bir parçası olarak görür.",
    ),
  ]),
];

export const customerDocumentTr: LegalDocument = {
  id: "customer",
  path: "customer",
  title: "Müşteri",
  titleHighlight: "Aydınlatma Metni",
  badge: "B2B / TEKLİF",
  lastUpdated: "Yürürlük tarihi: 28.05.2026",
  storageCode: "POL-LEG-2026-05",
  classification: "Müşteri Aydınlatma Metni",
  contactEmail: "info@novves.com",
  intro: [
    "Kapsam: B2B / Teklif Süreçleri",
    "Yürürlük Tarihi: 28.05.2026",
    "Doküman Tipi: Müşteri Aydınlatma Metni",
    "Kapsam: B2B Müşteriler, Potansiyel Müşteriler, Teklif Süreçleri, Satış ve Satış Sonrası Süreçler",
    "Veri Sorumlusu: NOVVES ELEKTRİK MOTOR ANONİM ŞİRKETİ",
  ],
  sections: customerSections,
};
