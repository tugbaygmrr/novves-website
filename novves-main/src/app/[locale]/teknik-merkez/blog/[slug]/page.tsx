import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "../../../dictionaries";
import { getArticleBySlug } from "@/lib/blog/db";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = await getArticleBySlug(slug, locale);
  if (!article) return { title: "Yazı bulunamadı | Novves" };
  return {
    title: `${article.title} | Novves`,
    description: article.excerpt ?? undefined,
    openGraph: article.cover ? { images: [{ url: article.cover }] } : undefined,
  };
}

export default async function ArticleDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(locale)) notFound();
  const article = await getArticleBySlug(slug, locale);
  if (!article) notFound();

  const paragraphs = (article.body ?? "").split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const dateStr = article.publishAt
    ? new Date(article.publishAt).toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" })
    : null;

  return (
    <main className="bg-[#ecebe6] pb-20">
      {/* Üst alan */}
      <div className="bg-dark px-4 pb-14 pt-32 sm:px-6 lg:pt-36">
        <div className="mx-auto max-w-3xl">
          <nav className="mb-6 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="hover:text-white/70">Ana Sayfa</Link>
            <span>/</span>
            <Link href={`/${locale}/teknik-merkez/blog`} className="hover:text-white/70">Blog</Link>
          </nav>
          {article.category ? (
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{article.category}</span>
          ) : null}
          <h1 className="mt-2 font-eurostile text-page-title font-bold leading-[1.08] tracking-[-0.02em] text-white">
            {article.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-white/45">
            {dateStr ? <span>{dateStr}</span> : null}
            {article.author ? <span>· {article.author}</span> : null}
          </div>
        </div>
      </div>

      <article className="mx-auto -mt-8 max-w-3xl px-4 sm:px-6">
        {article.cover ? (
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-ink/10 shadow-lg">
            <Image src={article.cover} alt="" fill priority className="object-cover" sizes="(max-width:768px) 100vw, 768px" />
          </div>
        ) : null}

        {article.excerpt ? (
          <p className="mt-8 text-[18px] font-medium leading-[1.6] text-dark/80">{article.excerpt}</p>
        ) : null}

        <div className="mt-6 space-y-5 text-[16px] leading-[1.75] text-secondary/80">
          {paragraphs.length > 0 ? (
            paragraphs.map((p, i) => (
              <p key={i} className="whitespace-pre-wrap">
                {p}
              </p>
            ))
          ) : (
            <p className="text-secondary/50">İçerik yakında eklenecek.</p>
          )}
        </div>

        {article.tags.length > 0 ? (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-ink/10 pt-6">
            {article.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-ink/10 bg-[#f8f5ed] px-3 py-1 text-[12px] text-secondary/60">
                #{tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-10">
          <Link href={`/${locale}/teknik-merkez/blog`} className="inline-flex items-center gap-2 text-[14px] font-semibold text-primary hover:underline">
            ← Tüm yazılar
          </Link>
        </div>
      </article>
    </main>
  );
}
