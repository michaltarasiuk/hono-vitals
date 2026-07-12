import { createContext, use } from "react";

import type { FlagValue } from "@/utils/metric/flags/serialize";
import type { MetricSlug } from "@/utils/metric/metrics";

export interface MetricContextValue {
  flags: Record<string, FlagValue>;
  defaults: Record<string, FlagValue>;
  metric: MetricSlug;
}

export const MetricContext = createContext<MetricContextValue | null>(null);

export function useMetric() {
  const value = use(MetricContext);
  if (!value) {
    throw new Error("useMetric must be used within Metric.Provider");
  }
  return value;
}

export function useMetricFlags<T extends Record<string, FlagValue>>(): T {
  return useMetric().flags as T;
}
