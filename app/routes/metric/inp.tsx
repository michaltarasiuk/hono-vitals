import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";
import { InpFlagsSchema } from "@/utils/metric/flags/inp";

export default createRoute(zValidator("query", InpFlagsSchema), (c) => {
  c.req.valid("query");
  return c.render(<main />);
});
