import type {MetricName} from '@/lib/collect/metric-schema'
import type {Flags} from '@/lib/metric/flags/schema'

import {joinPath} from '@/lib/join-path'
import {flagsToSearchParams} from '@/lib/metric/flags/search-params'
import {metricSlug} from '@/lib/metric/slug'

export function metricHref(
  metricName: MetricName,
  flags: Flags = {},
  defaults: Flags = {},
) {
  const path = joinPath('metric', metricSlug(metricName))
  const query = flagsToSearchParams(flags, defaults).toString()
  return query ? `${path}?${query}` : path
}
