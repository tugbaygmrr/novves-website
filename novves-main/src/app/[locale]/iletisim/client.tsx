"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type ContactDict = {
  main: {
    breadcrumbHome: string;
    breadcrumbContact: string;
    badge: string;
    heroTitle1: string;
    heroTitle2: string;
    heroTitle3: string;
    heroDesc: string;
    headOffice: string;
    headOfficeAddress: string;
    factory: string;
    factoryAddress: string;
    workingHours: string;
    weekdays: string;
    saturday: string;
    sunday: string;
    closed: string;
    socialMedia: string;
    formTitle: string;
    formDesc: string;
    successMessage: string;
    labelName: string;
    labelCompany: string;
    labelPhone: string;
    labelEmail: string;
    labelDepartment: string;
    labelSubject: string;
    labelMessage: string;
    placeholderName: string;
    placeholderCompany: string;
    placeholderPhone: string;
    placeholderEmail: string;
    placeholderSelect: string;
    placeholderSubject: string;
    placeholderMessage: string;
    departments: string[];
    kvkkConsent: string;
    send: string;
    mapTitle: string;
    mapSubtitle: string;
    openInMap: string;
    mapIframeTitle: string;
  };
};

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/novves",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@novves",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    label: "Instagram Türkiye",
    href: "https://www.instagram.com/novves.turkiye",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "Instagram Global",
    href: "https://www.instagram.com/novves.global",
    icon: (
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

function InputField({
  id,
  label,
  required,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold uppercase tracking-wider text-secondary"
      >
        {label}
        {required && <span className="ml-0.5 text-primary">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-secondary placeholder-gray-300 outline-none transition-all duration-200 focus:border-primary focus:bg-white focus:ring-2 focus:ring-orange-500/10";

export default function IletisimClient({ dict, locale }: { dict: ContactDict; locale: string }) {
  const t = dict.main;

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    department: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <main>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#4a4f58] py-24 pt-40">
        {/* Hero background image */}
        <Image
          src="/images/page-hero/iletisim.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#71757d]/60 via-[#4a4f58]/82 to-[#2f3440]/94" />
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-xs text-white/40">
            <Link href={`/${locale}`} className="transition-colors hover:text-white/70">
              {t.breadcrumbHome}
            </Link>
            <span>/</span>
            <span className="text-white/60">{t.breadcrumbContact}</span>
          </nav>

          <div className="max-w-2xl">
            {/* Label */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {t.badge}
              </span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              {t.heroTitle1}{" "}
              <span className="text-primary">{t.heroTitle2}</span>{" "}
              {t.heroTitle3}
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/55">
              {t.heroDesc}
            </p>
          </div>

          {/* Quick contact strip */}
          <div className="mt-12 flex flex-wrap gap-6">
            <a
              href="tel:+902164674752"
              className="group flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 transition-colors group-hover:bg-primary/20 group-hover:ring-primary/30">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </span>
              +90 216 467 47 52
            </a>
            <a
              href="mailto:info@novves.com"
              className="group flex items-center gap-3 text-sm text-white/60 transition-colors hover:text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 ring-1 ring-white/10 transition-colors group-hover:bg-primary/20 group-hover:ring-primary/30">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </span>
              info@novves.com
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact Grid ───────────────────────────────────── */}
      <section className="bg-[#ecebe6] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-4">
            {/* ── Left: Contact Info ── */}
            <div className="space-y-5">

              {/* Merkez Ofis */}
              <div className="rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                  </span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-secondary">
                    {t.headOffice}
                  </h3>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 text-sm leading-relaxed text-gray-500">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <span>
                      {t.headOfficeAddress.split("\n").map((line, i, arr) => (
                        <span key={i}>
                          {line}
                          {i < arr.length - 1 && <br />}
                        </span>
                      ))}
                    </span>
                  </div>

                  <a
                    href="mailto:info@novves.com"
                    className="flex items-center gap-3 text-sm text-gray-500 transition-colors hover:text-primary"
                  >
                    <svg className="h-4 w-4 shrink-0 text-primary/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    info@novves.com
                  </a>

                  <a
                    href="tel:+902164674752"
                    className="flex items-center gap-3 text-sm text-gray-500 transition-colors hover:text-primary"
                  >
                    <svg className="h-4 w-4 shrink-0 text-primary/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    +90 216 467 47 52
                  </a>
                </div>
              </div>

              {/* Fabrika */}
              <div className="rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                    </svg>
                  </span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-secondary">
                    {t.factory}
                  </h3>
                </div>
                <div className="flex items-start gap-3 text-sm leading-relaxed text-gray-500">
                  <svg className="mt-0.5 h-4 w-4 shrink-0 text-primary/60" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span>
                    {t.factoryAddress.split("\n").map((line, i, arr) => (
                      <span key={i}>
                        {line}
                        {i < arr.length - 1 && <br />}
                      </span>
                    ))}
                  </span>
                </div>
              </div>

              {/* Çalışma Saatleri */}
              <div className="rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-secondary">
                    {t.workingHours}
                  </h3>
                </div>
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center justify-between">
                    <span>{t.weekdays}</span>
                    <span className="font-medium text-secondary">09:00 – 18:00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t.saturday}</span>
                    <span className="font-medium text-secondary">09:00 – 14:00</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>{t.sunday}</span>
                    <span className="text-gray-300">{t.closed}</span>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 shadow-sm">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-secondary">
                  {t.socialMedia}
                </h3>
                <div className="flex items-center gap-2">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-100 text-gray-400 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: Contact Form ── */}
            <div>
              <div className="min-h-0 rounded-2xl border border-ink/10 bg-[#f8f5ed] p-6 shadow-sm sm:min-h-[560px] sm:p-6 lg:min-h-[780px]">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-secondary">
                    {t.formTitle}
                  </h2>
                  <p className="mt-1.5 text-sm text-gray-400">
                    {t.formDesc}
                  </p>
                </div>

                {/* Success state */}
                {submitted && (
                  <div className="mb-6 flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-sm text-green-700">
                      {t.successMessage}
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <InputField id="name" label={t.labelName} required>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder={t.placeholderName}
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </InputField>

                    <InputField id="company" label={t.labelCompany} required>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        placeholder={t.placeholderCompany}
                        value={formData.company}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </InputField>

                    <InputField id="phone" label={t.labelPhone} required>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        placeholder={t.placeholderPhone}
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </InputField>

                    <InputField id="email" label={t.labelEmail} required>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder={t.placeholderEmail}
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </InputField>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <InputField id="department" label={t.labelDepartment} required>
                      <select
                        id="department"
                        name="department"
                        required
                        value={formData.department}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">{t.placeholderSelect}</option>
                        {t.departments.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                    </InputField>

                    <InputField id="subject" label={t.labelSubject}>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder={t.placeholderSubject}
                        value={formData.subject}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </InputField>
                  </div>

                  <InputField id="message" label={t.labelMessage}>
                    <textarea
                      id="message"
                      name="message"
                      rows={10}
                      placeholder={t.placeholderMessage}
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </InputField>

                  <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs leading-5 text-gray-400">
                      {t.kvkkConsent}
                    </p>

                    <button
                      type="submit"
                      className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#e55a28] hover:shadow-md active:scale-95"
                    >
                      {t.send}
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ────────────────────────────────────────────── */}
      <section className="bg-[#ecebe6] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-xl font-bold text-secondary">{t.mapTitle}</h2>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* İstanbul */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                    <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold text-secondary">İstanbul</span>
                </div>
                <a
                  href="https://www.google.com/maps/place/NOVVES+ELEKTR%C4%B0K+MOTOR+ANON%C4%B0M+%C5%9E%C4%B0RKET%C4%B0/@40.98007,29.0903326,17z/data=!3m1!4b1!4m6!3m5!1s0x14cac75e28bb963d:0x7d993b6e02755dad!8m2!3d40.9800701!4d29.0952035!16s%2Fg%2F11pkc8df_2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-[#e55a28]"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  {t.openInMap}
                </a>
              </div>
              <div className="overflow-hidden rounded-2xl border border-ink/10 shadow-sm" style={{ height: "380px" }}>
                <iframe
                  title="Novves İstanbul"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3005.1!2d29.0952035!3d40.9800701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cac75e28bb963d:0x7d993b6e02755dad!2sNOVVES+ELEKTR%C4%B0K+MOTOR+ANON%C4%B0M+%C5%9E%C4%B0RKET%C4%B0!5e0!3m2!1str!2str!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Yalova */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                    <svg className="h-3.5 w-3.5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold text-secondary">Yalova</span>
                </div>
                <a
                  href="https://www.google.com/maps/place/NOVVES+ELEKTR%C4%B0K+MOTOR+ANON%C4%B0M+%C5%9E%C4%B0RKET%C4%B0/@40.6808946,29.40223,17z/data=!3m1!4b1!4m6!3m5!1s0x14cae34dfa345cc7:0x688866be4ac613ae!8m2!3d40.6808946!4d29.4048049!16s%2Fg%2F11pkbxgjdc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-[#e55a28]"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  {t.openInMap}
                </a>
              </div>
              <div className="overflow-hidden rounded-2xl border border-ink/10 shadow-sm" style={{ height: "380px" }}>
                <iframe
                  title="Novves Yalova"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.8!2d29.4048049!3d40.6808946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cae34dfa345cc7:0x688866be4ac613ae!2sNOVVES+ELEKTR%C4%B0K+MOTOR+ANON%C4%B0M+%C5%9E%C4%B0RKET%C4%B0!5e0!3m2!1str!2str!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
