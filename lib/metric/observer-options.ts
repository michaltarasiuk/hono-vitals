import type {BaseFlags} from '@/lib/metric/flags/defaults/base';
import type {GenerateTargetFlags} from '@/lib/metric/flags/defaults/generate-target';
import type {InpReportFlags} from '@/lib/metric/flags/defaults/inp';

export type ObserverInstance = 1 | 2;

type ReportAllChangesFlags = Pick<
  BaseFlags,
  'reportAllChanges' | 'reportAllChanges2'
>;

type AttributionFlags = ReportAllChangesFlags & GenerateTargetFlags;

export function fcpObserverOptions(
  flags: ReportAllChangesFlags,
  instance: ObserverInstance = 1,
) {
  return {reportAllChanges: reportAllChanges(flags, instance)};
}

export function ttfbObserverOptions(
  flags: ReportAllChangesFlags,
  instance: ObserverInstance = 1,
) {
  return {reportAllChanges: reportAllChanges(flags, instance)};
}

export function clsObserverOptions(
  flags: AttributionFlags,
  instance: ObserverInstance = 1,
) {
  return attributionOptions(flags, instance);
}

export function lcpObserverOptions(
  flags: AttributionFlags,
  instance: ObserverInstance = 1,
) {
  return attributionOptions(flags, instance);
}

export function inpObserverOptions(
  flags: AttributionFlags & InpReportFlags,
  instance: ObserverInstance = 1,
) {
  return {
    ...attributionOptions(flags, instance),
    durationThreshold: forInstance(
      instance,
      flags.durationThreshold,
      flags.durationThreshold2,
    ),
    includeProcessedEventEntries: flags.includeProcessedEventEntries,
  };
}

function forInstance<T>(instance: ObserverInstance, a: T, b: T) {
  return instance === 1 ? a : b;
}

function generateTarget(node: Node | null) {
  if (node instanceof HTMLElement) {
    return node.dataset.target;
  }
}

function reportAllChanges(
  flags: ReportAllChangesFlags,
  instance: ObserverInstance,
) {
  return forInstance(instance, flags.reportAllChanges, flags.reportAllChanges2);
}

function attributionOptions(
  flags: AttributionFlags,
  instance: ObserverInstance,
) {
  return {
    reportAllChanges: reportAllChanges(flags, instance),
    ...(forInstance(instance, flags.generateTarget, flags.generateTarget2)
      ? {generateTarget}
      : {}),
  };
}
