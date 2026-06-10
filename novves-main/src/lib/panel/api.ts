"use client";

import { readCsrf } from "./csrf";

export class ApiError extends Error {
  status: number;
  payload: unknown;
  constructor(message: string, status: number, payload?: unknown) {
    super(message);
    this.status = status;
    this.payload = payload;
  }
}

export async function apiGet<T = unknown>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError((json as { error?: string })?.error || "İstek başarısız", res.status, json);
  return json as T;
}

async function send<T = unknown>(method: string, url: string, body?: unknown): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json", "x-csrf-token": readCsrf() },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError((json as { error?: string })?.error || "İşlem başarısız", res.status, json);
  return json as T;
}

export const apiPost = <T = unknown>(url: string, body?: unknown) => send<T>("POST", url, body);
export const apiPut = <T = unknown>(url: string, body?: unknown) => send<T>("PUT", url, body);
export const apiPatch = <T = unknown>(url: string, body?: unknown) => send<T>("PATCH", url, body);
export const apiDelete = <T = unknown>(url: string) => send<T>("DELETE", url);
