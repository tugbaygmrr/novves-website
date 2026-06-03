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

const privacySections: LegalSection[] = [
  sec("01", "GİRİŞ", [
    p(
      'NOVVES ELEKTRİK MOTOR ANONİM ŞİRKETİ (“NOVVES”, “Şirket”, “biz”) olarak; müşterilerimizin, tedarikçilerimizin, iş ortaklarımızın, çalışanlarımızın, çalışan adaylarımızın, ziyaretçilerimizin, web sitesi kullanıcılarımızın ve bizimle iletişime geçen tüm kişilerin kişisel verilerinin gizliliğine ve güvenliğine önem veriyoruz.',
    ),
    p(
      'Bu Kişisel Verilerin Korunması ve Gizlilik Politikası; 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”), Avrupa Birliği Genel Veri Koruma Tüzüğü (“GDPR”), uygulanabilir olduğu ölçüde Amerika Birleşik Devletleri’ndeki eyalet bazlı gizlilik düzenlemeleri ve ilgili diğer veri koruma mevzuatları kapsamında kişisel verilerinizin hangi amaçlarla işlendiğini, hangi hukuki sebeplere dayandığını, kimlerle paylaşılabileceğini, ne kadar süreyle saklanabileceğini ve veri sahibi olarak sahip olduğunuz hakları açıklamak amacıyla hazırlanmıştır.',
    ),
    p(
      "NOVVES; kişisel verileri hukuka ve dürüstlük kurallarına uygun, doğru ve gerektiğinde güncel, belirli, açık ve meşru amaçlar doğrultusunda, işlendikleri amaçla bağlantılı, sınırlı ve ölçülü şekilde işler. Kişisel veriler, ilgili mevzuatta öngörülen veya işlendikleri amaç için gerekli olan süre kadar muhafaza edilir.",
    ),
    p(
      "Bu politika, NOVVES’in genel gizlilik ve kişisel veri koruma yaklaşımını açıklayan ana çatı metindir. Web sitesi ziyaretçileri, çerez kullanımı, müşteri ve iş ortağı süreçleri, ürün güvenliği temas noktası ve ilgili kişi başvuruları için ayrıca özel metinler veya formlar yayımlanabilir.",
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
  sec("03", "POLİTİKANIN KAPSAMI", [
    p("Bu politika aşağıdaki kişi gruplarını kapsayabilir:"),
    ul([
      "Web sitesi ziyaretçileri",
      "Müşteriler ve potansiyel müşteriler",
      "Bayiler, temsilciler ve iş ortakları",
      "Tedarikçiler ve hizmet sağlayıcılar",
      "Proje paydaşları, danışmanlar ve teknik ekipler",
      "Şirket tesislerini, ofislerini, fuar standlarını veya etkinlik alanlarını ziyaret eden kişiler",
      "Çalışanlar ve çalışan adayları",
      "NOVVES ile e-posta, telefon, form, sosyal medya veya diğer kanallar üzerinden iletişime geçen kişiler",
      "Ürün güvenliği, teknik destek, servis, bakım, garanti veya dokümantasyon talebi oluşturan kişiler",
    ]),
  ]),
  sec("04", "İŞLENEN KİŞİSEL VERİ KATEGORİLERİ", [
    p(
      "NOVVES tarafından, ilişkinin niteliğine ve işleme amacına göre aşağıdaki kişisel veri kategorileri işlenebilir.",
    ),
  ]),
  sec("4.1", "Kimlik Bilgileri", [
    p(
      "Ad, soyad, unvan, çalışılan kurum, imza, T.C. kimlik numarası, pasaport bilgisi veya kimlik doğrulama için gerekli benzeri bilgiler.",
    ),
  ]),
  sec("4.2", "İletişim Bilgileri", [
    p(
      "Telefon numarası, e-posta adresi, iş adresi, fatura adresi, teslimat adresi ve iletişim tercihleri.",
    ),
  ]),
  sec("4.3", "Müşteri ve İşlem Bilgileri", [
    p(
      "Teklif talepleri, sipariş bilgileri, proje bilgileri, sözleşme süreçleri, satış kayıtları, satın alma kayıtları, teslimat bilgileri, garanti talepleri, servis ve bakım süreçleri.",
    ),
  ]),
  sec("4.4", "Finans ve Muhasebe Bilgileri", [
    p(
      "Fatura bilgileri, cari hesap bilgileri, ödeme kayıtları, banka bilgileri, tahsilat ve ödeme süreçlerine ilişkin bilgiler.",
    ),
  ]),
  sec("4.5", "Dijital Veriler", [
    p(
      "IP adresi, web sitesi kullanım bilgileri, çerez kayıtları, cihaz bilgileri, tarayıcı bilgileri, oturum kayıtları, form gönderimleri, log kayıtları ve güvenlik kayıtları.",
    ),
  ]),
  sec("4.6", "Görsel ve İşitsel Kayıtlar", [
    p(
      "Şirket tesisleri, ofisler, üretim alanları, fuar alanları, etkinlikler veya toplantılar kapsamında elde edilen fotoğraf, video ve kamera kayıtları.",
    ),
  ]),
  sec("4.7", "Çalışan ve Çalışan Adayı Bilgileri", [
    p(
      "Özgeçmiş, eğitim bilgileri, iş tecrübesi, referans bilgileri, mülakat notları, bordro, özlük, SGK, iş sağlığı ve güvenliği, performans ve insan kaynakları süreçlerine ilişkin bilgiler.",
    ),
  ]),
  sec("4.8", "Teknik ve Operasyonel Bilgiler", [
    p(
      "Proje adı, ürün bilgisi, teknik talep, servis kaydı, ürün güvenliği bildirimi, garanti süreci, arıza kaydı, saha keşfi, bakım ve teknik destek süreçlerinde paylaşılan bilgiler.",
    ),
  ]),
  sec("4.9", "Özel Nitelikli Kişisel Veriler", [
    p(
      "Sağlık raporu, iş sağlığı ve güvenliği kayıtları, engellilik durumu veya mevzuat gereği işlenmesi zorunlu özel nitelikli veriler, yalnızca kanunda öngörülen şartlara uygun olarak ve gerekli güvenlik tedbirleri alınarak işlenir.",
    ),
  ]),
  sec("05", "KİŞİSEL VERİLERİN İŞLENME AMAÇLARI", [
    p("Kişisel verileriniz aşağıdaki amaçlarla işlenebilir:"),
    ul([
      "NOVVES tarafından sunulan ürün ve hizmetlerin sağlanması",
      "Teklif, sipariş, satış, teslimat, servis, bakım, garanti ve satış sonrası destek süreçlerinin yürütülmesi",
      "Proje bazlı mühendislik, saha keşfi, teknik analiz, ürün seçimi ve çözüm geliştirme süreçlerinin yürütülmesi",
      "Müşteri, tedarikçi, bayi, temsilci ve iş ortağı ilişkilerinin yönetilmesi",
      "Sözleşmelerin kurulması, ifası ve sözleşmeden doğan yükümlülüklerin yerine getirilmesi",
      "Finans, muhasebe, faturalandırma, tahsilat ve ödeme süreçlerinin yürütülmesi",
      "Lojistik, sevkiyat, gümrük, ihracat ve ithalat operasyonlarının yürütülmesi",
      "Ürün güvenliği, kalite kontrol, test, sertifikasyon ve teknik dokümantasyon süreçlerinin yürütülmesi",
      "Ürün güvenliği bildirimlerinin, teknik destek taleplerinin ve uygunsuzluk bildirimlerinin değerlendirilmesi",
      "İnsan kaynakları, işe alım, çalışan yönetimi, bordro ve iş sağlığı güvenliği süreçlerinin yürütülmesi",
      "Şirket tesislerinin, çalışanların, ziyaretçilerin ve iş süreçlerinin fiziksel güvenliğinin sağlanması",
      "Bilgi güvenliği, sistem yönetimi, erişim kontrolü, loglama ve siber güvenlik süreçlerinin yürütülmesi",
      "Web sitesi, dijital platformlar ve iletişim kanallarının güvenli şekilde işletilmesi",
      "Müşteri memnuniyeti, kurumsal iletişim, talep ve şikâyet yönetimi süreçlerinin yürütülmesi",
      "Pazarlama, tanıtım, fuar, etkinlik, katalog, kampanya ve ticari iletişim faaliyetlerinin yürütülmesi",
      "Yasal saklama, raporlama, denetim ve resmi kurumlara bilgi verme yükümlülüklerinin yerine getirilmesi",
      "NOVVES’in hukuki, ticari, teknik ve operasyonel güvenliğinin sağlanması",
      "Uyuşmazlıkların önlenmesi, hukuki süreçlerin yürütülmesi ve hakların korunması",
    ]),
  ]),
  sec("06", "KİŞİSEL VERİLERİN İŞLENMESİNİN HUKUKİ SEBEPLERİ", [
    p(
      "Kişisel verileriniz, KVKK’nın 5. ve 6. maddeleri başta olmak üzere ilgili mevzuatta belirtilen aşağıdaki hukuki sebeplere dayanılarak işlenebilir:",
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
      "Avrupa Ekonomik Alanı, Avrupa Birliği veya GDPR kapsamındaki kişiler bakımından kişisel veriler; sözleşmenin ifası, hukuki yükümlülük, meşru menfaat, açık rıza, kamu yararı ve hayati menfaat gibi hukuki dayanaklara uygun olarak işlenir.",
    ),
    p(
      "Pazarlama, ticari elektronik ileti, analitik çerezler, reklam çerezleri veya açık rıza gerektiren diğer işlemler bakımından gerekli hallerde ayrıca açık rızanız veya ilgili elektronik ileti izniniz alınır.",
    ),
  ]),
  sec("07", "KİŞİSEL VERİLERİN TOPLANMA YÖNTEMLERİ", [
    p(
      "Kişisel verileriniz aşağıdaki kanallar aracılığıyla otomatik veya otomatik olmayan yöntemlerle toplanabilir:",
    ),
    ul([
      "Web sitesi iletişim, teklif, katalog, başvuru ve destek formları",
      "E-posta, telefon, sosyal medya ve diğer dijital iletişim kanalları",
      "Satış, teklif, sipariş, sözleşme, fatura ve teslimat süreçleri",
      "Fuar, etkinlik, toplantı, saha ziyareti ve iş geliştirme görüşmeleri",
      "Müşteri, bayi, temsilci, tedarikçi ve iş ortağı iletişimleri",
      "İnsan kaynakları başvuru süreçleri",
      "Şirket ofisleri, üretim tesisleri, güvenlik kameraları ve ziyaretçi kayıtları",
      "ERP, CRM, muhasebe, kalite, üretim, servis ve dijital iş yönetimi sistemleri",
      "Yetkili kamu kurumları, tedarikçiler, iş ortakları ve hizmet sağlayıcılar",
      "Ürün güvenliği, teknik destek, servis ve bakım bildirimleri",
    ]),
  ]),
  sec("08", "KİŞİSEL VERİLERİN AKTARILMASI", [
    p(
      "Kişisel verileriniz, işleme amaçlarıyla sınırlı olmak kaydıyla ve ilgili mevzuata uygun şekilde aşağıdaki kişi ve kuruluşlarla paylaşılabilir:",
    ),
    ul([
      "Yetkili kamu kurum ve kuruluşları",
      "Mahkemeler, icra daireleri, kolluk birimleri ve yasal merciler",
      "Mali müşavirler, bağımsız denetçiler, hukuk danışmanları ve danışmanlık hizmeti sağlayıcıları",
      "Bankalar, ödeme kuruluşları ve finansal hizmet sağlayıcıları",
      "Tedarikçiler, lojistik firmaları, kargo şirketleri, gümrük müşavirleri ve dış ticaret hizmet sağlayıcıları",
      "Yazılım, bulut, hosting, e-posta, siber güvenlik, ERP, CRM ve bilgi teknolojileri hizmet sağlayıcıları",
      "Bayiler, temsilciler, iş ortakları ve proje paydaşları",
      "Sertifikasyon, test, kalite kontrol, akreditasyon ve teknik denetim kuruluşları",
      "Sigorta şirketleri ve iş sağlığı güvenliği hizmet sağlayıcıları",
      "Ürün güvenliği, servis, bakım ve teknik destek süreçlerinde yer alan yetkili kişi ve kuruluşlar",
    ]),
    p(
      "Kişisel verileriniz, yalnızca gerekli olduğu ölçüde ve ilgili hukuki şartlar sağlanarak aktarılır.",
    ),
  ]),
  sec("09", "YURT DIŞINA VERİ AKTARIMI", [
    p(
      "NOVVES, global ölçekte faaliyet gösteren müşteriler, tedarikçiler, temsilciler, iş ortakları ve dijital hizmet sağlayıcılarla çalışabilir. Bu nedenle bazı kişisel veriler, işin niteliğine göre yurt dışındaki hizmet sağlayıcılara, iş ortaklarına, teknik paydaşlara veya yetkili kurumlara aktarılabilir.",
    ),
    p(
      "Yurt dışına veri aktarımı; KVKK, GDPR ve uygulanabilir diğer veri koruma mevzuatlarında öngörülen şartlara uygun şekilde gerçekleştirilir. Gerekli hallerde açık rıza, standart sözleşme hükümleri, yeterlilik kararları, taahhütnameler veya ilgili mevzuatta öngörülen diğer güvence mekanizmaları uygulanır.",
    ),
  ]),
  sec("10", "VERİ GÜVENLİĞİ", [
    p(
      "NOVVES, kişisel verilerin gizliliğini, bütünlüğünü ve erişilebilirliğini korumak amacıyla makul teknik ve idari tedbirleri uygular.",
    ),
    p("Bu kapsamda aşağıdaki önlemler alınabilir:"),
    ul([
      "Yetkilendirme ve erişim kontrolü",
      "Parola, kimlik doğrulama ve kullanıcı yetki yönetimi",
      "Güvenlik duvarı, antivirüs, loglama ve izleme sistemleri",
      "Veri yedekleme ve iş sürekliliği önlemleri",
      "Fiziksel güvenlik, ziyaretçi kayıtları ve kamera güvenliği",
      "Gizlilik taahhütleri ve çalışan farkındalık çalışmaları",
      "Tedarikçi ve hizmet sağlayıcı güvenlik kontrolleri",
      "Gerektiğinde şifreleme, maskeleme, anonimleştirme veya veri minimizasyonu",
      "Yetkisiz erişim, veri kaybı, kötüye kullanım ve siber güvenlik risklerine karşı makul koruma önlemleri",
    ]),
    p(
      "NOVVES, bilgi güvenliği ve gizlilik yönetimi süreçlerinde ISO/IEC 27001 Bilgi Güvenliği Yönetim Sistemi ve ISO/IEC 27701 Gizlilik Bilgi Yönetim Sistemi prensiplerini dikkate alır. Bu ifade, ayrıca belirtilmedikçe Şirketin ilgili standartlarda sertifikalı olduğu anlamına gelmez.",
    ),
  ]),
  sec("11", "SAKLAMA SÜRELERİ VE İMHA", [
    p(
      "Kişisel verileriniz, ilgili mevzuatta öngörülen süreler boyunca veya işlendikleri amaç için gerekli olan süre kadar saklanır.",
    ),
    p("Saklama süreleri belirlenirken özellikle aşağıdaki kriterler dikkate alınır:"),
    ul([
      "İlgili kanunlarda öngörülen saklama süreleri",
      "Vergi, ticaret, iş, sosyal güvenlik, iş sağlığı ve güvenliği mevzuatı",
      "Sözleşme ilişkisinin devamı",
      "Garanti, servis, bakım ve satış sonrası destek yükümlülükleri",
      "Ürün güvenliği, teknik dokümantasyon ve kalite süreçleri",
      "Uyuşmazlık, dava, icra ve zamanaşımı süreleri",
      "Meşru ticari ve operasyonel ihtiyaçlar",
    ]),
    p(
      "Saklama süresi sona eren veya işlenme amacı ortadan kalkan kişisel veriler; ilgili mevzuata uygun olarak silinir, yok edilir veya anonim hale getirilir.",
    ),
  ]),
  sec("12", "ÇEREZLER VE DİJİTAL TAKİP TEKNOLOJİLERİ", [
    p(
      "NOVVES web sitesinde kullanıcı deneyimini iyileştirmek, site performansını ölçmek, güvenliği sağlamak ve dijital pazarlama faaliyetlerini yürütmek amacıyla çerezler ve benzeri teknolojiler kullanılabilir.",
    ),
    p(
      "Zorunlu çerezler, web sitesinin güvenli ve düzgün çalışması için kullanılır. Analitik, performans, reklam ve pazarlama çerezleri ise gerekli olduğu hallerde tercihlerinize veya açık rızanıza bağlı olarak kullanılır.",
    ),
    p(
      "Çerezlere ilişkin detaylı bilgi, web sitemizde yayımlanacak ayrı “Çerez Politikası” üzerinden sunulur.",
    ),
  ]),
  sec("13", "TİCARİ ELEKTRONİK İLETİLER", [
    p(
      "NOVVES, ürünler, çözümler, kataloglar, fuarlar, etkinlikler, kampanyalar ve kurumsal duyurular hakkında sizinle iletişime geçebilir.",
    ),
    p(
      "Ticari elektronik iletiler; ilgili mevzuata uygun olarak, gerekli hallerde önceden alınmış izninize dayanılarak gönderilir. Ticari elektronik ileti almak istememeniz halinde, iletilerde yer alan çıkış yöntemlerini kullanabilir veya bizimle iletişime geçebilirsiniz.",
    ),
  ]),
  sec("14", "TÜRKİYE’DEKİ İLGİLİ KİŞİLERİN KVKK KAPSAMINDAKİ HAKLARI", [
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
  sec("15", "AVRUPA BİRLİĞİ / AVRUPA EKONOMİK ALANI KAPSAMINDAKİ KİŞİLERİN HAKLARI", [
    p(
      "GDPR kapsamına giren kişiler, uygulanabilir olduğu ölçüde aşağıdaki haklara sahip olabilir:",
    ),
    ul([
      "Kişisel verilere erişim hakkı",
      "Kişisel verilerin düzeltilmesini talep etme hakkı",
      "Kişisel verilerin silinmesini talep etme hakkı",
      "İşlemenin kısıtlanmasını talep etme hakkı",
      "Veri taşınabilirliği hakkı",
      "Meşru menfaate dayalı işlemeye itiraz hakkı",
      "Açık rızaya dayalı işleme faaliyetlerinde rızayı geri çekme hakkı",
      "Otomatik karar verme ve profillemeye itiraz hakkı",
      "İlgili denetim otoritesine şikâyette bulunma hakkı",
    ]),
  ]),
  sec("16", "ABD’DE BULUNAN KULLANICILAR İÇİN GİZLİLİK HAKLARI", [
    p(
      "Amerika Birleşik Devletleri’nde veri koruma mevzuatı eyalet bazlı farklılık gösterebilir. Uygulanabilir olması halinde, özellikle California Consumer Privacy Act / California Privacy Rights Act gibi düzenlemeler kapsamında kullanıcılar aşağıdaki haklara sahip olabilir:",
    ),
    ul([
      "Hangi kişisel bilgilerin toplandığını öğrenme",
      "Kişisel bilgilere erişim talep etme",
      "Kişisel bilgilerin silinmesini talep etme",
      "Yanlış bilgilerin düzeltilmesini talep etme",
      "Belirli veri paylaşımlarından veya satışından vazgeçme hakkı",
      "Hassas kişisel bilgilerin kullanımının sınırlandırılmasını talep etme",
      "Gizlilik haklarını kullandığı için ayrımcılığa uğramama hakkı",
    ]),
    p(
      "NOVVES, kişisel verileri satmayı temel bir iş modeli olarak benimsemez. Bununla birlikte, dijital reklam, analitik veya üçüncü taraf çerez kullanımları, ilgili mevzuata göre “paylaşım”, “hedefli reklam” veya benzeri kavramlar kapsamında değerlendirilebileceğinden, bu işlemler ayrıca çerez tercihleri ve açık rıza mekanizmaları ile yönetilir.",
    ),
  ]),
  sec("17", "OTOMATİK KARAR VERME VE PROFİLLEME", [
    p(
      "NOVVES, kişisel verilerinizi münhasıran otomatik sistemler aracılığıyla analiz ederek sizin aleyhinize hukuki sonuç doğuracak veya benzer şekilde önemli etki yaratacak kararlar almak amacıyla işlemez.",
    ),
    p(
      "Web sitesi kullanım istatistikleri, çerezler, pazarlama tercihleri veya müşteri segmentasyonu gibi sınırlı analizler yapılması halinde, bu süreçler ilgili mevzuata uygun olarak ve gerekli hallerde açık rıza veya tercih yönetimi mekanizmalarıyla yürütülür.",
    ),
  ]),
  sec("18", "ÇOCUKLARA AİT KİŞİSEL VERİLER", [
    p(
      "NOVVES’in ürün ve hizmetleri esas olarak ticari, endüstriyel ve profesyonel kullanıcılara yöneliktir. NOVVES, bilerek çocuklara ait kişisel verileri toplamaz veya çocuklara yönelik pazarlama faaliyeti yürütmez.",
    ),
    p(
      "Çocuklara ait kişisel verilerin sehven işlendiğinin tespit edilmesi halinde, ilgili mevzuata uygun şekilde gerekli silme, yok etme veya anonimleştirme süreçleri uygulanır.",
    ),
  ]),
  sec("19", "ÜÇÜNCÜ TARAF BAĞLANTILAR", [
    p(
      "NOVVES web sitesi, üçüncü taraf web sitelerine, sosyal medya platformlarına, belge indirme alanlarına veya harici dijital hizmetlere bağlantılar içerebilir.",
    ),
    p(
      "Üçüncü taraf sitelerin gizlilik uygulamalarından, içeriklerinden veya veri işleme faaliyetlerinden NOVVES sorumlu değildir. Bu siteleri ziyaret etmeden önce ilgili üçüncü tarafların gizlilik politikalarını incelemeniz önerilir.",
    ),
  ]),
  sec("20", "HAKLARINIZI NASIL KULLANABİLİRSİNİZ?", [
    p(
      "Kişisel verilerinize ilişkin taleplerinizi aşağıdaki iletişim kanalları üzerinden NOVVES’e iletebilirsiniz:",
    ),
    p("Resmi Başvuru ve Bildirimler İçin KEP: novveselektrik@hs01.kep.tr"),
    p("Genel İletişim E-postası: info@novves.com"),
    p("Telefon: 0216 467 47 52"),
    p("Posta Adresi: Taşköprü Merkez Mah. Çaydere Sok. No:9/1 İç Kapı No:2 Çiftlikköy / YALOVA"),
    p(
      "Başvurunuzda adınız, soyadınız, iletişim bilgileriniz, talebinizin konusu ve kimliğinizi doğrulamaya yarayacak bilgiler yer almalıdır. NOVVES, başvuruları ilgili mevzuatta öngörülen süreler içinde değerlendirir ve sonuçlandırır.",
    ),
    p(
      "Güvenliğiniz amacıyla, talebinizin size ait olduğunu doğrulamak için ek bilgi veya belge talep edilebilir. Bu süreçte yalnızca kimlik doğrulama için gerekli bilgiler talep edilir.",
    ),
  ]),
  sec("21", "POLİTİKA DEĞİŞİKLİKLERİ", [
    p(
      "NOVVES, bu Kişisel Verilerin Korunması ve Gizlilik Politikası’nı mevzuat değişiklikleri, operasyonel ihtiyaçlar, dijital sistem güncellemeleri veya iş süreçlerindeki değişiklikler doğrultusunda zaman zaman güncelleyebilir.",
    ),
    p(
      "Güncel politika, www.novves.com üzerinden yayımlandığı tarihte yürürlüğe girer.",
    ),
  ]),
  sec("22", "İLETİŞİM", [
    p(
      "Kişisel verilerinizin korunması ve gizlilik süreçleriyle ilgili sorularınız için bizimle iletişime geçebilirsiniz.",
    ),
    p("NOVVES ELEKTRİK MOTOR ANONİM ŞİRKETİ"),
    p("Adres: Taşköprü Merkez Mah. Çaydere Sok. No:9/1 İç Kapı No:2 Çiftlikköy / YALOVA"),
    p("Telefon: 0216 467 47 52"),
    p("E-posta: info@novves.com"),
    p("KEP: novveselektrik@hs01.kep.tr"),
    p("Web: www.novves.com"),
    p(
      "NOVVES, mühendislik, üretim, test, satış, servis ve global iş geliştirme faaliyetlerinde kişisel verilerin korunmasını kurumsal güvenin ayrılmaz bir parçası olarak görür.",
    ),
  ]),
];

export const privacyDocumentTr: LegalDocument = {
  id: "privacy",
  path: "privacy",
  title: "Kişisel Verilerin Korunması",
  titleHighlight: "ve Gizlilik Politikası",
  badge: "ANA ÇATI METİN",
  lastUpdated: "Son güncelleme: 28.05.2026",
  storageCode: "POL-LEG-2026-01",
  classification: "Ana Çatı Gizlilik ve Veri Koruma Politikası",
  contactEmail: "info@novves.com",
  intro: [
    "Kapsam: Ana Çatı Metin",
    "Son Güncelleme Tarihi: 28.05.2026",
    "Doküman Tipi: Ana Çatı Gizlilik ve Veri Koruma Politikası",
    "Veri Sorumlusu: NOVVES ELEKTRİK MOTOR ANONİM ŞİRKETİ",
  ],
  sections: privacySections,
};
