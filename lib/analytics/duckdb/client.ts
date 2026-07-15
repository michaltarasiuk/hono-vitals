import { waddler } from "waddler/duckdb-neo";

import { getEnv } from "@/lib/env";

let sql: ReturnType<typeof waddler> | null = null;

export function getSQL() {
  if (!sql) {
    const { DUCKDB_PATH } = getEnv();
    sql = waddler({
      url: DUCKDB_PATH,
      accessMode: "read_write",
    });
  }

  return sql;
}
