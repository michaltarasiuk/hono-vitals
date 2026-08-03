import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { CollectBodySchema } from "@/lib/collect/collect-body";
import { insertMetrics } from "@/lib/analytics/metrics";

const collectRoutes = new Hono().post(
  "/",
  zValidator("json", CollectBodySchema),
  async (c) => {
    const { metrics } = c.req.valid("json");

    try {
      await insertMetrics(metrics);

      return c.body(null, 204);
    } catch (error) {
      console.error("Failed to collect metrics", error);
      return c.body(null, 500);
    }
  },
);

export default collectRoutes;
