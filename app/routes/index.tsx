import { createRoute } from "honox/factory";

import { MetricsSummary } from "@/app/components/dashboard/metrics-summary";
import { Toolbar } from "@/app/components/layout/toolbar";
import { getMetricsSummary } from "@/lib/analytics/duckdb/summary";

export default createRoute(async (c) => {
  const summary = await getMetricsSummary();

  const totalSamples = summary.reduce((acc, metric) => acc + metric.count, 0);

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
