import { cn } from "@/lib/panel/cn";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("panel-skeleton rounded-md", className)} aria-hidden />;
}
