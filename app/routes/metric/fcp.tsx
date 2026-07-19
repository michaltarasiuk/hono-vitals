import { FcpObserver } from "@/app/islands/metric/fcp";
import { createMetricRoute } from "@/lib/metric/create-metric-route";
import { elementTiming } from "@/lib/metric/element-timing";
import { FcpFlagsSchema } from "@/lib/metric/flags/fcp";

export default createMetricRoute({
  metric: "FCP",
  schema: FcpFlagsSchema,
  observer: FcpObserver,
  children: (flags) => (
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
  ),
});
