import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import { Metric } from "@/app/components/metric/shell";
import FcpObserver from "@/app/islands/metric/fcp";
import FlagsEditor from "@/app/islands/metric/flags-editor";
import { elementTiming } from "@/utils/metric/element-timing";
import {
  type FcpFlags,
  FcpFlagsSchema,
  fcpFlagDefaults,
} from "@/utils/metric/flags/fcp";

export default createRoute(zValidator("query", FcpFlagsSchema), (c) => {
  const flags = c.req.valid("query");

  return c.render(
    <Metric.Provider metric="fcp" flags={flags} defaults={fcpFlagDefaults}>
      <Metric.Toolbar>
        <FlagsEditor />
      </Metric.Toolbar>
      <Metric.Main>
        <Metric.Assets />
        <View flags={flags} />
        <Metric.Chrome />
        <FcpObserver />
      </Metric.Main>
    </Metric.Provider>,
  );
});

function View({ flags }: { flags: FcpFlags }) {
  return (
    <>
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
    </>
  );
}
