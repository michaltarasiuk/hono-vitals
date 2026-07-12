import { createRoute } from "honox/factory";

import { MetricPageLayout } from "@/app/components/metric/layout";
import { MetricsSummary } from "@/app/components/metrics-summary";
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
    <MetricPageLayout currentPath={c.req.path}>
      <MetricsSummary data={summary} />
    </MetricPageLayout>,
  );
});
