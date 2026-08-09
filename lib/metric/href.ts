import type {MetricName} from '@/lib/collect/metric-schema'
import type {Flags} from '@/lib/metric/flags/schema'

import {joinPath} from '@/lib/join-path'
import {metricSlug} from '@/lib/metric/slug'

export function metricHref(
  metricName: MetricName,
  flags: Flags = {},
  defaults: Flags = {},
) {
  const path = joinPath('metric', metricSlug(metricName))
  const search = new URLSearchParams(
    Object.entries(flags)
      .filter(([key, value]) => value !== false && value !== defaults[key])
      .map(([key, value]) => [key, String(value)]),
  )
  return search.size > 0 ? `${path}?${search}` : path
}
