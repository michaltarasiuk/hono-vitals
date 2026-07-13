import type { Hono } from "hono";

import { zValidator } from "@hono/zod-validator";
import { serveStatic } from "hono/bun";
import * as z from "zod";

import { delay } from "@/lib/shared/delay";

const StaticQuerySchema = z.object({
  delay: z.coerce.number().optional(),
});

export function registerStaticRoutes(app: Hono) {
  app
    .use("/public/*", zValidator("query", StaticQuerySchema))
    .use("/public/*", async (context, next) => {
      const { delay: timeout } = context.req.valid("query") as z.infer<
        typeof StaticQuerySchema
      >;
      if (timeout !== undefined) {
        await delay(timeout);
      }
      await next();
    })
    .use(
      "/public/*",
      serveStatic({
        root: ".",
      }),
    );
}
