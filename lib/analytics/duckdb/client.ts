import { waddler } from "waddler/duckdb-neo";

import { env } from "@/lib/env";

let db: ReturnType<typeof waddler> | null = null;

export function getDB() {
  db ??= waddler({
    url: env.DUCKDB_PATH,
    accessMode: "read_write",
  });
  return db;
}
