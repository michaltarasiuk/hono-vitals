import { waddler } from "waddler/duckdb-neo";

import { env } from "@/lib/env";

export const sql = waddler({
  url: env.DUCKDB_PATH,
  accessMode: "read_write",
  max: 1,
});
