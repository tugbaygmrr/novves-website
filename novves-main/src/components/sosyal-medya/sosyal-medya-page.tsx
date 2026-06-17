"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HIZMETLER_PAGE_PADDING_TOP } from "@/lib/hizmetler/layout";
import type { SosyalMedyaHubJson } from "@/lib/sosyal-medya/copy";
import { getSosyalMedyaFeedPosts, type SosyalMedyaResolvedFeedPost } from "@/lib/sosyal-medya/feed";
import { SOSYAL_MEDYA_PLATFORMS } from "@/lib/sosyal-medya/platforms";
import type { SosyalMedyaCopy } from "@/lib/sosyal-medya/types";
import { PlatformIcon } from "./platform-icons";

type Props = {
  locale: string;
  copy: SosyalMedyaCopy;
  hub?: SosyalMedyaHubJson;
  feedPosts?: SosyalMedyaResolvedFeedPost[];
};

function ChannelCard({
  copy,
  platform,
}: {
  copy: SosyalMedyaCopy;
  platform: (typeof SOSYAL_MEDYA_PLATFORMS)[number];
}) {
  const ch = copy.channels[platform.id];

  return (
    <div className="sosyal-glass-card group relative overflow-hidden rounded-[1.5rem] p-6 transition-all sosyal-orange-glow-hover sm:rounded-[2rem] sm:p-8">
      <div className="mb-10 flex items-start justify-between">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl p-3 text-white ${platform.iconBgClass}`}
        >
          <PlatformIcon type={platform.icon} className="h-full w-full" />
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">{ch.label}</span>
      </div>
      <h3 className="mb-8 text-2xl font-black uppercase italic leading-tight text-white">
        {ch.titleLine1}
        <br />
        {ch.titleLine2}
      </h3>
      <div className="flex flex-col gap-3">
        <a
          href={platform.trHref}
          target="_blank"
          rel="noopener noreferrer"
          className="sosyal-glass-card group/btn flex items-center justify-between rounded-2xl border border-white/10 px-6 py-4 text-[11px] font-black uppercase tracking-widest text-white transition-all hover:border-hz-secondary-container hover:bg-hz-secondary-container"
        >
          {ch.trLink}
          <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">
            arrow_forward
          </span>
        </a>
        <a
          href={platform.globalHref}
          target="_blank"
          rel="noopener noreferrer"
          className="sosyal-glass-card group/btn flex items-center justify-between rounded-2xl border border-white/10 px-6 py-4 text-[11px] font-black uppercase tracking-widest text-white transition-all hover:border-hz-secondary-container hover:bg-hz-secondary-container"
        >
          {ch.globalLink}
          <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">
            arrow_forward
          </span>
        </a>
      </div>
    </div>
  );
}

type FeedPostData = SosyalMedyaResolvedFeedPost;

const NETWORK_LABEL: Record<string, string> = {
  tr: "Ağ", en: "Network", ru: "Сеть", ar: "شبكة", de: "Netzwerk", it: "Rete",
  fr: "Réseau", az: "Şəbəkə", kk: "Желі", tg: "Шабака", es: "Red", zh: "网络",
  ur: "نیٹ ورک", lt: "Tinklas", pl: "Sieć",
};

const SOCIAL_FEED_LABELS: Record<string, {
  stream: string;
  openPost: string;
  followAccount: string;
  latestPosts: string;
  captionFallback: string;
  comingSoon: string;
  comingSoonTitle: string;
  comingSoonDesc: string;
}> = {
  tr: {
    stream: "Sosyal Akış",
    openPost: "Paylaşımı Aç",
    followAccount: "Hesabı Aç",
    latestPosts: "Güncel Paylaşımlar",
    captionFallback: "NOVVES sosyal medya akışından proje, üretim ve saha notu.",
    comingSoon: "Yakında",
    comingSoonTitle: "Güncel sosyal medya akışı yakında burada",
    comingSoonDesc: "Bu alan novves.turkiye hesabındaki güncel paylaşımlar için hazırlanıyor.",
  },
  en: {
    stream: "Social Feed",
    openPost: "Open Post",
    followAccount: "Open Account",
    latestPosts: "Latest Posts",
    captionFallback: "A project, production and field note from the NOVVES social feed.",
    comingSoon: "Coming Soon",
    comingSoonTitle: "Latest social media feed will be here soon",
    comingSoonDesc: "This area is being prepared for the latest posts from novves.turkiye.",
  },
  ru: {
    stream: "Социальная лента",
    openPost: "Открыть публикацию",
    followAccount: "Открыть аккаунт",
    latestPosts: "Последние публикации",
    captionFallback: "Проектная, производственная или полевая заметка из социальной ленты NOVVES.",
    comingSoon: "Скоро",
    comingSoonTitle: "Актуальная лента соцсетей скоро появится здесь",
    comingSoonDesc: "Этот раздел готовится для новых публикаций аккаунта novves.turkiye.",
  },
  ar: {
    stream: "تدفق اجتماعي",
    openPost: "فتح المنشور",
    followAccount: "فتح الحساب",
    latestPosts: "أحدث المنشورات",
    captionFallback: "ملاحظة مشروع أو إنتاج أو موقع من تدفق NOVVES الاجتماعي.",
    comingSoon: "قريبًا",
    comingSoonTitle: "سيظهر تدفق وسائل التواصل الاجتماعي هنا قريبًا",
    comingSoonDesc: "يتم تجهيز هذه المنطقة للمنشورات الحديثة من حساب novves.turkiye.",
  },
  de: {
    stream: "Social Feed",
    openPost: "Beitrag öffnen",
    followAccount: "Account öffnen",
    latestPosts: "Aktuelle Beiträge",
    captionFallback: "Ein Projekt-, Produktions- oder Feldhinweis aus dem NOVVES Social Feed.",
    comingSoon: "Demnächst",
    comingSoonTitle: "Der aktuelle Social-Media-Feed erscheint bald hier",
    comingSoonDesc: "Dieser Bereich wird für aktuelle Beiträge des Kontos novves.turkiye vorbereitet.",
  },
  it: {
    stream: "Feed social",
    openPost: "Apri post",
    followAccount: "Apri account",
    latestPosts: "Post recenti",
    captionFallback: "Una nota di progetto, produzione o cantiere dal feed social NOVVES.",
    comingSoon: "Prossimamente",
    comingSoonTitle: "Il feed social aggiornato sarà presto qui",
    comingSoonDesc: "Questa area è in preparazione per i post recenti dell'account novves.turkiye.",
  },
  fr: {
    stream: "Flux social",
    openPost: "Ouvrir la publication",
    followAccount: "Ouvrir le compte",
    latestPosts: "Publications récentes",
    captionFallback: "Une note de projet, de production ou de terrain issue du flux social NOVVES.",
    comingSoon: "Bientôt",
    comingSoonTitle: "Le flux social actualisé apparaîtra bientôt ici",
    comingSoonDesc: "Cet espace est en préparation pour les publications récentes du compte novves.turkiye.",
  },
  az: {
    stream: "Sosial axın",
    openPost: "Paylaşımı aç",
    followAccount: "Hesabı aç",
    latestPosts: "Son paylaşımlar",
    captionFallback: "NOVVES sosial axınından layihə, istehsal və ya sahə qeydi.",
    comingSoon: "Tezliklə",
    comingSoonTitle: "Aktual sosial media axını tezliklə burada olacaq",
    comingSoonDesc: "Bu sahə novves.turkiye hesabının son paylaşımları üçün hazırlanır.",
  },
  kk: {
    stream: "Әлеуметтік лента",
    openPost: "Жазбаны ашу",
    followAccount: "Аккаунтты ашу",
    latestPosts: "Соңғы жазбалар",
    captionFallback: "NOVVES әлеуметтік лентасынан жоба, өндіріс немесе алаң жазбасы.",
    comingSoon: "Жақында",
    comingSoonTitle: "Жаңартылған әлеуметтік медиа лентасы жақында осында болады",
    comingSoonDesc: "Бұл бөлім novves.turkiye аккаунтындағы соңғы жазбалар үшін дайындалып жатыр.",
  },
  tg: {
    stream: "Ҷараёни иҷтимоӣ",
    openPost: "Кушодани пост",
    followAccount: "Кушодани ҳисоб",
    latestPosts: "Постҳои нав",
    captionFallback: "Ёддошти лоиҳа, истеҳсол ё майдон аз ҷараёни иҷтимоии NOVVES.",
    comingSoon: "Ба зудӣ",
    comingSoonTitle: "Ҷараёни нави шабакаҳои иҷтимоӣ ба зудӣ дар ин ҷо хоҳад буд",
    comingSoonDesc: "Ин бахш барои постҳои нави ҳисоби novves.turkiye омода мешавад.",
  },
  es: {
    stream: "Feed social",
    openPost: "Abrir publicación",
    followAccount: "Abrir cuenta",
    latestPosts: "Publicaciones recientes",
    captionFallback: "Una nota de proyecto, producción o campo del feed social de NOVVES.",
    comingSoon: "Próximamente",
    comingSoonTitle: "El feed social actualizado estará aquí pronto",
    comingSoonDesc: "Esta área se está preparando para las publicaciones recientes de la cuenta novves.turkiye.",
  },
  zh: {
    stream: "社交动态",
    openPost: "打开帖子",
    followAccount: "打开账号",
    latestPosts: "最新帖子",
    captionFallback: "来自 NOVVES 社交动态的项目、生产或现场记录。",
    comingSoon: "即将上线",
    comingSoonTitle: "最新社交媒体动态即将在此显示",
    comingSoonDesc: "此区域正在为 novves.turkiye 账号的最新帖子做准备。",
  },
  ur: {
    stream: "سوشل فیڈ",
    openPost: "پوسٹ کھولیں",
    followAccount: "اکاؤنٹ کھولیں",
    latestPosts: "تازہ پوسٹس",
    captionFallback: "NOVVES سوشل فیڈ سے پراجیکٹ، پیداوار یا سائٹ نوٹ۔",
    comingSoon: "جلد آرہا ہے",
    comingSoonTitle: "تازہ سوشل میڈیا فیڈ جلد یہاں ہوگی",
    comingSoonDesc: "یہ حصہ novves.turkiye اکاؤنٹ کی تازہ پوسٹس کے لیے تیار کیا جا رہا ہے۔",
  },
  lt: {
    stream: "Socialinis srautas",
    openPost: "Atidaryti įrašą",
    followAccount: "Atidaryti paskyrą",
    latestPosts: "Naujausi įrašai",
    captionFallback: "NOVVES socialinio srauto projekto, gamybos ar vietos įrašas.",
    comingSoon: "Netrukus",
    comingSoonTitle: "Naujausias socialinių tinklų srautas netrukus bus čia",
    comingSoonDesc: "Ši vieta ruošiama naujausiems novves.turkiye paskyros įrašams.",
  },
  pl: {
    stream: "Kanał społecznościowy",
    openPost: "Otwórz post",
    followAccount: "Otwórz konto",
    latestPosts: "Najnowsze posty",
    captionFallback: "Notatka projektowa, produkcyjna lub terenowa z kanału społecznościowego NOVVES.",
    comingSoon: "Wkrótce",
    comingSoonTitle: "Aktualny kanał social media wkrótce pojawi się tutaj",
    comingSoonDesc: "Ta sekcja jest przygotowywana dla najnowszych postów z konta novves.turkiye.",
  },
};

function feedPlatformForPost(post: FeedPostData) {
  if (post.platformId) {
    return SOSYAL_MEDYA_PLATFORMS.find((platform) => platform.id === post.platformId) ?? SOSYAL_MEDYA_PLATFORMS[0];
  }
  const platformId = post.id === "tall" || post.id === "square-3" ? "linkedin" : "instagram";
  return SOSYAL_MEDYA_PLATFORMS.find((platform) => platform.id === platformId) ?? SOSYAL_MEDYA_PLATFORMS[0];
}

function feedAccountName(platformId: string, locale: string): string {
  if (platformId === "linkedin") return locale === "tr" ? "NOVVES Türkiye" : "NOVVES Global";
  return locale === "tr" ? "@novves.turkiye" : "@novves.global";
}

function FeedPost({
  post,
  copy,
  locale,
  networkLabel,
}: {
  post: FeedPostData;
  copy: SosyalMedyaCopy;
  locale: string;
  networkLabel: string;
}) {
  const labels = SOCIAL_FEED_LABELS[locale] ?? SOCIAL_FEED_LABELS.en;
  const [imageLoaded, setImageLoaded] = useState(false);

  if (post.layout === "stats") {
    return (
      <div className="sosyal-orange-glow relative flex min-h-[16rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br from-hz-secondary-container to-[#ff8c00] p-6 sm:p-8 md:min-h-[18rem]">
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="relative z-10 flex items-start justify-between gap-3">
          <span className="material-symbols-outlined text-3xl text-white sm:text-4xl">language</span>
          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white/50">{networkLabel}</span>
        </div>
        <div className="relative z-10">
          <span className="mb-3 block text-[10px] font-black uppercase tracking-[0.24em] text-white/60">
            {labels.latestPosts}
          </span>
          <span className="block text-3xl font-black leading-none tracking-tighter text-white sm:text-4xl">
            {copy.statsValue}
          </span>
          <span className="mt-2 block text-[10px] font-bold uppercase leading-snug tracking-widest text-white/95 sm:text-xs">
            {copy.statsLabel}
          </span>
          <div className="mt-6 flex flex-wrap gap-2">
            {SOSYAL_MEDYA_PLATFORMS.slice(0, 2).map((platform) => (
              <a
                key={platform.id}
                href={locale === "tr" ? platform.trHref : platform.globalHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white transition hover:bg-white/25"
              >
                <PlatformIcon type={platform.icon} className="h-3.5 w-3.5" />
                {platform.id}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const badgeText =
    post.badge === "featured"
      ? copy.featuredPost
      : post.badge === "caseStudy"
        ? copy.caseStudy
        : post.badge;
  const platform = feedPlatformForPost(post);
  const href = post.permalink ?? (locale === "tr" ? platform.trHref : platform.globalHref);
  const account = post.username ? `@${post.username}` : feedAccountName(platform.id, locale);
  const isFeatured = post.layout === "featured";
  const caption = post.description ?? labels.captionFallback;
  const isInstagram = post.platformId === "instagram";

  return (
    <article
      className={`sosyal-glass-card group overflow-hidden rounded-[2rem] shadow-2xl transition-all sosyal-orange-glow-hover ${
        isFeatured ? "md:col-span-2" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full p-2 text-white ${platform.iconBgClass}`}>
            <PlatformIcon type={platform.icon} className="h-full w-full" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-black text-white">{account}</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/35">
              {labels.stream}
            </p>
          </div>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-white/10 px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-white/55 transition hover:border-hz-secondary-container hover:text-white"
        >
          {labels.followAccount}
        </a>
      </div>

      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        <div className={`relative w-full overflow-hidden bg-white/5 ${isFeatured ? "aspect-[16/10]" : "aspect-square"}`}>
          <div
            className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-500 ${
              imageLoaded ? "opacity-0" : "opacity-100"
            }`}
            aria-hidden
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/[0.035] to-hz-secondary-container/10" />
            <div className="absolute inset-y-0 -left-1/2 w-1/2 animate-[productMediaSkeleton_1.25s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          <Image
            src={post.image}
            alt={post.alt}
            fill
            unoptimized={isInstagram}
            onLoad={() => setImageLoaded(true)}
            className={`object-cover transition duration-700 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            sizes={isFeatured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {badgeText ? (
              <span className="rounded-full bg-hz-secondary-container px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-hz-on-primary">
                {badgeText}
              </span>
            ) : null}
            {post.year ? (
              <span className="rounded-full bg-hz-primary-container/85 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.18em] text-white">
                {post.year}
              </span>
            ) : null}
          </div>
        </div>
      </a>

      <div className="space-y-4 p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-5 text-sm text-white/58">
          {post.likes ? (
            <span className="flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined text-base text-hz-secondary-container">favorite</span>
              {post.likes}
            </span>
          ) : null}
          {post.comments ? (
            <span className="flex items-center gap-2 font-bold">
              <span className="material-symbols-outlined text-base text-hz-secondary-container">chat_bubble</span>
              {post.comments}
            </span>
          ) : null}
          <span className="flex items-center gap-2 font-bold">
            <span className="material-symbols-outlined text-base text-hz-secondary-container">share</span>
            {copy.share}
          </span>
        </div>
        {post.title ? (
          <h3 className="text-xl font-black uppercase italic leading-tight text-white sm:text-2xl">
            {post.title}
            {post.titleLine2 ? (
              <>
                <br />
                {post.titleLine2}
              </>
            ) : null}
          </h3>
        ) : null}
        <p className="line-clamp-4 text-sm leading-relaxed text-white/50">{caption}</p>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-hz-secondary-container transition hover:text-white"
        >
          {labels.openPost}
          <span className="material-symbols-outlined text-sm">open_in_new</span>
        </a>
      </div>
    </article>
  );
}

export function SosyalMedyaPage({ locale, copy, hub, feedPosts: feedPostsProp }: Props) {
  const feedPosts = feedPostsProp ?? getSosyalMedyaFeedPosts(locale, hub);
  const feedLabels = SOCIAL_FEED_LABELS[locale] ?? SOCIAL_FEED_LABELS.en;
  const hasLiveFeed = feedPosts.some((post) => post.platformId === "instagram");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <main className={`overflow-x-clip bg-[#0f172a] text-white ${HIZMETLER_PAGE_PADDING_TOP}`}>
        {/* Kanal seçimi */}
        <section className="mx-auto max-w-[1600px] px-4 pb-16 pt-8 sm:px-8">
          <nav className="mb-8 flex flex-wrap items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-white/40 sm:text-xs">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">
              {copy.breadcrumbHome}
            </Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <Link href={`/${locale}/iletisim`} className="transition-colors hover:text-white/70">
              {copy.breadcrumbContact}
            </Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-hz-secondary-container">{copy.breadcrumbSocialMedia}</span>
          </nav>

          <div className="mb-8 sm:mb-12">
            <h1 className="text-4xl font-black uppercase leading-none tracking-tight sm:text-5xl sm:tracking-tighter md:text-7xl lg:text-8xl">
              {copy.heroTitle1}{" "}
              <span className="italic text-hz-secondary-container">{copy.heroTitle2}</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg font-medium tracking-wide text-white/40">{copy.heroDesc}</p>
            <Link
              href={`/${locale}/iletisim`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-hz-secondary-container hover:text-white"
            >
              {copy.backToContact}
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {SOSYAL_MEDYA_PLATFORMS.map((platform) => (
              <ChannelCard key={platform.id} copy={copy} platform={platform} />
            ))}
          </div>
        </section>

        {/* Moments feed */}
        <section className="mx-auto max-w-[1600px] border-t border-white/5 px-4 py-16 sm:px-8 sm:py-24">
          <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:mb-16 sm:gap-8 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <h2 className="mb-4 text-3xl font-black uppercase tracking-tight sm:mb-6 sm:text-4xl sm:tracking-tighter md:text-6xl lg:text-7xl">
                {copy.momentsTitle1}{" "}
                <span className="italic text-hz-secondary-container">{copy.momentsTitle2}</span>
              </h2>
              <p className="text-lg font-medium text-white/40 sm:text-xl">{copy.momentsDesc}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {hasLiveFeed ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-hz-secondary-container px-6 py-4 text-xs font-black uppercase tracking-widest text-hz-on-primary shadow-lg shadow-hz-secondary/20">
                  <span className="material-symbols-outlined text-base">photo_library</span>
                  {feedLabels.latestPosts}
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-4 text-xs font-black uppercase tracking-widest text-white/45">
                  <span className="material-symbols-outlined text-base">schedule</span>
                  {feedLabels.comingSoon}
                </span>
              )}
              {SOSYAL_MEDYA_PLATFORMS.slice(0, 2).map((platform) => (
                <a
                  key={platform.id}
                  href={locale === "tr" ? platform.trHref : platform.globalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 px-6 py-4 text-xs font-bold uppercase tracking-widest text-white/60 transition-all hover:border-hz-secondary-container hover:text-white"
                >
                  <PlatformIcon type={platform.icon} className="h-4 w-4" />
                  {platform.id}
                </a>
              ))}
            </div>
          </div>

          {feedPosts.length > 0 ? (
            <div className="sosyal-insta-grid">
              {feedPosts.map((post) => (
                <FeedPost
                  key={post.id}
                  post={post}
                  copy={copy}
                  locale={locale}
                  networkLabel={NETWORK_LABEL[locale] ?? NETWORK_LABEL.en}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-start gap-4 border-l-2 border-hz-secondary-container/70 pl-5 sm:max-w-2xl sm:pl-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-hz-secondary-container/12 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-hz-secondary-container ring-1 ring-hz-secondary-container/25">
                <span className="material-symbols-outlined text-sm">schedule</span>
                {feedLabels.comingSoon}
              </span>
              <div>
                <h3 className="text-xl font-black uppercase italic tracking-tight text-white sm:text-2xl">
                  {feedLabels.comingSoonTitle}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/45 sm:text-base">
                  {feedLabels.comingSoonDesc}
                </p>
              </div>
              <a
                href="https://www.instagram.com/novves.turkiye/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-hz-secondary-container transition hover:text-white"
              >
                Instagram
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          )}
        </section>

        {/* Subscribe CTA */}
        <section className="px-4 py-12 sm:px-8 sm:py-16">
          <div className="sosyal-orange-glow relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-hz-primary-container px-6 py-10 text-center sm:px-10 sm:py-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-5"
              style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, #fe6a34 1px, transparent 0)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative z-10">
              <h2 className="mb-4 text-2xl font-black uppercase leading-tight tracking-tighter sm:text-3xl md:text-4xl">
                {copy.subscribeTitle1}{" "}
                <span className="italic text-hz-secondary-container">{copy.subscribeTitle2}</span>
              </h2>
              <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-white/50 sm:text-base">
                {copy.subscribeDesc}
              </p>
              <form
                className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!email.trim()) return;
                  setSubscribed(true);
                  setEmail("");
                  window.setTimeout(() => setSubscribed(false), 4000);
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={subscribed ? copy.subscribeSuccess : copy.subscribePlaceholder}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-white/30 focus:border-hz-secondary-container sm:py-3.5"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-hz-secondary-container px-6 py-3 text-xs font-black uppercase tracking-widest text-hz-on-primary shadow-lg shadow-hz-secondary/20 transition-all hover:brightness-110 sm:py-3.5"
                >
                  {copy.subscribeButton}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
