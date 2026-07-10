import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";
import { ClsFlagsSchema } from "@/utils/metric/flags/cls";

export default createRoute(zValidator("query", ClsFlagsSchema), (c) => {
  c.req.valid("query");
  return c.render(<main />);
});
