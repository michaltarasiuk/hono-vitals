import {metricsTable, sql} from '@/lib/analytics/db'
import {
  type Metric,
  METRIC_NAMES,
  METRIC_RATINGS,
  type MetricName,
  type MetricRating,
} from '@/lib/collect/metric-schema'

export interface MetricSummary extends Record<MetricRating, number> {
  name: MetricName
  count: number
  avg: number
  p75: number
}

const zeroRatings = Object.fromEntries(
  METRIC_RATINGS.map((rating) => [rating, 0]),
) as Record<MetricRating, number>

const EMPTY_SUMMARY = {
  count: 0,
  avg: 0,
  p75: 0,
  ...zeroRatings,
} satisfies Omit<MetricSummary, 'name'>

export async function getMetricsSummary() {
  const rows = await sql<MetricSummary>`
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

  const byName = new Map(rows.map((row) => [row.name, row]))

  return METRIC_NAMES.map((name) => ({
    name,
    ...EMPTY_SUMMARY,
    ...byName.get(name),
  }))
}

export async function insertMetrics(metrics: Metric[]) {
  if (metrics.length === 0) {
    return
  }

  await sql`
    INSERT OR REPLACE INTO ${metricsTable} (
      metric_id,
      name,
      value,
      delta,
      rating,
      navigation_type
    )
    VALUES ${sql.values(
      metrics.map((metric) => [
        metric.id,
        metric.name,
        metric.value,
        metric.delta,
        metric.rating,
        metric.navigationType,
      ]),
    )}
  `
}

export async function clearMetrics() {
  await sql`TRUNCATE TABLE ${metricsTable}`
}
