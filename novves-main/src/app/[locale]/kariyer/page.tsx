import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "../dictionaries";

type CareerCopy = {
  navHome: string;
  badge: string;
  title: string;
  highlight: string;
  desc: string;
  applyButton: string;
  mailButton: string;
  formTitle: string;
  formDesc: string;
  fields: string[];
  kvkkTitle: string;
  kvkkDesc: string;
  principlesTitle: string;
  principles: string[];
  metaTitle: string;
  metaDesc: string;
};

const careers: Record<string, CareerCopy> = {
  tr: {
    navHome: "Ana Sayfa",
    badge: "Kariyer",
    title: "NOVVES'te",
    highlight: "Kariyer",
    desc: "Mühendislik, üretim, satış, proje ve operasyon ekiplerimize katılmak isteyen adayların başvurularını değerlendiriyoruz.",
    applyButton: "Başvuru Yap",
    mailButton: "E-posta ile Başvur",
    formTitle: "Genel Başvuru",
    formDesc: "CV'nizi ve kısa ön yazınızı e-posta ile iletebilirsiniz. Uygun pozisyon oluştuğunda insan kaynakları ekibimiz sizinle iletişime geçer.",
    fields: ["CV / Özgeçmiş", "Kısa ön yazı", "Başvurulan alan veya pozisyon", "İletişim bilgileri"],
    kvkkTitle: "KVKK Bilgilendirmesi",
    kvkkDesc: "Başvuru sırasında paylaştığınız kişisel veriler yalnızca işe alım süreçlerinin değerlendirilmesi amacıyla işlenir. Başvurunuzu göndererek ilgili aydınlatma metinleri kapsamında değerlendirme yapılmasını kabul etmiş olursunuz.",
    principlesTitle: "Birlikte Çalışma Alanları",
    principles: ["Mühendislik ve Ar-Ge", "Üretim ve kalite", "Satış ve iş geliştirme", "Proje ve saha operasyonları"],
    metaTitle: "Kariyer | NOVVES",
    metaDesc: "NOVVES kariyer ve genel başvuru sayfası.",
  },
  en: {
    navHome: "Home",
    badge: "Career",
    title: "Careers at",
    highlight: "NOVVES",
    desc: "We review applications from candidates who want to join our engineering, production, sales, project and operations teams.",
    applyButton: "Apply Now",
    mailButton: "Apply by Email",
    formTitle: "General Application",
    formDesc: "You can send your CV and a short cover note by email. Our HR team will contact you when a suitable position is available.",
    fields: ["CV / Resume", "Short cover note", "Preferred department or position", "Contact details"],
    kvkkTitle: "Privacy Notice",
    kvkkDesc: "Personal data shared during application is processed only for recruitment evaluation. By sending your application, you accept that it may be reviewed under the relevant privacy notices.",
    principlesTitle: "Areas to Work Together",
    principles: ["Engineering and R&D", "Production and quality", "Sales and business development", "Project and field operations"],
    metaTitle: "Career | NOVVES",
    metaDesc: "NOVVES career and general application page.",
  },
  ru: {
    navHome: "Главная",
    badge: "Карьера",
    title: "Карьера в",
    highlight: "NOVVES",
    desc: "Мы рассматриваем заявки кандидатов для инженерных, производственных, коммерческих, проектных и операционных команд.",
    applyButton: "Подать заявку",
    mailButton: "Отправить по e-mail",
    formTitle: "Общая заявка",
    formDesc: "Отправьте резюме и краткое сопроводительное письмо по электронной почте. HR-команда свяжется с вами при наличии подходящей позиции.",
    fields: ["CV / резюме", "Краткое сопроводительное письмо", "Желаемое направление или должность", "Контактные данные"],
    kvkkTitle: "Уведомление о конфиденциальности",
    kvkkDesc: "Персональные данные, переданные при отклике, обрабатываются только для оценки кандидата в процессе подбора персонала.",
    principlesTitle: "Направления работы",
    principles: ["Инженерия и R&D", "Производство и качество", "Продажи и развитие бизнеса", "Проекты и полевые операции"],
    metaTitle: "Карьера | NOVVES",
    metaDesc: "Страница карьеры и общей заявки NOVVES.",
  },
  ar: {
    navHome: "الرئيسية",
    badge: "الوظائف",
    title: "المسار المهني في",
    highlight: "NOVVES",
    desc: "نراجع طلبات المرشحين الراغبين في الانضمام إلى فرق الهندسة والإنتاج والمبيعات والمشاريع والعمليات.",
    applyButton: "قدّم الآن",
    mailButton: "التقديم عبر البريد",
    formTitle: "طلب عام",
    formDesc: "يمكنك إرسال سيرتك الذاتية ورسالة تعريفية قصيرة عبر البريد الإلكتروني. سيتواصل فريق الموارد البشرية عند توفر فرصة مناسبة.",
    fields: ["السيرة الذاتية", "رسالة تعريفية قصيرة", "القسم أو المنصب المطلوب", "بيانات الاتصال"],
    kvkkTitle: "إشعار الخصوصية",
    kvkkDesc: "تتم معالجة البيانات الشخصية المرسلة أثناء التقديم فقط لأغراض تقييم التوظيف.",
    principlesTitle: "مجالات العمل",
    principles: ["الهندسة والبحث والتطوير", "الإنتاج والجودة", "المبيعات وتطوير الأعمال", "المشاريع والعمليات الميدانية"],
    metaTitle: "الوظائف | NOVVES",
    metaDesc: "صفحة الوظائف والتقديم العام في NOVVES.",
  },
  de: {
    navHome: "Startseite",
    badge: "Karriere",
    title: "Karriere bei",
    highlight: "NOVVES",
    desc: "Wir prüfen Bewerbungen für unsere Teams in Engineering, Produktion, Vertrieb, Projekt und Operations.",
    applyButton: "Jetzt bewerben",
    mailButton: "Per E-Mail bewerben",
    formTitle: "Initiativbewerbung",
    formDesc: "Senden Sie Ihren Lebenslauf und ein kurzes Anschreiben per E-Mail. Unser HR-Team meldet sich, sobald eine passende Position verfügbar ist.",
    fields: ["CV / Lebenslauf", "Kurzes Anschreiben", "Gewünschter Bereich oder Position", "Kontaktdaten"],
    kvkkTitle: "Datenschutzhinweis",
    kvkkDesc: "Die im Rahmen der Bewerbung übermittelten personenbezogenen Daten werden ausschließlich zur Bewertung im Recruiting-Prozess verarbeitet.",
    principlesTitle: "Arbeitsbereiche",
    principles: ["Engineering und F&E", "Produktion und Qualität", "Vertrieb und Geschäftsentwicklung", "Projekt- und Feldeinsätze"],
    metaTitle: "Karriere | NOVVES",
    metaDesc: "NOVVES Karriere- und Initiativbewerbungsseite.",
  },
  fr: {
    navHome: "Accueil",
    badge: "Carrière",
    title: "Carrière chez",
    highlight: "NOVVES",
    desc: "Nous étudions les candidatures pour nos équipes d'ingénierie, production, vente, projet et opérations.",
    applyButton: "Postuler",
    mailButton: "Postuler par e-mail",
    formTitle: "Candidature spontanée",
    formDesc: "Envoyez votre CV et une courte lettre de motivation par e-mail. Notre équipe RH vous contactera lorsqu'un poste adapté sera disponible.",
    fields: ["CV", "Courte lettre de motivation", "Département ou poste souhaité", "Coordonnées"],
    kvkkTitle: "Notice de confidentialité",
    kvkkDesc: "Les données personnelles partagées lors de la candidature sont traitées uniquement pour l'évaluation du recrutement.",
    principlesTitle: "Domaines de collaboration",
    principles: ["Ingénierie et R&D", "Production et qualité", "Ventes et développement commercial", "Projets et opérations terrain"],
    metaTitle: "Carrière | NOVVES",
    metaDesc: "Page carrière et candidature spontanée NOVVES.",
  },
  it: {
    navHome: "Home",
    badge: "Carriere",
    title: "Carriere in",
    highlight: "NOVVES",
    desc: "Valutiamo candidature per i team di ingegneria, produzione, vendite, progetti e operations.",
    applyButton: "Candidati",
    mailButton: "Candidati via e-mail",
    formTitle: "Candidatura spontanea",
    formDesc: "Puoi inviare CV e una breve lettera di presentazione via e-mail. Il team HR ti contatterà quando sarà disponibile una posizione adatta.",
    fields: ["CV", "Breve lettera di presentazione", "Area o posizione desiderata", "Dati di contatto"],
    kvkkTitle: "Informativa privacy",
    kvkkDesc: "I dati personali condivisi durante la candidatura sono trattati solo per la valutazione del processo di selezione.",
    principlesTitle: "Aree di lavoro",
    principles: ["Ingegneria e R&S", "Produzione e qualità", "Vendite e sviluppo business", "Progetti e operazioni sul campo"],
    metaTitle: "Carriere | NOVVES",
    metaDesc: "Pagina carriere e candidatura spontanea NOVVES.",
  },
  es: {
    navHome: "Inicio",
    badge: "Carrera",
    title: "Carrera en",
    highlight: "NOVVES",
    desc: "Evaluamos candidaturas para nuestros equipos de ingeniería, producción, ventas, proyectos y operaciones.",
    applyButton: "Postularse",
    mailButton: "Postularse por e-mail",
    formTitle: "Solicitud general",
    formDesc: "Puede enviar su CV y una breve carta de presentación por e-mail. El equipo de RR. HH. se comunicará cuando haya una posición adecuada.",
    fields: ["CV", "Breve carta de presentación", "Área o puesto deseado", "Datos de contacto"],
    kvkkTitle: "Aviso de privacidad",
    kvkkDesc: "Los datos personales compartidos durante la solicitud se procesan solo para la evaluación de reclutamiento.",
    principlesTitle: "Áreas de trabajo",
    principles: ["Ingeniería e I+D", "Producción y calidad", "Ventas y desarrollo de negocio", "Proyectos y operaciones de campo"],
    metaTitle: "Carrera | NOVVES",
    metaDesc: "Página de carrera y solicitud general de NOVVES.",
  },
  az: {
    navHome: "Ana səhifə",
    badge: "Karyera",
    title: "NOVVES-də",
    highlight: "Karyera",
    desc: "Mühəndislik, istehsalat, satış, layihə və əməliyyat komandalarımıza qoşulmaq istəyən namizədlərin müraciətlərini dəyərləndiririk.",
    applyButton: "Müraciət et",
    mailButton: "E-poçtla müraciət et",
    formTitle: "Ümumi müraciət",
    formDesc: "CV-nizi və qısa motivasiya məktubunuzu e-poçtla göndərə bilərsiniz. Uyğun vakansiya yarandıqda insan resursları komandamız sizinlə əlaqə saxlayacaq.",
    fields: ["CV / tərcümeyi-hal", "Qısa motivasiya məktubu", "Müraciət edilən sahə və ya vəzifə", "Əlaqə məlumatları"],
    kvkkTitle: "Məxfilik bildirişi",
    kvkkDesc: "Müraciət zamanı paylaşdığınız şəxsi məlumatlar yalnız işə qəbul prosesinin qiymətləndirilməsi məqsədilə işlənir.",
    principlesTitle: "Birlikdə işləyə biləcəyimiz sahələr",
    principles: ["Mühəndislik və Ar-Ge", "İstehsalat və keyfiyyət", "Satış və biznes inkişafı", "Layihə və sahə əməliyyatları"],
    metaTitle: "Karyera | NOVVES",
    metaDesc: "NOVVES karyera və ümumi müraciət səhifəsi.",
  },
  kk: {
    navHome: "Басты бет",
    badge: "Мансап",
    title: "NOVVES-тегі",
    highlight: "Мансап",
    desc: "Инженерия, өндіріс, сату, жоба және операция командаларына қосылғысы келетін үміткерлердің өтінімдерін қарастырамыз.",
    applyButton: "Өтініш беру",
    mailButton: "E-mail арқылы өтініш беру",
    formTitle: "Жалпы өтініш",
    formDesc: "Түйіндемеңізді және қысқа ілеспе хатыңызды e-mail арқылы жібере аласыз. Сәйкес позиция пайда болғанда HR командасы сізбен байланысады.",
    fields: ["CV / түйіндеме", "Қысқа ілеспе хат", "Қалаған бөлім немесе позиция", "Байланыс деректері"],
    kvkkTitle: "Құпиялылық туралы хабарлама",
    kvkkDesc: "Өтініш кезінде берілген жеке деректер тек жұмысқа қабылдау процесін бағалау мақсатында өңделеді.",
    principlesTitle: "Бірге жұмыс істеу бағыттары",
    principles: ["Инженерия және R&D", "Өндіріс және сапа", "Сату және бизнесті дамыту", "Жоба және дала операциялары"],
    metaTitle: "Мансап | NOVVES",
    metaDesc: "NOVVES мансап және жалпы өтініш беті.",
  },
  tg: {
    navHome: "Саҳифаи асосӣ",
    badge: "Карера",
    title: "Карера дар",
    highlight: "NOVVES",
    desc: "Мо дархостҳои номзадонро барои гурӯҳҳои муҳандисӣ, истеҳсолот, фурӯш, лоиҳа ва амалиёт баррасӣ мекунем.",
    applyButton: "Дархост фиристед",
    mailButton: "Бо e-mail дархост фиристед",
    formTitle: "Дархости умумӣ",
    formDesc: "Шумо метавонед CV ва номаи кӯтоҳи худро тавассути e-mail фиристед. Ҳангоми пайдо шудани вазифаи мувофиқ гурӯҳи HR бо шумо тамос мегирад.",
    fields: ["CV / резюме", "Номаи кӯтоҳи ҳамроҳ", "Самт ё вазифаи дилхоҳ", "Маълумоти тамос"],
    kvkkTitle: "Огоҳии махфият",
    kvkkDesc: "Маълумоти шахсӣ, ки ҳангоми дархост ирсол мешавад, танҳо барои арзёбии раванди қабул коркард мегардад.",
    principlesTitle: "Самтҳои ҳамкорӣ",
    principles: ["Муҳандисӣ ва R&D", "Истеҳсолот ва сифат", "Фурӯш ва рушди тиҷорат", "Лоиҳа ва амалиёти саҳроӣ"],
    metaTitle: "Карера | NOVVES",
    metaDesc: "Саҳифаи карера ва дархости умумии NOVVES.",
  },
  zh: {
    navHome: "首页",
    badge: "职业发展",
    title: "加入",
    highlight: "NOVVES",
    desc: "我们欢迎希望加入工程、生产、销售、项目和运营团队的候选人提交申请。",
    applyButton: "立即申请",
    mailButton: "通过电子邮件申请",
    formTitle: "通用申请",
    formDesc: "您可以通过电子邮件发送简历和简短求职信。当有合适职位时，人力资源团队将与您联系。",
    fields: ["简历 / CV", "简短求职信", "意向部门或职位", "联系方式"],
    kvkkTitle: "隐私声明",
    kvkkDesc: "申请过程中提交的个人数据仅用于招聘评估流程。",
    principlesTitle: "合作领域",
    principles: ["工程与研发", "生产与质量", "销售与业务拓展", "项目与现场运营"],
    metaTitle: "职业发展 | NOVVES",
    metaDesc: "NOVVES 职业发展与通用申请页面。",
  },
  ur: {
    navHome: "صفحۂ اول",
    badge: "کیریئر",
    title: "NOVVES میں",
    highlight: "کیریئر",
    desc: "ہم انجینئرنگ، پیداوار، فروخت، پروجیکٹ اور آپریشن ٹیموں میں شامل ہونے کے خواہشمند امیدواروں کی درخواستوں کا جائزہ لیتے ہیں۔",
    applyButton: "درخواست دیں",
    mailButton: "ای میل سے درخواست دیں",
    formTitle: "عمومی درخواست",
    formDesc: "آپ اپنا CV اور مختصر کور نوٹ ای میل کے ذریعے بھیج سکتے ہیں۔ مناسب پوزیشن دستیاب ہونے پر HR ٹیم آپ سے رابطہ کرے گی۔",
    fields: ["CV / ریزیومے", "مختصر کور نوٹ", "مطلوبہ شعبہ یا پوزیشن", "رابطہ معلومات"],
    kvkkTitle: "پرائیویسی نوٹس",
    kvkkDesc: "درخواست کے دوران دی گئی ذاتی معلومات صرف بھرتی کے جائزے کے لیے استعمال کی جاتی ہیں۔",
    principlesTitle: "کام کے شعبے",
    principles: ["انجینئرنگ اور R&D", "پیداوار اور معیار", "فروخت اور کاروباری ترقی", "پروجیکٹ اور فیلڈ آپریشنز"],
    metaTitle: "کیریئر | NOVVES",
    metaDesc: "NOVVES کیریئر اور عمومی درخواست کا صفحہ۔",
  },
  lt: {
    navHome: "Pradžia",
    badge: "Karjera",
    title: "Karjera",
    highlight: "NOVVES",
    desc: "Vertiname kandidatų, norinčių prisijungti prie inžinerijos, gamybos, pardavimų, projektų ir operacijų komandų, paraiškas.",
    applyButton: "Pateikti paraišką",
    mailButton: "Pateikti el. paštu",
    formTitle: "Bendra paraiška",
    formDesc: "CV ir trumpą motyvacinį laišką galite atsiųsti el. paštu. Atsiradus tinkamai pozicijai, personalo komanda su jumis susisieks.",
    fields: ["CV / gyvenimo aprašymas", "Trumpas motyvacinis laiškas", "Pageidaujama sritis arba pozicija", "Kontaktiniai duomenys"],
    kvkkTitle: "Privatumo pranešimas",
    kvkkDesc: "Paraiškos metu pateikti asmens duomenys tvarkomi tik atrankos vertinimo tikslais.",
    principlesTitle: "Bendradarbiavimo sritys",
    principles: ["Inžinerija ir R&D", "Gamyba ir kokybė", "Pardavimai ir verslo plėtra", "Projektai ir darbai vietoje"],
    metaTitle: "Karjera | NOVVES",
    metaDesc: "NOVVES karjeros ir bendros paraiškos puslapis.",
  },
  pl: {
    navHome: "Strona główna",
    badge: "Kariera",
    title: "Kariera w",
    highlight: "NOVVES",
    desc: "Rozpatrujemy aplikacje kandydatów, którzy chcą dołączyć do zespołów inżynierii, produkcji, sprzedaży, projektów i operacji.",
    applyButton: "Aplikuj",
    mailButton: "Aplikuj e-mailem",
    formTitle: "Aplikacja ogólna",
    formDesc: "CV i krótką wiadomość motywacyjną można przesłać e-mailem. Zespół HR skontaktuje się, gdy pojawi się odpowiednie stanowisko.",
    fields: ["CV / życiorys", "Krótka wiadomość motywacyjna", "Preferowany dział lub stanowisko", "Dane kontaktowe"],
    kvkkTitle: "Informacja o prywatności",
    kvkkDesc: "Dane osobowe przekazane w aplikacji są przetwarzane wyłącznie w celu oceny rekrutacyjnej.",
    principlesTitle: "Obszary współpracy",
    principles: ["Inżynieria i R&D", "Produkcja i jakość", "Sprzedaż i rozwój biznesu", "Projekty i operacje terenowe"],
    metaTitle: "Kariera | NOVVES",
    metaDesc: "Strona kariery i aplikacji ogólnej NOVVES.",
  },
};

function careerCopy(locale: string): CareerCopy {
  return careers[locale] ?? careers.en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const t = careerCopy(locale);
  return {
    title: t.metaTitle,
    description: t.metaDesc,
  };
}

export default async function KariyerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = careerCopy(locale);
  const mailHref = `mailto:info@novves.com?subject=${encodeURIComponent("Kariyer Başvurusu / Career Application")}`;

  return (
    <main className="bg-[#ecebe6]">
      <section className="relative overflow-hidden bg-[#111827] pb-10 pt-24 text-white sm:pb-16 sm:pt-32 lg:pb-20 lg:pt-36">
        <div className="pointer-events-none absolute -right-28 -top-28 h-72 w-72 rounded-full bg-primary/20 blur-3xl sm:h-80 sm:w-80" />
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.08]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40 sm:mb-8 sm:text-xs sm:tracking-[0.16em]">
            <Link href={`/${locale}`} className="transition hover:text-white/70">
              {t.navHome}
            </Link>
            <span>/</span>
            <span className="text-primary">{t.badge}</span>
          </nav>

          <div className="grid gap-7 md:gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.72fr)] lg:items-end lg:gap-10">
            <div className="min-w-0">
              <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-primary sm:mb-5 sm:px-3.5 sm:text-[11px] sm:tracking-[0.2em]">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {t.badge}
              </div>
              <h1 className="max-w-4xl break-words font-eurostile text-[clamp(2.45rem,13vw,4.5rem)] font-black uppercase leading-[0.92] tracking-[-0.05em] sm:text-[clamp(3.25rem,9vw,6rem)] lg:text-[clamp(4rem,6.4vw,7rem)]">
                {t.title} <span className="text-primary">{t.highlight}</span>
              </h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/62 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
                {t.desc}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row">
                <a
                  href={mailHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-5 py-3 text-center text-sm font-bold text-white shadow-[0_18px_46px_-20px_rgba(239,95,23,0.8)] transition hover:bg-primary-deep sm:px-6 sm:py-3.5"
                >
                  {t.applyButton}
                </a>
                <Link
                  href={`/${locale}/privacy`}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-center text-sm font-bold text-white transition hover:border-primary/55 hover:text-primary sm:px-6 sm:py-3.5"
                >
                  {t.kvkkTitle}
                </Link>
              </div>
            </div>

            <div className="min-w-0 rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-5 shadow-[0_30px_90px_-54px_rgba(0,0,0,0.85)] backdrop-blur-sm sm:rounded-[1.75rem] sm:p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary sm:tracking-[0.22em]">{t.formTitle}</p>
              <p className="mt-4 text-sm leading-7 text-white/58">{t.formDesc}</p>
              <ul className="mt-5 space-y-3 sm:mt-6">
                {t.fields.map((field) => (
                  <li key={field} className="flex items-start gap-3 text-sm font-semibold leading-6 text-white/78">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </span>
                    {field}
                  </li>
                ))}
              </ul>
              <a
                href={mailHref}
                className="mt-7 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-primary/35 bg-primary/12 px-5 py-3 text-center text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
              >
                {t.mailButton}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-14 lg:py-18">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:gap-6 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="rounded-[1.25rem] border border-ink/10 bg-[#f8f5ed] p-5 shadow-[0_18px_42px_-32px_rgba(15,20,30,0.32)] sm:rounded-[1.5rem] sm:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary sm:text-xs sm:tracking-[0.2em]">{t.kvkkTitle}</p>
            <p className="mt-4 text-sm leading-7 text-secondary/70">{t.kvkkDesc}</p>
          </div>

          <div className="rounded-[1.25rem] border border-ink/10 bg-[#f8f5ed] p-5 shadow-[0_18px_42px_-32px_rgba(15,20,30,0.32)] sm:rounded-[1.5rem] sm:p-8">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-primary sm:text-xs sm:tracking-[0.2em]">{t.principlesTitle}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {t.principles.map((item) => (
                <div key={item} className="rounded-2xl border border-ink/10 bg-[#ecebe6] px-4 py-4 text-sm font-bold leading-6 text-dark">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
