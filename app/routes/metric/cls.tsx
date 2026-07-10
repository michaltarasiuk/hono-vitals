import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import {
  MetricChrome,
  MetricShell,
} from "@/app/components/metric/shell";
import ClsObserver from "@/app/islands/cls";
import { elementTiming } from "@/utils/metric/element-timing";
import { ClsFlagsSchema } from "@/utils/metric/flags/cls";

export default createRoute(zValidator("query", ClsFlagsSchema), (c) => {
  const flags = c.req.valid("query");
  const defaults = ClsFlagsSchema.parse({});

  return c.render(
    <MetricShell defaults={defaults} flags={flags}>
      <h1 {...elementTiming("main-heading")}>CLS Test</h1>
      {flags.noLayoutShifts ? (
        <p>This text does not shift.</p>
      ) : (
        <>
          <p>
            <img
              alt="Gray square"
              {...elementTiming("main-image")}
              hidden={flags.imgHidden}
              src="/static/square.png?delay=500"
            />
            [text node contents]
          </p>
          <p data-target="secondary-image-wrapper">
            <img
              alt="Gray square"
              {...elementTiming("secondary-image")}
              hidden={flags.img2Hidden}
              src="/static/square.png?delay=1000"
            />
          </p>
          <p>Text below the images that will get pushed down.</p>
        </>
      )}
      <MetricChrome defaults={defaults} flags={flags} metric="cls" />
      <ClsObserver flags={flags} />
    </MetricShell>,
  );
});
