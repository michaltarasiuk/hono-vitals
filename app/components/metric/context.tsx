import { createContext, use } from "react";

import type { FlagValue } from "@/lib/metric/flags/serialize";
import type { MetricSlug } from "@/lib/shared/routes";

interface MetricContextValue {
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
