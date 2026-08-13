import {sql} from '@/lib/analytics/duckdb/client'
import {metricsTable} from '@/lib/analytics/duckdb/schema'

export async function clearMetrics() {
  await sql`TRUNCATE TABLE ${metricsTable}`
}
