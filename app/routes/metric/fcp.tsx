import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import FlagsEditor from "@/app/islands/flags-editor";
import { FcpFlagsSchema } from "@/utils/metric/flags/fcp";

export default createRoute(zValidator("query", FcpFlagsSchema), (c) => {
  const flags = c.req.valid("query");

  return c.render(
    <main>
      <FlagsEditor flags={flags} />
    </main>,
  );
});
