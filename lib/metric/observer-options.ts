import type { ClsFlags } from "@/lib/metric/flags/cls";
import type {
  BaseFlags,
  GenerateTargetFlags,
} from "@/lib/metric/flags/defaults";
import type { FcpFlags } from "@/lib/metric/flags/fcp";
import type { InpFlags } from "@/lib/metric/flags/inp";
import type { LcpFlags } from "@/lib/metric/flags/lcp";
import type { TtfbFlags } from "@/lib/metric/flags/ttfb";

type ObserverInstance = 1 | 2;

type ReportAllChangesFlags = Pick<
  BaseFlags,
  "reportAllChanges" | "reportAllChanges2"
>;

type TargetMetricFlags = ReportAllChangesFlags & GenerateTargetFlags;

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

  return {
    ...buildTargetMetricOptions(flags, instance),
    ...(hasQueryFlag(durationThresholdKey)
      ? { durationThreshold: flags[durationThresholdKey] }
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

function instanceKey<K extends string>(key: K, instance: ObserverInstance) {
  return (instance === 1 ? key : `${key}2`) as K | `${K}2`;
}

function hasQueryFlag(name: string) {
  return new URLSearchParams(window.location.search).has(name);
}

function buildReportAllChangesOptions(
  flags: ReportAllChangesFlags,
  instance: ObserverInstance,
) {
  return {
    reportAllChanges: flags[instanceKey("reportAllChanges", instance)],
  };
}

function generateTarget(node: Node | null) {
  if (!(node instanceof HTMLElement)) {
    return;
  }
  return node.dataset.target;
}

function buildTargetMetricOptions(
  flags: TargetMetricFlags,
  instance: ObserverInstance,
) {
  return {
    ...buildReportAllChangesOptions(flags, instance),
    ...(flags[instanceKey("generateTarget", instance)]
      ? { generateTarget }
      : {}),
  };
}
