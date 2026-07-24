import * as z from "zod";

import { sql } from "@/lib/analytics/duckdb/client";
import { dbNumber, queryRows } from "@/lib/analytics/duckdb/query";
import {
  metricsInsertColumns,
  metricsTable,
} from "@/lib/analytics/duckdb/schema";
import {
  METRIC_NAMES,
  type Metric,
  type MetricName,
} from "@/lib/collect/metric-schema";

const MetricSummarySchema = z.object({
  name: z.enum(METRIC_NAMES),
  count: dbNumber,
  avg: dbNumber,
  p75: dbNumber,
  good: dbNumber,
  needsImprovement: dbNumber,
  poor: dbNumber,
});

export type MetricSummary = z.infer<typeof MetricSummarySchema>;

export async function insertMetric(metric: Metric) {
  await sql`
    INSERT OR IGNORE INTO ${metricsTable} (${metricsInsertColumns})
    VALUES ${sql.values([toInsertRow(metric)])}
  `;
}

export async function getMetricsSummary() {
  const rows = await queryRows(
    MetricSummarySchema,
    sql`
      SELECT
        name,
        count(*) AS count,
        avg(value) AS avg,
        quantile_cont(value, 0.75) AS p75,
        count(*) FILTER (WHERE rating = 'good') AS good,
        count(*) FILTER (WHERE rating = 'needs-improvement') AS "needsImprovement",
        count(*) FILTER (WHERE rating = 'poor') AS poor
      FROM ${metricsTable}
      GROUP BY name
      ORDER BY name
    `,
  );

  const byName = new Map(rows.map((row) => [row.name, row]));

  return METRIC_NAMES.map(
    (name) => byName.get(name) ?? emptyMetricSummary(name),
  );
}

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

function toInsertRow(metric: Metric) {
  return [
    metric.id,
    metric.name,
    metric.value,
    metric.delta,
    metric.rating,
    metric.navigationType,
  ];
}
