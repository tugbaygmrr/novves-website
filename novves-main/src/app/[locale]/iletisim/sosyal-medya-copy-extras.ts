import type { Locale } from "@/i18n/config";
import type { LocalizedSocialPageCopy } from "./sosyal-medya-copy.types";

/** Locales that previously fell back to English on the social hub page. */
export const sosyalMedyaCopyExtras: Partial<Record<Locale, LocalizedSocialPageCopy>> = {
  ar: {
    heroKicker: "الحضور الرقمي",
    heroLead:
      "جمعنا التحديثات المؤسسية ومقاطع المنتج وسرديات الميدان في طبقة اجتماعية واحدة واضحة. لكل قناة مهمة محددة، وتجعل هذه الصفحة هذا الهيكل سهل القراءة فورًا.",
    stats: [
      { value: "6", label: "قنوات نشطة" },
      { value: "TR + Global", label: "تركيز السوق" },
      { value: "Corporate + Product", label: "محور المحتوى" },
    ],
    primaryCta: "العودة إلى صفحة الاتصال",
    secondaryCta: "عرض شركائنا",
    previewEyebrow: "هندسة النشر",
    previewTitle: "كل قناة تلعب دورًا مختلفًا.",
    previewDesc:
      "تحمل حسابات LinkedIn في تركيا والعالم القصة المؤسسية بمقاييس مختلفة، ويدعم Facebook الرؤية الاجتماعية الأوسع، ويعمّق YouTube سرد المنتج والهندسة، وتُظهر حسابات Instagram إيقاع العلامة لجمهور مختلف.",
    previewCards: [
      {
        label: "السرد المؤسسي",
        title: "قصص الفريق والعلامة والمراجع",
        stat: "LinkedIn TR / Global / Facebook",
      },
      {
        label: "المحتوى التقني",
        title: "فيديوهات وعروض وشرح يركز على المنتج",
        stat: "YouTube",
      },
      {
        label: "تدفق مباشر",
        title: "واجهة اجتماعية منفصلة لتركيا والأسواق العالمية",
        stat: "Instagram",
      },
    ],
    highlightsLabel: "خريطة المحتوى",
    highlightsTitle: "افهم غرض كل قناة بنظرة واحدة.",
    highlightsDesc:
      "صُممت هذه الصفحة كطبقة رقمية للعلامة وليست قائمة روابط بسيطة. تعرض الكتل أدناه نوع القيمة التي يقدمها كل قناة اجتماعية.",
    highlights: [
      {
        title: "الثقة المؤسسية",
        description:
          "المكان المناسب للمراجع، والظهور في الفعاليات، وأخبار الشركة، والتواصل في الشبكة المهنية.",
        stat: "تركيز مؤسسي",
      },
      {
        title: "سرد هندسي",
        description:
          "تدفق يعتمد على الفيديو لشرح المنتج والسرد التقني واستهلاك أعمق للمحتوى.",
        stat: "تركيز فيديو",
      },
      {
        title: "تقسيم السوق",
        description:
          "حسابات منفصلة لتركيا والعالم تسمح لكل جمهور بمتابعة العلامة بإيقاعه.",
        stat: "تركيز إقليمي",
      },
    ],
    sectionLabel: "اختيار القناة",
    sectionTitle: "ادخل إلى التدفق الاجتماعي المناسب لاحتياجك.",
    sectionDesc:
      "البطاقات تعرض أكثر من المنصة؛ تشير أيضًا إلى النبرة ونوع المحتوى وما تتوقعه بعد النقر.",
    externalNote: "تفتح جميع الروابط في علامة تبويب جديدة.",
    footerLabel: "الخطوة التالية",
    footerTitle: "انتقل من الرؤية الاجتماعية إلى تواصل مباشر حول المشروع.",
    footerDesc:
      "للاستكشاف أو الاستشارة التقنية أو توجيه المنتج، تواصل مباشرة مع فريقنا. القنوات الاجتماعية تبني الألفة، لكن زخم المشروع يبدأ بالتواصل المباشر.",
    footerPrimary: "نموذج الاتصال",
    footerSecondary: "شركاؤنا",
    platforms: {
      linkedin: {
        eyebrow: "LinkedIn تركيا",
        summary:
          "الواجهة الرئيسية للتحديثات المؤسسية الموجهة لتركيا وأخبار المشاريع والتواصل في الشبكة المهنية.",
        tags: ["مراجع", "أخبار الشركة"],
      },
      linkedinGlobal: {
        eyebrow: "LinkedIn العالمي",
        summary:
          "طبقة LinkedIn منفصلة للرؤية الدولية ولغة الأعمال العالمية والسرد المؤسسي الخارجي.",
        tags: ["شبكة عالمية", "تواصل مؤسسي"],
      },
      youtube: {
        eyebrow: "قناة فيديو",
        summary:
          "مخصصة لمن يريد استكشاف سلوك المنتج والمحتوى الهندسي بتنسيق أعمق.",
        tags: ["فيديوهات المنتج", "شروحات تقنية"],
      },
      facebook: {
        eyebrow: "خلاصة المجتمع",
        summary:
          "قناة داعمة لرؤية اجتماعية أوسع والإعلانات وتحديثات العلامة المستمرة.",
        tags: ["إعلانات", "وصول للمجتمع"],
      },
      instagramTr: {
        eyebrow: "حساب تركيا",
        summary:
          "تدفق Novves أكثر دفئًا وفورية وبصريًا بلغة السوق المحلي.",
        tags: ["محتوى محلي", "واجهة بصرية"],
      },
      instagramGlobal: {
        eyebrow: "حساب عالمي",
        summary:
          "قناة مميزة للسرد الدولي ورؤية العلامة والحضور لجمهور عالمي.",
        tags: ["واجهة عالمية", "صوت العلامة"],
      },
    },
  },
  de: {
    heroKicker: "Digitale Präsenz",
    heroLead:
      "Wir bündeln Unternehmensupdates, Produktvideos und Feldgeschichten in einer klaren Social-Schicht. Jeder Kanal hat eine spezifische Aufgabe; diese Seite macht diese Struktur sofort lesbar.",
    stats: [
      { value: "6", label: "aktive Kanäle" },
      { value: "TR + Global", label: "Marktfokus" },
      { value: "Corporate + Product", label: "Inhaltsachse" },
    ],
    primaryCta: "Zurück zur Kontaktseite",
    secondaryCta: "Unsere Partner ansehen",
    previewEyebrow: "Publishing-Architektur",
    previewTitle: "Jeder Kanal spielt eine andere Rolle.",
    previewDesc:
      "Die LinkedIn-Konten für die Türkei und global tragen die Unternehmensgeschichte in unterschiedlichen Größen, Facebook unterstützt eine breitere Sichtbarkeit, YouTube vertieft Produkt- und Engineering-Narrative, und Instagram-Konten machen den Markenrhythmus für verschiedene Zielgruppen sichtbar.",
    previewCards: [
      {
        label: "Unternehmensnarrativ",
        title: "Team-, Marken- und Referenzgeschichten",
        stat: "LinkedIn TR / Global / Facebook",
      },
      {
        label: "Technische Inhalte",
        title: "Video, Demos und produktzentrierte Erklärungen",
        stat: "YouTube",
      },
      {
        label: "Live-Flow",
        title: "Getrennte Social-Vitrine für die Türkei und globale Märkte",
        stat: "Instagram",
      },
    ],
    highlightsLabel: "Inhaltskarte",
    highlightsTitle: "Verstehen Sie auf einen Blick, wofür jeder Kanal da ist.",
    highlightsDesc:
      "Diese Seite ist als digitale Markenschicht konzipiert, nicht als einfache Linkliste. Die Blöcke unten zeigen, welchen Wert jeder Social-Kanal liefert.",
    highlights: [
      {
        title: "Unternehmensvertrauen",
        description:
          "Der richtige Ort für Referenzen, Event-Sichtbarkeit, Firmennews und professionelles Netzwerken.",
        stat: "Corporate-Fokus",
      },
      {
        title: "Engineering-Storytelling",
        description:
          "Ein videozentrierter Flow für Produkterklärer, technische Narrative und tieferen Konsum.",
        stat: "Video-Fokus",
      },
      {
        title: "Markt-Split",
        description:
          "Getrennte Türkei- und Global-Konten erlauben es jeder Zielgruppe, die Marke im eigenen Tempo zu folgen.",
        stat: "Regionaler Fokus",
      },
    ],
    sectionLabel: "Kanalauswahl",
    sectionTitle: "Wechseln Sie in den passenden Social-Stream für Ihr Anliegen.",
    sectionDesc:
      "Die Karten zeigen mehr als die Plattform; sie signalisieren Ton, Inhaltstyp und Erwartung nach dem Klick.",
    externalNote: "Alle Links öffnen in einem neuen Tab.",
    footerLabel: "Nächster Schritt",
    footerTitle: "Von Social-Sichtbarkeit zum direkten Projekt-Kontakt.",
    footerDesc:
      "Für Discovery, technische Beratung oder Produktführung kontaktieren Sie unser Team direkt. Social-Kanäle schaffen Vertrautheit, Projektdynamik startet mit direkter Kommunikation.",
    footerPrimary: "Kontaktformular",
    footerSecondary: "Unsere Partner",
    platforms: {
      linkedin: {
        eyebrow: "LinkedIn Türkei",
        summary:
          "Die Hauptvitrine für türkeifokussierte Updates, Projektnews und professionelles Networking.",
        tags: ["Referenzen", "Unternehmensnews"],
      },
      linkedinGlobal: {
        eyebrow: "Globales LinkedIn",
        summary:
          "Eine separate LinkedIn-Schicht für internationale Sichtbarkeit, globale Business-Sprache und nach außen gerichtetes Storytelling.",
        tags: ["Globales Netzwerk", "Unternehmenskommunikation"],
      },
      youtube: {
        eyebrow: "Video-Kanal",
        summary:
          "Für alle, die Produktverhalten und Engineering-Inhalte tiefer erkunden möchten.",
        tags: ["Produktvideos", "Technische Erklärungen"],
      },
      facebook: {
        eyebrow: "Community-Feed",
        summary:
          "Ein unterstützender Kanal für breitere Sichtbarkeit, Ankündigungen und laufende Markenupdates.",
        tags: ["Ankündigungen", "Community-Reichweite"],
      },
      instagramTr: {
        eyebrow: "Türkei-Konto",
        summary:
          "Ein wärmeres, schnelleres und visuelleres Novves-Flow in der Sprache des lokalen Marktes.",
        tags: ["Lokale Inhalte", "Visuelle Vitrine"],
      },
      instagramGlobal: {
        eyebrow: "Globales Konto",
        summary:
          "Ein eigener Kanal für internationales Storytelling, Markensichtbarkeit und globale Zielgruppen.",
        tags: ["Globale Vitrine", "Markenstimme"],
      },
    },
  },
  it: {
    heroKicker: "Presenza digitale",
    heroLead:
      "Abbiamo raccolto aggiornamenti aziendali, video di prodotto e narrazioni sul campo in un unico strato social chiaro. Ogni canale ha un compito specifico; questa pagina rende quella struttura immediatamente leggibile.",
    stats: [
      { value: "6", label: "canali attivi" },
      { value: "TR + Global", label: "focus di mercato" },
      { value: "Corporate + Product", label: "asse dei contenuti" },
    ],
    primaryCta: "Torna alla pagina contatti",
    secondaryCta: "Vedi i nostri partner",
    previewEyebrow: "Architettura editoriale",
    previewTitle: "Ogni canale svolge un ruolo diverso.",
    previewDesc:
      "Gli account LinkedIn Turchia e global portano la storia aziendale a scale diverse, Facebook supporta una visibilità social più ampia, YouTube approfondisce la narrativa prodotto e ingegneristica, e Instagram rende visibile il ritmo del brand per pubblici diversi.",
    previewCards: [
      {
        label: "Narrativa corporate",
        title: "Storie di team, brand e referenze",
        stat: "LinkedIn TR / Global / Facebook",
      },
      {
        label: "Contenuti tecnici",
        title: "Video, demo e spiegazioni orientate al prodotto",
        stat: "YouTube",
      },
      {
        label: "Flusso live",
        title: "Vetrina social separata per Turchia e mercati globali",
        stat: "Instagram",
      },
    ],
    highlightsLabel: "Mappa dei contenuti",
    highlightsTitle: "Capisci a colpo d’occhio a cosa serve ogni canale.",
    highlightsDesc:
      "Questa pagina è pensata come strato digitale del brand, non come semplice elenco di link. I blocchi sotto mostrano il valore che ogni canale social offre.",
    highlights: [
      {
        title: "Fiducia corporate",
        description:
          "Il posto giusto per referenze, visibilità eventi, notizie aziendali e comunicazione sulla rete professionale.",
        stat: "Focus corporate",
      },
      {
        title: "Storytelling ingegneristico",
        description:
          "Un flusso video-first per spiegazioni prodotto, narrazioni tecniche e consumo più profondo.",
        stat: "Focus video",
      },
      {
        title: "Split di mercato",
        description:
          "Account separati per Turchia e globo permettono a ogni audience di seguire il brand al proprio ritmo.",
        stat: "Focus regionale",
      },
    ],
    sectionLabel: "Selezione canale",
    sectionTitle: "Entra nel flusso social giusto per la tua esigenza.",
    sectionDesc:
      "Le schede mostrano più della piattaforma; segnalano tono, tipo di contenuto e cosa aspettarsi dopo il clic.",
    externalNote: "Tutti i link si aprono in una nuova scheda.",
    footerLabel: "Passo successivo",
    footerTitle: "Dalla visibilità social al contatto diretto sul progetto.",
    footerDesc:
      "Per discovery, consulenza tecnica o orientamento prodotto, contatta direttamente il nostro team. I social creano familiarità; lo slancio del progetto nasce dalla comunicazione diretta.",
    footerPrimary: "Modulo di contatto",
    footerSecondary: "I nostri partner",
    platforms: {
      linkedin: {
        eyebrow: "LinkedIn Turchia",
        summary:
          "La vetrina principale per aggiornamenti corporate sulla Turchia, notizie di progetto e networking professionale.",
        tags: ["Referenze", "Notizie aziendali"],
      },
      linkedinGlobal: {
        eyebrow: "LinkedIn globale",
        summary:
          "Uno strato LinkedIn separato per visibilità internazionale, linguaggio business globale e storytelling corporate verso l’esterno.",
        tags: ["Rete globale", "Comunicazione corporate"],
      },
      youtube: {
        eyebrow: "Canale video",
        summary:
          "Pensato per chi vuole esplorare il comportamento del prodotto e i contenuti ingegneristici in profondità.",
        tags: ["Video prodotto", "Spiegazioni tecniche"],
      },
      facebook: {
        eyebrow: "Feed community",
        summary:
          "Canale di supporto per maggiore visibilità social, annunci e aggiornamenti brand continui.",
        tags: ["Annunci", "Portata community"],
      },
      instagramTr: {
        eyebrow: "Account Turchia",
        summary:
          "Un flusso Novves più caldo, immediato e visivo nella lingua del mercato locale.",
        tags: ["Contenuti locali", "Vetrina visiva"],
      },
      instagramGlobal: {
        eyebrow: "Account globale",
        summary:
          "Un canale distinto per storytelling internazionale, visibilità del brand e pubblico globale.",
        tags: ["Vetrina globale", "Voce del brand"],
      },
    },
  },
  fr: {
    heroKicker: "Présence numérique",
    heroLead:
      "Nous avons réuni les actualités corporate, les vidéos produit et les récits terrain dans une couche sociale claire. Chaque canal a un rôle précis ; cette page rend cette structure immédiatement lisible.",
    stats: [
      { value: "6", label: "canaux actifs" },
      { value: "TR + Global", label: "focus marché" },
      { value: "Corporate + Product", label: "axe contenu" },
    ],
    primaryCta: "Retour à la page contact",
    secondaryCta: "Voir nos partenaires",
    previewEyebrow: "Architecture éditoriale",
    previewTitle: "Chaque canal joue un rôle différent.",
    previewDesc:
      "Les comptes LinkedIn Turquie et mondiaux portent le récit corporate à différentes échelles, Facebook soutient une visibilité sociale plus large, YouTube approfondit le récit produit et ingénierie, et Instagram rend visible le rythme de marque pour différents publics.",
    previewCards: [
      {
        label: "Récit corporate",
        title: "Histoires d’équipe, de marque et de références",
        stat: "LinkedIn TR / Global / Facebook",
      },
      {
        label: "Contenu technique",
        title: "Vidéo, démos et explications centrées produit",
        stat: "YouTube",
      },
      {
        label: "Flux en direct",
        title: "Vitrine social séparée pour la Turquie et les marchés mondiaux",
        stat: "Instagram",
      },
    ],
    highlightsLabel: "Carte des contenus",
    highlightsTitle: "Comprenez en un coup d’œil l’usage de chaque canal.",
    highlightsDesc:
      "Cette page est conçue comme une couche de marque numérique, pas comme une simple liste de liens. Les blocs ci-dessous montrent la valeur apportée par chaque canal social.",
    highlights: [
      {
        title: "Confiance corporate",
        description:
          "Le bon endroit pour les références, la visibilité événementielle, les actualités d’entreprise et le réseau professionnel.",
        stat: "Focus corporate",
      },
      {
        title: "Storytelling ingénierie",
        description:
          "Un flux vidéo d’abord pour les explications produit, les récits techniques et une consommation plus profonde.",
        stat: "Focus vidéo",
      },
      {
        title: "Découpage marché",
        description:
          "Des comptes Turquie et monde séparés permettent à chaque audience de suivre la marque à son rythme.",
        stat: "Focus régional",
      },
    ],
    sectionLabel: "Choix du canal",
    sectionTitle: "Entrez dans le flux social adapté à votre besoin.",
    sectionDesc:
      "Les cartes montrent plus que la plateforme ; elles signalent le ton, le type de contenu et ce qui vous attend après le clic.",
    externalNote: "Tous les liens s’ouvrent dans un nouvel onglet.",
    footerLabel: "Étape suivante",
    footerTitle: "Passer de la visibilité sociale au contact direct projet.",
    footerDesc:
      "Pour découverte, conseil technique ou orientation produit, contactez directement notre équipe. Les réseaux créent la familiarité ; l’élan projet naît de la communication directe.",
    footerPrimary: "Formulaire de contact",
    footerSecondary: "Nos partenaires",
    platforms: {
      linkedin: {
        eyebrow: "LinkedIn Turquie",
        summary:
          "La vitrine principale pour les mises à jour corporate centrées Turquie, les nouvelles de projets et le réseau professionnel.",
        tags: ["Références", "Actualités entreprise"],
      },
      linkedinGlobal: {
        eyebrow: "LinkedIn global",
        summary:
          "Une couche LinkedIn distincte pour la visibilité internationale, le langage business global et le storytelling corporate externe.",
        tags: ["Réseau global", "Communication corporate"],
      },
      youtube: {
        eyebrow: "Chaîne vidéo",
        summary:
          "Pensée pour explorer le comportement produit et le contenu ingénierie plus en profondeur.",
        tags: ["Vidéos produit", "Explications techniques"],
      },
      facebook: {
        eyebrow: "Fil communautaire",
        summary:
          "Canal d’appui pour une visibilité sociale plus large, les annonces et les mises à jour de marque.",
        tags: ["Annonces", "Portée communauté"],
      },
      instagramTr: {
        eyebrow: "Compte Turquie",
        summary:
          "Un flux Novves plus chaleureux, immédiat et visuel dans la langue du marché local.",
        tags: ["Contenu local", "Vitrine visuelle"],
      },
      instagramGlobal: {
        eyebrow: "Compte global",
        summary:
          "Un canal distinct pour le récit international, la visibilité de marque et le public mondial.",
        tags: ["Vitrine globale", "Voix de marque"],
      },
    },
  },
  az: {
    heroKicker: "Rəqəmsal mövcudluq",
    heroLead:
      "Korporativ yeniləmələri, məhsul videolarını və sahə hekayələrini tək aydın sosial qatda topladıq. Hər kanalın öz vəzifəsi var; bu səhifə həmin strukturu dərhal oxunaqlı edir.",
    stats: [
      { value: "6", label: "aktiv kanal" },
      { value: "TR + Global", label: "bazar fokusu" },
      { value: "Corporate + Product", label: "məzmun oxu" },
    ],
    primaryCta: "Əlaqə səhifəsinə qayıt",
    secondaryCta: "Tərəfdaşlarımıza bax",
    previewEyebrow: "Yayımlama arxitekturası",
    previewTitle: "Hər kanal fərqli rol oynayır.",
    previewDesc:
      "Türkiyə və qlobal LinkedIn hesabları korporativ hekayəni müxtəlif miqyaslarda daşıyır, Facebook daha geniş sosial görünüşü dəstəkləyir, YouTube məhsul və mühəndislik hekayəsini dərinləşdirir, Instagram hesabları isə müxtəlif auditoriyalar üçün brend ritmini görünür edir.",
    previewCards: [
      {
        label: "Korporativ hekayə",
        title: "Komanda, brend və istinad hekayələri",
        stat: "LinkedIn TR / Global / Facebook",
      },
      {
        label: "Texniki məzmun",
        title: "Video, demo və məhsul mərkəzli izahlar",
        stat: "YouTube",
      },
      {
        label: "Canlı axın",
        title: "Türkiyə və qlobal bazarlar üçün ayrılmış sosial vitrin",
        stat: "Instagram",
      },
    ],
    highlightsLabel: "Məzmun xəritəsi",
    highlightsTitle: "Bir baxışda hər kanalın nəyə xidmət etdiyini anlayın.",
    highlightsDesc:
      "Bu səhifə sadə link siyahısı deyil, rəqəmsal brend qatı kimi qurulub. Aşağıdakı bloklar hər sosial kanalın hansı dəyəri verdiyini göstərir.",
    highlights: [
      {
        title: "Korporativ etibar",
        description:
          "İstinadlar, tədbir görünüşü, şirkət xəbərləri və peşəkar şəbəkə ünsiyyəti üçün düzgün məkan.",
        stat: "Korporativ fokus",
      },
      {
        title: "Mühəndislik hekayəsi",
        description:
          "Məhsul izahları, texniki hekayələr və daha dərin məzmun üçün video mərkəzli axın.",
        stat: "Video fokus",
      },
      {
        title: "Bazar bölünməsi",
        description:
          "Türkiyə və qlobal ayrı hesablar hər auditoriyaya öz ritmi ilə brendi izləməyə imkan verir.",
        stat: "Regional fokus",
      },
    ],
    sectionLabel: "Kanal seçimi",
    sectionTitle: "Ehtiyacınıza uyğun düzgün sosial axına daxil olun.",
    sectionDesc:
      "Kartlar yalnız platformanı göstərmir; tonu, məzmun növünü və klikdən sonra nə gözlədiyinizi də bildirir.",
    externalNote: "Bütün linklər yeni vərəqdə açılır.",
    footerLabel: "Növbəti addım",
    footerTitle: "Sosial görünüşdən birbaşa layihə əlaqəsinə keçin.",
    footerDesc:
      "Kəşf, texniki məsləhət və ya məhsul istiqaməti üçün komandamızla birbaşa əlaqə saxlayın. Sosial kanallar tanışlıq yaradır; layihə impulsu birbaşa ünsiyyətlə başlayır.",
    footerPrimary: "Əlaqə forması",
    footerSecondary: "Tərəfdaşlarımız",
    platforms: {
      linkedin: {
        eyebrow: "LinkedIn Türkiyə",
        summary:
          "Türkiyəyə yönəlmiş korporativ yeniləmələr, layihə xəbərləri və peşəkar şəbəkə ünsiyyəti üçün əsas vitrin.",
        tags: ["İstinadlar", "Şirkət xəbərləri"],
      },
      linkedinGlobal: {
        eyebrow: "Qlobal LinkedIn",
        summary:
          "Beynəlxalq görünüş, qlobal biznes dili və xaricə yönəlmiş korporativ hekayə üçün ayrıca LinkedIn qatı.",
        tags: ["Qlobal şəbəkə", "Korporativ ünsiyyət"],
      },
      youtube: {
        eyebrow: "Video kanalı",
        summary:
          "Məhsul davranışı və mühəndislik məzmununu daha uzun formatda araşdırmaq istəyənlər üçün.",
        tags: ["Məhsul videoları", "Texniki izahlar"],
      },
      facebook: {
        eyebrow: "İcma axını",
        summary:
          "Daha geniş sosial görünüş, elanlar və davamlı brend yeniləmələri üçün dəstək kanalı.",
        tags: ["Elanlar", "İcma çatı"],
      },
      instagramTr: {
        eyebrow: "Türkiyə hesabı",
        summary:
          "Yerli bazar dili ilə daha isti, daha ani və daha vizual Novves axını.",
        tags: ["Yerli məzmun", "Vizual vitrin"],
      },
      instagramGlobal: {
        eyebrow: "Qlobal hesab",
        summary:
          "Beynəlxalq hekayə, brend görünüşü və qlobal auditoriya üçün ayrıca kanal.",
        tags: ["Qlobal vitrin", "Brend səsi"],
      },
    },
  },
  lt: {
    heroKicker: "Skaitmeninis buvimas",
    heroLead:
      "Surinkome įmonės naujienas, produktų vaizdo įrašus ir lauko istorijas į vieną aiškų socialinį sluoksnį. Kiekvienas kanalas turi konkrečią užduotį; šis puslapis iš karto padaro struktūrą skaitomą.",
    stats: [
      { value: "6", label: "aktyvūs kanalai" },
      { value: "TR + Global", label: "rinkos fokusas" },
      { value: "Corporate + Product", label: "turinio ašis" },
    ],
    primaryCta: "Grįžti į kontaktų puslapį",
    secondaryCta: "Peržiūrėti partnerius",
    previewEyebrow: "Publikavimo architektūra",
    previewTitle: "Kiekvienas kanalas atlieka skirtingą vaidmenį.",
    previewDesc:
      "Turkijos ir pasaulio „LinkedIn“ paskyros perduoda įmonės istoriją skirtingu mastu, „Facebook“ palaiko platesnį socialinį matomumą, „YouTube“ gilinasi į produktų ir inžinerijos pasakojimą, o „Instagram“ paskyros rodo prekės ženklo ritmą skirtingoms auditorijoms.",
    previewCards: [
      {
        label: "Įmonės pasakojimas",
        title: "Komandos, prekės ženklo ir atsiliepimų istorijos",
        stat: "LinkedIn TR / Global / Facebook",
      },
      {
        label: "Techninis turinys",
        title: "Vaizdo įrašai, demonstracijos ir produktu grįstos paaiškinimai",
        stat: "YouTube",
      },
      {
        label: "Tiesioginis srautas",
        title: "Atskira socialinė vitrina Turkijai ir pasaulinėms rinkoms",
        stat: "Instagram",
      },
    ],
    highlightsLabel: "Turinio žemėlapis",
    highlightsTitle: "Vienu žvilgsniu supraskite, kam skirtas kiekvienas kanalas.",
    highlightsDesc:
      "Šis puslapis sukurtas kaip skaitmeninis prekės ženklo sluoksnis, o ne paprastas nuorodų sąrašas. Žemiau esantys blokai rodo, kokį vertę teikia kiekvienas socialinis kanalas.",
    highlights: [
      {
        title: "Įmonės pasitikėjimas",
        description:
          "Vieta atsiliepimams, renginių matomumui, įmonės naujienoms ir profesionaliam tinklų bendravimui.",
        stat: "Įmonės fokusas",
      },
      {
        title: "Inžinerinis pasakojimas",
        description:
          "Pirmiausia vaizdo srautas produktų paaiškinimams, techniniams pasakojimams ir gilesniam turiniui.",
        stat: "Vaizdo fokusas",
      },
      {
        title: "Rinkos skaidymas",
        description:
          "Atskirtos Turkijos ir pasaulio paskyros leidžia kiekvienai auditorijai sekti prekės ženklu savo tempu.",
        stat: "Regioninis fokusas",
      },
    ],
    sectionLabel: "Kanalo pasirinkimas",
    sectionTitle: "Įeikite į tinkamą socialinį srautą pagal savo poreikį.",
    sectionDesc:
      "Kortelės rodo ne tik platformą; jos signalizuoja toną, turinio tipą ir ką tikėtis po paspaudimo.",
    externalNote: "Visos nuorodos atidaromos naujame skirtuke.",
    footerLabel: "Kitas žingsnis",
    footerTitle: "Nuo socialinio matomumo prie tiesioginio projekto kontakto.",
    footerDesc:
      "Aptikimui, techninei konsultacijai ar produkto orientacijai tiesiogiai susisiekite su mūsų komanda. Socialiniai kanalai kuria pažinumą; projekto impulsas prasideda tiesioginiu bendravimu.",
    footerPrimary: "Kontaktų forma",
    footerSecondary: "Mūsų partneriai",
    platforms: {
      linkedin: {
        eyebrow: "LinkedIn Turkija",
        summary:
          "Pagrindinė vitrina Turkijai skirtoms įmonės naujienoms, projektų žinioms ir profesionaliam tinklų bendravimui.",
        tags: ["Atsiliepimai", "Įmonės naujienos"],
      },
      linkedinGlobal: {
        eyebrow: "Pasaulinis LinkedIn",
        summary:
          "Atskiras „LinkedIn“ sluoksnis tarptautiniam matomumui, pasaulinei verslo kalbai ir į išorę nukreiptam pasakojimui.",
        tags: ["Pasaulinis tinklas", "Įmonės komunikacija"],
      },
      youtube: {
        eyebrow: "Vaizdo kanalas",
        summary:
          "Tiems, kurie nori giliau nagrinėti produkto elgseną ir inžinerinį turinį.",
        tags: ["Produkto vaizdo įrašai", "Techniniai paaiškinimai"],
      },
      facebook: {
        eyebrow: "Bendruomenės srautas",
        summary:
          "Palaikantis kanalas platesniam socialiniam matomumui, pranešimams ir nuolatiniams prekės ženklo atnaujinimams.",
        tags: ["Pranešimai", "Bendruomenės pasiekiamumas"],
      },
      instagramTr: {
        eyebrow: "Turkijos paskyra",
        summary:
          "Šiltesnis, greitesnis ir vizualiau „Novves“ srautas vietos rinkos kalba.",
        tags: ["Vietinis turinys", "Vizualinė vitrina"],
      },
      instagramGlobal: {
        eyebrow: "Pasaulinė paskyra",
        summary:
          "Atskiras kanalas tarptautiniam pasakojimui, prekės ženklo matomumui ir pasaulinei auditorijai.",
        tags: ["Pasaulinė vitrina", "Prekės ženklo balsas"],
      },
    },
  },
  pl: {
    heroKicker: "Obecność cyfrowa",
    heroLead:
      "Zebraliśmy aktualizacje firmowe, filmy produktowe i historie z terenu w jedną czytelną warstwę społecznościową. Każdy kanał ma konkretne zadanie; ta strona od razu uwidacznia tę strukturę.",
    stats: [
      { value: "6", label: "aktywne kanały" },
      { value: "TR + Global", label: "fokus rynku" },
      { value: "Corporate + Product", label: "oś treści" },
    ],
    primaryCta: "Wróć do strony kontaktu",
    secondaryCta: "Zobacz naszych partnerów",
    previewEyebrow: "Architektura publikacji",
    previewTitle: "Każdy kanał pełni inną rolę.",
    previewDesc:
      "Konta LinkedIn w Turcji i globalnie niosą narrację firmową w różnych skalach, Facebook wspiera szerszą widoczność społeczną, YouTube pogłębia narrację produktową i inżynierską, a Instagram pokazuje rytm marki różnym odbiorcom.",
    previewCards: [
      {
        label: "Narracja firmowa",
        title: "Historie zespołu, marki i referencji",
        stat: "LinkedIn TR / Global / Facebook",
      },
      {
        label: "Treści techniczne",
        title: "Wideo, demo i wyjaśnienia zorientowane na produkt",
        stat: "YouTube",
      },
      {
        label: "Na żywo",
        title: "Osobna witryna społecznościowa na Turcję i rynki globalne",
        stat: "Instagram",
      },
    ],
    highlightsLabel: "Mapa treści",
    highlightsTitle: "Zrozum jednym rzutem oka, do czego służy każdy kanał.",
    highlightsDesc:
      "Ta strona jest warstwą cyfrowej marki, a nie zwykłą listą linków. Poniższe bloki pokazują, jaką wartość daje każdy kanał społecznościowy.",
    highlights: [
      {
        title: "Zaufanie firmowe",
        description:
          "Właściwe miejsce na referencje, widoczność na wydarzeniach, wiadomości firmowe i komunikację w sieci zawodowej.",
        stat: "Fokus firmowy",
      },
      {
        title: "Storytelling inżynierski",
        description:
          "Strumień oparty na wideo dla wyjaśnień produktu, narracji technicznej i głębszego odbioru treści.",
        stat: "Fokus wideo",
      },
      {
        title: "Podział rynku",
        description:
          "Oddzielne konta na Turcję i świat pozwalają każdej grupie odbiorców śledzić markę we własnym tempie.",
        stat: "Fokus regionalny",
      },
    ],
    sectionLabel: "Wybór kanału",
    sectionTitle: "Wejdź we właściwy strumień społecznościowy dla swojej potrzeby.",
    sectionDesc:
      "Karty pokazują więcej niż platformę; sygnalizują ton, typ treści i czego spodziewać się po kliknięciu.",
    externalNote: "Wszystkie linki otwierają się w nowej karcie.",
    footerLabel: "Następny krok",
    footerTitle: "Od widoczności społecznej do bezpośredniego kontaktu projektowego.",
    footerDesc:
      "W sprawie odkrycia, konsultacji technicznych lub doboru produktu skontaktuj się bezpośrednio z naszym zespołem. Kanały społecznościowe budują znajomość marki; dynamika projektu zaczyna się od bezpośredniej komunikacji.",
    footerPrimary: "Formularz kontaktowy",
    footerSecondary: "Nasi partnerzy",
    platforms: {
      linkedin: {
        eyebrow: "LinkedIn Turcja",
        summary:
          "Główna witryna dla aktualizacji firmowych skupionych na Turcji, wiadomości o projektach i komunikacji zawodowej.",
        tags: ["Referencje", "Wiadomości firmowe"],
      },
      linkedinGlobal: {
        eyebrow: "Globalny LinkedIn",
        summary:
          "Osobna warstwa LinkedIn na widoczność międzynarodową, globalny język biznesu i narrację firmową na zewnątrz.",
        tags: ["Sieć globalna", "Komunikacja firmowa"],
      },
      youtube: {
        eyebrow: "Kanał wideo",
        summary:
          "Dla osób, które chcą dogłębniej poznać zachowanie produktu i treści inżynierskie.",
        tags: ["Filmy produktowe", "Wyjaśnienia techniczne"],
      },
      facebook: {
        eyebrow: "Feed społeczności",
        summary:
          "Kanał wspierający szerszą widoczność społeczną, ogłoszenia i bieżące aktualizacje marki.",
        tags: ["Ogłoszenia", "Zasięg społeczności"],
      },
      instagramTr: {
        eyebrow: "Konto Turcja",
        summary:
          "Cieplejszy, bardziej natychmiastowy i wizualny przepływ Novves w języku lokalnego rynku.",
        tags: ["Treści lokalne", "Witryna wizualna"],
      },
      instagramGlobal: {
        eyebrow: "Konto globalne",
        summary:
          "Odrębny kanał na narrację międzynarodową, widoczność marki i globalną publiczność.",
        tags: ["Witryna globalna", "Głos marki"],
      },
    },
  },
};
