# Web Vitals Lab

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
2. Open `/` for the metrics summary dashboard (cards link to each metric page; **Clear samples** wipes DuckDB).
3. Open a metric page and toggle flags in the UI (or via the query string):

| Route          | Metric                    |
| -------------- | ------------------------- |
| `/metric/cls`  | Cumulative Layout Shift   |
| `/metric/fcp`  | First Contentful Paint    |
| `/metric/inp`  | Interaction to Next Paint |
| `/metric/lcp`  | Largest Contentful Paint  |
| `/metric/ttfb` | Time to First Byte        |

Flags are booleans/numbers validated from the query string (for example `/metric/lcp?attribution=true&imgDelay=500`).

Observers toast and `console.log` each report, then `sendBeacon` to `POST /collect` with `{ metrics: [...] }` (one metric immediately, or many on batch flush), falling back to the typed Hono client (`collectClient`) with `keepalive` if the beacon is refused. The collect handler validates the payload and inserts into DuckDB (`INSERT OR REPLACE` on metric id). `DELETE /collect` (also via `collectClient`) clears all rows.

Delayed static assets used by scenarios are served under `/public` (for example `?delay=` on asset URLs).

For debugging, enable **Preserve log** in the browser DevTools (Console and Network panels). Reports are sent via `sendBeacon` on lifecycle events like `pagehide`/`visibilitychange`, and pages can reload as part of a scenario (for example prerender), so without **Preserve log** those console logs and network requests are wiped before you can inspect them.

## Flag catalog

Shared and metric-specific query flags. Defaults apply when the flag is omitted. Boolean flags are only written to the URL when `true`.

### Shared (all metrics)

| Flag                    | Type    | Default | Description                                                            |
| ----------------------- | ------- | ------- | ---------------------------------------------------------------------- |
| `delayDomContentLoaded` | number  | `0`     | Delay (ms) before a deferred script that holds DCL fires               |
| `delayLoad`             | number  | `0`     | Delay (ms) before an async script that holds `load` fires              |
| `renderBlocking`        | number  | `0`     | Delay (ms) for a render-blocking stylesheet                            |
| `reportAllChanges`      | boolean | `false` | Pass `reportAllChanges` to the primary observer                        |
| `secondObserver`        | boolean | `false` | Register a second observer (instance `2`)                              |
| `reportAllChanges2`     | boolean | `false` | `reportAllChanges` for the second observer                             |
| `deferLibraryLoad`      | boolean | `false` | Defer importing `web-vitals` until after first paint                   |
| `loadAfterInput`        | boolean | `false` | Wait for first input before loading `web-vitals`                       |
| `stubHidden`            | boolean | `false` | Stub `document.visibilityState` / visibility entries as `hidden`       |
| `wasDiscarded`          | boolean | `false` | Stub `document.wasDiscarded` as `true`                                 |
| `htmlHidden`            | boolean | `false` | Set the `hidden` attribute on the main content                         |
| `prerender`             | boolean | `false` | Inject Speculation Rules and a prerender link for the current flag URL |
| `attribution`           | boolean | `false` | Load the attribution build of `web-vitals`                             |
| `batchReporting`        | boolean | `false` | Queue reports and flush on `visibilitychange` / `pagehide` / dispose   |

### Shared (CLS, INP, LCP)

| Flag              | Type    | Default | Description                                             |
| ----------------- | ------- | ------- | ------------------------------------------------------- |
| `generateTarget`  | boolean | `false` | Pass a `generateTarget` helper that reads `data-target` |
| `generateTarget2` | boolean | `false` | Same for the second observer                            |

### CLS

| Flag             | Type    | Default | Description                                 |
| ---------------- | ------- | ------- | ------------------------------------------- |
| `noLayoutShifts` | boolean | `false` | Skip shifting images; page stays shift-free |
| `imgHidden`      | boolean | `false` | Hide the primary delayed image              |
| `img2Hidden`     | boolean | `false` | Hide the secondary delayed image            |

### FCP

| Flag        | Type    | Default | Description                      |
| ----------- | ------- | ------- | -------------------------------- |
| `imgDelay`  | number  | `500`   | Delay (ms) for the content image |
| `imgHidden` | boolean | `false` | Hide the content image           |

### INP

| Flag                           | Type    | Default | Description                                                |
| ------------------------------ | ------- | ------- | ---------------------------------------------------------- |
| `durationThreshold`            | number  | `40`    | `durationThreshold` (ms) for the primary observer          |
| `durationThreshold2`           | number  | `40`    | Same for the second observer                               |
| `includeProcessedEventEntries` | boolean | `false` | Pass `includeProcessedEventEntries` when attribution is on |
| `clickBlockingTime`            | number  | `0`     | Main-thread block (ms) on `click`                          |
| `keydownBlockingTime`          | number  | `0`     | Main-thread block (ms) on `keydown`                        |
| `keyupBlockingTime`            | number  | `0`     | Main-thread block (ms) on `keyup`                          |
| `mousedownBlockingTime`        | number  | `0`     | Main-thread block (ms) on `mousedown`                      |
| `mouseupBlockingTime`          | number  | `0`     | Main-thread block (ms) on `mouseup`                        |
| `pointerdownBlockingTime`      | number  | `0`     | Main-thread block (ms) on `pointerdown`                    |
| `pointerupBlockingTime`        | number  | `0`     | Main-thread block (ms) on `pointerup`                      |

### LCP

| Flag                         | Type    | Default | Description                                                 |
| ---------------------------- | ------- | ------- | ----------------------------------------------------------- |
| `registerOnVisibilityChange` | boolean | `false` | Register `onLCP` only after `visibilitychange` to `visible` |
| `removeElement`              | boolean | `false` | Remove the LCP image element before observing               |
| `imgDelay`                   | number  | `500`   | Delay (ms) for the LCP image                                |
| `imgHidden`                  | boolean | `false` | Hide the LCP image                                          |

### TTFB

| Flag            | Type    | Default | Description                                              |
| --------------- | ------- | ------- | -------------------------------------------------------- |
| `imgDelay`      | number  | `500`   | Delay (ms) for the page image                            |
| `imgHidden`     | boolean | `false` | Hide the page image                                      |
| `responseStart` | number  | `0`     | Override navigation timing `responseStart` (ms) when > 0 |

## Stack

- [Honox](https://github.com/honojs/honox) + [Hono](https://hono.dev) + React 19
- [web-vitals](https://github.com/GoogleChrome/web-vitals) for metric observation
- [DuckDB](https://duckdb.org) via waddler for local analytics storage
- Vite 8, Zod, Base UI
