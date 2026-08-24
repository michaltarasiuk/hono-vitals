import type {MetricName} from '@/lib/metric/schema';

export function formatMetricValue(name: MetricName, value: number) {
  if (name === 'CLS') {
    return value.toFixed(3);
  }
  return `${Math.round(value).toLocaleString()} ms`;
}
