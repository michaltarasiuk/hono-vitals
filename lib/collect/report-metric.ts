import type { Metric } from "web-vitals";

import type { CollectBody } from "@/lib/collect/collect-body";
import type { ObserverInstance } from "@/lib/metric/observer-options";

import { COLLECT_PATH, collectClient } from "@/lib/collect/client";
import { toastMetric } from "@/lib/toast/toast-metric";

export interface ReportedMetric {
  metric: Metric;
  instance: ObserverInstance;
}

export function reportMetric(reported: ReportedMetric) {
  reportMetrics([reported]);
}

export function reportMetrics(reported: ReportedMetric[]) {
  if (reported.length === 0) {
    return;
  }

  for (const item of reported) {
    logMetric(item);
    toastMetric(item.metric);
  }

  const metrics = toCollectMetrics(reported);
  sendCollect(metrics);
}

function sendCollect(metrics: CollectBody["metrics"]) {
  const body = JSON.stringify({ metrics });
  const payload = new Blob([body], { type: "application/json" });

  if (navigator.sendBeacon(COLLECT_PATH, payload)) {
    return;
  }

  void collectClient.index
    .$post(
      { json: { metrics } },
      {
        init: {
          keepalive: true,
        },
      },
    )
    .catch(() => {
      // Ignore reject when the document is unloading.
    });
}

function toCollectMetrics(reported: ReportedMetric[]): CollectBody["metrics"] {
  return reported.map(({ metric }) => ({
    id: metric.id,
    name: metric.name,
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
    navigationType: metric.navigationType,
    // PerformanceEntry / attribution aren't needed for analytics storage.
    entries: [],
  }));
}

function logMetric({ metric, instance }: ReportedMetric) {
  console.log(`[web-vitals] ${metric.name}`, {
    id: metric.id,
    instance,
    value: metric.value,
    delta: metric.delta,
    rating: metric.rating,
    navigationType: metric.navigationType,
    entries: metric.entries,
    ...("attribution" in metric ? { attribution: metric.attribution } : {}),
  });
}
