import { waddler } from "waddler/duckdb-neo";

import { env } from "@/lib/env";

let sql: ReturnType<typeof waddler> | null = null;

export function getSQL() {
  sql ??= waddler({
    url: env.DUCKDB_PATH,
    accessMode: "read_write",
  });
  return sql;
}
