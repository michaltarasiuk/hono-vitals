import {joinPath} from '@/lib/join-path';
import {flagsToSearchParams} from '@/lib/metric/flags/search-params';

import type {Flags} from '@/lib/metric/flags/schema';
import type {MetricName} from '@/lib/metric/schema';

export function metricHref(
  metricName: MetricName,
  flags: Flags = {},
  defaults: Flags = {},
) {
  const query = flagsToSearchParams(flags, defaults);

  let path = joinPath('metric', metricSlug(metricName));
  if (query.size > 0) {
    path = `${path}?${query}`;
  }
  return path;
}

export function metricSlug(metricName: MetricName) {
  return metricName.toLowerCase() as Lowercase<MetricName>;
}
