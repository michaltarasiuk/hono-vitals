import { type ReactNode } from "react";

import type { MetricName } from "@/lib/collect/schema";
import type { FlagValue } from "@/lib/metric/flags/serialize";

import { Metric } from "@/app/components/metric/shell";
import { FlagsEditor } from "@/app/islands/flags-editor";

interface PageProps {
  metric: MetricName;
  flags: Record<string, FlagValue>;
  defaults: Record<string, FlagValue>;
  children: ReactNode;
}

export function Page({ metric, flags, defaults, children }: PageProps) {
  return (
    <Metric.Provider metric={metric} flags={flags} defaults={defaults}>
      <Metric.Toolbar>
        <FlagsEditor flags={flags} defaults={defaults} />
      </Metric.Toolbar>
      <Metric.Main>
        <Metric.Assets />
        {children}
        <Metric.Chrome />
      </Metric.Main>
    </Metric.Provider>
  );
}
