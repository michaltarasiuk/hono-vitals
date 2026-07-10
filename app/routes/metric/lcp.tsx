import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import {
  MetricChrome,
  MetricTestShell,
} from "@/app/components/metric/test-shell";
import LcpObserver from "@/app/islands/lcp";
import { elementTiming } from "@/utils/metric/element-timing";
import { LcpFlagsSchema } from "@/utils/metric/flags/lcp";

export default createRoute(zValidator("query", LcpFlagsSchema), (c) => {
  const flags = c.req.valid("query");
  const defaults = LcpFlagsSchema.parse({});

  return c.render(
    <MetricTestShell defaults={defaults} flags={flags}>
      <h1 {...elementTiming("main-heading")}>LCP Test</h1>
      <p>
        <img
          data-target="main-image"
          {...elementTiming("main-image")}
          hidden={flags.imgHidden}
          {...(flags.removeElement ? { id: "lcp-image" } : {})}
          src={`/static/square.png?delay=${flags.imgDelay}`}
        />
      </p>
      <p>Text below the image</p>
      <MetricChrome defaults={defaults} flags={flags} metric="lcp" />
      <div style={{ height: "100vh" }} />
      <footer>Text below the full-height element.</footer>
      <LcpObserver flags={flags} />
    </MetricTestShell>,
  );
});
