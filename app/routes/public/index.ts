import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import * as z from "zod";

import { delay } from "@/lib/shared/delay";

const StaticQuerySchema = z.object({
  delay: z.coerce.number().optional(),
});

const publicRoutes = new Hono()
  .use("*", zValidator("query", StaticQuerySchema))
  .use("*", async (c, next) => {
    const { delay: timeout } = c.req.valid("query") as z.infer<
      typeof StaticQuerySchema
    >;

    if (timeout !== undefined) {
      await delay(timeout);
    }

    await next();
  })
  .use(
    "*",
    serveStatic({
      root: ".",
    }),
  );

export default publicRoutes;
