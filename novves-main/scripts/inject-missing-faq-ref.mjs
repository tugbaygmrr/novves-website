// 13 dile son 3 FAQ + 4. reference inject eder.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DICT_DIR = path.join(__dirname, "..", "src", "app", "[locale]", "dictionaries");

const en = JSON.parse(fs.readFileSync(path.join(DICT_DIR, "en", "home.json"), "utf8"));
const EN_FAQ_TAIL = en.faq.items.slice(-3);
const EN_REF_LAST = en.referencePreview[3];

// 13 dil için 3 FAQ q+a ve 1 reference title/sector/example
const T = {
  ru: {
    faq: [
      { q: "Делаете ли вы проектно-специфичный подбор вентилятора и проектирование систем?", a: "Да. NOVVES оценивает каждый проект с учётом расхода, давления, термостойкости, сценария использования, условий объекта, потребностей автоматизации и требований стандартов. Подбор вентилятора, компоновка, сценарии управления и вспомогательное оборудование определяются индивидуально для каждого проекта." },
      { q: "Какие решения вы предлагаете для систем дымоудаления и теплоотвода?", a: "NOVVES предоставляет интегрированные решения дымоудаления и теплоотвода: вентиляторы дымоудаления F300/F400, системы струйных вентиляторов, кровельные вентиляторы дымоудаления, настенные вентиляторы, клапаны, шумоглушители и сценарные щиты управления." },
      { q: "Вы предоставляете послепродажную поддержку?", a: "Да. NOVVES поддерживает клиентов после поставки технической документацией, помощью при пусконаладке, запчастями, рекомендациями по обслуживанию и послепродажной инженерной поддержкой — чтобы системы работали безопасно, эффективно и устойчиво на объекте." },
    ],
    ref: { title: "Промышленные объекты", sector: "Промышленные объекты", example: "Производственный комплекс Eczacıbaşı" },
  },
  ar: {
    faq: [
      { q: "هل تقدمون اختيار مروحة وتصميم نظام مخصص للمشروع؟", a: "نعم. تقيّم NOVVES كل مشروع مع التدفق، الضغط، مقاومة الحرارة، سيناريو الاستخدام، ظروف الموقع، احتياجات الأتمتة ومتطلبات المعايير. يتم تحديد اختيار المروحة، التخطيط، سيناريوهات التحكم والمعدات المساعدة على أساس كل مشروع." },
      { q: "ما الحلول التي تقدمونها لأنظمة طرد الدخان والحرارة؟", a: "تقدم NOVVES حلولاً متكاملة لطرد الدخان والحرارة من خلال مراوح طرد الدخان F300/F400، أنظمة المراوح النفاثة، مراوح طرد الدخان السقفية، المراوح الجدارية، الدامبرات، كاتمات الصوت ولوحات التحكم القائمة على السيناريو." },
      { q: "هل تقدمون دعمًا بعد البيع؟", a: "نعم. تدعم NOVVES العملاء بعد التسليم بالوثائق التقنية، دعم التشغيل، قطع الغيار، إرشادات الصيانة والدعم الهندسي بعد البيع — لضمان تشغيل الأنظمة بأمان وكفاءة واستدامة في الموقع." },
    ],
    ref: { title: "المنشآت الصناعية", sector: "المنشآت الصناعية", example: "منشأة إنتاج Eczacıbaşı" },
  },
  de: {
    faq: [
      { q: "Bieten Sie projektspezifische Ventilatorauswahl und Systemplanung an?", a: "Ja. NOVVES bewertet jedes Projekt zusammen mit Volumenstrom, Druck, Temperaturbeständigkeit, Nutzungsszenario, Standortbedingungen, Automatisierungsbedarf und Normanforderungen. Ventilatorauswahl, Layout, Steuerungsszenarien und Hilfsausrüstung werden projektspezifisch bestimmt." },
      { q: "Welche Lösungen bieten Sie für Entrauchungs- und Wärmeabzugsysteme?", a: "NOVVES bietet integrierte Entrauchungs- und Wärmeabzugslösungen mit F300/F400-Entrauchungsventilatoren, Strahlventilatorsystemen, Dach-Entrauchungsventilatoren, Wandventilatoren, Klappen, Schalldämpfern und szenariobasierten Steuerschränken." },
      { q: "Bieten Sie After-Sales-Support an?", a: "Ja. NOVVES unterstützt Kunden nach der Lieferung mit technischer Dokumentation, Inbetriebnahmehilfe, Ersatzteilen, Wartungsanleitung und After-Sales-Engineering — damit Systeme im Feld sicher, effizient und nachhaltig betrieben werden." },
    ],
    ref: { title: "Industrieanlagen", sector: "Industrieanlagen", example: "Eczacıbaşı Produktionsanlage" },
  },
  it: {
    faq: [
      { q: "Fornite selezione di ventilatori e progettazione di sistemi specifici per il progetto?", a: "Sì. NOVVES valuta ogni progetto considerando portata, pressione, resistenza alla temperatura, scenario d'uso, condizioni del sito, esigenze di automazione e requisiti normativi. Selezione del ventilatore, layout, scenari di controllo e apparecchiature ausiliarie sono definiti su base progetto-specifica." },
      { q: "Quali soluzioni offrite per sistemi di evacuazione fumo e calore?", a: "NOVVES fornisce soluzioni integrate di evacuazione fumo e calore con ventilatori di estrazione fumi F300/F400, sistemi a ventilatori jet, ventilatori di estrazione fumi a tetto, ventilatori a parete, serrande, silenziatori e quadri di controllo basati su scenari." },
      { q: "Offrite supporto post-vendita?", a: "Sì. NOVVES supporta i clienti dopo la consegna con documentazione tecnica, assistenza alla messa in servizio, ricambi, guida alla manutenzione e supporto ingegneristico post-vendita — affinché i sistemi operino in modo sicuro, efficiente e sostenibile sul campo." },
    ],
    ref: { title: "Impianti industriali", sector: "Impianti industriali", example: "Stabilimento produttivo Eczacıbaşı" },
  },
  fr: {
    faq: [
      { q: "Proposez-vous une sélection de ventilateurs et une conception système spécifiques au projet ?", a: "Oui. NOVVES évalue chaque projet en tenant compte du débit, de la pression, de la résistance à la température, du scénario d'utilisation, des conditions du site, des besoins d'automatisation et des exigences normatives. La sélection du ventilateur, l'agencement, les scénarios de contrôle et les équipements auxiliaires sont définis projet par projet." },
      { q: "Quelles solutions proposez-vous pour les systèmes de désenfumage et d'évacuation de chaleur ?", a: "NOVVES fournit des solutions intégrées de désenfumage et d'évacuation de chaleur avec des ventilateurs de désenfumage F300/F400, des systèmes de ventilateurs jet, des ventilateurs de désenfumage en toiture, des ventilateurs muraux, des registres, des silencieux et des armoires de contrôle scénarisées." },
      { q: "Proposez-vous un support après-vente ?", a: "Oui. NOVVES soutient ses clients après la livraison avec documentation technique, assistance à la mise en service, pièces détachées, guide d'entretien et support ingénierie après-vente — afin que les systèmes fonctionnent de manière sûre, efficace et durable sur site." },
    ],
    ref: { title: "Installations industrielles", sector: "Installations industrielles", example: "Site de production Eczacıbaşı" },
  },
  es: {
    faq: [
      { q: "¿Ofrecen selección de ventiladores y diseño de sistemas específicos para cada proyecto?", a: "Sí. NOVVES evalúa cada proyecto con caudal, presión, resistencia a la temperatura, escenario de uso, condiciones del sitio, necesidades de automatización y requisitos normativos. La selección del ventilador, el diseño, los escenarios de control y los equipos auxiliares se definen para cada proyecto." },
      { q: "¿Qué soluciones ofrecen para sistemas de extracción de humo y calor?", a: "NOVVES proporciona soluciones integradas de extracción de humo y calor con ventiladores de extracción F300/F400, sistemas de ventiladores jet, extractores de humo en tejado, ventiladores murales, dampers, silenciadores y cuadros de control basados en escenarios." },
      { q: "¿Ofrecen soporte postventa?", a: "Sí. NOVVES apoya a los clientes tras la entrega con documentación técnica, asistencia en puesta en marcha, repuestos, guía de mantenimiento y soporte de ingeniería postventa — para que los sistemas funcionen de forma segura, eficiente y sostenible en el campo." },
    ],
    ref: { title: "Instalaciones industriales", sector: "Instalaciones industriales", example: "Planta de producción Eczacıbaşı" },
  },
  zh: {
    faq: [
      { q: "您是否提供项目特定的风机选型和系统设计？", a: "是。NOVVES 根据流量、压力、耐温性、使用场景、现场条件、自动化需求和标准要求评估每个项目。风机选型、布置、控制场景和辅助设备按项目逐一确定。" },
      { q: "您为烟雾与热量排放系统提供哪些解决方案？", a: "NOVVES 通过 F300/F400 排烟风机、喷射风机系统、屋顶排烟风机、壁式风机、风阀、消声器以及基于场景的控制柜，提供集成的烟雾与热量排放解决方案。" },
      { q: "您提供售后支持吗？", a: "是。NOVVES 在交付后通过技术文件、调试协助、备件、维护指导和售后工程支持来支持客户，确保系统在现场安全、高效、可持续地运行。" },
    ],
    ref: { title: "工业设施", sector: "工业设施", example: "Eczacıbaşı 生产基地" },
  },
  ur: {
    faq: [
      { q: "کیا آپ منصوبے کے لیے مخصوص فین سلیکشن اور سسٹم ڈیزائن فراہم کرتے ہیں؟", a: "ہاں۔ NOVVES ہر منصوبے کا فلو، پریشر، حرارت کی مزاحمت، استعمال کے منظر، سائٹ کی شرائط، آٹومیشن کی ضروریات اور معیار کی ضروریات کے ساتھ جائزہ لیتا ہے۔ فین سلیکشن، لے آؤٹ، کنٹرول کے منظر اور معاون آلات منصوبے کے مطابق متعین کیے جاتے ہیں۔" },
      { q: "آپ دھواں اور حرارت اخراج کے نظام کے لیے کون سے حل پیش کرتے ہیں؟", a: "NOVVES، F300/F400 ریٹڈ دھواں اخراج پنکھے، جیٹ فین سسٹمز، چھت پر نصب دھواں اخراج پنکھے، دیواری پنکھے، ڈیمپرز، سائلنسرز اور منظر بنیادی کنٹرول پینلز کے ساتھ مربوط دھواں اور حرارت اخراج کے حل پیش کرتا ہے۔" },
      { q: "کیا آپ سیلز کے بعد سپورٹ فراہم کرتے ہیں؟", a: "ہاں۔ NOVVES، ڈلیوری کے بعد ٹیکنیکل دستاویزات، کمیشننگ سپورٹ، اسپیئر پارٹس، دیکھ بھال کی رہنمائی اور سیلز کے بعد انجینئرنگ سپورٹ کے ساتھ گاہکوں کی مدد کرتا ہے — تاکہ نظام میدان میں محفوظ، موثر اور پائیدار طریقے سے کام کرے۔" },
    ],
    ref: { title: "صنعتی تنصیبات", sector: "صنعتی تنصیبات", example: "Eczacıbaşı پروڈکشن فیسلٹی" },
  },
  az: {
    faq: [
      { q: "Layihəyə xüsusi fan seçimi və sistem dizaynı edirsiniz?", a: "Bəli. NOVVES hər layihəni debit, təzyiq, temperatur dayanıqlığı, istifadə ssenarisi, sahə şərtləri, avtomatlaşdırma ehtiyacları və standart tələbləri ilə birlikdə qiymətləndirir. Fan seçimi, layout, idarəetmə ssenariləri və köməkçi avadanlıq layihəyə xüsusi müəyyən edilir." },
      { q: "Tüstü və istilik xaric etmə sistemlərində hansı həllər təklif edirsiniz?", a: "NOVVES, F300/F400 dərəcəli tüstü xaric etmə fanları, jet fan sistemləri, dam quraşdırılmış tüstü xaric etmə fanları, divar fanları, damper, səs susturucular və ssenariyaya əsaslanan idarəetmə panelləri ilə inteqrasiya edilmiş tüstü və istilik xaric etmə həlləri təqdim edir." },
      { q: "Satış sonrası dəstək təqdim edirsiniz?", a: "Bəli. NOVVES, çatdırılmadan sonra müştəriləri texniki sənədlər, istismara verilmə dəstəyi, ehtiyat hissələri, baxım yönləndirməsi və satış sonrası mühəndislik dəstəyi ilə dəstəkləyir — sistemlərin sahədə təhlükəsiz, səmərəli və davamlı işləməsi üçün." },
    ],
    ref: { title: "Sənaye obyektləri", sector: "Sənaye obyektləri", example: "Eczacıbaşı İstehsalat Müəssisəsi" },
  },
  kk: {
    faq: [
      { q: "Жобаға арнайы желдеткіш таңдау және жүйе жобалау жасайсыз ба?", a: "Иә. NOVVES әр жобаны ағын, қысым, температураға төзімділік, пайдалану сценарийі, алаң жағдайлары, автоматтандыру қажеттіліктері және стандарт талаптары бойынша бағалайды. Желдеткішті таңдау, орналасу, басқару сценарийлері және көмекші жабдықтар жобаға арнайы анықталады." },
      { q: "Түтін мен жылу шығару жүйелері үшін қандай шешімдер ұсынасыз?", a: "NOVVES, F300/F400 классты түтін шығару желдеткіштері, ағынды желдеткіш жүйелері, шатырлық түтін шығару желдеткіштері, қабырғалық желдеткіштер, демпферлер, дыбыс басқыштар және сценарийге негізделген басқару тақталарымен біріктірілген түтін мен жылу шығару шешімдерін ұсынады." },
      { q: "Сатудан кейін қолдау көрсетесіз бе?", a: "Иә. NOVVES, жеткізілгеннен кейін клиенттерге техникалық құжаттама, іске қосу қолдауы, қосалқы бөлшектер, техникалық қызмет көрсету бағытталуы және сатудан кейінгі инженерлік қолдау арқылы көмек көрсетеді — жүйелер алаңда қауіпсіз, тиімді және тұрақты жұмыс істеуі үшін." },
    ],
    ref: { title: "Өнеркәсіптік нысандар", sector: "Өнеркәсіптік нысандар", example: "Eczacıbaşı өндірістік нысаны" },
  },
  tg: {
    faq: [
      { q: "Оё интихоби бодрезаи махсуси лоиҳавӣ ва тарҳрезии система анҷом медиҳед?", a: "Бале. NOVVES ҳар лоиҳаро бо ҳаҷм, фишор, муқовимат ба ҳарорат, сенарияи истифода, шароити соҳа, ниёзҳои автоматизатсия ва талаботи стандарт арзёбӣ мекунад. Интихоби бодреза, тарҳрезӣ, сенарияҳои идоракунӣ ва таҷҳизоти ёрирасон ба тариқи лоиҳавӣ муайян мешаванд." },
      { q: "Барои системаҳои хориҷкунии дуд ва гармӣ кадом ҳаллҳоро пешниҳод мекунед?", a: "NOVVES бо бодрезаҳои хориҷкунии дуди F300/F400, системаҳои бодрезаҳои реактивӣ, бодрезаҳои хориҷкунии дуди боми, бодрезаҳои девори, дамперҳо, хомӯшкунакҳои овоз ва пинҷакҳои идоракунии сенариявӣ ҳаллҳои интегралии хориҷкунии дуд ва гармиро таъмин мекунад." },
      { q: "Оё дастгирии баъди фурӯшро таъмин мекунед?", a: "Бале. NOVVES муштариёнро пас аз таҳвил бо ҳуҷҷатҳои техникӣ, дастгирии ба истифода додан, қисмҳои эҳтиётӣ, дастурамалҳои хидматрасонӣ ва дастгирии муҳандисии баъди фурӯш дастгирӣ мекунад — то системаҳо дар соҳа бехатар, самаранок ва устувор кор кунанд." },
    ],
    ref: { title: "Иншооти саноатӣ", sector: "Иншооти саноатӣ", example: "Иншооти истеҳсолии Eczacıbaşı" },
  },
  lt: {
    faq: [
      { q: "Ar teikiate projekto specifinį ventiliatoriaus parinkimą ir sistemos projektavimą?", a: "Taip. NOVVES kiekvieną projektą vertina su srautu, slėgiu, atsparumu temperatūrai, naudojimo scenarijumi, objekto sąlygomis, automatikos poreikiais ir standartų reikalavimais. Ventiliatoriaus parinkimas, išdėstymas, valdymo scenarijai ir pagalbinė įranga nustatomi pagal kiekvieną projektą." },
      { q: "Kokius sprendimus siūlote dūmų ir šilumos šalinimo sistemoms?", a: "NOVVES teikia integruotus dūmų ir šilumos šalinimo sprendimus su F300/F400 dūmų šalinimo ventiliatoriais, srovinių ventiliatorių sistemomis, stogo dūmų šalinimo ventiliatoriais, sieniniais ventiliatoriais, sklendėmis, slopintuvais ir scenarijais grįstomis valdymo skydais." },
      { q: "Ar teikiate aptarnavimą po pardavimo?", a: "Taip. NOVVES po pristatymo padeda klientams su technine dokumentacija, paleidimo pagalba, atsarginėmis dalimis, priežiūros gairėmis ir po pardavimo inžinerine pagalba — kad sistemos saugiai, efektyviai ir tvariai veiktų objekte." },
    ],
    ref: { title: "Pramonės objektai", sector: "Pramonės objektai", example: "Eczacıbaşı gamybinis kompleksas" },
  },
  pl: {
    faq: [
      { q: "Czy oferujecie dobór wentylatorów i projektowanie systemów dostosowane do projektu?", a: "Tak. NOVVES ocenia każdy projekt biorąc pod uwagę przepływ, ciśnienie, odporność temperaturową, scenariusz użycia, warunki obiektu, potrzeby automatyki i wymogi normatywne. Dobór wentylatora, układ, scenariusze sterowania i wyposażenie pomocnicze są określane indywidualnie dla każdego projektu." },
      { q: "Jakie rozwiązania oferujecie dla systemów oddymiania i odprowadzania ciepła?", a: "NOVVES dostarcza zintegrowane rozwiązania oddymiania i odprowadzania ciepła z wentylatorami oddymiającymi F300/F400, systemami wentylatorów strumieniowych, wentylatorami dachowymi, wentylatorami ściennymi, klapami, tłumikami i scenariuszowymi szafami sterowniczymi." },
      { q: "Czy oferujecie wsparcie posprzedażowe?", a: "Tak. NOVVES wspiera klientów po dostawie dokumentacją techniczną, pomocą przy uruchomieniu, częściami zamiennymi, wskazówkami serwisowymi i wsparciem inżynierskim — aby systemy działały bezpiecznie, wydajnie i niezawodnie w terenie." },
    ],
    ref: { title: "Obiekty przemysłowe", sector: "Obiekty przemysłowe", example: "Zakład produkcyjny Eczacıbaşı" },
  },
};

let updated = 0;
for (const loc of Object.keys(T)) {
  const file = path.join(DICT_DIR, loc, "home.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const t = T[loc];

  // FAQ items: ekle (mevcut 4'ün arkasına 3 yeni)
  if (data.faq?.items && data.faq.items.length < 7) {
    t.faq.forEach((qa, i) => {
      const enFaq = EN_FAQ_TAIL[i];
      data.faq.items.push({
        q: qa.q,
        a: qa.a,
        linkHref: enFaq.linkHref,
        linkLabel: enFaq.linkLabel,
        linkAriaLabel: enFaq.linkAriaLabel,
      });
    });
  }

  // referencePreview: 4. eklenir
  if (data.referencePreview && data.referencePreview.length < 4) {
    data.referencePreview.push({
      title: t.ref.title,
      sector: t.ref.sector,
      example: t.ref.example,
      projectCount: EN_REF_LAST.projectCount,
      href: EN_REF_LAST.href,
      image: EN_REF_LAST.image,
      theme: EN_REF_LAST.theme,
    });
  }

  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
  updated++;
  console.log(`✓ ${loc}: faq=${data.faq.items.length}, ref=${data.referencePreview.length}`);
}
console.log(`\n${updated} dile yansıtıldı.`);
