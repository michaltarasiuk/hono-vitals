import {
  type Metric,
  METRIC_NAMES,
  METRIC_RATINGS,
  type MetricName,
} from '@/lib/collect/metric-schema'
import {getSql} from '@/lib/db/client'
import {TABLES} from '@/lib/db/schema'

export interface MetricSummary {
  name: MetricName
  count: number
  avg: number
  p75: number
  good: number
  'needs-improvement': number
  poor: number
}

export async function getMetricsSummary() {
  const {sql, table} = await getMetricsTable()

  const rows = await sql<MetricSummary>`
    SELECT
      name,
      count(*)::DOUBLE AS count,
      avg(value)::DOUBLE AS avg,
      quantile_cont(value, 0.75)::DOUBLE AS p75,
      count(*) FILTER (WHERE rating = 'good')::DOUBLE AS good,
      count(*) FILTER (WHERE rating = 'needs-improvement')::DOUBLE AS "needs-improvement",
      count(*) FILTER (WHERE rating = 'poor')::DOUBLE AS poor
    FROM ${table}
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

  const {sql, table} = await getMetricsTable()

  await sql`
    INSERT OR REPLACE INTO ${table} (
      metric_id,
      name,
      value,
      delta,
      rating,
      navigation_type
    )
    VALUES ${sql.values(metrics.map(toInsertValues))}
  `
}

export async function clearMetrics() {
  const {sql, table} = await getMetricsTable()

  await sql`DELETE FROM ${table}`
}

const EMPTY_SUMMARY = {
  count: 0,
  avg: 0,
  p75: 0,
  ...Object.fromEntries(METRIC_RATINGS.map((rating) => [rating, 0])),
} as Omit<MetricSummary, 'name'>

async function getMetricsTable() {
  const sql = await getSql()

  return {sql, table: sql.identifier(TABLES.metrics)}
}

function toInsertValues({
  id,
  name,
  value,
  delta,
  rating,
  navigationType,
}: Metric) {
  return [id, name, value, delta, rating, navigationType]
}
