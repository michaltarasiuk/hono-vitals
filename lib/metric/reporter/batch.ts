import {sendMetrics, type CollectedMetric} from '@/lib/collect/send-metrics';

export function createBatchReporter() {
  const queue = new Set<CollectedMetric>();

  function enqueue(collected: CollectedMetric) {
    queue.add(collected);
  }

  function flush() {
    if (queue.size === 0) {
      return;
    }

    sendMetrics([...queue]);
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

  return {enqueue};
}

export type BatchReporter = ReturnType<typeof createBatchReporter>;
