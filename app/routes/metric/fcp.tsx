import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import { MetricChrome, MetricShell } from "@/app/components/shell";
import FcpObserver from "@/app/islands/fcp";
import { elementTiming } from "@/utils/metric/element-timing";
import { FcpFlagsSchema } from "@/utils/metric/flags/fcp";

export default createRoute(zValidator("query", FcpFlagsSchema), (c) => {
  const flags = c.req.valid("query");
  const defaults = FcpFlagsSchema.parse({});

  return c.render(
    <MetricShell metric="fcp" flags={flags} defaults={defaults}>
      <h1 {...elementTiming("main-heading")}>FCP Test</h1>
      <p>
        <img
          src={`/public/square.png?delay=${flags.imgDelay}`}
          alt="Gray square"
          hidden={flags.imgHidden}
          {...elementTiming("main-image")}
        />
      </p>
      <p>Text below the image</p>
      <MetricChrome metric="fcp" flags={flags} defaults={defaults} />
      <FcpObserver flags={flags} />
    </MetricShell>,
  );
});
