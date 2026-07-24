import type { ClsFlags } from "@/lib/metric/flags/cls";
import type {
  BaseFlags,
  GenerateTargetFlags,
} from "@/lib/metric/flags/defaults";
import type { FcpFlags } from "@/lib/metric/flags/fcp";
import type { InpFlags } from "@/lib/metric/flags/inp";
import type { LcpFlags } from "@/lib/metric/flags/lcp";
import type { TtfbFlags } from "@/lib/metric/flags/ttfb";

import { isDefined } from "@/lib/is-defined";

type ObserverInstance = 1 | 2;

type ReportAllChangesFlags = Pick<
  BaseFlags,
  "reportAllChanges" | "reportAllChanges2"
>;

type TargetMetricFlags = ReportAllChangesFlags & GenerateTargetFlags;

function instanceKey<K extends string>(key: K, instance: ObserverInstance) {
  return (instance === 1 ? key : `${key}2`) as K | `${K}2`;
}

function flagForInstance<
  K extends string,
  F extends Record<K | `${K}2`, unknown>,
>(flags: F, key: K, instance: ObserverInstance) {
  return flags[instanceKey(key, instance)];
}

function readDatasetTarget(node: Node | null) {
  if (!(node instanceof HTMLElement)) {
    return;
  }
  return node.dataset.target;
}

function hasQueryFlag(name: string) {
  return new URLSearchParams(window.location.search).has(name);
}

function buildReportAllChangesOptions(
  flags: ReportAllChangesFlags,
  instance: ObserverInstance,
) {
  return {
    reportAllChanges: flagForInstance(flags, "reportAllChanges", instance),
  };
}

function buildTargetMetricOptions(
  flags: TargetMetricFlags,
  instance: ObserverInstance,
) {
  return {
    ...buildReportAllChangesOptions(flags, instance),
    ...(flagForInstance(flags, "generateTarget", instance)
      ? { generateTarget: readDatasetTarget }
      : {}),
  };
}

export function buildClsOptions(
  flags: ClsFlags,
  instance: ObserverInstance = 1,
) {
  return buildTargetMetricOptions(flags, instance);
}

export function buildFcpOptions(
  flags: FcpFlags,
  instance: ObserverInstance = 1,
) {
  return buildReportAllChangesOptions(flags, instance);
}

export function buildInpOptions(
  flags: InpFlags,
  instance: ObserverInstance = 1,
) {
  const durationThresholdKey = instanceKey("durationThreshold", instance);
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

export function buildLcpOptions(
  flags: LcpFlags,
  instance: ObserverInstance = 1,
) {
  return buildTargetMetricOptions(flags, instance);
}

export function buildTtfbOptions(
  flags: TtfbFlags,
  instance: ObserverInstance = 1,
) {
  return buildReportAllChangesOptions(flags, instance);
}
