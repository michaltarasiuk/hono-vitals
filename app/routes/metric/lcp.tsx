import { Heading } from "@/app/components/ui/heading/heading";
import { Text } from "@/app/components/ui/text/text";
import { LcpObserver } from "@/app/islands/metric/lcp";
import { createMetricRoute } from "@/lib/metric/create-metric-route";
import { elementTiming } from "@/lib/metric/element-timing";
import { LcpFlagsSchema } from "@/lib/metric/flags/lcp";

export default createMetricRoute({
  metric: "LCP",
  schema: LcpFlagsSchema,
  observer: LcpObserver,
  children: (flags) => (
    <>
      <Heading {...elementTiming("main-heading")}>LCP Test</Heading>
      <Text>
        <img
          src={`/public/square.png?delay=${flags.imgDelay}`}
          alt="Gray square"
          data-target="main-image"
          hidden={flags.imgHidden}
          {...elementTiming("main-image")}
          {...(flags.removeElement ? { id: "lcp-image" } : {})}
        />
      </Text>
      <Text>Text below the image</Text>
      <div style={{ height: "100vh" }} />
      <Text>Text below the full-height element.</Text>
    </>
  ),
});
