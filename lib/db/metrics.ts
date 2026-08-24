import {sql} from '@/lib/db/client';
import {TABLES} from '@/lib/db/schema';
import {METRIC_NAMES, type Metric, type MetricName} from '@/lib/metric/schema';

export interface MetricStats {
  name: MetricName;
  count: number;
  avg: number;
  p75: number;
  good: number;
  needsImprovement: number;
  poor: number;
}

const table = sql.identifier(TABLES.metrics);

export async function getMetricStats() {
  const rows = await sql<MetricStats>`
    SELECT
      name,
      count(*)::DOUBLE AS count,
      avg(value)::DOUBLE AS avg,
      quantile_cont(value, 0.75)::DOUBLE AS p75,
      count(*) FILTER (WHERE rating = 'good')::DOUBLE AS good,
      count(*) FILTER (WHERE rating = 'needs-improvement')::DOUBLE AS needsImprovement,
      count(*) FILTER (WHERE rating = 'poor')::DOUBLE AS poor
    FROM ${table}
    GROUP BY name
    ORDER BY name
  `;

  const byName = new Map(rows.map((row) => [row.name, row]));

  return METRIC_NAMES.map((name) => ({
    name,
    count: 0,
    avg: 0,
    p75: 0,
    good: 0,
    needsImprovement: 0,
    poor: 0,
    ...byName.get(name),
  }));
}

export async function insertMetrics(metrics: Metric[]) {
  await sql`
    INSERT OR REPLACE INTO ${table} (
      metric_id,
      name,
      value,
      delta,
      rating,
      navigation_type
    )
    VALUES ${sql.values(
      metrics.map(({id, name, value, delta, rating, navigationType}) => [
        id,
        name,
        value,
        delta,
        rating,
        navigationType,
      ]),
    )}
  `;
}

export async function deleteMetrics() {
  await sql`DELETE FROM ${table}`;
}
