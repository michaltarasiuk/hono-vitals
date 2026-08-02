import type {
  AttributionReportOpts,
  INPAttributionReportOpts,
  INPReportOpts,
} from "web-vitals";

import type { BaseFlags } from "@/lib/metric/flags/defaults/base";
import type { GenerateTargetFlags } from "@/lib/metric/flags/defaults/generate-target";
import type { InpReportFlags } from "@/lib/metric/flags/defaults/inp-report";

export type ObserverInstance = 1 | 2;

type ObserverOption =
  "durationThreshold" | "generateTarget" | "includeProcessedEventEntries";

export const OBSERVER_RECIPES = {
  cls: ["generateTarget"],
  fcp: [],
  inp: ["generateTarget", "durationThreshold", "includeProcessedEventEntries"],
  lcp: ["generateTarget"],
  ttfb: [],
} as const satisfies Record<string, readonly ObserverOption[]>;

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
  recipe: readonly ObserverOption[],
  flags: ObserverFlagsInput,
  instance: ObserverInstance = 1,
): ObserverOptions {
  const options: ObserverOptions = {
    reportAllChanges: flags[instanceKey("reportAllChanges", instance)],
  };

  if (recipe.includes("durationThreshold")) {
    options.durationThreshold =
      flags[instanceKey("durationThreshold", instance)];
  }

  if (
    recipe.includes("includeProcessedEventEntries") &&
    flags.includeProcessedEventEntries
  ) {
    options.includeProcessedEventEntries = true;
  }

  if (
    recipe.includes("generateTarget") &&
    flags[instanceKey("generateTarget", instance)]
  ) {
    options.generateTarget = generateTarget;
  }

  return options;
}

function instanceKey<K extends string>(key: K, instance: ObserverInstance) {
  return (instance === 1 ? key : `${key}2`) as K | `${K}2`;
}

function generateTarget(node: Node | null) {
  if (!(node instanceof HTMLElement)) {
    return;
  }
  return node.dataset.target;
}
