import type {BaseFlags} from '@/lib/metric/flags/defaults/base';
import type {GenerateTargetFlags} from '@/lib/metric/flags/defaults/generate-target';
import type {InpReportFlags} from '@/lib/metric/flags/defaults/inp';

export type ObserverInstance = 1 | 2;

type ObserverFlags = Pick<BaseFlags, 'reportAllChanges' | 'reportAllChanges2'> &
  Partial<GenerateTargetFlags & InpReportFlags>;

type Without2<K> = K extends `${infer Flag}2` ? Flag : never;
type InstanceFlag = Without2<keyof ObserverFlags>;

export function observerOptions(
  flags: ObserverFlags,
  instance: ObserverInstance,
) {
  return {
    reportAllChanges: flags[flagKey(instance, 'reportAllChanges')],
    durationThreshold: flags[flagKey(instance, 'durationThreshold')],
    includeProcessedEventEntries: flags.includeProcessedEventEntries,
    ...(flags[flagKey(instance, 'generateTarget')] && {
      generateTarget,
    }),
  };
}

function flagKey<K extends InstanceFlag>(
  instance: ObserverInstance,
  flag: K,
): K | `${K}2` {
  return instance === 1 ? flag : `${flag}2`;
}

function generateTarget(n: Node | null) {
  if (n instanceof HTMLElement) {
    return n.dataset.target;
  }
}
