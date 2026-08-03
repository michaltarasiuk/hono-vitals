import {
  FCP_FLAGS_DEFAULTS,
  type FcpFlags,
} from "@/lib/metric/flags/defaults/fcp";
import { defineMetric } from "@/lib/metric/define-metric";
import { FcpObserver } from "@/app/islands/metric/fcp-observer";
import { Heading } from "@/app/components/ui/heading/heading";
import { SquareImage } from "@/app/components/metric/square-image";
import { Text } from "@/app/components/ui/text/text";

function FcpContent({ flags }: { flags: FcpFlags }) {
  return (
    <>
      <Heading elementtiming="main-heading">FCP Test</Heading>
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
  name: "FCP",
  defaults: FCP_FLAGS_DEFAULTS,
  Observer: FcpObserver,
  Content: FcpContent,
});
