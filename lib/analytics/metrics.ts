import type * as z from "zod";

import { getSQL } from "@/lib/analytics/duckdb/client";
import { METRICS_COLUMNS, METRICS_TABLE } from "@/lib/analytics/duckdb/schema";
import {
  emptySummary,
  MetricSummaryRowSchema,
  summaryFromRow,
} from "@/lib/analytics/summary";
import { METRIC_NAMES, MetricSchema } from "@/lib/collect/schema";

type Metric = z.infer<typeof MetricSchema>;

export async function insertMetric(metric: Metric) {
  const sql = getSQL();
  const table = sql.identifier(METRICS_TABLE);
  const columns = sql.identifier([...METRICS_COLUMNS]);
  const values = sql.values([
    [
      metric.id,
      metric.name,
      metric.value,
      metric.delta,
      metric.rating,
      metric.navigationType,
    ],
  ]);

  await sql`INSERT OR IGNORE INTO ${table} (${columns}) VALUES ${values}`;
}

export async function getMetricsSummary() {
  const sql = getSQL();
  const table = sql.identifier(METRICS_TABLE);

  const rawRows = await sql`
    SELECT
      name,
      count(*) AS count,
      avg(value) AS avg,
      quantile_cont(value, 0.75) AS p75,
      count(*) FILTER (WHERE rating = 'good') AS good,
      count(*) FILTER (WHERE rating = 'needs-improvement') AS needs_improvement,
      count(*) FILTER (WHERE rating = 'poor') AS poor
    FROM ${table}
    GROUP BY name
    ORDER BY name
  `;

  const rows = MetricSummaryRowSchema.array().parse(rawRows);
  const byName = new Map(
    rows.map((row) => [row.name, summaryFromRow(row)] as const),
  );

  return METRIC_NAMES.map((name) => byName.get(name) ?? emptySummary(name));
}
