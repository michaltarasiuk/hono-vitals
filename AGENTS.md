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
│   ├── server.ts              # Honox app: routes, middleware, /collect endpoint
│   ├── client.ts              # Island hydration entry (honox/client)
│   ├── style.css              # Global component styles (linked in _renderer)
│   ├── global.d.ts            # React renderer type augmentation
│   ├── routes/
│   │   ├── _renderer.tsx      # HTML shell, Link + Script
│   │   └── metric/            # Demo routes per metric (/metric/cls, …)
│   │       ├── cls.tsx
│   │       ├── fcp.tsx
│   │       ├── inp.tsx
│   │       ├── lcp.tsx
│   │       └── ttfb.tsx
│   ├── components/            # Styled Base UI wrappers (CSS Modules from docs)
│   │   ├── button/
│   │   ├── dialog/
│   │   ├── field/
│   │   └── switch/
│   └── islands/               # Interactive client components (hydrated)
│       └── flags-editor.tsx   # Query-flag editor modal
├── utils/
│   ├── metric/
│   │   └── flags/             # Per-route query flag Zod schemas
│   │       ├── coerce.ts      # queryBoolean (coerce + default false)
│   │       ├── serialize.ts   # applyFlags — URL navigation on save
│   │       ├── shared.ts      # BaseMetricFlagsSchema
│   │       ├── cls.ts         # ClsFlagsSchema
│   │       ├── fcp.ts         # FcpFlagsSchema
│   │       ├── inp.ts         # InpFlagsSchema
│   │       ├── lcp.ts         # LcpFlagsSchema
│   │       └── ttfb.ts        # TtfbFlagsSchema
│   ├── metric-schema.ts       # Shared Zod schema for web-vitals Metric payloads
│   └── delay.ts               # Async delay helper (static asset middleware)
├── static/                    # Public assets served at /static/*
│   └── square.png
├── .cursor/rules/             # Agent rules (git, Hono, Base UI)
├── vite.config.ts             # Dual build: client bundle + SSR server
├── tsconfig.json
└── package.json
```

---

## Data Flow

```
Browser (island)                Hono server                 ClickHouse
─────────────────              ─────────────               ──────────
web-vitals onCLS/onLCP/…  →    POST /collect          →    INSERT metrics
reportMetric()                 zValidator(MetricSchema)
navigator.sendBeacon           toSafeObject on client
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
- **Validation:** Strictly use `@hono/zod-validator` with shared Zod schemas from `utils/`.
- **Static assets:** Served at `/static/*` from `./static`. Optional `?delay=<ms>` query param for load-testing.

### Metric demo routes (`app/routes/metric/`)

- **URLs:** `/metric/cls`, `/metric/fcp`, `/metric/inp`, `/metric/lcp`, `/metric/ttfb` — mirrors [web-vitals test views](https://github.com/GoogleChrome/web-vitals/tree/main/test/views).
- **Validation:** Each route uses `zValidator('query', XxxFlagsSchema)` — import directly from `utils/metric/flags/{cls,fcp,...}.ts`. Flags are **boolean only** (enable/disable toggles). Schemas use `queryBoolean` (`z.coerce.boolean().default(false)`) so parsed output always contains every key.
- **Editor:** Each route renders `FlagsEditor` island with validated `flags` only — no separate keys prop.

### Client islands (`app/islands/`)

- **Placement:** One metric (or metric group) per island file, e.g. `cls.tsx`.
- **Hydration:** Islands are registered and hydrated via `app/client.ts`.
- **Reporting:** Call `reportMetric()` from `utils/metric/report.ts`. It serializes via `toSafeObject()` and sends a beacon to `/collect`.
- **Batching:** CLS supports optional `batchReporting` — queues updates and flushes on `visibilitychange` to `hidden`.

### UI

- **Package:** Use `@base-ui/react` for composable, unstyled primitives.
- **Wrappers:** Reusable styled components in `app/components/`; interactive flows in `app/islands/`.
- **Styling:** Plain global CSS (Base UI class names from docs demos). Aggregate in [`app/style.css`](app/style.css); link via `<Link href="/app/style.css" rel="stylesheet" />` in [`app/routes/_renderer.tsx`](app/routes/_renderer.tsx) so SSR HTML is styled before hydration. No Tailwind.
- **Docs:** Before implementing UI, fetch [https://base-ui.com/llms.txt](https://base-ui.com/llms.txt).

### Hono / Honox

- Before implementing routing, middleware, or validators, fetch and read [https://hono.dev/llms.txt](https://hono.dev/llms.txt).
- Mirror existing patterns in `app/server.ts` and `app/routes/_renderer.tsx`.

### TypeScript

- **Strict mode** enabled. Target ESNext, JSX `react-jsx`.
- Prefer shared schemas and utilities in `utils/` over inline duplication.

### Formatting

- Prettier for formatting (`bun run format`). `AGENTS.md` and `*.mdc` are excluded via `.prettierignore`.
- ESLint `perfectionist/sort-imports` enforces import order (external → `@/` → relative, no blank lines between imports). Run `bun run lint:fix` to apply.
- `.vscode/settings.json` disables TypeScript organize-imports on save and runs ESLint fix instead — avoids fighting the ESLint import order.

---

## Commands

| Script | Command | Purpose |
|---|---|---|
| Dev | `bun run dev` | Vite dev server with Honox |
| Build | `bun run build` | Client bundle + SSR server → `dist/` |
| Start | `bun run start` | Run production build from `dist/` |
| Typecheck | `bun run type:check` | `tsc --noEmit` |
| Lint | `bun run lint` | ESLint (import order + recommended) |
| Lint fix | `bun run lint:fix` | ESLint with `--fix` |
| Format | `bun run format` | Prettier write |

## Agent Maintenance

When you **create**, **move**, **rename**, or **delete** files/directories, or introduce new stack dependencies or routes:

1. **Update this file** in the same task before finishing.
2. **Keep paths accurate** — do not leave stale entries in the layout tree or conventions.
3. **Match the style** — one-line purpose comments on layout entries; short, imperative bullets elsewhere.
4. *(Skip updates for trivial edits inside existing files.)*
