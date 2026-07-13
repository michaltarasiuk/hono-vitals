import type { MetricSummary } from "@/lib/analytics/summary-schema";

export function formatMetricValue(name: MetricSummary["name"], value: number) {
  if (name === "CLS") {
    return value.toFixed(3);
  }
  return `${Math.round(value).toLocaleString()} ms`;
}
