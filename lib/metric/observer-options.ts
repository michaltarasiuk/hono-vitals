import type {
  AttributionReportOpts,
  INPAttributionReportOpts,
  INPReportOpts,
} from "web-vitals";

import type { MetricName } from "@/lib/collect/metric-schema";
import type { BaseFlags } from "@/lib/metric/flags/defaults/base";
import type { GenerateTargetFlags } from "@/lib/metric/flags/defaults/generate-target";
import type { InpReportFlags } from "@/lib/metric/flags/defaults/inp-report";

export type ObserverInstance = 1 | 2;

interface ObserverFlagsInput
  extends
    Pick<BaseFlags, "reportAllChanges" | "reportAllChanges2">,
    Partial<GenerateTargetFlags>,
    Partial<InpReportFlags> {}

export interface ObserverOptions
  extends
    AttributionReportOpts,
    Pick<INPReportOpts, "durationThreshold">,
    Pick<INPAttributionReportOpts, "includeProcessedEventEntries"> {}

export function buildObserverOptions(
  metric: MetricName,
  flags: ObserverFlagsInput,
  instance: ObserverInstance = 1,
) {
  const options: ObserverOptions = {
    reportAllChanges: dual(
      flags.reportAllChanges,
      flags.reportAllChanges2,
      instance,
    ),
  };

  if (metric === "INP") {
    options.durationThreshold = dual(
      flags.durationThreshold,
      flags.durationThreshold2,
      instance,
    );
    options.includeProcessedEventEntries = flags.includeProcessedEventEntries;
  }

  if (metric === "CLS" || metric === "INP" || metric === "LCP") {
    if (dual(flags.generateTarget, flags.generateTarget2, instance)) {
      options.generateTarget = generateTarget;
    }
  }

  return options;
}

function dual<T>(primary: T, secondary: T, instance: ObserverInstance) {
  return instance === 1 ? primary : secondary;
}

function generateTarget(node: Node | null) {
  if (node instanceof HTMLElement) {
    return node.dataset.target;
  }
}
