import { createContext, use } from "react";

import type { FlagValue } from "@/lib/metric/flags/serialize";
import type { MetricSlug } from "@/lib/metric/nav";

export interface MetricState {
  flags: Record<string, FlagValue>;
  defaults: Record<string, FlagValue>;
  metric: MetricSlug;
}

export type MetricActions = Record<string, never>;

export type MetricMeta = Record<string, never>;

export interface MetricContextValue {
  state: MetricState;
  actions: MetricActions;
  meta: MetricMeta;
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
  return useMetric().state.flags as T;
}
