import type {MetricName, MetricRating} from '@/lib/collect/metric-schema'

import {sql} from '@/lib/analytics/duckdb/client'
import {metricsTable} from '@/lib/analytics/duckdb/schema'
import {METRIC_NAMES, METRIC_RATINGS} from '@/lib/collect/metric-schema'

export interface MetricSummary extends Record<MetricRating, number> {
  name: MetricName
  count: number
  avg: number
  p75: number
}

export function ratedCount(summary: MetricSummary) {
  return METRIC_RATINGS.reduce((total, rating) => total + summary[rating], 0)
}

export async function getMetricsSummary() {
  const summaries = await sql<MetricSummary>`
    SELECT
      name,
      count(*)::DOUBLE AS count,
      avg(value)::DOUBLE AS avg,
      quantile_cont(value, 0.75)::DOUBLE AS p75,
      count(*) FILTER (WHERE rating = 'good')::DOUBLE AS "good",
      count(*) FILTER (WHERE rating = 'needs-improvement')::DOUBLE AS "needs-improvement",
      count(*) FILTER (WHERE rating = 'poor')::DOUBLE AS "poor"
    FROM ${metricsTable}
    GROUP BY name
    ORDER BY name
  `

  const byName = new Map(summaries.map((summary) => [summary.name, summary]))

  return METRIC_NAMES.map(
    (name) => byName.get(name) ?? emptyMetricSummary(name),
  )
}

function emptyMetricSummary(name: MetricName): MetricSummary {
  return {
    name,
    count: 0,
    avg: 0,
    p75: 0,
    good: 0,
    'needs-improvement': 0,
    poor: 0,
  }
}
