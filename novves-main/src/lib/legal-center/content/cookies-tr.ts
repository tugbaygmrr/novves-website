import type {
  LegalContentBlock,
  LegalDefinitionItem,
  LegalDocument,
  LegalSection,
} from "@/lib/legal-center/types";

const p = (text: string): LegalContentBlock => ({ type: "paragraph", text });
const ul = (items: string[]): LegalContentBlock => ({ type: "list", items });
const defs = (items: LegalDefinitionItem[]): LegalContentBlock => ({
  type: "definitions",
  items,
});

function sec(
  number: string,
  title: string,
  blocks: LegalContentBlock[],
): LegalSection {
  return { number, title, blocks };
}

const cookieCategoryTable: LegalDefinitionItem[] = [
  {
    abbr: "Z",
    title: "Zorunlu Çerezler",
    description:
      "Kullanım amacı: Web sitesinin çalışması, güvenlik, oturum ve tercih yönetimi. Hukuki sebep: Meşru menfaat / hukuki yükümlülük. Saklama: Oturum süresi veya teknik ihtiyaç kadar. Rıza: Rıza gerektirmeyebilir.",
  },
  {
    abbr: "P",
    title: "Performans Çerezleri",
    description:
      "Kullanım amacı: Site performansının ölçülmesi, hata tespiti, kullanıcı deneyiminin iyileştirilmesi. Hukuki sebep: Açık rıza veya tercih yönetimi. Saklama: Hizmet sağlayıcıya göre değişebilir. Rıza: Rıza gerekebilir.",
  },
  {
    abbr: "A",
    title: "Analitik Çerezleri",
    description:
      "Kullanım amacı: Ziyaretçi trafiği, sayfa kullanımı ve istatistiksel analiz. Hukuki sebep: Açık rıza veya tercih yönetimi. Saklama: Hizmet sağlayıcıya göre değişebilir. Rıza: Rıza gerekebilir.",
  },
  {
    abbr: "İ",
    title: "İşlevsel Çerezler",
    description:
      "Kullanım amacı: Dil, bölge ve kullanıcı tercihlerini hatırlama. Hukuki sebep: Açık rıza veya tercih yönetimi. Saklama: Tercih süresi boyunca. Rıza: Rıza gerekebilir.",
  },
  {
    abbr: "R",
    title: "Reklam ve Pazarlama Çerezleri",
    description:
      "Kullanım amacı: Kampanya, dönüşüm ölçümü, yeniden pazarlama, hedefli reklam. Hukuki sebep: Açık rıza. Saklama: Hizmet sağlayıcıya göre değişebilir. Rıza: Rıza gerekir.",
  },
  {
    abbr: "3",
    title: "Üçüncü Taraf Çerezleri",
    description:
      "Kullanım amacı: Harita, video, sosyal medya, reklam, analitik ve güvenlik hizmetleri. Hukuki sebep: Açık rıza veya ilgili hukuki sebep. Saklama: Sağlayıcıya göre değişebilir. Rıza: Rıza gerekebilir.",
  },
];

const cookiesSections: LegalSection[] = [
  sec("01", "AMAÇ", [
    p(
      'NOVVES ELEKTRİK MOTOR ANONİM ŞİRKETİ (“NOVVES”, “Şirket”, “biz”) olarak, www.novves.com alan adlı web sitemizi ziyaret eden kullanıcıların gizliliğine ve kişisel verilerinin korunmasına önem veriyoruz.',
    ),
    p(
      "Bu Çerez Politikası, web sitemizde kullanılan çerezler ve benzeri teknolojiler hakkında ziyaretçileri bilgilendirmek amacıyla hazırlanmıştır. Bu politika; hangi tür çerezlerin kullanılabileceğini, bu çerezlerin hangi amaçlarla işlendiğini, çerezler aracılığıyla hangi verilerin toplanabileceğini, çerez tercihlerinizi nasıl yönetebileceğinizi ve kişisel verilerinizle ilgili haklarınızı açıklamaktadır.",
    ),
    p(
      "Bu politika; 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”), ilgili ikincil düzenlemeler, Kişisel Verileri Koruma Kurumu’nun çerez uygulamalarına ilişkin rehberleri, Avrupa Birliği Genel Veri Koruma Tüzüğü (“GDPR”) ve uygulanabilir diğer veri koruma düzenlemeleri dikkate alınarak hazırlanmıştır.",
    ),
    p(
      "Bu metin, çerez kullanımına ilişkin bilgilendirme metnidir. Açık rıza gerektiren çerezler için, gerekli hallerde ayrıca çerez tercih paneli veya açık rıza mekanizması sunulur.",
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
  sec("03", "ÇEREZ NEDİR?", [
    p(
      "Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız veya cihazınız üzerine kaydedilen küçük metin dosyalarıdır. Çerezler; web sitesinin çalışmasını sağlamak, kullanıcı tercihlerini hatırlamak, site performansını ölçmek, güvenliği artırmak ve bazı durumlarda pazarlama veya analitik faaliyetleri yürütmek amacıyla kullanılabilir.",
    ),
    p(
      "Çerezler dışında; piksel, etiket, yerel depolama, oturum depolama, SDK, log kayıtları ve benzeri dijital takip teknolojileri de kullanılabilir. Bu politika kapsamında “çerez” ifadesi, uygun olduğu ölçüde bu benzeri teknolojileri de kapsar.",
    ),
  ]),
  sec("04", "ÇEREZLERİ HANGİ AMAÇLARLA KULLANIYORUZ?", [
    p("NOVVES web sitesinde çerezler aşağıdaki amaçlarla kullanılabilir:"),
    ul([
      "Web sitesinin güvenli ve düzgün şekilde çalışmasını sağlamak",
      "Sayfa geçişlerini, oturumları ve temel site fonksiyonlarını yönetmek",
      "Web sitesi performansını ölçmek ve iyileştirmek",
      "Teknik hataları, erişim sorunlarını ve güvenlik risklerini tespit etmek",
      "Kullanıcı tercihlerini hatırlamak",
      "Dil, bölge veya görüntüleme tercihlerini yönetmek",
      "Web sitesi trafiğini ve ziyaretçi davranışlarını analiz etmek",
      "İçerik, sayfa yapısı ve kullanıcı deneyimini geliştirmek",
      "Spam, bot trafiği, kötüye kullanım ve siber saldırı girişimlerini önlemek",
      "Pazarlama ve reklam faaliyetlerini ölçmek",
      "Kullanıcıların ilgi alanlarına uygun içerik veya kampanya gösterimi yapmak",
      "Hukuki yükümlülükleri yerine getirmek",
      "NOVVES’in meşru ticari, teknik ve operasyonel güvenliğini sağlamak",
    ]),
  ]),
  sec("05", "KULLANILAN ÇEREZ KATEGORİLERİ", [
    p(
      "Web sitemizde kullanılan veya kullanılabilecek çerezler genel olarak aşağıdaki kategorilere ayrılır.",
    ),
  ]),
  sec("5.1", "Zorunlu Çerezler", [
    p(
      "Zorunlu çerezler, web sitesinin çalışması için gerekli olan çerezlerdir. Bu çerezler olmadan web sitesinin temel fonksiyonları düzgün çalışmayabilir.",
    ),
    p("Bu çerezler genellikle aşağıdaki amaçlarla kullanılır:"),
    ul([
      "Sayfa güvenliğini sağlamak",
      "Oturum bütünlüğünü korumak",
      "Çerez tercihlerinizi hatırlamak",
      "Formların güvenli şekilde çalışmasını sağlamak",
      "Güvenlik doğrulamalarını yapmak",
      "Sunucu yük dengelemesi ve teknik erişim yönetimi sağlamak",
    ]),
    p(
      "Zorunlu çerezler için ayrıca açık rıza alınması gerekmeyebilir. Bu çerezler, web sitesinin çalışması ve bilgi güvenliği için gereklidir.",
    ),
  ]),
  sec("5.2", "Performans ve Analitik Çerezleri", [
    p(
      "Performans ve analitik çerezleri, ziyaretçilerin web sitesini nasıl kullandığını anlamak, sayfa performansını ölçmek ve web sitesini iyileştirmek amacıyla kullanılabilir.",
    ),
    p("Bu çerezler aracılığıyla aşağıdaki bilgiler işlenebilir:"),
    ul([
      "Ziyaret edilen sayfalar",
      "Sayfada geçirilen süre",
      "Tıklama ve gezinme davranışları",
      "Trafik kaynakları",
      "Hata kayıtları",
      "Cihaz ve tarayıcı bilgileri",
      "Yaklaşık coğrafi konum bilgisi",
      "Site performans ölçümleri",
    ]),
    p(
      "Bu çerezler, gerekli olduğu hallerde açık rızanıza veya çerez tercihlerinize bağlı olarak kullanılabilir.",
    ),
  ]),
  sec("5.3", "İşlevsel Çerezler", [
    p(
      "İşlevsel çerezler, web sitesinde yaptığınız tercihlerin hatırlanması ve daha kişiselleştirilmiş bir deneyim sunulması amacıyla kullanılabilir.",
    ),
    p("Bu çerezler aşağıdaki amaçlarla kullanılabilir:"),
    ul([
      "Dil tercihinin hatırlanması",
      "Bölge veya ülke tercihinin hatırlanması",
      "Görüntüleme tercihlerinin saklanması",
      "Daha önce seçilen çerez tercihlerini hatırlamak",
      "Kullanıcı deneyimini kolaylaştırmak",
    ]),
    p(
      "İşlevsel çerezler, gerekli olduğu hallerde açık rızanıza veya çerez tercihlerinize bağlı olarak kullanılabilir.",
    ),
  ]),
  sec("5.4", "Reklam ve Pazarlama Çerezleri", [
    p(
      "Reklam ve pazarlama çerezleri, NOVVES ürünleri, çözümleri, katalogları, kampanyaları, fuar katılımları, kurumsal duyuruları veya dijital reklam faaliyetleri kapsamında kullanılabilir.",
    ),
    p("Bu çerezler aşağıdaki amaçlarla kullanılabilir:"),
    ul([
      "Reklam performansını ölçmek",
      "Kampanya etkinliğini analiz etmek",
      "Yeniden pazarlama faaliyetleri yürütmek",
      "İlgi alanlarına göre içerik veya reklam göstermek",
      "Sosyal medya ve reklam platformları üzerinden dönüşüm ölçümü yapmak",
      "Pazarlama faaliyetlerini optimize etmek",
    ]),
    p(
      "Bu tür çerezler, açık rızanız veya çerez tercihlerinize bağlı olarak kullanılır. Rızanızı vermediğiniz takdirde, bu çerezler devreye alınmaz veya devre dışı bırakılır.",
    ),
  ]),
  sec("5.5", "Üçüncü Taraf Çerezleri", [
    p(
      "Web sitemizde; analitik, performans, harita, video, sosyal medya, güvenlik, reklam veya benzeri hizmetler için üçüncü taraf hizmet sağlayıcıların çerezleri kullanılabilir.",
    ),
    p("Üçüncü taraf çerezleri aşağıdaki sağlayıcılar tarafından kullanılabilir:"),
    ul([
      "Web analitik sağlayıcıları",
      "Reklam ve pazarlama platformları",
      "Sosyal medya platformları",
      "Harita ve lokasyon hizmetleri",
      "Video içerik sağlayıcıları",
      "Güvenlik ve spam önleme servisleri",
      "Hosting, CDN ve teknik altyapı sağlayıcıları",
    ]),
    p(
      "Üçüncü taraf çerezlerinin kullanımı, ilgili sağlayıcının kendi gizlilik politikalarına ve çerez uygulamalarına tabi olabilir. NOVVES, üçüncü taraf hizmet sağlayıcıları seçerken makul özeni gösterir; ancak üçüncü taraf platformların kendi veri işleme uygulamalarından doğrudan sorumlu değildir.",
    ),
  ]),
  sec("06", "ÇEREZLER ARACILIĞIYLA İŞLENEBİLECEK VERİLER", [
    p("Çerezler ve benzeri teknolojiler aracılığıyla aşağıdaki veriler işlenebilir:"),
    ul([
      "IP adresi",
      "Cihaz bilgisi",
      "Tarayıcı türü ve sürümü",
      "İşletim sistemi bilgisi",
      "Dil ve bölge tercihleri",
      "Ziyaret tarihi ve saati",
      "Ziyaret edilen sayfalar",
      "Sayfada geçirilen süre",
      "Tıklama ve gezinme bilgileri",
      "Trafik kaynağı",
      "Oturum bilgileri",
      "Çerez tercihleri",
      "Yaklaşık konum bilgisi",
      "Hata ve performans kayıtları",
      "Reklam ve kampanya etkileşim bilgileri",
      "Form gönderimlerine ilişkin teknik kayıtlar",
    ]),
  ]),
  sec("07", "ÇEREZ KULLANIMININ HUKUKİ SEBEPLERİ", [
    p(
      "Çerezler aracılığıyla işlenen kişisel veriler, KVKK’nın 5. maddesinde belirtilen aşağıdaki hukuki sebeplere dayanılarak işlenebilir:",
    ),
    ul([
      "Bir hakkın tesisi, kullanılması veya korunması için veri işlemenin zorunlu olması",
      "Şirketimizin hukuki yükümlülüğünü yerine getirebilmesi için veri işlemenin zorunlu olması",
      "Temel hak ve özgürlüklerinize zarar vermemek kaydıyla, Şirketimizin meşru menfaatleri için veri işlemenin zorunlu olması",
      "Açık rızanızın bulunması",
    ]),
    p(
      "Zorunlu çerezler; web sitesinin çalışması, güvenliği ve teknik sürekliliği için kullanıldığından meşru menfaat veya hukuki yükümlülük kapsamında değerlendirilebilir.",
    ),
    p(
      "Analitik, performans, işlevsel, reklam ve pazarlama çerezleri ise gerekli olduğu hallerde açık rızanıza veya çerez tercihlerinize bağlı olarak kullanılabilir.",
    ),
  ]),
  sec("08", "ÇEREZLERİN SAKLAMA SÜRESİ", [
    p(
      "Çerezlerin saklama süresi, çerezin türüne, kullanım amacına ve teknik niteliğine göre değişebilir.",
    ),
    p("Çerezler genel olarak aşağıdaki şekilde sınıflandırılabilir:"),
    p(
      "Oturum Çerezleri: Oturum çerezleri, tarayıcı oturumu süresince geçerli olan ve tarayıcınızı kapattığınızda silinen çerezlerdir.",
    ),
    p(
      "Kalıcı Çerezler: Kalıcı çerezler, belirli bir süre boyunca cihazınızda saklanabilir. Bu süre, çerezin amacına göre değişiklik gösterebilir.",
    ),
    p(
      "Birinci Taraf Çerezleri: Birinci taraf çerezleri, doğrudan NOVVES web sitesi tarafından yerleştirilen çerezlerdir.",
    ),
    p(
      "Üçüncü Taraf Çerezleri: Üçüncü taraf çerezleri, NOVVES web sitesinde kullanılan üçüncü taraf hizmet sağlayıcılar tarafından yerleştirilen çerezlerdir.",
    ),
    p(
      "Çerezlerin saklama süreleri, web sitesinde kullanılan teknik altyapıya ve hizmet sağlayıcılara göre değişebilir. NOVVES, gereksiz çerez kullanımından kaçınmayı ve çerezleri kullanım amacıyla sınırlı süre boyunca saklamayı hedefler.",
    ),
  ]),
  sec("09", "ÇEREZ TERCİHLERİNİZİ NASIL YÖNETEBİLİRSİNİZ?", [
    p("Çerez tercihlerinizi aşağıdaki yöntemlerle yönetebilirsiniz:"),
  ]),
  sec("9.1", "Web Sitesi Çerez Tercih Paneli", [
    p(
      "Web sitemizde sunulan çerez tercih paneli üzerinden zorunlu olmayan çerezleri kabul edebilir, reddedebilir veya tercihlerinizi kategori bazında değiştirebilirsiniz.",
    ),
    p(
      "Zorunlu çerezler, web sitesinin çalışması için gerekli olduğundan devre dışı bırakılamayabilir.",
    ),
  ]),
  sec("9.2", "Tarayıcı Ayarları", [
    p(
      "Tarayıcı ayarlarınız üzerinden çerezleri silebilir, engelleyebilir veya belirli sitelere özel çerez izinleri tanımlayabilirsiniz.",
    ),
    p(
      "Çerezleri tamamen devre dışı bırakmanız halinde, web sitesinin bazı özellikleri düzgün çalışmayabilir.",
    ),
  ]),
  sec("9.3", "Rızayı Geri Çekme", [
    p(
      "Açık rızanıza dayalı olarak kullanılan çerezler bakımından, verdiğiniz rızayı dilediğiniz zaman geri çekebilirsiniz.",
    ),
    p(
      "Rızanızı geri çekmeniz, geri çekme tarihinden önce rızaya dayanılarak gerçekleştirilen işlemlerin hukuka uygunluğunu etkilemez.",
    ),
  ]),
  sec("10", "ÖRNEK ÇEREZ KATEGORİLERİ TABLOSU", [
    p(
      "Aşağıdaki tablo, web sitemizde kullanılabilecek çerez kategorilerine ilişkin genel bilgilendirme amacı taşır. Kullanılan gerçek çerez isimleri, sağlayıcılar ve saklama süreleri web sitesinin teknik altyapısına göre değişebilir.",
    ),
    defs(cookieCategoryTable),
    p(
      "NOVVES, web sitesinde kullanılan çerezleri ve üçüncü taraf hizmet sağlayıcıları zaman zaman güncelleyebilir. Güncel çerez bilgileri, çerez tercih paneli veya bu politika üzerinden yayımlanabilir.",
    ),
  ]),
  sec("11", "ÜÇÜNCÜ TARAF HİZMETLER", [
    p("Web sitemizde aşağıdaki türde üçüncü taraf hizmetler kullanılabilir:"),
    ul([
      "Analitik ve performans ölçüm araçları",
      "Reklam ve dönüşüm takip araçları",
      "Sosyal medya bağlantıları veya eklentileri",
      "Harita ve lokasyon hizmetleri",
      "Video görüntüleme servisleri",
      "Spam önleme ve güvenlik servisleri",
      "CDN, hosting ve altyapı hizmetleri",
    ]),
    p(
      "Bu hizmetler kapsamında bazı veriler yurt içinde veya yurt dışında bulunan hizmet sağlayıcılarla paylaşılabilir. Üçüncü taraf hizmetlerin çerez uygulamaları ve veri işleme süreçleri, ilgili sağlayıcının kendi gizlilik politikalarına tabi olabilir.",
    ),
  ]),
  sec("12", "YURT DIŞINA VERİ AKTARIMI", [
    p(
      "Çerezler ve benzeri teknolojiler kapsamında kullanılan bazı analitik, reklam, güvenlik, bulut, CDN, video, harita veya sosyal medya hizmet sağlayıcıları yurt dışında yerleşik olabilir.",
    ),
    p(
      "Bu durumda kişisel verileriniz, KVKK, GDPR ve uygulanabilir diğer veri koruma mevzuatlarında öngörülen şartlara uygun olarak yurt dışına aktarılabilir. Gerekli hallerde açık rıza, standart sözleşme hükümleri, yeterlilik kararları, taahhütnameler veya ilgili mevzuatta öngörülen diğer güvence mekanizmaları uygulanır.",
    ),
  ]),
  sec("13", "ÇEREZLER VE KİŞİSEL VERİLERİN KORUNMASI", [
    p(
      "Çerezler aracılığıyla elde edilen veriler, kişisel veri niteliği taşıdığı ölçüde NOVVES’in “Kişisel Verilerin Korunması ve Gizlilik Politikası” ile “Web Sitesi Ziyaretçi Aydınlatma Metni” kapsamında işlenir.",
    ),
    p(
      "Kişisel verilerinizin işlenmesine ilişkin daha detaylı bilgi almak için ilgili metinleri inceleyebilirsiniz.",
    ),
  ]),
  sec("14", "İLGİLİ KİŞİNİN HAKLARI", [
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
  sec("15", "HAKLARINIZI NASIL KULLANABİLİRSİNİZ?", [
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
  sec("16", "AÇIK RIZA VE AYDINLATMA AYRIMI", [
    p(
      "Bu Çerez Politikası, çerez kullanımı hakkında bilgilendirme amacı taşır. Açık rıza gerektiren çerezler için, kullanıcıdan ayrıca ve özgür iradeye dayalı açık rıza alınır.",
    ),
    p(
      "Çerez tercih panelinde sunulan seçenekler, açık rıza gerektiren çerezler bakımından ayrı ayrı yönetilebilir. Kullanıcılar, zorunlu olmayan çerezleri kabul edebilir, reddedebilir veya daha sonra tercihlerini değiştirebilir.",
    ),
    p(
      "Aydınlatma yapılması, tek başına açık rıza verildiği anlamına gelmez. Açık rıza gerektiren çerezler, kullanıcı tarafından olumlu bir tercih yapılmadıkça devreye alınmaz.",
    ),
  ]),
  sec("17", "ÇEREZ TERCİH PANELİ İÇİN ÖNERİLEN SEÇENEKLER", [
    p(
      "Web sitemizde çerez tercih paneli kullanılması halinde aşağıdaki seçenekler sunulabilir:",
    ),
    ul([
      "Tüm Çerezleri Kabul Et",
      "Zorunlu Olmayan Çerezleri Reddet",
      "Çerez Tercihlerimi Yönet",
      "Tercihlerimi Kaydet",
    ]),
    p(
      "Çerez tercih panelinde kategoriler açık, anlaşılır ve ayrı ayrı seçilebilir şekilde sunulmalıdır. Önceden işaretlenmiş kutular kullanılmamalı ve kullanıcıların rızayı geri çekmesi, rıza vermesi kadar kolay olmalıdır.",
    ),
  ]),
  sec("18", "ÇEREZ POLİTİKASININ GÜNCELLENMESİ", [
    p(
      "NOVVES, bu Çerez Politikası’nı mevzuat değişiklikleri, web sitesi altyapı güncellemeleri, kullanılan çerezlerin değişmesi, üçüncü taraf hizmet sağlayıcı değişiklikleri veya dijital süreçlerdeki güncellemeler doğrultusunda zaman zaman değiştirebilir.",
    ),
    p("Güncel Çerez Politikası, www.novves.com üzerinde yayımlandığı tarihte yürürlüğe girer."),
  ]),
  sec("19", "İLETİŞİM", [
    p(
      "Çerez kullanımı, çerez tercihleri ve kişisel verilerin korunması süreçleriyle ilgili bizimle iletişime geçebilirsiniz.",
    ),
    p("NOVVES ELEKTRİK MOTOR ANONİM ŞİRKETİ"),
    p("Adres: Taşköprü Merkez Mah. Çaydere Sok. No:9/1 İç Kapı No:2 Çiftlikköy / YALOVA"),
    p("Telefon: 0216 467 47 52"),
    p("E-posta: info@novves.com"),
    p("KEP: novveselektrik@hs01.kep.tr"),
    p("Web: www.novves.com"),
    p(
      "NOVVES, dijital ziyaretçi deneyimini geliştirirken kişisel verilerin korunmasını, şeffaflığı ve kullanıcı tercihlerini kurumsal güvenin ayrılmaz bir parçası olarak görür.",
    ),
  ]),
];

export const cookiesDocumentTr: LegalDocument = {
  id: "cookies",
  path: "cookies",
  title: "Çerez",
  titleHighlight: "Politikası",
  badge: "TEKNİK TAKİP",
  lastUpdated: "Yürürlük tarihi: 28.05.2026",
  storageCode: "POL-LEG-2026-04",
  classification: "Çerez Politikası",
  contactEmail: "info@novves.com",
  intro: [
    "Kapsam: Web Ziyaretçileri (Teknik Takip)",
    "Yürürlük Tarihi: 28.05.2026",
    "Doküman Tipi: Çerez Politikası",
    "Kapsam: Web Sitesi Ziyaretçileri, Teknik Takip, Çerezler ve Benzeri Teknolojiler",
    "Web Sitesi: www.novves.com",
    "Veri Sorumlusu: NOVVES ELEKTRİK MOTOR ANONİM ŞİRKETİ",
  ],
  sections: cookiesSections,
};
