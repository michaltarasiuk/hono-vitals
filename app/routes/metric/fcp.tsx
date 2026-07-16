import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import { Page } from "@/app/components/metric/page";
import { FcpObserver } from "@/app/islands/metric/fcp";
import { elementTiming } from "@/lib/metric/element-timing";
import { FcpFlagsSchema, fcpFlagDefaults } from "@/lib/metric/flags/fcp";

export default createRoute(zValidator("query", FcpFlagsSchema), (c) => {
  const flags = c.req.valid("query");

  return c.render(
    <Page metric="FCP" flags={flags} defaults={fcpFlagDefaults}>
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

      <FcpObserver flags={flags} />
    </Page>,
  );
});
