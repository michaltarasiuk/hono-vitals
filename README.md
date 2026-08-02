# Vitals Lab

A local playground for exercising [web-vitals](https://github.com/GoogleChrome/web-vitals) (CLS, FCP, INP, LCP, TTFB). Each metric has a dedicated page with query-string flags that recreate edge cases; reports are collected into DuckDB and summarized on the home dashboard.

## Prerequisites

- [mise](https://mise.jdx.dev) (pins Bun via `mise.toml`)

## Setup

```bash
mise install
bun install
cp .env.example .env
```

`DUCKDB_PATH` defaults to `data/vitals.duckdb`. The metrics table is created automatically on server boot (`CREATE TABLE IF NOT EXISTS`). Use `bun run duckdb:init` only if you want to migrate without starting the app.

## Scripts

| Command                           | Description                                     |
| --------------------------------- | ----------------------------------------------- |
| `bun run dev`                     | Start the Honox/Vite dev server                 |
| `bun run build`                   | Client + server production build into `dist/`   |
| `bun run start`                   | Run the production server (`bun dist/index.js`) |
| `bun run duckdb:init`             | Migrate DuckDB without starting the server      |
| `bun run type:check`              | TypeScript (`tsc --noEmit`)                     |
| `bun run lint` / `lint:fix`       | ESLint                                          |
| `bun run format` / `format:check` | Prettier                                        |

## Usage

1. Start the app with `bun run dev`.
2. Open `/` for the metrics summary dashboard.
3. Open a metric page and toggle flags in the UI (or via the query string):

| Route          | Metric                    |
| -------------- | ------------------------- |
| `/metric/cls`  | Cumulative Layout Shift   |
| `/metric/fcp`  | First Contentful Paint    |
| `/metric/inp`  | Interaction to Next Paint |
| `/metric/lcp`  | Largest Contentful Paint  |
| `/metric/ttfb` | Time to First Byte        |

Flags are booleans/numbers validated from the query string (for example `/metric/lcp?attribution=true&imgDelay=500`). Shared flags include delayed DCL/load, render-blocking CSS, `reportAllChanges`, a second observer, deferred library load, attribution, and metric-specific options (INP duration threshold, LCP image delay, batch reporting, and so on).

Observers toast and `console.log` each report, then `sendBeacon` to `POST /collect` with `{ metrics: [...] }` (one metric immediately, or many on batch flush), falling back to `fetch` with `keepalive` if the beacon is refused. The collect handler validates the payload and inserts into DuckDB (`INSERT OR IGNORE` on metric id).

Delayed static assets used by scenarios are served under `/public` (for example `?delay=` on asset URLs).

## Stack

- [Honox](https://github.com/honojs/honox) + [Hono](https://hono.dev) + React 19
- [web-vitals](https://github.com/GoogleChrome/web-vitals) for metric observation
- [DuckDB](https://duckdb.org) via waddler for local analytics storage
- Vite 8, Zod, Base UI
