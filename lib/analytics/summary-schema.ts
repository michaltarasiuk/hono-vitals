import * as z from "zod";

export const METRIC_NAMES = ["CLS", "FCP", "INP", "LCP", "TTFB"] as const;

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

export function emptyMetricSummary(
  name: MetricSummary["name"],
): MetricSummary {
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
}

export function emptyMetricsSummary(): MetricSummary[] {
  return METRIC_NAMES.map(emptyMetricSummary);
}
