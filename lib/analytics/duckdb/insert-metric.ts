import type * as z from "zod";

import { getSQL } from "@/lib/analytics/duckdb/client";
import { MetricSchema } from "@/lib/collect/schema";

type Metric = z.infer<typeof MetricSchema>;

export async function insertMetric(metric: Metric) {
  const sql = getSQL();

  const table = sql.identifier("metrics");
  const columns = sql.identifier([
    "metric_id",
    "name",
    "value",
    "delta",
    "rating",
    "navigation_type",
  ]);
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

  await sql`INSERT INTO ${table} (${columns}) VALUES ${values}`;
}
