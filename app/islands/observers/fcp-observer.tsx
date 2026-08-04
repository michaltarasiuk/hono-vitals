import type { FcpFlags } from "@/lib/metric/flags/defaults/fcp";

import { createMetricObserver } from "@/lib/metric/create-metric-observer";

export const FcpObserver = createMetricObserver<FcpFlags>({
  name: "FCP",
  observe: (webVitals) => webVitals.onFCP,
});
