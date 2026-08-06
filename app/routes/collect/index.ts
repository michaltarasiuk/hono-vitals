import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { clearMetrics, insertMetrics } from "@/lib/analytics/metrics";
import { CollectBodySchema } from "@/lib/collect/body";

async function runOrFail(message: string, run: () => Promise<void>) {
  try {
    await run();
  } catch (cause) {
    console.error(message, cause);
    throw new HTTPException(500, { message, cause: cause as Error });
  }
}

const collectRoutes = new Hono()
  .post("/", zValidator("json", CollectBodySchema), async (c) => {
    const { metrics } = c.req.valid("json");

    await runOrFail("Failed to collect metrics", () => insertMetrics(metrics));

    return c.body(null, 204);
  })
  .delete("/", async (c) => {
    await runOrFail("Failed to clear metrics", () => clearMetrics());

    return c.body(null, 204);
  });

export type CollectRoutes = typeof collectRoutes;

export default collectRoutes;
