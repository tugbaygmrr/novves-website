"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/** Site navbar (fixed) altı — Hizmetler shell ile uyumlu */
function stickyTopOffsetPx(): number {
  if (typeof window === "undefined") return 112;
  if (window.matchMedia("(min-width: 1024px)").matches) return 112;
  if (window.matchMedia("(min-width: 640px)").matches) return 96;
  return 80;
}

type PinMode = "static" | "fixed" | "bottom";

/**
 * CSS sticky overflow-x-hidden ile bozulabildiği için scroll’da fixed pin.
 * Liste sütunu (rail) bitince kutu footer’a doğru normal akışa döner.
 */
export function ReferanslarStickyCatalog({ children }: { children: ReactNode }) {
  const railRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [pin, setPin] = useState<PinMode>("static");
  const [fixedStyle, setFixedStyle] = useState<CSSProperties>({});

  const update = useCallback(() => {
    const rail = railRef.current;
    const box = boxRef.current;
    if (!rail || !box) return;

    const top = stickyTopOffsetPx();
    const railRect = rail.getBoundingClientRect();
    const boxHeight = box.offsetHeight;

    if (railRect.top >= top) {
      setPin("static");
      setFixedStyle({});
      return;
    }

    if (railRect.bottom <= top + boxHeight) {
      setPin("bottom");
      setFixedStyle({});
      return;
    }

    setPin("fixed");
    setFixedStyle({
      position: "fixed",
      top,
      left: railRect.left,
      width: railRect.width,
      zIndex: 20,
    });
  }, []);

  useLayoutEffect(() => {
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const ro = new ResizeObserver(update);
    const rail = railRef.current;
    const box = boxRef.current;
    if (rail) ro.observe(rail);
    if (box) ro.observe(box);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ro.disconnect();
    };
  }, [update]);

  const boxClassName =
    pin === "bottom"
      ? "absolute bottom-0 left-0 right-0 w-full"
      : pin === "static"
        ? "relative w-full"
        : "w-full";

  return (
    <div ref={railRef} className="relative hidden w-full xl:block">
      <div ref={boxRef} className={boxClassName} style={pin === "fixed" ? fixedStyle : undefined}>
        {children}
      </div>
    </div>
  );
}
