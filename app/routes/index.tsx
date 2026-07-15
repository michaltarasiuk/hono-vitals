import { createRoute } from "honox/factory";

import { MetricsSummary } from "@/app/components/dashboard/metrics-summary";
import { Toolbar } from "@/app/components/layout/toolbar";
import { emptyMetricsSummary } from "@/lib/analytics/summary-schema";

export default createRoute(async (c) => {
  const summary = await import("@/lib/analytics/clickhouse/summary")
    .then(({ getMetricsSummary }) => getMetricsSummary())
    .catch((error) => {
      console.error("Failed to load metrics summary for dashboard", error);
      return emptyMetricsSummary();
    });

  const totalSamples = summary.reduce((sum, metric) => sum + metric.count, 0);

  return c.render(
    <>
      <Toolbar.Root>
        <Toolbar.Nav currentPath={c.req.path} />
      </Toolbar.Root>
      <main className="metric-shell">
        <MetricsSummary.Root>
          <MetricsSummary.Title />
          <MetricsSummary.Lead totalSamples={totalSamples} />
          <MetricsSummary.Grid>
            {summary.map((metric) => (
              <MetricsSummary.Card key={metric.name} summary={metric} />
            ))}
          </MetricsSummary.Grid>
        </MetricsSummary.Root>
      </main>
    </>,
  );
});
