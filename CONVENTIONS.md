# Conventions

Naming and layout rules for this repo.

## Honox islands

- Files that hydrate on the client use the `$` prefix (for example `$nav.tsx`, `$flags-editor.tsx`).
- Use `islandId()` from `@/lib/utils/island-id` for DOM `id`, `htmlFor`, and trigger ids — not React `useId()` (SSR and hydration disagree on `useId()` values).

## Files and folders

- **File names**: kebab-case (`metric-stats-card.tsx`, `send-metrics.ts`).
- **Compound components**: a bare noun file is fine when it exports a compound object (`header.tsx` → `Header`, `metrics.tsx` → `Metrics`).
- **`app/routes`**: Honox file-based routes (URL paths).
- **`app/entries`**: Vite client bundle entry points (metric observers).
- **`lib/metric`**: metric domain logic (flags, observers, reporters, toast).
- **`lib/collect`**: client → server metric submission (`send-metrics.ts`).
- **`lib/nav`**: navigation config, not Honox routes.
- **`lib/utils`**: small shared helpers (`cn`, `delay`, `capitalize`, etc.).
- **`lib/fixtures`**: static test/demo content.

## Symbols

- **Web Vitals acronyms**: constants and route slugs follow Web Vitals (`METRIC_NAMES`, `/metric/cls`).
- **React page components**: PascalCase with a `Page` suffix (`ClsPage`, `InpPage`).
- **Avoid name collisions**:
  - Client POST/beacon path: `sendMetric` / `sendMetrics` in `lib/collect/send-metrics.ts`.
  - Observer pipeline: `lib/metric/reporter/` (`createMetricReporter`, `createBatchReporter`).
  - DB client export: `db` (not `sql`) from `lib/db/client.ts`.
  - Collected payload type: `CollectedMetric` (distinct from DB `Metric` and web-vitals `Metric`).
