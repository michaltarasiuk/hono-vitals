import {waddler} from 'waddler/duckdb-neo'

import {env} from '@/lib/env'

export const sql = waddler({
  url: env.DUCKDB_PATH,
})

export const metricsTable = sql.identifier('metrics')

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
