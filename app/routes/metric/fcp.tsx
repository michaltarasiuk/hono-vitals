import { Heading } from "@/app/components/ui/heading/heading";
import { Text } from "@/app/components/ui/text/text";
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
      <Heading {...elementTiming("main-heading")}>FCP Test</Heading>
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
