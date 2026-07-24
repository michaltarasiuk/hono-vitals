import type { Metric } from "web-vitals";

import { reportMetric } from "@/lib/collect/report-metric";

export function createBatchReporter() {
  const queue = new Set<Metric>();

  function enqueue(metric: Metric) {
    queue.add(metric);
  }

  function flush() {
    for (const metric of queue) {
      reportMetric(metric);
    }
    queue.clear();
  }

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      flush();
    }
  });

  return { enqueue };
}
