"use client";

/** httpOnly olmayan `admin_csrf_token` çerezini okur (yazma istekleri için header). */
export function readCsrf(): string {
  if (typeof document === "undefined") return "";
  const raw =
    document.cookie
      .split("; ")
      .find((c) => c.startsWith("admin_csrf_token="))
      ?.split("=")[1] ?? "";
  return decodeURIComponent(raw);
}
