import type * as z from "zod";

import { getClickHouseClient } from "@/lib/analytics/clickhouse/client";
import { MetricSchema } from "@/lib/collect/schema";

type Metric = z.infer<typeof MetricSchema>;

export async function insertMetric(metric: Metric) {
  const client = getClickHouseClient();

  await client.insert({
    table: "metrics",
    values: [
      {
        metric_id: metric.id,
        name: metric.name,
        value: metric.value,
        delta: metric.delta,
        rating: metric.rating,
        navigation_type: metric.navigationType,
      },
    ],
    format: "JSONEachRow",
  });
}
