import { waddler } from "waddler/duckdb-neo";

import { getEnv } from "@/lib/env";

let sql: ReturnType<typeof waddler> | null = null;

export function getSQL() {
  sql ??= waddler({
    url: getEnv().DUCKDB_PATH,
    accessMode: "read_write",
  });
  return sql;
}
