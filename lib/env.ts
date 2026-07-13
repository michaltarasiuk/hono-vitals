import * as z from "zod";

const EnvSchema = z.object({
  CLICKHOUSE_URL: z.url(),
  CLICKHOUSE_USERNAME: z.string().min(1),
  CLICKHOUSE_PASSWORD: z.string(),
});

type Env = z.infer<typeof EnvSchema>;

let env: Env | null = null;

export function getEnv() {
  env ??= EnvSchema.parse(process.env);
  return env;
}
