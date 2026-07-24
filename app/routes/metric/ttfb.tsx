import { Heading } from "@/app/components/ui/heading/heading";
import { Text } from "@/app/components/ui/text/text";
import { TtfbObserver } from "@/app/islands/metric/ttfb";
import { createMetricRoute } from "@/lib/metric/create-metric-route";
import { elementTiming } from "@/lib/metric/element-timing";
import { TTFB_FLAGS_DEFAULTS } from "@/lib/metric/flags/ttfb";

export default createMetricRoute({
  metric: "TTFB",
  defaults: TTFB_FLAGS_DEFAULTS,
  observer: TtfbObserver,
  children: (flags) => (
    <>
      <Heading {...elementTiming("main-heading")}>TTFB Test</Heading>
      <Text>
        <img
          src={`/public/square.png?delay=${flags.imgDelay}`}
          alt="Gray square"
          hidden={flags.imgHidden}
          {...elementTiming("main-image")}
        />
      </Text>
      <Text>Text below the image</Text>
    </>
  ),
});
