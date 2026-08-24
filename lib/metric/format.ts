import {uppercaseFirst} from '@/lib/uppercase-first';

import type {MetricName, MetricRating} from '@/lib/metric/schema';

export function formatMetricRating(rating: MetricRating) {
  return uppercaseFirst(rating.replaceAll('-', ' '));
}

export function formatMetricValue(name: MetricName, value: number) {
  if (name === 'CLS') {
    return value.toFixed(3);
  }
  return `${Math.round(value).toLocaleString()} ms`;
}
