import { MetricSquare } from "@/app/components/metric/metric-square";
import { Heading } from "@/app/components/ui/heading/heading";
import { Text } from "@/app/components/ui/text/text";
import { LcpObserver } from "@/app/islands/metric/lcp-observer";
import { defineMetric } from "@/lib/metric/define-metric";
import { LCP_FLAGS_DEFAULTS, type LcpFlags } from "@/lib/metric/flags/lcp";

function LcpContent({ flags }: { flags: LcpFlags }) {
  return (
    <>
      <Heading elementtiming="main-heading">LCP Test</Heading>
      <Text>
        <MetricSquare
          id={flags.removeElement ? "lcp-image" : undefined}
          data-target="main-image"
          elementtiming="main-image"
          delay={flags.imgDelay}
          hidden={flags.imgHidden}
        />
      </Text>
      <Text>Text below the image</Text>
      <div style={{ height: "100vh" }} />
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
