import {resolve} from 'node:path'

import * as z from 'zod'

const EnvSchema = z.object({
  DUCKDB_PATH: z
    .string()
    .default('data/vitals.duckdb')
    .transform((path) => resolve(path)),
})

export const env = EnvSchema.parse(process.env)
