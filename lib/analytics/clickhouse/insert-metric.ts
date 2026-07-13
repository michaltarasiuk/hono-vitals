import type * as z from "zod";

import { getSQL } from "@/lib/analytics/clickhouse/client";
import { MetricSchema } from "@/lib/collect/schema";

type Metric = z.infer<typeof MetricSchema>;

export async function insertMetric(metric: Metric) {
  const sql = getSQL();

  await sql`
    INSERT INTO ${sql.identifier("metrics")}
    (metric_id, name, value, delta, rating, navigation_type)
    VALUES ${sql.values(
      [
        [
          metric.id,
          metric.name,
          metric.value,
          metric.delta,
          metric.rating,
          metric.navigationType,
        ],
      ],
      ["String", "String", "Float64", "Float64", "String", "String"],
    )}
  `.command();
}
