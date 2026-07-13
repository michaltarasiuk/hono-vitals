import type { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import * as z from "zod";

import { MetricSchema } from "@/lib/collect/schema";

export function registerCollectRoute(app: Hono) {
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
        const { insertMetric } =
          await import("@/lib/analytics/clickhouse/insert-metric");

        await insertMetric(metric);

        return context.body(null, 204);
      } catch (error) {
        console.error(error);
        return context.body(null, 500);
      }
    },
  );
}
