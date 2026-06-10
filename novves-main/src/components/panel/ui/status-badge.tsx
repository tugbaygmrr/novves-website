import { Badge } from "./badge";

const STATUS: Record<string, { label: string; variant: "success" | "warning" | "accent" | "neutral" }> = {
  PUBLISHED: { label: "Yayında", variant: "success" },
  DRAFT: { label: "Taslak", variant: "warning" },
  NEW: { label: "Yeni", variant: "accent" },
  READ: { label: "Okundu", variant: "neutral" },
  ARCHIVED: { label: "Arşiv", variant: "neutral" },
};

export function StatusBadge({ status }: { status: string }) {
  const s = STATUS[status] ?? { label: status, variant: "neutral" as const };
  return (
    <Badge variant={s.variant} dot={s.variant !== "neutral"}>
      {s.label}
    </Badge>
  );
}
