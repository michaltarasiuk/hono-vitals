import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import { Metric } from "@/app/components/metric/shell";
import { FlagsEditor } from "@/app/islands/flags-editor";
import { ClsObserver } from "@/app/islands/metric/cls";
import { elementTiming } from "@/lib/metric/element-timing";
import {
  type ClsFlags,
  ClsFlagsSchema,
  clsFlagDefaults,
} from "@/lib/metric/flags/cls";

export default createRoute(zValidator("query", ClsFlagsSchema), (c) => {
  const flags = c.req.valid("query");

  return c.render(
    <Metric.Provider metric="CLS" flags={flags} defaults={clsFlagDefaults}>
      <Metric.Toolbar>
        <FlagsEditor flags={flags} defaults={clsFlagDefaults} />
      </Metric.Toolbar>
      <Metric.Main>
        <Metric.Assets />
        <View flags={flags} />
        <Metric.Chrome />
        <ClsObserver flags={flags} />
      </Metric.Main>
    </Metric.Provider>,
  );
});

function View({ flags }: { flags: ClsFlags }) {
  return (
    <>
      <h1 {...elementTiming("main-heading")}>CLS Test</h1>
      {flags.noLayoutShifts ? (
        <p>This text does not shift.</p>
      ) : (
        <>
          <p>
            <img
              src="/public/square.png?delay=500"
              alt="Gray square"
              hidden={flags.imgHidden}
              {...elementTiming("main-image")}
            />
            [text node contents]
          </p>
          <p data-target="secondary-image-wrapper">
            <img
              src="/public/square.png?delay=1000"
              alt="Gray square"
              hidden={flags.img2Hidden}
              {...elementTiming("secondary-image")}
            />
          </p>
          <p>Text below the images that will get pushed down.</p>
        </>
      )}
    </>
  );
}
