import { createClient } from "@clickhouse/client";

import { getEnv } from "@/lib/env";

let client: ReturnType<typeof createClient> | null = null;

export function getClickHouseClient() {
  const { CLICKHOUSE_URL, CLICKHOUSE_USERNAME, CLICKHOUSE_PASSWORD } = getEnv();

  client ??= createClient({
    url: CLICKHOUSE_URL,
    username: CLICKHOUSE_USERNAME,
    password: CLICKHOUSE_PASSWORD,
  });

  return client;
}
