import {sql} from '@/lib/analytics/duckdb/client'
import {
  metricsInsertColumns,
  metricsInsertValues,
  metricsTable,
} from '@/lib/analytics/duckdb/schema'
import {
  type Metric,
  METRIC_NAMES,
  type MetricName,
} from '@/lib/collect/metric-schema'

export interface MetricSummary {
  name: MetricName
  count: number
  avg: number
  p75: number
  good: number
  needsImprovement: number
  poor: number
}

const metricsSummaryQuery = sql<MetricSummary>`
  SELECT
    name,
    count(*)::DOUBLE AS count,
    avg(value)::DOUBLE AS avg,
    quantile_cont(value, 0.75)::DOUBLE AS p75,
    count(*) FILTER (WHERE rating = 'good')::DOUBLE AS good,
    count(*) FILTER (WHERE rating = 'needs-improvement')::DOUBLE AS "needsImprovement",
    count(*) FILTER (WHERE rating = 'poor')::DOUBLE AS poor
  FROM ${metricsTable}
  GROUP BY name
  ORDER BY name
`

export async function getMetricsSummary() {
  const rows = await metricsSummaryQuery
  const byName = new Map(rows.map((row) => [row.name, row]))

  return METRIC_NAMES.map(
    (name) =>
      byName.get(name) ?? {
        name,
        count: 0,
        avg: 0,
        p75: 0,
        good: 0,
        needsImprovement: 0,
        poor: 0,
      },
  )
}

export async function insertMetrics(metrics: Metric[]) {
  if (metrics.length === 0) {
    return
  }

  await sql`
    INSERT OR REPLACE INTO ${metricsTable} (${metricsInsertColumns})
    VALUES ${sql.values(metrics.map(metricsInsertValues))}
  `
}

export async function clearMetrics() {
  await sql`TRUNCATE TABLE ${metricsTable}`
}
