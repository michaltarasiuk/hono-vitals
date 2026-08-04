import type { LcpFlags } from "@/lib/metric/flags/defaults/lcp";

import { createMetricObserver } from "@/lib/metric/create-metric-observer";
import { removeLcpElement } from "@/lib/metric/remove-lcp-element";

export const LcpObserver = createMetricObserver<LcpFlags>({
  name: "LCP",
  observe: (webVitals) => webVitals.onLCP,
  prepare: async (flags) => {
    if (flags.removeElement) {
      await removeLcpElement();
    }
  },
  waitUntil: (flags) =>
    flags.registerOnVisibilityChange ? "visible" : "immediate",
});
