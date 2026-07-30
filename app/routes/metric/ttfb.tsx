import { Heading } from "@/app/components/ui/heading/heading";
import { Text } from "@/app/components/ui/text/text";
import { TtfbObserver } from "@/app/islands/metric/ttfb-observer";
import { defineMetric } from "@/lib/metric/define-metric";
import { TTFB_FLAGS_DEFAULTS, type TtfbFlags } from "@/lib/metric/flags/ttfb";

function TtfbContent({ flags }: { flags: TtfbFlags }) {
  return (
    <>
      <Heading elementtiming="main-heading">TTFB Test</Heading>
      <Text>
        <img
          src={`/public/square.png?delay=${flags.imgDelay}`}
          alt="Gray square"
          elementtiming="main-image"
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
