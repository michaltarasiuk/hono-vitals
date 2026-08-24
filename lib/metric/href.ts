import {joinPath} from '@/lib/join-path';
import {flagsToSearchParams} from '@/lib/metric/flags/search-params';

import type {Flags} from '@/lib/metric/flags/schema';
import type {MetricName} from '@/lib/metric/schema';

export function metricHref(
  metricName: MetricName,
  flags: Flags = {},
  defaults: Flags = {},
) {
  const path = joinPath('metric', metricSlug(metricName));
  const query = flagsToSearchParams(flags, defaults);
  return query.size > 0 ? `${path}?${query}` : path;
}

export function metricSlug(metricName: MetricName) {
  return metricName.toLowerCase() as Lowercase<MetricName>;
}
