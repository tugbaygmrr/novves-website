"use client";

import { create } from "zustand";

export type ToastVariant = "default" | "success" | "error" | "warning" | "info";

export interface ToastItem {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
}

interface ToastState {
  toasts: ToastItem[];
  push: (t: Omit<ToastItem, "id">) => number;
  dismiss: (id: number) => void;
}

let counter = 0;

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  push: (t) => {
    const id = ++counter;
    set((s) => ({ toasts: [...s.toasts, { ...t, id }] }));
    return id;
  },
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((x) => x.id !== id) })),
}));

interface ToastOpts {
  description?: string;
  duration?: number;
}

function show(variant: ToastVariant, title: string, opts?: ToastOpts) {
  return useToastStore.getState().push({
    title,
    description: opts?.description,
    variant,
    duration: opts?.duration ?? 4000,
  });
}

/** Global toast tetikleyici — `toast.success("Kaydedildi")` gibi her yerden çağrılır. */
export const toast = {
  show: (title: string, opts?: ToastOpts) => show("default", title, opts),
  success: (title: string, opts?: ToastOpts) => show("success", title, opts),
  error: (title: string, opts?: ToastOpts) => show("error", title, opts),
  warning: (title: string, opts?: ToastOpts) => show("warning", title, opts),
  info: (title: string, opts?: ToastOpts) => show("info", title, opts),
  dismiss: (id: number) => useToastStore.getState().dismiss(id),
};
