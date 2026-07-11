import { getClickHouseClient } from "@/utils/clickhouse/client";
import { METRICS_SUMMARY_SQL } from "@/utils/clickhouse/sql";
import {
  METRIC_NAMES,
  type MetricSummary,
} from "@/utils/metrics-summary-schema";

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
  const client = getClickHouseClient();

  const result = await client.query({
    query: METRICS_SUMMARY_SQL,
    format: "JSONEachRow",
  });

  const rows = await result.json<SummaryRow>();
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
