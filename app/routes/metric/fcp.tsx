import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import { FcpFlagsSchema } from "@/utils/metric/flags/fcp";

export default createRoute(zValidator("query", FcpFlagsSchema), (c) => {
  c.req.valid("query");
  return c.render(<main />);
});
