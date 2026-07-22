import type { ClsFlags } from "@/lib/metric/flags/cls";
import type { FcpFlags } from "@/lib/metric/flags/fcp";
import type { InpFlags } from "@/lib/metric/flags/inp";
import type { LcpFlags } from "@/lib/metric/flags/lcp";
import type {
  BaseMetricFlags,
  GenerateTargetFlags,
} from "@/lib/metric/flags/shared";
import type { TtfbFlags } from "@/lib/metric/flags/ttfb";

import { isDefined } from "@/lib/shared/is-defined";

type Instance = 1 | 2;

function pickInstance<T>(instance: Instance, primary: T, secondary: T) {
  return instance === 1 ? primary : secondary;
}

function reportAllChangesOption(
  flags: Pick<BaseMetricFlags, "reportAllChanges" | "reportAllChanges2">,
  instance: Instance,
) {
  return {
    reportAllChanges: pickInstance(
      instance,
      flags.reportAllChanges,
      flags.reportAllChanges2,
    ),
  };
}

function generateTarget(node: Node | null) {
  if (!(node instanceof HTMLElement)) {
    return;
  }
  return node.dataset.target;
}

function generateTargetOption(flags: GenerateTargetFlags, instance: Instance) {
  if (!pickInstance(instance, flags.generateTarget, flags.generateTarget2)) {
    return {};
  }
  return { generateTarget };
}

function hasQueryFlag(name: string) {
  return new URLSearchParams(window.location.search).has(name);
}

function buildTargetMetricOptions(
  flags: Pick<BaseMetricFlags, "reportAllChanges" | "reportAllChanges2"> &
    GenerateTargetFlags,
  instance: Instance,
) {
  return {
    ...reportAllChangesOption(flags, instance),
    ...generateTargetOption(flags, instance),
  };
}

export function buildClsOptions(flags: ClsFlags, instance: Instance = 1) {
  return buildTargetMetricOptions(flags, instance);
}

export function buildFcpOptions(flags: FcpFlags, instance: Instance = 1) {
  return reportAllChangesOption(flags, instance);
}

export function buildInpOptions(flags: InpFlags, instance: Instance = 1) {
  const durationThresholdKey = pickInstance(
    instance,
    "durationThreshold",
    "durationThreshold2",
  );
  const durationThreshold = flags[durationThresholdKey];

  return {
    ...buildTargetMetricOptions(flags, instance),
    ...(hasQueryFlag(durationThresholdKey) && isDefined(durationThreshold)
      ? { durationThreshold }
      : {}),
    ...(flags.includeProcessedEventEntries
      ? { includeProcessedEventEntries: true }
      : {}),
  };
}

export function buildLcpOptions(flags: LcpFlags, instance: Instance = 1) {
  return buildTargetMetricOptions(flags, instance);
}

export function buildTtfbOptions(flags: TtfbFlags, instance: Instance = 1) {
  return reportAllChangesOption(flags, instance);
}
