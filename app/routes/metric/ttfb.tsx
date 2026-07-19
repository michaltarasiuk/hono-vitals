import { TtfbObserver } from "@/app/islands/metric/ttfb";
import { createMetricRoute } from "@/lib/metric/create-metric-route";
import { elementTiming } from "@/lib/metric/element-timing";
import { TtfbFlagsSchema } from "@/lib/metric/flags/ttfb";

export default createMetricRoute({
  metric: "TTFB",
  schema: TtfbFlagsSchema,
  observer: TtfbObserver,
  children: (flags) => (
    <>
      <h1 {...elementTiming("main-heading")}>TTFB Test</h1>
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
