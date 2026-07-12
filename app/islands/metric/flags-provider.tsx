import type { ReactNode } from "react";

import type { FlagValue } from "@/utils/metric/flags/serialize";
import type { MetricSlug } from "@/utils/metric/metrics";

import { MetricContext } from "@/app/components/metric/context";

interface MetricFlagsProviderProps {
  flags: Record<string, FlagValue>;
  defaults: Record<string, FlagValue>;
  metric: MetricSlug;
  children: ReactNode;
}

/** Re-provides metric context inside hydrated island boundaries. */
export default function MetricFlagsProvider({
  flags,
  defaults,
  metric,
  children,
}: MetricFlagsProviderProps) {
  return (
    <MetricContext value={{ flags, defaults, metric }}>
      {children}
    </MetricContext>
  );
}
