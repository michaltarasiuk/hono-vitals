import { createRoute } from "honox/factory";

import { MetricsSummary } from "@/app/components/dashboard/metrics-summary";
import { Page } from "@/app/components/layout/page";
import { MetricSummary } from "@/lib/analytics/summary-schema";

export default createRoute(async (c) => {
  let summary: MetricSummary[] = [];
  try {
    const { getMetricsSummary } =
      await import("@/lib/analytics/clickhouse/summary");
    summary = await getMetricsSummary();
  } catch (error) {
    console.error(error);
  }

  return c.render(
    <>
      <Page.Toolbar currentPath={c.req.path} />
      <Page.Main>
        <MetricsSummary.Data data={summary} />
      </Page.Main>
    </>,
  );
});
