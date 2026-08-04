import type { InpFlags } from "@/lib/metric/flags/defaults/inp";

import { createMetricObserver } from "@/lib/metric/create-metric-observer";

export const InpObserver = createMetricObserver<InpFlags>({
  name: "INP",
  observe: (webVitals) => webVitals.onINP,
});
