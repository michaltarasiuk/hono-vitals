import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";
import { LcpFlagsSchema } from "@/utils/metric/flags/lcp";

export default createRoute(zValidator("query", LcpFlagsSchema), (c) => {
  c.req.valid("query");
  return c.render(<main />);
});
