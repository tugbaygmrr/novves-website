/** Tarih/süre biçimlendirme yardımcıları — panel geneli (tr-TR). */

export function relativeTimeTr(input: Date | string | number): string {
  const date = new Date(input);
  const diff = Date.now() - date.getTime();
  const sec = Math.round(diff / 1000);
  const min = Math.round(sec / 60);
  const hour = Math.round(min / 60);
  const day = Math.round(hour / 24);

  if (sec < 45) return "az önce";
  if (min < 60) return `${min} dk önce`;
  if (hour < 24) return `${hour} saat önce`;
  if (day === 1) return "dün";
  if (day < 7) return `${day} gün önce`;
  return date.toLocaleDateString("tr-TR", { day: "2-digit", month: "short" });
}

export function formatDateTr(input: Date | string | number): string {
  return new Date(input).toLocaleDateString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateTimeTr(input: Date | string | number): string {
  return new Date(input).toLocaleString("tr-TR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Byte → okunabilir boyut. */
export function formatBytes(bytes: number): string {
  if (!bytes) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}
