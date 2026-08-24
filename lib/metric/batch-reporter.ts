import {reportMetrics, type ReportedMetric} from '@/lib/collect/report';

export function createBatchReporter() {
  const queue = new Set<ReportedMetric>();

  function enqueue(reported: ReportedMetric) {
    queue.add(reported);
  }

  function flush() {
    if (queue.size === 0) {
      return;
    }

    reportMetrics([...queue]);
    queue.clear();
  }

  function onVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      flush();
    }
  }

  document.addEventListener('visibilitychange', onVisibilityChange);
  // `pagehide` is dispatched at the window and never reaches the document.
  addEventListener('pagehide', flush);

  function dispose() {
    document.removeEventListener('visibilitychange', onVisibilityChange);
    removeEventListener('pagehide', flush);
    flush();
  }

  return {enqueue, dispose};
}

export type BatchReporter = ReturnType<typeof createBatchReporter>;
