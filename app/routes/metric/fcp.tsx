import { Heading } from "@/app/components/ui/heading/heading";
import { Text } from "@/app/components/ui/text/text";
import { FcpObserver } from "@/app/islands/metric/fcp";
import { createMetricRoute } from "@/lib/metric/create-metric-route";
import { FCP_FLAGS_DEFAULTS } from "@/lib/metric/flags/fcp";

export default createMetricRoute({
  metric: "FCP",
  defaults: FCP_FLAGS_DEFAULTS,
  observer: FcpObserver,
  children: (flags) => (
    <>
      <Heading elementtiming="main-heading">FCP Test</Heading>
      <Text>
        <img
          src={`/public/square.png?delay=${flags.imgDelay}`}
          alt="Gray square"
          hidden={flags.imgHidden}
          elementtiming="main-image"
        />
      </Text>
      <Text>Text below the image</Text>
    </>
  ),
});
