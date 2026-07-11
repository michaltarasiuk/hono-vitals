import * as z from "zod";

const EnvSchema = z.object({
  CLICKHOUSE_URL: z.url(),
  CLICKHOUSE_USERNAME: z.string().min(1),
  CLICKHOUSE_PASSWORD: z.string(),
});

export type Env = z.infer<typeof EnvSchema>;

let env: Env | null = null;

export function getEnv() {
  if (!env) {
    const result = EnvSchema.safeParse(process.env);

    if (!result.success) {
      const message = `Invalid environment configuration: ${result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join(", ")}`;
      console.error(message);
      throw new Error(message);
    }

    env = result.data;
  }

  return env;
}
