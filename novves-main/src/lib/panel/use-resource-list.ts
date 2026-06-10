"use client";

import * as React from "react";
import { apiGet, apiDelete } from "./api";
import { toast } from "./stores/toast-store";

export function useResourceList<T>(
  endpoint: string,
  opts?: { extraQuery?: Record<string, string> },
) {
  const [items, setItems] = React.useState<T[]>([]);
  const [total, setTotal] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(25);
  const [page, setPage] = React.useState(1);
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const extraKey = JSON.stringify(opts?.extraQuery ?? {});

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (status) params.set("status", status);
      params.set("page", String(page));
      const extra = JSON.parse(extraKey) as Record<string, string>;
      for (const [k, v] of Object.entries(extra)) if (v) params.set(k, v);
      const json = await apiGet<{ items: T[]; total?: number; pageSize?: number }>(
        `${endpoint}?${params.toString()}`,
      );
      setItems(json.items ?? []);
      setTotal(json.total ?? json.items?.length ?? 0);
      if (json.pageSize) setPageSize(json.pageSize);
    } catch {
      toast.error("Liste yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, [endpoint, q, status, page, extraKey]);

  React.useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  React.useEffect(() => {
    setPage(1);
  }, [q, status, extraKey]);

  const remove = React.useCallback(
    async (id: number) => {
      await apiDelete(`${endpoint}/${id}`);
      toast.success("Silindi");
      load();
    },
    [endpoint, load],
  );

  return {
    items,
    total,
    page,
    pageSize,
    setPage,
    q,
    setQ,
    status,
    setStatus,
    loading,
    reload: load,
    remove,
  };
}
