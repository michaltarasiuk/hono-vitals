import type { Hono } from "hono";

import { MetricsSummaryResponseSchema } from "@/lib/analytics/summary-schema";

export function registerSummaryRoute(app: Hono) {
  app.get("/api/metrics/summary", async (context) => {
    try {
      const { getMetricsSummary } =
        await import("@/lib/analytics/clickhouse/summary");

      const summary = await getMetricsSummary();
      const parsed = MetricsSummaryResponseSchema.parse(summary);

      return context.json(parsed);
    } catch (error) {
      console.error(error);
      return context.status(500);
    }
  });
}
