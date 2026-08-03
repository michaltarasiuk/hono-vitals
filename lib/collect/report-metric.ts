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

  sendCollect(body);
}

function sendCollect(body: string) {
  const payload = new Blob([body], { type: "application/json" });

  if (navigator.sendBeacon("/collect", payload)) {
    return;
  }

  void fetch("/collect", {
    method: "POST",
    body: payload,
    keepalive: true,
  }).catch(() => {
    // Ignore reject when the document is unloading.
  });
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
    return value.constructor.name || "EventTarget";
  }
  return value;
}
