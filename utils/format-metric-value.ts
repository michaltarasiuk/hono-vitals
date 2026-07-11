import type { MetricSummary } from "@/utils/metrics-summary-schema";

export function formatMetricValue(name: MetricSummary["name"], value: number) {
  if (name === "CLS") {
    return value.toFixed(3);
  }
  return `${Math.round(value).toLocaleString()} ms`;
}
