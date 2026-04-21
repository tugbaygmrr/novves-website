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
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-100 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
      <div className="relative h-44 shrink-0 bg-gradient-to-br from-dark via-secondary to-dark">
        <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-primary/10" />
        <div className="pointer-events-none absolute -left-6 bottom-0 h-32 w-32 rounded-full bg-white/3" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
          <div className="relative h-32 w-32 overflow-hidden rounded-full ring-4 ring-white shadow-xl transition-transform duration-700 group-hover:scale-105">
            <Image src={member.image} alt={member.name} fill className="object-cover object-top" />
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-primary/30 ring-offset-2 ring-offset-white" />
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center px-8 pb-8 pt-20 text-center">
        <div className="mb-4 flex items-center gap-1.5"><span className="h-px w-8 bg-gray-200" /><span className="h-1.5 w-1.5 rounded-full bg-primary" /><span className="h-px w-8 bg-gray-200" /></div>
        <h3 className="text-xl font-bold tracking-tight text-dark">{member.name}</h3>
        <p className="mt-2 text-xs font-semibold uppercase tracking-widest text-primary">{member.title}</p>
        <div className="my-6 h-px w-10 bg-gray-100" />
        <a href={`mailto:${member.email}`} className="inline-flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2.5 text-xs font-medium text-secondary/65 ring-1 ring-gray-100 transition-all duration-300 hover:bg-primary hover:text-white hover:ring-primary">
          <IconMail className="h-3.5 w-3.5" />{member.email}
        </a>
      </div>
    </div>
  );
}

function TeamCard({ member, emailAriaLabel, phoneAriaLabel }: { member: TeamMember; emailAriaLabel: string; phoneAriaLabel: string }) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gray-100 shadow-sm ring-1 ring-gray-100 transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-square overflow-hidden">
        <Image src={member.image} alt={member.name} fill className="object-cover object-top transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-dark/95 via-dark/50 to-transparent" />
        <div className="absolute bottom-14 left-4 flex gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <a href={`mailto:${member.email}`} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-primary" aria-label={`${member.name} — ${emailAriaLabel}`}><IconMail className="h-3.5 w-3.5" /></a>
          {member.phone && (<a href={`tel:${member.phone.replace(/\s/g, "")}`} className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-primary" aria-label={`${member.name} — ${phoneAriaLabel}`}><IconPhone className="h-3.5 w-3.5" /></a>)}
        </div>
        <div className="absolute inset-x-0 bottom-0 px-4 pb-4 pt-2">
          <h3 className="text-sm font-bold leading-tight text-white">{member.name}</h3>
          <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-primary">{member.title}</p>
        </div>
      </div>
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
      <section className="relative flex flex-col overflow-hidden">
        <Image src="/images/page-hero/ekibimiz.jpg" alt="" fill priority className="object-cover object-center" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/85 via-dark/70 to-dark/80" />
        <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)" }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-0 pt-14 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">{t.breadcrumbHome}</Link>
            <span>/</span>
            <Link href={`/${locale}/kurumsal`} className="transition-colors hover:text-white/70">{t.breadcrumbCorporate}</Link>
            <span>/</span>
            <span className="text-white/60">{t.breadcrumbPage}</span>
          </nav>
          <div className="mt-8 max-w-3xl pb-20">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">{t.badge}</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">{t.heroTitle1} <span className="text-primary">{t.heroTitleHighlight}</span></h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/55">{t.heroDesc}</p>
          </div>
        </div>
        <div className="relative z-10 border-t border-white/10 bg-dark/60 backdrop-blur-sm">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
            {t.stats.map((s: { value: string; label: string }) => (
              <div key={s.label} className="py-6 text-center">
                <p className="text-2xl font-bold text-primary sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex items-end gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t.leadershipTag}</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-dark">{t.leadershipTitle}</h2>
            </div>
            <div className="hidden h-px flex-1 bg-gray-100 sm:block" />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 xl:max-w-3xl xl:mx-auto">
            {t.leadership.map((member: TeamMember) => (<LeaderCard key={member.email} member={member} />))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 flex items-end gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{t.teamTag}</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-dark">{t.teamTitle}</h2>
            </div>
            <div className="hidden h-px flex-1 bg-gray-200 sm:block" />
          </div>
          <div className="space-y-16">
            {t.departments.map((dept: TeamDepartment) => (
              <div key={dept.tag}>
                <div className="mb-8 flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/8 px-3 py-1 ring-1 ring-primary/15">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">{dept.tag}</span>
                  </span>
                  <h3 className="text-base font-bold text-dark">{dept.label}</h3>
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-xs font-medium text-secondary/40">{dept.members.length} {t.personSuffix}</span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {dept.members.map((member: TeamMember) => (<TeamCard key={member.email} member={member} emailAriaLabel={t.emailAriaLabel} phoneAriaLabel={t.phoneAriaLabel} />))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-dark py-24">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full opacity-8" style={{ background: "radial-gradient(circle, #FF6B35 0%, transparent 70%)" }} />
        <div className="pointer-events-none absolute inset-0 opacity-3" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
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
