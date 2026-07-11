import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import { MetricChrome, MetricShell } from "@/app/components/shell";
import LcpObserver from "@/app/islands/lcp";
import { elementTiming } from "@/utils/metric/element-timing";
import { LcpFlagsSchema, lcpFlagDefaults } from "@/utils/metric/flags/lcp";

export default createRoute(zValidator("query", LcpFlagsSchema), (c) => {
  const flags = c.req.valid("query");

  return c.render(
    <MetricShell metric="lcp" flags={flags} defaults={lcpFlagDefaults}>
      <h1 {...elementTiming("main-heading")}>LCP Test</h1>
      <p>
        <img
          src={`/public/square.png?delay=${flags.imgDelay}`}
          alt="Gray square"
          data-target="main-image"
          hidden={flags.imgHidden}
          {...elementTiming("main-image")}
          {...(flags.removeElement ? { id: "lcp-image" } : {})}
        />
      </p>
      <p>Text below the image</p>
      <MetricChrome metric="lcp" />
      <div style={{ height: "100vh" }} />
      <footer>Text below the full-height element.</footer>
      <LcpObserver flags={flags} />
    </MetricShell>,
  );
});
