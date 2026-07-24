import { sql } from "@/lib/analytics/duckdb/client";

const METRICS_TABLE = "metrics";

const METRICS_INSERT_COLUMNS = [
  "metric_id",
  "name",
  "value",
  "delta",
  "rating",
  "navigation_type",
] as const;

export const metricsTable = sql.identifier(METRICS_TABLE);
export const metricsInsertColumns = sql.identifier([...METRICS_INSERT_COLUMNS]);

export async function migrate() {
  await sql`
    CREATE TABLE IF NOT EXISTS ${metricsTable} (
      metric_id VARCHAR PRIMARY KEY,
      name VARCHAR NOT NULL,
      value DOUBLE NOT NULL,
      delta DOUBLE NOT NULL,
      rating VARCHAR NOT NULL,
      navigation_type VARCHAR NOT NULL,
      collected_at TIMESTAMP DEFAULT current_timestamp
    )
  `;
}
