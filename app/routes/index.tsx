import { createRoute } from "honox/factory";

import { MetricsSummary } from "@/app/components/metrics-summary";
import { MetricToolbar } from "@/app/components/toolbar";
import { MetricSummary } from "@/utils/metrics-summary-schema";

export default createRoute(async (c) => {
  let summary: MetricSummary[] = [];
  try {
    const { getMetricsSummary } = await import("@/utils/clickhouse/summary");
    summary = await getMetricsSummary();
  } catch (error) {
    console.error(error);
  }

  return c.render(
    <>
      <MetricToolbar currentPath={c.req.path} />
      <main className="metric-shell">
        <MetricsSummary data={summary} />
      </main>
    </>,
  );
});
