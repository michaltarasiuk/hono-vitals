import { getSql } from "@/lib/analytics/clickhouse/client";
import {
  METRIC_NAMES,
  type MetricSummary,
} from "@/lib/analytics/summary-schema";

interface SummaryRow {
  name: string;
  count: string;
  avg: string;
  p75: string;
  good: string;
  needs_improvement: string;
  poor: string;
}

export async function getMetricsSummary() {
  const sql = getSql();

  const rows = await sql<SummaryRow>`
    SELECT
      name,
      count() AS count,
      avg(value) AS avg,
      quantile(0.75)(value) AS p75,
      countIf(rating = 'good') AS good,
      countIf(rating = 'needs-improvement') AS needs_improvement,
      countIf(rating = 'poor') AS poor
    FROM ${sql.identifier("metrics")}
    GROUP BY name
    ORDER BY name
  `;

  const byName = new Map(
    rows.map((row) => [
      row.name,
      {
        name: row.name as MetricSummary["name"],
        count: Number(row.count),
        avg: Number(row.avg),
        p75: Number(row.p75),
        ratings: {
          good: Number(row.good),
          needsImprovement: Number(row.needs_improvement),
          poor: Number(row.poor),
        },
      } satisfies MetricSummary,
    ]),
  );

  return METRIC_NAMES.map((name) => byName.get(name) ?? emptySummary(name));
}

const emptySummary = (name: MetricSummary["name"]) => ({
  name,
  count: 0,
  avg: 0,
  p75: 0,
  ratings: {
    good: 0,
    needsImprovement: 0,
    poor: 0,
  },
});
