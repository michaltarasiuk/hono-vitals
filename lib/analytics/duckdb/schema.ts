import type {Metric} from '@/lib/collect/metric-schema'

import {sql} from '@/lib/analytics/duckdb/client'

const METRICS_TABLE = 'metrics'

const METRICS_INSERT_COLUMNS = [
  'metric_id',
  'name',
  'value',
  'delta',
  'rating',
  'navigation_type',
] as const

export const metricsTable = sql.identifier(METRICS_TABLE)
export const metricsInsertColumns = sql.identifier([...METRICS_INSERT_COLUMNS])

export function metricsInsertValues(metric: Metric) {
  return [
    metric.id,
    metric.name,
    metric.value,
    metric.delta,
    metric.rating,
    metric.navigationType,
  ]
}

export async function migrate() {
  await sql`
    CREATE TABLE IF NOT EXISTS ${metricsTable} (
      metric_id VARCHAR PRIMARY KEY,
      name VARCHAR NOT NULL,
      value DOUBLE NOT NULL,
      delta DOUBLE NOT NULL,
      rating VARCHAR NOT NULL,
      navigation_type VARCHAR NOT NULL,
      collected_at TIMESTAMPTZ DEFAULT current_timestamp
    )
  `

  await sql`
    CREATE INDEX IF NOT EXISTS idx_metrics_name_rating_value
    ON ${metricsTable} (name, rating, value)
  `
}
