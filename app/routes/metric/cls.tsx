import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import { MetricChrome, MetricShell } from "@/app/components/shell";
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
              hidden={flags.imgHidden}
              src="/public/square.png?delay=500"
              {...elementTiming("main-image")}
            />
            [text node contents]
          </p>
          <p data-target="secondary-image-wrapper">
            <img
              alt="Gray square"
              hidden={flags.img2Hidden}
              src="/public/square.png?delay=1000"
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
