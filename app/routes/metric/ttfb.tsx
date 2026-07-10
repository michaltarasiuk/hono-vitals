import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import {
  MetricChrome,
  MetricShell,
} from "@/app/components/metric/shell";
import TtfbObserver from "@/app/islands/ttfb";
import { elementTiming } from "@/utils/metric/element-timing";
import { TtfbFlagsSchema } from "@/utils/metric/flags/ttfb";

export default createRoute(zValidator("query", TtfbFlagsSchema), (c) => {
  const flags = c.req.valid("query");
  const defaults = TtfbFlagsSchema.parse({});

  return c.render(
    <MetricShell defaults={defaults} flags={flags}>
      <h1 {...elementTiming("main-heading")}>TTFB Test</h1>
      <p>
        <img
          {...elementTiming("main-image")}
          hidden={flags.imgHidden}
          src={`/static/square.png?delay=${flags.imgDelay}`}
        />
      </p>
      <p>Text below the image</p>
      <MetricChrome defaults={defaults} flags={flags} metric="ttfb" />
      <TtfbObserver flags={flags} />
    </MetricShell>,
  );
});
