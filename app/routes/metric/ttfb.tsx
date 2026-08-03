import {
  TTFB_FLAGS_DEFAULTS,
  type TtfbFlags,
} from "@/lib/metric/flags/defaults/ttfb";
import { defineMetric } from "@/lib/metric/define-metric";
import { Heading } from "@/app/components/ui/heading/heading";
import { SquareImage } from "@/app/components/metric/square-image";
import { Text } from "@/app/components/ui/text/text";
import { TtfbObserver } from "@/app/islands/metric/ttfb-observer";

function TtfbContent({ flags }: { flags: TtfbFlags }) {
  return (
    <>
      <Heading elementtiming="main-heading">TTFB Test</Heading>
      <Text>
        <SquareImage
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
