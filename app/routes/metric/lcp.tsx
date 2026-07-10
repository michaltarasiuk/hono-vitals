import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import FlagsEditor from "@/app/islands/flags-editor";
import { LcpFlagsSchema } from "@/utils/metric/flags/lcp";

export default createRoute(zValidator("query", LcpFlagsSchema), (c) => {
  const flags = c.req.valid("query");
  const defaults = LcpFlagsSchema.parse({});

  return c.render(
    <main>
      <FlagsEditor defaults={defaults} flags={flags} />
    </main>,
  );
});
