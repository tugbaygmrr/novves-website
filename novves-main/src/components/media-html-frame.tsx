"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export function MediaHtmlFrame({
  html,
  frameTitle = "NOVVES Medya Merkezi",
  fitViewport = false,
}: {
  html: string;
  frameTitle?: string;
  /** true: iframe sabit ekran yüksekliğinde + kendi içinde kayar (gömülü native sticky pürüzsüz çalışır). */
  fitViewport?: boolean;
}) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [frameHeight, setFrameHeight] = useState(1200);
  const router = useRouter();
  const pathname = usePathname();

  const syncHeight = useCallback(() => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;
    const bodyHeight = doc.body?.scrollHeight ?? 0;
    const htmlHeight = doc.documentElement?.scrollHeight ?? 0;
    const next = Math.max(bodyHeight, htmlHeight, 640);
    setFrameHeight(next);
  }, []);

  const toggleMobileSidebar = useCallback(() => {
    const win = iframeRef.current?.contentWindow;
    const doc = iframeRef.current?.contentDocument;
    if (doc) {
      const sidebar = doc.getElementById("mobileSidebar");
      const backdrop = doc.getElementById("mobileSidebarBackdrop");
      if (sidebar && backdrop) {
        const isOpen = !sidebar.classList.contains("-translate-x-full");
        if (isOpen) {
          sidebar.classList.add("-translate-x-full");
          backdrop.classList.add("opacity-0", "pointer-events-none");
        } else {
          sidebar.classList.remove("-translate-x-full");
          backdrop.classList.remove("opacity-0", "pointer-events-none");
        }
        return;
      }
    }
    // Fallback: keep postMessage for iframe script handling.
    win?.postMessage({ type: "toggle-mobile-menu" }, "*");
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    if (fitViewport) return; // sabit yükseklik modunda içerik yüksekliğini takip etme

    let resizeObserver: ResizeObserver | null = null;
    let rafId = 0;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    const cleanupFns: Array<() => void> = [];

    const startTracking = () => {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const schedule = () => {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(syncHeight);
      };

      schedule();

      // DOM değişimi / içerik genişleme-daralma
      resizeObserver = new ResizeObserver(schedule);
      const rootEl = doc.documentElement;
      if (rootEl instanceof Element) resizeObserver.observe(rootEl);
      if (doc.body instanceof Element) resizeObserver.observe(doc.body);

      // Geç yüklenen görsellerin boyut etkisini yakala
      doc.querySelectorAll("img").forEach((img) => {
        img.addEventListener("load", schedule);
        cleanupFns.push(() => img.removeEventListener("load", schedule));
      });

      // Geç render/medya yüklemeleri için sürekli yumuşak senkronizasyon.
      intervalId = setInterval(schedule, 1200);
    };

    iframe.addEventListener("load", startTracking);
    startTracking();

    return () => {
      iframe.removeEventListener("load", startTracking);
      if (resizeObserver) resizeObserver.disconnect();
      if (intervalId) clearInterval(intervalId);
      cancelAnimationFrame(rafId);
      cleanupFns.forEach((fn) => fn());
    };
  }, [html, syncHeight, fitViewport]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!event?.data || typeof event.data !== "object") return;
      const type = (event.data as { type?: string }).type;
      if (type === "media-center-height") {
        const next = Number((event.data as { height?: number }).height ?? 0);
        if (!Number.isFinite(next) || next <= 0) return;
        setFrameHeight(Math.max(640, Math.ceil(next)));
        return;
      }
      if (type === "navigate-patents") {
        const locale = (pathname?.split("/")[1] || "tr").trim() || "tr";
        router.push(`/${locale}/kurumsal/patentlerimiz`);
        return;
      }
      if (type === "navigate-media-center") {
        const locale = (pathname?.split("/")[1] || "tr").trim() || "tr";
        router.push(`/${locale}/kurumsal/medya-merkezi`);
        return;
      }
      if (type === "navigate") {
        const href = (event.data as { href?: string }).href;
        if (typeof href === "string" && href.startsWith("/")) {
          router.push(href);
        }
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [pathname, router]);

  return (
    <>
      <button
        type="button"
        aria-label="Menüyü aç"
        className="fixed bottom-5 left-4 z-[70] flex h-12 w-12 items-center justify-center rounded-full bg-[#f4f4ea] text-[#191c1e] shadow-md lg:hidden"
        onClick={toggleMobileSidebar}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </svg>
      </button>
      <iframe
        ref={iframeRef}
        title={frameTitle}
        srcDoc={html}
        className="w-full border-0"
        style={fitViewport ? { height: "calc(100dvh - 6rem)" } : { height: `${frameHeight}px` }}
        scrolling={fitViewport ? "yes" : "no"}
        onLoad={fitViewport ? undefined : syncHeight}
      />
    </>
  );
}
