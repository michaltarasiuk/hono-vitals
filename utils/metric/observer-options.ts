import type { InpFlags } from "@/utils/metric/flags/inp";
import type { BaseMetricFlags } from "@/utils/metric/flags/shared";

type ObserverFlags = BaseMetricFlags & Partial<InpFlags>;

function hasQueryFlag(name: string) {
  return new URLSearchParams(window.location.search).has(name);
}

export function buildClsOptions(flags: ObserverFlags, instance: 1 | 2 = 1) {
  const reportAllChanges =
    instance === 1 ? flags.reportAllChanges : flags.reportAllChanges2;
  const generateTarget =
    instance === 1 ? flags.generateTarget : flags.generateTarget2;

  return {
    reportAllChanges,
    ...(generateTarget
      ? {
          generateTarget: (el: Node | null) =>
            el instanceof HTMLElement ? el.dataset.target : undefined,
        }
      : {}),
  };
}

export function buildFcpOptions(flags: ObserverFlags, instance: 1 | 2 = 1) {
  return {
    reportAllChanges:
      instance === 1 ? flags.reportAllChanges : flags.reportAllChanges2,
  };
}

export function buildInpOptions(flags: ObserverFlags, instance: 1 | 2 = 1) {
  const reportAllChanges =
    instance === 1 ? flags.reportAllChanges : flags.reportAllChanges2;
  const generateTarget =
    instance === 1 ? flags.generateTarget : flags.generateTarget2;
  const durationThresholdKey =
    instance === 1 ? "durationThreshold" : "durationThreshold2";
  const durationThreshold = flags[durationThresholdKey];

  return {
    reportAllChanges,
    ...(hasQueryFlag(durationThresholdKey) && durationThreshold !== undefined
      ? { durationThreshold }
      : {}),
    ...(generateTarget
      ? {
          generateTarget: (el: Node | null) =>
            el instanceof HTMLElement ? el.dataset.target : undefined,
        }
      : {}),
    ...(flags.includeProcessedEventEntries
      ? { includeProcessedEventEntries: true }
      : {}),
  };
}

export function buildLcpOptions(flags: ObserverFlags, instance: 1 | 2 = 1) {
  const reportAllChanges =
    instance === 1 ? flags.reportAllChanges : flags.reportAllChanges2;
  const generateTarget =
    instance === 1 ? flags.generateTarget : flags.generateTarget2;

  return {
    reportAllChanges,
    ...(generateTarget
      ? {
          generateTarget: (el: Node | null) =>
            el instanceof HTMLElement ? el.dataset.target : undefined,
        }
      : {}),
  };
}

export function buildTtfbOptions(flags: ObserverFlags, instance: 1 | 2 = 1) {
  return {
    reportAllChanges:
      instance === 1 ? flags.reportAllChanges : flags.reportAllChanges2,
  };
}
