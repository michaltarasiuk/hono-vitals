import {db, type Db} from '@/lib/db/client';
import {TABLES} from '@/lib/db/schema';

interface Migration {
  version: number;
  up: (db: Db) => Promise<void>;
}

const MIGRATIONS: Migration[] = [
  {
    version: 1,
    async up(db) {
      const metrics = db.identifier(TABLES.metrics);

      await db`
        CREATE TABLE IF NOT EXISTS ${metrics} (
          metric_id VARCHAR PRIMARY KEY,
          name VARCHAR NOT NULL,
          value DOUBLE NOT NULL,
          delta DOUBLE NOT NULL,
          rating VARCHAR NOT NULL,
          navigation_type VARCHAR NOT NULL,
          collected_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp
        )
      `;

      await db`
        CREATE INDEX IF NOT EXISTS idx_metrics_name_rating_value
        ON ${metrics} (name, rating, value)
      `;
    },
  },
];

export async function migrate() {
  const migrationsTable = db.identifier(TABLES.migrations);

  await db`
    CREATE TABLE IF NOT EXISTS ${migrationsTable} (
      version INTEGER PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT current_timestamp
    )
  `;

  const applied = await db<{version: number}>`
    SELECT version FROM ${migrationsTable} ORDER BY version
  `;
  const appliedVersions = new Set(applied.map((a) => a.version));

  for (const m of MIGRATIONS) {
    if (appliedVersions.has(m.version)) {
      continue;
    }

    await m.up(db);

    await db`
      INSERT INTO ${migrationsTable} (version)
      VALUES (${m.version})
    `;
  }
}
