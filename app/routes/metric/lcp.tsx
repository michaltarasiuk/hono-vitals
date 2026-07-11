import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import { MetricChrome, MetricShell } from "@/app/components/metric/shell";
import LcpObserver from "@/app/islands/lcp";
import { elementTiming } from "@/utils/metric/element-timing";
import { LcpFlagsSchema } from "@/utils/metric/flags/lcp";

export default createRoute(zValidator("query", LcpFlagsSchema), (c) => {
  const flags = c.req.valid("query");
  const defaults = LcpFlagsSchema.parse({});

  return c.render(
    <MetricShell metric="lcp" flags={flags} defaults={defaults}>
      <h1 {...elementTiming("main-heading")}>LCP Test</h1>
      <p>
        <img
          data-target="main-image"
          src={`/static/square.png?delay=${flags.imgDelay}`}
          hidden={flags.imgHidden}
          {...elementTiming("main-image")}
          {...(flags.removeElement ? { id: "lcp-image" } : {})}
        />
      </p>
      <p>Text below the image</p>
      <MetricChrome metric="lcp" flags={flags} defaults={defaults} />
      <div style={{ height: "100vh" }} />
      <footer>Text below the full-height element.</footer>
      <LcpObserver flags={flags} />
    </MetricShell>,
  );
});
