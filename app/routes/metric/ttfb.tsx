import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import { Page } from "@/app/components/metric/page";
import { TtfbObserver } from "@/app/islands/metric/ttfb";
import { elementTiming } from "@/lib/metric/element-timing";
import { TtfbFlagsSchema, ttfbFlagDefaults } from "@/lib/metric/flags/ttfb";

export default createRoute(zValidator("query", TtfbFlagsSchema), (c) => {
  const flags = c.req.valid("query");

  return c.render(
    <Page metric="TTFB" flags={flags} defaults={ttfbFlagDefaults}>
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

      <TtfbObserver flags={flags} />
    </Page>,
  );
});
