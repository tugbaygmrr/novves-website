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

const productSafetySections: LegalSection[] = [
  sec("01", "AMAÇ", [
    p(
      'NOVVES ELEKTRİK MOTOR ANONİM ŞİRKETİ (“NOVVES”, “Şirket”, “biz”) olarak; ürünlerimizin güvenli, doğru, standartlara uygun ve proje şartlarına göre değerlendirilmiş şekilde kullanılmasını önemseriz.',
    ),
    p(
      "Bu Ürün Güvenliği ve Teknik Destek Temas Noktası; NOVVES ürünleriyle ilgili ürün güvenliği bildirimlerinin, teknik destek taleplerinin, uygunsuzluk bildirimlerinin, sertifika ve dokümantasyon taleplerinin, servis ve garanti başvurularının doğru kanallar üzerinden alınması, değerlendirilmesi ve ilgili birimlere yönlendirilmesi amacıyla oluşturulmuştur.",
    ),
    p(
      "Bu sayfa; müşteriler, potansiyel müşteriler, bayiler, temsilciler, distribütörler, mekanik tesisat firmaları, proje müellifleri, danışmanlar, yükleniciler, son kullanıcılar, bakım ekipleri, yetkili servisler ve kamu kurumları için bir temas noktası niteliğindedir.",
    ),
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
    p(
      "KEP adresi; resmi bildirimler, hukuki başvurular ve güvenli elektronik tebligat süreçleri için kullanılabilecek resmi iletişim kanalıdır. Teknik destek, ürün güvenliği ve dokümantasyon talepleri için info@novves.com adresi üzerinden de NOVVES ile iletişime geçebilirsiniz.",
    ),
  ]),
  sec("03", "KAPSAM", [
    p("Bu temas noktası aşağıdaki ürün ve süreçlerle ilgili bildirimleri kapsayabilir:"),
    ul([
      "Aksiyal fanlar",
      "Duman ve ısı tahliye fanları",
      "Jet fanlar",
      "Çatı fanları",
      "Duvar tipi fanlar",
      "Hücreli fanlar",
      "Endüstriyel fanlar",
      "Elektrik motorları",
      "Kontrol panelleri ve otomasyon çözümleri",
      "Damperler ve havalandırma ekipmanları",
      "Yedek parçalar ve aksesuarlar",
      "Ürün sertifikaları, test raporları ve teknik dokümanlar",
      "Garanti, servis, bakım ve satış sonrası destek süreçleri",
      "Ürün güvenliği, teknik uygunsuzluk ve sahada karşılaşılan risk bildirimleri",
    ]),
    p(
      "Bu temas noktası, NOVVES ürünlerinin güvenli kullanımı ve teknik değerlendirilmesi için oluşturulmuştur. Acil can güvenliği, yangın, elektrik çarpması, ciddi yaralanma veya benzeri tehlikeli durumlarda öncelikle ilgili acil durum ekipleri, tesis güvenlik ekipleri, itfaiye, iş sağlığı ve güvenliği birimleri veya yetkili kamu kurumlarıyla iletişime geçilmelidir.",
    ),
  ]),
  sec("04", "HANGİ DURUMLARDA BİLDİRİM YAPILMALIDIR?", [
    p("NOVVES ürünleriyle ilgili aşağıdaki durumlarda bizimle iletişime geçebilirsiniz:"),
    ul([
      "Ürünün güvenli çalışmasını etkileyebilecek riskli bir durum tespit edilmesi",
      "Elektriksel, mekanik, termal veya yapısal bir uygunsuzluk görülmesi",
      "Anormal ses, titreşim, sıcaklık, koku, duman, sürtme veya çalışma düzensizliği yaşanması",
      "Motor, fan, pervane, gövde, yatak, bağlantı elemanı veya kontrol sistemiyle ilgili güvenlik şüphesi oluşması",
      "Ürün etiketinde, model bilgisinde, seri numarasında veya teknik dokümanda hata şüphesi bulunması",
      "Sertifika, uygunluk beyanı, performans dokümanı veya teknik veri konusunda doğrulama ihtiyacı olması",
      "Ürünün proje şartlarına, kullanım ortamına veya uygulama amacına uygunluğu konusunda teknik değerlendirme ihtiyacı oluşması",
      "Montaj, devreye alma, bakım veya servis sırasında güvenliği etkileyebilecek bir sorunla karşılaşılması",
      "Garanti, servis, yedek parça veya bakım desteği talep edilmesi",
      "Ürünün sahada güvenli kullanımıyla ilgili geri bildirim, öneri veya şikâyet iletilmek istenmesi",
    ]),
  ]),
  sec("05", "BİLDİRİM İÇİN GEREKLİ BİLGİLER", [
    p(
      "Ürün güvenliği veya teknik destek bildiriminizin hızlı ve doğru değerlendirilebilmesi için mümkünse aşağıdaki bilgileri paylaşmanız önerilir:",
    ),
    ul([
      "Ad ve soyad",
      "Şirket adı",
      "Görev / unvan",
      "Telefon numarası",
      "E-posta adresi",
      "Ülke / şehir",
      "Proje adı",
      "Ürün modeli",
      "Ürün seri numarası",
      "Sipariş veya teklif numarası",
      "Ürün fotoğrafları",
      "Etiket fotoğrafı",
      "Montaj yeri ve kullanım alanı",
      "Ürünün çalışma koşulları",
      "Arıza, risk veya uygunsuzluk açıklaması",
      "Olayın tarihi ve saati",
      "Varsa bakım, servis veya devreye alma kayıtları",
      "Varsa video, rapor, ölçüm sonucu veya teknik doküman",
      "Aciliyet durumu",
      "Talep edilen destek türü",
    ]),
    p(
      "Eksik bilgi bulunması halinde NOVVES, bildirimi değerlendirebilmek için ek bilgi veya belge talep edebilir.",
    ),
  ]),
  sec("06", "BİLDİRİM KANALLARI", [
    p(
      "Ürün güvenliği, teknik destek ve dokümantasyon taleplerinizi aşağıdaki kanallardan iletebilirsiniz:",
    ),
    p("E-posta: info@novves.com"),
    p("Telefon: 0216 467 47 52"),
    p("KEP: novveselektrik@hs01.kep.tr"),
    p("Posta Adresi: Taşköprü Merkez Mah. Çaydere Sok. No:9/1 İç Kapı No:2 Çiftlikköy / YALOVA"),
    p("Web Sitesi: www.novves.com"),
    p(
      "Web sitesinde ürün güvenliği veya teknik destek formu bulunması halinde, taleplerinizi ilgili form üzerinden de iletebilirsiniz.",
    ),
    p(
      "Resmi bildirim, hukuki başvuru veya yetkili kurum yazışmaları için KEP adresinin kullanılması önerilir.",
    ),
  ]),
  sec("07", "BİLDİRİMLERİN DEĞERLENDİRİLMESİ", [
    p(
      "NOVVES’e iletilen ürün güvenliği ve teknik destek bildirimleri, bildirimin niteliğine göre ilgili birimler tarafından değerlendirilir.",
    ),
    p("Değerlendirme süreci aşağıdaki adımları içerebilir:"),
    ul([
      "Bildirimin alınması",
      "Bildirim konusunun sınıflandırılması",
      "Ürün modeli, seri numarası ve teknik bilgilerin incelenmesi",
      "Fotoğraf, video, servis kaydı veya ölçüm sonuçlarının değerlendirilmesi",
      "Gerekirse ek bilgi veya belge talep edilmesi",
      "Teknik ekip, kalite birimi, üretim, mühendislik veya satış sonrası destek birimleriyle inceleme yapılması",
      "Gerekirse saha incelemesi, uzaktan teknik görüşme veya servis yönlendirmesi yapılması",
      "Teknik değerlendirme sonucunun ilgili kişiye bildirilmesi",
      "Gerekli hallerde düzeltici veya önleyici faaliyetlerin başlatılması",
      "Uygulanabilir mevzuat kapsamında gerekli resmi bildirimlerin değerlendirilmesi",
    ]),
    p(
      "NOVVES, her bildirimi kendi koşulları içinde değerlendirir. Bildirim yapılması, tek başına ürün kusurunun kabul edildiği, garanti kapsamında işlem yapılacağı veya hukuki sorumluluk üstlenildiği anlamına gelmez.",
    ),
  ]),
  sec("08", "ACİL ÜRÜN GÜVENLİĞİ BİLDİRİMLERİ", [
    p(
      "Ürünle ilgili ciddi can güvenliği riski, yangın riski, elektriksel tehlike, mekanik kopma riski, duman tahliye sistemi güvenliği, iş sağlığı ve güvenliği riski veya benzeri acil durumlarda bildirim konusu açıkça “Acil Ürün Güvenliği Bildirimi” olarak belirtilmelidir.",
    ),
    p("Acil durumlarda aşağıdaki bilgiler özellikle paylaşılmalıdır:"),
    ul([
      "Riskin türü",
      "Ürünün kullanımda olup olmadığı",
      "Ürünün bulunduğu lokasyon",
      "Olayın gerçekleşip gerçekleşmediği",
      "Yaralanma, yangın, duman, elektriksel arıza veya maddi hasar olup olmadığı",
      "Ürünün durdurulup durdurulmadığı",
      "Tesis yetkililerinin veya acil durum ekiplerinin bilgilendirilip bilgilendirilmediği",
    ]),
    p(
      "Can güvenliği veya acil müdahale gerektiren durumlarda, NOVVES’e bildirim yapılmadan önce veya eş zamanlı olarak ilgili acil durum ekipleri ve yetkili kurumlarla iletişime geçilmelidir.",
    ),
  ]),
  sec("09", "TEKNİK DOKÜMAN VE SERTİFİKA TALEPLERİ", [
    p("NOVVES ürünleriyle ilgili aşağıdaki dokümanlar talep edilebilir:"),
    ul([
      "Teknik katalog",
      "Ürün veri sayfası",
      "Kullanım ve bakım talimatı",
      "Montaj talimatı",
      "Devreye alma bilgileri",
      "Uygunluk beyanı",
      "Performans beyanı",
      "Sertifika bilgileri",
      "Test raporu bilgileri",
      "Ürün etiketi doğrulama bilgileri",
      "Proje veya ürün özelinde teknik açıklama",
    ]),
    p(
      "Doküman talepleri, ilgili ürün modeli, seri numarası, proje adı ve kullanım amacı belirtilerek iletilmelidir.",
    ),
    p(
      "Sertifika, test raporu ve uygunluk belgeleri; yalnızca ilgili ürün, model, seri, üretim dönemi, uygulama alanı ve sertifika kapsamı bakımından değerlendirilmelidir. Her ürünün her proje, ülke veya kullanım koşulu için otomatik olarak uygun olduğu varsayılmamalıdır.",
    ),
  ]),
  sec("10", "STANDARTLAR VE TEKNİK UYGUNLUK", [
    p(
      "NOVVES ürünleri; ürün tipine, kullanım amacına, proje gerekliliklerine ve hedef pazara göre farklı teknik standartlar, mevzuatlar, sertifikasyon süreçleri ve uygunluk değerlendirmelerine tabi olabilir.",
    ),
    p(
      "Duman ve ısı tahliye fanları, aksiyal fanlar, jet fanlar, motorlar, otomasyon panelleri, havalandırma ekipmanları ve ilgili ürünler bakımından proje özelinde aşağıdaki konular ayrıca değerlendirilmelidir:",
    ),
    ul([
      "Ürün modeli",
      "Kullanım amacı",
      "Ortam koşulları",
      "Sıcaklık dayanımı",
      "Debi ve basınç ihtiyacı",
      "Elektriksel özellikler",
      "Yangın güvenliği gereksinimleri",
      "Sertifika kapsamı",
      "Montaj şekli",
      "Bakım erişimi",
      "Yerel mevzuat",
      "Proje şartnamesi",
      "Yetkili kurum veya danışman onayları",
    ]),
    p(
      "Web sitesinde, kataloglarda veya teknik dokümanlarda yer alan standart atıfları genel bilgilendirme niteliğindedir. Kesin teknik uygunluk için NOVVES’in yazılı teknik değerlendirmesi ve proje özelindeki şartlar dikkate alınmalıdır.",
    ),
  ]),
  sec("11", "MÜŞTERİ VE KULLANICI SORUMLULUKLARI", [
    p(
      "Ürün güvenliğinin sağlanabilmesi için müşteriler, uygulayıcılar, montaj ekipleri, bakım ekipleri ve son kullanıcılar aşağıdaki hususlara dikkat etmelidir:",
    ),
    ul([
      "Ürünü yalnızca kullanım amacına uygun şekilde kullanmak",
      "Montajı yetkili ve teknik yeterliliğe sahip kişilerce yaptırmak",
      "Elektrik bağlantılarını ilgili standartlara ve talimatlara uygun şekilde yapmak",
      "Ürünü katalog ve kullanım talimatlarında belirtilen sınırlar içinde çalıştırmak",
      "Bakım ve temizlik işlemlerini düzenli yapmak",
      "Üründe izinsiz değişiklik, müdahale veya modifikasyon yapmamak",
      "Orijinal olmayan veya uygunluğu doğrulanmamış parçalar kullanmamak",
      "Ürün etiketi, seri numarası ve teknik dokümanları muhafaza etmek",
      "Anormal çalışma, ses, titreşim, ısınma veya güvenlik riski görüldüğünde ürünü güvenli şekilde durdurmak",
      "Ürün güvenliğini etkileyebilecek durumları gecikmeden NOVVES’e bildirmek",
      "Yerel mevzuat, iş sağlığı ve güvenliği kuralları ve proje şartnamelerine uygun hareket etmek",
    ]),
    p(
      "Ürünün hatalı montajı, yanlış kullanımı, izinsiz müdahalesi, uygunsuz çalışma koşulları veya bakım eksikliği ürün güvenliğini etkileyebilir.",
    ),
  ]),
  sec("12", "GARANTİ, SERVİS VE SATIŞ SONRASI DESTEK", [
    p(
      "Ürün güvenliği bildirimleri, garanti veya servis talepleriyle bağlantılı olabilir. Ancak ürün güvenliği bildirimi yapılması, bildirimin otomatik olarak garanti kapsamında kabul edildiği anlamına gelmez.",
    ),
    p("Garanti ve servis değerlendirmelerinde aşağıdaki unsurlar dikkate alınabilir:"),
    ul([
      "Ürün modeli ve seri numarası",
      "Satış veya teslimat tarihi",
      "Kullanım şartları",
      "Montaj koşulları",
      "Devreye alma bilgileri",
      "Bakım geçmişi",
      "Kullanıcı müdahalesi olup olmadığı",
      "Çalışma ortamı",
      "Ürün üzerinde fiziksel hasar veya modifikasyon bulunup bulunmadığı",
      "İlgili sözleşme, teklif veya garanti şartları",
    ]),
    p(
      "NOVVES, gerekli görmesi halinde ürünü yerinde inceleyebilir, uzaktan teknik değerlendirme yapabilir veya yetkili servis yönlendirmesi gerçekleştirebilir.",
    ),
  ]),
  sec("13", "PİYASA GÖZETİMİ VE YETKİLİ KURUMLARLA İŞ BİRLİĞİ", [
    p(
      "NOVVES, ürün güvenliği ve teknik düzenlemeler kapsamında uygulanabilir mevzuat gereği yetkili kamu kurumları, piyasa gözetimi ve denetimi makamları, sertifikasyon kuruluşları, test laboratuvarları ve ilgili teknik otoritelerle iş birliği yapabilir.",
    ),
    p(
      "Ürün güvenliğini etkileyen ciddi bir riskin tespit edilmesi halinde, NOVVES ilgili mevzuat, sözleşmesel yükümlülükler ve teknik değerlendirme sonuçları doğrultusunda gerekli düzeltici veya önleyici faaliyetleri değerlendirebilir.",
    ),
    p("Bu faaliyetler, durumun niteliğine göre aşağıdakileri içerebilir:"),
    ul([
      "Ek teknik inceleme",
      "Kullanıcı bilgilendirmesi",
      "Servis yönlendirmesi",
      "Teknik doküman güncellemesi",
      "Kullanım talimatı veya bakım uyarısı",
      "Ürün iyileştirme çalışması",
      "Parça değişimi",
      "Sahada kontrol",
      "Gerekli hallerde yetkili kurumlarla iletişim",
    ]),
  ]),
  sec("14", "KİŞİSEL VERİLERİN İŞLENMESİ", [
    p(
      "Ürün güvenliği ve teknik destek bildirimleri kapsamında tarafımıza ilettiğiniz kişisel veriler; bildirimin alınması, değerlendirilmesi, sizinle iletişim kurulması, teknik analiz yapılması, servis sürecinin yürütülmesi, dokümantasyon sağlanması, hukuki yükümlülüklerin yerine getirilmesi ve gerektiğinde yetkili kurumlarla iletişim kurulması amacıyla işlenebilir.",
    ),
    p("Bu kapsamda işlenebilecek kişisel veriler şunlardır:"),
    ul([
      "Ad ve soyad",
      "Şirket adı",
      "Görev / unvan",
      "Telefon numarası",
      "E-posta adresi",
      "Adres veya lokasyon bilgisi",
      "Talep ve bildirim içeriği",
      "Ürün ve proje bilgileri",
      "Teknik destek ve servis kayıtları",
      "Fotoğraf, video, rapor ve ek belgeler",
    ]),
    p(
      "Kişisel verilerin işlenmesine ilişkin detaylı bilgi için NOVVES’in “Kişisel Verilerin Korunması ve Gizlilik Politikası”, “Müşteri Aydınlatma Metni” ve ilgili diğer aydınlatma metinleri incelenmelidir.",
    ),
  ]),
  sec("15", "GİZLİLİK VE TEKNİK BİLGİLERİN KORUNMASI", [
    p(
      "NOVVES’e iletilen proje bilgileri, teknik dokümanlar, ürün fotoğrafları, uygulama detayları, saha raporları ve benzeri bilgiler, bildirimin değerlendirilmesi amacıyla kullanılır.",
    ),
    p(
      "NOVVES, bu bilgileri işin gerektirdiği ölçüde ilgili iç birimleri, teknik ekipleri, servis paydaşları, tedarikçileri, test ve sertifikasyon kuruluşları veya yetkili kurumlarla paylaşabilir.",
    ),
    p(
      "Ticari sır, proje bilgisi, teknik çizim veya gizli bilgi niteliğindeki belgelerin paylaşılması halinde, kullanıcı gerekli yetkilere sahip olduğunu ve paylaşılan bilgilerin NOVVES tarafından bildirim değerlendirme amacıyla kullanılabileceğini kabul eder.",
    ),
  ]),
  sec("16", "DİL VE İLETİŞİM", [
    p(
      "Ürün güvenliği ve teknik destek talepleri Türkçe veya İngilizce olarak iletilebilir. Uluslararası projelerde, talebin niteliğine göre farklı dillerde destek sağlanması NOVVES’in değerlendirmesine bağlıdır.",
    ),
    p(
      "Teknik değerlendirme, sertifika doğrulama ve resmi yazışmalarda NOVVES’in yazılı yanıtları esas alınır. Sözlü görüşmeler, tek başına bağlayıcı teknik onay veya resmi taahhüt niteliği taşımaz.",
    ),
  ]),
  sec("17", "YANLIŞ VEYA EKSİK BİLDİRİMLER", [
    p(
      "Eksik, yanlış, yanıltıcı veya doğrulanamayan bilgilerle yapılan bildirimler teknik değerlendirme sürecini geciktirebilir veya sağlıklı değerlendirme yapılmasını engelleyebilir.",
    ),
    p(
      "NOVVES, kötü niyetli, yanıltıcı, ticari itibarı zedeleyici, rekabet hukuku veya fikri mülkiyet haklarını ihlal edici bildirimler hakkında hukuki haklarını saklı tutar.",
    ),
  ]),
  sec("18", "SORUMLULUK SINIRLARI", [
    p(
      "Bu temas noktası, NOVVES ürünleriyle ilgili güvenlik, teknik destek, dokümantasyon ve uygunsuzluk bildirimlerinin alınması için oluşturulmuştur.",
    ),
    p(
      "Bu sayfada yer alan bilgiler genel bilgilendirme niteliğindedir. Bu bilgiler; mühendislik hesabı, proje tasarımı, yangın güvenliği danışmanlığı, iş sağlığı ve güvenliği değerlendirmesi, resmi kurum onayı veya teknik şartname onayı yerine geçmez.",
    ),
    p(
      "NOVVES, her bildirimi kendi teknik, ticari, hukuki ve mevzuat koşulları içinde değerlendirir. Bildirim yapılması, NOVVES tarafından kusur, sorumluluk, garanti kapsamı veya tazmin yükümlülüğünün kabul edildiği anlamına gelmez.",
    ),
  ]),
  sec("19", "GÜNCELLEME", [
    p(
      "NOVVES, bu Ürün Güvenliği ve Teknik Destek Temas Noktası metnini mevzuat değişiklikleri, ürün gamı değişiklikleri, teknik süreç güncellemeleri, sertifikasyon gereklilikleri veya operasyonel ihtiyaçlar doğrultusunda zaman zaman güncelleyebilir.",
    ),
    p("Güncel metin, www.novves.com üzerinde yayımlandığı tarihte yürürlüğe girer."),
  ]),
  sec("20", "İLETİŞİM", [
    p(
      "Ürün güvenliği, teknik destek, sertifika doğrulama, dokümantasyon, servis, garanti ve satış sonrası destek talepleriniz için bizimle iletişime geçebilirsiniz.",
    ),
    p("NOVVES ELEKTRİK MOTOR ANONİM ŞİRKETİ"),
    p("Adres: Taşköprü Merkez Mah. Çaydere Sok. No:9/1 İç Kapı No:2 Çiftlikköy / YALOVA"),
    p("Telefon: 0216 467 47 52"),
    p("E-posta: info@novves.com"),
    p("KEP: novveselektrik@hs01.kep.tr"),
    p("Web: www.novves.com"),
    p(
      "NOVVES, ürün güvenliğini; mühendislik disiplini, kalite yaklaşımı, kullanıcı güvenliği ve kurumsal sorumluluğun temel unsurlarından biri olarak görür.",
    ),
  ]),
];

export const productSafetyDocumentTr: LegalDocument = {
  id: "product-safety",
  path: "product-safety",
  title: "Ürün Güvenliği",
  titleHighlight: "Temas Noktası",
  badge: "TEKNİK DESTEK / ÜRÜN",
  lastUpdated: "Yürürlük tarihi: 28.05.2026",
  storageCode: "POL-LEG-2026-06",
  classification: "Ürün Güvenliği Temas Noktası Bilgilendirme Metni",
  contactEmail: "info@novves.com",
  intro: [
    "Kapsam: Teknik Destek / Ürün",
    "Yürürlük Tarihi: 28.05.2026",
    "Doküman Tipi: Ürün Güvenliği Temas Noktası Bilgilendirme Metni",
    "Kapsam: Teknik Destek, Ürün Güvenliği Bildirimleri, Uygunsuzluk Bildirimleri, Sertifika ve Dokümantasyon Talepleri",
    "Web Sitesi: www.novves.com",
    "Şirket: NOVVES ELEKTRİK MOTOR ANONİM ŞİRKETİ",
  ],
  sections: productSafetySections,
};
