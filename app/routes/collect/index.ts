import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import * as z from "zod";

import { insertMetric } from "@/lib/analytics/metrics";
import { MetricSchema } from "@/lib/collect/schema";

const collectRoutes = new Hono().post(
  "/",
  zValidator(
    "json",
    z.object({
      metric: MetricSchema,
    }),
  ),
  async (c) => {
    const { metric } = c.req.valid("json");

    try {
      await insertMetric(metric);

      return c.body(null, 204);
    } catch (error) {
      console.error("Failed to collect metric", error);
      return c.body(null, 500);
    }
  },
);

export default collectRoutes;
