import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import { Metric } from "@/app/components/metric/shell";
import { FlagsEditor } from "@/app/islands/flags-editor";
import { FcpObserver } from "@/app/islands/metric/fcp";
import { elementTiming } from "@/lib/metric/element-timing";
import { FcpFlagsSchema, fcpFlagDefaults } from "@/lib/metric/flags/fcp";

export default createRoute(zValidator("query", FcpFlagsSchema), (c) => {
  const flags = c.req.valid("query");

  return c.render(
    <Metric.Provider metric="FCP" flags={flags} defaults={fcpFlagDefaults}>
      <Metric.Toolbar>
        <FlagsEditor flags={flags} defaults={fcpFlagDefaults} />
      </Metric.Toolbar>
      <Metric.Main>
        <Metric.Assets />

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

        <Metric.Chrome />
        <FcpObserver flags={flags} />
      </Metric.Main>
    </Metric.Provider>,
  );
});
