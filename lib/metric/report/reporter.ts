import {reportMetric, type ReportedMetric} from '@/lib/collect/report';
import {isDefined} from '@/lib/is-defined';

import {createBatchReporter} from './batch';

export function createMetricReporter(batchReporting: boolean) {
  const batch = batchReporting ? createBatchReporter() : null;

  return function report(reported: ReportedMetric) {
    if (isDefined(batch)) {
      batch.enqueue(reported);
    } else {
      reportMetric(reported);
    }
  };
}
