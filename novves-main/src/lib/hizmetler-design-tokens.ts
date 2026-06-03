/**
 * Novves Hizmetler (Stitch) — Material palette from public/embed/hizmetler-stitch.html
 * Site geneli `--secondary` gri; burada turuncu/lacivert stitch tokenları kullanılır.
 */
export const HIZMETLER_DESIGN = {
  secondary: "#ab3500",
  secondaryContainer: "#fe6a34",
  primaryContainer: "#131b2e",
  onSurface: "#191c1e",
  onSurfaceVariant: "#45464d",
  onPrimaryContainer: "#7c839b",
  onPrimary: "#ffffff",
  outline: "#76777d",
  surface: "#ffffff",
  sand: "#f4f4ea",
  border: "#d8d8cd",
} as const;

/** Tailwind CDN config — iframe hub ile stitch HTML aynı sınıfları paylaşır */
export const HIZMETLER_TAILWIND_CONFIG_SCRIPT = `<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "secondary-container": "${HIZMETLER_DESIGN.secondaryContainer}",
                        "outline-variant": "#c6c6cd",
                        "surface-container-lowest": "#ffffff",
                        primary: "#000000",
                        "inverse-primary": "#bec6e0",
                        "surface-tint": "#565e74",
                        "on-surface-variant": "${HIZMETLER_DESIGN.onSurfaceVariant}",
                        "on-error": "#ffffff",
                        outline: "${HIZMETLER_DESIGN.outline}",
                        "on-primary-container": "${HIZMETLER_DESIGN.onPrimaryContainer}",
                        secondary: "${HIZMETLER_DESIGN.secondary}",
                        "on-primary": "${HIZMETLER_DESIGN.onPrimary}",
                        "primary-container": "${HIZMETLER_DESIGN.primaryContainer}",
                        "on-surface": "${HIZMETLER_DESIGN.onSurface}",
                        surface: "#f7f9fb",
                        background: "#f7f9fb",
                    },
                    fontFamily: {
                        headline: ["Inter"],
                        body: ["Inter"],
                    },
                },
            },
        };
    </script>`;
