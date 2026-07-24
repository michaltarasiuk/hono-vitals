import { Heading } from "@/app/components/ui/heading/heading";
import { Text } from "@/app/components/ui/text/text";
import { LcpObserver } from "@/app/islands/metric/lcp-observer";
import { createMetricRoute } from "@/lib/metric/create-metric-route";
import { LCP_FLAGS_DEFAULTS } from "@/lib/metric/flags/lcp";

export default createMetricRoute({
  metric: "LCP",
  defaults: LCP_FLAGS_DEFAULTS,
  observer: LcpObserver,
  render: (flags) => (
    <>
      <Heading elementtiming="main-heading">LCP Test</Heading>
      <Text>
        <img
          src={`/public/square.png?delay=${flags.imgDelay}`}
          alt="Gray square"
          data-target="main-image"
          hidden={flags.imgHidden}
          elementtiming="main-image"
          {...(flags.removeElement ? { id: "lcp-image" } : {})}
        />
      </Text>
      <Text>Text below the image</Text>
      <div style={{ height: "100vh" }} />
      <Text>Text below the full-height element.</Text>
    </>
  ),
});
