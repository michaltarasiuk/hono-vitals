import { reportMetric } from "@/lib/collect/report";

export function createBatchReporter() {
  const queue = new Set<object>();

  function enqueue(metric: object) {
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
