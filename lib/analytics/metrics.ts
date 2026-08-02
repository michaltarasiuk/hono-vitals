import { sql } from "@/lib/analytics/duckdb/client";
import {
  metricsInsertColumns,
  metricsTable,
} from "@/lib/analytics/duckdb/schema";
import {
  METRIC_NAMES,
  type Metric,
  type MetricName,
} from "@/lib/collect/metric-schema";

export interface MetricSummary {
  name: MetricName;
  count: number;
  avg: number;
  p75: number;
  good: number;
  needsImprovement: number;
  poor: number;
}

const EMPTY_METRIC_SUMMARY = {
  count: 0,
  avg: 0,
  p75: 0,
  good: 0,
  needsImprovement: 0,
  poor: 0,
} as const satisfies Omit<MetricSummary, "name">;

export async function insertMetrics(metrics: Metric[]) {
  if (metrics.length === 0) {
    return;
  }

  await sql`
    INSERT OR IGNORE INTO ${metricsTable} (${metricsInsertColumns})
    VALUES ${sql.values(
      metrics.map((metric) => [
        metric.id,
        metric.name,
        metric.value,
        metric.delta,
        metric.rating,
        metric.navigationType,
      ]),
    )}
  `;
}

export async function getMetricsSummary() {
  const rows = await sql<MetricSummary>`
    SELECT
      name,
      count(*)::DOUBLE AS count,
      avg(value)::DOUBLE AS avg,
      quantile_cont(value, 0.75)::DOUBLE AS p75,
      count(*) FILTER (WHERE rating = 'good')::DOUBLE AS good,
      count(*) FILTER (WHERE rating = 'needs-improvement')::DOUBLE AS "needsImprovement",
      count(*) FILTER (WHERE rating = 'poor')::DOUBLE AS poor
    FROM ${metricsTable}
    GROUP BY name
    ORDER BY name
  `;

  const byName = new Map(rows.map((row) => [row.name, row]));

  return METRIC_NAMES.map((name) => ({
    name,
    ...EMPTY_METRIC_SUMMARY,
    ...byName.get(name),
  }));
}
