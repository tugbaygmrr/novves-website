# CLAUDE.md

@AGENTS.md


This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Next.js dev server (http://localhost:3000)
- `npm run build` — production build
- `npm run start` — run production build
- `npm run lint` — ESLint (flat config, `eslint-config-next`)

There is no test runner configured.

## Stack

Next.js 16 (App Router) + React 19 + Tailwind v4 (PostCSS) + TypeScript 5. Postgres via `pg`, JWT auth via `jsonwebtoken` + `bcryptjs`, animations via `gsap`. Path alias `@/*` → `src/*`.

**Important:** AGENTS.md flags Next.js 16 as having breaking changes vs. older docs. Consult `node_modules/next/dist/docs/` before assuming an API exists.

## Architecture

### Request pipeline lives in `src/proxy.ts` (not `middleware.ts`)
This codebase uses a `proxy.ts` entrypoint (a Next 16 rename / breaking change). It does three things in order:
1. In-memory rate limiting (500 req/min/IP — replace with Redis for prod).
2. Locale routing: redirects non-locale-prefixed paths to `/{tr|en|ru}/...` based on `accept-language`. Default locale is `tr`.
3. CSP header injection + admin-panel cookie gating (redirect to `/novves-panel` if `admin_access_token`/`admin_refresh_token` cookies are missing). The `matcher` excludes `/api/admin`, static assets, and `/animation*`.

The proxy only checks cookie *presence*. Real JWT verification happens in `/api/admin/*` route handlers — never trust the proxy's auth check alone.

### Two parallel route trees under `src/app/`
- **Public site:** `src/app/[locale]/...` — localized pages (`cozumler`, `hizmetler`, `urunler`, `kurumsal`, `iletisim`, `kvkk`, `surdurulebilirlik`, `teknik-merkez`). Server components load translations via `getDictionary(locale)` from [src/app/[locale]/dictionaries.ts](src/app/[locale]/dictionaries.ts), which `fs.readFileSync`s JSON from `src/app/[locale]/dictionaries/{tr,en,ru}/*.json` at request time. URL slugs are Turkish even for `en`/`ru` locales.
- **Admin CMS:** `src/app/novves-panel/` (login + dashboard) backed by `src/app/api/admin/` route handlers. Content edits write back to the same dictionary JSON files via `/api/admin/content/[file]`, with backups in `/api/admin/content/backup`. Locales are `["tr","en","ru"]` and **must** stay in sync across `src/i18n/config.ts`, `dictionaries.ts`, and `proxy.ts`.

### Admin auth (`src/lib/admin/`)
- `db.ts` — single shared `pg.Pool` (uses `DATABASE_URL`, SSL on in production).
- `auth.ts` — JWT issue/verify, bcrypt password hashing.
- `security.ts`, `rate-limit.ts`, `env.ts` — env validation and per-route rate limiting.
- Auth flow uses split cookies: short-lived `admin_access_token` + longer `admin_refresh_token`.

### Content model
Site copy is **not** in the database — it's the JSON files in `src/app/[locale]/dictionaries/`. Editing copy means editing those JSONs (or going through the admin panel, which writes them). When adding a new section, add the key to **all three** locale files or `loadJson` will throw at request time.

### Components
`src/components/` holds shared UI: `navbar`, `footer`, `language-switcher`, plus heavy GSAP-driven pieces (`fan-assembly-animation`, `scroll-video-section`) that consume the frame sequences in `public/animation/frames-*/`. These frame folders are large — avoid bulk-editing them.

## Conventions

- Server-only modules import `"server-only"` (e.g. `dictionaries.ts`) — keep it that way; the JSON loader uses `fs` and must never bundle to the client.
- Security headers are defined in **two places**: static ones in `next.config.ts` (`headers()`), CSP dynamically in `proxy.ts`. Update both if changing policy.
- Locale list is duplicated in `src/i18n/config.ts` and `dictionaries.ts` — keep them in sync.
