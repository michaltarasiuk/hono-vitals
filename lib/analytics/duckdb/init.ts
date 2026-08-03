import { migrate } from "@/lib/analytics/duckdb/schema";
import { env } from "@/lib/env";

await migrate();
console.log(`DuckDB schema ready at ${env.DUCKDB_PATH}`);
