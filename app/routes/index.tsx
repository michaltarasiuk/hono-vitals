import { createRoute } from "honox/factory";

import { MetricsSummary } from "@/app/components/dashboard/metrics-summary";
import { Toolbar } from "@/app/components/layout/toolbar";

export default createRoute(async (c) => {
  const summary = await import("@/lib/analytics/clickhouse/summary")
    .then(({ getMetricsSummary }) => getMetricsSummary())
    .catch((error) => {
      console.error("Failed to load metrics summary for dashboard", error);
      return [];
    });

  return c.render(
    <>
      <Toolbar currentPath={c.req.path} />
      <main className="metric-shell">
        <MetricsSummary data={summary} />
      </main>
    </>,
  );
});
