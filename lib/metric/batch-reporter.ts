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

  function onVisibilityChange() {
    if (document.visibilityState === "hidden") {
      flush();
    }
  }

  document.addEventListener("visibilitychange", onVisibilityChange);

  function dispose() {
    document.removeEventListener("visibilitychange", onVisibilityChange);
    queue.clear();
  }

  return { enqueue, dispose };
}

export type BatchReporter = ReturnType<typeof createBatchReporter>;
