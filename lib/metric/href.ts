import type {MetricName} from '@/lib/collect/metric-schema'
import type {Flags} from '@/lib/metric/flags/schema'

import {metricSlug} from '@/lib/metric/slug'

export function metricHref(
  metric: MetricName,
  flags: Flags = {},
  defaults: Flags = {},
) {
  const path = `/metric/${metricSlug(metric)}`
  const search = new URLSearchParams(
    Object.entries(flags)
      .filter(([key, value]) => value !== false && value !== defaults[key])
      .map(([key, value]) => [key, String(value)]),
  )
  return search.size > 0 ? `${path}?${search}` : path
}
