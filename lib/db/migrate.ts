import {getSql, type Sql} from '@/lib/db/client'
import {TABLES} from '@/lib/db/schema'

interface Migration {
  version: number
  up: (sql: Sql) => Promise<void>
}

const MIGRATIONS: Migration[] = [
  {
    version: 1,
    async up(sql) {
      const metrics = sql.identifier(TABLES.metrics)

      await sql`
        CREATE TABLE IF NOT EXISTS ${metrics} (
          metric_id VARCHAR PRIMARY KEY,
          name VARCHAR NOT NULL,
          value DOUBLE NOT NULL,
          delta DOUBLE NOT NULL,
          rating VARCHAR NOT NULL,
          navigation_type VARCHAR NOT NULL,
          collected_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp
        )
      `

      await sql`
        CREATE INDEX IF NOT EXISTS idx_metrics_name_rating_value
        ON ${metrics} (name, rating, value)
      `
    },
  },
]

export async function migrate() {
  const sql = await getSql()
  const migrationsTable = sql.identifier(TABLES.migrations)

  await sql`
    CREATE TABLE IF NOT EXISTS ${migrationsTable} (
      version INTEGER PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp
    )
  `

  const applied = await sql<{version: number}>`
    SELECT version FROM ${migrationsTable} ORDER BY version
  `
  const appliedVersions = new Set(applied.map((row) => row.version))

  for (const migration of MIGRATIONS) {
    if (appliedVersions.has(migration.version)) {
      continue
    }

    await migration.up(sql)

    await sql`
      INSERT INTO ${migrationsTable} (version)
      VALUES (${migration.version})
    `
  }
}
