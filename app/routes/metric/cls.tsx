import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import FlagsEditor from "@/app/islands/flags-editor";
import { ClsFlagsSchema } from "@/utils/metric/flags/cls";

export default createRoute(zValidator("query", ClsFlagsSchema), (c) => {
  const flags = c.req.valid("query");
  const defaults = ClsFlagsSchema.parse({});

  return c.render(
    <main>
      <FlagsEditor defaults={defaults} flags={flags} />
    </main>,
  );
});
