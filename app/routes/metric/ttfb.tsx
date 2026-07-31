import { MetricSquare } from "@/app/components/metric/metric-square";
import { Heading } from "@/app/components/ui/heading/heading";
import { Text } from "@/app/components/ui/text/text";
import { TtfbObserver } from "@/app/islands/metric/ttfb-observer";
import { defineMetric } from "@/lib/metric/define-metric";
import {
  TTFB_FLAGS_DEFAULTS,
  type TtfbFlags,
} from "@/lib/metric/flags/defaults/ttfb";

function TtfbContent({ flags }: { flags: TtfbFlags }) {
  return (
    <>
      <Heading elementtiming="main-heading">TTFB Test</Heading>
      <Text>
        <MetricSquare
          elementtiming="main-image"
          delay={flags.imgDelay}
          hidden={flags.imgHidden}
        />
      </Text>
      <Text>Text below the image</Text>
    </>
  );
}

export default defineMetric({
  name: "TTFB",
  defaults: TTFB_FLAGS_DEFAULTS,
  Observer: TtfbObserver,
  Content: TtfbContent,
});
