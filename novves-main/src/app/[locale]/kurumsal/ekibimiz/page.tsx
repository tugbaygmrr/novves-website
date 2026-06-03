import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../../dictionaries";
import { corporateDetailMetadata } from "@/lib/i18n-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return corporateDetailMetadata(locale, "ekibimiz");
}

type Leader = {
  name: string;
  title: string;
  email: string;
  image: string;
  quote?: string;
  linkedInUrl?: string;
};

type TeamMember = {
  name: string;
  title: string;
  email: string;
  phone?: string;
  image: string;
  focus?: string;
};

type TeamDepartment = {
  tag: string;
  label: string;
  cardStyle?: "detail" | "contact";
  members: TeamMember[];
};

type NetworkStat = { value: string; label: string; accent?: boolean };

type EcosystemRegion = { code: string; label: string; highlight?: boolean };

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}

function LeaderCard({ member, index }: { member: Leader; index: number }) {
  const linkedIn = member.linkedInUrl ?? "https://tr.linkedin.com/company/novvesturkiye";
  return (
    <div className="group relative flex-1 overflow-hidden border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-700 hover:bg-white/[0.05] sm:p-8 md:p-10 lg:p-12">
      <div className="pointer-events-none absolute right-0 top-0 p-4 sm:p-6 md:p-8">
        <span className="text-5xl font-black leading-none text-white/5 sm:text-6xl md:text-7xl lg:text-8xl">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8 md:flex-row md:items-start md:gap-10">
        <div className="relative shrink-0">
          <div className="absolute -inset-2 animate-pulse rounded-full border border-primary/20 sm:-inset-3" aria-hidden />
          <div className="relative h-36 w-36 overflow-hidden rounded-full border-2 border-primary/30 p-1 sm:h-48 sm:w-48 md:h-56 md:w-56 lg:h-64 lg:w-64">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="rounded-full object-cover object-top grayscale transition-all duration-700 group-hover:grayscale-0"
              sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 256px"
            />
          </div>
          <a
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} LinkedIn`}
            className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center bg-primary text-white shadow-xl transition-all hover:bg-white hover:text-primary sm:bottom-2 sm:right-2 sm:h-11 sm:w-11"
          >
            <LinkedInIcon className="h-4 w-4 sm:h-5 sm:w-5" />
          </a>
        </div>
        <div className="min-w-0 w-full text-center md:text-left">
          <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl md:text-3xl lg:text-4xl">{member.name}</h3>
          <p className="mb-4 mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary sm:mb-6 sm:text-xs sm:tracking-[0.3em]">
            {member.title}
          </p>
          {member.quote ? (
            <p className="mb-6 max-w-sm text-sm font-light italic leading-relaxed text-white/40 sm:mb-8 md:max-w-none lg:max-w-sm">
              &ldquo;{member.quote}&rdquo;
            </p>
          ) : null}
          <a
            href={`mailto:${member.email}`}
            className="inline-flex max-w-full flex-col items-center gap-2 text-white/70 transition-colors hover:text-primary sm:flex-row sm:gap-3 md:items-start"
          >
            <span className="shrink-0 border border-primary/30 bg-primary/5 p-2">
              <IconMail className="h-4 w-4 text-primary" />
            </span>
            <span className="break-all text-[10px] font-bold tracking-wider sm:text-xs sm:tracking-widest">{member.email.toUpperCase()}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function DetailMemberCard({
  member,
  profileDetailLabel,
}: {
  member: TeamMember;
  profileDetailLabel: string;
}) {
  return (
    <div className="group relative overflow-hidden border border-ink/10 bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] sm:p-8 md:p-10">
      <div className="absolute left-0 top-0 h-0.5 w-full origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-5 sm:mb-8">
          <div className="relative h-28 w-28 overflow-hidden sm:h-36 sm:w-36 md:h-40 md:w-40">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top grayscale transition-all duration-700 group-hover:grayscale-0"
              sizes="(max-width: 640px) 112px, 160px"
            />
          </div>
          <a
            href={`mailto:${member.email}`}
            className="absolute -bottom-1 -right-1 border border-primary/30 bg-primary/5 p-2 text-primary transition-colors hover:bg-primary hover:text-white"
            aria-label={member.email}
          >
            <IconMail className="h-3.5 w-3.5" />
          </a>
        </div>
        <h5 className="text-base font-black text-[#0a0f1a] sm:text-lg md:text-xl">{member.name}</h5>
        <p className="mb-4 mt-1 text-[10px] font-black uppercase tracking-[0.15em] text-primary sm:mb-6 sm:tracking-[0.2em]">{member.title}</p>
        {member.focus ? (
          <div className="flex max-h-none flex-col items-center opacity-100 sm:max-h-0 sm:overflow-hidden sm:opacity-0 sm:transition-all sm:duration-500 sm:group-hover:max-h-24 sm:group-hover:opacity-100">
            <p className="mb-3 text-[11px] font-medium leading-relaxed text-secondary/70">{member.focus}</p>
            <span className="border-b border-ink/20 pb-0.5 text-[10px] font-black uppercase tracking-widest text-ink/80">
              {profileDetailLabel}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ContactMemberCard({
  member,
  emailAriaLabel,
  phoneAriaLabel,
}: {
  member: TeamMember;
  emailAriaLabel: string;
  phoneAriaLabel: string;
}) {
  return (
    <div className="group relative overflow-hidden border border-ink/10 bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] sm:p-8 md:p-10">
      <div className="absolute right-0 top-0 h-0.5 w-0 origin-right bg-primary transition-all duration-500 group-hover:w-full" />
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-5 h-28 w-28 overflow-hidden sm:mb-8 sm:h-36 sm:w-36 md:h-40 md:w-40">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top grayscale transition-all duration-700 group-hover:grayscale-0"
            sizes="(max-width: 640px) 112px, 160px"
          />
        </div>
        <h5 className="text-base font-black text-[#0a0f1a] sm:text-lg md:text-xl">{member.name}</h5>
        <p className="mb-4 mt-1 text-[10px] font-black uppercase tracking-[0.15em] text-primary sm:mb-6 sm:tracking-[0.2em]">{member.title}</p>
        <div className="flex gap-3 opacity-100 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100">
          <a
            href={`mailto:${member.email}`}
            aria-label={`${member.name} — ${emailAriaLabel}`}
            className="border border-primary/30 bg-primary/5 p-2 text-ink/80 transition-colors hover:bg-primary hover:text-white"
          >
            <IconMail className="h-4 w-4" />
          </a>
          {member.phone ? (
            <a
              href={`tel:${member.phone.replace(/\s/g, "")}`}
              aria-label={`${member.name} — ${phoneAriaLabel}`}
              className="border border-primary/30 bg-primary/5 p-2 text-ink/80 transition-colors hover:bg-primary hover:text-white"
            >
              <IconPhone className="h-4 w-4" />
            </a>
          ) : null}
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

  const leadership = (t.leadership ?? []) as Leader[];
  const networkStats = (t.networkStats ?? t.stats ?? []) as NetworkStat[];
  const departments = (t.departments ?? []) as TeamDepartment[];
  const ecosystemRegions = (t.ecosystemRegions ?? []) as EcosystemRegion[];

  return (
    <main className="overflow-x-clip bg-sand-200">
      {/* Hero */}
      <section className="relative flex min-h-[min(68vh,560px)] items-center overflow-hidden bg-[#070a13] sm:min-h-[min(80vh,680px)] lg:min-h-[min(88vh,760px)]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% -20%, rgba(239, 95, 23, 0.15), transparent 60%), linear-gradient(rgba(10, 15, 26, 0.95), rgba(10, 15, 26, 0.98))",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(239, 95, 23, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(239, 95, 23, 0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute top-1/4 right-4 hidden h-[420px] w-[420px] items-center justify-center rounded-full border border-white/5 lg:flex xl:right-10 xl:h-[500px] xl:w-[500px]">
          <div className="h-[320px] w-[320px] animate-[spin_20s_linear_infinite] rounded-full border border-white/5 xl:h-[400px] xl:w-[400px]" />
          <div className="absolute h-[240px] w-[240px] animate-[spin_15s_linear_infinite_reverse] rounded-full border border-primary/10 xl:h-[300px] xl:w-[300px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-12 pt-[max(5.5rem,calc(4.5rem+env(safe-area-inset-top)))] sm:px-6 sm:pb-16 sm:pt-28 lg:px-8 lg:pb-20 lg:pt-32">
          <nav className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-white/35 sm:mb-10 sm:text-xs lg:mb-12">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/65">
              {t.breadcrumbHome}
            </Link>
            <span aria-hidden>/</span>
            <Link href={`/${locale}/kurumsal`} className="transition-colors hover:text-white/65">
              {t.breadcrumbCorporate}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-white/50">{t.breadcrumbPage}</span>
          </nav>

          <div className="max-w-4xl">
            <div className="mb-5 flex items-center gap-3 sm:mb-8 sm:gap-4">
              <div className="h-px w-8 shrink-0 bg-primary sm:w-12" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary sm:tracking-[0.4em]">
                {t.heroBadge ?? t.badge}
              </span>
            </div>
            <h1 className="font-display text-[clamp(2rem,10vw,7rem)] font-black leading-[0.92] tracking-tighter text-white sm:leading-[0.88]">
              {t.heroTitle1}{" "}
              <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
                {t.heroTitleHighlight}
              </span>
            </h1>
            <p className="mt-6 max-w-xl border-l border-white/10 pl-4 text-sm font-light leading-relaxed text-white/50 sm:mt-8 sm:pl-6 sm:text-base md:mt-12 md:pl-8 md:text-lg lg:text-xl">
              {t.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="relative overflow-hidden bg-[#0a0f1a] py-14 sm:py-20 md:py-28 lg:py-32">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col items-center text-center sm:mb-16 md:mb-20 lg:mb-24">
            <span className="mb-2 text-[10px] font-black uppercase tracking-[0.35em] text-primary sm:mb-3 sm:tracking-[0.5em]">
              {t.leadershipTag}
            </span>
            <h2 className="font-display text-2xl font-black tracking-tighter text-white sm:text-3xl md:text-4xl lg:text-5xl">
              {t.leadershipTitle}
            </h2>
          </div>
          <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:gap-8 lg:flex-row lg:gap-12">
            {leadership.map((member, i) => (
              <LeaderCard key={member.email} member={member} index={i} />
            ))}
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-50"
          aria-hidden
        />
      </section>

      {/* Network stats */}
      <section className="border-b border-[#eceef0] bg-white py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-8 md:grid-cols-4 md:gap-12">
            {networkStats.map((stat) => (
              <div key={stat.label} className="flex min-w-0 flex-col items-center md:items-start">
                <span
                  className={`mb-1.5 text-2xl font-black sm:mb-2 sm:text-3xl md:text-4xl ${stat.accent ? "text-primary" : "text-[#0a0f1a]"}`}
                >
                  {stat.value}
                </span>
                <span className="text-center text-[9px] font-bold uppercase leading-snug tracking-wide text-secondary/60 sm:text-[10px] sm:tracking-widest md:text-left">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team departments */}
      <section className="relative py-14 sm:py-20 md:py-28 lg:py-32">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(239, 95, 23, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(239, 95, 23, 0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 border-b border-ink/10 pb-8 sm:mb-16 sm:gap-6 sm:pb-10 md:mb-20 md:flex-row md:items-end md:justify-between md:pb-12 lg:mb-24">
            <div className="min-w-0">
              <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.3em] text-primary sm:mb-3 sm:tracking-[0.4em]">
                {t.teamTag}
              </span>
              <h2 className="font-display text-2xl font-black tracking-tighter text-[#0a0f1a] sm:text-3xl md:text-4xl lg:text-5xl">
                {t.teamTitle}
              </h2>
            </div>
            {t.teamCapacityLabel ? (
              <div className="text-left md:text-right">
                <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-secondary/60">
                  {t.teamCapacityLabel}
                </span>
                <div className="flex gap-1 md:justify-end">
                  <div className="h-1 w-8 bg-primary" />
                  <div className="h-1 w-8 bg-[#0a0f1a]" />
                  <div className="h-1 w-8 bg-[#0a0f1a]" />
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-14 sm:space-y-20 md:space-y-28 lg:space-y-32">
            {departments.map((dept) => (
              <div key={dept.tag}>
                <h4 className="mb-6 flex flex-col gap-2 sm:mb-8 sm:flex-row sm:items-center sm:gap-4 md:mb-10 md:gap-4 lg:mb-12">
                  <span className="flex min-w-0 items-center gap-3 text-sm font-black uppercase tracking-[0.2em] text-[#0a0f1a] sm:gap-4 sm:tracking-[0.3em]">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span className="min-w-0 break-words">{dept.label}</span>
                  </span>
                  <span className="text-xs font-medium normal-case tracking-normal text-secondary/50 sm:ml-auto">
                    {dept.members.length} {t.personSuffix}
                  </span>
                </h4>
                <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 sm:gap-6 md:gap-8 lg:grid-cols-3 lg:gap-12">
                  {dept.members.map((member) =>
                    dept.cardStyle === "contact" ? (
                      <ContactMemberCard
                        key={member.email}
                        member={member}
                        emailAriaLabel={t.emailAriaLabel}
                        phoneAriaLabel={t.phoneAriaLabel}
                      />
                    ) : (
                      <DetailMemberCard
                        key={member.email}
                        member={member}
                        profileDetailLabel={t.profileDetailLabel ?? "Profile"}
                      />
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global ecosystem */}
      {ecosystemRegions.length > 0 ? (
        <section className="relative overflow-hidden bg-[#0a0f1a] py-14 sm:py-20 md:py-28 lg:py-32">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(239, 95, 23, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(239, 95, 23, 0.05) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
            aria-hidden
          />
          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-display text-[clamp(1.75rem,6vw,3.75rem)] font-black leading-tight tracking-tighter text-white">
              {t.ecosystemTitle}{" "}
              <span className="text-primary">{t.ecosystemTitleHighlight}</span>
            </h2>
            {t.ecosystemDesc ? (
              <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-relaxed text-white/40 sm:mt-8 sm:text-base">
                {t.ecosystemDesc}
              </p>
            ) : null}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-4 md:gap-6 lg:gap-8">
              {ecosystemRegions.map((region) => (
                <div
                  key={region.code}
                  className="border border-white/5 bg-white/[0.02] p-4 sm:p-6 md:p-8"
                >
                  <span
                    className={`mb-1.5 block text-xl font-black sm:mb-2 sm:text-2xl md:text-3xl ${region.highlight ? "text-primary" : "text-white"}`}
                  >
                    {region.code}
                  </span>
                  <span className="text-[8px] font-bold uppercase leading-snug tracking-[0.15em] text-white/40 sm:text-[9px] sm:tracking-[0.2em]">
                    {region.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
