import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import { MetricChrome, MetricShell } from "@/app/components/metric/shell";
import ClsObserver from "@/app/islands/cls";
import { elementTiming } from "@/utils/metric/element-timing";
import { ClsFlagsSchema } from "@/utils/metric/flags/cls";

export default createRoute(zValidator("query", ClsFlagsSchema), (c) => {
  const flags = c.req.valid("query");
  const defaults = ClsFlagsSchema.parse({});

  return c.render(
    <MetricShell metric="cls" flags={flags} defaults={defaults}>
      <h1 {...elementTiming("main-heading")}>CLS Test</h1>
      {flags.noLayoutShifts ? (
        <p>This text does not shift.</p>
      ) : (
        <>
          <p>
            <img
              alt="Gray square"
              src="/static/square.png?delay=500"
              hidden={flags.imgHidden}
              {...elementTiming("main-image")}
            />
            [text node contents]
          </p>
          <p data-target="secondary-image-wrapper">
            <img
              alt="Gray square"
              src="/static/square.png?delay=1000"
              hidden={flags.img2Hidden}
              {...elementTiming("secondary-image")}
            />
          </p>
          <p>Text below the images that will get pushed down.</p>
        </>
      )}
      <MetricChrome metric="cls" flags={flags} defaults={defaults} />
      <ClsObserver flags={flags} />
    </MetricShell>,
  );
});
