import { getClickHouseClient } from "@/lib/analytics/clickhouse/client";
import { CREATE_METRICS_TABLE_SQL } from "@/lib/analytics/clickhouse/sql";

export async function initClickHouseSchema() {
  const client = getClickHouseClient();

  await client.command({ query: CREATE_METRICS_TABLE_SQL });
}

if (import.meta.main) {
  try {
    await initClickHouseSchema();
    console.log("ClickHouse schema initialized");
  } catch (error) {
    console.error("Failed to initialize ClickHouse schema:", error);
    process.exit(1);
  }
}
