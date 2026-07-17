import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import { ClsObserver } from "@/app/islands/metric/cls";
import { Page } from "@/app/components/metric/page";
import { elementTiming } from "@/lib/metric/element-timing";
import { ClsFlagsSchema, clsFlagDefaults } from "@/lib/metric/flags/cls";

export default createRoute(zValidator("query", ClsFlagsSchema), (c) => {
  const flags = c.req.valid("query");

  return c.render(
    <Page metric="CLS" flags={flags} defaults={clsFlagDefaults}>
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

      <ClsObserver flags={flags} />
    </Page>,
  );
});
