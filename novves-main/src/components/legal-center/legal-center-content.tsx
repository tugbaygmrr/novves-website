import type {
  LegalCenterUi,
  LegalContentBlock,
  LegalDocument,
  LegalSection,
} from "@/lib/legal-center/types";

function Block({ block }: { block: LegalContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="break-words text-sm leading-relaxed text-secondary/80 sm:text-base">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="list-disc space-y-2 break-words pl-5 text-sm leading-relaxed text-secondary/80 sm:text-base">
          {block.items.map((item, i) => (
            <li key={`${i}-${item}`}>{item}</li>
          ))}
        </ul>
      );
    case "ordered":
      return (
        <ol className="list-decimal space-y-2 break-words pl-5 text-sm leading-relaxed text-secondary/80 sm:text-base">
          {block.items.map((item, i) => (
            <li key={`${i}-${item}`}>{item}</li>
          ))}
        </ol>
      );
    case "definitions":
      return (
        <div className="space-y-3 pt-2">
          {block.items.map((def) => (
            <div
              key={def.abbr}
              className="flex items-start gap-3 rounded-lg bg-sand-100 p-3 transition-colors hover:bg-sand-200/80 sm:gap-4 sm:p-4"
            >
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary text-xs font-bold text-white">
                {def.abbr}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-dark">{def.title}</h4>
                <p className="break-words text-sm text-secondary/80">{def.description}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case "banner":
      return (
        <div className="relative mt-6 flex h-36 items-center justify-center overflow-hidden rounded-xl bg-[#00386B] sm:mt-8 sm:h-48">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(239,95,23,0.22)_0%,transparent_55%),linear-gradient(135deg,#004a8f_0%,#00386B_100%)]" />
          <div className="relative px-4 text-center sm:px-8">
            <h3 className="text-lg font-bold text-white sm:text-xl">{block.title}</h3>
            <p className="mt-2 text-xs text-white/75 sm:text-sm">{block.description}</p>
          </div>
        </div>
      );
    default:
      return null;
  }
}

function Section({ section }: { section: LegalSection }) {
  const isSub = Boolean(section.number?.includes("."));
  return (
    <section
      className={`space-y-4 ${isSub ? "mt-6" : "mt-10 first:mt-0"}`}
    >
      <h2
        className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-display font-extrabold text-dark ${
          isSub ? "text-base sm:text-lg" : "text-xl sm:text-2xl"
        }`}
      >
        {section.number ? (
          <span className={`shrink-0 text-primary ${isSub ? "text-xs sm:text-sm" : "text-sm sm:text-base"}`}>
            {section.number.endsWith(".") ? section.number : `${section.number}.`}
          </span>
        ) : null}
        {section.title}
      </h2>
      <div className="space-y-4">
        {section.blocks.map((block, i) => (
          <Block key={`${section.title}-${i}`} block={block} />
        ))}
      </div>
    </section>
  );
}

type Props = {
  doc: LegalDocument;
  ui: LegalCenterUi;
  locale: string;
};

export function LegalCenterMainContent({ doc, ui, locale }: Props) {
  const email = doc.contactEmail ?? "info@novves.com";

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-12">
      <article className="min-w-0 lg:col-span-8">
        <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-[0_8px_32px_-24px_rgba(15,22,36,0.1)] ring-1 ring-ink/[0.06] sm:p-8 lg:p-10">
          <div className="prose prose-slate max-w-none space-y-4 sm:space-y-6">
            {doc.intro.map((paragraph, i) => (
              <p
                key={`${i}-${paragraph.slice(0, 32)}`}
                className={
                  i === 0
                    ? "break-words text-xs font-semibold uppercase tracking-wide text-primary sm:text-sm"
                    : "break-words text-sm leading-relaxed text-secondary/80 sm:text-base"
                }
              >
                {paragraph}
              </p>
            ))}
            {doc.sections.map((section) => (
              <Section key={section.title} section={section} />
            ))}
          </div>
        </div>
      </article>

      <aside className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1 lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-sm ring-1 ring-ink/[0.06] sm:p-6">
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-widest text-primary">
            {ui.docSummary}
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex flex-col gap-0.5 border-b border-sand-300/70 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <dt className="shrink-0 text-secondary/70">{ui.classification}</dt>
              <dd className="font-bold text-dark sm:text-end">{doc.classification}</dd>
            </div>
            <div className="flex flex-col gap-0.5 border-b border-sand-300/70 pb-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <dt className="shrink-0 text-secondary/70">{ui.language}</dt>
              <dd className="break-words font-bold text-dark sm:text-end">{ui.primaryLanguageLabel}</dd>
            </div>
            <div className="flex flex-col gap-0.5 pb-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <dt className="shrink-0 text-secondary/70">{ui.storageCode}</dt>
              <dd className="break-all font-bold text-dark sm:text-end">{doc.storageCode}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-xl bg-[#00386B] p-5 shadow-lg sm:p-6">
          <h3 className="font-bold text-white">{ui.complianceAudit}</h3>
          <p className="mb-4 text-xs text-white/60">{ui.complianceVerified}</p>
          <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[94%] rounded-full bg-primary shadow-[0_0_10px_rgba(239,95,23,0.45)]" />
          </div>
          <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-white">
            <span>{ui.verification}</span>
            <span>{ui.compliancePassLabel}</span>
          </div>
        </div>

        <div className="rounded-xl border border-ink/10 bg-sand-100 p-5 ring-1 ring-ink/[0.04] sm:p-6">
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-widest text-dark">
            {ui.revisionLogs}
          </h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-1 shrink-0 rounded-full bg-primary" />
              <div>
                <p className="text-xs font-bold text-dark">{ui.revisionCurrentLabel}</p>
                <p className="text-[10px] text-secondary/70">{doc.badge}</p>
              </div>
            </div>
            <div className="flex gap-3 opacity-60">
              <div className="w-1 shrink-0 rounded-full bg-sand-400" />
              <div>
                <p className="text-xs font-bold text-dark">{ui.revisionPreviousLabel}</p>
                <p className="text-[10px] text-secondary/70">{ui.revisionPreviousNote}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl border border-primary/15 bg-white p-5 shadow-sm ring-1 ring-ink/[0.06] sm:col-span-2 sm:p-6 lg:col-span-1">
          <h3 className="font-bold text-dark">{ui.legalQuestion}</h3>
          <p className="mb-4 text-xs text-secondary/70">{ui.legalQuestionDesc}</p>
          <a
            href={`mailto:${email}`}
            className="inline-flex max-w-full items-center gap-2 break-all text-xs font-bold text-primary transition-transform hover:translate-x-0.5"
          >
            {email}
            <span aria-hidden>→</span>
          </a>
        </div>
      </aside>
    </div>
  );
}
