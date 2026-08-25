import {COLLECT_PATH, collectClient} from '@/lib/collect/client';
import {toastMetric} from '@/lib/metric/toast';

import type {CollectBody} from '@/lib/collect/body';
import type {ObserverInstance} from '@/lib/metric/observer/options';
import type {Metric} from 'web-vitals';

export interface CollectedMetric {
  metric: Metric;
  instance: ObserverInstance;
}

export function sendMetric(collected: CollectedMetric) {
  sendMetrics([collected]);
}

export function sendMetrics(collected: CollectedMetric[]) {
  for (const c of collected) {
    logMetric(c);
    toastMetric(c.metric);
  }

  sendCollect(toCollectMetrics(collected));
}

function sendCollect(metrics: CollectBody['metrics']) {
  const payload = new Blob([JSON.stringify({metrics})], {
    type: 'application/json',
  });

  if (navigator.sendBeacon(COLLECT_PATH, payload)) {
    return;
  }

  void collectClient.index
    .$post({json: {metrics}}, {init: {keepalive: true}})
    .catch(() => {});
}

function toCollectMetrics(
  collected: CollectedMetric[],
): CollectBody['metrics'] {
  return collected.map(
    ({metric: {id, name, value, delta, rating, navigationType}}) => ({
      id,
      name,
      value,
      delta,
      rating,
      navigationType,
    }),
  );
}

function logMetric({metric, instance}: CollectedMetric) {
  const {name, id, value, delta, rating, navigationType, entries} = metric;
  console.log(`[web-vitals] ${name}`, {
    id,
    instance,
    value,
    delta,
    rating,
    navigationType,
    entries,
    ...('attribution' in metric && {attribution: metric.attribution}),
  });
}
