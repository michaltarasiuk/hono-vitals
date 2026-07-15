import { getSQL } from "@/lib/analytics/duckdb/client";

async function createMetricsTable() {
  const sql = getSQL();

  const table = sql.identifier("metrics");

  await sql`
    CREATE TABLE IF NOT EXISTS ${table} (
      metric_id VARCHAR,
      name VARCHAR,
      value DOUBLE,
      delta DOUBLE,
      rating VARCHAR,
      navigation_type VARCHAR,
      collected_at TIMESTAMP DEFAULT current_timestamp
    )
  `;
}

export async function initDuckDBSchema() {
  await createMetricsTable();
}

if (import.meta.main) {
  try {
    await initDuckDBSchema();
    console.log("DuckDB schema initialized");
  } catch (error) {
    console.error("Failed to initialize DuckDB schema", error);
    process.exit(1);
  }
}
