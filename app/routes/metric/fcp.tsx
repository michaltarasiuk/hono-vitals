import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import {
  MetricChrome,
  MetricTestShell,
} from "@/app/components/metric/test-shell";
import FcpObserver from "@/app/islands/fcp";
import { elementTiming } from "@/utils/metric/element-timing";
import { FcpFlagsSchema } from "@/utils/metric/flags/fcp";

export default createRoute(zValidator("query", FcpFlagsSchema), (c) => {
  const flags = c.req.valid("query");
  const defaults = FcpFlagsSchema.parse({});

  return c.render(
    <MetricTestShell defaults={defaults} flags={flags}>
      <h1 {...elementTiming("main-heading")}>FCP Test</h1>
      <p>
        <img
          {...elementTiming("main-image")}
          hidden={flags.imgHidden}
          src={`/static/square.png?delay=${flags.imgDelay}`}
        />
      </p>
      <p>Text below the image</p>
      <MetricChrome defaults={defaults} flags={flags} metric="fcp" />
      <FcpObserver flags={flags} />
    </MetricTestShell>,
  );
});
