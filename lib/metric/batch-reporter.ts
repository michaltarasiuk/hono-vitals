import {
  type ReportedMetric,
  reportMetrics,
} from "@/lib/collect/report-metric";

export function createBatchReporter() {
  const queue = new Set<ReportedMetric>();

  function enqueue(reported: ReportedMetric) {
    queue.add(reported);
  }

  function flush() {
    if (queue.size === 0) {
      return;
    }

    reportMetrics([...queue]);
    queue.clear();
  }

  function onVisibilityChange() {
    if (document.visibilityState === "hidden") {
      flush();
    }
  }

  document.addEventListener("visibilitychange", onVisibilityChange);
  document.addEventListener("pagehide", flush);

  function dispose() {
    document.removeEventListener("visibilitychange", onVisibilityChange);
    document.removeEventListener("pagehide", flush);
    flush();
  }

  return { enqueue, dispose };
}

export type BatchReporter = ReturnType<typeof createBatchReporter>;
