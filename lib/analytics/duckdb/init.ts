import { getDB } from "@/lib/analytics/duckdb/client";
import { METRICS_TABLE } from "@/lib/analytics/duckdb/schema";

if (import.meta.main) {
  try {
    const db = getDB();
    const table = db.identifier(METRICS_TABLE);

    await db`
      CREATE TABLE IF NOT EXISTS ${table} (
        metric_id VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        value DOUBLE NOT NULL,
        delta DOUBLE NOT NULL,
        rating VARCHAR NOT NULL,
        navigation_type VARCHAR NOT NULL,
        collected_at TIMESTAMP DEFAULT current_timestamp
      )
    `;

    await db`
      CREATE UNIQUE INDEX IF NOT EXISTS metrics_metric_id_uidx
      ON ${table} (metric_id)
    `;
  } catch (error) {
    console.error(error);
  }
}
