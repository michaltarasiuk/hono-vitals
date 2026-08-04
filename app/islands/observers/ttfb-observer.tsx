import type { TtfbFlags } from "@/lib/metric/flags/defaults/ttfb";

import { createMetricObserver } from "@/lib/metric/create-metric-observer";
import { overrideResponseStart } from "@/lib/metric/override-response-start";

export const TtfbObserver = createMetricObserver<TtfbFlags>({
  name: "TTFB",
  observe: (webVitals) => webVitals.onTTFB,
  onMount: (flags) => {
    if (flags.responseStart) {
      overrideResponseStart(flags.responseStart);
    }
  },
});
