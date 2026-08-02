import { type ReportedMetric, reportMetric } from "@/lib/collect/report-metric";

export function createBatchReporter() {
  const queue = new Set<ReportedMetric>();

  function enqueue(reported: ReportedMetric) {
    queue.add(reported);
  }

  function flush() {
    for (const reported of queue) {
      reportMetric(reported);
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
