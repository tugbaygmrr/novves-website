// Tek seferlik: 13 dile eksik 4 section'ı inject eder.
// engineeringShowcase + engineeringPillarsSection: dil-spesifik çeviri.
// homeBands + productCategoryFeatures: EN scaffold (fallback).
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DICT_DIR = path.join(__dirname, "..", "src", "app", "[locale]", "dictionaries");

const en = JSON.parse(fs.readFileSync(path.join(DICT_DIR, "en", "home.json"), "utf8"));
const FALLBACK_HOMEBANDS = en.homeBands;
const FALLBACK_PRODUCT_FEATURES = en.productCategoryFeatures;

// engineeringShowcase + engineeringPillarsSection çevirileri
const TR_ES = {
  ru: {
    engineeringShowcase: {
      title: "ИНЖЕНЕРИЯ НА БАЗЕ CFD",
      subtitle: "Инженерия, делающая поток видимым",
      body: "Наш процесс начинается не с выбора продукта, а с понимания аэродинамического поведения здания. NOVVES моделирует движение дыма, тепла и воздуха внутри сооружения с помощью CFD-анализа; расположение вентилятора, расход, давление и сценарную логику работы мы проектируем и подтверждаем инженерными данными.",
      cta: "Изучить процесс CFD",
    },
    engineeringPillarsSection: {
      title: "От инженерии к площадке",
      subtitle: "Решение проекта от А до Я",
      lead: "NOVVES не рассматривает проекты только как поставку оборудования. Анализируем потребности, проектируем правильную систему, производим и делаем её применимой на объекте.",
    },
  },
  ar: {
    engineeringShowcase: {
      title: "هندسة مدعومة بـ CFD",
      subtitle: "هندسة تجعل التدفق مرئيًا",
      body: "تبدأ عمليتنا ليس باختيار المنتج بل بفهم السلوك الديناميكي للمبنى. تحاكي NOVVES حركة الدخان والحرارة والهواء داخل المبنى بتحليلات CFD؛ ونصمم موقع المروحة، التدفق، الضغط، ومنطق التشغيل القائم على السيناريو ونتحقق منها ببيانات هندسية.",
      cta: "استكشف عملية CFD",
    },
    engineeringPillarsSection: {
      title: "من الهندسة إلى الميدان",
      subtitle: "حل المشروع من الألف إلى الياء",
      lead: "NOVVES لا تتعامل مع المشاريع كمجرد توريد منتجات. نحلل الحاجة، نصمم النظام الصحيح، نُنتجه، ونجعله قابلاً للتطبيق في الموقع.",
    },
  },
  de: {
    engineeringShowcase: {
      title: "CFD-GESTÜTZTE INGENIEURSARBEIT",
      subtitle: "Ingenieurkunst, die Strömung sichtbar macht",
      body: "Unser Prozess beginnt nicht mit der Produktauswahl, sondern mit dem Verständnis des aerodynamischen Verhaltens des Gebäudes. NOVVES simuliert mit CFD-Analysen die Bewegung von Rauch, Wärme und Luft im Gebäude; Ventilatorposition, Volumenstrom, Druck und szenariobasierte Steuerung werden mit Ingenieursdaten entworfen und validiert.",
      cta: "CFD-Prozess entdecken",
    },
    engineeringPillarsSection: {
      title: "Vom Engineering zur Baustelle",
      subtitle: "Projektlösung von A bis Z",
      lead: "NOVVES versteht Projekte nicht nur als Produktlieferung. Wir analysieren den Bedarf, entwerfen das richtige System, produzieren es und machen es vor Ort einsatzbereit.",
    },
  },
  it: {
    engineeringShowcase: {
      title: "INGEGNERIA SUPPORTATA DA CFD",
      subtitle: "Ingegneria che rende visibile il flusso",
      body: "Il nostro processo non inizia con la selezione del prodotto, ma con la comprensione del comportamento aerodinamico dell'edificio. NOVVES simula il movimento di fumo, calore e aria all'interno della struttura con analisi CFD; posizione del ventilatore, portata, pressione e logica operativa basata su scenari vengono progettati e validati con dati ingegneristici.",
      cta: "Esplora il processo CFD",
    },
    engineeringPillarsSection: {
      title: "Dall'ingegneria al cantiere",
      subtitle: "Soluzione di progetto dalla A alla Z",
      lead: "NOVVES non considera i progetti solo come fornitura di prodotti. Analizziamo il fabbisogno, progettiamo il sistema corretto, lo produciamo e lo rendiamo applicabile in cantiere.",
    },
  },
  fr: {
    engineeringShowcase: {
      title: "INGÉNIERIE ASSISTÉE PAR CFD",
      subtitle: "Une ingénierie qui rend l'écoulement visible",
      body: "Notre processus ne commence pas par la sélection du produit mais par la compréhension du comportement aérodynamique du bâtiment. NOVVES simule par analyses CFD le mouvement de la fumée, de la chaleur et de l'air dans la structure ; emplacement du ventilateur, débit, pression et logique de fonctionnement par scénario sont conçus et validés avec des données d'ingénierie.",
      cta: "Découvrir le processus CFD",
    },
    engineeringPillarsSection: {
      title: "De l'ingénierie au chantier",
      subtitle: "Solution de projet de A à Z",
      lead: "NOVVES ne traite pas les projets comme une simple fourniture de produits. Nous analysons le besoin, concevons le bon système, le produisons et le rendons applicable sur site.",
    },
  },
  es: {
    engineeringShowcase: {
      title: "INGENIERÍA RESPALDADA POR CFD",
      subtitle: "Ingeniería que hace visible el flujo",
      body: "Nuestro proceso no empieza con la selección del producto, sino con la comprensión del comportamiento aerodinámico del edificio. NOVVES simula el movimiento del humo, el calor y el aire dentro de la estructura con análisis CFD; la posición del ventilador, el caudal, la presión y la lógica operativa por escenarios se diseñan y validan con datos de ingeniería.",
      cta: "Explorar el proceso CFD",
    },
    engineeringPillarsSection: {
      title: "De la ingeniería al campo",
      subtitle: "Solución de proyecto de la A a la Z",
      lead: "NOVVES no considera los proyectos solo como suministro de productos. Analizamos la necesidad, diseñamos el sistema correcto, lo fabricamos y lo hacemos aplicable en obra.",
    },
  },
  zh: {
    engineeringShowcase: {
      title: "CFD 支持的工程",
      subtitle: "让流动可见的工程",
      body: "我们的流程不是从产品选型开始，而是从理解建筑的气动行为开始。NOVVES 通过 CFD 分析模拟烟雾、热量和空气在结构内的运动；风机位置、流量、压力以及基于场景的运行逻辑均以工程数据进行设计与验证。",
      cta: "探索 CFD 流程",
    },
    engineeringPillarsSection: {
      title: "从工程到现场",
      subtitle: "项目从头到尾的解决方案",
      lead: "NOVVES 不仅把项目视作产品供应。我们分析需求、设计正确的系统、进行生产，并使其在现场可实施。",
    },
  },
  ur: {
    engineeringShowcase: {
      title: "CFD سپورٹڈ انجینئرنگ",
      subtitle: "بہاؤ کو نظر آنے والی انجینئرنگ",
      body: "ہمارا عمل صرف پروڈکٹ سلیکشن سے نہیں بلکہ عمارت کے ایرو ڈائنامک رویے کو سمجھنے سے شروع ہوتا ہے۔ NOVVES، CFD پر مبنی تجزیوں کے ذریعے دھواں، حرارت اور ہوا کی عمارت کے اندر حرکت کو سمیولیٹ کرتا ہے؛ فین کی پوزیشن، فلو، پریشر اور منظر نامے پر مبنی آپریٹنگ منطق کو انجینئرنگ ڈیٹا سے ڈیزائن اور توثیق کرتا ہے۔",
      cta: "CFD کے عمل کو دیکھیں",
    },
    engineeringPillarsSection: {
      title: "انجینئرنگ سے میدان تک",
      subtitle: "A سے Z تک منصوبے کا حل",
      lead: "NOVVES منصوبوں کو صرف پروڈکٹ سپلائی کے طور پر نہیں سمجھتا۔ ہم ضرورت کا تجزیہ کرتے ہیں، صحیح سسٹم ڈیزائن کرتے ہیں، تیار کرتے ہیں اور سائٹ پر قابلِ اطلاق بناتے ہیں۔",
    },
  },
  az: {
    engineeringShowcase: {
      title: "CFD DƏSTƏKLİ MÜHƏNDİSLİK",
      subtitle: "Axını Görünür Edən Mühəndislik",
      body: "Prosesimiz sadəcə məhsul seçimi ilə deyil, binanın aerodinamik davranışını anlamaqla başlayır. NOVVES, CFD əsaslı analizlərlə tüstü, istilik və hava axınının bina daxilindəki hərəkətini simulyasiya edir; fan yerləşməsi, debit, təzyiq və senariyaya əsaslanan iş məntiqini mühəndislik məlumatları ilə layihələndirir və təsdiqləyir.",
      cta: "CFD ilə proses süzgəcimizi inceleyin",
    },
    engineeringPillarsSection: {
      title: "Mühəndislikdən Sahəyə",
      subtitle: "A-dan Z-yə Layihə Həlli",
      lead: "NOVVES layihələri yalnız məhsul tədarükü kimi qiymətləndirmir. Ehtiyacı analiz edir, düzgün sistemi layihələndirir, istehsal edir və sahədə tətbiq edilə bilən hala gətirir.",
    },
  },
  kk: {
    engineeringShowcase: {
      title: "CFD ҚОЛДАУЫМЕН ИНЖЕНЕРИЯ",
      subtitle: "Ағынды көрінетін ететін инженерия",
      body: "Үдерісіміз тек өнім таңдаудан емес, ғимараттың аэродинамикалық мінез-құлқын түсінуден басталады. NOVVES, CFD негізделген талдаулармен түтін, жылу және ауа ағынының ғимарат ішіндегі қозғалысын модельдейді; желдеткіш орналасуы, ағын, қысым және сценарийлерге негізделген жұмыс логикасын инженерлік деректермен жобалап растайды.",
      cta: "CFD процесін зерттеңіз",
    },
    engineeringPillarsSection: {
      title: "Инженериядан Алаңға",
      subtitle: "А-дан Я-ға дейін жоба шешімі",
      lead: "NOVVES жобаларды тек өнім жеткізу ретінде қарастырмайды. Қажеттілікті талдап, дұрыс жүйені жобалап, өндіріп, алаңда қолданылатын күйге келтіреміз.",
    },
  },
  tg: {
    engineeringShowcase: {
      title: "МУҲАНДИСИИ ДАСТГИРИШУДА БО CFD",
      subtitle: "Муҳандисие, ки ҷараёнро намоён мекунад",
      body: "Раванди мо на бо интихоби маҳсулот, балки бо фаҳмиши рафтори аэродинамикии бино оғоз меёбад. NOVVES бо таҳлилҳои CFD ҳаракати дуд, гармӣ ва ҳаворо дар дохили сохтор симулятсия мекунад; ҷойгиршавии бодреза, ҷараён, фишор ва мантиқи кории сенариявӣ бо маълумоти муҳандисӣ тарҳрезӣ ва тасдиқ карда мешавад.",
      cta: "Раванди CFD-ро омӯзед",
    },
    engineeringPillarsSection: {
      title: "Аз муҳандисӣ ба соҳа",
      subtitle: "Ҳалли лоиҳа аз А то Я",
      lead: "NOVVES лоиҳаҳоро танҳо ҳамчун таъминоти маҳсулот наҳминосад. Ниёзро таҳлил мекунем, системаи дурустро тарҳрезӣ мекунем, истеҳсол менамоем ва дар соҳа татбиқшаванда мегардонем.",
    },
  },
  lt: {
    engineeringShowcase: {
      title: "CFD PALAIKOMA INŽINERIJA",
      subtitle: "Inžinerija, kuri padaro srautą matomą",
      body: "Mūsų procesas prasideda ne nuo produkto pasirinkimo, o nuo pastato aerodinaminio elgesio supratimo. NOVVES CFD analizėmis modeliuoja dūmų, šilumos ir oro judėjimą pastate; ventiliatoriaus padėtis, srautas, slėgis ir scenarijais pagrįsta veikimo logika kuriama ir patvirtinama inžineriniais duomenimis.",
      cta: "Susipažinkite su CFD procesu",
    },
    engineeringPillarsSection: {
      title: "Nuo inžinerijos iki objekto",
      subtitle: "Projekto sprendimas nuo A iki Z",
      lead: "NOVVES projektų nelaiko vien produktų tiekimu. Analizuojame poreikį, projektuojame tinkamą sistemą, gaminame ir padarome tinkamą eksploatacijai objekte.",
    },
  },
  pl: {
    engineeringShowcase: {
      title: "INŻYNIERIA WSPIERANA CFD",
      subtitle: "Inżynieria czyniąca przepływ widocznym",
      body: "Nasz proces nie zaczyna się od wyboru produktu, ale od zrozumienia zachowania aerodynamicznego budynku. NOVVES dzięki analizom CFD symuluje ruch dymu, ciepła i powietrza w obiekcie; pozycja wentylatora, przepływ, ciśnienie i logika pracy oparta na scenariuszach są projektowane i weryfikowane danymi inżynieryjnymi.",
      cta: "Poznaj proces CFD",
    },
    engineeringPillarsSection: {
      title: "Od inżynierii do obiektu",
      subtitle: "Rozwiązanie projektu od A do Z",
      lead: "NOVVES nie traktuje projektów wyłącznie jako dostawy produktu. Analizujemy potrzebę, projektujemy właściwy system, produkujemy i przygotowujemy do wdrożenia na obiekcie.",
    },
  },
};

let updated = 0;
for (const loc of Object.keys(TR_ES)) {
  const file = path.join(DICT_DIR, loc, "home.json");
  const raw = fs.readFileSync(file, "utf8");
  const data = JSON.parse(raw);
  const t = TR_ES[loc];

  if (!data.engineeringShowcase) data.engineeringShowcase = t.engineeringShowcase;
  if (!data.engineeringPillarsSection) data.engineeringPillarsSection = t.engineeringPillarsSection;
  if (!data.homeBands) data.homeBands = FALLBACK_HOMEBANDS;
  if (!data.productCategoryFeatures) data.productCategoryFeatures = FALLBACK_PRODUCT_FEATURES;

  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n", "utf8");
  updated++;
  console.log(`✓ ${loc}: 4 missing sections injected`);
}
console.log(`\n${updated} dile yansıtıldı.`);
