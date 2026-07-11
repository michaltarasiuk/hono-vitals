import { createClient } from "@clickhouse/client";

import { getEnv } from "@/utils/env";

let client: ReturnType<typeof createClient> | null = null;

export function getClickHouseClient() {
  if (!client) {
    const { CLICKHOUSE_URL, CLICKHOUSE_USERNAME, CLICKHOUSE_PASSWORD } =
      getEnv();

    client = createClient({
      url: CLICKHOUSE_URL,
      username: CLICKHOUSE_USERNAME,
      password: CLICKHOUSE_PASSWORD,
    });
  }

  return client;
}
