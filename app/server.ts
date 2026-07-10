import { zValidator } from "@hono/zod-validator";
import { serveStatic } from "hono/bun";
import { showRoutes } from "hono/dev";
import { createApp } from "honox/server";
import * as z from "zod";

import { delay } from "@/utils/delay";
import { MetricSchema } from "@/utils/metric-schema";

const app = createApp();

app.get(
  "/static/*",
  zValidator(
    "query",
    z.object({
      delay: z.coerce.number().optional(),
    }),
  ),
  async (context, next) => {
    const { delay: timeout } = context.req.valid("query");
    if (timeout !== undefined) {
      await delay(timeout);
    }
    await next();
  },
  serveStatic({
    root: "./static",
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
  (context) => {
    return context.json({
      ok: true,
    });
  },
);

showRoutes(app);

export default app;
