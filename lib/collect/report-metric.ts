import type { Metric } from "web-vitals";

import type { ObserverInstance } from "@/lib/metric/observer-options";

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

  const body = JSON.stringify(
    { metrics: reported.map(({ metric }) => metric) },
    replacer,
  );

  navigator.sendBeacon(
    "/collect",
    new Blob([body], { type: "application/json" }),
  );
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

function replacer(_key: string, value: unknown) {
  if (typeof value === "function") {
    return;
  } else if (value instanceof EventTarget) {
    return String(value);
  }
  return value;
}
