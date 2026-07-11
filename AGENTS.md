# Hono Vitals

Demo app for collecting **Core Web Vitals** in the browser, posting them to a Hono server, and persisting them in **ClickHouse**.

> **Note:**
> This document is for agents and LLMs working on this repo. Keep it accurate when you add, move, rename, or delete files, routes, or dependencies.

---

## Purpose

1. **Collect** — Use the [`web-vitals`](https://github.com/GoogleChrome/web-vitals) library in client islands to observe CLS, FCP, INP, LCP, and TTFB.
2. **Ingest** — POST validated metric payloads to `/collect` via `navigator.sendBeacon`.
3. **Store** — Persist metrics in ClickHouse for querying and dashboards.

---

## Stack

| Layer | Choice |
|---|---|
| Runtime | [Bun](https://bun.sh) |
| Server | [Hono](https://hono.dev) + [Honox](https://github.com/honojs/honox) (file-based routing, SSR) |
| Client | React 19 (islands, partial hydration) |
| Validation | [Zod](https://zod.dev) via `@hono/zod-validator` |
| UI | [@base-ui/react](https://base-ui.com) + [Inter](https://fontsource.org/fonts/inter) |
| Metrics | [`web-vitals`](https://github.com/GoogleChrome/web-vitals) v5 |
| Analytics DB | ClickHouse |
| Build | Vite 8 (`@hono/vite-build`, `@hono/vite-dev-server`) |

---

## Layout

```
hono-vitals/
├── app/
│   ├── server.ts              # Custom routes, middleware, /collect, summary API
│   ├── client.ts              # Island hydration entry
│   ├── routes/                # Honox file routes (_renderer, index, metric/*)
│   ├── components/            # Styled Base UI wrappers + shell/toolbar/nav
│   └── islands/               # Hydrated observers + flags editor
├── utils/
│   ├── metric/                # Observers, reporting, query-flag schemas
│   ├── clickhouse/            # Client, insert, summary query, DDL
│   ├── env.ts                 # Validated process.env
│   └── metric-schema.ts       # Shared Metric Zod schema
├── public/                    # Assets at /public/* (metric demo scripts/styles)
├── .cursor/rules/             # Format, git, Hono, Base UI conventions
└── vite.config.ts             # Dual build: client bundle + SSR server
```

Key paths: `app/server.ts` (API), `app/routes/metric/` (demo pages), `utils/metric/flags/` (per-metric query schemas), `utils/clickhouse/` (persistence).

---

## Data Flow

```
Browser (island)                Hono server                 ClickHouse
─────────────────              ─────────────               ──────────
web-vitals onCLS/onLCP/…  →    POST /collect          →    INSERT metrics
reportMetric()                 zValidator({ metric: MetricSchema })
navigator.sendBeacon           insertMetric()              metrics table
                               GET /api/metrics/summary →  SELECT aggregates
                               / (SSR)                  ←    getMetricsSummary()
```

### Metric payload shape

Validated by `utils/metric-schema.ts` — mirrors the [`web-vitals` `Metric`](https://github.com/GoogleChrome/web-vitals#metric) interface:

- `name` — `"CLS" | "FCP" | "INP" | "LCP" | "TTFB"`
- `value`, `delta`, `rating`, `id`, `entries`, `navigationType`

Always reuse `MetricSchema` for server validation. Do not duplicate field definitions.

---

## Conventions

### Server (`app/server.ts`)

- **Architecture:** Custom routes and middleware live in `app/server.ts`. Honox file routes live under `app/routes/`.
- **Validation:** Use `@hono/zod-validator` with shared Zod schemas from `utils/`.
- **Public assets:** Served at `/public/*` from `./public`. Optional `?delay=<ms>` query param for load-testing. `publicDir` is disabled in Vite; the build copies `public/` to `dist/public/`.
- **Collect:** `POST /collect` validates with `MetricSchema`, inserts via `utils/clickhouse/insert-metric.ts`, returns `204` or `500` with no body.
- **Summary API:** `GET /api/metrics/summary` returns aggregated stats validated by `MetricsSummaryResponseSchema`.

### Metrics dashboard (`app/routes/index.tsx`)

- **URL:** `/` — SSR summary page; calls `getMetricsSummary()` directly (no client island).
- **`/metrics`:** Redirects to `/` for backwards compatibility.
- **Display:** Per-metric cards with sample count, average, p75, and good/needs-improvement/poor breakdown.
- **Empty state:** Shows “No metrics collected yet.” when no data has been collected.

### Environment variables

- **Local:** Copy `.env.example` to `.env`. [Bun loads `.env` automatically](https://bun.sh/docs/runtime/env) when the process starts (`bun run dev`, `bun run start`, `bun run clickhouse:init`).
- **Validation:** `utils/env.ts` reads `process.env` and validates with Zod — no custom loader.
- **Vite / Honox:** `vite.config.ts` sets `define: { 'process.env': 'process.env' }` only for the production SSR build so Bun can read env at runtime ([honox#307](https://github.com/honojs/honox/issues/307)). Do not apply in dev — `@vite/client` loads `env.mjs` in the browser and would throw `process is not defined`. Server secrets stay in `.env`; do not use `VITE_` prefixes (those are exposed to the client).
- **Production:** For `bun run start` (`cd dist`), place `.env` in `dist/` or set vars in the shell. Restart the dev server after changing `.env`.

### ClickHouse

- **ClickHouse Cloud:** Create a service at [clickhouse.cloud](https://clickhouse.cloud), open **Connect → HTTPS**, and copy the host URL, username, and password into `.env` (see `.env.example`). Use `https://…:8443` for `CLICKHOUSE_URL`. Run `bun run clickhouse:init` once to create the `metrics` table (or run `CREATE_METRICS_TABLE_SQL` from `utils/clickhouse/sql.ts` in the Cloud SQL console).
- **Table:** `metrics` — DDL in `utils/clickhouse/sql.ts`. Stores `metric_id`, `name`, `value`, `delta`, `rating`, `navigation_type`, `collected_at`.
- **Client:** `@clickhouse/client` singleton in `utils/clickhouse/client.ts`; required env vars validated by `utils/env.ts` — `CLICKHOUSE_URL`, `CLICKHOUSE_USERNAME`, `CLICKHOUSE_PASSWORD` (see `.env.example`).

### Metric demo routes (`app/routes/metric/`)

- **URLs:** `/metric/cls`, `/metric/fcp`, `/metric/inp`, `/metric/lcp`, `/metric/ttfb` — mirrors [web-vitals test views](https://github.com/GoogleChrome/web-vitals/tree/main/test/views).
- **Validation:** Each route uses `zValidator('query', XxxFlagsSchema)` — import from `utils/metric/flags/{cls,fcp,...}.ts`. Booleans use `queryBoolean`; numbers use `queryNumberDefault(n)` or `queryNumberDefault()` when optional. Parsed output always contains every key.
- **Editor:** Each route renders `MetricShell` (includes `FlagsEditor`) with validated `flags` and co-located defaults (e.g. `clsFlagDefaults`). Booleans render as `Switch`; numbers as `NumberField`. List is sorted booleans first, then numbers. `MetricChrome` reads flags/defaults from `MetricShell` context via `useMetricFlags()`.
- **Markup:** SSR content mirrors [web-vitals test views](https://github.com/GoogleChrome/web-vitals/tree/main/test/views); observers live in `app/islands/{cls,fcp,...}.tsx`.

### Client islands (`app/islands/`)

- **Placement:** One metric (or metric group) per island file, e.g. `cls.tsx`.
- **Hydration:** Islands are registered and hydrated via `app/client.ts`.
- **Reporting:** Call `reportMetric()` from `utils/metric/report.ts`. It serializes via `toSafeObject()` and sends `{ metric: … }` to `/collect` via `navigator.sendBeacon`.
- **Batching:** CLS supports optional `batchReporting` — queues updates and flushes on `visibilitychange` to `hidden`.

### TypeScript

- **Strict mode** enabled. Target ESNext, JSX `react-jsx`.
- Prefer shared schemas and utilities in `utils/` over inline duplication.

---

## Commands

| Script | Command | Purpose |
|---|---|---|
| Dev | `bun run dev` | Vite dev server with Honox |
| ClickHouse init | `bun run clickhouse:init` | Create `metrics` table in ClickHouse Cloud |
| Build | `bun run build` | Client bundle + SSR server → `dist/` |
| Start | `bun run start` | Run production build from `dist/` |
| Typecheck | `bun run type:check` | `tsc --noEmit` |
| Lint | `bun run lint` | ESLint (import order + recommended) |
| Lint fix | `bun run lint:fix` | ESLint with `--fix` |
| Format | `bun run format` | Prettier write |

---

## Agent rules

Scoped conventions live in `.cursor/rules/`:

| Rule | Scope |
|---|---|
| `format.mdc` | Run `bun run format` and `bun run lint:fix` after edits |
| `git.mdc` | Commit/push only when asked; lowercase imperative messages |
| `hono.mdc` | Hono/Honox patterns for `app/**/*` |
| `base-ui.mdc` | Base UI components and styling for `app/**/*` |

---

## Agent Maintenance

When you **create**, **move**, **rename**, or **delete** files/directories, or introduce new stack dependencies or routes:

1. **Update this file** in the same task before finishing.
2. **Keep paths accurate** — update the layout section and any affected convention bullets.
3. **Match the style** — short, imperative bullets; one-line comments on layout entries.
4. *(Skip updates for trivial edits inside existing files.)*
