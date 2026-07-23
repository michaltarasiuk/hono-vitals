import * as z from "zod";

import { getDB } from "@/lib/analytics/duckdb/client";
import { METRICS_COLUMNS, METRICS_TABLE } from "@/lib/analytics/duckdb/schema";
import {
  METRIC_NAMES,
  MetricSchema,
  type MetricName,
} from "@/lib/collect/schema";

type Metric = z.infer<typeof MetricSchema>;

const MetricSummarySchema = z.object({
  name: z.enum(METRIC_NAMES),
  count: z.coerce.number(),
  avg: z.coerce.number(),
  p75: z.coerce.number(),
  good: z.coerce.number(),
  needsImprovement: z.coerce.number(),
  poor: z.coerce.number(),
});

export type MetricSummary = z.infer<typeof MetricSummarySchema>;

function emptyMetricSummary(name: MetricName): MetricSummary {
  return {
    name,
    count: 0,
    avg: 0,
    p75: 0,
    good: 0,
    needsImprovement: 0,
    poor: 0,
  };
}

export async function insertMetric(metric: Metric) {
  const db = getDB();
  const table = db.identifier(METRICS_TABLE);
  const columns = db.identifier([...METRICS_COLUMNS]);
  const values = db.values([
    [
      metric.id,
      metric.name,
      metric.value,
      metric.delta,
      metric.rating,
      metric.navigationType,
    ],
  ]);

  await db`INSERT OR IGNORE INTO ${table} (${columns}) VALUES ${values}`;
}

export async function getMetricsSummary() {
  const db = getDB();
  const table = db.identifier(METRICS_TABLE);

  const rawRows = await db`
    SELECT
      name,
      count(*) AS count,
      avg(value) AS avg,
      quantile_cont(value, 0.75) AS p75,
      count(*) FILTER (WHERE rating = 'good') AS good,
      count(*) FILTER (WHERE rating = 'needs-improvement') AS "needsImprovement",
      count(*) FILTER (WHERE rating = 'poor') AS poor
    FROM ${table}
    GROUP BY name
    ORDER BY name
  `;

  const rows = MetricSummarySchema.array().parse(rawRows);
  const byName = new Map(rows.map((row) => [row.name, row] as const));

  return METRIC_NAMES.map(
    (name) => byName.get(name) ?? emptyMetricSummary(name),
  );
}
