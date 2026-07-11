import { createRoute } from "honox/factory";

import { MetricsSummary } from "@/app/components/metrics-summary";
import { MetricToolbar } from "@/app/components/toolbar";

export default createRoute(async (c) => {
  const summary = await import("@/utils/clickhouse/summary")
    .then(({ getMetricsSummary }) => getMetricsSummary())
    .catch((error) => {
      console.error(error);
      return [];
    });

  return c.render(
    <>
      <MetricToolbar currentPath={c.req.path} />
      <main className="metric-shell">
        <MetricsSummary data={summary} />
      </main>
    </>,
  );
});
