import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import FlagsEditor from "@/app/islands/flags-editor";
import { TtfbFlagsSchema } from "@/utils/metric/flags/ttfb";

export default createRoute(zValidator("query", TtfbFlagsSchema), (c) => {
  const flags = c.req.valid("query");
  const defaults = TtfbFlagsSchema.parse({});

  return c.render(
    <main>
      <FlagsEditor defaults={defaults} flags={flags} />
    </main>,
  );
});
