import * as z from "zod";

const EnvSchema = z.object({
  DUCKDB_PATH: z.string().default("data/vitals.duckdb"),
});

type Env = z.infer<typeof EnvSchema>;

let env: Env | null = null;

export function getEnv() {
  env ??= EnvSchema.parse(process.env);
  return env;
}
