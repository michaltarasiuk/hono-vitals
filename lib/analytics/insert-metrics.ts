import type {Metric} from '@/lib/collect/metric-schema'

import {sql} from '@/lib/analytics/duckdb/client'
import {
  metricsInsertColumns,
  metricsInsertValues,
  metricsTable,
} from '@/lib/analytics/duckdb/schema'

export async function insertMetrics(metrics: Metric[]) {
  if (metrics.length === 0) {
    return
  }

  await sql`
    INSERT OR REPLACE INTO ${metricsTable} (${metricsInsertColumns})
    VALUES ${sql.values(metrics.map(metricsInsertValues))}
  `
}
