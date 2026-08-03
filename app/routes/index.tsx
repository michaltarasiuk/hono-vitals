import { createRoute } from "honox/factory";

import { MetricsSummary } from "@/app/components/dashboard/metrics-summary";
import { Toolbar } from "@/app/components/layout/toolbar";
import { getMetricsSummary } from "@/lib/analytics/metrics";

export default createRoute(async (c) => {
  const summaries = await getMetricsSummary();

  return c.render(
    <>
      <Toolbar.Root>
        <Toolbar.Nav currentPath={c.req.path} />
      </Toolbar.Root>
      <main className="MetricMain">
        <MetricsSummary summaries={summaries} />
      </main>
    </>,
  );
});
