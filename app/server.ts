import { zValidator } from "@hono/zod-validator";
import { serveStatic } from "hono/bun";
import { showRoutes } from "hono/dev";
import { createApp } from "honox/server";
import * as z from "zod";

import { delay } from "@/utils/delay";
import { MetricSchema } from "@/utils/metric-schema";
import { MetricsSummaryResponseSchema } from "@/utils/metrics-summary-schema";

const app = createApp();

const StaticQuerySchema = z.object({
  delay: z.coerce.number().optional(),
});

app
  .use("/static/*", zValidator("query", StaticQuerySchema))
  .use("/static/*", async (context, next) => {
    const { delay: timeout } = context.req.valid("query") as z.infer<
      typeof StaticQuerySchema
    >;
    if (timeout !== undefined) {
      await delay(timeout);
    }
    await next();
  })
  .use(
    "/static/*",
    serveStatic({
      root: ".",
    }),
  );

app.post(
  "/collect",
  zValidator(
    "json",
    z.object({
      metric: MetricSchema,
    }),
  ),
  async (context) => {
    const { metric } = context.req.valid("json");

    try {
      const { insertMetric } = await import("@/utils/clickhouse/insert-metric");

      await insertMetric(metric);

      return context.body(null, 204);
    } catch (error) {
      console.error(error);
      return context.body(null, 500);
    }
  },
);

app.get("/api/metrics/summary", async (context) => {
  try {
    const { getMetricsSummary } = await import("@/utils/clickhouse/summary");

    const summary = await getMetricsSummary();
    const parsed = MetricsSummaryResponseSchema.parse(summary);

    return context.json(parsed);
  } catch (error) {
    console.error(error);
    return context.status(500);
  }
});

showRoutes(app);

export default app;
