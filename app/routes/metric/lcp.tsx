import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import { Metric } from "@/app/components/metric/shell";
import { FlagsEditor } from "@/app/islands/flags-editor";
import { LcpObserver } from "@/app/islands/metric/lcp";
import { elementTiming } from "@/lib/metric/element-timing";
import {
  type LcpFlags,
  LcpFlagsSchema,
  lcpFlagDefaults,
} from "@/lib/metric/flags/lcp";

export default createRoute(zValidator("query", LcpFlagsSchema), (c) => {
  const flags = c.req.valid("query");

  return c.render(
    <Metric.Provider metric="LCP" flags={flags} defaults={lcpFlagDefaults}>
      <Metric.Toolbar>
        <FlagsEditor flags={flags} defaults={lcpFlagDefaults} />
      </Metric.Toolbar>
      <Metric.Main>
        <Metric.Assets />
        <View flags={flags} />
        <Metric.Chrome />
        <LcpObserver flags={flags} />
      </Metric.Main>
    </Metric.Provider>,
  );
});

function View({ flags }: { flags: LcpFlags }) {
  return (
    <>
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
      <div style={{ height: "100vh" }} />
      <footer>Text below the full-height element.</footer>
    </>
  );
}
