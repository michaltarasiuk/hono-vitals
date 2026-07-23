import * as z from "zod";

import { METRIC_NAMES, type MetricName } from "@/lib/collect/schema";

export const MetricSummarySchema = z.object({
  name: z.enum(METRIC_NAMES),
  count: z.number(),
  avg: z.number(),
  p75: z.number(),
  ratings: z.object({
    good: z.number(),
    needsImprovement: z.number(),
    poor: z.number(),
  }),
});

export type MetricSummary = z.infer<typeof MetricSummarySchema>;

export const MetricSummaryQuerySchema = z.object({
  name: z.enum(METRIC_NAMES),
  count: z.coerce.number(),
  avg: z.coerce.number(),
  p75: z.coerce.number(),
  good: z.coerce.number(),
  needs_improvement: z.coerce.number(),
  poor: z.coerce.number(),
});

export type MetricSummaryQuery = z.infer<typeof MetricSummaryQuerySchema>;

export function emptyMetricSummary(name: MetricName) {
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
  } satisfies MetricSummary;
}

export function toMetricSummary(row: MetricSummaryQuery) {
  return {
    name: row.name,
    count: row.count,
    avg: row.avg,
    p75: row.p75,
    ratings: {
      good: row.good,
      needsImprovement: row.needs_improvement,
      poor: row.poor,
    },
  } satisfies MetricSummary;
}
