"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { HIZMETLER_PAGE_PADDING_TOP } from "@/lib/hizmetler/layout";
import type { SosyalMedyaHubJson } from "@/lib/sosyal-medya/copy";
import { getSosyalMedyaFeedPosts, type SosyalMedyaFeedItem } from "@/lib/sosyal-medya/feed";
import { SOSYAL_MEDYA_PLATFORMS } from "@/lib/sosyal-medya/platforms";
import type { SosyalMedyaCopy } from "@/lib/sosyal-medya/types";
import { PlatformIcon } from "./platform-icons";

type Props = {
  locale: string;
  copy: SosyalMedyaCopy;
  hub?: SosyalMedyaHubJson;
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

type FeedPostData = SosyalMedyaFeedItem & {
  alt: string;
  title?: string;
  titleLine2?: string;
  description?: string;
  likes?: string;
  comments?: string;
};

const NETWORK_LABEL: Record<string, string> = {
  tr: "Ağ", en: "Network", ru: "Сеть", ar: "شبكة", de: "Netzwerk", it: "Rete",
  fr: "Réseau", az: "Şəbəkə", kk: "Желі", tg: "Шабака", es: "Red", zh: "网络",
  ur: "نیٹ ورک", lt: "Tinklas", pl: "Sieć",
};

function FeedPost({ post, copy, networkLabel }: { post: FeedPostData; copy: SosyalMedyaCopy; networkLabel: string }) {
  if (post.layout === "stats") {
    return (
      <div className="sosyal-orange-glow relative flex min-h-[16rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-gradient-to-br from-hz-secondary-container to-[#ff8c00] p-6 sm:p-8 md:row-span-2 md:min-h-[18rem]">
        <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
        <div className="relative z-10 flex items-start justify-between gap-3">
          <span className="material-symbols-outlined text-3xl text-white sm:text-4xl">language</span>
          <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white/50">{networkLabel}</span>
        </div>
        <div className="relative z-10">
          <span className="block text-3xl font-black leading-none tracking-tighter text-white sm:text-4xl">
            {copy.statsValue}
          </span>
          <span className="mt-2 block text-[10px] font-bold uppercase leading-snug tracking-widest text-white/95 sm:text-xs">
            {copy.statsLabel}
          </span>
        </div>
      </div>
    );
  }

  const layoutClass =
    post.layout === "featured"
      ? "md:col-span-2 md:row-span-2 min-h-[20rem] md:min-h-[28rem]"
      : post.layout === "tall" || post.id === "square-3"
        ? "md:row-span-2 min-h-[18rem]"
        : "aspect-square min-h-[16rem]";

  const badgeText =
    post.badge === "featured"
      ? copy.featuredPost
      : post.badge === "caseStudy"
        ? copy.caseStudy
        : post.badge;

  return (
    <article
      className={`sosyal-post-card group relative cursor-pointer overflow-hidden rounded-[2rem] shadow-2xl ${layoutClass}`}
    >
      <Image
        src={post.image}
        alt={post.alt}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes={
          post.layout === "featured"
            ? "(max-width: 768px) 100vw, 66vw"
            : "(max-width: 768px) 100vw, 33vw"
        }
      />
      {post.year ? (
        <div className="absolute right-4 top-4 z-10 rounded bg-hz-primary-container px-3 py-1 text-xs font-bold text-white">
          {post.year}
        </div>
      ) : null}
      {post.layout === "featured" ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-hz-primary-container via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-0 left-0 w-full p-5 sm:p-12">
            {badgeText ? (
              <span className="mb-4 inline-block rounded-full bg-hz-secondary-container px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-hz-on-primary">
                {badgeText}
              </span>
            ) : null}
            {post.title ? (
              <h3 className="mb-4 text-2xl font-black leading-none text-white sm:text-4xl lg:text-5xl">
                {post.title}
                {post.titleLine2 ? (
                  <>
                    <br />
                    {post.titleLine2}
                  </>
                ) : null}
              </h3>
            ) : null}
            {post.description ? (
              <p className="mb-6 max-w-xl text-base text-white/60 sm:text-lg">{post.description}</p>
            ) : null}
            {post.likes ? (
              <div className="flex flex-wrap items-center gap-6 text-white/50">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-hz-secondary-container">favorite</span>
                  {post.likes}
                </span>
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-hz-secondary-container">chat_bubble</span>
                  {post.comments}
                </span>
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-hz-secondary-container">share</span>
                  {copy.share}
                </span>
              </div>
            ) : null}
          </div>
        </>
      ) : post.layout === "tall" || post.id === "square-3" ? (
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-hz-primary-container/90 to-transparent p-6 sm:p-8">
          {badgeText ? (
            <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.3em] text-white/70">
              {badgeText}
            </span>
          ) : null}
          {post.title ? (
            <h4 className="text-lg font-black italic text-white sm:text-xl">{post.title}</h4>
          ) : null}
        </div>
      ) : null}

      <div className="sosyal-post-overlay absolute inset-0 flex items-center justify-center gap-8 text-white">
        {post.likes ? (
          <span className="flex items-center gap-2 font-black">
            <span className="material-symbols-outlined">favorite</span>
            {post.likes}
          </span>
        ) : null}
        {post.comments ? (
          <span className="flex items-center gap-2 font-black">
            <span className="material-symbols-outlined">chat_bubble</span>
            {post.comments}
          </span>
        ) : null}
      </div>
    </article>
  );
}

export function SosyalMedyaPage({ locale, copy, hub }: Props) {
  const feedPosts = getSosyalMedyaFeedPosts(locale, hub);
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
              <button
                type="button"
                className="rounded-full border border-white/10 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white/50 transition-all hover:border-hz-secondary-container hover:text-white"
              >
                {copy.filterLatest}
              </button>
              <Link
                href={`/${locale}/kurumsal/referanslar`}
                className="rounded-full bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-hz-secondary-container"
              >
                {copy.viewArchive}
              </Link>
            </div>
          </div>

          <div className="sosyal-insta-grid">
            {feedPosts.map((post) => (
              <FeedPost key={post.id} post={post} copy={copy} networkLabel={NETWORK_LABEL[locale] ?? NETWORK_LABEL.en} />
            ))}
          </div>
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
