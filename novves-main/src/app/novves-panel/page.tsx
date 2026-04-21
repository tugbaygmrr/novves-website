"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/* â”€â”€ ÃœrÃ¼n vitrin verileri â”€â”€ */
const SHOWCASE_PRODUCTS = [
  {
    name: "DRAGONFLY-C",
    category: "Aksiyal Jet Fan",
    spec: "F300 / 2H",
    image: "/images/products/dragonfly-c.png",
  },
  {
    name: "MARLIN",
    category: "Jet Fan",
    spec: "F400 / 2H",
    image: "/images/products/marlin.png",
  },
  {
    name: "TIGER-PRE",
    category: "Radyal Fan",
    spec: "EN 12101-3",
    image: "/images/products/tiger-pre.png",
  },
  {
    name: "DOLPHIN-PRE",
    category: "Ã‡atÄ± FanÄ±",
    spec: "F300 / 120Â°",
    image: "/images/products/dolphin-pre.png",
  },
];

const STATS = [
  { value: "1.200+", label: "ÃœrÃ¼n" },
  { value: "113+", label: "Proje" },
  { value: "18+", label: "Ãœlke" },
];

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [activeProduct, setActiveProduct] = useState(0);

  // Auto-rotate products
  useEffect(() => {
    const t = setInterval(
      () => setActiveProduct((p) => (p + 1) % SHOWCASE_PRODUCTS.length),
      4000
    );
    return () => clearInterval(t);
  }, []);

  // Check if already authenticated
  useEffect(() => {
    fetch("/api/admin/auth/verify")
      .then((r) => r.json())
      .then((d) => {
        if (d.authenticated) router.replace("/NOVVES-panel/dashboard");
        else setChecking(false);
      })
      .catch(() => setChecking(false));
  }, [router]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "GiriÅŸ baÅŸarÄ±sÄ±z");
        setLoading(false);
        return;
      }
      router.replace("/NOVVES-panel/dashboard");
    } catch {
      setError("Sunucu hatasÄ±");
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-orange-500" />
      </div>
    );
  }

  const product = SHOWCASE_PRODUCTS[activeProduct];

  return (
    <div className="flex min-h-screen bg-white">
      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SOL TARAF â€” ÃœrÃ¼n Vitrini (aÃ§Ä±k tema)
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div className="relative hidden w-[52%] overflow-hidden border-r border-gray-100 bg-gray-50 lg:block">
        {/* Background effects */}
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.08]"
            style={{ background: "radial-gradient(circle, #FF6B35, transparent 70%)" }}
          />
          <div
            className="absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage: "radial-gradient(#d1d5db 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* Top â€” Logo */}
        <div className="relative z-10 px-10 pt-10">
          <img
            src="/images/novves-logo.svg"
            alt="NOVVES"
            className="h-9"
          />
        </div>

        {/* Center â€” Product showcase */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-10 pb-32">
          {/* Product image */}
          <div className="relative mb-10 h-[280px] w-[280px]">
            <div className="absolute inset-0 rounded-full border border-dashed border-gray-200" />
            <div className="absolute inset-8 rounded-full border border-gray-100" />
            <div className="absolute inset-16 rounded-full border border-dashed border-orange-200" />

            <div className="absolute inset-0 flex items-center justify-center">
              <img
                key={product.name}
                src={product.image}
                alt={product.name}
                className="h-48 w-48 object-contain transition-all duration-700"
                style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.08))" }}
              />
            </div>

            <div
              className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500 shadow-md shadow-orange-500/40"
              style={{ animation: "orbitDot 8s linear infinite", transformOrigin: "50% 140px" }}
            />
          </div>

          {/* Product info */}
          <div className="text-center">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-orange-500">
              {product.category}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h2>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-medium text-gray-500">{product.spec}</span>
            </div>
          </div>

          {/* Product dots */}
          <div className="mt-8 flex gap-2">
            {SHOWCASE_PRODUCTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveProduct(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === activeProduct
                    ? "w-8 bg-orange-500"
                    : "w-1.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom â€” Stats */}
        <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-gray-200 bg-white/80 backdrop-blur-sm">
          <div className="flex">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`flex flex-1 flex-col items-center py-5 ${
                  i < STATS.length - 1 ? "border-r border-gray-100" : ""
                }`}
              >
                <span className="text-lg font-bold text-orange-500">{s.value}</span>
                <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.15em] text-gray-400">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes orbitDot {
            from { transform: translateX(-50%) rotate(0deg); }
            to { transform: translateX(-50%) rotate(360deg); }
          }
        `}</style>
      </div>

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          SAÄ TARAF â€” AÃ§Ä±k Tema GiriÅŸ Formu
          â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div className="relative flex flex-1 items-center justify-center bg-white px-6">
        {/* Subtle background pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="mb-8 lg:hidden">
            <img
              src="/images/novves-logo.svg"
              alt="NOVVES"
              className="h-8"
            />
          </div>

          {/* Header */}
          <div className="mb-10">
            <div className="mb-4 flex items-center gap-3">
              <img src="/images/novves-icon.svg" alt="" className="h-6 w-6" />
              <div className="h-[2px] w-6 rounded-full bg-orange-500" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-500">
                YÃ¶netim Paneli
              </span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              HoÅŸ Geldiniz
            </h1>
            <p className="mt-2 text-[14px] leading-relaxed text-gray-400">
              Ä°Ã§erik yÃ¶netim paneline eriÅŸmek iÃ§in giriÅŸ yapÄ±n.
            </p>
          </div>

          {/* Login form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mb-2 block text-[12px] font-semibold text-gray-700">
                KullanÄ±cÄ± AdÄ±
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/80 py-3.5 pl-12 pr-4 text-[14px] text-gray-900 placeholder-gray-300 outline-none transition-all duration-200 focus:border-orange-400 focus:bg-white focus:shadow-lg focus:shadow-orange-500/5 focus:ring-2 focus:ring-orange-500/10"
                  placeholder="KullanÄ±cÄ± adÄ±nÄ±z"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[12px] font-semibold text-gray-700">
                Åifre
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300">
                  <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/80 py-3.5 pl-12 pr-4 text-[14px] text-gray-900 placeholder-gray-300 outline-none transition-all duration-200 focus:border-orange-400 focus:bg-white focus:shadow-lg focus:shadow-orange-500/5 focus:ring-2 focus:ring-orange-500/10"
                  placeholder="Åifreniz"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <svg className="h-4 w-4 shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span className="text-[13px] font-medium text-red-600">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full overflow-hidden rounded-xl bg-orange-500 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-orange-500/25 transition-all duration-300 hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/30 active:scale-[0.98] disabled:opacity-50"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    GiriÅŸ yapÄ±lÄ±yor...
                  </>
                ) : (
                  <>
                    GiriÅŸ Yap
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Bottom security info */}
          <div className="mt-10 space-y-4">
            <div className="h-px bg-gray-100" />

            <div className="flex items-center justify-between text-[11px] font-medium text-gray-300">
              <div className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                SSL KorumalÄ±
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                </svg>
                Åifreli Oturum
              </div>
              <div className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                15dk Oturum
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

