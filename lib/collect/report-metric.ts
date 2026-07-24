import type { Metric } from "web-vitals";

import { toastMetric } from "@/lib/toast/toast-metric";

export function reportMetric(metric: Metric) {
  const body = JSON.stringify({ metric }, replacer);

  navigator.sendBeacon(
    "/collect",
    new Blob([body], { type: "application/json" }),
  );

  toastMetric(metric);
}

function replacer(_key: string, value: unknown) {
  if (typeof value === "function") {
    return;
  } else if (value instanceof EventTarget) {
    return String(value);
  }
  return value;
}
