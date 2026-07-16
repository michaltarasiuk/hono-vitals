import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import { Metric } from "@/app/components/metric/shell";
import { FlagsEditor } from "@/app/islands/flags-editor";
import { TtfbObserver } from "@/app/islands/metric/ttfb";
import { elementTiming } from "@/lib/metric/element-timing";
import { TtfbFlagsSchema, ttfbFlagDefaults } from "@/lib/metric/flags/ttfb";

export default createRoute(zValidator("query", TtfbFlagsSchema), (c) => {
  const flags = c.req.valid("query");

  return c.render(
    <Metric.Provider metric="TTFB" flags={flags} defaults={ttfbFlagDefaults}>
      <Metric.Toolbar>
        <FlagsEditor flags={flags} defaults={ttfbFlagDefaults} />
      </Metric.Toolbar>
      <Metric.Main>
        <Metric.Assets />

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

        <Metric.Chrome />
        <TtfbObserver flags={flags} />
      </Metric.Main>
    </Metric.Provider>,
  );
});
