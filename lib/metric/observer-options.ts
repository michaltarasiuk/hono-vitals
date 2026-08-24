import type {BaseFlags} from '@/lib/metric/flags/defaults/base';
import type {GenerateTargetFlags} from '@/lib/metric/flags/defaults/generate-target';
import type {InpReportFlags} from '@/lib/metric/flags/defaults/inp';

export type ObserverInstance = 1 | 2;

type ObserverFlags = Pick<BaseFlags, 'reportAllChanges' | 'reportAllChanges2'> &
  Partial<GenerateTargetFlags & InpReportFlags>;

type InstanceFlag = {
  [K in keyof ObserverFlags]: `${K & string}2` extends keyof ObserverFlags
    ? K
    : never;
}[keyof ObserverFlags];

export function observerOptions(
  flags: ObserverFlags,
  instance: ObserverInstance,
) {
  return {
    reportAllChanges: flags[flagKey(instance, 'reportAllChanges')],
    durationThreshold: flags[flagKey(instance, 'durationThreshold')],
    includeProcessedEventEntries: flags.includeProcessedEventEntries,
    generateTarget: flags[flagKey(instance, 'generateTarget')]
      ? generateTarget
      : undefined,
  };
}

function flagKey<K extends InstanceFlag>(
  instance: ObserverInstance,
  flag: K,
): K | `${K}2` {
  return instance === 1 ? flag : `${flag}2`;
}

function generateTarget(node: Node | null) {
  if (node instanceof HTMLElement) {
    return node.dataset.target;
  }
}
