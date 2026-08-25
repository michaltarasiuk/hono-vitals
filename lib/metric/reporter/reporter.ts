import {sendMetric, type CollectedMetric} from '@/lib/collect/send-metrics';
import {isDefined} from '@/lib/utils/is-defined';

import {createBatchReporter} from './batch';

export function createMetricReporter(batchReporting: boolean) {
  const batch = batchReporting ? createBatchReporter() : null;

  return function report(collected: CollectedMetric) {
    if (isDefined(batch)) {
      batch.enqueue(collected);
    } else {
      sendMetric(collected);
    }
  };
}
