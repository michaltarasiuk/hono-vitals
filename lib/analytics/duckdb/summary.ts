import { getSQL } from "@/lib/analytics/duckdb/client";
import { type MetricSummary } from "@/lib/analytics/summary-schema";
import { METRIC_NAMES, type MetricName } from "@/lib/collect/schema";
import { isDefined } from "@/lib/shared/is-defined";

interface MetricSummaryRow {
  name: MetricName;
  count: number;
  avg: number;
  p75: number;
  good: number;
  needs_improvement: number;
  poor: number;
}

export async function getMetricsSummary() {
  const sql = getSQL();

  const table = sql.identifier("metrics");

  const rows = await sql<MetricSummaryRow>`
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

  const byName = new Map(
    rows.map((row) => [
      row.name,
      {
        name: row.name,
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

  return METRIC_NAMES.map((name) => {
    const summary = byName.get(name);
    if (isDefined(summary)) {
      return summary;
    }
    return {
      name,
      count: 0,
      avg: 0,
      p75: 0,
      ratings: {
        good: 0,
        needsImprovement: 0,
        poor: 0,
      },
    };
  });
}
