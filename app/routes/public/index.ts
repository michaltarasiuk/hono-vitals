import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import * as z from "zod";

import { delay } from "@/lib/delay";
import { isDefined } from "@/lib/is-defined";

const AssetDelayQuerySchema = z.object({
  delay: z.coerce.number().optional(),
});

const publicRoutes = new Hono()
  .use("*", zValidator("query", AssetDelayQuerySchema))
  .use("*", async (c, next) => {
    const { delay: timeout } = c.req.valid("query") as z.infer<
      typeof AssetDelayQuerySchema
    >;

    if (isDefined(timeout)) {
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
