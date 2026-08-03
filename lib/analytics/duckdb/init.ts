import { env } from "@/lib/env";
import { migrate } from "@/lib/analytics/duckdb/schema";

await migrate();
console.log(`DuckDB schema ready at ${env.DUCKDB_PATH}`);
