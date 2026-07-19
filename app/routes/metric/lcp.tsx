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
      <h1 {...elementTiming("main-heading")}>LCP Test</h1>
      <p>
        <img
          src={`/public/square.png?delay=${flags.imgDelay}`}
          alt="Gray square"
          data-target="main-image"
          hidden={flags.imgHidden}
          {...elementTiming("main-image")}
          {...(flags.removeElement ? { id: "lcp-image" } : {})}
        />
      </p>
      <p>Text below the image</p>
      <div style={{ height: "100vh" }} />
      <footer>Text below the full-height element.</footer>
    </>
  ),
});
