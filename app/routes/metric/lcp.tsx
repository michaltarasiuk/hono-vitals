import { FullHeight } from "@/app/components/metric/full-height";
import { SquareImage } from "@/app/components/metric/square-image";
import { Heading } from "@/app/components/ui/heading/heading";
import { Text } from "@/app/components/ui/text/text";
import { LcpObserver } from "@/app/islands/observers/lcp-observer";
import { defineMetric } from "@/lib/metric/define-route";
import {
  LCP_FLAGS_DEFAULTS,
  type LcpFlags,
} from "@/lib/metric/flags/defaults/lcp";

function LcpContent({ flags }: { flags: LcpFlags }) {
  return (
    <>
      <Heading elementtiming="main-heading">LCP Test</Heading>
      <Text>
        <SquareImage
          id={flags.removeElement ? "lcp-image" : undefined}
          data-target="main-image"
          elementtiming="main-image"
          delay={flags.imgDelay}
          hidden={flags.imgHidden}
        />
      </Text>
      <Text>Text below the image</Text>
      <FullHeight />
      <Text>Text below the full-height element.</Text>
    </>
  );
}

export default defineMetric({
  name: "LCP",
  defaults: LCP_FLAGS_DEFAULTS,
  Observer: LcpObserver,
  Content: LcpContent,
});
