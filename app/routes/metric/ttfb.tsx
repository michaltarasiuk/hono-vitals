import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import { MetricChrome, MetricShell } from "@/app/components/metric/shell";
import TtfbObserver from "@/app/islands/metric/ttfb";
import { elementTiming } from "@/utils/metric/element-timing";
import { TtfbFlagsSchema, ttfbFlagDefaults } from "@/utils/metric/flags/ttfb";

export default createRoute(zValidator("query", TtfbFlagsSchema), (c) => {
  const flags = c.req.valid("query");

  return c.render(
    <MetricShell metric="ttfb" flags={flags} defaults={ttfbFlagDefaults}>
      <h1 {...elementTiming("main-heading")}>TTFB Test</h1>
      <p>
        <img
          src={`/public/square.png?delay=${flags.imgDelay}`}
          alt="Gray square"
          hidden={flags.imgHidden}
          {...elementTiming("main-image")}
        />
      </p>
      <p>Text below the image</p>
      <MetricChrome metric="ttfb" />
      <TtfbObserver flags={flags} />
    </MetricShell>,
  );
});
