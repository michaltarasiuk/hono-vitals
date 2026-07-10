import { FcpFlagsSchema } from "@/utils/metric/flags/fcp";
import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

export default createRoute(zValidator("query", FcpFlagsSchema), (c) => {
  c.req.valid("query");
  return c.render(<main />);
});
