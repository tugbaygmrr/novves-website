"use client";

import { create } from "zustand";
import { setByPath } from "@/lib/admin/path-utils";

export interface EditorRevision {
  id: number;
  at: number;
  snapshot: string;
  label: string;
}

interface EditorState {
  present: unknown;
  past: unknown[];
  future: unknown[];
  /** En son kaydedilen halin JSON serileştirmesi. */
  savedSnapshot: string;
  revisions: EditorRevision[];

  init: (data: unknown) => void;
  update: (data: unknown) => void;
  setPath: (path: string, value: unknown) => void;
  undo: () => void;
  redo: () => void;
  markSaved: (label?: string) => void;
  restore: (snapshot: string) => void;
  reset: () => void;
}

const HISTORY_LIMIT = 60;
let revisionCounter = 0;

function serialize(value: unknown): string {
  try {
    return JSON.stringify(value ?? null);
  } catch {
    return "";
  }
}

export const useEditorStore = create<EditorState>((set, get) => ({
  present: null,
  past: [],
  future: [],
  savedSnapshot: "",
  revisions: [],

  init: (data) =>
    set({
      present: data,
      past: [],
      future: [],
      savedSnapshot: serialize(data),
      revisions: [],
    }),

  update: (data) =>
    set((s) => ({
      past: [...s.past, s.present].slice(-HISTORY_LIMIT),
      present: data,
      future: [],
    })),

  setPath: (path, value) =>
    set((s) => ({
      past: [...s.past, s.present].slice(-HISTORY_LIMIT),
      present: path ? setByPath(s.present, path, value) : value,
      future: [],
    })),

  undo: () => {
    const { past, present, future } = get();
    if (past.length === 0) return;
    const prev = past[past.length - 1];
    set({
      past: past.slice(0, -1),
      present: prev,
      future: [present, ...future].slice(0, HISTORY_LIMIT),
    });
  },

  redo: () => {
    const { past, present, future } = get();
    if (future.length === 0) return;
    const next = future[0];
    set({
      past: [...past, present].slice(-HISTORY_LIMIT),
      present: next,
      future: future.slice(1),
    });
  },

  markSaved: (label = "Kaydedildi") => {
    const snapshot = serialize(get().present);
    set((s) => ({
      savedSnapshot: snapshot,
      revisions: [
        { id: ++revisionCounter, at: Date.now(), snapshot, label },
        ...s.revisions,
      ].slice(0, 25),
    }));
  },

  restore: (snapshot) => {
    try {
      get().update(JSON.parse(snapshot));
    } catch {
      /* yok say */
    }
  },

  reset: () =>
    set({ present: null, past: [], future: [], savedSnapshot: "", revisions: [] }),
}));

/** Mevcut present kaydedilmemiş mi? */
export function selectDirty(s: EditorState): boolean {
  return serialize(s.present) !== s.savedSnapshot;
}
