import {COLLECT_PATH, collectClient} from '@/lib/collect/client';
import {toastMetric} from '@/lib/toast/metric';

import type {CollectBody} from '@/lib/collect/body';
import type {ObserverInstance} from '@/lib/metric/observer-options';
import type {Metric} from 'web-vitals';

export interface ReportedMetric {
  metric: Metric;
  instance: ObserverInstance;
}

export function reportMetric(reported: ReportedMetric) {
  reportMetrics([reported]);
}

export function reportMetrics(reported: ReportedMetric[]) {
  if (reported.length === 0) {
    return;
  }

  for (const item of reported) {
    logMetric(item);
    toastMetric(item.metric);
  }

  sendCollect(toCollectMetrics(reported));
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

function toCollectMetrics(reported: ReportedMetric[]): CollectBody['metrics'] {
  return reported.map(
    ({metric: {id, name, value, delta, rating, navigationType}}) => ({
      id,
      name,
      value,
      delta,
      rating,
      navigationType,
      entries: [],
    }),
  );
}

function logMetric({metric, instance}: ReportedMetric) {
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
