import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";
import { TtfbFlagsSchema } from "@/utils/metric/flags/ttfb";

export default createRoute(zValidator("query", TtfbFlagsSchema), (c) => {
  c.req.valid("query");
  return c.render(<main />);
});
