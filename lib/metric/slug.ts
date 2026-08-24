import type {MetricName} from '@/lib/collect/metric-schema';

export function metricSlug(metric: MetricName) {
  return metric.toLowerCase() as Lowercase<MetricName>;
}
