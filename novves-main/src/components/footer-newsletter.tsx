"use client";

import { useState } from "react";

export function FooterNewsletter({
  placeholder,
  submitLabel,
}: {
  placeholder: string;
  submitLabel: string;
}) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSent(true);
        setEmail("");
        window.setTimeout(() => setSent(false), 3500);
      }}
      className="mt-3 flex h-10 max-w-sm items-stretch overflow-hidden rounded-lg border border-white/15 bg-white/[0.04] focus-within:border-primary/55"
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={sent ? "Teşekkürler — kaydedildi." : placeholder}
        aria-label={submitLabel}
        className="flex-1 bg-transparent px-3 text-fine text-white placeholder:text-white/45 focus:outline-none"
      />
      <button
        type="submit"
        aria-label={submitLabel}
        className="flex w-11 shrink-0 items-center justify-center bg-primary text-white transition-colors duration-300 hover:bg-primary-deep"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </button>
    </form>
  );
}
