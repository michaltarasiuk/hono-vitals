import * as z from "zod";

import { isDefined } from "@/lib/shared/is-defined";

const EnvSchema = z.object({
  DUCKDB_PATH: z.string().default("data/vitals.duckdb"),
});

type Env = z.infer<typeof EnvSchema>;

let env: Env | null = null;

export function getEnv() {
  if (!isDefined(env)) {
    env = EnvSchema.parse(process.env);
  }
  return env;
}
