import type { ClsFlags } from "@/lib/metric/flags/cls";
import type { FcpFlags } from "@/lib/metric/flags/fcp";
import type { InpFlags } from "@/lib/metric/flags/inp";
import type { LcpFlags } from "@/lib/metric/flags/lcp";
import type {
  BaseMetricFlags,
  GenerateTargetFlags,
} from "@/lib/metric/flags/shared";
import type { TtfbFlags } from "@/lib/metric/flags/ttfb";

import { isDefined } from "@/lib/is-defined";

type Instance = 1 | 2;

type ReportAllChangesFlags = Pick<
  BaseMetricFlags,
  "reportAllChanges" | "reportAllChanges2"
>;

type TargetMetricFlags = ReportAllChangesFlags & GenerateTargetFlags;

function instanceKey<K extends string>(key: K, instance: Instance) {
  return (instance === 1 ? key : `${key}2`) as K | `${K}2`;
}

function flagForInstance<
  K extends string,
  F extends Record<K | `${K}2`, unknown>,
>(flags: F, key: K, instance: Instance) {
  return flags[instanceKey(key, instance)];
}

function generateTarget(node: Node | null) {
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
  instance: Instance,
) {
  return {
    reportAllChanges: flagForInstance(flags, "reportAllChanges", instance),
  };
}

function buildTargetMetricOptions(
  flags: TargetMetricFlags,
  instance: Instance,
) {
  return {
    ...buildReportAllChangesOptions(flags, instance),
    ...(flagForInstance(flags, "generateTarget", instance)
      ? { generateTarget }
      : {}),
  };
}

export function buildClsOptions(flags: ClsFlags, instance: Instance = 1) {
  return buildTargetMetricOptions(flags, instance);
}

export function buildFcpOptions(flags: FcpFlags, instance: Instance = 1) {
  return buildReportAllChangesOptions(flags, instance);
}

export function buildInpOptions(flags: InpFlags, instance: Instance = 1) {
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

export function buildLcpOptions(flags: LcpFlags, instance: Instance = 1) {
  return buildTargetMetricOptions(flags, instance);
}

export function buildTtfbOptions(flags: TtfbFlags, instance: Instance = 1) {
  return buildReportAllChangesOptions(flags, instance);
}
