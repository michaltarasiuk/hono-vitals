import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import FlagsEditor from "@/app/islands/flags-editor";
import { InpFlagsSchema } from "@/utils/metric/flags/inp";

export default createRoute(zValidator("query", InpFlagsSchema), (c) => {
  const flags = c.req.valid("query");

  return c.render(
    <main>
      <FlagsEditor flags={flags} />
    </main>,
  );
});
