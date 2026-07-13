import { getSql } from "@/lib/analytics/clickhouse/client";

async function createMetricsTable() {
  const sql = getSql();

  await sql`
    CREATE TABLE IF NOT EXISTS ${sql.identifier("metrics")} (
      metric_id String,
      name LowCardinality(String),
      value Float64,
      delta Float64,
      rating LowCardinality(String),
      navigation_type LowCardinality(String),
      collected_at DateTime64(3) DEFAULT now64(3)
    )
    ENGINE = MergeTree()
    ORDER BY (name, collected_at)
  `.command();
}

export async function initClickHouseSchema() {
  await createMetricsTable();
}

if (import.meta.main) {
  try {
    await initClickHouseSchema();
    console.log("ClickHouse schema initialized");
  } catch (error) {
    console.error("Failed to initialize ClickHouse schema", error);
    process.exit(1);
  }
}
