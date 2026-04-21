import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";

type TeamMember = { name: string; title: string; email: string; phone?: string; image: string };
type TeamDepartment = { tag: string; label: string; members: TeamMember[] };

function IconMail({ className }: { className?: string }) {
  return (<svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>);
}
function IconPhone({ className }: { className?: string }) {
  return (<svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>);
}

function LeaderCard({ member }: { member: TeamMember }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-[#ecebe6] shadow-[0_16px_34px_-24px_rgba(15,20,30,0.35)] transition-all duration-500 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_20px_38px_-24px_rgba(15,20,30,0.45)]">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#1d2f4d] via-primary to-[#2f4f74]" />
      <div className="relative h-44 shrink-0 bg-gradient-to-br from-[#13233d] via-[#1d2f4d] to-[#233c5f]">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-primary/15" />
        <div className="pointer-events-none absolute -left-6 bottom-0 h-32 w-32 rounded-full bg-white/5" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-[#ecebe6] shadow-xl transition-transform duration-700 group-hover:scale-105">
            <Image src={member.image} alt={member.name} fill className="object-cover object-top" />
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-primary/30 ring-offset-2 ring-offset-[#ecebe6]" />
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center px-7 pb-0 pt-20 text-center">
        <div className="mb-4 flex items-center gap-1.5"><span className="h-px w-8 bg-ink/10" /><span className="h-1.5 w-1.5 rounded-full bg-primary" /><span className="h-px w-8 bg-ink/10" /></div>
        <h3 className="text-[1.65rem] font-bold tracking-[-0.01em] text-dark">{member.name}</h3>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#cc6d41]">{member.title}</p>
        <div className="my-6 h-px w-12 bg-ink/10" />
        <a href={`mailto:${member.email}`} className="mb-6 inline-flex items-center gap-2 rounded-lg border border-ink/10 bg-[#f4f2eb] px-4 py-2.5 text-xs font-medium text-secondary/65 transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white">
          <IconMail className="h-3.5 w-3.5" />{member.email}
        </a>
        <div className="h-2 w-[calc(100%+3.5rem)] bg-gradient-to-r from-[#1d2f4d] via-primary to-[#2f4f74]" />
      </div>
    </div>
  );
}

const teamRingVariants = [
  "from-[#e65f35] to-[#d84d2f]",
  "from-[#6d58d9] to-[#9b68f2]",
  "from-[#2e64c9] to-[#3f79e0]",
  "from-[#18b9a9] to-[#2cd6c4]",
];

function TeamCard({ member, emailAriaLabel, phoneAriaLabel, index }: { member: TeamMember; emailAriaLabel: string; phoneAriaLabel: string; index: number }) {
  const ringClass = teamRingVariants[index % teamRingVariants.length];
  return (
    <div className="group relative rounded-2xl border border-ink/10 bg-[#f3f1ea] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_16px_30px_-24px_rgba(15,20,30,0.35)]">
      <div className={`mx-auto flex h-[122px] w-[122px] items-center justify-center rounded-full bg-gradient-to-br ${ringClass} p-[8px] shadow-[0_10px_20px_-16px_rgba(15,20,30,0.55)]`}>
        <div className="relative h-full w-full overflow-hidden rounded-full bg-white p-[3px]">
          <div className="relative h-full w-full overflow-hidden rounded-full">
            <Image src={member.image} alt={member.name} fill className="object-cover object-top transition-transform duration-500 group-hover:scale-105" />
          </div>
        </div>
      </div>
      <h3 className="mt-4 text-[1.05rem] font-bold leading-tight text-dark">{member.name}</h3>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">{member.title}</p>
      <div className="mt-4 flex items-center justify-center gap-2">
        <a href={`mailto:${member.email}`} className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink/10 bg-[#fbf9f3] text-secondary/70 transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-white" aria-label={`${member.name} — ${emailAriaLabel}`}><IconMail className="h-3.5 w-3.5" /></a>
        {member.phone && (<a href={`tel:${member.phone.replace(/\s/g, "")}`} className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink/10 bg-[#fbf9f3] text-secondary/70 transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-white" aria-label={`${member.name} — ${phoneAriaLabel}`}><IconPhone className="h-3.5 w-3.5" /></a>)}
      </div>
      <div className="mx-auto mt-4 h-[2px] w-16 rounded-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
}

export default async function Ekibimiz({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const t = dict.corporate.ekibimiz;

  return (
    <main>
      <section className="relative flex min-h-[540px] items-end overflow-hidden">
        <Image src="/images/page-hero/ekibimiz.jpg" alt="" fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-[#4e525c]/28" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#71757d]/60 via-[#4a4f58]/82 to-[#2f3440]/94" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_16%_10%,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_52%),radial-gradient(ellipse_at_86%_96%,rgba(17,22,33,0.42)_0%,rgba(17,22,33,0)_55%)]" />
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.08]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-32 sm:px-6 lg:px-8 lg:pt-36">
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{t.breadcrumbHome}</Link>
            <span>/</span>
            <Link href={`/${locale}/kurumsal`} className="transition-colors hover:text-white/70">{t.breadcrumbCorporate}</Link>
            <span>/</span>
            <span className="text-white/60">{t.breadcrumbPage}</span>
          </nav>
          <div className="max-w-3xl rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_28px_70px_-40px_rgba(10,12,16,0.75)] backdrop-blur-[2px] sm:p-8 lg:p-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/12 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">{t.badge}</span>
            </div>
            <h1 className="text-4xl font-bold leading-[1.04] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.7rem]">{t.heroTitle1} <span className="text-primary">{t.heroTitleHighlight}</span></h1>
            <p className="mt-6 max-w-[54ch] text-[18px] leading-[1.62] text-white/72">{t.heroDesc}</p>
          </div>
        </div>
      </section>

      <section className="bg-[#ecebe6] py-5 sm:py-6">
        <div className="mx-auto max-w-7xl rounded-2xl border border-ink/10 bg-[#f8f5ed] shadow-[0_12px_26px_-20px_rgba(15,20,30,0.26)] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 divide-x divide-ink/10 sm:grid-cols-4">
            {t.stats.map((s: { value: string; label: string }) => (
              <div key={s.label} className="py-5 text-center">
                <p className="text-2xl font-bold text-primary sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-secondary/55">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#ecebe6] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t.leadershipTag}</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-dark">{t.leadershipTitle}</h2>
            </div>
            <div className="hidden h-px flex-1 bg-ink/10 sm:block" />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:mx-auto xl:max-w-3xl">
              {t.leadership.map((member: TeamMember) => (<LeaderCard key={member.email} member={member} />))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#ecebe6] py-14 sm:py-16">
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.12]" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t.teamTag}</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-dark">{t.teamTitle}</h2>
            </div>
            <div className="hidden h-px flex-1 bg-ink/10 sm:block" />
          </div>
          <div className="space-y-12">
            {t.departments.map((dept: TeamDepartment) => (
              <div key={dept.tag}>
                <div className="mb-8 flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/8 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">{dept.tag}</span>
                  </span>
                  <h3 className="text-base font-bold text-dark">{dept.label}</h3>
                  <div className="h-px flex-1 bg-ink/10" />
                  <span className="text-xs font-medium text-secondary/50">{dept.members.length} {t.personSuffix}</span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {dept.members.map((member: TeamMember, memberIndex: number) => (
                    <TeamCard
                      key={member.email}
                      member={member}
                      emailAriaLabel={t.emailAriaLabel}
                      phoneAriaLabel={t.phoneAriaLabel}
                      index={memberIndex}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-dark py-18 sm:py-20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-[0.09]" style={{ background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full opacity-[0.08]" style={{ background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute inset-0 blueprint-grid-light opacity-[0.08]" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2"><span className="h-px w-8 bg-primary/40" /><span className="text-xs font-bold uppercase tracking-widest text-primary">{t.ctaTag}</span><span className="h-px w-8 bg-primary/40" /></div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{t.ctaTitle}</h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/45">{t.ctaDesc}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={`/${locale}/iletisim`} className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#e55a28] hover:shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-100">
              {t.ctaContact}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
            <Link href={`/${locale}/kurumsal/biz-kimiz`} className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-8 py-3.5 text-sm font-semibold text-white/70 transition-all duration-300 hover:border-white/30 hover:text-white">
              {t.ctaWhoWeAre}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
