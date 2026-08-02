import type { Metric } from "web-vitals";

import type { ObserverInstance } from "@/lib/metric/observer-options";

import { toastMetric } from "@/lib/toast/toast-metric";

export interface ReportedMetric {
  metric: Metric;
  instance: ObserverInstance;
}

export function reportMetric({ metric, instance }: ReportedMetric) {
  logMetric({ metric, instance });

  const body = JSON.stringify({ metric }, replacer);

  navigator.sendBeacon(
    "/collect",
    new Blob([body], { type: "application/json" }),
  );

  toastMetric(metric);
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
