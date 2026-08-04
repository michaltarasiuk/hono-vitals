import type { ClsFlags } from "@/lib/metric/flags/defaults/cls";

import { createMetricObserver } from "@/lib/metric/create-metric-observer";

export const ClsObserver = createMetricObserver<ClsFlags>({
  name: "CLS",
  observe: (webVitals) => webVitals.onCLS,
});
