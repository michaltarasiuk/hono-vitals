import { createClient } from "@clickhouse/client";
import { waddler } from "waddler/clickhouse";

import { getEnv } from "@/lib/env";

let sql: ReturnType<typeof waddler> | null = null;

export function getSql() {
  if (!sql) {
    const { CLICKHOUSE_URL, CLICKHOUSE_USERNAME, CLICKHOUSE_PASSWORD } =
      getEnv();

    const client = createClient({
      url: CLICKHOUSE_URL,
      username: CLICKHOUSE_USERNAME,
      password: CLICKHOUSE_PASSWORD,
    });

    sql = waddler({ client });
  }

  return sql;
}
