import { zValidator } from "@hono/zod-validator";
import { createRoute } from "honox/factory";

import { MetricChrome, MetricShell } from "@/app/components/shell";
import InpObserver from "@/app/islands/inp";
import { elementTiming } from "@/utils/metric/element-timing";
import { InpFlagsSchema, inpFlagDefaults } from "@/utils/metric/flags/inp";

export default createRoute(zValidator("query", InpFlagsSchema), (c) => {
  const flags = c.req.valid("query");

  return c.render(
    <MetricShell metric="inp" flags={flags} defaults={inpFlagDefaults}>
      <h1 {...elementTiming("main-heading")}>INP Test</h1>
      <InpObserver flags={flags} />
      <MetricChrome metric="inp" />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec porta
        orci, ac sagittis augue. Nullam orci tellus, suscipit sed magna id,
        mattis iaculis ex. Etiam felis lectus, accumsan eu magna lacinia,
        lobortis tempus lacus. Donec nulla metus, blandit eget ullamcorper in,
        placerat eu massa. Curabitur vitae elementum orci, ac tincidunt neque.
        Maecenas accumsan odio sit amet arcu elementum, non vestibulum enim
        finibus. Phasellus malesuada lacinia suscipit. Cras ac gravida urna. In
        et mauris non tellus pretium ultrices. Fusce mattis a risus at
        tincidunt. Donec ac fringilla magna, nec suscipit lectus. Sed risus
        massa, rutrum ut leo quis, tempor dapibus dui. Proin in mauris non risus
        maximus tincidunt quis a mauris.
      </p>
    </MetricShell>,
  );
});
