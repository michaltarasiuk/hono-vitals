import * as z from "zod";

const EnvSchema = z.object({
  DUCKDB_PATH: z.string(),
});

export const env = EnvSchema.parse(process.env);
